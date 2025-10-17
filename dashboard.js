// ===== DADOS SIMULADOS =====
const sales = [
    { id: 'VND-2025-001', produto: 'Fortnite Full Access', comprador: 'rafael_silva', valor: 89.00, data: '2025-03-15', status: 'Concluída', categoria: 'Jogos' },
    { id: 'VND-2025-002', produto: 'League of Legends Platina', comprador: 'lucas_martins', valor: 145.00, data: '2025-03-14', status: 'Concluída', categoria: 'Jogos' },
    { id: 'VND-2025-003', produto: 'Valorant Diamante', comprador: 'amanda_costa', valor: 320.00, data: '2025-03-13', status: 'Pendente', categoria: 'Jogos' },
    { id: 'VND-2025-004', produto: 'Netflix 4K 1 mês', comprador: 'carla_mendes', valor: 25.00, data: '2025-03-12', status: 'Concluída', categoria: 'Serviços' },
    { id: 'VND-2025-005', produto: 'Spotify Premium', comprador: 'diego_ferraz', valor: 18.90, data: '2025-03-11', status: 'Concluída', categoria: 'Serviços' },
];

const purchases = [
    { id: 'CPR-2025-001', produto: 'Game Pass Ultimate', vendedor: 'tech_store', valor: 29.90, data: '2025-03-16', status: 'Concluída' },
    { id: 'CPR-2025-002', produto: 'GTA V Social Club', vendedor: 'games_br', valor: 49.90, data: '2025-03-10', status: 'Concluída' },
];

const products = [
    { id: 'PRD-001', nome: 'Fortnite Full Access', categoria: 'Jogos', preco: 89.00, estoque: 5, status: 'Ativo' },
    { id: 'PRD-002', nome: 'League of Legends Platina', categoria: 'Jogos', preco: 145.00, estoque: 3, status: 'Ativo' },
    { id: 'PRD-003', nome: 'Valorant Diamante', categoria: 'Jogos', preco: 320.00, estoque: 2, status: 'Ativo' },
    { id: 'PRD-004', nome: 'Netflix 4K 1 mês', categoria: 'Serviços', preco: 25.00, estoque: 10, status: 'Ativo' },
    { id: 'PRD-005', nome: 'Spotify Premium', categoria: 'Serviços', preco: 18.90, estoque: 0, status: 'Inativo' },
    { id: 'PRD-006', nome: 'Xbox Game Pass', categoria: 'Serviços', preco: 35.00, estoque: 8, status: 'Ativo' },
];

let pixKeys = [
    { type: 'cpf', value: '123.456.789-00', name: 'João Gamer' },
    { type: 'email', value: 'jogador@exemplo.com', name: 'João Gamer' }
];

// ===== CONSTANTES =====
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const HOLD_DAYS = 7;
const SITE_FEE_PERCENT = 7.5;
const SITE_FEE_FIXED = 0.99;
const today = new Date();

// ===== VARIÁVEIS GLOBAIS =====
let availableBalance = 0;
let pendingBalance = 0;
let selectedPixKey = null;

const lastMonthBalance = 580.50;
const lastMonthSales = 4;

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Adiciona classe quando rola
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== OVERLAY PARA MOBILE =====
function createOverlay() {
    let overlay = document.getElementById('siteOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'siteOverlay';
        overlay.className = 'overlay';
        overlay.onclick = () => {
            closeMobileMenu();
            closeSidebar();
        };
        document.body.appendChild(overlay);
    }
    return overlay;
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.getElementById('siteOverlay');

    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('siteOverlay');

    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

// ===== TOGGLE MOBILE MENU =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = createOverlay();

    // Fechar sidebar se estiver aberta
    closeSidebar();

    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    overlay.classList.toggle('active');

    // Previne scroll quando menu aberto
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ===== TOGGLE NOTIFICATIONS =====
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    // Fecha profile se estiver aberto
    if (profileDropdown && profileDropdown.classList.contains('active')) {
        profileDropdown.classList.remove('active');
        document.querySelector('.profile-button')?.classList.remove('active');
    }

    dropdown.classList.toggle('active');
    event.stopPropagation();
}

