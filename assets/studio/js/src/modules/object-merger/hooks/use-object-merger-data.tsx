/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback, useEffect } from 'react'
import { useDataObjectGetLayoutByIdQuery, useDataObjectGetByIdQuery } from '@pimcore/studio-ui-bundle/api/data-object'

type VersionData = Record<string, any>
interface Roles {
  main: 'A' | 'B'
  secondary: 'A' | 'B'
}

interface IUseObjectMergerDataProps {
  selectedIds: { A: number | null, B: number | null }
}

export interface IUseObjectMergerDataReturn {
  loadLayoutData: () => void
  isLoading: boolean
  layoutDataObjectA: any
  layoutDataObjectB: any
  versions: { A: VersionData | null, B: VersionData | null }
  initialVersions: { A: VersionData | null, B: VersionData | null }
}

export const useObjectMergerData = ({ selectedIds }: IUseObjectMergerDataProps): IUseObjectMergerDataReturn => {
  const [roles, setRoles] = useState<Roles>({
    main: 'A',
    secondary: 'B'
  })
  const [shouldFetchObjectA, setShouldFetchObjectA] = useState(false)
  const [shouldFetchObjectB, setShouldFetchObjectB] = useState(false)

  const [initialVersions, setInitialVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({
    A: null,
    B: null
  })
  const [versions, setVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({
    A: null,
    B: null
  })

  const { data: layoutDataObjectA, isLoading: isLoadingLayoutObjectA } = useDataObjectGetLayoutByIdQuery(
    { id: selectedIds.A! },
    { skip: !shouldFetchObjectA || selectedIds.A === null }
  )
  const { data: objectDataA, isLoading: isLoadingObjectDataA } = useDataObjectGetByIdQuery(
    { id: selectedIds.A! },
    { skip: !shouldFetchObjectA || selectedIds.A === null }
  )

  const { data: layoutDataObjectB, isLoading: isLoadingLayoutObjectB } = useDataObjectGetLayoutByIdQuery(
    { id: selectedIds.B! },
    { skip: !shouldFetchObjectB || selectedIds.B === null }
  )
  const { data: objectDataB, isLoading: isLoadingObjectDataB } = useDataObjectGetByIdQuery(
    { id: selectedIds.B! },
    { skip: !shouldFetchObjectB || selectedIds.B === null }
  )

  const formatLayoutData = useCallback((layoutData: any): VersionData => {
    return layoutData ?? {}
  }, [])

  const loadLayoutData = useCallback(() => {
    if (selectedIds.A !== null && selectedIds.B !== null) {
      setShouldFetchObjectA(true)
      setShouldFetchObjectB(true)
    }
  }, [selectedIds.A, selectedIds.B])

  useEffect(() => {
    if (layoutDataObjectA !== undefined && shouldFetchObjectA) {
      const formattedData = formatLayoutData(layoutDataObjectA)

      setInitialVersions(prev => ({ ...prev, A: formattedData }))
      setVersions(prev => ({ ...prev, A: formattedData }))
    }
  }, [layoutDataObjectA, objectDataA, shouldFetchObjectA, formatLayoutData])

  useEffect(() => {
    if (layoutDataObjectB !== undefined && shouldFetchObjectB) {
      const formattedData = formatLayoutData(layoutDataObjectB)

      setInitialVersions(prev => ({ ...prev, B: formattedData }))
      setVersions(prev => ({ ...prev, B: formattedData }))
    }
  }, [layoutDataObjectB, objectDataB, shouldFetchObjectB, formatLayoutData])

  const isLoading = isLoadingLayoutObjectA === true || isLoadingObjectDataA === true || isLoadingLayoutObjectB === true || isLoadingObjectDataB === true

  return {
    loadLayoutData,
    isLoading,
    layoutDataObjectA,
    layoutDataObjectB,
    versions,
    initialVersions
  }
}
