export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-violet flex items-center justify-center">
                <span className="text-white font-bold text-xs">ИФ</span>
              </div>
              <span className="font-semibold tracking-tight">
                ИНФО ФОРВАРД
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              +7 (901) 184-11-90 · info@iforvard.ru
            </div>
            <div className="text-sm text-muted-foreground">
              Москва, ул. Ленинская Слобода, 26, БЦ ОМЕГА-2
            </div>
          </div>

          <nav className="flex gap-6 text-sm">
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
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            ООО «ИНФО ФОРВАРД» · ОГРН 1227700131933 · ИНН 9725077230
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Политика обработки персональных данных
            </a>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
