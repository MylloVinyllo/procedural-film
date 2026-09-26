// 17 Continue · T 29.0–30.5
// Layers: paper/threshold garden → background adult → older protagonist + child → constructed hands → seed/G4 → new path and G1 expansion.
(function(){
  'use strict';
  const ID='handoff',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,p,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();};
  const poly=(c,p,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}
  function hand(c,P,x,y,s,rot,fill,open){
    c.save();c.translate(x,y);c.rotate(rot);
    poly(c,[[-12*s,-18*s],[17*s,-13*s],[24*s,4*s],[8*s,24*s],[-17*s,17*s],[-23*s,-1*s]],fill,P.ink,2);
    const thumb=open?32:26;poly(c,[[14*s,-6*s],[thumb*s,2*s],[(thumb-4)*s,10*s],[11*s,7*s]],fill,P.ink,1.4);
    line(c,[[-8*s,5*s],[11*s,7*s]],P.inkSoft,1,.45);line(c,[[-4*s,12*s],[9*s,14*s]],P.inkSoft,1,.45);c.restore();
  }

  function backdrop(c,P){
    c.save();c.globalAlpha=.30;c.fillStyle=P.paperShade;c.fillRect(70,310,940,600);
    c.strokeStyle=P.inkFaint;c.lineWidth=2.5;c.strokeRect(710,350,230,450);c.restore();
    // planter/table threshold
    poly(c,[[140,1080],[900,1080],[930,1145],[115,1145]],P.paperDeep,P.ink,3,.82);
    line(c,[[185,1145],[170,1490]],P.ink,7,.62);line(c,[[860,1145],[880,1490]],P.ink,7,.62);
    // planter foliage
    c.save();c.fillStyle=P.ageSage;c.globalAlpha=.55;
    for(let i=0;i<10;i++){const x=170+i*80,y=1040-25*(i%3),rx=42+(i%2)*8;c.beginPath();c.ellipse(x,y,rx,18,(i%2?-.2:.2),0,TAU);c.fill();}
    c.restore();
  }

  function older(c,P,L,t){
    const tw=L.onTwos(t),x=330,y=1170,skin=P.selfPale;
    // legs / pelvis
    poly(c,limb([x-35,y-50],[x-60,y+100],29,22),P.socialDeep,P.ink,2.2);
    poly(c,limb([x-60,y+100],[x-68,y+255],22,16),P.socialDeep,P.ink,2.1);
    poly(c,limb([x+35,y-50],[x+55,y+105],29,22),P.socialDeep,P.ink,2.2);
    poly(c,limb([x+55,y+105],[x+62,y+255],22,16),P.socialDeep,P.ink,2.1);
    poly(c,[[x-70,y-140],[x+70,y-140],[x+60,y-50],[x-60,y-50]],P.socialDeep,P.ink,2.4);
    // torso
    poly(c,[[x-98,y-355],[x-47,y-388],[x+46,y-382],[x+94,y-342],[x+75,y-140],[x-72,y-140]],P.selfWarm,P.ink,2.9);
    // far arm
    poly(c,limb([x-76,y-330],[x-118,y-240],23,17),P.selfWarm,P.ink,2);
    poly(c,limb([x-118,y-240],[x-102,y-145],17,12),skin,P.ink,1.9);
    // near arm to G4
    const p=clamp((t-.02)/.48),el=[x+112,y-260],h=[x+155+60*p,y-190+50*p];
    poly(c,limb([x+76,y-325],el,24,18),P.selfWarm,P.ink,2.1);
    poly(c,limb(el,h,18,12),skin,P.ink,1.9);
    // head
    poly(c,[[x-25,y-414],[x+25,y-414],[x+28,y-382],[x-28,y-382]],skin,P.ink,1.5);
    ell(c,x,y-472,49,58,skin,P.ink,2.4,1,-.04);
    poly(c,[[x-41,y-464],[x-28,y-424],[x,y-410],[x+31,y-429],[x+43,y-472]],skin,P.ink,1.8);
    line(c,[[x-38,y-486],[x-8,y-518],[x+38,y-486]],P.inkSoft,5,.60);
    line(c,[[x-15,y-464],[x-3,y-466]],P.ink,1.2,.65);line(c,[[x+8,y-460],[x+18,y-459]],P.ink,1,.5);line(c,[[x-4,y-437],[x+10,y-436]],P.inkSoft,1,.55);
    hand(c,P,h[0],h[1],.82,-.22,skin,true);
    return {x:h[0],y:h[1]};
  }

  function child(c,P,L,t){
    const x=725,y=1240,skin=P.selfPale;
    // legs
    poly(c,limb([x-28,y-60],[x-48,y+70],25,19),P.socialDeep,P.ink,2);
    poly(c,limb([x-48,y+70],[x-55,y+195],19,14),P.socialDeep,P.ink,1.9);
    poly(c,limb([x+28,y-60],[x+45,y+70],25,19),P.socialDeep,P.ink,2);
    poly(c,limb([x+45,y+70],[x+52,y+195],19,14),P.socialDeep,P.ink,1.9);
    poly(c,[[x-58,y-130],[x+58,y-130],[x+49,y-58],[x-49,y-58]],P.socialDeep,P.ink,2.2);
    poly(c,[[x-80,y-315],[x-39,y-345],[x+39,y-345],[x+80,y-310],[x+63,y-130],[x-63,y-130]],P.selfWarm,P.ink,2.7);
    // arms toward centre
    const p=clamp((t-.12)/.48),el=[x-105,y-220],h=[x-135-48*p,y-160+24*p];
    poly(c,limb([x-66,y-295],el,21,16),P.selfWarm,P.ink,1.9);poly(c,limb(el,h,16,11),skin,P.ink,1.8);
    const er=[x+90,y-230],hr=[x+98,y-135];poly(c,limb([x+66,y-292],er,20,15),P.selfWarm,P.ink,1.9);poly(c,limb(er,hr,15,10),skin,P.ink,1.8);
    // head
    poly(c,[[x-22,y-370],[x+22,y-370],[x+24,y-342],[x-24,y-342]],skin,P.ink,1.4);
    ell(c,x,y-420,47,56,skin,P.ink,2.2,1,-.04);
    poly(c,[[x-39,y-413],[x-26,y-375],[x,y-362],[x+29,y-380],[x+40,y-420]],skin,P.ink,1.6);
    c.save();c.fillStyle=P.ink;c.beginPath();c.moveTo(x-43,y-432);c.bezierCurveTo(x-28,y-486,x+19,y-492,x+41,y-438);c.quadraticCurveTo(x+12,y-460,x-6,y-446);c.quadraticCurveTo(x-24,y-466,x-43,y-432);c.fill();c.restore();
    hand(c,P,h[0],h[1],.76,Math.PI+.18,skin,true);
    return {x:h[0],y:h[1]};
  }

  function middleAdult(c,P){
    c.save();c.globalAlpha=.28;
    ell(c,545,650,40,50,P.paperDeep,P.ink,1.5);
    poly(c,[[500,700],[590,700],[615,920],[480,920]],P.socialBlue,P.ink,1.8);
    line(c,[[500,745],[440,825]],P.ink,4,.36);line(c,[[590,745],[650,820]],P.ink,4,.36);
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:17001});L.stripes(c,{colors:[P.stripeCream,P.stripeApricot],width:145,angle:-.52,offset:6*info.T,seed:17002});
    backdrop(c,P);middleAdult(c,P);
    const a=older(c,P,L,t),b=child(c,P,L,t);

    // exact G4 between hands early
    const transfer=clamp((t-.18)/.50),release=clamp((t-.52)/.28);
    const gx=540,gy=920;
    ell(c,gx,gy,18+4*transfer,18+4*transfer,P.cycleGold,P.ink,2,.95);
    if(transfer>0)L.arcAnnotation(c,gx,gy,62,-1.2,-1.2+transfer*4.9,{color:P.annYellow,width:2.5,p:1});
    // new trajectory begins only after child receives
    const path=clamp((t-.92)/.35);
    if(path>0){
      c.save();c.strokeStyle=P.selfWarm;c.lineWidth=5;c.globalAlpha=.66;c.setLineDash([18,12]);
      c.beginPath();c.moveTo(720,1120);c.bezierCurveTo(800,1060,860,960,900,880-80*path);c.stroke();c.restore();
    }
    // G4 expands into G1 while environment conceptually falls away
    const ex=clamp((t-1.18)/.28);
    if(ex>0){
      const r=18+(150-18)*ex;
      c.save();c.strokeStyle=P.cycleGold;c.lineWidth=3;c.globalAlpha=.9;c.beginPath();c.arc(540,700,r,0,TAU);c.stroke();c.restore();
      c.save();c.fillStyle=P.paper;c.globalAlpha=.18*ex;c.fillRect(0,0,1080,1920);c.restore();
    }
  }});
})();