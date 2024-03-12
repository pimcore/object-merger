<?php

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

namespace Pimcore\Bundle\ObjectMergerBundle\Controller;

use Pimcore\Controller\Traits\JsonHelperTrait;
use Pimcore\Controller\UserAwareController;
use Pimcore\Logger;
use Pimcore\Model\DataObject\AbstractObject;
use Pimcore\Model\DataObject\ClassDefinition\Data;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\Element\Editlock;
use Pimcore\Model\Element\ValidationException;
use Pimcore\Version;
use Symfony\Component\EventDispatcher\GenericEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

/**
 * @Route("/admin/elementsobjectmerger/admin")
 */
class AdminController extends UserAwareController
{
    use JsonHelperTrait;

    private ?array $objectData;

    protected EventDispatcherInterface $eventDispatcher;

    public function __construct(EventDispatcherInterface $eventDispatcher)
    {
        $this->eventDispatcher = $eventDispatcher;
    }

    private function getDiffDataForField(Concrete $object, int | string $key, Data $fielddefinition): void
    {
        $getter = 'get' . ucfirst($key);

        $value = $fielddefinition->getDiffDataForEditmode($object->$getter(), $object);
        foreach ($value as $el) {
            $key = $el['key'];
            $this->objectData[$key] = $el;
        }
    }

    /**
     * @throws \Exception
     */
    private function getDiffDataForObject(Concrete $object): void
    {
        foreach ($object->getClass()->getFieldDefinitions() as $key => $def) {
            $this->getDiffDataForField($object, $key, $def);
        }
    }

    public function combineKeys(array $arr1, array $arr2): array
    {
        $result = [];
        foreach ($arr1 as $key) {
            $result[$key] = null;
        }
        foreach ($arr2 as $key) {
            $result[$key] = null;
        }

        return $result;
    }

    protected function getLatestVersion(Concrete $object): Concrete
    {
        $modificationDate = $object->getModificationDate();
        $latestVersion = $object->getLatestVersion();
        if ($latestVersion) {
            $latestObj = $latestVersion->loadData();
            if ($latestObj instanceof Concrete) {
                $object = $latestObj;
                $object->setModificationDate($modificationDate); // set de modification-date from published version to compare it in js-frontend
            }
        }

        return $object;
    }

    /**
     * Generates a diff for the given two object ids.
     *
     * @Route("/diff")
     */
    public function diffAction(Request $request): JsonResponse
    {
        $id1 = $request->get('id1');
        $id2 = $request->get('id2');

        /** @var Concrete $object1 */
        $object1 = AbstractObject::getById(intval($id1));
        /** @var Concrete $object2 */
        $object2 = AbstractObject::getById(intval($id2));

        // set the latest available version for editmode
        $object1 = $this->getLatestVersion($object1);
        $object2 = $this->getLatestVersion($object2);

        if ($object1->isAllowed('view') && $object2->isAllowed('view')) {
            $objectData = [];

            $this->getDiffDataForObject($object1);

            $dataFromObject1 = $this->objectData;
            $this->objectData = null;

            $this->getDiffDataForObject($object2);
            $dataFromObject2 = $this->objectData;

            $keys1 = array_keys($dataFromObject1);
            $keys2 = array_keys($dataFromObject2);
            $combinedKeys = $this->combineKeys($keys1, $keys2);

            foreach ($combinedKeys as  $key => $value) {
                $entry1 = $dataFromObject1[$key] ?? null;
                $entry2 = $dataFromObject2[$key] ?? null;

                $merged = $entry1;
                if (!$merged) {
                    $merged = [];
                    $merged['key'] = $entry2['key'] ?? null;
                    $merged['field'] = $entry2['field'] ?? null;
                    $merged['value2'] = $entry2['value'] ?? null;
                    $merged['data2'] = $entry2['data'] ?? null;
                    $merged['extData'] = $entry2['extData'] ?? null;
                    $merged['disabled'] = $entry2['disabled'] ?? false;
                    $merged['title'] = $entry2['title'] ?? null;
                    $merged['lang'] = $entry2['lang'] ?? null;
                    $merged['type'] = $entry2['type'] ?? null;
                    $dataFromObject1[$key] = $merged;
                } elseif ($entry2) {
                    $merged['value2'] = $entry2['value'] ?? null;
                    $merged['data2'] = $entry2['data'] ?? null;
                    $dataFromObject1[$key] = $merged;
                }

                if (json_encode($merged['data'] ?? null) != json_encode($merged['data2'] ?? null)) {
                    $dataFromObject1[$key]['isdiff'] = true;
                }
            }

            $items = array_values($dataFromObject1);
            usort($items, function ($left, $right) {
                return strcmp($left['key'], $right['key']);
            });

            $objectData['items'] = $items;

            // iterate over all items and check if there is localized data

            $languages = [];
            foreach ($items as $item) {
                $language = $item['lang'] ?? null;
                if ($language) {
                    if (!isset($languages[$language])) {
                        $locale = \Locale::getDisplayLanguage($language);

                        $languages[$language] = [
                            'key' => $language,
                            'name' => $locale,
                        ];
                    }
                }
            }

            if (empty($languages)) {
                $languages[] = [
                    'key' => 'default',
                    'name' => 'Default',
                ];
            }

            $languages = array_values($languages);
            usort($languages, function ($left, $right) {
                return strcmp($left['name'], $right['name']);
            });

            $objectData['languages'] = array_values($languages);
            $objectData['o1key'] = $object1->getKey();
            $objectData['o2key'] = $object2->getKey();
            $objectData['o1id'] = $object1->getId();
            $objectData['o2id'] = $object2->getId();
            $objectData['o1path'] = $object1->getFullPath();
            $objectData['o2path'] = $object2->getFullPath();

            return $this->jsonResponse($objectData);
        } else {
            Logger::debug('prevented getting object id [ ' . $object1->getId() . ' or ' . $object2->getId() . ' ] because of missing permissions');

            return $this->jsonResponse(['success' => false, 'message' => 'missing_permission']);
        }
    }

