export type PodcastStatus = "文字稿" | "策划中" | "即将上线";

export type PodcastEpisode = {
  number: string;
  title: string;
  summary: string;
  duration: string;
  status: PodcastStatus;
  audioSrc?: string;
  topics: string[];
};

export const podcastShow = {
  name: "自习室电台",
  englishName: "THE STUDY ROOM PODCAST",
  season: "第一季 · 声音杂志筹备中",
  tagline: "关于技术、选择与长期成长的声音杂志。",
  description:
    "《自习室电台》不追工具热点，也不贩卖焦虑。每一期只把一个值得反复想的问题讲透：AI 与基本功、语言与世界观、Agent 与责任、工程师的审美，以及如何把学习变成长期复利。",
  host: "liuxy1996",
  feedUrl: null,
} as const;

export const episodes: PodcastEpisode[] = [
  {
    number: "00",
    title: "发刊词：别急着让 AI 写，先让自己会读",
    summary:
      "在 AI 能写代码的时代，我们为什么还要慢慢学？这一期聊聊理解、判断与长期主义。",
    duration: "阅读 4 分钟",
    status: "文字稿",
    topics: ["AI 与学习", "判断力", "基本功"],
  },
  {
    number: "01",
    title: "基本功：当生成变得便宜，判断力为什么更贵",
    summary:
      "从「会写代码」到「能判断代码」，拆开 AI 时代真正稀缺的三种能力。",
    duration: "预计 24 分钟",
    status: "策划中",
    topics: ["AI", "工程判断", "验证"],
  },
  {
    number: "02",
    title: "两种语言：从 Python 到 Rust，真正改变的是什么",
    summary:
      "语言不只是工具，它还是一套关于成本、边界和错误的假设。",
    duration: "预计 28 分钟",
    status: "策划中",
    topics: ["Python", "Rust", "系统思维"],
  },
  {
    number: "03",
    title: "Agent 不是魔法：工具、上下文与责任的边界",
    summary:
      "一个 Agent 应用真正难的地方，不在调用模型，而在如何让它在边界内可靠地行动。",
    duration: "预计 30 分钟",
    status: "策划中",
    topics: ["AI Agent", "上下文", "可靠性"],
  },
  {
    number: "04",
    title: "工程师的审美：在复杂里做减法",
    summary:
      "为什么好的接口让人安静，好的抽象让变化变便宜？聊聊软件设计里不被写进语法书的判断。",
    duration: "预计 22 分钟",
    status: "策划中",
    topics: ["设计", "抽象", "审美"],
  },
  {
    number: "05",
    title: "长期主义：把学习做成复利",
    summary:
      "不靠一时的热情，而靠一个能重复的低摩擦系统，让普通的日子也能留下东西。",
    duration: "预计 25 分钟",
    status: "策划中",
    topics: ["学习方法", "复利", "长期主义"],
  },
  {
    number: "06",
    title: "建立自己的知识系统：笔记、项目与反馈回路",
    summary:
      "从收集到验证，从笔记到作品：如何让学过的东西在需要的时候真的出现。",
    duration: "预计 26 分钟",
    status: "策划中",
    topics: ["知识管理", "项目", "反馈"],
  },
];

export const openingEssay = {
  title: "别急着让 AI 写，先让自己会读",
  paragraphs: [
    "我们很容易把学编程理解成「记住语法」。可真正进入一个项目后，语法只占很小一部分。你需要判断一段代码做了什么，为什么这样组织，出错时应该从哪里开始检查。这些能力，AI 可以帮你加速，但不能替你长出来。",
    "这个站点想做的事情很朴素：把学习重新放回自己的手里。Python 手册是起点，之后还会有 AI Agent、Rust、工程案例和更完整的项目记录。它们不是资料收藏，而是一条可以走完的路。",
    "播客是另一种复习方式。写代码的时候，你需要盯住细节；走路、洗碗或通勤的时候，反而适合想清楚一个概念为什么存在。第一季会围绕技术背后的判断展开，不急着给答案，只把问题放在更好的位置。",
    "所以，不用急着把 16 章一次读完，也不用急着让 AI 替你完成一切。选一个今天真正想弄明白的问题，打开解释器，写三行代码。慢一点，但让它真的跑起来。",
  ],
};
