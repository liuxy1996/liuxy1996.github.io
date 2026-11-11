"use client";

import { useEffect, useState } from "react";
import type { Topic } from "@/lib/chapters";

export function ChapterToc({ topics }: { topics: Topic[] }) {
  const [activeId, setActiveId] = useState(topics[0]?.id ?? "");

  useEffect(() => {
    const elements = topics
      .map((topic) => document.getElementById(topic.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [topics]);

  return (
    <aside className="chapter-toc" aria-label="本章目录">
      <span className="chapter-toc-label">ON THIS PAGE</span>
      <nav>
        {topics.map((topic, index) => (
          <a
            href={`#${topic.id}`}
            key={topic.id}
            className={activeId === topic.id ? "is-active" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {topic.title}
          </a>
        ))}
      </nav>
      <a className="chapter-toc-top" href="#chapter-top">
        回到本章开头
        <span aria-hidden="true">↑</span>
      </a>
    </aside>
  );
}
