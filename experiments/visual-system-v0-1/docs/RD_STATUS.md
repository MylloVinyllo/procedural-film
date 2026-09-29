# Visual System v0.1 — R&D status

Updated: 2026-09-28

## Repository status

This experiment is being integrated into the fork's `main` branch as a first-class, discoverable R&D track.

Canonical experiment path:
`experiments/visual-system-v0-1/`

Historical development branch:
`rd/visual-system-v0.1`

Active continuation branch:
`rd/visual-system-v0.2-quality`

Historical R&D head:
`0b5fda122544d9ffa24cecd7047ffd811a34af8c`

The historical branch is no longer the preferred continuation point after integration. New work should branch from integrated `main`.

V4 remains historical evidence. No V5 production is active.

## Implemented

- reusable registry for characters, products, props, hand states, poses, motions and semantic actions;
- pure-procedural and compiled-vector character backends behind the same scene-level contract;
- reusable vinyl record and MV-RCM01 washer components with named anchors;
- shared two-bone IK with hard reach clamping and action-controlled bend direction;
- semantic HOLD / PLACE / PRESS interactions;
- canonical hand states: edge grip, index press, palm rest and open/release;
- hand/object contact anchors as first-class interaction constraints;
- explicit per-arm front/back occlusion state;
- stateful record projection and washer draw layers;
- reusable motion grammar with anticipation, curved travel, seating, release and retract;
- product, character, interaction and motion fixtures;
- optional Gate 7 visual contracts;
- component files included in static source QA;
- authored vector source SVG plus deterministic runtime path payload.

## Reference evidence

The MV-RCM01 component is constrained by actual Myllo Vinyllo evidence:
- Google Drive `каталог 2025.pdf`;
- Google Drive `велика мийка.mov`.

See `docs/MYLLO_RCM01_REFERENCE_EVIDENCE.md`.

## Clean integration verification

Integration candidate:
`fd3783d8478fefc7b0bb1144caa3cc06ab6dcc89`

Runtime check job:
`6afe2526-6cbe-4450-be9b-68e46da3df37`

Result:
- 7/7 PASS;
- determinism PASS;
- media PASS;
- source scan PASS;
- timeline PASS;
- draw PASS;
- visual-contracts PASS;
- 5 shots / 32 s;
- max swept frame cost 42 ms.

## v0.2 current checkpoint — 2026-09-29

Active head before this status update:
`fe5c7e55ce95de0eb9915da690b6743fa40ec4ba`

What changed in the current quality slice:
- replaced the old blob-like edge/press hand construction with a reusable authored finger-rig geometry layer;
- added explicit left/right chirality support to hand contact transforms;
- added a dedicated `hand-fixture` for large-scale EDGE / PRESS / REST / OPEN review;
- kept semantic contact anchors and reach contracts as hard constraints while changing the drawing backend;
- refined MV-RCM01 working-head/material detail;
- added a normal-speed motion proof and contact-sheet evidence to CI;
- added CI concurrency so stale PR runs are cancelled;
- added an authored asset specification for hand/pose/interaction contracts;
- tested a more asymmetric pose language, then restored proven interaction staging where the reach gate rejected it.

Latest verified CI run:
- workflow run `36539324982`;
- **PASS**;
- 6 shots / 36 s;
- technical gate PASS;
- visual contracts PASS;
- contact sheets PASS;
- normal-speed motion proof PASS;
- review artifact uploaded.

Important lesson from this slice:
visual authorship may change aggressively, but semantic contact/reach geometry is not allowed to drift. If an aesthetic pose breaks reach, the pose must be redesigned rather than weakening the contract.

## Visual status

Architecture and reusable interaction mechanics are proven enough to keep developing.

The system is **not visually approved for production promotion yet**.

Remaining P0:
1. improve authored hand silhouettes and finger grouping;
2. refine protagonist proportions and pose language;
3. raise MV-RCM01 product fidelity;
4. judge PLACE and PRESS motion at normal speed;
5. create owner-approved golden fixtures.

## Promotion boundary

Do not promote experimental components into `skills/procedural-film/foundation/` until:
- owner approves static component fixtures;
- owner approves normal-speed interaction proof;
- visual contracts remain green;
- approved golden fixtures are recorded;
- promotion happens in a dedicated minimal PR.

## Continuation

The experiment is now on `main`. Active quality work continues on `rd/visual-system-v0.2-quality`, created directly from merged `main`. Do not continue stacking unrelated history onto the old `rd/visual-system-v0.1` branch.
