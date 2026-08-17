/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { isUndefined } from 'lodash'
import { serviceIds, useInjection } from '@pimcore/studio-ui-bundle/app'
import { type DynamicTypeObjectDataRegistry } from '@pimcore/studio-ui-bundle/modules/element'
import { type IUseObjectMergerDataReturn, useObjectMergerData } from '../hooks/use-object-merger-data'
import { type IMergerObjectData } from '../object-merger-page/components/object-merger-view/types'
import { type Roles } from '../types'

interface IObjectMergerProviderProps {
  children: ReactNode
  initialObjects?: IMergerObjectData
  initialRoles?: Roles
  onMerged?: () => void
}

interface IObjectMergerDataContext extends IUseObjectMergerDataReturn {
  selectedMergerObjects: IMergerObjectData
  setSelectedMergerObjects: (ids: IMergerObjectData) => void
  autoCompare: boolean
}

const ObjectMergerDataContext = createContext<IObjectMergerDataContext | undefined>(undefined)

export const ObjectMergerProvider = ({ children, initialObjects, initialRoles, onMerged }: IObjectMergerProviderProps): React.JSX.Element => {
  const [selectedMergerObjects, setSelectedMergerObjects] = useState<IMergerObjectData>({
    A: initialObjects?.A,
    B: initialObjects?.B
  })

  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  const objectMergerDataValue = useObjectMergerData({ selectedMergerObjects, objectDataRegistry, initialRoles, onMerged })

  const { setCanCompare, setIsSameObjectType } = objectMergerDataValue

  const autoCompare = !isUndefined(initialObjects?.A) && !isUndefined(initialObjects?.B)

  useEffect(() => {
    const bothObjectsSelected = !isUndefined(selectedMergerObjects?.A) && !isUndefined(selectedMergerObjects?.B)

    setIsSameObjectType(true)
    setCanCompare(bothObjectsSelected)
  }, [selectedMergerObjects?.A, selectedMergerObjects?.B])

  const contextValue: IObjectMergerDataContext = useMemo(() => ({
    ...objectMergerDataValue,
    selectedMergerObjects,
    setSelectedMergerObjects,
    autoCompare
  }), [objectMergerDataValue, selectedMergerObjects, setSelectedMergerObjects, autoCompare])

  return (
    <ObjectMergerDataContext.Provider value={ contextValue }>
      {children}
    </ObjectMergerDataContext.Provider>
  )
}

export const useObjectMergerContext = (): IObjectMergerDataContext => {
  const context = useContext(ObjectMergerDataContext)

  if (isUndefined(context)) {
    throw new Error('useObjectMergerContext must be used within a ObjectMergerProvider')
  }

  return context
}
