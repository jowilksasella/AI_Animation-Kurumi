/* Follow outro: Kurumi close-up asking viewers to follow. Added automatically when project.json has "outro".
   Stage coordinates (overlay above the cast). Text comes from EP.outro.ui (converted for 繁體 by shorts.py). */
(function(){
'use strict';
const o=window.EP.outro;if(!o)return;
const {seg,eo,back,spring,appear,slam,pop,sparks}=K;
const ws=(o.words||[]).find(w=>w.text.includes(o.ui.button))||{start:o.start+1.2};
const tap=ws.start+.15;
keywords([o.ui.button]);
cast({outro:{s:'explain',s2:[[tap,'surprise']]}});
scene(o.start-.15,9999,{tag:[[0,'next','']],overlay:true,closeup:'kurumi',enter:'zoom',
  build(r){r.innerHTML=`<div class="abs o-head">${o.ui.headline}</div>
    <div class="abs o-btn"><span class="o-plus">＋ ${o.ui.button}</span><span class="o-done">✓ ${o.ui.done}</span></div>
    <svg class="abs o-hand" width="120" height="140" viewBox="0 0 120 140"><path d="M44 8c8 0 13 6 13 13v40l6-2c7-2 13 1 15 7l3 2c6-2 12 1 14 7l2 1c6-1 11 3 12 9l3 24c2 16-9 30-25 30H62c-9 0-17-4-22-11L14 96c-4-6-2-13 4-16 5-3 11-2 15 2l-2-2V21c0-7 5-13 13-13z" fill="#fff" stroke="#15202b" stroke-width="7" stroke-linejoin="round"/></svg>
    <div class="abs o-sub">${o.ui.sub}</div>`},
  update(lt,t,r){
    slam(r.querySelector('.o-head'),t,o.start+.25,.38,-3);
    const b=r.querySelector('.o-btn'),p=seg(t,o.start+.6,o.start+1.05),press=Math.sin(Math.PI*seg(t,tap,tap+.22));
    b.style.opacity=Math.min(1,p*4);b.style.transform=`scale(${(p<1?.3+.7*back(p):1)*(1-.08*press)})`;
    const done=t>=tap+.1;b.classList.toggle('done',done);
    const h=r.querySelector('.o-hand'),hp=eo(seg(t,tap-.7,tap-.1));
    h.style.opacity=seg(t,tap-.7,tap-.5)*(1-seg(t,tap+.8,tap+1.1));h.style.transform=`translate(${(1-hp)*260}px,${(1-hp)*200+18*press}px) rotate(${-12+12*hp}deg)`;
    sparks(r,t,tap+.1,540,1420,10,190);
    r.querySelector('.o-sub').style.opacity=appear(t,tap+1.05);
  }});
sound(o.start-.1,'whoosh',.45);flash(o.start-.05,.25);sound(o.start+.25,'hit',.6);sound(o.start+.6,'pop',.5);
sound(tap,'tick',.6);sound(tap+.1,'sparkle',.7);punch(tap+.1,1.05);
})();
