/**
 * games.js — Serviço de dados de jogos
 * Carrega e normaliza games.json com cache em memória.
 */
const GamesService = (function () {
    const URL = '/Neon_Arcade/assets/games.json';
    const PLAT = { pc: 'PC', xbox: 'Xbox', playstation: 'PlayStation', nintendo: 'Nintendo' };
    const TOP_SELLERS = [
        'ARC Raiders', 'Atomic Heart', 'Call Of Duty Modern Warfare',
        'Dark Souls 3', 'Dying Light 2', 'Elder Ring',
        'Halo Holy Combat', 'Grand Theft Auto Gothan City',
        'The Witcher Wild Hunt 3', 'The Sims 4',
    ];

    let _cache = null;

    function _normalize(g) {
        const plat = (g.platform || '').toLowerCase();
        return {
            id:        g.id || g.name,
            nome:      g.name     || '',
            imagem:    g.image    || '',
            categoria: PLAT[plat] || g.platform || '',
            genero:    g.genre    || '',
            preco:     Number(g.price    ?? 0),
            desconto:  Number(g.discount ?? 0),
        };
    }

    async function _load() {
        if (_cache) return _cache;
        const r = await fetch(URL);
        if (!r.ok) throw new Error('Falha ao carregar games.json');
        const json = await r.json();
        _cache = (json.games || []).map(_normalize);
        return _cache;
    }

    function precoFinal(g) {
        return g.desconto > 0 ? +(g.preco * (1 - g.desconto / 100)).toFixed(2) : g.preco;
    }

    async function getAll()                  { return _load(); }
    async function getByCategory(cat)        { return (await _load()).filter(g => g.categoria.toLowerCase() === cat.toLowerCase()); }
    async function getOnSale()               { return (await _load()).filter(g => g.desconto > 0); }
    async function getBestSellers()          { return (await _load()).filter(g => TOP_SELLERS.includes(g.nome)); }
    async function search(q)                 { const s = q.toLowerCase(); return (await _load()).filter(g => g.nome.toLowerCase().includes(s) || g.categoria.toLowerCase().includes(s)); }

    return { getAll, getByCategory, getOnSale, getBestSellers, search, precoFinal };
}());
