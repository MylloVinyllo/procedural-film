// 08 · Through pores · T 12.500–14.000
// Blueprint pore network: unsaturated air/water space, split/rejoin flow, water-table transition, G3 exit.
(function(){
  'use strict';
  const ID='pore-flow',TAU=Math.PI*2;
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

  function grainPts(L,cx,cy,rx,ry,seed,n=28){
    const pts=[];
    for(let i=0;i<n;i++){
      const a=i/n*TAU,k=1+.09*L.noise1(i*.43,seed)+.035*Math.sin(a*5+seed*.01);
      pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k]);
    }
    return pts;
  }

  function waterPath(c,L,P,pts,p,seed,w=3,alpha=.7){
    if(p<=0)return;
    const n=Math.max(2,Math.round(1+(pts.length-1)*p));
    L.inkPath(c,L.smoothPts(pts.slice(0,n),false,4),{color:P.schemWater,width:w,alpha,seed,wobble:.12,tremble:.03,boilAmp:.04,taper:[5,10]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,820],circles:6,diagonals:5});
    progressGlyph(c,L,4);

    // Exact G2 source pore.
    L.guideCircle(c,540,820,118,{color:P.schemWater,alpha:.34,width:2,dash:[6,8]});
    const angle=.56,tx=540+Math.cos(angle)*86,ty=820+Math.sin(angle)*86;
    L.glowDot(c,tx,ty,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('g2'),intensity:.9,glow:2.8,twinkle:.02});

    // Grain skeleton arranged so negative space becomes the actual pore network.
    const grains=[
      [175,470,95,70],[405,450,105,75],[690,455,120,82],[925,500,92,68],
      [120,730,88,72],[330,700,105,85],[770,700,112,80],[980,760,85,70],
      [180,1010,110,78],[430,990,100,74],[690,1030,115,86],[930,1045,98,72],
      [120,1320,95,74],[340,1300,112,82],[620,1305,105,78],[860,1320,116,88],
      [250,1580,120,84],[540,1585,108,82],[825,1590,118,88]
    ];
    grains.forEach((g,i)=>{
      const pts=grainPts(L,g[0],g[1],g[2],g[3],sd('grain',i),30);
      c.save();c.globalAlpha=.45+(i%3)*.08;c.strokeStyle=P.lavender;c.lineWidth=1.2;c.beginPath();L.tracePath(c,pts,true);c.stroke();
      if(i%4===0)L.stipple(c,pts,{spacing:18,r:[.4,.9],density:.16,color:P.paleBlue,alpha:.18,seed:sd('stipple',i),boilAmp:.03});
      c.restore();
    });

    // Unsaturated air pockets remain explicit negative-space ellipses.
    const air=[
      [275,550,38,26],[585,565,48,30],[865,610,34,24],[245,865,42,28],[825,890,47,30],[510,1160,45,28]
    ];
    air.forEach((a,i)=>L.guideCircle(c,a[0],a[1],a[2],{color:P.grid,alpha:.32,width:1,dash:[3,6]}));

    // Water-table guide rises visually as lower network saturates.
    const wt=L.seg(t,.3,.75,'outExpo');
    if(wt>0){
      c.save();c.globalAlpha=.22+.35*wt;c.strokeStyle=P.paleBlue;c.lineWidth=1.4;c.setLineDash([10,8]);
      c.beginPath();c.moveTo(90,1190);c.lineTo(990,1190);c.stroke();c.restore();
      L.ticks(c,540,1190,{r:0,n:0});
    }

    // Three flow branches share the source, one stalls, one rejoins, one becomes hero.
    const p=L.seg(t,.12,1.15,'inOutCubic');
    const A=[[540,820],[500,900],[455,1015],[420,1125],[390,1230]];
    const B=[[540,820],[590,910],[625,1010],[600,1110],[640,1210],[625,1320],[590,1430]];
    const C=[[540,820],[650,845],[745,880],[810,940],[845,1030]];
    waterPath(c,L,P,A,clamp(p-.04),sd('A'),2.3,.48);
    waterPath(c,L,P,B,p,sd('B'),3.8,.82);
    waterPath(c,L,P,C,clamp(p-.1),sd('C'),2.1,.42);

    // slow dead-end fill on branch C
    const dead=L.seg(t,.65,1.3,'inOutCubic');
    if(dead>0){
      c.save();c.globalAlpha=.15+.32*dead;c.fillStyle=P.schemWater;c.beginPath();c.ellipse(845,1030,34*dead,22*dead,0,0,TAU);c.fill();c.restore();
    }

    // Lower saturated region becomes a denser connected network, not one blue slab.
    const sat=L.seg(t,.7,1.35,'outExpo');
    if(sat>0){
      const lines=[
        [[90,1250],[260,1280],[420,1260],[590,1300],[760,1275],[990,1320]],
        [[70,1395],[230,1370],[400,1420],[560,1390],[730,1435],[1010,1400]],
        [[120,1530],[300,1500],[470,1550],[650,1515],[820,1560],[990,1530]]
      ];
      lines.forEach((pts,i)=>L.inkPath(c,L.smoothPts(pts,false,4),{color:i===1?P.schemWater:P.paleBlue,width:i===1?2.8:1.4,alpha:(.18+.42*sat)*(i===1?1:.7),seed:sd('satline',i),wobble:.12,tremble:.03,boilAmp:.04}));
    }

    // Hero tracer rides B and then straightens into exact G3.
    const hero=L.seg(t,.35,1.42,'inOutCubic');
    if(hero>0){
      const pts=B.concat([[540,1510],[420,1580],[300,1640]]);
      const u=hero*(pts.length-1),i=Math.min(pts.length-2,Math.floor(u)),f=u-i,X=pts[i],Y=pts[i+1];
      const x=lerp(X[0],Y[0],f),y=lerp(X[1],Y[1],f);
      L.glowDot(c,x,y,6,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.85,glow:2.6,twinkle:.02});
    }

    const g3=L.seg(t,1.05,1.5,'outExpo');
    if(g3>0){
      const y=920;
      c.save();c.globalAlpha=.28+.62*g3;c.strokeStyle=P.schemWater;c.lineWidth=3.2;c.beginPath();
      c.moveTo(300,y);c.bezierCurveTo(420,y-22,650,y+18,780,y);c.stroke();c.restore();
      L.glowDot(c,540,y,7+7*g3,{color:P.schemCycle,core:P.glow,rays:4,seed:sd('g3'),intensity:.75+.2*g3,glow:3,twinkle:.02});
      L.bracket(c,300,y+75,780,y+75,{color:P.lavender,alpha:.3*g3,width:1.2,p:g3});
    }

    // pore gradient arrows
    const arr=L.seg(t,.4,.9,'outExpo');
    if(arr>0){
      [[450,600,470,690],[620,620,600,720],[730,1120,680,1190]].forEach((v,i)=>{
        c.save();c.globalAlpha=.25+.35*arr;c.strokeStyle=P.schemFlow;c.lineWidth=1.2;c.beginPath();c.moveTo(v[0],v[1]);c.lineTo(v[2],v[3]);c.stroke();c.restore();
      });
    }
  }});
})();