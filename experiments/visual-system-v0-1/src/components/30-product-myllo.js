(function(){
  'use strict';
  const V=FILM.visual,P=FILM.lib.pal;
  const SPEC=Object.freeze({
    sku:'MV-RCM01',
    physicalMm:Object.freeze({width:350,depth:350,height:200}),
    features:Object.freeze({liquidFeed:'automated',brush:'dual-goat-hair',clamp:'aluminium',collection:'vacuum'})
  });
  const GEO=Object.freeze({
    record:[-4,-104],recordR:[172,63],
    brushPivot:[-170,-142],vacuumPivot:[158,-142],
    panel:[20,111,76],
    controls:Object.freeze({START:[-25,77],REVERSE:[64,77],PUMP:[-25,146],VACUUM:[64,146]})
  });

  function frame(o){return {x:o.x||0,y:o.y||0,s:o.scale!=null?o.scale:1};}
  function world(f,p){return [f.x+p[0]*f.s,f.y+p[1]*f.s];}
  function anchors(o={}){
    const f=frame(o),c=GEO.controls;
    return {
      recordCenter:world(f,GEO.record),
      recordRadii:[GEO.recordR[0]*f.s,GEO.recordR[1]*f.s],
      clamp:world(f,[GEO.record[0],GEO.record[1]-7]),
      brushPivot:world(f,GEO.brushPivot),vacuumPivot:world(f,GEO.vacuumPivot),
      startButton:world(f,c.START),reverseButton:world(f,c.REVERSE),
      pumpButton:world(f,c.PUMP),vacuumButton:world(f,c.VACUUM),
      frontLeftRest:world(f,[-174,-31])
    };
  }

  function metalGradient(ctx,x0,y0,x1,y1){
    const g=ctx.createLinearGradient(x0,y0,x1,y1);
    g.addColorStop(0,P.machineDeep);g.addColorStop(.18,P.metal);g.addColorStop(.46,P.white);g.addColorStop(.7,P.metal);g.addColorStop(1,P.machineDeep);
    return g;
  }
  function cabinetGradient(ctx){
    const g=ctx.createLinearGradient(-240,-40,230,250);
    g.addColorStop(0,P.mylloTop);g.addColorStop(.42,P.mylloBody);g.addColorStop(1,P.mylloEdge);return g;
  }
  function poly(ctx,pts,fill,stroke=P.mylloEdge,w=3){
    ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.stroke();}
  }
  function ellipse(ctx,x,y,rx,ry,fill,stroke=null,w=2){
    ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.stroke();}
  }
  function roundedBar(ctx,x,y,len,h,rot,kind){
    ctx.save();ctx.translate(x,y);ctx.rotate(rot);const x0=kind==='left'?0:-len;
    ctx.beginPath();ctx.roundRect(x0,-h/2,len,h,h/2);ctx.fillStyle=metalGradient(ctx,x0,-h/2,x0+len,h/2);ctx.fill();
    ctx.strokeStyle=P.mylloButton;ctx.lineWidth=2.2;ctx.stroke();ctx.globalAlpha=.42;ctx.strokeStyle=P.white;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x0+12,-h*.18);ctx.lineTo(x0+len-12,-h*.18);ctx.stroke();ctx.restore();
  }
  function pivot(ctx,x,y){
    // stacked collars + turned aluminium post. The layered ellipses keep it cylindrical at preview scale.
    ellipse(ctx,x,y+1,22,7,P.machineDeep,P.mylloButton,1.4);
    ellipse(ctx,x,y-4,18,6,metalGradient(ctx,x-18,y-9,x+18,y+1),P.mylloButton,1.2);
    ctx.fillStyle=metalGradient(ctx,x-15,y-63,x+15,y+6);ctx.strokeStyle=P.mylloButton;ctx.lineWidth=2;
    ctx.beginPath();ctx.roundRect(x-15,y-59,30,59,7);ctx.fill();ctx.stroke();
    ctx.save();ctx.globalAlpha=.45;ctx.strokeStyle=P.white;ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(x-7,y-53);ctx.lineTo(x-7,y-8);ctx.stroke();ctx.restore();
    ellipse(ctx,x,y-59,15,5.5,metalGradient(ctx,x-15,y-65,x+15,y-53),P.mylloButton,1.2);
    ellipse(ctx,x,y-4,13,4,P.machineDeep,null,0);
  }
  function brushNode(ctx,x,y,engage){
    const a=V.lerp(-.12,.16,V.sstep(0,1,engage||0));pivot(ctx,x,y);roundedBar(ctx,x,y-49,190,24,a,'left');
    ctx.save();ctx.translate(x,y-49);ctx.rotate(a);

    // Real unit uses a dual brush. Keep the two carriers visually distinct, not merely two hair colours.
    for(const row of [0,1]){
      const yy=11+row*10;
      ctx.fillStyle=P.vinylEdge;ctx.strokeStyle=P.mylloButton;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.roundRect(28,yy,132,8,3.5);ctx.fill();ctx.stroke();
      ctx.strokeStyle=row===0?P.mylloBristle:P.mylloBristleWet;ctx.lineWidth=1.45;ctx.lineCap='round';
      for(let i=34;i<157;i+=6){
        const lean=row===0?1.5:-1.0;
        ctx.beginPath();ctx.moveTo(i,yy+7);ctx.lineTo(i+lean,yy+22);ctx.stroke();
      }
    }

    // compact end cap at the brush tip
    ctx.fillStyle=P.machineDeep;ctx.beginPath();ctx.roundRect(155,8,13,24,5);ctx.fill();
    ctx.restore();
  }
  function vacuumNode(ctx,x,y,engage){
    const a=V.lerp(.12,-.18,V.sstep(0,1,engage||0));pivot(ctx,x,y);roundedBar(ctx,x,y-49,186,28,a,'right');
    ctx.save();ctx.translate(x,y-49);ctx.rotate(a);

    // black collection shoe under the aluminium arm, with a narrow velvet contact strip.
    ctx.fillStyle=P.vinylEdge;ctx.strokeStyle=P.mylloButton;ctx.lineWidth=1.3;
    ctx.beginPath();ctx.roundRect(-171,10,148,14,5);ctx.fill();ctx.stroke();
    ctx.strokeStyle=P.vinyl;ctx.lineWidth=5.5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(-163,22);ctx.lineTo(-31,22);ctx.stroke();
    ctx.strokeStyle=P.machineDeep;ctx.lineWidth=1.5;ctx.globalAlpha=.5;
    ctx.beginPath();ctx.moveTo(-158,15);ctx.lineTo(-36,15);ctx.stroke();
    ctx.globalAlpha=1;
    ctx.restore();
  }
  function clamp(ctx,cx,cy){
    // wide lower disc, conical shoulder, then knurled grip.
    ellipse(ctx,cx,cy+2,75,23,metalGradient(ctx,cx-78,cy-18,cx+78,cy+26),P.mylloButton,2);
    ellipse(ctx,cx,cy-2,67,18,null,P.white,1);
    poly(ctx,[[cx-62,cy-4],[cx+62,cy-4],[cx+31,cy-35],[cx-31,cy-35]],metalGradient(ctx,cx-58,cy-17,cx+58,cy-36),P.mylloButton,1.6);

    ctx.beginPath();ctx.roundRect(cx-24,cy-64,48,31,7);
    ctx.fillStyle=metalGradient(ctx,cx-24,cy-61,cx+24,cy-34);ctx.fill();
    ctx.strokeStyle=P.mylloButton;ctx.lineWidth=1.6;ctx.stroke();

    ctx.save();ctx.strokeStyle=P.machineDeep;ctx.lineWidth=.75;ctx.globalAlpha=.62;
    for(let x=cx-20;x<=cx+20;x+=4){ctx.beginPath();ctx.moveTo(x,cy-60);ctx.lineTo(x,cy-37);ctx.stroke();}
    ctx.restore();
    ellipse(ctx,cx,cy-63,23,6,metalGradient(ctx,cx-23,cy-68,cx+23,cy-57),P.mylloButton,1);
  }
  function controlKnob(ctx,x,y,name,active){
    if(active===name){ctx.save();ctx.globalAlpha=.35;ctx.strokeStyle=P.mylloRingActive;ctx.lineWidth=7;ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.stroke();ctx.restore();}
    ellipse(ctx,x,y,14,14,P.mylloRing,P.mylloPanelInk,1.8);
    ellipse(ctx,x,y,8.5,8.5,metalGradient(ctx,x-8,y-8,x+8,y+8),P.mylloButton,1.1);
    ctx.save();ctx.translate(x,y);ctx.rotate(-.65);ctx.strokeStyle=P.white;ctx.globalAlpha=.7;ctx.lineWidth=1.2;
    ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(0,-9);ctx.stroke();ctx.restore();
  }
  function applyFrame(ctx,o,fn){const f=frame(o);ctx.save();ctx.translate(f.x,f.y);ctx.scale(f.s,f.s);fn();ctx.restore();}

  function drawBase(ctx,o={}){
    applyFrame(ctx,o,()=>{
      const top=[[-246,-166],[174,-166],[248,-39],[-254,-39]],front=[[-254,-39],[248,-39],[226,246],[-231,246]],side=[[174,-166],[248,-39],[226,246],[171,118]];
      ctx.save();ctx.globalAlpha=.17;ctx.fillStyle=P.ink;ctx.beginPath();ctx.ellipse(-4,253,236,30,0,0,Math.PI*2);ctx.fill();ctx.restore();
      poly(ctx,front,cabinetGradient(ctx));poly(ctx,side,P.mylloEdge,P.inkSoft,2.2);poly(ctx,top,P.mylloTop,P.mylloEdge,3.2);
      ctx.save();ctx.globalAlpha=.18;ctx.strokeStyle=P.white;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-228,-151);ctx.lineTo(162,-151);ctx.stroke();
      ctx.globalAlpha=.45;ctx.strokeStyle=P.machineDeep;ctx.beginPath();ctx.moveTo(-238,-28);ctx.lineTo(229,-28);ctx.stroke();ctx.restore();
      ctx.fillStyle=P.mylloEdge;ctx.beginPath();ctx.roundRect(-185,233,55,21,7);ctx.roundRect(114,233,55,21,7);ctx.fill();

      // top hardware and tiny fasteners keep the cabinet from reading as a generic black box.
      ellipse(ctx,-91,-56,17,10,P.nightSky,P.mylloEdge,1.5);
      ctx.save();ctx.globalAlpha=.55;
      for(const p of [[-218,-143],[145,-143],[-225,-54],[211,-54]]){
        ellipse(ctx,p[0],p[1],3.3,1.8,P.metal,P.mylloButton,.8);
      }
      ctx.restore();

      // platter support only. The record itself is a separate stateful prop.
      ellipse(ctx,GEO.record[0],GEO.record[1],179,67,P.mylloButton,P.groove,2.2);
      ellipse(ctx,GEO.record[0],GEO.record[1],162,57,P.vinylEdge,P.mylloEdge,1.2);

      const [pcx,pcy,pr]=GEO.panel,c=GEO.controls;
      ctx.save();ctx.globalAlpha=.22;ellipse(ctx,pcx+4,pcy+5,pr+4,pr*.94+4,P.ink,null,0);ctx.restore();
      ellipse(ctx,pcx,pcy,pr,pr*.94,P.mylloPanel,P.mylloPanelInk,2.3);
      ctx.save();ctx.globalAlpha=.42;ctx.strokeStyle=P.white;ctx.lineWidth=1.1;
      ctx.beginPath();ctx.arc(pcx-10,pcy-7,53,3.55,5.65);ctx.stroke();ctx.restore();
      controlKnob(ctx,c.START[0],c.START[1],'START',o.active);
      controlKnob(ctx,c.REVERSE[0],c.REVERSE[1],'REVERSE',o.active);
      controlKnob(ctx,c.PUMP[0],c.PUMP[1],'PUMP',o.active);
      controlKnob(ctx,c.VACUUM[0],c.VACUUM[1],'VACUUM',o.active);
      ctx.fillStyle=P.mylloPanelInk;ctx.textAlign='center';ctx.font='700 7px system-ui';
      ctx.fillText('START',c.START[0],c.START[1]-21);ctx.fillText('REVERSE',c.REVERSE[0],c.REVERSE[1]-21);ctx.fillText('PUMP',c.PUMP[0],c.PUMP[1]+25);ctx.fillText('VACUUM',c.VACUUM[0],c.VACUUM[1]+25);
      ctx.font='900 16px system-ui';ctx.fillText('MYLLO',pcx,pcy-2);ctx.fillText('VINYLLO',pcx,pcy+16);
      ellipse(ctx,pcx-8,218,5,5,P.mylloBlueLed);ellipse(ctx,pcx+7,218,5,5,P.mylloBlueLed);
      ctx.save();ctx.globalAlpha=.18;ctx.fillStyle=P.mylloBlueLed;ctx.beginPath();ctx.arc(pcx+1,218,15,0,Math.PI*2);ctx.fill();ctx.restore();
      ctx.save();ctx.globalAlpha=.32;ctx.strokeStyle=P.machineDeep;ctx.lineWidth=2;
      for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(192,53+i*34);ctx.lineTo(221,67+i*31);ctx.stroke();}ctx.restore();
    });
  }

  function drawInternalRecord(ctx,o={}){
    if(o.showRecord===false)return;
    applyFrame(ctx,o,()=>{
      ellipse(ctx,GEO.record[0],GEO.record[1],GEO.recordR[0],GEO.recordR[1],P.vinyl,P.vinylEdge,2.2);
      ctx.save();ctx.globalAlpha=.58;ctx.strokeStyle=P.groove;
      for(let r=151;r>=67;r-=12){ctx.lineWidth=r%24===7?1.4:.8;ctx.beginPath();ctx.ellipse(GEO.record[0],GEO.record[1],r,GEO.recordR[1]*(r/GEO.recordR[0]),0,0,Math.PI*2);ctx.stroke();}
      ctx.restore();ellipse(ctx,GEO.record[0],GEO.record[1],44,16,P.labelDeep,P.label,1);
    });
  }

  function drawOverlay(ctx,o={}){
    applyFrame(ctx,o,()=>{
      brushNode(ctx,GEO.brushPivot[0],GEO.brushPivot[1],V.clamp(o.brushEngage||0));
      vacuumNode(ctx,GEO.vacuumPivot[0],GEO.vacuumPivot[1],V.clamp(o.vacuumEngage||0));
      if(o.clampVisible!==false)clamp(ctx,GEO.record[0],GEO.record[1]);
    });
  }

  function draw(ctx,o={}){drawBase(ctx,o);drawInternalRecord(ctx,o);drawOverlay(ctx,o);}

  function audit(){
    const a=anchors({x:0,y:0,scale:1}),errors=[];
    if(SPEC.physicalMm.width!==350||SPEC.physicalMm.depth!==350||SPEC.physicalMm.height!==200)errors.push('MV-RCM01 physical envelope changed');
    if(Math.abs(a.recordCenter[0]-a.clamp[0])>.01)errors.push('clamp x must remain centered on record');
    if(!(a.brushPivot[0]<a.recordCenter[0]&&a.recordCenter[0]<a.vacuumPivot[0]))errors.push('working-node pivots must straddle record');
    const controls=[a.startButton,a.reverseButton,a.pumpButton,a.vacuumButton];
    for(const p of controls)if(Math.hypot(p[0]-GEO.panel[0],(p[1]-GEO.panel[1])/.94)>GEO.panel[2]+8)errors.push('control escaped front plate');
    if(!(a.recordRadii[0]>a.recordRadii[1]&&a.recordRadii[1]>0))errors.push('record plane projection invalid');
    return errors;
  }

  V.registerProduct('myllo-rcm',{draw,drawBase,drawInternalRecord,drawOverlay,anchors,audit,spec:SPEC});
  V.registerContract('myllo-product-geometry',()=>audit());
})();