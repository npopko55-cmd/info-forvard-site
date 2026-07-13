<?php
/**
 * send.php — приём заявок с формы сайта info-forvard.ru.
 *
 * 152-ФЗ: заявка принимается и обрабатывается на этом РФ-сервере (reg.ru),
 * письмо уходит на РФ-ящик. Персональные данные НЕ передаются за рубеж.
 *
 * Секреты (логин/пароль SMTP) — в отдельном файле config.local.php рядом с этим.
 * config.local.php НЕ хранится в git и НЕ входит в исходники сайта.
 *
 * Ответы: 405 (не POST), 400 (валидация), 502 (ошибка отправки), 200 {success:true}.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function out($code, $payload) {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    out(405, ['success' => false, 'error' => 'method_not_allowed']);
}

$cfgPath = __DIR__ . '/config.local.php';
if (!is_file($cfgPath)) {
    out(500, ['success' => false, 'error' => 'not_configured']);
}
$cfg = require $cfgPath;

// --- разбор тела запроса ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST; // fallback на обычную form-отправку
}

// --- honeypot: боты заполняют скрытое поле botcheck ---
if (!empty($data['botcheck'])) {
    out(200, ['success' => true]); // тихо игнорируем бота, не шлём письмо
}

function val($data, $key) {
    return trim((string)($data[$key] ?? ''));
}

// --- валидация: телефон + согласие ---
$phone = val($data, 'phone');
$digits = preg_replace('/\D+/', '', $phone);
if (strlen($digits) < 10) {
    out(400, ['success' => false, 'error' => 'phone_required']);
}
$consent = val($data, 'consent');
if ($consent === '' || mb_strtolower($consent) === 'нет') {
    out(400, ['success' => false, 'error' => 'consent_required']);
}

// --- сборка письма ---
$fields = [
    'Услуга'                    => val($data, 'service'),
    'Отрасль'                   => val($data, 'industry'),
    'Выручка'                   => val($data, 'revenue'),
    'Сотрудников'               => val($data, 'headcount'),
    'Бухгалтеров'               => val($data, 'accounting'),
    'Телефон'                   => $phone,
    'Email'                     => val($data, 'email'),
    'Telegram'                  => val($data, 'telegram'),
    'Согласие на обработку ПДн' => $consent,
    'Источник (utm_source)'     => val($data, 'utm_source'),
    'Канал (utm_medium)'        => val($data, 'utm_medium'),
    'Кампания (utm_campaign)'   => val($data, 'utm_campaign'),
    'Ключевое слово (utm_term)' => val($data, 'utm_term'),
    'Объявление (utm_content)'  => val($data, 'utm_content'),
    'Реферер'                   => val($data, 'referrer'),
    'Лендинг'                   => val($data, 'landing_page'),
    'Страница отправки'         => val($data, 'page'),
    'Время'                     => val($data, 'timestamp') ?: gmdate('c'),
];

$subject = 'Новая заявка с сайта — ' . ($fields['Услуга'] ?: 'обратный звонок');
$lines = [];
foreach ($fields as $k => $v) {
    $lines[] = $k . ': ' . $v;
}
$body = implode("\r\n", $lines);

$replyTo = val($data, 'email');
$result = smtp_send($cfg, $subject, $body, $replyTo);

if ($result === true) {
    out(200, ['success' => true]);
}
out(502, ['success' => false, 'error' => 'send_failed']);


/**
 * Отправка письма по SMTP (implicit SSL, порт 465, AUTH LOGIN). Без PHPMailer.
 * Возвращает true при успехе или строку с описанием ошибки.
 */
function smtp_send($cfg, $subject, $body, $replyTo) {
    $host     = $cfg['smtp_host'] ?? '';
    $port     = (int)($cfg['smtp_port'] ?? 465);
    $user     = $cfg['smtp_user'] ?? '';
    $pass     = $cfg['smtp_pass'] ?? '';
    $from     = $cfg['from'] ?? $user;
    $fromName = $cfg['from_name'] ?? 'Сайт ИНФО-ФОРВАРД';
    $to       = $cfg['to'] ?? '';

    if ($host === '' || $user === '' || $to === '') {
        return 'config_incomplete';
    }

    $ctx = stream_context_create(['ssl' => [
        'verify_peer'      => true,
        'verify_peer_name' => true,
    ]]);
    $errno = 0; $errstr = '';
    $conn = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 20,
        STREAM_CLIENT_CONNECT, $ctx);
    if (!$conn) {
        return 'connect_failed';
    }
    stream_set_timeout($conn, 20);

    $read = function () use ($conn) {
        $data = '';
        while (($line = fgets($conn, 515)) !== false) {
            $data .= $line;
            // последняя строка ответа SMTP: "код<пробел>...", у промежуточных "код-..."
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $cmd = function ($c) use ($conn, $read) {
        fwrite($conn, $c . "\r\n");
        return $read();
    };
    $code = function ($resp) {
        return substr(trim($resp), 0, 3);
    };

    $read();                                   // приветствие сервера
    $cmd('EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    $cmd('AUTH LOGIN');
    $cmd(base64_encode($user));
    $authResp = $cmd(base64_encode($pass));
    if ($code($authResp) !== '235') {
        fclose($conn);
        return 'auth_failed';
    }

    $cmd('MAIL FROM:<' . $from . '>');
    foreach (array_map('trim', explode(',', $to)) as $rcpt) {
        if ($rcpt !== '') {
            $cmd('RCPT TO:<' . $rcpt . '>');
        }
    }
    $dataResp = $cmd('DATA');
    if ($code($dataResp) !== '354') {
        fclose($conn);
        return 'data_rejected';
    }

    $headers = [];
    $headers[] = 'From: =?UTF-8?B?' . base64_encode($fromName) . '?= <' . $from . '>';
    $headers[] = 'To: ' . $to;
    if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    $headers[] = 'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';
    $headers[] = 'Date: ' . date('r');

    // dot-stuffing: строки, начинающиеся с точки, экранируем
    $safeBody = preg_replace('/^\./m', '..', $body);
    $message = implode("\r\n", $headers) . "\r\n\r\n" . $safeBody . "\r\n";

    fwrite($conn, $message . "\r\n.\r\n");
    $sendResp = $read();
    $cmd('QUIT');
    fclose($conn);

    return $code($sendResp) === '250' ? true : 'send_rejected';
}
