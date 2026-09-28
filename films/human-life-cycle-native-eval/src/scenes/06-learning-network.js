/*
Shot 06 · Learning · T 10–11.5
Layers: blueprint, progress glyph, G2 head match, symbolic network growth and pruning.
*/
(function(){'use strict';
  const ID='learning-network',G2={x:540,y:720,rx:72,ry:92};
  
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

  const nodes=[[540,700],[505,665],[575,655],[490,735],[590,735],[520,790],[568,795],[455,610],[625,600],[445,815],[640,825]];
  const links=[[0,1],[0,2],[0,3],[0,4],[3,5],[4,6],[1,7],[2,8],[5,9],[6,10],[1,2],[3,4]];
  FILM.scene({id:ID,draw(ctx,tIn,info){
    const L=info.lib,P=L.pal,t=L.clamp(tIn,0,info.dur),seed=L.hash(ID);
    L.blueprint(ctx);progress(ctx,L,P,5);
    L.inkPath(ctx,L.ellipsePts(G2.x,G2.y,G2.rx,G2.ry,48),{closed:true,width:2.5,color:P.lavender,seed:seed+1,double:{width:.5,offset:9}});
    const grow=L.clamp(t/.85);
    links.forEach((e,i)=>{const local=L.clamp(grow*links.length-i);if(local>0){const a=nodes[e[0]],b=nodes[e[1]];const mx=(a[0]+b[0])/2+(i%2?18:-18),my=(a[1]+b[1])/2-10;const pts=[a,[mx,my],b];L.inkPath(ctx,pts,{width:1.5,color:i>8&&t>1?P.grid:P.paleBlue,alpha:i>8&&t>1?.25:.7,seed:seed+20+i,taper:0});}});
    nodes.forEach((n,i)=>{if(grow*nodes.length>i-.5)L.glowDot(ctx,n[0],n[1],i===0?8:5,{color:i===0?P.schemSelf:P.glow,halo:i===0?34:20,rays:i===0?12:6,alpha:.8});});
    if(t>1.0){
      const q=L.clamp((t-1)/.5);
      const pts=[[590,735],[680,760],[760,700],[855,650]];
      L.inkPath(ctx,pts,{width:2.5,color:P.magenta,alpha:.85,seed:seed+99,taper:[0,20]});
      L.arcAnnotation(ctx,855,650,32,-.8,.8,{p:q,color:P.magenta,width:3,alpha:.9});
    }
  }});
})();