// ===== TOGGLE PROFILE =====
function toggleProfile(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profileDropdown');
    const button = event.currentTarget;
    const notificationDropdown = document.getElementById('notificationDropdown');

    // Fecha notificações se estiver aberto
    if (notificationDropdown && notificationDropdown.classList.contains('active')) {
        notificationDropdown.classList.remove('active');
    }

    dropdown.classList.toggle('active');
    button.classList.toggle('active');
}

// ===== TOGGLE SIDEBAR =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = createOverlay();

    // Fechar mobile menu se estiver aberto
    closeMobileMenu();

    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');

    if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ===== FECHAR DROPDOWNS AO CLICAR FORA =====
document.addEventListener('click', (e) => {
    const notificationWrapper = document.querySelector('.notification-wrapper');
    const profileWrapper = document.querySelector('.profile-wrapper');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    // Fechar notificações
    if (notificationDropdown &&
        !notificationWrapper?.contains(e.target) &&
        notificationDropdown.classList.contains('active')) {
        notificationDropdown.classList.remove('active');
    }

    // Fechar profile
    if (profileDropdown &&
        !profileWrapper?.contains(e.target) &&
        profileDropdown.classList.contains('active')) {
        profileDropdown.classList.remove('active');
        document.querySelector('.profile-button')?.classList.remove('active');
    }

    // Fechar sidebar mobile
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    if (window.innerWidth <= 1023 &&
        sidebar &&
        !sidebar.contains(e.target) &&
        !menuToggle?.contains(e.target) &&
        sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

// ===== NAVEGAÇÃO ENTRE TABS =====
const tabTitles = {
    dashboard: 'Dashboard',
    products: 'Meus Produtos',
    wallet: 'Carteira',
    purchases: 'Minhas Compras',
    verification: 'Verificação',
    settings: 'Configurações'
};

function goToDashboard() {
    switchTab('dashboard');
    closeAllDropdowns();
}

function goToSettings() {
    switchTab('settings');
    closeAllDropdowns();
}

function switchTab(tabName) {
    // Remove active de todos os botões e tabs
    document.querySelectorAll('.sidebar-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Adiciona active no botão e tab corretos
    const button = document.querySelector(`[data-tab="${tabName}"]`);
    const content = document.getElementById(tabName);

    if (button) button.classList.add('active');
    if (content) content.classList.add('active');

    // Atualiza título
    const pageTitle = document.getElementById('pageTitle');
    const currentPage = document.getElementById('currentPage');
    if (pageTitle) pageTitle.textContent = tabTitles[tabName];
    if (currentPage) currentPage.textContent = tabTitles[tabName];

    // Fecha sidebar em mobile/tablet
    if (window.innerWidth <= 1023) {
        closeSidebar();
    }

    // Fecha mobile menu se estiver aberto
    closeMobileMenu();
}

function closeAllDropdowns() {
    document.getElementById('notificationDropdown')?.classList.remove('active');
    document.getElementById('profileDropdown')?.classList.remove('active');
    document.querySelector('.profile-button')?.classList.remove('active');
}

// Adicionar event listeners aos botões da sidebar
document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
    });
});

// ===== FUNÇÕES DE LOGOUT =====
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        alert('Você foi desconectado!');
        window.location.href = 'index.html';
    }
}

// ===== FUNÇÕES DE CÁLCULO =====
function calcSiteFee(gross) {
    return +(gross * (SITE_FEE_PERCENT / 100) + SITE_FEE_FIXED).toFixed(2);
}

