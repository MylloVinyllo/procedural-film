// STUB
FILM.scene({
  id:'cloud-hero',
  draw(ctx,t,info){
    const L=info.lib,P=L.pal,p=L.clamp(t/info.dur),q=L.clamp(L.onTwos(t)/info.dur),seed=L.hash('cloud-hero');
    L.paper(ctx); L.stripes(ctx,{colors:[P.stripeCream,P.stripeSky],width:140,angle:-.52,offset:info.T*12,seed});
    L.inkPath(ctx,L.ellipsePts(540,860,300,400,72),{closed:true,width:5,seed:seed+1,double:true});
    L.inkLine(ctx,140,1300,940,1300,{width:3,seed:seed+2});
    L.inkCircle(ctx,240+600*q,1230,44,{width:3,seed:seed+3,fill:P.waterBody});
    L.text(ctx,'STUB 01',540,330,{size:60,weight:600,align:'center',color:P.annMagenta});
    L.text(ctx,info.shot.title||'cloud-hero',540,1420,{size:44,align:'center',color:P.ink});
    if(p>.01)L.inkLine(ctx,140,1530,140+800*p,1530,{width:4,color:P.annBlue,seed:seed+4,taper:0});
  }
});