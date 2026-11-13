import Link from "next/link";
import type { CSSProperties } from "react";
import {
  currentRoadmapNode,
  roadmapNodes,
  roadmapStatusLabel,
} from "@/lib/roadmap";

const desktopPath =
  "M 120 511 C 180 485 215 412 288 392 C 365 373 405 443 480 455 C 553 467 603 327 672 301 C 741 275 785 365 864 364 C 944 363 987 219 1056 189";
const mobilePath =
  "M 72 88 C 140 116 222 166 268 200 S 235 290 112 328 S 226 410 288 440 S 235 522 120 560 S 214 650 280 688";

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
          <circle className="route-path-dot" cx="96" cy="511" r="4" />
          <circle className="route-path-dot" cx="1056" cy="189" r="4" />
        </svg>

        <svg
          className="route-map-paths route-map-paths-mobile"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="route-path-shadow" d={mobilePath} />
          <path className="route-path-line" d={mobilePath} />
          <circle className="route-path-dot" cx="72" cy="88" r="4" />
          <circle className="route-path-dot" cx="280" cy="688" r="4" />
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
