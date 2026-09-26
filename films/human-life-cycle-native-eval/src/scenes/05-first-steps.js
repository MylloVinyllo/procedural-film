// 05 A path · T 8.0–10.0
// Layers: paper/room → floor perspective → furniture/plant → child → foreground object → motion overlays.
(function(){
  'use strict';
  const ID='first-steps',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,pts,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke();c.restore();};
  const poly=(c,pts,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}

  function room(c,P){
    // perspective floor
    c.save();c.globalAlpha=.42;c.strokeStyle=P.inkFaint;c.lineWidth=1.3;
    for(let x=70;x<=1010;x+=110){c.beginPath();c.moveTo(540,830);c.lineTo(x,1540);c.stroke();}
    for(let y=990;y<=1530;y+=70){c.beginPath();c.moveTo(80,y);c.lineTo(1000,y);c.stroke();}
    c.restore();
    // doorway
    c.save();c.globalAlpha=.28;c.fillStyle=P.paperShade;c.fillRect(720,360,240,560);c.strokeStyle=P.inkFaint;c.lineWidth=3;c.strokeRect(720,360,240,560);c.restore();
    // low stool
    poly(c,[[120,1030],[330,1030],[314,1080],[137,1080]],P.paperDeep,P.ink,2.4,.72);
    line(c,[[155,1080],[142,1250]],P.ink,5,.65);line(c,[[290,1080],[306,1250]],P.ink,5,.65);
    // plant
    line(c,[[860,1240],[870,895]],P.inkSoft,3,.65);
    for(let k=0;k<5;k++){const y=980+k*55,side=k%2?-1:1;ell(c,870+side*42,y,48,18,P.ageSage,P.inkSoft,1.3,.7,side*.25);}
  }

  function child(c,P,L,t){
    const tw=L.onTwos(t);
    const u1=clamp(t/.55),u2=clamp((t-.55)/.55);
    const wob=clamp((t-1.18)/.22)*(1-clamp((t-1.45)/.25));
    const x=330+175*u1+70*u2;
    const ground=1320;
    const y=0;
    const lift1=Math.sin(Math.min(1,u1)*Math.PI)*35;
    const lift2=Math.sin(Math.min(1,u2)*Math.PI)*28;
    const headY=760-lift1*.15-lift2*.12 + wob*10;
    const skin=P.selfPale;
    // back leg
    const hip=[x-28,1010],k1=[x-85,1145-lift1],f1=[x-116,ground-4-lift1];
    poly(c,limb(hip,k1,30,24),P.socialDeep,P.ink,2.5);
    poly(c,limb(k1,f1,24,17),P.socialDeep,P.ink,2.5);
    poly(c,[[f1[0]-34,f1[1]-6],[f1[0]+28,f1[1]-8],[f1[0]+42,f1[1]+12],[f1[0]-40,f1[1]+14]],P.ink,P.ink,1.2);
    // front leg
    const hip2=[x+26,1014],k2=[x+78,1144-lift2],f2=[x+112,ground-lift2];
    poly(c,limb(hip2,k2,31,24),P.socialDeep,P.ink,2.5);
    poly(c,limb(k2,f2,24,17),P.socialDeep,P.ink,2.5);
    poly(c,[[f2[0]-27,f2[1]-5],[f2[0]+38,f2[1]-7],[f2[0]+51,f2[1]+13],[f2[0]-32,f2[1]+15]],P.ink,P.ink,1.2);
    // pelvis
    poly(c,[[x-65,960],[x+66,960],[x+55,1035],[x-55,1038]],P.socialDeep,P.ink,2.8);
    // torso
    const lean=-8+12*wob;
    poly(c,[[x-86+lean,815],[x-43+lean,778],[x+40+lean,780],[x+90+lean,820],[x+70,964],[x-68,964]],P.selfWarm,P.ink,3.2);
    // collar, pocket
    poly(c,[[x-28,783],[x,812],[x+28,784],[x+17,772],[x-18,772]],P.paperShade,P.inkSoft,1.5);
    c.save();c.strokeStyle=P.selfDeep;c.globalAlpha=.6;c.lineWidth=1.5;c.strokeRect(x+24,858,31,38);c.restore();
    // arms open, react to wobble
    const aSpread=110+35*wob;
    const le=[x-aSpread,880],lh=[x-aSpread-55,930-20*Math.sin(tw*4)];
    poly(c,limb([x-70,830],le,25,18),P.selfWarm,P.ink,2.2);poly(c,limb(le,lh,18,13),skin,P.ink,2.2);
    const re=[x+aSpread,870],rh=[x+aSpread+52,915+18*Math.sin(tw*4.2)];
    poly(c,limb([x+70,830],re,25,18),P.selfWarm,P.ink,2.2);poly(c,limb(re,rh,18,13),skin,P.ink,2.2);
    ell(c,lh[0],lh[1],17,13,skin,P.ink,1.7);ell(c,rh[0],rh[1],17,13,skin,P.ink,1.7);
    // neck + head. Head converges to G2 by end.
    poly(c,[[x-23,776],[x+23,776],[x+27,742],[x-26,742]],skin,P.ink,1.9);
    let hx=x,hy=headY;
    const settle=clamp((t-1.55)/.35);
    hx=hx*(1-settle)+540*settle;hy=hy*(1-settle)+720*settle;
    ell(c,hx,hy,54+18*settle,65+27*settle,skin,P.ink,2.8,1,-.04);
    poly(c,[[hx-45,hy+5],[hx-30,hy+48],[hx,hy+62],[hx+34,hy+39],[hx+46,hy-3]],skin,P.ink,2);
    // hair
    c.save();c.fillStyle=P.ink;c.beginPath();c.moveTo(hx-51,hy-8);c.bezierCurveTo(hx-35,hy-78,hx+18,hy-80,hx+48,hy-15);c.quadraticCurveTo(hx+12,hy-42,hx-5,hy-25);c.quadraticCurveTo(hx-28,hy-48,hx-51,hy-8);c.fill();c.restore();
    line(c,[[hx-17,hy+5],[hx-2,hy+3]],P.ink,1.5,.75);line(c,[[hx+8,hy+6],[hx+20,hy+7]],P.ink,1.2,.55);line(c,[[hx-5,hy+28],[hx+12,hy+29]],P.inkSoft,1.2,.65);
    // folds
    for(let k=0;k<6;k++)line(c,[[x-45+k*14,840],[x-38+k*13,925]],P.selfDeep,1,.22);
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:5001});L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:145,angle:-.52,offset:6*info.T,seed:5002});
    room(c,P);
    // continuity path behind child
    c.save();c.strokeStyle=P.selfWarm;c.lineWidth=5;c.globalAlpha=.65;c.setLineDash([18,12]);c.beginPath();c.moveTo(145,1375);c.bezierCurveTo(300,1280,420,1390,570,1285);c.bezierCurveTo(690,1200,760,1110,835,1010);c.stroke();c.restore();
    child(c,P,L,t);
    // foreground block/toy
    poly(c,[[850,1350],[915,1325],[950,1375],[885,1402]],P.childSky,P.ink,2.2,.8);
    line(c,[[885,1402],[885,1452],[950,1422],[950,1375]],P.ink,2,.65);
    // step arcs and balance ring
    if(t>.35)L.arcAnnotation(c,420,1300,85,2.8,4.9,{color:P.annBlue,width:2.5,p:L.seg(t,.35,.75,'outExpo'),arrow:10});
    if(t>.9)L.arcAnnotation(c,620,1295,92,2.7,5.0,{color:P.annBlue,width:2.5,p:L.seg(t,.9,1.28,'outExpo'),arrow:10});
    if(t>1.25)L.arcAnnotation(c,540,720,118,-1.5,-1.5+L.seg(t,1.25,1.75,'outBack')*5.4,{color:P.annYellow,width:3,p:1});
    // exact G2 guide only late
    const g=clamp((t-1.62)/.24);if(g>0)L.guideCircle(c,540,720,92,{color:P.inkFaint,alpha:.16*g,width:1.2});
  }});
})();