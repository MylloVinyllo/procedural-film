/*
Shot 18 · Again · T 30.5–32
Layers: blueprint, completed progress glyph, G1 return, receding social traces, final wordmark.
*/
(function(){'use strict';const ID='seed-loop',G1={x:540,y:700,r:150};

  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){const a0=-Math.PI/2+i*Math.PI*2/N+gap,a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid),alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

FILM.scene({id:ID,draw(ctx,tIn,info){
  const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
  L.blueprint(ctx);progress(ctx,L,P,17);
  const land=L.clamp(t/.28);
  L.guideCircle(ctx,G1.x,G1.y,G1.r+34,{color:P.lavender,alpha:.14});
  L.arcAnnotation(ctx,G1.x,G1.y,G1.r,0,Math.PI*2,{p:land,color:P.lavender,width:2.7,alpha:.9,endTicks:0});
  L.glowDot(ctx,G1.x,G1.y,11,{color:P.schemCycle,halo:56,rays:14,alpha:.95});
  const fade=1-L.clamp((t-.35)/.75);
  const nodes=[[300,520],[780,520],[260,850],[820,900],[540,1040]];
  ctx.save();ctx.globalAlpha=.42*fade;
  nodes.forEach((n,i)=>{L.inkCircle(ctx,n[0],n[1],16+(i%2)*5,{width:1.5,color:P.schemSocial,seed:seed+20+i});L.inkLine(ctx,G1.x,G1.y,n[0],n[1],{width:1.2,color:P.schemSocial,seed:seed+40+i,taper:0});});
  ctx.restore();
  const pulse=t<.5?0:t<1?L.clamp((t-.5)/.25):L.clamp((t-1)/.25);
  if(pulse>0)L.arcAnnotation(ctx,G1.x,G1.y,G1.r+35+45*pulse,0,Math.PI*2,{color:P.schemCycle,width:3,alpha:1-pulse,endTicks:0});
  const wp=L.clamp((t-.55)/.45);if(wp>0){ctx.save();ctx.globalAlpha=.85*wp;L.text(ctx,'human',540,1470,{size:44,weight:300,align:'center',color:P.lavender});ctx.restore();}
}});})();