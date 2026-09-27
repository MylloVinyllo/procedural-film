# Storyboard: Second Life of a Record — Machine-Cleaning V4

## Logline

A record collector finds a dirty LP, hears an unpleasant first playback, moves the same record to a recognisable Myllo Vinyllo vacuum record-cleaning machine, follows visibly distinct solution / brush / reverse / vacuum stages, verifies cleaner grooves in a matched before/after macro, then repeats the same playback setup and enjoys the improved result.

V4 keeps the comic-story clarity that passed in V3, but turns the cleaning sequence into the film's central product/process proof.

## Numbers

- BPM: **120**
- beat: **0.5 s = 12 frames**
- bar: **2.0 s = 48 frames**
- duration: **36.0 s = 18 bars = 864 frames**
- canvas: **1080 × 1920**
- fps: **24**
- shot count: **12**
- each shot: **3.0 s = 72 frames = 6 beats**
- every cut lands on the 0.5 s beat grid
- exact midpoint: **T 18.0**, first committed brush-cleaning/reverse beat

The extra six seconds versus V3 are allocated entirely to making the machine process self-explanatory.

## Summary

| # | Id | Start | End | Dominant verb | Main label / semantic proof |
|---|---|---:|---:|---|---|
| 01 | find-record | 0.0 | 3.0 | FIND | concrete record + safe handling |
| 02 | inspect-dust | 3.0 | 6.0 | INSPECT | dirty groove macro |
| 03 | first-play | 6.0 | 9.0 | PLAY | exact playback geometry |
| 04 | hear-crackle | 9.0 | 12.0 | HEAR | crackle + human reaction |
| 05 | reveal-myllo | 12.0 | 15.0 | PLACE | ОЧИСТКА ПЛАСТИНКИ |
| 06 | pump-solution | 15.0 | 18.0 | APPLY | МОЮЩИЙ РАСТВОР |
| 07 | brush-reverse | 18.0 | 21.0 | CLEAN | ОЧИСТКА КАНАВОК / REVERSE |
| 08 | vacuum-collect | 21.0 | 24.0 | VACUUM | ВАКУУМ |
| 09 | grooves-before-after | 24.0 | 27.0 | VERIFY | ДО / ПОСЛЕ |
| 10 | return-record | 27.0 | 30.0 | RETURN | ПОВТОРНОЕ ПРОСЛУШИВАНИЕ |
| 11 | second-play | 30.0 | 33.0 | PLAY AGAIN | exact playback mirror |
| 12 | enjoy-music | 33.0 | 36.0 | ENJOY | clean reaction / payoff |

Files are `src/scenes/NN-<id>.js`.

## Structure

### Act 1 — discovery and diagnosis, T 0–6

Shots 01–02 remain close to the successful V3 semantics:
- person;
- record;
- visible debris;
- concrete groove macro.

The viewer should already know “this record is dirty/problematic” before any sound problem is introduced.

### Act 2 — first playback and failure, T 6–12

Shots 03–04 preserve the V3 playback proof:
- record on turntable;
- platter rotates;
- tonearm/stylus lands;
- sound is visibly/audio-visibly bad;
- listener reacts.

This is the “before” playback geometry that shots 11–12 will mirror.

### Act 3 — Myllo Vinyllo cleaning process, T 12–27

This is the V4 expansion.

- T 12–15: dedicated machine reveal and record placement;
- T 15–18: START / PUMP / wet-film stage;
- T 18–21: brush cleaning plus visible reverse direction;
- T 21–24: collection node + vacuum removal;
- T 24–27: matched groove before/after evidence.

The cleaning section is **15 seconds**, almost half the film.

### Act 4 — return and proof, T 27–36

- T 27–30: same record returns to the listening setup;
- T 30–33: shot 11 mirrors shot 03;
- T 33–36: shot 12 mirrors shot 04, then opens into the warm final room.

## Story hinge

**T 18.0** is the midpoint and physical commitment:
the brush node is engaged and the machine begins the unmistakable cleaning action.

Before T 18:
- diagnosis;
- machine identification;
- fluid setup.

After T 18:
- active cleaning;
- vacuum;
- proof;
- repeat playback.

## Dynamic label grammar

