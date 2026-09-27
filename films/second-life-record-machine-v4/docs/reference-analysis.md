# Reference analysis — V3 animated comic

Date: 2026-09-27

## Why a reference analysis is required

V3 deliberately leaves the native Procedural Film house look. The target is no longer the default alternating paper/blueprint educational film. It is a **short animated comic** whose first job is to tell a concrete story clearly.

This document therefore freezes a new visual/editing grammar before research, art-bible design or storyboard work.

## Reference A — comic-animation vocabulary

Primary video reference:
- **SPIDER-MAN: INTO THE SPIDER-VERSE | Official Trailer**
- Sony Pictures Animation
- https://www.youtube.com/watch?v=pDsxJzLlq5U

Production descriptions used to cross-check the transferable visual principles:
- Sony Pictures trailer announcement: https://www.sonypictures.com/corp/press_releases/2018/06_18/060618_spiderversetrailer.html
- Adobe MAX production article: https://blog.adobe.com/en/publish/2018/10/15/enter-the-spider-verse-at-adobe-max
- Sony Pictures Animation project page: https://www.sonypicturesanimation.com/projects/films/spider-man-spider-verse

Sony describes the film as having a deliberately new / groundbreaking visual style. Adobe's production account is more useful for V3 because it names the visual ingredients: a collage of 2D illustration, 3D animation and classic comic elements including **halftone patterns, chromatic aberrations and sharp shadows**, with custom brushes used to keep the visual language consistent across artists.

V3 uses those observations as a vocabulary reference only. It does **not** reproduce Spider-Verse characters, costumes, compositions, branding or proprietary designs.

### What matters for V3

The relevant lesson is not “make it look like Spider-Man.”

The relevant lesson is that a comic-derived moving image can remain richly cinematic when:
- the drawing style is strong enough to survive motion;
- the character pose reads before fine detail;
- graphic print devices are used selectively to describe tone, depth and impact;
- comic devices are integrated with camera and editing instead of pasted on top;
- different motion cadences can coexist in one shot;
- colour and line treatment participate in storytelling.

### Transferable visual observations

#### Character and silhouette

Comic animation gives the character a strong outer contour and a pose whose action reads at thumbnail scale.

For V3 this means:
- head angle, shoulder angle, elbow and hand must carry the action;
- facial detail supports the pose but never replaces it;
- the record must remain a true circular disc with an unmistakable centre label and spindle hole;
- hand-to-object contact must be visibly plausible.

#### Print / ink surface

The image should feel drawn and printed rather than like a smooth vector infographic.

Useful devices:
- black / near-black contour lines;
- a second thinner interior line for folds, facial planes and object construction;
- halftone dots for midtones;
- short hatch groups for deep shade;
- sharp two-value cast shadows;
- tiny registration offsets only for specific expressive moments.

Do not cover every surface with every texture. The image needs a hierarchy.

#### Depth

Depth is produced through:
- foreground crops;
- overlapping forms;
- line-weight changes;
- larger, darker foreground shapes;
- paler / simpler background shapes;
- panel crop and camera scale;
- occasional offset print layers.

V3 should not depend on soft blur, photorealistic depth of field or gradients.

#### Comic-panel grammar

A comic frame can contain one panel or several.

Useful operations for V3:
- vertical split panel for simultaneous “ear hears noise / stylus hits groove” information;
- narrow inset panel for a macro detail;
- panel border becoming a wipe;
- one panel pushing another away;
- circular record edge becoming a panel mask;
- full-bleed impact frame when the stylus first lands;
- small reaction panel for the protagonist's face.

Panels are narrative containers, not decoration. A split is justified only when the viewer understands why two views are shown together.

#### Expressive effects

Use sparingly:
- speed lines for a quick hand movement;
- vibration lines around speaker / stylus during dirty playback;
- small printed sound words for a crackle or brush swipe;
- chromatic misregistration / offset line only during unpleasant playback;
- radial impact lines when the stylus drops;
- clean concentric music rings only after the second playback.

The “bad sound” and “good sound” states must look different even on mute.

#### Motion cadence

V3 keeps a drawn-animation feeling:
- character pose changes mainly on twos;
- hand motion can use held key poses with short in-betweens;
- record rotation is smooth enough to read mechanically;
- camera can move at 24 fps;
- environmental micro-motion stays subordinate;
- impact frames may be only 1–2 frames;
- reaction holds are allowed when the pose itself is strong.

The film should avoid universal floaty easing.

#### Colour scripting

Colour should change with story state.

Proposed V3 narrative colour logic:
- discovery: warm neutral paper / amber room;
- problem: cool/desaturated shadow, magenta/cyan registration noise;
- cleaning: crisp teal / cream / black with a small amber highlight;
- second playback: warm amber returns with deeper saturated accent colours;
- final listening: richest, most stable palette of the film.

The film should not signal “dirty” by simply making everything brown.

#### Sound-picture linkage

Comic sound needs graphic counterparts.

Examples:
- first stylus landing: physical click + a tiny impact burst;
- dirty groove: crackle in audio + broken short vibration marks / misregistration;
- brush stroke: dry sweep + parallel motion strokes;
- vacuum / cleaning pass: low mechanical layer + travelling suction/contact line;
- second stylus landing: same framing and physical click as first playback, but no chaotic noise layer;
- clean music: stable motif + smooth concentric graphic movement.

The repeated first/second playback is the film's proof, so audio and drawing must mirror one another.

## Reference B — repository Butterfly benchmark

