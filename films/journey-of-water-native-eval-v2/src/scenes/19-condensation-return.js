// 19 · Becoming cloud · T 33.000–34.500
// Blueprint return: vapor field → aerosol encounters → condensed shells → dense microdroplet cloud → emerging G1.
(function(){
  'use strict';
  const ID='condensation-return',TAU=Math.PI*2;
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
    c.fillStyle=P.schemWater;c.beginPath();c.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,0,TAU);c.fill();c.restore();
  }

  function dropShape(cx,cy,rx,ry,flat=.18){
    const pts=[],n=64;
    for(let i=0;i<n;i++){
      const a=i/n*TAU;let x=Math.cos(a)*rx,y=Math.sin(a)*ry;
      if(y>0){const u=y/ry;y*=1-flat*.12*u*u;x*=1+flat*.04*u;}
      pts.push([cx+x,cy+y]);
    }
    return pts;
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),q=L.onTwos(t);
    const cond=L.seg(t,.15,1.22,'inOutCubic');
    L.blueprint(c,{seed:sd('bp'),center:[540,760],circles:7,diagonals:5});
    progressGlyph(c,L,9);

    // G4 remains as the atmospheric macro field from the previous shot.
    L.guideCircle(c,540,760,165,{color:P.schemWater,alpha:.18+.12*(1-cond),width:1.7,dash:[6,8]});

    // Large-scale cooling/airflow geometry.
    for(let i=0;i<7;i++){
      const x=210+i*110;
      L.inkPath(c,[[x,1250],[x+30*Math.sin(i),980],[x-15*Math.cos(i*.8),700],[x+20*Math.sin(i*.5),430]],{
        color:P.schemFlow,width:1.1,alpha:.12+.12*(i%2),seed:sd('updraft',i),wobble:.08,tremble:.02,boilAmp:.03,taper:[4,8]
      });
    }
    const cool=L.seg(t,.05,.65,'outExpo');
    if(cool>0){
      for(let i=0;i<5;i++){
        const y=380+i*52;
        L.inkPath(c,[[150,y],[930,y+10*Math.sin(i)]],{color:P.paleBlue,width:.9,alpha:.08+.12*cool,seed:sd('cool',i),wobble:.05,tremble:.01});
      }
    }

    // Persistent vapor field, with the tracked four-point cluster inherited from shot 18.
    const vaporR=L.rng(sd('vapor'));
    const vapor=[];
    for(let i=0;i<76;i++){
      const x=130+vaporR()*820,y=340+vaporR()*1050;
      vapor.push([x,y,1.5+vaporR()*2.8,i%7===0]);
    }
    vapor.forEach((v,i)=>{
      const gather=clamp(cond*(.85+(i%5)*.04));
      const tx=540+(v[0]-540)*(1-.16*gather),ty=760+(v[1]-760)*(1-.1*gather);
      c.save();c.globalAlpha=.18+.36*(1-gather*.2);c.fillStyle=v[4]?P.schemWater:P.paleBlue;c.beginPath();c.arc(tx,ty,v[2],0,TAU);c.fill();c.restore();
    });

    // Aerosol nuclei are a separate, warmer population.
    const nuclei=[
      [310,610],[470,520],[650,570],[780,760],[380,900],[590,970],[720,1060],[475,1170],[845,980]
    ];
    nuclei.forEach((n,i)=>{
      c.save();c.globalAlpha=.34+.28*cond;c.fillStyle=P.aerosolDust;c.beginPath();c.arc(n[0],n[1],3+(i%2),0,TAU);c.fill();c.restore();
      if(cond>0){
        const shell=lerp(6,18+(i%3)*4,cond);
        L.guideCircle(c,n[0],n[1],shell,{color:i%3===0?P.schemWater:P.lavender,alpha:.2+.35*cond,width:1.2});
      }
    });

    // First phase-change flash at one aerosol encounter.
    const flash=L.seg(t,.35,.52,'outExpo')*(1-L.seg(t,.65,.9,'outQuad'));
    if(flash>0)L.guideCircle(c,470,520,20+70*flash,{color:P.magenta,alpha:.52*(1-flash*.22),width:2.4,quadrants:8});

    // Growing droplet field: many liquid shells become visible progressively.
    const dR=L.rng(sd('drops'));
    for(let i=0;i<86;i++){
      const a=dR()*TAU,rad=100+dR()*470;
      const baseX=540+Math.cos(a)*rad,baseY=760+Math.sin(a)*rad*.78;
      const appear=L.seg(t,.38+(i%8)*.035,1.18,'outBack');
      if(appear<=0)continue;
      const rr=(3+dR()*8)*(0.45+.55*appear);
      const driftX=Math.sin(q*.8+i)*5,driftY=Math.cos(q*.7+i*.4)*3;
      c.save();c.globalAlpha=.16+.44*appear;c.strokeStyle=i%6===0?P.schemWater:P.lavender;c.lineWidth=.8+(i%3)*.18;
      c.beginPath();c.arc(baseX+driftX,baseY+driftY,rr,0,TAU);c.stroke();c.restore();
    }

    // Three readable coalescence zones.
    const zones=[[365,715],[690,690],[610,1000]];
    zones.forEach((z,i)=>{
      const p=L.seg(t,.6+i*.12,1.18+i*.07,'inOutCubic');
      if(p<=0)return;
      const sep=lerp(48,8,p),r1=lerp(14,28,p),r2=lerp(11,25,p);
      c.save();c.globalAlpha=.24+.48*p;c.strokeStyle=P.schemWater;c.lineWidth=1.5;
      c.beginPath();c.arc(z[0]-sep,z[1],r1,0,TAU);c.stroke();
      c.beginPath();c.arc(z[0]+sep,z[1]+5,r2,0,TAU);c.stroke();c.restore();
      if(p>.68)L.guideCircle(c,z[0],z[1],34+28*(p-.68)/.32,{color:P.magenta,alpha:.24*(1-(p-.68)/.32),width:1.8,quadrants:6});
    });

    // The tracked vapor cluster reconverges as a liquid cluster.
    const hero=L.seg(t,.2,1.25,'inOutCubic');
    if(hero>0){
      for(let i=0;i<4;i++){
        const sx=540+(i-1.5)*32,sy=470-i*35;
        const x=lerp(sx,540+(i-1.5)*13,hero),y=lerp(sy,720+(i%2)*12,hero);
        L.glowDot(c,x,y,lerp(4.5,6.5,hero),{color:i===1?P.schemCycle:P.schemWater,core:P.glow,rays:0,seed:sd('hero',i),intensity:.58+.24*hero,glow:2.4,twinkle:.02});
      }
    }

    // Pull-back: a cloud-lobe density boundary becomes legible from the microdroplet field.
    const lobe=L.seg(t,.85,1.42,'outExpo');
    if(lobe>0){
      const pts=[];
      for(let i=0;i<72;i++){
        const a=i/72*TAU;
        const scallop=1+.08*Math.sin(a*5)+.04*Math.sin(a*8+1.2);
        pts.push([540+Math.cos(a)*265*scallop,760+Math.sin(a)*210*(1+.04*Math.sin(a*4))]);
      }
      L.inkPath(c,pts,{closed:true,color:P.lavender,width:1.5,alpha:.15+.3*lobe,seed:sd('cloud-lobe'),wobble:.15,tremble:.04,boilAmp:.04});
      L.stipple(c,pts,{spacing:17,r:[.45,1.15],density:.18*lobe,color:P.paleBlue,alpha:.18+.15*lobe,seed:sd('cloud-density'),boilAmp:.03});
    }

    // Future G1 emerges only near the exit.
    const g1=L.seg(t,1.18,1.5,'outExpo');
    if(g1>0){
      const pts=dropShape(540,720,105,90,.28);
      L.inkPath(c,pts,{closed:true,color:P.lavender,width:2.4,alpha:.2+.7*g1,seed:sd('g1'),wobble:.12,tremble:.03,boilAmp:.04});
      const inner=dropShape(540,720,96,82,.28);
      L.inkPath(c,inner,{closed:true,color:P.lavender,width:1.2,alpha:.18+.32*g1,seed:sd('g1i'),wobble:.08,tremble:.02,boilAmp:.03});
      L.glowDot(c,506,692,8,{color:P.schemCycle,core:P.glow,rays:0,seed:sd('g1glint'),intensity:.7+.2*g1,glow:3,twinkle:.02});
      L.guideCircle(c,540,720,150,{color:P.schemWater,alpha:.1+.16*g1,width:1.2,dash:[5,9]});
    }

    // Measurement brackets on condensation shell scale and cloud-scale field.
    const br=L.seg(t,.25,.85,'outExpo');
    if(br>0){
      L.bracket(c,250,1320,480,1320,{color:P.lavender,alpha:.28*br,width:1.1,p:br});
      L.bracket(c,680,1320,900,1320,{color:P.lavender,alpha:.2*br,width:1.1,p:br});
    }
  }});
})();