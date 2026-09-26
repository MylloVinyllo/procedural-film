// 10 · Becoming a river · T 16.000–18.000
// Illustrated scale reveal: creek becomes a broad river valley with tributaries, bridge, banks and a small local tracer.
(function(){
  'use strict';
  const ID='tributary-river',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function riverLeft(y){return 300+95*Math.sin(y/310)+45*Math.sin(y/120+1);}
  function riverRight(y){return 790+125*Math.sin(y/360+.7)+55*Math.sin(y/150);}
  function riverPoly(){
    const L=[],R=[];
    for(let y=-500;y<=2800;y+=95){L.push([riverLeft(y),y]);R.push([riverRight(y),y]);}
    return L.concat(R.reverse());
  }
  const RIVER=riverPoly();

  function hill(c,L,P,pts,fill,seed,alpha=.55){
    c.save();c.globalAlpha=alpha;c.fillStyle=fill;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.75,spacing:12,width:1.1,color:P.inkSoft,alpha:.24,density:.35,length:[20,60],seed,clip:true});
    L.inkPath(c,pts,{closed:true,color:P.inkFaint,width:1.8,alpha:.4,seed:seed+1,wobble:1.2,tremble:.22});c.restore();
  }

  function bankTexture(c,L,P,side,seed){
    const r=L.rng(seed);
    for(let i=0;i<12;i++){
      const y=-200+r()*2900;
      const edge=side<0?riverLeft(y):riverRight(y);
      const x=edge+side*(45+r()*340);
      const len=25+r()*80;
      const ang=side<0?-.4+r()*.8:Math.PI-.4+r()*.8;
      L.inkPath(c,[[x,y],[x+Math.cos(ang)*len,y+Math.sin(ang)*len*.45]],{color:i%4===0?P.leaf:P.inkSoft,width:1.2+(i%3)*.3,alpha:.28+.18*(i%2),seed:seed+i,wobble:.8,tremble:.16,taper:[3,9]});
    }
  }

  function tributary(c,L,P,pts,seed,alpha=.72,w=80){
    const center=L.smoothPts(pts,false,5);
    L.inkPath(c,center,{color:P.waterDeep,width:w,alpha:.34,seed,wobble:1.2,tremble:.2,boilAmp:.3,taper:[20,40]});
    L.inkPath(c,center,{color:P.waterBody,width:w-8,alpha:.94,seed:seed+1,wobble:.9,tremble:.16,boilAmp:.25,taper:[20,40]});
    L.inkPath(c,center,{color:P.tealDeep,width:1.6,alpha,seed:seed+2,wobble:.35,tremble:.08,taper:[8,15]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const pull=L.seg(t,.05,1.75,'inOutCubic');
    const zoom=lerp(1.08,.56,pull);
    const camY=lerp(1060,1120,pull);
    const camX=lerp(540,580,pull);

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:140,angle:-.52,offset:info.T*7,seed:sd('stripes')});

    L.camera(c,{x:camX,y:camY,zoom},()=>{
      // distant valley structure far beyond the visible river
      hill(c,L,P,[[-500,50],[0,-250],[440,40],[780,-180],[1400,120],[1600,650],[-500,650]],P.sage,sd('hill1'),.38);
      hill(c,L,P,[[-400,350],[100,100],[520,390],[940,70],[1600,420],[1600,850],[-400,850]],P.riverBank,sd('hill2'),.32);

      // bank ground
      c.save();c.fillStyle=P.riverBank;c.globalAlpha=.86;c.fillRect(-700,-400,2400,3400);c.restore();

      // river carved through the banks
      c.save();c.fillStyle=P.waterBody;c.beginPath();L.tracePath(c,RIVER,true);c.fill();c.restore();
      L.hatch(c,RIVER,{angle:.05,spacing:28,width:1.1,color:P.tealDeep,alpha:.28,density:.34,length:[24,82],seed:sd('water-h'),clip:true});

      // bank edge lines and vegetation texture
      const LP=[],RP=[];
      for(let y=-500;y<=2800;y+=80){LP.push([riverLeft(y),y]);RP.push([riverRight(y),y]);}
      L.inkPath(c,LP,{color:P.inkSoft,width:3.2,alpha:.72,seed:sd('left'),wobble:1.1,tremble:.22});
      L.inkPath(c,RP,{color:P.inkSoft,width:3.2,alpha:.72,seed:sd('right'),wobble:1.1,tremble:.22});
      bankTexture(c,L,P,-1,sd('texL'));bankTexture(c,L,P,1,sd('texR'));

      // sediment bar inside a bend
      const bar=L.ellipsePts(610,1520,120,330,48,.12);
      c.save();c.fillStyle=P.filterSand;c.globalAlpha=.68;c.beginPath();L.tracePath(c,bar,true);c.fill();
      L.hatch(c,bar,{angle:.12,spacing:9,width:1,color:P.inkSoft,alpha:.35,density:.45,length:[14,48],seed:sd('bar'),clip:true});c.restore();

      // tributaries materialise as the camera reveals the larger basin
      const tr1=L.seg(t,.35,1.15,'outExpo');
      const tr2=L.seg(t,.8,1.55,'outExpo');
      if(tr1>0)tributary(c,L,P,[[120,450],[300,570],[410,740],[485,920]],sd('trib1'),.7,70*tr1);
      if(tr2>0)tributary(c,L,P,[[1120,1250],[930,1300],[835,1410],[760,1530]],sd('trib2'),.65,62*tr2);

      // bridge piers and deck provide human scale without becoming the subject
      const by=850;
      c.save();c.globalAlpha=.75;
      L.inkPath(c,[[150,by],[980,by]],{color:P.wood,width:18,alpha:.62,seed:sd('bridge'),wobble:.8,tremble:.15});
      for(const x of [385,650,870]){
        c.fillStyle=P.stoneBody;c.fillRect(x-22,by,44,220);
        L.hatch(c,[[x-22,by],[x+22,by],[x+22,by+220],[x-22,by+220]],{angle:.8,spacing:7,width:1,color:P.stoneDeep,alpha:.38,density:.55,length:[12,35],seed:sd('pier',x)});
      }
      c.restore();

      // flow bands and small capillary strokes
      for(let i=0;i<6;i++){
        const x0=360+i*42;
        const pts=[];
        for(let y=100;y<2500;y+=180){
          const l=riverLeft(y),r=riverRight(y),u=(i+1)/11;
          pts.push([lerp(l,r,u)+12*Math.sin(y/250+i),y]);
        }
        L.inkPath(c,L.smoothPts(pts,false,3),{color:P.tealDeep,width:i%3===0?1.8:1,alpha:.22+(i%2)*.1,seed:sd('flow',i),wobble:.2,tremble:.05,boilAmp:.08});
      }

      // sparse trees/reeds on banks for scale
      for(let i=0;i<10;i++){
        const y=220+i*125,x=i%2?riverLeft(y)-100-(i%4)*30:riverRight(y)+90+(i%5)*24;
        L.inkPath(c,[[x,y],[x,y-95-(i%3)*20]],{color:P.wood,width:3,alpha:.45,seed:sd('tree-t',i),wobble:.8,tremble:.16,taper:[4,14]});
        const crown=L.ellipsePts(x,y-120,38+(i%3)*7,55+(i%2)*8,26);
        c.save();c.globalAlpha=.38;c.fillStyle=P.sage;c.beginPath();L.tracePath(c,crown,true);c.fill();c.restore();
      }

      // tracer stays a local feature within the increasingly large river
      const hero=L.seg(t,.05,1.5,'inOutCubic');
      const hy=lerp(920,1740,hero);
      const hx=lerp(riverLeft(hy),riverRight(hy),.5)+18*Math.sin(hero*4);
      L.inkPath(c,[[hx-140,hy-35],[hx-50,hy-10],[hx+60,hy+12],[hx+150,hy+42]],{color:P.annBlue,width:3/zoom,alpha:.62,seed:sd('hero-line'),wobble:.16,tremble:.04,taper:[5,12]});
      L.glowDot(c,hx,hy,7/zoom,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('tracer'),intensity:.78,glow:2.5,twinkle:.02});
    });

    // basin-flow overlays remain screen-space and increase only after scale reveal
    const bas=L.seg(t,.85,1.8,'outExpo');
    if(bas>0){
      L.arcAnnotation(c,400,970,340,2.9,4.35,{color:P.annBlue,width:1.8,p:bas,arrow:8,alpha:.28});
      L.arcAnnotation(c,680,970,360,.25,1.5,{color:P.annBlue,width:1.8,p:bas,arrow:8,alpha:.25});
      L.arcAnnotation(c,540,1050,470,3.5,5.8,{color:P.annBlue,width:1.5,p:Math.max(0,(bas-.2)/.8),arrow:7,alpha:.2});
    }
  }});
})();