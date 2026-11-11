#!/usr/bin/env python3
"""Import the standalone guide HTML into structured JSON for the Next.js site.

Usage:
    python scripts/import_guide.py ../python-quick-guide.html
"""

from __future__ import annotations

import html
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "python-quick-guide.html"
OUT = ROOT / "content" / "chapters.json"
SEARCH_OUT = ROOT / "content" / "search-index.json"

SLUGS = {
    "ch01": "before-we-start",
    "ch02": "using-the-interpreter",
    "ch03": "a-quick-tour",
    "ch04": "control-flow-and-functions",
    "ch05": "data-structures",
    "ch06": "modules",
    "ch07": "input-and-output",
    "ch08": "errors-and-exceptions",
    "ch09": "classes",
    "ch10": "the-standard-library",
    "ch11": "standard-library-two",
    "ch12": "virtual-environments",
    "ch13": "what-next",
    "ch14": "interactive-editing",
    "ch15": "floating-point",
    "ch16": "appendix",
}

PARTS = {
    "foundation": {
        "title": "起步",
        "eyebrow": "FOUNDATION",
        "description": "解释器、数字、字符串、列表，再到分支与函数。先把能反复使用的基本功练熟。",
        "chapters": {"ch01", "ch02", "ch03"},
    },
    "language": {
        "title": "语言核心",
        "eyebrow": "LANGUAGE CORE",
        "description": "让数据有结构，让代码有章法：常用容器、推导式和 Python 的表达方式。",
        "chapters": {"ch04", "ch05"},
    },
    "programs": {
        "title": "组织程序",
        "eyebrow": "PROGRAM DESIGN",
        "description": "把代码拆成模块，把错误变成可处理的情况，再用类与生成器组织复杂逻辑。",
        "chapters": {"ch06", "ch07", "ch08", "ch09"},
    },
    "toolbox": {
        "title": "工具与生态",
        "eyebrow": "TOOLBOX",
        "description": "从标准库到虚拟环境，学会在真实项目里找工具、装工具、管工具。",
        "chapters": {"ch10", "ch11", "ch12"},
    },
    "horizons": {
        "title": "继续向前",
        "eyebrow": "HORIZONS",
        "description": "交互技巧、浮点数真相与脚本模板。收好地图，然后去写自己的项目。",
        "chapters": {"ch13", "ch14", "ch15", "ch16"},
    },
}

TAG_RE = re.compile(r"<[^>]+>")
SPACE_RE = re.compile(r"\s+")


def plain(value: str) -> str:
    value = re.sub(r"<br\s*/?>", "\n", value)
    value = TAG_RE.sub("", value)
    return SPACE_RE.sub(" ", html.unescape(value)).strip()


def part_for(chapter_id: str) -> tuple[str, dict]:
    for part_id, part in PARTS.items():
        if chapter_id in part["chapters"]:
            return part_id, part
    raise ValueError(f"No part assigned for {chapter_id}")


def extract_topics(chapter_html: str) -> list[dict]:
    # Each topic chunk contains one topic, then the closing article tag.
    chunks = chapter_html.split('<article class="topic">')[1:]
    topics: list[dict] = []

    for index, raw in enumerate(chunks, start=1):
        closing = raw.find("</article>")
        if closing != -1:
            raw = raw[:closing]

        heading_match = re.search(r"<h3>(.*?)</h3>", raw, re.S)
        if not heading_match:
            continue
        heading_html = heading_match.group(1)
        tag_match = re.search(
            r'<span class="topic-tag">(.*?)</span>', heading_html, re.S
        )
        tag = plain(tag_match.group(1)) if tag_match else None
        title = plain(heading_html)
        if tag and tag not in title:
            title = re.sub(rf"\s*{re.escape(tag)}\s*$", "", title).strip()

        body = raw[heading_match.end() :]
        body_for_search = body
        code_blocks: list[dict] = []
        marker_prefix = "\n@@GUIDE_CODE_BLOCK_"

        def replace_code(match: re.Match[str]) -> str:
            head_html = match.group(1)
            lang_attr = match.group(2) or ""
            code = html.unescape(match.group(3)).strip("\n")
            label = plain(head_html).removesuffix("复制").strip() or "Code"
            if "language-python" in lang_attr or label.startswith("Python"):
                language = "python"
            elif label.startswith(("PowerShell", "Bash", "Shell", "终端", "命令行")):
                language = "shell"
            else:
                language = "text"
            block_index = len(code_blocks)
            code_blocks.append(
                {
                    "lang": language,
                    "label": label,
                    "code": code,
                }
            )
            return f"{marker_prefix}{block_index}@@\n"

        code_pattern = re.compile(
            r'<div class="codeblock">\s*'
            r'<div class="code-head">(.*?)</div>\s*'
            r'<pre><code([^>]*)>(.*?)</code></pre>\s*'
            r"</div>",
            re.S,
        )
        body = code_pattern.sub(replace_code, body)

        pieces = re.split(r"@@GUIDE_CODE_BLOCK_(\d+)@@", body)
        blocks: list[dict] = []
        for piece_index, piece in enumerate(pieces):
            if piece_index % 2 == 0:
                cleaned = piece.strip()
                if cleaned:
                    blocks.append({"type": "html", "html": cleaned})
            else:
                block = code_blocks[int(piece)]
                blocks.append({"type": "code", **block})

        search_prose = code_pattern.sub(" ", body_for_search)
        search_prose = re.sub(
            r'<span class="callout-badge">.*?</span>', "", search_prose, flags=re.S
        )
        text_for_search = " ".join(
            part
            for part in (
                plain(search_prose),
                " ".join(block["code"] for block in code_blocks),
            )
            if part
        )
        topics.append(
            {
                "id": f"topic-{index}",
                "title": title,
                "tag": tag,
                "blocks": blocks,
                "searchText": text_for_search,
            }
        )
    return topics


