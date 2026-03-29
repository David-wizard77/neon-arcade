<?php

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/User.php';

class UserDAO {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function inserir(User $user): bool {
        $stmt = $this->db->prepare(
            'INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)'
        );
        return $stmt->execute([
            ':nome'  => $user->getNome(),
            ':email' => $user->getEmail(),
            ':senha' => $user->getSenha(),
        ]);
    }

    public function buscarPorId(int $id): array|false {
        $stmt = $this->db->prepare('SELECT id, nome, email FROM usuarios WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }

    public function buscarPorEmail(string $email): array|false {
        $stmt = $this->db->prepare('SELECT * FROM usuarios WHERE email = :email');
        $stmt->execute([':email' => $email]);
        return $stmt->fetch();
    }

    public function emailExiste(string $email): bool {
        $stmt = $this->db->prepare('SELECT COUNT(*) FROM usuarios WHERE email = :email');
        $stmt->execute([':email' => $email]);
        return (int) $stmt->fetchColumn() > 0;
    }
}
