import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Spark,
  Terminal,
} from "@/components/icons";
import { BookProgressSummary } from "@/components/book-progress";
import { SectionHeading } from "@/components/section-heading";
import {
  chapters,
  parts,
  partRoman,
  partTone,
  stats,
  totalReadingTime,
} from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Python 手册",
  description:
    "自习室的 Python 手册：16 章，从解释器、数字和字符串，到模块、异常、类、标准库与虚拟环境。",
  alternates: { canonical: "/book/" },
  openGraph: {
    title: "Python 手册｜自习室",
    description:
      "16 章、59 个知识点，一本可以运行代码的 Python 书。",
    url: "/book/",
  },
};

export default function BookIndexPage() {
  return (
    <main id="main-content">
      <header className="book-index-hero">
        <div className="container book-index-hero-grid">
          <div>
            <span className="eyebrow">PYTHON / THE FIRST BOOK</span>
            <h1>
              不追进度，
              <br />
              追<em>理解。</em>
            </h1>
            <p className="book-index-lede">
              这不是官方文档的搬家，而是一条重新排过序的学习路线。
              每一章保留真正重要的概念，每一段代码都可以打开、修改、运行。
              它也是整间自习室里的第一本手册。
            </p>
            <div className="book-index-meta">
              <span>
                <BookOpen />
                {stats.chapters} 章
              </span>
              <span>
                <Clock />
                共约 {totalReadingTime(stats.minutes)}
              </span>
              <span>
                <Terminal />
                {stats.pythonBlocks} 段可运行代码
              </span>
            </div>
          </div>

          <div className="book-index-aside">
            <BookProgressSummary />
            <div className="book-index-tip">
              <Spark />
              <p>
                建议按顺序读。第 1–3 章是地基，第 4 章之后就可以按兴趣跳读。
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container curriculum-full" aria-label="全部章节">
        {parts.map((part, partIndex) => {
          const partChapters = chapters.filter(
            (chapter) => chapter.partId === part.id,
          );
          return (
            <section
              className={`curriculum-part part-tone-${partTone[part.id]}`}
              key={part.id}
              aria-labelledby={`part-${part.id}`}
            >
              <header className="curriculum-part-head">
                <span className="curriculum-part-roman">
                  {partRoman[part.id]}
                </span>
                <div>
                  <span className="eyebrow">
                    PART 0{partIndex + 1} / {part.eyebrow}
                  </span>
                  <h2 id={`part-${part.id}`}>{part.title}</h2>
                  <p>{part.description}</p>
                </div>
                <span className="curriculum-part-count">
                  {String(partChapters.length).padStart(2, "0")} CHAPTERS
                </span>
              </header>

              <div className="chapter-index-list">
                {partChapters.map((chapter) => (
                  <Link
                    href={`/book/${chapter.slug}/`}
                    className="chapter-index-row"
                    key={chapter.slug}
                  >
                    <span className="chapter-index-number">
                      {chapter.number}
                    </span>
                    <span className="chapter-index-main">
                      <span className="chapter-index-label">
                        {chapter.badge}
                      </span>
                      <strong>{chapter.title}</strong>
                      <span className="chapter-index-lede">{chapter.lede}</span>
                    </span>
                    <span className="chapter-index-meta">
                      <span>{chapter.duration}</span>
                      <span>{chapter.topicCount} 个知识点</span>
                    </span>
                    <span className="chapter-index-arrow">
                      <ArrowRight />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="container book-index-guide">
        <SectionHeading
          eyebrow="A SIMPLE WAY THROUGH"
          title="不知道今天学什么？"
          description="不需要每天读很多。把一次阅读控制在一个小问题里，更容易坚持。"
        />
        <div className="reading-methods">
          <article>
            <span>01</span>
            <h3>先读完前三章</h3>
            <p>
              认识解释器和三种最常用的对象。读不懂的细节先跳过，保持节奏。
            </p>
            <Link href={`/book/${chapters[0].slug}/`}>
              开始第一章 <ArrowRight />
            </Link>
          </article>
          <article>
            <span>02</span>
            <h3>每天跑一段代码</h3>
            <p>
              每章至少打开一次代码运行器，改一个数字或字符串，观察输出。
            </p>
            <Link href="/playground/">
              去练习场 <ArrowRight />
            </Link>
          </article>
          <article>
            <span>03</span>
            <h3>用项目收尾</h3>
            <p>
              读完后用文件整理器、数据报表或 API 工具，把语法变成真正能用的东西。
            </p>
            <Link
              href={`/book/${
                chapters.find((chapter) => chapter.slug === "what-next")?.slug ??
                chapters[chapters.length - 1].slug
              }/`}
            >
              看下一步建议 <ArrowRight />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
