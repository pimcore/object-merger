/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { differenceWith, get, isEmpty, isEqual } from 'lodash'
import {
  type IFieldCollectionValue,
  type IFormattedFieldData,
  type IMergerField,
  type Roles,
  type VersionData
} from '../hooks/use-object-merger-data'

enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

export const getBreadcrumbTitle = (value1: string, value2: string): string => {
  return [value1, value2].filter(Boolean).join('/')
}

const fieldTypesRequiringChildren = ['block']

export const processLayoutData = async ({ data, objectValuesData = {}, fieldBreadcrumbTitle = '', objectId, objectDataRegistry, layoutsList, setLayoutsList }: {
  data: any[]
  objectValuesData?: any
  fieldBreadcrumbTitle?: string
  objectId?: number
  objectDataRegistry?: any
  layoutsList?: any
  setLayoutsList?: any
}): Promise<IFormattedFieldData[]> => {
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

      if (objectDataRegistry != null && objectDataRegistry.hasDynamicType?.(currentFieldType) === true) {
        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

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
            fieldValue: processedDataItem.fieldValue
          }]
        })

        const processedResults = await Promise.all(processedPromises ?? [])
        return processedResults.reduce((acc, val) => acc.concat(val), [])
      }

      const result: IFormattedFieldData = {
        fieldBreadcrumbTitle,
        fieldData: item,
        fieldValue: fieldValueByName
      }

      const childResults: IFormattedFieldData[] = [result]

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

export const getUniqFieldKey = (item: any): string => {
  const path = item.fieldBreadcrumbTitle ?? ''
  const name = item.fieldData?.name ?? ''
  const locale = item.fieldData?.locale ?? 'default'

  return `${path}-${name}-${locale}`
}

export const createMergerFields = (
  dataA: IFormattedFieldData[],
  dataB: IFormattedFieldData[],
  roles: Roles,
  touchedFields: Set<string>,
  currentVersions: { A: VersionData | null, B: VersionData | null }
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
