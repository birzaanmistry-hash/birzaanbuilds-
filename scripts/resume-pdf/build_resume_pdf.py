"""Birzaan Mistry — resume PDF.

Mirrors the live site (birzaanmistry.in): same palette, same Geist typography,
same node-graph motif behind the header.

    pip install reportlab fonttools brotli
    npm install                       # supplies the Geist webfonts
    python3 scripts/resume-pdf/build_resume_pdf.py

Writes public/Birzaan-Mistry-Resume.pdf.
"""

import math
import os
import random
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
FONT_DIR = os.path.join(HERE, "fonts")
OUT_PDF = os.path.join(REPO, "public", "Birzaan-Mistry-Resume.pdf")

if not os.path.isdir(FONT_DIR):
    # Geist ships CFF outlines; ReportLab needs them converted to TrueType first.
    subprocess.run([sys.executable, os.path.join(HERE, "convert_fonts.py")], check=True)

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    NextPageTemplate,
    PageTemplate,
    Paragraph,
    Spacer,
)

# ---------------------------------------------------------------- palette
BG = HexColor("#07080a")
SURFACE = HexColor("#0d0f13")
SURFACE2 = HexColor("#111419")
BORDER = HexColor("#1e232b")
TEXT = HexColor("#f2f4f7")
MUTED = HexColor("#9aa2b1")
DIM = HexColor("#6b7482")
ACCENT = HexColor("#3d7fff")

PAGE_W, PAGE_H = A4
MARGIN = 46
CONTENT_W = PAGE_W - MARGIN * 2

