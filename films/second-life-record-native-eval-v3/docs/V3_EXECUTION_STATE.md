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
| Scenes | COMPLETE | 10 production scenes + batch sheets + full gate | Music |
| Music | COMPLETE | cue-matched score + tuned headroom + audio QA | Critic waves |
| Critic waves | IN PROGRESS | 24-sample whole-film sheet + preview + P1/P2 fixes | final gate |
| Deliver | COMPLETE | preview + 1080×1920 master; HTML player intentionally skipped | human viewing |

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


### TX-V3-010 result — Scene batch D (07–08)

Implementation:
- 07 `vacuum-dry`: `ad6d526e1eeb3b5408238336fa52cd32cc0da858`
- 08 `return-record`: `2b067a92109638c87cc4031b8a3c8f884a08c1d8`

Six-frame evidence:
- 07 job `ddafd2fb-90ce-4d23-8df8-ae3e5f39dcbd` — SUCCEEDED
- 08 job `9a819709-974e-4968-88ba-2e949023d37d` — SUCCEEDED

Visual acceptance:
- 07 reads as a physical vacuum wand connected to a pivot and contact slot over the same rotating record; wet film/suction marks stay tied to the slot, and the scene does not resemble a beam.
- 07 dry-state proof is visible through stronger stable groove reflections behind the vacuum action; the diagonal comparison divider is secondary and does not replace the physical action.
- 08 clearly reads as the cleaned record being safely carried back into the listening room and settling onto the turntable.
- 08 ends on exact G2/G1 playback geometry with hands withdrawn, preparing the mirrored second-play scene.
- P1 issue found: none.

Fresh native gate:
- job `d8085e5d-037a-4e76-a5bc-9a22a5b1b5f4` — SUCCEEDED / 6 PASS
- max swept frame cost: 143 ms
- determinism / media / sources / timeline / draw / cost all PASS

Batch D: ACCEPTED.

## Active transaction

**TX-V3-011 — Scene batch E: 09 second-play + 10 enjoy-music**

Required:
- 09 must deliberately mirror scene 03 G2/G3 geometry and motion timing;
- cleaned record must retain the same identity/label mark while visible contamination is reduced;
- 09 must replace problem distortion with stable cleanGold/cleanTeal music language only after stylus contact;
- 10 must open as a deliberate visual mirror of scene 04 using G3/G4;
- reaction must visibly change from concern to relief without explanatory text;
- final 1.5 s must open into the warm full listening room with the turning record still visible;
- six-frame sheets and a fresh full gate before Scenes can close.


### TX-V3-011 result — Scene batch E (09–10)

Implementation:
- 09 `second-play`: `4012c23253f0a286cb43b7e4833281d89e4db556`
- 10 `enjoy-music`: `873c865e9de7c13b7fbc87856d5361bda48a6f08`
- 10 seated-relief correction: `6e50e8742d38ad59cc659803c97cdb2f4b1fbb86`

Six-frame evidence:
- 09 job `eff83b33-a851-4f4f-bcd9-be2ad7778c0b` — SUCCEEDED
- 10 initial job `4334ac06-b5e3-45eb-b643-afccc83f1677` — SUCCEEDED
- 10 corrected job `144132bc-e0db-4ab3-9f57-383f5cdf2c57` — SUCCEEDED

Visual acceptance:
- 09 mirrors scene 03 turntable / tonearm / macro timing and G2/G3 geometry while visibly reducing contamination and removing problem distortion.
- cleanGold/cleanTeal graphics appear only after physical stylus contact.
- 10 opens as the scene-04 reaction/source mirror and then expands into the full warm listening room.
- final pose was corrected so the protagonist is unmistakably seated, eyes softened/closed, hands resting and legs grounded; the final verb now reads as ENJOY rather than merely “stand near equipment”.
- P1 issue found in first 10 pass: final seated state ambiguous.
- P1 fix: VERIFIED on fresh six-frame sheet.

Fresh native scene-complete gate:
- job `c7cf3439-c633-4f2d-a480-a337cab62555` — SUCCEEDED / 6 PASS
- max swept frame cost: 111 ms
- determinism / media / sources / timeline / draw / cost all PASS

Scenes stage: COMPLETE.

## Active transaction

**TX-V3-012 — Music**

Required:
- replace foundation demo score, not merely layer extra SFX over it;
- implement the storyboard cue list against the existing native audio engine;
- first half remains sparse and observational;
- dirty playback T 9–12 must use physical click/crackle/interruption rather than cinematic “danger” music;
- T 15 cleaning hinge introduces a clearer teal/clean tonal identity;
- vacuum / brush / handling cues remain tied to physical actions;
- T 24–27 mirrors the first playback sound mechanics without crackle;
- T 27–30 opens into a stable warm motif without overpowering comprehension;
- run native audio QA and then the full gate before Critic waves.


