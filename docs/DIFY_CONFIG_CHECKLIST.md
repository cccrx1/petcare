# Dify配置检查清单

## 使用说明

本文档提供了一个详细的检查清单，帮助您确保Dify智能体和工作流的配置正确无误。请在配置完成后逐项检查。

---

## 一、智能体配置检查清单

### 1. 宠物健康助手智能体（中枢）

**智能体ID**: `pet-health-assistant`

#### 基础配置
- [ ] 智能体已创建
- [ ] 智能体ID已记录
- [ ] API密钥已记录
- [ ] 智能体已启用

#### 角色设定
- [ ] 角色描述：中枢智能体，负责意图调度和结果整合
- [ ] 能力说明：自然语言理解、意图识别、多智能体协调、结果整合

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`answer`, `conversation_id`, `message_id`
- [ ] 可选字段：`metadata`（包含intent、agent_called、confidence）
- [ ] 日期时间格式符合ISO 8601标准

#### 路由规则配置
- [ ] 健康问题 → 调用veterinarian-agent
- [ ] 喂养问题 → 调用nutrition-agent
- [ ] 行为问题 → 调用training-agent
- [ ] 数据查询 → 直接查询数据库

#### 配置文件填写
- [ ] `agents-config.json`中`agent_id`已填写
- [ ] `agents-config.json`中`agent_key`已填写
- [ ] `agents-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试简单问答能正常返回
- [ ] 测试意图识别准确性
- [ ] 验证输出JSON格式正确
- [ ] 验证conversation_id持久化

---

### 2. 兽医智能体

**智能体ID**: `veterinarian-agent`

#### 基础配置
- [ ] 智能体已创建
- [ ] 智能体ID已记录
- [ ] API密钥已记录
- [ ] 智能体已启用

#### 角色设定
- [ ] 角色描述：专业执业兽医
- [ ] 能力说明：多轮问诊、症状匹配、用药建议、紧急程度判断

#### 知识库配置
- [ ] 兽医知识库已上传
- [ ] 病历数据已导入
- [ ] 知识库已关联到智能体
- [ ] RAG检索已启用

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`answer`, `diagnosis`, `medication_advice`
- [ ] `diagnosis`包含：possible_conditions, severity, recommended_actions, emergency_level
- [ ] `medication_advice`包含：otc_available, medications, prescription_required, vet_consultation_recommended
- [ ] 枚举值符合规范（severity: low/medium/high, emergency_level: low/medium/high/urgent）

#### 配置文件填写
- [ ] `agents-config.json`中`agent_id`已填写
- [ ] `agents-config.json`中`agent_key`已填写
- [ ] `agents-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试症状描述能返回诊断建议
- [ ] 测试用药建议准确性
- [ ] 验证紧急程度判断
- [ ] 测试多轮对话功能

---

### 3. 喂养方案定制智能体

**智能体ID**: `nutrition-agent`

#### 基础配置
- [ ] 智能体已创建
- [ ] 智能体ID已记录
- [ ] API密钥已记录
- [ ] 智能体已启用

#### 角色设定
- [ ] 角色描述：宠物营养师
- [ ] 能力说明：能量计算、营养规划、动态调整

#### 模型配置
- [ ] NRC营养需求模型已配置
- [ ] 能量计算公式已设置
- [ ] 营养素比例已配置

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`answer`, `feeding_plan`
- [ ] `feeding_plan`包含：daily_calories, calories_per_meal, meals_per_day, nutrition_breakdown, feeding_schedule
- [ ] `nutrition_breakdown`包含：protein, fat, carbohydrates（各自包含percentage, grams, sources）
- [ ] `feeding_schedule`为数组，包含meal, time, amount

#### 配置文件填写
- [ ] `agents-config.json`中`agent_id`已填写
- [ ] `agents-config.json`中`agent_key`已填写
- [ ] `agents-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试能根据宠物信息生成喂养方案
- [ ] 验证能量计算准确性
- [ ] 测试营养成分分解
- [ ] 验证喂食时间表生成

---

### 4. 行为训练智能体

**智能体ID**: `training-agent`

#### 基础配置
- [ ] 智能体已创建
- [ ] 智能体ID已记录
- [ ] API密钥已记录
- [ ] 智能体已启用

#### 角色设定
- [ ] 角色描述：宠物行为训练师
- [ ] 能力说明：行为问题诊断、训练指导、进度跟踪

#### 知识库配置
- [ ] 行为问题库已上传
- [ ] 训练方法已导入
- [ ] 知识库已关联到智能体

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`answer`, `training_plan`
- [ ] `training_plan`包含：problem_type, difficulty, duration_days, steps
- [ ] `steps`为数组，包含day, action, method, tips
- [ ] `progress_tracking`包含checkpoints数组

#### 配置文件填写
- [ ] `agents-config.json`中`agent_id`已填写
- [ ] `agents-config.json`中`agent_key`已填写
- [ ] `agents-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试能识别行为问题
- [ ] 验证训练计划生成
- [ ] 测试步骤详细程度
- [ ] 验证成功标准合理性

