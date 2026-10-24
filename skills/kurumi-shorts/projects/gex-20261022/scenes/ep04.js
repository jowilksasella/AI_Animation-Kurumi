/* ep04 越跌越卖的人 — beats on word starts (python tools/brief.py ep04). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['做市商','德尔塔','看跌期权','卖空','对冲','凸性','负伽马','期货','可预测','可量化','割肉']);
cast({'001':{s:'concern'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'concern'},'006':{s:'explain'},
  '007':{s:'surprise'},'008':{s:'explain'},'009':{s:'think'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'concern'},'013':{s:'explain'}});

/* A hook: the lower it goes, the more they sell */
const fall=[[60,120],[200,170],[290,150],[400,260],[480,240],[600,360],[700,340],[820,460],[940,500]];
scene(0,3.08,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'越跌越<b>卖</b>',at:0,size:120,top:40,align:'center'}),
  C.custom(`<svg class="abs" width="1000" height="600" viewBox="0 0 1000 600" style="top:220px"><polyline class="ln" points="${fall.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#e5383b" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/></svg>
    ${[[290,150,1.4],[480,240,1.8],[700,340,2.26],[940,500,2.5]].map(([x,y,a],i)=>`<div class="abs sell float" data-a="${a}" style="left:${x-60}px;top:${y+130}px">卖</div>`).join('')}`,
    (t,el)=>{el.querySelector('.ln').style.strokeDashoffset=100-100*eo(seg(t,.4,2.6));el.querySelectorAll('.sell').forEach(s=>pop(s,t,+s.dataset.a))})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);[1.4,1.8,2.26,2.5].forEach(x=>sound(x,'pop',.5));shake(2.5,10);

/* B isn't that panic selling? */
scene(3.08,5.47,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'这不是<b>割肉</b>吗？<br>谁会这么干？',at:3.15,size:90,top:250,align:'center'})));
sound(3.42,'hit',.5);shake(3.5,10);

/* C the market maker sells a 20-delta put */
scene(5.47,10.27,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'<b>做市商</b>',at:5.54,size:120,top:60,align:'center'}),
  C.flow({top:260,h:150,gap:60,items:[{at:7.08,html:'卖给投资者'},{at:8.2,html:'一张 <span class="num">20</span> 德尔塔的<b>看跌期权</b>',color:'#ffe14d'}]})));
sound(5.54,'hit',.6);sound(7.08,'pop',.45);sound(8.2,'hit',.5);

/* D what 20 delta means (OURS definition) */
scene(10.27,15.12,C.compose([[0,'ours','常识定义']],
  C.headline({html:'<span class="num">20</span> 德尔塔是什么？',at:10.41,size:68,top:70,align:'center'}),
  C.vs({top:230,h:400,badge:'≈',vsAt:13.32,left:{at:11.72,html:'股价动<span class="big num">1 元</span>'},right:{at:13.66,html:'期权约动<span class="big num">0.2 元</span>',color:'#ffe14d'}})));
sound(11.72,'pop',.45);sound(13.66,'pop',.45);sound(14.54,'ding',.5);

/* E he shorts about 20 shares first */
scene(15.12,19.84,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'股价下跌 → 他会<b>亏钱</b>',at:15.38,size:62,top:70,align:'center'}),
  C.stat({at:17.61,count:[18.4,18.98],value:20,prefix:'卖空 ',suffix:' 股',label:'先对冲',labelAt:19.16,top:290})));
sound(16.92,'hit',.45);sound(18.98,'sparkle',.6);punch(18.98,1.06);

/* F the delta rises from 20 to 50 */
scene(19.84,24.16,C.compose([[0,'paper','白皮书 p4']],
  C.bars({title:'股价真跌了，<b>德尔塔</b>变大',max:60,
    rows:[{label:'下跌前',value:20,color:'#9aa7b1',at:20.0,grow:[20.2,21.0],count:[22.44,22.9],dec:0},
          {label:'下跌后',value:50,color:'#e5383b',at:22.44,grow:[22.7,23.6],count:[23.18,23.7],dec:0}]})));
sound(20.56,'whoosh',.4);sound(23.7,'sparkle',.6);punch(23.7,1.07);

