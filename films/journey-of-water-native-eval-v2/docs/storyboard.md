# Storyboard: The Journey of Water

## Logline

One visually traceable parcel of water travels from cloud to rain, leaf and soil, stream and river, human water infrastructure, ocean, evaporation and back to cloud. The film alternates illustrated physical environments with blueprint-scale explanations, using conserved geometry, camera-scale transitions and a recurring tracer so the hydrologic cycle reads as one continuous journey rather than a chain of cards.

## Numbers

- BPM: 120
- beat: 0.5 s = 12 frames
- bar: 2.0 s = 48 frames
- duration: 36.0 s = 18 bars = 864 frames at 24 fps
- frame: 1080 × 1920
- shot count: 20
- shot duration: 1.5 to 2.5 s
- default transition: hard cut unless explicitly stated

The midpoint downbeat is T 18.0, where the natural river system is abstracted into a watershed/system view before entering human infrastructure.

## Summary

| # | Id | Start | End | Mode | Title |
|---|---|---:|---:|---|---|
| 01 | cloud-hero | 0.0 | 1.5 | illustrated | Held in the cloud |
| 02 | condensation-micro | 1.5 | 3.5 | schematic | Droplets gather |
| 03 | drop-growth | 3.5 | 5.0 | schematic | Heavy enough to fall |
| 04 | rain-fall | 5.0 | 7.0 | illustrated | Through the air |
| 05 | leaf-impact | 7.0 | 9.0 | illustrated | Impact |
| 06 | leaf-stomata | 9.0 | 10.5 | schematic | Another path |
| 07 | soil-entry | 10.5 | 12.5 | illustrated | Into the ground |
| 08 | pore-flow | 12.5 | 14.0 | schematic | Through pores |
| 09 | spring-stream | 14.0 | 16.0 | illustrated | Surface again |
| 10 | tributary-river | 16.0 | 18.0 | illustrated | Becoming a river |
| 11 | watershed-flow | 18.0 | 19.5 | schematic | A larger system |
| 12 | treatment-train | 19.5 | 22.0 | schematic | Made usable |
| 13 | pipe-transit | 22.0 | 23.5 | illustrated | Under the city |
| 14 | tap-use-drain | 23.5 | 25.5 | illustrated | Through a home |
| 15 | wastewater-return | 25.5 | 27.5 | schematic | Cleaned again |
| 16 | river-release | 27.5 | 29.0 | illustrated | Back to the river |
| 17 | estuary-ocean | 29.0 | 31.0 | illustrated | Into the ocean |
| 18 | surface-evaporation | 31.0 | 33.0 | schematic | Leaving the surface |
| 19 | condensation-return | 33.0 | 34.5 | schematic | Becoming cloud |
| 20 | cloud-loop | 34.5 | 36.0 | illustrated | The cycle continues |

## Structure

### Act 1 — atmosphere and rain, bars 1–4 (T 0–8)
Cloud microphysics becomes one falling drop, then an impact.

### Act 2 — land and subsurface, bars 5–8 (T 8–16)
The water touches plant/soil systems, infiltrates, moves through pore space, and re-emerges as streamflow.

### Act 3 — river and human intake, bars 9–12 (T 16–24)
A tributary becomes a river, the camera reveals the watershed, and the parcel enters a treatment/distribution system.

### Act 4 — human return path, bars 13–15 (T 24–30)
Domestic use becomes wastewater collection/treatment and returns to receiving water.

### Act 5 — ocean and atmospheric return, bars 16–18 (T 30–36)
The river reaches the ocean; the camera pushes into the surface, follows evaporation upward, and returns to the opening cloud.

## Motion complexity contract

Every shot must show at least three materially different temporal states across its six-sample contact sheet.

Illustrated shots require:
- background/environment motion;
- primary water action;
- at least one secondary material response;
- camera or parallax unless the shot's stillness is the point;
- one transition element already preparing the next shot.

Schematic shots require:
- a process that changes topology, state, or relation over time;
- at least two simultaneous systems;
- measurement/guide geometry;
- one causal highlight;
- no shot whose only motion is nodes fading in.

## Shared geometry

### G1 — hero precipitation drop

- centre: (540, 720)
- medium free-fall bounding box: 210 × 180 px
- illustrated outer contour: waterBody / ink
- schematic outer contour: lavender double line
- identity glint: local offset (-34, -28), radius 8 px, cycleGold/schemCycle
- exact G1 survives 01 → 02 → 03 → opening of 04

### G2 — surface lens / pore

- centre: (540, 820)
- outer guide radius: 118 px
- tracer angle: 32° on lower-right quadrant
- used for leaf lens, stomatal/pore macro, soil-pore transition
- exact G2 survives 05 → 06 and 07 → 08 as a scale/shape relation

### G3 — flow cross-section

- nominal centreline: y = 920
- highlighted streamline: x = 300 → 780
- tracer point: (540, 920), radius 14 px
- used for groundwater emergence, stream/river flow, treatment channel, pipe flow and effluent return

