/**
 * ui.js — Componentes de UI reutilizáveis
 * Renderização de cards, modal do carrinho, topbar dinâmica.
 */
const UI = (function () {

    /* ── Utilitários ── */
    function esc(s) {
        return String(s || '').replace(/[&<>"']/g, m =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])
        );
    }

    function fmt(v) {
        return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function imgPath(img) {
        return img ? `/Neon_Arcade/assets/img/jogos/${img}` : '/Neon_Arcade/assets/img/jogos/placeholder.png';
    }

    /* ── Card de jogo ── */
    function renderCard(g, loggedIn) {
        const preco   = Number(g.preco || 0);
        const desc    = Number(g.desconto || 0);
        const final   = GamesService.precoFinal(g);
        const precos  = desc > 0
            ? `<span class="preco-antigo">${fmt(preco)}</span>
               <span class="preco-atual">${fmt(final)}</span>
               <span class="badge-desc">-${desc}%</span>`
            : `<span class="preco-atual">${fmt(final)}</span>`;

        const btnCart = loggedIn
            ? `<button class="btn-add-cart" data-img="${esc(g.imagem)}" data-nome="${esc(g.nome)}" data-preco="${final}" type="button">Adicionar ao Carrinho</button>`
            : `<a href="/Neon_Arcade/login.html" class="btn-add-cart btn-add-cart--guest">Entrar para Comprar</a>`;

        return `
        <article class="card-jogo">
            <img class="card-thumb" src="${imgPath(g.imagem)}" alt="${esc(g.nome)}" loading="lazy">
            <div class="card-body">
                <div class="card-titulo">${esc(g.nome)}</div>
                <div class="card-genero">${esc(g.genero || g.categoria)}</div>
                <div class="card-precos">${precos}</div>
                ${btnCart}
            </div>
        </article>`;
    }

    function renderGrid(container, jogos, loggedIn) {
        if (!container) return;
        if (!jogos.length) {
            container.innerHTML = '<p class="estado-vazio">Nenhum jogo encontrado.</p>';
            return;
        }
        container.innerHTML = jogos.map(g => renderCard(g, loggedIn)).join('');
        container.querySelectorAll('.btn-add-cart[data-img]').forEach(btn => {
            btn.addEventListener('click', () => Cart.add(btn.dataset.img, btn.dataset.nome, Number(btn.dataset.preco)));
        });
    }

    /* ── Modal do carrinho ── */
    function _renderCartModal() {
        const items = Cart.getItems();
        const el    = document.getElementById('cart-items');
        const total = document.getElementById('cart-total');
        if (!el) return;

        if (!items.length) {
            el.innerHTML = '<p class="cart-vazio">Seu carrinho está vazio.</p>';
            if (total) total.textContent = fmt(0);
            return;
        }

        el.innerHTML = items.map(item => `
        <div class="cart-item">
            <img src="${imgPath(item.imagem)}" alt="${esc(item.nome)}">
            <div class="ci-info">
                <div class="ci-nome">${esc(item.nome)}</div>
                <div class="ci-meta">${fmt(item.preco)} × ${item.qty}</div>
            </div>
            <div class="ci-acoes">
                <button class="ci-btn" data-action="dec" data-img="${esc(item.imagem)}" aria-label="Diminuir">−</button>
                <span class="ci-qty">${item.qty}</span>
                <button class="ci-btn" data-action="inc" data-img="${esc(item.imagem)}" aria-label="Aumentar">+</button>
                <button class="ci-btn ci-btn--remove" data-action="rem" data-img="${esc(item.imagem)}" aria-label="Remover">✕</button>
            </div>
        </div>`).join('');

        el.querySelectorAll('.ci-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const img = btn.dataset.img;
                if (btn.dataset.action === 'inc') Cart.increment(img);
                if (btn.dataset.action === 'dec') Cart.decrement(img);
                if (btn.dataset.action === 'rem') Cart.remove(img);
            });
        });

        if (total) total.textContent = fmt(Cart.getTotal());
    }

    function initCartModal() {
        const modal    = document.getElementById('cart-modal');
        const closeBtn = document.getElementById('close-cart');
        const checkout = document.getElementById('checkout-btn');

        if (!modal) return;

        // Abre modal
        document.querySelectorAll('.btn-cart').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                modal.classList.remove('hidden');
                _renderCartModal();
            });
        });

        // Fecha modal
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

        // Checkout
        if (checkout) {
            checkout.addEventListener('click', () => {
                if (!Cart.getCount()) { alert('Seu carrinho está vazio.'); return; }
                location.replace('/Neon_Arcade/checkout.html');
            });
        }

        // Atualiza modal quando carrinho muda
        document.addEventListener('cart:updated', () => {
            _updateCartBadge();
            if (!modal.classList.contains('hidden')) _renderCartModal();
        });
    }

    function _updateCartBadge() {
        const count = Cart.getCount();
        document.querySelectorAll('.btn-cart').forEach(btn => {
            btn.textContent = count > 0 ? `Carrinho (${count})` : 'Carrinho';
        });
    }

    /* ── Topbar dinâmica ── */
    function initTopbar() {
        const user     = Auth.getUser();
        const nomeEl   = document.getElementById('user-nome');
        const logoutEl = document.getElementById('btn-logout');
        const loginEl  = document.getElementById('btn-login-nav');
        const cadEl    = document.getElementById('btn-cad-nav');

        if (nomeEl)   nomeEl.textContent = user ? `Olá, ${user.nome}` : '';
        if (logoutEl) {
            if (user) {
                logoutEl.style.display = '';
                logoutEl.addEventListener('click', () => Auth.logout());
            } else {
                logoutEl.style.display = 'none';
            }
        }
        if (loginEl)  loginEl.style.display = user ? 'none' : '';
        if (cadEl)    cadEl.style.display   = user ? 'none' : '';

        _updateCartBadge();
        initCartModal();
    }

    /* ── Feedback de formulário ── */
    function setMsg(elId, msg, tipo) {
        const el = document.getElementById(elId);
        if (!el) return;
        el.textContent = msg;
        el.className   = `form-msg form-msg--${tipo}`;
    }

    function setLoading(btn, loading, textoOriginal) {
        btn.disabled    = loading;
        btn.textContent = loading ? 'Aguarde...' : textoOriginal;
    }

    return { esc, fmt, imgPath, renderGrid, initTopbar, setMsg, setLoading };
}());
