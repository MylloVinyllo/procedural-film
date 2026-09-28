# Visual Review 002 — Visual System v0.1

Date: 2026-09-27
Candidate: `0e9feb6b17f74d9cdf61a3435dac9c77f17bcdca`
Lab: `experiments/visual-system-v0-1`

## Evidence

Static quality-proof contact sheet:
- job: `8209a1f0-f520-4971-a289-020482373957`
- artifact: `output/snap/quality-proof-sheet.png`
- SHA-256: `04bfe776239ef01f98b6c3470228e55081844fb2e2fc2f8d0b6b5bdfdbd73f4b`

Full lab preview render:
- job: `1c2bd06a-4611-4468-bdff-ed579cdfa3ed`
- artifact: `output/preview.mp4`
- 540x960
- 336 frames
- 14.000 s
- SHA-256: `f004631a5137ce3a2086f6ccba72964253d1191879aad4ae4a6f8aac1c2bb82d`

Technical verification:
- check job: `d4a16746-caac-4698-98b2-9e437196e0a0`
- all seven gates PASS.

## What materially improved

1. Hand silhouettes are smaller and no longer read as oversized detached paddles.
2. Shoulder/elbow joint caps visually join the limbs to the torso.
3. Passive hand during the PRESS action is anchored to the record rather than floating beside the product.
4. Myllo now has a stronger cabinet silhouette, top/front/side plane hierarchy, feet, vents, working-head pivots and labelled controls.
5. Component colours now use the canonical palette; the previous source-colour warning is gone.
6. The quality-proof shot isolates the reusable vector backend from the A/B diagnostic composition.

## Current visual verdict

This is a valid component-system proof, not a production-quality character system yet.

The remaining gap is now mostly authored design quality rather than structural mechanics.

### Still weak
- hand/finger design remains simplified;
- character pose language is neutral and slightly mannequin-like;
- product is recognisable as a record-cleaning machine but is still an illustrative abstraction rather than a high-fidelity Myllo asset;
- HOLD composition intentionally separates actor/product and is diagnostic rather than cinematic;
- normal-speed motion aesthetics still require owner review even though temporal generation is technically valid.

## Promotion status

DO NOT promote to the canonical procedural-film foundation yet.

Promotion gate remains:
- authored-vector source accepted;
- owner approves the short interaction proof;
- visual assets have stable golden examples;
- regression fixtures cover reach/contact/geometry invariants.
