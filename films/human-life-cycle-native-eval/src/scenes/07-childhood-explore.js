// 07 · Explore · T 11.500–13.500
// Layers: paper/sky · distant park · fence/trees · child run/jump · kite target · reach overlays
(function(){
  'use strict';
  const ID='childhood-explore',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function inkFill(c,L,pts,fill,seed,w=4,a=1){L.inkPath(c,pts,{closed:true,fill,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1.05,tremble:.3,boilAmp:.5,double:w>4?{offset:2.3,width:1.15,alpha:.18,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=2,a=1,taper=[6,12]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.8,tremble:.25,boilAmp:.4,taper});}
  function ell(cx,cy,rx,ry,rot=0,n=28){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}

  function pose(L,t){
    const tw=L.onTwos(t);
    if(tw<.5)return{x:380,y:1360,rot:-.03,step:.2,jump:0,reach:.45};
    if(tw<1)return{x:455,y:1300,rot:-.08,step:.7,jump:.1,reach:.75};
    if(tw<1.5)return{x:540,y:1210,rot:-.12,step:.4,jump:1,reach:1};
    return{x:600,y:1280,rot:.02,step:.15,jump:.25,reach:.88};
  }

  function child(c,L,P,t){
    const po=pose(L,t);
    c.save();c.translate(po.x,po.y);c.rotate(po.rot);
    const h=515,headY=-445,shoulderY=-338,pelvisY=-170;
    const lift=po.jump*40;
    c.translate(0,-lift);

    // rear leg
    const hipL=[-42,pelvisY],kneeL=[-70+po.step*20,-88],ankleL=[-110+po.step*35,-8+po.jump*30];
    inkFill(c,L,limb(...hipL,...kneeL,31,23),P.selfDeep,sd('l1'),3.6);
    inkFill(c,L,limb(...kneeL,...ankleL,23,17),P.selfDeep,sd('l2'),3.2);
    inkFill(c,L,[[-135+po.step*35,-15+po.jump*30],[-80+po.step*35,-17+po.jump*30],[-48+po.step*35,-2+po.jump*30],[-55+po.step*35,14+po.jump*30],[-132+po.step*35,14+po.jump*30]],P.inkSoft,sd('shoe1'),2.6);

    // torso/pelvis
    const torso=[[-70,-350],[-46,-375],[-16,-386],[40,-378],[72,-348],[59,-253],[44,-196],[-46,-196],[-62,-252]];
    inkFill(c,L,torso,P.selfWarm,sd('torso'),4.5);
    L.hatch(c,torso,{spacing:10,angle:-.8,length:[14,42],density:(x)=>clamp((x+10)/100)*.45,color:P.selfDeep,alpha:.42,width:1,seed:sd('th')});
    inkFill(c,L,[[-48,-202],[-58,-166],[-38,-138],[43,-138],[55,-169],[44,-203]],P.selfDeep,sd('pelvis'),3.8);

    // rear arm swings back
    const shL=[-65,shoulderY],elL=[-112,-278],wrL=[-135,-225];
    inkFill(c,L,limb(...shL,...elL,20,15),P.selfWarm,sd('a1'),3.3);
    inkFill(c,L,limb(...elL,...wrL,15,11),P.selfPale,sd('a2'),2.8);
    inkFill(c,L,ell(wrL[0],wrL[1],14,11,-.1,18),P.selfPale,sd('hand1'),2.3);

    // near leg
    const hipR=[38,pelvisY],kneeR=[75-po.step*18,-92],ankleR=[118-po.step*28,-5+po.jump*25];
    inkFill(c,L,limb(...hipR,...kneeR,32,23),P.inkSoft,sd('r1'),3.6);
    inkFill(c,L,limb(...kneeR,...ankleR,23,17),P.inkSoft,sd('r2'),3.2);
    inkFill(c,L,[[90-po.step*28,-15+po.jump*25],[142-po.step*28,-17+po.jump*25],[174-po.step*28,-2+po.jump*25],[168-po.step*28,14+po.jump*25],[91-po.step*28,14+po.jump*25]],P.ink,sd('shoe2'),2.6);

    // near reaching arm
    const shR=[64,shoulderY],elR=[95+po.reach*55,-390-po.reach*45],wrR=[125+po.reach*105,-455-po.reach*80];
    inkFill(c,L,limb(...shR,...elR,20,14),P.selfWarm,sd('ra1'),3.4);
    inkFill(c,L,limb(...elR,...wrR,14,10),P.selfPale,sd('ra2'),2.8);
    inkFill(c,L,ell(wrR[0],wrR[1],15,10,-.45,18),P.selfPale,sd('hand2'),2.3);

    // neck/head/hair
    inkFill(c,L,[[-18,-381],[20,-381],[22,-364],[-20,-364]],P.selfPale,sd('neck'),2.5);
    inkFill(c,L,ell(0,headY,47,57,-.03,30),P.selfPale,sd('head'),3.8);
    inkFill(c,L,[[-42,-466],[-31,-500],[-5,-511],[21,-503],[41,-480],[37,-458],[16,-475],[-8,-478],[-30,-463]],P.ink,sd('hair'),2.4);
    ink(c,L,[[-17,-447],[-4,-450]],P.ink,sd('eye'),1.4,.8);
    ink(c,L,[[9,-447],[17,-437],[13,-430]],P.inkSoft,sd('nose'),1.1,.65);
    ink(c,L,[[-7,-418],[10,-416]],P.inkSoft,sd('mouth'),1.1,.6);
    ink(c,L,[[-62,-344],[-50,-333],[-59,-320]],P.cycleGold,sd('notch'),1.9,.9);

    // lagging garment hem
    ink(c,L,[[-44,-199],[-10,-188+Math.sin(L.onTwos(t)*8)*4],[42,-197]],P.inkSoft,sd('hem'),1.5,.65);
    c.restore();

    // landing shadow in world
    c.save();c.globalAlpha=.15*(1-po.jump*.55);c.fillStyle=P.ink;c.beginPath();c.ellipse(po.x,1365,95,20,0,0,TAU);c.fill();c.restore();
  }

  function park(c,L,P,t){
    // distant ground and trees
    c.save();c.globalAlpha=.42;
    c.fillStyle=L.rgba(P.stripeSky,.22);c.fillRect(0,300,1080,780);
    const treeXs=[110,850,970];
    treeXs.forEach((x,i)=>{
      ink(c,L,[[x,1080],[x+10,720-i*40]],P.inkSoft,sd('trunk',i),7,.45,[0,0]);
      for(let k=0;k<7;k++){
        const a=k/7*TAU,px=x+Math.cos(a)*70,py=700-i*40+Math.sin(a)*55;
        inkFill(c,L,ell(px,py,48,34,a*.1,18),P.sage,sd('crown',i,k),1.7,.34);
      }
    });
    // fence / posts
    for(let x=80,i=0;x<=1000;x+=130,i++){
      ink(c,L,[[x,1120],[x,910]],P.inkFaint,sd('post',i),2,.35,[0,0]);
    }
    ink(c,L,[[60,1000],[1010,990]],P.inkFaint,sd('fence1'),2,.3,[0,0]);
    ink(c,L,[[60,1060],[1010,1052]],P.inkFaint,sd('fence2'),2,.3,[0,0]);
    c.restore();

    // grass stems foreground
    for(let i=0;i<26;i++){
      const r=L.rng(sd('grass',i)),x=40+r()*1000,h=55+r()*120;
      ink(c,L,[[x,1530],[x+(r()-.5)*25,1530-h]],P.ageSage,sd('grassline',i),1.3,.45,[2,5]);
    }
  }

  function kite(c,L,P,t){
    const x=785,y=550+Math.sin(L.onTwos(t)*2.2)*14;
    const s=1+Math.sin(L.onTwos(t)*1.7)*.04;
    const q=[[x,y-58*s],[x+46*s,y],[x,y+60*s],[x-46*s,y]];
    inkFill(c,L,q,P.childSky,sd('kite'),3,.76);
    ink(c,L,[[x,y-58*s],[x,y+60*s],[x-46*s,y],[x+46*s,y]],P.inkSoft,sd('kite-ribs'),1.2,.6,[0,0]);
    const string=[[x,y+60*s],[740,690],[690,830],[650,950]];
    ink(c,L,string,P.inkFaint,sd('string'),1.2,.55,[2,8]);
    for(let i=0;i<4;i++){
      const px=740-i*28,py=690+i*82;
      inkFill(c,L,[[px-9,py],[px,py-10],[px+9,py],[px,py+10]],P.birthRose,sd('bow',i),1.2,.6);
    }
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    park(c,L,P,t);
    // ground
    c.fillStyle=L.rgba(P.sage,.15);c.fillRect(0,1320,1080,600);
    ink(c,L,[[0,1370],[1080,1335]],P.inkFaint,sd('ground'),2,.35,[0,0]);

    // incoming branch tangent translated into reach trajectory
    const rp=L.seg(t,0,.45,'outExpo');
    ink(c,L,[[820,650],[760,720],[700,805],[640,930],[600,1080]],P.annBlue,sd('reach'),2.6,.65,[6,12]);
    if(rp>0)L.guideCircle(c,785,550,82+22*rp,{color:P.annYellow,alpha:.25+.25*(1-rp),width:2.2,quadrants:7});

    kite(c,L,P,t);
    child(c,L,P,t);

    // child trajectory and jump annotation
    ink(c,L,[[260,1400],[380,1360],[455,1300],[540,1210],[600,1280],[690,1300]],P.selfWarm,sd('traj'),3.5,.62,[8,16]);
    const jp=L.seg(t,.75,1.15,'outExpo');
    if(jp>0)L.arcAnnotation(c,535,1200,150,2.5,5.0,{color:P.annBlue,width:2.4,p:jp,arrow:12,alpha:.55});

    // exit arc aims at peer field
    const ep=L.seg(t,1.55,2,'outExpo');
    if(ep>0)L.arcAnnotation(c,600,1020,230,-1.2,.25,{color:P.annYellow,width:2.2,p:ep,arrow:10,alpha:.55});
  }});
})();