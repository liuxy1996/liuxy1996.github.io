"use client";

import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Loader, Play, Rotate, X } from "@/components/icons";

type RemoteLanguage = "rust" | "java";

const TIMEOUT_MS = 60_000;

type RunResult = {
  ok: boolean;
  output: string;
  durationMs: number;
};

function value(value: unknown): string {
  return typeof value === "string" ? value : "";
}

async function executeRust(code: string, signal: AbortSignal): Promise<RunResult> {
  const started = performance.now();
  const response = await fetch("https://play.rust-lang.org/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      channel: "stable",
      mode: "debug",
      edition: "2021",
      crateType: "bin",
      tests: false,
      code,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Rust Playground 返回 ${response.status}`);
  }

  const payload = (await response.json()) as {
    success?: boolean;
    stdout?: string;
    stderr?: string;
  };
  const stdout = value(payload.stdout);
  const stderr = value(payload.stderr);
  const success = payload.success === true;

  return {
    ok: success,
    output: success
      ? stdout || "程序运行成功，但没有输出。"
      : stderr || stdout || "编译失败，但没有返回错误信息。",
    durationMs: Math.round(performance.now() - started),
  };
}

async function executeJava(code: string, signal: AbortSignal): Promise<RunResult> {
  const started = performance.now();
  const response = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: code,
        language_id: 91,
        stdin: "",
      }),
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`远程 Java 编译器返回 ${response.status}`);
  }

  const payload = (await response.json()) as {
    stdout?: string | null;
    stderr?: string | null;
    compile_output?: string | null;
    message?: string | null;
    time?: string | null;
    status?: { id?: number; description?: string };
  };
  const stdout = value(payload.stdout);
  const stderr = value(payload.stderr);
  const compileOutput = value(payload.compile_output);
  const message = value(payload.message);
  const accepted = payload.status?.id === 3;

  return {
    ok: accepted,
    output: accepted
      ? stdout || "程序运行成功，但没有输出。"
      : compileOutput || stderr || message || "编译失败，但没有返回错误信息。",
    durationMs: Math.round(performance.now() - started),
  };
}

export function RemoteCodeDialog({
  initialCode,
  language,
  title,
  subtitle,
  onClose,
}: {
  initialCode: string;
  language: RemoteLanguage;
  title: string;
  subtitle?: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [code, setCode] = useState(initialCode);
  const [phase, setPhase] = useState<"idle" | "running" | "success" | "error">(
    "idle",
  );
  const [result, setResult] = useState<RunResult | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("modal-open");
    return () => {
      abortRef.current?.abort();
      document.body.classList.remove("modal-open");
      if (dialog.open) dialog.close();
    };
  }, []);

  function close() {
    abortRef.current?.abort();
    onClose();
  }

  async function run() {
    if (phase === "running") return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    setPhase("running");
    setResult(null);

    try {
      const next =
        language === "rust"
          ? await executeRust(code, controller.signal)
          : await executeJava(code, controller.signal);
      setResult(next);
      setPhase(next.ok ? "success" : "error");
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "AbortError"
          ? "请求超时，远程编译器没有在规定时间内返回。"
          : error instanceof Error
            ? error.message
            : "远程执行失败。";
      setResult({ ok: false, output: message, durationMs: 0 });
      setPhase("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      void run();
    }
  }

  const provider =
    language === "rust"
      ? "Rust Playground（stable, edition 2021）"
      : "Judge0（JDK 17，兼容 Java 8 语法）";

  return (
    <dialog
      ref={dialogRef}
      className="runner-dialog remote-runner-dialog"
      aria-labelledby="remote-runner-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={onClose}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      <div className="runner-panel">
        <header className="runner-head">
          <div>
            <span className="eyebrow">Remote compiler / {language}</span>
            <h2 id="remote-runner-title">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={close}
            aria-label="关闭代码运行器"
          >
            <X />
          </button>
        </header>

        <div className="remote-runner-body" onKeyDown={onKeyDown}>
          <div className="remote-runner-editor">
            <CodeMirror
              value={code}
              height="320px"
              theme={oneDark}
              extensions={[language === "rust" ? rust() : java()]}
              onChange={(next) => setCode(next)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: false,
              }}
            />
          </div>

          <div className="remote-runner-toolbar">
            <p>
              代码会发送到 <strong>{provider}</strong> 编译运行，仅在点击运行时发送。
              <br />
              示例可能是片段；请补全 <code>main</code> 或完整的类，再运行。
            </p>
            <div>
              <button
                type="button"
                className="button button-ghost button-small"
                onClick={() => {
                  setCode(initialCode);
                  setResult(null);
                  setPhase("idle");
                }}
              >
                <Rotate />
                还原
              </button>
              <button
                type="button"
                className="button button-accent button-small"
                onClick={() => void run()}
                disabled={phase === "running"}
              >
                {phase === "running" ? <Loader /> : <Play />}
                {phase === "running" ? "运行中" : "运行代码"}
              </button>
            </div>
          </div>

          <div
            className={`remote-runner-output ${
              phase === "error" ? "is-error" : ""
            }`}
            aria-live="polite"
          >
            <div className="remote-runner-output-head">
              <span>
                {phase === "idle"
                  ? "OUTPUT"
                  : phase === "running"
                    ? "RUNNING"
                    : result?.ok
                      ? "SUCCESS"
                      : "ERROR"}
              </span>
              {result && result.durationMs > 0 && (
                <span>{result.durationMs} ms</span>
              )}
            </div>
            <pre>
              {phase === "idle"
                ? "运行结果会显示在这里。\n\n· Rust：需要 fn main()\n· Java：需要 public class Main 与 main 方法"
                : phase === "running"
                  ? "正在连接远程编译器…"
                  : result?.output}
            </pre>
          </div>
        </div>
      </div>
    </dialog>
  );
}
