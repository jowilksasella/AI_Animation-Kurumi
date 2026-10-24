"""Shorts covers (1080x1920) in the account palette: cream #EED9BA, ink #2A2A2A.

  python covers.py [ep ...] [--langs sc,tc]

Takes a still of each episode's hook scene (end of the opening hook line, per the
series README) with kurumi-shorts render.js, then lays out brand row, title and
the still as a card. Output: covers/<lang>/epNN.png.
"""
import re, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import opencc

PROJ = Path(__file__).resolve().parents[1]
README = Path('C:/Invest/Videos/output/speech/gex-anime-shorts-20261022/README.md')
RENDER = Path(__file__).resolve().parents[3] / 'tools' / 'render.js'  # kurumi-shorts/tools/render.js in this repo
ICON = PROJ / 'covers/icon/gex-icon-coin-sprout-v4-1024.png'
OUT = Path(__import__('json').loads((PROJ / 'project.json').read_text(encoding='utf-8')).get('out_dir', str(PROJ)))  # build pages live in out_dir
FONT = {'tc': 'C:/Windows/Fonts/NotoSansHK-VF.ttf', 'sc': 'C:/Windows/Fonts/NotoSansSC-VF.ttf'}
CREAM, INK = (0xEE, 0xD9, 0xBA), (0x2A, 0x2A, 0x2A)
W, H = 1080, 1920
S2HK = opencc.OpenCC('s2hk')


def episodes():
    rows = {}
    for m in re.finditer(r'^\| (\d\d) \| ([^|]+) \| ([^|]+) \| ([\d.]+) 秒', README.read_text(encoding='utf-8'), re.M):
        rows[m[1]] = {'title': m[2].strip(), 'hook': m[3].strip(), 'hook_s': float(m[4])}
    return rows


def font(lang, size, weight='Black'):
    f = ImageFont.truetype(FONT[lang], size)
    f.set_variation_by_name(weight)
    return f


def still(ep, lang, t):
    out = PROJ / 'covers/stills' / f'ep{ep}-{lang}'
    png = out / f't{t:06.2f}.png'
    if not png.exists():
        subprocess.run(['node', str(RENDER), str(OUT / f'build/ep{ep}-{lang}/index.html'), 'stills', str(out), f'{t:.2f}'],
                       cwd=RENDER.parent, check=True)
    return Image.open(png).convert('RGB')


def wrap(draw, text, f, width):
    lines, cur = [], ''
    for ch in text:
        if draw.textlength(cur + ch, font=f) > width and cur:
            lines.append(cur); cur = ch
        else:
            cur += ch
    return lines + [cur]


def rounded(im, r):
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    return m


def cover(ep, info, lang):
    tx = (lambda s: S2HK.convert(s)) if lang == 'tc' else (lambda s: s)
    im = Image.new('RGB', (W, H), CREAM)
    d = ImageDraw.Draw(im)

    # brand row: icon (circle) + account name, episode pill on the right
    icon = Image.open(ICON).convert('RGB').resize((112, 112), Image.LANCZOS)
    m = Image.new('L', icon.size, 0); ImageDraw.Draw(m).ellipse((0, 0, 111, 111), fill=255)
    d.ellipse((76, 96, 196, 216), fill=INK)
    im.paste(icon, (80, 100), m)
    d.text((222, 156), tx('市场小芽'), font=font(lang, 52, 'Bold'), fill=INK, anchor='lm')
    pill = f'第 {ep} 集'
    pf = font(lang, 44, 'Bold'); pw = d.textlength(pill, font=pf)
    d.rounded_rectangle((W - 80 - pw - 56, 118, W - 80, 194), 38, fill=INK)
    d.text((W - 80 - 28 - pw / 2, 156), pill, font=pf, fill=CREAM, anchor='mm')

    # title, up to two lines, shrinking to fit
    title = tx(info['title'])
    for size in (170, 160, 150, 140, 130):   # one line if it fits at a large size
        tf = font(lang, size)
        if d.textlength(title, font=tf) <= W - 140:
            lines = [title]; break
    else:                                     # otherwise two balanced lines
        half = (len(title) + 1) // 2
        lines = [title[:half], title[half:]]
        for size in (150, 140, 130, 120, 110):
            tf = font(lang, size)
            if max(d.textlength(l, font=tf) for l in lines) <= W - 140:
                break
    y = 300
    for ln in lines:
        d.text((W / 2, y), ln, font=tf, fill=INK, anchor='mt')
        y += int(size * 1.18)
    tag = tx('GEX 白皮书精读 · 一分钟')
    gf = font(lang, 46, 'Bold')
    d.text((W / 2, y + 20), tag, font=gf, fill=INK, anchor='mt')

    # hook still as a sticker card filling the rest; top title strip of the frame cropped off
    t = max(info['hook_s'] - 0.2, 0.8)
    cw = 820
    cx, cy = (W - cw) // 2, y + 20 + 46 + 60
    ch = min(H - 100 - cy, round(1400 * cw / W))
    fr = still(ep, lang, t).crop((0, 240, W, 240 + round(ch * W / cw)))
    fr = fr.resize((cw, ch), Image.LANCZOS)
    cy += (H - 100 - cy - ch) // 2
    r = 44
    d.rounded_rectangle((cx + 16, cy + 16, cx + cw + 16, cy + fr.height + 16), r, fill=INK)
    d.rounded_rectangle((cx - 8, cy - 8, cx + cw + 8, cy + fr.height + 8), r + 8, fill=INK)
    im.paste(fr, (cx, cy), rounded(fr, r))

    out = PROJ / 'covers' / lang / f'ep{ep}.png'
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out)
    return out


if __name__ == '__main__':
    args = sys.argv[1:]
    langs = ['sc', 'tc']
    if '--langs' in args:
        i = args.index('--langs'); langs = args[i + 1].split(','); del args[i:i + 2]
    eps = episodes()
    for ep in args or sorted(eps):
        for lang in langs:
            print(cover(ep, eps[ep], lang))
