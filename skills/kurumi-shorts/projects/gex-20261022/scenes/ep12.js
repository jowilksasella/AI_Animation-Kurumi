/* ep12 浴缸和大海 — beats on word starts (python tools/brief.py ep12).
   EXT-BB2021 = Barbon & Buraschi, "Gamma Fragility" working paper (2021-03); EXT-BDLM2021 = Baltussen et al., JFE 2021. */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['浴缸','大海','伽马脆弱性','流动性','个股','标普期货','尾盘半小时','净伽马','动量','反转','减震器','条件','统计','倾向']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'explain'},'009':{s:'question'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'explain'},'013':{s:'explain'}});
const WP='外部研究｜工作论文（未正式发表）',JFE='外部研究｜期刊论文';

/* water level rising in a container (illustration) */
const tank=(cls,w,h,rise)=>`<div class="abs tank ${cls}" style="width:${w}px;height:${h}px"><i class="water" data-rise="${rise}"></i></div>`;

/* A hook: a bucket into a bathtub vs the sea (OURS analogy) */
scene(0,3.86,C.compose([[0,'ours','我们的比喻']],
  C.headline({html:'同样<b>一桶水</b>',at:0,size:84,top:60,align:'center'}),
  C.custom(`${tank('tub',380,220,.75)}${tank('sea',460,220,.05)}<div class="abs tl1">浴缸</div><div class="abs tl2">大海</div>
    <div class="abs diff float">效果完全<b>不一样</b></div>`,
    (t,el)=>{el.querySelectorAll('.tank').forEach((k,i)=>pop(k,t,1.16+i*.5));
      el.querySelectorAll('.water').forEach((w,i)=>{const r=+w.dataset.rise;w.style.height=(20+(i?6:160)*eo(seg(t,1.4+i*.5,2.2+i*.5)))+'px'});
      vis(el.querySelector('.tl1'),appear(t,1.3));vis(el.querySelector('.tl2'),appear(t,1.92));slam(el.querySelector('.diff'),t,2.98,.35,-2)})));
flash(0);punch(0,1.08,.5);sound(0,'hit',.8);sound(1.3,'pop',.45);sound(2.04,'pop',.45);sound(3.2,'hit',.6);

/* B what does that have to do with GEX? */
scene(3.86,6.36,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'跟<b>伽马敞口</b><br>有什么关系？',at:3.98,size:92,top:250,align:'center'})));
sound(4.18,'whoosh',.4);

/* C "Gamma Fragility": stronger in illiquid stocks */
scene(6.36,11.93,C.compose([[0,'ext',WP+'｜表 V']],
  C.headline({html:'《伽马脆弱性》发现',at:6.43,size:68,top:60,align:'center'}),
  C.flow({top:220,h:140,gap:50,items:[{at:8.02,html:'伽马 ↔ 个股<b>涨跌幅</b>'},{at:10.02,html:'在<b>流动性差</b>的股票上',color:'#f3efe6'},{at:11.16,html:'关系<b>更强</b>',color:'#ffe14d'}]})));
sound(6.68,'hit',.5);sound(8.54,'pop',.45);sound(10.14,'pop',.45);sound(11.3,'hit',.6);punch(11.35,1.06);

/* D illiquid = same money moves the price more (OURS definition) */
scene(11.93,15.76,C.compose([[0,'ours','常识定义']],
  C.headline({html:'流动性差',at:11.99,size:96,top:70,align:'center'}),
  C.flow({top:280,h:140,gap:60,items:[{at:13.14,html:'同样金额的买卖'},{at:14.44,html:'更容易<b>推动价格</b>',color:'#ffe14d'}]})));
sound(12.42,'whoosh',.4);sound(13.52,'pop',.45);sound(14.88,'hit',.55);

/* E deep enough markets: hedging may not move prices at all */
scene(15.76,19.77,C.compose([[0,'ext',WP+'｜§III.A']],
  C.headline({html:'流动性足够好',at:15.83,size:84,top:70,align:'center'}),
  C.points({top:330,step:170,lines:[{at:17.56,mark:'x',html:'对冲<b>推不动</b>价格'}]}),
  C.custom(`<div class="abs maybe">（可能）</div>`,(t,el)=>vis(el.firstChild,appear(t,18.26)))));
sound(16.72,'pop',.45);sound(18.92,'hit',.55);

/* F Baltussen et al.: S&P futures 1996 – May 2020 */
scene(19.77,24.42,C.compose([[0,'ext',JFE+'（巴尔图森等 2021）']],
  C.headline({html:'巴尔图森等人<br>还看了<b>标普期货</b>',at:19.8,size:68,top:60,align:'center'}),
  C.tiles({cols:2,top:330,h:260,items:[{at:21.5,html:'<span class="num big2">1996</span>'},{at:22.24,html:'<span class="num big2">2020</span><small>年 5 月</small>',hot:true}]})));
sound(19.96,'whoosh',.4);sound(21.5,'pop',.45);sound(22.64,'pop',.45);

