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

namespace Pimcore\Bundle\ObjectMergerBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\PimcoreBundleAdminClassicInterface;
use Pimcore\Extension\Bundle\Traits\BundleAdminClassicTrait;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;

class ObjectMergerBundle extends AbstractPimcoreBundle implements PimcoreBundleAdminClassicInterface
{
    use BundleAdminClassicTrait;
    use PackageVersionTrait;

    /**
     * @inheritDoc
     */
    protected function getComposerPackageName(): string
    {
        return 'pimcore/object-merger';
    }

    /**
     * @return array
     */
    public function getCssPaths(): array
    {
        return [
            '/bundles/objectmerger/css/admin.css',
            '/bundles/objectmerger/css/icons.css',
        ];
    }

    /**
     * @return array
     */
    public function getJsPaths(): array
    {
        return [
            '/bundles/objectmerger/js/plugin.js',
            '/bundles/objectmerger/js/panel.js',
            '/bundles/objectmerger/js/grideditor.js',

        ];
    }
}
