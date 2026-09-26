# Storyboard: Human Life Cycle

## Logline

One individual life begins, develops, enters a web of other lives, ages, and passes continuity forward while remaining visually distinct inside the social field.
The method alternates hand-inked paper life moments with blueprint views of cells, development, social systems and memory, using recurring geometry and match cuts so cyclicity is structural rather than decorative.

## Numbers

- 120 bpm
- beat = 0.5 s = 12 frames
- bar = 2.0 s = 48 frames
- duration = 32.0 s = 16 bars = 768 frames at 24 fps
- 18 shots
- every shot is 1.0 to 2.5 s and every boundary lies on the 0.5 s beat grid

## Summary

| Order | Id | Start | End | Mode | Title |
|---|---|---:|---:|---|---|
| 01 | adult-hero | 0.000 | 1.500 | illustrated | One life |
| 02 | cell-genesis | 1.500 | 4.000 | schematic | Beginning |
| 03 | birth | 4.000 | 5.500 | illustrated | Arrival |
| 04 | growth-ladder | 5.500 | 8.000 | schematic | Growth |
| 05 | first-steps | 8.000 | 10.000 | illustrated | A path |
| 06 | learning-network | 10.000 | 11.500 | schematic | Learning |
| 07 | childhood-explore | 11.500 | 13.500 | illustrated | Explore |
| 08 | social-salience | 13.500 | 14.500 | schematic | Peers |
| 09 | one-among-many | 14.500 | 16.000 | illustrated | I among us |
| 10 | social-network | 16.000 | 18.000 | schematic | We |
| 11 | bond | 18.000 | 20.000 | illustrated | Relation |
| 12 | role-system | 20.000 | 21.500 | schematic | Roles |
| 13 | create-contribute | 21.500 | 24.000 | illustrated | Contribution |
| 14 | memory-field | 24.000 | 25.500 | schematic | Traces |
| 15 | ageing-connected | 25.500 | 27.500 | illustrated | Later life |
| 16 | generation-spiral | 27.500 | 29.000 | schematic | Across generations |
| 17 | handoff | 29.000 | 30.500 | illustrated | Continue |
| 18 | seed-loop | 30.500 | 32.000 | schematic | Again |

## Structure

- Act 1, bars 1–4, T 0–8: the finished human hooks the film, then the story dives back to biological beginning and rapid developmental scale.
- Act 2, bars 5–8, T 8–16: individual trajectory, learning, childhood exploration and adolescent social salience.
- Act 3, bars 9–12, T 16–24: midpoint hinge into “We”, close bonds, social roles and contribution.
- Act 4, bars 13–16, T 24–32: accumulated traces, ageing, intergenerational continuity, handoff and loop.

Midpoint downbeat: T 16.000, shot 10 starts on G3.

Plate pattern: illustrated / schematic alternates for all 18 shots.

Match cuts:
- 01 → 02: G1 cycle halo becomes founding-cell guide.
- 04 → 05 → 06: G2 head/proportion anchor bridges growth comparison, first steps and learning network.
- 08 → 09 → 10: G3 primary social node becomes the hero’s chest marker, then the midpoint network node.
- 16 → 17 → 18: G4 transfer point passes between generations, then expands to G1.
- 18 → 01: G1 closes the loop into the opening adult halo.

Time devices:
- 18-arc progress glyph in every schematic shot, canonical helper owned by shot 02.
- selfWarm trajectory persists across illustrated life stages.
- memoryViolet traces reappear in shot 14.
- final loop returns to the opening G1 composition.

Act stripe B:
- Act 1: stripeApricot
- Act 2: stripeSky
- Act 3: stripeSage
- Act 4: stripeSpring / stripeApricot in later-life shot 15

Safe area review:
All must-read subjects, match-cut geometry, progress glyph and wordmark remain inside x 60–940, y 220–1540. Decorative scenery alone may exceed it.

## Conventions

- T is global seconds, t is shot-local seconds.
- Camera moves use lib.camera; shared geometry is screen-fixed.
- Hard cuts are default.
- Character/object motion is on twos; camera and overlays remain 24 fps.
- Schematic scenes contain no text except the final wordmark.

## Shared geometry

### G1: cycle halo / founding cell
| Property | Value |
|---|---:|
| centre x | 540 |
| centre y | 700 |
| radius | 150 |
| outer guide radius | 184 |

