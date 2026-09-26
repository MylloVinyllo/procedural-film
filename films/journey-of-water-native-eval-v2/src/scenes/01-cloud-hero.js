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
    const drift=Math.sin((L.onTwos(t)+o.phase)*1.7+idx)*o.drift;
    const x=o.x+drift,y=o.y+Math.cos((L.onTwos(t)+o.phase)*1.2+idx)*o.drift*.35;
    const pts=L.ellipsePts(x,y,o.rx,o.ry,44,o.rot||0);
    c.save();c.globalAlpha=o.alpha;
    c.fillStyle=o.fill;c.beginPath();L.tracePath(c,pts,true);c.fill();
    // underside modelling only
    const lower=pts.filter(p=>p[1]>y-o.ry*.05);
    if(lower.length>8){
      const clip=pts;
      L.hatch(c,clip,{angle:.78,spacing:o.hatch||12,width:1.2,color:P.cloudShade,alpha:.34,density:(hx,hy)=>clamp((hy-y)/(o.ry*.95))*.8,length:[18,65],seed:sd('lobe-h',idx)});
    }
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:o.outline||1.8,alpha:.45,seed:sd('lobe',idx),wobble:1.4,tremble:.3,boilAmp:.45});
    c.restore();
  }

  const back=[
    {x:180,y:390,rx:300,ry:230,fill:'#E2E0D9',alpha:.68,phase:.2,drift:9},
    {x:475,y:320,rx:350,ry:260,fill:'#E8E3D7',alpha:.74,phase:.8,drift:8},
    {x:850,y:430,rx:360,ry:250,fill:'#D7D8D2',alpha:.68,phase:1.3,drift:10},
    {x:220,y:760,rx:330,ry:280,fill:'#D8D6CF',alpha:.75,phase:.5,drift:12},
    {x:820,y:780,rx:380,ry:310,fill:'#D1D2CF',alpha:.72,phase:1.1,drift:11},
  ];
  const mid=[
    {x:120,y:1010,rx:300,ry:260,fill:'#E8E3D7',alpha:.88,phase:.7,drift:13,hatch:10},
    {x:405,y:940,rx:320,ry:250,fill:'#E3DFD5',alpha:.9,phase:1.5,drift:10,hatch:10},
    {x:720,y:1000,rx:340,ry:280,fill:'#DEDCD3',alpha:.9,phase:.1,drift:12,hatch:10},
    {x:1020,y:980,rx:300,ry:250,fill:'#E6E1D8',alpha:.86,phase:1.8,drift:9,hatch:10},
  ];
  const front=[
    {x:80,y:1500,rx:370,ry:300,fill:'#ECE7DC',alpha:.94,phase:.2,drift:15,hatch:11,outline:2.2},
    {x:940,y:1490,rx:400,ry:320,fill:'#E7E2D8',alpha:.94,phase:1.2,drift:14,hatch:11,outline:2.2},
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