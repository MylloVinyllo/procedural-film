# V3 Execution State — Second Life of a Record

Branch: `film/second-life-record-native-eval-v3`
Project: `films/second-life-record-native-eval-v3`

## Native workflow

Brief → Setup → Reference analysis (required because V3 changes the house look) → Research → Art Bible → Storyboard → Timeline → Stub → Scenes → Music → Critic waves → Deliver

## Stream-safe transaction protocol

The native procedure is unchanged. Work is divided into resumable transactions.

For every transaction record:
- stage;
- input commit;
- output commit;
- runtime job ID(s), if any;
- evidence reviewed;
- acceptance result;
- exact next action.

If the ChatGPT stream times out:
1. do not rerun the previous step automatically;
2. read this file;
3. query the recorded active job ID;
4. continue from its result or the next action.

## Stage ledger

| Stage | Status | Durable evidence | Next |
|---|---|---|---|
| Brief | COMPLETE | `docs/V3_BRIEF.md` | Setup |
| Setup | COMPLETE | scaffold + smoke + fixture gate + fixture render | Reference analysis |
| Reference analysis | COMPLETE | `docs/reference-analysis.md` + Butterfly benchmark sheet | Research |
| Research | COMPLETE | `.tmp/research/00-phase-map.md` + four authoritative captures | Art Bible |
| Art Bible | COMPLETE | `docs/art-bible.md` + mirrored `src/lib.js` + palette sheet | Storyboard |
| Storyboard | COMPLETE | `docs/storyboard.md`, 30 s / 10 shots / self-review closed | Timeline |
| Timeline | COMPLETE | `src/timeline.js`, exact storyboard data / cues | Stub pass |
| Stub pass | COMPLETE | six-check + preview + 10-shot sheet | Scenes |
| Scenes | IN PROGRESS | isolated scene batches with six-frame review | continue batch B |
| Music | PENDING | `src/music.js` + audio QA | after scenes |
| Critic waves | PENDING | whole-film sheet + fresh corrections | after music |
| Deliver | PENDING | preview/master/shots list | after critic |

## User-approved priorities

- story comprehension over abstract visual cleverness;
- concrete recognisable drawing over symbolic approximation;
- animated-comic grammar;
- film quality over player work;
- detailed sequential production with durable handoff at each stage;
- continue from exact checkpoint after any stream failure.

## Active transaction

**TX-V3-001 — Setup**

Input branch point: `e257df8a3c56a75a3a36ca1a0cdd60ccddcdab38`

Scaffold commit: `e542ceaf7c46df44ef7094922ff528b825a5a6cd`

Evidence:
- smoke job `41f83a5c-206f-4ba1-b510-70ff70e9db03` — SUCCEEDED
- fixture check job `b185350f-4719-4c68-8af0-d4d74e1f6cb0` — SUCCEEDED / 6 PASS
- fixture render job `df7d7d17-701a-424b-95b0-8bf96b02d730` — SUCCEEDED
- fixture artifact: `output/fixtures.mp4`, 8.000 s, 2,455,192 bytes
- fixture SHA-256: `731b7cd2171fde133b9439cffd84626eab53597a8efb024ba3626eef01ac6220`

Setup acceptance: COMPLETE.

**TX-V3-002 — Reference analysis**

Inputs:
- user-required animated-comic direction;
- native reference-analysis requirement because the look changes;
- official `Spider-Man: Into the Spider-Verse` trailer / Sony production descriptions as a comic-animation vocabulary reference, not a style-copy target;
- repository Butterfly example as the procedural density / authored-finish benchmark.

Evidence already generated:
- Butterfly 24-sample benchmark sheet job `d346d922-3c6e-4676-8313-a95553c9b05b` — SUCCEEDED.

Exact next action:
1. write `docs/reference-analysis.md` with numbered V3 carry-over rules;
2. mark Reference analysis COMPLETE;
3. start TX-V3-003 Research.

Do not start the art bible until the reference rules are frozen.


## TX-V3-002 result — Reference analysis

Output commit: `f39468546d4685b6845ef8add939aa6f1a2bba68`

Accepted style rules:
- stable character and prop models;
- comic panel grammar;
- print / halftone / sharp-shadow surface treatment;
- literal actions before abstract effects;
- mirrored dirty vs clean playback;
- mixed motion cadence;
- Butterfly-level authored density as finish benchmark;
- quarter-scale narrative readability;
- unaided human comprehension as final criterion.

Status: COMPLETE.

## Active transaction

**TX-V3-003 — Research**

