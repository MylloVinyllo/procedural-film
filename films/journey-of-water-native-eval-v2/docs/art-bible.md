# Art bible: The Journey of Water

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

These values are the water film's published subject colours and are mirrored exactly into `src/lib.js`.

| Name | Hex | Use |
|---|---|---|
| waterBody | #72AEB4 | Main liquid-water fill in illustrated shots |
| waterDeep | #3E747B | Shadow side of deeper liquid, underside of waves |
| waterPale | #C9E0DE | Thin films, transmitted light, small transparent-looking water masses |
| waterFoam | #F6F1E3 | Foam, bubble rims, bright splash fragments |
| cloudBody | #E8E3D7 | Warm-paper cloud mass |
| cloudShade | #B8C0BE | Cloud underside and dense condensed regions |
| cloudBackA | #E2E0D9 | Cool rear cloud lobe A |
| cloudBackB | #E8E3D7 | Warm rear cloud lobe B |
| cloudBackC | #D9D9D4 | Cool rear cloud lobe C |
| cloudBackD | #E4E1D9 | Warm rear cloud lobe D |
| cloudBackE | #D7D7D2 | Lower rear cloud lobe E |
| cloudBackF | #D3D4D0 | Lower rear cloud lobe F |
| cloudMidA | #E9E4DA | Mid cloud lobe A |
| cloudMidB | #E1DED5 | Mid cloud lobe B |
| cloudMidC | #DCDAD2 | Mid cloud lobe C |
| cloudMidD | #E7E2D9 | Mid cloud lobe D |
| cloudMidE | #E3DFD5 | Mid cloud lobe E |
| cloudMidF | #DDDAD1 | Mid cloud lobe F |
| cloudFrontA | #ECE7DC | Foreground cloud lobe A |
| cloudFrontB | #E7E2D8 | Foreground cloud lobe B |
| cloudFrontC | #EAE5DB | Foreground cloud lobe C |
| cloudFrontD | #E4E0D7 | Foreground cloud lobe D |
| stormGray | #8E9DA3 | Rain shafts and heavy-cloud accents |
| soilBody | #9A6B47 | Mineral/organic soil matrix |
| soilDeep | #694833 | Deep soil shadow, saturated pockets |
| stoneBody | #9B9488 | Gravel and river stones |
| stoneDeep | #66625C | Stone shadow |
| riverBank | #9A8A5E | Stream and river banks |
| filterSand | #D2B275 | Sand bed in treatment/filter scenes |
| filterGravel | #86715D | Gravel filter layer |
| pipeBody | #6D858A | Water mains, treatment pipes and channels |
| pipeDeep | #465A60 | Pipe interiors and shadow |
| flocBody | #B58B69 | Coagulated/floc particles in treatment scenes |
| seaBody | #4E8E94 | Open-ocean surface |
| seaDeep | #2E676E | Deep-ocean / shadow water |
| aerosolDust | #BCA98C | Aerosol/dust nuclei in atmosphere close-ups |
| leafWet | #769766 | Wet leaf body and reflected water-edge tint |

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

Subject identity tints for this film: `schemWater #74D3E2`, `schemFlow #55B5D2`, `schemCycle #F0C85E`. They are line or dot colours, never large fills, and a schematic shot uses at most one water tint besides magenta unless a storyboard entry explicitly needs the flow/cycle pair.
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

## 10. Subject reference

Sources checked on 2026-09-26: USGS Water Cycle; USGS Condensation and Precipitation; NOAA/NWS Raindrop Shape; USGS Infiltration, Runoff, Streamflow and Groundwater Flow; EPA Public Water System; NASA/USGS Evaporation and Transpiration; EPA Wastewater Return. Captures live in `.tmp/research/`.

This section separates researched physical facts from house drawing conventions. When a proportion or pixel size below is labelled a drawing convention, it is a production choice rather than a claim about a universal natural measurement.

### 10.1 The tracked water parcel

The protagonist is not an anthropomorphic droplet and never has a face.

The film follows a visually traceable parcel of water as an editorial device:
- in an isolated liquid drop, the parcel is the whole drop;
- after mixing into a stream, river, treatment tank or ocean, the parcel becomes a highlighted local streamline / cluster of small highlights;
- in vapor, it becomes a small group of separated schemWater points rather than one intact liquid blob;
- in a cloud, the tracer is carried by one small cluster among many droplets;
- when condensation forms a larger liquid drop again, the tracer reconverges.

This avoids implying that one macroscopic drop remains physically isolated after mixing.

