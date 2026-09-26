// 13 Contribution · T 21.5–24.0
// Layers: paper/workroom → shelves/window → table/tools → two makers → shared object → background passer → memory trace.
(function(){
  'use strict';
  const ID='create-contribute',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const line=(c,p,col,w=2,a=1,dash=null)=>{c.save();c.strokeStyle=col;c.lineWidth=w;c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.stroke();c.restore();};
  const poly=(c,p,fill,stroke,w=2,a=1)=>{c.save();c.globalAlpha=a;c.beginPath();c.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)c.lineTo(p[i][0],p[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.stroke();}c.restore();};
  const ell=(c,x,y,rx,ry,fill,stroke,w=2,a=1,rot=0)=>{c.save();c.globalAlpha=a;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}c.restore();};
  function limb(a,b,wa,wb){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.max(1,Math.hypot(dx,dy)),nx=-dy/d,ny=dx/d;return[[a[0]+nx*wa,a[1]+ny*wa],[a[0]-nx*wa,a[1]-ny*wa],[b[0]-nx*wb,b[1]-ny*wb],[b[0]+nx*wb,b[1]+ny*wb]];}
  function hand(c,P,x,y,s,rot,fill){
    c.save();c.translate(x,y);c.rotate(rot);
    poly(c,[[-12*s,-18*s],[17*s,-13*s],[24*s,4*s],[8*s,24*s],[-17*s,17*s],[-23*s,-1*s]],fill,P.ink,2);
    poly(c,[[14*s,-6*s],[31*s,2*s],[27*s,10*s],[11*s,7*s]],fill,P.ink,1.4);
    line(c,[[-8*s,5*s],[11*s,7*s]],P.inkSoft,1,.45);c.restore();
  }
  function room(c,P){
    c.save();c.globalAlpha=.30;c.fillStyle=P.paperShade;c.fillRect(60,285,960,610);c.strokeStyle=P.inkFaint;c.lineWidth=2;
    // shelving grid
    for(let x=95;x<480;x+=120){c.strokeRect(x,365,92,118);c.strokeRect(x,505,92,118);}
    // peg board / window
    c.strokeRect(650,345,280,360);
    for(let x=680;x<920;x+=42)for(let y=380;y<690;y+=44){c.beginPath();c.arc(x,y,2.2,0,TAU);c.fillStyle=P.inkFaint;c.fill();}
    c.restore();
  }
  function standingMaker(c,P,x,y,s,col,hero,lean,reach,side){
    const skin=hero?P.selfPale:P.paperDeep;
    c.save();c.translate(x,y);c.scale(s,s);c.rotate(lean);
    // legs
    poly(c,limb([-32,-58],[-58,115],29,22),hero?P.socialDeep:P.inkSoft,P.ink,2.2);
    poly(c,limb([-58,115],[-68,280],22,16),hero?P.socialDeep:P.inkSoft,P.ink,2.1);
    poly(c,limb([32,-58],[58,115],29,22),hero?P.socialDeep:P.inkSoft,P.ink,2.2);
    poly(c,limb([58,115],[68,280],22,16),hero?P.socialDeep:P.inkSoft,P.ink,2.1);
    poly(c,[[-95,273],[-55,270],[-42,288],[-102,292]],P.ink,P.ink,1);
    poly(c,[[45,270],[84,268],[102,285],[48,292]],P.ink,P.ink,1);
    // body
    poly(c,[[-70,-145],[70,-145],[58,-54],[-58,-54]],hero?P.socialDeep:P.inkSoft,P.ink,2.3);
    poly(c,[[-96,-360],[-48,-392],[48,-392],[96,-355],[74,-145],[-74,-145]],col,P.ink,2.8);
    // far arm
    const fe=side<0?[-118,-245]:[118,-245],fh=side<0?[-110,-150]:[110,-150];
    poly(c,limb([side<0?-74:74,-340],fe,23,17),col,P.ink,2);
    poly(c,limb(fe,fh,17,12),skin,P.ink,1.9);
    // near arm to work surface
    const ex=side<0?90+95*reach:-90-95*reach,ey=-170+35*reach;
    const elbow=side<0?[108,-290]:[-108,-290];
    poly(c,limb([side<0?74:-74,-340],elbow,25,18),col,P.ink,2.2);
    poly(c,limb(elbow,[ex,ey],18,12),skin,P.ink,2);
    // head
    poly(c,[[-25,-420],[25,-420],[28,-390],[-28,-390]],skin,P.ink,1.5);
    ell(c,0,-480,49,59,skin,P.ink,2.4,1,-.04);
    poly(c,[[-41,-472],[-28,-432],[0,-418],[31,-437],[43,-480]],skin,P.ink,1.8);
    c.save();c.fillStyle=P.ink;c.beginPath();c.moveTo(-46,-490);c.bezierCurveTo(-30,-548,20,-552,44,-497);c.quadraticCurveTo(12,-521,-7,-505);c.quadraticCurveTo(-27,-528,-46,-490);c.fill();c.restore();
    line(c,[[-15,-472],[-3,-474]],P.ink,1.2,.7);line(c,[[8,-469],[18,-467]],P.ink,1,.55);line(c,[[-3,-444],[11,-444]],P.inkSoft,1,.55);
    // folds
    for(let k=0;k<5;k++)line(c,[[-48+k*22,-330],[-38+k*20,-185]],hero?P.selfDeep:P.inkSoft,1,.18);
    c.restore();
    return {hx:x+s*ex,hy:y+s*ey,skin,side,s};
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:13001});L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:145,angle:-.52,offset:6*info.T,seed:13002});
    room(c,P);
    // worktable continues the prior schematic handoff line
    poly(c,[[120,1060],[960,1060],[985,1120],[95,1120]],P.paperDeep,P.ink,3,.94);
    line(c,[[150,1120],[135,1510]],P.ink,8,.75);line(c,[[930,1120],[948,1510]],P.ink,8,.75);
    for(let x=130;x<950;x+=52)line(c,[[x,1078],[x+20,1105]],P.inkSoft,1,.36);
    // tools and paper
    poly(c,[[270,1015],[375,1015],[402,1055],[286,1055]],P.stripeSky,P.ink,1.8,.75);
    line(c,[[720,1025],[790,985]],P.ink,5,.65);ell(c,805,980,18,18,P.cycleGold,P.ink,1.5,.75);
    line(c,[[815,1010],[855,1050]],P.inkSoft,3,.6);

    const p1=clamp((t-.25)/.45),p2=clamp((t-.72)/.45),finish=clamp((t-1.35)/.35);
    const a=standingMaker(c,P,335,940,.76,P.selfWarm,true,-.03,p1,-1);
    const b=standingMaker(c,P,755,940,.76,P.socialBlue,false,.025,p2,1);

    // work object changes from parts to assembled small form
    const ox=545,oy=1015;
    poly(c,[[ox-70,oy-12],[ox-8,oy-55],[ox+15,oy-5],[ox-40,oy+36]],P.childSky,P.ink,2,.88);
    poly(c,[[ox+8,oy-42],[ox+62,oy-22],[ox+48,oy+36],[ox-2,oy+10]],finish>.5?P.memoryViolet:P.ageSage,P.ink,2,.88);
    if(finish>0)ell(c,ox+2,oy-4,18+18*finish,18+18*finish,null,P.cycleGold,2.2,.55*finish);

    hand(c,P,a.hx,a.hy,.80,-.35,P.selfPale);
    hand(c,P,b.hx,b.hy,.80,Math.PI+.35,P.paperDeep);

    // background passer with finished-object echo
    const pass=clamp((t-1.55)/.65);if(pass>0){
      const px=980-260*pass;
      c.save();c.globalAlpha=.28;
      ell(c,px,635,34,42,P.paperDeep,P.ink,1.4);
      line(c,[[px,678],[px,830]],P.ink,4,.38);line(c,[[px,720],[px-45,770]],P.ink,3,.35);
      poly(c,[[px-72,760],[px-35,747],[px-22,780],[px-60,794]],P.memoryViolet,P.ink,1.4,.35);
      c.restore();
    }

    // memory trace lifts from the made object late
    const tr=clamp((t-1.92)/.48);if(tr>0){
      c.save();c.strokeStyle=P.memoryViolet;c.lineWidth=7;c.globalAlpha=.74;c.beginPath();c.moveTo(548,1000);c.bezierCurveTo(580,900,610,820,590,690-150*tr);c.stroke();
      c.strokeStyle=P.annYellow;c.lineWidth=2.5;c.globalAlpha=.65;c.beginPath();c.arc(548,1000,90,2.7,2.7+tr*4.6);c.stroke();c.restore();
    }
  }});
})();