All process labels use the art-bible V4.8 system:
- x 90–930;
- y 225–350;
- charcoal/near-black process band;
- stage index at left;
- 44–52 px uppercase main line;
- optional 28–32 px second line;
- 4–6 frame entrance/exit;
- no bounce;
- no label obscures hardware/contact.

Labels appear only during the product/process block and repeat-playback handoff.

## Shared geometry

### G1 — record identity

Inherited from V3 for top-down/macro matching:
- canonical record centre: (540, 930)
- radius: 285
- label radius: 92
- spindle hole radius: 8

V4 3/4 scenes derive from the same physical object but use perspective ellipse geometry.

### G2 — playback turntable

Inherited exact V3 geometry for shots 03 and 11:
- plinth x 105, y 575, w 870, h 760;
- platter centre (540, 930);
- platter radius 312;
- tonearm pivot (900, 655);
- stylus contact (698, 814);
- start/stop centre (865, 1225), r 34.

Shots 03 and 11 must match pixel-for-pixel in their playback proof frames.

### G3 — stylus macro

Inherited exact V3:
- inset x 555, y 255, w 350, h 430;
- groove macro centre (730, 480);
- stylus tip contact (730, 515);
- same cartridge entry angle in before/after playback.

### G4 — listener reaction panel

Inherited exact V3:
- box x 85, y 285, w 365, h 455;
- face centre (270, 490);
- head height 215;
- shoulders y 650.

Shot 12 begins from the same G4 geometry used in shot 04.

### M1 — Myllo 3/4 machine recognition view

From V4 art bible:
- machine top back-left (185,620);
- top back-right (835,620);
- top front-right (950,900);
- top front-left (110,900);
- front lower-left (155,1370);
- front lower-right (895,1370);
- record ellipse centre (535,785);
- record ellipse rx 310, ry 118;
- supply pivot (285,645);
- vacuum pivot (790,645);
- front plate centre (530,1130).

Shots 05–08 keep these anchors unless a macro crop explicitly takes over.

### M2 — front control plate

Exact button anchors:
- START (450,1045)
- REVERSE (610,1045)
- PUMP (450,1200)
- VACUUM (610,1200)

The active ring is a semantic cue. It may not light before the corresponding physical action.

### M3 — supply/brush node

Left working node:
- pivot anchored at M1;
- visible bristle fringe;
- settles onto the record before PUMP/brush effects;
- remains engaged through brush/reverse stage;
- moves away before vacuum node is engaged.

### M4 — collection/vacuum node

Right working node:
- pivot anchored at M1;
- long clean metal wand;
- dark continuous contact slot;
- engages only after supply node clears.

### G8 — matched groove before/after

Exact comparison geometry from V4 art bible:
- BEFORE panel x 75–515, y 520–1230;
- AFTER panel x 565–1005, y 520–1230;
- identical groove curvature/radius family;
- 50 px gutter.

### G9 — machine-to-groove macro bridge

For shots 06–08:
- macro inset default box x 580, y 520, w 360, h 420;
- local record/groove motion runs left-to-right under the stationary tool contact;
- the inset may expand to full frame for a maximum of 0.75 s;
- same physical contact direction carries across brush → vacuum transitions.

## Transition map

| From → To | Mechanism | Conserved element |
|---|---|---|
| 01 → 02 | hard cut closer | same record + safe hand grip |
| 02 → 03 | record circle expands/rotates | G1 |
| 03 → 04 | G3 persists | stylus contact |
| 04 → 05 | stop hand lifts same record; comic panel follows circle | record identity |
| 05 → 06 | M1 holds | machine/record/control plate |
| 06 → 07 | brush contact continues; PUMP label swaps to CLEAN label | M1 + M3 |
| 07 → 08 | supply node retracts; same record remains; vacuum node enters from opposite side | M1 record plane |
| 08 → 09 | vacuum slot becomes split comparator bar | groove/contact line |
| 09 → 10 | AFTER groove panel zooms back into same physical record | record/groove identity |
| 10 → 11 | record settles into exact G2 | G1/G2 |
| 11 → 12 | exact G3/G4 mirror | playback proof |
| 12 → end | reaction panel retracts into full room | protagonist + turning record |

# Shots

---

## 01 find-record — The sleeve

T 0.0–3.0, illustrated, hard cut.

### Composition

