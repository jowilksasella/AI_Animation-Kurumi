/* ep02 一把更细的尺子 — beats on word starts (python tools/brief.py ep02). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['伽马敞口','恐慌指数','标准差','真平静','假平静','做市商','又高又窄','两种分组','直观感受']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain',s2:[[20.02,'surprise']]},
  '006':{s:'surprise'},'007':{s:'explain'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'question'},'011':{s:'think'},
  '012':{s:'explain'},'013':{s:'think',s2:[[53.52,'explain']]}});

/* A hook: two equally calm days */
scene(0,4.26,C.compose([[0,'ours','我们的概括']],
  C.headline({html:'风平浪静的<b>两天</b>',at:0,size:84,top:70,align:'center'}),
  C.vs({top:240,h:330,badge:'?',vsAt:2.82,left:{at:1.04,html:'第 1 天<br><span class="big">平静</span>'},right:{at:1.16,html:'第 2 天<br><span class="big">平静</span>'}}),
  C.headline({html:'哪天<b>更危险</b>？',at:3.38,size:72,top:640,align:'center'})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(2.82,'pop',.5);sound(3.38,'hit',.6);shake(3.4,10);

/* B which ruler? */
scene(4.26,6.65,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'什么尺子？<br>还是<b>恐慌指数</b>？',at:4.33,size:92,top:240,align:'center'})));
sound(4.33,'whoosh',.4);

/* C gamma exposure, split into four */
scene(6.65,10.86,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'是<b>伽马敞口</b>（<span class="num">GEX</span>）',at:7.12,size:70}),
  C.custom(`<div class="abs sub3">从高到低，分成四等份</div>`,(t,el)=>vis(el.firstChild,appear(t,8.9))),
  C.tiles({cols:2,top:330,h:200,items:[{at:9.78,html:'最高<small>25%</small>',hot:true},{at:9.92,html:'次高<small>25%</small>',hot:true},{at:10.06,html:'次低<small>25%</small>'},{at:10.2,html:'最低<small>25%</small>'}]})));
sound(7.12,'hit',.5);[9.78,9.92,10.06,10.2].forEach(x=>sound(x,'tick',.4));

/* D higher GEX, calmer market (side note) */
scene(10.86,15.95,C.compose([[0,'paper','白皮书 p2 旁注']],
  C.flow({top:110,h:150,gap:60,items:[{at:12.14,html:'伽马敞口<b>越高</b>'},{at:13.36,html:'市场<b>越平静</b>',color:'#d9f5e3'},{at:14.72,html:'先看<b>最高的两份</b>',color:'#ffe14d'}]})));
sound(12.14,'hit',.45);sound(13.36,'hit',.45);sound(14.72,'hit',.5);

/* E next-day standard deviation 0.55% vs 0.85% */
scene(15.95,21.23,C.compose([[0,'paper','白皮书 p2']],
  C.bars({title:'第二天涨跌的<b>标准差</b>',max:1,
    rows:[{label:'GEX 最高 25%',value:.55,color:'#20a35a',at:16.01,grow:[16.2,17.2],count:[17.84,18.6],suffix:'%'},
          {label:'GEX 次高 25%',value:.85,color:'#f2a516',at:19.16,grow:[19.3,20.2],count:[20.02,20.68],suffix:'%'}],
    quote:{img:'WP-P2-GEX-QUART',at:16.6}})));
sound(18.6,'sparkle',.6);punch(18.6,1.05);sound(20.68,'sparkle',.6);punch(20.68,1.06);

/* F this time the gap opens */
scene(21.23,25.05,C.compose([[0,'paper','白皮书 p2–p3']],
  C.headline({html:'差距<b>拉开了</b>',at:21.54,size:72,top:70,align:'center'}),
  C.vs({top:230,h:380,badge:'对比',vsAt:22.52,left:{at:23.47,html:'<span class="num">VIX</span> 两档<span class="big num">0.51%<br>0.66%</span><small>挤在一起</small>'},right:{at:21.94,html:'<span class="num">GEX</span> 两档<span class="big num">0.55%<br>0.85%</span><small>拉得开</small>',color:'#ffe14d'}})));
sound(21.54,'hit',.5);sound(22.52,'pop',.5);sound(24.16,'tick',.4);