# ---------------------------------------------------------------- fonts
for name, path in [
    ("Geist", "geist-sans-400.ttf"),
    ("Geist-Md", "geist-sans-500.ttf"),
    ("Geist-Sb", "geist-sans-600.ttf"),
    ("Geist-Bd", "geist-sans-700.ttf"),
    ("Geist-Xb", "geist-sans-800.ttf"),
    ("Mono", "geist-mono-400.ttf"),
    ("Mono-Md", "geist-mono-500.ttf"),
    ("Mono-Sb", "geist-mono-600.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, os.path.join(FONT_DIR, path)))

pdfmetrics.registerFontFamily("Geist", normal="Geist", bold="Geist-Bd", italic="Geist", boldItalic="Geist-Bd")


def tracked(c, x, y, text, font, size, color, space=0.0):
    """Letter-spaced text — the site leans on wide tracking for its labels."""
    c.saveState()
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(space)
    t.textOut(text)
    # Tc survives the text object, so clear it or every later run inherits it.
    t.setCharSpace(0)
    c.drawText(t)
    c.restoreState()


def tracked_w(text, font, size, space=0.0):
    return stringWidth(text, font, size) + space * max(len(text) - 1, 0)


def tracked_right(c, x, y, text, font, size, color, space=0.0):
    tracked(c, x - tracked_w(text, font, size, space), y, text, font, size, color, space)


# ---------------------------------------------------------------- styles
def para(name, **kw):
    base = dict(fontName="Geist", fontSize=8.6, leading=12.6, textColor=MUTED)
    base.update(kw)
    return ParagraphStyle(name, **base)


summary_style = para("summary", fontSize=9.8, leading=15.4, textColor=MUTED)
body_style = para("body", fontSize=8.4, leading=12.2)
small_style = para("small", fontSize=7.8, leading=11.4)


# ---------------------------------------------------------------- page furniture
def grad_rect(c, x, y, w, h, c0, c1, steps=72, horizontal=True):
    """Stepped gradient — renders identically everywhere, unlike PDF shadings."""
    c.saveState()
    for i in range(steps):
        t = i / (steps - 1)
        col = Color(
            c0.red + (c1.red - c0.red) * t,
            c0.green + (c1.green - c0.green) * t,
            c0.blue + (c1.blue - c0.blue) * t,
        )
        c.setFillColor(col)
        if horizontal:
            sw = w / steps
            c.rect(x + i * sw, y, sw + 0.6, h, stroke=0, fill=1)
        else:
            sh = h / steps
            c.rect(x, y + i * sh, w, sh + 0.6, stroke=0, fill=1)
    c.restoreState()


def node_graph(c, x, y, w, h, seed=7):
    """The workflow graph from the hero, frozen into a still."""
    rnd = random.Random(seed)
    pts = []
    cols, rows = 7, 4
    for i in range(cols):
        for j in range(rows):
            if rnd.random() < 0.42:
                continue
            px = x + (i + 0.5) * w / cols + rnd.uniform(-9, 9)
            py = y + (j + 0.5) * h / rows + rnd.uniform(-7, 7)
            pts.append((px, py))

    def fade(px):
        # The mesh dissolves toward the wordmark so the type stays clean.
        return max(0.0, min(1.0, (px - x) / (w * 0.55)))

    c.saveState()
    c.setLineWidth(0.5)
    for i, a in enumerate(pts):
        for b in pts[i + 1 :]:
            d = math.hypot(a[0] - b[0], a[1] - b[1])
            if d < w / cols * 1.65:
                # Nearer nodes wire up brighter, so the mesh reads as depth.
                alpha = max(0.05, 0.32 - d / 420) * fade((a[0] + b[0]) / 2)
                c.setStrokeColor(Color(0.24, 0.50, 1, alpha=alpha))
                c.line(a[0], a[1], b[0], b[1])
    for px, py in pts:
        r = rnd.choice([1.05, 1.05, 1.5, 2.1])
        c.setFillColor(Color(0.24, 0.50, 1, alpha=(0.32 if r < 1.4 else 0.62) * fade(px)))
        c.circle(px, py, r, stroke=0, fill=1)
    c.restoreState()


def draw_footer(c, doc):
    y = 30
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN, y + 12, PAGE_W - MARGIN, y + 12)
    tracked(c, MARGIN, y, "BIRZAAN MISTRY", "Mono-Md", 6.2, DIM, 1.1)
    tracked(c, MARGIN + 92, y, "AI GENERALIST & CONSULTANT", "Mono", 6.2, DIM, 1.1)
    right = "birzaanmistry.in"
    c.setFont("Mono-Md", 6.2)
    c.setFillColor(ACCENT)
    c.drawRightString(PAGE_W - MARGIN, y, right)
    c.linkURL(
        "https://birzaanmistry.in",
        (PAGE_W - MARGIN - 70, y - 3, PAGE_W - MARGIN, y + 8),
        relative=0,
        thickness=0,
    )


def paint_bg(c, doc):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)


