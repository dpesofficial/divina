/* ============================================================================
   DIVINA THAPA — MEDICAL RECORD DATA
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit to add new records, notes or images.
   Everything on the site is rendered from the objects below.
   See HOW-TO-ADD.md in the site root for copy-paste templates.
   ========================================================================== */

const META = {
  lastUpdated: "2026-08-21",
  compiledFrom: "32 photographed pages",
  version: 1
};

/* -------------------------------------------------------------------------- */
const PATIENT = {
  name: "Divina Thapa",
  altSpelling: "Devina Thapa (on one lab report)",
  sex: "Female",
  ageNow: "3 years",
  ageRange: "2 y 5 m → 3 y across these records",
  location: "Banepa Municipality-10 / Janagal, Kavrepalanchok, Nepal",
  guardian: "Dipesh — 9843185625",
  allergies: "None recorded in any document",
  ids: [
    { facility: "Scheer Memorial Adventist Hospital", id: "UHID 509113" },
    { facility: "K.B. Hospital Pvt. Ltd., Banepa-7", id: "Patient ID 189152" },
    { facility: "Karuna Pathology Lab / Seer Imaging", id: "Hospital ID 124721" },
    { facility: "Karuna — 28 May report only", id: "Hospital ID 124916 (possible duplicate)" }
  ],
  clinicians: [
    { name: "Dr Niraj Khatri", role: "Paediatrician", reg: "NMC 16524", facility: "Scheer Memorial Adventist Hospital" },
    { name: "Dr Subha Sanjh Sainju", role: "MBBS, MD Paediatrics", reg: "NMC 25320", facility: "K.B. Hospital" },
    { name: "Dr Kavi R. Rai", role: "Senior Consultant Paediatrician", reg: "NMC 6812", facility: "K.B. Hospital" },
    { name: "Dr Neeta Timalsina", role: "Referring clinician", reg: "—", facility: "Seer Imaging & Diagnostic Center" }
  ]
};

/* -------------------------------------------------------------------------- */
const STATUS = {
  level: "active",                      // active | watch | stable
  headline: "Unexplained fever, still unresolved",
  since: "2026-08-17",
  detail:
    "Low-grade fever persisting since around 17 August, preceded by left eye swelling. " +
    "CRP raised at an estimated 96 mg/L — but by a semi-quantitative latex slide method, so read it as a band, not a precise figure. " +
    "White cell count normal with a lymphocyte shift. Dengue negative. Liver and kidney function normal. " +
    "Started on amoxicillin-clavulanate 21 August. Blood culture sent — result outstanding.",
  currentMeds: [
    { name: "Syp AMX-CV / Mega-CV Forte", generic: "Amoxicillin + clavulanate 457 mg/5 ml", dose: "4 ml PO BD",
      course: "7 days", start: "2026-08-21", end: "2026-08-27", doses: 14,
      why: "Persistent fever with raised CRP",
      note: "Finish the full course even if the fever settles. The date the course ends is also the natural point to reassess — if she is no better by then, that is information the doctor needs." },
    { name: "Syp FEZA", generic: "Fexofenadine 30 mg/5 ml", dose: "5 ml PO BD",
      course: "1 week", start: "2026-08-17", end: "2026-08-23", doses: 14,
      why: "Eye swelling, treated as allergy",
      note: "Antihistamine. If the swelling has fully gone by the end date it does not need continuing without asking." },
    { name: "Unnamed syrup", generic: "Handwriting illegible on the page", dose: "5 ml PO once daily",
      course: "2 weeks", start: "2026-08-21", end: "2026-09-03", doses: 14,
      why: "Unknown — the name cannot be read",
      note: "Identify this before giving any more of it. Take the bottle or the prescription page back to the clinic." },
    { name: "Syp NIKO", generic: "Paracetamol 125 mg/5 ml", dose: "8 ml PO as needed",
      course: "As needed, no fixed end", start: "2026-08-19", end: null, doses: null,
      why: "Fever, when temperature reaches 100 °F",
      note: "PRN only. Check the 24-hour total if any other paracetamol preparation is also in use — Pacimol, NIKO and Meftal have all appeared in this record." }
  ]
};

/* -------------------------------------------------------------------------- */
/* The four storylines. Shown on the home screen as expandable cards.          */
const KEY_FINDINGS = [
  {
    id: "kf-fever",
    tone: "critical",
    icon: "thermometer",
    title: "Unexplained fever, ongoing",
    oneLiner: "Low-grade fever since 17 Aug. CRP raised, but by a coarse method. No diagnosis yet.",
    stat: { value: "~96", unit: "mg/L", label: "CRP estimate · semi-quantitative" },
    body: [
      "Started with swelling around the left eye on 17 August, attributed to a possible insect bite or allergy. Fever followed and has not settled.",
      "On 21 August the paediatrician ordered a full workup: CBC, CRP, LFT, RFT, blood culture, urine R/E and urine culture. Dengue NS1, IgM and IgG were all negative. Liver and kidney function were normal.",
      "IMPORTANT ON THE CRP. The report says TITER, which means this is a latex agglutination slide test, not a quantitative analyser. The result is worked out as 6 mg/L multiplied by the last dilution that clumped, which is exactly why the two readings are 48 and 96 — steps on a doubling scale. Read 96 as somewhere in the 96 to 191 band, not as a precise figure. The move from 48 to 96 is one single step, the smallest change this test can register.",
      "It is genuinely raised. But CRP between 50 and 100 overlaps heavily between viral and bacterial illness, and a single reading cannot separate the two. Her white cell count is normal at 9,400, with lymphocytes up to 40% and neutrophils down to 55% — a pattern that leans viral rather than bacterial, without settling it.",
      "She was started on amoxicillin-clavulanate. The blood culture result is not in the records and is the single most important outstanding item."
    ],
    links: ["r-crp", "r-nepal", "r-eye"]
  },
  {
    id: "kf-uti",
    tone: "warn",
    icon: "droplet",
    title: "Recurring genital irritation — mostly NOT proven infection",
    oneLiner: "Five urine cultures. Only one grew anything.",
    stat: { value: "1 / 5", unit: "", label: "Positive urine cultures" },
    body: [
      "The oldest problem in the file. First recorded on 7 May 2026 as vulvovaginitis, with the parents reporting it had already been going on for three months — so back to roughly February 2026.",
      "Recurred 25 June and urinary symptoms returned on 18 July. Across the whole period five urine cultures were taken. Only the 17 May one grew an organism: E. coli, sensitive to cefixime, resistant to amoxycillin and azithromycin. She completed a 7-day cefixime course.",
      "On 31 May burning on passing urine was still reported after that course finished — and the culture taken the same day grew nothing.",
      "Published guidance says vulval inflammation in young girls very commonly produces exactly this picture: burning, frequency and white cells in the urine, without a urine infection. See the research section."
    ],
    links: ["r-vulvo", "r-imaging"]
  },
  {
    id: "kf-throat",
    tone: "watch",
    icon: "lungs",
    title: "Recurring throat infection",
    oneLiner: "Tonsillitis in June. Tonsils still enlarged in July.",
    stat: { value: "Grade 2", unit: "", label: "Tonsil enlargement, 20 Jul" },
    body: [
      "21 June: cough for two weeks plus one day of fever at 102 °F. Tonsils bilaterally enlarged and congested. Diagnosed as acute follicular tonsillitis and treated with amoxicillin-clavulanate, a mucolytic and an anti-inflammatory.",
      "25 June: symptoms resolved.",
      "20 July: reviewed by a second paediatrician. Throat still congested with tonsils enlarged to grade 2, a month after the acute episode settled."
    ],
    links: []
  },
  {
    id: "kf-weight",
    tone: "watch",
    icon: "trend",
    title: "Weight going the wrong way",
    oneLiner: "16.4 kg down to 15.6 kg over eleven weeks.",
    stat: { value: "−0.8", unit: "kg", label: "31 May → 17 Aug" },
    body: [
      "Peak recorded weight was 16.4 kg on 31 May and 3 June. By 17 August she was 15.6 kg. A three-year-old should be slowly gaining.",
      "Context that softens it: on 20 July she was at the 88th centile for weight with a BMI on the 86th centile, described in the notes as 'at risk of overweight'. She started from an above-average position, and repeated infections suppress appetite.",
      "Context that keeps it on the list: it is still the wrong direction over eleven weeks, and it overlaps a period of unexplained inflammation. Height was recorded only once in the entire file, so no BMI trend is possible."
    ],
    links: ["r-growth"]
  }
];

/* -------------------------------------------------------------------------- */
/* Results that were ordered or advised but never appear in the paperwork.     */
const OUTSTANDING = [
  { priority: 1, item: "Blood culture", date: "2026-08-21", why: "Ordered during the current fever. With CRP at 96 this is the key result. In Nepal it is primarily looking for enteric fever." },
  { priority: 1, item: "Urine R/E and urine culture", date: "2026-08-21", why: "Both ordered on the same day. Neither result is in the records." },
  { priority: 2, item: "Urine culture", date: "2026-07-18", why: "Sent at the visit. The doctor asked for follow-up with the report on the Monday. No report exists in the file." },
  { priority: 1, item: "Ultrasound abdomen + pelvis", date: "2026-05-31", why: "Advised straight after the confirmed E. coli infection. This matches NICE guidance for a child under 3 after UTI. No report anywhere — confirm whether it was ever done." },
  { priority: 2, item: "Ophthalmology consult", date: "2026-08-17", why: "Advised for the left eye swelling. No record it happened, and the fever followed." }
];

/* -------------------------------------------------------------------------- */
/* Data-quality issues worth resolving.                                        */
const DISCREPANCIES = [
  { title: "Immunisation status contradicts itself", detail: "Recorded as 'complete' on 17 May 2026. On 20 July the note says 'EPI scheduled' and 'update immunisation'. These cannot both be right." },
  { title: "Possible duplicate lab record", detail: "The 28 May report is filed under 'DEVINA THAPA', hospital ID 124916. Every other Karuna report is 'DIVINA THAPA', ID 124721. Almost certainly the same child registered twice, which can split results across two files." },
  { title: "One medication is illegible", detail: "A third syrup prescribed on 21 August, 5 ml once daily for two weeks. The name cannot be read on the page." },
  { title: "Two parallel care streams", detail: "Scheer Memorial and K.B. Hospital were each treating her over the same months, with labs split between Karuna and K.B. Nothing in the notes suggests either paediatrician had the other's records." },
  { title: "Height measured once", detail: "95 cm on 20 July 2026 is the only height in the entire file, so weight loss cannot be read against growth." }
];

