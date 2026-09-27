(function(){
  'use strict';
  const V=FILM.visual,A=FILM.vectorAssets.protagonist;
  const C={skin:'#d5a27e',shirt:'#657583',shirtDeep:'#46545f',ink:'#22262a',hair:'#25272b',tee:'#efe9dc'};
  const cache=Object.create(null);
  const path=k=>cache[k]||(cache[k]=new Path2D(A[k]));
  function part(ctx,k,fill,stroke=C.ink,w=2){
    ctx.fillStyle=fill;ctx.fill(path(k));if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.stroke(path(k));}
  }
  function bonePart(ctx,k,a,b,fill){
    const dx=b[0]-a[0],dy=b[1]-a[1],ang=Math.atan2(dy,dx),len=Math.hypot(dx,dy);
    const nominal=k==='upperArm'?132:126;
    ctx.save();ctx.translate(a[0],a[1]);ctx.rotate(ang);ctx.scale(len/nominal,1);part(ctx,k,fill,C.ink,2);ctx.restore();
  }
  function hand(ctx,p,rot,type){
    ctx.save();ctx.translate(...p);ctx.rotate(rot);part(ctx,type==='press'?'handPress':'handEdge',C.skin,C.ink,1.8);ctx.restore();
  }
  function draw(ctx,o={}){
    const root=o.root||[0,0],s=o.scale!=null?o.scale:1,left=o.leftWrist,right=o.rightWrist;
    ctx.save();ctx.translate(root[0],root[1]);ctx.scale(s,s);
    part(ctx,'torso',C.shirt,C.ink,3);part(ctx,'tee',C.tee,null,0);
    // authored head/hair path, same every scene
    part(ctx,'head',C.skin,C.ink,3);part(ctx,'hair',C.hair,null,0);
    ctx.fillStyle=C.ink;ctx.beginPath();ctx.arc(-19,-257,3.7,0,Math.PI*2);ctx.arc(22,-258,3.7,0,Math.PI*2);ctx.fill();
    const toLocal=p=>[(p[0]-root[0])/s,(p[1]-root[1])/s],shoulders=[[-78,-113],[78,-113]];
    if(left){
      const ik=V.solve2Bone(shoulders[0],toLocal(left),132,126,-1);
      bonePart(ctx,'upperArm',ik.shoulder,ik.elbow,C.shirt);bonePart(ctx,'foreArm',ik.elbow,ik.wrist,C.skin);
      hand(ctx,ik.wrist,Math.atan2(ik.wrist[1]-ik.elbow[1],ik.wrist[0]-ik.elbow[0]),o.leftHand||'edge');
    }
    if(right){
      const ik=V.solve2Bone(shoulders[1],toLocal(right),132,126,1);
      bonePart(ctx,'upperArm',ik.shoulder,ik.elbow,C.shirt);bonePart(ctx,'foreArm',ik.elbow,ik.wrist,C.skin);
      hand(ctx,ik.wrist,Math.atan2(ik.wrist[1]-ik.elbow[1],ik.wrist[0]-ik.elbow[0]),o.rightHand||'edge');
    }
    ctx.restore();
  }
  V.registerCharacter('vector',{draw});
})();