// 08 · Vacuum collection · T 21.000–24.000
(function(){
  'use strict';
  const ID='vacuum-collect';
  const L=FILM.lib,P=L.pal;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function macro(c,p,dry){
    if(p<=0)return;
    const box={x:110,y:720,w:860,h:590};
    c.save();
    c.beginPath();c.rect(box.x,box.y,box.w,box.h*p);c.clip();
    L.v4GrooveMacro(c,box,{dirt:.38*(1-dry),wet:1-dry*.75,reflection:.55+.25*dry,seed:sd('macro')});
    c.save();c.translate(545,865);c.rotate(-.06);
    c.fillStyle=P.metal;c.strokeStyle=P.inkSoft;c.lineWidth=3;
    c.beginPath();c.roundRect(-270,-30,540,60,24);c.fill();c.stroke();
    c.strokeStyle=P.vacuum;c.lineWidth=12;c.lineCap='round';
    c.beginPath();c.moveTo(-215,38);c.lineTo(215,38);c.stroke();
    c.restore();

    c.save();c.strokeStyle=P.cleanTeal;c.lineWidth=2.2;c.globalAlpha=.45;
    for(let i=0;i<5;i++){
      const x=330+i*105;
      c.beginPath();c.moveTo(x,1110);c.quadraticCurveTo(x+18,1030,440+i*55,910);c.stroke();
    }
    c.restore();

    c.save();
    c.fillStyle=L.rgba(P.mylloWetPale,.12*(1-dry));c.fillRect(110,930,860,180);
    c.strokeStyle=P.white;c.lineWidth=2.5;c.globalAlpha=.35+.35*dry;
    for(let i=0;i<5;i++){
      c.beginPath();c.arc(360,1270,310+i*26,4.65,5.45);c.stroke();
    }
    c.restore();
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      const engage=sstep(.35,1.0,t);
      const active=sstep(1.05,1.3,t);
      const dry=sstep(1.35,2.45,t);
      const macroP=sstep(1.55,2.05,t);
      const rot=t*3.05;

      L.paper(c,{seed:sd('paper')});
      c.fillStyle=P.paperShade;c.globalAlpha=.28;c.fillRect(0,1435,1080,485);c.globalAlpha=1;

      L.v4MylloMachine(c,{
        rotation:rot,
        supply:0,
        vacuum:engage,
        active:active>.15?'VACUUM':null,
        wet:1-dry*.78,
        dry:dry
      });

      L.v4ProcessBand(c,{
        index:4,
        main:'ВАКУУМ',
        sub:'ЖИДКОСТЬ И ЗАГРЯЗНЕНИЯ УДАЛЯЮТСЯ ИЗ КАНАВОК',
        subSize:22,
        p:sstep(0,.25,t)
      });

      macro(c,macroP,dry);

      if(dry>.05 && macroP<.8){
        c.save();c.strokeStyle=P.cleanTeal;c.lineWidth=2;c.globalAlpha=.35*dry;
        for(let i=0;i<4;i++){
          c.beginPath();c.moveTo(650+i*20,790+i*4);c.lineTo(725+i*13,720+i*6);c.stroke();
        }
        c.restore();
      }

      c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);c.restore();
    }
  });
})();