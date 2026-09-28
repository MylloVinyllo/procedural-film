(function(){
  'use strict';
  const V=FILM.visual;
  const rec=V.prop('vinyl-record'),washer=V.product('myllo-rcm');
  const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);

  function gripRecord(record,characterScale,leftA=Math.PI*.92,rightA=Math.PI*.08){
    const ra=rec.anchors(record);
    const leftContact=ra.edge(leftA),rightContact=ra.edge(rightA);
    const leftRot=leftA+Math.PI+.16,rightRot=rightA+Math.PI-.16;
    return {
      contacts:{left:leftContact,right:rightContact},
      leftWrist:V.wristForHandContact('edge',leftContact,leftRot,characterScale),
      rightWrist:V.wristForHandContact('edge',rightContact,rightRot,characterScale),
      leftRot,rightRot
    };
  }

  function sampleHold(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78,showRecord:false,clampVisible:false};
    const record={x:panelX+270,y:850,rx:108,ry:108,rot:0};
    const scale=1.02,g=gripRecord(record,scale);
    return {
      machine,record,contacts:g.contacts,
      character:{
        root:[panelX+270,760],scale,pose:V.samplePose('hold-record',u),
        leftWrist:g.leftWrist,rightWrist:g.rightWrist,leftArmLayer:'front',rightArmLayer:'front',
        leftHand:'edge',rightHand:'edge',leftHandRot:g.leftRot,rightHandRot:g.rightRot
      }
    };
  }

  function samplePlace(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78,showRecord:false,clampVisible:false};
    const ma=washer.anchors(machine);
    const start=[panelX+270,850],end=ma.recordCenter;
    const move=V.sstep(.18,.78,u);
    const [endRx,endRy]=ma.recordRadii;
    const record={
      x:V.lerp(start[0],end[0],move),y:V.lerp(start[1],end[1],move),
      rx:V.lerp(108,endRx,move),ry:V.lerp(108,endRy,move),rot:V.lerp(-.06,0,move)
    };
    const rootY=V.lerp(760,1085,move),scale=V.lerp(1.02,1.06,move),g=gripRecord(record,scale);
    return {
      machine,record,contacts:g.contacts,
      character:{
        root:[panelX+270,rootY],scale,pose:V.samplePose('place-record',move),
        leftWrist:g.leftWrist,rightWrist:g.rightWrist,leftArmLayer:'front',rightArmLayer:'front',
        leftHand:'edge',rightHand:'edge',leftHandRot:g.leftRot,rightHandRot:g.rightRot
      }
    };
  }

  function samplePress(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1240,scale:.78,showRecord:false,clampVisible:true,active:u>.62?'PUMP':null},ma=washer.anchors(machine);
    const record={x:ma.recordCenter[0],y:ma.recordCenter[1],rx:ma.recordRadii[0],ry:ma.recordRadii[1],rot:0};
    // Character stands slightly left of the cabinet: support palm rests on cabinet edge,
    // index finger reaches the front PUMP control. The seated record is not used as a hand rest.
    const root=[panelX+10,1260],scale=1.04;
    const pressRot=.16;
    const restFinger=[panelX+390,1190],target=ma.pumpButton;
    const reach=V.sstep(.08,.58,u),release=V.sstep(.76,1,u),k=release>0?1-release:reach;
    const pressContact=[V.lerp(restFinger[0],target[0],k),V.lerp(restFinger[1],target[1],k)];
    const right=V.wristForHandContact('press',pressContact,pressRot,scale);

    const leftContact=ma.frontLeftRest,leftRot=-.05;
    const left=V.wristForHandContact('rest',leftContact,leftRot,scale);
    return {
      machine,record,contacts:{left:leftContact,right:pressContact,rightTarget:target},
      character:{
        root,scale,pose:V.samplePose('press-control',k),
        leftWrist:left,rightWrist:right,leftArmLayer:'front',rightArmLayer:'front',
        leftBend:1,rightBend:-1,
        leftHand:'rest',rightHand:'press',leftHandRot:leftRot,rightHandRot:pressRot
      }
    };
  }

  V.registerAction('hold-record',{sample:sampleHold});
  V.registerAction('place-record',{sample:samplePlace});
  V.registerAction('press-pump',{sample:samplePress});

  function checkGripState(backendName,s,label,failures){
    const backend=V.character(backendName),q=backend.audit(s.character);
    if(Math.max(q.leftOverreach,q.rightOverreach)>.75)failures.push(backendName+' '+label+' overreach '+Math.max(q.leftOverreach,q.rightOverreach).toFixed(1)+'px');
    const lc=V.handContactWorld(s.character.leftHand,s.character.leftWrist,s.character.leftHandRot,s.character.scale);
    const rc=V.handContactWorld(s.character.rightHand,s.character.rightWrist,s.character.rightHandRot,s.character.scale);
    if(dist(lc,s.contacts.left)>1)failures.push(backendName+' '+label+' left contact drift');
    if(dist(rc,s.contacts.right)>1)failures.push(backendName+' '+label+' right contact drift');
  }

  V.registerContract('interaction-reach-and-contact',()=>{
    const failures=[];
    for(const backendName of ['pure','vector']){
      checkGripState(backendName,sampleHold(1,0),'hold',failures);
      for(let i=0;i<=20;i++)checkGripState(backendName,samplePlace(i/20,0),'place@'+(i/20).toFixed(2),failures);
      const p=samplePress(.62,0);
      checkGripState(backendName,p,'press',failures);
      const target=washer.anchors(p.machine).pumpButton;
      if(dist(p.contacts.right,target)>1)failures.push(backendName+' press contact misses pump anchor');
    }
    return failures;
  });

  V.registerContract('record-seat-projection',()=>{
    const failures=[],end=samplePlace(1,0),ma=washer.anchors(end.machine);
    if(dist([end.record.x,end.record.y],ma.recordCenter)>1)failures.push('placed record center misses washer spindle');
    if(Math.abs(end.record.rx-ma.recordRadii[0])>1||Math.abs(end.record.ry-ma.recordRadii[1])>1)failures.push('placed record projection does not match washer plane');
    const p=samplePress(.62,0),pm=washer.anchors(p.machine);
    if(dist([p.record.x,p.record.y],pm.recordCenter)>1)failures.push('press state moved seated record off spindle');
    if(Math.abs(p.record.rx-pm.recordRadii[0])>1||Math.abs(p.record.ry-pm.recordRadii[1])>1)failures.push('press state record projection drift');
    return failures;
  });
})();