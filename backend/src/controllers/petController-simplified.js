/**
 * 宠物档案控制器 - 简化版
 */

const storage = require('../utils/fileStorage');
const logger = require('../utils/logger');

// 创建宠物档案
const createPet = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        const { name, species, breed, age, weight, gender, isNeutered, birthDate } = req.body;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        // 验证用户
        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const pet = await storage.add('pets', {
            userId: user.id,
            name,
            species,
            breed,
            age,
            weight,
            gender,
            isNeutered,
            birthDate
        });

        logger.info('Pet created', { petId: pet.id, userId: user.id });

        res.status(201).json({
            success: true,
            message: '宠物档案创建成功',
            data: pet
        });
    } catch (error) {
        next(error);
    }
};

// 获取用户的所有宠物
const getPets = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const pets = await storage.find('pets', pet => pet.userId === user.id);

        res.json({
            success: true,
            data: pets
        });
    } catch (error) {
        next(error);
    }
};

// 获取单个宠物详情
const getPetById = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        const { id } = req.params;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const pet = await storage.findOne('pets', p => p.id === id && p.userId === user.id);
        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'PET_NOT_FOUND',
                message: '宠物不存在'
            });
        }

        res.json({
            success: true,
            data: pet
        });
    } catch (error) {
        next(error);
    }
};

// 更新宠物档案
const updatePet = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        const { id } = req.params;
        const { name, species, breed, age, weight, gender, isNeutered, birthDate } = req.body;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const pet = await storage.findOne('pets', p => p.id === id && p.userId === user.id);
        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'PET_NOT_FOUND',
                message: '宠物不存在'
            });
        }

        const updatedPet = await storage.update('pets', id, {
            name,
            species,
            breed,
            age,
            weight,
            gender,
            isNeutered,
            birthDate
        });

        logger.info('Pet updated', { petId: id, userId: user.id });

        res.json({
            success: true,
            message: '宠物档案更新成功',
            data: updatedPet
        });
    } catch (error) {
        next(error);
    }
};

// 删除宠物档案
const deletePet = async (req, res, next) => {
    try {
        const { sessionId } = req.query;
        const { id } = req.params;

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const user = await storage.findOne('users', u => u.sessionId === sessionId);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: '未授权'
            });
        }

        const deleted = await storage.delete('pets', id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'PET_NOT_FOUND',
                message: '宠物不存在'
            });
        }

        logger.info('Pet deleted', { petId: id, userId: user.id });

        res.json({
            success: true,
            message: '宠物档案删除成功'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet
};
