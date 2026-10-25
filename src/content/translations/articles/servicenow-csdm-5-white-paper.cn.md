---
title: "ServiceNow 发布 CSDM 5"
excerpt: "2025 年 5 月 8 日，ServiceNow 发布了备受期待的通用服务数据模型（Common Service Data Model，CSDM）5 白皮书。这份长达 63 页的文档标志着该数据模型的一次重大演进，而全球众多 IT 组织的 ServiceNow 实施正是以这一数据模型为基础。CSDM 5 引入了"
source: "9bd5d70b78a9e775"
---

2025 年 5 月 8 日，ServiceNow 发布了备受期待的[**通用服务数据模型（Common Service Data Model，CSDM）5 白皮书**](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf)。这份长达 63 页的文档标志着该数据模型的一次重大演进，而全球众多 IT 组织的 ServiceNow 实施正是以这一数据模型为基础。

**CSDM 5 引入了经过优化的结构，由七个域组成**，每个域代表一个核心能力领域：  

  
2.  构想与战略（Ideation & Strategy）
  
4.  设计与规划（Design & Planning）
  
6.  组合管理（Manage Portfolio）
  
8.  构建与集成（Build & Integration）
  
10.  服务交付（Service Delivery）
  
12.  服务消费（Service Consumption）
  
14.  基础（Foundation）
  

  
与四年前发布的上一版 CSDM 4 相比，更新后的模型在概念和结构上带来了多项改进。以下是十大值得关注的变化概要：  

  
2.  **数字产品组合（Digital Product Portfolio）** 与 IT4IT 3.0.1 标准一样，CSDM 现在将应用、服务和产品统一视为受管数字产品组合中的要素，强调生命周期归属和价值交付。
  
4.  **新增域：构想与战略** 新引入了一个支持战略规划的域。它扩展了需求管理（Demand Management），将其与战略目标、业务计划和投资优先级相关联，从而为构建与集成域中的交付工作流提供起点。
  
6.  **增强的 CMDB 结构** CMDB 现在被划分为服务（Services）、服务产品（Service Offerings）、服务实例（Service Instances）、服务交付网络项（Service Delivery Network Items）和动态 CI 组（Dynamic CI Groups），各自承担更加明确的角色。
  
8.  **服务实例定义的扩展** 除应用服务（Application Services）外，服务实例现在还涵盖数据、网络、连接、设施和运营流程等类型。这些服务实例可以分层组合，以实现可组合性和可追溯性。
  
10.  **服务交付网络概念** 服务交付网络（Service Delivery Network）是涵盖众多 CMDB 类的新总称，代表支撑服务实例的全部配置项。
  
12.  **动态 CI 组** 现在可以根据查询条件对 CI 进行动态分组，从而可以在组级别记录事件、问题和变更，简化运营流程。
  
14.  **生命周期状态取代运营状态** 传统的安装/运营状态正逐步转向基于生命周期的状态和阶段。CSDM 5 对这些生命周期定义给予了相当多的关注。
  
16.  **命名与术语全面调整** 若干工件已被重命名，以更好地体现其功能。虽然新名称可能较长，但预计在 UI 列表和表单中会以缩写形式显示。
  
18.  **AI 也被提及（理所当然）** CSDM 5 确实提到了人工智能，但阐述极少，为解读和未来的完善留出了空间。
  
20.  **基础层扩展** 基础层现在包括产品功能（Product Features）、软件物料清单（SBOM）和价值流（Value Streams），这体现了与 IT4IT 标准更紧密的对齐。
  

  
CSDM 5 与 The Open Group 的 IT4IT 3.01 标准保持一致，尽管二者在描述相似概念时使用的词汇略有不同。例如，IT4IT 的价值链“规划（Plan）”“构建（Build）”“交付（Deliver）”和“运行（Run）”与 CSDM 的各个域相似。希望在 IT 财务建模方面获得更多指导的人，在 CSDM 5 中找不到相关内容，在 IT4IT 3.0.1 中也同样如此。不过，可以将技术业务管理（TBM）分类法 4.0/5.0 的数据/定义映射到 CSDM 上。

虽然该文档的发布时间（恰在 ServiceNow Knowledge 2025 大会之前）显得有些仓促，但其中确实包含了有价值的见解。话虽如此，文档中也存在一些缺漏和不一致之处，这表明后续版本可能会出现一些小的更正或澄清。

**后续步骤：**

CSDM 5 是重要的一步，尤其对于与 IT4IT 及开放 IT 架构框架保持一致的企业而言。然而，那些一直在等待面向**企业服务管理（IT4ESM）**的通用服务数据模型的人，还需要再耐心等待一段时间。

ServiceNow 已在着手制定 CSDM 5+ 草案，其中包含粒度更细的数据模型，具有更多的工件/关系。展望 CSDM 6（预计于 2026 年发布），我们可以期待其在 AI（尤其是智能体）方面提供更有力的建模指导，并更清晰地将 CSDM 工件映射到运营实践。

如果 ServiceNow CSDM 在未来几年内进一步扩展，以涵盖企业服务管理（ESM）、客户服务管理（CSM）、现场服务管理（FSM）和客户关系管理（CRM），我不会感到意外。

**CSDM 5 实施/集成场景**

我绘制了下图，用以说明如何将 ServiceNow 通用服务数据模型（CSDM 5）与 ITSM 流程（特别是事件管理、问题管理和变更管理）以及 ServiceNow 中的 ITAM（资产管理）结合应用。在该模型中：  

  
-   ITSM 流程工件始终关联到一个**技术服务产品（Technical Service Offering）**，以及呼叫人、位置和分派组等**基础数据**。
  
-   根据服务产品的性质，还可能记录对服务实例、动态 CI 组或服务交付网络项的额外引用。
  

  
为确保准确性和可扩展性，推荐的模型以**零接触 CMDB（zero-touch CMDB）**为前提，即配置项（CI）、资产及其依赖关系均通过自动发现或联合获取，无需在 ServiceNow 中进行人工干预。我预计到本十年末，大量服务交付网络信息将由 **AI 智能体**提供，逐步取代（和/或丰富）目前使用的传统每日发现和联合机制，**使零接触 CMDB 成为准确的实时虚拟数据源。**

目前，大多数公司已在 CSDM 的**服务交付**域中使用请求管理（Request Management），而**服务消费**域在很大程度上仍有待探索。随着 IT4IT 演进为 IT4ESM（面向**企业服务管理**的 IT），服务消费域将变得越来越重要。它将使**业务服务（Business Services）**和**业务服务产品（Business Service Offerings）**不仅能够关联到员工请求和案例，还能关联到服务于 IT、人力资源、工作场所设施、财务、法务、风险、业务连续性、合规和安全管理等领域的 AI 智能体。

**参考资料：**  

  
-   ServiceNow，“[通用服务数据模型（CSDM）5 白皮书”](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf)
  
-   ServiceNow “[CSDM 文档门户”](https://csdm.servicenow.com)
  
-   The Open Group [IT4IT 标准，3.0.1 版](https://pubs.opengroup.org/it4it/3.0.1/standard/)”
  
-   TBM Council [技术业务管理（TBM）分类法 4.0](https://higherlogicdownload.s3.amazonaws.com/TBMCOUNCIL/c15d372f-9951-46c8-9c3f-213c696401b6/UploadedImages/TBM_Taxonomy_V4_0.pdf)（PDF）
  

![](/wp-content/uploads/2025/05/CSDM_5_final_may_2025-scaled.png)
