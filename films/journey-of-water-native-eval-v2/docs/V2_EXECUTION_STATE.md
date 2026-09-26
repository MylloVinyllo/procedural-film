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
- Setup: complete
- Research: complete
- Art Bible: complete
- Storyboard: complete
- Timeline: complete
- Stub pass: complete
- Scenes: in progress
- Music: pending
- Critic waves: pending
- Deliver: pending

## Current checkpoint

- clean native scaffold created and validated
- smoke job: `76db3000-7574-454f-80c9-7b519ac00093` — PASS
- fixture gate: `86c69b80-aad1-4285-bce6-778c4e94b52e` — PASS 6/6
- fixture render: `96b454b1-a647-4350-a91f-0090a0ecbc70` — PASS, 8 s MP4 with sound
- seven authoritative research captures committed under `.tmp/research/`
- research-grounded drawable art bible and mirrored subject palette complete
- 20-shot / 36 s storyboard, transition map and motion complexity contract complete
- timeline materialised
- stubgen job: `505cc93a-afd5-4530-bf9c-9e14dff3f598` — SUCCEEDED
- all 20 scene stubs committed
- current stub production head: `a4b2c3d232855d4bfd5e518d537a349b73d18d6a`
- stub-film native check: `12d01902-3cbc-489a-be09-1620831c13fd` — PASS 6/6
- active runtime job: `4b0f3b2f-f8fb-46c5-86eb-94d99f22a6b0` (36 s half-scale stub preview render)
- next action after this exact job: inspect the stub preview sequence, then begin dense scene implementation with per-shot six-frame QA

## Dense scene implementation

- dense scene batch A (01–03): implemented and six-frame reviewed
  - 01 cloud-hero: accepted after cloud-volume/parallax correction
  - 02 condensation-micro: accepted after density/process-inset correction
  - 03 drop-growth: accepted on six-frame review
- next: dense scene batch E (13–15)

