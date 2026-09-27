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
  function record(c,cx,cy,rx,ry,alpha=1){
    c.save();c.globalAlpha*=alpha;
    c.fillStyle=P.vinyl;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,TAU);c.fill();
    c.strokeStyle=P.vinylEdge;c.lineWidth=5;c.stroke();
    for(let i=0;i<18;i++){
      const r=rx-18-i*(rx-115)/20;
      c.strokeStyle=P.groove;c.globalAlpha=.32+(i%5===0?.18:0);c.lineWidth=i%5===0?1.5:.75;
      c.beginPath();c.ellipse(cx,cy,r,ry*(r/rx),0,0,TAU);c.stroke();
    }
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.ellipse(cx,cy,74,Math.max(25,ry*.24),0,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(cx,cy,7,0,TAU);c.fill();
    c.restore();
  }
  function roomHint(c,a){
    c.save();c.globalAlpha*=a;c.fillStyle=P.roomWall;c.fillRect(0,0,1080,1920);
    c.fillStyle=P.table;c.fillRect(0,1215,1080,360);
    c.strokeStyle=P.inkSoft;c.lineWidth=3;c.globalAlpha*=.55;
    c.strokeRect(760,610,210,420);c.beginPath();c.arc(865,890,65,0,TAU);c.stroke();c.restore();
  }
  function productLabel(c,p){
    if(p<=0)return;
    c.save();c.globalAlpha*=p;
    const x=650,y=390,w=330,h=106;
    c.fillStyle=P.processBand;c.beginPath();c.roundRect(x,y,w,h,16);c.fill();
    c.strokeStyle=P.cleanGold;c.lineWidth=4;c.stroke();
    c.strokeStyle=P.cleanGold;c.lineWidth=3;c.beginPath();c.moveTo(x+36,y+h);c.lineTo(700,570);c.lineTo(625,675);c.stroke();
    c.fillStyle=P.cleanGold;c.beginPath();c.arc(625,675,7,0,TAU);c.fill();
    L.text(c,'МОЙКА ДЛЯ ПЛАСТИНОК',x+18,y+38,{size:24,weight:850,color:P.processText,align:'left',baseline:'middle'});
    L.text(c,'MYLLO VINYLLO',x+18,y+75,{size:29,weight:900,color:P.cleanGold,align:'left',baseline:'middle'});
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      const reveal=sstep(.18,.72,t);
      const carry=sstep(.48,1.42,t);
      const settle=sstep(1.24,1.66,t);
      const clampOn=sstep(1.62,2.14,t);
      const release=sstep(1.9,2.35,t);
      const start=sstep(2.36,2.78,t);

      L.paper(c,{seed:sd('paper')});
      roomHint(c,1-reveal*.94);

      // Opaque product-space wipe. The machine first appears EMPTY, so placement has real causality.
      if(reveal>0){
        c.save();c.beginPath();c.rect(0,0,1080*reveal,1920);c.clip();
        c.fillStyle=P.paper;c.fillRect(0,0,1080,1920);
        c.fillStyle=P.paperShade;c.globalAlpha=.35;c.fillRect(0,1435,1080,485);c.globalAlpha=1;
        L.v4MylloMachine(c,{
          rotation:t*2.7,
          supply:0,vacuum:0,active:start>.35?'START':null,wet:0,dry:0,
          recordAlpha:settle,
          clampAlpha:clampOn
        });
        c.restore();
      }

      // Carried record moves as one rigid object into the machine's exact record plane.
      if(carry<.995){
        const cx=lerp(610,535,carry), cy=lerp(1115,785,carry);
        const rx=lerp(245,310,carry), ry=lerp(245,118,carry);
        const a=1-settle;
        record(c,cx,cy,rx,ry,a);

        // Hands are no longer floating sprites. Each wrist target drives a two-bone arm.
        const leftTarget=[cx-rx*.73,cy+ry*.26];
        const rightTarget=[cx+rx*.73,cy+ry*.26];
        L.v4ArmIK(c,{shoulder:[150,1360],target:leftTarget,l1:300,l2:285,bend:-1,
          upperWidth:86,foreWidth:61,handScale:.68,handRot:-.10,grip:'edge',alpha:a});
        L.v4ArmIK(c,{shoulder:[930,1360],target:rightTarget,l1:300,l2:285,bend:1,
          upperWidth:86,foreWidth:61,handScale:.68,handRot:Math.PI+.10,grip:'edge',alpha:a});
      }

      // Clamp gets a short, mechanically attached hand action after the record is seated.
      const clampHand=(clampOn)*(1-release);
      if(clampHand>.02){
        const target=[535,748];
        L.v4ArmIK(c,{shoulder:[820,1280],target,l1:330,l2:280,bend:-1,
          upperWidth:80,foreWidth:56,handScale:.62,handRot:-2.25,grip:'label',alpha:clampHand});
        c.save();c.strokeStyle=P.metal;c.lineWidth=5;c.globalAlpha=.45*clampHand;
        c.beginPath();c.arc(535,748,50,-.1,1.0);c.stroke();c.restore();
      }

      L.v4ProcessBand(c,{index:1,main:'ОЧИСТКА ПЛАСТИНКИ',p:sstep(.45,.82,t)});

      // Owner-requested product identification plate: names the object while the machine is unobscured.
      const tag=sstep(.78,1.12,t)*(1-sstep(2.5,2.86,t));
      productLabel(c,tag);

      if(reveal>.8){
        c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.globalAlpha=.65*reveal;c.strokeRect(18,18,1044,1884);c.restore();
      }
    }
  });
})();