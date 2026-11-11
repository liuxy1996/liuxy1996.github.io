"use client";

import { Check } from "@/components/icons";
import { useProgress } from "@/lib/progress";

export function ChapterComplete({
  slug,
  large = false,
}: {
  slug: string;
  large?: boolean;
}) {
  const { isComplete, toggleChapter, ready } = useProgress();
  const complete = isComplete(slug);

  return (
    <button
      type="button"
      className={`chapter-complete${complete ? " is-complete" : ""}${
        large ? " is-large" : ""
      }`}
      onClick={() => toggleChapter(slug)}
      aria-pressed={complete}
      disabled={!ready}
    >
      <span className="complete-check" aria-hidden="true">
        <Check />
      </span>
      <span>{complete ? "已完成本章" : "标记本章完成"}</span>
    </button>
  );
}
