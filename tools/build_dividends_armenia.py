"""Import the Armenia dividends article without retyping the author's text.

Usage: python tools/build_dividends_armenia.py /path/to/article.docx
The publication date is 28 October 2026. Legal wording is preserved; only the typos
listed in FIXES are corrected. Structure-only changes: run-together "Вариант А/В"
paragraphs are split into a subheading, text and a list.
"""

import io
import json
import re
import sys
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
from xml.etree import ElementTree as ET
from zipfile import ZipFile

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
SLUG = "dividendy-na-schet-v-armenii-2026"
FIXES = {  # paragraph: (author's text, corrected text)
    10: ("№ ЗР-80-Нот 26.05.2008", "№ ЗР-80-Н от 26.05.2008"),
    29: ("20 млн. AMD", "20 млн AMD"),
}


def clean_url(url):
    parts = urlsplit(url)
    query = urlencode([
        (key, value) for key, value in parse_qsl(parts.query, keep_blank_values=True)
        if not key.lower().startswith("utm_")
        and key.lower() not in {"ysclid", "yclid", "etext"}
    ])
    return urlunsplit((parts.scheme, parts.netloc, parts.path, query, parts.fragment))


with ZipFile(sys.argv[1]) as archive:
    relationships = {
        item.get("Id"): item.get("Target")
        for item in ET.fromstring(archive.read("word/_rels/document.xml.rels"))
    }
    body = ET.fromstring(archive.read("word/document.xml")).find(W + "body")
    assert not body.findall(".//" + W + "tbl"), "Unexpected source table"
    assert not body.findall(".//" + W + "del"), "Review tracked changes first"
    cover = archive.read("word/media/image1.jpeg")


def text_of(element):
    chunks = []
    for child in element:
        if child.tag == W + "t":
            chunks.append(child.text or "")
        elif child.tag == W + "noBreakHyphen":
            chunks.append("-")
        elif child.tag in {W + "br", W + "tab"}:
            chunks.append(" ")
        elif child.tag == W + "hyperlink":
            url = relationships[child.get(R + "id")]
            assert url.startswith(("https://", "http://")), url
            chunks.append(f"[{text_of(child)}]({clean_url(url)})")
        else:
            chunks.append(text_of(child))
    return "".join(chunks)


def typography(text):
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"(?<=\d) (?=\d{3}(?:\D|$))", " ", text)
    return re.sub(r"(?<=\d) (?=(?:млн|тыс\.|руб\.|рублей|дня|г\.|AMD|USD|\$))", " ", text)


raw = [text_of(p) for p in body.findall(W + "p")]
raw = [p for p in raw if p.strip()]
assert len(raw) == 31, f"Review changed source: {len(raw)} paragraphs"
raw = dict(enumerate(raw, 1))
for number, (wrong, right) in FIXES.items():
    assert raw[number].count(wrong) == 1, f"Fix not applicable in paragraph {number}"
    raw[number] = raw[number].replace(wrong, right)
paragraphs = {n: typography(t) for n, t in raw.items()}

used = []
def take(number):
    used.append(number)
    return paragraphs[number]

def split_once(text, sep):
    parts = text.split(sep, 1)
    assert len(parts) == 2 and sep not in parts[1], f"Unexpected text around {sep!r}"
    return parts

def label(text, sep=": "):
    head, rest = text.split(sep, 1)
    return f"**{head}{sep.rstrip()}** {rest}"

def lead_sentence(text):
    head, rest = text.split(". ", 1)
    return f"**{head}.** {rest}"


blocks = []
add = blocks.append
p = lambda text: add({"type": "p", "text": text})
h2 = lambda text: add({"type": "h2", "text": text})
h3 = lambda text: add({"type": "h3", "text": text})

title, lead = take(1), take(2)
p(take(3))
p(take(4))
h2(take(5))
p(label(take(6)))
currency_control = take(7)
assert currency_control.startswith("Валютный контроль (")
currency_control = "**Валютный контроль**" + currency_control[len("Валютный контроль"):]
head, rest = split_once(currency_control, "Важное исключение: ")
p(f"{head}**Важное исключение:** {rest}")
add({"type": "quote", "paragraphs": [label(take(8))]})
h2(take(9))
p(take(10))
p(label(take(11)))
p(take(12))
add({"type": "ul", "items": [take(n) for n in range(13, 17)]})
p(take(17))
h2(take(18))
p(take(19))

