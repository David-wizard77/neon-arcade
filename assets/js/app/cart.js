/**
 * cart.js — Serviço de carrinho de compras
 * Persiste em localStorage. Requer autenticação para adicionar itens.
 */
const Cart = (function () {
    const KEY = 'neon_cart';

    function _read()        { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
    function _write(items)  { localStorage.setItem(KEY, JSON.stringify(items)); _notify(); }
    function _notify()      { document.dispatchEvent(new CustomEvent('cart:updated', { detail: getItems() })); }

    function getItems()     { return _read(); }
    function getCount()     { return _read().reduce((s, i) => s + i.qty, 0); }
    function getTotal()     { return _read().reduce((s, i) => s + i.preco * i.qty, 0); }

    function add(imagem, nome, preco) {
        if (!Auth.isLoggedIn()) {
            location.replace('/login.html');
            return;
        }
        const items = _read();
        const found = items.find(i => i.imagem === imagem);
        if (found) { found.qty++; }
        else { items.push({ imagem, nome, preco: Number(preco), qty: 1 }); }
        _write(items);
    }

    function remove(imagem) {
        _write(_read().filter(i => i.imagem !== imagem));
    }

    function increment(imagem) {
        const items = _read();
        const item  = items.find(i => i.imagem === imagem);
        if (item) { item.qty++; _write(items); }
    }

    function decrement(imagem) {
        const items = _read();
        const item  = items.find(i => i.imagem === imagem);
        if (item) { item.qty = Math.max(1, item.qty - 1); _write(items); }
    }

    function clear() { _write([]); }

    return { getItems, getCount, getTotal, add, remove, increment, decrement, clear };
}());
