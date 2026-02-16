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
import { formatDateTime, isEmptyValue } from '@pimcore/studio-ui-bundle/utils'

enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

export const getBreadcrumbTitle = (value1: string, value2: string): string => {
  return [value1, value2].filter(Boolean).join('/')
}

const fieldTypesRequiringChildren = ['block']

export const processData = async ({ objectId, layout, objectData, objectDataRegistry, layoutsList, setLayoutsList }: {
  objectId?: number
  layout: any[]
  objectData?: any
  objectDataRegistry: any
  layoutsList?: any
  setLayoutsList?: any
}): Promise<IFormattedFieldData[]> => {
  const formattedSystemData = {
    fullPath: objectData?.fullPath ?? '',
    creationDate: formatDateTime({ timestamp: objectData?.creationDate ?? null, dateStyle: 'short', timeStyle: 'medium' }),
    modificationDate: formatDateTime({ timestamp: objectData?.modificationDate ?? null, dateStyle: 'short', timeStyle: 'medium' })
  }

  const processLayoutData = async ({ data, objectValuesData = objectData?.objectData, fieldBreadcrumbTitle = '', fieldPath = '' }: {
    data: any[]
    objectValuesData?: any
    fieldBreadcrumbTitle?: string
    fieldPath?: string
  }): Promise<IFormattedFieldData[]> => {
    const promises = data.map(async (item: any) => {
      if (item.datatype === DATATYPE_LIST.LAYOUT) {
        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title as string)

        return await processLayoutData({ data: item.children, fieldBreadcrumbTitle: breadcrumbTitle, objectValuesData, fieldPath })
      }

      if (item.datatype === DATATYPE_LIST.DATA) {
        const fieldName = item.name
        const fieldValueByName = get(objectValuesData, fieldName)
        const currentFieldType: string = item.fieldtype

        const getFieldPathValue = isEmptyValue(fieldPath) ? fieldName : `${fieldPath}.${fieldName}`

        if (objectDataRegistry.hasDynamicType(currentFieldType) === false) {
          return []
        }

        const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

        const processedDataList = await objectDataType.processVersionFieldData({ objectId, item, fieldBreadcrumbTitle, fieldValueByName, layoutsList, setLayoutsList, fieldPath: getFieldPathValue })
        const processedPromises = processedDataList?.map(async (processedDataItem: any): Promise<IFormattedFieldData[]> => {
          objectValuesData = {}

          if (!isEmpty(processedDataItem?.fieldData?.children) && !fieldTypesRequiringChildren.includes(String(processedDataItem?.fieldData?.fieldtype ?? ''))) {
            const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, String(processedDataItem?.fieldData?.title ?? ''))

            return await processLayoutData({
              data: [processedDataItem?.fieldData],
              objectValuesData: { ...objectValuesData, [processedDataItem?.fieldData?.name]: processedDataItem?.fieldValue },
              fieldBreadcrumbTitle: breadcrumbTitle,
              fieldPath: processedDataItem?.fieldPath ?? ''
            })
          }

          return [processedDataItem]
        })

        return (await Promise.all(processedPromises)).reduce((acc, val) => acc.concat(val), [])
      }

      return []
    })

    return (await Promise.all(promises)).reduce((acc, val) => acc.concat(val), [])
  }

  const getGeneralSystemData = (): IFormattedFieldData[] => {
    const result: IFormattedFieldData[] = []

    Object.entries(formattedSystemData).forEach(([key, value]): void => {
      result.push({ fieldBreadcrumbTitle: 'systemData', fieldData: { title: key, name: key, fieldtype: 'input' } as any, fieldValue: value })
    })

    return result
  }

  const layoutData = await processLayoutData({ data: layout })
  const generalSystemData = getGeneralSystemData()

  return [...generalSystemData, ...layoutData]
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

    const fieldPath = (mainItem?.fieldPath ?? targetItem?.fieldPath)!

    const targetCurrentValue = roles.target === 'B'
      ? get(currentVersions.B, fieldPath)
      : get(currentVersions.A, fieldPath)

    const mainValue = mainItem?.fieldValue ?? null
    const targetValue = targetCurrentValue ?? targetItem?.fieldValue ?? null

    const field: IMergerField = {
      Field: {
        fieldBreadcrumbTitle: (mainItem?.fieldBreadcrumbTitle ?? targetItem?.fieldBreadcrumbTitle)!,
        ...(mainItem?.fieldData ?? targetItem?.fieldData)
      },
      main: mainValue,
      target: targetValue,
      isTouched: touchedFields.has(key),
      isDifferent: !isEqual(mainValue, targetValue),
      fieldPath: mainItem?.fieldPath ?? targetItem?.fieldPath
    }

    if (field.Field.fieldtype === 'fieldcollections') {
      const mainLength = mainValue?.length ?? 0
      const targetLength = targetValue?.length ?? 0

      const mainList = targetLength > mainLength ? itemB : itemA
      const targetList = mainLength < targetLength ? itemA : itemB

      const differences = differenceWith(
        mainList?.fieldValue as IFieldCollectionValue[] ?? [],
        targetList?.fieldValue as IFieldCollectionValue[] ?? [],
        (item1, item2) => {
          return item1?.type === item2?.type && isEqual(item1?.data, item2?.data)
        }
      )

      field.fieldCollectionModifiedList = differences.map(item => item.type)
    }

    resultList.push(field)
  }

  return resultList
}
