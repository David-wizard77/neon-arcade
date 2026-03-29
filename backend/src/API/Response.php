<?php

class Response {
    private function __construct(
        private bool $success,
        private mixed $data,
        private string $message,
        private int $statusCode
    ) {}

    public static function sucesso(mixed $data = null, string $message = 'Operação realizada com sucesso'): self {
        return new self(true, $data, $message, 200);
    }

    public static function erro(string $message = 'Erro ao processar requisição', int $statusCode = 400): self {
        return new self(false, null, $message, $statusCode);
    }

    public function enviar(): never {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        http_response_code($this->statusCode);
        echo json_encode([
            'success' => $this->success,
            'data'    => $this->data,
            'message' => $this->message,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
