// 03 Arrival · T 4.0–5.5
// Layers: paper/room → supporting arm and cloth → newborn → foreground folds → breath/hand overlays.
(function () {
  'use strict';
  const ID='birth',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

  function line(c,pts,col,w=2,a=1){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';
    c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke();c.restore();
  }
  function poly(c,pts,fill,stroke,w=2,a=1){
    c.save();c.globalAlpha=a;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();
    if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();
  }
  function ell(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0){
    c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();
  }
  function limb(a,b,wa,wb){
    const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;
    return [[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];
  }

  function room(c,P){
    c.save();
    c.globalAlpha=.32;c.fillStyle=P.paperShade;c.fillRect(90,300,900,720);
    // warm window
    c.fillStyle=P.stripeApricot;c.globalAlpha=.55;c.fillRect(130,350,260,360);
    c.strokeStyle=P.inkFaint;c.lineWidth=3;c.globalAlpha=.45;c.strokeRect(130,350,260,360);
    line(c,[[260,350],[260,710]],P.inkFaint,2,.35);line(c,[[130,530],[390,530]],P.inkFaint,2,.35);
    // chair/table arc
    c.globalAlpha=.42;c.strokeStyle=P.inkFaint;c.lineWidth=5;c.beginPath();c.arc(870,920,150,Math.PI,TAU);c.stroke();
    line(c,[[755,925],[735,1230]],P.inkFaint,5,.42);line(c,[[980,925],[995,1230]],P.inkFaint,5,.42);
    // wall shadow bands
    for(let y=760;y<1120;y+=46) line(c,[[120,y],[420,y-25]],P.inkFaint,1,.16);
    c.restore();
  }

  function blanket(c,P,t){
    const sweep=clamp((t-1.33)/.17);
    const yShift=35*sweep;
    poly(c,[[220,810+yShift],[430,690+yShift],[810,1030+yShift],[920,1260+yShift],[545,1450+yShift],[250,1290+yShift]],P.birthRose,P.ink,3,.92);
    c.save();c.strokeStyle=P.inkSoft;c.lineWidth=1.3;c.globalAlpha=.34;
    for(let k=0;k<18;k++){
      const y=850+k*28+yShift;
      c.beginPath();c.moveTo(260,y);c.quadraticCurveTo(520,y-60,850,y+30);c.stroke();
    }
    c.restore();
  }

  function supportArm(c,P){
    poly(c,limb([305,1000],[470,870],56,46),P.paperDeep,P.ink,3);
    poly(c,limb([470,870],[650,825],46,34),P.selfPale,P.ink,3);
    // sleeve cuff
    poly(c,[[420,900],[474,850],[520,880],[461,932]],P.socialBlue,P.ink,2.4);
    // adult supporting hand
    poly(c,[[625,795],[682,785],[714,815],[696,850],[632,858],[607,828]],P.selfPale,P.ink,2.4);
    line(c,[[633,823],[685,817]],P.inkSoft,1.1,.5);
  }

  function newborn(c,P,L,t){
    const tw=L.onTwos(t),breath=0.5+0.5*Math.sin(tw*7);
    const hx=465,hy=675;
    // torso bean
    c.save();c.translate(570,875);c.rotate(.52);
    ell(c,0,0,98+breath*2,142+breath*3,P.selfPale,P.ink,3.2,1,.05);
    // cloth/diaper fold
    poly(c,[[-78,60],[74,55],[60,128],[-55,130]],P.paperShade,P.inkSoft,1.7,.85);
    c.restore();

    // head with large cranium, tiny jaw
    ell(c,hx,hy,82,95,P.selfPale,P.ink,3.4,1,-.22);
    poly(c,[[410,685],[430,742],[468,760],[510,728],[528,666]],P.selfPale,P.ink,2.4);
    // sparse newborn hair marks
    for(let k=0;k<8;k++){
      const a=-2.7+k*.28;line(c,[[hx+Math.cos(a)*55,hy+Math.sin(a)*70],[hx+Math.cos(a)*72,hy+Math.sin(a)*80]],P.inkSoft,1.5,.45);
    }
    line(c,[[442,694],[456,691]],P.ink,1.6,.8);
    line(c,[[470,700],[482,701]],P.ink,1.3,.65);
    line(c,[[456,718],[468,720]],P.inkSoft,1.2,.7);

    // flexed arms
    poly(c,limb([510,820],[445,860],26,20),P.selfPale,P.ink,2.4);
    poly(c,limb([445,860],[415,810],20,14),P.selfPale,P.ink,2.4);
    poly(c,limb([625,848],[690,805],26,20),P.selfPale,P.ink,2.4);
    const close=clamp((t-.88)/.18);
    poly(c,limb([690,805],[718-18*close,838-8*close],20,13),P.selfPale,P.ink,2.4);

    // mitten hands
    ell(c,408,802,20-3*close,15+2*close,P.selfPale,P.ink,1.9,1,-.3);
    ell(c,720-18*close,840-8*close,21,16,P.selfPale,P.ink,1.9,1,.3);
    // adult finger / cloth edge being grasped
    line(c,[[744,824],[713,842]],P.ink,6,.75);

    // legs curled
    poly(c,limb([600,990],[665,1055],30,24),P.selfPale,P.ink,2.5);
    poly(c,limb([665,1055],[640,1118],24,17),P.selfPale,P.ink,2.5);
    poly(c,limb([530,1004],[485,1080],30,23),P.selfPale,P.ink,2.5);
    poly(c,limb([485,1080],[520,1135],23,17),P.selfPale,P.ink,2.5);
    ell(c,641,1128,30,16,P.selfPale,P.ink,1.9,1,.16);
    ell(c,527,1141,30,16,P.selfPale,P.ink,1.9,1,-.22);

    // subtle body hatching
    for(let k=0;k<7;k++)line(c,[[548+k*11,935],[568+k*10,956]],P.selfDeep,1,.22);
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:3001});
      L.stripes(c,{colors:[P.stripeCream,P.stripeApricot],width:150,angle:-.52,offset:6*info.T,seed:3002});
      room(c,P);blanket(c,P,t);supportArm(c,P);newborn(c,P,L,t);

      // foreground cloth edge
      c.save();c.strokeStyle=P.ink;c.lineWidth=3;c.globalAlpha=.55;c.beginPath();c.moveTo(210,1290);c.quadraticCurveTo(500,1430,875,1250);c.stroke();c.restore();

      const b=L.seg(t,.5,.9,'outExpo');
      if(b>0)L.arcAnnotation(c,590,880,90,-.7,-.7+b*5.7,{color:P.annYellow,width:3,p:1});
      if(t>.92){
        const p=L.seg(t,.92,1.25,'outExpo');
        L.arcAnnotation(c,704,834,55,2.8,2.8+p*1.8,{color:P.annBlue,width:2.5,p:1,arrow:10});
      }
    }
  });
})();