def main() -> None:
    document = SOURCE.read_text(encoding="utf-8")
    chapter_matches = list(
        re.finditer(r'<article class="chapter" id="(ch\d+)" data-chapter="(\d+)">', document)
    )
    if not chapter_matches:
        raise SystemExit("No chapters found in source document")

    chapters = []
    search_index = []
    total_python_blocks = 0
    total_minutes = 0
    total_topics = 0

    for index, match in enumerate(chapter_matches):
        chapter_id = match.group(1)
        number = match.group(2)
        end = (
            chapter_matches[index + 1].start()
            if index + 1 < len(chapter_matches)
            else document.find("<!-- ============ 自测")
        )
        chapter_html = document[match.start() : end]

        title_html = re.search(r"<h2>(.*?)</h2>", chapter_html, re.S).group(1)
        badge_match = re.search(r'<span class="badge[^"]*">(.*?)</span>', title_html)
        badge = plain(badge_match.group(1)) if badge_match else ""
        title = plain(re.sub(r'<span class="badge.*?</span>', "", title_html, flags=re.S))
        lede_match = re.search(r'<p class="chapter-lede">(.*?)</p>', chapter_html, re.S)
        lede = plain(lede_match.group(1)) if lede_match else ""

        meta_html = re.search(r'<div class="chapter-meta">(.*?)</div>', chapter_html, re.S)
        meta_spans = (
            [plain(x) for x in re.findall(r"<span>(.*?)</span>", meta_html.group(1), re.S)]
            if meta_html
            else []
        )
        level = meta_spans[0] if len(meta_spans) > 0 else ""
        duration = meta_spans[1] if len(meta_spans) > 1 else ""
        minutes_match = re.search(r"(\d+)", duration)
        minutes = int(minutes_match.group(1)) if minutes_match else 0

        topics = extract_topics(chapter_html)
        python_blocks = sum(
            1
            for topic in topics
            for block in topic["blocks"]
            if block["type"] == "code" and block["lang"] == "python"
        )
        total_python_blocks += python_blocks
        total_minutes += minutes
        total_topics += len(topics)

        part_id, part = part_for(chapter_id)
        record = {
            "id": chapter_id,
            "number": number,
            "order": int(number),
            "slug": SLUGS[chapter_id],
            "title": title,
            "badge": badge,
            "lede": lede,
            "level": level,
            "duration": duration,
            "minutes": minutes,
            "topicCount": len(topics),
            "pythonBlockCount": python_blocks,
            "partId": part_id,
            "partTitle": part["title"],
            "partEyebrow": part["eyebrow"],
            "topics": topics,
        }
        chapters.append(record)

        for topic in topics:
            search_index.append(
                {
                    "chapterId": chapter_id,
                    "chapterNumber": number,
                    "chapterTitle": title,
                    "chapterSlug": SLUGS[chapter_id],
                    "topicId": topic["id"],
                    "topicTitle": topic["title"],
                    "text": topic["searchText"],
                }
            )

    payload = {
        "generatedAt": date.today().isoformat(),
        "source": "Python 官方教程（中文版）第 1–16 章，经精简重排",
        "stats": {
            "chapters": len(chapters),
            "topics": total_topics,
            "pythonBlocks": total_python_blocks,
            "minutes": total_minutes,
        },
        "parts": [
            {"id": part_id, **{k: v for k, v in part.items() if k != "chapters"}}
            for part_id, part in PARTS.items()
        ],
        "chapters": chapters,
    }

    OUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    SEARCH_OUT.write_text(
        json.dumps(search_index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        f"Wrote {len(chapters)} chapters, {total_topics} topics, "
        f"{total_python_blocks} Python blocks to {OUT}"
    )


if __name__ == "__main__":
    main()
