import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Spark } from "@/components/icons";
import { formatPostDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description:
    "自习室的写作栏目：关于 AI、编程基本功、语言选择、学习方法与长期成长的思考。",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "博客｜自习室",
    description: "关于技术、选择与长期成长的写作。",
    url: "/blog/",
  },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="blog-page">
      <header className="container blog-hero">
        <div className="blog-hero-copy">
          <span className="eyebrow">ESSAYS / FROM THE STUDY ROOM</span>
          <h1>
            <span>把想法，</span>
            <span>
              写到可以<em>回看</em>的地方。
            </span>
          </h1>
          <p>
            记录技术背后的判断，也记录学习本身的形状。
            这里不追热点，更关心那些过一阵子还能拿出来重读的问题。
          </p>
        </div>
        <aside className="blog-hero-note">
          <Spark />
          <p>写作不是输出的终点，而是把模糊的理解逼到清晰的一种方式。</p>
          <span>目前共 {posts.length} 篇 · 持续更新</span>
        </aside>
      </header>

      <section className="container blog-index" aria-label="文章列表">
        <div className="blog-index-head">
          <span className="eyebrow">RECENT WRITING</span>
          <span>按写作时间排序</span>
        </div>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <Link
              className={`blog-card${index === 0 ? " is-featured" : ""}`}
              href={`/blog/${post.slug}/`}
              key={post.slug}
            >
              <div className="blog-card-top">
                <span>{post.category}</span>
                <span>
                  {formatPostDate(post.date)} · {post.readMinutes} 分钟
                </span>
              </div>
              <div className="blog-card-body">
                <span className="blog-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
              </div>
              <span className="blog-card-read">
                阅读全文
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container blog-manifesto">
        <div>
          <span className="eyebrow">EDITORIAL NOTE</span>
          <h2>写作的三条小原则</h2>
        </div>
        <div className="blog-principles">
          <div>
            <span>01</span>
            <p>先写清楚自己的判断，再引用别人。</p>
          </div>
          <div>
            <span>02</span>
            <p>能落到代码、项目或具体经验的，就不停在口号。</p>
          </div>
          <div>
            <span>03</span>
            <p>宁可少写一篇，也不为了更新而重复自己。</p>
          </div>
        </div>
      </section>

      <section className="container blog-next">
        <div>
          <span className="eyebrow">KEEP EXPLORING</span>
          <h2>读笔记，或者听一段。</h2>
        </div>
        <div className="blog-next-actions">
          <Link className="button button-dark" href="/notes/">
            去知识库
            <ArrowRight />
          </Link>
          <Link className="text-link" href="/podcast/">
            自习室电台
            <ArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
