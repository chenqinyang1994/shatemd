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
    expect(result.current.contentMode).toBe('both')
    expect(result.current.isFullscreen).toBe(false)
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
    expect(result.current.isFullscreen).toBe(true)

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('both')
    expect(result.current.isFullscreen).toBe(false)
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

  it('should remember content mode when entering fullscreen from editor mode', () => {
    const { result } = renderHook(() => useViewMode())

    // 切换到仅编辑模式
    act(() => {
      result.current.handleModeChange('editor')
    })
    expect(result.current.contentMode).toBe('editor')

    // 进入全屏
    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.viewMode).toBe('fullscreen')
    expect(result.current.contentMode).toBe('editor') // 应该保持 editor
    expect(result.current.isFullscreen).toBe(true)

    // ESC 退出全屏
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('editor') // 应该回到 editor
    expect(result.current.contentMode).toBe('editor')
    expect(result.current.isFullscreen).toBe(false)
  })

  it('should remember content mode when entering fullscreen from preview mode', () => {
    const { result } = renderHook(() => useViewMode())

    // 切换到仅预览模式
    act(() => {
      result.current.handleModeChange('preview')
    })
    expect(result.current.contentMode).toBe('preview')

    // 进入全屏
    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.viewMode).toBe('fullscreen')
    expect(result.current.contentMode).toBe('preview') // 应该保持 preview
    expect(result.current.isFullscreen).toBe(true)

    // ESC 退出全屏
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('preview') // 应该回到 preview
    expect(result.current.contentMode).toBe('preview')
    expect(result.current.isFullscreen).toBe(false)
  })

  it('should remember content mode when entering fullscreen from both mode', () => {
    const { result } = renderHook(() => useViewMode())

    // 默认就是 both 模式
    expect(result.current.contentMode).toBe('both')

    // 进入全屏
    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.viewMode).toBe('fullscreen')
    expect(result.current.contentMode).toBe('both') // 应该保持 both
    expect(result.current.isFullscreen).toBe(true)

    // ESC 退出全屏
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('both') // 应该回到 both
    expect(result.current.contentMode).toBe('both')
    expect(result.current.isFullscreen).toBe(false)
  })

  it('should update previous mode when switching content modes in fullscreen', () => {
    const { result } = renderHook(() => useViewMode())

    // 从 both 进入全屏
    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.contentMode).toBe('both')

    // 在全屏状态下切换到 editor
    act(() => {
      result.current.handleModeChange('editor')
    })
    expect(result.current.viewMode).toBe('editor')
    expect(result.current.contentMode).toBe('editor')

    // 再次进入全屏
    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.contentMode).toBe('editor') // 应该记住 editor

    // ESC 退出
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    })
    expect(result.current.viewMode).toBe('editor')
  })

  it('should have correct isFullscreen flag', () => {
    const { result } = renderHook(() => useViewMode())

    expect(result.current.isFullscreen).toBe(false)

    act(() => {
      result.current.handleModeChange('fullscreen')
    })
    expect(result.current.isFullscreen).toBe(true)

    act(() => {
      result.current.handleModeChange('both')
    })
    expect(result.current.isFullscreen).toBe(false)
  })
})
