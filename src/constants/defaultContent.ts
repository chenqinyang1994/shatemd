// Default Markdown content in English
export const DEFAULT_MARKDOWN_EN = `# Welcome to ShareMD 🚀

**A modern, powerful online Markdown editor with real-time preview**

> Start writing immediately - No registration required, completely free!

---

## ✨ Core Features

### 📝 Professional Editor
- **CodeMirror 6** - Industry-leading editor core
- **Syntax Highlighting** - Clear and beautiful code display
- **Auto-completion** - Smart writing assistance
- **Line Wrapping** - Comfortable long text editing

### 👀 Real-time Preview
- **Instant Rendering** - See changes as you type
- **GitHub Flavored Markdown** - Full GFM support
- **Code Highlighting** - 180+ programming languages
- **Beautiful Styles** - GitHub-style rendering

### 🔄 Smart Sync Scrolling
- **Bidirectional Sync** - Editor and preview scroll together
- **Precise Positioning** - Proportional sync algorithm
- **Toggle On/Off** - Click the sync button in toolbar
- **Smooth Animation** - Optimized with requestAnimationFrame

### 🖼️ One-Click Export
- **Download as PNG** - High-quality image export (2x DPI)
- **Copy to Clipboard** - Paste directly to chat apps
- **Perfect Rendering** - Preserves all styles and code highlighting

### 🎨 Multiple View Modes
- **Dual Pane** - Editor + Preview (default)
- **Editor Only** - Focus on writing
- **Preview Only** - Focus on reading
- **Fullscreen** - Immersive mode (Press ESC to exit)

### 🌐 Multilingual
- **English** - Default language
- **中文** - Full Chinese localization
- **One-Click Switch** - Language switcher in toolbar

---

## 📖 Markdown Syntax Guide

### Headings

\`\`\`markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
\`\`\`

### Text Formatting

**Bold** - \`**Bold**\` or \`__Bold__\`

*Italic* - \`*Italic*\` or \`_Italic_\`

***Bold Italic*** - \`***Bold Italic***\`

~~Strikethrough~~ - \`~~Strikethrough~~\`

### Links & Images

[ShareMD Website](https://sharemd.top) - \`[Text](URL)\`

![ShareMD Logo](/logo.webp) - \`![Alt](URL)\`

### Lists

**Unordered List:**
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

**Ordered List:**
1. First item
2. Second item
3. Third item

**Task List:**
- [x] Completed task
- [ ] Pending task
- [ ] Another task

### Blockquotes

> This is a blockquote
>
> It can span multiple lines
>
> > Nested blockquote

### Code

Inline code: \`const greeting = 'Hello';\`

**Code Block:**

\`\`\`javascript
// JavaScript example
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('ShareMD');
\`\`\`

\`\`\`python
# Python example
def greet(name):
    print(f"Hello, {name}!")

greet("ShareMD")
\`\`\`

\`\`\`typescript
// TypeScript example
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'ShareMD',
  age: 1
};
\`\`\`

### Tables

| Feature | Status | Description |
|---------|--------|-------------|
| Editor | ✅ Ready | CodeMirror 6 powered |
| Preview | ✅ Ready | Real-time rendering |
| Export | ✅ Ready | Download or copy image |
| Sync Scroll | ✅ Ready | Bidirectional scrolling |
| Multilingual | ✅ Ready | English & 中文 |

### Horizontal Rule

Use \`---\` or \`***\` to create a horizontal line:

---

### Emoji 😊

You can use emoji directly: 🎉 🚀 ✨ 💡 📝 👍

---

## 🎯 Quick Start Guide

### 1️⃣ Start Writing
Click on the left editor panel and start typing your Markdown content.

### 2️⃣ Real-time Preview
See your content rendered beautifully in the right preview panel.

### 3️⃣ Sync Scrolling
Click the sync button (🔄) in the toolbar to enable/disable synchronized scrolling.

### 4️⃣ Switch View Mode
Use the view mode buttons in the toolbar:
- 📝 Dual pane (default)
- ⌨️ Editor only
- 👁️ Preview only
- 🖥️ Fullscreen

### 5️⃣ Export as Image
- Click **"Download Image"** to save as PNG file
- Click **"Copy to Clipboard"** to paste in other apps

### 6️⃣ Change Language
Click the language switcher (🌐) to toggle between English and 中文.

---

## 💡 Pro Tips

### Keyboard Shortcuts
- \`Ctrl/Cmd + S\` - Save to local file
- \`Ctrl/Cmd + F\` - Search in editor
- \`Ctrl/Cmd + Z\` - Undo
- \`Ctrl/Cmd + Shift + Z\` - Redo
- \`ESC\` - Exit fullscreen mode

### Performance
- ✅ Handles **10,000+ line** documents smoothly
- ✅ Virtualized rendering for optimal performance
- ✅ Smart debouncing for sync scrolling
- ✅ Lazy loading for image export library

### Privacy & Security
- ✅ **No backend** - All processing in your browser
- ✅ **No data collection** - Your content stays private
- ✅ **HTTPS encryption** - Secure connection
- ✅ **No registration** - Use immediately

---

## 🌟 Advanced Features

### Code Syntax Highlighting

ShareMD supports **180+ programming languages**:

**JavaScript/TypeScript:**
\`\`\`javascript
const app = {
  name: 'ShareMD',
  version: '1.0.0',
  features: ['editor', 'preview', 'export']
};
\`\`\`

**HTML/CSS:**
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>ShareMD</title>
</head>
<body>
  <h1>Hello, Markdown!</h1>
</body>
</html>
\`\`\`

**SQL:**
\`\`\`sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
\`\`\`

### GitHub Flavored Markdown (GFM)

**Automatic URL Linking:**
https://sharemd.top

**Strikethrough:**
~~This text is deleted~~

**Task Lists:**
- [x] Design UI
- [x] Implement editor
- [x] Add export feature
- [ ] Mobile app

**Tables with Alignment:**

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |

---

## 📚 Use Cases

### 1. **Technical Documentation**
Write clear, well-formatted technical docs with code examples.

### 2. **Blog Posts**
Draft and preview blog articles before publishing.

### 3. **README Files**
Create beautiful README files for GitHub projects.

### 4. **Meeting Notes**
Take structured notes with lists, tables, and highlights.

### 5. **Study Notes**
Organize learning materials with headings and code snippets.

### 6. **Presentations**
Export content as images for slides or social media.

---

## 🎨 Best Practices

### Document Structure
1. Start with a clear **H1 heading**
2. Use **H2** for main sections
3. Use **H3** for sub-sections
4. Add **horizontal rules** to separate major parts

### Readability
- Use **lists** for enumeration
- Use **tables** for data comparison
- Use **blockquotes** for important notes
- Use **code blocks** for technical content

### Styling
- **Bold** for emphasis
- *Italic* for subtle emphasis
- \`Code\` for technical terms
- [Links] for references

---

## 🔗 Resources

### Official Links
- **Website:** [sharemd.top](https://sharemd.top)
- **GitHub:** [github.com/chenqinyang1994/sharemd](https://github.com/chenqinyang1994/sharemd)
- **Documentation:** [English](README.md) | [中文](README.zh-CN.md)

### Learn Markdown
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [CommonMark Spec](https://commonmark.org/)

### Keyboard Shortcuts Reference

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Save | Ctrl + S | Cmd + S |
| Search | Ctrl + F | Cmd + F |
| Undo | Ctrl + Z | Cmd + Z |
| Redo | Ctrl + Shift + Z | Cmd + Shift + Z |

---

## 💬 Feedback & Support

Have questions or suggestions?

- **GitHub Issues:** [Report bugs or request features](https://github.com/chenqinyang1994/sharemd/issues)
- **Email:** Contact via GitHub profile

---

## 📝 Start Creating!

**Delete this content and start writing your own Markdown!**

**Tips:**
- Use the toolbar buttons to switch view modes
- Enable sync scrolling for better navigation
- Export your content as an image when done
- Switch language anytime with the 🌐 button

---

**Made with ❤️ by ShareMD Team**

**Version 1.0.0** | **Last updated:** 2026-02-09
`;

