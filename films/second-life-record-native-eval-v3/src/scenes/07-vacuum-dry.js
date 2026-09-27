// 07 · Lift it away · T 18.000–21.000
// Physical vacuum step. Layers:
// 1 comic page/table, 2 G5 cleaning machine, 3 same rotating G1 record,
// 4 wet film, 5 vacuum pivot/wand/contact slot, 6 suction convergence,
// 7 dry groove wake, 8 wet-vs-dry diagonal comparison, 9 safe-grip handoff.
(function(){
  'use strict';
  const ID='vacuum-dry',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;
  const G1={cx:540,cy:930,r:285,label:92,hole:8};
  const G5={x:120,y:600,w:840,h:700,r:42,cx:540,cy:930,vacPivot:[205,695],vacA:[320,770],vacB:[680,975]};
  const G6={leftA:145*Math.PI/180,rightA:35*Math.PI/180,rad:315};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.94*a,seed,wobble:.52,tremble:.1,boilAmp:.17,double:w>=5?{offset:2,width:1,alpha:.1,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.38,tremble:.08,boilAmp:.13,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;}

  function drawPage(c){
    c.fillStyle=P.table;c.fillRect(0,0,1080,1920);
    fill(c,[[0,0],[380,0],[230,1920],[0,1920]],P.paperDeep,.12);
    for(let i=0;i<24;i++)line(c,[[-40,90+i*70],[1120,96+i*70+4*Math.sin(i*.7)]],sd('grain',i),1,P.inkSoft,.09);
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);
  }

  function drawMachine(c){
    rrect(c,G5.x,G5.y,G5.w,G5.h,G5.r,P.machine,sd('machine'),4.8,.99);
    fill(c,[[G5.x+12,G5.y+500],[G5.x+G5.w-12,G5.y+500],[G5.x+G5.w-24,G5.y+G5.h-18],[G5.x+22,G5.y+G5.h-18]],P.machineDeep,.18);
    for(let i=0;i<7;i++)line(c,[[735,1200+i*12],[895,1200+i*12]],sd('vent',i),1.4,P.machineDeep,.4);
    L.inkCircle(c,880,675,30,{color:P.ink,width:2.4,fill:P.machineDeep,seed:sd('switch')});
    L.ticks(c,880,675,{r:43,n:10,len:6,major:5,majorLen:11,color:P.inkSoft,alpha:.35,width:1});
    L.inkCircle(c,G5.cx,G5.cy,298,{color:P.ink,width:4,fill:P.machineDeep,seed:sd('platter')});
    L.inkCircle(c,G5.cx,G5.cy,116,{color:P.inkSoft,width:2.4,fill:P.machine,seed:sd('hub')});
  }

  function drawRecord(c,t){
    const rot=t*TAU*.42;
    const dry=sstep(.95,2.35,t);
    c.save();c.translate(G1.cx,G1.cy);c.rotate(rot);
    const outer=L.ellipsePts(0,0,G1.r,G1.r,96);
    fill(c,outer,P.vinyl,.995);

    c.strokeStyle=P.groove;c.lineWidth=1.1;c.globalAlpha=.72+.12*dry;
    for(let i=0;i<40;i++){const rr=G1.r-18-i*4.0;if(rr<G1.label+18)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.white;c.lineWidth=1.8;c.globalAlpha=.1+.22*dry;
    for(let i=0;i<9;i++){const rr=252-i*18;c.beginPath();c.arc(0,0,rr,-1.06+i*.04,-.34+i*.05);c.stroke();}

    // residual visible contamination is sparse; cleaning never creates a glass disc
    const rng=L.rng(sd('dust'));
    c.fillStyle=P.dust;c.globalAlpha=.36*(1-.68*dry);
    for(let i=0;i<13;i++){const a=rng()*TAU,rad=125+rng()*140,d=1.4+rng()*2.0;c.beginPath();c.arc(Math.cos(a)*rad,Math.sin(a)*rad,d,0,TAU);c.fill();}

    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,G1.label,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=2.2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,G1.hole,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*68,Math.sin(-.56)*68);c.stroke();
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.44,tremble:.09,boilAmp:.14});
    c.restore();
    L.inkCircle(c,G1.cx,G1.cy,8,{color:P.ink,width:1.5,fill:P.metal,seed:sd('spindle')});
  }

  function drawWetFilm(c,t){
    const dry=sstep(.8,2.3,t);
    const rot=t*TAU*.42;
    c.save();c.translate(G1.cx,G1.cy);c.rotate(rot);
    c.strokeStyle=P.fluidPale;c.lineCap='round';
    c.globalAlpha=.28*(1-dry*.85);
    c.lineWidth=18;
    c.beginPath();c.arc(0,0,205,-1.3,1.4);c.stroke();
    c.globalAlpha=.45*(1-dry*.8);c.lineWidth=4;c.strokeStyle=P.fluid;
    c.beginPath();c.arc(0,0,205,-1.3,1.4);c.stroke();
    c.restore();
  }

  function wandPose(t){
    const engage=sstep(.12,.55,t);
    const track=sstep(.55,2.05,t);
    const lift=sstep(2.3,2.8,t);
    const pivot=G5.vacPivot;
    const startAng=.55,endAng=.92;
    const ang=lerp(startAng,endAng,engage*.65+track*.35);
    const len=520;
    const tip=[pivot[0]+Math.cos(ang)*len,pivot[1]+Math.sin(ang)*len-80*lift];
    return {engage,track,lift,ang,pivot,tip};
  }

  function drawVacuum(c,t){
    const q=wandPose(t);
    L.inkCircle(c,q.pivot[0],q.pivot[1],42,{color:P.ink,width:3.4,fill:P.machineDeep,seed:sd('pivot')});
    L.inkCircle(c,q.pivot[0],q.pivot[1],20,{color:P.inkSoft,width:2,fill:P.metal,seed:sd('pivot2')});

    const mid=[lerp(q.pivot[0],q.tip[0],.46),lerp(q.pivot[1],q.tip[1],.46)-28];
    line(c,[q.pivot,mid,q.tip],sd('wand'),34,P.vacuum,.98);
    line(c,[[q.pivot[0]+8,q.pivot[1]-6],[mid[0]+6,mid[1]-4],[q.tip[0]+6,q.tip[1]-3]],sd('wandHi'),4,P.metal,.26);

    c.save();c.translate(q.tip[0],q.tip[1]);c.rotate(q.ang+.05);
    const head=L.rrectPts(-105,-28,210,56,12,10);inkFill(c,head,P.vacuum,sd('head'),3.4,.99);
    c.strokeStyle=P.ink;c.lineWidth=9;c.globalAlpha=.85;c.beginPath();c.moveTo(-80,19);c.lineTo(80,19);c.stroke();
    c.strokeStyle=P.fluidPale;c.lineWidth=2;c.globalAlpha=.35*q.engage;c.beginPath();c.moveTo(-72,15);c.lineTo(72,15);c.stroke();
    c.restore();

    const contact=q.engage*(1-q.lift);
    if(contact>0){
      drawSuction(c,t,q,contact);
      L.guideCircle(c,q.tip[0],q.tip[1],26+10*contact,{color:P.cleanTeal,alpha:.15*contact,width:1.6,quadrants:5});
    }
  }

  function drawSuction(c,t,q,contact){
    // short converging fluid lines point into a real physical slot
    const vx=q.tip[0]-G1.cx,vy=q.tip[1]-G1.cy,mag=Math.hypot(vx,vy)||1;
    const nx=-vy/mag,ny=vx/mag;
    for(let i=-3;i<=3;i++){
      const off=i*18;
      const sx=q.tip[0]+nx*off-vx/mag*88;
      const sy=q.tip[1]+ny*off-vy/mag*88;
      const ex=q.tip[0]+nx*off*.7-vx/mag*18;
      const ey=q.tip[1]+ny*off*.7-vy/mag*18;
      line(c,[[sx,sy],[lerp(sx,ex,.55)+nx*4,lerp(sy,ey,.55)+ny*4],[ex,ey]],sd('suck',i),i===0?2.8:2,P.fluid,.32*contact);
    }
  }

  function drawDryComparison(c,t){
    const show=sstep(1.3,1.58,t)*(1-sstep(2.45,2.75,t));
    if(show<=0)return;
    const x1=130,y1=1100,x2=950,y2=760;
    c.save();c.globalAlpha*=show;
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();
    // small labels are forbidden; use wet/dry visual fields only
    c.fillStyle=P.fluidPale;c.globalAlpha=.06*show;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineTo(950,600);c.lineTo(130,600);c.closePath();c.fill();
    c.restore();
  }

  function drawGripHands(c,t){
    const p=sstep(2.55,2.98,t);
    if(p<=0)return;
    const contacts=[
      [G1.cx+Math.cos(G6.leftA)*G6.rad,G1.cy+Math.sin(G6.leftA)*G6.rad,-.9],
      [G1.cx+Math.cos(G6.rightA)*G6.rad,G1.cy+Math.sin(G6.rightA)*G6.rad,2.16]
    ];
    contacts.forEach((v,i)=>drawGrip(c,v[0],v[1],v[2],sd('grip',i),p));
  }

  function drawGrip(c,x,y,rot,seed,a){
    c.save();c.translate(x,y);c.rotate(rot);c.globalAlpha*=a;
    const palm=[[-64,-42],[8,-48],[64,-17],[67,38],[8,65],[-60,30]];
    inkFill(c,palm,P.skin,seed,4.3,.98);
    fill(c,[[8,-45],[60,-16],[60,32],[14,40]],P.skinShadow,.26);
    for(let i=0;i<3;i++){
      const yy=-28+i*23;
      inkFill(c,[[35,yy],[74,yy+2],[82,yy+15],[46,yy+18]],P.skin,seed+10+i,2.1,.98);
    }
    inkFill(c,[[-4,-7],[46,-1],[57,19],[10,30],[-26,12]],P.skin,seed+20,2.3,.98);
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});
      drawPage(c);
      drawMachine(c);
      drawRecord(c,t);
      drawWetFilm(c,t);
      drawVacuum(c,t);
      drawDryComparison(c,t);
      drawGripHands(c,t);
    }
  });
})();