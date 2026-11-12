import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Headphones } from "@/components/icons";
import { episodes, openingEssay, podcastShow } from "@/content/podcast";

export const metadata: Metadata = {
  title: "自习室电台",
  description:
    "一个关于技术、选择与长期成长的声音栏目。第一季从判断力开始。",
  alternates: { canonical: "/podcast/" },
  openGraph: {
    title: "自习室电台｜自习室",
    description: podcastShow.tagline,
    url: "/podcast/",
    images: [{ url: "/images/podcast.webp", width: 1200, height: 1500 }],
  },
};

export default function PodcastPage() {
  const opening = episodes[0];

  return (
    <main id="main-content" className="podcast-room">
      <header className="podcast-masthead">
        <div className="container podcast-masthead-grid">
          <div className="podcast-masthead-copy">
            <span className="library-kicker">PODCAST / SEASON ONE</span>
            <h1>
              自习室
              <span>电台</span>
            </h1>
            <p>{podcastShow.tagline}</p>
            <div className="podcast-masthead-meta">
              <span>{podcastShow.season}</span>
              <span>20—30 分钟</span>
              <span>双周</span>
            </div>
          </div>

          <figure className="podcast-masthead-media">
            <img
              src="/images/podcast.webp"
              alt="录音棚里的麦克风"
              width="1200"
              height="1500"
              fetchPriority="high"
            />
            <figcaption>
              RECORDED IN THE STUDY ROOM
              <span>2026</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="container podcast-opening">
        <div className="podcast-opening-copy">
          <span className="library-kicker">EP. 00 / OPENING NOTE</span>
          <h2>{opening.title}</h2>
          <p>{opening.summary}</p>
          <a href="#opening-essay">
            阅读文字稿
            <ArrowRight />
          </a>
        </div>
        <div className="podcast-opening-aside">
          <Headphones />
          <div>
            <span>第一季</span>
            <strong>{episodes.length} 期策划</strong>
          </div>
          <div>
            <span>音频</span>
            <strong>制作中</strong>
          </div>
        </div>
      </section>

      <section className="container podcast-room-episodes" id="season-one">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">SEASON ONE</span>
            <h2>第一季目录</h2>
          </div>
          <span className="podcast-room-status">
            <span className="status-dot" />
            筹备中
          </span>
        </div>

        <div className="podcast-room-list">
          {episodes.map((episode) => (
            <article className="podcast-room-row" key={episode.number}>
              <span className="podcast-room-number">EP. {episode.number}</span>
              <div className="podcast-room-main">
                <span className="podcast-room-meta">
                  {episode.status} / {episode.duration}
                </span>
                <h3>{episode.title}</h3>
              </div>
              <div className="podcast-room-action">
                {episode.audioSrc ? (
                  <audio controls preload="none" src={episode.audioSrc}>
                    你的浏览器不支持音频播放。
                  </audio>
                ) : episode.number === "00" ? (
                  <a href="#opening-essay">
                    文字稿
                    <ArrowRight />
                  </a>
                ) : (
                  <span>筹备中</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container podcast-essay" id="opening-essay">
        <aside className="podcast-essay-aside">
          <span className="library-kicker">TRANSCRIPT</span>
          <h2>发刊词</h2>
          <span>阅读约 4 分钟</span>
        </aside>
        <article className="podcast-essay-body">
          <h2>{openingEssay.title}</h2>
          {openingEssay.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="essay-signoff">
            <span>下一次，打开解释器见。</span>
            <span className="essay-signoff-line" />
            <strong>{podcastShow.name}</strong>
          </div>
        </article>
      </section>

      <div className="container podcast-room-foot">
        <Link href="/notes/">
          回到书库
          <ArrowRight />
        </Link>
        <Link href="/blog/">
          读文章
          <ArrowUpRight />
        </Link>
      </div>
    </main>
  );
}
