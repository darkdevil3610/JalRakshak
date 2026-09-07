const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inches
pres.author = "JalRakshak Team (1M1B Internship)";
pres.company = "1M1B AI + Sustainability";
pres.title = "JalRakshak — AI Flood Early-Warning & Advisory Assistant";

// Palette constants (no # prefix)
const C_DARK_BG = "081F26";
const C_LIGHT_BG = "F8FAFC";
const C_CARD_BG = "FFFFFF";
const C_CARD_BORDER = "CBD5E1";
const C_PRIMARY = "0D5C75";
const C_PRIMARY_LIGHT = "E0F2FE";
const C_SECONDARY = "0284C7";
const C_ACCENT = "D97706";
const C_ACCENT_LIGHT = "FEF3C7";
const C_TEXT_DARK = "0F172A";
const C_TEXT_MUTED = "475569";
const C_TEXT_LIGHT = "F8FAFC";
const C_TEXT_LIGHT_MUTED = "94A3B8";

const C_HIGH_RED = "DC2626";
const C_HIGH_BG = "FEE2E2";
const C_MED_AMBER = "D97706";
const C_MED_BG = "FEF3C7";
const C_LOW_GREEN = "16A34A";
const C_LOW_BG = "DCFCE7";

const FONT_HEAD = "Arial";
const FONT_BODY = "Arial";

// Helper: standard header for content slides
function addSlideHeader(slide, title, subtitle, category = "JALRAKSHAK MVP") {
  slide.background = { color: C_LIGHT_BG };

  // Category Tag
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.45,
    w: 5.0,
    h: 0.3,
    fontSize: 10,
    fontFace: FONT_HEAD,
    bold: true,
    color: C_SECONDARY,
    charSpacing: 2,
    margin: 0,
  });

  // Main Slide Title
  slide.addText(title, {
    x: 0.8,
    y: 0.75,
    w: 11.5,
    h: 0.6,
    fontSize: 22,
    fontFace: FONT_HEAD,
    bold: true,
    color: C_TEXT_DARK,
    margin: 0,
  });

  // Subtitle / Framing
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8,
      y: 1.35,
      w: 11.5,
      h: 0.35,
      fontSize: 13,
      fontFace: FONT_BODY,
      color: C_TEXT_MUTED,
      margin: 0,
    });
  }

  // Subtle divider rule
  slide.addShape(pres.shapes.LINE, {
    x: 0.8,
    y: 1.75,
    w: 11.73,
    h: 0,
    line: { color: "E2E8F0", width: 1 },
  });

  // Footer
  slide.addText("JalRakshak · 1M1B AI + Sustainability Virtual Internship (Sep 2026)", {
    x: 0.8,
    y: 7.05,
    w: 8.0,
    h: 0.3,
    fontSize: 9,
    fontFace: FONT_BODY,
    color: "94A3B8",
    margin: 0,
  });
}

