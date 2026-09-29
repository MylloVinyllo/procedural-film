// Large sequential hand-state fixture. One state per second so silhouette quality can be judged at useful scale.
(function(){
  'use strict';
  const ID='hand-fixture',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector');

  function header(ctx,title,subtitle,index){
    ctx.fillStyle=P.paper;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.stripeCream;ctx.fillRect(0,0,1080,190);
    ctx.fillStyle=P.ink;ctx.textAlign='left';ctx.font='900 46px system-ui';ctx.fillText('AUTHORED HAND LIBRARY',70,92);
    ctx.fillStyle=P.inkSoft;ctx.font='500 18px system-ui';ctx.fillText('silhouette · chirality · semantic contact · wrist continuity',72,132);

    ctx.fillStyle=P.tealDeep;ctx.font='900 28px system-ui';ctx.fillText(title,72,282);
    ctx.fillStyle=P.inkFaint;ctx.font='500 18px system-ui';ctx.fillText(subtitle,72,319);

    ctx.textAlign='right';ctx.font='900 18px system-ui';ctx.fillStyle=P.inkFaint;ctx.fillText('0'+index+' / 04',1006,286);
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(72,350);ctx.lineTo(1008,350);ctx.stroke();
  }

  function contactDot(ctx,type,wrist,rot,scale,flipY,label){
    const p=V.handContactWorld(type,wrist,rot,scale,flipY);
    ctx.fillStyle=P.annBlue;ctx.beginPath();ctx.arc(p[0],p[1],10,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=P.inkFaint;ctx.font='700 16px system-ui';ctx.textAlign='left';ctx.fillText(label,p[0]+16,p[1]+5);
    return p;
  }

  function wristGuide(ctx,p){
    ctx.save();ctx.strokeStyle=P.annMagenta;ctx.lineWidth=2;ctx.globalAlpha=.55;
    ctx.beginPath();ctx.moveTo(p[0]-14,p[1]);ctx.lineTo(p[0]+14,p[1]);ctx.moveTo(p[0],p[1]-14);ctx.lineTo(p[0],p[1]+14);ctx.stroke();
    ctx.restore();
  }

  function footer(ctx,text){
    ctx.fillStyle=P.inkFaint;ctx.font='500 16px system-ui';ctx.textAlign='center';ctx.fillText(text,540,1710);
    ctx.fillText('Candidate fixture only. Visual approval remains separate from technical PASS.',540,1750);
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur-.001,tIn)),phase=Math.min(3,Math.floor(t));

    if(phase===0){
      header(ctx,'EDGE GRIP','thumb in front · finger group behind record edge · mirrored chirality',1);
      const scale=4.35,rot=-.06;
      const left=[300,880],right=[780,880];
      actor.drawHandState(ctx,{type:'edge',at:left,rot,scale});
      actor.drawHandState(ctx,{type:'edge',at:right,rot:Math.PI-rot,scale,flipY:true});
      const lp=contactDot(ctx,'edge',left,rot,scale,false,'contact');
      const rp=contactDot(ctx,'edge',right,Math.PI-rot,scale,true,'contact');
      ctx.strokeStyle=P.vinylEdge;ctx.lineWidth=11;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(lp[0],lp[1]-170);ctx.lineTo(lp[0],lp[1]+170);ctx.stroke();
      ctx.beginPath();ctx.moveTo(rp[0],rp[1]-170);ctx.lineTo(rp[0],rp[1]+170);ctx.stroke();
      ctx.fillStyle=P.ink;ctx.font='800 17px system-ui';ctx.textAlign='center';ctx.fillText('RIGHT',300,1330);ctx.fillText('LEFT / MIRRORED',780,1330);
      footer(ctx,'Check: compact palm, readable thumb, grouped fingers, no mitten silhouette.');
      return;
    }

    if(phase===1){
      header(ctx,'INDEX PRESS','one unmistakable index finger · curled remaining fingers · fingertip owns contact',2);
      const scale=4.55,rot=.02,wrist=[330,900];
      actor.drawHandState(ctx,{type:'press',at:wrist,rot,scale});
      const p=contactDot(ctx,'press',wrist,rot,scale,false,'fingertip contact');
      ctx.fillStyle=P.mylloPanel;ctx.strokeStyle=P.mylloPanelInk;ctx.lineWidth=5;
      ctx.beginPath();ctx.arc(p[0]+20,p[1],42,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p[0]+62,p[1]-180);ctx.lineTo(p[0]+62,p[1]+180);ctx.stroke();
      ctx.fillStyle=P.inkFaint;ctx.font='600 16px system-ui';ctx.fillText('button / panel plane',p[0]+80,p[1]+205);
      footer(ctx,'Check: index extension stays distinct from the palm and never reads as a bar glued to the wrist.');
      return;
    }

    if(phase===2){
      header(ctx,'PALM REST','broad support contact on cabinet edge · folded fingers · no edge-grip confusion',3);
      const scale=4.65,rot=-.08,wrist=[310,900];
      actor.drawHandState(ctx,{type:'rest',at:wrist,rot,scale,flipY:true});
      const p=contactDot(ctx,'rest',wrist,rot,scale,true,'palm contact');
      ctx.strokeStyle=P.mylloEdge;ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(130,p[1]+16);ctx.lineTo(930,p[1]+16);ctx.stroke();
      ctx.fillStyle=P.inkFaint;ctx.font='600 16px system-ui';ctx.fillText('cabinet edge',770,p[1]+55);
      footer(ctx,'Check: support hand feels planted and stable, with no floating contact.');
      return;
    }

    header(ctx,'OPEN / RELEASE','relaxed post-contact hand · no active anchor · readable wrist continuity',4);
    const scale=4.8,rot=-.16,wrist=[360,910];
    actor.drawHandState(ctx,{type:'open',at:wrist,rot,scale});
    wristGuide(ctx,wrist);
    ctx.fillStyle=P.inkFaint;ctx.font='700 16px system-ui';ctx.textAlign='left';ctx.fillText('wrist origin',wrist[0]+22,wrist[1]+5);
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(150,1290);ctx.lineTo(930,1290);ctx.stroke();
    footer(ctx,'Check: fingers relax after release instead of becoming a starburst or claw.');
  }});
})();