/* G last half hour vs the day so far (illustration of the setup) */
scene(24.42,29.25,C.compose([[0,'ext',JFE+'｜表 7 设定']],
  C.custom(`<svg class="abs" width="1000" height="560" viewBox="0 0 1000 560" style="top:60px"><rect x="760" y="20" width="200" height="460" rx="16" fill="#ffe14d" opacity=".7"/>
      <path class="d1" d="M40 380 L160 340 L260 360 L380 280 L480 300 L600 220 L720 240" fill="none" stroke="#15202b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100"/>
      <path class="d2" d="M720 240 L800 210 L880 190 L950 150" fill="none" stroke="#e5383b" stroke-width="12" stroke-linecap="round" stroke-dasharray="8 0" pathLength="100" />
      <line x1="40" y1="480" x2="960" y2="480" stroke="#15202b" stroke-width="5"/></svg>
    <div class="abs dl1 float">当天前面的走势</div><div class="abs dl2 float">尾盘<br>半小时</div><div class="abs dq float">?</div>`,
    (t,el)=>{el.querySelector('.d1').style.strokeDashoffset=100-100*eo(seg(t,26.46,27.8));vis(el.querySelector('.dl1'),appear(t,27.2));pop(el.querySelector('.dl2'),t,25.24);
      const d2=el.querySelector('.d2');d2.style.opacity=0;pop(el.querySelector('.dq'),t,28.28)})));
sound(25.24,'pop',.5);sound(26.46,'whoosh',.35);sound(28.28,'pop',.5);

/* H negative net gamma: the last half hour tends to follow the day */
scene(29.25,34.01,C.compose([[0,'ext',JFE+'｜表 7']],
  C.headline({html:'前一天净伽马为<b>负</b>',at:29.32,size:68,top:60,align:'center'}),
  C.custom(`<svg class="abs" width="1000" height="520" viewBox="0 0 1000 520" style="top:200px"><rect x="760" y="10" width="200" height="440" rx="16" fill="#ffe14d" opacity=".7"/>
      <path d="M40 380 L160 340 L260 360 L380 280 L480 300 L600 220 L720 240" fill="none" stroke="#15202b" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="d2" d="M720 240 L800 200 L880 150 L950 90" fill="none" stroke="#e5383b" stroke-width="14" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/></svg>
    <div class="abs chip7 float">尾盘更容易<b>顺着</b>当天方向走</div>`,
    (t,el)=>{el.querySelector('.d2').style.strokeDashoffset=100-100*eo(seg(t,32.5,33.4));slam(el.querySelector('.chip7'),t,32.72,.35,-2)})));
sound(30.54,'pop',.45);sound(32.72,'hit',.6);punch(33.0,1.06);

/* I positive: reversal? */
scene(34.01,36.69,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'净伽马为<b>正</b><br>就会<b>反转</b>吗？',at:34.13,size:92,top:250,align:'center'})));
sound(34.13,'whoosh',.4);sound(35.92,'hit',.45);

/* J no: no significant momentum, and no momentum ≠ reversal */
scene(36.69,42.37,C.compose([[0,'ext',JFE+'｜§4.1']],
  C.headline({html:'<b>不会</b>',at:36.76,size:120,top:70,align:'center'}),
  C.points({top:260,step:170,lines:[{at:38.86,mark:'x',html:'没有显著的<b>日内动量</b>'},{at:40.95,html:'没动量 <b>≠</b> 反转'}]})));
sound(36.76,'hit',.65);shake(36.8,10);sound(39.38,'pop',.45);sound(41.44,'hit',.55);

/* K a shock absorber shrinks the swing, it doesn't push back (OURS) */
scene(42.37,45.73,C.compose([[0,'ours','我们的解读']],
  C.vs({top:150,h:420,badge:'≠',vsAt:44.28,left:{at:42.55,html:'减震器：<br>让晃动<span class="big">变小</span>',color:'#d9f5e3'},right:{at:44.58,html:'让价格<br><span class="big">往回走</span>'}})));
sound(43.33,'pop',.45);sound(45.12,'hit',.5);

/* L the effect is conditional (OURS) */
scene(45.73,50.38,C.compose([[0,'ours','我们的小结']],
  C.headline({html:'伽马的影响<b>有条件</b>',at:46.34,size:72,top:70,align:'center'}),
  C.tiles({cols:2,top:300,h:260,items:[{at:48.64,html:'看<b>流动性</b>'},{at:49.64,html:'看<b>时间点</b>',hot:true}]})));
sound(47.58,'hit',.5);sound(48.76,'pop',.45);sound(49.78,'pop',.45);

/* M statistical tendencies, not every day (OURS) */
scene(50.38,99,C.compose([[0,'ours','我们的提醒']],
  C.points({top:150,step:220,lines:[{at:51.4,mark:'ok',html:'统计上的<b>倾向</b>'},{at:52.16,mark:'x',strike:53.42,html:'每天都会这样'}]})));
sound(51.92,'pop',.45);sound(53.42,'tick',.5);
