(function(){
  'use strict';
  const V=FILM.visual;
  const rec=V.prop('vinyl-record'),washer=V.product('myllo-rcm');

  // Same semantic action drives both character backends.
  function samplePlace(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78};
    const ma=washer.anchors(machine);
    const start=[panelX+270,850],end=ma.recordCenter;
    const move=V.sstep(.18,.78,u);
    const record={x:V.lerp(start[0],end[0],move),y:V.lerp(start[1],end[1],move),r:108,rot:V.lerp(-.06,0,move)};
    const ra=rec.anchors(record);
    // The body follows the task. We do not ask a fixed shoulder to reach half a frame away.
    const rootY=V.lerp(720,1035,move),scale=V.lerp(.92,1.04,move);
    return {
      machine,record,
      character:{root:[panelX+270,rootY],scale,leftWrist:ra.edge(Math.PI*.92),rightWrist:ra.edge(Math.PI*.08),leftHand:'edge',rightHand:'edge'}
    };
  }

  function samplePress(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78,active:u>.62?'PUMP':null},ma=washer.anchors(machine);
    const record={x:ma.recordCenter[0],y:ma.recordCenter[1],r:108};
    // Press is staged as a close physical reach from behind/left of the machine.
    const root=[panelX+205,1235],scale=1.04;
    const rest=[panelX+305,1135],target=ma.pumpButton;
    const reach=V.sstep(.08,.58,u),release=V.sstep(.76,1,u);
    const k=release>0?1-release:reach;
    const right=[V.lerp(rest[0],target[0],k),V.lerp(rest[1],target[1],k)];
    const left=[panelX+118,1180];
    return {machine,record,character:{root,scale,leftWrist:left,rightWrist:right,leftHand:'edge',rightHand:'press'}};
  }
  V.registerAction('place-record',{sample:samplePlace});
  V.registerAction('press-pump',{sample:samplePress});
})();