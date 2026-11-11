import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Headphones,
  Spark,
  Terminal,
} from "@/components/icons";
import {
  chapters,
  stats,
  totalReadingTime,
} from "@/lib/chapters";

export const metadata: Metadata = {
  title: "笔记",
  description:
    "自习室的知识库：已经上线的 Python 完整学习手册，以及正在筹备的 AI Agent、Rust、工程案例与在线简历内容。",
  alternates: { canonical: "/notes/" },
  openGraph: {
    title: "笔记｜自习室",
    description: "会持续生长的学习笔记：Python、AI Agent、Rust 与工程实践。",
    url: "/notes/",
  },
};

const tracks = [
  {
    id: "python",
    index: "01",
    label: "PYTHON / AVAILABLE",
    title: "Python 完全学习手册",
    lead: "16 章从解释器到标准库，配 50 段可运行代码。用来建立第一套完整的 Python 心智模型。",
    topics: ["基础语法", "数据结构", "异常与类", "标准库"],
    meta: `${stats.chapters} 章 · ${stats.topics} 个知识点 · 约 ${totalReadingTime(
      stats.minutes,
    )}`,
    href: "/book/",
    tone: "green",
    status: "已上线",
  },
  {
    id: "agent",
    index: "02",
    label: "AI AGENT / IN PROGRESS",
    title: "AI Agent 应用笔记",
    lead: "从会调用模型，到做一个可靠的应用：上下文、工具、状态、评测与边界。",
    topics: ["上下文工程", "工具调用", "Agent 评测", "记忆与状态"],
    meta: "选题整理中 · 持续更新",
    href: null,
    tone: "blue",
    status: "筹备中",
  },
  {
    id: "rust",
    index: "03",
    label: "RUST / IN PROGRESS",
    title: "Rust 系统编程笔记",
    lead: "不从语法表开始，而从所有权、错误处理和并发边界出发，重新理解系统。",
    topics: ["所有权", "类型系统", "异步", "命令行项目"],
    meta: "选题整理中 · 持续更新",
    href: null,
    tone: "orange",
    status: "筹备中",
  },
  {
    id: "work",
    index: "04",
    label: "WORK / SOON",
    title: "工程案例与在线简历",
    lead: "真实项目的设计过程、取舍与复盘，也会成为一份可以点开看的在线简历。",
    topics: ["案例分析", "架构取舍", "项目复盘", "个人简历"],
    meta: "案例收集中",
    href: null,
    tone: "purple",
    status: "筹备中",
  },
];

export default function NotesPage() {
  return (
    <main id="main-content" className="notes-page">
      <header className="container notes-hero">
        <div>
          <span className="eyebrow">NOTES / A GROWING LIBRARY</span>
          <h1>
            <span>笔记，是理解</span>
            <span>
              留下的<em>形状。</em>
            </span>
          </h1>
          <p>
            这里会持续生长：一份完整的 Python 手册，接下来还有 AI Agent、Rust、
            工程案例和更个人的项目记录。先写到能运行，再写到能讲清楚。
          </p>
          <div className="notes-hero-meta">
            <span>
              <BookOpen />
              {chapters.length} 章已经上线
            </span>
            <span>
              <Terminal />
              {stats.pythonBlocks} 段可运行示例
            </span>
            <span>
              <Spark />
              下一组笔记正在整理
            </span>
          </div>
        </div>
        <div className="notes-hero-aside">
          <span className="eyebrow">THE IDEA</span>
          <p>
            笔记不是资料的复制，而是把一个模糊的问题，变成下次还能继续往前走的地方。
          </p>
          <div className="notes-hero-quote">
            <span />
            <strong>把知识写得可以重来。</strong>
          </div>
        </div>
      </header>

      <section className="container notes-tracks" aria-label="笔记专题">
        {tracks.map((track) => {
          const content = (
            <>
              <div className="note-track-side">
                <span className="note-track-index">{track.index}</span>
                <span className="note-track-status">{track.status}</span>
              </div>
              <div className="note-track-main">
                <span className="eyebrow">{track.label}</span>
                <h2>{track.title}</h2>
                <p>{track.lead}</p>
                <div className="note-track-topics">
                  {track.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>
                <div className="note-track-foot">
                  <span>{track.meta}</span>
                  {track.href ? (
                    <span className="note-track-link">
                      进入专题 <ArrowRight />
                    </span>
                  ) : (
                    <span className="note-track-soon">还没有开门</span>
                  )}
                </div>
              </div>
            </>
          );

          return track.href ? (
            <Link
              className={`note-track is-live part-tone-${track.tone}`}
              href={track.href}
              key={track.id}
            >
              {content}
            </Link>
          ) : (
            <article
              className={`note-track is-planned part-tone-${track.tone}`}
              key={track.id}
            >
              {content}
            </article>
          );
        })}
      </section>

      <section className="container notes-outro">
        <div>
          <span className="eyebrow">HOW THIS PLACE GROWS</span>
          <h2>
            先有真实的问题，
            <br />
            再有新的笔记。
          </h2>
          <p>
            每份专题都从正在做的事里长出来。写完一个 Agent、一个 Rust 工具或一个真实案例，
            就把过程中的判断留下来，而不是只留下结果。
          </p>
        </div>
        <div className="notes-outro-links">
          <Link className="button button-dark" href="/book/">
            打开 Python 手册
            <ArrowRight />
          </Link>
          <Link className="text-link" href="/blog/">
            读几篇文章
            <ArrowRight />
          </Link>
          <Link className="text-link" href="/podcast/">
            听自习室电台
            <Headphones />
          </Link>
        </div>
      </section>
    </main>
  );
}