Internal benchmark:
- project: `examples/butterfly-life`
- V3 benchmark sheet job: `d346d922-3c6e-4676-8313-a95553c9b05b`
- 24 requested samples; 17 story shots represented by the runtime sheet.

Butterfly is not the V3 art style. It is the **density / authored-finish benchmark**.

The qualities carried forward are:
- each frame contains subject-specific structure rather than generic decoration;
- foreground, subject and background are all designed;
- macro inserts reveal real detail instead of substituting symbols;
- the film changes scale aggressively;
- repeated geometry supports match cuts;
- annotations are meaningful;
- secondary objects help establish environment and scale;
- shots have several temporal states instead of one object sliding across a static background;
- the film's strongest transitions preserve a recognisable form while the surrounding world changes.

V3 must reach that kind of authored density while remaining much easier to understand narratively.

## What V3 deliberately does differently from both references

1. It is a domestic human story, not a superhero spectacle and not a biological explainer.
2. It uses a stable recurring protagonist across the whole film.
3. It prefers concrete actions over diagrams.
4. It treats the record / turntable / cleaning tools as props whose geometry must stay consistent.
5. It uses comic panels as the main narrative architecture.
6. It reserves abstract graphic effects for sound, attention, impact and transition support.
7. It is shorter and quieter than the Spider-Verse reference. Density must not become visual shouting.
8. It does not use the native paper-vs-blueprint alternation as its core grammar.

## V3 scene-quality implications

A production scene is not accepted merely because:
- the code is deterministic;
- the composition is attractive;
- there is visible motion;
- a subject expert can infer what the shapes mean.

A V3 scene is accepted only when the dominant action is nameable from a still and remains clear across the six-frame sheet.

Examples:
- not “a circle with moving marks,” but “a vinyl record being inspected under a lamp”;
- not “a hand-like polygon moves over lines,” but “a brush is visibly contacting the grooves”;
- not “noise graphics appear,” but “the listener reacts to crackle during playback”;
- not “warm colours return,” but “the same person visibly relaxes and enjoys the second playback.”

## Style rules to carry over into art-bible sections 1–9

1. **Comic readability before motion.** Every shot must read as a still panel before animation is added.
2. **Stable character model.** The protagonist has fixed head/body/hand proportions, hairstyle, clothing silhouette and a small library of canonical poses.
3. **Stable prop model.** Record, turntable, tonearm, stylus, brush and cleaning setup each get explicit drawable geometry and proportions.
4. **Strong contour hierarchy.** Outer character/hero-prop contour is thickest; internal construction is lighter; environment linework is lightest.
5. **Print texture hierarchy.** Halftone for broad midtone, hatching for deep shade, sparse stipple for dust/grit. Do not stack all three everywhere.
6. **Sharp graphic shadows.** Prefer two-value cast/form shadows to soft gradients.
7. **Panels are story mechanics.** Gutters, insets and splits must expose action, reaction or detail. They are never filler.
8. **One dominant verb per shot.** Find, inspect, play, hear, decide, clean, return, lower, listen.
9. **Primary motion is literal action.** Hands grip, record rotates, tonearm pivots, brush contacts grooves, stylus descends.
10. **Secondary motion supports material reality.** Dust moves, sleeve flexes, cable / cloth shifts, small reflections travel, speaker cone reacts.
11. **Motion cadence is mixed.** Characters mostly on twos; mechanical rotation and camera can be smooth; impact accents may be single-frame.
12. **Dirty playback has a controlled distortion language.** Crackle, short magenta/cyan registration offsets, broken vibration marks. Never apply the effect continuously to the whole film.
13. **Clean playback mirrors the dirty playback.** Reuse camera geometry and prop positions so the improvement is immediately comparable.
14. **Sound effects get graphic counterparts.** Click, crackle, sweep and music each have distinct visual marks.
15. **Colour is scripted by story state.** Warm discovery → colder problem → crisp cleaning → richest stable final palette.
16. **Foreground crops create depth.** At least some illustrated shots use large cropped objects or hands in the foreground rather than flat centred layouts.
17. **Environment is specific.** Shelf, sleeve, lamp, turntable controls, table edge and listening-room objects establish a believable place.
18. **Macro detail must be concrete.** Groove, dust, stylus, brush fibres and cleaning contact are drawn recognisably, not replaced by explanatory icons.
19. **Match cuts preserve concrete geometry.** Record circle, spindle centre, tonearm angle, hand position or panel edge can survive a transition.
20. **Density is authored, not random.** Every extra mark must describe material, depth, action, sound or environment.
21. **No default blueprint interludes.** A technical insert is allowed only if it remains visibly tied to the physical record/turntable/action.
22. **Butterfly-level scene investment is the finish benchmark.** A hero scene may require hundreds of deliberate marks and multiple motion systems.
23. **Quarter-scale story test.** On the 24-sample whole-film sheet, the narrative spine must still be recoverable without reading the storyboard.
24. **Unaided human comprehension is final.** The user must understand the film without being told what each shape represents.

## Reference-analysis acceptance

The style direction is now sufficiently specific to rewrite the native art-bible house sections 1–9.

The next native stage is **Research**, not Storyboard.

Research must establish the concrete physical story:
- record / sleeve / turntable geometry relevant to drawing;
- visible dust / debris and groove contamination;
- stylus-groove contact and noisy playback cues;
- a truthful record-cleaning sequence;
- handling rules that keep the record visibly plausible;
- the visual distinction between pre-clean and post-clean states.

Only after those phases have authoritative sources captured under `.tmp/research/` should the V3 art bible be written.
