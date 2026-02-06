import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BackToTop } from './BackToTop'

describe('BackToTop', () => {
  let editorElement: HTMLElement
  let previewElement: HTMLElement
  let editorRef: React.RefObject<HTMLElement>
  let previewRef: React.RefObject<HTMLElement>
  let editorScrollTop: number
  let previewScrollTop: number
  let rafCallbacks: Array<FrameRequestCallback>

  beforeEach(() => {
    editorElement = document.createElement('div')
    previewElement = document.createElement('div')
    editorScrollTop = 0
    previewScrollTop = 0
    rafCallbacks = []

    // 使用 getter/setter 模拟可变的 scrollTop
    Object.defineProperty(editorElement, 'scrollTop', {
      get: () => editorScrollTop,
      set: (v) => { editorScrollTop = Math.max(0, v) },
      configurable: true,
    })

    Object.defineProperty(previewElement, 'scrollTop', {
      get: () => previewScrollTop,
      set: (v) => { previewScrollTop = Math.max(0, v) },
      configurable: true,
    })

    editorRef = { current: editorElement }
    previewRef = { current: previewElement }

    // Mock requestAnimationFrame to allow manual stepping
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb)
      return rafCallbacks.length
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // Helper: flush all pending requestAnimationFrame callbacks (one round)
  function flushRAF() {
    const cbs = rafCallbacks.splice(0)
    cbs.forEach(cb => cb(performance.now()))
  }

  // Helper: run RAF frames until scrollTop reaches 0 or max iterations
  function flushAllRAFUntilDone(maxFrames = 200) {
    for (let i = 0; i < maxFrames && rafCallbacks.length > 0; i++) {
      flushRAF()
    }
  }

  it('should not render when scroll is less than 300', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    expect(screen.queryByLabelText('回到顶部')).not.toBeInTheDocument()
  })

  it('should render when editor scroll is greater than 300', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    // 修改 scrollTop 值
    editorScrollTop = 350
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByLabelText('回到顶部')).toBeInTheDocument()
  })

  it('should render when preview scroll is greater than 300', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    previewScrollTop = 400
    act(() => {
      previewElement.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByLabelText('回到顶部')).toBeInTheDocument()
  })

  it('should hide when scrolled back to top', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    // 先滚动下去
    editorScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByLabelText('回到顶部')).toBeInTheDocument()

    // 滚动回顶部
    editorScrollTop = 100
    previewScrollTop = 100
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    expect(screen.queryByLabelText('回到顶部')).not.toBeInTheDocument()
  })

  it('should scroll both panels to top when clicked', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    // 使按钮可见
    editorScrollTop = 400
    previewScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    // Run all animation frames until done
    act(() => {
      flushAllRAFUntilDone()
    })

    expect(editorScrollTop).toBe(0)
    expect(previewScrollTop).toBe(0)
  })

  it('should have correct title attribute', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    editorScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByLabelText('回到顶部')).toHaveAttribute('title', '回到顶部')
  })

  it('should render up arrow icon', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    editorScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    const button = screen.getByLabelText('回到顶部')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('should cleanup event listeners on unmount', () => {
    const editorRemoveEventListenerSpy = vi.spyOn(editorElement, 'removeEventListener')
    const previewRemoveEventListenerSpy = vi.spyOn(previewElement, 'removeEventListener')

    const { unmount } = render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)
    unmount()

    expect(editorRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(previewRemoveEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should handle null refs gracefully', () => {
    const nullEditorRef = { current: null }
    const nullPreviewRef = { current: null }

    expect(() => {
      render(<BackToTop editorRef={nullEditorRef} previewRef={nullPreviewRef} />)
    }).not.toThrow()
  })

  it('should call onScrollStart when scrolling to top starts', () => {
    const onScrollStart = vi.fn()
    const onScrollEnd = vi.fn()

    render(
      <BackToTop
        editorRef={editorRef}
        previewRef={previewRef}
        onScrollStart={onScrollStart}
        onScrollEnd={onScrollEnd}
      />
    )

    // 使按钮可见
    editorScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    expect(onScrollStart).toHaveBeenCalledTimes(1)
  })

  it('should call onScrollEnd when both areas finish animating to top', () => {
    const onScrollStart = vi.fn()
    const onScrollEnd = vi.fn()

    render(
      <BackToTop
        editorRef={editorRef}
        previewRef={previewRef}
        onScrollStart={onScrollStart}
        onScrollEnd={onScrollEnd}
      />
    )

    // 使按钮可见
    editorScrollTop = 400
    previewScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    expect(onScrollStart).toHaveBeenCalledTimes(1)
    expect(onScrollEnd).not.toHaveBeenCalled()

    // Run all animation frames until both reach top
    act(() => {
      flushAllRAFUntilDone()
    })

    expect(editorScrollTop).toBe(0)
    expect(previewScrollTop).toBe(0)
    expect(onScrollEnd).toHaveBeenCalledTimes(1)
  })

  it('should handle already-at-top elements immediately', () => {
    const onScrollEnd = vi.fn()

    render(
      <BackToTop
        editorRef={editorRef}
        previewRef={previewRef}
        onScrollEnd={onScrollEnd}
      />
    )

    // 使按钮可见（只有编辑器滚动了）
    editorScrollTop = 400
    previewScrollTop = 0
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    // Preview is already at 0, so its callback fires immediately.
    // Editor still needs animation frames.
    act(() => {
      flushAllRAFUntilDone()
    })

    expect(editorScrollTop).toBe(0)
    expect(onScrollEnd).toHaveBeenCalledTimes(1)
  })

  it('should progressively reduce scrollTop each frame', () => {
    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    editorScrollTop = 1000
    previewScrollTop = 0
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    // Run one frame and check that scrollTop decreased
    const before = editorScrollTop
    act(() => {
      flushRAF()
    })
    expect(editorScrollTop).toBeLessThan(before)
    expect(editorScrollTop).toBeGreaterThanOrEqual(0)
  })

  it('should cancel previous animation when clicked again', () => {
    const onScrollEnd = vi.fn()

    render(
      <BackToTop
        editorRef={editorRef}
        previewRef={previewRef}
        onScrollEnd={onScrollEnd}
      />
    )

    editorScrollTop = 1000
    previewScrollTop = 1000
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    // First click
    fireEvent.click(screen.getByLabelText('回到顶部'))

    // Run a few frames
    act(() => {
      flushRAF()
      flushRAF()
    })

    // Second click — should cancel previous animations and start new ones
    editorScrollTop = 500
    previewScrollTop = 500
    fireEvent.click(screen.getByLabelText('回到顶部'))

    act(() => {
      flushAllRAFUntilDone()
    })

    expect(editorScrollTop).toBe(0)
    expect(previewScrollTop).toBe(0)
    // onScrollEnd should only fire once (from the second click's animation)
    expect(onScrollEnd).toHaveBeenCalledTimes(1)
  })

  it('should cleanup animations on unmount', () => {
    const onScrollEnd = vi.fn()

    const { unmount } = render(
      <BackToTop
        editorRef={editorRef}
        previewRef={previewRef}
        onScrollEnd={onScrollEnd}
      />
    )

    editorScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    // Unmount before animation completes
    unmount()

    // Flush remaining frames — cancelled animations should not call onScrollEnd
    act(() => {
      flushAllRAFUntilDone()
    })

    expect(onScrollEnd).not.toHaveBeenCalled()
  })
})
