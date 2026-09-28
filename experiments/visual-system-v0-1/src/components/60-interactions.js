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
    // The body follows the task. Hand WRISTS are solved from authored hand-contact anchors.
    const rootY=V.lerp(760,1085,move),scale=V.lerp(1.02,1.06,move);
    const leftA=Math.PI*.92,rightA=Math.PI*.08;
    const leftContact=ra.edge(leftA),rightContact=ra.edge(rightA);
    const leftRot=leftA+Math.PI+.16,rightRot=rightA+Math.PI-.16;
    const leftWrist=V.wristForHandContact('edge',leftContact,leftRot,scale);
    const rightWrist=V.wristForHandContact('edge',rightContact,rightRot,scale);
    return {
      machine,record,
      contacts:{left:leftContact,right:rightContact},
      character:{root:[panelX+270,rootY],scale,leftWrist,rightWrist,leftHand:'edge',rightHand:'edge',leftHandRot:leftRot,rightHandRot:rightRot}
    };
  }

  function samplePress(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78,active:u>.62?'PUMP':null},ma=washer.anchors(machine);
    const record={x:ma.recordCenter[0],y:ma.recordCenter[1],r:108};
    // Press is staged as a close physical reach. The index FINGERTIP, not the wrist, owns contact.
    const root=[panelX+205,1255],scale=1.04,ra=rec.anchors(record);
    const pressRot=Math.PI/2;
    const restContact=[panelX+340,1115],target=ma.pumpButton;
    const reach=V.sstep(.08,.58,u),release=V.sstep(.76,1,u);
    const k=release>0?1-release:reach;
    const pressContact=[V.lerp(restContact[0],target[0],k),V.lerp(restContact[1],target[1],k)];
    const right=V.wristForHandContact('press',pressContact,pressRot,scale);

    // passive hand braces the record through the same hand-contact model.
    const leftA=Math.PI*.82,leftContact=ra.edge(leftA),leftRot=leftA+Math.PI+.10;
    const left=V.wristForHandContact('edge',leftContact,leftRot,scale);
    return {
      machine,record,
      contacts:{left:leftContact,right:pressContact,rightTarget:target},
      character:{root,scale,leftWrist:left,rightWrist:right,leftHand:'edge',rightHand:'press',leftHandRot:leftRot,rightHandRot:pressRot}
    };
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
        const lc=V.handContactWorld('edge',s.character.leftWrist,s.character.leftHandRot,s.character.scale);
        const rc=V.handContactWorld('edge',s.character.rightWrist,s.character.rightHandRot,s.character.scale);
        if(dist(lc,s.contacts.left)>1||dist(rc,s.contacts.right)>1)failures.push(backendName+' place grip contact drift at u='+u.toFixed(2));
      }
      const p=samplePress(.62,0),q=backend.audit(p.character),target=washer.anchors(p.machine).pumpButton;
      if(q.rightOverreach>.75)failures.push(backendName+' press overreach '+q.rightOverreach.toFixed(1)+'px');
      const actualPress=V.handContactWorld('press',p.character.rightWrist,p.character.rightHandRot,p.character.scale);
      if(dist(actualPress,p.contacts.right)>1)failures.push(backendName+' press fingertip drifted from authored contact');
      if(dist(p.contacts.right,target)>1)failures.push(backendName+' press contact misses pump anchor');
      const actualSupport=V.handContactWorld('edge',p.character.leftWrist,p.character.leftHandRot,p.character.scale);
      if(dist(actualSupport,p.contacts.left)>1)failures.push(backendName+' support grip drifted from record edge');
    }
    return failures;
  });
})();