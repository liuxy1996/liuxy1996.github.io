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
import { ArrowRight, Search, X } from "@/components/icons";

type SearchRecord = {
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  chapterSlug: string;
  topicId: string;
  topicTitle: string;
  text: string;
};

type SearchResult = SearchRecord & {
  href: string;
  score: number;
  excerpt: string;
};

const records = searchIndex as SearchRecord[];

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

    return records
      .map((record) => {
        const title = normalize(
          `${record.chapterTitle} ${record.topicTitle}`,
        );
        const text = normalize(record.text);
        let score = 0;
        if (title.includes(normalizedQuery)) score += 6;
        if (text.includes(normalizedQuery)) score += 2;
        if (normalize(record.topicTitle).startsWith(normalizedQuery)) score += 3;
        return {
          ...record,
          href: `/book/${record.chapterSlug}/#${record.topicId}`,
          score,
          excerpt: buildExcerpt(record.text, normalizedQuery),
        };
      })
      .filter((record) => record.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          Number(a.chapterNumber) - Number(b.chapterNumber),
      )
      .slice(0, 8);
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
            <span className="eyebrow">Command palette</span>
            <h2 id="search-title">搜索课程</h2>
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
            placeholder="搜索章节、概念或代码…"
            aria-label="搜索章节或概念"
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
                {chapters.slice(0, 4).map((chapter) => (
                  <Link
                    href={`/book/${chapter.slug}/`}
                    key={chapter.id}
                    onClick={close}
                  >
                    <span>{chapter.number}</span>
                    {chapter.title}
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
              <span>试试更短的关键词，例如“函数”“列表”或“异常”。</span>
            </div>
          )}

          {results.length > 0 && (
            <>
              <p className="search-count">
                找到 {results.length} 个相关知识点
              </p>
              <ul className="search-result-list">
                {results.map((result) => (
                  <li key={`${result.chapterId}-${result.topicId}`}>
                    <Link href={result.href} onClick={close}>
                      <span className="search-result-chapter">
                        第 {result.chapterNumber} 章 · {result.chapterTitle}
                      </span>
                      <strong>{result.topicTitle}</strong>
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
