/* ep13 零日期权的反转 — beats on word starts (python tools/brief.py ep13).
   EXT-ADEFOV2025 = Adams, Dim, Eraker, Fontaine, Ornthanalai & Vilkov, SSRN working paper 2025 (abstract level; resubmitted to RFS per author page). */
const {seg,eo,appear,vis,pop,slam}=K;
keywords(['零日到期期权','放大波动','相反','当天到期','工作论文','SSRN','金融研究评论','摘要','对冲需求','波动','长期期权','未平仓量','前一天收盘','不够','永远安全']);
cast({'001':{s:'explain',s2:[[3.26,'surprise']]},'002':{s:'surprise'},'003':{s:'explain'},'004':{s:'explain'},'005':{s:'explain'},'006':{s:'explain'},
  '007':{s:'concern'},'008':{s:'question'},'009':{s:'explain'},'010':{s:'explain'},'011':{s:'explain'},'012':{s:'explain'},'013':{s:'concern'}});
const WP='外部研究｜工作论文（未正式发表）';

/* A hook: feared amplifier, found the opposite */
scene(0,4.4,C.compose([[0,'ext',WP]],
  C.vs({top:80,h:380,badge:'?',vsAt:2.44,left:{at:.22,html:'大家都怕<br><span class="big">放大波动</span>',color:'#ffd6d6'},right:{at:2.6,html:'研究发现<br><span class="big">正好相反</span>',color:'#d9f5e3'}}),
  C.headline({html:'零日到期期权',at:.52,size:84,top:560,align:'center'})));
flash(0);punch(0,1.08,.5);sound(0,'hit',.8);sound(1.54,'pop',.45);sound(3.52,'hit',.7);shake(3.6,12);

/* B the opposite? calmer? */
scene(4.4,7.11,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'相反？<br>让市场<b>更稳</b>了？',at:4.47,size:96,top:250,align:'center'})));
sound(4.47,'whoosh',.4);sound(6.4,'hit',.45);

/* C 0DTE = options expiring today (OURS definition) */
scene(7.11,12.03,C.compose([[0,'ours','常识定义']],
  C.headline({html:'零日到期期权',at:7.18,size:84,top:70,align:'center'}),
  C.tiles({cols:1,top:260,h:180,gap:40,items:[{at:8.32,html:'<b>当天</b>到期的期权'},{at:10.84,html:'这几年交易<b>非常热</b>',hot:true}]})));
sound(7.18,'whoosh',.4);sound(8.86,'pop',.45);sound(11.18,'hit',.5);

/* D Adams et al.: six authors, SSRN 2025, not published */
scene(12.03,17.47,C.compose([[0,'ext',WP]],
  C.flow({top:80,h:130,gap:44,items:[{at:12.1,html:'亚当斯等<b>六位</b>学者'},{at:14.26,html:'<span class="num">2025</span> 年 · <span class="num">SSRN</span>',color:'#f3efe6'},{at:16.28,html:'<b>还没</b>正式发表',color:'#ffe14d'}]})));
sound(12.1,'pop',.45);sound(14.53,'pop',.45);sound(16.64,'hit',.55);

/* E resubmitted to RFS, not accepted */
scene(17.47,22.45,C.compose([[0,'ext','外部研究｜作者主页说明']],
  C.points({top:120,step:200,lines:[{at:18.96,mark:'ok',html:'重新投稿《<b>金融研究评论</b>》'},{at:21.16,mark:'x',html:'还没有被<b>接收</b>'}]})));
sound(19.56,'pop',.45);sound(21.48,'hit',.5);

/* F abstract: 0DTEs lower S&P volatility via market-maker hedging demand */
scene(22.45,28.87,C.compose([[0,'ext',WP+'｜摘要']],
  C.flow({top:70,h:130,gap:44,items:[{at:23.18,html:'零日到期期权的<b>存在</b>'},{at:25.12,html:'改变做市商的<b>对冲需求</b>',color:'#f3efe6'},{at:26.76,html:'<b>降低</b>标普的波动',color:'#d9f5e3'}]})));
