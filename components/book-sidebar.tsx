"use client";

import Link from "next/link";
import { Check, ChevronLeft } from "@/components/icons";
import { chapters, parts, partRoman, partTone } from "@/lib/chapters";
import { useProgress } from "@/lib/progress";

export function BookSidebar({
  currentSlug,
}: {
  currentSlug?: string;
}) {
  const { isComplete, completedCount, ready } = useProgress();
  const completion = Math.round((completedCount / chapters.length) * 100);

  return (
    <aside className="book-sidebar" aria-label="课程目录">
      <div className="book-sidebar-top">
        <Link href="/notes/" className="sidebar-back">
          <ChevronLeft />
          笔记库
        </Link>

        <div className="sidebar-progress-card">
          <div className="sidebar-progress-head">
            <span>阅读进度</span>
            <strong>{ready ? `${completedCount} / ${chapters.length}` : "— / 16"}</strong>
          </div>
          <div
            className="sidebar-progress-track"
            role="progressbar"
            aria-label="课程阅读进度"
            aria-valuemin={0}
            aria-valuemax={chapters.length}
            aria-valuenow={completedCount}
          >
            <span style={{ width: `${completion}%` }} />
          </div>
          <p>{completion === 100 ? "全部完成，去做个项目吧。" : "完成一章，点亮一个标记。"}</p>
        </div>
      </div>

      <nav className="sidebar-chapters">
        {parts.map((part) => (
          <div
            className={`sidebar-part sidebar-tone-${partTone[part.id]}`}
            key={part.id}
          >
            <div className="sidebar-part-head">
              <span>{partRoman[part.id]}</span>
              <strong>{part.title}</strong>
            </div>
            {chapters
              .filter((chapter) => chapter.partId === part.id)
              .map((chapter) => {
                const active = chapter.slug === currentSlug;
                const done = isComplete(chapter.slug);
                return (
                  <Link
                    href={`/book/${chapter.slug}/`}
                    key={chapter.slug}
                    className={`sidebar-chapter${active ? " is-active" : ""}${
                      done ? " is-done" : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="sidebar-chapter-number">
                      {chapter.number}
                    </span>
                    <span className="sidebar-chapter-title">{chapter.title}</span>
                    {done && (
                      <span className="sidebar-done" aria-label="已完成">
                        <Check />
                      </span>
                    )}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      <div className="book-sidebar-foot">
        <span>不想只读？</span>
        <Link href="/playground/">
          打开练习场
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </aside>
  );
}
