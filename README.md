# 自习室

> 一个静态的个人学习书库。

线上地址：<https://liuxy1996.github.io/>

自习室把正在学习的内容整理成可以阅读、可以运行、也可以长期维护的书目：

- **书库**：Python 完全学习手册、Rust 精简手册、On Java 8 导读已经上架；AI Agent、工程手记正在整理。
- **实验室**：AI 后端工程实验页，记录从 FastAPI 到可观测 Agent 服务的路线。
- **文章**：关于 AI、编程基本功、语言选择与学习方法的长期写作。
- **实验室**：AI 后端工程实验，按 FastAPI、LLM Gateway、RAG、Agent、生产化与 Capstone 推进；视觉/边缘与物理世界 Agent 排队中。
- **播客**：自习室电台，第一季策划中，前导文字稿已上线。
- **练习室**：Pyodide + Web Worker 在浏览器本地运行 Python；Rust / Java 可连接远程编译器运行。

Rust 手册按 Rust 官方书的核心路线整理，代码块可以在线编辑并运行。On Java 8 导读按 Bruce Eckel 原书目录整理成 24 章，覆盖对象、封装、复用、多态、集合、函数式、文件、泛型与并发；它是独立导读，不是原书全文转载。Java 8 已结束公开更新，新项目建议使用更新的 LTS 版本。

站点是纯静态的，没有登录与评论系统。阅读进度只保存在浏览器 `localStorage` 中。

## 技术栈

| 部分 | 实现 |
| --- | --- |
| 框架 | Next.js 16（App Router，`output: "export"`） |
| UI | React 19 + TypeScript + 手写 CSS |
| 字体 | Noto Serif SC Variable / Inter Variable，自托管 |
| 代码编辑器 | CodeMirror 6 |
| Python | Pyodide（CPython → WebAssembly），本地执行 |
| Rust | Rust Playground API，用户点击运行时发送代码 |
| Java | Judge0 CE（JDK 17），用户点击运行时发送代码 |
| 部署 | GitHub Pages（`main` 分支根目录） |

## 本地运行

要求 Node.js 20.9+（推荐 Node 22）。

```bash
npm install
npm run dev
```

打开 <http://localhost:3000>。

生产构建：

```bash
npm run build
npm run preview
```

`preview` 会在 <http://localhost:4173> 启动静态文件服务器，用来检查真正的 `out/` 产物。

## 部署

仓库的 GitHub Pages 从 **`main` 分支根目录**发布，因此根目录同时保存源码与编译后的静态站点。发布更新：

```bash
npm run build:pages
git add -A
git commit -m "Publish site update"
git push origin main
```

`build:pages` 构建后会把 `out/` 同步到仓库根目录。`.static-export-manifest.json` 记录上一版生成文件，发布脚本会用它清理旧产物。

GitHub Actions 只做构建检查，不执行部署，避免与分支发布竞争。

## 内容结构

- `content/chapters.json`：Python 手册的结构化章节内容。
- `content/rust.ts`：Rust 手册内容（10 章）。
- `content/java.ts`：On Java 8 导读内容（24 章，按原书目录整理）。
- `content/search-index.json`：Python 章节搜索索引。
- `content/posts.json`：文章，包含封面图与摘要。
- `content/podcast.ts`：播客节目与发刊词。
- `lib/library.ts`：书库书目与封面配置。
- `lib/language-books.ts`：Rust / On Java 8 书目类型与路由辅助。
- `lib/labs.ts`：实验室与六个 AI 后端实验的定义。
- `app/lab/page.tsx`：实验室入口。
- `app/lab/ai-backend/page.tsx`：AI 后端工程实验路线与启动示例。
- `scripts/generate-brand-assets.py`：生成分享图、图标和 sitemap；`LANGUAGE_BOOK_ROUTES` 需要与新书章节同步。
- `app/page.tsx`：书店式首页。
- `app/notes/page.tsx`：书库目录。
- `app/blog/`：文章列表与详情。
- `app/book/[slug]/page.tsx`：Python 章节阅读页。
- `app/book/rust/`：Rust 手册目录与章节页。
- `app/book/java/`：On Java 8 导读目录与章节页。
- `components/book-volume.tsx`：书目封面组件。
- `components/language-book-chapter.tsx`：Rust / On Java 8 通用章节阅读器。
- `components/python-workbench.tsx`：CodeMirror + Pyodide 执行工作台。
- `public/pyodide-worker.js`：加载 Pyodide、执行 Python 的 Web Worker。

### 添加文章

编辑 `content/posts.json`，添加文章对象：

```json
{
  "slug": "post-slug",
  "title": "标题",
  "subtitle": "副标题",
  "category": "分类",
  "date": "2026-11-12",
  "readMinutes": 5,
  "cover": "/images/journal.webp",
  "coverAlt": "封面图替代文本",
  "excerpt": "摘要",
  "sections": [
    {
      "heading": "小标题",
      "paragraphs": ["段落一", "段落二"],
      "quote": "可选的引用"
    }
  ],
  "takeaways": ["要点一", "要点二"]
}
```

### 添加播客音频

1. 把音频放到 `public/audio/`，例如 `public/audio/ep-01.mp3`。
2. 在 `content/podcast.ts` 对应条目设置 `audioSrc: "/audio/ep-01.mp3"`。
3. 更新 `status` 和时长。

页面会渲染原生音频播放器。RSS 尚未接入。

## 图片

站点摄影来自 [Unsplash](https://unsplash.com)，已下载到 `public/images/` 并统一处理为 WebP。重新生成图标、社交分享图和 sitemap：

```bash
python scripts/generate-brand-assets.py
```

## 说明

- Python 内容参考 [Python 官方中文教程](https://docs.python.org/zh-cn/3/tutorial/) 第 1–16 章，经过精简、重排与补充示例。原教程版权归 Python Software Foundation 所有（PSF License 2.0）。
- 站点没有自己的后端。Python 在浏览器中执行，因此不支持 `input()`、系统命令以及依赖原生扩展的第三方包。
- Rust / Java 的在线运行使用的是公开远程服务：Rust Playground 与 Judge0 CE。只有用户点击“在线运行”时，代码才会离开浏览器；不要向公开服务发送密钥、隐私或生产代码。服务可能限流或暂时不可用，页面会显示请求错误。
- Pyodide 资源在构建时从 `node_modules/pyodide` 复制到 `public/pyodide/`。
