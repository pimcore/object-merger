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
import { isEqual, get, set, cloneDeep, isEmpty, isUndefined } from 'lodash'
import { api as dataObjectApi } from '@pimcore/studio-ui-bundle/api/data-object'
import { useAppDispatch } from '@pimcore/studio-ui-bundle/app'
import { createMergerFields, processData } from '../helpers/details-functions'
import type { IMergerObjectData } from '../object-merger-page/components/object-merger-view/types'
import { isEmptyValue } from '@pimcore/studio-ui-bundle/utils'

export type VersionData = Record<string, any>

export interface IFormattedFieldData {
  fieldBreadcrumbTitle: string
  fieldData: any
  fieldValue: any
  fieldPath?: string
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
  fieldPath?: string
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
  isFetching: boolean
  refetch: () => void
  isLoading: boolean
  mergerFields: IMergerField[]
  roles: Roles
  touchedFields: Set<string>
  copyFieldToTarget: (fieldPath: string) => void
  applyAll: () => void
  resetField: (fieldPath: string) => void
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

  const loadLayoutData = async (): Promise<void> => {
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

      const initialA = objectAResult?.objectData ?? {}
      const initialB = objectBResult?.objectData ?? {}

      setInitialVersions({
        A: initialA,
        B: initialB
      })
      setVersions({
        A: cloneDeep(initialA),
        B: cloneDeep(initialB)
      })
    } catch (error) {
      console.error('Failed to load merger data', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const mergerFields = useMemo(() => {
    if (isEmpty(formattedDataA) || isEmpty(formattedDataB)) {
      return []
    }

    return createMergerFields(formattedDataA, formattedDataB, roles, touchedFields, versions)
  }, [formattedDataA, formattedDataB, roles, touchedFields, versions])

  const refetch = (): void => { void loadLayoutData() }

  const copyFieldToTarget = useCallback((fieldPath: string) => {
    const mainKey = roles.main
    const targetKey = roles.target

    const mainValue = get(versions[mainKey], fieldPath)

    setVersions(prev => {
      const newVersions = cloneDeep(prev)

      set(newVersions[targetKey] as object, fieldPath, mainValue)

      return newVersions
    })

    setTouchedFields(prev => new Set([...prev, fieldPath]))
  }, [roles, versions])

  const applyAll = useCallback(() => {
    const formattedDataMain = roles.main === 'A' ? formattedDataA : formattedDataB
    const formattedDataTarget = roles.target === 'B' ? formattedDataB : formattedDataA

    const mainKey = roles.main
    const targetKey = roles.target

    const newTouchedFields = new Set<string>()
    const updatedTargetData = cloneDeep(versions[targetKey])

    formattedDataMain.forEach((mainItem) => {
      const targetItem = formattedDataTarget.find(item => item.fieldPath === mainItem.fieldPath)

      if (!isEqual(mainItem.fieldValue, targetItem?.fieldValue)) {
        const fieldPath = !isEmptyValue(mainItem.fieldPath) ? mainItem.fieldPath : mainItem.fieldData.name
        const mainValue = get(versions[mainKey], fieldPath)

        set(updatedTargetData as object, fieldPath as string, mainValue)

        newTouchedFields.add(fieldPath as string)
      }
    })

    setVersions(prev => ({
      ...prev,
      [targetKey]: updatedTargetData
    }))

    setTouchedFields(prev => new Set([...prev, ...newTouchedFields]))
  }, [formattedDataA, formattedDataB, roles, versions])

  const resetField = useCallback((fieldPath: string) => {
    const targetKey = roles.target
    const initialValue = get(initialVersions[targetKey], fieldPath)

    setVersions(prev => {
      const newVersions = cloneDeep(prev)

      if (newVersions[targetKey] !== null) {
        set(newVersions[targetKey] as object, fieldPath, initialValue)
      }

      return newVersions
    })

    setTouchedFields(prev => {
      const newSet = new Set(prev)

      newSet.delete(fieldPath)

      return newSet
    })
  }, [roles, initialVersions])

  const resetAll = useCallback(() => {
    const targetKey = roles.target

    setVersions(prev => ({
      ...prev,
      [targetKey]: cloneDeep(initialVersions[targetKey])
    }))

    setTouchedFields(new Set())
  }, [roles, initialVersions])

  const mirror = (): void => {
    setRoles(prev => ({
      main: prev.target,
      target: prev.main
    }))

    setVersions({
      A: cloneDeep(initialVersions.A),
      B: cloneDeep(initialVersions.B)
    })

    setTouchedFields(new Set())
  }

  return {
    loadLayoutData,
    refetch,
    isFetching: isLoadingData,
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
