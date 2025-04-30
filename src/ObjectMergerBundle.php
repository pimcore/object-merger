<?php

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

namespace Pimcore\Bundle\ObjectMergerBundle;

use Pimcore\Bundle\ObjectMergerBundle\DependencyInjection\ObjectMergerExtension;
use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\PimcoreBundleAdminClassicInterface;
use Pimcore\Extension\Bundle\Traits\BundleAdminClassicTrait;
use Pimcore\Extension\Bundle\Traits\PackageVersionTrait;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;

class ObjectMergerBundle extends AbstractPimcoreBundle implements PimcoreBundleAdminClassicInterface
{
    use BundleAdminClassicTrait;
    use PackageVersionTrait;

    protected function getComposerPackageName(): string
    {
        return 'pimcore/object-merger';
    }

    public function getContainerExtension(): ExtensionInterface
    {
        return new ObjectMergerExtension();
    }

    public function getCssPaths(): array
    {
        return [
            '/bundles/objectmerger/css/admin.css',
            '/bundles/objectmerger/css/icons.css',
        ];
    }

    public function getJsPaths(): array
    {
        return [
            '/bundles/objectmerger/js/plugin.js',
            '/bundles/objectmerger/js/panel.js',
            '/bundles/objectmerger/js/grideditor.js',

        ];
    }
}
