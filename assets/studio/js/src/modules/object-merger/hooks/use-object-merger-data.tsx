/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback, useEffect, useMemo } from 'react'
import { isEqual, get, isEmpty } from 'lodash'
import { useDataObjectGetLayoutByIdQuery, useDataObjectGetByIdQuery } from '@pimcore/studio-ui-bundle/api/data-object'
import { createMergerFields, getUniqFieldKey, processLayoutData, getGeneralSystemData } from '../helpers/details-functions'

export type VersionData = Record<string, any>

export interface IFormattedFieldData {
  fieldBreadcrumbTitle: string
  fieldData: any
  fieldValue: any
}

export interface IFieldCollectionValue {
  type: string
  data: any
}

export interface IMergerField {
  Field: {
    fieldBreadcrumbTitle: string
    name: string
    title?: string
    fieldtype?: string
    locale?: string
  }
  main: any
  target: any
  isDifferent: boolean
  isTouched: boolean
  fieldCollectionModifiedList?: string[]
}

export interface Roles {
  main: 'A' | 'B'
  target: 'A' | 'B'
}

export interface IUseObjectMergerDataProps {
  selectedIds: { A: number | null, B: number | null }
  objectDataRegistry?: any
}

export interface IUseObjectMergerDataReturn {
  loadLayoutData: () => void
  isLoading: boolean
  mergerFields: IMergerField[]
  roles: Roles
  touchedFields: Set<string>
  copyFieldToTarget: (fieldKey: string) => void
  applyAll: () => void
  resetField: (fieldKey: string) => void
  resetAll: () => void
  mirror: () => void
  versions: { A: VersionData | null, B: VersionData | null }
  initialVersions: { A: VersionData | null, B: VersionData | null }
}

