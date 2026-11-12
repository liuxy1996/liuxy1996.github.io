import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageBookChapter } from "@/components/language-book-chapter";
import { javaBook } from "@/content/java";
import { site } from "@/lib/chapters";
import {
  getAdjacentLanguageChapters,
  getLanguageChapter,
} from "@/lib/language-books";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return javaBook.chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getLanguageChapter(javaBook, slug);
  if (!chapter) return {};
  const title = `第 ${chapter.number} 章 · ${chapter.title}`;
  return {
    title: `${title}｜On Java 8`,
    description: chapter.lede,
    alternates: { canonical: `/book/java/${chapter.slug}/` },
    openGraph: {
      title: `${title}｜${site.name}`,
      description: chapter.lede,
      url: `/book/java/${chapter.slug}/`,
      type: "article",
    },
  };
}

export default async function JavaChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getLanguageChapter(javaBook, slug);
  if (!chapter) notFound();
  const { previous, next } = getAdjacentLanguageChapters(javaBook, chapter.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `第 ${chapter.number} 章 · ${chapter.title}`,
    description: chapter.lede,
    timeRequired: `PT${chapter.minutes}M`,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "Book",
      name: "On Java 8",
      url: `${site.url}/book/java/`,
    },
    author: {
      "@type": "Person",
      name: site.author,
      url: site.github,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LanguageBookChapter
        book={javaBook}
        chapter={chapter}
        previous={previous}
        next={next}
      />
    </>
  );
}
