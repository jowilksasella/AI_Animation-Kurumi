/* ep00 系列开场 — beats on word starts (python tools/brief.py ep00). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['一分钟','白皮书','做市商','对冲','十五集','学术研究','同行评审','恐慌指数','伽马敞口']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'think'},'006':{s:'explain'},
  '007':{s:'question'},'008':{s:'explain'},'009':{s:'question'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'concern'},
  '013':{s:'explain',s2:[[51.84,'surprise']]}});

/* A hook: one minute a day */
scene(0,3.72,C.compose([[0,'ours','系列介绍']],
  C.headline({html:'每天 <b class="num">1</b> 分钟',at:0,size:120,top:90,align:'center'}),
  C.custom(`<svg class="abs clock" width="360" height="360" viewBox="0 0 360 360" style="left:320px;top:270px"><circle cx="180" cy="180" r="160" fill="#fff" stroke="#15202b" stroke-width="12"/><path class="sweep" fill="#ffe14d"/><line class="hand" x1="180" y1="180" x2="180" y2="44" stroke="#e5383b" stroke-width="14" stroke-linecap="round"/><circle cx="180" cy="180" r="16" fill="#15202b"/></svg>`,
    (t,el)=>{const p=seg(t,.3,3.6),a=p*2*Math.PI,x=180+150*Math.sin(a),y=180-150*Math.cos(a);pop(el.querySelector('.clock'),t,.15);
      el.querySelector('.sweep').setAttribute('d',p>0?`M180 180 L180 30 A150 150 0 ${a>Math.PI?1:0} 1 ${x} ${y} Z`:'');el.querySelector('.hand').setAttribute('transform',`rotate(${p*360} 180 180)`)}),
  C.headline({html:'读完一份<b>期权白皮书</b>',at:1.82,size:64,top:690,align:'center'})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(1.82,'pop',.5);sound(2.94,'ding',.5);

/* B question */
scene(3.72,5.65,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'一分钟<br>能讲清楚<b>什么</b>？',at:3.79,size:100,top:220,align:'center'})));
shake(4.7,10);sound(3.79,'whoosh',.4);sound(4.7,'hit',.5);

/* C the white paper */
scene(5.65,11.3,C.compose([[0,'paper','白皮书 p2']],
  C.headline({html:'一次只讲<b>一个点</b>',at:5.7,size:60}),
  C.paperTitle({caption:'《伽马敞口》 SqueezeMetrics',at:6.78,stamp:'白皮书',top:190}),
  C.tiles({cols:2,top:600,h:140,items:[{at:9.05,html:'<span class="num">2016</span><small>首发</small>'},{at:10.13,html:'<span class="num">2017</span><small>修订</small>',hot:true}]})));
sound(5.7,'whoosh',.4);sound(6.9,'hit',.5);sound(9.05,'pop',.5);sound(10.13,'pop',.5);

/* D the core question */
scene(11.3,16.38,C.compose([[0,'paper','白皮书的核心问题']],
  C.flow({top:110,h:150,gap:60,items:[{at:12.34,html:'做市商'},{at:13.54,html:'为了<b>对冲</b>被迫买卖',color:'#ffe14d'},{at:15.46,html:'推着股市走 <b class="num">?</b>',color:'#ffd6d6'}]})));
sound(12.34,'hit',.45);sound(13.54,'hit',.45);sound(15.46,'hit',.55);punch(15.46,1.06);

/* E market maker = quote and earn the spread (OURS definition) */
scene(16.38,20.22,C.compose([[0,'ours','常识定义']],
  C.headline({html:'做市商 = <b>报价、赚差价</b>',at:16.98,size:58}),
  C.vs({top:200,h:400,badge:'差价',vsAt:19.54,left:{at:18.28,html:'买入价<span class="big num">99.9</span>'},right:{at:18.6,html:'卖出价<span class="big num">100.1</span>',color:'#ffe14d'}})));
sound(16.98,'whoosh',.4);sound(18.28,'pop',.4);sound(18.6,'pop',.4);sound(19.54,'hit',.5);

