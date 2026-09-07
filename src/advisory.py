"""JalRakshak advisory layer.

Two interchangeable implementations behind one interface:
  1. render_advisory()            — deterministic English template engine (offline demo, no API).
  2. render_malayalam_advisory()  — deterministic Malayalam template engine (local language).
  3. build_llm_prompt()           — documented prompt-based/LLM layer for production;
     emits exact prompt Claude-style assistant receives.

Advisories are plain-language, action-first, capped under 60 words, including
Kerala State Disaster Management Authority emergency helpline (KSDMA 1070).
"""

from __future__ import annotations

# Backward compatibility constant for existing imports
MALAYALAM_HIGH_SAMPLE = (
    "വാർഡ് 12-ൽ വെള്ളക്കെട്ട് ഉണ്ടാകാൻ സാധ്യത കൂടുതലാണ്. "
    "കനത്ത മഴയും തടഞ്ഞ ഡ്രെയിനും കാരണം താഴ്ന്ന പ്രദേശങ്ങളിലേക്കുള്ള യാത്ര ഒഴിവാക്കുക. "
    "അടിയന്തര നമ്പറുകൾ (KSDMA: 1070) തയ്യാറാക്കി വയ്ക്കുക."
)

MALAYALAM_TEMPLATES = {
    "High": (
        "{ward}-ൽ കനത്ത വെള്ളപ്പൊക്ക സാധ്യതയുണ്ട്. {drivers} "
        "താഴ്ന്ന പ്രദേശങ്ങളിലൂടെയുള്ള യാത്ര ഒഴിവാക്കുക. "
        "അടിയന്തര സഹായത്തിന് 1070 നമ്പറിൽ ബന്ധപ്പെടുക."
    ),
    "Medium": (
        "{ward}-ൽ ഇന്ന് ഇടത്തരം വെള്ളക്കെട്ട് സാധ്യതയുണ്ട്. {drivers} "
        "താഴ്ന്ന പ്രദേശങ്ങളിൽ വെള്ളം കയറാൻ സാധ്യത ഉള്ളതിനാൽ ജാഗ്രത പാലിക്കുക. "
        "വാഹനങ്ങൾ സുരക്ഷിത സ്ഥാനങ്ങളിലേക്ക് മാറ്റുക."
    ),
    "Low": (
        "{ward}-ൽ ഇന്ന് വെള്ളപ്പൊക്ക ഭീഷണി കുറവാണ്. "
        "സാധാരണ മുൻകരുതലുകൾ തുടരുക."
    ),
}

_ADVISORY_TEMPLATES = {
    "High": (
        "High flood risk in {ward}. {drivers} "
        "Avoid travel through low-lying areas{timing}. {preparedness}"
    ),
    "Medium": (
        "Medium flood risk in {ward} today. {drivers} "
        "Expect waterlogging in low-lying stretches; move vehicles and "
        "valuables to safety and avoid night travel through such roads."
    ),
    "Low": (
        "Low flood risk in {ward} today. Normal precautions advised."
    ),
}

_PREPAREDNESS = "Keep emergency numbers ready (KSDMA Helpline: 1070)."
_TIMING = " after 6 PM"


def render_advisory(result: dict) -> str:
    """Deterministic template advisory in English from score_ward() result."""
    ward = result["ward"]
    level = result["level"]

    if level == "Low" and result.get("infra_review"):
        n = result["inputs"]["complaints_7d"]
        return (
            f"Low rainfall risk, but {ward} has {n} unresolved drain complaints "
            f"— recommend municipal inspection regardless of rainfall."
        )

    text = _ADVISORY_TEMPLATES[level].format(
        ward=ward,
        drivers="; ".join(result["factors"]) + "." if result["factors"] else "",
        timing=_TIMING if level == "High" else "",
        preparedness=_PREPAREDNESS if level == "High" else "",
    )
    if result.get("low_lying") and level != "Low":
        text += " This ward is low-lying — be ready to shift to higher ground if water rises."
    return text


def render_malayalam_advisory(result: dict) -> str:
    """Deterministic template advisory in Malayalam from score_ward() result."""
    ward = result["ward"]
    level = result["level"]

    if level == "Low" and result.get("infra_review"):
        n = result["inputs"]["complaints_7d"]
        return (
            f"മഴ കുറവാണ്, എങ്കിലും {ward}-ൽ {n} അഴുക്കുചാൽ പരാതികൾ പരിഹരിക്കപ്പെടാതെ കിടക്കുന്നു "
            f"— അടിയന്തര നഗരസഭാ പരിശോധന ശുപാർശ ചെയ്യുന്നു."
        )

    drivers_ml = ""
    if result["factors"]:
        drivers_ml = "കനത്ത മഴയും അഴുക്കുചാൽ തടസ്സവും സാധ്യത വർദ്ധിപ്പിക്കുന്നു."

    return MALAYALAM_TEMPLATES[level].format(
        ward=ward,
        drivers=drivers_ml,
    )


def build_llm_prompt(result: dict, season_context: str = "Monsoon season") -> str:
    """Emit prompt-layer prompt for Claude-style LLM (documented design)."""
    ward = result["ward"]
    level = result["level"]
    factors = "\n".join(f"  - {f}" for f in result["factors"]) or "  - none"
    flag = (
        "\nNOTE: complaints exceed threshold with no rainfall signal — mention "
        "that municipal drainage inspection is recommended.\n"
        if result.get("infra_review")
        else ""
    )
    return f"""SYSTEM: You are the advisory writer for JalRakshak, a flood early-warning
assistant for urban wards in Kerala. Write for resident with no technical
background. Never invent places or facts not listed below. Include helpline 1070.

USER:
Ward: {ward} (low-lying: {'yes' if result['low_lying'] else 'no'})
Risk level: {level.upper()} (score {result['score']} of max 5)
Contributing factors:
{factors}
{flag}
Context: {season_context}; advisory sent as SMS and voice message.

TASK: In <= 60 words, write one advisory in simple English and one in Malayalam.
Include: (1) risk in everyday words, (2) ONE thing to avoid,
(3) ONE thing to keep ready. No technical terms, no scoring numbers, no panic.

OUTPUT FORMAT:
EN: <advisory>
ML: <advisory>"""
