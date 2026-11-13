import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { CodeBlock } from "@/components/code-block";
import { highlightCode } from "@/lib/highlight";
import {
  getRoadmapNode,
  getRoadmapNodeIndex,
  roadmapNodes,
  roadmapStatusLabel,
} from "@/lib/roadmap";
import { site } from "@/lib/chapters";

export function generateStaticParams() {
  return roadmapNodes.map((node) => ({ id: node.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const node = getRoadmapNode(id);
  if (!node) return { title: "学习路线" };
  return {
    title: `${node.title}｜学习路线`,
    description: node.goal,
    alternates: { canonical: `/roadmap/${node.id}/` },
    openGraph: {
      title: `${node.title}｜${site.name}`,
      description: node.goal,
      url: `/roadmap/${node.id}/`,
    },
  };
}

export default async function RoadmapNodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const node = getRoadmapNode(id);
  if (!node) notFound();

  const index = getRoadmapNodeIndex(node.id);
  const next = roadmapNodes[index + 1];

  return (
    <main id="main-content" className="route-node-page">
      <header className="container route-node-head">
        <Link className="route-node-back" href="/roadmap/">
          <ArrowLeft />
          路线地图
        </Link>

        <div className="route-node-meta">
          <span>节点 {node.number}</span>
          <span className={`route-node-state is-${node.status}`}>
            {roadmapStatusLabel[node.status]}
          </span>
          {node.pycharm && <span>PyCharm</span>}
        </div>

        <h1>{node.title}</h1>
        <p className="route-node-goal">{node.goal}</p>
      </header>

      <div className="container route-node-body">
        {node.steps.map((step, stepIndex) => (
          <section className="route-step" key={step.title}>
            <span className="route-step-number">0{stepIndex + 1}</span>
            <div className="route-step-copy">
              <h2>{step.title}</h2>
              {step.body && <p>{step.body}</p>}
              {step.code && (
                <CodeBlock
                  code={step.code}
                  highlightedHtml={highlightCode(
                    step.code,
                    step.language ?? "text",
                  )}
                  language={step.language ?? "text"}
                  label={`${node.title} · 步骤 ${stepIndex + 1}`}
                  context={`学习路线 / ${node.title}`}
                  runEnabled={false}
                />
              )}
            </div>
          </section>
        ))}

        <section className="route-acceptance">
          <span className="library-kicker">完成标准</span>
          <h2>做到这些再进入下一节点</h2>
          <ul>
            {node.acceptance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <nav className="route-next" aria-label="路线导航">
          {next ? (
            <Link href={`/roadmap/${next.id}/`}>
              下一节点：{next.title}
              <ArrowRight />
            </Link>
          ) : (
            <Link href="/roadmap/">
              回到路线地图
              <ArrowRight />
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
