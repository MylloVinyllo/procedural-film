# Visual quality model v0.1

## Why this exists

The native six-check procedural-film gate is a production-integrity gate. It catches broken media policy, nondeterminism, source hazards, timeline defects, draw errors and frame-cost problems. It does not decide whether anatomy, product geometry, composition or motion looks professionally designed.

Visual quality therefore has a separate evidence loop.

## Failure classes learned from V4

### Q-CHAR-01 Detached anatomy
Symptom: hand, forearm, upper arm and torso read as separate stickers.
Rule: a human interaction must come from a canonical character backend with shared shoulder/wrist anchors. Scene-local hand geometry is forbidden.

### Q-CONTACT-01 Sliding contact
Symptom: a hand appears to hold an object but the contact point drifts.
Rule: while grip state is active, the wrist target derives from the object anchor, not from an independent curve.

### Q-PROD-01 Unstable product geometry
Symptom: product reads semantically but planes, pivots and controls feel crooked.
Rule: product is a reusable component with one local coordinate system and named anchors.

### Q-MOTION-01 Ghost transition
Symptom: a limb fades through another object instead of physically entering/leaving.
Rule: physical actors translate/rotate out of contact. Opacity is not a substitute for mechanical exit.

### Q-COMP-01 More detail cannot rescue unreadable staging
Rule: first judge silhouette, focal hierarchy and spacing at 25% scale; only then add surface detail.

## Review gates

Every candidate records PASS/FAIL with evidence, not a numeric beauty score.

- Composition: focal point, hierarchy, negative space, crop.
- Geometry: proportions, perspective, tangencies, accidental intersections.
- Character: silhouette, anatomy, pose, hand shape, contact.
- Product: identity, stable proportions, control readability, material separation.
- Motion: anticipation, arcs, spacing, weight, settle, contact continuity.
- Finish: line hierarchy, edge quality, palette discipline, texture/shadow consistency.

## Learning loop

human defect -> failure class -> reusable rule -> component/interaction fix -> golden example -> regression fixture

A local scene patch that cannot be generalized does not count as system learning.
