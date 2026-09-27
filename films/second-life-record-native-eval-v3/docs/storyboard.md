# Storyboard: Second Life of a Record

## Logline

A record collector finds a visibly dirty LP, hears an unpleasant first playback, carefully wet-cleans and vacuums the record, then repeats the same playback setup and finally relaxes into cleaner sound.

Method: a 30-second vertical animated comic built from concrete human actions, stable character/prop models, panel grammar, macro insets and mirrored before/after playback geometry.

## Numbers

- BPM: **120**
- beat: **0.5 s = 12 frames**
- bar: **2.0 s = 48 frames**
- duration: **30.0 s = 15 bars = 720 frames**
- canvas: **1080 × 1920**
- fps: **24**
- shot count: **10**
- every shot: **3.0 s = 72 frames = 6 beats**
- all cuts land on the 0.5 s beat grid
- midpoint downbeat: **T 15.0**, the first frame of active cleaning

V3 intentionally does not alternate the native paper/blueprint plates. The fresh reference analysis replaces that grammar with a single comic world plus occasional macro/technical insets inside illustrated shots.

## Summary

| Order | Id | Start | End | Mode | Dominant verb | Title |
|---|---|---:|---:|---|---|---|
| 01 | find-record | 0.0 | 3.0 | illustrated | FIND | The sleeve |
| 02 | inspect-dust | 3.0 | 6.0 | illustrated | INSPECT | Something is wrong |
| 03 | first-play | 6.0 | 9.0 | illustrated | PLAY | First try |
| 04 | hear-crackle | 9.0 | 12.0 | illustrated | HEAR | KRRK |
| 05 | decide-clean | 12.0 | 15.0 | illustrated | DECIDE | Do it properly |
| 06 | wet-brush | 15.0 | 18.0 | illustrated | CLEAN | Into the grooves |
| 07 | vacuum-dry | 18.0 | 21.0 | illustrated | VACUUM | Lift it away |
| 08 | return-record | 21.0 | 24.0 | illustrated | RETURN | Back to the deck |
| 09 | second-play | 24.0 | 27.0 | illustrated | PLAY AGAIN | Same needle |
| 10 | enjoy-music | 27.0 | 30.0 | illustrated | ENJOY | Different ending |

Files are `src/scenes/NN-<id>.js`.

## Structure

### Act 1 — discovery, bars 1–3 (T 0–6)

The protagonist and record are introduced as concrete recurring characters/props.
The audience must understand the record is dirty before any playback occurs.

### Act 2 — failed playback, bars 4–6 (T 6–12)

The record is placed on a recognisable turntable.
The tonearm/stylus lands.
The next shot proves the problem through sound-source, comic crackle graphics and protagonist reaction.

### Act 3 — decision and cleaning, bars 7–10.5 (T 12–21)

T 12–15 turns concern into a concrete decision and transfers the same record to a distinct cleaning setup.
The midpoint downbeat T 15 starts actual wet cleaning.
Fluid → brush contact → vacuum removal → visibly dry surface.

### Act 4 — return and proof, bars 10.5–15 (T 21–30)

The record returns to the turntable.
Shot 09 deliberately repeats shot 03 geometry.
Shot 10 begins as a clean mirror of shot 04, then opens into a warm listening-room payoff.

### Story hinge

**T 15.0** is the midpoint and the irreversible action:
the brush makes committed contact with the wet rotating record.

Before T 15 the protagonist is discovering/diagnosing.
After T 15 the protagonist is solving/proving.

### Scale changes

- 01: environmental medium → record close medium
- 02: record/face close-up → groove macro inset
- 03: top-down turntable
- 04: sound-source / reaction split
- 05: character + transfer → top-down cleaning platter
- 06: top-down cleaning → brush/groove macro
- 07: vacuum-contact macro → dry top-down record
- 08: close safe grip → top-down turntable
- 09: exact playback mirror
- 10: exact reaction mirror → room pull-back

### Time device

No calendar or abstract progress glyph.
Time is shown through completed actions and repeated physical geometry.

### Loop

V3 is not required to loop.
The ending resolves emotionally rather than hiding a loop seam.

## Conventions

