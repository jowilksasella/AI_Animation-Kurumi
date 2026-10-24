/* ep08 被期刊借走的假设 — beats on word starts (python tools/brief.py ep08).
   EXT-BDLM2021 = Baltussen, Da, Lammers & Martens, Journal of Financial Economics 2021 (§4.1, §4.3, footnotes 7–8). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['期刊论文','假设','德尔塔','对冲','对冲区间','成本','风险','金融经济学期刊','估算','账本','间断','收盘','软肋','检验']);
cast({'001':{s:'explain'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'think'},'009':{s:'explain'},'010':{s:'question'},'011':{s:'explain'}});

/* A hook: a journal paper borrowed the algorithm */
scene(0,4.05,C.compose([[0,'ext','外部研究']],
  C.vs({top:120,h:400,badge:'→',vsAt:3.06,left:{at:.28,html:'这份<span class="big">白皮书</span>的算法'},right:{at:2.4,html:'一篇<span class="big">期刊论文</span>',color:'#d6f1f1'}}),
  C.headline({html:'原样<b>借走</b>了',at:3.43,size:96,top:600,align:'center'})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(2.4,'pop',.5);sound(3.43,'hit',.7);shake(3.5,12);

/* B borrowed what? */
scene(4.05,5.88,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'借走了<b>什么</b>？',at:4.2,size:110,top:280,align:'center'})));
sound(4.2,'whoosh',.4);

/* C four assumptions; #1 every trade has a delta hedger */
scene(5.88,11.5,C.compose([[0,'paper','白皮书 p4 假设 1']],
  C.stat({at:6.03,count:[6.03,6.5],value:4,suffix:' 个假设',top:60,color:'var(--ink)'}),
  C.tiles({cols:1,top:330,h:130,gap:24,items:[{at:7.32,html:'① 谁买谁卖'},{at:8.68,html:'② 每笔交易都有一方做<b>德尔塔对冲</b>',hot:true}]})));
sound(6.3,'sparkle',.5);sound(7.32,'pop',.45);sound(10.62,'hit',.5);

/* D another: hedge exactly to delta; in reality, hedge bands */
scene(11.5,16.92,C.compose([[0,'paper','白皮书 p5 假设 4']],
  C.points({top:90,step:200,lines:[{at:12.7,mark:'x',strike:15.2,html:'<b>精确</b>按德尔塔对冲'},{at:15.62,mark:'ok',html:'现实：用<b>对冲区间</b>'}]})));
sound(12.88,'hit',.5);sound(14.82,'tick',.5);sound(16.06,'hit',.55);

/* E hedge band: adjust only past a threshold, balancing cost and risk (illustration) */
scene(16.92,21.41,C.compose([[0,'paper','白皮书 p5（区间为示意）']],
  C.custom(`<div class="abs band"><i class="zone"></i><i class="mid"></i><svg width="900" height="380" viewBox="0 0 900 380"><path class="dl" d="M0 190 C90 150 160 230 240 170 S380 120 460 210 S600 280 660 300" fill="none" stroke="#15202b" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/></svg>
      <span class="adj float">调整！</span></div><div class="abs bal">在<b>成本</b>和<b>风险</b>之间平衡</div>`,
    (t,el)=>{el.querySelector('.dl').style.strokeDashoffset=100-100*eo(seg(t,17.0,18.5));pop(el.querySelector('.adj'),t,18.42);vis(el.querySelector('.bal'),appear(t,19.6))})));
sound(17.18,'whoosh',.4);sound(18.42,'hit',.6);shake(18.5,10);sound(20.16,'pop',.45);

/* F Baltussen et al. 2021 used exactly these four */
scene(21.41,27.28,C.compose([[0,'ext','外部研究｜期刊论文']],
  C.flow({top:90,h:140,gap:50,items:[{at:21.53,html:'巴尔图森等<b>四位</b>学者'},{at:23.3,html:'<span class="num">2021</span> 年',color:'#f3efe6'},{at:24.04,html:'《金融经济学期刊》',color:'#d6f1f1'}]}),
  C.custom(`<div class="abs chip4 float">用的正是这 <b class="num">4</b> 条</div>`,(t,el)=>slam(el.firstChild,t,26.36,.35,-2))));
sound(21.53,'pop',.45);sound(23.3,'pop',.45);sound(24.26,'hit',.5);sound(26.36,'hit',.6);punch(26.4,1.06);

/* G later data also from SqueezeMetrics; no OTC or end-investor positions */
scene(27.28,34.04,C.compose([[0,'ext','外部研究｜论文脚注']],
  C.headline({html:'后几年的数据<br>还来自 <span class="num">SqueezeMetrics</span>',at:27.44,size:60,top:70,align:'center'}),
  C.points({top:380,step:150,lines:[{at:31.5,mark:'x',html:'没有<b>场外</b>持仓'},{at:32.34,mark:'x',html:'没有<b>终端投资者</b>持仓'}]})));
sound(28.61,'pop',.45);sound(31.5,'hit',.45);sound(32.44,'hit',.45);

/* H an estimate, not the market makers' books */
scene(34.04,38.86,C.compose([[0,'ext','外部研究｜§4.1']],
  C.vs({top:180,h:420,badge:'≠',vsAt:36.97,left:{at:36.25,html:'<span class="big">估算</span>',color:'#ffe14d'},right:{at:37.78,html:'直接看到<br>做市商的<span class="big">账本</span>'}})));
sound(36.3,'hit',.5);sound(38.24,'pop',.45);

/* I intermittent hedging during the day, adjust before the close */
scene(38.86,44.95,C.compose([[0,'ext','外部研究｜§4.3']],
  C.headline({html:'有<b>交易成本</b>，所以',at:39.84,size:64,top:70,align:'center'}),
  C.tiles({cols:1,top:240,h:160,gap:40,items:[{at:41.5,html:'白天：<b>间断</b>对冲'},{at:43.48,html:'<b>收盘前</b>再调整',hot:true}]})));
sound(40.02,'whoosh',.4);sound(42.12,'pop',.45);sound(44.28,'hit',.55);

/* J hits the weak spot of assumption 4 (OURS) */
scene(44.95,49.25,C.compose([[0,'ours','我们的对照（假设 4）']],
  C.headline({html:'戳中第四个假设的<b>软肋</b>',at:45.06,size:64,top:70,align:'center'}),
  C.points({top:300,step:180,lines:[{at:47.14,mark:'x',strike:48.6,html:'价格一动就对冲'}]})));
sound(45.46,'hit',.6);shake(45.6,12);sound(48.6,'tick',.5);

/* K worth testing seriously (OURS) */
scene(49.25,99,C.compose([[0,'ours','我们的小结']],
  C.headline({html:'能被期刊<b>借用</b>',at:49.6,size:80,top:110,align:'center'}),
  C.tiles({cols:1,top:380,h:220,items:[{at:51.62,html:'至少值得<b>认真检验</b>',hot:true}]})));
sound(50.02,'pop',.45);sound(52.24,'sparkle',.6);punch(52.3,1.05);