Keep V3's successful full-bleed home listening panel.

Foreground:
- cropped record shelf and 4–7 spines.

Midground:
- recurring protagonist, three-quarter torso;
- one hand stabilises sleeve;
- second hand slides record out.

Background:
- lamp;
- turntable;
- speaker;
- table edge.

The record becomes the dominant object by T 2.0.

### Forms

Use V3 protagonist model unchanged.

Sleeve:
- square construction;
- generic flat graphic cover;
- visible paper thickness and opening edge.

Record:
- black vinyl;
- label;
- spindle hole;
- groove reflections;
- 5–10 px edge thickness at the three-quarter angle.

Hands:
- exact edge/label-safe grip.

### Overlays

No explanatory text.

One short gold attention arc may follow the emerging record edge after it is already recognisable.

### Motion

- T 0.0: hand already selecting sleeve.
- T 0.5: sleeve clears shelf.
- T 1.0: safe grip established.
- T 1.5: record edge appears.
- T 2.0: half exposed.
- T 2.5: fully removed, sleeve flex settles.
- T 3.0: record held for close inspection.

Primary action: remove record.

Secondary: sleeve flex, gaze shift.

Ambient: minimal room parallax only.

### Camera

Slow 1.00 → 1.08 push from T 1.5.

### Enter and exit

Cold open.

Hard cut to shot 02 preserving hand side and record orientation.

### Subject

Source-derived:
- edge/label-safe handling.

Narrative:
- record selected from home collection.

### Sound

- T 0.0 room tone + sparse motif seed.
- T 0.5 sleeve scrape.
- T 1.5 inner-sleeve friction.
- T 2.5 small curiosity bell.
- T 3.0 dry comic cut.

---

## 02 inspect-dust — Something is wrong

T 3.0–6.0, illustrated, hard cut.

### Composition

Protagonist + tilted record under lamp.

Main view:
- face upper-left;
- record lower-right / centre;
- reflected light travels across grooves.

Macro inset:
- concrete groove bands;
- dust;
- grit;
- 2–5 fibres.

By T 5.5 the dirt macro is unmistakable.

### Forms

Preserve V3 character identity.

Improve over V3:
- record ellipse more precise;
- fingers wrap rim with individual thumb opposition;
- dust remains spatially attached to the groove plane.

### Overlays

One cyan attention bracket around the physical dirt cluster after T 4.5.

No “грязь” caption.

### Motion

- T 3.0 held record.
- T 3.5 wrist tilt.
- T 4.0 eye tracks reflection.
- T 4.5 macro inset enters.
- T 5.0 fibre/dust becomes obvious.
- T 5.5 brow changes.
- T 6.0 circle prepares match to turntable.

### Camera

Main locked, macro short push.

### Enter and exit

Held record from shot 01.

Circular match to G2/G1 in shot 03.

### Subject

Dust/dirt is a legitimate cleaning concern; do not imply every speck causes every noise.

### Sound

- T 3.0 room tone narrows.
- T 4.5 inset snap.
- T 5.0 high focus tick.
- T 5.5 low questioning E3.
- T 6.0 motor lead-in.

---

## 03 first-play — First try

T 6.0–9.0, illustrated, hard cut.

### Composition

Exact V3 G2 top-down playback setup.

The main purpose is to create a clean mirror target for shot 11.

### Forms

Turntable, record, tonearm, stylus all keep V3 canonical geometry.

Improve only drawing polish if required:
- clearer cartridge;
- cleaner record edge;
- better mechanical pivot details.

### Overlays

- small rotation cue;
- “CHK” on stylus contact;
- no bad-sound graphics before contact.

### Motion

- T 6.0 record already placed.
- T 6.5 start control.
- T 7.0 visible label rotation.
- T 7.5 tonearm pivots.
- T 8.0 G3 inset appears.
- T 8.5 stylus contacts.
- T 9.0 first crackle enters.

### Camera

Locked top-down + tiny G3 push.

### Enter and exit

G1 match from shot 02.

G3 persists into shot 04.

### Subject

Playback mechanics as captured in V3 research.

### Sound

Mirror V3:
motor → start click → arm cue → CHK → crackle onset.

---

## 04 hear-crackle — KRRK

T 9.0–12.0, illustrated, hard cut.

