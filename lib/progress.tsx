"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { chapters } from "@/lib/chapters";

const STORAGE_KEY = "py-study-room:completed";

type ProgressContextValue = {
  completed: ReadonlySet<string>;
  ready: boolean;
  isComplete: (slug: string) => boolean;
  toggleChapter: (slug: string) => void;
  completedCount: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

const validSlugs = new Set(chapters.map((chapter) => chapter.slug));

function readCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(
      parsed.filter(
        (value): value is string =>
          typeof value === "string" && validSlugs.has(value),
      ),
    );
  } catch {
    return new Set();
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(readCompleted());
    setReady(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setCompleted(readCompleted());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch {
      // Progress remains available for this session when storage is blocked.
    }
  }, [completed, ready]);

  const toggleChapter = useCallback((slug: string) => {
    if (!validSlugs.has(slug)) return;
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      completed,
      ready,
      isComplete: (slug) => completed.has(slug),
      toggleChapter,
      completedCount: completed.size,
    }),
    [completed, ready, toggleChapter],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return value;
}