Used by 01 → 02 and 17 → 18 → 01 loop. Screen-fixed across each cut.

### G2: child head match
| Property | Value |
|---|---:|
| centre x | 540 |
| centre y | 720 |
| rx | 72 |
| ry | 92 |

Used by 04 → 05 → 06. The outline may change line language, not position.

### G3: primary social node
| Property | Value |
|---|---:|
| centre x | 540 |
| centre y | 820 |
| radius | 48 |

Used by 08 → 09 → 10 midpoint match.

### G4: intergenerational transfer point
| Property | Value |
|---|---:|
| centre x | 540 |
| centre y | 920 |
| radius | 18 |

Used by 16 → 17, then expands screen-fixed to G1 in 18.


## Shots

## 01 adult-hero: One life

T 0.000 to 1.500, illustrated, hard cut.

### Composition

One adult human, full-body, centred on x=540, feet near y=1380. A cycleGold halo uses G1 behind the head/upper torso. Sparse secondary silhouettes sit deep in the paper background so the hero reads first.

### Forms

Primary figure: selfWarm fill, selfDeep hatching, 5 px ink outline. G1 halo: centre (540,700), radius 150. Background social silhouettes: socialBlue at 18–28% opacity.

### Overlays

A selfWarm trajectory begins at (220,1320) and curls toward the hero. One annYellow attention ring expands from G1 on the first beat.

### Motion

T 0.000: fully drawn thumbnail pose. T 0.500: hero shifts weight on twos and the attention ring pops over 3 frames. T 1.000: two distant silhouettes briefly synchronize their step. T 1.375: camera starts a snap push toward G1.

### Camera

Push 1.00→1.08 through T 1.0, then snap to 1.35 by T 1.5 while keeping G1 screen-fixed.

### Enter and exit

Film opens on the finished adult, not infancy. Exit keeps G1 on the exact same pixels for shot 02.

### Subject

WHO life-course source supports adult life as one stage within a continuous trajectory. The solitary emphasis here is a visual hook, not a claim that adulthood is isolated.

### Sound

- T 0.000: felt-heart kick C2 and soft paper brush.
- T 0.500: warm pluck E4-G4 and short inhale.
- T 1.000: two quiet social ticks L/R.
- T 1.375: reverse swell into the blueprint cut.

---

## 02 cell-genesis: Beginning

T 1.500 to 4.000, schematic, hard cut.

### Composition

G1 fills the centre as a founding cell guide. One glow core becomes 2, 4, then 8 cells inside the ring. The 18-arc progress glyph appears at (900,300), shot 02 owns its canonical helper.

### Forms

G1 circle, lavender double outline; cell cores schemSelf; nuclei glow; lattice hints remain restrained. Current progress arc schemCycle.

### Overlays

Schematic: no illustration overlays. Guide circles, ticks and construction lines are part of the blueprint language.

### Motion

T 1.500: one cell fully present. T 2.000: 1→2 division. T 2.500: 2→4. T 3.000: 4→8. T 3.500: cluster elongates into a vertical body-axis guide.

### Camera

Locked at zoom 1; geometry moves, camera does not.

### Enter and exit

Incoming G1 is pixel-identical to shot 01 halo. Exit vertical body-axis guide aligns with newborn centre line in shot 03.

### Subject

NICHD: conception produces a fertilized egg called a zygote; it proceeds as a cluster of cells. Exact timing is intentionally not represented.

### Sound

- T 1.500: clean glass C5 over low sine C2.
- T 2.000: paired glass ticks C5-G5.
- T 2.500: four-note ripple C5-E5-G5-C6.
- T 3.000: eight-note sparkle, ducked under a warm swell.
- T 3.500: low sub rise into birth.

---

## 03 birth: Arrival

T 4.000 to 5.500, illustrated, hard cut.

### Composition

Minimal warm paper space. A newborn is held diagonally across the central safe area, head near (460,690), torso down-right. The enclosing curved form opens outward rather than showing medical detail.

### Forms

Infant selfPale/selfWarm, birthRose cloth/environment accent, dark ink contour. Head visibly large relative to body per Art Bible §10.2.

### Overlays

One annYellow breath ring expands from chest. A short annBlue arc marks first hand movement.

### Motion

T 4.000: newborn already readable. T 4.500: chest/breath ring expands. T 5.000: tiny hand closes on twos. T 5.375: enclosing curve sweeps down into the scale axis of shot 04.

