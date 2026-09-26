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
Status: complete
- rewrite the 18-shot storyboard to worked-example depth
- no scene code changes

### P2 — scene batch A
Status: complete
- scenes 01–03
- one commit
- then one six-sample snapshot job per scene, resumed by job ID as needed

### P3 — scene batch B
Status: complete
- scenes 04–06
- one commit
- then visual snapshot verification

### P4 — scene batch C
Status: complete
- scenes 07–09
- one commit
- then visual snapshot verification

### P5 — scene batch D
Status: complete
- scenes 10–12
- one commit
- then visual snapshot verification

### P6 — scene batch E
Status: complete
- scenes 13–15
- one commit
- then visual snapshot verification

### P7 — scene batch F
Status: complete
- scenes 16–18
- one commit
- then visual snapshot verification

### P8 — native whole-film checks
Status: complete
- one native six-check job
- one whole-film contact-sheet job
- inspect actual rendered frames

### P9 — critic waves
Status: complete
- apply only native Procedural Film critic criteria
- correction commits are bounded and separately verified

### P10 — preview / audio / master
Status: complete
- audio QA
- preview render
- final master render
- final standalone evaluation against Butterfly control

## Visual QA receipts

- 01 adult-hero: `02809d7b-cba0-448a-ae06-a7c3c235587c` — inspected, accepted
- 02 cell-genesis: `94cb76c3-98ea-4626-b344-0b2abbb53d79` — inspected, accepted
- 03 birth: `da7c86ad-d99e-4996-9eb1-57eaf510687c` — inspected, accepted
- 04 growth-ladder: `f94cdeb6-5af1-4c64-b0b1-fe1807ac86c7` — inspected, accepted
- 05 first-steps: `2f0c13d8-1bb1-4511-9ca4-657ac75478ff` — inspected, accepted
- 06 learning-network: `c3ce3581-c824-4a8b-9b3c-3fe549c6d2d6` — inspected, accepted
- 07 childhood-explore: `14551e5f-bebf-4819-af32-96dae348c8a3` — inspected, accepted
- 08 social-salience: `a0f6b612-ff4b-4d99-9ebd-f38cdeaf1623` — inspected, accepted
- 09 one-among-many: `7fca2920-eca6-49ec-a570-27f9305b45c5` — inspected, accepted
- 10 social-network: `c2df2475-bebc-4a55-9c3e-715355208f1e` — inspected, accepted
- 11 bond: initial `9e13c257-03da-4f4a-b961-fe25f5c5099f`; corrected `4d363fa2-6c0d-446f-8e6f-953c0846f544` — physical reciprocity fixed and re-inspected
- 12 role-system: `c61ceb26-9627-43cf-9e6f-0dccdc228732` — inspected, accepted
- 13 create-contribute: `fd49224c-8a32-41a1-b064-295fde4979a6` — inspected, accepted
- 14 memory-field: `a6a57a68-c816-48c2-9ad9-ce37ea4468fd` — inspected, accepted
- 15 ageing-connected: `f1799900-06ff-45c9-81a7-6df279a2602e` — inspected, accepted
- 16 generation-spiral: `b641faaa-2905-42c4-bd7c-27f3cc8aef91` — inspected, accepted
- 17 handoff: initial `09a5b19f-41dc-4c8a-bb38-e88764f44d36`; corrected `9520fc32-f111-44b5-a22f-53e5a7ef9bbb` — hand transfer moved into actual hands at G4 and re-inspected
- 18 seed-loop: `45fa10a3-8ff6-471e-9891-f65286dd40e5` — inspected, accepted

## Final delivery receipts

- production commit: `f80f4b4d2f90e13684cb460829ac1bbce2ba5724`
- final native six-check: `ef4863da-92a9-472f-ae2f-cba5f81d6510` — PASS 6/6
- final whole-film 24-sample sheet: `0ad47278-ec9c-40fd-8d20-12bdd89fee8f`
- critic report: `docs/V2_CRITIC_REPORT.md`
- audio QA: `54983664-97e6-44ea-a3f4-85f7cfed1170`
- preview: `8a7b1b4b-f358-4677-9ddf-bbe52bf8e3a8/output/preview.mp4`, SHA-256 `b53473fff8bd576da822ddf488f22260fc5d2355fc193c7d8e4b9c04c5aefa4c`
- master: `23227771-2424-4608-b1b7-06feef20642b/output/master.mp4`, 1080×1920, 32.000 s, 768 frames, SHA-256 `4f396d691ed749a842f9084762dc62f1bc3f91492aa02127148d54f3113af1d2`
- final HTML player: `df390f0c-91e5-4b7e-bb60-60f5ec23dc8c/output/dist/human-life-cycle-native-eval.html`, SHA-256 `23ce1a6dd3fca6e2138b544b629e35fe9042394b5d4e78daa5fb86c90541b4b3`
- shot captions: `exports/human-life-cycle-native-eval-shots.md`

## Final critic corrections

- scene 09: foreground passer rebuilt and social field re-staged;
- scene 11: reciprocal relation reads through body/hand action;
- scene 17: ambiguous ghost/high-five staging removed; G4 transfers between actual hands.

## Final durable checkpoint

- branch: `film/human-life-cycle-native-eval-v2`
- production commit: `f80f4b4d2f90e13684cb460829ac1bbce2ba5724`
- native workflow: Steps 0–10 complete
- active runtime job: none
- next action: human viewing and comparison against Butterfly Life
