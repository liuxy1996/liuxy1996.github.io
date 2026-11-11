import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Headphones,
  PenLine,
  Play,
  Spark,
} from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import {
  chapters,
  stats,
  totalReadingTime,
} from "@/lib/chapters";
import { formatPostDate, posts } from "@/lib/posts";
import { episodes, podcastShow } from "@/content/podcast";

const featureCards = [
  {
    number: "01",
    icon: BookOpen,
    title: "读得深一点",
    body: "从 Python 开始，留下结构清楚的笔记。AI Agent、Rust 和工程案例会接着长出来。",
    label: "READ",
    href: "/notes/",
  },
  {
    number: "02",
    icon: PenLine,
    title: "写得清楚一点",
    body: "把技术背后的判断写下来。关于 AI、语言、审美与成长，不追热点，只留下值得重读的东西。",
    label: "WRITE",
    href: "/blog/",
  },
  {
    number: "03",
    icon: Headphones,
    title: "听得远一点",
    body: "自习室电台是一档关于技术、选择与长期成长的声音杂志。第一季正在筹备。",
    label: "LISTEN",
    href: "/podcast/",
  },
];

const knowledgeTracks = [
  {
    id: "python",
    index: "01",
    label: "PYTHON",
    title: "Python 手册",
    description: "16 章从解释器到标准库，配可运行示例。",
    meta: `${chapters.length} 章 · 约 ${totalReadingTime(stats.minutes)}`,
    status: "已上线",
    tone: "green",
    href: "/book/",
  },
  {
    id: "agent",
    index: "02",
    label: "AGENT",
    title: "AI Agent 笔记",
    description: "上下文、工具、状态、评测与可靠性边界。",
    meta: "选题整理中",
    status: "筹备中",
    tone: "blue",
    href: null,
  },
  {
    id: "rust",
    index: "03",
    label: "RUST",
    title: "Rust 笔记",
    description: "从所有权与错误处理出发，重新理解系统。",
    meta: "即将开始",
    status: "筹备中",
    tone: "orange",
    href: null,
  },
  {
    id: "work",
    index: "04",
    label: "WORK",
    title: "案例与简历",
    description: "项目复盘、架构取舍，以及一份可浏览的在线简历。",
    meta: "案例收集中",
    status: "筹备中",
    tone: "purple",
    href: null,
  },
];

const codeLines = [
  [
    { kind: "keyword", text: "def" },
    { kind: "plain", text: " " },
    { kind: "function", text: "study" },
    { kind: "plain", text: "(topic):" },
  ],
  [
    { kind: "plain", text: "    " },
    { kind: "keyword", text: "for" },
    { kind: "plain", text: " mode " },
    { kind: "keyword", text: "in" },
    { kind: "plain", text: " [" },
    { kind: "string", text: '"读"' },
    { kind: "plain", text: ", " },
    { kind: "string", text: '"做"' },
    { kind: "plain", text: ", " },
    { kind: "string", text: '"讲"' },
    { kind: "plain", text: "]:" },
  ],
  [
    { kind: "plain", text: "        " },
    { kind: "function", text: "practice" },
    { kind: "plain", text: "(topic, mode)" },
  ],
  [
    { kind: "plain", text: "    " },
    { kind: "keyword", text: "return" },
    { kind: "plain", text: " " },
    { kind: "string", text: '"stay curious"' },
  ],
];

