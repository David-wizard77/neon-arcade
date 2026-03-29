<?php

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/Carrinho.php';

class CarrinhoDAO {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function obterPorUsuario(int $usuarioId): array {
        $stmt = $this->db->prepare(
            'SELECT c.*, g.nome, g.imagem FROM carrinho c
             JOIN games g ON g.id = c.jogo_id
             WHERE c.usuario_id = :uid'
        );
        $stmt->execute([':uid' => $usuarioId]);
        return $stmt->fetchAll();
    }

    public function adicionar(int $usuarioId, int $jogoId, int $quantidade, float $preco): bool {
        // Se já existe, incrementa quantidade
        $stmt = $this->db->prepare(
            'SELECT id, quantidade FROM carrinho WHERE usuario_id = :uid AND jogo_id = :jid'
        );
        $stmt->execute([':uid' => $usuarioId, ':jid' => $jogoId]);
        $row = $stmt->fetch();

        if ($row) {
            $upd = $this->db->prepare('UPDATE carrinho SET quantidade = :q WHERE id = :id');
            return $upd->execute([':q' => $row['quantidade'] + $quantidade, ':id' => $row['id']]);
        }

        $ins = $this->db->prepare(
            'INSERT INTO carrinho (usuario_id, jogo_id, quantidade, preco_unitario) VALUES (:uid, :jid, :q, :p)'
        );
        return $ins->execute([':uid' => $usuarioId, ':jid' => $jogoId, ':q' => $quantidade, ':p' => $preco]);
    }

    public function remover(int $id): bool {
        $stmt = $this->db->prepare('DELETE FROM carrinho WHERE id = :id');
        return $stmt->execute([':id' => $id]);
    }

    public function limpar(int $usuarioId): bool {
        $stmt = $this->db->prepare('DELETE FROM carrinho WHERE usuario_id = :uid');
        return $stmt->execute([':uid' => $usuarioId]);
    }
}
