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
| Setup | IN PROGRESS | clean foundation copied into this project | smoke + fixture gate + fixture render |
| Reference analysis | PENDING | `docs/reference-analysis.md` template | after Setup |
| Research | PENDING | `.tmp/research/` | after reference rules |
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

Expected outputs:
- clean foundation tree;
- native templates copied;
- Goal fixed in CONTRACT;
- smoke job;
- fixture check job;
- fixture render job.

Next action after the scaffold commit:
- run native smoke on the exact scaffold commit.
