/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { map, filter, intersection, isEmpty, isUndefined } from 'lodash'
import { ComparisonCategoryName } from './constants'
import { type IMergerField } from '../../../types'

export type CategoriesList = Array<{ key: ComparisonCategoryName, fieldKeys: string[] }>

const IGNORED_FIELDS = ['reverseObjectRelation']

export const getObjectBreadcrumbsList = (data: IMergerField[]): CategoriesList => {
  const breadcrumbMap: Partial<Record<ComparisonCategoryName, Set<string>>> = {}

  data.forEach(item => {
    const breadcrumbName = item.Field.fieldBreadcrumbTitle ?? ComparisonCategoryName.SYSTEM_DATA

    if (IGNORED_FIELDS.includes(item.Field.fieldtype!)) {
      return
    }

    if (isUndefined(breadcrumbMap[breadcrumbName])) {
      breadcrumbMap[breadcrumbName] = new Set()
    }

    breadcrumbMap[breadcrumbName].add(item.Field.name)
  })

  return Object.entries(breadcrumbMap).map(([key, fieldKeysSet]) => ({
    key: key as ComparisonCategoryName,
    fieldKeys: Array.from(fieldKeysSet)
  }))
}

export const getObjectBreadcrumbsListWithFields = ({ data, breadcrumbsList }: { data: IMergerField[], breadcrumbsList?: CategoriesList }): CategoriesList => {
  // get all version field keys
  const versionFieldKeys = map(data, 'Field.name')
  const versionFieldBreadcrumbs = map(data, 'Field.fieldBreadcrumbTitle')

  if (isEmpty(breadcrumbsList)) return []

  return filter(
    // map over list to update field with matching keys
    map(breadcrumbsList, breadcrumb => ({
      ...breadcrumb, // keep initial category properties
      fieldKeys: intersection(breadcrumb.fieldKeys, versionFieldKeys) // keep only matching keys
    })),
    breadcrumb => !isEmpty(breadcrumb.fieldKeys) && versionFieldBreadcrumbs.includes(breadcrumb.key) // include only categories with non-empty fieldKeys
  )
}
