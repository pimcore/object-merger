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
import { type IMergerObjectData } from '../object-merger-page/components/object-merger-view/types'

interface IObjectMergerDataContext extends IUseObjectMergerDataReturn {
  selectedMergerObjects: IMergerObjectData
  setSelectedMergerObjects: (ids: IMergerObjectData) => void
  canCompare: boolean
}

const ObjectMergerDataContext = createContext<IObjectMergerDataContext | undefined>(undefined)

export const ObjectMergerProvider = ({ children }: any): React.JSX.Element => {
  const [selectedMergerObjects, setSelectedMergerObjects] = useState<IMergerObjectData>({
    A: undefined,
    B: undefined
  })

  const canCompare = useMemo(
    () => !isUndefined(selectedMergerObjects?.A) && !isUndefined(selectedMergerObjects?.B),
    [selectedMergerObjects?.A, selectedMergerObjects?.B]
  )
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  const objectMergerDataValue = useObjectMergerData({ selectedMergerObjects, objectDataRegistry })

  const contextValue: IObjectMergerDataContext = useMemo(() => ({
    ...objectMergerDataValue,
    selectedMergerObjects,
    setSelectedMergerObjects,
    canCompare
  }), [objectMergerDataValue, selectedMergerObjects, setSelectedMergerObjects, canCompare])

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
