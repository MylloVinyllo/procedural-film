// 09 I among us · T 14.5–16.0
// Layers: paper/plaza → architecture → far crowd → mid crowd → protagonist → foreground passer → group-flow overlays.
(function(){
  'use strict';
  const ID='one-among-many',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,p,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();};
  const poly=(c,p,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}

  function architecture(c,P){
    c.save();c.globalAlpha=.28;c.fillStyle=P.paperShade;c.fillRect(60,270,960,650);c.strokeStyle=P.inkFaint;c.lineWidth=2.2;
    for(let x=85;x<980;x+=175){c.strokeRect(x,355,120,360);line(c,[[x+60,355],[x+60,715]],P.inkFaint,1.2,.35);line(c,[[x,535],[x+120,535]],P.inkFaint,1.2,.35);}
    c.restore();
    // steps / plaza
    for(let k=0;k<7;k++)line(c,[[60,980+k*80],[1020,930+k*95]],P.inkFaint,1.4,.26);
    // bench
    poly(c,[[650,1080],[915,1060],[920,1100],[655,1120]],P.paperDeep,P.ink,2,.48);
    line(c,[[685,1112],[675,1245]],P.ink,4,.42);line(c,[[880,1095],[895,1230]],P.ink,4,.42);
  }

  function person(c,P,x,y,s,col,phase,hero=false,turn=0){
    const q=Math.sin(phase*5.3)*.5;
    c.save();c.translate(x,y);c.scale(s,s);c.rotate(q*.025+turn);
    const skin=hero?P.selfPale:P.paperDeep;
    // legs
    poly(c,limb([-28,-58],[-52,115],28,21),hero?P.socialDeep:P.inkSoft,P.ink,2);
    poly(c,limb([-52,115],[-66,275],21,15),hero?P.socialDeep:P.inkSoft,P.ink,2);
    poly(c,limb([28,-56],[58,112],29,21),hero?P.socialDeep:P.inkSoft,P.ink,2);
    poly(c,limb([58,112],[72,275],21,15),hero?P.socialDeep:P.inkSoft,P.ink,2);
    poly(c,[[-95,270],[-52,268],[-40,286],[-101,291]],P.ink,P.ink,1);
    poly(c,[[46,268],[88,266],[105,282],[49,291]],P.ink,P.ink,1);
    // pelvis/torso
    poly(c,[[-68,-140],[68,-142],[56,-52],[-56,-52]],hero?P.socialDeep:P.inkSoft,P.ink,2.3);
    poly(c,[[-92,-340],[-48,-375],[48,-375],[95,-335],[72,-142],[-72,-140]],col,P.ink,2.8);
    // arms
    poly(c,limb([-78,-315],[-125,-230],22,17),col,P.ink,2);
    poly(c,limb([-125,-230],[-112,-130],17,12),skin,P.ink,1.8);
    poly(c,limb([80,-310],[128,-220],22,17),col,P.ink,2);
    poly(c,limb([128,-220],[116,-125],17,12),skin,P.ink,1.8);
    ell(c,-112,-120,15,12,skin,P.ink,1.4);ell(c,116,-116,15,12,skin,P.ink,1.4);
    // neck/head/jaw
    poly(c,[[-25,-397],[25,-397],[28,-365],[-28,-365]],skin,P.ink,1.6);
    ell(c,0,-455,48,58,skin,P.ink,2.4,1,-.04);
    poly(c,[[-40,-448],[-27,-406],[0,-392],[31,-411],[42,-455]],skin,P.ink,1.8);
    c.save();c.fillStyle=P.ink;c.beginPath();c.moveTo(-45,-463);c.bezierCurveTo(-32,-522,18,-525,44,-468);c.quadraticCurveTo(11,-493,-6,-477);c.quadraticCurveTo(-24,-499,-45,-463);c.fill();c.restore();
    // face
    line(c,[[-15,-450],[-3,-452]],P.ink,1.2,.7);line(c,[[8,-448],[18,-446]],P.ink,1,.5);line(c,[[-4,-424],[10,-423]],P.inkSoft,1,.55);
    // garment folds
    for(let k=0;k<5;k++)line(c,[[-48+k*22,-320],[-38+k*20,-170]],hero?P.selfDeep:P.inkSoft,1,.18);
    if(hero){ell(c,0,-265,9,9,P.cycleGold,P.ink,1.2,.92);}
    c.restore();
  }

  function scenePeople(c,P,L,t){
    const sync=Math.sin(L.onTwos(t)*5.8);
    // far band
    const far=[
      [145,1045,.45,P.ageSage,.2],[285,1000,.42,P.socialBlue,.8],[430,1035,.40,P.birthRose,1.4],
      [795,980,.44,P.ageSage,2.1],[930,1045,.39,P.socialBlue,2.7]
    ];
    far.forEach((q,i)=>person(c,P,q[0]+8*Math.sin(t+i),q[1],q[2],q[3],t+q[4],false,(i%2?-.03:.03)));
    // middle peers
    person(c,P,360,1210,.68,P.socialBlue,t+.2,false,.02);
    person(c,P,720,1190,.72,P.ageSage,t+.55,false,-.015);
    person(c,P,835,1235,.62,P.birthRose,t+.9,false,.03);
    // hero off-phase after t=1.0
    const phase=t+(t>1?-.14:0);
    person(c,P,540,1210,.82,P.selfWarm,phase,true,0);
  }

  function foreground(c,P,t){
    const x=1005-260*clamp((t-.15)/.95);
    c.save();c.globalAlpha=.78;person(c,P,x,1390,.92,P.socialBlue,t+1.3,false,-.02);c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:9001});L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:145,angle:-.52,offset:6*info.T,seed:9002});
    architecture(c,P);
    // hero path behind bodies
    c.save();c.strokeStyle=P.selfWarm;c.lineWidth=5;c.globalAlpha=.6;c.setLineDash([18,12]);c.beginPath();c.moveTo(160,1450);c.bezierCurveTo(300,1370,430,1380,540,1330);c.bezierCurveTo(690,1260,800,1180,930,1130);c.stroke();c.restore();
    scenePeople(c,P,L,t);foreground(c,P,t);
    // group-flow overlays
    c.save();c.strokeStyle=P.annBlue;c.lineWidth=2.1;c.globalAlpha=.48;c.setLineDash([15,10]);
    c.beginPath();c.moveTo(260,1090);c.quadraticCurveTo(500,1030,790,1095);c.stroke();
    c.beginPath();c.moveTo(250,1280);c.quadraticCurveTo(520,1200,860,1240);c.stroke();c.restore();
    if(t>1.0)L.arcAnnotation(c,540,945,120,-2.0,-2.0+L.seg(t,1.0,1.42,'outBack')*4.9,{color:P.annYellow,width:3,p:1});
    // screen-fixed G3 chest marker at the end of push
    const push=clamp((t-1.35)/.15);if(push>0){
      c.save();c.globalAlpha=push;c.strokeStyle=P.cycleGold;c.lineWidth=3;c.beginPath();c.arc(540,820,48,0,TAU);c.stroke();c.restore();
    }
  }});
})();