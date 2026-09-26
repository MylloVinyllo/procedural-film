// 06 Learning · T 10.0–11.5
// Layers: blueprint base → head/shoulder construction → far network → near network → exit branch → progress glyph.
(function(){
  'use strict';
  const ID='learning-network',TAU=Math.PI*2;
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
  function node(c,P,x,y,r,a,hot){
    c.save();c.globalAlpha=a;
    c.fillStyle=hot?P.glow:P.navyLight;c.strokeStyle=hot?P.schemSelf:P.lavender;c.lineWidth=hot?2.2:1.2;
    c.shadowColor=hot?P.glow:'transparent';c.shadowBlur=hot?12:0;
    c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();c.restore();
  }
  function head(c,P){
    c.save();c.strokeStyle=P.schemSelf;c.lineWidth=2.6;c.globalAlpha=.9;
    // G2 cranium invariant
    c.beginPath();c.ellipse(540,720,72,92,-.03,0,TAU);c.stroke();
    // jaw, ear, neck, shoulders
    c.beginPath();c.moveTo(482,728);c.quadraticCurveTo(494,790,540,812);c.quadraticCurveTo(587,794,601,742);c.stroke();
    c.beginPath();c.ellipse(602,735,9,18,.05,0,TAU);c.stroke();
    c.beginPath();c.moveTo(511,805);c.lineTo(507,870);c.moveTo(573,805);c.lineTo(579,870);c.stroke();
    c.beginPath();c.moveTo(507,870);c.quadraticCurveTo(440,885,400,940);c.moveTo(579,870);c.quadraticCurveTo(650,886,697,942);c.stroke();
    // inner double line
    c.globalAlpha=.35;c.lineWidth=1.2;
    c.beginPath();c.ellipse(540,720,61,81,-.03,0,TAU);c.stroke();
    c.restore();
  }
  function guides(c,P){
    c.save();c.strokeStyle=P.lavender;c.globalAlpha=.12;c.lineWidth=1.1;
    for(const r of [120,180,250]){c.beginPath();c.arc(540,720,r,0,TAU);c.stroke();}
    line(c,[[250,480],[830,980]],P.lavender,1,.12,[8,12]);
    line(c,[[270,950],[815,500]],P.lavender,1,.09,[8,14]);
    for(let x=300;x<800;x+=50)line(c,[[x,1010],[x+22,1010]],P.lineWhite,1,.14);
    c.restore();
  }
  const NODES=[
    [506,654,7],[542,640,8],[578,661,6],[490,698,5],[528,704,9],[566,708,6],[592,724,5],
    [500,748,7],[538,754,8],[574,766,5],[518,790,5],[557,790,6],[474,676,4],[606,688,4],
    [475,725,4],[610,751,4],[520,680,4],[558,682,4]
  ];
  const EDGES=[
    [0,1],[1,2],[0,3],[3,4],[4,5],[5,6],[3,7],[7,8],[8,9],[7,10],[10,11],[4,8],[5,8],
    [12,0],[2,13],[14,3],[6,15],[16,0],[16,4],[17,2],[17,5],[1,4],[4,7],[5,9],[8,11],
    [0,4],[2,5],[3,8],[5,10],[6,9],[10,8],[11,9]
  ];
  function network(c,P,t){
    // far wave
    const p1=clamp((t-.20)/.35),p2=clamp((t-.48)/.35),p3=clamp((t-.78)/.32);
    c.save();c.lineCap='round';
    EDGES.forEach((e,i)=>{
      const phase=i<11?p1:i<22?p2:p3;
      if(phase<=0)return;
      const a=NODES[e[0]],b=NODES[e[1]];
      const hot=(i%7===0&&t>1.0);
      c.strokeStyle=hot?P.schemSelf:(i%3?P.lavender:P.paleBlue);
      c.globalAlpha=(hot?.86:.30)*phase;
      c.lineWidth=hot?2.6:(i%4===0?1.8:1.1);
      c.beginPath();c.moveTo(a[0],a[1]);
      c.quadraticCurveTo((a[0]+b[0])/2+Math.sin(i*1.7)*20,(a[1]+b[1])/2+Math.cos(i*.9)*15,b[0],b[1]);
      c.stroke();
    });
    c.restore();
    NODES.forEach((n,i)=>{
      const phase=i<7?p1:i<13?p2:p3;
      const pulse=(i===4||i===8||i===11)&&t>1.0;
      node(c,P,n[0],n[1],n[2],phase*(pulse?1:.65),pulse);
    });
    // pruning: two branches dim late
    if(t>1.02){
      const q=clamp((t-1.02)/.28);
      c.save();c.strokeStyle=P.magenta;c.lineWidth=2;c.globalAlpha=.45*(1-q);
      c.beginPath();c.moveTo(475,725);c.quadraticCurveTo(455,760,440,800);c.stroke();
      c.beginPath();c.moveTo(606,688);c.quadraticCurveTo(640,665,670,640);c.stroke();c.restore();
    }
    // exit branch to shoulder / next scene
    const ex=clamp((t-1.18)/.25);
    if(ex>0){
      c.save();c.strokeStyle=P.schemSelf;c.lineWidth=3;c.globalAlpha=.9;
      c.beginPath();c.moveTo(574,766);c.quadraticCurveTo(640,815,720,875);c.quadraticCurveTo(790,920,845,905);c.stroke();
      c.restore();
    }
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:6001});
    const up=clamp(t/.28),down=clamp((t-1.08)/.30);
    const eu=up*up*(3-2*up),ed=down*down*(3-2*down),z=1+1.35*eu*(1-ed);
    c.save();c.translate(540,720);c.scale(z,z);c.translate(-540,-720);
    guides(c,P);head(c,P);network(c,P,t);
    c.restore();
    progressGlyph(c,L,5);
  }});
})();