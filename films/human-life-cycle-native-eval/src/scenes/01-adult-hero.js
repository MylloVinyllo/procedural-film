// 01 One life · T 0.0–1.5
// Layers back to front: paper/stripes → architecture → far people → bench/path → hero → plants → continuity overlays.
(function () {
  'use strict';

  const ID = 'adult-hero';
  const TAU = Math.PI * 2;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  function poly(ctx, pts, fill, stroke, w = 2, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
    ctx.restore();
  }

  function line(ctx, pts, color, w = 2, alpha = 1, dash = null) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
    ctx.restore();
  }

  function ellipse(ctx, x, y, rx, ry, fill, stroke, w = 2, alpha = 1, rot = 0) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, 0, TAU);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.stroke(); }
    ctx.restore();
  }

  function hatchRect(ctx, x0, y0, x1, y1, color, alpha, step, slant) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let y = y0; y < y1; y += step) {
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y + slant);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawFacade(ctx, P) {
    ctx.save();
    ctx.globalAlpha = 0.34;
    ctx.fillStyle = P.paperShade;
    ctx.fillRect(55, 285, 970, 585);
    ctx.strokeStyle = P.inkFaint;
    ctx.lineWidth = 2;
    for (let x = 100; x <= 980; x += 175) {
      ctx.strokeRect(x, 350, 115, 230);
      ctx.strokeRect(x + 12, 365, 91, 96);
      line(ctx, [[x + 58, 350], [x + 58, 580]], P.inkFaint, 1.2, 0.45);
      line(ctx, [[x, 476], [x + 115, 476]], P.inkFaint, 1.2, 0.45);
    }
    line(ctx, [[70, 690], [1010, 690]], P.inkFaint, 2, 0.5);
    hatchRect(ctx, 65, 705, 1015, 825, P.inkFaint, 0.14, 16, -18);
    ctx.restore();
  }

  function drawBench(ctx, P) {
    ctx.save();
    ctx.globalAlpha = 0.72;
    poly(ctx, [[155,1125],[420,1125],[405,1160],[170,1160]], P.wood || P.tan, P.ink, 2.6);
    poly(ctx, [[182,1030],[405,1030],[398,1086],[190,1086]], P.paperDeep, P.ink, 2.6);
    line(ctx, [[205,1160],[190,1265]], P.ink, 7);
    line(ctx, [[380,1160],[398,1265]], P.ink, 7);
    for (let x = 205; x < 390; x += 28) line(ctx, [[x,1043],[x+8,1073]], P.inkSoft, 1.1, 0.6);
    ctx.restore();
  }

  function drawPlant(ctx, P, x, y, s, flip) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flip ? -s : s, s);
    line(ctx, [[0,0],[8,-265]], P.inkSoft, 3, 0.75);
    const leaves = [
      [-7,-80,-42,-18,0.25],
      [5,-125,48,-20,-0.18],
      [-2,-172,-40,-17,0.22],
      [7,-220,42,-15,-0.2],
    ];
    for (const [lx,ly,rx,ry,rot] of leaves) {
      ellipse(ctx,lx,ly,Math.abs(rx),Math.abs(ry),P.ageSage,P.inkSoft,1.5,0.72,rot);
      line(ctx,[[lx,ly],[lx+rx*0.75,ly+ry*0.15]],P.inkSoft,1,0.45);
    }
    ctx.restore();
  }

  function drawSmallPerson(ctx, P, x, y, s, col, phase) {
    const q = Math.sin(phase * 5.1) * 0.5;
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(s,s);
    ctx.rotate(q * 0.025);
    ellipse(ctx,0,-255,43,51,P.paperShade,P.ink,2.4,1,-0.04);
    poly(ctx,[[-36,-215],[34,-220],[62,-88],[-58,-82]],col,P.ink,2.2);
    poly(ctx,[[-48,-86],[-5,-92],[-18,62],[-70,165],[-105,157],[-52,36]],P.socialDeep,P.ink,2);
    poly(ctx,[[8,-91],[52,-84],[68,41],[108,154],[74,166],[20,61]],P.socialDeep,P.ink,2);
    line(ctx,[[-30,-188],[-82,-100],[-104,-20]],P.ink,8);
    line(ctx,[[28,-188],[74,-118],[92,-56]],P.ink,8);
    poly(ctx,[[-116,153],[-69,153],[-62,174],[-123,177]],P.ink,P.ink,1);
    poly(ctx,[[68,157],[111,150],[128,168],[72,178]],P.ink,P.ink,1);
    // hair + jaw cue
    ctx.save();
    ctx.fillStyle=P.ink;
    ctx.beginPath();
    ctx.arc(-4,-278,41,Math.PI,TAU);
    ctx.quadraticCurveTo(27,-297,34,-260);
    ctx.lineTo(25,-282);
    ctx.quadraticCurveTo(-16,-311,-39,-270);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.restore();
  }

  function limbQuad(a, b, wa, wb) {
    const dx=b[0]-a[0], dy=b[1]-a[1], d=Math.max(1,Math.hypot(dx,dy));
    const nx=-dy/d, ny=dx/d;
    return [
      [a[0]+nx*wa,a[1]+ny*wa],
      [a[0]-nx*wa,a[1]-ny*wa],
      [b[0]-nx*wb,b[1]-ny*wb],
      [b[0]+nx*wb,b[1]+ny*wb],
    ];
  }

  function drawHand(ctx, P, x, y, s, rot, fill) {
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(rot);
    poly(ctx,[[-12*s,-18*s],[17*s,-13*s],[24*s,5*s],[8*s,24*s],[-17*s,17*s],[-23*s,-1*s]],fill,P.ink,2.2);
    poly(ctx,[[14*s,-6*s],[31*s,2*s],[27*s,10*s],[11*s,7*s]],fill,P.ink,1.8);
    line(ctx,[[-8*s,5*s],[11*s,7*s]],P.inkSoft,1.1,0.5);
    line(ctx,[[-5*s,12*s],[9*s,14*s]],P.inkSoft,1.1,0.5);
    ctx.restore();
  }

  function drawHero(ctx, P, L, t) {
    const tw=L.onTwos(t);
    const sway=Math.sin(tw*4.8)*6;
    const step=clamp((t-0.36)/0.52);
    const headTurn=clamp((t-1.13)/0.25);
    const x=540+sway;
    const y=1190;
    const skin=P.selfPale;

    // far leg
    poly(ctx,limbQuad([x-34,y-38],[x-62-14*step,y+165],34,25),P.inkSoft,P.ink,2.4);
    poly(ctx,limbQuad([x-62-14*step,y+165],[x-98-8*step,y+335],27,19),P.inkSoft,P.ink,2.4);
    poly(ctx,[[x-126,y+328],[x-72,y+328],[x-60,y+350],[x-138,y+355]],P.ink,P.ink,1.5);

    // near leg
    poly(ctx,limbQuad([x+32,y-36],[x+58+18*step,y+168],36,27),P.socialDeep,P.ink,2.6);
    poly(ctx,limbQuad([x+58+18*step,y+168],[x+93+32*step,y+337],29,20),P.socialDeep,P.ink,2.6);
    poly(ctx,[[x+66+28*step,y+333],[x+121+32*step,y+331],[x+145+30*step,y+352],[x+70+24*step,y+359]],P.ink,P.ink,1.5);

    // pelvis
    poly(ctx,[[x-80,y-102],[x+79,y-105],[x+62,y+8],[x-62,y+8]],P.socialDeep,P.ink,3.2);

    // torso / garment
    poly(ctx,[[x-105,y-365],[x-52,y-407],[x+47,y-410],[x+108,y-360],[x+83,y-110],[x-87,y-108]],P.selfWarm,P.ink,4.2);
    // collar
    poly(ctx,[[x-43,y-401],[x,y-370],[x+42,y-405],[x+25,y-425],[x-25,y-425]],P.paperShade,P.ink,2);
    line(ctx,[[x-60,y-335],[x-35,y-210],[x-57,y-128]],P.selfDeep,2,0.65);
    line(ctx,[[x+53,y-330],[x+28,y-248],[x+45,y-130]],P.selfDeep,2,0.65);
    for(let k=0;k<9;k++){
      const yy=y-330+k*22;
      line(ctx,[[x+28,yy],[x+72,yy+13]],P.selfDeep,1.05,0.32);
    }

    // far arm
    const e1=[x-145,y-245], h1=[x-190+6*Math.sin(tw*3),y-108];
    poly(ctx,limbQuad([x-83,y-342],e1,27,22),P.selfWarm,P.ink,2.5);
    poly(ctx,limbQuad(e1,h1,22,15),skin,P.ink,2.5);
    drawHand(ctx,P,h1[0]-5,h1[1]+12,0.86,-0.25,skin);

    // near arm
    const e2=[x+155,y-244], h2=[x+178-8*Math.sin(tw*3.2),y-82];
    poly(ctx,limbQuad([x+84,y-340],e2,29,22),P.selfWarm,P.ink,2.5);
    poly(ctx,limbQuad(e2,h2,22,15),skin,P.ink,2.5);
    drawHand(ctx,P,h2[0]+3,h2[1]+12,0.9,0.18,skin);

    // neck
    poly(ctx,[[x-29,y-455],[x+29,y-456],[x+36,y-400],[x-37,y-400]],skin,P.ink,2.5);

    // head cranium + jaw
    const hx=x+headTurn*9;
    ellipse(ctx,hx,y-530,54,64,skin,P.ink,3.4,1,-0.04+headTurn*0.08);
    poly(ctx,[[hx-45,y-523],[hx-31,y-466],[hx-3,y-445],[hx+34,y-470],[hx+48,y-530]],skin,P.ink,2.6);

    // hair asymmetric
    ctx.save();
    ctx.fillStyle=P.ink;
    ctx.beginPath();
    ctx.moveTo(hx-51,y-536);
    ctx.bezierCurveTo(hx-44,y-600,hx+16,y-610,hx+46,y-561);
    ctx.quadraticCurveTo(hx+15,y-582,hx+1,y-559);
    ctx.quadraticCurveTo(hx-22,y-583,hx-51,y-536);
    ctx.fill();
    ctx.restore();

    // face
    line(ctx,[[hx-18,y-526],[hx-2,y-529]],P.ink,2.1,0.8);
    line(ctx,[[hx+12,y-525],[hx+25,y-521]],P.ink,1.7,0.65);
    line(ctx,[[hx+1,y-516],[hx+8,y-493],[hx+2,y-489]],P.inkSoft,1.8,0.75);
    line(ctx,[[hx-8,y-475],[hx+12,y-474]],P.inkSoft,1.6,0.75);
    ellipse(ctx,hx+48,y-519,7,14,skin,P.ink,1.5,0.9,0.05);

    // garment shadow and hatch under far side
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x-105,y-365);ctx.lineTo(x-48,y-407);ctx.lineTo(x-34,y-112);ctx.lineTo(x-87,y-108);ctx.closePath();
    ctx.clip();
    hatchRect(ctx,x-116,y-400,x-22,y-110,P.selfDeep,0.30,14,20);
    ctx.restore();

    // chest marker, small and partially hidden by garment line work
    ellipse(ctx,x,y-295,10,10,P.cycleGold,P.ink,1.4,0.9);
  }

  function drawPath(ctx, P) {
    ctx.save();
    ctx.strokeStyle=P.selfWarm;
    ctx.lineWidth=5;
    ctx.globalAlpha=0.68;
    ctx.setLineDash([20,12]);
    ctx.beginPath();
    ctx.moveTo(120,1450);
    ctx.bezierCurveTo(250,1320,320,1420,405,1320);
    ctx.bezierCurveTo(470,1240,500,1275,548,1308);
    ctx.stroke();
    ctx.restore();
  }

  FILM.scene({
    id: ID,
    draw(ctx, tIn, info) {
      const L=info.lib, P=L.pal;
      const t=clamp(tIn,0,info.dur);
      L.paper(ctx,{seed:1001});
      L.stripes(ctx,{colors:[P.stripeCream,P.stripeYellow],width:140,angle:-0.52,offset:6*info.T,seed:1002});

      // Camera push anchored on G1 only at the end.
      const p=clamp((t-1.375)/0.125);
      const z=1+0.35*(p<=0?0:(1-Math.pow(1-p,4)));
      ctx.save();
      ctx.translate(540,700);
      ctx.scale(z,z);
      ctx.translate(-540,-700);

      drawFacade(ctx,P);
      // far people
      ctx.save();ctx.globalAlpha=0.52;
      drawSmallPerson(ctx,P,280,1210,0.62,P.socialBlue,t+0.2);
      drawSmallPerson(ctx,P,820,1180,0.68,P.ageSage,t+0.52);
      drawSmallPerson(ctx,P,925,1130,0.46,P.birthRose,t+0.82);
      ctx.restore();
      drawBench(ctx,P);
      drawPath(ctx,P);
      drawHero(ctx,P,L,t);
      drawPlant(ctx,P,160,1515,0.72,false);
      drawPlant(ctx,P,915,1535,0.62,true);
      ctx.restore();

      // G1 is screen-fixed across the outgoing push.
      L.guideCircle(ctx,540,700,184,{color:P.inkFaint,alpha:0.28,width:1.4});
      L.guideCircle(ctx,540,700,150,{color:P.cycleGold,alpha:0.82,width:3});
      const rp=L.seg(t,0.5,0.75,'outBack');
      if(rp>0){
        L.arcAnnotation(ctx,540,700,198,-1.25,-1.25+rp*5.1,{color:P.annYellow,width:3,p:1});
      }
    }
  });
})();