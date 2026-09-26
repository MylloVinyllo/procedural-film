// 04 · Growth · T 5.500–8.000
// Layers: blueprint · measurement spine · four age silhouettes · proportion guides · canonical progress glyph
(function(){
  'use strict';
  const ID='growth-ladder',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
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

  function path(c,pts){
    c.beginPath();
    for(let i=0;i<pts.length;i++)i?c.lineTo(pts[i][0],pts[i][1]):c.moveTo(pts[i][0],pts[i][1]);
  }

  function silhouette(c,L,x,base,h,stage,p,seed){
    const P=L.pal;
    if(p<=0)return;
    const headR=stage===0?h*.105:stage===1?h*.09:stage===2?h*.072:h*.068;
    const headY=base-h+headR*1.25;
    const shoulderY=headY+headR*1.45;
    const pelvisY=base-h*.42;
    const kneeY=base-h*.21;
    const shoulder=stage===0?h*.12:stage===1?h*.15:stage===2?h*.17:h*.19;
    const pelvis=stage===0?h*.13:stage===1?h*.14:stage===2?h*.145:h*.15;

    c.save();
    c.globalAlpha=.18+.82*p;
    c.lineCap='round';c.lineJoin='round';

    // outer double-line anatomy
    c.strokeStyle=P.lavender;c.lineWidth=2.4;
    c.beginPath();
    c.ellipse(x,headY,headR*.86,headR,0,0,TAU);
    c.moveTo(x-shoulder,shoulderY);
    c.quadraticCurveTo(x-shoulder*.55,pelvisY-h*.12,x-pelvis,pelvisY);
    c.lineTo(x-pelvis*.8,base-h*.34);
    c.lineTo(x-h*.075,kneeY);
    c.lineTo(x-h*.06,base);
    c.moveTo(x+shoulder,shoulderY);
    c.quadraticCurveTo(x+shoulder*.55,pelvisY-h*.12,x+pelvis,pelvisY);
    c.lineTo(x+pelvis*.8,base-h*.34);
    c.lineTo(x+h*.075,kneeY);
    c.lineTo(x+h*.06,base);
    c.moveTo(x-shoulder*.95,shoulderY+h*.02);
    c.lineTo(x-shoulder*1.22,base-h*.48);
    c.lineTo(x-shoulder*.82,base-h*.28);
    c.moveTo(x+shoulder*.95,shoulderY+h*.02);
    c.lineTo(x+shoulder*1.22,base-h*.48);
    c.lineTo(x+shoulder*.82,base-h*.28);
    c.stroke();

    c.strokeStyle=L.rgba(P.lavender,.45);c.lineWidth=1.1;
    c.beginPath();
    c.ellipse(x,headY,headR*.69,headR*.83,0,0,TAU);
    c.moveTo(x-shoulder*.85,shoulderY+8);c.lineTo(x+shoulder*.85,shoulderY+8);
    c.moveTo(x-pelvis,pelvisY);c.lineTo(x+pelvis,pelvisY);
    c.moveTo(x,shoulderY);c.lineTo(x,pelvisY);
    c.stroke();

    // internal proportional ticks
    c.strokeStyle=L.rgba(P.lineWhite,.36);c.lineWidth=1;
    for(let i=1;i<7;i++){
      const yy=base-h+i*h/7;
      const w=stage===0?22:18;
      c.beginPath();c.moveTo(x-w,yy);c.lineTo(x+w,yy);c.stroke();
    }

    // stage-specific structure
    if(stage===0){
      // infant: flexed limbs / wider head cue
      c.strokeStyle=P.schemSelf;c.lineWidth=2.2;
      c.beginPath();c.arc(x,headY,headR*1.02,0,TAU);c.stroke();
    }
    if(stage===1){
      // exact G2 head at dominant child position when x=540/base chosen
      L.guideCircle(c,x,headY,headR*1.2,{color:P.schemSelf,alpha:.35,width:1.3,dash:[4,6]});
    }
    if(stage>=2){
      // shoulder / pelvis angle guides
      c.strokeStyle=L.rgba(P.paleBlue,.45);c.lineWidth=1.1;
      c.beginPath();c.moveTo(x-shoulder,shoulderY);c.lineTo(x+shoulder,shoulderY-3);c.stroke();
      c.beginPath();c.moveTo(x-pelvis,pelvisY);c.lineTo(x+pelvis,pelvisY+3);c.stroke();
    }

    // glow at sternum marks currently introduced stage
    L.glowDot(c,x,shoulderY+h*.14,4.5,{color:P.schemSelf,core:P.glow,rays:4,seed,intensity:.45+.55*p,glow:3.2,twinkle:.04});
    c.restore();
  }

  function ruler(c,L){
    const P=L.pal;
    c.save();
    c.strokeStyle=L.rgba(P.lavender,.5);c.lineWidth=1.4;
    c.beginPath();c.moveTo(275,410);c.lineTo(275,1430);c.stroke();
    for(let y=430,i=0;y<=1430;y+=40,i++){
      const major=i%5===0,len=major?34:16;
      c.strokeStyle=major?L.rgba(P.lineWhite,.55):L.rgba(P.lavender,.34);
      c.lineWidth=major?1.6:1;
      c.beginPath();c.moveTo(275-len/2,y);c.lineTo(275+len/2,y);c.stroke();
    }
    c.restore();
    L.bracket(c,310,1390,310,520,{offset:0,cap:18,color:P.lavender,alpha:.4,width:1.2,p:1});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('blueprint'),center:[540,840],circles:5,diagonals:4});
    progressGlyph(c,L,3);
    ruler(c,L);

    // floor / baseline and shared vertical body axis
    c.save();
    c.strokeStyle=L.rgba(P.lavender,.3);c.lineWidth=1.3;
    c.beginPath();c.moveTo(340,1390);c.lineTo(810,1390);c.stroke();
    c.setLineDash([8,10]);c.beginPath();c.moveTo(540,430);c.lineTo(540,1450);c.stroke();c.restore();

    const stages=[
      {x:390,base:1370,h:290,stage:0,t0:0},
      {x:500,base:1370,h:430,stage:1,t0:.5},
      {x:625,base:1370,h:560,stage:2,t0:1.0},
      {x:755,base:1370,h:690,stage:3,t0:1.5},
    ];
    stages.forEach((s,i)=>{
      const p=L.seg(t,s.t0,s.t0+.28,'outBack');
      silhouette(c,L,s.x,s.base,s.h,s.stage,p,sd('stage',i));
      // height bracket for each
      L.bracket(c,s.x-55,s.base,s.x-55,s.base-s.h,{offset:0,cap:8,color:i===1?P.schemSelf:P.lavender,alpha:.18+.22*p,width:1,p});
    });

    // At the final half-beat, child becomes dominant and morphs toward exact G2
    const d=L.seg(t,2.0,2.5,'outExpo');
    if(d>0){
      c.save();
      c.globalAlpha=d;
      // exact G2 ellipse, screen-fixed
      c.strokeStyle=P.lineWhite;c.lineWidth=2.4;c.beginPath();c.ellipse(540,720,72,92,0,0,TAU);c.stroke();
      c.strokeStyle=L.rgba(P.schemSelf,.55);c.lineWidth=1.2;c.beginPath();c.ellipse(540,720,61,80,0,0,TAU);c.stroke();
      // jaw and neck around invariant ellipse
      c.strokeStyle=P.lavender;c.lineWidth=1.6;c.beginPath();
      c.moveTo(498,748);c.quadraticCurveTo(508,790,540,804);c.quadraticCurveTo(572,790,582,748);
      c.moveTo(520,795);c.lineTo(516,842);c.moveTo(560,795);c.lineTo(564,842);
      c.stroke();
      c.restore();
      L.ticks(c,540,720,{r:106,n:20,len:8,major:5,majorLen:15,color:P.lavender,alpha:.25*d,width:1});
    }

    // growth-flow arrows connect the stages but remain secondary
    c.save();c.strokeStyle=L.rgba(P.paleBlue,.4);c.fillStyle=P.paleBlue;c.lineWidth=1.6;
    for(let i=0;i<3;i++){
      const a=stages[i],b=stages[i+1],p=L.seg(t,.35+i*.5,.65+i*.5,'outExpo');
      if(p<=0)continue;
      const x1=a.x+35,y1=a.base-a.h*.55,x2=lerp(x1,b.x-35,p),y2=lerp(y1,b.base-b.h*.55,p);
      c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo((x1+x2)/2,y1-40,x2,y2);c.stroke();
    }
    c.restore();
  }});
})();