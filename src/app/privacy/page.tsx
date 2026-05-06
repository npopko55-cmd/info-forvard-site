import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Политика обработки персональных данных — ИНФО ФОРВАРД",
  description:
    "Политика ООО «ИНФО ФОРВАРД» в отношении обработки персональных данных пользователей сайта info-forvard.ru.",
};

export default function PrivacyPage() {
  return (
    <main className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] mb-4">
          Политика в отношении обработки персональных данных
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          ООО «ИНФО ФОРВАРД» · ОГРН 1227700131933 · ИНН 9725077230
        </p>

        <div className="space-y-8 text-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика обработки персональных данных (далее —
              Политика) разработана в соответствии с Федеральным законом
              от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет
              порядок обработки персональных данных и меры по обеспечению
              их безопасности, предпринимаемые ООО «ИНФО ФОРВАРД» (далее —
              Оператор).
            </p>
            <p className="mt-3">
              Используя сайт{" "}
              <a href="https://info-forvard.ru" className="text-primary hover:underline">
                info-forvard.ru
              </a>{" "}
              и оставляя на нём заявку, пользователь соглашается с условиями
              настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              2. Цели обработки персональных данных
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>обратная связь с пользователем по оставленной заявке;</li>
              <li>предоставление консультации по аудиторским и консалтинговым услугам;</li>
              <li>заключение договора на оказание услуг;</li>
              <li>информирование о ходе исполнения обязательств по договору;</li>
              <li>исполнение требований законодательства Российской Федерации.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              3. Состав обрабатываемых данных
            </h2>
            <p>Оператор обрабатывает следующие персональные данные:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1.5">
              <li>фамилия, имя, отчество (при предоставлении пользователем);</li>
              <li>контактный номер телефона;</li>
              <li>адрес электронной почты;</li>
              <li>наименование организации, должность, отрасль (при предоставлении);</li>
              <li>иные данные, добровольно указанные пользователем при заполнении формы.</li>
            </ul>
            <p className="mt-3">
              Также автоматически собираются обезличенные данные о посещении
              сайта (cookies, IP-адрес, тип браузера, источник перехода)
              средствами систем веб-аналитики (Яндекс.Метрика).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              4. Правовые основания обработки
            </h2>
            <p>
              Обработка персональных данных осуществляется на основании
              согласия субъекта персональных данных, выраженного путём
              заполнения и отправки формы обратной связи на сайте, а также
              на основании договоров и требований действующего
              законодательства Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              5. Порядок и сроки обработки
            </h2>
            <p>
              Обработка персональных данных осуществляется с использованием
              средств автоматизации, а также без таковых. Срок хранения
              персональных данных — не более чем это необходимо для целей
              обработки, либо до отзыва пользователем согласия на их
              обработку.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              6. Передача персональных данных третьим лицам
            </h2>
            <p>
              Оператор не передаёт персональные данные третьим лицам, за
              исключением случаев, прямо предусмотренных законодательством
              Российской Федерации, а также случаев, когда передача необходима
              для исполнения договора с пользователем (например, обработка
              данных в облачных сервисах, через которые принимаются заявки).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              7. Меры защиты персональных данных
            </h2>
            <p>
              Оператор принимает необходимые правовые, организационные и
              технические меры для защиты персональных данных от
              неправомерного или случайного доступа, уничтожения, изменения,
              блокирования, копирования, распространения, а также от иных
              неправомерных действий третьих лиц.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              8. Права субъекта персональных данных
            </h2>
            <p>
              Пользователь вправе получить информацию об обработке его
              персональных данных, требовать их уточнения, блокирования или
              уничтожения, а также отозвать ранее данное согласие на их
              обработку. Для реализации этих прав необходимо направить
              письменный запрос на адрес электронной почты{" "}
              <a
                href="mailto:info@iforvard.ru"
                className="text-primary hover:underline"
              >
                info@iforvard.ru
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              9. Изменения Политики
            </h2>
            <p>
              Настоящая Политика может быть изменена Оператором в одностороннем
              порядке. Действующая редакция всегда доступна по адресу{" "}
              <a
                href="https://info-forvard.ru/privacy"
                className="text-primary hover:underline"
              >
                info-forvard.ru/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
              10. Контактные данные Оператора
            </h2>
            <p>ООО «ИНФО ФОРВАРД»</p>
            <p>ОГРН 1227700131933 · ИНН 9725077230</p>
            <p>
              Адрес: Москва, ул. Ленинская Слобода, 26, БЦ ОМЕГА-2, помещ.
              37/52
            </p>
            <p>
              E-mail:{" "}
              <a
                href="mailto:info@iforvard.ru"
                className="text-primary hover:underline"
              >
                info@iforvard.ru
              </a>
            </p>
            <p>
              Телефон:{" "}
              <a
                href="tel:+79011841190"
                className="text-primary hover:underline"
              >
                +7 (901) 184-11-90
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