/* -------------------------------------------------------------------------- */
/* THE TIMELINE. Newest is rendered first. Add new entries anywhere — the app
   sorts by date. See HOW-TO-ADD.md for the template.                          */
const TIMELINE = [

  /* ---------- MAY 2026 ---------- */
  {
    id: "e-20260507",
    date: "2026-05-07",
    kind: "visit",
    facility: "Scheer Memorial Adventist Hospital",
    facilityShort: "Scheer",
    clinician: "Dr Niraj Khatri",
    title: "First recorded consultation",
    tags: ["Allergic rhinitis", "Vulvovaginitis"],
    tone: "info",
    summary: "On/off nose rubbing and runny nose. Diagnosed with allergic rhinitis alongside vulvovaginitis.",
    vitals: { Weight: "16.1 kg" },
    blocks: [
      { h: "Complaints", items: ["On and off nose rubbing", "On and off rhinorrhoea (runny nose)"] },
      { h: "Impression", items: ["Allergic Rhinitis with Vulvovaginitis"] },
      { h: "Advice", items: ["Danger signs explained", "Follow up as needed"] }
    ],
    meds: [
      "Syp Levocetirizine (L-CTZ) 4 ml PO at night (5 ml = 2.5 mg) × 1 week",
      "Drop Decon-P, 2 drops TDS × 3 days",
      "Sitz bath BD × 1 week"
    ],
    images: ["p19.jpg", "p20.jpg"],
    notes: []
  },

  {
    id: "e-20260517-visit",
    date: "2026-05-17",
    dateBS: "2083/02/03",
    kind: "visit",
    facility: "Seer Imaging & Diagnostic Center, Banepa-8",
    facilityShort: "Seer",
    clinician: "Dr Neeta Timalsina",
    title: "Vulval redness and itching — 3 month history",
    tags: ["Vulvovaginitis"],
    tone: "warn",
    summary: "Parents report redness and itching of the vulval region on and off for three months. No discharge.",
    vitals: { Weight: "16 kg", "SpO₂": "98%", "Pulse": "182 /min" },
    blocks: [
      { h: "Complaints", items: [
        "Redness and itchy vulval region, on and off, for 3 months",
        "No discharge",
        "Bowel and bladder habit normal",
        "Sitz baths had been reduced after the earlier paediatric consult"
      ]},
      { h: "Background", items: ["Immunisation recorded as complete", "Developmental milestones normal"] },
      { h: "Same-day results", items: ["Urine R/E — pus cells 7–9/hpf, leukocytes positive", "Urine culture — E. coli isolated"] },
      { h: "Advice", items: ["Follow up with reports"] }
    ],
    meds: [
      "Ointment Candid (plain) locally BD × 7 days",
      "Coconut water BD × 7 days, plenty of water",
      "Syp Cefixime (100 mg/5 ml) 5 ml PO BD × 7 days — on a separate prescription page",
      "A nitrofurantoin syrup line is written on the page then struck through"
    ],
    images: ["p17.jpg", "p18.jpg"],
    notes: []
  },

  {
    id: "e-20260517-urine",
    date: "2026-05-17",
    dateBS: "2083/02/03",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: self",
    title: "Urine routine examination",
    tags: ["Urine R/E", "Abnormal"],
    tone: "warn",
    summary: "Leukocytes positive, pus cells 7–9 per high power field. The most abnormal urine in the whole file.",
    blocks: [
      { h: "Physical", items: ["Colour light yellow", "Slightly turbid", "Specific gravity 1.008"] },
      { h: "Chemical", items: ["Albumin nil", "Sugar nil", "pH 6", "Ketone nil", "Bilirubin nil", "Blood nil", "Leukocytes POSITIVE (+)"] },
      { h: "Microscopic", items: ["Pus cells 7–9 /hpf", "Epithelial cells 3–5 /hpf", "RBC nil", "Casts, crystals nil"] }
    ],
    images: ["p15.jpg"],
    notes: []
  },

  {
    id: "e-20260517-culture",
    date: "2026-05-17",
    dateBS: "2083/02/03",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: Dr Neeta Timalsina",
    title: "Urine culture — E. COLI isolated",
    tags: ["Culture", "Positive", "Key result"],
    tone: "critical",
    summary: "The only positive culture in the entire record. E. coli, with a full sensitivity panel.",
    blocks: [
      { h: "Result", items: ["E. coli isolated from the culture"] },
      { h: "Sensitive to", items: ["Norfloxacin", "Cefixime", "Nitrofurantoin", "Gentamicin", "Ofloxacin", "Ciprofloxacin", "Amikacin", "Ceftriaxone", "Levofloxacin", "Cloxacillin"] },
      { h: "RESISTANT to", items: ["Amoxycillin", "Azithromycin"] }
    ],
    images: ["p16.jpg"],
    notes: ["Keep this sensitivity panel. If a urinary infection is ever suspected again, this is the sheet the doctor needs."]
  },

  {
    id: "e-20260528",
    date: "2026-05-28",
    dateBS: "2083/02/14",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: self",
    title: "Urine routine examination — normal",
    tags: ["Urine R/E", "Normal"],
    tone: "ok",
    summary: "Everything within range. Recorded under the name 'Devina Thapa' with a different hospital ID.",
    blocks: [
      { h: "Physical", items: ["Light yellow, slightly turbid", "Specific gravity 1.023", "pH 6"] },
      { h: "Chemical", items: ["Albumin, sugar, ketone, bilirubin, blood, leukocytes — all NIL"] },
      { h: "Microscopic", items: ["Pus cells 1–4 /hpf", "Epithelial cells 2–4 /hpf", "RBC 2–4 /hpf", "Casts, crystals nil"] }
    ],
    images: ["p14.jpg"],
    notes: ["Filed as 'DEVINA THAPA', hospital ID 124916 — differs from every other Karuna report."]
  },

  {
    id: "e-20260531-visit",
    date: "2026-05-31",
    dateBS: "2083/02/17",
    kind: "visit",
    facility: "Scheer Memorial Adventist Hospital",
    facilityShort: "Scheer",
    clinician: "Dr Niraj Khatri",
    title: "Follow-up of UTI — ultrasound advised",
    tags: ["UTI follow-up", "Imaging advised"],
    tone: "warn",
    summary: "Burning on passing urine still present after a completed 7-day cefixime course. Ultrasound of abdomen and pelvis advised.",
    vitals: { Weight: "16.4 kg" },
    blocks: [
      { h: "Findings", items: [
        "Burning micturition still on and off",
        "Urine culture had grown E. coli, sensitive to cefixime",
        "7-day cefixime course completed",
        "No fever"
      ]},
      { h: "Advice", items: [
        "Repeat urine culture and sensitivity",
        "ULTRASOUND ABDOMEN + PELVIS",
        "Follow up with reports"
      ]}
    ],
    meds: ["Syp Urizer 5 ml in one glass of water BD × 1 week"],
    images: ["p21.jpg", "p22.jpg"],
    notes: ["This ultrasound has no report anywhere in the file. It is the clearest guideline-indicated gap in the record."]
  },

  {
    id: "e-20260531-urine",
    date: "2026-05-31",
    dateBS: "2083/02/17",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: self",
    title: "Urine routine examination",
    tags: ["Urine R/E"],
    tone: "watch",
    summary: "Trace leukocytes, pus cells 3–5. Milder than 17 May.",
    blocks: [
      { h: "Physical", items: ["Light yellow, slightly turbid", "Specific gravity 1.022", "pH 6"] },
      { h: "Chemical", items: ["Albumin, sugar, ketone, bilirubin, blood — nil", "Leukocytes TRACE"] },
      { h: "Microscopic", items: ["Pus cells 3–5 /hpf", "Epithelial cells 2–3 /hpf", "RBC 1–2 /hpf"] }
    ],
    images: ["p12.jpg"],
    notes: []
  },

  {
    id: "e-20260531-culture",
    date: "2026-05-31",
    dateBS: "2083/02/17",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: Scheer Memorial",
    title: "Urine culture — no growth",
    tags: ["Culture", "Negative"],
    tone: "ok",
    summary: "No growth after 48 hours of incubation at 37 °C. Reported 3 June.",
    blocks: [{ h: "Result", items: ["No growth after 48 hours of incubation at 37 °C"] }],
    images: ["p13.jpg"],
    notes: ["Taken the same day burning micturition was still being reported — a key data point for the vulvovaginitis question."]
  },

  /* ---------- JUNE 2026 ---------- */
  {
    id: "e-20260603",
    date: "2026-06-03",
    dateBS: "2083/02/20",
    kind: "visit",
    facility: "Scheer Memorial Adventist Hospital",
    facilityShort: "Scheer",
    clinician: "Dr Niraj Khatri",
    title: "Follow-up — reassurance only",
    tags: ["UTI follow-up"],
    tone: "ok",
    summary: "Attended by proxy. Culture negative. No new medication given.",
    vitals: { Weight: "16.4 kg" },
    blocks: [
      { h: "Findings", items: ["Urine culture: no growth"] },
      { h: "Plan", items: ["Reassurance and counselling", "No new medication"] }
    ],
    images: ["p23.jpg"],
    notes: []
  },

  {
    id: "e-20260621",
    date: "2026-06-21",
    dateBS: "2083/03/07",
    kind: "visit",
    facility: "K.B. Hospital Pvt. Ltd.",
    facilityShort: "K.B.",
    clinician: "Dr Subha Sanjh Sainju",
    title: "Acute follicular tonsillitis",
    tags: ["Tonsillitis", "Fever"],
    tone: "warn",
    summary: "Cough for two weeks with rattling in the chest, then one day of fever at 102 °F. Tonsils bilaterally enlarged and congested.",
    vitals: { Weight: "15.8 kg", Temp: "100.7 °F", "Heart rate": "150 /min", "SpO₂": "98%" },
    blocks: [
      { h: "Complaints", items: [
        "Cough × 2 weeks, with rattling sounds in neck and chest",
        "Fever × 1 day, maximum 102 °F, with sweating"
      ]},
      { h: "Examination", items: [
        "Alert and playful",
        "No pallor, oedema or cyanosis; not jaundiced",
        "Chest: bilaterally equal breath sounds, no added sounds",
        "Heart: normal, no murmur",
        "Abdomen: nothing abnormal",
        "THROAT: tonsils bilaterally enlarged and congested"
      ]},
      { h: "Diagnosis", items: ["Acute follicular tonsillitis"] },
      { h: "Advice", items: ["Danger signs explained", "Follow up Thursday or sooner if needed"] }
    ],
    meds: [
      "Syp Indclav DS (452 mg/5 ml) 5 ml PO BD × 5 days",
      "Syp Porica BM 5 ml PO TDS × 5 days",
      "Syp Meftal-P (100 mg/5 ml) 5 ml PO TDS × 3 days, then as needed"
    ],
    images: ["p10.jpg"],
    notes: []
  },

  {
    id: "e-20260625-visit",
    date: "2026-06-25",
    dateBS: "2083/03/11",
    kind: "visit",
    facility: "K.B. Hospital Pvt. Ltd.",
    facilityShort: "K.B.",
    clinician: "Dr Subha Sanjh Sainju",
    title: "Tonsillitis resolved — but genital itching returns",
    tags: ["Tonsillitis", "Vulvovaginitis"],
    tone: "watch",
    summary: "Throat symptoms fully resolved. New complaint: itching in the genital area for a few days — the May problem returning.",
    vitals: { Weight: "16.1 kg", Temp: "96.7 °F", "Heart rate": "~128 /min", "SpO₂": "98%" },
    blocks: [
      { h: "Findings", items: [
        "Tonsillitis symptoms resolved",
        "No fresh complaints EXCEPT itching in the genital area for a few days",
        "Alert and playful, examination otherwise normal"
      ]},
      { h: "Investigations ordered", items: ["Urine R/E", "Urine culture and sensitivity", "Stool R/E"] },
      { h: "Plan", items: ["Continue medicines as prescribed", "Follow up with reports"] }
    ],
    images: ["p11.jpg"],
    notes: []
  },

  {
    id: "e-20260625-urine",
    date: "2026-06-25",
    dateBS: "2083/03/11",
    kind: "lab",
    facility: "K.B. Hospital",
    facilityShort: "K.B.",
    clinician: "Referred: Dr Subha Sainju",
    title: "Urine routine examination — normal",
    tags: ["Urine R/E", "Normal"],
    tone: "ok",
    summary: "Clear urine, everything nil or minimal. Taken while she was complaining of genital itching.",
    blocks: [
      { h: "Physical", items: ["Light yellow", "Clear", "Specific gravity 1.010", "pH 6.5"] },
      { h: "Chemical", items: ["Leucocyte nil", "Nitrite nil", "Urobilinogen nil", "Protein nil", "Blood nil", "Bilirubin nil", "Sugar nil"] },
      { h: "Microscopic", items: ["Pus cells 0–2 /hpf", "Epithelial cells 0–1 /hpf", "RBC 0–2 /hpf", "Casts, crystals nil"] }
    ],
    images: ["p08.jpg"],
    notes: ["Genital itching present, urine completely clean. Points away from urinary infection as the cause of the itch."]
  },

  {
    id: "e-20260625-stool",
    date: "2026-06-25",
    dateBS: "2083/03/11",
    kind: "lab",
    facility: "K.B. Hospital",
    facilityShort: "K.B.",
    clinician: "Referred: Dr Subha Sainju",
    title: "Stool routine examination — normal",
    tags: ["Stool R/E", "Normal"],
    tone: "ok",
    summary: "No parasites, no ova, no cysts. Note that stool testing is a poor test for threadworm.",
    blocks: [
      { h: "Physical", items: ["Brownish", "Solid", "No mucus", "No blood"] },
      { h: "Microscopic", items: ["Pus cells nil", "RBC nil", "Helminthic parasite: no ova seen", "Protozoal parasite: no cyst or trophozoite found", "Undigested food particles: trace"] }
    ],
    images: ["p07.jpg"],
    notes: ["Threadworm eggs are laid around the anus, not passed in stool. A clear stool result does not rule threadworm out — the sticky-tape test does."]
  },

  {
    id: "e-20260625-culture",
    date: "2026-06-25",
    dateBS: "2083/03/11",
    kind: "lab",
    facility: "K.B. Hospital",
    facilityShort: "K.B.",
    clinician: "Referred: Dr Subha Sainju",
    title: "Urine culture — no growth",
    tags: ["Culture", "Negative"],
    tone: "ok",
    summary: "No growth after 48 hours. Reported 27 June.",
    blocks: [{ h: "Result", items: ["No growth after 48 hours incubation"] }],
    images: ["p09.jpg"],
    notes: []
  },

  /* ---------- JULY 2026 ---------- */
  {
    id: "e-20260718-visit",
    date: "2026-07-18",
    dateBS: "2083/04/02",
    kind: "visit",
    facility: "K.B. Hospital Pvt. Ltd.",
    facilityShort: "K.B.",
    clinician: "Dr Subha Sanjh Sainju",
    title: "Fever with burning on passing urine",
    tags: ["Fever", "Urinary symptoms"],
    tone: "warn",
    summary: "One day of fever at 101 °F with burning on passing urine. External genitalia examined and recorded as normal.",
    vitals: { Weight: "15.7 kg", "SpO₂": "95.1% room air", "Heart rate": "~140 /min" },
    blocks: [
      { h: "Complaints", items: ["Fever × 1 day, maximum 101 °F", "Burning sensation during micturition"] },
      { h: "Examination", items: [
        "Alert and playful",
        "No pallor, oedema, cyanosis; not jaundiced",
        "External genitalia NORMAL"
      ]},
      { h: "Plan", items: ["Urine culture and sensitivity sent", "Follow up with the culture report on Monday"] }
    ],
    meds: ["Syp Meftal-P (100 mg/5 ml) 5 ml PO TDS × 3 days"],
    images: ["p06.jpg"],
    notes: ["This urine culture result never appears in the records."]
  },

  {
    id: "e-20260718-cbc",
    date: "2026-07-18",
    dateBS: "2083/04/02",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: self",
    title: "Full blood count and CRP",
    tags: ["CBC", "CRP", "Abnormal"],
    tone: "warn",
    summary: "White cells raised at 12,000 with 65% neutrophils. CRP positive at an estimated 48 by latex titre.",
    blocks: [
      { h: "Blood count", items: [
        "Haemoglobin 12.0 g/dL",
        "White cell count 12,000 /cumm — HIGH",
        "Neutrophils 65%, lymphocytes 30%, eosinophils 2%, monocytes 3%",
        "RBC 4.5 million", "PCV 33%", "MCV 75 fL", "MCH 26 pg", "MCHC 35%",
        "Platelets 268,000"
      ]},
      { h: "Inflammation", items: ["CRP POSITIVE, titre 48 (normal < 6)", "Same latex titre method — one dilution step below the 21 August reading."] }
    ],
    images: ["p03.jpg"],
    notes: ["The PCV and MCV 'low' flags are against adult reference ranges. See the Results tab."]
  },

  {
    id: "e-20260718-urine",
    date: "2026-07-18",
    dateBS: "2083/04/02",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: self",
    title: "Urine routine examination",
    tags: ["Urine R/E"],
    tone: "watch",
    summary: "Trace blood and trace leukocytes. Pus cells 2–4.",
    blocks: [
      { h: "Physical", items: ["Light yellow, slightly turbid", "Specific gravity 1.009", "pH 6"] },
      { h: "Chemical", items: ["Albumin, sugar, ketone, bilirubin — nil", "Blood TRACE", "Leukocytes TRACE"] },
      { h: "Microscopic", items: ["Pus cells 2–4 /hpf", "Epithelial cells 3–5 /hpf", "RBC 2–3 /hpf"] }
    ],
    images: ["p05.jpg"],
    notes: []
  },

  {
    id: "e-20260720",
    date: "2026-07-20",
    kind: "visit",
    facility: "K.B. Hospital, Paediatric OPD / Emergency",
    facilityShort: "K.B.",
    clinician: "Dr Kavi R. Rai",
    title: "Second opinion — the most complete assessment in the file",
    tags: ["Tonsillopharyngitis", "Constipation", "Growth"],
    tone: "info",
    summary: "A typed clinical summary. Full growth assessment, complete systems examination, and the only height measurement in the whole record.",
    vitals: { Weight: "15.7 kg", Height: "95 cm", Temp: "96.4 °F", "Heart rate": "114 /min", "SpO₂": "96% room air" },
    blocks: [
      { h: "Provisional diagnosis", items: [
        "Follow-up acute tonsillopharyngitis with no exudates",
        "Functional constipation",
        "Rule out urinary tract infection"
      ]},
      { h: "History", items: [
        "Fever to 101 °F three days prior with burning micturition",
        "Passage of hard stool, otherwise regular bowel and bladder habit",
        "Past medical history: functional constipation"
      ]},
      { h: "Growth assessment", items: [
        "BMI 17.4 kg/m² — 86th centile, 'at risk of overweight'",
        "Weight-for-age 88th centile",
        "Height-for-age 74th centile",
        "Healthy weight for her height: 12.7–15.6 kg",
        "Ponderal index 18.3"
      ]},
      { h: "Examination", items: [
        "Awake, afebrile, not in distress",
        "Throat congested, TONSILS ENLARGED GRADE 2",
        "Chest symmetrical, no retraction, clear breath sounds both sides",
        "Heart normal, no murmur",
        "Abdomen soft, non-tender, no organ enlargement",
        "Nervous system intact, no oedema, capillary refill under 2 seconds"
      ]},
      { h: "Advice", items: [
        "Monitor temperature 4-hourly and record",
        "ORS on demand, keep hydrated with oral fluids",
        "UPDATE IMMUNISATION",
        "High fibre diet and toilet training",
        "Health education and proper hygiene",
        "Danger signs explained",
        "Follow up Wednesday or sooner"
      ]}
    ],
    meds: [
      "Continue Syp Pacimol (125 mg/5 ml) 7.5 ml PO as needed / TDS",
      "ADD Syp Tummysoft 5 ml PO BD × 7 days"
    ],
    images: ["p04.jpg"],
    notes: ["Immunisation advice here contradicts the 17 May note that recorded immunisation as complete."]
  },

  /* ---------- AUGUST 2026 ---------- */
  {
    id: "e-20260817",
    date: "2026-08-17",
    dateBS: "2083/05/01",
    kind: "visit",
    facility: "Scheer Memorial Adventist Hospital",
    facilityShort: "Scheer",
    clinician: "Dr Niraj Khatri",
    title: "Left eye swelling appears",
    tags: ["Eye swelling", "Allergy"],
    tone: "warn",
    summary: "Swelling around the left eye, coming and going, with one episode of fever. Put down to a possible insect bite or allergy.",
    vitals: { Weight: "15.6 kg" },
    blocks: [
      { h: "Complaints", items: ["Eye swelling, on and off", "One episode of fever"] },
      { h: "Examination", items: [
        "Chest, heart, abdomen, nervous system — all normal",
        "SWELLING OF THE LEFT EYE, periorbital region involved"
      ]},
      { h: "Impression", items: ["? Insect bite / allergy"] },
      { h: "Advice", items: ["OPHTHALMOLOGY CONSULT IF NEEDED", "Urine R/E"] }
    ],
    meds: [
      "Syp FEZA (fexofenadine, 5 ml = 30 mg) 5 ml PO BD × 1 week",
      "Plus whatever the ophthalmologist prescribes"
    ],
    images: ["p24.jpg", "p25.jpg"],
    notes: ["The swelling was one-sided. Guidelines note that allergic periorbital swelling is more typically on both sides and painless."]
  },

  {
    id: "e-20260819",
    date: "2026-08-19",
    dateBS: "2083/05/03",
    kind: "visit",
    facility: "Scheer Memorial Adventist Hospital",
    facilityShort: "Scheer",
    clinician: "Dr Niraj Khatri",
    title: "Fever now the main problem",
    tags: ["Fever"],
    tone: "warn",
    summary: "Follow-up of the eye. Impression shifts to a possible viral fever. Workup promised if fever persists.",
    blocks: [
      { h: "Findings", items: ["Follow-up of left eye allergy / insect bite", "Chest, heart, abdomen, nervous system normal"] },
      { h: "Impression", items: ["? Viral fever"] },
      { h: "Plan", items: ["Workup if the fever persists"] }
    ],
    meds: [
      "Syp NIKO (paracetamol 125 mg/5 ml) 8 ml PO 6-hourly × 2 days, then as needed",
      "7.5 ml as needed if temperature reaches 100 °F"
    ],
    images: ["p27.jpg", "p28.jpg", "p26.jpg"],
    notes: []
  },

  {
    id: "e-20260821-visit",
    date: "2026-08-21",
    dateBS: "2083/05/05",
    kind: "visit",
    facility: "Scheer Memorial Adventist Hospital",
    facilityShort: "Scheer",
    clinician: "Dr Niraj Khatri",
    title: "Fever persisting — full workup ordered",
    tags: ["Fever", "Workup", "Most recent"],
    tone: "critical",
    summary: "Low-grade fever has not settled. Cough present. Full blood workup ordered including blood culture.",
    blocks: [
      { h: "Findings", items: [
        "Low-grade fever has PERSISTED, maximum 100 °F",
        "Cough present",
        "Paracetamol dose reduced",
        "Chest, heart, abdomen — all normal"
      ]},
      { h: "Investigations ordered", items: [
        "Full blood count", "CRP", "Liver function tests", "Renal function tests",
        "BLOOD CULTURE", "Urine R/E", "Urine culture and sensitivity"
      ]},
      { h: "Noted in chart", items: ["CRP 96 mg/L (latex titre estimate)", "Rest of the blood count unremarkable"] },
      { h: "Advice", items: ["Danger signs explained", "Follow up as needed"] }
    ],
    meds: [
      "Syp AMX-CV (amoxicillin + clavulanate, 5 ml = 457 mg) 4 ml PO BD × 7 days",
      "Syp NIKO 8 ml PO as needed when temp ≥ 100 °F",
      "A third syrup 5 ml PO once daily × 2 weeks — name illegible"
    ],
    images: ["p29.jpg", "p30.jpg", "p31.jpg", "p32.jpg"],
    notes: [
      "Blood culture result is not in the records. This is the most important outstanding item.",
      "Dispensed medicines photographed: Mega-CV Forte 457 mg and FEZA fexofenadine suspension."
    ]
  },

  {
    id: "e-20260821-cbc",
    date: "2026-08-21",
    dateBS: "2083/05/05",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: Scheer Memorial",
    title: "Full blood count",
    tags: ["CBC"],
    tone: "info",
    summary: "White cells now normal at 9,400. The Hb and MCV 'low' flags are adult reference ranges — both are normal for her age.",
    blocks: [
      { h: "Result", items: [
        "Haemoglobin 11.8 g/dL — flagged LOW against an adult range, but ABOVE the WHO paediatric cutoff of 11.0",
        "White cell count 9,400 /cumm — normal",
        "Neutrophils 55%, lymphocytes 40%, eosinophils 2%, monocytes 3%, basophils 0%",
        "RBC 4.6 million", "PCV 35%",
        "MCV 76 fL — flagged LOW against an adult range, but within the paediatric range for her age",
        "MCH 25 pg", "MCHC 33%", "Platelets 220,000"
      ]}
    ],
    images: ["p01.jpg"],
    notes: []
  },

  {
    id: "e-20260821-panel",
    date: "2026-08-21",
    dateBS: "2083/05/05",
    kind: "lab",
    facility: "Karuna Pathology Lab",
    facilityShort: "Karuna",
    clinician: "Referred: Scheer Memorial",
    title: "CRP, dengue, liver and kidney function",
    tags: ["CRP", "Dengue", "LFT", "RFT", "Key result"],
    tone: "critical",
    summary: "CRP raised at an estimated 96 by latex titre. Dengue negative on all three tests. Liver and kidney function normal.",
    blocks: [
      { h: "Inflammation", items: ["CRP POSITIVE, titre 96 (normal < 6)", "Method: latex agglutination slide test, semi-quantitative. Value = 6 mg/L x last dilution showing clumping.", "Interpret as a band of roughly 96-191 mg/L, not an exact figure."] },
      { h: "Dengue", items: ["NS1 antigen — NEGATIVE", "IgM — NEGATIVE", "IgG — NEGATIVE"] },
      { h: "Liver function", items: [
        "Total bilirubin 0.6 mg/dl", "Direct bilirubin 0.1 mg/dl",
        "SGOT (AST) 12 IU/L", "SGPT (ALT) 18 IU/L", "Alkaline phosphatase 74 IU/ml",
        "All normal"
      ]},
      { h: "Kidney function", items: [
        "Blood urea 17 mg/dl",
        "Creatinine 0.5 mg/dl — flagged low against an adult range, but NORMAL for ages 2–4",
        "Sodium 139.2 mmol/L", "Potassium 4.0 mmol/L"
      ]}
    ],
    images: ["p02.jpg"],
    notes: []
  }
];