- `T` is global seconds; `t = T − shot.start`.
- Camera uses `lib.camera`.
- Character/object poses use `lib.onTwos(t)`.
- Record/platter rotation and camera movement may run at 24 fps.
- Hard cut is default.
- Incoming shot owns any non-cut transition.
- All must-read content remains in x 60–940, y 220–1540.
- Comic panels remain inside that safe region when they carry action/reaction.
- There is no explanatory dialogue.
- Sound words are graphic effects, not narration.

## Shared geometry

### G1 — canonical record circle

Used in inspection, playback, cleaning and return match cuts.

| Property | Value |
|---|---:|
| centre x | 540 |
| centre y | 930 |
| record radius | 285 |
| label radius | 92 |
| spindle hole radius | 8 |
| outer rim band | 14 |
| label orientation mark | radial at −32° on first appearance |

The record may rotate, but whenever a transition claims an exact G1 match, the centre/radius stay fixed on the cut frame.

### G2 — playback turntable top-down

Canonical geometry for shots 03 and 09.

| Element | Geometry |
|---|---|
| plinth | x 105, y 575, w 870, h 760, corner r 38 |
| platter centre | (540, 930) |
| platter radius | 312 |
| record | G1 |
| tonearm pivot | (900, 655) |
| arm elbow guide | (828, 725) |
| stylus contact | (698, 814) |
| cartridge long axis | 140° |
| start/stop control centre | (865, 1225), r 34 |

Shots 03 and 09 copy these pixels exactly.

### G3 — stylus-contact macro inset

Used at the end of 03, in 04, at the end of 09 and the opening of 10.

| Property | Value |
|---|---:|
| inset box | x 555, y 255, w 350, h 430 |
| groove macro centre | (730, 480) |
| visible groove band centre | y 515 |
| stylus tip contact | (730, 515) |
| cartridge entry angle | 140° |
| inset border | 4 px |

The macro may be absent in earlier frames but when present its border and contact point remain exact.

### G4 — reaction inset

Used in dirty reaction and clean reaction.

| Property | Value |
|---|---:|
| panel box | x 85, y 285, w 365, h 455 |
| face centre | (270, 490) |
| head height | 215 |
| shoulder line y | 650 |
| eye/gaze target | toward lower-right |

Shot 10 opens on the same G4 box before the panel expands away.

### G5 — cleaning platter

The record itself remains exact G1.

| Element | Geometry |
|---|---|
| machine body | x 120, y 600, w 840, h 700, r 42 |
| cleaning platter centre | (540, 930) |
| record | G1 |
| brush approach anchor | (815, 690) |
| brush contact centre | (650, 815) |
| vacuum pivot/hinge | (205, 695) |
| vacuum contact line | from (320, 770) to (680, 975) |

Shots 05–07 use the same machine/record anchors.

### G6 — safe hand grip at 4/8 o'clock

When the record is carried:
- left contact centre: polar angle 145°, radius 278 from G1;
- right contact centre: polar angle 35°, radius 278 from G1;
- thumb may enter toward label-safe area but never crosses into the hero groove field;
- cut-to-cut change in contact angle ≤15°.

### G7 — listening-room anchor

Recurring environmental anchors:
- table top y = 1260;
- lamp centre = (790, 430);
- speaker main centre = (840, 930);
- record-shelf block = x 80–335, y 420–1040.

Used in shots 01, 03/04 background fragments, 08/09 and 10.

## Transition map

| From → To | Mechanism | Conserved story element |
|---|---|---|
| 01 → 02 | hard cut on held record | record edge / safe grip |
| 02 → 03 | record circle expands to G1 top-down | record circle |
| 03 → 04 | stylus macro inset persists | G3 |
| 04 → 05 | protagonist hand stops action, hand exits toward record | hand direction / concern pose |
| 05 → 06 | exact G1 turntable circle becomes G5 cleaning circle | record circle |
| 06 → 07 | brush contact line becomes vacuum contact line across same rotating disc | G1 + contact arc |
| 07 → 08 | dry record lifted on G6 grip | record + hand |
| 08 → 09 | record settles onto exact G2 platter | G1 / G2 |
| 09 → 10 | exact G3 + mirrored reaction G4 | stylus contact / reaction panel |
| 10 → end | panel borders retract into full warm room | protagonist + turning record |

# Shots

---

## 01 find-record: The sleeve

T 0.0 to 3.0, illustrated, hard cut.

### Composition

Full-bleed comic panel in the home listening corner.

Foreground left:
- cropped shelf edge and 4–7 record spines.

