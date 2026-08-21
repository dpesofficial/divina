# How to add things to this site

Everything on the site is generated from **three data files**. You never need to touch the HTML, CSS or JavaScript.

| File | What it holds | Sections below |
|---|---|---|
| `data/records.js` | Timeline, status, key findings, medication, research, questions, scans | 1–8, 11 |
| `data/labvalues.js` | Every measured value — powers the Search page | 9 |
| `data/analysis.js` | The Analysis page | 10 |

Open the file in any text editor, paste the template you need, save, refresh the page.

> **Two rules.** Keep the commas between entries. Keep the quote marks. If the page goes blank after an edit, you have almost certainly dropped a comma or a quote — open the browser console and it will tell you which line.

---

## 1. Add a new visit or lab result

Find `const TIMELINE = [` and paste a new block anywhere inside it. Order does not matter, the site sorts by date.

```js
{
  id: "e-20260901",              // unique, no spaces. Convention: e-YYYYMMDD
  date: "2026-09-01",            // ISO format, always YYYY-MM-DD
  dateBS: "2083/05/16",          // optional Nepali date, omit if unknown
  kind: "visit",                 // "visit" or "lab"
  facility: "Scheer Memorial Adventist Hospital",
  facilityShort: "Scheer",       // Scheer | K.B. | Karuna | Seer — drives the filter buttons
  clinician: "Dr Niraj Khatri",
  title: "Short headline for the card",
  tags: ["Fever", "Follow-up"],  // small pills on the card
  tone: "warn",                  // critical | warn | watch | ok | info — sets the colour
  summary: "One sentence shown before you tap Read more.",
  vitals: { Weight: "15.8 kg", Temp: "99 °F" },     // optional, omit if none
  blocks: [
    { h: "Complaints", items: ["First thing", "Second thing"] },
    { h: "Examination", items: ["What the doctor found"] },
    { h: "Plan", items: ["What happens next"] }
  ],
  meds: ["Syp Something 5 ml PO BD × 5 days"],       // optional
  images: ["p33.jpg"],                               // optional, see section 3
  notes: ["Anything you want flagged in an amber box."]   // optional
},
```

**Tone colours**

| tone | use it for |
|---|---|
| `critical` | needs action now, or a key positive result |
| `warn` | abnormal, unresolved, or something to chase |
| `watch` | mild or borderline, keep an eye on it |
| `ok` | normal result, problem resolved |
| `info` | neutral, routine |

---

## 2. Add a personal note

Find `const NOTES = [` and add:

```js
{ date: "2026-08-25", author: "Dipesh", text: "Fever broke overnight. Ate breakfast normally.", images: [] },
```

These appear under **Records → Your own notes**.

---

## 3. Add a new scanned page or photo

1. Put the image in `images/` — name it `p33.jpg`, `p34.jpg` and so on, carrying on from the last number.
2. Put a smaller copy of the same file in `images/thumbs/` with the **same filename**. Resize it to about 420 px on the long edge so the gallery loads fast on mobile.
3. Register it. Find `const DOCUMENTS = [` and add:

```js
{ file: "p33.jpg", date: "2026-09-01", label: "Blood culture result", facility: "Karuna" },
```

4. Optionally attach it to a timeline entry by adding the filename to that entry's `images: [...]` array.

**If you cannot resize the thumbnail**, just copy the same full-size file into `images/thumbs/`. It will still work, only slower.

To rotate a sideways photo before adding it, this one-liner handles a whole folder:

```bash
python -c "from PIL import Image; import glob; [Image.open(f).rotate(-90, expand=True).save(f) for f in glob.glob('images/p33.jpg')]"
```

---

## 4. Change the status banner at the top

Find `const STATUS = {`. Update `headline`, `detail`, `since`, and the `currentMeds` list. Set `level` to `"active"`, `"watch"` or `"stable"` — this changes the banner colour and stops the pulsing dot when things settle.

---

## 5. Tick a result off the missing list

Find `const OUTSTANDING = [` and delete the entry once you have the report in hand. Then add the actual result as a new `TIMELINE` entry.

---

## 6. Add a question for the doctor

Find `const QUESTIONS = [` and add a string to whichever `items: [...]` group fits. Ticks are saved per device in the browser.

---

## 7. Add a new research finding

Find `const RESEARCH = [` and add:

