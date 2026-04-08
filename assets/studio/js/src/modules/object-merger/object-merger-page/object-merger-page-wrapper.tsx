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
import { isUndefined } from 'lodash'
import { type ManyToOneRelationValue } from '@pimcore/studio-ui-bundle/components'
import { ObjectMergerProvider } from '../context/object-merger-context'
import { ObjectMergerPage } from './object-merger-page'

interface ObjectMergerPageWrapperProps {
  initialObjectA?: ManyToOneRelationValue
  initialObjectB?: ManyToOneRelationValue
  [key: string]: any
}

export const ObjectMergerPageWrapper = ({ initialObjectA, initialObjectB }: ObjectMergerPageWrapperProps): React.JSX.Element => {
  const initialObjects = (!isUndefined(initialObjectA) && !isUndefined(initialObjectB))
    ? { A: initialObjectA, B: initialObjectB }
    : undefined

  return (
    <ObjectMergerProvider initialObjects={ initialObjects }>
      <ObjectMergerPage />
    </ObjectMergerProvider>
  )
}
