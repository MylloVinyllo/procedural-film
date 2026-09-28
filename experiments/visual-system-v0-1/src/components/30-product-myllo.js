(function(){
  'use strict';
  const V=FILM.visual,P=FILM.lib.pal;
  const SPEC=Object.freeze({
    sku:'MV-RCM01',
    physicalMm:Object.freeze({width:350,depth:350,height:200}),
    features:Object.freeze({
      liquidFeed:'automated',
      brush:'dual-goat-hair',
      clamp:'aluminium',
      collection:'vacuum'
    })
  });

  const GEO=Object.freeze({
    record:[-4,-104],
    brushPivot:[-170,-142],
    vacuumPivot:[158,-142],
    panel:[20,111,76],
    controls:Object.freeze({
      START:[-25,77],
      REVERSE:[64,77],
      PUMP:[-25,146],
      VACUUM:[64,146]
    })
  });

  function frame(o){const x=o.x||0,y=o.y||0,s=o.scale!=null?o.scale:1;return {x,y,s};}
  function world(f,p){return [f.x+p[0]*f.s,f.y+p[1]*f.s];}
  function anchors(o={}){
    const f=frame(o),c=GEO.controls;
    return {
      recordCenter:world(f,GEO.record),
      clamp:world(f,[GEO.record[0],GEO.record[1]-7]),
      brushPivot:world(f,GEO.brushPivot),
      vacuumPivot:world(f,GEO.vacuumPivot),
      startButton:world(f,c.START),
      reverseButton:world(f,c.REVERSE),
      pumpButton:world(f,c.PUMP),
      vacuumButton:world(f,c.VACUUM),
      frontLeftRest:world(f,[-174,-31])
    };
  }

  function metalGradient(ctx,x0,y0,x1,y1){
    const g=ctx.createLinearGradient(x0,y0,x1,y1);
    g.addColorStop(0,P.machineDeep);
    g.addColorStop(.18,P.metal);
    g.addColorStop(.46,P.white);
    g.addColorStop(.7,P.metal);
    g.addColorStop(1,P.machineDeep);
    return g;
  }
  function cabinetGradient(ctx){
    const g=ctx.createLinearGradient(-240,-40,230,250);
    g.addColorStop(0,P.mylloTop);
    g.addColorStop(.42,P.mylloBody);
    g.addColorStop(1,P.mylloEdge);
    return g;
  }
  function poly(ctx,pts,fill,stroke=P.mylloEdge,w=3){
    ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
    ctx.closePath();ctx.fillStyle=fill;ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.stroke();}
  }
  function ellipse(ctx,x,y,rx,ry,fill,stroke=null,w=2){
    ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.stroke();}
  }
  function roundedBar(ctx,x,y,len,h,rot,kind){
    ctx.save();ctx.translate(x,y);ctx.rotate(rot);
    const x0=kind==='left'?0:-len;
    ctx.beginPath();ctx.roundRect(x0,-h/2,len,h,h/2);
    ctx.fillStyle=metalGradient(ctx,x0,-h/2,x0+len,h/2);ctx.fill();
    ctx.strokeStyle=P.mylloButton;ctx.lineWidth=2.2;ctx.stroke();
    ctx.globalAlpha=.42;ctx.strokeStyle=P.white;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x0+12,-h*.18);ctx.lineTo(x0+len-12,-h*.18);ctx.stroke();
    ctx.restore();
  }
  function pivot(ctx,x,y){
    // tall turned-aluminium cylinder
    ctx.fillStyle=metalGradient(ctx,x-15,y-60,x+15,y+5);
    ctx.strokeStyle=P.mylloButton;ctx.lineWidth=2.2;
    ctx.beginPath();ctx.roundRect(x-15,y-57,30,61,8);ctx.fill();ctx.stroke();
    ellipse(ctx,x,y-57,15,5,metalGradient(ctx,x-15,y-62,x+15,y-52),P.mylloButton,1.3);
    ellipse(ctx,x,y-3,14,4,P.machineDeep,null,0);
  }
  function brushNode(ctx,x,y,engage){
    const a=V.lerp(-.12,.16,V.sstep(0,1,engage||0));
    pivot(ctx,x,y);
    roundedBar(ctx,x,y-49,190,26,a,'left');

    ctx.save();ctx.translate(x,y-49);ctx.rotate(a);
    // black brush carrier under the aluminium arm
    ctx.fillStyle=P.vinylEdge;ctx.beginPath();ctx.roundRect(29,11,130,14,5);ctx.fill();
    // two clearly separated goat-hair rows
    for(const row of [0,1]){
      ctx.strokeStyle=row===0?P.mylloBristle:P.mylloBristleWet;
      ctx.lineWidth=1.7;ctx.lineCap='round';
      for(let i=35;i<157;i+=7){
        ctx.beginPath();ctx.moveTo(i,22+row*5);ctx.lineTo(i+1.5,36+row*5);ctx.stroke();
      }
    }
    ctx.restore();
  }
  function vacuumNode(ctx,x,y,engage){
    const a=V.lerp(.12,-.18,V.sstep(0,1,engage||0));
    pivot(ctx,x,y);
    roundedBar(ctx,x,y-49,186,29,a,'right');

    ctx.save();ctx.translate(x,y-49);ctx.rotate(a);
    // visible velvet collection slot under the tube
    ctx.strokeStyle=P.vinyl;ctx.lineWidth=8;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(-168,17);ctx.lineTo(-27,17);ctx.stroke();
    ctx.strokeStyle=P.machineDeep;ctx.lineWidth=2;ctx.globalAlpha=.6;
    ctx.beginPath();ctx.moveTo(-162,12);ctx.lineTo(-31,12);ctx.stroke();
    ctx.restore();
  }
  function clamp(ctx,cx,cy){
    // broad aluminium disc, conical shoulder, knurled top cylinder
    const disc=metalGradient(ctx,cx-75,cy-18,cx+75,cy+24);
    ellipse(ctx,cx,cy,72,22,disc,P.mylloButton,2);
    const cone=[[cx-61,cy-4],[cx+61,cy-4],[cx+30,cy-34],[cx-30,cy-34]];
    poly(ctx,cone,metalGradient(ctx,cx-55,cy-16,cx+55,cy-34),P.mylloButton,1.7);
    ctx.beginPath();ctx.roundRect(cx-24,cy-63,48,31,8);
    ctx.fillStyle=metalGradient(ctx,cx-24,cy-60,cx+24,cy-34);ctx.fill();
    ctx.strokeStyle=P.mylloButton;ctx.lineWidth=1.7;ctx.stroke();
    ctx.save();ctx.strokeStyle=P.machineDeep;ctx.lineWidth=.8;ctx.globalAlpha=.55;
    for(let x=cx-20;x<=cx+20;x+=4){ctx.beginPath();ctx.moveTo(x,cy-59);ctx.lineTo(x,cy-36);ctx.stroke();}
    ctx.restore();
    ellipse(ctx,cx,cy-62,23,6,metalGradient(ctx,cx-23,cy-66,cx+23,cy-57),P.mylloButton,1);
  }
  function controlKnob(ctx,x,y,name,active){
    const on=active===name;
    if(on){
      ctx.save();ctx.globalAlpha=.35;ctx.strokeStyle=P.mylloRingActive;ctx.lineWidth=7;
      ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.stroke();ctx.restore();
    }
    ellipse(ctx,x,y,14,14,P.mylloRing,P.mylloPanelInk,2);
    ellipse(ctx,x,y,8,8,metalGradient(ctx,x-8,y-8,x+8,y+8),P.mylloButton,1.2);
  }
  function draw(ctx,o={}){
    const f=frame(o),active=o.active||null;
    const brush=V.clamp(o.brushEngage||0),vacuum=V.clamp(o.vacuumEngage||0);
    ctx.save();ctx.translate(f.x,f.y);ctx.scale(f.s,f.s);

    const top=[[-246,-166],[174,-166],[248,-39],[-254,-39]];
    const front=[[-254,-39],[248,-39],[226,246],[-231,246]];
    const side=[[174,-166],[248,-39],[226,246],[171,118]];

    // product shadow first
    ctx.save();ctx.globalAlpha=.17;ctx.fillStyle=P.ink;
    ctx.beginPath();ctx.ellipse(-4,253,236,30,0,0,Math.PI*2);ctx.fill();ctx.restore();

    poly(ctx,front,cabinetGradient(ctx));
    poly(ctx,side,P.mylloEdge,P.inkSoft,2.2);
    poly(ctx,top,P.mylloTop,P.mylloEdge,3.2);

    // top plate highlight and front edge
    ctx.save();ctx.globalAlpha=.18;ctx.strokeStyle=P.white;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(-228,-151);ctx.lineTo(162,-151);ctx.stroke();
    ctx.globalAlpha=.45;ctx.strokeStyle=P.machineDeep;
    ctx.beginPath();ctx.moveTo(-238,-28);ctx.lineTo(229,-28);ctx.stroke();ctx.restore();

    // cabinet feet
    ctx.fillStyle=P.mylloEdge;
    ctx.beginPath();ctx.roundRect(-185,233,55,21,7);ctx.roundRect(114,233,55,21,7);ctx.fill();

    // dark blue top control/button visible in real unit
    ellipse(ctx,-91,-56,17,10,P.nightSky,P.mylloEdge,1.5);

    // record/platter plane
    ellipse(ctx,GEO.record[0],GEO.record[1],172,63,P.vinylEdge,P.groove,2.6);
    ctx.save();ctx.globalAlpha=.5;ctx.strokeStyle=P.groove;ctx.lineWidth=1.2;
    for(let r=151;r>=67;r-=12){
      ctx.beginPath();ctx.ellipse(GEO.record[0],GEO.record[1],r,63*(r/172),0,0,Math.PI*2);ctx.stroke();
    }
    ctx.restore();

    // rear working nodes
    brushNode(ctx,GEO.brushPivot[0],GEO.brushPivot[1],brush);
    vacuumNode(ctx,GEO.vacuumPivot[0],GEO.vacuumPivot[1],vacuum);

    // clamp on top of the record
    clamp(ctx,GEO.record[0],GEO.record[1]);

    // circular white front control plate, based on the actual MV-RCM01 front panel
    const [pcx,pcy,pr]=GEO.panel;
    ellipse(ctx,pcx,pcy,pr,pr*.94,P.mylloPanel,P.mylloPanelInk,2.3);
    const c=GEO.controls;
    controlKnob(ctx,c.START[0],c.START[1],'START',active);
    controlKnob(ctx,c.REVERSE[0],c.REVERSE[1],'REVERSE',active);
    controlKnob(ctx,c.PUMP[0],c.PUMP[1],'PUMP',active);
    controlKnob(ctx,c.VACUUM[0],c.VACUUM[1],'VACUUM',active);

    ctx.fillStyle=P.mylloPanelInk;ctx.textAlign='center';
    ctx.font='700 7px system-ui';ctx.fillText('START',c.START[0],c.START[1]-21);
    ctx.fillText('REVERSE',c.REVERSE[0],c.REVERSE[1]-21);
    ctx.fillText('PUMP',c.PUMP[0],c.PUMP[1]+25);
    ctx.fillText('VACUUM',c.VACUUM[0],c.VACUUM[1]+25);
    ctx.font='900 16px system-ui';ctx.fillText('MYLLO',pcx,pcy-2);
    ctx.fillText('VINYLLO',pcx,pcy+16);

    // blue indicator pair below panel
    ellipse(ctx,pcx-8,218,5,5,P.mylloBlueLed,null,0);
    ellipse(ctx,pcx+7,218,5,5,P.mylloBlueLed,null,0);
    ctx.save();ctx.globalAlpha=.18;ctx.fillStyle=P.mylloBlueLed;
    ctx.beginPath();ctx.arc(pcx+1,218,15,0,Math.PI*2);ctx.fill();ctx.restore();

    // subtle right-side ventilation / seam
    ctx.save();ctx.globalAlpha=.32;ctx.strokeStyle=P.machineDeep;ctx.lineWidth=2;
    for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(192,53+i*34);ctx.lineTo(221,67+i*31);ctx.stroke();}
    ctx.restore();

    ctx.restore();
  }

  function audit(){
    const a=anchors({x:0,y:0,scale:1}),errors=[];
    if(SPEC.physicalMm.width!==350||SPEC.physicalMm.depth!==350||SPEC.physicalMm.height!==200)errors.push('MV-RCM01 physical envelope changed');
    if(Math.abs(a.recordCenter[0]-a.clamp[0])>.01)errors.push('clamp x must remain centered on record');
    if(!(a.brushPivot[0]<a.recordCenter[0]&&a.recordCenter[0]<a.vacuumPivot[0]))errors.push('working-node pivots must straddle record');
    const controls=[a.startButton,a.reverseButton,a.pumpButton,a.vacuumButton];
    for(const p of controls){
      if(Math.hypot(p[0]-GEO.panel[0],(p[1]-GEO.panel[1])/.94)>GEO.panel[2]+8)errors.push('control escaped front plate');
    }
    return errors;
  }

  V.registerProduct('myllo-rcm',{draw,anchors,audit,spec:SPEC});
  V.registerContract('myllo-product-geometry',()=>audit());
})();