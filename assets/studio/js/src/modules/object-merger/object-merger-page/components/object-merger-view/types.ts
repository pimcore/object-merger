/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ManyToOneRelationValue } from '@pimcore/studio-ui-bundle/components'

type ObjectData = ManyToOneRelationValue

export interface IMergerObjectData {
  A?: ObjectData
  B?: ObjectData
}