/* -------------------------------------------------------------------------- */
/* CHART SERIES                                                               */
const CHARTS = {
  weight: {
    title: "Weight",
    unit: "kg",
    note: "Peak 16.4 kg on 31 May, down to 15.6 kg by 17 August. Height was recorded only once, so no BMI trend is possible.",
    points: [
      { date: "2026-05-07", value: 16.1 },
      { date: "2026-05-17", value: 16.0 },
      { date: "2026-05-31", value: 16.4 },
      { date: "2026-06-03", value: 16.4 },
      { date: "2026-06-21", value: 15.8 },
      { date: "2026-06-25", value: 16.1 },
      { date: "2026-07-18", value: 15.7 },
      { date: "2026-07-20", value: 15.7 },
      { date: "2026-08-17", value: 15.6 }
    ]
  },
  crp: {
    title: "CRP (inflammation marker)",
    unit: "mg/L",
    note: "Semi-quantitative latex titre, so the only possible values are 6, 12, 24, 48, 96, 192. The gap between the two bars is ONE dilution step — the smallest change the test can show. These are also two separate illness episodes five weeks apart, not one rising curve.",
    threshold: 6,
    points: [
      { date: "2026-07-18", value: 48, label: "Fever + urinary symptoms" },
      { date: "2026-08-21", value: 96, label: "Current fever" }
    ]
  }
};