### Composition

Preserve V3 action/reaction layout:
- physical playing record/stylus;
- speaker;
- G3 macro;
- G4 protagonist reaction.

### Forms

Improve hand and facial-plane drawing if needed, but do not change story geometry.

### Overlays

Controlled bad-playback language:
- KRRK;
- broken vibration lines;
- magenta/cyan local registration offset;
- speaker jolt.

### Motion

- T 9.5 first major crackle.
- T 10.0 eye shift.
- T 10.5 second crackle / shoulder reaction.
- T 11.0 hand approaches stop/cue.
- T 11.5 playback lifts/stops.
- T 12.0 graphics collapse.

### Camera

Locked.

### Enter and exit

G3 continuity from shot 03.

Exit uses the hand/record direction to lead to machine reveal.

### Subject

Narrative claim remains local to this record.

### Sound

Crackle physically follows stylus contact and is stopped by the playback-stop action.

---

## 05 reveal-myllo — Cleaning machine

T 12.0–15.0, illustrated, cut/panel transform.

### Composition

This is the first major V4 product-recognition shot.

Start:
- protagonist safely lifts the record from the turntable.

By T 12.75:
- comic panel edge sweeps to reveal the Myllo machine.

By T 13.25:
- full canonical M1 elevated 3/4 machine view occupies the frame.

Must simultaneously show:
- black metal body depth;
- top record plane;
- silver centre clamp;
- left brush/supply node;
- right vacuum node;
- white Myllo control plate;
- 2×2 buttons;
- blue LED.

Top label:
**ОЧИСТКА ПЛАСТИНКИ**

### Forms

Machine strictly follows M1–M4 and product video reference.

Hands:
- one hand places record over spindle;
- second hand turns/sets the central clamp with thumb/finger opposition.

Do not cover the front plate with hands.

### Overlays

Process band:
- stage index 01;
- main line `ОЧИСТКА ПЛАСТИНКИ`.

At T 14.25 a subtle callout line may briefly connect the label to the machine body, but no component labels yet.

### Motion

- T 12.0 record lift.
- T 12.5 carry toward machine.
- T 13.0 M1 product view fully revealed.
- T 13.5 record lowers onto spindle.
- T 14.0 clamp is placed/tightened.
- T 14.5 hand leaves clamp; machine silhouette gets a 0.5 s clean read.
- T 15.0 START button ring activates on the cut into shot 06.

### Camera

Starts medium carry, transitions into M1.
Final 1.5 s camera mostly locked for product recognition.

### Enter and exit

Record identity carries from turntable to machine.

Shot 06 preserves exact M1 anchors.

### Subject

Manual/video-backed:
- recognisable Myllo Vinyllo washer;
- record/clamp;
- supply and collection nodes;
- front controls.

### Sound

- T 12.0 stop/handling.
- T 12.75 panel swish.
- T 13.5 spindle placement.
- T 14.0 metal clamp turn/click.
- T 15.0 START button click + low motor.

---

## 06 pump-solution — Solution

T 15.0–18.0, illustrated, M1 + macro inset.

### Composition

Exact M1 holds.

Top process band:
stage 02
**МОЮЩИЙ РАСТВОР**

Subline for first 1.5 s:
**ПОДАЧА НА ЩЁТКУ**

Front plate remains visible.

Supply/brush node physically pivots from parked position toward the record before PUMP activates.

A G9 macro inset shows:
- bristle bed;
- black groove plane;
- initial liquid beads.

### Forms

Supply node must be visually distinct:
- visible bristle fringe;
- short thick brush mass;
- metal cylinder above it.

Liquid:
- small beads;
- then a thin wet ribbon;
- black vinyl remains dominant.

### Overlays

Button logic:
- START ring remains subtly active;
- PUMP ring becomes bright only after node contact.

No turquoise full-record recolouring.

### Motion

- T 15.0 record visibly rotating.
- T 15.5 supply node begins pivot.
- T 16.0 bristles settle onto record.
- T 16.25 PUMP ring lights.
- T 16.5 liquid beads appear at contact.
- T 17.0 rotation carries liquid into thin arc/ribbon.
- T 17.5 G9 macro shows wet bristles and moving groove plane.
- T 18.0 process band changes as active brush cleaning begins.

