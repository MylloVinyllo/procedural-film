// 18 · Leaving the surface · T 31.000–33.000
// Blueprint phase-change plate: dense liquid network loses coherent boundary as vapor points separate and rise within exact G4.
(function(){
  'use strict';
  const ID='surface-evaporation',TAU=Math.PI*2;
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

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),q=L.onTwos(t);
    L.blueprint(c,{seed:sd('bp'),center:[540,760],circles:7,diagonals:5});
    progressGlyph(c,L,8);

    // exact G4 guide
    L.guideCircle(c,540,760,165,{color:P.schemWater,alpha:.3,width:2,dash:[6,8]});

    // reference wave/surface plane
    const surfaceY=900;
    L.inkPath(c,[[100,surfaceY],[300,surfaceY-12],[540,surfaceY+8],[780,surfaceY-10],[980,surfaceY]],{color:P.lineWhite,width:1.8,alpha:.48,seed:sd('surface'),wobble:.15,tremble:.03});

    const evap=L.seg(t,.35,1.7,'inOutCubic');

    // liquid particle network below surface
    const rr=L.rng(sd('liquid'));
    const nodes=[];
    for(let row=0;row<10;row++){
      for(let col=0;col<13;col++){
        const x=145+col*64+(row%2)*25+(rr()-.5)*10;
        const y=950+row*72+(rr()-.5)*12;
        nodes.push([x,y,row,col]);
      }
    }
    // neighbour bonds: break preferentially near the surface as evaporation advances
    c.save();c.strokeStyle=P.lavender;c.lineWidth=.75;
    nodes.forEach((n,i)=>{
      const [x,y,row,col]=n;
      const breakP=clamp(evap*(1.25-row*.06));
      c.globalAlpha=.12+.18*(1-breakP);
      if(col<12){c.beginPath();c.moveTo(x,y);c.lineTo(x+64,y+(row%2?-5:5));c.stroke();}
      if(row<9){c.beginPath();c.moveTo(x,y);c.lineTo(x+(row%2?-25:25),y+72);c.stroke();}
    });c.restore();
    nodes.forEach((n,i)=>{
      const [x,y,row]=n,loosen=clamp(evap*(1.35-row*.05));
      const jx=Math.sin(q*3+i)*3*loosen,jy=Math.cos(q*2.5+i*.7)*2*loosen;
      c.save();c.globalAlpha=.22+.35*(1-loosen*.3);c.fillStyle=i%7===0?P.schemWater:P.lavender;c.beginPath();c.arc(x+jx,y+jy,2.2+(i%3)*.4,0,TAU);c.fill();c.restore();
    });

    // solar-energy arrows enter from upper-left
    const heat=L.seg(t,.1,.7,'outExpo');
    if(heat>0){
      for(let i=0;i<5;i++){
        const x=160+i*85;
        L.inkPath(c,[[x,360],[x+90,650]],{color:P.schemCycle,width:1.7,alpha:.24+.32*heat,seed:sd('heat',i),wobble:.08,tremble:.02,taper:[5,8]});
      }
      L.arcAnnotation(c,300,520,185,3.6,5.25,{color:P.schemCycle,width:1.8,p:heat,arrow:8,alpha:.34});
    }

    // selected surface nodes become vapor points. Their coherent liquid boundary disappears.
    const vap=L.seg(t,.75,1.8,'outExpo');
    const vaporSeeds=[
      [390,895,-120,-440],[455,890,-45,-560],[520,900,20,-500],[580,892,95,-610],[645,898,150,-470],
      [710,890,210,-540],[330,900,-190,-500]
    ];
    vaporSeeds.forEach((v,i)=>{
      const start=.75+i*.07,pp=L.seg(t,start,1.85,'inOutCubic');
      if(pp<=0)return;
      const x=lerp(v[0],540+v[2],pp),y=lerp(v[1],760+v[3],pp);
      c.save();c.globalAlpha=.25+.55*(1-pp*.25);c.fillStyle=P.schemWater;c.beginPath();c.arc(x,y,3+(i%3),0,TAU);c.fill();c.restore();
      if(i<3)L.inkPath(c,[[v[0],v[1]],[lerp(v[0],x,.55),lerp(v[1],y,.55)],[x,y]],{color:P.schemFlow,width:1,alpha:.16+.22*pp,seed:sd('vap-path',i),wobble:.07,tremble:.02,taper:[3,6]});
    });

    // tracer changes from one liquid highlight into several separated vapor points
    const hero=L.seg(t,.65,1.8,'inOutCubic');
    if(hero>0){
      const baseX=540,baseY=890;
      for(let i=0;i<4;i++){
        const spread=(i-1.5)*32*hero;
        const x=baseX+spread+10*Math.sin(q+i),y=lerp(baseY,470-i*35,hero);
        L.glowDot(c,x,y,4.5,{color:i===1?P.schemCycle:P.schemWater,core:P.glow,rays:0,seed:sd('hero',i),intensity:.62+.18*(i===1),glow:2.1,twinkle:.02});
      }
    }

    // phase-change bracket / change flash
    const br=L.seg(t,.45,1.15,'outExpo');
    if(br>0)L.bracket(c,885,870,885,470,{color:P.lavender,alpha:.36*br,width:1.3,p:br,offset:18});
    const flash=L.seg(t,.85,1.02,'outExpo')*(1-L.seg(t,1.15,1.38,'outQuad'));
    if(flash>0)L.guideCircle(c,540,900,58+80*flash,{color:P.magenta,alpha:.5*(1-flash*.25),width:2.5,quadrants:8});

    // atmosphere guide takes over late; G4 remains fixed for the next shot.
    const lift=L.seg(t,1.4,2.0,'outExpo');
    if(lift>0){
      [230,320,420].forEach((r,i)=>L.guideCircle(c,540,760,r,{color:i===0?P.schemWater:P.lavender,alpha:(.06+.08*(i===0))*lift,width:1,dash:[4,10]}));
      c.save();c.globalAlpha=.18*lift;c.strokeStyle=P.schemFlow;c.lineWidth=1.2;
      for(let x=220;x<=860;x+=80){c.beginPath();c.moveTo(x,760);c.quadraticCurveTo(x+25,600,x-10,430);c.stroke();}c.restore();
    }
  }});
})();