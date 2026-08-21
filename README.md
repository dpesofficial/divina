# Divina Thapa — Medical Record

A self-contained, mobile-first static site holding the complete medical record, timeline, results and guideline research for **Divina Thapa** (female, 3 years, Banepa, Nepal), covering 7 May to 21 August 2026.

Built from 32 photographed pages across three hospitals and two laboratories.

> ⚠️ **This contains identifiable medical information about a child.** Keep this repository **private**. See [Privacy](#privacy) below.

---

## What is in it

| Section | Contents |
|---|---|
| **Overview** | Current status banner, four key findings, the five results still missing, current medication |
| **Timeline** | All 23 recorded contacts and results, newest first, filterable by type and hospital, each with the original scan attached |
| **Results** | CRP and weight charts, every urine sample compared, every blood value checked against paediatric reference ranges, full medication history, every diagnosis recorded |
| **Research** | Seven guideline-backed research cards with 21 linked sources, plus 20 questions for the doctor with tick-off tracking |
| **Records** | All 32 scanned pages, patient details, hospital identifiers, clinicians, facilities, paperwork problems, and a plain-English glossary of every abbreviation on the papers |

### Headline findings

- **Currently unresolved:** low-grade fever since 17 August, CRP 96 mg/L, dengue negative, blood culture result outstanding
- **Five urine cultures, one positive** — E. coli on 17 May 2026, resistant to amoxycillin and azithromycin
- **Three "LOW" lab flags are artefacts of adult reference ranges** applied to a three-year-old. Haemoglobin, MCV and creatinine are all normal for her age
- **An ultrasound advised on 31 May has no report anywhere** in the file, despite matching NICE guidance for a child under 3 after a UTI
- **Weight down 0.8 kg** over eleven weeks

---

## Running it

Everything is local. No build step, no dependencies, no network calls, no external fonts or CDNs.

**On a phone:** copy the folder across and open `index.html`.

**On a computer:**

```bash
python -m http.server 4179
```

Then open `http://localhost:4179`.

---

## Adding new records

All content lives in a single file, `data/records.js`. You never need to edit the HTML, CSS or JavaScript.

Full copy-paste templates are in **[HOW-TO-ADD.md](HOW-TO-ADD.md)** — covering new visits, lab results, personal notes, scanned images, research cards, and questions for the doctor.

Validate an edit before refreshing:

```bash
node --check data/records.js
```

---

## Structure

```
.
├── index.html              page shell
├── data/
│   └── records.js          ALL content — the only file you edit
├── assets/
│   ├── css/style.css       light and dark themes, mobile-first
│   └── js/app.js           vanilla JS renderer, no frameworks
├── images/                 32 full-size scans (~4.8 MB)
│   └── thumbs/             gallery thumbnails (~0.5 MB)
├── reports/                the same content as printable markdown
├── HOW-TO-ADD.md
└── README.md
```

## Technical notes

- Plain HTML, CSS and JavaScript. No frameworks, no build tooling, no package manager
- Data is loaded as a plain `<script>` rather than fetched JSON, so the site works over `file://` with no server
- Charts are hand-rolled inline SVG — no charting library
- Light and dark themes follow the system setting, with a manual override saved to `localStorage`
- Question tick-offs are saved per device to `localStorage`
- Print stylesheet included, so the questions page can be printed for an appointment
- Total page weight around 5.5 MB, almost all of it the scanned images, which lazy-load

---

## Privacy

This repository contains a named child's full medical history, home address, hospital record numbers and a guardian's phone number.

- **Keep the repository private.** If it is public, this content is world-readable and will be indexed and cached by search engines and archives, and deleting it later does not reliably remove those copies.
- **Do not enable GitHub Pages** on a public repository for this content.
- The site sends `noindex, nofollow, noarchive` meta tags, but those only discourage well-behaved crawlers. They are not access control.
- To share it with a doctor, prefer copying the folder to a device or sending an export, rather than a public link.

---

## Disclaimer

This site records what the original documents state, plus published clinical guideline context with sources attached to every claim. **It contains no diagnosis and no treatment advice.** Guidelines cited are British, Australian and Canadian, plus Nepali research where local disease patterns are relevant; practice in Nepal may reasonably differ. Every clinical decision belongs to the treating paediatrician.
