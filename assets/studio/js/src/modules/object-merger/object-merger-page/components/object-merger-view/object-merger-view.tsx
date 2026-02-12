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
import { Content, Flex, Text, Switch } from '@pimcore/studio-ui-bundle/components'
import { useObjectMergerContext } from '../../../context/object-merger-context'
import { type CategoriesList, getObjectBreadcrumbsList, getObjectBreadcrumbsListWithFields } from './helpers'
import { MERGE_SOURCES } from './constants'
import { ObjectMergerVersions } from './components/object-merger-versions/object-merger-versions'
import { useStyles } from './object-merger-view.styles'

export const ObjectMergerView = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { canCompare, mergerFields, isLoading } = useObjectMergerContext()

  const [isExpandedUnmodifiedFields, setIsExpandedUnmodifiedFields] = useState(false)

  const mergerModifiedFields = useMemo(() => {
    return mergerFields.filter((item) => {
      return !isEqual(item?.main ?? null, item?.target ?? null)
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

  const renderHeaderItem = (item: string, index: number): React.JSX.Element => {
    const regexpMatch = (/\d+/).exec(item)
    const versionNumber = regexpMatch?.[0] ?? '0'

    return (
      <Flex
        className={ styles.headerItem }
        key={ `${index}-${item}` }
      >
        <Text>{t('version.version')} {Number(versionNumber)}</Text>
      </Flex>
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
        <Flex vertical>
          <Flex
            className={ styles.headerContainer }
            wrap="wrap"
          >
            {MERGE_SOURCES.map((item, index) => (
              renderHeaderItem(item, index)
            ))}
          </Flex>
          <Flex
            className={ styles.content }
            vertical
          >
            <div className={ styles.switchContainer }>
              <Switch
                labelLeft={ <Text>{t('version.expand-unmodified-fields')}</Text> }
                onChange={ () => { setIsExpandedUnmodifiedFields(!isExpandedUnmodifiedFields) } }
                value={ isExpandedUnmodifiedFields }
              />
            </div>
            {!hasModifiedFields && !isExpandedUnmodifiedFields && (
              <Flex justify="center">
                <Text className={ styles.emptyState }>
                  {t('version.no-difference')}
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
