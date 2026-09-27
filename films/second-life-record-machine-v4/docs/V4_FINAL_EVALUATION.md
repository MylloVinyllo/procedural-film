# V4 Final Evaluation — Machine-Cleaning Refinement

Date: 2026-09-27
Branch: `film/second-life-record-machine-v4`

## Purpose

V4 was a targeted refinement of the V3 technical-pass film.

The V3 human review established that the broad story was understandable, but the cleaning stage remained ambiguous. V4 therefore concentrated production effort on one question:

> Can the cleaning section read as a concrete Myllo Vinyllo machine process rather than as a generic or abstract transformation?

## Main production change

The cleaning block expanded into five explicit shots:

1. recognisable Myllo Vinyllo machine reveal / record placement;
2. solution / PUMP / supply-brush engagement;
3. brush cleaning + REVERSE;
4. VACUUM collection and drying;
5. matched groove BEFORE / AFTER proof.

The surrounding story beats that passed V3 human review were retained.

## Product grounding

V4 machine/process design was derived from the user's private Myllo Vinyllo reference materials:
- current instruction PDF;
- physical video of the large/legacy machine;
- prior Myllo explanatory animation.

The V4 model therefore includes:
- black metal body with visible depth;
- silver centre clamp;
- separate supply/brush and vacuum/collection nodes;
- white front control plate;
- START / PUMP / REVERSE / VACUUM control logic;
- blue lower-front indicator;
- elevated 3/4 product view.

## Semantic additions

Dynamic process labels now identify the cleaning phases:
- `ОЧИСТКА ПЛАСТИНКИ`
- `МОЮЩИЙ РАСТВОР`
- `ОЧИСТКА КАНАВОК`
- `REVERSE · ОБРАТНОЕ ВРАЩЕНИЕ`
- `ВАКУУМ`
- `ДО / ПОСЛЕ`

The labels reinforce physical actions; they do not replace them.

## Visual critic outcome

The cleaning scenes were six-frame reviewed individually.

Three transition failures were found during implementation:
- brush macro entering as transparent overlay;
- vacuum macro entering as transparent overlay;
- BEFORE/AFTER resolving through alpha double exposure.

All three were replaced by opaque comic/spatial transitions and re-verified.

Fresh whole-film evidence shows the sequence:
record problem → Myllo washer → solution/feed → brush/reverse → vacuum → before/after → return → clean playback.

## Technical result

Final post-audio native gate:
- job `49905fcf-f35a-400a-bea1-cf63e114a5fa`
- media PASS
- determinism PASS
- sources PASS
- timeline PASS
- draw PASS
- cost PASS
- max swept frame cost: 120 ms
- result: `OK in 27.3s`

Audio QA:
- job `e995b2c9-be0e-4529-ace8-895d16bcb0ff`
- peak 0.391 / -8.15 dBFS
- samples above 0.55: 0

## Delivered artifacts

Preview:
- job `0d1b81a8-fd10-48fa-8636-91f8e82a3d93`
- `output/preview.mp4`
- 540×960
- 36.000 s
- SHA-256 `0795afe2443abd5348e40c600583629351967227fdc58f026cf446ee57e8d880`

Master:
- job `a06c9abd-08d4-4e1b-8b31-cdb9dfd56d2a`
- `output/master.mp4`
- 1080×1920
- 864 frames / 36.000 s
- 129,815,183 bytes
- SHA-256 `3ea0ebbfa48691eb5e9c1862d389acf04fb87eeeb62019ad5e2ec06b96d7c709`

HTML player:
- intentionally not built/repaired.

## What is still unproven

The technical and visual-critic passes do not establish the final human semantic result.

Human review must now determine:
- whether the machine reads immediately as a record-cleaning machine;
- whether solution / brush / reverse / vacuum are understood as distinct steps;
- whether the vacuum actually reads as removing liquid/contamination;
- whether the before/after groove proof is visually convincing;
- whether the additional labels clarify rather than clutter;
- whether drawing quality, hands and hardware are now adequate;
- how much perceived craft gap remains to Butterfly.

V4 source should remain frozen until that review.
