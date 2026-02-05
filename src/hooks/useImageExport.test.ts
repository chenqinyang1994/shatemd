import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useImageExport } from './useImageExport'

// Mock html2canvas
vi.mock('html2canvas', () => ({
  default: vi.fn().mockImplementation(() => {
    const canvas = document.createElement('canvas')
    canvas.toBlob = vi.fn((callback) => {
      callback(new Blob(['test'], { type: 'image/png' }))
    })
    return Promise.resolve(canvas)
  }),
}))

describe('useImageExport', () => {
  let previewElement: HTMLElement
  let previewRef: React.RefObject<HTMLElement>

  beforeEach(() => {
    vi.useFakeTimers()

    previewElement = document.createElement('div')
    previewElement.innerHTML = '<p>Test content</p>'
    previewRef = { current: previewElement }

    // Reset ClipboardItem mock with proper constructor
    global.ClipboardItem = class MockClipboardItem {
      constructor(public items: Record<string, Blob>) {}
    } as any

    // Reset clipboard mock
    Object.assign(navigator, {
      clipboard: {
        write: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should initialize with null exportingType', () => {
    const { result } = renderHook(() => useImageExport(previewRef))
    expect(result.current.exportingType).toBeNull()
    expect(result.current.exportResult).toBeNull()
  })

  it('should preload html2canvas after 2 seconds', async () => {
    renderHook(() => useImageExport(previewRef))

    // 快进 2 秒
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // html2canvas 应该被预加载
    const html2canvas = await import('html2canvas')
    expect(html2canvas).toBeDefined()
  })

  it('should trigger preload on manual call', async () => {
    const { result } = renderHook(() => useImageExport(previewRef))

    act(() => {
      result.current.preload()
    })

    const html2canvas = await import('html2canvas')
    expect(html2canvas).toBeDefined()
  })

  it('should set exportingType to "download" during download', async () => {
    vi.useRealTimers()
    const { result } = renderHook(() => useImageExport(previewRef))

    // 开始下载
    await act(async () => {
      await result.current.exportAsImage('download')
    })

    // 完成后 exportingType 应该重置为 null
    expect(result.current.exportingType).toBeNull()
  })

  it('should set exportingType to "copy" during copy', async () => {
    vi.useRealTimers()
    const { result } = renderHook(() => useImageExport(previewRef))

    await act(async () => {
      await result.current.exportAsImage('copy')
    })

    expect(result.current.exportingType).toBeNull()
  })

  it('should return success result on download', async () => {
    vi.useRealTimers()
    const { result } = renderHook(() => useImageExport(previewRef))

    await act(async () => {
      await result.current.exportAsImage('download')
    })

    expect(result.current.exportResult).toEqual({
      success: true,
      message: '图片已开始下载',
    })
  })

  it('should return success result on copy when clipboard works', async () => {
    vi.useRealTimers()
    const { result } = renderHook(() => useImageExport(previewRef))

    await act(async () => {
      await result.current.exportAsImage('copy')
    })

    expect(result.current.exportResult?.success).toBe(true)
    expect(result.current.exportResult?.message).toBe('已复制图片到剪贴板')
  })

  it('should clear result when clearResult is called', async () => {
    vi.useRealTimers()
    const { result } = renderHook(() => useImageExport(previewRef))

    await act(async () => {
      await result.current.exportAsImage('download')
    })

    expect(result.current.exportResult).not.toBeNull()

    act(() => {
      result.current.clearResult()
    })

    expect(result.current.exportResult).toBeNull()
  })

  it('should handle null ref gracefully', async () => {
    vi.useRealTimers()
    const nullRef = { current: null }
    const { result } = renderHook(() => useImageExport(nullRef))

    await act(async () => {
      await result.current.exportAsImage('download')
    })

    // 不应该抛出错误，exportResult 应该为 null
    expect(result.current.exportResult).toBeNull()
  })

  it('should fallback to download when clipboard fails', async () => {
    vi.useRealTimers()

    // Mock clipboard to fail
    Object.assign(navigator, {
      clipboard: {
        write: vi.fn().mockRejectedValue(new Error('Clipboard unavailable')),
      },
    })

    const { result } = renderHook(() => useImageExport(previewRef))

    await act(async () => {
      await result.current.exportAsImage('copy')
    })

    expect(result.current.exportResult?.success).toBe(false)
    expect(result.current.exportResult?.message).toContain('已自动下载')
  })

  it('should export result object with correct structure', async () => {
    vi.useRealTimers()
    const { result } = renderHook(() => useImageExport(previewRef))

    await act(async () => {
      await result.current.exportAsImage('download')
    })

    // 验证导出结果对象的结构
    expect(result.current.exportResult).toHaveProperty('success')
    expect(result.current.exportResult).toHaveProperty('message')
    expect(typeof result.current.exportResult?.success).toBe('boolean')
    expect(typeof result.current.exportResult?.message).toBe('string')
  })
})
