/* ep01 恐慌指数的盲区 (v2, Insta pacing). Beat times follow timing/ep01.words.json (word starts).
   Tags: blue = white paper, amber = our analogy/reading (source-map.md). */
const {seg,eo,back,spring,lerp,rng,appear,vis,pop,slam,sparks}=K;
keywords(['恐慌指数','标准差','相关性','伽马敞口','温度计','白皮书','波动聚集','更尖','差不多','回头看','预测未来','低位']);

cast({
  '001':{s:'explain',l:'think'}, '002':{s:'surprise',l:'explain'}, '003':{s:'explain',l:'think'},
  '004':{s:'explain',l:'think'}, '005':{s:'concern',l:'surprise'}, '006':{s:'explain',l:'think'},
  '007':{s:'explain',l:'think',s2:[[27.78,'surprise']]}, '008':{s:'question',l:'think',s2:[[32.6,'explain']]},
  '009':{s:'concern',l:'surprise',s2:[[35.4,'explain']]}, '010':{s:'surprise',l:'surprise'}, '011':{s:'question',l:'think'},
  '012':{s:'think',l:'think',s2:[[47.6,'explain']]}, '013':{s:'explain',l:'surprise'},
});

/* ---- A 0–6.95 hook: VIX 12 = 15 ?! ---- */
function gauge(v){
  const ang=x=>Math.PI-(x-10)/30*Math.PI;let ticks='';
  for(let x=10;x<=40;x+=5){const a=ang(x),c=Math.cos(a),s=Math.sin(a);
    ticks+=`<line x1="${210+150*c}" y1="${220-150*s}" x2="${210+178*c}" y2="${220-178*s}" stroke="#15202b" stroke-width="6" stroke-linecap="round"/><text x="${210+118*c}" y="${232-118*s}" text-anchor="middle" class="num" font-size="30" font-weight="700" fill="#5f6b75">${x}</text>`}
  return `<svg viewBox="0 0 420 260" width="420" height="260"><defs><linearGradient id="gg${v}" x1="0" x2="1"><stop offset="0" stop-color="#20a35a"/><stop offset=".5" stop-color="#f2a516"/><stop offset="1" stop-color="#e5383b"/></linearGradient></defs>
    <path d="M40 220 A170 170 0 0 1 380 220" fill="none" stroke="url(#gg${v})" stroke-width="30" stroke-linecap="round"/>${ticks}
    <g class="needle"><line x1="210" y1="220" x2="210" y2="70" stroke="#15202b" stroke-width="12" stroke-linecap="round"/></g><circle cx="210" cy="220" r="20" fill="#15202b"/></svg>`;
}
scene(0,6.95,C.compose([[0,'paper','白皮书 p2'],[4.08,'q','萌智子的疑问']],
  C.headline({html:'<span class="num">VIX</span> <b class="num">12</b> = <b class="num">15</b> ？！',at:0,size:120,top:70,align:'center'}),
  C.custom(`<div class="abs gz g0" style="left:40px;top:300px">${gauge(12)}<div class="gv num">12</div></div>
    <div class="abs gz g1" style="left:540px;top:300px">${gauge(15)}<div class="gv num">15</div></div>
    <div class="abs approx num float">≈</div><div class="abs qm float">?</div>
    <div class="abs note n1">预测第二天的波动 <b>几乎一样</b></div><div class="abs note n2">15 不是<b>更紧张</b>吗？</div>`,
    (t,el)=>{const nd=el.querySelectorAll('.needle');
      el.querySelectorAll('.gz').forEach((g,i)=>pop(g,t,.5+i*.15));
      [[12,1.66],[15,2.16]].forEach(([v,at],i)=>{const x=lerp(10,v,spring(seg(t,at-.2,at+.6))),wob=i===1?Math.sin(t*30)*6*seg(t,5.0,5.1)*(1-seg(t,5.1,5.9)):0;
        nd[i].setAttribute('transform',`rotate(${(x-10)/30*180-90+wob} 210 220)`)});
      slam(el.querySelector('.approx'),t,2.74,.35,0);vis(el.querySelector('.n1'),appear(t,2.9)*(1-seg(t,4.0,4.2)));
      pop(el.querySelector('.qm'),t,4.18);slam(el.querySelector('.n2'),t,5.08,.35,2)})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(1.66,'tick',.4);sound(2.16,'tick',.4);
punch(2.74,1.06);sound(2.74,'hit',.55);shake(4.15,12);sound(4.18,'pop',.6);sound(5.08,'hit',.45);

/* ---- B 6.95–9.25 the white paper ---- */
scene(6.95,9.25,Object.assign(C.compose([[0,'paper','白皮书 p2']],
  C.paperTitle({caption:'SqueezeMetrics｜2016 首发 · 2017 修订',at:7.0,stamp:'白皮书'}),
  C.headline({html:'一份期权<b>白皮书</b>的发现',at:8.58,top:560,size:64,align:'center'})),{enter:'up'}));
sound(7.0,'whoosh',.4);sound(7.7,'hit',.5);punch(7.7,1.05);sound(8.58,'pop',.4);

/* ---- C 9.25–12.52 sort daily VIX closes into quartiles ---- */
const vixDays=(()=>{const r=rng(7),a=[];for(let i=0;i<40;i++){const u=r();a.push(10+28*Math.pow(u,1.8)+r()*2)}return a})();
const rankOf=[];vixDays.map((v,i)=>[v,i]).sort((a,b)=>a[0]-b[0]).forEach(([,idx],rank)=>rankOf[idx]=rank);
scene(9.25,12.52,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'每天的 <span class="num">VIX</span> 收盘值<br><b>从低到高</b>排队',at:9.3,size:60}),
  C.custom(`<div class="abs bars">${vixDays.map(v=>`<i style="height:${(v-6)*10}px"></i>`).join('')}</div>
    <div class="abs quarts">${['最低','次低','次高','最高'].map((s,i)=>`<span class="q${i}">${s}<small>25%</small></span>`).join('')}</div>`,
    (t,el)=>{const sp=K.eio(seg(t,10.66,11.4)),split=back(seg(t,11.44,11.8));
      el.querySelectorAll('.bars i').forEach((b,i)=>{const q=Math.floor(rankOf[i]/10),h=spring(seg(t,9.5+i*.015,9.9+i*.015));
        b.style.left=lerp(i,rankOf[i],sp)*21.5+q*16*split+'px';b.style.transform=`scaleY(${h})`;b.className=split>0.02?'q'+q:''});
      el.querySelectorAll('.quarts span').forEach((s,i)=>pop(s,t,11.78+i*.12))})));
