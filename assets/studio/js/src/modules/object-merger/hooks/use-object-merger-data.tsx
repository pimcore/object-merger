/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'

type VersionData = Record<string, any>
interface Roles {
  main: 'A' | 'B'
  secondary: 'A' | 'B'
}

interface IUseObjectMergerDataProps {
  selectedIds: { A: number | null, B: number | null }
}

export interface IUseObjectMergerDataReturn {}

export const useObjectMergerData = ({ selectedIds }: IUseObjectMergerDataProps): IUseObjectMergerDataReturn => {
  const [roles, setRoles] = useState<Roles>({
    main: 'A',
    secondary: 'B'
  })

  const [initialVersions, setInitialVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({
    A: null,
    B: null
  })
  const [versions, setVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({
    A: null,
    B: null
  })
}
