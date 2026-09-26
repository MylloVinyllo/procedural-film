// 04 · Through the air · T 5.000–7.000
// Illustrated fall through layered rain toward a leaf canopy.
(function(){
  'use strict';
  const ID='rain-fall',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function dropPts(cx,cy,rx,ry,flat=.58){
    const pts=[],n=72;
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      let x=Math.cos(a)*rx,y=Math.sin(a)*ry;
      if(y>0){const u=y/ry;y*=1-flat*.18*u*u;x*=1+flat*.08*u;}
      pts.push([cx+x,cy+y]);
    }
    return pts;
  }

  function heroDrop(c,L,P,x,y,t){
    const q=L.onTwos(t);
    const flex=Math.sin(q*TAU*1.6)*4.5;
    const pts=dropPts(x,y,105+flex,90-flex*.3,.62);
    c.save();c.fillStyle=P.waterPale;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.04,spacing:10,width:1.3,color:P.waterDeep,alpha:.56,density:(hx,hy)=>clamp((hy-y)/(95)),length:[16,54],seed:sd('hero-h'),clip:true});
    L.inkPath(c,pts,{closed:true,color:P.ink,width:4.6,seed:sd('hero'),wobble:1.05,tremble:.22,boilAmp:.36,double:{offset:2.4,width:1,alpha:.18,seed:sd('hero-d')}});
    L.inkPath(c,[[x-60,y-30],[x-48,y-50],[x-24,y-58]],{color:P.white,width:5.2,alpha:.78,seed:sd('hl'),wobble:.4,tremble:.1,taper:[4,8]});
    L.glowDot(c,x-34,y-28,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('glint'),intensity:.72,glow:2.4,twinkle:.02});
    c.restore();
  }

  function leaf(c,L,P,o,seed){
    const x=o.x,y=o.y,s=o.s,rot=o.rot;
    const pts=[];
    for(let i=0;i<=30;i++){
      const u=i/30;
      const xx=(u-.5)*420*s;
      const half=Math.sin(Math.PI*u)*120*s*(.9+.1*Math.sin(u*5));
      pts.push([xx,-half]);
    }
    for(let i=30;i>=0;i--){
      const u=i/30,xx=(u-.5)*420*s,half=Math.sin(Math.PI*u)*120*s*(.9+.1*Math.sin(u*5));
      pts.push([xx,half]);
    }
    const cr=Math.cos(rot),sr=Math.sin(rot);
    const T=pts.map(p=>[x+p[0]*cr-p[1]*sr,y+p[0]*sr+p[1]*cr]);
    c.save();c.fillStyle=P.leafWet;c.beginPath();L.tracePath(c,T,true);c.fill();
    L.hatch(c,T,{angle:rot+.75,spacing:9,width:1.2,color:P.tealDeep,alpha:.43,density:.55,length:[16,52],seed:seed,clip:true});
    L.inkPath(c,T,{closed:true,color:P.inkSoft,width:2.7,seed:seed+1,wobble:1.2,tremble:.25,boilAmp:.4});
    // midrib
    const A=[x-205*s*cr,y-205*s*sr],B=[x+205*s*cr,y+205*s*sr];
    L.inkPath(c,[A,B],{color:P.tealDeep,width:2.2,alpha:.78,seed:seed+2,wobble:.6,tremble:.14});
    // side veins
    for(let k=1;k<8;k++){
      const u=k/8,px=(u-.5)*360*s,py=0;
      for(const side of [-1,1]){
        const len=70*s*(.75+.25*Math.sin(k));
        const vx=px,vy=side*len*Math.sin(Math.PI*u);
        const X=x+vx*cr-vy*sr,Y=y+vx*sr+vy*cr;
        const MX=x+px*cr,YM=y+px*sr;
        L.inkPath(c,[[MX,YM],[X,Y]],{color:P.tealDeep,width:1.05,alpha:.5,seed:seed+10+k+(side>0?20:0),wobble:.45,tremble:.1,taper:[3,7]});
      }
    }
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const p=t/info.dur;
    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*10,seed:sd('stripes')});

    // cloud ceiling retreats upward while lower landscape approaches
    const skyShift=260*p;
    c.save();c.globalAlpha=.82;c.fillStyle=P.stormGray;
    const cloud=[
      [0,260-skyShift],[170,185-skyShift],[350,245-skyShift],[535,165-skyShift],[720,235-skyShift],[920,175-skyShift],[1080,245-skyShift],[1080,0],[0,0]
    ];
    c.beginPath();L.tracePath(c,cloud,true);c.fill();
    L.hatch(c,cloud,{angle:.75,spacing:11,width:1.1,color:P.inkSoft,alpha:.28,density:.5,length:[18,55],seed:sd('cloud-h'),clip:true});
    L.inkPath(c,cloud,{closed:true,color:P.inkSoft,width:2,alpha:.45,seed:sd('cloud-o'),wobble:1.2,tremble:.22});
    c.restore();

    // distant hills / ground rise, establishing fall depth
    const groundY=1710-520*p;
    c.save();c.globalAlpha=.55;c.fillStyle=P.sage;c.beginPath();
    c.moveTo(0,groundY+120);c.quadraticCurveTo(240,groundY-40,480,groundY+50);c.quadraticCurveTo(760,groundY-110,1080,groundY+30);c.lineTo(1080,1920);c.lineTo(0,1920);c.closePath();c.fill();c.restore();

    // three rain layers with distinct parallax speed and width
    const layers=[
      {n:34,speed:1050,alpha:.22,w:.8,len:36,seed:10},
      {n:26,speed:1450,alpha:.36,w:1.2,len:58,seed:20},
      {n:16,speed:2050,alpha:.52,w:1.8,len:86,seed:30}
    ];
    layers.forEach((o,li)=>{
      const r=L.rng(sd('rain',o.seed));
      c.save();c.strokeStyle=li===2?P.waterDeep:P.teal;c.lineCap='round';c.lineWidth=o.w;c.globalAlpha=o.alpha;
      for(let i=0;i<o.n;i++){
        const x=20+r()*1040+(li-1)*14*Math.sin(i);
        const base=r()*2100;
        const y=((base+(t*o.speed))%2200)-140;
        const slant=10+li*6;
        c.beginPath();c.moveTo(x,y);c.lineTo(x-slant,y+o.len);c.stroke();
      }
      c.restore();
    });

    // far canopy leaves appear before the target leaf
    leaf(c,L,P,{x:160,y:1540-420*p,s:.72,rot:-.42},sd('leaf-far1'));
    leaf(c,L,P,{x:880,y:1600-470*p,s:.65,rot:.38},sd('leaf-far2'));

    // hero stays exact G1 for opening frames, then tracked camera relation lets it sink modestly
    const fall=L.seg(t,.12,1.9,'inOutCubic');
    const hx=540+Math.sin(L.onTwos(t)*3.2)*5;
    const hy=720+235*fall;
    heroDrop(c,L,P,hx,hy,t);

    // velocity annotation and two scale ticks
    const v=L.seg(t,.15,.65,'outExpo');
    if(v>0){
      L.arcAnnotation(c,hx,hy,150,-1.9,-.25,{color:P.annBlue,width:2.2,p:v,arrow:11,alpha:.48});
      L.bracket(c,hx-140,hy+125,hx+140,hy+125,{color:P.annYellow,alpha:.32*v,width:1.3,p:v});
    }

    // one secondary satellite drop passes behind out of phase
    const sat=L.seg(t,.55,1.5,'inOutCubic');
    if(sat>0){
      const sx=720-80*sat,sy=540+420*sat;
      c.save();c.globalAlpha=.48;c.fillStyle=P.waterPale;c.beginPath();c.arc(sx,sy,18,0,TAU);c.fill();c.strokeStyle=P.waterDeep;c.lineWidth=1.5;c.stroke();c.restore();
    }

    // target leaf rises aggressively near the end; subtle shadow tightens before contact
    const near=L.seg(t,1.05,1.95,'inOutCubic');
    const leafY=1510-430*near;
    leaf(c,L,P,{x:555,y:leafY,s:1.18,rot:-.15},sd('leaf-target'));
    const contact=L.seg(t,1.62,1.98,'outExpo');
    if(contact>0){
      c.save();c.globalAlpha=.08+.28*contact;c.fillStyle=P.ink;c.beginPath();c.ellipse(hx+8,leafY-45,70-24*contact,18-5*contact,-.1,0,TAU);c.fill();c.restore();
    }
  }});
})();