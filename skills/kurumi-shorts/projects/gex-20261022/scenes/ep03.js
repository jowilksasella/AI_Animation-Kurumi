/* ep03 期权会推着股价走 — beats on word starts (python tools/brief.py ep03).
   EXT-NPP2005 = Ni, Pearson & Poteshman, Journal of Financial Economics 2005; EXT-AL2003 = Avellaneda & Lipkin, Quantitative Finance 2003. */
const {seg,eo,appear,vis,pop,slam,rng}=K;
keywords(['钉住','行权价','做市商','对冲','金融经济学期刊','定量金融','模型','可能','上市','到期']);
cast({'001':{s:'explain'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'concern'},'009':{s:'explain'},'010':{s:'think',s2:[[43.64,'explain']]},'011':{s:'explain'},'012':{s:'explain'}});

/* price path that wanders and converges onto the strike line (illustration) */
function pinChart(seed){const r=rng(seed);let d='',y=0,v=0;
  for(let i=0;i<=120;i++){const x=40+i*7.5,amp=1-Math.pow(i/120,1.6);v=v*.8+(r()-.5)*26;y=y*.86+v;const yy=300+y*amp*1.2;d+=(i?'L':'M')+x.toFixed(1)+' '+yy.toFixed(1)}
  return `<svg class="abs pin" width="1000" height="560" viewBox="0 0 1000 560" style="top:170px"><line x1="30" x2="970" y1="300" y2="300" stroke="#e5383b" stroke-width="5" stroke-dasharray="16 12"/>
    <text x="40" y="285" font-size="34" font-weight="900" fill="#e5383b">行权价 <tspan class="num">100</tspan></text>
    <path d="${d}" fill="none" stroke="#15202b" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" pathLength="100" stroke-dasharray="100" class="px"/>
    <g class="pinhead"><circle cx="940" cy="300" r="26" fill="#e5383b" stroke="#15202b" stroke-width="5"/><line x1="940" y1="326" x2="940" y2="370" stroke="#15202b" stroke-width="7" stroke-linecap="round"/></g>
    <text x="900" y="420" font-size="32" font-weight="800" fill="#5f6b75" text-anchor="end">到期日</text></svg>`}

/* A hook: pinned on expiry day */
scene(0,2.85,C.compose([[0,'ext','外部研究']],
  C.headline({html:'到期日股价被<b>钉住</b>？',at:0,size:76,top:60,align:'center'}),
  C.custom(pinChart(5),(t,el)=>{el.querySelector('.px').style.strokeDashoffset=100-100*eo(seg(t,.2,2.1));const h=el.querySelector('.pinhead');
    const p=seg(t,2.3,2.6);h.style.opacity=p>0?1:0;h.style.transform=`translateY(${(1-eo(p))*-120}px)`})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(2.3,'hit',.7);shake(2.35,12);

/* B who is that strong? */
scene(2.85,5.14,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'谁有这么大的<br><b>力气</b>？',at:2.92,size:100,top:250,align:'center'})));
sound(2.92,'whoosh',.4);shake(4.32,12);sound(4.32,'hit',.5);

/* C Ni, Pearson & Poteshman 2005 */
scene(5.14,11.39,C.compose([[0,'ext','外部研究｜期刊论文']],
  C.flow({top:110,h:150,gap:60,items:[{at:5.5,html:'倪 · 皮尔逊 · 波特斯曼'},{at:8.02,html:'<span class="num">2005</span> 年',color:'#f3efe6'},{at:9.14,html:'《金融经济学期刊》',color:'#d6f1f1'}]})));
sound(5.5,'pop',.45);sound(8.02,'pop',.45);sound(9.14,'hit',.5);

/* D finding: closes cluster near the strike (illustration) */
scene(11.39,16.34,C.compose([[0,'ext','研究发现（示意图）']],
  C.headline({html:'到期日收盘价<br>更容易落在<b>行权价</b>附近',at:11.64,size:58}),
  C.custom(`<div class="abs hist">${[2,3,4,6,9,16,40,15,8,5,3].map((h,i)=>`<i class="${i===6?'hot':''}" style="left:${i*82}px;height:${h*9}px"></i>`).join('')}<div class="axis"></div>
      <span class="num s1">95</span><span class="num s2">100</span><span class="num s3">105</span></div><div class="abs illu">示意，非研究数据</div>`,
    (t,el)=>{el.querySelectorAll('.hist i').forEach((b,i)=>{const p=K.spring(seg(t,12.4+i*.06,12.9+i*.06));b.style.transform=`scaleY(${p})`});
      pop(el.querySelector('.s2'),t,15.4);vis(el.querySelector('.illu'),appear(t,12.6))})));
