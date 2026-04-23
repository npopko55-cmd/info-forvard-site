export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={`/images/logo-v2.png`}
                alt="ИНФО ФОРВАРД"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              +7 (901) 184-11-90 · info@iforvard.ru
            </div>
            <div className="text-sm text-muted-foreground">
              Москва, ул. Ленинская Слобода, 26, БЦ ОМЕГА-2
            </div>
          </div>

          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
            <a
              href="#services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Услуги
            </a>
            <a
              href="#team"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              О компании
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Контакты
            </a>
            <a
              href={`/disclosure.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Раскрытие информации
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            ООО «ИНФО ФОРВАРД» · ОГРН 1227700131933 · ИНН 9725077230
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <a
              href={`/disclosure.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Раскрытие информации аудиторскими организациями
            </a>
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Политика обработки персональных данных
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
