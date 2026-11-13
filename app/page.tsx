import Link from "next/link";
import type { CSSProperties } from "react";
import { BookVolume } from "@/components/book-volume";
import { ArrowRight, ArrowUpRight, Headphones } from "@/components/icons";
import { ScrollExperience } from "@/components/scroll-experience";
import { episodes, podcastShow } from "@/content/podcast";
import { stats } from "@/lib/chapters";
import { languageBooks } from "@/lib/language-books";
import { libraryBooks } from "@/lib/library";
import { formatPostDate, posts } from "@/lib/posts";
import { currentRoadmapNode, roadmapNodes } from "@/lib/roadmap";

export default function HomePage() {
  const liveBooks = libraryBooks.filter((book) => book.href).length;
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
              LEARNING MAP · PYTHON PRACTICE
            </span>
            <h1 id="library-title">
              自习室
              <span>THE STUDY ROOM</span>
            </h1>
            <p className="library-hero-sub">
              Python 基础已完成。
              <br />
              下一步：用 PyCharm 做一个实战项目。
            </p>
            <div className="library-hero-actions">
              <Link className="library-btn library-btn-light" href="/roadmap/">
                查看学习路线
                <ArrowRight />
              </Link>
              <Link className="library-hero-link" href="/notes/">
                书库资源
                <ArrowUpRight />
              </Link>
            </div>
          </div>

          <aside className="library-featured">
            <div className="library-featured-top">
              <span>CURRENT NODE</span>
              <span>
                {currentRoadmapNode.number} / {roadmapNodes.length}
              </span>
            </div>
            <h2>
              {currentRoadmapNode.title}
              <span>{currentRoadmapNode.subtitle}</span>
            </h2>
            <p>先完成命令行学习记录工具，再进入 FastAPI。</p>
            <Link
              className="library-featured-link"
              href={`/roadmap/${currentRoadmapNode.id}/`}
            >
              打开节点
              <ArrowRight />
            </Link>
            <span className="library-featured-mark" aria-hidden="true">
              {currentRoadmapNode.number}
            </span>
          </aside>
        </div>

        <div className="container library-hero-foot">
          <span>
            {liveBooks} BOOKS · {totalChapters} CHAPTERS · {posts.length} ESSAYS
            {" · "}
            {episodes.length} EPISODES
          </span>
        </div>
      </section>

      <section className="container library-section library-shelves">
        <div className="library-section-head" data-reveal>
          <div>
            <span className="library-kicker">REFERENCE LIBRARY</span>
            <h2>参考书目</h2>
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
          手册作为参考，不要求按顺序读完；当前重点是实验 00。
        </p>
      </section>

      <section className="container library-section library-new">
        <div className="library-section-head" data-reveal>
          <div>
            <span className="library-kicker">NOTES &amp; PODCAST</span>
            <h2>文章与播客</h2>
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
