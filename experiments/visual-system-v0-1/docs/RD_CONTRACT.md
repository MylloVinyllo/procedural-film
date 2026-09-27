# Visual System v0.1 — R&D contract

## Goal

Prove a reusable 2D motion component system on top of procedural-film so a scene no longer invents character anatomy, product geometry or interaction mechanics ad hoc.

## Source of truth

1. Human visual review.
2. This contract and the visual-quality model.
3. The lab implementation under src/components/.
4. procedural-film technical gate.

## Scope v0.1

Reusable entities:
- protagonist;
- vinyl record;
- Myllo Vinyllo record washer.

Reusable interactions:
- hold;
- place;
- press.

Two character backends behind the same semantic interaction contract:
- pure procedural geometry;
- compiled-vector geometry.

## Non-goals

- no new 36 second film;
- no V5 production;
- no merge into the canonical skill foundation before human approval;
- no claim that a technical PASS is a visual PASS.

## Acceptance

Technical:
- check gate green;
- deterministic;
- self-contained runtime;
- no external media at render time.

Visual:
- silhouette reads at preview scale;
- shoulders, elbows, wrists and hands form one body;
- active hand/object contact does not slide;
- product proportions remain stable;
- the same interaction can switch backend without scene-level anatomy code;
- compiled-vector backend visibly supports cleaner authored contours than the primitive backend.

## Approval point

Human review of the A/B lab preview. Only an approved pattern may be promoted into the reusable procedural-film foundation.
