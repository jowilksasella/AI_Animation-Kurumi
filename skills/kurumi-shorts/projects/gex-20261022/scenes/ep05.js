/* ep05 减震器和放大器 — beats on word starts (python tools/brief.py ep05). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['做市商','减震','火上浇油','正伽马','负伽马','德尔塔','伽马','车速','加速度','减震器','放大器','看跌期权','看涨期权']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'question'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'explain'},'009':{s:'explain'},'010':{s:'question'},'011':{s:'concern',s2:[[44.04,'explain']]},'012':{s:'explain'}});

/* sine waves: grey input, coloured response (amplitude k × input) — an illustration */
function wavePath(amp,cyc=2.5,w=900,y0=200){let d='';for(let i=0;i<=180;i++){const x=i/180*w;d+=(i?'L':'M')+(x+50).toFixed(1)+' '+(y0-amp*Math.sin(x/w*cyc*2*Math.PI)).toFixed(1)}return d}
const waveSvg=(k,color,top)=>`<svg class="abs wv" width="1000" height="400" viewBox="0 0 1000 400" style="top:${top}px"><path d="${wavePath(70)}" fill="none" stroke="#9aa7b1" stroke-width="6" stroke-dasharray="14 10"/>
  <path class="out" d="${wavePath(70*k)}" fill="none" stroke="${color}" stroke-width="11" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/></svg>`;

/* A hook: absorber or amplifier */
scene(0,4.35,C.compose([[0,'paper','白皮书 p6']],
  C.headline({html:'同一群<b>做市商</b>',at:0,size:84,top:70,align:'center'}),
  C.vs({top:240,h:420,badge:'?',vsAt:3.14,left:{at:1.7,html:'帮市场<span class="big">减震</span>',color:'#d9f5e3'},right:{at:3.36,html:'火上<span class="big">浇油</span>',color:'#ffd6d6'}})));
flash(0);punch(0,1.1,.5);sound(0,'hit',.8);sound(1.7,'pop',.5);sound(3.48,'hit',.6);shake(3.5,12);

/* B both roles? */
scene(4.35,7.24,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'两种角色<br>都是<b>他们</b>？',at:4.42,size:100,top:240,align:'center'})));
sound(4.42,'whoosh',.4);

/* C positive or negative gamma; gamma = speed of delta change */
scene(7.24,11.47,C.compose([[0,'paper','白皮书 p5–p6']],
  C.vs({top:70,h:330,badge:'还是',vsAt:8.6,left:{at:8.14,html:'<span class="big">正</span>伽马',color:'#d9f5e3'},right:{at:8.8,html:'<span class="big">负</span>伽马',color:'#ffd6d6'}}),
  C.headline({html:'伽马 = 德尔塔<br>变化的<b>速度</b>',at:9.86,size:68,top:480,align:'center'})));
sound(8.14,'pop',.45);sound(8.8,'pop',.45);sound(9.86,'hit',.55);

/* D speed and acceleration (OURS analogy) */
scene(11.47,14.43,C.compose([[0,'ours','我们的比喻']],
  C.vs({top:180,h:440,badge:'≈',vsAt:12.98,left:{at:12.22,html:'德尔塔<span class="big">车速</span>'},right:{at:13.58,html:'伽马<span class="big">加速度</span>',color:'#ffe14d'}})));
sound(12.4,'pop',.45);sound(13.74,'hit',.5);

/* E bigger gamma, more shares to adjust (our explanation) */
scene(14.43,19.46,C.compose([[0,'ours','我们的说明']],
  C.flow({top:100,h:150,gap:56,items:[{at:15.56,html:'伽马<b>越大</b>'},{at:16.8,html:'德尔塔变得<b>越快</b>',color:'#f3efe6'},{at:18.44,html:'要调整的股数<b>越多</b>',color:'#ffe14d'}]})));
sound(15.56,'pop',.45);sound(16.8,'pop',.45);sound(18.94,'hit',.55);

/* F the white paper's example: 50-delta call, gamma 10 */
scene(19.46,23.65,C.compose([[0,'paper','白皮书 p5']],
  C.headline({html:'白皮书的例子',at:19.52,size:72,top:70,align:'center'}),
  C.tiles({cols:2,top:250,h:340,items:[{at:20.64,html:'<span class="num big2">50</span><small>德尔塔的看涨期权</small>'},{at:22.82,html:'<span class="num big2">10</span><small>伽马</small>',hot:true}]})));