---

## 二、工作流配置检查清单

### 1. 异常预警工作流

**工作流ID**: `anomaly-detection-workflow`

#### 基础配置
- [ ] 工作流已创建
- [ ] 工作流ID已记录
- [ ] API密钥已记录
- [ ] 工作流已启用

#### 触发配置
- [ ] 触发方式设置为数据库事件
- [ ] 监听事件：health_data_inserted, health_data_updated
- [ ] 触发条件已配置

#### 任务配置
- [ ] 任务1：读取监测数据 ✅
- [ ] 任务2：异常检测（GRU-Autoencoder模型）✅
- [ ] 任务3：风险评估 ✅
- [ ] 任务4：生成预警通知 ✅
- [ ] 任务5：保存预警记录 ✅
- [ ] 任务6：推送用户通知 ✅

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`result`, `execution_id`, `status`
- [ ] `result`包含：status, alert（如有）
- [ ] `alert`包含：id, pet_id, type, severity, title, description, recommendation, data_points, detected_at, needs_vet_consultation
- [ ] 枚举值符合规范（severity: low/medium/high, type: weight_drop/water_spike/activity_drop/other）
- [ ] 日期时间格式符合ISO 8601标准

#### 检测规则配置
- [ ] 体重骤降规则：连续3天下降超过5% ✅
- [ ] 饮水量激增规则：单日超过平时2倍 ✅
- [ ] 活动量锐减规则：连续12小时无运动记录 ✅

#### 配置文件填写
- [ ] `workflows-config.json`中`workflow_id`已填写
- [ ] `workflows-config.json`中`workflow_key`已填写
- [ ] `workflows-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试能正确读取数据库数据
- [ ] 测试异常检测准确性
- [ ] 验证预警生成
- [ ] 测试通知推送

---

### 2. 健康资讯工作流

**工作流ID**: `health-info-workflow`

#### 基础配置
- [ ] 工作流已创建
- [ ] 工作流ID已记录
- [ ] API密钥已记录
- [ ] 工作流已启用

#### 触发配置
- [ ] 触发方式设置为定时任务
- [ ] Cron表达式：`0 9 * * *`（每天上午9点）
- [ ] 时区已正确设置

#### 任务配置
- [ ] 任务1：检查生命周期节点 ✅
- [ ] 任务2：生成健康资讯 ✅
- [ ] 任务3：匹配资讯内容 ✅
- [ ] 任务4：推送资讯 ✅

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`result`, `execution_id`, `status`
- [ ] `result`包含：status, content（如有）
- [ ] `content`包含：id, pet_id, title, summary, content, category, tags, action_required, priority, created_at
- [ ] 枚举值符合规范（category: health/nutrition/training/grooming, priority: low/medium/high）
- [ ] 日期时间格式符合ISO 8601标准

#### 生命周期事件配置
- [ ] 换牙期：6月龄 ✅
- [ ] 疫苗接种：每年 ✅
- [ ] 老年护理：7岁 ✅

#### 配置文件填写
- [ ] `workflows-config.json`中`workflow_id`已填写
- [ ] `workflows-config.json`中`workflow_key`已填写
- [ ] `workflows-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试能正确识别生命周期节点
- [ ] 验证资讯内容生成
- [ ] 测试资讯推送
- [ ] 验证行动提醒

---

### 3. 喂养方案调整工作流

**工作流ID**: `feeding-adjustment-workflow`

#### 基础配置
- [ ] 工作流已创建
- [ ] 工作流ID已记录
- [ ] API密钥已记录
- [ ] 工作流已启用

#### 触发配置
- [ ] 触发方式设置为定时任务
- [ ] Cron表达式：`0 10 * * 1`（每周一上午10点）
- [ ] 时区已正确设置

#### 任务配置
- [ ] 任务1：分析体重趋势 ✅
- [ ] 任务2：计算调整方案 ✅
- [ ] 任务3：更新喂养方案 ✅
- [ ] 任务4：通知用户 ✅

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`result`, `execution_id`, `status`
- [ ] `result`包含：status, adjustment（如有）
- [ ] `adjustment`包含：pet_id, old_plan_id, new_plan_id, adjustment_type, reason, weight_change, calorie_adjustment, effective_date, review_date
- [ ] `weight_change`包含：start_weight, end_weight, change_percent, trend
- [ ] `calorie_adjustment`包含：old_daily_calories, new_daily_calories, change_percent
- [ ] 枚举值符合规范（adjustment_type: increase/decrease/no_change, trend: gain/loss/stable）
- [ ] 日期时间格式符合ISO 8601标准

