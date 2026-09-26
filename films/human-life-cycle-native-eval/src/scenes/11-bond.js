// 11 · Relation · T 18.000–20.000
// Layers: paper/plaza · bench/background figure · two constructed people · reciprocal hand gesture · paired arcs
(function(){
  'use strict';
  const ID='bond',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;
  function fill(c,L,pts,col,seed,w=3.8,a=1){L.inkPath(c,pts,{closed:true,fill:col,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1,tremble:.28,boilAmp:.45,double:w>4?{offset:2.2,width:1.1,alpha:.17,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=1.8,a=1,t=[5,10]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.75,tremble:.23,boilAmp:.35,taper:t});}
  function ell(cx,cy,rx,ry,rot=0,n=26){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}
  function hand(x,y,rot,s){const b=[[-20,-9],[-2,-14],[17,-9],[25,-2],[19,8],[8,16],[-5,15],[-17,9],[-24,1]],cr=Math.cos(rot),sr=Math.sin(rot);return b.map(([px,py])=>[x+(px*cr-py*sr)*s,y+(px*sr+py*cr)*s]);}

  function person(c,L,P,o,t){
    const s=o.s||1,seed=o.seed,x=o.x,y=o.y,col=o.col,deep=o.deep;
    const ext=o.extend||0,lean=o.lean||0;
    c.save();c.translate(x,y);c.rotate(lean);
    const headY=-520*s,shoulderY=-430*s,pelvisY=-210*s;
    // legs
    fill(c,L,limb(-35*s,pelvisY,-42*s,-105*s,-28*s<0?28*s:28*s,20*s),deep,seed+1,3*s);
    fill(c,L,limb(-42*s,-105*s,-48*s,-5*s,20*s,14*s),deep,seed+2,2.7*s);
    fill(c,L,limb(35*s,pelvisY,48*s,-105*s,29*s,20*s),P.inkSoft,seed+3,3*s);
    fill(c,L,limb(48*s,-105*s,52*s,-5*s,20*s,14*s),P.inkSoft,seed+4,2.7*s);
    fill(c,L,[[-72*s,-14*s],[-28*s,-14*s],[-4*s,-3*s],[-8*s,10*s],[-70*s,10*s]],P.ink,seed+5,2.2*s);
    fill(c,L,[[28*s,-14*s],[72*s,-14*s],[96*s,-3*s],[92*s,10*s],[30*s,10*s]],P.ink,seed+6,2.2*s);
    // torso/pelvis
    const torso=[[-82*s,-447*s],[-52*s,-470*s],[-18*s,-480*s],[44*s,-472*s],[80*s,-442*s],[68*s,-328*s],[52*s,-245*s],[-52*s,-245*s],[-68*s,-330*s]];
    fill(c,L,torso,col,seed+10,4.2*s);
    L.hatch(c,torso,{spacing:10*s,angle:-.8,length:[14*s,40*s],density:(hx)=>clamp((hx+10*s)/(110*s))*.46,color:deep,alpha:.38,width:1*s,seed:seed+11});
    fill(c,L,[[-52*s,-248*s],[-58*s,-206*s],[-43*s,-178*s],[45*s,-178*s],[56*s,-210*s],[50*s,-248*s]],deep,seed+12,3.2*s);
    // outer arm
    const side=o.side;
    const sh=[side*74*s,shoulderY];
    const el=[side*(105+42*ext)*s,-335*s-10*ext*s];
    const wr=[side*(112+118*ext)*s,-264*s-26*ext*s];
    fill(c,L,limb(...sh,...el,20*s,15*s),col,seed+13,3*s);
    fill(c,L,limb(...el,...wr,15*s,11*s),P.selfPale,seed+14,2.6*s);
    fill(c,L,hand(wr[0],wr[1],side*(.2-.45*ext),.72*s),P.selfPale,seed+15,2.2*s);
    // other arm relaxed
    const sh2=[-side*74*s,shoulderY],el2=[-side*95*s,-330*s],wr2=[-side*72*s,-250*s];
    fill(c,L,limb(...sh2,...el2,19*s,14*s),col,seed+16,2.9*s);
    fill(c,L,limb(...el2,...wr2,14*s,10*s),P.selfPale,seed+17,2.4*s);
    // neck/head
    fill(c,L,[[-18*s,-475*s],[20*s,-475*s],[22*s,-451*s],[-20*s,-451*s]],P.selfPale,seed+18,2.3*s);
    fill(c,L,ell(0,headY,46*s,55*s,-side*.02,28),P.selfPale,seed+19,3.4*s);
    fill(c,L,[[-40*s,-542*s],[-28*s,-572*s],[-5*s,-582*s],[20*s,-574*s],[40*s,-551*s],[35*s,-530*s],[14*s,-546*s],[-9*s,-548*s],[-31*s,-534*s]],o.hero?P.ink:L.mix(P.ink,col,.14),seed+20,2.2*s);
    ink(c,L,[[side*-18*s,-520*s],[side*-3*s,-523*s]],P.ink,seed+21,1.2*s,.75);
    ink(c,L,[[side*9*s,-520*s],[side*16*s,-510*s],[side*12*s,-503*s]],P.inkSoft,seed+22,1*s,.6);
    if(o.hero)ink(c,L,[[-76*s,-438*s],[-64*s,-427*s],[-72*s,-413*s]],P.cycleGold,seed+23,1.8*s,.9);
    c.restore();
  }

  function environment(c,L,P){
    c.save();c.globalAlpha=.38;
    c.fillStyle=P.paperShade;c.fillRect(80,320,920,730);
    c.fillStyle=L.rgba(P.stripeSage,.24);c.fillRect(0,1060,1080,860);
    // bench
    fill(c,L,[[130,1050],[410,1048],[405,1085],[125,1088]],P.wood,sd('bench'),2.4,.55);
    ink(c,L,[[165,1088],[150,1250],[370,1085],[390,1250]],P.inkSoft,sd('legs'),4,.45,[0,0]);
    // far window/door
    c.fillStyle=L.rgba(P.stripeSky,.25);c.fillRect(700,430,210,360);
    ink(c,L,[[700,790],[700,430],[910,430],[910,790]],P.inkFaint,sd('door'),1.4,.45,[0,0]);
    // soft background figure
    c.globalAlpha=.25;
    fill(c,L,ell(835,770,33,41,0,22),P.selfPale,sd('bghead'),2,.8);
    fill(c,L,[[795,820],[820,795],[850,798],[880,825],[868,1010],[807,1010]],P.birthRose,sd('bgtorso'),2.5,.7);
    c.restore();
    // floor lines
    for(let y=1160,i=0;y<1880;y+=95,i++)ink(c,L,[[0,y],[1080,y-45]],P.inkFaint,sd('floor',i),1,.18,[0,0]);
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    environment(c,L,P);
    const a=L.seg(t,.32,.85,'inOutCubic');
    const b=L.seg(t,.82,1.35,'inOutCubic');
    person(c,L,P,{x:385,y:1415,s:.78,col:P.selfWarm,deep:P.selfDeep,seed:sd('hero'),side:1,extend:a,lean:-.03,hero:true},t);
    person(c,L,P,{x:695,y:1410,s:.76,col:P.socialBlue,deep:P.socialDeep,seed:sd('other'),side:-1,extend:b,lean:.025},t);

    // reciprocal physical exchange
    const p=L.seg(t,.35,1.35,'outExpo');
    if(p>0){
      L.arcAnnotation(c,535,1120,180,2.85,4.95,{color:P.annBlue,width:2.3,p:Math.min(1,p*1.2),arrow:10,alpha:.55});
      L.arcAnnotation(c,545,1120,180,.3,-1.8,{color:P.annBlue,width:2.1,p:Math.max(0,(p-.3)/.7),arrow:10,alpha:.45});
    }
    const touch=L.seg(t,.92,1.15,'outBack');
    if(touch>0)L.guideCircle(c,540,1185,24+30*touch,{color:P.cycleGold,alpha:.55*(1-L.seg(t,1.25,1.7)),width:2.4,quadrants:6});

    // exit paired arcs collapse to role-system rings
    const e=L.seg(t,1.55,2,'outExpo');
    if(e>0){L.guideCircle(c,540,1050,145,{color:P.annYellow,alpha:.18+.32*e,width:2});L.guideCircle(c,540,1050,215,{color:P.annBlue,alpha:.12+.24*e,width:1.6});}
  }});
})();