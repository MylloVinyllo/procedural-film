// STUB
FILM.scene({
  id:'drop-growth',
  draw(ctx,t,info){
    const L=info.lib,P=L.pal,p=L.clamp(t/info.dur),seed=L.hash('drop-growth');
    L.blueprint(ctx,{seed,center:[540,850],circles:5,diagonals:4});
    L.guideCircle(ctx,540,820,220,{color:P.lavender,alpha:.7,width:2});
    L.glowDot(ctx,540,820,10,{color:P.schemWater,core:P.glow,rays:12,seed:seed+1,intensity:.7+.3*p,glow:4,twinkle:.04});
    L.ticks(ctx,540,820,{r:280,n:24,len:10,major:6,majorLen:20,color:P.lineWhite,alpha:.35,width:1});
  }
});