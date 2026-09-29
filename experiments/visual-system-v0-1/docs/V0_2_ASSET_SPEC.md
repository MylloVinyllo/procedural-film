# Visual System v0.2 — authored asset specification

Status: candidate R&D, owner approval required.

## Character coordinate contract

The protagonist is authored in one local coordinate system around the torso root.

Canonical rig geometry:
- left shoulder base: `[-80, -112]`;
- right shoulder base: `[80, -112]`;
- upper-arm nominal length: `136`;
- forearm nominal length: `126`;
- hand geometry origin: wrist;
- per-action shoulder offsets come from the pose library;
- per-action elbow bend direction is explicit state, not inferred from scene layout.

The scene is not allowed to draw substitute anatomy.

## Authored hand states

### edge
Meaning: hold a vinyl record at its edge.

Contact anchor: `[68, 8]` inside the hand's local authored coordinate system.

Silhouette target:
- thumb/index pinch must read first;
- trailing fingers stay grouped;
- no equal-length finger rake;
- no oversized mitten/paddle silhouette.

### press
Meaning: press a front-panel control with the index finger.

Contact anchor: `[123, 0]`.

Silhouette target:
- one unmistakable extended index;
- remaining fingers form a compact mass;
- fingertip owns contact, never the wrist.

### rest
Meaning: brace the free palm on the machine edge during a control action.

Contact anchor: `[48, 24]`.

Silhouette target:
- low, broad palm;
- folded thumb;
- must not resemble another edge-grip hand.

### open
Meaning: released hand after object placement.

No semantic contact anchor.

Silhouette target:
- relaxed release;
- used only after the contact state is cleared;
- wrist must retract outside the manipulated object's silhouette.

## Pose language

The reusable pose layer may control:
- body rotation;
- shoulder offsets;
- head rotation;
- head offset;
- gaze offset.

Current key poses:
- `hold-record`;
- `place-record`;
- `press-control`.

A key pose must read as a designed action even before interpolation is considered.

## Rendering order

Interaction states own arm depth.

Canonical layered render:
1. body;
2. back arms;
3. product base;
4. manipulated prop;
5. product overlays / working heads;
6. front arms;
7. hands.

This ordering is stateful. A single permanent "arms behind product" rule is invalid.

## Motion contract

PLACE:
`anticipation → curved travel → seat → release → retract`

PRESS:
`anticipation → reach → fingertip contact → release`

Motion code may change timing and spacing, but it must preserve:
- authored hand/object contact;
- reach limits;
- seated-record projection;
- non-crossing released wrists.

## Acceptance boundary

This specification protects reusable structure. It does not declare the current drawings visually approved.

Owner approval is still required for:
- hand silhouette quality;
- protagonist proportions;
- key-pose quality;
- MV-RCM01 fidelity;
- normal-speed motion.
