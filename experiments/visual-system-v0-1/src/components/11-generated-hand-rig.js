// GENERATED VECTOR HAND RIG — authored geometry, deterministic runtime payload.
(function(){
  'use strict';
  const palm='M -6 -12 C 2 -18 13 -20 23 -16 C 32 -12 36 -4 35 4 C 34 12 28 18 20 20 C 11 23 2 19 -4 13 C -8 7 -9 -6 -6 -12 Z';
  const openPalm='M -6 -13 C 2 -19 14 -21 24 -17 C 33 -13 37 -5 36 4 C 35 13 29 19 20 22 C 11 25 1 21 -5 14 C -9 7 -10 -7 -6 -13 Z';
  const restPalm='M -6 -11 C 2 -17 13 -19 23 -15 C 31 -11 35 -4 34 4 C 33 12 27 17 19 20 C 10 22 2 18 -4 12 C -8 6 -9 -5 -6 -11 Z';

  const freeze=o=>Object.freeze(o);
  const seg=(name,points,width,tipWidth=Math.max(4.8,width*.62),meta={})=>freeze({
    name,
    points:Object.freeze(points.map(p=>Object.freeze(p))),
    width,tipWidth,
    nail:meta.nail!==false,
    role:meta.role||name
  });
  const state=(palmPath,behind,front,crease)=>freeze({
    palm:palmPath,
    behind:Object.freeze(behind),
    front:Object.freeze(front),
    crease:Object.freeze(crease||[])
  });

  const R={
    // Thumb is in front of the record. Index + remaining fingers wrap behind it.
    edge:state(palm,[
      seg('index', [[21,-8],[38,-12],[55,-8],[70,-3]], 8.6,5.3,{role:'pinch-back'}),
      seg('middle',[[21,0],[37,5],[49,9]],7.8,4.9),
      seg('ring',  [[19,7],[33,13],[43,16]],7.1,4.5),
      seg('pinky', [[15,12],[26,17],[34,19]],6.4,4.1)
    ],[
      seg('thumb', [[18,7],[34,7],[51,3],[69,-1]],9.2,5.8,{role:'pinch-front'})
    ],[
      [[10,-4],[21,-2],[30,-5]],[[9,9],[20,12],[29,10]]
    ]),

    // Index owns the button contact. Other fingers remain visibly curled.
    press:state(palm,[
      seg('middle',[[20,0],[34,8],[42,13]],7.4,4.5),
      seg('ring',  [[17,7],[29,15],[36,18]],6.8,4.2),
      seg('pinky', [[13,11],[23,18],[29,20]],6.0,3.9)
    ],[
      seg('thumb', [[19,7],[31,5],[40,0]],8.6,5.2,{nail:false}),
      seg('index', [[22,-7],[48,-9],[76,-9],[102,-8],[120,-7]],8.0,4.8,{role:'contact'})
    ],[
      [[10,-4],[22,-2],[31,-5]],[[8,9],[19,12],[28,10]]
    ]),

    // Four fingers drape over the cabinet edge while thumb rests along the palm.
    rest:state(restPalm,[
      seg('index', [[20,-6],[34,-5],[47,0]],7.8,4.8),
      seg('middle',[[21,0],[36,2],[49,7]],7.6,4.7),
      seg('ring',  [[19,6],[33,9],[45,13]],7.0,4.3),
      seg('pinky', [[15,10],[27,14],[37,16]],6.2,3.9)
    ],[
      seg('thumb', [[18,7],[31,11],[48,16]],8.6,5.2,{role:'contact'})
    ],[
      [[9,-3],[20,0],[29,-3]],[[8,9],[19,12],[28,10]]
    ]),

    // Five distinct digits with restrained fan. No starburst.
    open:state(openPalm,[
      seg('index', [[20,-8],[34,-18],[46,-21]],7.7,4.7),
      seg('middle',[[22,-3],[39,-10],[53,-10]],7.5,4.6),
      seg('ring',  [[22,3],[38,1],[51,5]],7.0,4.3),
      seg('pinky', [[19,9],[31,12],[41,18]],6.2,3.9)
    ],[
      seg('thumb', [[17,8],[28,18],[36,27]],8.4,5.0)
    ],[
      [[9,-3],[20,-1],[29,-4]],[[8,10],[19,13],[28,11]]
    ])
  };

  Object.defineProperty(FILM,'handVectorRig',{value:Object.freeze(R),writable:false,configurable:false});
})();