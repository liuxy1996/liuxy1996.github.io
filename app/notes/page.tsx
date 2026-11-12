import type { Metadata } from "next";
import Link from "next/link";
import { BookVolume } from "@/components/book-volume";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { libraryBooks } from "@/lib/library";

export const metadata: Metadata = {
  title: "书库",
  description:
    "自习室的书库：Python、Rust 与 Java 8 手册已经上架，AI Agent 与工程手记正在整理。",
  alternates: { canonical: "/notes/" },
  openGraph: {
    title: "书库｜自习室",
    description: "一个持续生长的个人学习书库。",
    url: "/notes/",
  },
};

export default function LibraryPage() {
  const available = libraryBooks.filter((book) => book.href).length;
  const inProgress = libraryBooks.length - available;

  return (
    <main id="main-content" className="library-catalog">
      <header className="catalog-masthead">
        <div className="container catalog-masthead-grid">
          <div className="catalog-masthead-copy">
            <span className="library-kicker">THE LIBRARY</span>
            <h1>书库</h1>
            <p>
              语言、智能与系统。
              <br />
              这里放正在读的书，也放准备写的书。
            </p>
            <div className="catalog-meta">
              <span>{available} 本在架</span>
              <span>{inProgress} 本在编</span>
              <span>持续更新</span>
            </div>
          </div>
          <div className="catalog-masthead-media" aria-hidden="true">
            <img
              src="/images/library-shelf.webp"
              alt=""
              width="1600"
              height="933"
              fetchPriority="high"
            />
            <span>BOOKS / NOTES / 2026</span>
          </div>
        </div>
      </header>

      <section className="container catalog-shelf">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">ALL VOLUMES</span>
            <h2>全部书目</h2>
          </div>
          <Link className="library-index-link" href="/book/">
            Python 手册
            <ArrowRight />
          </Link>
        </div>

        <div className="library-book-grid library-book-grid--catalog">
          {libraryBooks.map((book) => (
            <BookVolume book={book} detail key={book.id} />
          ))}
        </div>
      </section>

      <section className="container catalog-foot">
        <p>新的书目会先从真实的项目与问题里长出来。</p>
        <div>
          <Link href="/blog/">
            读文章
            <ArrowUpRight />
          </Link>
          <Link href="/podcast/">
            听播客
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
