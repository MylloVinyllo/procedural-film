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
| Research | IN PROGRESS | authoritative vinyl handling / playback / cleaning sources | capture source notes and phase map |
| Art Bible | PENDING | `docs/art-bible.md` | after research |
| Storyboard | PENDING | `docs/storyboard.md` | after art bible |
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
