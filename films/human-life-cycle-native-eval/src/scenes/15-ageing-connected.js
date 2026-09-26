// 15 · Later life · T 25.500–27.500
// Layers: paper/garden · path/bench/foliage · older protagonist + companion · seed motif
(function(){
  'use strict';
  const ID='ageing-connected',TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const sd=(...k)=>FILM.lib.hash(ID,...k)&0x7fffffff;
  function fill(c,L,pts,col,seed,w=3.6,a=1){L.inkPath(c,pts,{closed:true,fill:col,fillAlpha:a,color:L.pal.ink,alpha:a,width:w,seed,wobble:1,tremble:.28,boilAmp:.45,double:w>4?{offset:2.2,width:1.1,alpha:.16,seed:seed+1}:false});}
  function ink(c,L,pts,col,seed,w=1.8,a=1,t=[5,10]){L.inkPath(c,pts,{closed:false,color:col,width:w,alpha:a,seed,wobble:.75,tremble:.23,boilAmp:.35,taper:t});}
  function ell(cx,cy,rx,ry,rot=0,n=26){const out=[],cr=Math.cos(rot),sr=Math.sin(rot);for(let i=0;i<n;i++){const a=i/n*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;out.push([cx+x*cr-y*sr,cy+x*sr+y*cr]);}return out;}
  function limb(ax,ay,bx,by,wa,wb){const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;return[[ax+nx*wa,ay+ny*wa],[bx+nx*wb,by+ny*wb],[bx-nx*wb,by-ny*wb],[ax-nx*wa,ay-ny*wa]];}

  function older(c,L,P,o,t){
    const s=o.s||1,seed=o.seed,x=o.x,y=o.y,hero=o.hero;
    const tw=L.onTwos(t+(o.phase||0)),walk=Math.sin(tw*TAU*1.0)*.45;
    const lean=.10,step=hero?.55:.75;
    c.save();c.translate(x,y);c.rotate(lean*(hero?1:-.3));
    const headY=-485*s,shoulderY=-398*s,pelvisY=-205*s;
    // legs, short step
    fill(c,L,limb(-34*s,pelvisY,-42*s+walk*12*s,-105*s,27*s,20*s),o.deep,seed+2,3*s);
    fill(c,L,limb(-42*s+walk*12*s,-105*s,-46*s+walk*step*28*s,-6*s,20*s,14*s),o.deep,seed+3,2.7*s);
    fill(c,L,limb(34*s,pelvisY,46*s-walk*12*s,-105*s,28*s,20*s),P.inkSoft,seed+4,3*s);
    fill(c,L,limb(46*s-walk*12*s,-105*s,50*s-walk*step*28*s,-6*s,20*s,14*s),P.inkSoft,seed+5,2.7*s);
    fill(c,L,[[-69*s+walk*step*28*s,-14*s],[-28*s+walk*step*28*s,-14*s],[-4*s+walk*step*28*s,-3*s],[-8*s+walk*step*28*s,10*s],[-68*s+walk*step*28*s,10*s]],P.ink,seed+6,2.2*s);
    fill(c,L,[[28*s-walk*step*28*s,-14*s],[69*s-walk*step*28*s,-14*s],[93*s-walk*step*28*s,-3*s],[90*s-walk*step*28*s,10*s],[30*s-walk*step*28*s,10*s]],P.ink,seed+7,2.2*s);

    // torso/pelvis muted but recognisable
    const torso=[[-78*s,-414*s],[-50*s,-438*s],[-16*s,-448*s],[40*s,-440*s],[76*s,-410*s],[65*s,-305*s],[50*s,-235*s],[-50*s,-235*s],[-65*s,-308*s]];
    fill(c,L,torso,o.col,seed+10,4*s);
    L.hatch(c,torso,{spacing:10*s,angle:-.8,length:[14*s,40*s],density:(hx)=>clamp((hx+10*s)/(105*s))*.5,color:o.deep,alpha:.42,width:1*s,seed:seed+11});
    fill(c,L,[[-50*s,-238*s],[-56*s,-202*s],[-42*s,-178*s],[43*s,-178*s],[53*s,-205*s],[48*s,-238*s]],o.deep,seed+12,3.2*s);

    // reduced arm swing + gesture
    const gesture=o.gesture||0;
    const shL=[-70*s,shoulderY],elL=[-88*s,-315*s],wrL=[-72*s,-248*s];
    const shR=[70*s,shoulderY],elR=[90*s-gesture*18*s,-320*s],wrR=[72*s+gesture*45*s,-250*s-gesture*25*s];
    fill(c,L,limb(...shL,...elL,18*s,13*s),o.col,seed+13,2.8*s);
    fill(c,L,limb(...elL,...wrL,13*s,9*s),P.selfPale,seed+14,2.4*s);
    fill(c,L,limb(...shR,...elR,18*s,13*s),o.col,seed+15,2.8*s);
    fill(c,L,limb(...elR,...wrR,13*s,9*s),P.selfPale,seed+16,2.4*s);
    fill(c,L,ell(wrR[0],wrR[1],13*s,10*s,-.2,16),P.selfPale,seed+17,2.1*s);

    // neck/head/hair
    fill(c,L,[[-18*s,-438*s],[20*s,-438*s],[22*s,-418*s],[-20*s,-418*s]],P.selfPale,seed+18,2.2*s);
    fill(c,L,ell(0,headY,45*s,53*s,-.02,28),P.selfPale,seed+19,3.3*s);
    const hair=hero?L.mix(P.ink,P.paper,.45):L.mix(P.ink,o.col,.2);
    fill(c,L,[[-39*s,-507*s],[-27*s,-535*s],[-5*s,-544*s],[20*s,-536*s],[39*s,-515*s],[34*s,-495*s],[13*s,-510*s],[-9*s,-512*s],[-30*s,-499*s]],hair,seed+20,2*s);
    // face and age marks
    ink(c,L,[[-16*s,-487*s],[-3*s,-490*s]],P.ink,seed+21,1.1*s,.75);
    ink(c,L,[[8*s,-487*s],[15*s,-477*s],[12*s,-470*s]],P.inkSoft,seed+22,1*s,.6);
    ink(c,L,[[-9*s,-456*s],[10*s,-455*s]],P.inkSoft,seed+23,1*s,.55);
    if(hero){
      ink(c,L,[[-28*s,-475*s],[-19*s,-470*s]],P.inkFaint,seed+24,.9,.5);
      ink(c,L,[[18*s,-470*s],[27*s,-465*s]],P.inkFaint,seed+25,.9,.5);
      ink(c,L,[[-72*s,-405*s],[-60*s,-394*s],[-68*s,-381*s]],P.cycleGold,seed+26,1.8*s,.85);
    }
    c.restore();
  }

  function garden(c,L,P,t){
    c.fillStyle=L.rgba(P.stripeSpring,.22);c.fillRect(0,300,1080,1620);
    // distant wall/building
    c.save();c.globalAlpha=.24;c.fillStyle=P.paperShade;c.fillRect(75,350,930,540);
    ink(c,L,[[120,840],[120,480],[330,430],[530,470],[760,435],[950,490],[950,840]],P.inkFaint,sd('wall'),1.4,.42,[0,0]);c.restore();
    // bench
    fill(c,L,[[690,1060],[980,1055],[975,1095],[685,1100]],P.wood,sd('bench'),2.4,.6);
    ink(c,L,[[720,1100],[700,1310],[940,1098],[958,1310]],P.inkSoft,sd('benchlegs'),4,.5,[0,0]);
    // path curve
    c.save();c.strokeStyle=L.rgba(P.inkFaint,.34);c.lineWidth=2;c.beginPath();c.moveTo(-50,1510);c.bezierCurveTo(260,1370,760,1370,1130,1480);c.stroke();c.restore();

    // foliage depth bands
    const r=L.rng(sd('plants'));
    for(let i=0;i<42;i++){
      const x=25+r()*1030,y=1110+r()*500,h=45+r()*165;
      const col=i%3===0?P.ageSage:i%3===1?P.sage:P.leaf;
      ink(c,L,[[x,y],[x+(r()-.5)*25,y-h]],col,sd('stem',i),1.4,.45,[2,5]);
      for(let k=1;k<=3;k++){
        const u=k/4,px=x+(r()-.5)*18,py=y-h*u;
        fill(c,L,ell(px+(k%2?18:-18),py,24,9,k%2?.25:-.25,16),col,sd('leaf',i,k),1.2,.33);
      }
    }
    // foreground seed heads
    for(let i=0;i<6;i++){
      const x=75+i*185,y=1540+(i%2)*35,h=200+(i%3)*30;
      ink(c,L,[[x,y],[x+12*(i%2?1:-1),y-h]],P.ageSage,sd('fgstem',i),2.2,.7,[3,8]);
      const tx=x+12*(i%2?1:-1),ty=y-h;
      c.save();c.fillStyle=P.ochre;c.globalAlpha=.65;c.beginPath();c.arc(tx,ty,14+(i%2)*4,0,TAU);c.fill();c.restore();
      for(let k=0;k<10;k++){const a=k/10*TAU;ink(c,L,[[tx,ty],[tx+Math.cos(a)*30,ty+Math.sin(a)*26]],P.inkSoft,sd('seedray',i,k),.9,.45,[0,0]);}
    }
  }

  FILM.scene({id:ID,draw(c,tIn,info){
    const L=info.lib,P=L.pal,t=clamp(tIn,0,info.dur);
    L.paper(c,{seed:sd('paper')});L.stripes(c,{colors:[P.stripeCream,P.stripeSpring],width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')});
    garden(c,L,P,t);

    const g=L.seg(t,.65,1.25,'inOutCubic');
    older(c,L,P,{x:430,y:1435,s:.83,col:L.mix(P.selfWarm,P.ageSage,.22),deep:P.selfDeep,seed:sd('hero'),hero:true,gesture:g},t);
    older(c,L,P,{x:675,y:1430,s:.79,col:P.ageSage,deep:L.mix(P.ageSage,P.ink,.42),seed:sd('comp'),phase:.18,gesture:.35},t);

    // continuing individual path
    ink(c,L,[[250,1475],[340,1445],[430,1438],[530,1415],[650,1400],[760,1370]],P.selfWarm,sd('path'),3,.45,[8,16]);

    // seed motif near companion gesture
    const p=L.seg(t,1.42,1.82,'outBack');
    if(p>0){
      const x=765,y=1160;
      L.glowDot(c,x,y,5+4*p,{color:P.cycleGold,core:P.glow,rays:8,seed:sd('seed'),intensity:.55+.45*p,glow:4.2,twinkle:.03});
      L.guideCircle(c,x,y,26+44*p,{color:P.cycleGold,alpha:.34*(1-L.seg(t,1.75,2)),width:2.2,quadrants:7});
    }
    const e=L.seg(t,1.72,2,'outExpo');
    if(e>0)L.arcAnnotation(c,765,1160,165,2.8,4.5,{color:P.annYellow,width:2.2,p:e,arrow:10,alpha:.55});
  }});
})();