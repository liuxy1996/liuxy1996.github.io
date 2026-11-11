import Link from "next/link";
import { ChevronDown, List } from "@/components/icons";
import { chapters, parts, partRoman } from "@/lib/chapters";

export function MobileChapterNav({ currentSlug }: { currentSlug: string }) {
  const current = chapters.find((chapter) => chapter.slug === currentSlug);
  if (!current) return null;

  return (
    <details className="mobile-chapter-nav">
      <summary>
        <span className="mobile-nav-label">
          <List />
          目录
        </span>
        <span>
          第 {current.number} 章 · {current.title}
        </span>
        <ChevronDown />
      </summary>
      <div className="mobile-chapter-panel">
        {parts.map((part) => (
          <div key={part.id}>
            <span className="mobile-part-label">
              {partRoman[part.id]} · {part.title}
            </span>
            {chapters
              .filter((chapter) => chapter.partId === part.id)
              .map((chapter) => (
                <Link
                  key={chapter.slug}
                  href={`/book/${chapter.slug}/`}
                  className={
                    chapter.slug === currentSlug ? "is-active" : undefined
                  }
                >
                  <span>{chapter.number}</span>
                  {chapter.title}
                </Link>
              ))}
          </div>
        ))}
      </div>
    </details>
  );
}
