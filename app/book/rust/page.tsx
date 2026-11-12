import type { Metadata } from "next";
import { LanguageBookIndex } from "@/components/language-book-index";
import { rustBook } from "@/content/rust";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Rust 手册",
  description:
    "从 Cargo、类型与所有权出发的 Rust 精简手册：结构体、trait、错误处理、并发与命令行项目。",
  alternates: { canonical: "/book/rust/" },
  openGraph: {
    title: `Rust 手册｜${site.name}`,
    description: "系统、所有权与并发。基于 Rust 官方书独立整理。",
    url: "/book/rust/",
  },
};

export default function RustBookPage() {
  return <LanguageBookIndex book={rustBook} />;
}
