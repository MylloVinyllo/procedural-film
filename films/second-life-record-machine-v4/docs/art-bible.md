# Art bible: Second Life of a Record — Machine-Cleaning V4

The visual rules for V4. V3 comic/character rules remain the baseline unless a V4 override below is more specific.

Where this file and a scene brief disagree on colour, weight, character model, prop model or comic grammar, this file wins.
Where this file and `docs/storyboard.md` disagree on a position or time, the storyboard wins.

This is a deliberate rewrite of native Procedural Film house sections 1–9 following `docs/reference-analysis.md`.
V4 remains an **animated comic**, but the cleaning section is now a product-specific Myllo Vinyllo process sequence rather than a generic cleaning abstraction.

## V4 product-process overrides

These rules were added after the V3 human review and the Myllo Vinyllo manual/video study.

They override any older V3 rule that would make the cleaning machine generic, flat, top-down-only, or semantically ambiguous.

### V4.1 Cleaning-machine identity is a P1 story requirement

The machine is the **legacy/large Myllo Vinyllo vacuum washer** shown in the private product reference.

A cleaning scene fails if the machine reads only as:
- a black box;
- a turntable;
- a generic appliance;
- a platter with two rods.

Recognition depends on the combined silhouette:
1. black metal body with visible depth;
2. record + silver centre clamp on top;
3. left supply/brush node with visible bristle bed;
4. right collection/vacuum node;
5. white front Myllo Vinyllo control plate;
6. four round front buttons in a 2×2 arrangement;
7. blue lower-front indicator.

### V4.2 Canonical elevated 3/4 machine view — M1

The default cleaning camera is elevated 3/4 front.

At the canonical hero scale, screen-space anchors are:

| Element | Canonical geometry |
|---|---|
| machine top back-left | (185, 620) |
| machine top back-right | (835, 620) |
| machine top front-right | (950, 900) |
| machine top front-left | (110, 900) |
| machine front lower-left | (155, 1370) |
| machine front lower-right | (895, 1370) |
| record ellipse centre | (535, 785) |
| record ellipse radii | rx 310, ry 118 |
| clamp ellipse centre | (535, 785) |
| clamp radii | rx 58, ry 28 |
| supply pivot | (285, 645) |
| collection pivot | (790, 645) |
| front control plate centre | (530, 1130) |
| control plate size | 360 × 280 |
| blue indicator | (530, 1330) |

Small perspective adjustments are allowed, but:
- front control plate remains visible;
- top nodes remain readable;
- record remains the largest moving object.

### V4.3 Front control plate — M2

The white front plate is a signature product cue.

Canonical stage/control layout:

| Button | Centre | Label |
|---|---|---|
| upper-left | (450, 1045) | START |
| upper-right | (610, 1045) | REVERSE |
| lower-left | (450, 1200) | PUMP |
| lower-right | (610, 1200) | VACUUM |

At hero scale:
- button outer diameter 58–66 px;
- metal centre 36–42 px;
- inactive ring: `mylloRing`;
- active ring: `mylloRingActive`, plus a restrained 2–4 px outer glow/bright edge;
- central `MYLLO VINYLLO` wordmark is drawn as two stacked bold blocks, not as a generic circle icon;
- thin dark routing line may connect the button positions as in the physical reference;
- blue indicator is separate below the plate.

Only the physically active stage button receives the bright ring.

### V4.4 Supply / brush node — M3

Viewer-left node:
- vertical metal pivot column;
- horizontal cylindrical housing;
- dense brush/bristle bed visibly hanging below;
- brush axis crosses a radial band of the record;
- node physically pivots and settles before fluid/brush effects begin.

At macro scale:
- individual bristle groups are 2–4 px bundles;
- contact compression 5–12 px;
- wet bristles darken slightly;
- no glow.

### V4.5 Collection / vacuum node — M4

Viewer-right node:
- vertical metal pivot;
- horizontal collection wand/housing;
- contact slot / velvet lips visible on lower edge;
- no brush bed.

Vacuum semantics:
- node pivots down first;
- VACUUM button activates second;
- wet film then converges into the slot;
- dry groove reflections emerge behind the contact region.

Never show vacuum as an energy beam.

### V4.6 Cleaning liquid

Liquid exists only after the PUMP stage.

Visual states:
- first contact: 3–8 small beads near feed/brush contact;
- spread state: a thin turquoise/neutral wet ribbon carried by rotation;
- brush state: shallow wet film, not thick foam;
- vacuum state: film narrows toward collection slot;
- dry state: wet highlight disappears.

Keep the record black throughout.

### V4.7 Reverse rotation

REVERSE is a physical stage, not just a caption.

The direction change must be visible through at least two of:
- label orientation / radial marker direction;
- moving groove reflection;
- brush/wet-film motion;
- short REVERSE button highlight;
- a compact curved direction arrow.

Do not rely only on text.

### V4.8 Dynamic process-label system

V4 introduces stage labels because human review showed that the machine process was not self-explanatory.

Labels appear in the top safe zone:
- x = 90–930;
- y = 225–350;
- must-read baseline near y 300;
- never cover the machine controls or hand/tool contact.

Default construction:
- near-black/charcoal band or outlined comic plate;
- small stage index block at left, 36–44 px;
- main uppercase text 44–52 px;
- optional second line 28–32 px only when needed;
- V4 prototype language: Russian;
- entrance 4–6 frames;
- exit 4–6 frames;
- no bouncing type.