### G4 — ocean / evaporation / cloud guide

- centre: (540, 760)
- radius: 165 px
- used as an ocean-surface macro ring, vapor ascent guide, and condensation field
- exact G4 survives 17 → 18 → 19

## Transition map

| From → To | Transition mechanism | Conserved element |
|---|---|---|
| 01 → 02 | camera pushes into the hero cloud droplet; paper becomes blueprint | G1 drop outline/glint |
| 02 → 03 | coalescing droplet field contracts around one growing drop | G1 |
| 03 → 04 | hard cut keeps drop contour while internal diagram becomes sky | G1 + downward vector |
| 04 → 05 | tracked camera follows the drop to leaf impact | downward direction + drop |
| 05 → 06 | push through the surface-bound lens into a leaf/stomata diagram | G2 |
| 06 → 07 | branch explanation collapses back to the surface drop, which leaves the leaf | G2 + downward path |
| 07 → 08 | camera dives through a water-filled soil pore | G2 pore circle |
| 08 → 09 | highlighted pore channel becomes spring outlet | G3 streamline |
| 09 → 10 | stream path widens while camera pulls back | G3 direction |
| 10 → 11 | pull-back converts terrain/tributaries into watershed lines | river network geometry |
| 11 → 12 | one river line enters a treatment-intake channel | G3 line |
| 12 → 13 | filter pore/clear-water channel becomes a pressurised pipe cross-section | G3 |
| 13 → 14 | camera rides pipe into faucet, then water exits into open air | G3 → physical stream |
| 14 → 15 | sink drain spiral becomes sewer/treatment schematic | spiral/flow vector |
| 15 → 16 | final effluent channel hard-cuts to receiving-river outfall | G3 |
| 16 → 17 | river direction continues through estuary into ocean | flow direction |
| 17 → 18 | macro push into sunlit ocean surface | G4 |
| 18 → 19 | rising vapor points stay on the same field while air cools/condenses | G4 |
| 19 → 20 | blueprint cloud lobe becomes illustrated cloud | lobe + tracer cluster |
| 20 → 01 | same cloud composition, new precipitation-ready drop | G1 / opening composition |

## Camera-scale ladder

The film intentionally changes scale by orders of magnitude:
1. cloud exterior;
2. cloud microdroplet macro;
3. raindrop scale;
4. landscape/leaf scale;
5. stomata/soil pore macro;
6. creek/river landscape;
7. treatment equipment/pipe macro;
8. domestic room;
9. river/estuary wide;
10. ocean surface macro;
11. atmosphere/cloud wide.

Camera moves are narrative. A push-in always reveals a physical system; a pull-back always reveals a larger context.

## Sound language

Core musical motif: C5 → G5 → D6 → A5 on 8ths, glassy pluck / filtered mallet. It may fragment into single tones during technical schematic shots and reassemble at major returns.

Material SFX:
- cloud: filtered noise, soft granular droplets;
- falling rain: high filtered noise with descending pitch whistle;
- impacts: short water-noise bursts plus low body;
- stream/river: band-limited noise with moving resonant peaks;
- machinery/pipes: low sine/triangle hum with rhythmic valve ticks;
- ocean: wide low noise and slow sub swell;
- evaporation/condensation: rising/falling filtered noise and sparse high partials.

All cue times below are global T and land on beat, eighth or sixteenth grid.

## Shots

---

## 01 cloud-hero: Held in the cloud

T 0.0–1.5, illustrated, hard cut in.

### Composition

A vast warm-paper storm-cloud occupies the upper 70% of the tall frame, built from overlapping lobes at three depths. The camera is close enough that the cloud is a landscape rather than a symbol. Near (540,720), a large suspended water droplet sits inside a translucent opening in the cloud underside: exact G1. Smaller droplets surround it at different depths; distant cloud gaps reveal pale sky and diagonal stripe structure.

Foreground: two soft cloud lobes cross the lower corners.
Midground: hero drop and coalescing neighbours.
Background: darker cloudShade folds with shafts of light.

### Forms

Hero G1 drop: 210×180 px, no pointed top, waterPale body with ink edge and waterDeep lower hatching. cycleGold glint at (-34,-28). Cloud lobes use cloudBody/cloudShade with 5–12 px hatching on undersides. 30–60 secondary droplets, mostly 5–18 px, with a few larger 25–45 px.

### Overlays

One faint annYellow circular guide around G1; two annBlue curved flow arrows show slow cloud circulation. No text.

### Motion

T 0.0: cloud lobes already drift at different rates.
T 0.25: three microdroplet clusters slide toward G1.
T 0.50: one neighbour merges into the hero; outline flexes on twos.
T 1.00: camera begins a 1.8× push toward G1 while background parallax increases.
T 1.375: surrounding cloud desaturates/clears; G1 geometry is isolated for the cut.

### Camera