### Camera

Locked; 2% pull-back during last half-beat only.

### Enter and exit

Body axis continues shot 02's central guide. Exit curved enclosure becomes the left bracket of shot 04.

### Subject

WHO life-course: a good start to life is the opening stage. No medical claim beyond birth as a life-course transition.

### Sound

- T 4.000: cream flash hit + airy inhale.
- T 4.500: soft bell A4 on breath ring.
- T 5.000: small woody click for hand closure.

---

## 04 growth-ladder: Growth

T 5.500 to 8.000, schematic, hard cut.

### Composition

Four simplified human silhouettes arranged bottom-to-top along a vertical measurement spine: infant, child, adolescent, adult. No text labels; scale is conveyed by brackets and relative height.

### Forms

Lavender outlines with one schemSelf current-stage tint. G2 head ellipse at centre (540,720), rx 72 ry 92 on the child/adolescent comparison. Progress glyph current arc 04.

### Overlays

Schematic guide bracket and ticks only.

### Motion

T 5.500: infant outline present. T 6.000: child traces on. T 6.500: adolescent. T 7.000: adult. T 7.500: all four briefly align on a shared vertical spine before the child figure becomes dominant.

### Camera

Locked.

### Enter and exit

Left bracket inherits shot 03's exit curve. Exit zoom emphasis leaves G2 child head shape ready for shot 05.

### Subject

WHO life-course supports sequential development through infancy, childhood, adolescence/youth and adulthood. Figure proportions are drawing conventions, not age diagnostics.

### Sound

- T 5.500: low marimba D3.
- T 6.000: pluck A3.
- T 6.500: pluck D4.
- T 7.000: pluck F4.
- T 7.500: four tones resolve into a single held pad.

---

## 05 first-steps: A path

T 8.000 to 10.000, illustrated, hard cut.

### Composition

Small child crosses from left to centre on open paper ground. G2 head geometry is respected when child reaches the central pose. The selfWarm trajectory is clearly visible behind the feet.

### Forms

Child selfWarm/selfPale with childSky incidental object; wide stance and arms away from torso. Ground line inkSoft.

### Overlays

selfWarm path, annBlue step arcs, one annYellow balance ring.

### Motion

T 8.000: first-step pose fully drawn. T 8.500: step one lands. T 9.000: step two lands. T 9.500: brief wobble/recovery; head settles into exact G2 ellipse.

### Camera

Slow push 1.00→1.03, screen-fixed G2 on exit.

### Enter and exit

G2 echoes shot 04 schematic proportion. Exit freezes child head on G2 for shot 06 blueprint match cut.

### Subject

Art Bible child rules: wide base, open arms, individual path as symbolic trajectory. No milestone age is asserted.

### Sound

- T 8.000: light brush groove begins.
- T 8.500: soft wood step hit.
- T 9.000: second step hit a minor third higher.
- T 9.500: upward pluck on balance recovery.

---

## 06 learning-network: Learning

T 10.000 to 11.500, schematic, hard cut.

### Composition

G2 head ellipse remains screen-fixed while a symbolic network grows inside. Some branches brighten, others fade; no anatomical labels.

### Forms

Lavender head double-line, schemSelf core nodes, fine paleBlue branches. Progress glyph arc 06.

### Overlays

Blueprint guide geometry only.

### Motion

T 10.000: head outline already matches previous pixels. T 10.250: first branch wave. T 10.500: second wave. T 11.000: several connections strengthen while two fade. T 11.375: one branch extends out of the head to become a reaching arm trajectory in shot 07.

### Camera

Locked.

### Enter and exit

G2 exact match from shot 05. Exit branch tangent becomes shot 07 arm line.

### Subject

NIMH: adolescence/young development involves continued brain maturation and adaptation. This network is explicitly symbolic, not a literal connectome.

### Sound

- T 10.000: muted glass pulse.
- T 10.250: three small node pings.
- T 10.500: wider ping cluster.
- T 11.000: low filtered swell under pruning clicks.

---

## 07 childhood-explore: Explore

T 11.500 to 13.500, illustrated, hard cut.

### Composition

Child moves diagonally upward through paper space, reaching toward a simple childSky kite-like abstract object. Strong vertical composition uses the tall frame.

### Forms

Child selfWarm, childSky object, sparse stripeSky band, ink path and hatching.

