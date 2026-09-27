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
| Product reference / Research | IN PROGRESS | Drive manual + product videos located and mounted | freeze product geometry/process map |
| Art Bible delta | PENDING | `docs/art-bible.md` | after product reference |
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
