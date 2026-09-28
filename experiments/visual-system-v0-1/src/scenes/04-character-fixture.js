// Character component fixture: inspect pose and hand quality at large scale.
(function(){
  'use strict';
  const ID='character-fixture',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector'),record=V.prop('vinyl-record'),washer=V.product('myllo-rcm');
  const hold=V.action('hold-record'),place=V.action('place-record'),press=V.action('press-pump');

  function chosen(t){
    if(t<2){const s=hold.sample(1,270);s.label='HOLD RECORD';return s;}
    if(t<4){const s=place.sample(.58,270);s.label='PLACE RECORD';return s;}
    const s=press.sample(.62,270);s.label='PRESS CONTROL';return s;
  }

  function drawActor(ctx,s){
    ctx.save();
    ctx.translate(540,920);ctx.scale(1.62,1.62);ctx.translate(-540,-920);
    actor.drawBody(ctx,s.character);
    actor.drawArms(ctx,s.character);
    if(s.label!=='HOLD RECORD')washer.drawBase(ctx,s.machine);
    record.draw(ctx,s.record);
    if(s.label!=='HOLD RECORD')washer.drawOverlay(ctx,s.machine);
    actor.drawHands(ctx,s.character);
    ctx.restore();
  }

  function inset(ctx,x,y,title,type,rot){
    ctx.save();
    ctx.fillStyle=P.gutter;ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;
    ctx.beginPath();ctx.roundRect(x,y,270,210,22);ctx.fill();ctx.stroke();
    ctx.fillStyle=P.ink;ctx.font='800 18px system-ui';ctx.textAlign='left';ctx.fillText(title,x+18,y+28);
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+18,y+43);ctx.lineTo(x+252,y+43);ctx.stroke();
    actor.drawHandState(ctx,{type,at:[x+105,y+119],rot,scale:2.15});
    const h=V.hand(type),ds=h.drawScale*2.15,cx=h.contact[0]*ds,cy=h.contact[1]*ds;
    const cr=Math.cos(rot),sr=Math.sin(rot),px=x+105+cx*cr-cy*sr,py=y+119+cx*sr+cy*cr;
    ctx.fillStyle=P.annBlue;ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=P.inkFaint;ctx.font='500 13px system-ui';ctx.fillText('cyan dot = semantic contact',x+18,y+190);
    ctx.restore();
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn)),s=chosen(t);
    ctx.fillStyle=P.paper;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.stripeCream;ctx.fillRect(0,0,1080,190);
    ctx.fillStyle=P.ink;ctx.font='900 43px system-ui';ctx.textAlign='left';ctx.fillText('CHARACTER FIXTURE',70,91);
    ctx.fillStyle=P.tealDeep;ctx.font='900 22px system-ui';ctx.textAlign='right';ctx.fillText(s.label,1000,91);
    ctx.fillStyle=P.inkSoft;ctx.font='500 18px system-ui';ctx.textAlign='left';ctx.fillText('large-scale component inspection · pose + grip + contact',72,130);

    // silhouette rail
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(120,1325);ctx.lineTo(960,1325);ctx.stroke();
    drawActor(ctx,s);

    inset(ctx,115,1450,'EDGE GRIP','edge',-.18);
    inset(ctx,410,1450,'PALM REST','rest',-.05);
    inset(ctx,705,1450,'INDEX PRESS','press',Math.PI/2);
  }});
})();