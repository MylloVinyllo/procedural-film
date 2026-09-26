# The Journey of Water — execution state

Branch: `film/journey-of-water-native-eval-v2`
Project: `films/journey-of-water-native-eval-v2`

## Workflow

Native Procedural Film:
Brief → Setup → Research → Art Bible → Storyboard → Timeline → Stub → Scenes → Music → Critic waves → Deliver

## Stream-safety rule

The production procedure is unchanged, but execution is split into resumable transactions:
- one bounded logical change or one primary runtime job per transaction;
- every code/doc change ends in a Git commit;
- every long runtime action records its job ID;
- if the ChatGPT response stream times out, resume the exact job/commit instead of retrying blindly.

## Status

- Brief: complete
- Setup: in progress
- Research: pending
- Art Bible: pending
- Storyboard: pending
- Timeline: pending
- Stub pass: pending
- Scenes: pending
- Music: pending
- Critic waves: pending
- Deliver: pending

## Current checkpoint

- clean scaffold created from the native foundation on main commit `ec29e23474860e83ab5b4d0131bd6e6b92e12a48`
- subject fixed in `docs/CONTRACT.md`
- art bible named
- benchmark requirements added
- next action: native setup validation, then authoritative research
- active runtime job: none
