/* global loadPyodide */
"use strict";

let pyodide = null;
let initialization = null;
let outputCharacters = 0;
let activeRunId = null;

const MAX_OUTPUT_CHARACTERS = 30000;

function post(message) {
  self.postMessage(message);
}

function resetOutput() {
  outputCharacters = 0;
}

function sendStream(type, text) {
  if (outputCharacters >= MAX_OUTPUT_CHARACTERS) return;
  const remaining = MAX_OUTPUT_CHARACTERS - outputCharacters;
  const value = String(text);
  const visible = value.slice(0, remaining);
  outputCharacters += visible.length;
  post({ type, text: visible });
  if (visible.length < value.length) {
    post({
      type: "stderr",
      text: "\n[输出过长，已截断]\n",
    });
  }
}

function formatError(error) {
  if (!error) return "Unknown Python error";
  if (typeof error === "string") return error;
  if (typeof error.message === "string") return error.message;
  return String(error);
}

async function getRuntime() {
  if (pyodide) return pyodide;
  if (initialization) return initialization;

  initialization = (async () => {
    post({ type: "status", phase: "loading" });
    const workerBase = new URL("./", self.location.href);
    const pyodideBase = new URL("pyodide/", workerBase).href;
    importScripts(new URL("pyodide/pyodide.js", workerBase).href);
    const runtime = await loadPyodide({ indexURL: pyodideBase });
    runtime.setStdout({
      batched: (text) => sendStream("stdout", text),
    });
    runtime.setStderr({
      batched: (text) => sendStream("stderr", text),
    });
    pyodide = runtime;
    post({ type: "status", phase: "ready" });
    return runtime;
  })();

  try {
    return await initialization;
  } finally {
    initialization = null;
  }
}

self.onmessage = async (event) => {
  const data = event.data;
  if (!data || data.type !== "run") return;

  activeRunId = data.runId;
  resetOutput();

  try {
    const runtime = await getRuntime();
    if (activeRunId !== data.runId) return;

    post({ type: "status", phase: "running" });
    const started = performance.now();
    const globals = runtime.globals.get("dict")();
    globals.set("__name__", "__main__");

    try {
      await runtime.runPythonAsync(data.code, {
        globals,
        filename: "<lesson>",
      });
    } finally {
      globals.destroy();
    }

    post({
      type: "result",
      runId: data.runId,
      ok: true,
      durationMs: Math.round(performance.now() - started),
    });
  } catch (error) {
    post({
      type: "result",
      runId: data.runId,
      ok: false,
      error: formatError(error),
      durationMs: 0,
    });
  }
};