/* F not betting on direction, so they must keep trading */
scene(20.22,25.36,C.compose([[0,'paper','白皮书 p4']],
  C.points({top:150,step:220,lines:[{at:20.84,mark:'x',strike:21.86,html:'赌涨跌方向'},{at:23.43,mark:'ok',html:'跟着价格<b>不停买卖</b>'}]})));
sound(20.84,'hit',.5);sound(21.86,'tick',.5);sound(23.43,'hit',.5);punch(24.38,1.05);

/* G time is fragmented */
scene(25.36,28.33,C.compose([[0,'ours','系列介绍']],
  C.headline({html:'可我每天的时间<br>都是<b>碎的</b>',at:25.41,size:84,top:240,align:'center'})));
shake(27.88,18,.5);sound(27.88,'hit',.7);

/* H fifteen episodes, under a minute each */
scene(28.33,34.37,C.compose([[0,'ours','系列安排']],
  C.stat({at:29.08,count:[29.2,29.74],value:15,suffix:' 集',label:'每集 <b>1 分钟</b>以内',labelAt:30.96,top:90}),
  C.tiles({cols:2,top:560,h:150,items:[{at:32.16,html:'等车'},{at:32.52,html:'排队',hot:true}]})));
sound(29.74,'sparkle',.6);punch(29.74,1.06);sound(32.16,'pop',.4);sound(32.52,'pop',.4);

/* I order? */
scene(34.37,35.95,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'要按<b>顺序</b>听吗？',at:34.41,size:100,top:280,align:'center'})));
sound(34.41,'whoosh',.4);

/* J each stands alone; route ep01 → ep15 */
scene(35.95,42.62,C.compose([[0,'ours','系列路线']],
  C.headline({html:'每集都能<b>单独看懂</b>',at:36.02,size:60}),
  C.flow({top:170,h:140,gap:60,items:[{at:38.86,html:'<span class="num">01</span>　恐慌指数的盲区'},{at:40.32,html:'…… 一路讲到 ……',color:'#f3efe6'},{at:41.28,html:'<span class="num">15</span>　读懂伽马敞口的图',color:'#ffe14d'}]})));
sound(36.02,'whoosh',.4);sound(38.86,'pop',.45);sound(41.28,'hit',.5);

/* K research to tell evidence from claims */
scene(42.62,47.38,C.compose([[0,'ours','系列安排']],
  C.headline({html:'穿插<b>学术研究</b>',at:43.32,size:64}),
  C.vs({top:200,h:400,badge:'分辨',vsAt:45.6,left:{at:46.02,html:'有证据的<br>说法 <b>✓</b>',color:'#d9f5e3'},right:{at:46.46,html:'只是<br>说法 <b>?</b>'}})));
sound(43.32,'whoosh',.4);sound(45.6,'hit',.5);sound(46.76,'ding',.5);

/* L a company's white paper, not peer reviewed */
scene(47.38,51.7,C.compose([[0,'paper','白皮书 p1 免责声明']],
  C.custom(`<img class="abs disc card" src="media/WP-P1-DISCLAIMER.png" style="left:30px;top:120px;width:380px">`,(t,el)=>pop(el.firstChild,t,47.5)),
  C.custom(`<div class="abs lab1">数据公司<br>写的<b>白皮书</b></div><div class="abs lab2">不是<br><b>同行评审</b>论文</div>`,
    (t,el)=>{slam(el.querySelector('.lab1'),t,48.28,.35,-2);slam(el.querySelector('.lab2'),t,50.02,.35,2)})));
sound(47.5,'whoosh',.4);sound(48.28,'hit',.45);sound(50.02,'hit',.55);shake(50.3,8);

/* M first episode */
scene(51.7,99,C.compose([[0,'next','第一集']],
  C.headline({html:'第一集',at:51.84,size:120,top:120,align:'center'}),
  C.tiles({cols:1,top:420,h:200,items:[{at:53.58,html:'<span class="num">01</span> 恐慌指数的盲区',hot:true}]})));
sound(51.84,'hit',.6);flash(51.84,.2);sound(53.58,'sparkle',.6);punch(53.58,1.06);
