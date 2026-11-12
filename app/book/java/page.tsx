import type { Metadata } from "next";
import { LanguageBookIndex } from "@/components/language-book-index";
import { javaBook } from "@/content/java";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "On Java 8",
  description:
    "按 Bruce Eckel《On Java 8》目录整理的中文导读：对象、封装、复用、多态、集合、函数式、泛型、类型信息与并发。",
  alternates: { canonical: "/book/java/" },
  openGraph: {
    title: `On Java 8｜${site.name}`,
    description: "Bruce Eckel 的 Java 8 阅读手册：从对象模型到并发。",
    url: "/book/java/",
  },
};

export default function JavaBookPage() {
  return <LanguageBookIndex book={javaBook} />;
}
