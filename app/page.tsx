import Link from "next/link";
import type { CSSProperties } from "react";
import { BookCover, BookVolume } from "@/components/book-volume";
import { ArrowRight, ArrowUpRight, Headphones } from "@/components/icons";
import { ScrollExperience } from "@/components/scroll-experience";
import { episodes, podcastShow } from "@/content/podcast";
import { stats } from "@/lib/chapters";
import { languageBooks } from "@/lib/language-books";
import { libraryBooks } from "@/lib/library";
import { formatPostDate, posts } from "@/lib/posts";

export default function HomePage() {
  const pythonBook = libraryBooks[0];
  const liveBookData = libraryBooks.filter((book) => book.href);
  const liveBooks = liveBookData.length;
  const totalChapters =
    stats.chapters +
    languageBooks.reduce((total, book) => total + book.chapters.length, 0);

  return (
    <main id="main-content" className="library-home">
      <ScrollExperience />
      <section
        className="library-hero"
        aria-labelledby="library-title"
        data-scroll-hero
      >
        <div className="library-hero-media" aria-hidden="true">
          <img
            src="/images/library-hero.webp"
            alt=""
            width="1800"
            height="1200"
            fetchPriority="high"
          />
        </div>
        <div className="library-hero-shade" aria-hidden="true" />

        <div className="container library-hero-grid">
          <div className="library-hero-copy">
            <span className="library-kicker library-kicker-light">
              A PERSONAL LIBRARY · EST. 2026
            </span>
            <h1 id="library-title">
              自习室
              <span>THE STUDY ROOM</span>
            </h1>
            <p className="library-hero-sub">
              语言、智能与系统。
              <br />
              一个持续生长的个人学习书库。
            </p>
            <div className="library-hero-actions">
              <Link className="library-btn library-btn-light" href="/notes/">
                浏览书架
                <ArrowRight />
              </Link>
              <Link className="library-hero-link" href="/podcast/">
                声音栏目
                <ArrowUpRight />
              </Link>
            </div>
          </div>

          <aside className="library-featured">
            <div className="library-featured-top">
              <span>NOW IN FOCUS</span>
              <span>VOL. {pythonBook.number}</span>
            </div>
            <h2>
              Python
              <span>{pythonBook.subtitle}</span>
            </h2>
            <p>{pythonBook.meta}</p>
            <Link
              className="library-featured-link"
              href={pythonBook.href ?? "/notes/"}
            >
              开始阅读
              <ArrowRight />
            </Link>
            <span className="library-featured-mark" aria-hidden="true">
              01
            </span>
          </aside>
        </div>

        <div className="container library-hero-foot">
          <span>
            {liveBooks} BOOKS · {totalChapters} CHAPTERS · {posts.length} ESSAYS
            {" · "}
            {episodes.length} EPISODES
          </span>
          <span className="library-hero-scroll">SCROLL TO EXPLORE ↓</span>
          <span>LIBRARY / 001</span>
        </div>
      </section>

      <section className="container library-section library-shelves">
        <div className="library-section-head" data-reveal>
          <div>
            <span className="library-kicker">THE COLLECTION</span>
            <h2>书架</h2>
          </div>
          <Link className="library-index-link" href="/notes/">
            全部书目
            <ArrowRight />
          </Link>
        </div>

        <div className="library-book-grid">
          {libraryBooks.map((book, index) => (
            <div
              className="book-reveal"
              data-reveal
              key={book.id}
              style={
                { "--reveal-delay": `${index * 65}ms` } as CSSProperties
              }
            >
              <BookVolume book={book} />
            </div>
          ))}
        </div>
        <p className="library-shelf-note" data-reveal>
          更多语言与系统书目正在整理。
        </p>
      </section>

      <section
        className="scroll-stage"
        data-scroll-scene
        aria-labelledby="scroll-stage-title"
      >
        <div className="scroll-stage-sticky">
          <div className="scroll-stage-ambient" aria-hidden="true" />
          <div className="container scroll-stage-grid">
            <div className="scroll-stage-visual" aria-hidden="true">
              <span className="scroll-stage-ring" />
              {liveBookData.map((book, index) => (
                <div
                  className={`scroll-stage-cover scroll-stage-cover-${index}`}
                  key={book.id}
                >
                  <BookCover book={book} />
                </div>
              ))}
            </div>

            <div className="scroll-stage-copy" data-reveal>
              <span className="library-kicker library-kicker-light">
                THE COLLECTION / {String(liveBooks).padStart(2, "0")} BOOKS
              </span>
              <h2 id="scroll-stage-title">三本在架</h2>
              <div className="scroll-stage-list">
                {liveBookData.map((book) => (
                  <Link
                    className="scroll-stage-book"
                    href={book.href ?? "/notes/"}
                    key={book.id}
                  >
                    <span>{book.number}</span>
                    <strong>{book.title}</strong>
                    <em>{book.subtitle}</em>
                    <ArrowRight />
                  </Link>
                ))}
              </div>
              <Link className="scroll-stage-all" href="/notes/">
                全部书目
                <ArrowUpRight />
              </Link>
              <div className="scroll-stage-progress" aria-hidden="true">
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container library-section library-new">
        <div className="library-section-head" data-reveal>
          <div>
            <span className="library-kicker">NEW &amp; NOTED</span>
            <h2>新上架</h2>
          </div>
          <Link className="library-index-link" href="/blog/">
            全部文章
            <ArrowRight />
          </Link>
        </div>

        <div className="library-new-grid">
          <Link className="podcast-plate" href="/podcast/" data-reveal>
            <div className="podcast-plate-media">
              <img
                src="/images/podcast.webp"
                alt="录音棚里的麦克风"
                width="1200"
                height="1500"
                loading="lazy"
              />
              <span className="podcast-plate-icon">
                <Headphones />
              </span>
              <span className="podcast-plate-label">{podcastShow.season}</span>
            </div>
            <div className="podcast-plate-body">
              <span className="library-kicker">PODCAST / EP. 00</span>
              <h3>{episodes[0].title}</h3>
              <span className="podcast-plate-meta">
                文字稿 · 音频制作中
                <ArrowUpRight />
              </span>
            </div>
          </Link>

          <div className="journal-list" data-reveal>
            <div className="journal-list-head">
              <span className="library-kicker">JOURNAL</span>
              <Link href="/blog/">
                文章归档
                <ArrowRight />
              </Link>
            </div>
            {posts.map((post, index) => (
              <Link
                className="journal-row"
                href={`/blog/${post.slug}/`}
                key={post.slug}
              >
                <span className="journal-row-index">
                  0{index + 1}
                </span>
                <div className="journal-row-copy">
                  <span>
                    {post.category} / {formatPostDate(post.date)}
                  </span>
                  <h3>{post.title}</h3>
                </div>
                <span className="journal-row-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
            <p className="journal-list-note">
              关于语言、AI 与学习方法的长期写作。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
