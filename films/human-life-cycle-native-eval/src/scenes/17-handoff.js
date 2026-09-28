/*
Shot 17 · Continue · T 29–30.5
Layers: spring paper, older + younger figures, G4 point, outgoing/incoming trajectories.
*/
(function(){'use strict';const ID='handoff',G4={x:540,y:920,r:18};

  function person(ctx,L,P,x,y,s,o={}){
    const seed=o.seed||1, fill=o.fill||P.selfWarm, deep=o.deep||P.selfDeep;
    const age=o.age||'adult', lean=o.lean||0, step=o.step||0, arm=o.arm||0;
    const hh=(age==='child'?70:age==='older'?54:56)*s, hw=hh*.78;
    const torso=(age==='child'?230:age==='older'?325:340)*s, shoulder=(age==='child'?135:age==='older'?190:210)*s, hip=shoulder*.68, top=y-torso;
    ctx.save();ctx.translate(x,y);ctx.rotate(lean);
    ctx.fillStyle=fill;ctx.beginPath();ctx.ellipse(0,top-hh*.62,hw,hh,0,0,Math.PI*2);ctx.fill();
    L.inkPath(ctx,L.ellipsePts(0,top-hh*.62,hw,hh,42),{closed:true,width:5*s,color:P.ink,seed:seed+1});
    const body=[[-shoulder/2,top],[-hip/2,-torso*.08],[hip/2,-torso*.08],[shoulder/2,top]];
    L.inkPath(ctx,body,{closed:true,width:5*s,color:P.ink,fill,seed:seed+2,double:{width:.32,offset:4*s}});
    const limb=(a,b,c,d,w,col,sd)=>{ctx.save();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c,d);ctx.stroke();ctx.restore();L.inkLine(ctx,a,b,c,d,{width:3.2*s,color:P.ink,seed:sd});};
    const ay=top+torso*.2;
    limb(-shoulder*.43,ay,-shoulder*(.70+.08*arm),ay+torso*(.34+.1*arm),38*s,fill,seed+3);
    limb( shoulder*.43,ay, shoulder*(.72+.12*arm),ay+torso*(.28-.16*arm),38*s,fill,seed+4);
    limb(-hip*.26,-torso*.06,-hip*(.42+.12*step),torso*.44,44*s,fill,seed+5);
    limb( hip*.26,-torso*.06, hip*(.42-.12*step),torso*(.44-.08*step),44*s,fill,seed+6);
    if(o.hatch){ctx.save();ctx.globalAlpha=.48;for(let k=0;k<8;k++)L.inkLine(ctx,-shoulder*.28+k*shoulder*.07,top+45*s,-shoulder*.05+k*shoulder*.06,top+110*s,{width:1.2*s,color:deep,seed:seed+30+k});ctx.restore();}
    ctx.restore();
  }

FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
  L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeSpring],offset:info.T*7,seed:seed+1});
  const pass=L.clamp((t-.45)/.55),newP=L.clamp((t-.9)/.45);
  person(ctx,L,P,390,1390,.76,{seed:seed+20,age:'older',fill:P.selfWarm,deep:P.selfDeep,arm:.65*pass,hatch:true,lean:.04});
  person(ctx,L,P,690,1400,.68,{seed:seed+50,age:'child',fill:P.selfPale,deep:P.selfDeep,arm:-.75*pass});
  const px=510+60*pass;
  L.glowDot(ctx,px,G4.y,G4.r,{color:P.cycleGold,halo:50,rays:10,alpha:.95});
  L.arcAnnotation(ctx,G4.x,G4.y,90,-2.7,-.45,{p:pass,color:P.cycleGold,width:3,alpha:.9,arrow:10});
  const old=[[210,1320],[330,1200],[420,1080],[500,980]],neu=[[570,980],[660,1100],[760,1220],[860,1320]];
  L.inkPath(ctx,old,{width:3,color:P.selfWarm,alpha:1-newP*.8,seed:seed+80,taper:[0,18]});
  if(newP>0)L.inkPath(ctx,neu.slice(0,Math.max(2,Math.floor(neu.length*newP))),{width:3,color:P.selfWarm,alpha:.95,seed:seed+81,taper:[0,18]});
  if(t>1.15){const q=L.clamp((t-1.15)/.3);L.arcAnnotation(ctx,G4.x,G4.y,G4.r+132*q,0,Math.PI*2,{color:P.cycleGold,width:4,alpha:.75,endTicks:0});}
}});})();