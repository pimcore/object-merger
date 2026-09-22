/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { isEqual, get, setWith, cloneDeep, isEmpty, isUndefined } from 'lodash'
import { isEmptyValue } from '@pimcore/studio-ui-bundle/utils'
import { ApiError, type ApiErrorData, trackError } from '@pimcore/studio-ui-bundle/modules/app'
import { api as dataObjectApi, useDataObjectGetByIdQuery, useDataObjectGetLayoutByIdQuery } from '@pimcore/studio-ui-bundle/api/data-object'
import { type DynamicTypeObjectDataRegistry } from '@pimcore/studio-ui-bundle/modules/element'
import { BatchAppendMode, addBatchAppendMode } from '@pimcore/studio-ui-bundle/modules/data-object'
import { useAppDispatch } from '@pimcore/studio-ui-bundle/app'
import { createMergerFields, type ILayoutItem, processData } from '../helpers/details-functions'
import type { IMergerObjectData } from '../object-merger-page/components/object-merger-view/types'
import { type IFormattedFieldData, type IMergerField, type Roles, type VersionData } from '../types'

export interface IUseObjectMergerDataProps {
  selectedMergerObjects: IMergerObjectData
  objectDataRegistry: DynamicTypeObjectDataRegistry
  /** which side receives applied values initially; defaults to { main: 'A', target: 'B' } */
  initialRoles?: Roles
  /** called after a merge has been saved successfully */
  onMerged?: () => void
  /** called with the new roles whenever mirroring swaps which side receives applied values */
  onRolesChanged?: (roles: Roles) => void
}

export interface IUseObjectMergerDataReturn {
  loadLayoutData: () => Promise<void>
  isFetching: boolean
  refetch: () => void
  isLoading: boolean
  isSaving: boolean
  mergerFields: IMergerField[]
  roles: Roles
  touchedFields: Set<string>
  copyFieldToTarget: (fieldPath: string) => void
  applyAll: () => void
  resetField: (fieldPath: string) => void
  resetAll: () => void
  mirror: () => void
  save: () => void
  versions: { A: VersionData | null, B: VersionData | null }
  initialVersions: { A: VersionData | null, B: VersionData | null }
  isSameObjectType: boolean
  setIsSameObjectType: (isSameObjectType: boolean) => void
  canCompare: boolean
  setCanCompare: (canCompare: boolean) => void
  hasUnsavedChanges: boolean
  canSaveTarget: boolean
}

