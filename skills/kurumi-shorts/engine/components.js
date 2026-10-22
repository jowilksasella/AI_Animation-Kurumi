/* Reusable visual parts for the 1000x840 visual area (the source tag sits at its top-left; start content at y>=60).
   All times are absolute seconds. Usage: scene(start, end, C.compose(tags, part, part, ...)).
   A part is {build(el), update(t, el)} with optional from/to (fade window of the whole part).
   Class "float" marks text that may sit on an image/SVG (callouts, badges); the layout check still tests it against text. */
(function(){
'use strict';
const {seg,eo,back,spring,lerp,appear,vis,pop,slam,count,sparks}=K;
const C={};
const media=id=>`media/${id}.png`;
const win=o=>{const w={};if(o.from!==undefined)w.from=o.from;if(o.to!==undefined)w.to=o.to;return w};

/* tags: [[secondsFromSceneStart,'paper'|'ext'|'ours'|'q'|'next','text'], ...]  paper = white paper, ext = outside research */
C.compose=(tags,...parts)=>({tag:tags,
  build(r){for(const p of parts){p.el=document.createElement('div');p.el.className='part';r.appendChild(p.el);p.build(p.el)}},
  update(lt,t){for(const p of parts){
    const o=(p.from===undefined?1:appear(t,p.from,.25))*(p.to===undefined?1:1-seg(t,p.to,p.to+.25));
    p.el.style.opacity=o;p.el.style.display=o>0.001?'block':'none';
    p.el.style.transform=p.to!==undefined&&t>p.to?`scale(${1-.1*seg(t,p.to,p.to+.25)})`:'none';
    if(o>0.001)p.update(t,p.el)}}});

/* free-form part: C.custom(html, (t,el)=>{...}, {from,to}) */
C.custom=(html,update,w={})=>Object.assign({build(el){el.innerHTML=html},update:update||(()=>{})},w);

/* slammed headline: {html, at, top=64, size=58, align} */
C.headline=o=>Object.assign({build(el){el.innerHTML=`<div class="abs c-head" style="top:${o.top??64}px;font-size:${o.size??58}px;text-align:${o.align??'left'}">${o.html}</div>`},
  update(t,el){slam(el.firstChild,t,o.at??-9)}},win(o));

/* vertical bars: {title, max, rows:[{label, value, color, at, grow:[a,b], count:[a,b], dec, suffix}],
   gap:{at, text} (dashed guides at the two bar tops + bracket), badge:{at, row, text}, note:{at, text}, quote:{img, at, until}} */
C.bars=o=>{const H=o.height??380,base=o.base??(o.quote?560:640),bw=210,n=o.rows.length,gapX=(1000-n*bw)/(n+1),X=i=>gapX+i*(bw+gapX),Y=v=>base-v/o.max*H;
  return Object.assign({build(el){
    el.innerHTML=(o.title?`<div class="abs c-head" style="top:64px">${o.title}</div>`:'')+
      `<div class="abs c-axis" style="top:${base}px"></div>`+
      o.rows.map((r,i)=>`<div class="abs c-col" style="left:${X(i)}px;width:${bw}px;top:${base}px;background:${r.color}"></div>
        <div class="abs c-val num" style="left:${X(i)-40}px;width:${bw+80}px;top:${Y(r.value)-86}px">0</div>
        <div class="abs c-lab" style="left:${X(i)-30}px;width:${bw+60}px;top:${base+12}px">${r.label}</div>`).join('')+
      (o.gap?`<div class="abs c-guide" style="top:${Y(o.rows[0].value)}px"></div><div class="abs c-guide" style="top:${Y(o.rows[1].value)}px"></div>
        <div class="abs c-gtxt float" style="top:${(Y(o.rows[0].value)+Y(o.rows[1].value))/2-36}px">${o.gap.text}</div>`:'')+
      (o.badge?`<div class="abs c-badge float" style="left:${X(o.badge.row)+bw-40}px;top:${Y(o.rows[o.badge.row].value)-176}px">${o.badge.text}</div>`:'')+
      (o.note?`<div class="abs c-note" style="top:${base+80}px">${o.note.text}</div>`:'')+
      (o.quote?`<div class="abs c-quote" style="top:${base+92}px"><span>原文</span><img src="${media(o.quote.img)}"></div>`:'');
    el.cols=[...el.querySelectorAll('.c-col')];el.vals=[...el.querySelectorAll('.c-val')];el.labs=[...el.querySelectorAll('.c-lab')]},
  update(t,el){o.rows.forEach((r,i)=>{const g=spring(seg(t,r.grow[0],r.grow[1])),h=r.value/o.max*H*g;
      el.cols[i].style.height=Math.max(0,h)+'px';el.cols[i].style.top=base-Math.max(0,h)+'px';el.cols[i].style.opacity=appear(t,r.at,.2);
      vis(el.labs[i],appear(t,r.at));count(el.vals[i],t,r.count[0],r.count[1],0,r.value,r.dec??2,r.suffix??'');
      sparks(el,t,r.count[1],X(i)+bw/2,Y(r.value)-40,8,130)});
    if(o.gap){const p=appear(t,o.gap.at);el.querySelectorAll('.c-guide').forEach(g=>{g.style.opacity=p;g.style.clipPath=`inset(0 ${100-100*p}% 0 0)`});pop(el.querySelector('.c-gtxt'),t,o.gap.at+.15)}
    if(o.badge)pop(el.querySelector('.c-badge'),t,o.badge.at);
    if(o.note)vis(el.querySelector('.c-note'),appear(t,o.note.at)*.95);
    if(o.quote)vis(el.querySelector('.c-quote'),appear(t,o.quote.at)*(1-seg(t,o.quote.until??999,(o.quote.until??999)+.3)));
  }},win(o))};

/* paper figure: wipe-in, optional zoom to a point, drawn marks and callouts placed in crop pixels.
   {img, size:[w,h], width=880, left=60, top=130, at, legend:[[color,text]],
    zoom:{at, center:[x,y], s=1.3, until}, marks:[{at, ellipse:[cx,cy,rx,ry]} | {at, span:[x1,x2,y]}],
    callouts:[{at, html, pos:[x,y]}]}  (callouts stay put while the figure zooms) */
C.figure=o=>{const w=o.width??880,s=w/o.size[0],h=o.size[1]*s,L=o.left??60,T=o.top??130;
  return Object.assign({build(el){
    const marks=o.marks.map(m=>m.ellipse?`<ellipse class="mk" cx="${m.ellipse[0]*s}" cy="${m.ellipse[1]*s}" rx="${m.ellipse[2]*s}" ry="${m.ellipse[3]*s}" fill="none" stroke="#e5383b" stroke-width="7" pathLength="100" stroke-dasharray="100"/>`:
      `<line class="mk" x1="${m.span[0]*s}" y1="${m.span[2]*s}" x2="${m.span[1]*s}" y2="${m.span[2]*s}" stroke="#e5383b" stroke-width="8" stroke-linecap="round" pathLength="100" stroke-dasharray="100" marker-start="url(#ah)" marker-end="url(#ah)"/>`).join('');
    el.innerHTML=(o.legend?`<div class="abs c-legend">${o.legend.map(([c,tx])=>`<span><i style="background:${c}"></i>${tx}</span>`).join('')}</div>`:'')+
      `<div class="abs c-figbox" style="left:${L}px;top:${T}px;width:${w}px;height:${h}px"><div class="c-zoom">
        <img class="c-fig" src="${media(o.img)}" style="width:${w}px">
        <svg class="c-ov" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#e5383b"/></marker></defs>${marks}</svg>
        </div>${o.callouts.map(c=>`<div class="abs c-call float" style="left:${c.pos[0]*s}px;top:${c.pos[1]*s}px">${c.html}</div>`).join('')}</div>`;
    el.mk=[...el.querySelectorAll('.mk')];el.calls=[...el.querySelectorAll('.c-call')];el.box=el.querySelector('.c-figbox');el.zoom=el.querySelector('.c-zoom')},
  update(t,el){const a=o.at??-9;if(o.legend)vis(el.querySelector('.c-legend'),appear(t,a+.3));
    el.box.style.clipPath=`inset(0 ${100-100*eo(seg(t,a,a+.8))}% 0 0 round 18px)`;
    if(o.zoom){const z=o.zoom,p=eo(seg(t,z.at,z.at+.7))*(1-eo(seg(t,z.until??999,(z.until??999)+.6))),k=lerp(1,z.s??1.3,p);
      el.zoom.style.transformOrigin=`${z.center[0]*s}px ${z.center[1]*s}px`;el.zoom.style.transform=`scale(${k})`}
    o.marks.forEach((m,i)=>{const p=eo(seg(t,m.at,m.at+.5));el.mk[i].style.strokeDashoffset=100-100*p;el.mk[i].style.opacity=p>0?1:0});
    o.callouts.forEach((c,i)=>pop(el.calls[i],t,c.at));
  }},win(o))};

/* claim lines that slam in; a strike line grows through a wrong claim: {lines:[{at, html, mark:'x'|'ok', strike}], top=90, step=150} */
C.points=o=>Object.assign({build(el){el.innerHTML=o.lines.map((l,i)=>`<div class="abs c-pt" style="top:${(o.top??90)+i*(o.step??150)}px">${l.mark?`<span class="${l.mark}">${l.mark==='x'?'✗':'✓'}</span>`:''}<span class="tx">${l.html}</span>${l.strike?'<i class="strk"></i>':''}</div>`).join('');el.ls=[...el.children]},
  update(t,el){o.lines.forEach((l,i)=>{const e=el.ls[i];slam(e,t,l.at,.38,i%2?2:-2);
    if(l.strike){const p=eo(seg(t,l.strike,l.strike+.35));e.querySelector('.strk').style.width=p*100+'%';e.classList.toggle('struck',p>0)}})}},win(o));

/* original-text card with a highlight sweep: {heading, img, at, top=80, sweepAt} */
C.quote=o=>Object.assign({build(el){el.innerHTML=`<div class="abs c-qblock" style="top:${o.top??80}px">${o.heading?`<div class="h">${o.heading}</div>`:''}<div class="c-quote rel"><span>原文</span><img src="${media(o.img)}"><i class="sweep"></i></div></div>`},
  update(t,el){vis(el.firstChild,appear(t,o.at??-9),80);const sw=el.querySelector('.sweep');const p=eo(seg(t,o.sweepAt??999,(o.sweepAt??999)+.7));sw.style.width=p*100+'%'}},win(o));

/* paper title card dropping in with a stamp: {img='WP-P2-TITLE', caption, at, stamp, top=120} */
C.paperTitle=o=>Object.assign({build(el){el.innerHTML=`<div class="abs c-ptitle card" style="top:${o.top??120}px"><img src="${media(o.img||'WP-P2-TITLE')}"><div class="cap1">${o.caption}</div>${o.stamp?`<div class="c-stamp float">${o.stamp}</div>`:''}</div>`},
  update(t,el){const p=seg(t,o.at??-9,(o.at??-9)+.55),c=el.firstChild;c.style.opacity=Math.min(1,p*4);c.style.transform=`translateY(${(1-spring(p))*-380}px) rotate(${-2+3*(1-spring(p))}deg)`;
    if(o.stamp)slam(el.querySelector('.c-stamp'),t,(o.at??-9)+.7,.35,8)}},win(o));

/* vertical chain of boxes with arrows (mechanisms, cause → effect): {items:[{at, html, color}], top=150, gap=40, h=110} */
C.flow=o=>{const top=o.top??150,h=o.h??110,gap=o.gap??46;
  return Object.assign({build(el){el.innerHTML=o.items.map((it,i)=>`<div class="abs c-flow" style="top:${top+i*(h+gap)}px;height:${h}px;background:${it.color||'#fff'}"><div>${it.html}</div></div>`+
      (i<o.items.length-1?`<div class="abs c-arrow" style="top:${top+i*(h+gap)+h+2}px;height:${gap-4}px"></div>`:'')).join('');
    el.bx=[...el.querySelectorAll('.c-flow')];el.ar=[...el.querySelectorAll('.c-arrow')]},
  update(t,el){o.items.forEach((it,i)=>{slam(el.bx[i],t,it.at,.34,i%2?1.5:-1.5);if(el.ar[i-1]){const p=eo(seg(t,it.at-.25,it.at));el.ar[i-1].style.opacity=p>0?1:0;el.ar[i-1].style.clipPath=`inset(0 0 ${100-100*p}% 0)`}})}},win(o))};

/* tile grid popping in sequence: {items:[{at, html, hot}], cols=3, top=150, w, h=130, gap=22} (hot = highlighted tile) */
C.tiles=o=>{const cols=o.cols??3,gap=o.gap??22,w=o.w??(1000-(cols-1)*gap)/cols,h=o.h??130,top=o.top??150;
  return Object.assign({build(el){el.innerHTML=o.items.map((it,i)=>`<div class="abs c-tile${it.hot?' hot':''}" style="left:${(i%cols)*(w+gap)}px;top:${top+Math.floor(i/cols)*(h+gap)}px;width:${w}px;height:${h}px"><div>${it.html}</div></div>`).join('');el.ts=[...el.children]},
  update(t,el){o.items.forEach((it,i)=>pop(el.ts[i],t,it.at,.4))}},win(o))};

/* big counting number: {at, count:[a,b], value, dec=0, prefix, suffix, label, top=220, color} */
C.stat=o=>Object.assign({build(el){el.innerHTML=`<div class="abs c-stat" style="top:${o.top??220}px;color:${o.color||'var(--red)'}"><span class="v num">0</span></div>${o.label?`<div class="abs c-statlab" style="top:${(o.top??220)+230}px">${o.label}</div>`:''}`},
  update(t,el){const v=el.querySelector('.v'),c=o.count||[o.at,o.at+.8];pop(el.firstChild,t,o.at);count(v,t,c[0],c[1],0,o.value,o.dec??0,o.suffix??'');if(o.prefix)v.textContent=o.prefix+v.textContent;
    if(o.label)vis(el.querySelector('.c-statlab'),appear(t,o.labelAt??o.at+.3));sparks(el,t,c[1],500,(o.top??220)+110,10,230)}},win(o));

/* two cards side by side with a badge: {left:{html,at,color}, right:{html,at,color}, vsAt, badge='VS', top=170, h=420} */
C.vs=o=>{const top=o.top??170,h=o.h??420;
  return Object.assign({build(el){el.innerHTML=`<div class="abs c-side" style="left:0;top:${top}px;height:${h}px;background:${o.left.color||'#fff'}"><div>${o.left.html}</div></div>
      <div class="abs c-side" style="left:530px;top:${top}px;height:${h}px;background:${o.right.color||'#fff'}"><div>${o.right.html}</div></div><div class="abs c-vs float" style="top:${top+h/2-60}px">${o.badge??'VS'}</div>`;el.s=[...el.querySelectorAll('.c-side')]},
  update(t,el){el.s[0].style.opacity=appear(t,o.left.at,.25);el.s[0].style.transform=`translateX(${(1-back(seg(t,o.left.at,o.left.at+.4)))*-300}px)`;
    el.s[1].style.opacity=appear(t,o.right.at,.25);el.s[1].style.transform=`translateX(${(1-back(seg(t,o.right.at,o.right.at+.4)))*300}px)`;
    slam(el.querySelector('.c-vs'),t,o.vsAt??Math.max(o.left.at,o.right.at)+.2,.35,-6)}},win(o))};

window.C=C;
})();
