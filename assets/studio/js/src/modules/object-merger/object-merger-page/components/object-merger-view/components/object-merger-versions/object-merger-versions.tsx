/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import cn from 'classnames'
import { isEmpty } from 'lodash'
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { isEmptyValue } from '@pimcore/studio-ui-bundle/utils'
import { Flex, Text, IconButton } from '@pimcore/studio-ui-bundle/components'
import { DataComponent, DataObjectProvider } from '@pimcore/studio-ui-bundle/modules/data-object'
import { FieldCollectionProvider } from '@pimcore/studio-ui-bundle/modules/element'
import { AutoHideEmptyContent } from '@pimcore/studio-ui-bundle/modules/app'
import { type IMergerField } from '../../../../../hooks/use-object-merger-data'
import { type CategoriesList } from '../../helpers'
import { ComparisonCategoryName, MERGE_SOURCES } from '../../constants'
import { useObjectMergerContext } from '../../../../../context/object-merger-context'
import { useStyles } from '../../object-merger-view.styles'

interface IObjectMergerVersions {
  breadcrumbsList: CategoriesList
  mergerData: IMergerField[]
  isExpandedUnmodifiedFields: boolean
}

const SECTIONS_WITH_TRANSLATION: string[] = [ComparisonCategoryName.SYSTEM_DATA]
const SECTIONS_WITH_COMPLEX_TYPES: string[] = ['block', 'fieldcollections']

