import{n as m,r as n,t as a}from"./chunk-ByDcM7QR.js";import{n as v$1,r as y$1,t as g}from"./chunk-DRKis50o.js";import{$ as u,J as L,Q as o,X as S$1,Y as O,Z as f,et as v$2}from"./main-DJ7Y7XMY.js";import{n as s,t as a$1}from"./chunk-DhzWcZno.js";import{B as fx,C as L$1,F as Zd,L as di,M as Sl,N as Te$1,P as Vt,Q as vr,R as en,T as Md,W as mx,et as wl,it as yt,k as Nl,nt as xt,o as Bi,r as Al,t as $d,tt as wn,y as Ht,z as fr}from"./chunk-BKcTmync.js";import{n as l,t as k}from"./chunk-DJVAsKa_.js";var fe={jump:[{from:420,to:820,duration:.14,type:`square`,volume:.06}],land:[{from:160,to:90,duration:.07,type:`triangle`,volume:.08}],treat:[{from:880,to:880,duration:.07,type:`square`,volume:.05},{from:1320,to:1320,duration:.11,type:`square`,volume:.05,delay:.06}],crash:[{from:300,to:60,duration:.35,type:`sawtooth`,volume:.08},{from:520,to:180,duration:.18,type:`square`,volume:.04}],milestone:[{from:660,to:660,duration:.08,type:`triangle`,volume:.08},{from:990,to:990,duration:.14,type:`triangle`,volume:.08,delay:.08}],click:[{from:600,to:500,duration:.05,type:`triangle`,volume:.06}]};function y(a){return{width:a.width-2*a.insetX,height:a.height-a.insetTop}}function Oe(a,e,t=f){let i=y(a);return i.height>=t.physics.jumpHeight?!1:(i.width+t.puppy.hitWidth)/e<=m(t.physics,i.height)*t.spawn.clearanceSafety}function Le(a$2,e=f){return a$2*1.03*(a(e.physics)+e.spawn.reactionSeconds)}function ge(a,e,t,i=f){let s=i.spawn.gapSpreadStart+(i.spawn.gapSpreadEnd-i.spawn.gapSpreadStart)*e;return Le(a,f)*(1+t()*s)}function Be(a,e,t=f){let i=t.obstacles.filter(r=>r.minDifficulty<=e&&Oe(r,a,f));return i.length>0?i:[[...t.obstacles].sort((r,o)=>y(r).width+y(r).height-(y(o).width+y(o).height))[0]]}function be(a,e,t,i=f){let s=Be(a,e,i),r=s.reduce((n,l)=>n+l.weight,0),o=t()*r;for(let n of s)if(o-=n.weight,o<0)return n;return s[s.length-1]}var De={ready:{start:`running`},running:{pause:`paused`,crash:`gameOver`,restart:`running`},paused:{resume:`running`,restart:`running`},gameOver:{restart:`running`}};function ve(a,e){return De[a][e]??null}function xe(a,e=f.scoring){return Math.floor(Math.max(0,a)*e.pointsPerSecond)}function ye(a,e=f.speed){return Math.min(e.max,e.start+e.acceleration*Math.max(0,a))}function we(a,e=f.speed){let t=(a-e.start)/(e.max-e.start);return Math.min(1,Math.max(0,t))}var S=class{constructor(e,t=f){this.rng=e;this.cfg=t;this.speed=t.speed.start,this.resetRun()}rng;cfg;phase=`ready`;elapsed=0;distance=0;speed;puppy={elevation:0,velocity:0,grounded:!0};obstacles=[];timeSinceCrash=0;distanceToNextSpawn=0;jumpBuffer=0;nextId=1;lastMilestone=0;viewWidth=960;pending=[];get score(){return xe(this.elapsed,this.cfg.scoring)}get config(){return this.cfg}configureRunner(e,t=f.obstacles){if(this.phase!==`ready`)throw new Error(`Runner size must be configured before starting`);this.cfg=L(e,t)}get difficulty(){return we(this.speed,this.cfg.speed)}get canRestart(){return this.phase!==`gameOver`||this.timeSinceCrash>=this.cfg.restartLockSeconds&&this.puppy.grounded&&this.speed===0}setViewWidth(e){this.viewWidth=Math.max(e,this.cfg.puppy.x*2)}dispatch(e){let t=ve(this.phase,e);if(t===null)return!1;if(e===`restart`){if(!this.canRestart)return!1;this.resetRun(),this.pending.push({type:`restart`})}return e===`crash`&&(this.timeSinceCrash=0,this.jumpBuffer=0,this.puppy.velocity=Math.min(0,this.puppy.velocity)),this.phase=t,this.pending.push({type:`phase`,phase:t}),!0}pressJump(){switch(this.phase){case`ready`:this.dispatch(`start`),this.jumpBuffer=this.cfg.physics.jumpBufferSeconds;break;case`running`:this.jumpBuffer=this.cfg.physics.jumpBufferSeconds;break;case`gameOver`:this.dispatch(`restart`)}}step(e){let t=Math.min(Math.max(e,0),this.cfg.maxStepSeconds);return this.phase===`gameOver`&&(this.timeSinceCrash+=t,this.advanceCrash(t)),this.phase===`running`&&t>0&&this.advance(t),this.pending.splice(0,this.pending.length)}advanceCrash(e){let t=this.puppy.grounded;this.updatePuppy(e);let i=this.speed;t&&(this.speed=Math.max(0,this.speed-o(9)*e));let s=(i+this.speed)*.5*e;this.distance+=s,this.scroll(s,e)}advance(e){this.elapsed+=e,this.speed=ye(this.elapsed,this.cfg.speed);let t=this.speed*e;this.distance+=t,this.updatePuppy(e),this.scroll(t,e),this.spawn(t),this.checkCrash();let i=Math.floor(this.score/this.cfg.scoring.milestoneEvery);i>this.lastMilestone&&(this.lastMilestone=i,this.pending.push({type:`milestone`,score:i*this.cfg.scoring.milestoneEvery}))}updatePuppy(e){let t=this.puppy,i=this.cfg.physics;if(this.jumpBuffer=Math.max(0,this.jumpBuffer-e),t.grounded&&this.jumpBuffer>0&&(t.velocity=n(i),t.grounded=!1,this.jumpBuffer=0,this.pending.push({type:`jump`})),t.grounded)return;let s=t.velocity>0?i.gravityUp:i.gravityUp*i.fallGravityMultiplier;t.elevation+=t.velocity*e-.5*s*e*e,t.velocity-=s*e,t.elevation<=0&&(t.elevation=0,t.velocity=0,t.grounded=!0,this.pending.push({type:`land`}))}scroll(e,t){for(let i of this.obstacles)i.x+=(i.walkSpeed??0)*t-e;this.obstacles=this.obstacles.filter(i=>i.x+i.kind.width>-200)}spawn(e){for(this.distanceToNextSpawn-=e;this.distanceToNextSpawn<=0;){let t=this.viewWidth+this.cfg.spawn.offscreenMargin+this.distanceToNextSpawn,i=be(this.speed,this.difficulty,this.rng,this.cfg),s=ge(this.speed,this.difficulty,this.rng,this.cfg),r=a$1(i.id)?(this.rng()<.5?-1:1)*(10+this.rng()*8):void 0;this.obstacles.push({id:this.nextId++,kind:i,x:t,walkSpeed:r}),this.distanceToNextSpawn+=i.width+s}}puppyBox(){let e=this.cfg.puppy,t=e.x+e.hitOffsetX;return{left:t-e.hitWidth/2,right:t+e.hitWidth/2,bottom:this.puppy.elevation,top:this.puppy.elevation+e.hitHeight}}checkCrash(){let e=this.puppyBox();for(let t of this.obstacles){let i=t.x+t.kind.insetX,s=t.x+t.kind.width-t.kind.insetX,r=t.kind.height-t.kind.insetTop;if(e.right>i&&e.left<s&&e.bottom<r){this.pending.push({type:`crash`,obstacle:t}),this.dispatch(`crash`);return}}}resetRun(){this.elapsed=0,this.distance=0,this.speed=this.cfg.speed.start,this.puppy.elevation=0,this.puppy.velocity=0,this.puppy.grounded=!0,this.obstacles=[],this.jumpBuffer=0,this.lastMilestone=0,this.timeSinceCrash=0,this.distanceToNextSpawn=this.cfg.spawn.firstObstacleDistance}};function I(a,e,t){let i=Math.max(1,a),s=Math.max(1,e),r=i/s,o=Math.min(1280,Math.max(720,540*r)),n=o/r,u=Math.round(n-Math.max(120,n*(r<1?.36:.25))),c=Math.min(2,Math.max(1,t||1)),m=Math.round(i*c);return{width:o,height:n,groundY:u,pixelWidth:m,pixelHeight:Math.round(s*c),zoom:m/o}}async function ke(a,e){let t=Math.max(1,Math.ceil(a.width*e)),i=Math.max(1,Math.ceil(a.height*e)),s=a.svg.replace(`<svg `,`<svg width="${t}" height="${i}" preserveAspectRatio="none" `),r=URL.createObjectURL(new Blob([s],{type:`image/svg+xml`}));try{let o=new Image;await new Promise((u,c)=>{o.onload=()=>u(),o.onerror=()=>c(/* @__PURE__ */ new Error(`Could not rasterize SVG texture`)),o.src=r});let n=document.createElement(`canvas`);n.width=t,n.height=i;let l=n.getContext(`2d`);if(!l)throw new Error(`2D canvas unavailable`);return l.drawImage(o,0,0,t,i),n}finally{URL.revokeObjectURL(r)}}var M=120;var Ne=-.3;var Ie=5;var Se=`leap`;var Me=`gallop`;function je(a){let e=a.getContext(`2d`);if(!e)return a;let t=e.getImageData(0,0,a.width,a.height),i=t.data;for(let s=0;s<i.length;s+=4){let r=.299*i[s]+.587*i[s+1]+.114*i[s+2];i[s]=i[s+1]=i[s+2]=r}return e.putImageData(t,0,0),a}var R=class a{constructor(e,t){this.deps=t;this.layout=t.initialLayout,this.renderer=new Md({antialias:!0,powerPreference:`default`}),this.renderer.setPixelRatio(1),this.renderer.toneMapping=7,this.renderer.setClearColor(new Te$1(u.sky)),e.append(this.renderer.domElement),this.scene.add(new Nl(`#ffffff`,`#b8a68e`,1.7));let i=new vr(`#fff6e8`,2.2);i.position.set(.5,1,.9),this.scene.add(i),this.shadow=new Vt(new wl(1,32),new wn({color:u.horizon,transparent:!0,opacity:.14,toneMapped:!1})),this.shadow.position.set(f.puppy.x+6,-2,-20),this.scene.add(this.shadow),this.dog.scale.setScalar(M),this.dog.rotation.y=Ne,this.scene.add(this.dog),this.camera.position.z=1e3}deps;renderer;scene=new Sl;camera=new Bi(0,1,1,0,1,2e3);library=new Zd;plane=new fr(1,1);decoRng=v$1(Date.now()&65535);dog=new Ht;shadow;obstacles=/* @__PURE__ */ new Map;catBodies=/* @__PURE__ */ new Map;clouds=[];actor=null;ground=null;groundTile=512;obstacleMaterials=/* @__PURE__ */ new Map;layout;dogState=null;lastTime=performance.now();crashTimer=0;disposed=!1;static async create(e,t){let i=new a(e,t);try{await i.load()}catch(s){throw i.dispose(),s}return i.disposed||(i.applyLayout(i.layout),i.renderer.setAnimationLoop(()=>i.frame())),i}applyLayout(e){this.layout=e;let{width:t,height:i,groundY:s}=e;this.renderer.setSize(e.pixelWidth,e.pixelHeight,!1),this.camera.left=0,this.camera.right=t,this.camera.top=s,this.camera.bottom=s-i,this.camera.updateProjectionMatrix(),this.ground&&(this.ground.mesh.scale.set(t,this.ground.height,1),this.ground.mesh.position.set(t/2,6-this.ground.height/2,-60),this.ground.mesh.material.map.repeat.x=t/this.groundTile);for(let r of this.clouds)r.sprite.mesh.position.y=this.cloudY()}dispose(){if(this.disposed)return;this.disposed=!0,this.renderer.setAnimationLoop(null),this.actor?.dispose();for(let t of this.obstacles.values())t.actor?.dispose();this.obstacles.clear(),this.library.dispose();let e=[this.ground,...this.clouds.map(t=>t.sprite)];for(let t of e)t?.mesh.material.map?.dispose(),t?.mesh.material.dispose();for(let t of this.obstacleMaterials.values())t.map?.dispose(),t.dispose();this.plane.dispose(),this.shadow.geometry.dispose(),this.shadow.material.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove()}async load(){let e=Math.min(3,Math.max(1.5,this.layout.zoom)),t=async d=>{let h=new Al(je(await ke(d,e)));return h.colorSpace=xt,h.minFilter=yt,h.generateMipmaps=!1,h},i=d=>new wn({map:d,transparent:!0,toneMapped:!1}),s$1=O(),r=v$2(),o$1=f.obstacles.filter(d=>!a$1(d.id)),[n,l$1,u,c,m]=await Promise.all([this.library.body(this.deps.bodyId??`labrador-rodin`),t(s$1),t(r),Promise.all(o$1.map(d=>t(S$1(d.id,d.width,d.height)))),Promise.all(s.map(async d=>({id:d.id,body:await this.library.bodyFromInfo(d)})))]);if(this.disposed){for(let d of[l$1,u,...c])d.dispose();return}o$1.forEach((d,h)=>this.obstacleMaterials.set(d.id,i(c[h]))),m.forEach(({id:d,body:h})=>this.catBodies.set(d,h)),l$1.wrapS=di,this.groundTile=s$1.width,this.ground={mesh:new Vt(this.plane,i(l$1)),width:s$1.width,height:s$1.height},this.scene.add(this.ground.mesh);for(let d=0;d<Ie;d++){let h=.8+this.decoRng()*.5,f=new Vt(this.plane,i(u));f.scale.set(r.width*h,r.height*h,1),f.position.z=-200,this.scene.add(f),this.clouds.push({sprite:{mesh:f,width:r.width*h,height:r.height*h},x:this.decoRng()*1400})}this.actor=new $d(this.library,n,{externalRootMotion:[Se]}),this.actor.object.updateMatrixWorld(!0);let w=this.actor.object.getObjectByName(`Hips`).getWorldPosition(new L$1),A=this.actor.object.getObjectByName(`Spine3`).getWorldPosition(new L$1),H=mx(this.deps.bodyId??`labrador-rodin`),_=H.shoulderHeight,Pe=f.obstacles.map(d=>{if(!a$1(d.id))return d;let h=this.catBodies.get(d.id).instantiate();h.root.updateMatrixWorld(!0);let f=new en().setFromObject(h.root),z=o(f.max.x-f.min.x),U=o(f.max.y-f.min.y);return h.dispose(),l(k({},d),{width:z,height:U,insetX:z*.15,insetTop:U*.15})});this.deps.simulation.configureRunner({shoulderHeight:_,jumpHeight:H.jumpHeight,bodyLength:Math.abs(A.x-w.x)+_*.45,bodyCenter:(w.x+A.x)/2},Pe),this.dog.add(this.actor.object)}frame(){let e=performance.now(),t=Math.min(.1,(e-this.lastTime)/1e3);this.lastTime=e;let i=this.deps.simulation,s=i.distance,r=i.step(t),o=Math.max(0,i.distance-s);for(let n of r)n.type===`crash`&&(this.crashTimer=.22),n.type===`restart`&&(this.crashTimer=0);r.length>0&&this.deps.onEvents(r),this.scrollBackground(o,t),this.syncObstacles(i.phase===`paused`?0:t),this.drawDog(t),this.shakeCamera(t),this.renderer.render(this.scene,this.camera),this.deps.onFrame()}cloudY(){let{groundY:e}=this.layout,t=Math.max(70,e-420);return e-(t+this.decoRng()*Math.max(10,e-250-t))}scrollBackground(e,t){this.ground&&(this.ground.mesh.material.map.offset.x+=e/this.groundTile);for(let i of this.clouds)i.x-=e*.1+12*t,i.x<-120&&(i.x=this.layout.width+40+this.decoRng()*300,i.sprite.mesh.position.y=this.cloudY()),i.sprite.mesh.position.x=i.x}syncObstacles(e){let t=/* @__PURE__ */ new Set;for(let i of this.deps.simulation.obstacles){t.add(i.id);let s=this.obstacles.get(i.id);if(!s){if(a$1(i.kind.id)){let r=new $d(this.library,this.catBodies.get(i.kind.id));r.object.name=i.kind.id,r.object.traverse(u=>{if(u instanceof Vt)for(let c of[u.material].flat())c.onBeforeCompile=m=>{m.fragmentShader=m.fragmentShader.replace(`#include <colorspace_fragment>`,`#include <colorspace_fragment>
 gl_FragColor.rgb = vec3(dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114)));`)},c.customProgramCacheKey=()=>`run-cat-grayscale`,c.needsUpdate=!0}),r.play(`walk`,{fade:0}),r.update(0);let o=new en().setFromObject(r.object),n=new Ht;n.scale.setScalar(M),r.object.position.x=-(o.min.x+o.max.x)/2,n.add(r.object),n.rotation.y=(i.walkSpeed??-1)<0?Math.PI:0;let l=r.speedOf(`walk`)*M;r.timeScale=l>0?Math.abs(i.walkSpeed??14)/l:.4,s={object:n,actor:r}}else{let r=new Vt(this.plane,this.obstacleMaterials.get(i.kind.id));r.scale.set(i.kind.width,i.kind.height,1),s={object:r}}this.scene.add(s.object),this.obstacles.set(i.id,s)}s.actor?.update(e),s.object.position.set(i.x+i.kind.width/2,s.actor?0:i.kind.height/2-3,-40)}for(let[i,s]of this.obstacles)t.has(i)||(s.actor?.dispose(),s.object.removeFromParent(),this.obstacles.delete(i))}drawDog(e){let t=this.deps.simulation,i=this.actor;if(!i)return;let{puppy:s}=t,r;if(t.phase===`ready`?r=`idle`:t.phase===`gameOver`?r=s.grounded&&t.speed===0?`sit`:`slide`:r=s.grounded?`run`:`jump`,r!==this.dogState&&(r===`jump`?i.pose([{name:Se,time:0,weight:1}]):i.play(r===`run`?Me:r,{fade:r===`run`?.08:.2}),this.dogState=r),r===`jump`)i.timeScale=0;else if(r===`run`){let l=i.speedOf(Me)*M;i.timeScale=l>0?t.speed/l:1}else i.timeScale=1;t.phase!==`paused`&&r!==`jump`&&i.update(e);let o=t.config;this.dog.position.set(o.puppy.x,s.elevation,0);let n=Math.max(.35,1-s.elevation/(o.physics.jumpHeight*1.75));this.shadow.scale.set(o.puppy.hitWidth*.6*n,Math.max(2,o.puppy.hitHeight*.08)*n,1),this.shadow.material.opacity=.16*n+.04}shakeCamera(e){this.crashTimer=Math.max(0,this.crashTimer-e);let t=this.crashTimer>0?5*(this.crashTimer/.22):0;this.camera.position.x=t*Math.sin(this.crashTimer*90),this.camera.position.y=t*Math.cos(this.crashTimer*70)}};var Re=`
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
`;var v={back:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`,pause:`<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1.5"/><rect x="14" y="4" width="5" height="16" rx="1.5"/></svg>`,play:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>`,soundOn:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>`,soundOff:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/></svg>`};var Ae=30;var He=Array.from({length:13},(a,e)=>{let t=Math.PI+e/12*Math.PI,i=e%2===0,s=m=>[70+Math.cos(t)*m,68+Math.sin(t)*m],[r,o]=s(i?43:47),[n,l]=s(51),[u,c]=s(33);return`<line x1="`+r+`" y1="`+o+`" x2="`+n+`" y2="`+l+`"/>`+(i?`<text x="`+u+`" y="`+c+`">`+e*2.5+`</text>`:``)}).join(``);var _e=`
<div class="dr-hud">
  <div class="dr-top">
    <button type="button" class="dr-icon-btn" data-action="exit" aria-label="Back to Dogiz" title="Back to Dogiz">${v.back}</button>
    <button type="button" class="dr-icon-btn" data-action="mute" data-ref="mute" aria-label="Toggle sound"></button>
    <div class="dr-scores" aria-live="off">
      <span class="dr-best">HI <span data-ref="best">00000</span></span>
      <span class="dr-score" data-ref="score">00000</span>
    </div>
    <button type="button" class="dr-icon-btn" data-action="pause" data-ref="pauseBtn" aria-label="Pause" title="Pause (P)">${v.pause}</button>
  </div>
  <div class="dr-speedometer" role="meter" aria-label="Running speed in kilometres per hour" aria-valuemin="0" aria-valuemax="${f.speed.max/120*3.6}" aria-valuenow="0" data-ref="speedometer">
    <svg class="dr-speed-dial" viewBox="0 0 140 78" aria-hidden="true">
      <path class="dr-speed-track" d="M16 68 A54 54 0 0 1 124 68"/>
      <path class="dr-speed-fast" d="M97 21.2 A54 54 0 0 1 124 68"/>
      <g class="dr-speed-ticks">${He}</g>
      <g class="dr-speed-needle"><path d="M23 68 L70 65 L75 68 L70 71 Z"/><circle cx="70" cy="68" r="5"/></g>
    </svg>
    <div class="dr-speed-readout"><span class="dr-speed-value" data-ref="speed">0.0</span><span class="dr-speed-unit">km/h</span></div>
  </div>
  <div class="dr-hint" data-ref="hint"></div>
  <button type="button" class="dr-jump" data-jump aria-label="Jump">JUMP</button>
</div>
<div class="dr-panel-wrap">
  <section class="dr-panel" data-panel="loading" role="status">
    <h2>Dogiz Run</h2><div class="dr-spinner"></div><p>Getting <span data-ref="dogName1"></span> ready\u2026</p>
  </section>
  <section class="dr-panel" data-panel="ready" hidden>
    <h2>Dogiz Run</h2>
    <p><b data-ref="dogName2"></b> is ready to run!</p>
    <ul class="dr-tips" data-ref="tips">
      <li><span class="dr-ico">\u{1F446}</span><span>Tap anywhere or press <span class="dr-key">Space</span> / <span class="dr-key">\u2191</span> to jump</span></li>
      <li><span class="dr-ico">\u{1F6A7}</span><span>Jump over cones, crates and hedges</span></li>
      <li><span class="dr-ico">\u23F1\uFE0F</span><span>Last as long as you can: it keeps getting faster</span></li>
      <li><span class="dr-ico">\u23F8\uFE0F</span><span>Pause any time with <span class="dr-key">P</span> or the pause button</span></li>
    </ul>
    <div class="dr-actions">
      <button type="button" class="dr-btn dr-btn-primary" data-action="start">Let's run!</button>
    </div>
  </section>
  <section class="dr-panel" data-panel="paused" hidden>
    <h2>Paused</h2>
    <p>Take a breather. <span data-ref="dogName3"></span> will wait.</p>
    <div class="dr-actions">
      <button type="button" class="dr-btn dr-btn-primary" data-action="resume">Resume</button>
      <button type="button" class="dr-btn" data-action="restart">Restart</button>
      <button type="button" class="dr-btn" data-action="exit">Back to Dogiz</button>
    </div>
  </section>
  <section class="dr-panel" data-panel="gameOver" hidden>
    <h2>Oops!</h2>
    <span class="dr-badge" data-ref="newBest" hidden>New best!</span>
    <div class="dr-stats">
      <div class="dr-stat"><b data-ref="finalScore">0</b><span>Score</span></div>
      <div class="dr-stat"><b data-ref="finalBest">0</b><span>Best</span></div>
    </div>
    <div class="dr-actions">
      <button type="button" class="dr-btn dr-btn-primary" data-action="restart" data-ref="restartBtn">Play again</button>
      <button type="button" class="dr-btn" data-action="exit">Back to Dogiz</button>
    </div>
  </section>
  <section class="dr-panel" data-panel="error" role="alert" hidden>
    <h2>Uh-oh</h2>
    <p data-ref="errorText">Something went wrong.</p>
    <div class="dr-actions"><button type="button" class="dr-btn dr-btn-primary" data-action="exit">Back to Dogiz</button></div>
  </section>
</div>`;var Ee=a=>String(Math.max(0,Math.floor(a))).padStart(5,`0`);var T=class{constructor(e,t,i){this.root=e;this.onAction=i;let s=document.createElement(`style`);s.textContent=Re,e.append(s);let r=document.createElement(`div`);r.innerHTML=_e,e.append(...Array.from(r.children)),e.querySelectorAll(`[data-ref]`).forEach(o=>this.refs.set(o.dataset.ref??``,o)),e.querySelectorAll(`[data-panel]`).forEach(o=>this.panels.set(o.dataset.panel??``,o));for(let o of[`dogName1`,`dogName2`,`dogName3`])this.ref(o).textContent=t.dogName;this.ref(`tips`).hidden=!t.showTutorial,this.setBest(t.highScore),this.setMuted(t.muted),e.addEventListener(`click`,this.handleClick)}root;onAction;refs=/* @__PURE__ */ new Map;panels=/* @__PURE__ */ new Map;lastScore=-1;lastSpeed=``;restartEnabled=!0;hintTimer;showPanel(e){this.root.dataset.phase=e;for(let[r,o]of this.panels)o.hidden=r!==e||e===`running`;let t=this.ref(`pauseBtn`);t.hidden=e!==`running`&&e!==`paused`;let i=e===`paused`;t.innerHTML=i?v.play:v.pause,t.setAttribute(`aria-label`,i?`Resume`:`Pause`),this.panels.get(e)?.querySelector(`.dr-btn-primary`)?.focus({preventScroll:!0}),e===`running`&&document.activeElement?.blur?.()}hideTutorial(){this.ref(`tips`).hidden=!0}setDogName(e){for(let t of[`dogName1`,`dogName2`,`dogName3`])this.ref(t).textContent=e}showHint(e,t=2600){let i=this.ref(`hint`);i.textContent=e,i.classList.add(`dr-show`),clearTimeout(this.hintTimer),this.hintTimer=setTimeout(()=>i.classList.remove(`dr-show`),t)}update(e,t){let i=(Math.max(0,t)/120*3.6).toFixed(1);i!==this.lastSpeed&&(this.lastSpeed=i,this.ref(`speed`).textContent=i,this.ref(`speedometer`).setAttribute(`aria-valuenow`,i),this.ref(`speedometer`).style.setProperty(`--needle-angle`,`${Math.min(1,Number(i)/Ae)*180}deg`)),e!==this.lastScore&&(this.lastScore=e,this.ref(`score`).textContent=Ee(e))}setBest(e){this.ref(`best`).textContent=Ee(e)}setMuted(e){let t=this.ref(`mute`);t.innerHTML=e?v.soundOff:v.soundOn,t.setAttribute(`aria-label`,e?`Turn sound on`:`Turn sound off`),t.setAttribute(`aria-pressed`,String(e))}setRestartEnabled(e){e!==this.restartEnabled&&(this.restartEnabled=e,this.ref(`restartBtn`).disabled=!e,e&&this.root.dataset.phase===`gameOver`&&this.ref(`restartBtn`).focus({preventScroll:!0}))}flashScore(){let e=this.ref(`score`);e.classList.remove(`dr-flash`),e.offsetWidth,e.classList.add(`dr-flash`)}showGameOver(e){this.ref(`finalScore`).textContent=String(e.score),this.ref(`finalBest`).textContent=String(e.best),this.ref(`newBest`).hidden=!e.isNewBest,this.setBest(e.best),this.showPanel(`gameOver`)}showError(e){this.ref(`errorText`).textContent=e,this.showPanel(`error`)}destroy(){clearTimeout(this.hintTimer),this.root.removeEventListener(`click`,this.handleClick)}handleClick=e=>{let t=e.target?.closest(`button[data-action]`);if(!t||t.disabled)return;let i=t.dataset.action;t.blur(),this.onAction(i)};ref(e){let t=this.refs.get(e);if(!t)throw new Error(`HUD element "${e}" missing`);return t}};var Te=`tutorialSeen`;var Ce=`muted`;var ze=/* @__PURE__ */ new Set([`Space`,`ArrowUp`,`KeyW`]);var Ue=/* @__PURE__ */ new Set([`Escape`,`KeyP`]);var j=class{constructor(e,t){this.host=e;this.context=t;this.best=t.highScore,this.tutorialSeen=t.storage.get(Te)===!0;let i=t.storage.get(Ce)===!0;this.sfx=new y$1(fe,i),this.root.className=`dr-root`,this.stage.className=`dr-stage`,this.root.append(this.stage),e.append(this.root),this.hud=new T(this.root,{dogName:t.dog.name,highScore:this.best,muted:i,showTutorial:!this.tutorialSeen},s=>this.handleHudAction(s)),this.hud.showPanel(`loading`),this.bindInput()}host;context;root=document.createElement(`div`);stage=document.createElement(`div`);simulation=new S(v$1(Date.now()>>>0));hud;sfx;cleanups=[];view=null;picker=null;best;destroyed=!1;tutorialSeen;async start(){this.picker=new g(this.root,e=>{this.picker=null,this.hud.setDogName(e.name),this.loadRunner(e.id).catch(t=>{this.destroyed||this.hud.showError(`Could not load this dog. Please reopen the game and try again.`),console.error(`[Dogiz Run] failed to load runner`,t)})},()=>this.context.exit())}async loadRunner(e){let t=this.root.getBoundingClientRect(),i=I(t.width,t.height,window.devicePixelRatio);this.simulation.setViewWidth(i.width);let s=await R.create(this.stage,{bodyId:e,simulation:this.simulation,initialLayout:i,onEvents:r=>this.handleSimEvents(r),onFrame:()=>this.handleFrame()});if(this.destroyed){s.dispose();return}this.view=s,this.observeResize(),this.hud.showPanel(`ready`),this.exposeForDevTesting()}exposeForDevTesting(){}pause(){this.simulation.dispatch(`pause`)&&this.hud.showPanel(`paused`)}destroy(){if(!this.destroyed){this.destroyed=!0;for(let e of this.cleanups.splice(0))e();this.hud.destroy(),this.picker?.destroy(),this.picker=null,this.sfx.close(),this.view?.dispose(),this.view=null,this.root.remove()}}listen(e,t,i,s){let r=i;e.addEventListener(t,r,s),this.cleanups.push(()=>e.removeEventListener(t,r,s))}bindInput(){this.listen(window,`keydown`,e=>{this.picker||(ze.has(e.code)?(e.preventDefault(),e.repeat||this.primaryAction()):Ue.has(e.code)?(e.preventDefault(),this.togglePause()):e.code===`Enter`&&this.simulation.phase===`gameOver`&&!(e.target instanceof HTMLButtonElement)&&this.primaryAction())}),this.listen(this.root,`pointerdown`,e=>{let t=e.target;if(t?.closest(`[data-jump]`)){e.preventDefault(),this.primaryAction();return}if(t?.closest(`button`)){this.sfx.unlock();return}t?.closest(`.dr-panel`)&&this.simulation.phase!==`ready`||e.button===0&&(e.preventDefault(),this.primaryAction())},{passive:!1});for(let e of[`touchstart`,`touchmove`,`gesturestart`,`dblclick`,`contextmenu`])this.listen(this.root,e,t=>{t.target instanceof Element&&t.target.closest(`.dr-panel, button`)||t.preventDefault()},{passive:!1});this.listen(document,`visibilitychange`,()=>{document.hidden&&this.pause()}),this.listen(window,`blur`,()=>this.pause()),this.listen(window,`pagehide`,()=>this.pause())}observeResize(){let e=0,t=new ResizeObserver(()=>{cancelAnimationFrame(e),e=requestAnimationFrame(()=>this.applyLayout())});t.observe(this.root),this.cleanups.push(()=>{cancelAnimationFrame(e),t.disconnect()})}applyLayout(){if(!this.view)return;let e=this.root.getBoundingClientRect();if(e.width<2||e.height<2)return;let t=I(e.width,e.height,window.devicePixelRatio);this.simulation.setViewWidth(t.width),this.view.applyLayout(t)}primaryAction(){this.view&&(this.sfx.unlock(),this.simulation.pressJump())}togglePause(){this.simulation.phase===`paused`?this.resume():this.pause()}resume(){this.simulation.dispatch(`resume`)&&this.hud.showPanel(`running`)}handleHudAction(e){switch(this.sfx.unlock(),this.sfx.play(`click`),e){case`start`:this.primaryAction();break;case`pause`:this.togglePause();break;case`resume`:this.resume();break;case`restart`:this.simulation.dispatch(`restart`);break;case`mute`:this.sfx.muted=!this.sfx.muted,this.sfx.muted||this.sfx.unlock(),this.context.storage.set(Ce,this.sfx.muted),this.hud.setMuted(this.sfx.muted);break;case`exit`:this.context.exit()}}handleFrame(){this.hud.update(this.simulation.score,this.simulation.phase===`ready`?0:this.simulation.speed),this.simulation.phase===`gameOver`&&this.hud.setRestartEnabled(this.simulation.canRestart)}handleSimEvents(e){for(let t of e)switch(t.type){case`jump`:this.sfx.play(`jump`);break;case`land`:this.sfx.play(`land`);break;case`milestone`:this.sfx.play(`milestone`),this.hud.flashScore();break;case`crash`:this.sfx.play(`crash`);break;case`phase`:this.onPhase(t.phase)}}onPhase(e){e===`running`?(this.hud.showPanel(`running`),this.tutorialSeen||(this.tutorialSeen=!0,this.context.storage.set(Te,!0),this.hud.hideTutorial(),this.hud.showHint(window.matchMedia(`(pointer: coarse)`).matches?`Tap anywhere to jump!`:`Press Space or ↑ to jump!`))):e===`gameOver`?this.finishRun():e===`paused`&&this.hud.showPanel(`paused`)}finishRun(){let e=this.simulation,t={gameId:f.gameId,dogId:this.context.dog.id,score:e.score,durationMs:Math.round(e.elapsed*1e3),treatsCollected:0,timestamp:(/* @__PURE__ */ new Date()).toISOString()},i=t.score>this.best;this.best=Math.max(this.best,t.score),this.hud.setRestartEnabled(!1),this.hud.showGameOver({score:t.score,best:this.best,isNewBest:i});try{this.context.reportResult(t)}catch(s){console.error(`[Dogiz Run] reportResult failed`,s)}}};var Kt={async mount(a,e){let t=new j(a,e);try{await t.start()}catch(i){throw console.error(`[Dogiz Run] failed to start`,i),t.destroy(),i}return t}};export{Kt as dogizRunModule};