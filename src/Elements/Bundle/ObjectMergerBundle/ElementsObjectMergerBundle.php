<?php

namespace Elements\Bundle\ObjectMergerBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\Installer\InstallerInterface;

class ElementsObjectMergerBundle extends AbstractPimcoreBundle
{

    const PLUGIN_NAME = "ObjectMerger";

    /**
     * @return array
     */
    public function getCssPaths()
    {
        return [
            '/bundles/elementsobjectmerger/css/admin.css',
            '/bundles/elementsobjectmerger/css/icons.css'
        ];
    }

    /**
     * @return array
     */
    public function getJsPaths()
    {
        return [
            '/bundles/elementsobjectmerger/js/plugin.js',
            '/bundles/elementsobjectmerger/js/panel.js'

        ];
    }

    /**
     * If the bundle has an installation routine, an installer is responsible of handling installation related tasks
     *
     * @return InstallerInterface|null
     */
    public function getInstaller()
    {
        return new Installer();

    }
}
