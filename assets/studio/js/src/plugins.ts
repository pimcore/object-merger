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
import { ObjectMergerModule } from './modules/object-merger'
import { OBJECT_MERGER_API_SERVICE_ID, objectMergerApi } from './modules/object-merger/api/object-merger-api'

if (module.hot !== undefined) {
  module.hot.accept()
}

export const ObjectMergerPlugin: IAbstractPlugin = {
  name: 'object-merger-plugin',

  // Register and overwrite services here
  onInit: ({ container }): void => {
    // Cross-bundle API: consumers resolve this id via container.isBound()/get() without any
    // build dependency on this bundle (plugin onInit runs before every module onInit).
    container.bind(OBJECT_MERGER_API_SERVICE_ID).toConstantValue(objectMergerApi)
  },

  // register modules here
  onStartup: ({ moduleSystem }): void => {
    moduleSystem.registerModule(ObjectMergerModule)
    console.log('Hello from object merger bundle.')
  }
}
