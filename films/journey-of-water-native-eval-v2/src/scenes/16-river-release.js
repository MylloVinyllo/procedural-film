// 16 · Back to the river · T 27.500–29.000
// Illustrated treated-effluent outfall joining a moving receiving river; tracer rapidly becomes one local streamline.
(function(){
  'use strict';
  const ID='river-release',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function blob(L,cx,cy,rx,ry,seed,n=32){
    const pts=[];
    for(let i=0;i<n;i++){const a=i/n*TAU,k=1+.07*L.noise1(i*.39,seed)+.03*Math.sin(a*5);pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k]);}
    return pts;
  }

  function stone(c,L,P,x,y,rx,ry,seed){
    const pts=blob(L,x,y,rx,ry,seed);
    c.save();c.fillStyle=P.stoneBody;c.globalAlpha=.88;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.75,spacing:8,width:1.1,color:P.stoneDeep,alpha:.42,density:.5,length:[14,42],seed:seed+1,clip:true});
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2.2,seed:seed+2,wobble:.8,tremble:.16});c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),q=L.onTwos(t);
    const widen=L.seg(t,.75,1.5,'inOutCubic');

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:140,angle:-.52,offset:info.T*7,seed:sd('stripes')});

    // far bank/vegetation
    c.save();c.fillStyle=P.sage;c.globalAlpha=.48;c.fillRect(0,300,1080,420);c.restore();
    for(let i=0;i<11;i++){
      const x=35+i*105,y=700+(i%2)*15;
      L.inkPath(c,[[x,y],[x+5*Math.sin(i),430]],{color:P.wood,width:5,alpha:.36,seed:sd('stem',i),wobble:.8,tremble:.15,taper:[5,18]});
      const crown=blob(L,x,400,65+(i%3)*12,95+(i%2)*10,sd('crown',i),26);
      c.save();c.globalAlpha=.34;c.fillStyle=P.sage;c.beginPath();L.tracePath(c,crown,true);c.fill();c.restore();
    }

    // broad receiving river
    c.save();c.fillStyle=P.waterBody;c.globalAlpha=.94;c.fillRect(0,680,1080,1240);c.restore();
    for(let i=0;i<12;i++){
      const y=760+i*82,phase=10*Math.sin(q*.8+i);
      L.inkPath(c,[[0,y+phase],[260,y-6+phase],[540,y+8+phase],[820,y-4+phase],[1080,y+phase]],{color:i%3===0?P.white:P.tealDeep,width:i%3===0?1.5:1.1,alpha:i%3===0?.26:.22,seed:sd('flow',i),wobble:.3,tremble:.07,boilAmp:.1});
    }

    // concrete outfall channel at left
    const out=[[0,860],[250,860],[360,945],[360,1110],[230,1070],[0,1040]];
    c.save();c.fillStyle=P.paperDeep;c.globalAlpha=.9;c.beginPath();L.tracePath(c,out,true);c.fill();
    L.hatch(c,out,{angle:.8,spacing:8,width:1.1,color:P.inkSoft,alpha:.4,density:.5,length:[16,50],seed:sd('concrete'),clip:true});
    L.inkPath(c,out,{closed:true,color:P.inkSoft,width:3,seed:sd('out-o'),wobble:.8,tremble:.16});c.restore();
    // inner water channel
    L.inkPath(c,[[0,950],[170,950],[310,1000],[420,1040]],{color:P.waterDeep,width:70,alpha:.35,seed:sd('eff-edge'),wobble:.7,tremble:.14,taper:[20,30]});
    L.inkPath(c,[[0,950],[170,950],[310,1000],[420,1040]],{color:P.waterPale,width:56,alpha:.82,seed:sd('eff'),wobble:.5,tremble:.1,taper:[18,28]});

    // stones and reeds around mixing zone
    stone(c,L,P,390,1180,92,58,sd('s1'));stone(c,L,P,845,1010,74,48,sd('s2'));stone(c,L,P,660,1450,115,68,sd('s3'));
    for(let i=0;i<13;i++){
      const x=40+i*85,y=1770-(i%3)*20,h=120+(i%4)*24,sway=Math.sin(q*2+i)*10;
      L.inkPath(c,[[x,y],[x+sway*.4,y-h*.5],[x+sway,y-h]],{color:P.leaf,width:1.8,alpha:.5,seed:sd('reed',i),wobble:.7,tremble:.14,taper:[4,12]});
    }

    // mixing eddy at outfall
    const mix=L.seg(t,.1,.75,'outExpo');
    if(mix>0){
      L.arcAnnotation(c,430,1040,105,.4,5.5,{color:P.annBlue,width:2.4,p:mix,arrow:10,alpha:.48});
      L.arcAnnotation(c,475,1060,66,3.5,1.0,{color:P.annBlue,width:1.8,p:Math.max(0,(mix-.25)/.75),arrow:8,alpha:.35});
      for(let i=0;i<10;i++){
        const a=i/10*TAU+q*.5,r=58+(i%3)*14;
        c.save();c.globalAlpha=.3;c.fillStyle=P.waterFoam;c.beginPath();c.arc(430+Math.cos(a)*r,1040+Math.sin(a)*r*.45,2+(i%3),0,TAU);c.fill();c.restore();
      }
    }

    // G3 tracer enters, bends into main current, then loses its halo.
    const hero=L.seg(t,0,1.15,'inOutCubic');
    const path=[[300,920],[390,960],[470,1030],[560,1080],[690,1110],[820,1140],[960,1160]];
    if(hero>0){
      const n=Math.max(2,Math.round(path.length*hero));
      L.inkPath(c,L.smoothPts(path.slice(0,n),false,4),{color:P.annBlue,width:3,alpha:.68,seed:sd('hero-line'),wobble:.15,tremble:.04,taper:[5,10]});
      const u=hero*(path.length-1),i=Math.min(path.length-2,Math.floor(u)),f=u-i,A=path[i],B=path[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.78,glow:2.5,twinkle:.02});
      if(t<.55)L.guideCircle(c,x,y,46,{color:P.annYellow,alpha:.22*(1-t/.55),width:1.5,dash:[4,8]});
    }

    // downstream camera/widen cue: banks recede via broad flow arcs and horizon brightens.
    if(widen>0){
      c.save();c.globalAlpha=.12+.18*widen;c.fillStyle=P.stripeSky;c.fillRect(0,620-80*widen,1080,120);c.restore();
      L.arcAnnotation(c,540,1320,470,3.4,5.9,{color:P.annBlue,width:1.5,p:widen,arrow:8,alpha:.2});
    }
  }});
})();