Start zoom 1.0, centre (540,720). Push to 1.8 from T 1.0–1.5, inOutCubic. Cloud layers parallax independently.

### Enter and exit

Cold open with the subject already alive. Exit leaves exact G1 on screen; shot 02 replaces the paper environment with blueprint without moving the outline.

### Subject

Cloud droplets form through condensation around tiny particles and grow through condensation/coalescence. A precipitation-sized drop emerges from a much larger field of suspended droplets; art bible 10.2.

### Sound

T 0.0: low airy C3 pad + filtered cloud noise.
T 0.5: first motif notes C5, G5.
T 1.0: soft droplet merge tick and D6.
T 1.5: tight reverse-noise suction into the cut.

---

## 02 condensation-micro: Droplets gather

T 1.5–3.5, schematic, hard cut.

### Composition

Exact G1 occupies the centre while the camera reveals its surrounding microphysics: aerosol nuclei, dozens of small droplets, curved air-flow lines and a larger condensation field. The main drop is double-outlined lavender; schemCycle glint survives from shot 01.

A large faint guide circle crosses the frame behind the process. Progress glyph shows stage 2/12.

### Forms

80–140 microdroplets from 2–12 px, some with 1–2 px aerosolDust/schemFlow cores. G1 double outline is 9 px apart. Internal droplet density is deliberately uneven, with denser lower-right coalescence zone.

### Overlays

Measurement bracket to the left of G1; radial tick cluster around one aerosol nucleus; 2 guide diagonals.

### Motion

T 1.5: G1 and glint already exact.
T 1.75: vapor/small-drop field begins converging in three curved flow bands.
T 2.0: first coalescence pair merges with a 6-frame magenta flash.
T 2.5: second and third merges occur in different quadrants.
T 3.0: G1 grows slightly while small neighbours disappear into it.
T 3.5: field pauses with a clear downward force arrow ready for shot 03.

### Camera

Static in screen space; internal scale change occurs through droplet growth, not camera.

### Enter and exit

Enter on exact G1. Exit keeps G1 but adds a flattening/airflow cross-section that shot 03 develops.

### Subject

Condensation forms cloud droplets around aerosol nuclei; droplets grow through condensation/coalescence; most cloud droplets remain suspended until growth makes precipitation possible. Art bible 10.2.

### Sound

T 1.5: blueprint click + single C5.
T 2.0: glass ping G5 on first merge.
T 2.5: D6 and granular water tick.
T 3.0: A5 + low rising pressure tone.
T 3.5: short downward filtered sweep.

---

## 03 drop-growth: Heavy enough to fall

T 3.5–5.0, schematic, hard cut.

### Composition

The same G1 drop now becomes a physics diagram. Air-flow streamlines rise around its sides while the bottom surface gradually flattens. A side sequence of three miniature outlines compares small round, medium flattened, and unstable large-drop states.

### Forms

Main G1 starts close to round and evolves to the medium-drop 210×180 form with flattened bottom. Airflow lines are paleBlue/schemFlow; surface tension guide is a closed lavender loop. Miniatures are 70–100 px.

### Overlays

Bottom-pressure arrows point upward; one ann-equivalent magenta deformation band appears only during flattening. Progress glyph 3/12.

### Motion

T 3.5: rounder outline.
T 4.0: side airflow strengthens; lower third compresses.
T 4.5: downward force/velocity line extends; bottom flattening becomes obvious.
T 4.75: main drop begins moving down by 20 px while the field stays fixed.
T 5.0: hard cut on the same outline and velocity.

### Camera

Static.

### Enter and exit

Exact G1 from shot 02. Exit maintains G1 shape and downward vector into real falling sky.

### Subject

Small falling drops are near spherical; larger ones flatten underneath; a pointed teardrop is wrong. Art bible 10.3.

### Sound

T 3.5: low pulse C3.
T 4.0: increasing air hiss.
T 4.5: sub hit + G4.
T 5.0: sharp cut hit with descending noise.

---

## 04 rain-fall: Through the air

T 5.0–7.0, illustrated, hard cut.

### Composition

The hero drop remains exact G1 for the first frames, then the camera tracks it downward through layered rain. Near rain streaks cross the frame fast; distant drops move slower. A dark cloud ceiling recedes above while an angled landscape/leaf canopy becomes visible below.

### Forms

Hero uses medium falling-drop geometry with a flattened lower side. 40–90 background drops vary from 3–40 px. Cloud underside uses stormGray; distant landscape is muted sage/riverBank.

### Overlays

Thin annBlue velocity arc and two annYellow scale ticks that briefly show the tracked drop against the much smaller rain field.

### Motion

T 5.0: exact G1 on cut.
T 5.25: camera begins following the hero.
T 5.5: near rain layer accelerates relative to background.
T 6.0: hero wobbles on twos; one small satellite drop passes behind.
T 6.5: leaf canopy rises quickly from frame bottom.
T 6.875: hero descends to contact point; shadow tightens on leaf.
T 7.0: impact begins on the cut.

