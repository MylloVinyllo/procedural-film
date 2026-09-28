/*
Shot 09 · I among us · T 14.5–16
Layers: paper/sage stripes, clustered group, primary selfWarm hero, group flow and divergence overlays, G3 chest marker.
*/
(function(){'use strict';const ID='one-among-many',G3={x:540,y:820,r:48};

  function person(ctx,L,P,x,y,s,o={}){
    const seed=o.seed||1, fill=o.fill||P.selfWarm, deep=o.deep||P.selfDeep;
    const age=o.age||'adult', lean=o.lean||0, step=o.step||0, arm=o.arm||0;
    const hh=(age==='child'?70:56)*s, hw=hh*.78;
    const torso=(age==='child'?230:340)*s, shoulder=(age==='child'?135:210)*s, hip=shoulder*.68, top=y-torso;
    ctx.save();ctx.translate(x,y);ctx.rotate(lean);
    ctx.fillStyle=fill;ctx.beginPath();ctx.ellipse(0,top-hh*.62,hw,hh,0,0,Math.PI*2);ctx.fill();
    L.inkPath(ctx,L.ellipsePts(0,top-hh*.62,hw,hh,42),{closed:true,width:5*s,color:P.ink,seed:seed+1});
    const body=[[-shoulder/2,top],[-hip/2,-torso*.08],[hip/2,-torso*.08],[shoulder/2,top]];
    L.inkPath(ctx,body,{closed:true,width:5*s,color:P.ink,fill,seed:seed+2,double:{width:.32,offset:4*s}});
    const limb=(a,b,c,d,w,col,sd)=>{ctx.save();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c,d);ctx.stroke();ctx.restore();L.inkLine(ctx,a,b,c,d,{width:3.3*s,color:P.ink,seed:sd});};
    const ay=top+torso*.2;
    limb(-shoulder*.43,ay,-shoulder*(.70+.08*arm),ay+torso*(.34+.1*arm),38*s,fill,seed+3);
    limb( shoulder*.43,ay, shoulder*(.72+.12*arm),ay+torso*(.28-.16*arm),38*s,fill,seed+4);
    limb(-hip*.26,-torso*.06,-hip*(.42+.12*step),torso*.44,44*s,fill,seed+5);
    limb( hip*.26,-torso*.06, hip*(.42-.12*step),torso*(.44-.08*step),44*s,fill,seed+6);
    if(o.hatch){ctx.save();ctx.globalAlpha=.48;for(let k=0;k<8;k++)L.inkLine(ctx,-shoulder*.28+k*shoulder*.07,top+45*s,-shoulder*.05+k*shoulder*.06,top+110*s,{width:1.2*s,color:deep,seed:seed+30+k});ctx.restore();}
    ctx.restore();
  }

FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),tw=L.onTwos(t),seed=L.hash(ID);
  L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeSage],offset:info.T*10,seed:seed+1});
  const g=Math.sin(tw*6)*.12;
  const crowd=[
    [180,1400,.55,-.3],[330,1370,.62,.15],[745,1370,.60,-.18],[900,1410,.52,.25],
    [240,1060,.42,.1],[840,1060,.42,-.1]
  ];
  crowd.forEach((v,i)=>person(ctx,L,P,v[0],v[1],v[2],{seed:seed+20+i*10,fill:P.socialBlue,deep:P.socialDeep,step:g+v[3],arm:-g*.4}));
  const div=t<.85?g:(t<1.25?-.5:.05);
  person(ctx,L,P,540,1390,.92,{seed:seed+120,fill:P.selfWarm,deep:P.selfDeep,step:div,arm:.2-div*.4,hatch:true});
  const flowP=L.clamp((t-.15)/.8);
  [[160,1260,460,1160],[600,1160,920,1260]].forEach((a,i)=>L.inkPath(ctx,[[a[0],a[1]],[(a[0]+a[2])/2,a[1]-90],[a[2],a[3]]],{width:2.5,color:P.annBlue,alpha:.55*flowP,seed:seed+200+i,taper:[0,18]}));
  const ring=L.clamp((t-.92)/.28);if(ring>0&&ring<1)L.arcAnnotation(ctx,540,980,130+60*ring,0,Math.PI*2,{color:P.annYellow,width:3,alpha:1-ring,endTicks:0});
  ctx.save();ctx.globalAlpha=.92;L.inkCircle(ctx,G3.x,G3.y,G3.r*.24,{width:2.5,color:P.cycleGold,fill:P.cycleGold,seed:seed+240});ctx.restore();
  if(t>1.15){const q=L.clamp((t-1.15)/.35);L.arcAnnotation(ctx,G3.x,G3.y,G3.r,0,Math.PI*2,{p:q,color:P.cycleGold,width:3,alpha:.9,endTicks:0});}
}});})();