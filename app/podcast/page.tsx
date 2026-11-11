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
    "Python 自习室的声音栏目：把编程概念讲成通勤路上也能听懂的话。第一季筹备中。",
  alternates: { canonical: "/podcast/" },
  openGraph: {
    title: "自习室电台｜Python 自习室",
    description: "把难懂的概念，讲成下班路上也能听懂的话。",
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
            这里不会逐字朗读教程，而是把一章里最容易卡住的点，讲成一个完整的故事。
          </p>
        </div>
        <div className="podcast-intro-points">
          <div>
            <span>01</span>
            <p>不做知识搬运，只讲理解路径。</p>
          </div>
          <div>
            <span>02</span>
            <p>适合通勤、走路和做家务时听。</p>
          </div>
          <div>
            <span>03</span>
            <p>每期配文字稿与对应章节，方便回看。</p>
          </div>
        </div>
      </section>

      <section className="container podcast-season" id="season-one">
        <div className="podcast-section-head">
          <div>
            <span className="eyebrow">SEASON ONE / IN PROGRESS</span>
            <h2>第一季 · 从第一行代码开始</h2>
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
          <h2>先去读一章，或者跑一段代码。</h2>
        </div>
        <div className="podcast-cta-actions">
          <Link className="button button-dark" href="/book/">
            开始学习
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