### TX-V3-012 result — Music

Composition:
- V3 score / sound design commit: `f0e0934af2aa736454491cf952e64ed606ef5622`
- master trim tuning: `e316fb8c491bd6e9a10572f9804e8f3422995c66`

Audio QA:
- initial job `88a0b1c0-d255-4343-86a3-1d844578934b` — SUCCEEDED, peak -12.58 dBFS
- tuned job `cc0b00c1-e2b7-42f6-8a09-a3795279d9d1` — SUCCEEDED
- tuned pre-limiter peak: 0.391 / -8.15 dBFS
- samples above 0.55: 0
- score artifact SHA-256: `a21f755827b16f1ef1bdfcedff080d9075acfd549d09350d93251cf6a49fe01c`

Post-music native gate:
- job `c16d00c9-3cfa-4837-ba76-4e6a7c209fdb` — OK
- media / determinism / sources / timeline / draw PASS
- cost emitted a non-failing WARN at 161 ms on one inspect-dust sweep frame; previous scene-complete gate was 111 ms.
- action for Critic stage: recheck cost at final head; optimise inspect-dust only if the >150 ms result persists.

Music stage: COMPLETE.

## Active transaction

**TX-V3-013 — Critic waves**

Required:
1. render 24-sample whole-film sheet at 0.25 scale;
2. judge whether the ten-verb spine reads without storyboard text;
3. compare both sides of mirrored playback (03/09 and 04/10);
4. inspect scene density, character/prop identity and transitions;
5. produce P1/P2 fix list from fresh evidence only;
6. apply and re-snap every P1/P2;
7. run final native gate and resolve any persistent cost warning before Deliver.


### TX-V3-013 critic wave 1 — transition evidence and fixes

Initial whole-film sheet:
- job `03888ccb-0df7-4095-947b-419e41291935` — SUCCEEDED
- exposed two quarter-scale readability failures at transition midpoints:
  - scene 05 used a long alpha dissolve between listening room and cleaning station;
  - scene 10 used a long alpha dissolve between clean reaction layout and final listening room.
- both created transparent double-exposure states and were classified P1 because native Step 9 requires quarter-scale composition to read cleanly.

Targeted pre-fix evidence:
- scene 05 12-sample job `e0b57771-1a96-4bc0-9620-908ed9c69cdc`
- scene 10 12-sample job `20b60620-2856-492f-bbd9-596df0308332`

Fixes:
- scene 05 opaque spatial comic wipe: `cebe56ec396cfd78a3200097745c976f565eb1bc`
- scene 10 opaque panel-retraction wipe: `04706b42df605794e62d9886f8920d15ce11f477`
- scene 02 bounded halftone work to clipped geometry for the intermittent >150 ms cost warning: `45657de5dbb87e6e59fed2dd2bf3995c8e09fb2f`

Fresh verification:
- scene 05 12-sample post-fix job `c08e38b7-8967-4d16-b12b-6cf92c5d6189` — VERIFIED: spatial split remains opaque; no ghost state.
- scene 10 12-sample post-fix job `5c0d1894-0932-485f-9183-c79d09a2fa87` — VERIFIED: old comic layout retracts spatially into final room; no transparent double exposure.

Current critic head: `45657de5dbb87e6e59fed2dd2bf3995c8e09fb2f`

Exact next actions:
1. generate a fresh whole-film critic sheet from the current head;
2. if the ten-shot spine remains readable, run the full native gate;
3. if gate is fully green with no persistent cost warning, close Critic waves and queue the audio preview/master Deliver jobs.


### TX-V3-013 critic wave 1 — fresh whole-film verification checkpoint

Fresh whole-film critic sheet:
- job `41864f44-53ee-4bb6-805d-7b96eb38c2d5` — SUCCEEDED
- 10 story samples in order from current critic head
- current branch head reviewed: `6f4ee4f7322bab05aedb6808d31ce4517e6f22c9`
- scene 05 midpoint now reads as an opaque comic spatial wipe rather than a ghosted dissolve
- scene 10 midpoint now reads as an opaque reaction/listening-room transition rather than a transparent double exposure
- the ten-verb spine remains visually recoverable at quarter scale

Active final critic gate:
- job `4806ba5a-fe21-4969-b3a7-5256946ebb66`
- input commit `6f4ee4f7322bab05aedb6808d31ce4517e6f22c9`

