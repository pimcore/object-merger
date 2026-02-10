/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles, type FullToken } from 'antd-style'

export const useStyles = createStyles(({ token, css }: { token: FullToken, css: any }) => {
  return {
    formWrapper: css`
      min-width: 400px;
    `
  }
})