/* G 20 shares no longer enough: short 30 more */
scene(24.16,27.59,C.compose([[0,'paper','白皮书 p4']],
  C.flow({top:100,h:150,gap:56,items:[{at:24.23,html:'原来的 <span class="num">20</span> 股'},{at:25.24,html:'<b>不够了</b>',color:'#ffd6d6'},{at:26.48,html:'再卖空 <b class="num">30</b> 股',color:'#ffe14d'}]})));
sound(24.23,'pop',.45);sound(25.24,'hit',.5);sound(27.01,'hit',.6);punch(27.01,1.07);

/* H price rises, delta to zero, buy it all back */
scene(27.59,31.96,C.compose([[0,'paper','白皮书 p4']],
  C.flow({top:100,h:150,gap:56,items:[{at:28.1,html:'股价<b>上涨</b>',color:'#d9f5e3'},{at:28.96,html:'德尔塔 → <b class="num">0</b>'},{at:30.66,html:'股票<b>全部买回来</b>',color:'#ffe14d'}]})));
sound(28.1,'pop',.45);sound(29.54,'pop',.45);sound(31.0,'hit',.55);

/* I convexity can't be hedged away */
scene(31.96,36.09,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'凸性<b>对冲不掉</b>',at:32.53,size:84,top:80,align:'center'}),
  C.vs({top:300,h:340,badge:'↻',vsAt:35.02,left:{at:34.4,html:'价格<br><b>一动</b>'},right:{at:35.12,html:'就得<br><b>重新调整</b>',color:'#ffe14d'}})));
sound(32.53,'hit',.55);sound(34.4,'pop',.45);sound(35.12,'pop',.45);

/* J chasing the price (OURS) */
scene(36.09,38.85,C.compose([[0,'ours','我们的小结']],
  C.vs({top:180,h:420,badge:'追',vsAt:37.8,left:{at:36.16,html:'跌了<span class="big">卖</span>',color:'#ffd6d6'},right:{at:36.7,html:'涨了<span class="big">买</span>',color:'#d9f5e3'}})));
sound(36.16,'pop',.45);sound(36.7,'pop',.45);sound(38.0,'hit',.55);shake(38.1,10);

/* K a predictable, quantifiable trading routine: the base of GEX */
scene(38.85,44.17,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'白皮书说',at:39.14,size:60,top:70,align:'center'}),
  C.tiles({cols:2,top:190,h:180,items:[{at:40.74,html:'可<b>预测</b>'},{at:41.38,html:'可<b>量化</b>'}]}),
  C.flow({top:430,h:140,gap:50,items:[{at:42.04,html:'一套<b>买卖程序</b>'},{at:43.24,html:'伽马敞口的<b>基础</b>',color:'#ffe14d'}]})));
sound(40.74,'pop',.45);sound(41.38,'pop',.45);sound(43.54,'hit',.6);punch(43.54,1.06);

/* L this is negative gamma (our label, based on p5) */
scene(44.17,48.37,C.compose([[0,'ours','我们的标注（依据 p5）']],
  C.headline({html:'这就是<b>负伽马</b>',at:44.52,size:84,top:70,align:'center'}),
  C.vs({top:280,h:360,badge:'放大',vsAt:47.68,left:{at:45.56,html:'下跌时<br><b>加码卖</b>',color:'#ffd6d6'},right:{at:46.94,html:'上涨时<br><b>加码买</b>',color:'#d9f5e3'}})));
sound(44.52,'hit',.6);flash(44.52,.2);sound(45.56,'pop',.45);sound(46.94,'pop',.45);sound(47.68,'hit',.5);

/* M the S&P index is hedged with futures (p4 footnote) */
scene(48.37,99,C.compose([[0,'paper','白皮书 p4 脚注']],
  C.vs({top:200,h:420,badge:'→',vsAt:50.49,left:{at:48.6,html:'标普指数<br>没有股票<br>可以买卖'},right:{at:51.58,html:'用<span class="big">期货</span>对冲',color:'#ffe14d'}})));
sound(48.6,'pop',.45);sound(51.58,'hit',.55);punch(51.58,1.05);
