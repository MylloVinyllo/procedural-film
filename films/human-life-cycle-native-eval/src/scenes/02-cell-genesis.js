// 02 Beginning · T 1.5–4.0
// Layers: blueprint base → tissue field → construction geometry → cell membranes → nuclei/activity → progress glyph.
(function () {
  'use strict';

  const ID='cell-genesis';
  const TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const smooth=(u)=>{u=clamp(u);return u*u*(3-2*u);};

  function progressGlyph(ctx,L,n){
    const P=L.pal;
    const cx=900,cy=300,r=72;
    ctx.save();
    ctx.lineCap='round';
    for(let i=0;i<18;i++){
      const a0=-Math.PI/2+i*TAU/18;
      const a1=-Math.PI/2+(i+0.72)*TAU/18;
      ctx.strokeStyle=i<n?P.lavender:(i===n?P.schemCycle:P.grid);
      ctx.globalAlpha=i<n?0.28:(i===n?1:0.22);
      ctx.lineWidth=i===n?4:2;
      ctx.beginPath();ctx.arc(cx,cy,r,a0,a1);ctx.stroke();
    }
    ctx.restore();
  }

  function line(ctx,pts,color,w=2,a=1,dash=null){
    ctx.save();ctx.strokeStyle=color;ctx.lineWidth=w;ctx.globalAlpha=a;
    ctx.lineCap='round';ctx.lineJoin='round';if(dash)ctx.setLineDash(dash);
    ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.stroke();ctx.restore();
  }

  function guideField(ctx,P,t){
    ctx.save();
    // two broad "tissue" contours
    ctx.strokeStyle=P.lavender;ctx.lineWidth=1.4;ctx.globalAlpha=0.11;
    for(let band=0;band<6;band++){
      ctx.beginPath();
      const yy=420+band*160;
      ctx.moveTo(80,yy);
      for(let x=80;x<=1000;x+=80){
        const y=yy+22*Math.sin(x*0.012+band*1.2+t*0.5);
        ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
    // vertical cell-ish lattice, broken so it reads as biological construction rather than UI grid
    ctx.globalAlpha=0.10;
    for(let x=125;x<990;x+=72){
      for(let y=360;y<1390;y+=66){
        const off=((x+y)/10)%2?12:0;
        ctx.strokeRect(x+off,y,48,34);
      }
    }
    // particles
    ctx.fillStyle=P.paleBlue;ctx.globalAlpha=0.24;
    for(let i=0;i<42;i++){
      const x=95+((i*149)%890);
      const y=330+((i*271)%1080)+6*Math.sin(t*1.5+i);
      const r=1.2+(i%3)*0.8;
      ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
    }
    ctx.restore();
  }

  function construction(ctx,P){
    // G1 and outer guides
    ctx.save();
    ctx.strokeStyle=P.lavender;ctx.lineWidth=1.5;ctx.globalAlpha=0.20;
    for(const r of [184,248,318]){
      ctx.beginPath();ctx.arc(540,700,r,0,TAU);ctx.stroke();
    }
    line(ctx,[[540,300],[540,1360]],P.lineWhite,1.2,0.20,[10,12]);
    line(ctx,[[170,700],[910,700]],P.lineWhite,1.1,0.13,[8,13]);
    for(let k=0;k<24;k++){
      const a=k*TAU/24;
      const r0=328,r1=k%3===0?356:344;
      line(ctx,[[540+Math.cos(a)*r0,700+Math.sin(a)*r0],[540+Math.cos(a)*r1,700+Math.sin(a)*r1]],P.lavender,1.2,k%3===0?0.40:0.20);
    }
    ctx.restore();
  }

  function cell(ctx,P,x,y,rx,ry,alpha,phase,primary){
    ctx.save();ctx.globalAlpha=alpha;
    // halo
    ctx.strokeStyle=primary?P.schemSelf:P.lavender;ctx.lineWidth=7;ctx.globalAlpha*=0.14;
    ctx.beginPath();ctx.ellipse(x,y,rx+11,ry+11,phase*0.03,0,TAU);ctx.stroke();
    // double membrane
    ctx.globalAlpha=alpha;
    ctx.strokeStyle=primary?P.schemSelf:P.lavender;ctx.lineWidth=2.4;
    ctx.beginPath();ctx.ellipse(x,y,rx,ry,phase*0.03,0,TAU);ctx.stroke();
    ctx.globalAlpha=alpha*0.42;ctx.lineWidth=1.2;
    ctx.beginPath();ctx.ellipse(x,y,rx-8,ry-7,phase*0.03,0,TAU);ctx.stroke();
    // internal faint fibres
    ctx.strokeStyle=P.paleBlue;ctx.globalAlpha=alpha*0.28;ctx.lineWidth=1;
    for(let k=0;k<7;k++){
      const a=k*TAU/7+phase*0.17;
      ctx.beginPath();
      ctx.moveTo(x+Math.cos(a)*rx*0.20,y+Math.sin(a)*ry*0.20);
      ctx.quadraticCurveTo(
        x+Math.cos(a+0.7)*rx*0.60,
        y+Math.sin(a+0.7)*ry*0.48,
        x+Math.cos(a+1.4)*rx*0.78,
        y+Math.sin(a+1.4)*ry*0.72
      );
      ctx.stroke();
    }
    // nucleus glow
    ctx.globalAlpha=alpha;
    const nr=Math.max(9,Math.min(rx,ry)*0.15);
    ctx.fillStyle=P.glow;
    ctx.shadowColor=P.glow;ctx.shadowBlur=18;
    ctx.beginPath();ctx.arc(x,y,nr,0,TAU);ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle=primary?P.schemSelf:P.lineWhite;
    ctx.beginPath();ctx.arc(x,y,nr*0.42,0,TAU);ctx.fill();
    // rays
    ctx.strokeStyle=primary?P.schemSelf:P.lineWhite;ctx.lineWidth=1.3;ctx.globalAlpha=alpha*0.72;
    for(let k=0;k<10;k++){
      const a=k*TAU/10;
      ctx.beginPath();
      ctx.moveTo(x+Math.cos(a)*(nr+8),y+Math.sin(a)*(nr+8));
      ctx.lineTo(x+Math.cos(a)*(nr+22),y+Math.sin(a)*(nr+22));
      ctx.stroke();
    }
    ctx.restore();
  }

  function clusterState(t){
    const p2=smooth((t-0.42)/0.28);
    const p4=smooth((t-0.92)/0.28);
    const p8=smooth((t-1.42)/0.28);
    if(t<0.42) return {n:1,p:0,next:2};
    if(t<0.92) return {n:2,p:p2,next:2};
    if(t<1.42) return {n:4,p:p4,next:4};
    return {n:8,p:p8,next:8};
  }

  const POS={
    1:[[0,0]],
    2:[[-62,0],[62,0]],
    4:[[-62,-58],[62,-58],[-62,58],[62,58]],
    8:[[-92,-86],[0,-92],[92,-78],[-110,18],[-35,8],[50,18],[118,10],[-12,100]]
  };

  function drawCluster(ctx,P,t){
    const st=clusterState(t);
    let arr=POS[st.n];
    let scale=st.n===1?1:st.n===2?0.72:st.n===4?0.57:0.44;
    const elong=smooth((t-2.0)/0.45);
    const cx=540,cy=700;
    for(let i=0;i<arr.length;i++){
      const [px,py]=arr[i];
      const ex=px*(1-0.22*elong);
      const ey=py*(1+0.70*elong)+i*elong*4;
      const pulse=0.5+0.5*Math.sin((t*7)+i*1.7);
      cell(ctx,P,cx+ex,cy+ey,112*scale*(1+0.018*pulse),104*scale*(1-0.02*pulse),1,i,i===0);
    }
    // cleavage seam flashes around division beats
    for(const beat of [0.5,1.0,1.5]){
      const u=1-clamp(Math.abs(t-beat)/0.09);
      if(u<=0)continue;
      ctx.save();ctx.strokeStyle=P.magenta;ctx.globalAlpha=u;ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(cx,cy,165+35*(1-u),0,TAU);ctx.stroke();ctx.restore();
    }
    if(elong>0){
      ctx.save();ctx.strokeStyle=P.schemSelf;ctx.lineWidth=2.4;ctx.globalAlpha=0.75*elong;
      ctx.beginPath();ctx.moveTo(cx,865);ctx.lineTo(cx,1130);ctx.stroke();
      for(let k=0;k<8;k++){
        const y=900+k*30;
        const w=38-k*2;
        ctx.beginPath();ctx.moveTo(cx-w,y);ctx.lineTo(cx+w,y);ctx.stroke();
      }
      ctx.restore();
    }
  }

  FILM.scene({
    id:ID,
    draw(ctx,tIn,info){
      const L=info.lib,P=L.pal;
      const t=clamp(tIn,0,info.dur);
      L.blueprint(ctx,{seed:2001});
      guideField(ctx,P,t);
      construction(ctx,P);
      drawCluster(ctx,P,t);
      progressGlyph(ctx,L,1);
    }
  });
})();