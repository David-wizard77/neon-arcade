<?php

require_once __DIR__ . '/../DAO/CarrinhoDAO.php';

class CarrinhoBO {
    private CarrinhoDAO $dao;

    public function __construct() {
        $this->dao = new CarrinhoDAO();
    }

    public function obterCarrinho(int $usuarioId): array {
        return $this->dao->obterPorUsuario($usuarioId);
    }

    public function adicionar(int $usuarioId, int $jogoId, int $quantidade, float $preco): bool {
        if ($quantidade < 1) throw new Exception('Quantidade inválida.');
        return $this->dao->adicionar($usuarioId, $jogoId, $quantidade, $preco);
    }

    public function remover(int $id): bool {
        return $this->dao->remover($id);
    }

    public function limpar(int $usuarioId): bool {
        return $this->dao->limpar($usuarioId);
    }
}
