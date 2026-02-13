/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback, useMemo } from 'react'
import { isEqual, get, isEmpty, isUndefined } from 'lodash'
import { api as dataObjectApi } from '@pimcore/studio-ui-bundle/api/data-object'
import { useAppDispatch } from '@pimcore/studio-ui-bundle/app'
import { createMergerFields, getUniqFieldKey, processData } from '../helpers/details-functions'
import type { IMergerObjectData } from '../object-merger-page/components/object-merger-view/types'

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
  selectedMergerObjects: IMergerObjectData
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

export const useObjectMergerData = ({ selectedMergerObjects, objectDataRegistry }: IUseObjectMergerDataProps): IUseObjectMergerDataReturn => {
  const dispatch = useAppDispatch()

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [roles, setRoles] = useState<Roles>({
    main: 'A',
    target: 'B'
  })

  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [formattedDataA, setFormattedDataA] = useState<IFormattedFieldData[]>([])
  const [formattedDataB, setFormattedDataB] = useState<IFormattedFieldData[]>([])
  const [layoutsList, setLayoutsList] = useState<any>([])

  const [initialVersions, setInitialVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({ A: null, B: null })
  const [versions, setVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({ A: null, B: null })

  const loadLayoutData = useCallback(async (): Promise<void> => {
    if (isUndefined(selectedMergerObjects.A) || isUndefined(selectedMergerObjects.B)) {
      return
    }

    setIsLoadingData(true)

    setFormattedDataA([])
    setFormattedDataB([])
    setTouchedFields(new Set())

    try {
      const [layoutAResult, objectAResult, layoutBResult, objectBResult] =
        await Promise.all([
          dispatch(dataObjectApi.endpoints.dataObjectGetLayoutById.initiate({ id: selectedMergerObjects?.A?.id })).unwrap(),
          dispatch(dataObjectApi.endpoints.dataObjectGetById.initiate({ id: selectedMergerObjects?.A?.id })).unwrap(),
          dispatch(dataObjectApi.endpoints.dataObjectGetLayoutById.initiate({ id: selectedMergerObjects?.B?.id })).unwrap(),
          dispatch(dataObjectApi.endpoints.dataObjectGetById.initiate({ id: selectedMergerObjects?.B?.id })).unwrap()
        ])

      const formattedDataA = await processData({
        objectId: selectedMergerObjects?.A?.id,
        layout: layoutAResult?.children ?? [],
        objectData: objectAResult ?? {},
        objectDataRegistry,
        layoutsList,
        setLayoutsList
      })

      const formattedDataB = await processData({
        objectId: selectedMergerObjects?.B?.id,
        layout: layoutBResult?.children ?? [],
        objectData: objectBResult ?? {},
        objectDataRegistry,
        layoutsList,
        setLayoutsList
      })

      setFormattedDataA(formattedDataA)
      setFormattedDataB(formattedDataB)

      setInitialVersions({
        A: objectAResult?.objectData ?? {},
        B: objectBResult?.objectData ?? {}
      })
      setVersions({
        A: objectAResult?.objectData ?? {},
        B: objectBResult?.objectData ?? {}
      })

      setIsLoadingData(false)
    } catch (error) {
      setIsLoadingData(false)
      console.error('Failed to load merger data', error)
    }
  }, [selectedMergerObjects])

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
  }, [roles, initialVersions])

  const mirror = useCallback(() => {
    setRoles(prev => ({
      main: prev.target,
      target: prev.main
    }))

    setTouchedFields(new Set())
  }, [roles])

  return {
    loadLayoutData,
    isLoading: isLoadingData,
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
