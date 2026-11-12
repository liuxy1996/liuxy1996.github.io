import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github } from "@/components/icons";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "关于",
  description:
    "关于自习室：一个静态的个人学习书库，包含 Python、Rust 与 On Java 8 导读，以及 AI Agent、工程手记与声音栏目。",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "关于｜自习室",
    description: "一个静态的个人学习书库。",
    url: "/about/",
  },
};

const facts = [
  {
    label: "内容",
    text: "Python、Rust 与 On Java 8 导读已经上架；AI Agent 与工程手记正在整理。",
  },
  {
    label: "技术",
    text: "Next.js 静态导出；Python 在浏览器本地运行。Rust / Java 只有点击在线运行时才发送到外部编译器。",
  },
  {
    label: "账户",
    text: "没有登录和评论系统。阅读进度只保存在本机的 localStorage。",
  },
  {
    label: "影像",
    text: "站点摄影来自 Unsplash，颜色经过统一处理。",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-room">
      <header className="container about-room-head">
        <span className="library-kicker">ABOUT / THE STUDY ROOM</span>
        <h1>关于自习室</h1>
        <p>
          一个静态的个人学习书库。把正在学的语言、智能与工程整理成可以阅读、可以运行、
          也可以长期维护的页面。
        </p>
      </header>

      <section className="container about-room-body">
        <div className="about-room-text">
          <p>
            自习室从 Python 开始。现在书库里有三册可以读的手册：Python 16 章，
            Rust 10 章，以及按 Bruce Eckel《On Java 8》目录整理的中文导读 24 章。
          </p>
          <p>
            接下来是 AI Agent 和工程手记。每本书都围绕真实问题整理，写清楚它为什么成立、
            有哪些代价，以及下次怎样继续往前走。《On Java 8》是事实上的《Java 编程思想》
            第五版；本册是导读与练习，不替代原书。
          </p>
          <p>
            声音栏目是另一条线索：不追工具新闻，也不做成功学，只留下那些过一阵子仍然值得重听的问题。
          </p>
        </div>

        <aside className="about-room-facts">
          {facts.map((fact, index) => (
            <div key={fact.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{fact.label}</strong>
              <p>{fact.text}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="container about-room-links">
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          <Github />
          GitHub
          <ArrowUpRight />
        </a>
        <a href={site.docs} target="_blank" rel="noopener noreferrer">
          Python 官方教程
          <ArrowUpRight />
        </a>
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
          Photography
          <ArrowUpRight />
        </a>
        <Link href="/notes/">
          回到书库
          <ArrowUpRight />
        </Link>
      </section>
    </main>
  );
}
