// 03 · Heavy enough to fall · T 3.500–5.000
// Blueprint physics plate: G1 transforms from near-round cloud drop to flattened falling raindrop.
(function(){
  'use strict';
  const ID='drop-growth',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function progressGlyph(c,L,current){
    const P=L.pal,cx=900,cy=300,r=72,n=12;
    c.save();c.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+i/n*TAU,a1=-Math.PI/2+(i+.62)/n*TAU;
      c.beginPath();c.arc(cx,cy,r,a0,a1);
      if(i<current){c.strokeStyle=L.rgba(P.lavender,.25);c.lineWidth=2;}
      else if(i===current){c.strokeStyle=P.schemCycle;c.lineWidth=4;}
      else{c.strokeStyle=L.rgba(P.grid,.2);c.lineWidth=2;}
      c.stroke();
    }
    const a=-Math.PI/2+(current+.58)/n*TAU;
    c.fillStyle=P.schemWater;c.beginPath();c.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,0,TAU);c.fill();
    c.restore();
  }

  function dropShape(cx,cy,rx,ry,flat,concave=0){
    const pts=[],n=80;
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      let x=Math.cos(a)*rx,y=Math.sin(a)*ry;
      if(y>0){
        const u=y/ry;
        y*=1-flat*.18*u*u;
        x*=1+flat*.08*u;
        if(concave>0){
          const centre=Math.exp(-Math.pow(x/(rx*.42),2));
          y-=concave*centre*u*u;
        }
      }
      pts.push([cx+x,cy+y]);
    }
    return pts;
  }

  function drawOutline(c,L,P,pts,seed,alpha=1,width=2.4){
    c.save();c.globalAlpha=alpha;
    L.inkPath(c,pts,{closed:true,color:P.lavender,width,alpha:.9,seed,wobble:.14,tremble:.05,boilAmp:.05});
    const inner=pts.map(p=>[540+(p[0]-540)*.91,720+(p[1]-720)*.91]);
    L.inkPath(c,inner,{closed:true,color:P.lavender,width:1.2,alpha:.42,seed:seed+1,wobble:.09,tremble:.03,boilAmp:.04});
    c.restore();
  }

  function airflow(c,L,P,p){
    const curves=[
      [[540,350],[380,430],[345,590],[380,760],[450,895],[540,960]],
      [[540,350],[700,430],[735,590],[700,760],[630,895],[540,960]],
      [[400,385],[285,510],[275,705],[330,870],[420,980]],
      [[680,385],[795,510],[805,705],[750,870],[660,980]]
    ];
    curves.forEach((pts,i)=>{
      const n=Math.max(2,Math.round(pts.length*p));
      L.inkPath(c,L.smoothPts(pts.slice(0,n),false,4),{color:P.schemFlow,width:i<2?1.8:1.1,alpha:.22+.38*p,seed:sd('air',i),wobble:.08,tremble:.03,boilAmp:.03,taper:[5,8]});
      if(p>.72){
        const e=pts[pts.length-1],pr=pts[pts.length-2],a=Math.atan2(e[1]-pr[1],e[0]-pr[0]);
        c.save();c.globalAlpha=.45*p;c.fillStyle=P.schemFlow;c.beginPath();
        c.moveTo(e[0],e[1]);c.lineTo(e[0]-Math.cos(a-.45)*12,e[1]-Math.sin(a-.45)*12);c.lineTo(e[0]-Math.cos(a+.45)*12,e[1]-Math.sin(a+.45)*12);c.closePath();c.fill();c.restore();
      }
    });
  }

  function miniature(c,L,P,x,y,rx,ry,flat,seed,active){
    const pts=dropShape(x,y,rx,ry,flat,flat>1.05?8:0);
    c.save();c.globalAlpha=.3+.55*active;
    c.strokeStyle=active?P.schemWater:P.lavender;c.lineWidth=active?2.2:1.2;
    c.beginPath();L.tracePath(c,pts,true);c.stroke();
    c.restore();
    L.guideCircle(c,x,y,Math.max(rx,ry)+22,{color:active?P.schemCycle:P.lavender,alpha:.08+.15*active,width:1,dash:[3,7]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,720],circles:6,diagonals:4});
    progressGlyph(c,L,2);

    const deform=L.seg(t,.28,1.12,'inOutCubic');
    const flat=.08+.62*deform;
    const rx=105,ry=90;
    airflow(c,L,P,L.seg(t,.15,.8,'outExpo'));

    // bottom pressure arrows oppose the falling direction
    const press=L.seg(t,.42,1.05,'outExpo');
    if(press>0){
      [-62,-28,28,62].forEach((dx,i)=>{
        const x=540+dx,y0=900+Math.abs(dx)*.11,y1=840+Math.abs(dx)*.06;
        c.save();c.globalAlpha=.2+.55*press;c.strokeStyle=P.paleBlue;c.lineWidth=1.5;
        c.beginPath();c.moveTo(x,y0);c.lineTo(x,y1);c.stroke();
        c.fillStyle=P.paleBlue;c.beginPath();c.moveTo(x,y1);c.lineTo(x-7,y1+12);c.lineTo(x+7,y1+12);c.closePath();c.fill();c.restore();
      });
    }

    const main=dropShape(540,720,rx,ry,flat);
    // interior stress lines follow the lower surface
    c.save();c.globalAlpha=.17+.22*deform;c.strokeStyle=P.schemWater;c.lineWidth=1;
    for(let j=0;j<6;j++){
      const y=650+j*28;
      c.beginPath();c.moveTo(470,y);c.quadraticCurveTo(540,y+8*deform,610,y);c.stroke();
    }
    c.restore();
    drawOutline(c,L,P,main,sd('main'),1,2.6);
    L.glowDot(c,506,692,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('glint'),intensity:.92,glow:3,twinkle:.02});

    // magenta deformation arc appears only while shape visibly changes
    const flash=L.seg(t,.58,.76,'outExpo')*(1-L.seg(t,.9,1.15,'outQuad'));
    if(flash>0)L.arcAnnotation(c,540,720,132,.18,Math.PI-.18,{color:P.magenta,width:3,p:flash,alpha:.72,arrow:0,endTicks:0});

    // comparative state strip at left: small → medium → unstable
    const s1=L.seg(t,.15,.42,'outBack'),s2=L.seg(t,.45,.72,'outBack'),s3=L.seg(t,.75,1.02,'outBack');
    miniature(c,L,P,185,1130,45,45,.02,sd('m1'),s1);
    miniature(c,L,P,185,1290,58,50,.62,sd('m2'),s2);
    miniature(c,L,P,185,1470,70,52,1.12,sd('m3'),s3);
    L.bracket(c,120,1070,250,1070,{color:P.lavender,alpha:.34,width:1.2,p:s1});
    L.bracket(c,110,1535,260,1535,{color:P.lavender,alpha:.34,width:1.2,p:s3});

    // velocity vector grows only at the end; G1 itself stays screen-fixed for the hard cut.
    const fall=L.seg(t,1.0,1.46,'outExpo');
    if(fall>0){
      c.save();c.globalAlpha=.3+.6*fall;c.strokeStyle=P.schemFlow;c.lineWidth=2.5;
      c.beginPath();c.moveTo(540,845);c.lineTo(540,845+190*fall);c.stroke();
      const y=1035;c.fillStyle=P.schemFlow;c.beginPath();c.moveTo(527,y-15);c.lineTo(540,y+9);c.lineTo(553,y-15);c.closePath();c.fill();c.restore();
      L.ticks(c,540,720,{r:150,n:18,len:7,major:6,majorLen:13,start:.15,span:Math.PI*.7*fall,color:P.lineWhite,alpha:.22*fall,width:1});
    }

    // keep the exact G1 guide visible to verify the match cut
    L.guideCircle(c,540,720,150,{color:P.lavender,alpha:.12,width:1.2,dash:[5,9]});
  }});
})();