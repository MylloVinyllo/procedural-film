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
    const rootY=V.lerp(760,1085,move),scale=V.lerp(1.02,1.06,move);
    return {
      machine,record,
      character:{root:[panelX+270,rootY],scale,leftWrist:ra.edge(Math.PI*.92),rightWrist:ra.edge(Math.PI*.08),leftHand:'edge',rightHand:'edge'}
    };
  }

  function samplePress(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78,active:u>.62?'PUMP':null},ma=washer.anchors(machine);
    const record={x:ma.recordCenter[0],y:ma.recordCenter[1],r:108};
    // Press is staged as a close physical reach from behind/left of the machine.
    const root=[panelX+205,1255],scale=1.04;
    const rest=[panelX+305,1135],target=ma.pumpButton,ra=rec.anchors(record);
    const reach=V.sstep(.08,.58,u),release=V.sstep(.76,1,u);
    const k=release>0?1-release:reach;
    const right=[V.lerp(rest[0],target[0],k),V.lerp(rest[1],target[1],k)];
    // passive hand braces the record instead of floating beside the machine.
    const left=ra.edge(Math.PI*.82);
    return {machine,record,character:{root,scale,leftWrist:left,rightWrist:right,leftHand:'edge',rightHand:'press'}};
  }
  V.registerAction('place-record',{sample:samplePlace});
  V.registerAction('press-pump',{sample:samplePress});

  const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
  V.registerContract('interaction-reach-and-contact',()=>{
    const failures=[];
    for(const backendName of ['pure','vector']){
      const backend=V.character(backendName);
      for(let i=0;i<=20;i++){
        const u=i/20,s=samplePlace(u,0),q=backend.audit(s.character);
        if(Math.max(q.leftOverreach,q.rightOverreach)>.75)failures.push(backendName+' place overreach '+Math.max(q.leftOverreach,q.rightOverreach).toFixed(1)+'px at u='+u.toFixed(2));
      }
      const p=samplePress(.62,0),q=backend.audit(p.character),target=washer.anchors(p.machine).pumpButton;
      if(q.rightOverreach>.75)failures.push(backendName+' press overreach '+q.rightOverreach.toFixed(1)+'px');
      if(dist(p.character.rightWrist,target)>1)failures.push(backendName+' press contact misses pump anchor');
    }
    return failures;
  });
})();