Canonical identity devices:
- one small cycleGold glint on illustrated water;
- a matching `schemCycle` tracer point in schematic mode;
- a short three-segment internal highlight curve repeated whenever a coherent liquid body is large enough;
- flow direction continues across cuts whenever the physics/story permits.

Drawing convention for a hero drop at medium scale:
- nominal isolated radius: 95 px;
- highlight arc: 38 to 52 px long, 4 px wide;
- internal glint: 7 to 10 px;
- shadow-side hatching: horizontal or contour-following, 10 to 14 px spacing.

### 10.2 Cloud condensation and droplet field

Research basis:
- condensation changes water vapor into liquid;
- cloud droplets form around tiny particles such as dust, salt or smoke;
- cloud droplets are much smaller than precipitation-sized drops;
- droplets grow through condensation/coalescence, and only sufficiently large particles fall as precipitation.

Illustrated/cloud drawing:
- cloud mass fills 65 to 95 percent of the frame width;
- visible outer cloud is 6 to 12 overlapping lobes, not one scalloped cartoon outline;
- cloudBody is lit upper-left; cloudShade occupies lower-right/lower-centre folds;
- inside a macro inset, draw 80 to 180 microdroplets, with most 2 to 5 px and a smaller number 8 to 15 px;
- aerosol nuclei are 1 to 2 px aerosolDust points inside some microdroplets;
- 4 to 8 local coalescence pairs are enough to explain growth without turning the shot into random particles;
- one tracer cluster contains the cycleGold/schemCycle identity.

Schematic close-up:
- nuclei/droplets sit inside a faint turbulent flow field;
- use small guide circles to distinguish aerosol core, condensed shell and larger coalescing drop;
- magenta may flash only at actual merge/coalescence events.

### 10.3 Falling raindrop geometry

Research basis from NOAA/NWS:
- a falling raindrop is not a pointed teardrop;
- small drops around 1 mm or less are close to spherical;
- larger drops flatten on the bottom as aerodynamic pressure matters more;
- very large drops can develop a concave lower surface and become unstable.

Drawing rules:
- small falling drop: near circle, rx:ry 1.00:1.00 to 1.00:1.06;
- medium hero drop: width 185 to 220 px, height 160 to 190 px, upper dome round, lower third flattened;
- large unstable drop: width 230 to 270 px, height 170 to 200 px, slight lower-centre indentation;
- never draw a pointed top while the drop is free-falling;
- fall direction is shown by environment/rain streaks and camera relation, not by a teardrop icon.

Motion:
- acceleration is readable through growing background streak/parallax speed;
- drop outline changes on twos but camera may track smoothly;
- the lower surface flexes by 4 to 10 px across a motion cycle;
- small satellite droplets may oscillate out of phase.

### 10.4 Impact and splash

This is a cinematic drawing convention grounded in ordinary liquid behaviour rather than a measured laboratory reconstruction.

Impact state sequence:
1. coherent falling drop, 1 frame before contact;
2. compressed pancake / contact disk;
3. outward crown rim, 8 to 14 primary lobes;
4. 10 to 28 ejected droplets with size falloff;
5. rim collapses into a thin spreading film;
6. tracer glint remains in one local branch of the spreading water.

At 1080 px width:
- impact disk: 180 to 260 px;
- crown outer radius: 150 to 230 px;
- crown wall height: 35 to 80 px;
- largest secondary droplets: 12 to 28 px;
- smallest readable droplets: 3 to 6 px.

Use waterFoam only for bright rim/splash edges, never as a full fill.

### 10.5 Water on a leaf and transpiration

Research basis:
- plants take water up through roots, move it through tissues, and release water vapor through stomata;
- transpiration is normally invisible.

Illustrated surface-bound water:
- a droplet on a leaf is drawn as a dome/lens attached to the leaf plane, not as a falling raindrop;
- the leaf bends 3 to 12 px under the hero drop as a visual weight cue;
- leaf veins continue beneath/behind the water lens with a simplified refracted offset;
- water edge uses a 2 to 3 px waterDeep contact contour and a waterPale interior.

If the story branches through plant uptake:
- root-to-leaf transport is a schematic side branch, not a literal fast pipe;
- stomatal release is shown as many tiny vapor points leaving the underside region of the leaf;
- do not show visible steam jets from stomata.

### 10.6 Soil infiltration and pore space

Research basis:
- precipitation can infiltrate soil or become runoff;
- infiltration depends on soil characteristics, saturation, vegetation, slope and rainfall;
- unsaturated-zone pores contain both air and water;
- below the water table, pores are saturated;
- groundwater moves through pores/fractures and can later discharge to surface water.