### Overlays

annBlue reach trajectory; annYellow attention arc; small cycleGold progress echo near upper-right but not the schematic glyph.

### Motion

T 11.500: reaching pose continues shot 06 branch tangent. T 12.000: run step. T 12.500: jump/reach. T 13.000: turn lands, arm arc points toward incoming peer nodes of shot 08.

### Camera

Gentle upward camera track 1.00→1.04.

### Enter and exit

Arm continues prior network branch. Exit arm arc aligns with first peer-node arc in shot 08.

### Subject

WHO life-course: childhood is an optimal-development stage. The shot represents exploration, not a universal childhood activity.

### Sound

- T 11.500: kalimba motif D5-F5-A5.
- T 12.000: brush-kick step.
- T 12.500: small whoosh + glock A5.
- T 13.000: turn click and social-tone pickup.

---

## 08 social-salience: Peers

T 13.500 to 14.500, schematic, hard cut.

### Composition

Central primary node with three peer nodes entering from different sides. A thin attention sector rotates from inward/self region toward peer cluster.

### Forms

G3 preliminary social node at (540,820), radius 48; schemSelf core, schemSocial peer nodes, lavender curved ties. Progress glyph arc 08.

### Overlays

Blueprint only.

### Motion

T 13.500: primary node visible. T 13.750: peer nodes pop in. T 14.000: attention sector swings toward peers. T 14.250: one tie strengthens and screen fills toward paper cut.

### Camera

Locked.

### Enter and exit

First peer arc matches shot 07 arm arc. Exit primary node is transformed into the adult figure's chest marker in shot 09.

### Subject

NIMH: social experiences and peer relationships become especially salient during adolescence. No claim about uniform behaviour.

### Sound

- T 13.500: dry schematic tick.
- T 13.750: three spatial peer pings.
- T 14.000: rising bend toward socialBlue harmonic.
- T 14.250: short impact into paper.

---

## 09 one-among-many: I among us

T 14.500 to 16.000, illustrated, hard cut.

### Composition

Primary young-adult figure in selfWarm moves with a varied field of people. Clusters remain visibly non-uniform. The hero chest carries G3 at (540,820) as a tiny cycleGold marker.

### Forms

Primary hero selfWarm/selfDeep; secondary figures socialBlue/socialDeep with individual variation; stripeSage ground.

### Overlays

selfWarm individual path, annBlue group-flow lines, one annYellow divergence ring.

### Motion

T 14.500: group already moving. T 15.000: rhythm synchronizes on twos. T 15.500: primary figure takes one off-phase step while retaining group direction. T 15.875: camera centres on G3 chest marker.

### Camera

Locked until T 15.5, then fast push toward G3, ending with node exactly screen-fixed.

### Enter and exit

Primary chest marker continues shot 08 core. Exit G3 becomes shot 10 primary network node on midpoint downbeat.

### Subject

WHO social connection supports social relationships as consequential to well-being. Visual thesis: individuality remains visible inside social participation.

### Sound

- T 14.500: ensemble percussion enters.
- T 15.000: group rhythm locks with bass pulse.
- T 15.500: one contrasting pluck marks divergence.
- T 15.875: suction-like push into midpoint.

---

## 10 social-network: We

T 16.000 to 18.000, schematic, hard cut.

### Composition

G3 is exact primary node at midpoint. A heterogeneous network builds around it in clusters rather than a complete graph. This is the story hinge.

### Forms

Primary node schemSelf radius 48; other nodes 22–38 px; social ties schemSocial/lavender; progress glyph arc 10.

### Overlays

Blueprint only.

### Motion

T 16.000: G3 already present. T 16.500: first close cluster connects. T 17.000: distant cluster connects through one bridge. T 17.500: two ties dim while one close tie brightens.

### Camera

Locked.

### Enter and exit

Exact G3 match from shot 09. Exit one close tie curves into a reciprocal hand/arm gesture in shot 11.

### Subject

WHO Commission on Social Connection: social connection is substantively related to health and well-being; network is symbolic and does not rank people by number of ties.

### Sound

- T 16.000: full hinge hit, sub C2 + gong bloom.
- T 16.500: close-cluster glass pings.
- T 17.000: distant bell answer.
- T 17.500: warm close-bond tone emerges.

---

## 11 bond: Relation

T 18.000 to 20.000, illustrated, hard cut.

