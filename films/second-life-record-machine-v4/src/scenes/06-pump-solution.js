// 06 · Cleaning solution · T 15.000–18.000
(function(){
  'use strict';
  const ID='pump-solution';
  const L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function macro(c,p,wet){
    if(p<=0)return;
    const box={x:545,y:405,w:390,h:350};
    c.save();c.globalAlpha*=p;
    L.v4GrooveMacro(c,box,{dirt:.82,wet:wet,reflection:.45,seed:sd('macro')});
    c.save();c.translate(740,470);c.rotate(.12);
    c.fillStyle=P.metal;c.strokeStyle=P.inkSoft;c.lineWidth=2.4;
    c.beginPath();c.roundRect(-135,-28,270,56,22);c.fill();c.stroke();
    c.strokeStyle=wet>.25?P.mylloBristleWet:P.mylloBristle;c.lineWidth=2.4;
    for(let i=-11;i<=11;i++){
      const x=i*10;c.beginPath();c.moveTo(x,28);c.lineTo(x+2,64+(i&1)*5);c.stroke();
    }
    c.restore();
    if(wet>0){
      c.fillStyle=P.mylloWetPale;c.globalAlpha*=.75;
      for(let i=0;i<7;i++){
        const a=i*.9+wet*1.1;
        c.beginPath();c.ellipse(675+i*22,565+(i%2)*12,5+wet*3,3+wet*2,a,0,TAU);c.fill();
      }
    }
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      const engage=sstep(.35,1.0,t);
      const pump=sstep(1.15,1.45,t);
      const wet=sstep(1.45,2.35,t);
      const inset=sstep(2.05,2.4,t);
      const rot=t*3.1;

      L.paper(c,{seed:sd('paper')});
      c.fillStyle=P.paperShade;c.globalAlpha=.28;c.fillRect(0,1435,1080,485);c.globalAlpha=1;

      L.v4MylloMachine(c,{
        rotation:rot,
        supply:engage,
        vacuum:0,
        active:pump>.18?'PUMP':'START',
        wet,
        dry:0
      });

      L.v4ProcessBand(c,{
        index:2,
        main:'МОЮЩИЙ РАСТВОР',
        sub:'ПОДАЧА НА ЩЁТКУ',
        p:sstep(0,.28,t)
      });

      const arrow=sstep(.1,.4,t)*(1-sstep(1.6,2.0,t));
      if(arrow>0)L.arcAnnotation(c,535,785,355,-2.5,-.45,{color:P.cleanTeal,width:2.5,p:arrow,arrow:11,alpha:.6});

      macro(c,inset,wet);

      if(wet>.05){
        c.save();c.strokeStyle=P.mylloWetPale;c.lineWidth=3.2;c.globalAlpha=.5*wet;
        c.beginPath();c.arc(535,785,240,.2,1.5+.9*wet);c.stroke();c.restore();
      }

      c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);c.restore();
    }
  });
})();