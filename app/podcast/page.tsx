import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Headphones,
  Volume,
} from "@/components/icons";
import { openingEssay, episodes, podcastShow } from "@/content/podcast";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "自习室电台",
  description:
    "自习室的声音杂志：关于 AI 与基本功、Python 与 Rust、Agent 与责任、工程师审美与长期成长的思考。",
  alternates: { canonical: "/podcast/" },
  openGraph: {
    title: "自习室电台｜自习室",
    description: "关于技术、选择与长期成长的声音杂志。",
    url: "/podcast/",
  },
};

export default function PodcastPage() {
  return (
    <main id="main-content" className="podcast-page">
      <header className="podcast-hero">
        <div className="container podcast-hero-grid">
          <div>
            <span className="eyebrow">A PODCAST FOR PEOPLE WHO BUILD</span>
            <p className="podcast-show-label">{podcastShow.englishName}</p>
            <h1>{podcastShow.name}</h1>
            <p className="podcast-tagline">{podcastShow.tagline}</p>
            <p className="podcast-lede">{podcastShow.description}</p>
            <div className="podcast-hero-actions">
              <a className="button button-accent" href="#opening-essay">
                先读发刊词
                <ArrowRight />
              </a>
              <a className="button button-hero-ghost" href="#season-one">
                查看第一季
              </a>
            </div>
            <div className="podcast-hero-meta">
              <span>
                <span className="status-dot" />
                {podcastShow.season}
              </span>
              <span>Host · {podcastShow.host}</span>
            </div>
          </div>

          <div className="podcast-hero-art" aria-hidden="true">
            <div className="podcast-record">
              <div className="podcast-record-groove">
                <div className="podcast-record-label">
                  <span>PY / FM</span>
                  <strong>00</strong>
                  <span>STUDY ROOM</span>
                </div>
              </div>
            </div>
            <div className="podcast-hero-wave">
              {Array.from({ length: 42 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    height: `${12 + ((index * 19) % 66)}px`,
                    animationDelay: `${index * 45}ms`,
                  }}
                />
              ))}
            </div>
            <div className="podcast-now">
              <Headphones />
              <div>
                <span>NOW PREPARING</span>
                <strong>第一季正在制作中</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="container podcast-intro">
        <div className="podcast-intro-copy">
          <Volume />
          <p>
            如果书页适合建立结构，那么声音适合把结构重新想一遍。
            这里不做工具新闻，也不做成功学，而是把技术背后的选择、代价和长期问题，
            讲成一段可以通勤时听、也可以回头重读的内容。
          </p>
        </div>
        <div className="podcast-intro-points">
          <div>
            <span>01</span>
            <p>每期只留下一个值得反复想的问题。</p>
          </div>
          <div>
            <span>02</span>
            <p>技术、哲学与个人经验放在同一张桌子上。</p>
          </div>
          <div>
            <span>03</span>
            <p>不追热点，更关心明年仍然重要的东西。</p>
          </div>
        </div>
      </section>

      <section className="container podcast-format" aria-label="节目形式">
        <div className="podcast-format-head">
          <span className="eyebrow">THE FORMAT</span>
          <h2>一档有结构的声音杂志</h2>
          <p>
            不是漫谈，也不是课程朗读。每期像一篇可以听见的文章，留一点空白给思考。
          </p>
        </div>
        <div className="podcast-format-grid">
          <div>
            <span>20—30</span>
            <strong>分钟</strong>
            <p>一集只讨论一个问题，适合一次通勤或一次散步。</p>
          </div>
          <div>
            <span>3</span>
            <strong>个段落</strong>
            <p>一个概念、一段经历、一个可以带走的小行动。</p>
          </div>
          <div>
            <span>双周</span>
            <strong>更新节奏</strong>
            <p>不为了更新而更新；每期配文字稿与延伸阅读。</p>
          </div>
        </div>
      </section>

      <section className="container podcast-season" id="season-one">
        <div className="podcast-section-head">
          <div>
            <span className="eyebrow">SEASON ONE / IN PROGRESS</span>
            <h2>第一季 · 从判断力开始</h2>
          </div>
          <span className="podcast-status-pill">
            <span className="status-dot" />
            音频筹备中
          </span>
        </div>

        <div className="episode-list">
          {episodes.map((episode) => (
            <article
              className={`episode-card${
                episode.number === "00" ? " is-opening" : ""
              }`}
              key={episode.number}
            >
              <div className="episode-number">
                <span>EP.</span>
                <strong>{episode.number}</strong>
              </div>
              <div className="episode-main">
                <div className="episode-topline">
                  <span>{episode.status}</span>
                  <span>{episode.duration}</span>
                </div>
                <h3>{episode.title}</h3>
                <p>{episode.summary}</p>
                <div className="episode-tags">
                  {episode.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>
                {episode.audioSrc ? (
                  <audio controls preload="none" src={episode.audioSrc}>
                    你的浏览器不支持音频播放。
                  </audio>
                ) : (
                  <div className="episode-player-placeholder">
                    <Headphones />
                    <span>音频制作中，文字稿已就位</span>
                    {episode.number === "00" && (
                      <a href="#opening-essay">
                        阅读文字稿 <ArrowRight />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="podcast-subscribe-note">
          <div>
            <span className="eyebrow">SUBSCRIBE</span>
            <p>
              RSS 订阅会在第一期音频准备好后开放。现在可以先收藏这个页面。
            </p>
          </div>
          <button
            type="button"
            className="button button-disabled"
            disabled
            title="第一期音频上线后开放"
          >
            RSS 即将开放
          </button>
        </div>
      </section>

      <section className="container podcast-essay" id="opening-essay">
        <div className="podcast-essay-aside">
          <span className="eyebrow">EP. 00 / OPENING NOTE</span>
          <span className="essay-meta">文字稿 · 阅读约 4 分钟</span>
          <div className="essay-host">
            <span>BY</span>
            <strong>{podcastShow.host}</strong>
          </div>
        </div>
        <article className="podcast-essay-body">
          <h2>{openingEssay.title}</h2>
          {openingEssay.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="essay-signoff">
            <span>下一次，打开解释器见。</span>
            <span className="essay-signoff-line" />
            <strong>{podcastShow.name}</strong>
          </div>
        </article>
      </section>

      <section className="container podcast-cta">
        <div>
          <span className="eyebrow">WHILE YOU WAIT</span>
          <h2>先读一篇文章，或者去写一行代码。</h2>
        </div>
        <div className="podcast-cta-actions">
          <Link className="button button-dark" href="/blog/">
            去博客看看
            <ArrowRight />
          </Link>
          <a
            className="podcast-cta-link"
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            关注项目更新
            <ArrowUpRight />
          </a>
        </div>
      </section>
    </main>
  );
}
