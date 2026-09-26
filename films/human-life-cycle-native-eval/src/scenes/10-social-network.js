// 10 · We · T 16.000–18.000
(function(){
  'use strict';
  const ID='social-network',TAU=Math.PI*2,clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  // Canonical progress glyph. Copy this function byte-for-byte into every schematic scene.
  function progressGlyph(ctx,L,current){
    const P=L.pal;
    const cx=900,cy=300,r=72,n=18;
    ctx.save();
    ctx.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+(i/n)*TAU;
      const a1=-Math.PI/2+((i+.72)/n)*TAU;
      ctx.beginPath();
      ctx.arc(cx,cy,r,a0,a1);
      if(i<current){
        ctx.strokeStyle=L.rgba(P.lavender,.28);
        ctx.lineWidth=2;
      }else if(i===current){
        ctx.strokeStyle=P.schemCycle;
        ctx.lineWidth=4;
      }else{
        ctx.strokeStyle=L.rgba(P.grid,.22);
        ctx.lineWidth=2;
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function node(c,L,P,x,y,r,seed,col,alpha=1){
    L.glowDot(c,x,y,r*.22,{color:col,core:P.glow,rays:0,seed,intensity:alpha,glow:3,twinkle:.04});
    L.guideCircle(c,x,y,r,{color:col,alpha:.42*alpha,width:1.4});
    L.guideCircle(c,x,y,r*.72,{color:P.lavender,alpha:.12*alpha,width:1,dash:[3,6]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,820],circles:6,diagonals:5});
    progressGlyph(c,L,9);

    // faint torso keeps the network human
    c.save();c.strokeStyle=L.rgba(P.lavender,.34);c.lineWidth=1.5;c.beginPath();
    c.ellipse(540,650,48,58,0,0,TAU);
    c.moveTo(462,730);c.quadraticCurveTo(540,690,618,730);
    c.moveTo(485,735);c.lineTo(500,965);c.moveTo(595,735);c.lineTo(580,965);c.stroke();c.restore();

    // exact G3 from previous shot
    node(c,L,P,540,820,48,sd('primary'),P.schemSelf,1);

    clusters.forEach((cl,ci)=>{
      const p=L.seg(t,cl.start,cl.start+.42,'outExpo');
      if(p<=0)return;
      // intra-cluster links
      c.save();c.lineCap='round';c.strokeStyle=L.rgba(P.lavender,.35+.3*p);c.lineWidth=1.25;
      cl.links.forEach((e,li)=>{
        const a=cl.nodes[e[0]],b=cl.nodes[e[1]],q=clamp(p*1.25-li*.08);
        c.beginPath();c.moveTo(a[0],a[1]);c.quadraticCurveTo((a[0]+b[0])/2+Math.sin(li+ci)*18,(a[1]+b[1])/2,b[0],b[1]);c.globalAlpha=q;c.stroke();
      });c.restore();
      cl.nodes.forEach((n,i)=>node(c,L,P,n[0],n[1],22+(i%3)*6,sd('n',ci,i),P.schemSocial,.28+.72*p));
    });

    // bridges from protagonist to clusters, one at a time
    const bridges=[
      {to:[365,690],t0:.35},{to:[720,650],t0:.78},{to:[525,1200],t0:1.12}
    ];
    bridges.forEach((b,i)=>{
      const p=L.seg(t,b.t0,b.t0+.32,'outExpo');if(p<=0)return;
      const ex=540+(b.to[0]-540)*p,ey=820+(b.to[1]-820)*p;
      c.save();c.strokeStyle=i===0?P.schemCycle:P.schemSocial;c.globalAlpha=.35+.55*p;c.lineWidth=i===0?2.7:1.8;c.beginPath();
      c.moveTo(540,820);c.quadraticCurveTo((540+b.to[0])/2+(i-1)*25,(820+b.to[1])/2-25,ex,ey);c.stroke();c.restore();
    });

    // other people have lives beyond primary: secondary micro-links
    c.save();c.strokeStyle=L.rgba(P.paleBlue,.26);c.lineWidth=1;
    [[300,810,220,760],[815,735,915,680],[640,1110,735,1210]].forEach((a,i)=>{
      c.beginPath();c.moveTo(a[0],a[1]);c.quadraticCurveTo((a[0]+a[2])/2,a[1]-30,a[2],a[3]);c.stroke();
      node(c,L,P,a[2],a[3],13,sd('outer',i),P.paleBlue,.55);
    });c.restore();

    // changing ties: two dim, one close bond strengthens
    const q=L.seg(t,1.45,1.9,'inOutCubic');
    if(q>0){
      c.save();
      c.strokeStyle=P.schemCycle;c.lineWidth=3.4;c.globalAlpha=.3+.7*q;c.beginPath();
      c.moveTo(540,820);c.quadraticCurveTo(625,770,720,650);c.stroke();
      c.restore();
      L.guideCircle(c,720,650,28+22*q,{color:P.schemCycle,alpha:.28*(1-q),width:2});
    }
  }});
})();