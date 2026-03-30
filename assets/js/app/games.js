/**
 * games.js — Serviço de dados de jogos
 * Dados embutidos diretamente para evitar problemas de fetch em produção.
 */
const GamesService = (function () {
    const PLAT = { pc: 'PC', xbox: 'Xbox', playstation: 'PlayStation', nintendo: 'Nintendo' };
    const TOP_SELLERS = [
        'ARC Raiders', 'Atomic Heart', 'Call Of Duty Modern Warfare',
        'Dark Souls 3', 'Dying Light 2', 'Elder Ring',
        'Halo Holy Combat', 'Grand Theft Auto Gothan City',
        'The Witcher Wild Hunt 3', 'The Sims 4',
    ];

    const GAMES_DATA = {"games":[{"name":"ARC Raiders","image":"arc_raiders.png","platform":"PC","genre":"Estratégia","price":200.90,"discount":15},{"name":"Atomic Heart","image":"atomic_heart.png","platform":"Xbox","genre":"Mundo Aberto","price":250.90,"discount":10},{"name":"Battlefield 1","image":"battlefield_1.png","platform":"Xbox","genre":"FPS","price":150.90,"discount":50},{"name":"Battlefield 3","image":"battlefield_3.png","platform":"Xbox","genre":"FPS","price":150.90,"discount":50},{"name":"Battlefield 4","image":"battlefield_4.png","platform":"Xbox","genre":"FPS","price":150.90,"discount":50},{"name":"Battlefield 5","image":"battlefield_5.png","platform":"Xbox","genre":"FPS","price":150.90,"discount":50},{"name":"Battlefield 6","image":"battlefield_6.png","platform":"Xbox","genre":"FPS","price":150.90,"discount":50},{"name":"Battlefield 2042","image":"battlefield_2042.png","platform":"Xbox","genre":"FPS","price":150.90,"discount":50},{"name":"Call Of Duty","image":"call_of_duty.png","platform":"Xbox","genre":"FPS","price":25.90,"discount":12},{"name":"Call Of Duty WW2","image":"call_of_duty_ww2.png","platform":"Xbox","genre":"FPS","price":100.90,"discount":30},{"name":"Call Of Duty Modern Warfare","image":"call_of_duty_modern_warfare.png","platform":"Xbox","genre":"FPS","price":400.90,"discount":20},{"name":"Call Of Duty Modern Warfare 2","image":"call_of_duty_modern_warfare_2.png","platform":"Xbox","genre":"FPS","price":400.90,"discount":20},{"name":"Call Of Duty Modern Warfare 3","image":"call_of_duty_modern_warfare_3.png","platform":"Xbox","genre":"FPS","price":400.90,"discount":20},{"name":"Dark Souls","image":"dark_souls.png","platform":"PC","genre":"Sobrevivência","price":55.90,"discount":10},{"name":"Dark Souls 2","image":"dark_souls_2.png","platform":"PC","genre":"Sobrevivência","price":55.90,"discount":10},{"name":"Dark Souls 3","image":"dark_souls_3.png","platform":"PC","genre":"Sobrevivência","price":55.90,"discount":10},{"name":"Dying Light","image":"dying_light.png","platform":"Xbox","genre":"Mundo Aberto","price":85.90,"discount":30},{"name":"Dying Light 2","image":"dying_light_2.png","platform":"Xbox","genre":"Mundo Aberto","price":200.90,"discount":18},{"name":"Dying Light The Beast","image":"dying_light_the_beast.png","platform":"Xbox","genre":"Mundo Aberto","price":250.90,"discount":14},{"name":"Elder Ring","image":"elder_ring.png","platform":"PC","genre":"Sobrevivência","price":150.90,"discount":17},{"name":"Grounded","image":"grounded.png","platform":"Xbox","genre":"Sobrevivência","price":200.90,"discount":50},{"name":"NBA 2K20","image":"nba_2k20.png","platform":"Xbox","genre":"Esportes","price":150.90,"discount":10},{"name":"NBA 2K21","image":"nba_2k21.png","platform":"Xbox","genre":"Esportes","price":150.90,"discount":15},{"name":"NBA 2K22","image":"nba_2k22.png","platform":"Xbox","genre":"Esportes","price":200.90,"discount":20},{"name":"NBA 2K23","image":"nba_2k23.png","platform":"Xbox","genre":"Esportes","price":200.90,"discount":20},{"name":"NBA 2K24","image":"nba_2k24.png","platform":"Xbox","genre":"Esportes","price":250.90,"discount":20},{"name":"NBA 2K25","image":"nba_2k25.png","platform":"Xbox","genre":"Esportes","price":350.90,"discount":20},{"name":"NBA 2K26","image":"nba_2k26.png","platform":"Xbox","genre":"Esportes","price":400.90,"discount":20},{"name":"Ready or Not","image":"ready_or_not.png","platform":"PC","genre":"Estratégia","price":350.90,"discount":16},{"name":"Riders Republic","image":"riders_republic.png","platform":"Playstation","genre":"Esportes","price":150.90,"discount":16},{"name":"STEEP","image":"steep.png","platform":"PC","genre":"Esportes","price":100.90,"discount":5},{"name":"Saints Row","image":"saints_row.png","platform":"PC","genre":"Mundo Aberto","price":95.90,"discount":10},{"name":"Saints Row 2","image":"saints_row_2.png","platform":"PC","genre":"Mundo Aberto","price":95.90,"discount":10},{"name":"Saints Row 3","image":"saints_row_3.png","platform":"PC","genre":"Mundo Aberto","price":95.90,"discount":10},{"name":"Saints Row 4","image":"saints_row_4.png","platform":"PC","genre":"Mundo Aberto","price":95.90,"discount":10},{"name":"Sons of The Forest","image":"sons_of_the_forest.png","platform":"PC","genre":"Sobrevivência","price":89.90,"discount":5},{"name":"Squad","image":"squad.png","platform":"PC","genre":"Estratégia","price":75.90,"discount":6},{"name":"S.T.A.L.K.E.R 2","image":"stalker_2.png","platform":"PC","genre":"Sobrevivência","price":350.90,"discount":18},{"name":"The Forest","image":"the_forest.png","platform":"PC","genre":"Sobrevivência","price":100.90,"discount":16},{"name":"The Sims 4","image":"the_sims_4.png","platform":"Xbox","genre":"Estratégia","price":400.90,"discount":5},{"name":"The Witcher Enhanced Edition","image":"the_witcher_enhanced_edition.png","platform":"PC","genre":"RPG","price":85.90,"discount":10},{"name":"The Witcher Assassins of Kings 2","image":"the_witcher_assassins_of_kings_2.png","platform":"PC","genre":"RPG","price":85.90,"discount":10},{"name":"The Witcher Wild Hunt 3","image":"the_witcher_wild_hunt_3.png","platform":"PC","genre":"RPG","price":200.90,"discount":10},{"name":"Call Of Duty 1","image":"call_of_duty_1.png","platform":"PC","genre":"FPS","price":500.90,"discount":3},{"name":"Call Of Duty 2","image":"call_of_duty_2.png","platform":"PC","genre":"FPS","price":80.90,"discount":20},{"name":"Call Of Duty Ghosts","image":"call_of_duty_ghosts.png","platform":"PC","genre":"FPS","price":650.90,"discount":10},{"name":"Fallout New Vegan","image":"fallout_new_vegan.png","platform":"Xbox","genre":"Sobrevivência","price":380.90,"discount":12},{"name":"Gears of Wario","image":"gears_of_wario.png","platform":"Xbox","genre":"Sobrevivência","price":578.90,"discount":5},{"name":"Grand Theft Auto Gothan City","image":"grand_theft_auto_gothan_city.png","platform":"Playstation","genre":"Ação","price":157.90,"discount":4},{"name":"Grand Theft Horse","image":"grand_theft_horse.png","platform":"Playstation","genre":"Ação","price":189.90,"discount":20},{"name":"Halo Holy Combat","image":"halo_holy_combat.png","platform":"PC","genre":"Ação","price":467.90,"discount":15},{"name":"Halo Kitty","image":"halo_kitty.png","platform":"PC","genre":"Ação","price":596.90,"discount":20},{"name":"Meme References","image":"meme_references_2.png","platform":"Xbox","genre":"Ação","price":279.90,"discount":10},{"name":"Metal Gear Salad","image":"metal_gear_salad.png","platform":"Playstation","genre":"Cozinha","price":246.90,"discount":8},{"name":"Online Daycare","image":"onlyne_daycare.png","platform":"Xbox","genre":"Ação","price":178.90,"discount":10},{"name":"Out of Ideas 4","image":"out_of_ideas_4.png","platform":"Xbox","genre":"Ação","price":346.90,"discount":9},{"name":"Red Bread Redemption","image":"red_bread_redemption.png","platform":"Nintendo","genre":"Cozinha","price":79.90,"discount":50},{"name":"Resident Smeagol","image":"resident_smeagol.png","platform":"Nintendo","genre":"Terror","price":1679.75,"discount":20},{"name":"Rick and Morty","image":"rick_and_morty.png","platform":"Nintendo","genre":"Terror","price":750.90,"discount":30},{"name":"Tekken 2","image":"tekken_2.png","platform":"Nintendo","genre":"Ação","price":13500.90,"discount":20},{"name":"UPS Simulator 19","image":"ups_simulator_19.png","platform":"Nintendo","genre":"Mundo Aberto","price":200.90,"discount":6}]};

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
        _cache = (GAMES_DATA.games || []).map(_normalize);
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
