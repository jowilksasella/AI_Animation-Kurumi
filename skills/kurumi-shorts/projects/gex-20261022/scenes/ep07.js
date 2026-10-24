/* ep07 它其实在猜 — beats on word starts (python tools/brief.py ep07).
   EXT-BW2004 = Bollen & Whaley, The Journal of Finance 2004 (abstract-level). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['伽马敞口','假设','中间','备兑看涨','权利金','看涨期权','看跌期权','保险','隐含波动率','买压','偏斜','循环论证','平均画像']);
cast({'001':{s:'explain'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'question'},'012':{s:'concern',s2:[[54.84,'explain']]}});

/* A hook: GEX is guessing who buys and who sells */
scene(0,3.87,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'伽马敞口最大的<b>秘密</b>',at:0,size:76,top:70,align:'center'}),
  C.vs({top:240,h:400,badge:'猜',vsAt:2.74,left:{at:3.14,html:'谁<span class="big">买？</span>'},right:{at:3.34,html:'谁<span class="big">卖？</span>',color:'#ffe14d'}})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(2.74,'hit',.6);shake(2.8,10);

/* B guess? */
scene(3.87,6.07,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'<b>猜</b>？<br>不是直接算的吗？',at:3.94,size:96,top:250,align:'center'})));
sound(3.94,'hit',.5);

/* C trades happen at the mid: so the paper assumes */
scene(6.07,11.41,C.compose([[0,'paper','白皮书 p4']],
  C.headline({html:'标普期权大多在<br>买卖价<b>中间</b>成交',at:6.36,size:60,top:70,align:'center'}),
  C.tiles({cols:3,top:290,h:200,items:[{at:7.22,html:'买价'},{at:7.68,html:'成交',hot:true},{at:7.52,html:'卖价'}]}),
  C.custom(`<div class="abs chip3 float">→ 白皮书做了<b>假设</b></div>`,(t,el)=>slam(el.firstChild,t,10.58,.35,-2))));
sound(7.68,'pop',.5);sound(9.0,'tick',.4);sound(10.58,'hit',.6);

/* D can't tell who was in a hurry (OURS) */
scene(11.41,15.15,C.compose([[0,'ours','我们的解释']],
  C.headline({html:'看不出<b>谁更急</b>',at:12.62,size:80,top:70,align:'center'}),
  C.vs({top:250,h:380,badge:'?',vsAt:13.62,left:{at:13.34,html:'买方<span class="big">急？</span>'},right:{at:14.42,html:'卖方<span class="big">急？</span>'}})));
sound(13.34,'pop',.45);sound(14.42,'pop',.45);

/* E assumption for calls: investors sell, market makers buy (covered calls) */
scene(15.15,20.96,C.compose([[0,'paper','白皮书 p4 假设']],
  C.flow({top:90,h:140,gap:50,items:[{at:15.6,html:'<b>看涨</b>期权'},{at:16.5,html:'投资者<b>卖出</b>',color:'#ffd6d6'},{at:17.36,html:'做市商<b>买入</b>',color:'#d9f5e3'}]}),
  C.custom(`<div class="abs chip3 b float">原因：很多人做<b>备兑看涨</b></div>`,(t,el)=>slam(el.firstChild,t,20.13,.35,2))));
sound(15.6,'pop',.45);sound(16.5,'pop',.45);sound(17.36,'pop',.45);sound(20.13,'hit',.55);

/* F covered call (OURS definition) */
scene(20.96,26.05,C.compose([[0,'ours','常识定义']],
  C.headline({html:'备兑看涨',at:21.11,size:84,top:60,align:'center'}),
  C.flow({top:220,h:140,gap:50,items:[{at:22.5,html:'手里有<b>股票</b>'},{at:23.36,html:'再卖出<b>看涨期权</b>',color:'#f3efe6'},{at:24.85,html:'收一笔<b>权利金</b>',color:'#ffe14d'}]})));
sound(21.11,'whoosh',.4);sound(22.5,'pop',.45);sound(23.52,'pop',.45);sound(25.04,'sparkle',.6);