// ==========================================
// SLIDE 1: Title Slide (Dark Theme)
// ==========================================
{
  const s = pres.addSlide();
  s.background = { color: C_DARK_BG };

  // SDG Badges container
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: 0.9,
    w: 2.3,
    h: 0.38,
    rectRadius: 0.08,
    fill: { color: "0F3A47" },
    line: { color: "155E75", width: 1 },
  });
  s.addText("SDG 13: CLIMATE ACTION", {
    x: 0.8,
    y: 0.9,
    w: 2.3,
    h: 0.38,
    fontSize: 10,
    bold: true,
    color: "38BDF8",
    align: "center",
    valign: "middle",
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.25,
    y: 0.9,
    w: 2.4,
    h: 0.38,
    rectRadius: 0.08,
    fill: { color: "0F3A47" },
    line: { color: "155E75", width: 1 },
  });
  s.addText("SDG 11: RESILIENT CITIES", {
    x: 3.25,
    y: 0.9,
    w: 2.4,
    h: 0.38,
    fontSize: 10,
    bold: true,
    color: "34D399",
    align: "center",
    valign: "middle",
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.8,
    y: 0.9,
    w: 2.2,
    h: 0.38,
    rectRadius: 0.08,
    fill: { color: "0F3A47" },
    line: { color: "155E75", width: 1 },
  });
  s.addText("SDG 6: CLEAN WATER", {
    x: 5.8,
    y: 0.9,
    w: 2.2,
    h: 0.38,
    fontSize: 10,
    bold: true,
    color: "60A5FA",
    align: "center",
    valign: "middle",
  });

  // Big Title
  s.addText("JalRakshak", {
    x: 0.8,
    y: 1.6,
    w: 11.5,
    h: 1.1,
    fontSize: 54,
    fontFace: FONT_HEAD,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });

  // Subtitle
  s.addText("AI-Powered Flood Early-Warning & Advisory Assistant", {
    x: 0.8,
    y: 2.75,
    w: 11.5,
    h: 0.6,
    fontSize: 22,
    fontFace: FONT_HEAD,
    color: "38BDF8",
    margin: 0,
  });

  // Pitch Box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 3.65,
    w: 11.73,
    h: 1.4,
    fill: { color: "0B2E38" },
    line: { color: "164E63", width: 1 },
  });

  s.addText(
    "A conceptual AI early-warning system that combines rainfall intensity with citizen drain-blockage complaint density to generate explainable, ward-level flood risk scores and plain-language advisories in English and Malayalam for urban residents in Kerala.",
    {
      x: 1.1,
      y: 3.85,
      w: 11.13,
      h: 1.0,
      fontSize: 15,
      fontFace: FONT_BODY,
      color: "E2E8F0",
      lineSpacingMultiple: 1.25,
      margin: 0,
    }
  );

  // Metadata Footer Cards
  const metaY = 5.4;
  s.addText("INTERNSHIP PROJECT", {
    x: 0.8,
    y: metaY,
    w: 3.5,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: "94A3B8",
    charSpacing: 1.5,
    margin: 0,
  });
  s.addText("1M1B AI + Sustainability Virtual Internship\nCohort: September 2026", {
    x: 0.8,
    y: metaY + 0.3,
    w: 4.0,
    h: 0.6,
    fontSize: 13,
    color: C_TEXT_LIGHT,
    margin: 0,
  });

  s.addText("METHODOLOGY & TOOLS", {
    x: 5.5,
    y: metaY,
    w: 3.5,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: "94A3B8",
    charSpacing: 1.5,
    margin: 0,
  });
  s.addText("Architecture Planned & Validated via IBM BOB\nRule Engine + Prompt-Based Advisory Layer", {
    x: 5.5,
    y: metaY + 0.3,
    w: 4.5,
    h: 0.6,
    fontSize: 13,
    color: C_TEXT_LIGHT,
    margin: 0,
  });

  s.addText("TARGET GEOGRAPHY", {
    x: 10.0,
    y: metaY,
    w: 2.5,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: "94A3B8",
    charSpacing: 1.5,
    margin: 0,
  });
  s.addText("Kerala Urban Wards\n(Kochi Municipal Corporation)", {
    x: 10.0,
    y: metaY + 0.3,
    w: 2.5,
    h: 0.6,
    fontSize: 13,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
}

// ==========================================
// SLIDE 2: Problem Statement (Empathize + Define)
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "The Problem: Hyperlocal Early-Warning Gap", "Urban flooding in Kerala affects low-lying wards hours before official district alerts arrive");

  // Problem Statement Hero Box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 1.95,
    w: 11.73,
    h: 1.15,
    fill: { color: C_PRIMARY_LIGHT },
    line: { color: "BAE6FD", width: 1 },
  });

  s.addText("CORE PROBLEM STATEMENT (REQUIRED FORMAT)", {
    x: 1.05,
    y: 2.1,
    w: 11.2,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    charSpacing: 1.5,
    margin: 0,
  });

  s.addText(
    '"How might we use AI to combine rainfall intensity and local drainage-complaint data so that urban wards in Kerala can get earlier, more localized flood warnings?"',
    {
      x: 1.05,
      y: 2.38,
      w: 11.2,
      h: 0.6,
      fontSize: 15,
      fontFace: FONT_HEAD,
      bold: true,
      color: "0369A1",
      italic: true,
      margin: 0,
    }
  );

  // 3 Columns: Who is Affected, Why It Persists, Current Gaps
  const colW = 3.65;
  const colGap = 0.39;
  const colY = 3.35;
  const colH = 3.4;

  // Col 1: Who is affected
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("WHO IS AFFECTED", {
    x: 1.05,
    y: colY + 0.25,
    w: colW - 0.5,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    "• Low-lying ward residents: Ground floor homes, street stalls, and shops flood repeatedly during routine monsoons.\n\n" +
    "• Vulnerable citizens: Elderly and marginalized households lacking real-time access to official disaster channels.\n\n" +
    "• Municipal responders: Ward councillors and health inspectors needing granular, street-level risk visibility.",
    {
      x: 1.05,
      y: colY + 0.65,
      w: colW - 0.5,
      h: 2.5,
      fontSize: 12,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Col 2: Why it persists
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + colW + colGap,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("WHY PROBLEM PERSISTS", {
    x: 0.8 + colW + colGap + 0.25,
    y: colY + 0.25,
    w: colW - 0.5,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: C_ACCENT,
    margin: 0,
  });
  s.addText(
    "• Alerts too broad: Official IMD/KSDMA warnings are district-wide; residents ignore them because they lack street specificity.\n\n" +
    "• Siloed civic data: Citizens report clogged drains to municipalities (via K-SMART), but this data is never linked to flood models.\n\n" +
    "• No lead time: Water enters homes before official warnings translate to community action.",
    {
      x: 0.8 + colW + colGap + 0.25,
      y: colY + 0.65,
      w: colW - 0.5,
      h: 2.5,
      fontSize: 12,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Col 3: Current gaps
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + (colW + colGap) * 2,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("CURRENT GAPS TODAY", {
    x: 0.8 + (colW + colGap) * 2 + 0.25,
    y: colY + 0.25,
    w: colW - 0.5,
    h: 0.3,
    fontSize: 13,
    bold: true,
    color: C_HIGH_RED,
    margin: 0,
  });
  s.addText(
    "• No weak-signal fusion: No existing municipal tool combines rainfall forecasts with localized infrastructure bottlenecks.\n\n" +
    "• Technical jargon: Dam water levels and mm metrics confuse citizens; action-oriented advisories are missing.\n\n" +
    "• Ignored dry-day risk: Severe drain blockages go uninspected until torrential rainfall triggers catastrophic overflow.",
    {
      x: 0.8 + (colW + colGap) * 2 + 0.25,
      y: colY + 0.65,
      w: colW - 0.5,
      h: 2.5,
      fontSize: 12,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 3: Data Sources (Research-backed)
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "Data Sources: Bridging Meteorology & Civic Infrastructure", "Fusing open meteorological data with municipal citizen grievance records");

  // 3 Large Data Source Cards
  const cardW = 3.65;
  const cardGap = 0.39;
  const cardY = 1.95;
  const cardH = 3.6;

  // Source 1: IMD Rainfall
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: cardY,
    w: cardW,
    h: 0.5,
    fill: { color: "0284C7" },
    line: { color: "0284C7" },
  });
  s.addText("1. RAINFALL INTENSITY", {
    x: 1.0,
    y: cardY + 0.1,
    w: cardW - 0.4,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
  s.addText(
    "Real Source: India Meteorological Dept (IMD)\n" +
    "• 24-hr rainfall forecasts (mm)\n" +
    "• 5-day district-level outlooks & nowcasts\n" +
    "• Flash flood bulletins & CAP RSS feeds\n" +
    "• Official API: api.imd.gov.in\n\n" +
    "Role in JalRakshak:\n" +
    "Primary hazard driver. Identifies incoming water volume across urban catchment basins.",
    {
      x: 1.0,
      y: cardY + 0.7,
      w: cardW - 0.4,
      h: 2.7,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Source 2: KSDMA Rivers
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + cardW + cardGap,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + cardW + cardGap,
    y: cardY,
    w: cardW,
    h: 0.5,
    fill: { color: "0D5C75" },
    line: { color: "0D5C75" },
  });
  s.addText("2. RIVER / RESERVOIR LEVELS", {
    x: 0.8 + cardW + cardGap + 0.2,
    y: cardY + 0.1,
    w: cardW - 0.4,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
  s.addText(
    "Real Source: Kerala State Disaster Management\n" +
    "• Daily reservoir & river level bulletins\n" +
    "• % of danger mark (Periyar / Canal gauges)\n" +
    "• Early warning river monitoring alerts\n" +
    "• Official portal: sdma.kerala.gov.in\n\n" +
    "Role in JalRakshak:\n" +
    "System saturation signal. High river levels prevent urban stormwater from discharging outward.",
    {
      x: 0.8 + cardW + cardGap + 0.2,
      y: cardY + 0.7,
      w: cardW - 0.4,
      h: 2.7,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Source 3: K-SMART Grievances
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + (cardW + cardGap) * 2,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + (cardW + cardGap) * 2,
    y: cardY,
    w: cardW,
    h: 0.5,
    fill: { color: C_ACCENT },
    line: { color: C_ACCENT },
  });
  s.addText("3. DRAIN COMPLAINT DENSITY", {
    x: 0.8 + (cardW + cardGap) * 2 + 0.2,
    y: cardY + 0.1,
    w: cardW - 0.4,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
  s.addText(
    "Real Source: K-SMART Municipal Platform (LSGD)\n" +
    "• Citizen grievance redressal (launched 2024)\n" +
    "• Geo-tagged drain blockage complaints\n" +
    "• 7-day unresolved complaint counts per ward\n" +
    "• Official portal: lsg.kerala.gov.in\n\n" +
    "Role in JalRakshak:\n" +
    "Weak-signal proxy. Blocked drains mean low drainage capacity — transforming moderate rain into flooding.",
    {
      x: 0.8 + (cardW + cardGap) * 2 + 0.2,
      y: cardY + 0.7,
      w: cardW - 0.4,
      h: 2.7,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Scope Boundary Banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 5.75,
    w: 11.73,
    h: 1.0,
    fill: { color: "F1F5F9" },
    line: { color: "CBD5E1", width: 1 },
  });

  s.addText("PROTOTYPE SIMULATION SCOPE (HONEST ENGINEERING BOUNDARY)", {
    x: 1.05,
    y: 5.88,
    w: 11.2,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: C_TEXT_MUTED,
    charSpacing: 1,
    margin: 0,
  });
  s.addText(
    "For this internship conceptual MVP, live external APIs are intentionally simulated using 4 structured CSV files (wards.csv, rainfall.csv, complaints.csv, river_levels.csv). This isolates and proves the AI scoring and advisory workflow without requiring government credentials.",
    {
      x: 1.05,
      y: 6.12,
      w: 11.2,
      h: 0.5,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 4: AI Workflow Architecture
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "AI Workflow Architecture: From Raw Signal to Action", "Four-stage pipeline converting disparate inputs into localized citizen advisories");

  // Step 1: Ingestion & Fusion Box
  const bW = 2.65;
  const bH = 3.6;
  const gap = 0.37;
  const bY = 2.0;

  // Box 1
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: bY,
    w: bW,
    h: bH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("STAGE 1", {
    x: 1.0,
    y: bY + 0.2,
    w: bW - 0.4,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: C_SECONDARY,
    margin: 0,
  });
  s.addText("Weak-Signal Fusion", {
    x: 1.0,
    y: bY + 0.45,
    w: bW - 0.4,
    h: 0.35,
    fontSize: 15,
    bold: true,
    color: C_TEXT_DARK,
    margin: 0,
  });
  s.addText(
    "• Ingests 24-hr rainfall forecasts per ward (IMD)\n\n" +
    "• Captures river / reservoir levels vs danger mark (KSDMA)\n\n" +
    "• Aggregates 7-day drain blockage complaints (K-SMART)\n\n" +
    "• Builds localized per-ward data snapshot for risk evaluation",
    {
      x: 1.0,
      y: bY + 0.9,
      w: bW - 0.4,
      h: 2.5,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Arrow 1 -> 2
  s.addText("➔", {
    x: 0.8 + bW,
    y: bY + 1.6,
    w: gap,
    h: 0.5,
    fontSize: 22,
    color: C_SECONDARY,
    align: "center",
    valign: "middle",
  });

  // Box 2
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + bW + gap,
    y: bY,
    w: bW,
    h: bH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("STAGE 2", {
    x: 0.8 + bW + gap + 0.2,
    y: bY + 0.2,
    w: bW - 0.4,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText("Rule Risk Engine", {
    x: 0.8 + bW + gap + 0.2,
    y: bY + 0.45,
    w: bW - 0.4,
    h: 0.35,
    fontSize: 15,
    bold: true,
    color: C_TEXT_DARK,
    margin: 0,
  });
  s.addText(
    "• Rain > 100mm: +2 pts\n  Rain 50-100mm: +1 pt\n\n" +
    "• Complaints > 5: +1 pt\n\n" +
    "• Reservoir > 80%: +1 pt\n\n" +
    "• Classification:\n  0-1: Low Risk\n  2-3: Medium Risk\n  4+: High Risk\n\n" +
    "• Auditable & explainable",
    {
      x: 0.8 + bW + gap + 0.2,
      y: bY + 0.9,
      w: bW - 0.4,
      h: 2.5,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.15,
      margin: 0,
    }
  );

  // Arrow 2 -> 3
  s.addText("➔", {
    x: 0.8 + (bW + gap) * 2 - gap,
    y: bY + 1.6,
    w: gap,
    h: 0.5,
    fontSize: 22,
    color: C_PRIMARY,
    align: "center",
    valign: "middle",
  });

  // Box 3
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + (bW + gap) * 2,
    y: bY,
    w: bW,
    h: bH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("STAGE 3", {
    x: 0.8 + (bW + gap) * 2 + 0.2,
    y: bY + 0.2,
    w: bW - 0.4,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: C_ACCENT,
    margin: 0,
  });
  s.addText("Inspection Flag", {
    x: 0.8 + (bW + gap) * 2 + 0.2,
    y: bY + 0.45,
    w: bW - 0.4,
    h: 0.35,
    fontSize: 15,
    bold: true,
    color: C_TEXT_DARK,
    margin: 0,
  });
  s.addText(
    "• Detects dry-day risk:\n  Complaints > 5 AND\n  Rainfall score == 0\n\n" +
    "• Municipal Review Flag:\n  Triggers inspection notice before heavy rains hit\n\n" +
    "• Transforms complaints from reactive maintenance to proactive flood prevention",
    {
      x: 0.8 + (bW + gap) * 2 + 0.2,
      y: bY + 0.9,
      w: bW - 0.4,
      h: 2.5,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Arrow 3 -> 4
  s.addText("➔", {
    x: 0.8 + (bW + gap) * 3 - gap,
    y: bY + 1.6,
    w: gap,
    h: 0.5,
    fontSize: 22,
    color: C_ACCENT,
    align: "center",
    valign: "middle",
  });

  // Box 4
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + (bW + gap) * 3,
    y: bY,
    w: bW,
    h: bH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addText("STAGE 4", {
    x: 0.8 + (bW + gap) * 3 + 0.2,
    y: bY + 0.2,
    w: bW - 0.4,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: "059669",
    margin: 0,
  });
  s.addText("Advisory Generator", {
    x: 0.8 + (bW + gap) * 3 + 0.2,
    y: bY + 0.45,
    w: bW - 0.4,
    h: 0.35,
    fontSize: 15,
    bold: true,
    color: C_TEXT_DARK,
    margin: 0,
  });
  s.addText(
    "• Conversational layer:\n  Generates plain-language citizen guidance (<60 words)\n\n" +
    "• Dual Language:\n  English + Malayalam\n\n" +
    "• Action-Oriented:\n  Clear timing, roads to avoid, and emergency contact (KSDMA 1070)",
    {
      x: 0.8 + (bW + gap) * 3 + 0.2,
      y: bY + 0.9,
      w: bW - 0.4,
      h: 2.5,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.2,
      margin: 0,
    }
  );

  // Architecture Callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 5.85,
    w: 11.73,
    h: 0.95,
    fill: { color: "F1F5F9" },
    line: { color: "CBD5E1", width: 1 },
  });
  s.addText("WHY RULE-BASED SCORING + PROMPT-BASED ADVISORY (DUAL ARCHITECTURE)", {
    x: 1.05,
    y: 5.95,
    w: 11.2,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: C_TEXT_MUTED,
    margin: 0,
  });
  s.addText(
    "Public disaster management requires 100% auditability — a black-box neural net cannot be explained during emergency council meetings. We keep the risk scoring strictly rule-based, and reserve the AI / LLM layer for language generation and summarizing unstructured citizen complaints.",
    {
      x: 1.05,
      y: 6.18,
      w: 11.2,
      h: 0.5,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 5: Explainable Risk Engine
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "Explainable Risk Engine & Scoring Rules", "Defensible, transparent scoring that links meteorological load to drainage capacity");

  // Left Card: Scoring Rules Table
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 1.95,
    w: 6.8,
    h: 4.85,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });

  s.addText("EXACT POINT ALLOCATION RULES", {
    x: 1.05,
    y: 2.15,
    w: 6.3,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });

  // Table Data
  const tableData = [
    [
      { text: "Input Signal", options: { bold: true, fill: { color: "F1F5F9" }, color: C_TEXT_DARK } },
      { text: "Threshold Condition", options: { bold: true, fill: { color: "F1F5F9" }, color: C_TEXT_DARK } },
      { text: "Points", options: { bold: true, fill: { color: "F1F5F9" }, color: C_TEXT_DARK } },
      { text: "Mechanism", options: { bold: true, fill: { color: "F1F5F9" }, color: C_TEXT_DARK } },
    ],
    [
      { text: "Rainfall (24h)" },
      { text: "> 100 mm" },
      { text: "+2", options: { bold: true, color: C_HIGH_RED } },
      { text: "Torrents exceed pipe conveyance" },
    ],
    [
      { text: "Rainfall (24h)" },
      { text: "50 mm – 100 mm" },
      { text: "+1", options: { bold: true, color: C_MED_AMBER } },
      { text: "Sustained moderate storm run-off" },
    ],
    [
      { text: "Drain Complaints" },
      { text: "> 5 reports (7 days)" },
      { text: "+1", options: { bold: true, color: C_PRIMARY } },
      { text: "Active bottlenecks reduce throughput" },
    ],
    [
      { text: "River / Reservoir" },
      { text: "> 80% danger mark" },
      { text: "+1", options: { bold: true, color: C_PRIMARY } },
      { text: "Backwater effect prevents discharge" },
    ],
  ];

  s.addTable(tableData, {
    x: 1.05,
    y: 2.5,
    w: 6.3,
    h: 2.6,
    colW: [1.6, 1.8, 0.7, 2.2],
    fontSize: 11,
    border: { pt: 0.5, color: "CBD5E1" },
    fill: { color: "FFFFFF" },
    align: "left",
    valign: "middle",
  });

  s.addText(
    "Key engineering detail: Strict inequality thresholds (>100mm, >5 complaints, >80% reservoir) prevent boundary jitter. Maximum possible risk score is 4 with current weights.",
    {
      x: 1.05,
      y: 5.3,
      w: 6.3,
      h: 0.6,
      fontSize: 11,
      color: C_TEXT_MUTED,
      italic: true,
      margin: 0,
    }
  );

  // Right Card: Classification Tiers
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85,
    y: 1.95,
    w: 4.68,
    h: 4.85,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });

  s.addText("RISK CLASSIFICATION BANDS", {
    x: 8.1,
    y: 2.15,
    w: 4.2,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_TEXT_DARK,
    margin: 0,
  });

  // Low Tier
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.1,
    y: 2.5,
    w: 4.18,
    h: 1.1,
    rectRadius: 0.08,
    fill: { color: C_LOW_BG },
    line: { color: "86EFAC", width: 1 },
  });
  s.addText("0 – 1 POINTS · LOW RISK", {
    x: 8.3,
    y: 2.6,
    w: 3.7,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_LOW_GREEN,
    margin: 0,
  });
  s.addText("Routine precautions. Drainage network operating within safe margins. Citizen reassurance advisory.", {
    x: 8.3,
    y: 2.9,
    w: 3.7,
    h: 0.6,
    fontSize: 11,
    color: "14532D",
    margin: 0,
  });

  // Medium Tier
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.1,
    y: 3.75,
    w: 4.18,
    h: 1.1,
    rectRadius: 0.08,
    fill: { color: C_MED_BG },
    line: { color: "FDE68A", width: 1 },
  });
  s.addText("2 – 3 POINTS · MEDIUM RISK", {
    x: 8.3,
    y: 3.85,
    w: 3.7,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_MED_AMBER,
    margin: 0,
  });
  s.addText("Heightened readiness. Localized waterlogging anticipated on low roads. Move vehicles & secure valuables.", {
    x: 8.3,
    y: 4.15,
    w: 3.7,
    h: 0.6,
    fontSize: 11,
    color: "78350F",
    margin: 0,
  });

  // High Tier
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 8.1,
    y: 5.0,
    w: 4.18,
    h: 1.5,
    rectRadius: 0.08,
    fill: { color: C_HIGH_BG },
    line: { color: "FCA5A5", width: 1 },
  });
  s.addText("4+ POINTS · HIGH RISK", {
    x: 8.3,
    y: 5.1,
    w: 3.7,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_HIGH_RED,
    margin: 0,
  });
  s.addText("Immediate action. Severe inundation likely. Avoid low-lying travel after 6 PM. Emergency helpline (KSDMA 1070) broadcast to all registered ward phones.", {
    x: 8.3,
    y: 5.4,
    w: 3.7,
    h: 0.95,
    fontSize: 11,
    color: "7F1D1D",
    margin: 0,
  });
}

// ==========================================
// SLIDE 6: Demo Scenarios A & B
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "Prototype Demo: Worked Scenarios A & B", "Verifiable outputs from the running JalRakshak Python engine");

  const scW = 5.65;
  const scH = 4.85;
  const scY = 1.95;

  // Scenario A Card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: scY,
    w: scW,
    h: scH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: scY,
    w: scW,
    h: 0.45,
    fill: { color: C_HIGH_BG },
    line: { color: "FCA5A5" },
  });
  s.addText("SCENARIO A: WARD 12 (KALOOR NORTH) — HIGH RISK", {
    x: 1.05,
    y: scY + 0.1,
    w: scW - 0.5,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: C_HIGH_RED,
    margin: 0,
  });

  s.addText(
    "Input Signals:\n" +
    "• 24-hr Rainfall: 130 mm (>100mm)  ➜  +2 pts\n" +
    "• Drain Complaints (7d): 7 (>5)  ➜  +1 pt\n" +
    "• Reservoir Level: 90% (>80%)  ➜  +1 pt\n" +
    "Total Score: 2 + 1 + 1 = 4 ➜ HIGH RISK",
    {
      x: 1.05,
      y: scY + 0.6,
      w: scW - 0.5,
      h: 1.15,
      fontSize: 12,
      fontFace: FONT_HEAD,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.05,
    y: scY + 1.85,
    w: scW - 0.5,
    h: 1.3,
    fill: { color: "F8FAFC" },
    line: { color: "E2E8F0", width: 1 },
  });
  s.addText("English Advisory Output:", {
    x: 1.2,
    y: scY + 1.95,
    w: scW - 0.8,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    '"High flood risk in Ward 12. Heavy rainfall (130 mm in 24 h); 7 unresolved drain complaints in 7 days; Reservoir/river at 90% of danger mark. Avoid travel through low-lying areas after 6 PM. Keep emergency numbers ready (KSDMA Helpline: 1070)."',
    {
      x: 1.2,
      y: scY + 2.2,
      w: scW - 0.8,
      h: 0.85,
      fontSize: 11,
      italic: true,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.05,
    y: scY + 3.25,
    w: scW - 0.5,
    h: 1.35,
    fill: { color: "F8FAFC" },
    line: { color: "E2E8F0", width: 1 },
  });
  s.addText("Malayalam Advisory Output (Local Language):", {
    x: 1.2,
    y: scY + 3.35,
    w: scW - 0.8,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    '"Ward 12-ൽ കനത്ത വെള്ളപ്പൊക്ക സാധ്യതയുണ്ട്. കനത്ത മഴയും അഴുക്കുചാൽ തടസ്സവും സാധ്യത വർദ്ധിപ്പിക്കുന്നു. താഴ്ന്ന പ്രദേശങ്ങളിലൂടെയുള്ള യാത്ര ഒഴിവാക്കുക. അടിയന്തര സഹായത്തിന് 1070 നമ്പറിൽ ബന്ധപ്പെടുക."',
    {
      x: 1.2,
      y: scY + 3.6,
      w: scW - 0.8,
      h: 0.9,
      fontSize: 11,
      italic: true,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );

  // Scenario B Card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85,
    y: scY,
    w: scW,
    h: scH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85,
    y: scY,
    w: scW,
    h: 0.45,
    fill: { color: C_LOW_BG },
    line: { color: "86EFAC" },
  });
  s.addText("SCENARIO B: WARD 5 (PANAMPILLY NAGAR) — LOW RISK", {
    x: 7.1,
    y: scY + 0.1,
    w: scW - 0.5,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: C_LOW_GREEN,
    margin: 0,
  });

  s.addText(
    "Input Signals:\n" +
    "• 24-hr Rainfall: 60 mm (50-100mm)  ➜  +1 pt\n" +
    "• Drain Complaints (7d): 2 (<=5)  ➜  +0 pts\n" +
    "• Reservoir Level: 60% (<=80%)  ➜  +0 pts\n" +
    "Total Score: 1 + 0 + 0 = 1 ➜ LOW RISK",
    {
      x: 7.1,
      y: scY + 0.6,
      w: scW - 0.5,
      h: 1.15,
      fontSize: 12,
      fontFace: FONT_HEAD,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.1,
    y: scY + 1.85,
    w: scW - 0.5,
    h: 1.3,
    fill: { color: "F8FAFC" },
    line: { color: "E2E8F0", width: 1 },
  });
  s.addText("English Advisory Output:", {
    x: 7.25,
    y: scY + 1.95,
    w: scW - 0.8,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    '"Low flood risk in Ward 5 today. Normal precautions advised."',
    {
      x: 7.25,
      y: scY + 2.3,
      w: scW - 0.8,
      h: 0.6,
      fontSize: 12,
      italic: true,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.1,
    y: scY + 3.25,
    w: scW - 0.5,
    h: 1.35,
    fill: { color: "F8FAFC" },
    line: { color: "E2E8F0", width: 1 },
  });
  s.addText("Malayalam Advisory Output (Local Language):", {
    x: 7.25,
    y: scY + 3.35,
    w: scW - 0.8,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    '"Ward 5-ൽ ഇന്ന് വെള്ളപ്പൊക്ക ഭീഷണി കുറവാണ്. സാധാരണ മുൻകരുതലുകൾ തുടരുക."',
    {
      x: 7.25,
      y: scY + 3.7,
      w: scW - 0.8,
      h: 0.6,
      fontSize: 12,
      italic: true,
      color: C_TEXT_DARK,
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 7: Insight Beyond Weather: Scenario C
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "Insight Beyond Prediction: Scenario C", "Detecting infrastructure failure before rainfall arrives — transforming complaints to proactive maintenance");

  // Big Hero Box for Scenario C
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 1.95,
    w: 11.73,
    h: 4.85,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });

  // Top Flag Header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 1.95,
    w: 11.73,
    h: 0.5,
    fill: { color: C_ACCENT_LIGHT },
    line: { color: "FCD34D" },
  });
  s.addText("SCENARIO C: WARD 9 (PONEKKARA) — LOW WEATHER RISK BUT MUNICIPAL INSPECTION FLAGGED", {
    x: 1.05,
    y: 2.05,
    w: 11.2,
    h: 0.3,
    fontSize: 11,
    bold: true,
    color: C_ACCENT,
    margin: 0,
  });

  // 2 Sub-Columns inside
  const colW = 5.4;
  const colY = 2.65;

  // Left Sub-column: The Scenario Data
  s.addText("INPUT SIGNALS & ENGINE EVALUATION", {
    x: 1.05,
    y: colY,
    w: colW,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });

  s.addText(
    "• 24-hr Rainfall: 40 mm (<50mm)  ➜  +0 pts (dry day signal)\n" +
    "• Drain Complaints (7d): 8 reports (>5)  ➜  +1 pt (bottleneck)\n" +
    "• Reservoir Level: 70% (<=80%)  ➜  +0 pts (safe capacity)\n\n" +
    "Total Score: 0 + 1 + 0 = 1 ➜ Classified as LOW RISK\n\n" +
    "🚩 INFRASTRUCTURE REVIEW RULE FIRED:\n" +
    "   comp_pts > 0 AND rain_pts == 0\n" +
    "   System detects severe civic blockage independent of rainfall!",
    {
      x: 1.05,
      y: colY + 0.35,
      w: colW,
      h: 1.9,
      fontSize: 12,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.15,
      margin: 0,
    }
  );

  // Dual Advisory Boxes on Left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.05,
    y: 4.85,
    w: colW,
    h: 1.7,
    fill: { color: "F8FAFC" },
    line: { color: "E2E8F0", width: 1 },
  });
  s.addText("Generated Advisories (Municipal Action + Citizen):", {
    x: 1.25,
    y: 4.95,
    w: colW - 0.4,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    'EN: "Low rainfall risk, but Ward 9 has 8 unresolved drain complaints — recommend municipal inspection regardless of rainfall."\n\n' +
    'ML: "മഴ കുറവാണ്, എങ്കിലും Ward 9-ൽ 8 അഴുക്കുചാൽ പരാതികൾ പരിഹരിക്കപ്പെടാതെ കിടക്കുന്നു — അടിയന്തര നഗരസഭാ പരിശോധന ശുപാർശ ചെയ്യുന്നു."',
    {
      x: 1.25,
      y: 5.25,
      w: colW - 0.4,
      h: 1.2,
      fontSize: 11,
      italic: true,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.15,
      margin: 0,
    }
  );

  // Right Sub-column: The Strategic Impact
  s.addText("WHY THIS IS A BREAKTHROUGH FOR CITY RESILIENCE", {
    x: 6.85,
    y: colY,
    w: colW,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_ACCENT,
    margin: 0,
  });

  s.addText(
    "1. Beyond Pure Weather Prediction:\n" +
    "Standard flood apps only trigger alerts when skies open up. JalRakshak identifies the root vulnerability — choked drainage — before the clouds arrive.\n\n" +
    "2. Proactive Municipal Desilting:\n" +
    "Ward health inspectors receive an automated priority list of drains that must be cleared within 48 hours, turning civic complaints into an engineering defense line.\n\n" +
    "3. Citizen Accountability Loop:\n" +
    "Citizens who submitted complaints see their reports actively monitored as early warning indicators, increasing trust in municipal platforms like K-SMART.",
    {
      x: 6.85,
      y: colY + 0.35,
      w: colW,
      h: 3.6,
      fontSize: 12,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.25,
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 8: Planned & Validated with IBM BOB
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "Planned & Validated with IBM BOB", "Using IBM BOB Ask/Plan mode to reason through architecture and stress-test scaling limits");

  // Left Column: BOB's Findings & Changes Made (w=5.6)
  const leftW = 5.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: 1.95,
    w: leftW,
    h: 4.85,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });

  s.addText("KEY GAPS IDENTIFIED BY IBM BOB", {
    x: 1.05,
    y: 2.15,
    w: leftW - 0.5,
    h: 0.25,
    fontSize: 12,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });

  s.addText(
    "1. Temporal Misalignment at Scale (6 ➔ 100+ Wards):\n" +
    "BOB flagged that static daily snapshots fail when IMD nowcasts update 3-hourly while complaint logs stream continuously. Recommended asynchronous event-driven queues.\n\n" +
    "2. Spatial Gauge Granularity:\n" +
    "Current prototype applies city-wide max reservoir level to all wards equally. BOB flagged that inland wards should not inherit coastal/river gauge alerts — mandates spatial basin mapping.\n\n" +
    "3. Complaint Normalization Bias:\n" +
    "Flat complaint count (>5) penalizes smaller wards and ignores dense wards. BOB recommended per-capita weighting (complaints / 1,000 households).\n\n" +
    "4. LLM Hallucination Guardrails:\n" +
    "BOB warned that LLMs confabulate street names in Kerala. We adopted deterministic templates as primary runtime and added KSDMA Helpline 1070.",
    {
      x: 1.05,
      y: 2.45,
      w: leftW - 0.5,
      h: 4.2,
      fontSize: 11,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.15,
      margin: 0,
    }
  );

  // Right Column: Screenshot Placeholders for user's IBM BOB run
  const rightW = 5.7;
  const rightX = 6.83;

  // Frame 1: Architecture Plan Mode Exchange
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX,
    y: 1.95,
    w: rightW,
    h: 2.32,
    fill: { color: "F1F5F9" },
    line: { color: "94A3B8", width: 1.5, dashType: "dash" },
  });
  s.addText("SCREENSHOT 1: IBM BOB ARCHITECTURE REASONING", {
    x: rightX + 0.2,
    y: 2.1,
    w: rightW - 0.4,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: C_PRIMARY,
    margin: 0,
  });
  s.addText(
    "[ Drop Screenshot of IBM BOB Ask/Plan Mode here ]\n\n" +
    "Shows: Initial prompt reasoning through ward-level risk scoring,\n" +
    "data flow architecture, and weak-signal fusion.",
    {
      x: rightX + 0.2,
      y: 2.5,
      w: rightW - 0.4,
      h: 1.5,
      fontSize: 11,
      color: C_TEXT_MUTED,
      align: "center",
      valign: "middle",
      margin: 0,
    }
  );

  // Frame 2: Gap Analysis & Critique
  s.addShape(pres.shapes.RECTANGLE, {
    x: rightX,
    y: 4.48,
    w: rightW,
    h: 2.32,
    fill: { color: "F1F5F9" },
    line: { color: "94A3B8", width: 1.5, dashType: "dash" },
  });
  s.addText("SCREENSHOT 2: IBM BOB GAP ANALYSIS & CRITIQUE", {
    x: rightX + 0.2,
    y: 4.63,
    w: rightW - 0.4,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: C_ACCENT,
    margin: 0,
  });
  s.addText(
    "[ Drop Screenshot of IBM BOB Gap Analysis here ]\n\n" +
    "Shows: BOB flagging scaling risks, unnormalized complaints,\n" +
    "and recommending emergency helpline validation.",
    {
      x: rightX + 0.2,
      y: 5.05,
      w: rightW - 0.4,
      h: 1.5,
      fontSize: 11,
      color: C_TEXT_MUTED,
      align: "center",
      valign: "middle",
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 9: Prototype vs Future Scope
// ==========================================
{
  const s = pres.addSlide();
  addSlideHeader(s, "Engineering Scope: Prototype vs Production Scaling", "Honest engineering boundaries — what is built today versus roadmap for full deployment");

  const colW = 5.65;
  const colH = 4.85;
  const colY = 1.95;

  // In Scope Card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: colY,
    w: colW,
    h: 0.45,
    fill: { color: "DCFCE7" },
    line: { color: "86EFAC" },
  });
  s.addText("IN SCOPE: DELIVERED MVP PROTOTYPE", {
    x: 1.05,
    y: colY + 0.1,
    w: colW - 0.5,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: C_LOW_GREEN,
    margin: 0,
  });

  s.addText(
    "✓ Explainable Risk Engine:\n" +
    "  Rule-based scoring (+2, +1, +1, +1) implemented in clean, testable Python.\n\n" +
    "✓ Multi-Source Simulated Dataset:\n" +
    "  6 Kochi wards with rainfall, river gauges, and 7-day complaint logs.\n\n" +
    "✓ Dual-Language Advisory Generator:\n" +
    "  Deterministic template engine producing English and Malayalam citizen SMS.\n\n" +
    "✓ Scenario C Infrastructure Detection:\n" +
    "  Automated municipal inspection trigger for high-complaint dry days.\n\n" +
    "✓ 100% Automated Test Suite:\n" +
    "  Unit test suite (unittest) verifying boundary conditions and spec compliance.\n\n" +
    "✓ IBM BOB Validation Artifacts:\n" +
    "  Comprehensive architecture critique (.bob rules & markdown review).",
    {
      x: 1.05,
      y: colY + 0.6,
      w: colW - 0.5,
      h: 4.1,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.15,
      margin: 0,
    }
  );

  // Out of Scope Card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85,
    y: colY,
    w: colW,
    h: colH,
    fill: { color: C_CARD_BG },
    line: { color: C_CARD_BORDER, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85,
    y: colY,
    w: colW,
    h: 0.45,
    fill: { color: "F1F5F9" },
    line: { color: "CBD5E1" },
  });
  s.addText("OUT OF SCOPE: PRODUCTION SCALING ROADMAP", {
    x: 7.1,
    y: colY + 0.1,
    w: colW - 0.5,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: C_TEXT_MUTED,
    margin: 0,
  });

  s.addText(
    "➔ Live Government API Connections:\n" +
    "  Real-time data feeds with IMD Mausam API and KSDMA alert webhooks.\n\n" +
    "➔ Spatial Hydrological DEM Modeling:\n" +
    "  Digital Elevation Models (DEM) mapping slope run-off directly into drains.\n\n" +
    "➔ Population-Normalized Complaints:\n" +
    "  Weighing complaints by ward household density and road network length.\n\n" +
    "➔ Officer-in-the-Loop Broadcast Portal:\n" +
    "  Web dashboard for municipal emergency officers to approve High alerts.\n\n" +
    "➔ Automated Telephony & Voice SMS:\n" +
    "  Twilio / Kerala BSNL cell-broadcast integration for Malayalam voice IVR.\n\n" +
    "➔ Historical Flood Calibration:\n" +
    "  Calibrating score weights against 2018–2024 historical flood inundation maps.",
    {
      x: 7.1,
      y: colY + 0.6,
      w: colW - 0.5,
      h: 4.1,
      fontSize: 11.5,
      color: C_TEXT_DARK,
      lineSpacingMultiple: 1.15,
      margin: 0,
    }
  );
}

