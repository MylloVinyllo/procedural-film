// V4 ART-BIBLE PROOF — not a production scene.
(function(){
'use strict';
const ID='myllo-machine-model';
const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
const lerp=(a,b,p)=>a+(b-a)*p;
const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

function poly(c,L,pts,fill,stroke,width=3,alpha=1){
  c.save(); c.globalAlpha=alpha; c.fillStyle=fill; c.beginPath(); L.tracePath(c,pts,true); c.fill();
  if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}
  c.restore();
}
function ellipse(c,L,cx,cy,rx,ry,fill,stroke,width=2,alpha=1){
  const pts=L.ellipsePts(cx,cy,rx,ry,64);
  poly(c,L,pts,fill,stroke,width,alpha);
}
function rrect(c,L,x,y,w,h,r,fill,stroke,width=2,alpha=1){
  poly(c,L,L.rrectPts(x,y,w,h,r,18),fill,stroke,width,alpha);
}
function txt(c,s,x,y,size,fill,weight='700',align='center'){
  c.save();c.fillStyle=fill;c.textAlign=align;c.textBaseline='middle';c.font=`${weight} ${size}px Arial, sans-serif`;c.fillText(s,x,y);c.restore();
}
function capsule(c,L,cx,cy,len,r,rot,fill,stroke,width=2){
  poly(c,L,L.capsulePts(cx,cy,len,r,rot,54),fill,stroke,width,1);
}
function button(c,L,P,x,y,label,active){
  c.save();
  c.strokeStyle=active?P.mylloRingActive:P.mylloRing;
  c.lineWidth=active?8:5;
  c.beginPath();c.arc(x,y,31,0,Math.PI*2);c.stroke();
  c.fillStyle=P.mylloButton;c.beginPath();c.arc(x,y,22,0,Math.PI*2);c.fill();
  if(active){c.strokeStyle=P.processText;c.lineWidth=1.8;c.globalAlpha=.55;c.beginPath();c.arc(x,y,39,0,Math.PI*2);c.stroke();}
  c.restore();
  txt(c,label,x,y-48,18,P.mylloPanelInk,'700');
}
function record(c,L,P,a){
  ellipse(c,L,535,785,310,118,P.vinyl,P.vinylEdge,5);
  for(let i=0;i<16;i++){
    const r=292-i*12;
    c.save();c.strokeStyle=P.groove;c.lineWidth=i%4===0?1.5:.8;c.globalAlpha=.35;c.beginPath();c.ellipse(535,785,r,118*(r/310),0,0,Math.PI*2);c.stroke();c.restore();
  }
  ellipse(c,L,535,785,92,35,P.label,P.labelDeep,2.5);
  // rotating label tick
  const x=535+Math.cos(a)*66,y=785+Math.sin(a)*25;
  c.save();c.strokeStyle=P.white;c.lineWidth=5;c.beginPath();c.moveTo(535,785);c.lineTo(x,y);c.stroke();c.restore();
  // clamp
  ellipse(c,L,535,800,68,29,P.metal,P.inkSoft,2.5);
  poly(c,L,[[500,798],[570,798],[558,740],[512,740]],P.metal,P.inkSoft,2.5);
  ellipse(c,L,535,741,24,9,P.white,P.inkSoft,1.5,.8);
}
function node(c,L,P,pivot,engage,isBrush){
  const px=pivot[0],py=pivot[1];
  const park=isBrush?[-.05,-.1]:[.06,-.08];
  const on=isBrush?[.55,.45]:[-.48,.5];
  const ex=lerp(park[0],on[0],engage),ey=lerp(park[1],on[1],engage);
  const len=250,ang=Math.atan2(ey,ex);
  const cx=px+Math.cos(ang)*len*.48,cy=py+Math.sin(ang)*len*.48;
  // pivot
  ellipse(c,L,px,py,38,15,P.metal,P.inkSoft,2.5);
  poly(c,L,[[px-20,py],[px+20,py],[px+20,py-105],[px-20,py-105]],P.metal,P.inkSoft,2.5);
  ellipse(c,L,px,py-105,22,9,P.white,P.inkSoft,1.5,.75);
  capsule(c,L,cx,cy,len,27,ang,isBrush?P.metal:P.metal,P.inkSoft,2.2);
  if(isBrush){
    // brush bed hangs below arm, readable even at quarter scale
    const bx=cx+Math.cos(ang+Math.PI/2)*28,by=cy+Math.sin(ang+Math.PI/2)*28;
    c.save();c.strokeStyle=engage>.7?P.mylloBristleWet:P.mylloBristle;c.lineWidth=2;
    for(let i=-8;i<=8;i++){
      const u=i/8*78;
      const x0=bx+Math.cos(ang)*u,y0=by+Math.sin(ang)*u;
      c.beginPath();c.moveTo(x0,y0);c.lineTo(x0+Math.cos(ang+Math.PI/2)*24,y0+Math.sin(ang+Math.PI/2)*24);c.stroke();
    } c.restore();
  } else {
    // lower dark contact slot
    const sx=cx+Math.cos(ang+Math.PI/2)*23,sy=cy+Math.sin(ang+Math.PI/2)*23;
    c.save();c.strokeStyle=P.vacuum;c.lineWidth=8;c.beginPath();
    c.moveTo(sx-Math.cos(ang)*72,sy-Math.sin(ang)*72);
    c.lineTo(sx+Math.cos(ang)*72,sy+Math.sin(ang)*72);c.stroke();c.restore();
  }
}
function stageBand(c,P,n,main,sub){
  rrect(c,FILM.lib,80,225,920,126,16,P.processBand,P.comicBorder,4,.96);
  rrect(c,FILM.lib,98,244,78,86,12,P.mylloRingActive,null,0,1);
  txt(c,String(n).padStart(2,'0'),137,287,34,P.processText,'800');
  txt(c,main,205,276,42,P.processText,'800','left');
  if(sub) txt(c,sub,205,316,24,P.paperShade,'700','left');
}
FILM.scene({id:ID,draw(c,tIn,info){
  const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
  const q=L.onTwos(t);

  L.paper(c,{seed:sd('paper')});
  // room/table field
  c.fillStyle=P.roomWall;c.fillRect(0,360,1080,1160);
  c.fillStyle=P.table;c.fillRect(0,1360,1080,560);
  for(let i=0;i<9;i++){
    c.save();c.strokeStyle=P.inkSoft;c.lineWidth=1;c.globalAlpha=.12;c.beginPath();c.moveTo(0,1415+i*52);c.lineTo(1080,1425+i*52);c.stroke();c.restore();
  }

  // stage timing
  const s=t<1?0:t<2?1:t<3?2:t<4?3:4;
  const activeStart=s>=1&&s<4;
  const activePump=s===2;
  const activeReverse=s===3;
  const activeVac=s===4;
  const brushEng=clamp((t-1.55)/.35)*(1-clamp((t-3.7)/.25));
  const vacEng=clamp((t-3.85)/.35);

  // body: top, front, right bevel
  const top=[[185,620],[835,620],[950,900],[110,900]];
  const front=[[110,900],[950,900],[895,1370],[155,1370]];
  const right=[[835,620],[950,900],[895,1370],[825,1090]];
  poly(c,L,front,P.mylloBody,P.ink,6);
  poly(c,L,right,P.mylloEdge,P.inkSoft,3,.9);
  poly(c,L,top,P.mylloTop,P.ink,5);

  // record / rotation
  const dir=activeReverse?-1:1;
  const a=(q*2.8*dir)% (Math.PI*2);
  record(c,L,P,a);

  // wet film: only pump/brush/reverse and beginning of vacuum
  if(activePump||activeReverse||activeVac){
    const wet=activeVac?clamp(1-(t-4.05)/.8):clamp((t-2.05)/.45);
    c.save();c.strokeStyle=P.mylloWetPale;c.lineWidth=20;c.globalAlpha=.25+.35*wet;
    for(let k=0;k<3;k++){c.beginPath();c.ellipse(535,785,220+k*25,84+k*10,0,.15,Math.PI*1.75);c.stroke();}
    c.restore();
    if(activeVac){
      // wet film visually collapses toward vacuum slot
      const dry=clamp((t-4.25)/.55);
      c.save();c.fillStyle=P.mylloTop;c.globalAlpha=.82*dry;c.beginPath();c.ellipse(535,785,300,112,0,Math.PI*1.08,Math.PI*1.92);c.lineTo(535,785);c.closePath();c.fill();c.restore();
    }
  }

  node(c,L,P,[285,645],brushEng,true);
  node(c,L,P,[790,645],vacEng,false);

  // front brand/control plate
  rrect(c,L,350,985,360,280,126,P.mylloPanel,P.mylloPanelInk,3,1);
  c.save();c.strokeStyle=P.mylloPanelInk;c.lineWidth=2;c.globalAlpha=.75;
  c.beginPath();c.moveTo(410,1075);c.lineTo(650,1075);c.lineTo(650,1170);c.lineTo(410,1170);c.closePath();c.stroke();c.restore();
  button(c,L,P,450,1045,'START',activeStart);
  button(c,L,P,610,1045,'REVERSE',activeReverse);
  button(c,L,P,450,1200,'PUMP',activePump);
  button(c,L,P,610,1200,'VACUUM',activeVac);
  txt(c,'MYLLO',530,1102,34,P.mylloPanelInk,'900');
  txt(c,'VINYLLO',530,1140,34,P.mylloPanelInk,'900');
  ellipse(c,L,530,1325,12,7,P.mylloBlueLed,null,0);
  c.save();c.globalAlpha=.35+.25*Math.sin(q*3);c.fillStyle=P.mylloBlueLed;c.beginPath();c.arc(530,1325,20,0,Math.PI*2);c.fill();c.restore();

  // stage-specific material/action cue
  if(s===0){
    stageBand(c,P,0,'MYLLO VINYLLO','узнаваемый продукт и рабочие узлы');
  } else if(s===1){
    stageBand(c,P,1,'START · ВРАЩЕНИЕ','пластинка начинает вращаться');
  } else if(s===2){
    stageBand(c,P,2,'PUMP · МОЮЩИЙ РАСТВОР','левый узел подачи и щётка работают по канавкам');
    // liquid beads at brush contact
    c.save();c.fillStyle=P.mylloWetPale;c.globalAlpha=.9;
    for(let i=0;i<7;i++){const u=i/6;c.beginPath();c.arc(470+i*18,752+8*Math.sin(i),4+2*(i%2),0,Math.PI*2);c.fill();}
    c.restore();
  } else if(s===3){
    stageBand(c,P,3,'REVERSE · ОЧИСТКА КАНАВОК','направление вращения меняется');
    c.save();c.strokeStyle=P.mylloRingActive;c.lineWidth=4;c.globalAlpha=.8;c.beginPath();c.arc(535,785,360,3.5,5.7,true);c.stroke();c.restore();
  } else {
    stageBand(c,P,4,'VACUUM · СБОР ЖИДКОСТИ','правый узел удаляет жидкость и загрязнения');
    // suction lines to right node
    c.save();c.strokeStyle=P.cleanTeal;c.lineWidth=3;c.globalAlpha=.65;
    for(let i=0;i<5;i++){c.beginPath();c.moveTo(620+i*18,810+i*4);c.quadraticCurveTo(700,760,748,718);c.stroke();}
    c.restore();
  }

  // minimal comic edge
  c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(28,28,1024,1864);
}});
})();