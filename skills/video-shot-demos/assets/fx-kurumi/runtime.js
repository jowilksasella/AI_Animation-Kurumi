/* Zero-dependency cast, side-pointing speech bubbles, themed captions and topic progress. */
(function(global){
 'use strict';
 const manifest=global.FX_KURUMI_MANIFEST;
 if(!manifest)throw new Error('Load fx-kurumi/cast-data.js before runtime.js');
 const base=new URL('.',document.currentScript.src),actors=new Set(),layers=new Set();
 const url=file=>new URL(file,base).href;
 const stageOf=stage=>typeof stage==='string'?document.querySelector(stage):stage;
 const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const clamp=x=>Math.max(0,Math.min(1,x));
 function mount(options){
  const stage=stageOf(options.stage||'#stage'),data=manifest.characters[options.character||'kurumi'];
  if(!stage)throw new Error('Character stage not found');if(!data)throw new Error('Unknown character: '+options.character);
  const width=options.width||480,side=options.side||'left';
  const el=document.createElement('div');el.className='fxk-actor fxk-'+side;el.dataset.character=options.character||'kurumi';el.style.setProperty('--fxk-width',width+'px');el.style.setProperty('--fxk-accent',data.accent);
  el.style.top=(options.top===undefined?740:options.top)+'px';el.style[side]=(options.offset===undefined?-80:options.offset)+'px';
  const art=document.createElement('div');art.className='fxk-art';art.setAttribute('role','img');
  const speech=document.createElement('div');speech.className='fxk-speech';el.append(art,speech);stage.appendChild(el);
  function align(){speech.style.top=Math.max(12,art.offsetHeight*data.face_anchor[1]-speech.offsetHeight/2)+'px'}
  function setExpression(expression){
   if(expression==='default'){art.style.backgroundImage='url("'+url(data.portrait)+'")';art.style.backgroundSize='contain';art.style.backgroundPosition='center top';art.style.height=(width*1300/1038)+'px'}
   else{const pose=data.expressions.find(e=>e.id===expression);if(!pose)throw new Error('Unknown expression '+expression+' for '+data.name);art.style.backgroundImage='url("'+url(data.sheet)+'")';art.style.backgroundSize='200% 200%';art.style.backgroundPosition=(pose.column*100)+'% '+(pose.row*100)+'%';art.style.height=(width*data.sheet_size[1]/data.sheet_size[0])+'px'}
   el.dataset.expression=expression;art.setAttribute('aria-label',data.name+' '+expression);align();
  }
  const actor={element:el,setExpression,show(text){if(text!==undefined){speech.innerHTML=text;align()}el.classList.add('fxk-visible');return actor},hide(){el.classList.remove('fxk-visible');return actor},destroy(){actors.delete(actor);el.remove()}};
  setExpression(options.expression||'explain');actors.add(actor);return actor;
 }
 function timeline(options){
  const stage=stageOf(options.stage||'#stage');if(!stage)throw new Error('Timeline stage not found');
  const progress=document.createElement('div');progress.className='fxk-progress';progress.innerHTML='<div class="fxk-topic"><span></span><span class="fxk-time"></span></div><div class="fxk-track"><div class="fxk-fill"></div><div class="fxk-marker"></div></div>';
  const captions=document.createElement('div');captions.className='fxk-captions';captions.innerHTML='<span></span>';stage.append(progress,captions);
  const cues=options.captions||[],duration=options.total||options.duration||12,start=options.start||0;
  const topics=options.topics||[{start:0,title:options.title||'当前主题'}];let lastText=null;
  const fmt=t=>String(Math.floor(t/60)).padStart(2,'0')+':'+String(Math.floor(t%60)).padStart(2,'0');
  const layer={tick(ms){const t=start+ms/1000,p=clamp(t/duration),topic=[...topics].reverse().find(c=>t>=c.start)||topics[0],cue=cues.find(c=>t>=c.start&&t<c.end),text=cue?cue.text:'';
   progress.querySelector('.fxk-topic span').textContent='当前内容 · '+topic.title;progress.querySelector('.fxk-time').textContent=fmt(t)+' / '+fmt(duration);progress.querySelector('.fxk-fill').style.width=(p*100)+'%';progress.querySelector('.fxk-marker').style.left=(p*100)+'%';
   if(text!==lastText){lastText=text;captions.firstElementChild.innerHTML=escape(text).replace(/(Gamma|Delta|Alpha|GEX|VIX|SPX|\d+(?:\.\d+)?%?)/g,'<em>$1</em>')}captions.style.opacity=text?1:0;
  },destroy(){layers.delete(layer);progress.remove();captions.remove()}};
  layers.add(layer);layer.tick(0);return layer;
 }
 global.FXKurumi={manifest,mount,timeline,tick(ms){for(const layer of layers)layer.tick(ms)}};
})(window);
