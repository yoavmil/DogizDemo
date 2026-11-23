var e=`gesture-hint`;var n=`
.${e} {
  position: absolute; left: 50%; top: 42%; transform: translate(-50%, -50%);
  width: 132px; height: 132px; border-radius: 50%; display: grid; place-items: center;
  background: rgba(35, 50, 59, .55); pointer-events: none; z-index: 4;
  opacity: 0; transition: opacity .3s;
}
.${e}.${e}-on { opacity: 1; }
.${e}[hidden] { display: none; }
.${e} svg { width: 104px; height: 104px; overflow: visible; }
.${e}-phone { transform-origin: 52px 60px; animation: ${e}-rock 1.6s ease-in-out infinite; }
.${e}-arrow { fill: none; stroke: #fff; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; opacity: .9; }
@keyframes ${e}-rock {
  0%, 100% { transform: rotate(-16deg); }
  50% { transform: rotate(16deg); }
}
.${e}-hop { animation: ${e}-hop 1.8s ease-in-out infinite; }
@keyframes ${e}-hop {
  0% { transform: translate(0, 0); opacity: 0; }
  10%, 20% { transform: translate(0, 0); opacity: 1; }
  48% { transform: translate(19px, -34px); }
  70%, 90% { transform: translate(38px, -22px); opacity: 1; }
  100% { transform: translate(38px, -22px); opacity: 0; }
}
.${e}-red { animation: ${e}-flash .5s ease-in-out infinite alternate; }
@keyframes ${e}-flash { from { opacity: .35; } to { opacity: .95; } }
.${e}-run { animation: ${e}-run 1.8s linear infinite; }
@keyframes ${e}-run {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 1; }
  80% { transform: translate(48px, 0); opacity: 1; }
  100% { transform: translate(56px, 0); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) { .${e}-phone, .${e}-hop, .${e}-red, .${e}-run { animation: none; } }
`;var a=`<svg viewBox="0 0 104 104" aria-hidden="true">
  <path class="${e}-arrow" d="M14 38 A44 44 0 0 0 14 82 M8 74 l6 8 8-5" />
  <path class="${e}-arrow" d="M90 38 A44 44 0 0 1 90 82 M96 74 l-6 8 -8-5" />
  <g class="${e}-phone">
    <rect x="34" y="22" width="36" height="66" rx="8" fill="#f8fbf7" stroke="#23323b" stroke-width="4" />
    <rect x="40" y="31" width="24" height="44" rx="3" fill="#7cc6e8" />
    <circle cx="52" cy="81" r="2.6" fill="#23323b" />
  </g>
</svg>`;var r=`<ellipse cx="0" cy="0" rx="13" ry="8" fill="#e7b57a" stroke="#23323b" stroke-width="3" />
  <path d="M-7 6 v8 M7 6 v8" stroke="#23323b" stroke-width="3.5" stroke-linecap="round" />
  <circle cx="12" cy="-8" r="6.5" fill="#e7b57a" stroke="#23323b" stroke-width="3" />
  <path d="M8 -13 q-5 3 -3 9" fill="#b9814a" stroke="#23323b" stroke-width="2.5" stroke-linejoin="round" />
  <circle cx="14.5" cy="-9" r="1.4" fill="#23323b" />`;var h={tilt:a,jump:`<svg viewBox="0 0 104 104" aria-hidden="true">
  <path d="M10 86 H94" stroke="#f8fbf7" stroke-width="4" stroke-linecap="round" opacity=".7" />
  <g transform="translate(66 72) scale(-1 1)">${r}</g>
  <path class="${e}-arrow" d="M30 56 Q46 22 62 44" stroke-dasharray="1 9" />
  <g class="${e}-hop"><g transform="translate(26 72)">${r}</g></g>
</svg>`,"red-room":`<svg viewBox="0 0 104 104" aria-hidden="true">
  <rect class="${e}-red" x="12" y="22" width="62" height="62" rx="3" fill="#e4572e" />
  <path d="M74 44 V22 H12 V84 H74 V64" fill="none" stroke="#f8fbf7" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" />
  <path class="${e}-arrow" d="M80 54 H96 M90 48 l6 6 -6 6" />
  <g class="${e}-run"><g transform="translate(34 56) scale(.8)">${r}</g></g>
</svg>`};var i=class{element=document.createElement(`div`);style=document.createElement(`style`);timer;fadeTimer;inTimer;constructor(t){this.style.textContent=n,this.element.className=e,this.element.setAttribute(`role`,`img`),this.element.hidden=!0,t.append(this.style,this.element)}get visible(){return!this.element.hidden}show(t,{seconds:s,label:o}){this.clearTimers(),this.element.innerHTML=h[t],this.element.setAttribute(`aria-label`,o),this.element.hidden=!1,this.inTimer=setTimeout(()=>this.element.classList.add(`${e}-on`),20),this.timer=setTimeout(()=>this.hide(),s*1e3)}hide(){this.clearTimers(),!this.element.hidden&&(this.element.classList.remove(`${e}-on`),this.fadeTimer=setTimeout(()=>this.element.hidden=!0,300))}destroy(){this.clearTimers(),this.element.remove(),this.style.remove()}clearTimers(){clearTimeout(this.timer),clearTimeout(this.fadeTimer),clearTimeout(this.inTimer)}};export{i as t};