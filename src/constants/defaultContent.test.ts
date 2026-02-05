import { describe, it, expect } from 'vitest'
import { DEFAULT_MARKDOWN } from './defaultContent'

describe('defaultContent', () => {
  it('should export DEFAULT_MARKDOWN constant', () => {
    expect(DEFAULT_MARKDOWN).toBeDefined()
    expect(typeof DEFAULT_MARKDOWN).toBe('string')
  })

  it('should contain welcome message', () => {
    expect(DEFAULT_MARKDOWN).toContain('欢迎使用 ShareMD')
  })

  it('should contain feature list', () => {
    expect(DEFAULT_MARKDOWN).toContain('功能特性')
    expect(DEFAULT_MARKDOWN).toContain('实时预览')
    expect(DEFAULT_MARKDOWN).toContain('同步滚动')
    expect(DEFAULT_MARKDOWN).toContain('长图')
  })

  it('should contain code example', () => {
    expect(DEFAULT_MARKDOWN).toContain('```javascript')
    expect(DEFAULT_MARKDOWN).toContain('console.log')
  })

  it('should contain table example', () => {
    expect(DEFAULT_MARKDOWN).toContain('|')
    expect(DEFAULT_MARKDOWN).toContain('功能')
    expect(DEFAULT_MARKDOWN).toContain('状态')
  })

  it('should be valid markdown that can be parsed', () => {
    // 基本验证 - 包含 markdown 语法
    expect(DEFAULT_MARKDOWN).toContain('#') // 标题
    expect(DEFAULT_MARKDOWN).toContain('**') // 粗体
    expect(DEFAULT_MARKDOWN).toContain('- ') // 列表
    expect(DEFAULT_MARKDOWN).toContain('---') // 分割线
  })

  it('should not be empty', () => {
    expect(DEFAULT_MARKDOWN.trim().length).toBeGreaterThan(0)
  })

  it('should have reasonable length', () => {
    // 默认内容应该是一个合理的演示长度
    expect(DEFAULT_MARKDOWN.length).toBeGreaterThan(100)
    expect(DEFAULT_MARKDOWN.length).toBeLessThan(5000)
  })
})
