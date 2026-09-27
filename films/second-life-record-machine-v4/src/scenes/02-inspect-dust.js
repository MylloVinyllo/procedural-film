// 02 · Something is wrong · T 3.000–6.000
// Record inspection under a practical lamp. Layers:
// 1 room/table, 2 protagonist bust, 3 held record + safe hands,
// 4 moving reflected groove light, 5 dust macro inset, 6 attention graphics.
(function(){
  'use strict';

  const ID='inspect-dust',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,alpha=1){c.save();c.globalAlpha*=alpha;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,width=3,alpha=1){
    fill(c,pts,color,alpha);
    L.inkPath(c,pts,{closed:true,color:P.ink,width,alpha:.92*alpha,seed,wobble:.75,tremble:.16,boilAmp:.28,double:width>=5?{offset:2,width:1,alpha:.12,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,width=2,color=P.inkSoft,alpha=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width,alpha,seed,wobble:.55,tremble:.12,boilAmp:.18,taper:[4,8]});
  }
  function halftone(c,pts,color,spacing=13,r=1.5,alpha=.22,seed=1){
    c.save();trace(c,pts,true);c.clip();c.fillStyle=color;c.globalAlpha*=alpha;
    const ox=(L.hash(seed,'x')%spacing),oy=(L.hash(seed,'y')%spacing);
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    for(const p of pts){if(p[0]<minX)minX=p[0];if(p[0]>maxX)maxX=p[0];if(p[1]<minY)minY=p[1];if(p[1]>maxY)maxY=p[1];}
    minX-=spacing;maxX+=spacing;minY-=spacing;maxY+=spacing;
    const y0=Math.floor((minY-oy)/spacing)*spacing+oy;
    c.beginPath();
    for(let y=y0;y<=maxY;y+=spacing){
      const shift=(Math.floor(y/spacing)&1)?spacing*.5:0;
      const x0=Math.floor((minX-ox-shift)/spacing)*spacing+ox+shift;
      for(let x=x0;x<=maxX;x+=spacing){c.moveTo(x+r,y);c.arc(x,y,r,0,TAU);}
    }
    c.fill();c.restore();
  }
  function rectPts(x,y,w,h){return [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}

  function drawRoom(c,t){
    c.save();c.fillStyle=P.roomWall;c.fillRect(0,0,1080,1920);c.restore();
    fill(c,[[0,0],[380,0],[180,1180],[0,1300]],P.paperShade,.28);
    c.save();c.fillStyle=P.table;c.fillRect(0,1310,1080,610);c.restore();
    for(let i=0;i<16;i++)line(c,[[-30,1360+i*35],[1110,1365+i*35+7*Math.sin(i)]],sd('wood',i),1,P.inkSoft,.16);

    // practical lamp focused toward record
    line(c,[[815,180],[805,400],[750,520]],sd('lamp-arm'),5,P.inkSoft,.72);
    const shade=[[690,430],[855,430],[910,565],[650,565]];
    inkFill(c,shade,P.lamp,sd('shade'),3.4,.96);
    fill(c,[[680,565],[880,565],[800,900],[610,900]],P.sun,.08);

    // quieter background record shelf and speaker establish continuity with scene 01
    const shelf=rectPts(35,330,230,740);fill(c,shelf,P.wood,.6);
    [540,760,980].forEach((y,i)=>line(c,[[35,y],[265,y]],sd('shelf',i),3.5,P.inkSoft,.45));
    let x=60;const cols=[P.sleeve,P.rose,P.teal,P.ochre,P.stripeSky];
    for(let i=0;i<8;i++){const w=18+(i%3)*8,h=155+(i%2)*20;fill(c,rectPts(x,540-h,w,h),cols[i%cols.length],.5);x+=w+7;}
    const sp=rectPts(870,800,155,410);inkFill(c,sp,P.speaker,sd('sp'),2.5,.48);
    c.save();c.fillStyle=P.speakerCone;c.globalAlpha=.48;c.beginPath();c.arc(948,1030,50,0,TAU);c.fill();c.beginPath();c.arc(948,875,24,0,TAU);c.fill();c.restore();

    c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);c.restore();
  }

  function drawHead(c,cx,cy,s,lookX,brow,t){
    const head=L.ellipsePts(cx,cy,64*s,84*s,46,-.05);
    inkFill(c,head,P.skin,sd('head'),5*s,.98);
    const jaw=[[cx+10*s,cy+48*s],[cx+58*s,cy+28*s],[cx+42*s,cy+76*s],[cx+4*s,cy+88*s]];
    fill(c,jaw,P.skinShadow,.42);halftone(c,jaw,P.inkSoft,11*s,1.1*s,.13,sd('jaw'));
    const hair=[
      [cx-61*s,cy-35*s],[cx-48*s,cy-73*s],[cx-12*s,cy-88*s],[cx+28*s,cy-80*s],
      [cx+58*s,cy-52*s],[cx+51*s,cy-21*s],[cx+27*s,cy-33*s],[cx+9*s,cy-46*s],
      [cx-4*s,cy-30*s],[cx-20*s,cy-48*s],[cx-33*s,cy-23*s]
    ];
    inkFill(c,hair,P.hair,sd('hair'),3.5*s,.98);
    const gaze=clamp((lookX-cx)/(250*s),-.5,.5);
    // eyebrows shift into concern late
    line(c,[[cx-39*s,cy-12*s-brow*4],[cx-14*s,cy-15*s+brow*2]],sd('bL'),2.6*s,P.hair,.92);
    line(c,[[cx+10*s,cy-16*s+brow*2],[cx+36*s,cy-12*s-brow*5]],sd('bR'),2.6*s,P.hair,.92);
    c.save();c.fillStyle=P.hair;c.globalAlpha=.92;
    c.beginPath();c.arc(cx-24*s+gaze*6,cy+2*s,4.5*s,0,TAU);c.fill();
    c.beginPath();c.arc(cx+22*s+gaze*6,cy+1*s,4.5*s,0,TAU);c.fill();c.restore();
    line(c,[[cx+2*s,cy+4*s],[cx-2*s,cy+25*s],[cx+10*s,cy+29*s]],sd('nose'),1.6*s,P.inkSoft,.6);
    line(c,[[cx-18*s,cy+52*s],[cx+18*s,cy+52*s+brow*4]],sd('mouth'),2*s,P.ink,.82);
  }

  function drawBust(c,t,lookX,brow){
    const torso=[[100,840],[205,735],[355,700],[455,765],[510,1040],[480,1320],[55,1320],[45,1030]];
    inkFill(c,torso,P.shirt,sd('torso'),6,.98);
    fill(c,[[360,720],[455,765],[510,1040],[480,1320],[355,1280],[330,870]],P.shirtDeep,.58);
    halftone(c,[[360,720],[455,765],[510,1040],[480,1320],[355,1280],[330,870]],P.inkSoft,14,1.5,.16,sd('shirt-dot'));
    const tee=[[180,750],[300,725],[350,900],[315,1110],[165,1110],[125,900]];
    inkFill(c,tee,P.tee,sd('tee'),2.2,.82);
    fill(c,rectPts(225,670,70,85),P.skin,.92);
    drawHead(c,260,610,1.12,lookX,brow,t);
  }

  function capsule(c,a,b,w,color,seed,alpha=.95){
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx);
    const pts=L.capsulePts((a[0]+b[0])/2,(a[1]+b[1])/2,len+w,w/2,ang,40);
    inkFill(c,pts,color,seed,4,alpha);
  }

  function drawHand(c,x,y,rot,s,seed){
    c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
    const palm=[[-42,-50],[30,-46],[56,-12],[44,49],[-32,57],[-56,16]];
    inkFill(c,palm,P.skin,seed,4,.98);fill(c,[[5,-43],[52,-10],[42,44],[6,35]],P.skinShadow,.26);
    [[[15,-45],[72,-40],[80,-22],[20,-20]],[[19,-18],[82,-10],[82,9],[20,7]],[[17,10],[74,18],[70,36],[10,31]]]
      .forEach((p,i)=>inkFill(c,p,P.skin,seed+10+i,2.1,.98));
    const thumb=[[-10,-10],[36,-6],[49,14],[13,25],[-22,12]];
    inkFill(c,thumb,P.skin,seed+20,2.5,.98);c.restore();
  }

  function recordEllipse(c,cx,cy,rx,ry,rot,t,dusty){
    c.save();c.translate(cx,cy);c.rotate(rot);
    const outer=L.ellipsePts(0,0,rx,ry,96);
    fill(c,outer,P.vinyl,.995);
    c.save();trace(c,outer,true);c.clip();
    // groove groups
    c.strokeStyle=P.groove;c.lineWidth=1;c.globalAlpha=.72;
    for(let i=0;i<36;i++){
      const u=i/38,rrx=rx*(.94-u*.55),rry=ry*(.94-u*.55);
      c.beginPath();c.ellipse(0,0,rrx,rry,0,0,TAU);c.stroke();
    }
    // moving reflection from lamp tilt
    const sweep=sstep(.35,1.3,t);
    const a0=lerp(-2.3,-.55,sweep);
    for(let i=0;i<10;i++){
      c.strokeStyle=i%3===0?P.white:P.groove;c.globalAlpha=i%3===0?.34:.18;c.lineWidth=i%3===0?2:1.1;
      const rr=.82-i*.032;
      c.beginPath();c.ellipse(0,0,rx*rr,ry*rr,0,a0+i*.06,a0+.78+i*.05);c.stroke();
    }
    if(dusty){
      const r=L.rng(sd('dust'));
      c.fillStyle=P.dust;c.globalAlpha=.88;
      for(let i=0;i<38;i++){
        const a=r()*TAU,rad=.42+r()*.5,x=Math.cos(a)*rx*rad,y=Math.sin(a)*ry*rad,d=1.6+r()*3.4;
        c.beginPath();c.arc(x,y,d,0,TAU);c.fill();
      }
      c.strokeStyle=P.dust;c.lineWidth=2;c.globalAlpha=.75;
      for(let i=0;i<6;i++){
        const a=r()*TAU,rad=.55+r()*.34,x=Math.cos(a)*rx*rad,y=Math.sin(a)*ry*rad;
        c.beginPath();c.moveTo(x-20,y-7);c.quadraticCurveTo(x,y+4,x+30,y+12);c.stroke();
      }
      c.fillStyle=P.grit;c.globalAlpha=.72;
      for(let i=0;i<9;i++){const a=r()*TAU,rad=.48+r()*.4;c.beginPath();c.arc(Math.cos(a)*rx*rad,Math.sin(a)*ry*rad,2+r()*2.2,0,TAU);c.fill();}
    }
    c.restore();
    c.fillStyle=P.label;c.globalAlpha=1;c.beginPath();c.ellipse(0,0,rx*.31,ry*.31,0,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.ellipse(0,0,7,Math.max(3,7*ry/rx),0,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*rx*.22,Math.sin(-.56)*ry*.22);c.stroke();
    L.inkPath(c,outer,{closed:true,color:P.vinylEdge,width:5.5,seed:sd('record-edge'),wobble:.5,tremble:.1,boilAmp:.18});
    c.restore();
  }

  function drawMacro(c,t,show){
    if(show<=0)return;
    const x=555,y=255,w=350,h=430;
    c.save();c.globalAlpha*=show;
    // white page inset with hard comic border
    c.fillStyle=P.gutter;c.fillRect(x,y,w,h);
    c.strokeStyle=P.comicBorder;c.lineWidth=4;c.strokeRect(x,y,w,h);
    c.beginPath();c.rect(x+4,y+4,w-8,h-8);c.clip();

    // exaggerated concentric groove arcs entering from lower-left
    c.fillStyle=P.vinyl;c.fillRect(x,y,w,h);
    const cx=x+75,cy=y+475;
    c.strokeStyle=P.groove;c.globalAlpha=.9;
    for(let i=0;i<24;i++){
      c.lineWidth=i%5===0?2:1;
      const r=170+i*16;
      c.beginPath();c.arc(cx,cy,r,-1.55,.1);c.stroke();
    }
    // reflection region
    c.strokeStyle=P.white;c.globalAlpha=.28;c.lineWidth=3;
    for(let i=0;i<5;i++){c.beginPath();c.arc(cx,cy,250+i*28,-1.15,-.72);c.stroke();}

    // dust cluster and one fibre are deliberately large enough to read at 1/4 scale
    c.fillStyle=P.dust;c.globalAlpha=.95;
    [[705,420,7],[760,455,5],[825,390,6],[670,520,4],[840,545,5],[780,575,3.8]].forEach(v=>{c.beginPath();c.arc(v[0],v[1],v[2],0,TAU);c.fill();});
    c.fillStyle=P.grit;c.globalAlpha=.9;
    [[736,500,4],[805,478,3.5],[860,455,4.5]].forEach(v=>{c.beginPath();c.arc(v[0],v[1],v[2],0,TAU);c.fill();});
    c.strokeStyle=P.dust;c.lineWidth=3;c.globalAlpha=.95;c.beginPath();c.moveTo(645,360);c.quadraticCurveTo(750,410,845,465);c.stroke();

    // subtle cyan bracket points at physical fibre, not an abstract target
    c.strokeStyle=P.badCyan;c.lineWidth=2.2;c.globalAlpha=.85;
    c.beginPath();c.moveTo(625,335);c.lineTo(625,390);c.moveTo(625,335);c.lineTo(680,335);c.stroke();
    c.restore();

    const pulse=sstep(1.9,2.15,t)*(1-sstep(2.55,2.85,t));
    if(pulse>0)L.guideCircle(c,705,420,34+34*pulse,{color:P.badMagenta,alpha:.45*(1-pulse*.2),width:2.2,quadrants:6});
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur),tw=L.onTwos(t);
      const tilt=sstep(.25,.95,t);
      const brow=sstep(1.7,2.55,t);
      const inset=sstep(1.35,1.62,t);
      const macroPush=sstep(1.9,2.55,t);

      L.paper(c,{seed:sd('paper')});
      drawRoom(c,t);
      drawBust(c,t,615,brow);

      // arms support the record in a safe two-edge grip
      capsule(c,[160,900],[300,1015],64,P.skin,sd('foreL'));
      capsule(c,[405,850],[490,1010],64,P.skin,sd('foreR'));

      const rot=lerp(.08,-.035,tilt);
      const rx=285,ry=lerp(250,235,tilt);
      recordEllipse(c,570,1030,rx,ry,rot,t,true);

      // grip at visually clear outer edge positions
      drawHand(c,335,1115,.42,.68,sd('handL'));
      drawHand(c,790,1080,2.68,.68,sd('handR'));

      // gaze lands on the reflected/dust region
      drawHead(c,260,610,1.12,615,brow,t);

      // small physical dust cue on the main record, linked to macro by a leader line
      const link=sstep(1.25,1.75,t);
      if(link>0){
        c.save();c.strokeStyle=P.badCyan;c.lineWidth=1.8;c.globalAlpha=.25+.45*link;c.setLineDash([7,8]);
        c.beginPath();c.moveTo(655,905);c.quadraticCurveTo(760,790,730,685);c.stroke();c.restore();
      }

      drawMacro(c,t,inset);

      // macro push is represented inside the panel; main composition remains stable
      if(macroPush>0){
        c.save();c.strokeStyle=L.rgba(P.inkFaint,.15*macroPush);c.lineWidth=1;
        c.strokeRect(548-10*macroPush,248-10*macroPush,364+20*macroPush,444+20*macroPush);c.restore();
      }

      // small broken problem mark only after physical dirt is visible
      const mark=sstep(2.45,2.62,t)*(1-sstep(2.78,3,t));
      if(mark>0){
        L.inkPath(c,[[495,780],[510,765],[520,785],[538,760]],{color:P.badMagenta,width:2.5,alpha:.5*mark,seed:sd('mark'),wobble:.1,tremble:.02,taper:[3,5]});
      }
    }
  });
})();