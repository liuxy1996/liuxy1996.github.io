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
    "Python 自习室是一个静态的 Python 学习站点：Next.js 静态导出、浏览器内 Pyodide 执行、无账号、无追踪，进度只保存在本机。",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "关于这个项目｜Python 自习室",
    description: "一个很小的项目，想认真陪你学完。",
    url: "/about/",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <header className="container about-hero">
        <span className="eyebrow">ABOUT / A SMALL PROJECT</span>
        <h1>
          一个很小的项目，
          <br />
          想认真陪你<em>学完。</em>
        </h1>
        <p>
          这里不是一所学校，也不是一个考试产品。它只是一份被重新编排过的 Python
          学习材料，加上一点让代码真的跑起来的工具。
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
            于是有了这间「自习室」：把第 1 到 16
            章重新组织成一条路线，把概念压缩到可以读完的长度，把代码保留成可以运行的样子。
            你不需要先配置环境，也不需要先决定要成为工程师。
          </p>
          <p>
            学习播客是另一条线索。不是把书念一遍，而是把某一章里最难解释的部分，
            换成适合散步、通勤和做家务时听的语言。音频会在准备好之后上线，
            目前先留下一篇发刊词。
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
            <h3>内容优先</h3>
            <p>
              {stats.chapters} 章、{stats.topics} 个知识点，约{" "}
              {totalReadingTime(stats.minutes)}。每一段示例都为解释概念服务。
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
            <h3>保持可维护</h3>
            <p>
              不依赖数据库，不依赖运行时服务器。静态站点可以长期存在，
              也方便你 fork 后改成自己的学习笔记。
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
          <Link className="button button-accent" href="/book/">
            翻开课程
            <ArrowRight />
          </Link>
          <Link className="button button-ghost" href="/playground/">
            直接运行代码
          </Link>
        </div>
      </section>
    </main>
  );
}
