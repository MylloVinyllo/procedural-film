// Product-only reference fixture. No character animation: inspect the reusable washer itself.
(function(){
  'use strict';
  const ID='product-fixture',V=FILM.visual,P=FILM.lib.pal;
  const washer=V.product('myllo-rcm');
  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn));
    const brush=V.sstep(.55,1.6,t)*(1-V.sstep(2.05,2.55,t));
    const vacuum=V.sstep(2.05,3.05,t);
    const active=t<1.8?'PUMP':t<2.8?null:'VACUUM';

    ctx.fillStyle=P.navyDeep;ctx.fillRect(0,0,1080,1920);
    ctx.strokeStyle=P.grid;ctx.globalAlpha=.26;ctx.lineWidth=1;
    for(let y=260;y<1720;y+=90){ctx.beginPath();ctx.moveTo(70,y);ctx.lineTo(1010,y);ctx.stroke();}
    ctx.globalAlpha=1;

    ctx.fillStyle=P.lineWhite;ctx.font='900 48px system-ui';ctx.textAlign='left';ctx.fillText('MYLLO VINYLLO',72,116);
    ctx.fillStyle=P.paleBlue;ctx.font='700 22px system-ui';ctx.fillText('MV-RCM01 · PRODUCT FIXTURE',74,157);
    ctx.fillStyle=P.lineWhite;ctx.font='500 18px system-ui';ctx.fillText('350 × 350 × 200 mm · aluminium clamp · dual goat-hair brush · vacuum collection',74,194);

    // hero product, deliberately large enough that detail defects cannot hide
    washer.draw(ctx,{x:540,y:840,scale:1.55,brushEngage:brush,vacuumEngage:vacuum,active});

    // callout rail
    const rows=[
      ['01','ALUMINIUM CLAMP','centered retention / no label contact'],
      ['02','DUAL GOAT-HAIR BRUSH','two visible fibre rows'],
      ['03','VACUUM COLLECTION','separate right working head'],
      ['04','FRONT CONTROL PLATE','four named controls + blue indicators']
    ];
    let y=1400;
    for(const r of rows){
      ctx.fillStyle=P.teal;ctx.font='900 18px system-ui';ctx.fillText(r[0],86,y);
      ctx.fillStyle=P.lineWhite;ctx.font='800 18px system-ui';ctx.fillText(r[1],136,y);
      ctx.fillStyle=P.grid;ctx.font='500 16px system-ui';ctx.fillText(r[2],136,y+27);
      y+=86;
    }
  }});
})();