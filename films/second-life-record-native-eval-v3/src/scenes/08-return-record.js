// 08 · Back to the deck · T 21.000–24.000
// Return/carry shot. Layers:
// 1 comic page / room re-entry, 2 close safe grip, 3 circular panel wipe,
// 4 exact G2 turntable, 5 same dry G1 record settling onto platter,
// 6 withdrawing hands, 7 cleanGold continuity arc.
(function(){
  'use strict';
  const ID='return-record',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  const G1={cx:540,cy:930,r:285,label:92,hole:8};
  const G2={x:105,y:575,w:870,h:760,r:38,pivot:[900,655],contact:[698,814],control:[865,1225]};
  const G6={leftA:145*Math.PI/180,rightA:35*Math.PI/180,rad:315};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.94*a,seed,wobble:.52,tremble:.1,boilAmp:.17,double:w>=5?{offset:2,width:1,alpha:.1,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.38,tremble:.08,boilAmp:.13,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;}

  function drawPage(c,t){
    c.fillStyle=P.roomWall;c.fillRect(0,0,1080,1920);
    fill(c,[[0,0],[440,0],[320,1920],[0,1920]],P.paperShade,.28);
    c.fillStyle=P.table;c.fillRect(0,1260,1080,660);
    // background room anchors
    rrect(c,80,420,255,620,12,P.wood,sd('shelf'),3,.9);
    for(let i=0;i<7;i++){
      const x=103+i*29;rrect(c,x,500,21,455,3,i%3===0?P.sleeve:(i%3===1?P.duskRose:P.sage),sd('spine',i),1.1,.72);
    }
    line(c,[[790,430],[790,780]],sd('lampstem'),9,P.metal,.6);
    inkFill(c,[[730,430],[850,430],[900,515],[680,515]],P.lamp,sd('lampshade'),3.4,.9);
    fill(c,[[715,520],[865,520],[930,980],[650,980]],P.sun,.06);
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);
  }

  function drawTurntable(c,t){
    const reveal=sstep(.95,1.65,t);
    if(reveal<=0)return;
    c.save();c.globalAlpha*=reveal;
    rrect(c,G2.x,G2.y,G2.w,G2.h,G2.r,P.turntableBody,sd('plinth'),4.6,.98);
    fill(c,[[G2.x+12,G2.y+G2.h-120],[G2.x+G2.w-12,G2.y+G2.h-120],[G2.x+G2.w-20,G2.y+G2.h-18],[G2.x+20,G2.y+G2.h-18]],P.paperShade,.25);
    c.fillStyle=P.platter;c.beginPath();c.arc(G1.cx,G1.cy,312,0,TAU);c.fill();c.strokeStyle=P.ink;c.lineWidth=5;c.stroke();
    c.strokeStyle=P.metal;c.lineWidth=4;c.globalAlpha=.65;
    for(let r=294;r<=308;r+=7){c.beginPath();c.arc(G1.cx,G1.cy,r,0,TAU);c.stroke();}
    c.globalAlpha=1;c.fillStyle=P.mat;c.beginPath();c.arc(G1.cx,G1.cy,292,0,TAU);c.fill();
    // controls / rest exactly echo scene03
    L.inkCircle(c,G2.control[0],G2.control[1],34,{color:P.ink,width:3,fill:P.machineDeep,seed:sd('ctrl')});
    L.inkCircle(c,G2.control[0],G2.control[1],13,{color:P.metal,width:1.5,fill:P.metal,seed:sd('ctrl2')});
    rrect(c,780,710,80,32,12,P.machineDeep,sd('rest'),2,.75);
    line(c,[[820,710],[820,665]],sd('rest-post'),4,P.metal,.65);
    L.inkCircle(c,G2.pivot[0],G2.pivot[1],50,{color:P.ink,width:3.2,fill:P.machineDeep,seed:sd('pivot')});
    L.inkCircle(c,G2.pivot[0],G2.pivot[1],25,{color:P.inkSoft,width:2,fill:P.metal,seed:sd('pivot2')});
    // tonearm remains at rest; second-play owns movement
    line(c,[G2.pivot,[940,700],[970,760]],sd('arm-rest'),14,P.tonearm,.9);
    c.restore();
  }

  function drawRecordAt(c,x,y,scale,rot,a=1,dry=true){
    c.save();c.translate(x,y);c.scale(scale,scale);c.rotate(rot);c.globalAlpha*=a;
    const outer=L.ellipsePts(0,0,G1.r,G1.r,96);
    fill(c,outer,P.vinyl,.995);
    c.strokeStyle=P.groove;c.lineWidth=1.1;c.globalAlpha=.82;
    for(let i=0;i<40;i++){const rr=G1.r-18-i*4.0;if(rr<G1.label+18)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.white;c.lineWidth=1.8;c.globalAlpha=.28;
    for(let i=0;i<9;i++){const rr=252-i*18;c.beginPath();c.arc(0,0,rr,-1.06+i*.04,-.34+i*.05);c.stroke();}
    // tiny residual dust only, to avoid magical perfection
    const rng=L.rng(sd('dust'));
    c.fillStyle=P.dust;c.globalAlpha=.18;
    for(let i=0;i<5;i++){const aa=rng()*TAU,rad=130+rng()*130,d=1.3+rng()*1.6;c.beginPath();c.arc(Math.cos(aa)*rad,Math.sin(aa)*rad,d,0,TAU);c.fill();}
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,G1.label,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=2.2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,G1.hole,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*68,Math.sin(-.56)*68);c.stroke();
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.44,tremble:.09,boilAmp:.14});
    c.restore();
  }

  function drawGrip(c,x,y,rot,seed,a){
    c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha*=a;
    const palm=[[-64,-42],[8,-48],[64,-17],[67,38],[8,65],[-60,30]];
    inkFill(c,palm,P.skin,seed,4.3,.98);
    fill(c,[[8,-45],[60,-16],[60,32],[14,40]],P.skinShadow,.26);
    for(let i=0;i<3;i++){
      const yy=-28+i*23;
      inkFill(c,[[35,yy],[74,yy+2],[82,yy+15],[46,yy+18]],P.skin,seed+10+i,2.1,.98);
    }
    inkFill(c,[[-4,-7],[46,-1],[57,19],[10,30],[-26,12]],P.skin,seed+20,2.3,.98);
    c.restore();
  }

  function drawCarry(c,t){
    const lift=sstep(.05,.48,t);
    const travel=sstep(.45,1.55,t);
    const settle=sstep(1.55,2.55,t);
    const release=sstep(2.45,2.95,t);

    const start=[540,930],mid=[520,760],end=[G1.cx,G1.cy];
    let x,y,scale,rot;
    if(travel<.98){
      x=lerp(start[0],mid[0],travel);
      y=lerp(start[1],mid[1],travel);
      scale=lerp(1.0,.90,travel);
      rot=lerp(0,.12,travel);
    }else{
      x=lerp(mid[0],end[0],settle);
      y=lerp(mid[1],end[1],settle);
      scale=lerp(.90,1.0,settle);
      rot=lerp(.12,0,settle);
    }

    // hands and disc travel together; hands fade only after disc reaches G2
    c.save();c.translate(x,y);c.scale(scale,scale);c.rotate(rot);
    drawRecordAt(c,0,0,1,0,1,true);
    const handA=1-release;
    if(handA>0){
      const left=[Math.cos(G6.leftA)*G6.rad,Math.sin(G6.leftA)*G6.rad];
      const right=[Math.cos(G6.rightA)*G6.rad,Math.sin(G6.rightA)*G6.rad];
      drawGrip(c,left[0],left[1],-.9,sd('gripL'),handA);
      drawGrip(c,right[0],right[1],2.16,sd('gripR'),handA);
    }
    c.restore();

    // exact final spindle state begins before hand fully leaves
    if(settle>.72){
      L.inkCircle(c,G1.cx,G1.cy,8,{color:P.ink,width:1.5,fill:P.metal,seed:sd('spindle')});
    }
  }

  function drawCircularWipe(c,t){
    const p=sstep(.5,1.45,t);
    if(p<=0 || p>=1)return;
    const r=lerp(120,760,p);
    c.save();c.strokeStyle=P.cleanGold;c.lineWidth=4;c.globalAlpha=.35*(1-Math.abs(.5-p)*1.2);
    c.beginPath();c.arc(540,930,r,0,TAU);c.stroke();c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});
      drawPage(c,t);
      drawTurntable(c,t);
      drawCarry(c,t);
      drawCircularWipe(c,t);

      // small placement cue, not explanatory text
      const place=sstep(2.35,2.6,t)*(1-sstep(2.75,2.95,t));
      if(place>0)L.guideCircle(c,G1.cx,G1.cy,34+22*place,{color:P.cleanGold,alpha:.22*place,width:1.8,quadrants:6});
    }
  });
})();