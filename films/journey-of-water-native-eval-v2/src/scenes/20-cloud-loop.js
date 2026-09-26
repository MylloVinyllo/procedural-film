// 20 · The cycle continues · T 34.500–36.000
// Illustrated cloud return: microdroplet field resolves into layered cloud volume and exact G1, ending loop-compatible with shot 01.
(function(){
  'use strict';
  const ID='cloud-loop',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function cloudLobe(c,L,P,o,t,idx){
    const q=L.onTwos(t),drift=Math.sin((q+o.phase)*1.55+idx)*o.drift;
    const x=o.x+drift,y=o.y+Math.cos((q+o.phase)*1.2+idx)*o.drift*.35;
    const pts=[];
    for(let i=0;i<72;i++){
      const a=i/72*TAU;
      const k=1+.065*Math.sin(a*3+idx*.7)+.04*Math.sin(a*5+1.3+idx)+.022*L.noise1(i*.23,sd('shape',idx));
      pts.push([x+Math.cos(a)*o.rx*k,y+Math.sin(a)*o.ry*(1+.035*Math.sin(a*4+idx*.3))*k]);
    }
    c.save();c.globalAlpha=o.alpha;c.fillStyle=o.fill;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.78,spacing:o.hatch||11,width:1.15,color:P.cloudShade,alpha:.4,density:(hx,hy)=>clamp((hy-(y-o.ry*.08))/(o.ry*.9))*.8,length:[16,60],seed:sd('h',idx),clip:true});
    L.inkPath(c,pts,{closed:true,color:P.inkSoft,width:o.outline||1.8,alpha:.48,seed:sd('o',idx),wobble:1.2,tremble:.24,boilAmp:.38});
    L.inkPath(c,L.smoothPts([[x-o.rx*.45,y+o.ry*.06],[x-o.rx*.12,y+o.ry*.17],[x+o.rx*.18,y+o.ry*.1],[x+o.rx*.42,y+o.ry*.2]],false,4),{color:P.cloudShade,width:1.1,alpha:.2,seed:sd('fold',idx),wobble:.7,tremble:.14,taper:[6,9]});
    c.restore();
  }

  function dropPts(cx,cy,rx,ry){
    const pts=[];
    for(let i=0;i<72;i++){
      const a=i/72*TAU;let x=Math.cos(a)*rx,y=Math.sin(a)*ry;
      if(y>0){const u=y/ry;y*=1-.08*u*u;x*=1+.025*u;}
      pts.push([cx+x,cy+y]);
    }
    return pts;
  }

  function hero(c,L,P,p){
    const rx=lerp(38,105,p),ry=lerp(35,90,p),pts=dropPts(540,720,rx,ry);
    c.save();c.globalAlpha=.28+.72*p;c.fillStyle=P.waterPale;c.beginPath();L.tracePath(c,pts,true);c.fill();
    L.hatch(c,pts,{angle:.04,spacing:11,width:1.2,color:P.waterDeep,alpha:.5*p,density:(x,y)=>clamp((y-700)/100),length:[16,52],seed:sd('hero-h'),clip:true});
    L.inkPath(c,pts,{closed:true,color:P.ink,width:4.5,alpha:.35+.65*p,seed:sd('hero'),wobble:1,tremble:.2,boilAmp:.35,double:{offset:2.4,width:1,alpha:.15*p,seed:sd('hero-d')}});
    if(p>.38)L.inkPath(c,[[478,692],[493,672],[518,664]],{color:P.white,width:5,alpha:.72*p,seed:sd('hl'),wobble:.35,tremble:.08,taper:[4,8]});
    L.glowDot(c,506,692,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('glint'),intensity:.55+.35*p,glow:2.6,twinkle:.02});
    c.restore();
  }

  const back=[
    {x:90,y:330,rx:245,ry:205,fill:'#E2E0D9',alpha:.55,phase:.2,drift:14},
    {x:350,y:285,rx:275,ry:225,fill:'#E8E3D7',alpha:.62,phase:.8,drift:13},
    {x:675,y:320,rx:300,ry:235,fill:'#D9D9D4',alpha:.6,phase:1.2,drift:14},
    {x:970,y:390,rx:270,ry:220,fill:'#E4E1D9',alpha:.6,phase:1.6,drift:14},
    {x:180,y:650,rx:290,ry:245,fill:'#D7D7D2',alpha:.67,phase:.5,drift:16},
    {x:860,y:690,rx:320,ry:260,fill:'#D3D4D0',alpha:.66,phase:1.1,drift:15}
  ];
  const mid=[
    {x:55,y:950,rx:265,ry:235,fill:'#E9E4DA',alpha:.84,phase:.7,drift:19,hatch:9},
    {x:320,y:940,rx:285,ry:230,fill:'#E1DED5',alpha:.87,phase:1.5,drift:18,hatch:9},
    {x:765,y:935,rx:305,ry:245,fill:'#DCDAD2',alpha:.88,phase:.1,drift:18,hatch:9},
    {x:1040,y:965,rx:270,ry:225,fill:'#E7E2D9',alpha:.82,phase:1.8,drift:17,hatch:9},
    {x:165,y:1200,rx:250,ry:220,fill:'#E3DFD5',alpha:.86,phase:.35,drift:19,hatch:10},
    {x:905,y:1190,rx:285,ry:235,fill:'#DDDAD1',alpha:.86,phase:1.35,drift:18,hatch:10}
  ];
  const front=[
    {x:-60,y:1510,rx:330,ry:275,fill:'#ECE7DC',alpha:.93,phase:.2,drift:24,hatch:9,outline:2.2},
    {x:1140,y:1490,rx:360,ry:290,fill:'#E7E2D8',alpha:.93,phase:1.2,drift:23,hatch:9,outline:2.2},
    {x:310,y:1710,rx:300,ry:230,fill:'#EAE5DB',alpha:.9,phase:.65,drift:22,hatch:10,outline:2},
    {x:800,y:1735,rx:330,ry:245,fill:'#E4E0D7',alpha:.91,phase:1.55,drift:21,hatch:10,outline:2}
  ];

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),q=L.onTwos(t);
    const settle=L.seg(t,.05,.75,'inOutCubic');
    const form=L.seg(t,.25,1.08,'outBack');
    const loop=L.seg(t,.72,1.35,'outExpo');

    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*8,seed:sd('stripes')});
    c.save();c.globalAlpha=.34;c.fillStyle=P.stripeSky;c.fillRect(0,250,1080,800);c.restore();

    // Start with the cloud a little wider/open, then settle toward shot 01's spatial rhythm.
    c.save();
    const z=lerp(.88,1,settle);
    c.translate(540,720);c.scale(z,z);c.translate(-540,-720);
    back.forEach((o,i)=>cloudLobe(c,L,P,o,t,i));
    mid.forEach((o,i)=>cloudLobe(c,L,P,o,t,20+i));
    c.restore();

    // Microdroplet population inherited from the schematic cloud field.
    const r=L.rng(sd('micro'));
    for(let i=0;i<64;i++){
      const a=r()*TAU,rad=150+r()*560;
      const pull=clamp(form*(.78+(i%6)*.035));
      const x=lerp(540+Math.cos(a)*rad,540+Math.cos(a)*rad*.88,pull)+Math.sin(q*.8+i)*5;
      const y=lerp(720+Math.sin(a)*rad*.8,720+Math.sin(a)*rad*.72,pull)+Math.cos(q*.7+i*.5)*3;
      const rr=3+r()*11;
      c.save();c.globalAlpha=.18+.36*(1-pull*.18);c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,rr,0,TAU);c.fill();c.strokeStyle=P.waterDeep;c.lineWidth=.7;c.stroke();c.restore();
    }

    // The tracked cluster visibly converges before becoming one precipitation-ready G1.
    const cluster=[
      [-72,-55,20],[-28,-78,16],[25,-65,18],[62,-35,15],[18,20,14],[-45,30,13]
    ];
    cluster.forEach((v,i)=>{
      const p=clamp(form-i*.035);
      const x=lerp(540+v[0],540+v[0]*.18,p),y=lerp(720+v[1],720+v[1]*.15,p),rr=lerp(v[2],6,p);
      c.save();c.globalAlpha=(1-p)*.72;c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,rr,0,TAU);c.fill();c.strokeStyle=P.waterDeep;c.lineWidth=1;c.stroke();c.restore();
    });

    hero(c,L,P,form);

    // One circular cycle arc appears, but fades before final frame so the loop is structural, not a decorative end card.
    if(loop>0){
      L.arcAnnotation(c,540,720,245,-2.5,-2.5+TAU*.86,{color:P.annYellow,width:2.2,p:loop,arrow:10,alpha:.28*(1-L.seg(t,1.18,1.5,'outQuad'))});
    }

    // Neighbour droplets approach G1, echoing shot 01's cold-open dynamics.
    const starts=[[360,665],[690,605],[655,810]];
    starts.forEach((s,i)=>{
      const p=L.seg(t,.5+i*.1,1.1+i*.07,'inOutCubic');
      if(p<=0)return;
      const x=lerp(s[0],540+(i-1)*58,p),y=lerp(s[1],720+(i===2?38:-34),p);
      c.save();c.globalAlpha=.32*(1-p*.8);c.fillStyle=P.waterPale;c.beginPath();c.arc(x,y,16+4*i,0,TAU);c.fill();c.strokeStyle=P.waterDeep;c.lineWidth=1.2;c.stroke();c.restore();
    });

    // Faint cloud circulation matches the opening visual language.
    const arcs=L.seg(t,.25,.9,'outExpo');
    if(arcs>0){
      L.arcAnnotation(c,540,720,315,3.4,5.55,{color:P.annBlue,width:2,p:arcs,arrow:10,alpha:.24*(1-L.seg(t,1.22,1.5,'outQuad'))});
      L.arcAnnotation(c,540,720,430,.2,2.0,{color:P.annBlue,width:1.6,p:Math.max(0,(arcs-.25)/.75),arrow:8,alpha:.18*(1-L.seg(t,1.22,1.5,'outQuad'))});
    }

    front.forEach((o,i)=>cloudLobe(c,L,P,o,t,40+i));

    // Exact G1 guide settles only late and stays fixed on the last frame for hard-loop compatibility.
    const g=L.seg(t,.95,1.35,'outExpo');
    if(g>0)L.guideCircle(c,540,720,150,{color:P.annYellow,alpha:.08+.18*g*(1-L.seg(t,1.35,1.5,'outQuad')),width:1.6,dash:[5,10]});
  }});
})();