Midground:
- protagonist three-quarter torso, occupying x 290–860, y 350–1450;
- left hand stabilises a generic sleeve;
- right hand begins sliding the record out.

Background:
- G7 lamp, table edge, partial speaker and turntable silhouette establish this as a listening space without stealing focus.

The record emerges into the safe-area centre by the end.

### Forms

Protagonist follows §5.1 model:
- hair, rust `shirt`, `tee`, `skin`.

Sleeve:
- `sleeve` / `sleeveShadow`;
- generic geometric cover shapes only.

Record:
- `vinyl`, `vinylEdge`, `label`;
- enough groove reflections to read as an LP, not a black disc.

### Overlays

No explanatory arrows.

One comic panel crop line at the left shelf edge.
At T 2.5 a small `cleanGold` attention arc follows the emerging record edge, not a halo.

### Motion

- T 0.0: cold open already shows a hand selecting the sleeve.
- T 0.5: sleeve clears the shelf by ~80 px.
- T 1.0: second hand establishes a safe edge/label grip.
- T 1.5: record edge appears.
- T 2.0: record is half exposed; sleeve flexes 6–8 px.
- T 2.5: record fully clears sleeve; hand transfers to a stable edge grip.
- T 3.0: held record occupies the outgoing composition.

### Camera

Slow 1.00 → 1.08 push from T 1.5 to 3.0.
Camera remains smooth at 24 fps; hand/body on twos.

### Enter and exit

Cold open.

Exit holds the physical record at a readable angle.
Shot 02 hard-cuts closer while preserving the hand/edge relationship, not exact G1.

### Subject

Source-derived:
- grooved record is handled by edge/label-safe areas, not flat fingers on the playing surface.

Narrative invention:
- the protagonist discovers this record in a home shelf.

### Sound

- T 0.0: soft room tone; four-note motif seed A4, E5, C#5, B4 played sparsely on muted mallet.
- T 0.5: sleeve paper scrape.
- T 1.5: soft card/paper friction as disc emerges.
- T 2.5: small glassy A5 curiosity accent.
- T 3.0: dry cut tick.

---

## 02 inspect-dust: Something is wrong

T 3.0 to 6.0, illustrated, hard cut.

### Composition

Dominant panel:
protagonist holds record beneath G7 lamp, face on upper-left third, record on lower/right two-thirds.

The record is tilted 15–28° so a lamp reflection sweeps across grooves.

A macro inset grows at upper-right/lower-right without covering hand contact:
- groove field;
- dust clusters;
- one fibre;
- cleanly readable concentric groove arcs.

By T 5.5 the inset is the visual focus.

### Forms

Record is three-quarter ellipse derived from G1 proportions.
Dust uses `dust` and `grit`.
Macro inset border 4 px `comicBorder`.
Halftone on face/shirt shadow; sparse hatching under fingers.

### Overlays

- one `badCyan` attention bracket around the dust cluster;
- one tiny `badMagenta` broken mark appears only after the viewer has seen the physical dirt;
- no word “dirty”.

### Motion

- T 3.0: record already held, stable.
- T 3.5: wrist tilts +5°; reflected groove arc travels.
- T 4.0: protagonist gaze moves to the highlight.
- T 4.5: macro inset pops in over 3 frames.
- T 5.0: inset pushes from 1.0× to 1.35×; fibre/dust become obvious.
- T 5.5: one dust fibre lifts slightly with static-like motion; protagonist brow tightens.
- T 6.0: record circle fills enough of frame to cut into playback geometry.

### Camera

Main camera locked.
Macro inset has a short 1.35× push.

### Enter and exit

Enter from shot 01's held record.

Exit: the visible circular record expands/rotates into exact G1 on shot 03's turntable.

### Subject

Source-derived:
- dust/dirt is a legitimate record-care concern;
- preservation cleaning workflows target dust/microscopic contamination;
- do not imply every speck causes one exact noise.

### Sound

- T 3.0: room tone narrows; motif pauses.
- T 3.5: soft fingertip/sleeve micro-rustle.
- T 4.5: macro-inset paper snap.
- T 5.0: tiny high filtered tick as fibre comes into focus.
- T 5.5: low questioning E3 tone.
- T 6.0: turntable-start mechanical cue begins under cut.

---

## 03 first-play: First try

T 6.0 to 9.0, illustrated, hard cut.

### Composition

Top-down comic panel of the complete generic turntable using exact G2.

