/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IAbstractPlugin } from '@pimcore/studio-ui-bundle'
import { ObjectMergerModule } from './modules/object-merger/index'

if (module.hot !== undefined) {}

export const ObjectMergerPlugin: IAbstractPlugin = {
  name: 'object-merger-plugin',

  // Register and overwrite services here
  onInit: ({ container }): void => {},

  // register modules here
  onStartup: ({ moduleSystem }): void => {
    moduleSystem.registerModule(ObjectMergerModule)
    console.log('Hello from object merger bundle.')
  }
}
