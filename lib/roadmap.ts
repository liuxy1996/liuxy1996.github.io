export type RoadmapStatus = "done" | "current" | "next" | "optional";

export type RoadmapStage = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: RoadmapStatus;
  duration: string;
  summary: string;
  deliverable: string;
  topics: string[];
  resources: { label: string; href: string; external?: boolean }[];
};

export const roadmapStatusLabel: Record<RoadmapStatus, string> = {
  done: "已完成",
  current: "当前阶段",
  next: "待开始",
  optional: "以后可选",
};

export const roadmapStages: RoadmapStage[] = [
  {
    id: "foundation",
    number: "01",
    title: "Python 与编程基础",
    subtitle: "语言、数据结构、异常、文件与模块",
    status: "done",
    duration: "已完成",
    summary:
      "能读写 Python 程序，理解函数、类、异常、文件和常用标准库；不要求背语法，遇到问题能查文档解决。",
    deliverable: "完成 Python 手册的阅读与练习，能独立写一个几十行的小程序。",
    topics: ["Python", "数据结构", "函数", "类", "异常", "文件"],
    resources: [
      { label: "Python 手册", href: "/book/" },
      { label: "代码练习", href: "/playground/" },
    ],
  },
  {
    id: "python-ai-service",
    number: "02",
    title: "Python AI 服务",
    subtitle: "FastAPI、Pydantic、asyncio 与 SSE",
    status: "current",
    duration: "第 1–2 周",
    summary:
      "把 Python 代码变成一个 HTTP 服务：请求校验、异步调用、流式响应和基本错误处理。这是接大模型之前必须跑通的一层。",
    deliverable:
      "一个可以启动的 /chat/stream 接口：接收 prompt，调用模型，并以 SSE 把 token 流式返回。",
    topics: ["FastAPI", "Pydantic", "asyncio", "SSE", "httpx"],
    resources: [
      { label: "实验 00", href: "/lab/ai-backend/#experiment-00" },
      { label: "AI 后端实验室", href: "/lab/ai-backend/" },
      { label: "FastAPI Docs", href: "https://fastapi.tiangolo.com/", external: true },
    ],
  },
  {
    id: "llm-gateway",
    number: "03",
    title: "LLM Gateway",
    subtitle: "模型调用、结构化输出、超时与成本",
    status: "next",
    duration: "第 2–3 周",
    summary:
      "不要让业务接口直接依赖某个模型 SDK。把模型调用收进一层网关，统一处理供应商、流式输出、参数、超时、重试和用量统计。",
    deliverable:
      "业务代码只调用统一的 gateway；每次请求能记录模型、token、耗时和失败原因。",
    topics: ["结构化输出", "工具调用", "超时", "重试", "成本"],
    resources: [{ label: "实验 01 规划", href: "/lab/ai-backend/#experiment-00" }],
  },
  {
    id: "rag",
    number: "04",
    title: "RAG 知识库",
    subtitle: "文档入库、检索、Rerank 与引用",
    status: "next",
    duration: "第 3–4 周",
    summary:
      "让模型基于自己的资料回答，而不是只靠参数记忆。重点不是接一个向量库，而是切分、召回、排序、引用和评测。",
    deliverable:
      "上传文档后能检索并返回引用来源；有一组固定问题和检索指标可以重复运行。",
    topics: ["Embedding", "pgvector", "混合检索", "Rerank", "引用"],
    resources: [{ label: "实验 02 规划", href: "/lab/ai-backend/" }],
  },
  {
    id: "agent",
    number: "05",
    title: "Agent 运行时",
    subtitle: "工具、状态、人工确认与审计",
    status: "next",
    duration: "第 4–6 周",
    summary:
      "让模型能调用工具完成多步任务，同时保留边界：工具权限、人工确认、重试、幂等、状态恢复和完整 trace。",
    deliverable:
      "一个可以完成多步任务、工具受控、可回放的 Agent 服务。",
    topics: ["工具 schema", "状态机", "记忆", "HITL", "审计"],
    resources: [{ label: "实验 03 规划", href: "/lab/ai-backend/" }],
  },
  {
    id: "production",
    number: "06",
    title: "生产化与 Capstone",
    subtitle: "鉴权、限流、队列、观测、部署",
    status: "next",
    duration: "第 6–7 周",
    summary:
      "补齐服务真正上线需要的部分：鉴权、限流、后台任务、缓存、日志、指标、评测和部署。最后把整条链路接回自习室。",
    deliverable:
      "一个可以演示、可以测量、可以维护的 AI 学习助手，带架构说明与评测结果。",
    topics: ["鉴权", "队列", "OpenTelemetry", "Eval", "部署"],
    resources: [{ label: "实验 04 规划", href: "/lab/ai-backend/" }],
  },
  {
    id: "vision-edge",
    number: "07",
    title: "视觉与边缘",
    subtitle: "YOLO、4K、ONNX/TensorRT 与 Jetson",
    status: "optional",
    duration: "放在主线之后",
    summary:
      "只有要做 AI 摄像头、边缘视觉或物理世界 Agent 时再开始。先用 1080p 跑通视频管线，再考虑 4K、Jetson 和 IoT。",
    deliverable:
      "一个摄像头 → 检测 → 事件 → 服务端的完整链路，再决定是否接入 Agent。",
    topics: ["YOLO", "OpenCV", "ONNX", "TensorRT", "4K"],
    resources: [{ label: "实验室规划", href: "/lab/" }],
  },
];

export const currentRoadmapStage =
  roadmapStages.find((stage) => stage.status === "current") ?? roadmapStages[1];

export const nextRoadmapStage =
  roadmapStages.find((stage) => stage.status === "next") ?? roadmapStages[2];

export const currentStageTasks = [
  "新建 Python 服务，安装 FastAPI、Uvicorn、OpenAI SDK 和 Pydantic。",
  "实现 /chat/stream，用 SSE 把模型 token 流式返回。",
  "补上超时、客户端断开和错误响应，再进入 LLM Gateway。",
];
