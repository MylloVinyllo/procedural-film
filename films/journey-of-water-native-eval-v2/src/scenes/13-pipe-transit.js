// 13 · Under the city · T 22.000–23.500
// Illustrated pressurised main: perspective pipe tunnel, passing joints/bolts, full-bore water, valve and service branch.
(function(){
  'use strict';
  const ID='pipe-transit',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function ring(c,L,P,cx,cy,rx,ry,seed,alpha,w=3){
    const pts=L.ellipsePts(cx,cy,rx,ry,64);
    L.inkPath(c,pts,{closed:true,color:P.pipeDeep,width:w,alpha,seed,wobble:.55,tremble:.12,boilAmp:.18});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const p=t/info.dur,q=L.onTwos(t);

    L.paper(c,{seed:sd('paper')});
    // underwater/inside-pipe fill replaces stripes across most of frame
    c.save();c.fillStyle=P.waterBody;c.globalAlpha=.94;c.fillRect(0,180,1080,1740);c.restore();

    // faint street cutaway above pipe
    c.save();c.globalAlpha=.34;c.fillStyle=P.paperShade;c.fillRect(0,180,1080,290);
    L.inkPath(c,[[0,450],[1080,450]],{color:P.inkSoft,width:2,alpha:.45,seed:sd('road'),wobble:.6,tremble:.12});
    for(let i=0;i<7;i++){
      const x=90+i*165;
      c.fillStyle=i%2?P.stoneBody:P.paperDeep;c.fillRect(x,260,95,155);
      L.inkPath(c,[[x,415],[x,260],[x+95,260],[x+95,415]],{color:P.inkFaint,width:1.1,alpha:.34,seed:sd('building',i),wobble:.4,tremble:.08});
    }
    // moving vehicle shadow provides scale
    const carX=-180+1500*p;
    c.fillStyle=L.rgba(P.ink,.16);c.fillRect(carX,420,180,18);
    c.restore();

    // perspective pipe interior: rings accelerate past camera
    const cx=540,cy=940;
    for(let i=0;i<8;i++){
      const u=(i/8+(p*1.7))%1;
      const ease=u*u;
      const rx=100+ease*760,ry=170+ease*1120;
      const alpha=.12+.36*(1-u);
      ring(c,L,P,cx,cy,rx,ry,sd('joint',i),alpha,1.3+3*(1-u));
      // bolts on the nearer joints
      if(u>.48){
        for(let k=0;k<12;k++){
          const a=k/12*TAU;
          const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;
          c.save();c.globalAlpha=.12+.28*u;c.fillStyle=P.pipeDeep;c.beginPath();c.arc(x,y,3+5*u,0,TAU);c.fill();c.restore();
        }
      }
    }

    // pipe wall bands at frame edges, hatched as metal/concrete
    const left=[[0,180],[170,180],[310,650],[320,1220],[180,1920],[0,1920]];
    const right=[[1080,180],[910,180],[770,650],[760,1220],[900,1920],[1080,1920]];
    [left,right].forEach((pts,i)=>{
      c.save();c.globalAlpha=.72;c.fillStyle=P.pipeBody;c.beginPath();L.tracePath(c,pts,true);c.fill();
      L.hatch(c,pts,{angle:i?.75:-.75,spacing:9,width:1.15,color:P.pipeDeep,alpha:.45,density:.55,length:[16,52],seed:sd('wall',i),clip:true});
      L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:3,alpha:.62,seed:sd('wall-o',i),wobble:.8,tremble:.16});c.restore();
    });

    // full-bore flow lines, different speeds and bend phases
    for(let i=0;i<11;i++){
      const y=570+i*70;
      const shift=((q*(90+i*6)+i*75)%120);
      const pts=[];
      for(let x=-100;x<=1180;x+=160)pts.push([x+shift,y+18*Math.sin((x/180)+i*.6+q)]);
      L.inkPath(c,L.smoothPts(pts,false,3),{color:i%3===0?P.white:P.tealDeep,width:i%3===0?1.6:1.1,alpha:i%3===0?.34:.24,seed:sd('flow',i),wobble:.15,tremble:.04,boilAmp:.06});
    }

    // sparse entrained bubbles / particles
    const rr=L.rng(sd('bubbles'));
    for(let i=0;i<36;i++){
      const x=((rr()*1080+q*(70+(i%5)*12))%1200)-60,y=520+rr()*1100,r=1.5+rr()*5;
      c.save();c.globalAlpha=.18+.24*(i%3);c.strokeStyle=P.waterPale;c.lineWidth=.9;c.beginPath();c.arc(x,y,r,0,TAU);c.stroke();c.restore();
    }

    // large valve ring ahead; opens as camera reaches it
    const valve=L.seg(t,.35,.85,'outBack');
    if(valve>0){
      L.guideCircle(c,720,920,150,{color:P.annYellow,alpha:.14+.2*valve,width:2});
      for(let k=0;k<6;k++){
        const a=k/6*TAU+valve*.15,rad=92;
        L.inkPath(c,[[720,920],[720+Math.cos(a)*rad,920+Math.sin(a)*rad]],{color:P.pipeDeep,width:5,alpha:.28+.34*valve,seed:sd('spoke',k),wobble:.5,tremble:.1,taper:[5,8]});
      }
      L.guideCircle(c,720,920,44,{color:P.pipeDeep,alpha:.42+.25*valve,width:3});
    }

    // service branch becomes readable on the right
    const branch=L.seg(t,.65,1.25,'inOutCubic');
    if(branch>0){
      const pts=[[760,980],[860,930],[965,830],[1080,760]];
      const n=Math.max(2,Math.round(pts.length*branch));
      L.inkPath(c,L.smoothPts(pts.slice(0,n),false,4),{color:P.pipeDeep,width:30,alpha:.32,seed:sd('branch-wall'),wobble:.8,tremble:.14,taper:[12,25]});
      L.inkPath(c,L.smoothPts(pts.slice(0,n),false,4),{color:P.waterPale,width:20,alpha:.62,seed:sd('branch-water'),wobble:.45,tremble:.08,taper:[10,20]});
    }

    // G3 hero streamline stays distinguishable from the general flow
    const hero=L.seg(t,.05,1.35,'inOutCubic');
    const hpts=[[300,920],[420,915],[540,920],[650,925],[760,915],[880,875],[1010,790]];
    if(hero>0){
      const n=Math.max(2,Math.round(hpts.length*hero));
      L.inkPath(c,L.smoothPts(hpts.slice(0,n),false,4),{color:P.annBlue,width:3.2,alpha:.76,seed:sd('hero-line'),wobble:.12,tremble:.03,taper:[5,10]});
      const u=hero*(hpts.length-1),i=Math.min(hpts.length-2,Math.floor(u)),f=u-i,A=hpts[i],B=hpts[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.85,glow:2.7,twinkle:.02});
    }

    // late elbow sweep prepares the faucet exit
    const elbow=L.seg(t,1.15,1.5,'outExpo');
    if(elbow>0)L.arcAnnotation(c,900,790,160,2.25,3.85,{color:P.annBlue,width:2.2,p:elbow,arrow:10,alpha:.42});
  }});
})();