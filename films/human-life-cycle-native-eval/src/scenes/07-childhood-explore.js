/*
Shot 07 · Explore · T 11.5–13.5
Layers: paper sky stripes, child trajectory, child, kite/object, attention arcs.
*/
(function(){'use strict';const ID='childhood-explore';

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
  const L=info.lib,P=L.pal,E=L.ease,t=L.clamp(tIn,0,info.dur),tw=L.onTwos(t),seed=L.hash(ID);
  L.paper(ctx);L.stripes(ctx,{colors:[P.stripeCream,P.stripeSky],offset:info.T*13,seed:seed+1});
  const p=L.clamp(t/1.7),x=300+360*E.inOutCubic(p),y=1370-160*Math.sin(Math.PI*p),step=Math.sin(tw*8)*.45;
  const trail=[];for(let i=0;i<=42;i++){const u=i/42;if(u>p)break;trail.push([250+500*u,1320-420*u+80*Math.sin(u*Math.PI*1.2)]);}
  if(trail.length>1)L.inkPath(ctx,trail,{width:3,color:P.selfWarm,seed:seed+20,taper:[0,22]});
  person(ctx,L,P,x,y,.70,{seed:seed+40,age:'child',fill:P.selfWarm,deep:P.selfDeep,step,arm:.75,hatch:true,lean:-.03});
  const kiteX=760,kiteY=620,rot=.15*Math.sin(tw*3);
  ctx.save();ctx.translate(kiteX,kiteY);ctx.rotate(rot);L.inkPath(ctx,[[0,-70],[58,0],[0,78],[-58,0]],{closed:true,width:4,color:P.ink,fill:P.childSky,seed:seed+70,double:true});ctx.restore();
  const reach=L.clamp((t-.25)/1.1);const handX=x+95,handY=y-260;
  L.inkPath(ctx,[[handX,handY],[540,920],[650,790],[kiteX,kiteY+40]],{width:2.5,color:P.annBlue,alpha:.9,seed:seed+80,taper:[0,18]});
  L.arcAnnotation(ctx,kiteX,kiteY,115,-2.3,-.6,{p:reach,color:P.annYellow,width:3,alpha:.86});
  if(t>1.45){const q=L.clamp((t-1.45)/.5);L.arcAnnotation(ctx,handX,handY,70,-.6,.8,{p:q,color:P.annBlue,width:3,alpha:.8});}
}});})();