### Camera

M1 locked, with one short macro inset.
No top-down switch.

### Enter and exit

Exact M1 from shot 05.

Brush remains engaged into shot 07.

### Subject

Manual-backed:
START → supply node onto record → PUMP → brush wet/contact.

### Sound

- low rotation motor continuous;
- pivot hardware movement;
- PUMP click at T 16.25;
- short fluid feed/flow;
- first soft brush friction by T 17.5.

---

## 07 brush-reverse — Groove cleaning

T 18.0–21.0, illustrated, M1 → process macro.

### Composition

Top label:
stage 03
**ОЧИСТКА КАНАВОК**

At T 19.25 a temporary secondary chip appears:
**REVERSE · ОБРАТНОЕ ВРАЩЕНИЕ**

M1 remains visible for the first half.
G9 macro expands for the second half to show actual brush/fibre contact.

### Forms

Visible physical causality:
- brush fibres compressed against groove plane;
- thin wet film;
- moving dirt/fibres ahead/along contact;
- no abstract “cleaning ray”.

### Overlays

REVERSE must be supported by real motion:
- REVERSE button ring lights;
- record label direction changes;
- reflected groove highlight reverses;
- one small curved direction arrow appears for ≤0.75 s.

### Motion

- T 18.0 brush fully engaged, record rotates first direction.
- T 18.5 visible bristle lag / wet-film transport.
- T 19.0 one dirt/fibre cluster is displaced through the contact region.
- T 19.25 REVERSE ring lights.
- T 19.5 rotation direction changes visibly.
- T 20.0 macro fills more of frame; fibres trail opposite direction.
- T 20.5 label chip clears; cleaning continues.
- T 21.0 supply node begins lifting/parking away.

### Camera

M1 → low oblique G9 macro.
Macro must preserve the same physical brush orientation.

### Enter and exit

Direct continuation of brush contact from shot 06.

Exit shows supply node clearly moving away, creating space for shot 08 vacuum node.

### Subject

Manual-backed:
brush cleaning in one direction + reverse direction.

Real-world duration is compressed; order remains truthful.

### Sound

- brush/friction texture;
- brief REVERSE click;
- motor pitch/direction cue changes subtly;
- no cinematic whoosh replacing physical motion.

---

## 08 vacuum-collect — Vacuum

T 21.0–24.0, illustrated, M1 + low macro.

### Composition

Top process band:
stage 04
**ВАКУУМ**

Optional second line:
**ЖИДКОСТЬ И ЗАГРЯЗНЕНИЯ УДАЛЯЮТСЯ ИЗ КАНАВОК**

Start wide in exact M1:
- supply node is visibly parked away;
- vacuum node pivots in from the right;
- front VACUUM button remains visible.

Second half:
low oblique macro of the collection slot and groove plane.

### Forms

Vacuum node:
- longer clean metal wand than brush node;
- no bristles;
- dark continuous contact slot/lips.

Material:
- wet region ahead of slot;
- drier region behind slot;
- black vinyl remains black.

### Overlays

VACUUM button ring activates only after node contact.

3–5 restrained teal suction lines may converge into the slot, but the main proof is wet-ahead / dry-behind.

### Motion

- T 21.0 supply node is parked.
- T 21.5 vacuum node pivots.
- T 22.0 contact slot settles onto record.
- T 22.25 VACUUM ring lights.
- T 22.5 wet film begins converging to slot.
- T 23.0 dry groove reflection emerges behind contact.
- T 23.5 macro clearly shows wet/dry boundary traveling with record motion.
- T 24.0 vacuum cue begins to fall, transition into comparison.

### Camera

M1 for recognition → low G9 macro for proof.

### Enter and exit

Same record plane from shot 07.

Vacuum contact slot becomes the vertical/sliding comparator boundary in shot 09.

### Subject

Manual-backed:
collection node placement → VACUUM → liquid/contamination removed from surface/grooves.

### Sound

- metal pivot;
- contact tick;
- VACUUM button click;
- suction rises;
- liquid noise thins as surface dries.

---

## 09 grooves-before-after — Before / after

T 24.0–27.0, illustrated macro comparison.

### Composition

This is evidence, not decoration.

Exact G8 split:
- left BEFORE;
- right AFTER;
- identical groove curvature and crop.

