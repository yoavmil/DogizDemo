import{n as m,r as n,t as a}from"./chunk-ByDcM7QR.js";import{n as r,t as i}from"./chunk-BD7nBQ1L.js";import{i as q,n as b,r as f,t as N}from"./chunk-yyUJekcN.js";import{B as _i,C as Pn,D as Rt,G as cn,I as Xi,S as Pe$1,b as Mf,f as Et,g as Jf,ht as tc,mt as sc,n as $t,o as C,r as $y,rt as kr,t as $f,tt as jy,ut as oc,v as Kt,vt as vc,w as Qy,x as Nr}from"./chunk-DThBA2Bi.js";import{c as H$1,d as R$1,f as S,h as p,l as I,m as o,p as f$1,u as N$1}from"./main-LIPDRCNP.js";import{n as l,t as k$1}from"./chunk-DJVAsKa_.js";var ve={jump:[{from:420,to:820,duration:.14,type:`square`,volume:.06}],land:[{from:160,to:90,duration:.07,type:`triangle`,volume:.08}],treat:[{from:880,to:880,duration:.07,type:`square`,volume:.05},{from:1320,to:1320,duration:.11,type:`square`,volume:.05,delay:.06}],crash:[{from:300,to:60,duration:.35,type:`sawtooth`,volume:.08},{from:520,to:180,duration:.18,type:`square`,volume:.04}],milestone:[{from:660,to:660,duration:.08,type:`triangle`,volume:.08},{from:990,to:990,duration:.14,type:`triangle`,volume:.08,delay:.08}],click:[{from:600,to:500,duration:.05,type:`triangle`,volume:.06}]};function y(r){return{width:r.width-2*r.insetX,height:r.height-r.insetTop}}function je(r,e,t=p){let i=y(r);return i.height>=t.physics.jumpHeight?!1:(i.width+t.puppy.hitWidth)/e<=m(t.physics,i.height)*t.spawn.clearanceSafety}function Ie(r,e=p){return r*1.03*(a(e.physics)+e.spawn.reactionSeconds)}function xe(r,e,t,i=p){let s=i.spawn.gapSpreadStart+(i.spawn.gapSpreadEnd-i.spawn.gapSpreadStart)*e;return Ie(r,p)*(1+t()*s)}function Ae(r,e,t=p){let i=t.obstacles.filter(a=>a.minDifficulty<=e&&je(a,r,p));return i.length>0?i:[[...t.obstacles].sort((a,n)=>y(a).width+y(a).height-(y(n).width+y(n).height))[0]]}function ye(r,e,t,i=p){let s=Ae(r,e,i),a=s.reduce((o,l)=>o+l.weight,0),n=t()*a;for(let o of s)if(n-=o.weight,n<0)return o;return s[s.length-1]}var He={ready:{start:`running`},running:{pause:`paused`,crash:`gameOver`,restart:`running`},paused:{resume:`running`,restart:`running`},gameOver:{restart:`running`}};function we(r,e){return He[r][e]??null}function Se(r,e=p.scoring){return Math.floor(Math.max(0,r)*e.pointsPerSecond)}function Me(r,e=p.speed){return Math.min(e.max,e.start+e.acceleration*Math.max(0,r))}function ke(r,e=p.speed){let t=(r-e.start)/(e.max-e.start);return Math.min(1,Math.max(0,t))}var M=class{constructor(e,t=p){this.rng=e;this.cfg=t;this.speed=t.speed.start,this.resetRun()}rng;cfg;phase=`ready`;elapsed=0;distance=0;speed;puppy={elevation:0,velocity:0,grounded:!0};obstacles=[];timeSinceCrash=0;distanceToNextSpawn=0;jumpBuffer=0;nextId=1;lastMilestone=0;viewWidth=960;pending=[];get score(){return Se(this.elapsed,this.cfg.scoring)}get config(){return this.cfg}configureRunner(e,t=p.obstacles){if(this.phase!==`ready`)throw new Error(`Runner size must be configured before starting`);this.cfg=S(e,t)}get difficulty(){return ke(this.speed,this.cfg.speed)}get canRestart(){return this.phase!==`gameOver`||this.timeSinceCrash>=this.cfg.restartLockSeconds&&this.puppy.grounded&&this.speed===0}setViewWidth(e){this.viewWidth=Math.max(e,this.cfg.puppy.x*2)}dispatch(e){let t=we(this.phase,e);if(t===null)return!1;if(e===`restart`){if(!this.canRestart)return!1;this.resetRun(),this.pending.push({type:`restart`})}return e===`crash`&&(this.timeSinceCrash=0,this.jumpBuffer=0,this.puppy.velocity=Math.min(0,this.puppy.velocity)),this.phase=t,this.pending.push({type:`phase`,phase:t}),!0}pressJump(){switch(this.phase){case`ready`:this.dispatch(`start`),this.jumpBuffer=this.cfg.physics.jumpBufferSeconds;break;case`running`:this.jumpBuffer=this.cfg.physics.jumpBufferSeconds;break;case`gameOver`:this.dispatch(`restart`)}}step(e){let t=Math.min(Math.max(e,0),this.cfg.maxStepSeconds);return this.phase===`gameOver`&&(this.timeSinceCrash+=t,this.advanceCrash(t)),this.phase===`running`&&t>0&&this.advance(t),this.pending.splice(0,this.pending.length)}advanceCrash(e){let t=this.puppy.grounded;this.updatePuppy(e);let i=this.speed;t&&(this.speed=Math.max(0,this.speed-o(9)*e));let s=(i+this.speed)*.5*e;this.distance+=s,this.scroll(s,e)}advance(e){this.elapsed+=e,this.speed=Me(this.elapsed,this.cfg.speed);let t=this.speed*e;this.distance+=t,this.updatePuppy(e),this.scroll(t,e),this.spawn(t),this.checkCrash();let i=Math.floor(this.score/this.cfg.scoring.milestoneEvery);i>this.lastMilestone&&(this.lastMilestone=i,this.pending.push({type:`milestone`,score:i*this.cfg.scoring.milestoneEvery}))}updatePuppy(e){let t=this.puppy,i=this.cfg.physics;if(this.jumpBuffer=Math.max(0,this.jumpBuffer-e),t.grounded&&this.jumpBuffer>0&&(t.velocity=n(i),t.grounded=!1,this.jumpBuffer=0,this.pending.push({type:`jump`})),t.grounded)return;let s=t.velocity>0?i.gravityUp:i.gravityUp*i.fallGravityMultiplier;t.elevation+=t.velocity*e-.5*s*e*e,t.velocity-=s*e,t.elevation<=0&&(t.elevation=0,t.velocity=0,t.grounded=!0,this.pending.push({type:`land`}))}scroll(e,t){for(let i of this.obstacles)i.x+=(i.walkSpeed??0)*t-e;this.obstacles=this.obstacles.filter(i=>i.x+i.kind.width>-200)}spawn(e){for(this.distanceToNextSpawn-=e;this.distanceToNextSpawn<=0;){let t=this.viewWidth+this.cfg.spawn.offscreenMargin+this.distanceToNextSpawn,i=ye(this.speed,this.difficulty,this.rng,this.cfg),s=xe(this.speed,this.difficulty,this.rng,this.cfg),a=r(i.id)?(this.rng()<.5?-1:1)*(10+this.rng()*8):void 0;this.obstacles.push({id:this.nextId++,kind:i,x:t,walkSpeed:a}),this.distanceToNextSpawn+=i.width+s}}puppyBox(){let e=this.cfg.puppy,t=e.x+e.hitOffsetX;return{left:t-e.hitWidth/2,right:t+e.hitWidth/2,bottom:this.puppy.elevation,top:this.puppy.elevation+e.hitHeight}}checkCrash(){let e=this.puppyBox();for(let t of this.obstacles){let i=t.x+t.kind.insetX,s=t.x+t.kind.width-t.kind.insetX,a=t.kind.height-t.kind.insetTop;if(e.right>i&&e.left<s&&e.bottom<a){this.pending.push({type:`crash`,obstacle:t}),this.dispatch(`crash`);return}}}resetRun(){this.elapsed=0,this.distance=0,this.speed=this.cfg.speed.start,this.puppy.elevation=0,this.puppy.velocity=0,this.puppy.grounded=!0,this.obstacles=[],this.jumpBuffer=0,this.lastMilestone=0,this.timeSinceCrash=0,this.distanceToNextSpawn=this.cfg.spawn.firstObstacleDistance}};function A(r,e,t){let i=Math.max(1,r),s=Math.max(1,e),a=i/s,n=Math.min(1280,Math.max(720,540*a)),o=n/a,u=Math.round(o-Math.max(120,o*(a<1?.36:.25))),c=Math.min(2,Math.max(1,t||1)),m=Math.round(i*c);return{width:n,height:o,groundY:u,pixelWidth:m,pixelHeight:Math.round(s*c),zoom:m/n}}async function Re(r,e){let t=Math.max(1,Math.ceil(r.width*e)),i=Math.max(1,Math.ceil(r.height*e)),s=r.svg.replace(`<svg `,`<svg width="${t}" height="${i}" preserveAspectRatio="none" `),a=URL.createObjectURL(new Blob([s],{type:`image/svg+xml`}));try{let n=new Image;await new Promise((u,c)=>{n.onload=()=>u(),n.onerror=()=>c(/* @__PURE__ */ new Error(`Could not rasterize SVG texture`)),n.src=a});let o=document.createElement(`canvas`);o.width=t,o.height=i;let l=o.getContext(`2d`);if(!l)throw new Error(`2D canvas unavailable`);return l.drawImage(n,0,0,t,i),o}finally{URL.revokeObjectURL(a)}}var k=120;var De=-.3;var Ne=5;var Ee=`leap`;var Te=`gallop`;function _e(r){let e=r.getContext(`2d`);if(!e)return r;let t=e.getImageData(0,0,r.width,r.height),i=t.data;for(let s=0;s<i.length;s+=4){let a=.299*i[s]+.587*i[s+1]+.114*i[s+2];i[s]=i[s+1]=i[s+2]=a}return e.putImageData(t,0,0),r}var R=class r$1{constructor(e,t){this.deps=t;this.layout=t.initialLayout,this.renderer=new Mf({antialias:!0,powerPreference:`default`}),this.renderer.setPixelRatio(1),this.renderer.toneMapping=7,this.renderer.setClearColor(new Pe$1(f$1.sky)),e.append(this.renderer.domElement),this.scene.add(new vc(`#ffffff`,`#b8a68e`,1.7));let i=new kr(`#fff6e8`,2.2);i.position.set(.5,1,.9),this.scene.add(i),this.shadow=new $t(new oc(1,32),new Pn({color:f$1.horizon,transparent:!0,opacity:.14,toneMapped:!1})),this.shadow.position.set(p.puppy.x+6,-2,-20),this.scene.add(this.shadow),this.dog.scale.setScalar(k),this.dog.rotation.y=De,this.scene.add(this.dog),this.camera.position.z=1e3}deps;renderer;scene=new tc;camera=new Xi(0,1,1,0,1,2e3);library=new $f;plane=new Nr(1,1);decoRng=q(Date.now()&65535);dog=new Kt;shadow;obstacles=/* @__PURE__ */ new Map;catBodies=/* @__PURE__ */ new Map;clouds=[];actor=null;ground=null;groundTile=512;obstacleMaterials=/* @__PURE__ */ new Map;layout;dogState=null;lastTime=performance.now();crashTimer=0;disposed=!1;static async create(e,t){let i=new r$1(e,t);try{await i.load()}catch(s){throw i.dispose(),s}return i.disposed||(i.applyLayout(i.layout),i.renderer.setAnimationLoop(()=>i.frame())),i}applyLayout(e){this.layout=e;let{width:t,height:i,groundY:s}=e;this.renderer.setSize(e.pixelWidth,e.pixelHeight,!1),this.camera.left=0,this.camera.right=t,this.camera.top=s,this.camera.bottom=s-i,this.camera.updateProjectionMatrix(),this.ground&&(this.ground.mesh.scale.set(t,this.ground.height,1),this.ground.mesh.position.set(t/2,6-this.ground.height/2,-60),this.ground.mesh.material.map.repeat.x=t/this.groundTile);for(let a of this.clouds)a.sprite.mesh.position.y=this.cloudY()}dispose(){if(this.disposed)return;this.disposed=!0,this.renderer.setAnimationLoop(null),this.actor?.dispose();for(let t of this.obstacles.values())t.actor?.dispose();this.obstacles.clear(),this.library.dispose();let e=[this.ground,...this.clouds.map(t=>t.sprite)];for(let t of e)t?.mesh.material.map?.dispose(),t?.mesh.material.dispose();for(let t of this.obstacleMaterials.values())t.map?.dispose(),t.dispose();this.plane.dispose(),this.shadow.geometry.dispose(),this.shadow.material.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove()}async load(){let e=Math.min(3,Math.max(1.5,this.layout.zoom)),t=async d=>{let h=new sc(_e(await Re(d,e)));return h.colorSpace=Et,h.minFilter=Rt,h.generateMipmaps=!1,h},i$1=d=>new Pn({map:d,transparent:!0,toneMapped:!1}),s=I(),a=H$1(),n=p.obstacles.filter(d=>!r(d.id)),[o$1,l$1,u,c,m]=await Promise.all([this.library.body(this.deps.bodyId??`labrador-rodin`),t(s),t(a),Promise.all(n.map(d=>t(N$1(d.id,d.width,d.height)))),Promise.all(i.map(async d=>({id:d.id,body:await this.library.bodyFromInfo(d)})))]);if(this.disposed){for(let d of[l$1,u,...c])d.dispose();return}n.forEach((d,h)=>this.obstacleMaterials.set(d.id,i$1(c[h]))),m.forEach(({id:d,body:h})=>this.catBodies.set(d,h)),l$1.wrapS=_i,this.groundTile=s.width,this.ground={mesh:new $t(this.plane,i$1(l$1)),width:s.width,height:s.height},this.scene.add(this.ground.mesh);for(let d=0;d<Ne;d++){let h=.8+this.decoRng()*.5,f=new $t(this.plane,i$1(u));f.scale.set(a.width*h,a.height*h,1),f.position.z=-200,this.scene.add(f),this.clouds.push({sprite:{mesh:f,width:a.width*h,height:a.height*h},x:this.decoRng()*1400})}this.actor=new Jf(this.library,o$1,{externalRootMotion:[Ee]}),this.actor.object.updateMatrixWorld(!0);let w=this.actor.object.getObjectByName(`Hips`).getWorldPosition(new C),D=this.actor.object.getObjectByName(`Spine3`).getWorldPosition(new C),N=Qy(this.deps.bodyId??`labrador-rodin`),_=N.shoulderHeight,Be=p.obstacles.map(d=>{if(!r(d.id))return d;let h=this.catBodies.get(d.id).instantiate();h.root.updateMatrixWorld(!0);let f=new cn().setFromObject(h.root),z=o(f.max.x-f.min.x),U=o(f.max.y-f.min.y);return h.dispose(),l(k$1({},d),{width:z,height:U,insetX:z*.15,insetTop:U*.15})});this.deps.simulation.configureRunner({shoulderHeight:_,jumpHeight:N.jumpHeight,bodyLength:Math.abs(D.x-w.x)+_*.45,bodyCenter:(w.x+D.x)/2},Be),this.dog.add(this.actor.object)}frame(){let e=performance.now(),t=Math.min(.1,(e-this.lastTime)/1e3);this.lastTime=e;let i=this.deps.simulation,s=i.distance,a=i.step(t),n=Math.max(0,i.distance-s);for(let o of a)o.type===`crash`&&(this.crashTimer=.22),o.type===`restart`&&(this.crashTimer=0);a.length>0&&this.deps.onEvents(a),this.scrollBackground(n,t),this.syncObstacles(i.phase===`paused`?0:t),this.drawDog(t),this.shakeCamera(t),this.renderer.render(this.scene,this.camera),this.deps.onFrame()}cloudY(){let{groundY:e}=this.layout,t=Math.max(70,e-420);return e-(t+this.decoRng()*Math.max(10,e-250-t))}scrollBackground(e,t){this.ground&&(this.ground.mesh.material.map.offset.x+=e/this.groundTile);for(let i of this.clouds)i.x-=e*.1+12*t,i.x<-120&&(i.x=this.layout.width+40+this.decoRng()*300,i.sprite.mesh.position.y=this.cloudY()),i.sprite.mesh.position.x=i.x}syncObstacles(e){let t=/* @__PURE__ */ new Set;for(let i of this.deps.simulation.obstacles){t.add(i.id);let s=this.obstacles.get(i.id);if(!s){if(r(i.kind.id)){let a=new Jf(this.library,this.catBodies.get(i.kind.id));a.object.name=i.kind.id,a.object.traverse(u=>{if(u instanceof $t)for(let c of[u.material].flat())c.onBeforeCompile=m=>{m.fragmentShader=m.fragmentShader.replace(`#include <colorspace_fragment>`,`#include <colorspace_fragment>
 gl_FragColor.rgb = vec3(dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114)));`)},c.customProgramCacheKey=()=>`run-cat-grayscale`,c.needsUpdate=!0}),a.play(`walk`,{fade:0}),a.update(0);let n=new cn().setFromObject(a.object),o=new Kt;o.scale.setScalar(k),a.object.position.x=-(n.min.x+n.max.x)/2,o.add(a.object),o.rotation.y=(i.walkSpeed??-1)<0?Math.PI:0;let l=a.speedOf(`walk`)*k;a.timeScale=l>0?Math.abs(i.walkSpeed??14)/l:.4,s={object:o,actor:a}}else{let a=new $t(this.plane,this.obstacleMaterials.get(i.kind.id));a.scale.set(i.kind.width,i.kind.height,1),s={object:a}}this.scene.add(s.object),this.obstacles.set(i.id,s)}s.actor?.update(e),s.object.position.set(i.x+i.kind.width/2,s.actor?0:i.kind.height/2-3,-40)}for(let[i,s]of this.obstacles)t.has(i)||(s.actor?.dispose(),s.object.removeFromParent(),this.obstacles.delete(i))}drawDog(e){let t=this.deps.simulation,i=this.actor;if(!i)return;let{puppy:s}=t,a;if(t.phase===`ready`?a=`idle`:t.phase===`gameOver`?a=s.grounded&&t.speed===0?`sit`:`slide`:a=s.grounded?`run`:`jump`,a!==this.dogState&&(a===`jump`?i.pose([{name:Ee,time:0,weight:1}]):i.play(a===`run`?Te:a,{fade:a===`run`?.08:.2}),this.dogState=a),a===`jump`)i.timeScale=0;else if(a===`run`){let l=i.speedOf(Te)*k;i.timeScale=l>0?t.speed/l:1}else i.timeScale=1;t.phase!==`paused`&&a!==`jump`&&i.update(e);let n=t.config;this.dog.position.set(n.puppy.x,s.elevation,0);let o=Math.max(.35,1-s.elevation/(n.physics.jumpHeight*1.75));this.shadow.scale.set(n.puppy.hitWidth*.6*o,Math.max(2,n.puppy.hitHeight*.08)*o,1),this.shadow.material.opacity=.16*o+.04}shakeCamera(e){this.crashTimer=Math.max(0,this.crashTimer-e);let t=this.crashTimer>0?5*(this.crashTimer/.22):0;this.camera.position.x=t*Math.sin(this.crashTimer*90),this.camera.position.y=t*Math.cos(this.crashTimer*70)}};var Ce=`
.dr-root {
  --ink: #3b2a20; --cream: #fffaf0; --orange: #ff8a3d; --teal: #2ec4b6;
  --safe-t: max(10px, env(safe-area-inset-top)); --safe-r: max(10px, env(safe-area-inset-right));
  --safe-b: max(10px, env(safe-area-inset-bottom)); --safe-l: max(10px, env(safe-area-inset-left));
  position: absolute; inset: 0; overflow: hidden; background: #f7f7f7; color: var(--ink);
  touch-action: none; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent; overscroll-behavior: none;
  font-family: ui-rounded, "Nunito", "Segoe UI Rounded", "Segoe UI", system-ui, sans-serif;
}
.dr-stage, .dr-stage canvas { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block; }
.dr-hud { position: absolute; inset: 0; pointer-events: none; padding: var(--safe-t) var(--safe-r) var(--safe-b) var(--safe-l); }
.dr-root button { pointer-events: auto; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.dr-root button:focus-visible { outline: 3px solid #1f6feb; outline-offset: 3px; }
.dr-top { display: flex; align-items: center; gap: 8px; }
.dr-icon-btn {
  width: 46px; height: 46px; border-radius: 14px; border: 3px solid var(--ink); background: var(--cream);
  box-shadow: 0 4px 0 var(--ink); display: grid; place-items: center; padding: 0; transition: transform .06s;
}
.dr-icon-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--ink); }
.dr-icon-btn svg { width: 24px; height: 24px; }
.dr-icon-btn[hidden] { display: none; }
.dr-scores {
  margin-left: auto; display: flex; align-items: center; gap: 10px; padding: 4px 12px; min-height: 40px;
  background: rgba(255, 250, 240, .9); border: 3px solid var(--ink); border-radius: 14px;
  font-weight: 800; font-variant-numeric: tabular-nums; box-shadow: 0 4px 0 rgba(59, 42, 32, .25);
}
.dr-speedometer {
  --needle-angle: 0deg;
  position: absolute; right: var(--safe-r); top: calc(var(--safe-t) + 60px);
  width: 150px; padding: 3px 3px 6px; box-sizing: border-box;
  background: rgba(255, 250, 240, .96); border: 3px solid var(--ink); border-radius: 20px;
  box-shadow: 0 4px 0 rgba(59, 42, 32, .25); font-variant-numeric: tabular-nums;
}
.dr-speed-dial { display: block; width: 100%; overflow: visible; }
.dr-speed-track, .dr-speed-fast { fill: none; stroke: #e4d8c8; stroke-width: 5; stroke-linecap: round; }
.dr-speed-fast { stroke: var(--orange); }
.dr-speed-ticks line { stroke: var(--ink); stroke-width: 1.5; }
.dr-speed-ticks text { fill: var(--ink); text-anchor: middle; dominant-baseline: middle; font-size: 9px; font-weight: 800; }
.dr-speed-needle { transform-origin: 70px 68px; transform: rotate(var(--needle-angle)); transition: transform .12s linear; }
.dr-speed-needle path { fill: #e96628; }
.dr-speed-needle circle { fill: var(--ink); }
.dr-speed-readout { display: flex; justify-content: center; align-items: baseline; gap: 4px; margin-top: -3px; }
.dr-speed-value { min-width: 3ch; text-align: right; font-size: 20px; font-weight: 900; }
.dr-speed-unit { font-size: 11px; font-weight: 700; }
.dr-score { font-size: 22px; letter-spacing: .5px; }
.dr-score.dr-flash { animation: dr-flash .5s; }
.dr-best { font-size: 13px; opacity: .7; }
.dr-treats { display: flex; align-items: center; gap: 4px; font-size: 16px; }
.dr-treats svg { width: 26px; height: 15px; }
.dr-panel-wrap {
  position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none;
  padding: calc(var(--safe-t) + 56px) var(--safe-r) var(--safe-b) var(--safe-l);
}
.dr-panel {
  pointer-events: auto; width: min(100%, 380px); max-height: 100%; overflow: auto; box-sizing: border-box;
  background: var(--cream); border: 4px solid var(--ink); border-radius: 24px; box-shadow: 0 8px 0 var(--ink);
  padding: 18px 20px 20px; text-align: center; animation: dr-pop .22s ease-out;
}
.dr-panel[hidden] { display: none; }
.dr-root .dr-dog-picker {
  width: min(880px, calc(100% - 28px)); max-height: calc(100% - 28px);
  padding: 20px; touch-action: pan-y; overscroll-behavior: contain;
}
.dr-dog-picker::backdrop { background: rgba(39, 29, 24, .65); }
.dr-dog-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 14px; margin: 18px 0; }
.dr-root .dr-dog-card { border: 2px solid #ead9c2; border-radius: 18px; padding: 8px; background: #fff; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.dr-dog-card:hover { border-color: var(--orange); background: #fff1df; }
.dr-dog-card:active { transform: scale(.97); }
.dr-dog-portrait { display: block; width: 100%; aspect-ratio: 1; overflow: hidden; border-radius: 14px; background: #fff; position: relative; }
.dr-dog-portrait img { position: absolute; width: 250%; max-width: none; height: auto; right: -4%; top: 0; }
.dr-dog-tag { font-weight: 800; font-size: 14px; line-height: 1.25; padding: 5px 10px; border-radius: 10px; background: #fff0d8; }
.dr-picker-exit { margin-bottom: 5px; }
.dr-panel h2 { margin: 0 0 4px; font-size: 30px; font-weight: 900; color: var(--orange); letter-spacing: .5px; }
.dr-panel p { margin: 4px 0 12px; font-size: 16px; line-height: 1.35; }
.dr-tips { list-style: none; margin: 8px 0 14px; padding: 0; display: grid; gap: 8px; text-align: left; font-size: 15px; }
.dr-tips li { display: flex; align-items: center; gap: 10px; background: #fff; border: 2px solid #ead9c2; border-radius: 12px; padding: 7px 10px; }
.dr-tips .dr-ico { flex: none; width: 30px; text-align: center; font-size: 20px; }
.dr-key { display: inline-block; padding: 0 6px; border: 2px solid var(--ink); border-bottom-width: 4px; border-radius: 6px; font-size: 12px; font-weight: 800; background: #fff; }
.dr-actions { display: grid; gap: 10px; }
.dr-btn {
  min-height: 50px; border-radius: 16px; border: 3px solid var(--ink); box-shadow: 0 5px 0 var(--ink);
  background: #fff; font-size: 18px; font-weight: 800; padding: 10px 18px; transition: transform .06s;
}
.dr-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 var(--ink); }
.dr-btn:disabled { opacity: .55; cursor: default; }
.dr-btn-primary { background: var(--orange); color: #fff !important; text-shadow: 0 2px 0 rgba(59, 42, 32, .35); }
.dr-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 10px 0 14px; }
.dr-stat { background: #fff; border: 2px solid #ead9c2; border-radius: 12px; padding: 6px 4px; }
.dr-stat b { display: block; font-size: 22px; font-variant-numeric: tabular-nums; }
.dr-stat span { font-size: 12px; opacity: .7; text-transform: uppercase; letter-spacing: .6px; }
.dr-badge { display: inline-block; background: #ffd23f; border: 3px solid var(--ink); border-radius: 999px; padding: 2px 12px; font-weight: 900; transform: rotate(-3deg); animation: dr-wiggle 1s ease-in-out infinite; }
.dr-badge[hidden] { display: none; }
.dr-hint {
  position: absolute; left: 50%; bottom: calc(var(--safe-b) + 18px); transform: translateX(-50%);
  background: rgba(59, 42, 32, .75); color: #fff; border-radius: 999px; padding: 6px 14px; font-weight: 700; font-size: 14px;
  white-space: nowrap; opacity: 0; transition: opacity .4s; pointer-events: none;
}
.dr-root[data-phase="running"] .dr-hint.dr-show { opacity: 1; }
.dr-root .dr-jump {
  position: absolute; right: calc(var(--safe-r) + 10px); bottom: calc(var(--safe-b) + 10px);
  width: 86px; height: 86px; border-radius: 50%; border: 4px solid var(--ink); background: var(--teal);
  box-shadow: 0 6px 0 var(--ink); color: #fff; font-weight: 900; font-size: 15px; display: none;
  place-items: center; touch-action: none;
}
.dr-jump:active { transform: translateY(4px); box-shadow: 0 2px 0 var(--ink); }
@media (pointer: coarse) { .dr-root[data-phase="running"] .dr-jump { display: grid; } }
.dr-spinner { width: 46px; height: 46px; margin: 8px auto; border-radius: 50%; border: 5px solid #ead9c2; border-top-color: var(--orange); animation: dr-spin .8s linear infinite; }
@keyframes dr-pop { from { transform: scale(.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes dr-flash { 0%, 100% { transform: scale(1); } 40% { transform: scale(1.25); color: var(--orange); } }
@keyframes dr-wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg) scale(1.05); } }
@keyframes dr-spin { to { transform: rotate(360deg); } }
@media (max-height: 430px) {
  .dr-panel { padding: 12px 16px 14px; }
  .dr-panel h2 { font-size: 24px; }
  .dr-tips { grid-template-columns: 1fr 1fr; font-size: 13px; }
  .dr-actions { grid-auto-flow: column; }
}
@media (prefers-reduced-motion: reduce) { .dr-root * { animation: none !important; transition: none !important; } }
/* Hebrew: panels and hints read right to left; the rest of the HUD keeps its layout, even
   when the app around the game is laid out right to left. */
.dr-root { direction: ltr; }
.dr-root[data-dir="rtl"] :is(.dr-panel, .dr-hint) { direction: rtl; }
/* Left-handed players get the jump button under their left thumb. */
.dr-root[data-hand="left"] .dr-jump { right: auto; left: calc(var(--safe-l) + 10px); }
`;var v={back:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`,pause:`<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1.5"/><rect x="14" y="4" width="5" height="16" rx="1.5"/></svg>`,play:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>`,soundOn:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>`,soundOff:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/></svg>`};var ze=30;var Ue=Array.from({length:13},(r,e)=>{let t=Math.PI+e/12*Math.PI,i=e%2===0,s=m=>[70+Math.cos(t)*m,68+Math.sin(t)*m],[a,n]=s(i?43:47),[o,l]=s(51),[u,c]=s(33);return`<line x1="`+a+`" y1="`+n+`" x2="`+o+`" y2="`+l+`"/>`+(i?`<text x="`+u+`" y="`+c+`">`+e*2.5+`</text>`:``)}).join(``);function $e(r){let e=r.tipsHtml.map(([t,i])=>`<li><span class="dr-ico">${t}</span><span>${i}</span></li>`).join(``);return`
<div class="dr-hud">
  <div class="dr-top">
    <button type="button" class="dr-icon-btn" data-action="exit" aria-label="${r.exit}" title="${r.exit}">${v.back}</button>
    <button type="button" class="dr-icon-btn" data-action="mute" data-ref="mute"></button>
    <div class="dr-scores" aria-live="off">
      <span class="dr-best">${r.hi} <span data-ref="best">00000</span></span>
      <span class="dr-score" data-ref="score">00000</span>
    </div>
    <button type="button" class="dr-icon-btn" data-action="pause" data-ref="pauseBtn" aria-label="${r.pause}" title="${r.pauseKey}">${v.pause}</button>
  </div>
  <div class="dr-speedometer" role="meter" aria-label="${r.speedometer}" aria-valuemin="0" aria-valuemax="${p.speed.max/120*3.6}" aria-valuenow="0" data-ref="speedometer">
    <svg class="dr-speed-dial" viewBox="0 0 140 78" aria-hidden="true">
      <path class="dr-speed-track" d="M16 68 A54 54 0 0 1 124 68"/>
      <path class="dr-speed-fast" d="M97 21.2 A54 54 0 0 1 124 68"/>
      <g class="dr-speed-ticks">${Ue}</g>
      <g class="dr-speed-needle"><path d="M23 68 L70 65 L75 68 L70 71 Z"/><circle cx="70" cy="68" r="5"/></g>
    </svg>
    <div class="dr-speed-readout"><span class="dr-speed-value" data-ref="speed">0.0</span><span class="dr-speed-unit">${r.kmh}</span></div>
  </div>
  <div class="dr-hint" data-ref="hint"></div>
  <button type="button" class="dr-jump" data-jump aria-label="${r.jump}">${r.jumpButton}</button>
</div>
<div class="dr-panel-wrap">
  <section class="dr-panel" data-panel="loading" role="status">
    <h2>${r.name}</h2><div class="dr-spinner"></div><p data-ref="loadingText"></p>
  </section>
  <section class="dr-panel" data-panel="ready" hidden>
    <h2>${r.name}</h2>
    <p><b data-ref="readyText"></b></p>
    <ul class="dr-tips" data-ref="tips">${e}</ul>
    <div class="dr-actions">
      <button type="button" class="dr-btn dr-btn-primary" data-action="start">${r.start}</button>
    </div>
  </section>
  <section class="dr-panel" data-panel="paused" hidden>
    <h2>${r.paused}</h2>
    <p data-ref="pausedText"></p>
    <div class="dr-actions">
      <button type="button" class="dr-btn dr-btn-primary" data-action="resume">${r.resume}</button>
      <button type="button" class="dr-btn" data-action="restart">${r.restart}</button>
      <button type="button" class="dr-btn" data-action="exit">${r.exit}</button>
    </div>
  </section>
  <section class="dr-panel" data-panel="gameOver" hidden>
    <h2>${r.gameOver}</h2>
    <span class="dr-badge" data-ref="newBest" hidden>${r.newBest}</span>
    <div class="dr-stats">
      <div class="dr-stat"><b data-ref="finalScore">0</b><span>${r.score}</span></div>
      <div class="dr-stat"><b data-ref="finalBest">0</b><span>${r.best}</span></div>
    </div>
    <div class="dr-actions">
      <button type="button" class="dr-btn dr-btn-primary" data-action="restart" data-ref="restartBtn">${r.playAgain}</button>
      <button type="button" class="dr-btn" data-action="exit">${r.exit}</button>
    </div>
  </section>
  <section class="dr-panel" data-panel="error" role="alert" hidden>
    <h2>${r.errorTitle}</h2>
    <p data-ref="errorText">${r.loadError}</p>
    <div class="dr-actions"><button type="button" class="dr-btn dr-btn-primary" data-action="exit">${r.exit}</button></div>
  </section>
</div>`}var Oe=r=>String(Math.max(0,Math.floor(r))).padStart(5,`0`);var T=class{constructor(e,t,i){this.root=e;this.onAction=i;let s=document.createElement(`style`);s.textContent=Ce,e.append(s);let a=document.createElement(`div`);this.S=t.strings,a.innerHTML=$e(t.strings),e.append(...Array.from(a.children)),e.querySelectorAll(`[data-ref]`).forEach(n=>this.refs.set(n.dataset.ref??``,n)),e.querySelectorAll(`[data-panel]`).forEach(n=>this.panels.set(n.dataset.panel??``,n)),this.setDogName(t.dogName),this.ref(`tips`).hidden=!t.showTutorial,this.setBest(t.highScore),this.setMuted(t.muted),e.addEventListener(`click`,this.handleClick)}root;onAction;refs=/* @__PURE__ */ new Map;panels=/* @__PURE__ */ new Map;lastScore=-1;lastSpeed=``;restartEnabled=!0;hintTimer;S;showPanel(e){this.root.dataset.phase=e;for(let[a,n]of this.panels)n.hidden=a!==e||e===`running`;let t=this.ref(`pauseBtn`);t.hidden=e!==`running`&&e!==`paused`;let i=e===`paused`;t.innerHTML=i?v.play:v.pause,t.setAttribute(`aria-label`,i?this.S.resume:this.S.pause),this.panels.get(e)?.querySelector(`.dr-btn-primary`)?.focus({preventScroll:!0}),e===`running`&&document.activeElement?.blur?.()}hideTutorial(){this.ref(`tips`).hidden=!0}setDogName(e){this.ref(`loadingText`).textContent=this.S.loading(e),this.ref(`readyText`).textContent=this.S.ready(e),this.ref(`pausedText`).textContent=this.S.pausedText(e)}showHint(e,t=2600){let i=this.ref(`hint`);i.textContent=e,i.classList.add(`dr-show`),clearTimeout(this.hintTimer),this.hintTimer=setTimeout(()=>i.classList.remove(`dr-show`),t)}update(e,t){let i=(Math.max(0,t)/120*3.6).toFixed(1);i!==this.lastSpeed&&(this.lastSpeed=i,this.ref(`speed`).textContent=i,this.ref(`speedometer`).setAttribute(`aria-valuenow`,i),this.ref(`speedometer`).style.setProperty(`--needle-angle`,`${Math.min(1,Number(i)/ze)*180}deg`)),e!==this.lastScore&&(this.lastScore=e,this.ref(`score`).textContent=Oe(e))}setBest(e){this.ref(`best`).textContent=Oe(e)}setMuted(e){let t=this.ref(`mute`);t.innerHTML=e?v.soundOff:v.soundOn,t.setAttribute(`aria-label`,e?this.S.soundOn:this.S.soundOff),t.title=e?this.S.soundOn:this.S.soundOff,t.setAttribute(`aria-pressed`,String(e))}setRestartEnabled(e){e!==this.restartEnabled&&(this.restartEnabled=e,this.ref(`restartBtn`).disabled=!e,e&&this.root.dataset.phase===`gameOver`&&this.ref(`restartBtn`).focus({preventScroll:!0}))}flashScore(){let e=this.ref(`score`);e.classList.remove(`dr-flash`),e.offsetWidth,e.classList.add(`dr-flash`)}showGameOver(e){this.ref(`finalScore`).textContent=String(e.score),this.ref(`finalBest`).textContent=String(e.best),this.ref(`newBest`).hidden=!e.isNewBest,this.setBest(e.best),this.showPanel(`gameOver`)}showError(e){this.ref(`errorText`).textContent=e,this.showPanel(`error`)}destroy(){clearTimeout(this.hintTimer),this.root.removeEventListener(`click`,this.handleClick)}handleClick=e=>{let t=e.target?.closest(`button[data-action]`);if(!t||t.disabled)return;let i=t.dataset.action;t.blur(),this.onAction(i)};ref(e){let t=this.refs.get(e);if(!t)throw new Error(`HUD element "${e}" missing`);return t}};var Le=`tutorialSeen`;var Pe=`muted`;var Ge=/* @__PURE__ */ new Set([`Space`,`ArrowUp`,`KeyW`]);var Fe=/* @__PURE__ */ new Set([`Escape`,`KeyP`]);var H=class{constructor(e,t){this.host=e;this.context=t;this.best=t.highScore,this.S=R$1[t.settings.language],this.tutorialSeen=t.storage.get(Le)===!0;let i=t.storage.get(Pe)===!0;this.sfx=new b(ve,i),this.root.className=`dr-root`,N(this.root,t.settings.language),this.root.dataset.hand=t.settings.hand,this.stage.className=`dr-stage`,this.root.append(this.stage),e.append(this.root),this.hud=new T(this.root,{dogName:t.dog.name,highScore:this.best,muted:i,showTutorial:!this.tutorialSeen,strings:this.S},s=>this.handleHudAction(s)),this.hud.showPanel(`loading`),this.bindInput()}host;context;root=document.createElement(`div`);stage=document.createElement(`div`);simulation=new M(q(Date.now()>>>0));hud;sfx;cleanups=[];view=null;picker=null;best;destroyed=!1;tutorialSeen;S;async start(){this.picker=new f(this.root,e=>{this.picker=null,this.hud.setDogName(jy(e,this.context.settings.language)),this.loadRunner(e.id).catch(t=>{this.destroyed||this.hud.showError(this.S.loadError),console.error(`[Retro] failed to load runner`,t)})},()=>this.context.exit(),{title:this.S.pickerTitle,prefix:`dr`,language:this.context.settings.language})}async loadRunner(e){let t=this.root.getBoundingClientRect(),i=A(t.width,t.height,window.devicePixelRatio);this.simulation.setViewWidth(i.width);let s=await R.create(this.stage,{bodyId:e,simulation:this.simulation,initialLayout:i,onEvents:a=>this.handleSimEvents(a),onFrame:()=>this.handleFrame()});if(this.destroyed){s.dispose();return}this.view=s,this.observeResize(),this.hud.showPanel(`ready`),this.exposeForDevTesting()}exposeForDevTesting(){}pause(){this.simulation.dispatch(`pause`)&&this.hud.showPanel(`paused`)}destroy(){if(!this.destroyed){this.destroyed=!0;for(let e of this.cleanups.splice(0))e();this.hud.destroy(),this.picker?.destroy(),this.picker=null,this.sfx.close(),this.view?.dispose(),this.view=null,this.root.remove()}}listen(e,t,i,s){let a=i;e.addEventListener(t,a,s),this.cleanups.push(()=>e.removeEventListener(t,a,s))}bindInput(){this.listen(window,`keydown`,e=>{this.picker||(Ge.has(e.code)?(e.preventDefault(),e.repeat||this.primaryAction()):Fe.has(e.code)?(e.preventDefault(),this.togglePause()):e.code===`Enter`&&this.simulation.phase===`gameOver`&&!(e.target instanceof HTMLButtonElement)&&this.primaryAction())}),this.listen(this.root,`pointerdown`,e=>{let t=e.target;if(t?.closest(`[data-jump]`)){e.preventDefault(),this.primaryAction();return}if(t?.closest(`button`)){this.sfx.unlock();return}t?.closest(`.dr-panel`)&&this.simulation.phase!==`ready`||e.button===0&&(e.preventDefault(),this.primaryAction())},{passive:!1});for(let e of[`touchstart`,`touchmove`,`gesturestart`,`dblclick`,`contextmenu`])this.listen(this.root,e,t=>{t.target instanceof Element&&t.target.closest(`.dr-panel, button`)||t.preventDefault()},{passive:!1});this.listen(document,`visibilitychange`,()=>{document.hidden&&this.pause()}),this.listen(window,`blur`,()=>this.pause()),this.listen(window,`pagehide`,()=>this.pause())}observeResize(){let e=0,t=new ResizeObserver(()=>{cancelAnimationFrame(e),e=requestAnimationFrame(()=>this.applyLayout())});t.observe(this.root),this.cleanups.push(()=>{cancelAnimationFrame(e),t.disconnect()})}applyLayout(){if(!this.view)return;let e=this.root.getBoundingClientRect();if(e.width<2||e.height<2)return;let t=A(e.width,e.height,window.devicePixelRatio);this.simulation.setViewWidth(t.width),this.view.applyLayout(t)}primaryAction(){this.view&&(this.sfx.unlock(),this.simulation.pressJump())}togglePause(){this.simulation.phase===`paused`?this.resume():this.pause()}resume(){this.simulation.dispatch(`resume`)&&this.hud.showPanel(`running`)}handleHudAction(e){switch(this.sfx.unlock(),this.sfx.play(`click`),e){case`start`:this.primaryAction();break;case`pause`:this.togglePause();break;case`resume`:this.resume();break;case`restart`:this.simulation.dispatch(`restart`);break;case`mute`:this.sfx.muted=!this.sfx.muted,this.sfx.muted||this.sfx.unlock(),this.context.storage.set(Pe,this.sfx.muted),this.hud.setMuted(this.sfx.muted);break;case`exit`:this.context.exit()}}handleFrame(){this.hud.update(this.simulation.score,this.simulation.phase===`ready`?0:this.simulation.speed),this.simulation.phase===`gameOver`&&this.hud.setRestartEnabled(this.simulation.canRestart)}handleSimEvents(e){for(let t of e)switch(t.type){case`jump`:this.sfx.play(`jump`);break;case`land`:this.sfx.play(`land`);break;case`milestone`:this.sfx.play(`milestone`),this.hud.flashScore();break;case`crash`:this.sfx.play(`crash`);break;case`phase`:this.onPhase(t.phase)}}onPhase(e){e===`running`?(this.hud.showPanel(`running`),this.tutorialSeen||(this.tutorialSeen=!0,this.context.storage.set(Le,!0),this.hud.hideTutorial(),this.hud.showHint(window.matchMedia(`(pointer: coarse)`).matches?this.S.hintTouch:this.S.hintKeys))):e===`gameOver`?this.finishRun():e===`paused`&&this.hud.showPanel(`paused`)}finishRun(){let e=this.simulation,t={gameId:p.gameId,dogId:this.context.dog.id,score:e.score,durationMs:Math.round(e.elapsed*1e3),treatsCollected:0,timestamp:(/* @__PURE__ */ new Date()).toISOString()},i=t.score>this.best;this.best=Math.max(this.best,t.score),this.hud.setRestartEnabled(!1),this.hud.showGameOver({score:t.score,best:this.best,isNewBest:i});try{this.context.reportResult(t)}catch(s){console.error(`[Retro] reportResult failed`,s)}}};var Qt={async mount(r,e){let t=new H(r,e);try{await t.start()}catch(i){throw console.error(`[Retro] failed to start`,i),t.destroy(),i}return t}};export{Qt as dogizRunModule};