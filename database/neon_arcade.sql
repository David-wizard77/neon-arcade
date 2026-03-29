CREATE TABLE IF NOT EXISTS usuarios (
    id           INT          PRIMARY KEY AUTO_INCREMENT,
    nome         VARCHAR(100) NOT NULL,
    email        VARCHAR(100) NOT NULL UNIQUE,
    senha        VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
    id           INT            PRIMARY KEY AUTO_INCREMENT,
    nome         VARCHAR(150)   NOT NULL,
    categoria    VARCHAR(50)    NOT NULL,
    genero       VARCHAR(80)    DEFAULT '',
    preco        DECIMAL(10,2)  NOT NULL,
    desconto     FLOAT          DEFAULT 0,
    mais_vendido BOOLEAN        DEFAULT FALSE,
    imagem       VARCHAR(255)   DEFAULT '',
    data_criacao TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carrinho (
    id             INT           PRIMARY KEY AUTO_INCREMENT,
    usuario_id     INT           NOT NULL,
    jogo_id        INT           NOT NULL,
    quantidade     INT           DEFAULT 1,
    preco_unitario DECIMAL(10,2) NOT NULL,
    data_adicao    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (jogo_id)    REFERENCES games(id)    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pedidos (
    id          INT           PRIMARY KEY AUTO_INCREMENT,
    usuario_id  INT           NOT NULL,
    total       DECIMAL(10,2) NOT NULL,
    status      VARCHAR(50)   DEFAULT 'pendente',
    data_pedido TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_email      ON usuarios(email);
CREATE INDEX idx_categoria  ON games(categoria);
CREATE INDEX idx_desconto   ON games(desconto);
CREATE INDEX idx_mais_vend  ON games(mais_vendido);

INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva',   'joao@example.com',  '$2y$10$cfbBhm8oAVw/xRK1oKcc9Oce1cCB0wXygcaRPDcMlh8y3H2szk0Pa'),
('Maria Santos', 'maria@example.com', '$2y$10$Q7osDBoq.v2quI1TnQlCY.ydI5UKsHqKfiQNbMGpFqp59ON7ekYey'),
('Pedro Costa',  'pedro@example.com', '$2y$10$ZUr5Xd8hgk55ejskj3hMkud2iFWGPATms17N7NwDruACGBI7JvU7C')
ON DUPLICATE KEY UPDATE senha = VALUES(senha), nome = VALUES(nome);

INSERT INTO games (nome, categoria, genero, preco, desconto, mais_vendido, imagem) VALUES
('ARC Raiders',                  'PC',          'Estratégia',   200.90, 15, 0, 'arc_raiders.png'),
('Atomic Heart',                 'Xbox',        'Mundo Aberto', 250.90, 10, 0, 'atomic_heart.png'),
('Battlefield 1',                'Xbox',        'FPS',          150.90, 50, 1, 'battlefield_1.png'),
('Battlefield 3',                'Xbox',        'FPS',          150.90, 50, 0, 'battlefield_3.png'),
('Battlefield 4',                'Xbox',        'FPS',          150.90, 50, 0, 'battlefield_4.png'),
('Battlefield 5',                'Xbox',        'FPS',          150.90, 50, 1, 'battlefield_5.png'),
('Battlefield 6',                'Xbox',        'FPS',          150.90, 50, 0, 'battlefield_6.png'),
('Battlefield 2042',             'Xbox',        'FPS',          150.90, 50, 0, 'battlefield_2042.png'),
('Call Of Duty',                 'Xbox',        'FPS',           25.90, 12, 1, 'call_of_duty.png'),
('Call Of Duty WW2',             'Xbox',        'FPS',          100.90, 30, 0, 'call_of_duty_ww2.png'),
('Call Of Duty Modern Warfare',  'Xbox',        'FPS',          400.90, 20, 1, 'call_of_duty_modern_warfare.png'),
('Call Of Duty Modern Warfare 2','Xbox',        'FPS',          400.90, 20, 0, 'call_of_duty_modern_warfare_2.png'),
('Call Of Duty Modern Warfare 3','Xbox',        'FPS',          400.90, 20, 0, 'call_of_duty_modern_warfare_3.png'),
('Dark Souls',                   'PC',          'RPG',           55.90, 10, 1, 'dark_souls.png'),
('Dark Souls 2',                 'PC',          'RPG',           55.90, 10, 0, 'dark_souls_2.png'),
('Dark Souls 3',                 'PC',          'RPG',           55.90, 10, 1, 'dark_souls_3.png'),
('Dying Light',                  'Xbox',        'Ação',          85.90, 30, 0, 'dying_light.png'),
('Dying Light 2',                'Xbox',        'Ação',         200.90, 18, 1, 'dying_light_2.png'),
('Dying Light The Beast',        'Xbox',        'Ação',         250.90, 14, 0, 'dying_light_the_beast.png'),
('Elder Ring',                   'PC',          'RPG',          150.90, 17, 1, 'elder_ring.png'),
('Grounded',                     'Xbox',        'Sobrevivência',200.90, 50, 0, 'grounded.png'),
('NBA 2K20',                     'Xbox',        'Esporte',      200.90,  6, 0, 'nba_2k20.png'),
('The Sims 4',                   'PC',          'Simulação',     89.90,  0, 1, 'the_sims_4.png'),
('The Witcher Wild Hunt 3',      'PC',          'RPG',          149.90, 25, 1, 'the_witcher_wild_hunt_3.png'),
('Halo Holy Combat',             'Xbox',        'FPS',          199.90,  0, 1, 'halo_holy_combat.png'),
('Grand Theft Auto Gothan City', 'PC',          'Ação',         299.90,  0, 1, 'grand_theft_auto_gothan_city.png'),
('Ready or Not',                 'PC',          'Tático',       149.90, 20, 0, 'ready_or_not.png'),
('Stalker 2',                    'PC',          'FPS',          249.90,  0, 0, 'stalker_2.png'),
('Sons of the Forest',           'PC',          'Sobrevivência',119.90, 15, 0, 'sons_of_the_forest.png'),
('Riders Republic',              'PlayStation', 'Esporte',      149.90, 40, 0, 'riders_republic.png'),
('Saints Row',                   'PlayStation', 'Ação',          79.90, 60, 0, 'saints_row.png'),
('Saints Row 2',                 'PlayStation', 'Ação',          59.90, 60, 0, 'saints_row_2.png'),
('Saints Row 3',                 'PlayStation', 'Ação',          69.90, 50, 0, 'saints_row_3.png'),
('Saints Row 4',                 'PlayStation', 'Ação',          79.90, 50, 0, 'saints_row_4.png'),
('Tekken 2',                     'PlayStation', 'Luta',          49.90, 30, 0, 'tekken_2.png'),
('NBA 2K25',                     'Nintendo',    'Esporte',      299.90,  0, 0, 'nba_2k25.png'),
('NBA 2K26',                     'Nintendo',    'Esporte',      349.90,  0, 0, 'nba_2k26.png')
ON DUPLICATE KEY UPDATE preco = VALUES(preco);