export const ObjectMergerVersions = ({ breadcrumbsList, mergerData, isExpandedUnmodifiedFields }: IObjectMergerVersions): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { selectedMergerObjects, roles, copyFieldToTarget, resetField } = useObjectMergerContext()

  const renderSectionTitle = ({ key, isCommonSection }: { key: string, isCommonSection: boolean }): React.JSX.Element | null => {
    const isShowValueWithTranslation = SECTIONS_WITH_TRANSLATION.includes(key)
    const textValue = isShowValueWithTranslation ? t(`version.category.title.${key}`) : key

    const titleParts = textValue.split('/')
    const translatedTitleParts = isShowValueWithTranslation ? titleParts : titleParts.map(part => t(part))
    const [firstTitlePart, ...remainingTitleParts] = translatedTitleParts

    const secondTitlePart = remainingTitleParts.length > 0 ? ` | ${remainingTitleParts.join(' | ')}` : ''

    return (
      (!isEmptyValue(firstTitlePart) || !isEmptyValue(secondTitlePart))
        ? (
          <Text
            className={ cn(styles.sectionTitle, { [styles.subSectionTitle]: !isCommonSection }) }
            strong
          >
            {firstTitlePart}
            {!isEmptyValue(secondTitlePart) && <span className={ styles.subSectionText }>{secondTitlePart}</span>}
          </Text>
          )
        : null
    )
  }

  const renderFieldTitle = ({ fieldItem, isCommonSection, isMainVersion, isCompareVersion }: { fieldItem: IMergerField, isCommonSection: boolean, isMainVersion: boolean, isCompareVersion: boolean }): React.JSX.Element => {
    const key = fieldItem.Field.title!
    const locale = fieldItem.Field.locale!

    if (isEmptyValue(key)) return <></>

    const textValue = isCommonSection ? t(`version.${key}`) : t(key)

    return (
      <div className={ styles.fieldTitle }>
        <Flex
          align="center"
          justify="space-between"
        >
          {isMainVersion && (
            <Text>
              {textValue} {!isEmpty(locale) && <Text type="secondary">| {locale.toUpperCase()}</Text>}
            </Text>
          )}
          {!isCommonSection && isMainVersion && fieldItem.isDifferent && (
            <IconButton
              icon={ { value: 'arrow-square-right' } }
              onClick={ () => { copyFieldToTarget(fieldItem?.fieldPath ?? '') } }
              size="small"
            />
          )}
          {!isCommonSection && isMainVersion && !fieldItem.isDifferent && !fieldItem.isTouched && (
            <IconButton
              disabled
              icon={ { value: 'lock' } }
              size="small"
            />
          )}
          {!isCommonSection && isCompareVersion && fieldItem.isTouched && (
            <IconButton
              icon={ { value: 'corner-up-left' } }
              onClick={ () => { resetField(fieldItem?.fieldPath ?? '') } }
              size="small"
            />
          )}
        </Flex>
      </div>
    )
  }

  return (
    <>
      {breadcrumbsList?.map((breadcrumb, index) => {
        const isCommonSection = breadcrumb.key === ComparisonCategoryName.SYSTEM_DATA

        return (
          <div key={ `${index}-${breadcrumb.key}` }>
            {renderSectionTitle({ key: breadcrumb.key, isCommonSection })}
            <Flex
              className={ cn(styles.sectionFields, { [styles.sectionFieldsWithoutBorder]: !isCommonSection }) }
              gap="extra-small"
              vertical
            >
              {mergerData.map((fieldItem, fieldIndex) => {
                const isBreadcrumbKeyMatch = breadcrumb.key === fieldItem.Field.fieldBreadcrumbTitle
                const isFieldInBreadcrumbList = breadcrumb.fieldKeys.includes(fieldItem.Field.name)

                return (
                  isBreadcrumbKeyMatch && isFieldInBreadcrumbList && (
                    <AutoHideEmptyContent
                      contentSelector={ '.test1' }
                      key={ `${fieldIndex}-${fieldItem.Field.name}` }
                    >
                      <div>
                        <Flex gap="mini">
                          {MERGE_SOURCES.map((key, index) => {
                            const isModifiedField = fieldItem?.isDifferent
                            const isMainVersion = index === 0
                            const isCompareVersion = index === 1

                            const sourceKey = index === 0 ? roles.main : roles.target
                            const currentId = selectedMergerObjects?.[sourceKey]?.id

                            const isComplexType = SECTIONS_WITH_COMPLEX_TYPES.includes(fieldItem.Field.fieldtype!)
                            const isEmptyModifiedStateForComplexTypes: boolean = (isModifiedField || fieldItem.isTouched) && isComplexType && isEmptyValue(fieldItem[key])

                            return (
                              <Flex
                                className={ styles.objectSectionFieldItemWrapper }
                                gap="mini"
                                key={ `${index}-${key}` }
                                vertical
                              >
                                <div>
                                  {renderFieldTitle({ fieldItem, isCommonSection, isMainVersion, isCompareVersion })}
                                </div>
                                <div
                                  className="test1"
                                  style={ { height: '100%' } }
                                >
                                  {isEmptyModifiedStateForComplexTypes && (
                                    <Flex
                                      align="center"
                                      className={ cn(styles.objectSectionFieldItem, styles.objectSectionEmptyState, {
                                        [styles.objectSectionEmptyStateDisabled]: isMainVersion,
                                        [styles.objectSectionEmptyStateHighlight]: isCompareVersion && isModifiedField
                                      }) }
                                      justify="center"
                                    >
                                      {t('empty')}
                                    </Flex>
                                  )}
                                  <DataObjectProvider
                                    id={ currentId! }
                                    key={ `${currentId}-${fieldItem.fieldPath}-${fieldItem.isTouched}-${key}` }
                                  >
                                    <FieldCollectionProvider
                                      id={ currentId }
                                      key={ `${currentId}-${fieldItem.fieldPath}-${fieldItem.isTouched}-${key}` }
                                    >
                                      <DataComponent
                                        className={ cn(styles.objectSectionFieldItem, 'versionFieldItem', {
                                          [styles.objectSectionFieldItemHighlight]: isModifiedField && isCompareVersion && !isCommonSection,
                                          versionFieldItemHighlight: isModifiedField && isCompareVersion && !isCommonSection
                                        }) }
                                        datatype={ 'data' }
                                        fieldCollectionModifiedList={ fieldItem?.fieldCollectionModifiedList }
                                        fieldType={ fieldItem.Field.fieldtype }
                                        isExpandedUnmodifiedFields={ isExpandedUnmodifiedFields }
                                        key={ `${fieldItem.fieldPath}-${fieldItem.isTouched}-${key}` }
                                        { ...fieldItem.Field }
                                        name={ fieldItem.Field.name }
                                        value={ fieldItem[key] }
                                      />
                                    </FieldCollectionProvider>
                                  </DataObjectProvider>
                                </div>
                              </Flex>
                            )
                          })}
                        </Flex>
                      </div>
                    </AutoHideEmptyContent>
                  )
                )
              })}
            </Flex>
          </div>
        )
      })}
    </>
  )
}
