(function(){
  'use strict';

  FILM.TIMELINE = {
    title: 'Second Life of a Record',
    bpm: 120,
    duration: 30,
    fps: 24,
    width: 1080,
    height: 1920,
    shots: [
      { id:'find-record', file:'01-find-record.js', start:0, end:3, mode:'illustrated', title:'The sleeve', brief:'FIND: collector selects a sleeve, removes the record with a safe edge/label grip, and establishes the listening room.' },
      { id:'inspect-dust', file:'02-inspect-dust.js', start:3, end:6, mode:'illustrated', title:'Something is wrong', brief:'INSPECT: lamp-lit record tilt reveals dust; a concrete groove macro inset makes contamination unmistakable.' },
      { id:'first-play', file:'03-first-play.js', start:6, end:9, mode:'illustrated', title:'First try', brief:'PLAY: exact G2 turntable setup, platter starts, tonearm pivots, stylus contacts exact G3.' },
      { id:'hear-crackle', file:'04-hear-crackle.js', start:9, end:12, mode:'illustrated', title:'KRRK', brief:'HEAR: physical playback continues while crackle graphics, speaker jolts and exact G4 listener reaction prove the problem.' },
      { id:'decide-clean', file:'05-decide-clean.js', start:12, end:15, mode:'illustrated', title:'Do it properly', brief:'DECIDE: playback stops, the same record is lifted safely, and its G1 circle transfers onto the distinct G5 cleaning setup.' },
      { id:'wet-brush', file:'06-wet-brush.js', start:15, end:18, mode:'illustrated', title:'Into the grooves', brief:'CLEAN: fluid contacts the rotating record, a real brush establishes fibre contact, sweeps, and visibly works the wet groove field.' },
      { id:'vacuum-dry', file:'07-vacuum-dry.js', start:18, end:21, mode:'illustrated', title:'Lift it away', brief:'VACUUM: physical vacuum wand engages the same record, wet film converges to the slot, and dry groove reflections emerge behind.' },
      { id:'return-record', file:'08-return-record.js', start:21, end:24, mode:'illustrated', title:'Back to the deck', brief:'RETURN: dry record is lifted with exact safe grip and carried back to exact G2 turntable geometry.' },
      { id:'second-play', file:'09-second-play.js', start:24, end:27, mode:'illustrated', title:'Same needle', brief:'PLAY AGAIN: pixel-matched repeat of shot 03 with cleaner grooves and stable graphic language.' },
      { id:'enjoy-music', file:'10-enjoy-music.js', start:27, end:30, mode:'illustrated', title:'Different ending', brief:'ENJOY: exact dirty-reaction geometry returns clean, then opens into a warm room-wide listening payoff.' }
    ],
    cues: [
      {t:0.0,kind:'sfx',note:'Soft listening-room tone; sparse motif seed A4 E5 C#5 B4 on muted mallet.'},
      {t:0.5,kind:'sfx',note:'Sleeve paper scrape.'},
      {t:1.5,kind:'sfx',note:'Card/paper friction as record emerges.'},
      {t:2.5,kind:'hit',note:'Small glassy A5 curiosity accent.'},
      {t:3.0,kind:'cut',note:'Dry comic cut tick.'},

      {t:3.0,kind:'sfx',note:'Room tone narrows; motif pauses.'},
      {t:3.5,kind:'sfx',note:'Quiet hand/sleeve micro-rustle.'},
      {t:4.5,kind:'hit',note:'Macro-inset paper snap.'},
      {t:5.0,kind:'sfx',note:'Tiny high filtered focus tick.'},
      {t:5.5,kind:'hit',note:'Low questioning E3 tone.'},
      {t:6.0,kind:'cut',note:'Turntable motor cue begins under cut.'},

      {t:6.0,kind:'sfx',note:'Low platter/motor mechanical tone.'},
      {t:6.5,kind:'hit',note:'Start-control click.'},
      {t:7.5,kind:'sfx',note:'Soft tonearm pivot/cue movement.'},
      {t:8.5,kind:'hit',note:'Stylus CHK: short high transient plus quiet sub body.'},
      {t:9.0,kind:'cut',note:'First synthetic vinyl-crackle spike begins.'},

      {t:9.0,kind:'sfx',note:'Irregular filtered-noise crackle bed.'},
      {t:9.5,kind:'hit',note:'Major crackle cluster aligned to KRRK graphic and speaker jolt.'},
      {t:10.5,kind:'hit',note:'Second shorter/lower crackle cluster.'},
      {t:11.0,kind:'sfx',note:'Motif A4–E5 attempt is interrupted and masked.'},
      {t:11.5,kind:'hit',note:'Stop/cue click; motor tone decays.'},
      {t:12.0,kind:'cut',note:'Problem noise cuts cleanly to room tone.'},

      {t:12.0,kind:'sfx',note:'Bare room tone after crackle.'},
      {t:12.5,kind:'hit',note:'Decisive low tom-like decision hit.'},
      {t:13.5,kind:'sfx',note:'Panel-slide paper/wood swish.'},
      {t:14.0,kind:'hit',note:'Record settles on cleaning spindle.'},
      {t:14.5,kind:'sfx',note:'Bottle/nozzle handling tick.'},
      {t:15.0,kind:'hit',note:'Midpoint: liquid contact plip and first teal clean-state tone.'},

      {t:15.0,kind:'sfx',note:'Liquid contact.'},
      {t:15.5,kind:'sfx',note:'Light wet rotational texture.'},
      {t:16.0,kind:'sfx',note:'Brush fibres establish physical contact.'},
      {t:16.5,kind:'hit',note:'SHFF brush sweep: broadband stroke with short mid-frequency body.'},
      {t:17.0,kind:'hit',note:'Quiet C#5 motif seed returns.'},
      {t:17.5,kind:'sfx',note:'Macro fibre/groove contact tick.'},
      {t:18.0,kind:'cut',note:'Low vacuum motor starts under cut.'},

      {t:18.0,kind:'sfx',note:'Vacuum motor/hum opens.'},
      {t:18.5,kind:'hit',note:'Vacuum contact accent.'},
      {t:19.0,kind:'sfx',note:'Filtered broadband suction reaches peak.'},
      {t:20.0,kind:'swell',note:'Suction thins; first cleanGold overtone appears.'},
      {t:20.5,kind:'sfx',note:'Vacuum motor falls away.'},
      {t:21.0,kind:'cut',note:'Soft hand/edge contact.'},

      {t:21.0,kind:'sfx',note:'Safe edge grip contact.'},
      {t:21.5,kind:'sfx',note:'Short carry movement swish.'},
      {t:22.5,kind:'swell',note:'Listening-room tone returns warmer and wider.'},
      {t:23.5,kind:'hit',note:'Spindle/platter placement click.'},
      {t:24.0,kind:'cut',note:'Same motor cue as T6, now cleaner/brighter.'},

      {t:24.0,kind:'sfx',note:'Playback motor cue mirrors T6.'},
      {t:24.5,kind:'hit',note:'Start click mirrors T6.5.'},
      {t:25.5,kind:'sfx',note:'Tonearm cue mirrors T7.5.'},
      {t:26.5,kind:'hit',note:'Same physical stylus CHK as T8.5.'},
      {t:27.0,kind:'cut',note:'Full stable motif A4 E5 C#5 B4 begins on eighths, with no crackle mask.'},

      {t:27.0,kind:'hit',note:'Stable full motif continues.'},
      {t:27.5,kind:'swell',note:'Warm chord pad opens with smooth speaker pulse.'},
      {t:28.0,kind:'hit',note:'CleanGold bell overtone on relaxed reaction.'},
      {t:28.5,kind:'swell',note:'Room/stereo ambience widens.'},
      {t:29.0,kind:'sfx',note:'Light bass foundation enters.'},
      {t:29.5,kind:'hit',note:'Motif resolves on A4/E5 dyad.'},
      {t:30.0,kind:'sfx',note:'Natural musical tail; no terminal impact.'}
    ]
  };
})();