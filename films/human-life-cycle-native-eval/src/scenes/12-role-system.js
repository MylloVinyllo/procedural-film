/*
Shot 12 · Roles · T 20–21.5
Layers: blueprint, progress, central self node, three open context rings, sparse nodes and radial bridge.
*/
(function(){'use strict';const ID='role-system';

  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){const a0=-Math.PI/2+i*Math.PI*2/N+gap,a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid),alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID),cx=540,cy=820;
  L.blueprint(ctx);progress(ctx,L,P,11);
  L.glowDot(ctx,cx,cy,10,{color:P.schemSelf,halo:38,rays:12,alpha:.9});
  L.inkCircle(ctx,cx,cy,44,{width:2.5,color:P.schemSelf,seed:seed+1});
  const rings=[120,225,335];
  rings.forEach((r,i)=>{const q=L.clamp((t-i*.35)/.5);if(q>0)L.arcAnnotation(ctx,cx,cy,r,-2.65,2.15,{p:q,color:P.lavender,width:1.8,alpha:.55,endTicks:12});});
  const pts=[[650,765],[410,675],[755,945],[335,1030],[540,1150]];
  pts.forEach((p,i)=>{const q=L.clamp((t-.55-i*.08)/.25);if(q>0){ctx.save();ctx.globalAlpha=q;L.inkCircle(ctx,p[0],p[1],14+(i%2)*5,{width:1.6,color:P.schemSocial,seed:seed+20+i});ctx.restore();}});
  if(t>1.0){const q=L.clamp((t-1.0)/.45);L.inkPath(ctx,[[cx,cy],[610,900],[680,1030],[760,1180]],{width:3,color:P.magenta,alpha:.9*q,seed:seed+70,taper:[0,18]});}
}});})();