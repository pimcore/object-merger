<?php

class ObjectMerger_Plugin extends Pimcore_API_Plugin_Abstract implements Pimcore_API_Plugin_Interface {

    const PLUGIN_NAME = "ObjectMerger";

    public static function needsReloadAfterInstall() {
        return true;
    }

    public static function install() {

        $path = self::getInstallPath();


        if(!is_dir($path)) {
            @mkdir($path);
        }

        if (self::isInstalled()) {
            return self::PLUGIN_NAME . " Plugin successfully installed.";
        } else {
            return self::PLUGIN_NAME . " Plugin could not be installed";
        }
    }

    public static function uninstall() {
        rmdir(self::getInstallPath());


        if (!self::isInstalled()) {
            return self::PLUGIN_NAME . " Plugin successfully uninstalled.";
        } else {
            return self::PLUGIN_NAME . " Plugin could not be uninstalled";
        }
    }

    public static function isInstalled() {
        return is_dir(self::getInstallPath());
    }

    public static function getTranslationFile($language){
        return "/" . self::PLUGIN_NAME . "/texts/en.csv";
    }

    public static function getInstallPath() {
        return PIMCORE_PLUGINS_PATH."/" . self::PLUGIN_NAME . "/install";
    }

}
