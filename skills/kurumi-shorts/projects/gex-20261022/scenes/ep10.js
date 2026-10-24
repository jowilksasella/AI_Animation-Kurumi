/* ep10 那张散点图 — beats on word starts (python tools/brief.py ep10).
   WP-P6-FIG crop 988x733: x 0 at px 446, 107 px per 1e9 USD; y 0% at px 405, 15.5 px per 1%. */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['伽马敞口','暴涨暴跌','横轴','纵轴','交易日','亿美元','指数式','别的解释','回归','控制','反过来读','细线']);
cast({'001':{s:'explain'},'002':{s:'question'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'surprise'},'006':{s:'explain'},
  '007':{s:'explain'},'008':{s:'concern'},'009':{s:'explain'},'010':{s:'question'},'011':{s:'explain'},'012':{s:'explain'},'013':{s:'think'}});
const FIG={img:'WP-P6-FIG',size:[988,733]};

/* A hook: crashes and spikes crowd on one side */
scene(0,3.55,C.compose([[0,'paper','白皮书 p6 散点图']],
  C.figure(Object.assign({at:0,marks:[{at:2.5,ellipse:[340,400,125,175]}],callouts:[{at:1.32,pos:[560,160],html:'<b>暴涨暴跌</b>'},{at:2.7,pos:[560,250],html:'挤在<b>一边</b>'}]},FIG))));
flash(0);punch(0,1.08,.5);sound(0,'hit',.8);sound(1.32,'pop',.5);sound(2.7,'hit',.6);shake(2.75,10);

/* B which side? */
scene(3.55,4.46,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'哪一边？',at:3.62,size:130,top:300,align:'center'})));
sound(3.62,'whoosh',.4);

/* C GEX below zero; the axes */
scene(4.46,11.19,C.compose([[0,'paper','白皮书 p6']],
  C.figure(Object.assign({at:4.5,marks:[{at:5.14,ellipse:[340,400,125,175]}],
    callouts:[{at:5.51,pos:[150,250],html:'伽马敞口 <b class="num">&lt; 0</b>'},{at:6.62,pos:[340,20],html:'横轴：前一天收盘的<b>伽马敞口</b>'},{at:8.97,pos:[340,95],html:'纵轴：标普<b>第二天涨跌幅</b>'}]},FIG))));
sound(5.14,'pop',.5);sound(6.62,'pop',.45);sound(8.97,'pop',.45);

/* D one dot per day; x runs about -2bn to +3bn USD (our reading) */
scene(11.19,16.96,C.compose([[0,'paper','白皮书 p6｜标注是我们的读图']],
  C.figure(Object.assign({at:11.2,marks:[{at:13.4,ellipse:[768,405,22,22]},{at:15.4,ellipse:[232,405,22,22]}],
    callouts:[{at:11.68,pos:[470,20],html:'每个点 = <b>1 个交易日</b>'},{at:14.3,pos:[600,540],html:'约 <b class="num">+30 亿</b>美元'},{at:16.16,pos:[120,540],html:'约 <b class="num">−20 亿</b>'}]},FIG))));
sound(11.68,'pop',.45);sound(14.43,'pop',.5);sound(16.16,'pop',.5);

/* E below zero: wide scatter, days beyond 10% */
scene(16.96,21.18,C.compose([[0,'paper','白皮书 p6｜标注是我们的读图']],
  C.figure(Object.assign({at:17.0,zoom:{at:17.15,center:[380,400],s:1.45},marks:[{at:19.64,ellipse:[380,226,16,16]},{at:19.9,ellipse:[425,238,16,16]}],
    callouts:[{at:17.88,pos:[600,560],html:'散得<b>很开</b>'},{at:19.64,pos:[560,30],html:'超过 <b class="num">10%</b>'}]},FIG))));
sound(17.15,'whoosh',.4);sound(18.06,'pop',.45);sound(20.04,'hit',.6);shake(20.1,10);

/* F further right: a thin band */
scene(21.18,25.65,C.compose([[0,'paper','白皮书 p6｜标注是我们的读图']],
  C.figure(Object.assign({at:21.2,zoom:{at:21.4,center:[680,405],s:1.6},marks:[{at:22.52,ellipse:[680,405,100,24]}],
    callouts:[{at:24.38,pos:[140,540],html:'挤成一条<b>细线</b>'}]},FIG))));