Preferred labels:
- `ОЧИСТКА ПЛАСТИНКИ`
- `МОЮЩИЙ РАСТВОР`
- `ОЧИСТКА КАНАВОК`
- `REVERSE · ОБРАТНОЕ ВРАЩЕНИЕ`
- `ВАКУУМ`
- optional second line: `ЖИДКОСТЬ И ЗАГРЯЗНЕНИЯ УДАЛЯЮТСЯ ИЗ КАНАВОК`
- `ДО / ПОСЛЕ`
- `ПОВТОРНОЕ ПРОСЛУШИВАНИЕ`

The label supports the visible action; it never substitutes for it.

### V4.9 Matched groove before/after — G8

The comparison must use the same groove geometry.

Canonical full comparison frame:
- left panel: x 75–515, y 520–1230;
- right panel: x 565–1005, y 520–1230;
- gutter: 50 px;
- groove macro centre in each panel: local x midpoint, y 900;
- groove curvature/radius family identical on both sides.

BEFORE:
- 20–40 pale dust particles;
- 4–10 darker grit flecks;
- 2–5 fibres crossing groove bands;
- broken/reflected highlight;
- optional tiny badMagenta/badCyan offset on the highlight only.

AFTER:
- 0–6 incidental tiny marks;
- same grooves;
- stable reflection;
- no chromatic problem offset.

The record is not rendered mirror-clean or blue/teal after washing.

### V4.10 Cleaning camera grammar

Use three scales, not one:

1. **Product recognition**
   - elevated 3/4 M1;
   - front controls + top nodes readable.

2. **Process contact**
   - low oblique macro of brush or vacuum node;
   - record edge/grooves travel beneath stationary contact hardware.

3. **Evidence**
   - G8 matched macro.

Top-down is allowed only as a secondary explanatory insert.

### V4.11 Product-scene density target

Every cleaning hero scene must simultaneously contain at least:
- machine body;
- record/clamp;
- active node;
- front control stage;
- material response;
- dynamic stage label;
- one secondary depth cue / hand / reflection.

But only one action remains dominant.

### V4.12 V4 drawing-quality gate

Hands:
- visible thumb/finger opposition at clamp/node/button contact;
- no mitten blob at the active control.

Record:
- ellipse/thickness/groove reflection consistent with camera;
- label/clamp stays centred on record plane.

Hardware:
- metal cylinders have end caps, top highlight and a darker underside;
- pivot joints are drawn, not implied by floating bars.

Machine:
- top plane, front plane and side plane separate clearly;
- black body does not collapse into one flat rectangle.

Brand plate:
- must remain legible at quarter-scale as a white control plate with four button points and central dark wordmark mass.

### V4.13 Proof-driven refinements

Evidence:
- isolated model project: `experiments/v4-myllo-machine-model`
- source commit: `777e282903719406591c314e66871f8e1818414e`
- six-frame sheet job: `811b28d8-d166-4b6a-bdfd-ed8f03685c43`

The proof established that the 3/4 machine silhouette and process-label concept work at quarter scale. Production scenes must refine four details exposed by that sheet:

1. **Front plate spacing**
   - keep a larger quiet zone around the central MYLLO VINYLLO wordmark;
   - do not let button labels collide with the wordmark;
   - button-ring centres remain the visual anchors, tiny labels remain secondary.

2. **Node silhouette separation**
   - supply node gets an exaggerated visible bristle fringe and slightly thicker lower brush mass;
   - vacuum node gets a longer, cleaner metal wand and a dark continuous contact slot;
   - the two nodes must remain distinguishable even when the front plate is only ~90 px wide in the quarter-scale sheet.

3. **Wet-film restraint**
   - the PUMP stage uses a narrow, physically thin wet sheen/ribbon rather than a broad turquoise ring;
   - black vinyl remains dominant;
   - fluid colour is an accent describing a real film, not a recolouring of the record.

4. **Vacuum proof**
   - during VACUUM, one side of the contact path remains visibly wet and the already-passed side becomes visibly dry;
   - the wet/dry boundary follows the actual collection slot;
   - suction lines are secondary to this material before/after cue.

These refinements are mandatory for production, but the proof itself does not need further polishing.

---

## 1. Frame and comic composition

Canvas: **1080 × 1920**, 24 fps.

### 1.1 Shorts safe area

Must-read story information stays inside:
- x = 60–940
- y = 220–1540

The UI-risk areas are treated as scenery-only:
- top ~180 px;
- right x ≈ 950–1080 from mid/lower frame;
- bottom ~380 px.

Panel borders may extend into the risk areas, but:
- face,
- hand-object contact,
- stylus contact,
- record condition,
- cleaning contact,
- critical sound word,
- decisive reaction

must remain inside the safe area.

### 1.2 The frame is a comic page, not a stack of UI cards

The 9:16 canvas may contain:
- one full-bleed panel;
- one dominant panel plus one inset;
- two panels split vertically or diagonally;
- rarely three panels when the causal relation is obvious.

Default is **one panel**.

A multi-panel frame is allowed only when it communicates:
- action + reaction;
- wide action + macro detail;
- before + after;
- simultaneous sound source + listener response.

Never split the screen merely to add density.

### 1.3 Panel borders and gutters

