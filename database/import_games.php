<?php

// Script para converter games.json em SQL INSERT
$json = file_get_contents('../assets/games.json');
$data = json_decode($json, true);

echo "-- ========== IMPORTAÇÃO DOS JOGOS DO GAMES.JSON ==========\n\n";

$inserts = [];
foreach ($data['games'] as $game) {
    $nome = addslashes($game['name']);
    $categoria = $game['platform'];
    $preco = $game['price'];
    $desconto = $game['discount'] ?? 0;
    $imagem = 'assets/img/jogos/' . $game['image'];

    // Alguns jogos serão marcados como mais vendidos (aleatoriamente)
    $mais_vendido = (rand(1, 10) <= 2) ? 1 : 0; // 20% dos jogos são mais vendidos

    $inserts[] = "('$nome', '$categoria', $preco, $desconto, $mais_vendido, '$imagem')";
}

echo "INSERT INTO games (nome, categoria, preco, desconto, mais_vendido, imagem) VALUES\n";
echo implode(",\n", $inserts);
echo ";\n\n";

echo "-- Total de jogos importados: " . count($inserts) . "\n";

?>