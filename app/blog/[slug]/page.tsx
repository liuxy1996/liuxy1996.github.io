import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { ReadingProgress } from "@/components/reading-progress";
import {
  formatPostDate,
  getAdjacentPosts,
  getPost,
  posts,
  type Post,
} from "@/lib/posts";
import { site } from "@/lib/chapters";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.subtitle,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: `${post.title}｜${site.name}`,
      description: post.subtitle,
      url: `/blog/${post.slug}/`,
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
  };
}

function PostBody({ post }: { post: Post }) {
  return (
    <>
      {post.sections.map((section, index) => (
        <section className="post-section" key={section.heading}>
          <span className="post-section-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.quote && <blockquote>{section.quote}</blockquote>}
          </div>
        </section>
      ))}
    </>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { previous, next } = getAdjacentPosts(post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.date,
    image: `${site.url}${post.cover}`,
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      name: site.author,
      url: site.github,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };

  return (
    <main id="main-content" className="post-page">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="container post-article">
        <header className="post-head">
          <Link href="/blog/" className="post-back">
            <ArrowLeft />
            返回文章
          </Link>
          <div className="post-meta">
            <span>{post.category}</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span>{post.readMinutes} 分钟阅读</span>
          </div>
          <h1>{post.title}</h1>
          <p className="post-subtitle">{post.subtitle}</p>
          <div className="post-byline">
            <span className="post-byline-mark">自</span>
            <span>
              {site.name}
              <small>STUDY ROOM JOURNAL</small>
            </span>
          </div>
        </header>

        <figure className="post-cover">
          <img
            src={post.cover}
            alt={post.coverAlt}
            width="1600"
            height="1000"
            fetchPriority="high"
          />
        </figure>

        <div className="post-body">
          <PostBody post={post} />

          <aside className="post-takeaways">
            <span className="eyebrow">TAKEAWAYS</span>
            <h2>带走三件事</h2>
            <ol>
              {post.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ol>
          </aside>
        </div>

        <footer className="post-footer">
          <div className="post-footer-note">
            <span>继续阅读</span>
            <Link href="/blog/">
              返回所有文章
              <ArrowRight />
            </Link>
          </div>
          <nav className="post-pagination" aria-label="文章翻页">
            {previous ? (
              <Link href={`/blog/${previous.slug}/`} className="post-next-link">
                <span>上一篇</span>
                <strong>{previous.title}</strong>
                <ArrowUpRight />
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/blog/${next.slug}/`} className="post-next-link">
                <span>下一篇</span>
                <strong>{next.title}</strong>
                <ArrowUpRight />
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </main>
  );
}
