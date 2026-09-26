// 02 · Droplets gather · T 1.500–3.500
// Blueprint cloud microphysics: many droplets, aerosol nuclei, curved flow and staged coalescence around exact G1.
(function(){
  'use strict';
  const ID='condensation-micro',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function progressGlyph(c,L,current){
    const P=L.pal,cx=900,cy=300,r=72,n=12;
    c.save();c.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+i/n*TAU;
      const a1=-Math.PI/2+(i+.62)/n*TAU;
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

  function dropShape(cx,cy,rx,ry,flat=.55){
    const pts=[],n=72;
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      let x=Math.cos(a)*rx,y=Math.sin(a)*ry;
      if(y>0){const u=y/ry;y*=1-flat*.18*u*u;x*=1+flat*.08*u;}
      pts.push([cx+x,cy+y]);
    }
    return pts;
  }

  function mainDrop(c,L,P,grow){
    const rx=105+grow*8,ry=90+grow*5,pts=dropShape(540,720,rx,ry,.52);
    // subtle interior lattice and stipple to make this a system rather than an icon
    c.save();c.globalAlpha=.18;
    L.hexLattice(c,pts,{r:14,jitter:1.2,width:.8,color:P.lavender,alpha:.42,seed:sd('g1-hex'),boilAmp:.08,clip:true});
    L.stipple(c,pts,{spacing:16,r:[.5,1.25],density:.22,color:P.paleBlue,alpha:.45,seed:sd('g1-stipple'),boilAmp:.08});
    c.restore();
    L.inkPath(c,pts,{closed:true,color:P.lavender,width:2.5,alpha:.88,seed:sd('g1-o'),wobble:.18,tremble:.08,boilAmp:.08});
    const inner=dropShape(540,720,rx-9,ry-8,.52);
    L.inkPath(c,inner,{closed:true,color:P.lavender,width:1.4,alpha:.5,seed:sd('g1-i'),wobble:.12,tremble:.06,boilAmp:.06});
    L.glowDot(c,506,692,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('glint'),intensity:.9,glow:3.2,twinkle:.02});
  }

  function flowCurve(c,L,P,pts,alpha,width=1.3){
    L.inkPath(c,L.smoothPts(pts,false,5),{color:P.schemFlow,width,alpha,seed:sd('flow',pts[0][0],pts[0][1]),wobble:.12,tremble:.04,boilAmp:.05,taper:[4,8]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,720],circles:6,diagonals:5});
    progressGlyph(c,L,1);

    // broader condensation field. The field flows; it does not simply blink on.
    const r=L.rng(sd('micro'));
    const q=L.onTwos(t);
    for(let i=0;i<118;i++){
      const a=r()*TAU;
      const rad=170+r()*620;
      const phase=r()*TAU;
      const depth=.3+r()*.7;
      const drift=10*Math.sin(q*(.7+depth)+phase);
      let x=540+Math.cos(a)*rad+Math.cos(a+Math.PI/2)*drift;
      let y=720+Math.sin(a)*rad*.83+Math.sin(a+Math.PI/2)*drift*.65;
      const base=2+r()*6.5;
      const rr=base*(.75+.25*depth);
      const nucleus=i%4===0;
      c.save();
      c.globalAlpha=.18+.44*depth;
      c.strokeStyle=i%7===0?P.schemWater:P.lavender;
      c.lineWidth=.7+depth*.65;
      c.beginPath();c.arc(x,y,rr,0,TAU);c.stroke();
      if(nucleus){
        c.fillStyle=P.aerosolDust;
        c.globalAlpha=.55;c.beginPath();c.arc(x,y,Math.max(1,rr*.23),0,TAU);c.fill();
      }
      c.restore();
    }

    // Three coherent curved inflow bands explain how material reaches the hero drop.
    const bands=[
      [[110,520],[250,590],[365,650],[445,690]],
      [[960,410],[820,500],[700,595],[625,660]],
      [[900,1130],[760,1020],[650,900],[595,805]]
    ];
    bands.forEach((pts,i)=>{
      const p=L.seg(t,.08+i*.08,.72+i*.12,'outExpo');
      if(p<=0)return;
      const n=Math.max(2,Math.round(pts.length*p));
      flowCurve(c,L,P,pts.slice(0,n),.25+.38*p,1.2+i*.15);
      // sparse beads travel along the same flow band
      for(let k=0;k<5;k++){
        const u=(k/5+q*.08+i*.1)%1;
        const seg=Math.min(pts.length-2,Math.floor(u*(pts.length-1)));
        const f=u*(pts.length-1)-seg;
        const A=pts[seg],B=pts[seg+1];
        const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
        c.save();c.globalAlpha=.26+.35*p;c.fillStyle=P.schemWater;c.beginPath();c.arc(x,y,2.5+k%2,0,TAU);c.fill();c.restore();
      }
    });

    // Readable merge events. Two small liquid shells move into G1 and vanish on contact.
    const merges=[
      {from:[425,655],to:[480,685],t0:.38,r:16},
      {from:[660,625],to:[600,676],t0:.86,r:19},
      {from:[615,835],to:[585,790],t0:1.36,r:14}
    ];
    let grow=0;
    merges.forEach((m,i)=>{
      const p=L.seg(t,m.t0,m.t0+.28,'inOutCubic');
      const done=L.seg(t,m.t0+.22,m.t0+.42,'outQuad');
      if(p>0&&done<1){
        const x=lerp(m.from[0],m.to[0],p),y=lerp(m.from[1],m.to[1],p);
        c.save();c.globalAlpha=1-done;c.strokeStyle=P.schemWater;c.lineWidth=1.8;c.beginPath();c.arc(x,y,m.r*(1-.15*p),0,TAU);c.stroke();c.restore();
      }
      grow+=done*.33;
      const flash=t-(m.t0+.22);
      if(flash>=0&&flash<.35){
        const fp=clamp(flash/.35);
        L.guideCircle(c,m.to[0],m.to[1],22+54*L.ease.outExpo(fp),{color:P.magenta,alpha:(1-fp)*.62,width:2.6,quadrants:8});
      }
    });

    mainDrop(c,L,P,grow);

    // One aerosol-nucleus inset, with shell and radial ticks.
    const insetP=L.seg(t,.2,.55,'outBack');
    if(insetP>0){
      const x=215,y=1240;
      L.guideCircle(c,x,y,56,{color:P.lavender,alpha:.42*insetP,width:1.5});
      c.save();c.globalAlpha=.8*insetP;c.fillStyle=P.aerosolDust;c.beginPath();c.arc(x,y,5,0,TAU);c.fill();c.restore();
      L.ticks(c,x,y,{r:74,n:16,len:8,major:4,majorLen:14,color:P.lineWhite,alpha:.28*insetP,width:1});
      L.bracket(c,145,1360,285,1360,{color:P.lavender,alpha:.42*insetP,width:1.3,tick:12});
    }

    // Downward direction appears only late, preparing the mechanics shot.
    const d=L.seg(t,1.55,1.95,'outExpo');
    if(d>0){
      c.save();c.strokeStyle=P.schemFlow;c.lineWidth=2.2;c.globalAlpha=.3+.6*d;c.beginPath();c.moveTo(540,835);c.lineTo(540,835+180*d);c.stroke();
      const y=1015; c.fillStyle=P.schemFlow;c.beginPath();c.moveTo(528,y-12);c.lineTo(540,y+8);c.lineTo(552,y-12);c.closePath();c.fill();c.restore();
    }
  }});
})();