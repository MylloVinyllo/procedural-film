/*
Shot 16 · Across generations · T 27.5–29
Layers: blueprint, progress, two life arcs, sparse social nodes, G4 convergence point.
*/
(function(){'use strict';const ID='generation-spiral',G4={x:540,y:920,r:18};

  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){const a0=-Math.PI/2+i*Math.PI*2/N+gap,a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid),alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

function spiral(cx,cy,r0,r1,a0,a1,n){const pts=[];for(let i=0;i<=n;i++){const u=i/n,a=a0+(a1-a0)*u,r=r0+(r1-r0)*u;pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}return pts;}
FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
  L.blueprint(ctx);progress(ctx,L,P,15);
  const oldP=L.clamp((t-.05)/.65),newP=L.clamp((t-.45)/.7);
  const old=spiral(540,900,330,35,-2.9,.15,80).slice(0,Math.max(2,Math.floor(80*oldP)));
  const neu=spiral(540,900,300,35,2.8,6.0,80).slice(0,Math.max(2,Math.floor(80*newP)));
  if(old.length>1)L.inkPath(ctx,old,{width:2.4,color:P.memoryViolet,alpha:.75,seed:seed+10,taper:[0,18]});
  if(neu.length>1)L.inkPath(ctx,neu,{width:2.4,color:P.schemSelf,alpha:.9,seed:seed+11,taper:[0,18]});
  [[300,700],[760,700],[320,1100],[760,1120]].forEach((p,i)=>L.inkCircle(ctx,p[0],p[1],16+(i%2)*5,{width:1.4,color:P.schemSocial,alpha:.45,seed:seed+30+i}));
  if(t>.9){const q=L.clamp((t-.9)/.45);L.glowDot(ctx,G4.x,G4.y,G4.r*(.5+.5*q),{color:P.schemCycle,halo:65*q,rays:12,alpha:.95});}
}});})();