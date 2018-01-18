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

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;
use Pimcore\Extension\Bundle\Installer\InstallerInterface;

class ObjectMergerBundle extends AbstractPimcoreBundle
{
    const PLUGIN_NAME = 'ObjectMerger';

    /**
     * @return array
     */
    public function getCssPaths()
    {
        return [
            '/bundles/objectmerger/css/admin.css',
            '/bundles/objectmerger/css/icons.css'
        ];
    }

    /**
     * @return array
     */
    public function getJsPaths()
    {
        return [
            '/bundles/objectmerger/js/plugin.js',
            '/bundles/objectmerger/js/panel.js',
            '/bundles/objectmerger/js/grideditor.js'

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
