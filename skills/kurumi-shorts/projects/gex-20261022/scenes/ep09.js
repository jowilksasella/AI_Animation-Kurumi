/* ep09 看不清的账本 — beats on word starts (python tools/brief.py ep09).
   EXT-BB2021 = Barbon & Buraschi, "Gamma Fragility", working paper (2021-03 version, SSRN); not a journal publication. */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['账本','工作论文','伽马脆弱性','纳斯达克','库存','交易者类型','范围有限','假设','指数期权','往回推','估','正式发表']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'question'},'006':{s:'concern'},
  '007':{s:'explain'},'008':{s:'surprise'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'think'},'012':{s:'explain'},'013':{s:'question'},'014':{s:'explain'}});
const WP='外部研究｜工作论文（未正式发表）';

/* A hook: even knowing who traded, the books stay blurry */
scene(0,4.07,C.compose([[0,'ext',WP]],
  C.headline({html:'就算知道每笔交易<br>是<b>谁</b>做的',at:0,size:64,top:60,align:'center'}),
  C.custom(`<div class="abs ledger"><b>做市商账本</b>${[...Array(6)].map(()=>'<i></i>').join('')}</div><div class="abs blurtag float">看不清</div>`,
    (t,el)=>{pop(el.querySelector('.ledger'),t,1.6);el.querySelector('.ledger').style.filter=`blur(${8*eo(seg(t,2.3,2.9))}px)`;slam(el.querySelector('.blurtag'),t,2.44,.35,-4)})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(1.6,'pop',.45);sound(2.44,'hit',.65);shake(2.5,10);

/* B what's missing? */
scene(4.07,5.28,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'还差<b>什么</b>？',at:4.13,size:120,top:280,align:'center'})));
sound(4.13,'whoosh',.4);

/* C Barbon & Buraschi, "Gamma Fragility" */
scene(5.28,11.35,C.compose([[0,'ext',WP]],
  C.flow({top:90,h:140,gap:50,items:[{at:5.39,html:'巴尔邦 · 布拉斯基'},{at:7.08,html:'工作论文《<b>伽马脆弱性</b>》',color:'#d6f1f1'},{at:9.26,html:'纳斯达克 <b class="num">3</b> 家交易所的数据',color:'#f3efe6'}]})));
sound(5.39,'pop',.45);sound(7.72,'hit',.5);sound(9.84,'pop',.45);

/* D classified by trader type, used to rebuild inventories */
scene(11.35,16.88,C.compose([[0,'ext',WP]],
  C.flow({top:110,h:160,gap:70,items:[{at:12.1,html:'按<b>交易者类型</b>分类'},{at:14.06,html:'还原个股期权上<br>做市商的<b>库存</b>',color:'#ffe14d'}]})));
sound(12.3,'pop',.45);sound(16.14,'hit',.55);

/* E how much does it cover? */
scene(16.88,19.62,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'能覆盖<b>多少</b>？',at:16.95,size:110,top:280,align:'center'})));
sound(16.95,'whoosh',.4);

/* F about 10–20% of US single-stock option dollar volume */
scene(19.62,24.42,C.compose([[0,'ext',WP]],
  C.headline({html:'美国个股期权<br>美元成交量的',at:20.8,size:60,top:70,align:'center'}),
  C.headline({html:'约 <b class="num">10–20%</b>',at:22.6,size:150,top:280,align:'center'}),
  C.custom(`<div class="abs chip5 float">范围有限</div>`,(t,el)=>slam(el.firstChild,t,23.59,.35,-3))));
sound(22.6,'hit',.65);punch(22.7,1.07);sound(23.59,'pop',.5);

/* G sample period */
scene(24.42,27.98,C.compose([[0,'ext',WP+'｜表 I']],
  C.headline({html:'样本期间',at:24.49,size:84,top:80,align:'center'}),
  C.tiles({cols:2,top:300,h:280,items:[{at:25.5,html:'<span class="num big2">2010</span><small>年底</small>'},{at:26.66,html:'<span class="num big2">2020</span><small>年 5 月</small>',hot:true}]})));
sound(25.5,'pop',.45);sound(26.66,'pop',.45);

/* H no more guessing? */
scene(27.98,30.71,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'这样就不用<br><b>猜</b>了吧？',at:28.05,size:100,top:250,align:'center'})));
sound(29.18,'hit',.5);

/* I better for single stocks, still an assumption about who hedges */
scene(30.71,35.62,C.compose([[0,'ext',WP+'｜§II.B']],
  C.points({top:100,step:220,lines:[{at:31.1,mark:'ok',html:'个股上<b>好一些</b>'},{at:32.18,html:'但还得假设：<br>只有<b>交易商</b>和<b>做市商</b>对冲'}]})));
sound(31.1,'pop',.45);sound(32.68,'hit',.5);

/* J no index options: back to the white paper's assumption */
scene(35.62,41.07,C.compose([[0,'ext',WP+'｜§III.A']],
  C.points({top:90,step:180,lines:[{at:36.3,mark:'x',html:'数据<b>不含</b>指数期权'}]}),
  C.flow({top:300,h:140,gap:50,items:[{at:37.5,html:'测<b>标普</b>时'},{at:38.54,html:'又回到：投资者<b>卖看涨、买看跌</b>',color:'#ffe14d'}]})));
sound(36.42,'hit',.5);sound(37.66,'pop',.45);sound(40.44,'hit',.55);

/* K index results rest on assumptions too (OURS) */
scene(41.07,44.79,C.compose([[0,'ours','我们的小结']],
  C.vs({top:90,h:360,badge:'一样',vsAt:43.22,left:{at:41.42,html:'论文的<br><span class="big">指数部分</span>'},right:{at:42.72,html:'<span class="big">白皮书</span>'}}),
  C.headline({html:'都建立在<b>假设</b>上',at:43.72,size:72,top:560,align:'center'})));
sound(41.42,'pop',.45);sound(42.72,'pop',.45);sound(44.06,'hit',.6);

/* L inventories are pushed back trade by trade */
scene(44.79,48.39,C.compose([[0,'ext',WP+'｜§II.B']],
  C.flow({top:110,h:160,gap:70,items:[{at:45.02,html:'还原<b>库存</b>'},{at:46.42,html:'从交易量<b>一笔笔往回推</b>',color:'#ffe14d'}]})));
sound(45.02,'pop',.45);sound(47.66,'hit',.5);

/* M even now, only estimates (OURS) */
scene(48.39,51.85,C.compose([[0,'ours','我们的小结']],
  C.headline({html:'做市商的账本<br>到现在都',at:48.72,size:72,top:90,align:'center'}),
  C.headline({html:'只能<b>估</b>',at:51.12,size:150,top:380,align:'center'})));
sound(51.12,'hit',.7);punch(51.15,1.08);

/* N version: March 2021 working paper, not formally published */
scene(51.85,99,C.compose([[0,'ext','版本说明']],
  C.tiles({cols:1,top:100,h:150,gap:40,items:[{at:52.66,html:'<span class="num">2021</span> 年 <span class="num">3</span> 月'},{at:53.84,html:'<b>工作论文</b>版本'},{at:54.84,html:'<b>没有</b>正式发表',hot:true}]})));
sound(52.66,'pop',.45);sound(53.84,'pop',.45);sound(54.84,'hit',.55);
