# ShareMD - Modern Markdown Editor

<p align="center">
  <img src="src/assets/images/logo.webp" alt="ShareMD Logo" width="200" />
</p>

> 🚀 Online Markdown editor built for writing and sharing
>
> Real-time Preview · Smart Sync Scrolling · One-Click Image Export · Multiple View Modes

**Tech Stack:** React 18.2 | TypeScript 5.2 | Vite 5.1 | CodeMirror 6 | Test Coverage 75%

[中文文档](./README.zh-CN.md)

---

## 🌐 Live Demo

🎉 **Deployed on Cloudflare Pages**, ready to use:

- 🌍 **Primary Domain**: [sharemd.top](https://sharemd.top)
- 🌍 **Alt Domain**: [www.sharemd.top](https://www.sharemd.top)
- 🔗 **Pages Domain**: [sharemd.pages.dev](https://sharemd.pages.dev)

✅ Global CDN · Auto HTTPS · Brotli Compression

---

## ✨ Core Features

### 📝 Professional Editing Experience

- **CodeMirror 6 Powered**: Industry-leading editor core with syntax highlighting, auto-completion, and code folding
- **Virtualized Rendering**: Smooth editing for thousand-line documents with extreme performance optimization
- **Adaptive Line Height**: Auto word-wrap and smart indentation for comfortable long-text editing

### 👀 Real-time Preview System

- **GitHub Flavored Markdown**: Full GFM support (tables, task lists, strikethrough, auto-links, etc.)
- **Code Highlighting**: Based on Highlight.js, covering 180+ programming languages
- **Instant Rendering**: Zero-delay WYSIWYG preview as you type

### 📜 Smart Bidirectional Sync Scrolling

- **Proportional Sync Algorithm**: Editor and preview panes sync precisely by content height ratio
- **Debounce Optimization**: Uses `requestAnimationFrame` for silky-smooth scrolling
- **Toggle On/Off**: One-click enable/disable sync scrolling for different usage scenarios
- **Back to Top**:
  - 🔧 **CodeMirror Virtualization Compatible**: Specially optimized animation algorithm solving thousand-line document scroll-to-top issues
  - ⚡ **Exponential Decay + Minimum Step**: Fast yet smooth, avoiding Zeno's paradox

### 🖼️ One-Click Image Export

- **High-Quality Rendering**: Based on html2canvas, supports Retina displays (2x DPI)
- **Two Export Methods**:
  - 📥 **Download Locally**: PNG format, fully preserving styles and code highlighting
  - 📋 **Copy to Clipboard**: Paste directly to WeChat, DingTalk, Feishu, and other chat tools
- **Smart Loading**: Preloads html2canvas library on mouse hover, reducing initial bundle size
- **Elegant Feedback**: Glassmorphism-style Toast with clear success/failure status

### 🎨 Multiple View Modes

| Mode | Description | Shortcut |
| ----- | ------------ | -------- |
| 📝 **Dual Pane** | Editor on left, preview on right (default) | Supports drag-resize width |
| ⌨️ **Editor Only** | Fullscreen editing, focus on writing | 100% width |
| 👁️ **Preview Only** | Fullscreen preview, focus on reading | 100% width |
| 🖥️ **Fullscreen** | Immersive dual-pane mode | Press ESC to exit |

### 🌐 Multilingual Support

- **English**: Default language
- **中文**: Full Chinese localization
- **One-Click Switch**: Language switcher in header toolbar
- **Persistent Settings**: Language preference saved in localStorage

---

## 🚀 Quick Start

### Online Use (Recommended)

Visit [sharemd.top](https://sharemd.top), start writing immediately - no installation required!

### Local Development

```bash
# Clone repository
git clone https://github.com/chenqinyang1994/sharemd.git
cd sharemd

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

### Environment Requirements

- Node.js >= 16
- npm >= 8

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

**Test Coverage**: 75%+ (Editor, Preview, Export, ViewMode, etc.)

---

## 📦 Tech Stack

### Core Framework

- **React 18.2**: Component-based UI library
- **TypeScript 5.2**: Type-safe development
- **Vite 5.1**: Lightning-fast build tool

### Editor & Rendering

- **CodeMirror 6**: Modern code editor
- **react-markdown**: Markdown parser & renderer
- **remark-gfm**: GitHub Flavored Markdown plugin
- **rehype-highlight**: Syntax highlighting plugin
- **Highlight.js**: Code highlighting library

### Utilities

- **html2canvas**: HTML to Canvas/Image conversion
- **i18next**: Internationalization framework
- **react-i18next**: React i18n bindings

### Development & Testing

- **Vitest**: Fast unit testing framework
- **@testing-library/react**: React component testing utilities
- **ESLint**: Code quality linter
- **TypeScript Compiler**: Type checking

---

## 🎯 Project Highlights

### ✅ Production-Ready Code Quality

- TypeScript full coverage with strict mode enabled
- 75%+ unit test coverage
- ESLint code quality checks
- CI/CD automated deployment

### ⚡ Performance Optimization

- CodeMirror 6 virtualized rendering (handles 10,000+ line documents)
- Smart debouncing for sync scrolling
- Dynamic import for html2canvas (on-demand loading)
- Vite build optimization (code splitting, tree shaking)
- Cloudflare CDN global acceleration

### 🎨 User Experience

- Responsive design (Desktop/Tablet/Mobile)
- Dark/Light mode support (follows system)
- Keyboard shortcuts (Ctrl+S to save locally)
- Accessibility (ARIA labels, semantic HTML)
- Smooth animations and transitions

### 🔒 Security & Privacy

- No backend, no data collection
- Content stored locally in browser
- HTTPS encryption
- No third-party tracking

---

## 📖 User Guide

### Basic Operations

1. **Writing**: Type Markdown in left editor pane
2. **Preview**: Real-time rendering in right preview pane
3. **Sync Scrolling**: Click sync scroll button in toolbar
4. **View Modes**: Switch between dual/editor/preview/fullscreen modes
5. **Export**: Click download or copy button to export as image

### Keyboard Shortcuts

| Shortcut | Action |
| -------- | ------ |
| `Ctrl/Cmd + S` | Save to local file (browser download) |
| `Ctrl/Cmd + F` | Search in editor |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `ESC` | Exit fullscreen mode |

### Supported Markdown Syntax

- **Headings**: `# H1` ~ `###### H6`
- **Bold**: `**bold**` or `__bold__`
- **Italic**: `*italic*` or `_italic_`
- **Strikethrough**: `~~strikethrough~~`
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Code**: Inline \`code\` or block \`\`\`code\`\`\`
- **Lists**: `- item` or `1. item`
- **Blockquotes**: `> quote`
- **Tables**: `| header | header |`
- **Task Lists**: `- [ ] task` or `- [x] done`
- **Horizontal Rule**: `---`

---

## 🌟 Roadmap

- [ ] **Theme Customization**: Custom editor and preview themes
- [ ] **Template Library**: Common Markdown templates (resume, blog, docs)
- [ ] **Cloud Sync**: Optional cloud save (encrypted)
- [ ] **Collaboration**: Real-time collaborative editing
- [ ] **Plugins**: Plugin system for extended functionality
- [ ] **Mobile App**: iOS/Android native apps
- [ ] **Export Formats**: PDF, Word, HTML export
- [ ] **Diagrams**: Mermaid diagram support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License

Copyright (c) 2024 ShareMD Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 Acknowledgments

- [CodeMirror](https://codemirror.net/) - Excellent code editor
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting platform
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting

---

## 📧 Contact

- **Website**: [sharemd.top](https://sharemd.top)
- **GitHub**: [chenqinyang1994/sharemd](https://github.com/chenqinyang1994/sharemd)
- **Issues**: [GitHub Issues](https://github.com/chenqinyang1994/sharemd/issues)

---

**Made with ❤️ by ShareMD Team**
