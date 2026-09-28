/*
Shot 15 · Later life · T 25.5–27.5
Layers: paper/apricot stripes, older primary identity, companion, measured step and tally arc.
*/
(function(){'use strict';const ID='ageing-connected';

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
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),tw=L.onTwos(t),seed=L.hash(ID);
  L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeApricot],offset:info.T*6,seed:seed+1});
  const step=t<.7?-.15:t<1.3?.16:0;
  person(ctx,L,P,460,1390,.84,{seed:seed+20,age:'older',fill:P.selfWarm,deep:P.selfDeep,step,arm:.15,hatch:true,lean:.055});
  person(ctx,L,P,710,1400,.68,{seed:seed+50,age:'older',fill:P.socialBlue,deep:P.socialDeep,step:-step*.7,arm:-.15,lean:-.02});
  L.inkLine(ctx,180,1450,900,1450,{width:3,color:P.inkSoft,alpha:.45,seed:seed+80,taper:0});
  const q=L.clamp((t-.4)/1.45);
  L.arcAnnotation(ctx,540,940,175,-2.6,-2.6+4.7*q,{color:P.cycleGold,width:3,alpha:.8,endTicks:10});
  if(t>1.45){const g=L.clamp((t-1.45)/.35);L.arcAnnotation(ctx,590,1080,90,-2.8,-.4,{p:g,color:P.annBlue,width:3,alpha:.8});}
}});})();