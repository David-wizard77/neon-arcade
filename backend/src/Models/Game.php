<?php

class Game {
    public ?int   $id          = null;
    public string $nome        = '';
    public string $categoria   = '';
    public float  $preco       = 0.0;
    public float  $desconto    = 0.0;
    public bool   $mais_vendido = false;
    public string $imagem      = '';

    public function precoComDesconto(): float {
        return $this->desconto > 0
            ? round($this->preco * (1 - $this->desconto / 100), 2)
            : $this->preco;
    }
}
