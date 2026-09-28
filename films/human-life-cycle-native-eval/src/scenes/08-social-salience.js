/*
Shot 08 · Peers · T 13.5–14.5
Layers: blueprint, canonical progress, G3 self node, peer nodes, attention sector.
*/
(function(){'use strict';const ID='social-salience',G3={x:540,y:820,r:48};

  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){const a0=-Math.PI/2+i*Math.PI*2/N+gap,a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid),alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
  L.blueprint(ctx);progress(ctx,L,P,7);
  L.glowDot(ctx,G3.x,G3.y,11,{color:P.schemSelf,halo:42,rays:12,alpha:.95});
  L.inkCircle(ctx,G3.x,G3.y,G3.r,{width:2.6,color:P.schemSelf,seed:seed+1,double:{width:.5,offset:8}});
  const peers=[[300,620,30],[780,620,34],[820,980,28]];
  peers.forEach((n,i)=>{const on=L.clamp((t-.18-i*.06)/.22);if(on>0){ctx.save();ctx.globalAlpha=on;L.inkCircle(ctx,n[0],n[1],n[2],{width:2,color:P.schemSocial,seed:seed+10+i});L.glowDot(ctx,n[0],n[1],5,{color:P.schemSocial,halo:20,rays:6,alpha:.7});ctx.restore();}});
  const links=[[300,620],[780,620],[820,980]];
  links.forEach((b,i)=>{const q=L.clamp((t-.25-i*.08)/.35);if(q>0){const pts=[[G3.x,G3.y],[540+(b[0]-540)*.45+(i-1)*25,720+(i*45)],b];L.inkPath(ctx,pts,{width:i===1&&t>.72?3:1.6,color:i===1&&t>.72?P.schemSocial:P.lavender,alpha:.78,seed:seed+30+i,taper:[0,16]});}});
  const att=L.clamp((t-.48)/.38);if(att>0)L.arcAnnotation(ctx,G3.x,G3.y,150,-2.4,-2.4+3.1*att,{color:P.magenta,width:4,alpha:.9,arrow:10});
}});})();