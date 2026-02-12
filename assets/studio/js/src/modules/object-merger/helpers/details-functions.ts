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
import { formatDateTime } from '@pimcore/studio-ui-bundle/utils'

enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

export const getBreadcrumbTitle = (value1: string, value2: string): string => {
  return [value1, value2].filter(Boolean).join('/')
}

const fieldTypesRequiringChildren = ['block']

export const getGeneralSystemData = (objectValuesData: any): IFormattedFieldData[] => {
  const formattedSystemData = {
    fullPath: objectValuesData?.fullPath ?? '',
    creationDate: formatDateTime({ timestamp: objectValuesData?.creationDate ?? null, dateStyle: 'short', timeStyle: 'medium' }),
    modificationDate: formatDateTime({ timestamp: objectValuesData?.modificationDate ?? null, dateStyle: 'short', timeStyle: 'medium' })
  }

  const result: IFormattedFieldData[] = []

  Object.entries(formattedSystemData).forEach(([key, value]): void => {
    result.push({
      fieldBreadcrumbTitle: 'systemData',
      fieldData: { title: key, name: key, fieldtype: 'input' } as any,
      fieldValue: value
    })
  })

  return result
}

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

      return await processLayoutData({ data: item.children ?? [], fieldBreadcrumbTitle: breadcrumbTitle, objectValuesData, objectDataRegistry })
    }

    if (item.datatype === DATATYPE_LIST.DATA) {
      const fieldName = item.name
      const fieldValueByName = get(objectValuesData, fieldName)
      const currentFieldType: string = item.fieldtype

      console.log('------ objectDataRegistry: ', objectDataRegistry)
      console.log('------ currentFieldType: ', currentFieldType)

      if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
        return []
      }

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

        return [processedDataItem]
      })

      return (await Promise.all(processedPromises ?? [])).reduce((acc, val) => acc.concat(val), [])
    }

    return []
  })

  const layoutData = await Promise.all(promises)
  return layoutData.reduce((acc, val) => acc.concat(val), [])
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
  console.log('---->>>>> dataA: ', dataA)
  console.log('---->>>>> dataB: ', dataB)

  const resultList: IMergerField[] = []

  const mapA = new Map(dataA.map(item => [getUniqFieldKey(item), item]))
  const mapB = new Map(dataB.map(item => [getUniqFieldKey(item), item]))

  console.log('---->>>>> mapA: ', mapA)

  const allKeys = new Set([...mapA.keys(), ...mapB.keys()])

  console.log('---->>>>> allKeys: ', allKeys)

  for (const key of allKeys) {
    const itemA = mapA.get(key)
    const itemB = mapB.get(key)

    const mainItem = roles.main === 'A' ? itemA : itemB
    const targetItem = roles.target === 'B' ? itemB : itemA

    const fieldName = (mainItem?.fieldData?.name ?? targetItem?.fieldData?.name)!
    const targetCurrentValue = roles.target === 'B'
      ? get(currentVersions.B, fieldName)
      : get(currentVersions.A, fieldName)
    console.log('---->>>>> fieldName: ', fieldName)
    console.log('---->>>>> targetCurrentValue: ', targetCurrentValue)

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
      isDifferent: !isEqual(mainValue, targetValue)
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

    console.log('---->>>>> field: ', field)

    resultList.push(field)
  }

  return resultList
}
