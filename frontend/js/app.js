/**
 * 主应用程序模块
 */

class App {
    constructor() {
        this.currentPage = 'home';
        this.routes = {
            'home': this.renderHomePage.bind(this),
            'login': this.renderLoginPage.bind(this),
            'register': this.renderRegisterPage.bind(this),
            'dashboard': this.renderDashboardPage.bind(this),
            'pets': this.renderPetsPage.bind(this),
            'health': this.renderHealthPage.bind(this),
            'alerts': this.renderAlertsPage.bind(this),
            'veterinary': this.renderVeterinaryPage.bind(this),
            'feeding': this.renderFeedingPage.bind(this),
            'training': this.renderTrainingPage.bind(this),
            'community': this.renderCommunityPage.bind(this),
            'profile': this.renderProfilePage.bind(this)
        };

        this.init();
    }

    init() {
        // 初始化导航栏
        this.renderNavbar();

        // 监听页面变化
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigate(e.state.page, false);
            }
        });

        // 初始路由
        const initialPage = this.getInitialPage();
        this.navigate(initialPage, false);

        // 检查Token过期
        this.checkTokenExpiry();
    }

    // 获取初始页面
    getInitialPage() {
        if (auth.isAuthenticated()) {
            return 'dashboard';
        }
        return 'home';
    }

    // 导航到指定页面
    navigate(page, pushState = true) {
        if (pushState) {
            history.pushState({ page }, '', `#${page}`);
        }

        this.currentPage = page;
        this.renderNavbar();
        this.renderPage();
    }

    // 渲染页面
    renderPage() {
        const mainContent = document.getElementById('main-content');
        const renderer = this.routes[this.currentPage];

        if (renderer) {
            mainContent.innerHTML = renderer();
            this.initPageScripts();
        } else {
            mainContent.innerHTML = this.render404Page();
        }
    }

    // 初始化页面脚本
    initPageScripts() {
        // 根据当前页面初始化相应的脚本
        switch (this.currentPage) {
            case 'login':
                this.initLoginPage();
                break;
            case 'register':
                this.initRegisterPage();
                break;
            case 'dashboard':
                this.initDashboardPage();
                break;
            // 其他页面的初始化...
        }
    }

    // 渲染导航栏
    renderNavbar() {
        const navLinks = document.getElementById('nav-links');
        const navActions = document.getElementById('nav-actions');

        if (auth.isAuthenticated()) {
            // 已登录用户的导航
            navLinks.innerHTML = `
                <a href="#dashboard" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'dashboard' ? 'active' : 'text-gray-700'}">首页</a>
                <a href="#pets" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'pets' ? 'active' : 'text-gray-700'}">宠物档案</a>
                <a href="#health" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'health' ? 'active' : 'text-gray-700'}">健康监测</a>
                <a href="#alerts" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'alerts' ? 'active' : 'text-gray-700'}">预警</a>
                <a href="#veterinary" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'veterinary' ? 'active' : 'text-gray-700'}">兽医咨询</a>
                <a href="#community" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'community' ? 'active' : 'text-gray-700'}">社区</a>
            `;

            const user = auth.getCurrentUser();
            navActions.innerHTML = `
                <div class="flex items-center space-x-4">
                    <span class="text-gray-700 text-sm">${user.name}</span>
                    <a href="#profile" class="text-gray-700 hover:text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </a>
                    <button onclick="auth.logout()" class="text-gray-700 hover:text-blue-600 text-sm">退出</button>
                </div>
            `;
        } else {
            // 未登录用户的导航
            navLinks.innerHTML = `
                <a href="#home" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${this.currentPage === 'home' ? 'active' : 'text-gray-700'}">首页</a>
                <a href="#features" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700">功能</a>
                <a href="#about" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700">关于</a>
            `;

            navActions.innerHTML = `
                <div class="flex items-center space-x-4">
                    <a href="#login" class="text-gray-700 hover:text-blue-600 text-sm">登录</a>
                    <a href="#register" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">注册</a>
                </div>
            `;
        }
    }

    // 检查Token过期
    checkTokenExpiry() {
        setInterval(async () => {
            if (auth.isAuthenticated()) {
                try {
                    // 可以添加Token过期检查逻辑
                } catch (error) {
                    console.error('Token检查失败:', error);
                }
            }
        }, 5 * 60 * 1000); // 每5分钟检查一次
    }

    // ============ 页面渲染方法 ============

    renderHomePage() {
        return `
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-6">AI宠物健康管理系统</h1>
                    <p class="text-xl md:text-2xl mb-8">基于多智能体技术，为您的爱宠提供全方位健康管理</p>
                    <div class="flex justify-center space-x-4">
                        <a href="#register" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">立即注册</a>
                        <a href="#features" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">了解更多</a>
                    </div>
                </div>
            </div>

            <div id="features" class="py-16 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12">核心功能</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="card text-center">
                            <div class="text-4xl mb-4">🐕</div>
                            <h3 class="text-xl font-semibold mb-2">智能健康监测</h3>
                            <p class="text-gray-600">实时监测宠物健康数据，AI自动预警潜在风险</p>
                        </div>
                        <div class="card text-center">
                            <div class="text-4xl mb-4">🏥</div>
                            <h3 class="text-xl font-semibold mb-2">兽医在线咨询</h3>
                            <p class="text-gray-600">专业兽医智能体提供7x24小时在线问诊服务</p>
                        </div>
                        <div class="card text-center">
                            <div class="text-4xl mb-4">🍖</div>
                            <h3 class="text-xl font-semibold mb-2">个性化喂养方案</h3>
                            <p class="text-gray-600">基于NRC营养模型，为您的宠物定制科学喂养计划</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderLoginPage() {
        return `
            <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">登录</h2>
                        <p class="mt-2 text-center text-sm text-gray-600">
                            还没有账号？ <a href="#register" class="font-medium text-blue-600 hover:text-blue-500">立即注册</a>
                        </p>
                    </div>
                    <form id="login-form" class="mt-8 space-y-6">
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="email" class="sr-only">邮箱</label>
                                <input id="email" name="email" type="email" required class="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="邮箱">
                            </div>
                            <div>
                                <label for="password" class="sr-only">密码</label>
                                <input id="password" name="password" type="password" required class="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="密码">
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                登录
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    renderRegisterPage() {
        return `
            <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">注册</h2>
                        <p class="mt-2 text-center text-sm text-gray-600">
                            已有账号？ <a href="#login" class="font-medium text-blue-600 hover:text-blue-500">立即登录</a>
                        </p>
                    </div>
                    <form id="register-form" class="mt-8 space-y-6">
                        <div class="space-y-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
                                <input id="name" name="name" type="text" required class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="您的姓名">
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
                                <input id="email" name="email" type="email" required class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="您的邮箱">
                            </div>
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700">手机号</label>
                                <input id="phone" name="phone" type="tel" class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="您的手机号">
                            </div>
                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                                <input id="password" name="password" type="password" required class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="设置密码">
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                注册
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    renderDashboardPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">欢迎回来！</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">我的宠物</p>
                                <p class="text-2xl font-bold text-gray-900" id="pet-count">-</p>
                            </div>
                            <div class="text-3xl">🐾</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">健康记录</p>
                                <p class="text-2xl font-bold text-gray-900" id="health-count">-</p>
                            </div>
                            <div class="text-3xl">💓</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">未读预警</p>
                                <p class="text-2xl font-bold text-gray-900" id="alert-count">-</p>
                            </div>
                            <div class="text-3xl">⚠️</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">预约</p>
                                <p class="text-2xl font-bold text-gray-900" id="appointment-count">-</p>
                            </div>
                            <div class="text-3xl">📅</div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card">
                        <h2 class="text-xl font-semibold mb-4">最近健康记录</h2>
                        <div id="recent-health-records">
                            <p class="text-gray-500">加载中...</p>
                        </div>
                    </div>
                    <div class="card">
                        <h2 class="text-xl font-semibold mb-4">最新预警</h2>
                        <div id="recent-alerts">
                            <p class="text-gray-500">加载中...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPetsPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">宠物档案</h1>
                    <button id="add-pet-btn" class="btn btn-primary">添加宠物</button>
                </div>
                <div id="pets-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <p class="text-gray-500">加载中...</p>
                </div>
            </div>
        `;
    }

    renderHealthPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">健康监测</h1>
                <div class="card">
                    <p class="text-gray-500">选择一个宠物查看健康数据</p>
                </div>
            </div>
        `;
    }

    renderAlertsPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">预警中心</h1>
                <div id="alerts-list">
                    <p class="text-gray-500">加载中...</p>
                </div>
            </div>
        `;
    }

    renderVeterinaryPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">兽医咨询</h1>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card">
                        <h2 class="text-xl font-semibold mb-4">在线咨询</h2>
                        <button class="btn btn-primary w-full">开始咨询</button>
                    </div>
                    <div class="card">
                        <h2 class="text-xl font-semibold mb-4">预约服务</h2>
                        <button class="btn btn-secondary w-full">预约体检</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderFeedingPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">喂养方案</h1>
                <div class="card">
                    <p class="text-gray-500">选择一个宠物查看喂养方案</p>
                </div>
            </div>
        `;
    }

    renderTrainingPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">行为训练</h1>
                <div class="card">
                    <p class="text-gray-500">行为训练功能开发中...</p>
                </div>
            </div>
        `;
    }

    renderCommunityPage() {
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">社区</h1>
                <div class="card">
                    <p class="text-gray-500">社区功能开发中...</p>
                </div>
            </div>
        `;
    }

    renderProfilePage() {
        const user = auth.getCurrentUser();
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">个人资料</h1>
                <div class="max-w-2xl">
                    <div class="card">
                        <form id="profile-form">
                            <div class="form-group">
                                <label class="form-label">姓名</label>
                                <input type="text" id="profile-name" class="form-input" value="${user.name || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">邮箱</label>
                                <input type="email" id="profile-email" class="form-input" value="${user.email || ''}" disabled>
                            </div>
                            <div class="form-group">
                                <label class="form-label">手机号</label>
                                <input type="tel" id="profile-phone" class="form-input" value="${user.phone || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">地址</label>
                                <input type="text" id="profile-address" class="form-input" value="${user.address || ''}">
                            </div>
                            <button type="submit" class="btn btn-primary">保存</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    render404Page() {
        return `
            <div class="min-h-[80vh] flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p class="text-gray-600 mb-8">页面不存在</p>
                    <a href="#home" class="btn btn-primary">返回首页</a>
                </div>
            </div>
        `;
    }

    // ============ 页面初始化方法 ============

    initLoginPage() {
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    await auth.login(email, password);
                    Swal.fire({
                        icon: 'success',
                        title: '登录成功',
                        text: '欢迎回来！',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        this.navigate('dashboard');
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: '登录失败',
                        text: error.message
                    });
                }
            });
        }
    }

    initRegisterPage() {
        const form = document.getElementById('register-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const password = document.getElementById('password').value;

                try {
                    await auth.register({ name, email, phone, password });
                    Swal.fire({
                        icon: 'success',
                        title: '注册成功',
                        text: '请登录',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        this.navigate('login');
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: '注册失败',
                        text: error.message
                    });
                }
            });
        }
    }

    async initDashboardPage() {
        // 加载仪表板数据
        try {
            // 这里可以添加加载宠物数量、健康记录等数据的逻辑
            document.getElementById('pet-count').textContent = '-';
            document.getElementById('health-count').textContent = '-';
            document.getElementById('alert-count').textContent = '-';
            document.getElementById('appointment-count').textContent = '-';
        } catch (error) {
            console.error('加载仪表板数据失败:', error);
        }
    }
}

// 初始化应用
const app = new App();

// 监听导航点击
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const page = e.target.getAttribute('href').substring(1);
        app.navigate(page);
    }
});
