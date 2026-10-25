---
title: "从业务需求到技术交付"
excerpt: "ServiceNow 的通用服务数据模型（Common Service Data Model，CSDM5）正日益受到 C 级管理层的关注，尤其是因为内容准确、完整的优质 CMDB 被视为实施 DORA、SOx、SOC2 和 Agentic AI（智能体 AI）的关键成功因素。从事"
source: "050c3e01c24c7a5b"
---

ServiceNow 的通用服务数据模型（Common Service Data Model，CSDM5）正日益受到 C 级管理层的关注，尤其是因为内容准确、完整的优质 CMDB 被视为实施 DORA、SOx、SOC2 和 Agentic AI（智能体 AI）的关键成功因素。

从事架构、DevOps、SecOps、风险和安全工作的人员往往使用不同的标准（ISO 27.000、ISO 85.000、ITIL5、TOGAF）及相应的定义。我们将 CSDM5 与基于 ArchiMate/TOGAF 的分层视图相结合，用以描述构成企业典型 IT 环境的服务交付系统（Service Delivery Systems），并使其可用于企业服务管理（Enterprise Service Management，ESM）。

### 以下是我们用于统一各种"语言"的定义：

  
**业务应用（Business Applications）**是面向业务的解决方案，用于支撑业务能力、业务流程或业务服务。它们通常由应用、Web、集成和数据资源（Resources）组成，部署在一个或多个中间件平台上。除内部开发的解决方案外，员工、客户和合作伙伴还可能使用其他托管的面向业务的解决方案和数字服务，或将其与其他服务集成。这些解决方案同样登记为业务应用。

第三方**软件即服务**（SaaS）解决方案也登记为业务应用，即使企业对支撑这些解决方案的底层资源、基础设施或平台组件了解有限甚至毫无可见性，且合规由供应商自行负责。SaaS 解决方案按定义即以服务形式提供，并须遵守其书面合同承诺。架构师在架构资源库（Architecture Repository）中对企业应用与 SaaS 解决方案之间的接口进行建模。

**资源（Resources）**代表 **SDLC 应用组件**（经过设计、构建、测试和集成的子系统）的稳定且可发现的实例。组件通常存储在源代码仓库中，并常常通过 CI/CD 流水线进行部署。DevOps 编排和可观测性（Observability）工具负责管理/监控其行为。

**中间件（Middleware）**指为应用和资源提供运行时服务的软件，通常运行在物理或虚拟节点（Nodes）上。示例包括 Web 服务器、应用服务器、数据库服务器、集成平台、消息平台和编排平台。

**服务实例（Service Instance）**代表业务应用的每一次部署。通常会为开发、测试、验收和生产环境分别创建独立的服务实例，从而使每个部署都能被单独管理、监控，并独立地与其所依赖的技术栈建立关联。

**办公/生产力服务（Workplace/Productivity Services）**（PC、手机、平板电脑等）登记为服务产品（Service Offerings），而不是业务应用。部署在终端用户设备上的软件通过资产（Assets）、软件安装（Software Installations）和软件许可（Software License）记录进行管理。

**环境/通道（Environments/Streets）**是通常彼此隔离的 IP 域，用于特定用途或面向特定受众。例如，部署在测试环境中的节点（及其上运行的内容）不能与部署在生产环境中的节点（及其上运行的内容）进行交互。有些企业还会使用按客户/区域划分的通道。

**资源、中间件、节点及其依赖关系（在 CSDM5 中称为"服务交付系统"）会被自动发现，并自动登记/更新到 CMDB 中。**这些配置项（CI）与依赖它们的服务实例相关联并建立映射，从而为已部署的解决方案架构提供端到端的可见性。

任何"以服务形式"提供的能力都由**服务产品（Service Offering）**来表示。示例包括应用服务、中间件服务、基础设施服务、办公服务和企业职能服务。服务产品可以按环境、区域或地点区分。每个服务产品都定义了其相关的承诺、订阅、支持联系人、所有权和服务预期。

![](/wp-content/uploads/2026/06/ZERO-TOUCH-CMDB-Class-Model.png)

仅供 IT 内部使用的**对外提供的服务（Offered Services）**归类为**技术管理服务（Technology Management Services）。**供业务用户、客户或外部方使用的服务则归类为**业务服务（Business Services）**。

**基础数据（Foundational Data）**是在多个实践中共享的信息。服务、服务产品、应用、动态 CI 组（Dynamic CI-Groups）和设备通常会引用基础数据，例如用于记录资产所有者、资产使用者、IT 组、联系人、订阅者、客户、供应商、流程模型、产品模型等。

数以千计的 **SDLC 应用组件**通常从包含它们的应用/解决方案继承基础数据引用。应用的风险评级同样适用于该应用所包含/使用的组件和实例。  

### **零接触 CMDB（ZERO-TOUCH CMDB）**

  
在该模型中，资源、中间件和节点不得由人工在 CMDB 中创建或更新。它们只包含技术层面的实际情况，以及通过自动发现获得的关系、名称和属性值。对基础数据的引用通常无法通过技术手段发现。正因如此，在这种 CSDM 解读中，CMDB 中的 CI 必须始终直接或间接地关联到某个应用和/或服务产品，而这些应用和服务产品包含诸如"业务负责人（Business Owner）"、"IT 负责人（IT Owner）"、"支持组（Support Group）"、"变更组（Change Group）"、"CAB 组（CAB Group）"、"地点（Location）"、"组织（Organization）"等引用属性。组织可以采用传统的"公司 => 业务单元 => 部门"结构，也可以采用现代敏捷的"部落/ART => 集群/分会（Cluster/Chapter）==> DevSecOps 团队/小队（Squad）"结构。

![](/wp-content/uploads/2026/06/CSDM5-incl-Relation-Labels.png)