At 1080 px:
- primary panel border: 5 px, `comicBorder`;
- secondary/inset border: 4 px;
- ordinary gutter: 22 px;
- narrow kinetic gutter: 12 px;
- wide narrative pause: 36 px;
- inset corner radius: 0–8 px, usually square.

Gutter colour: `gutter`.

Panel borders may:
- slide;
- expand;
- become a wipe;
- be overtaken by the record circle;
- break for an impact object.

They never wobble independently unless the whole panel is in the “bad playback” distortion state.

### 1.4 Tall-frame staging

Human medium shot:
- head normally y 360–650;
- hands / record action y 700–1220;
- turntable / work surface y 1030–1510.

Full-body character height in a wide environmental shot:
- 930–1220 px.

Head-and-hands close-up:
- face fills 280–420 px height;
- hand/prop fills 320–650 px.

Macro prop shot:
- record/stylus/brush detail may occupy 70–95% frame width.

### 1.5 Readability hierarchy

Every shot has exactly one dominant verb.

Visual priority:
1. action silhouette / hand-object contact;
2. hero prop;
3. facial reaction;
4. immediate environment;
5. comic effect;
6. decorative texture.

If a viewer cannot name the verb from a still, adding more detail is forbidden until the composition is fixed.

---

## 2. Palette

Colour is flat.
No photographic gradient shading.
Large tonal changes come from:
- flat second values;
- halftone;
- hatch;
- sharp cast shadows;
- limited print-registration offsets.

### 2.1 V3 comic house palette

These keys reuse the foundation names for compatibility, but their V3 values are the published values for this film.

| Name | Hex | Use |
|---|---|---|
| paper | #F3E7D3 | warm uncoated comic paper |
| paperShade | #D7C7AD | page / wall shadow |
| paperDeep | #B79F80 | deep warm paper / room recess |
| stripeCream | #F5ECD9 | compatibility background A; rarely used as stripes |
| stripeYellow | #E8D3A2 | warm discovery accent |
| stripeApricot | #E7C3A4 | skin-adjacent background accent |
| stripeSage | #C9D3BE | calm secondary room accent |
| stripeSpring | #D7E2C8 | clean-state pale green |
| stripeSky | #BFCED1 | cool problem-state background |
| ink | #201B1A | primary outer contour |
| inkSoft | #493C37 | interior contour / prop detail |
| inkFaint | #7F6D63 | environment / construction |
| tan | #C9A779 | paper sleeve / domestic neutral |
| ochre | #C68A35 | warm small accent |
| rose | #C97B74 | muted emotional accent |
| duskRose | #D79A8C | warm wall / late listening accent |
| sage | #85977A | plant / room accent |
| teal | #2F8A87 | cleaning / clean-state accent |
| tealDeep | #1E5D5D | deep cleaning / clean-state shade |
| sun | #E8B64A | lamp / warm highlight |
| nightSky | #37405B | deep cool panel field |
| night | #202333 | deepest cool / speaker recess |
| white | #FFF8E8 | highlight / paper-white |
| orange | #D66A36 | shirt / kinetic warm accent |
| leaf | #5E7B4B | plants |
| wood | #936B4B | table / shelf |
| sunset | #D88A73 | final-room warmth |
| dusk | #544767 | problem-state cool-violet |
| red | #B33B32 | warning / tiny impact accent |
| comicBorder | #211C1A | panel borders / graphic frame |
| gutter | #F6EEDC | panel gutter / page break |

### 2.2 Subject palette

These values are mirrored exactly into the marked subject block in `src/lib.js`.

| Name | Hex | Use |
|---|---|---|
| skin | #D9A37F | protagonist lit skin |
| skinShadow | #AF765C | protagonist skin shadow |
| hair | #2B2423 | hair / eyebrow mass |
| shirt | #D56A3B | rust overshirt |
| shirtDeep | #9F4630 | overshirt shadow |
| tee | #EADFC8 | inner T-shirt |
| pants | #38404B | trousers |
| shoe | #2B2D31 | shoes |
| vinyl | #191A1D | LP playing surface |
| vinylEdge | #090A0B | disc outer edge / deepest groove |
| groove | #4B4D52 | readable groove bands / reflected ring |
| label | #D58C45 | generic record label |
| labelDeep | #A95D2A | label shadow / typography substitute marks |
| sleeve | #D8B86A | generic paper sleeve/jacket |
| sleeveShadow | #A9864E | sleeve folds / inner shadow |
| turntableBody | #C9C1B2 | generic turntable plinth |
| platter | #4D535A | platter edge |
| mat | #25282C | platter mat |
| metal | #AAB0B3 | spindle / arm hardware |
| tonearm | #B8B7AE | tonearm tube |
| cartridge | #3B3A39 | cartridge body |
| stylus | #B9D4DC | stylus/cantilever highlight |
| dust | #C7B59D | loose dust, fibre, lint |
| grit | #8D7766 | darker contamination flecks |
| brush | #8C5B3D | brush handle/body |
| brushFiber | #292A2B | brush fibres |
| fluid | #67B8B2 | visible cleaning liquid |
| fluidPale | #B9E1DA | thin wet film highlight |
| machine | #DBD5C7 | generic cleaning-machine shell |
| machineDeep | #707B7E | machine recess / shadow |
| vacuum | #343B3E | vacuum wand / slot |
| speaker | #4A382F | speaker cabinet |
| speakerCone | #262328 | driver cone |
| lamp | #D6A95A | lamp shade / warm practical |
| roomWall | #E1D4BF | home-listening wall |
| table | #9A694A | turntable / cleaning table |
| badMagenta | #DE3F86 | dirty-playback registration error |
| badCyan | #36A7B7 | dirty-playback registration error |
| cleanGold | #E3B74E | satisfying clean-music accent |
| cleanTeal | #3A9990 | satisfying clean-music accent |
| soundWord | #E95538 | short comic sound word |
| mylloBody | #111416 | Myllo black metal front/side body |
| mylloTop | #1B2023 | Myllo top plate |
| mylloEdge | #07090A | deepest machine edge/recess |
| mylloPanel | #F0EEE7 | white front control plate |
| mylloPanelInk | #1C1D1E | wordmark / routing line |
| mylloButton | #303236 | metal/dark pushbutton centre |
| mylloRing | #A86235 | inactive orange/copper ring |
| mylloRingActive | #F08B3E | active stage ring |
| mylloBlueLed | #2F78E8 | lower-front blue indicator |
| mylloBristle | #B7A171 | supply brush bristle |
| mylloBristleWet | #6F705C | wet/darkened bristle |
| mylloWet | #73BDB8 | thin wet-film body |
| mylloWetPale | #B4E0D9 | wet-film highlight |
| processBand | #22272A | dynamic top process label band |
| processText | #FFF8E8 | process label text |

