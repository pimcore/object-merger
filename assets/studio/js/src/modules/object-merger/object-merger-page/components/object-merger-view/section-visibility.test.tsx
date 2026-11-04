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
import { act, render } from '@testing-library/react'
import {
  SECTION_FIELD_CONTENT_CLASS_NAME,
  SECTION_FIELD_ROW_CLASS_NAME,
  useIsSectionEmpty
} from './section-visibility'

type Row = [string, string]

/**
 * Mirrors the markup rendered by ObjectMergerVersions: a section holds a title and one row per
 * field, every row holds one content element per merge source (main | target). A content element
 * stays empty when the field's DataComponent renders nothing (e.g. a `dataQuality` field).
 */
const Section = ({ rows }: { rows: Row[] }): React.JSX.Element => {
  const { ref, isEmpty } = useIsSectionEmpty()

  return (
    <div
      data-testid="section"
      hidden={ isEmpty }
      ref={ ref }
    >
      <span>Media</span>
      {rows.map((contents, rowIndex) => (
        <div
          className={ SECTION_FIELD_ROW_CLASS_NAME }
          key={ rowIndex }
        >
          {contents.map((content, contentIndex) => (
            <div
              className={ SECTION_FIELD_CONTENT_CLASS_NAME }
              key={ contentIndex }
            >
              {content !== '' && <span>{content}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const renderSection = (rows: Row[]): HTMLElement => render(<Section rows={ rows } />).getByTestId('section')

describe('useIsSectionEmpty', () => {
  // pimcore/object-merger#71: Media/Attributes titles stayed visible while all their rows were hidden
  it('hides a section whose every field row renders empty content', () => {
    expect(renderSection([['', ''], ['', '']]).hidden).toBe(true)
  })

  // AutoHideEmptyContent hides a row as soon as one of its contents is empty
  it('hides a section whose rows are all hidden because one side is empty', () => {
    expect(renderSection([['main value', ''], ['', 'target value']]).hidden).toBe(true)
  })

  it('keeps a section that has at least one fully rendered row', () => {
    expect(renderSection([['', ''], ['main value', 'target value']]).hidden).toBe(false)
  })

  it('shows a section again once its fields render content asynchronously', async () => {
    const section = renderSection([['', '']])
    expect(section.hidden).toBe(true)

    await act(async () => {
      section.querySelectorAll(`.${SECTION_FIELD_CONTENT_CLASS_NAME}`).forEach(content => {
        content.appendChild(document.createElement('span'))
      })
    })

    expect(section.hidden).toBe(false)
  })
})
