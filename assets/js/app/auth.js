/**
 * auth.js — Serviço de autenticação
 * Gerencia estado do usuário via localStorage com fallback dev.
 */
const Auth = (function () {
    const KEY = 'neon_user';

    const DEV_USERS = [
        { id: 1, nome: 'João Silva',   email: 'joao@example.com',  senha: 'torradeira' },
        { id: 2, nome: 'Maria Santos', email: 'maria@example.com', senha: 'torradeira' },
        { id: 3, nome: 'Pedro Costa',  email: 'pedro@example.com', senha: 'torradeira' },
    ];

    function getUser() {
        try { return JSON.parse(localStorage.getItem(KEY)); }
        catch { return null; }
    }

    function isLoggedIn() { return getUser() !== null; }

    function _setUser(user) {
        localStorage.setItem(KEY, JSON.stringify(user));
    }

    function logout() {
        localStorage.removeItem(KEY);
        location.replace('/Neon_Arcade/login.html');
    }

    function requireAuth() {
        if (!isLoggedIn()) {
            location.replace('/Neon_Arcade/login.html');
            return false;
        }
        return true;
    }

    function redirectIfLoggedIn() {
        if (isLoggedIn()) {
            location.replace('/Neon_Arcade/index.html');
        }
    }

    async function login(email, senha) {
        // Tenta API via router centralizado
        try {
            const res = await fetch('/Neon_Arcade/backend/auth?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });
            const data = await res.json();
            if (data.success) {
                _setUser(data.data);
                return { ok: true };
            }
            return { ok: false, msg: data.message || 'E-mail ou senha incorretos.' };
        } catch {
            // Fallback dev (sem banco de dados)
            const u = DEV_USERS.find(u => u.email === email && u.senha === senha);
            if (u) {
                _setUser({ id: u.id, nome: u.nome, email: u.email });
                return { ok: true };
            }
            return { ok: false, msg: 'E-mail ou senha incorretos.' };
        }
    }

    async function cadastrar(nome, email, senha) {
        try {
            const res = await fetch('/Neon_Arcade/backend/auth?action=cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha }),
            });
            const data = await res.json();
            if (data.success) return { ok: true };
            return { ok: false, msg: data.message || 'Erro ao cadastrar.' };
        } catch {
            return { ok: false, msg: 'Servidor indisponível. Tente novamente mais tarde.' };
        }
    }

    return { getUser, isLoggedIn, login, cadastrar, logout, requireAuth, redirectIfLoggedIn };
}());