Record is exact G1.
Tonearm is visibly separate from the record until the lowering beat.
A small G3 stylus macro inset appears during the final second.

One cropped protagonist hand enters only for start/cue action.

### Forms

- `turntableBody` plinth;
- `platter`, `mat`;
- `vinyl`, `label`;
- `tonearm`, `cartridge`, `stylus`;
- metal spindle and hardware.

The record is unmistakably a grooved LP.

### Overlays

- short `cleanGold` rotational cue arc around the label;
- tiny “CHK” in `soundWord` on stylus contact;
- no bad-sound distortion until contact has physically occurred.

### Motion

- T 6.0: record is already placed at G1, safe hand exits.
- T 6.5: start control is pressed; platter begins smooth rotation.
- T 7.0: label rotation makes movement unmistakable.
- T 7.5: tonearm pivots from rest.
- T 8.0: G3 macro inset appears, showing cartridge above grooves.
- T 8.5: stylus descends to exact G3 contact; 1–3 px settle.
- T 9.0: first irregular crackle begins as the shot cuts to reaction.

### Camera

Locked top-down.
Inset uses a 1.1× micro push from T 8.0–8.5.

### Enter and exit

Enter by circular match from inspected record to G1.

Exit preserves G3 macro inset position/contact into shot 04.

### Subject

Source-derived:
- record on platter;
- platter rotation;
- tonearm/stylus lowered to contact the record.

### Sound

- T 6.0: motor/platter low mechanical tone.
- T 6.5: start-control click.
- T 7.5: soft tonearm pivot/felt movement.
- T 8.5: stylus “CHK”, short high transient + quiet sub body.
- T 9.0: first synthetic vinyl crackle spike begins.

---

## 04 hear-crackle: KRRK

T 9.0 to 12.0, illustrated, hard cut.

### Composition

Comic action/reaction frame.

Main lower panel:
- turning record and stylus contact;
- speaker at right edge;
- G3 macro inset remains upper-right.

Reaction inset:
- exact G4 at upper-left;
- protagonist listens, then visibly winces/concerns.

Bad-sound graphics bridge the physical source and reaction but never obscure stylus/face.

### Forms

Same turntable/record identity as shot 03.
Speaker uses `speaker`, `speakerCone`.
Reaction face follows “listening concern” pose.

### Overlays

Controlled problem language:
- “KRRK” appears T 9.5;
- 2–5 broken `badMagenta`/`badCyan` vibration marks;
- selected contour fragments offset 4–9 px;
- speaker cone gets 1–3 irregular jolts.

### Motion

- T 9.0: exact G3 persists from previous shot.
- T 9.5: first major crackle; “KRRK” pops; speaker jolt.
- T 10.0: protagonist eye shifts toward speaker/turntable.
- T 10.5: second crackle cluster; shoulder rises; mouth changes.
- T 11.0: hand enters toward cue/stop.
- T 11.5: playback is stopped / tonearm begins lifting.
- T 12.0: bad graphics collapse and hand direction carries into shot 05.

### Camera

Locked comic layout.
No dramatic zoom; reaction comes from pose/panel effects.

### Enter and exit

Enter with exact G3.

Exit on the protagonist's hand moving toward the physical record/controls, making the next decision/action causal.

### Subject

Supported context:
- dust/dirt is a legitimate care/listening concern.

Narrative scope:
- this particular record is noisy before cleaning.
- film does not claim all crackle is dirt.

### Sound

- T 9.0: irregular filtered-noise crackle bed enters.
- T 9.5: loud crackle cluster + “KRRK” visual.
- T 10.5: second cluster, lower and shorter.
- T 11.0: music motif attempts A4–E5 but is interrupted/masked.
- T 11.5: stop/cue click; motor sound begins decaying.
- T 12.0: problem noise cuts cleanly.

---

## 05 decide-clean: Do it properly

T 12.0 to 15.0, illustrated, hard cut.

### Composition

Starts as a medium character panel:
protagonist leans forward in “decision” pose and safely lifts the record.

The panel edge slides to reveal a distinct cleaning station.
By T 14.0 the record becomes exact G1 over G5 cleaning machine.

Fluid bottle and brush are visible as concrete tools.
The vacuum wand is present in the background, not active yet.

### Forms

Character:
rust overshirt, rolled sleeves.

Record:
same label/orientation marker.

Cleaning machine:
`machine`, `machineDeep`, `vacuum`.

