// 17 · Continue · T 29.000–30.500
// Layers: paper/garden threshold · middle adult · older protagonist · child · physical seed handoff · new trajectory
(function(){
  'use strict';
  const ID='handoff',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;
  function fill(c,L,pts,col,seed,w=3.6,a=1){L.inkPath(c,pts,{closed:true,fill:col,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1,tremble:.28,boilAmp:.45,double:w>4?{offset:2.2,width:1.1,alpha:.16,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=1.8,a=1,t=[5,10]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.75,tremble:.23,boilAmp:.35,taper:t});}
  function ell(cx,cy,rx,ry,rot=0,n=26){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}
  function hand(x,y,rot,s){const b=[[-20,-9],[-3,-14],[15,-10],[24,-3],[19,7],[8,16],[-4,15],[-17,9],[-24,1]],cr=Math.cos(rot),sr=Math.sin(rot);return b.map(([px,py])=>[x+(px*cr-py*sr)*s,y+(px*sr+py*cr)*s]);}

  function figure(c,L,P,o){
    const s=o.s||1,x=o.x,y=o.y,seed=o.seed,side=o.side,col=o.col,deep=o.deep;
    const old=o.old,child=o.child,reach=o.reach||0;
    const headY=child?-420*s:old?-470*s:-500*s,shoulderY=child?-330*s:old?-385*s:-410*s,pelvisY=child?-165*s:-205*s;
    c.save();c.translate(x,y);if(old)c.rotate(.07);
    // legs
    const legW=child?26:old?27:30;
    fill(c,L,limb(-34*s,pelvisY,-42*s,-100*s,legW*s,19*s),deep,seed+1,2.9*s);
    fill(c,L,limb(-42*s,-100*s,-48*s,-5*s,19*s,14*s),deep,seed+2,2.6*s);
    fill(c,L,limb(34*s,pelvisY,46*s,-100*s,(legW+1)*s,19*s),P.inkSoft,seed+3,2.9*s);
    fill(c,L,limb(46*s,-100*s,52*s,-5*s,19*s,14*s),P.inkSoft,seed+4,2.6*s);
    fill(c,L,[[-70*s,-13*s],[-28*s,-14*s],[-4*s,-3*s],[-8*s,10*s],[-69*s,10*s]],P.ink,seed+5,2.2*s);
    fill(c,L,[[28*s,-13*s],[70*s,-14*s],[94*s,-3*s],[90*s,10*s],[30*s,10*s]],P.ink,seed+6,2.2*s);
    // torso
    const tw=child?68:old?76:80;
    const torso=[[-tw*s,-(Math.abs(shoulderY)+16*s)],[-50*s,shoulderY-24*s],[-16*s,shoulderY-34*s],[42*s,shoulderY-26*s],[tw*s,shoulderY+4*s],[65*s,-295*s],[50*s,-230*s],[-50*s,-230*s],[-65*s,-297*s]];
    fill(c,L,torso,col,seed+10,4*s);
    if(o.hero)L.hatch(c,torso,{spacing:10*s,angle:-.8,length:[14*s,40*s],density:(hx)=>clamp((hx+10*s)/(105*s))*.5,color:deep,alpha:.4,width:1*s,seed:seed+11});
    fill(c,L,[[-50*s,-232*s],[-56*s,-198*s],[-42*s,-175*s],[43*s,-175*s],[53*s,-202*s],[48*s,-232*s]],deep,seed+12,3.2*s);
    // reaching arm toward centre
    const sh=[side*70*s,shoulderY],el=[side*(95+45*reach)*s,(-315-60*reach)*s],wr=[side*(100+120*reach)*s,(-235-150*reach)*s];
    fill(c,L,limb(...sh,...el,18*s,13*s),col,seed+13,2.9*s);
    fill(c,L,limb(...el,...wr,13*s,9*s),P.selfPale,seed+14,2.4*s);
    fill(c,L,hand(wr[0],wr[1],side*(.2-.55*reach),.72*s),P.selfPale,seed+15,2.1*s);
    // second arm
    const sh2=[-side*70*s,shoulderY],el2=[-side*88*s,-315*s],wr2=[-side*64*s,-240*s];
    fill(c,L,limb(...sh2,...el2,18*s,13*s),col,seed+16,2.8*s);
    fill(c,L,limb(...el2,...wr2,13*s,9*s),P.selfPale,seed+17,2.4*s);
    // head
    fill(c,L,ell(0,headY,child?44*s:old?44*s:46*s,child?52*s:old?52*s:55*s,-side*.02,28),P.selfPale,seed+18,3.3*s);
    const hair=old?L.mix(P.ink,P.paper,.45):o.hero?P.ink:L.mix(P.ink,col,.18);
    fill(c,L,[[-39*s,headY-22*s],[-27*s,headY-50*s],[-5*s,headY-59*s],[20*s,headY-51*s],[39*s,headY-30*s],[34*s,headY-10*s],[13*s,headY-25*s],[-9*s,headY-27*s],[-30*s,headY-14*s]],hair,seed+19,2*s);
    ink(c,L,[[-16*s,headY],[ -3*s,headY-3*s]],P.ink,seed+20,1.1*s,.75);
    ink(c,L,[[8*s,headY],[15*s,headY+10*s],[12*s,headY+17*s]],P.inkSoft,seed+21,1*s,.6);
    if(o.hero)ink(c,L,[[-72*s,shoulderY+8*s],[-60*s,shoulderY+19*s],[-68*s,shoulderY+32*s]],P.cycleGold,seed+22,1.8*s,.9);
    c.restore();
    return {wx:x+wr[0],wy:y+wr[1]};
  }

  function env(c,L,P){
    c.fillStyle=L.rgba(P.stripeSpring,.18);c.fillRect(0,300,1080,1620);
    c.save();c.globalAlpha=.35;
    // doorway/window
    c.fillStyle=P.paperShade;c.fillRect(80,320,920,670);
    c.fillStyle=L.rgba(P.stripeSky,.26);c.fillRect(690,430,230,390);
    ink(c,L,[[690,820],[690,430],[920,430],[920,820]],P.inkFaint,sd('door'),1.5,.48,[0,0]);
    // planter/table edge
    fill(c,L,[[110,1110],[430,1105],[425,1160],[105,1165]],P.wood,sd('table'),2.4,.6);
    fill(c,L,[[750,1115],[980,1110],[970,1160],[745,1165]],P.paperDeep,sd('planter'),2.3,.55);
    c.restore();
    // leaves / stems
    for(let i=0;i<18;i++){
      const r=L.rng(sd('plant',i)),x=720+r()*260,y=1250+r()*270,h=70+r()*130;
      ink(c,L,[[x,y],[x+(r()-.5)*18,y-h]],P.ageSage,sd('stem',i),1.5,.5,[2,5]);
      fill(c,L,ell(x+((i%2)?20:-20),y-h*.55,24,9,(i%2?.25:-.25),16),P.sage,sd('leaf',i),1.2,.35);
    }
    // large foreground leaf
    fill(c,L,ell(110,1490,120,42,-.35,30),P.sage,sd('fgleaf'),2.4,.48);
    ink(c,L,[[12,1530],[200,1452]],P.inkSoft,sd('vein'),1.4,.4,[0,0]);
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});L.stripes(c,{colors:[P.stripeCream,P.stripeSpring],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    env(c,L,P);
    const a=L.seg(t,0,.55,'inOutCubic'),b=L.seg(t,.18,.7,'inOutCubic');
    const old=figure(c,L,P,{x:365,y:1435,s:.80,col:L.mix(P.selfWarm,P.ageSage,.2),deep:P.selfDeep,seed:sd('old'),side:1,reach:a,old:true,hero:true});
    const kid=figure(c,L,P,{x:715,y:1430,s:.68,col:P.childSky,deep:P.socialDeep,seed:sd('kid'),side:-1,reach:b,child:true});

    // exact G4 lives between hands
    const g=L.seg(t,.18,.55,'outBack');
    const release=L.seg(t,.5,.82,'outExpo');
    const gx=lerp(540,kid.wx,release*.6),gy=lerp(920,kid.wy,release*.6);
    L.guideCircle(c,gx,gy,18,{color:P.cycleGold,alpha:.92,width:2.4});
    L.glowDot(c,gx,gy,6,{color:P.cycleGold,core:P.glow,rays:8,seed:sd('g4'),intensity:.65+.35*g,glow:4.2,twinkle:.03});

    // child's new trajectory begins after receipt, separate from older path
    const p=L.seg(t,.72,1.22,'outExpo');
    if(p>0){
      const pts=[[730,1170],[790,1135],[850,1095],[910,1035]];
      const n=Math.max(2,Math.round(pts.length*p));
      ink(c,L,pts.slice(0,n),P.selfWarm,sd('newpath'),3.2,.62,[8,16]);
    }

    // point lifts and expands toward G1
    const e=L.seg(t,1.05,1.5,'outExpo');
    if(e>0){
      const cx=lerp(gx,540,e),cy=lerp(gy,700,e),rr=lerp(18,150,e);
      L.guideCircle(c,cx,cy,rr,{color:P.cycleGold,alpha:.8,width:2.5,quadrants:e>.5?8:0});
      L.guideCircle(c,cx,cy,rr+34,{color:P.annYellow,alpha:.16+.18*e,width:1.3,dash:[5,8]});
    }
  }});
})();