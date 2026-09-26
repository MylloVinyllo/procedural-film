// 18 · Again · T 30.500–32.000
// Layers: blueprint · incoming G1 · received continuity seed · growth lattice · cycle glyph · closing wordmark
(function(){
  'use strict';
  const ID='seed-loop',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  // Canonical progress glyph. Copy this function byte-for-byte into every schematic scene.
  function progressGlyph(ctx,L,current){
    const P=L.pal;
    const cx=900,cy=300,r=72,n=18;
    ctx.save();
    ctx.lineCap='round';
    for(let i=0;i<n;i++){
      const a0=-Math.PI/2+(i/n)*TAU;
      const a1=-Math.PI/2+((i+.72)/n)*TAU;
      ctx.beginPath();
      ctx.arc(cx,cy,r,a0,a1);
      if(i<current){
        ctx.strokeStyle=L.rgba(P.lavender,.28);
        ctx.lineWidth=2;
      }else if(i===current){
        ctx.strokeStyle=P.schemCycle;
        ctx.lineWidth=4;
      }else{
        ctx.strokeStyle=L.rgba(P.grid,.22);
        ctx.lineWidth=2;
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function ellipsePoly(cx,cy,rx,ry,n=42){
    const out=[];
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      out.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);
    }
    return out;
  }

  function membrane(c,L,P,cx,cy,rx,ry,seed,a=1){
    const pts=[];
    const bi=L.boil(L.T);
    for(let i=0;i<72;i++){
      const u=i/72*TAU;
      const wob=Math.sin(u*3+bi*.11)*2+Math.sin(u*7-bi*.07)*.9;
      pts.push([cx+Math.cos(u)*(rx+wob),cy+Math.sin(u)*(ry+wob*.65)]);
    }
    L.inkPath(c,pts,{closed:true,color:P.lineWhite,alpha:.72*a,width:2.2,seed,wobble:.6,tremble:.15,boilAmp:.2,double:{offset:9,width:1.1,alpha:.35,seed:seed+1}});
  }

  function daughter(c,L,P,x,y,r,seed,a=1){
    membrane(c,L,P,x,y,r,r*.92,seed,a);
    const clip=ellipsePoly(x,y,r-10,r*.92-10,40);
    L.hexLattice(c,clip,{r:12,width:.8,color:P.lavender,alpha:.11*a,jitter:.4,seed:seed+2,boilAmp:.12});
    L.stipple(c,clip,{spacing:15,r:[.5,1.1],density:.26,color:P.paleBlue,alpha:.12*a,seed:seed+3,boilAmp:.12});
    L.glowDot(c,x,y,7,{color:P.schemSelf,core:P.glow,rays:6,seed:seed+4,intensity:.55+.45*a,glow:4,twinkle:.03});
  }

  function traceHistory(c,L,P,t){
    // very faint echoes from prior geometric contracts, converging on G1
    c.save();
    c.strokeStyle=L.rgba(P.lavender,.13);
    c.lineWidth=1;
    c.setLineDash([4,9]);

    // G2 head echo
    c.beginPath();c.ellipse(310,1120,72,92,0,0,TAU);c.stroke();
    // G3 social node echo
    c.beginPath();c.arc(790,1080,48,0,TAU);c.stroke();
    // G4 handoff echo
    c.beginPath();c.arc(540,1380,18,0,TAU);c.stroke();

    [[310,1120],[790,1080],[540,1380]].forEach((p,i)=>{
      c.beginPath();c.moveTo(p[0],p[1]);c.quadraticCurveTo(540,980-i*45,540,700);c.stroke();
    });
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);

      L.blueprint(c,{seed:sd('blueprint'),center:[540,700],circles:6,diagonals:5});
      traceHistory(c,L,P,t);

      // Exact incoming G1, screen-fixed and already present on frame zero.
      L.guideCircle(c,540,700,184,{color:P.lavender,alpha:.18,width:1.4,dash:[5,8]});
      L.guideCircle(c,540,700,150,{color:P.lineWhite,alpha:.72,width:2.2});
      L.ticks(c,540,700,{r:150,n:24,len:8,major:6,majorLen:16,color:P.lineWhite,alpha:.38,width:1.1});

      // received seed arrives as the same gold continuity point, then becomes biological possibility
      const seedLift=L.seg(t,0,.35,'outBack');
      const sx=lerp(540,540,seedLift),sy=lerp(920,700,seedLift);
      L.glowDot(c,sx,sy,8,{color:P.schemCycle,core:P.glow,rays:8,seed:sd('seed'),intensity:.65+.35*seedLift,glow:4.4,twinkle:.03});

      // one founding cell gathers around the point
      const gather=L.seg(t,.18,.55,'outExpo');
      if(gather>0){
        const r=lerp(16,118,gather);
        membrane(c,L,P,540,700,r,r*.94,sd('mother'),gather);
        const clip=ellipsePoly(540,700,Math.max(8,r-12),Math.max(8,r*.94-12),42);
        L.stipple(c,clip,{spacing:17,r:[.5,1.2],density:.28*gather,color:P.paleBlue,alpha:.13+.12*gather,seed:sd('mother-stipple'),boilAmp:.12});
      }

      // closing division, mirroring shot 02 without claiming literal repetition of the same person
      const div=L.seg(t,.78,1.18,'outBack');
      if(div>0){
        const sep=lerp(0,62,div);
        c.save();c.globalAlpha=1-L.seg(t,.78,.92,'outQuad');
        membrane(c,L,P,540,700,118,112,sd('mother-fade'),1);
        c.restore();
        daughter(c,L,P,540-sep,700,66,sd('d0'),div);
        daughter(c,L,P,540+sep,700,66,sd('d1'),div);

        const flash=t-.78;
        if(flash>=0&&flash<.25){
          const fp=clamp(flash/.25);
          L.guideCircle(c,540,700,55+105*L.ease.outExpo(fp),{color:P.magenta,alpha:(1-fp)*.62,width:2.5,quadrants:8});
        }
      }

      // cycle geometry resets to opening state rather than merely placing a decorative circle at the end
      const reset=L.seg(t,.95,1.42,'outExpo');
      if(reset>0){
        L.guideCircle(c,540,700,150+34*reset,{color:P.schemCycle,alpha:.22+.28*reset,width:1.6,dash:[6,8]});
        c.save();
        c.strokeStyle=P.schemCycle;
        c.lineWidth=2.2;
        c.globalAlpha=.3+.55*reset;
        c.beginPath();
        c.arc(540,700,222,-Math.PI*.85,-Math.PI*.85+TAU*.84*reset);
        c.stroke();
        const a=-Math.PI*.85+TAU*.84*reset;
        const ex=540+Math.cos(a)*222,ey=700+Math.sin(a)*222;
        c.fillStyle=P.schemCycle;
        c.beginPath();
        c.moveTo(ex+Math.cos(a+Math.PI/2)*11,ey+Math.sin(a+Math.PI/2)*11);
        c.lineTo(ex+Math.cos(a)*18,ey+Math.sin(a)*18);
        c.lineTo(ex+Math.cos(a-Math.PI/2)*11,ey+Math.sin(a-Math.PI/2)*11);
        c.closePath();c.fill();
        c.restore();
      }

      progressGlyph(c,L,17);

      // native closing wordmark, deliberately the only schematic text in the film
      const wm=L.seg(t,1.0,1.42,'outQuad');
      if(wm>0){
        L.text(c,'human',540,1470,{size:44,weight:300,color:P.lavender,alpha:.84*wm,align:'center',baseline:'alphabetic',tracking:'0.12em'});
      }
    }
  });
})();