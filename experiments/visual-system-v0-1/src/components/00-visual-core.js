// Visual System v0.1 core: registry, transforms, anchors, IK.
(function(){
  'use strict';
  const registry={characters:Object.create(null),products:Object.create(null),props:Object.create(null),actions:Object.create(null),hands:Object.create(null),contracts:[]};
  const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v;
  const lerp=(a,b,u)=>a+(b-a)*u;
  const sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*(3-2*u);};

  function solve2Bone(shoulder,target,l1,l2,bend){
    const dx=target[0]-shoulder[0],dy=target[1]-shoulder[1];
    const raw=Math.hypot(dx,dy);
    const d=clamp(raw,Math.abs(l1-l2)+.001,l1+l2-.001);
    const base=Math.atan2(dy,dx);
    const ca=clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1);
    const a=base+Math.acos(ca)*(bend>=0?1:-1);
    const wrist=[shoulder[0]+Math.cos(base)*d,shoulder[1]+Math.sin(base)*d];
    return {
      shoulder:shoulder.slice(),
      elbow:[shoulder[0]+Math.cos(a)*l1,shoulder[1]+Math.sin(a)*l1],
      wrist,
      requested:target.slice(),
      overreach:Math.max(0,raw-(l1+l2))
    };
  }

  function withTransform(ctx,o,fn){
    ctx.save();
    ctx.translate(o.x||0,o.y||0);
    if(o.rot)ctx.rotate(o.rot);
    const sx=o.sx!=null?o.sx:(o.scale!=null?o.scale:1);
    const sy=o.sy!=null?o.sy:(o.scale!=null?o.scale:1);
    ctx.scale(sx,sy);
    if(o.alpha!=null)ctx.globalAlpha*=o.alpha;
    fn();
    ctx.restore();
  }

  function drawPath(ctx,d,style){
    const p=d instanceof Path2D?d:new Path2D(d);
    ctx.save();
    if(style.fill){ctx.fillStyle=style.fill;ctx.fill(p);}
    if(style.stroke){ctx.strokeStyle=style.stroke;ctx.lineWidth=style.width||2;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke(p);}
    ctx.restore();
    return p;
  }

  const api={
    clamp,lerp,sstep,solve2Bone,withTransform,drawPath,
    registerCharacter(name,impl){if(registry.characters[name])throw new Error('character backend exists: '+name);registry.characters[name]=Object.freeze(impl);},
    registerProduct(name,impl){if(registry.products[name])throw new Error('product exists: '+name);registry.products[name]=Object.freeze(impl);},
    registerProp(name,impl){if(registry.props[name])throw new Error('prop exists: '+name);registry.props[name]=Object.freeze(impl);},
    registerAction(name,impl){if(registry.actions[name])throw new Error('action exists: '+name);registry.actions[name]=Object.freeze(impl);},
    registerHand(name,spec){if(registry.hands[name])throw new Error('hand exists: '+name);registry.hands[name]=Object.freeze(spec);},
    registerContract(name,fn){registry.contracts.push(Object.freeze({name,fn}));},
    runContracts(){
      const failures=[];
      for(const c of registry.contracts){
        try{
          const r=c.fn();
          if(Array.isArray(r))for(const x of r)if(x)failures.push(c.name+': '+x);
          else if(r)failures.push(c.name+': '+r);
        }catch(e){failures.push(c.name+': threw '+e.message);}
      }
      return failures;
    },
    character(name){const v=registry.characters[name];if(!v)throw new Error('unknown character backend: '+name);return v;},
    product(name){const v=registry.products[name];if(!v)throw new Error('unknown product: '+name);return v;},
    prop(name){const v=registry.props[name];if(!v)throw new Error('unknown prop: '+name);return v;},
    action(name){const v=registry.actions[name];if(!v)throw new Error('unknown action: '+name);return v;},
    hand(name){const v=registry.hands[name];if(!v)throw new Error('unknown hand: '+name);return v;},
    handContactWorld(name,wrist,rot,worldScale=1){
      const h=registry.hands[name];if(!h)throw new Error('unknown hand: '+name);
      const ds=h.drawScale!=null?h.drawScale:1,cx=h.contact[0]*ds*worldScale,cy=h.contact[1]*ds*worldScale;
      const cr=Math.cos(rot),sr=Math.sin(rot);
      return [wrist[0]+cx*cr-cy*sr,wrist[1]+cx*sr+cy*cr];
    },
    wristForHandContact(name,contact,rot,worldScale=1){
      const h=registry.hands[name];if(!h)throw new Error('unknown hand: '+name);
      const ds=h.drawScale!=null?h.drawScale:1,cx=h.contact[0]*ds*worldScale,cy=h.contact[1]*ds*worldScale;
      const cr=Math.cos(rot),sr=Math.sin(rot);
      return [contact[0]-(cx*cr-cy*sr),contact[1]-(cx*sr+cy*cr)];
    }
  };
  Object.defineProperty(FILM,'visual',{value:Object.freeze(api),writable:false,configurable:false,enumerable:true});
})();