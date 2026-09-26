// 08 · Peers · T 13.500–14.500
(function(){
  'use strict';
  const ID='social-salience',TAU=Math.PI*2,clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  // Canonical progress glyph. Copy this function byte-for-byte into every schematic scene.
  function progressGlyph(ctx,L,current){
    const P=L.pal;
    const cx=900,cy=300,r=72,n=18;
    ctx.save();
    ctx.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+(i/n)*TAU;
      const a1=-Math.PI/2+((i+.72)/n)*TAU;
      ctx.beginPath();
      ctx.arc(cx,cy,r,a0,a1);
      if(i<current){ctx.strokeStyle=L.rgba(P.lavender,.28);ctx.lineWidth=2;}
      else if(i===current){ctx.strokeStyle=P.schemCycle;ctx.lineWidth=4;}
      else{ctx.strokeStyle=L.rgba(P.grid,.22);ctx.lineWidth=2;}
      ctx.stroke();
    }
    ctx.restore();
  }

  function personGlyph(c,L,P,x,y,s,seed,alpha){
    c.save();c.globalAlpha=alpha;
    c.strokeStyle=P.lavender;c.lineWidth=1.6;
    c.beginPath();c.ellipse(x,y-65*s,28*s,34*s,0,0,TAU);c.stroke();
    c.beginPath();
    c.moveTo(x-36*s,y-22*s);c.quadraticCurveTo(x,y-42*s,x+36*s,y-22*s);
    c.moveTo(x-24*s,y-20*s);c.lineTo(x-19*s,y+45*s);
    c.moveTo(x+24*s,y-20*s);c.lineTo(x+19*s,y+45*s);
    c.stroke();
    L.glowDot(c,x,y-5*s,4.2*s,{color:P.schemSocial,core:P.glow,rays:0,seed,intensity:alpha*.8,glow:2.7,twinkle:.04});
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,820],circles:5,diagonals:5});
    progressGlyph(c,L,7);

    // incoming arm arc becomes first peer connection
    c.save();c.strokeStyle=L.rgba(P.paleBlue,.5);c.lineWidth=1.6;c.setLineDash([8,8]);
    c.beginPath();c.arc(540,820,245,-2.4,-1.0);c.stroke();c.restore();

    // primary faint torso around exact G3
    c.save();c.strokeStyle=P.lineWhite;c.lineWidth=2;c.beginPath();
    c.ellipse(540,650,50,61,0,0,TAU);
    c.moveTo(470,725);c.quadraticCurveTo(540,690,610,725);
    c.moveTo(485,730);c.lineTo(500,930);c.moveTo(595,730);c.lineTo(580,930);
    c.stroke();c.restore();
    L.glowDot(c,540,820,12,{color:P.schemSelf,core:P.glow,rays:8,seed:sd('core'),intensity:1,glow:4.1,twinkle:.05});
    L.guideCircle(c,540,820,48,{color:P.schemSelf,alpha:.7,width:2.2});
    L.guideCircle(c,540,820,82,{color:P.lavender,alpha:.16,width:1,dash:[4,7]});

    const peers=[
      [295,655,.9],[260,900,.78],[360,1090,.7],[760,640,.86],[830,860,.75],[735,1080,.72]
    ];
    peers.forEach((p,i)=>{
      const on=L.seg(t,.18+i*.055,.42+i*.055,'outBack');
      if(on<=0)return;
      personGlyph(c,L,P,p[0],p[1],p[2],sd('peer',i),.2+.8*on);
      const cp=[(540+p[0])/2+(i%2?35:-35),(820+p[1])/2-30];
      c.save();c.strokeStyle=i===3?P.schemSocial:L.rgba(P.lavender,.45);c.lineWidth=i===3?2.8:1.3;c.globalAlpha=.25+.65*on;c.beginPath();
      c.moveTo(540,820);c.quadraticCurveTo(cp[0],cp[1],p[0],p[1]-5);c.stroke();c.restore();
    });

    // attention sector swings toward peer cluster
    const q=L.seg(t,.45,.78,'inOutCubic');
    c.save();
    c.strokeStyle=P.magenta;c.fillStyle=L.rgba(P.magenta,.08);c.lineWidth=2.3;c.globalAlpha=.25+.65*q;
    c.beginPath();c.moveTo(540,820);c.arc(540,820,185,-Math.PI*.95+q*.65,-Math.PI*.55+q*.65);c.closePath();c.fill();c.stroke();c.restore();

    // one tie strengthens toward outgoing paper scene
    const s=L.seg(t,.68,.95,'outExpo');
    if(s>0){
      c.save();c.strokeStyle=P.schemSocial;c.lineWidth=3;c.globalAlpha=s;c.beginPath();c.moveTo(540,820);c.quadraticCurveTo(655,735,760,640);c.stroke();c.restore();
      L.guideCircle(c,540,820,48+52*s,{color:P.schemCycle,alpha:.28*(1-s),width:2});
    }
  }});
})();