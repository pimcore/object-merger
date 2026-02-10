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
import { Content, Flex, Title } from '@pimcore/studio-ui-bundle/components'

export const ObjectMergerForm = (): React.JSX.Element => {
  const { t } = useTranslation()

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
        <div>Form</div>
      </Flex>
    </Content>
  )
}
