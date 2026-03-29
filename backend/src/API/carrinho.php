<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/Carrinho.php';
require_once __DIR__ . '/../DAO/CarrinhoDAO.php';
require_once __DIR__ . '/../BO/CarrinhoBO.php';

try {
    $bo     = new CarrinhoBO();
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? '';

    if ($method === 'GET') {
        $uid = (int) ($_GET['usuario_id'] ?? 0);
        if ($uid < 1) Response::erro('usuario_id obrigatorio.')->enviar();
        Response::sucesso($bo->obterCarrinho($uid))->enviar();
    }

    if ($method === 'POST') {
        $dados = json_decode(file_get_contents('php://input'), true) ?? [];
        if ($action === 'adicionar') {
            $bo->adicionar(
                (int) ($dados['usuario_id'] ?? 0),
                (int) ($dados['jogo_id'] ?? 0),
                (int) ($dados['quantidade'] ?? 1),
                (float) ($dados['preco_unitario'] ?? 0)
            );
            Response::sucesso(null, 'Item adicionado.')->enviar();
        }
        if ($action === 'limpar') {
            $bo->limpar((int) ($dados['usuario_id'] ?? 0));
            Response::sucesso(null, 'Carrinho limpo.')->enviar();
        }
        Response::erro('Acao nao encontrada.', 404)->enviar();
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id < 1) Response::erro('id obrigatorio.')->enviar();
        $bo->remover($id);
        Response::sucesso(null, 'Item removido.')->enviar();
    }

    Response::erro('Metodo nao permitido.', 405)->enviar();

} catch (Exception $e) {
    Response::erro($e->getMessage())->enviar();
}
