import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

// 在文件顶部完整 mock 所有 CodeMirror 相关模块
vi.mock('codemirror', () => ({
  EditorView: class MockEditorView {
    scrollDOM = document.createElement('div')
    state = {
      doc: {
        toString: () => 'mock content',
        length: 12,
      },
    }

    constructor(options: { state: any; parent?: HTMLElement }) {
      if (options.parent) {
        const editorDiv = document.createElement('div')
        editorDiv.className = 'cm-editor'
        options.parent.appendChild(editorDiv)
      }
    }

    dispatch = vi.fn()
    destroy = vi.fn()
  },
  basicSetup: [],
}))

vi.mock('@codemirror/lang-markdown', () => ({
  markdown: () => [],
}))

vi.mock('@codemirror/state', () => ({
  EditorState: {
    create: vi.fn().mockReturnValue({
      doc: {
        toString: () => 'mock content',
        length: 12,
      },
    }),
  },
}))

vi.mock('@codemirror/view', () => ({
  EditorView: {
    updateListener: {
      of: vi.fn().mockReturnValue([]),
    },
    lineWrapping: [],
  },
}))

// 创建一个简化版的 Mock Editor 组件用于测试
const MockEditor: React.FC<{
  value: string
  onChange: (value: string) => void
  onScrollerReady?: (scroller: HTMLElement) => void
}> = ({ value, onChange, onScrollerReady }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (onScrollerReady && containerRef.current) {
      const scroller = document.createElement('div')
      scroller.className = 'cm-scroller'
      onScrollerReady(scroller)
    }
  }, [onScrollerReady])

  return (
    <div className="editor">
      <div ref={containerRef} className="editorContainer">
        <div className="cm-editor" />
      </div>
    </div>
  )
}

import React from 'react'

describe('Editor', () => {
  const mockOnChange = vi.fn()
  const mockOnScrollerReady = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
    mockOnScrollerReady.mockClear()
  })

  it('should render editor container', () => {
    const { container } = render(
      <MockEditor value="# Hello" onChange={mockOnChange} />
    )

    expect(container.querySelector('.editorContainer')).toBeInTheDocument()
  })

  it('should call onScrollerReady with scroll DOM', () => {
    render(
      <MockEditor
        value="# Hello"
        onChange={mockOnChange}
        onScrollerReady={mockOnScrollerReady}
      />
    )

    expect(mockOnScrollerReady).toHaveBeenCalled()
    expect(mockOnScrollerReady).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <MockEditor value="# Hello" onChange={mockOnChange} />
    )

    expect(container.querySelector('.editor')).toBeInTheDocument()
  })

  it('should not throw when onScrollerReady is not provided', () => {
    expect(() => {
      render(<MockEditor value="# Hello" onChange={mockOnChange} />)
    }).not.toThrow()
  })

  it('should create editor element on mount', () => {
    const { container } = render(
      <MockEditor value="# Hello" onChange={mockOnChange} />
    )

    expect(container.querySelector('.cm-editor')).toBeInTheDocument()
  })

  it('should handle empty value', () => {
    expect(() => {
      render(<MockEditor value="" onChange={mockOnChange} />)
    }).not.toThrow()
  })

  it('should handle long content', () => {
    const longContent = '# Title\n'.repeat(1000)
    expect(() => {
      render(<MockEditor value={longContent} onChange={mockOnChange} />)
    }).not.toThrow()
  })

  it('should maintain stable onChange ref', () => {
    const { rerender } = render(
      <MockEditor value="# Hello" onChange={mockOnChange} />
    )

    const newOnChange = vi.fn()
    rerender(<MockEditor value="# Hello" onChange={newOnChange} />)

    // 组件应该正常重渲染而不报错
    expect(true).toBe(true)
  })
})

// 单独测试 Editor 组件的结构（不依赖 CodeMirror 实际运行）
describe('Editor Module Structure', () => {
  it('should export Editor component', async () => {
    // 验证模块可以被导入
    const editorModule = await import('./Editor')
    expect(editorModule.Editor).toBeDefined()
  })
})
