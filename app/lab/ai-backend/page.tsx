import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Terminal } from "@/components/icons";
import { CodeBlock } from "@/components/code-block";
import { highlightCode } from "@/lib/highlight";
import { aiBackendLab } from "@/lib/labs";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "AI 后端工程实验室",
  description:
    "用 FastAPI、Pydantic、Postgres、pgvector 和 Redis，把模型调用、RAG、Agent 与生产化做成一条可以运行的 AI 服务链路。",
  alternates: { canonical: "/lab/ai-backend/" },
  openGraph: {
    title: `AI 后端工程实验室｜${site.name}`,
    description: "从流式接口到可观测的 Agent 服务。",
    url: "/lab/ai-backend/",
  },
};

const setupCode = `uv init ai-service
cd ai-service
uv add fastapi "uvicorn[standard]" openai pydantic-settings
uv run fastapi dev app/main.py`;

const streamCode = `from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel

app = FastAPI()
client = AsyncOpenAI()

class ChatRequest(BaseModel):
    prompt: str

async def stream_answer(prompt: str):
    stream = await client.chat.completions.create(
        model="your-model",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    async for chunk in stream:
        text = chunk.choices[0].delta.content
        if text:
            yield f"data: {text}\\n\\n"
    yield "data: [DONE]\\n\\n"

@app.post("/chat/stream")
async def chat(payload: ChatRequest):
    return StreamingResponse(
        stream_answer(payload.prompt),
        media_type="text/event-stream",
    )`;

const principles = [
  {
    number: "01",
    title: "能运行",
    text: "每个阶段都要有一个本地能启动的接口，而不是只留下架构图。",
  },
  {
    number: "02",
    title: "能评测",
    text: "模型、检索和 Agent 都要有一组可以重复运行的问题与指标。",
  },
  {
    number: "03",
    title: "能追踪",
    text: "记录输入、工具调用、耗时、token 和失败原因，问题才可以被定位。",
  },
  {
    number: "04",
    title: "能收权",
    text: "工具、数据和外部动作必须有权限边界，高风险步骤需要人工确认。",
  },
];

export default function AIBackendLabPage() {
  return (
    <main id="main-content" className="lab-detail-page">
      <header className="container lab-detail-head">
        <Link className="lab-back" href="/lab/">
          <ArrowLeft />
          实验室
        </Link>
        <div className="lab-detail-title">
          <span className="library-kicker">LAB / {aiBackendLab.number} / APPLIED AI</span>
          <h1>{aiBackendLab.title}</h1>
          <p className="lab-detail-sub">{aiBackendLab.subtitle}</p>
          <p className="lab-detail-description">{aiBackendLab.description}</p>
        </div>
        <div className="lab-detail-meta">
          <span>
            <span className="status-dot" />
            {aiBackendLab.status}
          </span>
          <span>{aiBackendLab.length}</span>
          <span>Python + FastAPI</span>
        </div>
        <div className="lab-detail-actions">
          <a className="library-btn library-btn-dark" href="#experiment-00">
            从实验 00 开始
            <ArrowRight />
          </a>
          <a
            className="library-index-link"
            href="https://fastapi.tiangolo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FastAPI Docs
            <ArrowUpRight />
          </a>
        </div>
      </header>

      <section className="container lab-architecture-section">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">THE SHAPE</span>
            <h2>系统边界</h2>
          </div>
          <span className="lab-section-note">业务与 AI 分层，接口保持可替换</span>
        </div>

        <div className="lab-architecture" aria-label="AI 服务架构示意">
          <div className="lab-arch-row">
            <div className="lab-arch-node">
              <span>CLIENT</span>
              <strong>React / Vue3</strong>
              <em>流式渲染、中断、重试</em>
            </div>
            <span className="lab-arch-link">HTTP / SSE →</span>
            <div className="lab-arch-node">
              <span>BUSINESS</span>
              <strong>Java / Spring Boot</strong>
              <em>鉴权、业务、计费</em>
            </div>
            <span className="lab-arch-link">internal API →</span>
            <div className="lab-arch-node is-accent">
              <span>AI SERVICE</span>
              <strong>Python / FastAPI</strong>
              <em>RAG、Agent、流式输出</em>
            </div>
          </div>
          <div className="lab-arch-row lab-arch-row-low">
            <div className="lab-arch-node">
              <span>MODEL GATEWAY</span>
              <strong>Providers</strong>
              <em>超时、重试、成本</em>
            </div>
            <div className="lab-arch-node">
              <span>STATE</span>
              <strong>Postgres / pgvector</strong>
              <em>知识、会话、引用</em>
            </div>
            <div className="lab-arch-node">
              <span>ASYNC</span>
              <strong>Redis / Queue</strong>
              <em>限流、任务、缓存</em>
            </div>
          </div>
        </div>
      </section>

      <section className="container lab-modules">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">THE EXPERIMENTS</span>
            <h2>六个实验</h2>
          </div>
          <span className="lab-section-note">每一项都有可验收的产出</span>
        </div>

        <div className="lab-module-grid">
          {aiBackendLab.modules.map((module, index) => (
            <article className="lab-module" key={module.number}>
              <div className="lab-module-top">
                <span>EXP. {module.number}</span>
                <span>{index === 0 ? "当前实验" : "待开始"}</span>
                <span>{module.duration}</span>
              </div>
              <h3>{module.title}</h3>
              <p className="lab-module-goal">{module.goal}</p>
              <div className="lab-module-output">
                <span>产出</span>
                <p>{module.output}</p>
              </div>
              <ul className="lab-module-acceptance">
                {module.acceptance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="lab-stack lab-stack-muted">
                {module.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container lab-kickoff" id="experiment-00">
        <div className="lab-kickoff-head">
          <span className="library-kicker">EXPERIMENT 00 / START</span>
          <h2>先把一个流式接口跑起来</h2>
          <p>
            这一步刻意很小：新建 Python 服务、加一个请求模型、把模型的流式 token
            转成 SSE。先把最短闭环跑通，再谈 RAG 和 Agent。
          </p>
        </div>

        <div className="lab-kickoff-grid">
          <div>
            <h3>01 / 创建服务</h3>
            <CodeBlock
              code={setupCode}
              highlightedHtml={highlightCode(setupCode, "shell")}
              language="shell"
              label="终端 · ai-service"
              context="AI 后端工程实验室 / 实验 00"
            />
          </div>
          <div>
            <h3>02 / 流式接口</h3>
            <CodeBlock
              code={streamCode}
              highlightedHtml={highlightCode(streamCode, "python")}
              language="python"
              label="app/main.py"
              context="AI 后端工程实验室 / 实验 00"
              runEnabled={false}
            />
          </div>
        </div>

        <div className="lab-kickoff-note">
          <Terminal />
          <p>
            这是最小验证，不是生产实现。接下来需要补上：错误流、客户端断开、超时、
            token 统计、模型网关、鉴权和评测。
          </p>
        </div>
      </section>

      <section className="container lab-principles">
        <div className="library-section-head">
          <div>
            <span className="library-kicker">LAB RULES</span>
            <h2>实验规则</h2>
          </div>
        </div>
        <div className="lab-principles-grid">
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="container lab-detail-foot">
        <Link className="library-index-link" href="/lab/">
          <ArrowLeft />
          返回实验室
        </Link>
        <Link className="library-index-link" href="/notes/">
          去书库
          <ArrowRight />
        </Link>
      </div>
    </main>
  );
}