### Camera

Tracked downward move, plus subtle 1.15× push from T 6.25–7.0. Smooth 24 fps camera, on-twos object deformation.

### Enter and exit

Enter exact G1. Exit keeps downward trajectory and position into the leaf impact zone.

### Subject

Falling raindrops do not use cartoon teardrop shape. Background rain provides scale and collective precipitation context.

### Sound

T 5.0: rain-noise opens wide.
T 5.5: high whistle layer enters.
T 6.0: motif fragment C5–G5.
T 6.5: rising leaf/impact pre-hit.
T 7.0: water impact transient.

---

## 05 leaf-impact: Impact

T 7.0–9.0, illustrated, hard cut.

### Composition

Extreme macro of a real leaf running diagonally from lower-left to upper-right. Veins, surface hairs/stipple and edge serrations are visible. The hero drop hits near (540,820), exact G2 centre after spreading. Background leaves and stems create two softer depth layers.

### Forms

LeafWet main plane with ink/vein structure. Splash sequence uses waterPale/waterBody/waterFoam. Crown rim 150–230 px radius with 8–14 lobes. 10–28 readable ejected droplets.

### Overlays

G2 guide circle appears after impact; annMagenta impact ring expands once; annBlue downhill/sliding direction line draws along the leaf.

### Motion

T 7.0: contact disk compresses.
T 7.25: crown rises and secondary droplets eject.
T 7.5: crown collapses into a broad surface lens centred on G2.
T 8.0: lens slides 35 px downhill while leaf flexes.
T 8.5: tracer glint moves to lower-right edge.
T 8.75: camera pushes through the lens/leaf surface.
T 9.0: exact G2 fills the transition.

### Camera

Macro 1.0 → 2.8 push from T 8.5–9.0 centred on G2.

### Enter and exit

Impact continues from falling shot. Exit uses G2 circular/lens boundary as portal into leaf/stomata schematic.

### Subject

A surface-bound drop can deform into a dome/lens attached to the leaf. Plant transpiration is a separate pathway explained next; art bible 10.4–10.5.

### Sound

T 7.0: broad splash hit + sub.
T 7.25: bright droplet ticks.
T 7.5: damped mallet C5.
T 8.0: sliding-water noise.
T 8.5: suction/zoom swell.
T 9.0: blueprint click.

---

## 06 leaf-stomata: Another path

T 9.0–10.5, schematic, hard cut.

### Composition

G2 becomes a leaf cross-section / stomatal region. On the left, the hero parcel remains a surface-water reservoir. A branching schematic shows one alternate path: root/tissue water moving toward stomata and leaving as vapor points. The film explicitly marks this as another possible route, while the hero tracer stays on the surface branch.

### Forms

Leaf layers are stacked lavender cell bands; stomatal opening is a paired curved shape near x 700. Vapor points use schemWater. G2 guide defines the macro field.

### Overlays

One measurement bracket across leaf thickness; arrows from internal water path to stomatal opening. Progress glyph 4/12.

### Motion

T 9.0: G2 exact.
T 9.25: tissue lattice draws on.
T 9.5: alternate water path moves through cells.
T 10.0: vapor points separate at stomata and rise.
T 10.25: hero branch on surface brightens and moves toward leaf edge.
T 10.5: diagram collapses back to the surface path for the cut.

### Camera

Static schematic.

### Enter and exit

Enter through G2 lens. Exit returns the hero to the illustrated leaf edge, already moving downward toward soil.

### Subject

Plants move water from roots through tissues and release vapor through stomata; transpiration is generally invisible. This is an alternate branch, not the hero's chosen route.

### Sound

T 9.0: dry blueprint click.
T 9.5: high airy pulse.
T 10.0: soft rising vapor noise + D6.
T 10.5: low drop cue into soil.

---

## 07 soil-entry: Into the ground

T 10.5–12.5, illustrated, hard cut.

### Composition

The water leaves the leaf edge and lands on a detailed forest/soil surface. Camera follows into a vertical cutaway: litter and fine roots, upper soil aggregates, sandier pore spaces, stones and a deeper saturated zone. The hero becomes a highlighted branch in several infiltrating channels.

### Forms

Roots are tapered branching ink lines; soilBody/soilDeep aggregates range 30–90 px; stoneBody forms 40–140 px; water films cling to pore edges. At T 12.0 a round pore centred on G2 becomes dominant.

### Overlays

annBlue arrows show three possible infiltration branches; one annYellow ring isolates the hero pore only at the end.

### Motion

T 10.5: surface drop leaves leaf.
T 10.75: impact wets litter and splits into three rivulets.
T 11.0: camera descends with tracer; upper channels split around roots.
T 11.5: one branch stalls in a fine pore while hero moves through a wider channel.
T 12.0: tracer reaches G2 pore; nearby air bubble shifts.
T 12.5: macro push into G2.

