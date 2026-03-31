/**
 * 聊天模块
 */

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentPetId = null;
        this.conversationId = null;

        this.init();
    }

    init() {
        const toggleBtn = document.getElementById('chat-toggle');
        const closeBtn = document.getElementById('chat-close');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');

        toggleBtn.addEventListener('click', () => this.toggle());
        closeBtn.addEventListener('click', () => this.close());
        sendBtn.addEventListener('click', () => this.sendMessage());

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // 加载聊天历史
        this.loadHistory();
    }

    // 切换聊天窗口
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    // 打开聊天窗口
    open() {
        this.isOpen = true;
        const window = document.getElementById('chat-window');
        window.classList.remove('hidden');

        // 添加欢迎消息
        if (this.messages.length === 0) {
            this.addMessage('assistant', '您好！我是您的宠物健康助手。有什么我可以帮助您的吗？');
        }
    }

    // 关闭聊天窗口
    close() {
        this.isOpen = false;
        const window = document.getElementById('chat-window');
        window.classList.add('hidden');
    }

    // 添加消息
    addMessage(role, content) {
        this.messages.push({ role, content });
        this.renderMessages();
    }

    // 渲染消息列表
    renderMessages() {
        const container = document.getElementById('chat-messages');
        container.innerHTML = '';

        this.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${msg.role}`;

            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = msg.content;

            messageDiv.appendChild(bubble);
            container.appendChild(messageDiv);
        });

        // 滚动到底部
        container.scrollTop = container.scrollHeight;
    }

    // 发送消息
    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        // 添加用户消息
        this.addMessage('user', message);
        input.value = '';

        // 显示加载状态
        const sendBtn = document.getElementById('chat-send');
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span class="loading"></span>';

        try {
            // 调用API发送消息
            const response = await api.chat.sendMessage({
                message,
                petId: this.currentPetId,
                conversationId: this.conversationId
            });

            if (response.success) {
                // 保存会话ID
                this.conversationId = response.data.conversationId;

                // 添加助手回复
                this.addMessage('assistant', response.data.answer);
            } else {
                this.addMessage('assistant', '抱歉，出现了错误，请稍后再试。');
            }
        } catch (error) {
            console.error('发送消息失败:', error);
            this.addMessage('assistant', '抱歉，网络连接出现问题，请检查您的网络连接。');
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = '发送';
        }
    }

    // 设置当前宠物
    setCurrentPet(petId) {
        this.currentPetId = petId;
    }

    // 加载聊天历史
    async loadHistory() {
        try {
            if (!auth.isAuthenticated()) {
                return;
            }

            const response = await api.chat.getHistory({
                petId: this.currentPetId,
                limit: 20
            });

            if (response.success && response.data.length > 0) {
                this.messages = response.data.reverse().map(msg => ({
                    role: 'user',
                    content: msg.message
                })).concat(response.data.map(msg => ({
                    role: 'assistant',
                    content: msg.response
                })));

                this.renderMessages();
            }
        } catch (error) {
            console.error('加载聊天历史失败:', error);
        }
    }

    // 清空消息
    clearMessages() {
        this.messages = [];
        this.conversationId = null;
        this.renderMessages();
    }
}

// 创建聊天实例
const chatWidget = new ChatWidget();
