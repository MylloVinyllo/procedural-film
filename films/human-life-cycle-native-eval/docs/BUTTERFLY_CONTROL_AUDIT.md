# Butterfly control audit — native Procedural Film evaluation

Date: 2026-09-26  
Branch: `film/human-life-cycle-native-eval`

## Scope

This audit compares the current Human Life Cycle experiment only against the native Procedural Film worked example `examples/butterfly-life` and the native skill references. It deliberately excludes all Myllo Vinyllo SMM rules and external production invariants.

## Finding

The current Human Life Cycle preview is technically valid but is **not yet a fair quality-level test of Procedural Film**. Its scene layer is drastically underimplemented relative to the worked example and relative to `reference/scene-anatomy.md`.

The result therefore reads as animated iconography / motion cards, while Butterfly Life reads as a densely illustrated temporal film.

## Native reference requirement that was missed

`skills/procedural-film/reference/scene-anatomy.md` says:

- a dense shot should be expected to reach 1000+ lines;
- density is part of the look;
- each scene is supposed to contain hand-authored geometry, memoized geometry, local draw helpers, seeded detail, layered drawing, timing helpers, on-twos object motion and explicit cross-shot continuity;
- after writing each scene, the workflow requires a 6-sample shot contact sheet, visual inspection, fixing, and re-snap before the scene is considered done.

That bar was not met by the current Human Life Cycle scene implementation.

## Quantitative implementation gap

### Human Life Cycle

18 production scene files together:

- 17,931 characters total
- average: 996 characters per scene
- 41 physical source lines total because most files are compressed into 2–4 lines
- representative scenes contain only a handful of canvas primitives and one or two timing ramps

Examples:

- `01-adult-hero.js`: 1,064 chars
- `10-social-network.js`: 978 chars
- `13-create-contribute.js`: 1,159 chars
- `16-generation-spiral.js`: 848 chars

### Butterfly Life

17 scene files together:

- 1,536,528 characters total
- average: 90,384 characters per scene
- 35,103 physical source lines total
- average: ~2,065 lines per scene

Examples:

- `01-hero-on-milkweed.js`: 79,046 chars / 1,828 lines
- `04-larva-molts.js`: 103,906 chars / 2,429 lines
- `10-wing-veins.js`: 126,752 chars / 3,025 lines
- `13-pull-back-continent.js`: 134,712 chars / 2,941 lines

The average Butterfly scene is approximately **90.7× larger by source characters** than the current Human Life Cycle scene.

This is not a recommendation to inflate source code mechanically. It is evidence that the two films are not using remotely comparable levels of visual construction.

## Visual evidence

Native runtime snapshots at the same 0.25 scale show the difference directly.

Butterfly frames contain:

- fully drawn subjects rather than symbolic stick figures;
- multiple depth layers;
- environmental context;
- hatching, texture and internal anatomy;
- many small secondary forms;
- annotations integrated with the illustration;
- scene-specific geometry;
- visible scale and camera choreography.

The current Human Life Cycle frames are dominated by:

- circles plus line-segment people;
- isolated nodes and arcs on empty blueprint fields;
- sparse backgrounds;
- one symbolic action per shot;
- little internal anatomy or surface information;
- very little scene-specific world geometry.

The visual difference therefore matches the implementation difference.

## Planning gap

The storyboard and subject reference are also substantially thinner.

### Storyboard

Human Life Cycle:

- 25,742 chars
- 4,172 words
- 18 shots

Butterfly Life:

- 63,308 chars
- 11,832 words
- 17 shots

Butterfly's storyboard does not merely name a concept per shot. It specifies concrete drawable events, objects, transitions, anatomy, camera behaviour, and beat-level state changes.

### Subject reference

The Human Life Cycle art bible mostly defines semantic safeguards and broad proportions. It does not yet provide enough drawable anatomy and environment rules to support richly illustrated humans.

Butterfly §10 contains concrete drawing facts such as ratios, counts, body parts, poses, textures, stage-specific differences, plant anatomy, migration geography, and explicit mistakes. That information feeds directly into scene geometry.

The current Human Life Cycle art bible also still carries the template title `# Art bible: <FILM TITLE>`, another sign that the planning document was not finished to worked-example depth.

## What did work

The technical film engine is working correctly.

The current Human Life Cycle film passed the native six-check gate:

- source/media safety
- timeline coverage
- scene registration and draw
- frame cost
- determinism

Audio QA also passed and the 32-second MP4 rendered correctly.

The audio implementation gap is much smaller than the visual one:

- Human music.js: 50,112 chars
- Butterfly music.js: 76,155 chars

The timeline cue density is also broadly comparable.

Therefore the main failure is **not** the runtime, renderer, determinism system, audio engine, hard cuts, or plate alternation. It is scene design and scene implementation depth.

## Workflow failure point

The decisive failure happened at native Step 7, Scenes.

The scene files were accepted as production scenes while still structurally closer to placeholders. The mandatory per-shot 6-frame contact-sheet loop was not completed before declaring the scene pass done.

The later whole-film sheet exposed the difference, but the native workflow says it should have been caught scene by scene.

The green six-check did not certify visual quality. It certified runtime correctness.

## Consequence for the experiment

The current MP4 should be treated as:

- a successful technical tracer;
- proof that a new subject can be planned, scored, rendered and checked with the toolkit;

but **not** as the final answer to whether Procedural Film can reproduce Butterfly-level visual filmmaking on a new subject.

A fair test requires a second native scene pass at the worked-example bar.

## Native correction plan

1. Keep the 32 s / 18-shot macro arc unless a specific scene becomes impossible to stage.
2. Rewrite the Human Life Cycle subject-reference section into drawable anatomy and environments, not only semantic rules.
3. Deepen each storyboard shot into concrete physical choreography, foreground/midground/background layers, beat states, camera motion, overlays, and match-cut geometry.
4. Rebuild every scene from the native scene-anatomy pattern instead of polishing the current sparse files.
5. For every scene, produce a 6-sample contact sheet, inspect every sample, fix, and re-snap before moving on.
6. Compare representative scene sheets directly against Butterfly density and readability during implementation.
7. Run the native critic waves only after the per-scene pass is genuinely complete.
8. Re-run the six-check gate, audio QA if required, then render a new full-film preview.
9. Only that second preview should be used for the standalone Procedural Film verdict.

## Important interpretation

Butterfly Life is not showing a hidden different renderer. It uses the same Procedural Film model: the difference is that its scenes are deeply authored miniature drawing systems.

So the control comparison currently points to an execution-depth failure, not evidence that Procedural Film itself can only make motion-card output.