Macro soil plate:
- top litter/root layer: 120 to 180 px;
- upper soil: irregular 30 to 90 px aggregates with roots;
- sandier zone: smaller separated grains and wider pore channels;
- denser clay-like zone: tighter fine texture and narrower connected channels;
- one side branch may show a saturated pocket where voids are fully filled with water.

Motion:
- infiltrating water splits into several channels;
- tracer takes one branch;
- thin films creep along grain boundaries slower than open-pore flow;
- trapped air pockets compress/displace but do not vanish instantly.

Schematic pore close-up:
- grains are warm/stone outlines;
- pore water is schemWater lines and partial fills;
- air voids stay navy;
- a dashed water-table guide may separate unsaturated and saturated zones.

### 10.7 Surface runoff

Research basis:
- runoff is precipitation moving over land under gravity;
- impervious surfaces accelerate runoff toward drains/streams;
- vegetation can slow runoff and increase opportunity for infiltration.

Drawing rules:
- natural slope: water forms branching rivulets around stones/roots;
- urban surface: water forms a thin reflective sheet with 3 to 7 converging channels toward a curb/drain;
- flow lines are not parallel everywhere; they bend around obstacles;
- small debris (leaf fragment, grit) provides readable surface speed.

The tracer must stay inside the moving water, not hover as an overlay disconnected from the fluid.

### 10.8 Stream and river flow

Research basis:
- runoff and groundwater/baseflow feed streams;
- streams merge into larger streams and rivers and ultimately can return water to the ocean.

Illustrated stream:
- foreground bank, midstream channel and far bank create at least three depth layers;
- water surface uses 20 to 60 horizontal/curved hatch strokes;
- stones distort local flow into split/rejoin streamlines;
- foam appears only at fast local disturbances;
- tributary merge should be visible as two differently oriented flow fields joining.

River scale transition:
- camera pulls back 6x to 20x between creek and river;
- the tracer becomes a small local golden/teal streamline rather than a giant glowing drop;
- secondary objects may include reeds, bridge pier, sediment bars, birds or distant structures, but none should dominate the flow story.

### 10.9 Human water intake and drinking-water treatment

Research basis from EPA:
- public systems use surface water or groundwater;
- treatment commonly includes coagulation/flocculation, sedimentation, filtration and disinfection;
- treated water may be stored, then pumped through mains and smaller service lines.

Treatment-train schematic:
1. intake channel with suspended particles;
2. rapid-mix/coagulation event;
3. flocculation basin where small particles become larger `flocBody` clusters;
4. sedimentation zone where larger flocs sink;
5. filter column with sand/gravel layers;
6. disinfection/contact chamber shown as a process stage without implying one universal chemical;
7. storage tank;
8. main pipe → smaller service pipe.

At quarter scale, each stage must be distinguishable by geometry, not text labels.

Motion:
- water maintains left-to-right or top-to-bottom process direction;
- solids move differently from water so separation is visually obvious;
- filter scene pushes through the actual pore spaces rather than using a generic wipe.

### 10.10 Domestic use and wastewater return

Research basis from EPA:
- sewers collect wastewater from homes/businesses and carry it to treatment;
- typical municipal treatment includes screening/grit removal, primary settling, secondary biological treatment and disinfection;
- treated effluent may be discharged to receiving waters or reused.

Illustrated domestic beat:
- use one physical water interaction such as faucet → glass/sink → drain;
- avoid a generic city icon montage.

Wastewater schematic:
- coarse screen catches large solids while water passes;
- grit/settling stage slows the flow and sends dense particles downward;
- biological stage is shown as dense microbe/floc texture with aeration bubbles, not as green “clean” sparkles;
- final treated effluent rejoins a receiving stream via a clear discharge channel.

The film may simplify the plant to 2 to 3 shots, but it must preserve the sequence rather than jump directly from sink to river.

### 10.11 Pipe flow

Drawing convention:
- main pipe inner diameter on screen: 280 to 420 px in macro;
- service pipe: 120 to 220 px;
- pipe walls are double contours with pipeBody exterior and pipeDeep interior;
- water occupies the full pipe cross-section in pressurised distribution;
- tracer moves as one highlighted streamline among many.

Secondary motion:
- tiny entrained bubbles or particles move at slightly different speeds;
- bends create curved flow lines;
- valve/pump geometry may provide parallax, but must not become the hero.

### 10.12 Ocean arrival

Research basis:
- oceans contain the great majority of Earth’s water and are the dominant water reservoir;
- runoff/rivers and groundwater return water to the ocean;
- ocean evaporation is a primary route back to atmospheric moisture.

Scale ladder:
- river mouth / estuary;
- shore/surface wave;
- wide ocean;
- macro surface layer under sunlight.

