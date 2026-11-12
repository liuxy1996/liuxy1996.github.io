export type LabModule = {
  number: string;
  title: string;
  duration: string;
  goal: string;
  output: string;
  acceptance: string[];
  topics: string[];
};

export type Lab = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  href: string;
  stack: string[];
  length: string;
  modules: LabModule[];
};

export const aiBackendLab: Lab = {
  id: "ai-backend",
  number: "01",
  title: "AI 后端工程",
  subtitle: "FastAPI · RAG · Agent · 生产化",
  description:
    "把 Python、FastAPI、模型调用、RAG 和 Agent 组合成一个可以部署、可以评测、可以观察的 AI 服务。不是为了跑一个 demo，而是为了交付一个能维护的产品。",
  status: "搭建中",
  href: "/lab/ai-backend/",
  stack: [
    "Python",
    "FastAPI",
    "Pydantic",
    "Postgres",
    "pgvector",
    "Redis",
    "OpenAI-compatible",
  ],
  length: "6 个实验 · 约 6 周",
  modules: [
    {
      number: "00",
      title: "FastAPI 服务骨架",
      duration: "第 1 周",
      goal: "先让一个流式聊天接口真正跑起来，理解异步请求、Pydantic 和 SSE。",
      output: "一个可以本地启动、可以流式输出的 /chat/stream 接口。",
      acceptance: [
        "接口有请求与响应模型",
        "客户端断开时能停止生成",
        "错误和超时有明确返回",
      ],
      topics: ["FastAPI", "Pydantic", "asyncio", "SSE"],
    },
    {
      number: "01",
      title: "LLM Gateway",
      duration: "第 2 周",
      goal: "把模型调用从业务接口里抽出来，统一处理供应商、超时、重试和成本。",
      output: "一个支持多模型、结构化输出和用量统计的模型网关。",
      acceptance: [
        "业务代码不依赖具体供应商 SDK",
        "有超时、重试上限和降级",
        "每次调用记录 token、耗时和模型",
      ],
      topics: ["模型适配", "结构化输出", "成本", "重试"],
    },
    {
      number: "02",
      title: "RAG 知识库",
      duration: "第 3 周",
      goal: "从文档到检索，再到带引用的回答，建立可评测的知识库。",
      output: "上传文档后可以检索并给出引用来源的 RAG 服务。",
      acceptance: [
        "文档入库与切分可重复执行",
        "回答返回真实引用",
        "有一组问题和检索指标",
      ],
      topics: ["Embedding", "pgvector", "混合检索", "Rerank"],
    },
    {
      number: "03",
      title: "Agent 运行时",
      duration: "第 4–5 周",
      goal: "让模型能调用工具、保存状态、请求人工确认，并留下可追踪的记录。",
      output: "一个能完成多步任务、工具受控、可回放的 Agent 服务。",
      acceptance: [
        "工具 schema 与权限边界清晰",
        "高风险动作必须人工确认",
        "每次任务都有 trace 和审计日志",
      ],
      topics: ["工具调用", "状态机", "记忆", "HITL"],
    },
    {
      number: "04",
      title: "生产化",
      duration: "第 5 周",
      goal: "补齐鉴权、限流、队列、缓存、观测和评测，让服务进入可上线状态。",
      output: "一套可以部署、可限流、可观测、可回归的 AI 服务。",
      acceptance: [
        "慢任务不阻塞请求",
        "有健康检查、指标和告警",
        "评测集可以重复运行",
      ],
      topics: ["鉴权", "队列", "OpenTelemetry", "Eval"],
    },
    {
      number: "05",
      title: "Capstone：接入自习室",
      duration: "第 6 周",
      goal: "把整条链路接回真实产品：用你的书、文章和代码示例做一个学习 Agent。",
      output: "一个带 RAG、工具调用、人工确认和前端流式体验的可演示产品。",
      acceptance: [
        "有 Demo 和架构说明",
        "有评测结果和成本数据",
        "移动端可以正常使用",
      ],
      topics: ["产品集成", "部署", "评测", "作品集"],
    },
  ],
};

export const plannedLabs = [
  {
    id: "vision-edge",
    number: "02",
    title: "视觉与边缘",
    subtitle: "YOLO · 4K · ONNX/TensorRT · Jetson",
    description:
      "从 1080p 视频管线开始，理解检测指标、数据标注和边缘推理，再把 4K 摄像头接进来。",
    status: "排队中",
    href: null,
    stack: ["Python", "OpenCV", "YOLO", "ONNX", "Jetson"],
  },
  {
    id: "physical-agent",
    number: "03",
    title: "物理世界 Agent",
    subtitle: "IoT · MQTT · 事件 · 工作流",
    description:
      "让摄像头和传感器产生事件，再由 Agent 汇总、判断、告警，最后回到真实世界的执行器。",
    status: "排队中",
    href: null,
    stack: ["MQTT", "ESP32", "Edge", "Agent"],
  },
];

export const labs = [aiBackendLab, ...plannedLabs];

export function getLab(id: string) {
  return labs.find((lab) => lab.id === id);
}
