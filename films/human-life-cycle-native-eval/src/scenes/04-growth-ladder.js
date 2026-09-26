// 04 Growth · T 5.5–8.0
// Layers: blueprint base → measurement field → staged human constructions → proportion guides → progress glyph.
(function(){
  'use strict';
  const ID='growth-ladder',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const smooth=(u)=>{u=clamp(u);return u*u*(3-2*u);};

  function line(c,pts,col,w=2,a=1,dash=null){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);
    c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke();c.restore();
  }
  function ell(c,x,y,rx,ry,col,w=2,a=1,rot=0){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);c.stroke();c.restore();
  }
  function prog(c,L,n){
    const P=L.pal,cx=900,cy=300,r=72;
    c.save();c.lineCap='round';
    for(let i=0;i<18;i++){
      c.strokeStyle=i<n?P.lavender:(i===n?P.schemCycle:P.grid);
      c.globalAlpha=i<n?.28:(i===n?1:.22);c.lineWidth=i===n?4:2;
      c.beginPath();c.arc(cx,cy,r,-Math.PI/2+i*TAU/18,-Math.PI/2+(i+.72)*TAU/18);c.stroke();
    } c.restore();
  }

  function field(c,P){
    // Main vertical spine
    line(c,[[195,1320],[195,355]],P.lineWhite,1.6,.62);
    for(let k=0;k<43;k++){
      const y=1320-k*22;
      const long=k%5===0;
      line(c,[[195-(long?32:18),y],[195+(long?32:18),y]],P.lavender,long?1.7:1,.25+(long?.2:0));
    }
    // Horizontal construction baselines
    for(const y of [1260,1110,930,720,520]){
      line(c,[[260,y],[910,y]],P.grid,1,.18,[8,10]);
    }
    // Faint envelopes
    for(const [x,y,rx,ry] of [[420,1130,120,190],[520,930,145,290],[650,760,170,390],[790,680,185,470]]){
      ell(c,x,y,rx,ry,P.lavender,1,.10);
    }
    // Shoulder / pelvis ruler banks
    for(let k=0;k<10;k++){
      const y=430+k*95;
      line(c,[[910,y],[930,y]],P.lavender,1,.16);
    }
  }

  function human(c,P,x,ground,s,alpha,stage,tint){
    c.save();c.globalAlpha=alpha;
    const headH=stage===0?88*s:stage===1?92*s:stage===2?88*s:84*s;
    const headW=headH*.76;
    const bodyH=(stage===0?160:stage===1?300:stage===2?430:500)*s;
    const sh=(stage===0?78:stage===1?110:stage===2?132:150)*s;
    const pel=(stage===0?82:stage===1?88:stage===2?100:112)*s;
    const top=ground-bodyH-headH*.78;
    // cranium + jaw
    ell(c,x,top,headW*.56,headH*.55,tint,2.4,1,-.04);
    line(c,[[x-headW*.4,top+headH*.15],[x-headW*.25,top+headH*.45],[x,top+headH*.56],[x+headW*.3,top+headH*.36]],tint,2.0,1);
    // shoulder and ribcage wedge
    line(c,[[x-sh*.52,top+headH*.62],[x-sh*.34,top+headH*1.4],[x-sh*.28,top+headH*2.3],[x+sh*.28,top+headH*2.3],[x+sh*.34,top+headH*1.4],[x+sh*.52,top+headH*.62]],tint,2.3,1);
    // pelvis
    const py=top+headH*2.35;
    line(c,[[x-pel*.5,py],[x-pel*.35,py+pel*.55],[x+pel*.35,py+pel*.55],[x+pel*.5,py]],tint,2.3,1);
    // arms
    const ay=top+headH*.9,elY=top+headH*1.85,handY=py+30*s;
    line(c,[[x-sh*.45,ay],[x-sh*.67,elY],[x-sh*.5,handY]],tint,2.5,1);
    line(c,[[x+sh*.45,ay],[x+sh*.63,elY],[x+sh*.48,handY]],tint,2.5,1);
    // legs
    const hipY=py+pel*.5;
    const kneeY=ground-(stage===0?28:bodyH*.27);
    line(c,[[x-pel*.24,hipY],[x-pel*.34,kneeY],[x-pel*.30,ground]],tint,2.7,1);
    line(c,[[x+pel*.24,hipY],[x+pel*.30,kneeY],[x+pel*.34,ground]],tint,2.7,1);
    // internal axes
    line(c,[[x,top-headH*.1],[x,ground]],P.lavender,1,.18);
    line(c,[[x-sh*.52,ay],[x+sh*.52,ay]],P.paleBlue,1,.26);
    line(c,[[x-pel*.5,py],[x+pel*.5,py]],P.paleBlue,1,.22);
    // joint ticks
    for(const [jx,jy] of [[x-sh*.67,elY],[x+sh*.63,elY],[x-pel*.34,kneeY],[x+pel*.30,kneeY]]){
      line(c,[[jx-9*s,jy],[jx+9*s,jy]],P.lineWhite,1.2,.42);
    }
    c.restore();
  }

  function stageAlpha(t,start,end){
    const a=smooth((t-start)/.20);
    const b=end==null?1:1-smooth((t-end)/.22);
    return clamp(a*b);
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:4001});field(c,P);
    // Stage appearance: infant → child → adolescent → adult
    const specs=[
      {x:390,g:1280,s:.86,a:stageAlpha(t,0,null),stage:0},
      {x:515,g:1280,s:.84,a:stageAlpha(t,.45,null),stage:1},
      {x:660,g:1280,s:.86,a:stageAlpha(t,.95,null),stage:2},
      {x:790,g:1280,s:.88,a:stageAlpha(t,1.45,null),stage:3},
    ];
    specs.forEach((q,i)=>{
      let a=q.a;
      if(t>2.0 && i!==1)a*=1-smooth((t-2.0)/.35);
      const tint=i===1?P.schemSelf:P.lavender;
      human(c,P,q.x,q.g,q.s,a,q.stage,tint);
      // stage height brackets
      if(a>.03){
        const y0=1280-(i===0?245:i===1?445:i===2?620:735);
        line(c,[[q.x+86,y0],[q.x+112,y0],[q.x+112,1280],[q.x+86,1280]],i===1?P.schemSelf:P.lavender,1.4,a*.55);
      }
    });

    // G2 exact child-head construction appears and becomes dominant late.
    const g=smooth((t-1.9)/.45);
    if(g>0){
      c.save();c.globalAlpha=g;
      c.strokeStyle=P.schemSelf;c.lineWidth=2.8;
      c.beginPath();c.ellipse(540,720,72,92,-.03,0,TAU);c.stroke();
      c.globalAlpha=g*.34;c.lineWidth=1.1;
      c.beginPath();c.ellipse(540,720,58,78,-.03,0,TAU);c.stroke();
      line(c,[[540,812],[540,900]],P.schemSelf,2,g*.7);
      c.restore();
    }
    // motion arrows between developmental stages
    const a=smooth((t-.3)/1.6);
    if(a>0){
      c.save();c.strokeStyle=P.paleBlue;c.globalAlpha=.28*a;c.lineWidth=1.5;c.setLineDash([10,10]);
      c.beginPath();c.moveTo(390,1020);c.bezierCurveTo(470,880,600,760,790,600);c.stroke();c.restore();
    }
    prog(c,L,3);
  }});
})();