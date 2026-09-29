(function(){
  'use strict';
  const V=FILM.visual;
  const rec=V.prop('vinyl-record'),washer=V.product('myllo-rcm');
  const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);

  function gripRecord(record,characterScale,leftA=Math.PI*.92,rightA=Math.PI*.08){
    const ra=rec.anchors(record),leftContact=ra.edge(leftA),rightContact=ra.edge(rightA);
    const leftRot=leftA+Math.PI+.16,rightRot=rightA+Math.PI-.16;
    return {
      contacts:{left:leftContact,right:rightContact},
      leftWrist:V.wristForHandContact('edge',leftContact,leftRot,characterScale,true),
      rightWrist:V.wristForHandContact('edge',rightContact,rightRot,characterScale,false),
      leftRot,rightRot,leftFlip:true,rightFlip:false
    };
  }

  function sampleHold(t,panelX){
    const u=V.sstep(0,1,t),machine={x:panelX+270,y:1050,scale:.78,showRecord:false,clampVisible:false};
    const record={x:panelX+270,y:870,rx:96,ry:96,rot:0},scale=1.02,g=gripRecord(record,scale,Math.PI*.90,Math.PI*.10);
    return {
      machine,record,contacts:g.contacts,contactActive:true,
      character:{
        root:[panelX+270,770],scale,pose:V.samplePose('hold-record',u),
        leftWrist:g.leftWrist,rightWrist:g.rightWrist,leftArmLayer:'front',rightArmLayer:'front',
        leftHand:'edge',rightHand:'edge',leftHandRot:g.leftRot,rightHandRot:g.rightRot,leftHandFlip:g.leftFlip,rightHandFlip:g.rightFlip
      }
    };
  }

  function samplePlace(t,panelX){
    const u=V.clamp(t),m=V.sampleMotion('place-object',u),machine={x:panelX+270,y:1050,scale:.78,showRecord:false,clampVisible:false};
    const ma=washer.anchors(machine),start=[panelX+270,830],end=ma.recordCenter,[endRx,endRy]=ma.recordRadii;

    const record={
      x:V.lerp(start[0],end[0],m.travel),
      y:V.lerp(start[1],end[1],m.travel)-m.arcLift,
      rx:V.lerp(108,endRx,m.travel),ry:V.lerp(108,endRy,m.travel),rot:V.lerp(-.06,0,m.travel)
    };
    if(m.seat>.01){
      // tiny settle into the spindle plane, with no geometric overshoot below the product.
      record.y=end[1]-V.lerp(8,0,m.seat);
      record.rx=V.lerp(record.rx,endRx,m.seat);record.ry=V.lerp(record.ry,endRy,m.seat);
    }

    // The actor follows the object with a small body-weight shift. Geometry stays subtle;
    // contact is still solved from authored anchors, not from this staging offset.
    const rootY=V.lerp(760,854,m.travel)+m.anticipation*3-m.seat*2;
    const rootX=panelX+270-V.lerp(0,5,m.travel)+V.lerp(0,3,m.retract);
    const scale=V.lerp(1.02,1.05,m.travel),g=gripRecord(record,scale);
    // After seating, hands must peel away from the record and clear its silhouette.
    // Targets are intentionally outside the disc bounds so release reads as release,
    // not as a crossed-arm freeze over the product.
    const restL=[panelX+105,rootY+48],restR=[panelX+435,rootY+48];
    const leftWrist=[V.lerp(g.leftWrist[0],restL[0],m.retract),V.lerp(g.leftWrist[1],restL[1],m.retract)];
    const rightWrist=[V.lerp(g.rightWrist[0],restR[0],m.retract),V.lerp(g.rightWrist[1],restR[1],m.retract)];
    const open=m.release>.52;
    // After release the torso also relaxes partway out of the deep placement pose.
    const poseAmount=V.clamp(m.travel-m.retract*.45);

    return {
      machine,record,contacts:g.contacts,contactActive:m.contactActive,motion:m,
      character:{
        root:[rootX,rootY],scale,pose:V.samplePose('place-record',poseAmount),
        leftWrist,rightWrist,leftArmLayer:'front',rightArmLayer:'front',
        leftBend:open?1:-1,rightBend:open?-1:1,
        leftHand:open?'open':'edge',rightHand:open?'open':'edge',
        leftHandRot:open?-.45:g.leftRot,rightHandRot:open?Math.PI+.45:g.rightRot,
        leftHandFlip:true,rightHandFlip:false
      }
    };
  }

  function samplePress(t,panelX){
    const u=V.clamp(t),m=V.sampleMotion('press-control',u);
    const machine={x:panelX+270,y:1050,scale:.78,showRecord:false,clampVisible:true,active:m.contactActive?'PUMP':null},ma=washer.anchors(machine);
    const record={x:ma.recordCenter[0],y:ma.recordCenter[1],rx:ma.recordRadii[0],ry:ma.recordRadii[1],rot:0};

    // Body follows the control reach and settles back on release. This prevents the arm
    // from doing all motion while the torso stays frozen like a mannequin.
    const poseAmount=m.release>0?1-m.release:m.reach;
    const root=[panelX+25+V.lerp(0,8,m.reach)-V.lerp(0,5,m.release),1120+V.lerp(0,3,m.depress)],scale=1.04,pressRot=.16;
    const rest=[panelX+330,1142],pre=[panelX+308,1148],target=ma.pumpButton;
    const approachStart=[
      V.lerp(rest[0],pre[0],m.anticipation),
      V.lerp(rest[1],pre[1],m.anticipation)
    ];
    const reached=[
      V.lerp(approachStart[0],target[0],m.reach),
      V.lerp(approachStart[1],target[1],m.reach)
    ];
    const pressContact=[
      V.lerp(reached[0],rest[0],m.release),
      V.lerp(reached[1],rest[1],m.release)
    ];
    const right=V.wristForHandContact('press',pressContact,pressRot,scale);

    const leftContact=ma.frontLeftRest,leftRot=-.05,left=V.wristForHandContact('rest',leftContact,leftRot,scale,true);
    return {
      machine,record,contacts:{left:leftContact,right:pressContact,rightTarget:target},contactActive:m.contactActive,motion:m,
      character:{
        root,scale,pose:V.samplePose('press-control',poseAmount),
        leftWrist:left,rightWrist:right,leftArmLayer:'front',rightArmLayer:'front',leftBend:1,rightBend:1,
        leftHand:'rest',rightHand:'press',leftHandRot:leftRot,rightHandRot:pressRot,leftHandFlip:true,rightHandFlip:false
      }
    };
  }

  V.registerAction('hold-record',{sample:sampleHold});
  V.registerAction('place-record',{sample:samplePlace});
  V.registerAction('press-pump',{sample:samplePress});

  function checkHandContact(backendName,s,label,failures){
    const backend=V.character(backendName),q=backend.audit(s.character);
    if(Math.max(q.leftOverreach,q.rightOverreach)>.75)failures.push(backendName+' '+label+' overreach '+Math.max(q.leftOverreach,q.rightOverreach).toFixed(1)+'px');
    if(!s.contactActive)return;
    const lc=V.handContactWorld(s.character.leftHand,s.character.leftWrist,s.character.leftHandRot,s.character.scale,!!s.character.leftHandFlip);
    const rc=V.handContactWorld(s.character.rightHand,s.character.rightWrist,s.character.rightHandRot,s.character.scale,!!s.character.rightHandFlip);
    if(dist(lc,s.contacts.left)>1)failures.push(backendName+' '+label+' left contact drift');
    if(dist(rc,s.contacts.right)>1)failures.push(backendName+' '+label+' right contact drift');
  }

  V.registerContract('interaction-reach-and-contact',()=>{
    const failures=[];
    for(const backendName of ['pure','vector']){
      checkHandContact(backendName,sampleHold(1,0),'hold',failures);
      for(let i=0;i<=40;i++)checkHandContact(backendName,samplePlace(i/40,0),'place@'+(i/40).toFixed(2),failures);
      for(let i=0;i<=40;i++)checkHandContact(backendName,samplePress(i/40,0),'press@'+(i/40).toFixed(2),failures);
      const p=samplePress(.62,0),target=washer.anchors(p.machine).pumpButton;
      if(dist(p.contacts.right,target)>1.5)failures.push(backendName+' press peak misses pump anchor');
    }
    return failures;
  });

  V.registerContract('record-seat-projection',()=>{
    const failures=[],end=samplePlace(1,0),ma=washer.anchors(end.machine);
    if(dist([end.record.x,end.record.y],ma.recordCenter)>1)failures.push('placed record center misses washer spindle');
    if(Math.abs(end.record.rx-ma.recordRadii[0])>1||Math.abs(end.record.ry-ma.recordRadii[1])>1)failures.push('placed record projection does not match washer plane');
    const p=samplePress(.62,0),pm=washer.anchors(p.machine);
    if(dist([p.record.x,p.record.y],pm.recordCenter)>1)failures.push('press state moved seated record off spindle');
    return failures;
  });

  V.registerContract('press-pose-phasing',()=>{
    const failures=[],start=samplePress(0,0),peak=samplePress(.64,0),end=samplePress(1,0);
    const a=Math.abs(start.character.pose.bodyRot),b=Math.abs(peak.character.pose.bodyRot),c=Math.abs(end.character.pose.bodyRot);
    if(!(b>a+.01))failures.push('press pose did not increase during reach');
    if(!(c<b-.01))failures.push('press pose did not relax after release');
    if(Math.abs(end.character.root[0]-start.character.root[0])>6)failures.push('press body failed to settle near start x');
    return failures;
  });

  V.registerContract('place-release-physics',()=>{
    const failures=[],near=samplePlace(.74,0),end=samplePlace(1,0),a=rec.anchors(end.record);
    if(!near.contactActive)failures.push('place grip released before seating');
    if(end.contactActive)failures.push('place grip remained active after retract');
    if(end.character.leftHand!=='open'||end.character.rightHand!=='open')failures.push('place release did not enter open-hand state');
    if(end.character.leftWrist[0]>=end.record.x-end.record.rx*.72)failures.push('released left wrist did not clear record silhouette');
    if(end.character.rightWrist[0]<=end.record.x+end.record.rx*.72)failures.push('released right wrist did not clear record silhouette');
    if(end.character.leftWrist[0]>=end.character.rightWrist[0])failures.push('released wrists crossed');
    if(end.character.leftWrist[1]>end.record.y+35||end.character.rightWrist[1]>end.record.y+35)failures.push('released wrists sagged back onto machine plane');
    return failures;
  });
})();