### Composition

Two people occupy the central safe area, primary on left, another on right. A reciprocal gesture passes between hands; a third figure remains soft in background.

### Forms

Primary selfWarm, partner socialBlue, hands simplified but readable, paper stripeSage.

### Overlays

Two annBlue arcs move in opposite directions and briefly overlap; cycleGold ring flashes at contact.

### Motion

T 18.000: figures already in relation. T 18.500: primary gesture crosses halfway. T 19.000: gesture is returned. T 19.500: both trajectory arcs synchronize for one beat.

### Camera

Subtle push 1.00→1.04.

### Enter and exit

Arm curve continues shot 10 close tie. Exit overlapped arcs collapse into concentric role rings in shot 12.

### Subject

WHO social connection: close social connection is a real human condition, not decorative crowd density.

### Sound

- T 18.000: warmer pad opens.
- T 18.500: soft pluck sent left→right.
- T 19.000: answering pluck right→left.
- T 19.500: two-note interval resolves together.

---

## 12 role-system: Roles

T 20.000 to 21.500, schematic, hard cut.

### Composition

Primary node sits within three incomplete concentric rings representing overlapping social contexts, with sparse nodes on each ring. Rings remain open, not cages.

### Forms

schemSelf core, lavender rings, schemSocial nodes, progress glyph arc 12.

### Overlays

Blueprint only; brackets indicate ring relationships without text.

### Motion

T 20.000: core and inner ring present. T 20.500: middle ring traces on. T 21.000: outer ring appears with three nodes; one radial bridge connects all three contexts.

### Camera

Locked.

### Enter and exit

Concentric rings grow from shot 11 overlap. Exit radial bridge straightens into the tool/work stroke of shot 13.

### Subject

WHO life-course includes psychosocial/environmental context across life. Rings are symbolic contexts, not fixed social categories.

### Sound

- T 20.000: muted schematic pulse.
- T 20.500: ring trace shimmer.
- T 21.000: three low ticks and one bright bridge tone.

---

## 13 create-contribute: Contribution

T 21.500 to 24.000, illustrated, hard cut.

### Composition

Primary adult makes a simple object/mark at a worktable-like plane; another person receives and extends it. The activity is intentionally generic enough to mean making/contributing rather than one occupation.

### Forms

Hero selfWarm, secondary socialBlue, object cycleGold/wood, paper with stripeSage.

### Overlays

annBlue action trajectory; annYellow bracket around the shared object; selfWarm path continues beneath both figures.

### Motion

T 21.500: primary action begins. T 22.000: object/mark takes form. T 22.500: second person reaches. T 23.000: second person extends the work. T 23.500: completed shared form leaves a memoryViolet trace for shot 14.

### Camera

Locked with 1.03 micro-push after T 23.

### Enter and exit

Tool/action line continues shot 12 radial bridge. Exit finished object trace freezes into shot 14 memory lattice anchor.

### Subject

The social/individual comparison is expressed as individual agency becoming contribution. This is artistic interpretation layered on WHO life-course/social-connection context.

### Sound

- T 21.500: steady maker rhythm starts.
- T 22.000: woody hit on object formation.
- T 22.500: bright handoff tick.
- T 23.000: second layered rhythm joins.
- T 23.500: long memory bell tail.

---

## 14 memory-field: Traces

T 24.000 to 25.500, schematic, hard cut.

### Composition

A field of faint earlier motifs surrounds a central adult node: child path, peer cluster, bond arcs, shared-object trace. Some are crisp, some faint.

### Forms

memoryViolet traces, lavender guides, schemSelf core, progress glyph arc 14.

### Overlays

Blueprint only.

### Motion

T 24.000: object trace from shot 13 already present. T 24.250: child-path trace draws. T 24.500: social cluster. T 25.000: bond arc. T 25.250: most traces dim except three persistent motifs.

### Camera

Locked.

### Enter and exit

Exact memory anchor from shot 13. Exit persistent traces drift downward into slower older-life stride guides.

### Subject

WHO life-course: trajectories are shaped over time and cumulative experience matters. Memory field is symbolic, not a claim of literal memory storage.

### Sound

- T 24.000: percussion drops out; long violet-toned pad.
- T 24.250: distant child-motif echo.
- T 24.500: social ping echo.
- T 25.000: bond interval echo.
- T 25.250: tails thin into near-silence.

---

