# V4 Execution State — Machine-Cleaning Refinement

Branch: `film/second-life-record-machine-v4`
Project: `films/second-life-record-machine-v4`

## Workflow

Native Procedural Film, applied as a controlled evolution of the V3 technical-pass baseline:

Brief → Setup → Product reference / Research → Art Bible delta → Storyboard delta → Timeline → Stub/sequence validation → Scene implementation → Music/SFX update → Critic waves → Deliver → Human review

## Stage ledger

| Stage | Status | Durable evidence | Next |
|---|---|---|---|
| Brief | COMPLETE | `docs/V4_BRIEF.md` | Setup |
| Setup | COMPLETE | V3 accepted source copied; smoke + baseline native gate green | Product reference / Research |
| Product reference / Research | COMPLETE | Myllo manual + physical video + prior brand animation + V4 phase map | Art Bible delta |
| Art Bible delta | COMPLETE | Myllo product model + labels + G8 before/after + proof sheet + green fixture gate | Storyboard delta |
| Storyboard delta | COMPLETE | 36 s / 12 shots / five-beat cleaning block / self-review closed | Timeline |
| Timeline | COMPLETE | 36 s / 12-shot timeline + cue grid | Stub/sequence validation |
| Stub/sequence validation | COMPLETE | green gate + 12-shot sheet + 36 s half-scale stub preview | Scenes |
| Scenes | IN PROGRESS | product-first dense batch 05–09, then retained story scenes | scene sheets + batch gates |
| Music/SFX | PENDING | audio QA | after scenes |
| Critic waves | PENDING | whole-film sheet + fixes | after audio |
| Deliver | PENDING | preview/master | after critic |
| Human review | PENDING | viewer notes | after master |

## V3 baseline

V3 human-review closeout:
- `films/second-life-record-native-eval-v3/docs/V3_HUMAN_REVIEW_RESULT.md`
- V3 production source: `df552f1ded781799f40218d8fec390ab4368d2db`
- V3 final project branch checkpoint: `d7cf1444a831949da1c582d7b0e79d2c73f00912`

V4 begins from the accepted V3 source implementation so changes can be compared directly.

## Active transaction

**TX-V4-001 — Setup**

Expected:
- copy V3 production `src/` baseline;
- copy native `tools/`;
- copy V3 captured general vinyl-care research as background;
- install V4 brief / carry-forward / execution state;
- run smoke and native check on the copied baseline.

Exact next action after scaffold commit:
1. run `smoke`;
2. run native `check`;
3. if green, close Setup and open Product reference / Research;
4. then inspect Myllo Vinyllo manual and video references before changing the machine scenes.


### TX-V4-001 setup runtime checkpoint

Scaffold commit:
- `e4f34493101365ab19f970e173ce429c783f2508`

Smoke:
- job `bee4f33e-4030-4856-a5ab-778fb5fbfd97` — SUCCEEDED
- stdout: `ok [ true, 44100 ]`

Active baseline native check:
- job `919a1ec8-62c0-4c50-9bbd-7b3ba0fb92f4`
- input commit `e4f34493101365ab19f970e173ce429c783f2508`

Exact resume:
1. query `919a1ec8-62c0-4c50-9bbd-7b3ba0fb92f4`;
2. if green, mark Setup COMPLETE;
3. open Product reference / Research;
4. inspect Myllo Vinyllo manual/video before any machine-scene code is changed.


### TX-V4-001 result — Setup

Scaffold:
- commit `e4f34493101365ab19f970e173ce429c783f2508`

Smoke:
- job `bee4f33e-4030-4856-a5ab-778fb5fbfd97` — SUCCEEDED

Baseline native check:
- job `919a1ec8-62c0-4c50-9bbd-7b3ba0fb92f4` — SUCCEEDED / 6 PASS
- media PASS
- determinism PASS
- sources PASS
- timeline PASS
- draw PASS
- cost PASS
- max swept frame cost 136 ms
- result `OK in 32.2s`

Setup: COMPLETE.

## Active transaction

**TX-V4-002 — Product reference / Research**

Verified private source identities:
- Google Drive folder `Інструкція Myllo Vinyllo`
- `guide-08-01-25.pdf` — file ID `1V50Qejc3-kwn7n9drYRfKzgB8e2RiaBJ`
- Google Drive folder `Відео Myllo Vinyllo`
- `велика мийка.mov` — file ID `1BcTO1S3KROIQwj53f7kA5CPA2GpEO84u`
- `Ютуб + субтитры+ озвучка.mp4` — file ID `1VVJl6Jcd1pppND5dsHNBZkYNa7vyG1eR`

