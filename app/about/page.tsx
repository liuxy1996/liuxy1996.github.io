import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Headphones,
  Spark,
  Terminal,
} from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { site, stats, totalReadingTime } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "关于这个项目",
  description:
    "自习室是一个关于代码、智能与长期成长的个人学习博客：Python 手册、AI Agent 与 Rust 笔记、工程案例和播客。静态、无账号、无追踪。",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "关于这个项目｜自习室",
    description: "一个长期生长的项目，想认真陪你学下去。",
    url: "/about/",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <header className="container about-hero">
        <span className="eyebrow">ABOUT / A SMALL PROJECT</span>
        <h1>
          一个长期生长的项目，
          <br />
          想认真陪你<em>学下去。</em>
        </h1>
        <p>
          这里没有课程表，也不是一个考试产品。它是一间持续生长的自习室：
          有可以运行的教程，有写下来的思考，也会慢慢出现 AI、Rust、项目案例与一档播客。
        </p>
      </header>

      <section className="container about-story">
        <div className="about-story-aside">
          <span className="eyebrow">THE IDEA</span>
          <span className="about-note">缓慢、清晰、可以重复。</span>
        </div>
        <div className="about-story-body">
          <p>
            这个项目从一个很具体的问题开始：官方教程很完整，但第一次学 Python
            的人，往往不知道该怎样把那些章节串起来。读完了，却不知道自己到底会了什么。
          </p>
          <p>
            于是有了这间「自习室」：先把第 1 到 16
            章重新组织成一条路线，把概念压缩到可以读完的长度，把代码保留成可以运行的样子。
            但这不是终点。AI Agent、Rust、工程案例和在线简历会陆续加入，
            让这里从一本 Python 手册，长成一个真正属于自己的学习档案。
          </p>
          <p>
            博客用来记录判断，播客用来把判断讲给自己听。它们不追热点，也不制造「学完就能改变人生」的幻觉。
            更想留下的是：一个问题怎样被理解，一个选择为什么成立，以及我们怎样把普通的日子积累成能力。
          </p>
          <blockquote>
            先成为一个能读懂代码的人，再让工具替你加速。
          </blockquote>
        </div>
      </section>

      <section className="container about-principles">
        <SectionHeading
          eyebrow="PRINCIPLES"
          title="这个站点坚持的几件小事"
          description="不是功能越多越好，而是让每一次打开都更接近「学会」。"
        />
        <div className="principle-grid">
          <article>
            <span>01</span>
            <h3>理解优先</h3>
            <p>
              {stats.chapters} 章、{stats.topics} 个知识点，约{" "}
              {totalReadingTime(stats.minutes)}。每一段示例都为解释概念服务，
              而不是为了把页面填满。
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>本地优先</h3>
            <p>
              没有账户系统。阅读进度保存在浏览器的 localStorage
              里，代码在 Web Worker 中执行。我们不需要收集你是谁。
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>持续生长</h3>
            <p>
              从 Python 出发，下一站是 AI Agent、Rust 和真实案例。
              先有正在做的问题，再有新的笔记。
            </p>
          </article>
        </div>
      </section>

      <section className="container about-tech">
        <div className="about-tech-copy">
          <span className="eyebrow">UNDER THE HOOD</span>
          <h2>一个没有后端的「可运行」网站</h2>
          <p>
            Next.js 负责静态生成页面，Pyodide 把 CPython
            编译到浏览器里运行。你看到的执行结果，来自自己的电脑，而不是某台服务器。
          </p>
          <div className="tech-list">
            <div>
              <Terminal />
              <span>
                <strong>Frontend</strong>
                Next.js · React · TypeScript
              </span>
            </div>
            <div>
              <Spark />
              <span>
                <strong>Python runtime</strong>
                Pyodide · Web Worker
              </span>
            </div>
            <div>
              <Headphones />
              <span>
                <strong>Hosting</strong>
                GitHub Pages · GitHub Actions
              </span>
            </div>
          </div>
        </div>

        <div className="about-tech-card">
          <span className="eyebrow">OPEN SOURCE</span>
          <h3>源码就是内容本身。</h3>
          <p>
            仓库公开在 GitHub。你可以阅读实现、提出修改，或者把它变成自己的学习站。
          </p>
          <a
            className="button button-dark"
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            在 GitHub 查看
            <ArrowUpRight />
          </a>
          <div className="about-tech-note">
            <span>内容依据</span>
            <a href={site.docs} target="_blank" rel="noopener noreferrer">
              Python 官方中文教程
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="container about-cta">
        <p>如果这一切听起来还不坏，</p>
        <h2>那就从一页开始。</h2>
        <div>
          <Link className="button button-accent" href="/notes/">
            走进笔记库
            <ArrowRight />
          </Link>
          <Link className="button button-ghost" href="/blog/">
            读读最近的文章
          </Link>
        </div>
      </section>
    </main>
  );
}
