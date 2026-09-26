# Human Life Cycle Native Eval V2 — execution state

Purpose: rerun the native Procedural Film experiment from the clean pre-rebuild checkpoint while keeping every long-running operation resumable and durable.

This file does not change the Procedural Film workflow. It only records transaction boundaries and resumable job state.

## Baseline

- Repository: MylloVinyllo/procedural-film
- Branch: `film/human-life-cycle-native-eval-v2`
- Starting commit: `c07758fa5e5ba054a3c1e873cdb9ff7460b49ff0`
- Starting point: technical tracer complete + Butterfly control audit complete; dense V2 rebuild not yet applied.

## Native workflow preserved

Brief → Setup → Research → Art Bible → Storyboard → Timeline → Stub → Scene implementation → Music → Critic waves → Deliver

No FORMAT-01, C1, SceneDocument, internal SMM QA rules, or other project-specific production rules are part of this evaluation.

## Transaction rule

Each execution pass must end in a durable checkpoint before any long runtime polling:

1. make one bounded logical change;
2. commit it;
3. if runtime work is needed, launch exactly one primary job;
4. record its job ID here;
5. do not keep a response stream alive through repeated polling;
6. resume the same job by ID in the next pass;
7. only after the job has finished, inspect artifacts and advance the stage.

## Planned transaction boundaries

### P0 — clean restart
Status: complete
- created V2 branch from the audit baseline
- restored the drawable Human Life Cycle art bible

### P1 — storyboard deepening
Status: pending
- rewrite the 18-shot storyboard to worked-example depth
- no scene code changes

### P2 — scene batch A
Status: pending
- scenes 01–03
- one commit
- then one six-sample snapshot job per scene, resumed by job ID as needed

### P3 — scene batch B
Status: pending
- scenes 04–06
- one commit
- then visual snapshot verification

### P4 — scene batch C
Status: pending
- scenes 07–09
- one commit
- then visual snapshot verification

### P5 — scene batch D
Status: pending
- scenes 10–12
- one commit
- then visual snapshot verification

### P6 — scene batch E
Status: pending
- scenes 13–15
- one commit
- then visual snapshot verification

### P7 — scene batch F
Status: pending
- scenes 16–18
- one commit
- then visual snapshot verification

### P8 — native whole-film checks
Status: pending
- one native six-check job
- one whole-film contact-sheet job
- inspect actual rendered frames

### P9 — critic waves
Status: pending
- apply only native Procedural Film critic criteria
- correction commits are bounded and separately verified

### P10 — preview / audio / master
Status: pending
- audio QA
- preview render
- final master render
- final standalone evaluation against Butterfly control

## Current durable checkpoint

- branch: `film/human-life-cycle-native-eval-v2`
- latest known commit after P0: `250b8e57177640254fa30ec3edd9355d3a826c7b`
- active runtime job: none
- next action: P1 storyboard deepening
