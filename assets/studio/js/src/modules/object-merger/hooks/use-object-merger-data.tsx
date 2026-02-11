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
import { isEqual, get, isEmpty, differenceWith } from 'lodash'
import { useDataObjectGetLayoutByIdQuery, useDataObjectGetByIdQuery } from '@pimcore/studio-ui-bundle/api/data-object'

type VersionData = Record<string, any>

export interface IFormattedFieldData {
  fieldBreadcrumbTitle: string
  fieldData: any
  fieldValue: any
  objectKey: 'A' | 'B'
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

interface Roles {
  main: 'A' | 'B'
  target: 'A' | 'B'
}

interface IUseObjectMergerDataProps {
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

const DATATYPE_LIST = {
  LAYOUT: 'layout',
  DATA: 'data'
}

const fieldTypesRequiringChildren = ['block']

const getBreadcrumbTitle = (value1: string, value2: string): string => {
  return [value1, value2].filter(Boolean).join('/')
}

const getUniqFieldKey = (item: any): string => {
  const path = item.fieldBreadcrumbTitle ?? ''
  const name = item.fieldData?.name ?? ''
  const locale = item.fieldData?.locale ?? 'default'

  return `${path}-${name}-${locale}`
}

const processLayoutData = async ({
  data,
  objectValuesData = {},
  fieldBreadcrumbTitle = '',
  objectId,
  objectDataRegistry,
  layoutsList,
  setLayoutsList
}: {
  data: any[]
  objectValuesData?: any
  fieldBreadcrumbTitle?: string
  objectId?: number
  objectDataRegistry?: any
  layoutsList?: any
  setLayoutsList?: any
}): Promise<IFormattedFieldData[]> => {
  const results: IFormattedFieldData[] = []

  if (!Array.isArray(data)) {
    return results
  }

  const promises = data.map(async (item: any) => {
    if (item.datatype === DATATYPE_LIST.LAYOUT) {
      const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)
      return await processLayoutData({
        data: item.children ?? [],
        fieldBreadcrumbTitle: breadcrumbTitle,
        objectValuesData,
        objectId,
        objectDataRegistry,
        layoutsList,
        setLayoutsList
      })
    }

    if (item.datatype === DATATYPE_LIST.DATA) {
      const fieldName = item.name
      const fieldValueByName = get(objectValuesData, fieldName)
      const currentFieldType: string = item.fieldtype

      // Check if we have objectDataRegistry and if it supports this field type
      if (objectDataRegistry != null && objectDataRegistry.hasDynamicType?.(currentFieldType) === true) {
        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

        // Use dynamic type's processing method
        const processedDataList = await objectDataType.processVersionFieldData({
          objectId,
          item,
          fieldBreadcrumbTitle,
          fieldValueByName,
          layoutsList,
          setLayoutsList
        })

        const processedPromises = processedDataList?.map(async (processedDataItem: any): Promise<IFormattedFieldData[]> => {
          const nestedObjectData = {}

          // Handle nested children for complex types
          if (!isEmpty(processedDataItem?.fieldData?.children) &&
              !fieldTypesRequiringChildren.includes(String(processedDataItem?.fieldData?.fieldtype ?? ''))) {
            const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, String(processedDataItem?.fieldData?.title ?? ''))

            return await processLayoutData({
              data: [processedDataItem?.fieldData],
              objectValuesData: { ...nestedObjectData, [processedDataItem?.fieldData?.name]: processedDataItem?.fieldValue },
              fieldBreadcrumbTitle: breadcrumbTitle,
              objectId,
              objectDataRegistry,
              layoutsList,
              setLayoutsList
            })
          }

          return [{
            fieldBreadcrumbTitle: processedDataItem.fieldBreadcrumbTitle,
            fieldData: processedDataItem.fieldData,
            fieldValue: processedDataItem.fieldValue,
            objectKey: 'A' // Will be set correctly when processing each object
          }]
        })

        const processedResults = await Promise.all(processedPromises ?? [])
        return processedResults.reduce((acc, val) => acc.concat(val), [])
      }

      // Fallback for simple fields without objectDataRegistry
      const result: IFormattedFieldData = {
        fieldBreadcrumbTitle,
        fieldData: item,
        fieldValue: fieldValueByName,
        objectKey: 'A'
      }

      const childResults: IFormattedFieldData[] = [result]

      // Handle simple nested children
      if (item.children != null && Array.isArray(item.children) && item.children.length > 0) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, String(item.title ?? ''))
        const childObjectData = typeof fieldValueByName === 'object' ? fieldValueByName : {}
        const nestedResults = await processLayoutData({
          data: item.children,
          objectValuesData: childObjectData,
          fieldBreadcrumbTitle: breadcrumbTitle,
          objectId,
          objectDataRegistry,
          layoutsList,
          setLayoutsList
        })
        childResults.push(...nestedResults)
      }