Mounted local references for this research transaction:
- `/mnt/data/guide-08-01-25.pdf`
- `/mnt/data/велика мийка.mov`
- `/mnt/data/Ютуб + субтитры+ озвучка.mp4`

Exact next action:
1. write source-derived machine geometry / control / cleaning sequence notes;
2. freeze a drawable 3/4 product model;
3. map V4 labels to real physical stages;
4. only then edit art bible / storyboard.


### TX-V4-002 result — Product reference / Research

Captured:
- `.tmp/research/05-myllo-manual-v4.md`
  - source: `guide-08-01-25.pdf`
  - product/process facts: START, PUMP, REVERSE, VACUUM; supply node; collection node; brush contact; vacuum removal; dimensions/specs
- `.tmp/research/06-myllo-physical-video-v4.md`
  - source: `велика мийка.mov`
  - physical black metal body; silver clamp; left brush/supply node; right vacuum node; white branded four-button front plate; elevated 3/4 product view
- `.tmp/research/07-myllo-animation-reference-v4.md`
  - source: `Ютуб + субтитры+ озвучка.mp4`
  - prior Myllo explanatory animation used only as brand/explanation precedent
- `.tmp/research/08-v4-product-phase-map.md`
  - semantic map from machine reveal → solution/brush → reverse → vacuum → before/after → repeat playback

Research commits:
- `995d9e5759717497ecb828fe981e7149da43c4ee`
- `fc41ffdd3d64131f0eced0ae0495f4ce10222809`
- `3fef9733326cf209fab4460644b7598b7e93ca6b`
- `c37139519817d83a061c6c805a6d755c737c1d2d`

Research closure:
- no machine geometry will be invented from memory;
- V4 is anchored to the actual Myllo Vinyllo legacy/large washer shown in the private reference;
- manual/video discrepancy risk is documented rather than silently merged.

## Active transaction

**TX-V4-003 — Art Bible delta**

Required:
1. preserve V3 comic character/turntable language unless explicitly overridden;
2. publish a drawable Myllo machine model from the captured physical reference;
3. define 3/4 cleaning camera geometry;
4. define exact front control plate/buttons and active-state highlights;
5. define solution/brush/vacuum material motion;
6. define dynamic top action-label system;
7. define matched groove BEFORE/AFTER macro;
8. mirror all new palette keys into `src/lib.js`;
9. run palette/fixture verification before Storyboard.


### TX-V4-003 result — Art Bible delta

Durable outputs:
- Myllo-specific product/process rules in `docs/art-bible.md`
- initial V4 art-bible commit `c32e6a55cb13cc246bf9ce075148f70a67800c7c`
- mirrored V4 palette in `src/lib.js`: `6c7fea9a6dee19e4a3f0f51e8241cc2e0d33ab2c`
- proof-driven refinement commit `d16b7f7958cbc996a131799d87908a68f0696446`

Native verification:
- fixture check job `92e35704-0885-4e1b-8c96-26c0008dbc8b` — SUCCEEDED / 6 PASS
- max fixture cost 80 ms

Isolated product proof:
- project `experiments/v4-myllo-machine-model`
- proof commit `777e282903719406591c314e66871f8e1818414e`
- six-frame snap job `811b28d8-d166-4b6a-bdfd-ed8f03685c43` — SUCCEEDED
- artifact `output/snap/myllo-machine-model-sheet.png`

Visual acceptance:
- black 3/4 body + top record/clamp + asymmetric working nodes + white four-button front plate reads as a dedicated machine at quarter scale;
- dynamic process band is readable;
- START / PUMP / REVERSE / VACUUM stages are visually separable;
- production refinements frozen: wider plate spacing, stronger brush-vs-vacuum silhouette contrast, thinner wet film, stronger wet-ahead/dry-behind vacuum proof.

Art Bible delta: COMPLETE.

## Active transaction

**TX-V4-004 — Storyboard delta**

Required:
1. retain the successful V3 discovery/problem/playback spine;
2. spend materially more screen time on the Myllo cleaning process;
3. use the canonical elevated 3/4 M1 machine view for product recognition;
4. stage START/PUMP, brush cleaning/REVERSE, and VACUUM as distinct physical beats;
5. include G8 matched groove BEFORE/AFTER proof;
6. integrate short dynamic labels in the top safe zone;
7. keep second playback as a deliberate before/after mirror;
8. run arithmetic, safe-area, semantic-readability, product-identity, and research-traceability self-review before Timeline.

