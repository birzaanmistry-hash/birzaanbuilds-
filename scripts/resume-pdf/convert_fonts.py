"""Geist ships CFF outlines; ReportLab only embeds TrueType glyf. Convert."""

import os

from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.reverseContourPen import ReverseContourPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont, newTable

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
SRC = os.path.join(REPO, "node_modules", "@fontsource")
OUT = os.path.join(HERE, "fonts")
os.makedirs(OUT, exist_ok=True)


def quadratic_glyphs(glyphs, max_err=1.0):
    out = {}
    for name in glyphs.keys():
        tt_pen = TTGlyphPen(glyphs)
        # TrueType winds contours opposite to PostScript.
        pen = ReverseContourPen(Cu2QuPen(tt_pen, max_err))
        glyphs[name].draw(pen)
        out[name] = tt_pen.glyph()
    return out


def otf_to_ttf(font):
    glyph_order = font.getGlyphOrder()
    font["loca"] = newTable("loca")
    font["glyf"] = glyf = newTable("glyf")
    glyf.glyphOrder = glyph_order
    glyf.glyphs = quadratic_glyphs(font.getGlyphSet())
    del font["CFF "]
    for tag in ("VORG", "CFF2"):
        if tag in font:
            del font[tag]
    glyf.compile(font)

    hmtx = font["hmtx"]
    for name, g in glyf.glyphs.items():
        if hasattr(g, "xMin"):
            hmtx[name] = (hmtx[name][0], g.xMin)

    font["maxp"] = maxp = newTable("maxp")
    maxp.tableVersion = 0x00010000
    maxp.maxZones = 1
    maxp.maxTwilightPoints = 0
    maxp.maxStorage = 0
    maxp.maxFunctionDefs = 0
    maxp.maxInstructionDefs = 0
    maxp.maxStackElements = 0
    maxp.maxSizeOfInstructions = 0
    maxp.maxComponentElements = max(
        len(getattr(g, "components", [])) for g in glyf.glyphs.values()
    )
    maxp.compile(font)

    post = font["post"]
    post.formatType = 2.0
    post.extraNames = []
    post.mapping = {}
    post.glyphOrder = glyph_order
    try:
        post.compile(font)
    except OverflowError:
        post.formatType = 3

    font.sfntVersion = "\000\001\000\000"
    return font


WANT = [
    ("geist-sans", "400"), ("geist-sans", "500"), ("geist-sans", "600"),
    ("geist-sans", "700"), ("geist-sans", "800"),
    ("geist-mono", "400"), ("geist-mono", "500"), ("geist-mono", "600"),
]

for fam, weight in WANT:
    src = os.path.join(SRC, fam, "files", f"{fam}-latin-{weight}-normal.woff2")
    font = TTFont(src)
    font.flavor = None
    if font.sfntVersion == "OTTO":
        font = otf_to_ttf(font)
    dst = os.path.join(OUT, f"{fam}-{weight}.ttf")
    font.save(dst)
    print("ok", dst, os.path.getsize(dst))
