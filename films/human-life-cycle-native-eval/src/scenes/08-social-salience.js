// 08 Peers · T 13.5–14.5
// Layers: blueprint base → protagonist torso → peer clusters → attention arc → progress glyph.
(function(){
  'use strict';
  const ID='social-salience',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  function progressGlyph(ctx,L,n){
    const P=L.pal;
    const cx=900,cy=300,r=72;
    ctx.save();
    ctx.lineCap='round';
    for(let i=0;i<18;i++){
      const a0=-Math.PI/2+i*TAU/18;
      const a1=-Math.PI/2+(i+0.72)*TAU/18;
      ctx.strokeStyle=i<n?P.lavender:(i===n?P.schemCycle:P.grid);
      ctx.globalAlpha=i<n?0.28:(i===n?1:0.22);
      ctx.lineWidth=i===n?4:2;
      ctx.beginPath();ctx.arc(cx,cy,r,a0,a1);ctx.stroke();
    }
    ctx.restore();
  }
  function line(c,pts,col,w=2,a=1,dash=null){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);
    c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke();c.restore();
  }
  function n(c,P,x,y,r,a,hot=false){
    c.save();c.globalAlpha=a;c.fillStyle=hot?P.glow:P.navyLight;c.strokeStyle=hot?P.schemSocial:P.lavender;c.lineWidth=hot?2.2:1.3;
    c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();c.restore();
  }
  function protagonist(c,P){
    c.save();c.globalAlpha=.68;c.strokeStyle=P.lavender;c.lineWidth=1.5;
    c.beginPath();c.moveTo(465,680);c.quadraticCurveTo(540,640,615,680);c.lineTo(650,1030);c.quadraticCurveTo(540,1080,430,1030);c.closePath();c.stroke();
    c.globalAlpha=.20;c.beginPath();c.moveTo(540,650);c.lineTo(540,1080);c.stroke();c.restore();
    // G3 exact
    c.save();c.strokeStyle=P.schemSelf;c.fillStyle=P.navyLight;c.lineWidth=3;c.beginPath();c.arc(540,820,48,0,TAU);c.fill();c.stroke();
    c.globalAlpha=.35;c.lineWidth=1.2;c.beginPath();c.arc(540,820,34,0,TAU);c.stroke();c.restore();
  }
  const clusters=[
    {nodes:[[320,670,24],[375,720,18]],edges:[[0,1]],delay:.12},
    {nodes:[[755,630,18],[820,700,26],[740,760,15]],edges:[[0,1],[1,2],[0,2]],delay:.28},
    {nodes:[[290,1040,20]],edges:[],delay:.42}
  ];
  function peers(c,P,t){
    clusters.forEach((cl,ci)=>{
      const p=clamp((t-cl.delay)/.22);if(p<=0)return;
      cl.edges.forEach((e,ei)=>{
        const a=cl.nodes[e[0]],b=cl.nodes[e[1]];
        c.save();c.strokeStyle=P.schemSocial;c.lineWidth=1.3+ei*.4;c.globalAlpha=.28*p;
        c.beginPath();c.moveTo(a[0],a[1]);c.quadraticCurveTo((a[0]+b[0])/2+10*Math.sin(ci+ei),(a[1]+b[1])/2-14,b[0],b[1]);c.stroke();c.restore();
      });
      cl.nodes.forEach((q,i)=>n(c,P,q[0],q[1],q[2],(.45+i*.08)*p,i===0&&ci===0));
      // connect cluster toward protagonist with varying strength
      const anchor=cl.nodes[0],strong=ci===0;
      c.save();c.strokeStyle=strong?P.schemSocial:P.lavender;c.lineWidth=strong?3:1.3;c.globalAlpha=(strong?.74:.22)*p;
      c.beginPath();c.moveTo(540,820);c.quadraticCurveTo((540+anchor[0])/2,720+ci*80,anchor[0],anchor[1]);c.stroke();c.restore();
    });
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:8001});
    // guide geometry
    for(const r of [120,230,340]){c.save();c.globalAlpha=.09;c.strokeStyle=P.lavender;c.lineWidth=1;c.beginPath();c.arc(540,820,r,0,TAU);c.stroke();c.restore();}
    line(c,[[190,520],[900,1110]],P.lavender,1,.08,[8,13]);
    protagonist(c,P);peers(c,P,t);
    // attention arc rotates toward peer field
    const u=clamp((t-.45)/.38);
    if(u>0){
      c.save();c.strokeStyle=P.magenta;c.lineWidth=3;c.globalAlpha=.85;
      const a0=-2.6+(1.1*u),a1=a0+1.05;c.beginPath();c.arc(540,820,112,a0,a1);c.stroke();
      for(let k=0;k<5;k++){const a=a0+k*(a1-a0)/4;line(c,[[540+Math.cos(a)*120,820+Math.sin(a)*120],[540+Math.cos(a)*137,820+Math.sin(a)*137]],P.magenta,1.2,.55);}
      c.restore();
    }
    progressGlyph(c,L,7);
  }});
})();