### 2.3 Technical / inset palette

V3 does **not** default to separate blueprint scenes.
These keys remain available for rare macro/inset construction drawings and native fixtures.

| Name | Hex | Use |
|---|---|---|
| navy | #172033 | technical inset base |
| navyDeep | #0D121D | deepest technical inset |
| navyLight | #263550 | inset panel tint |
| grid | #4B5D79 | guide grid |
| lavender | #C8C1EF | technical construction line |
| lineWhite | #F4F0E8 | strong inset line |
| paleBlue | #9FC7D0 | secondary technical line |
| glow | #FFF0C8 | small highlight |
| magenta | #DE3F86 | process-change accent |
| schemVinyl | #8CA7C2 | record/groove technical line |
| schemClean | #67B8B2 | cleaning-contact technical line |
| schemNoise | #DE3F86 | noise/problem technical line |

### 2.4 Story-state colour script

| State | Background bias | Accent |
|---|---|---|
| Discovery | paper / tan / wood | label, shirt, lamp |
| Suspicion / inspection | paper + cool grey | dust / cyan |
| Bad playback | stripeSky / dusk / night | badMagenta + badCyan |
| Decision | neutral paper | shirt + one warm red |
| Cleaning | paper / machine | fluid / teal |
| Return to turntable | neutral warm | label / metal |
| Clean playback | warm paper / sunset | cleanGold + cleanTeal |
| Final listening | richest warm room | cleanGold |

The badMagenta/badCyan pair is **for the problem state only**.
It is not a permanent chromatic effect.

---

## 3. Line and contour

The image must read as authored comic drawing, not smooth vector infographic.

### 3.1 Character and hero prop weights

At 1080 px width:

| Element | Width | Notes |
|---|---:|---|
| character outer silhouette | 6.0 px | `ink`, pressure ±20% |
| face / hand outer contour | 5.0 px | `ink` |
| record outer contour | 5.5 px | `ink` or `vinylEdge` |
| turntable / cleaning-machine hero edge | 4.5 px | `ink` |
| clothing fold / facial plane | 2.3 px | `inkSoft` |
| prop construction | 2.0 px | `inkSoft` |
| environment major | 2.2 px | `inkSoft` 70–85% |
| environment minor | 1.2–1.6 px | `inkFaint` |
| hatch | 1.0–1.6 px | shadow colour |
| halftone dot radius | 1.1–2.3 px | see §4 |
| speed / action line | 2.0–3.0 px | tapered |
| panel border | 5 px | `comicBorder` / `ink` |

### 3.2 Contour hierarchy

Rules:
- outer silhouette never uses the same weight as environment detail;
- a hand gripping a record must have one uninterrupted readable outer shape;
- finger separations are interior lines, not five separate outlined sausages;
- the record stays geometrically circular even though ink boil affects the contour by ±1.0–1.5 px;
- turntable hardware may wobble less than character outlines to remain mechanically legible.

### 3.3 Controlled print offset

Dirty-playback effect only:
- duplicate selected contour fragments in `badMagenta` and `badCyan`;
- offset 4–9 px in opposite directions;
- apply to speaker vibration, stylus contact inset, sound word and occasionally the listener's head edge;
- never offset the entire frame for longer than 6 frames;
- never use it during clean playback.

---

## 4. Tone and print texture

### 4.1 Halftone

Primary midtone device.

Dot size at full resolution:
- subtle face/clothing midtone: radius 1.2–1.6 px, pitch 9–13 px;
- room/background midtone: radius 1.3–2.0 px, pitch 12–18 px;
- dramatic shadow patch: radius 1.8–2.4 px, pitch 8–11 px.

Halftone is clipped to a deliberate tonal region.
It does not fill every object.

### 4.2 Hatching

Use for:
- deep clothing folds;
- underside of hand;
- sleeve interior;
- turntable/plinth shadow;
- brush handle;
- vacuum arm;
- deep room corners.

