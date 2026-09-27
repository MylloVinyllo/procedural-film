// 06 · Into the grooves · T 15.000–18.000
// Hero wet-cleaning shot. Layers:
// 1 comic page/table, 2 G5 cleaning machine, 3 exact G1 rotating record,
// 4 fluid beads/ribbon, 5 protagonist hand + brush, 6 fibre/groove contact,
// 7 displaced dust + wet reflection, 8 macro inset, 9 SHFF/action accents.
(function(){
  'use strict';
  const ID='wet-brush',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  const G1={cx:540,cy:930,r:285,label:92,hole:8};
  const G5={x:120,y:600,w:840,h:700,r:42,cx:540,cy:930,brush:[815,690],brushContact:[650,815],vacPivot:[205,695]};
  const MAC={x:585,y:270,w:325,h:390};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.94*a,seed,wobble:.55,tremble:.11,boilAmp:.18,double:w>=5?{offset:2,width:1,alpha:.1,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.4,tremble:.09,boilAmp:.14,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;}
  function halftone(c,pts,color,spacing=14,r=1.4,a=.14,seed=1){
    c.save();trace(c,pts,true);c.clip();c.fillStyle=color;c.globalAlpha*=a;
    const ox=L.hash(seed,'x')%spacing,oy=L.hash(seed,'y')%spacing;c.beginPath();
    for(let y=-spacing+oy;y<1920+spacing;y+=spacing){const sh=(Math.floor(y/spacing)&1)?spacing*.5:0;
      for(let x=-spacing+ox+sh;x<1080+spacing;x+=spacing){c.moveTo(x+r,y);c.arc(x,y,r,0,TAU);}}
    c.fill();c.restore();
  }

  function drawPage(c){
    c.fillStyle=P.table;c.fillRect(0,0,1080,1920);
    fill(c,[[0,0],[420,0],[250,1920],[0,1920]],P.paperDeep,.12);
    for(let i=0;i<26;i++)line(c,[[-40,82+i*68],[1120,88+i*68+5*Math.sin(i*.8)]],sd('grain',i),1,P.inkSoft,.10);
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);
  }

  function drawMachine(c){
    rrect(c,G5.x,G5.y,G5.w,G5.h,G5.r,P.machine,sd('machine'),4.8,.99);
    fill(c,[[G5.x+12,G5.y+500],[G5.x+G5.w-12,G5.y+500],[G5.x+G5.w-24,G5.y+G5.h-18],[G5.x+22,G5.y+G5.h-18]],P.machineDeep,.18);
    // utility vents / switch
    for(let i=0;i<7;i++)line(c,[[735,1200+i*12],[895,1200+i*12]],sd('vent',i),1.4,P.machineDeep,.4);
    L.inkCircle(c,880,675,30,{color:P.ink,width:2.4,fill:P.machineDeep,seed:sd('switch')});
    L.ticks(c,880,675,{r:43,n:10,len:6,major:5,majorLen:11,color:P.inkSoft,alpha:.35,width:1});
    // parked vacuum wand stays visible for causal continuity into next shot
    L.inkCircle(c,G5.vacPivot[0],G5.vacPivot[1],38,{color:P.ink,width:3,fill:P.machineDeep,seed:sd('vacpivot')});
    line(c,[[G5.vacPivot[0],G5.vacPivot[1]],[285,740],[410,810]],sd('vacpark'),32,P.vacuum,.88);
    line(c,[[398,801],[468,842]],sd('vacslot'),10,P.ink,.78);
    // platter/hub under disc
    L.inkCircle(c,G5.cx,G5.cy,298,{color:P.ink,width:4,fill:P.machineDeep,seed:sd('platter')});
    L.inkCircle(c,G5.cx,G5.cy,116,{color:P.inkSoft,width:2.4,fill:P.machine,seed:sd('hub')});
  }

  function drawRecord(c,t){
    const rot=t*TAU*.42;
    c.save();c.translate(G1.cx,G1.cy);c.rotate(rot);
    const outer=L.ellipsePts(0,0,G1.r,G1.r,96);
    fill(c,outer,P.vinyl,.995);
    // groove field
    c.strokeStyle=P.groove;c.lineWidth=1.1;c.globalAlpha=.72;
    for(let i=0;i<40;i++){const rr=G1.r-18-i*4.0;if(rr<G1.label+18)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.vinylEdge;c.globalAlpha=.27;c.lineWidth=3;
    [258,222,184,150,122].forEach(r=>{c.beginPath();c.arc(0,0,r,0,TAU);c.stroke();});
    // contamination, progressively displaced only where brush has actually passed
    const clean=sstep(1.0,2.25,t);
    const rng=L.rng(sd('dust'));
    for(let i=0;i<30;i++){
      const a=rng()*TAU,rad=120+rng()*148,d=1.4+rng()*2.6;
      const sector=Math.cos(a+rot*.25); // deterministic spatial bias, not magic global fade
      const localClean=clean*clamp(.35+.65*(sector*.5+.5));
      c.fillStyle=i%5===0?P.grit:P.dust;c.globalAlpha=(i%5===0?.66:.72)*(1-.78*localClean);
      c.beginPath();c.arc(Math.cos(a)*rad,Math.sin(a)*rad,d,0,TAU);c.fill();
    }
    // fibres, one survives until brush passes it
    c.strokeStyle=P.dust;c.lineWidth=2;c.globalAlpha=.55*(1-.8*clean);
    [[-120,-95,-72,-75],[95,120,145,132],[-25,180,35,190]].forEach(v=>{c.beginPath();c.moveTo(v[0],v[1]);c.quadraticCurveTo((v[0]+v[2])/2+8,(v[1]+v[3])/2-8,v[2],v[3]);c.stroke();});
    // label
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,G1.label,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=2.2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,G1.hole,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*68,Math.sin(-.56)*68);c.stroke();
    // dry reflections, partly replaced by wet-film reflections later
    c.strokeStyle=P.white;c.lineWidth=1.7;c.globalAlpha=.16;
    for(let i=0;i<7;i++){const rr=252-i*20;c.beginPath();c.arc(0,0,rr,-1.1+i*.04,-.36+i*.05);c.stroke();}
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.45,tremble:.1,boilAmp:.15});
    c.restore();
    L.inkCircle(c,G1.cx,G1.cy,8,{color:P.ink,width:1.5,fill:P.metal,seed:sd('spindle')});
  }

  function drawFluid(c,t){
    // first bead exists on frame 0 to preserve shot-05 handoff
    const spread=sstep(.08,.75,t),wet=sstep(.35,1.2,t);
    const rot=t*TAU*.42;
    const beads=[
      {a:-.75,r:245,s:12},{a:-.58,r:218,s:9},{a:-.92,r:190,s:8},
      {a:-.42,r:160,s:7},{a:-1.06,r:135,s:6},{a:-.30,r:238,s:7}
    ];
    c.save();c.translate(G1.cx,G1.cy);c.rotate(rot);
    for(let i=0;i<beads.length;i++){
      const b=beads[i],u=clamp(spread*1.25-i*.09);
      if(u<=0)continue;
      const x=Math.cos(b.a)*b.r,y=Math.sin(b.a)*b.r;
      c.fillStyle=P.fluid;c.globalAlpha=.82*u;c.beginPath();c.ellipse(x,y,b.s*(.7+.4*u),b.s*.65,0,0,TAU);c.fill();
    }
    // thin ribbon carried by rotation, explicitly tied to disc surface
    if(wet>0){
      c.strokeStyle=P.fluidPale;c.lineWidth=16;c.lineCap='round';c.globalAlpha=.24+.28*wet;
      c.beginPath();c.arc(0,0,205,-1.12,-.25+1.2*wet);c.stroke();
      c.strokeStyle=P.fluid;c.lineWidth=4;c.globalAlpha=.5*wet;
      c.beginPath();c.arc(0,0,205,-1.12,-.22+1.2*wet);c.stroke();
      c.strokeStyle=P.white;c.lineWidth=2;c.globalAlpha=.2*wet;
      c.beginPath();c.arc(0,0,222,-1.0,-.2+1.05*wet);c.stroke();
    }
    c.restore();
  }

  function drawBrush(c,t){
    const contact=sstep(.72,1.05,t);
    const sweep=sstep(1.05,1.72,t);
    const settle=sstep(1.72,2.15,t);
    const lift=sstep(2.55,2.95,t);
    if(contact<=0 && t<.68)return;

    // handle travels diagonally while fibres lag behind
    const sx=lerp(895,790,contact),sy=lerp(620,700,contact);
    const tx=lerp(sx,610,sweep),ty=lerp(sy,830,sweep);
    const hx=lerp(tx,600,settle),hy=lerp(ty,850,settle)-70*lift;
    const ang=2.58;

    // arm/hand behind tool
    drawBrushHand(c,hx+185,hy-135,ang,contact*(1-.25*lift));

    c.save();c.translate(hx,hy);c.rotate(ang);c.globalAlpha*=clamp(contact*1.35);
    // wooden handle
    const handle=L.rrectPts(-40,-22,235,44,18,12);inkFill(c,handle,P.brush,sd('handle'),3.6,.98);
    fill(c,[[80,-20],[195,-20],[195,20],[80,20]],P.ochre,.16);
    // ferrule
    inkFill(c,[[ -55,-25],[-18,-25],[-18,25],[-55,25]],P.metal,sd('ferrule'),2.2,.95);
    // bristle block and fibres
    const fibreLag=10+8*sweep;
    c.fillStyle=P.brushFiber;c.globalAlpha=.94;
    c.fillRect(-92,-30,40,60);
    for(let i=0;i<28;i++){
      const yy=-28+i*2.05;
      const len=56+(i%4)*2+fibreLag;
      c.strokeStyle=P.brushFiber;c.lineWidth=1.4;c.globalAlpha=.88;
      c.beginPath();c.moveTo(-52,yy);c.quadraticCurveTo(-72-fibreLag*.35,yy+2,-52-len,yy+5*Math.sin(i*.7));c.stroke();
    }
    c.restore();

    // contact pressure mark, physically at brush/groove meeting point
    const press=contact*(1-lift);
    if(press>0){
      const cx=hx-80*Math.cos(ang),cy=hy-80*Math.sin(ang);
      L.guideCircle(c,cx,cy,26+12*press,{color:P.cleanTeal,alpha:.22*press,width:1.8,quadrants:5});
    }

    // displaced wet/dust wake, follows tool travel instead of global dissolve
    if(sweep>0){
      const wakeA=[G1.cx+90,G1.cy-135],wakeB=[G1.cx+180,G1.cy-40];
      line(c,[wakeA,wakeB],sd('wake1'),2.4,P.fluid,.38*sweep);
      line(c,[[wakeA[0]-20,wakeA[1]+18],[wakeB[0]-30,wakeB[1]+24]],sd('wake2'),1.8,P.fluidPale,.35*sweep);
      const rng=L.rng(sd('crumbs'));
      c.save();c.fillStyle=P.dust;c.globalAlpha=.55*(1-lift);
      for(let i=0;i<9;i++){const u=rng(),x=lerp(wakeA[0],wakeB[0],u)+20*rng(),y=lerp(wakeA[1],wakeB[1],u)+25*(rng()-.5);c.beginPath();c.arc(x,y,1.5+2*rng(),0,TAU);c.fill();}
      c.restore();
    }
  }

  function drawBrushHand(c,x,y,rot,a){
    if(a<=0)return;
    c.save();c.translate(x,y);c.rotate(rot-.05);c.globalAlpha*=a;
    const palm=[[-72,-46],[10,-50],[65,-15],[60,50],[-8,70],[-70,28]];
    inkFill(c,palm,P.skin,sd('palm'),4.5,.98);
    fill(c,[[8,-47],[62,-13],[56,43],[10,38]],P.skinShadow,.28);
    // fingers wrap tool axis
    for(let i=0;i<3;i++){
      const yy=-32+i*25;
      inkFill(c,[[5,yy],[82,yy+1],[90,yy+16],[14,yy+18]],P.skin,sd('finger',i),2.1,.98);
    }
    inkFill(c,[[-18,-9],[40,-2],[52,20],[0,34],[-35,14]],P.skin,sd('thumb'),2.4,.98);
    c.restore();
  }

  function drawMacro(c,t){
    const show=sstep(2.25,2.48,t)*(1-sstep(2.82,3.0,t));
    if(show<=0)return;
    const {x,y,w,h}=MAC;
    c.save();c.globalAlpha*=show;c.fillStyle=P.gutter;c.fillRect(x,y,w,h);c.strokeStyle=P.comicBorder;c.lineWidth=4;c.strokeRect(x,y,w,h);
    c.beginPath();c.rect(x+4,y+4,w-8,h-8);c.clip();
    c.fillStyle=P.vinyl;c.fillRect(x,y,w,h);

    // concrete groove arcs across macro
    c.strokeStyle=P.groove;c.globalAlpha=.9;
    for(let i=0;i<24;i++){const yy=y+100+i*10;c.lineWidth=i%5===0?2:1;c.beginPath();c.moveTo(x-20,yy);c.bezierCurveTo(x+90,yy-12,x+230,yy+12,x+w+20,yy);c.stroke();}
    // wet film
    c.strokeStyle=P.fluidPale;c.lineWidth=18;c.globalAlpha=.28;c.beginPath();c.moveTo(x-20,y+250);c.bezierCurveTo(x+100,y+230,x+210,y+270,x+w+20,y+248);c.stroke();
    // fibres make visible contact with groove field
    const baseX=x+250,baseY=y+115;
    c.save();c.translate(baseX,baseY);c.rotate(2.28);
    c.fillStyle=P.brush;c.globalAlpha=.96;c.fillRect(-30,-20,130,40);
    c.strokeStyle=P.brushFiber;c.lineWidth=2;c.globalAlpha=.95;
    for(let i=0;i<18;i++){const yy=-18+i*2.1;c.beginPath();c.moveTo(-30,yy);c.quadraticCurveTo(-65,yy+3,-92,yy+12);c.stroke();}
    c.restore();
    // tiny displaced specks just ahead of fibres
    c.fillStyle=P.dust;c.globalAlpha=.68;
    [[675,514,4],[700,535,3],[736,492,3.5]].forEach(v=>{c.beginPath();c.arc(v[0],v[1],v[2],0,TAU);c.fill();});
    c.restore();
  }

  function actionGraphics(c,t){
    const sweep=sstep(1.38,1.55,t)*(1-sstep(1.8,2.08,t));
    if(sweep>0){
      line(c,[[750,735],[835,675]],sd('act1'),3,P.cleanTeal,.5*sweep);
      line(c,[[720,765],[815,705]],sd('act2'),2.4,P.cleanTeal,.35*sweep);
      L.text(c,'SHFF',780,690,{size:76,weight:850,align:'center',color:P.soundWord,alpha:.72*sweep});
    }
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});
      drawPage(c);
      drawMachine(c);
      drawRecord(c,t);
      drawFluid(c,t);
      drawBrush(c,t);
      drawMacro(c,t);
      actionGraphics(c,t);

      // late vacuum approach cue only, handing the next physical action to scene 07
      const vac=sstep(2.7,3.0,t);
      if(vac>0){
        line(c,[[230,700],[285,740],[360,785]],sd('vac-approach'),26,P.vacuum,.42*vac);
      }
    }
  });
})();