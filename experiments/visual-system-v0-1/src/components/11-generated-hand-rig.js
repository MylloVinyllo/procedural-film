// GENERATED VECTOR HAND RIG — authored geometry, deterministic runtime payload.
(function(){
  'use strict';
  const palm='M -9 -18 C 2 -25 17 -27 30 -21 C 41 -16 47 -6 46 5 C 45 17 37 25 25 28 C 12 31 0 25 -7 16 C -12 8 -13 -8 -9 -18 Z';
  const openPalm='M -9 -19 C 1 -26 17 -28 30 -22 C 41 -17 47 -7 46 5 C 45 18 37 27 25 30 C 12 33 -1 27 -8 17 C -13 8 -13 -9 -9 -19 Z';
  const restPalm='M -9 -17 C 2 -24 17 -26 30 -20 C 40 -15 46 -6 45 4 C 44 15 37 23 25 26 C 13 29 0 24 -7 15 C -12 7 -12 -8 -9 -17 Z';
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
      seg([[24,-8],[41,-14],[58,-12],[70,-6]],11),
      seg([[24,5],[41,14],[54,16]],10),
      seg([[20,12],[32,21],[43,23]],9.5)
    ],[
      seg([[24,8],[42,7],[58,2],[70,-1]],11.5)
    ],[
      [[14,-5],[28,-2],[39,-6]],[[12,12],[27,15],[38,12]]
    ]),
    press:state(palm,[
      seg([[24,-8],[52,-10],[82,-10],[109,-9],[120,-7]],10.5),
      seg([[23,6],[38,15],[49,17]],9.5),
      seg([[18,13],[30,22],[40,23]],9)
    ],[
      seg([[25,8],[41,6],[51,1]],10.5)
    ],[
      [[13,-4],[28,-2],[39,-6]],[[11,12],[25,16],[36,14]]
    ]),
    rest:state(restPalm,[
      seg([[24,-5],[40,-4],[53,2]],10.5),
      seg([[23,5],[38,8],[49,13]],9.5)
    ],[
      seg([[24,8],[40,11],[50,17]],11)
    ],[
      [[12,-3],[27,0],[39,-4]],[[10,12],[24,15],[35,13]]
    ]),
    open:state(openPalm,[
      seg([[22,-11],[34,-31],[45,-46]],10.5),
      seg([[28,-8],[47,-24],[63,-33]],10.5),
      seg([[31,-1],[54,-8],[71,-9]],10),
      seg([[30,7],[50,10],[65,17]],9.5)
    ],[
      seg([[21,10],[34,24],[44,35]],11)
    ],[
      [[11,-4],[27,-2],[39,-6]],[[10,12],[24,16],[35,14]]
    ])
  };
  Object.defineProperty(FILM,'handVectorRig',{value:Object.freeze(R),writable:false,configurable:false});
})();