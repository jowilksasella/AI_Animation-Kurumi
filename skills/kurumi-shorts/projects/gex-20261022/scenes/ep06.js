/* ep06 先问单位 — beats on word starts (python tools/brief.py ep06).
   EXT-BDLM2021 = Baltussen, Da, Lammers & Martens 2021 (an example of dividing by market cap). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['伽马敞口','单位','未平仓量','合约','看涨期权','看跌期权','正伽马','负伽马','美元','股数','市值','斤','公斤']);
cast({'001':{s:'explain'},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'question'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'concern'},'012':{s:'explain'},'013':{s:'concern'},'014':{s:'explain'}});

/* formula line: pieces appear on their words */
const formula=(parts,top)=>`<div class="abs fml" style="top:${top}px">${parts.map((p,i)=>`<span class="fp" data-a="${p[0]}">${p[1]}</span>`).join('')}</div>`;
const fmlUpdate=(t,el)=>el.querySelectorAll('.fp').forEach(s=>pop(s,t,+s.dataset.a,.35));

/* A hook: a scary number — ask the unit first */
scene(0,3.8,C.compose([[0,'ours','我们的提醒（数字为示意）']],
  C.stat({at:.18,count:[.3,1.5],value:87,prefix:'−',suffix:' 亿',label:'吓人的伽马敞口数字？',labelAt:.9,top:120}),
  C.headline({html:'先问<b>单位</b>',at:3.0,size:96,top:580,align:'center'})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(1.5,'tick',.4);sound(3.0,'hit',.7);shake(3.05,12);

/* B units can differ? */
scene(3.8,5.59,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'单位还能<br><b>不一样</b>？',at:3.87,size:100,top:250,align:'center'})));
sound(3.87,'whoosh',.4);

/* C the call formula */
scene(5.59,11.28,C.compose([[0,'paper','白皮书 p5 公式']],
  C.headline({html:'看涨期权的<b>伽马敞口</b>',at:7.12,size:64,top:80,align:'center'}),
  C.custom(formula([[9.02,'伽马'],[9.38,'×'],[9.82,'未平仓量'],[10.44,'×'],[10.58,'<b class="num">100</b>']],330),fmlUpdate)));
sound(6.46,'whoosh',.4);sound(9.02,'pop',.45);sound(9.82,'pop',.45);sound(10.58,'hit',.55);punch(10.6,1.05);

/* D why 100: one contract = 100 shares */
scene(11.28,14.21,C.compose([[0,'paper','白皮书 p5']],
  C.vs({top:180,h:420,badge:'=',vsAt:13.34,left:{at:12.62,html:'<span class="big num">1</span>张合约'},right:{at:13.6,html:'<span class="big num">100</span><span>股</span>',color:'#ffe14d'}})));
sound(12.62,'pop',.45);sound(13.6,'hit',.55);

/* E what is open interest? */
scene(14.21,17.57,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'<b>未平仓量</b><br>是什么？',at:14.28,size:100,top:250,align:'center'})));
sound(14.28,'whoosh',.4);

/* F open interest (OURS definition) */
scene(17.57,21.63,C.compose([[0,'ours','常识定义']],
  C.headline({html:'未平仓量',at:17.64,size:96,top:80,align:'center'}),
  C.flow({top:300,h:140,gap:56,items:[{at:18.74,html:'某天<b>收盘</b>时'},{at:20.08,html:'市场上还存在的<b>合约总数</b>',color:'#ffe14d'}]})));
sound(18.74,'pop',.45);sound(20.74,'hit',.5);

/* G puts multiply by -100: short gamma for market makers */
scene(21.63,25.98,C.compose([[0,'paper','白皮书 p5 公式']],
  C.headline({html:'看跌期权',at:21.7,size:72,top:80,align:'center'}),
  C.custom(formula([[21.9,'伽马'],[22.0,'×'],[22.1,'未平仓量'],[22.38,'×'],[22.86,'<b class="num">(−100)</b>']],280)+'<div class="abs chip2 float">对做市商：<b>负伽马</b></div>',
    (t,el)=>{fmlUpdate(t,el);slam(el.querySelector('.chip2'),t,25.08,.35,-2)})));
sound(22.86,'hit',.6);shake(22.9,10);sound(25.24,'hit',.5);

