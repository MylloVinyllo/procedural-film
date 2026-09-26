// 13 · Contribution · T 21.500–24.000
// Layers: paper/workshop · shelves/tools · worktable · two constructed figures · modular object · memory trace
(function(){
  'use strict';
  const ID='create-contribute',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;
  function fill(c,L,pts,col,seed,w=3.6,a=1){L.inkPath(c,pts,{closed:true,fill:col,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1,tremble:.28,boilAmp:.45,double:w>4?{offset:2.2,width:1.1,alpha:.17,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=1.8,a=1,t=[5,10]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.75,tremble:.23,boilAmp:.35,taper:t});}
  function ell(cx,cy,rx,ry,rot=0,n=26){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}
  function hand(x,y,rot,s){const b=[[-20,-9],[-3,-14],[15,-10],[24,-3],[19,7],[8,16],[-4,15],[-17,9],[-24,1]],cr=Math.cos(rot),sr=Math.sin(rot);return b.map(([px,py])=>[x+(px*cr-py*sr)*s,y+(px*sr+py*cr)*s]);}

  function halfPerson(c,L,P,o,t){
    const x=o.x,y=o.y,s=o.s||1,seed=o.seed,col=o.col,deep=o.deep,side=o.side;
    const reach=o.reach||0;
    c.save();c.translate(x,y);
    // torso
    const torso=[[-82*s,-430*s],[-52*s,-458*s],[-16*s,-468*s],[44*s,-460*s],[80*s,-430*s],[68*s,-315*s],[52*s,-225*s],[-52*s,-225*s],[-68*s,-315*s]];
    fill(c,L,torso,col,seed+1,4*s);
    L.hatch(c,torso,{spacing:10*s,angle:-.8,length:[14*s,40*s],density:(hx)=>clamp((hx+10*s)/(110*s))*.46,color:deep,alpha:.4,width:1*s,seed:seed+2});
    // head
    fill(c,L,ell(0,-500*s,46*s,55*s,-side*.02,28),P.selfPale,seed+3,3.4*s);
    fill(c,L,[[-40*s,-522*s],[-28*s,-552*s],[-5*s,-562*s],[20*s,-554*s],[40*s,-531*s],[35*s,-510*s],[14*s,-526*s],[-9*s,-528*s],[-31*s,-514*s]],o.hero?P.ink:L.mix(P.ink,col,.15),seed+4,2.1*s);
    // neck
    fill(c,L,[[-18*s,-454*s],[20*s,-454*s],[22*s,-435*s],[-20*s,-435*s]],P.selfPale,seed+5,2.2*s);
    // work arm
    const sh=[side*72*s,-415*s],el=[side*(92-25*reach)*s,-335*s],wr=[side*(98-76*reach)*s,-250*s];
    fill(c,L,limb(...sh,...el,19*s,14*s),col,seed+6,3*s);
    fill(c,L,limb(...el,...wr,14*s,10*s),P.selfPale,seed+7,2.5*s);
    fill(c,L,hand(wr[0],wr[1],side*(.18-.5*reach),.7*s),P.selfPale,seed+8,2.1*s);
    // second arm
    const sh2=[-side*72*s,-415*s],el2=[-side*85*s,-330*s],wr2=[-side*60*s,-245*s];
    fill(c,L,limb(...sh2,...el2,18*s,13*s),col,seed+9,2.8*s);
    fill(c,L,limb(...el2,...wr2,13*s,9*s),P.selfPale,seed+10,2.4*s);
    if(o.hero)ink(c,L,[[-76*s,-422*s],[-64*s,-411*s],[-72*s,-397*s]],P.cycleGold,seed+11,1.8*s,.9);
    c.restore();
  }

  function workshop(c,L,P){
    c.save();c.globalAlpha=.4;
    c.fillStyle=P.paperShade;c.fillRect(70,260,940,700);
    // pegboard/grid
    c.fillStyle=L.rgba(P.stripeSky,.22);c.fillRect(120,390,340,360);
    for(let x=145,i=0;x<450;x+=44,i++)ink(c,L,[[x,400],[x,740]],P.inkFaint,sd('pegv',i),.9,.22,[0,0]);
    for(let y=420,i=0;y<740;y+=44,i++)ink(c,L,[[125,y],[455,y]],P.inkFaint,sd('pegh',i),.9,.22,[0,0]);
    // shelves
    [820,900].forEach((y,i)=>{fill(c,L,[[590,y],[960,y],[955,y+28],[585,y+28]],P.wood,sd('shelf',i),2.2,.55);});
    // tools / boxes
    const tools=[[175,475,35,90],[235,500,60,35],[325,455,25,110],[650,765,55,50],[740,775,90,42],[860,755,48,58]];
    tools.forEach((b,i)=>{
      c.fillStyle=L.rgba(i<3?P.ochre:P.socialBlue,.35);c.fillRect(b[0],b[1],b[2],b[3]);
      ink(c,L,[[b[0],b[1]],[b[0]+b[2],b[1]],[b[0]+b[2],b[1]+b[3]],[b[0],b[1]+b[3]],[b[0],b[1]]],P.inkFaint,sd('tool',i),1,.35,[0,0]);
    });
    c.restore();
  }

  function table(c,L,P){
    const top=[[90,1090],[990,1075],[1000,1160],[80,1175]];
    fill(c,L,top,P.wood,sd('table'),3.4,.9);
    L.hatch(c,top,{spacing:10,angle:.05,length:[25,90],density:.55,color:P.inkSoft,alpha:.32,width:1.1,seed:sd('woodgrain')});
    ink(c,L,[[140,1170],[110,1600],[930,1158],[955,1600]],P.inkSoft,sd('legs'),7,.72,[0,0]);
    // paper/tool clutter
    fill(c,L,[[175,1025],[315,1010],[335,1060],[192,1072]],P.paperShade,sd('paper1'),1.8,.86);
    fill(c,L,[[760,1018],[870,1012],[895,1055],[785,1064]],P.paperShade,sd('paper2'),1.8,.82);
    ink(c,L,[[270,1036],[350,1010]],P.inkSoft,sd('toolline'),4,.5,[0,0]);
    c.save();c.fillStyle=P.inkSoft;c.globalAlpha=.5;c.beginPath();c.arc(885,1040,18,0,TAU);c.fill();c.restore();
  }

  function object(c,L,P,t){
    const p1=L.seg(t,.35,.78,'outBack'),p2=L.seg(t,.78,1.25,'outBack'),p3=L.seg(t,1.25,1.65,'outBack');
    // base always visible as unfinished piece
    fill(c,L,[[455,1015],[630,1010],[648,1062],[438,1068]],P.paperDeep,sd('base'),2.6,.95);
    // upright piece swings into place
    c.save();c.translate(540,1015);c.rotate((1-p1)*-.7);
    fill(c,L,[[-28,-140],[26,-140],[36,0],[-34,0]],P.socialBlue,sd('upright'),2.8,.35+.65*p1);c.restore();
    // circular element arrives from right
    const cx=lerp(680,540,p2),cy=lerp(940,900,p2);
    fill(c,L,ell(cx,cy,58,58,0,28),P.ochre,sd('disc'),3,.35+.65*p2);
    c.save();c.strokeStyle=P.inkSoft;c.lineWidth=1.5;c.globalAlpha=.55*p2;c.beginPath();c.arc(cx,cy,28,0,TAU);c.stroke();c.restore();
    // small connector locks in
    if(p3>0)fill(c,L,[[520,960],[560,960],[570,998],[510,998]],P.selfDeep,sd('connector'),2.3,.45+.55*p3);

    // completed outline pulse
    if(p3>0){
      L.guideCircle(c,540,975,155,{color:P.annYellow,alpha:.18+.28*(1-L.seg(t,1.7,2.2)),width:2.2,quadrants:8});
    }
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    workshop(c,L,P);table(c,L,P);

    const ra=L.seg(t,.18,.75,'inOutCubic'),rb=L.seg(t,.62,1.2,'inOutCubic');
    halfPerson(c,L,P,{x:310,y:1340,s:.78,col:P.selfWarm,deep:P.selfDeep,seed:sd('hero'),side:1,reach:ra,hero:true},t);
    halfPerson(c,L,P,{x:775,y:1340,s:.76,col:P.ageSage,deep:L.mix(P.ageSage,P.ink,.42),seed:sd('other'),side:-1,reach:rb},t);
    object(c,L,P,t);

    // shared-action arc
    const ap=L.seg(t,.25,1.45,'outExpo');
    if(ap>0)L.arcAnnotation(c,540,1020,255,2.8,5.8,{color:P.annYellow,width:2.3,p:ap,arrow:11,alpha:.46});

    // background passer carrying echo of object
    const bg=L.seg(t,1.55,2.0,'outExpo');
    if(bg>0){
      c.save();c.globalAlpha=.22+.35*bg;c.translate(820-140*bg,865);
      fill(c,L,ell(0,-90,28,34,0,20),P.selfPale,sd('bghead'),2,.75);
      fill(c,L,[[-46,-48],[-28,-66],[25,-64],[48,-42],[38,82],[-40,82]],P.birthRose,sd('bgtorso'),2.4,.65);
      fill(c,L,ell(-55,10,28,28,0,18),P.ochre,sd('bgobj'),2,.7);c.restore();
    }

    // memory trace appears only after physical completion
    const m=L.seg(t,1.75,2.45,'outExpo');
    if(m>0){
      c.save();c.strokeStyle=P.memoryViolet;c.globalAlpha=.25+.55*m;c.lineWidth=3;c.beginPath();
      c.moveTo(540,880);c.bezierCurveTo(560,760,620,690,660,560-180*m);c.stroke();c.restore();
      L.glowDot(c,660,560-180*m,5,{color:P.memoryViolet,core:P.glow,rays:4,seed:sd('trace'),intensity:.5+.5*m,glow:3.4,twinkle:.03});
    }
  }});
})();