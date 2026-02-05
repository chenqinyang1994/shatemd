import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Preview } from './Preview'

describe('Preview', () => {
  const previewRef = { current: null }
  const previewContentRef = { current: null }

  it('should render markdown content', () => {
    render(
      <Preview
        content="# Hello World"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World')
  })

  it('should render empty state when content is empty', () => {
    render(
      <Preview
        content=""
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(screen.getByText(/开始在左侧编辑器输入 Markdown 内容/)).toBeInTheDocument()
  })

  it('should render content when whitespace with text', () => {
    // react-markdown 会将纯空白渲染为内容，这是预期行为
    const { container } = render(
      <Preview
        content="   test   "
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(container.textContent).toContain('test')
  })

  it('should render bold text with strong tag', () => {
    render(
      <Preview
        content="This is **bold** text"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const boldElement = screen.getByText('bold')
    expect(boldElement.tagName).toBe('STRONG')
  })

  it('should render italic text', () => {
    render(
      <Preview
        content="This is *italic* text"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const italicElement = screen.getByText('italic')
    expect(italicElement.tagName).toBe('EM')
  })

  it('should render links', () => {
    render(
      <Preview
        content="[Google](https://google.com)"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const link = screen.getByRole('link', { name: 'Google' })
    expect(link).toHaveAttribute('href', 'https://google.com')
  })

  it('should render unordered lists', () => {
    render(
      <Preview
        content={`- Item 1
- Item 2
- Item 3`}
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const list = screen.getByRole('list')
    expect(list.tagName).toBe('UL')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('should render ordered lists', () => {
    render(
      <Preview
        content={`1. First
2. Second
3. Third`}
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
  })

  it('should render code blocks with syntax highlighting', () => {
    const { container } = render(
      <Preview
        content={`\`\`\`javascript
const x = 1;
\`\`\``}
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    // 代码块被 highlight.js 处理后会有 hljs 类
    const codeBlock = container.querySelector('code.hljs')
    expect(codeBlock).toBeInTheDocument()
    expect(codeBlock?.textContent).toContain('const')
    expect(codeBlock?.textContent).toContain('x')
    expect(codeBlock?.textContent).toContain('1')
  })

  it('should render inline code', () => {
    render(
      <Preview
        content="Use `npm install` to install"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const code = screen.getByText('npm install')
    expect(code.tagName).toBe('CODE')
  })

  it('should render blockquotes', () => {
    render(
      <Preview
        content="> This is a quote"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(screen.getByText('This is a quote').closest('blockquote')).toBeInTheDocument()
  })

  // GFM 特性测试
  it('should render tables (GFM)', () => {
    render(
      <Preview
        content={`| Header 1 | Header 2 |
|---|---|
| Cell 1 | Cell 2 |`}
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 1')).toBeInTheDocument()
  })

  it('should render strikethrough (GFM)', () => {
    render(
      <Preview
        content="~~strikethrough~~"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const strikeElement = screen.getByText('strikethrough')
    expect(strikeElement.tagName).toBe('DEL')
  })

  it('should render task lists (GFM)', () => {
    render(
      <Preview
        content={`- [ ] Todo
- [x] Done`}
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
  })

  it('should render multiple heading levels', () => {
    render(
      <Preview
        content={`# H1

## H2

### H3

#### H4`}
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
  })

  it('should render horizontal rule', () => {
    const { container } = render(
      <Preview
        content="---"
        previewRef={previewRef}
        previewContentRef={previewContentRef}
      />
    )

    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('should assign refs correctly', () => {
    const testPreviewRef = { current: null }
    const testContentRef = { current: null }

    render(
      <Preview
        content="# Test"
        previewRef={testPreviewRef as React.RefObject<HTMLDivElement>}
        previewContentRef={testContentRef as React.RefObject<HTMLDivElement>}
      />
    )

    expect(testPreviewRef.current).toBeInstanceOf(HTMLDivElement)
    expect(testContentRef.current).toBeInstanceOf(HTMLDivElement)
  })
})
