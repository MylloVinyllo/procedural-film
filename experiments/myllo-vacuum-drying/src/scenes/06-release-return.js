(function(){
  'use strict';
  const ID='release-return';
  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib, P=L.pal, M=FILM.MYLLO;
      const t=M.clamp(tIn,0,info.dur);
      const p=M.smooth(t/info.dur);
      const release=M.smooth(M.clamp(p/0.28));
      const park=M.smooth(M.clamp((p-0.22)/0.72));
      const angle=M.lerp(0,-0.72,park);

      M.paper(ctx,L,31,0.46);
      M.header(ctx,L,'03 · РЕЗУЛЬТАТ','Сухо після збору','той самий Mini, той самий вузол',info.T/FILM.DURATION);

      const g=M.drawMini(ctx,L,{
        cx:545,cy:1040,scale:1.06,
        armAngle:angle,
        spin:0.2+t*0.18,
        wet:0,
        dry:1,
        engaged:1-release,
        highlight:release<0.7?'vacuum':''
      });

      const settle=M.smooth(M.clamp((p-0.65)/0.35));
      ctx.save();
      ctx.globalAlpha=0.18+0.52*settle;
      ctx.strokeStyle=P.sage;
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.arc(g.recordCx,g.recordCy,250,3.3,5.9);
      ctx.stroke();
      ctx.restore();

      L.text(ctx,'вакуум вимкнено → вузол звільняє платівку',76,1450,{
        size:28,weight:500,color:P.inkSoft,
        family:'Montserrat, Arial, sans-serif',
        alpha:0.8+0.2*settle
      });
    }
  });
})();