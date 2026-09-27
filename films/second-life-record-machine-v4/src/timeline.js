(function(){
  'use strict';

  FILM.TIMELINE = {
    title: 'Second Life of a Record — Machine-Cleaning V4',
    bpm: 120,
    duration: 36,
    fps: 24,
    width: 1080,
    height: 1920,
    shots: [
      { id:'find-record', file:'01-find-record.js', start:0, end:3, mode:'illustrated', title:'The sleeve', brief:'FIND: collector removes the record from its sleeve with safe handling and establishes the listening room.' },
      { id:'inspect-dust', file:'02-inspect-dust.js', start:3, end:6, mode:'illustrated', title:'Something is wrong', brief:'INSPECT: lamp-lit record tilt and groove macro reveal visible dust/fibres on the playable surface.' },
      { id:'first-play', file:'03-first-play.js', start:6, end:9, mode:'illustrated', title:'First try', brief:'PLAY: exact G2 playback geometry; platter starts, tonearm pivots, stylus contacts exact G3.' },
      { id:'hear-crackle', file:'04-hear-crackle.js', start:9, end:12, mode:'illustrated', title:'KRRK', brief:'HEAR: physical playback continues while crackle graphics, speaker movement and exact G4 listener reaction prove the problem.' },

      { id:'reveal-myllo', file:'05-reveal-myllo.js', start:12, end:15, mode:'illustrated', title:'Cleaning machine', brief:'PLACE: same record moves onto recognisable Myllo Vinyllo M1 machine; clamp and front control plate are clearly readable; label ОЧИСТКА ПЛАСТИНКИ.' },
      { id:'pump-solution', file:'06-pump-solution.js', start:15, end:18, mode:'illustrated', title:'Cleaning solution', brief:'APPLY: machine rotates; left supply/brush node engages before PUMP; liquid appears physically at contact; label МОЮЩИЙ РАСТВОР.' },
      { id:'brush-reverse', file:'07-brush-reverse.js', start:18, end:21, mode:'illustrated', title:'Groove cleaning', brief:'CLEAN: brush remains visibly engaged; wet groove field moves beneath it; REVERSE changes actual rotation direction; label ОЧИСТКА КАНАВОК.' },
      { id:'vacuum-collect', file:'08-vacuum-collect.js', start:21, end:24, mode:'illustrated', title:'Vacuum', brief:'VACUUM: supply node is parked, right collection node engages, VACUUM activates, wet film converges to slot and dry grooves emerge behind.' },
      { id:'grooves-before-after', file:'09-grooves-before-after.js', start:24, end:27, mode:'illustrated', title:'Before / after', brief:'VERIFY: exact G8 matched groove geometry shows dirt/fibres before and the same groove field visibly cleaner after; label ДО / ПОСЛЕ.' },

      { id:'return-record', file:'10-return-record.js', start:27, end:30, mode:'illustrated', title:'Back to the deck', brief:'RETURN: dry record is lifted safely from the machine and carried back to exact G2 turntable; label ПОВТОРНОЕ ПРОСЛУШИВАНИЕ.' },
      { id:'second-play', file:'11-second-play.js', start:30, end:33, mode:'illustrated', title:'Same needle', brief:'PLAY AGAIN: pixel-matched repeat of shot 03 G2/G3 with stable contours and no crackle distortion.' },
      { id:'enjoy-music', file:'12-enjoy-music.js', start:33, end:36, mode:'illustrated', title:'Different ending', brief:'ENJOY: exact dirty-reaction geometry returns clean, then opens into a warm full-room listening payoff.' }
    ],
    cues: [
      {t:0.0,kind:'sfx',note:'Soft listening-room tone; sparse motif seed.'},
      {t:0.5,kind:'sfx',note:'Sleeve paper scrape.'},
      {t:1.5,kind:'sfx',note:'Inner-sleeve friction as record emerges.'},
      {t:2.5,kind:'hit',note:'Small curiosity bell.'},

      {t:3.0,kind:'cut',note:'Dry comic cut; room tone narrows.'},
      {t:4.5,kind:'hit',note:'Groove-macro inset snap.'},
      {t:5.0,kind:'sfx',note:'High focus tick on fibre/dust.'},
      {t:5.5,kind:'hit',note:'Low questioning tone.'},

      {t:6.0,kind:'sfx',note:'Turntable motor starts.'},
      {t:6.5,kind:'hit',note:'Start-control click.'},
      {t:7.5,kind:'sfx',note:'Tonearm pivot/cue movement.'},
      {t:8.5,kind:'hit',note:'Stylus CHK contact.'},
      {t:9.0,kind:'cut',note:'First vinyl crackle begins.'},

      {t:9.5,kind:'hit',note:'Major crackle cluster aligned to KRRK and speaker jolt.'},
      {t:10.5,kind:'hit',note:'Second shorter crackle cluster.'},
      {t:11.5,kind:'hit',note:'Stop/cue click; motor decays.'},
      {t:12.0,kind:'cut',note:'Problem noise clears into handling / transition.'},

      {t:12.5,kind:'sfx',note:'Record carry / panel reveal swish.'},
      {t:13.5,kind:'hit',note:'Record placement on Myllo spindle.'},
      {t:14.0,kind:'hit',note:'Metal clamp turn/click.'},
      {t:15.0,kind:'hit',note:'START button click + Myllo motor/rotation tone.'},

      {t:15.5,kind:'sfx',note:'Supply/brush node pivot hardware.'},
      {t:16.0,kind:'sfx',note:'Brush contact settles.'},
      {t:16.25,kind:'hit',note:'PUMP button click.'},
      {t:16.5,kind:'sfx',note:'Short cleaning-solution feed.'},
      {t:17.0,kind:'sfx',note:'Wet rotation / brush friction begins.'},

      {t:18.0,kind:'cut',note:'Cleaning stage settles into sustained brush action.'},
      {t:18.5,kind:'sfx',note:'Brush/fibre friction detail.'},
      {t:19.25,kind:'hit',note:'REVERSE button click.'},
      {t:19.5,kind:'sfx',note:'Motor direction cue flips.'},
      {t:20.0,kind:'sfx',note:'Opposite-direction brush texture.'},

      {t:21.0,kind:'cut',note:'Supply node clears; vacuum hardware enters.'},
      {t:21.5,kind:'sfx',note:'Vacuum-node pivot.'},
      {t:22.0,kind:'hit',note:'Collection-slot contact.'},
      {t:22.25,kind:'hit',note:'VACUUM button click.'},
      {t:22.5,kind:'swell',note:'Vacuum/suction rises.'},
      {t:23.5,kind:'sfx',note:'Suction thins as dry area grows.'},

      {t:24.0,kind:'cut',note:'Before/after comparison opens.'},
      {t:24.5,kind:'sfx',note:'Comparator slide tick.'},
      {t:25.0,kind:'hit',note:'Small residual BEFORE crackle tick.'},
      {t:25.5,kind:'hit',note:'Stable AFTER clean harmonic.'},
      {t:26.5,kind:'swell',note:'Clean motif reforms into return transition.'},

      {t:27.0,kind:'cut',note:'Safe grip / return sequence.'},
      {t:27.5,kind:'sfx',note:'Record carry swish.'},
      {t:28.5,kind:'swell',note:'Listening-room tone returns warmer/wider.'},
      {t:29.5,kind:'hit',note:'Record settles on turntable spindle.'},

      {t:30.0,kind:'sfx',note:'Playback motor cue mirrors T6.'},
      {t:30.5,kind:'hit',note:'Start click mirrors T6.5.'},
      {t:31.5,kind:'sfx',note:'Tonearm cue mirrors T7.5.'},
      {t:32.5,kind:'hit',note:'Stylus CHK mirrors T8.5.'},
      {t:33.0,kind:'cut',note:'Stable musical motif enters with no crackle.'},

      {t:33.5,kind:'swell',note:'Warm chord / smooth speaker pulse.'},
      {t:34.0,kind:'hit',note:'Clean bell on relaxed listener reaction.'},
      {t:34.5,kind:'swell',note:'Room/stereo ambience widens.'},
      {t:35.0,kind:'sfx',note:'Light bass foundation.'},
      {t:35.5,kind:'hit',note:'Motif resolves.'},
      {t:36.0,kind:'sfx',note:'Natural tail.'}
    ]
  };
})();