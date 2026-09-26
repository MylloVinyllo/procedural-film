# Human Life Cycle Native Eval V2 — Critic Waves

Date: 2026-09-26
Branch: `film/human-life-cycle-native-eval-v2`
Reviewed production commit: `c3095d0eccfafbfd5d2d060755de5a53249bfbf4`

## Scope

Native Procedural Film Step 9 only. No Myllo Vinyllo SMM production rules were imported.

Evidence reviewed:
- six-frame contact sheets for every shot;
- fresh whole-film 24-sample contact sheet at scale 0.25;
- fresh rendered frames on both sides of the G1/G2/G3/G4 match-cut chains;
- native six-check determinism/cost/draw/timeline/source/media gate.

The combined whole-film sheet was too large for one inline transfer in the chat runtime, so the 18 individual frames from that exact job were inspected instead. This does not change the render evidence.

## Whole-film 0.25 read

All 18 representative frames remain legible at quarter scale.

Illustrated plates read as:
1. adult in a social environment;
2. held newborn;
3. child taking steps;
4. child exploring;
5. individual inside a varied social field;
6. reciprocal relationship;
7. shared making/contribution;
8. connected later life;
9. physical intergenerational handoff.

Schematic plates read as:
1. cell division;
2. staged body growth;
3. learning network in a head;
4. peer salience;
5. clustered social network;
6. overlapping roles/contexts;
7. accumulated memory traces;
8. generations on a spiral;
9. seed/division loop.

No remaining shot fails the native P1 rule “does not read at 0.25 scale.”

## Match-cut measurements and rendered checks

### G1 — 01 → 02 and 17 → 18
Canonical geometry:
- centre (540, 700)
- radius 150
- outer guide 184

Source geometry is exact in shots 01, 02 and 18. Shot 17 expands G4 to the same centre/radius on exit.
Rendered end/start frames were checked and the guide stays on the same screen locus.

### G2 — 04 → 05 → 06
Canonical geometry:
- centre (540, 720)
- ellipse rx 72, ry 92

Shot 04 resolves to the exact ellipse. The current V2 first-step implementation starts the child with the head centred on the same G2 locus and ends with the exact guide ellipse. Shot 06 starts with the exact head ellipse at the same locus.

### G3 — 08 → 09 → 10
Canonical geometry:
- centre (540, 820)
- radius 48

Shot 08 ends on exact G3. Shot 09 physically attaches G3 to the protagonist’s chest for the full shot. Shot 10 starts from exact G3. Fresh boundary frames were inspected.

### G4 — 16 → 17, then expansion to G1
Canonical geometry:
- centre (540, 920)
- radius 18

Shot 16 ends on exact G4. Shot 17 starts from the same point and stages the transfer between actual hands. The point then rises/expands toward G1. Fresh boundary frames were inspected.

## P1 fixes completed

### Scene 09 — one-among-many
Evidence problem:
- the initial foreground passer read as a large translucent blob;
- the protagonist sat visually above rather than inside the social field.

Fix:
- rebuilt the passer as a low-opacity but recognisable human crop;
- raised/re-staged the mid crowd so the protagonist is visibly among other people while G3 stays attached to the chest.

Fresh six-frame contact sheet: accepted.

### Scene 11 — bond
Evidence problem:
- reciprocal relation needed to read from bodies/hands, not only overlays.

Fix:
- current version stages readable extension/contact between two constructed figures.

Fresh rendered frames: accepted.

### Scene 17 — handoff
Evidence problem:
- an intermediate ghost figure and high hand position made the transfer read like a high-five / ambiguous three-person gesture.

Fix:
- removed the ghost figure;
- re-staged older and younger figures around G4;
- lowered and extended the arms so the cycle point is visibly transferred between actual hands;
- re-aligned the younger outgoing trajectory.

Fresh six-frame contact sheet and whole-film frame: accepted.

## P2 review

No unresolved P2 defect remains that materially breaks:
- composition;
- storyboard faithfulness;
- motion readability;
- shared-geometry continuity;
- safe-area placement;
- visual density required to understand the shot.

The schematic plates are intentionally more open than Butterfly Life’s biological/anatomical plates, but the subject-specific structures now remain readable and are no longer generic single-dot cards.

## Determinism and technical gate

Fresh native six-check on commit `c3095d0eccfafbfd5d2d060755de5a53249bfbf4`:
- media PASS;
- source safety PASS;
- timeline PASS;
- draw PASS;
- determinism PASS across cold, sequential, warm forward, warm reverse and shuffled-with-decoys orders;
- cost PASS.

Runtime job:
`32a30cd0-c8de-42f5-bd89-4390360b6fe2`

Whole-film fresh contact-sheet job:
`0ad47278-ec9c-40fd-8d20-12bdd89fee8f`

## Step 9 disposition

Native critic waves are complete for this production head.

Next:
1. audio QA;
2. half-scale preview with sound and final end-to-end watch;
3. full master render;
4. delivery artifacts / final standalone evaluation against Butterfly control.