sound(9.3,'whoosh',.4);sound(10.66,'whoosh',.35);[11.78,11.9,12.02,12.14].forEach(x=>sound(x,'tick',.4));punch(11.44,1.05);

/* ---- D 12.52–21.12 next-day standard deviation: 0.51% vs 0.66% ---- */
scene(12.52,21.12,C.compose([[0,'paper','白皮书 p2']],
  C.bars({title:'标普第二天涨跌的<b>标准差</b>',max:.8,
    rows:[{label:'VIX 最低 25%',value:.51,color:'#20a35a',at:12.7,grow:[13.0,14.0],count:[15.68,16.5],suffix:'%'},
          {label:'VIX 次低 25%',value:.66,color:'#1f7ae0',at:17.09,grow:[17.3,18.3],count:[18.6,19.3],suffix:'%'}],
    gap:{at:19.83,text:'只差 <b class="num">0.15</b>'},quote:{img:'WP-P2-VIX-QUART',at:13.6,until:19.6}})));
sound(12.6,'whoosh',.4);sound(16.5,'sparkle',.6);punch(16.5,1.06);sound(19.3,'sparkle',.6);punch(19.3,1.05);sound(19.95,'hit',.6);shake(19.95,8);

/* ---- E 21.12–24.78 thermometer analogy (OURS) ---- */
const thermo=(()=>{const pos={10:520,12:506,15:486,20:400,25:330,30:262,35:196,40:130};let s='';
  for(const [v,y] of Object.entries(pos))s+=`<line x1="150" x2="${v%10?178:190}" y1="${y}" y2="${y}" stroke="#15202b" stroke-width="6" stroke-linecap="round"/><text x="200" y="${y+12}" class="num" font-size="${v==12||v==15?40:32}" font-weight="700" fill="${v==12||v==15?'#e5383b':'#5f6b75'}">${v}</text>`;
  return `<svg width="300" height="640" viewBox="0 0 300 640"><rect x="92" y="80" width="56" height="470" rx="28" fill="#fff" stroke="#15202b" stroke-width="7"/>
    <rect class="merc" x="106" y="520" width="28" height="60" rx="14" fill="#e5383b"/><circle cx="120" cy="572" r="48" fill="#e5383b" stroke="#15202b" stroke-width="7"/>${s}</svg>`})();
