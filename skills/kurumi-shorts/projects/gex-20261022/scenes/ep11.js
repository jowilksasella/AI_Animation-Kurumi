/* ep11 谁导致了谁 — beats on word starts (python tools/brief.py ep11).
   EXT-NPPW2021 = Ni, Pearson, Poteshman & White, Review of Financial Studies 2021; EXT-FS1997 = Frey & Stremme, Mathematical Finance 1997. */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['负伽马','反过来','看跌期权','看涨期权','伽马敞口','雨伞','下雨','导致','金融研究评论','数学金融','对冲','波动','参考文献','比例','仓位差异']);
cast({'001':{s:'explain'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'think'},
  '007':{s:'explain'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'concern'}});

/* A hook: maybe the arrow points the other way (OURS) */
scene(0,3.55,C.compose([[0,'ours','我们的解读（回应 p6）']],
  C.flow({top:60,h:140,gap:46,items:[{at:.49,html:'负伽马 → 市场乱？'}]}),
  C.custom(`<div class="abs flip float">⇅</div>`,(t,el)=>{pop(el.firstChild,t,1.5);el.firstChild.style.transform+=` rotate(${180*eo(seg(t,1.62,2.2))}deg)`}),
  C.flow({top:430,h:140,gap:46,items:[{at:2.0,html:'市场乱了 → 才有<b>负伽马</b>',color:'#ffe14d'}]})));
flash(0);punch(0,1.08,.5);sound(0,'hit',.8);sound(1.62,'whoosh',.5);sound(3.0,'hit',.65);shake(3.05,12);

/* B reversed how? */
scene(3.55,5.27,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'怎么<b>反过来</b>了？',at:3.62,size:100,top:280,align:'center'})));
sound(4.22,'whoosh',.4);

/* C falls → people buy puts → (assumed) market makers sell → GEX goes negative */
scene(5.27,12.33,C.compose([[0,'ours','我们的推演（假设 3：白皮书 p4）']],
  C.flow({top:60,h:120,gap:44,items:[{at:5.7,html:'市场一<b>跌</b>',color:'#ffd6d6'},{at:6.48,html:'大家抢着<b>买看跌期权</b>保护'},{at:9.76,html:'按假设：做市商<b>卖出</b>'},{at:11.2,html:'伽马敞口往<b>负</b>走',color:'#ffe14d'}]})));
sound(5.86,'pop',.45);sound(7.08,'pop',.45);sound(10.2,'pop',.45);sound(11.82,'hit',.6);punch(11.85,1.06);

/* D call gamma shrinks as calls drift far from the price (OURS) */
scene(12.33,17.63,C.compose([[0,'ours','我们的推演']],
  C.flow({top:90,h:140,gap:50,items:[{at:12.39,html:'看涨期权离现价<b>越来越远</b>'},{at:14.62,html:'伽马<b>变小</b>',color:'#f3efe6'},{at:16.38,html:'正的那部分也<b>缩水</b>',color:'#ffd6d6'}]})));
sound(12.39,'pop',.45);sound(14.62,'pop',.45);sound(17.02,'hit',.55);

/* E umbrellas and rain (OURS analogy) */
scene(17.63,21.21,C.compose([[0,'ours','我们的比喻']],
  C.vs({top:120,h:400,badge:'≠',vsAt:19.34,left:{at:17.94,html:'下雨时<br>雨伞<span class="big">卖得多</span>',color:'#dbe9fb'},right:{at:19.8,html:'雨伞<br><span class="big">让天下雨</span>'}}),
  C.custom(`<div class="abs nope float"></div>`,(t,el)=>slam(el.firstChild,t,20.44,.35,-8))));
sound(18.34,'pop',.45);sound(20.02,'pop',.45);sound(20.56,'hit',.6);shake(20.6,10);

/* F together, not cause (OURS) */
scene(21.21,25.01,C.compose([[0,'ours','我们的小结']],
  C.points({top:150,step:220,lines:[{at:22.2,mark:'ok',html:'两者<b>一起出现</b>'},{at:23.44,mark:'x',html:'说明<b>谁导致谁</b>'}]})));