## 15 ageing-connected: Later life

T 25.500 to 27.500, illustrated, hard cut.

### Composition

Same primary identity now older, moving more slowly with another person nearby. One shared bench/rail-like environmental form stabilizes the composition.

### Forms

Hero selfWarm with ageSage secondary cloth/accent and selfDeep hatching; companion socialBlue; paper stripeApricot.

### Overlays

cycleGold partial tally arc; annBlue shorter step arcs; one reciprocal gesture arc.

### Motion

T 25.500: older pose fully drawn. T 26.000: measured step. T 26.500: hold. T 27.000: companion gesture and response. T 27.375: cycle tally completes this stage.

### Camera

Locked, no sentimental drift.

### Enter and exit

Step guides inherit shot 14 trace directions. Exit cycle tally arc expands into the intergenerational spiral of shot 16.

### Subject

WHO life-course explicitly includes healthy ageing; WHO social connection applies across the life course. Ageing is shown as altered tempo/posture, not collapse or automatic isolation.

### Sound

- T 25.500: sparse felt kick, lower register.
- T 26.000: soft measured step.
- T 26.500: near-silent held pad.
- T 27.000: warm bell for reciprocal gesture.

---

## 16 generation-spiral: Across generations

T 27.500 to 29.000, schematic, hard cut.

### Composition

Two life arcs, older and younger, coil through a shallow spiral without touching at first. G4 transfer point sits at (540,920), radius 18. Progress glyph arc 16.

### Forms

Older arc memoryViolet/lavender, younger arc schemSelf, G4 schemCycle glow point, sparse social nodes.

### Overlays

Blueprint only.

### Motion

T 27.500: older arc present. T 28.000: younger arc traces in. T 28.500: both converge on G4 while remaining distinct.

### Camera

Locked.

### Enter and exit

Spiral grows from shot 15 tally arc. Exit G4 remains fixed for shot 17 handoff.

### Subject

WHO life-course includes intergenerational health/continuity. Spiral is symbolic continuity, not literal identity transfer.

### Sound

- T 27.500: opening seed motif returns quietly.
- T 28.000: second-generation motif enters one octave up.
- T 28.500: both tones converge on a clear bell.

---

## 17 handoff: Continue

T 29.000 to 30.500, illustrated, hard cut.

### Composition

Older primary and younger child/young person face each other in the central safe area. Their hands meet around G4. Older selfWarm path ends; a new selfWarm path begins from the younger figure.

### Forms

Older hero selfWarm/ageSage, younger selfPale/selfWarm, G4 cycleGold point, paper stripeSpring.

### Overlays

Two trajectory lines; one cycleGold ring around G4; annBlue outgoing/incoming direction arcs.

### Motion

T 29.000: both hands around fixed G4. T 29.500: G4 passes visually from older to younger hand. T 30.000: older path resolves while new path draws forward. T 30.375: G4 begins expanding toward G1 size.

### Camera

Very small pull-back to reveal both paths, but G4 screen-fixed during transfer.

### Enter and exit

Exact G4 from shot 16. Exit G4 expands, centred to become shot 18 G1.

### Subject

Intergenerational continuation is the symbolic thesis; the younger figure is not the same person restarting.

### Sound

- T 29.000: quiet duet of old and new motifs.
- T 29.500: bright cycleGold bell at transfer.
- T 30.000: new motif continues alone.
- T 30.375: reverse swell into final blueprint.

---

## 18 seed-loop: Again

T 30.500 to 32.000, schematic, hard cut.

### Composition

G1 cycle circle returns at (540,700), radius 150. Faint traces of the social network and life path recede outward. Wordmark “human” sits at baseline y=1470. Progress glyph completes all 18 arcs.

### Forms

G1 lavender double outline, schemCycle core, faint schemSocial nodes; wordmark lavender 44 px.

### Overlays

Blueprint only; final wordmark is the one allowed text.

### Motion

T 30.500: expanding G4 lands exactly on G1. T 31.000: network traces recede. T 31.500: final pulse returns to opening cadence; wordmark settles. T 31.958: final frame matches shot 01 G1 geometry and tonal level for the loop.

### Camera

Locked.

### Enter and exit

G4→G1 exact expansion. Exit is frame-zero-compatible with shot 01 halo.

### Subject

The loop is symbolic and intergenerational. WHO life-course grounds continuity across generations, not literal recurrence of one identity.

