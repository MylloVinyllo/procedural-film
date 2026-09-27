// 09 · Same needle · T 24.000–27.000
// Deliberate mirror of scene 03. Layers:
// 1 table/panel, 2 exact G2 plinth/platter, 3 same G1 cleaned record,
// 4 start control/hand, 5 exact mirrored tonearm timing, 6 G3 stylus macro,
// 7 stable cleanGold/cleanTeal music graphics after contact.
(function(){
  'use strict';
  const ID='second-play',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  const G1={cx:540,cy:930,r:285,label:92,hole:8};
  const G2={x:105,y:575,w:870,h:760,r:38,pivot:[900,655],contact:[698,814],control:[865,1225]};
  const G3={x:555,y:255,w:350,h:430,cx:730,cy:480,contact:[730,515]};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.92*a,seed,wobble:.55,tremble:.12,boilAmp:.2,double:w>=5?{offset:2,width:1,alpha:.12,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.4,tremble:.09,boilAmp:.14,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;}

  function drawTable(c){
    c.fillStyle=P.table;c.fillRect(0,0,1080,1920);
    // Static wood grain is deliberately cheap: preserve room identity without spending
    // procedural ink-path cost before the actual playback action begins.
    c.save();c.strokeStyle=P.inkSoft;c.lineWidth=1;c.globalAlpha=.10;
    for(let i=0;i<18;i++){
      const y=92+i*98;
      c.beginPath();c.moveTo(-40,y);c.lineTo(1120,y+8*Math.sin(i*.8));c.stroke();
    }
    c.restore();
    fill(c,[[0,0],[430,0],[120,1920],[0,1920]],P.paperDeep,.13);
    fill(c,[[1080,0],[880,0],[1020,1920],[1080,1920]],P.sunset,.05);
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);
  }

  function drawRecord(c,rot){
    c.save();c.translate(G1.cx,G1.cy);c.rotate(rot);
    const outer=L.ellipsePts(0,0,G1.r,G1.r,96);
    fill(c,outer,P.vinyl,.995);
    c.strokeStyle=P.groove;c.lineWidth=1.1;c.globalAlpha=.82;
    for(let i=0;i<38;i++){const rr=G1.r-18-i*4.05;if(rr<G1.label+20)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.vinylEdge;c.globalAlpha=.28;c.lineWidth=3;
    [260,224,187,151,122].forEach(r=>{c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();});
    // cleaner surface: same object identity, only sparse residue
    const rng=L.rng(sd('dust'));
    c.fillStyle=P.dust;c.globalAlpha=.18;
    for(let i=0;i<5;i++){const a=rng()*TAU,rad=135+rng()*125,d=1.3+rng()*1.5;c.beginPath();c.arc(Math.cos(a)*rad,Math.sin(a)*rad,d,0,TAU);c.fill();}
    c.strokeStyle=P.white;c.lineWidth=1.8;c.globalAlpha=.34;
    for(let i=0;i<10;i++){const r=255-i*17;c.beginPath();c.arc(0,0,r,-1.12+i*.03,-.38+i*.045);c.stroke();}
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,G1.label,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=2.2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,G1.hole,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*68,Math.sin(-.56)*68);c.stroke();
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.45,tremble:.1,boilAmp:.16});
    c.restore();
    L.inkCircle(c,G1.cx,G1.cy,7,{color:P.ink,width:1.5,fill:P.metal,seed:sd('spindle')});
  }

  function drawTurntable(c,t){
    rrect(c,G2.x,G2.y,G2.w,G2.h,G2.r,P.turntableBody,sd('plinth'),4.6,.98);
    fill(c,[[G2.x+12,G2.y+G2.h-120],[G2.x+G2.w-12,G2.y+G2.h-120],[G2.x+G2.w-20,G2.y+G2.h-18],[G2.x+20,G2.y+G2.h-18]],P.paperShade,.23);
    c.fillStyle=P.platter;c.beginPath();c.arc(G1.cx,G1.cy,312,0,TAU);c.fill();c.strokeStyle=P.ink;c.lineWidth=5;c.stroke();
    c.strokeStyle=P.metal;c.lineWidth=4;c.globalAlpha=.65;
    for(let r=294;r<=308;r+=7){c.beginPath();c.arc(G1.cx,G1.cy,r,0,TAU);c.stroke();}
    c.globalAlpha=1;c.fillStyle=P.mat;c.beginPath();c.arc(G1.cx,G1.cy,292,0,TAU);c.fill();

    const run=sstep(.48,.65,t);
    const rot=run*Math.max(0,t-.5)*TAU*.56;
    drawRecord(c,rot);

    const press=sstep(.35,.55,t)*(1-sstep(.65,.85,t));
    L.inkCircle(c,G2.control[0],G2.control[1],34,{color:P.ink,width:3,fill:P.machineDeep,seed:sd('ctrl')});
    L.inkCircle(c,G2.control[0],G2.control[1],13,{color:P.metal,width:1.5,fill:press>0?P.cleanGold:P.metal,seed:sd('ctrl2')});
    L.ticks(c,G2.control[0],G2.control[1],{r:49,n:12,len:6,major:3,majorLen:11,color:P.inkSoft,alpha:.4,width:1});
    rrect(c,780,710,80,32,12,P.machineDeep,sd('rest'),2,.75);
    line(c,[[820,710],[820,665]],sd('rest-post'),4,P.metal,.65);
    drawTonearm(c,t);
  }

  function drawHand(c,t){
    const press=sstep(.15,.55,t)*(1-sstep(.62,1.05,t));
    if(press<=0)return;
    const x=lerp(1040,900,sstep(.15,.42,t)),y=lerp(1335,1240,sstep(.15,.42,t));
    c.save();c.translate(x,y);c.rotate(-.4);c.globalAlpha*=clamp(press*1.4);
    const palm=[[-58,-38],[18,-48],[64,-15],[58,44],[-12,66],[-62,24]];
    inkFill(c,palm,P.skin,sd('hand'),4.5,.98);
    fill(c,[[5,-45],[58,-14],[52,40],[12,35]],P.skinShadow,.27);
    inkFill(c,[[5,-42],[98,-46],[112,-28],[20,-18]],P.skin,sd('finger'),2.6,.98);
    inkFill(c,[[-15,-14],[45,-7],[53,13],[-2,26],[-34,13]],P.skin,sd('thumb'),2.4,.98);
    c.restore();
  }

  function drawTonearm(c,t){
    const arm=sstep(1.25,2.45,t);
    const a=lerp(1.48,2.475,arm);
    const px=G2.pivot[0],py=G2.pivot[1],len=257;
    const tip=[px+Math.cos(a)*len,py+Math.sin(a)*len];
    const elbow=[px+Math.cos(a)*92,py+Math.sin(a)*92];
    L.inkCircle(c,px,py,50,{color:P.ink,width:3.2,fill:P.machineDeep,seed:sd('pivot')});
    L.inkCircle(c,px,py,25,{color:P.inkSoft,width:2,fill:P.metal,seed:sd('pivot2')});
    L.ticks(c,px,py,{r:62,n:16,len:7,major:4,majorLen:12,color:P.inkSoft,alpha:.35,width:1});
    line(c,[[px,py],elbow,tip],sd('arm'),14,P.tonearm,.98);
    line(c,[[px+9,py-8],[px+55*Math.cos(a+Math.PI),py+55*Math.sin(a+Math.PI)]],sd('counter'),20,P.machineDeep,.85);
    c.save();c.translate(tip[0],tip[1]);c.rotate(a);c.fillStyle=P.cartridge;c.globalAlpha=.96;c.fillRect(-38,-17,76,34);c.strokeStyle=P.ink;c.lineWidth=2.5;c.strokeRect(-38,-17,76,34);
    c.strokeStyle=P.stylus;c.lineWidth=3;c.beginPath();c.moveTo(-32,13);c.lineTo(-48,31);c.stroke();c.fillStyle=P.stylus;c.beginPath();c.arc(-49,32,4,0,TAU);c.fill();c.restore();

    const drop=sstep(2.24,2.52,t);
    if(drop>0){
      const x=lerp(tip[0],G2.contact[0],drop),y=lerp(tip[1],G2.contact[1],drop);
      const pulse=drop*(1-sstep(2.62,2.9,t));
      if(pulse>0)L.guideCircle(c,x,y,28+24*pulse,{color:P.cleanTeal,alpha:.28*pulse,width:2,quadrants:6});
    }
  }

  function drawMacro(c,t){
    const show=sstep(1.86,2.08,t);
    if(show<=0)return;
    const {x,y,w,h}=G3;
    c.save();c.globalAlpha*=show;c.fillStyle=P.gutter;c.fillRect(x,y,w,h);c.strokeStyle=P.comicBorder;c.lineWidth=4;c.strokeRect(x,y,w,h);
    c.beginPath();c.rect(x+4,y+4,w-8,h-8);c.clip();c.fillStyle=P.vinyl;c.fillRect(x,y,w,h);
    c.strokeStyle=P.groove;c.globalAlpha=.95;
    for(let i=0;i<22;i++){const yy=340+i*10.5;c.lineWidth=i%5===0?2:1;c.beginPath();c.moveTo(x-20,yy);c.bezierCurveTo(650,yy-16,810,yy+16,x+w+20,yy);c.stroke();}
    c.strokeStyle=P.white;c.lineWidth=1.6;c.globalAlpha=.26;
    for(let i=0;i<5;i++){const yy=390+i*42;c.beginPath();c.moveTo(x+30,yy);c.lineTo(x+w-30,yy+4);c.stroke();}

    const drop=sstep(2.0,2.5,t),sx=G3.contact[0],sy=lerp(395,G3.contact[1],drop);
    c.save();c.translate(sx,sy-62);c.rotate(2.44);
    c.fillStyle=P.cartridge;c.globalAlpha=.98;c.fillRect(-52,-21,104,42);c.strokeStyle=P.ink;c.lineWidth=3;c.strokeRect(-52,-21,104,42);
    c.strokeStyle=P.stylus;c.lineWidth=4;c.beginPath();c.moveTo(-42,18);c.lineTo(-62,55);c.stroke();c.fillStyle=P.stylus;c.beginPath();c.arc(-63,56,5,0,TAU);c.fill();c.restore();
    if(drop>.82){c.fillStyle=P.cleanGold;c.globalAlpha=.65;c.beginPath();c.arc(G3.contact[0],G3.contact[1],5,0,TAU);c.fill();}
    c.restore();

    const hit=sstep(2.46,2.55,t)*(1-sstep(2.7,2.92,t));
    if(hit>0){
      L.guideCircle(c,G3.contact[0],G3.contact[1],24+40*hit,{color:P.cleanGold,alpha:.5,width:2.5,quadrants:8});
      L.text(c,'CHK',825,620,{size:58,weight:800,align:'center',color:P.soundWord,alpha:.72*hit});
    }
  }

  function cleanMusic(c,t){
    const p=sstep(2.5,2.68,t);
    if(p<=0)return;
    const fade=1-sstep(2.94,3.0,t);
    for(let i=0;i<3;i++){
      const r=42+i*36+34*p;
      L.guideCircle(c,G3.contact[0],G3.contact[1],r,{color:i%2?P.cleanTeal:P.cleanGold,alpha:(.22-i*.035)*p*fade,width:2.2,quadrants:10});
    }
    line(c,[[570,1180],[640,1135],[700,1160],[770,1105],[835,1130]],sd('music-line'),2.8,P.cleanTeal,.35*p*fade);
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});
      drawTable(c);
      drawTurntable(c,t);
      drawHand(c,t);
      drawMacro(c,t);
      cleanMusic(c,t);
      const rotCue=sstep(.45,.72,t)*(1-sstep(1.4,1.85,t));
      if(rotCue>0)L.arcAnnotation(c,G1.cx,G1.cy,340,-2.7,-1.35,{color:P.cleanTeal,width:2,p:rotCue,arrow:10,alpha:.38});
    }
  });
})();