// GENERATED VECTOR HAND RIG — authored geometry, deterministic runtime payload.
(function(){
  'use strict';
  const palm='M -6 -13 C 2 -19 14 -21 25 -17 C 34 -13 39 -5 38 4 C 37 13 31 19 22 22 C 12 25 2 21 -4 14 C -9 8 -9 -6 -6 -13 Z';
  const openPalm='M -6 -14 C 2 -20 15 -22 26 -18 C 35 -14 40 -6 39 4 C 38 14 31 21 22 24 C 12 27 1 22 -5 15 C -10 8 -10 -7 -6 -14 Z';
  const restPalm='M -6 -12 C 2 -18 14 -20 25 -16 C 34 -12 39 -5 38 4 C 37 12 31 18 22 21 C 12 24 2 20 -4 13 C -9 7 -9 -6 -6 -12 Z';
  const freeze=o=>Object.freeze(o);
  const seg=(points,width,tipWidth=Math.max(6,width*.68))=>freeze({points:Object.freeze(points.map(p=>Object.freeze(p))),width,tipWidth});
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
      seg([[23,-8],[37,-17],[50,-16]],10),
      seg([[28,-2],[45,-8],[58,-4]],10),
      seg([[28,6],[44,6],[55,12]],9.5)
    ],[
      seg([[21,9],[33,19],[41,28]],10.5)
    ],[
      [[10,-3],[24,-1],[35,-5]],[[9,11],[22,15],[33,13]]
    ])
  };
  Object.defineProperty(FILM,'handVectorRig',{value:Object.freeze(R),writable:false,configurable:false});
})();