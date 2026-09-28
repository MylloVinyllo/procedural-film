/*
Shot 14 · Traces · T 24–25.5
Layers: blueprint, progress, central self node, child path/social/bond/object memory traces.
*/
(function(){'use strict';const ID='memory-field';

  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){const a0=-Math.PI/2+i*Math.PI*2/N+gap,a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid),alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID),cx=540,cy=820;
  L.blueprint(ctx);progress(ctx,L,P,13);
  L.glowDot(ctx,cx,cy,9,{color:P.schemSelf,halo:34,rays:10,alpha:.9});
  const child=[[220,1200],[330,1080],[430,980],[500,860]];
  const social=[[540,820],[390,690],[720,670],[760,930],[430,1030]];
  const bond=[[420,760],[540,700],[660,760]];
  const object=[[470,1000],[540,920],[610,1000]];
  const q1=L.clamp((t-.15)/.35),q2=L.clamp((t-.4)/.35),q3=L.clamp((t-.8)/.3),q4=L.clamp((t-1.05)/.3);
  if(q1>0)L.inkPath(ctx,child,{width:2.3,color:P.memoryViolet,alpha:.55*q1,seed:seed+10,taper:[0,16]});
  if(q2>0){for(let i=1;i<social.length;i++)L.inkLine(ctx,social[0][0],social[0][1],social[i][0],social[i][1],{width:1.5,color:P.memoryViolet,alpha:.35*q2,seed:seed+20+i,taper:0});}
  if(q3>0)L.inkPath(ctx,bond,{width:2.4,color:P.memoryViolet,alpha:.55*q3,seed:seed+40,taper:[0,16]});
  if(q4>0)L.inkPath(ctx,object,{width:2.8,color:P.memoryViolet,alpha:.68*q4,seed:seed+50,taper:0});
  const fade=t>1.25?L.clamp((t-1.25)/.25):0;
  if(fade>0){ctx.save();ctx.globalAlpha=.6*fade;L.arcAnnotation(ctx,cx,cy,180,-.6,.6,{color:P.schemCycle,width:3,alpha:.7,endTicks:0});ctx.restore();}
}});})();