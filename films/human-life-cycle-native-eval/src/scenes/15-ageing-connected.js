// 15 Later life · T 25.5–27.5
// Layers: paper/garden → path/bench/background → older protagonist + companion → foreground foliage → seed/gold continuity motif.
(function(){
  'use strict';
  const ID='ageing-connected',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,p,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();};
  const poly=(c,p,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}

  function garden(c,P,t){
    // distant wall / house edge
    c.save();c.globalAlpha=.24;c.fillStyle=P.paperShade;c.fillRect(70,320,940,520);c.strokeStyle=P.inkFaint;c.lineWidth=2;c.strokeRect(690,360,240,340);c.restore();
    // path curve
    c.save();c.fillStyle=P.stripeSage;c.globalAlpha=.28;c.beginPath();c.moveTo(70,1410);c.bezierCurveTo(280,1250,560,1280,1010,1130);c.lineTo(1010,1490);c.lineTo(70,1570);c.closePath();c.fill();c.restore();
    line(c,[[75,1410],[1010,1130]],P.inkFaint,2,.28,[18,12]);
    // bench
    poly(c,[[140,1115],[400,1115],[390,1160],[150,1160]],P.paperDeep,P.ink,2.4,.70);
    line(c,[[170,1160],[160,1330]],P.ink,6,.6);line(c,[[365,1160],[380,1330]],P.ink,6,.6);
    // far foliage clusters
    c.save();c.globalAlpha=.36;c.fillStyle=P.ageSage;
    for(let i=0;i<13;i++){const x=70+i*85,y=850+30*Math.sin(i*1.15),r=44+(i%4)*12;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
    c.restore();
    // far person
    c.save();c.globalAlpha=.23;ell(c,900,760,30,38,P.paperDeep,P.ink,1.2);line(c,[[900,800],[900,930]],P.ink,4,.28);line(c,[[900,845],[860,890]],P.ink,2.5,.25);line(c,[[900,845],[940,885]],P.ink,2.5,.25);c.restore();
  }

  function person(c,P,L,x,y,s,col,hero,t,side){
    const tw=L.onTwos(t),skin=hero?P.selfPale:P.paperDeep;
    const step=.5+.5*Math.sin(tw*3.5+side),hipShift=step*8;
    c.save();c.translate(x,y);c.scale(s,s);c.rotate(hero?.035:-.02);
    // legs shorter step
    poly(c,limb([-30,-58],[-52-hipShift*.4,100],28,22),hero?P.socialDeep:P.inkSoft,P.ink,2.2);
    poly(c,limb([-52-hipShift*.4,100],[-67-hipShift,255],22,16),hero?P.socialDeep:P.inkSoft,P.ink,2.1);
    poly(c,limb([30,-58],[48+hipShift*.3,105],28,22),hero?P.socialDeep:P.inkSoft,P.ink,2.2);
    poly(c,limb([48+hipShift*.3,105],[61+hipShift,255],22,16),hero?P.socialDeep:P.inkSoft,P.ink,2.1);
    poly(c,[[-94,248],[-55,247],[-43,266],[-102,270]],P.ink,P.ink,1);
    poly(c,[[39,247],[80,246],[96,263],[43,270]],P.ink,P.ink,1);
    // pelvis + torso, slightly flexed
    poly(c,[[-70,-145],[70,-145],[59,-55],[-59,-55]],hero?P.socialDeep:P.inkSoft,P.ink,2.3);
    poly(c,[[-95,-350],[-46,-384],[48,-377],[96,-335],[75,-145],[-72,-145]],col,P.ink,2.8);
    // arms, smaller swing
    const eL=[-112,-250],hL=[-102,-140+12*Math.sin(tw*3)];
    const eR=[110,-245],hR=[106,-138-12*Math.sin(tw*3)];
    poly(c,limb([-73,-330],eL,23,17),col,P.ink,2);poly(c,limb(eL,hL,17,12),skin,P.ink,1.9);
    poly(c,limb([73,-325],eR,23,17),col,P.ink,2);poly(c,limb(eR,hR,17,12),skin,P.ink,1.9);
    ell(c,hL[0],hL[1],15,12,skin,P.ink,1.5);ell(c,hR[0],hR[1],15,12,skin,P.ink,1.5);
    // neck/head
    poly(c,[[-25,-412],[25,-412],[28,-380],[-28,-380]],skin,P.ink,1.5);
    ell(c,0,-470,49,58,skin,P.ink,2.4,1,-.04);
    poly(c,[[-41,-462],[-28,-422],[0,-408],[31,-427],[43,-470]],skin,P.ink,1.8);
    // same hair asymmetry, lighter / sparse for hero
    c.save();c.strokeStyle=hero?P.inkSoft:P.ink;c.lineWidth=hero?5:7;c.globalAlpha=hero?.65:1;c.lineCap='round';
    c.beginPath();c.moveTo(-40,-482);c.quadraticCurveTo(-10,-535,42,-486);c.stroke();c.beginPath();c.moveTo(-33,-492);c.quadraticCurveTo(-10,-520,17,-505);c.stroke();c.restore();
    line(c,[[-15,-462],[-3,-464]],P.ink,1.2,.65);line(c,[[8,-458],[18,-457]],P.ink,1,.5);line(c,[[-4,-435],[10,-434]],P.inkSoft,1,.55);
    if(hero){line(c,[[-28,-446],[-18,-443]],P.inkSoft,1,.45);line(c,[[18,-441],[28,-436]],P.inkSoft,1,.42);line(c,[[8,-427],[22,-424]],P.inkSoft,1,.36);}
    // folds
    for(let k=0;k<6;k++)line(c,[[-50+k*20,-320],[-40+k*18,-175]],hero?P.selfDeep:P.inkSoft,1,.18);
    c.restore();
    return {x:x+s*hR[0],y:y+s*hR[1]};
  }

  function foreground(c,P){
    c.save();c.strokeStyle=P.inkSoft;c.lineWidth=1.5;c.globalAlpha=.7;
    for(let i=0;i<22;i++){const x=20+i*50,base=1580-(i%3)*8,h=120+(i*37)%220;c.beginPath();c.moveTo(x,base);c.quadraticCurveTo(x+14,base-h*.55,x+6*Math.sin(i),base-h);c.stroke();if(i%4===0){c.fillStyle=P.ageSage;c.globalAlpha=.5;c.beginPath();c.ellipse(x+9,base-h,16,28,.25,0,TAU);c.fill();c.globalAlpha=.7;}}
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:15001});L.stripes(c,{colors:[P.stripeCream,P.stripeSpring],width:145,angle:-.52,offset:6*info.T,seed:15002});
    garden(c,P,t);
    // old path from memory, low alpha
    c.save();c.strokeStyle=P.selfWarm;c.lineWidth=4;c.globalAlpha=.40;c.setLineDash([18,12]);c.beginPath();c.moveTo(160,1450);c.bezierCurveTo(320,1320,500,1310,710,1200);c.stroke();c.restore();
    const heroHand=person(c,P,L,470,1230,.84,P.selfWarm,true,t,-1);
    person(c,P,L,735,1210,.80,P.ageSage,false,t+.28,1);
    foreground(c,P);
    // young plant / seed head
    line(c,[[790,1410],[790,1125]],P.inkSoft,3,.75);
    for(const [dx,dy,r] of [[-42,-195,28],[38,-150,30],[-32,-95,26],[34,-55,24]])ell(c,790+dx,1410+dy,r,14,P.ageSage,P.inkSoft,1.2,.72,dx>0?.2:-.2);
    const appear=clamp((t-1.25)/.35);
    if(appear>0){
      ell(c,790,1108,13,21,P.cycleGold,P.ink,1.5,.92*appear,.3);
      L.arcAnnotation(c,790,1108,68,-1.2,-1.2+appear*5.0,{color:P.annYellow,width:2.5,p:1});
    }
    // hero hand approaches the seed motif late
    const reach=clamp((t-1.45)/.42);
    if(reach>0){line(c,[[heroHand.x,heroHand.y],[730+45*reach,1165-45*reach]],P.selfDeep,3,.45*reach);}
  }});
})();