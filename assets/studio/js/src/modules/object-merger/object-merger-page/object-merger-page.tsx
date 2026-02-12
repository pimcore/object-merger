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
import { Divider, ContentLayout, Content } from '@pimcore/studio-ui-bundle/components'
import { ObjectMergerForm } from './components/object-merger-form/object-merger-form'
import { ObjectMergerView } from './components/object-merger-view/object-merger-view'

export const ObjectMergerPage = (): React.JSX.Element => {
  return (
    <ContentLayout
      renderToolbar={
        <Content
          padded
          padding={ { x: 'small', y: 'extra-small' } }
        >
          <div>Bottom Toolbar</div>
        </Content>
        }
      renderTopBar={
        <>
          <ObjectMergerForm />
          <Divider
            size="none"
            theme="secondary"
          />
        </>
      }
    >
      <ObjectMergerView />
    </ContentLayout>
  )
}
