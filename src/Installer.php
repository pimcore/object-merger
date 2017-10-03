<?php

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

namespace Pimcore\Bundle\ObjectMergerBundle;

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

    public function needsReloadAfterInstall()
    {
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

        if (!is_dir($path)) {
            @mkdir($path, 0777, true);
        }

        if (!self::isInstalled()) {
            throw new \Exception(ObjectMergerBundle::PLUGIN_NAME . ' Plugin could not be installed');
        }
    }

    public function uninstall()
    {
        rmdir(self::getInstallPath());

        if (self::isInstalled()) {
            throw new \Exception(ObjectMergerBundle::PLUGIN_NAME . ' Plugin could not be uninstalled');
        }
    }

    public static function getInstallPath()
    {
        return PIMCORE_CONFIGURATION_DIRECTORY.'/' . ObjectMergerBundle::PLUGIN_NAME . '/install';
    }
}
