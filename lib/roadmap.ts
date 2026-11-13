export type RoadmapStatus = "done" | "current" | "next";

export type RoadmapStep = {
  title: string;
  body?: string;
  code?: string;
  language?: "python" | "shell" | "text";
};

export type RoadmapSource = {
  label: string;
  url: string;
  note: string;
};

export type RoadmapNode = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  status: RoadmapStatus;
  goal: string;
  pycharm?: boolean;
  duration: string;
  steps: RoadmapStep[];
  acceptance: string[];
  questions?: string[];
  sources: RoadmapSource[];
  map: {
    desktop: [number, number];
    mobile: [number, number];
  };
};

export const roadmapStatusLabel: Record<RoadmapStatus, string> = {
  done: "已完成",
  current: "当前",
  next: "待开始",
};

const storageCode = `from __future__ import annotations

import json
from pathlib import Path

DATA_FILE = Path("sessions.json")


def load_sessions() -> list[dict]:
    if not DATA_FILE.exists():
        return []
    try:
        data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise RuntimeError("sessions.json 无法读取") from exc
    if not isinstance(data, list):
        raise RuntimeError("sessions.json 必须是数组")
    return data


def save_sessions(sessions: list[dict]) -> None:
    DATA_FILE.write_text(
        json.dumps(sessions, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )`;

const mainCode = `import argparse
from datetime import date

from storage import load_sessions, save_sessions


def add(args):
    sessions = load_sessions()
    sessions.append({
        "title": args.title,
        "minutes": args.minutes,
        "done": False,
        "date": str(date.today()),
    })
    save_sessions(sessions)
    print(f"已添加：{args.title}")


def list_sessions(_args):
    for index, session in enumerate(load_sessions(), 1):
        mark = "x" if session["done"] else " "
        print(f"{index:02d}. [{mark}] {session['title']} "
              f"({session['minutes']} min)")


def done(args):
    sessions = load_sessions()
    if not 1 <= args.index <= len(sessions):
        print("编号不存在")
        return
    sessions[args.index - 1]["done"] = True
    save_sessions(sessions)
    print("已完成")


def main():
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(required=True)

    p = sub.add_parser("add")
    p.add_argument("title")
    p.add_argument("--minutes", type=int, default=30)
    p.set_defaults(func=add)

    p = sub.add_parser("list")
    p.set_defaults(func=list_sessions)

    p = sub.add_parser("done")
    p.add_argument("index", type=int)
    p.set_defaults(func=done)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()`;

const testCode = `import storage


def test_roundtrip(tmp_path, monkeypatch):
    target = tmp_path / "sessions.json"
    monkeypatch.setattr(storage, "DATA_FILE", target)

    storage.save_sessions([{"title": "读 FastAPI", "done": False}])

    assert storage.load_sessions()[0]["title"] == "读 FastAPI"`;

const fastapiCode = `from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI()


class ChatRequest(BaseModel):
    prompt: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat/stream")
async def chat(payload: ChatRequest):
    async def events():
        yield f"data: 收到：{payload.prompt}\\n\\n"
        yield "data: [DONE]\\n\\n"

    return StreamingResponse(events(), media_type="text/event-stream")`;

const llmCode = `import os

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
from pydantic import BaseModel

app = FastAPI()
client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])


class ChatRequest(BaseModel):
    prompt: str


async def stream_answer(prompt: str):
    stream = await client.chat.completions.create(
        model=os.environ.get("MODEL", "your-model"),
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

const ragSql = `CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id bigserial PRIMARY KEY,
    content text NOT NULL,
    embedding vector(1536)
);

CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops);`;

const composeCode = `services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - db
  db:
    image: pgvector/pgvector:pg17
    environment:
      POSTGRES_PASSWORD: local-only
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`;

const agentCode = `TOOLS = {
    "search_notes": search_notes,
    "create_study_plan": create_study_plan,
}


