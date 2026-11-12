import catalogData from "@/content/chapters.json";

export type CodeLanguage = "python" | "rust" | "java" | "shell" | "text";

export type TextBlock = {
  type: "html";
  html: string;
};

export type CodeBlock = {
  type: "code";
  lang: CodeLanguage;
  label: string;
  code: string;
};

export type LessonBlock = TextBlock | CodeBlock;

export type Topic = {
  id: string;
  title: string;
  tag: string | null;
  blocks: LessonBlock[];
  searchText: string;
};

export type Chapter = {
  id: string;
  number: string;
  order: number;
  slug: string;
  title: string;
  badge: string;
  lede: string;
  level: string;
  duration: string;
  minutes: number;
  topicCount: number;
  pythonBlockCount: number;
  partId: PartId;
  partTitle: string;
  partEyebrow: string;
  topics: Topic[];
};

export type PartId =
  | "foundation"
  | "language"
  | "programs"
  | "toolbox"
  | "horizons";

export type Part = {
  id: PartId;
  title: string;
  eyebrow: string;
  description: string;
};

type Catalog = {
  generatedAt: string;
  source: string;
  stats: {
    chapters: number;
    topics: number;
    pythonBlocks: number;
    minutes: number;
  };
  parts: Part[];
  chapters: Chapter[];
};

const catalog = catalogData as Catalog;

export const site = {
  name: "自习室",
  englishName: "The Study Room",
  shortName: "自习室",
  summary: "语言、智能与系统。一个持续生长的个人学习书库。",
  description:
    "自习室是一间静态的个人学习书库：可以边读边跑的 Python、Rust 与 Java 8 手册，正在整理的 AI Agent、工程手记，以及一档关于技术与长期成长的声音栏目。",
  url: "https://liuxy1996.github.io",
  author: "liuxy1996",
  github: "https://github.com/liuxy1996/liuxy1996.github.io",
  docs: "https://docs.python.org/zh-cn/3/tutorial/",
} as const;

export const parts = catalog.parts;
export const chapters = catalog.chapters;
export const stats = catalog.stats;

export const chapterBySlug = new Map(chapters.map((chapter) => [chapter.slug, chapter]));
export const chapterByNumber = new Map(
  chapters.map((chapter) => [chapter.number, chapter]),
);

export const partRoman: Record<PartId, string> = {
  foundation: "I",
  language: "II",
  programs: "III",
  toolbox: "IV",
  horizons: "V",
};

export const partTone: Record<PartId, string> = {
  foundation: "green",
  language: "blue",
  programs: "orange",
  toolbox: "purple",
  horizons: "rose",
};

export function getChapter(slug: string): Chapter | undefined {
  return chapterBySlug.get(slug);
}

export function getChaptersByPart(partId: PartId): Chapter[] {
  return chapters.filter((chapter) => chapter.partId === partId);
}

export function getPart(partId: PartId): Part | undefined {
  return parts.find((part) => part.id === partId);
}

export function getAdjacentChapters(slug: string): {
  previous?: Chapter;
  next?: Chapter;
} {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}

export function chapterPath(chapter: Pick<Chapter, "slug">): string {
  return `/book/${chapter.slug}/`;
}

export function totalReadingTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} 分钟`;
  return `${hours} 小时${rest ? ` ${rest} 分钟` : ""}`;
}

export function partAccent(partId: PartId): string {
  return `var(--tone-${partTone[partId]})`;
}
