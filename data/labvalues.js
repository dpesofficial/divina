/* ============================================================================
   EVERY MEASURED VALUE IN THE RECORD — the search index.
   ----------------------------------------------------------------------------
   One row per result per date. Powers the Search page.

   Fields:
     d      date, YYYY-MM-DD
     t      test name as the search will display it
     a      alias string — extra words that should match this test
     c      category: Blood | Urine | Stool | Serology | Vitals | Culture
     v      the value as printed
     u      unit ("" if none)
     r      reference range as PRINTED ON THE REPORT ("" if none given)
     p      the correct PAEDIATRIC range, only where it differs meaningfully
     f      flag: "H" high | "L" low | "POS" | "NEG" | "" none
     x      tone: critical | warn | watch | ok | muted
     s      source lab or clinic
     e      TIMELINE entry id, so the row can link back to the record
     n      numeric value for the trend sparkline (omit for non-numeric)

   To add a new result, copy any line and change the values.
   ========================================================================== */

const LAB_VALUES = [

/* ---------------------------------------------------------- VITALS ------- */
{d:"2026-05-07",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"16.1",u:"kg",r:"",p:"88th centile for age (20 Jul)",f:"",x:"ok",s:"Scheer",e:"e-20260507",n:16.1},
{d:"2026-05-17",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"16.0",u:"kg",r:"",p:"",f:"",x:"ok",s:"Seer",e:"e-20260517-visit",n:16.0},
{d:"2026-05-17",t:"Pulse rate",a:"pulse pr heart rate hr bpm tachycardia",c:"Vitals",v:"182",u:"/min",r:"90–140 typical at rest, age 3",p:"90–140 at age 3",f:"H",x:"warn",s:"Seer",e:"e-20260517-visit",n:182},
{d:"2026-05-17",t:"Oxygen saturation",a:"spo2 oxygen saturation sats o2",c:"Vitals",v:"98",u:"%",r:"",p:"≥ 95%",f:"",x:"ok",s:"Seer",e:"e-20260517-visit",n:98},
{d:"2026-05-31",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"16.4",u:"kg",r:"",p:"peak recorded weight",f:"",x:"ok",s:"Scheer",e:"e-20260531-visit",n:16.4},
{d:"2026-06-03",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"16.4",u:"kg",r:"",p:"",f:"",x:"ok",s:"Scheer",e:"e-20260603",n:16.4},
{d:"2026-06-21",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"15.8",u:"kg",r:"",p:"",f:"",x:"watch",s:"K.B.",e:"e-20260621",n:15.8},
{d:"2026-06-21",t:"Temperature",a:"temperature temp fever pyrexia tmax",c:"Vitals",v:"100.7",u:"°F",r:"97–99 °F",p:"fever above 100.4 °F",f:"H",x:"warn",s:"K.B.",e:"e-20260621",n:100.7},
{d:"2026-06-21",t:"Temperature (Tmax reported)",a:"temperature temp fever tmax highest",c:"Vitals",v:"102",u:"°F",r:"97–99 °F",p:"highest recorded in the whole file",f:"H",x:"critical",s:"K.B.",e:"e-20260621",n:102},
{d:"2026-06-21",t:"Heart rate",a:"heart rate hr pulse bpm tachycardia",c:"Vitals",v:"150",u:"/min",r:"90–140 at age 3",p:"raised, consistent with fever",f:"H",x:"warn",s:"K.B.",e:"e-20260621",n:150},
{d:"2026-06-21",t:"Oxygen saturation",a:"spo2 oxygen saturation sats o2",c:"Vitals",v:"98",u:"%",r:"",p:"≥ 95%",f:"",x:"ok",s:"K.B.",e:"e-20260621",n:98},
{d:"2026-06-25",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"16.1",u:"kg",r:"",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-visit",n:16.1},
{d:"2026-06-25",t:"Temperature",a:"temperature temp fever afebrile",c:"Vitals",v:"96.7",u:"°F",r:"97–99 °F",p:"afebrile",f:"",x:"ok",s:"K.B.",e:"e-20260625-visit",n:96.7},
{d:"2026-06-25",t:"Heart rate",a:"heart rate hr pulse bpm",c:"Vitals",v:"128",u:"/min",r:"90–140 at age 3",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-visit",n:128},
{d:"2026-06-25",t:"Oxygen saturation",a:"spo2 oxygen saturation sats o2",c:"Vitals",v:"98",u:"%",r:"",p:"≥ 95%",f:"",x:"ok",s:"K.B.",e:"e-20260625-visit",n:98},
{d:"2026-07-18",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"15.7",u:"kg",r:"",p:"",f:"",x:"watch",s:"K.B.",e:"e-20260718-visit",n:15.7},
{d:"2026-07-18",t:"Heart rate",a:"heart rate hr pulse bpm",c:"Vitals",v:"140",u:"/min",r:"90–140 at age 3",p:"upper limit, with fever",f:"",x:"watch",s:"K.B.",e:"e-20260718-visit",n:140},
{d:"2026-07-18",t:"Oxygen saturation",a:"spo2 oxygen saturation sats o2 room air",c:"Vitals",v:"95.1",u:"% room air",r:"",p:"≥ 95% — lowest recorded",f:"",x:"watch",s:"K.B.",e:"e-20260718-visit",n:95.1},
{d:"2026-07-18",t:"Temperature (Tmax reported)",a:"temperature temp fever tmax",c:"Vitals",v:"101",u:"°F",r:"97–99 °F",p:"",f:"H",x:"warn",s:"K.B.",e:"e-20260718-visit",n:101},
{d:"2026-07-20",t:"Weight",a:"weight wt mass kg growth",c:"Vitals",v:"15.7",u:"kg",r:"",p:"88th centile for age",f:"",x:"watch",s:"K.B.",e:"e-20260720",n:15.7},
{d:"2026-07-20",t:"Height",a:"height ht length cm stature growth",c:"Vitals",v:"95",u:"cm",r:"",p:"74th centile for age — ONLY height in the file",f:"",x:"ok",s:"K.B.",e:"e-20260720",n:95},
{d:"2026-07-20",t:"BMI",a:"bmi body mass index obesity overweight centile",c:"Vitals",v:"17.4",u:"kg/m²",r:"14.1–17.3 healthy for her height",p:"86th centile — 'at risk of overweight'",f:"H",x:"watch",s:"K.B.",e:"e-20260720",n:17.4},
{d:"2026-07-20",t:"Ponderal index",a:"ponderal index body proportion",c:"Vitals",v:"18.3",u:"kg/m³",r:"",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260720",n:18.3},
{d:"2026-07-20",t:"Temperature",a:"temperature temp fever afebrile",c:"Vitals",v:"96.4",u:"°F",r:"97–99 °F",p:"afebrile",f:"",x:"ok",s:"K.B.",e:"e-20260720",n:96.4},
{d:"2026-07-20",t:"Heart rate",a:"heart rate hr pulse bpm",c:"Vitals",v:"114",u:"/min",r:"90–140 at age 3",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260720",n:114},
{d:"2026-07-20",t:"Oxygen saturation",a:"spo2 oxygen saturation sats o2 room air",c:"Vitals",v:"96",u:"% room air",r:"",p:"≥ 95%",f:"",x:"ok",s:"K.B.",e:"e-20260720",n:96},
{d:"2026-08-17",t:"Weight",a:"weight wt mass kg growth loss",c:"Vitals",v:"15.6",u:"kg",r:"",p:"lowest recorded — 0.8 kg below the 31 May peak",f:"",x:"warn",s:"Scheer",e:"e-20260817",n:15.6},
{d:"2026-08-21",t:"Temperature (Tmax reported)",a:"temperature temp fever tmax low grade",c:"Vitals",v:"100",u:"°F",r:"97–99 °F",p:"low grade, persisting",f:"H",x:"warn",s:"Scheer",e:"e-20260821-visit",n:100},

/* --------------------------------------------------- BLOOD — 18 Jul ------ */
{d:"2026-07-18",t:"Haemoglobin",a:"haemoglobin hemoglobin hb anaemia anemia cbc blood",c:"Blood",v:"12.0",u:"g/dL",r:"12–18",p:"WHO: anaemia below 11.0 at 6–59 months",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:12.0},
{d:"2026-07-18",t:"Total WBC count",a:"wbc white blood cell leucocyte leukocyte total count tlc infection cbc",c:"Blood",v:"12,000",u:"cells/cumm",r:"4,000–11,000",p:"",f:"H",x:"warn",s:"Karuna",e:"e-20260718-cbc",n:12000},
{d:"2026-07-18",t:"Neutrophils",a:"neutrophils neutrophil differential dc bacterial cbc",c:"Blood",v:"65",u:"%",r:"40–70",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:65},
{d:"2026-07-18",t:"Lymphocytes",a:"lymphocytes lymphocyte differential dc viral cbc",c:"Blood",v:"30",u:"%",r:"20–40",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:30},
{d:"2026-07-18",t:"Eosinophils",a:"eosinophils eosinophil allergy parasite differential cbc",c:"Blood",v:"02",u:"%",r:"1–6",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:2},
{d:"2026-07-18",t:"Monocytes",a:"monocytes monocyte differential cbc",c:"Blood",v:"03",u:"%",r:"2–10",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:3},
{d:"2026-07-18",t:"Basophils",a:"basophils basophil differential cbc",c:"Blood",v:"00",u:"%",r:"0–2",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:0},
{d:"2026-07-18",t:"RBC count",a:"rbc red blood cell count erythrocyte cbc",c:"Blood",v:"4.5",u:"million/cumm",r:"4.0–5.6",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:4.5},
{d:"2026-07-18",t:"PCV / haematocrit",a:"pcv packed cell volume haematocrit hematocrit hct cbc",c:"Blood",v:"33",u:"%",r:"34–50",p:"about 34–40 at ages 2–6 — borderline, not clearly low",f:"L",x:"watch",s:"Karuna",e:"e-20260718-cbc",n:33},
{d:"2026-07-18",t:"MCV",a:"mcv mean corpuscular volume red cell size microcytic iron cbc",c:"Blood",v:"75",u:"fL",r:"77–95",p:"lower limit about 74 fL at 1.5–4 years — NORMAL for age",f:"L",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:75},
{d:"2026-07-18",t:"MCH",a:"mch mean corpuscular haemoglobin cbc",c:"Blood",v:"26",u:"pg",r:"25–33",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:26},
{d:"2026-07-18",t:"MCHC",a:"mchc mean corpuscular haemoglobin concentration cbc",c:"Blood",v:"35",u:"%",r:"31–36",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:35},
{d:"2026-07-18",t:"Platelet count",a:"platelets platelet thrombocyte count dengue cbc",c:"Blood",v:"268,000",u:"cells/cumm",r:"150,000–410,000",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-cbc",n:268000},
{d:"2026-07-18",t:"CRP",a:"crp c-reactive protein inflammation marker infection bacterial viral titer titre latex",c:"Blood",v:"48",u:"mg/L (est.)",r:"< 6",p:"SEMI-QUANTITATIVE latex titre = 6 mg/L x dilution (1:8). Only possible values are 6, 12, 24, 48, 96, 192. Read as a band, not a precise figure.",f:"POS",x:"warn",s:"Karuna",e:"e-20260718-cbc",n:48},

/* --------------------------------------------------- BLOOD — 21 Aug ------ */
{d:"2026-08-21",t:"Haemoglobin",a:"haemoglobin hemoglobin hb anaemia anemia cbc blood",c:"Blood",v:"11.8",u:"g/dL",r:"12–18",p:"WHO cutoff 11.0 at 6–59 months — NOT anaemic. Lab flag is an adult range.",f:"L",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:11.8},
{d:"2026-08-21",t:"Total WBC count",a:"wbc white blood cell leucocyte leukocyte total count tlc infection cbc",c:"Blood",v:"9,400",u:"cells/cumm",r:"4,000–11,000",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:9400},
{d:"2026-08-21",t:"Neutrophils",a:"neutrophils neutrophil differential dc bacterial cbc",c:"Blood",v:"55",u:"%",r:"40–70",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:55},
{d:"2026-08-21",t:"Lymphocytes",a:"lymphocytes lymphocyte differential dc viral cbc",c:"Blood",v:"40",u:"%",r:"20–40",p:"top of range",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:40},
{d:"2026-08-21",t:"Eosinophils",a:"eosinophils eosinophil allergy parasite differential cbc",c:"Blood",v:"02",u:"%",r:"1–6",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:2},
{d:"2026-08-21",t:"Monocytes",a:"monocytes monocyte differential cbc",c:"Blood",v:"03",u:"%",r:"2–10",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:3},
{d:"2026-08-21",t:"Basophils",a:"basophils basophil differential cbc",c:"Blood",v:"00",u:"%",r:"0–2",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:0},
{d:"2026-08-21",t:"RBC count",a:"rbc red blood cell count erythrocyte cbc",c:"Blood",v:"4.6",u:"million/cumm",r:"4.0–5.6",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:4.6},
{d:"2026-08-21",t:"PCV / haematocrit",a:"pcv packed cell volume haematocrit hematocrit hct cbc",c:"Blood",v:"35",u:"%",r:"34–50",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:35},
{d:"2026-08-21",t:"MCV",a:"mcv mean corpuscular volume red cell size microcytic iron cbc",c:"Blood",v:"76",u:"fL",r:"77–95",p:"lower limit about 74 fL at 1.5–4 years — NORMAL for age. Lab flag is an adult range.",f:"L",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:76},
{d:"2026-08-21",t:"MCH",a:"mch mean corpuscular haemoglobin cbc",c:"Blood",v:"25",u:"pg",r:"25–33",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:25},
{d:"2026-08-21",t:"MCHC",a:"mchc mean corpuscular haemoglobin concentration cbc",c:"Blood",v:"33",u:"%",r:"31–36",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:33},
{d:"2026-08-21",t:"Platelet count",a:"platelets platelet thrombocyte count dengue cbc",c:"Blood",v:"220,000",u:"cells/cumm",r:"150,000–410,000",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-cbc",n:220000},
{d:"2026-08-21",t:"CRP",a:"crp c-reactive protein inflammation marker infection bacterial viral titer titre latex",c:"Blood",v:"96",u:"mg/L (est.)",r:"< 6",p:"SEMI-QUANTITATIVE latex titre = 6 mg/L x dilution (1:16), so the true value is somewhere in the 96-191 band. 48 to 96 is ONE dilution step, the smallest change this method can show. CRP between 50 and 100 cannot separate viral from bacterial.",f:"POS",x:"warn",s:"Karuna",e:"e-20260821-panel",n:96},

/* ------------------------------------------ LIVER FUNCTION — 21 Aug ------ */
{d:"2026-08-21",t:"Total bilirubin",a:"bilirubin total lft liver jaundice",c:"Blood",v:"0.6",u:"mg/dl",r:"0–1.0",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:0.6},
{d:"2026-08-21",t:"Direct bilirubin",a:"bilirubin direct conjugated lft liver jaundice",c:"Blood",v:"0.1",u:"mg/dl",r:"0–0.3",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:0.1},
{d:"2026-08-21",t:"SGOT (AST)",a:"sgot ast aspartate aminotransferase liver lft enzyme",c:"Blood",v:"12",u:"IU/L",r:"0–50",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:12},
{d:"2026-08-21",t:"SGPT (ALT)",a:"sgpt alt alanine aminotransferase liver lft enzyme",c:"Blood",v:"18",u:"IU/L",r:"0–50",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:18},
{d:"2026-08-21",t:"Alkaline phosphatase",a:"alp alkaline phosphatase liver bone lft",c:"Blood",v:"74",u:"IU/ml",r:"25–140",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:74},

/* ----------------------------------------- KIDNEY FUNCTION — 21 Aug ------ */
{d:"2026-08-21",t:"Blood urea",a:"urea bun blood urea nitrogen kidney renal rft",c:"Blood",v:"17",u:"mg/dl",r:"15–45",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:17},
{d:"2026-08-21",t:"Serum creatinine",a:"creatinine kidney renal rft function",c:"Blood",v:"0.5",u:"mg/dl",r:"0.6–1.4",p:"0.30–0.50 at ages 2–4 — NORMAL for age. Lab flag is an adult range.",f:"L",x:"ok",s:"Karuna",e:"e-20260821-panel",n:0.5},
{d:"2026-08-21",t:"Sodium",a:"sodium na electrolyte rft",c:"Blood",v:"139.2",u:"mmol/L",r:"135–145",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:139.2},
{d:"2026-08-21",t:"Potassium",a:"potassium k electrolyte rft",c:"Blood",v:"4.0",u:"mmol/L",r:"3.5–5.0",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260821-panel",n:4.0},

/* -------------------------------------------------- SEROLOGY — 21 Aug ---- */
{d:"2026-08-21",t:"Dengue NS1 antigen",a:"dengue ns1 antigen serology virus fever mosquito",c:"Serology",v:"NEGATIVE",u:"",r:"Negative",p:"",f:"NEG",x:"ok",s:"Karuna",e:"e-20260821-panel"},
{d:"2026-08-21",t:"Dengue IgM",a:"dengue igm antibody serology virus fever recent",c:"Serology",v:"NEGATIVE",u:"",r:"Negative",p:"",f:"NEG",x:"ok",s:"Karuna",e:"e-20260821-panel"},
{d:"2026-08-21",t:"Dengue IgG",a:"dengue igg antibody serology virus past infection",c:"Serology",v:"NEGATIVE",u:"",r:"Negative",p:"",f:"NEG",x:"ok",s:"Karuna",e:"e-20260821-panel"},

/* ------------------------------------------------ URINE — 17 May 2026 ---- */
{d:"2026-05-17",t:"Urine colour",a:"urine colour color appearance physical",c:"Urine",v:"Light yellow",u:"",r:"",p:"",f:"",x:"muted",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine appearance",a:"urine appearance turbid cloudy clear physical",c:"Urine",v:"Slightly turbid",u:"",r:"Clear",p:"",f:"",x:"watch",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Specific gravity",a:"specific gravity sg urine concentration hydration",c:"Urine",v:"1.008",u:"",r:"1.003–1.035",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine",n:1.008},
{d:"2026-05-17",t:"Urine albumin / protein",a:"albumin protein urine proteinuria kidney",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine sugar",a:"sugar glucose urine glycosuria diabetes",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine pH",a:"ph urine acidity alkaline",c:"Urine",v:"6",u:"",r:"5.0–7.5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine",n:6},
{d:"2026-05-17",t:"Urine ketone",a:"ketone urine ketosis starvation",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine bilirubin",a:"bilirubin urine liver",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine blood",a:"blood urine haematuria hematuria rbc",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine leukocytes",a:"leukocytes leucocytes urine dipstick infection uti white cells",c:"Urine",v:"POSITIVE",u:"",r:"Nil",p:"can also come from inflamed vulval skin, not only infection",f:"POS",x:"critical",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Pus cells (urine)",a:"pus cells urine wbc white cells microscopy infection uti pyuria",c:"Urine",v:"7–9",u:"/hpf",r:"0–5",p:"highest in the file",f:"H",x:"critical",s:"Karuna",e:"e-20260517-urine",n:8},
{d:"2026-05-17",t:"Epithelial cells (urine)",a:"epithelial cells urine microscopy contamination",c:"Urine",v:"3–5",u:"/hpf",r:"0–5",p:"raised counts can indicate a contaminated sample",f:"",x:"watch",s:"Karuna",e:"e-20260517-urine",n:4},
{d:"2026-05-17",t:"RBC (urine)",a:"rbc red blood cells urine microscopy haematuria",c:"Urine",v:"Nil",u:"/hpf",r:"0–2",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine casts",a:"casts urine microscopy kidney tubular",c:"Urine",v:"Nil",u:"/hpf",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine crystals",a:"crystals urine microscopy oxalate urate phosphate stones",c:"Urine",v:"Nil",u:"/hpf",r:"Nil",p:"amorphous urate, phosphates and calcium oxalates all nil",f:"",x:"ok",s:"Karuna",e:"e-20260517-urine"},
{d:"2026-05-17",t:"Urine culture",a:"urine culture cs sensitivity growth organism bacteria uti e coli ecoli",c:"Culture",v:"E. COLI ISOLATED",u:"",r:"No growth",p:"Sensitive to cefixime, nitrofurantoin, gentamicin, ofloxacin, ciprofloxacin, amikacin, ceftriaxone, levofloxacin, norfloxacin, cloxacillin. RESISTANT to amoxycillin and azithromycin.",f:"POS",x:"critical",s:"Karuna",e:"e-20260517-culture"},

/* ------------------------------------------------ URINE — 28 May 2026 ---- */
{d:"2026-05-28",t:"Urine colour",a:"urine colour color appearance physical",c:"Urine",v:"Light yellow",u:"",r:"",p:"",f:"",x:"muted",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine appearance",a:"urine appearance turbid cloudy clear physical",c:"Urine",v:"Slightly turbid",u:"",r:"Clear",p:"",f:"",x:"watch",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Specific gravity",a:"specific gravity sg urine concentration hydration",c:"Urine",v:"1.023",u:"",r:"1.003–1.035",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528",n:1.023},
{d:"2026-05-28",t:"Urine albumin / protein",a:"albumin protein urine proteinuria kidney",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine sugar",a:"sugar glucose urine glycosuria",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine pH",a:"ph urine acidity alkaline",c:"Urine",v:"6",u:"",r:"5.0–7.5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528",n:6},
{d:"2026-05-28",t:"Urine ketone",a:"ketone urine ketosis",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine bilirubin",a:"bilirubin urine liver",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine blood",a:"blood urine haematuria hematuria",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine leukocytes",a:"leukocytes leucocytes urine dipstick infection uti white cells",c:"Urine",v:"Nil",u:"",r:"Nil",p:"cleared after cefixime",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Pus cells (urine)",a:"pus cells urine wbc white cells microscopy infection uti pyuria",c:"Urine",v:"1–4",u:"/hpf",r:"0–5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528",n:2.5},
{d:"2026-05-28",t:"Epithelial cells (urine)",a:"epithelial cells urine microscopy contamination",c:"Urine",v:"2–4",u:"/hpf",r:"0–5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528",n:3},
{d:"2026-05-28",t:"RBC (urine)",a:"rbc red blood cells urine microscopy haematuria",c:"Urine",v:"2–4",u:"/hpf",r:"0–2",p:"marginally above range",f:"",x:"watch",s:"Karuna",e:"e-20260528",n:3},
{d:"2026-05-28",t:"Urine casts",a:"casts urine microscopy kidney",c:"Urine",v:"Nil",u:"/hpf",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},
{d:"2026-05-28",t:"Urine crystals",a:"crystals urine microscopy oxalate urate phosphate",c:"Urine",v:"Nil",u:"/hpf",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260528"},

/* ------------------------------------------------ URINE — 31 May 2026 ---- */
{d:"2026-05-31",t:"Urine colour",a:"urine colour color appearance physical",c:"Urine",v:"Light yellow",u:"",r:"",p:"",f:"",x:"muted",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine appearance",a:"urine appearance turbid cloudy clear physical",c:"Urine",v:"Slightly turbid",u:"",r:"Clear",p:"",f:"",x:"watch",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Specific gravity",a:"specific gravity sg urine concentration hydration",c:"Urine",v:"1.022",u:"",r:"1.003–1.035",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine",n:1.022},
{d:"2026-05-31",t:"Urine albumin / protein",a:"albumin protein urine proteinuria",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine sugar",a:"sugar glucose urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine pH",a:"ph urine acidity alkaline",c:"Urine",v:"6",u:"",r:"5.0–7.5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine",n:6},
{d:"2026-05-31",t:"Urine ketone",a:"ketone urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine bilirubin",a:"bilirubin urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine blood",a:"blood urine haematuria",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine leukocytes",a:"leukocytes leucocytes urine dipstick infection uti white cells",c:"Urine",v:"TRACE",u:"",r:"Nil",p:"circled by hand on the report",f:"POS",x:"watch",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Pus cells (urine)",a:"pus cells urine wbc white cells microscopy infection uti pyuria",c:"Urine",v:"3–5",u:"/hpf",r:"0–5",p:"top of range, circled by hand. Same day the culture grew nothing.",f:"",x:"watch",s:"Karuna",e:"e-20260531-urine",n:4},
{d:"2026-05-31",t:"Epithelial cells (urine)",a:"epithelial cells urine microscopy contamination",c:"Urine",v:"2–3",u:"/hpf",r:"0–5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine",n:2.5},
{d:"2026-05-31",t:"RBC (urine)",a:"rbc red blood cells urine microscopy haematuria",c:"Urine",v:"1–2",u:"/hpf",r:"0–2",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine",n:1.5},
{d:"2026-05-31",t:"Urine casts",a:"casts urine microscopy",c:"Urine",v:"Nil",u:"/hpf",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine crystals",a:"crystals urine microscopy oxalate urate",c:"Urine",v:"Nil",u:"/hpf",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260531-urine"},
{d:"2026-05-31",t:"Urine culture",a:"urine culture cs sensitivity growth organism bacteria uti",c:"Culture",v:"NO GROWTH",u:"",r:"No growth",p:"48 h at 37 °C. Taken while burning micturition was still reported.",f:"NEG",x:"ok",s:"Karuna",e:"e-20260531-culture"},

/* ------------------------------------------------ URINE — 25 Jun 2026 ---- */
{d:"2026-06-25",t:"Urine colour",a:"urine colour color physical",c:"Urine",v:"Light yellow",u:"",r:"",p:"",f:"",x:"muted",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine appearance",a:"urine appearance transparency clear turbid physical",c:"Urine",v:"Clear",u:"",r:"Clear",p:"the only clear sample in the file",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine leukocytes",a:"leukocytes leucocytes urine dipstick infection uti white cells",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"clean, while she was complaining of genital itching",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine nitrite",a:"nitrite urine dipstick bacteria uti",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"nitrite is fairly specific for urinary bacteria",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urobilinogen",a:"urobilinogen urine liver haemolysis",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine albumin / protein",a:"albumin protein urine proteinuria kidney",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine pH",a:"ph urine acidity alkaline",c:"Urine",v:"6.5",u:"",r:"5.0–7.5",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine",n:6.5},
{d:"2026-06-25",t:"Urine blood",a:"blood urine haematuria",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Specific gravity",a:"specific gravity sg urine concentration",c:"Urine",v:"1.010",u:"",r:"1.000–1.030",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine",n:1.010},
{d:"2026-06-25",t:"Urine bilirubin",a:"bilirubin urine liver",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine sugar",a:"sugar glucose urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Epithelial cells (urine)",a:"epithelial cells urine microscopy contamination",c:"Urine",v:"0–1",u:"/HPF",r:"0–5",p:"lowest in the file — a clean catch",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine",n:0.5},
{d:"2026-06-25",t:"Pus cells (urine)",a:"pus cells urine wbc white cells microscopy infection uti pyuria",c:"Urine",v:"0–2",u:"/HPF",r:"0–5",p:"lowest in the file",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine",n:1},
{d:"2026-06-25",t:"RBC (urine)",a:"rbc red blood cells urine microscopy haematuria",c:"Urine",v:"0–2",u:"/HPF",r:"0–2",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine",n:1},
{d:"2026-06-25",t:"Urine casts",a:"casts urine microscopy",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine crystals",a:"crystals urine microscopy",c:"Urine",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-urine"},
{d:"2026-06-25",t:"Urine culture",a:"urine culture cs sensitivity growth organism bacteria uti",c:"Culture",v:"NO GROWTH",u:"",r:"No growth",p:"48 h incubation, reported 27 Jun",f:"NEG",x:"ok",s:"K.B.",e:"e-20260625-culture"},

/* ------------------------------------------------ STOOL — 25 Jun 2026 ---- */
{d:"2026-06-25",t:"Stool colour",a:"stool colour color faeces feces physical",c:"Stool",v:"Brownish",u:"",r:"Brown",p:"",f:"",x:"muted",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Stool consistency",a:"stool consistency solid formed loose diarrhoea constipation",c:"Stool",v:"Solid",u:"",r:"Formed",p:"consistent with the documented constipation",f:"",x:"ok",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Stool mucus",a:"mucus stool inflammation bowel",c:"Stool",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Stool blood",a:"blood stool faecal occult bleeding",c:"Stool",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Pus cells (stool)",a:"pus cells stool wbc microscopy infection dysentery",c:"Stool",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"RBC (stool)",a:"rbc red blood cells stool microscopy",c:"Stool",v:"Nil",u:"/HPF",r:"Nil",p:"",f:"",x:"ok",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Helminthic parasite",a:"helminth worm parasite ova eggs threadworm pinworm stool deworming",c:"Stool",v:"No ova seen",u:"",r:"No ova",p:"stool testing MISSES threadworm — eggs are laid around the anus, not passed in stool. The sticky-tape test is the right test.",f:"NEG",x:"watch",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Protozoal parasite",a:"protozoa giardia amoeba cyst trophozoite parasite stool",c:"Stool",v:"No cyst or trophozoite found",u:"",r:"None",p:"",f:"NEG",x:"ok",s:"K.B.",e:"e-20260625-stool"},
{d:"2026-06-25",t:"Undigested food particles",a:"undigested food particles stool malabsorption digestion",c:"Stool",v:"Trace",u:"",r:"Nil",p:"",f:"",x:"muted",s:"K.B.",e:"e-20260625-stool"},

/* ------------------------------------------------ URINE — 18 Jul 2026 ---- */
{d:"2026-07-18",t:"Urine colour",a:"urine colour color physical",c:"Urine",v:"Light yellow",u:"",r:"",p:"",f:"",x:"muted",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Urine appearance",a:"urine appearance turbid cloudy physical",c:"Urine",v:"Slightly turbid",u:"",r:"Clear",p:"",f:"",x:"watch",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Specific gravity",a:"specific gravity sg urine concentration",c:"Urine",v:"1.009",u:"",r:"1.003–1.035",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine",n:1.009},
{d:"2026-07-18",t:"Urine albumin / protein",a:"albumin protein urine proteinuria",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Urine sugar",a:"sugar glucose urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Urine pH",a:"ph urine acidity",c:"Urine",v:"6",u:"",r:"5.0–7.5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine",n:6},
{d:"2026-07-18",t:"Urine ketone",a:"ketone urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Urine bilirubin",a:"bilirubin urine",c:"Urine",v:"Nil",u:"",r:"Nil",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Urine blood",a:"blood urine haematuria hematuria",c:"Urine",v:"TRACE",u:"",r:"Nil",p:"only sample with blood detected on dipstick",f:"POS",x:"watch",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Urine leukocytes",a:"leukocytes leucocytes urine dipstick infection uti white cells",c:"Urine",v:"TRACE",u:"",r:"Nil",p:"",f:"POS",x:"watch",s:"Karuna",e:"e-20260718-urine"},
{d:"2026-07-18",t:"Pus cells (urine)",a:"pus cells urine wbc white cells microscopy infection uti pyuria",c:"Urine",v:"2–4",u:"/hpf",r:"0–5",p:"",f:"",x:"ok",s:"Karuna",e:"e-20260718-urine",n:3},
{d:"2026-07-18",t:"Epithelial cells (urine)",a:"epithelial cells urine microscopy contamination",c:"Urine",v:"3–5",u:"/hpf",r:"0–5",p:"",f:"",x:"watch",s:"Karuna",e:"e-20260718-urine",n:4},
{d:"2026-07-18",t:"RBC (urine)",a:"rbc red blood cells urine microscopy haematuria",c:"Urine",v:"2–3",u:"/hpf",r:"0–2",p:"marginally above range",f:"",x:"watch",s:"Karuna",e:"e-20260718-urine",n:2.5},
{d:"2026-07-18",t:"Urine culture",a:"urine culture cs sensitivity growth organism bacteria uti missing",c:"Culture",v:"SENT — RESULT MISSING",u:"",r:"No growth",p:"Sent at the visit. The doctor asked for follow-up with the report on the Monday. No report exists in the file.",f:"",x:"warn",s:"K.B.",e:"e-20260718-visit"},

/* ---------------------------------------------- ORDERED, NOT REPORTED ---- */
{d:"2026-08-21",t:"Blood culture",a:"blood culture bc sepsis enteric fever typhoid bacteraemia missing outstanding",c:"Culture",v:"ORDERED — RESULT MISSING",u:"",r:"No growth",p:"THE most important outstanding result. In Nepal a blood culture in prolonged fever is primarily looking for enteric fever. It will NOT detect scrub typhus, which needs an IgM ELISA.",f:"",x:"critical",s:"Scheer",e:"e-20260821-visit"},
{d:"2026-08-21",t:"Urine routine (21 Aug)",a:"urine routine re missing outstanding ordered",c:"Urine",v:"ORDERED — RESULT MISSING",u:"",r:"",p:"Ordered alongside the blood culture. Not in the records.",f:"",x:"warn",s:"Scheer",e:"e-20260821-visit"},
{d:"2026-08-21",t:"Urine culture",a:"urine culture cs missing outstanding ordered uti",c:"Culture",v:"ORDERED — RESULT MISSING",u:"",r:"No growth",p:"Ordered alongside the blood culture. Not in the records.",f:"",x:"warn",s:"Scheer",e:"e-20260821-visit"},
{d:"2026-05-31",t:"Ultrasound abdomen + pelvis",a:"usg ultrasound scan imaging abdomen pelvis kidney renal missing outstanding nice",c:"Culture",v:"ADVISED — NO REPORT",u:"",r:"",p:"Advised immediately after the confirmed E. coli infection. Matches NICE NG224 guidance for a child under 3 after UTI. No report anywhere in the file.",f:"",x:"critical",s:"Scheer",e:"e-20260531-visit"}
];

/* Quick-search chips shown above the search box. */
const SEARCH_CHIPS = ["CRP", "Weight", "Haemoglobin", "Pus cells", "Urine culture", "Temperature", "Missing", "Dengue", "Creatinine", "MCV"];
