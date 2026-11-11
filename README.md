# Python 自习室

> 一本可以运行的书，一档陪你理解编程的播客。

Python 自习室是一个零后端的 Python 学习站：16 章精简课程、浏览器内代码执行、阅读进度保存和播客栏目框架。站点通过 Next.js 静态导出，部署在 GitHub Pages。

线上地址：<https://liuxy1996.github.io/>

## 功能

- **16 章、59 个知识点**：从解释器、数字、字符串和列表，一直覆盖到模块、异常、类、标准库与虚拟环境。
- **浏览器内 Python**：基于 Pyodide 0.28.3 + Web Worker，不请求后端即可运行代码。首次加载运行时约 10 MB，之后会从浏览器缓存读取。
- **阅读理解体验**：章节目录、当前小节高亮、上一章/下一章、完成标记、阅读进度、深浅色主题。
- **全文搜索**：完全在浏览器中检索 59 个知识点。
- **Podcast 框架**：节目列表、发刊词、单集元数据和音频播放器都已准备好；音频上线后即可使用。
- **无账号、无追踪**：学习进度只保存在 `localStorage`。

## 技术栈

| 部分 | 实现 |
| --- | --- |
| 框架 | Next.js 16（App Router，`output: "export"`） |
| UI | React 19 + TypeScript + 手写 CSS |
| 代码编辑器 | CodeMirror 6 |
| Python | Pyodide（CPython → WebAssembly） |
| 部署 | GitHub Actions → GitHub Pages |

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

`preview` 会在 <http://localhost:4173> 启动一个静态文件服务器，用来检查真正部署的 `out/` 产物。

## 部署

推送到 `main` 后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会：

1. 安装依赖
2. 执行 `npm run build`
3. 上传 `out/` 到 Pages artifact
4. 通过 GitHub Pages 部署

工作流会先用 `GITHUB_TOKEN` 尝试把 Pages 的构建类型切换为 `workflow`。如果仓库策略阻止这一步，需要在 **Settings → Pages → Build and deployment → Source** 手动选择 **GitHub Actions**。

站点部署在 `<username>.github.io` 根路径，因此 `next.config.ts` 中不需要 `basePath`。如果以后迁移到项目页（`<username>.github.io/repo/`），要同时配置 `basePath` 并调整静态资源路径。

### 静态导出的 RSC 路径

Next 16 某些版本会把预取的 RSC 数据写到 `__next.book/__PAGE__.txt`，而浏览器会请求 `__next.book.__PAGE__.txt`。构建脚本 `scripts/fix-static-rsc.mjs` 会在 `next build` 后生成扁平路径副本，避免静态托管上的预取 404。

## 内容结构

- `content/chapters.json`：16 章的结构化内容。每个 topic 包含 HTML 段落和代码块。
- `content/search-index.json`：由章节内容生成的本地搜索索引。
- `content/podcast.ts`：播客节目信息与发刊词。
- `app/book/[slug]/page.tsx`：章节阅读页。
- `components/code-block.tsx`：可复制 / 可运行的代码块。
- `components/python-workbench.tsx`：CodeMirror + Pyodide 执行工作台。
- `public/pyodide-worker.js`：加载 Pyodide 并执行 Python 的 Web Worker。
- `scripts/import_guide.py`：从早期单页 HTML 指南重新导入章节数据。

### 修改章节内容

通常情况下，直接编辑 `content/chapters.json` 即可。也可以准备一份同样结构的源 HTML，然后运行：

```bash
python scripts/import_guide.py path/to/source.html
```

注意：源指南文件不在本仓库内，生成结果已经提交到仓库。

### 添加一期播客

1. 把音频放到 `public/audio/`，例如 `public/audio/ep-01.mp3`。
2. 编辑 `content/podcast.ts`，为对应条目设置 `audioSrc: "/audio/ep-01.mp3"`。
3. 将 `status` 改为 `录制中` 或 `已上线`。

页面会自动显示原生音频播放器。当前 RSS 订阅入口保持关闭，等第一期音频准备好后再接入播客 RSS（每期需要一个可公开访问的 MP3 enclosure URL）。如果把音频放到对象存储或播客平台，把对应的公开 URL 填到 `audioSrc` 即可。

## 说明

- 学习内容参考 [Python 官方中文教程](https://docs.python.org/zh-cn/3/tutorial/) 第 1–16 章，经过精简、重排和补充示例。它不是官方教程的替代品。
- 站点没有后端。Python 在浏览器中执行，因此不支持 `input()`、系统命令以及所有依赖原生扩展的第三方包。
- 生成环境会从 `node_modules/pyodide` 复制运行时资源到 `public/pyodide/`；该目录不提交到 Git，构建时自动生成。
