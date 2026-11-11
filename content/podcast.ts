export type PodcastStatus = "文字稿" | "录制中" | "即将上线";

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
  season: "第一季 · 筹备中",
  tagline: "把难懂的概念，讲成下班路上也能听懂的话。",
  description:
    "《自习室电台》是 Python 自习室的声音栏目。每一期围绕一个编程概念，从“为什么要学”讲到“怎么用”，再留一点时间和自己相处。",
  host: "liuxy1996",
  feedUrl: null,
} as const;

export const episodes: PodcastEpisode[] = [
  {
    number: "00",
    title: "发刊词：先成为一个能读懂代码的人",
    summary:
      "在 AI 能写代码的时代，我们为什么还要慢慢学 Python？这期发刊词聊聊理解、手感与长期主义。",
    duration: "阅读 4 分钟",
    status: "文字稿",
    topics: ["学习动机", "编程基础", "AI 与编程"],
  },
  {
    number: "01",
    title: "解释器不是魔法：从一行命令到第一段程序",
    summary:
      "从终端、交互模式到脚本运行，拆开你与 Python 之间的第一层黑盒。",
    duration: "预计 18 分钟",
    status: "即将上线",
    topics: ["解释器", "脚本", "命令行"],
  },
  {
    number: "02",
    title: "数字、字符串与列表：程序如何记住事情",
    summary:
      "数据不是抽象名词。用三种最常见的对象，理解程序怎样保存、查找和改变信息。",
    duration: "预计 24 分钟",
    status: "即将上线",
    topics: ["数字", "字符串", "列表"],
  },
  {
    number: "03",
    title: "函数不是数学：把复杂问题包起来",
    summary:
      "从重复代码到可复用的积木，聊聊参数、返回值，以及怎样给事情起一个好名字。",
    duration: "预计 22 分钟",
    status: "即将上线",
    topics: ["函数", "抽象", "可读性"],
  },
];

export const openingEssay = {
  title: "别急着让 AI 写，先让自己会读",
  paragraphs: [
    "我们很容易把学编程理解成“记住语法”。可真正进入一个项目后，语法只占很小一部分。你需要判断一段代码做了什么，为什么这样组织，出错时应该从哪里开始检查。这些能力，AI 可以帮你加速，但不能替你长出来。",
    "这张站点想做的事情很朴素：把 Python 官方教程重排成一条可以走完的路。每一章保留最重要的概念，每一段代码都尽量能直接运行，每一个坑都用注释标出来。你可以先读，再改一个值，看看结果怎么变。",
    "播客则是另一种复习方式。写代码的时候，你需要盯住细节；走路、洗碗或通勤的时候，反而适合想清楚一个概念为什么存在。等音频准备好了，我们会把每一章里最难解释的部分，单独讲给你听。",
    "所以，不用急着把 16 章一次读完。选一个今天真正想弄明白的问题，打开解释器，写三行代码。慢一点，但让它真的跑起来。",
  ],
};
