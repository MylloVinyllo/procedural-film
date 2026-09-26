// 18 Again · T 30.5–32.0
// Layers: blueprint base → G1/founding core → whole-film memory fragments → progress glyph → wordmark.
(function(){
  'use strict';
  const ID='seed-loop',TAU=Math.PI*2;
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
  function fragment(c,P,type,a,rot,r){
    const x=540+Math.cos(rot)*r,y=700+Math.sin(rot)*r*.85;
    c.save();c.translate(x,y);c.rotate(rot+.4);c.globalAlpha=a;c.strokeStyle=P.memoryViolet;c.lineWidth=1.6;c.lineCap='round';
    if(type===0){c.beginPath();c.arc(0,0,42,2.5,5.2);c.stroke();line(c,[[-25,34],[0,48],[28,36]],P.memoryViolet,1.1,a);}
    else if(type===1){c.beginPath();c.moveTo(-42,15);c.quadraticCurveTo(-8,-28,45,2);c.stroke();for(let k=0;k<3;k++)line(c,[[8+k*9,-3],[24+k*7,15]],P.memoryViolet,1,a*.65);}
    else if(type===2){for(const q of [[-22,-8,9],[8,-18,12],[25,12,8],[-5,22,7]]){c.beginPath();c.arc(q[0],q[1],q[2],0,TAU);c.stroke();}line(c,[[-18,-5],[5,-15],[21,9]],P.memoryViolet,1,a*.6);}
    else if(type===3){line(c,[[-45,18],[45,18]],P.memoryViolet,1.7,a);line(c,[[-34,18],[-38,47]],P.memoryViolet,1,a);line(c,[[34,18],[38,47]],P.memoryViolet,1,a);c.strokeRect(-13,-6,26,20);}
    else {c.beginPath();c.ellipse(0,0,15,26,.25,0,TAU);c.stroke();line(c,[[0,23],[16,45]],P.memoryViolet,1,a);}
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:18001});

    // structural guide field
    for(const r of [184,280,390]){c.save();c.strokeStyle=P.lavender;c.lineWidth=1;c.globalAlpha=.08;c.beginPath();c.arc(540,700,r,0,TAU);c.stroke();c.restore();}
    line(c,[[190,350],[890,1050]],P.lavender,1,.06,[10,14]);
    line(c,[[205,1080],[875,360]],P.lavender,1,.05,[10,14]);
    for(let k=0;k<24;k++){
      const a=k*TAU/24,r0=405,r1=k%3===0?430:418;
      line(c,[[540+Math.cos(a)*r0,700+Math.sin(a)*r0],[540+Math.cos(a)*r1,700+Math.sin(a)*r1]],P.lavender,1,k%3===0?.25:.12);
    }

    // G1 arrives already complete from shot 17
    c.save();c.strokeStyle=P.schemCycle;c.lineWidth=3;c.globalAlpha=.9;c.beginPath();c.arc(540,700,150,0,TAU);c.stroke();
    c.globalAlpha=.24;c.lineWidth=1.2;c.beginPath();c.arc(540,700,184,0,TAU);c.stroke();c.restore();

    // central founding core
    const core=clamp((t-.15)/.22);
    if(core>0){
      c.save();c.globalAlpha=core;c.fillStyle=P.glow;c.strokeStyle=P.schemCycle;c.lineWidth=2.5;c.shadowColor=P.glow;c.shadowBlur=20;
      c.beginPath();c.arc(540,700,24,0,TAU);c.fill();c.stroke();c.restore();
      for(let k=0;k<12;k++){const a=k*TAU/12;line(c,[[540+Math.cos(a)*38,700+Math.sin(a)*38],[540+Math.cos(a)*55,700+Math.sin(a)*55]],P.lineWhite,1.2,.58*core);}
    }

    // whole-film fragments orbit and settle
    const settle=clamp((t-.80)/.45);
    for(let i=0;i<20;i++){
      const type=i%5,base=i*TAU/20+.2*Math.sin(i*1.9),rot=base+(1-settle)*.22*Math.sin(t*1.5+i);
      const r=240+(i%4)*45-25*settle;
      const a=(.12+(i%3)*.05)*(1-.30*settle);
      fragment(c,P,type,a,rot,r);
    }

    // division flash and two daughter cores
    const div=clamp((t-.72)/.18);
    if(div>0){
      c.save();c.strokeStyle=P.magenta;c.lineWidth=3;c.globalAlpha=(1-div)*.9;c.beginPath();c.arc(540,700,80+80*div,0,TAU);c.stroke();c.restore();
      const sep=38*div;
      for(const sx of [-sep,sep]){
        c.save();c.fillStyle=P.glow;c.strokeStyle=P.schemSelf;c.lineWidth=1.8;c.globalAlpha=.9;c.beginPath();c.arc(540+sx,700,14,0,TAU);c.fill();c.stroke();c.restore();
      }
    }

    progressGlyph(c,L,17);

    // Closing wordmark, only text in schematic language.
    const kWord=clamp((t-1.08)/.28);
    if(kWord>0){
      L.text(c,'human',540+0.06*44,1470,{size:44,weight:300,tracking:'0.12em',color:P.lavender,alpha:.85*kWord,align:'center'});
    }

    // final clean G1 hold for the loop
    const hold=clamp((t-1.25)/.20);
    if(hold>0){
      c.save();c.strokeStyle=P.schemCycle;c.lineWidth=3;c.globalAlpha=.9;c.beginPath();c.arc(540,700,150,0,TAU);c.stroke();c.restore();
    }
  }});
})();