option_a, rest = split_once(take(20), " Оптимальный способ")
intro, rest = split_once("Оптимальный способ" + rest, " Банки: ")
banks, rest = split_once(rest, " Валюта: ")
currency, fees = split_once(rest, " Комиссии: ")
h3(option_a)
p(intro)
add({"type": "ul", "items": [f"**Банки:** {banks}", f"**Валюта:** {currency}", f"**Комиссии:** {fees}"]})

h3(take(21))
sberbank, tbank = label(take(22)), label(take(23))
mts, phone_summary = split_once(take(24), " Этот способ")
add({"type": "ul", "items": [sberbank, tbank, label(mts)]})
p("Этот способ" + phone_summary)

option_c, rest = split_once(take(25), " Лимиты после")
h3(option_c)
p("Лимиты после" + rest)

h2(take(26))
add({"type": "ol", "items": [lead_sentence(take(n)) for n in range(27, 32)]})
assert sorted(used) == list(range(1, 32)), "Source paragraphs omitted or duplicated"

def plural_minutes(n):
    if n % 10 == 1 and n % 100 != 11:
        return f"{n} минута"
    if 2 <= n % 10 <= 4 and not 12 <= n % 100 <= 14:
        return f"{n} минуты"
    return f"{n} минут"

plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", " ".join(paragraphs.values()))
minutes = max(1, round(len(re.findall(r"[А-Яа-яЁёA-Za-z0-9]+", plain)) / 180))
article = {
    "slug": SLUG,
    "title": title,
    "cardTitle": "Дивиденды на счёт в Армении: налоги, валютный контроль и комплаенс",
    "excerpt": "Что сделать бухгалтеру до выплаты дивидендов учредителю на армянский счёт: удержать НДФЛ, проверить уведомление в ФНС, собрать документы для банка и выбрать канал перевода.",
    "lead": lead,
    "date": "2026-10-28",
    "dateLabel": "28 октября 2026",
    "readingTime": plural_minutes(minutes),
    "meta": {
        "title": "Дивиденды учредителю на счёт в Армении в 2026 году — ИНФО ФОРВАРД",
        "description": "Как выплатить дивиденды учредителю на счёт в Армении: НДФЛ, уведомления в ФНС, документы для финмониторинга банка и выбор канала перевода.",
    },
    "cover": {
        "src": f"/images/articles/{SLUG}.jpg",
        "alt": "Рабочий стол бухгалтера: табличка «Дивиденды», ноутбук с таблицей, калькулятор и документы",
    },
    "cta": {
        "title": "Планируете выплату дивидендов на зарубежный счёт?",
        "text": "Проверим решение о распределении прибыли, расчёт НДФЛ и пакет документов для банка. Разберём вашу ситуацию на бесплатной консультации — без обязательств.",
    },
    "blocks": blocks,
}
serialized = json.dumps(article, ensure_ascii=False, indent=2)
assert "file://" not in serialized
assert not re.search(r"[　-鿿]", serialized)
assert len(re.findall(r"\]\(https?://", serialized)) == 4
assert not any(tracker in serialized for tracker in ("utm_", "ysclid=", "yclid=", "etext="))
assert "Нот 26" not in serialized and "млн. AMD" not in serialized
for block in blocks:
    for text in [block.get("text", "")] + block.get("items", []) + block.get("paragraphs", []):
        assert text.count("**") % 2 == 0, text

target = ROOT / "src/lib/articles.ts"
source = target.read_text()
marker = "export const articles: Article[] = ["
assert "export const dividendsArmeniaArticle" not in source, "Article already imported"
assert source.count(marker) == 1
source = source.replace(marker, f"export const dividendsArmeniaArticle: Article = {serialized};\n\n" + marker)
source = source.replace(marker, marker + "dividendsArmeniaArticle, ")
target.write_text(source)

route = ROOT / "src/app/articles" / SLUG / "page.tsx"
route.parent.mkdir(parents=True, exist_ok=True)
template = (ROOT / "src/app/articles/zarplatnaya-komissiya-2026/page.tsx").read_text()
route.write_text(template.replace("zarplatnaya-komissiya-2026", SLUG))

image = Image.open(io.BytesIO(cover)).convert("RGB")
assert image.size == (1024, 1024), image.size
image.crop((0, 300, 1024, 876)).save(ROOT / "public/images/articles" / f"{SLUG}.jpg", quality=85, optimize=True)
print(f"Imported {len(paragraphs)} paragraphs, {len(blocks)} blocks, 4 links; {plural_minutes(minutes)}")