### Sound

- T 30.500: final blueprint cut hit.
- T 31.000: resolved opening pulse C2+C4.
- T 31.500: glass overtone and loop pickup, with level matched to T 0.



# V2 execution layer: drawable choreography

This section is the production bridge between the semantic storyboard above and scene implementation. It does not change timing, order, research claims, or the illustrated/schematic alternation. It makes every shot concrete enough to build as a miniature drawing system rather than a motion card.

## V2-01 adult-hero
- Depth layers: distant facade and windows; social figures/bench; path and plants; protagonist; trajectory; G1 and attention geometry.
- Hero must be a filled multi-part adult body with separate head, neck, ribcage, pelvis, upper/lower limbs, hands and shoes. No stick anatomy.
- Beat states: 0.00 full pose and field already readable; 0.50 weight transfer and ring; 1.00 distant figures hit a related but not identical step; 1.375–1.50 camera push isolates the exact G1 geometry.
- Exit invariant: G1 centre/radii remain screen-fixed even while the illustrated camera moves.

## V2-02 cell-genesis
- Structural layers: blueprint; tissue/fluid field; exact G1 membrane; cell interiors; division bridges; body-axis morph; progress glyph.
- The biological event must be drawn as changing cell topology, not one glowing dot duplicating.
- Beat states: one cell → two → four → eight → axial contraction. Each division briefly exposes a bridge and then resolves into separate membranes.
- Exit invariant: body-axis geometry lands in the same central zone used by shot 03.

## V2-03 birth
- Depth layers: warm room/window plane; supporting adult/cloth; cradle ellipse/folds; newborn; breath/hand overlays.
- Newborn must show flexed limbs and large head proportion, and must visibly rest in a supporting structure rather than float.
- Beat states: readable held infant; breath; hand/finger motion; enclosure curve sweeps toward the next measurement language.
- Exit invariant: the enclosing sweep supplies the visual logic for the shot-04 bracket.

## V2-04 growth-ladder
- Structural layers: blueprint; baseline and ruler; infant/child/adolescent/adult outlines; proportion ticks; stage highlights; G2.
- Four stages must differ in body proportion, not only overall scale.
- Beat states: stages appear sequentially, then all co-exist, then the child/adolescent head geometry is privileged.
- Exit invariant: exact G2 ellipse is clean and unobstructed for the illustrated cut.

## V2-05 first-steps
- Depth layers: doorway/furniture/plant; perspective floor; child shadow; filled child; path and step annotations.
- Child motion uses four explicit gait drawings: rear-foot weight, heel contact, cross-over, wobble/recovery.
- Beat states: first landing; second landing; wobble; recovery into the G2 head placement.
- Exit invariant: head outline settles onto G2 while the rest of the scene can continue to move.

## V2-06 learning-network
- Structural layers: exact G2 head; internal lattice/stipple; branch network; changing-strength links; one outgoing branch; progress glyph.
- Network is contained within an identifiable head/body context, not floating abstractly.
- Beat states: first branch wave; second wave; selective strengthening/fading; one route exits the head.
- Exit invariant: outgoing branch has a tangent that can become the child’s reaching arm trajectory.

## V2-07 childhood-explore
- Depth layers: distant park/fence; trees; ground/grass; kite/target; child; trajectory; jump/reach annotations.
- Child uses filled masses and a twisted run/jump pose with one arm clearly reaching upward.
- Beat states: continued reach; run step; airborne reach; landing and turn.
- Exit invariant: final reaching arc aims toward where peer geometry will appear in shot 08.

## V2-08 social-salience
- Structural layers: blueprint; primary faint body; exact G3 node; embodied peer glyphs; curved ties; attention sector; progress glyph.
- Peers are not equal dots. They must have distinct body-shaped schematic glyphs and different placements.
- Beat states: peer bodies appear; ties establish; attention sector rotates; one tie strengthens.
- Exit invariant: G3 remains exact and becomes the chest-position anchor for shot 09.

## V2-09 one-among-many
- Depth layers: plaza/facade; far crowd; mid crowd; protagonist; foreground passer; self path; group-flow arcs.
- Crowd figures vary scale, stance, direction and colour family. The hero stays uniquely traceable.
- Beat states: crowd movement; momentary phase synchrony; hero off-phase step; camera/picture emphasis on G3.
- Exit invariant: the social field must still feel inhabited when G3 is isolated for the cut.

