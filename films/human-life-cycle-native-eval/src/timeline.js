(function () {
  'use strict';

  FILM.TIMELINE = {
    title: 'Human Life Cycle',
    bpm: 120,
    duration: 32,
    fps: 24,
    width: 1080,
    height: 1920,
    shots: [
      {
            "id": "adult-hero",
            "file": "01-adult-hero.js",
            "start": 0,
            "end": 1.5,
            "mode": "illustrated",
            "title": "One life",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Cold open on the hero. One adult human, full-body, centred on x=540, feet near y=1380. A cycleGold halo uses G1 behind the head/upper torso. Sparse secondary silhouettes sit deep in the paper background so the hero reads first. T 0.000: fully drawn thumbnail pose. T 0.500: hero shifts weight on twos and the attention ring pops over 3 frames. T 1.000: two distant silhouettes briefly synchronize their step. T 1.375: camera starts a snap push toward G1."
      },
      {
            "id": "cell-genesis",
            "file": "02-cell-genesis.js",
            "start": 1.5,
            "end": 4,
            "mode": "schematic",
            "title": "Beginning",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint genesis: a spark becomes a structure. G1 fills the centre as a founding cell guide. One glow core becomes 2, 4, then 8 cells inside the ring. The 18-arc progress glyph appears at (900,300), shot 02 owns its canonical helper. T 1.500: one cell fully present. T 2.000: 1→2 division. T 2.500: 2→4. T 3.000: 4→8. T 3.500: cluster elongates into a vertical body-axis guide."
      },
      {
            "id": "birth",
            "file": "03-birth.js",
            "start": 4,
            "end": 5.5,
            "mode": "illustrated",
            "title": "Arrival",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Breaking out: emergence from a casing. Minimal warm paper space. A newborn is held diagonally across the central safe area, head near (460,690), torso down-right. The enclosing curved form opens outward rather than showing medical detail. T 4.000: newborn already readable. T 4.500: chest/breath ring expands. T 5.000: tiny hand closes on twos. T 5.375: enclosing curve sweeps down into the scale axis of shot 04."
      },
      {
            "id": "growth-ladder",
            "file": "04-growth-ladder.js",
            "start": 5.5,
            "end": 8,
            "mode": "schematic",
            "title": "Growth",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Growth-stage ladder. Four simplified human silhouettes arranged bottom-to-top along a vertical measurement spine: infant, child, adolescent, adult. No text labels; scale is conveyed by brackets and relative height. T 5.500: infant outline present. T 6.000: child traces on. T 6.500: adolescent. T 7.000: adult. T 7.500: all four briefly align on a shared vertical spine before the child figure becomes dominant."
      },
      {
            "id": "first-steps",
            "file": "05-first-steps.js",
            "start": 8,
            "end": 10,
            "mode": "illustrated",
            "title": "A path",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Developmental journey. Small child crosses from left to centre on open paper ground. G2 head geometry is respected when child reaches the central pose. The selfWarm trajectory is clearly visible behind the feet. T 8.000: first-step pose fully drawn. T 8.500: step one lands. T 9.000: step two lands. T 9.500: brief wobble/recovery; head settles into exact G2 ellipse."
      },
      {
            "id": "learning-network",
            "file": "06-learning-network.js",
            "start": 10,
            "end": 11.5,
            "mode": "schematic",
            "title": "Learning",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint schematic of an internal structure. G2 head ellipse remains screen-fixed while a symbolic network grows inside. Some branches brighten, others fade; no anatomical labels. T 10.000: head outline already matches previous pixels. T 10.250: first branch wave. T 10.500: second wave. T 11.000: several connections strengthen while two fade. T 11.375: one branch extends out of the head to become a reaching arm trajectory in shot 07."
      },
      {
            "id": "childhood-explore",
            "file": "07-childhood-explore.js",
            "start": 11.5,
            "end": 13.5,
            "mode": "illustrated",
            "title": "Explore",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Developmental journey. Child moves diagonally upward through paper space, reaching toward a simple childSky kite-like abstract object. Strong vertical composition uses the tall frame. T 11.500: reaching pose continues shot 06 branch tangent. T 12.000: run step. T 12.500: jump/reach. T 13.000: turn lands, arm arc points toward incoming peer nodes of shot 08."
      },
      {
            "id": "social-salience",
            "file": "08-social-salience.js",
            "start": 13.5,
            "end": 14.5,
            "mode": "schematic",
            "title": "Peers",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint schematic of a working mechanism. Central primary node with three peer nodes entering from different sides. A thin attention sector rotates from inward/self region toward peer cluster. T 13.500: primary node visible. T 13.750: peer nodes pop in. T 14.000: attention sector swings toward peers. T 14.250: one tie strengthens and screen fills toward paper cut."
      },
      {
            "id": "one-among-many",
            "file": "09-one-among-many.js",
            "start": 14.5,
            "end": 16,
            "mode": "illustrated",
            "title": "I among us",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Population/column shot. Primary young-adult figure in selfWarm moves with a varied field of people. Clusters remain visibly non-uniform. The hero chest carries G3 at (540,820) as a tiny cycleGold marker. T 14.500: group already moving. T 15.000: rhythm synchronizes on twos. T 15.500: primary figure takes one off-phase step while retaining group direction. T 15.875: camera centres on G3 chest marker."
      },
      {
            "id": "social-network",
            "file": "10-social-network.js",
            "start": 16,
            "end": 18,
            "mode": "schematic",
            "title": "We",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint schematic of a working mechanism. G3 is exact primary node at midpoint. A heterogeneous network builds around it in clusters rather than a complete graph. This is the story hinge. T 16.000: G3 already present. T 16.500: first close cluster connects. T 17.000: distant cluster connects through one bridge. T 17.500: two ties dim while one close tie brightens."
      },
      {
            "id": "bond",
            "file": "11-bond.js",
            "start": 18,
            "end": 20,
            "mode": "illustrated",
            "title": "Relation",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Developmental journey. Two people occupy the central safe area, primary on left, another on right. A reciprocal gesture passes between hands; a third figure remains soft in background. T 18.000: figures already in relation. T 18.500: primary gesture crosses halfway. T 19.000: gesture is returned. T 19.500: both trajectory arcs synchronize for one beat."
      },
      {
            "id": "role-system",
            "file": "12-role-system.js",
            "start": 20,
            "end": 21.5,
            "mode": "schematic",
            "title": "Roles",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint schematic of a working mechanism. Primary node sits within three incomplete concentric rings representing overlapping social contexts, with sparse nodes on each ring. Rings remain open, not cages. T 20.000: core and inner ring present. T 20.500: middle ring traces on. T 21.000: outer ring appears with three nodes; one radial bridge connects all three contexts."
      },
      {
            "id": "create-contribute",
            "file": "13-create-contribute.js",
            "start": 21.5,
            "end": 24,
            "mode": "illustrated",
            "title": "Contribution",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Developmental journey. Primary adult makes a simple object/mark at a worktable-like plane; another person receives and extends it. The activity is intentionally generic enough to mean making/contributing rather than one occupation. T 21.500: primary action begins. T 22.000: object/mark takes form. T 22.500: second person reaches. T 23.000: second person extends the work. T 23.500: completed shared form leaves a memoryViolet trace for shot 14."
      },
      {
            "id": "memory-field",
            "file": "14-memory-field.js",
            "start": 24,
            "end": 25.5,
            "mode": "schematic",
            "title": "Traces",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint schematic of an internal structure. A field of faint earlier motifs surrounds a central adult node: child path, peer cluster, bond arcs, shared-object trace. Some are crisp, some faint. T 24.000: object trace from shot 13 already present. T 24.250: child-path trace draws. T 24.500: social cluster. T 25.000: bond arc. T 25.250: most traces dim except three persistent motifs."
      },
      {
            "id": "ageing-connected",
            "file": "15-ageing-connected.js",
            "start": 25.5,
            "end": 27.5,
            "mode": "illustrated",
            "title": "Later life",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Time-passage hold with a cycle tally. Same primary identity now older, moving more slowly with another person nearby. One shared bench/rail-like environmental form stabilizes the composition. T 25.500: older pose fully drawn. T 26.000: measured step. T 26.500: hold. T 27.000: companion gesture and response. T 27.375: cycle tally completes this stage."
      },
      {
            "id": "generation-spiral",
            "file": "16-generation-spiral.js",
            "start": 27.5,
            "end": 29,
            "mode": "schematic",
            "title": "Across generations",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Blueprint schematic of a working mechanism. Two life arcs, older and younger, coil through a shallow spiral without touching at first. G4 transfer point sits at (540,920), radius 18. Progress glyph arc 16. T 27.500: older arc present. T 28.000: younger arc traces in. T 28.500: both converge on G4 while remaining distinct."
      },
      {
            "id": "handoff",
            "file": "17-handoff.js",
            "start": 29,
            "end": 30.5,
            "mode": "illustrated",
            "title": "Continue",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Breaking out: emergence from a casing. Older primary and younger child/young person face each other in the central safe area. Their hands meet around G4. Older selfWarm path ends; a new selfWarm path begins from the younger figure. T 29.000: both hands around fixed G4. T 29.500: G4 passes visually from older to younger hand. T 30.000: older path resolves while new path draws forward. T 30.375: G4 begins expanding toward G1 size."
      },
      {
            "id": "seed-loop",
            "file": "18-seed-loop.js",
            "start": 30.5,
            "end": 32,
            "mode": "schematic",
            "title": "Again",
            "transitionIn": {
                  "kind": "cut",
                  "dur": 0
            },
            "brief": "Loop-closing repeat of the opening. G1 cycle circle returns at (540,700), radius 150. Faint traces of the social network and life path recede outward. Wordmark “human” sits at baseline y=1470. Progress glyph completes all 18 arcs. T 30.500: expanding G4 lands exactly on G1. T 31.000: network traces recede. T 31.500: final pulse returns to opening cadence; wordmark settles. T 31.958: final frame matches shot 01 G1 geometry and tonal level for the loop."
      }
],
    cues: [
      {
            "t": 0,
            "kind": "hit",
            "note": "felt-heart kick C2 and soft paper brush."
      },
      {
            "t": 0.5,
            "kind": "hit",
            "note": "warm pluck E4-G4 and short inhale."
      },
      {
            "t": 1,
            "kind": "hit",
            "note": "two quiet social ticks L/R."
      },
      {
            "t": 1.375,
            "kind": "swell",
            "note": "reverse swell into the blueprint cut."
      },
      {
            "t": 1.5,
            "kind": "sfx",
            "note": "clean glass C5 over low sine C2."
      },
      {
            "t": 2,
            "kind": "hit",
            "note": "paired glass ticks C5-G5."
      },
      {
            "t": 2.5,
            "kind": "sfx",
            "note": "four-note ripple C5-E5-G5-C6."
      },
      {
            "t": 3,
            "kind": "swell",
            "note": "eight-note sparkle, ducked under a warm swell."
      },
      {
            "t": 3.5,
            "kind": "sfx",
            "note": "low sub rise into birth."
      },
      {
            "t": 4,
            "kind": "hit",
            "note": "cream flash hit + airy inhale."
      },
      {
            "t": 4.5,
            "kind": "hit",
            "note": "soft bell A4 on breath ring."
      },
      {
            "t": 5,
            "kind": "hit",
            "note": "small woody click for hand closure."
      },
      {
            "t": 5.5,
            "kind": "sfx",
            "note": "low marimba D3."
      },
      {
            "t": 6,
            "kind": "hit",
            "note": "pluck A3."
      },
      {
            "t": 6.5,
            "kind": "hit",
            "note": "pluck D4."
      },
      {
            "t": 7,
            "kind": "hit",
            "note": "pluck F4."
      },
      {
            "t": 7.5,
            "kind": "hit",
            "note": "four tones resolve into a single held pad."
      },
      {
            "t": 8,
            "kind": "sfx",
            "note": "light brush groove begins."
      },
      {
            "t": 8.5,
            "kind": "hit",
            "note": "soft wood step hit."
      },
      {
            "t": 9,
            "kind": "hit",
            "note": "second step hit a minor third higher."
      },
      {
            "t": 9.5,
            "kind": "hit",
            "note": "upward pluck on balance recovery."
      },
      {
            "t": 10,
            "kind": "sfx",
            "note": "muted glass pulse."
      },
      {
            "t": 10.25,
            "kind": "hit",
            "note": "three small node pings."
      },
      {
            "t": 10.5,
            "kind": "hit",
            "note": "wider ping cluster."
      },
      {
            "t": 11,
            "kind": "swell",
            "note": "low filtered swell under pruning clicks."
      },
      {
            "t": 11.5,
            "kind": "sfx",
            "note": "kalimba motif D5-F5-A5."
      },
      {
            "t": 12,
            "kind": "hit",
            "note": "brush-kick step."
      },
      {
            "t": 12.5,
            "kind": "sfx",
            "note": "small whoosh + glock A5."
      },
      {
            "t": 13,
            "kind": "hit",
            "note": "turn click and social-tone pickup."
      },
      {
            "t": 13.5,
            "kind": "hit",
            "note": "dry schematic tick."
      },
      {
            "t": 13.75,
            "kind": "hit",
            "note": "three spatial peer pings."
      },
      {
            "t": 14,
            "kind": "sfx",
            "note": "rising bend toward socialBlue harmonic."
      },
      {
            "t": 14.25,
            "kind": "sfx",
            "note": "short impact into paper."
      },
      {
            "t": 14.5,
            "kind": "sfx",
            "note": "ensemble percussion enters."
      },
      {
            "t": 15,
            "kind": "sfx",
            "note": "group rhythm locks with bass pulse."
      },
      {
            "t": 15.5,
            "kind": "hit",
            "note": "one contrasting pluck marks divergence."
      },
      {
            "t": 15.875,
            "kind": "sfx",
            "note": "suction-like push into midpoint."
      },
      {
            "t": 16,
            "kind": "hit",
            "note": "full hinge hit, sub C2 + gong bloom."
      },
      {
            "t": 16.5,
            "kind": "hit",
            "note": "close-cluster glass pings."
      },
      {
            "t": 17,
            "kind": "hit",
            "note": "distant bell answer."
      },
      {
            "t": 17.5,
            "kind": "hit",
            "note": "warm close-bond tone emerges."
      },
      {
            "t": 18,
            "kind": "sfx",
            "note": "warmer pad opens."
      },
      {
            "t": 18.5,
            "kind": "hit",
            "note": "soft pluck sent left→right."
      },
      {
            "t": 19,
            "kind": "hit",
            "note": "answering pluck right→left."
      },
      {
            "t": 19.5,
            "kind": "sfx",
            "note": "two-note interval resolves together."
      },
      {
            "t": 20,
            "kind": "sfx",
            "note": "muted schematic pulse."
      },
      {
            "t": 20.5,
            "kind": "sfx",
            "note": "ring trace shimmer."
      },
      {
            "t": 21,
            "kind": "hit",
            "note": "three low ticks and one bright bridge tone."
      },
      {
            "t": 21.5,
            "kind": "sfx",
            "note": "steady maker rhythm starts."
      },
      {
            "t": 22,
            "kind": "hit",
            "note": "woody hit on object formation."
      },
      {
            "t": 22.5,
            "kind": "hit",
            "note": "bright handoff tick."
      },
      {
            "t": 23,
            "kind": "sfx",
            "note": "second layered rhythm joins."
      },
      {
            "t": 23.5,
            "kind": "hit",
            "note": "long memory bell tail."
      },
      {
            "t": 24,
            "kind": "hit",
            "note": "percussion drops out; long violet-toned pad."
      },
      {
            "t": 24.25,
            "kind": "sfx",
            "note": "distant child-motif echo."
      },
      {
            "t": 24.5,
            "kind": "hit",
            "note": "social ping echo."
      },
      {
            "t": 25,
            "kind": "sfx",
            "note": "bond interval echo."
      },
      {
            "t": 25.25,
            "kind": "sfx",
            "note": "tails thin into near-silence."
      },
      {
            "t": 25.5,
            "kind": "hit",
            "note": "sparse felt kick, lower register."
      },
      {
            "t": 26,
            "kind": "hit",
            "note": "soft measured step."
      },
      {
            "t": 26.5,
            "kind": "sfx",
            "note": "near-silent held pad."
      },
      {
            "t": 27,
            "kind": "hit",
            "note": "warm bell for reciprocal gesture."
      },
      {
            "t": 27.5,
            "kind": "sfx",
            "note": "opening seed motif returns quietly."
      },
      {
            "t": 28,
            "kind": "sfx",
            "note": "second-generation motif enters one octave up."
      },
      {
            "t": 28.5,
            "kind": "hit",
            "note": "both tones converge on a clear bell."
      },
      {
            "t": 29,
            "kind": "sfx",
            "note": "quiet duet of old and new motifs."
      },
      {
            "t": 29.5,
            "kind": "hit",
            "note": "bright cycleGold bell at transfer."
      },
      {
            "t": 30,
            "kind": "sfx",
            "note": "new motif continues alone."
      },
      {
            "t": 30.375,
            "kind": "swell",
            "note": "reverse swell into final blueprint."
      },
      {
            "t": 30.5,
            "kind": "cut",
            "note": "final blueprint cut hit."
      },
      {
            "t": 31,
            "kind": "sfx",
            "note": "resolved opening pulse C2+C4."
      },
      {
            "t": 31.5,
            "kind": "hit",
            "note": "glass overtone and loop pickup, with level matched to T 0."
      }
]
  };
})();