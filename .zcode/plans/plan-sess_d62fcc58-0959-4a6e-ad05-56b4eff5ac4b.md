# Plan: JalRakshak Standalone Web Interface for GitHub Pages

Build complete single-file web application `index.html` at repository root `/home/gourav/Downloads/test/JalRakshak/index.html`. Deployable to GitHub Pages with zero build step and zero hosting cost.

## 1. Core Architecture & Tech Stack
- **Single File (`index.html`)**: HTML5 + Tailwind CSS (via CDN) + vanilla ES6 JavaScript.
- **Zero Backend**: Logic runs 100% client-side in browser. Exact mirror of Python `src/risk_engine.py` and `src/advisory.py`.
- **GitHub Pages Ready**: Placing `index.html` at repository root allows 1-click deployment from GitHub repository settings (`Settings -> Pages -> Deploy from branch: main / root`).
- **Offline / Local Ready**: Can also be opened directly via `file:///.../index.html` or `python -m http.server`.

## 2. Interactive Features
1. **Interactive Risk Calculator**:
   - Ward selector dropdown (pre-loaded with Kochi demo wards + custom option).
   - Real-time interactive sliders:
     - 24-hr Rainfall (0–250 mm) with >50mm and >100mm threshold marks.
     - 7-Day Drain Complaints (0–20 reports) with >5 threshold mark.
     - River/Reservoir Level (0–100%) with >80% danger mark.
     - Low-lying area toggle checkbox.
   - Real-time instant recalculation on slider change (no submit button required).

2. **One-Click Spec Scenario Buttons**:
   - `Scenario A`: Loads Ward 12 (130mm, 7 complaints, 90% reservoir) ➜ High Risk (Score 4).
   - `Scenario B`: Loads Ward 5 (60mm, 2 complaints, 60% reservoir) ➜ Low Risk (Score 1).
   - `Scenario C`: Loads Ward 9 (40mm, 8 complaints, 70% reservoir) ➜ Low Risk + Municipal Inspection Flag.

3. **Live Output Card & Advisories**:
   - Visual Risk Gauge (Score 0 to 4) with point breakdown badges (`+2 Rain`, `+1 Complaints`, `+1 Reservoir`).
   - Risk classification pill: 🟢 Low Risk (0-1), 🟡 Medium Risk (2-3), 🔴 High Risk (4+).
   - Municipal Review Alert Banner when `complaints > 5 && rain_pts == 0` (Scenario C).
   - Actionable advisories in dual languages:
     - English citizen advisory.
     - Malayalam citizen advisory (clean script typography).
     - Official KSDMA Emergency Helpline 1070 chip.
     - One-click "Copy SMS Advisory" button.

4. **Kochi City Ward Monitoring Board**:
   - Real-time summary table of all 6 simulated wards (Ward 5, 7, 9, 10, 12, 15).
   - Clicking any ward loads its values directly into the simulator.

5. **AI Workflow & IBM BOB Architecture Callout**:
   - Visual 4-stage pipeline diagram (Signal Fusion ➜ Risk Engine ➜ Inspection Trigger ➜ Citizen Advisory).
   - Summary of IBM BOB architecture validation (temporal alignment, complaint normalization, LLM guardrails).

6. **GitHub Pages Deployment Helper**:
   - Built-in collapsible guide detailing the 3 steps to deploy live on GitHub Pages.

## 3. Verification & Testing
- Serve via Python stdlib `http.server` or inspect file syntax.
- Verify Scenarios A, B, and C calculate identical scores, flags, and advisories to `tests/test_risk_engine.py`.
- Update `README.md` with GitHub Pages deployment instructions.