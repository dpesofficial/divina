# Divina Thapa — Medical Record

A self-contained, mobile-first static site holding the complete medical record, timeline, results and guideline research for **Divina Thapa** (female, 3 years, Banepa, Nepal), covering 7 May to 21 August 2026.

Built from 32 photographed pages across three hospitals and two laboratories.

> ⚠️ **This repository is PUBLIC and contains identifiable medical information about a child.** That was a deliberate choice by the owner. See [Privacy](#privacy) below before forking, sharing or reusing it.

---

## What is in it

| Section | Contents |
|---|---|
| **Overview** | Current status banner, four key findings, the five results still missing, current medication |
| **Timeline** | All 23 recorded contacts and results, newest first, filterable by type and hospital, each with the original scan attached |
| **Results** | CRP and weight charts, every urine sample compared, every blood value checked against paediatric reference ranges, full medication history, every diagnosis recorded |
| **Research** | Seven guideline-backed research cards with 21 linked sources, plus 20 questions for the doctor with tick-off tracking |
| **Search** | Every measured value in the record — 159 results across 65 tests. Type "CRP" and get every reading with date, colour-coded severity, printed range, the correct paediatric range, and a trend sparkline |
| **Analysis** | Pattern synthesis across the whole record: what the data shows, what is on the table for the current illness, red-flag safety netting, and seven concrete things to improve |
| **Records** | All 32 scanned pages, patient details, hospital identifiers, clinicians, facilities, paperwork problems, and a plain-English glossary of every abbreviation on the papers |

### Headline findings

- **Currently unresolved:** low-grade fever since 17 August, blood culture result outstanding
- **The CRP is a semi-quantitative latex titre, not a precise number.** 48 and 96 are 6×8 and 6×16 on a doubling scale, so 96 means "somewhere in the 96–191 band" and 48→96 is one dilution step. CRP in the 50–100 range cannot separate viral from bacterial. White cell count is normal with a lymphocyte shift
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

All content lives in three data files. You never need to edit the HTML, CSS or JavaScript.

| File | Holds |
|---|---|
| `data/records.js` | Timeline, status, key findings, medication, research, questions, scans |
| `data/labvalues.js` | Every measured value — drives the Search page |
| `data/analysis.js` | The Analysis page |

Full copy-paste templates are in **[HOW-TO-ADD.md](HOW-TO-ADD.md)** — covering new visits, lab results, personal notes, scanned images, lab values, research cards, analysis entries, medication courses and questions for the doctor.

**When a new result arrives, update three places:** add it to `TIMELINE`, add it to `LAB_VALUES`, and remove it from `OUTSTANDING`.

Validate an edit before refreshing:

```bash
node --check data/records.js && node --check data/labvalues.js && node --check data/analysis.js
```

---

## Structure

```
.
├── index.html              page shell
├── data/
│   ├── records.js          timeline, status, findings, meds, research, questions
│   ├── labvalues.js        every measured value — drives Search
│   └── analysis.js         the Analysis page
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
- Medication tracker computes days remaining and doses completed live from the course dates, so it stays accurate without editing
- Search runs entirely client-side over a 159-row index with alias matching, so "kidney" finds creatinine
- Print stylesheet included, so the questions page can be printed for an appointment
- Total page weight around 5.5 MB, almost all of it the scanned images, which lazy-load

---

## Privacy

This repository contains a named child's full medical history, home address, hospital record numbers and a guardian's phone number. **It is currently public, with GitHub Pages enabled**, at the owner's explicit instruction after the risks were set out.

What that means in practice:

- The content is world-readable and reachable by anyone with the URL
- It will be indexed and cached by search engines and web archives
- Deleting it later does **not** reliably remove those cached copies
- The `noindex, nofollow, noarchive` meta tags only discourage well-behaved crawlers. They are not access control

**To make it private later:** `gh repo edit dpesofficial/divina --visibility private --accept-visibility-change-consequences`, then disable Pages. Do this sooner rather than later if you change your mind — the longer it is up, the more copies exist elsewhere.

---

## Disclaimer

This site records what the original documents state, plus published clinical guideline context with sources attached to every claim. The **Analysis** page additionally contains an AI-generated pattern synthesis, clearly labelled as such, which frames every item as a question for the doctor rather than a conclusion. **Nothing here is a diagnosis or treatment advice.** Guidelines cited are British, Australian and Canadian, plus Nepali research where local disease patterns are relevant; practice in Nepal may reasonably differ. Every clinical decision belongs to the treating paediatrician.
