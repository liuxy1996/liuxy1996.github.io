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
            <span className="eyebrow">BOOK 01 / PYTHON</span>
            <h1>
              Python
              <br />
              <em>完全学习手册</em>
            </h1>
            <p className="book-index-lede">
              16 章，从解释器、数据结构到异常、类与标准库。
              每一段示例都可以在浏览器里打开、修改和运行。
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
    </main>
  );
}
