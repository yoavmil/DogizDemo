import{C as Nn,J as gt,N as Ut,T as Pe,ht as vr}from"./chunk-DC4PM6I_.js";var b=`
attribute float aLife;
attribute vec3 aColor;
uniform float uScale;
varying float vLife;
varying vec3 vColor;
void main() {
  vLife = aLife;
  vColor = aColor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uScale * 0.26 * (0.35 + 0.65 * aLife);
}
`;var g=`
varying float vLife;
varying vec3 vColor;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float glow = max(1.0 - length(p), 0.0);
  float star = max(0.0, 1.0 - abs(p.x) * 5.0) * max(0.0, 1.0 - abs(p.y)) + max(0.0, 1.0 - abs(p.y) * 5.0) * max(0.0, 1.0 - abs(p.x));
  float a = clamp(glow * glow + star, 0.0, 1.0) * vLife;
  if (a < 0.01) discard;
  gl_FragColor = vec4(mix(vColor, vec3(1.0), 0.55) * a, a);
}
`;var y=class{constructor(t=320){this.capacity=t;this.pos=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.maxLife=new Float32Array(t).fill(1),this.colour=new Float32Array(t*3),this.geometry.setAttribute(`position`,new Ut(this.pos,3)),this.geometry.setAttribute(`aLife`,new Ut(new Float32Array(t),1)),this.geometry.setAttribute(`aColor`,new Ut(this.colour,3)),this.material=new Nn({vertexShader:b,fragmentShader:g,uniforms:{uScale:{value:40}},transparent:!0,depthWrite:!1,blending:2}),this.points=new vr(this.geometry,this.material),this.points.frustumCulled=!1,this.points.renderOrder=5}capacity;points;geometry=new gt;material;pos;vel;life;maxLife;colour;next=0;c=new Pe;setScale(t){this.material.uniforms.uScale.value=t}burst(t,a,o,i=1){for(let e=0;e+1<t.length;e+=2)for(let s=0;s<i;s++)this.spawn(t[e]+(Math.random()-.5)*.3,t[e+1]+(Math.random()-.5)*.3,.08,a,o*(.7+Math.random()*.6),.4,.5+Math.random()*.9)}puff(t,a,o,i,e){for(let s=0;s<i;s++)this.spawn(t,a,.3,o,e*(.6+Math.random()*.6),2.2,.6+Math.random()*1.6)}clear(){this.life.fill(0)}update(t){let a=this.geometry.getAttribute(`aLife`),o=a.array;for(let i=0;i<this.capacity;i++){if(this.life[i]<=0){o[i]=0;continue}this.life[i]=Math.max(0,this.life[i]-t);let e=i*3;this.pos[e]+=this.vel[e]*t,this.pos[e+1]+=this.vel[e+1]*t,this.pos[e+2]+=this.vel[e+2]*t,this.vel[e]*=1-2*t,this.vel[e+2]*=1-2*t,o[i]=this.life[i]/this.maxLife[i]}a.needsUpdate=!0,this.geometry.getAttribute(`position`).needsUpdate=!0,this.geometry.getAttribute(`aColor`).needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}spawn(t,a,o,i,e,s,c){let n=this.next;this.next=(this.next+1)%this.capacity;let r=n*3,h=Math.random()*Math.PI*2,m=s*Math.random();this.pos[r]=t,this.pos[r+1]=o,this.pos[r+2]=a,this.vel[r]=Math.cos(h)*m,this.vel[r+1]=c,this.vel[r+2]=Math.sin(h)*m,this.c.set(i),this.colour[r]=this.c.r,this.colour[r+1]=this.c.g,this.colour[r+2]=this.c.b,this.life[n]=e,this.maxLife[n]=e}};export{y as t};