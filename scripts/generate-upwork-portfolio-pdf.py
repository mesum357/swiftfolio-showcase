#!/usr/bin/env python3
"""Generate an Upwork-ready interactive portfolio PDF for Mesum Abbas."""

from __future__ import annotations

import io
import os
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = ROOT / "portfolio"
FONTS = Path(__file__).resolve().parent / "pdf-assets" / "fonts"
OUT = ROOT / "outputs" / "Mesum_Abbas_Upwork_Portfolio.pdf"

# Brand tokens (mesumabbas.online)
BG = HexColor("#FCFBF9")
BG_ALT = HexColor("#F2F1EC")
FG = HexColor("#23272E")
FG_BOLD = HexColor("#0E1116")
FG_LIGHT = HexColor("#545A63")
ACCENT = HexColor("#1B2FBF")
ACCENT_DARK = HexColor("#16249C")
SIGNAL = HexColor("#9A5600")
SIGNAL_MARK = HexColor("#E8930C")
BORDER = HexColor("#D8D6CF")
ON_ACCENT = white

PAGE_W, PAGE_H = A4
MARGIN = 16 * mm


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Display", str(FONTS / "BricolageGrotesque-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Body", str(FONTS / "Newsreader-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("BodyItalic", str(FONTS / "Newsreader-Italic.ttf")))
    # UI labels — Segoe UI is crisp on Windows for meta text
    segoe = Path(r"C:\Windows\Fonts\segoeuib.ttf")
    segoe_reg = Path(r"C:\Windows\Fonts\segoeui.ttf")
    if segoe.exists():
        pdfmetrics.registerFont(TTFont("UIBold", str(segoe)))
    else:
        pdfmetrics.registerFont(TTFont("UIBold", str(FONTS / "BricolageGrotesque-Bold.ttf")))
    if segoe_reg.exists():
        pdfmetrics.registerFont(TTFont("UI", str(segoe_reg)))
    else:
        pdfmetrics.registerFont(TTFont("UI", str(FONTS / "Newsreader-Regular.ttf")))


def soft_image(path: Path, max_w: int, max_h: int) -> ImageReader:
    """Load, crop to cover, compress for PDF size."""
    img = Image.open(path).convert("RGB")
    src_w, src_h = img.size
    target_ratio = max_w / max_h
    src_ratio = src_w / src_h
    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target_ratio)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, src_w, top + new_h))
    img = img.resize((max_w, max_h), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=82, optimize=True)
    buf.seek(0)
    return ImageReader(buf)


def draw_paper(c: canvas.Canvas) -> None:
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # Atmospheric wash — top-right ultramarine mist
    c.saveState()
    c.setFillColor(Color(0.106, 0.184, 0.749, alpha=0.06))
    c.circle(PAGE_W - 20 * mm, PAGE_H - 15 * mm, 55 * mm, fill=1, stroke=0)
    c.setFillColor(Color(0.910, 0.576, 0.047, alpha=0.05))
    c.circle(25 * mm, 30 * mm, 45 * mm, fill=1, stroke=0)
    c.restoreState()


def hairline(c: canvas.Canvas, x1: float, y1: float, x2: float, y2: float, color=BORDER) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(0.6)
    c.line(x1, y1, x2, y2)


def link_rect(c: canvas.Canvas, x: float, y: float, w: float, h: float, url: str) -> None:
    c.linkURL(url, (x, y, x + w, y + h), relative=0)


def draw_button(
    c: canvas.Canvas,
    x: float,
    y: float,
    w: float,
    h: float,
    label: str,
    url: str,
    *,
    filled: bool = True,
) -> None:
    if filled:
        c.setFillColor(ACCENT)
        c.roundRect(x, y, w, h, 2, fill=1, stroke=0)
        c.setFillColor(ON_ACCENT)
    else:
        c.setStrokeColor(ACCENT)
        c.setLineWidth(1.2)
        c.roundRect(x, y, w, h, 2, fill=0, stroke=1)
        c.setFillColor(ACCENT)
    c.setFont("UIBold", 9)
    c.drawCentredString(x + w / 2, y + h / 2 - 3, label)
    link_rect(c, x, y, w, h, url)


