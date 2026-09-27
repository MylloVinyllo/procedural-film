(function(){
  'use strict';
  const V=FILM.visual;
  const C={skin:'#d5a27e',skinShadow:'#bd8261',shirt:'#6f7882',shirtDeep:'#535b64',ink:'#26282c',hair:'#24272b',tee:'#ece7dc'};

  function local(o,p){const r=o.root||[0,0],s=o.scale!=null?o.scale:1;return [(p[0]-r[0])/s,(p[1]-r[1])/s];}
  function setup(ctx,o,fn){const r=o.root||[0,0],s=o.scale!=null?o.scale:1;ctx.save();ctx.translate(r[0],r[1]);ctx.scale(s,s);fn();ctx.restore();}
  function rig(o){
    const shoulders=[[-78,-113],[78,-113]],out={};
    if(o.leftWrist)out.left=V.solve2Bone(shoulders[0],local(o,o.leftWrist),132,122,-1);
    if(o.rightWrist)out.right=V.solve2Bone(shoulders[1],local(o,o.rightWrist),132,122,1);
    return out;
  }
  function limb(ctx,a,b,w0,w1,fill){
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len;
    const p0=[a[0]+nx*w0/2,a[1]+ny*w0/2],p1=[b[0]+nx*w1/2,b[1]+ny*w1/2],p2=[b[0]-nx*w1/2,b[1]-ny*w1/2],p3=[a[0]-nx*w0/2,a[1]-ny*w0/2];
    ctx.beginPath();ctx.moveTo(...p0);ctx.quadraticCurveTo((p0[0]+p1[0])/2+nx*4,(p0[1]+p1[1])/2+ny*4,...p1);ctx.quadraticCurveTo(b[0]+dx/len*3,b[1]+dy/len*3,...p2);ctx.quadraticCurveTo((p2[0]+p3[0])/2-nx*3,(p2[1]+p3[1])/2-ny*3,...p3);ctx.closePath();
    ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=C.ink;ctx.lineWidth=2.2;ctx.stroke();
  }
  function hand(ctx,p,rot,type){
    ctx.save();ctx.translate(...p);ctx.rotate(rot||0);ctx.fillStyle=C.skin;ctx.strokeStyle=C.ink;ctx.lineWidth=1.8;
    ctx.beginPath();
    if(type==='press'){
      ctx.moveTo(-12,-20);ctx.bezierCurveTo(8,-32,34,-28,47,-9);ctx.bezierCurveTo(56,5,49,23,34,30);ctx.bezierCurveTo(12,38,-8,27,-14,10);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.roundRect(26,-22,78,15,7);ctx.fill();ctx.stroke();
    }else{
      ctx.moveTo(-10,-23);ctx.bezierCurveTo(12,-34,37,-29,51,-10);ctx.bezierCurveTo(61,4,55,20,41,28);ctx.bezierCurveTo(21,37,-3,29,-13,12);ctx.closePath();ctx.fill();ctx.stroke();
      for(let i=0;i<3;i++){ctx.beginPath();ctx.roundRect(34,-21+i*16,55,11,5.5);ctx.fill();ctx.stroke();}
    }
    ctx.restore();
  }
  function drawBody(ctx,o){
    setup(ctx,o,()=>{
      ctx.fillStyle=C.shirt;ctx.strokeStyle=C.ink;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-90,-130);ctx.bezierCurveTo(-55,-165,55,-165,92,-130);ctx.bezierCurveTo(118,-54,108,100,82,160);ctx.lineTo(-82,160);ctx.bezierCurveTo(-110,82,-115,-58,-90,-130);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle=C.shirtDeep;ctx.globalAlpha=.5;ctx.beginPath();ctx.moveTo(20,-148);ctx.lineTo(92,-130);ctx.bezierCurveTo(118,-54,108,100,82,160);ctx.lineTo(30,160);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
      ctx.fillStyle=C.tee;ctx.beginPath();ctx.roundRect(-44,-149,88,86,22);ctx.fill();
      ctx.fillStyle=C.skin;ctx.strokeStyle=C.ink;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,-258,61,83,-.06,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=C.hair;ctx.beginPath();ctx.arc(-4,-295,62,Math.PI,Math.PI*2);ctx.bezierCurveTo(48,-302,31,-281,14,-293);ctx.bezierCurveTo(-6,-278,-29,-294,-56,-278);ctx.closePath();ctx.fill();
      ctx.fillStyle=C.ink;ctx.beginPath();ctx.arc(-20,-257,4,0,Math.PI*2);ctx.arc(22,-258,4,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=C.ink;ctx.lineWidth=1.7;ctx.beginPath();ctx.moveTo(-9,-218);ctx.quadraticCurveTo(2,-212,14,-218);ctx.stroke();
    });
  }
  function drawArms(ctx,o){
    const R=rig(o);setup(ctx,o,()=>{
      for(const side of ['left','right']){
        const q=R[side];if(!q)continue;
        limb(ctx,q.shoulder,q.elbow,58,43,C.shirt);limb(ctx,q.elbow,q.wrist,42,25,C.skin);
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
  V.registerCharacter('pure',{draw,drawBody,drawArms,drawHands,audit});
})();