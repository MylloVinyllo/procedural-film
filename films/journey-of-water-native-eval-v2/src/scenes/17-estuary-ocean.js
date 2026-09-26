// 17 · Into the ocean · T 29.000–31.000
// Illustrated estuary-to-ocean scale transition with multiple wave scales and a macro push into exact G4.
(function(){
  'use strict';
  const ID='estuary-ocean',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function cloud(c,L,P,x,y,s,seed,alpha=.45){
    for(let i=0;i<5;i++){
      const cx=x+(i-2)*75*s,cy=y+Math.sin(i*.8)*18*s,rx=(90+(i%3)*20)*s,ry=(50+(i%2)*16)*s;
      const pts=L.ellipsePts(cx,cy,rx,ry,34);
      c.save();c.globalAlpha=alpha;c.fillStyle=P.cloudBody;c.beginPath();L.tracePath(c,pts,true);c.fill();
      L.hatch(c,pts,{angle:.75,spacing:10,width:1,color:P.cloudShade,alpha:.22,density:.4,length:[12,38],seed:seed+i,clip:true});c.restore();
    }
  }

  function reed(c,L,P,x,y,h,seed,t){
    const sway=Math.sin(L.onTwos(t)*2+seed*.01)*10;
    L.inkPath(c,[[x,y],[x+sway*.4,y-h*.5],[x+sway,y-h]],{color:P.leaf,width:2,alpha:.56,seed,wobble:.8,tremble:.16,taper:[4,12]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),q=L.onTwos(t);
    const macro=L.seg(t,1.45,2.0,'inOutCubic');

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*6,seed:sd('stripes')});

    // sky / horizon
    c.save();c.fillStyle=L.rgba(P.stripeSky,.7);c.fillRect(0,220,1080,620);c.restore();
    cloud(c,L,P,220,430,.8,sd('cloud1'),.42);cloud(c,L,P,850,360,.6,sd('cloud2'),.34);
    // sun
    c.save();c.globalAlpha=.75;c.fillStyle=P.sun;c.beginPath();c.arc(810,450,48,0,TAU);c.fill();c.restore();
    for(let k=0;k<14;k++){
      const a=k/14*TAU;
      L.inkPath(c,[[810+Math.cos(a)*62,450+Math.sin(a)*62],[810+Math.cos(a)*86,450+Math.sin(a)*86]],{color:P.annYellow,width:1.5,alpha:.35,seed:sd('sunray',k),wobble:.3,tremble:.06});
    }

    // distant birds / scale
    for(let i=0;i<5;i++){
      const x=180+i*140,y=520+(i%2)*45,span=18+(i%3)*5;
      L.inkPath(c,[[x-span,y],[x,y-7],[x+span,y]],{color:P.inkSoft,width:1.3,alpha:.35,seed:sd('bird',i),wobble:.4,tremble:.08});
    }

    // estuary water from midframe down
    c.save();c.fillStyle=P.seaBody;c.globalAlpha=.96;c.fillRect(0,760,1080,1160);c.restore();

    // distant headlands and a pale tidal bar establish the mouth before the open sea.
    const headL=[[0,760],[0,680],[120,650],[250,695],[335,760]];
    const headR=[[1080,760],[1080,645],[955,625],[860,690],[790,760]];
    [headL,headR].forEach((pts,i)=>{
      c.save();c.globalAlpha=.68;c.fillStyle=i?P.sage:P.riverBank;c.beginPath();L.tracePath(c,pts,true);c.fill();
      L.hatch(c,pts,{angle:i?-.72:.72,spacing:10,width:1.05,color:P.inkSoft,alpha:.28,density:.42,length:[14,42],seed:sd('head',i),clip:true});
      L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2,alpha:.5,seed:sd('head-o',i),wobble:.8,tremble:.15});c.restore();
    });
    const tidal=L.ellipsePts(730,1030,180,46,42,.08);
    c.save();c.globalAlpha=.48;c.fillStyle=P.filterSand;c.beginPath();L.tracePath(c,tidal,true);c.fill();
    L.hatch(c,tidal,{angle:.08,spacing:9,width:1,color:P.inkSoft,alpha:.28,density:.42,length:[12,36],seed:sd('tidal'),clip:true});c.restore();

    // river plume / mixing bands use direction, not opaque colour blocks
    const plume=[
      [[0,900],[220,930],[450,1000],[720,1070],[1080,1120]],
      [[0,1020],[230,1050],[500,1130],[760,1190],[1080,1240]],
      [[0,1160],[260,1190],[520,1280],[810,1335],[1080,1375]]
    ];
    plume.forEach((pts,i)=>L.inkPath(c,L.smoothPts(pts,false,4),{color:i===0?P.waterDeep:P.tealDeep,width:i===0?4.2:2.1,alpha:.42+.12*(i===0),seed:sd('plume',i),wobble:.25,tremble:.06,boilAmp:.1}));
    // inner river-water streaks spread sideways through the estuary, making mixing legible.
    for(let i=0;i<7;i++){
      const y=875+i*58;
      L.inkPath(c,[[20,y],[190,y+10*Math.sin(i)],[390,y+24],[620,y+46],[850,y+58]],{color:i%2?P.waterDeep:P.annBlue,width:i%2?1.4:1.8,alpha:.22+.1*(i%3),seed:sd('mix-streak',i),wobble:.2,tremble:.05,taper:[5,12]});
    }

    // multiple wave scales
    for(let band=0;band<7;band++){
      const y=820+band*145;
      const pts=[];
      for(let x=-80;x<=1160;x+=80){
        const amp=12+band*2;
        pts.push([x,y+Math.sin(x/120+q*.8+band)*amp]);
      }
      L.inkPath(c,L.smoothPts(pts,false,3),{color:band%3===0?P.white:P.seaDeep,width:band%3===0?2.1:1.35,alpha:band%3===0?.4:.34,seed:sd('wave',band),wobble:.25,tremble:.06,boilAmp:.1});
    }
    // small capillary ripples around future G4 patch
    for(let i=0;i<12;i++){
      const r=65+i*13,a0=-.3+.04*i,a1=Math.PI+.2-.03*i;
      L.arcAnnotation(c,540,760+230*(1-macro),r,a0,a1,{color:i%3===0?P.white:P.tealDeep,width:i%3===0?1.2:.8,p:1,alpha:.12+.1*(i%3)});
    }

    // midground wavelets run at a different scale and phase from the broad swells.
    for(let row=0;row<8;row++){
      const y=930+row*92;
      for(let j=0;j<7;j++){
        const x=80+j*155+35*Math.sin(row*.8+j);
        const w=45+12*((j+row)%3);
        L.inkPath(c,[[x-w,y],[x,y-5-4*Math.sin(q+row+j)],[x+w,y]],{color:row%3===0?P.waterFoam:P.seaDeep,width:row%3===0?1.5:1,alpha:row%3===0?.32:.2,seed:sd('wavelet',row,j),wobble:.18,tremble:.04,taper:[4,7]});
      }
    }

    // opposite-bank foreground sliver makes the estuary read as an opening between shores.
    const shoreR=[[1080,1490],[960,1460],[900,1540],[870,1680],[900,1920],[1080,1920]];
    c.save();c.globalAlpha=.66;c.fillStyle=P.riverBank;c.beginPath();L.tracePath(c,shoreR,true);c.fill();
    L.hatch(c,shoreR,{angle:-.72,spacing:10,width:1.05,color:P.inkSoft,alpha:.3,density:.45,length:[14,42],seed:sd('shoreR'),clip:true});
    L.inkPath(c,shoreR,{closed:true,color:P.inkSoft,width:2.2,alpha:.56,seed:sd('shoreR-o'),wobble:.8,tremble:.16});c.restore();

    // foreground shoreline/reeds frame the water
    const shore=[[0,1370],[150,1310],[270,1370],[340,1510],[310,1920],[0,1920]];
    c.save();c.fillStyle=P.riverBank;c.globalAlpha=.9;c.beginPath();L.tracePath(c,shore,true);c.fill();
    L.hatch(c,shore,{angle:.75,spacing:9,width:1.1,color:P.inkSoft,alpha:.38,density:.48,length:[14,45],seed:sd('shore'),clip:true});
    L.inkPath(c,shore,{closed:true,color:P.inkSoft,width:2.5,seed:sd('shore-o'),wobble:.9,tremble:.18});c.restore();
    for(let i=0;i<11;i++)reed(c,L,P,20+i*34,1720-(i%3)*18,140+(i%4)*28,sd('reed',i),t);

    // local foam only at small breaking crests
    for(let i=0;i<18;i++){
      const x=350+i*42,y=1320+28*Math.sin(i*.7+q*.8);
      if(i%3!==0)continue;
      c.save();c.globalAlpha=.35;c.fillStyle=P.waterFoam;c.beginPath();c.arc(x,y,3+(i%4),0,TAU);c.fill();c.restore();
    }

    // tracer becomes tiny within the reservoir and then visually subordinate
    const hero=L.seg(t,.05,1.05,'inOutCubic');
    if(hero>0){
      const x=lerp(250,690,hero),y=lerp(1050,1180,hero);
      L.inkPath(c,[[x-80,y-16],[x,y],[x+100,y+18]],{color:P.annBlue,width:2.4,alpha:.45*(1-.4*hero),seed:sd('hero-line'),wobble:.12,tremble:.03,taper:[5,10]});
      L.glowDot(c,x,y,lerp(7,4,hero),{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.65,glow:2,twinkle:.02});
    }

    // solar-energy cue before macro transition
    const sun=L.seg(t,.75,1.45,'outExpo');
    if(sun>0)L.arcAnnotation(c,810,450,310,2.2,3.75,{color:P.annYellow,width:2,p:sun,arrow:9,alpha:.38});

    // G4 macro push: world recedes, exact screen-space guide appears over sunlit surface patch.
    if(macro>0){
      c.save();c.globalAlpha=.08+.18*macro;c.fillStyle=P.waterPale;c.beginPath();c.arc(540,760,165+120*macro,0,TAU);c.fill();c.restore();
      L.guideCircle(c,540,760,165,{color:P.annYellow,alpha:.18+.36*macro,width:2,dash:[5,8]});
      for(let i=0;i<9;i++){
        const y=700+i*18;
        L.inkPath(c,[[400,y],[680,y+5*Math.sin(i)]],{color:i%3===0?P.white:P.tealDeep,width:1.1,alpha:.16+.2*macro,seed:sd('macro-ripple',i),wobble:.16,tremble:.04});
      }
    }
  }});
})();