/* H sum over every expiry and strike */
scene(25.98,30.84,C.compose([[0,'paper','白皮书 p5']],
  C.custom(`<div class="abs grid">${[...Array(20)].map((_,i)=>`<i data-a="${(26.6+i*.06).toFixed(2)}" class="${i%3?'':'neg'}"></i>`).join('')}</div>
    <div class="abs gl1">所有到期月 × 所有行权价</div><div class="abs sum float">∑</div>`,
    (t,el)=>{el.querySelectorAll('.grid i').forEach(c=>pop(c,t,+c.dataset.a,.3));vis(el.querySelector('.gl1'),appear(t,26.6));
      const k=eo(seg(t,28.4,29.0));el.querySelector('.grid').style.transform=`scale(${1-.75*k})`;el.querySelector('.grid').style.opacity=1-.8*k;pop(el.querySelector('.sum'),t,28.4)}),
  C.headline({html:'= 整个指数的<b>伽马敞口</b>',at:29.86,size:60,top:690,align:'center'})));
sound(26.6,'whoosh',.4);sound(28.4,'hit',.6);punch(28.4,1.07);sound(29.98,'pop',.45);

/* I sign of the sum (our reading, based on p6) */
scene(30.84,35.73,C.compose([[0,'ours','我们的解读（依据 p6）']],
  C.vs({top:160,h:460,badge:'或',vsAt:33.66,left:{at:31.62,html:'总和 <b class="num">＞0</b><span class="big">正伽马</span>做市商整体',color:'#d9f5e3'},right:{at:34.72,html:'总和 <b class="num">＜0</b><span class="big">负伽马</span>做市商整体',color:'#ffd6d6'}})));
sound(31.62,'pop',.45);sound(33.36,'hit',.5);sound(35.04,'hit',.5);

/* J the white paper's unit for SPX: dollars, not shares */
scene(35.73,40.15,C.compose([[0,'paper','白皮书 p5 脚注']],
  C.headline({html:'白皮书算<b>标普</b>时',at:36.56,size:68,top:70,align:'center'}),
  C.vs({top:240,h:400,badge:'不是',vsAt:39.0,left:{at:38.26,html:'单位<span class="big">美元</span>',color:'#ffe14d'},right:{at:39.5,html:'单位<span class="big">股数</span>'}})));
sound(38.26,'hit',.55);sound(39.5,'pop',.45);

/* K different desks use different units */
scene(40.15,44.96,C.compose([[0,'ours','口径差异（例：Baltussen 等 2021）']],
  C.headline({html:'各家<b>口径</b>不同',at:40.58,size:72,top:70,align:'center'}),
  C.tiles({cols:1,top:220,h:150,gap:30,items:[{at:41.18,html:'按<b>每 1 点</b>'},{at:42.46,html:'按<b>每 1%</b>'},{at:43.9,html:'再<b>除以市值</b>',hot:true}]})));
sound(41.18,'pop',.45);sound(42.6,'pop',.45);sound(44.11,'hit',.5);

/* L jin vs kilogram (OURS analogy) */
scene(44.96,50.29,C.compose([[0,'ours','我们的比喻']],
  C.vs({top:90,h:400,badge:'=',vsAt:47.82,left:{at:45.79,html:'<span class="big num">100</span><span>斤</span>'},right:{at:46.78,html:'<span class="big num">50</span>公斤',color:'#ffe14d'}}),
  C.headline({html:'数字差一倍<br>人可<b>没变胖</b>',at:48.26,size:72,top:560,align:'center'})));
sound(45.79,'pop',.45);sound(46.78,'pop',.45);sound(49.36,'hit',.55);shake(49.5,8);

/* M don't compare sources directly (OURS) */
scene(50.29,53.36,C.compose([[0,'ours','我们的提醒']],
  C.points({top:200,step:200,lines:[{at:50.54,mark:'x',strike:52.56,html:'不同来源<b>直接比</b>'}]})));
sound(50.54,'hit',.5);sound(52.56,'tick',.6);shake(52.6,10);

/* N three questions (OURS summary) */
scene(53.36,99,C.compose([[0,'ours','我们的小结']],
  C.flow({top:100,h:150,gap:56,items:[{at:54.14,html:'① 怎么<b>算</b>的'},{at:55.5,html:'② 是<b>正</b>是<b>负</b>',color:'#f3efe6'},{at:56.32,html:'③ 有<b>多大</b>',color:'#ffe14d'}]})));
sound(54.14,'pop',.45);sound(55.5,'pop',.45);sound(56.32,'hit',.55);