```js
{
  id: "r-something",
  tone: "warn",
  title: "Card heading",
  lead: "One line that summarises it.",
  body: ["First paragraph.", "Second paragraph."],
  subsections: [                                    // optional
    { h: "Sub heading", items: ["Bullet one", "Bullet two"] }
  ],
  sources: [
    { label: "Name of the guideline", url: "https://example.org" }
  ]
},
```

To link a key finding on the home page to it, add the `id` to that finding's `links: [...]` array.

---

## 8. Update the "last updated" date

At the very top of the file:

```js
const META = { lastUpdated: "2026-09-01", compiledFrom: "34 photographed pages", version: 2 };
```

---

## Viewing the site

**On a phone:** open `index.html`. Everything is local — no internet needed once the files are on the device.

**On a computer, properly:** run a tiny local server from inside the `site` folder so images and data load cleanly.

```bash
python -m http.server 4179
```

Then open `http://localhost:4179`.

**Checking your edit did not break anything:**

```bash
node --check data/records.js
```

Silence means the file is valid.

---

## What is where

```
site/
├── index.html              the page shell — rarely needs touching
├── data/
│   ├── records.js          timeline, status, findings, meds, research, questions
│   ├── labvalues.js        every measured value — drives Search
│   └── analysis.js         the Analysis page
├── assets/
│   ├── css/style.css       styling, light and dark themes
│   └── js/app.js           the renderer
├── images/                 full-size scans
│   └── thumbs/             small copies for the gallery grid
├── reports/                the same content as printable markdown
├── README.md
└── HOW-TO-ADD.md           this file
```

**Validate every file after editing:**

```bash
node --check data/records.js && node --check data/labvalues.js && node --check data/analysis.js
```

---

## 9. Add a lab value so it appears in Search

The Search page reads from a separate file: `data/labvalues.js`. One line per result per date.

```js
{d:"2026-08-28", t:"Blood culture", a:"blood culture bc sepsis enteric typhoid",
 c:"Culture", v:"NO GROWTH", u:"", r:"No growth",
 p:"Optional note — the correct paediatric range, or anything worth flagging",
 f:"NEG", x:"ok", s:"Karuna", e:"e-20260821-visit"},
```

| Field | Meaning |
|---|---|
| `d` | date, `YYYY-MM-DD` |
| `t` | test name — results with the same name group together and get a trend sparkline |
| `a` | alias words, so searching "kidney" finds creatinine. Be generous here |
| `c` | category: `Blood` `Urine` `Stool` `Serology` `Vitals` `Culture` |
| `v` | the value as printed |
| `u` | unit, or `""` |
| `r` | reference range as printed on the report |
| `p` | your note — the correct paediatric range, a caveat, anything useful |
| `f` | flag: `"H"` `"L"` `"POS"` `"NEG"` or `""` |
| `x` | colour: `critical` `warn` `watch` `ok` `muted` |
| `s` | which lab or clinic |
| `e` | the TIMELINE entry id it belongs to |
| `n` | numeric value — add this and the test gets a trend sparkline |

Add a quick-search button by adding the test name to `SEARCH_CHIPS` at the bottom of the same file.

---

## 10. Update the Analysis page

`data/analysis.js` holds five separate lists. Each is independent — edit whichever you need.

| Constant | What it drives |
|---|---|
| `PATTERNS` | The "What the pattern shows" accordions |
| `CURRENT_EPISODE` | The current illness: `summary`, `excluded`, `onTable`, `untested` |
| `WATCH_OUT` | The red-flag cards. `urgency` can be `emergency` `sameday` `kawasaki` `meds` |
| `IMPROVEMENTS` | The "Things to improve" accordions |
| `LIMITS` | The honest list of what the analysis cannot know |

**When a result comes back, update three places:** add it to `TIMELINE`, add it to `LAB_VALUES`, and remove it from `OUTSTANDING` in `records.js`. Then revisit `CURRENT_EPISODE.onTable` — a blood culture result will settle several of those entries.

---

## 11. Update medication end dates

In `records.js`, `STATUS.currentMeds`. The countdown and the segmented day tracker are calculated live from these, so they stay accurate without you touching them again.

```js
{ name: "Syp Something", generic: "Drug 100 mg/5 ml", dose: "5 ml PO BD",
  course: "7 days", start: "2026-09-01", end: "2026-09-07", doses: 14,
  why: "What it is for",
  note: "Anything worth knowing — shown under the progress bar" },
```

- `start` and `end` are the first and last day of the course
- `doses` is the total number of doses across the whole course, used for the "x of y doses" counter
- Set `end: null` and `doses: null` for anything taken only as needed
