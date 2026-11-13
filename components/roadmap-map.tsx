import Link from "next/link";
import type { CSSProperties } from "react";
import {
  currentRoadmapNode,
  roadmapNodes,
  roadmapStatusLabel,
} from "@/lib/roadmap";

const desktopPath =
  "M 108 532 C 175 490 210 438 264 420 C 330 400 370 466 420 476 C 490 486 520 370 576 336 C 640 298 685 380 732 392 C 805 412 830 280 888 252 C 945 224 1000 360 1044 329 C 1040 300 930 170 840 119";
const mobilePath =
  "M 72 56 C 140 80 220 112 268 136 S 200 200 112 224 S 220 276 280 304 S 205 360 120 392 S 220 444 280 472 S 205 528 120 560 S 220 620 272 656";

export function RoadmapMap() {
  return (
    <section className="route-map" aria-labelledby="route-map-title">
      <header className="route-map-head">
        <div>
          <span className="library-kicker">LEARNING MAP</span>
          <h1 id="route-map-title">学习路线</h1>
        </div>
        <div className="route-map-current">
          <span>当前节点</span>
          <strong>{currentRoadmapNode.title}</strong>
        </div>
      </header>

      <div className="route-map-board">
        <div className="route-map-grid" aria-hidden="true" />
        <div className="route-map-vignette" aria-hidden="true" />

        <svg
          className="route-map-paths route-map-paths-desktop"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="route-path-shadow" d={desktopPath} />
          <path className="route-path-line" d={desktopPath} />
          <circle className="route-path-dot" cx="108" cy="532" r="4" />
          <circle className="route-path-dot" cx="840" cy="119" r="4" />
        </svg>

        <svg
          className="route-map-paths route-map-paths-mobile"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="route-path-shadow" d={mobilePath} />
          <path className="route-path-line" d={mobilePath} />
          <circle className="route-path-dot" cx="72" cy="56" r="4" />
          <circle className="route-path-dot" cx="272" cy="656" r="4" />
        </svg>

        {roadmapNodes.map((node) => (
          <Link
            className={`route-node is-${node.status}`}
            href={`/roadmap/${node.id}/`}
            key={node.id}
            style={
              {
                "--x": `${node.map.desktop[0]}%`,
                "--y": `${node.map.desktop[1]}%`,
                "--mx": `${node.map.mobile[0]}%`,
                "--my": `${node.map.mobile[1]}%`,
              } as CSSProperties
            }
          >
            <span className="route-node-pin">
              <span>{node.number}</span>
            </span>
            <span className="route-node-label">
              <strong>{node.shortTitle}</strong>
              <em>
                {node.status === "done"
                  ? roadmapStatusLabel.done
                  : `${roadmapStatusLabel[node.status]} · ${node.duration}`}
              </em>
            </span>
          </Link>
        ))}
      </div>

      <p className="route-map-hint">点击节点，只学这一节</p>
    </section>
  );
}
