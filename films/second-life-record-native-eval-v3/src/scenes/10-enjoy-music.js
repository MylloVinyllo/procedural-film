// 10 · Different ending · T 27.000–30.000
// Opens as a deliberate clean mirror of scene 04, then releases into a warm room-wide payoff.
// Layers: 1 page, 2 playback source, 3 exact G4 reaction panel,
// 4 exact G3 stylus macro, 5 stable music graphics, 6 panel retraction,
// 7 full listening room, 8 relaxed protagonist + visible turning record.
(function(){
  'use strict';
  const ID='enjoy-music',L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;
  const G3={x:555,y:255,w:350,h:430,cx:730,cy:480,contact:[730,515]};
  const G4={x:85,y:285,w:365,h:455,face:[270,490]};

  function trace(c,pts,closed=true){c.beginPath();L.tracePath(c,pts,closed);}
  function fill(c,pts,color,a=1){c.save();c.globalAlpha*=a;c.fillStyle=color;trace(c,pts,true);c.fill();c.restore();}
  function inkFill(c,pts,color,seed,w=3,a=1){
    fill(c,pts,color,a);
    L.inkPath(c,pts,{closed:true,color:P.ink,width:w,alpha:.94*a,seed,wobble:.54,tremble:.11,boilAmp:.18,double:w>=5?{offset:2,width:1,alpha:.1,seed:seed+1}:undefined});
  }
  function line(c,pts,seed,w=2,color=P.inkSoft,a=.8){
    L.inkPath(c,L.smoothPts(pts,false,4),{color,width:w,alpha:a,seed,wobble:.4,tremble:.09,boilAmp:.14,taper:[4,8]});
  }
  function rrect(c,x,y,w,h,r,color,seed,width=3,a=1){const pts=L.rrectPts(x,y,w,h,r,18);inkFill(c,pts,color,seed,width,a);return pts;}
  function halftone(c,pts,color,spacing=13,r=1.5,a=.15,seed=1){
    c.save();trace(c,pts,true);c.clip();c.fillStyle=color;c.globalAlpha*=a;
    const ox=L.hash(seed,'x')%spacing,oy=L.hash(seed,'y')%spacing;c.beginPath();
    for(let y=-spacing+oy;y<1920+spacing;y+=spacing){
      const sh=(Math.floor(y/spacing)&1)?spacing*.5:0;
      for(let x=-spacing+ox+sh;x<1080+spacing;x+=spacing){c.moveTo(x+r,y);c.arc(x,y,r,0,TAU);}
    }c.fill();c.restore();
  }

  function drawOpeningPage(c,t){
    const fade=1-sstep(1.35,1.72,t);
    if(fade<=0)return;
    c.save();c.globalAlpha*=fade;c.fillStyle=P.gutter;c.fillRect(0,0,1080,1920);
    c.fillStyle=P.table;c.fillRect(55,770,970,980);
    c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(55,770,970,980);
    for(let i=0;i<12;i++)line(c,[[70,810+i*72],[1010,818+i*72+7*Math.sin(i)]],sd('grain',i),1,P.inkSoft,.1);
    c.restore();
  }

  function drawPlaybackSource(c,t){
    const fade=1-sstep(1.35,1.72,t);
    if(fade<=0)return;
    c.save();c.globalAlpha*=fade;
    const cx=420,cy=1265,r=335,rot=t*TAU*.55;
    c.translate(cx,cy);c.rotate(rot);
    c.fillStyle=P.vinyl;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();
    c.strokeStyle=P.groove;c.globalAlpha=.84;c.lineWidth=1.1;
    for(let i=0;i<40;i++){const rr=r-18-i*4.6;if(rr<108)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.strokeStyle=P.white;c.globalAlpha=.3;c.lineWidth=1.8;
    for(let i=0;i<9;i++){const rr=300-i*19;c.beginPath();c.arc(0,0,rr,-1.05+i*.04,-.34+i*.035);c.stroke();}
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,106,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=2;c.stroke();
    c.fillStyle=P.vinylEdge;c.beginPath();c.arc(0,0,8,0,TAU);c.fill();
    c.strokeStyle=P.labelDeep;c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(-.56)*77,Math.sin(-.56)*77);c.stroke();
    c.restore();
    L.inkCircle(c,cx,cy,r,{color:P.vinylEdge,width:5.5,seed:sd('record-edge')});

    // tonearm remains in contact
    const pivot=[785,900],contact=[620,1075];
    L.inkCircle(c,pivot[0],pivot[1],44,{color:P.ink,width:3,fill:P.machineDeep,seed:sd('pivot')});
    line(c,[pivot,[720,965],contact],sd('arm'),13,P.tonearm,.96);
    c.save();c.translate(contact[0],contact[1]);c.rotate(2.33);
    c.fillStyle=P.cartridge;c.fillRect(-36,-16,72,32);c.strokeStyle=P.ink;c.lineWidth=2.4;c.strokeRect(-36,-16,72,32);
    c.strokeStyle=P.stylus;c.lineWidth=3;c.beginPath();c.moveTo(-30,13);c.lineTo(-44,31);c.stroke();c.restore();

    // clean speaker response, physically in source panel
    const box=L.rrectPts(795,975,180,520,18,18);inkFill(c,box,P.speaker,sd('speaker'),4,.95);
    const pulse=.5+.5*Math.sin(t*TAU*2);
    L.inkCircle(c,885,1270,68+3*pulse,{color:P.ink,width:3.2,fill:P.speakerCone,seed:sd('woofer')});
    L.inkCircle(c,885,1085,32+1.5*pulse,{color:P.inkSoft,width:2.2,fill:P.speakerCone,seed:sd('tweeter')});
  }

  function drawReactionPanel(c,t){
    const fade=1-sstep(1.35,1.72,t);
    if(fade<=0)return;
    const relax=sstep(.35,1.05,t);
    const x=G4.x,y=G4.y,w=G4.w,h=G4.h;
    c.save();c.globalAlpha*=fade;c.fillStyle=P.roomWall;c.fillRect(x,y,w,h);c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(x,y,w,h);
    c.beginPath();c.rect(x+5,y+5,w-10,h-10);c.clip();

    fill(c,[[x,y+h-115],[x+w,y+h-175],[x+w,y+h],[x,y+h]],P.sunset,.16);
    const cx=G4.face[0],cy=G4.face[1]+6*relax;

    const shoulders=[[100,690],[145,610+12*relax],[270,585+18*relax],[400,630+14*relax],[450,740],[85,740]];
    inkFill(c,shoulders,P.shirt,sd('react-torso'),5,.98);
    fill(c,[[300,595],[400,630],[450,740],[305,740]],P.shirtDeep,.48);
    halftone(c,[[300,595],[400,630],[450,740],[305,740]],P.inkSoft,12,1.4,.12,sd('dots'));

    const head=L.ellipsePts(cx,cy,72,103,48,-.05-.04*relax);inkFill(c,head,P.skin,sd('react-head'),5,.99);
    fill(c,[[cx+12,cy+58],[cx+65,cy+34],[cx+46,cy+93],[cx+4,cy+103]],P.skinShadow,.38);
    const hair=[[cx-69,cy-42],[cx-52,cy-91],[cx-12,cy-108],[cx+32,cy-98],[cx+66,cy-62],[cx+58,cy-27],[cx+32,cy-38],[cx+10,cy-55],[cx-5,cy-35],[cx-24,cy-55],[cx-38,cy-29]];
    inkFill(c,hair,P.hair,sd('react-hair'),3.4,.99);

    // concern resolves into visibly softer brows/eyes
    line(c,[[cx-45,cy-14+5*relax],[cx-15,cy-17+7*relax]],sd('bL'),2.8,P.hair,.92);
    line(c,[[cx+11,cy-17+7*relax],[cx+42,cy-13+5*relax]],sd('bR'),2.8,P.hair,.92);
    c.fillStyle=P.hair;c.beginPath();c.ellipse(cx-28,cy+3,5,lerp(5,2.5,relax),0,0,TAU);c.fill();
    c.beginPath();c.ellipse(cx+26,cy+2,5,lerp(5,2.5,relax),0,0,TAU);c.fill();
    line(c,[[cx+2,cy+7],[cx-2,cy+31],[cx+12,cy+35]],sd('nose'),1.7,P.inkSoft,.62);
    line(c,[[-21+cx,65+cy],[cx,66+cy-3*relax],[21+cx,64+cy]],sd('mouth'),2.2,P.ink,.86);
    c.restore();

    if(relax>.35){
      L.arcAnnotation(c,cx,cy,128,-2.75,-1.55,{color:P.cleanGold,width:2.2,p:relax,arrow:0,alpha:.2});
    }
  }

  function drawMacro(c,t){
    const fade=1-sstep(1.35,1.72,t);
    if(fade<=0)return;
    const {x,y,w,h}=G3;
    c.save();c.globalAlpha*=fade;c.fillStyle=P.vinyl;c.fillRect(x,y,w,h);c.strokeStyle=P.comicBorder;c.lineWidth=4;c.strokeRect(x,y,w,h);
    c.beginPath();c.rect(x+4,y+4,w-8,h-8);c.clip();
    c.strokeStyle=P.groove;c.globalAlpha=.95;
    for(let i=0;i<22;i++){const yy=340+i*10.5;c.lineWidth=i%5===0?2:1;c.beginPath();c.moveTo(x-20,yy);c.bezierCurveTo(650,yy-16,810,yy+16,x+w+20,yy);c.stroke();}
    c.save();c.translate(G3.contact[0],G3.contact[1]-62);c.rotate(2.44);
    c.fillStyle=P.cartridge;c.globalAlpha=.98;c.fillRect(-52,-21,104,42);c.strokeStyle=P.ink;c.lineWidth=3;c.strokeRect(-52,-21,104,42);
    c.strokeStyle=P.stylus;c.lineWidth=4;c.beginPath();c.moveTo(-42,18);c.lineTo(-62,55);c.stroke();c.fillStyle=P.stylus;c.beginPath();c.arc(-63,56,5,0,TAU);c.fill();c.restore();
    c.restore();
  }

  function cleanGraphics(c,t){
    const open=1-sstep(1.42,1.78,t);
    if(open<=0)return;
    const q=sstep(.18,.5,t);
    for(let i=0;i<4;i++){
      const r=55+i*44+18*Math.sin((t+i*.12)*TAU*.5);
      L.guideCircle(c,885,1270,r,{color:i%2?P.cleanTeal:P.cleanGold,alpha:(.18-i*.025)*q*open,width:2,quadrants:12});
    }
    line(c,[[470,1080],[535,1035],[610,1068],[680,1018],[755,1040]],sd('melody'),3,P.cleanTeal,.34*q*open);
  }

  function drawFullRoom(c,t){
    const open=sstep(1.38,1.82,t);
    if(open<=0)return;
    const pull=sstep(1.65,2.48,t);
    c.save();c.globalAlpha*=open;
    c.fillStyle=P.roomWall;c.fillRect(0,0,1080,1920);
    fill(c,[[0,0],[420,0],[300,1920],[0,1920]],P.paperShade,.24);
    fill(c,[[1080,0],[760,0],[930,1920],[1080,1920]],P.sunset,.07);
    c.fillStyle=P.table;c.fillRect(0,1260,1080,660);

    // shelf
    rrect(c,80,420,255,620,12,P.wood,sd('shelf'),3,.92);
    for(let i=0;i<8;i++){
      const x=103+i*27;rrect(c,x,500,20,455,3,i%4===0?P.sleeve:(i%4===1?P.duskRose:(i%4===2?P.sage:P.stripeSky)),sd('spine',i),1.1,.76);
    }
    // lamp
    line(c,[[790,430],[790,790]],sd('lampstem'),9,P.metal,.62);
    inkFill(c,[[730,430],[850,430],[900,515],[680,515]],P.lamp,sd('lampshade'),3.4,.95);
    fill(c,[[715,520],[865,520],[930,1050],[650,1050]],P.sun,.07);

    // turntable visibly playing
    rrect(c,515,1065,470,350,28,P.turntableBody,sd('tt'),3.8,.98);
    c.fillStyle=P.platter;c.beginPath();c.arc(690,1230,135,0,TAU);c.fill();c.strokeStyle=P.ink;c.lineWidth=3.4;c.stroke();
    c.save();c.translate(690,1230);c.rotate(t*TAU*.55);c.fillStyle=P.vinyl;c.beginPath();c.arc(0,0,123,0,TAU);c.fill();
    c.strokeStyle=P.groove;c.lineWidth=.9;c.globalAlpha=.76;
    for(let i=0;i<18;i++){const rr=116-i*4.8;if(rr<42)break;c.beginPath();c.arc(0,0,rr,0,TAU);c.stroke();}
    c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.arc(0,0,38,0,TAU);c.fill();c.strokeStyle=P.labelDeep;c.lineWidth=1.6;c.stroke();
    c.restore();
    L.inkCircle(c,690,1230,123,{color:P.vinylEdge,width:3.6,seed:sd('record')});
    L.inkCircle(c,910,1115,24,{color:P.ink,width:2.2,fill:P.machineDeep,seed:sd('pivot')});
    line(c,[[910,1115],[850,1170],[790,1220]],sd('arm'),8,P.tonearm,.94);

    // speaker
    rrect(c,805,715,180,310,18,P.speaker,sd('spk'),3.6,.98);
    const pulse=.5+.5*Math.sin(t*TAU*2);
    L.inkCircle(c,895,910,62+2.5*pulse,{color:P.ink,width:3,fill:P.speakerCone,seed:sd('woofer')});
    L.inkCircle(c,895,790,26+1.2*pulse,{color:P.inkSoft,width:2,fill:P.speakerCone,seed:sd('tweet')});

    // unmistakable lounge chair behind the seated protagonist
    rrect(c,235,1080,330,360,42,P.paperDeep,sd('chair-back'),3,.82);
    rrect(c,205,1255,92,210,32,P.paperDeep,sd('chair-arm-l'),3,.82);
    rrect(c,503,1255,92,210,32,P.paperDeep,sd('chair-arm-r'),3,.82);
    line(c,[[255,1415],[545,1415]],sd('chair-seat'),4,P.inkSoft,.48);
    drawRelaxedPerson(c,400,1060,pull);

    c.restore();

    // music curves are screen-space and survive the pull-back
    const m=sstep(1.55,1.95,t);
    if(m>0){
      const alpha=.22*m;
      L.arcAnnotation(c,895,910,115,-2.8,-.7,{color:P.cleanGold,width:2.6,p:m,arrow:0,alpha});
      L.arcAnnotation(c,895,910,165,-2.9,-.55,{color:P.cleanTeal,width:2.2,p:m,arrow:0,alpha:.18*m});
      line(c,[[760,1040],[690,1010],[620,1030],[555,1005],[490,1025]],sd('room-music'),3.0,P.cleanGold,.28*m);
      line(c,[[790,980],[720,945],[650,965],[585,940],[520,960]],sd('room-music2'),2.4,P.cleanTeal,.22*m);
    }
  }

  function drawRelaxedPerson(c,x,y,pull){
    c.save();c.translate(x,y);c.rotate(-.04);const s=lerp(1.02,.92,pull);c.scale(s,s);
    const torso=[[-145,-25],[-95,-105],[22,-118],[130,-80],[155,100],[125,330],[-130,330],[-170,100]];
    inkFill(c,torso,P.shirt,sd('torso'),5.5,.99);
    fill(c,[[20,-112],[130,-80],[155,100],[125,330],[25,330]],P.shirtDeep,.4);
    halftone(c,[[25,-90],[130,-80],[155,100],[125,280],[50,250]],P.inkSoft,13,1.4,.12,sd('shirt-dot'));
    inkFill(c,[[-55,-104],[-14,-128],[38,-116],[61,-78],[28,-37],[-27,-37]],P.tee,sd('tee'),2.3,.96);

    // relaxed arms: elbows fall, hands rest on chair arms
    line(c,[[-120,35],[-165,155],[-145,255]],sd('armL'),42,P.shirt,.96);
    line(c,[[115,28],[150,155],[118,255]],sd('armR'),42,P.shirt,.96);
    L.inkCircle(c,-145,260,28,{color:P.ink,width:2.6,fill:P.skin,seed:sd('handL')});
    L.inkCircle(c,118,260,28,{color:P.ink,width:2.6,fill:P.skin,seed:sd('handR')});

    // seated legs make the posture unambiguous
    inkFill(c,[[-92,300],[-18,298],[-8,505],[-78,515],[-115,385]],P.pants,sd('legL'),4,.98);
    inkFill(c,[[18,300],[92,302],[118,390],[82,515],[12,505]],P.pants,sd('legR'),4,.98);
    inkFill(c,[[-88,500],[-8,500],[10,535],[-90,540]],P.shoe,sd('shoeL'),2.5,.98);
    inkFill(c,[[12,500],[84,502],[108,535],[8,540]],P.shoe,sd('shoeR'),2.5,.98);

    // head
    const head=L.ellipsePts(-10,-210,72,103,48,-.09);inkFill(c,head,P.skin,sd('head'),5,.99);
    fill(c,[[2,-152],[55,-176],[38,-118],[-3,-107]],P.skinShadow,.38);
    const hair=[[-78,-252],[-63,-301],[-22,-319],[25,-309],[61,-270],[52,-236],[29,-247],[7,-264],[-8,-245],[-29,-264],[-44,-238]];
    inkFill(c,hair,P.hair,sd('hair'),3.2,.99);
    line(c,[[-53,-222],[-22,-219]],sd('b1'),2.6,P.hair,.88);
    line(c,[[5,-220],[36,-222]],sd('b2'),2.6,P.hair,.88);
    c.fillStyle=P.hair;c.beginPath();c.ellipse(-35,-205,5,2.4,0,0,TAU);c.fill();c.beginPath();c.ellipse(19,-206,5,2.4,0,0,TAU);c.fill();
    line(c,[[-6,-201],[-10,-178],[3,-175]],sd('nose'),1.6,P.inkSoft,.6);
    line(c,[[-28,-145],[-6,-141],[19,-146]],sd('smile'),2.3,P.ink,.86);
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      L.paper(c,{seed:sd('paper')});
      drawOpeningPage(c,t);
      drawPlaybackSource(c,t);
      drawReactionPanel(c,t);
      drawMacro(c,t);
      cleanGraphics(c,t);
      drawFullRoom(c,t);

      // final frame stays calm: no terminal flash or title card.
    }
  });
})();