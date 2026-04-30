# Настройка формы заявок → Google Таблица + Email

Заявки с сайта собираются в Google Таблицу через Google Apps Script (бесплатно, без сервера).
Дополнительно — каждая заявка приходит на почту.

## Шаг 1. Создать таблицу

1. Открой <https://sheets.new> → назови «ИНФО ФОРВАРД — Заявки»
2. Первая строка — заголовки колонок:

```
timestamp	service	industry	revenue	headcount	accounting	phone	email	telegram	utm_source	utm_medium	utm_campaign	utm_term	utm_content	referrer	landing_page	page
```

(вставь как одну строку — таблица сама разнесёт по колонкам)

## Шаг 2. Открыть редактор скриптов

В таблице: **Расширения → Apps Script**.

Удали всё что есть. Вставь:

```javascript
// Куда слать письма с заявками. Можно несколько через запятую.
const NOTIFY_EMAIL = "info@iforvard.ru";

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  // 1. Записываем строку в таблицу
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.service || "",
    data.industry || "",
    data.revenue || "",
    data.headcount || "",
    data.accounting || "",
    data.phone || "",
    data.email || "",
    data.telegram || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_term || "",
    data.utm_content || "",
    data.referrer || "",
    data.landing_page || "",
    data.page || ""
  ]);

  // 2. Отправляем email-уведомление
  try {
    const subject = "Новая заявка с сайта — " + (data.service || "обратный звонок");
    const lines = [
      "Услуга: " + (data.service || ""),
      "Отрасль: " + (data.industry || ""),
      "Выручка: " + (data.revenue || ""),
      "Сотрудников: " + (data.headcount || ""),
      "Бухгалтеров: " + (data.accounting || ""),
      "",
      "Телефон: " + (data.phone || ""),
      "Email: " + (data.email || ""),
      "Telegram: " + (data.telegram || ""),
      "",
      "— UTM —",
      "Источник: " + (data.utm_source || "—"),
      "Канал: " + (data.utm_medium || "—"),
      "Кампания: " + (data.utm_campaign || "—"),
      "Ключ.слово: " + (data.utm_term || "—"),
      "Объявление: " + (data.utm_content || "—"),
      "Реферер: " + (data.referrer || "—"),
      "Лендинг: " + (data.landing_page || "—"),
      "Страница отправки: " + (data.page || "—"),
      "Время: " + (data.timestamp || "")
    ];
    MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join("\n"));
  } catch (err) {
    // не валим запись в таблицу из-за ошибки почты
    console.error("mail error:", err);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

⚠️ В переменной `NOTIFY_EMAIL` сверху замени на свой адрес если нужен другой (можно несколько через запятую: `"a@b.ru, c@d.ru"`).

Сохрани (⌘S или Ctrl+S).

## Шаг 3. Обновить развёртывание

Если развёртывание уже было — нужно опубликовать новую версию:

1. Кнопка **«Развернуть» → «Управление развёртываниями»**
2. Нажми ✏️ (карандаш) рядом со старым развёртыванием
3. В поле «Версия» выбери **«Новая версия»**
4. Описание: `v2 — добавлены UTM и email`
5. **«Развернуть»**
6. URL остаётся прежним — менять в GitHub не нужно

При первом запуске Google спросит разрешение на отправку почты — нажми «Разрешить».

## Шаг 4. Проверка

1. На сайте оставь тестовую заявку → должна прийти строка в таблицу + письмо на `info@iforvard.ru`
2. Если хочешь проверить UTM — открой сайт с параметрами:
   `https://info-forvard.ru/?utm_source=test&utm_medium=cpc&utm_campaign=manual_check`
   → отправь форму → в таблице и в письме увидишь эти значения

## Если письма не приходят

- Проверь папку «Спам»
- В Apps Script слева → **«Выполнения»** → посмотри логи последнего запуска (там видно ошибку)
- Лимит Google: 100 писем в сутки на бесплатном аккаунте — для аудита достаточно с запасом

## UTM для рекламы

Стандартные параметры для Яндекс.Директа:

```
?utm_source=yandex
&utm_medium=cpc
&utm_campaign=audit_oblig
&utm_term={keyword}
&utm_content={ad_id}
```

В Директе при создании кампании в шаблоне ссылок вставь это — `{keyword}` и `{ad_id}` подставятся автоматически на стороне Яндекса.
