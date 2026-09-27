# V3 Carry-forward — lessons from V1 and V2

This file is a durable handoff of what must not be forgotten when V3 progresses through native Procedural Film stages.

## From V1

The first native experiment proved the toolchain but underused the procedure.

Failure pattern:
- scenes could be technically valid while the film remained semantically weak;
- generic symbols and isolated hero objects were not enough to carry a complex story;
- a sequence of valid shots did not automatically become a coherent work;
- low-detail character/object drawing made the viewer depend on prior explanation.

Carry-forward:
- “gate green” is necessary but never sufficient;
- every shot must be visually intelligible before motion polish;
- character/object identity must be stable and recognisable.

## From V2

V2 materially improved:
- upstream research;
- drawable art-bible specificity;
- shared geometry;
- transition planning;
- secondary motion;
- whole-film contact-sheet review;
- render-cost correction;
- subject-specific procedural audio.

But the user still found the result difficult to understand without knowing what to look for.

Observed remaining gap:
- forms were sometimes ambiguous: a drop, beam, marker or abstract graphic could be confused;
- illustrated objects were often procedurally suggestive rather than unmistakably depicted;
- transformation logic was stronger than narrative staging;
- transitions and process visualisations could be sophisticated yet still fail to tell a concrete human story;
- visual finish remained below Butterfly in authored detail, metamorphosis quality and attractiveness.

## V3 response

V3 changes the problem itself.

Instead of asking Procedural Film to explain an abstract process, V3 asks it to tell a concrete story through an animated comic.

Every stage must protect these invariants:

1. **Character identity** — same recognisable protagonist across shots.
2. **Object identity** — record, turntable, brush/cleaning tools and listening space must not drift into generic geometry.
3. **Action readability** — every shot has one dominant verb that can be named from a still.
4. **Cause/effect** — the next shot must follow from the action of the previous one.
5. **Mirrored proof** — first playback and second playback share enough framing to make the improvement obvious.
6. **Comic grammar** — panels, gutters, crops, close-ups, impact frames and sound words are storytelling devices, not decoration.
7. **Motion hierarchy** — primary action first, secondary reaction second, ambient motion last.
8. **No abstract substitution** — do not replace a concrete object/action with an explanatory diagram unless the comic story still remains obvious without the diagram.
9. **Quarter-scale legibility** — a whole-film sheet must still expose the narrative spine.
10. **Human final judgment** — the user’s unaided comprehension is the decisive acceptance test.

## Stream-safety / resumability

Long ChatGPT streams have repeatedly timed out while runtime jobs continued successfully.

Therefore V3 uses a durable transaction ledger:
- one stage or bounded batch per transaction;
- commit every durable artifact before starting the next batch;
- write job IDs into `docs/V3_EXECUTION_STATE.md`;
- never blindly rerun a long job after a stream timeout;
- first query the exact recorded job ID;
- after each stage, record: status, commit, evidence, next action.

This changes execution packaging, not the native Procedural Film procedure itself.
