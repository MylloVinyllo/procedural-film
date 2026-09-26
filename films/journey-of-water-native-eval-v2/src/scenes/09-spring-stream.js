// 09 · Surface again · T 14.000–16.000
// Illustrated spring and creek: groundwater emergence, stones, reeds, tributary merge, G3 highlighted streamline.
(function(){
  'use strict';
  const ID='spring-stream',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function blob(L,cx,cy,rx,ry,seed,n=34){
    const pts=[];
    for(let i=0;i<n;i++){
      const a=i/n*TAU,k=1+.08*L.noise1(i*.37,seed)+.03*Math.sin(a*5+seed*.01);
      pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k]);
    }
    return pts;
  }

  function stone(c,L,P,x,y,rx,ry,seed,alpha=1){
    const pts=blob(L,x,y,rx,ry,seed);
    c.save();c.globalAlpha=alpha;c.fillStyle=P.stoneBody;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.72,spacing:8,width:1.2,color:P.stoneDeep,alpha:.48,density:(hx,hy)=>.3+.45*clamp((hy-y)/(ry*1.3)),length:[12,42],seed:seed+1,clip:true});
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2.6,seed:seed+2,wobble:.9,tremble:.2,boilAmp:.36});
    c.restore();
  }

  function reed(c,L,P,x,y,h,phase,seed,t){
    const q=L.onTwos(t);
    const sway=Math.sin(q*2.3+phase)*12;
    const top=[x+sway,y-h];
    L.inkPath(c,[[x,y],[x+sway*.35,y-h*.48],top],{color:P.leaf,width:2.2,alpha:.72,seed,wobble:.8,tremble:.18,taper:[4,14]});
    for(let k=1;k<=3;k++){
      const u=k/4,bx=lerp(x,top[0],u),by=lerp(y,top[1],u),side=k%2?1:-1;
      const ex=bx+side*(28+8*k),ey=by-18+4*k;
      L.inkPath(c,[[bx,by],[ex,ey]],{color:P.leaf,width:1.4,alpha:.55,seed:seed+k,wobble:.6,tremble:.14,taper:[3,9]});
    }
  }

  function flowBand(c,L,P,pts,seed,alpha=.42,w=1.4){
    L.inkPath(c,L.smoothPts(pts,false,5),{color:P.tealDeep,width:w,alpha,seed,wobble:.3,tremble:.08,boilAmp:.12,taper:[5,12]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const pull=L.seg(t,1.35,2.0,'inOutCubic');
    const q=L.onTwos(t);

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:140,angle:-.52,offset:info.T*7,seed:sd('stripes')});

    // far bank / trees, drifting slightly as camera begins to pull back
    c.save();c.translate(0,-45*pull);c.globalAlpha=.7;
    c.fillStyle=L.rgba(P.sage,.56);c.fillRect(0,270,1080,500);
    for(let i=0;i<10;i++){
      const x=40+i*120+(i%2)*22;
      L.inkPath(c,[[x,710],[x+10*Math.sin(i),360]],{color:P.wood,width:7,alpha:.42,seed:sd('tree',i),wobble:1.2,tremble:.2,taper:[10,30]});
      const crown=blob(L,x,310,85+(i%3)*18,120+(i%2)*20,sd('crown',i),30);
      c.fillStyle=P.sage;c.beginPath();L.tracePath(c,crown,true);c.fill();
      L.hatch(c,crown,{angle:.72,spacing:10,width:1,color:P.tealDeep,alpha:.26,density:.45,length:[12,38],seed:sd('crown-h',i),clip:true});
    }
    c.restore();

    // river/creek channel with banks
    const left=[[0,880],[130,820],[250,860],[360,930],[420,1080],[380,1280],[270,1500],[120,1720],[0,1810]];
    const right=[[1080,760],[940,810],[850,900],[810,1040],[850,1220],[940,1440],[1080,1570]];
    const waterPoly=left.concat([[0,1920],[1080,1920]],right.slice().reverse());
    c.save();c.fillStyle=P.waterBody;c.globalAlpha=.92;c.beginPath();L.tracePath(c,waterPoly,true);c.fill();c.restore();

    // banks
    const bankL=left.concat([[0,1810],[0,760]]);
    const bankR=right.concat([[1080,1570],[1080,650]]);
    [bankL,bankR].forEach((pts,i)=>{
      c.save();c.fillStyle=P.riverBank;c.globalAlpha=.9;c.beginPath();L.tracePath(c,pts,true);c.fill();
      L.hatch(c,pts,{angle:i?-.7:.75,spacing:9,width:1.2,color:P.inkSoft,alpha:.38,density:.52,length:[15,48],seed:sd('bank',i),clip:true});
      L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2.5,alpha:.75,seed:sd('bank-o',i),wobble:1,tremble:.2});c.restore();
    });

    // spring outlet in far left/mid bank
    const spring=[[80,900],[165,875],[245,910],[300,985],[245,1045],[145,1035],[75,990]];
    c.save();c.fillStyle=P.waterDeep;c.globalAlpha=.82;c.beginPath();L.tracePath(c,spring,true);c.fill();
    L.inkPath(c,spring,{closed:true,color:P.inkSoft,width:2.2,seed:sd('spring-o'),wobble:.8,tremble:.18});c.restore();
    for(let i=0;i<9;i++){
      const a=i/8*Math.PI-.1;
      const x=180+Math.cos(a)*82,y=985-Math.abs(Math.sin(a))*45;
      c.save();c.globalAlpha=.55;c.fillStyle=P.waterFoam;c.beginPath();c.arc(x,y,3+(i%3)*2,0,TAU);c.fill();c.restore();
    }

    // major stones distort flow
    stone(c,L,P,360,1130,95,62,sd('s1'));
    stone(c,L,P,720,1280,120,76,sd('s2'));
    stone(c,L,P,520,1535,78,52,sd('s3'));
    stone(c,L,P,900,1010,62,44,sd('s4'),.9);

    // flow texture. Paths slide subtly downstream on twos.
    const drift=(q*.18)%1;
    const bands=[
      [[170,1010],[330,1035],[500,1100],[680,1160],[900,1220],[1080,1280]],
      [[130,1120],[300,1160],[450,1230],[620,1330],[820,1430],[1040,1510]],
      [[210,1340],[390,1390],[560,1480],[760,1570],[970,1650]],
      [[310,950],[470,1000],[630,1060],[790,1110],[980,1160]]
    ];
    bands.forEach((pts,i)=>{
      const shifted=pts.map((p,k)=>[p[0]+Math.sin(drift*TAU+k+i)*8,p[1]+Math.cos(drift*TAU+k*.7+i)*4]);
      flowBand(c,L,P,shifted,sd('flow',i),.28+(i%2)*.14,1.2+(i%2)*.4);
    });

    // readable split/rejoin around the foreground stone
    flowBand(c,L,P,[[250,1080],[320,1070],[355,1040],[420,1025],[500,1060]],sd('split-top'),.62,2.2);
    flowBand(c,L,P,[[250,1165],[310,1200],[360,1225],[430,1210],[510,1160]],sd('split-bot'),.62,2.2);

    // tributary enters from upper-right in second half
    const trib=L.seg(t,.7,1.45,'outExpo');
    if(trib>0){
      const pts=[[1080,785],[975,840],[900,915],[825,1000],[760,1080]];
      const n=Math.max(2,Math.round(pts.length*trib));
      flowBand(c,L,P,pts.slice(0,n),sd('trib'),.55,2.8);
      L.arcAnnotation(c,820,1010,92,-.9,1.7,{color:P.annYellow,width:2,p:trib,arrow:9,alpha:.42});
    }

    // reeds foreground and midground
    for(let i=0;i<12;i++)reed(c,L,P,40+i*90,1770-(i%3)*25,145+(i%4)*24,i*.6,sd('reed',i),t);

    // G3: highlighted hero streamline crosses the actual moving creek
    const hero=L.seg(t,.1,1.25,'inOutCubic');
    const heroPts=[[300,920],[390,950],[485,980],[585,1020],[690,1075],[780,1125]];
    if(hero>0){
      const n=Math.max(2,Math.round(heroPts.length*hero));
      L.inkPath(c,L.smoothPts(heroPts.slice(0,n),false,4),{color:P.annBlue,width:3.3,alpha:.75,seed:sd('hero'),wobble:.2,tremble:.05,taper:[5,10]});
      const u=hero*(heroPts.length-1),i=Math.min(heroPts.length-2,Math.floor(u)),f=u-i,A=heroPts[i],B=heroPts[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('tracer'),intensity:.78,glow:2.7,twinkle:.02});
    }

    // exact G3 settles to canonical y=920 for the final transition while the scene widens.
    const exit=L.seg(t,1.45,2.0,'outExpo');
    if(exit>0){
      c.save();c.globalAlpha=.22+.45*exit;c.strokeStyle=P.annBlue;c.lineWidth=2.5;c.beginPath();
      c.moveTo(300,920);c.bezierCurveTo(420,900,650,940,780,920);c.stroke();c.restore();
      L.glowDot(c,540,920,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('g3'),intensity:.75+.2*exit,glow:3,twinkle:.02});
      L.guideCircle(c,540,920,48,{color:P.annYellow,alpha:.16+.2*exit,width:1.6,dash:[4,8]});
    }
  }});
})();