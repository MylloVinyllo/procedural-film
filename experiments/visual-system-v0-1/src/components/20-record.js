(function(){
  'use strict';
  const V=FILM.visual,P=FILM.lib.pal;

  function dims(o={}){
    const r=o.r||110;
    return {x:o.x||0,y:o.y||0,rx:o.rx!=null?o.rx:r,ry:o.ry!=null?o.ry:r,rot:o.rot||0};
  }
  function anchors(o={}){
    const d=dims(o),cr=Math.cos(d.rot),sr=Math.sin(d.rot);
    return {
      center:[d.x,d.y],
      edge:(a)=>{
        const lx=Math.cos(a)*d.rx,ly=Math.sin(a)*d.ry;
        return [d.x+lx*cr-ly*sr,d.y+lx*sr+ly*cr];
      }
    };
  }
  function draw(ctx,o={}){
    const d=dims(o);
    ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);

    ctx.fillStyle=P.vinyl;ctx.beginPath();ctx.ellipse(0,0,d.rx,d.ry,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=P.vinylEdge;ctx.lineWidth=2.3;ctx.stroke();

    ctx.save();ctx.strokeStyle=P.groove;ctx.globalAlpha=.74;
    const minR=Math.min(d.rx,d.ry);
    for(let i=0;i<18;i++){
      const k=1-(i+1)*.035;
      if(k<.34)break;
      ctx.lineWidth=i%5===0?1.5:.8;
      ctx.beginPath();ctx.ellipse(0,0,d.rx*k,d.ry*k,0,0,Math.PI*2);ctx.stroke();
    }
    ctx.restore();

    ctx.fillStyle=P.labelDeep;ctx.beginPath();ctx.ellipse(0,0,d.rx*.29,d.ry*.29,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=P.label;ctx.lineWidth=1.3;ctx.stroke();
    ctx.fillStyle=P.white;ctx.beginPath();ctx.ellipse(0,0,Math.max(2.5,d.rx*.035),Math.max(1.8,d.ry*.035),0,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }

  V.registerProp('vinyl-record',{draw,anchors,dims});
})();