-- AI宠物健康管理系统 - 数据库初始化脚本
-- PostgreSQL Schema

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 宠物表
CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL, -- dog, cat, etc.
    breed VARCHAR(100),
    age INTEGER,
    weight DECIMAL(5, 2),
    gender VARCHAR(10), -- male, female
    is_neutered BOOLEAN DEFAULT FALSE,
    birth_date DATE,
    activity_level VARCHAR(20) DEFAULT 'normal', -- low, normal, high
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 医疗记录表
CREATE TABLE IF NOT EXISTS medical_records (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- vaccination, checkup, illness, surgery
    description TEXT NOT NULL,
    date DATE NOT NULL,
    doctor VARCHAR(100),
    hospital VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 健康监测记录表
CREATE TABLE IF NOT EXISTS health_records (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- weight, food_intake, water_intake, activity, etc.
    value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20), -- kg, g, ml, steps, etc.
    notes TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 预警表
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- weight_drop, water_spike, activity_drop, etc.
    severity VARCHAR(20) NOT NULL, -- low, medium, high
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT,
    status VARCHAR(20) DEFAULT 'unread', -- unread, read, dismissed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- 兽医咨询表
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symptoms TEXT NOT NULL,
    description TEXT,
    images TEXT[], -- JSON array of image URLs
    ai_diagnosis TEXT,
    ai_recommendation TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 医院/诊所表
CREATE TABLE IF NOT EXISTS hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    rating DECIMAL(2, 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 预约表
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES hospitals(id),
    service_type VARCHAR(50) NOT NULL, -- vaccination, checkup, surgery, grooming
    appointment_date TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 喂养方案表
CREATE TABLE IF NOT EXISTS feeding_plans (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    daily_calories INTEGER NOT NULL,
    protein DECIMAL(5, 2), -- percentage
    fat DECIMAL(5, 2), -- percentage
    carbs DECIMAL(5, 2), -- percentage
    notes TEXT,
    created_by VARCHAR(50) DEFAULT 'system', -- system, user, vet
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 食谱表
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT,
    calories_per_serving INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 行为问题表
CREATE TABLE IF NOT EXISTS behavior_problems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    species VARCHAR(50), -- dog, cat, or null for all
    severity VARCHAR(20) DEFAULT 'medium', -- low, medium, high
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 行为纠正方案表
CREATE TABLE IF NOT EXISTS behavior_solutions (
    id SERIAL PRIMARY KEY,
    problem_id INTEGER NOT NULL REFERENCES behavior_problems(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    steps TEXT NOT NULL, -- JSON array of steps
    duration_days INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 训练计划表
CREATE TABLE IF NOT EXISTS training_plans (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INTEGER NOT NULL REFERENCES behavior_problems(id),
    start_date DATE NOT NULL,
    duration_days INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, completed, paused
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 训练打卡表
CREATE TABLE IF NOT EXISTS training_checkins (
    id SERIAL PRIMARY KEY,
    plan_id INTEGER NOT NULL REFERENCES training_plans(id) ON DELETE CASCADE,
    notes TEXT,
    rating INTEGER, -- 1-5
    checkin_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 帖子表
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    images TEXT[], -- JSON array of image URLs
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 帖子评论表
CREATE TABLE IF NOT EXISTS post_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 资讯表
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    image_url VARCHAR(500),
    category VARCHAR(50), -- health, nutrition, training, etc.
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 聊天消息表
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id INTEGER REFERENCES pets(id) ON DELETE SET NULL,
    conversation_id VARCHAR(100),
    message TEXT NOT NULL,
    response TEXT,
    agent_used VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IoT设备表
CREATE TABLE IF NOT EXISTS iot_devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(100) UNIQUE NOT NULL,
    device_type VARCHAR(50) NOT NULL, -- collar, feeder, etc.
    pet_id INTEGER REFERENCES pets(id) ON DELETE SET NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, disabled
    last_active TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
CREATE INDEX IF NOT EXISTS idx_health_records_pet_id ON health_records(pet_id);
CREATE INDEX IF NOT EXISTS idx_health_records_type ON health_records(type);
CREATE INDEX IF NOT EXISTS idx_health_records_recorded_at ON health_records(recorded_at);
CREATE INDEX IF NOT EXISTS idx_alerts_pet_id ON alerts(pet_id);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_consultations_pet_id ON consultations(pet_id);
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_pet_id ON appointments(pet_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_training_plans_pet_id ON training_plans(pet_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);

-- 插入初始数据 - 行为问题
INSERT INTO behavior_problems (name, description, species, severity) VALUES
    ('乱叫', '宠物在没有明显原因的情况下频繁吠叫', 'dog', 'medium'),
    ('拆家', '宠物破坏家具、鞋子等物品', 'dog', 'high'),
    ('随地大小便', '宠物不在指定地点排泄', 'dog', 'high'),
    ('扑人', '宠物见到人时扑向对方', 'dog', 'medium'),
    ('护食', '宠物在进食时表现出攻击性', 'dog', 'high'),
    ('分离焦虑', '宠物独自在家时表现出焦虑行为', 'dog', 'medium'),
    ('抓家具', '猫咪抓挠沙发、窗帘等', 'cat', 'medium'),
    ('乱尿', '猫咪不在猫砂盆排泄', 'cat', 'high')
ON CONFLICT DO NOTHING;

-- 插入初始数据 - 行为纠正方案
INSERT INTO behavior_solutions (problem_id, title, description, steps, duration_days)
SELECT
    bp.id,
    bp.name || '纠正方案',
    bp.description,
    '["步骤1", "步骤2", "步骤3"]',
    7
FROM behavior_problems bp
ON CONFLICT DO NOTHING;
