(function(){
  'use strict';

  FILM.TIMELINE = {
    title: 'The Journey of Water',
    bpm: 120,
    duration: 36,
    fps: 24,
    width: 1080,
    height: 1920,
    shots: [
      { id:'cloud-hero', file:'01-cloud-hero.js', start:0.0, end:1.5, mode:'illustrated', title:'Held in the cloud', brief:'Layered cloud environment; exact G1 drop gathers neighbours, then camera pushes into it.' },
      { id:'condensation-micro', file:'02-condensation-micro.js', start:1.5, end:3.5, mode:'schematic', title:'Droplets gather', brief:'Cloud microdroplets form around nuclei and coalesce around exact G1.' },
      { id:'drop-growth', file:'03-drop-growth.js', start:3.5, end:5.0, mode:'schematic', title:'Heavy enough to fall', brief:'G1 becomes a falling-drop physics diagram; bottom flattens under airflow.' },
      { id:'rain-fall', file:'04-rain-fall.js', start:5.0, end:7.0, mode:'illustrated', title:'Through the air', brief:'Tracked raindrop falls through layered rain toward leaf canopy.' },
      { id:'leaf-impact', file:'05-leaf-impact.js', start:7.0, end:9.0, mode:'illustrated', title:'Impact', brief:'Drop hits leaf, crowns, spreads to G2 lens, slides and pushes through surface.' },
      { id:'leaf-stomata', file:'06-leaf-stomata.js', start:9.0, end:10.5, mode:'schematic', title:'Another path', brief:'G2 becomes leaf tissue/stomata schematic; transpiration appears as alternate branch while hero stays surface-bound.' },
      { id:'soil-entry', file:'07-soil-entry.js', start:10.5, end:12.5, mode:'illustrated', title:'Into the ground', brief:'Water leaves leaf, wets litter and travels through a detailed soil cutaway toward G2 pore.' },
      { id:'pore-flow', file:'08-pore-flow.js', start:12.5, end:14.0, mode:'schematic', title:'Through pores', brief:'Water films and channels move through unsaturated/saturated pore network and resolve to G3.' },
      { id:'spring-stream', file:'09-spring-stream.js', start:14.0, end:16.0, mode:'illustrated', title:'Surface again', brief:'Groundwater emerges as spring and becomes a living creek with stones, bank and tributary.' },
      { id:'tributary-river', file:'10-tributary-river.js', start:16.0, end:18.0, mode:'illustrated', title:'Becoming a river', brief:'Camera pulls from creek to river valley while tracer becomes a small local streamline.' },
      { id:'watershed-flow', file:'11-watershed-flow.js', start:18.0, end:19.5, mode:'schematic', title:'A larger system', brief:'Landscape becomes watershed network; tracer diverts from river into public-water intake.' },
      { id:'treatment-train', file:'12-treatment-train.js', start:19.5, end:22.0, mode:'schematic', title:'Made usable', brief:'Continuous treatment train: mix/flocculation, sedimentation, filtration, disinfection/contact and storage.' },
      { id:'pipe-transit', file:'13-pipe-transit.js', start:22.0, end:23.5, mode:'illustrated', title:'Under the city', brief:'Camera rides a pressurised main and service pipe with parallax, flow and valve branch.' },
      { id:'tap-use-drain', file:'14-tap-use-drain.js', start:23.5, end:25.5, mode:'illustrated', title:'Through a home', brief:'Faucet, glass/sink, overflow and drain spiral carry the tracer into wastewater collection.' },
      { id:'wastewater-return', file:'15-wastewater-return.js', start:25.5, end:27.5, mode:'schematic', title:'Cleaned again', brief:'Screen/grit, settling, biological treatment and clarification/disinfection resolve to effluent G3.' },
      { id:'river-release', file:'16-river-release.js', start:27.5, end:29.0, mode:'illustrated', title:'Back to the river', brief:'Treated outfall mixes into receiving river; tracer becomes one small streamline.' },
      { id:'estuary-ocean', file:'17-estuary-ocean.js', start:29.0, end:31.0, mode:'illustrated', title:'Into the ocean', brief:'River opens into estuary and ocean, then camera pushes into sunlit exact G4 surface patch.' },
      { id:'surface-evaporation', file:'18-surface-evaporation.js', start:31.0, end:33.0, mode:'schematic', title:'Leaving the surface', brief:'G4 shows liquid surface losing coherent boundary as vapor points separate and rise.' },
      { id:'condensation-return', file:'19-condensation-return.js', start:33.0, end:34.5, mode:'schematic', title:'Becoming cloud', brief:'Vapor reaches nuclei, liquid shells form, droplet field thickens and future G1 emerges.' },
      { id:'cloud-loop', file:'20-cloud-loop.js', start:34.5, end:36.0, mode:'illustrated', title:'The cycle continues', brief:'Illustrated cloud returns; droplets gather into exact G1 and composition settles to a loop-safe opening.' }
    ],
    cues: [
      {t:0.0,kind:'sfx',note:'Cloud ambience: filtered airy noise and low C3 pad.'},
      {t:0.5,kind:'hit',note:'Water motif begins C5 then G5 on eighths; neighbour merge tick.'},
      {t:1.0,kind:'hit',note:'D6 soft glass tone as camera push starts.'},
      {t:1.5,kind:'cut',note:'Reverse-noise suction and blueprint click.'},

      {t:2.0,kind:'hit',note:'First coalescence: G5 glass ping plus tiny granular water tick.'},
      {t:2.5,kind:'hit',note:'Second merge: D6.'},
      {t:3.0,kind:'hit',note:'A5 plus low rising pressure tone.'},
      {t:3.5,kind:'cut',note:'Short downward filtered sweep into drop-physics plate.'},

      {t:4.0,kind:'swell',note:'Air hiss grows as airflow strengthens.'},
      {t:4.5,kind:'hit',note:'Sub hit + G4 as lower drop surface flattens.'},
      {t:5.0,kind:'cut',note:'Sharp cut hit with descending noise into open-air fall.'},

      {t:5.5,kind:'sfx',note:'Near-rain hiss opens; high whistle layer.'},
      {t:6.0,kind:'hit',note:'Motif fragment C5–G5.'},
      {t:6.5,kind:'swell',note:'Impact pre-hit rises as leaf canopy approaches.'},
      {t:7.0,kind:'hit',note:'Broad water impact transient + sub.'},

      {t:7.25,kind:'sfx',note:'Bright secondary-droplet ticks.'},
      {t:7.5,kind:'hit',note:'Damped mallet C5 as crown collapses.'},
      {t:8.0,kind:'sfx',note:'Sliding water noise.'},
      {t:8.5,kind:'swell',note:'Macro suction through the leaf lens.'},
      {t:9.0,kind:'cut',note:'Blueprint click.'},

      {t:9.5,kind:'hit',note:'High airy pulse through leaf tissue.'},
      {t:10.0,kind:'sfx',note:'Soft rising vapor noise + D6 at stomatal release.'},
      {t:10.5,kind:'cut',note:'Low drop cue into soil.'},

      {t:11.0,kind:'sfx',note:'Granular trickle under soil descent.'},
      {t:11.5,kind:'hit',note:'Muted stone tick.'},
      {t:12.0,kind:'hit',note:'C5 resonant droplet tone at hero pore.'},
      {t:12.5,kind:'cut',note:'Macro whoosh into pore schematic.'},

      {t:13.0,kind:'sfx',note:'Low bubble/pluck as channels split.'},
      {t:13.5,kind:'swell',note:'Filtered resonance rises as saturated network brightens.'},
      {t:14.0,kind:'cut',note:'Open-water stream noise enters.'},

      {t:14.5,kind:'hit',note:'Motif G5 as tracer emerges at spring.'},
      {t:15.0,kind:'sfx',note:'Stone-water slap.'},
      {t:15.5,kind:'hit',note:'Tributary merge hit D6.'},
      {t:16.0,kind:'swell',note:'Low river band widens.'},

      {t:16.0,kind:'hit',note:'Full motif C5–G5–D6–A5 starts over eighths.'},
      {t:17.0,kind:'sfx',note:'Bridge/wood scale tick.'},
      {t:17.5,kind:'swell',note:'Landscape-to-system pullback swell.'},
      {t:18.0,kind:'cut',note:'Midpoint sub hit + blueprint cut.'},

      {t:18.5,kind:'sfx',note:'Muted intake/valve click.'},
      {t:19.0,kind:'hit',note:'C5 pulse; mechanical water-system hum enters.'},
      {t:19.5,kind:'cut',note:'Process-machine accent into treatment train.'},

      {t:20.0,kind:'sfx',note:'Clustered clicks as flocs form.'},
      {t:20.5,kind:'hit',note:'Low settling thump.'},
      {t:21.0,kind:'sfx',note:'Filtered-noise sweep through filter layers.'},
      {t:21.5,kind:'hit',note:'Clean glass tone A5 at clear-water/contact chamber.'},
      {t:22.0,kind:'cut',note:'Pipe resonance takes over.'},

      {t:22.5,kind:'sfx',note:'Valve tick inside main.'},
      {t:23.0,kind:'swell',note:'Doppler-like resonance as tracer enters service pipe.'},
      {t:23.5,kind:'cut',note:'Bright faucet/open-air hit.'},

      {t:24.0,kind:'hit',note:'Glass/water ping C6.'},
      {t:24.5,kind:'sfx',note:'Basin splash noise.'},
      {t:25.0,kind:'swell',note:'Drain swirl resonator accelerates.'},
      {t:25.5,kind:'cut',note:'Low sewer cut hit.'},

      {t:26.0,kind:'sfx',note:'Screen clack.'},
      {t:26.5,kind:'hit',note:'Low settling tone.'},
      {t:27.0,kind:'sfx',note:'Aeration bubble rhythm.'},
      {t:27.5,kind:'cut',note:'Open-water cut into receiving river.'},

      {t:28.0,kind:'sfx',note:'Mixing-eddy splash.'},
      {t:28.5,kind:'hit',note:'Motif G5–D6 under downstream track.'},
      {t:29.0,kind:'swell',note:'Low ocean swell enters.'},

      {t:29.5,kind:'hit',note:'Wide wave pulse.'},
      {t:30.0,kind:'hit',note:'Full motif returns softly.'},
      {t:30.5,kind:'swell',note:'High sunlight partial and macro-push suction.'},
      {t:31.0,kind:'cut',note:'Ocean-surface macro cut.'},

      {t:31.5,kind:'swell',note:'Rising filtered noise as surface particles loosen.'},
      {t:32.0,kind:'hit',note:'C6 sparkle at first vapor separation.'},
      {t:32.5,kind:'hit',note:'G6/A6 partials as more vapor rises.'},
      {t:33.0,kind:'cut',note:'Airy high cut into condensation field.'},

      {t:33.5,kind:'hit',note:'First condensation glass tick C5.'},
      {t:34.0,kind:'hit',note:'Motif fragments G5 then D6 as droplet density rises.'},
      {t:34.5,kind:'cut',note:'Warm paper hit into cloud return.'},

      {t:35.0,kind:'hit',note:'G5 on tracer-cluster merge.'},
      {t:35.5,kind:'hit',note:'D6 then A5 complete the motif as exact G1 settles.'},
      {t:35.75,kind:'sfx',note:'Cloud ambience aligns to opening for loop-safe tail.'}
    ]
  };
})();