(function(){
  'use strict';
  const V=FILM.visual,A=FILM.vectorAssets.protagonist,P=FILM.lib.pal;
  const C={skin:P.skin,skinShadow:P.skinShadow,shirt:P.machineDeep,shirtDeep:P.nightSky,ink:P.ink,hair:P.hair,tee:P.tee};
  const cache=Object.create(null),path=k=>cache[k]||(cache[k]=new Path2D(A[k]));

  function local(o,p){const r=o.root||[0,0],s=o.scale!=null?o.scale:1;return [(p[0]-r[0])/s,(p[1]-r[1])/s];}
  function setup(ctx,o,fn){const r=o.root||[0,0],s=o.scale!=null?o.scale:1;ctx.save();ctx.translate(r[0],r[1]);ctx.scale(s,s);fn();ctx.restore();}
  function rig(o){
    const shoulders=[[-78,-113],[78,-113]],out={};
    if(o.leftWrist)out.left=V.solve2Bone(shoulders[0],local(o,o.leftWrist),132,126,-1);
    if(o.rightWrist)out.right=V.solve2Bone(shoulders[1],local(o,o.rightWrist),132,126,1);
    return out;
  }
  function part(ctx,k,fill,stroke=C.ink,w=2){
    ctx.fillStyle=fill;ctx.fill(path(k));if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke(path(k));}
  }
  function bonePart(ctx,k,a,b,fill){
    const dx=b[0]-a[0],dy=b[1]-a[1],ang=Math.atan2(dy,dx),len=Math.hypot(dx,dy),nominal=k==='upperArm'?132:126;
    ctx.save();ctx.translate(a[0],a[1]);ctx.rotate(ang);ctx.scale(len/nominal,1);part(ctx,k,fill,C.ink,1.8);ctx.restore();
  }
  function hand(ctx,p,rot,type){
    ctx.save();ctx.translate(...p);ctx.rotate(rot);part(ctx,type==='press'?'handPress':'handEdge',C.skin,C.ink,1.6);
    // authored knuckle accents, deliberately absent from primitive backend
    ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.2;ctx.globalAlpha=.55;
    for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(43,-17+i*15);ctx.lineTo(51,-15+i*15);ctx.stroke();}
    ctx.restore();
  }
  function drawBody(ctx,o){
    setup(ctx,o,()=>{
      part(ctx,'torso',C.shirt,C.ink,3);part(ctx,'tee',C.tee,null,0);
      // shoulder seam and neck make the torso read as designed clothing rather than a blob
      ctx.strokeStyle=C.shirtDeep;ctx.lineWidth=2;ctx.globalAlpha=.7;ctx.beginPath();ctx.moveTo(-70,-123);ctx.quadraticCurveTo(0,-101,70,-123);ctx.stroke();ctx.globalAlpha=1;
      ctx.fillStyle=C.skin;ctx.beginPath();ctx.roundRect(-22,-188,44,38,12);ctx.fill();
      part(ctx,'head',C.skin,C.ink,3);part(ctx,'hair',C.hair,null,0);
      ctx.fillStyle=C.ink;ctx.beginPath();ctx.ellipse(-19,-257,3.8,4.5,0,0,Math.PI*2);ctx.ellipse(22,-258,3.8,4.5,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=C.ink;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-6,-230);ctx.quadraticCurveTo(-2,-220,5,-226);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-12,-209);ctx.quadraticCurveTo(1,-203,15,-211);ctx.stroke();
    });
  }
  function drawArms(ctx,o){
    const R=rig(o);setup(ctx,o,()=>{
      for(const side of ['left','right']){
        const q=R[side];if(!q)continue;
        bonePart(ctx,'upperArm',q.shoulder,q.elbow,C.shirt);bonePart(ctx,'foreArm',q.elbow,q.wrist,C.skin);
      }
    });
  }
  function drawHands(ctx,o){
    const R=rig(o);setup(ctx,o,()=>{
      if(R.left)hand(ctx,R.left.wrist,Math.atan2(R.left.wrist[1]-R.left.elbow[1],R.left.wrist[0]-R.left.elbow[0]),o.leftHand||'edge');
      if(R.right)hand(ctx,R.right.wrist,Math.atan2(R.right.wrist[1]-R.right.elbow[1],R.right.wrist[0]-R.right.elbow[0]),o.rightHand||'edge');
    });
  }
  function audit(o){
    const R=rig(o);
    return {leftOverreach:R.left?R.left.overreach:0,rightOverreach:R.right?R.right.overreach:0};
  }
  function draw(ctx,o){drawBody(ctx,o);drawArms(ctx,o);drawHands(ctx,o);}
  V.registerCharacter('vector',{draw,drawBody,drawArms,drawHands,audit});
})();