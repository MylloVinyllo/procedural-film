// 14 · Traces · T 24.000–25.500
(function(){
  'use strict';
  const ID='memory-field',TAU=Math.PI*2,clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  // Canonical progress glyph. Copy this function byte-for-byte into every schematic scene.
  function progressGlyph(ctx,L,current){
    const P=L.pal,cx=900,cy=300,r=72,n=18;
    ctx.save();ctx.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+(i/n)*TAU,a1=-Math.PI/2+((i+.72)/n)*TAU;
      ctx.beginPath();ctx.arc(cx,cy,r,a0,a1);
      if(i<current){ctx.strokeStyle=L.rgba(P.lavender,.28);ctx.lineWidth=2;}
      else if(i===current){ctx.strokeStyle=P.schemCycle;ctx.lineWidth=4;}
      else{ctx.strokeStyle=L.rgba(P.grid,.22);ctx.lineWidth=2;}
      ctx.stroke();
    }ctx.restore();
  }

  function stroke(c,pts,col,w,a=1,dash=null){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);
    c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.restore();
  }

  function cradle(c,L,P,x,y,s,a){
    c.save();c.globalAlpha=a;c.strokeStyle=P.lavender;c.lineWidth=1.5;
    c.beginPath();c.arc(x,y,70*s,.15,Math.PI-.15);c.stroke();
    c.beginPath();c.ellipse(x-10*s,y-5*s,25*s,32*s,-.3,0,TAU);c.stroke();
    c.beginPath();c.moveTo(x-30*s,y+12*s);c.quadraticCurveTo(x,y+35*s,x+30*s,y+10*s);c.stroke();c.restore();
  }
  function footsteps(c,L,P,x,y,s,a){
    c.save();c.globalAlpha=a;c.strokeStyle=P.paleBlue;c.lineWidth=1.4;
    [[-24,-12,.3],[20,18,-.25],[-15,50,.25],[28,82,-.2]].forEach((q,i)=>{
      c.save();c.translate(x+q[0]*s,y+q[1]*s);c.rotate(q[2]);c.beginPath();c.ellipse(0,0,10*s,22*s,0,0,TAU);c.stroke();c.restore();
    });c.restore();
  }
  function reach(c,L,P,x,y,s,a){
    c.save();c.globalAlpha=a;c.strokeStyle=P.schemSelf;c.lineWidth=1.6;c.beginPath();
    c.arc(x,y,18*s,0,TAU);c.moveTo(x,y+18*s);c.lineTo(x,y+70*s);c.moveTo(x,y+35*s);c.quadraticCurveTo(x+45*s,y+5*s,x+80*s,y-30*s);c.stroke();c.restore();
  }
  function social(c,L,P,x,y,s,a){
    c.save();c.globalAlpha=a;c.strokeStyle=P.schemSocial;c.lineWidth=1.4;
    const ns=[[0,0,12],[55,-30,9],[-55,-25,10],[45,55,8],[-50,60,8]];
    ns.forEach(n=>{c.beginPath();c.arc(x+n[0]*s,y+n[1]*s,n[2]*s,0,TAU);c.stroke();});
    [[0,1],[0,2],[0,3],[2,4]].forEach(e=>{const A=ns[e[0]],B=ns[e[1]];c.beginPath();c.moveTo(x+A[0]*s,y+A[1]*s);c.lineTo(x+B[0]*s,y+B[1]*s);c.stroke();});c.restore();
  }
  function madeObject(c,L,P,x,y,s,a){
    c.save();c.globalAlpha=a;c.strokeStyle=P.memoryViolet;c.lineWidth=1.6;
    c.strokeRect(x-60*s,y+30*s,120*s,28*s);c.strokeRect(x-15*s,y-55*s,30*s,85*s);
    c.beginPath();c.arc(x,y-88*s,34*s,0,TAU);c.stroke();c.beginPath();c.arc(x,y-88*s,16*s,0,TAU);c.stroke();c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,900],circles:6,diagonals:5});
    progressGlyph(c,L,13);

    // continuing memory path
    const path=[[650,380],[590,510],[630,650],[540,790],[475,930],[520,1080],[445,1240],[520,1420]];
    const p=L.seg(t,0,.72,'outExpo');
    const n=Math.max(2,Math.round(path.length*p));
    stroke(c,path.slice(0,n),P.memoryViolet,2.4,.55);

    const glyphs=[
      {fn:cradle,x:310,y:560,s:.9,t0:.08},
      {fn:footsteps,x:760,y:550,s:.95,t0:.22},
      {fn:reach,x:330,y:900,s:.9,t0:.38},
      {fn:social,x:760,y:920,s:.9,t0:.55},
      {fn:madeObject,x:520,y:1260,s:.9,t0:.72}
    ];
    glyphs.forEach((g,i)=>{
      const q=L.seg(t,g.t0,g.t0+.32,'outBack');if(q<=0)return;
      g.fn(c,L,P,g.x,g.y,g.s,.18+.7*q);
      L.guideCircle(c,g.x,g.y,105+12*i,{color:P.lavender,alpha:.06+.07*q,width:1,dash:[3,9]});
    });

    // cross-links show accumulated traces rather than a star field
    const links=[
      [[310,560],[540,790]],[[760,550],[590,510]],[[330,900],[475,930]],[[760,920],[540,790]],[[520,1260],[520,1080]]
    ];
    c.save();c.strokeStyle=L.rgba(P.lavender,.22);c.lineWidth=1.1;c.setLineDash([5,8]);
    links.forEach((v,i)=>{const q=L.seg(t,.25+i*.08,.55+i*.08,'outExpo');if(q<=0)return;c.globalAlpha=q*.6;c.beginPath();c.moveTo(v[0][0],v[0][1]);c.quadraticCurveTo(540,v[0][1]+(i%2?70:-70),v[1][0],v[1][1]);c.stroke();});c.restore();

    // protagonist identity trace condenses near lower path for transition to ageing
    const e=L.seg(t,1.05,1.5,'outExpo');
    if(e>0){
      c.save();c.strokeStyle=P.schemSelf;c.lineWidth=2.2;c.globalAlpha=.3+.7*e;c.beginPath();
      c.ellipse(540,1125,42,50,0,0,TAU);c.moveTo(480,1190);c.quadraticCurveTo(540,1160,600,1190);c.moveTo(500,1194);c.lineTo(510,1390);c.moveTo(580,1194);c.lineTo(570,1390);c.stroke();c.restore();
      L.glowDot(c,540,1260,7,{color:P.schemSelf,core:P.glow,rays:5,seed:sd('self'),intensity:e,glow:3.6,twinkle:.03});
    }
  }});
})();