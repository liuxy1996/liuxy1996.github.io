import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Headphones,
  Play,
  Spark,
  Terminal,
  Volume,
} from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import {
  chapters,
  parts,
  partRoman,
  partTone,
  stats,
  totalReadingTime,
} from "@/lib/chapters";
import { episodes, podcastShow } from "@/content/podcast";

const featureCards = [
  {
    number: "01",
    icon: BookOpen,
    title: "像书一样读",
    body: "按学习顺序重排的 16 章。短段落、代码注释和易错提醒，适合一口气读几节。",
    label: "READ",
  },
  {
    number: "02",
    icon: Terminal,
    title: "像 IDE 一样跑",
    body: "每段 Python 都能在浏览器里打开、修改、运行。不用安装 Python，也不怕把环境弄乱。",
    label: "RUN",
  },
  {
    number: "03",
    icon: Headphones,
    title: "像播客一样听",
    body: "自习室电台正在筹备。把最绕的概念留给耳朵，在通勤和散步时复盘。",
    label: "LISTEN",
  },
];

const codeLines = [
  [
    { kind: "keyword", text: "def" },
    { kind: "plain", text: " " },
    { kind: "function", text: "learn" },
    { kind: "plain", text: "(topic):" },
  ],
  [
    { kind: "plain", text: "    " },
    { kind: "keyword", text: "for" },
    { kind: "plain", text: " step " },
    { kind: "keyword", text: "in" },
    { kind: "plain", text: " [" },
    { kind: "string", text: '"读"' },
    { kind: "plain", text: ", " },
    { kind: "string", text: '"跑"' },
    { kind: "plain", text: ", " },
    { kind: "string", text: '"讲"' },
    { kind: "plain", text: "]:" },
  ],
  [
    { kind: "plain", text: "        " },
    { kind: "function", text: "practice" },
    { kind: "plain", text: "(topic, step)" },
  ],
  [
    { kind: "plain", text: "    " },
    { kind: "keyword", text: "return" },
    { kind: "plain", text: " " },
    { kind: "string", text: '"keep building"' },
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
              A FIELD GUIDE TO PYTHON · 2026
            </div>
            <h1>
              把 Python
              <br />
              学成
              <span className="marker">一门手艺。</span>
            </h1>
            <p className="home-hero-lede">
              一本可以运行代码的 Python 书，一档陪你理解编程的学习播客。
              从解释器到项目实践，按自己的节奏读完 16 章。
            </p>
            <div className="home-hero-actions">
              <Link className="button button-accent" href={`/book/${firstChapter.slug}/`}>
                从第 1 章开始
                <ArrowRight />
              </Link>
              <Link className="button button-ghost" href="/playground/">
                <Play />
                打开练习场
              </Link>
            </div>
            <div className="home-hero-meta">
              <span>
                <strong>{stats.chapters}</strong> 章完整课程
              </span>
              <span>
                <strong>{stats.pythonBlocks}</strong> 段可运行代码
              </span>
              <span>无需安装环境</span>
            </div>
          </div>

          <div className="home-hero-stage" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-book">
              <div className="hero-book-top">
                <span>PY / FIELD NOTES</span>
                <span>01—16</span>
              </div>
              <div className="hero-book-title">
                <span>Python</span>
                <strong>自习室</strong>
              </div>
              <div className="hero-book-art">
                <span>读</span>
                <span>跑</span>
                <span>听</span>
              </div>
              <div className="hero-book-foot">
                <span>A BOOK YOU CAN RUN</span>
                <span>2026</span>
              </div>
            </div>

            <div className="hero-code-card">
              <div className="hero-code-head">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>lesson.py</span>
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
                  &gt; keep building<span className="cursor" />
                </p>
              </div>
            </div>

            <div className="hero-floating-note">
              <Spark />
              <span>
                学一点
                <br />
                跑一下
              </span>
            </div>
          </div>
        </div>

        <div className="container hero-bottom-line">
          <span>01 — 16</span>
          <span className="hero-bottom-rule" />
          <span>{totalReadingTime(stats.minutes)}的完整路线</span>
          <span className="hero-bottom-rule" />
          <span>慢慢学，真的会</span>
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
            <span>段 Python 示例</span>
          </div>
          <div>
            <strong>{totalReadingTime(stats.minutes)}</strong>
            <span>的阅读旅程</span>
          </div>
        </div>
      </section>

      <section className="home-section home-features">
        <div className="container">
          <SectionHeading
            eyebrow="WHY THIS FORMAT"
            title={
              <>
                学习不是把页面读完，
                <br />
                而是让某个东西<em>跑起来</em>。
              </>
            }
            description="读书建立结构，亲手运行建立手感，声音帮助复盘。三种媒介，围绕同一份内容。"
            align="left"
          />
          <div className="feature-grid">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="feature-card" key={feature.number}>
                  <div className="feature-topline">
                    <span>{feature.number}</span>
                    <span>{feature.label}</span>
                  </div>
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
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
              把代码改一行，
              <br />
              看世界变一下。
            </h2>
            <p>
              每个代码块都带「动手运行」。Python 在本机浏览器里执行，
              不请求服务器，也不会留下你的代码。适合初学、试验和把概念跑通。
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

      <section className="home-section home-curriculum">
        <div className="container">
          <SectionHeading
            eyebrow="THE CURRICULUM"
            title={
              <>
                有顺序，
                <br />
                也有路标。
              </>
            }
            description="五个部分，十六个章节。从解释器开始，最后把学到的工具带回自己的项目。"
            action={
              <Link className="text-link" href="/book/">
                查看完整目录
                <ArrowRight />
              </Link>
            }
          />

          <div className="curriculum-preview">
            {parts.map((part, index) => {
              const partChapters = chapters.filter(
                (chapter) => chapter.partId === part.id,
              );
              return (
                <article
                  className={`part-preview part-tone-${partTone[part.id]}`}
                  key={part.id}
                >
                  <div className="part-preview-number">{partRoman[part.id]}</div>
                  <div className="part-preview-body">
                    <span className="eyebrow">{part.eyebrow}</span>
                    <h3>{part.title}</h3>
                    <p>{part.description}</p>
                    <div className="part-preview-links">
                      {partChapters.map((chapter) => (
                        <Link
                          href={`/book/${chapter.slug}/`}
                          key={chapter.slug}
                        >
                          <span>{chapter.number}</span>
                          {chapter.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <span className="part-preview-index">
                    0{index + 1}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-section home-podcast">
        <div className="container">
          <div className="podcast-preview">
            <div className="podcast-preview-copy">
              <div className="podcast-preview-kicker">
                <Volume />
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
            今天读一节，
            <br />
            也算真的开始。
          </h2>
          <p>不用一次学完。选一个现在最好奇的问题，打开下一章。</p>
          <div className="home-final-actions">
            <Link className="button button-accent" href={`/book/${firstChapter.slug}/`}>
              开始第一章
              <ArrowRight />
            </Link>
            <Link className="button button-ghost" href="/book/">
              浏览全部课程
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
