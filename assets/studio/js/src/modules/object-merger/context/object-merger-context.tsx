/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
import { isUndefined } from 'lodash'
import { type IUseObjectMergerDataReturn, useObjectMergerData } from '../hooks/use-object-merger-data'
import { type DynamicTypeObjectDataRegistry, serviceIds, useInjection } from '@pimcore/studio-ui-bundle/app'

export type VersionId = number

interface IObjectMergerDataContext extends IUseObjectMergerDataReturn {
  selectedIds: { A: VersionId | null, B: VersionId | null }
  setSelectedIds: (ids: { A: VersionId | null, B: VersionId | null }) => void
  canCompare: boolean
}

const ObjectMergerDataContext = createContext<IObjectMergerDataContext | undefined>(undefined)

export const ObjectMergerProvider = ({ children }: any): React.JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<{ A: VersionId | null, B: VersionId | null }>({
    A: null,
    B: null
  })

  const canCompare = useMemo(
    () => selectedIds?.A != null && selectedIds?.B != null,
    [selectedIds?.A, selectedIds?.B]
  )
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  console.log('===== objectDataRegistry: ', objectDataRegistry)

  const objectMergerDataValue = useObjectMergerData({ selectedIds, objectDataRegistry })

  const contextValue: IObjectMergerDataContext = useMemo(() => ({
    ...objectMergerDataValue,
    selectedIds,
    setSelectedIds,
    canCompare
  }), [objectMergerDataValue, selectedIds, setSelectedIds, canCompare])

  return (
    <ObjectMergerDataContext.Provider value={ contextValue }>
      {children}
    </ObjectMergerDataContext.Provider>
  )
}

export const useObjectMergerContext = (): IObjectMergerDataContext => {
  const context = useContext(ObjectMergerDataContext)

  if (isUndefined(context)) {
    throw new Error('useReportDataContext must be used within a ReportDataProvider')
  }

  return context
}
