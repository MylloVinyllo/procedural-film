// GENERATED VECTOR HAND RIG — authored geometry, deterministic runtime payload.
(function(){
  'use strict';
  const palm='M -11 -24 C 2 -34 23 -37 40 -29 C 55 -22 64 -8 62 8 C 60 24 49 36 32 40 C 14 44 -3 36 -11 23 C -18 11 -17 -12 -11 -24 Z';
  const openPalm='M -12 -24 C 1 -35 23 -37 40 -30 C 55 -23 63 -9 61 8 C 59 25 48 37 31 41 C 14 45 -4 37 -12 23 C -18 10 -18 -12 -12 -24 Z';
  const restPalm='M -12 -21 C 2 -30 23 -32 41 -25 C 55 -19 63 -7 62 7 C 60 21 49 31 33 34 C 16 38 -3 31 -11 19 C -17 9 -17 -11 -12 -21 Z';
  const freeze=o=>Object.freeze(o);
  const seg=(points,width)=>freeze({points:Object.freeze(points.map(p=>Object.freeze(p))),width});
  const state=(palmPath,behind,front,crease)=>freeze({
    palm:palmPath,
    behind:Object.freeze(behind),
    front:Object.freeze(front),
    crease:Object.freeze(crease||[])
  });
  const R={
    edge:state(palm,[
      seg([[30,-11],[48,-19],[66,-15],[78,-7]],15),
      seg([[31,7],[48,18],[61,20]],14),
      seg([[25,16],[38,27],[49,29]],13)
    ],[
      seg([[31,10],[50,9],[66,3],[77,-1]],16)
    ],[
      [[14,-5],[28,-2],[39,-6]],[[12,12],[27,15],[38,12]]
    ]),
    press:state(palm,[
      seg([[31,-11],[58,-13],[88,-12],[116,-10],[126,-8]],15),
      seg([[29,8],[44,20],[55,22]],14),
      seg([[23,17],[35,28],[46,29]],13)
    ],[
      seg([[33,10],[49,7],[59,1]],15)
    ],[
      [[13,-4],[28,-2],[39,-6]],[[11,12],[25,16],[36,14]]
    ]),
    rest:state(restPalm,[
      seg([[31,-7],[48,-5],[61,2]],15),
      seg([[29,6],[45,10],[56,16]],14)
    ],[
      seg([[31,10],[48,14],[57,21]],16)
    ],[
      [[12,-3],[27,0],[39,-4]],[[10,12],[24,15],[35,13]]
    ]),
    open:state(openPalm,[
      seg([[28,-14],[42,-37],[55,-55]],15),
      seg([[36,-10],[58,-29],[76,-39]],15),
      seg([[40,-1],[66,-10],[86,-11]],14),
      seg([[39,8],[61,12],[78,20]],13)
    ],[
      seg([[27,13],[42,29],[53,42]],16)
    ],[
      [[11,-4],[27,-2],[39,-6]],[[10,12],[24,16],[35,14]]
    ])
  };
  Object.defineProperty(FILM,'handVectorRig',{value:Object.freeze(R),writable:false,configurable:false});
})();