import Link from "next/link";
import { BookVolume } from "@/components/book-volume";
import { ArrowRight, ArrowUpRight, Headphones } from "@/components/icons";
import { episodes, podcastShow } from "@/content/podcast";
import { stats } from "@/lib/chapters";
import { libraryBooks } from "@/lib/library";
import { formatPostDate, posts } from "@/lib/posts";

export default function HomePage() {
  const pythonBook = libraryBooks[0];

  return (
    <main id="main-content" className="library-home">
      <section className="library-hero" aria-labelledby="library-title">
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
            {stats.chapters} CHAPTERS · {posts.length} ESSAYS ·{" "}
            {episodes.length} EPISODES
          </span>
          <span>LIBRARY / 001</span>
        </div>
      </section>

      <section className="container library-section library-shelves">
        <div className="library-section-head">
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
          {libraryBooks.map((book) => (
            <BookVolume book={book} key={book.id} />
          ))}
        </div>
        <p className="library-shelf-note">更多语言与系统书目正在整理。</p>
      </section>

      <section className="container library-section library-new">
        <div className="library-section-head">
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
          <Link className="podcast-plate" href="/podcast/">
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

          <div className="journal-list">
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
