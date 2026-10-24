/* ep15 看图前的五个问题 — beats on word starts (python tools/brief.py ep15). Recaps ep06/07/09/12/13. */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['五个问题','谁买谁卖','假设','分类数据','单位','市值','持仓','未平仓量','零日期权','漏掉','流动性','浴缸','大海','波动大小','涨跌方向','负伽马','正伽马','规则']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'explain'},'013':{s:'explain',s2:[[49.3,'surprise']]}});
const Q=(n,html,at)=>C.headline({html:`<span class="qn num">${n}</span> ${html}`,at,size:62,top:70,align:'center'});

/* A hook: five questions before reading a GEX chart */
scene(0,3.28,C.compose([[0,'ours','系列总结']],
  C.headline({html:'看<b>伽马敞口</b>的图之前',at:0,size:70,top:80,align:'center'}),
  C.tiles({cols:5,top:300,h:200,gap:14,items:[1,2,3,4,5].map(i=>({at:2.02+i*.1,html:`<span class="num big3">${i}</span>`,hot:i===5}))}),
  C.headline({html:'先问<b>五个问题</b>',at:2.44,size:80,top:600,align:'center'})));
flash(0);punch(0,1.08,.5);sound(0,'hit',.8);[1,2,3,4,5].forEach(i=>sound(2.02+i*.1,'tick',.4));sound(2.72,'hit',.5);

/* B which five? */
scene(3.28,4.16,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'哪<b>五个</b>？',at:3.35,size:130,top:300,align:'center'})));
sound(3.35,'whoosh',.4);

/* C Q1 who buys, who sells */
scene(4.16,8.48,C.compose([[0,'ours','问题 1（见第 07、09 集）']],
  Q('1','怎么判断<b>谁买谁卖</b>？',4.74),
  C.vs({top:250,h:380,badge:'还是',vsAt:7.26,left:{at:6.7,html:'靠<span class="big">假设</span>'},right:{at:7.52,html:'有<span class="big">分类数据</span>',color:'#d6f1f1'}})));
sound(4.23,'hit',.55);sound(6.7,'pop',.45);sound(7.74,'pop',.45);

/* D the white paper assumes */
scene(8.48,11.92,C.compose([[0,'paper','白皮书 p4']],
  C.flow({top:110,h:150,gap:60,items:[{at:8.55,html:'白皮书：<b>假设</b>'},{at:9.72,html:'投资者<b>卖看涨、买看跌</b>',color:'#ffe14d'}]})));
sound(9.28,'pop',.45);sound(10.89,'hit',.5);

/* E Q2 units */
scene(11.92,16.89,C.compose([[0,'ours','问题 2（见第 06 集）']],
  Q('2','单位是<b>什么</b>？',12.6),
  C.tiles({cols:1,top:220,h:150,gap:30,items:[{at:13.74,html:'每 <b>1 点</b>'},{at:14.18,html:'每 <b>1%</b>'},{at:15.66,html:'还是<b>除过市值</b>',hot:true}]})));
sound(11.99,'hit',.55);sound(13.74,'pop',.45);sound(14.18,'pop',.45);sound(15.99,'pop',.45);

/* F Q3 positions as of when */
scene(16.89,22.33,C.compose([[0,'ours','问题 3（见第 13 集）']],
  Q('3','用的是<b>哪天</b>的持仓？',17.54),
  C.flow({top:240,h:150,gap:60,items:[{at:19.02,html:'<b>昨天收盘</b>的未平仓量'},{at:20.62,html:'看不到今天<b>新开</b>的仓位',color:'#ffd6d6'}]})));
sound(16.96,'hit',.55);sound(19.4,'pop',.45);sound(20.98,'hit',.5);

/* G especially same-day 0DTE */
scene(22.33,25.33,C.compose([[0,'ours','问题 3（见第 13 集）']],
  C.headline({html:'当天新开的<br><b>零日期权</b>',at:22.66,size:96,top:150,align:'center'}),
  C.custom(`<div class="abs miss float">尤其容易<b>漏掉</b></div>`,(t,el)=>slam(el.firstChild,t,24.28,.35,-3))));
sound(23.14,'pop',.5);sound(24.6,'hit',.6);shake(24.65,10);

/* H Q4 liquidity: bathtub or sea */
scene(25.33,29.68,C.compose([[0,'ours','问题 4（见第 12 集）']],
  Q('4','标的<b>流动性</b>怎么样？',26.1),
  C.vs({top:250,h:380,badge:'≠',vsAt:28.8,left:{at:27.66,html:'<span class="big">浴缸</span>',color:'#dbe9fb'},right:{at:28.04,html:'<span class="big">大海</span>',color:'#b9d4f5'}})));
sound(25.4,'hit',.55);sound(27.66,'pop',.45);sound(28.16,'pop',.45);

/* I Q5 size of swings, not direction */
scene(29.68,34.6,C.compose([[0,'ours','问题 5（见第 05 集）']],
  Q('5','说的是<b>波动大小</b>',30.56),
  C.points({top:270,step:180,lines:[{at:31.9,mark:'x',html:'不是<b>涨跌方向</b>'},{at:33.06,mark:'x',strike:34.02,html:'负伽马 = 一定会<b>跌</b>'}]})));
sound(29.75,'hit',.55);sound(32.02,'pop',.45);sound(34.02,'tick',.55);

/* J positive gamma doesn't guarantee a pull-back */
scene(34.6,37.68,C.compose([[0,'ours','问题 5（见第 12 集）']],
  C.points({top:220,step:180,lines:[{at:34.74,mark:'x',strike:36.74,html:'正伽马 = 一定被<b>拉回来</b>'}]})));
sound(34.74,'pop',.45);sound(36.74,'tick',.55);shake(36.8,8);

/* K how hard, not which way */
scene(37.68,41.46,C.compose([[0,'ours','我们的小结']],
  C.vs({top:150,h:440,badge:'不是',vsAt:40.02,left:{at:38.28,html:'晃得<span class="big">多厉害</span>',color:'#ffe14d'},right:{at:40.36,html:'<span class="big">往哪边晃</span>'}})));
sound(38.7,'pop',.45);sound(40.56,'hit',.5);

/* L ask all five, then read the numbers */
scene(41.46,45.76,C.compose([[0,'ours','我们的小结']],
  C.tiles({cols:5,top:120,h:200,gap:14,items:[1,2,3,4,5].map(i=>({at:41.64+i*.1,html:'<span class="ck">✓</span>',hot:true}))}),
  C.headline({html:'再看图上的数字<br>心里就<b>有底</b>多了',at:43.1,size:76,top:420,align:'center'})));
[1,2,3,4,5].forEach(i=>sound(41.64+i*.1,'tick',.45));sound(44.8,'sparkle',.6);punch(44.85,1.05);

/* M the white paper's best move: change the question */
scene(45.76,99,C.compose([[0,'paper','全系列主旨（白皮书 p2 · p4）']],
  C.headline({html:'这份白皮书最妙的：<br><b>换了个问题</b>',at:46.04,size:64,top:60,align:'center'}),
  C.vs({top:300,h:400,badge:'→',vsAt:50.02,left:{at:48.54,html:'市场<span class="big">怕不怕</span>'},right:{at:50.12,html:'谁会被<span class="big">规则逼着</span>买卖',color:'#ffe14d'}})));
sound(47.14,'hit',.55);sound(48.9,'pop',.45);sound(50.68,'hit',.6);punch(50.7,1.06);
