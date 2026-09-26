// 02 · Beginning · T 1.500–4.000
// Layers:
// 1 blueprint plate
// 2 tissue/fluid field
// 3 exact G1 membrane + measurement geometry
// 4 dividing cell cluster
// 5 body-axis transformation
// 6 canonical 18-arc progress glyph
(function(){
  'use strict';

  const ID='cell-genesis';
  const TAU=Math.PI*2;
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

  function membranePts(cx,cy,rx,ry,phase,n=72){
    const out=[];
    for(let i=0;i<n;i++){
      const a=i/n*TAU;
      const wob=(Math.sin(a*3+phase)*2.2+Math.sin(a*7-phase*.6)*1.1);
      out.push([cx+Math.cos(a)*(rx+wob),cy+Math.sin(a)*(ry+wob*.72)]);
    }
    return out;
  }

  function drawMembrane(ctx,L,cx,cy,rx,ry,seed,alpha=1){
    const P=L.pal;
    const pts=membranePts(cx,cy,rx,ry,L.boil(L.T)*.12);
    L.inkPath(ctx,pts,{closed:true,color:P.lavender,alpha:.88*alpha,width:2.4,seed,wobble:.7,tremble:.18,boilAmp:.25,double:{offset:8,width:1.2,alpha:.45,seed:seed+1}});
    const inner=membranePts(cx,cy,rx-10,ry-10,L.boil(L.T)*.12+1.3);
    L.inkPath(ctx,inner,{closed:true,color:P.lavender,alpha:.34*alpha,width:1.2,seed:seed+2,wobble:.5,tremble:.15,boilAmp:.2});
  }

  function drawCytoplasm(ctx,L,cx,cy,rx,ry,seed,alpha=1){
    const P=L.pal;
    const clip=membranePts(cx,cy,rx-13,ry-13,0);
    L.stipple(ctx,clip,{spacing:18,r:[.6,1.25],density:.34,color:P.lavender,alpha:.18*alpha,seed,boilAmp:.18});
    L.hexLattice(ctx,clip,{r:18,width:.8,color:P.lavender,alpha:.08*alpha,jitter:.5,seed:seed+3,boilAmp:.12});
  }

  function drawCell(ctx,L,cx,cy,rx,ry,seed,alpha=1,nucleus=true){
    drawCytoplasm(ctx,L,cx,cy,rx,ry,seed+20,alpha);
    drawMembrane(ctx,L,cx,cy,rx,ry,seed,alpha);
    if(nucleus){
      L.guideCircle(ctx,cx,cy,Math.min(rx,ry)*.33,{color:L.pal.lavender,alpha:.22*alpha,width:1.1,dash:[3,6]});
      L.glowDot(ctx,cx,cy,10,{color:L.pal.schemSelf,core:L.pal.glow,rays:10,seed:seed+40,intensity:alpha,glow:4.8,twinkle:.08});
    }
  }

  function clusterLayout(count,p){
    if(count===1)return [[540,700,0]];
    if(count===2){
      const d=55*p;
      return [[540-d,700,0],[540+d,700,1]];
    }
    if(count===4){
      const d=60*p;
      return [[540-d,700-d*.72,0],[540+d,700-d*.72,1],[540-d,700+d*.72,2],[540+d,700+d*.72,3]];
    }
    const pts=[];
    for(let i=0;i<8;i++){
      const a=-Math.PI/2+i/8*TAU;
      const rr=i%2?84:70;
      pts.push([540+Math.cos(a)*rr*p,700+Math.sin(a)*rr*.78*p,i]);
    }
    return pts;
  }

  function drawCluster(ctx,L,t){
    const P=L.pal;
    let count=1,phase=0;
    if(t<.5){count=1;phase=L.seg(t,0,.45,'outExpo');}
    else if(t<1.0){count=2;phase=L.seg(t,.5,.82,'outBack');}
    else if(t<1.5){count=4;phase=L.seg(t,1.0,1.32,'outBack');}
    else{count=8;phase=L.seg(t,1.5,1.82,'outBack');}

    const pts=clusterLayout(count,Math.max(.15,phase));
    const radius=count===1?132:count===2?72:count===4?58:43;
    pts.forEach((q,i)=>{
      const squish=count===1?1:1+Math.sin(i*1.7)*.08;
      drawCell(ctx,L,q[0],q[1],radius*squish,radius*(1.02-.07*Math.cos(i)),sd('cell',count,i),1,true);
    });

    // faint mother-cell envelope persists through divisions
    if(count>1){
      L.guideCircle(ctx,540,700,150,{color:P.lavender,alpha:.13,width:1.2,dash:[4,8]});
      L.guideCircle(ctx,540,700,184,{color:P.lavender,alpha:.08,width:1,dash:[2,12]});
    }

    // mitotic bridges briefly flash on each division
    const beats=[.5,1.0,1.5];
    beats.forEach((b,i)=>{
      const q=t-b;
      if(q>=0&&q<.25){
        const a=1-clamp(q/.25);
        ctx.save();
        ctx.globalAlpha=a*.75;
        ctx.strokeStyle=P.magenta;
        ctx.lineWidth=2.5;
        ctx.beginPath();
        if(i===0){
          ctx.moveTo(500,700);ctx.lineTo(580,700);
        }else if(i===1){
          ctx.moveTo(540,630);ctx.lineTo(540,770);
          ctx.moveTo(480,700);ctx.lineTo(600,700);
        }else{
          for(let k=0;k<4;k++){
            const ang=-Math.PI/4+k*Math.PI/2;
            ctx.moveTo(540+Math.cos(ang)*35,700+Math.sin(ang)*35);
            ctx.lineTo(540+Math.cos(ang)*100,700+Math.sin(ang)*80);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  function drawField(ctx,L){
    const P=L.pal;
    // broad transparent tissue bands
    const bands=[
      {r:300,a:.08,rot:.15},{r:390,a:.06,rot:-.35},{r:480,a:.045,rot:.5}
    ];
    bands.forEach((b,i)=>{
      ctx.save();
      ctx.translate(540,700);
      ctx.rotate(b.rot);
      ctx.strokeStyle=L.rgba(P.lavender,b.a);
      ctx.lineWidth=1.2;
      ctx.setLineDash([9+i*2,13+i*3]);
      for(let y=-b.r;y<=b.r;y+=44){
        ctx.beginPath();
        ctx.ellipse(0,y*.35,b.r,36+i*7,0,0,TAU);
        ctx.stroke();
      }
      ctx.restore();
    });

    // drifting particulate
    const r=L.rng(sd('fluid'));
    ctx.save();
    ctx.fillStyle=P.paleBlue;
    for(let i=0;i<95;i++){
      const x=180+r()*720;
      const y=350+r()*720;
      const rr=.8+r()*1.6;
      const off=Math.sin(L.T*.7+i)*4;
      ctx.globalAlpha=.05+r()*.1;
      ctx.beginPath();
      ctx.arc(x+off,y-off*.35,rr,0,TAU);
      ctx.fill();
    }
    ctx.restore();

    // side measurement / brackets
    L.ticks(ctx,290,700,{r:232,n:36,len:9,major:6,majorLen:18,color:P.lavender,alpha:.22,width:1});
    L.bracket(ctx,360,520,360,880,{offset:-35,cap:14,color:P.lavender,alpha:.28,width:1.2,p:1});
    L.bracket(ctx,720,545,720,855,{offset:30,cap:14,color:P.lavender,alpha:.22,width:1.2,p:1});
  }

  function drawAxisMorph(ctx,L,t){
    const P=L.pal;
    const p=L.seg(t,2.0,2.5,'inOutCubic');
    if(p<=0)return;
    // cluster contracts and an axis extends down
    const top=lerp(700,560,p);
    const bot=lerp(700,1190,p);
    const width=lerp(0,72,p);
    ctx.save();
    ctx.globalAlpha=.18+.72*p;
    ctx.strokeStyle=P.lineWhite;
    ctx.lineCap='round';
    ctx.lineWidth=2.2;
    ctx.beginPath();
    ctx.moveTo(540,top);
    ctx.bezierCurveTo(540-width*.55,lerp(top,bot,.3),540+width*.72,lerp(top,bot,.67),540,bot);
    ctx.stroke();

    ctx.strokeStyle=P.lavender;
    ctx.lineWidth=1;
    for(let i=0;i<9;i++){
      const u=i/8;
      const y=lerp(top,bot,u);
      const w=Math.sin(Math.PI*u)*width;
      ctx.beginPath();
      ctx.moveTo(540-w,y);
      ctx.lineTo(540+w,y);
      ctx.stroke();
    }
    ctx.restore();

    // axial glow nodes condense into a vertical developmental gesture
    for(let i=0;i<6;i++){
      const u=i/5;
      const y=lerp(top,bot,u);
      const x=540+Math.sin(u*TAU)*width*.18;
      L.glowDot(ctx,x,y,4.5,{color:P.schemSelf,core:P.glow,rays:0,seed:sd('axis',i),intensity:p*.75,glow:3,twinkle:.04});
    }
  }

  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib,P=L.pal;
      const t=clamp(tIn,0,info.dur);

      L.blueprint(ctx,{seed:sd('blueprint'),center:[540,700],circles:5,diagonals:5});

      drawField(ctx,L);

      // Exact incoming G1, screen-fixed
      L.guideCircle(ctx,540,700,184,{color:P.lavender,alpha:.18,width:1.4,dash:[5,8]});
      L.guideCircle(ctx,540,700,150,{color:P.lineWhite,alpha:.68,width:2.2});
      L.ticks(ctx,540,700,{r:150,n:24,len:8,major:6,majorLen:16,color:P.lineWhite,alpha:.42,width:1.2});

      drawCluster(ctx,L,t);
      drawAxisMorph(ctx,L,t);

      // fertilisation/division change rings, short magenta events only
      [.5,1.0,1.5].forEach((b,i)=>{
        const q=t-b;
        if(q>=0&&q<.25){
          const p=clamp(q/.25);
          L.guideCircle(ctx,540,700,60+95*L.ease.outExpo(p),{color:P.magenta,alpha:(1-p)*.65,width:2.5,quadrants:8});
        }
      });

      progressGlyph(ctx,L,1);
    }
  });
})();
