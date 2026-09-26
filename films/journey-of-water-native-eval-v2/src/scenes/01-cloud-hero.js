// 01 · Held in the cloud · T 0.000–1.500
// Dense illustrated cloud environment with exact G1 precipitation drop.
(function(){
  'use strict';
  const ID='cloud-hero',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function polyFill(c,L,pts,fill,seed,w=3.4,alpha=1){
    L.inkPath(c,pts,{closed:true,fill,fillAlpha:alpha,color:L.pal.inkSoft,alpha,width:w,seed,wobble:1.3,tremble:.28,boilAmp:.45,double:{offset:2,width:1,alpha:.13,seed:seed+1}});
  }

  function ellipse(c,L,cx,cy,rx,ry,fill,seed,alpha=1,w=2.6){
    const pts=L.ellipsePts(cx,cy,rx,ry,38);
    polyFill(c,L,pts,fill,seed,w,alpha);
    return pts;
  }

  function dropPts(cx,cy,rx,ry,flat=0){
    const pts=[],n=72;
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      let x=Math.cos(a)*rx,y=Math.sin(a)*ry;
      if(y>0){
        const u=y/ry;
        y*=1-flat*.18*u*u;
        x*=1+flat*.08*u;
      }
      pts.push([cx+x,cy+y]);
    }
    return pts;
  }

  function drawDrop(c,L,P,cx,cy,rx,ry,seed,alpha=1){
    const pts=dropPts(cx,cy,rx,ry,.55);
    c.save();c.globalAlpha*=alpha;
    c.fillStyle=P.waterPale;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.06,spacing:11,width:1.25,color:P.waterDeep,alpha:.58,density:(x,y)=>clamp((y-(cy-10))/(ry*1.25)),length:[18,58],seed:seed+2});
    L.inkPath(c,pts,{closed:true,color:P.ink,width:4.8,seed,wobble:1.1,tremble:.22,boilAmp:.38,double:{offset:2.5,width:1.1,alpha:.2,seed:seed+1}});
    // internal refracted highlight and continuity glint
    L.inkPath(c,[[cx-62,cy-28],[cx-48,cy-50],[cx-22,cy-58]],{color:P.white,width:5.5,alpha:.8,seed:seed+3,wobble:.4,tremble:.1,taper:[4,8]});
    L.glowDot(c,cx-34,cy-28,8,{color:P.schemCycle,core:P.glow,rays:0,seed:seed+4,intensity:.72,glow:2.4,twinkle:.02});
    c.restore();
  }

  function cloudLobe(c,L,P,o,t,idx){
    const q=L.onTwos(t),focus=L.seg(t,1.0,1.5,'inOutCubic');
    const drift=Math.sin((q+o.phase)*1.7+idx)*o.drift;
    const sx=1+(o.depth||.5)*.22*focus,sy=1+(o.depth||.5)*.15*focus;
    const bx=540+(o.x-540)*(1+(o.depth||.5)*.28*focus);
    const by=720+(o.y-720)*(1+(o.depth||.5)*.18*focus);
    const x=bx+drift,y=by+Math.cos((q+o.phase)*1.2+idx)*o.drift*.45;
    const pts=[],n=72,seed=sd('lobe-shape',idx);
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      const scallop=1
        +.065*Math.sin(a*3+idx*.7)
        +.04*Math.sin(a*5+1.3+idx)
        +.025*L.noise1(i*.23,seed);
      const rx=o.rx*sx*scallop,ry=o.ry*sy*(1+.035*Math.sin(a*4+idx*.3));
      const cr=Math.cos(o.rot||0),sr=Math.sin(o.rot||0);
      const px=Math.cos(a)*rx,py=Math.sin(a)*ry;
      pts.push([x+px*cr-py*sr,y+px*sr+py*cr]);
    }
    c.save();c.globalAlpha=o.alpha;
    c.fillStyle=o.fill;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.78,spacing:o.hatch||11,width:1.15,color:P.cloudShade,alpha:.42,
      density:(hx,hy)=>clamp((hy-(y-o.ry*.08))/(o.ry*.9))*.82,length:[16,62],seed:sd('lobe-h',idx),clip:true});
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:o.outline||1.8,alpha:.5,seed:sd('lobe',idx),wobble:1.25,tremble:.25,boilAmp:.38});
    // a short inner fold makes the cloud read as volume rather than overlapping circles
    const fold=[
      [x-o.rx*.48,y+o.ry*.08],[x-o.rx*.18,y+o.ry*.17],[x+o.rx*.12,y+o.ry*.12],[x+o.rx*.42,y+o.ry*.22]
    ];
    L.inkPath(c,L.smoothPts(fold,false,4),{color:P.cloudShade,width:1.2,alpha:.22,seed:sd('fold',idx),wobble:.8,tremble:.18,boilAmp:.28,taper:[7,10]});
    c.restore();
  }

  const back=[
    {x:90,y:330,rx:245,ry:205,fill:P.cloudBackA,alpha:.55,phase:.2,drift:16,depth:.25,rot:-.08},
    {x:350,y:285,rx:275,ry:225,fill:P.cloudBackB,alpha:.62,phase:.8,drift:14,depth:.28,rot:.05},
    {x:675,y:320,rx:300,ry:235,fill:P.cloudBackC,alpha:.6,phase:1.2,drift:15,depth:.3,rot:-.04},
    {x:970,y:390,rx:270,ry:220,fill:P.cloudBackD,alpha:.6,phase:1.6,drift:16,depth:.32,rot:.08},
    {x:180,y:650,rx:290,ry:245,fill:P.cloudBackE,alpha:.67,phase:.5,drift:18,depth:.38,rot:.06},
    {x:860,y:690,rx:320,ry:260,fill:P.cloudBackF,alpha:.66,phase:1.1,drift:17,depth:.4,rot:-.07},
  ];
  const mid=[
    {x:55,y:950,rx:265,ry:235,fill:P.cloudMidA,alpha:.84,phase:.7,drift:22,hatch:9,depth:.55,rot:.08},
    {x:320,y:940,rx:285,ry:230,fill:P.cloudMidB,alpha:.87,phase:1.5,drift:20,hatch:9,depth:.6,rot:-.06},
    {x:765,y:935,rx:305,ry:245,fill:P.cloudMidC,alpha:.88,phase:.1,drift:21,hatch:9,depth:.62,rot:.05},
    {x:1040,y:965,rx:270,ry:225,fill:P.cloudMidD,alpha:.82,phase:1.8,drift:19,hatch:9,depth:.58,rot:-.04},
    {x:165,y:1200,rx:250,ry:220,fill:P.cloudMidE,alpha:.86,phase:.35,drift:21,hatch:10,depth:.66,rot:.04},
    {x:905,y:1190,rx:285,ry:235,fill:P.cloudMidF,alpha:.86,phase:1.35,drift:20,hatch:10,depth:.67,rot:-.05},
  ];
  const front=[
    {x:-60,y:1510,rx:330,ry:275,fill:P.cloudFrontA,alpha:.93,phase:.2,drift:28,hatch:9,outline:2.2,depth:.9,rot:.05},
    {x:1140,y:1490,rx:360,ry:290,fill:P.cloudFrontB,alpha:.93,phase:1.2,drift:27,hatch:9,outline:2.2,depth:.92,rot:-.06},
    {x:310,y:1710,rx:300,ry:230,fill:P.cloudFrontC,alpha:.9,phase:.65,drift:25,hatch:10,outline:2,depth:.86,rot:.03},
    {x:800,y:1735,rx:330,ry:245,fill:P.cloudFrontD,alpha:.91,phase:1.55,drift:24,hatch:10,outline:2,depth:.88,rot:-.03},
  ];

  function droplets(c,L,P,t,push){
    const r=L.rng(sd('drops'));
    const q=L.onTwos(t);
    for(let i=0;i<54;i++){
      const a=r()*TAU,rad=170+r()*570;
      const depth=.25+r()*.75;
      let x=540+Math.cos(a)*rad;
      let y=720+Math.sin(a)*rad*.78;
      // gentle circulation and push-away as camera focuses G1
      x+=Math.sin(q*(.8+depth)+i)*8*depth;
      y+=Math.cos(q*(.7+depth)+i*1.4)*5*depth;
      x=540+(x-540)*(1+.18*push);
      y=720+(y-720)*(1+.18*push);
      const rr=3+r()*14*depth;
      c.save();c.globalAlpha=.18+.46*depth;
      c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,rr,0,TAU);c.fill();
      c.strokeStyle=P.waterDeep;c.lineWidth=.7+depth;c.stroke();
      c.restore();
    }
    // three readable neighbours actually merge toward G1
    const starts=[[360,665],[690,605],[655,810]];
    starts.forEach((s,i)=>{
      const p=L.seg(t,.18+i*.14,.62+i*.12,'inOutCubic');
      const x=lerp(s[0],540+(i-1)*58,p),y=lerp(s[1],720+(i===2?38:-34),p);
      const rr=18+6*i+(i===1?5:0);
      c.save();c.globalAlpha=1-L.seg(t,.78+i*.08,1.05+i*.08,'outQuad');
      c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,rr,0,TAU);c.fill();c.strokeStyle=P.waterDeep;c.lineWidth=2;c.stroke();c.restore();
    });
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    const push=L.seg(t,1.0,1.5,'inOutCubic');

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*8,seed:sd('stripes')});

    // pale sky gaps behind cloud body
    c.save();c.globalAlpha=.34;c.fillStyle=P.stripeSky;c.fillRect(0,250,1080,800);c.restore();

    back.forEach((o,i)=>cloudLobe(c,L,P,o,t,i));
    // faint light shafts / atmosphere
    c.save();c.strokeStyle=L.rgba(P.white,.45);c.lineWidth=18;c.globalAlpha=.2+.15*(1-push);
    [[180,150,410,1220],[505,120,560,1180],[870,210,710,1180]].forEach(v=>{c.beginPath();c.moveTo(v[0],v[1]);c.lineTo(v[2],v[3]);c.stroke();});c.restore();

    mid.forEach((o,i)=>cloudLobe(c,L,P,o,t,20+i));
    droplets(c,L,P,t,push);

    // circulation arcs operate in screen space and remain thin
    const a=L.seg(t,.15,.65,'outExpo');
    if(a>0){
      L.arcAnnotation(c,540,720,315,3.4,5.55,{color:P.annBlue,width:2,p:a,arrow:10,alpha:.32});
      L.arcAnnotation(c,540,720,430,.2,2.0,{color:P.annBlue,width:1.7,p:Math.max(0,(a-.25)/.75),arrow:9,alpha:.24});
    }

    // G1 is deliberately drawn after moving cloud layers so its screen geometry never shifts.
    const flex=Math.sin(L.onTwos(t)*TAU*1.2)*2.5*(1-push);
    drawDrop(c,L,P,540,720,105+flex,90-flex*.45,sd('hero'),1);

    const ring=L.seg(t,.3,.8,'outExpo');
    if(ring>0)L.guideCircle(c,540,720,150,{color:P.annYellow,alpha:.12+.24*(1-L.seg(t,1.1,1.5)),width:1.8,dash:[5,10]});

    front.forEach((o,i)=>cloudLobe(c,L,P,o,t,40+i));

    // focus tunnel: surroundings recede without scaling the shared geometry itself
    if(push>0){
      c.save();
      c.strokeStyle=L.rgba(P.inkFaint,.25*push);c.lineWidth=1.5;
      [210,270,340].forEach((r,i)=>{c.beginPath();c.arc(540,720,r+90*push,0,TAU);c.stroke();});
      c.restore();
    }
  }});
})();