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

  // HOLD is deliberately asymmetric. Perfect bilateral symmetry made the actor read as a mannequin.
  V.registerPose('hold-record',t=>pose({
    bodyRot:mix(0,-.018,t),
    leftShoulder:[mix(0,-5,t),mix(0,7,t)],
    rightShoulder:[mix(0,4,t),mix(0,1,t)],
    headRot:mix(0,.045,t),
    headOffset:[mix(0,2,t),mix(0,2,t)],
    gaze:[mix(0,1.2,t),mix(0,1.6,t)]
  }));

  // PLACE leans the torso toward the spindle and advances the near shoulder.
  V.registerPose('place-record',t=>pose({
    bodyRot:mix(-.018,-.046,t),
    leftShoulder:[mix(-5,-10,t),mix(7,12,t)],
    rightShoulder:[mix(4,8,t),mix(1,5,t)],
    headRot:mix(.035,.082,t),
    headOffset:[mix(1,4,t),mix(2,5,t)],
    gaze:[mix(1.2,2.5,t),mix(1.6,3.3,t)]
  }));

  // PRESS is a side-working pose rather than a front-facing puppet stance.
  V.registerPose('press-control',t=>pose({
    bodyRot:mix(-.018,-.072,t),
    leftShoulder:[mix(-2,-7,t),mix(3,9,t)],
    rightShoulder:[mix(3,12,t),mix(0,-8,t)],
    headRot:mix(.025,.105,t),
    headOffset:[mix(0,4,t),mix(1,4,t)],
    gaze:[mix(1,3.0,t),mix(1,3.4,t)]
  }));
})();