scene(21.12,24.78,C.compose([[0,'ours','我们的比喻']],
  C.headline({html:'像一支<b>温度计</b>',at:21.3,size:72,top:70}),
  C.custom(`<div class="abs therm">${thermo}</div><div class="abs crowd float">低温那一段<br><b>刻度全挤在一起</b></div><div class="abs ring float"></div>`,
    (t,el)=>{pop(el.querySelector('.therm'),t,21.25);
      const m=el.querySelector('.merc'),h=lerp(10,92,spring(seg(t,22.32,22.9)));m.setAttribute('y',580-h);m.setAttribute('height',h);
      slam(el.querySelector('.crowd'),t,23.46,.35,-3);pop(el.querySelector('.ring'),t,23.46)})));
sound(21.2,'whoosh',.4);sound(22.32,'pop',.4);sound(23.46,'hit',.6);punch(23.46,1.08);

/* ---- F 24.78–29.96 the p3 figure, annotated with our reading ---- */
scene(24.78,29.96,C.compose([[0,'paper','白皮书 p3｜标注是我们的读图']],
  C.figure({img:'WP-P3-FIG-VIX',size:[797,621],at:24.85,
    legend:[['#227593','深蓝 = 次低组'],['#a9d47b','浅绿 = 最低组']],
    zoom:{at:28.0,center:[413,110],s:1.35},
    marks:[{at:26.38,span:[252,553,505]},{at:28.6,ellipse:[415,112,30,48]}],
    callouts:[{at:26.64,pos:[520,330],html:'① 宽度<b>差不多</b>'},{at:29.06,pos:[470,40],html:'② 中间<b>更尖</b>'}]})));
sound(24.85,'whoosh',.4);sound(26.38,'pop',.45);sound(28.0,'whoosh',.35);sound(28.6,'pop',.5);sound(29.06,'hit',.5);

/* ---- G 29.96–34.2 our reading: low readings lose resolution ---- */
const scaleX=v=>60+(v-10)/30*880;
scene(29.96,34.2,C.compose([[0,'ours','我们的解读']],
  C.points({lines:[{at:30.12,mark:'x',strike:31.4,html:'<span class="num">VIX</span> 没用'},
                   {at:32.62,mark:'ok',html:'<b>低位</b>时分不出<b>细微差别</b>'}],top:90,step:160}),
  C.custom(`<div class="abs scl"><div class="bar"></div>${[10,15,20,25,30,35,40].map(v=>`<span class="tk num" style="left:${scaleX(v)}px">${v}</span>`).join('')}
    <div class="zone float"></div><span class="mk num m12 float">12</span><span class="mk num m15 float">15</span></div>`,
    (t,el)=>{vis(el.querySelector('.scl'),appear(t,30.4));const z=back(seg(t,33.18,33.6));
      el.querySelector('.zone').style.transform=`scaleX(${z})`;el.querySelector('.zone').style.opacity=z>0?1:0;
      el.querySelector('.m12').style.left=scaleX(12)-14+'px';el.querySelector('.m15').style.left=scaleX(15)+14+'px'})));
sound(30.12,'hit',.5);sound(31.4,'tick',.5);shake(31.4,8);sound(32.62,'hit',.5);punch(32.62,1.05);sound(33.18,'pop',.4);

/* ---- H 34.2–35.36 sting ---- */
scene(34.2,35.36,Object.assign(C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'还有<br><b>更扎心的</b>…',at:34.24,size:110,top:200,align:'center'})),{enter:'zoom'}));
flash(34.24,.25);shake(34.54,16,.5);sound(34.24,'hit',.8);

/* ---- I 35.36–42.35 correlation with the future vs the past month ---- */
scene(35.36,42.35,C.compose([[0,'paper','白皮书 p2｜数据来自 CBOE']],
  C.bars({title:'<span class="num">VIX</span> 和实际波动的<b>相关性</b>',max:1,
    rows:[{label:'→ 未来 1 个月',value:.75,color:'#7aa7d6',at:35.84,grow:[36.0,37.0],count:[38.12,38.7]},
          {label:'← 过去 1 个月',value:.85,color:'#e5383b',at:39.38,grow:[39.5,40.5],count:[41.56,42.1]}],
    badge:{at:40.66,row:1,text:'更高！'},note:{at:37.2,text:'1 = 完全同步　0 = 毫无关系'}})));
sound(35.4,'whoosh',.4);sound(38.7,'sparkle',.6);punch(38.7,1.05);sound(40.66,'hit',.6);shake(40.7,10);sound(42.1,'sparkle',.6);punch(42.05,1.06);

