(function(){
  'use strict';
  const V=FILM.visual,A=FILM.vectorAssets.protagonist,P=FILM.lib.pal;
  const C={skin:P.skin,skinShadow:P.skinShadow,shirt:P.machineDeep,shirtDeep:P.nightSky,ink:P.ink,hair:P.hair,tee:P.tee};
  const cache=Object.create(null),path=k=>cache[k]||(cache[k]=new Path2D(A[k]));

  function poseState(o){return o.pose||V.samplePose('neutral',1);}
  function local(o,p){
    const r=o.root||[0,0],s=o.scale!=null?o.scale:1,ps=poseState(o),a=-(ps.bodyRot||0);
    const dx=p[0]-r[0],dy=p[1]-r[1],cr=Math.cos(a),sr=Math.sin(a);
    return [(dx*cr-dy*sr)/s,(dx*sr+dy*cr)/s];
  }
  function setup(ctx,o,fn){
    const r=o.root||[0,0],s=o.scale!=null?o.scale:1,ps=poseState(o);
    ctx.save();ctx.translate(r[0],r[1]);ctx.rotate(ps.bodyRot||0);ctx.scale(s,s);fn();ctx.restore();
  }
  function rig(o){
    const ps=poseState(o),base=[[-80,-112],[80,-112]],out={};
    const shoulders=[
      [base[0][0]+(ps.leftShoulder?ps.leftShoulder[0]:0),base[0][1]+(ps.leftShoulder?ps.leftShoulder[1]:0)],
      [base[1][0]+(ps.rightShoulder?ps.rightShoulder[0]:0),base[1][1]+(ps.rightShoulder?ps.rightShoulder[1]:0)]
    ];
    if(o.leftWrist)out.left=V.solve2Bone(shoulders[0],local(o,o.leftWrist),136,126,o.leftBend!=null?o.leftBend:-1);
    if(o.rightWrist)out.right=V.solve2Bone(shoulders[1],local(o,o.rightWrist),136,126,o.rightBend!=null?o.rightBend:1);
    return out;
  }
  function part(ctx,k,fill,stroke=C.ink,w=2){
    ctx.fillStyle=fill;ctx.fill(path(k));
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke(path(k));}
  }
  function joint(ctx,p,r,fill,stroke=C.ink,w=1.6){
    ctx.fillStyle=fill;ctx.beginPath();ctx.arc(p[0],p[1],r,0,Math.PI*2);ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.stroke();}
  }
  function bonePart(ctx,k,a,b,fill){
    const dx=b[0]-a[0],dy=b[1]-a[1],ang=Math.atan2(dy,dx),len=Math.hypot(dx,dy),nominal=k==='upperArm'?136:129;
    ctx.save();ctx.translate(a[0],a[1]);ctx.rotate(ang);ctx.scale(len/nominal,1);part(ctx,k,fill,C.ink,1.8);ctx.restore();
  }
  function hand(ctx,p,rot,type){
    const hs=V.hand(type);ctx.save();ctx.translate(...p);ctx.rotate(rot);ctx.scale(hs.drawScale,hs.drawScale);
    const key=type==='press'?'handPress':type==='rest'?'handRest':type==='open'?'handOpen':'handEdge';
    part(ctx,key,C.skin,C.ink,1.7);
    ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.25;ctx.globalAlpha=.58;ctx.lineCap='round';
    if(type==='press'){
      ctx.beginPath();ctx.moveTo(14,-2);ctx.quadraticCurveTo(22,7,33,8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(29,20);ctx.quadraticCurveTo(37,25,43,23);ctx.stroke();
    }else if(type==='rest'){
      ctx.beginPath();ctx.moveTo(17,4);ctx.quadraticCurveTo(28,10,42,8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(12,19);ctx.quadraticCurveTo(26,26,41,23);ctx.stroke();
    }else if(type==='open'){
      ctx.beginPath();ctx.moveTo(18,3);ctx.quadraticCurveTo(30,10,43,8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(15,20);ctx.quadraticCurveTo(28,27,40,24);ctx.stroke();
    }else{
      ctx.beginPath();ctx.moveTo(34,4);ctx.quadraticCurveTo(44,10,57,9);ctx.stroke();
      ctx.beginPath();ctx.moveTo(31,18);ctx.quadraticCurveTo(41,24,53,22);ctx.stroke();
      ctx.beginPath();ctx.moveTo(26,31);ctx.quadraticCurveTo(36,37,44,34);ctx.stroke();
    }
    ctx.restore();
  }
  function drawBody(ctx,o){
    setup(ctx,o,()=>{
      // neck is behind head but belongs to the body mass.
      ctx.fillStyle=C.skin;ctx.beginPath();ctx.roundRect(-23,-190,46,42,13);ctx.fill();
      part(ctx,'torso',C.shirt,C.ink,3);
      ctx.fillStyle=C.shirtDeep;ctx.globalAlpha=.25;ctx.beginPath();ctx.moveTo(12,-173);ctx.bezierCurveTo(63,-171,92,-150,100,-112);ctx.lineTo(86,151);ctx.bezierCurveTo(56,159,34,161,16,160);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
      part(ctx,'tee',C.tee,null,0);
      ctx.strokeStyle=C.shirtDeep;ctx.lineWidth=2;ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(-72,-119);ctx.quadraticCurveTo(0,-94,73,-119);ctx.stroke();ctx.globalAlpha=1;
      part(ctx,'head',C.skin,C.ink,3);
      part(ctx,'hair',C.hair,null,0);
      ctx.fillStyle=C.ink;ctx.beginPath();ctx.ellipse(-19,-258,3.6,4.3,0,0,Math.PI*2);ctx.ellipse(23,-259,3.6,4.3,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(3,-248);ctx.quadraticCurveTo(-2,-232,5,-226);ctx.stroke();
      ctx.strokeStyle=C.ink;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-12,-208);ctx.quadraticCurveTo(2,-201,16,-210);ctx.stroke();
    });
  }
  function drawArms(ctx,o,layer='all'){
    const R=rig(o);setup(ctx,o,()=>{
      for(const side of ['left','right']){
        const q=R[side];if(!q)continue;
        const armLayer=o[side+'ArmLayer']||'back';
        if(layer!=='all'&&armLayer!==layer)continue;
        // Continuous silhouette, no circular "joint balls". The old elbow disk was
        // visually indistinguishable from a third hand in medium shots.
        bonePart(ctx,'upperArm',q.shoulder,q.elbow,C.shirt);
        bonePart(ctx,'foreArm',q.elbow,q.wrist,C.skin);

        // restrained sleeve cuff at the anatomical transition
        const dx=q.elbow[0]-q.shoulder[0],dy=q.elbow[1]-q.shoulder[1],a=Math.atan2(dy,dx);
        ctx.save();ctx.translate(q.elbow[0],q.elbow[1]);ctx.rotate(a);
        ctx.strokeStyle=C.shirtDeep;ctx.lineWidth=3;ctx.globalAlpha=.72;
        ctx.beginPath();ctx.moveTo(-2,-18);ctx.quadraticCurveTo(5,0,-2,18);ctx.stroke();ctx.restore();

        // one short forearm crease, enough to articulate direction without adding a fake joint
        const fx=q.wrist[0]-q.elbow[0],fy=q.wrist[1]-q.elbow[1],fl=Math.max(1,Math.hypot(fx,fy)),nx=-fy/fl,ny=fx/fl;
        const cx=q.elbow[0]+fx*.18,cy=q.elbow[1]+fy*.18;
        ctx.save();ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.2;ctx.globalAlpha=.48;
        ctx.beginPath();ctx.moveTo(cx-nx*8,cy-ny*8);ctx.quadraticCurveTo(cx+fx/fl*3,cy+fy/fl*3,cx+nx*8,cy+ny*8);ctx.stroke();ctx.restore();
      }
    });
  }
  function drawHands(ctx,o){
    const R=rig(o);setup(ctx,o,()=>{
      if(R.left)hand(ctx,R.left.wrist,o.leftHandRot!=null?o.leftHandRot:Math.atan2(R.left.wrist[1]-R.left.elbow[1],R.left.wrist[0]-R.left.elbow[0]),o.leftHand||'edge');
      if(R.right)hand(ctx,R.right.wrist,o.rightHandRot!=null?o.rightHandRot:Math.atan2(R.right.wrist[1]-R.right.elbow[1],R.right.wrist[0]-R.right.elbow[0]),o.rightHand||'edge');
    });
  }
  function audit(o){
    const R=rig(o);
    return {leftOverreach:R.left?R.left.overreach:0,rightOverreach:R.right?R.right.overreach:0};
  }
  function drawHandState(ctx,o={}){
    const type=o.type||'edge',p=o.at||[0,0],rot=o.rot||0,scale=o.scale!=null?o.scale:1;
    ctx.save();ctx.translate(p[0],p[1]);ctx.scale(scale,scale);hand(ctx,[0,0],rot,type);ctx.restore();
  }
  function draw(ctx,o){drawBody(ctx,o);drawArms(ctx,o);drawHands(ctx,o);}
  V.registerCharacter('vector',{draw,drawBody,drawArms,drawHands,drawHandState,audit});
})();