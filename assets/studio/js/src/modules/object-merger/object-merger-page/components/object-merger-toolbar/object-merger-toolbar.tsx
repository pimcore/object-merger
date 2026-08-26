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
import { Toolbar, Flex, IconTextButton, Button, Tooltip } from '@pimcore/studio-ui-bundle/components'
import { useObjectMergerContext } from '../../../context/object-merger-context'

export const ObjectMergerToolbar = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { canCompare, mergerFields, touchedFields, mirror, applyAll, resetAll, save, isSaving, hasUnsavedChanges, canSaveTarget, autoCompare } = useObjectMergerContext()

  if (!canCompare || isEmpty(mergerFields)) {
    return <></>
  }

  return (
    <Toolbar justify="space-between">
      <Flex gap="extra-small">
        <IconTextButton
          icon={ { value: 'contrast-01' } }
          onClick={ mirror }
        >
          {t('compare_objects.toolbar.mirror_view')}
        </IconTextButton>
        <Tooltip title={ t('compare_objects.toolbar.apply_all.description') }>
          <Button onClick={ applyAll }>
            {t('compare_objects.toolbar.apply_all')}
          </Button>
        </Tooltip>
      </Flex>
      <Flex gap="extra-small">
        <Button
          disabled={ isEmpty(touchedFields) }
          onClick={ resetAll }
        >
          {t('compare_objects.toolbar.reset')}
        </Button>
        <Tooltip title={ !canSaveTarget ? t('compare_objects.toolbar.save.no_permission') : '' }>
          <Button
            disabled={ hasUnsavedChanges ? !canSaveTarget : !autoCompare }
            loading={ isSaving }
            onClick={ save }
            type="primary"
          >
            {t('compare_objects.toolbar.save')}
          </Button>
        </Tooltip>
      </Flex>
    </Toolbar>
  )
}
