<?php

require_once __DIR__ . '/src/API/Response.php';

$uri   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts = explode('/', trim($uri, '/'));
$idx   = array_search('backend', $parts);
$endpoint = ($idx !== false) ? ($parts[$idx + 1] ?? '') : '';

switch ($endpoint) {
    case 'auth':
        require __DIR__ . '/src/API/auth.php';
        break;
    case 'games':
        require __DIR__ . '/src/API/games.php';
        break;
    case 'carrinho':
        require __DIR__ . '/src/API/carrinho.php';
        break;
    case '':
        Response::sucesso(['version' => '1.0', 'name' => 'Neon Arcade API'])->enviar();
        break;
    default:
        Response::erro('Endpoint não encontrado.', 404)->enviar();
}
