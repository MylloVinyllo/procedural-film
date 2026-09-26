// 16 · Across generations · T 27.500–29.000
(function(){
  'use strict';
  const ID='generation-spiral',TAU=Math.PI*2,clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  // Canonical progress glyph. Copy this function byte-for-byte into every schematic scene.
  function progressGlyph(ctx,L,current){
    const P=L.pal,cx=900,cy=300,r=72,n=18;
    ctx.save();ctx.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+(i/n)*TAU,a1=-Math.PI/2+((i+.72)/n)*TAU;
      ctx.beginPath();ctx.arc(cx,cy,r,a0,a1);
      if(i<current){ctx.strokeStyle=L.rgba(P.lavender,.28);ctx.lineWidth=2;}
      else if(i===current){ctx.strokeStyle=P.schemCycle;ctx.lineWidth=4;}
      else{ctx.strokeStyle=L.rgba(P.grid,.22);ctx.lineWidth=2;}
      ctx.stroke();
    }ctx.restore();
  }

  function body(c,L,P,x,y,s,age,col,a=1){
    c.save();c.globalAlpha=a;c.strokeStyle=col;c.lineCap='round';c.lineJoin='round';
    const headR=(age===0?18:age===1?16:15)*s;
    const h=(age===0?115:age===1?145:age===2?155:148)*s;
    c.lineWidth=1.6;
    c.beginPath();c.ellipse(x,y-h+headR,headR*.85,headR,0,0,TAU);c.stroke();
    const sh=(age===0?28:age===1?36:38)*s,pel=(age===0?24:30)*s;
    const sy=y-h+headR*2.7,py=y-h*.36;
    c.beginPath();
    c.moveTo(x-sh,sy);c.quadraticCurveTo(x-pel,py-h*.08,x-pel,py);
    c.lineTo(x-pel*.65,y-h*.17);c.lineTo(x-18*s,y);
    c.moveTo(x+sh,sy);c.quadraticCurveTo(x+pel,py-h*.08,x+pel,py);
    c.lineTo(x+pel*.65,y-h*.17);c.lineTo(x+18*s,y);
    c.moveTo(x-sh*.9,sy+8*s);c.lineTo(x-sh*1.15,py);c.moveTo(x+sh*.9,sy+8*s);c.lineTo(x+sh*1.15,py);
    c.stroke();
    if(age===3){ // older posture cue
      c.strokeStyle=L.rgba(col,.45);c.lineWidth=1;c.beginPath();c.arc(x+8*s,sy+35*s,40*s,2.2,4.2);c.stroke();
    }
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,900],circles:6,diagonals:5});
    progressGlyph(c,L,15);

    // spiral path
    const pts=[];
    const turns=1.65,N=120;
    for(let i=0;i<N;i++){
      const u=i/(N-1),a=-Math.PI/2+u*TAU*turns,r=55+u*360;
      pts.push([540+Math.cos(a)*r,900+Math.sin(a)*r*.92]);
    }
    const p=L.seg(t,0,.7,'outExpo'),n=Math.max(2,Math.round(pts.length*p));
    c.save();c.strokeStyle=L.rgba(P.lavender,.62);c.lineWidth=1.8;c.beginPath();
    pts.slice(0,n).forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.stroke();c.restore();
    // secondary ghost spiral
    c.save();c.strokeStyle=L.rgba(P.paleBlue,.16);c.lineWidth=1;c.setLineDash([5,8]);c.beginPath();
    pts.forEach((q,i)=>i?c.lineTo(q[0]+18,q[1]-12):c.moveTo(q[0]+18,q[1]-12));c.stroke();c.restore();

    // generation silhouettes placed along the spiral
    const gs=[
      {u:.18,age:0,s:.72,col:P.schemSocial,t0:.18},
      {u:.38,age:1,s:.78,col:P.paleBlue,t0:.35},
      {u:.60,age:2,s:.84,col:P.schemSelf,t0:.55},
      {u:.82,age:3,s:.88,col:P.schemCycle,t0:.75}
    ];
    gs.forEach((g,i)=>{
      const idx=Math.min(N-1,Math.round(g.u*(N-1))),q=pts[idx],on=L.seg(t,g.t0,g.t0+.3,'outBack');
      if(on<=0)return;
      body(c,L,P,q[0],q[1]+75*g.s,g.s,g.age,g.col,.2+.8*on);
      L.guideCircle(c,q[0],q[1],24+8*i,{color:g.col,alpha:.12+.12*on,width:1,dash:[3,6]});
    });

    // intergenerational transfer route, emerging from old to young
    const old=pts[Math.round(.82*(N-1))],young=pts[Math.round(.18*(N-1))];
    const q=L.seg(t,.88,1.35,'inOutCubic');
    if(q>0){
      const mid=[540,920];
      const ex=old[0]+(mid[0]-old[0])*Math.min(1,q*1.6);
      const ey=old[1]+(mid[1]-old[1])*Math.min(1,q*1.6);
      c.save();c.strokeStyle=P.schemCycle;c.lineWidth=2.5;c.globalAlpha=.35+.6*q;c.beginPath();c.moveTo(old[0],old[1]);c.quadraticCurveTo(660,1040,ex,ey);c.stroke();c.restore();
    }

    // G4 becomes exact on exit
    const g4=L.seg(t,1.05,1.5,'outExpo');
    if(g4>0){
      L.glowDot(c,540,920,8,{color:P.schemCycle,core:P.glow,rays:8,seed:sd('g4'),intensity:.5+.5*g4,glow:4,twinkle:.03});
      L.guideCircle(c,540,920,18,{color:P.schemCycle,alpha:.9,width:2.5});
      L.ticks(c,540,920,{r:34,n:12,len:7,major:3,majorLen:12,color:P.lineWhite,alpha:.32*g4,width:1});
    }
  }});
})();