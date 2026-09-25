(function(){
  'use strict';
  const ID='identify-mini';
  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib, P=L.pal, M=FILM.MYLLO;
      const t=M.clamp(tIn,0,info.dur);
      const p=M.smooth(t/info.dur);
      M.paper(ctx,L,11,0.4);
      M.header(ctx,L,'MYLLO VINYLLO','Myllo Mini','вакуумна мийка платівок',info.T/FILM.DURATION);

      const rise=(1-p)*24;
      M.drawMini(ctx,L,{
        cx:545,cy:1040+rise,scale:1.06,
        armAngle:-0.72,
        spin:0.08+t*0.16,
        wet:0,
        dry:0,
        alpha:0.9+0.1*p
      });

      ctx.save();
      ctx.globalAlpha=0.2+0.5*p;
      ctx.strokeStyle=P.red;
      ctx.lineWidth=2.5;
      ctx.beginPath();
      ctx.arc(540,1040,440,0.1,1.35);
      ctx.stroke();
      ctx.restore();

      L.text(ctx,'Платівка вже встановлена.',76,1450,{
        size:30,weight:500,color:P.inkSoft,
        family:'Montserrat, Arial, sans-serif'
      });
    }
  });
})();