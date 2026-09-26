// 12 Roles · T 20.0–21.5
// Layers: blueprint base → protagonist core → context rings → human/activity micro-glyphs → table-line handoff → progress glyph.
(function(){
  'use strict';
  const ID='role-system',TAU=Math.PI*2;
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
  function node(c,P,x,y,r,a,col){
    c.save();c.globalAlpha=a;c.fillStyle=P.navyLight;c.strokeStyle=col||P.lavender;c.lineWidth=1.5;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.stroke();c.restore();
  }
  function microPerson(c,P,x,y,s,a){
    c.save();c.globalAlpha=a;c.strokeStyle=P.lavender;c.lineWidth=1.3;
    c.beginPath();c.arc(x,y-32*s,10*s,0,TAU);c.stroke();
    line(c,[[x,y-22*s],[x,y+20*s]],P.lavender,1.3,a);
    line(c,[[x,y-8*s],[x-16*s,y+5*s]],P.lavender,1.1,a);
    line(c,[[x,y-8*s],[x+16*s,y+5*s]],P.lavender,1.1,a);
    line(c,[[x,y+20*s],[x-12*s,y+42*s]],P.lavender,1.1,a);
    line(c,[[x,y+20*s],[x+12*s,y+42*s]],P.lavender,1.1,a);
    c.restore();
  }
  function ring(c,P,r,start,end,a,w){
    c.save();c.strokeStyle=P.lavender;c.lineWidth=w;c.globalAlpha=a;c.beginPath();c.arc(540,820,r,start,end);c.stroke();c.restore();
  }
  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:12001});
    // protagonist core with faint torso
    c.save();c.strokeStyle=P.lavender;c.globalAlpha=.22;c.lineWidth=1.3;c.beginPath();c.moveTo(465,665);c.quadraticCurveTo(540,625,615,665);c.lineTo(650,1005);c.quadraticCurveTo(540,1060,430,1005);c.closePath();c.stroke();c.restore();
    node(c,P,540,820,42,1,P.schemSelf);
    const p1=clamp((t-.18)/.25),p2=clamp((t-.42)/.25),p3=clamp((t-.68)/.25);
    ring(c,P,155,-2.6,1.65,p1*.68,2.6);
    ring(c,P,250,-.9,3.3,p2*.48,2.0);
    ring(c,P,350,-2.0,2.15,p3*.30,1.5);
    // nodes + activity traces on rings
    const pts=[[425,700,16],[655,730,18],[425,930,14],[665,930,15],[305,780,13],[765,820,12],[335,1070,12],[725,1080,14],[540,470,12]];
    pts.forEach((q,i)=>{const p=i<3?p1:i<6?p2:p3;if(p>0)node(c,P,q[0],q[1],q[2],.35+.45*p,P.schemSocial);});
    // small human pair on ring 1
    if(p1>0){microPerson(c,P,402,790,.65,.65*p1);microPerson(c,P,452,790,.65,.55*p1);line(c,[[413,800],[440,800]],P.schemSocial,1.4,.55*p1);}
    // tiny home/door frame on ring 2
    if(p2>0){line(c,[[715,730],[755,690],[795,730],[795,795],[715,795],[715,730]],P.paleBlue,1.4,.55*p2);line(c,[[750,795],[750,755],[770,755],[770,795]],P.paleBlue,1,.45*p2);}
    // worktable trace on ring 3
    if(p3>0){line(c,[[280,1050],[480,1050]],P.schemSocial,2,.55*p3);line(c,[[310,1050],[300,1100]],P.schemSocial,1.2,.45*p3);line(c,[[450,1050],[460,1100]],P.schemSocial,1.2,.45*p3);}
    // independent ring drift accents
    if(t>.9){const q=clamp((t-.9)/.4);line(c,[[540,820],[650+35*q,640-15*q]],P.magenta,2.2,.35*(1-q));}
    // flatten final ring into next scene table
    const ex=clamp((t-1.18)/.27);
    if(ex>0){
      c.save();c.strokeStyle=P.schemCycle;c.lineWidth=3;c.globalAlpha=.85*ex;c.beginPath();c.moveTo(210,1030);c.lineTo(870,1030);c.stroke();c.restore();
    }
    progressGlyph(c,L,11);
  }});
})();