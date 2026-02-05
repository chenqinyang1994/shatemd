import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock scrollTo
Element.prototype.scrollTo = vi.fn()

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 0)
  return 0
})

global.cancelAnimationFrame = vi.fn()

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
global.URL.revokeObjectURL = vi.fn()

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    write: vi.fn().mockResolvedValue(undefined),
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})

// Mock window.isSecureContext
Object.defineProperty(window, 'isSecureContext', {
  value: true,
  writable: true,
})

// Mock ClipboardItem
global.ClipboardItem = vi.fn().mockImplementation((items) => items)

// Mock document.fonts.ready
Object.defineProperty(document, 'fonts', {
  value: {
    ready: Promise.resolve(),
  },
})
