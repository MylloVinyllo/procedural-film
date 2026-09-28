/*
Shot 04 · Growth · T 5.5–8
Layers: blueprint, progress glyph, scale spine, four stage silhouettes, G2 head anchor.
*/
(function(){'use strict';
  const ID='growth-ladder',G2={x:540,y:720,rx:72,ry:92};
  
  function progress(ctx,L,P,current){
    const N=18,cx=900,cy=300,r=76,gap=.025;
    for(let i=0;i<N;i++){
      const a0=-Math.PI/2+i*Math.PI*2/N+gap;
      const a1=-Math.PI/2+(i+1)*Math.PI*2/N-gap;
      const color=i<current?P.lavender:(i===current?P.schemCycle:P.grid);
      const alpha=i<current?.34:(i===current?1:.22);
      L.arcAnnotation(ctx,cx,cy,r,a0,a1,{color,width:i===current?3:1.5,alpha,endTicks:0});
    }
  }

  function glyph(ctx,L,P,x,base,h,sd,a=1,hot=false){
    const head=Math.max(24,h*.12),top=base-h;
    ctx.save();ctx.globalAlpha=a;
    L.inkCircle(ctx,x,top+head,head,{ry:head*1.12,width:2.2,color:hot?P.schemSelf:P.lavender,seed:sd});
    L.inkLine(ctx,x,top+head*2.4,x,base-h*.30,{width:2.8,color:hot?P.schemSelf:P.lavender,seed:sd+1,taper:0});
    L.inkLine(ctx,x,top+h*.43,x-h*.18,top+h*.62,{width:2,color:P.lavender,seed:sd+2,taper:0});
    L.inkLine(ctx,x,top+h*.43,x+h*.18,top+h*.62,{width:2,color:P.lavender,seed:sd+3,taper:0});
    L.inkLine(ctx,x,base-h*.30,x-h*.13,base,{width:2.5,color:P.lavender,seed:sd+4,taper:0});
    L.inkLine(ctx,x,base-h*.30,x+h*.13,base,{width:2.5,color:P.lavender,seed:sd+5,taper:0});
    ctx.restore();
  }
  FILM.scene({id:ID,draw(ctx,tIn,info){
    const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
    L.blueprint(ctx);progress(ctx,L,P,3);
    L.ticks(ctx,170,470,{kind:'linear',length:870,n:20,angle:Math.PI/2,color:P.lineWhite,alpha:.38,len:10,major:5,majorLen:24});
    const stages=[
      {at:0,x:300,h:250},{at:.5,x:455,h:390},{at:1,x:620,h:560},{at:1.5,x:790,h:710}
    ];
    stages.forEach((g,i)=>{if(t>=g.at)glyph(ctx,L,P,g.x,1370,g.h,seed+30*i,1,i===Math.min(3,Math.floor(t/.5)));});
    if(t>2.0){const q=L.clamp((t-2.0)/.5);L.guideCircle(ctx,G2.x,G2.y,Math.max(G2.rx,G2.ry),{color:P.schemSelf,alpha:.18+.5*q});L.arcAnnotation(ctx,G2.x,G2.y,G2.ry,0,Math.PI*2,{p:q,color:P.schemSelf,width:3,endTicks:0});}
    L.bracket(ctx,250,1450,830,1450,{color:P.lavender,alpha:.55});
  }});
})();