function calcNet(gross) {
    return +(gross - calcSiteFee(gross)).toFixed(2);
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function computeBalances() {
    availableBalance = 0;
    pendingBalance = 0;

    sales.forEach(s => {
        if (s.status !== 'Concluída') return;
        const net = calcNet(s.valor);
        const release = addDays(s.data, HOLD_DAYS);
        if (today >= release) {
            availableBalance += net;
        } else {
            pendingBalance += net;
        }
    });

    availableBalance = +availableBalance.toFixed(2);
    pendingBalance = +pendingBalance.toFixed(2);

    // Atualizar displays
    const availableDisplay = document.getElementById('availableBalanceDisplay');
    const pendingDisplay = document.getElementById('pendingBalanceDisplay');
    const walletAvailable = document.getElementById('walletAvailable');
    const walletPending = document.getElementById('walletPending');

    if (availableDisplay) availableDisplay.textContent = BRL.format(availableBalance);
    if (pendingDisplay) pendingDisplay.textContent = BRL.format(pendingBalance);
    if (walletAvailable) walletAvailable.textContent = BRL.format(availableBalance);
    if (walletPending) walletPending.textContent = BRL.format(pendingBalance);

    updateBalanceBadge();
}

function updateBalanceBadge() {
    const badge = document.getElementById('balanceBadge');
    if (!badge) return;

    const percentChange = ((availableBalance - lastMonthBalance) / lastMonthBalance * 100).toFixed(0);

    if (percentChange > 0) {
        badge.className = 'stat-badge increase';
        badge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
            ${percentChange}%
        `;
    } else if (percentChange < 0) {
        badge.className = 'stat-badge decrease';
        badge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
            ${Math.abs(percentChange)}%
        `;
    } else {
        badge.className = 'stat-badge';
        badge.innerHTML = '0%';
    }
}

function countMonthlySales() {
    const now = today;
    const ym = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
    const count = sales.filter(s => s.status === 'Concluída' && s.data.startsWith(ym)).length;

    const monthlySalesDisplay = document.getElementById('monthlySalesCount');
    if (monthlySalesDisplay) monthlySalesDisplay.textContent = count;

    updateSalesBadge(count);
}

function updateSalesBadge(currentSales) {
    const badge = document.getElementById('salesBadge');
    if (!badge) return;

    const percentChange = ((currentSales - lastMonthSales) / lastMonthSales * 100).toFixed(0);

    if (percentChange > 0) {
        badge.className = 'stat-badge increase';
        badge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
            ${percentChange}%
        `;
    } else if (percentChange < 0) {
        badge.className = 'stat-badge decrease';
        badge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
            ${Math.abs(percentChange)}%
        `;
    } else {
        badge.className = 'stat-badge';
        badge.innerHTML = '0%';
    }
}

// ===== RENDERIZAÇÃO DE RATING =====
function renderRating(avg = 4.9, total = 128) {
    const value = Math.min(Math.max(avg / 5, 0), 1);
    const gauge = document.getElementById('ratingGauge');
    const valueDisplay = document.getElementById('ratingValue');
    const valueText = document.getElementById('ratingValueText');
    const meta = document.getElementById('ratingMeta');

    if (gauge) gauge.style.setProperty('--value', value);
    if (valueDisplay) valueDisplay.textContent = avg.toFixed(1);
    if (valueText) valueText.textContent = `${avg.toFixed(1).replace('.', ',')}/5`;
    if (meta) meta.textContent = `${total} avaliações`;
}

// ===== RENDERIZAÇÃO DE TABELAS =====
function renderSalesTable() {
    const tbody = document.getElementById('salesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    sales.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td>${s.produto}</td>
                <td>${s.comprador}</td>
                <td>${BRL.format(s.valor)}</td>
                <td>${new Date(s.data).toLocaleDateString('pt-BR')}</td>
                <td><span class="status-badge status-${s.status === 'Concluída' ? 'completed' : 'pending'}">${s.status}</span></td>
                <td>
                    <button class="btn-details" onclick="showSaleDetails('${s.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Ver detalhes
                    </button>
                </td>
            </tr>
        `;
    });
}

function renderPurchasesTable() {
    const tbody = document.getElementById('purchasesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    purchases.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.produto}</td>
                <td>${p.vendedor}</td>
                <td>${BRL.format(p.valor)}</td>
                <td>${new Date(p.data).toLocaleDateString('pt-BR')}</td>
                <td><span class="status-badge status-completed">${p.status}</span></td>
                <td>
                    <button class="btn-details" onclick="showPurchaseDetails('${p.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Ver detalhes
                    </button>
                </td>
            </tr>
        `;
    });
}

