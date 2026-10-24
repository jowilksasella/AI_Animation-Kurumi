/* Cover page: EP.cover.lines (HTML, keyword in <b>), chips, strip text; Kurumi reacting at the bottom.
   Exposes renderAt/__ready so tools/render.js "stills" can capture it like an episode page. */
(function(){
'use strict';
const EP=window.EP,$=s=>document.querySelector(s);
window.renderAt=()=>{};
window.__ready=new Promise(res=>addEventListener('load',async()=>{
  document.body.classList.add(EP.lang);
  $('#chips').innerHTML=`<span class="brand">${EP.brand}</span><span class="ep">${EP.epLabel}</span>`;
  const head=$('#head');head.innerHTML=EP.cover.lines.map(l=>`<span class="ln">${l}</span>`).join('');
  $('#strip').innerHTML=`<span>${EP.cover.strip}</span>`;
  $('#kicker').innerHTML=EP.cover.kicker?`<span>${EP.cover.kicker}</span>`:'';
  document.querySelectorAll('.tape').forEach(t=>t.innerHTML=`<span>${Array(8).fill(EP.lang==='tc'?'危險 ⚠ 注意':'危险 ⚠ 注意').join('　')}</span>`);
  FXKurumi.mount({stage:'#stage',character:'kurumi',expression:EP.cover.expression||'surprise',side:'left',width:900,top:1080,offset:90}).element.classList.add('fxk-visible');
  await document.fonts.ready;
  /* fit: largest size (≤150px) where every line fits the width and the block ends above the face (y≈1110) */
  for(let fs=150;fs>=70;fs-=4){head.style.fontSize=fs+'px';
    if([...head.querySelectorAll('.ln')].every(l=>l.scrollWidth<=head.clientWidth)&&head.getBoundingClientRect().bottom<=1130)break}
  const img=new Image();img.src=new URL('fx-kurumi/'+FXKurumi.manifest.characters.kurumi.sheet,location.href).href;await img.decode().catch(()=>{});
  res(true)}));
})();
