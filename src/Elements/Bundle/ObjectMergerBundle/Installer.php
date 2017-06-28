<?php

namespace Elements\Bundle\ObjectMergerBundle;

use Pimcore\Extension\Bundle\Installer\AbstractInstaller;

class Installer extends AbstractInstaller
{
    /**
     * {@inheritdoc}
     */
    public function isInstalled()
    {
        $installDir = self::getInstallPath();
        $isInstalled = is_dir($installDir);
        return $isInstalled;
    }


    public function needsReloadAfterInstall(){
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function canBeInstalled()
    {
        return !$this->isInstalled();

    }

    /**
     * {@inheritdoc}
     */
    public function install()
    {
        $path = self::getInstallPath();


        if(!is_dir($path)) {
            @mkdir($path, 0777, true);
        }

        if (!self::isInstalled()) {
            throw new \Exception(ElementsObjectMergerBundle::PLUGIN_NAME . " Plugin could not be installed");
        }
    }

    public function uninstall() {
        rmdir(self::getInstallPath());


        if (self::isInstalled()) {
            throw new \Exception(ElementsObjectMergerBundle::PLUGIN_NAME . " Plugin could not be uninstalled");
        }
    }

    public static function getInstallPath() {
        return PIMCORE_CONFIGURATION_DIRECTORY."/" . ElementsObjectMergerBundle::PLUGIN_NAME . "/install";
    }

}