sound(20.64,'pop',.5);sound(23.27,'sparkle',.6);punch(23.27,1.06);

/* G up one point: delta 60, short 10 more */
scene(23.65,28.68,C.compose([[0,'paper','白皮书 p5']],
  C.flow({top:100,h:150,gap:56,items:[{at:23.72,html:'做市商<b>买入</b>它'},{at:25.16,html:'涨 <span class="num">1</span> 点 → 德尔塔 <b class="num">60</b>',color:'#d9f5e3'},{at:27.62,html:'再<b>卖空 <span class="num">10</span> 股</b>',color:'#ffd6d6'}]})));
sound(23.72,'pop',.45);sound(26.2,'hit',.5);sound(28.16,'hit',.55);

/* H down one point: delta 40, buy 10 back */
scene(28.68,34.0,C.compose([[0,'paper','白皮书 p5']],
  C.flow({top:90,h:140,gap:50,items:[{at:28.88,html:'跌 <span class="num">1</span> 点 → 德尔塔 <b class="num">40</b>',color:'#ffd6d6'},{at:30.8,html:'<b>买回 <span class="num">10</span> 股</b>',color:'#d9f5e3'}]}),
  C.headline({html:'涨了<b>卖</b>，跌了<b>买</b>',at:32.41,size:80,top:520,align:'center'})));
sound(28.88,'pop',.45);sound(31.1,'hit',.5);sound(32.41,'hit',.55);

/* I positive gamma = shock absorber (illustration) */
scene(34.0,37.95,C.compose([[0,'paper','白皮书 p6（波形为示意）']],
  C.headline({html:'<b>正伽马</b> = 减震器',at:34.44,size:80,top:70,align:'center'}),
  C.custom(waveSvg(.35,'#20a35a',260)+'<div class="abs chip hi float">高处卖</div><div class="abs chip lo float">低处买</div>',
    (t,el)=>{el.querySelector('.out').style.strokeDashoffset=100-100*eo(seg(t,34.6,36.8));pop(el.querySelector('.hi'),t,35.74);pop(el.querySelector('.lo'),t,36.38)})));
sound(34.44,'hit',.55);sound(35.74,'pop',.45);sound(36.38,'pop',.45);

/* J short puts: still selling when it falls = negative gamma */
scene(37.95,41.71,C.compose([[0,'paper','白皮书 p5']],
  C.headline({html:'卖出<b>看跌期权</b>',at:38.26,size:80,top:90,align:'center'}),
  C.points({top:330,step:190,lines:[{at:39.84,html:'跌了<b>还要卖</b>'},{at:40.88,html:'= <b>负伽马</b>'}]})));
sound(38.26,'whoosh',.4);sound(39.84,'hit',.5);sound(40.88,'hit',.6);shake(40.9,10);

/* K negative gamma amplifies; near zero the market moves naturally (illustration) */
scene(41.71,46.6,C.compose([[0,'paper','白皮书 p6（波形为示意）']],
  C.headline({html:'<b>负伽马</b> = 放大器',at:42.04,size:80,top:70,align:'center'}),
  C.custom(waveSvg(1.7,'#e5383b',260),(t,el)=>{el.querySelector('.out').style.strokeDashoffset=100-100*eo(seg(t,42.2,43.6))},{to:44.2}),
  C.custom(waveSvg(1,'#1f7ae0',260)+'<div class="abs chip zero">伽马敞口接近 <b class="num">0</b>：自然地走</div>',
    (t,el)=>{el.querySelector('.out').style.strokeDashoffset=100-100*eo(seg(t,44.5,45.9));pop(el.querySelector('.zero'),t,44.38)},{from:44.3})));
sound(42.62,'hit',.6);shake(43.0,14);sound(44.38,'pop',.5);

/* L part of the swing depends on which side market makers are on (OURS) */
scene(46.6,99,C.compose([[0,'ours','我们的小结']],
  C.headline({html:'市场<b>晃不晃</b>',at:47.42,size:96,top:110,align:'center'}),
  C.tiles({cols:1,top:400,h:240,items:[{at:48.6,html:'一部分取决于<br><b>做市商站在哪一边</b>',hot:true}]})));
sound(47.42,'hit',.55);sound(48.6,'sparkle',.6);punch(49.86,1.05);
