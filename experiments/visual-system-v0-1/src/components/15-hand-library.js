// Canonical authored hand states. Contact coordinates are part of the motion contract.
(function(){
  'use strict';
  const V=FILM.visual;
  V.registerHand('edge',Object.freeze({
    contact:Object.freeze([69,-1]),
    drawScale:.68,
    semantic:'record-edge grip',
    silhouette:'thumb-index pinch with grouped trailing fingers'
  }));
  V.registerHand('press',Object.freeze({
    contact:Object.freeze([120,-7]),
    drawScale:.62,
    semantic:'index-finger control press',
    silhouette:'extended index with compact curled finger mass'
  }));
  V.registerHand('rest',Object.freeze({
    contact:Object.freeze([48,16]),
    drawScale:.66,
    semantic:'palm-rest on machine edge',
    silhouette:'low palm with folded thumb'
  }));
  V.registerHand('open',Object.freeze({
    contact:Object.freeze([0,0]),
    drawScale:.62,
    semantic:'released open hand',
    silhouette:'relaxed open release'
  }));
})();