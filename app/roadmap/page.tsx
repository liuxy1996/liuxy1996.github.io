import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { site } from "@/lib/chapters";
import {
  currentRoadmapStage,
  currentStageTasks,
  nextRoadmapStage,
  roadmapStages,
  roadmapStatusLabel,
} from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "学习路线",
  description:
    "从 Python 基础到 FastAPI、LLM Gateway、RAG、Agent 和生产化的学习路线。当前阶段：Python AI 服务。",
  alternates: { canonical: "/roadmap/" },
  openGraph: {
    title: `学习路线｜${site.name}`,
    description: "Python → FastAPI → LLM Gateway → RAG → Agent → 生产化。",
    url: "/roadmap/",
  },
};

export default function RoadmapPage() {
  return (
    <main id="main-content" className="roadmap-page">
      <header className="container roadmap-head">
        <span className="library-kicker">LEARNING ROADMAP</span>
        <h1>学习路线</h1>
        <p>
          Python 基础已完成。下一步是把 Python 变成服务，接上模型，再进入 RAG 和 Agent。
        </p>
        <div className="roadmap-head-meta">
          <span>1 / {roadmapStages.length} 完成</span>
          <span>当前：{currentRoadmapStage.title}</span>
          <span>下一阶段：{nextRoadmapStage.title}</span>
        </div>
      </header>

      <section className="container roadmap-current-card">
        <div className="roadmap-current-copy">
          <div className="roadmap-current-label">
            <span>
              <span className="status-dot" />
              当前阶段 / {currentRoadmapStage.number}
            </span>
            <span>{currentRoadmapStage.duration}</span>
          </div>
          <h2>{currentRoadmapStage.title}</h2>
          <p className="roadmap-current-sub">{currentRoadmapStage.subtitle}</p>
          <p>{currentRoadmapStage.summary}</p>
          <ol className="roadmap-task-list">
            {currentStageTasks.map((task, index) => (
              <li key={task}>
                <span>0{index + 1}</span>
                <p>{task}</p>
              </li>
            ))}
          </ol>
          <div className="roadmap-current-actions">
            <Link
              className="library-btn library-btn-light"
              href="/lab/ai-backend/#experiment-00"
            >
              从实验 00 开始
              <ArrowRight />
            </Link>
            <Link className="library-hero-link" href="/lab/ai-backend/">
              打开实验室
              <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="roadmap-current-side">
          <span className="library-kicker">ACCEPTANCE</span>
          <p>{currentRoadmapStage.deliverable}</p>
          <div className="roadmap-side-topics">
            {currentRoadmapStage.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <div className="roadmap-next">
            <span>完成后进入</span>
            <strong>{nextRoadmapStage.title}</strong>
          </div>
        </div>
      </section>

      <section className="container roadmap-stages">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">STAGES</span>
            <h2>全部阶段</h2>
          </div>
          <span className="roadmap-section-note">按产出验收，不按“看完”计算</span>
        </div>

        <div className="roadmap-stage-list">
          {roadmapStages.map((stage) => (
            <article
              className={`roadmap-stage is-${stage.status}`}
              id={stage.id}
              key={stage.id}
            >
              <div className="roadmap-stage-number">{stage.number}</div>
              <div className="roadmap-stage-copy">
                <div className="roadmap-stage-top">
                  <span className={`roadmap-stage-status is-${stage.status}`}>
                    {roadmapStatusLabel[stage.status]}
                  </span>
                  <span>{stage.duration}</span>
                </div>
                <h2>{stage.title}</h2>
                <p className="roadmap-stage-sub">{stage.subtitle}</p>
                <p>{stage.summary}</p>
                <div className="roadmap-stage-bottom">
                  <div>
                    <span className="library-kicker">验收产出</span>
                    <p>{stage.deliverable}</p>
                  </div>
                  <div>
                    <span className="library-kicker">内容</span>
                    <div className="roadmap-side-topics">
                      {stage.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="roadmap-stage-links">
                  {stage.resources.map((resource) =>
                    resource.external ? (
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={resource.href}
                      >
                        {resource.label}
                        <ArrowUpRight />
                      </a>
                    ) : (
                      <Link href={resource.href} key={resource.href}>
                        {resource.label}
                        <ArrowRight />
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="container roadmap-foot">
        <Link className="library-index-link" href="/lab/ai-backend/">
          去 AI 后端实验室
          <ArrowRight />
        </Link>
        <Link className="library-index-link" href="/notes/">
          去参考书目
          <ArrowUpRight />
        </Link>
      </div>
    </main>
  );
}
