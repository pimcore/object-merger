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
import { Divider, ContentLayout } from '@pimcore/studio-ui-bundle/components'
import { ObjectMergerForm } from './components/object-merger-form/object-merger-form'
import { ObjectMergerView } from './components/object-merger-view/object-merger-view'
import { ObjectMergerToolbar } from './components/object-merger-toolbar/object-merger-toolbar'

export interface ObjectMergerPageProps {
  /** hosts embedding the merger render their own object header instead of the picker form */
  hideForm?: boolean
}

export const ObjectMergerPage = ({ hideForm = false }: ObjectMergerPageProps): React.JSX.Element => {
  return (
    <ContentLayout
      renderToolbar={ <ObjectMergerToolbar /> }
      renderTopBar={
        hideForm
          ? undefined
          : (
            <>
              <ObjectMergerForm />
              <Divider
                size="none"
                theme="secondary"
              />
            </>
            )
      }
    >
      <ObjectMergerView />
    </ContentLayout>
  )
}
