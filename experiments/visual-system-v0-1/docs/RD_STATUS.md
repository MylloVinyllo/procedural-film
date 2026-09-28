# Visual System v0.1 — R&D status

Updated: 2026-09-27

## Current state

Active branch: `rd/visual-system-v0.1`

Current candidate:
`0e9feb6b17f74d9cdf61a3435dac9c77f17bcdca`

V4 remains untouched. No V5 production is active.

## Implemented

- reusable registry for characters, products, props and semantic actions;
- two character backends behind one action contract: pure procedural and compiled vector;
- reusable vinyl record and Myllo washer components with named anchors;
- shared two-bone IK with hard reach clamping;
- explicit body -> arms -> product -> record -> hands occlusion order;
- semantic HOLD / PLACE / PRESS proof;
- separate single-backend quality-proof shot;
- optional Gate 7 for visual contracts;
- component files included in static source QA;
- canonical palette use across reusable components and lab scenes;
- authored vector source SVG plus deterministic runtime path payload.

## Verification

Latest check:
- job `d4a16746-caac-4698-98b2-9e437196e0a0`
- 7/7 PASS
- max swept frame cost: 21 ms
- determinism PASS
- visual-contracts PASS

Latest quality-proof sheet:
- job `8209a1f0-f520-4971-a289-020482373957`
- SHA-256 `04bfe776239ef01f98b6c3470228e55081844fb2e2fc2f8d0b6b5bdfdbd73f4b`

Latest preview:
- job `1c2bd06a-4611-4468-bdff-ed579cdfa3ed`
- 14 s, 336 frames, 540x960
- SHA-256 `f004631a5137ce3a2086f6ccba72964253d1191879aad4ae4a6f8aac1c2bb82d`

## Active queue

P0 — authored visual quality
1. Improve hand library beyond edge-grip/index-press prototype.
2. Refine protagonist proportions and pose language.
3. Build higher-fidelity Myllo geometry from product references.
4. Make the same assets survive close framing, not only medium framing.

P1 — reusable quality system
1. Add product-geometry anchor invariants.
2. Add golden-frame manifests for approved component poses.
3. Add component-level visual fixtures independent of narrative scenes.
4. Keep human approval above technical PASS.

P2 — integration
Only after P0/P1 acceptance:
- promote approved components into procedural-film foundation;
- replace ad-hoc V4-style character/product drawing in future films;
- build a new production film from the approved primitives rather than patch V4.

## Figma

A separate Figma source file exists:
`Myllo Procedural Visual System v0.1`

File key: `aHMAvfnHoNBUKKV4GC6MHM`

The current Figma Starter MCP read quota is exhausted, so no unverified Figma export is treated as canonical evidence. Repo-authored vector source remains the active source until Figma round-trip verification is available.
