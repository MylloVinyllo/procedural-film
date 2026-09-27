// 05 · Cleaning machine · T 12.000–15.000
(function(){
  'use strict';
  const ID='reveal-myllo';
  const L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function poly(c,pts,fill,stroke=P.ink,width=3,alpha=1){
    c.save();c.globalAlpha*=alpha;c.fillStyle=fill;c.beginPath();L.tracePath(c,pts,true);c.fill();
    if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke();}c.restore();
  }
  function hand(c,x,y,rot,scale,seed){
    c.save();c.translate(x,y);c.rotate(rot);c.scale(scale,scale);
    const palm=[[-42,-52],[28,-48],[55,-12],[43,48],[-30,58],[-55,18]];
    poly(c,palm,P.skin,P.ink,3.4,.98);
    poly(c,[[10,-45],[50,-15],[40,45],[10,36]],P.skinShadow,null,0,.28);
    const fingers=[
      [[15,-48],[76,-43],[82,-25],[20,-21]],
      [[20,-20],[86,-13],[86,7],[20,5]],
      [[18,8],[78,16],[75,34],[12,30]]
    ];
    fingers.forEach((pts,i)=>poly(c,pts,P.skin,P.inkSoft,1.8,.98));
    poly(c,[[-12,-10],[37,-5],[48,16],[10,28],[-26,15]],P.skin,P.inkSoft,2.1,.98);
    c.restore();
  }
  function record(c,cx,cy,rx,ry,alpha=1){
    c.save();c.globalAlpha*=alpha;
    c.fillStyle=P.vinyl;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,TAU);c.fill();
    c.strokeStyle=P.vinylEdge;c.lineWidth=5;c.stroke();
    for(let i=0;i<18;i++){
      const r=rx-18-i*(rx-115)/20;
      c.strokeStyle=P.groove;c.globalAlpha=.32+(i%5===0?.18:0);c.lineWidth=i%5===0?1.5:.75;
      c.beginPath();c.ellipse(cx,cy,r,ry*(r/rx),0,0,TAU);c.stroke();
    }
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.ellipse(cx,cy,74,28,0,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(cx,cy,7,0,TAU);c.fill();
    c.restore();
  }
  function roomHint(c,a){
    c.save();c.globalAlpha*=a;c.fillStyle=P.roomWall;c.fillRect(0,0,1080,1920);
    c.fillStyle=P.table;c.fillRect(0,1215,1080,360);
    c.strokeStyle=P.inkSoft;c.lineWidth=3;c.globalAlpha*=.55;
    c.strokeRect(760,610,210,420); c.beginPath();c.arc(865,890,65,0,TAU);c.stroke();
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      const reveal=sstep(.45,1.15,t);
      const place=sstep(1.05,1.75,t);
      const clampOn=sstep(1.75,2.25,t);
      const clear=sstep(2.25,2.65,t);
      const start=sstep(2.72,2.98,t);

      L.paper(c,{seed:sd('paper')});
      roomHint(c,1-reveal*.9);

      // outgoing carried record before the product reveal
      const rcx=lerp(645,535,place), rcy=lerp(735,785,place);
      const rx=lerp(255,310,place), ry=lerp(255,118,place);
      if(reveal<.98){
        record(c,rcx,rcy,rx,ry,1-reveal*.62);
        hand(c,380,820,-.12,.66,sd('carryL'));
        hand(c,800,820,Math.PI+.12,.66,sd('carryR'));
      }

      // opaque comic wipe into dedicated product space
      if(reveal>0){
        c.save();c.beginPath();c.rect(0,0,1080*reveal,1920);c.clip();
        c.fillStyle=P.paper;c.fillRect(0,0,1080,1920);
        // slight floor/table plane under the machine
        c.fillStyle=P.paperShade;c.globalAlpha=.35;c.fillRect(0,1435,1080,485);c.globalAlpha=1;
        L.v4MylloMachine(c,{
          rotation:t*2.7,
          supply:0,
          vacuum:0,
          active:start>.35?'START':null,
          wet:0,
          dry:0
        });
        c.restore();
      }

      // physically place the record and then the centre clamp.
      if(reveal>.72 && place<.98){
        hand(c,360,700,.62,.58,sd('placeL'));
        hand(c,705,710,2.55,.58,sd('placeR'));
      }
      if(clampOn>.02 && clampOn<.98){
        hand(c,610,680,2.1,.52,sd('clamp'));
        c.save();c.strokeStyle=P.metal;c.lineWidth=5;c.globalAlpha=.5+.4*clampOn;
        c.beginPath();c.arc(535,748,50,-.1,1.0);c.stroke();c.restore();
      }

      L.v4ProcessBand(c,{index:1,main:'ОЧИСТКА ПЛАСТИНКИ',p:sstep(.65,1.05,t)});

      // a single short product callout, not a component diagram.
      const call=sstep(2.18,2.42,t)*(1-sstep(2.62,2.9,t));
      if(call>0){
        c.save();c.strokeStyle=P.cleanGold;c.lineWidth=2.3;c.globalAlpha=.65*call;
        c.beginPath();c.moveTo(805,435);c.lineTo(728,520);c.lineTo(655,602);c.stroke();c.restore();
        L.text(c,'MYLLO VINYLLO',820,420,{size:25,weight:800,color:P.inkSoft,align:'right',baseline:'middle',alpha:call});
      }

      // allow a clean final read of the actual machine silhouette.
      if(clear>.15){
        c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.globalAlpha=.65*clear;c.strokeRect(18,18,1044,1884);c.restore();
      }
    }
  });
})();