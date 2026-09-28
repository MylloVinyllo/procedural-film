/*
Shot 01 · One life · T 0–1.5
Layers: paper/stripes, distant social field, G1 halo, hero, trajectory, attention ring.
*/
(function(){'use strict';
  const ID='adult-hero', G1={x:540,y:700,r:150};
  
  function person(ctx,L,P,x,y,s,o={}){
    const seed=o.seed||1, fill=o.fill||P.selfWarm, deep=o.deep||P.selfDeep;
    const age=o.age||'adult', lean=o.lean||0, step=o.step||0, arm=o.arm||0;
    const hh=(age==='infant'?86:age==='child'?70:56)*s;
    const hw=hh*0.78;
    const torso=(age==='infant'?145:age==='child'?230:340)*s;
    const shoulder=(age==='infant'?95:age==='child'?135:210)*s;
    const hip=shoulder*0.68;
    const top=y-torso;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(lean);
    ctx.fillStyle=fill;
    ctx.beginPath(); ctx.ellipse(0,top-hh*0.62,hw,hh,0,0,Math.PI*2); ctx.fill();
    L.inkPath(ctx,L.ellipsePts(0,top-hh*0.62,hw,hh,42),{closed:true,width:5*s,color:P.ink,seed:seed+1});
    const body=[[-shoulder/2,top],[-hip/2,-torso*0.08],[hip/2,-torso*0.08],[shoulder/2,top]];
    L.inkPath(ctx,body,{closed:true,width:5*s,color:P.ink,fill,seed:seed+2,double:{width:.32,offset:4*s}});
    const limb=(a,b,c,d,w,col,sd)=>{ctx.save();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(c,d);ctx.stroke();ctx.restore();L.inkLine(ctx,a,b,c,d,{width:3.4*s,color:P.ink,seed:sd});};
    const ay=top+torso*.2;
    limb(-shoulder*.43,ay,-shoulder*.70,ay+torso*(.34+arm*.12),38*s,fill,seed+3);
    limb( shoulder*.43,ay, shoulder*(.72+.12*arm),ay+torso*(.28-.16*arm),38*s,fill,seed+4);
    limb(-hip*.26,-torso*.06,-hip*(.42+.12*step),torso*.44,44*s,fill,seed+5);
    limb( hip*.26,-torso*.06, hip*(.42-.12*step),torso*(.44-.08*step),44*s,fill,seed+6);
    if(o.hatch){
      ctx.save();ctx.globalAlpha=.55;
      for(let k=0;k<8;k++) L.inkLine(ctx,-shoulder*.28+k*shoulder*.07,top+45*s,-shoulder*.05+k*shoulder*.06,top+110*s,{width:1.2*s,color:deep,seed:seed+30+k});
      ctx.restore();
    }
    ctx.restore();
  }

  FILM.scene({id:ID,draw(ctx,tIn,info){
    const L=info.lib,P=L.pal,E=L.ease,t=L.clamp(tIn,0,info.dur),tw=L.onTwos(t);
    const seed=L.hash(ID);
    L.paper(ctx); L.stripes(ctx,{colors:[P.stripeCream,P.stripeApricot],offset:info.T*12,seed:seed+1});
    ctx.save();ctx.globalAlpha=.22;
    person(ctx,L,P,210,1370,.58,{seed:seed+20,fill:P.socialBlue,deep:P.socialDeep,step:.2});
    person(ctx,L,P,850,1380,.54,{seed:seed+40,fill:P.socialBlue,deep:P.socialDeep,step:-.2});
    ctx.restore();
    L.arcAnnotation(ctx,G1.x,G1.y,G1.r,0,Math.PI*2,{color:P.cycleGold,width:4,alpha:.72,endTicks:0});
    L.guideCircle(ctx,G1.x,G1.y,G1.r+34,{color:P.annYellow,alpha:.12});
    const shift=t<.5?0:(tw<1?8:tw<1.25?-8:0);
    person(ctx,L,P,540+shift,1380,1,{seed:seed+100,fill:P.selfWarm,deep:P.selfDeep,hatch:true,lean:shift*.0008,step:shift/12});
    const pathP=L.clamp((t+.2)/1.2);
    const pts=[];for(let i=0;i<=40*pathP;i++){const u=i/40;pts.push([220+640*u,1320-560*u+50*Math.sin(u*Math.PI*1.3)]);}
    if(pts.length>1)L.inkPath(ctx,pts,{width:3,color:P.selfWarm,seed:seed+200,taper:[0,18]});
    const ring=L.clamp((t-.48)/.32);
    if(ring>0)L.arcAnnotation(ctx,G1.x,G1.y,G1.r+28*E.outExpo(ring),0,Math.PI*2,{color:P.annYellow,width:3,alpha:1-ring,endTicks:0});
    if(t>1.0){
      const gp=L.clamp((t-1.0)/.45);
      ctx.save();ctx.globalAlpha=.28*gp;
      L.inkLine(ctx,210,1160,355,1080,{width:2.5,color:P.socialBlue,seed:seed+240});
      L.inkLine(ctx,850,1160,725,1080,{width:2.5,color:P.socialBlue,seed:seed+241});
      ctx.restore();
    }
  }});
})();