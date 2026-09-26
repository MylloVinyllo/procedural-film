// 06 · Another path · T 9.000–10.500
// Blueprint leaf cross-section / stomatal branch. Hero remains on the surface route while transpiration is shown as an alternate path.
(function(){
  'use strict';
  const ID='leaf-stomata',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function progressGlyph(c,L,current){
    const P=L.pal,cx=900,cy=300,r=72,n=12;
    c.save();c.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+i/n*TAU,a1=-Math.PI/2+(i+.62)/n*TAU;
      c.beginPath();c.arc(cx,cy,r,a0,a1);
      if(i<current){c.strokeStyle=L.rgba(P.lavender,.25);c.lineWidth=2;}
      else if(i===current){c.strokeStyle=P.schemCycle;c.lineWidth=4;}
      else{c.strokeStyle=L.rgba(P.grid,.2);c.lineWidth=2;}
      c.stroke();
    }
    const a=-Math.PI/2+(current+.58)/n*TAU;
    c.fillStyle=P.schemWater;c.beginPath();c.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,0,TAU);c.fill();
    c.restore();
  }

  function cellBand(c,L,P,y,h,count,seed,alpha=.55){
    const left=115,right=965,w=(right-left)/count;
    for(let i=0;i<count;i++){
      const x=left+i*w;
      const j=(i%2)*6-3;
      const pts=[
        [x+3,y+4+j],[x+w-5,y+2-j],[x+w-1,y+h*.5],[x+w-6,y+h-3+j],[x+5,y+h-1-j],[x+1,y+h*.48]
      ];
      L.inkPath(c,pts,{closed:true,color:P.lavender,width:1.1,alpha,seed:seed+i,wobble:.25,tremble:.06,boilAmp:.07});
      if(i%3===0)L.glowDot(c,x+w*.52,y+h*.5,2.2,{color:P.schemWater,core:P.glow,rays:0,seed:seed+100+i,intensity:.38,glow:1.5,twinkle:.01});
    }
  }

  function guardCell(c,L,P,cx,cy,side,open,seed){
    const sx=side<0?-1:1;
    const pts=[];
    for(let i=0;i<40;i++){
      const a=i/40*TAU;
      const rx=58,ry=88;
      const bend=side*(22+12*open)*Math.sin(a);
      const x=cx+sx*72+Math.cos(a)*rx+bend*.38;
      const y=cy+Math.sin(a)*ry;
      pts.push([x,y]);
    }
    c.save();c.globalAlpha=.72;
    L.inkPath(c,pts,{closed:true,color:P.lavender,width:2,alpha:.82,seed,wobble:.2,tremble:.05,boilAmp:.06});
    L.hexLattice(c,pts,{r:10,jitter:.6,width:.6,color:P.paleBlue,alpha:.17,seed:seed+1,boilAmp:.04,clip:true});
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.blueprint(c,{seed:sd('bp'),center:[540,820],circles:6,diagonals:4});
    progressGlyph(c,L,3);

    // exact G2 macro field and surface reservoir
    L.guideCircle(c,540,820,118,{color:P.schemWater,alpha:.32,width:2,dash:[6,8]});
    const surface=L.ellipsePts(540,690,116,38,44);
    c.save();c.globalAlpha=.22+.28*(1-L.seg(t,1.15,1.5));c.strokeStyle=P.schemWater;c.lineWidth=2;c.beginPath();L.tracePath(c,surface,true);c.stroke();c.restore();
    L.glowDot(c,607,755,7,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('hero'),intensity:.86,glow:2.5,twinkle:.02});

    // leaf tissue cross-section draws in progressively
    const tissue=L.seg(t,.12,.48,'outExpo');
    if(tissue>0){
      c.save();c.globalAlpha=tissue;
      // cuticle / epidermis
      L.inkPath(c,[[115,610],[965,610]],{color:P.lineWhite,width:2,alpha:.45,seed:sd('cuticle'),wobble:.15,tremble:.04});
      cellBand(c,L,P,635,115,10,sd('upper'),.42);
      cellBand(c,L,P,760,165,8,sd('meso1'),.34);
      cellBand(c,L,P,930,150,9,sd('meso2'),.31);
      cellBand(c,L,P,1090,105,11,sd('lower'),.42);
      c.restore();
    }

    // vascular/tissue branch: alternate plant-water path moves through cells toward stomata.
    const route=[
      [250,1120],[320,1040],[370,940],[430,865],[505,820],[600,900],[690,1010],[760,1120]
    ];
    const rp=L.seg(t,.35,1.05,'inOutCubic');
    if(rp>0){
      const n=Math.max(2,Math.round(route.length*rp));
      L.inkPath(c,L.smoothPts(route.slice(0,n),false,4),{color:P.schemWater,width:3,alpha:.58,seed:sd('plant-route'),wobble:.12,tremble:.03,boilAmp:.04,taper:[6,10]});
      for(let i=0;i<5;i++){
        const u=clamp(rp-i*.09);
        if(u<=0)continue;
        const idx=Math.min(route.length-2,Math.floor(u*(route.length-1)));
        const f=u*(route.length-1)-idx,A=route[idx],B=route[idx+1];
        L.glowDot(c,lerp(A[0],B[0],f),lerp(A[1],B[1],f),3,{color:P.schemWater,core:P.glow,rays:0,seed:sd('bead',i),intensity:.55,glow:1.7,twinkle:.01});
      }
    }

    // stomatal apparatus at lower-right
    const open=L.seg(t,.45,.95,'inOutCubic');
    guardCell(c,L,P,785,1205,-1,open,sd('guardL'));
    guardCell(c,L,P,785,1205,1,open,sd('guardR'));
    const gap=lerp(10,38,open);
    c.save();c.globalAlpha=.5+.35*open;c.strokeStyle=P.lineWhite;c.lineWidth=1.6;c.beginPath();c.moveTo(785-gap*.5,1118);c.lineTo(785-gap*.5,1290);c.moveTo(785+gap*.5,1118);c.lineTo(785+gap*.5,1290);c.stroke();c.restore();

    // vapor points separate only after the alternate water path reaches the stomata.
    const vap=L.seg(t,.72,1.28,'outExpo');
    if(vap>0){
      const r=L.rng(sd('vapor'));
      for(let i=0;i<22;i++){
        const u=clamp(vap-i*.025);
        if(u<=0)continue;
        const x=785+(r()-.5)*95*u;
        const y=1125-390*u-r()*80;
        c.save();c.globalAlpha=.22+.5*(1-u*.45);c.fillStyle=P.schemWater;c.beginPath();c.arc(x,y,2+r()*2.8,0,TAU);c.fill();c.restore();
      }
      L.arcAnnotation(c,785,1045,118,2.65,4.35,{color:P.schemFlow,width:1.8,p:vap,arrow:9,alpha:.42});
    }

    // measurement bracket across the tissue
    const br=L.seg(t,.18,.55,'outExpo');
    if(br>0)L.bracket(c,160,610,160,1195,{color:P.lavender,alpha:.38*br,width:1.3,p:br,offset:-18});

    // hero route is not the transpiration branch: it brightens on the leaf surface and heads to the edge/downward.
    const hero=L.seg(t,1.0,1.48,'outExpo');
    if(hero>0){
      const pts=[[607,755],[680,770],[760,790],[850,825],[940,900]];
      const n=Math.max(2,Math.round(pts.length*hero));
      L.inkPath(c,L.smoothPts(pts.slice(0,n),false,3),{color:P.schemCycle,width:2.8,alpha:.68,seed:sd('hero-route'),wobble:.12,tremble:.03,taper:[5,10]});
      const e=pts[Math.min(pts.length-1,n-1)];
      L.glowDot(c,e[0],e[1],6,{color:P.schemCycle,core:P.glow,rays:5,seed:sd('hero-end'),intensity:.7,glow:2.6,twinkle:.02});
    }

    // split cue visually distinguishes the alternate branch from the continuing hero branch.
    const split=L.seg(t,.55,.9,'outBack');
    if(split>0)L.guideCircle(c,607,755,36+42*split,{color:P.magenta,alpha:.34*(1-L.seg(t,.9,1.2)),width:2,quadrants:6});
  }});
})();