#### 配置文件填写
- [ ] `workflows-config.json`中`workflow_id`已填写
- [ ] `workflows-config.json`中`workflow_key`已填写
- [ ] `workflows-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试能正确分析体重趋势
- [ ] 验证调整方案计算
- [ ] 测试喂养方案更新
- [ ] 验证通知发送

---

### 4. 兽医咨询工作流

**工作流ID**: `veterinary-consultation-workflow`

#### 基础配置
- [ ] 工作流已创建
- [ ] 工作流ID已记录
- [ ] API密钥已记录
- [ ] 工作流已启用

#### 触发配置
- [ ] 触发方式设置为用户触发
- [ ] 输入参数已定义：consultationId, symptoms, petInfo
- [ ] 触发条件已配置

#### 任务配置
- [ ] 任务1：分诊评估 ✅
- [ ] 任务2：症状匹配 ✅
- [ ] 任务3：诊断建议 ✅
- [ ] 任务4：保存病历 ✅
- [ ] 任务5：紧急情况检查 ✅

#### 输出格式检查
- [ ] 输出格式设置为JSON
- [ ] 包含必填字段：`result`, `execution_id`, `status`
- [ ] `result`包含：status, consultation
- [ ] `consultation`包含：id, pet_id, user_id, symptoms, preliminary_diagnosis, recommendations, medication_suggestions, follow_up_required, created_at
- [ ] `preliminary_diagnosis`包含：possible_conditions, confidence_score, urgency
- [ ] `recommendations`为数组，包含type, description, priority, timeline
- [ ] `medication_suggestions`为数组，包含name, type, dosage, frequency, duration
- [ ] 枚举值符合规范（urgency: low/medium/high/urgent, type: home_care/vet_visit/emergency）
- [ ] 日期时间格式符合ISO 8601标准

#### 配置文件填写
- [ ] `workflows-config.json`中`workflow_id`已填写
- [ ] `workflows-config.json`中`workflow_key`已填写
- [ ] `workflows-config.json`中`enabled`设置为true

#### 测试验证
- [ ] 测试分诊评估功能
- [ ] 验证症状匹配准确性
- [ ] 测试诊断建议生成
- [ ] 验证紧急情况识别

---

## 三、通用检查项

### 1. 配置文件一致性
- [ ] 所有智能体ID与Dify平台一致
- [ ] 所有工作流ID与Dify平台一致
- [ ] 所有API密钥已正确填写
- [ ] 所有enabled状态正确设置

### 2. Dify平台配置
- [ ] Dify基础地址正确：`http://47.113.151.36//v1`
- [ ] API密钥权限正确
- [ ] 智能体和工作流状态为"已发布"
- [ ] 知识库已正确关联

### 3. 输出格式验证
- [ ] 所有输出为有效JSON格式
- [ ] 必填字段全部包含
- [ ] 枚举值符合规范
- [ ] 日期时间格式正确
- [ ] 数字格式正确

### 4. 集成测试
- [ ] 智能体调用测试通过
- [ ] 工作流触发测试通过
- [ ] 数据解析测试通过
- [ ] 错误处理测试通过

### 5. 文档完整性
- [ ] 已阅读 [DIFY_OUTPUT_FORMAT.md](../config/DIFY_OUTPUT_FORMAT.md)
- [ ] 已阅读 [config/README.md](../config/README.md)
- [ ] 已阅读 [STARTUP_GUIDE.md](./STARTUP_GUIDE.md)
- [ ] 配置变更已记录

---

## 四、常见问题排查

### 智能体调用失败
1. 检查智能体ID是否正确
2. 检查API密钥是否有效
3. 检查智能体是否已发布
4. 查看Dify平台日志

### 工作流触发失败
1. 检查工作流ID是否正确
2. 检查触发条件是否满足
3. 检查输入参数格式
4. 查看工作流执行日志

### 输出格式错误
1. 检查JSON格式是否正确
2. 验证必填字段是否完整
3. 检查枚举值是否规范
4. 验证日期时间格式

### 数据解析失败
1. 检查输出格式是否符合规范
2. 验证字段名称是否正确
3. 检查数据类型是否匹配
4. 查看后端日志

---

## 五、完成确认

完成所有配置和测试后，请在下方确认：

- [ ] 所有智能体配置完成
- [ ] 所有的工作流配置完成
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] 备份已创建

**配置完成日期**：____________________

**配置人员**：____________________

**审核人员**：____________________

---

## 六、后续维护

- [ ] 定期检查智能体性能
- [ ] 定期更新知识库
- [ ] 监控工作流执行状态
- [ ] 收集用户反馈
- [ ] 优化输出格式

---

**重要提示**：
1. 请严格按照 [DIFY_OUTPUT_FORMAT.md](../config/DIFY_OUTPUT_FORMAT.md) 中的格式要求配置
2. 完成配置后务必进行充分测试
3. 保留配置备份以便快速恢复
4. 定期检查和更新配置

如有问题，请参考项目文档或联系技术支持。