Open questions:
1. How should grooved records be handled so the protagonist's hand contact is truthful?
2. What visible contamination / playback-maintenance relationship can the film safely imply?
3. What concrete wet/vacuum cleaning sequence is legitimate to depict?
4. What physical turntable / tonearm playback actions must be recognisable?

Planned source classes:
- Library of Congress preservation guidance;
- Library of Congress recorded-sound cleaning workflow;
- cartridge / stylus manufacturer care guidance;
- turntable / record-cleaning-machine operating manuals.

Exact next action:
- capture 2–4 authoritative sources into `.tmp/research/`, one fact set per file;
- then build the research phase map and close TX-V3-003.


## TX-V3-003 result — Research

Captured sources:
- `.tmp/research/01-loc-handling.md` — Library of Congress grooved-disc handling
- `.tmp/research/02-loc-cleaning.md` — Library of Congress cleaning workflow
- `.tmp/research/03-ortofon-care.md` — Ortofon record/stylus care
- `.tmp/research/04-project-technics-operation.md` — Pro-Ject wet/vacuum cleaning + Technics playback mechanics
- `.tmp/research/00-phase-map.md` — every narrative phase mapped to source support or explicit narrative invention

Research commits:
- `5f7c59cf6dbe4fb1c18f6a2cd0827bd2ccb52ad6`
- `f688c0dc850e8442cd391aca9a56ea23a3abcb29`
- `f4b336e2951122bcac5e58e8ef707906c2d6cc36`
- `22e039293eb644b1948b98f0d1ed0c51a689440e`
- phase map `291b5a9c8106e38e21f8eecbaf95fa012e2663e0`

Status: COMPLETE.

## Active transaction

**TX-V3-004 — Art Bible**

Inputs:
- frozen reference rules in `docs/reference-analysis.md`;
- research captures under `.tmp/research/`;
- V3 brief and carry-forward constraints.

Required outputs:
1. rewrite art-bible sections 1–9 for animated-comic grammar;
2. publish complete V3 palette in section 2 and mirror every changed/new value into `src/lib.js`;
3. write section 10 as drawable character/prop/action reference;
4. include explicit “Mistakes to avoid” pairs;
5. verify palette/toolchain before Storyboard.

Exact next action:
- write the full art bible and mirrored `src/lib.js` palette on this branch.


## TX-V3-004 result — Art Bible

Durable outputs:
- full animated-comic art bible: `docs/art-bible.md`
- art-bible main commit: `c0a813a7199ec18b7a3d1bf75ab52515852577ec`
- comic border/gutter palette completion: `238328fab52a0d3cb8d30fb98404ce4effbb829c`
- mirrored palette in `src/lib.js`: `b74a19edc6155ee5a3d0ae8afad4efdaf19edefc`

Native verification:
- fixture six-check on V3 palette head: job `38419297-e85f-417e-9557-41ec29240083` — SUCCEEDED / 6 PASS
- fixture render: job `37526d09-a9a6-4b7c-ae35-7142bb5cdc90` — SUCCEEDED
- isolated native palette-review project commit: `1e1d1e8002ef107dc1222c535143d562cdee323a`
- 5-sample palette sheet: job `7f53d2c7-071e-4a09-9dbd-316efc8b8d5e` — SUCCEEDED
- sheet: `output/snap/palette-sheet.png`

Visual palette review:
- all four palette pages were represented in the five samples;
- warm paper/room colours separate cleanly from the cool technical plate;
- rust protagonist, amber label/sleeve, teal cleaning, magenta/cyan problem and gold/teal clean-state accents are distinguishable;
- dark physical prop colours are intentionally not used as technical-panel fills; `schemVinyl`, `schemClean`, `schemNoise` carry technical insets.

Status: COMPLETE.

## Active transaction

**TX-V3-005 — Storyboard**

Inputs:
- `docs/V3_BRIEF.md`
- `docs/reference-analysis.md`
- `docs/art-bible.md`
- research phase map
- native `reference/shot-types.md`

Required output:
- 30 s / 10-shot storyboard;
- beat/bar arithmetic;
- acts;
- one dominant verb per shot;
- shared geometry for record / playback mirror / hand continuity / panel boundaries;
- eight native subsections per shot;
- timestamped sound cues;
- self-review for safe area, story readability and arithmetic.

Do not write Timeline until the storyboard self-review is closed.


## TX-V3-005 result — Storyboard

Output:
- `docs/storyboard.md`
- commit `859eb760d56024001c5012a144fd9d4bc17b6a3d`

