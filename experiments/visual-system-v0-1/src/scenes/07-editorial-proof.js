// Clean production-look proof. No diagnostic overlays: only reusable components in editorial composition.
(function(){
  'use strict';
  const ID='editorial-proof',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector'),washer=V.product('myllo-rcm'),record=V.prop('vinyl-record');
  const hold=V.action('hold-record'),place=V.action('place-record'),press=V.action('press-pump');

  function layered(ctx,s,showMachine=true){
    actor.drawBody(ctx,s.character);
    actor.drawArms(ctx,s.character,'back');
    if(showMachine)washer.drawBase(ctx,s.machine);
    record.draw(ctx,s.record);
    if(showMachine)washer.drawOverlay(ctx,s.machine);
    actor.drawArms(ctx,s.character,'front');
    actor.drawHands(ctx,s.character);
  }

  function background(ctx){
    ctx.fillStyle=P.paper;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.stripeCream;ctx.fillRect(0,0,1080,230);
    ctx.fillStyle=P.teal;ctx.fillRect(0,226,1080,4);
    ctx.fillStyle=P.ink;ctx.textAlign='left';ctx.font='900 40px system-ui';ctx.fillText('MYLLO VINYLLO',70,95);
    ctx.fillStyle=P.inkSoft;ctx.font='600 18px system-ui';ctx.fillText('record care · authored 2D motion proof',72,132);
  }

  function stage(ctx,mode){
    ctx.save();ctx.globalAlpha=.10;ctx.fillStyle=P.ink;
    const y=mode==='hold'?1370:1450;
    ctx.beginPath();ctx.ellipse(540,y,310,34,0,0,Math.PI*2);ctx.fill();ctx.restore();
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn));background(ctx);

    if(t<2){
      const s=hold.sample(1,270);
      stage(ctx,'hold');
      ctx.save();ctx.translate(540,900);ctx.scale(1.58,1.58);ctx.translate(-540,-900);
      layered(ctx,s,false);ctx.restore();

      ctx.fillStyle=P.tealDeep;ctx.font='900 24px system-ui';ctx.textAlign='center';ctx.fillText('HOLD BY THE EDGE',540,1595);
      ctx.fillStyle=P.inkFaint;ctx.font='500 17px system-ui';ctx.fillText('contact stays off the playing surface',540,1630);
      return;
    }

    if(t<4.6){
      const u=(t-2)/2.6,s=place.sample(u,270);
      stage(ctx,'machine');
      ctx.save();ctx.translate(540,945);ctx.scale(1.30,1.30);ctx.translate(-540,-945);
      layered(ctx,s,true);ctx.restore();

      ctx.fillStyle=P.tealDeep;ctx.font='900 24px system-ui';ctx.textAlign='center';ctx.fillText('PLACE · ALIGN · SEAT',540,1595);
      ctx.fillStyle=P.inkFaint;ctx.font='500 17px system-ui';ctx.fillText('one continuous anchored motion',540,1630);
      return;
    }

    const u=(t-4.6)/1.9,s=press.sample(u,270);
    stage(ctx,'machine');
    ctx.save();ctx.translate(540,960);ctx.scale(1.18,1.18);ctx.translate(-540,-960);
    layered(ctx,s,true);ctx.restore();

    ctx.fillStyle=P.cleanGold;ctx.font='900 24px system-ui';ctx.textAlign='center';ctx.fillText('PUMP',540,1595);
    ctx.fillStyle=P.inkFaint;ctx.font='500 17px system-ui';ctx.fillText('fingertip contact owns the control action',540,1630);
  }});
})();