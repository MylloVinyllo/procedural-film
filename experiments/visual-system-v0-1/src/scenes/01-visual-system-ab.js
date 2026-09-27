// Visual System v0.1 proof: the scene knows semantics, not anatomy.
(function(){
  'use strict';
  const ID='visual-system-ab',V=FILM.visual,L=FILM.lib,P=L.pal;
  const chars={left:V.character('pure'),right:V.character('vector')};
  const washer=V.product('myllo-rcm'),record=V.prop('vinyl-record');
  const place=V.action('place-record'),press=V.action('press-pump');

  function panel(ctx,x,label,sub){
    ctx.save();ctx.fillStyle='#f1ead9';ctx.fillRect(x+10,210,520,1490);ctx.strokeStyle='#2a2520';ctx.lineWidth=4;ctx.strokeRect(x+10,210,520,1490);
    ctx.fillStyle='#25272b';ctx.font='800 27px system-ui';ctx.textAlign='center';ctx.fillText(label,x+270,270);
    ctx.fillStyle='#6b6257';ctx.font='500 20px system-ui';ctx.fillText(sub,x+270,306);ctx.restore();
  }
  function drawState(ctx,backend,state){
    washer.draw(ctx,state.machine);
    record.draw(ctx,state.record);
    backend.draw(ctx,state.character);
  }
  function staticHold(panelX){
    const machine={x:panelX+270,y:1240,scale:.78},recState={x:panelX+270,y:850,r:108},a=record.anchors(recState);
    return {machine,record:recState,character:{root:[panelX+270,720],scale:.92,leftWrist:a.edge(Math.PI*.92),rightWrist:a.edge(Math.PI*.08),leftHand:'edge',rightHand:'edge'}};
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn));
    ctx.fillStyle='#ded3bd';ctx.fillRect(0,0,1080,1920);
    // deliberately identical staging: only character backend differs
    panel(ctx,0,'A · PURE PROCEDURAL','canonical rig + procedural contours');
    panel(ctx,540,'B · COMPILED VECTOR','same rig + authored vector contours');

    let left,right,phase;
    if(t<2){
      phase='01  HOLD';
      left=staticHold(0);right=staticHold(540);
    }else if(t<5){
      phase='02  PLACE';
      const u=(t-2)/3;left=place.sample(u,0);right=place.sample(u,540);
    }else{
      phase='03  PRESS';
      const u=(t-5)/3;left=press.sample(u,0);right=press.sample(u,540);
    }
    drawState(ctx,chars.left,left);drawState(ctx,chars.right,right);

    ctx.save();ctx.fillStyle='#24272b';ctx.font='900 40px system-ui';ctx.textAlign='center';ctx.fillText(phase,540,155);
    ctx.font='600 19px system-ui';ctx.fillStyle='#62584e';ctx.fillText('same semantic action · no scene-level hand geometry',540,183);
    ctx.restore();
  }});
})();