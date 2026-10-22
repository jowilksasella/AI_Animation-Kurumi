/* kurumi-shorts player. Every frame is a pure function of t (seconds): tools/render.js calls renderAt(t)
   once per output frame, so nothing depends on CSS transitions or wall-clock time.
   Scene files use: scene(start,end,def), cast({...}), sound(t,kind,vol), punch(t,s), shake(t,amp), flash(t), keywords([...]). */
(function(){
'use strict';
const EP=window.EP;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const eo=p=>1-Math.pow(1-p,3),eio=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
const back=p=>{const c=1.9,c3=c+1;return 1+c3*Math.pow(p-1,3)+c*Math.pow(p-1,2)};
const spring=p=>p>=1?1:1-Math.exp(-6*p)*Math.cos(10*p);
const lerp=(a,b,p)=>a+(b-a)*p;
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const appear=(t,a,d=.35)=>eo(seg(t,a,a+d));
function vis(el,p,dy=30,sc){el.style.opacity=p;el.style.transform=`translateY(${(1-p)*dy}px)`+(sc!==undefined?` scale(${sc})`:'')}
/* pop: scale in with overshoot */
function pop(el,t,a,d=.42){const p=seg(t,a,a+d);el.style.opacity=clamp(p*4);el.style.transform=`scale(${p<=0?.3:.3+.7*back(p)})`}
/* slam: drop from big to 1 with a small rotation settle */
function slam(el,t,a,d=.38,rot=-3){const p=seg(t,a,a+d);el.style.opacity=clamp(p*5);el.style.transform=`scale(${lerp(1.9,1,eo(p))}) rotate(${rot*(1-spring(p))}deg)`}
function count(el,t,a,b,from,to,dec,suf=''){const p=seg(t,a,b);el.style.opacity=seg(t,a-.15,a+.1);el.textContent=lerp(from,to,eo(p)).toFixed(dec)+suf;
  const f=seg(t,b,b+.35);el.style.transform=`scale(${1+.28*Math.sin(Math.PI*f)})`}
/* sparks: burst of small stars around (x,y) at time a; container gets .spark children once */
function sparks(box,t,a,x,y,n=8,r=110){if(!box._sp){box._sp=[];for(let i=0;i<n;i++){const s=document.createElement('i');s.className='spark';box.appendChild(s);box._sp.push(s)}}
  const p=seg(t,a,a+.6);box._sp.forEach((s,i)=>{const ang=i/n*Math.PI*2+.3,d=r*eo(p);s.style.left=x+Math.cos(ang)*d+'px';s.style.top=y+Math.sin(ang)*d+'px';
    s.style.opacity=p>0&&p<1?1-p:0;s.style.transform=`scale(${1.4-p}) rotate(${p*180}deg)`})}
window.K={clamp,seg,eo,eio,back,spring,lerp,rng,appear,vis,pop,slam,count,sparks};

const scenes=[],sfx=[],expr={},camFx=[],keys=[];
window.scene=(start,end,def)=>scenes.push(Object.assign({start,end},def));
window.sound=(t,kind,vol)=>sfx.push({t,kind,vol:vol===undefined?.5:vol});
window.cast=map=>Object.assign(expr,map);
window.punch=(t,s=1.07,d=.45)=>camFx.push({t,kind:'punch',s,d});
window.shake=(t,a=14,d=.45)=>camFx.push({t,kind:'shake',a,d});
window.flash=(t,d=.3)=>camFx.push({t,kind:'flash',d});
window.keywords=list=>keys.push(...list);
window.EP_SFX=sfx;

const $=s=>document.querySelector(s);
let tagEl,capTxt,capWho,cam,flashEl,blobs=[],actors={},lastTag='',lastCap=null,spans=[];
const NAME={'久留美':'kurumi','萌智子':'mochiko'},ACC={kurumi:'#e05a9c',mochiko:'#8b4fd1'};
/* cast placement: speaker big at the bottom; the listener peeks from its own edge */
const CFG={kurumi:{width:860,side:'left',offset:-70,top:1330,out:-360},mochiko:{width:890,side:'right',offset:-45,top:1362,out:360}};

function build(){
  document.body.classList.add(EP.lang);
  $('#titlebar').innerHTML=`<div class="row"><span class="brand">${EP.brand}</span><span class="ep">${EP.epLabel}</span></div><h1><span>${EP.heading}</span></h1>`;
  tagEl=$('#panel .tag');cam=$('#cam');flashEl=$('#flash');
  const bg=$('#bg');[['#ffb3d1',620,-80,1300],['#cdb4ff',560,640,1250],['#ffe48a',520,300,420]].forEach(([c,s,x,y])=>{const i=document.createElement('i');i.style.cssText=`background:${c};width:${s}px;height:${s}px`;i.x=x;i.y=y;bg.appendChild(i);blobs.push(i)});
  if(EP.outro)for(const s of scenes)if(!s.overlay)s.end=Math.min(s.end,EP.outro.start-.15);
  scenes.forEach((s,i)=>{s.el=document.createElement('div');s.el.className='scene';(s.overlay?$('#over'):$('#panel')).appendChild(s.el);s.build(s.el);s.enter=s.enter||['pop','right','up','left','zoom'][i%5]});
  for(const id of ['kurumi','mochiko']){
    const a=FXKurumi.mount(Object.assign({stage:'#stage',character:id,expression:'explain'},CFG[id]));
    a.element.classList.add('fxk-visible');a.cur='explain';actors[id]=a;
  }
  capTxt=$('#cap .txt');capWho=$('#cap .who');
}

function turnAt(t){let i=0;for(let j=0;j<EP.turns.length;j++)if(EP.turns[j].start<=t+.08)i=j;return i}
function exprFor(turn,role,t){const e=expr[turn.id]||{};let v=e[role]||(role==='s'?'explain':'think');for(const [at,x] of (e[role+'2']||[]))if(t>=at)v=x;return v}
function wordStart(t){const c=EP.captions.find(c=>t>=c.start&&t<c.end);if(!c)return null;let w=null;for(const x of c.words)if(x.start<=t)w=x.start;return w}
/* close-up framing (scene.closeup): face centred at CLOSE.y, scaled CLOSE.s; face = fraction of the art box */
const CLOSE={x:540,y:720,s:1.9,face:{kurumi:[.53,.137],mochiko:[.5,.135]}};
let closeScene=null;
function closeupTf(id,p){const c=CFG[id],a=actors[id].element,w=a.offsetWidth,h=a.offsetHeight,[fx,fy]=CLOSE.face[id];
  const left=c.side==='left'?c.offset:1080-c.offset-w,ox=left+w/2,dx=fx*w-w/2,dy=fy*h;
  return {x:(CLOSE.x-ox-dx*CLOSE.s)*p,y:(CLOSE.y-c.top-dy*CLOSE.s)*p,s:1+(CLOSE.s-1)*p}}
function renderCast(t){
  const i=turnAt(t),turn=EP.turns[i],prev=EP.turns[i-1],sp=NAME[turn.speaker];
  const changed=prev&&NAME[prev.speaker]!==sp,p=changed?seg(t,turn.start-.1,turn.start+.32):1;
  const ws=wordStart(t),hop=ws===null?0:Math.sin(Math.PI*seg(t,ws,ws+.16))*9;
  for(const id in actors){
    const a=actors[id],c=CFG[id],speaking=id===sp;
    const w=speaking?(changed?back(p):1):(changed&&NAME[prev.speaker]===id?1-eo(p):0);
    const want=exprFor(turn,speaking?'s':'l',t);
    if(want!==a.cur){a.setExpression(want);a.cur=want}
    const react=speaking&&['surprise','question','concern'].includes(want)?Math.sin(t*40)*2.5*(1-seg(t,turn.start,turn.start+.5))*(t>=turn.start?1:0):0;
    const bob=Math.sin((t+(id==='kurumi'?0:1.3))*2*Math.PI/3)*6;
    const x=lerp(c.out,0,w),y=lerp(70,0,clamp(w))+bob-(speaking?hop:0),s=lerp(.84,1,clamp(w));
    let tf=`translateX(${x}px) translateY(${y}px) scale(${s}) rotate(${react}deg)`;
    if(closeScene){const q=back(seg(t,closeScene.start,closeScene.start+.55));
      if(id===closeScene.closeup){const z=closeupTf(id,clamp(q,0,1.08));tf=`translateX(${z.x}px) translateY(${z.y+bob-(speaking?hop:0)}px) scale(${z.s}) rotate(${react}deg)`}
      else a.element.style.opacity=1-seg(t,closeScene.start,closeScene.start+.3)}
    else a.element.style.opacity=1;
    a.element.style.transform=tf;
    a.element.style.filter=`saturate(${lerp(.7,1,clamp(w))})`;
    a.element.style.zIndex=w>.5?42:40;
  }
}
function isKey(s){return /\d|VIX|GEX|零点|百分之|零點/.test(s)||keys.some(k=>s.includes(k)||k.includes(s.replace(/[，。？！、“”：]/g,''))&&s.replace(/[，。？！、“”：]/g,'').length>=2)}
function renderCaption(t){
  const c=EP.captions.find(c=>t>=c.start&&t<c.end);
  if(c!==lastCap){lastCap=c;capTxt.innerHTML='';spans=[];
    if(c){for(const w of c.words){const s=document.createElement('span');s.className='w'+(isKey(w.text)?' key':'');s.textContent=w.text;s.start=w.start;capTxt.appendChild(s);spans.push(s)}
      const who=NAME[c.speaker];capWho.textContent=EP.names[who];capWho.style.background=ACC[who];
      let fs=76;capTxt.style.fontSize=fs+'px';while(capTxt.offsetHeight>fs*1.24*2+6&&fs>60){fs-=4;capTxt.style.fontSize=fs+'px'}}}
  let now=-1;spans.forEach((s,i)=>{if(s.start<=t)now=i});
  spans.forEach((s,i)=>{const p=seg(t,s.start-.03,s.start+.17);s.style.opacity=clamp(p*4);s.style.transform=`scale(${p<=0?.5:p<1?.5+.5*back(p):1}) translateY(${(1-eo(p))*14}px)`;s.classList.toggle('now',i===now)});
  $('#cap').style.opacity=c?1:0;
}
function renderCam(t,active){
  let s=1,x=0,y=0,r=0,fl=0;
  if(active)s+=.025*seg(t,active.start,active.end);
  for(const e of camFx){const p=seg(t,e.t,e.t+e.d);if(p<=0||p>=1)continue;
    if(e.kind==='punch')s+=(e.s-1)*Math.sin(Math.PI*Math.pow(p,.6));
    if(e.kind==='shake'){const k=e.a*(1-p);x+=Math.sin(t*93)*k;y+=Math.cos(t*71)*k*.7;r+=Math.sin(t*57)*k*.05}
    if(e.kind==='flash')fl=Math.max(fl,.85*(1-p))}
  cam.style.transform=`translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`;flashEl.style.opacity=fl;
}
function renderScenes(t){
  let active=null;
  for(const s of scenes){
    const pin=seg(t,s.start,s.start+.38),pout=1-seg(t,s.end-.05,s.end+.2),p=Math.min(eo(pin),pout),on=p>.001;
    s.el.style.display=on?'block':'none';if(!on)continue;
    const q=pin<1?pin:1,b=back(q);
    const tf={pop:`scale(${.6+.4*b})`,zoom:`scale(${1.5-.5*eo(q)})`,right:`translateX(${(1-b)*420}px)`,left:`translateX(${(b-1)*420}px)`,up:`translateY(${(1-b)*260}px)`}[s.enter];
    s.el.style.opacity=p;s.el.style.transform=pin<1?tf:(pout<1?`scale(${1-.08*(1-pout)})`:'none');
    s.update(t-s.start,t,s.el);
    if(t>=s.start&&t<s.end)active=s;
  }
  if(active){let tag=active.tag[0];for(const x of active.tag)if(t-active.start>=x[0])tag=x;
    const key=tag[1]+tag[2];if(key!==lastTag){lastTag=key;tagEl.className='tag '+tag[1];tagEl.textContent=tag[2]}
    const tp=seg(t,active.start+(tag[0]||0),active.start+(tag[0]||0)+.3);tagEl.style.transform=`scale(${tp<1?.6+.4*back(tp):1})`}
  return active;
}
function renderBg(t){blobs.forEach((b,i)=>{b.style.left=b.x+Math.sin(t*.35+i*2)*90+'px';b.style.top=b.y+Math.cos(t*.28+i)*70+'px'})}
window.renderAt=function(t){closeScene=scenes.find(s=>s.closeup&&t>=s.start)||null;renderBg(t);renderCast(t);renderCaption(t);renderCam(t,renderScenes(t));
  tagEl.style.opacity=closeScene?1-seg(t,closeScene.start,closeScene.start+.2):1};

/* Layout check (tools/render.js qa): measured with the camera reset so punches/shakes don't count.
   Inline style transforms are reset first, so animation-only transforms never count; position with left/top, not transform.
   Flags text overlapping text/images, content leaving the visual area, unloaded images, a last line holding a
   single character, captions over 2 lines or inside the Shorts UI zones, and a wrapped title.
   Elements under .float may sit on images/SVG (badges, highlight zones) but are still checked against text. */
const SAFE={bottom:1920-340,right:1080-100};
function textBox(el){const r=document.createRange();r.selectNodeContents(el);const rs=[...r.getClientRects()].filter(x=>x.width>1);
  if(!rs.length)return null;const lines=[];for(const x of rs){const l=lines.find(l=>Math.abs(l.top-x.top)<x.height/2);if(l){l.left=Math.min(l.left,x.left);l.right=Math.max(l.right,x.right)}else lines.push({top:x.top,bottom:x.bottom,left:x.left,right:x.right})}
  return {left:Math.min(...lines.map(l=>l.left)),right:Math.max(...lines.map(l=>l.right)),top:Math.min(...lines.map(l=>l.top)),bottom:Math.max(...lines.map(l=>l.bottom)),lines}}
function effOpacity(el){let o=1;for(let e=el;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return 0;o*=+cs.opacity}return o}
window.__layoutCheck=function(t){
  /* inline transforms are animation only (entrances, pops, zooms): measure the settled layout */
  window.renderAt(t);cam.style.transform='none';for(const s of scenes)if(s.el.style.display!=='none'){s.el.style.transform='none';s.el.querySelectorAll('[style*="transform"]').forEach(e=>e.style.transform='none')}
  spans.forEach(s=>{s.style.transform='none';s.style.opacity=1});
  const out=[],P=$('#panel').getBoundingClientRect(),leaves=[];
  const name=el=>el.tagName==='IMG'?'img '+el.getAttribute('src').split('/').pop():el.tagName==='svg'?'svg graphic':'"'+el.textContent.trim().replace(/\s+/g,' ').slice(0,16)+'"';
  for(const s of scenes){if(s.el.style.display==='none')continue;
    for(const el of s.el.querySelectorAll('*')){
      const tag=el.tagName,media=tag==='IMG'||tag==='svg';
      if(el.closest('svg')&&tag!=='svg'||el.classList.contains('c-ov')||el.classList.contains('spark'))continue;
      const hasText=!media&&[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
      if(!media&&!hasText||effOpacity(el)<.5)continue;
      const r=media?el.getBoundingClientRect():textBox(el);if(!r||r.right-r.left<2)continue;
      if(tag==='IMG'&&!el.naturalWidth)out.push('image not loaded: '+el.getAttribute('src'));
      if(s.overlay){if(hasText&&(r.bottom>SAFE.bottom||r.right>SAFE.right))out.push('text in Shorts UI zone: '+name(el))}
      else if(r.left<P.left-1||r.right>P.right+1||r.top<P.top-1||r.bottom>P.bottom+1)out.push('outside visual area: '+name(el));
      if(hasText&&r.lines.length>1){const last=r.lines[r.lines.length-1],fs=parseFloat(getComputedStyle(el).fontSize);if(last.right-last.left<fs*1.3)out.push('single-character last line: '+name(el))}
      leaves.push({el,r,text:hasText,float:!!el.closest('.float')});
    }}
  const tagR=tagEl.getBoundingClientRect();
  for(const a of leaves){if(!a.text)continue;const w=Math.min(a.r.right,tagR.right)-Math.max(a.r.left,tagR.left),h=Math.min(a.r.bottom,tagR.bottom)-Math.max(a.r.top,tagR.top);if(w>6&&h>6)out.push('overlap: source tag × '+name(a.el))}
  for(let i=0;i<leaves.length;i++)for(let j=i+1;j<leaves.length;j++){const a=leaves[i],b=leaves[j];
    if(!a.text&&!b.text||a.el.contains(b.el)||b.el.contains(a.el))continue;
    if(a.float&&!b.text||b.float&&!a.text)continue;
    /* compare line boxes, not the union box, so a wrapped line never collides with what sits beside its first line */
    const hit=(p,q)=>Math.min(p.right,q.right)-Math.max(p.left,q.left)>6&&Math.min(p.bottom,q.bottom)-Math.max(p.top,q.top)>6;
    if((a.r.lines||[a.r]).some(p=>(b.r.lines||[b.r]).some(q=>hit(p,q))))out.push(`overlap: ${name(a.el)} × ${name(b.el)}`)}
  if(lastCap){const tb=textBox(capTxt),fs=parseFloat(capTxt.style.fontSize);
    if(tb&&tb.lines.length>2)out.push('caption over 2 lines: "'+lastCap.text+'"');
    if(tb&&(tb.bottom>SAFE.bottom||tb.right>SAFE.right))out.push('caption in Shorts UI zone');
    if(tb&&tb.lines.length>1){const l=tb.lines[tb.lines.length-1];if(l.right-l.left<fs*1.3)out.push('caption single-character last line: "'+lastCap.text+'"')}}
  const h1=$('#titlebar h1');if(h1&&h1.offsetHeight>parseFloat(getComputedStyle(h1).fontSize)*1.3+10)out.push('title wraps to 2 lines');
  return out;
};
window.__checkTimes=function(dur){const ts=[];
  for(let t=.25;t<dur;t+=.5)if(!scenes.some(s=>t>s.start-.3&&t<s.start+.45))ts.push(+t.toFixed(2));
  for(const c of EP.captions)ts.push(+((c.start+c.end)/2).toFixed(2));
  return [...new Set(ts)].sort((a,b)=>a-b)};
window.__sheetTimes=dur=>scenes.map(s=>+Math.max(s.start+.5,Math.min(s.end,dur)-.6).toFixed(2));
window.__ready=new Promise(res=>addEventListener('load',async()=>{
  build();
  const srcs=new Set([...document.images].map(i=>i.src));
  for(const id in actors)srcs.add(new URL('fx-kurumi/'+FXKurumi.manifest.characters[id].sheet,location.href).href);
  await Promise.all([...srcs].map(s=>{const i=new Image();i.src=s;return i.decode().catch(()=>{})}));
  await document.fonts.ready;window.renderAt(0);res(true)}));
})();
