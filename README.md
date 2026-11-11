# 自习室

> 技术、思想与长期成长。

自习室是一个零后端的个人学习博客：可以运行的 Python 手册、正在生长的 AI Agent 与 Rust 笔记、工程项目与在线简历，以及一档关于技术、选择与长期成长的声音杂志。站点使用 Next.js 静态导出，部署在 GitHub Pages。

线上地址：<https://liuxy1996.github.io/>

## 内容

- **笔记**：16 章 Python 学习手册，59 个知识点，50 段可运行代码；AI Agent、Rust、工程案例与在线简历正在整理。
- **博客**：关于 AI、编程基本功、语言选择与学习方法的文章。
- **播客**：自习室电台，第一季正在策划；发刊词文字稿已经上线。
- **练习场**：基于 Pyodide + Web Worker，在浏览器本地运行 Python。
- **阅读体验**：章节目录、进度标记、全文搜索、深浅色主题和移动端适配。
- **无账号、无追踪**：学习进度只保存在 `localStorage`。

## 技术栈

| 部分 | 实现 |
| --- | --- |
| 框架 | Next.js 16（App Router，`output: "export"`） |
| UI | React 19 + TypeScript + 手写 CSS |
| 代码编辑器 | CodeMirror 6 |
| Python | Pyodide（CPython → WebAssembly） |
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

这个仓库的 GitHub Pages 从 **`main` 分支根目录**发布。因此仓库根目录同时保存：

- Next.js 源码：`app/`、`components/`、`content/` 等
- 编译后的静态站点：`index.html`、`_next/`、`book/`、`blog/`、`pyodide/` 等

发布新版本时运行：

```bash
npm run build:pages
git add -A
git commit -m "Publish site update"
git push origin main
```

`build:pages` 会先构建，再把 `out/` 里的文件同步到仓库根目录。生成文件不要直接手改；修改内容请改源码后重新发布。`.static-export-manifest.json` 记录上一版生成文件，发布脚本会用它清理旧产物。

仓库中的 GitHub Actions 只做构建检查，不执行部署，避免与分支发布竞争。

### 静态导出的 RSC 路径

Next 16 某些版本会把预取的 RSC 数据写到 `__next.book/__PAGE__.txt`，而浏览器会请求 `__next.book.__PAGE__.txt`。构建脚本 `scripts/fix-static-rsc.mjs` 会在 `next build` 后生成扁平路径副本，避免静态托管上的预取 404。

## 内容结构

- `content/chapters.json`：Python 手册的 16 章结构化内容。
- `content/search-index.json`：章节搜索索引。
- `content/posts.json`：博客文章。
- `content/podcast.ts`：播客节目与发刊词。
- `app/notes/page.tsx`：学习笔记入口。
- `app/blog/`：博客文章列表和详情页。
- `app/book/[slug]/page.tsx`：章节阅读页。
- `components/python-workbench.tsx`：CodeMirror + Pyodide 执行工作台。
- `public/pyodide-worker.js`：加载 Pyodide、执行 Python 的 Web Worker。
- `scripts/import_guide.py`：从早期单页 HTML 指南重新导入 Python 章节。

### 添加博客文章

编辑 `content/posts.json`，添加新的文章对象：

```json
{
  "slug": "post-slug",
  "title": "标题",
  "subtitle": "摘要标题",
  "category": "分类",
  "date": "2026-11-11",
  "readMinutes": 5,
  "excerpt": "首页与列表中的摘要",
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

然后运行 `npm run build:pages` 并提交。

### 添加一期播客

1. 把音频放到 `public/audio/`，例如 `public/audio/ep-01.mp3`。
2. 编辑 `content/podcast.ts`，为对应条目设置 `audioSrc: "/audio/ep-01.mp3"`。
3. 把 `status` 改为 `录制中` 或 `即将上线`。

页面会自动显示原生音频播放器。当前 RSS 订阅入口保持关闭，等第一期音频准备好后再接入播客 RSS（每期需要一个可公开访问的 MP3 enclosure URL）。如果把音频放到对象存储或播客平台，把对应的公开 URL 填到 `audioSrc` 即可。

## 说明

- Python 内容参考 [Python 官方中文教程](https://docs.python.org/zh-cn/3/tutorial/) 第 1–16 章，经过精简、重排和补充示例。原教程版权归 Python Software Foundation 所有（PSF License 2.0）。
- 站点没有后端。Python 在浏览器中执行，因此不支持 `input()`、系统命令以及所有依赖原生扩展的第三方包。
- 生成环境会从 `node_modules/pyodide` 复制运行时资源到 `public/pyodide/`；该目录不提交到 Git，构建时自动生成。
