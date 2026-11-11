"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Check, Copy, Play } from "@/components/icons";
import type { CodeLanguage } from "@/lib/chapters";

const PythonDialog = dynamic(
  () => import("@/components/python-dialog").then((module) => module.PythonDialog),
  { ssr: false },
);

export function CodeBlock({
  code,
  highlightedHtml,
  language,
  label,
  context,
}: {
  code: string;
  highlightedHtml: string;
  language: CodeLanguage;
  label: string;
  context: string;
}) {
  const [copied, setCopied] = useState(false);
  const [runnerOpen, setRunnerOpen] = useState(false);
  const canRun = language === "python";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const area = document.createElement("textarea");
      area.value = code;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <figure className={`lesson-code lesson-code-${language}`}>
      <figcaption className="lesson-code-head">
        <span className="lesson-code-label">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{label}</span>
        </span>
        <span className="lesson-code-actions">
          <button
            type="button"
            className="code-action"
            onClick={copyCode}
            aria-label="复制代码"
          >
            {copied ? <Check /> : <Copy />}
            <span>{copied ? "已复制" : "复制"}</span>
          </button>
          {canRun && (
            <button
              type="button"
              className="code-action code-action-run"
              onClick={() => setRunnerOpen(true)}
              aria-label="运行并编辑这段代码"
            >
              <Play />
              <span>动手运行</span>
            </button>
          )}
        </span>
      </figcaption>
      <pre
        className="lesson-code-pre"
        tabIndex={0}
        aria-label={`${label}代码，可横向滚动`}
      >
        <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      </pre>

      {runnerOpen && (
        <PythonDialog
          initialCode={code}
          title="动手改一改"
          subtitle={context}
          onClose={() => setRunnerOpen(false)}
        />
      )}
    </figure>
  );
}
