---
title: "何必重复造轮子？在 CSDM 5.0 数据模型中使用 TBM 5.0 的内容"
excerpt: "ServiceNow 定义了一个不含内容的通用服务数据模型（Common Service Data Model，CSDM5）。TBM Council 则同时定义了数据模型（TBM5）及其内容。本文介绍如何将 TBM5 的内容填充到 CSDM5 中。TBM5 定义/描述了以下各类工件（及其之间的关系）："
source: "c414da852c1bc012"
---

ServiceNow 定义了一个不含内容的通用服务数据模型（Common Service Data Model，CSDM5）。TBM Council 则同时定义了数据模型（TBM5）及其内容。本文介绍如何将 TBM5 的内容填充到 CSDM5 中。

![](/wp-content/uploads/2025/08/TBM5-600x281.png)

TBM5 定义/描述了"Technology Consumers"（技术消费者，谁？）、"Technology Solutions"（技术解决方案，什么？）、"Technology Resource Towers"（技术资源塔，如何？）和"Technology Cost Pools"（技术成本池，多少？）等工件（及其之间的关系）。您可以[**免费下载 TBM 5.0。**](https://www.tbmcouncil.org/learn-tbm/resource-center/the-tbm-taxonomy-5/)

CSDM5 同样定义/描述了谁、什么、如何以及多少，但其重点更多在于 ITSM/ITOM，而非 ITAM/ITFM。CSDM5 为"Ideation & Strategy"（构想与战略）、"Design & Plan"（设计与规划）、"Build & Integration"（构建与集成）、"Service Delivery"（服务交付）、"Service Consumption"（服务消费）和"Foundation"（基础）等域定义/描述了工件（及其之间的关系）。CSDM5 区分基线（例如 Products、Components、Models、Services 和 Offerings）与实例（例如 Service Instances、Configuration Items 和 Assets）。您可以[***免费下载 CSDM 5.0***](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiMzcSloaaPAxVKgP0HHaDLKu4QFnoECCEQAQ&url=https%3A%2F%2Fwww.servicenow.com%2Fcommunity%2Fs%2Fcgfwn76974%2Fattachments%2Fcgfwn76974%2Fcommon-service-data-model-kb%2F744%2F3%2FCSDM%25205%2520w%2520links.pdf&usg=AOvVaw1wlx0sDj-JFaye_6EnN2v1&opi=89978449)

考虑因素与约束条件

将 TBM6 内容映射到 CSDM5 模型时，需要考虑以下几点：

-   **TBM5 Technology Consumer****s**（技术消费者）被定义为实体，CSDM5 将其归类为 **Foundation Artifacts**（基础工件）。TBM5 中的 Capabilities 是组织实体，而非技术/功能能力；后者在 TBM5 中被描述为解决方案。TBM5 实体分布在 ServiceNow 的多个 CSDM5 基础表中，这些表中的数据来自权威数据源（例如 ISO-3166 国家/大洲、ISO-3166-2 省/州、语言、货币、时区、公司、部门、业务单元、员工等）。
-   ServiceNow 可以管理不同类型的 **CSDM5 Digital Portfolios**（数字组合），例如应用组合、服务组合、服务实例组合或项目/需求组合。每种组合类型可以包含多个组合，每个组合都有各自的组合负责人（Portfolio Owner）。每个组合都是数字组合的一部分。
-   CSDM5 定义了三种 **Catalogs**（目录）：服务目录（Service Catalog）、产品目录（Product Catalog）和销售目录（Sales Catalog）。服务目录包含所提供并可供消费的、不带版本的服务。产品目录包含已（或将要）获准部署的主版本产品（可能带有次版本组件）。销售目录包含员工可以订购/申请的条目（及其变体）。TBM5 没有定义上述任何目录，因此无从映射。
-   **TBM5 Solutions**（解决方案）是一组与产品无关的条目，CSDM5 将其定义为 Capabilities（能力，属于基线）。TBM5 白皮书提到了资产和配置项（实例），但并未为其提供内容。也就是说，**只能将 TBM5 中基线/模型的内容映射到 CSDM5 表中。**
-   CSDM5 与 ServiceNow 的 **CMDB 类模型**保持一致，该模型包含约 1400 种可能出现在 IT 环境中的配置项类型/类。每个实例资产/CI 只关联一个 CMDB 类、一个基线模型、一个模型类别和一个父模型类别。ServiceNow 中的产品模型保持 ITOM Visibility "发现时"或"联合时"的原样。**TBM5 Technology Resource (Sub-) Towers（技术资源（子）塔）在 ServiceNow 中建模为（父）模型类别。**
-   在 TBM5 中，**Service Offerings**（服务产品）是特定于产品的。然而在 CSDM5 中，Service Offerings 是 Services 的变体，而 Services 是（或者更确切地说：应当是）与产品无关的。
-   CSDM5 定义了 **Service Instances**（服务实例），即可以"作为服务（的一部分）"提供的配置项。Service Instances 可以与 Service Offerings 建立多对多关系。**Service Instances 是事件或变更中最常引用的 CI。** 例如"Workday \[Production\]"或"SAP Business Warehouse \[EMEA, Production\]"。

### 全局视角

本文重点介绍如何将 TBM5 的"Solutions"映射到 CSDM5，尽管您或许也可以将 TBM5 的"Technology Resource Towers"和"Cost Pools"映射到 ServiceNow，例如在您已采购 ServiceNow 的"IT Asset Management"、"IT Financial Management"、"Strategic Portfolio Management"应用的情况下，而 CSDM5 对这些方面的支持很少。

下图展示了 CSDM5 工件（及其之间的关系），以及 TBM5 内容如何映射到 CSDM5。

-   与产品无关的 Solution Types（解决方案类型）对应 CSDM5 的 Level-0 业务能力
-   与产品无关的 Solution Categories（解决方案类别）对应 CSDM5 的 Level-1 业务能力
-   与产品无关的 Solution Names（解决方案名称）对应 CSDM5 的 Level-2 业务能力

-   特定于产品的 Solution Offerings 对应 CSDM5 的业务应用（Business Applications，一个应用可以提供零个或多个能力），或对应以服务形式提供的技术产品（例如"Azure Cloud"）
-   特定于产品的 CSDM5 Service Instances 同时关联到 CSDM5 Services 和 CSDM5 Offerings，这些实例特定于部署/环境。

![](/wp-content/uploads/2025/09/TBM5_in_CSDM_V2.png)

### TBM5 Solutions

在 TBM5 中，解决方案既可以是产品，也可以是服务。TBM5 Solutions 分为 6 种类型（3 种业务解决方案和 3 种技术解决方案）。这 6 种类型共包含 32 个类别，这些类别又包含 141 个细粒度的解决方案。

"Workplace"、"Business"和"Share & Corporate"是面向业务的解决方案类型。它们由技术类的"Delivery"、"Infrastructure"和"Artificial Intelligence"解决方案类型提供支持。这些类型在服务组合中建模为分类节点（Taxonomy Nodes）。解决方案类型下的类别则根据解决方案的类型，在 ServiceNow 中建模为业务服务（Business Services）或技术服务（Technical Services）。

"Business"是一种特殊的解决方案类型，企业可以根据自身业务对其进行组织。例如，金融企业对业务解决方案的建模方式可能与零售企业不同。TBM Council 定义了针对特定市场的业务解决方案分类体系，也可以在此使用。

"Enabling Platforms"和"Artificial Intelligence"与 Infrastructure 类似，被视为技术服务。它们为业务服务提供支持，但不属于业务服务的一部分。这样，企业可以采用不同于业务服务的方式来管理/治理技术服务的生命周期。

TBM5 中的 141 个解决方案粒度过细，不适合用作 ServiceNow 中的 Services 或 Offerings。因此，这些解决方案被建模为（业务或技术）能力。这些能力可以关联到业务/技术基线（例如应用、产品、服务或服务产品）。

![](/wp-content/uploads/2025/08/TBM5_Solutions.png)

### 业务能力

-   **1 Workspace（工作空间）**
    -   1.1 客户端计算
        -   1.1.1 自带设备（BYOD）
        -   1.1.2 计算机
        -   1.1.3 移动设备
        -   1.1.4 虚拟客户端
    -   1.2 沟通与协作
        -   1.2.1 协作
        -   1.2.2 沟通
        -   1.2.3 打印
        -   1.2.4 办公效率
    -   1.3 连接
        -   1.3.1 网络接入
        -   1.3.2 远程访问
-   **2 Business（业务）**
    -   2.1 产品管理
        -   2.1.1 产品开发
        -   2.1.2 产品规划
    -   2.2 销售与营销
        -   2.2.1 客户分析
        -   2.2.2 客户销售
        -   2.2.3 营销与广告
        -   2.2.4 销售团队与渠道管理
    -   2.3 制造与交付
        -   2.3.1 库存与仓储
        -   2.3.2 制造
        -   2.3.3 产品交付
        -   2.3.4 服务交付
        -   2.3.5 资源规划
    -   2.4 客户服务
        -   2.4.1 订单管理
        -   2.4.2 客户关怀
-   **3 Shared & Corporate（共享与企业职能）**
    -   3.1 财务
        -   3.1.1 计划与管理会计
        -   3.1.2 收入会计
        -   3.1.3 应收账款
        -   3.1.4 总账会计与报告
        -   3.1.5 项目会计
        -   3.1.6 薪资与工时报告
        -   3.1.7 应付账款与费用报销
        -   3.1.8 资金管理
        -   3.1.9 税务
    -   3.2 人力
        -   3.2.1 招聘
        -   3.2.2 员工调动与离职
        -   3.2.3 劳动力管理
        -   3.2.4 绩效、留任与薪酬奖励管理
        -   3.2.5 福利管理
        -   3.2.6 政策管理
        -   3.2.7 员工发展
        -   3.2.8 员工沟通与员工关系
    -   3.3 供应商与采购
        -   3.3.1 寻源与采购
        -   3.3.2 供应商管理
        -   3.3.3 合同管理
    -   3.4 健康、安全、安保与环境
        -   3.4.1 政策与治理
        -   3.4.2 监督与执行
        -   3.4.3 医疗保健服务
        -   3.4.4 职业安全
    -   3.5 风险、审计与合规
        -   3.5.1 风险管理
        -   3.5.2 违规事件管理与补救
        -   3.5.3 业务连续性规划与管理
        -   3.5.4 审计
        -   3.5.5 调查
        -   3.5.6 档案管理
    -   3.6 法务
        -   3.6.1 法律顾问
        -   3.6.2 案件管理
        -   3.6.3 合同审查
    -   3.7 物业与设施
        -   3.7.1 开发与空间规划
        -   3.7.2 办公空间解决方案
        -   3.7.3 物理安全
        -   3.7.4 运营、维护、维修与改进
        -   3.7.5 车队管理（非物流）
        -   3.7.6 餐饮
    -   3.8 企业传播
        -   3.8.1 利益相关方关系
        -   3.8.2 政府关系
        -   3.8.3 对外传播
        -   3.8.4 社区外联
    -   3.9 可持续发展与 ESG
        -   3.9.1 碳核算与排放报告
        -   3.9.2 ESG 数据集成
        -   3.9.3 供应商可持续性监控
        -   3.9.4 可持续发展绩效仪表板

### 技术能力

-   **4\. Delivery（交付）**
    -   4.1 战略与规划
        -   4.1.1 企业架构
        -   4.1.2 业务解决方案咨询
        -   4.1.3 技术业务管理（TBM）
        -   4.1.4 创新与构想
        -   4.1.5 技术供应商管理
        -   4.1.6 项目群、产品与项目管理
    -   4.2 开发
        -   4.2.1 设计与开发
        -   4.2.2 系统集成
        -   4.2.3 现代化与迁移
        -   4.2.4 测试
    -   4.3 运营
        -   4.3.1 部署与管理
        -   4.3.2 技术服务管理
        -   4.3.3 容量管理
        -   4.3.4 事件管理（Event Management）
        -   4.3.5 作业调度
    -   4.4 支持
        -   4.4.1 应用支持
        -   4.4.2 集中打印
        -   4.4.3 技术培训
        -   4.4.4 服务台
    -   4.5 安全与合规
        -   4.5.1 身份与访问管理
        -   4.5.2 安全意识
        -   4.5.3 网络安全与安全事件响应
        -   4.5.4 威胁与漏洞管理
        -   4.5.5 数据隐私与安全
        -   4.5.6 治理、风险与合规
        -   4.5.7 业务连续性与灾难恢复
    -   4.6 赋能平台
        
        -   4.6.1 应用托管
        -   4.6.2 开发平台
        -   4.6.3 基础平台
        -   4.6.4 消息总线与集成
        -   4.6.5 内容管理
        -   4.6.6 搜索
        
        -   4.6.7 流处理
-   **5\. Infrastructure（基础设施）**
    -   5.1 计算
        -   5.1.1 按需计算
        -   5.1.2 大型机
        -   5.1.3 物理计算
        -   5.1.4 虚拟计算与容器
    -   5.2 数据中心
        -   5.2.1 企业数据中心
        -   5.2.2 其他数据中心
    -   5.3 数据
        -   5.3.1 数据库
        -   5.3.2 分布式缓存
        -   5.3.3 数据管理
        -   5.3.4 数据仓库
        -   5.3.5 数据分析与可视化
    -   5.4 网络
        -   5.4.1 域名解决方案
        -   5.4.2 互联网连接
        -   5.4.3 负载均衡
        -   5.4.4 虚拟专用网络
        -   5.4.5 数据网络
        -   5.4.6 语音网络
    -   5.5 存储
        -   5.5.1 文件与对象存储
        -   5.5.2 备份与归档
        -   5.5.3 网络存储
        -   5.5.4 分布式存储（CDN）
-   **6\. Artificial Intelligence（人工智能）**
    -   6.1 智能体（Agentic）
        -   6.1.1 自主导航
        -   6.1.2 自主工作流智能体
        -   6.1.3 智能流程自动化（IPA）
    -   6.2 生成式
        -   6.2.1 图像与视频生成
        -   6.2.2 语音、音乐与音频生成
        -   6.2.3 合成数据生成
        -   6.2.4 文本生成
    -   6.3 解释式
        -   6.3.1 计算机视觉
        -   6.3.2 文档处理
        -   6.3.3 自然语言处理
        -   6.3.4 语音识别与处理
    -   6.4 预测式
        -   6.4.1 预测分析
        -   6.4.2 风险评分
    -   6.5 规范式
        -   6.5.1 自动化规划与调度
        -   6.5.2 决策优化
        -   6.5.3 推荐服务
