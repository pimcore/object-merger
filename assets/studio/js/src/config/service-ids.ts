/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const bundleServiceIds = {
  /**
   * Cross-bundle API: consumers resolve this id with `container.isBound(...) && container.get(...)`
   * and mirror the ObjectMergerApi interface locally — the string is the contract, do not change it.
   */
  'ObjectMerger/Api': 'ObjectMerger/Api'
} as const
