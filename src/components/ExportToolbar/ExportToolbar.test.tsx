import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExportToolbar } from './ExportToolbar'

describe('ExportToolbar', () => {
  const mockOnDownload = vi.fn()
  const mockOnCopy = vi.fn()
  const mockOnMouseEnter = vi.fn()

  beforeEach(() => {
    mockOnDownload.mockClear()
    mockOnCopy.mockClear()
    mockOnMouseEnter.mockClear()
  })

  it('should render download and copy buttons', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType={null}
      />
    )

    expect(screen.getByText('下载图片')).toBeInTheDocument()
    expect(screen.getByText('复制图片')).toBeInTheDocument()
  })

  it('should call onDownload when download button clicked', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType={null}
      />
    )

    fireEvent.click(screen.getByText('下载图片'))
    expect(mockOnDownload).toHaveBeenCalledTimes(1)
  })

  it('should call onCopy when copy button clicked', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType={null}
      />
    )

    fireEvent.click(screen.getByText('复制图片'))
    expect(mockOnCopy).toHaveBeenCalledTimes(1)
  })

  it('should call onMouseEnter when hovering toolbar', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        onMouseEnter={mockOnMouseEnter}
        exportingType={null}
      />
    )

    const toolbar = screen.getByText('下载图片').closest('div')
    fireEvent.mouseEnter(toolbar!)
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1)
  })

  it('should show loading state when downloading', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType="download"
      />
    )

    expect(screen.getByText('生成中...')).toBeInTheDocument()
    expect(screen.queryByText('下载图片')).not.toBeInTheDocument()
  })

  it('should show loading state when copying', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType="copy"
      />
    )

    expect(screen.getByText('复制中...')).toBeInTheDocument()
    expect(screen.queryByText('复制图片')).not.toBeInTheDocument()
  })

  it('should disable buttons when busy', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType="download"
      />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  it('should not call handlers when buttons are disabled', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType="download"
      />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      fireEvent.click(button)
    })

    expect(mockOnDownload).not.toHaveBeenCalled()
    expect(mockOnCopy).not.toHaveBeenCalled()
  })

  it('should have tooltips on buttons', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType={null}
      />
    )

    const downloadButton = screen.getByText('下载图片').closest('button')
    const copyButton = screen.getByText('复制图片').closest('button')

    expect(downloadButton).toHaveAttribute('data-tooltip', '将预览内容生成长图并下载')
    expect(copyButton).toHaveAttribute('data-tooltip', '将预览长图复制到剪贴板')
  })

  it('should have loading icon when exporting', () => {
    const { container } = render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType="download"
      />
    )

    // 查找 loading icon div
    const loadingIcon = container.querySelector('[class*="loadingIcon"]')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('should render SVG icons when not loading', () => {
    render(
      <ExportToolbar
        onDownload={mockOnDownload}
        onCopy={mockOnCopy}
        exportingType={null}
      />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button.querySelector('svg')).toBeInTheDocument()
    })
  })
})
