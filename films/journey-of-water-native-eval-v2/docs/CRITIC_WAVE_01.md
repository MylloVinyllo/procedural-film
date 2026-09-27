# Critic Wave 01 — The Journey of Water

Date: 2026-09-27
Production head reviewed: `9758a5e98f3c4ef7d8c9c70e76b4040e7bb5acd5`

This review follows the native Procedural Film critic-wave criteria only: quarter-scale readability, composition, storyboard faithfulness, motion/density, shared geometry, transition continuity, render cost and determinism.

## Evidence reviewed

- whole-film 24-sample sheet at 0.25 scale: job `4577a7b0-606d-411e-8d9d-bebbee31096d`
- fresh 6-sample cloud-hero sheet: job `af709531-bb56-405d-a2c1-7e228016bfe5`
- fresh 6-sample cloud-loop sheet: job `91083ada-4b59-45eb-b8ef-331902bef2a6`
- corrected tributary-river 6-sample sheet: job `23407194-fe66-4fd2-942d-187ba9490d39`
- corrected wastewater-return 6-sample sheet: job `772972ec-8da8-4c0f-b17b-4ba52dec44ae`
- whole-film native check after fixes: job `f638614e-6188-4b44-9ac9-6ef840282cb2`

## P1

No P1 issues remain on the reviewed evidence.

Every sampled shot reads as its intended process at 0.25 scale. There is no shot whose primary composition depends on micro-detail to become legible.

## P2 fixes completed

### Cloud palette literals — fixed

Scenes 01 and 20 previously used literal layer colours. All 16 cloud-layer colours now have named art-bible entries and matching `lib.pal` keys. Scene code resolves those palette keys at draw time.

### Tributary-river render cost — fixed

The river scale-reveal shot exceeded the native cost warning threshold in the first whole-film check.

Correction:
- reduced non-essential bank texture population;
- reduced water hatch density;
- reduced redundant flow bands;
- reduced sparse tree/reed population;
- preserved river silhouette, tributaries, bridge, sediment bar, tracer and camera-scale reveal.

Verification:
- fresh six-frame sheet preserves composition and temporal progression;
- final native check reports max scene sweep cost 111 ms for tributary-river;
- whole-film max cost is 120 ms, so cost gate is now PASS.

### Wastewater biological stage readability — fixed

At quarter scale the biological/aeration stage was initially too empty relative to the surrounding process boxes.

Correction:
- added a faint water body;
- strengthened cross-basin process flow;
- increased floc texture visibility;
- increased aeration bubble population and size.

Verification:
- fresh six-frame sheet now shows the biological stage entering visibly between settling and clarification.

### Estuary/ocean depth — fixed before this wave

The estuary shot was strengthened with headlands, tidal bar, multi-scale waves, opposite-bank foreground and stronger mixing streaks. The whole-film sheet now reads as a river mouth opening into a larger marine reservoir rather than a flat blue field.

## Transition / continuity findings

### Cloud loop

Fresh six-frame sheets for scene 20 and scene 01 show the same house composition, G1 location, cloud-layer rhythm and tracer language. The final cloud-loop frame is visually compatible with the opening cloud-hero frame. Accepted.

### Tracer continuity

The tracer remains a local visual identity rather than a claim that one macroscopic drop remains isolated through the full cycle:
- isolated drop in cloud/rain;
- local streamline after mixing in stream, river, pipe and receiving water;
- separated points during vapor phase;
- reconverging cluster during condensation.

Accepted.

### Plate alternation

Illustrated and blueprint modes remain visually distinct across the 24-sample film sheet, while repeated palette and tracer geometry keep the work coherent. Accepted.

## Remaining critic work

- end-to-end motion/sound watch of the half-scale preview;
- listen for cue density, dead air, masking and cut alignment in the actual muxed film;
- inspect any transition that feels abrupt in motion even if its still-frame geometry is correct;
- if preview is clean, run final gate and master render.
