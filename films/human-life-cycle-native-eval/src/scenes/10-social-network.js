/*
Shot 10 · We · T 16–18
Layers: blueprint, progress, exact G3 primary node, heterogeneous clusters and bridges.
*/
(function(){'use strict';const ID='social-network',G3={x:540,y:820,r:48};

  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){const a0=-Math.PI/2+i*Math.PI*2/N+gap,a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid),alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

const N=[[540,820,48,'self'],[360,690,32,'social'],[270,850,24,'social'],[390,1010,28,'social'],[735,660,28,'social'],[820,820,35,'social'],[725,1030,24,'social'],[520,1160,22,'social'],[220,570,20,'social']];
const E=[[0,1],[1,2],[1,3],[0,4],[4,5],[5,6],[0,7],[1,8],[3,7],[6,7]];
FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
  L.blueprint(ctx);progress(ctx,L,P,9);
  const pg=L.clamp(t/1.45);
  E.forEach((e,i)=>{const q=L.clamp(pg*E.length-i);if(q>0){const a=N[e[0]],b=N[e[1]],mx=(a[0]+b[0])/2+(i%2?28:-28),my=(a[1]+b[1])/2+(i%3-1)*24;L.inkPath(ctx,[[a[0],a[1]],[mx,my],[b[0],b[1]]],{width:(i===0&&t>1.2)?3:1.5,color:(i===0&&t>1.2)?P.schemSocial:P.lavender,alpha:(i===0&&t>1.2)?.95:.58,seed:seed+20+i,taper:0});}});
  N.forEach((n,i)=>{if(i===0||pg*N.length>i-.2){const c=i===0?P.schemSelf:P.schemSocial;L.inkCircle(ctx,n[0],n[1],n[2],{width:i===0?2.8:1.7,color:c,seed:seed+60+i,double:i===0?{width:.5,offset:8}:false});L.glowDot(ctx,n[0],n[1],i===0?9:5,{color:c,halo:i===0?38:20,rays:i===0?12:6,alpha:.72});}});
  if(t>1.5){const q=L.clamp((t-1.5)/.45);L.arcAnnotation(ctx,420,700,95,.1,1.4,{p:q,color:P.magenta,width:3,alpha:.8});}
}});})();