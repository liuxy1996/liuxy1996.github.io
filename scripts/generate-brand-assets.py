#!/usr/bin/env python3
"""Generate social preview, app icons, and sitemap for the static site."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA = json.loads((ROOT / "content" / "chapters.json").read_text(encoding="utf-8"))
POSTS = json.loads((ROOT / "content" / "posts.json").read_text(encoding="utf-8"))

DARK = "#000000"
INK = "#1d1d1f"
BRASS = "#0071e3"
CREAM = "#f5f5f7"
MUTED = "#86868b"

FONT_SERIF = "C:/Windows/Fonts/georgia.ttf"
FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
FONT_REGULAR = "C:/Windows/Fonts/msyh.ttc"
FONT_SONG = "C:/Windows/Fonts/simsun.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def make_og() -> None:
    image = Image.open(PUBLIC / "images" / "library-hero.webp").convert("RGB")
    image = ImageOps.fit(image, (1200, 630), method=Image.Resampling.LANCZOS)
    image = ImageOps.grayscale(image).convert("RGB")
    image = image.filter(ImageFilter.GaussianBlur(0.25))
    shade = Image.new("RGBA", image.size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shade)
    for x in range(1200):
        alpha = int(218 - 155 * (x / 1200) ** 0.85)
        sdraw.line((x, 0, x, 630), fill=(11, 10, 8, max(alpha, 70)))
    sdraw.rectangle((0, 410, 1200, 630), fill=(11, 10, 8, 105))
    image = Image.alpha_composite(image.convert("RGBA"), shade).convert("RGB")
    draw = ImageDraw.Draw(image)

    # quiet colophon
    draw.rectangle((76, 66, 106, 101), fill="#ffffff")
    draw.text((83, 72), "自", font=font(FONT_SONG, 23), fill=INK)
    draw.text((121, 71), "自习室", font=font(FONT_BOLD, 23), fill=CREAM)
    draw.text(
        (121, 100),
        "THE STUDY ROOM",
        font=font(FONT_REGULAR, 11),
        fill=MUTED,
    )

    draw.text((76, 240), "STUDY", font=font(FONT_SERIF, 96), fill=CREAM)
    draw.text((76, 343), "ROOM", font=font(FONT_SERIF, 96), fill=CREAM)
    draw.line((78, 477, 334, 477), fill=BRASS, width=2)
    draw.ellipse((1088, 532, 1108, 552), fill=BRASS)
    draw.text(
        (76, 500),
        "A PERSONAL LIBRARY",
        font=font(FONT_REGULAR, 18),
        fill=MUTED,
    )
    draw.text(
        (76, 559),
        "BOOKS  /  LAB  /  PODCAST",
        font=font(FONT_REGULAR, 13),
        fill=MUTED,
    )
    draw.text(
        (1030, 567),
        "2026",
        font=font(FONT_REGULAR, 13),
        fill=MUTED,
    )

    image.save(PUBLIC / "og.png", optimize=True)


def make_icon(size: int, filename: str) -> None:
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    pad = int(size * 0.04)
    draw.rectangle((pad, pad, size - pad, size - pad), fill=INK)
    draw.rectangle(
        (int(size * 0.17), int(size * 0.17), int(size * 0.2), int(size * 0.83)),
        fill=BRASS,
    )
    draw.text(
        (size * 0.3, size * 0.23),
        "自",
        font=font(FONT_SONG, int(size * 0.39)),
        fill=CREAM,
    )
    image.save(PUBLIC / filename)


LANGUAGE_BOOK_ROUTES = {
    "rust": [
        "getting-started",
        "variables-and-control-flow",
        "ownership-and-borrowing",
        "structs-and-enums",
        "modules-and-errors",
        "collections-and-iterators",
        "generics-traits-lifetimes",
        "smart-pointers-and-threads",
        "testing-and-tooling",
        "cli-project",
    ],
    "java": [
        "objects",
        "installing",
        "objects-everywhere",
        "operators",
        "control-flow",
        "initialization",
        "encapsulation",
        "reuse",
        "polymorphism",
        "interfaces",
        "inner-classes",
        "collections",
        "functional-programming",
        "streams",
        "exceptions",
        "validating-code",
        "files",
        "strings",
        "type-information",
        "generics",
        "arrays",
        "enumerations",
        "annotations",
        "concurrency",
    ],
}


def make_sitemap() -> None:
    base = "https://liuxy1996.github.io"
    today = date.today().isoformat()
    urls = [
        "/",
        "/notes/",
        "/blog/",
        "/book/",
        "/lab/",
        "/lab/ai-backend/",
        "/podcast/",
        "/playground/",
        "/about/",
    ]
    for chapter in DATA["chapters"]:
        urls.append(f"/book/{chapter['slug']}/")
    for book_id, chapter_slugs in LANGUAGE_BOOK_ROUTES.items():
        urls.append(f"/book/{book_id}/")
        urls.extend(f"/book/{book_id}/{slug}/" for slug in chapter_slugs)
    for post in POSTS:
        urls.append(f"/blog/{post['slug']}/")
    entries = "\n".join(
        f"  <url><loc>{base}{url}</loc><lastmod>{today}</lastmod></url>"
        for url in urls
    )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{entries}\n"
        "</urlset>\n"
    )
    (PUBLIC / "sitemap.xml").write_text(xml, encoding="utf-8")


if __name__ == "__main__":
    make_og()
    make_icon(512, "icon-512.png")
    make_icon(192, "icon-192.png")
    make_icon(180, "apple-touch-icon.png")
    make_sitemap()
    print("Generated og.png, app icons, and sitemap.xml")
