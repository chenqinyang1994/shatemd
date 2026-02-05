import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ViewModeToggle, ViewMode } from './ViewModeToggle'

describe('ViewModeToggle', () => {
  const mockOnModeChange = vi.fn()

  beforeEach(() => {
    mockOnModeChange.mockClear()
  })

  it('should render all four mode buttons', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    expect(screen.getByLabelText('仅编辑区')).toBeInTheDocument()
    expect(screen.getByLabelText('双栏模式')).toBeInTheDocument()
    expect(screen.getByLabelText('仅预览区')).toBeInTheDocument()
    expect(screen.getByLabelText('全屏模式')).toBeInTheDocument()
  })

  it('should highlight current mode button', () => {
    const { rerender } = render(
      <ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />
    )

    const bothButton = screen.getByLabelText('双栏模式')
    expect(bothButton).toHaveAttribute('aria-pressed', 'true')

    rerender(<ViewModeToggle currentMode="editor" onModeChange={mockOnModeChange} />)
    const editorButton = screen.getByLabelText('仅编辑区')
    expect(editorButton).toHaveAttribute('aria-pressed', 'true')
    expect(bothButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('should call onModeChange when editor button clicked', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    fireEvent.click(screen.getByLabelText('仅编辑区'))
    expect(mockOnModeChange).toHaveBeenCalledWith('editor')
  })

  it('should call onModeChange when preview button clicked', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    fireEvent.click(screen.getByLabelText('仅预览区'))
    expect(mockOnModeChange).toHaveBeenCalledWith('preview')
  })

  it('should call onModeChange when fullscreen button clicked', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    fireEvent.click(screen.getByLabelText('全屏模式'))
    expect(mockOnModeChange).toHaveBeenCalledWith('fullscreen')
  })

  it('should call onModeChange when both button clicked', () => {
    render(<ViewModeToggle currentMode="editor" onModeChange={mockOnModeChange} />)

    fireEvent.click(screen.getByLabelText('双栏模式'))
    expect(mockOnModeChange).toHaveBeenCalledWith('both')
  })

  it('should have correct role for accessibility', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('aria-label', '视图模式切换')
  })

  it('should have tooltips on buttons', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    expect(screen.getByLabelText('仅编辑区')).toHaveAttribute('data-tooltip', '仅编辑区')
    expect(screen.getByLabelText('双栏模式')).toHaveAttribute('data-tooltip', '双栏模式')
    expect(screen.getByLabelText('仅预览区')).toHaveAttribute('data-tooltip', '仅预览区')
    expect(screen.getByLabelText('全屏模式')).toHaveAttribute('data-tooltip', '全屏模式')
  })

  it('should render SVG icons in buttons', () => {
    render(<ViewModeToggle currentMode="both" onModeChange={mockOnModeChange} />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button.querySelector('svg')).toBeInTheDocument()
    })
  })

  it('should correctly reflect all view modes', () => {
    const modes: ViewMode[] = ['both', 'editor', 'preview', 'fullscreen']

    modes.forEach((mode) => {
      const { unmount } = render(
        <ViewModeToggle currentMode={mode} onModeChange={mockOnModeChange} />
      )

      const buttons = screen.getAllByRole('button')
      const activeButtons = buttons.filter(
        (btn) => btn.getAttribute('aria-pressed') === 'true'
      )
      expect(activeButtons).toHaveLength(1)

      unmount()
    })
  })
})
