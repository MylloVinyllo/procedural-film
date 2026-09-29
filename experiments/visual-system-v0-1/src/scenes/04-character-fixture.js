// Character component fixture: review whole-body action silhouettes. Hand anatomy has its own dedicated fixture.
(function(){
  'use strict';
  const ID='character-fixture',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector'),record=V.prop('vinyl-record'),washer=V.product('myllo-rcm');
  const hold=V.action('hold-record'),place=V.action('place-record'),press=V.action('press-pump');

  function chosen(t){
    if(t<2){const s=hold.sample(1,270);s.label='HOLD RECORD';s.note='edge grip · shoulders relaxed';return s;}
    if(t<4){const s=place.sample(.58,270);s.label='PLACE RECORD';s.note='lean · guided descent · spindle alignment';return s;}
    const s=press.sample(.62,270);s.label='PRESS CONTROL';s.note='side-working stance · palm brace · fingertip contact';return s;
  }

  function drawActor(ctx,s){
    const comp=s.label==='HOLD RECORD'?'fixture-hold':s.label==='PLACE RECORD'?'fixture-place':'fixture-press';
    V.withComposition(ctx,comp,()=>{
      actor.drawBody(ctx,s.character);
      actor.drawArms(ctx,s.character,'back');
      if(s.label!=='HOLD RECORD')washer.drawBase(ctx,s.machine);
      actor.drawHandBacks(ctx,s.character);
      record.draw(ctx,s.record);
      if(s.label!=='HOLD RECORD')washer.drawOverlay(ctx,s.machine);
      actor.drawArms(ctx,s.character,'front');
      actor.drawHandFronts(ctx,s.character);
    });
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn)),s=chosen(t);
    ctx.fillStyle=P.paper;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.stripeCream;ctx.fillRect(0,0,1080,190);

    ctx.fillStyle=P.ink;ctx.font='900 43px system-ui';ctx.textAlign='left';ctx.fillText('CHARACTER FIXTURE',70,91);
    ctx.fillStyle=P.tealDeep;ctx.font='900 22px system-ui';ctx.textAlign='right';ctx.fillText(s.label,1000,91);
    ctx.fillStyle=P.inkSoft;ctx.font='500 18px system-ui';ctx.textAlign='left';ctx.fillText('whole-body silhouette · pose · object interaction',72,130);

    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(110,1515);ctx.lineTo(970,1515);ctx.stroke();

    drawActor(ctx,s);

    ctx.fillStyle=P.ink;ctx.font='900 18px system-ui';ctx.textAlign='center';ctx.fillText(s.label,540,1612);
    ctx.fillStyle=P.inkFaint;ctx.font='500 16px system-ui';ctx.fillText(s.note,540,1643);

    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(280,1682);ctx.lineTo(800,1682);ctx.stroke();
    ctx.fillStyle=P.inkFaint;ctx.font='500 14px system-ui';
    ctx.fillText('Hand-state quality is reviewed separately in AUTHORED HAND LIBRARY.',540,1720);
  }});
})();