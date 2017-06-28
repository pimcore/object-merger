<?php
/**
 * Pimcore
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.pimcore.org/license
 *
 * @copyright  Copyright (c) 2009-2012 elements.at New Media Solutions GmbH (http://www.elements.at)
 * @license    http://www.pimcore.org/license     New BSD License
 */
namespace Elements\Bundle\ObjectMergerBundle\Controller;

use Pimcore\Logger;
use Pimcore\Model\Element\Editlock;
use Pimcore\Model\Object\AbstractObject;
use Pimcore\Model\Object\Concrete;
use Pimcore\Model\Object\Service;
use Pimcore\Tool;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Intl\Locale\Locale;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin/elementsobjectmerger/admin")
 */
class AdminController extends \Pimcore\Bundle\AdminBundle\Controller\AdminController {


    /**
     * @param $object
     * @param $key
     * @param $fielddefinition \Pimcore\Model\Object\ClassDefinition\Data
     * @param $objectFromVersion
     * @param int $level
     */
    private function getDiffDataForField($object, $key, $fielddefinition, $objectFromVersion, $level = 0) {
        $parent = Service::hasInheritableParentObject($object);
        $getter = "get" . ucfirst($key);

        $value = $fielddefinition->getDiffDataForEditmode($object->$getter(), $object, array(), $objectFromVersion);
        foreach ($value as $el) {
            $key = $el["key"];
            $this->objectData[$key] = $el;
        }
    }


    private function getDiffDataForObject(Concrete $object, $objectFromVersion = false) {
        foreach ($object->getClass()->getFieldDefinitions() as $key => $def) {
            $this->getDiffDataForField($object, $key, $def, $objectFromVersion);
        }
    }

    public function combineKeys($arr1, $arr2) {
        $result = array();
        foreach ($arr1 as $key) {
            $result[$key] = null;
        }
        foreach ($arr2 as $key) {
            $result[$key] = null;;
        }
        return $result;
    }


    /**
     * @param  Concrete $object
     * @return Concrete
     */
    protected function getLatestVersion(Concrete $object)
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
     * @param Request $request
     * @return JsonResponse
     */
    public function diffAction(Request $request) {
        $id1 = $request->get("id1");
        $id2 = $request->get("id2");


//        if (Element_Editlock::isLocked($id2, "object")) {
//            $this->_helper->json(array(
//                "editlock" => Element_Editlock::getByElement($id2, "object")
//            ));
//        }


//        Element_Editlock::lock($id1, "object");
//        Element_Editlock::lock($id2, "object");

        $object1 = AbstractObject::getById(intval($id1));
        $object2 = AbstractObject::getById(intval($id2));

        // set the latest available version for editmode
        $latestObject1 = $this->getLatestVersion($object1);
        $latestObject2 = $this->getLatestVersion($object2);

        // we need to know if the latest version is published or not (a version), because of lazy loaded fields in $this->getDataForObject()
        $objectFromVersion1 = $latestObject1 === $object1 ? false : true;
        $objectFromVersion2 = $latestObject1 === $object2 ? false : true;
        $object1 = $latestObject1;
        $object2 = $latestObject2;

        if ($object1->isAllowed("view") && $object2->isAllowed("view")) {
            $objectData = array();

            $this->getDiffDataForObject($object1, $objectFromVersion1);

            $dataFromObject1 = $this->objectData;
            $this->objectData = null;

            $this->getDiffDataForObject($object2, $objectFromVersion2);
            $dataFromObject2 = $this->objectData;

            $keys1 = array_keys($dataFromObject1);
            $keys2 = array_keys($dataFromObject2);
            $combinedKeys = $this->combineKeys($keys1, $keys2);

            foreach($combinedKeys as  $key => $value) {
                $entry1 = $dataFromObject1[$key];
                $entry2 = $dataFromObject2[$key];

                $merged = $entry1;
                if (!$merged) {
                    $merged = array();
                    $merged["key"] = $entry2["key"];
                    $merged["field"] = $entry2["field"];
                    $merged["value2"] = $entry2["value"];
                    $merged["data2"] = $entry2["data"];
                    $merged["extData"] = $entry2["extData"];
                    $merged["disabled"] = $entry2["disabled"];
                    $merged["title"] = $entry2["title"];
                    $merged["lang"] = $entry2["lang"];
                    $merged["type"] = $entry2["type"];
                    $dataFromObject1[$key] = $merged;
                } else {
                    if ($entry2) {
                        $merged["value2"] = $entry2["value"];
                        $merged["data2"] = $entry2["data"];
                        $dataFromObject1[$key] = $merged;
                    }
                }

                if (strpos($key, "key")) {
                    Logger::debug("stop");
                }
                if (json_encode($merged["data"]) != json_encode($merged["data2"])) {
                    $dataFromObject1[$key]["isdiff"] = true;
                }
            }

            $items = array_values($dataFromObject1);
            usort($items, function($left,$right) {
                return strcmp($left["key"],$right["key"]);
            });

            $objectData["items"] = $items;


            // iterate over all items and check if there is localized data

            $languages = array();
            foreach ($items as $item) {
                $language = $item["lang"];
                if ($language) {

                    if (!$languages[$language]) {
                        $locale = \Locale::getDisplayLanguage($language);

                        $languages[$language] = array(
                            "key" => $language,
                            "name" => $locale
                        );
                    }
                }
            }

            if (empty($languages)) {
                $languages[] = array(
                    "key" => "default",
                    "name" => "Default"
                );
            }

            $languages = array_values($languages);
            usort($languages, function($left,$right) {
                return strcmp($left["name"],$right["name"]);
            });

            $objectData["languages"] = array_values($languages);
            $objectData["o1key"] = $object1->getKey();
            $objectData["o2key"] = $object2->getKey();
            $objectData["o1id"] = $object1->getId();
            $objectData["o2id"] = $object2->getId();
            $objectData["o1path"] = $object1->getFullPath();
            $objectData["o2path"] = $object2->getFullPath();

            return $this->json($objectData);
        }
        else {
            Logger::debug("prevented getting object id [ " . $object1->getId() . " or " . $object2->getId() . " ] because of missing permissions");
            return $this->json(array("success" => false, "message" => "missing_permission"));
        }
    }


    /**
     * Returns the IDs for the given 2 full object paths.
     *
     * @Route("/getid")
     * @param Request $request
     * @return JsonResponse
     */
    public function getidAction(Request $request) {
        $path1 = $request->get("path1");
        $path2 = $request->get("path2");

        $object1 = AbstractObject::getByPath($path1);
        $object2 = AbstractObject::getByPath($path2);

        if ($object1 && $object2) {
            return $this->json(array(
                "success" => true,
                "oid1" => $object1->getId(),
                "oid2" => $object2->getId(),
            ));

        } else {
            return $this->json(array("success" => false, "message" => "plugin_objectmerger_no_object"));
        }
    }

    /**
     * Saves the merged object.
     *
     * @Route("/save")
     * @param Request $request
     * @return JsonResponse
     */
    public function saveAction(Request $request)
    {
        $objectId = $request->get("id");

        if (Editlock::isLocked($objectId, "object")) {
            return $this->json(array("success" => false, "message" => "plugin_objectmerger_object_locked"));
        }


        $attributes= json_decode($request->get("attributes"), true);

        $object = AbstractObject::getById($objectId);


        $objectData = array();

        foreach ($attributes as $att) {
            $fieldname = $att["field"];

            $fieldAtts = $objectData[$fieldname];

            if (!$fieldAtts) {
                $fieldAtts = array();
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
        return $this->json(array("success" => true));
    }
}
