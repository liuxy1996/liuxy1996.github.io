export type RoadmapStatus = "done" | "current" | "next";

export type RoadmapStep = {
  title: string;
  body?: string;
  code?: string;
  language?: "python" | "shell" | "text";
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
    map: {
      desktop: [10, 73],
      mobile: [18, 11],
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
    map: {
      desktop: [24, 56],
      mobile: [67, 25],
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
    map: {
      desktop: [40, 65],
      mobile: [28, 41],
    },
  },
  {
    id: "llm",
    number: "04",
    title: "大模型接入",
    shortTitle: "大模型接入",
    subtitle: "SDK、流式、超时、错误",
    status: "next",
    duration: "第 3 周",
    goal:
      "把真实模型接进 /chat/stream，并处理 Key、超时、流中断和错误返回。",
    steps: [
      {
        title: "安装 SDK 并配置 Key",
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
        title: "故意制造一次失败",
        body:
          "把 Key 改错，观察接口返回什么；再把网络断开，观察前端是否能停止。补一个超时（例如 30 秒）和统一错误响应，确认错误不会把服务进程带崩。",
      },
    ],
    acceptance: [
      "模型能流式输出中文",
      "Key 不出现在代码和 Git 历史里",
      "超时或错误时返回明确错误，而不是一直挂起",
      "客户端断开后后台不继续消耗 token",
    ],
    map: {
      desktop: [56, 43],
      mobile: [71, 56],
    },
  },
  {
    id: "rag",
    number: "05",
    title: "RAG 知识库",
    shortTitle: "RAG",
    subtitle: "入库、检索、引用",
    status: "next",
    duration: "第 4 周",
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
    map: {
      desktop: [72, 52],
      mobile: [29, 71],
    },
  },
  {
    id: "agent",
    number: "06",
    title: "Agent",
    shortTitle: "Agent",
    subtitle: "工具、状态、人工确认",
    status: "next",
    duration: "第 5–6 周",
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
    map: {
      desktop: [88, 27],
      mobile: [70, 86],
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
