// Motion grammar fixture: normal-speed micro-actions with deliberate anticipation, arc, contact and settle.
(function(){
  'use strict';
  const ID='motion-fixture',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector'),washer=V.product('myllo-rcm'),record=V.prop('vinyl-record');
  const place=V.action('place-record'),press=V.action('press-pump');

  function drawLayered(ctx,s){
    actor.drawBody(ctx,s.character);
    actor.drawArms(ctx,s.character,'back');
    washer.drawBase(ctx,s.machine);
    record.draw(ctx,s.record);
    washer.drawOverlay(ctx,s.machine);
    actor.drawArms(ctx,s.character,'front');
    actor.drawHands(ctx,s.character);
  }
  function card(ctx,title,sub){
    ctx.fillStyle=P.navyDeep;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.lineWhite;ctx.font='900 44px system-ui';ctx.textAlign='left';ctx.fillText(title,72,112);
    ctx.fillStyle=P.paleBlue;ctx.font='600 19px system-ui';ctx.fillText(sub,74,151);
    ctx.strokeStyle=P.grid;ctx.lineWidth=1;ctx.globalAlpha=.28;
    for(let y=250;y<1710;y+=100){ctx.beginPath();ctx.moveTo(72,y);ctx.lineTo(1008,y);ctx.stroke();}
    ctx.globalAlpha=1;
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn));
    if(t<4){
      card(ctx,'PLACE RECORD','anticipation → curved travel → seat → physical release');
      const s=place.sample(t/4,270);
      ctx.save();ctx.translate(0,110);drawLayered(ctx,s);ctx.restore();
      ctx.fillStyle=P.cleanTeal;ctx.font='800 20px system-ui';ctx.textAlign='right';
      ctx.fillText(s.contactActive?'CONTACT LOCKED':'CONTACT RELEASED',995,178);
    }else{
      card(ctx,'PRESS CONTROL','preload → reach → fingertip contact → release');
      const s=press.sample((t-4)/4,270);
      ctx.save();ctx.translate(0,110);drawLayered(ctx,s);ctx.restore();
      ctx.fillStyle=P.cleanGold;ctx.font='800 20px system-ui';ctx.textAlign='right';
      ctx.fillText(s.contactActive?'PUMP CONTACT':'REACH / RETURN',995,178);
    }
  }});
})();