async def run_agent(user_input: str):
    messages = [{"role": "user", "content": user_input}]
    for _ in range(5):
        result = await call_model(messages, tools=TOOLS)
        if not result.tool_calls:
            return result.content
        for call in result.tool_calls:
            output = await TOOLS[call.name](**call.arguments)
            messages.append({"role": "tool", "content": output})
    return "超过最大步骤，已停止"`;

export const roadmapNodes: RoadmapNode[] = [
  {
    id: "python-basics",
    number: "01",
    title: "Python 基础",
    shortTitle: "Python 基础",
    subtitle: "函数、类、文件、异常",
    status: "done",
    duration: "已完成",
    goal:
      "能独立写出几十行的 Python 程序，遇到错误会读 traceback，而不是背语法。",
    steps: [
      {
        title: "做一次自测",
        body:
          "在 PyCharm 里新建一个空项目，不查资料完成：读取一个 JSON 文件、统计列表、写一个类、捕获一次文件不存在的异常。任何一项卡住，就回到 Python 手册对应章节重做一遍。",
      },
      {
        title: "把代码组织成文件",
        body:
          "不要把所有代码塞进 main.py。至少拆成数据读写、业务逻辑和程序入口三个文件。这个习惯会直接决定你后面能不能写 FastAPI 服务。",
      },
    ],
    acceptance: [
      "能解释 list、dict、set 分别适合什么场景",
      "能写函数、类，并使用 pathlib 和 json 读写文件",
      "能读懂常见 traceback 并定位到自己的代码",
    ],
    sources: [
      {
        label: "Python Tutorial",
        url: "https://docs.python.org/3/tutorial/",
        note: "官方语言教程：数据结构、模块、异常、类与文件。",
      },
    ],
    map: {
      desktop: [9, 76],
      mobile: [18, 7],
    },
  },
  {
    id: "python-practice",
    number: "02",
    title: "Python 实战演练",
    shortTitle: "Python 实战",
    subtitle: "PyCharm · CLI · JSON · 测试",
    status: "current",
    duration: "第 1 周",
    pycharm: true,
    goal:
      "在 PyCharm 里写一个能长期使用的命令行学习记录工具，把基础语法变成完整程序。",
    steps: [
      {
        title: "新建 PyCharm 项目",
        body:
          "File → New Project，路径命名为 study-log，解释器选择 New virtual environment，Python 版本选本机 3.11+。项目建好后在 PyCharm 底部打开 Terminal。",
      },
      {
        title: "建立四个文件",
        body:
          "在项目根目录创建 storage.py、main.py、test_storage.py。storage.py 只负责读写 JSON；main.py 负责命令；测试单独放。",
        code: storageCode,
        language: "python",
      },
      {
        title: "写命令行入口",
        body:
          "复制下面的 main.py，然后在 PyCharm 右上角 Run 配置里选择 Python，脚本选 main.py。先在 Terminal 里运行，不要急着做界面。",
        code: mainCode,
        language: "python",
      },
      {
        title: "在 PyCharm 里实际跑一遍",
        body:
          "依次执行下面的命令。每次操作后打开 sessions.json 看文件有没有变化。故意输入一个不存在的编号，确认程序不会崩。",
        code: `python main.py add "完成 FastAPI 环境" --minutes 40
