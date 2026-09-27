(function(){
  'use strict';
  const V=FILM.visual,P=FILM.lib.pal;
  function frame(o){const x=o.x||0,y=o.y||0,s=o.scale!=null?o.scale:1;return {x,y,s};}
  function localToWorld(f,p){return [f.x+p[0]*f.s,f.y+p[1]*f.s];}
  function anchors(o={}){
    const f=frame(o);
    return {
      recordCenter:localToWorld(f,[0,-64]),
      clamp:localToWorld(f,[0,-82]),
      brushPivot:localToWorld(f,[-168,-103]),
      vacuumPivot:localToWorld(f,[168,-103]),
      startButton:localToWorld(f,[-72,118]),
      reverseButton:localToWorld(f,[72,118]),
      pumpButton:localToWorld(f,[-72,184]),
      vacuumButton:localToWorld(f,[72,184])
    };
  }
  function draw(ctx,o={}){
    const f=frame(o),active=o.active||null;
    ctx.save();ctx.translate(f.x,f.y);ctx.scale(f.s,f.s);

    const top=[[-220,-10],[170,-10],[238,72],[-252,72]];
    const front=[[-252,72],[238,72],[214,250],[-224,250]];
    const side=[[170,-10],[238,72],[214,250],[158,177]];
    const poly=(pts,fill,stroke=P.mylloEdge,w=3)=>{ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.stroke();};

    // floor shadow gives the product weight without baking scene perspective into its geometry.
    ctx.save();ctx.globalAlpha=.16;ctx.fillStyle=P.ink;ctx.beginPath();ctx.ellipse(-4,250,226,28,0,0,Math.PI*2);ctx.fill();ctx.restore();

    poly(front,P.mylloBody);poly(side,P.mylloEdge);poly(top,P.mylloTop);
    // narrow front bevel and feet make the cabinet read as an object, not a trapezoid.
    ctx.strokeStyle=P.machineDeep;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-238,84);ctx.lineTo(224,84);ctx.stroke();
    ctx.fillStyle=P.mylloEdge;ctx.beginPath();ctx.roundRect(-181,239,54,20,8);ctx.roundRect(114,239,54,20,8);ctx.fill();

    // platter / record support
    ctx.fillStyle=P.vinylEdge;ctx.strokeStyle=P.groove;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-64,150,55,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.strokeStyle=P.mylloButton;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-64,132,46,0,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle=P.metal;ctx.beginPath();ctx.arc(0,-64,7,0,Math.PI*2);ctx.fill();

    const node=(px,kind)=>{
      ctx.fillStyle=P.metal;ctx.strokeStyle=P.mylloButton;ctx.lineWidth=3;
      ctx.beginPath();ctx.roundRect(px-12,-104,24,80,7);ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.arc(px,-105,18,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=P.mylloTop;ctx.beginPath();ctx.arc(px,-105,7,0,Math.PI*2);ctx.fill();
      ctx.save();ctx.translate(px,-104);ctx.rotate(kind==='brush'?.23:-.23);
      ctx.fillStyle=P.metal;ctx.strokeStyle=P.mylloButton;ctx.beginPath();ctx.roundRect(-8,-8,142,20,10);ctx.fill();ctx.stroke();
      if(kind==='brush'){
        ctx.strokeStyle=P.mylloBristle;ctx.lineWidth=2;
        for(let i=18;i<128;i+=9){ctx.beginPath();ctx.moveTo(i,12);ctx.lineTo(i+2,29);ctx.stroke();}
      }else{
        ctx.strokeStyle=P.vinyl;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(16,16);ctx.lineTo(126,16);ctx.stroke();
        ctx.strokeStyle=P.metal;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(23,11);ctx.lineTo(119,11);ctx.stroke();
      }
      ctx.restore();
    };
    node(-168,'brush');node(168,'vacuum');

    // front control plate
    ctx.fillStyle=P.mylloPanel;ctx.strokeStyle=P.mylloPanelInk;ctx.lineWidth=2.5;ctx.beginPath();ctx.roundRect(-126,91,252,139,14);ctx.fill();ctx.stroke();
    const button=(x,y,name,label)=>{
      const on=active===name;
      ctx.fillStyle=on?P.mylloRingActive:P.mylloButton;ctx.beginPath();ctx.arc(x,y,13,0,Math.PI*2);ctx.fill();
      if(on){ctx.strokeStyle=P.cleanGold;ctx.lineWidth=5;ctx.globalAlpha=.36;ctx.beginPath();ctx.arc(x,y,21,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;}
      ctx.fillStyle=P.mylloPanelInk;ctx.font='700 8px system-ui';ctx.textAlign='center';ctx.fillText(label,x,y+29);
    };
    button(-72,118,'START','START');button(72,118,'REVERSE','REVERSE');button(-72,184,'PUMP','PUMP');button(72,184,'VACUUM','VACUUM');
    ctx.fillStyle=P.mylloPanelInk;ctx.font='800 19px system-ui';ctx.textAlign='center';ctx.fillText('MYLLO VINYLLO',0,158);

    // side ventilation slots, perspective-stable detail.
    ctx.strokeStyle=P.machineDeep;ctx.lineWidth=3;ctx.globalAlpha=.55;
    for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(181,98+i*22);ctx.lineTo(216,111+i*18);ctx.stroke();}
    ctx.globalAlpha=1;
    ctx.restore();
  }
  V.registerProduct('myllo-rcm',{draw,anchors});
})();