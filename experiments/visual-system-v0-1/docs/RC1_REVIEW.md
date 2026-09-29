# Visual System v0.2 — RC1 review freeze

Frozen source commit: `63c633f7516b91ace31111fdb830d225a7059f09`
GitHub Actions run: `36580683100` / run #52
Workflow conclusion: **success**
Source artifact: `visual-system-review-evidence`
Artifact id: `11038978693`
Artifact digest: `sha256:a5b3de5343b57dad12862397d6c0165ee866f4c8f70895b50fa9a00ef14a9cf1`

RC1 is a visual-review freeze, not a production approval.

## Review set

1. Character fixture — HOLD / PLACE / PRESS.
2. Hand fixture — EDGE / PRESS / REST / OPEN.
3. Product fixture — current MV-RCM01 component.
4. Motion fixture — PLACE / PRESS temporal contact sheet.
5. Editorial fixture — assembled editorial proof.
6. Normal-speed motion proof — 8 seconds.
7. Editorial proof — 8 seconds.

## Preliminary visual QA

Structurally working:
- washer reads as a dedicated record-cleaning machine;
- HOLD → PLACE → PRESS are reusable semantic states;
- record placement is legible;
- contact, seating, release and reach remain protected by contracts;
- all evidence comes from one deterministic system.

Remaining defects for exactly one bounded correction pass:
1. hand anatomy remains schematic at close scale;
2. PRESS shoulder / elbow flow remains mechanical;
3. character finish is not yet approved as a reusable house asset;
4. editorial grounding / shadows can still make the product feel slightly floated;
5. MV-RCM01 remains stylized rather than a precision product illustration.

## Exit rule

Do not open another architecture loop.

Allowed continuation: one bounded correction pass → freeze RC2 → owner review → golden fixtures if approved → finish PR #3 → merge v0.2 → return to V5 production.


## Owner review outcome — REJECTED

RC1 was reviewed by the owner on 2026-09-29 and rejected as a visual direction.

Reason: the output is still visibly schematic and amateurish at the level that matters most: character anatomy, hand construction, pose mechanics, and the integrated editorial frame. The washer component is more recognizable, but that does not rescue the overall result.

This rejection invalidates the planned "one bounded correction pass" route. Do not polish RC1 into RC2.

Preserve the reusable technical lessons only:
- semantic interaction states;
- contact / reach / seating contracts;
- motion grammar;
- component registry;
- product anchoring;
- deterministic rendering and CI evidence.

Do not preserve the current character drawing language or hand construction as a target visual system.

Next direction: replace procedural anatomy authoring with authored visual assets / compiled vector geometry, and use procedural-film primarily for rigging, timing, transforms, contact, occlusion and deterministic rendering.