Frozen numbers:
- 120 bpm;
- 30.000 s;
- 720 frames;
- 15 bars;
- 10 shots;
- each shot 3.000 s / 72 frames;
- midpoint T 15.000 starts active cleaning.

Frozen narrative spine:
FIND → INSPECT → PLAY → HEAR → DECIDE → CLEAN → VACUUM → RETURN → PLAY AGAIN → ENJOY.

Shared geometry frozen:
- G1 record circle;
- G2 playback turntable;
- G3 stylus macro;
- G4 reaction panel;
- G5 cleaning platter;
- G6 safe hand grip;
- G7 listening-room anchors.

Self-review:
- beat arithmetic closed;
- safe-area arithmetic checked;
- research phases mapped;
- mirrored dirty/clean playback geometry explicit;
- anti-ambiguity still-frame nouns/verbs defined.

Status: COMPLETE.

## Active transaction

**TX-V3-006 — Timeline**

Exact next action:
1. write `src/timeline.js` exactly from the storyboard;
2. run native stubgen;
3. materialise the generated stubs;
4. run full native gate and half-scale stub preview before scene investment.


## TX-V3-006 result — Timeline

Output:
- `src/timeline.js`
- commit `71d05968987f93c5d2e6236015bc38ff77cfa382`

Timeline:
- 10 shots;
- 30.000 s;
- 720 frames;
- no gaps/overlaps by construction;
- flat sound-cue list collected from storyboard.

Native stubgen:
- job `13c22115-5fab-41d0-97f7-1887ea930cda` — SUCCEEDED
- generated all ten expected scene stubs.

Materialised stubs:
- commit `ae37f26f9dc86490d082416dec973f6acecc452f`
- 10 scene files under `src/scenes/`.

Status: Timeline COMPLETE.

## Active transaction

**TX-V3-007 — Stub pass**

Input commit: `ae37f26f9dc86490d082416dec973f6acecc452f`

Exact next actions:
1. run native six-check on the complete stub film;
2. if green, render 0.5-scale 30 s stub preview;
3. inspect sequence/order;
4. record gate + preview job IDs;
5. only then start dense Scenes.

If the stream breaks during either job, resume the exact job ID written here rather than requeueing.


### TX-V3-007 runtime checkpoint

- stub-film native check: `b037a994-4258-4710-8d8c-1a89b7768cf3` — SUCCEEDED / 6 PASS
- check result: 10 shots, 30.000 s, determinism PASS, timeline PASS, draw PASS, max swept cost 42 ms
- active half-scale stub preview: `416a9de5-a522-48e6-a6bb-e008d75cef2d`
- preview input commit: `17b027eae746aa4c47b430f7b679984f9abdcde0`

Exact resume instruction:
- first query `416a9de5-a522-48e6-a6bb-e008d75cef2d`;
- do not start a second preview unless this job explicitly fails;
- after success, snap the stub film as a whole for sequence verification and then close Stub pass.


## TX-V3-007 result — Stub pass

Native gate:
- job `b037a994-4258-4710-8d8c-1a89b7768cf3` — SUCCEEDED / 6 PASS
- max swept frame cost 42 ms
- determinism / media / sources / timeline / draw / cost all PASS

Half-scale stub preview:
- job `416a9de5-a522-48e6-a6bb-e008d75cef2d` — SUCCEEDED
- 30.000 s / 720 frames / 540×960
- artifact `output/preview.mp4`
- SHA-256 `08e43c7c1e7c1ee0363b5d3275ebf4f67a766aa0cfb35d759856eea4e302665e`

Whole-film stub sheet:
- job `1e93b601-a27e-4d08-acd5-e680d001322c` — SUCCEEDED
- 10 samples, one per shot in story order
- order/timing verified against storyboard

Status: COMPLETE.

## Scene implementation protocol

V3 scenes are implemented as isolated ownership passes.
After each small batch:
1. six-frame snap each scene;
2. visually inspect all six frames at quarter scale;
3. fix P1/P2 readability issues immediately;
4. record accepted scene IDs / job IDs here;
5. only then advance.

### Batch A — scenes 01–02

Source commits:
- 01 `find-record`: `88a1986dc85126589dfef6f0e0d422dc23db36da`
- 02 `inspect-dust`: `48e3a1ed424147a0b28177161d781c967a633fef`

Six-frame evidence:
- 01 job `927f4cd1-4ebd-42b2-978b-5aa08f8001ed` — SUCCEEDED
- 02 job `995c2e84-4498-4c91-bc61-bcd90cd61f08` — SUCCEEDED

