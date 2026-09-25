(function () {
  'use strict';

  const M = (FILM.MYLLO = {});
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => {
    t = clamp(t);
    return t * t * (3 - 2 * t);
  };

  M.clamp = clamp;
  M.lerp = lerp;
  M.smooth = smooth;

  M.paper = function paper(ctx, L, seed, accent = 0) {
    const P = L.pal;
    L.paper(ctx, { seed });
    ctx.save();
    ctx.globalAlpha = 0.11 + accent * 0.04;
    ctx.fillStyle = P.stripeYellow;
    ctx.translate(-250, 100);
    ctx.rotate(-0.48);
    for (let x = -300; x < 1800; x += 270) ctx.fillRect(x, -200, 92, 2500);
    ctx.restore();
  };

  M.header = function header(ctx, L, kicker, title, sub, progress) {
    const P = L.pal;
    L.text(ctx, kicker, 76, 170, {
      size: 24,
      weight: 600,
      tracking: 3,
      color: P.red,
      family: 'Montserrat, Arial, sans-serif',
      alpha: 0.92,
    });
    L.text(ctx, title, 76, 242, {
      size: 56,
      weight: 700,
      color: P.ink,
      family: 'Exo 2, Montserrat, Arial, sans-serif',
    });
    if (sub) {
      L.text(ctx, sub, 76, 300, {
        size: 28,
        weight: 400,
        color: P.inkSoft,
        family: 'Montserrat, Arial, sans-serif',
      });
    }
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = P.inkFaint;
    ctx.fillRect(76, 338, 928, 2);
    ctx.restore();
    ctx.save();
    ctx.fillStyle = P.red;
    ctx.fillRect(76, 338, 928 * clamp(progress || 0), 4);
    ctx.restore();
  };

  M.localToScreen = function localToScreen(opts, x, y) {
    const s = opts.scale || 1;
    const tx = (opts.cx == null ? 540 : opts.cx) - 490 * s;
    const ty = (opts.cy == null ? 1040 : opts.cy) - 410 * s;
    return [tx + x * s, ty + y * s];
  };

  M.drawMini = function drawMini(ctx, L, opts = {}) {
    const P = L.pal;
    const s = opts.scale || 1;
    const cx = opts.cx == null ? 540 : opts.cx;
    const cy = opts.cy == null ? 1040 : opts.cy;
    const tx = cx - 490 * s;
    const ty = cy - 410 * s;
    const armAngle = opts.armAngle == null ? -0.72 : opts.armAngle;
    const spin = opts.spin || 0;
    const wet = clamp(opts.wet || 0);
    const dry = clamp(opts.dry || 0);
    const engaged = clamp(opts.engaged || 0);
    const alpha = opts.alpha == null ? 1 : opts.alpha;
    const highlight = opts.highlight || '';

    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(tx, ty);
    ctx.scale(s, s);

    const ink = P.ink;
    const soft = P.inkSoft;
    const recordFill = P.navyDeep;

    L.inkPath(ctx, [[180,315],[690,300],[815,365],[260,405]], {
      closed:true, fill:P.night, color:soft, width:2.5, seed:101, boilAmp:0.28
    });
    L.inkPath(ctx, [[260,405],[815,365],[790,665],[250,675]], {
      closed:true, fill:P.ink, color:soft, width:2.8, seed:102, boilAmp:0.28
    });
    L.inkPath(ctx, [[180,315],[260,405],[250,675],[160,590]], {
      closed:true, fill:P.inkSoft, color:ink, width:2.2, seed:103, boilAmp:0.28
    });

    const recordPts = L.ellipsePts(355,290,290,86,96);
    L.inkPath(ctx, recordPts, {
      closed:true, fill:recordFill, color:ink, width:3.0, seed:111, boilAmp:0.25
    });
    for (const [rx, ry, a] of [[265,73,0.48],[230,61,0.36],[195,48,0.3]]) {
      L.inkPath(ctx, L.ellipsePts(355,290,rx,ry,88), {
        closed:true, color:P.inkFaint, alpha:a, width:1.35, seed:112 + rx, boilAmp:0.18
      });
    }

    if (wet > 0.001) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(355,290,285,82,0,0,Math.PI*2);
      ctx.clip();
      ctx.globalAlpha *= 0.12 + wet * 0.28;
      ctx.fillStyle = P.annBlue;
      ctx.fillRect(65,202,580,176);
      for (let i = 0; i < 8; i++) {
        const yy = 221 + i * 18;
        ctx.globalAlpha = 0.14 + wet * 0.12;
        ctx.fillStyle = P.paleBlue;
        ctx.fillRect(80 + ((i * 31) % 50), yy, 500 - ((i * 17) % 70), 2);
      }
      ctx.restore();
    }

    if (dry > 0.001) {
      const contactX = 535;
      const left = contactX - 455 * smooth(dry);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(355,290,285,82,0,0,Math.PI*2);
      ctx.clip();
      ctx.globalAlpha *= 0.34;
      ctx.fillStyle = P.sage;
      ctx.fillRect(left,198,contactX-left,184);
      ctx.globalAlpha = 0.65;
      ctx.fillStyle = P.white;
      ctx.fillRect(contactX - 10, 202, 10, 176);
      ctx.restore();
    }

    const a = spin * Math.PI * 2;
    const mx = 355 + Math.cos(a) * 205;
    const my = 290 + Math.sin(a) * 55;
    ctx.save();
    ctx.fillStyle = P.red;
    ctx.globalAlpha *= 0.8;
    ctx.beginPath();
    ctx.arc(mx,my,7,0,Math.PI*2);
    ctx.fill();
    ctx.restore();

    L.inkPath(ctx, L.ellipsePts(420,274,76,24,48), {
      closed:true, fill:P.paperDeep, color:soft, width:2.4, seed:121, boilAmp:0.18
    });
    L.inkPath(ctx, L.rrectPts(408,220,24,54,6,8), {
      closed:true, fill:P.tan, color:soft, width:1.8, seed:122, boilAmp:0.18
    });

    L.inkPath(ctx, L.rrectPts(706,186,42,160,14,9), {
      closed:true,
      fill:P.paperDeep,
      color:ink,
      width:2.4,
      seed:131,
      boilAmp:0.2
    });

    ctx.save();
    ctx.translate(727,238);
    ctx.rotate(armAngle);
    const armFill = L.mix(P.paperDeep, P.red, engaged);
    const padFill = L.mix(P.inkSoft, P.red, engaged);
    L.inkPath(ctx, L.capsulePts(-102,0,224,17,0,64), {
      closed:true, fill:armFill, color:ink, width:2.5, seed:132, boilAmp:0.2
    });
    L.inkPath(ctx, L.rrectPts(-226,-14,30,28,8,7), {
      closed:true, fill:padFill, color:ink, width:1.6, seed:133, boilAmp:0.16
    });
    if (engaged > 0.01) {
      ctx.save();
      ctx.globalAlpha *= 0.32 + engaged * 0.46;
      ctx.fillStyle = P.red;
      ctx.fillRect(-230,18,40,6);
      ctx.restore();
    }
    ctx.restore();

    for (const [x,y] of [[365,545],[450,542]]) {
      L.inkPath(ctx, L.ellipsePts(x,y,18,18,34), {
        closed:true, fill:P.night, color:P.inkFaint, width:1.8, seed:140+x, boilAmp:0.15
      });
    }

    ctx.save();
    ctx.globalAlpha *= 0.55;
    ctx.fillStyle = P.night;
    for (const [x,y] of [[294,676],[744,666]]) {
      ctx.beginPath(); ctx.ellipse(x,y,28,10,0,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();

    ctx.restore();

    const record = M.localToScreen({ scale:s, cx, cy },355,290);
    const contact = M.localToScreen({ scale:s, cx, cy },535,238);
    const tower = M.localToScreen({ scale:s, cx, cy },727,238);
    return {
      recordCx:record[0], recordCy:record[1], rx:290*s, ry:86*s,
      contactX:contact[0], contactY:contact[1], towerX:tower[0], towerY:tower[1]
    };
  };

  M.callout = function callout(ctx, L, x, y, label, side = 'left', alpha = 1) {
    const P = L.pal;
    const dir = side === 'left' ? -1 : 1;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.strokeStyle = P.red;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + dir*70, y - 42);
    ctx.lineTo(x + dir*200, y - 42);
    ctx.stroke();
    ctx.fillStyle = P.red;
    ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2); ctx.fill();
    L.text(ctx,label,x + dir*210,y - 34,{
      size:24, weight:600, color:P.ink,
      align:side === 'left' ? 'right':'left',
      family:'Montserrat, Arial, sans-serif'
    });
    ctx.restore();
  };

  M.drawMacroPass = function drawMacroPass(ctx, L, opts = {}) {
    const P = L.pal;
    const p = clamp(opts.p || 0);
    const spin = opts.spin || 0;
    const cx = 500, cy = 1030, rx = 430, ry = 150;
    L.blueprint(ctx, { seed: 73, center:[540,1000], circles:3, diagonals:3 });

    L.inkPath(ctx,L.ellipsePts(cx,cy,rx,ry,120),{
      closed:true, fill:P.navyDeep, color:P.lineWhite, width:3, alpha:0.95, seed:210, boilAmp:0.16
    });
    for (const [rrx,rry] of [[380,132],[325,112],[265,90]]) {
      L.inkPath(ctx,L.ellipsePts(cx,cy,rrx,rry,110),{
        closed:true,color:P.grid,width:1.4,alpha:0.55,seed:211+rrx,boilAmp:0.12
      });
    }

    ctx.save();
    ctx.beginPath(); ctx.ellipse(cx,cy,rx-6,ry-6,0,0,Math.PI*2); ctx.clip();
    ctx.globalAlpha = 0.32;
    ctx.fillStyle = P.annBlue;
    ctx.fillRect(cx-rx,cy-ry,rx*2,ry*2);

    const zoneX = 548;
    const left = zoneX - 650*smooth(p);
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = P.sage;
    ctx.fillRect(left,cy-ry,zoneX-left,ry*2);
    ctx.restore();

    L.inkPath(ctx,L.rrectPts(850,720,52,330,18,11),{
      closed:true,fill:P.inkSoft,color:P.lineWhite,width:2.5,seed:220,boilAmp:0.16
    });
    L.inkPath(ctx,L.capsulePts(745,910,430,23,0,82),{
      closed:true,fill:P.red,color:P.lineWhite,width:2.6,seed:221,boilAmp:0.16
    });
    L.inkPath(ctx,L.rrectPts(520,887,48,46,11,8),{
      closed:true,fill:P.inkSoft,color:P.lineWhite,width:1.8,seed:222,boilAmp:0.12
    });

    ctx.save();
    ctx.strokeStyle = P.glow;
    ctx.globalAlpha = 0.82;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(548,938); ctx.lineTo(548,1120); ctx.stroke();
    ctx.restore();

    const cue = smooth(clamp((p - 0.18)/0.55));
    if (cue > 0) {
      ctx.save();
      ctx.strokeStyle = P.paleBlue;
      ctx.fillStyle = P.paleBlue;
      ctx.globalAlpha = 0.82 * cue;
      ctx.lineWidth = 3;
      for (let i=0;i<4;i++) {
        const u = clamp(cue*1.3 - i*0.12);
        const x = lerp(548, 838, u);
        const y = 900 - Math.sin(u*Math.PI)*90 - i*12;
        ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2); ctx.fill();
      }
      ctx.beginPath();
      ctx.moveTo(850,820); ctx.lineTo(920,706); ctx.stroke();
      ctx.restore();

      L.inkPath(ctx,L.rrectPts(866,608,168,104,14,12),{
        closed:true,fill:P.navyLight,color:P.paleBlue,width:2.2,alpha:0.95,seed:224,boilAmp:0.12
      });
      L.text(ctx,'система',950,650,{size:22,weight:500,color:P.lineWhite,align:'center',family:'Montserrat, Arial, sans-serif'});
      L.text(ctx,'збору',950,680,{size:25,weight:700,color:P.paleBlue,align:'center',family:'Montserrat, Arial, sans-serif'});
    }

    const a = spin * Math.PI*2;
    const mx = cx + Math.cos(a)*290;
    const my = cy + Math.sin(a)*92;
    ctx.save(); ctx.fillStyle=P.magenta; ctx.beginPath(); ctx.arc(mx,my,7,0,Math.PI*2); ctx.fill(); ctx.restore();

    return { zoneX, recordCx:cx, recordCy:cy };
  };

  FILM.TIMELINE = {
    title: 'Myllo Mini · vacuum collection pilot',
    bpm: 120,
    duration: 16,
    shots: [
      { id:'identify-mini', file:'01-identify-mini.js', start:0, end:2, mode:'illustrated', brief:'Recognizable Myllo Mini with mounted record. Record motion already gives life to the opening.' },
      { id:'wet-before', file:'02-wet-before.js', start:2, end:4, mode:'illustrated', brief:'Same Mini, parked vacuum arm, wet surface state becomes observable.' },
      { id:'pivot-engage', file:'03-pivot-engage.js', start:4, end:6.5, mode:'illustrated', brief:'Same real vacuum arm pivots around the right-side tower into working position and engages.' },
      { id:'collection-pass', file:'04-collection-pass.js', start:6.5, end:10.5, mode:'schematic', brief:'Controlled macro keeps record and vacuum arm identity while wet-before becomes dry-after at the collection zone.' },
      { id:'collection-result', file:'05-collection-result.js', start:10.5, end:13.5, mode:'schematic', brief:'Dry result remains visible and a restrained cue terminates at an abstract collection endpoint.' },
      { id:'release-return', file:'06-release-return.js', start:13.5, end:16, mode:'illustrated', brief:'Return to the full Mini. Arm releases and pivots toward parked orientation while the record remains dry.' }
    ],
    cues: [
      { t:0, kind:'open' },
      { t:2, kind:'cut' },
      { t:4, kind:'cut' },
      { t:6.5, kind:'cut' },
      { t:10.5, kind:'cut' },
      { t:13.5, kind:'cut' }
    ]
  };
})();