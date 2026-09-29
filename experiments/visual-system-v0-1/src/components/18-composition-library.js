// Reusable composition grammar. Scenes choose a named frame instead of re-authoring camera geometry.
(function(){
  'use strict';
  const V=FILM.visual;
  const reg=(name,center,scale,shadowY)=>V.registerComposition(name,Object.freeze({
    center:Object.freeze(center),
    scale,
    shadow:Object.freeze({x:540,y:shadowY,rx:310,ry:34})
  }));

  reg('editorial-hold',[540,900],1.58,1215);
  reg('editorial-place',[540,945],1.30,1450);
  reg('editorial-press',[540,960],1.18,1450);

  reg('fixture-hold',[540,930],1.72,1515);
  reg('fixture-place',[540,875],1.46,1515);
  reg('fixture-press',[540,870],1.42,1515);

  V.registerContract('composition-safe-frame',()=>{
    const failures=[];
    for(const name of ['editorial-hold','editorial-place','editorial-press','fixture-hold','fixture-place','fixture-press']){
      const c=V.composition(name);
      if(!(c.scale>=.7&&c.scale<=2.0))failures.push(name+' scale outside authored range');
      if(!(c.center[0]>=0&&c.center[0]<=1080&&c.center[1]>=0&&c.center[1]<=1920))failures.push(name+' camera center outside portrait frame');
      if(!(c.shadow.y>=0&&c.shadow.y<=1920))failures.push(name+' shadow outside portrait frame');
    }
    return failures;
  });
})();