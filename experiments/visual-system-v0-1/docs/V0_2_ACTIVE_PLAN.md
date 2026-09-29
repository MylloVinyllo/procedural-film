# Visual System v0.2 — active quality plan

Branch: `rd/visual-system-v0.2-quality`

Base: integrated `main` at `992ea795663ec046f95fa3535ed11a35028b0004`

## Objective

Move the visual-system experiment from architecture proof toward owner-approvable component quality without widening scope back into a full film.

## Work order

### P0. Character authored quality
- redesign hand silhouettes as authored reusable states rather than geometric approximations;
- refine protagonist proportions and shoulder/arm transitions;
- create clear HOLD / PLACE / PRESS key poses;
- eliminate mannequin-like neutral staging.

### P0. Product authored quality
- refine MV-RCM01 shape and material hierarchy from real machine evidence;
- improve working-head geometry, clamp, controls and silhouette;
- preserve named anchors and all existing geometry contracts.

### P0. Motion quality
- tune PLACE and PRESS at normal speed;
- preserve contact lock, record seating, release physics and non-crossing wrists;
- add weight/settle where it improves readability without violating product geometry.

### P1. Golden fixtures
- convert owner-approved component frames into explicit golden fixture references;
- record approval scope per fixture;
- add regression checks that protect geometry/contact invariants separately from aesthetic review.

## Non-goals

- no V5 film production yet;
- no promotion into `skills/procedural-film/foundation/`;
- no new narrative structure;
- no scene-local anatomy fallback.

## Exit criteria for v0.2

1. owner accepts the character fixture;
2. owner accepts the MV-RCM01 product fixture;
3. owner accepts the short PLACE / PRESS motion proof at normal speed;
4. technical and visual-contract gates remain green;
5. approved fixtures are recorded for promotion planning.
