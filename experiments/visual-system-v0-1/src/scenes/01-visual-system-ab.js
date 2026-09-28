// Visual System v0.1 proof: the scene knows semantics, not anatomy.
(function(){
  'use strict';
  const ID='visual-system-ab',V=FILM.visual,L=FILM.lib,P=L.pal;
  const chars={left:V.character('pure'),right:V.character('vector')};
  const washer=V.product('myllo-rcm'),record=V.prop('vinyl-record');
  const hold=V.action('hold-record'),place=V.action('place-record'),press=V.action('press-pump');

  function panel(ctx,x,label,sub){
    ctx.save();ctx.fillStyle=P.gutter;ctx.fillRect(x+10,210,520,1490);ctx.strokeStyle=P.comicBorder;ctx.lineWidth=4;ctx.strokeRect(x+10,210,520,1490);
    ctx.fillStyle=P.ink;ctx.font='800 27px system-ui';ctx.textAlign='center';ctx.fillText(label,x+270,270);
    ctx.fillStyle=P.inkFaint;ctx.font='500 20px system-ui';ctx.fillText(sub,x+270,306);ctx.restore();
  }
  function drawState(ctx,backend,state){
    // Canonical occlusion stack: body -> limbs -> product -> manipulated object -> hands.
    // This prevents the old sticker effect where an entire arm or torso randomly covered the prop.
    backend.drawBody(ctx,state.character);
    backend.drawArms(ctx,state.character);
    washer.drawBase(ctx,state.machine);
    record.draw(ctx,state.record);
    washer.drawOverlay(ctx,state.machine);
    backend.drawHands(ctx,state.character);
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const t=Math.max(0,Math.min(info.dur,tIn));
    ctx.fillStyle=P.paperShade;ctx.fillRect(0,0,1080,1920);
    // deliberately identical staging: only character backend differs
    panel(ctx,0,'A · PURE PROCEDURAL','canonical rig + procedural contours');
    panel(ctx,540,'B · COMPILED VECTOR','same rig + authored vector contours');

    let left,right,phase;
    if(t<2){
      phase='01  HOLD';
      left=hold.sample(1,0);right=hold.sample(1,540);
    }else if(t<5){
      phase='02  PLACE';
      const u=(t-2)/3;left=place.sample(u,0);right=place.sample(u,540);
    }else{
      phase='03  PRESS';
      const u=(t-5)/3;left=press.sample(u,0);right=press.sample(u,540);
    }
    drawState(ctx,chars.left,left);drawState(ctx,chars.right,right);

    ctx.save();ctx.fillStyle=P.ink;ctx.font='900 40px system-ui';ctx.textAlign='center';ctx.fillText(phase,540,155);
    ctx.font='600 19px system-ui';ctx.fillStyle=P.inkSoft;ctx.fillText('same semantic action · no scene-level hand geometry',540,183);
    ctx.restore();
  }});
})();