def footer(c: canvas.Canvas, page: int, total: int) -> None:
    y = 10 * mm
    hairline(c, MARGIN, y + 6 * mm, PAGE_W - MARGIN, y + 6 * mm)
    c.setFillColor(FG_LIGHT)
    c.setFont("UI", 7.5)
    c.drawString(MARGIN, y, "Mesum Abbas  ·  Full Stack Developer")
    c.drawRightString(PAGE_W - MARGIN, y, f"{page} / {total}")
    # Clickable site in footer
    site = "mesumabbas.online"
    tw = c.stringWidth(site, "UI", 7.5)
    mid = PAGE_W / 2
    c.setFillColor(ACCENT)
    c.drawCentredString(mid, y, site)
    link_rect(c, mid - tw / 2 - 2, y - 2, tw + 4, 10, "https://mesumabbas.online/")


PROJECTS = [
    {
        "title": "Nuvisa",
        "tag": "SaaS · UK",
        "blurb": "Visa & immigration platform with conversion-focused pathways for applicants and advisors.",
        "stack": "React · TypeScript · Node.js",
        "url": "https://www.nuvisa.co.uk/",
        "image": PORTFOLIO / "Screenshot 2026-09-10 220852.png",
    },
    {
        "title": "Blessed HHC",
        "tag": "Healthcare · Org",
        "blurb": "Home healthcare advocacy site — services, process, and clear CTAs for families.",
        "stack": "React · TypeScript · CMS",
        "url": "https://www.blessedhhc.org/",
        "image": PORTFOLIO / "blessed.png",
    },
    {
        "title": "Calculator All",
        "tag": "SaaS · Tools",
        "blurb": "Multi-tool calculator hub optimized for speed, clarity, and mobile use.",
        "stack": "React · TypeScript · Vite · SEO",
        "url": "https://calculator1.org/",
        "image": PORTFOLIO / "calculator.png",
    },
    {
        "title": "Edunia",
        "tag": "Platform · Community",
        "blurb": "Community and opportunity platform connecting people and businesses.",
        "stack": "React · Node.js · MongoDB",
        "url": "https://www.edunia.org/",
        "image": PORTFOLIO / "edunia.png",
    },
    {
        "title": "Glacier Cold Storage POS",
        "tag": "POS · Ops",
        "blurb": "Inventory and sales dashboard built for cold-storage floor operations.",
        "stack": "React · TypeScript · Node.js",
        "url": "https://glacier-cold-storage.vercel.app/",
        "image": PORTFOLIO / "glacier.png",
    },
    {
        "title": "Mountain Resort Birgal",
        "tag": "Hospitality · Web",
        "blurb": "Lodge and trout-farm marketing site with rooms, dining, and travel guidance.",
        "stack": "WordPress · SEO · Performance",
        "url": "https://mountainresortbirgalvalley.com/",
        "image": PORTFOLIO / "mountain  resort.png",
    },
]