Primary angle: 45°.
Cross-hatch only for the darkest 10–15% of a form.

Spacing:
- light: 14 px;
- medium: 9 px;
- dark: 6 px;
- cross layer: 8 px.

### 4.3 Dust / grit stipple

Dust is **not** generic atmospheric snow.

On record close-up:
- 18–45 loose pale dust/fibre marks in a 500×500 px macro area before cleaning;
- 4–12 darker irregular grit flecks;
- 3–8 short fibres 25–70 px long;
- distribution biased toward visible groove valleys and static-like clusters, but not every groove.

After cleaning:
- no magical zero-particle state;
- 0–6 tiny incidental marks may remain;
- visual proof is the reduction plus stable reflection/groove readability.

### 4.4 Sharp shadows

Cast/form shadows use flat second shapes:
- no Gaussian blur;
- edge may be inked or halftoned;
- light direction defaults upper-left;
- final listening scene may use warmer, broader shadows.

### 4.5 Paper / print surface

The native core paper grain remains.
Scenes do not add a full-frame noise layer.

Comic print feel comes from:
- native paper grain;
- halftone regions;
- small line boil;
- selected registration offsets;
- hard colour boundaries.

---

## 5. Character language

### 5.1 Protagonist model

Production design choice, not a sourced fact.

Adult record collector, visually neutral enough to function as a recurring story character.

Canonical medium-shot proportions:
- total standing height reference: 1160 px;
- head height: 170 px;
- head width: 128 px;
- neck: 52 × 60 px;
- shoulder width: 315 px;
- torso shoulder-to-waist: 350 px;
- upper arm: 210 px;
- forearm: 205 px;
- hand palm length: 105 px;
- hand full length including fingers: 160 px.

Identity:
- short dark hair with one forward notch;
- rust overshirt, sleeves rolled to forearm;
- cream T-shirt;
- dark trousers;
- no logos;
- no glasses unless storyboard later proves a readability need.

Face:
- eyebrow angle and mouth curve do most emotional work;
- nose is one short ink plane;
- eyes are simple dark upper line + pupil/iris mark at medium scale;
- no hyper-detailed portrait rendering.

### 5.2 Canonical emotional poses

**Curiosity**
- head +8° down toward record;
- eyebrows slightly raised;
- shoulders neutral;
- elbows open.

**Listening concern**
- head turns 12° toward speaker/turntable;
- one brow lowered;
- mouth slight diagonal;
- shoulders rise 10–18 px.

**Decision**
- chin lowers 4°;
- gaze locks onto record;
- elbow bends decisively toward stop/control/record;
- body leans 3–5° forward.

**Care / concentration**
- head down 10–14°;
- shoulders stable;
- wrist aligned with brush/tool;
- mouth neutral.

**Relief / enjoyment**
- shoulders drop 16–24 px relative to problem pose;
- head tilts back 4–7°;
- eyes soften / partially close;
- mouth small upward curve;
- one hand may leave the equipment and rest.

### 5.3 Hand model

Hands are a P1 story component.

At close-up:
- palm is one tapered quadrilateral/curved mass;
- thumb is a separate articulated form;
- fingers are grouped 2+2 or 3+1 when not individually important;
- fingertips get individual silhouettes only at grip/contact.

Record handling poses:
- edge grip: thumb on label/inner safe region, fingers at outer rim;
- two-edge grip: hands at approximately 4 and 8 o'clock;
- never place flat fingertips across playable grooves.

Brush/tool grip:
- thumb opposes first two fingers;
- wrist line continues into tool axis;
- brush fibres visibly contact surface.

---

## 6. Comic panel and effect grammar

### 6.1 Allowed panel structures

**Full bleed**
Best for:
- discovery,
- cleaning hero shot,
- final listening.

**Action + reaction split**
Best for:
- dirty playback: stylus/record plus protagonist reaction.

**Wide + macro inset**
Best for:
- inspection,
- brush contact,
- stylus/groove contact.

**Before/after mirror**
Use the same geometry in dirty and clean playback rather than literal split-screen unless storyboard needs an explicit comparison beat.

### 6.2 Panel motion

Panel edges may animate:
- wipe in 4–8 frames;
- slide in 6–10 frames;
- crop around a circular record over 8–14 frames;
- collapse into a gutter over 4–6 frames.

Panel movement must not outpace the story action it reveals.

### 6.3 Sound words

Use at most 3–4 unique words across the whole film.

Candidate vocabulary:
- **KRRK** / **KRK** for dirty crackle;
- **CHK** for stylus/control click;
- **SHFF** for brush sweep;
- no word for clean music unless needed.

Rules:
- all caps;
- hand-drawn block sans;
- 70–150 px height depending on importance;
- soundWord/badMagenta in problem state;
- may overlap a panel edge;
- never replace the actual physical sound source.

### 6.4 Bad-playback visual grammar

Dirty playback uses a combination of:
- broken vibration marks;
- 4–9 px magenta/cyan registration offsets;
- 2–5 irregular short crackle bolts;
- brief panel-edge jitter;
- protagonist reaction;
- dust/groove macro.

No single effect is sufficient by itself.

### 6.5 Clean-playback visual grammar

Clean playback mirrors the same camera/prop geometry but uses:
- stable contours;
- no crackle bolts;
- no registration offsets;
- cleanGold / cleanTeal concentric or flowing music curves;
- calmer panel borders;
- protagonist relaxation.