/* ---- J 42.35–45.85 forecasting or looking back? ---- */
scene(42.35,45.85,C.compose([[0,'q','作者的疑问']],
  C.headline({html:'它到底在看<b>哪一边</b>？',at:42.68,size:68,top:80,align:'center'}),
  C.custom(`<div class="abs tl"><div class="line"></div><div class="dot"><span class="num">VIX</span><small>今天</small></div>
      <div class="side L"><span class="ar">◀</span>回头看</div><div class="side R">预测未来<span class="ar">▶</span></div></div>`,
    (t,el)=>{pop(el.querySelector('.dot'),t,42.45);const R=el.querySelector('.R'),L=el.querySelector('.L'),a=seg(t,43.64,43.9),b=seg(t,45.1,45.35);
      R.style.opacity=.25+.75*a*(1-.7*b);R.style.transform=`translateX(${18*Math.sin(t*9)*a*(1-b)}px) scale(${1+.15*a*(1-b)})`;
      L.style.opacity=.25+.75*b;L.style.transform=`translateX(${-18*Math.sin(t*9)*b}px) scale(${1+.15*b})`})));
sound(42.45,'whoosh',.4);sound(43.64,'pop',.5);sound(45.1,'pop',.5);

/* ---- K 45.85–47.56 the author's doubt, original text ---- */
scene(45.85,47.56,C.compose([[0,'paper','白皮书 p2：作者的质疑']],
  C.quote({heading:'作者也在<b>质疑</b>这一点',img:'WP-P2-VIX-CORR',at:45.91,top:120,sweepAt:46.4})));
sound(45.91,'whoosh',.4);sound(46.78,'hit',.45);

/* ---- L 47.56–51.49 volatility clustering (OURS) ---- */
const rets=(()=>{const r=rng(3),a=[];for(let i=0;i<56;i++){const hi=(i>=10&&i<20)||(i>=36&&i<45);a.push((r()+r()+r()-1.5)*2*(hi?1:.28))}return a})();
scene(47.56,51.49,C.compose([[0,'ours','我们的补充']],
  C.headline({html:'大波动常常<b>扎堆</b>出现',at:47.64,size:64}),
  C.custom(`<div class="abs rets">${rets.map((v,i)=>`<i style="left:${i*16.5}px;height:${Math.abs(v)*90+6}px;${v>=0?'bottom:200px':'top:200px'}" class="${Math.abs(v)>.6?'big':''}"></i>`).join('')}<div class="axis"></div>
      <div class="hz float" style="left:${10*16.5-6}px;width:${10*16.5}px"></div><div class="hz float" style="left:${36*16.5-6}px;width:${9*16.5}px"></div></div>
    <div class="abs sub2 float">所以“回头看”<br>也不全是坏事</div>`,
    (t,el)=>{el.querySelectorAll('.rets i').forEach((b,i)=>{const p=spring(seg(t,47.8+i*.018,48.1+i*.018));b.style.transform=`scaleY(${p})`});
      el.querySelectorAll('.hz').forEach((h,i)=>pop(h,t,48.7+i*.25));slam(el.querySelector('.sub2'),t,49.78,.35,-2)})));
sound(47.64,'whoosh',.4);sound(48.7,'pop',.45);sound(48.95,'pop',.45);sound(49.78,'hit',.5);punch(49.78,1.05);

/* ---- M 51.49–end a finer ruler: gamma exposure ---- */
scene(51.49,99,C.compose([[0,'next','下一集']],
  C.headline({html:'换一把<b>更细的尺子</b>',at:51.6,size:72}),
  C.custom(`<div class="abs ruler rA"><span class="rl">恐慌指数 <span class="num">VIX</span></span><div class="rb">${[...Array(7)].map((_,i)=>`<i style="left:${i*140}px"></i>`).join('')}</div></div>
    <div class="abs ruler rB"><span class="rl">伽马敞口 <span class="num">GEX</span></span><div class="rb">${[...Array(61)].map((_,i)=>`<i class="${i%10?'s':''}" style="left:${i*14}px"></i>`).join('')}</div></div>
    <div class="abs nextchip">下一集｜一把更细的尺子</div>`,
    (t,el)=>{vis(el.querySelector('.rA'),appear(t,51.8));vis(el.querySelector('.rB'),appear(t,52.78));
      el.querySelectorAll('.rB i').forEach((f,i)=>{const p=spring(seg(t,52.9+i*.012,53.2+i*.012));f.style.transform=`scaleY(${p})`});
      const g=el.querySelector('.rB .rl');g.style.transform=`scale(${1+.25*Math.sin(Math.PI*seg(t,54.09,54.6))})`;pop(el.querySelector('.nextchip'),t,54.6)})));
sound(51.6,'whoosh',.4);sound(52.9,'tick',.4);sound(54.09,'hit',.7);flash(54.09,.25);punch(54.09,1.08);sound(54.6,'sparkle',.6);