sound(21.4,'whoosh',.4);sound(22.52,'pop',.45);sound(24.68,'hit',.55);

/* G the author: volatility rises exponentially below zero */
scene(25.65,31.64,C.compose([[0,'paper','白皮书 p6 作者解读']],
  C.quote({heading:'作者：跌破零后<br>波动<b>指数式</b>上升',img:'WP-P6-NOTE',at:25.72,top:100,sweepAt:29.46})));
sound(25.72,'whoosh',.4);sound(30.46,'hit',.6);punch(30.5,1.06);

/* H "exponential" means a sudden jump (our reading; illustration) */
scene(31.64,35.91,C.compose([[0,'ours','我们的解读（曲线为示意）']],
  C.custom(`<svg class="abs" width="1000" height="620" viewBox="0 0 1000 620" style="top:80px"><line x1="80" y1="540" x2="940" y2="540" stroke="#15202b" stroke-width="6"/><line x1="80" y1="540" x2="80" y2="40" stroke="#15202b" stroke-width="6"/>
      <path d="M80 500 L940 340" fill="none" stroke="#9aa7b1" stroke-width="8" stroke-dasharray="18 12"/>
      <path class="ex" d="M80 510 C520 505 700 470 800 360 S920 120 940 60" fill="none" stroke="#e5383b" stroke-width="12" stroke-linecap="round" pathLength="100" stroke-dasharray="100"/>
      <text x="80" y="600" font-size="34" font-weight="900" fill="#15202b">伽马敞口：正</text><text x="940" y="600" font-size="34" font-weight="900" fill="#15202b" text-anchor="end">负</text></svg>
    <div class="abs lbl1 float">不是慢慢变晃</div><div class="abs lbl2 float">一下子<b>晃得厉害</b></div>`,
    (t,el)=>{el.querySelector('.ex').style.strokeDashoffset=100-100*eo(seg(t,33.2,35.0));vis(el.querySelector('.lbl1'),appear(t,33.56));slam(el.querySelector('.lbl2'),t,34.76,.35,-3)})));
sound(32.57,'whoosh',.4);sound(34.76,'hit',.65);shake(34.8,14);

/* I "hard to come up with another explanation" */
scene(35.91,38.69,C.compose([[0,'paper','白皮书 p6 作者原话']],
  C.headline({html:'“很难想出<br><b>别的解释</b>”',at:37.16,size:96,top:250,align:'center'})));
sound(37.16,'hit',.55);

/* J a bit too confident (OURS) */
scene(38.69,40.4,C.compose([[0,'ours','我们的反应']],
  C.headline({html:'这口气<br><b>有点满</b>',at:38.86,size:120,top:230,align:'center'})));
sound(39.34,'hit',.6);shake(39.4,12);

/* K the plot only shows the two together (OURS) */
scene(40.4,43.27,C.compose([[0,'ours','相关 ≠ 因果']],
  C.vs({top:180,h:420,badge:'≠',vsAt:42.52,left:{at:41.1,html:'一起<span class="big">出现</span>',color:'#d9f5e3'},right:{at:42.68,html:'<span class="big">谁导致谁</span>'}})));
sound(41.84,'pop',.45);sound(42.68,'hit',.55);

/* L only this one figure: no regression, no controls (our observation) */
scene(43.27,47.73,C.compose([[0,'ours','我们的观察（白皮书 p6）']],
  C.points({top:90,step:170,lines:[{at:44.14,mark:'ok',html:'只有<b>这张图</b>'},{at:45.08,mark:'x',html:'没有<b>回归结果</b>'},{at:46.32,mark:'x',html:'没有<b>控制</b>其他因素'}]})));
sound(44.14,'pop',.45);sound(45.38,'hit',.45);sound(46.56,'hit',.45);

/* M the plot can be read the other way round */
scene(47.73,99,C.compose([[0,'next','下一集']],
  C.headline({html:'真的没有<br><b>别的解释</b>？',at:47.98,size:92,top:90,align:'center'}),
  C.tiles({cols:1,top:430,h:220,items:[{at:50.04,html:'这张图还能<b>反过来读</b>',hot:true}]})));
sound(48.14,'whoosh',.4);sound(50.4,'hit',.6);punch(50.45,1.06);