### Camera

Continuous 5× vertical push/downward travel over the shot. Environment parallax emphasises scale change.

### Enter and exit

Enter from leaf edge/downward path. Exit on exact G2 pore circle into blueprint pore network.

### Subject

Infiltration routes water through soil pores; unsaturated zones contain both air and water; soil structure and saturation alter flow. Art bible 10.6.

### Sound

T 10.5: damp earth impact.
T 11.0: low granular trickle.
T 11.5: muted stone tick.
T 12.0: motif C5 + resonant droplet tone.
T 12.5: macro whoosh.

---

## 08 pore-flow: Through pores

T 12.5–14.0, schematic, hard cut.

### Composition

Exact G2 becomes one pore in a larger network of grains and voids. Water moves as connected films/channels around outlined grains. Air voids remain navy. A dashed horizontal water-table guide enters the lower third; below it, connected voids are more completely water-filled.

### Forms

Irregular grain cells 35–110 px; schemWater channels 6–18 px; trapped-air voids as navy negative spaces. G2 remains the source pore. G3 highlighted streamline forms in lower centre.

### Overlays

Water-table guide, two flow arrows, pressure/gradient ticks. Progress glyph 5/12.

### Motion

T 12.5: G2 exact.
T 12.75: first pore film advances.
T 13.0: two channels split around a grain.
T 13.25: one dead-end fills slowly while hero channel continues.
T 13.5: lower saturated network brightens.
T 14.0: one G3 streamline exits frame toward spring.

### Camera

Static, with a slight 1.15× full-frame push to make the transition from pore to flow line.

### Enter and exit

Enter exact G2. Exit on G3 highlighted channel, which becomes a real spring outlet.

### Subject

Groundwater moves through connected pore/fracture space rather than as an underground river. Art bible 10.6.

### Sound

T 12.5: blueprint tick.
T 13.0: low bubble/pluck.
T 13.5: filtered rising resonance.
T 14.0: open-water noise begins under the cut.

---

## 09 spring-stream: Surface again

T 14.0–16.0, illustrated, hard cut.

### Composition

A spring emerges between stones into a narrow creek. G3 is a highlighted streamline crossing the water surface from x 300 to 780. Foreground stones and moss, midstream water, far bank/reeds create depth. A small tributary enters from upper-right.

### Forms

Water surface uses 30–60 flow-aligned hatch strokes; stones have contour hatching; foam only at the spring disturbance. Tracer glint follows G3. Reeds and roots deform slightly in flow.

### Overlays

annBlue streamlines around two stones; one annYellow ring briefly marks tributary merge.

### Motion

T 14.0: spring outlet already flows.
T 14.5: hero tracer emerges and accelerates.
T 15.0: flow splits around foreground stone and rejoins.
T 15.5: tributary enters; water level/texture locally changes.
T 15.75: camera begins a pull-back following downstream direction.
T 16.0: channel widens into river shot.

### Camera

Tracking/pull-back 1.0 → 0.65 world scale, moving downstream.

### Enter and exit

Enter G3 from pore network. Exit preserves downstream direction and one highlighted flow line.

### Subject

Groundwater can discharge to surface water and contribute to streamflow; streams receive multiple inputs and flow downhill toward larger rivers.

### Sound

T 14.0: stream noise opens.
T 14.5: motif G5.
T 15.0: stone-water slap.
T 15.5: tributary merge hit D6.
T 16.0: low widening swell.

---

## 10 tributary-river: Becoming a river

T 16.0–18.0, illustrated, hard cut.

### Composition

Camera continues pulling back: creek → tributary → broad river valley. In foreground, reeds and bank; midground river bends around a sediment bar; background bridge pier, distant hills and two smaller tributaries. The tracer becomes a tiny local golden/teal streamline rather than a giant droplet.

### Forms

River occupies 45–60% frame width. Multiple surface-flow bands, sediment-bar texture, bank vegetation, bridge/construction geometry. Secondary birds/reeds supply scale but stay subdued.

### Overlays

Three thin annBlue basin-flow arcs converge; a faint annYellow circle marks the tracer only briefly.

### Motion

T 16.0: stream continuity exact.
T 16.5: camera rises; tributary network becomes visible.
T 17.0: river bend shifts by parallax; tracer remains local.
T 17.5: second tributary joins.
T 17.75: illustrated terrain begins simplifying into contour/network lines.
T 18.0: hard cut to watershed blueprint.

### Camera

6× pull-back over 2 s, smooth 24 fps.

### Enter and exit

Enter same downstream vector. Exit converts terrain and tributaries into line network at the midpoint downbeat.

### Subject

Runoff, groundwater/baseflow and tributaries feed larger streams/rivers that can carry water toward the ocean.

### Sound

T 16.0: full motif C5–G5–D6–A5 over 8ths.
T 16.5: low river band widens.
T 17.0: bridge/wood tick.
T 17.5: swell.
T 18.0: midpoint sub hit + blueprint cut.