/* Urine findings across every sample.                                        */
const URINE_TABLE = {
  columns: ["Date", "Lab", "Leukocytes", "Pus /hpf", "RBC /hpf", "Culture"],
  rows: [
    { date: "17 May", lab: "Karuna", leuk: "POSITIVE", pus: "7–9", rbc: "nil", culture: "E. COLI", tone: "critical" },
    { date: "28 May", lab: "Karuna", leuk: "nil", pus: "1–4", rbc: "2–4", culture: "not done", tone: "ok" },
    { date: "31 May", lab: "Karuna", leuk: "trace", pus: "3–5", rbc: "1–2", culture: "No growth", tone: "watch" },
    { date: "25 Jun", lab: "K.B.", leuk: "nil", pus: "0–2", rbc: "0–2", culture: "No growth", tone: "ok" },
    { date: "18 Jul", lab: "Karuna", leuk: "trace", pus: "2–4", rbc: "2–3", culture: "MISSING", tone: "watch" },
    { date: "21 Aug", lab: "ordered", leuk: "—", pus: "—", rbc: "—", culture: "MISSING", tone: "watch" }
  ]
};

/* Blood count comparison, with age-correct interpretation.                    */
const CBC_TABLE = {
  note: "The lab prints adult reference ranges next to a three-year-old's results. The right-hand column is the age-appropriate reading.",
  rows: [
    { name: "Haemoglobin", unit: "g/dL", jul: "12.0", aug: "11.8", labRange: "12–18", labFlag: "LOW", pedRange: "WHO: anaemia below 11.0 (6–59 months)", verdict: "Normal", verdictTone: "ok" },
    { name: "White cell count", unit: "/cumm", jul: "12,000", aug: "9,400", labRange: "4,000–11,000", labFlag: "HIGH in Jul", pedRange: "Broadly applicable", verdict: "Was raised in July, normal in August", verdictTone: "ok" },
    { name: "Neutrophils", unit: "%", jul: "65", aug: "55", labRange: "40–70", labFlag: "—", pedRange: "—", verdict: "Normal", verdictTone: "ok" },
    { name: "Lymphocytes", unit: "%", jul: "30", aug: "40", labRange: "20–40", labFlag: "—", pedRange: "—", verdict: "Normal", verdictTone: "ok" },
    { name: "PCV / haematocrit", unit: "%", jul: "33", aug: "35", labRange: "34–50", labFlag: "LOW in Jul", pedRange: "~34–40 at 2–6 years", verdict: "Borderline in July, normal in August", verdictTone: "ok" },
    { name: "MCV", unit: "fL", jul: "75", aug: "76", labRange: "77–95", labFlag: "LOW", pedRange: "Lower limit ~74 at 1.5–4 years", verdict: "Normal for age", verdictTone: "ok" },
    { name: "Platelets", unit: "/cumm", jul: "268,000", aug: "220,000", labRange: "150,000–410,000", labFlag: "—", pedRange: "—", verdict: "Normal", verdictTone: "ok" },
    { name: "CRP", unit: "mg/L (estimated)", jul: "48", aug: "96", labRange: "< 6", labFlag: "POSITIVE", pedRange: "Semi-quantitative latex titre: 6 × dilution. Scale is 6, 12, 24, 48, 96, 192.", verdict: "Raised, but a coarse band not a precise number. 48→96 is one dilution step.", verdictTone: "critical" },
    { name: "Creatinine", unit: "mg/dL", jul: "—", aug: "0.5", labRange: "0.6–1.4", labFlag: "LOW", pedRange: "0.30–0.50 at ages 2–4", verdict: "Normal for age", verdictTone: "ok" }
  ]
};