Brush:
`brush`, `brushFiber`.

Fluid:
bottle/nozzle only, no liquid contact before T 15.

### Overlays

- one decisive red/orange action slash behind the lifting arm at T 12.5;
- panel border becomes table/plinth edge;
- no “clean” label.

### Motion

- T 12.0: hand completes tonearm/stop action.
- T 12.5: G6 safe grip established.
- T 13.0: record lifts clear of turntable.
- T 13.5: panel slides, revealing cleaning setup.
- T 14.0: record settles to exact G1/G5.
- T 14.5: fluid nozzle enters; brush hand prepares.
- T 15.0: first fluid bead contacts the rotating record on the midpoint downbeat.

### Camera

Medium character framing transitions to top-down through an 8-frame panel/camera reframe.
Final 0.5 s locked on G5.

### Enter and exit

Enter from shot 04 hand direction.

Exit exact G1/G5 on first fluid contact into shot 06.

### Subject

Source-derived:
- safe record handling;
- machine cleaning and brushing are legitimate care actions.

### Sound

- T 12.0: silence/room tone after crackle.
- T 12.5: decisive low tom-like hit.
- T 13.5: panel slide paper/wood swish.
- T 14.0: record settles with soft spindle click.
- T 14.5: bottle/nozzle handling tick.
- T 15.0: liquid-contact plip + first clean-state teal tonal layer.

---

## 06 wet-brush: Into the grooves

T 15.0 to 18.0, illustrated, hard cut.

### Composition

Hero cleaning shot.

Exact G5 top-down record/machine fills the frame.
Fluid beads form a thin moving wet film.
Brush hand enters from upper-right and establishes visible fibre contact.

A macro inset briefly shows fibres contacting groove bands, but the main physical action remains clear at full shot scale.

### Forms

- rotating `vinyl` record;
- `fluid` / `fluidPale` film;
- `brush` handle;
- `brushFiber` bristle bed;
- `skin` hand;
- G5 machine body.

Dust marks ahead of the brush reduce/move; they do not vanish in a glowing wipe.

### Overlays

- one “SHFF” appears behind the brush at T 16.5;
- 2–3 short `cleanTeal` action strokes indicate brush travel;
- no magenta/cyan problem offset.

### Motion

- T 15.0: first fluid bead lands.
- T 15.5: rotating disc carries fluid into an arc/ribbon.
- T 16.0: brush fibres visibly contact; handle pressure settles.
- T 16.5: brush sweep crosses ~140 px; fibres lag 1–3 frames; “SHFF”.
- T 17.0: wet film becomes more even; visible dust is displaced/reduced.
- T 17.5: macro inset shows groove/fibre contact, then retracts.
- T 18.0: brush lifts; wet record remains rotating and vacuum wand begins moving in.

### Camera

Locked G5 top-down.
Macro inset 1.3× only.

### Enter and exit

Enter exact G1/G5 from shot 05.

Exit keeps same record centre/rotation; brush contact line is replaced by the incoming vacuum contact line in shot 07.

### Subject

Source-derived:
- cleaning solution;
- soft brush;
- rotating disc;
- controlled physical contact.

### Sound

- T 15.0: liquid plip.
- T 15.5: light wet rotation noise.
- T 16.0: brush contact dry/wet sweep begins.
- T 16.5: “SHFF” brush sweep, broadband noise with short mid-frequency body.
- T 17.0: motif seed C#5 quietly returns.
- T 17.5: macro contact tick.
- T 18.0: low vacuum motor starts under cut.

---

## 07 vacuum-dry: Lift it away

T 18.0 to 21.0, illustrated, hard cut.

### Composition

Same G5 record and machine.

Vacuum wand pivots into the exact contact line.
Wet film converges visibly toward the slot.
Behind the slot, groove reflections become dry/stable.

The frame uses a diagonal comic crop late in the shot to compare wet-ahead vs dry-behind without text.

### Forms

Vacuum wand:
`vacuum` with `machineDeep` hardware.

Wet film:
`fluidPale`.

Dry surface:
`vinyl`, `groove` with stable reflected arcs.

### Overlays

- short `cleanTeal` converging suction lines;
- no sci-fi beam;
- one narrow diagonal panel divider T 19.5–20.5 shows the wet/dry contrast.

### Motion

