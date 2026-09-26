// 06 · Learning · T 10.000–11.500
// Layers: blueprint · exact G2 head · internal lattice/branches · exits-to-arm branch · progress glyph
(function(){
  'use strict';
  const ID='learning-network',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
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

  function headPath(c){
    c.beginPath();
    c.ellipse(540,720,72,92,0,0,TAU);
    c.moveTo(500,748);c.quadraticCurveTo(510,790,540,805);c.quadraticCurveTo(570,790,580,748);
    c.moveTo(519,796);c.lineTo(514,852);c.moveTo(561,796);c.lineTo(566,852);
    c.moveTo(514,852);c.quadraticCurveTo(540,866,566,852);
  }

  const NODES=[
    [512,665],[548,650],[576,676],[495,705],[530,708],[566,718],[595,732],
    [500,754],[536,752],[573,765],[515,790],[550,792],[583,807],[540,825]
  ];
  const EDGES=[
    [0,1],[1,2],[0,3],[1,4],[2,5],[2,6],[3,4],[4,5],[5,6],
    [3,7],[4,8],[5,9],[7,8],[8,9],[7,10],[8,11],[9,12],[10,11],[11,12],[11,13]
  ];

  function drawHead(c,L,P){
    c.save();
    c.strokeStyle=P.lineWhite;c.lineWidth=2.3;headPath(c);c.stroke();
    c.strokeStyle=L.rgba(P.lavender,.45);c.lineWidth=1.1;
    c.beginPath();c.ellipse(540,720,61,80,0,0,TAU);c.stroke();
    c.restore();

    const clip=(ctx)=>{ctx.ellipse(540,720,68,88,0,0,TAU);};
    L.hexLattice(c,clip,{bounds:[465,625,150,190],r:13,width:.8,color:P.lavender,alpha:.12,jitter:.5,seed:sd('lattice'),boilAmp:.15});
    L.stipple(c,clip,{bounds:[470,630,140,180],spacing:15,r:[.5,1.1],density:.22,color:P.paleBlue,alpha:.11,seed:sd('stipple'),boilAmp:.15});
  }

  function drawNetwork(c,L,P,t){
    // branches appear in waves
    const edgePath=new Path2D();
    EDGES.forEach((e,i)=>{
      const start=.1+(i%5)*.045+Math.floor(i/5)*.12;
      const p=L.seg(t,start,start+.34,'outExpo');
      if(p<=0)return;
      const a=NODES[e[0]],b=NODES[e[1]];
      const mx=(a[0]+b[0])/2+Math.sin(i*1.3)*8;
      const my=(a[1]+b[1])/2+Math.cos(i*.8)*5;
      edgePath.moveTo(a[0],a[1]);
      edgePath.quadraticCurveTo(mx,my,a[0]+(b[0]-a[0])*p,a[1]+(b[1]-a[1])*p);
    });
    c.save();c.strokeStyle=L.rgba(P.lavender,.62);c.lineWidth=1.35;c.lineCap='round';c.stroke(edgePath);c.restore();

    NODES.forEach((n,i)=>{
      const p=L.seg(t,.14+i*.045,.46+i*.045,'outBack');
      if(p<=0)return;
      const strong=(i===4||i===8||i===11);
      L.glowDot(c,n[0],n[1],strong?5.5:3.5,{color:strong?P.schemSelf:P.paleBlue,core:P.glow,rays:strong?5:0,seed:sd('node',i),intensity:.35+.65*p,glow:strong?3.8:2.7,twinkle:.04});
    });

    // pruning / strengthening on final beat
    const q=L.seg(t,.95,1.35,'inOutCubic');
    if(q>0){
      c.save();
      c.lineCap='round';
      // two weakening links
      [[3,4],[9,12]].forEach((e,i)=>{
        const a=NODES[e[0]],b=NODES[e[1]];
        c.strokeStyle=L.rgba(P.lavender,.45*(1-q));c.lineWidth=1.5;
        c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();
      });
      // one strengthening route
      const route=[NODES[0],NODES[4],NODES[8],NODES[11],NODES[13]];
      c.strokeStyle=P.schemSelf;c.lineWidth=2.6;c.globalAlpha=.35+.65*q;c.beginPath();
      route.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
      c.restore();
    }
  }

  function exitingBranch(c,L,P,t){
    const p=L.seg(t,1.12,1.5,'outExpo');
    if(p<=0)return;
    const start=[583,807],end=[820,650];
    const ex=start[0]+(end[0]-start[0])*p,ey=start[1]+(end[1]-start[1])*p;
    c.save();c.strokeStyle=P.schemSelf;c.lineWidth=2.3;c.beginPath();c.moveTo(...start);c.quadraticCurveTo(670,760,ex,ey);c.stroke();
    c.fillStyle=P.glow;c.beginPath();c.arc(ex,ey,4,0,TAU);c.fill();c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('blueprint'),center:[540,720],circles:5,diagonals:5});
    progressGlyph(c,L,5);
    drawHead(c,L,P);
    drawNetwork(c,L,P,t);
    exitingBranch(c,L,P,t);
    // external measurement geometry
    L.ticks(c,540,720,{r:122,n:28,len:8,major:7,majorLen:15,color:P.lavender,alpha:.24,width:1});
    L.bracket(c,430,630,430,852,{offset:-28,cap:12,color:P.lavender,alpha:.24,width:1.1,p:1});
  }});
})();