import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "@/components/icons";
import { CodeBlock } from "@/components/code-block";
import { ReadingProgress } from "@/components/reading-progress";
import { highlightCode } from "@/lib/highlight";
import {
  languageBookPath,
  languageChapterPath,
  type LanguageBook,
  type LanguageBookChapter,
} from "@/lib/language-books";

export function LanguageBookChapter({
  book,
  chapter,
  previous,
  next,
}: {
  book: LanguageBook;
  chapter: LanguageBookChapter;
  previous?: LanguageBookChapter;
  next?: LanguageBookChapter;
}) {
  return (
    <main id="main-content" className="lang-reader-page">
      <ReadingProgress />
      <div className="container lang-reader-shell">
        <aside className="lang-reader-side" aria-label={`${book.title} 目录`}>
          <Link href={languageBookPath(book)} className="lang-reader-back">
            <ArrowLeft />
            {book.title} 手册
          </Link>
          <span className="library-kicker">{book.sourceName}</span>
          <nav>
            {book.chapters.map((item) => (
              <Link
                href={languageChapterPath(book, item)}
                key={item.slug}
                className={item.slug === chapter.slug ? "is-active" : ""}
                aria-current={item.slug === chapter.slug ? "page" : undefined}
              >
                <span>{item.number}</span>
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="lang-reader-article">
          <details className="lang-reader-mobile-toc">
            <summary>
              目录 · 第 {chapter.number} 章
              <span>展开</span>
            </summary>
            <nav>
              {book.chapters.map((item) => (
                <Link
                  href={languageChapterPath(book, item)}
                  key={item.slug}
                  className={item.slug === chapter.slug ? "is-active" : ""}
                >
                  {item.number} / {item.title}
                </Link>
              ))}
            </nav>
          </details>

          <header className="lang-reader-head">
            <div className="lang-reader-breadcrumb">
              <Link href="/notes/">书库</Link>
              <span>/</span>
              <Link href={languageBookPath(book)}>{book.title}</Link>
              <span>/</span>
              <span>第 {chapter.number} 章</span>
            </div>
            <span className="lang-reader-part">{book.language} / CHAPTER {chapter.number}</span>
            <h1>{chapter.title}</h1>
            <p>{chapter.lede}</p>
            <div className="lang-reader-meta">
              <span>
                <Clock />
                {chapter.minutes} 分钟
              </span>
              <span>{book.level}</span>
              <span>{book.chapters.length} 章手册</span>
            </div>
          </header>

          <div className="lang-reader-body">
            {chapter.sections.map((section, sectionIndex) => (
              <section
                className="lang-lesson-section"
                id={section.id}
                key={section.id}
              >
                <span className="lang-lesson-index">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{section.heading}</h2>
                  <div
                    className="lang-lesson-prose"
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                  {section.code?.map((example) => (
                    <CodeBlock
                      key={`${section.id}-${example.label}-${example.code.slice(0, 24)}`}
                      code={example.code}
                      highlightedHtml={highlightCode(example.code, example.lang)}
                      language={example.lang}
                      label={example.label}
                      context={`${book.title} · 第 ${chapter.number} 章`}
                    />
                  ))}
                </div>
              </section>
            ))}

            <aside className="lang-takeaways" id="takeaways">
              <span className="library-kicker">TAKEAWAYS</span>
              <h2>读完这一章</h2>
              <ul>
                {chapter.takeaways.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </aside>

            <div className="lang-reader-source">
              <span className="library-kicker">SOURCE</span>
              <p>
                参考{" "}
                <a
                  href={book.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.sourceName}
                  <ArrowUpRight />
                </a>
                。{book.sourceNote}
              </p>
            </div>
          </div>

          <nav className="lang-reader-pagination" aria-label="章节翻页">
            {previous ? (
              <Link href={languageChapterPath(book, previous)}>
                <span>
                  <ArrowLeft />
                  上一章
                </span>
                <strong>{previous.title}</strong>
              </Link>
            ) : (
              <Link href={languageBookPath(book)}>
                <span>
                  <ArrowLeft />
                  目录
                </span>
                <strong>{book.title}</strong>
              </Link>
            )}
            {next ? (
              <Link href={languageChapterPath(book, next)} className="is-next">
                <span>
                  下一章
                  <ArrowRight />
                </span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <Link href={languageBookPath(book)} className="is-next">
                <span>
                  回到目录
                  <ArrowRight />
                </span>
                <strong>完成这一册</strong>
              </Link>
            )}
          </nav>
        </article>

        <aside className="lang-reader-toc" aria-label="本章小节">
          <span className="library-kicker">ON THIS PAGE</span>
          <nav>
            {chapter.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.heading}
              </a>
            ))}
            <a href="#takeaways">读完这一章</a>
          </nav>
          <a href="#" className="lang-reader-top">
            回到顶部 ↑
          </a>
        </aside>
      </div>
    </main>
  );
}
