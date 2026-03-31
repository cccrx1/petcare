/**
 * 本地文件存储模块
 * 用于替代数据库，使用JSON文件存储数据
 */

const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');
const config = require('../config');

class FileStorage {
    constructor() {
        this.dataDir = path.join(process.cwd(), config.dataDir || './data');
        this.backupDir = path.join(process.cwd(), config.backupDir || './backups');
        this.ensureDirectories();
    }

    // 确保目录存在
    async ensureDirectories() {
        try {
            await fs.mkdir(this.dataDir, { recursive: true });
            await fs.mkdir(this.backupDir, { recursive: true });
            logger.info('Data directories created');
        } catch (error) {
            logger.error('Failed to create data directories', { error: error.message });
        }
    }

    // 获取文件路径
    getFilePath(collection) {
        return path.join(this.dataDir, `${collection}.json`);
    }

    // 读取数据
    async read(collection) {
        try {
            const filePath = this.getFilePath(collection);
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // 文件不存在，返回空数组
                return [];
            }
            logger.error(`Failed to read ${collection}`, { error: error.message });
            throw error;
        }
    }

    // 写入数据
    async write(collection, data) {
        try {
            const filePath = this.getFilePath(collection);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            logger.debug(`Saved ${collection}`, { count: Array.isArray(data) ? data.length : 1 });
        } catch (error) {
            logger.error(`Failed to write ${collection}`, { error: error.message });
            throw error;
        }
    }

    // 添加数据
    async add(collection, item) {
        const data = await this.read(collection);
        const newItem = {
            ...item,
            id: item.id || this.generateId(),
            created_at: item.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        data.push(newItem);
        await this.write(collection, data);
        return newItem;
    }

    // 更新数据
    async update(collection, id, updates) {
        const data = await this.read(collection);
        const index = data.findIndex(item => item.id === id);

        if (index === -1) {
            return null;
        }

        data[index] = {
            ...data[index],
            ...updates,
            id: id, // 确保ID不被覆盖
            updated_at: new Date().toISOString()
        };

        await this.write(collection, data);
        return data[index];
    }

    // 删除数据
    async delete(collection, id) {
        const data = await this.read(collection);
        const index = data.findIndex(item => item.id === id);

        if (index === -1) {
            return false;
        }

        data.splice(index, 1);
        await this.write(collection, data);
        return true;
    }

    // 查找数据
    async find(collection, predicate) {
        const data = await this.read(collection);
        return data.filter(predicate);
    }

    // 查找单个数据
    async findOne(collection, predicate) {
        const data = await this.read(collection);
        return data.find(predicate) || null;
    }

    // 根据ID查找
    async findById(collection, id) {
        return this.findOne(collection, item => item.id === id);
    }

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 备份数据
    async backup(collection) {
        try {
            const filePath = this.getFilePath(collection);
            const backupPath = path.join(this.backupDir, `${collection}_${Date.now()}.json`);
            await fs.copyFile(filePath, backupPath);
            logger.info(`Backed up ${collection}`, { backupPath });
            return backupPath;
        } catch (error) {
            logger.error(`Failed to backup ${collection}`, { error: error.message });
            throw error;
        }
    }

    // 清空集合
    async clear(collection) {
        await this.write(collection, []);
        logger.info(`Cleared ${collection}`);
    }
}

// 创建存储实例
const storage = new FileStorage();

module.exports = storage;
