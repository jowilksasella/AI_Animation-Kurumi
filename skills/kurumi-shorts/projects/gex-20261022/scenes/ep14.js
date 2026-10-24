/* ep14 没给数字的超额收益 — beats on word starts (python tools/brief.py ep14). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['超额收益','数字','成分股','伽马敞口','接近零','收益率','样本','成本','进一步研究','线索','板块','更聪明','账本','价差','风险偏好','同行评审','免责声明','打个折扣']);
cast({'001':{s:'explain'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'concern'},'005':{s:'explain'},'006':{s:'question'},
  '007':{s:'think'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'explain'},'013':{s:'explain'}});

/* A hook: excess returns, but no number */
scene(0,4.14,C.compose([[0,'paper','白皮书 p7']],
  C.headline({html:'能挑出<b>超额收益</b>的股票',at:.96,size:68,top:70,align:'center'}),
  C.custom(`<div class="abs bignum num">??.?%</div>`,(t,el)=>{const e=el.firstChild;slam(e,t,2.91,.35,-4);e.style.opacity=Math.min(+e.style.opacity||0,1)}),
  C.headline({html:'却没给<b>一个数字</b>',at:3.16,size:76,top:600,align:'center'})));
flash(0);punch(0,1.08,.5);sound(0,'hit',.8);sound(1.61,'pop',.45);sound(2.91,'hit',.7);shake(3.0,12);

/* B not a single number? */
scene(4.14,5.79,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'一个数字<br>都<b>没有</b>？',at:4.21,size:110,top:240,align:'center'})));
sound(4.21,'whoosh',.4);

/* C screen S&P 500 members for GEX near zero */
scene(5.79,11.58,C.compose([[0,'paper','白皮书 p7']],
  C.flow({top:70,h:130,gap:46,items:[{at:6.34,html:'标普 <span class="num">500</span> <b>成分股</b>'},{at:7.74,html:'筛选伽马敞口<b>接近零</b>',color:'#f3efe6'},{at:9.82,html:'→ 得到<b>超额收益</b>',color:'#ffe14d'}]})));
sound(6.96,'pop',.45);sound(8.18,'pop',.45);sound(10.72,'hit',.6);punch(10.75,1.05);

/* D no return, no sample years, no costs; "further investigation" */
scene(11.58,17.0,C.compose([[0,'ours','我们的观察（白皮书 p7）']],
  C.points({top:60,step:130,lines:[{at:11.72,mark:'x',html:'没有<b>收益率</b>'},{at:12.86,mark:'x',html:'没有<b>样本年份</b>'},{at:13.92,mark:'x',html:'没有算<b>成本</b>'}]}),
  C.custom(`<div class="abs note5 float">作者：<b>有待进一步研究</b></div>`,(t,el)=>slam(el.firstChild,t,15.66,.35,-2))));
sound(11.92,'hit',.45);sound(13.08,'hit',.45);sound(14.16,'hit',.45);sound(15.76,'pop',.5);

/* E near zero, hedging interferes least with price */
scene(17.0,21.91,C.compose([[0,'paper','白皮书 p6']],
  C.flow({top:110,h:150,gap:56,items:[{at:18.38,html:'伽马敞口<b>接近零</b>'},{at:19.72,html:'做市商的对冲<br><b>最不干扰</b>价格',color:'#d9f5e3'}]})));
sound(18.72,'pop',.45);sound(20.92,'hit',.55);

/* F why excess returns, then? */
scene(21.91,24.41,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'那<b>为什么</b><br>会有超额收益？',at:21.98,size:92,top:250,align:'center'})));
sound(22.04,'whoosh',.4);

/* G not explained: a lead to verify (OURS) */
scene(24.41,28.16,C.compose([[0,'ours','我们的提醒']],
  C.points({top:120,step:200,lines:[{at:24.98,mark:'x',html:'白皮书<b>没解释</b>'},{at:26.22,mark:'ok',html:'只能当<b>待验证的线索</b>'}]})));
