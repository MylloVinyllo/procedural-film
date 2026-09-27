# Visual System v0.1 — R&D status

Updated: 2026-09-27

## Current stage

Architecture proof is implemented and technically green. Human-quality approval is NOT granted and nothing is promoted into the canonical procedural-film foundation yet.

## Isolated workstream

- Branch: `rd/visual-system-v0.1`
- Lab: `experiments/visual-system-v0-1`
- Current runtime-tested candidate: `13447ed4d30d6b52e99b5afbe4f3b19bad53aef1`

V4 remains untouched as historical evidence. No V5 production is active.

## Implemented

### Reusable visual runtime
- component registry for characters, products, props and actions;
- shared 2-bone IK solver with explicit overreach diagnostics;
- Path2D bridge for compiled vector geometry;
- component files loaded independently from scene files.

### Reusable assets
- vinyl record with named anchors;
- Myllo washer with one stable coordinate system and named contact/control anchors;
- pure-procedural protagonist backend;
- compiled-vector protagonist backend.

### Interaction grammar
- hold;
- place-record;
- press-pump.

Scenes request semantic actions. They no longer author local hand/arm geometry.

### Occlusion contract
Canonical draw order for interaction shots:
body -> arms -> product -> manipulated object -> hands.

### Visual QA extension
A new optional Gate 7 runs reusable visual contracts.
Current contracts reject:
- impossible anatomical reach;
- hand/contact targets that miss the product anchor.

The first visual-contract run intentionally failed on 44 reach violations. After interaction staging was corrected the same gate passed.

## Latest verification

Runtime check job: `ec5e9efc-a1df-4734-9921-8e167172a00d`

PASS:
- media
- determinism
- timeline
- draw
- cost
- visual-contracts

WARN:
- component-local literal colours are not yet migrated into the canonical palette.

Latest A/B contact sheet:
- job `27330027-e1b7-4d23-9988-9e00fffbd38f`
- `output/snap/visual-system-ab-sheet.png`
- SHA-256 `a836f7a8352ed19c1a371d1454bf3b24986b0eb9b5a4a0de47d0b8b41499fe6c`

Latest 8 s motion preview:
- job `fd508c20-5c95-4510-b3f8-0249567f074f`
- `output/preview.mp4`
- 540x960, 192 frames, 8.000 s
- SHA-256 `7cd60cbfa96c8b0c65ef874f108cb4aaa3d75543af5d61ac6ff008fef442e27c`

## Visual assessment

The architecture proof removes the catastrophic stretched/detached-arm failure class seen in V4. It does NOT yet meet the final designer-grade visual target.

Remaining quality work:
1. authored hand silhouettes and finger grouping;
2. authored character proportions and pose language;
3. richer Myllo product geometry/material hierarchy;
4. palette centralisation;
5. motion polish after static asset approval.

## Authored-vector workstream

A Figma design file was created for the authored-vector source:
`Myllo Procedural Visual System v0.1`

File key: `aHMAvfnHoNBUKKV4GC6MHM`

The next Figma MCP read hit the Starter-plan MCP call limit, so asset export/verification cannot be claimed yet. Do not treat Figma-authored assets as accepted or imported until a successful read/export provides evidence.

## Promotion rule

Nothing in this lab moves to `skills/procedural-film/foundation` until:
1. authored character/product proof is visually reviewed;
2. interaction preview is approved by the owner;
3. all reusable QA contracts are green;
4. palette warning is resolved;
5. golden examples and regression fixtures are recorded.
