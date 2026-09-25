(function(){
  'use strict';
  const ID='pivot-engage';
  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib, P=L.pal, M=FILM.MYLLO;
      const t=M.clamp(tIn,0,info.dur);
      const u=M.clamp(t/2.0);
      const pivot=M.smooth(M.clamp(u/0.72));
      const engage=M.smooth(M.clamp((u-0.72)/0.28));
      const angle=M.lerp(-0.72,0,pivot);

      M.paper(ctx,L,23,0.32);
      M.header(ctx,L,'02 · ВАКУУМНИЙ ЕТАП','Вузол стає в робоче положення','спочатку позиція — потім вакуум',info.T/FILM.DURATION);

      const g=M.drawMini(ctx,L,{
        cx:545,cy:1050,scale:1.09,
        armAngle:angle,
        spin:0.72+t*0.22,
        wet:1,
        dry:0,
        engaged:engage,
        highlight:'vacuum'
      });

      ctx.save();
      ctx.globalAlpha=0.2+0.65*(1-pivot);
      ctx.strokeStyle=P.red;
      ctx.lineWidth=3;
      ctx.setLineDash([14,12]);
      ctx.beginPath();
      ctx.arc(g.towerX,g.towerY,170,2.4,3.15);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      if (engage>0.05) {
        L.text(ctx,'вакуум увімкнено',76,1450,{
          size:30,weight:600,color:P.red,
          family:'Montserrat, Arial, sans-serif',
          alpha:engage
        });
      }
    }
  });
})();