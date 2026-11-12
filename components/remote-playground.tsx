"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Play } from "@/components/icons";

const RemoteCodeDialog = dynamic(
  () =>
    import("@/components/remote-code-dialog").then(
      (module) => module.RemoteCodeDialog,
    ),
  { ssr: false },
);

const examples = {
  rust: `fn main() {
    let languages = ["Rust", "Java", "Python"];
    for language in languages {
        println!("learning {language}");
    }
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from On Java 8");
    }
}`,
} as const;

export function RemotePlayground() {
  const [language, setLanguage] = useState<"rust" | "java" | null>(null);

  return (
    <>
      <div className="remote-playground-actions">
        <button
          type="button"
          className="button button-ghost"
          onClick={() => setLanguage("rust")}
        >
          <Play />
          运行 Rust 示例
        </button>
        <button
          type="button"
          className="button button-ghost"
          onClick={() => setLanguage("java")}
        >
          <Play />
          运行 Java 示例
        </button>
      </div>

      {language && (
        <RemoteCodeDialog
          initialCode={examples[language]}
          language={language}
          title={language === "rust" ? "Rust 在线运行器" : "Java 在线运行器"}
          subtitle="可以修改示例；代码只在你点击运行时发送到远程编译器。"
          onClose={() => setLanguage(null)}
        />
      )}
    </>
  );
}
