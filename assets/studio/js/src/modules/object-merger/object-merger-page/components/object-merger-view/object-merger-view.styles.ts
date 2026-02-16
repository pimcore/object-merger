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
    headerContainer: css`
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 999999999;

      &::before {
        content: '';
        position: absolute;
        top: -15px;
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: #fff;
        z-index: -1;
      }
    `,

    headerItem: css`
      flex: 1 1 50%;
      padding: ${token.paddingXXS}px ${token.paddingXS}px;
      background-color: ${token.Table.headerBg};
      border: 0.5px solid ${token.Table.colorBorderSecondary};
      border-top-width: 0;
      box-shadow: 0 2px 4px 0 rgba(35, 11, 100, .2);

      &:first-child {
        border-right: 0;
      }

      &:last-child {
        border-left: 0;
      }

      &:only-child {
        flex: 1 1 100%;
        border-right: 0.5px;
        border-left: 0.5px;
      }
    `,

    content: css`
      position: relative;
      min-width: 220px;
    `,

    emptyState: css`
      margin-top: 40px;
      max-width: 200px;
      text-align: center;
    `,

    switchContainer: css`
      position: absolute;
      top: 10px;
      right: ${token.paddingXS}px;
      z-index: 1;
    `,

    sectionTitle: css`
      position: relative;
      display: block;
      padding: ${token.paddingSM}px ${token.paddingXS}px ${token.paddingXS}px ${token.paddingXS}px;
      font-size: 14px;
      font-weight: 900;
    `,

    subSectionTitle: css`
      margin-left: 5px;
        
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 2px;
          width: 2px;
          height: 22px;
          background-color: ${token.Colors.Neutral.Fill.colorFill};
        }
    `,

    subSectionText: css`
      font-weight: 400;
    `,

    sectionFields: css`
      padding: ${token.paddingXS}px;
      border: 1px solid ${token.colorBorderContainer};
      border-radius: ${token.borderRadius}px;
    `,

    sectionFieldsWithoutBorder: css`
      border-width: 0;
    `,

    fieldTitle: css`
      min-height: 24px;
    `,

    sectionFieldItem: css`
      flex: 1 1 50%;
      min-width: 50%;
      width: 100%;
      padding: ${token.paddingXS}px;
      background-color: ${token.colorBgContainerDisabled};
      border-radius: ${token.borderRadius}px;

      &:only-child {
        flex: 1 1 100%;
      }
    `,

    sectionFieldItemHighlight: css`
      background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
    `,

    objectSectionFieldItemWrapper: css`
      flex: 1 1 50%;
      min-width: 50%;
      max-width: 900px;
      width: 100%;
    `,

    objectSectionFieldItem: css`
      justify-content: flex-start;
      width: 100% !important;
      max-width: 100% !important;
      border-radius: ${token.borderRadius}px !important;
      border-color: transparent !important;
      color: ${token.colorText} !important;
    `,

    objectSectionFieldItemHighlight: css`
      &.versionFieldItem {
        border-color: ${token.colorBorder} !important;
      }
    `,

    objectSectionEmptyState: css`
      justify-content: center !important;
      width: 100%;
      min-width: 100px;
      height: 100%;
      border: 1px solid transparent !important;
    `,

    objectSectionEmptyStateDisabled: css`
      background-color: ${token.colorBgContainerDisabled} !important;
    `,

    objectSectionEmptyStateHighlight: css`
      background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      border-color: ${token.colorBorder} !important;
    `
  }
})