function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${BRL.format(p.preco)}</td>
                <td>${p.estoque} un.</td>
                <td><span class="status-badge status-${p.status === 'Ativo' ? 'active' : 'inactive'}">${p.status}</span></td>
                <td>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="btn-edit" onclick="editProduct('${p.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Editar
                        </button>
                        <button class="btn-delete" onclick="deleteProduct('${p.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

// ===== FUNÇÕES DE PRODUTOS =====
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    alert(`Editar produto: ${product.nome}\n\nEsta funcionalidade abrirá um modal de edição.`);
}

function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (confirm(`Tem certeza que deseja excluir o produto "${product.nome}"?`)) {
        const index = products.findIndex(p => p.id === productId);
        products.splice(index, 1);
        renderProductsTable();
        showToast('Produto excluído com sucesso!', 'success');
    }
}

// ===== MODAIS =====
function showSaleDetails(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;

    const fee = calcSiteFee(sale.valor);
    const net = calcNet(sale.valor);
    const release = addDays(sale.data, HOLD_DAYS);
    const isReleased = today >= release && sale.status === 'Concluída';

    const content = `
        <div class="detail-row">
            <span class="detail-label">ID do Pedido</span>
            <span class="detail-value">
                <a href="pedido.html?id=${sale.id}" class="order-id-link">
                    ${sale.id}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>
            </span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Produto</span>
            <span class="detail-value">${sale.produto}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Comprador</span>
            <span class="detail-value">${sale.comprador}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Valor Bruto</span>
            <span class="detail-value">${BRL.format(sale.valor)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Taxa (${SITE_FEE_PERCENT}% + R$ ${SITE_FEE_FIXED})</span>
            <span class="detail-value danger">- ${BRL.format(fee)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Valor Recebido</span>
            <span class="detail-value success">${BRL.format(net)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Data da Venda</span>
            <span class="detail-value">${new Date(sale.data).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status do Pagamento</span>
            <span class="detail-value">
                <span class="status-dot ${sale.status === 'Concluída' ? '' : 'pending'}"></span>
            ${sale.status}
            </span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status do Saldo</span>
            <span class="detail-value ${isReleased ? 'success' : 'warning'}">
                ${isReleased ? 'Liberado' : `Bloqueado até ${release.toLocaleDateString('pt-BR')}`}
            </span>
        </div>
    `;

    const modalContent = document.getElementById('saleDetailsContent');
    if (modalContent) {
        modalContent.innerHTML = content;
        openModal('saleDetailsModal');
    }
}

function showPurchaseDetails(purchaseId) {
    const purchase = purchases.find(p => p.id === purchaseId);
    if (!purchase) return;

    const content = `
        <div class="detail-row">
            <span class="detail-label">ID do Pedido</span>
            <span class="detail-value">
                <a href="pedido.html?id=${purchase.id}" class="order-id-link">
                    ${purchase.id}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>
            </span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Produto</span>
            <span class="detail-value">${purchase.produto}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Vendedor</span>
            <span class="detail-value">${purchase.vendedor}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Valor Pago</span>
            <span class="detail-value">${BRL.format(purchase.valor)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Data da Compra</span>
            <span class="detail-value">${new Date(purchase.data).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="detail-value">
                <span class="status-indicator">
                    <span class="status-dot"></span>
                    ${purchase.status}
                </span>
            </span>
        </div>
    `;

    const modalContent = document.getElementById('purchaseDetailsContent');
    if (modalContent) {
        modalContent.innerHTML = content;
        openModal('purchaseDetailsModal');
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fechar modal clicando no overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});

