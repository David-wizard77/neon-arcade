<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/User.php';
require_once __DIR__ . '/../DAO/UserDAO.php';
require_once __DIR__ . '/../BO/UserBO.php';

try {
    $bo     = new UserBO();
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? '';

    if ($method !== 'POST') {
        Response::erro('Método não permitido.', 405)->enviar();
    }

    $dados = json_decode(file_get_contents('php://input'), true);
    if (!is_array($dados)) {
        Response::erro('Dados inválidos.')->enviar();
    }

    if ($action === 'cadastrar') {
        $bo->cadastrar($dados);
        Response::sucesso(null, 'Cadastro realizado com sucesso.')->enviar();
    }

    if ($action === 'login') {
        $usuario = $bo->login($dados['email'] ?? '', $dados['senha'] ?? '');
        Response::sucesso($usuario, 'Login realizado com sucesso.')->enviar();
    }

    Response::erro('Ação não encontrada.', 404)->enviar();

} catch (Exception $e) {
    Response::erro($e->getMessage())->enviar();
}
