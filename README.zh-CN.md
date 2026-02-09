# ShareMD - 现代化 Markdown 编辑器

<p align="center">
  <img src="src/assets/images/logo.webp" alt="ShareMD Logo" width="200" />
</p>

> 🚀 专为写作与分享而生的在线 Markdown 编辑器
>
> 支持实时预览 · 智能同步滚动 · 一键导出长图 · 多视图模式

**技术栈：** React 18.2 | TypeScript 5.2 | Vite 5.1 | CodeMirror 6 | 测试覆盖率 75%

[English Documentation](./README.md)

---

## 🌐 在线体验

🎉 **已部署到 Cloudflare Pages**，访问即用：

- 🌍 **主域名**: [sharemd.top](https://sharemd.top)
- 🌍 **备用域名**: [www.sharemd.top](https://www.sharemd.top)
- 🔗 **Pages域名**: [sharemd.pages.dev](https://sharemd.pages.dev)

✅ 全球CDN加速 · 自动HTTPS · Brotli压缩

---

## ✨ 核心特性

### 📝 专业编辑体验

- **CodeMirror 6 驱动**：行业顶级编辑器内核，支持语法高亮、自动补全、代码折叠
- **虚拟化渲染**：千行文档流畅编辑，性能优化到极致
- **自适应行高**：自动换行、智能缩进，让长文本编辑更舒适

### 👀 实时预览系统

- **GitHub Flavored Markdown**：完整支持 GFM 规范（表格、任务列表、删除线、自动链接等）
- **代码高亮**：基于 Highlight.js，覆盖 180+ 编程语言
- **即时渲染**：输入即预览，0 延迟，所见即所得

### 📜 智能双向滚动同步

- **比例同步算法**：编辑区与预览区按内容高度比例精准同步
- **防抖优化**：使用 `requestAnimationFrame` 确保滚动丝滑无卡顿
- **自由开关**：一键启用/禁用同步滚动，适配不同使用场景
- **回到顶部**：
  - 🔧 **CodeMirror 虚拟化兼容**：特别优化的动画算法，解决千行文档滚动到顶问题
  - ⚡ **指数衰减 + 最小步长**：快速且平滑，避免 Zeno 悖论

### 🖼️ 一键导出长图

- **高清渲染**：基于 html2canvas，支持 Retina 屏幕（2x DPI）
- **两种导出方式**：
  - 📥 **下载到本地**：PNG 格式，完整保留样式和代码高亮
  - 📋 **复制到剪贴板**：直接粘贴到微信、钉钉、飞书等聊天工具
- **智能加载**：鼠标悬停预加载 html2canvas 库，减少首屏体积
- **优雅提示**：玻璃拟态风格 Toast，成功/失败状态清晰反馈

### 🎨 多视图模式

| 模式 | 说明 | 快捷键提示 |
| ----------------- | -------------------- | ---------------- |
| 📝 **双栏模式** | 左编辑右预览（默认） | 支持拖拽调节宽度 |
| ⌨️ **纯编辑模式** | 全屏编辑，专注写作 | 100% 宽度 |
| 👁️ **纯预览模式** | 全屏预览，专注阅读 | 100% 宽度 |
| 🖥️ **全屏模式** | 沉浸式双栏模式 | 按 ESC 退出 |

### 🌐 多语言支持

- **English**：默认语言
- **中文**：完整中文本地化
- **一键切换**：顶部工具栏语言切换器
- **持久化设置**：语言偏好保存在 localStorage

---

## 🚀 快速开始

### 在线使用（推荐）

访问 [sharemd.top](https://sharemd.top)，立即开始写作 - 无需安装！

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/chenqinyang1994/sharemd.git
cd sharemd

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建
npm run preview
```

### 环境要求

- Node.js >= 16
- npm >= 8

---

## 🧪 测试

```bash
# 运行单元测试
npm test

# 运行测试覆盖率
npm run test:coverage

# 运行测试 UI
npm run test:ui
```

**测试覆盖率**: 75%+（Editor, Preview, Export, ViewMode 等）

---

## 📦 技术栈

### 核心框架

- **React 18.2**：组件化 UI 库
- **TypeScript 5.2**：类型安全开发
- **Vite 5.1**：极速构建工具

### 编辑器与渲染

- **CodeMirror 6**：现代代码编辑器
- **react-markdown**：Markdown 解析与渲染
- **remark-gfm**：GitHub Flavored Markdown 插件
- **rehype-highlight**：语法高亮插件
- **Highlight.js**：代码高亮库

### 工具库

- **html2canvas**：HTML 转 Canvas/图片
- **i18next**：国际化框架
- **react-i18next**：React i18n 绑定

### 开发与测试

- **Vitest**：快速单元测试框架
- **@testing-library/react**：React 组件测试工具
- **ESLint**：代码质量检查
- **TypeScript Compiler**：类型检查

---

## 🎯 项目亮点

### ✅ 生产级代码质量

- TypeScript 全覆盖，严格模式
- 75%+ 单元测试覆盖率
- ESLint 代码质量检查
- CI/CD 自动化部署

### ⚡ 性能优化

- CodeMirror 6 虚拟化渲染（支持万行文档）
- 同步滚动智能防抖
- html2canvas 动态导入（按需加载）
- Vite 构建优化（代码分割、Tree Shaking）
- Cloudflare CDN 全球加速

### 🎨 用户体验

- 响应式设计（桌面/平板/手机）
- 深色/浅色模式（跟随系统）
- 键盘快捷键（Ctrl+S 本地保存）
- 无障碍访问（ARIA 标签、语义化 HTML）
- 流畅动画过渡

### 🔒 安全与隐私

- 无后端，不收集数据
- 内容存储在浏览器本地
- HTTPS 加密
- 无第三方追踪

---

## 📖 使用指南

### 基本操作

1. **编写**：在左侧编辑器输入 Markdown
2. **预览**：右侧实时渲染预览
3. **同步滚动**：点击工具栏同步滚动按钮
4. **视图切换**：切换双栏/纯编辑/纯预览/全屏模式
5. **导出**：点击下载或复制按钮导出为图片

### 键盘快捷键

| 快捷键 | 操作 |
| -------- | ------ |
| `Ctrl/Cmd + S` | 保存到本地文件（浏览器下载） |
| `Ctrl/Cmd + F` | 编辑器内搜索 |
| `Ctrl/Cmd + Z` | 撤销 |
| `Ctrl/Cmd + Shift + Z` | 重做 |
| `ESC` | 退出全屏模式 |

### 支持的 Markdown 语法

- **标题**：`# H1` ~ `###### H6`
- **粗体**：`**粗体**` 或 `__粗体__`
- **斜体**：`*斜体*` 或 `_斜体_`
- **删除线**：`~~删除线~~`
- **链接**：`[文本](url)`
- **图片**：`![alt](url)`
- **代码**：行内 \`code\` 或代码块 \`\`\`code\`\`\`
- **列表**：`- item` 或 `1. item`
- **引用**：`> quote`
- **表格**：`| header | header |`
- **任务列表**：`- [ ] task` 或 `- [x] done`
- **分隔线**：`---`

---

## 🌟 路线图

- [ ] **主题定制**：自定义编辑器和预览主题
- [ ] **模板库**：常用 Markdown 模板（简历、博客、文档）
- [ ] **云端同步**：可选云端保存（加密）
- [ ] **协作编辑**：实时协作编辑功能
- [ ] **插件系统**：插件化扩展功能
- [ ] **移动应用**：iOS/Android 原生应用
- [ ] **导出格式**：PDF、Word、HTML 导出
- [ ] **图表支持**：Mermaid 图表支持

---

## 🤝 贡献

欢迎贡献、问题反馈和功能建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

MIT License

Copyright (c) 2024 ShareMD Team

特此授予任何获得本软件副本及相关文档文件（"软件"）的人免费许可，可不受限制地处理本软件，包括但不限于使用、复制、修改、合并、发布、分发、再许可和/或销售软件副本的权利，并允许获得软件的人这样做，但须符合以下条件：

上述版权声明和本许可声明应包含在软件的所有副本或重要部分中。

本软件按"原样"提供，不提供任何明示或暗示的保证，包括但不限于适销性、特定用途适用性和非侵权性保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任承担责任，无论是合同、侵权还是其他方面的行为，均不因软件或软件的使用或其他交易而引起、产生或与之相关。

---

## 🙏 致谢

- [CodeMirror](https://codemirror.net/) - 优秀的代码编辑器
- [React](https://react.dev/) - UI 库
- [Vite](https://vitejs.dev/) - 构建工具
- [Cloudflare Pages](https://pages.cloudflare.com/) - 托管平台
- [Highlight.js](https://highlightjs.org/) - 语法高亮

---

## 📧 联系方式

- **网站**：[sharemd.top](https://sharemd.top)
- **GitHub**：[chenqinyang1994/sharemd](https://github.com/chenqinyang1994/sharemd)
- **问题反馈**：[GitHub Issues](https://github.com/chenqinyang1994/sharemd/issues)

---

**Made with ❤️ by ShareMD Team**
