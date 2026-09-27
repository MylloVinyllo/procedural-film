// 09 · Matched grooves before / after · T 24.000–27.000
(function(){
  'use strict';
  const ID='grooves-before-after';
  const L=FILM.lib,P=L.pal,TAU=Math.PI*2;
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};
  const sd=(...k)=>L.hash(ID,...k)&0x7fffffff;

  function hand(c,x,y,rot,scale){
    c.save();c.translate(x,y);c.rotate(rot);c.scale(scale,scale);
    c.fillStyle=P.skin;c.strokeStyle=P.ink;c.lineWidth=3;
    c.beginPath();L.tracePath(c,[[-45,-50],[26,-48],[54,-12],[42,48],[-30,58],[-58,18]],true);c.fill();c.stroke();
    const fingers=[
      [[12,-48],[76,-43],[82,-25],[18,-21]],
      [[18,-19],[86,-12],[86,8],[18,5]],
      [[16,9],[78,16],[75,34],[10,30]]
    ];
    fingers.forEach(pts=>{c.beginPath();L.tracePath(c,pts,true);c.fill();c.stroke();});
    c.restore();
  }

  FILM.scene({
    id:ID,
    draw(c,tIn,info){
      const t=clamp(tIn,0,info.dur);
      const slide=sstep(.25,.75,t);
      const prove=sstep(.85,1.55,t);
      const pull=sstep(2.0,2.72,t);
      const divider=lerp(540,610,slide);

      L.paper(c,{seed:sd('paper')});
      L.v4ProcessBand(c,{index:5,main:'ДО / ПОСЛЕ',p:sstep(0,.22,t)});

      const left={x:75,y:520,w:440,h:710};
      const right={x:565,y:520,w:440,h:710};

      if(pull<.98){
        L.v4GrooveMacro(c,left,{dirt:.98,wet:0,reflection:.22,seed:sd('matched'),label:'ДО'});
        L.v4GrooveMacro(c,right,{dirt:.08,wet:0,reflection:.92,seed:sd('matched'),label:'ПОСЛЕ'});

        if(prove>.05){
          c.save();c.strokeStyle=P.soundWord;c.lineWidth=3;c.globalAlpha=.75*prove;
          c.beginPath();c.arc(305,825,58,0,TAU);c.stroke();
          c.beginPath();c.moveTo(340,780);c.lineTo(410,725);c.stroke();c.restore();
        }
        if(prove>.35){
          c.save();c.strokeStyle=P.cleanGold;c.lineWidth=3;c.globalAlpha=.55*prove;
          c.beginPath();c.arc(795,825,58,.25,2.7);c.stroke();c.restore();
        }

        c.save();c.strokeStyle=P.comicBorder;c.lineWidth=8;c.globalAlpha=.92;
        c.beginPath();c.moveTo(divider,505);c.lineTo(divider,1250);c.stroke();c.restore();
      }

      if(pull>0){
        const a=pull;
        const wipeX=1080*(1-a);
        c.save();
        c.beginPath();c.rect(wipeX,430,1080-wipeX,1050);c.clip();
        c.fillStyle=P.paper;c.fillRect(0,430,1080,1050);
        const cx=lerp(785,540,a),cy=lerp(875,930,a),rx=lerp(210,300,a),ry=lerp(340,118,a);
        c.fillStyle=P.vinyl;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,TAU);c.fill();
        c.strokeStyle=P.vinylEdge;c.lineWidth=5;c.stroke();
        for(let i=0;i<18;i++){
          const rr=rx-18-i*(rx-105)/19;
          c.strokeStyle=P.groove;c.lineWidth=i%5===0?1.7:.8;c.globalAlpha=.38;
          c.beginPath();c.ellipse(cx,cy,rr,ry*(rr/rx),0,0,TAU);c.stroke();
        }
        c.globalAlpha=1;c.fillStyle=P.label;c.beginPath();c.ellipse(cx,cy,74,Math.max(25,ry*.24),0,0,TAU);c.fill();
        if(a>.42){
          hand(c,300,1110,-.15,.66*sstep(.42,.8,a));
          hand(c,790,1110,Math.PI+.15,.66*sstep(.42,.8,a));
        }
        c.restore();
      }

      c.save();c.strokeStyle=P.comicBorder;c.lineWidth=5;c.strokeRect(18,18,1044,1884);c.restore();
    }
  });
})();