Top process band:
stage 05
**ДО / ПОСЛЕ**

The comparator line initially sits near centre and can slide 70–120 px once to reveal correspondence, then settles.

### Forms

BEFORE:
- 20–40 dust marks;
- 4–10 grit flecks;
- 2–5 fibres;
- broken highlight;
- one recognisable dirt cluster copied from shot 02 macro.

AFTER:
- same groove structure;
- same feature location;
- 0–6 tiny incidental marks;
- stable reflected line.

Do not make AFTER blue, glowing, chrome-like, or unrealistically pristine.

### Overlays

Small secondary tags inside panels:
- `ДО`
- `ПОСЛЕ`

No paragraph description.

### Motion

- T 24.0 comparison opens on exact matched geometry.
- T 24.5 comparator slides slightly to demonstrate registration.
- T 25.0 one dirty fibre is highlighted on BEFORE only.
- T 25.5 stable after-reflection sweeps across same groove position.
- T 26.0 camera begins pulling from AFTER panel.
- T 26.5 AFTER macro becomes physical record surface.
- T 27.0 protagonist's G6 grip enters for return.

### Camera

Static matched macro for first 2 s, then controlled zoom-out from AFTER side.

### Enter and exit

Vacuum contact line becomes comparator divider.

AFTER panel resolves into same record for shot 10.

### Subject

This is a visual comparison of the film's fictional record before/after the shown cleaning process.

It does not claim cleaning repairs scratches or groove wear.

### Sound

- vacuum tail ends at T 24.25;
- comparison opens with dry paper/click cue;
- BEFORE gets one tiny residual crackle tick;
- AFTER gets stable clean bell/teal harmonic;
- music motif begins reforming underneath.

---

## 10 return-record — Back to the deck

T 27.0–30.0, illustrated, carry → G2.

### Composition

Start:
close G6 safe grip on the cleaned/dry record.

Top label:
stage 06
**ПОВТОРНОЕ ПРОСЛУШИВАНИЕ**

The label remains only through T 28.5, then clears.

Room/listening setup returns.
By T 29.5 the record is aligned to exact G2.

### Forms

Improved V4 hand model:
- clear thumb/finger opposition;
- record edge thickness;
- label orientation preserved.

### Overlays

A thin gold circular motion trace may guide the record toward the turntable.

No process-machine graphics remain.

### Motion

- T 27.0 safe grip established.
- T 27.5 record leaves machine.
- T 28.0 room panel opens.
- T 28.5 turntable fully visible.
- T 29.0 record aligns with spindle.
- T 29.5 settles on platter.
- T 30.0 hand leaves, exact playback mirror begins.

### Camera

Close carry → exact G2 top-down.

### Enter and exit

AFTER groove zoom-out from shot 09.

Exact G2 into shot 11.

### Subject

Clean/dry record safely handled and returned for playback.

### Sound

- edge grip;
- carry swish;
- room tone returns;
- spindle placement;
- playback motor cue at cut.

---

## 11 second-play — Same needle

T 30.0–33.0, illustrated, exact mirror.

### Composition

Pixel-match shot 03's G2/G3 geometry.

The viewer should recognise the repeat before any “good” graphic appears.

### Forms

Same turntable, record, tonearm, macro crop.

Only cleanliness and graphics differ.

### Overlays

- no magenta/cyan problem offset;
- no crackle bolts;
- clean gold/teal curves begin only after stylus contact.

### Motion

- T 30.0 exact G2 start.
- T 30.5 same start click.
- T 31.0 same label rotation.
- T 31.5 same tonearm pivot.
- T 32.0 same G3 inset.
- T 32.5 same stylus contact.
- T 33.0 stable music begins.

### Camera

Exact shot 03 mirror.

### Enter and exit

G2 from shot 10.

G3/G4 geometry into shot 12.

### Subject

Same playback mechanics; film-local improvement after cleaning.

### Sound

Same physical cue chain as shot 03, minus crackle.
Stable motif enters on contact/outgoing cut.

---

## 12 enjoy-music — Different ending

T 33.0–36.0, illustrated, mirror → full room.

### Composition

First second mirrors shot 04:
- same G3 stylus contact;
- same G4 reaction panel.

