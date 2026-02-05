import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Message } from './Message'

describe('Message', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render message content', () => {
    render(<Message content="Test message" />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('should auto-hide after default duration (3000ms)', () => {
    const onClose = vi.fn()
    render(<Message content="Test message" onClose={onClose} />)

    expect(screen.getByText('Test message')).toBeInTheDocument()

    // 快进 3000ms (消息隐藏)
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    // 再快进 300ms (等待动画结束后调用 onClose)
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('should auto-hide after custom duration', () => {
    const onClose = vi.fn()
    render(<Message content="Test message" duration={5000} onClose={onClose} />)

    // 3秒后还在
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText('Test message')).toBeInTheDocument()

    // 再 2 秒后隐藏
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // 等待动画
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('should have info icon', () => {
    render(<Message content="Test message" />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(<Message content="Test message" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('messageWrapper')
  })

  it('should work without onClose callback', () => {
    render(<Message content="Test message" />)

    expect(() => {
      act(() => {
        vi.advanceTimersByTime(3300)
      })
    }).not.toThrow()
  })

  it('should cleanup timer on unmount', () => {
    const onClose = vi.fn()
    const { unmount } = render(<Message content="Test message" onClose={onClose} />)

    unmount()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    // 卸载后不应该调用 onClose
    expect(onClose).not.toHaveBeenCalled()
  })
})
