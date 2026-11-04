/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useLayoutEffect, useRef, useState } from 'react'
import { isNil } from 'lodash'

/**
 * Stable class names (not emotion hashes) so a section can find its rows and their contents.
 */
export const SECTION_FIELD_ROW_CLASS_NAME = 'object-merger-section-field-row'
export const SECTION_FIELD_CONTENT_CLASS_NAME = 'object-merger-section-field-content'

/**
 * Mirrors AutoHideEmptyContent: a field row is hidden as soon as one of its contents is empty
 * (the field's DataComponent rendered nothing).
 */
export const hasVisibleFieldRow = (section: Element): boolean => {
  return Array.from(section.querySelectorAll(`.${SECTION_FIELD_ROW_CLASS_NAME}`))
    .some(row => isNil(row.querySelector(`.${SECTION_FIELD_CONTENT_CLASS_NAME}:empty`)))
}

/**
 * Whether a section has no visible field row, so its title has to be hidden along with its rows
 * (pimcore/object-merger#71). This is only known after the fields rendered, so it cannot be
 * filtered out up front. Plain CSS cannot express it either, as `:has()` must not be nested.
 * Re-evaluated on DOM changes, because a field may render its content asynchronously.
 */
export const useIsSectionEmpty = <T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T>
  isEmpty: boolean
} => {
  const ref = useRef<T>(null)
  const [isEmpty, setIsEmpty] = useState(false)

  useLayoutEffect(() => {
    const section = ref.current
    if (isNil(section)) return

    const update = (): void => { setIsEmpty(!hasVisibleFieldRow(section)) }
    update()

    const observer = new MutationObserver(update)
    observer.observe(section, { childList: true, subtree: true, characterData: true })

    return () => { observer.disconnect() }
  }, [])

  return { ref, isEmpty }
}