def on_first(c, doc):
    paint_bg(c, doc)
    band_h = 176
    band_y = PAGE_H - band_h

    c.setFillColor(SURFACE)
    c.rect(0, band_y, PAGE_W, band_h, stroke=0, fill=1)
    node_graph(c, 285, band_y + 16, PAGE_W - 285 - 22, band_h - 34)

    top = PAGE_H - 46

    # availability pill
    label = "AVAILABLE FOR INTERNSHIPS"
    pill_w = tracked_w(label, "Mono-Md", 6.4, 1.2) + 30
    c.setStrokeColor(HexColor("#25406e"))
    c.setFillColor(HexColor("#0e1520"))
    c.setLineWidth(0.6)
    c.roundRect(MARGIN, top - 13, pill_w, 15, 7.5, stroke=1, fill=1)
    c.setFillColor(ACCENT)
    c.circle(MARGIN + 11, top - 5.5, 2.2, stroke=0, fill=1)
    tracked(c, MARGIN + 19, top - 8.2, label, "Mono-Md", 6.4, ACCENT, 1.2)

    # name
    tracked(c, MARGIN - 2, top - 62, "Birzaan Mistry", "Geist-Xb", 40, TEXT, -1.5)

    # tagline
    roles = ["AI GENERALIST", "AI CONSULTANT", "AI WORKFLOW BUILDER", "AI EDUCATOR", "FOUNDER, TASKLYN.IN"]
    x = MARGIN
    ty = top - 80
    for i, r in enumerate(roles):
        if i:
            c.setFillColor(HexColor("#2f3a4a"))
            c.setFont("Mono", 6.6)
            c.drawString(x, ty, "/")
            x += 9
        tracked(c, x, ty, r, "Mono-Sb", 6.6, ACCENT if i < 2 else HexColor("#7ba5ff"), 1.05)
        x += tracked_w(r, "Mono-Sb", 6.6, 1.05) + 9

    # contact row
    contacts = [
        ("birzaanmistry@gmail.com", "mailto:birzaanmistry@gmail.com"),
        ("+91 99302 26026", "https://wa.me/919930226026"),
        ("tasklyn.in", "https://tasklyn.in"),
        ("Mumbai, India", None),
    ]
    x = MARGIN
    cy = top - 100
    for i, (txt, href) in enumerate(contacts):
        if i:
            c.setFillColor(HexColor("#2f3a4a"))
            c.setFont("Mono", 7)
            c.drawString(x + 3, cy, "·")
            x += 14
        w = stringWidth(txt, "Geist-Md", 8.2)
        c.setFillColor(MUTED if href is None else TEXT)
        c.setFont("Geist-Md", 8.2)
        c.drawString(x, cy, txt)
        if href:
            c.linkURL(href, (x, cy - 2, x + w, cy + 9), relative=0, thickness=0)
        x += w + 8

    # accent rule fading right
    grad_rect(c, MARGIN, top - 118, CONTENT_W, 1.6, ACCENT, SURFACE)

    draw_footer(c, doc)


def on_later(c, doc):
    paint_bg(c, doc)
    c.setFillColor(SURFACE)
    c.rect(0, PAGE_H - 34, PAGE_W, 34, stroke=0, fill=1)
    tracked(c, MARGIN, PAGE_H - 22, "BIRZAAN MISTRY", "Geist-Bd", 8.4, TEXT, 0.2)
    tracked(c, MARGIN + 86, PAGE_H - 21.5, "RESUME / 02", "Mono-Md", 6.4, ACCENT, 1.2)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(0, PAGE_H - 34, PAGE_W, PAGE_H - 34)
    draw_footer(c, doc)


# ---------------------------------------------------------------- flowables
class SectionHead(Flowable):
    def __init__(self, num, title, width=CONTENT_W):
        super().__init__()
        self.num, self.title, self.width = num, title, width

    def wrap(self, aw, ah):
        self.height = 26
        return (aw, self.height)

    def draw(self):
        c = self.canv
        tracked(c, 0, 8, self.num, "Mono-Sb", 7.4, ACCENT, 0.6)
        x = 22
        tracked(c, x, 8, self.title, "Geist-Bd", 9.6, TEXT, 1.5)
        x += tracked_w(self.title, "Geist-Bd", 9.6, 1.5) + 12
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.6)
        c.line(x, 11, self.width, 11)


class StatStrip(Flowable):
    """The hero KPI tiles — four numbers that carry the whole story."""

    def __init__(self, items, width=CONTENT_W):
        super().__init__()
        self.items, self.width = items, width

    def wrap(self, aw, ah):
        self.height = 52
        return (aw, self.height)

    def draw(self):
        c = self.canv
        gap = 9
        n = len(self.items)
        w = (self.width - gap * (n - 1)) / n
        for i, (big, cap) in enumerate(self.items):
            x = i * (w + gap)
            c.setFillColor(SURFACE)
            c.setStrokeColor(BORDER)
            c.setLineWidth(0.6)
            c.roundRect(x, 0, w, self.height, 5, stroke=1, fill=1)
            c.setFillColor(ACCENT)
            c.rect(x, 0, 2.2, self.height, stroke=0, fill=1)
            tracked(c, x + 12, self.height - 25, big, "Geist-Xb", 16.5, TEXT, -0.5)
            tracked(c, x + 12, 11, cap, "Mono", 6.1, MUTED, 0.55)


