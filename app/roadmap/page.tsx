import type { Metadata } from "next";
import { RoadmapMap } from "@/components/roadmap-map";
import { currentRoadmapNode } from "@/lib/roadmap";
import { site } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "学习路线",
  description:
    "从 Python 基础、PyCharm 实战、FastAPI、大模型接入、RAG 到 Agent 的学习地图。",
  alternates: { canonical: "/roadmap/" },
  openGraph: {
    title: `学习路线｜${site.name}`,
    description: `6 个节点，当前：${currentRoadmapNode.title}。`,
    url: "/roadmap/",
  },
};

export default function RoadmapPage() {
  return (
    <main id="main-content" className="route-map-page">
      <div className="container">
        <RoadmapMap />
      </div>
    </main>
  );
}
