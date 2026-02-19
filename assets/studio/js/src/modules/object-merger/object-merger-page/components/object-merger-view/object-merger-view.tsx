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
import { useElementHelper } from '@pimcore/studio-ui-bundle/modules/element'
import { Content, Flex, Text, Switch, IconButton } from '@pimcore/studio-ui-bundle/components'
import { useObjectMergerContext } from '../../../context/object-merger-context'
import { type CategoriesList, getObjectBreadcrumbsList, getObjectBreadcrumbsListWithFields } from './helpers'
import { ObjectMergerVersions } from './components/object-merger-versions/object-merger-versions'
import { useStyles } from './object-merger-view.styles'

export const ObjectMergerView = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { selectedMergerObjects, canCompare, mergerFields, isLoading, roles } = useObjectMergerContext()
  const { openElement } = useElementHelper()

  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const mergerModifiedFields = useMemo(() => {
    return mergerFields.filter((item) => {
      return !isEqual(item?.main ?? null, item?.target ?? null) || item.isTouched
    })
  }, [mergerFields])

  const mergerData = useMemo(() => {
    return isExpandedUnmodifiedFields ? mergerFields : mergerModifiedFields
  }, [isExpandedUnmodifiedFields, mergerFields, mergerModifiedFields])

  const sectionsList = useMemo(() => {
    return getObjectBreadcrumbsList(mergerFields)
  }, [mergerFields])

  const breadcrumbsList = useMemo((): CategoriesList | undefined => {
    return getObjectBreadcrumbsListWithFields({
      data: mergerData,
      breadcrumbsList: sectionsList
    })
  }, [mergerData, sectionsList])

  const modifiedFields = useMemo(() => {
    if (!isEmpty(mergerModifiedFields)) {
      return mergerModifiedFields.map((item) => item.Field.title)
    }

    return []
  }, [mergerModifiedFields])
  const hasModifiedFields = !isUndefined(modifiedFields) && modifiedFields.length > 0

  const renderHeaderItem = (): React.JSX.Element => {
    const orderedKeys = [roles.main, roles.target]

    return (
      <>
        {orderedKeys.map((key) => {
          const currentValue = selectedMergerObjects[key]

          return (
            <Flex
              align="center"
              className={ styles.headerItem }
              justify="space-between"
              key={ `${key}-${currentValue?.id}` }
            >
              <Text strong>
                {currentValue?.fullPath} (id:{currentValue?.id})
              </Text>
              <IconButton
                icon={ { value: 'open-folder' } }
                onClick={ () => {
                  void openElement({ id: Number(currentValue?.id), type: 'data-object' })
                } }
                type="link"
              />
            </Flex>
          )
        })}
      </>
    )
  }

  return (
    <Content
      centered={ !canCompare }
      loading={ isLoading }
      padded
      padding={ { x: 'small', y: 'extra-small' } }
    >
      {!canCompare && (
        <Text type="secondary">{t('compare_objects.initial_description')}</Text>
      )}
      {canCompare && !isEmpty(mergerData) && (
        <Flex vertical>
          <Flex
            className={ styles.headerContainer }
            wrap="wrap"
          >
            {renderHeaderItem()}
          </Flex>
          <Flex
            className={ styles.content }
            vertical
          >
            <div className={ styles.switchContainer }>
              <Switch
                labelLeft={ <Text>{t('compare_objects.expand_unmodified_fields')}</Text> }
                onChange={ () => { setIsExpandedUnmodifiedFields(!isExpandedUnmodifiedFields) } }
                value={ isExpandedUnmodifiedFields }
              />
            </div>
            {!hasModifiedFields && !isExpandedUnmodifiedFields && (
              <Flex justify="center">
                <Text className={ styles.emptyState }>
                  {t('compare_objects.no_difference')}
                </Text>
              </Flex>
            )}
            <ObjectMergerVersions
              breadcrumbsList={ breadcrumbsList! }
              isExpandedUnmodifiedFields={ isExpandedUnmodifiedFields }
              mergerData={ mergerData }
            />
          </Flex>
        </Flex>
      )}
    </Content>
  )
}