class ProjectCard(Flowable):
    def __init__(self, tag, title, stat, stat_cap, desc, tools, width=CONTENT_W):
        super().__init__()
        self.tag, self.title, self.stat = tag, title, stat
        self.stat_cap, self.desc, self.tools, self.width = stat_cap, desc, tools, width

    def wrap(self, aw, ah):
        self.pad = 10
        self.bar = 2.4
        self.inner_x = self.bar + self.pad
        self.inner_w = self.width - self.bar - self.pad * 2
        stat_w = max(
            stringWidth(self.stat, "Geist-Xb", 15),
            tracked_w(self.stat_cap, "Mono", 5.9, 0.5),
        )
        self.stat_w = stat_w
        head_w = self.inner_w - stat_w - 16

        self.p_title = Paragraph(self.title, para("t", fontName="Geist-Bd", fontSize=11, leading=13.6, textColor=TEXT))
        self.tw, self.th = self.p_title.wrap(head_w, 200)
        self.p_desc = Paragraph(self.desc, body_style)
        self.dw, self.dh = self.p_desc.wrap(self.inner_w, 300)

        head_h = 10 + self.th
        self.height = self.pad + max(head_h, 30) + 7 + self.dh + 12 + self.pad
        return (aw, self.height)

    def draw(self):
        c = self.canv
        h = self.height
        c.setFillColor(SURFACE)
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.6)
        c.roundRect(0, 0, self.width, h, 5, stroke=1, fill=1)
        c.setFillColor(ACCENT)
        c.rect(0, 3, self.bar, h - 6, stroke=0, fill=1)

        y = h - self.pad - 6
        tracked(c, self.inner_x, y, self.tag.upper(), "Mono-Sb", 6.1, ACCENT, 0.9)
        y -= 4
        self.p_title.drawOn(c, self.inner_x, y - self.th)

        # stat, right-aligned
        rx = self.width - self.pad
        tracked_right(c, rx, h - self.pad - 15, self.stat, "Geist-Xb", 15, TEXT, -0.4)
        cw = tracked_w(self.stat_cap, "Mono", 5.9, 0.5)
        tracked(c, rx - cw, h - self.pad - 25, self.stat_cap, "Mono", 5.9, DIM, 0.5)

        dy = y - self.th - 7 - self.dh
        self.p_desc.drawOn(c, self.inner_x, dy)

        ty = dy - 11
        x = self.inner_x
        for i, t in enumerate(self.tools):
            if i:
                c.setFillColor(HexColor("#2f3a4a"))
                c.setFont("Mono", 6.2)
                c.drawString(x, ty, "·")
                x += 7
            tracked(c, x, ty, t, "Mono", 6.2, DIM, 0.4)
            x += tracked_w(t, "Mono", 6.2, 0.4) + 7


class TwoCol(Flowable):
    """Generic two-column block — used for ventures and skills."""

    def __init__(self, blocks, width=CONTENT_W, gap=20, renderer=None):
        super().__init__()
        self.blocks, self.width, self.gap = blocks, width, gap
        self.renderer = renderer

    def wrap(self, aw, ah):
        col_w = (self.width - self.gap) / 2
        self.col_w = col_w
        self.cells = [self.renderer(b, col_w) for b in self.blocks]
        heights = [h for _, h in self.cells]
        rows = [(heights[i], heights[i + 1] if i + 1 < len(heights) else 0) for i in range(0, len(heights), 2)]
        self.row_h = [max(a, b) for a, b in rows]
        self.height = sum(self.row_h) + 12 * (len(self.row_h) - 1)
        return (aw, self.height)

    def draw(self):
        c = self.canv
        y = self.height
        for r, rh in enumerate(self.row_h):
            for col in (0, 1):
                idx = r * 2 + col
                if idx >= len(self.cells):
                    continue
                drawer, _ = self.cells[idx]
                drawer(c, col * (self.col_w + self.gap), y)
            y -= rh + 12


