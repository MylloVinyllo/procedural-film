# V4 Carry-Forward Requirements

This file is a durable transfer from the V3 human review into V4.

## V3 accepted

V3 is accepted as a technical pass because:
- the person / record / turntable story is recoverable;
- the first playback problem is recognisable;
- the overall before → intervention → second playback structure works;
- sound is synchronised to visible events well enough to support the story.

## V3 not accepted as final-quality

The user identified these remaining weaknesses:
- cleaning machine identity is ambiguous;
- cleaning mechanism is ambiguous;
- strict top-down cleaning view hides product form and controls;
- not enough visible product specificity / brand cues;
- no explicit stage labels;
- before/after groove evidence is not strong enough;
- hands, sleeve, record and hardware still contain procedural-artifacts / low-specificity forms;
- overall finish remains behind Butterfly.

## V4 invariants

1. **Machine first-class object**
   - specific silhouette;
   - body depth;
   - controls;
   - working nodes;
   - branded circular cue where supported by reference.

2. **Process first-class narrative**
   - solution;
   - cleaning contact;
   - rotation;
   - vacuum;
   - dry result;
   - each phase visually distinct.

3. **Text as semantic reinforcement**
   - short dynamic stage labels;
   - industrial/comic integration;
   - no paragraph subtitles.

4. **Before/after proof**
   - matched groove macro;
   - dirty debris physically present before;
   - cleaner groove field after;
   - no magical glow as the proof.

5. **Camera improvement**
   - cleaning machine uses 3/4 / elevated side perspective for recognition;
   - macro inserts are used for groove/contact detail;
   - top-down is retained only where it genuinely clarifies a step.

6. **Drawing-quality lift**
   - better hands;
   - better record ellipse/thickness/groove structure;
   - better sleeve construction;
   - better machine controls/hardware;
   - fewer generic blobs/rectangles.

7. **Motion-quality lift**
   - machine rotation;
   - node movement/contact;
   - liquid transport;
   - vacuum removal;
   - text-label entrance/exit;
   - material response;
   - all tied to physical causality.

8. **No player work**
   - preview/master are enough for evaluation.

## Stream-safety

Every V4 stage is a resumable transaction.

For each transaction:
- record input commit;
- record output commit;
- record runtime job IDs;
- record evidence;
- record exact next action.

After a stream timeout:
- read `docs/V4_EXECUTION_STATE.md`;
- query the active job ID;
- never blindly rerun a long render/check.