The before/after must remain visible even with audio muted.

---

## 7. Motion

### 7.1 Cadence

Character body, face and hands:
- primarily on twos, 12 fps poses.

Mechanical motion:
- record/platter rotation may run smoothly at 24 fps;
- tonearm pivot is 24 fps but stylus-contact impact can snap on a 1–2 frame accent;
- cleaning platter rotation smooth;
- vacuum-arm lowering may use 12 fps with a smooth camera.

Camera:
- 24 fps.

Panel borders:
- 24 fps.

Ink boil:
- native 12 fps.

### 7.2 Action hierarchy

Every scene implements, in order:

1. **primary action**
   - e.g. remove record, lower stylus, brush grooves;

2. **secondary reaction**
   - sleeve flex, dust displacement, arm recoil, facial change;

3. **ambient motion**
   - lamp glow flicker is forbidden as default;
   - plant leaf / curtain / tiny room motion only if it gives depth or rhythm.

If ambient motion competes with the hand/record action, remove it.

### 7.3 Key-pose timing

Ordinary human action:
- anticipation: 2–4 frames;
- move: 4–10 frames;
- contact: 1–2 frames;
- settle/reaction: 4–12 frames.

Brush cleaning:
- visible contact established before travel;
- travel 10–24 frames per readable sweep;
- fibres lag 1–3 frames behind handle direction.

Stylus lowering:
- arm pivot;
- cartridge approaches;
- stylus/cantilever contact;
- tiny 1–3 px compression cue;
- sound/graphic hit on the contact frame.

### 7.4 Rotation

Record/platter:
- use continuous angular motion;
- label geometry rotates with disc;
- spindle stays screen-fixed relative to turntable;
- dust stuck to disc rotates with it;
- loose/floating dust does not rotate as if glued.

### 7.5 No floaty default

Do not use long `inOutCubic` easing for every action.
Human/comic action prefers:
- short anticipation;
- decisive move;
- held read pose.

Long ease is reserved for:
- camera push;
- panel reveal;
- final listening settle.

---

## 8. Match cuts and continuity

Match cuts preserve concrete object geometry.

The storyboard will publish exact tables for each reused shape.

### 8.1 Record circle

Canonical top-down reference:
- centre: (540, 930)
- radius: 285 px
- spindle: (540, 930)
- label radius: 92 px
- spindle-hole radius: 8 px

Use for:
- inspection macro;
- first playback top-down;
- cleaning platter;
- second playback.

A transition may change environment around the circle while the centre/radius remain fixed.

### 8.2 Tonearm playback mirror

Dirty and clean playback must share:
- platter centre;
- record scale;
- tonearm pivot point;
- cartridge/stylus contact point;
- camera crop;
- protagonist reaction panel location when possible.

This is a narrative proof device.

### 8.3 Hand continuity

When a hand carries the record across a cut:
- rim contact angle changes by no more than 15° at the cut;
- thumb/finger side remains consistent;
- the disc does not teleport between left/right hands without an intervening action.

### 8.4 Sleeve continuity

Generic sleeve:
- square;
- record circle readable inside/against it;
- opening edge consistent within the shot sequence;
- no invented cover art that becomes a competing hero.

### 8.5 Panel-edge continuity

A gutter/panel border may become:
- table edge;
- sleeve edge;
- turntable plinth edge;
- vacuum-arm edge.

The shared line must preserve position for at least the cut frame.

---

## 9. Titles, captions and end treatment

V3 does not rely on narration or explanatory captions.

### 9.1 Story text

Allowed:
- tiny record-label marks with no legible brand;
- 3–4 comic sound words;
- optional final short phrase if later storyboard testing proves it adds value.

Not allowed:
- explanatory labels such as “dirty”, “clean”, “before”, “after” as a substitute for drawing;
- technical paragraph text;
- subtitles explaining the plot.

### 9.2 Final frame

Default final frame:
- protagonist listening in the same home environment;
- record turning in foreground/midground;
- clean music curves;
- relaxed pose;
- no player-specific UI element.

A wordmark is optional, not mandatory.

If used:
- thin system sans;
- 38–44 px;
- inside safe area;
- never the primary story payoff.

---

## 10. Subject reference

Sources checked on 2026-09-27:
- Library of Congress: care, handling and storage of audio-visual materials;
- Library of Congress National Jukebox: disc cleaning / preparation workflow;
- Ortofon: record and stylus care / FAQ;
- Pro-Ject VC-S3 user guide;
- Technics SL-1500C operating instructions.

Captured notes:
- `.tmp/research/01-loc-handling.md`
- `.tmp/research/02-loc-cleaning.md`
- `.tmp/research/03-ortofon-care.md`
- `.tmp/research/04-project-technics-operation.md`
- `.tmp/research/00-phase-map.md`

Source-derived facts and production drawing conventions are separated below.

### 10.1 Vinyl record

Source-derived handling fact:
- hold by outer edge and/or label area;
- avoid fingertip contact with the playable groove field.

Production drawing convention:
- generic 12-inch-LP-like disc, not a claim about every record format;
- top-down radius at canonical story scale: 285 px;
- label radius: 92 px;
- spindle hole: 8 px;
- outer dead/rim band: 11–16 px;
- playable groove field: label edge + 18 px to outer rim − 18 px.