def page_cover(c: canvas.Canvas, total: int) -> None:
    draw_paper(c)

    # Top brand bar
    c.setFillColor(FG_BOLD)
    c.rect(0, PAGE_H - 8 * mm, PAGE_W, 8 * mm, fill=1, stroke=0)
    c.setFillColor(SIGNAL_MARK)
    c.rect(0, PAGE_H - 8 * mm, 18 * mm, 8 * mm, fill=1, stroke=0)
    c.setFillColor(ON_ACCENT)
    c.setFont("UI", 7.5)
    c.drawString(MARGIN, PAGE_H - 5.2 * mm, "UPWORK PORTFOLIO  ·  SELECTED WORK")

    # Brand mark block
    y = PAGE_H - 38 * mm
    c.setFillColor(ACCENT)
    c.setFont("UIBold", 8)
    c.drawString(MARGIN, y + 14 * mm, "MESUM ABBAS")
    hairline(c, MARGIN, y + 11 * mm, MARGIN + 28 * mm, y + 11 * mm, ACCENT)

    c.setFillColor(FG_BOLD)
    c.setFont("Display", 36)
    # Split headline for impact
    c.drawString(MARGIN, y - 2 * mm, "Full stack products")
    c.drawString(MARGIN, y - 16 * mm, "that ship.")

    c.setFillColor(FG)
    c.setFont("Body", 12)
    text = (
        "Solo Next.js / React / Node.js developer for SaaS, MVPs, "
        "dashboards, and production web apps."
    )
    # Wrap manually
    max_w = PAGE_W - 2 * MARGIN - 55 * mm
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if c.stringWidth(trial, "Body", 12) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    ty = y - 28 * mm
    for line in lines:
        c.drawString(MARGIN, ty, line)
        ty -= 5.5 * mm

    # CTA group
    btn_y = ty - 10 * mm
    draw_button(c, MARGIN, btn_y, 40 * mm, 9 * mm, "Open portfolio →", "https://mesumabbas.online/")
    draw_button(
        c,
        MARGIN + 44 * mm,
        btn_y,
        36 * mm,
        9 * mm,
        "Upwork profile",
        "https://www.upwork.com/freelancers/~01786c6c8ccb9f4d9c",
        filled=False,
    )
    draw_button(
        c,
        MARGIN + 84 * mm,
        btn_y,
        28 * mm,
        9 * mm,
        "Email",
        "mailto:info@mesumabbas.online",
        filled=False,
    )

    # Right hero image panel
    panel_x = PAGE_W - MARGIN - 72 * mm
    panel_y = PAGE_H - 118 * mm
    panel_w = 72 * mm
    panel_h = 78 * mm
    c.setFillColor(BG_ALT)
    c.rect(panel_x, panel_y, panel_w, panel_h, fill=1, stroke=0)
    c.setStrokeColor(FG_BOLD)
    c.setLineWidth(1.5)
    c.rect(panel_x, panel_y, panel_w, panel_h, fill=0, stroke=1)

    hero = soft_image(PROJECTS[0]["image"], 900, 980)
    # inset image
    inset = 3 * mm
    c.drawImage(
        hero,
        panel_x + inset,
        panel_y + inset + 10 * mm,
        width=panel_w - 2 * inset,
        height=panel_h - 2 * inset - 10 * mm,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )
    c.setFillColor(FG_BOLD)
    c.setFont("UIBold", 7)
    c.drawString(panel_x + inset, panel_y + 3.5 * mm, "FEATURED  ·  NUVISA")
    link_rect(c, panel_x, panel_y, panel_w, panel_h, PROJECTS[0]["url"])

    # Proof strip
    strip_y = 28 * mm
    hairline(c, MARGIN, strip_y + 22 * mm, PAGE_W - MARGIN, strip_y + 22 * mm, FG_BOLD)
    c.setFillColor(FG_LIGHT)
    c.setFont("UIBold", 7)
    c.drawString(MARGIN, strip_y + 16 * mm, "LIVE PROOF  ·  CLICK ANY LINK")

    chips = [
        ("Nuvisa", "https://www.nuvisa.co.uk/"),
        ("Blessed HHC", "https://www.blessedhhc.org/"),
        ("Edunia", "https://www.edunia.org/"),
        ("Calculator All", "https://calculator1.org/"),
        ("GitHub", "https://github.com/mesum357"),
    ]
    cx = MARGIN
    for label, url in chips:
        tw = c.stringWidth(label, "UI", 8) + 10
        c.setFillColor(BG_ALT)
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.8)
        c.roundRect(cx, strip_y + 4 * mm, tw, 7 * mm, 1.5, fill=1, stroke=1)
        c.setFillColor(ACCENT)
        c.setFont("UI", 8)
        c.drawString(cx + 5, strip_y + 6.2 * mm, label)
        link_rect(c, cx, strip_y + 4 * mm, tw, 7 * mm, url)
        cx += tw + 3 * mm

    footer(c, 1, total)
    c.bookmarkPage("cover")
    c.addOutlineEntry("Cover - Mesum Abbas", "cover", level=0)
    c.showPage()


def draw_project_card(
    c: canvas.Canvas,
    x: float,
    y: float,
    w: float,
    h: float,
    project: dict,
) -> None:
    # Frame
    c.setFillColor(white)
    c.setStrokeColor(FG_BOLD)
    c.setLineWidth(1.2)
    c.rect(x, y, w, h, fill=1, stroke=1)

    img_h = h * 0.58
    img = soft_image(project["image"], 1100, int(1100 * (img_h / w)))
    c.drawImage(img, x + 1.2, y + h - img_h - 1.2, width=w - 2.4, height=img_h - 1, mask="auto")

    # Accent rule under image
    c.setFillColor(ACCENT)
    c.rect(x, y + h - img_h - 2.5, w, 2.5, fill=1, stroke=0)

    ty = y + h - img_h - 9 * mm
    c.setFillColor(SIGNAL)
    c.setFont("UIBold", 7)
    c.drawString(x + 4 * mm, ty, project["tag"].upper())

    c.setFillColor(FG_BOLD)
    title_font_size = 14 if len(project["title"]) < 24 else 11
    c.setFont("Display", title_font_size)
    c.drawString(x + 4 * mm, ty - 6 * mm, project["title"])

    c.setFillColor(FG)
    c.setFont("Body", 8.5)
    # wrap blurb
    max_w = w - 8 * mm
    words = project["blurb"].split()
    lines, cur = [], ""
    for word in words:
        trial = (cur + " " + word).strip()
        if c.stringWidth(trial, "Body", 8.5) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    by = ty - 12 * mm
    for line in lines[:3]:
        c.drawString(x + 4 * mm, by, line)
        by -= 3.8 * mm

    c.setFillColor(FG_LIGHT)
    c.setFont("UI", 7)
    c.drawString(x + 4 * mm, y + 7.5 * mm, project["stack"])

    c.setFillColor(ACCENT)
    c.setFont("UIBold", 8)
    cta = "View live →"
    c.drawString(x + 4 * mm, y + 3.2 * mm, cta)
    link_rect(c, x, y, w, h, project["url"])