sound(12.4,'whoosh',.4);sound(15.4,'sparkle',.6);punch(15.4,1.06);

/* E strike price (OURS definition) */
scene(16.34,21.77,C.compose([[0,'ours','常识定义']],
  C.headline({html:'行权价 =<br>约定的<b>买卖价格</b>',at:17.0,size:72,top:70,align:'center'}),
  C.custom(`<div class="abs sub3">通常是整数</div>`,(t,el)=>vis(el.firstChild,appear(t,19.36))),
  C.tiles({cols:2,top:420,h:220,items:[{at:20.42,html:'<span class="num big2">100</span>'},{at:20.79,html:'<span class="num big2">105</span>',hot:true}]})));
sound(17.58,'hit',.45);sound(20.42,'pop',.45);sound(20.79,'pop',.45);

/* F Avellaneda & Lipkin 2003 */
scene(21.77,26.97,C.compose([[0,'ext','外部研究｜期刊论文']],
  C.flow({top:110,h:140,gap:56,items:[{at:21.88,html:'阿韦拉内达 · 利普金'},{at:23.27,html:'<span class="num">2003</span> 年',color:'#f3efe6'},{at:24.8,html:'《定量金融》',color:'#d6f1f1'}]}),
  C.custom(`<div class="abs refchip">白皮书参考文献也列了这篇</div>`,(t,el)=>pop(el.firstChild,t,25.9))));
sound(21.88,'pop',.45);sound(23.27,'pop',.45);sound(24.8,'hit',.5);sound(25.9,'ding',.45);

/* G mechanism in their model */
scene(26.97,33.22,C.compose([[0,'ext','外部研究｜模型机制']],
  C.flow({top:110,h:150,gap:60,items:[{at:27.04,html:'做市商要<b>对冲</b>'},{at:28.5,html:'去买卖股票',color:'#f3efe6'},{at:31.36,html:'把股价拉向<b>行权价</b>',color:'#ffe14d'}]})));
sound(27.04,'hit',.45);sound(28.5,'hit',.45);sound(32.24,'hit',.6);punch(32.24,1.06);

/* H a model possibility, not a certainty (OURS) */
scene(33.22,38.12,C.compose([[0,'ours','我们的提醒']],
  C.points({top:150,step:220,lines:[{at:34.18,mark:'ok',html:'模型里的<b>可能</b>'},{at:35.45,mark:'x',strike:37.38,html:'每只股票<b>一定</b>被钉住'}]})));
sound(34.18,'hit',.45);sound(35.45,'hit',.45);sound(37.38,'tick',.5);shake(37.4,8);

/* I not a side bet: options push prices (OURS) */
scene(38.12,41.88,C.compose([[0,'ours','我们的小结']],
  C.vs({top:200,h:420,badge:'→',vsAt:40.28,left:{at:39.26,html:'旁边的<br>赌注'},right:{at:40.68,html:'反过来<br><b>推股价</b>',color:'#ffe14d'}})));
sound(39.26,'pop',.45);sound(40.68,'hit',.6);punch(41.1,1.06);

/* J the white paper: too narrow */
scene(41.88,47.53,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'白皮书：这<b>太窄</b>了',at:42.43,size:72,top:70,align:'center'}),
  C.custom(`<div class="abs sub3 c">以前的研究，大多只看两个时刻</div>`,(t,el)=>vis(el.firstChild,appear(t,43.94))),
  C.tiles({cols:2,top:400,h:240,items:[{at:45.66,html:'期权<br><b>上市</b>'},{at:46.24,html:'期权<br><b>到期</b>'}]})));
sound(42.43,'hit',.55);sound(45.66,'pop',.45);sound(46.24,'pop',.45);

/* K what about the options that haven't expired, every day? */
scene(47.53,52.2,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'平时<b>没到期</b>的期权',at:48.62,size:72,top:70,align:'center'}),
  C.tiles({cols:5,top:330,h:200,gap:14,items:['周一','周二','周三','周四','周五'].map((d,i)=>({at:50.53+i*.18,html:d,hot:true}))}),
  C.custom(`<div class="abs sub3 c" style="top:600px">每天都在推着市场走？</div>`,(t,el)=>slam(el.firstChild,t,51.24,.35,-2))));
sound(48.62,'whoosh',.4);[0,1,2,3,4].forEach(i=>sound(50.53+i*.18,'tick',.4));sound(51.24,'hit',.5);

/* L not only on expiry day */
scene(52.2,99,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'期权的影响<br>可能<b>不只在到期那天</b>',at:52.72,size:72,top:180,align:'center'})));
sound(52.72,'whoosh',.4);sound(54.32,'hit',.6);punch(54.32,1.06);
