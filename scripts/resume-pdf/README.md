# Resume PDF

Generates `public/Birzaan-Mistry-Resume.pdf` — the attachable version of the site,
using the same palette, Geist typography and node-graph motif.

```bash
pip install reportlab fonttools brotli
npm install                                  # provides the Geist webfonts
python3 scripts/resume-pdf/build_resume_pdf.py
```

`convert_fonts.py` runs automatically on the first build. It exists because Geist
ships CFF (PostScript) outlines that ReportLab cannot embed, so the glyphs are
converted to TrueType quadratics into `fonts/` (gitignored — regenerated on demand).

Content lives inline in `build_resume_pdf.py` and is kept in sync with
`src/data/resume.ts` by hand; update both when the site copy changes.
