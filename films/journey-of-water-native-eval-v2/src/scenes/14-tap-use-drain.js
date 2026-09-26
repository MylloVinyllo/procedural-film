// 14 · Through a home · T 23.500–25.500
// Illustrated kitchen water use: faucet → glass/sink → drain spiral, with a real room and secondary motion.
(function(){
  'use strict';
  const ID='tap-use-drain',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function rect(c,L,pts,fill,seed,w=2.4,alpha=1){
    c.save();c.globalAlpha=alpha;c.fillStyle=fill;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.inkPath(c,pts,{closed:true,color:L.pal.inkSoft,width:w,alpha:.8,seed,wobble:.75,tremble:.15,boilAmp:.28});c.restore();
  }

  function glass(c,L,P,x,y,fillP){
    const pts=[[x-74,y-220],[x+74,y-220],[x+58,y],[x-58,y]];
    c.save();c.globalAlpha=.78;c.fillStyle=L.rgba(P.waterPale,.15);c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2.2,alpha:.62,seed:sd('glass'),wobble:.45,tremble:.1});
    // water level
    const top=lerp(y-25,y-185,fillP);
    if(fillP>0){c.fillStyle=L.rgba(P.waterBody,.52);c.fillRect(x-55,top,110,y-top-8);L.inkPath(c,[[x-54,top],[x+54,top]],{color:P.waterDeep,width:1.5,alpha:.62,seed:sd('water-top'),wobble:.25,tremble:.06});}
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const q=L.onTwos(t);

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeApricot],width:140,angle:-.52,offset:info.T*6,seed:sd('stripes')});

    // back wall/window
    c.save();c.fillStyle=P.paperShade;c.globalAlpha=.62;c.fillRect(60,230,960,590);c.restore();
    rect(c,L,[[610,300],[930,300],[930,710],[610,710]],L.rgba(P.stripeSky,.62),sd('window'),2.8,.85);
    L.inkPath(c,[[770,300],[770,710],[610,505],[930,505]],{color:P.inkSoft,width:2,alpha:.48,seed:sd('window-bars'),wobble:.35,tremble:.08});
    // moving city/reflection streaks outside window
    for(let i=0;i<9;i++){
      const x=630+i*34,y=370+(i%3)*70+8*Math.sin(q*2+i);
      c.save();c.globalAlpha=.18+.08*(i%2);c.fillStyle=i%3===0?P.sun:P.duskRose;c.fillRect(x,y,8,28+(i%4)*12);c.restore();
    }

    // counter / wood grain
    c.save();c.fillStyle=P.wood;c.globalAlpha=.78;c.fillRect(0,900,1080,1020);c.restore();
    for(let i=0;i<22;i++){
      const y=940+i*42;
      L.inkPath(c,[[0,y],[1080,y+10*Math.sin(i*.7)]],{color:P.inkSoft,width:1,alpha:.18,seed:sd('grain',i),wobble:1.8,tremble:.25});
    }

    // sink basin
    const basin=[[130,1040],[880,1040],[950,1140],[865,1530],[160,1530],[80,1140]];
    rect(c,L,basin,P.paperDeep,sd('basin'),3,.92);
    const inner=[[180,1110],[825,1110],[875,1180],[810,1450],[205,1450],[145,1180]];
    c.save();c.fillStyle=L.rgba(P.waterPale,.18);c.beginPath();L.tracePath(c,inner,true);c.fill();
    L.hatch(c,inner,{angle:.08,spacing:15,width:1,color:P.inkFaint,alpha:.22,density:.32,length:[25,80],seed:sd('basin-h'),clip:true});c.restore();

    // faucet body: industrial but hand-inked
    c.save();c.fillStyle=P.pipeBody;c.globalAlpha=.95;
    c.fillRect(240,690,90,385);c.fillRect(285,690,320,75);c.fillRect(555,690,65,240);
    c.restore();
    L.inkPath(c,[[240,1075],[240,690],[605,690],[605,930]],{color:P.ink,width:5,alpha:.88,seed:sd('faucet'),wobble:.9,tremble:.16,double:{offset:2,width:1,alpha:.16,seed:sd('faucet-d')}});
    for(let y=735,i=0;y<1040;y+=65,i++)L.inkPath(c,[[248,y],[320,y]],{color:P.pipeDeep,width:1.2,alpha:.32,seed:sd('faucet-h',i),wobble:.3,tremble:.06});

    // glass sits in the basin
    const fillP=L.seg(t,.18,.78,'inOutCubic');
    glass(c,L,P,520,1340,fillP);

    // faucet jet begins, stabilises, then shifts to basin/drain path
    const open=L.seg(t,0,.22,'outExpo');
    const toDrain=L.seg(t,.85,1.45,'inOutCubic');
    const jetX=lerp(605,610,toDrain),jetEndY=lerp(1145,1280,toDrain);
    if(open>0){
      const wave=5*Math.sin(q*5);
      const jet=[[605,930],[605+wave,1010],[610-wave*.4,jetEndY]];
      L.inkPath(c,L.smoothPts(jet,false,5),{color:P.waterDeep,width:25,alpha:.32+.42*open,seed:sd('jet-edge'),wobble:.55,tremble:.12,boilAmp:.2,taper:[7,12]});
      L.inkPath(c,L.smoothPts(jet,false,5),{color:P.waterPale,width:16,alpha:.8,seed:sd('jet'),wobble:.35,tremble:.08,boilAmp:.16,taper:[6,10]});
      // splashes
      for(let i=0;i<10;i++){
        const r=L.rng(sd('splash',i)),u=((q*.65+i*.13)%1),x=520+(r()-.5)*170*u,y=1140-70*Math.sin(Math.PI*u)+r()*35;
        c.save();c.globalAlpha=.2+.45*(1-u);c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,2+r()*5,0,TAU);c.fill();c.restore();
      }
    }

    // cloth and utensils create lived-in secondary detail
    const cloth=[[820,930],[1010,940],[980,1110],[845,1080]];
    rect(c,L,cloth,P.rose,sd('cloth'),2,.55);
    for(let i=0;i<4;i++)L.inkPath(c,[[860+i*35,955],[850+i*38,1065]],{color:P.inkSoft,width:1,alpha:.25,seed:sd('cloth-line',i),wobble:.6,tremble:.12});
    L.inkPath(c,[[95,960],[140,850],[170,960]],{color:P.inkSoft,width:4,alpha:.5,seed:sd('utensil'),wobble:.8,tremble:.14});

    // drain hardware
    const drainX=680,drainY=1370;
    L.guideCircle(c,drainX,drainY,58,{color:P.inkSoft,alpha:.48,width:2});
    for(let k=0;k<8;k++){
      const a=k/8*TAU;
      c.save();c.globalAlpha=.35;c.strokeStyle=P.inkSoft;c.lineWidth=1;c.beginPath();c.moveTo(drainX+Math.cos(a)*14,drainY+Math.sin(a)*14);c.lineTo(drainX+Math.cos(a)*48,drainY+Math.sin(a)*48);c.stroke();c.restore();
    }

    // basin sheet converges to drain after the use moment
    const d=L.seg(t,.75,1.5,'outExpo');
    if(d>0){
      for(let i=0;i<6;i++){
        const y=1210+i*35;
        L.inkPath(c,[[300,y],[470,y+20],[590,y+45],[680,1370]],{color:i%2?P.waterDeep:P.annBlue,width:i%2?1.2:1.8,alpha:.2+.35*d,seed:sd('drain-flow',i),wobble:.3,tremble:.07,taper:[4,9]});
      }
    }

    // hero tracer: pipe → jet → glass/sink → drain
    const hero=L.seg(t,.02,1.75,'inOutCubic');
    const path=[[605,900],[605,1050],[570,1150],[535,1220],[570,1280],[620,1325],[680,1370]];
    if(hero>0){
      const n=Math.max(2,Math.round(path.length*hero));
      L.inkPath(c,L.smoothPts(path.slice(0,n),false,4),{color:P.annBlue,width:3,alpha:.66,seed:sd('hero-line'),wobble:.12,tremble:.03,taper:[5,10]});
      const u=hero*(path.length-1),i=Math.min(path.length-2,Math.floor(u)),f=u-i,A=path[i],B=path[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.85,glow:2.7,twinkle:.02});
    }

    // drain spiral becomes the transition object
    const spir=L.seg(t,1.25,2.0,'outExpo');
    if(spir>0){
      c.save();c.strokeStyle=P.annBlue;c.lineWidth=2.4;c.globalAlpha=.3+.5*spir;c.beginPath();
      const turns=1.8,n=70;
      for(let i=0;i<n;i++){
        const u=i/(n-1)*spir,a=u*TAU*turns,r=120*(1-u)+20;
        const x=drainX+Math.cos(a)*r,y=drainY+Math.sin(a)*r*.55;
        i?c.lineTo(x,y):c.moveTo(x,y);
      }
      c.stroke();c.restore();
      L.guideCircle(c,drainX,drainY,75+75*spir,{color:P.annYellow,alpha:.16+.24*spir,width:1.8,dash:[5,8]});
    }
  }});
})();