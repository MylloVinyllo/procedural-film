// 01 · The sleeve · T 0.000–3.000
// Animated-comic cold open. Layers back-to-front:
// 1 room/wall, 2 shelf/listening props, 3 protagonist torso/head, 4 sleeve,
// 5 arms/hands, 6 emerging record, 7 selective comic accents.
(function(){
  'use strict';

  const ID='find-record';
  const L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,alpha=1){
    c.save();c.globalAlpha*=alpha;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();
  }
  function inkFill(c,pts,fillColor,seed,width=3,alpha=1){
    fill(c,pts,fillColor,alpha);
    L.inkPath(c,pts,{closed:true,color:P.ink,width,alpha:.92*alpha,seed,wobble:.8,tremble:.18,boilAmp:.3,double:width>=5?{offset:2,width:1,alpha:.12,seed:seed+1}:undefined});
  }
  function halftone(c,pts,color,spacing=13,r=1.6,alpha=.28,seed=1){
    c.save();trace(c,pts,true);c.clip();
    const ox=(L.hash(seed,'x')%spacing),oy=(L.hash(seed,'y')%spacing);
    c.fillStyle=color;c.globalAlpha*=alpha;
    c.beginPath();
    for(let y=-spacing+oy;y<1920+spacing;y+=spacing){
      const row=Math.floor(y/spacing),shift=(row&1)?spacing*.5:0;
      for(let x=-spacing+ox+shift;x<1080+spacing;x+=spacing){
        c.moveTo(x+r,y);c.arc(x,y,r,0,TAU);
      }
    }
    c.fill();c.restore();
  }
  function line(c,pts,seed,width=2,color=P.inkSoft,alpha=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width,alpha,seed,wobble:.65,tremble:.14,boilAmp:.22,taper:[4,8]});
  }
  function rectPts(x,y,w,h){return [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}

  function drawRoom(c,t){
    // warm wall with one graphic shadow band
    c.save();c.fillStyle=P.roomWall;c.globalAlpha=.92;c.fillRect(0,0,1080,1920);c.restore();
    const wallShadow=[[0,0],[360,0],[115,1180],[0,1260]];
    fill(c,wallShadow,P.paperShade,.32);
    halftone(c,wallShadow,P.inkFaint,16,1.25,.12,sd('wall-dot'));

    // framed print: generic geometry, no readable text
    const frame=rectPts(690,250,230,300);
    inkFill(c,frame,P.paper,sd('frame'),3,.8);
    fill(c,[[725,300],[885,300],[845,420],[755,420]],P.teal,.38);
    fill(c,[[745,455],[860,455],[805,505]],P.ochre,.52);

    // practical lamp
    line(c,[[835,545],[820,780]],sd('lamp-arm'),5,P.inkSoft,.75);
    const shade=[[748,520],[900,520],[938,625],[712,625]];
    inkFill(c,shade,P.lamp,sd('lamp-shade'),3.5,.95);
    fill(c,[[745,625],[905,625],[875,690],[775,690]],P.sun,.14);

    // listening table and generic turntable/speaker in background
    c.save();c.fillStyle=P.table;c.globalAlpha=.94;c.fillRect(330,1210,750,320);c.restore();
    const tt=rectPts(530,1050,385,235);
    inkFill(c,tt,P.turntableBody,sd('tt'),2.6,.66);
    c.save();c.globalAlpha=.48;c.fillStyle=P.mat;c.beginPath();c.ellipse(655,1163,105,34,0,0,TAU);c.fill();c.restore();
    line(c,[[822,1090],[775,1135],[745,1170]],sd('tonearm-bg'),3,P.tonearm,.65);
    const sp=rectPts(915,760,145,420);
    inkFill(c,sp,P.speaker,sd('speaker'),3,.72);
    c.save();c.fillStyle=P.speakerCone;c.globalAlpha=.75;
    c.beginPath();c.arc(987,1010,48,0,TAU);c.fill();
    c.beginPath();c.arc(987,865,25,0,TAU);c.fill();c.restore();

    // full-frame comic border
    c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);c.restore();
  }

  function drawShelf(c,t){
    const shelf=rectPts(0,345,330,980);
    fill(c,shelf,P.wood,.88);
    L.hatch(c,shelf,{angle:.08,spacing:17,width:1,color:P.inkSoft,alpha:.18,density:.28,length:[28,100],seed:sd('wood-h'),clip:true});
    // vertical shelf uprights and shelves
    line(c,[[320,350],[320,1325]],sd('shelf-edge'),5,P.ink,.74);
    [615,895,1180].forEach((y,i)=>line(c,[[0,y],[320,y]],sd('shelf',i),5,P.inkSoft,.62));

    const colors=[P.sleeve,P.rose,P.teal,P.paperDeep,P.stripeSky,P.ochre,P.dusk,P.sage];
    let x=35;
    for(let i=0;i<13;i++){
      const w=16+(i%4)*7,h=190+(i%3)*14,y=610-h;
      const pts=rectPts(x,y,w,h);
      fill(c,pts,colors[i%colors.length],.72);
      L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:1.2,alpha:.55,seed:sd('spine',i),wobble:.45,tremble:.08});
      // abstract spine marks
      if(i%2===0)line(c,[[x+4,y+25],[x+w-4,y+25]],sd('mark',i),.9,P.white,.42);
      x+=w+5;
    }
    // a plant and headphones help sell the room
    line(c,[[95,905],[120,790],[142,710]],sd('plant-stem'),3,P.leaf,.6);
    for(let i=0;i<6;i++){
      const y=790-i*28,x0=120+i*4,side=i%2?1:-1;
      const leaf=L.ellipsePts(x0+side*32,y,40,15,24,side*.25);
      inkFill(c,leaf,P.leaf,sd('plant-leaf',i),1.5,.46);
    }
    L.arcAnnotation(c,210,1000,55,Math.PI*.15,Math.PI*1.85,{color:P.inkSoft,width:5,p:1,alpha:.42});
  }

  function headGeo(cx,cy,scale,tilt=0){
    const head=L.ellipsePts(cx,cy,64*scale,84*scale,46,tilt);
    return head;
  }
  function drawHead(c,cx,cy,scale,lookX,emotion,t){
    const head=headGeo(cx,cy,scale,-.05);
    inkFill(c,head,P.skin,sd('head'),5*scale,.98);
    // skin shadow jaw/neck side
    const jaw=[[cx+12*scale,cy+50*scale],[cx+56*scale,cy+30*scale],[cx+42*scale,cy+76*scale],[cx+2*scale,cy+88*scale]];
    fill(c,jaw,P.skinShadow,.42);
    halftone(c,jaw,P.inkSoft,11*scale,1.2*scale,.14,sd('jaw-dot'));

    // hair mass with one identifying notch
    const hair=[
      [cx-61*scale,cy-35*scale],[cx-48*scale,cy-73*scale],[cx-12*scale,cy-88*scale],[cx+28*scale,cy-80*scale],
      [cx+58*scale,cy-52*scale],[cx+51*scale,cy-21*scale],[cx+27*scale,cy-33*scale],[cx+9*scale,cy-46*scale],
      [cx-4*scale,cy-30*scale],[cx-20*scale,cy-48*scale],[cx-33*scale,cy-23*scale]
    ];
    inkFill(c,hair,P.hair,sd('hair'),3.5*scale,.98);
    // ear
    const ear=L.ellipsePts(cx+60*scale,cy+5*scale,12*scale,19*scale,20,.08);
    inkFill(c,ear,P.skin,sd('ear'),2*scale,.94);

    // brows, eyes, nose, mouth: simple comic planes
    const gaze=clamp((lookX-cx)/(260*scale),-.5,.5);
    line(c,[[cx-39*scale,cy-12*scale],[cx-14*scale,cy-15*scale]],sd('browL'),2.5*scale,P.hair,.9);
    line(c,[[cx+10*scale,cy-16*scale],[cx+36*scale,cy-12*scale]],sd('browR'),2.5*scale,P.hair,.9);
    c.save();c.fillStyle=P.hair;c.globalAlpha=.9;
    c.beginPath();c.arc(cx-24*scale+gaze*6,cy+2*scale,4.5*scale,0,TAU);c.fill();
    c.beginPath();c.arc(cx+22*scale+gaze*6,cy+1*scale,4.5*scale,0,TAU);c.fill();c.restore();
    line(c,[[cx+2*scale,cy+4*scale],[cx-2*scale,cy+25*scale],[cx+10*scale,cy+29*scale]],sd('nose'),1.7*scale,P.inkSoft,.65);
    const mouthY=cy+52*scale;
    line(c,[[cx-18*scale,mouthY],[cx+18*scale,mouthY+(emotion||0)*5*scale]],sd('mouth'),2*scale,P.ink,.82);
  }

  function drawTorso(c,t){
    // stable character silhouette
    const torso=[
      [470,690],[585,675],[710,730],[780,930],[748,1220],[430,1220],[395,955]
    ];
    inkFill(c,torso,P.shirt,sd('torso'),6,.98);
    const shirtShadow=[[650,720],[715,755],[780,930],[748,1220],[650,1195],[630,900]];
    fill(c,shirtShadow,P.shirtDeep,.62);
    halftone(c,shirtShadow,P.inkSoft,14,1.5,.18,sd('shirt-dot'));

    const tee=[[535,705],[610,700],[650,830],[600,1010],[515,1010],[475,830]];
    inkFill(c,tee,P.tee,sd('tee'),2.2,.86);

    // collar and folds
    line(c,[[505,715],[548,760],[585,710]],sd('collar'),2.2,P.inkSoft,.68);
    line(c,[[462,840],[520,900],[500,1115]],sd('fold1'),2,P.inkSoft,.42);
    line(c,[[690,820],[645,930],[690,1100]],sd('fold2'),2,P.inkSoft,.4);
    drawHead(c,570,590,1.05,410,0,t);
    // neck
    const neck=rectPts(535,645,70,80);
    fill(c,neck,P.skin,.94);fill(c,[[570,645],[605,645],[605,725],[570,710]],P.skinShadow,.38);
  }

  function capsule(c,a,b,w,color,seed,alpha=.95){
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx);
    const pts=L.capsulePts((a[0]+b[0])/2,(a[1]+b[1])/2,len+w,w/2,ang,40);
    inkFill(c,pts,color,seed,4,alpha);return pts;
  }

  function drawHand(c,x,y,rot,scale,grip,seed){
    c.save();c.translate(x,y);c.rotate(rot);c.scale(scale,scale);
    const palm=[[-42,-52],[28,-48],[55,-12],[43,48],[-30,58],[-55,18]];
    inkFill(c,palm,P.skin,seed,4,.98);
    fill(c,[[10,-45],[50,-15],[40,45],[10,36]],P.skinShadow,.28);
    // fingers grouped, then thumb separated for readable grip
    const fingers=[
      [[15,-48],[75,-43],[82,-25],[20,-21]],
      [[20,-20],[86,-13],[86,7],[20,5]],
      [[18,8],[78,16],[75,34],[12,30]]
    ];
    fingers.forEach((pts,i)=>inkFill(c,pts,P.skin,seed+10+i,2.2,.98));
    const thumb=grip==='label'
      ? [[-5,-10],[44,-8],[54,13],[15,24],[-18,13]]
      : [[-18,-12],[28,-3],[36,20],[4,32],[-30,15]];
    inkFill(c,thumb,P.skin,seed+20,2.6,.98);
    line(c,[[-28,12],[13,18]],seed+30,1.4,P.skinShadow,.55);
    c.restore();
  }

  function drawSleeve(c,x,y,rot,scale,alpha=1){
    c.save();c.translate(x,y);c.rotate(rot);c.scale(scale,scale);c.globalAlpha*=alpha;
    const pts=[[-225,-225],[225,-225],[225,225],[-225,225]];
    inkFill(c,pts,P.sleeve,sd('sleeve'),4.5,.98);
    fill(c,[[-225,70],[225,-20],[225,225],[-225,225]],P.sleeveShadow,.35);
    halftone(c,[[-225,70],[225,-20],[225,225],[-225,225]],P.inkSoft,15,1.3,.14,sd('sleeve-dot'));
    // simple abstract cover, not a brand
    fill(c,[[-155,-125],[90,-125],[140,-15],[-110,-15]],P.teal,.48);
    fill(c,[[-40,25],[145,25],[95,150],[-90,150]],P.rose,.5);
    L.inkPath(c,[[-225,-225],[225,-225],[225,225],[-225,225]],{closed:true,color:P.ink,width:4.5,seed:sd('sleeve-edge'),wobble:.8,tremble:.16});
    c.restore();
  }

  function drawRecord(c,cx,cy,r,rot,alpha,dusty){
    c.save();c.translate(cx,cy);c.rotate(rot);c.globalAlpha*=alpha;
    const outer=L.ellipsePts(0,0,r,r,80);
    fill(c,outer,P.vinyl,.99);
    // grouped grooves
    c.strokeStyle=P.groove;c.globalAlpha*=.65;c.lineWidth=1.05;
    for(let i=0;i<32;i++){
      const rr=r-18-i*(r-125)/34;
      c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();
    }
    // moving/reflected groove arcs
    c.strokeStyle=P.white;c.lineWidth=1.6;c.globalAlpha=.24;
    for(let i=0;i<8;i++){
      const rr=r-34-i*18,a=-.9+i*.19;
      c.beginPath();c.arc(0,0,rr,a,a+.65);c.stroke();
    }
    // label
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,72,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,7,0,TAU);c.fill();
    // orientation mark
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*58,Math.sin(-.56)*58);c.stroke();
    if(dusty){
      const rrng=L.rng(sd('dust'));
      c.fillStyle=P.dust;c.globalAlpha=.82;
      for(let i=0;i<26;i++){
        const a=rrng()*TAU,rad=105+rrng()*(r-125),d=1.5+rrng()*3.2;
        c.beginPath();c.arc(Math.cos(a)*rad,Math.sin(a)*rad,d,0,TAU);c.fill();
      }
      c.strokeStyle=P.dust;c.lineWidth=2;c.globalAlpha=.65;
      for(let i=0;i<5;i++){
        const a=rrng()*TAU,rad=130+rrng()*(r-150),x=Math.cos(a)*rad,y=Math.sin(a)*rad;
        c.beginPath();c.moveTo(x-18,y-8);c.quadraticCurveTo(x,y+3,x+26,y+10);c.stroke();
      }
    }
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.55,tremble:.12,boilAmp:.2});
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur),tw=L.onTwos(t);
      const take=sstep(.05,1.0,t);
      const pull=sstep(.75,2.15,t);
      const clear=sstep(1.25,2.45,t);
      const push=sstep(1.5,3.0,t);

      L.paper(c,{seed:sd('paper')});
      drawRoom(c,t);
      drawShelf(c,t);

      // protagonist base
      drawTorso(c,t);

      // left stabilising arm reaches sleeve
      const la0=[455,800],la1=[360,875],la2=[300,930];
      capsule(c,la0,la1,72,P.shirt,sd('armL1'));
      capsule(c,la1,la2,62,P.skin,sd('armL2'));
      drawHand(c,295,935,-.2,.72,'edge',sd('handL'));

      // sleeve leaves shelf and moves toward the character
      const sx=lerp(210,410,take),sy=lerp(830,890,take),srot=lerp(-.04,.06,take);
      drawSleeve(c,sx,sy,srot,.82,1);

      // right arm follows the record extraction
      const shoulder=[680,785];
      const elbow=[lerp(720,665,pull),lerp(920,975,pull)];
      const hand=[lerp(665,600,pull),lerp(1010,945,pull)];
      capsule(c,shoulder,elbow,74,P.shirt,sd('armR1'));
      capsule(c,elbow,hand,60,P.skin,sd('armR2'));

      // record emerges from sleeve. Keep it physically behind the hand but above sleeve.
      const rcx=lerp(sx+170,615,clear);
      const rcy=lerp(sy-5,930,clear);
      const rr=lerp(205,238,clear);
      c.save();
      // clip the record inside sleeve early, then release it
      if(clear<.65){
        c.beginPath();c.rect(sx-185,sy-185,390,370);c.clip();
      }
      drawRecord(c,rcx,rcy,rr,lerp(.06,-.03,clear),1,true);
      c.restore();

      drawHand(c,hand[0],hand[1],-.05,.72,'label',sd('handR'));

      // clear safe grip cue at the end: secondary left fingertips touch the outer rim
      if(clear>.7){
        const p=sstep(.7,1,clear);
        drawHand(c,390+45*p,1110-75*p,.18,.58,'edge',sd('support-hand'));
      }

      // face re-drawn last for crisp story priority
      drawHead(c,570,590,1.05,rcx,-.05,t);

      // subtle attention arc on emerging record only at the end
      const att=sstep(2.25,2.55,t)*(1-sstep(2.82,3.0,t));
      if(att>0)L.arcAnnotation(c,rcx,rcy,rr+28,-1.2,.1,{color:P.cleanGold,width:2.3,p:att,arrow:8,alpha:.52});

      // foreground shelf edge for depth
      const fg=[[0,1250],[110,1215],[150,1920],[0,1920]];
      fill(c,fg,P.wood,.72);
      L.hatch(c,fg,{angle:.75,spacing:10,width:1.1,color:P.inkSoft,alpha:.3,density:.45,length:[16,50],seed:sd('fg-h'),clip:true});

      // camera-like focus is achieved by surrounding parallax, while the outgoing record remains readable.
      if(push>0){
        c.save();c.strokeStyle=L.rgba(P.inkFaint,.12*push);c.lineWidth=1;
        [300,370].forEach((r,i)=>{c.beginPath();c.arc(rcx,rcy,r+30*push,0,TAU);c.stroke();});
        c.restore();
      }
    }
  });
})();