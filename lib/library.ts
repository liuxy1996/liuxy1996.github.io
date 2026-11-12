import type { CSSProperties } from "react";

export type LibraryBook = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  english: string;
  coverSubtitle: string;
  status: "已上架" | "筹备中";
  href: string | null;
  meta: string;
  description: string;
  topics: string[];
  cover: string;
  coverInk: string;
  coverAccent: string;
};

export const libraryBooks: LibraryBook[] = [
  {
    id: "python",
    number: "01",
    title: "Python",
    subtitle: "完全学习手册",
    english: "PYTHON",
    coverSubtitle: "完全学习手册",
    status: "已上架",
    href: "/book/",
    meta: "16 章 · 59 个知识点 · 50 段代码",
    description:
      "从解释器、数据结构到异常、类与标准库，一套可以边读边跑的 Python 心智模型。",
    topics: ["语言基础", "数据结构", "异常与类", "标准库"],
    cover: "#25221c",
    coverInk: "#f0e9dd",
    coverAccent: "#c8a974",
  },
  {
    id: "rust",
    number: "02",
    title: "Rust",
    subtitle: "系统、所有权与并发",
    english: "RUST",
    coverSubtitle: "系统、所有权\n与并发",
    status: "已上架",
    href: "/book/rust/",
    meta: "10 章 · 从所有权到命令行",
    description:
      "从 Cargo、类型与所有权出发，走到结构体、trait、错误处理、并发与一个命令行项目。",
    topics: ["所有权", "trait", "错误处理", "并发"],
    cover: "#60352d",
    coverInk: "#f4ede2",
    coverAccent: "#d7b28a",
  },
  {
    id: "java",
    number: "03",
    title: "On Java 8",
    subtitle: "对象、泛型、函数式与并发",
    english: "ON JAVA 8",
    coverSubtitle: "对象、泛型\n与并发",
    status: "已上架",
    href: "/book/java/",
    meta: "24 章 · Bruce Eckel",
    description:
      "按 Bruce Eckel《On Java 8》的目录整理：从对象、封装、复用与多态，到集合、函数式、泛型、类型信息与并发。",
    topics: ["对象模型", "泛型", "Stream", "并发"],
    cover: "#2f3b48",
    coverInk: "#f2eee5",
    coverAccent: "#c9b58e",
  },
  {
    id: "agent",
    number: "04",
    title: "AI Agent",
    subtitle: "构建可靠的智能应用",
    english: "AI AGENT",
    coverSubtitle: "构建可靠的\n智能应用",
    status: "筹备中",
    href: null,
    meta: "上下文 · 工具 · 状态 · 评测",
    description:
      "从一次模型调用，到一个能够被信任、被观测、被维护的 Agent 应用。",
    topics: ["上下文工程", "工具调用", "记忆与状态", "Agent 评测"],
    cover: "#455654",
    coverInk: "#f2eee5",
    coverAccent: "#d3c09b",
  },
  {
    id: "engineering",
    number: "05",
    title: "工程手记",
    subtitle: "系统、设计与项目复盘",
    english: "ENGINEERING",
    coverSubtitle: "系统、设计与复盘",
    status: "筹备中",
    href: null,
    meta: "架构 · 取舍 · 性能 · 复盘",
    description:
      "记录真实项目里那些不被写进语法书的设计判断与工程取舍。",
    topics: ["系统设计", "架构取舍", "性能", "项目复盘"],
    cover: "#595248",
    coverInk: "#f3eee5",
    coverAccent: "#c9b58e",
  },
];

export type CoverStyle = CSSProperties & {
  "--cover": string;
  "--cover-ink": string;
  "--cover-accent": string;
};

export function bookCoverStyle(book: LibraryBook): CoverStyle {
  return {
    "--cover": book.cover,
    "--cover-ink": book.coverInk,
    "--cover-accent": book.coverAccent,
  } as CoverStyle;
}