/* -------------------------------------------------------------------------- */
/* RESEARCH — guideline-backed context. Each entry becomes an accordion card.  */
const RESEARCH = [
  {
    id: "r-labranges",
    tone: "critical",
    title: "The three 'LOW' flags are almost certainly meaningless",
    lead: "The lab is printing adult reference ranges next to a three-year-old's blood results.",
    body: [
      "Haemoglobin 11.8 g/dL was flagged LOW against a range of 12–18. The WHO 2024 guideline sets the anaemia cutoff for children aged 6–59 months at 11.0 g/dL. She is above it.",
      "MCV 76 fL was flagged LOW against 77–95. Developmental data puts the lower limit at around 74 fL between 1.5 and 4 years. She is within range.",
      "Creatinine 0.5 mg/dL was flagged LOW against 0.6–1.4. The normal range for ages 2–4 is 0.30–0.50 mg/dL, and Nelson's Textbook of Pediatrics gives an upper limit of 0.50 under age 4. Hers is normal.",
      "This is a known worldwide problem, not a fault of this lab. The CALIPER white paper notes that laboratories routinely report adult reference intervals alongside children's results because validated paediatric intervals often do not exist, and that this causes real misinterpretation.",
      "Bottom line: she does not appear to be anaemic and her kidney function looks fine. Worth confirming with the paediatrician rather than assuming. The CRP elevation is genuine and does stand."
    ],
    sources: [
      { label: "WHO 2024 — Haemoglobin cutoffs to define anaemia", url: "https://www.ncbi.nlm.nih.gov/books/NBK602185/" },
      { label: "Dallman & Siimes — Developmental change in red blood cell volume", url: "https://www.sciencedirect.com/science/article/abs/pii/S0022347676803903" },
      { label: "Serum creatinine reference limits in the paediatric population", url: "https://www.frontiersin.org/journals/pediatrics/articles/10.3389/fped.2021.793446/full" },
      { label: "CALIPER white paper on paediatric reference intervals", url: "https://www.tandfonline.com/doi/full/10.1080/10408363.2017.1379945" }
    ]
  },
  {
    id: "r-vulvo",
    tone: "critical",
    title: "Vulvovaginitis is routinely mistaken for recurrent UTI",
    lead: "This may explain most of her file. Five cultures, one positive.",
    body: [
      "Vulvovaginitis is the most common gynaecological problem in girls before puberty. The vulval skin is thin and oestrogen-free, and the distance between anus, vagina and urethra is short.",
      "NHS Greater Glasgow & Clyde referral guidance states it plainly: urine passing over inflamed skin causes dysuria and frequency that mimic UTI, and a urine dipstick showing leucocytes alone may be due to contamination from the skin.",
      "In other words, a child with an inflamed vulva will complain of burning when she passes urine and her urine will show white cells, without having a urine infection.",
      "There is also a real two-way link. A 2014 study in Therapeutic Advances in Urology found vulvovaginitis is associated with an altered perineal microbiome and is hypothesised to be a major contributor to genuine UTIs in prepubertal girls, by increasing colonisation around the urethra with gut bacteria.",
      "How this maps onto Divina: vulval itching documented 7 May, 17 May and 25 June. Urinary symptoms 17 May, 31 May and 18 July. Five urine cultures, one positive. Burning still reported on 31 May after a completed antibiotic course, with that day's culture growing nothing.",
      "The Royal Children's Hospital guideline adds: children with recurrent urinary tract infection symptoms but negative cultures should be assessed for vulvodynia."
    ],
    subsections: [
      {
        h: "What guidelines say to actually do — mostly not medication",
        items: [
          "Non-biological laundry powder, no fabric softener",
          "No soap, bubble bath or shampoo in the bath water; no feminine wipes",
          "Cotton underwear, loose clothing, nothing tight or synthetic",
          "Cotton nightwear rather than pyjama pants, to let air circulate",
          "Wipe front to back; some girls do better rinsing with water after the toilet",
          "Barrier cream such as Vaseline twice daily and before swimming",
          "Vinegar baths — half a cup of white vinegar in a shallow bath",
          "Screen for and treat constipation — she has a documented history of it",
          "Treat threadworms if present, and treat the whole household",
          "Avoid antifungal creams in children still in nappies; candida is uncommon at this age"
        ]
      },
      {
        h: "Two things guidelines say NOT to do",
        items: [
          "Never perform an internal vaginal examination or take internal vaginal swabs in a prepubescent child. External inspection only. Swab at the introitus only if discharge is heavy or malodorous.",
          "Do not treat on leucocytes alone."
        ]
      },
      {
        h: "On threadworm",
        items: [
          "She was dewormed around May 2026 and her 25 June stool test showed no ova.",
          "Stool examination is a poor test for threadworm — eggs are laid around the anus, not passed in stool. The standard test is the sticky-tape test, done first thing in the morning.",
          "RCH advises suspecting threadworm when a child has night-time genital or perineal itch. A negative stool result does not rule it out."
        ]
      }
    ],
    sources: [
      { label: "RCH Melbourne — Vulval and vaginal conditions", url: "https://www.rch.org.au/clinicalguide/guideline_index/Vulval_and_Vaginal_Conditions/" },
      { label: "NHS GGC — Vulvovaginitis: advice for referrers", url: "https://www.clinicalguidelines.scot.nhs.uk/rhc-for-health-professionals/guidelines/primary-care-referral-guidelines/medical-paediatric-pre-referral-guidance/vulvovaginitis-advice-for-referrers/" },
      { label: "Gorbachinsky et al. — Perineal microbiome, vulvovaginitis and UTI in preadolescent girls", url: "https://journals.sagepub.com/doi/10.1177/1756287214542097" },
      { label: "Nationwide Children's — Prepubertal vulvovaginitis", url: "https://www.nationwidechildrens.org/family-resources-education/700childrens/2024/07/prepubertal-vulvovaginitis-causes-treatment-and-prevention" }
    ]
  },
  {
    id: "r-imaging",
    tone: "warn",
    title: "The ultrasound that appears to be missing",
    lead: "Advised 31 May, matches NICE guidance exactly, no report anywhere.",
    body: [
      "NICE guideline NG224 on urinary tract infection in under-16s says a child with a lower UTI should have an ultrasound of the urinary tract within 6 weeks if they are under 6 months old or have had recurrent infections.",
      "It also says a child under 3 years with atypical and/or recurrent UTI should have a DMSA scan 4–6 months after the acute infection, to look for kidney scarring.",
      "Recurrent UTI is commonly defined as two or more episodes in six months, or three or more in twelve months.",
      "Dr Khatri advised a USG of abdomen and pelvis on 31 May 2026, immediately after the confirmed E. coli infection. That advice lines up exactly with the guideline. There is no ultrasound report in the records.",
      "Whether she formally counts as recurrent UTI — and therefore whether a DMSA scan is warranted — depends on how many episodes were culture-confirmed. On this evidence only one was. That is a specific question for the paediatrician, and the answer changes what imaging is appropriate."
    ],
    sources: [
      { label: "NICE NG224 — Urinary tract infection in under 16s", url: "https://www.nice.org.uk/guidance/ng224" },
      { label: "NICE NG224 — Recommendations", url: "https://www.nice.org.uk/guidance/ng224/chapter/Recommendations" },
      { label: "Recurrent UTI — Patient.info professional reference", url: "https://patient.info/doctor/infectious-disease/recurrent-urinary-tract-infection" }
    ]
  },
  {
    id: "r-crp",
    tone: "warn",
    title: "The CRP of 96 — what the number actually is",
    lead: "It is a semi-quantitative estimate on a doubling scale, not a precise measurement. And in this range it cannot tell viral from bacterial.",
    body: [
      "Two things have to be separated here: how the number was produced, and what a number like that means.",
      "HOW IT WAS PRODUCED. The report prints 'C-REACTIVE PROTEIN (CRP) TITER :- 96'. The word titer is the giveaway. This is a latex agglutination slide test: the serum is diluted 1:2, 1:4, 1:8, 1:16 and so on, and the technician reports the last dilution at which visible clumping occurs. The concentration is then calculated as the reagent sensitivity, 6 mg/L, multiplied by that dilution.",
      "That is why her two results are 48 and 96. 6 x 8 = 48. 6 x 16 = 96. The only values this test can ever return are 6, 12, 24, 48, 96, 192, 384. It is a coarse ladder, not a continuous scale.",
      "So 96 does not mean 96. It means the sample still clumped at 1:16 but not at 1:32, so the true value sits somewhere between roughly 96 and 191 mg/L. And the step from 48 to 96 is a single rung on that ladder — the smallest change the method is capable of showing. It could reflect a real rise, or two runs landing either side of one dilution.",
      "This is not a criticism of the lab. Latex agglutination is a legitimate, inexpensive, widely used method. It is simply less precise than the immunoturbidimetric CRP that a larger laboratory would run, and the result has to be read with that in mind.",
      "WHAT A NUMBER LIKE THAT MEANS. CRP is a general inflammation marker. It tells you something is inflamed. It does not tell you what, or where, or whether it is bacterial.",
      "Published data puts moderate elevations of roughly 10 to 80 mg/L squarely in the zone where bacterial and viral infection overlap and cannot be separated. Research looking specifically at the 50 to 100 mg/L band found that CRP could not significantly distinguish bacterial from viral cases within it.",
      "Above 100 mg/L the association with bacterial infection strengthens, but even there it is not absolute — adenovirus and several other viruses regularly push CRP past 100.",
      "The consistent finding across the literature is that serial CRP measurements are far more informative than any single value. A falling CRP supports the treatment working. A rising one suggests deterioration. One reading in isolation, on a coarse method, in the overlap zone, is weak evidence on its own.",
      "WHAT SITS ALONGSIDE IT IN HER CASE. On 21 August her total white cell count was normal at 9,400. Lymphocytes had risen to 40% and neutrophils fallen to 55%, compared with 30% and 65% in July. A normal white count with a lymphocyte-predominant differential is a pattern more often seen in viral illness. A bacterial infection driving CRP into that range would more typically come with a raised white count and neutrophilia.",
      "None of that is proof of anything either. It is a reason to ask the question rather than assume the answer, and a strong reason to want the blood culture result and a repeat CRP."
    ],
    subsections: [
      {
        h: "The full ladder this test can report",
        items: [
          "1:1 not diluted — 6 mg/L, the detection threshold",
          "1:2 — 12 mg/L",
          "1:4 — 24 mg/L",
          "1:8 — 48 mg/L  (her 18 July result)",
          "1:16 — 96 mg/L  (her 21 August result)",
          "1:32 — 192 mg/L",
          "Nothing in between these values can be reported"
        ]
      },
      {
        h: "Worth asking the doctor",
        items: [
          "Can a quantitative CRP be run rather than the latex slide test, so the number can be tracked properly?",
          "Can the CRP be repeated now to see whether it is falling on the antibiotic? The direction of travel is more useful than the single value.",
          "Does the normal white count with a lymphocyte shift change the thinking about whether this is bacterial?"
        ]
      }
    ],
    sources: [
      { label: "CRP-Latex slide agglutination method sheet — Spinreact (titre = sensitivity x dilution)", url: "https://www.spinreact.com/files/Inserts/Serologia/SGIS03_-_Ref._1200301_PCR_Latex_03-2013.pdf" },
      { label: "CRP-LATEX method sheet — Biolabo (6 mg/L sensitivity, serial two-fold dilutions)", url: "https://www.biolabo.fr/pdfs/noticesE/serologieE/AT-097100-CRP.pdf" },
      { label: "C-reactive protein test: principle, procedure and result — Microbe Online", url: "https://microbeonline.com/c-reactive-protein-crp-test/" },
      { label: "Differentiating bacterial from viral infections by estimated CRP velocity — PLOS One", url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0277401" },
      { label: "CRP overlap between bacterial and viral infection — WikEM summary", url: "https://wikem.org/wiki/CRP" },
      { label: "C-reactive protein in pediatric infectious diseases", url: "https://www.sciencedirect.com/science/article/abs/pii/S2212832812000094" }
    ]
  },
  {
    id: "r-nepal",
    tone: "critical",
    title: "Prolonged fever in Nepal — what else gets considered",
    lead: "A blood culture will not find scrub typhus. It needs its own test.",
    body: [
      "This is where local context matters more than international guidelines.",
      "Published Nepali paediatric studies describe a standard workup for a child with fever lasting more than about four days: malaria smear and rapid test, dengue NS1 antigen and IgM, urine and blood cultures, and scrub typhus IgM ELISA.",
      "The blood culture ordered on 21 August is primarily looking for enteric fever (typhoid). The result is not in the records and is the most important outstanding item. Cultures typically take 48–72 hours.",
      "A PLOS One study of children in central Nepal found scrub typhus is a significant and frequently missed cause of unexplained fever, and that the most common wrong provisional diagnosis given to these children was enteric fever, followed by meningitis and sepsis.",
      "Scrub typhus is diagnosed by IgM ELISA. A blood culture will not detect it. Cases peak in the monsoon and post-monsoon months, which includes August.",
      "Presenting features in that Nepali study included fever, headache, vomiting, abdominal pain and cough. An eschar — a small dark scab at a bite site — is the classic clue when one can be found.",
      "Given that she presented with an unexplained swelling around one eye attributed to a possible insect bite, and then developed persistent fever, scrub typhus is a reasonable thing to ask whether anyone has considered. Dengue has already been excluded."
    ],
    sources: [
      { label: "Scrub typhus in children — hospital based observational study, central Nepal (PLOS One)", url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0220905" },
      { label: "Scrub typhus in children at Tribhuvan University Teaching Hospital", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7335309/" },
      { label: "Epidemiology and seasonal variation of scrub typhus in central Nepal", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6473611/" }
    ]
  },
  {
    id: "r-eye",
    tone: "warn",
    title: "One-sided eye swelling — what to watch for",
    lead: "Allergic swelling is usually on both sides and painless. Hers was left-sided only.",
    body: [
      "RCH and Canadian Paediatric Society guidance distinguish three things.",
      "Suggests allergy: swelling on both sides, painless, not tender, child otherwise well, responds to antihistamines.",
      "Suggests preseptal (periorbital) cellulitis: infection of the skin in front of the eye socket. Needs antibiotics.",
      "Red flags for orbital cellulitis, the dangerous one: pain on moving the eye or restricted eye movement, the eye pushed forward, swollen conjunctiva, reduced vision, double vision, abnormal pupil reaction, or a child who looks unwell and toxic with fever. Contrast CT imaging is used when orbital involvement is suspected.",
      "Her swelling was recorded as left-sided only, on and off, with a fever episode. One-sided is less typical of a straightforward allergy. Fexofenadine, an antihistamine, was prescribed, which fits the allergy interpretation.",
      "An ophthalmology consult was advised on 17 August and there is no record it happened. Given the fever then persisted, that referral is worth revisiting."
    ],
    sources: [
      { label: "RCH Melbourne — Periorbital and orbital cellulitis", url: "https://www.rch.org.au/clinicalguide/guideline_index/Periorbital_and_orbital_cellulitis/" },
      { label: "Canadian Paediatric Society — Preseptal and orbital cellulitis", url: "https://cps.ca/en/documents/position/preseptal-orbital-cellulitis" },
      { label: "Periorbital cellulitis — StatPearls", url: "https://www.ncbi.nlm.nih.gov/books/NBK470408/" }
    ]
  },
  {
    id: "r-growth",
    tone: "watch",
    title: "The weight loss — how worried to be",
    lead: "Needs plotting on a growth chart, not eyeballing.",
    body: [
      "NICE NG75 defines concern by falls across weight centile spaces, not by absolute kilograms. So this needs a proper growth chart.",
      "The Royal Children's Hospital investigation list for slow weight gain in a child over 12 months: urinalysis and culture, full blood count, ferritin, electrolytes, thyroid function, glucose, liver function, coeliac serology, B12, stool studies, plus ESR and faecal calprotectin.",
      "RCH notes that hidden urinary tract infection is a recognised cause of poor weight gain.",
      "Most cases turn out to be inadequate calorie intake, and there is not always an underlying disease.",
      "Context that softens it: on 20 July she was at the 88th centile for weight with a BMI on the 86th centile, described as 'at risk of overweight'. She started from an above-average position, and repeated infections suppress appetite.",
      "Context that keeps it on the list: it is still the wrong direction over eleven weeks and overlaps a period of unexplained inflammation. Much of the RCH list has already been done incidentally — full blood count, LFT, RFT and urine are all in the file. Ferritin, thyroid and coeliac serology have not been."
    ],
    sources: [
      { label: "NICE NG75 — Faltering growth", url: "https://www.nice.org.uk/guidance/ng75/chapter/recommendations" },
      { label: "RCH Melbourne — Slow weight gain", url: "https://www.rch.org.au/clinicalguide/guideline_index/Slow_weight_gain/" }
    ]
  }
];

/* -------------------------------------------------------------------------- */
/* QUESTIONS FOR THE DOCTOR — ordered by how much the answer changes.          */
const QUESTIONS = [
  { group: "Chase these results — they exist somewhere", tone: "critical", items: [
    "What did the blood culture from 21 August grow?",
    "What did the urine R/E and urine culture from 21 August show?",
    "What did the urine culture from 18 July show? It was sent and never followed up in the notes."
  ]},
  { group: "About the current fever", tone: "critical", items: [
    "Has scrub typhus been considered, and should an IgM ELISA be sent? It is common in Nepal in August, is regularly missed, and is not detected by blood culture.",
    "Should the CRP be repeated to see whether it is falling on the antibiotic?",
    "What are the specific danger signs that mean we come straight back rather than wait?"
  ]},
  { group: "About the recurring urinary and vulval problem", tone: "warn", items: [
    "Was the ultrasound of abdomen and pelvis advised on 31 May ever done? If not, should it be done now?",
    "Given only one of five urine cultures grew anything, how many of these episodes were genuine urine infections, and how many were vulval irritation causing burning and contaminated samples?",
    "Does she meet the definition of recurrent UTI, and if so does she need a DMSA scan?",
    "Can we go through the non-medication vulval care measures properly — soap-free bathing, cotton underwear, barrier cream, vinegar baths, wiping technique?",
    "Should we do a sticky-tape test for threadworm? Her stool test was clear but that test misses threadworm.",
    "Is her constipation currently controlled? It is a documented past problem and it makes both urinary and vulval symptoms worse."
  ]},
  { group: "About the eye", tone: "warn", items: [
    "Should the ophthalmology consult advised on 17 August now go ahead, given the fever that followed?",
    "The swelling was left-sided only. Does that change the working diagnosis of allergy?"
  ]},
  { group: "About growth and general health", tone: "watch", items: [
    "Can her weights be plotted on a growth chart and a height taken? Only one height exists in the whole file, from 20 July.",
    "Should ferritin, thyroid function and coeliac serology be added, per the standard slow-weight-gain workup?",
    "Immunisation status is contradictory in the notes — 'complete' on 17 May, 'EPI scheduled / update immunisation' on 20 July. Which is right?",
    "Is the Karuna duplicate record a problem? The 28 May report is filed under 'Devina Thapa', hospital ID 124916, while everything else is 'Divina Thapa', ID 124721.",
    "What was the third syrup prescribed on 21 August? The handwriting is illegible."
  ]},
  { group: "About joined-up care", tone: "info", items: [
    "Scheer Memorial and K.B. Hospital have both been treating her without visible access to each other's notes. Should one paediatrician hold the whole picture?"
  ]}
];

/* -------------------------------------------------------------------------- */
/* FREEFORM NOTES — add your own observations here at any time.                */
const NOTES = [
  // { date: "2026-08-25", author: "Dipesh", text: "Fever broke overnight.", images: [] }
];

/* -------------------------------------------------------------------------- */
/* DOCUMENT INDEX — every scanned page and what it is.                         */
const DOCUMENTS = [
  { file: "p01.jpg", date: "2026-08-21", label: "Full blood count", facility: "Karuna" },
  { file: "p02.jpg", date: "2026-08-21", label: "CRP, dengue, LFT, RFT", facility: "Karuna" },
  { file: "p03.jpg", date: "2026-07-18", label: "Full blood count + CRP 48", facility: "Karuna" },
  { file: "p04.jpg", date: "2026-07-20", label: "Paediatric OPD typed summary", facility: "K.B." },
  { file: "p05.jpg", date: "2026-07-18", label: "Urine routine examination", facility: "Karuna" },
  { file: "p06.jpg", date: "2026-07-18", label: "OPD note — fever + burning micturition", facility: "K.B." },
  { file: "p07.jpg", date: "2026-06-25", label: "Stool routine examination", facility: "K.B." },
  { file: "p08.jpg", date: "2026-06-25", label: "Urine routine examination", facility: "K.B." },
  { file: "p09.jpg", date: "2026-06-25", label: "Urine culture — no growth", facility: "K.B." },
  { file: "p10.jpg", date: "2026-06-21", label: "OPD note — acute follicular tonsillitis", facility: "K.B." },
  { file: "p11.jpg", date: "2026-06-25", label: "Follow-up note — genital itching", facility: "K.B." },
  { file: "p12.jpg", date: "2026-05-31", label: "Urine routine examination", facility: "Karuna" },
  { file: "p13.jpg", date: "2026-05-31", label: "Urine culture — no growth", facility: "Karuna" },
  { file: "p14.jpg", date: "2026-05-28", label: "Urine routine examination ('Devina')", facility: "Karuna" },
  { file: "p15.jpg", date: "2026-05-17", label: "Urine R/E — pus cells 7–9", facility: "Karuna" },
  { file: "p16.jpg", date: "2026-05-17", label: "Urine culture — E. COLI + sensitivities", facility: "Karuna" },
  { file: "p17.jpg", date: "2026-05-17", label: "Consultation note — Dr Neeta", facility: "Seer" },
  { file: "p18.jpg", date: "2026-05-17", label: "Cefixime prescription", facility: "Seer" },
  { file: "p19.jpg", date: "2026-05-07", label: "History and physical assessment", facility: "Scheer" },
  { file: "p20.jpg", date: "2026-05-07", label: "Physical exam and prescription", facility: "Scheer" },
  { file: "p21.jpg", date: "2026-05-31", label: "Follow-up of UTI", facility: "Scheer" },
  { file: "p22.jpg", date: "2026-05-31", label: "Advice page — USG + repeat culture", facility: "Scheer" },
  { file: "p23.jpg", date: "2026-06-03", label: "Follow-up — no growth, reassurance", facility: "Scheer" },
  { file: "p24.jpg", date: "2026-08-17", label: "Follow-up — eye swelling", facility: "Scheer" },
  { file: "p25.jpg", date: "2026-08-17", label: "Advice and FEZA prescription", facility: "Scheer" },
  { file: "p26.jpg", date: "2026-08-19", label: "Prescription page — NIKO", facility: "Scheer" },
  { file: "p27.jpg", date: "2026-08-19", label: "Follow-up — left eye allergy", facility: "Scheer" },
  { file: "p28.jpg", date: "2026-08-19", label: "Impression: ? viral fever", facility: "Scheer" },
  { file: "p29.jpg", date: "2026-08-21", label: "Follow-up — fever persisted", facility: "Scheer" },
  { file: "p30.jpg", date: "2026-08-21", label: "Investigations ordered + CRP 96", facility: "Scheer" },
  { file: "p31.jpg", date: "2026-08-21", label: "Prescription continuation", facility: "Scheer" },
  { file: "p32.jpg", date: "2026-08-21", label: "Dispensed medicines — Mega-CV Forte, FEZA", facility: "—" }
];

/* -------------------------------------------------------------------------- */
/* REFERENCE NUMBERS — quote these when chasing a missing result.              */
/* Keyed by TIMELINE entry id. Merged into the entry by the app.               */
const REFS = {
  "e-20260507":         { "Facility": "Scheer Memorial Adventist Hospital", "UHID": "509113" },
  "e-20260517-visit":   { "Centre": "Seer Imaging & Diagnostic Center Banepa Pvt. Ltd.", "Regd": "250422", "PAN": "609881842" },
  "e-20260517-urine":   { "Invoice": "FAOD0009965", "Lab No": "9965", "Hospital ID": "124721" },
  "e-20260517-culture": { "Invoice": "FAOD0009967", "Lab No": "9967", "Hospital ID": "124721", "Printed": "19 May 2026, 09:59" },
  "e-20260528":         { "Invoice": "FAOD0010439", "Lab No": "10439", "Hospital ID": "124916", "Name on report": "DEVINA THAPA", "Printed": "28 May 2026, 15:31" },
  "e-20260531-visit":   { "UHID": "509113", "Bill No": "CS82/83-0373065", "Queue": "23", "Counter user": "Rupa Timalsina", "Charge": "NPR 140", "Timestamp": "2083-02-17 15:07:26" },
  "e-20260531-urine":   { "Invoice": "FAOD0010543", "Lab No": "10543", "Hospital ID": "124721", "Printed": "31 May 2026, 12:05" },
  "e-20260531-culture": { "Invoice": "FAOD0010557", "Lab No": "10557", "Hospital ID": "124721", "Referred by": "SMAH", "Printed": "3 Jun 2026, 14:33" },
  "e-20260603":         { "UHID": "509113", "Queue": "36", "Counter user": "Srijana Konga", "Charge": "FREE", "Timestamp": "2083-02-20 14:41:48" },
  "e-20260621":         { "Patient ID": "189152", "Hospital regd": "36048/062/063" },
  "e-20260625-visit":   { "Patient ID": "189152" },
  "e-20260625-urine":   { "Invoice": "OAOD0018830", "Lab No": "328", "Patient ID": "189152", "Printed": "25 Jun 2026, 16:12" },
  "e-20260625-stool":   { "Invoice": "OAOD0018836", "Lab No": "328", "Patient ID": "189152", "Printed": "25 Jun 2026, 17:24" },
  "e-20260625-culture": { "Invoice": "OAOD0018830", "Lab No": "328", "Patient ID": "189152", "Reported": "27 Jun 2026, 20:46", "Lab tech": "Ambika Thapa, NHPC B-3372 MLT" },
  "e-20260718-visit":   { "OPD No": "189152 / PAOD0000097", "Time": "17:01:01", "Counter user": "GANGA", "Charge": "NPR 412.00" },
  "e-20260718-cbc":     { "Invoice": "GAOD0000067", "Lab No": "9846182957", "Hospital ID": "124721", "Printed": "18 Jul 2026, 16:02" },
  "e-20260718-urine":   { "Invoice": "GAOD0000067", "Lab No": "9846182957", "Hospital ID": "124721", "Printed": "18 Jul 2026, 16:02" },
  "e-20260720":         { "Facility": "K.B. Hospital Pvt. Ltd., Banepa-7, Prabesh Marg", "Phone": "011-660781" },
  "e-20260817":         { "UHID": "509113", "Bill No": "CS83/84-0050554", "Queue": "30", "Counter user": "Rupa Timalsina", "Timestamp": "2083-05-01 15:08:34" },
  "e-20260819":         { "UHID": "509113", "Queue": "19", "Counter user": "Sandhya Ranjitkar", "Charge": "FREE", "Timestamp": "2083-05-03 12:25:25" },
  "e-20260821-visit":   { "UHID": "509113", "Queue": "3", "Counter user": "Sanu Maya Shrestha", "Charge": "FREE", "Timestamp": "2083-05-05 09:47:22" },
  "e-20260821-cbc":     { "Invoice": "GAOD0001656", "Lab No": "1656", "Patient ID": "126567", "Referred by": "SMAH", "Printed": "21 Aug 2026, 12:01" },
  "e-20260821-panel":   { "Invoice": "GAOD0001656", "Lab No": "1656", "Patient ID": "126567", "Referred by": "SMAH", "Printed": "21 Aug 2026, 12:01" }
};

/* -------------------------------------------------------------------------- */
/* FACILITIES DIRECTORY                                                        */
const FACILITIES = [
  { name: "Scheer Memorial Adventist Hospital", short: "Scheer", role: "Primary paediatric care — Dr Niraj Khatri",
    detail: "Established 1960. UHID 509113. Visits: 7 May, 31 May, 3 Jun, 17 Aug, 19 Aug, 21 Aug 2026." },
  { name: "K.B. Hospital Pvt. Ltd.", short: "K.B.", role: "Paediatric OPD and Emergency — Dr Subha Sainju, Dr Kavi Rai",
    detail: "Banepa-7, Prabesh Marg, Kavre. Phone 011-660781. Regd 36048/062/063. Patient ID 189152. Visits: 21 Jun, 25 Jun, 18 Jul, 20 Jul 2026." },
  { name: "Karuna Pathology Lab / Seer Imaging & Diagnostic Center", short: "Karuna", role: "Pathology and imaging",
    detail: "Banepa-8, Kavrepalanchok. Phone 011-665390, 9762448763. PAN 301896236. Regd 2866/90/2061/062. Hospital ID 124721." },
  { name: "Seer Imaging & Diagnostic Center Banepa Pvt. Ltd.", short: "Seer", role: "Consultation — Dr Neeta Timalsina",
    detail: "Banepa-8, Naladobato. Phone 011-665390. Regd 250422. PAN 609881842. Offers 4D ultrasound." }
];

/* -------------------------------------------------------------------------- */
/* EVERY MEDICINE THAT APPEARS ANYWHERE IN THE FILE                            */
const MED_HISTORY = [
  { date: "2026-05-07", name: "Syp Levocetirizine (L-CTZ)", generic: "Levocetirizine 2.5 mg/5 ml", dose: "4 ml PO at night", course: "1 week", reason: "Allergic rhinitis", by: "Dr Niraj Khatri" },
  { date: "2026-05-07", name: "Drop Decon-P", generic: "Nasal decongestant drops", dose: "2 drops TDS", course: "3 days", reason: "Allergic rhinitis", by: "Dr Niraj Khatri" },
  { date: "2026-05-07", name: "Sitz bath", generic: "Non-drug measure", dose: "Twice daily", course: "1 week", reason: "Vulvovaginitis", by: "Dr Niraj Khatri" },
  { date: "2026-05-17", name: "Ointment Candid (plain)", generic: "Clotrimazole, plain", dose: "Locally BD", course: "7 days", reason: "Vulval redness and itch", by: "Dr Neeta Timalsina" },
  { date: "2026-05-17", name: "Syp Cefixime", generic: "Cefixime 100 mg/5 ml", dose: "5 ml PO BD", course: "7 days", reason: "E. coli UTI, culture-directed", by: "Dr Neeta Timalsina" },
  { date: "2026-05-17", name: "Coconut water", generic: "Non-drug measure", dose: "BD, plus plenty of water", course: "7 days", reason: "Hydration", by: "Dr Neeta Timalsina" },
  { date: "2026-05-17", name: "Syp Nitrofurantoin", generic: "Nitrofurantoin 25 mg/5 ml", dose: "PO QID", course: "STRUCK THROUGH on the page — appears not given", reason: "UTI", by: "Dr Neeta Timalsina" },
  { date: "2026-05-31", name: "Syp Urizer", generic: "Urinary alkaliniser", dose: "5 ml in a glass of water BD", course: "1 week", reason: "Ongoing burning micturition", by: "Dr Niraj Khatri" },
  { date: "2026-06-21", name: "Syp Indclav DS", generic: "Amoxicillin + clavulanate 452 mg/5 ml", dose: "5 ml PO BD", course: "5 days", reason: "Acute follicular tonsillitis", by: "Dr Subha Sainju" },
  { date: "2026-06-21", name: "Syp Porica BM", generic: "Cough and mucolytic preparation", dose: "5 ml PO TDS", course: "5 days", reason: "Cough", by: "Dr Subha Sainju" },
  { date: "2026-06-21", name: "Syp Meftal-P", generic: "Mefenamic acid 100 mg/5 ml", dose: "5 ml PO TDS", course: "3 days then as needed", reason: "Fever and pain", by: "Dr Subha Sainju" },
  { date: "2026-07-18", name: "Syp Meftal-P", generic: "Mefenamic acid 100 mg/5 ml", dose: "5 ml PO TDS", course: "3 days", reason: "Fever", by: "Dr Subha Sainju" },
  { date: "2026-07-18", name: "Syp Lactulose", generic: "Lactulose", dose: "As prescribed", course: "Referenced in the 20 Jul note as having been prescribed on 18 Jul", reason: "Constipation", by: "Dr Subha Sainju" },
  { date: "2026-07-20", name: "Syp Pacimol", generic: "Paracetamol 125 mg/5 ml", dose: "7.5 ml PO as needed or TDS", course: "Continued", reason: "Fever", by: "Dr Kavi R. Rai" },
  { date: "2026-07-20", name: "Syp Tummysoft", generic: "Laxative and stool softener", dose: "5 ml PO BD", course: "7 days", reason: "Functional constipation", by: "Dr Kavi R. Rai" },
  { date: "2026-08-17", name: "Syp FEZA", generic: "Fexofenadine 30 mg/5 ml", dose: "5 ml PO BD", course: "1 week", reason: "Eye swelling, suspected allergy", by: "Dr Niraj Khatri", current: true },
  { date: "2026-08-19", name: "Syp NIKO", generic: "Paracetamol 125 mg/5 ml", dose: "8 ml PO 6-hourly, then as needed", course: "2 days then SOS", reason: "Fever", by: "Dr Niraj Khatri", current: true },
  { date: "2026-08-21", name: "Syp AMX-CV / Mega-CV Forte", generic: "Amoxicillin + potassium clavulanate 457 mg/5 ml", dose: "4 ml PO BD", course: "7 days", reason: "Persistent fever with CRP 96", by: "Dr Niraj Khatri", current: true },
  { date: "2026-08-21", name: "Unnamed syrup", generic: "Handwriting illegible on the page", dose: "5 ml PO once daily", course: "2 weeks", reason: "Unknown", by: "Dr Niraj Khatri", current: true }
];

/* -------------------------------------------------------------------------- */
/* EVERY DIAGNOSIS OR IMPRESSION RECORDED                                      */
const DIAGNOSES = [
  { date: "2026-05-07", text: "Allergic Rhinitis with Vulvovaginitis", by: "Dr Niraj Khatri", certainty: "stated" },
  { date: "2026-05-17", text: "E. coli urinary tract infection", by: "Dr Neeta Timalsina", certainty: "confirmed" },
  { date: "2026-05-31", text: "Follow-up of UTI, symptoms ongoing", by: "Dr Niraj Khatri", certainty: "stated" },
  { date: "2026-06-21", text: "Acute follicular tonsillitis", by: "Dr Subha Sainju", certainty: "stated" },
  { date: "2026-07-20", text: "Acute tonsillopharyngitis with no exudates; functional constipation; rule out UTI", by: "Dr Kavi R. Rai", certainty: "provisional" },
  { date: "2026-08-17", text: "Insect bite or allergy — left periorbital swelling", by: "Dr Niraj Khatri", certainty: "uncertain" },
  { date: "2026-08-19", text: "Viral fever", by: "Dr Niraj Khatri", certainty: "uncertain" },
  { date: "2026-08-21", text: "Persistent fever under investigation, CRP 96", by: "Dr Niraj Khatri", certainty: "uncertain" }
];

/* -------------------------------------------------------------------------- */
/* GLOSSARY — plain-English translations of the abbreviations on the papers.   */
const GLOSSARY = [
  { term: "R/E", meaning: "Routine examination — the basic test of a urine or stool sample" },
  { term: "C/S", meaning: "Culture and sensitivity — growing bacteria from a sample and testing which antibiotics kill it" },
  { term: "CBC", meaning: "Complete blood count" },
  { term: "CRP", meaning: "C-reactive protein — a general marker of inflammation in the body" },
  { term: "LFT / RFT", meaning: "Liver function tests / renal (kidney) function tests" },
  { term: "MCV", meaning: "Mean corpuscular volume — the average size of a red blood cell" },
  { term: "PCV", meaning: "Packed cell volume, also called haematocrit — the proportion of blood made up of red cells" },
  { term: "hpf", meaning: "High power field — what the lab sees down the microscope at high magnification" },
  { term: "Pus cells", meaning: "White blood cells in the urine. Can mean infection, or contamination from inflamed skin" },
  { term: "O/E", meaning: "On examination" },
  { term: "C/O", meaning: "Complains of" },
  { term: "F/U", meaning: "Follow up" },
  { term: "Rx", meaning: "Prescription or treatment" },
  { term: "PO", meaning: "By mouth (per oral)" },
  { term: "OD / BD / TDS / QID", meaning: "Once / twice / three times / four times a day" },
  { term: "SOS", meaning: "As needed" },
  { term: "PTC", meaning: "Prior to consultation" },
  { term: "a/w", meaning: "Associated with" },
  { term: "Tmax", meaning: "The highest temperature recorded" },
  { term: "NAD", meaning: "No abnormality detected" },
  { term: "NVBS", meaning: "Normal vesicular breath sounds — the chest sounds normal" },
  { term: "S1S2M0", meaning: "Both normal heart sounds present, no murmur" },
  { term: "CRT", meaning: "Capillary refill time — how fast colour returns after pressing the skin" },
  { term: "Micturition", meaning: "Passing urine" },
  { term: "Vulvovaginitis", meaning: "Inflammation or irritation of the vulva and vagina" },
  { term: "Periorbital", meaning: "The area around the eye socket" },
  { term: "Icteric", meaning: "Jaundiced, yellow" },
  { term: "EPI", meaning: "Expanded Programme on Immunisation — the national childhood vaccine schedule" },
  { term: "DMSA scan", meaning: "A kidney scan that looks for scarring after urine infections" },
  { term: "USG", meaning: "Ultrasound scan" },
  { term: "BS / AD", meaning: "Bikram Sambat, the Nepali calendar / Anno Domini, the Gregorian calendar" }
];
