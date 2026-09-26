# Human Life Cycle Native Eval V2 — Final standalone evaluation

Date: 2026-09-26

## Production artifact

Production commit:
`f80f4b4d2f90e13684cb460829ac1bbce2ba5724`

Master:
- runtime job `23227771-2424-4608-b1b7-06feef20642b`
- `output/master.mp4`
- 1080×1920
- 32.000 s
- 768 frames
- 199,611,610 bytes
- SHA-256 `4f396d691ed749a842f9084762dc62f1bc3f91492aa02127148d54f3113af1d2`

Preview:
- runtime job `8a7b1b4b-f358-4677-9ddf-bbe52bf8e3a8`
- `output/preview.mp4`
- SHA-256 `b53473fff8bd576da822ddf488f22260fc5d2355fc193c7d8e4b9c04c5aefa4c`

HTML player:
- runtime job `df390f0c-91e5-4b7e-bb60-60f5ec23dc8c`
- `output/dist/human-life-cycle-native-eval.html`
- SHA-256 `23ce1a6dd3fca6e2138b544b629e35fe9042394b5d4e78daa5fb86c90541b4b3`

## Technical result

Final native six-check on the production commit: PASS 6/6.

Verified:
- source/media safety;
- complete 18-shot timeline over 32 s;
- all scene registrations and draw calls;
- determinism under cold/sequential/warm/reverse/shuffled orders;
- frame-cost gate;
- 54 first/middle/last deterministic frame checks.

Final check job:
`ef4863da-92a9-472f-ae2f-cba5f81d6510`

Audio QA passed:
- pre-limiter peak 0.644 / -3.83 dBFS;
- cue structure rendered without audio errors.

Audio job:
`54983664-97e6-44ea-a3f4-85f7cfed1170`

## Visual result

The V2 film is no longer the sparse motion-card tracer from V1.

It now contains:
- constructed human bodies rather than stick figures;
- scene-specific environments;
- foreground/midground/background depth;
- actual physical gestures and shared actions;
- heterogeneous social groups;
- staged cell division, learning, social, memory and generational systems;
- visual continuity through G1/G2/G3/G4;
- recurring individual trajectory;
- a physical intergenerational handoff;
- a structural loop rather than a decorative final circle.

The individual-human → social-human → ageing → intergenerational-continuity arc is visible from rendered frames.

## Butterfly control comparison

V2 demonstrates that Butterfly Life is not powered by a different hidden renderer. The same Procedural Film foundation can construct a new subject with coherent illustration, motion, match cuts, deterministic rendering and procedural audio.

However, Butterfly Life remains the stronger illustration showcase.

Its advantage is still visible in:
- much denser subject-specific drawing;
- more intricate anatomy and surface information;
- richer micro-texture;
- more elaborate environmental detail;
- more bespoke geometry per scene.

The V2 Human Life Cycle film closes the category gap: it is now an illustrated temporal film rather than animated iconography. It does not fully close the craft-density gap to Butterfly.

## Standalone-tool conclusion

Procedural Film is capable of producing Butterfly-class *kinds* of work on a new subject, but it is not a one-prompt Butterfly generator.

The engine gives:
- deterministic drawing/runtime;
- reusable visual language;
- hard-cut and match-cut choreography;
- procedural audio;
- QA and render tooling.

The high-end result still depends heavily on the depth of scene authorship. When the scene pass is shallow, the tool produces motion cards. When the scene pass is authored as dense miniature drawing systems, it produces a much more cinematic illustrated result.

The experiment therefore supports using Procedural Film as a serious procedural illustration/motion framework, while treating authoring depth as the main production cost.

## Verification limitation

The assistant-side verification consisted of rendered contact sheets, individual rendered frames, match-cut boundary frames, deterministic checks and analytical audio QA. The runtime artifact player exposes the complete video for human playback, but it does not return continuous audiovisual perception to the assistant. Final subjective sign-off therefore belongs to the human watch-through of the master.