def page_projects(
    c: canvas.Canvas,
    projects: list[dict],
    page_no: int,
    total: int,
    title: str,
    bookmark_key: str,
    bookmark_label: str,
) -> None:
    draw_paper(c)

    c.setFillColor(ACCENT)
    c.setFont("UIBold", 8)
    c.drawString(MARGIN, PAGE_H - 16 * mm, "SELECTED WORK")
    c.setFillColor(FG_BOLD)
    c.setFont("Display", 22)
    c.drawString(MARGIN, PAGE_H - 26 * mm, title)
    c.setFillColor(FG_LIGHT)
    c.setFont("BodyItalic", 10)
    c.drawString(MARGIN, PAGE_H - 33 * mm, "Every card is clickable — opens the live product.")

    hairline(c, MARGIN, PAGE_H - 36 * mm, PAGE_W - MARGIN, PAGE_H - 36 * mm, FG_BOLD)

    gap = 5 * mm
    card_w = (PAGE_W - 2 * MARGIN - gap) / 2
    card_h = 78 * mm
    start_y = PAGE_H - 40 * mm - card_h

    for i, project in enumerate(projects[:4]):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (card_w + gap)
        y = start_y - row * (card_h + gap)
        draw_project_card(c, x, y, card_w, card_h, project)

    footer(c, page_no, total)
    c.bookmarkPage(bookmark_key)
    c.addOutlineEntry(bookmark_label, bookmark_key, level=0)
    c.showPage()


