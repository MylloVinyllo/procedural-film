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
        id: 'seed-pulse',
        file: '01-seed-pulse.js',
        start: 0,
        end: 2,
        mode: 'schematic',
        title: 'One',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'A single cell-like circle pulses on the blueprint field. This is the recurring seed/cycle geometry and is fully drawn from frame one.'
      },
      {
        id: 'division',
        file: '02-division.js',
        start: 2,
        end: 4,
        mode: 'schematic',
        title: 'One becomes many',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The seed circle divides discretely into two, four and eight cells on the beat grid, then the cluster compresses toward a vertical human-form match cut.'
      },
      {
        id: 'forming-human',
        file: '03-forming-human.js',
        start: 4,
        end: 6,
        mode: 'illustrated',
        title: 'Form',
        transitionIn: { kind: 'flash', dur: 0.125 },
        brief: 'A simplified early human form develops within a warm enclosing curve. This is symbolic, not a literal medical diagram.'
      },
      {
        id: 'first-breath',
        file: '04-first-breath.js',
        start: 6,
        end: 8,
        mode: 'illustrated',
        title: 'Arrival',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'A newborn is readable as one embodied human. Breath, hand closure and a cycle ring establish life in the lived world.'
      },
      {
        id: 'first-steps',
        file: '05-first-steps.js',
        start: 8,
        end: 10,
        mode: 'illustrated',
        title: 'A path begins',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'A small child takes two uncertain steps. A selfWarm trajectory begins behind the feet and becomes the recurring individual-life path.'
      },
      {
        id: 'learning-network',
        file: '06-learning-network.js',
        start: 10,
        end: 12,
        mode: 'schematic',
        title: 'Learning',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'A head profile becomes a symbolic learning network. Branches illuminate, strengthen and prune without claiming a literal connectome.'
      },
      {
        id: 'childhood-play',
        file: '07-childhood-play.js',
        start: 12,
        end: 14,
        mode: 'illustrated',
        title: 'Explore',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The child runs, turns and reaches. Character motion is on twos while the trajectory overlay remains smooth.'
      },
      {
        id: 'adolescent-shift',
        file: '08-adolescent-shift.js',
        start: 14,
        end: 16,
        mode: 'illustrated',
        title: 'Becoming',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The primary silhouette grows toward adult proportions while peer silhouettes enter. Attention visibly turns outward toward the social field.'
      },
      {
        id: 'one-among-many',
        file: '09-one-among-many.js',
        start: 16,
        end: 18,
        mode: 'illustrated',
        title: 'I among us',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'At the midpoint hinge, the primary selfWarm figure remains distinct inside a varied group. Group rhythm forms, the individual diverges briefly, then rejoins without disappearing.'
      },
      {
        id: 'social-network',
        file: '10-social-network.js',
        start: 18,
        end: 20,
        mode: 'schematic',
        title: 'We',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The same individual becomes a warm core inside a heterogeneous socialBlue relationship network with varied clusters and tie strengths.'
      },
      {
        id: 'bond',
        file: '11-bond.js',
        start: 20,
        end: 22,
        mode: 'illustrated',
        title: 'Relation',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'Two or three people interact at human scale. A gesture passes from the primary figure to another and is returned; two paths briefly synchronize.'
      },
      {
        id: 'create-contribute',
        file: '12-create-contribute.js',
        start: 22,
        end: 24,
        mode: 'illustrated',
        title: 'Contribution',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The adult makes, builds or writes one readable abstract object. Another person extends the action so individual work becomes contribution.'
      },
      {
        id: 'memory-field',
        file: '13-memory-field.js',
        start: 24,
        end: 26,
        mode: 'schematic',
        title: 'Accumulation',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'Past motifs reappear as faint blueprint traces. Some relationships fade and a few persist; the primary individual remains the anchor.'
      },
      {
        id: 'ageing-connected',
        file: '14-ageing-connected.js',
        start: 26,
        end: 28,
        mode: 'illustrated',
        title: 'Later life',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The same individual is older: changed posture, shorter steps and longer holds. At least one relationship remains visibly present.'
      },
      {
        id: 'handoff',
        file: '15-handoff.js',
        start: 28,
        end: 30,
        mode: 'illustrated',
        title: 'Continuity',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'Older and younger figures share the frame. A cycleGold point/gesture passes between them; the older selfWarm line ends and a new line begins.'
      },
      {
        id: 'return-to-seed',
        file: '16-return-to-seed.js',
        start: 30,
        end: 32,
        mode: 'schematic',
        title: 'Again',
        transitionIn: { kind: 'cut', dur: 0 },
        brief: 'The transferred point expands to the original seed geometry. Network traces recede, the wordmark human appears, and the last pulse is composition-compatible with frame zero.'
      }
    ],

    cues: [
      { t: 0.0, kind: 'hit', note: 'Seed: low sine pulse with a soft glass overtone.' },
      { t: 0.5, kind: 'sfx', note: 'First outward pulse: filtered breath-noise bloom.' },
      { t: 1.5, kind: 'swell', note: 'Reverse breath into division.' },

      { t: 2.0, kind: 'cut', note: 'Division 1: small glass tick.' },
      { t: 2.5, kind: 'sfx', note: 'Division 2: paired ticks.' },
      { t: 3.0, kind: 'sfx', note: 'Division 4: four-note ripple.' },
      { t: 3.5, kind: 'sfx', note: 'Division 8: accelerating high ripple and warm swell.' },

      { t: 4.0, kind: 'cut', note: 'Warm paper arrival: low felt hit, soft harmonic bed enters.' },
      { t: 5.5, kind: 'swell', note: 'Enclosing curve opens with rising filtered noise.' },

      { t: 6.0, kind: 'hit', note: 'First breath: sub-soft pulse plus airy inhale.' },
      { t: 6.5, kind: 'sfx', note: 'Breath ring: glass tone.' },
      { t: 7.0, kind: 'sfx', note: 'Hand closure: tiny woody click.' },

      { t: 8.0, kind: 'cut', note: 'First steps: light wood/pluck rhythm begins.' },
      { t: 8.5, kind: 'hit', note: 'Step one.' },
      { t: 9.0, kind: 'hit', note: 'Step two.' },
      { t: 9.5, kind: 'sfx', note: 'Balance recovery: soft upward pluck.' },

      { t: 10.0, kind: 'cut', note: 'Learning network: glassy pulse sequence.' },
      { t: 10.5, kind: 'sfx', note: 'Branch wave one.' },
      { t: 11.0, kind: 'sfx', note: 'Branch wave two.' },

      { t: 12.0, kind: 'cut', note: 'Play: percussion becomes quicker and lighter.' },
      { t: 12.5, kind: 'hit', note: 'Run pose / foot contact.' },
      { t: 13.0, kind: 'sfx', note: 'Turn: short whoosh.' },

      { t: 14.0, kind: 'cut', note: 'Adolescent shift: harmonic layer thickens.' },
      { t: 15.0, kind: 'sfx', note: 'Peers enter: several soft spatial ticks.' },
      { t: 15.5, kind: 'swell', note: 'Attention turns outward, rising cluster into midpoint.' },

      { t: 16.0, kind: 'hit', note: 'Midpoint social hinge: full beat hit and bass layer.' },
      { t: 16.5, kind: 'sfx', note: 'Group rhythm locks.' },
      { t: 17.0, kind: 'sfx', note: 'Individual divergence: one off-grid colour tone, still on beat.' },
      { t: 17.5, kind: 'hit', note: 'Rejoin: motif resolves into ensemble.' },

      { t: 18.0, kind: 'cut', note: 'Social network: ensemble thins to resonant nodes.' },
      { t: 18.5, kind: 'sfx', note: 'First social cluster connects.' },
      { t: 19.0, kind: 'sfx', note: 'Second cluster connects.' },

      { t: 20.0, kind: 'cut', note: 'Bond: warmer close-range timbre.' },
      { t: 20.5, kind: 'sfx', note: 'Gesture sent.' },
      { t: 21.0, kind: 'sfx', note: 'Gesture returned.' },

      { t: 22.0, kind: 'cut', note: 'Contribution: steady maker rhythm.' },
      { t: 22.5, kind: 'hit', note: 'Primary action.' },
      { t: 23.5, kind: 'hit', note: 'Shared continuation of action.' },

      { t: 24.0, kind: 'cut', note: 'Memory field: percussion drops, long harmonic memory tails.' },
      { t: 24.5, kind: 'sfx', note: 'Child path memory appears.' },
      { t: 25.0, kind: 'sfx', note: 'Social memory appears.' },
      { t: 25.5, kind: 'swell', note: 'Persistent traces converge toward older-life cut.' },

      { t: 26.0, kind: 'cut', note: 'Later life: tempo perception opens through sparser events.' },
      { t: 27.0, kind: 'hit', note: 'Measured older step.' },
      { t: 27.5, kind: 'sfx', note: 'Shared gesture: quiet warm bell.' },

      { t: 28.0, kind: 'cut', note: 'Handoff: opening seed timbre begins returning.' },
      { t: 29.0, kind: 'hit', note: 'cycleGold point transfers: clear bell.' },
      { t: 29.5, kind: 'swell', note: 'New line begins, reverse swell into blueprint.' },

      { t: 30.0, kind: 'cut', note: 'Return to seed: opening navy-space timbre.' },
      { t: 30.5, kind: 'sfx', note: 'Network collapses into guide rings.' },
      { t: 31.0, kind: 'hit', note: 'Seed pulse returns, harmonically resolved.' },
      { t: 31.5, kind: 'sfx', note: 'Final pulse + pickup that resolves directly into replay T0.' }
    ]
  };
})();