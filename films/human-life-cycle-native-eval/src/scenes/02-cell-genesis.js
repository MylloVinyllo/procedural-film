/*
Shot 02 · Beginning · T 1.5–4
Layers: blueprint, canonical progress glyph, G1 guide, division cells, body-axis exit.
*/
(function(){'use strict';
  const ID='cell-genesis',G1={x:540,y:700,r:150};
  
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

  function cell(ctx,L,P,x,y,r,sd,hot){
    L.inkCircle(ctx,x,y,r,{width:2.5,color:hot?P.schemSelf:P.lavender,seed:sd,double:{width:.55,offset:7}});
    L.glowDot(ctx,x,y,Math.max(7,r*.14),{color:hot?P.schemSelf:P.glow,rays:12,halo:r*.7,alpha:.86});
  }
  FILM.scene({id:ID,draw(ctx,tIn,info){
    const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
    L.blueprint(ctx); progress(ctx,L,P,1);
    L.guideCircle(ctx,G1.x,G1.y,G1.r,{color:P.lavender,alpha:.34});
    L.guideCircle(ctx,G1.x,G1.y,G1.r+34,{color:P.lavender,alpha:.14});
    const stage=t<.5?1:t<1?2:t<1.5?4:8;
    if(stage===1) cell(ctx,L,P,540,700,92,seed+1,true);
    if(stage===2){cell(ctx,L,P,492,700,68,seed+2,true);cell(ctx,L,P,588,700,68,seed+3,false);}
    if(stage===4){[[495,655],[585,655],[495,745],[585,745]].forEach((q,i)=>cell(ctx,L,P,q[0],q[1],52,seed+10+i,i===0));}
    if(stage===8){const pts=[[470,625],[540,620],[610,625],[480,700],[600,700],[470,775],[540,780],[610,775]];pts.forEach((q,i)=>cell(ctx,L,P,q[0],q[1],38,seed+20+i,i===0));}
    if(t>.25){
      const p=L.clamp((t-.25)/2.1);
      L.ticks(ctx,540,490,{kind:'linear',length:420,n:16,angle:Math.PI/2,p,color:P.lineWhite,alpha:.45,len:10,major:4,majorLen:20});
    }
    if(t>2.0){
      const q=L.clamp((t-2.0)/.5);
      L.inkLine(ctx,540,560,540,560+520*q,{width:2.5,color:P.magenta,seed:seed+99,taper:0});
      L.arcAnnotation(ctx,540,1080,52,Math.PI,Math.PI*2,{p:q,color:P.magenta,width:3,alpha:.9});
    }
  }});
})();