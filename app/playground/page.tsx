import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Play,
  Spark,
  Terminal,
} from "@/components/icons";
import { PythonWorkbench } from "@/components/python-workbench";
import { chapters } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Python 练习室",
  description:
    "在浏览器里直接写 Python：无需安装，代码只在本机执行。适合配合书库做实验、验证语法和练习小项目。",
  alternates: { canonical: "/playground/" },
  openGraph: {
    title: "Python 练习室｜自习室",
    description: "在浏览器里写 Python，改一行，跑一下。",
    url: "/playground/",
  },
};

const starterCode = `# 欢迎来到自习室练习室
from collections import Counter

sentence = "the quick brown fox jumps over the lazy dog"
words = sentence.split()
counts = Counter(words)

for word, count in counts.most_common(3):
    print(f"{word}: {count}")

print("unique words:", len(counts))
print("try changing the sentence!")
`;

export default function PlaygroundPage() {
  return (
    <main id="main-content" className="playground-page">
      <header className="container playground-hero">
        <div>
          <span className="eyebrow">PRACTICE ROOM / PYTHON</span>
          <h1>
            Python
            <br />
            <em>练习室</em>
          </h1>
          <p className="playground-lede">
            在浏览器里写 Python。无需安装，代码只在本机执行。
          </p>
          <div className="playground-meta">
            <span>
              <Terminal />
              Python in WebAssembly
            </span>
            <span>
              <Spark />
              本地运行
            </span>
            <span>
              <Info />
              限时 6 秒
            </span>
          </div>
        </div>
        <aside className="playground-aside">
          <span className="eyebrow">BEFORE YOU RUN</span>
          <p>
            第一次运行要加载约 10 MB 的 Python 运行时，可能需要几秒。
            之后在同一页面里会快很多。
          </p>
          <div>
            <kbd>Ctrl</kbd>
            <span>+</span>
            <kbd>↵</kbd>
            <span>运行代码</span>
          </div>
        </aside>
      </header>

      <section className="container playground-workbench-wrap">
        <div className="playground-topbar">
          <div>
            <span className="status-dot" />
            <span>LIVE EDITOR</span>
          </div>
          <span>代码不会离开你的浏览器</span>
        </div>
        <PythonWorkbench initialCode={starterCode} standalone />
      </section>

      <section className="container playground-notes">
        <div>
          <span className="eyebrow">THINGS TO TRY</span>
          <h2>不知道改什么？</h2>
        </div>
        <ol>
          <li>
            把 <code>sentence</code> 换成你自己的句子，看看词频怎么变。
          </li>
          <li>
            把 <code>most_common(3)</code> 改成 <code>5</code>，观察输出。
          </li>
          <li>
            写一个 <code>for</code> 循环，打印一件今天想完成的小事。
          </li>
        </ol>
        <Link className="text-link" href="/book/">
          打开 Python 手册
          <ArrowRight />
        </Link>
      </section>

      <section className="container playground-related">
        <div className="playground-related-head">
          <span className="eyebrow">RELATED CHAPTERS</span>
          <h2>相关章节</h2>
        </div>
        <div className="playground-related-grid">
          {[chapters[2], chapters[4], chapters[6]].map((chapter) => (
            <Link key={chapter.slug} href={`/book/${chapter.slug}/`}>
              <span>第 {chapter.number} 章</span>
              <strong>{chapter.title}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
        <div className="playground-disclaimer">
          <Play />
          <p>
            适合练习标准库和纯 Python 代码。暂不支持 <code>input()</code>、
            系统命令和第三方 C 扩展。
          </p>
        </div>
      </section>
    </main>
  );
}
