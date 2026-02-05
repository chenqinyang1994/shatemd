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

  beforeEach(() => {
    editorElement = document.createElement('div')
    previewElement = document.createElement('div')
    editorScrollTop = 0
    previewScrollTop = 0

    // 使用 getter/setter 模拟可变的 scrollTop
    Object.defineProperty(editorElement, 'scrollTop', {
      get: () => editorScrollTop,
      set: (v) => { editorScrollTop = v },
      configurable: true,
    })

    Object.defineProperty(previewElement, 'scrollTop', {
      get: () => previewScrollTop,
      set: (v) => { previewScrollTop = v },
      configurable: true,
    })

    editorRef = { current: editorElement }
    previewRef = { current: previewElement }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

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
    const editorScrollToSpy = vi.fn()
    const previewScrollToSpy = vi.fn()

    editorElement.scrollTo = editorScrollToSpy
    previewElement.scrollTo = previewScrollToSpy

    render(<BackToTop editorRef={editorRef} previewRef={previewRef} />)

    // 使按钮可见
    editorScrollTop = 400
    act(() => {
      editorElement.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))

    expect(editorScrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(previewScrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
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
})