// Default Markdown content in Chinese
export const DEFAULT_MARKDOWN_ZH = `# 欢迎使用 ShareMD 🚀

**现代化、功能强大的在线 Markdown 编辑器，支持实时预览**

> 立即开始写作 - 无需注册，完全免费！

---

## ✨ 核心功能

### 📝 专业编辑器
- **CodeMirror 6** - 行业领先的编辑器内核
- **语法高亮** - 清晰美观的代码展示
- **自动补全** - 智能写作辅助
- **自动换行** - 舒适的长文本编辑

### 👀 实时预览
- **即时渲染** - 所见即所得
- **GitHub Flavored Markdown** - 完整 GFM 支持
- **代码高亮** - 支持 180+ 编程语言
- **精美样式** - GitHub 风格渲染

### 🔄 智能同步滚动
- **双向同步** - 编辑区与预览区同步滚动
- **精准定位** - 比例同步算法
- **自由开关** - 点击工具栏同步按钮
- **流畅动画** - requestAnimationFrame 优化

### 🖼️ 一键导出
- **下载为 PNG** - 高清图片导出（2x DPI）
- **复制到剪贴板** - 直接粘贴到聊天工具
- **完美渲染** - 保留所有样式和代码高亮

### 🎨 多视图模式
- **双栏模式** - 编辑 + 预览（默认）
- **纯编辑模式** - 专注写作
- **纯预览模式** - 专注阅读
- **全屏模式** - 沉浸式体验（按 ESC 退出）

### 🌐 多语言支持
- **English** - 默认语言
- **中文** - 完整中文本地化
- **一键切换** - 工具栏语言切换器

---

## 📖 Markdown 语法指南

### 标题

\`\`\`markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
\`\`\`

### 文本格式

**粗体** - \`**粗体**\` 或 \`__粗体__\`

*斜体* - \`*斜体*\` 或 \`_斜体_\`

***粗斜体*** - \`***粗斜体***\`

~~删除线~~ - \`~~删除线~~\`

### 链接和图片

[ShareMD 网站](https://sharemd.top) - \`[文本](URL)\`

![ShareMD Logo](/logo.webp) - \`![替代文本](URL)\`

### 列表

**无序列表：**
- 项目 1
- 项目 2
  - 嵌套项目 2.1
  - 嵌套项目 2.2
- 项目 3

**有序列表：**
1. 第一项
2. 第二项
3. 第三项

**任务列表：**
- [x] 已完成任务
- [ ] 待办任务
- [ ] 另一个任务

### 引用

> 这是一个引用
>
> 可以跨越多行
>
> > 嵌套引用

### 代码

行内代码：\`const greeting = 'Hello';\`

**代码块：**

\`\`\`javascript
// JavaScript 示例
function greet(name) {
  console.log(\`你好，\${name}！\`);
}

greet('ShareMD');
\`\`\`

\`\`\`python
# Python 示例
def greet(name):
    print(f"你好，{name}！")

greet("ShareMD")
\`\`\`

\`\`\`typescript
// TypeScript 示例
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'ShareMD',
  age: 1
};
\`\`\`

### 表格

| 功能 | 状态 | 说明 |
|------|------|------|
| 编辑器 | ✅ 就绪 | CodeMirror 6 驱动 |
| 预览 | ✅ 就绪 | 实时渲染 |
| 导出 | ✅ 就绪 | 下载或复制图片 |
| 同步滚动 | ✅ 就绪 | 双向滚动 |
| 多语言 | ✅ 就绪 | English & 中文 |

### 分隔线

使用 \`---\` 或 \`***\` 创建分隔线：

---

### Emoji 😊

可以直接使用 emoji：🎉 🚀 ✨ 💡 📝 👍

---

## 🎯 快速入门指南

### 1️⃣ 开始写作
点击左侧编辑器面板，开始输入你的 Markdown 内容。

### 2️⃣ 实时预览
在右侧预览面板看到内容的精美渲染效果。

### 3️⃣ 同步滚动
点击工具栏的同步按钮（🔄）来启用/禁用同步滚动。

### 4️⃣ 切换视图模式
使用工具栏的视图模式按钮：
- 📝 双栏模式（默认）
- ⌨️ 纯编辑模式
- 👁️ 纯预览模式
- 🖥️ 全屏模式

### 5️⃣ 导出为图片
- 点击**"下载图片"**保存为 PNG 文件
- 点击**"复制到剪贴板"**粘贴到其他应用

### 6️⃣ 切换语言
点击语言切换器（🌐）在 English 和中文之间切换。

---

## 💡 专业技巧

### 键盘快捷键
- \`Ctrl/Cmd + S\` - 保存到本地文件
- \`Ctrl/Cmd + F\` - 编辑器内搜索
- \`Ctrl/Cmd + Z\` - 撤销
- \`Ctrl/Cmd + Shift + Z\` - 重做
- \`ESC\` - 退出全屏模式

### 性能特性
- ✅ 流畅处理**万行以上**文档
- ✅ 虚拟化渲染，性能优化
- ✅ 智能防抖同步滚动
- ✅ 图片导出库按需加载

### 隐私与安全
- ✅ **无后端** - 所有处理在浏览器中完成
- ✅ **不收集数据** - 你的内容完全私密
- ✅ **HTTPS 加密** - 安全连接
- ✅ **无需注册** - 立即使用

---

## 🌟 高级功能

### 代码语法高亮

ShareMD 支持 **180+ 编程语言**：

**JavaScript/TypeScript：**
\`\`\`javascript
const app = {
  name: 'ShareMD',
  version: '1.0.0',
  features: ['editor', 'preview', 'export']
};
\`\`\`

**HTML/CSS：**
\`\`\`html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>ShareMD</title>
</head>
<body>
  <h1>你好，Markdown！</h1>
</body>
</html>
\`\`\`

**SQL：**
\`\`\`sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
\`\`\`

### GitHub Flavored Markdown (GFM)

**自动 URL 链接：**
https://sharemd.top

**删除线：**
~~这段文字被删除了~~

**任务列表：**
- [x] 设计 UI
- [x] 实现编辑器
- [x] 添加导出功能
- [ ] 移动应用

**表格对齐：**

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 左 | 中 | 右 |
| 文本 | 文本 | 文本 |

---

## 📚 使用场景

### 1. **技术文档**
编写清晰、格式良好的技术文档和代码示例。

### 2. **博客文章**
在发布前草拟和预览博客文章。

### 3. **README 文件**
为 GitHub 项目创建精美的 README 文件。

### 4. **会议记录**
使用列表、表格和高亮记录结构化笔记。

### 5. **学习笔记**
用标题和代码片段整理学习材料。

### 6. **演示文稿**
将内容导出为图片用于幻灯片或社交媒体。

---

## 🎨 最佳实践

### 文档结构
1. 以清晰的**一级标题**开始
2. 使用**二级标题**表示主要章节
3. 使用**三级标题**表示子章节
4. 添加**分隔线**分隔主要部分

### 可读性
- 使用**列表**进行枚举
- 使用**表格**进行数据对比
- 使用**引用**标注重要信息
- 使用**代码块**展示技术内容

### 样式
- **粗体**用于强调
- *斜体*用于微妙强调
- \`代码\`用于技术术语
- [链接]用于引用

---

## 🔗 资源

### 官方链接
- **网站：** [sharemd.top](https://sharemd.top)
- **GitHub：** [github.com/chenqinyang1994/sharemd](https://github.com/chenqinyang1994/sharemd)
- **文档：** [English](README.md) | [中文](README.zh-CN.md)

### 学习 Markdown
- [Markdown 指南](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [CommonMark 规范](https://commonmark.org/)

### 快捷键参考

| 操作 | Windows/Linux | macOS |
|------|---------------|-------|
| 保存 | Ctrl + S | Cmd + S |
| 搜索 | Ctrl + F | Cmd + F |
| 撤销 | Ctrl + Z | Cmd + Z |
| 重做 | Ctrl + Shift + Z | Cmd + Shift + Z |

---

## 💬 反馈与支持

有问题或建议？

- **GitHub Issues：** [报告问题或请求功能](https://github.com/chenqinyang1994/sharemd/issues)
- **邮箱：** 通过 GitHub 个人资料联系

---

## 📝 开始创作！

**删除这些内容，开始编写你自己的 Markdown！**

**提示：**
- 使用工具栏按钮切换视图模式
- 启用同步滚动以便更好地导航
- 完成后将内容导出为图片
- 随时使用 🌐 按钮切换语言

---

**Made with ❤️ by ShareMD Team**

**版本 1.0.0** | **最后更新：** 2026-02-09
`;

// Export default based on browser language or saved preference
export const DEFAULT_MARKDOWN = DEFAULT_MARKDOWN_EN;
