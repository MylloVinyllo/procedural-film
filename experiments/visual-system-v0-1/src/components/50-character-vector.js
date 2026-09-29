(function(){
  'use strict';
  const V=FILM.visual,A=FILM.vectorAssets.protagonist,P=FILM.lib.pal;
  const C={skin:P.skin,skinShadow:P.skinShadow,shirt:P.machineDeep,shirtDeep:P.nightSky,ink:P.ink,hair:P.hair,tee:P.tee};
  const cache=Object.create(null),path=k=>cache[k]||(cache[k]=new Path2D(A[k]));

  function poseState(o){return o.pose||V.samplePose('neutral',1);}
  function local(o,p){
    const r=o.root||[0,0],s=o.scale!=null?o.scale:1,ps=poseState(o),a=-(ps.bodyRot||0);
    const dx=p[0]-r[0],dy=p[1]-r[1],cr=Math.cos(a),sr=Math.sin(a);
    return [(dx*cr-dy*sr)/s,(dx*sr+dy*cr)/s];
  }
  function setup(ctx,o,fn){
    const r=o.root||[0,0],s=o.scale!=null?o.scale:1,ps=poseState(o);
    ctx.save();ctx.translate(r[0],r[1]);ctx.rotate(ps.bodyRot||0);ctx.scale(s,s);fn();ctx.restore();
  }
  function rig(o){
    const ps=poseState(o),base=[[-80,-112],[80,-112]],out={};
    const shoulders=[
      [base[0][0]+(ps.leftShoulder?ps.leftShoulder[0]:0),base[0][1]+(ps.leftShoulder?ps.leftShoulder[1]:0)],
      [base[1][0]+(ps.rightShoulder?ps.rightShoulder[0]:0),base[1][1]+(ps.rightShoulder?ps.rightShoulder[1]:0)]
    ];
    if(o.leftWrist)out.left=V.solve2Bone(shoulders[0],local(o,o.leftWrist),136,126,o.leftBend!=null?o.leftBend:-1);
    if(o.rightWrist)out.right=V.solve2Bone(shoulders[1],local(o,o.rightWrist),136,126,o.rightBend!=null?o.rightBend:1);
    return out;
  }
  function part(ctx,k,fill,stroke=C.ink,w=2){
    ctx.fillStyle=fill;ctx.fill(path(k));
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke(path(k));}
  }
  function bonePart(ctx,k,a,b,fill){
    const dx=b[0]-a[0],dy=b[1]-a[1],ang=Math.atan2(dy,dx),len=Math.hypot(dx,dy),nominal=k==='upperArm'?136:129;
    ctx.save();ctx.translate(a[0],a[1]);ctx.rotate(ang);ctx.scale(len/nominal,1);part(ctx,k,fill,C.ink,1.8);ctx.restore();
  }
  function strokeFinger(ctx,seg){
    const pts=seg.points,w0=seg.width,w1=seg.tipWidth!=null?seg.tipWidth:Math.max(6,w0*.68);
    const left=[],right=[];
    for(let i=0;i<pts.length;i++){
      const prev=pts[Math.max(0,i-1)],next=pts[Math.min(pts.length-1,i+1)];
      const dx=next[0]-prev[0],dy=next[1]-prev[1],len=Math.max(1,Math.hypot(dx,dy));
      const nx=-dy/len,ny=dx/len,t=pts.length===1?1:i/(pts.length-1),hw=V.lerp(w0,w1,t)/2;
      left.push([pts[i][0]+nx*hw,pts[i][1]+ny*hw]);
      right.push([pts[i][0]-nx*hw,pts[i][1]-ny*hw]);
    }
    const drawPoly=(inflate,fill)=>{
      ctx.beginPath();ctx.moveTo(left[0][0],left[0][1]);
      for(let i=1;i<left.length;i++)ctx.lineTo(left[i][0],left[i][1]);
      for(let i=right.length-1;i>=0;i--)ctx.lineTo(right[i][0],right[i][1]);
      ctx.closePath();ctx.fillStyle=fill;ctx.fill();
    };
    // outline first, then skin. This preserves the graphic language but gives fingers a human taper.
    ctx.save();ctx.strokeStyle=C.ink;ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.stroke();
    drawPoly(0,C.skin);
    ctx.strokeStyle=C.ink;ctx.lineWidth=1.7;ctx.beginPath();ctx.moveTo(left[0][0],left[0][1]);
    for(let i=1;i<left.length;i++)ctx.lineTo(left[i][0],left[i][1]);
    for(let i=right.length-1;i>=0;i--)ctx.lineTo(right[i][0],right[i][1]);
    ctx.closePath();ctx.stroke();
    const tip=pts[pts.length-1];
    ctx.fillStyle=C.skin;ctx.beginPath();ctx.arc(tip[0],tip[1],w1/2,0,Math.PI*2);ctx.fill();ctx.strokeStyle=C.ink;ctx.lineWidth=1.5;ctx.stroke();
    ctx.restore();
  }

  function palmPath(ctx,d){
    const p=new Path2D(d);ctx.fillStyle=C.skin;ctx.fill(p);ctx.strokeStyle=C.ink;ctx.lineWidth=1.8;ctx.lineJoin='round';ctx.stroke(p);
  }

  function hand(ctx,p,rot,type,flipY=false){
    const hs=V.hand(type),rig=FILM.handVectorRig[type]||FILM.handVectorRig.edge;
    ctx.save();ctx.translate(...p);ctx.rotate(rot);ctx.scale(hs.drawScale,hs.drawScale*(flipY?-1:1));

    // Wrist bridge first, then finger groups, then palm. This hides mechanical seams and keeps
    // finger roots embedded in one hand mass without collapsing the silhouette into a blob.
    ctx.fillStyle=C.skin;ctx.strokeStyle=C.ink;ctx.lineWidth=1.7;
    ctx.beginPath();ctx.roundRect(-17,-13,28,26,12);ctx.fill();ctx.stroke();

    for(const seg of rig.behind)strokeFinger(ctx,seg);
    palmPath(ctx,rig.palm);
    for(const seg of rig.front)strokeFinger(ctx,seg);

    ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.05;ctx.globalAlpha=.48;ctx.lineCap='round';
    for(const c of rig.crease){
      ctx.beginPath();ctx.moveTo(c[0][0],c[0][1]);ctx.quadraticCurveTo(c[1][0],c[1][1],c[2][0],c[2][1]);ctx.stroke();
    }
    ctx.globalAlpha=1;
    ctx.restore();
  }
  function drawHead(ctx,ps){
    const off=ps.headOffset||[0,0],g=ps.gaze||[0,0],hr=ps.headRot||0;
    ctx.save();ctx.translate(off[0],-184+off[1]);ctx.rotate(hr);ctx.translate(0,184);

    // neck follows the head slightly, which removes the pasted-on oval read.
    ctx.fillStyle=C.skin;ctx.beginPath();ctx.roundRect(-22,-193,44,44,13);ctx.fill();

    // ears sit behind the face contour.
    ctx.fillStyle=C.skin;ctx.beginPath();ctx.ellipse(-57,-263,10,16,-.08,0,Math.PI*2);ctx.ellipse(74,-264,10,16,.08,0,Math.PI*2);ctx.fill();

    part(ctx,'head',C.skin,C.ink,2.8);
    part(ctx,'hair',C.hair,null,0);

    // brows establish direction before tiny eye detail.
    ctx.strokeStyle=C.ink;ctx.lineWidth=2;ctx.lineCap='round';ctx.globalAlpha=.72;
    ctx.beginPath();ctx.moveTo(-31,-280);ctx.quadraticCurveTo(-20,-285,-10,-281);ctx.stroke();
    ctx.beginPath();ctx.moveTo(17,-282);ctx.quadraticCurveTo(29,-286,39,-281);ctx.stroke();
    ctx.globalAlpha=1;

    ctx.fillStyle=C.ink;ctx.beginPath();
    ctx.ellipse(-20+g[0],-260+g[1],3.4,4.1,0,0,Math.PI*2);
    ctx.ellipse(24+g[0],-261+g[1],3.4,4.1,0,0,Math.PI*2);ctx.fill();

    ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.4;
    ctx.beginPath();ctx.moveTo(3,-251);ctx.quadraticCurveTo(-2,-234,5,-228);ctx.stroke();

    ctx.strokeStyle=C.ink;ctx.lineWidth=1.55;
    ctx.beginPath();ctx.moveTo(-12,-210);ctx.quadraticCurveTo(2,-204,17,-212);ctx.stroke();

    ctx.restore();
  }

  function drawBody(ctx,o){
    setup(ctx,o,()=>{
      const ps=poseState(o);
      part(ctx,'hips',C.shirtDeep,C.ink,2.5);
      // waist break + trouser center seam prevent the lower body reading as a skirt-shaped block.
      ctx.save();ctx.strokeStyle=C.ink;ctx.globalAlpha=.42;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(-72,153);ctx.quadraticCurveTo(0,166,72,153);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,224);ctx.lineTo(1,306);ctx.stroke();ctx.restore();
      part(ctx,'torso',C.shirt,C.ink,2.8);

      // directional jacket shadow, quieter than the old half-body block.
      ctx.fillStyle=C.shirtDeep;ctx.globalAlpha=.22;ctx.beginPath();
      ctx.moveTo(20,-167);ctx.bezierCurveTo(63,-164,91,-145,99,-112);
      ctx.lineTo(88,139);ctx.bezierCurveTo(61,151,38,155,17,154);ctx.closePath();ctx.fill();ctx.globalAlpha=1;

      part(ctx,'tee',C.tee,null,0);

      ctx.strokeStyle=C.shirtDeep;ctx.lineWidth=1.8;ctx.globalAlpha=.58;
      ctx.beginPath();ctx.moveTo(-73,-120);ctx.quadraticCurveTo(0,-96,74,-120);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-36,53);ctx.quadraticCurveTo(-12,60,7,56);ctx.stroke();
      ctx.globalAlpha=1;

      drawHead(ctx,ps);
    });
  }

  function drawArms(ctx,o,layer='all'){
    const R=rig(o);setup(ctx,o,()=>{
      for(const side of ['left','right']){
        const q=R[side];if(!q)continue;
        const armLayer=o[side+'ArmLayer']||'back';
        if(layer!=='all'&&armLayer!==layer)continue;

        bonePart(ctx,'upperArm',q.shoulder,q.elbow,C.shirt);
        bonePart(ctx,'foreArm',q.elbow,q.wrist,C.skin);

        const dx=q.elbow[0]-q.shoulder[0],dy=q.elbow[1]-q.shoulder[1],a=Math.atan2(dy,dx);
        ctx.save();ctx.translate(q.elbow[0],q.elbow[1]);ctx.rotate(a);
        ctx.strokeStyle=C.shirtDeep;ctx.lineWidth=2.6;ctx.globalAlpha=.66;
        ctx.beginPath();ctx.moveTo(-1,-17);ctx.quadraticCurveTo(4,0,-1,17);ctx.stroke();ctx.restore();

        const fx=q.wrist[0]-q.elbow[0],fy=q.wrist[1]-q.elbow[1],fl=Math.max(1,Math.hypot(fx,fy)),nx=-fy/fl,ny=fx/fl;
        const cx=q.elbow[0]+fx*.19,cy=q.elbow[1]+fy*.19;
        ctx.save();ctx.strokeStyle=C.skinShadow;ctx.lineWidth=1.05;ctx.globalAlpha=.42;
        ctx.beginPath();ctx.moveTo(cx-nx*7,cy-ny*7);ctx.quadraticCurveTo(cx+fx/fl*3,cy+fy/fl*3,cx+nx*7,cy+ny*7);ctx.stroke();ctx.restore();
      }
    });
  }

  function drawHands(ctx,o){
    const R=rig(o);setup(ctx,o,()=>{
      if(R.left)hand(ctx,R.left.wrist,o.leftHandRot!=null?o.leftHandRot:Math.atan2(R.left.wrist[1]-R.left.elbow[1],R.left.wrist[0]-R.left.elbow[0]),o.leftHand||'edge',!!o.leftHandFlip);
      if(R.right)hand(ctx,R.right.wrist,o.rightHandRot!=null?o.rightHandRot:Math.atan2(R.right.wrist[1]-R.right.elbow[1],R.right.wrist[0]-R.right.elbow[0]),o.rightHand||'edge',!!o.rightHandFlip);
    });
  }

  function audit(o){
    const R=rig(o);
    return {leftOverreach:R.left?R.left.overreach:0,rightOverreach:R.right?R.right.overreach:0};
  }
  function drawHandState(ctx,o={}){
    const type=o.type||'edge',p=o.at||[0,0],rot=o.rot||0,scale=o.scale!=null?o.scale:1;
    ctx.save();ctx.translate(p[0],p[1]);ctx.scale(scale,scale);hand(ctx,[0,0],rot,type,!!o.flipY);ctx.restore();
  }
  function draw(ctx,o){drawBody(ctx,o);drawArms(ctx,o);drawHands(ctx,o);}
  V.registerCharacter('vector',{draw,drawBody,drawArms,drawHands,drawHandState,audit});
})();