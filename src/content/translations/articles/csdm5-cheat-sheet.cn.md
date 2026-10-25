---
title: "CSDM5 速查表"
excerpt: "CSDM5 是一个总能引发有趣讨论的数据模型，因为每个角色（persona）都会从自己的视角来看待它。如果严格遵循 CSDM5 对各类工件（artefact）的定义和设计意图，这份速查表可以帮助您明确各项内容应该归入何处。"
source: "b9918cf4d921fb88"
---

CSDM5 是一个总能引发有趣讨论的数据模型，因为每个角色（persona）都会从自己的视角来看待它。如果严格遵循 CSDM5 对各类工件（artefact）的定义和设计意图，这份速查表可以帮助您明确各项内容应该归入何处。只要这样做，就几乎无需对表或表之间的关系进行定制。  
  
本速查表通篇适用以下定义/原则：  

-   基线（Baseline）是经过设计、采购或开发并记录在目录中的组合项（portfolio item），例如一款"Volvo V70"。  
    实例（Instance）是已部署/交付的配置项，例如车牌号为 XX-YYY-ZZ 的那一辆独一无二的 Volvo V70。
-   所有基线组合项均由一名业务负责人（Business Owner/Lead）和一名技术负责人（Technical Owner/Lead）负责。  
    所有 CMDB 实例均归属于包含该实例的基线组合项的负责人。
-   "Contains::Contained by"（包含::被包含）关系是父项与子项之间的一对多关系。  
    一个父项可以包含多个子项，但一个子项不能被多个父项包含。
-   "Depends on::depended on by"（依赖::被依赖）关系是父项与子项之间的多对多关系。  
    一个父项可以依赖多个子项，一个子项也可以被多个父项依赖。

![](/wp-content/uploads/2026/02/CSDM5_including_rlation_labels.png)

### Business Application（业务应用，APM 基线）

-   粗粒度的解决方案，作为一个整体进行管理
-   可以隶属于一个（跨领域的）Application Platform（应用平台）
-   支撑零个或多个 Business Capability（业务能力）
-   包含零个或多个 Application Component（应用组件）
-   依赖零个或多个 Service Instance（服务实例）
-   有一名业务负责人（例如部落负责人，tribe lead）
-   有一名技术/IT 负责人（例如技术负责人，tech lead）
-   具有 CIAP 评级和风险概况（Risk Profile），二者均需定期评审
-   由一个领域（Domain，由领域架构师领导）负责架构设计

### Application Component（应用组件，DevSecOps 基线）

-   细粒度、带版本的数字产品组件
-   存储在源代码管理（SCM/IAC）仓库中
-   可通过 CI/CD 流水线部署
-   仅隶属于一个 Business Application
-   包含零个或多个 Service Instance

### Service Instance（服务实例，SPM 实例）

-   用于开发、测试、验收或生产中的一种环境
-   被一个 Technical Mngt Service Offering（技术管理服务产品）包含
-   被一个或多个 Business Service Offering（业务服务产品）依赖
-   被一个或多个 Business Application 依赖
-   依赖一个或多个配置项（Configuration Item）
-   可以是另一个 Service Instance 的子项

### Dynamic CI Group（动态 CI 组，SPM 实例）

-   用于将作为一个组进行变更/更新的同类基础设施 CI 归为一组
-   始终被一个 Technical Mngt Service Offering"包含"
-   指向一个或多个配置项（基于查询的快照）
-   不能与 Service Instance 或其他 Dynamic CI Group 建立关系
-   也（以其自身的类）包含在 Service Instance 表中

### Service Delivery System，即配置项（CMDB 实例）

-   是数字产品（基线）的一个唯一、可被发现的安装/部署
-   稳定且具有有意义的生命周期（即不是临时性的运行时工件）
-   可以是某个 Application Component 被发现的实例
-   可以与零个或多个配置项建立关系（各种关系类型）
-   可以被一个或多个 Service Instance 依赖
-   可以与一项采购的资产相关联
-   只能通过发现（Discovery）/联邦（federation）创建/更新，不能由人工创建/更新
-   从包含该 CI 的组合项继承受管属性

### Business Service（业务服务，SPM 基线）

-   是一项已定义的服务（位于业务/销售目录中）
-   由内部和/或外部业务用户使用
-   是一个或多个 Business Service Offering 的父项
-   是某一个服务分类（Service Taxonomy）节点/分支下的叶节点

