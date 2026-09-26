// 11 Relation · T 18.0–20.0
// Layers: paper/room → table/background → two people → shared object/hands → reciprocal overlays.
(function(){
  'use strict';
  const ID='bond',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,p,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();};
  const poly=(c,p,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}
  function hand(c,P,x,y,s,rot,fill){
    c.save();c.translate(x,y);c.rotate(rot);
    poly(c,[[-12*s,-18*s],[17*s,-13*s],[24*s,4*s],[8*s,24*s],[-17*s,17*s],[-23*s,-1*s]],fill,P.ink,2);
    poly(c,[[14*s,-6*s],[31*s,2*s],[27*s,10*s],[11*s,7*s]],fill,P.ink,1.5);
    line(c,[[-8*s,5*s],[11*s,7*s]],P.inkSoft,1,.48);line(c,[[-4*s,12*s],[9*s,14*s]],P.inkSoft,1,.48);c.restore();
  }
  function room(c,P){
    c.save();c.globalAlpha=.28;c.fillStyle=P.paperShade;c.fillRect(70,300,940,650);
    c.strokeStyle=P.inkFaint;c.lineWidth=2.5;c.strokeRect(130,360,300,380);c.strokeRect(680,340,240,400);c.restore();
    // plant and third soft figure
    line(c,[[865,1210],[870,910]],P.inkSoft,3,.42);
    for(let k=0;k<5;k++)ell(c,870+(k%2?46:-45),980+k*48,46,16,P.ageSage,P.inkSoft,1.1,.42,k%2?.25:-.25);
    c.save();c.globalAlpha=.22;ell(c,150,845,38,48,P.paperDeep,P.ink,1.5);line(c,[[150,895],[150,1070]],P.ink,5,.28);c.restore();
  }
  function seatedPerson(c,P,x,y,s,col,hero,lean,armP){
    const skin=hero?P.selfPale:P.paperDeep;
    c.save();c.translate(x,y);c.scale(s,s);c.rotate(lean);
    // chair behind
    line(c,[[-80,-80],[-80,220]],P.inkFaint,5,.46);line(c,[[80,-80],[80,220]],P.inkFaint,5,.46);line(c,[[-82,70],[82,70]],P.inkFaint,7,.46);
    // legs seated
    poly(c,limb([-45,80],[-15,200],31,24),hero?P.socialDeep:P.inkSoft,P.ink,2.2);poly(c,limb([-15,200],[30,315],24,18),hero?P.socialDeep:P.inkSoft,P.ink,2.1);
    poly(c,limb([35,80],[70,195],31,24),hero?P.socialDeep:P.inkSoft,P.ink,2.2);poly(c,limb([70,195],[105,310],24,18),hero?P.socialDeep:P.inkSoft,P.ink,2.1);
    poly(c,[[-4,305],[44,304],[62,321],[-10,325]],P.ink,P.ink,1);poly(c,[[80,302],[125,300],[143,317],[84,325]],P.ink,P.ink,1);
    // pelvis torso
    poly(c,[[-72,30],[72,30],[62,100],[-62,100]],hero?P.socialDeep:P.inkSoft,P.ink,2.4);
    poly(c,[[-95,-195],[-48,-230],[48,-230],[95,-190],[72,32],[-72,32]],col,P.ink,3);
    // near arm reaches table
    const ex=hero?85+armP*95:-85-armP*95, ey=-65-armP*10;
    const elbow=hero?[108,-135]:[-108,-135];
    poly(c,limb([hero?72:-72,-175],elbow,24,18),col,P.ink,2.1);
    poly(c,limb(elbow,[ex,ey],18,12),skin,P.ink,2.0);
    // far arm relaxed
    const e2=hero?[-112,-120]:[112,-120],h2=hero?[-102,-25]:[102,-25];
    poly(c,limb([hero?-70:70,-170],e2,21,16),col,P.ink,1.9);poly(c,limb(e2,h2,16,11),skin,P.ink,1.8);
    // neck/head
    poly(c,[[-25,-255],[25,-255],[28,-225],[-28,-225]],skin,P.ink,1.5);
    ell(c,0,-315,48,58,skin,P.ink,2.4,1,-.03);
    poly(c,[[-40,-308],[-28,-266],[0,-252],[31,-271],[42,-315]],skin,P.ink,1.8);
    c.save();c.fillStyle=P.ink;c.beginPath();c.moveTo(-45,-323);c.bezierCurveTo(-30,-382,20,-384,43,-329);c.quadraticCurveTo(10,-354,-7,-337);c.quadraticCurveTo(-25,-360,-45,-323);c.fill();c.restore();
    line(c,[[-15,-310],[-3,-312]],P.ink,1.2,.7);line(c,[[7,-307],[18,-305]],P.ink,1,.55);line(c,[[-4,-282],[10,-282]],P.inkSoft,1,.55);
    for(let k=0;k<5;k++)line(c,[[-45+k*22,-175],[-36+k*20,-40]],hero?P.selfDeep:P.inkSoft,1,.18);
    c.restore();
    return {handX:x+s*ex, handY:y+s*ey, hero, skin, s};
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:11001});L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:145,angle:-.52,offset:6*info.T,seed:11002});
    room(c,P);
    // table
    poly(c,[[190,1015],[895,1015],[930,1070],[160,1070]],P.paperDeep,P.ink,3,.92);
    line(c,[[225,1070],[205,1430]],P.ink,7,.76);line(c,[[860,1070],[880,1430]],P.ink,7,.76);
    for(let x=210;x<890;x+=48)line(c,[[x,1030],[x+18,1056]],P.inkSoft,1,.35);
    const p1=clamp(t/.55),p2=clamp((t-.78)/.5);
    const a=seatedPerson(c,P,340,920,.78,P.selfWarm,true,-.025,p1);
    const b=seatedPerson(c,P,740,920,.78,P.socialBlue,false,.02,p2);
    // small shared card/object
    const mix=t<.75?p1:1-p2*.55;
    const ox=560+40*(mix-.5),oy=935;
    poly(c,[[ox-36,oy-22],[ox+38,oy-16],[ox+32,oy+26],[ox-42,oy+20]],P.cycleGold,P.ink,2,.92);
    // hands last, above object/table
    hand(c,P,a.handX,a.handY,.82,-.20,P.selfPale);
    hand(c,P,b.handX,b.handY,.82,Math.PI+.18,P.paperDeep);
    // reciprocal arcs
    const r1=L.seg(t,.18,.85,'outExpo'),r2=L.seg(t,.85,1.55,'outExpo');
    if(r1>0)L.arcAnnotation(c,540,900,170,3.0,3.0+r1*2.1,{color:P.annBlue,width:2.5,p:1,arrow:11});
    if(r2>0)L.arcAnnotation(c,540,900,145,.2,.2+r2*2.2,{color:P.annBlue,width:2.5,p:1,arrow:11});
    if(t>.82)L.arcAnnotation(c,540,930,72,-1.2,-1.2+L.seg(t,.82,1.15,'outBack')*5.1,{color:P.annYellow,width:3,p:1});
  }});
})();