Grooves:
- do **not** draw hundreds of evenly spaced vector rings;
- draw 22–44 grouped arcs/rings with spacing variation;
- add 5–12 brighter reflected groove segments at a time;
- groove bands curve perfectly around the spindle centre even when ink lines boil slightly.

Three-quarter view:
- disc ellipse ratio y/x = 0.26–0.42 depending on camera;
- thickness 5–10 px at medium shot;
- outer edge gets one strong `vinylEdge` contour.

### 10.2 Sleeve / discovery

Narrative invention:
the record is found in a home shelf/sleeve.

Production model:
- sleeve appears as a square 500–650 px wide at close medium scale;
- top/right opening orientation is fixed by storyboard and maintained;
- cover is generic geometric print only, 2–4 large flat shapes maximum;
- no fake artist/title text.

Removal sequence:
1. one hand stabilises sleeve;
2. second hand reaches inner sleeve/record edge;
3. record edge emerges;
4. hand transfers to edge/label-safe grip;
5. record clears sleeve.

Secondary material motion:
- sleeve mouth flexes 4–10 px;
- paper corner trails 2–4 frames;
- inner sleeve may bow slightly.

### 10.3 Protagonist inspecting the record

Dominant action:
look at record under a practical lamp.

Readable geometry:
- record tilted 15–28° from vertical;
- lamp highlight sweeps across grooves as wrist changes 4–8°;
- face and record occupy opposite thirds;
- gaze line lands on a dust cluster.

Macro inset:
- 350–520 px diameter crop of groove field;
- dust marks per §4.3;
- one fibre crossing 2–5 groove bands;
- no magic glow around dirt.

### 10.4 Turntable

Source-derived playback sequence:
record on platter → platter rotation → tonearm/stylus moved/lowered to record.

Generic production design:
- plinth: rounded rectangle 760 × 560 px in top-down hero scale;
- platter radius: 310 px;
- record radius: 285 px;
- spindle radius: 8 px;
- tonearm pivot: approximately 210–260 px right of platter edge in the designed frame;
- tonearm tube: 12–18 px visual width at hero scale;
- cartridge: 70 × 38 px at macro scale;
- stylus/cantilever: 26–48 px line assembly in macro.

Controls:
- one start/stop control;
- one cue/lever-like control may be implied;
- avoid copying a specific brand layout.

### 10.5 Stylus-groove contact

Production macro:
- groove arcs occupy 60–80% of frame;
- cartridge enters from upper/right or upper/left consistently across dirty/clean mirrors;
- cantilever is a thin angled member;
- stylus tip contacts one groove valley.

Contact sequence:
1. cartridge above record;
2. stylus approaches;
3. contact;
4. tiny 1–3 px compression/settle;
5. groove passes under stylus while stylus remains spatially stable.

Dirty playback:
- nearby dust/fibre may approach stylus;
- crackle effect is a comic perception device, not a literal electrical diagram.

Clean playback:
- same camera geometry;
- reduced visible contamination;
- stable line registration.

### 10.6 Dirty playback

Supported context:
sources support dust/dirt as a legitimate care/listening concern.

Narrative scope:
this particular record is staged as audibly noisy before cleaning.

Visual proof requires all three:
1. record/stylus is physically playing;
2. crackle/problem graphics appear;
3. protagonist reacts.

Problem graphics:
- 2–5 broken `badMagenta` / `badCyan` vibration fragments;
- one “KRRK” or “KRK” word;
- selected 4–9 px print-offset contour;
- 1–3 short speaker-cone jolts.

Do not:
- turn the entire scene into digital glitch;
- imply the grooves themselves are electrically glowing;
- imply every record crackle is caused by dust.

### 10.7 Decision / stop action

Concrete action:
- protagonist lifts/cues tonearm or stops playback;
- gaze returns to record;
- cleaning tool/setup enters the next panel.

Pose:
- one hand near turntable control/tonearm;
- other hand prepares safe record grip;
- torso leans forward.

Transition opportunity:
record circle match-cuts to cleaning platter.

### 10.8 Cleaning setup

Source-derived:
wet solution + soft brush + rotation + vacuum removal + drying are legitimate elements of a cleaning workflow.

Generic V3 cleaning machine, not a branded product:
- base: 720 × 500 px rounded rectangle at top-down hero scale;
- cleaning platter: record-centred, visually smaller support under disc;
- vacuum wand: 360–470 px long, 42–62 px wide;
- brush: 220–300 px visible length;
- fluid bottle/nozzle: small secondary prop.

The machine must look mechanically different from the turntable:
- more utilitarian body;
- visible vacuum wand/contact slot;
- fluid/brush stage;
- no tonearm cartridge.

### 10.9 Fluid application

Drawing convention:
- show 6–16 visible fluid beads or a narrow applied ribbon before spreading;
- `fluid` / `fluidPale`, no glow;
- wet area changes reflected groove segments, not the base vinyl colour.

Sequence:
1. nozzle enters;
2. fluid contacts rotating surface;
3. bead/ribbon is carried by rotation;
4. brush arrives and spreads a thin film.

Avoid:
- flooding label;
- fluid floating above record;
- instantly turning the whole disc bright teal.

### 10.10 Brush contact

Source-derived:
a soft brush can be used in cleaning.