    /**
     * Returns the IDs for the given 2 full object paths.
     *
     * @Route("/getid")
     *
     * @return JsonResponse
     */
    public function getidAction(Request $request): JsonResponse
    {
        $path1 = $request->get('path1');
        $path2 = $request->get('path2');

        $object1 = Concrete::getByPath($path1);
        $object2 = Concrete::getByPath($path2);

        if ($object1 && $object2) {
            return $this->jsonResponse([
                'success' => true,
                'oid1' => $object1->getId(),
                'oid2' => $object2->getId(),
            ]);
        } else {
            return $this->jsonResponse(['success' => false, 'message' => 'plugin_objectmerger_no_object']);
        }
    }

    /**
     * Saves the merged object.
     *
     * @Route("/save")
     *
     * @throws ValidationException
     */
    public function saveAction(Request $request): JsonResponse
    {
        $objectId = $request->get('id');

        /**
         * @TODO Remove when removing support for Pimcore 10
         */
        if (Version::getMajorVersion() >= 11) {
            if (Editlock::isLocked($objectId, 'object', $request->getSession()->getId())) {
                return $this->jsonResponse(['success' => false, 'message' => 'plugin_objectmerger_object_locked']);
            }
        } else {
            if (Editlock::isLocked($objectId, 'object')) {
                return $this->jsonResponse(['success' => false, 'message' => 'plugin_objectmerger_object_locked']);
            }
        }

        $attributes = json_decode($request->get('attributes'), true);

        /** @var \Pimcore\Model\DataObject\Concrete $object */
        $object = AbstractObject::getById($objectId);

        $preMergeEvent = new GenericEvent($this, [
            'targetId' => $object->getId(),
            'sourceId' => $request->get('sourceId'),
        ]);
        $this->eventDispatcher->dispatch($preMergeEvent, 'plugin.ObjectMerger.preMerge');

        $objectData = [];

        foreach ($attributes as $att) {
            $fieldname = $att['field'];

            $fieldAtts = $objectData[$fieldname] ?? null;

            if (!$fieldAtts) {
                $fieldAtts = [];
            }

            $fieldAtts[] = $att;
            $objectData[$fieldname] = $fieldAtts;
        }

        foreach ($objectData as $key => $value) {
            $fd = $object->getClass()->getFieldDefinition($key);
            if ($fd && $fd->isDiffChangeAllowed($object)) {
                $value = $fd->getDiffDataFromEditmode($value, $object);
                $object->setValue($key, $value);
            }
        }
        $object->save();

        $postMergeEvent = new GenericEvent($this, [
            'targetId' => $object->getId(),
            'sourceId' => $request->get('sourceId'),
        ]);

        $this->eventDispatcher->dispatch($postMergeEvent, 'plugin.ObjectMerger.postMerge');

        return $this->jsonResponse(['success' => true, 'targetId' => $object->getId(), 'sourceId' => $request->get('sourceId')]);
    }
}
