# Build contract

The one source of truth for how the film's code fits together.
Every agent that touches this project follows it.

## Goal

A film about the human life cycle, drawn entirely by JavaScript on a canvas, with music and sound effects synthesised in JavaScript.

The film must explicitly explore:
1. the individual human in relation to the social human;
2. cyclicity;
3. symbolism.

It ships as one self-contained HTML file and as a rendered MP4 for vertical short-form video.
The look and editing follow `docs/art-bible.md`.

## User brief

Subject: the human life cycle.

Must include:
- social human compared with individual human;
- cyclicity;
- symbolism.

Duration: standard Procedural Film duration, approximately 30 seconds.

## Agent-invented defaults

- Preserve the established Procedural Film house style.
- No voiceover.
- Follow one human life as the primary thread rather than a catalogue of unrelated people.
- Treat individual and social existence as interdependent, not as moral opposites.
- Use recurring visual motifs rather than explanatory captions as the main symbolic language.
- End in a visual composition that can loop conceptually into the beginning.

## Research boundary

The film is not a medical explainer and does not claim a universal philosophy of human existence.
Biological and developmental events used as story anchors must trace to the sources summarized in `docs/research-notes.md`.
Symbolic readings are artistic interpretation and are labelled as such in the storyboard.

## Hard rules

1. **No media.** The shipped HTML contains no images, video, audio files, font files, base64, `data:` URLs, `<img>`, `new Image`, `fetch`, `XMLHttpRequest`, or CSS `url(...)`. Every pixel and every sample is computed.
2. **Deterministic.** `FILM.renderFrame(T)` draws the same pixels every time for the same `T`, in any order.
3. **Stateless per frame.** Scene drawing depends only on time and deterministic inputs.
4. **Canvas** is 1080×1920 at 24 fps.
5. **Plain browser JavaScript.**
6. **File ownership.** Each scene agent edits only its own scene file. Shared files have one owner.

## Success condition

At normal speed, without voiceover, a viewer should be able to read:
- one human life moving from biological beginning through development, social participation and ageing;
- a persistent tension and relationship between individual and social identity;
- recurrence / return as a structural idea, not merely a final decorative circle;
- symbolic transitions that remain legible enough to support, rather than obscure, the story.
