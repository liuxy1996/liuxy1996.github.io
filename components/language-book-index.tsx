import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "@/components/icons";
import { BookCover } from "@/components/book-volume";
import { totalReadingTime } from "@/lib/chapters";
import {
  getLanguageChaptersByPart,
  languageChapterPath,
  languageTotalMinutes,
  type LanguageBook,
} from "@/lib/language-books";
import { libraryBooks } from "@/lib/library";

export function LanguageBookIndex({ book }: { book: LanguageBook }) {
  const coverBook = libraryBooks.find((item) => item.id === book.id);
  const firstChapter = book.chapters[0];
  const totalMinutes = languageTotalMinutes(book);

  return (
    <main id="main-content" className="lang-book-index">
      <header className="lang-book-hero">
        <div className="container lang-book-hero-grid">
          <div className="lang-book-copy">
            <span className="library-kicker">
              {book.language} / A STUDY ROOM BOOK
            </span>
            <h1>
              {book.title}
              <em>{book.subtitle}</em>
            </h1>
            <p>{book.description}</p>
            <div className="lang-book-meta">
              <span>{book.chapters.length} 章</span>
              <span>约 {totalReadingTime(totalMinutes)}</span>
              <span>{book.level}</span>
              {book.author && <span>{book.author}</span>}
            </div>
            <div className="lang-book-actions">
              <Link
                className="library-btn library-btn-dark"
                href={languageChapterPath(book, firstChapter)}
              >
                开始阅读
                <ArrowRight />
              </Link>
              <a
                className="library-index-link"
                href={book.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                官方来源
                <ArrowUpRight />
              </a>
            </div>
          </div>

          <div className="lang-book-art">
            {coverBook && (
              <div className="lang-book-cover-wrap">
                <BookCover book={coverBook} />
              </div>
            )}
            <span>独立整理 · 非原书全文</span>
          </div>
        </div>
      </header>

      <section className="container lang-book-toc">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">CONTENTS</span>
            <h2>目录</h2>
          </div>
          <span className="lang-book-toc-note">
            <Clock />
            {book.chapters.length} 章 · 约 {totalReadingTime(totalMinutes)}
          </span>
        </div>

        {book.parts.map((part, partIndex) => {
          const partChapters = getLanguageChaptersByPart(book, part.id);
          return (
            <section className="lang-book-part" key={part.id}>
              <header className="lang-book-part-head">
                <span>0{partIndex + 1}</span>
                <div>
                  <span className="library-kicker">{part.eyebrow}</span>
                  <h3>{part.title}</h3>
                  <p>{part.description}</p>
                </div>
              </header>
              <div className="lang-book-chapter-list">
                {partChapters.map((chapter) => (
                  <Link
                    className="lang-book-chapter-row"
                    href={languageChapterPath(book, chapter)}
                    key={chapter.slug}
                  >
                    <span className="lang-book-chapter-number">
                      {chapter.number}
                    </span>
                    <span className="lang-book-chapter-copy">
                      <strong>{chapter.title}</strong>
                      <span>{chapter.lede}</span>
                    </span>
                    <span className="lang-book-chapter-time">
                      {chapter.minutes} 分钟
                    </span>
                    <ArrowRight />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <footer className="container lang-book-source">
        <div>
          <span className="library-kicker">SOURCE / NOTE</span>
          <p>
            参考{" "}
            <a href={book.sourceUrl} target="_blank" rel="noopener noreferrer">
              {book.sourceName}
              <ArrowUpRight />
            </a>
            。{book.sourceNote}
          </p>
        </div>
        <Link className="library-index-link" href="/notes/">
          返回书库
          <ArrowRight />
        </Link>
      </footer>
    </main>
  );
}
