/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { Content, Flex, Title, FormKit, Form, ManyToOneRelationInput, type ManyToOneRelationValue, Button, Alert } from '@pimcore/studio-ui-bundle/components'
import { useObjectMergerContext } from '../../../context/object-merger-context'
import { useStyles } from './object-merger-form.styles'

export const ObjectMergerForm = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { selectedMergerObjects, setSelectedMergerObjects, loadLayoutData, isLoading, canCompare, isSameObjectType } = useObjectMergerContext()

  const showError = !isUndefined(selectedMergerObjects?.A) && !isUndefined(selectedMergerObjects?.B) && !isSameObjectType

  return (
    <Content
      padded
      padding={ { x: 'small', y: 'extra-small' } }
    >
      <Flex
        gap="extra-small"
        vertical
      >
        <Title>{t('compare_objects.title')}</Title>
        <Flex
          align="flex-end"
          gap="extra-small"
        >
          <div className={ styles.formWrapper }>
            <FormKit>
              <Form.Item name="mainObject">
                <ManyToOneRelationInput
                  dataObjectsAllowed
                  enableSearch
                  onChange={ (value: ManyToOneRelationValue) => {
                    setSelectedMergerObjects({ A: value, B: selectedMergerObjects?.B })
                  } }
                  value={ selectedMergerObjects?.A }
                />
              </Form.Item>
              <Form.Item name="compareObject">
                <ManyToOneRelationInput
                  dataObjectsAllowed
                  enableSearch
                  onChange={ (value: ManyToOneRelationValue) => {
                    setSelectedMergerObjects({ A: selectedMergerObjects?.A, B: value })
                  } }
                  value={ selectedMergerObjects?.B }
                />
              </Form.Item>
            </FormKit>
          </div>
          <Button
            disabled={ !canCompare }
            loading={ isLoading }
            onClick={ () => { loadLayoutData() } }
            type="primary"
          >
            {t('compare_objects.form.compare_btn')}
          </Button>
        </Flex>
        {showError && (
          <Alert
            message={ t('compare_objects.form.error.different_object_types') }
            type="error"
          />
        )}
      </Flex>
    </Content>
  )
}