Difference:
- stable contours;
- no problem graphics;
- listener softens instead of winces.

At T 34.0 the reaction panel retracts into the full warm listening room.

Final frame:
- seated protagonist clearly enjoying music;
- record still rotating;
- speaker visible;
- lamp / shelf / table provide depth;
- no process label.

### Forms

Keep corrected V3 seated-pose requirements:
- grounded legs;
- shoulders dropped;
- hands resting;
- softened/closed eyes;
- small relaxed mouth curve.

### Overlays

2–4 smooth gold/teal music curves.
No explanatory end card.

### Motion

- T 33.0 mirror opens.
- T 33.5 clean musical arc corresponds to the crackle beat from shot 04.
- T 34.0 shoulders drop / face relaxes.
- T 34.5 panel retracts to room.
- T 35.0 camera pulls back.
- T 35.5 pose settles; small rhythmic speaker/foot movement may remain.
- T 36.0 strong held comic ending.

### Camera

Mirror locked first second, then smooth room pull-back.

### Enter and exit

Exact playback/reaction mirror.

No loop requirement.

### Subject

Emotional resolution only.

### Sound

- stable motif;
- warm pad;
- clean bell;
- room/stereo width;
- soft bass;
- natural tail.

# Storyboard self-review

## Arithmetic

- 12 shots × 3.0 s = **36.0 s**
- 36.0 s × 24 fps = **864 frames**
- beat at 120 bpm = **0.5 s / 12 frames**
- all boundaries are multiples of 0.5 s
- bar = 2.0 s
- total = **18 bars**
- midpoint = **T 18.0**, exact shot boundary and beat/downbeat-aligned

PASS.

## Story readability

The V4 verb chain is:

**FIND → INSPECT → PLAY → HEAR → PLACE → APPLY → CLEAN → VACUUM → VERIFY → RETURN → PLAY AGAIN → ENJOY**

The cleaning block is no longer one generic action. It has five separate readable process beats:
- PLACE machine/record;
- APPLY solution;
- CLEAN/REVERSE;
- VACUUM;
- VERIFY before/after.

PASS by storyboard design.

## Product identity

Shots 05–08 require simultaneously visible:
- black depthful body;
- record/clamp;
- left brush node or right vacuum node as appropriate;
- white four-button front plate;
- active button cue;
- process label.

The product proof sheet already demonstrated that these elements survive quarter scale.

PASS as a storyboard contract.

## Physical causality

PUMP cannot precede brush/feed-node engagement.
VACUUM cannot precede vacuum-node contact.
Supply node clears before vacuum node enters.
Wet film becomes dry only behind the vacuum contact path.
REVERSE changes actual motion, not only text.

PASS.

## Label semantics

Labels support visible action:
- no label is the sole evidence of a phase;
- no paragraph subtitles;
- top safe zone remains clear of machine controls/contact.

PASS.

## Before/after proof

G8 uses identical groove geometry and a matched contamination cluster from shot 02.
AFTER differs in physical contamination/reflection, not by magical recolouring.

PASS.

## Dirty vs clean playback mirror

Shots 03/11 and 04/12 preserve G2/G3/G4.
This keeps the final improvement structural and immediately comparable.

PASS.

## Safe area

Critical product anchors:
- control plate and buttons remain within x 350–710, y 985–1265;
- record centre (535,785);
- node pivots x 285/790;
- process labels x 90–930, y 225–350;
all inside must-read safe area.

PASS.

## Research traceability

- machine silhouette / controls / node arrangement → physical Myllo video;
- START / PUMP / REVERSE / VACUUM sequence → Myllo instruction manual;
- vacuum removes liquid + contamination → manual;
- general handling/playback → V3 retained research;
- existing Myllo animation used only as brand/explanation precedent, not as physical authority.

PASS.

## V4 anti-ambiguity test

At quarter scale, a representative frame from each cleaning shot must answer:

- 05: **what is it?** → dedicated record-cleaning machine
- 06: **what happens?** → liquid is being fed/applied at the brush
- 07: **what happens?** → brush is cleaning while rotation changes direction
- 08: **what happens?** → vacuum node is removing wet liquid
- 09: **what changed?** → same grooves are visibly cleaner after the process

Any failure becomes P1 during scene critic.

Storyboard delta: ready for Timeline.
