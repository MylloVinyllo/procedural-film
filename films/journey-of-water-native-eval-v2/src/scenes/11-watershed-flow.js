// 11 · A larger system · T 18.000–19.500
// Blueprint watershed: terrain contour network, tributary pulses, intake diversion and alternate branches.
(function(){
  'use strict';
  const ID='watershed-flow',TAU=Math.PI*2;
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

  const rivers=[
    [[120,470],[260,570],[370,690],[480,820],[540,920],[575,1080],[620,1260],[680,1450]],
    [[860,430],[760,560],[680,680],[610,810],[540,920]],
    [[170,900],[290,890],[410,900],[540,920]],
    [[900,980],[780,950],[650,930],[540,920]],
    [[300,300],[350,430],[405,560],[480,690]],
    [[760,1220],[710,1150],[650,1080],[575,1010]]
  ];

  function route(c,L,P,pts,seed,alpha=.6,w=2){
    L.inkPath(c,L.smoothPts(pts,false,5),{color:P.schemFlow,width:w,alpha,seed,wobble:.12,tremble:.03,boilAmp:.04,taper:[5,12]});
  }

  function contour(c,L,P,cx,cy,rx,ry,seed,alpha){
    const pts=[];
    for(let i=0;i<64;i++){
      const a=i/64*TAU,k=1+.07*Math.sin(a*3+seed*.01)+.025*L.noise1(i*.31,seed);
      pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k]);
    }
    L.inkPath(c,pts,{closed:true,color:P.lavender,width:1,alpha,seed,wobble:.08,tremble:.02,boilAmp:.03});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,920],circles:7,diagonals:5});
    progressGlyph(c,L,5);

    // topographic contours establish a real basin rather than abstract network alone
    const cont=L.seg(t,0,.42,'outExpo');
    if(cont>0){
      [[540,900,470,600],[520,900,390,500],[555,900,310,405],[560,900,225,300]].forEach((v,i)=>contour(c,L,P,v[0],v[1],v[2],v[3],sd('cont',i),(.08+.08*i)*cont));
    }

    // river network persists from the previous illustrated landscape
    rivers.forEach((pts,i)=>route(c,L,P,pts,sd('river',i),i===0?.72:.42,i===0?3:1.7));

    // downstream pulse travels through branches into the trunk
    const q=L.onTwos(t);
    rivers.forEach((pts,i)=>{
      for(let k=0;k<3;k++){
        const u=((q*.32+k*.27+i*.11)%1);
        const seg=Math.min(pts.length-2,Math.floor(u*(pts.length-1)));
        const f=u*(pts.length-1)-seg,A=pts[seg],B=pts[seg+1];
        const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
        c.save();c.globalAlpha=i===0?.6:.3;c.fillStyle=P.schemWater;c.beginPath();c.arc(x,y,i===0?3.4:2.2,0,TAU);c.fill();c.restore();
      }
    });

    // runoff, groundwater and intake insets. No labels, geometry explains each branch.
    const inP=L.seg(t,.12,.55,'outBack');
    if(inP>0){
      // runoff inset: slope + arrows
      L.guideCircle(c,190,1340,96,{color:P.lavender,alpha:.22*inP,width:1.2});
      L.inkPath(c,[[120,1365],[180,1320],[255,1285]],{color:P.lavender,width:1.4,alpha:.45*inP,seed:sd('runoff-slope'),wobble:.1,tremble:.03});
      for(let i=0;i<3;i++)L.inkPath(c,[[145+i*25,1320-i*10],[165+i*28,1360-i*3]],{color:P.schemFlow,width:1.5,alpha:.5*inP,seed:sd('runoff-a',i),wobble:.05,tremble:.02,taper:[3,6]});

      // groundwater inset: porous grains + emerging line
      L.guideCircle(c,400,1530,96,{color:P.lavender,alpha:.22*inP,width:1.2});
      [[365,1500,24],[420,1495,28],[385,1550,26],[440,1555,22]].forEach((v,i)=>L.guideCircle(c,v[0],v[1],v[2],{color:P.lavender,alpha:.35*inP,width:1}));
      L.inkPath(c,[[330,1580],[375,1560],[420,1570],[470,1545]],{color:P.schemWater,width:2.2,alpha:.5*inP,seed:sd('gw'),wobble:.08,tremble:.02});

      // ocean continuation inset: trunk keeps moving away
      L.guideCircle(c,685,1570,96,{color:P.lavender,alpha:.18*inP,width:1.2});
      for(let i=0;i<4;i++)L.inkPath(c,[[620,1540+i*18],[750,1540+i*18+8*Math.sin(i)]],{color:P.schemFlow,width:1.1,alpha:.25*inP,seed:sd('ocean',i),wobble:.08,tremble:.02});
    }

    // public-water intake reservoir and diversion
    const intake=L.seg(t,.3,1.15,'inOutCubic');
    const rx=835,ry=735;
    L.guideCircle(c,rx,ry,118,{color:P.lavender,alpha:.18+.18*intake,width:1.4,dash:[5,8]});
    c.save();c.globalAlpha=.12+.25*intake;c.strokeStyle=P.schemWater;c.lineWidth=1.4;
    for(let r=42;r<=90;r+=16){c.beginPath();c.arc(rx,ry,r,0,TAU);c.stroke();}c.restore();
    // diversion branch grows out of main trunk but downstream remains intact
    if(intake>0){
      const pts=[[540,920],[635,885],[715,830],[780,770],[835,735]];
      const n=Math.max(2,Math.round(pts.length*intake));
      route(c,L,P,pts.slice(0,n),sd('intake-line'),.78,3);
      const u=intake*(pts.length-1),i=Math.min(pts.length-2,Math.floor(u)),f=u-i,A=pts[i],B=pts[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.86,glow:2.8,twinkle:.02});
    }

    // flow continuing downstream confirms diversion is partial, not total.
    const downstream=L.seg(t,.45,1.1,'outExpo');
    if(downstream>0){
      route(c,L,P,[[540,920],[575,1080],[620,1260],[680,1450]],sd('downstream'),.32+.25*downstream,2.1);
      L.glowDot(c,680,1450,3.5,{color:P.schemWater,core:P.glow,rays:0,seed:sd('down-dot'),intensity:.45,glow:1.6,twinkle:.01});
    }

    // intake gate/branch change gets the only magenta moment
    const gate=L.seg(t,.72,.9,'outBack')*(1-L.seg(t,1.05,1.3,'outQuad'));
    if(gate>0)L.guideCircle(c,715,830,34+50*gate,{color:P.magenta,alpha:.48*(1-gate*.25),width:2.4,quadrants:7});

    // exit channel straightens into the treatment train
    const exit=L.seg(t,1.1,1.5,'outExpo');
    if(exit>0){
      c.save();c.globalAlpha=.28+.62*exit;c.strokeStyle=P.schemWater;c.lineWidth=4;c.beginPath();c.moveTo(835,735);c.lineTo(990,735);c.stroke();c.restore();
      L.bracket(c,800,665,1000,665,{color:P.lavender,alpha:.3*exit,width:1.2,p:exit});
    }
  }});
})();