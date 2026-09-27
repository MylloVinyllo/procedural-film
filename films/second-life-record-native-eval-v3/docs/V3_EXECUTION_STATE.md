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
| Storyboard | IN PROGRESS | full 10-shot comic storyboard with shared geometry / sound grid | self-review then Timeline |
| Timeline | PENDING | `src/timeline.js` | after storyboard |
| Stub pass | PENDING | runtime jobs | after timeline |
| Scenes | PENDING | scene files + six-frame sheets | after stub |
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
