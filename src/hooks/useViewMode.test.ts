import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useViewMode, ViewMode } from './useViewMode'

describe('useViewMode', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with "both" mode', () => {
    const { result } = renderHook(() => useViewMode())
    expect(result.current.viewMode).toBe('both')
    expect(result.current.showMessage).toBe(false)
  })

  it('should change view mode correctly', () => {
    const { result } = renderHook(() => useViewMode())

    act(() => {
      result.current.handleModeChange('editor')
    })
    expect(result.current.viewMode).toBe('editor')

    act(() => {
      result.current.handleModeChange('preview')
    })
    expect(result.current.viewMode).toBe('preview')

    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.viewMode).toBe('fullscreen')
  })

  it('should show message when entering fullscreen mode', () => {
    const { result } = renderHook(() => useViewMode())

    act(() => {
      result.current.handleModeChange('fullscreen')
    })

    expect(result.current.showMessage).toBe(true)
  })

  it('should hide message when exiting fullscreen mode', () => {
    const { result } = renderHook(() => useViewMode())

    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.showMessage).toBe(true)

    act(() => {
      result.current.handleModeChange('both')
    })
    expect(result.current.showMessage).toBe(false)
  })

  it('should exit fullscreen on ESC key press', () => {
    const { result } = renderHook(() => useViewMode())

    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.viewMode).toBe('fullscreen')

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('both')
  })

  it('should not change mode on ESC when not in fullscreen', () => {
    const { result } = renderHook(() => useViewMode())

    act(() => {
      result.current.handleModeChange('editor')
    })

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('editor')
  })

  it('should close message manually', () => {
    const { result } = renderHook(() => useViewMode())

    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.showMessage).toBe(true)

    act(() => {
      result.current.handleMessageClose()
    })
    expect(result.current.showMessage).toBe(false)
  })

  it('should cycle through all view modes', () => {
    const { result } = renderHook(() => useViewMode())
    const modes: ViewMode[] = ['both', 'editor', 'preview', 'fullscreen', 'both']

    modes.forEach((mode, index) => {
      if (index === 0) {
        expect(result.current.viewMode).toBe(mode)
      } else {
        act(() => {
          result.current.handleModeChange(mode)
        })
        expect(result.current.viewMode).toBe(mode)
      }
    })
  })
})