def venture_cell(b, w):
    name, role, period, desc = b
    p = Paragraph(desc, small_style)
    _, dh = p.wrap(w - 10, 300)
    h = 12 + 14 + 10 + dh

    def drawer(c, x, y_top):
        c.setFillColor(HexColor("#2a3342"))
        c.rect(x, y_top - h + 2, 1.6, h - 4, stroke=0, fill=1)
        gx = x + 9
        tracked(c, gx, y_top - 8, period.upper(), "Mono", 5.9, DIM, 0.8)
        c.setFont("Geist-Bd", 10.2)
        c.setFillColor(TEXT)
        c.drawString(gx, y_top - 22, name)
        tracked(c, gx, y_top - 33, role.upper(), "Mono-Sb", 6.1, ACCENT, 0.9)
        p.drawOn(c, gx, y_top - 40 - dh)

    return drawer, h


def skill_cell(b, w):
    cat, items = b
    p = Paragraph(items, para("sk", fontSize=8.2, leading=12.4))
    _, dh = p.wrap(w - 10, 300)
    h = 14 + dh + 4

    def drawer(c, x, y_top):
        c.setFillColor(ACCENT)
        c.circle(x + 2.4, y_top - 5.4, 2.1, stroke=0, fill=1)
        tracked(c, x + 10, y_top - 8, cat.upper(), "Mono-Sb", 6.6, TEXT, 1.15)
        p.drawOn(c, x + 10, y_top - 15 - dh)

    return drawer, h


class Achievements(Flowable):
    def __init__(self, items, width=CONTENT_W):
        super().__init__()
        self.items, self.width = items, width

    def wrap(self, aw, ah):
        self.height = 50
        return (aw, self.height)

    def draw(self):
        c = self.canv
        gap = 9
        n = len(self.items)
        w = (self.width - gap * (n - 1)) / n
        for i, (label, stat, detail) in enumerate(self.items):
            x = i * (w + gap)
            c.setFillColor(SURFACE2)
            c.setStrokeColor(BORDER)
            c.setLineWidth(0.6)
            c.roundRect(x, 0, w, self.height, 5, stroke=1, fill=1)
            tracked(c, x + 11, self.height - 14, label.upper(), "Mono-Sb", 6.1, ACCENT, 1.0)
            c.setFont("Geist-Bd", 10)
            c.setFillColor(TEXT)
            c.drawString(x + 11, self.height - 29, stat)
            tracked(c, x + 11, 9, detail, "Geist", 6.6, MUTED, 0.15)


class CertsEducation(Flowable):
    def __init__(self, certs, education, width=CONTENT_W):
        super().__init__()
        self.certs, self.education, self.width = certs, education, width

    def wrap(self, aw, ah):
        self.height = 20 + len(self.certs) * 15
        return (aw, self.height)

    def draw(self):
        c = self.canv
        col = self.width * 0.62
        y = self.height - 2
        tracked(c, 0, y - 8, "CERTIFICATIONS", "Mono-Sb", 6.6, TEXT, 1.15)
        yy = y - 24
        for name, status in self.certs:
            done = status == "Completed"
            c.setFillColor(ACCENT if done else HexColor("#2a3342"))
            c.circle(3, yy + 3, 2.6, stroke=0, fill=1)
            if not done:
                c.setFillColor(SURFACE)
                c.circle(3, yy + 3, 1.2, stroke=0, fill=1)
            c.setFont("Geist-Md", 8.4)
            c.setFillColor(MUTED)
            c.drawString(12, yy, name)
            bx = 12 + stringWidth(name, "Geist-Md", 8.4) + 8
            tracked(c, bx, yy + 0.5, status.upper(), "Mono", 5.9, ACCENT if done else DIM, 0.6)
            yy -= 15

        tracked(c, col, y - 8, "EDUCATION", "Mono-Sb", 6.6, TEXT, 1.15)
        c.setFont("Geist-Md", 8.6)
        c.setFillColor(TEXT)
        c.drawString(col, y - 24, "Grade 12 — Commerce")
        tracked(c, col, y - 37, "MUMBAI, INDIA", "Mono", 6.1, DIM, 0.7)


