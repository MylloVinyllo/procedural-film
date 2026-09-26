// 16 Across generations · T 27.5–29.0
// Layers: blueprint base → three generation silhouettes → recurring memory geometry → transfer spiral/G4 → progress glyph.
(function(){
  'use strict';
  const ID='generation-spiral',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  function progressGlyph(ctx,L,n){
    const P=L.pal,cx=900,cy=300,r=72;
    ctx.save();ctx.lineCap='round';
    for(let i=0;i<18;i++){
      const a0=-Math.PI/2+i*TAU/18,a1=-Math.PI/2+(i+.72)*TAU/18;
      ctx.strokeStyle=i<n?P.lavender:(i===n?P.schemCycle:P.grid);
      ctx.globalAlpha=i<n?.28:(i===n?1:.22);ctx.lineWidth=i===n?4:2;
      ctx.beginPath();ctx.arc(cx,cy,r,a0,a1);ctx.stroke();
    }ctx.restore();
  }
  function line(c,p,col,w=2,a=1,dash=null){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);
    c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();
  }
  function figure(c,P,x,y,s,a,col,age){
    c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=a;c.strokeStyle=col;c.lineWidth=2.0/s;c.lineCap='round';c.lineJoin='round';
    const lean=age===0?.08:age===2?-.03:0;
    c.rotate(lean);
    c.beginPath();c.ellipse(0,-230,42,52,-.03,0,TAU);c.stroke();
    c.beginPath();c.moveTo(-36,-225);c.quadraticCurveTo(-22,-184,0,-170);c.quadraticCurveTo(28,-184,38,-226);c.stroke();
    // torso/pelvis
    c.beginPath();c.moveTo(-70,-150);c.quadraticCurveTo(0,-180,70,-150);c.lineTo(58,10);c.quadraticCurveTo(0,35,-58,10);c.closePath();c.stroke();
    c.beginPath();c.moveTo(-55,10);c.lineTo(-42,70);c.lineTo(42,70);c.lineTo(55,10);c.stroke();
    // arms, hand direction toward centre
    const side=x<540?1:-1;
    c.beginPath();c.moveTo(side*58,-120);c.lineTo(side*110,-40);c.lineTo(side*150,15);c.stroke();
    c.beginPath();c.moveTo(-side*58,-120);c.lineTo(-side*92,-20);c.lineTo(-side*75,50);c.stroke();
    // legs
    c.beginPath();c.moveTo(-28,70);c.lineTo(-45,180);c.lineTo(-55,310);c.stroke();
    c.beginPath();c.moveTo(28,70);c.lineTo(42,180);c.lineTo(55,310);c.stroke();
    // hands
    c.beginPath();c.arc(side*153,18,12,0,TAU);c.stroke();
    c.beginPath();c.arc(-side*75,52,10,0,TAU);c.stroke();
    // construction axes
    c.globalAlpha=a*.25;c.lineWidth=1/s;c.beginPath();c.moveTo(0,-290);c.lineTo(0,325);c.stroke();c.beginPath();c.moveTo(-80,-145);c.lineTo(80,-145);c.stroke();
    c.restore();
  }
  function spiralPoint(u){
    const a=-Math.PI*.15+u*TAU*2.25;
    const r=220*(1-u)+50;
    return [540+Math.cos(a)*r,850+Math.sin(a)*r*.82];
  }
  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:16001});
    // guides
    for(const r of [140,240,350]){c.save();c.strokeStyle=P.lavender;c.globalAlpha=.07;c.lineWidth=1;c.beginPath();c.arc(540,850,r,0,TAU);c.stroke();c.restore();}
    line(c,[[180,520],[900,1220]],P.lavender,1,.06,[9,14]);
    line(c,[[200,1190],[880,510]],P.lavender,1,.06,[9,14]);
    // recurring geometry echoes
    c.save();c.strokeStyle=P.memoryViolet;c.globalAlpha=.22;c.lineWidth=1.5;
    c.beginPath();c.arc(245,515,70,2.5,5.2);c.stroke(); // step
    c.beginPath();c.moveTo(790,500);c.quadraticCurveTo(840,455,900,505);c.stroke(); // hand
    c.beginPath();c.arc(240,1150,38,0,TAU);c.stroke(); // cell/halo
    c.restore();

    const aOld=1, aMid=clamp((t-.20)/.22), aYoung=clamp((t-.45)/.22);
    figure(c,P,320,940,.90,aOld,P.lavender,0);
    figure(c,P,690,930,.78,aMid,P.paleBlue,1);
    figure(c,P,540,1245,.58,aYoung,P.schemSocial,2);

    // spiral path appears after all generations are present
    const draw=clamp((t-.55)/.55);
    if(draw>0){
      c.save();c.strokeStyle=P.schemCycle;c.lineWidth=3;c.globalAlpha=.74;
      c.beginPath();
      const p0=spiralPoint(0);c.moveTo(p0[0],p0[1]);
      for(let k=1;k<=80;k++){
        const u=(k/80)*draw,p=spiralPoint(u);c.lineTo(p[0],p[1]);
      }
      c.stroke();c.restore();
      // guide ticks along spiral
      for(let k=0;k<18;k++){
        const u=(k/17)*draw;if(u<=0)continue;
        const p=spiralPoint(u),p2=spiralPoint(Math.min(1,u+.01));
        const dx=p2[0]-p[0],dy=p2[1]-p[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;
        line(c,[[p[0]-nx*6,p[1]-ny*6],[p[0]+nx*6,p[1]+ny*6]],P.lavender,1,.30);
      }
    }

    // G4 transfer point travels old → middle → child
    let u=0;
    if(t<.75)u=clamp((t-.50)/.25)*.45;
    else u=.45+clamp((t-.75)/.55)*.55;
    const gp=spiralPoint(u);
    c.save();c.fillStyle=P.glow;c.strokeStyle=P.schemCycle;c.lineWidth=3;c.shadowColor=P.glow;c.shadowBlur=16;c.beginPath();c.arc(gp[0],gp[1],18,0,TAU);c.fill();c.stroke();c.restore();

    // final screen-fixed G4 appears at canonical point and surroundings dim
    const lock=clamp((t-1.18)/.25);
    if(lock>0){
      c.save();c.globalAlpha=.25+lock*.75;c.fillStyle=P.glow;c.strokeStyle=P.schemCycle;c.lineWidth=3;c.beginPath();c.arc(540,920,18,0,TAU);c.fill();c.stroke();c.restore();
    }
    progressGlyph(c,L,15);
  }});
})();