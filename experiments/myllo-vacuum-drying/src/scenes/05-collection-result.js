(function(){
  'use strict';
  const ID='collection-result';
  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib, P=L.pal, M=FILM.MYLLO;
      const t=M.clamp(tIn,0,info.dur);
      const p=M.smooth(t/info.dur);
      M.drawMacroPass(ctx,L,{p:1,spin:0.84+t*0.2});

      ctx.save();
      ctx.globalAlpha=0.12+0.12*Math.sin(p*Math.PI);
      ctx.fillStyle=P.glow;
      ctx.beginPath();ctx.ellipse(390,1030,320,100,0,0,Math.PI*2);ctx.fill();
      ctx.restore();

      L.text(ctx,'Відпрацьована рідина',76,340,{
        size:48,weight:700,color:P.lineWhite,
        family:'Exo 2, Montserrat, Arial, sans-serif'
      });
      L.text(ctx,'збирається системою',76,396,{
        size:34,weight:500,color:P.paleBlue,
        family:'Montserrat, Arial, sans-serif'
      });
      L.text(ctx,'а після зони збору поверхня лишається сухою',76,1480,{
        size:27,weight:400,color:P.lineWhite,
        family:'Montserrat, Arial, sans-serif',
        alpha:0.9
      });

      ctx.save();
      ctx.globalAlpha=0.35+0.35*p;
      ctx.strokeStyle=P.sage;
      ctx.lineWidth=5;
      ctx.beginPath();ctx.moveTo(120,1560);ctx.lineTo(960,1560);ctx.stroke();
      ctx.restore();
    }
  });
})();