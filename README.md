# ShareMD - Modern Online Markdown Editor

<div align="center">
  <img src="src/assets/images/logo.webp" alt="ShareMD Logo" width="120" height="120" />
  <h1>ShareMD</h1>
  <p>
    <strong>一个现代化、轻量级且功能强大的在线 Markdown 编辑器。</strong><br>
    支持实时预览、双向同步滚动、代码高亮以及一键生成精美长图。
  </p>

  <p>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://codemirror.net/">
      <img src="https://img.shields.io/badge/CodeMirror-6-black?logo=codemirror&logoColor=white" alt="CodeMirror" />
    </a>
  </p>
</div>

## ✨ 核心特性 (Features)

ShareMD 专注于提供流畅的写作体验和便捷的分享功能：

- **📝 专业级编辑器**：基于 CodeMirror 6 构建，支持语法高亮、自动补全和流畅的输入体验。
- **👀 实时预览**：所见即所得，支持 GitHub Flavored Markdown (GFM) 标准（表格、任务列表等）。
- **📜 双向同步滚动**：无论滚动编辑器还是预览区，另一侧都能精准同步，阅读体验极佳。
- **🖼️ 长图导出**：
  - **一键下载**：将 Markdown 内容渲染为高清长图（Retina 适配）并下载。
  - **复制到剪贴板**：直接将生成的长图复制到剪贴板，方便快速分享到微信、飞书等 IM 软件。
- **🎨 现代化 UI/UX**：
  - **多视图模式**：支持双栏、纯编辑、纯预览、沉浸式全屏模式。
  - **拖拽调节**：灵活的左右分栏宽度调节。
  - **精致细节**：深色玻璃拟态 (Glassmorphism) 提示框、SVG 动画图标、平滑过渡动画。
  - **骨架屏加载**：优化的首屏加载体验，拒绝布局跳变。
- **💻 开发者友好**：完全使用 TypeScript 编写，类型安全，代码结构清晰。

## 🛠️ 技术栈 (Tech Stack)

- **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 5](https://vitejs.dev/)
- **Editor**: [@codemirror](https://codemirror.net/) (v6)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown), [remark-gfm](https://github.com/remarkjs/remark-gfm), [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
- **Styles**: CSS Modules, PostCSS
- **Tools**: [html2canvas](https://html2canvas.hertzen.com/) (图片生成)

## 🚀 快速开始 (Getting Started)

### 环境要求

- Node.js >= 18.0.0
- npm 或 yarn / pnpm

### 安装

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/sharemd.git
   cd sharemd
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或者
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   访问 http://localhost:5173 即可开始开发。

4. **构建生产版本**
   ```bash
   npm run build
   ```

## 📂 项目结构 (Project Structure)

```text
sharemd/
├── src/
│   ├── assets/             # 静态资源 (图片, icons)
│   ├── components/         # UI 组件
│   │   ├── BackToTop/      # 回到顶部悬浮球
│   │   ├── Editor/         # CodeMirror 编辑器封装
│   │   ├── ExportToolbar/  # 导出/复制工具栏
│   │   ├── Message/        # 全局消息提示 (Toast)
│   │   ├── Preview/        # Markdown 渲染区
│   │   ├── ResizableDivider/ # 可拖拽分割线
│   │   └── ViewModeToggle/ # 视图模式切换器
│   ├── constants/          # 常量定义
│   ├── hooks/              # Custom Hooks
│   │   ├── useImageExport.ts # 长图生成与下载逻辑
│   │   ├── useSyncScroll.ts  # 双向滚动同步逻辑
│   │   └── useViewMode.ts    # 视图模式状态管理
│   ├── App.tsx             # 主应用入口
│   └── main.tsx            # 渲染入口
├── index.html              # 入口 HTML (包含 SEO & 骨架屏)
├── package.json
└── vite.config.ts
```

## 🤝 贡献 (Contributing)

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证 (License)

[MIT](LICENSE) © 2024 ShareMD Team
