<?php

class Database {
    private static ?self $instance = null;
    private PDO $connection;

    private string $host;
    private string $db;
    private string $user;
    private string $password;
    private string $charset = 'utf8mb4';

    private function __construct() {
        $env = parse_ini_file(__DIR__ . '/../../.env') ?: [];
        $this->host     = $env['DB_HOST'] ?? 'localhost';
        $this->db       = $env['DB_NAME'] ?? 'neon_arcade';
        $this->user     = $env['DB_USER'] ?? 'root';
        $this->password = $env['DB_PASS'] ?? '';

        $dsn = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
        try {
            $this->connection = new PDO($dsn, $this->user, $this->password, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            error_log('DB connection error: ' . $e->getMessage());
            throw new RuntimeException('Não foi possível conectar ao banco de dados.');
        }
    }

    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO {
        return $this->connection;
    }

    private function __clone() {}
    public function __wakeup() {}
}
