# Dify智能体和工作流输出格式说明

## 概述

本文档详细说明了AI宠物健康管理系统中各个智能体和工作流的输出格式要求。为确保系统能够正确解析和处理Dify返回的数据，请严格按照本文档的格式要求进行配置。

---

## 一、智能体输出格式

### 1. 宠物健康助手智能体（中枢）

**智能体ID**: `pet-health-assistant`
**角色**: 中枢智能体，负责意图调度和结果整合

#### 输出格式

```json
{
  "answer": "用户的回答内容",
  "conversation_id": "会话ID",
  "message_id": "消息ID",
  "metadata": {
    "intent": "识别的意图类型",
    "agent_called": "调用的智能体",
    "confidence": 0.95
  }
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| answer | string | 是 | 返回给用户的回答内容 |
| conversation_id | string | 是 | 对话会话ID，用于上下文关联 |
| message_id | string | 是 | 消息唯一标识 |
| metadata.intent | string | 否 | 识别的意图：health/feeding/training/data_query |
| metadata.agent_called | string | 否 | 调用的子智能体ID |
| metadata.confidence | number | 否 | 意图识别置信度，0-1之间 |

#### 示例

```json
{
  "answer": "根据您描述的情况，我建议您先观察狗狗的食欲和精神状态。如果持续超过24小时不爱吃饭，建议咨询兽医。",
  "conversation_id": "conv_1234567890",
  "message_id": "msg_9876543210",
  "metadata": {
    "intent": "health",
    "agent_called": "veterinarian-agent",
    "confidence": 0.92
  }
}
```

---

### 2. 兽医智能体

**智能体ID**: `veterinarian-agent`
**角色**: 专业兽医咨询，提供健康诊断和建议

#### 输出格式

```json
{
  "answer": "详细的诊断建议",
  "diagnosis": {
    "possible_conditions": ["可能疾病1", "可能疾病2"],
    "severity": "medium",
    "recommended_actions": ["建议1", "建议2"],
    "emergency_level": "low"
  },
  "medication_advice": {
    "otc_available": true,
    "medications": [
      {
        "name": "药品名称",
        "dosage": "用量说明",
        "frequency": "使用频率",
        "notes": "注意事项"
      }
    ],
    "prescription_required": false,
    "vet_consultation_recommended": false
  }
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| answer | string | 是 | 返回给用户的回答内容 |
| diagnosis.possible_conditions | array | 否 | 可能的疾病列表 |
| diagnosis.severity | string | 否 | 严重程度：low/medium/high |
| diagnosis.recommended_actions | array | 否 | 建议采取的行动 |
| diagnosis.emergency_level | string | 否 | 紧急程度：low/medium/high/urgent |
| medication_advice.otc_available | boolean | 否 | 是否有非处方药可用 |
| medication_advice.medications | array | 否 | 建议的药品列表 |
| medication_advice.prescription_required | boolean | 否 | 是否需要处方药 |
| medication_advice.vet_consultation_recommended | boolean | 否 | 是否建议就医 |

#### 示例

```json
{
  "answer": "根据您描述的症状，狗狗可能出现了消化不良。建议先禁食12小时，然后少量多次喂食易消化的食物。",
  "diagnosis": {
    "possible_conditions": ["消化不良", "肠胃炎"],
    "severity": "low",
    "recommended_actions": [
      "禁食12小时",
      "提供充足饮水",
      "观察精神状态"
    ],
    "emergency_level": "low"
  },
  "medication_advice": {
    "otc_available": true,
    "medications": [
      {
        "name": "益生菌",
        "dosage": "按照产品说明",
        "frequency": "每日1-2次",
        "notes": "建议咨询兽医后使用"
      }
    ],
    "prescription_required": false,
    "vet_consultation_recommended": false
  }
}
```

---

### 3. 喂养方案定制智能体

**智能体ID**: `nutrition-agent`
**角色**: 宠物营养师，计算能量需求并生成喂养方案

#### 输出格式

```json
{
  "answer": "喂养方案说明",
  "feeding_plan": {
    "daily_calories": 1200,
    "calories_per_meal": 400,
    "meals_per_day": 3,
    "nutrition_breakdown": {
      "protein": {
        "percentage": 25,
        "grams": 75,
        "sources": ["鸡肉", "鱼肉", "牛肉"]
      },
      "fat": {
        "percentage": 15,
        "grams": 20,
        "sources": ["鱼油", "鸡油"]
      },
      "carbohydrates": {
        "percentage": 60,
        "grams": 180,
        "sources": ["米饭", "燕麦", "红薯"]
      }
    },
    "feeding_schedule": [
      {
        "meal": 1,
        "time": "08:00",
        "amount": "400卡路里"
      },
      {
        "meal": 2,
        "time": "13:00",
        "amount": "400卡路里"
      },
      {
        "meal": 3,
        "time": "19:00",
        "amount": "400卡路里"
      }
    ],
    "special_instructions": ["避免过量喂食", "定时定量"]
  },
  "adjustment_factors": {
    "weight_trend": "stable",
    "activity_level": "normal",
    "next_review_date": "2024-04-30"
  }
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| answer | string | 是 | 返回给用户的回答内容 |
| feeding_plan.daily_calories | number | 是 | 每日所需总卡路里 |
| feeding_plan.calories_per_meal | number | 是 | 每餐卡路里 |
| feeding_plan.meals_per_day | number | 是 | 每天餐数 |
| feeding_plan.nutrition_breakdown | object | 是 | 营养成分分解 |
| feeding_plan.feeding_schedule | array | 是 | 喂食时间表 |
| feeding_plan.special_instructions | array | 否 | 特殊说明 |
| adjustment_factors.weight_trend | string | 否 | 体重趋势：stable/gain/loss |
| adjustment_factors.activity_level | string | 否 | 活动水平：low/normal/high |
| adjustment_factors.next_review_date | string | 否 | 下次复核日期 |

#### 示例

```json
{
  "answer": "根据您的狗狗信息，我为您制定了以下喂养方案：每日总热量1200卡路里，分3餐喂食。",
  "feeding_plan": {
    "daily_calories": 1200,
    "calories_per_meal": 400,
    "meals_per_day": 3,
    "nutrition_breakdown": {
      "protein": {
        "percentage": 25,
        "grams": 75,
        "sources": ["鸡肉", "鱼肉", "牛肉"]
      },
      "fat": {
        "percentage": 15,
        "grams": 20,
        "sources": ["鱼油", "鸡油"]
      },
      "carbohydrates": {
        "percentage": 60,
        "grams": 180,
        "sources": ["米饭", "燕麦", "红薯"]
      }
    },
    "feeding_schedule": [
      {"meal": 1, "time": "08:00", "amount": "400卡路里"},
      {"meal": 2, "time": "13:00", "amount": "400卡路里"},
      {"meal": 3, "time": "19:00", "amount": "400卡路里"}
    ],
    "special_instructions": ["避免过量喂食", "定时定量"]
  },
  "adjustment_factors": {
    "weight_trend": "stable",
    "activity_level": "normal",
    "next_review_date": "2024-04-30"
  }
}
```

---

### 4. 行为训练智能体

**智能体ID**: `training-agent`
**角色**: 宠物行为训练师，提供行为纠正方案

#### 输出格式

```json
{
  "answer": "训练方案说明",
  "training_plan": {
    "problem_type": "乱叫",
    "difficulty": "medium",
    "duration_days": 14,
    "steps": [
      {
        "day": 1,
        "action": "第一步描述",
        "method": "正向训练",
        "tips": ["提示1", "提示2"]
      },
      {
        "day": 2,
        "action": "第二步描述",
        "method": "正向训练",
        "tips": ["提示1"]
      }
    ],
    "success_criteria": ["成功标准1", "成功标准2"],
    "common_mistakes": ["常见错误1", "常见错误2"],
    "tools_needed": ["零食奖励", "牵引绳"]
  },
  "progress_tracking": {
    "checkpoints": [
      {
        "day": 7,
        "milestone": "中期评估"
      },
      {
        "day": 14,
        "milestone": "最终评估"
      }
    ]
  }
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| answer | string | 是 | 返回给用户的回答内容 |
| training_plan.problem_type | string | 是 | 问题类型 |
| training_plan.difficulty | string | 否 | 难度级别：easy/medium/hard |
| training_plan.duration_days | number | 是 | 训练周期（天） |
| training_plan.steps | array | 是 | 训练步骤列表 |
| training_plan.success_criteria | array | 否 | 成功标准 |
| training_plan.common_mistakes | array | 否 | 常见错误 |
| training_plan.tools_needed | array | 否 | 所需工具 |
| progress_tracking.checkpoints | array | 否 | 评估节点 |

#### 示例

```json
{
  "answer": "针对狗狗乱叫的问题，我为您制定了一个14天的训练计划。",
  "training_plan": {
    "problem_type": "乱叫",
    "difficulty": "medium",
    "duration_days": 14,
    "steps": [
      {
        "day": 1,
        "action": "建立安静指令",
        "method": "正向训练",
        "tips": ["使用简短的指令词", "立即奖励安静行为"]
      },
      {
        "day": 2,
        "action": "练习安静指令",
        "method": "正向训练",
        "tips": ["每天练习3-5次", "每次5-10分钟"]
      }
    ],
    "success_criteria": [
      "听到安静指令后3秒内停止吠叫",
      "在没有提示的情况下保持安静5分钟"
    ],
    "common_mistakes": [
      "训练时间过长导致狗狗注意力分散",
      "奖励不及时"
    ],
    "tools_needed": ["零食奖励", "牵引绳"]
  },
  "progress_tracking": {
    "checkpoints": [
      {"day": 7, "milestone": "中期评估"},
      {"day": 14, "milestone": "最终评估"}
    ]
  }
}
```

---

## 二、工作流输出格式

### 1. 异常预警工作流

**工作流ID**: `anomaly-detection-workflow`
**触发方式**: 数据库事件（健康数据写入时）

#### 输出格式

```json
{
  "result": {
    "status": "alert_generated",
    "alert": {
      "id": "alert_unique_id",
      "pet_id": 1,
      "type": "weight_drop",
      "severity": "high",
      "title": "体重骤降预警",
      "description": "您的宠物连续3天体重下降超过5%",
      "recommendation": "建议尽快带宠物就医检查",
      "data_points": [
        {
          "date": "2024-03-28",
          "value": 25.0,
          "unit": "kg"
        },
        {
          "date": "2024-03-29",
          "value": 24.5,
          "unit": "kg"
        },
        {
          "date": "2024-03-30",
          "value": 23.5,
          "unit": "kg"
        }
      ],
      "detected_at": "2024-03-30T10:30:00Z",
      "needs_vet_consultation": true
    }
  },
  "execution_id": "workflow_execution_id",
  "status": "succeeded"
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| result.status | string | 是 | 执行状态：alert_generated/no_alert/error |
| result.alert | object | 否 | 预警详情（仅在有预警时） |
| result.alert.id | string | 是 | 预警唯一ID |
| result.alert.pet_id | number | 是 | 宠物ID |
| result.alert.type | string | 是 | 预警类型：weight_drop/water_spike/activity_drop/other |
| result.alert.severity | string | 是 | 严重程度：low/medium/high |
| result.alert.title | string | 是 | 预警标题 |
| result.alert.description | string | 是 | 预警描述 |
| result.alert.recommendation | string | 是 | 建议措施 |
| result.alert.data_points | array | 是 | 触发预警的数据点 |
| result.alert.detected_at | string | 是 | 检测时间（ISO 8601格式） |
| result.alert.needs_vet_consultation | boolean | 是 | 是否建议就医 |
| execution_id | string | 是 | 工作流执行ID |
| status | string | 是 | 工作流状态：succeeded/failed |

#### 示例

```json
{
  "result": {
    "status": "alert_generated",
    "alert": {
      "id": "alert_1234567890",
      "pet_id": 1,
      "type": "weight_drop",
      "severity": "high",
      "title": "体重骤降预警",
      "description": "您的宠物连续3天体重下降超过5%",
      "recommendation": "建议尽快带宠物就医检查",
      "data_points": [
        {"date": "2024-03-28", "value": 25.0, "unit": "kg"},
        {"date": "2024-03-29", "value": 24.5, "unit": "kg"},
        {"date": "2024-03-30", "value": 23.5, "unit": "kg"}
      ],
      "detected_at": "2024-03-30T10:30:00Z",
      "needs_vet_consultation": true
    }
  },
  "execution_id": "exec_9876543210",
  "status": "succeeded"
}
```

---

### 2. 健康资讯工作流

**工作流ID**: `health-info-workflow`
**触发方式**: 定时任务（每天上午9点）

#### 输出格式

```json
{
  "result": {
    "status": "content_generated",
    "content": {
      "id": "content_unique_id",
      "pet_id": 1,
      "title": "健康资讯标题",
      "summary": "内容摘要",
      "content": "详细内容",
      "category": "health",
      "lifecycle_stage": "6月龄",
      "tags": ["疫苗接种", "换牙期"],
      "action_required": true,
      "action_type": "vaccination_reminder",
      "action_deadline": "2024-04-15",
      "priority": "medium",
      "created_at": "2024-03-30T09:00:00Z"
    }
  },
  "execution_id": "workflow_execution_id",
  "status": "succeeded"
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| result.status | string | 是 | 执行状态：content_generated/no_content/error |
| result.content | object | 否 | 内容详情（仅在有内容时） |
| result.content.id | string | 是 | 内容唯一ID |
| result.content.pet_id | number | 是 | 宠物ID |
| result.content.title | string | 是 | 资讯标题 |
| result.content.summary | string | 是 | 内容摘要 |
| result.content.content | string | 是 | 详细内容 |
| result.content.category | string | 是 | 分类：health/nutrition/training/grooming |
| result.content.lifecycle_stage | string | 否 | 生命周期阶段 |
| result.content.tags | array | 否 | 标签列表 |
| result.content.action_required | boolean | 是 | 是否需要用户行动 |
| result.content.action_type | string | 否 | 行动类型：vaccination_reminder/checkup_reminder/other |
| result.content.action_deadline | string | 否 | 行动截止日期 |
| result.content.priority | string | 是 | 优先级：low/medium/high |
| result.content.created_at | string | 是 | 创建时间（ISO 8601格式） |
| execution_id | string | 是 | 工作流执行ID |
| status | string | 是 | 工作流状态：succeeded/failed |

#### 示例

```json
{
  "result": {
    "status": "content_generated",
    "content": {
      "id": "content_1234567890",
      "pet_id": 1,
      "title": "幼犬疫苗接种提醒",
      "summary": "您的狗狗即将完成基础疫苗接种",
      "content": "根据您的狗狗的年龄，它即将完成6周龄的基础疫苗接种。请确保按时完成所有疫苗...",
      "category": "health",
      "lifecycle_stage": "6月龄",
      "tags": ["疫苗接种", "换牙期"],
      "action_required": true,
      "action_type": "vaccination_reminder",
      "action_deadline": "2024-04-15",
      "priority": "high",
      "created_at": "2024-03-30T09:00:00Z"
    }
  },
  "execution_id": "exec_9876543210",
  "status": "succeeded"
}
```

---

### 3. 喂养方案调整工作流

**工作流ID**: `feeding-adjustment-workflow`
**触发方式**: 定时任务（每周一上午10点）

#### 输出格式

```json
{
  "result": {
    "status": "plan_adjusted",
    "adjustment": {
      "pet_id": 1,
      "old_plan_id": "old_plan_id",
      "new_plan_id": "new_plan_id",
      "adjustment_type": "increase",
      "reason": "体重增加，需要调整喂养量",
      "weight_change": {
        "start_weight": 25.0,
        "end_weight": 26.5,
        "change_percent": 6.0,
        "trend": "gain"
      },
      "calorie_adjustment": {
        "old_daily_calories": 1200,
        "new_daily_calories": 1100,
        "change_percent": -8.33
      },
      "effective_date": "2024-04-01",
      "review_date": "2024-04-08",
      "notes": "每周监测体重变化"
    }
  },
  "execution_id": "workflow_execution_id",
  "status": "succeeded"
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| result.status | string | 是 | 执行状态：plan_adjusted/no_adjustment/error |
| result.adjustment | object | 否 | 调整详情（仅在需要调整时） |
| result.adjustment.pet_id | number | 是 | 宠物ID |
| result.adjustment.old_plan_id | string | 是 | 旧方案ID |
| result.adjustment.new_plan_id | string | 是 | 新方案ID |
| result.adjustment.adjustment_type | string | 是 | 调整类型：increase/decrease/no_change |
| result.adjustment.reason | string | 是 | 调整原因 |
| result.adjustment.weight_change | object | 是 | 体重变化 |
| result.adjustment.weight_change.start_weight | number | 是 | 起始体重 |
| result.adjustment.weight_change.end_weight | number | 是 | 结束体重 |
| result.adjustment.weight_change.change_percent | number | 是 | 变化百分比 |
| result.adjustment.weight_change.trend | string | 是 | 趋势：gain/loss/stable |
| result.adjustment.calorie_adjustment | object | 是 | 卡路里调整 |
| result.adjustment.calorie_adjustment.old_daily_calories | number | 是 | 旧日卡路里 |
| result.adjustment.calorie_adjustment.new_daily_calories | number | 是 | 新日卡路里 |
| result.adjustment.calorie_adjustment.change_percent | number | 是 | 变化百分比 |
| result.adjustment.effective_date | string | 是 | 生效日期 |
| result.adjustment.review_date | string | 是 | 复核日期 |
| result.adjustment.notes | string | 否 | 备注 |
| execution_id | string | 是 | 工作流执行ID |
| status | string | 是 | 工作流状态：succeeded/failed |

#### 示例

```json
{
  "result": {
    "status": "plan_adjusted",
    "adjustment": {
      "pet_id": 1,
      "old_plan_id": "plan_123",
      "new_plan_id": "plan_456",
      "adjustment_type": "decrease",
      "reason": "体重增加，需要调整喂养量",
      "weight_change": {
        "start_weight": 25.0,
        "end_weight": 26.5,
        "change_percent": 6.0,
        "trend": "gain"
      },
      "calorie_adjustment": {
        "old_daily_calories": 1200,
        "new_daily_calories": 1100,
        "change_percent": -8.33
      },
      "effective_date": "2024-04-01",
      "review_date": "2024-04-08",
      "notes": "每周监测体重变化"
    }
  },
  "execution_id": "exec_9876543210",
  "status": "succeeded"
}
```

---

### 4. 兽医咨询工作流

**工作流ID**: `veterinary-consultation-workflow`
**触发方式**: 用户触发（发起咨询时）

#### 输出格式

```json
{
  "result": {
    "status": "consultation_completed",
    "consultation": {
      "id": "consultation_unique_id",
      "pet_id": 1,
      "user_id": 1,
      "symptoms": "症状描述",
      "preliminary_diagnosis": {
        "possible_conditions": ["可能疾病1", "可能疾病2"],
        "confidence_score": 0.75,
        "urgency": "medium"
      },
      "recommendations": [
        {
          "type": "home_care",
          "description": "家庭护理建议",
          "priority": "high"
        },
        {
          "type": "vet_visit",
          "description": "就医建议",
          "priority": "medium",
          "timeline": "24-48小时内"
        }
      ],
      "medication_suggestions": [
        {
          "name": "药品名称",
          "type": "otc",
          "dosage": "用量",
          "frequency": "频率",
          "duration": "使用时长"
        }
      ],
      "follow_up_required": true,
      "follow_up_timeline": "3天",
      "created_at": "2024-03-30T14:30:00Z"
    }
  },
  "execution_id": "workflow_execution_id",
  "status": "succeeded"
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| result.status | string | 是 | 执行状态：consultation_completed/error |
| result.consultation | object | 是 | 咨询详情 |
| result.consultation.id | string | 是 | 咨询唯一ID |
| result.consultation.pet_id | number | 是 | 宠物ID |
| result.consultation.user_id | number | 是 | 用户ID |
| result.consultation.symptoms | string | 是 | 症状描述 |
| result.consultation.preliminary_diagnosis | object | 是 | 初步诊断 |
| result.consultation.preliminary_diagnosis.possible_conditions | array | 是 | 可能的疾病 |
| result.consultation.preliminary_diagnosis.confidence_score | number | 是 | 诊断置信度（0-1） |
| result.consultation.preliminary_diagnosis.urgency | string | 是 | 紧急程度：low/medium/high/urgent |
| result.consultation.recommendations | array | 是 | 建议列表 |
| result.consultation.recommendations[].type | string | 是 | 建议类型：home_care/vet_visit/emergency |
| result.consultation.recommendations[].description | string | 是 | 建议描述 |
| result.consultation.recommendations[].priority | string | 是 | 优先级：low/medium/high |
| result.consultation.recommendations[].timeline | string | 否 | 时间线 |
| result.consultation.medication_suggestions | array | 否 | 药品建议 |
| result.consultation.medication_suggestions[].name | string | 是 | 药品名称 |
| result.consultation.medication_suggestions[].type | string | 是 | 类型：otc/prescription |
| result.consultation.medication_suggestions[].dosage | string | 是 | 用量 |
| result.consultation.medication_suggestions[].frequency | string | 是 | 频率 |
| result.consultation.medication_suggestions[].duration | string | 是 | 使用时长 |
| result.consultation.follow_up_required | boolean | 是 | 是否需要随访 |
| result.consultation.follow_up_timeline | string | 否 | 随访时间线 |
| result.consultation.created_at | string | 是 | 创建时间（ISO 8601格式） |
| execution_id | string | 是 | 工作流执行ID |
| status | string | 是 | 工作流状态：succeeded/failed |

#### 示例

```json
{
  "result": {
    "status": "consultation_completed",
    "consultation": {
      "id": "consult_1234567890",
      "pet_id": 1,
      "user_id": 1,
      "symptoms": "食欲不振，精神萎靡",
      "preliminary_diagnosis": {
        "possible_conditions": ["消化不良", "肠胃炎"],
        "confidence_score": 0.75,
        "urgency": "medium"
      },
      "recommendations": [
        {
          "type": "home_care",
          "description": "禁食12小时，提供充足饮水",
          "priority": "high"
        },
        {
          "type": "vet_visit",
          "description": "如果症状持续超过24小时，建议就医",
          "priority": "medium",
          "timeline": "24-48小时内"
        }
      ],
      "medication_suggestions": [
        {
          "name": "益生菌",
          "type": "otc",
          "dosage": "按照产品说明",
          "frequency": "每日1-2次",
          "duration": "3-5天"
        }
      ],
      "follow_up_required": true,
      "follow_up_timeline": "3天",
      "created_at": "2024-03-30T14:30:00Z"
    }
  },
  "execution_id": "exec_9876543210",
  "status": "succeeded"
}
```

---

## 三、通用格式要求

### 1. 日期时间格式

所有日期时间字段必须使用 **ISO 8601** 格式：
```
YYYY-MM-DDTHH:mm:ssZ
```

示例：
```
2024-03-30T10:30:00Z
2024-03-30T10:30:00+08:00
```

### 2. 数字格式

- 所有数字使用标准的JSON数字格式
- 百分比使用0-1之间的小数（如0.75表示75%）
- 重量、温度等使用浮点数

### 3. 字符串编码

- 所有字符串使用UTF-8编码
- 避免使用特殊字符
- 如需使用换行符，使用`\n`

### 4. 枚举值

所有枚举类型字段必须使用预定义的值，详见各字段的说明。

### 5. 必填字段

标记为"必填"的字段必须在输出中包含，否则系统将无法正确处理。

### 6. 可选字段

标记为"可选"的字段可以根据实际情况省略，但如果包含则必须符合格式要求。

---

## 四、错误处理格式

### 智能体错误响应

```json
{
  "error": {
    "code": "AGENT_ERROR",
    "message": "错误描述",
    "details": {
      "error_type": "具体错误类型",
      "suggestion": "建议的解决方案"
    }
  }
}
```

### 工作流错误响应

```json
{
  "error": {
    "code": "WORKFLOW_ERROR",
    "message": "错误描述",
    "details": {
      "step": "失败的步骤",
      "error_type": "具体错误类型",
      "retry_possible": true
    }
  },
  "execution_id": "workflow_execution_id",
  "status": "failed"
}
```

---

## 五、最佳实践

### 1. 智能体配置建议

1. **明确角色定位**：在智能体提示词中明确其角色和职责
2. **结构化输出**：使用提示词引导智能体输出结构化的JSON格式
3. **字段验证**：在智能体输出后进行字段验证和补全
4. **错误处理**：提供友好的错误消息和建议

### 2. 工作流配置建议

1. **步骤清晰**：每个工作流步骤应该有明确的输入和输出
2. **数据验证**：在工作流开始时验证输入数据
3. **错误捕获**：为每个步骤配置错误处理
4. **日志记录**：记录关键步骤的执行信息

### 3. 测试建议

1. **单元测试**：为每个智能体和工作流创建测试用例
2. **集成测试**：测试智能体和工作流与系统的集成
3. **边界测试**：测试各种边界情况和异常输入
4. **性能测试**：测试响应时间和并发处理能力

---

## 六、版本控制

本文档版本：v1.0.0
最后更新：2024-03-30

如有格式变更，请更新本文档并通知相关开发人员。

---

## 七、联系与支持

如有格式相关的问题或建议，请联系：

- 技术支持：[技术支持邮箱]
- 项目文档：[项目文档链接]
- Issue跟踪：[Issue链接]

---

**重要提示**：请严格按照本文档的格式要求配置Dify智能体和工作流，否则可能导致系统无法正常解析和处理返回的数据。
