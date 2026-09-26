// 15 · Cleaned again · T 25.500–27.500
// Blueprint wastewater return: collection spiral → screen/grit → settling → aerated biology → clarification/disinfection → G3 effluent.
(function(){
  'use strict';
  const ID='wastewater-return',TAU=Math.PI*2;
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

  function box(c,L,P,x,y,w,h,seed,alpha=.65){
    const pts=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
    c.save();c.globalAlpha=alpha;c.strokeStyle=P.lavender;c.lineWidth=1.4;c.beginPath();L.tracePath(c,pts,true);c.stroke();c.restore();
    return pts;
  }

  function water(c,L,P,pts,seed,alpha=.7,w=3){
    L.inkPath(c,L.smoothPts(pts,false,4),{color:P.schemWater,width:w,alpha,seed,wobble:.1,tremble:.03,boilAmp:.03,taper:[5,10]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),q=L.onTwos(t);
    L.blueprint(c,{seed:sd('bp'),center:[540,920],circles:7,diagonals:5});
    progressGlyph(c,L,7);

    // incoming drain spiral unrolls into collector pipe
    const unroll=L.seg(t,0,.45,'outExpo');
    c.save();c.strokeStyle=P.schemFlow;c.lineWidth=2.5;c.globalAlpha=.28+.45*unroll;c.beginPath();
    for(let i=0;i<70;i++){
      const u=i/69,remain=1-unroll;
      const a=u*TAU*1.8*remain,r=95*(1-u)*remain+14;
      const x=220+Math.cos(a)*r+u*210*unroll,y=420+Math.sin(a)*r*.55+u*60*unroll;
      i?c.lineTo(x,y):c.moveTo(x,y);
    }c.stroke();c.restore();

    // collection/screen chamber
    box(c,L,P,120,520,320,270,sd('screen'));
    for(let i=0;i<8;i++)L.inkPath(c,[[190+i*25,545],[190+i*25,770]],{color:P.lavender,width:2,alpha:.42,seed:sd('bar',i),wobble:.08,tremble:.02});
    const screen=L.seg(t,.18,.7,'outExpo');
    if(screen>0){
      const rr=L.rng(sd('debris'));
      for(let i=0;i<18;i++){
        const startX=130+rr()*250,startY=565+rr()*170;
        const x=lerp(startX,Math.min(startX,180+(i%6)*25),screen),y=startY+12*Math.sin(q+i);
        c.save();c.globalAlpha=.28+.35*screen;c.fillStyle=i%2?P.flocBody:P.paleBlue;c.beginPath();c.arc(x,y,3+rr()*5,0,TAU);c.fill();c.restore();
      }
      water(c,L,P,[[120,650],[260,650],[440,650],[520,730]],sd('screen-water'),.35+.38*screen,2.8);
    }

    // grit / primary settling basin
    box(c,L,P,500,520,450,360,sd('settle'));
    const set=L.seg(t,.45,1.2,'inOutCubic');
    const r2=L.rng(sd('grit'));
    for(let i=0;i<28;i++){
      const x=535+r2()*370,sy=575+r2()*95,fall=(i%5)*12+170*set,y=Math.min(830,sy+fall);
      c.save();c.globalAlpha=.24+.45*set;c.fillStyle=i%3===0?P.stoneBody:P.flocBody;c.beginPath();c.arc(x,y,2+r2()*5,0,TAU);c.fill();c.restore();
    }
    c.save();c.globalAlpha=.16+.3*set;c.fillStyle=P.flocBody;c.beginPath();c.moveTo(520,845);c.lineTo(930,845);c.lineTo(870,815);c.lineTo(580,815);c.closePath();c.fill();c.restore();
    water(c,L,P,[[520,590],[700,575],[900,590]],sd('top-water'),.25+.35*set,2);

    // biological aeration basin
    box(c,L,P,110,950,530,430,sd('bio'));
    const bio=L.seg(t,.85,1.6,'inOutCubic');
    // dense biological/floc texture
    const rb=L.rng(sd('bio-floc'));
    for(let i=0;i<62;i++){
      const x=145+rb()*460,y=1000+rb()*320,rr=2+rb()*6;
      c.save();c.globalAlpha=.15+.38*bio;c.strokeStyle=i%5===0?P.schemWater:P.lavender;c.lineWidth=.8;c.beginPath();c.arc(x,y,rr,0,TAU);c.stroke();c.restore();
    }
    // aeration bubbles rise continuously on twos
    for(let i=0;i<18;i++){
      const x=145+(i%9)*52,y=1340-((q*90+i*57)%330),rr=2+(i%4)*1.4;
      c.save();c.globalAlpha=.18+.46*bio;c.strokeStyle=P.paleBlue;c.lineWidth=.9;c.beginPath();c.arc(x,y,rr,0,TAU);c.stroke();c.restore();
    }
    const mag=L.seg(t,1.0,1.18,'outExpo')*(1-L.seg(t,1.3,1.5,'outQuad'));
    if(mag>0)L.guideCircle(c,390,1135,70+65*mag,{color:P.magenta,alpha:.45*(1-mag*.2),width:2.4,quadrants:8});

    // clarifier / disinfection on right
    const clar=L.seg(t,1.25,1.95,'outExpo');
    if(clar>0){
      L.guideCircle(c,800,1110,165,{color:P.lavender,alpha:.18+.25*clar,width:1.6});
      L.guideCircle(c,800,1110,72,{color:P.schemWater,alpha:.15+.22*clar,width:1.1});
      // radial slow flow + downward settled solids
      for(let k=0;k<12;k++){
        const a=k/12*TAU;
        L.inkPath(c,[[800,1110],[800+Math.cos(a)*130,1110+Math.sin(a)*130]],{color:P.lavender,width:.9,alpha:.14*clar,seed:sd('rad',k),wobble:.05,tremble:.01});
      }
      const rc=L.rng(sd('clar-floc'));
      for(let i=0;i<18;i++){
        const a=rc()*TAU,rad=25+rc()*120,x=800+Math.cos(a)*rad,y=1110+Math.sin(a)*rad;
        const fall=clar*50*(i%3);
        c.save();c.globalAlpha=.2+.3*clar;c.fillStyle=P.flocBody;c.beginPath();c.arc(x,y+fall,2+rc()*4,0,TAU);c.fill();c.restore();
      }
      // clear contact channel below clarifier
      box(c,L,P,650,1330,300,180,sd('contact'),.48);
      for(let i=0;i<4;i++)water(c,L,P,[[680,1370+i*30],[920,1370+i*30]],sd('contact-flow',i),.18+.3*clar,1.2);
    }

    // water-phase process path / tracer
    const hero=L.seg(t,.05,1.95,'inOutCubic');
    const path=[[220,420],[250,520],[300,650],[440,650],[600,590],[870,590],[650,900],[500,980],[350,1140],[600,1250],[800,1110],[800,1400],[950,1420]];
    if(hero>0){
      const u=hero*(path.length-1),i=Math.min(path.length-2,Math.floor(u)),f=u-i,A=path[i],B=path[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.9,glow:3,twinkle:.02});
    }

    // exact G3 effluent channel on exit
    const exit=L.seg(t,1.62,2.0,'outExpo');
    if(exit>0){
      c.save();c.globalAlpha=.3+.62*exit;c.strokeStyle=P.schemWater;c.lineWidth=3.6;c.beginPath();
      c.moveTo(300,920);c.bezierCurveTo(420,900,650,940,780,920);c.stroke();c.restore();
      L.glowDot(c,540,920,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('g3'),intensity:.82,glow:3,twinkle:.02});
      L.bracket(c,300,995,780,995,{color:P.lavender,alpha:.28*exit,width:1.2,p:exit});
    }
  }});
})();