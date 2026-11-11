"use client";

import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Loader,
  Play,
  Rotate,
  Terminal,
} from "@/components/icons";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <div className="editor-loading">正在准备编辑器…</div>,
});

type RunState =
  | "idle"
  | "loading"
  | "running"
  | "success"
  | "error"
  | "timeout";

type OutputLine = {
  kind: "stdout" | "stderr" | "system";
  text: string;
};

type WorkerMessage =
  | { type: "status"; phase: "loading" | "ready" | "running" }
  | { type: "stdout" | "stderr"; text: string }
  | {
      type: "result";
      runId: number;
      ok: boolean;
      error?: string;
      durationMs: number;
    };

const INITIALIZATION_TIMEOUT = 60_000;
const EXECUTION_TIMEOUT = 6_000;

function appendChunk(current: OutputLine[], line: OutputLine): OutputLine[] {
  return [...current, line].slice(-250);
}

export function PythonWorkbench({
  initialCode,
  compact = false,
  standalone = false,
}: {
  initialCode: string;
  compact?: boolean;
  standalone?: boolean;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [runState, setRunState] = useState<RunState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const initTimerRef = useRef<number | null>(null);
  const runTimerRef = useRef<number | null>(null);
  const runIdRef = useRef(0);
  const outputRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    if (initTimerRef.current !== null) {
      window.clearTimeout(initTimerRef.current);
      initTimerRef.current = null;
    }
    if (runTimerRef.current !== null) {
      window.clearTimeout(runTimerRef.current);
      runTimerRef.current = null;
    }
  }, []);

  const terminateWorker = useCallback(() => {
    const worker = workerRef.current;
    if (worker) {
      worker.terminate();
      workerRef.current = null;
    }
    clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    return () => {
      terminateWorker();
    };
  }, [terminateWorker]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const failRun = useCallback(
    (message: string, nextState: RunState = "error") => {
      clearTimers();
      setError(message);
      setRunState(nextState);
    },
    [clearTimers],
  );

  function handleTimeout() {
    terminateWorker();
    setOutput((current) =>
      appendChunk(current, {
        kind: "system",
        text: "执行超时：Python 进程已被终止。请检查死循环或过长的计算。",
      }),
    );
    failRun("执行超过 6 秒，已终止 Python 进程。", "timeout");
  }

  function getWorker(): Worker {
    if (workerRef.current) return workerRef.current;

    const worker = new Worker("/pyodide-worker.js");
    workerRef.current = worker;

    worker.addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;

      if (message.type === "status") {
        if (message.phase === "loading") {
          setRunState("loading");
        } else if (message.phase === "running") {
          if (initTimerRef.current !== null) {
            window.clearTimeout(initTimerRef.current);
            initTimerRef.current = null;
          }
          if (runTimerRef.current !== null) {
            window.clearTimeout(runTimerRef.current);
          }
          setRunState("running");
          runTimerRef.current = window.setTimeout(
            handleTimeout,
            EXECUTION_TIMEOUT,
          );
        }
        return;
      }

      if (message.type === "stdout" || message.type === "stderr") {
        setOutput((current) =>
          appendChunk(current, { kind: message.type, text: message.text }),
        );
        return;
      }

      if (message.type === "result") {
        clearTimers();
        setDuration(message.durationMs);
        if (message.ok) {
          setRunState("success");
          setError(null);
        } else {
          setRunState("error");
          setError(message.error || "Python 执行失败");
        }
      }
    });

    worker.addEventListener("error", () => {
      failRun("Python 运行时加载失败。请检查网络后刷新页面重试。");
      terminateWorker();
    });

    return worker;
  }

  function runCode() {
    if (runState === "loading" || runState === "running") return;
    if (!code.trim()) {
      setRunState("error");
      setError("先写一点 Python 再运行。");
      return;
    }

    const worker = getWorker();
    const runId = ++runIdRef.current;
    setOutput([]);
    setError(null);
    setDuration(null);
    setRunState("loading");
    clearTimers();
    initTimerRef.current = window.setTimeout(() => {
      terminateWorker();
      failRun("Python 运行时加载超时，请检查网络后重试。");
    }, INITIALIZATION_TIMEOUT);
    worker.postMessage({ type: "run", code, runId });
  }

  function resetCode() {
    setCode(initialCode);
    setOutput([]);
    setError(null);
    setDuration(null);
    setRunState("idle");
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      runCode();
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      const area = document.createElement("textarea");
      area.value = code;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  const busy = runState === "loading" || runState === "running";
  const statusLabel =
    runState === "loading"
      ? "加载 Python 运行时"
      : runState === "running"
        ? "正在运行"
        : runState === "success"
          ? "运行完成"
          : runState === "timeout"
            ? "已超时"
            : runState === "error"
              ? "执行出错"
              : "等待运行";

  return (
    <div className={`workbench${compact ? " is-compact" : ""}`}>
      <div className="workbench-toolbar">
        <div className="workbench-file">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>lesson.py</span>
        </div>
        <div className="workbench-tools">
          <button
            type="button"
            className="workbench-tool"
            onClick={copyCode}
            aria-label="复制代码"
          >
            {copied ? <Check /> : <Copy />}
            <span>{copied ? "已复制" : "复制"}</span>
          </button>
          <button
            type="button"
            className="workbench-tool"
            onClick={resetCode}
            aria-label="重置代码"
          >
            <Rotate />
            <span>重置</span>
          </button>
        </div>
      </div>

      <div className="workbench-editor" onKeyDown={handleEditorKeyDown}>
        <CodeMirror
          value={code}
          height={compact ? "230px" : "300px"}
          theme={oneDark}
          extensions={[python()]}
          onChange={setCode}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
            autocompletion: false,
            bracketMatching: true,
            closeBrackets: true,
            indentOnInput: true,
          }}
          aria-label="Python 代码编辑器"
        />
      </div>

      <div className="workbench-runbar">
        <div className="workbench-status" data-state={runState}>
          <span className="status-dot" />
          <span>{statusLabel}</span>
          {duration !== null && <span>{duration} ms</span>}
        </div>
        <div className="workbench-run-actions">
          <span className="workbench-shortcut">
            <kbd>Ctrl</kbd>
            <span>+</span>
            <kbd>↵</kbd>
          </span>
          <button
            type="button"
            className="button button-accent run-button"
            onClick={runCode}
            disabled={busy}
          >
            {busy ? <Loader className="spin" /> : <Play />}
            {busy ? "运行中" : "运行代码"}
          </button>
        </div>
      </div>

      <div className="workbench-output">
        <div className="output-head">
          <div>
            <Terminal />
            <span>输出</span>
          </div>
          <span className="output-note">
            浏览器内执行 · 首次加载运行时较慢
          </span>
        </div>
        <div
          className="output-body"
          ref={outputRef}
          aria-live="polite"
          aria-busy={busy}
        >
          {output.length === 0 && !error && !busy && (
            <p className="output-placeholder">
              点击「运行代码」，结果会显示在这里。
            </p>
          )}
          {busy && (
            <p className="output-placeholder output-loading">
              {runState === "loading"
                ? "正在加载约 10 MB 的 Python 运行时，请稍候…"
                : "代码执行中，最长等待 6 秒…"}
            </p>
          )}
          {output.map((line, index) => (
            <pre
              key={`${line.kind}-${index}`}
              className={`output-line output-${line.kind}`}
            >
              {line.text}
            </pre>
          ))}
          {error && <pre className="output-line output-error">{error}</pre>}
          {runState === "success" && output.length === 0 && (
            <p className="output-placeholder">
              程序运行完成，但没有输出。试试用 <code>print()</code> 打印结果。
            </p>
          )}
        </div>
        <div className="workbench-output-foot">
          <span>
            支持标准库与部分纯 Python 包 · <code>input()</code> 暂不可用
          </span>
          {!standalone && (
            <a href="/playground/" target="_blank" rel="noreferrer">
              在新页面打开练习场
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
