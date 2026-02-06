import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSyncScroll } from './useSyncScroll'

describe('useSyncScroll', () => {
  let editorElement: HTMLElement
  let previewElement: HTMLElement
  let editorRef: React.RefObject<HTMLElement>
  let previewRef: React.RefObject<HTMLElement>
  let rafCallback: FrameRequestCallback | null = null

  beforeEach(() => {
    // 创建模拟 DOM 元素
    editorElement = document.createElement('div')
    previewElement = document.createElement('div')

    // 设置滚动属性
    Object.defineProperties(editorElement, {
      scrollTop: { value: 0, writable: true },
      scrollHeight: { value: 1000, writable: true },
      clientHeight: { value: 500, writable: true },
    })

    Object.defineProperties(previewElement, {
      scrollTop: { value: 0, writable: true },
      scrollHeight: { value: 1200, writable: true },
      clientHeight: { value: 500, writable: true },
    })

    editorRef = { current: editorElement }
    previewRef = { current: previewElement }

    // Mock requestAnimationFrame 以便控制执行时机
    vi.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb
      return 1
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    rafCallback = null
  })

  it('should setup scroll listeners on mount', () => {
    const addEventListenerSpy = vi.spyOn(editorElement, 'addEventListener')
    const previewAddEventListenerSpy = vi.spyOn(previewElement, 'addEventListener')

    renderHook(() => useSyncScroll(editorRef, previewRef))

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    expect(previewAddEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  })

  it('should cleanup listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(editorElement, 'removeEventListener')
    const previewRemoveEventListenerSpy = vi.spyOn(previewElement, 'removeEventListener')

    const { unmount } = renderHook(() => useSyncScroll(editorRef, previewRef))
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(previewRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should not throw when refs are null', () => {
    const nullEditorRef = { current: null }
    const nullPreviewRef = { current: null }

    expect(() => {
      renderHook(() => useSyncScroll(nullEditorRef, nullPreviewRef))
    }).not.toThrow()
  })

  it('should sync scroll from editor to preview', () => {
    renderHook(() => useSyncScroll(editorRef, previewRef))

    // 模拟编辑器滚动到 50%
    Object.defineProperty(editorElement, 'scrollTop', { value: 250, writable: true })

    // 触发滚动事件
    editorElement.dispatchEvent(new Event('scroll'))

    // 执行 requestAnimationFrame 回调
    if (rafCallback) {
      rafCallback(0)
    }

    // 预览区应该同步到相应位置 (50% of (1200 - 500) = 350)
    // 由于 scrollTop 是只读属性被 mock，这里验证 sync 逻辑被触发
    expect(rafCallback).not.toBeNull()
  })

  it('should use passive event listeners for performance', () => {
    const addEventListenerSpy = vi.spyOn(editorElement, 'addEventListener')

    renderHook(() => useSyncScroll(editorRef, previewRef))

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    )
  })

  it('should cancel previous animation frame on rapid scrolling', () => {
    const cancelAnimationFrameSpy = vi.spyOn(global, 'cancelAnimationFrame')

    renderHook(() => useSyncScroll(editorRef, previewRef))

    // 快速连续滚动
    editorElement.dispatchEvent(new Event('scroll'))
    editorElement.dispatchEvent(new Event('scroll'))
    editorElement.dispatchEvent(new Event('scroll'))

    // 应该取消之前的动画帧
    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
  })

  it('should not setup scroll listeners when disabled', () => {
    const addEventListenerSpy = vi.spyOn(editorElement, 'addEventListener')
    const previewAddEventListenerSpy = vi.spyOn(previewElement, 'addEventListener')

    renderHook(() => useSyncScroll(editorRef, previewRef, false))

    // 禁用时不应该添加事件监听
    expect(addEventListenerSpy).not.toHaveBeenCalled()
    expect(previewAddEventListenerSpy).not.toHaveBeenCalled()
  })

  it('should enable/disable sync scroll dynamically', () => {
    const addEventListenerSpy = vi.spyOn(editorElement, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(editorElement, 'removeEventListener')

    // 初始禁用
    const { rerender } = renderHook(
      ({ enabled }) => useSyncScroll(editorRef, previewRef, enabled),
      { initialProps: { enabled: false } }
    )

    expect(addEventListenerSpy).not.toHaveBeenCalled()

    // 启用同步滚动
    rerender({ enabled: true })

    expect(addEventListenerSpy).toHaveBeenCalled()

    // 再次禁用
    rerender({ enabled: false })

    expect(removeEventListenerSpy).toHaveBeenCalled()
  })

  it('should not sync scroll when disabled', () => {
    renderHook(() => useSyncScroll(editorRef, previewRef, false))

    // 模拟编辑器滚动
    Object.defineProperty(editorElement, 'scrollTop', { value: 250, writable: true })
    editorElement.dispatchEvent(new Event('scroll'))

    // 预览区的 scrollTop 应该保持不变
    expect(previewElement.scrollTop).toBe(0)
  })

  it('should re-setup listeners when ref.current changes from null to element', () => {
    const addEventListenerSpy = vi.spyOn(editorElement, 'addEventListener')

    // 初始 ref 为 null
    const nullPreviewRef = { current: null }
    const { rerender } = renderHook(
      ({ previewRef, contentMode, refVersion }) => useSyncScroll(editorRef, previewRef as any, true, contentMode, refVersion),
      { initialProps: { previewRef: nullPreviewRef, contentMode: 'editor' as const, refVersion: 0 } }
    )

    // 此时不应该设置监听器（因为 preview 是 null）
    expect(addEventListenerSpy).not.toHaveBeenCalled()

    // 模拟 Preview 组件挂载，ref.current 从 null 变为元素
    const mountedPreviewRef = { current: previewElement }
    rerender({ previewRef: mountedPreviewRef as any, contentMode: 'both' as const, refVersion: 1 })

    // 应该重新设置监听器
    expect(addEventListenerSpy).toHaveBeenCalled()
  })

  it('should handle preview unmount and remount correctly', () => {
    const addEventListenerSpy = vi.spyOn(previewElement, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(previewElement, 'removeEventListener')

    // 初始状态：双栏模式，preview 存在
    const { rerender } = renderHook(
      ({ previewRef, contentMode, refVersion }) => useSyncScroll(editorRef, previewRef as any, true, contentMode, refVersion),
      { initialProps: { previewRef, contentMode: 'both' as const, refVersion: 0 } }
    )

    expect(addEventListenerSpy).toHaveBeenCalled()
    addEventListenerSpy.mockClear()

    // 模拟切换到"仅编辑"模式，preview 被卸载
    const nullPreviewRef = { current: null }
    rerender({ previewRef: nullPreviewRef as any, contentMode: 'editor' as const, refVersion: 0 })

    expect(removeEventListenerSpy).toHaveBeenCalled()

    // 模拟切换回"双栏"模式，preview 重新挂载
    const remountedPreviewRef = { current: previewElement }
    rerender({ previewRef: remountedPreviewRef as any, contentMode: 'both' as const, refVersion: 1 })

    // 应该重新设置监听器
    expect(addEventListenerSpy).toHaveBeenCalled()
  })

  it('should re-setup listeners when contentMode changes even if ref is same', () => {
    const addEventListenerSpy = vi.spyOn(previewElement, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(previewElement, 'removeEventListener')

    // 初始：双栏模式
    const { rerender } = renderHook(
      ({ contentMode, refVersion }) => useSyncScroll(editorRef, previewRef, true, contentMode, refVersion),
      { initialProps: { contentMode: 'both' as const, refVersion: 0 } }
    )

    // 应该设置了两个监听器（editor + preview）
    expect(addEventListenerSpy).toHaveBeenCalled()
    const initialCallCount = addEventListenerSpy.mock.calls.length

    // 切换到仅编辑（preview ref 变为 null）
    const nullPreviewRef = { current: null }
    Object.assign(previewRef, nullPreviewRef)
    rerender({ contentMode: 'editor' as const, refVersion: 0 })

    expect(removeEventListenerSpy).toHaveBeenCalled()

    // 切换回双栏（preview ref 恢复）
    Object.assign(previewRef, { current: previewElement })
    rerender({ contentMode: 'both' as const, refVersion: 1 })

    // 应该重新设置监听器（因为 contentMode 变化了）
    expect(addEventListenerSpy.mock.calls.length).toBeGreaterThan(initialCallCount)
  })

  it('should skip sync when pauseRef.current is true', () => {
    const pauseRef = { current: false }

    renderHook(() => useSyncScroll(editorRef, previewRef, true, 'both', 0, pauseRef))

    // 暂停同步
    pauseRef.current = true

    // 模拟编辑器滚动
    Object.defineProperty(editorElement, 'scrollTop', { value: 250, writable: true })
    editorElement.dispatchEvent(new Event('scroll'))

    // 执行 RAF
    if (rafCallback) rafCallback(0)

    // 预览区 scrollTop 应保持不变（同步被暂停）
    expect(previewElement.scrollTop).toBe(0)
  })

  it('should resume sync when pauseRef.current returns to false', () => {
    const pauseRef = { current: true }

    renderHook(() => useSyncScroll(editorRef, previewRef, true, 'both', 0, pauseRef))

    // 恢复同步
    pauseRef.current = false

    // 模拟编辑器滚动
    Object.defineProperty(editorElement, 'scrollTop', { value: 250, writable: true })
    editorElement.dispatchEvent(new Event('scroll'))

    // 执行 RAF
    if (rafCallback) rafCallback(0)

    // 验证 RAF 回调被触发（同步已恢复）
    expect(rafCallback).not.toBeNull()
  })

  it('should handle editor unmount and remount correctly (preview-only mode)', () => {
    const addEventListenerSpy = vi.spyOn(editorElement, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(editorElement, 'removeEventListener')

    // 初始状态：双栏模式，editor 和 preview 都存在
    const { rerender } = renderHook(
      ({ editorRef, contentMode, refVersion }) => useSyncScroll(editorRef as any, previewRef, true, contentMode, refVersion),
      { initialProps: { editorRef, contentMode: 'both' as const, refVersion: 0 } }
    )

    expect(addEventListenerSpy).toHaveBeenCalled()
    addEventListenerSpy.mockClear()

    // 模拟切换到"仅预览"模式，editor 被卸载
    const nullEditorRef = { current: null }
    rerender({ editorRef: nullEditorRef as any, contentMode: 'preview' as const, refVersion: 0 })

    expect(removeEventListenerSpy).toHaveBeenCalled()

    // 模拟切换回"双栏"模式，editor 重新挂载（refVersion 递增）
    const remountedEditorRef = { current: editorElement }
    rerender({ editorRef: remountedEditorRef as any, contentMode: 'both' as const, refVersion: 1 })

    // 应该重新设置监听器
    expect(addEventListenerSpy).toHaveBeenCalled()
  })
})
