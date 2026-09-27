# V2 Final Evaluation — The Journey of Water

Date: 2026-09-27
Branch: `film/journey-of-water-native-eval-v2`

## Purpose

This second native Procedural Film test was designed to answer a narrow question:

Can a much deeper use of the native Brief → Research → Art Bible → Storyboard → Timeline → Stub → Scenes → Music → Critic waves → Deliver procedure produce a materially richer, more coherent and more film-like result than the first Human Life Cycle experiment, while staying inside the original Procedural Film workflow?

No FORMAT-01, C1, SceneDocument or SMM-specific production invariants were used.

## What changed versus the first experiment

The largest improvement did not come from adding more code at the end. It came from moving complexity upstream.

V2 added:
- authoritative subject research before visual design;
- a drawable subject reference with explicit material rules and mistakes-to-avoid;
- 20 shots with a designed scale ladder rather than a sequence of generic topic cards;
- shared geometry G1–G4 to bind match cuts;
- a tracer identity that changes representation when the water physically changes state or mixes into a larger reservoir;
- explicit transition mechanisms between every pair of shots;
- a motion-complexity contract requiring multiple simultaneous systems rather than one moving hero object;
- per-shot six-frame visual review;
- a 24-sample whole-film critic sheet at quarter scale;
- render-cost correction rather than accepting a visually rich but operationally expensive scene;
- a subject-specific procedural score and material-specific sound language.

## Result

### Composition and readability

At 0.25 scale all twenty sampled shots retain a readable primary composition.

This is materially better than V1. The film now contains recognisable environments and systems rather than mainly isolated symbols:
- layered cloud volume;
- falling rain and leaf canopy;
- macro leaf impact;
- forest-floor soil cutaway;
- pore network;
- spring and creek;
- river valley and tributaries;
- treatment plant process train;
- pressurised pipe interior;
- domestic sink/faucet environment;
- wastewater plant;
- receiving river;
- estuary/ocean;
- evaporation and condensation fields.

No P1 composition failure remained after the critic wave.

### Motion design

V2 contains multiple simultaneous motion systems inside many shots:
- cloud drift + droplet convergence + camera focus;
- layered rain parallax + tracked drop deformation + approaching canopy;
- splash crown + secondary droplets + lens spreading;
- soil descent + branching infiltration + trapped-air response;
- stream flow + split/rejoin around stones + tributary merge;
- river pull-back + tributary reveal + local tracer;
- treatment-process separation with particles moving differently from water;
- pipe-wall parallax + valve/branch movement + flow;
- evaporation with liquid-network loosening and vapor separation.

This is a substantial procedural step toward the Butterfly benchmark.

### Transitions and continuity

The work is now designed as one journey, not twenty independent cards.

The strongest continuity devices are:
- G1 precipitation-drop geometry through cloud microphysics and falling-drop mechanics;
- G2 leaf-lens / pore macro transitions;
- G3 highlighted flow line through subsurface, river, treatment, pipe and effluent;
- G4 ocean-surface / evaporation / condensation field;
- opening and closing cloud compositions for the loop.

The tracer also stops pretending to be one permanently isolated macroscopic drop after mixing. It becomes a local streamline or point cluster where appropriate.

### Density and detail

Illustrated shots are substantially denser than V1, with foreground/midground/background separation, material texture and secondary scale cues.

Schematic shots also gained process density, especially:
- condensation;
- pore flow;
- watershed;
- drinking-water treatment;
- wastewater treatment;
- evaporation;
- condensation return.

The critic wave still found one important density weakness in the wastewater biological stage. That was corrected and re-snapped before final delivery.

### Operational quality

Final native check:

- media: PASS
- determinism: PASS
- sources: PASS
- timeline: PASS
- draw: PASS
- cost: PASS
- max swept frame cost: 120 ms
- result: green

The river scale-reveal originally exceeded the native cost threshold. Texture density was reduced while preserving composition, and the final gate passed.

Audio QA also succeeded:
- 36 s stereo score
- pre-limiter peak 0.394 / -8.09 dBFS
- no samples above 0.55

## Where V2 is still below Butterfly

V2 is now much closer to the *production logic* of Butterfly, but not yet equal to its strongest shots in illustrative richness.

The remaining gap is mostly in four areas.

### 1. Organic drawing sophistication

Several illustrated environments are still built from relatively simple procedural primitives:
- ellipses;
- broad filled polygons;
- repeated hatch fields;
- sparse tree/reed symbols.

Butterfly's best frames feel more authored because the subject anatomy and surrounding environment are described by more specific contour systems.

### 2. Micro-animation richness

V2 often has three or more simultaneous systems, but individual secondary objects still use limited motion vocabularies.

The next level would add:
- local deformation;
- drag and inertia differences;
- overlap/occlusion changes;
- staggered secondary reactions;
- more articulated environmental motion.

### 3. Cinematic camera grammar

V2 uses push, pull and tracked movement, but the camera remains mostly an explanatory instrument.

Butterfly gains extra polish from camera moves that also shape emotion, emphasis and reveal timing.

### 4. Transition transformation

V2 has a real transition map, but several cuts still preserve only direction or guide geometry.

The strongest Butterfly-style transitions transform one recognisable object into the next while both scenes remain visually rich on either side of the cut.

## What the experiment says about Procedural Film itself

The native procedure can regulate much more than the first experiment suggested.

It can directly regulate:
- research grounding;
- drawing specificity;
- palette consistency;
- shot timing;
- scene density;
- deterministic motion;
- shared geometry;
- match-cut planning;
- sound cue timing;
- render cost;
- visual QA;
- whole-film continuity.

What it cannot supply automatically is taste or high-specificity illustration. The framework can demand a rich scene, but the scene implementation still has to invent the actual forms, motion systems and transitions.

So the main V1 failure was not that Procedural Film was incapable of supporting a Butterfly-like result. The procedure had been used too shallowly.

V2 demonstrates a substantially higher ceiling.

## Delivered artifacts

Source / final shot list:
- `exports/journey-of-water-shots.md`

Preview:
- runtime job `39abe69a-3637-4d87-a9ad-917ac414c6cc`
- `output/preview.mp4`
- 540×960, 36.000 s
- SHA-256 `9186ab2cb2d64d174cfea59f1d54a8fdea60890e6a8fc597ac7c2eeebf8323e1`

Master:
- runtime job `b4e2a1ba-c4cf-4f8e-97d3-df0a66735c79`
- `output/master.mp4`
- 1080×1920, 36.000 s, 864 frames
- 215,381,056 bytes
- SHA-256 `5f0b4c2ce4ae2020ba44d4e31c3c6c197d32b3eabaea04ec0a07820aa979d1fe`

HTML player:
- runtime job `54dcfd7e-f0fe-4834-b428-7e994996955f`
- `output/dist/journey-of-water-native-eval-v2.html`
- SHA-256 `6cd5cafbaac6cb1ce9f9a36a0fa8e6aa776cb36eccc8ff2d8472f5109869489a`

## Remaining external judgment

The runtime can render and expose the MP4 player, but this chat execution surface did not provide the assistant with a reliable way to perceive the entire muxed video as continuous audiovisual playback.

Therefore the technical/native critic pass is complete, while the final human watch-through of pacing, emotional rhythm and sound-picture feel remains the decisive last judgment.

That human viewing should determine whether V3 concentrates on:
1. richer organic contour libraries;
2. more articulated secondary motion;
3. stronger camera grammar;
4. more transformational match cuts.
