(function(){
  'use strict';
  const V=FILM.visual;
  const skin='#d5a27e',skinShadow='#bd8261',shirt='#6f7882',shirtDeep='#535b64',ink='#26282c',hair='#24272b',tee='#ece7dc';

  function limb(ctx,a,b,w0,w1,fill){
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len;
    const pts=[[a[0]+nx*w0/2,a[1]+ny*w0/2],[b[0]+nx*w1/2,b[1]+ny*w1/2],[b[0]-nx*w1/2,b[1]-ny*w1/2],[a[0]-nx*w0/2,a[1]-ny*w0/2]];
    ctx.beginPath();ctx.moveTo(...pts[0]);ctx.quadraticCurveTo((pts[0][0]+pts[1][0])/2+nx*4,(pts[0][1]+pts[1][1])/2+ny*4,...pts[1]);ctx.lineTo(...pts[2]);ctx.quadraticCurveTo((pts[2][0]+pts[3][0])/2-nx*3,(pts[2][1]+pts[3][1])/2-ny*3,...pts[3]);ctx.closePath();
    ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=2.3;ctx.stroke();
  }
  function hand(ctx,p,rot,type){
    ctx.save();ctx.translate(...p);ctx.rotate(rot||0);
    ctx.fillStyle=skin;ctx.strokeStyle=ink;ctx.lineWidth=2;
    ctx.beginPath();
    if(type==='press'){
      ctx.moveTo(-12,-22);ctx.bezierCurveTo(8,-34,36,-29,48,-10);ctx.bezierCurveTo(58,6,50,24,34,31);ctx.bezierCurveTo(12,39,-9,28,-15,9);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.roundRect(28,-23,80,17,8);ctx.fill();ctx.stroke();
    }else{
      ctx.moveTo(-10,-25);ctx.bezierCurveTo(12,-36,39,-30,53,-11);ctx.bezierCurveTo(64,4,58,21,42,30);ctx.bezierCurveTo(22,40,-4,31,-14,13);ctx.closePath();ctx.fill();ctx.stroke();
      for(let i=0;i<3;i++){ctx.beginPath();ctx.roundRect(35,-22+i*18,58,12,6);ctx.fill();ctx.stroke();}
    }
    ctx.restore();
  }
  function draw(ctx,o={}){
    const root=o.root||[0,0],s=o.scale!=null?o.scale:1,left=o.leftWrist,right=o.rightWrist;
    ctx.save();ctx.translate(root[0],root[1]);ctx.scale(s,s);
    // torso first
    ctx.fillStyle=shirt;ctx.strokeStyle=ink;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-90,-130);ctx.bezierCurveTo(-55,-165,55,-165,92,-130);ctx.bezierCurveTo(118,-54,108,100,82,160);ctx.lineTo(-82,160);ctx.bezierCurveTo(-110,82,-115,-58,-90,-130);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle=shirtDeep;ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(20,-148);ctx.lineTo(92,-130);ctx.bezierCurveTo(118,-54,108,100,82,160);ctx.lineTo(30,160);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
    ctx.fillStyle=tee;ctx.beginPath();ctx.roundRect(-45,-150,90,92,24);ctx.fill();
    // head
    ctx.fillStyle=skin;ctx.strokeStyle=ink;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,-258,61,83,-.06,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle=hair;ctx.beginPath();ctx.arc(-4,-295,62,Math.PI,Math.PI*2);ctx.bezierCurveTo(48,-302,31,-281,14,-293);ctx.bezierCurveTo(-6,-278,-29,-294,-56,-278);ctx.closePath();ctx.fill();
    ctx.fillStyle=ink;ctx.beginPath();ctx.arc(-20,-257,4,0,Math.PI*2);ctx.arc(22,-258,4,0,Math.PI*2);ctx.fill();
    // arms solve from real target anchors in world space, converted into character local coordinates
    const toLocal=p=>[(p[0]-root[0])/s,(p[1]-root[1])/s];
    const shoulders=[[-78,-113],[78,-113]];
    if(left){
      const target=toLocal(left),ik=V.solve2Bone(shoulders[0],target,132,122,-1);
      limb(ctx,ik.shoulder,ik.elbow,58,44,shirt);limb(ctx,ik.elbow,ik.wrist,43,27,skin);
      hand(ctx,ik.wrist,Math.atan2(ik.wrist[1]-ik.elbow[1],ik.wrist[0]-ik.elbow[0]),o.leftHand||'edge');
    }
    if(right){
      const target=toLocal(right),ik=V.solve2Bone(shoulders[1],target,132,122,1);
      limb(ctx,ik.shoulder,ik.elbow,58,44,shirt);limb(ctx,ik.elbow,ik.wrist,43,27,skin);
      hand(ctx,ik.wrist,Math.atan2(ik.wrist[1]-ik.elbow[1],ik.wrist[0]-ik.elbow[0]),o.rightHand||'edge');
    }
    ctx.restore();
  }
  V.registerCharacter('pure',{draw});
})();