- T 18.0: wand moves in while record rotates.
- T 18.5: contact/near-contact established; vacuum sound rises.
- T 19.0: wet film visibly narrows into slot.
- T 19.5: diagonal comparison divider appears.
- T 20.0: dry groove reflections follow behind the contact line.
- T 20.5: wand lifts; no visible wet-film highlight remains on the hero area.
- T 21.0: protagonist hands approach G6 safe grip.

### Camera

Locked G5 top-down.
Very small 1.00 → 1.06 push during T 18.5–20.0.

### Enter and exit

Enter same record/contact axis as brush shot.

Exit dry G1 + G6 hands, preparing literal carry back to the turntable.

### Subject

Source-derived:
- vacuum removes cleaning liquid;
- record should be dry before removal/handling.

### Sound

- T 18.0: vacuum motor/hum opens.
- T 18.5: suction contact accent.
- T 19.0: filtered broadband suction peaks.
- T 20.0: suction thins while cleanGold overtone appears.
- T 20.5: vacuum motor falls.
- T 21.0: soft hand/edge contact.

---

## 08 return-record: Back to the deck

T 21.0 to 24.0, illustrated, hard cut.

### Composition

Starts close on G6 safe grip lifting the dry record.
A panel wipe follows the record circle back into the listening corner.

By T 22.5 the turntable is fully visible and the record approaches exact G2.
By T 23.5 the record settles onto the platter, while tonearm remains at rest.

This visually confirms it is the same record.

### Forms

Dry record:
- clear groove arcs;
- same `label` orientation mark.

Room:
G7 anchors return.

Turntable:
exact G2.

### Overlays

- one thin `cleanGold` circular path follows the record transfer;
- no before/after label;
- panel border becomes turntable plinth edge.

### Motion

- T 21.0: G6 grip closes.
- T 21.5: record lifts.
- T 22.0: record travels through panel wipe; protagonist torso passes behind.
- T 22.5: G2 turntable revealed.
- T 23.0: record aligns above spindle.
- T 23.5: record settles to exact G1.
- T 24.0: hand leaves; playback mirror begins.

### Camera

Close carry framing → top-down G2 over 12 frames.
Final 0.5 s locked.

### Enter and exit

Enter dry G1/G6 from shot 07.

Exit exact G2, matching shot 09 and deliberately recalling shot 03.

### Subject

Source-derived:
- dry record is handled safely and returned to platter.

### Sound

- T 21.0: soft edge-contact sound.
- T 21.5: short movement swish.
- T 22.5: room tone returns warmer/wider.
- T 23.5: spindle/platter placement click.
- T 24.0: same motor cue as T 6.0, now cleaner/brighter.

---

## 09 second-play: Same needle

T 24.0 to 27.0, illustrated, hard cut.

### Composition

**Exact visual mirror of shot 03.**

G2 turntable top-down copied pixel-for-pixel.
Same G1 record scale.
Same tonearm pivot.
Same G3 macro inset timing/position.

Differences are limited to record cleanliness and graphic/audio state.

### Forms

Identical to shot 03.

Pre-clean dust clusters near the macro contact are absent/reduced.
All contour registration is stable.

### Overlays

- same rotational cue arc, now `cleanTeal`;
- same “CHK” contact word, smaller/cleaner;
- after contact, smooth `cleanGold` and `cleanTeal` music arcs begin instead of crackle.

### Motion

- T 24.0: exact G2 start state.
- T 24.5: start control / platter begins, matching T 6.5.
- T 25.0: label rotation matches shot 03 rhythm.
- T 25.5: tonearm pivots, matching T 7.5.
- T 26.0: G3 inset appears.
- T 26.5: stylus contacts exact G3 point; 1–3 px settle.
- T 27.0: clean musical graphic flows into shot 10.

### Camera

Exactly mirrors shot 03.

### Enter and exit

Enter exact G2 from shot 08.

Exit exact G3 into shot 10, mirroring 03 → 04.

### Subject

Source-derived:
same physical playback sequence.

Narrative scope:
this particular cleaned record is staged as audibly improved; no claim that cleaning fixes scratches/wear/every noise source.

### Sound

- T 24.0: motor cue mirrors T 6.0.
- T 24.5: same start click as T 6.5.
- T 25.5: same tonearm cue as T 7.5.
- T 26.5: same physical “CHK” transient as T 8.5.
- T 27.0: full stable motif A4–E5–C#5–B4 starts on eighths with no crackle mask.

