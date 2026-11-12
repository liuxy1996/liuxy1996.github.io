"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { chapters } from "@/lib/chapters";
import { useProgress } from "@/lib/progress";

export function BookProgressSummary({ compact = false }: { compact?: boolean }) {
  const { completed, completedCount, ready } = useProgress();
  const next =
    chapters.find((chapter) => !completed.has(chapter.slug)) ??
    chapters[chapters.length - 1];
  const percent = Math.round((completedCount / chapters.length) * 100);
  const started = completedCount > 0;

  return (
    <div className={`book-progress${compact ? " is-compact" : ""}`}>
      <div className="book-progress-ring" aria-hidden="true">
        <svg viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" />
          <circle
            className="book-progress-ring-value"
            cx="22"
            cy="22"
            r="18"
            style={{ strokeDashoffset: `${113 - (113 * percent) / 100}` }}
          />
        </svg>
        <strong>{ready ? completedCount : 0}</strong>
      </div>
      <div className="book-progress-copy">
        <span>你的阅读进度</span>
        <strong>
          {completedCount} / {chapters.length} 章
        </strong>
        {!compact && (
          <p>
            {completedCount === 0
              ? `尚未开始，共 ${chapters.length} 章。`
              : completedCount === chapters.length
                ? "全部章节已读完。"
                : "进度只保存在本机浏览器。"}
          </p>
        )}
      </div>
      <Link
        href={`/book/${next.slug}/`}
        className="book-progress-action"
        aria-label={
          started ? `继续阅读第 ${next.number} 章 ${next.title}` : "开始阅读"
        }
      >
        {started ? "继续阅读" : "开始阅读"}
        <ArrowRight />
      </Link>
    </div>
  );
}