## V2-10 social-network
- Structural layers: blueprint; faint human context; G3; three heterogeneous clusters; intra-cluster links; cross-cluster bridges; changing ties; progress glyph.
- Never draw a complete graph. Secondary nodes must also have lives beyond the hero through micro-links.
- Beat states: close cluster; distant cluster; third cluster; one close relationship strengthens while others dim.
- Exit invariant: strengthened relationship curve supplies the gesture direction for shot 11.

## V2-11 bond
- Depth layers: plaza/bench/background figure; two filled people; hands; reciprocal arcs; contact ring.
- Relationship must read without overlays through orientation, lean, arm extension and reciprocal hand motion.
- Beat states: separate readable bodies; offer; return; contact/overlap; slight withdrawal.
- Exit invariant: two overlapping gesture arcs collapse into the ring language of shot 12.

## V2-12 role-system
- Structural layers: blueprint; faint protagonist body; three incomplete rings; embodied nodes; cross-context ties; progress glyph.
- Rings are open contexts rather than cages. Sparse people sit on different rings and some ties cross contexts.
- Beat states: inner context; second context; outer context; cross-context ties; one horizontal work-surface line emerges.
- Exit invariant: the ring system straightens toward the shared workbench edge in shot 13.

## V2-13 create-contribute
- Depth layers: workshop wall/shelves/tools; workbench; two filled half/full figures; hands; modular physical object; memory trace.
- The scene must depict an actual shared making sequence. A base, upright, circular element and connector assemble into one object.
- Beat states: protagonist reaches; partner reaches; pieces align; object locks; completed object receives an echo/trace.
- Exit invariant: memoryViolet appears only after physical completion and becomes shot-14 path material.

## V2-14 memory-field
- Structural layers: blueprint; continuing memory path; five reused mini-glyphs from prior shots; cross-links; condensed self trace; progress glyph.
- Required recognisable recalls: cradle curve, footprints, reaching child, G3 social cluster, shared-made object.
- Beat states: path draws; glyphs emerge in waves; links establish; protagonist trace condenses.
- Exit invariant: self trace resolves into the body axis/posture logic for later life.

## V2-15 ageing-connected
- Depth layers: garden/building; bench/path; foliage; older protagonist; companion; trajectory; seed motif.
- Older hero is the same identity through colour family, shoulder notch and face asymmetry. Ageing changes posture, step and tempo rather than agency.
- Beat states: two people walk/stand in relation; protagonist gestures; seed motif appears near the companion exchange.
- Exit invariant: cycleGold seed occupies the zone that will initiate the generational spiral.

## V2-16 generation-spiral
- Structural layers: blueprint; double spiral; embodied generation silhouettes; continuity route; exact G4; progress glyph.
- Generations are bodies along a spiral, not points on a decorative coil.
- Beat states: spiral draws; child/young/adult/older figures appear; older-to-younger route emerges; G4 becomes exact.
- Exit invariant: G4 is screen-fixed at the handoff position.

## V2-17 handoff
- Depth layers: garden/threshold; optional middle adult; older protagonist; younger child; complete hands; G4; new trajectory; expanding G1.
- Transfer is physical: older hand offers, younger hand approaches, G4 bridges the gap, younger closes, older releases, new path begins.
- Beat states: approach; bridge/contact; release; new trajectory; G4 lifts and expands.
- Exit invariant: the expanding continuity point lands on G1 centre and radius.

## V2-18 seed-loop
- Structural layers: blueprint; faint echoes of G2/G3/G4; exact G1; founding cell; division; cycle arc; progress glyph; final wordmark.
- The ending must reconnect social/intergenerational continuity to biological possibility without claiming the same individual repeats.
- Beat states: seed reaches G1; membrane gathers; cell division begins; history echoes converge; cycle arc closes.
- Exit invariant: final G1 composition can hard-cut back to shot 01 with the same screen-fixed guide.

## Per-shot completion gate
A scene is not complete because it renders. For each shot:
1. build the scene with the layer/depth requirements above;
2. render six temporal samples;
3. inspect all six actual frames;
4. fix composition, anatomy, collisions, readability, density and exit geometry;
5. re-snap if any material fix was required;
6. only then advance to the next scene batch.

The native six-check remains a technical correctness gate. It is not a substitute for the six-frame visual inspection.