Exact resume:
1. query `4806ba5a-fe21-4969-b3a7-5256946ebb66`;
2. if green with no persistent cost warning, close Critic waves;
3. start Deliver with preview, then master;
4. do not spend time on the HTML player in V3.


### TX-V3-013 final result — Critic waves

Persistent cost warning found on the first final gate:
- job `4806ba5a-fe21-4969-b3a7-5256946ebb66`
- max swept cost 157 ms on `second-play`, above the 150 ms native threshold.

Targeted fix:
- reduced non-story table-grain render cost in scene 09 without changing G2/G3 playback geometry, timing, record identity or clean-state proof.
- fix commit `df552f1ded781799f40218d8fec390ab4368d2db`

Fresh scene-09 evidence:
- six-frame job `a7873483-502e-4981-9b47-dc27e52ef57c` — SUCCEEDED
- composition / tonearm sequence / macro inset / clean playback remain intact.

Final native critic gate:
- job `8fa3f117-04d4-4315-9efe-e518134ca746` — SUCCEEDED / 6 PASS
- media PASS
- determinism PASS
- sources PASS
- timeline PASS
- draw PASS
- cost PASS
- max swept frame cost: 107 ms
- median: 64 ms
- mean: 61 ms
- result: `OK in 31.6s`

Critic waves: COMPLETE.

## Active transaction

**TX-V3-014 — Deliver**

User priority:
- do not spend time/resources on the HTML player in V3;
- deliverable priority is the actual film.

Exact next actions:
1. render half-scale preview from source commit `df552f1ded781799f40218d8fec390ab4368d2db`;
2. record preview artifact path / size / SHA-256;
3. render 1080×1920 master from the same source commit;
4. record master artifact path / size / SHA-256;
5. close V3 deliver with a concise viewing note.

If the stream times out during either render, resume the exact recorded job ID and do not duplicate the render.


### TX-V3-014 runtime checkpoint

Active half-scale preview:
- job `4e7d1797-f823-4388-ba7b-bb902b07e490`
- source commit `df552f1ded781799f40218d8fec390ab4368d2db`

Exact resume:
1. query `4e7d1797-f823-4388-ba7b-bb902b07e490`;
2. if succeeded, record artifact metadata;
3. then start one master render from the same source commit.


### TX-V3-014 preview result

Half-scale preview:
- job `4e7d1797-f823-4388-ba7b-bb902b07e490` — SUCCEEDED
- 540×960
- 720 frames / 30.000 s
- audio: 48 kHz stereo, peak 0.391
- artifact: `output/preview.mp4`
- size: 4,850,269 bytes
- SHA-256: `3c62dcb62e0b4634ed2fa96777de66831389e51b228b8d66202235271670ea54`

Active master render:
- job `4ceb2189-1885-409a-899c-077e4f4dc610`
- source commit `df552f1ded781799f40218d8fec390ab4368d2db`

Exact resume:
1. query `4ceb2189-1885-409a-899c-077e4f4dc610`;
2. do not start another master unless this job explicitly fails;
3. on success record artifact path / size / SHA-256 and mark Deliver COMPLETE.


### TX-V3-014 final result — Deliver

Half-scale preview:
- job `4e7d1797-f823-4388-ba7b-bb902b07e490` — SUCCEEDED
- `output/preview.mp4`
- 540×960
- 720 frames / 30.000 s
- 48 kHz stereo
- peak 0.391
- size 4,850,269 bytes
- SHA-256 `3c62dcb62e0b4634ed2fa96777de66831389e51b228b8d66202235271670ea54`

Master:
- job `4ceb2189-1885-409a-899c-077e4f4dc610` — SUCCEEDED
- `output/master.mp4`
- 1080×1920
- 720 frames / 30.000 s
- 48 kHz stereo
- peak 0.391
- size 103,285,599 bytes
- SHA-256 `dc8c44f3e415ca0bdff46acdb203101a18ab77361cc421f5129d7fffa73daeff`
- render time 141.9 s

Player:
- intentionally not built/repaired for V3, per user priority.

V3 production procedure:
Brief COMPLETE → Setup COMPLETE → Reference analysis COMPLETE → Research COMPLETE → Art Bible COMPLETE → Storyboard COMPLETE → Timeline COMPLETE → Stub pass COMPLETE → Scenes COMPLETE → Music COMPLETE → Critic waves COMPLETE → Deliver COMPLETE.

The next non-production step is **human viewing / comprehension judgment**.
Do not alter the film before that review unless a reproducible technical defect is found.

Final source render commit:
`df552f1ded781799f40218d8fec390ab4368d2db`
