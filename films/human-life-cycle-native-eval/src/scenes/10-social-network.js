// 10 We · T 16.0–18.0
// Layers: blueprint base → protagonist torso/G3 → clustered social graph → cross-cluster bridge → exit relation curve → progress glyph.
(function(){
  'use strict';
  const ID='social-network',TAU=Math.PI*2;
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
  function line(c,p,col,w=2,a=1,dash=null){
    c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);
    c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();
  }
  function node(c,P,x,y,r,a,col){
    c.save();c.globalAlpha=a;c.fillStyle=P.navyLight;c.strokeStyle=col||P.lavender;c.lineWidth=r>20?2.1:1.3;
    c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();
    if(r>20){c.globalAlpha=a*.34;c.beginPath();c.arc(x,y,r-7,0,TAU);c.stroke();}
    c.restore();
  }
  const N=[
    [540,820,48,'self'],
    [330,655,28,'social'],[260,735,18,'social'],[385,770,15,'social'],
    [760,615,22,'social'],[845,700,31,'social'],[745,760,16,'social'],
    [310,1055,25,'social'],[410,1140,14,'social'],[270,1180,12,'social'],
    [760,1040,20,'social'],[850,1140,27,'social'],[705,1210,15,'social'],
    [610,610,12,'social']
  ];
  const E=[
    [1,2,1],[1,3,2],[2,3,1],
    [4,5,2],[5,6,3],[4,6,1],
    [7,8,2],[7,9,1],[8,9,1],
    [10,11,3],[10,12,1],[11,12,1],
    [0,1,3],[0,4,2],[0,7,1],[0,10,2],[0,13,1],
    [3,6,1],[6,10,2],[8,12,1]
  ];
  function torso(c,P){
    c.save();c.strokeStyle=P.lavender;c.lineWidth=1.5;c.globalAlpha=.28;
    c.beginPath();c.moveTo(440,650);c.quadraticCurveTo(540,600,640,650);c.lineTo(690,1060);c.quadraticCurveTo(540,1125,390,1060);c.closePath();c.stroke();
    line(c,[[540,620],[540,1120]],P.lavender,1,.12,[8,12]);
    line(c,[[415,865],[665,865]],P.lavender,1,.12,[8,12]);
    c.restore();
    node(c,P,540,820,48,1,P.schemSelf);
  }
  function edge(c,P,a,b,weight,alpha){
    const A=N[a],B=N[b],dx=B[0]-A[0],dy=B[1]-A[1];
    const bend=18*Math.sin(a*1.7+b*.9);
    c.save();c.strokeStyle=weight===3?P.schemSocial:(weight===2?P.paleBlue:P.lavender);
    c.lineWidth=weight===3?3.5:(weight===2?2:1.2);c.globalAlpha=alpha*(weight===3?.75:weight===2?.46:.26);
    c.beginPath();c.moveTo(A[0],A[1]);c.quadraticCurveTo((A[0]+B[0])/2-dy*.08+bend,(A[1]+B[1])/2+dx*.05,B[0],B[1]);c.stroke();c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:10001});
    const up=clamp(t/.28),down=clamp((t-1.58)/.28);
    const eu=up*up*(3-2*up),ed=down*down*(3-2*down),z=1+.85*eu*(1-ed);
    c.save();c.translate(540,820);c.scale(z,z);c.translate(-540,-820);
    // guide field
    for(const r of [150,280,420]){c.save();c.strokeStyle=P.lavender;c.lineWidth=1;c.globalAlpha=.08;c.beginPath();c.arc(540,820,r,0,TAU);c.stroke();c.restore();}
    line(c,[[140,520],[940,1220]],P.lavender,1,.08,[10,14]);
    line(c,[[170,1280],[930,480]],P.lavender,1,.06,[10,14]);
    torso(c,P);
    E.forEach((e,i)=>{
      const group=i<3?0:i<6?1:i<9?2:i<12?3:i<17?4:5;
      const start=.18+group*.22+(i%3)*.035;
      let a=clamp((t-start)/.22);
      if((i===15||i===16)&&t>1.45)a*=1-clamp((t-1.45)/.28);
      if(i===13&&t>1.38)a=Math.max(a,clamp((t-1.38)/.18));
      if(a>0)edge(c,P,e[0],e[1],e[2],a);
    });
    N.forEach((q,i)=>{
      if(i===0)return;
      const start=.16+(i%4)*.12+Math.floor((i-1)/4)*.16;
      const a=clamp((t-start)/.20);if(a<=0)return;
      node(c,P,q[0],q[1],q[2],.35+.55*a,P.schemSocial);
    });
    // cross-cluster bridge flares at T17.0
    const br=clamp((t-.92)/.25);if(br>0){
      c.save();c.strokeStyle=P.magenta;c.lineWidth=2.4;c.globalAlpha=.72*br;
      c.beginPath();c.moveTo(385,770);c.bezierCurveTo(500,700,620,720,745,760);c.stroke();c.restore();
    }
    // close tie brightens and peels into next shot's arm curve
    const ex=clamp((t-1.48)/.35);if(ex>0){
      c.save();c.strokeStyle=P.schemCycle;c.lineWidth=4;c.globalAlpha=.9*ex;
      c.beginPath();c.moveTo(540,820);c.quadraticCurveTo(655,845,760,955);c.quadraticCurveTo(825,1010,890,980);c.stroke();c.restore();
    }
    progressGlyph(c,L,9);
  }});
})();