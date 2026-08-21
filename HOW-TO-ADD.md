# How to add things to this site

Everything on the site is generated from **one file**: `data/records.js`.
You never need to touch the HTML, CSS or JavaScript.

Open `data/records.js` in any text editor, paste the template you need, save, refresh the page.

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
│   └── records.js          ALL content lives here
├── assets/
│   ├── css/style.css       styling, light and dark themes
│   └── js/app.js           the renderer
├── images/                 full-size scans
│   └── thumbs/             small copies for the gallery grid
└── HOW-TO-ADD.md           this file
```