sound(22.5,'pop',.45);sound(24.16,'hit',.5);

/* G but research does support hedging moving prices: Ni et al. 2021 */
scene(25.01,32.02,C.compose([[0,'ext','外部研究｜期刊论文']],
  C.headline({html:'对冲<b>推动价格</b>？有研究支持',at:25.22,size:58,top:60,align:'center'}),
  C.flow({top:220,h:130,gap:46,items:[{at:27.91,html:'倪等<b>四位</b>学者'},{at:29.5,html:'<span class="num">2021</span> 年',color:'#f3efe6'},{at:30.62,html:'《金融研究评论》',color:'#d6f1f1'}]})));
sound(26.28,'hit',.5);sound(27.91,'pop',.45);sound(29.64,'pop',.45);sound(30.78,'hit',.5);

/* H their evidence (abstract): rebalancing moves stock volatility via a non-information channel */
scene(32.02,37.71,C.compose([[0,'ext','外部研究｜摘要结论']],
  C.flow({top:90,h:140,gap:56,items:[{at:32.98,html:'做市商的<b>对冲再平衡</b>'},{at:34.96,html:'通过<b>和信息无关</b>的渠道',color:'#f3efe6'},{at:36.42,html:'影响<b>个股波动</b>',color:'#ffe14d'}]})));
sound(32.98,'pop',.45);sound(35.4,'pop',.45);sound(36.96,'hit',.55);punch(37.0,1.05);

/* I the white paper cited an early version */
scene(37.71,41.55,C.compose([[0,'paper','白皮书 p8 参考文献']],
  C.custom(`<img class="abs refs card" src="media/WP-P8-REFS.png">`,(t,el)=>pop(el.firstChild,t,37.84)),
  C.custom(`<div class="abs chip6 float">早期版本，白皮书<b>引用过</b></div>`,(t,el)=>slam(el.firstChild,t,40.68,.35,-2))));
sound(37.84,'whoosh',.4);sound(40.9,'hit',.55);

/* J Frey & Stremme 1997 */
scene(41.55,48.07,C.compose([[0,'ext','外部研究｜期刊论文（白皮书也引用）']],
  C.flow({top:70,h:120,gap:40,items:[{at:41.63,html:'弗雷 · 施特雷姆'},{at:42.52,html:'<span class="num">1997</span> 年《数学金融》',color:'#d6f1f1'}]}),
  C.flow({top:420,h:130,gap:44,items:[{at:45.94,html:'<b>动态对冲</b>'},{at:47.12,html:'让波动<b>变大</b>',color:'#ffd6d6'}]})));
sound(41.63,'pop',.45);sound(43.76,'hit',.5);sound(46.44,'pop',.45);sound(47.56,'hit',.6);shake(47.6,8);

/* K strength depends on hedging share and position dispersion */
scene(48.07,54.12,C.compose([[0,'ext','外部研究｜摘要结论']],
  C.headline({html:'效果<b>强不强</b>，要看',at:48.7,size:72,top:70,align:'center'}),
  C.tiles({cols:1,top:250,h:170,gap:40,items:[{at:50.54,html:'对冲占<b>总需求的比例</b>'},{at:52.62,html:'<b>仓位差异</b>有多大',hot:true}]})));
sound(48.7,'whoosh',.4);sound(51.38,'pop',.45);sound(53.1,'pop',.45);

/* L mechanism supported, but not all of the plot's strength (OURS) */
scene(54.12,99,C.compose([[0,'ours','我们的小结']],
  C.points({top:110,step:200,lines:[{at:54.44,mark:'ok',html:'机制<b>有支持</b>'},{at:55.54,mark:'x',html:'图上的强度<br><b>全算在对冲头上</b>'}]})));
sound(54.58,'pop',.45);sound(57.22,'hit',.55);