python main.py add "读完 Pydantic 文档" --minutes 25
python main.py list
python main.py done 1
python main.py list`,
        language: "shell",
      },
      {
        title: "补一个最小测试",
        body:
          "在 Terminal 中执行 pip install pytest，把下面代码放进 test_storage.py，然后运行 python -m pytest -q。测试通过后，这个节点才算完成。",
        code: testCode,
        language: "python",
      },
    ],
    acceptance: [
      "PyCharm 项目能在本机直接运行",
      "add / list / done 三个命令都可用",
      "sessions.json 能持久化，重新打开项目后数据还在",
      "至少一个 pytest 测试通过",
      "输入不存在的编号不会抛出未处理异常",
    ],
    sources: [
      {
        label: "pytest Docs",
        url: "https://docs.pytest.org/en/stable/",
        note: "官方测试文档：fixture、参数化和最小测试结构。",
      },
    ],
    map: {
      desktop: [22, 60],
      mobile: [67, 17],
    },
  },
  {
    id: "fastapi",
    number: "03",
    title: "FastAPI 服务",
    shortTitle: "FastAPI",
    subtitle: "路由、Pydantic、SSE",
    status: "next",
    duration: "第 2 周",
    pycharm: true,
    goal:
      "把 Python 代码变成一个 HTTP 服务：能接收请求、校验参数、返回流式响应。",
    steps: [
      {
        title: "新建 ai-service 项目",
        body:
          "在 PyCharm 新建 ai-service，使用虚拟环境。打开 Terminal 安装依赖，不要装全局 Python。",
        code: `python -m pip install "fastapi[standard]" uvicorn`,
        language: "shell",
      },
      {
        title: "创建 app/main.py",
        body:
          "先不接模型，用固定文本把 SSE 通路跑通。创建文件后粘贴下面代码，确认 /health 和 /chat/stream 都能被访问。",
        code: fastapiCode,
        language: "python",
      },
      {
        title: "配置 PyCharm 运行",
        body:
          "Run → Edit Configurations → Add New Configuration → Python。Script 选择 uvicorn，Parameters 填 app.main:app --reload --port 8000，Working directory 选项目根目录。运行后打开 http://127.0.0.1:8000/docs。",
      },
      {
        title: "先测固定流",
        body:
          "在 /docs 里调用 /chat/stream，确认返回的是 text/event-stream，并且能看到固定 token。不要在这一步接模型；先排除 HTTP 和 SSE 的问题。",
        code: `curl -N -X POST http://127.0.0.1:8000/chat/stream \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"hello"}'`,
        language: "shell",
      },
    ],
    acceptance: [
      "FastAPI 能在 PyCharm 里启动",
      "/health 返回 200",
      "/chat/stream 返回事件流而不是一次性 JSON",
      "请求模型会校验 prompt 字段",
    ],
    sources: [
      {
        label: "FastAPI Docs",
        url: "https://fastapi.tiangolo.com/",
        note: "官方文档：异步接口、依赖注入、响应与 OpenAPI。",
      },
      {
        label: "Pydantic Docs",
        url: "https://docs.pydantic.dev/latest/",
        note: "官方文档：请求模型、字段校验与类型转换。",
      },
    ],
    map: {
      desktop: [35, 68],
      mobile: [28, 28],
    },
  },
  {
    id: "llm",
    number: "04",
    title: "大模型应用",
    shortTitle: "大模型",
    subtitle: "API、结构化输出、工具与评测",
    status: "next",
    duration: "第 3–4 周",
    goal:
      "理解模型边界，能稳定地调用模型、约束输出、接入工具，并用评测而不是感觉判断效果。",
    steps: [
      {
        title: "先弄清模型边界",
        body:
          "理解 token、上下文窗口、温度、模型档位和成本。上下文越长越贵也越慢；不是所有任务都需要最大模型。先把一个请求的输入、输出和费用算清楚。",
      },
      {
        title: "配置 Key 并接上流式接口",
        body:
          "在 ai-service 的 Terminal 里安装 openai。不要硬编码 Key；在 PyCharm Run Configuration 的 Environment variables 里配置 OPENAI_API_KEY。把 .env 加入 .gitignore。",
        code: "python -m pip install openai",
        language: "shell",
      },
      {
        title: "替换为真实流式调用",
        body:
          "在 app/main.py 中使用 AsyncOpenAI 和流式响应。先只输出纯文本 token，不要加工具和 RAG。",
        code: llmCode,
        language: "python",
      },
      {
        title: "约束输出，接入工具",
        body:
          "用 JSON Schema / structured outputs 约束固定字段，用 function calling 让模型选择工具。工具 schema 要写清楚参数、边界和失败返回；不要让模型直接执行 shell。",
      },
      {
        title: "用 10 条固定问题做评测",
        body:
          "准备 10 个固定输入，记录正确性、引用完整性、延迟和 token。每次改 prompt 或换模型都重跑；没有评测集就无法判断“感觉更好”。",
      },
      {
        title: "补上安全和失败处理",
        body:
          "至少处理：Key 泄露、提示注入、敏感信息、工具越权、超时、客户端断开。把错误转换成明确的状态码和提示，而不是让请求一直挂起。",
      },
    ],
    acceptance: [
      "能解释 token、上下文、延迟和成本之间的关系",
      "结构化输出能被 Pydantic 校验",
      "至少一个工具调用成功，越权调用会失败",
      "有 10 条固定评测输入和结果记录",
      "Key 不出现在代码和 Git 历史里",
      "超时或错误时返回明确错误，客户端断开后停止生成",
    ],
    sources: [
      {
        label: "AI SDK Docs",
        url: "https://ai-sdk.dev/docs/introduction",
        note: "统一模型调用、流式 UI 与多供应商适配。",
      },
      {
        label: "Anthropic: Building effective agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
        note: "官方工程文章：简单优先、workflow 与 agent 的区别、工具设计。",
      },
      {
        label: "OWASP LLM Top 10",
        url: "https://genai.owasp.org/llm-top-10/",
        note: "提示注入、敏感信息泄露、过度授权等应用风险。",
      },
    ],
    map: {
      desktop: [48, 48],
      mobile: [70, 38],
    },
  },
  {
    id: "rag",
    number: "05",
    title: "RAG 知识库",
    shortTitle: "RAG",
    subtitle: "入库、检索、引用",
    status: "next",
    duration: "第 5 周",
    goal:
      "让模型基于自己的学习资料回答，并返回可核对的引用。",
    steps: [
      {
        title: "启动 Postgres + pgvector",
        body:
          "用 Docker 启动带 pgvector 的 Postgres。先只建 documents 表，不要做复杂分块。",
        code: ragSql,
        language: "text",
      },
      {
        title: "录入和切分文档",
        body:
          "把一篇学习笔记按小标题切成段落，生成 embedding 后写入 documents。先做十段，观察检索结果，不要一开始就处理几千个文件。",
      },
      {
        title: "写检索接口",
        body:
          "输入问题，返回前 3 段最相关内容和来源。先做向量检索，再考虑混合检索和 rerank。",
      },
      {
        title: "让回答带引用",
        body:
          "模型回答里必须包含来源编号；没有检索到内容就直接说没有，不要编造答案。",
      },
    ],
    acceptance: [
      "文档可以重复入库且不会重复插入",
      "检索能返回可定位的来源",
      "回答中的引用能在原文中找到",
      "至少有 10 个固定问题可以回归测试",
    ],
    sources: [
      {
        label: "pgvector",
        url: "https://github.com/pgvector/pgvector",
        note: "Postgres 向量类型、HNSW/IVFFlat 索引与距离运算符。",
      },
      {
        label: "FastAPI Docs",
        url: "https://fastapi.tiangolo.com/",
        note: "异步检索接口、Pydantic 响应与依赖注入。",
      },
    ],
    map: {
      desktop: [61, 56],
      mobile: [30, 49],
    },
  },
  {
    id: "agent",
    number: "06",
    title: "Agent",
    shortTitle: "Agent",
    subtitle: "工具、状态、人工确认",
    status: "next",
    duration: "第 6 周",
    goal:
      "让模型能调用受控工具完成多步任务，同时记录轨迹并支持人工确认。",
    steps: [
      {
        title: "先写两个确定性工具",
        body:
          "例如 search_notes 和 create_study_plan。工具只做明确的事，有输入校验和返回格式，不允许模型直接执行 shell。",
      },
      {
        title: "实现受控循环",
        body:
          "设置最大步骤数，每一步记录调用参数和结果；没有工具调用就结束。超过步数必须停止，不要无限循环。",
        code: agentCode,
        language: "python",
      },
      {
        title: "加人工确认",
        body:
          "删除、写入、发送消息这类动作先暂停，等用户确认后再执行。确认记录和工具结果一起写入 trace。",
      },
    ],
    acceptance: [
      "最多 5 步就会停止",
      "所有工具调用都有参数、结果和耗时记录",
      "高风险动作必须人工确认",
      "失败后能解释失败原因",
    ],
    sources: [
      {
        label: "Anthropic: Building effective agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
        note: "workflow 与 agent 的边界、工具设计、停止条件与人工检查点。",
      },
      {
        label: "Model Context Protocol",
        url: "https://modelcontextprotocol.io/docs/getting-started/intro",
        note: "把外部数据源和工具以标准协议接入 AI 应用。",
      },
      {
        label: "OWASP LLM Top 10",
        url: "https://genai.owasp.org/llm-top-10/",
        note: "过度授权、提示注入和敏感信息泄露的防护范围。",
      },
    ],
    map: {
      desktop: [74, 36],
      mobile: [70, 59],
    },
  },
  {
    id: "production",
    number: "07",
    title: "上线与生产化",
    shortTitle: "上线",
    subtitle: "部署、鉴权、限流、观测",
    status: "next",
    duration: "第 7 周",
    goal:
      "把只能在 localhost 跑的服务变成可以部署、监控、限流和回滚的线上应用。",
    steps: [
      {
        title: "把服务装进 Docker",
        body:
          "先写 Dockerfile，再用 Compose 同时启动 FastAPI 和带 pgvector 的 Postgres。环境变量只从 .env 或部署平台读取，不提交到仓库。",
        code: composeCode,
        language: "text",
      },
      {
        title: "补鉴权和配额",
        body:
          "登录放在业务后端或成熟的身份服务；API Key 只在服务端使用。按用户设置请求配额和速率限制，前端永远不接触模型 Key。",
      },
      {
        title: "记录每次请求的轨迹",
        body:
          "为每次请求生成 request id，记录模型、token、延迟、工具调用和错误。先结构化日志，再接 OpenTelemetry / trace；没有轨迹就无法排查线上问题。",
      },
      {
        title: "建立评测和回归",
        body:
          "用固定问题集在部署前跑一遍，比较答案质量、引用、延迟和成本。把 prompt 版本、模型版本和评测结果一起保存。",
      },
      {
        title: "处理部署细节",
        body:
          "反向代理要关闭 SSE 缓冲；配置健康检查、超时、HTTPS、日志采集和回滚。上线后先观察错误率和成本，再扩功能。",
      },
    ],
    acceptance: [
      "docker compose up 可以在新机器启动完整服务",
      "模型 Key 不在前端或公开仓库",
      "有按用户限流和请求配额",
      "每次请求可以按 request id 查到日志和 trace",
      "部署前能自动跑固定评测集",
    ],
    sources: [
      {
        label: "FastAPI Docs",
        url: "https://fastapi.tiangolo.com/",
        note: "部署、异步接口和 OpenAPI 官方说明。",
      },
      {
        label: "OpenTelemetry Docs",
        url: "https://opentelemetry.io/docs/",
        note: "trace、metrics、logs 的标准观测方案。",
      },
      {
        label: "OWASP LLM Top 10",
        url: "https://genai.owasp.org/llm-top-10/",
        note: "上线前需要覆盖的 LLM 应用安全风险。",
      },
    ],
    map: {
      desktop: [87, 47],
      mobile: [30, 70],
    },
  },
  {
    id: "interview",
    number: "08",
    title: "面试与作品集",
    shortTitle: "面试",
    subtitle: "项目、系统设计、问题清单",
    status: "next",
    duration: "第 8 周",
    goal:
      "把前七个节点变成两个可验证的项目，并能把技术选择、权衡和失败讲清楚。",
    steps: [
      {
        title: "先看清岗位考什么",
        body:
          "AI 应用开发通常考四层：工程基础（Python / TypeScript、SQL、API、Git）、LLM 应用（提示词、结构化输出、工具、RAG）、AI 系统设计（流式、队列、缓存、限流、观测、安全）、项目表达。你已有 Java / React / Vue / Rust，重点补 Python AI 服务和可验证项目。这是一份面试准备范围，不是某家公司的岗位 JD；真实岗位以 JD 为准。",
      },
      {
        title: "做两个能讲的项目",
        body:
          "项目一：带引用和评测的 RAG 知识库。项目二：有工具、人工确认和审计的 Agent 或 workflow。两个都要有线上地址、GitHub README、架构图、评测数据和失败案例；不要放教程克隆。",
      },
      {
        title: "把简历写成工程结果",
        body:
          "每条用“问题 → 方案 → 结果”写，带上可验证指标：首 token 延迟、检索命中率、评测通过率、单次成本、错误率。写清楚你为什么不用更复杂的 agent。",
      },
      {
        title: "准备 AI 应用系统设计",
        body:
          "练习画：客户端 → SSE → API → 队列/缓存 → 检索 → 模型 → 观测。覆盖鉴权、多租户、限流、重试、上下文控制、工具权限和成本。面试官更关心边界和失败处理，不是框架名字。",
      },
      {
        title: "准备编码与全栈题",
        body:
          "Python：异步、数据处理、文件、测试。TypeScript/React：流式 UI、状态、错误与中断。SQL：索引、分页、聚合。每天保持一小时手写代码。",
      },
      {
        title: "按问题清单自测",
        body:
          "每个问题先说结论，再说取舍和验证方式。答不出来就回到对应节点补实验，不要背术语。",
      },
    ],
    acceptance: [
      "两个项目可以公开访问并有 README",
      "每个项目有一组固定评测和至少一个失败案例",
      "能画出完整 AI 应用架构并解释取舍",
      "能现场写一个 FastAPI 接口或 React 流式组件",
      "完成一次 45 分钟模拟面试并记录改进项",
    ],
    questions: [
      "为什么这里需要 Agent，普通 workflow 不够吗？",
      "RAG 的召回质量怎么评测？chunk 和 rerank 怎么选？",
      "如何防止提示注入和工具越权？",
      "流式输出如何处理中断、超时和重复请求？",
      "上下文超限时如何压缩，如何保证关键信息不丢？",
      "如何选择模型，如何控制延迟和成本？",
      "pgvector 的索引和距离度量怎么选？",
      "线上回答错了，如何定位是检索、模型还是工具的问题？",
    ],
    sources: [
      {
        label: "Anthropic: Building effective agents",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
        note: "回答系统设计题时的 workflow/agent 边界与工具设计依据。",
      },
      {
        label: "OWASP LLM Top 10",
        url: "https://genai.owasp.org/llm-top-10/",
        note: "安全面试题的官方风险分类。",
      },
      {
        label: "AI SDK Docs",
        url: "https://ai-sdk.dev/docs/introduction",
        note: "全栈流式 UI、模型接入和前端集成参考。",
      },
      {
        label: "Latent Space",
        url: "https://www.latent.space/",
        note: "AI Engineer 访谈与行业讨论（延伸播客）。",
      },
    ],
    map: {
      desktop: [70, 17],
      mobile: [68, 82],
    },
  },
];

export const currentRoadmapNode =
  roadmapNodes.find((node) => node.status === "current") ?? roadmapNodes[1];

export const nextRoadmapNode =
  roadmapNodes.find((node) => node.status === "next") ?? roadmapNodes[2];

export function getRoadmapNode(id: string) {
  return roadmapNodes.find((node) => node.id === id);
}

export function getRoadmapNodeIndex(id: string) {
  return roadmapNodes.findIndex((node) => node.id === id);
}
