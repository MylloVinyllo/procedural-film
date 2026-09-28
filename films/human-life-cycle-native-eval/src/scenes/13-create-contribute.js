/*
Shot 13 · Contribution · T 21.5–24
Layers: paper/sage stripes, primary maker, shared object, second person, action overlays.
*/
(function(){'use strict';const ID='create-contribute';

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
  L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeSage],offset:info.T*8,seed:seed+1});
  const build=L.clamp((t-.15)/1.05),join=L.clamp((t-1.0)/.8);
  person(ctx,L,P,360,1380,.80,{seed:seed+20,fill:P.selfWarm,deep:P.selfDeep,arm:.5*build,hatch:true});
  person(ctx,L,P,740,1390,.76,{seed:seed+50,fill:P.socialBlue,deep:P.socialDeep,arm:-.55*join});
  const y=1080,x0=460,x1=620;
  L.inkLine(ctx,390,1190,690,1190,{width:4,color:P.wood,seed:seed+80,taper:0});
  const w=180*build;
  if(w>2)L.inkPath(ctx,[[x0,y],[x0+w*.55,y-90*build],[x0+w,y]],{width:7,color:P.cycleGold,seed:seed+90,taper:[0,18]});
  if(join>0)L.inkPath(ctx,[[x1,y],[x1+120*join,y-70*join]],{width:6,color:P.socialBlue,seed:seed+91,taper:[0,18]});
  L.arcAnnotation(ctx,540,1080,125,-2.5,-.5,{p:build,color:P.annBlue,width:3,alpha:.85});
  if(join>0)L.bracket(ctx,455,950,690,950,{color:P.annYellow,alpha:.75*join});
  if(t>2.0){const q=L.clamp((t-2.0)/.45);L.inkPath(ctx,[[470,1000],[540,920],[610,1000]],{width:3,color:P.memoryViolet,alpha:.75*q,seed:seed+130,taper:0});}
}});})();