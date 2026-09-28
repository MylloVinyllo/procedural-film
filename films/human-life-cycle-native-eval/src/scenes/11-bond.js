/*
Shot 11 · Relation · T 18–20
Layers: paper/sage stripes, two main figures, reciprocal hand gesture, trajectory arcs.
*/
(function(){'use strict';const ID='bond';

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
  L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeSage],offset:info.T*8,seed:seed+1});
  const send=L.clamp((t-.4)/.45),back=L.clamp((t-.95)/.45);
  person(ctx,L,P,370,1390,.82,{seed:seed+20,fill:P.selfWarm,deep:P.selfDeep,arm:.65*send,hatch:true,lean:.015});
  person(ctx,L,P,710,1390,.82,{seed:seed+50,fill:P.socialBlue,deep:P.socialDeep,arm:-.65*Math.max(send,back),lean:-.015});
  const hx1=460,hy1=1050,hx2=620,hy2=1050;
  if(send>0)L.arcAnnotation(ctx,540,1080,115,Math.PI,-.05,{p:send,color:P.annBlue,width:3,alpha:.9,arrow:10});
  if(back>0)L.arcAnnotation(ctx,540,1080,85,.05,Math.PI,{p:back,color:P.annMagenta,width:3,alpha:.85,arrow:10});
  const sync=L.clamp((t-1.45)/.35);if(sync>0){L.arcAnnotation(ctx,540,1080,145,0,Math.PI*2,{p:sync,color:P.cycleGold,width:3,alpha:.7,endTicks:0});}
  ctx.save();ctx.globalAlpha=.17;person(ctx,L,P,890,1310,.45,{seed:seed+90,fill:P.socialBlue,deep:P.socialDeep});ctx.restore();
  L.inkLine(ctx,hx1,hy1,hx2,hy2,{width:2,color:P.cycleGold,alpha:.22+sync*.55,seed:seed+100,taper:0});
}});})();