// ==========================================
// SLIDE 10: Impact & SDG Alignment (Dark Theme)
// ==========================================
{
  const s = pres.addSlide();
  s.background = { color: C_DARK_BG };

  // Category Tag
  s.addText("SUSTAINABILITY IMPACT & CONCLUSION", {
    x: 0.8,
    y: 0.6,
    w: 6.0,
    h: 0.3,
    fontSize: 10,
    fontFace: FONT_HEAD,
    bold: true,
    color: "38BDF8",
    charSpacing: 2,
    margin: 0,
  });

  // Title
  s.addText("Building Climate-Resilient Urban Communities", {
    x: 0.8,
    y: 0.95,
    w: 11.5,
    h: 0.6,
    fontSize: 32,
    fontFace: FONT_HEAD,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });

  s.addText("How JalRakshak delivers direct progress toward the United Nations Sustainable Development Goals", {
    x: 0.8,
    y: 1.6,
    w: 11.5,
    h: 0.35,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: C_TEXT_LIGHT_MUTED,
    margin: 0,
  });

  // 3 Large SDG Cards
  const cardW = 3.65;
  const cardGap = 0.39;
  const cardY = 2.2;
  const cardH = 3.8;

  // SDG 13
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: "0B2E38" },
    line: { color: "164E63", width: 1 },
  });
  s.addText("PRIMARY SDG", {
    x: 1.05,
    y: cardY + 0.2,
    w: cardW - 0.5,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: "38BDF8",
    margin: 0,
  });
  s.addText("SDG 13: Climate Action", {
    x: 1.05,
    y: cardY + 0.45,
    w: cardW - 0.5,
    h: 0.35,
    fontSize: 16,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
  s.addText(
    "Target 13.1 & 13.3:\n" +
    "Strengthen resilience and adaptive capacity to climate-related hazards.\n\n" +
    "Impact:\n" +
    "Provides localized early warning 3–6 hours before inundation, allowing families in low-lying wards to secure belongings, avoid hazardous roads, and prevent loss of life.",
    {
      x: 1.05,
      y: cardY + 0.95,
      w: cardW - 0.5,
      h: 2.6,
      fontSize: 12,
      color: "E2E8F0",
      lineSpacingMultiple: 1.25,
      margin: 0,
    }
  );

  // SDG 11
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + cardW + cardGap,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: "0B2E38" },
    line: { color: "164E63", width: 1 },
  });
  s.addText("SECONDARY SDG", {
    x: 0.8 + cardW + cardGap + 0.25,
    y: cardY + 0.2,
    w: cardW - 0.5,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: "34D399",
    margin: 0,
  });
  s.addText("SDG 11: Resilient Cities", {
    x: 0.8 + cardW + cardGap + 0.25,
    y: cardY + 0.45,
    w: cardW - 0.5,
    h: 0.35,
    fontSize: 16,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
  s.addText(
    "Target 11.5 & 11.B:\n" +
    "Reduce direct disaster losses and strengthen integrated disaster risk management in cities.\n\n" +
    "Impact:\n" +
    "Shifts municipal drainage maintenance from reactive complaints to predictive flood prevention. Prioritizes ward cleaning before monsoon deluges strike.",
    {
      x: 0.8 + cardW + cardGap + 0.25,
      y: cardY + 0.95,
      w: cardW - 0.5,
      h: 2.6,
      fontSize: 12,
      color: "E2E8F0",
      lineSpacingMultiple: 1.25,
      margin: 0,
    }
  );

  // SDG 6
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8 + (cardW + cardGap) * 2,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: "0B2E38" },
    line: { color: "164E63", width: 1 },
  });
  s.addText("SECONDARY SDG", {
    x: 0.8 + (cardW + cardGap) * 2 + 0.25,
    y: cardY + 0.2,
    w: cardW - 0.5,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: "60A5FA",
    margin: 0,
  });
  s.addText("SDG 6: Clean Sanitation", {
    x: 0.8 + (cardW + cardGap) * 2 + 0.25,
    y: cardY + 0.45,
    w: cardW - 0.5,
    h: 0.35,
    fontSize: 16,
    bold: true,
    color: C_TEXT_LIGHT,
    margin: 0,
  });
  s.addText(
    "Target 6.3:\n" +
    "Improve water quality by eliminating dumping and minimizing release of pollutants.\n\n" +
    "Impact:\n" +
    "Preventing urban drain stagnation stops blackwater backflow into wells and ground contamination, curbing waterborne disease epidemics like cholera and leptospirosis.",
    {
      x: 0.8 + (cardW + cardGap) * 2 + 0.25,
      y: cardY + 0.95,
      w: cardW - 0.5,
      h: 2.6,
      fontSize: 12,
      color: "E2E8F0",
      lineSpacingMultiple: 1.25,
      margin: 0,
    }
  );

  // Closing summary banner
  s.addText("JalRakshak demonstrates how weak civic signals, fused with AI, create life-saving resilience for urban India.", {
    x: 0.8,
    y: 6.3,
    w: 11.73,
    h: 0.4,
    fontSize: 14,
    fontFace: FONT_HEAD,
    bold: true,
    color: "38BDF8",
    align: "center",
    valign: "middle",
  });
}

// Write the presentation file
const outputPath = path.resolve(__dirname, "JalRakshak_MVP.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Successfully generated: ${outputPath}`);
});