---

## 11 watershed-flow: A larger system

T 18.0–19.5, schematic, hard cut.

### Composition

The previous landscape becomes a topographic watershed network. Thin basin boundaries surround a branching river system. G3 tracer moves along one branch into a circular intake reservoir on the right. Nearby alternate branches continue to ocean, infiltration and evaporation icons without text.

### Forms

River network uses schemFlow; basin lines lavender; tracer schemCycle. Three small process insets show runoff, groundwater contribution and reservoir intake. Progress glyph 6/12.

### Overlays

Flow-direction ticks, one bracket around intake/reservoir, sparse magenta only when intake diverts the tracer.

### Motion

T 18.0: network is already the simplified river from shot 10.
T 18.25: tributary pulses propagate downstream.
T 18.5: tracer reaches intake branch.
T 19.0: diversion valve/branch shifts; part of flow continues downstream while tracer enters intake.
T 19.5: intake channel expands to become shot 12 treatment flow.

### Camera

Static topographic view, final 1.3× push into intake.

### Enter and exit

Enter from river geometry. Exit on a left-to-right treatment channel aligned with G3.

### Subject

Human withdrawals can divert surface water while remaining water continues through the river system; human use changes water movement/storage.

### Sound

T 18.0: deep system hit.
T 18.5: muted valve click.
T 19.0: C5 pulse + mechanical hum enters.
T 19.5: process-machine accent.

---

## 12 treatment-train: Made usable

T 19.5–22.0, schematic, hard cut.

### Composition

A large treatment train spans the tall frame as a continuous flowing cross-section: intake/rapid mix → flocculation → sedimentation → layered filter → disinfection/contact → clear-water storage. Each stage has distinct geometry; the tracer stays inside the water path.

### Forms

Coagulation: small particles + mixing vortex.
Flocculation: flocBody-equivalent schematic clusters growing.
Sedimentation: large flocs sink, water exits high.
Filter: stacked gravel/sand pore layers.
Contact/storage: cleaner low-particle water channel and circular tank.
G3 remains the underlying process centreline.

### Overlays

Brackets and ticks separate stages without text. Progress glyph 7/12. Magenta only at coagulation/chemical-change moment.

### Motion

T 19.5: intake/mix already flowing.
T 20.0: small particles aggregate into larger flocs.
T 20.5: large flocs sink while water moves horizontally above them.
T 21.0: camera/flow enters filter layers; particles are trapped while water passes.
T 21.5: clear-water line enters contact/storage chamber.
T 22.0: channel rounds into a pipe cross-section.

### Camera

Horizontal/vertical process tracking, 1.2× push through filter at T 20.75–21.25.

### Enter and exit

Enter river intake line. Exit on exact G3 pipe-flow centreline.

### Subject

EPA treatment-train facts: coagulation/flocculation, sedimentation, filtration, disinfection, storage/distribution. The film simplifies but preserves sequence.

### Sound

T 19.5: machine hum.
T 20.0: clustered clicks / granular chord.
T 20.5: low settling thump.
T 21.0: filtered-noise sweep.
T 21.5: clean glass tone A5.
T 22.0: pipe resonance takes over.

---

## 13 pipe-transit: Under the city

T 22.0–23.5, illustrated, hard cut.

### Composition

Camera travels inside a large buried water main. Curved pipe walls dominate frame edges, with bolts/joints and subtle mineral texture. Through a cutaway above, street foundations and a passing vehicle shadow provide scale. G3 is a highlighted streamline among many water-flow lines.

### Forms

PipeBody/pipeDeep double contour; waterBody fill with flow hatching; small bubbles/particles; valve ring ahead. Service-pipe branch appears upper-right.

### Overlays

annBlue flow lines and one annYellow valve/branch ring.

### Motion

T 22.0: G3 exact inside full pipe.
T 22.25: wall joints pass with strong parallax.
T 22.5: valve opens/branch appears.
T 23.0: tracer diverts into narrower service pipe.
T 23.25: camera accelerates through elbow.
T 23.5: pipe opens into faucet body.

### Camera

Forward ride, 24 fps, with 1.0 → 1.8 perceived speed increase.

### Enter and exit

Enter from treatment clear-water channel. Exit through pipe mouth into faucet.

### Subject

Treated water is stored/distributed through water mains and smaller service lines.

### Sound

T 22.0: low pipe hum.
T 22.5: valve tick.
T 23.0: Doppler-like water resonance.
T 23.5: bright faucet/open-air hit.

---

## 14 tap-use-drain: Through a home

T 23.5–25.5, illustrated, hard cut.

### Composition

A kitchen/sink scene with real objects: faucet, ceramic basin, glass, window, cloth, counter grain. The water emerges from the faucet, fills/splashes the glass edge, then the tracer follows overflow/rinse water into the sink and rotating drain flow. Background window shows moving city light/rain residue.

### Forms