export default function HomePage() {
  const firstChapter = chapters[0];
  const middleChapter = chapters[3];

  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-hero-glow" aria-hidden="true" />
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <div className="hero-kicker">
              <span className="status-dot" />
              A PERSONAL STUDY ROOM · 2026
            </div>
            <h1>
              <span className="hero-line">为复杂的世界，</span>
              <span className="hero-line">
                留一间<span className="marker">自习室。</span>
              </span>
            </h1>
            <p className="home-hero-lede">
              一个关于代码、智能与长期成长的个人学习博客。
              这里有可以运行的 Python 手册，也将持续生长出 AI Agent、Rust 笔记、
              工程案例，以及一档认真聊天的播客。
            </p>
            <div className="home-hero-actions">
              <Link
                className="button button-accent"
                href={`/book/${firstChapter.slug}/`}
              >
                从 Python 开始
                <ArrowRight />
              </Link>
              <Link className="button button-ghost" href="/blog/">
                读读文章
              </Link>
            </div>
            <div className="home-hero-meta">
              <span>
                <strong>{stats.chapters}</strong> 章 Python 手册
              </span>
              <span>AI · Rust · 案例持续生长</span>
              <span>无需安装环境</span>
            </div>
          </div>

          <div className="home-hero-stage" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-book">
              <div className="hero-book-top">
                <span>THE STUDY ROOM / NOTES</span>
                <span>EST. 2026</span>
              </div>
              <div className="hero-book-title">
                <span>Study</span>
                <strong>自习室</strong>
              </div>
              <div className="hero-book-art">
                <span>读</span>
                <span>做</span>
                <span>讲</span>
              </div>
              <div className="hero-book-foot">
                <span>NOTES · PODCAST · CASES</span>
                <span>∞</span>
              </div>
            </div>

            <div className="hero-code-card">
              <div className="hero-code-head">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>study.py</span>
                <span className="hero-code-run">
                  <Play /> run
                </span>
              </div>
              <pre>
                {codeLines.map((line, lineIndex) => (
                  <div className="hero-code-line" key={lineIndex}>
                    <span className="line-number">{lineIndex + 1}</span>
                    <span>
                      {line.map((token, tokenIndex) => (
                        <span
                          key={tokenIndex}
                          className={
                            token.kind === "plain"
                              ? undefined
                              : `hero-token-${token.kind}`
                          }
                        >
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
              <div className="hero-output">
                <span>OUTPUT</span>
                <p>
                  &gt; stay curious<span className="cursor" />
                </p>
              </div>
            </div>

            <div className="hero-floating-note">
              <Spark />
              <span>
                保持好奇
                <br />
                慢慢变强
              </span>
            </div>
          </div>
        </div>

        <div className="container hero-bottom-line">
          <span>NOTES</span>
          <span className="hero-bottom-rule" />
          <span>ESSAYS</span>
          <span className="hero-bottom-rule" />
          <span>PODCAST</span>
          <span className="hero-bottom-rule" />
          <span>KEEP LEARNING</span>
        </div>
      </section>

      <section className="home-stats-strip">
        <div className="container home-stats-grid">
          <div>
            <strong>{stats.chapters}</strong>
            <span>章系统笔记</span>
          </div>
          <div>
            <strong>{stats.topics}</strong>
            <span>个核心知识点</span>
          </div>
          <div>
            <strong>{stats.pythonBlocks}</strong>
            <span>段可运行代码</span>
          </div>
          <div>
            <strong>01</strong>
            <span>档播客筹备中</span>
          </div>
        </div>
      </section>

      <section className="home-section home-features">
        <div className="container">
          <SectionHeading
            eyebrow="THREE PRACTICES"
            title={
              <>
                一间自习室，
                <br />
                三种<em>练习。</em>
              </>
            }
            description="读、写、听不是三条互不相干的路，而是同一件事的三个方向：把问题想得更清楚。"
          />
          <div className="feature-grid">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  className="feature-card"
                  href={feature.href}
                  key={feature.number}
                >
                  <div className="feature-topline">
                    <span>{feature.number}</span>
                    <span>{feature.label}</span>
                  </div>
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <span className="feature-arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-runner-band">
        <div className="container home-runner-grid">
          <div className="runner-band-copy">
            <span className="eyebrow eyebrow-light">RUN IT IN THE BROWSER</span>
            <h2>
              代码不是读会的，
              <br />
              是改会的。
            </h2>
            <p>
              每一段 Python 示例都可以在浏览器里打开、修改、运行。
              不请求服务器，也不会留下你的代码。理解了，再让它跑一次。
            </p>
            <div className="runner-band-actions">
              <Link className="button button-accent" href="/playground/">
                打开练习场
                <ArrowUpRight />
              </Link>
              <Link
                className="runner-band-link"
                href={`/book/${middleChapter.slug}/`}
              >
                先读控制流
                <ArrowRight />
              </Link>
            </div>
            <div className="runner-band-note">
              <span className="status-dot" />
              Pyodide · Web Worker · 本地执行
            </div>
          </div>

          <div className="runner-demo">
            <div className="runner-demo-bar">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>main.py</span>
              <span>Python 3.15</span>
            </div>
            <pre className="runner-demo-code">
              <code>
                <span className="tok-keyword">def</span>{" "}
                <span className="tok-function">greet</span>(name):{"\n"}
                {"    "}
                <span className="tok-keyword">return</span>{" "}
                <span className="tok-string">f&quot;你好，{"{name}"}！&quot;</span>
                {"\n\n"}
                <span className="tok-keyword">for</span> learner{" "}
                <span className="tok-keyword">in</span> [{" "}
                <span className="tok-string">&quot;你&quot;</span>,{" "}
                <span className="tok-string">&quot;我&quot;</span> ]:{"\n"}
                {"    "}
                <span className="tok-builtin">print</span>(
                <span className="tok-function">greet</span>(learner))
              </code>
            </pre>
            <div className="runner-demo-output">
              <div>
                <span className="output-dot" />
                OUTPUT
              </div>
              <p>你好，你！</p>
              <p>你好，我！</p>
              <span className="runner-demo-tag">运行成功 · 0.04s</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-writing">
        <div className="container">
          <SectionHeading
            eyebrow="LATEST WRITING"
            title={
              <>
                把想法写下来，
                <br />
                才有机会<em>变清楚。</em>
              </>
            }
            description="关于 AI、语言、审美与学习方式的文章。不是资讯，而是一些值得放一阵子再看的判断。"
            action={
              <Link className="text-link" href="/blog/">
                查看全部文章
                <ArrowRight />
              </Link>
            }
          />

          <div className="home-writing-grid">
            {posts.map((post, index) => (
              <Link
                className={`home-post${index === 0 ? " is-featured" : ""}`}
                href={`/blog/${post.slug}/`}
                key={post.slug}
              >
                <div className="home-post-meta">
                  <span>{post.category}</span>
                  <span>
                    {formatPostDate(post.date)} · {post.readMinutes} 分钟
                  </span>
                </div>
                <span className="home-post-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="home-post-link">
                  阅读全文
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-knowledge">
        <div className="container">
          <SectionHeading
            eyebrow="A GROWING LIBRARY"
            title={
              <>
                知识库，
                <br />
                不只<em>Python。</em>
              </>
            }
            description="从一门语言出发，慢慢把 AI、系统、工程与自己的经历放进来。每一份笔记都从真实问题里长出来。"
            action={
              <Link className="text-link" href="/notes/">
                进入知识库
                <ArrowRight />
              </Link>
            }
          />
          <div className="home-knowledge-grid">
            {knowledgeTracks.map((track) => (
              <article
                className={`home-knowledge-card part-tone-${track.tone}${
                  track.href ? " is-live" : ""
                }`}
                key={track.id}
              >
                <div className="home-knowledge-top">
                  <span>{track.index}</span>
                  <span className="home-knowledge-status">
                    {track.status}
                  </span>
                </div>
                <span className="eyebrow">{track.label}</span>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <div className="home-knowledge-foot">
                  <span>{track.meta}</span>
                  {track.href ? (
                    <Link href={track.href}>
                      进入
                      <ArrowRight />
                    </Link>
                  ) : (
                    <span className="home-knowledge-soon">还没有开门</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-podcast">
        <div className="container">
          <div className="podcast-preview">
            <div className="podcast-preview-copy">
              <div className="podcast-preview-kicker">
                <Headphones />
                {podcastShow.englishName}
              </div>
              <h2>{podcastShow.name}</h2>
              <p className="podcast-preview-tagline">
                {podcastShow.tagline}
              </p>
              <p className="podcast-preview-description">
                {podcastShow.description}
              </p>
              <div className="podcast-preview-actions">
                <Link className="button button-dark" href="/podcast/">
                  看看第一季
                  <ArrowRight />
                </Link>
                <span className="podcast-status">
                  <span className="status-dot" />
                  {podcastShow.season}
                </span>
              </div>
            </div>

            <div className="podcast-preview-visual" aria-hidden="true">
              <div className="podcast-wave">
                {Array.from({ length: 32 }, (_, index) => (
                  <span
                    key={index}
                    style={{
                      height: `${18 + ((index * 17) % 54)}px`,
                      animationDelay: `${index * 55}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="podcast-cover-line">
                <span>EP.</span>
                <strong>00</strong>
                <span>{episodes[0].title}</span>
              </div>
              <Headphones className="podcast-headphone-mark" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-final">
        <div className="container home-final-inner">
          <span className="eyebrow">START SMALL</span>
          <h2>
            今天读一篇，
            <br />
            或者写下三行代码。
          </h2>
          <p>不用一次学完。选一个现在最好奇的问题，留一点真正属于自己的理解。</p>
          <div className="home-final-actions">
            <Link className="button button-accent" href="/blog/">
              去读一篇文章
              <ArrowRight />
            </Link>
            <Link className="button button-ghost" href="/notes/">
              走进笔记库
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
