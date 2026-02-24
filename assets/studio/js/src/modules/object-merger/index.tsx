/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type MainNavRegistry } from '@pimcore/studio-ui-bundle/modules/app'
import { container, type AbstractModule } from '@pimcore/studio-ui-bundle'
import { type WidgetRegistry } from '@pimcore/studio-ui-bundle/modules/widget-manager'
import { UserPermission } from '@pimcore/studio-ui-bundle/modules/auth'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { ObjectMergerPageWrapper } from './object-merger-page/object-merger-page-wrapper'

export const ObjectMergerModule: AbstractModule = {
  onInit: (): void => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/Compare Objects',
      label: 'compare_objects.nav.compare_objects',
      order: 500,
      permission: UserPermission.Objects,
      widgetConfig: {
        name: 'ObjectMergerPage',
        id: 'object-merger-page',
        component: 'object-merger-page',
        config: {
          translationKey: 'compare_objects.nav.compare_objects',
          icon: {
            type: 'name',
            value: 'compare'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'object-merger-page',
      component: ObjectMergerPageWrapper
    })
  }
}