Do not edit `src/timeline.js` until the V4 storyboard self-review is closed.


### TX-V4-004 result — Storyboard delta

Output:
- `docs/storyboard.md`
- commit `63ae6f45e93330e98e7973da7194002a704d2403`

Frozen structure:
- 36.000 s
- 864 frames
- 120 bpm
- 18 bars
- 12 shots × 3.000 s
- midpoint T 18.000

Frozen V4 verb spine:
**FIND → INSPECT → PLAY → HEAR → PLACE → APPLY → CLEAN → VACUUM → VERIFY → RETURN → PLAY AGAIN → ENJOY**

Cleaning block:
- 05 machine reveal / record placement
- 06 START + PUMP / solution
- 07 brush cleaning + REVERSE
- 08 VACUUM collection
- 09 matched groove BEFORE / AFTER

Self-review:
- arithmetic PASS
- product identity PASS
- physical causality PASS
- label semantics PASS
- before/after proof PASS
- playback mirror PASS
- safe area PASS
- research traceability PASS

Storyboard delta: COMPLETE.

## Active transaction

**TX-V4-005 — Timeline**

Exact next actions:
1. write `src/timeline.js` exactly from the frozen storyboard;
2. run native stubgen;
3. materialise 12 generated stubs into `src/scenes/`;
4. run native six-check;
5. render a lightweight whole-sequence stub/contact proof before dense V4 scene work.


### TX-V4-005 result — Timeline

Timeline output:
- `src/timeline.js`
- commit `16ecd49f987fa424be5b915e3be2c5c847340041`
- 12 shots / 36.000 s / 864 frames
- exact storyboard IDs, files, times and sound-cue grid

Native stubgen:
- job `ae41a43e-89e5-4704-b28f-4599fd49a981` — SUCCEEDED

Materialised clean stub tree:
- commit `51e8c881031f7ae5bd8e09bd898a9c1dcf8ced8a`
- 12 expected V4 scene files
- obsolete V3 filenames removed from the V4 working tree

Timeline: COMPLETE.

## Active transaction

**TX-V4-006 — Stub / sequence validation**

Native stub gate:
- job `8fe38cea-0753-495c-8718-9447689cff82` — SUCCEEDED / 6 PASS
- 12 shots cover 0..36 s with no gaps/overlaps
- determinism PASS
- draw PASS
- cost PASS
- max swept cost 39 ms
- result `OK in 17.6s`

Whole-sequence stub sheet:
- job `b97d9675-7fdc-4f4f-ba42-522cc1dd52fa` — SUCCEEDED
- samples land once per shot in correct 01→12 order
- artifact retrieval had a transient connector read error after the successful job; the runtime job itself does not need rerun.

Active half-scale stub preview:
- job `7e7ddf2b-2553-418d-8c10-36ce391b7729`
- input commit `51e8c881031f7ae5bd8e09bd898a9c1dcf8ced8a`

Exact resume:
1. query `7e7ddf2b-2553-418d-8c10-36ce391b7729`;
2. do not queue a second preview unless it explicitly fails;
3. on success close Stub/sequence validation;
4. open dense Scenes with product-first batch 05–09 before polishing retained story scenes.


### TX-V4-006 result — Stub / sequence validation

Half-scale stub preview:
- job `7e7ddf2b-2553-418d-8c10-36ce391b7729` — SUCCEEDED
- 864 frames / 36.000 s / 540×960
- audio 36.000 s, 48 kHz stereo, peak 0.391
- artifact `output/preview.mp4`
- size 9,288,868 bytes
- SHA-256 `84b77d0734c3e12cda6790c364aaded9490953d1512d60bbeb1767cd2f202c5f`

Sequence validation:
- shot order and duration are frozen before dense work;
- native stub gate is green;
- no dense scene work was started before the preview completed.

Stub / sequence validation: COMPLETE.

## Active transaction

**TX-V4-007 — Dense Scenes**

Implementation order is intentionally product-first:

**Batch A: 05–09**
- 05 reveal-myllo
- 06 pump-solution
- 07 brush-reverse
- 08 vacuum-collect
- 09 grooves-before-after

Why first:
- these are the semantic bottleneck identified by the V3 human review;
- they must prove machine identity / physical process before resources are spent repolishing the already-understandable discovery/playback scenes.

Batch acceptance:
- six-frame sheet for each scene;
- quarter-scale object/stage readability;
- button/action causality;
- wet-film physicality;
- before/after groove matching;
- batch native gate before moving to 01–04 / 10–12.
