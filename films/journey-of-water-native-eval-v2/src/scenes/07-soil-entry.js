// 07 · Into the ground · T 10.500–12.500
// Illustrated forest-floor cutaway: wet litter → branching infiltration → pore-scale push to exact G2.
(function(){
  'use strict';
  const ID='soil-entry',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function irregularBlob(L,cx,cy,rx,ry,seed,n=28){
    const pts=[];
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      const k=1+.11*L.noise1(i*.41,seed)+.045*Math.sin(a*5+seed*.01);
      pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*(1+.07*Math.sin(a*4+1.2))*k]);
    }
    return pts;
  }

  function drawAggregate(c,L,P,o,seed){
    const pts=irregularBlob(L,o.x,o.y,o.rx,o.ry,seed,30);
    c.save();c.globalAlpha=o.alpha||1;c.fillStyle=o.fill||P.soilBody;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.8,spacing:o.spacing||8,width:1.15,color:P.soilDeep,alpha:.52,density:(x,y)=>.3+.45*clamp((y-o.y)/(o.ry*1.4)),length:[12,42],seed:seed+1,clip:true});
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:o.w||2.2,seed:seed+2,wobble:1.05,tremble:.22,boilAmp:.34});
    c.restore();
  }

  function root(c,L,P,pts,seed,w=5,alpha=.8){
    L.inkPath(c,L.smoothPts(pts,false,5),{color:P.wood,width:w,alpha,seed,wobble:1.1,tremble:.22,boilAmp:.35,taper:[8,28]});
    L.inkPath(c,L.smoothPts(pts,false,5),{color:P.inkSoft,width:1,alpha:.38*alpha,seed:seed+1,wobble:.7,tremble:.15,taper:[10,30]});
  }

  function waterPath(c,L,P,pts,p,seed,col=P.annBlue,w=3,alpha=.65){
    if(p<=0)return;
    const n=Math.max(2,Math.min(pts.length,Math.round(1+(pts.length-1)*p)));
    const use=pts.slice(0,n);
    L.inkPath(c,L.smoothPts(use,false,4),{color:col,width:w,alpha,seed,wobble:.2,tremble:.05,boilAmp:.07,taper:[4,12]});
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const descend=L.seg(t,.2,1.75,'inOutCubic');
    const shift=-380*descend;

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSpring],width:140,angle:-.52,offset:info.T*7,seed:sd('stripes')});

    c.save();c.translate(0,shift);

    // sky/leaf remnant above the forest floor
    c.save();c.globalAlpha=.46;c.fillStyle=P.stripeSky;c.fillRect(0,160,1080,420);c.restore();
    const leafPts=[[60,400],[290,330],[500,390],[420,520],[180,545]];
    c.save();c.globalAlpha=.58;c.fillStyle=P.leafWet;c.beginPath();L.tracePath(c,leafPts,true);c.fill();
    L.hatch(c,leafPts,{angle:.45,spacing:9,width:1.1,color:P.tealDeep,alpha:.4,density:.5,length:[14,48],seed:sd('leaf'),clip:true});
    L.inkPath(c,leafPts,{closed:true,color:P.inkSoft,width:2.6,seed:sd('leaf-o'),wobble:1,tremble:.2});c.restore();

    // litter layer
    c.save();c.fillStyle=L.rgba(P.tan,.75);c.fillRect(0,550,1080,180);c.restore();
    const litterR=L.rng(sd('litter'));
    for(let i=0;i<24;i++){
      const x=litterR()*1080,y=560+litterR()*150,len=45+litterR()*90,ang=-.8+litterR()*1.6;
      L.inkPath(c,[[x,y],[x+Math.cos(ang)*len,y+Math.sin(ang)*len*.5]],{color:i%3?P.wood:P.inkSoft,width:1.7,alpha:.55,seed:sd('twig',i),wobble:1.1,tremble:.25,taper:[4,12]});
    }

    // soil matrix background
    c.save();c.fillStyle=P.soilBody;c.globalAlpha=.9;c.fillRect(0,730,1080,1320);c.restore();
    L.hatch(c,[[0,730],[1080,730],[1080,1920],[0,1920]],{angle:.82,spacing:11,width:1.1,color:P.soilDeep,alpha:.26,density:.36,length:[18,58],seed:sd('soil-bg')});

    // aggregates arranged around explicit pore corridors
    const rr=L.rng(sd('aggs'));
    for(let i=0;i<34;i++){
      let x=70+rr()*940,y=770+rr()*1030;
      // clear a winding hero corridor
      const corridor=540+105*Math.sin((y-760)/240);
      if(Math.abs(x-corridor)<90)x+=x<corridor?-120:120;
      const rx=28+rr()*55,ry=22+rr()*48;
      drawAggregate(c,L,P,{x,y,rx,ry,fill:i%5===0?P.stoneBody:P.soilBody,alpha:.76+(i%3)*.07,spacing:8+(i%2)*2},sd('agg',i));
    }

    // a few explicit stones create wider-scale obstacles
    [[220,1020,95,60],[845,980,120,72],[300,1510,130,78],[820,1600,105,68]].forEach((v,i)=>{
      const pts=irregularBlob(L,v[0],v[1],v[2],v[3],sd('stone',i),34);
      c.save();c.fillStyle=P.stoneBody;c.globalAlpha=.9;c.beginPath();L.tracePath(c,pts,true);c.fill();
      L.hatch(c,pts,{angle:.72,spacing:8,width:1.2,color:P.stoneDeep,alpha:.45,density:.55,length:[18,48],seed:sd('stone-h',i),clip:true});
      L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2.4,seed:sd('stone-o',i),wobble:.8,tremble:.18});c.restore();
    });

    // roots at several scales
    root(c,L,P,[[120,620],[185,780],[210,980],[260,1160],[235,1340]],sd('root1'),7,.78);
    root(c,L,P,[[930,600],[840,760],[795,930],[745,1080],[720,1280]],sd('root2'),6,.72);
    root(c,L,P,[[460,650],[430,820],[390,940]],sd('root3'),4,.65);
    root(c,L,P,[[170,820],[110,920]],sd('root4'),3,.55);
    root(c,L,P,[[815,810],[915,900]],sd('root5'),3,.55);

    // three infiltration branches split after impact
    const branchP=L.seg(t,.15,1.15,'inOutCubic');
    const branches=[
      [[380,650],[420,760],[390,900],[350,1030],[330,1180]],
      [[540,650],[560,760],[525,900],[575,1040],[540,1180],[565,1320]],
      [[690,650],[720,760],[760,900],[735,1050],[780,1180]]
    ];
    branches.forEach((pts,i)=>waterPath(c,L,P,pts,clamp(branchP-i*.08),sd('branch',i),i===1?P.annBlue:P.teal, i===1?3.5:2.2, i===1?.76:.48));

    // hero takes centre corridor; two beads move at different speeds and an air pocket shifts aside
    const hero=L.seg(t,.35,1.72,'inOutCubic');
    const hpts=[[540,650],[560,760],[525,900],[575,1040],[540,1180],[565,1320],[540,1450]];
    if(hero>0){
      waterPath(c,L,P,hpts,hero,sd('hero'),P.waterPale,5,.82);
      const u=hero*(hpts.length-1),i=Math.min(hpts.length-2,Math.floor(u)),f=u-i,A=hpts[i],B=hpts[i+1];
      const x=lerp(A[0],B[0],f),y=lerp(A[1],B[1],f);
      L.glowDot(c,x,y,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('tracer'),intensity:.8,glow:2.7,twinkle:.02});
      // nearby trapped air pocket
      const airShift=L.seg(t,.75,1.45,'inOutCubic');
      c.save();c.globalAlpha=.45;c.strokeStyle=P.paper;c.lineWidth=2;c.beginPath();c.ellipse(650+35*airShift,1150-12*airShift,30,22,0,0,TAU);c.stroke();c.restore();
    }

    // deeper saturated band appears as camera descends
    c.save();c.globalAlpha=.14+.25*descend;c.fillStyle=P.waterDeep;c.fillRect(0,1500,1080,520);c.restore();
    for(let y=1535,i=0;y<1920;y+=58,i++){
      L.inkPath(c,[[40,y],[1040,y+12*Math.sin(i)]],{color:P.waterPale,width:1.2,alpha:.18+.15*descend,seed:sd('sat',i),wobble:.25,tremble:.05});
    }

    c.restore();

    // exact G2 pore is drawn screen-fixed at exit while the world has descended around it
    const macro=L.seg(t,1.45,2.0,'outExpo');
    if(macro>0){
      const cx=540,cy=820;
      L.guideCircle(c,cx,cy,118,{color:P.annYellow,alpha:.18+.38*macro,width:2,dash:[5,8]});
      // three nearby grains define the pore wall
      [[455,785,75,58],[635,770,82,62],[555,900,88,56]].forEach((v,i)=>{
        const pts=irregularBlob(L,v[0],v[1],v[2],v[3],sd('macro-grain',i),28);
        c.save();c.globalAlpha=.35+.5*macro;c.fillStyle=i===2?P.stoneBody:P.soilBody;c.beginPath();L.tracePath(c,pts,true);c.fill();
        L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:2,alpha:.72,seed:sd('macro-o',i),wobble:.7,tremble:.14});c.restore();
      });
      const angle=.56,tx=cx+Math.cos(angle)*86,ty=cy+Math.sin(angle)*86;
      L.glowDot(c,tx,ty,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('g2-tracer'),intensity:.85,glow:2.7,twinkle:.02});
    }
  }});
})();