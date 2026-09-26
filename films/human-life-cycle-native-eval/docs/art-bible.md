# Art bible: Human Life Cycle

The visual rules every scene follows.
Where this file and a scene brief disagree on a colour, weight or rule, this file wins.
Where this file and `docs/storyboard.md` disagree on a position or a time, the storyboard wins.

Sections 1 to 9 are the house style, fixed by the reference analysis — change them only after a fresh one (the skill's `templates/reference-analysis.md` shows the method). Sections 2.2, the identity tints in 2.3, and 10 are rewritten per film from the captured research.

## 1. Frame

The canvas is 1080 px wide and 1920 px tall at 24 fps.
Every pixel value in this file assumes that size.
The origin is the top-left corner and y grows downward.

### 1.1 Shorts safe area

YouTube Shorts draws its own interface over the video.
The title and channel row covers roughly the bottom 380 px, the button column covers roughly x 950 to 1080 from y 1000 down, and the top bar covers roughly the top 180 px.
Anything the viewer must read (the subject, a match-cut shape, a glyph that carries meaning, the wordmark) sits inside x 60 to 940 and y 220 to 1540.
Backgrounds, stripes, grain, guide geometry, construction lines and decorative scenery run full bleed.
The safe area is non-negotiable: the storyboard may never move must-read content outside it. If a composition collides with it, move the scenery — never the must-read content.

### 1.2 Composition for a tall frame

Compose for the height, never crop a square.
Hanging, climbing, falling and rising subjects use the vertical axis.
The frame centre line x = 540 is the default axis for the subject.
Large subjects fill 60 to 90 percent of the frame width so they read on a phone.

## 2. Palettes

Names below are the keys of `FILM.lib.pal`.
Where a key already exists in `src/lib.js`, the value here is the published final value.
Colour is flat.
Tone in illustrated mode comes from hatching, never from gradients.
Radial glow halos are allowed only in schematic mode.

### 2.1 Warm illustrated palette (paper plate)

| Name | Hex | Use |
|---|---|---|
| paper | #EFE3C9 | Paper base |
| paperShade | #E2D1B0 | Paper shadow, tucked edges on white |
| paperDeep | #CDB58C | Paper vignette, deep paper tone |
| stripeCream | #F2E7CF | Stripe band A, default |
| stripeYellow | #EFDCA3 | Stripe band B, warm default |
| stripeApricot | #F0D9B5 | Stripe band B, dawn or tender acts |
| stripeSage | #DCE3CC | Stripe band B, foliage acts |
| stripeSpring | #E4EDD0 | Stripe band B, new-growth acts |
| stripeSky | #C9D3D2 | Stripe band B, open-sky acts |
| ink | #2A1C13 | Main outlines |
| inkSoft | #5B4331 | Secondary outlines, detail lines |
| inkFaint | #8A735C | Construction lines, graticule |
| tan | #C8A47A | Dry organic matter |
| ochre | #C38F2E | Earthy accent |
| rose | #C88C86 | Dusty rose accents |
| duskRose | #E3B1A1 | Dusk sky band |
| sage | #94A47F | Generic foliage |
| teal | #3C8783 | Water hatching, teal accents |
| tealDeep | #285F5D | Deep water hatching |
| sun | #F1BF4A | Sun disc |
| nightSky | #4E3F6E | Night sky band |
| night | #2F2748 | Deepest night, star-field base |
| white | #FBF6EA | Highlights, silk, moon |

Stripe band B changes by act; the storyboard assigns one per act.
`orange #D8742B`, `leaf #6E8F4F`, `wood #A8784C`, `sunset #E79D8F`, `dusk #5A4878` and `red #BF3F2C` stay available in `lib.pal` for incidental scenery.

### 2.2 Subject palette, warm

| Name | Hex | Use |
|---|---|---|
| selfWarm | #C86F4B | Primary individual figure and individual trajectory |
| selfDeep | #8A4934 | Deep hatching and shadow on the primary individual |
| selfPale | #E5A17D | Lit planes and younger-stage highlight on the primary individual |
| socialBlue | #6FA6B8 | Social-field figures, relation arcs and group rhythm |
| socialDeep | #315E70 | Dense social clusters and secondary social hatching |
| cycleGold | #D9A23E | Recurring cycle/progress motif and intergenerational transfer |
| memoryViolet | #80729C | Memory traces and accumulated experience |
| ageSage | #8C9B7C | Later-life secondary forms and quiet environmental accents |
| birthRose | #D9A19B | Birth / early-life tender accent, used sparingly |
| childSky | #89B9C8 | Childhood exploratory object / open-space accent |

### 2.3 Cool schematic palette (blueprint plate)

| Name | Hex | Use |
|---|---|---|
| navy | #0B1230 | Blueprint base |
| navyDeep | #060A1C | Near-black navy for the opening spark frame |
| navyLight | #18234D | Inset circle fills, panel tint |
| grid | #3A4A86 | 60 px grid lines |
| lavender | #C8C1EF | Main linework |
| lineWhite | #EEF0FF | Emphasis lines, veins, ticks |
| paleBlue | #9CC2EA | Secondary accent, frost |
| glow | #FFF3DC | Nucleus cores, sun glyph, glows |
| magenta | #FF3D98 | Moments of change only |

Subject identity tints:

| Name | Hex | Use |
|---|---|---|
| schemSelf | #F2A66A | Primary individual node / body line in schematic mode |
| schemSocial | #7CCDE0 | Social relation nodes / ties in schematic mode |
| schemCycle | #F1CB6B | Cycle/progress glyph and intergenerational continuity |

Subject tints are line or dot colours, never fills, and a schematic shot uses at most one of them besides magenta.

### 2.4 Overlay colours on illustrations

| Name | Hex | Use |
|---|---|---|
| annMagenta | #E43D8C | Change rings, trajectories, target rings |
| annBlue | #3B8EE0 | Trajectory and motion lines, fluid paths, rulers |
| annYellow | #EAB530 | Attention rings, brackets, tally rings, sun paths |
| teal | #3C8783 | Secondary guide lines when blue is already in use |

Overlays sit above the illustration at full opacity and never get hatched or grained.

## 3. Line

All widths are at 1080 px wide.
Illustrated lines come from `lib.inkPath` with pressure variation of plus or minus 25 percent.

### 3.1 Illustrated weights

| Element | Width | Colour and opacity |
|---|---|---|
| Hero subject outline | 5 px | ink 100% |
| Doubled hero outline, occasional | 1.5 px, offset 3 px | ink 40% |
| Secondary form outline | 3 px | ink 100% |
| Detail lines: segment rings, veins, ridges | 1.8 px | inkSoft 90% |
| Hatch strokes | 1.2 to 1.8 px | ink or the form's deep colour, 70 to 90% |
| Construction lines | 1.5 px | inkFaint 30% |

Hero-specific line treatments (for example the band widths of a wing's veins) are specified in section 10 with exact widths at a stated subject size, and scale with the drawn size.

### 3.2 Schematic weights

| Element | Width | Colour and opacity |
|---|---|---|
| Primary outline, double | outer 2.5 px and inner 1.5 px, 9 px apart | lavender 85% outer, 50% inner |
| Secondary outline | 1.5 px | lavender 60% |
| Lattice and cell lines | 1 px | lavender 30 to 40% |
| Grid | 1 px, 60 px pitch | grid 35% |
| Guide circles | 1.5 px | lavender 12 to 18% |
| Long diagonals | 1 px | lavender 12% |
| Ticks | 1.5 px, 10 to 20 px long | lineWhite 60% |
| Brackets | 1.5 px, end ticks 16 px | lavender 60% |
| Magenta flashes and rings | 3 px | magenta 100%, fading |

### 3.3 Overlay weights

| Element | Width |
|---|---|
| Attention and change rings | 3 px |
| Trajectory lines | 2.5 px |
| Dashed trajectories | 2.5 px, 14 px on and 10 px off |
| Motion rings | 2 px |
| Arc annotations | 2 px with 8 px end ticks |
| Rulers | 2 px, short ticks 12 px, long ticks 28 px |

## 4. Tone

### 4.1 Hatching

Light comes from the upper left, so shadow falls on the lower right of each form.
Only shadow sides and recesses get hatched, and lit sides stay flat colour.
The primary hatch runs at 45 degrees, rising from lower left to upper right.
Cross-hatch adds a second layer at 105 degrees for deep shadow.
Spacing sets the tone: 12 px for light shade, 8 px for mid shade, 5 px for dark shade, with the cross layer at 7 px.
Cylinders (stems, bodies, trunks) take contour hatching perpendicular to the long axis, slightly curved, 6 to 8 px apart, on the shadow half only.
Foliage takes hatching parallel to the side veins, between the veins.
Bark takes lengthwise hatching.
Water takes horizontal hatching, and coastlines take engraved hatching parallel to the coast that fades with distance offshore.
Every stroke jitters: angle plus or minus 3 degrees, spacing plus or minus 15 percent, each end plus or minus 6 px.

### 4.2 Stipple

Stipple dots have a radius of 1.0 to 2.2 px.
Use stipple for hairs, frost, stars, fine tissue texture, and the body texture of a subject seen very small.
Density runs from 0.002 dots per px² (sparse) to 0.02 dots per px² (dense).

### 4.3 Grain and boil

`core` lays paper grain over illustrated shots and fine noise over schematic shots, re-seeded on the 12 fps boil clock.
Scenes do not add their own full-frame grain.
Every ink and schematic line wobbles on the same 12 fps boil through `lib.boil(T)`, so still frames shimmer like drawn animation.

### 4.4 Stripes

The stripe background uses `lib.stripes` with a band width of 140 px at 30 degrees, rising left to right (`width: 140, angle: -0.52`).
Band A is stripeCream and band B changes by act, as listed in 2.1.
Stripes drift 6 px along their normal per beat unless a shot says otherwise.

## 5. Schematic language

The schematic shots explain what happens inside, and they never show the outside life.
Every schematic frame starts from `lib.blueprint`: navy base, 60 px grid, at least one large faint guide circle, and two long diagonals.
The subject is a double lavender outline with fine internal structure.
Cell structure is a lattice: hexagons (14 to 18 px cells) for tissue and eyes, rectangular cells for shells and sections.
Nuclei and points of activity are glow dots: core radius 8 to 10 px in glow, halo radius 40 px, and 8 to 16 radial ticks 14 to 22 px long at 70 percent.
Measurement is shown with brackets, tick scales and arc annotations, never with numbers.
No text appears in any schematic shot except the final wordmark.
Relationships are shown as a network: thin curved lavender lines from a source region to small circular node glyphs 90 to 120 px across.
Magenta marks a moment of change and each magenta event lasts at most 12 frames before fading.
PER FILM: design one recurring progress glyph that tracks where the story is (for example a ring split into one arc per story stage, the current arc lit). It sits at (900, 300) in every schematic shot.

## 6. Overlays on illustrations

Overlays show what the drawing cannot: paths, attention, sound, time and scale.
They are thin rings, arcs, straight guide lines, rulers and brackets in the four overlay colours.
Rings expand with `outExpo` and fade over 5 to 12 frames.
Trajectory lines draw on behind a moving subject at 24 fps.
Every illustrated shot carries at least one overlay and at most four overlay colours at once.

## 7. Motion

### 7.1 The on-twos rule

Anything that is drawn as a character or object moves on twos.
Compute its pose from `lib.onTwos(t)`, so it changes 12 times a second and holds each drawing for 2 frames.
Camera moves, zooms, overlay draw-on progress and ring expansion run at a full 24 fps so they stay smooth.
Line wobble follows the 12 fps boil clock.

### 7.2 Timing

The beat is 60/bpm seconds; at the default 120 bpm that is 0.5 s, which is 12 frames at 24 fps, an 8th note 6 frames and a 16th note 3.
Every pop, cut and hit lands on a beat, an 8th or a 16th, exactly on the frame.
Pops use `outBack` over 3 frames with a 6 to 10 percent overshoot.
Draw-ons use `outExpo` over 6 frames.
Character motion never eases for longer than one beat, and only camera moves may run slower.
Motion should feel snappy, never floaty.

### 7.3 Determinism

Seed every random choice from `lib.hash(shotId, ...)` through `lib.rng`.
A scene draws from `t` alone and never depends on a previous frame.
A scene may be asked for `t` slightly beyond its duration during a transition, so clamp to the final pose.

## 8. Match cuts

A match cut keeps a shape on the same pixels across a mode change.
The shared geometry tables live in `docs/storyboard.md`, section "Shared geometry", and scenes copy those numbers exactly.
Line weights may change across the cut, positions may not.

## 9. Wordmark

The wordmark is the film's word in lowercase.
Draw it with `lib.text` in a thin system sans-serif (light weight), 44 px, letter-spacing 0.12 em, lavender at 85 percent.
It is centred on x = 540 with its baseline at y = 1470, inside the Shorts safe area (the bottom-right corner sits under the button column).
The baseline stays at y = 1470. If the closing diagram collides with the wordmark, move the diagram — never the wordmark.

## 10. Human subject reference

Research source capture lives in `.tmp/research/HUMAN_LIFE_CYCLE_RESEARCH.md`.
Sourced biological and life-course claims are kept separate from invented drawing conventions. The film is not a universal biography: environments and props are chosen for visual continuity and readability.

### 10.1 Recurring protagonist: identity model

From later childhood onward, the same protagonist must remain recognizable even when the face is tiny.

Canonical identity cues:

- warm rust-orange upper garment: `selfWarm`;
- dark ink / deep-rust shaded lower garment;
- a small asymmetrical hair silhouette, higher on screen-left and flatter on screen-right;
- a narrow pale face plane, never a circular emoji head after infancy;
- warm-gold continuity marker near the sternum only when the shot needs an explicit handoff;
- the `selfWarm` trajectory never crosses through the body; it passes behind or below it.

Adult standing envelope at full figure scale:

| Part | Screen measure |
|---|---:|
| total standing height | 690–740 px |
| head height | 92–108 px |
| shoulder width | 230–280 px |
| pelvis width | 150–190 px |
| hand length | 55–70 px |
| foot length | 90–115 px |

These are film drawing conventions, not biometric standards.

The adult is never drawn as a five-line stick figure. At phone scale the silhouette must still show: head mass, neck, shoulder slope, ribcage wedge, pelvis wedge, upper/lower limbs with joint bends, hands or mitt forms, feet, clothing edge, and at least two shadow/hatch regions.

### 10.2 Face and head

The face is a three-quarter simplified ink construction unless a shot explicitly calls for profile.

Minimum readable construction for a medium or close figure:

- cranium as an asymmetric oval rather than a perfect circle;
- jaw taper with a visible chin point;
- ear on the far side at eye-to-nose height;
- one eyebrow / eye line on the near side and a shorter far-eye mark;
- nose bridge plus tip wedge;
- mouth as two short unequal strokes;
- hair mass as 3–5 large locks, not individual hairs;
- neck enters behind the jaw and widens into trapezius/shoulder slope.

At small crowd scale, reduce to cranium + jaw + hair silhouette. Do not reduce the protagonist's head to a filled circle if it occupies more than 45 px in height.

### 10.3 Hands and gesture

Hands carry several story beats, so they get a canonical simplified construction:

- palm: tapered pentagon;
- thumb: separate wedge;
- fingers: one grouped mitten edge plus 2–3 notch lines unless the hand is a close-up;
- wrist is narrower than palm;
- reaching hands open with the thumb opposed;
- receiving hands rotate palm-up;
- older-age hands may show one extra knuckle contour and slower motion, but no caricatured claw shape.

A reciprocal handoff is staged so the two palms approach from different diagonals. The cycleGold transfer point sits in the negative space between them before either hand closes.

### 10.4 Newborn / infant

The birth shot uses recognisable infant mass without medical detail.

- head height approximately one quarter of drawn body length;
- cranium larger than face;
- jaw very small;
- neck mostly hidden by shoulder / wrap;
- upper and lower limbs remain flexed;
- hand is a small mitten with a thumb notch;
- feet are broad soft wedges;
- torso is a rounded bean shape, not an adult mini-body.

The infant is supported by an adult forearm and cloth shape. The supporting adult is cropped so the newborn remains the subject.

Wrong: adult proportions shrunk down.
Correct: large cranium, short flexed limbs, compact torso and supported posture.

### 10.5 Child

The child design is a true intermediate body, not a scaled adult.

First-steps figure:

- total figure height around 430–500 px;
- head height around 95–110 px;
- torso short, pelvis broad relative to legs;
- arms lifted away from torso for balance;
- feet set wider than shoulder width;
- knees visibly bent;
- one foot may roll from heel to flat on a beat.

Exploration figure:

- legs lengthen;
- torso narrows;
- stride opens;
- reaching shoulder rotates forward;
- clothing gains a small scarf/hem or pocket flap that can lag on twos.

The child's warm-orange garment is introduced by shot 05 and survives into later stages as the protagonist identity cue.

### 10.6 Adolescent / young adult

The adolescent passage is a morphological bridge toward adult proportions.

- figure height grows relative to head size;
- shoulders and pelvis become more adult-like over the transition;
- limbs lengthen before the final adult torso settles;
- the protagonist's silhouette must remain distinct from peers through garment colour, hair asymmetry and trajectory;
- peers vary in height, stance, clothing colour and phase.

Research basis: NIMH describes adolescence as an important period of ongoing brain development and increased salience of social experience. The film translates this into a move from internal network geometry to a richer peer field; the network is symbolic.

Wrong: identical clones surrounding the protagonist.
Correct: 3–5 visibly different peer figures with uneven spacing and different gesture rhythms.

### 10.7 Adult figure construction

Canonical adult construction uses six masses:

1. cranium + jaw;
2. ribcage as a tapered oval/wedge;
3. pelvis as a shorter opposing wedge;
4. paired upper arms / forearms;
5. paired thighs / shins;
6. hands and feet.

Joints are not dots. The elbow and knee are directional angle changes in the contour.

Clothing:

- upper garment has collar/neck opening, shoulder seam, hem and 3–6 fold strokes;
- lower garment has waistband/pelvis seam, knee fold and outer-leg shadow;
- shoe is a low wedge with sole line.

Hatching:

- under chin;
- far side of ribcage;
- inside elbow / far forearm;
- inner thigh and calf on shadow side;
- under garment hem.

The protagonist gets at least one contour break where the warm garment meets skin or lower garment, so the body reads as a dressed person rather than a pictogram.

### 10.8 Social field

WHO social-connection material supports treating relationships as consequential throughout life. The visual field must therefore contain recognisable people, not only anonymous graph nodes.

Crowd/group rules:

- groups are 2–5 figures with gaps between groups;
- at least three body orientations in a crowd shot;
- garment palette rotates among socialBlue, ageSage, birthRose, ochre/tan neutrals and paper-dark ink;
- no repeated clone spacing;
- one figure can be seated, one leaning, one walking, one turned in conversation;
- faces at small scale reduce to hair + jaw + single nose/eye mark;
- depth uses three size bands: near 0.9–1.0, middle 0.65–0.8, far 0.4–0.55.

The protagonist remains readable by warm garment, trajectory and slightly higher local contrast.

### 10.9 Relationship choreography

Close relationship shots use reciprocal physical staging rather than abstract symmetry.

Readable actions include:

- pass / return of a small object;
- hand placed near another forearm;
- two people leaning toward a shared task;
- seated conversation with alternating gesture;
- walking side by side with asynchronous steps.

The relationship is not coded as romantic, familial or professional unless the storyboard names it. It is simply a human bond.

### 10.10 Environments

The illustrated plate must feel inhabited. Each major life stage gets concrete foreground, middle-ground and background material.

#### Early home / birth

- cloth folds;
- supporting forearm;
- low lamp or window rectangle as soft background geometry;
- one table edge or chair curve kept subordinate.

#### First steps

- floorboards or courtyard stones as perspective guides;
- low stool / chair edge;
- one plant or toy-like geometric object;
- open floor in front of child for motion.

#### Childhood exploration

- tall grass / garden stems or park-edge plants;
- fence/post rhythm or building edge in far background;
- kite / paper glider / wind object as reach target;
- clouds or tree crowns as vertical depth anchors.

#### Peer / adult social space

- pavement or plaza bands;
- bench / steps / table edge;
- clustered people at different depths;
- doorway or building façade lines to give scale.

#### Contribution / making

- long shared worktable;
- paper sheets / tools / small assembled object;
- hands from both figures actually manipulate the object;
- shelves or peg-board / window in background;
- memoryViolet appears as a trace left by the made object, not as an arbitrary line.

#### Later-life garden

- seated or gently walking protagonist;
- ageSage foliage with warm paper gaps;
- one close companion;
- rail / bench / path edge for depth;
- young plant / seed head as visual bridge to the intergenerational ending.

### 10.11 Biological beginning

Research basis: NICHD describes conception producing a zygote that becomes a cluster of cells.

Drawing rules:

- one founding cell uses G1 at 190–220 px diameter;
- outer membrane double line;
- nucleus glow has a small core and halo;
- division is discrete 1 → 2 → 4 → 8;
- daughter cells deform slightly against neighbours instead of remaining perfect non-touching circles;
- the cell cluster sits in faint tissue / fluid guide geometry so it is not a row of UI dots;
- after 8 cells, the cluster compresses and elongates into a body-axis gesture without pretending to show a literal embryo stage.

Wrong: eight identical glowing icons floating independently.
Correct: a contained cluster with contact deformation, membrane depth and one continuous transformation.

### 10.12 Learning / internal network

The schematic learning shot is symbolic.

- G2 head silhouette remains identifiable with forehead, jaw and neck, not a plain ellipse alone;
- 40–70 fine branch segments may grow in 3 depth groups;
- 12–20 node points vary in size;
- some connections strengthen while others fade;
- one branch exits the head and becomes the reaching-arm trajectory at the match cut;
- the head interior gets sparse lattice / contour guides so the network feels embedded in a body, not floating on a slide.

No labels, numbers or anatomical-region claims.

### 10.13 Social schematic system

The schematic social field keeps recognisable human traces.

- primary G3 node can be nested inside a faint torso/shoulder contour;
- satellite nodes sit in 3 irregular clusters rather than a radial star;
- ties are curved and have 3 weight classes;
- at least two nodes have secondary micro-links to show that other people have lives beyond the protagonist;
- one close tie visually transforms into the arm/hand curve of the following illustrated shot;
- two ties may dim to show changing relation strength without implying failure.

### 10.14 Ageing

WHO life-course framing includes healthy ageing, and WHO social-connection material does not justify equating age with isolation.

The older protagonist is the same person:

- same hair asymmetry, now simplified and lighter;
- same garment family, muted toward selfDeep / ageSage;
- posture flexes slightly at hip and upper back;
- step length shortens;
- arm swing is smaller;
- gestures hold for longer;
- face gains 2–4 short wrinkle/fold marks, never a dense caricature;
- hands show one extra knuckle contour;
- at least one companion remains clearly present.

### 10.15 Intergenerational handoff

The final passage is across generations, not reincarnation.

Three age bands may coexist:

- older protagonist;
- middle adult;
- younger child.

The warm-gold transfer point is passed through hands or through a shared object/seed rather than teleporting between isolated icons.

The younger figure starts a new selfWarm trajectory after receiving the point. Its path is visually related to, but not continuous with, the older protagonist's path.

### 10.16 Recurring progress and cycle geometry

Schematic progress glyph:

- centre (900, 300);
- radius 72;
- 18 arcs;
- completed arcs lavender at 28%;
- current arc schemCycle;
- future arcs grid at 22%;
- copied verbatim from the canonical helper, never re-derived per scene.

Shared geometry:

- G1 cycle / founding-cell halo: centre (540,700), radius 150, outer guide radius 184;
- G2 child/head continuity: centre (540,720), rx 72, ry 92, but the visible head contour adds jaw/neck around the invariant ellipse;
- G3 primary social node: centre (540,820), radius 48;
- G4 transfer point: centre (540,920), radius 18.

### 10.17 Density floor for illustrated scenes

Every illustrated scene must contain, at minimum:

- one fully constructed primary figure or biological subject;
- one middle-ground element;
- one background depth cue;
- one surface-detail family: hatch, fold, foliage, hair, fabric, floor or architectural texture;
- one overlay or recurring continuity device;
- at least three independently timed visual state changes.

A scene that can be described as “circle + five lines + one arc” is still a stub, even if the gate passes.

### 10.18 Density floor for schematic scenes

Every schematic scene must contain, at minimum:

- a primary double-outline subject;
- internal structure, not only nodes;
- guide geometry;
- at least two hierarchy levels of line weight;
- 20+ visible structural marks at the representative middle frame;
- one beat-synchronised transformation;
- progress glyph copied from the canonical helper when applicable.

### 10.19 Mistakes to avoid

- Wrong: stick-figure protagonist. Correct: constructed human masses, clothing, hands/feet and shadow regions.
- Wrong: social human equals a faceless homogeneous crowd. Correct: varied clusters, reciprocal gestures, unequal ties and depth.
- Wrong: schematic means empty navy background with a few dots. Correct: dense but legible structural drawing.
- Wrong: adolescence equals rebellion. Correct: ongoing development plus increased peer/social salience only.
- Wrong: ageing equals collapse or loneliness. Correct: same identity, altered tempo/posture, retained connection.
- Wrong: final child is literally the same person returning. Correct: intergenerational continuity with a new path.
- Wrong: exact embryological timing is implied. Correct: broad symbolic cell progression only.
- Wrong: overlays carry the scene while the drawing underneath is empty. Correct: overlay explains or punctuates an already readable illustrated event.

