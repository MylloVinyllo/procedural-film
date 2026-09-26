// 12 · Made usable · T 19.500–22.000
// Continuous drinking-water treatment train: mix/flocculation → sedimentation → filtration → contact/storage → pipe.
(function(){
  'use strict';
  const ID='treatment-train',TAU=Math.PI*2;
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
    c.fillStyle=P.schemWater;c.beginPath();c.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,0,TAU);c.fill();c.restore();
  }

  function tank(c,L,P,x,y,w,h,seed,alpha=.7){
    const pts=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
    c.save();c.globalAlpha=alpha;c.strokeStyle=P.lavender;c.lineWidth=1.5;c.beginPath();L.tracePath(c,pts,true);c.stroke();c.restore();
    L.guideCircle(c,x+w/2,y+h/2,Math.min(w,h)*.32,{color:P.lavender,alpha:.06,width:1,dash:[4,9]});
  }

  function waterLine(c,L,P,pts,seed,alpha=.7,w=3){
    L.inkPath(c,L.smoothPts(pts,false,4),{color:P.schemWater,width:w,alpha,seed,wobble:.1,tremble:.03,boilAmp:.03,taper:[5,10]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,950],circles:7,diagonals:5});
    progressGlyph(c,L,6);

    // overall process spine
    const spine=[[110,470],[300,470],[390,650],[540,650],[690,650],[820,820],[700,1000],[540,1000],[380,1160],[520,1350],[720,1350],[860,1540],[940,1540]];
    waterLine(c,L,P,spine,sd('spine'),.25,1.5);

    // 1) intake / rapid mix
    tank(c,L,P,90,360,300,240,sd('mix'));
    const mix=L.seg(t,0,.55,'outExpo');
    c.save();c.globalAlpha=.16+.4*mix;c.strokeStyle=P.schemFlow;c.lineWidth=1.4;
    for(let i=0;i<6;i++){
      const a=t*5+i/6*TAU,r=24+i*9;
      c.beginPath();c.arc(240,480,r,a,a+Math.PI*.8);c.stroke();
    }c.restore();
    const r1=L.rng(sd('mix-p'));
    for(let i=0;i<34;i++){
      const a=r1()*TAU,rad=20+r1()*120,x=240+Math.cos(a)*rad,y=480+Math.sin(a)*rad*.65;
      const grow=L.seg(t,.18+(i%5)*.025,.9,'inOutCubic');
      c.save();c.globalAlpha=.2+.4*grow;c.fillStyle=i%3?P.paleBlue:P.schemWater;c.beginPath();c.arc(x,y,1.5+r1()*2.5,0,TAU);c.fill();c.restore();
    }
    const mag=L.seg(t,.28,.46,'outExpo')*(1-L.seg(t,.55,.8,'outQuad'));
    if(mag>0)L.guideCircle(c,240,480,45+70*mag,{color:P.magenta,alpha:.5*(1-mag*.2),width:2.5,quadrants:8});

    // 2) flocculation basin: small particles become larger clusters
    tank(c,L,P,420,520,470,270,sd('floc'));
    const fl=L.seg(t,.35,1.2,'inOutCubic');
    const r2=L.rng(sd('flocs'));
    for(let i=0;i<26;i++){
      const x=460+r2()*390,y=570+r2()*165;
      const rr=lerp(2.5,8+(i%5)*2.5,fl);
      c.save();c.globalAlpha=.22+.5*fl;c.strokeStyle=i%4===0?P.schemCycle:P.lavender;c.lineWidth=1;
      c.beginPath();c.arc(x,y,rr,0,TAU);c.stroke();
      if(fl>.55&&i%3===0){c.beginPath();c.arc(x+rr*.8,y-rr*.3,rr*.65,0,TAU);c.stroke();}
      c.restore();
    }

    // 3) sedimentation: tank with sloped solids bed, particles sink while water continues high
    tank(c,L,P,130,830,760,300,sd('sed'));
    const sed=L.seg(t,.72,1.65,'inOutCubic');
    c.save();c.globalAlpha=.2+.45*sed;c.fillStyle=L.rgba(P.flocBody,.5);
    c.beginPath();c.moveTo(150,1085);c.lineTo(870,1085);c.lineTo(790,1040);c.lineTo(230,1040);c.closePath();c.fill();c.restore();
    const r3=L.rng(sd('settle'));
    for(let i=0;i<30;i++){
      const x=180+r3()*650,sy=870+r3()*80,fall=(i%5)*14+145*sed;
      const y=Math.min(1030,sy+fall);
      c.save();c.globalAlpha=.25+.45*sed;c.fillStyle=P.flocBody;c.beginPath();c.arc(x,y,3+r3()*6,0,TAU);c.fill();c.restore();
    }
    waterLine(c,L,P,[[155,875],[360,850],[600,850],[865,875]],sd('sed-water'),.35+.35*sed,2.5);

    // 4) filter column: three visibly different media layers, water threads through pores
    tank(c,L,P,140,1180,420,420,sd('filter'));
    const filter=L.seg(t,1.15,2.0,'inOutCubic');
    const layers=[
      {y:1210,h:95,col:P.filterGravel,r:16},
      {y:1305,h:110,col:P.filterSand,r:9},
      {y:1415,h:135,col:P.paleBlue,r:5}
    ];
    layers.forEach((o,li)=>{
      c.save();c.globalAlpha=.15+.28*filter;c.fillStyle=o.col;c.fillRect(165,o.y,370,o.h);c.restore();
      const rr=L.rng(sd('media',li));
      for(let i=0;i<28-li*4;i++){
        const x=175+rr()*350,y=o.y+10+rr()*(o.h-20);
        c.save();c.globalAlpha=.25+.35*filter;c.strokeStyle=li===2?P.paleBlue:P.lavender;c.lineWidth=.8;c.beginPath();c.arc(x,y,o.r*(.45+rr()*.7),0,TAU);c.stroke();c.restore();
      }
    });
    if(filter>0){
      for(let i=0;i<6;i++){
        const x=205+i*58+8*Math.sin(i),y0=1195,y1=1570;
        const p=filter;
        L.inkPath(c,[[x,y0],[x+8*Math.sin(i+1),1320],[x-5*Math.cos(i),1450],[x+12*Math.sin(i*.7),y1]],{color:P.schemWater,width:1.6,alpha:.22+.42*p,seed:sd('filter-flow',i),wobble:.08,tremble:.02});
      }
    }

    // 5) contact / clear-water chamber and 6) storage tank
    tank(c,L,P,610,1190,310,220,sd('contact'));
    const clear=L.seg(t,1.55,2.25,'outExpo');
    if(clear>0){
      for(let i=0;i<5;i++)waterLine(c,L,P,[[635,1240+i*28],[895,1240+i*28]],sd('contact-flow',i),.18+.28*clear,1.2);
      // process dots decrease across the chamber
      const rr=L.rng(sd('contact-dots'));
      for(let i=0;i<18;i++){
        const x=650+rr()*210,y=1220+rr()*150;
        c.save();c.globalAlpha=.18*(1-clear*.5);c.fillStyle=P.paleBlue;c.beginPath();c.arc(x,y,1.5+rr()*2,0,TAU);c.fill();c.restore();
      }
    }

    // circular storage reservoir below/right
    const store=L.seg(t,1.85,2.45,'outBack');
    if(store>0){
      L.guideCircle(c,760,1580,120,{color:P.lavender,alpha:.28+.2*store,width:1.7});
      L.guideCircle(c,760,1580,92,{color:P.schemWater,alpha:.18+.26*store,width:1.3});
      c.save();c.globalAlpha=.18+.25*store;c.strokeStyle=P.schemWater;c.lineWidth=1;
      for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(690,1580+i*22);c.lineTo(830,1580+i*22);c.stroke();}c.restore();
    }

    // tracer moves through the entire train, always in water phase
    const hero=L.seg(t,.1,2.45,'inOutCubic');
    if(hero>0){
      const pts=[[110,470],[240,480],[390,650],[600,650],[820,820],[650,860],[450,850],[300,900],[330,1160],[330,1350],[330,1540],[560,1540],[640,1500],[760,1580],[880,1540],[990,1540]];
      const u=hero*(pts.length-1),i=Math.min(pts.length-2,Math.floor(u)),f=u-i,A=pts[i],B=pts[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.9,glow:3,twinkle:.02});
    }

    // final clear-water path straightens into pipe cross-section for shot 13
    const exit=L.seg(t,2.1,2.5,'outExpo');
    if(exit>0){
      c.save();c.globalAlpha=.3+.6*exit;c.strokeStyle=P.schemWater;c.lineWidth=4;c.beginPath();c.moveTo(760,1580);c.lineTo(1010,1580);c.stroke();c.restore();
      L.guideCircle(c,940,1580,58,{color:P.schemFlow,alpha:.22+.28*exit,width:1.5,dash:[4,7]});
    }
  }});
})();