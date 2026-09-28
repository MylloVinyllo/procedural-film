// Reusable temporal grammar for object placement and control press.
(function(){
  'use strict';
  const V=FILM.visual,E=FILM.lib.ease;
  const phase=(a,b,t,e='inOutCubic')=>E[e](V.clamp((t-a)/(b-a)));

  V.registerMotion('place-object',t=>{
    const anticipation=phase(0,.16,t,'outCubic');
    const travel=phase(.12,.66,t,'inOutCubic');
    const seat=phase(.62,.76,t,'outCubic');
    const release=phase(.77,.86,t,'inOutCubic');
    const retract=phase(.84,1,t,'outCubic');
    // A small lift gives the carried object an arc instead of a ruler-straight diagonal.
    const arcLift=Math.sin(Math.PI*travel)*64 + Math.sin(Math.PI*anticipation)*8*(1-travel);
    return {anticipation,travel,seat,release,retract,arcLift,contactActive:release<.5};
  });

  V.registerMotion('press-control',t=>{
    const anticipation=phase(0,.17,t,'outCubic');
    const reach=phase(.14,.58,t,'inOutCubic');
    const depress=phase(.56,.66,t,'outCubic');
    const hold=V.clamp((t-.64)/.10)*(1-V.clamp((t-.75)/.08));
    const release=phase(.75,1,t,'outCubic');
    return {anticipation,reach,depress,hold,release,contactActive:reach>.985&&release<.08};
  });
})();