class CTA(Flowable):
    def wrap(self, aw, ah):
        self.width = CONTENT_W
        self.height = 40
        return (aw, self.height)

    def draw(self):
        c = self.canv
        c.setFillColor(HexColor("#0c1220"))
        c.setStrokeColor(HexColor("#25406e"))
        c.setLineWidth(0.7)
        c.roundRect(0, 0, self.width, self.height, 6, stroke=1, fill=1)
        c.setFillColor(ACCENT)
        c.rect(0, 3, 2.4, self.height - 6, stroke=0, fill=1)
        c.setFont("Geist-Bd", 10.4)
        c.setFillColor(TEXT)
        c.drawString(14, self.height - 19, "Open to internships in AI, business development & growth.")
        tracked(c, 14, 11, "BIRZAANMISTRY.IN", "Mono-Sb", 6.4, ACCENT, 1.2)
        tracked(c, 118, 11, "·  WA.ME/919930226026  ·  BIRZAANMISTRY@GMAIL.COM", "Mono", 6.4, DIM, 1.0)
        c.linkURL("https://birzaanmistry.in", (14, 6, 110, 20), relative=0, thickness=0)


# ---------------------------------------------------------------- document
doc = BaseDocTemplate(
    OUT_PDF,
    pagesize=A4,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    topMargin=MARGIN,
    bottomMargin=48,
    title="Birzaan Mistry — AI Generalist & Consultant",
    author="Birzaan Mistry",
    subject="Resume",
    keywords="AI, automation, n8n, performance marketing, business development",
)

