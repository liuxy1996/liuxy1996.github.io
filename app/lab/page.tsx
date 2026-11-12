import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Terminal } from "@/components/icons";
import { aiBackendLab, plannedLabs } from "@/lib/labs";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "实验室",
  description:
    "自习室实验室：AI 后端工程、视觉与边缘、物理世界 Agent。把模型、工具和真实系统放进同一条可以运行的链路。",
  alternates: { canonical: "/lab/" },
  openGraph: {
    title: `实验室｜${site.name}`,
    description: "把模型、工具和真实系统放进同一条可以运行的链路。",
    url: "/lab/",
  },
};

export default function LabPage() {
  return (
    <main id="main-content" className="lab-page">
      <header className="container lab-index-head">
        <span className="library-kicker">APPLIED AI / EXPERIMENTS</span>
        <div className="lab-index-title">
          <h1>实验室</h1>
          <p>把模型、工具和真实系统放进同一条可以运行、可以评测的链路。</p>
        </div>
      </header>

      <section className="container lab-feature-card">
        <div className="lab-feature-copy">
          <div className="lab-feature-top">
            <span className="lab-status">
              <span className="status-dot" />
              {aiBackendLab.status}
            </span>
            <span>LAB / {aiBackendLab.number}</span>
          </div>
          <h2>{aiBackendLab.title}</h2>
          <p className="lab-feature-sub">{aiBackendLab.subtitle}</p>
          <p className="lab-feature-description">{aiBackendLab.description}</p>
          <div className="lab-stack">
            {aiBackendLab.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="lab-feature-foot">
            <Link className="library-btn library-btn-light" href={aiBackendLab.href}>
              进入实验
              <ArrowRight />
            </Link>
            <span>{aiBackendLab.length}</span>
          </div>
        </div>

        <div className="lab-feature-visual" aria-hidden="true">
          <div className="lab-terminal">
            <div className="lab-terminal-head">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>ai-service / lab-01</span>
            </div>
            <pre>
              <code>
                <span className="tok-comment"># 一条可以跑起来的 AI 服务链路</span>
                {"\n\n"}
                <span className="tok-keyword">from</span> fastapi{" "}
                <span className="tok-keyword">import</span> FastAPI{"\n"}
                <span className="tok-keyword">from</span> app.agent{" "}
                <span className="tok-keyword">import</span> run_agent{"\n\n"}
                app = FastAPI(){"\n\n"}
                <span className="tok-keyword">@app.post</span>(
                <span className="tok-string">"/chat/stream"</span>){"\n"}
                <span className="tok-keyword">async def</span>{" "}
                <span className="tok-function">chat</span>():{"\n"}
                {"    "}
                <span className="tok-keyword">return</span>{" "}
                <span className="tok-function">stream</span>(
                <span className="tok-function">run_agent</span>()){"\n\n"}
                <span className="tok-builtin">INFO</span>:  Uvicorn running on{" "}
                <span className="tok-string">:8000</span>
              </code>
            </pre>
            <div className="lab-terminal-foot">
              <span>
                <Terminal />
                localhost:8000
              </span>
              <span>SSE / async</span>
            </div>
          </div>
          <div className="lab-orbit lab-orbit-one" />
          <div className="lab-orbit lab-orbit-two" />
        </div>
      </section>

      <section className="container lab-planned">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">NEXT EXPERIMENTS</span>
            <h2>后面的实验</h2>
          </div>
          <span className="lab-planned-note">按真实项目排队，不追热点</span>
        </div>

        <div className="lab-planned-grid">
          {plannedLabs.map((lab) => (
            <article className="lab-planned-card" key={lab.id}>
              <div className="lab-planned-top">
                <span>LAB / {lab.number}</span>
                <span>{lab.status}</span>
              </div>
              <h3>{lab.title}</h3>
              <p className="lab-planned-sub">{lab.subtitle}</p>
              <p>{lab.description}</p>
              <div className="lab-stack lab-stack-muted">
                {lab.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <span className="lab-planned-foot">尚未开放</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="container lab-index-foot">
        <div>
          <span className="library-kicker">HOW THIS WORKS</span>
          <p>每个实验都必须留下可以运行的接口、可以重复的评测和一段说明。</p>
        </div>
        <Link className="library-index-link" href="/notes/">
          回到书库
          <ArrowUpRight />
        </Link>
      </footer>
    </main>
  );
}
