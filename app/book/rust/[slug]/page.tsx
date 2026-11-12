import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageBookChapter } from "@/components/language-book-chapter";
import { rustBook } from "@/content/rust";
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
  return rustBook.chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getLanguageChapter(rustBook, slug);
  if (!chapter) return {};
  const title = `第 ${chapter.number} 章 · ${chapter.title}`;
  return {
    title: `${title}｜Rust 手册`,
    description: chapter.lede,
    alternates: { canonical: `/book/rust/${chapter.slug}/` },
    openGraph: {
      title: `${title}｜${site.name}`,
      description: chapter.lede,
      url: `/book/rust/${chapter.slug}/`,
      type: "article",
    },
  };
}

export default async function RustChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getLanguageChapter(rustBook, slug);
  if (!chapter) notFound();
  const { previous, next } = getAdjacentLanguageChapters(rustBook, chapter.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `第 ${chapter.number} 章 · ${chapter.title}`,
    description: chapter.lede,
    timeRequired: `PT${chapter.minutes}M`,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "Book",
      name: "Rust 手册",
      url: `${site.url}/book/rust/`,
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
        book={rustBook}
        chapter={chapter}
        previous={previous}
        next={next}
      />
    </>
  );
}