sound(23.18,'pop',.45);sound(25.52,'pop',.45);sound(27.3,'hit',.6);punch(27.35,1.06);

/* G that's the abstract's conclusion; read the body for sample and method (OURS) */
scene(28.87,32.7,C.compose([[0,'ours','我们的提醒（证据层级）']],
  C.vs({top:150,h:420,badge:'→',vsAt:30.26,left:{at:29.04,html:'<span class="big">摘要</span>里的结论',color:'#ffe14d'},right:{at:30.78,html:'样本和方法<br>要看<span class="big">正文</span>'}})));
sound(29.52,'pop',.45);sound(31.7,'pop',.45);

/* H because everyone trades it that day? */
scene(32.7,35.28,C.compose([[0,'q','萌智子的疑问']],
  C.headline({html:'因为当天<br>大家都在<b>交易</b>它？',at:32.73,size:88,top:250,align:'center'})));
sound(32.73,'whoosh',.4);

/* I no: long-dated options held to the last day (abstract) */
scene(35.28,41.44,C.compose([[0,'ext',WP+'｜摘要']],
  C.headline({html:'他们说：<b>不是</b>',at:35.5,size:72,top:70,align:'center'}),
  C.custom(`<div class="abs tline"><i class="bar"></i><i class="dot d0"></i><i class="dot d1"></i><span class="lb l0">更早买卖的<b>长期期权</b></span><span class="lb l1">最后一天<br>才变成<b>零日</b></span></div>`,
    (t,el)=>{const b=el.querySelector('.bar');b.style.transform=`scaleX(${eo(seg(t,37.4,39.2))})`;pop(el.querySelector('.d0'),t,36.74);vis(el.querySelector('.l0'),appear(t,37.4));
      pop(el.querySelector('.d1'),t,39.42);slam(el.querySelector('.l1'),t,39.88,.35,2)})));
sound(35.7,'hit',.5);sound(36.96,'pop',.45);sound(38.26,'whoosh',.4);sound(40.24,'hit',.55);

/* J the white paper uses the previous day's closing open interest */
scene(41.44,45.36,C.compose([[0,'paper','白皮书 p6']],
  C.headline({html:'白皮书用的是',at:42.48,size:64,top:70,align:'center'}),
  C.tiles({cols:1,top:250,h:240,items:[{at:43.38,html:'<b>前一天收盘</b>的<br>未平仓量',hot:true}]})));
sound(43.38,'hit',.55);

/* K intraday open-and-close positions don't show in open interest (OURS) */
scene(45.36,49.47,C.compose([[0,'ours','我们的解读']],
  C.flow({top:90,h:130,gap:44,items:[{at:45.7,html:'当天<b>新开</b>'},{at:46.26,html:'当天<b>平掉</b>',color:'#f3efe6'}]}),
  C.custom(`<div class="abs hide float">未平仓量 <b>看不到</b></div>`,(t,el)=>slam(el.firstChild,t,48.7,.35,-3))));
sound(45.88,'pop',.45);sound(46.63,'pop',.45);sound(48.82,'hit',.6);shake(48.9,10);

/* L open interest alone isn't enough (OURS) */
scene(49.47,52.6,C.compose([[0,'ours','我们的小结']],
  C.points({top:200,step:200,lines:[{at:50.84,mark:'x',html:'光看<b>未平仓量</b> → <b>不够</b>'}]})));
sound(52.1,'hit',.55);

/* M just a working-paper abstract: not "forever safe" (OURS) */
scene(52.6,99,C.compose([[0,'ours','我们的提醒']],
  C.points({top:110,step:200,lines:[{at:53.2,mark:'ok',html:'工作论文的<b>摘要</b>'},{at:54.74,mark:'x',strike:56.14,html:'零日期权<b>永远安全</b>'}]})));
sound(53.42,'pop',.45);sound(56.14,'tick',.6);shake(56.2,8);
