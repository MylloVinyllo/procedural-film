// Canonical pose language. Actions sample these states instead of inventing anatomy in scenes.
(function(){
  'use strict';
  const V=FILM.visual;
  const mix=(a,b,t)=>V.lerp(a,b,t);
  const pose=(o)=>Object.freeze({
    bodyRot:o.bodyRot||0,
    leftShoulder:Object.freeze(o.leftShoulder||[0,0]),
    rightShoulder:Object.freeze(o.rightShoulder||[0,0]),
    headRot:o.headRot||0,
    headOffset:Object.freeze(o.headOffset||[0,0]),
    gaze:Object.freeze(o.gaze||[0,0])
  });

  V.registerPose('neutral',()=>pose({}));

  V.registerPose('hold-record',t=>pose({
    bodyRot:mix(0,.012,t),
    leftShoulder:[mix(0,-3,t),mix(0,4,t)],
    rightShoulder:[mix(0,3,t),mix(0,4,t)],
    headRot:mix(0,.035,t),
    headOffset:[mix(0,1,t),mix(0,2,t)],
    gaze:[mix(0,1.4,t),mix(0,2.0,t)]
  }));

  V.registerPose('place-record',t=>pose({
    bodyRot:mix(.012,-.035,t),
    leftShoulder:[mix(-2,-8,t),mix(3,10,t)],
    rightShoulder:[mix(2,6,t),mix(3,8,t)],
    headRot:mix(.025,.075,t),
    headOffset:[mix(0,2,t),mix(2,4,t)],
    gaze:[mix(1,2.2,t),mix(2,3.2,t)]
  }));

  V.registerPose('press-control',t=>pose({
    bodyRot:mix(-.01,-.06,t),
    leftShoulder:[mix(0,-4,t),mix(2,7,t)],
    rightShoulder:[mix(0,10,t),mix(0,-7,t)],
    headRot:mix(.01,.09,t),
    headOffset:[mix(0,3,t),mix(0,4,t)],
    gaze:[mix(1,2.8,t),mix(1,3.2,t)]
  }));
})();