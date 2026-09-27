// 04 · KRRK · T 9.000–12.000
// Comic action/reaction shot. Layers:
// 1 page/gutters, 2 lower playback panel, 3 G4 listener reaction,
// 4 exact G3 stylus macro, 5 speaker motion, 6 crackle/misregistration,
// 7 stop hand and problem-collapse exit.
(function(){
  'use strict';
  const ID='hear-crackle',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;
  const G3={x:555,y:255,w:350,h:430,cx:730,cy:480,contact:[730,515]};
  const G4={x:85,y:285,w:365,h:455,face:[270,490]};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.92*a,seed,wobble:.6,tremble:.13,boilAmp:.22,double:w>=5?{offset:2,width:1,alpha:.1,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.42,tremble:.1,boilAmp:.16,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;}
  function halftone(c,pts,color,spacing=13,r=1.5,a=.18,seed=1){
    c.save();trace(c,pts,true);c.clip();c.fillStyle=color;c.globalAlpha*=a;
    const ox=L.hash(seed,'x')%spacing,oy=L.hash(seed,'y')%spacing;c.beginPath();
    for(let y=-spacing+oy;y<1920+spacing;y+=spacing){const sh=(Math.floor(y/spacing)&1)?spacing*.5:0;
      for(let x=-spacing+ox+sh;x<1080+spacing;x+=spacing){c.moveTo(x+r,y);c.arc(x,y,r,0,TAU);}}
    c.fill();c.restore();
  }

  function drawPage(c){
    c.save();c.fillStyle=P.gutter;c.fillRect(0,0,1080,1920);c.restore();
    // lower main panel
    c.save();c.fillStyle=P.table;c.fillRect(55,770,970,980);c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(55,770,970,980);c.restore();
    for(let i=0;i<12;i++)line(c,[[70,810+i*72],[1010,818+i*72+7*Math.sin(i)]],sd('grain',i),1,P.inkSoft,.12);
  }

  function drawLowerPlayback(c,t){
    const tw=L.onTwos(t),stop=sstep(2.0,2.72,t),rot=t*TAU*.55;
    // cropped record as an unmistakable physical source
    const cx=420,cy=1265,r=335;
    c.save();c.translate(cx,cy);c.rotate(rot);
    c.fillStyle=P.vinyl;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();
    c.strokeStyle=P.groove;c.globalAlpha=.75;c.lineWidth=1.1;
    for(let i=0;i<40;i++){const rr=r-18-i*4.6;if(rr<108)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.white;c.globalAlpha=.22;c.lineWidth=1.8;
    for(let i=0;i<7;i++){const rr=300-i*22;c.beginPath();c.arc(0,0,rr,-1.05+i*.05,-.35+i*.03);c.stroke();}
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,106,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,8,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*77,Math.sin(-.56)*77);c.stroke();
    // dust fixed to record
    const rrng=L.rng(sd('dust'));
    c.fillStyle=P.dust;c.globalAlpha=.72;
    for(let i=0;i<28;i++){const a=rrng()*TAU,rad=130+rrng()*170,d=1.5+rrng()*3;c.beginPath();c.arc(Math.cos(a)*rad,Math.sin(a)*rad,d,0,TAU);c.fill();}
    c.restore();
    L.inkCircle(c,cx,cy,r,{color:P.vinylEdge,width:5.5,seed:sd('record-edge')});

    // tonearm contact from top-right, lifts on stop
    const pivot=[785,900],contact=[620,1075];
    const lift=stop;
    const tip=[contact[0]+25*lift,contact[1]-90*lift];
    L.inkCircle(c,pivot[0],pivot[1],44,{color:P.ink,width:3,fill:P.machineDeep,seed:sd('pivot')});
    line(c,[pivot,[720,965],tip],sd('arm'),13,P.tonearm,.96);
    c.save();c.translate(tip[0],tip[1]);c.rotate(2.33);c.fillStyle=P.cartridge;c.fillRect(-36,-16,72,32);c.strokeStyle=P.ink;c.lineWidth=2.4;c.strokeRect(-36,-16,72,32);
    c.strokeStyle=P.stylus;c.lineWidth=3;c.beginPath();c.moveTo(-30,13);c.lineTo(-44,31-20*lift);c.stroke();c.restore();

    // speaker, physically connected to sound in the same panel
    const box=L.rrectPts(795,975,180,520,18,18);inkFill(c,box,P.speaker,sd('speaker'),4,.95);
    const crack1=sstep(.42,.52,t)*(1-sstep(.7,.9,t));
    const crack2=sstep(1.42,1.52,t)*(1-sstep(1.7,1.9,t));
    const jolt=Math.max(crack1,crack2);
    const wooR=68+9*jolt;
    L.inkCircle(c,885,1270,wooR,{color:P.ink,width:3.2,fill:P.speakerCone,seed:sd('woofer')});
    L.inkCircle(c,885,1085,32+3*jolt,{color:P.inkSoft,width:2.2,fill:P.speakerCone,seed:sd('tweeter')});
    // cone inner rings
    c.save();c.strokeStyle=P.inkFaint;c.lineWidth=1.2;c.globalAlpha=.48;
    c.beginPath();c.arc(885,1270,wooR*.65,0,TAU);c.stroke();c.beginPath();c.arc(885,1270,wooR*.25,0,TAU);c.stroke();c.restore();

    // physical stop hand enters late
    if(stop>0)drawStopHand(c,stop);
  }

  function drawStopHand(c,p){
    const x=lerp(1080,810,p),y=lerp(1600,1510,p);
    c.save();c.translate(x,y);c.rotate(-.55);
    const palm=[[-62,-45],[22,-52],[70,-15],[62,52],[-18,70],[-68,25]];
    inkFill(c,palm,P.skin,sd('hand'),4.5,.98);
    fill(c,[[10,-48],[64,-12],[55,45],[10,38]],P.skinShadow,.25);
    inkFill(c,[[12,-45],[105,-52],[120,-33],[20,-18]],P.skin,sd('index'),2.4,.98);
    inkFill(c,[[-18,-12],[38,-5],[48,17],[2,31],[-34,14]],P.skin,sd('thumb'),2.4,.98);
    c.restore();
  }

  function drawReactionPanel(c,t){
    const x=G4.x,y=G4.y,w=G4.w,h=G4.h;
    c.save();c.fillStyle=P.roomWall;c.fillRect(x,y,w,h);c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(x,y,w,h);c.beginPath();c.rect(x+5,y+5,w-10,h-10);c.clip();

    // background speaker edge / room depth
    fill(c,[[x,y+h-115],[x+w,y+h-175],[x+w,y+h],[x,y+h]],P.paperShade,.38);
    const concern=sstep(.65,1.65,t);
    const cx=G4.face[0],cy=G4.face[1];
    // shoulders
    const shoulders=[[100,690],[145,610],[270,585],[400,630],[450,740],[85,740]];
    inkFill(c,shoulders,P.shirt,sd('react-torso'),5,.98);
    fill(c,[[300,595],[400,630],[450,740],[305,740]],P.shirtDeep,.52);halftone(c,[[300,595],[400,630],[450,740],[305,740]],P.inkSoft,12,1.4,.14,sd('dots'));

    // head
    const head=L.ellipsePts(cx,cy,72,103,48,-.05);inkFill(c,head,P.skin,sd('react-head'),5,.99);
    fill(c,[[cx+12,cy+58],[cx+65,cy+34],[cx+46,cy+93],[cx+4,cy+103]],P.skinShadow,.4);
    const hair=[[cx-69,cy-42],[cx-52,cy-91],[cx-12,cy-108],[cx+32,cy-98],[cx+66,cy-62],[cx+58,cy-27],[cx+32,cy-38],[cx+10,cy-55],[cx-5,cy-35],[cx-24,cy-55],[cx-38,cy-29]];
    inkFill(c,hair,P.hair,sd('react-hair'),3.4,.99);
    // brows and eyes: concern grows
    line(c,[[cx-45,cy-14-6*concern],[cx-15,cy-17+3*concern]],sd('rbL'),2.8,P.hair,.95);
    line(c,[[cx+11,cy-17+3*concern],[cx+42,cy-13-7*concern]],sd('rbR'),2.8,P.hair,.95);
    c.save();c.fillStyle=P.hair;c.beginPath();c.arc(cx-28,cy+3,5,0,TAU);c.fill();c.beginPath();c.arc(cx+26,cy+2,5,0,TAU);c.fill();c.restore();
    line(c,[[cx+2,cy+7],[cx-2,cy+31],[cx+12,cy+35]],sd('nose'),1.7,P.inkSoft,.62);
    line(c,[[cx-21,cy+65],[cx+21,cy+65+7*concern]],sd('mouth'),2.2,P.ink,.86);

    // shoulders physically rise under crackle
    c.restore();

    // controlled registration error on selected silhouette fragments only
    const dist=Math.max(sstep(.42,.52,t)*(1-sstep(.72,.9,t)),sstep(1.42,1.52,t)*(1-sstep(1.72,1.9,t)));
    if(dist>0){
      line(c,[[140,626],[205,586],[270,584]],sd('misM'),3,P.badMagenta,.55*dist);
      line(c,[[132,632],[198,592],[264,590]],sd('misC'),3,P.badCyan,.55*dist);
      L.arcAnnotation(c,cx,cy,128,-2.8,-1.6,{color:P.badMagenta,width:2.2,p:dist,arrow:0,alpha:.38});
    }
  }

  function drawMacro(c,t){
    const {x,y,w,h}=G3;
    c.save();c.fillStyle=P.vinyl;c.fillRect(x,y,w,h);c.strokeStyle=P.comicBorder;c.lineWidth=4;c.strokeRect(x,y,w,h);c.beginPath();c.rect(x+4,y+4,w-8,h-8);c.clip();

    c.strokeStyle=P.groove;c.globalAlpha=.92;
    for(let i=0;i<22;i++){const yy=340+i*10.5;c.lineWidth=i%5===0?2:1;c.beginPath();c.moveTo(x-20,yy);c.bezierCurveTo(650,yy-16,810,yy+16,x+w+20,yy);c.stroke();}
    c.fillStyle=P.dust;c.globalAlpha=.88;
    [[660,475,4],[778,500,5],[820,450,3.5],[705,560,4]].forEach(v=>{c.beginPath();c.arc(v[0],v[1],v[2],0,TAU);c.fill();});

    const lift=sstep(2.15,2.72,t),sy=G3.contact[1]-70*lift;
    c.save();c.translate(G3.contact[0],sy-62);c.rotate(2.44);
    c.fillStyle=P.cartridge;c.globalAlpha=.98;c.fillRect(-52,-21,104,42);c.strokeStyle=P.ink;c.lineWidth=3;c.strokeRect(-52,-21,104,42);
    c.strokeStyle=P.stylus;c.lineWidth=4;c.beginPath();c.moveTo(-42,18);c.lineTo(-62,55-18*lift);c.stroke();c.fillStyle=P.stylus;c.beginPath();c.arc(-63,56-18*lift,5,0,TAU);c.fill();c.restore();
    c.restore();
  }

  function crackleGraphics(c,t){
    const c1=sstep(.42,.52,t)*(1-sstep(.78,1.0,t));
    const c2=sstep(1.42,1.52,t)*(1-sstep(1.75,2.0,t));
    const p=Math.max(c1,c2);
    if(p<=0)return;

    // angular fragments stay between source and reaction, never covering eyes/stylus
    const bolts=[
      [[510,870],[535,835],[553,862],[575,823]],
      [[700,790],[720,760],[739,785],[760,750]],
      [[760,850],[790,820],[804,845],[830,810]],
      [[480,1010],[505,980],[520,1007],[548,970]]
    ];
    bolts.forEach((pts,i)=>line(c,pts,sd('bolt',i),2.6,i%2?P.badCyan:P.badMagenta,.58*p));

    // KRRK word, registration double
    if(c1>0){
      L.text(c,'KRRK',540+6*c1,820,{size:108,weight:900,align:'center',color:P.badCyan,alpha:.42*c1});
      L.text(c,'KRRK',540-5*c1,816,{size:108,weight:900,align:'center',color:P.badMagenta,alpha:.52*c1});
      L.text(c,'KRRK',540,818,{size:108,weight:900,align:'center',color:P.soundWord,alpha:.86*c1});
    }

    // panel-edge jitter fragments, not entire-frame transform
    c.save();c.strokeStyle=P.badMagenta;c.lineWidth=2;c.globalAlpha=.38*p;c.strokeRect(61+5*p,776,958,968);
    c.strokeStyle=P.badCyan;c.strokeRect(49-4*p,765,970,982);c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});
      drawPage(c);
      drawLowerPlayback(c,t);
      drawReactionPanel(c,t);
      drawMacro(c,t);
      crackleGraphics(c,t);

      // collapse of bad graphics at stop: clear visual space before next shot
      const clear=sstep(2.55,3.0,t);
      if(clear>0){
        c.save();c.strokeStyle=P.gutter;c.lineWidth=4;c.globalAlpha=.3*clear;c.beginPath();c.moveTo(500,800);c.lineTo(940,800);c.stroke();c.restore();
      }
    }
  });
})();