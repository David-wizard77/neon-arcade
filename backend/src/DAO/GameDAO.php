<?php

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/Game.php';

class GameDAO {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function listarJogos(): array {
        return $this->db->query('SELECT * FROM games ORDER BY nome ASC')->fetchAll();
    }

    public function listarPorCategoria(string $categoria): array {
        $stmt = $this->db->prepare('SELECT * FROM games WHERE categoria = :cat ORDER BY nome ASC');
        $stmt->execute([':cat' => $categoria]);
        return $stmt->fetchAll();
    }

    public function listarComDesconto(): array {
        return $this->db->query('SELECT * FROM games WHERE desconto > 0 ORDER BY desconto DESC')->fetchAll();
    }

    public function listarMaisVendidos(): array {
        return $this->db->query('SELECT * FROM games WHERE mais_vendido = 1 ORDER BY nome ASC')->fetchAll();
    }

    public function buscarPorNome(string $nome): array {
        $stmt = $this->db->prepare('SELECT * FROM games WHERE nome LIKE :nome ORDER BY nome ASC');
        $stmt->execute([':nome' => "%{$nome}%"]);
        return $stmt->fetchAll();
    }
}
