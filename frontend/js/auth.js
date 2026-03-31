/**
 * 认证模块
 */

class Auth {
    constructor() {
        this.currentUser = null;
        this.loadUserFromStorage();
    }

    // 从本地存储加载用户信息
    loadUserFromStorage() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            this.currentUser = JSON.parse(userStr);
        }
    }

    // 保存用户信息到本地存储
    saveUserToStorage(user) {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    // 清除用户信息
    clearUserFromStorage() {
        this.currentUser = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    // 检查是否已登录
    isAuthenticated() {
        return !!this.currentUser && !!localStorage.getItem('token');
    }

    // 获取当前用户
    getCurrentUser() {
        return this.currentUser;
    }

    // 用户注册
    async register(data) {
        try {
            const response = await api.user.register(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // 用户登录
    async login(email, password) {
        try {
            const response = await api.user.login({ email, password });

            if (response.success) {
                // 保存token和用户信息
                api.setToken(response.data.token);
                this.saveUserToStorage(response.data.user);

                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    // 获取用户资料
    async getProfile() {
        try {
            const response = await api.user.getProfile();
            if (response.success) {
                this.saveUserToStorage(response.data);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }

    // 更新用户资料
    async updateProfile(data) {
        try {
            const response = await api.user.updateProfile(data);
            if (response.success) {
                await this.getProfile(); // 重新获取用户信息
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    // 修改密码
    async changePassword(oldPassword, newPassword) {
        try {
            const response = await api.user.changePassword({
                oldPassword,
                newPassword
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // 用户登出
    async logout() {
        try {
            await api.user.logout();
        } catch (error) {
            console.error('登出失败:', error);
        } finally {
            this.clearUserFromStorage();
            window.location.href = '/';
        }
    }

    // 刷新Token
    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('没有刷新令牌');
            }

            const response = await api.user.refreshToken({ refreshToken });
            if (response.success) {
                api.setToken(response.data.token);
                return true;
            }
        } catch (error) {
            console.error('刷新令牌失败:', error);
            this.logout();
            return false;
        }
    }
}

// 创建认证实例
const auth = new Auth();
