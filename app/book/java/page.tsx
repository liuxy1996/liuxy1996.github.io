import type { Metadata } from "next";
import { LanguageBookIndex } from "@/components/language-book-index";
import { javaBook } from "@/content/java";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Java 8 手册",
  description:
    "从 JDK、对象与泛型出发，学习 Lambda、Stream、Collector、Optional、Date/Time 与 CompletableFuture。",
  alternates: { canonical: "/book/java/" },
  openGraph: {
    title: `Java 8 手册｜${site.name}`,
    description: "Lambda、Stream 与异步。基于 Java SE 8 公开文档独立整理。",
    url: "/book/java/",
  },
};

export default function JavaBookPage() {
  return <LanguageBookIndex book={javaBook} />;
}