/* G assumption for puts: investors buy insurance, market makers sell */
scene(26.05,32.12,C.compose([[0,'paper','白皮书 p4 假设']],
  C.flow({top:90,h:140,gap:50,items:[{at:26.12,html:'<b>看跌</b>期权'},{at:27.38,html:'投资者<b>买入</b>',color:'#d9f5e3'},{at:28.38,html:'做市商<b>卖出</b>',color:'#ffd6d6'}]}),
  C.custom(`<div class="abs chip3 b float">像给股票买份<b>保险</b></div>`,(t,el)=>slam(el.firstChild,t,30.16,.35,-2))));
sound(26.12,'pop',.45);sound(27.38,'pop',.45);sound(28.38,'pop',.45);sound(31.4,'hit',.55);

/* H Bollen & Whaley 2004 */
scene(32.12,37.48,C.compose([[0,'ext','外部研究｜期刊论文']],
  C.headline({html:'有研究<b>撑腰</b>',at:32.56,size:72,top:60,align:'center'}),
  C.flow({top:220,h:140,gap:50,items:[{at:33.52,html:'博伦 · 惠利'},{at:34.51,html:'<span class="num">2004</span> 年',color:'#f3efe6'},{at:35.55,html:'《金融期刊》',color:'#d6f1f1'}]})));
sound(32.74,'hit',.5);sound(33.52,'pop',.45);sound(34.51,'pop',.45);sound(35.66,'hit',.5);

/* I their finding (abstract) */
scene(37.48,43.3,C.compose([[0,'ext','外部研究｜摘要结论']],
  C.headline({html:'标普 <span class="num">500</span> 期权<br>隐含波动率的变化',at:38.54,size:62,top:70,align:'center'}),
  C.flow({top:330,h:140,gap:60,items:[{at:41.4,html:'指数看跌期权的<b>买压</b>',color:'#ffd6d6'},{at:42.44,html:'影响<b>最大</b>',color:'#ffe14d'}]})));
sound(38.54,'whoosh',.4);sound(41.78,'pop',.5);sound(42.44,'hit',.6);punch(42.5,1.06);

/* J everyone buys insurance: puts get expensive, part of the skew */
scene(43.3,48.87,C.compose([[0,'paper','白皮书 p4–p5']],
  C.headline({html:'大家都抢着<b>买保险</b>',at:43.62,size:72,top:70,align:'center'}),
  C.headline({html:'看跌期权',at:44.98,size:120,top:260,align:'center'}),
  C.custom(`<div class="abs chip3 c float">特别<b>贵</b> → <b>偏斜</b>的来源之一</div>`,(t,el)=>slam(el.firstChild,t,46.02,.35,2))));
sound(43.62,'whoosh',.4);sound(46.02,'hit',.6);shake(46.1,10);sound(47.48,'pop',.45);

/* K a bit circular */
scene(48.87,53.45,C.compose([[0,'paper','白皮书 p4（作者用了 circularly）']],
  C.custom(`<svg class="abs loop" width="600" height="480" viewBox="0 0 600 480" style="left:200px;top:110px"><path class="arc" d="M150 240 A150 150 0 1 1 450 240 A150 150 0 1 1 150 240" fill="none" stroke="#e5383b" stroke-width="10" stroke-dasharray="20 14"/></svg>
    <div class="abs node n1 float">假设</div><div class="abs node n2 float">伽马敞口<br>的效果</div><div class="abs loopt">有点<b>循环论证</b></div>`,
    (t,el)=>{pop(el.querySelector('.n1'),t,49.04);pop(el.querySelector('.n2'),t,50.06);
      const a=el.querySelector('.loop');a.style.opacity=appear(t,50.46);a.style.transform=`rotate(${(t-50.46)*60}deg)`;slam(el.querySelector('.loopt'),t,52.26,.35,-2)})));
sound(49.04,'pop',.45);sound(50.06,'pop',.45);sound(52.62,'hit',.6);shake(52.7,10);

/* L only an average picture (author admits; our reminder) */
scene(53.45,99,C.compose([[0,'ours','我们的提醒']],
  C.headline({html:'作者自己也<b>承认</b>',at:53.52,size:72,top:70,align:'center'}),
  C.points({top:250,step:190,lines:[{at:55.16,mark:'ok',html:'只是<b>平均画像</b>'},{at:55.74,mark:'x',strike:57.22,html:'每张合约都这样'}]})));
sound(54.04,'hit',.5);sound(55.34,'pop',.45);sound(57.22,'tick',.5);