Water stream is a tapered transparent-looking band with waterPale centre and waterDeep edge. Basin and glass have construction/hatching. Drain spiral becomes the transition object.

### Overlays

annBlue trajectory from faucet to basin; annYellow ring around drain only at final beat.

### Motion

T 23.5: faucet opens; jet stabilises.
T 24.0: glass catches water, surface rises.
T 24.5: tracer exits as rinse/overflow to basin.
T 25.0: basin sheet converges toward drain.
T 25.25: drain spiral accelerates and fills frame.
T 25.5: cut into sewer schematic with same rotation.

### Camera

Start medium domestic view, 2.2× push to drain from T 24.75–25.5.

### Enter and exit

Enter pipe-to-faucet. Exit on drain spiral.

### Subject

Domestic water use is a physical interaction; after use, wastewater enters collection systems rather than jumping directly to the river.

### Sound

T 23.5: faucet transient.
T 24.0: glass/water ping C6.
T 24.5: splash noise.
T 25.0: drain swirl resonator.
T 25.5: low sewer cut hit.

---

## 15 wastewater-return: Cleaned again

T 25.5–27.5, schematic, hard cut.

### Composition

The drain spiral becomes a sewer collector entering a simplified wastewater treatment sequence: screen/grit → primary settling → aerated biological zone → final clarification/disinfection → effluent channel. The tracer stays in the water phase while solids separate.

### Forms

Screen bars catch large solids. Grit particles sink. Aeration bubbles rise through a dense biological/floc field. Clarifier has slow radial flow and downward settled solids. Effluent channel returns to G3.

### Overlays

One process bracket, flow arrows and progress glyph 8/12. Magenta limited to one process-change flash at biological treatment start.

### Motion

T 25.5: sewer flow enters screen.
T 26.0: debris stops while water passes.
T 26.5: solids settle; water continues.
T 27.0: aeration bubbles and biological texture activate.
T 27.25: clarified/treated channel isolates.
T 27.5: G3 exits toward receiving river.

### Camera

Process tracking similar to shot 12 but visually distinct, with more organic aeration/settling texture.

### Enter and exit

Enter same drain rotation, unrolled into collector pipe. Exit on G3 effluent channel.

### Subject

Municipal wastewater treatment typically includes screening/grit removal, settling, biological treatment and disinfection before discharge/reuse; exact plants vary.

### Sound

T 25.5: sewer hum.
T 26.0: screen clack.
T 26.5: low settling tone.
T 27.0: aeration bubble rhythm.
T 27.5: open-water cut.

---

## 16 river-release: Back to the river

T 27.5–29.0, illustrated, hard cut.

### Composition

A real outfall channel joins a moving river. The outfall is visible but not heroic: concrete edge, reeds, stones, bank plants, broad water. The tracer enters receiving water and rapidly becomes one small local streamline.

### Forms

RiverBank / stoneBody / vegetation; water surface bands; outfall channel with concrete/pipe geometry. Small foam/eddies only at the mixing zone.

### Overlays

Two annBlue mixing arcs; annYellow tracer ring fades quickly to avoid implying permanent isolation.

### Motion

T 27.5: G3 enters river.
T 28.0: mixing eddy forms and tracer bends into main current.
T 28.5: camera begins downstream track.
T 28.75: banks widen / salinity-estuary visual hints begin.
T 29.0: river opens into estuary.

### Camera

Downstream track with 1.8× pull-back.

### Enter and exit

Enter exact G3 from wastewater channel. Exit preserves water direction into estuary/ocean shot.

### Subject

Treated effluent can be discharged to receiving waters; once mixed, the tracer is only an editorial highlighted parcel.

### Sound

T 27.5: river noise opens.
T 28.0: eddy splash.
T 28.5: motif G5–D6.
T 29.0: low ocean swell enters.

---

## 17 estuary-ocean: Into the ocean

T 29.0–31.0, illustrated, hard cut.

### Composition

A wide estuary opens to sea. Foreground reeds/shoreline; midground mixing bands and small waves; distant horizon, sun, birds and cloud bank. The tracer reaches the ocean and becomes visually tiny. In the final half-second, camera dives toward a sunlit patch of surface centred on exact G4.

### Forms

SeaBody/seaDeep wave bands at 3 scales, local waterFoam on breaking edges, river plume as slightly different hatch direction rather than a different opaque colour. G4 circle is implicit in one sunlit ripple field.

### Overlays

annYellow sun-energy arc and one faint annBlue river-to-sea flow line. No permanent tracer ring.

### Motion

T 29.0: estuary flow continues.
T 29.5: mixing bands broaden.
T 30.0: small wave set crosses tracer; it disappears into larger reservoir.
T 30.5: sun arc brightens surface patch.
T 30.75: 4× macro push toward G4.
T 31.0: G4 fills the frame for schematic cut.

### Camera

Wide pull-back first, then decisive macro push to ocean surface.

### Enter and exit