def page_stack_cta(c: canvas.Canvas, total: int) -> None:
    draw_paper(c)

    c.setFillColor(ACCENT)
    c.setFont("UIBold", 8)
    c.drawString(MARGIN, PAGE_H - 16 * mm, "HOW I WORK")
    c.setFillColor(FG_BOLD)
    c.setFont("Display", 22)
    c.drawString(MARGIN, PAGE_H - 26 * mm, "Stack, scope, and next step")

    hairline(c, MARGIN, PAGE_H - 30 * mm, PAGE_W - MARGIN, PAGE_H - 30 * mm, FG_BOLD)

    # Stack columns
    cols = [
        ("Frontend", ["React", "Next.js", "TypeScript", "Tailwind CSS"]),
        ("Backend", ["Node.js", "Express", "REST / GraphQL", "Auth"]),
        ("Data", ["PostgreSQL", "MongoDB", "Prisma", "Redis"]),
        ("Ship", ["Vercel", "AWS", "Docker", "CI/CD"]),
    ]
    col_w = (PAGE_W - 2 * MARGIN) / 4
    for i, (label, items) in enumerate(cols):
        x = MARGIN + i * col_w
        c.setFillColor(FG_BOLD)
        c.setFont("UIBold", 9)
        c.drawString(x, PAGE_H - 40 * mm, label.upper())
        c.setFillColor(ACCENT)
        c.rect(x, PAGE_H - 42 * mm, 12 * mm, 1.5, fill=1, stroke=0)
        yy = PAGE_H - 50 * mm
        c.setFont("Body", 10)
        c.setFillColor(FG)
        for item in items:
            c.drawString(x, yy, item)
            yy -= 6 * mm

    # Services strip
    svc_y = PAGE_H - 88 * mm
    c.setFillColor(FG_BOLD)
    c.setFont("Display", 14)
    c.drawString(MARGIN, svc_y, "Services")
    services = [
        "Full Stack Development",
        "SaaS Development",
        "MVP Development",
        "Frontend & Backend",
        "Cloud & DevOps",
    ]
    sx = MARGIN
    sy = svc_y - 10 * mm
    for s in services:
        tw = c.stringWidth(s, "UI", 8) + 12
        if sx + tw > PAGE_W - MARGIN:
            sx = MARGIN
            sy -= 9 * mm
        c.setFillColor(BG_ALT)
        c.setStrokeColor(BORDER)
        c.roundRect(sx, sy, tw, 7 * mm, 1.5, fill=1, stroke=1)
        c.setFillColor(FG)
        c.setFont("UI", 8)
        c.drawString(sx + 6, sy + 2.2 * mm, s)
        sx += tw + 3 * mm

    # Big CTA panel
    panel_y = 28 * mm
    panel_h = 52 * mm
    c.setFillColor(FG_BOLD)
    c.rect(MARGIN, panel_y, PAGE_W - 2 * MARGIN, panel_h, fill=1, stroke=0)
    c.setFillColor(SIGNAL_MARK)
    c.rect(MARGIN, panel_y, 4 * mm, panel_h, fill=1, stroke=0)

    c.setFillColor(ON_ACCENT)
    c.setFont("Display", 18)
    c.drawString(MARGIN + 10 * mm, panel_y + panel_h - 14 * mm, "Ready to start?")
    c.setFont("Body", 11)
    c.drawString(
        MARGIN + 10 * mm,
        panel_y + panel_h - 22 * mm,
        "Send a short brief — I’ll reply with a clear plan and Done = definition.",
    )

    draw_button(
        c,
        MARGIN + 10 * mm,
        panel_y + 10 * mm,
        48 * mm,
        10 * mm,
        "Hire on Upwork →",
        "https://www.upwork.com/freelancers/~01786c6c8ccb9f4d9c",
    )
    # Outline-style buttons on dark — custom draw
    for i, (label, url) in enumerate(
        [
            ("Portfolio", "https://mesumabbas.online/"),
            ("GitHub", "https://github.com/mesum357"),
            ("Email", "mailto:info@mesumabbas.online"),
        ]
    ):
        bx = MARGIN + 64 * mm + i * 38 * mm
        by = panel_y + 10 * mm
        bw, bh = 34 * mm, 10 * mm
        c.setStrokeColor(ON_ACCENT)
        c.setLineWidth(1.1)
        c.roundRect(bx, by, bw, bh, 2, fill=0, stroke=1)
        c.setFillColor(ON_ACCENT)
        c.setFont("UIBold", 8.5)
        c.drawCentredString(bx + bw / 2, by + bh / 2 - 2.5, label)
        link_rect(c, bx, by, bw, bh, url)

    c.setFillColor(Color(1, 1, 1, alpha=0.55))
    c.setFont("UI", 7.5)
    c.drawString(MARGIN + 10 * mm, panel_y + 3.5 * mm, "info@mesumabbas.online  ·  Gilgit, Pakistan  ·  Remote-ready")

    footer(c, total, total)
    c.bookmarkPage("cta")
    c.addOutlineEntry("Stack & hire CTA", "cta", level=0)
    c.showPage()


def build() -> Path:
    register_fonts()
    OUT.parent.mkdir(parents=True, exist_ok=True)

    total = 4
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("Mesum Abbas - Full Stack Portfolio (Upwork)")
    c.setAuthor("Mesum Abbas")
    c.setSubject("Interactive portfolio attachment for Upwork proposals")
    c.setCreator("mesumabbas.online")
    c.setKeywords(["Mesum Abbas", "Full Stack", "React", "Next.js", "Node.js", "Upwork"])

    page_cover(c, total)

    page_projects(
        c,
        PROJECTS[0:4],
        2,
        total,
        "SaaS & platforms",
        "work-1",
        "Selected work - SaaS & platforms",
    )

    extras = [
        PROJECTS[4],
        PROJECTS[5],
        {
            "title": "Employee Portal",
            "tag": "EMS · HR",
            "blurb": "Corporate employee portal for HR workflows, staff records, and operations.",
            "stack": "React · TypeScript · Auth",
            "url": "https://employee-portal-sepia-kappa.vercel.app/",
            "image": PORTFOLIO / "employee.png",
        },
        {
            "title": "GB Museum & Library",
            "tag": "Heritage · Web",
            "blurb": "Digital heritage hub preserving Gilgit-Baltistan culture and history.",
            "stack": "React · Node.js · MongoDB",
            "url": "https://gilgit-heritage-hub.onrender.com/",
            "image": PORTFOLIO / "museum.png",
        },
    ]
    page_projects(
        c,
        extras,
        3,
        total,
        "Ops, EMS & business sites",
        "work-2",
        "Selected work - Ops & business sites",
    )

    page_stack_cta(c, total)

    c.save()
    return OUT


if __name__ == "__main__":
    path = build()
    size_kb = path.stat().st_size / 1024
    print(f"Wrote {path}")
    print(f"Size: {size_kb:.1f} KB")
