// 05 · Do it properly · T 12.000–15.000
// Decision + physical handoff. Layers:
// 1 comic page/room, 2 turntable remnant, 3 protagonist decision pose,
// 4 safely gripped record, 5 sliding panel transition, 6 distinct G5 cleaning machine,
// 7 brush/bottle/vacuum tools, 8 first fluid-contact cue at the midpoint cut.
(function(){
  'use strict';
  const ID='decide-clean',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  const G1={cx:540,cy:930,r:285,label:92,hole:8};
  const G5={x:120,y:600,w:840,h:700,r:42,cx:540,cy:930,brush:[815,690],brushContact:[650,815],vacPivot:[205,695],vacA:[320,770],vacB:[680,975]};
  const G6={leftA:145*Math.PI/180,rightA:35*Math.PI/180,rad:278};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.94*a,seed,wobble:.58,tremble:.12,boilAmp:.18,double:w>=5?{offset:2,width:1,alpha:.11,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.42,tremble:.09,boilAmp:.15,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){
    const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;
  }
  function halftone(c,pts,color,spacing=14,r=1.5,a=.15,seed=1){
    c.save();trace(c,pts,true);c.clip();c.fillStyle=color;c.globalAlpha*=a;
    const ox=L.hash(seed,'x')%spacing,oy=L.hash(seed,'y')%spacing;c.beginPath();
    for(let y=-spacing+oy;y<1920+spacing;y+=spacing){
      const sh=(Math.floor(y/spacing)&1)?spacing*.5:0;
      for(let x=-spacing+ox+sh;x<1080+spacing;x+=spacing){c.moveTo(x+r,y);c.arc(x,y,r,0,TAU);}
    }c.fill();c.restore();
  }

  function drawRoom(c,t){
    const fade=1-sstep(1.28,2.15,t);
    if(fade<=0)return;
    c.save();c.globalAlpha*=fade;
    c.fillStyle=P.roomWall;c.fillRect(0,0,1080,1920);
    // warm wall shadow and table
    fill(c,[[0,0],[455,0],[335,1260],[0,1260]],P.paperShade,.33);
    c.fillStyle=P.table;c.fillRect(0,1260,1080,660);
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(22,22,1036,1876);

    // G7 shelf block
    rrect(c,80,420,255,620,12,P.wood,sd('shelf'),3,.94);
    for(let i=0;i<7;i++){
      const x=102+i*29;
      rrect(c,x,500,21,455,3,i%3===0?P.sleeve:(i%3===1?P.duskRose:P.sage),sd('spine',i),1.2,.8);
      line(c,[[x+6,545],[x+15,545]],sd('sp-t',i),1,P.paper,.45);
    }
    // lamp anchor
    line(c,[[790,430],[790,790]],sd('lampstem'),9,P.metal,.6);
    inkFill(c,[[730,430],[850,430],[900,515],[680,515]],P.lamp,sd('lampshade'),3.5,.92);
    fill(c,[[715,520],[865,520],[930,980],[650,980]],P.sun,.06);

    // turntable remnant at lower-right, recognisable but secondary
    rrect(c,575,1120,420,300,26,P.turntableBody,sd('tt'),3.5,.9);
    L.inkCircle(c,730,1270,115,{color:P.ink,width:3.2,fill:P.platter,seed:sd('platter')});
    L.inkCircle(c,730,1270,104,{color:P.vinylEdge,width:3.2,fill:P.vinyl,seed:sd('record-remnant')});
    L.inkCircle(c,730,1270,35,{color:P.labelDeep,width:1.7,fill:P.label,seed:sd('label-remnant')});
    L.inkCircle(c,925,1175,25,{color:P.ink,width:2,fill:P.machineDeep,seed:sd('pivot')});
    line(c,[[925,1175],[860,1225],[810,1275]],sd('arm'),8,P.tonearm,.8);
    c.restore();
  }

  function drawHead(c,x,y,scale,concern=1,a=1){
    c.save();c.translate(x,y);c.scale(scale,scale);c.globalAlpha*=a;
    const head=L.ellipsePts(0,0,72,104,50,-.04);inkFill(c,head,P.skin,sd('head'),5,.99);
    fill(c,[[12,58],[67,34],[45,95],[3,103]],P.skinShadow,.38);
    const hair=[[-70,-42],[-55,-92],[-17,-111],[30,-101],[67,-63],[58,-28],[33,-39],[11,-57],[-4,-37],[-25,-56],[-39,-30]];
    inkFill(c,hair,P.hair,sd('hair'),3.2,.99);
    line(c,[[-45,-14],[-15,-20+3*concern]],sd('b1'),2.8,P.hair,.95);
    line(c,[[11,-19+3*concern],[43,-14-5*concern]],sd('b2'),2.8,P.hair,.95);
    c.fillStyle=P.hair;c.beginPath();c.arc(-28,3,5,0,TAU);c.fill();c.beginPath();c.arc(26,2,5,0,TAU);c.fill();
    line(c,[[3,7],[-2,31],[12,35]],sd('nose'),1.7,P.inkSoft,.65);
    line(c,[[-20,65],[22,64+2*concern]],sd('mouth'),2.2,P.ink,.85);
    c.restore();
  }

  function drawTorso(c,t){
    const fade=1-sstep(1.2,2.08,t);
    if(fade<=0)return;
    const lean=sstep(.1,.65,t);
    c.save();c.globalAlpha*=fade;c.translate(360+14*lean,740+10*lean);c.rotate(.035*lean);
    const torso=[[-185,-25],[-105,-105],[22,-116],[143,-75],[205,120],[178,460],[-165,460],[-210,120]];
    inkFill(c,torso,P.shirt,sd('torso'),6,.98);
    fill(c,[[15,-112],[143,-75],[205,120],[178,460],[22,460]],P.shirtDeep,.48);
    halftone(c,[[30,-90],[143,-75],[205,120],[178,360],[55,310]],P.inkSoft,13,1.5,.13,sd('shirtdots'));
    // tee opening
    inkFill(c,[[-58,-103],[-14,-128],[38,-116],[62,-79],[28,-38],[-28,-38]],P.tee,sd('tee'),2.4,.96);
    // left arm reaches to record
    line(c,[[-132,55],[-95,185],[-10,285]],sd('armL'),44,P.shirt,.99);
    // right arm supports safe grip
    line(c,[[125,32],[95,170],[43,286]],sd('armR'),44,P.shirt,.99);
    drawHead(c,-18,-210,1.0,1,.99);
    c.restore();
  }

  function drawRecordHeld(c,t){
    const grip=sstep(.05,.48,t);
    const lift=sstep(.35,1.0,t);
    const travel=sstep(.95,2.03,t);
    if(grip<=0)return;

    // from lower turntable region toward central cleaning geometry
    const start=[704,1205],mid=[545,865],end=[G1.cx,G1.cy];
    let x,y,scale,tilt;
    if(travel<.01){
      x=lerp(start[0],mid[0],lift);y=lerp(start[1],mid[1],lift);scale=lerp(.72,.92,lift);tilt=lerp(.24,.05,lift);
    }else{
      x=lerp(mid[0],end[0],travel);y=lerp(mid[1],end[1],travel);scale=lerp(.92,1,travel);tilt=lerp(.05,0,travel);
    }

    c.save();c.translate(x,y);c.scale(scale,scale);c.rotate(tilt);
    drawRecordLocal(c,t,travel);
    // safe grips at 4/8 o'clock positions
    const left=[Math.cos(G6.leftA)*G6.rad,Math.sin(G6.leftA)*G6.rad];
    const right=[Math.cos(G6.rightA)*G6.rad,Math.sin(G6.rightA)*G6.rad];
    drawGripHand(c,left[0],left[1],-.9,sd('gripL'),grip);
    drawGripHand(c,right[0],right[1],2.16,sd('gripR'),grip);
    c.restore();
  }

  function drawRecordLocal(c,t,cleanTransfer=0){
    const outer=L.ellipsePts(0,0,G1.r,G1.r,96);
    fill(c,outer,P.vinyl,.995);
    c.save();c.strokeStyle=P.groove;c.lineWidth=1.15;c.globalAlpha=.72;
    for(let i=0;i<38;i++){const rr=G1.r-18-i*4.05;if(rr<G1.label+18)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.white;c.lineWidth=1.8;c.globalAlpha=.2;
    for(let i=0;i<7;i++){const rr=255-i*20;c.beginPath();c.arc(0,0,rr,-1.1+i*.05,-.36+i*.04);c.stroke();}
    // still visibly contaminated before cleaning
    const rng=L.rng(sd('dust'));
    c.fillStyle=P.dust;c.globalAlpha=.72*(1-.15*cleanTransfer);
    for(let i=0;i<23;i++){const a=rng()*TAU,rad=120+rng()*145,d=1.6+rng()*2.5;c.beginPath();c.arc(Math.cos(a)*rad,Math.sin(a)*rad,d,0,TAU);c.fill();}
    c.restore();
    c.fillStyle=P.label;c.beginPath();c.arc(0,0,G1.label,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=2.2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,G1.hole,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*68,Math.sin(-.56)*68);c.stroke();
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.45,tremble:.1,boilAmp:.15});
  }

  function drawGripHand(c,x,y,rot,seed,a=1){
    c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha*=a;
    const palm=[[-65,-42],[10,-48],[68,-18],[70,38],[8,67],[-61,30]];
    inkFill(c,palm,P.skin,seed,4.5,.98);
    fill(c,[[10,-45],[64,-16],[63,34],[15,41]],P.skinShadow,.27);
    // fingers hook around the rim rather than flattening onto grooves
    for(let i=0;i<3;i++){
      const yy=-28+i*23;
      inkFill(c,[[35,yy],[112,yy+2],[122,yy+16],[46,yy+18]],P.skin,seed+10+i,2.1,.98);
    }
    // thumb enters toward label-safe inner region
    inkFill(c,[[-5,-7],[50,-1],[62,20],[11,31],[-27,12]],P.skin,seed+20,2.4,.98);
    c.restore();
  }

  function drawCleaningPanel(c,t){
    const reveal=sstep(1.1,1.9,t);
    if(reveal<=0)return;

    const wipeX=lerp(1080,0,reveal);
    c.save();c.globalAlpha*=reveal;
    // page panel wipes in from right
    c.fillStyle=P.gutter;c.fillRect(wipeX,0,1080-wipeX,1920);
    c.beginPath();c.rect(wipeX,0,1080-wipeX,1920);c.clip();
    c.fillStyle=P.table;c.fillRect(0,0,1080,1920);

    // utilitarian cleaning machine, deliberately not a turntable
    const body=rrect(c,G5.x,G5.y,G5.w,G5.h,G5.r,P.machine,sd('machine'),4.8,.99);
    fill(c,[[G5.x+10,G5.y+500],[G5.x+G5.w-10,G5.y+500],[G5.x+G5.w-20,G5.y+G5.h-18],[G5.x+20,G5.y+G5.h-18]],P.machineDeep,.18);
    // vents / utility details
    for(let i=0;i<7;i++)line(c,[[730,1200+i*12],[895,1200+i*12]],sd('vent',i),1.4,P.machineDeep,.45);
    L.inkCircle(c,880,675,30,{color:P.ink,width:2.4,fill:P.machineDeep,seed:sd('switch')});
    L.ticks(c,880,675,{r:43,n:10,len:6,major:5,majorLen:11,color:P.inkSoft,alpha:.35,width:1});

    // cleaning platter under record
    L.inkCircle(c,G5.cx,G5.cy,298,{color:P.ink,width:4,fill:P.machineDeep,seed:sd('clean-platter')});
    L.inkCircle(c,G5.cx,G5.cy,116,{color:P.inkSoft,width:2.4,fill:P.machine,seed:sd('hub')});
    L.inkCircle(c,G5.cx,G5.cy,8,{color:P.ink,width:1.6,fill:P.metal,seed:sd('clean-spindle')});

    // vacuum wand parked visibly at left, mechanically distinct
    L.inkCircle(c,G5.vacPivot[0],G5.vacPivot[1],38,{color:P.ink,width:3,fill:P.machineDeep,seed:sd('vacpivot')});
    line(c,[[G5.vacPivot[0],G5.vacPivot[1]],[285,740],[410,810]],sd('vacpark'),32,P.vacuum,.92);
    line(c,[[400,800],[470,842]],sd('vacslot'),10,P.ink,.82);

    // brush tray at upper-right
    rrect(c,735,650,170,66,18,P.brush,sd('brushtray'),2.6,.95);
    c.save();c.fillStyle=P.brushFiber;c.globalAlpha=.9;
    for(let i=0;i<22;i++)c.fillRect(748+i*6.5,707,3,34+(i%3)*3);
    c.restore();

    // small fluid bottle/nozzle
    rrect(c,790,1090,82,145,18,P.fluidPale,sd('bottle'),2.4,.92);
    rrect(c,812,1058,38,42,8,P.machineDeep,sd('bottlecap'),2,.9);
    line(c,[[831,1058],[831,1028],[800,1010]],sd('nozzle'),8,P.metal,.95);

    c.restore();

    // panel edge itself, screen-fixed
    c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.globalAlpha=.9*reveal;c.beginPath();c.moveTo(wipeX,0);c.lineTo(wipeX,1920);c.stroke();c.restore();
  }

  function drawNozzleAndFluid(c,t){
    const enter=sstep(2.25,2.72,t);
    if(enter<=0)return;
    // nozzle reaches exact G1/G5 record from upper-right
    const nx=lerp(940,760,enter),ny=lerp(620,760,enter);
    line(c,[[nx+110,ny-90],[nx+58,ny-25],[nx,ny]],sd('live-nozzle'),12,P.metal,.98);
    inkFill(c,L.rrectPts(nx+35,ny-62,110,68,14,12),P.fluidPale,sd('live-bottle'),2.4,.97);

    // first bead appears exactly at t=3 on outgoing frame, ready for shot 06
    const bead=sstep(2.84,2.99,t);
    if(bead>0){
      const bx=705,by=760;
      c.save();c.fillStyle=P.fluid;c.globalAlpha=.95*bead;c.beginPath();c.arc(bx,by,8+5*bead,0,TAU);c.fill();c.restore();
      L.guideCircle(c,bx,by,22+18*bead,{color:P.cleanTeal,alpha:.2*bead,width:1.8,quadrants:6});
    }
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});

      // 1–3: decision in the listening room
      drawRoom(c,t);
      drawTorso(c,t);

      // 4–7: panel wipe reveals concrete cleaning setup
      drawCleaningPanel(c,t);
      drawRecordHeld(c,t);
      drawNozzleAndFluid(c,t);

      // decisive, brief comic slash on the lift beat
      const hit=sstep(.42,.52,t)*(1-sstep(.7,.9,t));
      if(hit>0){
        line(c,[[160,1070],[360,865]],sd('slash1'),4,P.red,.5*hit);
        line(c,[[210,1130],[395,930]],sd('slash2'),2.8,P.ochre,.38*hit);
      }
    }
  });
})();