Illustrated ocean:
- seaBody top bands and seaDeep troughs;
- 3 to 6 wave scales coexist: large swell, mid ripples, tiny capillary lines;
- foam appears at breaking crests only;
- tracer is a small local highlight that quickly becomes visually subordinate to the larger reservoir.

### 10.13 Evaporation

Research basis:
- solar energy drives evaporation;
- liquid water changes to water vapor;
- evaporation from oceans/water bodies supplies most atmospheric moisture.

Do not draw vapor as miniature liquid droplets rising unchanged.

Transition sequence:
1. sun/heat overlay reaches surface;
2. individual surface highlights separate;
3. coherent liquid contour disappears for those particles;
4. schemWater points rise with increasing spacing;
5. camera follows into cooler atmosphere;
6. points later reconverge as condensed droplets.

Illustrated surface may show shimmer and tiny departing highlights; the actual phase explanation belongs in schematic mode.

### 10.14 Return to cloud

Research basis:
- rising air carries water vapor upward;
- cooler air favours condensation;
- droplets form around condensation nuclei and can aggregate into visible clouds.

The final condensation scene reuses the cloud microstructure from 10.2 but reverses the scale journey:
- isolated vapor points;
- aerosol encounter;
- microscopic liquid shell;
- growing droplet field;
- pull-back to one cloud lobe;
- final composition matches the opening cloud geometry.

### 10.15 Shared continuity geometry

These are production invariants used by the storyboard.

G1 — hero rain drop:
- centre (540, 720);
- free-fall medium drop bounding box 210 × 180 px;
- internal cycleGold glint at local offset (-34, -28).

G2 — surface lens / pore:
- centre (540, 820);
- outer guide radius 118 px;
- tracer point on the lower-right quadrant at 32 degrees.

G3 — flow cross-section:
- centreline y = 920;
- nominal highlighted streamline runs x 300 → 780;
- cycleGold tracer occupies a 14 px point on that streamline.

G4 — ocean/evaporation circle:
- centre (540, 760);
- radius 165 px;
- used as wave-surface macro guide and later cloud condensation guide.

Every scene that claims a match cut on G1–G4 copies these coordinates exactly.

### 10.16 Recurring progress glyph

Position: centre (900, 300), safe-area edge convention from the house style.

Design:
- 12 short arcs arranged as a circular hydrologic orbit;
- completed arcs: lavender at 25%;
- current arc: schemCycle at 100%;
- future arcs: grid at 20%;
- one 5 px schemWater bead sits at the leading edge of the current arc;
- radius 72 px;
- each arc spans 62% of its 30-degree slot.

This is a navigation glyph only. It never substitutes for the physical process in the main composition.

### 10.17 Material texture rules

Liquid water:
- horizontal/flow-aligned hatching;
- sparse white highlight strokes;
- no gradients.

Cloud:
- clustered overlapping masses;
- cross-hatching only in deepest underside folds;
- microdroplet stipple in close-up.

Soil:
- irregular grain/aggregate outlines;
- roots as tapered branching lines;
- pore water occupies spaces between grains.

Metal/concrete infrastructure:
- straighter ink lines than organic forms;
- faint construction guides and repeated bolts/ribs;
- surface shading with 45-degree hatch.

Ocean:
- nested flow bands rather than one blue rectangle;
- foam and micro-ripples are local events.

### 10.18 Mistakes to avoid

- Wrong: a falling raindrop is a pointed teardrop. Correct: small drops are near-spherical; larger falling drops flatten underneath.
- Wrong: one giant glowing droplet remains isolated through river, pipe and ocean. Correct: after mixing, follow a highlighted parcel/streamline.
- Wrong: clouds are one scalloped white blob. Correct: use layered lobes plus a separate microdroplet field when close.
- Wrong: rain instantly becomes a river. Correct: explicitly split runoff/infiltration/plant pathways.
- Wrong: groundwater is an underground blue river. Correct: draw water moving through pores/fractures and saturated material.
- Wrong: stream water is a static blue ribbon. Correct: show flow deformation around stones, tributary merging and surface texture.
- Wrong: urban water treatment is a magic filter. Correct: preserve a treatment train with distinct separation processes.
- Wrong: water leaves a faucet and jumps straight to the sea. Correct: if domestic use is shown, include collection/treatment before receiving water.
- Wrong: evaporation is small liquid beads floating upward unchanged. Correct: the coherent liquid boundary disappears as vapor is represented.
- Wrong: every shot centres a decorative droplet icon. Correct: let the hero change scale/state and sometimes become a tracer within a much larger system.
- Wrong: complexity means random particles. Correct: every secondary element must explain material, scale, flow, environment or transition.

