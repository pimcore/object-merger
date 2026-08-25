/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { ObjectMergerProvider } from '../context/object-merger-context'
import { ObjectMergerPage } from '../object-merger-page/object-merger-page'
import { type Roles } from '../types'

export interface ObjectMergerEmbeddedProps {
  objectAId: number
  objectBId: number
  /** which side receives applied values; defaults to { main: 'A', target: 'B' } */
  initialRoles?: Roles
  /** called after a merge has been saved successfully */
  onMerged?: () => void
  /** called with the new roles whenever mirroring swaps which side receives applied values */
  onRolesChanged?: (roles: Roles) => void
}

/**
 * The merger comparison view without the object-picker form, for hosts that already know
 * which two objects to compare (resolved via the 'ObjectMerger/Api' container service).
 */
export const ObjectMergerEmbedded = ({ objectAId, objectBId, initialRoles, onMerged, onRolesChanged }: ObjectMergerEmbeddedProps): React.JSX.Element => (
  <ObjectMergerProvider
    initialObjects={ {
      A: { type: 'object', id: objectAId },
      B: { type: 'object', id: objectBId }
    } }
    initialRoles={ initialRoles }
    onMerged={ onMerged }
    onRolesChanged={ onRolesChanged }
  >
    <ObjectMergerPage embedded />
  </ObjectMergerProvider>
)
