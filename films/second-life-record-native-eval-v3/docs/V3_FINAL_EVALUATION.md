# V3 Final Evaluation — Second Life of a Record

Date: 2026-09-27
Branch: `film/second-life-record-native-eval-v3`
Final source render commit: `df552f1ded781799f40218d8fec390ab4368d2db`

## Purpose

V3 tested whether native Procedural Film can carry a concrete, human-readable story when the production problem is reframed from abstract process visualisation to an animated comic.

The target story is intentionally simple:

> A record collector finds a dirty vinyl record, hears an unpleasant first playback, cleans the record, plays it again, and enjoys the improved result.

The decisive acceptance criterion is unaided human comprehension. Technical correctness and still-frame legibility are supporting evidence, not substitutes for that final judgment.

## What changed from V2

V2 concentrated on a researched physical process with complex scale changes and process visualisation.

V3 instead moved the complexity into:
- stable character identity;
- stable physical prop identity;
- one dominant human action per shot;
- comic panel grammar;
- concrete hand/object interaction;
- mirrored before/after playback geometry;
- physical cleaning steps;
- action/reaction staging;
- a visual noise language that is tied to real playback rather than free-floating abstraction.

The ten-verb story spine was fixed before implementation:

**FIND → INSPECT → PLAY → HEAR → DECIDE → CLEAN → VACUUM → RETURN → PLAY AGAIN → ENJOY**

## Machine-verifiable result

### Structure

- 10 shots
- 30.000 s
- 720 frames
- 1080 × 1920 master
- 24 fps
- all shots deterministic
- no timeline gaps/overlaps

### Final native gate

Job:
`8fa3f117-04d4-4315-9efe-e518134ca746`

Result:
- media PASS
- determinism PASS
- sources PASS
- timeline PASS
- draw PASS
- cost PASS

Cost:
- median 64 ms
- mean 61 ms
- max swept frame cost 107 ms

### Audio

Final procedural audio:
- 30.000 s
- 48 kHz stereo
- peak 0.391 / approximately -8.15 dBFS
- no clipping threshold issue in the last QA pass

### Delivery

Preview:
- job `4e7d1797-f823-4388-ba7b-bb902b07e490`
- `output/preview.mp4`
- 540 × 960
- SHA-256 `3c62dcb62e0b4634ed2fa96777de66831389e51b228b8d66202235271670ea54`

Master:
- job `4ceb2189-1885-409a-899c-077e4f4dc610`
- `output/master.mp4`
- 1080 × 1920
- 103,285,599 bytes
- SHA-256 `dc8c44f3e415ca0bdff46acdb203101a18ab77361cc421f5129d7fffa73daeff`

HTML player:
- intentionally skipped for V3 by user priority.

## Visual critic result

The final quarter-scale sheet preserves the ten-shot sequence as concrete nouns/actions rather than abstract process markers.

The key improvements over V2 are visible in the still evidence:
- the recurring protagonist remains recognisable;
- the vinyl record remains recognisable from circle, label, groove field and spindle geometry;
- the turntable and cleaning machine are mechanically distinct;
- the cleaning steps use physical contact, not glow/magic effects;
- the first and second playback share deliberate geometry;
- dirty playback uses local problem graphics rather than globally abstract distortion;
- the final reaction is a human pose change, not just a colour-state change.

Two P1 transition problems were found and fixed during critic:
- scene 05 room → cleaning setup no longer uses a ghosted alpha dissolve;
- scene 10 reaction → final listening room no longer produces transparent double exposure.

A persistent render-cost warning in scene 09 was also fixed without changing the playback mirror.

## What V3 appears to improve conceptually

Based on still-frame and structural evidence, V3 removes several failure modes that were explicit in V2:

1. **Ambiguous hero identity**
   - V2 could require the viewer to know that a shape represented water.
   - V3 repeatedly shows a person, record, turntable, brush and vacuum apparatus.

2. **Process without narrative causality**
   - V2 had a process chain.
   - V3 has a protagonist who encounters a problem, makes a decision and verifies the result.

3. **Transformation without proof**
   - V3 repeats the same playback geometry before and after cleaning, so the intended comparison is structural.

4. **Abstract effect replacing physical action**
   - V3 requires stylus contact before sound graphics, brush contact before cleaning graphics, and vacuum contact before liquid removal.

5. **Weak action hierarchy**
   - every shot has one named dominant verb and supporting secondary motion.

## What is still not proven until human viewing

The runtime and still-sheet critic cannot establish:

- whether a first-time viewer truly understands the entire story without prior explanation;
- whether the protagonist's facial/reaction animation is expressive enough in motion;
- whether first/second playback differences are emotionally obvious, not merely technically mirrored;
- whether the cleaning sequence feels rich and attractive rather than diagrammatic;
- whether the comic-panel transitions feel authored and cinematic in motion;
- whether the score/SFX clarify or distract from the story;
- whether the whole piece approaches the Butterfly benchmark in perceived craft, not just structural complexity.

These are intentionally left for human viewing rather than inferred from code or still frames.

## V3 hypothesis to test with the viewer

If V3 succeeds, the viewer should be able to say, without prompting:

> “A guy finds a dirty record, tries to play it, hears crackle/noise, cleans it, puts it back on, and then it sounds better.”

If the viewer instead describes:
- “a person holding circles,”
- “some machine,”
- “a turntable, then another thing,”
- “random cleaning graphics,”
- or fails to recognise the before/after playback,

then V3 has not yet crossed the semantic-readability threshold and V4 must invest more heavily in authored illustration, pose acting and transition staging.

## Do not change the source before human review

The V3 production source is frozen at:
`df552f1ded781799f40218d8fec390ab4368d2db`

Any post-review correction should start from a recorded human observation and be treated as a new, explicit correction transaction rather than silent polishing.
