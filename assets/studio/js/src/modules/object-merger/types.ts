/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface Roles {
  main: 'A' | 'B'
  target: 'A' | 'B'
}

export type VersionData = Record<string, any>

export interface IFormattedFieldData {
  fieldBreadcrumbTitle: string
  fieldData: any
  fieldValue: any
  fieldPath?: string
}

export interface IMergerField {
  Field: {
    fieldBreadcrumbTitle: string
    name: string
    title?: string
    fieldtype?: string
    locale?: string
  }
  main: any
  target: any
  isDifferent: boolean
  isTouched: boolean
  fieldPath?: string
  fieldCollectionModifiedList?: string[]
}