/* G the p3 GEX figure, annotated with our reading */
scene(25.05,29.05,C.compose([[0,'paper','白皮书 p3｜标注是我们的读图']],
  C.figure({img:'WP-P3-FIG-GEX',size:[797,624],at:25.1,
    legend:[['#227593','深蓝 = 次高组'],['#a9d47b','浅绿 = 最高组']],
    zoom:{at:28.2,center:[400,150],s:1.3},
    marks:[{at:26.94,span:[330,470,505]},{at:28.16,ellipse:[400,140,32,78]}],
    callouts:[{at:27.14,pos:[500,330],html:'挤在 <b class="num">0</b> 附近'},{at:28.32,pos:[70,150],html:'又<b>高</b>又<b>窄</b>'}]})));
sound(25.1,'whoosh',.4);sound(26.94,'pop',.45);sound(28.16,'hit',.5);

/* H true calm vs false calm (OURS) */
scene(29.05,33.42,C.compose([[0,'ours','我们的比喻']],
  C.headline({html:'看起来平静的市场',at:29.84,size:64,top:70,align:'center'}),
  C.vs({top:230,h:400,badge:'≠',vsAt:32.56,left:{at:32.12,html:'<span class="big">真</span>平静',color:'#d9f5e3'},right:{at:32.7,html:'<span class="big">假</span>平静',color:'#ffd6d6'}})));
sound(29.84,'whoosh',.4);sound(32.12,'pop',.45);sound(32.7,'hit',.55);shake(32.8,8);

/* I index at 2000: about 4 points a day */
scene(33.42,38.51,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'指数 <span class="num">2000</span> 点时',at:34.88,size:68,top:70,align:'center'}),
  C.stat({at:36.68,count:[37.6,38.2],value:4,prefix:'约 ',suffix:' 点',label:'每天波动区间的差距',labelAt:36.92,top:250})));
sound(34.88,'whoosh',.4);sound(38.2,'sparkle',.6);punch(38.2,1.07);

/* J which groups were compared? (OURS critique) */
scene(38.51,42.49,C.compose([[0,'ours','我们的批评']],
  C.headline({html:'这 <span class="num">4</span> 点怎么比出来的？',at:38.74,size:64,top:70,align:'center'}),
  C.vs({top:230,h:380,badge:'?',vsAt:41.26,left:{at:39.96,html:'<span class="num">VIX</span> 分组<br>次低档<span class="big num">0.66%</span>'},right:{at:40.32,html:'<span class="num">GEX</span> 分组<br>次高档<span class="big num">0.85%</span>'}})));
sound(39.96,'pop',.45);sound(40.32,'pop',.45);sound(41.26,'hit',.5);

/* K not the same days: read it as intuition */
scene(42.49,46.4,C.compose([[0,'ours','我们的批评']],
  C.points({top:160,step:220,lines:[{at:43.74,mark:'x',strike:44.46,html:'同一批日子'},{at:44.96,mark:'ok',html:'当成<b>直观感受</b>'}]})));
sound(43.74,'hit',.45);sound(44.46,'tick',.5);sound(44.96,'hit',.5);

/* L only a dozen-odd years of data */
scene(46.4,51.1,C.compose([[0,'paper','白皮书 p3 图题 · p2 日期']],
  C.flow({top:110,h:140,gap:60,items:[{at:47.3,html:'<span class="num">2004</span> 数据开始'},{at:49.26,html:'<span class="num">2017</span> 白皮书修订',color:'#f3efe6'},{at:50.38,html:'只有<b>十几年</b>',color:'#ffe14d'}]})));
sound(47.3,'pop',.45);sound(49.26,'pop',.45);sound(50.48,'hit',.55);punch(50.48,1.05);

/* M why can GEX see this? market makers */
scene(51.1,99,C.compose([[0,'next','答案在后面']],
  C.headline({html:'<span class="num">GEX</span> 凭什么<br>能看到这些？',at:51.96,size:84,top:90,align:'center'}),
  C.tiles({cols:1,top:470,h:200,items:[{at:53.86,html:'答案：<b>做市商</b>',hot:true}]})));
sound(51.96,'whoosh',.4);sound(53.86,'sparkle',.6);punch(53.86,1.06);