---

## 10 enjoy-music: Different ending

T 27.0 to 30.0, illustrated, hard cut.

### Composition

Opening 1.0 s deliberately mirrors shot 04:
- exact G3 stylus macro;
- exact G4 reaction panel;
- record/speaker source relationship.

But:
- no dirty registration;
- smooth gold/teal music curves;
- protagonist transitions from listening check to visible relief.

At T 28.0 the G4 panel border retracts.
Camera pulls to the full G7 listening corner:
- protagonist sits/leans back;
- turning record remains visible;
- speaker and lamp establish warm room depth;
- the record collection frames the scene.

Final frame is a resolved comic panel, not a technical end card.

### Forms

Character “relief/enjoyment” pose.
Warmest room palette:
`paper`, `sunset`, `lamp`, `wood`, `cleanGold`, `cleanTeal`.

Record keeps rotating.
Speaker motion is rhythmic/subtle.

### Overlays

- 2–4 smooth music rings/curves from speaker/turntable;
- one cleanGold curve passes behind protagonist, not across face;
- no magenta/cyan offset;
- no explanatory caption by default.

### Motion

- T 27.0: exact mirror state opens.
- T 27.5: smooth musical arc replaces the crackle event that occurred at T 9.5.
- T 28.0: protagonist shoulders drop 18–22 px; mouth/eye pose softens.
- T 28.5: reaction panel border retracts to reveal full room.
- T 29.0: camera pulls back 1.0 → 0.82; record/speaker continue.
- T 29.5: protagonist settles; one small hand/foot rhythmic motion may remain.
- T 30.0: hold a strong final comic frame with turning record still readable.

### Camera

T 27–28 locked mirror.
T 28.5–29.5 smooth pull-back.
T 29.5–30 hold.

### Enter and exit

Enter exact G3/G4 from shot 09.

No loop requirement.
End on emotional resolution and a still-readable record/listening setup.

### Subject

No additional technical claim.

Emotional/narrative resolution:
the protagonist is satisfied with the improved playback.

### Sound

- T 27.0: full procedural motif A4–E5–C#5–B4, stable and unmasked.
- T 27.5: warm chord pad opens; smooth speaker pulse.
- T 28.0: soft cleanGold bell overtone on relaxed reaction.
- T 28.5: room/stereo ambience widens.
- T 29.0: bass foundation enters lightly.
- T 29.5: motif resolves on A4/E5 dyad.
- T 30.0: natural musical tail, no terminal impact.

## Storyboard self-review

### Arithmetic

- 10 shots × 3.0 s = 30.0 s.
- Each shot boundary is a multiple of 0.5 s.
- 30.0 s × 24 fps = 720 frames.
- 120 bpm → 0.5 s beat, 2.0 s bar.
- 30.0 / 2.0 = 15 whole bars.
- Midpoint is T 15.0 exactly and lies on a beat/downbeat boundary.

### Narrative readability

The ten dominant verbs form a direct sentence:

**FIND → INSPECT → PLAY → HEAR → DECIDE → CLEAN → VACUUM → RETURN → PLAY AGAIN → ENJOY.**

No shot requires a technical diagram to understand its dominant action.

### Before/after proof

Shots 03/09 and 04/10 deliberately reuse:
- G1;
- G2;
- G3;
- G4;
- timing pattern.

Therefore the improvement is staged as a controlled visual comparison, not merely a palette change.

### Safe area

All must-read coordinates in G1–G7 are inside x 60–940 and y 220–1540.
The rightmost critical playback anchor is tonearm pivot x 900.
No required text sits in the bottom 380 px.

### Research traceability

- handling: shots 01, 05, 08;
- visible contamination: shot 02;
- playback mechanics: shots 03, 09;
- cleaning: shots 05–07;
- improved listening for this fictional record: shots 09–10 with explicit narrative limitation.

### V3 anti-ambiguity check

A still from each shot must visibly contain the concrete noun and verb:
- hand + sleeve/record;
- eye/lamp + dusty grooves;
- record + turntable + descending tonearm;
- playing stylus/speaker + reacting face;
- lifted record + cleaning tools;
- wet rotating record + contacting brush;
- rotating wet record + contacting vacuum wand;
- dry record + safe carry + turntable;
- same turntable + same stylus descent;
- same listener + stable music + turning record.

If any six-frame scene sheet fails this test later, it is a P1 composition failure.
