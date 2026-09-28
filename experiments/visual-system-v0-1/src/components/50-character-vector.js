(function(){
  'use strict';
  const V=FILM.visual,A=FILM.vectorAssets.protagonist,P=FILM.lib.pal;
  const C={skin:P.skin,skinShadow:P.skinShadow,shirt:P.machineDeep,shirtDeep:P.nightSky,ink:P.ink,hair:P.hair,tee:P.tee};
  const cache=Object.create(null),path=k=>cache[k]||(cache[k]=new Path2D(A[k]));

  function local(o,p){const r=o.root||[0,0],s=o.scale!=null?o.scale:1;return [(p[0]-r[0])/s,(p[1]-r[1])/s];}
  function setup(ctx,o,fn){const r=o.root||[0,0],s=o.scale!=null?o.scale:1;ctx.save();ctx.translate(r[0],r[1]);ctx.scale(s,s);fn();ctx.restore();}
  function rig(o){
    const shoulders=[[-80,-112],[80,-112]],out={};
    if(o.leftWrist)out.left=V.solve2Bone(shoulders[0],local(o,o.leftWrist),136,126,-1);
    if(o.rightWrist)out.right=V.solve2Bone(shoulders[1],local(o,o.rightWrist),136,126,1);
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
    part(ctx,type==='press'?'handPress':'handEdge',C.skin,C.ink,1.7);
    ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.25;ctx.globalAlpha=.58;ctx.lineCap='round';
    if(type==='press'){
      ctx.beginPath();ctx.moveTo(14,-2);ctx.quadraticCurveTo(22,7,33,8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(29,20);ctx.quadraticCurveTo(37,25,43,23);ctx.stroke();
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
  function drawArms(ctx,o){
    const R=rig(o);setup(ctx,o,()=>{
      for(const side of ['left','right']){
        const q=R[side];if(!q)continue;
        joint(ctx,q.shoulder,27,C.shirt,C.ink,1.8);
        bonePart(ctx,'upperArm',q.shoulder,q.elbow,C.shirt);
        joint(ctx,q.elbow,20,C.skin,C.ink,1.4);
        bonePart(ctx,'foreArm',q.elbow,q.wrist,C.skin);
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
  function draw(ctx,o){drawBody(ctx,o);drawArms(ctx,o);drawHands(ctx,o);}
  V.registerCharacter('vector',{draw,drawBody,drawArms,drawHands,audit});
})();