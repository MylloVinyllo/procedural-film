(function(){
  'use strict';
  const V=FILM.visual;
  function frame(o){
    const x=o.x||0,y=o.y||0,s=o.scale!=null?o.scale:1;
    return {x,y,s};
  }
  function localToWorld(f,p){return [f.x+p[0]*f.s,f.y+p[1]*f.s];}
  function anchors(o={}){
    const f=frame(o);
    return {
      recordCenter:localToWorld(f,[0,-64]),
      clamp:localToWorld(f,[0,-82]),
      startButton:localToWorld(f,[-72,118]),
      reverseButton:localToWorld(f,[72,118]),
      pumpButton:localToWorld(f,[-72,184]),
      vacuumButton:localToWorld(f,[72,184])
    };
  }
  function draw(ctx,o={}){
    const f=frame(o),active=o.active||null;
    ctx.save();ctx.translate(f.x,f.y);ctx.scale(f.s,f.s);

    // one authored perspective cage, reused in every scene
    const top=[[-220,-10],[170,-10],[238,72],[-252,72]];
    const front=[[-252,72],[238,72],[214,250],[-224,250]];
    const side=[[170,-10],[238,72],[214,250],[158,177]];
    const poly=(pts,fill,stroke='#1b1d21',w=3)=>{ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.stroke();};
    poly(front,'#292c31');poly(side,'#15171a');poly(top,'#35393f');

    // platter/record support
    ctx.fillStyle='#111317';ctx.strokeStyle='#4a4f57';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-64,150,55,0,0,Math.PI*2);ctx.fill();ctx.stroke();

    // two distinct working nodes with grounded pivots
    const node=(px,kind)=>{
      ctx.fillStyle='#aeb4ba';ctx.strokeStyle='#30343a';ctx.lineWidth=3;
      ctx.fillRect(px-11,-101,22,74);ctx.strokeRect(px-11,-101,22,74);
      ctx.beginPath();ctx.arc(px,-103,17,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.save();ctx.translate(px,-102);ctx.rotate(kind==='brush'?.23:-.23);
      ctx.beginPath();ctx.roundRect(-8,-8,142,20,10);ctx.fill();ctx.stroke();
      if(kind==='brush'){
        ctx.strokeStyle='#d5c2a4';ctx.lineWidth=2;
        for(let i=18;i<128;i+=9){ctx.beginPath();ctx.moveTo(i,12);ctx.lineTo(i+2,31);ctx.stroke();}
      }else{
        ctx.strokeStyle='#191a1e';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(16,16);ctx.lineTo(126,16);ctx.stroke();
      }
      ctx.restore();
    };
    node(-168,'brush');node(168,'vacuum');

    // front control plate
    ctx.fillStyle='#e4e2da';ctx.strokeStyle='#23262b';ctx.lineWidth=2.5;ctx.beginPath();ctx.roundRect(-120,92,240,136,13);ctx.fill();ctx.stroke();
    const button=(x,y,name)=>{
      const on=active===name;
      ctx.fillStyle=on?'#d69f38':'#454a52';ctx.beginPath();ctx.arc(x,y,13,0,Math.PI*2);ctx.fill();
      if(on){ctx.strokeStyle='#f6d978';ctx.lineWidth=5;ctx.globalAlpha=.35;ctx.beginPath();ctx.arc(x,y,21,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;}
    };
    button(-72,118,'START');button(72,118,'REVERSE');button(-72,184,'PUMP');button(72,184,'VACUUM');
    ctx.fillStyle='#25282d';ctx.font='800 20px system-ui';ctx.textAlign='center';ctx.fillText('MYLLO VINYLLO',0,158);
    ctx.restore();
  }
  V.registerProduct('myllo-rcm',{draw,anchors});
})();