Drawing:
- handle visible;
- fibre bed visibly touches groove field;
- fibre tips trail 4–12 px behind travel direction;
- brush angle 15–30° relative to local groove tangent;
- contact width 120–220 px.

Motion systems:
- disc rotation;
- stable hand/tool pressure;
- fibre lag;
- wet-film line;
- displaced dust/fibre marks.

Comic accent:
one brief “SHFF” may follow the brush, never covering the contact point.

### 10.11 Vacuum removal

Source-derived:
vacuum removal of cleaning liquid is a legitimate record-cleaning step.

Drawing:
- vacuum wand/contact slot makes physical contact/near-contact along the rotating disc;
- wet film is visible entering the slot;
- behind the slot, surface becomes visually drier;
- suction direction is shown by short converging fluid lines, not a sci-fi beam.

Sequence:
1. wand approaches;
2. contact established;
3. vacuum audio/graphic begins;
4. wet film narrows toward slot;
5. dry groove reflection emerges behind;
6. wand lifts.

Avoid:
- giant tornado;
- glowing energy ray;
- water disappearing before it reaches the contact slot.

### 10.12 Dry / ready state

Source-derived:
the record should be dry before removal/handling after wet cleaning.

Visual:
- no wet-film highlight;
- groove arcs crisp/stable;
- contamination substantially reduced;
- protagonist returns to edge/label grip.

Do not depict a mirror-polished glass disc.
Vinyl remains dark and textured.

### 10.13 Second playback mirror

This is the most important continuity proof.

Repeat shot geometry from first playback:
- record centre;
- scale;
- platter position;
- tonearm pivot;
- stylus contact;
- split/inset placement if used.

Differences:
- surface visibly cleaner;
- contour registration stable;
- crackle word/bolts absent;
- smooth cleanGold/cleanTeal music curves;
- speaker response rhythmic rather than jolting;
- protagonist shoulders/head soften.

### 10.14 Listening environment

Production design:
- compact home listening corner;
- wood table/shelf;
- generic turntable;
- one speaker or two speakers depending composition;
- practical lamp;
- 3–8 record spines in background;
- optional plant and chair.

Environment density:
- each hero room shot uses at least 5 recognisable secondary forms;
- secondary forms never use more line weight than character/record;
- record-spine text is abstract ticks/bars, not legible fake titles.

### 10.15 Speaker / sound

Speaker:
- cabinet rectangle with one larger woofer + smaller tweeter;
- woofer cone 90–150 px radius in medium shot;
- dirty playback: 1–3 irregular cone jolts;
- clean playback: smaller rhythmic excursion.

Sound lines:
- dirty: broken/angular, magenta/cyan;
- clean: smooth curves/rings, gold/teal.

They are emotional/graphic notation, not measured acoustics.

### 10.16 Recurring visual motif

The record circle is the film's recurring geometry.

It may become:
- sleeve reveal;
- lamp inspection circle;
- platter;
- cleaning platter;
- panel mask;
- speaker/music ring.

The circle must remain recognisably tied to a physical object whenever it carries story meaning.

### 10.17 Motion density target

Every production shot must have at least **three temporally distinct systems**, chosen from:
- character pose/action;
- prop mechanics;
- material response;
- panel motion;
- camera;
- reaction;
- sound graphics;
- environmental parallax.

But only one remains the dominant action.

### 10.18 Mistakes to avoid

- **Wrong:** fingertips lie across the playable groove field.  
  **Correct:** grip outer edge and/or label-safe area.

- **Wrong:** “vinyl record” is just a black circle.  
  **Correct:** outer edge, groove field, label, spindle hole and changing reflections make it unmistakable.

- **Wrong:** turntable and cleaning machine are the same generic rectangle.  
  **Correct:** turntable has platter/tonearm/cartridge; cleaning machine has fluid/brush/vacuum-contact logic.

- **Wrong:** bad sound is shown only as abstract magenta lightning.  
  **Correct:** stylus is playing, speaker/listener reacts, and graphic noise supports the physical event.

- **Wrong:** cleaning is a glow sweep that magically removes dots.  
  **Correct:** fluid → brush contact → rotating surface → vacuum removal → dry surface.

- **Wrong:** vacuum is a beam hovering above the record.  
  **Correct:** show a physical wand/contact slot and wet film converging into it.

- **Wrong:** cleaning implies scratches/wear are repaired.  
  **Correct:** only surface contamination/noise improvement is implied for this fictional record.

- **Wrong:** protagonist changes hairstyle/clothes/proportions between scenes.  
  **Correct:** copy the canonical model and pose library.

- **Wrong:** hands are mitten blobs when they perform the key action.  
  **Correct:** thumb/finger opposition and exact prop contact are visible.

- **Wrong:** every frame is covered in halftone, hatch and effects.  
  **Correct:** texture hierarchy preserves focal clarity.

- **Wrong:** comic panels are decorative windows.  
  **Correct:** every split/inset explains action, reaction, macro detail or comparison.

- **Wrong:** all motion is eased and floaty.  
  **Correct:** held key poses + decisive action + short settle, with smooth motion reserved for mechanics/camera.

- **Wrong:** clean playback is simply a different colour scene.  
  **Correct:** it deliberately mirrors first-playback geometry so reduced noise and changed reaction are obvious.

- **Wrong:** the viewer needs the storyboard to recognise what happened.  
  **Correct:** every still has a nameable verb and the 24-frame sheet exposes the full narrative.
