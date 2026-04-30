// UTM-метки. На первом заходе парсим URL и сохраняем в sessionStorage,
// при отправке формы достаём — даже если посетитель кликал по якорям.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "iforvard_utm_v1";
const REFERRER_KEY = "iforvard_referrer_v1";
const LANDING_KEY = "iforvard_landing_v1";

export type UtmData = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  referrer: string;
  landing_page: string;
};

const empty: UtmData = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  referrer: "",
  landing_page: "",
};

export function captureUtm() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((k) => params.has(k));

    // Записываем UTM только если их ещё нет в storage (первый заход важнее)
    if (hasUtm && !sessionStorage.getItem(STORAGE_KEY)) {
      const data: Record<string, string> = {};
      UTM_KEYS.forEach((k) => {
        data[k] = params.get(k) || "";
      });
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    if (!sessionStorage.getItem(REFERRER_KEY)) {
      sessionStorage.setItem(REFERRER_KEY, document.referrer || "");
    }
    if (!sessionStorage.getItem(LANDING_KEY)) {
      sessionStorage.setItem(LANDING_KEY, window.location.href || "");
    }
  } catch {
    /* sessionStorage недоступен (приватный режим, итд) — пропускаем */
  }
}

export function readUtm(): UtmData {
  if (typeof window === "undefined") return empty;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    return {
      utm_source: parsed.utm_source || "",
      utm_medium: parsed.utm_medium || "",
      utm_campaign: parsed.utm_campaign || "",
      utm_term: parsed.utm_term || "",
      utm_content: parsed.utm_content || "",
      referrer: sessionStorage.getItem(REFERRER_KEY) || "",
      landing_page: sessionStorage.getItem(LANDING_KEY) || "",
    };
  } catch {
    return empty;
  }
}