Enter downstream vector. Exit exact G4 ocean-surface guide.

### Subject

Oceans are Earth's dominant water reservoir and receive water from rivers/groundwater; ocean evaporation is a major source of atmospheric moisture.

### Sound

T 29.0: wide ocean noise.
T 29.5: low wave pulse.
T 30.0: full motif softly returns.
T 30.5: high sunlight partial.
T 31.0: macro suction.

---

## 18 surface-evaporation: Leaving the surface

T 31.0–33.0, schematic, hard cut.

### Composition

G4 is a circular macro field around the ocean surface. Below centre is a dense liquid lattice/particle field; above is sparse vapor space. Sun-energy arrows enter from upper-left. The tracked water ceases to have one coherent liquid boundary as individual schemWater points separate and rise.

### Forms

Liquid surface as dense connected nodes/short bonds; vapor as separated points with much larger spacing. G4 guide exact. One wave crest line remains as a reference plane.

### Overlays

Energy arrows, phase bracket, progress glyph 9/12. Magenta flash only at selected phase-change points.

### Motion

T 31.0: G4 exact and liquid surface dense.
T 31.5: surface nodes gain motion/spacing.
T 32.0: first tracer points separate upward.
T 32.5: more vapor points rise while coherent liquid tracer disappears.
T 32.75: camera follows the tracer cluster upward.
T 33.0: liquid surface leaves frame; G4 becomes atmospheric guide.

### Camera

Vertical upward follow, 1.0 → 1.4 scale on tracer cluster.

### Enter and exit

Enter G4 from ocean surface. Exit maintains tracer points and G4 field in cooler atmosphere.

### Subject

Evaporation changes liquid water into vapor; do not depict intact tiny liquid droplets floating upward unchanged.

### Sound

T 31.0: low surface tone.
T 31.5: rising filtered noise.
T 32.0: C6 sparkle.
T 32.5: G6/A6 partials.
T 33.0: airy high cut.

---

## 19 condensation-return: Becoming cloud

T 33.0–34.5, schematic, hard cut.

### Composition

The rising tracer points enter a cooler field with aerosol nuclei. Around several nuclei, small liquid shells appear. Many microscopic droplets gather into a cloud-lobe density pattern. G4 remains faint; G1 outline begins to emerge at the end.

### Forms

Aerosol points 1–2 px, new droplets 2–8 px, larger cluster droplets 10–18 px. One future G1 contour appears only in the final 0.25 s.

### Overlays

Condensation brackets/ticks and progress glyph 10/12. One magenta flash at first liquid shell formation.

### Motion

T 33.0: sparse vapor points.
T 33.25: first nuclei encounter.
T 33.5: several liquid shells appear.
T 34.0: droplet density increases; local coalescence begins.
T 34.25: field starts reading as one cloud lobe.
T 34.5: paper cloud contour/G1 is ready under the cut.

### Camera

Slow 1.5× pull-back to convert microdroplets into a cloud-scale mass.

### Enter and exit

Enter tracer points from evaporation. Exit matches blueprint cloud lobe and emerging G1 to illustrated cloud.

### Subject

Cooling favours condensation; droplets form around condensation nuclei and aggregate into visible clouds.

### Sound

T 33.0: sparse high noise.
T 33.5: first glass tick C5.
T 34.0: motif fragments G5, D6.
T 34.5: warm paper hit.

---

## 20 cloud-loop: The cycle continues

T 34.5–36.0, illustrated, hard cut.

### Composition

The same cloud environment language as shot 01 returns, but now the camera begins wider. One lobe contains the tracer cluster; droplets coalesce until a new precipitation-ready G1 forms at (540,720). The last frame is compositionally compatible with the opening frame so playback can loop.

### Forms

CloudBody/cloudShade layered lobes, 30–60 surrounding droplets, G1 waterPale/body outline, cycleGold glint. Background sky/stripes and lower foreground cloud masses match shot 01's spatial rhythm.

### Overlays

A faint annYellow cycle arc draws around the cloud once, then fades before the final frame.

### Motion

T 34.5: cloud field appears from schematic match.
T 35.0: tracer cluster joins a larger droplet.
T 35.5: exact G1 settles at opening position.
T 35.75: surrounding drift converges to the shot-01 opening cloud arrangement.
T 36.0: final frame can hard-loop to T 0 with no conceptual reset.

### Camera

Pull-back completes by T 35.0, then settles. No final zoom flourish.

### Enter and exit

Enter from blueprint condensation. Exit loops to shot 01's cloud composition/G1.

### Subject

The water cycle has no privileged beginning or ending. The new precipitation-ready drop represents continued cycling, not the claim that one macroscopic drop remained isolated through every reservoir.

### Sound

T 34.5: warm paper hit + C5.
T 35.0: G5.
T 35.5: D6, A5 complete motif.
T 35.75: low cloud-noise tail aligns with the opening ambience.
T 36.0: no terminal impact; loop-safe ambience.
