---
title: "Change Management 与 CSDM5"
excerpt: "ServiceNow 在 Zurich 版本中提供的开箱即用（Out-of-the-Box）Change Management（变更管理）流程是 ITIL V3 的一种变体。本文详细介绍如何利用 CSDM5 推荐的关系配置变更流程，使其与 DevSecOps 无缝协作。配置完成后，用户无需成为数据分析师"
source: "184773c52b995380"
---

ServiceNow 在 Zurich 版本中提供的开箱即用（Out-of-the-Box）Change Management（变更管理）流程是 ITIL V3 的一种变体。本文详细介绍如何利用 CSDM5 推荐的关系配置变更流程，使其与 DevSecOps 无缝协作。配置完成后，用户无需成为数据分析师，即可按预期在变更管理中使用 CSDM 数据。用户只能选择属于变更管理范围内的 Service、Offering、Instance 和 CI，从而确保变更管理流程只管理和沟通相关的变更。

推荐的配置基于以下前提：

1.  业务架构和 IT 架构由架构师和业务分析师定义并治理。
2.  公司采用敏捷 DevSecOps 实践构建解决方案，使用 SCM 工具登记（带版本的）代码，并使用 CI/CD 流水线进行集成和部署。
3.  DevSecOps 团队使用多种工具来观测和编排运行环境，并检测漏洞和安全事件。
4.  应用和基础设施以服务的形式提供。Service、Service Offering 和 Service Instance 通过 Digital Portfolio Management 进行记录。
5.  已采购、已接收、已存储、已安装或已淘汰的物理资产的位置和状态通过 Asset Management（资产管理）进行记录。
6.  稳定的配置项（CI）每天进行发现和联合。清单及其更新会自动记录到零接触（Zero-touch）CMDB 中。
7.  服务降级（无论是报告的还是检测到的）会得到解决和沟通；请求会得到履行；支持和知识会得到提供。

公司希望**使用 Change Management 来管理/控制服务提供商或供应商将增量发布到生产环境的风险和影响**。  
变更管理流程始于一项发布潜在增量的请求。当确认增量已在生产环境中正常运行时，变更即告关闭。

有些方面**与 ITIL3/4 实践略有不同**：

-   变更请求可以由 DevSecOps 工具发起，而不是直接由人工请求者提出。
-   通过 CI/CD 工具发布到生产环境的部分内容不再需要变更审批。  
    出于可见性考虑，此类发布仍必须（作为 Standard change，标准变更）进行记录。
-   经编排的配置更新不再受变更管理的治理。
-   DevSecOps 工具可以查询所请求的生产发布是否已获批准。
-   CMDB、资产或组合项的更新不由（或不再由）变更触发/管理。
-   在基础设施中发现的变化可用于验证变更是否已成功发布。

在开箱即用的情况下，用户可以提出变更请求，将其关联到某个 Service、Service Offering 和 CI，并将其分配给任意分配组。**CSDM 工件之间的关系既不会被校验，也不会被强制执行。**对于哪些项可以与变更关联，没有任何限制。建议进行以下几项配置调整：

**变更必须（强制）关联到一个 Service Offering。**（初始）分配组、审批组和 Technical Mgmt Service 均从 Service Offering 推导而来。有些公司希望展示 Offering 与其父 Service 之间的历史关系（通过在变更中填写 service 属性）；另一些公司则希望展示其与当前父 Service 的关系（通过在表单上显示该 Offering 当前的父项）。对于拥有数百个 Service Offering 且未使用订阅（subscription）的公司，用户可能难以轻松找到/选择正确的 Offering。对于这类公司，建议进行少量定制：在选择 Service Offering 时，用户可以输入服务名称的一部分或分类节点名称的一部分，从而轻松选择合适的 Offering。例如，当用户输入“\*server”时，系统会显示名称中包含“server”的所有节点、服务和服务产品。

对于使用 CSDM5 的公司，我通常建议：创建与产品无关的 Technology Mgmt Service；每个 Service 下设一个或多个特定于产品的 Service Offering；每个 Service Offering 下设一个或多个特定于产品和环境的 Service Instance。Service Instance 可以关联到其所依赖的配置项。从技术上讲，可以查询 Service Offering 包含哪些生产 Service Instance，以及这些 Service Instance 关联了哪些配置项。  

