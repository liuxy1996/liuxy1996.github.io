#!/usr/bin/env python3
"""Generate social preview, app icons, and sitemap for the static site."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA = json.loads((ROOT / "content" / "chapters.json").read_text(encoding="utf-8"))
POSTS = json.loads((ROOT / "content" / "posts.json").read_text(encoding="utf-8"))

DARK = "#0b221a"
FOREST = "#123a2e"
LIME = "#d8ef74"
ORANGE = "#e76c3e"
CREAM = "#f7f5eb"
MUTED = "#9fb2a5"

FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
FONT_REGULAR = "C:/Windows/Fonts/msyh.ttc"
FONT_MONO = "C:/Windows/Fonts/consola.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def draw_brand_mark(draw: ImageDraw.ImageDraw, x: int, y: int, size: int) -> None:
    draw.rounded_rectangle(
        (x, y, x + size, y + size), radius=int(size * 0.23), fill=FOREST
    )
    logo_font = font(FONT_MONO, int(size * 0.4))
    draw.text((x + size * 0.19, y + size * 0.24), "sr", font=logo_font, fill=LIME)
    draw.ellipse(
        (
            x + size * 0.63,
            y + size * 0.63,
            x + size * 0.9,
            y + size * 0.9,
        ),
        fill=ORANGE,
    )


def make_og() -> None:
    image = Image.new("RGB", (1200, 630), DARK)
    draw = ImageDraw.Draw(image)

    # Subtle background grid
    for x in range(0, 1200, 54):
        draw.line((x, 0, x, 630), fill="#123027", width=1)
    for y in range(0, 630, 54):
        draw.line((0, y, 1200, y), fill="#123027", width=1)

    draw.ellipse((860, 40, 1230, 410), outline="#244b3c", width=1)
    draw.ellipse((940, 120, 1150, 330), outline="#244b3c", width=1)
    draw.ellipse((1045, 235, 1180, 370), fill=ORANGE)

    draw_brand_mark(draw, 76, 68, 58)
    draw.text(
        (150, 77),
        "自习室",
        font=font(FONT_BOLD, 28),
        fill=CREAM,
    )
    draw.text(
        (150, 113),
        "THE STUDY ROOM",
        font=font(FONT_MONO, 13),
        fill=MUTED,
    )

    draw.text(
        (76, 218),
        "为复杂的世界，",
        font=font(FONT_BOLD, 92),
        fill=CREAM,
    )
    draw.text(
        (76, 330),
        "留一间自习室。",
        font=font(FONT_BOLD, 92),
        fill=LIME,
    )

    draw.line((78, 502, 1122, 502), fill="#315043", width=1)
    draw.text(
        (78, 535),
        "技术 · 思想 · 长期成长  /  NOTES · ESSAYS · PODCAST",
        font=font(FONT_REGULAR, 20),
        fill=MUTED,
    )
    draw.text(
        (980, 532),
        "STAY CURIOUS.",
        font=font(FONT_MONO, 22),
        fill=LIME,
    )

    image.save(PUBLIC / "og.png", optimize=True)


def make_icon(size: int, filename: str) -> None:
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    pad = int(size * 0.03)
    draw.rounded_rectangle(
        (pad, pad, size - pad, size - pad),
        radius=int(size * 0.23),
        fill=FOREST,
    )
    draw.text(
        (size * 0.17, size * 0.24),
        "py",
        font=font(FONT_MONO, int(size * 0.4)),
        fill=LIME,
    )
    r = int(size * 0.135)
    cx, cy = int(size * 0.75), int(size * 0.74)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=ORANGE)
    image.save(PUBLIC / filename)


def make_sitemap() -> None:
    base = "https://liuxy1996.github.io"
    today = date.today().isoformat()
    urls = [
        "/",
        "/notes/",
        "/blog/",
        "/book/",
        "/podcast/",
        "/playground/",
        "/about/",
    ]
    for chapter in DATA["chapters"]:
        urls.append(f"/book/{chapter['slug']}/")
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
