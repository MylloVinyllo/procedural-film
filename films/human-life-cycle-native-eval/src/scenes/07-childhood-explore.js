// 07 Explore · T 11.5–13.5
// Layers: paper/sky → distant park → fence/tree crowns → protagonist → foreground grasses → reach overlays.
(function(){
  'use strict';
  const ID='childhood-explore',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,p,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();};
  const poly=(c,p,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}

  function background(c,P,t){
    // clouds
    c.save();c.globalAlpha=.45;c.fillStyle=P.paperShade;
    for(const q of [[175,400,95],[285,430,70],[760,350,115],[900,385,75]]){c.beginPath();c.ellipse(q[0]+t*5,q[1],q[2],q[2]*.35,0,0,TAU);c.fill();}
    c.restore();
    // far crowns
    c.save();c.fillStyle=P.ageSage;c.globalAlpha=.38;
    for(let i=0;i<10;i++){const x=60+i*110,y=760+35*Math.sin(i*1.2),r=70+(i%3)*18;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
    c.restore();
    // fence
    line(c,[[60,930],[1020,930]],P.inkFaint,3,.38);
    for(let x=85;x<1010;x+=95){line(c,[[x,850],[x,1060]],P.inkFaint,3,.32);line(c,[[x-12,864],[x,842],[x+12,864]],P.inkFaint,1.8,.28);}
    // far path
    line(c,[[70,1190],[1010,1000]],P.inkFaint,2,.28,[18,12]);
  }

  function grass(c,P){
    c.save();c.strokeStyle=P.inkSoft;c.lineWidth=1.4;c.globalAlpha=.62;
    for(let i=0;i<34;i++){
      const x=20+i*34,base=1550-(i%4)*15,h=90+(i*29)%180;
      c.beginPath();c.moveTo(x,base);c.quadraticCurveTo(x+10*Math.sin(i),base-h*.55,x+5*Math.cos(i*.7),base-h);c.stroke();
      if(i%5===0){c.fillStyle=P.cycleGold;c.globalAlpha=.52;c.beginPath();c.ellipse(x+6,base-h,12,20,.2,0,TAU);c.fill();c.globalAlpha=.62;}
    }
    c.restore();
  }

  function glider(c,P,t){
    const x=805+30*Math.sin(t*2.5),y=545-35*Math.sin(t*1.4);
    poly(c,[[x,y],[x+85,y+38],[x+18,y+55]],P.childSky,P.ink,2.2,.88);
    line(c,[[x+18,y+55],[x+5,y+125]],P.annBlue,1.8,.55);
    return[x+15,y+45];
  }

  function hero(c,P,L,t){
    const tw=L.onTwos(t);
    const run=clamp(t/1.2),jump=Math.sin(clamp((t-.7)/.75)*Math.PI)*70;
    const x=380+180*run,y0=1255-jump;
    const skin=P.selfPale;
    // far leg
    poly(c,limb([x-28,y0-155],[x-95,y0-55],28,22),P.socialDeep,P.ink,2.3);
    poly(c,limb([x-95,y0-55],[x-135,y0+65],22,16),P.socialDeep,P.ink,2.2);
    poly(c,[[x-164,y0+58],[x-116,y0+55],[x-105,y0+74],[x-172,y0+78]],P.ink,P.ink,1);
    // near leg
    poly(c,limb([x+28,y0-152],[x+88,y0-22],29,22),P.socialDeep,P.ink,2.3);
    poly(c,limb([x+88,y0-22],[x+147,y0+60],22,16),P.socialDeep,P.ink,2.2);
    poly(c,[[x+118,y0+55],[x+166,y0+52],[x+185,y0+70],[x+122,y0+77]],P.ink,P.ink,1);
    // pelvis and torso
    poly(c,[[x-64,y0-230],[x+62,y0-230],[x+52,y0-145],[x-52,y0-145]],P.socialDeep,P.ink,2.5);
    poly(c,[[x-83,y0-390],[x-40,y0-420],[x+39,y0-420],[x+83,y0-385],[x+66,y0-230],[x-66,y0-230]],P.selfWarm,P.ink,3);
    // garment hem lag
    const hem=14*Math.sin(tw*6);
    line(c,[[x-64,y0-238],[x-15,y0-230+hem],[x+62,y0-238]],P.selfDeep,2,.65);
    // rear arm
    poly(c,limb([x-70,y0-370],[x-120,y0-300],22,17),P.selfWarm,P.ink,2.1);
    poly(c,limb([x-120,y0-300],[x-160,y0-245],17,12),skin,P.ink,2);
    ell(c,x-166,y0-238,15,12,skin,P.ink,1.5);
    // reaching arm to upper-right
    const reach=clamp((t-.45)/.55);
    const e=[x+105+40*reach,y0-360-70*reach],h=[x+185+85*reach,y0-390-145*reach];
    poly(c,limb([x+70,y0-372],e,23,17),P.selfWarm,P.ink,2.2);
    poly(c,limb(e,h,17,11),skin,P.ink,2.1);
    ell(c,h[0]+5,h[1]-4,18,12,skin,P.ink,1.6,1,-.4);
    // head
    const hx=x+5,hy=y0-490;
    poly(c,[[hx-25,hy+55],[hx+25,hy+55],[hx+26,hy+90],[hx-27,hy+90]],skin,P.ink,1.7);
    ell(c,hx,hy,53,64,skin,P.ink,2.6,1,-.05);
    poly(c,[[hx-45,hy+5],[hx-28,hy+50],[hx+2,hy+62],[hx+36,hy+40],[hx+46,hy-2]],skin,P.ink,1.9);
    c.save();c.fillStyle=P.ink;c.beginPath();c.moveTo(hx-50,hy-8);c.bezierCurveTo(hx-35,hy-72,hx+20,hy-80,hx+47,hy-15);c.quadraticCurveTo(hx+12,hy-42,hx-4,hy-24);c.quadraticCurveTo(hx-25,hy-47,hx-50,hy-8);c.fill();c.restore();
    line(c,[[hx-15,hy+4],[hx-2,hy+2]],P.ink,1.4,.8);line(c,[[hx+9,hy+6],[hx+20,hy+7]],P.ink,1.2,.6);line(c,[[hx-4,hy+29],[hx+13,hy+29]],P.inkSoft,1.1,.65);
    // folds
    for(let k=0;k<6;k++)line(c,[[x-40+k*14,y0-350],[x-34+k*13,y0-255]],P.selfDeep,1,.22);
    return h;
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:7001});L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:145,angle:-.52,offset:6*info.T,seed:7002});
    background(c,P,t);const target=glider(c,P,t);const hand=hero(c,P,L,t);grass(c,P);
    // reach path
    const p=L.seg(t,.18,1.1,'outExpo');if(p>0){
      c.save();c.strokeStyle=P.annBlue;c.lineWidth=2.5;c.globalAlpha=.85;c.setLineDash([15,10]);c.beginPath();c.moveTo(hand[0]-110,hand[1]+80);c.quadraticCurveTo(650,650,target[0],target[1]);c.stroke();c.restore();
    }
    if(t>.55)L.arcAnnotation(c,target[0],target[1],82,-.8,-.8+L.seg(t,.55,1.3,'outBack')*4.8,{color:P.annYellow,width:3,p:1});
    // first social colour peeks in behind fence
    const peer=clamp((t-1.65)/.25);if(peer>0){ell(c,930,845,28,34,P.socialBlue,P.ink,1.8,.55*peer);line(c,[[930,880],[930,955]],P.ink,3,.45*peer);}
  }});
})();