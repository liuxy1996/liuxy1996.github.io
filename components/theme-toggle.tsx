"use client";

import { Moon, Sun } from "@/components/icons";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem("py-study-room:theme", next);
    } catch {
      // Theme still changes for the current page when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className={`theme-toggle${compact ? " is-compact" : ""}`}
      onClick={toggleTheme}
      aria-label="切换深浅色主题"
      title="切换深浅色主题"
    >
      <Sun className="theme-icon theme-icon-sun" />
      <Moon className="theme-icon theme-icon-moon" />
    </button>
  );
}
