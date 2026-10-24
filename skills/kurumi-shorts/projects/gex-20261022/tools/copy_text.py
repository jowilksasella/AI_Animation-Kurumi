"""Per-episode platform copy (titles, descriptions, captions, 牛牛圈 posts).

  python copy_text.py

Source of truth is EPS below, in simplified Chinese; 繁體 is OpenCC s2hk. Claims stay
within the series source map (white paper vs outside research). Writes
social/copy/{youtube,instagram,bilibili,futu}.md and copy.json, prints length checks.
"""
import json, re
from pathlib import Path
import opencc

PROJ = Path(__file__).resolve().parents[1]
README = Path('C:/Invest/Videos/output/speech/gex-anime-shorts-20261022/README.md')
OUT = PROJ / 'social/copy'
S2HK = opencc.OpenCC('s2hk')
WP = 'SqueezeMetrics《Gamma Exposure (GEX)》白皮书（2016 年发布，2017 年修订）'

# q: 牛牛圈 title / question hook; sum: what the episode says; src: research named in it;
# ask: question for comments; kw: episode keywords (simplified, also used as B站 tags)
EPS = {
 '00': dict(q='做市商为了对冲，会怎样推着股市走？',
   sum='把一份期权白皮书拆成 15 集，每集一分钟，一次只讲一个点。它想回答一个问题：做市商为了对冲被迫买卖，会怎样推着股市走。中间会穿插学术研究，分辨哪些说法有证据——毕竟这是数据公司写的白皮书，不是同行评审论文。',
   src='', ask='你平时看过伽马敞口（GEX）的图吗？', kw=['做市商', '系列开场']),
 '01': dict(q='VIX 12 和 15，真的有区别吗？',
   sum='白皮书把 VIX 收盘值分成四等份：最低一组，标普第二天涨跌的标准差是 0.51%；次低一组也只有 0.66%，几乎拉不开。VIX 和过去一个月实际波动的相关性（约 0.85），还高过和未来一个月的（约 0.75）。',
   src='', ask='你会用 VIX 判断市场平不平静吗？', kw=['VIX', '恐慌指数']),
 '02': dict(q='同样平静的两天，怎么分出哪天更危险？',
   sum='同样按四等份分组，伽马敞口最高一组第二天标准差 0.55%，次高一组 0.85%，差距一下子拉开。不过这是两种分组各自第二档的比较，不是同一批日子；数据从 2004 年开始，只有十几年。',
   src='', ask='你觉得“真平静”和“假平静”能提前分出来吗？', kw=['波动率', '标普500']),
 '03': dict(q='期权到期日，股价真的会被“钉住”吗？',
   sum='研究发现，有期权的个股，到期日收盘价更容易落在行权价附近；模型解释是做市商的对冲买卖，可能把股价往行权价拉——这是可能，不是必然。白皮书想问的是：平时没到期的期权，每天又怎样推着市场走。',
   src='Ni, Pearson & Poteshman（2005，《金融经济学期刊》）；Avellaneda & Lipkin（2003，《定量金融》）',
   ask='你遇过到期日股价贴着行权价收盘吗？', kw=['期权到期', '行权价']),
 '04': dict(q='为什么有人股价越跌，越得卖？',
   sum='做市商卖出一张 20 德尔塔的看跌期权，先卖空约 20 股对冲；股价下跌、德尔塔升到 50，他还得再卖空 30 股。跌了卖、涨了买，一直追着价格跑——这就是负伽马，也是伽马敞口的基础。',
   src='', ask='德尔塔对冲这个概念，你之前听过吗？', kw=['德尔塔对冲', '负伽马']),
 '05': dict(q='做市商什么时候减震，什么时候火上浇油？',
   sum='伽马就是德尔塔变化的速度。正伽马时，做市商的对冲高处卖、低处买，像减震器；负伽马时跌了还要卖，像放大器；伽马敞口接近零，市场比较自然地走。',
   src='', ask='用“车速和加速度”来理解德尔塔和伽马，清楚吗？', kw=['正伽马', '负伽马']),
 '06': dict(q='看到吓人的 GEX 数字，先问单位',
   sum='白皮书公式：看涨期权是伽马 × 未平仓量 × 100，看跌期权乘以 −100，再把所有到期月、所有行权价加起来。白皮书算标普时用美元；有的机构按每一点、每 1%，有的还除以市值，不同来源的数字别直接比。',
   src='', ask='你看的 GEX 数据，是用哪种单位？', kw=['未平仓量', 'GEX计算']),
 '07': dict(q='伽马敞口其实是在“猜”谁买谁卖？',
   sum='标普期权大多在买卖价中间成交，看不出方向，所以白皮书假设：看涨期权是投资者卖出、做市商买入（备兑看涨）；看跌期权是投资者买入、做市商卖出（买保险）。看跌那边有研究支持，但作者拿 GEX 的效果来支持假设，有点循环论证。',
   src='Bollen & Whaley（2004，《金融期刊》）', ask='你觉得这个“平均画像”可信吗？', kw=['备兑看涨', '看跌期权']),
 '08': dict(q='这份白皮书的算法，被期刊论文借走了',
   sum='白皮书的四个假设——包括谁买谁卖、每笔交易都有一方做德尔塔对冲、做市商精确按德尔塔对冲——后来被一篇期刊论文沿用，后几年的数据还来自 SqueezeMetrics。论文也承认这是估算，并认为因为交易成本，做市商只会间断对冲。',
   src='Baltussen 等（2021，《金融经济学期刊》）', ask='你觉得做市商会“价格一动就对冲”吗？', kw=['学术研究', '对冲']),
 '09': dict(q='就算知道谁做的交易，也看不清做市商的账本',
   sum='《伽马脆弱性》用纳斯达克三家交易所按交易者分类的数据，还原个股期权上做市商的库存，大约覆盖美国个股期权美元成交量的一到两成。但数据不含指数期权，测标普时又回到了白皮书的假设。',
   src='Barbon & Buraschi《Gamma Fragility》（2021 年 3 月工作论文版本，未正式发表）',
   ask='做市商库存，你觉得有可能被准确还原吗？', kw=['伽马脆弱性', '做市商库存']),
 '10': dict(q='一张图，暴涨暴跌全挤在负伽马那边',
   sum='白皮书的散点图：横轴是前一天收盘的伽马敞口，纵轴是标普第二天涨跌。伽马敞口跌破零后，波动明显变大，作者说“很难想出别的解释”。但图只显示两者一起出现，没有回归结果，也没有控制其他因素。',
   src='', ask='这张图，你会怎样解读？', kw=['散点图', '负伽马']),
 '11': dict(q='是负伽马让市场乱，还是市场乱了才有负伽马？',
   sum='也可能是市场先跌、大家抢着买看跌保护，伽马敞口才往负走——下雨时雨伞卖得多，不是雨伞让天下雨。对冲推动价格的机制有研究支持，但图上的强度，不能全算在对冲头上。',
   src='Ni 等（2021，《金融研究评论》）；Frey & Stremme（1997，《数学金融》）',
   ask='你觉得是谁导致了谁？', kw=['因果关系', '动态对冲']),
 '12': dict(q='同一桶水，倒进浴缸和倒进大海',
   sum='伽马和个股涨跌幅的关系，在流动性差的股票上更强。标普期货上，前一天净伽马为负的日子，尾盘半小时更容易顺着当天方向走；净伽马为正时没有显著的日内动量——没动量，不等于反转。这些是统计倾向，不是每天都会这样。',
   src='Barbon & Buraschi《Gamma Fragility》（工作论文）；Baltussen 等（2021，《金融经济学期刊》）',
   ask='你有留意过尾盘半小时的走势吗？', kw=['流动性', '尾盘动量']),
 '13': dict(q='零日期权放大波动？有研究发现正好相反',
   sum='一篇工作论文的摘要说，零日到期期权通过改变做市商的对冲需求，降低了标普的波动，而且主要来自更早买卖、一路持有到最后一天的期权。另外，白皮书用的是前一天收盘的未平仓量，看不到当天新开、当天平掉的仓位。',
   src='Adams 等（2025，SSRN 工作论文；作者页面称已重新投稿《金融研究评论》，尚未接收）',
   ask='你有交易过零日期权（0DTE）吗？', kw=['零日期权', '0DTE']),
 '14': dict(q='说能挑出超额收益，却没给一个数字',
   sum='白皮书说在标普 500 成分股里，筛选伽马敞口接近零的股票能得到超额收益，却没有收益率、样本年份，也没算成本，作者自己写了“有待进一步研究”。这是数据公司的白皮书，不是同行评审论文：机制可以听，数字要打个折扣。',
   src='', ask='没有数字的结论，你会怎样看？', kw=['超额收益', '选股']),
 '15': dict(q='看 GEX 图之前，先问这五个问题',
   sum='一、谁买谁卖，是靠假设还是分类数据？二、单位是什么？三、用的是哪天的持仓？四、标的流动性怎么样？五、它说的是波动大小，不是涨跌方向：负伽马不等于一定会跌。系列到这里完结，谢谢一路看完。',
   src='', ask='五个问题里，你觉得哪个最容易被忽略？', kw=['GEX图', '系列完结']),
}
BASE_KW = ['期权', '伽马敞口', 'GEX', '美股', '金融知识']