### Business Service Offering（业务服务产品，SPM 基线）

-   是一个（父）服务的子项
-   针对特定产品和/或特定区域
-   具有特定的承诺（SLA）
-   具有特定的订阅/订阅者
-   包含零个或多个 Service Instance
-   包含零个或多个 Dynamic CI Group
-   由一个支持组提供**功能**支持
-   由一个变更组负责变更
-   由一个审批组审批请求/变更

### Technical Mngt Service（技术管理服务，SPM 基线）

-   是一项已定义的服务（位于技术目录中）
-   由一个或多个技术团队和/或 DevSecOps 团队使用
-   是一个或多个 Technology Mngt Service Offering 的父项
-   是某一个服务分类节点/分支下的叶节点

### Technical Mngt Service Offering（技术管理服务产品，SPM 基线）

-   是一个（父）服务的子项
-   针对特定产品和/或特定区域
-   具有特定的承诺（例如 OLA、UC、RTO、RPO 等）
-   具有特定的订阅/订阅者
-   包含零个或多个 Service Instance 或 Dynamic CI Group
-   由一个支持组提供**技术**支持
-   由一个变更组负责变更
-   由一个审批组审批请求/变更

### Hardware Asset（硬件资产，ITAM 实例）

-   是已存放或已安装（或曾经存放或安装）的采购物品
-   由制造商（Manufacturer）生产
-   由供应商（Vendor）在某一日期提供
-   在保修截止日期之前处于保修期内
-   可能受维护协议覆盖
-   可以是某个产品型号（Product Model）的实例
-   具有安装状态以及可以找到它的位置
-   可以与一个通过发现/联邦获得的配置项相关联

### **注意事项/提示：**

-   服务组合管理（SPM）中的 Service Instance 将发现到的 CMDB CI 实例链接/映射到依赖这些 CMDB 实例的基线。  
    理想情况下，SPM 实例及其关系应根据 CI 中的信息或 CI 上的 SVCN 标签自动创建/更新。
-   ChatGPT 以及一些自称 CSDM 专家的人建议按环境创建 Technical Management Service Offering。然而，由于特定环境的 Service Instance 只能被一个技术管理服务产品包含，这很容易导致重复。
-   区分功能维护与技术维护的公司，可以为提供功能支持的团队创建 Business Service Offering，为提供**技术**支持的团队创建 Technical Management Offering，并通过位于二者之间的 Service Instance 将它们关联起来。
-   如果您针对同一应用的不同技术支持级别定义了不同的产品（offering），就会发现无法从多个技术产品到同一个"Application X, Production"Service Instance 创建"contains::contained by"关系。不建议用多个"depends on"关系来替代"contains"关系，因为这样一来，当"Application X, Production"宕机时，就无法再自动确定适用哪个产品。
-   如果您有两个团队，一个负责某个 Business Application 的 EMEA 实例，另一个负责其 NAM 实例，那么从技术上讲，您可以创建不同的 Service Instance：一个用于 EMEA 实例，一个用于 NAM 实例，即使它们是同一个 SaaS 应用。每个团队都应创建自己的服务产品、承诺和订阅。请注意：服务绩效是在产品（offering）层面记录的，而不是在服务实例层面。另请注意：当一个"实例"被报告宕机时，并不意味着另一个实例也会自动被报告为宕机。
-   鉴于上述限制，我建议为每个 SaaS 实例创建一个 Service Instance，并让它被单个 Technical Management Service Offering 包含。此外，您可以创建多个依赖（N:M）该 Service Instance 的 Business Service Offering，每个区域一个产品，各自具有自己的服务时间、承诺和订阅。这样，服务绩效可以记录在业务产品上，而平台绩效和检测到的技术问题则可以记录在包含该服务实例的（唯一一个）技术服务产品中。
-   某些 ServiceNow 模块只会沿上游关系遍历来确定受影响的人员或对象。因此，我总是将发现到的 Web 服务/数据库直接关联到依赖它的 Service Instance。如果我只将服务器与服务实例关联，那么检测到的 DBMS 问题就不会触发该 Service Instance 的故障。尽管如此，也不要做过头，例如把服务器上安装的所有软件包都关联到服务实例。只关联相关的内容即可。
