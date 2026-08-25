/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ComponentType } from 'react'
import { store } from '@pimcore/studio-ui-bundle/app'
import { openMainWidget } from '@pimcore/studio-ui-bundle/modules/widget-manager'
import { ObjectMergerEmbedded, type ObjectMergerEmbeddedProps } from '../embedded/object-merger-embedded'

export interface ObjectMergerApi {
  /** opens the merger as a main-area tab with both objects preselected */
  mergeObjects: (mainId: number, targetId: number) => void
  /** the comparison view without the object-picker form, for embedding into a host surface */
  EmbeddedComponent: ComponentType<ObjectMergerEmbeddedProps>
}

export const mergeObjects = (mainId: number, targetId: number): void => {
  store.dispatch(openMainWidget({
    name: 'ObjectMergerPage',
    id: `object-merger-page-${mainId}-${targetId}`,
    component: 'object-merger-page',
    config: {
      translationKey: 'compare_objects.nav.compare_objects',
      icon: {
        type: 'name',
        value: 'compare'
      },
      initialObjectA: { type: 'object', id: mainId },
      initialObjectB: { type: 'object', id: targetId }
    }
  }))
}

export const objectMergerApi: ObjectMergerApi = {
  mergeObjects,
  EmbeddedComponent: ObjectMergerEmbedded
}
