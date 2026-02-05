import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, act } from '@testing-library/react'
import { ResizableDivider } from './ResizableDivider'

describe('ResizableDivider', () => {
  const mockOnResize = vi.fn()

  beforeEach(() => {
    mockOnResize.mockClear()
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render divider element', () => {
    const { container } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement
    expect(divider).toBeInTheDocument()
    expect(divider.className).toContain('divider')
  })

  it('should start dragging on mousedown', () => {
    const { container } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    expect(divider.className).toContain('dragging')
  })

  it('should stop dragging on mouseup', () => {
    const { container } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)
    expect(divider.className).toContain('dragging')

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup'))
    })

    expect(divider.className).not.toContain('dragging')
  })

  it('should call onResize during drag', () => {
    const { container } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }))
    })

    expect(mockOnResize).toHaveBeenCalledWith(500)
  })

  it('should respect minimum width constraint', () => {
    const { container } = render(
      <ResizableDivider onResize={mockOnResize} minWidth={300} />
    )
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    // 尝试拖到小于最小宽度的位置
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    })

    // 不应该调用 onResize，因为低于最小宽度
    expect(mockOnResize).not.toHaveBeenCalled()
  })

  it('should respect maximum width constraint (window - minWidth)', () => {
    const { container } = render(
      <ResizableDivider onResize={mockOnResize} minWidth={300} />
    )
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    // 尝试拖到右边界过近的位置 (1200 - 300 - 4 = 896 是最大值)
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 1000 }))
    })

    // 不应该调用 onResize，因为右侧空间不足
    expect(mockOnResize).not.toHaveBeenCalled()
  })

  it('should call onResize with valid position', () => {
    const { container } = render(
      <ResizableDivider onResize={mockOnResize} minWidth={300} />
    )
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    // 有效位置：左边 >= 300，右边 >= 300 + 4
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 600 }))
    })

    expect(mockOnResize).toHaveBeenCalledWith(600)
  })

  it('should use default minWidth of 300', () => {
    const { container } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    // 低于默认最小宽度
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 250 }))
    })

    expect(mockOnResize).not.toHaveBeenCalled()

    // 高于默认最小宽度
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 350 }))
    })

    expect(mockOnResize).toHaveBeenCalledWith(350)
  })

  it('should remove event listeners when not dragging', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    const { container, unmount } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement

    fireEvent.mouseDown(divider)

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup'))
    })

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function))
  })

  it('should prevent default on mousedown', () => {
    const { container } = render(<ResizableDivider onResize={mockOnResize} />)
    const divider = container.firstChild as HTMLElement

    const event = new MouseEvent('mousedown', { bubbles: true })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    divider.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should not call onResize when not dragging', () => {
    render(<ResizableDivider onResize={mockOnResize} />)

    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }))
    })

    expect(mockOnResize).not.toHaveBeenCalled()
  })
})
