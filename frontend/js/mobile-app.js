/**
 * AI宠物健康管理系统 - 移动端应用
 */

class MobileApp {
    constructor() {
        this.currentPage = 'home';
        this.currentPet = null;
        this.routes = {
            'home': this.renderHomePage.bind(this),
            'pets': this.renderPetsPage.bind(this),
            'chat': this.renderChatPage.bind(this),
            'health': this.renderHealthPage.bind(this),
            'profile': this.renderProfilePage.bind(this),
            'login': this.renderLoginPage.bind(this),
            'register': this.renderRegisterPage.bind(this)
        };

        this.init();
    }

    init() {
        // 更新时间
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);

        // 初始化导航
        this.initNavigation();

        // 初始路由
        const initialPage = auth.isAuthenticated() ? 'home' : 'login';
        this.navigate(initialPage);

        // 监听返回按钮
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigate(e.state.page, false);
            }
        });
    }

    // 更新状态栏时间
    updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('current-time').textContent = timeStr;
    }

    // 初始化导航
    initNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = btn.dataset.page;
                if (page) {
                    this.navigate(page);
                }
            });
        });
    }

    // 导航到指定页面
    navigate(page, pushState = true) {
        if (pushState) {
            history.pushState({ page }, '', `#${page}`);
        }

        this.currentPage = page;
        this.updateNavigation();
        this.renderPage();
    }

    // 更新导航状态
    updateNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            const page = btn.dataset.page;
            if (page === this.currentPage) {
                btn.classList.add('text-blue-600');
                btn.classList.remove('text-gray-500');
            } else {
                btn.classList.remove('text-blue-600');
                btn.classList.add('text-gray-500');
            }
        });
    }

    // 渲染页面
    renderPage() {
        const mainContent = document.getElementById('main-content');
        const renderer = this.routes[this.currentPage];

        if (renderer) {
            this.showLoading();
            setTimeout(() => {
                mainContent.innerHTML = renderer();
                this.hideLoading();
                this.initPageScripts();
            }, 300);
        } else {
            mainContent.innerHTML = this.render404Page();
        }
    }

    // 初始化页面脚本
    initPageScripts() {
        switch (this.currentPage) {
            case 'login':
                this.initLoginPage();
                break;
            case 'register':
                this.initRegisterPage();
                break;
            case 'home':
                this.initHomePage();
                break;
            case 'pets':
                this.initPetsPage();
                break;
            case 'chat':
                this.initChatPage();
                break;
            case 'health':
                this.initHealthPage();
                break;
            case 'profile':
                this.initProfilePage();
                break;
        }
    }

    // 显示加载动画
    showLoading() {
        document.getElementById('loading-overlay').classList.remove('hidden');
    }

    // 隐藏加载动画
    hideLoading() {
        document.getElementById('loading-overlay').classList.add('hidden');
    }

    // 显示Toast通知
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');

        toast.className = 'fixed top-20 left-4 right-4 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50';
        toast.classList.add(type);
        toastMessage.textContent = message;

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ============ 页面渲染方法 ============

    renderHomePage() {
        return `
            <div class="px-4 py-6">
                <!-- 欢迎卡片 -->
                <div class="card mb-4">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <p class="text-gray-500 text-sm">早上好</p>
                            <h1 class="text-2xl font-bold text-gray-900">欢迎回来</h1>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-blue-600">-</p>
                            <p class="text-sm text-gray-600 mt-1">我的宠物</p>
                        </div>
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-green-600">-</p>
                            <p class="text-sm text-gray-600 mt-1">健康记录</p>
                        </div>
                    </div>
                </div>

                <!-- 快捷操作 -->
                <div class="mb-6">
                    <h2 class="text-lg font-semibold mb-3">快捷操作</h2>
                    <div class="grid grid-cols-4 gap-4">
                        <button onclick="app.navigate('pets')" class="flex flex-col items-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                                <span class="text-2xl">🐕</span>
                            </div>
                            <span class="text-xs text-gray-600">宠物档案</span>
                        </button>
                        <button onclick="app.navigate('health')" class="flex flex-col items-center">
                            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-2">
                                <span class="text-2xl">💓</span>
                            </div>
                            <span class="text-xs text-gray-600">健康监测</span>
                        </button>
                        <button onclick="app.navigate('chat')" class="flex flex-col items-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                                <span class="text-2xl">🏥</span>
                            </div>
                            <span class="text-xs text-gray-600">兽医咨询</span>
                        </button>
                        <button class="flex flex-col items-center">
                            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-2">
                                <span class="text-2xl">🍖</span>
                            </div>
                            <span class="text-xs text-gray-600">喂养方案</span>
                        </button>
                    </div>
                </div>

                <!-- 最新预警 -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold">最新预警</h2>
                        <button onclick="app.navigate('health')" class="text-blue-600 text-sm">查看全部</button>
                    </div>
                    <div id="recent-alerts">
                        <div class="empty-state">
                            <div class="empty-state-icon">✅</div>
                            <p class="empty-state-text">暂无预警信息</p>
                        </div>
                    </div>
                </div>

                <!-- 我的宠物 -->
                <div>
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold">我的宠物</h2>
                        <button onclick="app.navigate('pets')" class="text-blue-600 text-sm">查看全部</button>
                    </div>
                    <div id="my-pets">
                        <div class="empty-state">
                            <div class="empty-state-icon">🐾</div>
                            <p class="empty-state-text">还没有宠物，快去添加吧</p>
                            <button onclick="app.navigate('pets')" class="btn btn-primary mt-4">添加宠物</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPetsPage() {
        return `
            <div class="px-4 py-6">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold">宠物档案</h1>
                    <button id="add-pet-btn" class="btn btn-primary btn-sm">添加</button>
                </div>
                <div id="pets-list">
                    <div class="empty-state">
                        <div class="empty-state-icon">🐾</div>
                        <p class="empty-state-text">还没有宠物</p>
                        <button onclick="document.getElementById('add-pet-btn').click()" class="btn btn-primary mt-4">添加第一只宠物</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderChatPage() {
        return `
            <div class="chat-container">
                <div class="chat-messages" id="chat-messages">
                    <div class="chat-message assistant">
                        <div class="chat-bubble">您好！我是您的宠物健康助手。有什么我可以帮助您的吗？</div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <div class="chat-input-wrapper">
                        <input type="text" id="chat-input" class="chat-input" placeholder="输入您的问题...">
                        <button id="chat-send" class="chat-send-btn">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderHealthPage() {
        return `
            <div class="px-4 py-6">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold">健康监测</h1>
                    <button id="add-record-btn" class="btn btn-primary btn-sm">记录</button>
                </div>

                <!-- 选择宠物 -->
                <div class="card mb-4">
                    <select id="pet-select" class="form-select">
                        <option value="">选择宠物</option>
                    </select>
                </div>

                <!-- 健康数据 -->
                <div id="health-data">
                    <div class="empty-state">
                        <div class="empty-state-icon">❤️</div>
                        <p class="empty-state-text">选择宠物查看健康数据</p>
                    </div>
                </div>

                <!-- 预警列表 -->
                <div class="mt-6">
                    <h2 class="text-lg font-semibold mb-3">预警信息</h2>
                    <div id="alerts-list">
                        <div class="empty-state">
                            <p class="empty-state-text">暂无预警信息</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderProfilePage() {
        const user = auth.getCurrentUser() || {};
        return `
            <div class="px-4 py-6">
                <!-- 用户信息 -->
                <div class="card mb-4">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold">${user.name || '用户'}</h2>
                            <p class="text-gray-500 text-sm">${user.email || ''}</p>
                        </div>
                    </div>
                    <button onclick="app.navigate('profile-edit')" class="btn btn-secondary">编辑资料</button>
                </div>

                <!-- 功能菜单 -->
                <div class="card">
                    <div class="list-item" onclick="app.showToast('功能开发中')">
                        <div class="list-item-icon bg-blue-100 text-blue-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <div class="list-item-content">
                            <p class="list-item-title">设置</p>
                            <p class="list-item-subtitle">应用设置</p>
                        </div>
                        <svg class="w-5 h-5 list-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <div class="list-item" onclick="app.showToast('功能开发中')">
                        <div class="list-item-icon bg-green-100 text-green-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div class="list-item-content">
                            <p class="list-item-title">关于</p>
                            <p class="list-item-subtitle">版本信息</p>
                        </div>
                        <svg class="w-5 h-5 list-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <div class="list-item" onclick="app.showToast('功能开发中')">
                        <div class="list-item-icon bg-yellow-100 text-yellow-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div class="list-item-content">
                            <p class="list-item-title">帮助</p>
                            <p class="list-item-subtitle">使用帮助</p>
                        </div>
                        <svg class="w-5 h-5 list-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>

                <!-- 退出登录 -->
                <button id="logout-btn" class="btn btn-danger mt-6">退出登录</button>
            </div>
        `;
    }

    renderLoginPage() {
        return `
            <div class="px-4 py-6">
                <div class="text-center mb-8">
                    <div class="text-6xl mb-4">🐾</div>
                    <h1 class="text-2xl font-bold mb-2">宠物健康管家</h1>
                    <p class="text-gray-500">AI驱动的宠物健康管理平台</p>
                </div>

                <form id="login-form">
                    <div class="form-group">
                        <label class="form-label">邮箱</label>
                        <input type="email" id="email" class="form-input" placeholder="请输入邮箱" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">密码</label>
                        <input type="password" id="password" class="form-input" placeholder="请输入密码" required>
                    </div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>

                <div class="text-center mt-6">
                    <p class="text-gray-500">还没有账号？ <a href="#register" onclick="app.navigate('register')" class="text-blue-600">立即注册</a></p>
                </div>
            </div>
        `;
    }

    renderRegisterPage() {
        return `
            <div class="px-4 py-6">
                <div class="text-center mb-8">
                    <div class="text-6xl mb-4">🐾</div>
                    <h1 class="text-2xl font-bold mb-2">注册账号</h1>
                    <p class="text-gray-500">开启智能宠物健康管理之旅</p>
                </div>

                <form id="register-form">
                    <div class="form-group">
                        <label class="form-label">姓名</label>
                        <input type="text" id="name" class="form-input" placeholder="请输入您的姓名" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">邮箱</label>
                        <input type="email" id="email" class="form-input" placeholder="请输入邮箱" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">手机号</label>
                        <input type="tel" id="phone" class="form-input" placeholder="请输入手机号">
                    </div>
                    <div class="form-group">
                        <label class="form-label">密码</label>
                        <input type="password" id="password" class="form-input" placeholder="请设置密码" required>
                    </div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>

                <div class="text-center mt-6">
                    <p class="text-gray-500">已有账号？ <a href="#login" onclick="app.navigate('login')" class="text-blue-600">立即登录</a></p>
                </div>
            </div>
        `;
    }

    render404Page() {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">🤔</div>
                <p class="empty-state-text">页面不存在</p>
                <button onclick="app.navigate('home')" class="btn btn-primary mt-4">返回首页</button>
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
                    this.showToast('登录成功', 'success');
                    setTimeout(() => this.navigate('home'), 1000);
                } catch (error) {
                    this.showToast(error.message, 'error');
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
                    this.showToast('注册成功', 'success');
                    setTimeout(() => this.navigate('login'), 1000);
                } catch (error) {
                    this.showToast(error.message, 'error');
                }
            });
        }
    }

    async initHomePage() {
        // 加载首页数据
        try {
            // 这里可以添加加载宠物数量、预警等数据的逻辑
        } catch (error) {
            console.error('加载首页数据失败:', error);
        }
    }

    async initPetsPage() {
        const addBtn = document.getElementById('add-pet-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showAddPetModal();
            });
        }

        // 加载宠物列表
        try {
            const response = await api.pet.list();
            if (response.success && response.data.length > 0) {
                this.renderPetsList(response.data);
            }
        } catch (error) {
            console.error('加载宠物列表失败:', error);
        }
    }

    initChatPage() {
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');

        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => this.sendChatMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        // 滚动到底部
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    async sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        // 添加用户消息
        this.addChatMessage('user', message);
        input.value = '';

        // 显示加载状态
        const sendBtn = document.getElementById('chat-send');
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span class="loading"></span>';

        try {
            const response = await api.chat.sendMessage({
                message,
                petId: this.currentPet?.id
            });

            if (response.success) {
                this.addChatMessage('assistant', response.data.answer);
            } else {
                this.addChatMessage('assistant', '抱歉，出现了错误，请稍后再试。');
            }
        } catch (error) {
            this.addChatMessage('assistant', '抱歉，网络连接出现问题，请检查您的网络连接。');
        } finally {
            sendBtn.disabled = false;
            sendBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            `;
        }
    }

    addChatMessage(role, content) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = content;

        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);

        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async initHealthPage() {
        // 加载宠物选择器
        try {
            const response = await api.pet.list();
            if (response.success && response.data.length > 0) {
                const select = document.getElementById('pet-select');
                response.data.forEach(pet => {
                    const option = document.createElement('option');
                    option.value = pet.id;
                    option.textContent = pet.name;
                    select.appendChild(option);
                });

                select.addEventListener('change', (e) => {
                    this.loadPetHealthData(e.target.value);
                });
            }
        } catch (error) {
            console.error('加载宠物列表失败:', error);
        }

        const addBtn = document.getElementById('add-record-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.showAddRecordModal();
            });
        }
    }

    async loadPetHealthData(petId) {
        if (!petId) return;

        try {
            const response = await api.health.getRecords(petId);
            if (response.success) {
                this.renderHealthData(response.data);
            }
        } catch (error) {
            console.error('加载健康数据失败:', error);
        }
    }

    renderHealthData(data) {
        const container = document.getElementById('health-data');
        // 这里可以根据数据渲染健康统计
        container.innerHTML = `
            <div class="health-stat">
                <div class="health-stat-icon weight">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                    </svg>
                </div>
                <div class="health-stat-info">
                    <p class="health-stat-value">-</p>
                    <p class="health-stat-label">体重</p>
                </div>
            </div>
        `;
    }

    initProfilePage() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                try {
                    await auth.logout();
                    this.showToast('已退出登录', 'success');
                    setTimeout(() => this.navigate('login'), 1000);
                } catch (error) {
                    console.error('退出登录失败:', error);
                }
            });
        }
    }

    renderPetsList(pets) {
        const container = document.getElementById('pets-list');
        container.innerHTML = pets.map(pet => `
            <div class="pet-card" onclick="app.selectPet(${pet.id})">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23dbeafe' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" class="pet-avatar" alt="${pet.name}">
                <div class="pet-info">
                    <p class="pet-name">${pet.name}</p>
                    <p class="pet-breed">${pet.breed || '未知品种'}</p>
                    <span class="pet-status healthy">健康</span>
                </div>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        `).join('');
    }

    selectPet(petId) {
        this.currentPet = { id: petId };
        this.navigate('health');
    }

    showAddPetModal() {
        // 显示添加宠物模态框
        this.showToast('添加宠物功能开发中', 'info');
    }

    showAddRecordModal() {
        // 显示添加记录模态框
        this.showToast('添加记录功能开发中', 'info');
    }
}

// 初始化移动应用
const app = new MobileApp();
