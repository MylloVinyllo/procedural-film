// 14 Traces · T 24.0–25.5
// Layers: blueprint base → protagonist contour → incoming trace → memory fragments → forward path → progress glyph.
(function(){
  'use strict';
  const ID='memory-field',TAU=Math.PI*2;
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
  function frag(c,P,type,x,y,s,a,phase){
    c.save();c.translate(x,y);c.scale(s,s);c.rotate(.05*Math.sin(phase));c.globalAlpha=a;c.strokeStyle=P.memoryViolet;c.lineWidth=2.2;c.lineCap='round';c.lineJoin='round';
    if(type===0){ // step arc
      c.beginPath();c.arc(0,0,48,2.5,5.2);c.stroke();line(c,[[-30,42],[5,58],[38,46]],P.memoryViolet,1.5,a);
    } else if(type===1){ // hand curve
      c.beginPath();c.moveTo(-55,20);c.quadraticCurveTo(-10,-35,55,0);c.stroke();for(let k=0;k<4;k++)line(c,[[10+k*10,-5],[28+k*8,18]],P.memoryViolet,1,a*.6);
    } else if(type===2){ // peer cluster
      for(const q of [[-32,-15,11],[12,-28,14],[36,18,9],[-5,28,8]]){c.beginPath();c.arc(q[0],q[1],q[2],0,TAU);c.stroke();}
      line(c,[[-25,-10],[6,-24],[31,14]],P.memoryViolet,1.2,a*.7);
    } else if(type===3){ // table/object
      line(c,[[-60,24],[60,24]],P.memoryViolet,2,a);line(c,[[-45,24],[-50,60]],P.memoryViolet,1.3,a);line(c,[[45,24],[50,60]],P.memoryViolet,1.3,a);
      c.strokeRect(-18,-10,36,27);
    } else { // cycle/seed
      c.beginPath();c.ellipse(0,0,18,32,.3,0,TAU);c.stroke();line(c,[[0,28],[18,55]],P.memoryViolet,1.2,a);
    }
    c.restore();
  }
  const FRAGS=[
    [0,300,540,.85,.10],[1,760,545,.78,.25],[2,270,780,.76,.45],[3,810,830,.75,.68],
    [4,330,1090,.70,.88],[0,735,1120,.62,1.0],[2,185,1010,.55,1.15],[1,890,1000,.58,1.25],
    [3,480,430,.54,1.38],[4,610,430,.50,1.5],[0,170,650,.45,1.65],[2,930,650,.46,1.78]
  ];

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:14001});
    // field guides
    for(const r of [170,300,430]){c.save();c.strokeStyle=P.lavender;c.lineWidth=1;c.globalAlpha=.07;c.beginPath();c.arc(540,800,r,0,TAU);c.stroke();c.restore();}
    line(c,[[150,1260],[930,370]],P.lavender,1,.07,[10,14]);
    // protagonist body/head
    c.save();c.strokeStyle=P.lavender;c.lineWidth=1.5;c.globalAlpha=.32;
    c.beginPath();c.ellipse(540,720,62,76,-.03,0,TAU);c.stroke();
    c.beginPath();c.moveTo(470,790);c.quadraticCurveTo(540,760,610,790);c.lineTo(640,1080);c.quadraticCurveTo(540,1120,440,1080);c.closePath();c.stroke();c.restore();
    c.save();c.fillStyle=P.navyLight;c.strokeStyle=P.schemSelf;c.lineWidth=2.5;c.beginPath();c.arc(540,890,24,0,TAU);c.fill();c.stroke();c.restore();

    // incoming memory trace from previous scene
    const inc=clamp(t/.28);
    c.save();c.strokeStyle=P.memoryViolet;c.lineWidth=6;c.globalAlpha=.75;c.beginPath();c.moveTo(560,1420);c.bezierCurveTo(590,1220,610,1030,545,925);c.stroke();c.restore();

    FRAGS.forEach((f,i)=>{
      const start=.18+(i%4)*.14+Math.floor(i/4)*.20;
      const p=clamp((t-start)/.22);
      if(p<=0)return;
      const drift=clamp((t-1.08)/.35);
      frag(c,P,f[0],f[1]+20*drift,f[2],f[3],(.18+.54*p)*(1-.20*drift),f[4]+t);
    });

    // forward warm path persists while memories recede
    const out=clamp((t-1.05)/.38);
    if(out>0){
      c.save();c.strokeStyle=P.schemSelf;c.lineWidth=3.5;c.globalAlpha=.9*out;c.setLineDash([14,10]);
      c.beginPath();c.moveTo(540,910);c.quadraticCurveTo(650,1010,770,1120);c.quadraticCurveTo(840,1180,900,1140);c.stroke();c.restore();
    }
    progressGlyph(c,L,13);
  }});
})();