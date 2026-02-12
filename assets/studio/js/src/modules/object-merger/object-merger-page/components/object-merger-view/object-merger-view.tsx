/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { isEmpty, isEqual, isUndefined } from 'lodash'
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { isEmptyValue } from '@pimcore/studio-ui-bundle/utils'
import { Content, Flex, Text } from '@pimcore/studio-ui-bundle/components'
import { DataComponent, DataObjectProvider } from '@pimcore/studio-ui-bundle/modules/data-object'
import { useObjectMergerContext } from '../../../context/object-merger-context'
import {
  type CategoriesList,
  getObjectBreadcrumbsList,
  getObjectBreadcrumbsListWithFields
} from './helpers/objectBreadcrumbsHelper'

export enum VersionCategoryName {
  SYSTEM_DATA = 'systemData',
  META = 'meta'
}

export const ObjectMergerView = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { selectedIds, canCompare, mergerFields, isLoading } = useObjectMergerContext()

  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(true)

  const mergerModifiedFields = mergerFields.filter((item) => {
    return !isEqual(item?.main, item?.target)
  })
  const mergerData = isExpandedUnmodifiedFields ? mergerFields : mergerModifiedFields

  const sectionsList = useMemo(() => {
    return getObjectBreadcrumbsList(mergerData)
  }, [mergerData])

  const breadcrumbsList = useMemo((): CategoriesList | undefined => {
    return getObjectBreadcrumbsListWithFields({
      data: mergerData,
      breadcrumbsList: sectionsList
    })
  }, [isExpandedUnmodifiedFields, sectionsList])
  const modifiedFields = useMemo(() => {
    if (!isEmpty(mergerModifiedFields)) {
      return mergerModifiedFields.map((item) => item.Field.title)
    }

    return []
  }, [mergerModifiedFields])
  const hasModifiedFields = !isUndefined(modifiedFields) && modifiedFields.length > 0

  console.log('------ mergerFields: ', mergerFields)
  console.log('------ mergerData: ', mergerData)

  const renderSectionTitle = ({ key, isCommonSection }: { key: string, isCommonSection: boolean }): React.JSX.Element | null => {
    const isShowValueWithTranslation = ['systemData'].includes(key)
    const textValue = isShowValueWithTranslation ? t(`version.category.title.${key}`) : key

    const titleParts = textValue.split('/')
    const translatedTitleParts = isShowValueWithTranslation ? titleParts : titleParts.map(part => t(part))
    const [firstTitlePart, ...remainingTitleParts] = translatedTitleParts

    const secondTitlePart = remainingTitleParts.length > 0 ? ` | ${remainingTitleParts.join(' | ')}` : ''

    return (
      (!isEmptyValue(firstTitlePart) || !isEmptyValue(secondTitlePart))
        ? (
          <Text strong>
            {firstTitlePart}
            {!isEmptyValue(secondTitlePart) && <span>{secondTitlePart}</span>}
          </Text>
          )
        : null
    )
  }

  const renderFieldTitle = ({ key, locale, isCommonSection }: { key: string, locale: string, isCommonSection: boolean }): React.JSX.Element => {
    if (isEmptyValue(key)) return <></>

    const textValue = isCommonSection ? t(`version.${key}`) : t(key)

    return (
      <Text>
        {textValue} {!isEmpty(locale) && <Text type="secondary">| {locale.toUpperCase()}</Text>}
      </Text>
    )
  }

  return (
    <Content
      loading={ isLoading }
      padded
      padding={ { x: 'small', y: 'extra-small' } }
    >
      {!canCompare && <div>Please select two objects to compare.</div>}
      {canCompare && !isEmpty(mergerData) && (
        <>
          {breadcrumbsList?.map((breadcrumb, index) => {
            const isCommonSection = breadcrumb.key === VersionCategoryName.SYSTEM_DATA

            return (
              <div key={ `${index}-${breadcrumb.key}` }>
                {renderSectionTitle({ key: breadcrumb.key, isCommonSection })}
                <Flex
                  gap="extra-small"
                  vertical
                >
                  {mergerData.map((fieldItem, fieldIndex) => {
                    console.log('======= fieldItem: ', fieldItem)
                    const isBreadcrumbKeyMatch = breadcrumb.key === fieldItem.Field.fieldBreadcrumbTitle
                    const isFieldInBreadcrumbList = breadcrumb.fieldKeys.includes(fieldItem.Field.name)

                    return (
                      isBreadcrumbKeyMatch && isFieldInBreadcrumbList && (
                      <div>
                        {renderFieldTitle({ key: fieldItem.Field.title!, locale: fieldItem.Field?.locale!, isCommonSection })}
                        <Flex gap="mini">
                          {['main', 'target'].map((key, index) => {
                            const isModifiedField = fieldItem?.isDifferent
                            const isMainVersion = index === 0
                            const isCompareVersion = index === 1
                            const currentId = isMainVersion ? selectedIds?.A : selectedIds?.B

                            const isComplexType = ['block', 'fieldcollections'].includes(fieldItem?.Field.fieldtype!)
                            const isEmptyModifiedStateForComplexTypes: boolean = isModifiedField && isComplexType && isEmptyValue(fieldItem[key])

                            return (
                              <div
                                key={ `${index}-${key}` }
                              >
                                {isEmptyModifiedStateForComplexTypes && (
                                <Flex
                                  align="center"
                                  justify="center"
                                >
                                  {t('empty')}
                                </Flex>
                                )}
                                <DataObjectProvider id={ currentId }>
                                  <DataComponent
                                    datatype={ 'data' }
                                    fieldCollectionModifiedList={ fieldItem?.fieldCollectionModifiedList }
                                    fieldType={ fieldItem.Field.fieldtype }
                                    isExpandedUnmodifiedFields={ isExpandedUnmodifiedFields }
                                    key={ `${index}-${key}` }
                                    value={ fieldItem[key] }
                                    { ...fieldItem.Field }
                                    name={ fieldItem.Field.name }
                                  />
                                </DataObjectProvider>
                              </div>
                            )
                          })}
                        </Flex>
                      </div>
                      )
                    )
                  })}
                </Flex>
              </div>
            )
          })}
        </>
      )}
    </Content>
  )
}
