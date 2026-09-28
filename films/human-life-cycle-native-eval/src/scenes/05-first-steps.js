/*
Shot 05 · A path · T 8–10
Layers: paper/sky stripes, trajectory, child, step arcs, G2 settle.
*/
(function(){'use strict';
  const ID='first-steps',G2={x:540,y:720,rx:72,ry:92};
  
  function person(ctx,L,P,x,y,s,o={}){
    const seed=o.seed||1, fill=o.fill||P.selfWarm, deep=o.deep||P.selfDeep;
    const age=o.age||'adult', lean=o.lean||0, step=o.step||0, arm=o.arm||0;
    const hh=(age==='infant'?86:age==='child'?70:56)*s;
    const hw=hh*0.78;
    const torso=(age==='infant'?145:age==='child'?230:340)*s;
    const shoulder=(age==='infant'?95:age==='child'?135:210)*s;
    const hip=shoulder*0.68;
    const top=y-torso;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(lean);
    ctx.fillStyle=fill;
    ctx.beginPath(); ctx.ellipse(0,top-hh*0.62,hw,hh,0,0,Math.PI*2); ctx.fill();
    L.inkPath(ctx,L.ellipsePts(0,top-hh*0.62,hw,hh,42),{closed:true,width:5*s,color:P.ink,seed:seed+1});
    const body=[[-shoulder/2,top],[-hip/2,-torso*0.08],[hip/2,-torso*0.08],[shoulder/2,top]];
    L.inkPath(ctx,body,{closed:true,width:5*s,color:P.ink,fill,seed:seed+2,double:{width:.32,offset:4*s}});
    const limb=(a,b,c,d,w,col,sd)=>{ctx.save();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c,d);ctx.stroke();ctx.restore();L.inkLine(ctx,a,b,c,d,{width:3.4*s,color:P.ink,seed:sd});};
    const ay=top+torso*.2;
    limb(-shoulder*.43,ay,-shoulder*.70,ay+torso*(.34+arm*.12),38*s,fill,seed+3);
    limb( shoulder*.43,ay, shoulder*(.72+.12*arm),ay+torso*(.28-.16*arm),38*s,fill,seed+4);
    limb(-hip*.26,-torso*.06,-hip*(.42+.12*step),torso*.44,44*s,fill,seed+5);
    limb( hip*.26,-torso*.06, hip*(.42-.12*step),torso*(.44-.08*step),44*s,fill,seed+6);
    if(o.hatch){
      ctx.save();ctx.globalAlpha=.55;
      for(let k=0;k<8;k++) L.inkLine(ctx,-shoulder*.28+k*shoulder*.07,top+45*s,-shoulder*.05+k*shoulder*.06,top+110*s,{width:1.2*s,color:deep,seed:seed+30+k});
      ctx.restore();
    }
    ctx.restore();
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const L=info.lib,P=L.pal,E=L.ease,t=L.clamp(tIn,0,info.dur),tw=L.onTwos(t),seed=L.hash(ID);
    L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeSky],offset:info.T*11,seed:seed+1});
    const p=L.clamp(t/1.65),x=300+240*E.inOutCubic(p),step=t<.5?-.35:t<1?.35:t<1.5?-.18:0;
    const pts=[];for(let i=0;i<=36;i++){const u=i/36;if(u>p)break;pts.push([220+620*u,1320-420*u+75*Math.sin(u*Math.PI)]);}
    if(pts.length>1)L.inkPath(ctx,pts,{width:3,color:P.selfWarm,seed:seed+20,taper:[0,24]});
    person(ctx,L,P,x,1370,.72,{seed:seed+40,age:'child',fill:P.selfWarm,deep:P.selfDeep,step,arm:-step*.7,lean:step*.035,hatch:true});
    [0.5,1.0].forEach((a,i)=>{const q=L.clamp((t-a)/.32);if(q>0&&q<1)L.arcAnnotation(ctx,x+(i?20:-20),1340,80+55*q,Math.PI*.1,Math.PI*.9,{color:P.annBlue,width:3,alpha:1-q,endTicks:0});});
    const bal=L.clamp((t-1.5)/.35);if(bal>0)L.arcAnnotation(ctx,x,850,145,-.9,.9,{p:bal,color:P.annYellow,width:3,alpha:.85});
    if(t>1.72){const q=L.clamp((t-1.72)/.28);L.arcAnnotation(ctx,G2.x,G2.y,G2.ry,0,Math.PI*2,{p:q,color:P.annYellow,width:2.5,alpha:.5,endTicks:0});}
  }});
})();