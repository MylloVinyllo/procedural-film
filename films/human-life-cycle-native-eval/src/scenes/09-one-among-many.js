// 09 · I among us · T 14.500–16.000
// Layers: paper/plaza · facade/steps · far crowd · mid crowd · protagonist · foreground passer · group-flow overlays
(function(){
  'use strict';
  const ID='one-among-many',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,p)=>a+(b-a)*p;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;

  function fill(c,L,pts,col,seed,w=3.6,a=1){L.inkPath(c,pts,{closed:true,fill:col,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1,tremble:.28,boilAmp:.45,double:w>4?{offset:2.2,width:1.1,alpha:.17,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=1.8,a=1,t=[5,10]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.8,tremble:.24,boilAmp:.35,taper:t});}
  function ell(cx,cy,rx,ry,rot=0,n=26){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}

  function person(c,L,P,o,t){
    const s=o.s||1,x=o.x,y=o.y,seed=o.seed,col=o.col||P.socialBlue,deep=o.deep||L.mix(col,P.ink,.42);
    const tw=L.onTwos(t+(o.phase||0));
    const walk=Math.sin(tw*TAU*(o.rate||1.5));
    const off=o.hero?0:walk*8*s;
    c.save();c.translate(x,y);if(o.flip)c.scale(-1,1);

    // far shadow
    c.save();c.globalAlpha=.1*(o.alpha||1);c.fillStyle=P.ink;c.beginPath();c.ellipse(0,9*s,60*s,12*s,0,0,TAU);c.fill();c.restore();

    const headY=-520*s,shoulderY=-430*s,pelvisY=-210*s;
    const alpha=o.alpha==null?1:o.alpha;c.globalAlpha*=alpha;

    // legs
    const hipL=[-35*s,pelvisY],kneeL=[-45*s+walk*20*s,-110*s],ankleL=[-50*s+walk*42*s,-5*s];
    const hipR=[35*s,pelvisY],kneeR=[48*s-walk*20*s,-110*s],ankleR=[50*s-walk*42*s,-5*s];
    fill(c,L,limb(...hipL,...kneeL,28*s,20*s),deep,seed+1,3*s);
    fill(c,L,limb(...kneeL,...ankleL,20*s,14*s),deep,seed+2,2.8*s);
    fill(c,L,limb(...hipR,...kneeR,29*s,20*s),P.inkSoft,seed+3,3*s);
    fill(c,L,limb(...kneeR,...ankleR,20*s,14*s),P.inkSoft,seed+4,2.8*s);
    fill(c,L,[[-73*s+walk*42*s,-13*s],[-30*s+walk*42*s,-14*s],[-4*s+walk*42*s,-3*s],[-10*s+walk*42*s,10*s],[-72*s+walk*42*s,10*s]],P.ink,seed+5,2.3*s);
    fill(c,L,[[30*s-walk*42*s,-13*s],[73*s-walk*42*s,-14*s],[96*s-walk*42*s,-3*s],[92*s-walk*42*s,10*s],[31*s-walk*42*s,10*s]],P.ink,seed+6,2.3*s);

    // torso/pelvis
    const torso=[[-82*s,-447*s],[-53*s,-468*s],[-18*s,-478*s],[45*s,-470*s],[80*s,-440*s],[68*s,-325*s],[52*s,-245*s],[-52*s,-245*s],[-68*s,-326*s]];
    fill(c,L,torso,col,seed+10,4*s);
    if(o.hero)L.hatch(c,torso,{spacing:10*s,angle:-.8,length:[14*s,40*s],density:(hx)=>clamp((hx+10*s)/(110*s))*.52,color:P.selfDeep,alpha:.43,width:1.05*s,seed:seed+11});
    fill(c,L,[[-52*s,-248*s],[-58*s,-207*s],[-43*s,-180*s],[45*s,-180*s],[56*s,-210*s],[50*s,-248*s]],deep,seed+12,3.4*s);

    // arms
    const shL=[-74*s,shoulderY],elL=[-98*s-walk*12*s,-326*s],wrL=[-72*s-walk*25*s,-250*s];
    const shR=[74*s,shoulderY],elR=[98*s+walk*12*s,-326*s],wrR=[72*s+walk*25*s,-250*s];
    fill(c,L,limb(...shL,...elL,20*s,15*s),col,seed+13,3*s);
    fill(c,L,limb(...elL,...wrL,15*s,11*s),P.selfPale,seed+14,2.5*s);
    fill(c,L,ell(wrL[0],wrL[1],13*s,10*s,-.2,16),P.selfPale,seed+15,2*s);
    fill(c,L,limb(...shR,...elR,20*s,15*s),col,seed+16,3*s);
    fill(c,L,limb(...elR,...wrR,15*s,11*s),P.selfPale,seed+17,2.5*s);
    fill(c,L,ell(wrR[0],wrR[1],13*s,10*s,.2,16),P.selfPale,seed+18,2*s);

    // neck/head
    fill(c,L,[[-18*s,-474*s],[20*s,-474*s],[22*s,-450*s],[-20*s,-450*s]],P.selfPale,seed+20,2.3*s);
    fill(c,L,ell(0,headY+off,46*s,55*s,-.03,28),P.selfPale,seed+21,3.3*s);
    const hair=o.hero?P.ink:L.mix(P.ink,col,.12);
    fill(c,L,[[-40*s,(-542+off/s)*s],[-29*s,(-572+off/s)*s],[-5*s,(-581+off/s)*s],[20*s,(-574+off/s)*s],[40*s,(-551+off/s)*s],[35*s,(-530+off/s)*s],[14*s,(-546+off/s)*s],[-9*s,(-548+off/s)*s],[-31*s,(-534+off/s)*s]],hair,seed+22,2.1*s);
    if(s>.55){
      ink(c,L,[[-16*s,(-520+off/s)*s],[-3*s,(-523+off/s)*s]],P.ink,seed+23,1.2*s,.7);
      ink(c,L,[[8*s,(-520+off/s)*s],[15*s,(-510+off/s)*s],[11*s,(-503+off/s)*s]],P.inkSoft,seed+24,1*s,.55);
    }
    if(o.hero){
      ink(c,L,[[-76*s,-438*s],[-64*s,-427*s],[-72*s,-413*s]],P.cycleGold,seed+25,1.9*s,.9);
    }
    c.restore();
  }

  function plaza(c,L,P){
    c.save();c.globalAlpha=.38;
    c.fillStyle=P.paperShade;c.fillRect(70,250,940,750);
    // facade and door rhythm
    for(let x=130,i=0;x<980;x+=180,i++){
      c.fillStyle=L.rgba(i%2?P.stripeSky:P.paperDeep,.28);
      c.fillRect(x,430+(i%2)*25,120,280);
      ink(c,L,[[x,710],[x,430+(i%2)*25],[x+120,430+(i%2)*25],[x+120,710]],P.inkFaint,sd('door',i),1.2,.45,[0,0]);
    }
    // steps / bench
    for(let k=0;k<3;k++)ink(c,L,[[90,940+k*45],[990,920+k*45]],P.inkFaint,sd('step',k),1.4,.38,[0,0]);
    fill(c,L,[[720,1020],[960,1018],[955,1055],[716,1058]],P.wood,sd('bench'),2,.5);
    c.restore();

    // ground perspective
    c.fillStyle=L.rgba(P.stripeSage,.18);c.fillRect(0,1030,1080,890);
    for(let y=1090,i=0;y<1900;y+=90,i++)ink(c,L,[[0,y],[1080,y-55]],P.inkFaint,sd('paveh',i),1,.18,[0,0]);
    [70,230,420,650,820,1010].forEach((x,i)=>ink(c,L,[[x,1920],[540,840]],P.inkFaint,sd('pavev',i),1,.12,[0,0]));
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur),tw=L.onTwos(t);
    L.paper(c,{seed:sd('paper')});
    L.stripes(c,{colors:[P.stripeCream,P.stripeSage],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    plaza(c,L,P);

    // far crowd
    [
      {x:180,y:1110,s:.42,col:P.ageSage,phase:.2,flip:1},{x:310,y:1080,s:.38,col:P.birthRose,phase:.4},
      {x:780,y:1095,s:.41,col:P.socialBlue,phase:.1,flip:1},{x:915,y:1125,s:.36,col:P.ochre,phase:.55}
    ].forEach((o,i)=>person(c,L,P,Object.assign({seed:sd('far',i),alpha:.58},o),t));

    // mid crowd
    [
      {x:300,y:1310,s:.62,col:P.socialBlue,phase:.35},{x:720,y:1300,s:.66,col:P.ageSage,phase:.15,flip:1},
      {x:850,y:1350,s:.55,col:P.birthRose,phase:.45},{x:220,y:1380,s:.52,col:P.ochre,phase:.05,flip:1}
    ].forEach((o,i)=>person(c,L,P,Object.assign({seed:sd('mid',i),alpha:.78},o),t));

    // protagonist
    const off=L.seg(t,.9,1.2,'snap');
    person(c,L,P,{x:540,y:1085,s:.82,col:P.selfWarm,deep:P.selfDeep,phase:off?-.12:.05,hero:true,seed:sd('hero'),alpha:1},t);

    // G3 is physically attached to the protagonist's chest for the entire shot.
    L.guideCircle(c,540,820,48,{color:P.cycleGold,alpha:.42,width:2});
    L.glowDot(c,540,820,5,{color:P.cycleGold,core:P.glow,rays:0,seed:sd('g3-core'),intensity:.62,glow:3,twinkle:.02});

    // foreground crop for parallax
    c.save();c.globalAlpha=.55;c.translate(980-120*t,1450);
    fill(c,L,ell(0,-230,70,84,0,22),P.selfPale,sd('fghead'),3,.8);
    fill(c,L,[[-125,-165],[-75,-215],[55,-205],[125,-150],[105,120],[-100,130]],P.socialDeep,sd('fgtorso'),4,.65);
    c.restore();

    // individual trajectory
    ink(c,L,[[250,1190],[360,1140],[470,1110],[540,1088],[650,1120],[760,1180]],P.selfWarm,sd('traj'),3.7,.65,[8,16]);

    // group flow strokes
    const gp=L.seg(t,.3,.85,'outExpo');
    if(gp>0){
      L.arcAnnotation(c,520,1070,300,2.55,5.2,{color:P.annBlue,width:2,p:gp,arrow:11,alpha:.42});
      L.arcAnnotation(c,560,990,360,2.8,5.0,{color:P.annBlue,width:1.6,p:gp,arrow:9,alpha:.28});
    }

    // G3 chest marker becomes exact exit
    const g=L.seg(t,1.15,1.5,'outExpo');
    if(g>0){
      const cx=540,cy=820;
      L.guideCircle(c,cx,cy,48,{color:P.cycleGold,alpha:.5+.4*g,width:2.2});
      L.guideCircle(c,cx,cy,48+65*g,{color:P.annYellow,alpha:.28*(1-g),width:2});
    }
  }});
})();