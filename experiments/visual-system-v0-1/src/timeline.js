(function(){
  'use strict';
  FILM.TIMELINE={
    title:'Visual System v0.1 R&D Lab',
    bpm:120,
    duration:32,
    fps:24,
    width:1080,
    height:1920,
    shots:[
      {id:'visual-system-ab',file:'01-visual-system-ab.js',start:0,end:8,mode:'illustrated',title:'Pure procedural vs compiled vector',brief:'A/B proof: hold, place-record, press-pump.'},
      {id:'quality-proof',file:'02-quality-proof.js',start:8,end:14,mode:'illustrated',title:'Vector quality proof',brief:'Single authored-vector actor performing hold, place and press with stable contact.'},
      {id:'product-fixture',file:'03-product-fixture.js',start:14,end:18,mode:'illustrated',title:'MV-RCM01 product fixture',brief:'Large product-only proof against real machine evidence.'},
      {id:'character-fixture',file:'04-character-fixture.js',start:18,end:24,mode:'illustrated',title:'Character component fixture',brief:'Large pose and hand inspection for HOLD, PLACE and PRESS.'},
      {id:'motion-fixture',file:'05-motion-fixture.js',start:24,end:32,mode:'illustrated',title:'Motion grammar fixture',brief:'Normal-speed PLACE and PRESS micro-actions with anticipation, curved travel, contact, settle and release.'}
    ],
    cues:[]
  };
})();