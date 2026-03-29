<?php

require_once __DIR__ . '/../DAO/GameDAO.php';

class GameBO {
    private GameDAO $dao;

    private const CATEGORIAS = ['PC', 'Xbox', 'PlayStation', 'Nintendo'];

    public function __construct() {
        $this->dao = new GameDAO();
    }

    public function obterJogos(): array {
        return $this->dao->listarJogos();
    }

    public function obterJogosPorCategoria(string $categoria): array {
        if (!in_array($categoria, self::CATEGORIAS, true)) {
            throw new Exception("Categoria inválida. Use: " . implode(', ', self::CATEGORIAS));
        }
        return $this->dao->listarPorCategoria($categoria);
    }

    public function obterJogosComDesconto(): array {
        return $this->dao->listarComDesconto();
    }

    public function obterMaisVendidos(): array {
        return $this->dao->listarMaisVendidos();
    }

    public function buscarPorNome(string $nome): array {
        if ($nome === '') {
            throw new Exception('Nome é obrigatório para busca.');
        }
        return $this->dao->buscarPorNome($nome);
    }
}
