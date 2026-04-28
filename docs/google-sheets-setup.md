# Настройка формы заявок → Google Таблица

Заявки с сайта собираются в Google Таблицу через Google Apps Script (бесплатно, без сервера).

## Шаг 1. Создать таблицу

1. Открой <https://sheets.new> → назови «ИНФО ФОРВАРД — Заявки»
2. Первая строка — заголовки колонок:

| timestamp | service | industry | revenue | headcount | accounting | phone | email | telegram | page |

## Шаг 2. Открыть редактор скриптов

В таблице: **Расширения → Apps Script**.

Вставить код ниже (заменив содержимое файла `Код.gs`):

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

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
    data.page || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Сохрани (⌘S) — назови проект «Infoforvard Forms».

## Шаг 3. Развернуть как веб-приложение

1. Кнопка **Развернуть → Новое развёртывание**
2. Тип развёртывания → **Веб-приложение**
3. Настройки:
   - Описание: `Infoforvard form webhook v1`
   - Выполнять от имени: **Моего имени**
   - Кому доступно: **Всем** (так обязательно, иначе сайт не сможет писать)
4. Нажать **Развернуть** → пройти авторизацию (Google спросит доступ к таблицам)
5. Скопировать URL вида `https://script.google.com/macros/s/AKfyc.../exec`

## Шаг 4. Вставить URL в сайт

В корне репо создать файл `.env.production`:

```
NEXT_PUBLIC_FORM_WEBHOOK=https://script.google.com/macros/s/AKfyc.../exec
```

Или задать переменную в настройках GitHub Actions (Repository → Settings → Secrets and variables → Actions → New variable):

- Name: `NEXT_PUBLIC_FORM_WEBHOOK`
- Value: URL из шага 3

И в `.github/workflows/deploy.yml` в шаге `bun run build` добавить env:

```yaml
- run: bun run build
  env:
    NEXT_PUBLIC_FORM_WEBHOOK: ${{ vars.NEXT_PUBLIC_FORM_WEBHOOK }}
```

## Проверка

1. На сайте оставить тестовую заявку
2. Открыть Google Таблицу — новая строка должна появиться в течение пары секунд

## Если что-то не так

- **Ошибка 403 в консоли** — в шаге 3 не выбрано «Кому доступно: Всем»
- **Заявка отправляется но строка не появляется** — проверить логи: в Apps Script → слева «Выполнения»
- **При изменении кода** — нужно создавать новое развёртывание или выбрать `Управление развёртываниями → редактировать → версия: Новая`

## Повышение уровня

Если захочется уведомлений на почту или в Telegram — допиши в `doPost`:

```javascript
// Email
MailApp.sendEmail("you@example.com", "Новая заявка", JSON.stringify(data, null, 2));

// Telegram (нужен бот и chat_id)
UrlFetchApp.fetch(`https://api.telegram.org/bot<TOKEN>/sendMessage`, {
  method: "post",
  payload: {
    chat_id: "<CHAT_ID>",
    text: `Новая заявка:\n${data.service}\n${data.phone}\n${data.email}`
  }
});
```
