import { javaBook } from "@/content/java";
import { rustBook } from "@/content/rust";
import type { CodeLanguage } from "@/lib/chapters";

export type LanguageBookSection = {
  id: string;
  heading: string;
  html: string;
  code?: {
    lang: CodeLanguage;
    label: string;
    code: string;
  }[];
};

export type LanguageBookChapter = {
  slug: string;
  number: string;
  title: string;
  partId: string;
  minutes: number;
  lede: string;
  sections: LanguageBookSection[];
  takeaways: string[];
};

export type LanguageBookPart = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
};

export type LanguageBook = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  language: string;
  level: string;
  author?: string;
  sourceName: string;
  sourceUrl: string;
  sourceNote: string;
  parts: LanguageBookPart[];
  chapters: LanguageBookChapter[];
};

export const languageBooks: LanguageBook[] = [
  rustBook as LanguageBook,
  javaBook as LanguageBook,
];

export const languageBookById = new Map(
  languageBooks.map((book) => [book.id, book]),
);

export function getLanguageBook(id: string): LanguageBook | undefined {
  return languageBookById.get(id);
}

export function getLanguageChapter(
  book: LanguageBook,
  slug: string,
): LanguageBookChapter | undefined {
  return book.chapters.find((chapter) => chapter.slug === slug);
}

export function getLanguageChaptersByPart(
  book: LanguageBook,
  partId: string,
): LanguageBookChapter[] {
  return book.chapters.filter((chapter) => chapter.partId === partId);
}

export function languageBookPath(book: Pick<LanguageBook, "id">): string {
  return `/book/${book.id}/`;
}

export function languageChapterPath(
  book: Pick<LanguageBook, "id">,
  chapter: Pick<LanguageBookChapter, "slug">,
): string {
  return `/book/${book.id}/${chapter.slug}/`;
}

export function languageTotalMinutes(book: LanguageBook): number {
  return book.chapters.reduce((total, chapter) => total + chapter.minutes, 0);
}

export function getAdjacentLanguageChapters(
  book: LanguageBook,
  slug: string,
): { previous?: LanguageBookChapter; next?: LanguageBookChapter } {
  const index = book.chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? book.chapters[index - 1] : undefined,
    next:
      index < book.chapters.length - 1 ? book.chapters[index + 1] : undefined,
  };
}

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function languageChapterSearchText(
  chapter: LanguageBookChapter,
): string {
  return [
    chapter.title,
    chapter.lede,
    ...chapter.sections.flatMap((section) => [
      section.heading,
      stripHtml(section.html),
    ]),
    ...chapter.takeaways,
  ].join(" ");
}
