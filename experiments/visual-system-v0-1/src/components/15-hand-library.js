// Canonical hand states. Contact coordinates are part of the motion contract.
(function(){
  'use strict';
  const V=FILM.visual;
  V.registerHand('edge',Object.freeze({
    contact:Object.freeze([62,15]),
    drawScale:.72,
    semantic:'record-edge grip'
  }));
  V.registerHand('press',Object.freeze({
    contact:Object.freeze([102,2]),
    drawScale:.72,
    semantic:'index-finger control press'
  }));
  V.registerHand('rest',Object.freeze({
    contact:Object.freeze([47,20]),
    drawScale:.76,
    semantic:'palm-rest on machine edge'
  }));
  V.registerHand('open',Object.freeze({
    contact:Object.freeze([0,0]),
    drawScale:.74,
    semantic:'released open hand'
  }));
})();