// 03 · Arrival · T 4.000–5.500
// Layers: paper/stripes · room depth · supporting adult/cloth · infant · breath/hand overlays
(function(){
  'use strict';
  const ID='birth',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function fillInk(c,L,pts,fill,seed,width=4,alpha=1){
    L.inkPath(c,pts,{closed:true,fill,fillAlpha:alpha,color:L.pal.ink,alpha,width,seed,wobble:1.1,tremble:.3,boilAmp:.5,double:width>4?{offset:2.5,width:1.2,alpha:.2,seed:seed+1}:false});
  }
  function stroke(c,L,pts,col,seed,width=2,alpha=1){
    L.inkPath(c,pts,{closed:false,color:col,width,alpha,seed,wobble:.8,tremble:.25,boilAmp:.4,taper:[6,12]});
  }
  function ell(cx,cy,rx,ry,rot=0,n=28){
    const q=[],cr=Math.cos(rot),sr=Math.sin(rot);
    for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;q.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}
    return q;
  }
  function limb(ax,ay,bx,by,wa,wb){
    const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;
    return [[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];
  }
  function drawRoom(c,L,P){
    c.save();c.globalAlpha=.32;
    // window and wall planes
    c.fillStyle=P.paperShade;c.fillRect(80,300,920,760);
    c.fillStyle=L.rgba(P.stripeSky,.35);c.fillRect(690,410,210,300);
    stroke(c,L,[[690,410],[900,410],[900,710],[690,710],[690,410]],P.inkFaint,sd('win'),1.5,.55);
    stroke(c,L,[[795,410],[795,710],[690,560],[900,560]],P.inkFaint,sd('mull'),1,.4);
    // table/chair fragments
    fillInk(c,L,[[110,960],[380,960],[360,1000],[100,1000]],P.wood,sd('table'),2,.45);
    stroke(c,L,[[135,1000],[120,1220],[330,1000],[350,1220]],P.inkSoft,sd('legs'),3,.42);
    // floor lines
    for(let i=0;i<7;i++){
      const y=1160+i*86;
      stroke(c,L,[[0,y],[1080,y-40]],P.inkFaint,sd('floor',i),1,.16);
    }
    c.restore();
  }
  function drawAdultSupport(c,L,P,t){
    // torso cropped off-left, forearms form cradle
    const torso=[[0,650],[185,620],[315,820],[280,1160],[0,1240]];
    fillInk(c,L,torso,P.birthRose,sd('support-torso'),4.5,.72);
    L.hatch(c,torso,{spacing:11,angle:-.7,length:[20,60],density:.5,color:P.inkSoft,alpha:.28,width:1.2,seed:sd('support-hatch')});
    // upper forearm under infant
    fillInk(c,L,limb(230,820,500,1030,42,34),P.selfPale,sd('arm1'),4,.95);
    fillInk(c,L,limb(265,990,650,1055,38,31),P.selfPale,sd('arm2'),4,.95);
    // hand shapes
    fillInk(c,L,[[472,1003],[530,1000],[555,1028],[538,1058],[485,1055],[460,1030]],P.selfPale,sd('hand1'),3,.95);
    fillInk(c,L,[[620,1028],[675,1035],[690,1060],[660,1082],[610,1064],[598,1044]],P.selfPale,sd('hand2'),3,.95);
  }
  function drawCloth(c,L,P){
    const cloth=[[300,790],[690,770],[835,970],[690,1190],[340,1160],[225,980]];
    fillInk(c,L,cloth,P.paperShade,sd('cloth'),3.3,.9);
    // folds
    [
      [[300,835],[430,900],[610,884],[760,950]],
      [[260,980],[420,1010],[585,990],[730,1060]],
      [[350,1115],[500,1080],[665,1120]],
      [[430,805],[470,930],[455,1110]]
    ].forEach((p,i)=>stroke(c,L,p,P.inkFaint,sd('fold',i),1.5,.45));
    L.hatch(c,cloth,{spacing:15,angle:-.9,length:[22,70],density:.26,color:P.inkSoft,alpha:.2,width:1,seed:sd('cloth-hatch')});
  }
  function drawInfant(c,L,P,t){
    const tw=L.onTwos(t);
    const breath=Math.sin(tw*TAU*1.35)*.5+.5;
    c.save();
    c.translate(525,875);
    c.rotate(.53);
    // torso bean
    const torso=ell(0,90,92+breath*3,135+breath*2,.04,34);
    fillInk(c,L,torso,P.selfPale,sd('baby-torso'),4.4);
    L.hatch(c,torso,{spacing:12,angle:-.8,length:[12,38],density:(x)=>clamp((x+30)/140)*.45,color:P.selfDeep,alpha:.24,width:1,seed:sd('baby-hatch')});
    // head
    const head=ell(-55,-58,78,92,-.08,34);
    fillInk(c,L,head,P.selfPale,sd('baby-head'),4.6);
    // small hair shadow / cranium
    stroke(c,L,[[-108,-78],[-86,-125],[-42,-145],[2,-123],[18,-92]],P.inkSoft,sd('hair'),3,.55);
    // face tiny
    stroke(c,L,[[-72,-64],[-56,-67]],P.ink,sd('eye'),1.6,.8);
    stroke(c,L,[[-40,-61],[-32,-50],[-36,-42]],P.inkSoft,sd('nose'),1.3,.65);
    stroke(c,L,[[-61,-26],[-42,-24]],P.inkSoft,sd('mouth'),1.3,.6);
    // near arm flexed
    fillInk(c,L,limb(-36,20,-115,45,24,19),P.selfPale,sd('arm-a'),3.4);
    fillInk(c,L,limb(-115,45,-84,105,19,15),P.selfPale,sd('arm-b'),3.2);
    const hand=ell(-78,110,18,13,.2,18); fillInk(c,L,hand,P.selfPale,sd('hand'),2.5);
    // far arm
    fillInk(c,L,limb(42,22,88,76,23,18),P.selfPale,sd('farm-a'),3.3,.9);
    fillInk(c,L,limb(88,76,66,124,18,14),P.selfPale,sd('farm-b'),3,.9);
    // legs flexed
    fillInk(c,L,limb(-38,190,-105,220,33,28),P.selfPale,sd('leg-a'),3.6);
    fillInk(c,L,limb(-105,220,-70,275,28,20),P.selfPale,sd('leg-b'),3.3);
    fillInk(c,L,ell(-58,286,34,18,.3,18),P.selfPale,sd('foot-a'),2.8);
    fillInk(c,L,limb(42,188,112,215,34,28),P.selfPale,sd('leg2-a'),3.6);
    fillInk(c,L,limb(112,215,88,272,28,20),P.selfPale,sd('leg2-b'),3.3);
    fillInk(c,L,ell(98,282,34,18,-.1,18),P.selfPale,sd('foot-b'),2.8);

    // swaddle edge, keeps body linked to environment
    stroke(c,L,[[-104,165],[-24,220],[72,222],[140,175]],P.birthRose,sd('swaddle'),2.4,.65);
    c.restore();
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeApricot],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    drawRoom(c,L,P);
    drawAdultSupport(c,L,P,t);
    drawCloth(c,L,P);
    drawInfant(c,L,P,t);

    // breath ring appears from chest
    const bp=L.seg(t,.45,.78,'outExpo'),ba=1-L.seg(t,.68,1.0,'outQuad');
    if(bp>0&&ba>0)L.guideCircle(c,575,930,42+65*bp,{color:P.annYellow,alpha:.7*ba,width:3,quadrants:8});

    // hand movement arc
    const hp=L.seg(t,.92,1.3,'outBack');
    if(hp>0)L.arcAnnotation(c,468,950,115,2.55,1.5,{color:P.annBlue,width:2.4,p:hp,arrow:11,alpha:.72});

    // exit enclosure curve becomes next ruler/bracket
    const ep=L.seg(t,1.32,1.5,'outExpo');
    if(ep>0){
      c.save();c.strokeStyle=P.annYellow;c.globalAlpha=.6*ep;c.lineWidth=2.5;c.beginPath();
      c.moveTo(310,1110);c.quadraticCurveTo(245,930,285,770);c.stroke();c.restore();
    }
  }});
})();