// ===== GRÁFICOS =====
function initCharts() {
    if (typeof Chart === 'undefined') return;

    // Revenue Chart
    const ctx1 = document.getElementById('revenueChart');
    if (ctx1) {
        new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['01', '05', '10', '15', '20', '25', '30'],
                datasets: [{
                    label: 'Receita líquida',
                    data: [0, 150, 280, 420, 550, 680, 820],
                    borderColor: '#4A8C3C',
                    backgroundColor: 'rgba(74, 140, 60, 0.15)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#4A8C3C',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#4A8C3C',
                        borderColor: 'rgba(74, 140, 60, 0.3)',
                        borderWidth: 1,
                        displayColors: false,
                        callbacks: {
                            label: (context) => BRL.format(context.parsed.y)
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#aab0bb', font: { size: 11 } },
                        grid: { color: 'rgba(74, 140, 60, 0.1)', drawBorder: false }
                    },
                    y: {
                        ticks: {
                            color: '#aab0bb',
                            font: { size: 11 },
                            callback: v => BRL.format(v)
                        },
                        grid: { color: 'rgba(74, 140, 60, 0.1)', drawBorder: false }
                    }
                }
            }
        });
    }

    // Categories Chart
    const ctx2 = document.getElementById('categoriesChart');
    if (ctx2) {
        new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Jogos', 'Serviços', 'Gift Cards'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: ['#4A8C3C', '#2E5334', '#699C5A'],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#aab0bb',
                            padding: 16,
                            font: { size: 12, weight: 600 },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#4A8C3C',
                        borderColor: 'rgba(74, 140, 60, 0.3)',
                        borderWidth: 1,
                        callbacks: {
                            label: (context) => ` ${context.parsed}%`
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// ===== PIX FUNCTIONS =====
function renderPixKeys() {
    const container = document.getElementById('pixKeysList');
    if (!container) return;

    container.innerHTML = '';

    pixKeys.forEach((key, index) => {
        const keyItem = document.createElement('div');
        keyItem.className = 'pix-key-item';
        keyItem.onclick = () => selectPixKey(index);

        keyItem.innerHTML = `
            <div class="pix-key-radio"></div>
            <div class="pix-key-info">
                <div class="pix-key-type">${key.type.toUpperCase()}</div>
                <div class="pix-key-value">${key.value}</div>
            </div>
        `;

        container.appendChild(keyItem);
    });
}

function selectPixKey(index) {
    document.querySelectorAll('.pix-key-item').forEach(item => {
        item.classList.remove('selected');
    });

    const items = document.querySelectorAll('.pix-key-item');
    if (items[index]) {
        items[index].classList.add('selected');
        selectedPixKey = pixKeys[index];
    }

    hideNewPixForm();
}

function showNewPixForm() {
    const form = document.getElementById('newPixForm');
    const btn = document.getElementById('btnAddNewKey');

    if (form) form.classList.add('active');
    if (btn) btn.style.display = 'none';

    document.querySelectorAll('.pix-key-item').forEach(item => {
        item.classList.remove('selected');
    });
    selectedPixKey = null;
}

function hideNewPixForm() {
    const form = document.getElementById('newPixForm');
    const btn = document.getElementById('btnAddNewKey');

    if (form) form.classList.remove('active');
    if (btn) btn.style.display = 'flex';

    const typeInput = document.getElementById('pixKeyType');
    const nameInput = document.getElementById('pixBeneficiaryName');
    const valueInput = document.getElementById('pixKeyValue');

    if (typeInput) typeInput.value = '';
    if (nameInput) nameInput.value = '';
    if (valueInput) valueInput.value = '';
}

function saveNewPixKey() {
    const type = document.getElementById('pixKeyType')?.value;
    const name = document.getElementById('pixBeneficiaryName')?.value;
    const value = document.getElementById('pixKeyValue')?.value;

    if (!type || !name || !value) {
        showToast('Preencha todos os campos da chave PIX', 'error');
        return;
    }

    pixKeys.push({ type, value, name });
    renderPixKeys();
    selectPixKey(pixKeys.length - 1);
    hideNewPixForm();

    showToast('Chave PIX adicionada com sucesso!', 'success');
}

function cancelNewPixKey() {
    hideNewPixForm();
}

function requestWithdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount')?.value || '0');
    const password = document.getElementById('accountPassword')?.value;

    if (!amount || amount <= 0) {
        showToast('Informe um valor válido', 'error');
        return;
    }
    if (amount > availableBalance) {
        showToast('Saldo insuficiente', 'error');
        return;
    }
    if (!password) {
        showToast('Confirme sua senha', 'error');
        return;
    }
    if (!selectedPixKey) {
        showToast('Selecione uma chave PIX', 'error');
        return;
    }

    availableBalance -= amount;

    const alert = document.getElementById('withdrawAlert');
    if (alert) {
        alert.innerHTML = `
            <div class="success-alert">
                <p>Saque de ${BRL.format(amount)} solicitado com sucesso para a chave ${selectedPixKey.value}!</p>
            </div>
        `;
    }

    computeBalances();

    const amountInput = document.getElementById('withdrawAmount');
    const passwordInput = document.getElementById('accountPassword');
    if (amountInput) amountInput.value = '';
    if (passwordInput) passwordInput.value = '';

    document.querySelectorAll('.pix-key-item').forEach(item => {
        item.classList.remove('selected');
    });
    selectedPixKey = null;

    showToast('Saque solicitado com sucesso!', 'success');
}

// ===== RECARREGAR SALDO VIA PIX =====
function generatePixRecharge() {
    const amount = parseFloat(document.getElementById('rechargeAmount')?.value || '0');

    if (!amount || amount < 10) {
        showToast('Valor mínimo para recarga é R$ 10,00', 'error');
        return;
    }

    // Simula geração de código PIX
    const pixCode = `00020126580014br.gov.bcb.pix0136${Date.now()}52040000530398654${amount.toFixed(2).replace('.', '')}5802BR5913Cosmos Gaming6009SAO PAULO62070503***6304${Math.random().toString().substr(2, 4)}`;

    const alert = document.getElementById('rechargeAlert');
    if (alert) {
        alert.innerHTML = `
            <div class="success-alert">
                <p>QR Code PIX gerado com sucesso! Valor: ${BRL.format(amount)}</p>
            </div>
        `;
    }

    // Exibe o QR Code
    const qrDisplay = document.getElementById('pixQrCodeDisplay');
    if (qrDisplay) {
        qrDisplay.style.display = 'block';
        
        // Atualiza o código PIX no input
        const pixCodeInput = document.getElementById('pixCodeInput');
        if (pixCodeInput) {
            pixCodeInput.value = pixCode;
        }
    }

    // Limpa o campo de valor
    const amountInput = document.getElementById('rechargeAmount');
    if (amountInput) amountInput.value = '';

    showToast('QR Code PIX gerado com sucesso!', 'success');

    // Simula confirmação de pagamento após 5 segundos (para demonstração)
    setTimeout(() => {
        if (confirm('Pagamento PIX detectado! Deseja confirmar a recarga de ' + BRL.format(amount) + '?')) {
            availableBalance += amount;
            computeBalances();
            
            if (qrDisplay) qrDisplay.style.display = 'none';
            if (alert) alert.innerHTML = '';
            
            showToast('Recarga confirmada! Saldo atualizado.', 'success');
        }
    }, 5000);
}

function copyPixCode() {
    const pixCodeInput = document.getElementById('pixCodeInput');
    if (!pixCodeInput) return;

    // Copia o código PIX
    pixCodeInput.select();
    pixCodeInput.setSelectionRange(0, 99999); // Para mobile

    try {
        document.execCommand('copy');
        showToast('Código PIX copiado!', 'success');
    } catch (err) {
        // Fallback para navegadores modernos
        navigator.clipboard.writeText(pixCodeInput.value).then(() => {
            showToast('Código PIX copiado!', 'success');
        }).catch(() => {
            showToast('Erro ao copiar código', 'error');
        });
    }
}

// ===== FILE UPLOAD =====
function handleFileUpload(input, previewId) {
    const file = input.files[0];
    if (file) {
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.classList.add('active');
            const fileName = preview.querySelector('.file-name');
            if (fileName) fileName.textContent = file.name;
        }
    }
}

