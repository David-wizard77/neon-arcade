<?php

require_once __DIR__ . '/../DAO/UserDAO.php';

class UserBO {
    private UserDAO $dao;

    public function __construct() {
        $this->dao = new UserDAO();
    }

    public function cadastrar(array $dados): bool {
        $nome  = trim($dados['nome']  ?? '');
        $email = trim($dados['email'] ?? '');
        $senha = $dados['senha'] ?? '';

        if ($nome === '') {
            throw new Exception('Nome é obrigatório.');
        }
        // Nome não pode conter dígitos
        if (preg_match('/\d/', $nome)) {
            throw new Exception('O nome não pode conter números.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('E-mail inválido.');
        }
        if (strlen($senha) < 6) {
            throw new Exception('A senha deve ter no mínimo 6 caracteres.');
        }
        if ($this->dao->emailExiste($email)) {
            throw new Exception('E-mail já cadastrado.');
        }

        $user = new User($nome, $email, $senha);
        return $this->dao->inserir($user);
    }

    public function login(string $email, string $senha): array {
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('E-mail inválido.');
        }
        if (empty($senha)) {
            throw new Exception('Senha é obrigatória.');
        }

        $row = $this->dao->buscarPorEmail($email);
        if (!$row) {
            throw new Exception('E-mail ou senha incorretos.');
        }

        $valida = password_verify($senha, $row['senha']);
        if (!$valida) {
            throw new Exception('E-mail ou senha incorretos.');
        }

        return ['id' => $row['id'], 'nome' => $row['nome'], 'email' => $row['email']];
    }

    public function buscarPorId(int $id): array {
        $row = $this->dao->buscarPorId($id);
        if (!$row) {
            throw new Exception('Usuário não encontrado.');
        }
        return $row;
    }
}
