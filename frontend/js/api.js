/**
 * API 客户端模块
 */

const API_BASE_URL = '/api/v1';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('token');
    }

    // 设置认证令牌
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    // 获取请求头
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // 通用请求方法
    async request(method, endpoint, data = null) {
        const config = {
            method,
            headers: this.getHeaders()
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '请求失败');
            }

            return await response.json();
        } catch (error) {
            console.error('API请求错误:', error);
            throw error;
        }
    }

    // GET 请求
    async get(endpoint) {
        return this.request('GET', endpoint);
    }

    // POST 请求
    async post(endpoint, data) {
        return this.request('POST', endpoint, data);
    }

    // PUT 请求
    async put(endpoint, data) {
        return this.request('PUT', endpoint, data);
    }

    // DELETE 请求
    async delete(endpoint) {
        return this.request('DELETE', endpoint);
    }

    // 用户相关API
    user = {
        register: (data) => this.post('/users/register', data),
        login: (data) => this.post('/users/login', data),
        getProfile: () => this.get('/users/profile'),
        updateProfile: (data) => this.put('/users/profile', data),
        changePassword: (data) => this.put('/users/password', data),
        refreshToken: (data) => this.post('/users/refresh-token', data),
        logout: () => this.post('/users/logout')
    };

    // 宠物相关API
    pet = {
        create: (data) => this.post('/pets', data),
        list: () => this.get('/pets'),
        get: (id) => this.get(`/pets/${id}`),
        update: (id, data) => this.put(`/pets/${id}`, data),
        delete: (id) => this.delete(`/pets/${id}`),
        getMedicalRecords: (id) => this.get(`/pets/${id}/medical-records`),
        addMedicalRecord: (id, data) => this.post(`/pets/${id}/medical-records`, data)
    };

    // 健康监测API
    health = {
        createRecord: (data) => this.post('/health/records', data),
        getRecords: (petId, params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/health/records/${petId}?${queryString}`);
        },
        getTrends: (petId, params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/health/trends/${petId}?${queryString}`);
        }
    };

    // 预警API
    alert = {
        list: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/alerts?${queryString}`);
        },
        get: (id) => this.get(`/alerts/${id}`),
        markAsRead: (id) => this.put(`/alerts/${id}/read`),
        dismiss: (id) => this.put(`/alerts/${id}/dismiss`)
    };

    // 兽医咨询API
    veterinary = {
        createConsultation: (data) => this.post('/veterinary/consultation', data),
        getConsultations: (petId) => this.get(`/veterinary/consultations/${petId}`),
        createAppointment: (data) => this.post('/veterinary/appointment', data),
        getAppointments: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/veterinary/appointments?${queryString}`);
        },
        getMedicalRecords: (petId) => this.get(`/veterinary/records/${petId}`)
    };

    // 喂养方案API
    feeding = {
        getPlan: (petId) => this.get(`/feeding/plan/${petId}`),
        adjustPlan: (petId, data) => this.post(`/feeding/adjust/${petId}`, data),
        getRecipes: (petId) => this.get(`/feeding/recipes/${petId}`)
    };

    // 行为训练API
    training = {
        getProblems: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/training/problems?${queryString}`);
        },
        getSolution: (problemId) => this.get(`/training/solution/${problemId}`),
        createPlan: (data) => this.post('/training/plan', data),
        checkIn: (planId, data) => this.post(`/training/check-in/${planId}`, data)
    };

    // 社区API
    community = {
        getFeed: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/community/feed?${queryString}`);
        },
        createPost: (data) => this.post('/community/posts', data),
        getComments: (postId) => this.get(`/community/posts/${postId}/comments`),
        addComment: (postId, data) => this.post(`/community/posts/${postId}/comments`, data),
        getNews: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/community/news?${queryString}`);
        }
    };

    // 聊天API
    chat = {
        sendMessage: (data) => this.post('/chat/message', data),
        getHistory: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return this.get(`/chat/history?${queryString}`);
        }
    };
}

// 创建API客户端实例
const api = new ApiClient();
