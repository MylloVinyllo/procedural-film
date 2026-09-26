// 05 · Impact · T 7.000–9.000
// Macro leaf impact: contact disk → crown splash → surface lens G2 → slide → macro push.
(function(){
  'use strict';
  const ID='leaf-impact',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function transformPts(pts,cx,cy,rot){
    const cr=Math.cos(rot),sr=Math.sin(rot);
    return pts.map(p=>[cx+p[0]*cr-p[1]*sr,cy+p[0]*sr+p[1]*cr]);
  }

  function leafShape(cx,cy,s,rot){
    const upper=[],lower=[];
    for(let i=0;i<=44;i++){
      const u=i/44;
      const x=(u-.5)*900*s;
      const base=Math.pow(Math.sin(Math.PI*u),.72)*280*s;
      const serr=1+.035*Math.sin(u*TAU*15);
      upper.push([x,-base*serr]);
      lower.push([x,base*(.9+.025*Math.sin(u*TAU*13+1.2))]);
    }
    return transformPts(upper.concat(lower.reverse()),cx,cy,rot);
  }

  function drawLeaf(c,L,P,cx,cy,s,rot,seed,alpha=1){
    const pts=leafShape(cx,cy,s,rot);
    c.save();c.globalAlpha=alpha;c.fillStyle=P.leafWet;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:rot+.72,spacing:9,width:1.25,color:P.tealDeep,alpha:.5,density:(x,y)=>.35+.35*clamp((y-cy+280*s)/(560*s)),length:[18,60],seed:seed+1,clip:true});
    L.inkPath(c,pts,{closed:true,color:P.ink,width:4.2*s,seed,wobble:1.1,tremble:.24,boilAmp:.42,double:{offset:2.4,width:1,alpha:.14,seed:seed+2}});
    // midrib and many pinnate veins
    const cr=Math.cos(rot),sr=Math.sin(rot);
    const A=[cx-420*s*cr,cy-420*s*sr],B=[cx+420*s*cr,cy+420*s*sr];
    L.inkPath(c,[A,B],{color:P.tealDeep,width:4*s,alpha:.78,seed:seed+3,wobble:.8,tremble:.18});
    for(let k=2;k<17;k++){
      const u=k/18,along=(u-.5)*780*s;
      const mx=cx+along*cr,my=cy+along*sr;
      const sideLen=Math.sin(Math.PI*u)*210*s;
      for(const side of [-1,1]){
        const ang=rot+side*(.72+.12*Math.sin(k));
        const ex=mx+Math.cos(ang)*sideLen,ey=my+Math.sin(ang)*sideLen;
        L.inkPath(c,L.smoothPts([[mx,my],[lerp(mx,ex,.55)+side*8,lerp(my,ey,.55)-8],[ex,ey]],false,3),{color:P.tealDeep,width:1.35*s,alpha:.54,seed:seed+20+k+(side>0?30:0),wobble:.55,tremble:.12,taper:[4,12]});
      }
    }
    // fine surface stipple / hairs
    L.stipple(c,pts,{spacing:18,r:[.5,1.1],density:.18,color:P.inkSoft,alpha:.28,seed:seed+90,boilAmp:.18});
    c.restore();
    return pts;
  }

  function crown(c,L,P,cx,cy,p){
    const n=12,inner=42+38*p,outer=78+115*p;
    const top=[],base=[];
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      const lobe=outer*(1+.08*Math.sin(i*2.1));
      top.push([cx+Math.cos(a)*lobe,cy+Math.sin(a)*lobe*.32-58*p*(.6+.4*Math.sin(a+1))]);
      base.push([cx+Math.cos(a)*inner,cy+Math.sin(a)*inner*.25]);
    }
    c.save();c.globalAlpha=.45+.4*(1-p*.4);
    c.strokeStyle=P.waterDeep;c.lineWidth=3.2;c.beginPath();
    for(let i=0;i<n;i++){
      const j=(i+1)%n;
      c.moveTo(base[i][0],base[i][1]);
      c.quadraticCurveTo(top[i][0],top[i][1],base[j][0],base[j][1]);
    }
    c.stroke();
    c.strokeStyle=P.waterFoam;c.lineWidth=1.8;c.globalAlpha=.75;
    top.forEach((q,i)=>{c.beginPath();c.arc(q[0],q[1],4+(i%3)*2,0,TAU);c.stroke();});
    c.restore();
  }

  function lens(c,L,P,cx,cy,p,slide){
    const rx=lerp(70,118,p),ry=lerp(28,86,p);
    const pts=L.ellipsePts(cx,cy,rx,ry,54,-.06);
    c.save();c.globalAlpha=.18+.72*p;c.fillStyle=P.waterPale;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.05,spacing:12,width:1.1,color:P.waterDeep,alpha:.42,density:(x,y)=>clamp((y-cy+25)/(ry+35)),length:[18,52],seed:sd('lens-h'),clip:true});
    L.inkPath(c,pts,{closed:true,color:P.waterDeep,width:2.8,alpha:.9,seed:sd('lens'),wobble:.8,tremble:.16,boilAmp:.28});
    // refracted vein segments shift inside the lens
    for(let i=-2;i<=2;i++){
      const y=cy+i*22;
      L.inkPath(c,[[cx-rx*.78,y+4*i],[cx-15+slide*10,y-5],[cx+rx*.75,y-12*i*.08]],{color:P.tealDeep,width:1.2,alpha:.28+.3*p,seed:sd('refract',i),wobble:.35,tremble:.08});
    }
    L.inkPath(c,[[cx-58,cy-24],[cx-44,cy-43],[cx-20,cy-50]],{color:P.white,width:4.6,alpha:.72*p,seed:sd('lens-hl'),wobble:.35,tremble:.08,taper:[4,7]});
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSpring],width:140,angle:-.52,offset:info.T*9,seed:sd('stripes')});

    // layered background leaves for depth
    drawLeaf(c,L,P,160,370,.64,-.48,sd('back1'),.42);
    drawLeaf(c,L,P,940,470,.58,.36,sd('back2'),.38);
    drawLeaf(c,L,P,890,1510,.55,-.25,sd('back3'),.34);

    // primary leaf spans the frame diagonally
    const bend=Math.sin(L.onTwos(t)*2.4)*3;
    drawLeaf(c,L,P,545,980+bend,1.16,-.16,sd('main'),1);

    // stem/petiole and foreground detail
    L.inkPath(c,[[50,1420],[260,1290],[430,1170]],{color:P.tealDeep,width:8,alpha:.68,seed:sd('stem'),wobble:1.2,tremble:.24,taper:[20,30]});
    for(let i=0;i<16;i++){
      const x=80+i*65,y=1320+Math.sin(i*.8)*35;
      L.inkPath(c,[[x,y],[x+25,y-90]],{color:P.sage,width:1.5,alpha:.28,seed:sd('grass',i),wobble:.8,tremble:.2,taper:[3,10]});
    }

    // impact phases
    const impact=L.seg(t,0,.22,'outExpo');
    const crownP=L.seg(t,.12,.48,'outBack')*(1-L.seg(t,.52,.82,'outQuad'));
    const lensP=L.seg(t,.42,.9,'outBack');
    const slide=L.seg(t,.92,1.45,'inOutCubic');
    const push=L.seg(t,1.45,2.0,'inOutCubic');

    // falling body compresses into contact disk
    if(t<.55){
      const y=lerp(720,805,impact);
      const rx=lerp(105,128,impact),ry=lerp(90,30,impact);
      const pts=L.ellipsePts(540,y,rx,ry,48);
      c.save();c.globalAlpha=1-L.seg(t,.3,.58,'outQuad');c.fillStyle=P.waterPale;c.beginPath();L.tracePath(c,pts,true);c.fill();
      L.inkPath(c,pts,{closed:true,color:P.waterDeep,width:3.6,seed:sd('impact-body'),wobble:.8,tremble:.14});
      c.restore();
    }

    if(crownP>0)crown(c,L,P,540,820,crownP);

    // secondary droplets: ballistic arcs; all deterministic
    const r=L.rng(sd('splash'));
    for(let i=0;i<22;i++){
      const delay=.15+(i%5)*.025;
      const q=L.seg(t,delay,delay+.55,'inOutCubic');
      if(q<=0||q>=1)continue;
      const a=-Math.PI*.92+r()*Math.PI*.84;
      const speed=90+r()*150;
      const x=540+Math.cos(a)*speed*q;
      const y=820+Math.sin(a)*speed*q-130*Math.sin(Math.PI*q);
      const rr=3+r()*9;
      c.save();c.globalAlpha=.3+.55*(1-q);c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,rr,0,TAU);c.fill();c.strokeStyle=P.waterDeep;c.lineWidth=1;c.stroke();c.restore();
    }

    lens(c,L,P,540,820,lensP,slide);
    if(lensP>.25)L.glowDot(c,540+Math.cos(.56)*82,820+Math.sin(.56)*58,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('tracer'),intensity:.7+.25*lensP,glow:2.6,twinkle:.02});

    // impact ring and downhill route
    const ring=L.seg(t,.08,.4,'outExpo')*(1-L.seg(t,.5,.75,'outQuad'));
    if(ring>0)L.guideCircle(c,540,820,85+150*ring,{color:P.annMagenta,alpha:.5*(1-ring*.5),width:2.8,quadrants:10});
    if(slide>0){
      const pts=[[620,860],[690,905],[755,970],[825,1040]];
      const n=Math.max(2,Math.round(pts.length*slide));
      L.inkPath(c,L.smoothPts(pts.slice(0,n),false,3),{color:P.annBlue,width:2.5,alpha:.62,seed:sd('route'),wobble:.2,tremble:.05,taper:[4,10]});
    }

    // G2 stays screen-fixed. Surroundings expand to create a macro push without moving the conserved geometry.
    if(push>0){
      L.guideCircle(c,540,820,118,{color:P.annYellow,alpha:.22+.3*push,width:2,dash:[5,8]});
      [160,210,275].forEach((r,i)=>L.guideCircle(c,540,820,r+100*push,{color:P.inkFaint,alpha:.08+.08*push,width:1,dash:[4,10]}));
    }
  }});
})();