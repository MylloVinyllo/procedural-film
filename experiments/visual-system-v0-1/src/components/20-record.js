(function(){
  'use strict';
  const V=FILM.visual,P=FILM.lib.pal;
  function anchors(o){
    const x=o.x||0,y=o.y||0,r=o.r||110;
    return {
      center:[x,y],
      edge:(a)=>[x+Math.cos(a)*r,y+Math.sin(a)*r]
    };
  }
  function draw(ctx,o={}){
    const x=o.x||0,y=o.y||0,r=o.r||110,rot=o.rot||0;
    ctx.save();ctx.translate(x,y);ctx.rotate(rot);
    ctx.fillStyle=P.vinyl;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=P.groove;ctx.lineWidth=2;
    for(let i=0;i<18;i++){const rr=r-7-i*4.6;if(rr<36)break;ctx.beginPath();ctx.arc(0,0,rr,0,Math.PI*2);ctx.stroke();}
    ctx.fillStyle=P.labelDeep;ctx.beginPath();ctx.arc(0,0,r*.29,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=P.white;ctx.beginPath();ctx.arc(0,0,4,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
  V.registerProp('vinyl-record',{draw,anchors});
})();