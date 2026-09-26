// 12 · Roles · T 20.000–21.500
(function(){
  'use strict';
  const ID='role-system',TAU=Math.PI*2,clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  // Canonical progress glyph. Copy this function byte-for-byte into every schematic scene.
  function progressGlyph(ctx,L,current){
    const P=L.pal;
    const cx=900,cy=300,r=72,n=18;
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

  function tinyPerson(c,L,P,x,y,s,seed,col,alpha=1){
    c.save();c.globalAlpha=alpha;c.strokeStyle=col;c.lineWidth=1.3;
    c.beginPath();c.ellipse(x,y-28*s,11*s,14*s,0,0,TAU);c.moveTo(x,y-14*s);c.lineTo(x,y+24*s);
    c.moveTo(x,y-2*s);c.lineTo(x-14*s,y+10*s);c.moveTo(x,y-2*s);c.lineTo(x+14*s,y+10*s);
    c.moveTo(x,y+24*s);c.lineTo(x-11*s,y+45*s);c.moveTo(x,y+24*s);c.lineTo(x+11*s,y+45*s);c.stroke();
    L.glowDot(c,x,y+2*s,2.7*s,{color:col,core:P.glow,rays:0,seed,intensity:.65*alpha,glow:2.3,twinkle:.03});
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,900],circles:6,diagonals:4});
    progressGlyph(c,L,11);

    // protagonist core and faint body
    c.save();c.strokeStyle=L.rgba(P.lavender,.32);c.lineWidth=1.4;c.beginPath();
    c.ellipse(540,690,46,56,0,0,TAU);c.moveTo(468,760);c.quadraticCurveTo(540,725,612,760);
    c.moveTo(490,765);c.lineTo(500,985);c.moveTo(590,765);c.lineTo(580,985);c.stroke();c.restore();
    L.glowDot(c,540,850,10,{color:P.schemSelf,core:P.glow,rays:7,seed:sd('core'),intensity:1,glow:4,twinkle:.04});

    const rings=[
      {r:150,a0:-2.65,a1:2.25,col:P.schemSelf,start:.1},
      {r:260,a0:-2.2,a1:2.75,col:P.schemSocial,start:.35},
      {r:370,a0:-2.8,a1:1.95,col:P.lavender,start:.62},
    ];
    rings.forEach((r,i)=>{
      const p=L.seg(t,r.start,r.start+.38,'outExpo');
      if(p<=0)return;
      c.save();c.strokeStyle=r.col;c.globalAlpha=i===0?.55:.32;c.lineWidth=i===0?2.4:1.6;c.beginPath();
      c.arc(540,850,r.r,r.a0,r.a0+(r.a1-r.a0)*p);c.stroke();c.restore();
      // radial ticks indicate open contexts, not cages
      L.ticks(c,540,850,{r:r.r,n:18+i*4,len:7,major:6,majorLen:13,start:r.a0,span:(r.a1-r.a0)*p,color:r.col,alpha:.18,width:1});
    });

    // sparse embodied nodes on each ring
    const people=[
      [420,735,.8,P.schemSocial,0],[660,760,.74,P.paleBlue,1],
      [335,960,.7,P.schemSocial,2],[745,1010,.72,P.schemSocial,3],[540,1110,.66,P.paleBlue,4],
      [255,690,.62,P.lavender,5],[820,650,.58,P.lavender,6],[860,1160,.6,P.lavender,7]
    ];
    people.forEach((p,i)=>{
      const on=L.seg(t,.28+i*.06,.52+i*.06,'outBack');if(on<=0)return;
      tinyPerson(c,L,P,p[0],p[1],p[2],sd('person',i),p[3],.22+.78*on);
    });

    // cross-context ties
    const ties=[
      [[540,850],[420,735],.25],[[540,850],[660,760],.42],[[420,735],[335,960],.58],
      [[660,760],[745,1010],.72],[[540,850],[540,1110],.86]
    ];
    c.save();c.lineCap='round';
    ties.forEach((tr,i)=>{
      const p=L.seg(t,tr[2],tr[2]+.32,'outExpo');if(p<=0)return;
      const a=tr[0],b=tr[1];c.strokeStyle=i===0?P.schemCycle:L.rgba(P.lavender,.42);c.lineWidth=i===0?2.3:1.2;c.globalAlpha=.25+.6*p;
      c.beginPath();c.moveTo(a[0],a[1]);c.quadraticCurveTo((a[0]+b[0])/2+(i%2?25:-25),(a[1]+b[1])/2,b[0],b[1]);c.stroke();
    });c.restore();

    // exit: inner ring straightens into worktable edge
    const e=L.seg(t,1.18,1.5,'outExpo');
    if(e>0){
      c.save();c.strokeStyle=P.schemCycle;c.lineWidth=2.5;c.globalAlpha=e;c.beginPath();
      c.moveTo(300,1120);c.lineTo(780,1120);c.stroke();c.restore();
    }
  }});
})();