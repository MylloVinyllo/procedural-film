// Canonical pose language. Actions sample these states instead of inventing anatomy in scenes.
(function(){
  'use strict';
  const V=FILM.visual;
  const mix=(a,b,t)=>V.lerp(a,b,t);
  const pose=(bodyRot,lx,ly,rx,ry)=>Object.freeze({bodyRot,leftShoulder:Object.freeze([lx,ly]),rightShoulder:Object.freeze([rx,ry])});

  V.registerPose('neutral',()=>pose(0,0,0,0,0));
  V.registerPose('hold-record',t=>pose(
    mix(0,.012,t),
    mix(0,-2,t),mix(0,3,t),
    mix(0,2,t),mix(0,3,t)
  ));
  V.registerPose('place-record',t=>pose(
    mix(.012,-.026,t),
    mix(-2,-7,t),mix(3,8,t),
    mix(2,5,t),mix(3,7,t)
  ));
  V.registerPose('press-control',t=>pose(
    mix(-.01,-.055,t),
    mix(0,-2,t),mix(2,7,t),
    mix(0,9,t),mix(0,-6,t)
  ));
})();