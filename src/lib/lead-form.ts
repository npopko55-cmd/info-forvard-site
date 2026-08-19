/** Открытие формы заявки из любого места страницы.
 *  Раньше кнопки просто прокручивали к блоку контактов, и там нужно было
 *  нажимать ещё раз — на этом шаге терялись заявки. */
export const LEAD_FORM_EVENT = "lead-form:open";

export function openLeadForm() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LEAD_FORM_EVENT));
}

/** Обработчик для ссылок с href="#contact": открывает форму,
 *  а переход к блоку остаётся запасным вариантом, если скрипт не сработал. */
export function handleLeadClick(e: { preventDefault: () => void }) {
  e.preventDefault();
  openLeadForm();
}
