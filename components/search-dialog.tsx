"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import searchIndex from "@/content/search-index.json";
import { chapters } from "@/lib/chapters";
import { libraryBooks } from "@/lib/library";
import { posts, postToPlainText } from "@/lib/posts";
import { ArrowRight, Search, X } from "@/components/icons";

type ChapterRecord = {
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  chapterSlug: string;
  topicId: string;
  topicTitle: string;
  text: string;
};

type SearchEntry = {
  id: string;
  kind: "note" | "post" | "page";
  href: string;
  title: string;
  context: string;
  text: string;
};

type SearchResult = SearchEntry & {
  score: number;
  excerpt: string;
};

const chapterEntries: SearchEntry[] = (searchIndex as ChapterRecord[]).map(
  (record) => ({
    id: `${record.chapterId}-${record.topicId}`,
    kind: "note",
    href: `/book/${record.chapterSlug}/#${record.topicId}`,
    title: record.topicTitle,
    context: `第 ${record.chapterNumber} 章 · ${record.chapterTitle}`,
    text: record.text,
  }),
);

const postEntries: SearchEntry[] = posts.map((post) => ({
  id: `post-${post.slug}`,
  kind: "post",
  href: `/blog/${post.slug}/`,
  title: post.title,
  context: `文章 · ${post.category}`,
  text: postToPlainText(post),
}));

const bookEntries: SearchEntry[] = libraryBooks.map((book) => ({
  id: `book-${book.id}`,
  kind: "page",
  href: book.href ?? "/notes/",
  title: `${book.title} ${book.subtitle}`,
  context:
    book.status === "已上架" ? "书库 · 已上架" : "书库 · 筹备中",
  text: [book.description, ...book.topics, book.meta].join(" "),
}));

const podcastEntry: SearchEntry = {
  id: "page-podcast",
  kind: "page",
  href: "/podcast/",
  title: "自习室电台",
  context: "播客 · 第一季筹备中",
  text: "关于技术、选择与长期成长的声音栏目。AI 与基本功、Python 到 Rust、Agent 与责任、工程师的审美、学习复利。",
};

const entries = [...chapterEntries, ...postEntries, ...bookEntries, podcastEntry];

function normalize(value: string): string {
  return value.toLocaleLowerCase("zh-CN").replace(/\s+/g, " ").trim();
}

function buildExcerpt(text: string, query: string): string {
  const normalizedText = normalize(text);
  const index = normalizedText.indexOf(query);
  if (index === -1) return text.slice(0, 96);
  const start = Math.max(0, index - 36);
  const end = Math.min(text.length, index + query.length + 94);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

const suggestions = [
  {
    href: "/notes/",
    label: "学习书库",
    meta: "书库",
  },
  {
    href: `/book/${chapters[0].slug}/`,
    label: chapters[0].title,
    meta: "Python",
  },
  {
    href: `/blog/${posts[0].slug}/`,
    label: posts[0].title,
    meta: "文章",
  },
  {
    href: "/podcast/",
    label: "自习室电台",
    meta: "播客",
  },
];

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("modal-open");
      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => {
        window.clearTimeout(focusTimer);
        document.body.classList.remove("modal-open");
      };
    }

    if (dialog.open) dialog.close();
    document.body.classList.remove("modal-open");
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo<SearchResult[]>(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];

    return entries
      .map((entry) => {
        const title = normalize(entry.title);
        const context = normalize(entry.context);
        const text = normalize(entry.text);
        let score = 0;
        if (title.includes(normalizedQuery)) score += 7;
        if (context.includes(normalizedQuery)) score += 3;
        if (text.includes(normalizedQuery)) score += 2;
        if (title.startsWith(normalizedQuery)) score += 3;
        return {
          ...entry,
          score,
          excerpt: buildExcerpt(entry.text, normalizedQuery),
        };
      })
      .filter((entry) => entry.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          (a.kind === "note" ? 0 : 1) - (b.kind === "note" ? 0 : 1) ||
          a.title.localeCompare(b.title, "zh-CN"),
      )
      .slice(0, 9);
  }, [query]);

  function close() {
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const first = results[0];
    if (first) {
      close();
      router.push(first.href);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      aria-labelledby="search-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        if (open) close();
      }}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      <div className="search-panel">
        <div className="search-panel-head">
          <div>
            <span className="eyebrow">Search the library</span>
            <h2 id="search-title">搜索书库与文章</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={close}
            aria-label="关闭搜索"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <Search className="search-form-icon" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索书目、文章或概念…"
            aria-label="搜索书目、文章或概念"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>ESC</kbd>
        </form>

        <div className="search-results" aria-live="polite">
          {!query.trim() && (
            <div className="search-start">
              <p className="search-hint">不知道从哪开始？试试这些。</p>
              <div className="search-suggestions">
                {suggestions.map((item) => (
                  <Link href={item.href} key={item.href} onClick={close}>
                    <span>{item.meta}</span>
                    {item.label}
                    <ArrowRight />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="search-empty">
              <span className="search-empty-mark">?</span>
              <p>没有找到「{query.trim()}」</p>
              <span>
                试试更短的关键词，例如“函数”“Agent”或“Rust”。
              </span>
            </div>
          )}

          {results.length > 0 && (
            <>
              <p className="search-count">
                找到 {results.length} 个相关内容
              </p>
              <ul className="search-result-list">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link href={result.href} onClick={close}>
                      <span className="search-result-chapter">
                        {result.context}
                      </span>
                      <strong>{result.title}</strong>
                      <span className="search-result-excerpt">
                        {result.excerpt}
                      </span>
                      <ArrowRight className="search-result-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="search-footer">
          <span>
            <kbd>↵</kbd> 打开第一个结果
          </span>
          <span>
            <kbd>ESC</kbd> 关闭
          </span>
          <span className="search-footer-note">完全在本地搜索</span>
        </div>
      </div>
    </dialog>
  );
}
