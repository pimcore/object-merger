/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { readFileSync } from 'fs'
import { join } from 'path'

const root = join(__dirname, '..', '..')
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'))
const declared: Record<string, string> = { ...manifest.dependencies, ...manifest.devDependencies }

const minMajor = (range: string): number[] =>
  range.replace(/^[^\d]*/, '').split('.').map((p) => parseInt(p, 10) || 0)

const atLeast = (range: string, min: string): boolean => {
  const a = minMajor(range)
  const b = min.split('.').map(Number)
  for (let i = 0; i < b.length; i++) {
    if ((a[i] ?? 0) !== b[i]) return (a[i] ?? 0) > b[i]
  }
  return true
}

describe('manifest minimums', () => {
  it('AC1: declares the LTS minimums where the packages are listed', () => {
    const mins: Record<string, string> = {
      antd: '5.29.3',
      '@rsbuild/core': '1.7.6',
      '@types/jest': '30.0.0',
      '@module-federation/rsbuild-plugin': '2.9.0'
    }
    for (const [name, min] of Object.entries(mins)) {
      if (declared[name] === undefined) continue
      expect({ name, ok: atLeast(declared[name], min) }).toEqual({ name, ok: true })
    }
    expect(atLeast(declared.jest, '30.0.0')).toBe(true)
    expect(declared['@types/jest']).toBeDefined()
    expect(atLeast(declared['@types/jest'], '30.0.0')).toBe(true)
  })

  it('AC2: declares directly imported packages', () => {
    expect(declared.classnames).toBeDefined()
    expect(declared.classnames).toBe(`^${lock.packages['node_modules/classnames'].version}`)
  })

  it('AC3: keeps the resolved versions of jest, rsbuild and react', () => {
    const v = (n: string): string => lock.packages[`node_modules/${n}`].version
    expect(v('jest')).toMatch(/^30\./)
    expect(v('@rsbuild/core')).toBe('1.7.6')
    expect(v('react')).toBe('18.3.1')
  })
})
