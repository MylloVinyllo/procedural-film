# Design research notes — operational extraction

These notes are deliberately converted into implementation rules rather than a general theory dump.

## Sources consulted

- Adobe, 12 Principles of Animation.
- Rive feature and rigging documentation.
- Rive project-management case study about pose/state organization in Figma.
- MDN Canvas Path2D documentation.

## Rules carried into this lab

1. Pose-to-pose before interpolation. Design readable contact poses first, then interpolate.
2. Staging before detail. The action and silhouette must read before texture.
3. Limb motion follows arcs and connected joints rather than independent XY tweens.
4. Rig parts use hierarchy and constraints. Child geometry inherits parent transforms.
5. Contact anchors are explicit data. A grip is a relationship between a hand anchor and an object anchor.
6. Reusable pose/state naming belongs outside individual scenes.
7. Authored vector contours may be imported/compiled, while animation remains procedural.
8. Path2D is the bridge: authored SVG-compatible path data can become retained Canvas paths without runtime image assets.

## v0.1 hypothesis

The likely production architecture is vector-authored shape quality + procedural timing/interaction logic, with pure procedural geometry retained for objects, diagrams and cases where it meets the visual bar.