export const useObjectMergerData = ({ selectedMergerObjects, objectDataRegistry, initialRoles, onMerged, onRolesChanged }: IUseObjectMergerDataProps): IUseObjectMergerDataReturn => {
  const dispatch = useAppDispatch()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [roles, setRoles] = useState<Roles>(initialRoles ?? { main: 'A', target: 'B' })
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const [formattedDataA, setFormattedDataA] = useState<IFormattedFieldData[]>([])
  const [formattedDataB, setFormattedDataB] = useState<IFormattedFieldData[]>([])
  // a ref, not state: processData reads it mid-call, so B must see the layouts A just fetched
  const layoutsListRef = useRef<ILayoutItem[]>([])

  const [isSameObjectType, setIsSameObjectType] = useState(false)
  const [canCompare, setCanCompare] = useState<boolean>(false)

  const [objectSavePermissions, setObjectSavePermissions] = useState<{ A: boolean, B: boolean }>({ A: true, B: true })

  const [initialVersions, setInitialVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({ A: null, B: null })
  const [lastSavedVersions, setLastSavedVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({ A: null, B: null })
  const [versions, setVersions] = useState<{ A: VersionData | null, B: VersionData | null }>({ A: null, B: null })

  // Setting the pair is the only load trigger; the hooks share cache and in-flight requests with the
  // editor and any embedding host, and refetch on their own when a save invalidates the object's tag.
  const [comparePair, setComparePair] = useState<{ A: number, B: number } | null>(null)
  const skip = comparePair === null

  const layoutA = useDataObjectGetLayoutByIdQuery({ id: comparePair?.A ?? 0 }, { skip })
  // object reads always hit the server on Compare (as the former forceRefetch did); layouts are tag-driven
  const objectA = useDataObjectGetByIdQuery({ id: comparePair?.A ?? 0 }, { skip, refetchOnMountOrArgChange: true })
  const layoutB = useDataObjectGetLayoutByIdQuery({ id: comparePair?.B ?? 0 }, { skip })
  const objectB = useDataObjectGetByIdQuery({ id: comparePair?.B ?? 0 }, { skip, refetchOnMountOrArgChange: true })

  const loadLayoutData = async (): Promise<void> => {
    const idA = selectedMergerObjects.A?.id
    const idB = selectedMergerObjects.B?.id

    if (isUndefined(idA) || isUndefined(idB)) {
      return
    }

    // Compare on the loaded pair is a reload of the object reads; layouts stay tag-driven
    if (comparePair?.A === idA && comparePair?.B === idB) {
      void objectA.refetch()
      void objectB.refetch()
      return
    }

    setComparePair({ A: idA, B: idB })
  }

  const refetch = (): void => { void loadLayoutData() }

  const isFetching = layoutA.isFetching || objectA.isFetching || layoutB.isFetching || objectB.isFetching || isProcessing

  const processRun = useRef(0)

  useEffect(() => {
    if (skip || isUndefined(layoutA.data) || isUndefined(objectA.data) || isUndefined(layoutB.data) || isUndefined(objectB.data)) {
      return
    }

    const run = ++processRun.current
    const { A: idA, B: idB } = comparePair
    const layoutAResult = layoutA.data
    const objectAResult = objectA.data
    const layoutBResult = layoutB.data
    const objectBResult = objectB.data

    if (objectAResult.className !== objectBResult.className) {
      setIsSameObjectType(false)
      setCanCompare(false)
      setFormattedDataA([])
      setFormattedDataB([])

      return
    }

    const process = async (): Promise<void> => {
      setIsProcessing(true)

      try {
        const formattedDataA = await processData({
          objectId: idA,
          layout: layoutAResult.children ?? [],
          objectData: objectAResult,
          objectDataRegistry,
          layoutsList: layoutsListRef.current,
          setLayoutsList: (layouts) => { layoutsListRef.current = layouts }
        })

        const formattedDataB = await processData({
          objectId: idB,
          layout: layoutBResult.children ?? [],
          objectData: objectBResult,
          objectDataRegistry,
          layoutsList: layoutsListRef.current,
          setLayoutsList: (layouts) => { layoutsListRef.current = layouts }
        })

        // a newer pair or fresher data superseded this run while processing
        if (run !== processRun.current) {
          return
        }

        setFormattedDataA(formattedDataA)
        setFormattedDataB(formattedDataB)
        setTouchedFields(new Set())

        setObjectSavePermissions({
          A: objectAResult.permissions.save,
          B: objectBResult.permissions.save
        })

        // getById is typed as object | folder; the merger only ever compares objects
        const initialA = ('objectData' in objectAResult ? objectAResult.objectData : undefined) ?? {}
        const initialB = ('objectData' in objectBResult ? objectBResult.objectData : undefined) ?? {}

        setInitialVersions({ A: initialA, B: initialB })
        setLastSavedVersions({ A: cloneDeep(initialA), B: cloneDeep(initialB) })
        setVersions({ A: cloneDeep(initialA), B: cloneDeep(initialB) })
        setIsSameObjectType(true)
        setCanCompare(true)
      } catch (error) {
        console.error('Failed to load merger data', error)
      } finally {
        if (run === processRun.current) {
          setIsProcessing(false)
        }
      }
    }

    void process()
  }, [comparePair, layoutA.data, objectA.data, layoutB.data, objectB.data])

  const mergerFields = useMemo(() => {
    if (isEmpty(formattedDataA) || isEmpty(formattedDataB)) {
      return []
    }

    return createMergerFields(formattedDataA, formattedDataB, roles, touchedFields, versions)
  }, [formattedDataA, formattedDataB, roles, touchedFields, versions])

  const hasUnsavedChanges = useMemo(() => {
    const targetKey = roles.target

    return !isEqual(
      versions[targetKey],
      lastSavedVersions[targetKey]
    )
  }, [versions, lastSavedVersions, roles])

  const canSaveTarget = useMemo(() => objectSavePermissions[roles.target], [objectSavePermissions, roles])

  const copyFieldToTarget = useCallback((fieldPath: string) => {
    const mainKey = roles.main
    const targetKey = roles.target

    const getMainValue = get(versions[mainKey], fieldPath)
    const mainValue = !isUndefined(getMainValue) ? getMainValue : null

    setVersions(prev => {
      const newVersions = cloneDeep(prev)

      setWith(newVersions[targetKey] as object, fieldPath, mainValue, Object)

      return newVersions
    })

    setTouchedFields(prev => new Set([...prev, fieldPath]))
  }, [roles, versions])

  const applyAll = useCallback(() => {
    const formattedDataMain = roles.main === 'A' ? formattedDataA : formattedDataB
    const formattedDataTarget = roles.target === 'B' ? formattedDataB : formattedDataA

    const mainKey = roles.main
    const targetKey = roles.target

    const newTouchedFields = new Set<string>()
    const updatedTargetData = cloneDeep(versions[targetKey])
    const formattedFullData = formattedDataMain?.length > formattedDataTarget?.length ? formattedDataMain : formattedDataTarget

    formattedFullData.forEach((fieldItem) => {
      const mainItem = formattedDataMain.find(item => item.fieldPath === fieldItem.fieldPath)
      const targetItem = formattedDataTarget.find(item => item.fieldPath === fieldItem.fieldPath)

      if (!isEqual(mainItem?.fieldValue, targetItem?.fieldValue)) {
        const fieldPath = !isEmptyValue(fieldItem?.fieldPath) ? fieldItem?.fieldPath : fieldItem?.fieldData.name

        const getMainValue = get(versions[mainKey], fieldPath)
        const mainValue = !isUndefined(getMainValue) ? getMainValue : null

        setWith(updatedTargetData as object, fieldPath as string, mainValue, Object)

        newTouchedFields.add(fieldPath as string)
      }
    })

    setVersions(prev => ({
      ...prev,
      [targetKey]: updatedTargetData
    }))

    setTouchedFields(prev => new Set([...prev, ...newTouchedFields]))
  }, [formattedDataA, formattedDataB, roles, versions])

  const resetField = useCallback((fieldPath: string) => {
    const targetKey = roles.target
    const initialValue = get(initialVersions[targetKey], fieldPath)

    setVersions(prev => {
      const newVersions = cloneDeep(prev)

      if (newVersions[targetKey] !== null) {
        setWith(newVersions[targetKey] as object, fieldPath, initialValue, Object)
      }

      return newVersions
    })

    setTouchedFields(prev => {
      const newSet = new Set(prev)

      newSet.delete(fieldPath)

      return newSet
    })
  }, [roles, initialVersions])

  const resetAll = useCallback(() => {
    const targetKey = roles.target

    setVersions(prev => ({
      ...prev,
      [targetKey]: cloneDeep(initialVersions[targetKey])
    }))

    setTouchedFields(new Set())
  }, [roles, initialVersions])

  const save = useCallback(async () => {
    const targetKey = roles.target

    const changedData: VersionData = {}

    const targetVersion = versions[targetKey]
    const lastSavedTargetVersion = lastSavedVersions[targetKey]
    const formattedDataTarget = targetKey === 'A' ? formattedDataA : formattedDataB

    formattedDataTarget.forEach((item) => {
      const fieldPath: string = !isEmptyValue(item.fieldPath) ? item.fieldPath : item.fieldData.name

      const currentValue = get(targetVersion, fieldPath)
      const lastSavedValue = get(lastSavedTargetVersion, fieldPath)

      if (!isEqual(currentValue, lastSavedValue)) {
        const fieldType: string = item.fieldData?.fieldtype

        const dynamicType = objectDataRegistry.hasDynamicType(fieldType)
          ? objectDataRegistry.getDynamicType(fieldType)
          : null

        const valueToSave = dynamicType?.supportsBatchAppendModes === true
          ? addBatchAppendMode(currentValue, BatchAppendMode.Replace)
          : currentValue

        setWith(changedData, fieldPath, valueToSave, Object)
      }
    })

    if (isEmpty(changedData)) {
      // Nothing to merge — treat it as a completed step so embedded hosts can advance.
      onMerged?.()
      return
    }

    setIsSaving(true)

    try {
      await dispatch(dataObjectApi.endpoints.dataObjectPatchById.initiate({
        body: {
          data: [{
            id: selectedMergerObjects?.[targetKey]?.id,
            task: 'save',
            editableData: changedData
          }]
        }
      })).unwrap()

      setLastSavedVersions(prev => ({
        ...prev,
        [targetKey]: cloneDeep(versions[targetKey])
      }))

      onMerged?.()
    } catch (error) {
      trackError(new ApiError(error as ApiErrorData))
    } finally {
      setIsSaving(false)
    }
  }, [roles, versions, initialVersions, touchedFields, selectedMergerObjects, dispatch, onMerged])

  const mirror = (): void => {
    const newRoles: Roles = {
      main: roles.target,
      target: roles.main
    }

    setRoles(newRoles)
    onRolesChanged?.(newRoles)

    setVersions({
      A: cloneDeep(initialVersions.A),
      B: cloneDeep(initialVersions.B)
    })

    setTouchedFields(new Set())
  }

  return {
    loadLayoutData,
    refetch,
    isFetching,
    isLoading: isFetching,
    isSaving,
    mergerFields,
    roles,
    touchedFields,
    copyFieldToTarget,
    applyAll,
    resetField,
    resetAll,
    mirror,
    save,
    versions,
    initialVersions,
    isSameObjectType,
    setIsSameObjectType,
    canCompare,
    setCanCompare,
    hasUnsavedChanges,
    canSaveTarget
  }
}
