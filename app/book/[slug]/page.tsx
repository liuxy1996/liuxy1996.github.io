import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookSidebar } from "@/components/book-sidebar";
import { ChapterComplete } from "@/components/chapter-complete";
import { ChapterToc } from "@/components/chapter-toc";
import { CodeBlock } from "@/components/code-block";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  List,
  Spark,
  Terminal,
} from "@/components/icons";
import { MobileChapterNav } from "@/components/mobile-chapter-nav";
import { ReadingProgress } from "@/components/reading-progress";
import {
  chapters,
  getAdjacentChapters,
  getChapter,
  site,
} from "@/lib/chapters";
import { highlightCode } from "@/lib/highlight";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  const title = `第 ${chapter.number} 章 · ${chapter.title}`;
  return {
    title,
    description: chapter.lede,
    alternates: { canonical: `/book/${chapter.slug}/` },
    openGraph: {
      title: `${title}｜${site.name}`,
      description: chapter.lede,
      url: `/book/${chapter.slug}/`,
      type: "article",
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const { previous, next } = getAdjacentChapters(chapter.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `第 ${chapter.number} 章 · ${chapter.title}`,
    description: chapter.lede,
    educationalLevel: chapter.level,
    timeRequired: `PT${chapter.minutes}M`,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "Course",
      name: `${site.name} · Python 学习课程`,
      url: `${site.url}/book/`,
    },
    author: {
      "@type": "Person",
      name: site.author,
      url: site.github,
    },
  };

  return (
    <main id="main-content" className="chapter-page">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="container book-shell">
        <BookSidebar currentSlug={chapter.slug} />

        <div className="book-main">
          <MobileChapterNav currentSlug={chapter.slug} />

          <article className="reader" id="chapter-top">
            <header className="reader-head">
              <div className="reader-breadcrumb">
                <Link href="/book/">课程</Link>
                <span>/</span>
                <span>{chapter.partTitle}</span>
                <span>/</span>
                <span>第 {chapter.number} 章</span>
              </div>

              <div className="reader-head-main">
                <div>
                  <div className="reader-kicker">
                    <span>{chapter.partEyebrow}</span>
                    <span className="reader-kicker-dot" />
                    <span>CHAPTER {chapter.number}</span>
                  </div>
                  <h1>{chapter.title}</h1>
                  <p className="reader-lede">{chapter.lede}</p>
                  <div className="reader-meta">
                    <span>
                      <Clock />
                      {chapter.duration}
                    </span>
                    <span>
                      <List />
                      {chapter.topicCount} 个知识点
                    </span>
                    {chapter.pythonBlockCount > 0 && (
                      <span>
                        <Terminal />
                        {chapter.pythonBlockCount} 段可运行代码
                      </span>
                    )}
                  </div>
                </div>
                <div className="reader-chapter-number" aria-hidden="true">
                  <span>CH.</span>
                  {chapter.number}
                </div>
              </div>

              <div className="reader-actions">
                <ChapterComplete slug={chapter.slug} />
              </div>
            </header>

            <div className="reader-body">
              <div className="reader-note">
                <Spark />
                <p>
                  <strong>读法建议：</strong>
                  先读说明，再把代码修改一行运行。看不懂的细节可以先跳过，
                  后面章节会重新遇到它。
                </p>
              </div>

              {chapter.topics.map((topic, index) => (
                <section
                  className="lesson-section"
                  id={topic.id}
                  key={topic.id}
                  aria-labelledby={`${topic.id}-title`}
                >
                  <div className="lesson-section-head">
                    <span className="lesson-section-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {topic.tag && (
                        <span className="lesson-tag">{topic.tag}</span>
                      )}
                      <h2 id={`${topic.id}-title`}>
                        {topic.title}
                        <a
                          className="heading-anchor"
                          href={`#${topic.id}`}
                          aria-label={`链接到「${topic.title}」`}
                        >
                          #
                        </a>
                      </h2>
                    </div>
                  </div>

                  <div className="lesson-content">
                    {topic.blocks.map((block, blockIndex) =>
                      block.type === "html" ? (
                        <div
                          className="lesson-prose"
                          key={`html-${blockIndex}`}
                          dangerouslySetInnerHTML={{ __html: block.html }}
                        />
                      ) : (
                        <CodeBlock
                          key={`code-${blockIndex}`}
                          code={block.code}
                          language={block.lang}
                          label={block.label}
                          context={`${chapter.title} · ${topic.title}`}
                          highlightedHtml={highlightCode(
                            block.code,
                            block.lang,
                          )}
                        />
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>

            <div className="reader-end">
              <span className="eyebrow">END OF CHAPTER {chapter.number}</span>
              <h2>读懂了一点，<br />就让它跑起来。</h2>
              <p>
                完成标记只保存在你的浏览器，不会上传。下一章见。
              </p>
              <ChapterComplete slug={chapter.slug} large />
            </div>

            <nav className="chapter-pagination" aria-label="章节翻页">
              {previous ? (
                <Link
                  href={`/book/${previous.slug}/`}
                  className="pagination-card pagination-prev"
                >
                  <ArrowLeft />
                  <span>
                    <span>上一章</span>
                    <strong>
                      {previous.number} · {previous.title}
                    </strong>
                  </span>
                </Link>
              ) : (
                <Link href="/book/" className="pagination-card pagination-prev">
                  <ArrowLeft />
                  <span>
                    <span>返回</span>
                    <strong>课程总览</strong>
                  </span>
                </Link>
              )}

              {next ? (
                <Link
                  href={`/book/${next.slug}/`}
                  className="pagination-card pagination-next"
                >
                  <span>
                    <span>下一章</span>
                    <strong>
                      {next.number} · {next.title}
                    </strong>
                  </span>
                  <ArrowRight />
                </Link>
              ) : (
                <Link href="/book/" className="pagination-card pagination-next">
                  <span>
                    <span>读完了</span>
                    <strong>回到课程总览</strong>
                  </span>
                  <ArrowRight />
                </Link>
              )}
            </nav>
          </article>
        </div>

        <ChapterToc topics={chapter.topics} />
      </div>
    </main>
  );
}
