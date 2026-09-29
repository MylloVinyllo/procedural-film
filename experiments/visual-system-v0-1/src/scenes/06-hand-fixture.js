// Large hand-state fixture. It exists so hand quality can be reviewed independently from the character and film staging.
(function(){
  'use strict';
  const ID='hand-fixture',V=FILM.visual,P=FILM.lib.pal;
  const actor=V.character('vector');

  function card(ctx,x,y,w,h,title,subtitle){
    ctx.fillStyle=P.gutter;ctx.strokeStyle=P.paperDeep;ctx.lineWidth=2;
    ctx.beginPath();ctx.roundRect(x,y,w,h,28);ctx.fill();ctx.stroke();
    ctx.fillStyle=P.ink;ctx.textAlign='left';ctx.font='900 24px system-ui';ctx.fillText(title,x+28,y+43);
    ctx.fillStyle=P.inkFaint;ctx.font='500 15px system-ui';ctx.fillText(subtitle,x+28,y+70);
    ctx.strokeStyle=P.paperDeep;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+28,y+90);ctx.lineTo(x+w-28,y+90);ctx.stroke();
  }

  function contactDot(ctx,type,wrist,rot,scale,flipY,label){
    const p=V.handContactWorld(type,wrist,rot,scale,flipY);
    ctx.fillStyle=P.annBlue;ctx.beginPath();ctx.arc(p[0],p[1],8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=P.inkFaint;ctx.font='600 13px system-ui';ctx.textAlign='left';ctx.fillText(label,p[0]+13,p[1]+4);
    return p;
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    ctx.fillStyle=P.paper;ctx.fillRect(0,0,1080,1920);
    ctx.fillStyle=P.stripeCream;ctx.fillRect(0,0,1080,186);
    ctx.fillStyle=P.ink;ctx.textAlign='left';ctx.font='900 46px system-ui';ctx.fillText('AUTHORED HAND LIBRARY',70,92);
    ctx.fillStyle=P.inkSoft;ctx.font='500 18px system-ui';ctx.fillText('silhouette · chirality · semantic contact · wrist continuity',72,132);

    const W=452,H=640;
    const cards=[
      [64,240,'EDGE GRIP','record-edge pinch'],
      [564,240,'INDEX PRESS','single extended index'],
      [64,930,'PALM REST','cabinet-edge brace'],
      [564,930,'OPEN / RELEASE','no active contact']
    ];
    for(const c of cards)card(ctx,c[0],c[1],W,H,c[2],c[3]);

    // EDGE: show right and mirrored left as an explicit chirality pair.
    const eR=[175,545],eL=[393,545],es=3.25,er=-.08;
    actor.drawHandState(ctx,{type:'edge',at:eR,rot:er,scale:es});
    actor.drawHandState(ctx,{type:'edge',at:eL,rot:Math.PI-er,scale:es,flipY:true});
    const epR=contactDot(ctx,'edge',eR,er,es,false,'contact');
    const epL=contactDot(ctx,'edge',eL,Math.PI-er,es,true,'contact');
    ctx.strokeStyle=P.vinylEdge;ctx.lineWidth=7;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(epR[0],epR[1]-92);ctx.lineTo(epR[0],epR[1]+92);ctx.stroke();
    ctx.beginPath();ctx.moveTo(epL[0],epL[1]-92);ctx.lineTo(epL[0],epL[1]+92);ctx.stroke();
    ctx.fillStyle=P.inkFaint;ctx.font='700 14px system-ui';ctx.fillText('RIGHT',128,825);ctx.fillText('LEFT / MIRRORED',315,825);

    // PRESS: fingertip contact must be visually obvious.
    const pW=[660,545],ps=3.05,pr=.03;
    actor.drawHandState(ctx,{type:'press',at:pW,rot:pr,scale:ps});
    const pp=contactDot(ctx,'press',pW,pr,ps,false,'fingertip');
    ctx.fillStyle=P.mylloPanel;ctx.strokeStyle=P.mylloPanelInk;ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(pp[0]+16,pp[1],28,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle=P.inkFaint;ctx.font='600 14px system-ui';ctx.fillText('button plane',783,825);

    // REST: palm contact lands on a cabinet edge, not on a floating point.
    const rW=[180,1238],rs=3.3,rr=-.08;
    actor.drawHandState(ctx,{type:'rest',at:rW,rot:rr,scale:rs,flipY:true});
    const rp=contactDot(ctx,'rest',rW,rr,rs,true,'palm contact');
    ctx.strokeStyle=P.mylloEdge;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(100,rp[1]+10);ctx.lineTo(450,rp[1]+10);ctx.stroke();

    // OPEN: explicitly no contact, wrist origin remains visible as a guide.
    const oW=[690,1240],os=3.45,or=-.18;
    actor.drawHandState(ctx,{type:'open',at:oW,rot:or,scale:os});
    ctx.strokeStyle=P.annMagenta;ctx.lineWidth=2;ctx.globalAlpha=.55;
    ctx.beginPath();ctx.moveTo(oW[0]-12,oW[1]);ctx.lineTo(oW[0]+12,oW[1]);ctx.moveTo(oW[0],oW[1]-12);ctx.lineTo(oW[0],oW[1]+12);ctx.stroke();ctx.globalAlpha=1;
    ctx.fillStyle=P.inkFaint;ctx.font='600 14px system-ui';ctx.fillText('wrist origin · contact cleared',638,1518);

    ctx.fillStyle=P.inkFaint;ctx.font='500 15px system-ui';ctx.textAlign='center';
    ctx.fillText('Candidate fixture only. Visual approval is separate from technical PASS.',540,1742);
  }});
})();