# V3 Brief — Second Life of a Record

Date: 2026-09-27
Branch: `film/second-life-record-native-eval-v3`
Project path: `films/second-life-record-native-eval-v3`

## Subject sentence

A record collector finds a dirty vinyl record, hears a noisy first playback, carefully cleans it, and then experiences a satisfying clean second playback.

This is the native Procedural Film V3 subject sentence.

## User intent

V3 must move away from ambiguous abstract metamorphosis and toward concrete visual storytelling.

The film should work as an **animated comic / motion comic**:
- a recognisable recurring human character;
- a recognisable recurring vinyl record and turntable;
- clear cause and effect from shot to shot;
- one dominant readable action per panel/shot;
- comic-panel composition and graphic transitions;
- restrained, purposeful animation inside panels;
- visual meaning that remains understandable even when the viewer has not been told what to look for.

The user explicitly does **not** want resources spent on repairing the HTML/player workflow at this stage. The priority is the film itself.

## Required story facts

The film must communicate, without external explanation:

1. the protagonist discovers or selects an old/dirty record;
2. the record is visibly dirty or compromised;
3. the first playback sounds bad/noisy;
4. the protagonist recognises the problem and decides to act;
5. the record is cleaned with a concrete, readable process;
6. the record is returned to the turntable;
7. the second playback is audibly/visually better;
8. the protagonist's final state communicates satisfaction / restored listening pleasure.

## Invented production decisions

The user did not prescribe these details, so V3 fixes them as working decisions:

- target duration: **30 seconds**;
- target shot count: **10 shots**, mostly 2.5–3.5 s;
- output: **1080 × 1920, 24 fps**;
- no voice-over;
- dialogue is optional but the film must not depend on dialogue for comprehension;
- use at most a few short comic sound-words where they improve clarity;
- protagonist is an adult record collector in a home listening corner;
- the record is generic/unbranded to avoid dependence on external artwork;
- cleaning is represented as a careful manual/vacuum-care sequence rather than a magical transformation;
- the first and second playback deliberately mirror one another so the improvement is legible.

## V3 success criterion

A viewer who receives no explanation should be able to answer, from the film alone:

> “Someone found a dirty record, tried to play it, heard noise, cleaned it, played it again, and it sounded better.”

If that sentence is not recoverable from the visuals and sound, V3 has failed regardless of technical correctness.

## Secondary quality target

V3 should also close part of the gap to the repository's Butterfly example in:
- illustrative specificity;
- number of meaningful secondary elements;
- articulated motion;
- scene-to-scene continuity;
- authored transitions;
- visual attractiveness and overall sense of a finished work.

Butterfly is a complexity/finish benchmark, not a subject or style to copy.

## Exclusions

This experiment evaluates the native Procedural Film workflow plus lessons learned from V1/V2.

Do not import FORMAT-01, C1, SceneDocument or other SMM-specific pipeline contracts into the native V3 evaluation.