Visual acceptance:
- 01 clearly reads as a person removing/holding a vinyl record from a sleeve in a listening room;
- 02 clearly reads as the same person inspecting a visibly dusty record under a lamp, with a concrete groove/dust macro inset;
- protagonist clothing/hair/face language is consistent;
- vinyl is recognisable from label, spindle mark, grooves and reflections;
- story no longer depends on abstract marker interpretation.

Batch A: ACCEPTED.

## Active transaction

**TX-V3-008 — Scene batch B: 03 first-play + 04 hear-crackle**

Required:
- exact G2 playback rig;
- exact G3 stylus macro;
- G4 reaction panel;
- physical playback before noise effects;
- controlled badMagenta/badCyan distortion only after contact;
- six-frame sheets for both before advancing.


### TX-V3-008 result — Scene batch B (03–04)

Implementation commits:
- 03 `first-play`: `7a6d2393e3dfb33464dbdd2b523436e89b2871ae`
- 04 `hear-crackle`: `09a36f3ba5a53cdd444ea1b5d6296989cae0de9d`

Fresh six-frame evidence after stream recovery:
- 03 job `74c85f8f-2d0d-4d1f-868a-d2fd5dc7a86b` — SUCCEEDED
- 04 job `1f9e3ce2-41c8-441f-8d0b-7e7fbe49fb52` — SUCCEEDED

Fresh full native gate:
- job `f32e0c60-ad7f-4dea-967f-94febf528c94` — SUCCEEDED / 6 PASS
- 10 shots / 30.000 s / determinism PASS
- max swept frame cost 134 ms (under gate threshold)
- draw/media/sources/timeline all PASS

Visual re-check:
- 03 reads immediately as a real turntable + record + moving tonearm sequence; late macro inset clearly shows stylus approach/contact.
- 04 reads as physical playback plus a human reaction, not as abstract signal graphics; speaker, stylus macro and the KRRK event remain spatially legible.
- badMagenta/badCyan is limited to the problem beats and does not contaminate the rest of the frame.
- P1 issue found: none.
- P2 note for later critic wave: the reaction facial change is intentionally restrained and may benefit from a stronger shoulder/eyebrow delta if whole-film readability drops at quarter scale.

Batch B: ACCEPTED.

## Active transaction

**TX-V3-009 — Scene batch C: 05 decide-clean + 06 wet-brush**

Required:
- same record identity carried safely from playback into cleaning;
- cleaning machine must look mechanically distinct from the turntable;
- exact G1/G5 record geometry at the handoff;
- fluid must physically contact the record before brush action;
- brush fibres must visibly contact grooves;
- no magical glow-cleaning shortcut;
- six-frame sheets for both scenes and fresh gate before advancing.


### TX-V3-009 result — Scene batch C (05–06)

Implementation:
- 05 `decide-clean`: `d758848e9621323dce60cc874e1d0f66e4bc5a73`
- 05 handling correction: `331e717baf11719f6ee9fa46b27cfa5177a5960e`
- 06 `wet-brush`: `923bc93378f9bd89b85fafdffb429732bdd4bafc`

Fresh six-frame evidence:
- 05 job `eee03601-7f6f-48fb-b162-0971061a3485` — SUCCEEDED
- 06 job `10b94f96-32da-4b5b-9555-44a8c3c79dbb` — SUCCEEDED

Visual acceptance:
- 05 clearly reads as the same protagonist lifting the same record and transferring it from the listening setup to a mechanically distinct cleaning setup.
- safe edge handling was corrected before acceptance; hands now hook the rim rather than lying across the groove field.
- 06 clearly reads as wet record cleaning: visible liquid, rotating record, contacting brush, hand/tool relationship, SHFF accent, and groove/fibre macro.
- cleaning is physical and sequential; there is no glow-wipe or abstract “cleaning beam”.
- P1 issue found: none after grip correction.

Fresh native gate:
- job `46d27a7f-5dbc-4d6d-ba77-97ab4d662701` — SUCCEEDED / 6 PASS
- max swept frame cost: 124 ms
- determinism / media / sources / timeline / draw / cost all PASS

Batch C: ACCEPTED.

## Active transaction

**TX-V3-010 — Scene batch D: 07 vacuum-dry + 08 return-record**

Required:
- physical vacuum wand/contact slot over the same G5 record;
- wet film must visibly converge into the vacuum contact;
- dry groove state must emerge behind the contact line;
- vacuum action must not resemble a beam or magic erasure;
- scene 08 must carry the same dry record back with a safe G6 grip;
- the return must resolve into exact G2 playback geometry for the mirrored second-play shot;
- six-frame sheets for both scenes and a fresh gate before advancing.
