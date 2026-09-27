// 07 · Groove cleaning / reverse · T 18.000–21.000
(function(){
  'use strict';
  const ID='brush-reverse';
  const L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function macro(c,p,reverse){
    if(p<=0)return;
    const box={x:115,y:720,w:850,h:575};
    c.save();
    c.beginPath();c.rect(box.x,box.y,box.w,box.h*p);c.clip();
    L.v4GrooveMacro(c,box,{dirt:.58,wet:.7,reflection:.48,seed:sd('macro')});
    // same brush orientation as the machine supply node, now shown close.
    c.save();c.translate(540,835);c.rotate(reverse?-.12:.12);
    c.fillStyle=P.metal;c.strokeStyle=P.inkSoft;c.lineWidth=3;
    c.beginPath();c.roundRect(-260,-35,520,70,28);c.fill();c.stroke();
    c.strokeStyle=P.mylloBristleWet;c.lineWidth=3.2;
    for(let i=-23;i<=23;i++){
      const x=i*10.2,lag=reverse?-10:10;
      c.beginPath();c.moveTo(x,35);c.lineTo(x+lag,82+(i&1)*6);c.stroke();
    }
    c.restore();

    // displaced dirt/fibre cluster at the contact zone.
    c.save();c.strokeStyle=P.dust;c.lineWidth=2.5;c.globalAlpha=.65;
    for(let i=0;i<5;i++){
      const x=420+i*38+(reverse?-18:18)*p, y=1030+(i%2)*22;
      c.beginPath();c.moveTo(x-20,y-8);c.quadraticCurveTo(x,y+5,x+30,y+11);c.stroke();
    }
    c.restore();
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      const reverse=sstep(1.18,1.55,t);
      const macroP=sstep(1.55,2.15,t);
      const lift=sstep(2.45,2.95,t);
      const direction=reverse>.5?-1:1;
      const rot=(reverse<.5?t*3.2:(1.55*3.2)-(t-1.55)*3.2);

      L.paper(c,{seed:sd('paper')});
      c.fillStyle=P.paperShade;c.globalAlpha=.28;c.fillRect(0,1435,1080,485);c.globalAlpha=1;

      L.v4MylloMachine(c,{
        rotation:rot,
        supply:1-lift,
        vacuum:0,
        active:reverse>.18?'REVERSE':'PUMP',
        wet:1,
        dry:0,
        reverse:reverse>.5
      });

      L.v4ProcessBand(c,{
        index:3,
        main:'ОЧИСТКА КАНАВОК',
        p:sstep(0,.25,t)
      });

      // reverse chip appears only around the actual direction change.
      const chip=sstep(1.05,1.25,t)*(1-sstep(2.05,2.35,t));
      if(chip>0){
        c.save();c.globalAlpha*=chip;c.fillStyle=P.processBand;
        c.beginPath();c.roundRect(230,380,620,72,14);c.fill();
        c.strokeStyle=P.comicBorder;c.lineWidth=3;c.stroke();
        L.text(c,'REVERSE · ОБРАТНОЕ ВРАЩЕНИЕ',540,417,{size:27,weight:800,color:P.processText,align:'center',baseline:'middle'});
        c.restore();
      }

      // small literal direction arrow, never the only proof.
      const arr=sstep(.1,.35,t)*(1-sstep(2.25,2.55,t));
      if(arr>0){
        if(direction>0)L.arcAnnotation(c,535,785,350,-2.5,-.35,{color:P.cleanTeal,width:2.5,p:arr,arrow:11,alpha:.6});
        else L.arcAnnotation(c,535,785,350,-.35,-2.5,{color:P.cleanTeal,width:2.5,p:arr,arrow:11,alpha:.6});
      }

      macro(c,macroP,reverse>.5);

      // local wet-film transport direction cue
      if(macroP<.65){
        c.save();c.strokeStyle=P.mylloWetPale;c.lineWidth=3;c.globalAlpha=.42;
        c.beginPath();c.arc(535,785,245,reverse>.5?2.6:.2,reverse>.5?.7:1.75,reverse>.5);c.stroke();c.restore();
      }

      c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);c.restore();
    }
  });
})();