first_frame = Frame(MARGIN, 48, CONTENT_W, PAGE_H - 176 - 48 - 10, id="first", showBoundary=0,
                    leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
later_frame = Frame(MARGIN, 48, CONTENT_W, PAGE_H - 34 - 48 - 22, id="later", showBoundary=0,
                    leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)

doc.addPageTemplates([
    PageTemplate(id="first", frames=[first_frame], onPage=on_first),
    PageTemplate(id="later", frames=[later_frame], onPage=on_later),
])

story = [NextPageTemplate("later"), Spacer(1, 14)]

story.append(Paragraph(
    '18-year-old <font color="#f2f4f7"><b>AI generalist and consultant</b></font> shipping production systems that '
    'hand businesses back their <font color="#f2f4f7">time</font> — and make their money '
    '<font color="#f2f4f7">work harder</font>. I consult with businesses on where AI actually fits, and teach '
    'students and developers how to use it day to day. Founder of '
    '<font color="#f2f4f7">Tasklyn.in</font> — business development, sales, performance marketing, and operations.',
    summary_style,
))
story.append(Spacer(1, 16))

story.append(StatStrip([
    ("5", "SYSTEMS IN PRODUCTION"),
    ("80%", "OF ORDERS AUTOMATED"),
    ("<60s", "LEAD TO CRM"),
    ("24/7", "AI FRONT-DESK COVERAGE"),
]))
story.append(Spacer(1, 16))

story.append(SectionHead("01", "SELECTED WORK"))
story.append(Spacer(1, 4))

PROJECTS = [
    ("AI Agent · Automotive", "WhatsApp AI Parts Ordering Agent", "80%", "OF ORDERS AUTOMATED",
     "Conversational WhatsApp agent that lets workshops order spare parts in natural language and routes orders "
     "straight to the distributor. Handles edge cases, logs every run, and pages me on failure.",
     ["n8n", "WhatsApp Cloud API", "OpenAI", "Airtable"]),
    ("Voice AI · Healthcare", "AI Dental Receptionist", "24/7", "FRONT-DESK COVERAGE",
     "Voice agent that books, reschedules, and confirms dental appointments — handing structured data straight to "
     "the clinic's calendar and escalating anything it can't resolve to the front desk.",
     ["Voice AI", "OpenAI", "Google Calendar", "Twilio"]),
    ("Sales Automation · B2B", "Lead Qualification &amp; CRM Auto-Enrichment", "<60s", "NEW LEAD TO CRM",
     "Enriches every inbound lead via Apollo.io, scores it by company size and intent, and pushes it into the CRM "
     "with a personalized intro email already sent. Runs unattended and deduplicates against existing records.",
     ["n8n", "Apollo.io", "HubSpot CRM", "OpenAI"]),
    ("Content Ops · Marketing", "AI Social Media Content Engine", "3 min", "FOR A FULL WEEK OF CONTENT",
     "Turns a single topic into a week of on-brand posts, routes them through Telegram for approval, and "
     "auto-schedules the finals to Buffer. In active use by two clients — nothing publishes without sign-off.",
     ["n8n", "GPT-4", "Telegram", "Buffer"]),
    ("CRM Ops · D2C E-commerce", "D2C Delivery Confidence &amp; Retention Engine", "End-to-end", "DISPATCH TO REPEAT ORDER",
     "Tracks every D2C order from dispatch to doorstep inside one CRM, proactively resolving delivery anxiety "
     "before it turns into a support ticket, then triggers post-delivery retention flows automatically.",
     ["n8n", "CRM", "WhatsApp API", "Shipping APIs"]),
]

for p in PROJECTS:
    story.append(ProjectCard(*p))
    story.append(Spacer(1, 7))

story.append(Spacer(1, 8))
story.append(SectionHead("02", "VENTURES & EXPERIENCE"))
story.append(Spacer(1, 6))
story.append(TwoCol([
    ("Tasklyn.in", "Founder", "Nov 2025 — Active",
     "Building AI agents and automated systems for businesses. Solo bootstrapped — product development, client "
     "acquisition, web hosting, and sales."),
    ("AI Education", "Instructor", "Ongoing",
     "Teaching students and developers how to actually use AI in their day-to-day work — practical workflows and "
     "tools, not just theory. Across n8n, LLM integrations, and AI agent building."),
    ("Performance Marketing", "Media Buyer", "Active",
     "Running paid ad campaigns for gyms — including Midtown Fitness, a fitness franchise — and multiple perfume "
     "brands. Creative, targeting, and spend optimization across Meta &amp; Google Ads."),
    ("Galaxia Enterprises", "Co-Founder", "2023 — 2024",
     "Co-founded and managed business development, client negotiations, and end-to-end operations."),
], renderer=venture_cell))

story.append(Spacer(1, 13))
story.append(SectionHead("03", "SKILLS & EXPERTISE"))
story.append(Spacer(1, 6))
story.append(TwoCol([
    ("AI & Automation", "n8n Workflow Design, AI Agent Architecture, LLM Integration, WhatsApp AI Bots, "
                        "Webhook Automation, API Integration"),
    ("Business", "Business Development, Sales, Cold Calling, Client Acquisition, Performance Marketing, "
                 "Paid Ads (Meta &amp; Google), Operations, Negotiation"),
    ("Tech", "Web Design, Web Development, HTML/CSS, No-Code Tools, Google Sheets Automation"),
    ("Soft Skills", "Leadership, Public Speaking, Persuasion, Event Management"),
], renderer=skill_cell))

story.append(Spacer(1, 13))
story.append(SectionHead("04", "ATHLETICS"))
story.append(Spacer(1, 6))
story.append(Achievements([
    ("Boxing", "State-Level Silver", "10+ district & state victories, Maharashtra"),
    ("Football", "National Trials", "Selected for National Football Trials, 2023"),
    ("Sprinting", "100m & 200m", "Competitive track athlete"),
]))

story.append(Spacer(1, 13))
story.append(SectionHead("05", "CREDENTIALS"))
story.append(Spacer(1, 4))
story.append(CertsEducation([
    ("AI Advanced Bootcamp, Outskill", "Completed"),
    ("HubSpot Sales Training", "In Progress"),
    ("Agentic AI Mastery Program, Haus Of Intelligence", "In Progress"),
], "Grade 12 Commerce"))

story.append(Spacer(1, 11))
story.append(CTA())

doc.build(story)
print("wrote", OUT_PDF)
