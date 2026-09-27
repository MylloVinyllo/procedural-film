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
| Art Bible delta | IN PROGRESS | add Myllo product model, label system, groove before/after, cleaning camera grammar | palette + fixture verification |
| Storyboard delta | PENDING | `docs/storyboard.md` | after art bible |
| Timeline | PENDING | `src/timeline.js` | after storyboard |
| Stub/sequence validation | PENDING | runtime evidence | after timeline |
| Scenes | PENDING | scene sheets | after sequence validation |
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
