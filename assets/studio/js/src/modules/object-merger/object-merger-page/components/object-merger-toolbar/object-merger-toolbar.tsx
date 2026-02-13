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
import { isEmpty } from 'lodash'
import { useTranslation } from '@pimcore/studio-ui-bundle/app'
import { Toolbar, Flex, IconTextButton, Button, Tooltip, Split } from '@pimcore/studio-ui-bundle/components'
import { Refetch } from '../refetch/refetch'
import { useObjectMergerContext } from '../../../context/object-merger-context'

export const ObjectMergerToolbar = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { canCompare, mergerFields, refetch, isFetching } = useObjectMergerContext()

  if (!canCompare || isEmpty(mergerFields)) {
    return <></>
  }

  return (
    <Toolbar justify="space-between">
      <Split size='extra-small'>
        <Refetch
          isFetching={ isFetching }
          refetch={ refetch }
        />
        <Flex gap="extra-small">
          <IconTextButton
            icon={ { value: 'contrast-01' } }
            onClick={ () => { } }
          >
            {t('compare_objects.toolbar.mirror_view')}
          </IconTextButton>
          <Tooltip title={ t('compare_objects.toolbar.apply_all.description') }>
            <IconTextButton
              icon={ { value: 'corner-up-left' } }
              onClick={ () => { } }
            >
              {t('compare_objects.toolbar.apply_all')}
            </IconTextButton>
          </Tooltip>
        </Flex>
      </Split>
      <Flex gap="extra-small">
        <IconTextButton
          icon={ { value: 'corner-up-left' } }
          onClick={ () => { } }
        >
          {t('compare_objects.toolbar.reset')}
        </IconTextButton>
        <Button
          onClick={ () => { } }
          type="primary"
        >
          {t('compare_objects.toolbar.save')}
        </Button>
      </Flex>
    </Toolbar>
  )
}
