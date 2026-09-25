(function(){
  'use strict';
  const ID='wet-before';
  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib, P=L.pal, M=FILM.MYLLO;
      const t=M.clamp(tIn,0,info.dur);
      const p=M.smooth(t/info.dur);
      M.paper(ctx,L,17,0.25);
      M.header(ctx,L,'01 · ДО ВАКУУМУ','Після вологого етапу','поверхня ще мокра',info.T/FILM.DURATION);

      const g=M.drawMini(ctx,L,{
        cx:545,cy:1050,scale:1.08,
        armAngle:-0.72,
        spin:0.32+t*0.2,
        wet:0.18+0.82*p,
        dry:0
      });

      const a=M.smooth(M.clamp((p-0.25)/0.55));
      M.callout(ctx,L,g.recordCx-40,g.recordCy-55,'мокра поверхня','left',a);
      M.callout(ctx,L,g.towerX,g.towerY-10,'вакуумний вузол припаркований','right',a*0.9);

      ctx.save();
      ctx.globalAlpha=0.42*a;
      ctx.strokeStyle=P.annBlue;
      ctx.lineWidth=4;
      ctx.beginPath();
      ctx.arc(g.recordCx,g.recordCy,230,3.45,5.55);
      ctx.stroke();
      ctx.restore();
    }
  });
})();