export const useObjectMergerData = ({ selectedIds, objectDataRegistry }: IUseObjectMergerDataProps): IUseObjectMergerDataReturn => {
  const [shouldFetchObjectA, setShouldFetchObjectA] = useState(false)
  const [shouldFetchObjectB, setShouldFetchObjectB] = useState(false)

  const [roles, setRoles] = useState<Roles>({
    main: 'A',
    target: 'B'
  })

  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const [formattedDataA, setFormattedDataA] = useState<IFormattedFieldData[]>([])
  const [formattedDataB, setFormattedDataB] = useState<IFormattedFieldData[]>([])

  const [layoutsList, setLayoutsList] = useState<any>({})

  const [initialVersions, setInitialVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({
    A: null,
    B: null
  })
  const [versions, setVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({
    A: null,
    B: null
  })

  const { data: layoutDataObjectA, isLoading: isLoadingLayoutObjectA } = useDataObjectGetLayoutByIdQuery(
    { id: selectedIds.A! },
    { skip: !shouldFetchObjectA || selectedIds.A === null }
  )
  const { data: objectDataA, isLoading: isLoadingObjectDataA } = useDataObjectGetByIdQuery(
    { id: selectedIds.A! },
    { skip: !shouldFetchObjectA || selectedIds.A === null }
  )

  const { data: layoutDataObjectB, isLoading: isLoadingLayoutObjectB } = useDataObjectGetLayoutByIdQuery(
    { id: selectedIds.B! },
    { skip: !shouldFetchObjectB || selectedIds.B === null }
  )
  const { data: objectDataB, isLoading: isLoadingObjectDataB } = useDataObjectGetByIdQuery(
    { id: selectedIds.B! },
    { skip: !shouldFetchObjectB || selectedIds.B === null }
  )

  const loadLayoutData = useCallback(() => {
    if (selectedIds.A !== null && selectedIds.B !== null) {
      setShouldFetchObjectA(true)
      setShouldFetchObjectB(true)
    }
  }, [selectedIds.A, selectedIds.B])

  useEffect(() => {
    if (layoutDataObjectA !== undefined && objectDataA !== undefined && shouldFetchObjectA) {
      const processData = async (): Promise<void> => {
        const layoutChildren = layoutDataObjectA?.children ?? []
        const objectValues = objectDataA?.objectData ?? {}

        const layoutData = await processLayoutData({
          data: layoutChildren,
          objectValuesData: objectValues,
          fieldBreadcrumbTitle: '',
          objectId: selectedIds.A ?? undefined,
          objectDataRegistry,
          layoutsList,
          setLayoutsList
        })

        const generalSystemData = getGeneralSystemData(objectDataA)
        const formatted = [...generalSystemData, ...layoutData]

        setFormattedDataA(formatted)
        setInitialVersions(prev => ({ ...prev, A: objectValues }))
        setVersions(prev => ({ ...prev, A: objectValues }))

        setShouldFetchObjectA(false)
      }

      void processData()
    }
  }, [layoutDataObjectA, objectDataA, shouldFetchObjectA, selectedIds.A, objectDataRegistry, layoutsList, setLayoutsList])

  useEffect(() => {
    if (layoutDataObjectB !== undefined && objectDataB !== undefined && shouldFetchObjectB) {
      const processData = async (): Promise<void> => {
        const layoutChildren = layoutDataObjectB?.children ?? []
        const objectValues = objectDataB?.objectData ?? {}

        const layoutData = await processLayoutData({
          data: layoutChildren,
          objectValuesData: objectValues,
          fieldBreadcrumbTitle: '',
          objectId: selectedIds.B ?? undefined,
          objectDataRegistry,
          layoutsList,
          setLayoutsList
        })

        const generalSystemData = getGeneralSystemData(objectDataB)
        const formatted = [...generalSystemData, ...layoutData]

        setFormattedDataB(formatted)
        setInitialVersions(prev => ({ ...prev, B: objectValues }))
        setVersions(prev => ({ ...prev, B: objectValues }))

        setShouldFetchObjectB(false)
      }

      void processData()
    }
  }, [layoutDataObjectB, objectDataB, shouldFetchObjectB, selectedIds.B, objectDataRegistry, layoutsList, setLayoutsList])

  const mergerFields = useMemo(() => {
    if (isEmpty(formattedDataA) || isEmpty(formattedDataB)) {
      return []
    }
    return createMergerFields(formattedDataA, formattedDataB, roles, touchedFields, versions)
  }, [formattedDataA, formattedDataB, roles, touchedFields, versions])

  const copyFieldToTarget = useCallback((fieldKey: string) => {
    const formattedDataMain = roles.main === 'A' ? formattedDataA : formattedDataB
    const fieldMain = formattedDataMain.find(item => getUniqFieldKey(item) === fieldKey)

    if (fieldMain != null) {
      const targetKey = roles.target
      setVersions(prev => ({
        ...prev,
        [targetKey]: {
          ...prev[targetKey],
          [fieldMain.fieldData.name]: fieldMain.fieldValue
        }
      }))

      setTouchedFields(prev => new Set([...prev, fieldKey]))
      console.log(`Copied field "${fieldMain.fieldData.name}" from ${roles.main} to ${roles.target}`)
    }
  }, [formattedDataA, formattedDataB, roles])

  const applyAll = useCallback(() => {
    const formattedDataMain = roles.main === 'A' ? formattedDataA : formattedDataB
    const formattedDataTarget = roles.target === 'B' ? formattedDataB : formattedDataA

    const newTouchedFields = new Set<string>()
    const targetKey = roles.target
    const updatedTargetData = { ...versions[targetKey] }

    formattedDataMain.forEach((mainItem) => {
      const fieldKey = getUniqFieldKey(mainItem)
      const targetItem = formattedDataTarget.find(item => getUniqFieldKey(item) === fieldKey)

      if (!isEqual(mainItem.fieldValue, targetItem?.fieldValue)) {
        updatedTargetData[mainItem.fieldData.name] = mainItem.fieldValue
        newTouchedFields.add(fieldKey)
      }
    })

    setVersions(prev => ({
      ...prev,
      [targetKey]: updatedTargetData
    }))

    setTouchedFields(prev => new Set([...prev, ...newTouchedFields]))
    console.log(`Applied all changes from ${roles.main} to ${roles.target}. Total fields: ${newTouchedFields.size}`)
  }, [formattedDataA, formattedDataB, roles, versions])

  const resetField = useCallback((fieldKey: string) => {
    const formattedDataTarget = roles.target === 'B' ? formattedDataB : formattedDataA
    const fieldTarget = formattedDataTarget.find(item => getUniqFieldKey(item) === fieldKey)

    if (fieldTarget != null) {
      const targetKey = roles.target
      const initialValue = get(initialVersions[targetKey], fieldTarget.fieldData.name)

      setVersions(prev => ({
        ...prev,
        [targetKey]: {
          ...prev[targetKey],
          [fieldTarget.fieldData.name]: initialValue
        }
      }))

      setTouchedFields(prev => {
        const newSet = new Set(prev)
        newSet.delete(fieldKey)
        return newSet
      })
      console.log(`Reset field "${fieldTarget.fieldData.name}" in ${roles.target} to initial value`)
    }
  }, [formattedDataA, formattedDataB, roles, initialVersions])

  const resetAll = useCallback(() => {
    const targetKey = roles.target
    setVersions(prev => ({
      ...prev,
      [targetKey]: initialVersions[targetKey]
    }))

    setTouchedFields(new Set())
    console.log(`Reset all fields in ${roles.target} to initial values`)
  }, [roles, initialVersions])

  const mirror = useCallback(() => {
    setRoles(prev => ({
      main: prev.target,
      target: prev.main
    }))

    setTouchedFields(new Set())
    console.log(`Mirrored roles: main is now ${roles.target}, target is now ${roles.main}`)
  }, [roles])

  const isLoading = isLoadingLayoutObjectA === true || isLoadingObjectDataA === true || isLoadingLayoutObjectB === true || isLoadingObjectDataB === true

  return {
    loadLayoutData,
    isLoading,
    mergerFields,
    roles,
    touchedFields,
    copyFieldToTarget,
    applyAll,
    resetField,
    resetAll,
    mirror,
    versions,
    initialVersions
  }
}
