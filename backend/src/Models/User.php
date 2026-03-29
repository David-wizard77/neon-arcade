<?php

class User {
    private ?int $id = null;
    private string $nome;
    private string $email;
    private string $senha;

    public function __construct(string $nome = '', string $email = '', string $senha = '') {
        $this->nome  = $nome;
        $this->email = $email;
        $this->setSenha($senha);
    }

    public function getId(): ?int   { return $this->id; }
    public function getNome(): string  { return $this->nome; }
    public function getEmail(): string { return $this->email; }
    public function getSenha(): string { return $this->senha; }

    public function setId(int $id): void       { $this->id = $id; }
    public function setNome(string $v): void   { $this->nome = $v; }
    public function setEmail(string $v): void  { $this->email = $v; }

    public function setSenha(string $senha): void {
        if ($senha === '') {
            $this->senha = '';
            return;
        }
        // Aplica hash bcrypt — password_get_info retorna algoName 'unknown' para texto plano
        $info = password_get_info($senha);
        $this->senha = ($info['algoName'] !== 'unknown') ? $senha : password_hash($senha, PASSWORD_BCRYPT);
    }

    public function verificarSenha(string $senha): bool {
        return password_verify($senha, $this->senha);
    }
}
