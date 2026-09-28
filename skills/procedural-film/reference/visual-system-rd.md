# Visual System R&D — repository awareness note

## What this is

`experiments/visual-system-v0-1/` is the active fork-specific R&D track for improving reusable 2D motion quality on top of procedural-film.

It exists because the native procedural-film pipeline is strong at production integrity, deterministic rendering, timing and scene QA, but scene-local construction of characters, hands and product geometry produced visibly weak results in the Myllo Vinyllo test film.

## Current architectural direction

The experiment separates:

1. **visual components** — character, product and prop definitions;
2. **semantic interaction** — hold, place, press and contact anchors;
3. **pose language** — canonical pose states rather than scene-local anatomy;
4. **motion grammar** — anticipation, curved travel, seating, release and retract;
5. **visual contracts** — reach, contact, product geometry, record seating and release invariants;
6. **render backend** — pure procedural geometry or compiled vector paths behind the same scene-level API.

The intended scene API expresses meaning, not anatomy. A scene should request a pose/action/component state rather than redraw hands, elbows or product geometry from scratch.

## Important status boundary

This R&D is now versioned on `main` for discovery and continuity, but it is **not yet canonical foundation**.

Do not:
- replace `skills/procedural-film/foundation/` with the experiment wholesale;
- treat technical PASS as visual approval;
- promote experimental hand/pose/product components without owner review;
- reintroduce scene-local anatomy for interactions already represented by reusable components.

## Promotion gate

A component/pattern can move from the experiment into foundation only when:

- its static fixture is visually approved by the owner;
- its normal-speed interaction proof is visually approved;
- the technical gate is green;
- reusable visual contracts are green;
- a golden fixture / regression reference is recorded;
- the change is promoted in a dedicated minimal integration PR.

## Continuation rule

New R&D work should continue from the integrated experiment on `main` via a fresh short-lived branch, not from the old long-history `rd/visual-system-v0.1` branch.

This keeps the repository graph clean while preserving the experiment as a first-class part of the fork.
