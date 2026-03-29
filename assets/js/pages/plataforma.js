/**
 * plataforma.js — Página de plataforma específica
 * Detecta plataforma via data-platform no <body> e carrega jogos filtrados.
 */
(function () {
    const MAP = { pc: 'PC', playstation: 'PlayStation', xbox: 'Xbox', nintendo: 'Nintendo' };
    const platform = document.body.dataset.platform || '';
    const categoria = MAP[platform.toLowerCase()] || '';

    UI.initTopbar();
    document.getElementById('btn-cart-top').addEventListener('click', () =>
        document.getElementById('cart-modal').classList.remove('hidden')
    );

    const search    = document.getElementById('searchInput');
    const container = document.getElementById('games-container');
    let JOGOS = [];

    function render() {
        const q = search.value.toLowerCase().trim();
        const lista = q ? JOGOS.filter(g => g.nome.toLowerCase().includes(q)) : JOGOS;
        UI.renderGrid(container, lista, Auth.isLoggedIn());
    }

    if (!categoria) {
        container.innerHTML = '<p class="estado-vazio">Plataforma não identificada.</p>';
        return;
    }

    GamesService.getByCategory(categoria).then(data => {
        JOGOS = data;
        render();
        search.addEventListener('input', render);
    }).catch(() => {
        container.innerHTML = '<p class="estado-vazio">Erro ao carregar jogos.</p>';
    });
}());
