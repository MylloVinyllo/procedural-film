// Single-backend quality proof: interaction first, no split-screen comparison.
(function(){
  'use strict';
  const ID='quality-proof',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector'),washer=V.product('myllo-rcm'),record=V.prop('vinyl-record');
  const hold=V.action('hold-record'),place=V.action('place-record'),press=V.action('press-pump');

  function state(t){
    if(t<2){
      const machine={x:540,y:1240,scale:.78},recState={x:540,y:850,r:108},a=record.anchors(recState);
      const s=hold.sample(1,270);s.phase='HOLD';return s;
    }
    if(t<4.25){const s=place.sample((t-2)/2.25,270);s.phase='PLACE';return s;}
    const s=press.sample((t-4.25)/1.75,270);s.phase='PRESS';return s;
  }
  function drawState(ctx,s){
    actor.drawBody(ctx,s.character);
    actor.drawArms(ctx,s.character,'back');
    washer.drawBase(ctx,s.machine);
    record.draw(ctx,s.record);
    washer.drawOverlay(ctx,s.machine);
    actor.drawArms(ctx,s.character,'front');
    actor.drawHands(ctx,s.character);
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn)),s=state(t);
    ctx.fillStyle=P.paper;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.stripeCream;ctx.fillRect(0,0,1080,214);
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(70,214);ctx.lineTo(1010,214);ctx.stroke();

    ctx.fillStyle=P.ink;ctx.font='900 42px system-ui';ctx.textAlign='left';ctx.fillText('VECTOR QUALITY PROOF',76,104);
    ctx.font='600 21px system-ui';ctx.fillStyle=P.inkSoft;ctx.fillText('one actor · one product · anchored contact',77,146);
    ctx.font='900 24px system-ui';ctx.textAlign='right';ctx.fillStyle=P.tealDeep;ctx.fillText(s.phase,1002,111);

    // grounded stage
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(110,1510);ctx.lineTo(970,1510);ctx.stroke();
    ctx.save();ctx.globalAlpha=.10;ctx.fillStyle=P.ink;ctx.beginPath();ctx.ellipse(540,1496,315,36,0,0,Math.PI*2);ctx.fill();ctx.restore();

    drawState(ctx,s);

    ctx.fillStyle=P.inkFaint;ctx.font='500 18px system-ui';ctx.textAlign='center';
    ctx.fillText('body → arms → product → record → hands',540,1640);
  }});
})();