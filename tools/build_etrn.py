"""Import the approved ETrN article without retyping the author's text.

Usage: python tools/build_etrn.py /path/to/article.docx
The publication date is 21 October 2026. Legal wording is preserved as approved.
"""

import json
import re
import sys
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
from xml.etree import ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
SLUG = "kak-zapolnit-etrn-pri-subpodryadchikah"


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
    text = re.sub(r"(?<=\d) (?=\d{3}(?:\D|$))", "\u00a0", text)
    return re.sub(r"(?<=\d) (?=(?:%|руб\.|г\.))", "\u00a0", text)


paragraphs = [typography(text_of(p)) for p in body.findall(W + "p")]
paragraphs = [p for p in paragraphs if p]
assert len(paragraphs) == 39, f"Review changed source: {len(paragraphs)} paragraphs"
paragraphs = dict(enumerate(paragraphs, 1))
headings = {5, 8, 12, 19, 26, 31, 38}
lists = {
    10: ("ol", range(10, 12)),
    15: ("ul", range(15, 19)),
    22: ("ol", range(22, 26)),
    28: ("ul", range(28, 31)),
    32: ("ul", range(32, 38)),
}
blocks = []
used = [1, 2]
number = 3
while number <= 39:
    if number in lists:
        kind, numbers = lists[number]
        blocks.append({"type": kind, "items": [paragraphs[n] for n in numbers]})
        used.extend(numbers)
        number = numbers.stop
    else:
        blocks.append({"type": "h2" if number in headings else "p", "text": paragraphs[number]})
        used.append(number)
        number += 1
assert used == list(range(1, 40)), "Source paragraphs omitted or duplicated"

plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", " ".join(paragraphs.values()))
minutes = max(1, round(len(re.findall(r"[А-Яа-яЁёA-Za-z0-9]+", plain)) / 180))
assert minutes == 4, f"Review reading time: {minutes}"
article = {
    "slug": SLUG,
    "title": paragraphs[1],
    "cardTitle": "Как заполнить ЭТрН при работе с субподрядчиками",
    "excerpt": "Кого указывать грузоотправителем, если перевозчик привлёк субподрядчика и выдал экспедиторскую расписку. Пошаговый алгоритм и чек-лист перед отгрузкой.",
    "lead": paragraphs[2],
    "date": "2026-10-21",
    "dateLabel": "21 октября 2026",
    "readingTime": f"{minutes} минуты",
    "meta": {
        "title": "Как заполнить ЭТрН при работе с субподрядчиками — ИНФО ФОРВАРД",
        "description": "Как оформить транспортную накладную при привлечении субподрядчиков: грузоотправитель, заказчик услуг, фактический перевозчик и чек-лист перед отгрузкой.",
    },
    "cover": {
        "src": f"/images/articles/{SLUG}.jpg",
        "alt": "Водитель заполняет электронную транспортную накладную на планшете рядом с грузовиком",
    },
    "cta": {
        "title": "Нужна проверка документов по перевозке?",
        "text": "Проверим оформление первичных документов и разберём вашу ситуацию на бесплатной консультации — без обязательств.",
    },
    "blocks": blocks,
}
serialized = json.dumps(article, ensure_ascii=False, indent=2)
assert "file://" not in serialized
assert not re.search(r"[\u3000-\u9fff]", serialized)
assert len(re.findall(r"\]\(https?://", serialized)) == 7
assert not any(tracker in serialized for tracker in ("utm_", "ysclid=", "yclid=", "etext="))

target = ROOT / "src/lib/articles.ts"
source = target.read_text()
marker = "export const articles: Article[] = ["
assert "export const etrnArticle" not in source, "Article already imported"
assert source.count(marker) == 1
source = source.replace(marker, f"export const etrnArticle: Article = {serialized};\n\n" + marker)
source = source.replace(marker, marker + "etrnArticle, ")
target.write_text(source)

route = ROOT / "src/app/articles" / SLUG / "page.tsx"
route.parent.mkdir(parents=True, exist_ok=True)
template = (ROOT / "src/app/articles/zarplatnaya-komissiya-2026/page.tsx").read_text()
route.write_text(template.replace("zarplatnaya-komissiya-2026", SLUG))
print(f"Imported {len(paragraphs)} paragraphs, {len(blocks)} blocks, 7 links; {minutes} minutes")