      return childResults
    }

    return []
  })

  const allResults = await Promise.all(promises)
  return allResults.reduce((acc, val) => acc.concat(val), [])
}

const createMergerFields = (
  dataA: IFormattedFieldData[],
  dataB: IFormattedFieldData[],
  roles: Roles,
  touchedFields: Set<string>,
  currentVersions: { A: VersionData | null, B: VersionData | null },
  initialVersions: { A: VersionData | null, B: VersionData | null }
): IMergerField[] => {
  const resultList: IMergerField[] = []

  const mapA = new Map(dataA.map(item => [getUniqFieldKey(item), item]))
  const mapB = new Map(dataB.map(item => [getUniqFieldKey(item), item]))

  const allKeys = new Set([...mapA.keys(), ...mapB.keys()])

  for (const key of allKeys) {
    const itemA = mapA.get(key)
    const itemB = mapB.get(key)

    const mainItem = roles.main === 'A' ? itemA : itemB
    const targetItem = roles.target === 'B' ? itemB : itemA

    const fieldName = (mainItem?.fieldData?.name ?? targetItem?.fieldData?.name)!
    const targetCurrentValue = roles.target === 'B'
      ? get(currentVersions.B, fieldName)
      : get(currentVersions.A, fieldName)

    const mainValue = mainItem?.fieldValue ?? null
    const targetValue = targetCurrentValue ?? targetItem?.fieldValue ?? null

    const field: IMergerField = {
      Field: {
        fieldBreadcrumbTitle: (mainItem?.fieldBreadcrumbTitle ?? targetItem?.fieldBreadcrumbTitle)!,
        name: fieldName,
        title: (mainItem?.fieldData?.title ?? targetItem?.fieldData?.title),
        fieldtype: (mainItem?.fieldData?.fieldtype ?? targetItem?.fieldData?.fieldtype),
        locale: (mainItem?.fieldData?.locale ?? targetItem?.fieldData?.locale)
      },
      main: mainValue,
      target: targetValue,
      isTouched: touchedFields.has(key),
      isDifferent: !isEqual(mainValue, targetValue)
    }

    if (field.isDifferent && field.Field.fieldtype === 'fieldcollections') {
      const mainFieldValue = mainValue as IFieldCollectionValue[] | null
      const targetFieldValue = targetValue as IFieldCollectionValue[] | null

      if (Array.isArray(mainFieldValue) || Array.isArray(targetFieldValue)) {
        const mainLength = mainFieldValue?.length ?? 0
        const targetLength = targetFieldValue?.length ?? 0

        const mainList = targetLength > mainLength ? targetFieldValue : mainFieldValue
        const compareList = mainLength < targetLength ? mainFieldValue : targetFieldValue

        const differences = differenceWith(
          mainList ?? [],
          compareList ?? [],
          (item1, item2) => {
            return item1?.type === item2?.type && isEqual(item1?.data, item2?.data)
          }
        )

        field.fieldCollectionModifiedList = differences.map(item => item.type)
      }
    }

    resultList.push(field)
  }

  return resultList
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

        const formatted = await processLayoutData({
          data: layoutChildren,
          objectValuesData: objectValues,
          fieldBreadcrumbTitle: '',
          objectId: selectedIds.A ?? undefined,
          objectDataRegistry,
          layoutsList,
          setLayoutsList
        })

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

        const formatted = await processLayoutData({
          data: layoutChildren,
          objectValuesData: objectValues,
          fieldBreadcrumbTitle: '',
          objectId: selectedIds.B ?? undefined,
          objectDataRegistry,
          layoutsList,
          setLayoutsList
        })

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
    return createMergerFields(formattedDataA, formattedDataB, roles, touchedFields, versions, initialVersions)
  }, [formattedDataA, formattedDataB, roles, touchedFields, versions, initialVersions])

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