function removeFile(inputId, previewId) {
    event.stopPropagation();
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (input) input.value = '';
    if (preview) preview.classList.remove('active');
}

// ===== TOGGLE SWITCH =====
function toggleSwitch(element) {
    element.classList.toggle('active');
}

// ===== DANGER ZONE =====
function deactivateAccount() {
    if (confirm('Tem certeza que deseja desativar sua conta temporariamente?\nVocê poderá reativá-la a qualquer momento.')) {
        showToast('Conta desativada! Para reativar, faça login novamente.', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

function deleteAccount() {
    const confirmation = prompt('Esta ação é IRREVERSÍVEL!\nDigite "EXCLUIR CONTA" para confirmar:');
    if (confirmation === 'EXCLUIR CONTA') {
        showToast('Sua conta foi excluída permanentemente.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${type === 'success' ? `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            ` : type === 'error' ? `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            ` : type === 'warning' ? `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            ` : `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
            `}
        </div>
        <p>${message}</p>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K para abrir busca
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
    }

    // ESC para fechar modais e dropdowns
    if (e.key === 'Escape') {
        closeAllDropdowns();
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            closeModal(modal.id);
        });
        closeMobileMenu();
        closeSidebar();
    }
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                console.log('Buscando:', query);
                // Implementar lógica de busca aqui
            }
        }, 300);
    });
}

// ===== DETECTAR ORIENTAÇÃO EM MOBILE =====
function handleOrientation() {
    const isMobile = window.innerWidth <= 767;
    const isLandscape = window.innerHeight < window.innerWidth;

    if (isMobile && isLandscape) {
        document.body.classList.add('mobile-landscape');
    } else {
        document.body.classList.remove('mobile-landscape');
    }
}

window.addEventListener('resize', handleOrientation);
window.addEventListener('orientationchange', handleOrientation);

// ===== MELHORAR RESPONSIVIDADE DAS TABELAS =====
function initTableScroll() {
    const tables = document.querySelectorAll('.table-wrapper');
    tables.forEach(wrapper => {
        let isDown = false;
        let startX;
        let scrollLeft;

        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            wrapper.style.cursor = 'grabbing';
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });

        wrapper.addEventListener('mouseleave', () => {
            isDown = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('mouseup', () => {
            isDown = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 2;
            wrapper.scrollLeft = scrollLeft - walk;
        });

        // Touch events para mobile
        let touchStart = 0;
        wrapper.addEventListener('touchstart', (e) => {
            touchStart = e.touches[0].pageX;
            scrollLeft = wrapper.scrollLeft;
        });

        wrapper.addEventListener('touchmove', (e) => {
            const touchMove = e.touches[0].pageX;
            const walk = (touchStart - touchMove) * 2;
            wrapper.scrollLeft = scrollLeft + walk;
        });
    });
}

// ===== FECHAR MENUS AO REDIMENSIONAR =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const width = window.innerWidth;

        // Fechar mobile menu em desktop
        if (width > 1023) {
            closeMobileMenu();
            closeSidebar();
        }

        // Fechar dropdowns ao redimensionar
        closeAllDropdowns();

        // Atualizar orientação
        handleOrientation();
    }, 250);
});

// ===== SWIPE GESTURES PARA MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenu = document.getElementById('mobileMenu');

    if (touchEndX < touchStartX - 50) {
        // Swipe left - fechar sidebar/menu
        if (sidebar?.classList.contains('open')) {
            closeSidebar();
        }
        if (mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    if (touchEndX > touchStartX + 50 && touchStartX < 50) {
        // Swipe right do edge - abrir sidebar
        if (window.innerWidth <= 1023 && sidebar && !sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// ===== PREVENIR ZOOM EM INPUTS NO iOS =====
if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const fontSize = window.getComputedStyle(input).fontSize;
        if (parseFloat(fontSize) < 16) {
            input.style.fontSize = '16px';
        }
    });
}

// ===== INICIALIZAÇÃO =====
function init() {
    console.log('🚀 Cosmos Dashboard Inicializado');

    // Criar overlay
    createOverlay();

    // Renderizar dados
    renderSalesTable();
    renderPurchasesTable();
    renderProductsTable();
    renderPixKeys();

    // Calcular balances
    computeBalances();
    countMonthlySales();

    // Renderizar rating
    renderRating(4.9, 128);

    // Inicializar gráficos
    initCharts();

    // Inicializar scroll das tabelas
    initTableScroll();

    // Detectar orientação
    handleOrientation();

    // Mostrar toast de boas-vindas
    setTimeout(() => {
        showToast('Bem-vindo ao Cosmos Dashboard! 🚀', 'success');
    }, 500);
}

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('✅ Cosmos Dashboard carregado com sucesso!');