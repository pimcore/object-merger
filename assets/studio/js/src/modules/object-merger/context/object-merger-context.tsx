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

export type VersionId = number

interface IObjectMergerDataContext extends IUseObjectMergerDataReturn {
  selectedIds: { A: VersionId | null, B: VersionId | null }
  setSelectedIds: (ids: { A: VersionId | null, B: VersionId | null }) => void
}

const ObjectMergerDataContext = createContext<ReturnType<any> | null>(null)

export const ObjectMergerProvider = ({ children }: any): React.JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<{ A: VersionId | null, B: VersionId | null }>({
    A: null,
    B: null
  })

  const objectMergerDataValue = useObjectMergerData({ selectedIds })

  const contextValue: any = useMemo(() => ({
    ...objectMergerDataValue,
    selectedIds,
    setSelectedIds
  }), [objectMergerDataValue, selectedIds, setSelectedIds])

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
