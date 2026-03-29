<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/Game.php';
require_once __DIR__ . '/../DAO/GameDAO.php';
require_once __DIR__ . '/../BO/GameBO.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        Response::erro('Método não permitido.', 405)->enviar();
    }

    $bo     = new GameBO();
    $action = $_GET['action'] ?? '';

    switch ($action) {
        case '':
            Response::sucesso($bo->obterJogos())->enviar();

        case 'categoria':
            $cat = trim($_GET['categoria'] ?? '');
            if ($cat === '') Response::erro('Categoria é obrigatória.')->enviar();
            Response::sucesso($bo->obterJogosPorCategoria($cat))->enviar();

        case 'desconto':
            Response::sucesso($bo->obterJogosComDesconto())->enviar();

        case 'mais_vendidos':
            Response::sucesso($bo->obterMaisVendidos())->enviar();

        case 'buscar':
            $nome = trim($_GET['nome'] ?? '');
            if ($nome === '') Response::erro('Nome é obrigatório.')->enviar();
            Response::sucesso($bo->buscarPorNome($nome))->enviar();

        default:
            Response::erro('Ação não encontrada.', 404)->enviar();
    }

} catch (Exception $e) {
    Response::erro($e->getMessage())->enviar();
}