sound(25.08,'hit',.5);sound(27.02,'pop',.5);

/* H usable on any single stock with enough OI, or a whole sector */
scene(28.16,33.2,C.compose([[0,'paper','白皮书 p7']],
  C.headline({html:'还能用在',at:28.36,size:72,top:70,align:'center'}),
  C.vs({top:240,h:400,badge:'或',vsAt:32.1,left:{at:29.86,html:'未平仓量够大的<span class="big">个股</span>'},right:{at:32.32,html:'整个<span class="big">板块</span>',color:'#ffe14d'}})));
sound(29.98,'pop',.45);sound(32.6,'pop',.45);

/* I conclusion: smarter than quote-implied volatility */
scene(33.2,37.73,C.compose([[0,'paper','白皮书 p7 结论']],
  C.headline({html:'作者的结论很<b>笃定</b>',at:33.6,size:68,top:70,align:'center'}),
  C.vs({top:240,h:400,badge:'＞',vsAt:36.92,left:{at:34.94,html:'<span class="big">伽马敞口</span>',color:'#ffe14d'},right:{at:35.84,html:'报价算出的<span class="big">波动率</span>'}}),
  C.custom(`<div class="abs smart float">更聪明？</div>`,(t,el)=>pop(el.firstChild,t,37.08))));
sound(33.98,'pop',.45);sound(36.92,'hit',.6);sound(37.08,'ding',.45);

/* J every dealer's book differs; one narrow spread hides others' risk appetite */
scene(37.73,43.81,C.compose([[0,'paper','白皮书 p7 结论']],
  C.tiles({cols:3,top:70,h:200,items:[{at:38.54,html:'账本 <span class="num">A</span>'},{at:38.84,html:'账本 <span class="num">B</span>'},{at:39.14,html:'账本 <span class="num">C</span>'}]}),
  C.flow({top:330,h:130,gap:46,items:[{at:40.36,html:'一家报出<b>很窄的价差</b>',color:'#f3efe6'},{at:41.98,html:'遮住其他人的<b>风险偏好</b>',color:'#ffd6d6'}]})));
sound(38.54,'pop',.4);sound(38.84,'pop',.4);sound(39.14,'pop',.4);sound(41.46,'pop',.45);sound(42.98,'hit',.55);

/* K written by a data vendor, not peer reviewed */
scene(43.81,47.87,C.compose([[0,'paper','白皮书 p1']],
  C.vs({top:150,h:420,badge:'≠',vsAt:46.08,left:{at:44.7,html:'卖数据的<span class="big">公司</span>写的',color:'#ffe14d'},right:{at:46.74,html:'<span class="big">同行评审</span>论文'}})));
sound(45.24,'pop',.45);sound(47.08,'hit',.5);

/* L disclaimer: accuracy and completeness not guaranteed */
scene(47.87,52.55,C.compose([[0,'paper','白皮书 p1 免责声明']],
  C.custom(`<img class="abs disc card" src="media/WP-P1-DISCLAIMER.png">`,(t,el)=>pop(el.firstChild,t,48.0)),
  C.custom('<div class="abs dz"><div class="d1">✗ 不保证</div><div class="d2"><b>准确</b>和<b>完整</b></div></div>',(t,el)=>{slam(el.querySelector('.d1'),t,50.35,.35,-2);slam(el.querySelector('.d2'),t,50.96,.35,2)})));
sound(48.0,'whoosh',.4);sound(50.44,'hit',.5);sound(51.78,'pop',.45);

/* M listen to the mechanism, discount the numbers (OURS) */
scene(52.55,99,C.compose([[0,'ours','我们的小结']],
  C.vs({top:150,h:420,badge:'但',vsAt:53.38,left:{at:52.92,html:'机制<span class="big">可以听</span>',color:'#d9f5e3'},right:{at:54.06,html:'数字要<span class="big">打个折扣</span>',color:'#ffe14d'}})));
sound(53.24,'pop',.45);sound(54.6,'hit',.6);punch(54.65,1.05);
