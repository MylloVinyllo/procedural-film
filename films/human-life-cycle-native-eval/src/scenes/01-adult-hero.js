// 01 · One life · T 0.000–1.500
// Layers, back to front:
// 1 paper + drifting stripe plate
// 2 distant facade / windows
// 3 background social figures + bench
// 4 path / curb / plants
// 5 protagonist
// 6 trajectory + G1 continuity geometry
(function () {
  'use strict';

  const ID = 'adult-hero';
  const TAU = Math.PI * 2;
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, p) => a + (b - a) * p;
  const sd = (...k) => FILM.lib.hash(ID, ...k) & 0x7fffffff;

  function fillInk(ctx, L, pts, fill, seed, width = 4.5, alpha = 1) {
    L.inkPath(ctx, pts, {
      closed: true,
      fill,
      fillAlpha: alpha,
      color: L.pal.ink,
      alpha,
      width,
      seed,
      wobble: 1.15,
      tremble: 0.35,
      boilAmp: 0.55,
      double: width >= 4.5 ? { offset: 2.7, width: 1.35, alpha: 0.23, seed: seed + 17 } : false,
    });
  }

  function strokeInk(ctx, L, pts, color, seed, width = 2.2, alpha = 1, taper = [8, 16]) {
    L.inkPath(ctx, pts, {
      closed: false,
      color,
      alpha,
      width,
      seed,
      taper,
      wobble: 0.9,
      tremble: 0.3,
      boilAmp: 0.45,
    });
  }

  function ellipsePoly(cx, cy, rx, ry, rot = 0, n = 28) {
    const cr = Math.cos(rot), sr = Math.sin(rot), out = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      const x = Math.cos(a) * rx, y = Math.sin(a) * ry;
      out.push([cx + x * cr - y * sr, cy + x * sr + y * cr]);
    }
    return out;
  }

  function limbPoly(ax, ay, bx, by, wa, wb) {
    const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1;
    const nx = -dy / d, ny = dx / d;
    return [
      [ax + nx * wa, ay + ny * wa],
      [bx + nx * wb, by + ny * wb],
      [bx - nx * wb, by - ny * wb],
      [ax - nx * wa, ay - ny * wa],
    ];
  }

  function handPoly(x, y, rot, s) {
    const base = [
      [-18, -8], [1, -13], [19, -6], [22, 2], [12, 10],
      [7, 16], [-2, 15], [-13, 9], [-21, 2],
    ];
    const c = Math.cos(rot), q = Math.sin(rot);
    return base.map(([px, py]) => [x + (px * c - py * q) * s, y + (px * q + py * c) * s]);
  }

  function shoePoly(x, y, dir, s) {
    return [
      [x - 26 * s * dir, y - 12 * s],
      [x + 12 * s * dir, y - 15 * s],
      [x + 48 * s * dir, y - 1 * s],
      [x + 45 * s * dir, y + 15 * s],
      [x - 26 * s * dir, y + 15 * s],
    ];
  }

  function drawFace(ctx, L, x, y, s, rot, alpha, seed) {
    const P = L.pal;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(x, y);
    ctx.rotate(rot);

    const head = ellipsePoly(0, 0, 47 * s, 58 * s, -0.04, 34);
    fillInk(ctx, L, head, P.selfPale, seed, 4.6);

    // asymmetrical hair mass
    const hair = [
      [-44*s,-27*s],[-32*s,-53*s],[-7*s,-61*s],[17*s,-57*s],
      [38*s,-41*s],[40*s,-17*s],[22*s,-31*s],[3*s,-36*s],
      [-14*s,-32*s],[-30*s,-17*s]
    ];
    fillInk(ctx, L, hair, P.ink, seed + 1, 2.5);

    // ear + brow/eye + nose + mouth
    strokeInk(ctx, L, [[-45*s,-4*s],[-50*s,1*s],[-46*s,9*s]], P.inkSoft, seed + 2, 1.7);
    strokeInk(ctx, L, [[-20*s,-7*s],[-4*s,-10*s]], P.ink, seed + 3, 1.8);
    strokeInk(ctx, L, [[12*s,-8*s],[23*s,-6*s]], P.ink, seed + 4, 1.5);
    strokeInk(ctx, L, [[4*s,-2*s],[10*s,10*s],[6*s,17*s]], P.inkSoft, seed + 5, 1.6);
    strokeInk(ctx, L, [[-7*s,28*s],[11*s,29*s],[18*s,25*s]], P.inkSoft, seed + 6, 1.5);

    // jaw shadow and temple hatch
    L.hatch(ctx, head, {
      bounds: [-55*s,-65*s,110*s,130*s],
      spacing: 11*s,
      angle: -0.78,
      length: [10*s,28*s],
      color: P.selfDeep,
      alpha: 0.32,
      width: 1.0*s,
      density: (hx, hy) => clamp((hx + hy * 0.25 + 30*s) / (70*s)),
      seed: seed + 7,
      boilAmp: 0.25,
    });
    ctx.restore();
  }

  function drawAdult(ctx, L, pose, opts = {}) {
    const P = L.pal;
    const x = opts.x || 540, y = opts.y || 1360, s = opts.s || 1;
    const alpha = opts.alpha == null ? 1 : opts.alpha;
    const color = opts.color || P.selfWarm;
    const deep = opts.deep || P.selfDeep;
    const skin = opts.skin || P.selfPale;
    const seed = opts.seed || sd('adult');
    const flip = opts.flip || 1;
    const far = !!opts.far;

    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(x, y);
    ctx.scale(flip, 1);

    const sway = pose.sway || 0;
    const turn = pose.turn || 0;
    const shoulderTilt = pose.shoulderTilt || -0.035;
    const hipShift = pose.hipShift || 0;
    const headTurn = pose.headTurn || 0;
    const liftL = pose.liftL || 0;
    const liftR = pose.liftR || 0;

    // body anchors, feet-relative
    const pelvisY = -318*s;
    const ribY = -520*s;
    const shoulderY = -610*s;
    const neckY = -653*s;
    const headY = -710*s;

    // rear leg first
    const rearHip = [-44*s + hipShift*s, pelvisY];
    const rearKnee = [-38*s + sway*10*s, -175*s];
    const rearAnkle = [-72*s + liftL*22*s, -28*s - liftL*18*s];
    fillInk(ctx,L,limbPoly(...rearHip,...rearKnee,42*s,31*s),deep,seed+20,4);
    fillInk(ctx,L,limbPoly(...rearKnee,...rearAnkle,31*s,23*s),deep,seed+21,4);
    fillInk(ctx,L,shoePoly(rearAnkle[0]-5*s,rearAnkle[1]+8*s,-1,s),P.inkSoft,seed+22,3.5);

    // rear arm
    const farShoulder = [-92*s, shoulderY + shoulderTilt*90*s];
    const farElbow = [-125*s + turn*25*s, -455*s + sway*8*s];
    const farWrist = [-78*s + turn*35*s, -355*s + liftL*12*s];
    fillInk(ctx,L,limbPoly(...farShoulder,...farElbow,28*s,22*s),color,seed+23,4);
    fillInk(ctx,L,limbPoly(...farElbow,...farWrist,22*s,16*s),skin,seed+24,3.5);
    fillInk(ctx,L,handPoly(farWrist[0],farWrist[1],-0.2+turn*.15,s*.78),skin,seed+25,3);

    // pelvis/lower garment mass
    const pelvis = [
      [-88*s+hipShift*s,-382*s],[-64*s+hipShift*s,-320*s],[-78*s+hipShift*s,-278*s],
      [72*s+hipShift*s,-278*s],[84*s+hipShift*s,-324*s],[62*s+hipShift*s,-384*s]
    ];
    fillInk(ctx,L,pelvis,deep,seed+30,4.6);

    // ribcage garment
    const torso = [
      [-112*s,-612*s],[-78*s,-638*s],[-24*s,-650*s],[58*s,-640*s],
      [106*s,-604*s],[86*s,-500*s],[64*s,-410*s],[-58*s,-408*s],
      [-92*s,-490*s]
    ];
    fillInk(ctx,L,torso,color,seed+31,5);

    // garment shadow hatching
    L.hatch(ctx, torso, {
      spacing: 10*s, angle: -0.79, length:[18*s,54*s], gap:[3*s,8*s],
      density:(hx,hy)=>clamp((hx+35*s)/(150*s))*0.78,
      color:deep, alpha:0.55, width:1.3*s, seed:seed+32, boilAmp:.35
    });

    // collar, shoulder seam, hem and folds
    strokeInk(ctx,L,[[-34*s,-641*s],[-5*s,-620*s],[30*s,-642*s]],P.inkSoft,seed+33,1.8*s);
    strokeInk(ctx,L,[[-104*s,-590*s],[-36*s,-576*s],[32*s,-570*s],[91*s,-590*s]],P.inkSoft,seed+34,1.5*s,.75);
    strokeInk(ctx,L,[[-58*s,-416*s],[3*s,-430*s],[62*s,-416*s]],P.inkSoft,seed+35,1.7*s,.8);
    strokeInk(ctx,L,[[-23*s,-571*s],[-10*s,-505*s]],P.inkSoft,seed+36,1.4*s,.5);
    strokeInk(ctx,L,[[35*s,-558*s],[50*s,-480*s]],P.inkSoft,seed+37,1.4*s,.45);

    // near leg
    const nearHip = [43*s+hipShift*s, pelvisY];
    const nearKnee = [68*s - sway*9*s, -168*s];
    const nearAnkle = [60*s - liftR*20*s, -25*s - liftR*16*s];
    fillInk(ctx,L,limbPoly(...nearHip,...nearKnee,44*s,32*s),P.inkSoft,seed+40,4.3);
    fillInk(ctx,L,limbPoly(...nearKnee,...nearAnkle,32*s,23*s),P.inkSoft,seed+41,4);
    fillInk(ctx,L,shoePoly(nearAnkle[0]+7*s,nearAnkle[1]+8*s,1,s),P.ink,seed+42,3.5);

    // near arm
    const nearShoulder=[98*s,shoulderY-shoulderTilt*70*s];
    const nearElbow=[128*s-turn*10*s,-470*s-sway*5*s];
    const nearWrist=[104*s-turn*25*s,-365*s+liftR*10*s];
    fillInk(ctx,L,limbPoly(...nearShoulder,...nearElbow,30*s,23*s),color,seed+43,4.5);
    fillInk(ctx,L,limbPoly(...nearElbow,...nearWrist,23*s,17*s),skin,seed+44,3.8);
    fillInk(ctx,L,handPoly(nearWrist[0],nearWrist[1],0.3-headTurn*.1,s*.82),skin,seed+45,3.2);

    // neck
    const neck=[[-29*s,neckY+7*s],[30*s,neckY+5*s],[33*s,-615*s],[-32*s,-615*s]];
    fillInk(ctx,L,neck,skin,seed+46,3.7);

    // head local
    drawFace(ctx,L,6*s,-713*s,s,headTurn*.08,1,seed+50);

    // small garment identity notch at left shoulder
    strokeInk(ctx,L,[[-98*s,-607*s],[-84*s,-595*s],[-94*s,-579*s]],P.cycleGold,seed+58,2.2*s,.9);

    // subtle cloth stipple in shadow
    if (!far) {
      L.stipple(ctx, torso, {
        spacing:15*s,r:[.7*s,1.4*s],density:(hx,hy)=>hx>15*s?.22:.05,
        color:P.inkSoft,alpha:.22,seed:seed+60,boilAmp:.2
      });
    }

    ctx.restore();
  }

  function drawBackgroundPerson(ctx,L,x,y,s,col,seed,phase,flip=1) {
    const tw=L.onTwos(phase);
    const k=Math.sin(tw*TAU*1.7)*.5;
    drawAdult(ctx,L,{
      sway:k*.35,
      turn:k*.08,
      shoulderTilt:.02*k,
      hipShift:k*3,
      headTurn:-k*.25,
      liftL:Math.max(0,k)*.2,
      liftR:Math.max(0,-k)*.2,
    },{
      x,y,s,color:col,deep:L.mix(col,L.pal.ink,.45),skin:L.mix(L.pal.selfPale,L.pal.paper,.25),
      seed,flip,far:true
    });
  }

  function drawFacade(ctx,L,P) {
    ctx.save();
    ctx.globalAlpha=.28;
    // distant wall planes
    ctx.fillStyle=P.paperShade;
    ctx.fillRect(85,300,910,650);
    const facade=[
      [100,930],[100,360],[325,315],[530,350],[760,320],[980,365],[980,930]
    ];
    L.inkPath(ctx,facade,{closed:false,color:P.inkFaint,alpha:.55,width:2,seed:sd('facade'),wobble:1.4,boilAmp:.25,taper:[0,0]});

    // windows / doors
    const boxes=[[150,470,135,170],[340,430,155,200],[595,455,150,165],[790,420,145,210]];
    boxes.forEach((b,i)=>{
      ctx.fillStyle=i===1?L.rgba(P.stripeSky,.45):L.rgba(P.paperDeep,.28);
      ctx.fillRect(b[0],b[1],b[2],b[3]);
      strokeInk(ctx,L,[[b[0],b[1]],[b[0]+b[2],b[1]],[b[0]+b[2],b[1]+b[3]],[b[0],b[1]+b[3]],[b[0],b[1]]],P.inkFaint,sd('window',i),1.4,.55,[0,0]);
      strokeInk(ctx,L,[[b[0]+b[2]*.5,b[1]],[b[0]+b[2]*.5,b[1]+b[3]]],P.inkFaint,sd('mullion',i),1,.35,[0,0]);
    });

    // horizontal masonry / perspective bands
    for(let y=390,i=0;y<930;y+=74,i++){
      strokeInk(ctx,L,[[105,y],[970,y+(i%2?5:-4)]],P.inkFaint,sd('masonry',i),1,.18,[0,0]);
    }
    ctx.restore();
  }

  function drawBench(ctx,L,P) {
    ctx.save();
    ctx.globalAlpha=.5;
    const seat=[[695,1040],[955,1045],[951,1082],[692,1074]];
    fillInk(ctx,L,seat,P.wood,sd('bench-seat'),2.5,.75);
    const back=[[710,955],[948,960],[944,1008],[706,1002]];
    fillInk(ctx,L,back,P.wood,sd('bench-back'),2.5,.7);
    strokeInk(ctx,L,[[730,1080],[718,1220]],P.inkSoft,sd('leg-a'),5,.65,[0,0]);
    strokeInk(ctx,L,[[920,1082],[932,1222]],P.inkSoft,sd('leg-b'),5,.65,[0,0]);
    L.hatch(ctx,seat,{spacing:10,angle:0.1,length:[20,60],color:P.inkSoft,alpha:.28,width:1,seed:sd('bench-hatch')});
    ctx.restore();
  }

  function drawGround(ctx,L,P) {
    // broad ground / path bands
    const ground=[[0,1170],[1080,1110],[1080,1920],[0,1920]];
    ctx.fillStyle=L.rgba(P.stripeSage,.26);
    ctx.beginPath(); L.tracePath(ctx,ground,true); ctx.fill();

    strokeInk(ctx,L,[[0,1215],[1080,1150]],P.inkFaint,sd('path1'),2,.45,[0,0]);
    strokeInk(ctx,L,[[0,1390],[1080,1320]],P.inkFaint,sd('path2'),1.8,.3,[0,0]);
    strokeInk(ctx,L,[[0,1510],[1080,1450]],P.inkFaint,sd('path3'),1.4,.22,[0,0]);

    // curb edge
    const curb=[[0,1350],[1080,1284],[1080,1340],[0,1412]];
    fillInk(ctx,L,curb,P.paperDeep,sd('curb'),2.5,.58);
    L.hatch(ctx,curb,{spacing:13,angle:-.16,length:[22,80],color:P.inkSoft,alpha:.25,width:1.1,seed:sd('curb-hatch')});
  }

  function drawPlants(ctx,L,P) {
    const stems=[
      {x:110,y:1540,h:270,lean:24,seed:1},
      {x:174,y:1570,h:205,lean:-17,seed:2},
      {x:924,y:1515,h:250,lean:-26,seed:3},
      {x:974,y:1590,h:185,lean:15,seed:4},
    ];
    stems.forEach((st)=>{
      const top=[st.x+st.lean,st.y-st.h];
      strokeInk(ctx,L,[[st.x,st.y],[lerp(st.x,top[0],.55),lerp(st.y,top[1],.55)],[top[0],top[1]]],P.ageSage,sd('stem',st.seed),3,.8,[2,6]);
      for(let k=1;k<=4;k++){
        const u=k/5, bx=lerp(st.x,top[0],u), by=lerp(st.y,top[1],u);
        const side=(k%2?1:-1);
        const leaf=ellipsePoly(bx+side*24,by-5,28,10,side*.25,18);
        fillInk(ctx,L,leaf,P.sage,sd('leaf',st.seed,k),1.5,.55);
      }
      const seedhead=[];
      for(let k=0;k<16;k++){
        const a=k/16*TAU, rr=18+(k%3)*3;
        seedhead.push([top[0]+Math.cos(a)*rr,top[1]+Math.sin(a)*rr]);
      }
      fillInk(ctx,L,seedhead,P.ochre,sd('head',st.seed),1.5,.4);
    });
  }

  function drawTrajectory(ctx,L,P,t) {
    const pts=[
      [210,1390],[270,1340],[355,1335],[420,1370],[485,1385],
      [535,1365],[565,1320]
    ];
    const p=clamp(.55+t*.25);
    const n=Math.max(2,Math.round(pts.length*p));
    strokeInk(ctx,L,pts.slice(0,n),P.selfWarm,sd('trajectory'),4,.72,[8,16]);
    ctx.save();
    ctx.fillStyle=P.selfWarm;
    ctx.globalAlpha=.75;
    for(let i=0;i<n;i+=2){ctx.beginPath();ctx.arc(pts[i][0],pts[i][1],3.2,0,TAU);ctx.fill();}
    ctx.restore();
  }

  FILM.scene({
    id: ID,
    draw(ctx, tIn, info) {
      const L=info.lib, P=L.pal;
      const t=clamp(tIn,0,info.dur);
      const tw=L.onTwos(t);
      const push=L.seg(t,1.375,1.5,'outExpo');
      const zoom=lerp(1,1.35,push);

      L.paper(ctx,{seed:sd('paper')});
      L.stripes(ctx,{
        colors:[P.stripeCream,P.stripeYellow],
        width:140,angle:-.52,offset:info.T*12,seed:sd('stripes')
      });

      ctx.save();
      ctx.translate(540,700);
      ctx.scale(zoom,zoom);
      ctx.translate(-540,-700);

      drawFacade(ctx,L,P);
      drawBench(ctx,L,P);

      // background social field
      ctx.save();
      ctx.globalAlpha*=1-push*.55;
      drawBackgroundPerson(ctx,L,250,1270,.48,P.socialBlue,sd('bgp',1),tw+.15,-1);
      drawBackgroundPerson(ctx,L,790,1250,.52,P.ageSage,sd('bgp',2),tw+.30,1);
      drawBackgroundPerson(ctx,L,885,1210,.37,P.birthRose,sd('bgp',3),tw+.47,-1);
      ctx.restore();

      drawGround(ctx,L,P);
      drawPlants(ctx,L,P);
      drawTrajectory(ctx,L,P,t);

      // protagonist pose, living on twos
      const beat=L.seg(t,.42,.62,'snap');
      const headTurn=L.seg(t,1.18,1.34,'snap');
      const stepSync=t>=.92?Math.sin((tw-1.0)*TAU*2.0):0;
      drawAdult(ctx,L,{
        sway:lerp(-.15,.18,beat)+stepSync*.08,
        turn:beat*.05,
        shoulderTilt:-.05+.03*beat,
        hipShift:4*beat,
        headTurn:.8*headTurn,
        liftL:.08*(1-beat),
        liftR:.06*beat
      },{
        x:540,y:1360,s:1,color:P.selfWarm,deep:P.selfDeep,skin:P.selfPale,seed:sd('hero')
      });

      ctx.restore();

      // exact screen-fixed G1 continuity, drawn after camera push
      L.guideCircle(ctx,540,700,184,{color:P.cycleGold,alpha:.22,width:1.5,dash:[5,8]});
      L.guideCircle(ctx,540,700,150,{color:P.cycleGold,alpha:.78,width:2.6,ink:true,seed:sd('g1')});

      // beat ring at 0.5
      const rp=t<.5?0:t<.75?L.ease.outExpo((t-.5)/.25):1;
      const ra=t<.5?0:t<.88?1-L.seg(t,.65,.88,'outQuad'):0;
      if(ra>0){
        L.guideCircle(ctx,540,700,150+72*rp,{color:P.annYellow,alpha:.75*ra,width:3,quadrants:10});
      }

      // tiny construction ticks bind halo to body axis
      ctx.save();
      ctx.strokeStyle=L.rgba(P.annYellow,.6);
      ctx.lineWidth=1.5;
      ctx.beginPath();
      [[540,516,540,540],[540,860,540,884],[356,700,380,700],[700,700,724,700]].forEach(a=>{
        ctx.moveTo(a[0],a[1]);ctx.lineTo(a[2],a[3]);
      });
      ctx.stroke();
      ctx.restore();
    }
  });
})();