如今，**我建议在变更记录的一个自定义属性中登记受影响的生产 Service Instance**。当同一产品的多个生产实例独立运行时，这一点尤其有用。SaaS 实例通常不依赖于公司的 CI 堆栈。如果公司拥有同一 SaaS 产品的多个独立 SaaS 实例，那么唯一能区分它们的就是 Service Instance。另一个积极的附带效果是：在同一个变更属性中，还可以登记由该 Service Offering 包含的 Dynamic CI Group（Dynamic CI Group 记录在 Service Instance 表中同样可见）。如果用户选择了某个 Dynamic CI Group，则该 CI Group 即为所选 CI，用户不应再能选择其他 CI。该组中的 CI 将自动添加到变更表单上列出受影响 CI 的相关列表中。

如果 Service Instance 属性填写的是生产 Service Instance，用户就可以选择该实例所依赖的 CI，即使该 CI 在被发现时并未带有其角色或环境信息。也就是说，如果有人将某台服务器关联到某个生产 Service Instance，就可以针对该服务器提出变更。如果该服务器未与任何生产 Service Instance 关联，则无法通过 Service Instance 针对它提出变更。

如果 Service Instance 属性留空，用户可以选择一个未直接关联到 Service Instance、但与所选 Service Offering 相关的 CI。例如，如果针对 Service Offering“Windows Server”提出变更，用户应能选择 Windows Server 类/表中任何未退役的记录。理想情况下，用户只能选择用于生产的 CI。话虽如此，有些网络和存储 CI 同时用于开发、测试、验收和生产环境，必须能够针对这些 CI 提出变更，以便识别潜在的生产影响。如果公司有许多不包含 Service Instance 或 Dynamic CI Group 的 Offering，建议在 Service Offering 记录中登记/维护 CI 筛选条件。

通过为相关的 Service Offering 定义订阅，可以确保只有经授权的人员才能针对这些 Service Offering 及其关联的 Service Instance、Dynamic CI Group 和相关 CI 提出变更。

通过仅允许对与生产 Service Instance 直接相关的配置项进行变更，公司可以在整个企业范围内推动以数据为驱动的统一性和一致性。通过选择同类 CI，影响分析和报告得以大大简化，CAB（变更咨询委员会）也能更好地理解其所做的决策。

CMDB 将包含细粒度的 CI，例如网站、数据库表、已安装软件、TCP 端口，以及这些项之间的依赖关系。这些数据还将用于自动化的风险/影响分析，并可供 NOW Assist（AI）使用，同时不会使变更流程过于复杂。  
  
理想情况下，相关 CI 会自动关联到依赖它们的 Service Instance。这可以通过自动识别 CI 之间的依赖关系来实现。例如，如果某个网站使用某个数据库中的数据，那么与该网站关联的 Service Instance 很可能也依赖于该数据库。有些公司只将服务器关联到 Service Instance；另一些公司会将这些服务器上的关键 CI 关联到 Service Instance；还有一些公司则两者兼而有之。本文所述的理念在技术上并不限定公司将哪些内容关联到其 Service Instance。话虽如此，出于多方面原因，建议每个 Service Instance 关联的 CI 不超过 8 个。  
  

## 变更验证

变更部署完成后，必须先验证其已正确部署，才能关闭变更。有些公司使用 Agent Client Collector 实时发现正在运行的内容，从而能够立即查看变更是否已正确部署。另一些公司每天只对基础设施进行一次发现，需要等到第二天利用 CMDB 数据验证变更后，才关闭变更。还有一些公司会在关闭变更前手动验证变更是否已正确部署。每种方法都各有利弊。从业务和风险的角度来看，明智的做法或许是在部署变更后立即验证业务功能，稍后再通过发现来更新 CMDB。有条件的公司不妨在变更窗口关闭后，立即对与该变更相关的项运行/触发一次临时发现。  
  
也就是说，并不是 CMDB 不再通过变更进行更新，而只是改用一种更现代、能够带来一致结果的方式来完成。