def readme():
    rows = {}
    for m in re.finditer(r'^\| (\d\d) \| ([^|]+) \| ([^|]+) \|', README.read_text(encoding='utf-8'), re.M):
        rows[m[1]] = {'title': m[2].strip(), 'hook': m[3].strip().rstrip('。')}
    return rows


def build():
    meta, out = readme(), {}
    for ep, e in EPS.items():
        t, hook = meta[ep]['title'], meta[ep]['hook']
        part = '系列开场' if ep == '00' else f'第 {ep} 集（共 15 集）'
        src = f'资料：{WP}' + (f'；{e["src"]}' if e['src'] else '')
        disc = '影片使用 AI 合成配音。内容只作教育用途，不构成投资建议。'
        kw = BASE_KW + e['kw']
        tc = S2HK.convert
        yt_title = tc(f'{hook}｜{t}') + f' #GEX{ep}'
        yt_desc = tc(f'{e["sum"]}\n\nGEX 白皮书精读 · {part}，每天一分钟。\n{src}\n\n{disc}\n\n') + \
            '关键词：' + ' '.join(kw) + '\n\n' + tc('#Shorts #期权 #伽马敞口')
        ig = tc(f'{hook}\n\n{e["sum"]}\n\n💬 {e["ask"]}\n\nGEX 白皮书精读 · {part}｜每天 20:00 更新\n{src}\n{disc}\n\n') + \
            tc('#期权 #伽马敞口 #GEX #美股 #投资入门')
        bili_title = f'【GEX一分钟 {ep}】{t}：{hook}'
        bili_desc = f'{e["sum"]}\n\nGEX 白皮书精读 · {part}，每天 19:30 更新。\n{src}\n\n{disc}'
        futu_title = tc(e['q'])
        futu = tc(f'{hook}。\n\n{e["sum"]}\n\n{e["ask"]}欢迎留言讨论。\n\n'
                  f'GEX 白皮书精读 · {part}，每晚 21:00 更新。\n{src}\n{disc}')
        out[ep] = dict(youtube=dict(title=yt_title, description=yt_desc),
                       instagram=dict(caption=ig),
                       bilibili=dict(title=bili_title, description=bili_desc, tags=kw[:10]),
                       futu=dict(title=futu_title, body=futu))
    return out


