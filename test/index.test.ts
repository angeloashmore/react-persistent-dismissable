import { renderHook, act } from '@testing-library/react-hooks'
import FDBFactory from 'fake-indexeddb/lib/FDBFactory'

import { usePersistentDismissable } from '../src'

// Register global in-memory indexedDB
import 'fake-indexeddb/auto'

describe('persistence irrelevant', () => {
  beforeEach(() => {
    indexedDB = new FDBFactory()
  })

  test('returns false on initial run', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePersistentDismissable('key'),
    )

    expect(result.current[0]).toBe(undefined)
    await waitForNextUpdate()
    expect(result.current[0]).toBe(false)
  })

  test('allows dismissing and undismissing', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePersistentDismissable('key'),
    )

    expect(result.current[0]).toBe(undefined)
    await waitForNextUpdate()
    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1]() // dismiss
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[2]() // undismiss
    })
    expect(result.current[0]).toBe(false)
  })

  test('supports an initial value', () => {
    const { result } = renderHook(() => usePersistentDismissable('key', true))
    expect(result.current[0]).toBe(true)
  })
})

describe('persistent relevant', () => {
  beforeAll(() => {
    indexedDB = new FDBFactory()
  })

  test('persists value', () => {
    const { result } = renderHook(() => usePersistentDismissable('key'))

    act(() => {
      result.current[1]() // dismiss
    })

    expect(result.current[0]).toBe(true)
  })

  test('loads persisted value', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePersistentDismissable('key'),
    )

    expect(result.current[0]).toBe(undefined)
    await waitForNextUpdate()
    expect(result.current[0]).toBe(true)
  })
})
