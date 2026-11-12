import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { formatPostDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description:
    "自习室的长文栏目：关于 AI 与基本功、语言选择、学习方法与长期成长。",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "文章｜自习室",
    description: "关于技术、选择与长期成长的长文。",
    url: "/blog/",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main id="main-content" className="journal-page">
      <header className="container journal-masthead">
        <span className="library-kicker">JOURNAL</span>
        <div className="journal-masthead-row">
          <h1>文章</h1>
          <p>
            关于语言、AI 与学习方法的长期写作。
            <span>{posts.length} 篇</span>
          </p>
        </div>
      </header>

      <section className="container journal-feature" aria-label="精选文章">
        <Link
          className="journal-feature-link"
          href={`/blog/${featured.slug}/`}
        >
          <div className="journal-feature-media">
            <img
              src={featured.cover}
              alt={featured.coverAlt}
              width="1600"
              height="1000"
              fetchPriority="high"
            />
            <span>{featured.category}</span>
          </div>
          <div className="journal-feature-copy">
            <span className="journal-meta">
              {formatPostDate(featured.date)} · {featured.readMinutes} 分钟
            </span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="journal-read">
              阅读全文
              <ArrowUpRight />
            </span>
          </div>
        </Link>
      </section>

      <section className="container journal-grid">
        {rest.map((post, index) => (
          <Link
            className="journal-card"
            href={`/blog/${post.slug}/`}
            key={post.slug}
          >
            <div className="journal-card-media">
              <img
                src={post.cover}
                alt={post.coverAlt}
                width="1600"
                height="1000"
                loading="lazy"
              />
              <span>{post.category}</span>
            </div>
            <div className="journal-card-copy">
              <span className="journal-meta">
                {formatPostDate(post.date)} · {post.readMinutes} 分钟
              </span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="journal-read">
                阅读
                <ArrowUpRight />
              </span>
            </div>
            <span className="journal-card-index">
              {String(index + 2).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </section>

      <div className="container journal-foot">
        <Link href="/notes/">
          回到书库
          <ArrowRight />
        </Link>
        <span>{posts.length} 篇 · 持续更新</span>
      </div>
    </main>
  );
}
