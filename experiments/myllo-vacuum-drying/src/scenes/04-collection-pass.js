(function(){
  'use strict';
  const ID='collection-pass';
  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib, P=L.pal, M=FILM.MYLLO;
      const t=M.clamp(tIn,0,info.dur);
      const p=M.smooth(t/info.dur);
      M.drawMacroPass(ctx,L,{p,spin:0.1+t*0.22});

      L.text(ctx,'ПІСЛЯ · СУХО',90,420,{
        size:26,weight:700,color:P.sage,
        family:'Exo 2, Montserrat, Arial, sans-serif',
        tracking:2
      });
      L.text(ctx,'ЗОНА ЗБОРУ',540,420,{
        size:26,weight:700,color:P.magenta,align:'center',
        family:'Exo 2, Montserrat, Arial, sans-serif',
        tracking:2
      });
      L.text(ctx,'ДО · ВОЛОГО',990,420,{
        size:26,weight:700,color:P.paleBlue,align:'right',
        family:'Exo 2, Montserrat, Arial, sans-serif',
        tracking:2
      });

      ctx.save();
      ctx.strokeStyle=P.lavender;
      ctx.globalAlpha=0.65;
      ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(90,455);ctx.lineTo(990,455);ctx.stroke();
      ctx.restore();

      L.text(ctx,'поверхня проходить під активним вузлом',540,1460,{
        size:27,weight:400,color:P.lineWhite,align:'center',
        family:'Montserrat, Arial, sans-serif',
        alpha:0.88
      });
    }
  });
})();