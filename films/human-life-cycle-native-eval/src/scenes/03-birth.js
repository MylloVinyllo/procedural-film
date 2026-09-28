/*
Shot 03 · Arrival · T 4–5.5
Layers: warm paper, enclosing curve, newborn form, breath/hand overlays.
*/
(function(){'use strict';
  const ID='birth';
  function newborn(ctx,L,P,x,y,s,sd,p){
    const fill=P.selfPale;
    ctx.save();ctx.translate(x,y);ctx.rotate(-.34);
    L.inkCircle(ctx,-80*s,-100*s,78*s,{ry:92*s,width:5*s,color:P.ink,fill,seed:sd+1});
    const torso=[[-18*s,-55*s],[115*s,-20*s],[165*s,78*s],[72*s,126*s],[-22*s,62*s]];
    L.inkPath(ctx,torso,{closed:true,width:5*s,color:P.ink,fill:P.selfWarm,seed:sd+2,double:true});
    const k=L.onTwos(p)*.8;
    L.inkLine(ctx,60*s,10*s,125*s+8*k,45*s-5*k,{width:18*s,color:P.selfWarm,seed:sd+3});
    L.inkLine(ctx,65*s,78*s,145*s,115*s,{width:20*s,color:P.selfWarm,seed:sd+4});
    ctx.restore();
  }
  FILM.scene({id:ID,draw(ctx,tIn,info){
    const L=info.lib,P=L.pal,E=L.ease,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
    L.paper(ctx); L.stripes(ctx,{colors:[P.stripeCream,P.stripeApricot],offset:info.T*9,seed:seed+1});
    const open=L.clamp((t-.15)/1.1);
    const left=[],right=[];for(let i=0;i<=28;i++){const u=i/28,y=410+950*u,dx=(260+160*Math.sin(u*Math.PI))*E.outExpo(open);left.push([540-dx,y]);right.push([540+dx,y]);}
    L.inkPath(ctx,left,{width:5,color:P.birthRose,seed:seed+10});L.inkPath(ctx,right,{width:5,color:P.birthRose,seed:seed+11});
    newborn(ctx,L,P,500,930,1.05,seed+40,t);
    const breath=L.clamp((t-.45)/.45);
    if(breath>0)L.arcAnnotation(ctx,555,920,110+65*breath,Math.PI*.12,Math.PI*1.88,{color:P.annYellow,width:3,alpha:1-breath*.7,endTicks:0});
    const hand=L.clamp((t-.95)/.35);
    if(hand>0)L.arcAnnotation(ctx,665,965,42,-.8,.9,{p:hand,color:P.annBlue,width:3,alpha:.9});
    if(t>1.25){const q=L.clamp((t-1.25)/.25);L.inkLine(ctx,360,1300,360+150*q,1300,{width:3,color:P.annBlue,seed:seed+90,taper:0});}
  }});
})();