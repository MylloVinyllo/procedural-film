// 05 · A path · T 8.000–10.000
// Layers: paper/sky stripes · doorway/furniture/plant · floor perspective · child · overlays
(function(){
  'use strict';
  const ID='first-steps',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function inkFill(c,L,pts,fill,seed,w=4,a=1){L.inkPath(c,pts,{closed:true,fill,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1.05,tremble:.3,boilAmp:.5,double:w>4?{offset:2.4,width:1.2,alpha:.2,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=2,a=1,taper=[6,12]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.8,tremble:.25,boilAmp:.4,taper});}
  function ell(cx,cy,rx,ry,rot=0,n=28){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}

  function poseAt(L,t){
    const tw=L.onTwos(t);
    const phase=tw<.5?0:tw<1?1:tw<1.5?2:3;
    const poses=[
      {x:540,lean:.06,armL:-1.0,armR:.85,kneeL:.5,kneeR:-.25,footL:-.15,footR:.1},
      {x:505,lean:.11,armL:-.72,armR:.62,kneeL:.15,kneeR:.52,footL:.15,footR:.38},
      {x:560,lean:.05,armL:-.55,armR:.85,kneeL:.56,kneeR:.05,footL:.32,footR:-.05},
      {x:540,lean:0,armL:-.9,armR:.92,kneeL:.12,kneeR:.14,footL:0,footR:0},
    ];
    return poses[phase];
  }

  function drawChild(c,L,P,t){
    const po=poseAt(L,t),s=1;
    c.save();
    c.translate(po.x,1175);
    c.rotate(po.lean);

    // shadow first
    c.save();c.globalAlpha=.16;c.fillStyle=P.ink;c.beginPath();c.ellipse(0,24,105,23,0,0,TAU);c.fill();c.restore();

    const pelvisY=-180,shoulderY=-340,headY=-455;
    // rear leg
    const hipL=[-42,pelvisY],kneeL=[-58+po.kneeL*25,-90],ankleL=[-48+po.footL*55,-5];
    inkFill(c,L,limb(...hipL,...kneeL,31,24),P.selfDeep,sd('legL1'),3.8);
    inkFill(c,L,limb(...kneeL,...ankleL,24,18),P.selfDeep,sd('legL2'),3.4);
    inkFill(c,L,[[-70+po.footL*55,-16],[-25+po.footL*55,-17],[10+po.footL*55,-4],[8+po.footL*55,14],[-70+po.footL*55,14]],P.inkSoft,sd('shoeL'),2.8);

    // torso + pelvis
    const torso=[[-72,-355],[-48,-375],[-18,-385],[38,-380],[72,-350],[61,-250],[48,-195],[-50,-195],[-63,-250]];
    inkFill(c,L,torso,P.selfWarm,sd('torso'),4.5);
    L.hatch(c,torso,{spacing:10,angle:-.8,length:[16,45],density:(x)=>clamp((x+15)/110)*.55,color:P.selfDeep,alpha:.45,width:1.1,seed:sd('torso-h')});
    inkFill(c,L,[[-52,-205],[-58,-165],[-42,-142],[44,-142],[56,-172],[48,-205]],P.selfDeep,sd('pelvis'),4);

    // rear arm
    const shL=[-65,-338],elL=[-110+po.armL*18,-270],wrL=[-115+po.armL*28,-195];
    inkFill(c,L,limb(...shL,...elL,20,16),P.selfWarm,sd('armL1'),3.5);
    inkFill(c,L,limb(...elL,...wrL,16,12),P.selfPale,sd('armL2'),3);
    inkFill(c,L,ell(wrL[0],wrL[1],15,12,-.15,18),P.selfPale,sd('handL'),2.5);

    // near leg
    const hipR=[40,pelvisY],kneeR=[58-po.kneeR*22,-90],ankleR=[50+po.footR*55,-4];
    inkFill(c,L,limb(...hipR,...kneeR,32,24),P.inkSoft,sd('legR1'),3.8);
    inkFill(c,L,limb(...kneeR,...ankleR,24,18),P.inkSoft,sd('legR2'),3.4);
    inkFill(c,L,[[25+po.footR*55,-16],[70+po.footR*55,-17],[103+po.footR*55,-4],[100+po.footR*55,14],[25+po.footR*55,14]],P.ink,sd('shoeR'),2.8);

    // near arm
    const shR=[66,-337],elR=[108+po.armR*18,-275],wrR=[112+po.armR*30,-205];
    inkFill(c,L,limb(...shR,...elR,21,16),P.selfWarm,sd('armR1'),3.6);
    inkFill(c,L,limb(...elR,...wrR,16,12),P.selfPale,sd('armR2'),3);
    inkFill(c,L,ell(wrR[0],wrR[1],15,12,.15,18),P.selfPale,sd('handR'),2.5);

    // neck/head
    inkFill(c,L,[[-19,-382],[21,-382],[24,-365],[-23,-365]],P.selfPale,sd('neck'),2.8);
    const head=ell(0,headY,49,58,-.03,30); inkFill(c,L,head,P.selfPale,sd('head'),4);
    // hair identity
    inkFill(c,L,[[-43,-476],[-31,-510],[-6,-520],[22,-512],[42,-488],[38,-465],[17,-482],[-7,-486],[-31,-470]],P.ink,sd('hair'),2.5);
    // face
    ink(c,L,[[-18,-456],[-3,-459]],P.ink,sd('eye'),1.5,.8);
    ink(c,L,[[9,-457],[16,-446],[12,-438]],P.inkSoft,sd('nose'),1.2,.65);
    ink(c,L,[[-8,-425],[9,-424]],P.inkSoft,sd('mouth'),1.2,.6);
    // clothing folds + identity notch
    ink(c,L,[[-42,-300],[-8,-290],[36,-304]],P.inkSoft,sd('fold'),1.4,.55);
    ink(c,L,[[-62,-345],[-50,-334],[-59,-320]],P.cycleGold,sd('notch'),2,.9);

    c.restore();
  }

  function drawRoom(c,L,P){
    // doorway
    c.save();c.globalAlpha=.34;
    c.fillStyle=P.paperShade;c.fillRect(0,300,1080,900);
    c.fillStyle=L.rgba(P.stripeSky,.3);c.fillRect(730,410,250,500);
    ink(c,L,[[730,910],[730,410],[980,410],[980,910]],P.inkFaint,sd('door'),2,.55,[0,0]);
    // stool
    inkFill(c,L,[[145,930],[310,930],[300,970],[138,970]],P.wood,sd('stool'),2.5,.7);
    ink(c,L,[[170,970],[155,1170],[276,970],[290,1170]],P.inkSoft,sd('stoollegs'),4,.6,[0,0]);
    // plant pot
    inkFill(c,L,[[835,980],[925,980],[910,1100],[850,1100]],P.ochre,sd('pot'),2.5,.55);
    for(let i=0;i<5;i++){
      const x=878+(i-2)*7;
      ink(c,L,[[880,980],[x,825-i*25]],P.ageSage,sd('stem',i),2,.65,[2,6]);
      inkFill(c,L,ell(x+(i%2?20:-20),850-i*20,26,10,(i%2?.25:-.25),18),P.sage,sd('leaf',i),1.5,.48);
    }
    c.restore();
  }

  function drawFloor(c,L,P){
    const floor=[[0,1080],[1080,1010],[1080,1920],[0,1920]];
    c.fillStyle=L.rgba(P.paperDeep,.28);c.beginPath();L.tracePath(c,floor,true);c.fill();
    for(let i=0;i<10;i++){
      const y=1110+i*78;
      ink(c,L,[[0,y],[1080,y-65]],P.inkFaint,sd('floorH',i),1,.2,[0,0]);
    }
    const vanish=[540,770];
    [80,210,390,690,870,1010].forEach((x,i)=>ink(c,L,[[x,1920],vanish],P.inkFaint,sd('floorV',i),1,.13,[0,0]));
    // toy/block
    inkFill(c,L,[[850,1335],[905,1325],[930,1368],[872,1384]],P.childSky,sd('toy'),2.5,.65);
    ink(c,L,[[905,1325],[906,1275],[852,1285],[850,1335]],P.inkSoft,sd('toy3d'),1.4,.5,[0,0]);
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    drawRoom(c,L,P);drawFloor(c,L,P);

    // continuous self path behind the child
    ink(c,L,[[180,1370],[270,1340],[350,1330],[430,1325],[520,1318],[630,1300],[760,1260]],P.selfWarm,sd('path'),4,.65,[10,18]);
    drawChild(c,L,P,t);

    // step arcs
    const step1=L.seg(t,.3,.65,'outExpo'),step2=L.seg(t,.82,1.12,'outExpo');
    if(step1>0)L.arcAnnotation(c,392,1325,80,2.9,5.05,{color:P.annBlue,width:2.2,p:step1,arrow:10,alpha:.65});
    if(step2>0)L.arcAnnotation(c,500,1320,88,2.85,5.0,{color:P.annBlue,width:2.2,p:step2,arrow:10,alpha:.65});

    // wobble/recovery attention ring
    const wob=L.seg(t,1.28,1.55,'outBack');
    if(wob>0)L.guideCircle(c,540,720,72+35*wob,{color:P.annYellow,alpha:.18+.45*(1-L.seg(t,1.5,1.85)),width:2.4,quadrants:8});

    // exact G2 on exit
    const g=L.seg(t,1.55,2.0,'outExpo');
    if(g>0){
      c.save();c.globalAlpha=g;
      c.strokeStyle=P.cycleGold;c.lineWidth=2.2;c.beginPath();c.ellipse(540,720,72,92,0,0,TAU);c.stroke();
      c.strokeStyle=L.rgba(P.annBlue,.5);c.lineWidth=1.2;c.beginPath();c.ellipse(540,720,61,80,0,0,TAU);c.stroke();
      c.restore();
    }
  }});
})();