def md(out, plat, fields, head):
    lines = [head, '']
    for ep, d in out.items():
        lines.append(f'## ep{ep}')
        for f in fields:
            v = d[plat][f]
            v = '，'.join(v) if isinstance(v, list) else v
            lines += [f'**{f}**', '', '```', v, '```', '']
    (OUT / f'{plat}.md').write_text('\n'.join(lines), encoding='utf-8')


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    out = build()
    (OUT / 'copy.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    md(out, 'youtube', ['title', 'description'], '# YouTube Shorts（繁體）\n\n每集上載時貼 title 同 description。「經過變造或合成的內容」建議揀「是」。')
    md(out, 'instagram', ['caption'], '# Instagram Reels（繁體）\n\n每集貼 caption（hashtag 控制喺 5 個以內）。')
    md(out, 'bilibili', ['title', 'description', 'tags'], '# Bilibili（简体）\n\n分区建议：知识 → 财经商业；类型：自制。投稿页如有“AI 生成内容”声明，请勾选。')
    md(out, 'futu', ['title', 'body'], '# 牛牛圈（繁體）\n\n發帖時可以用 App 嘅 $ 功能加 SPY、SPX 等標的標籤。')
    for ep, d in out.items():
        tags = len(re.findall(r'#\S+', d['instagram']['caption']))
        print(ep, 'yt', len(d['youtube']['title']), len(d['youtube']['description']),
              'ig', len(d['instagram']['caption']), tags, 'bili', len(d['bilibili']['title']),
              len(d['bilibili']['description']), len(d['bilibili']['tags']), 'futu', len(d['futu']['body']))
