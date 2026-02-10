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
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { Content, Flex, Title, FormKit, Form, ManyToOneRelationInput, Button } from '@pimcore/studio-ui-bundle/components'
import { useStyles } from './object-merger-form.styles'

export const ObjectMergerForm = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

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
                  onChange={ (searchFor: string) => { console.log('initial searchFor changed: ', searchFor) } }
                  value={ null }
                />
              </Form.Item>
              <Form.Item name="compareObject">
                <ManyToOneRelationInput
                  dataObjectsAllowed
                  enableSearch
                  onChange={ (searchFor: string) => { console.log('compare searchFor changed: ', searchFor) } }
                  value={ null }
                />
              </Form.Item>
            </FormKit>
          </div>
          <Button type="primary">{t('compare_objects.form.compare_btn')}</Button>
        </Flex>
      </Flex>
    </Content>
  )
}
