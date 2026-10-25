---
title: "CSDM 5 建模是否过度了？"
excerpt: "ServiceNow 发布了一份包含 132 张幻灯片的 PowerPoint 演示文稿，举例说明如何按照 CSDM 5 对 IT 环境进行建模。尽管我总体上非常喜欢 CSDM，但有些人在 ServiceNow 中为其 IT 环境建模时似乎做得过头了。让我们"
source: "7d32fdda2aa10f19"
---

ServiceNow 发布了一份[**包含 132 张幻灯片示例的 PowerPoint 演示文稿**](https://learning.servicenow.com/nowcreate?id=nc_asset&asset_id=90b0eaca879dae106838fd16dabb3502&nc_source=copy_asset_link)，说明如何按照 CSDM 5 对 IT 环境进行建模。尽管我总体上非常喜欢 CSDM，但有些人在 ServiceNow 中为其 IT 环境建模时似乎做得过头了。我们来看一个例子：**如何（不）在 CSDM 5 中对 ServiceNow 平台进行建模。**

ServiceNow 平台被不同类型、不同规模、不同成熟度的公司用于不同的事情，使用者各不相同，所处文化也各不相同，而且这些公司往往同时采用多种流程框架。CSDM 有助于对数据进行结构化和治理，但它并不是一个放之四海而皆准的模型。此外，CSDM 仍在不断演进。CSDM 5 已经比它的前几个版本好得多。但与分别发布于 4 年前和 6 年前的前几个版本相比，第 5 版要复杂得多，也更容易产生不同的解读。

例如，CSDM 5 现在包含服务组合（Service Portfolio，DPM）、分类节点（Taxonomy Node，DPM）、价值链（Value Chain，Foundation）、项目组合（Project Portfolio，SPM）、业务单元（Business Unit，Foundation）以及顶层业务能力（Top-level Business Capability，SPM）。每个群体都有/使用各自的工件。并不是每个人都会阅读 CSDM 5 白皮书，或遵循其中的定义和建议。平心而论：CSDM 本身就留有相当大的解读空间。因此，很多公司在全部 6 种工件中都填入相同的“HR”“IT”“Risk”“Finance”“Legal”“Supply Chain”“Marketing”“Sales”和“CRM”值；另一些公司则在这 6 种工件中各填入不同的值；还有些组织则希望照顾到任何人可能提出的每一个例外或偏好。

**我建议按照工件的设计用途来使用它们，尽可能复用，并保持 IT 简单。** 此外，我推崇一种分层模型：客户与公司开展业务往来；业务（及其用户）由集成化、受管理的解决方案提供支持；而这些解决方案则由通用化的技术塔（Commodity Technology Tower）提供支持。

我通常建议区分应用组合（Application Portfolio）、组件组合（Component Portfolio）、项目/项目群组合（Project/Program Portfolio）、技术服务组合（Technical Service Portfolio）和业务服务组合（Business Service Portfolio）。这些组合中的所有条目都应关联到相关的基础工件，例如该条目所属的价值链、业务单元、部门、公司、区域、国家、地点、所有者和组。每种类型都可以创建多个组合，但我不建议任何一种类型的组合超过 6–8 个。示例：

1.  一个面向业务应用的应用组合，一个面向 IT4IT 应用/工具的应用组合，以及一个面向桌面/移动应用的应用组合
2.  一个面向 PAAS IT 组件的组件组合，以及一个面向 SDLC IT 组件的组件组合
3.  每个 PAAS/IAAS 技术塔对应一个技术服务组合
4.  每个业务单元对应一个业务服务组合
5.  每个部落（Tribe）或企业领域对应一个项目/项目群组合

尚未定义服务的公司，可以先从“以 SAAS 服务的形式”提供其应用开始。如果这些 SAAS 服务（将会）具有承诺（commitment）、权益（entitlement）、订阅和 SLA，那么可以为每个业务应用创建一个服务产品（Service Offering）。如果您的应用可以有多个（特定于环境/地点的）服务产品，则可以选择将该应用注册为一个服务。不建议将每个桌面/移动应用都注册“为一个服务”。

服务组合中的每个服务都属于一个分类节点，并由一位负责的服务所有者（Accountable Service Owner）拥有。业务服务组合不应特定于某个业务应用（应用应放在技术应用组合中）。例如，Workday 位于应用（服务）组合中，而“员工入职、调动与离职支持”位于业务服务组合中，两者都关联到 Workday 生产环境的服务实例（CI）。

依我之见，这些原则不能是特定于某个平台的，而必须在全企业范围内得到认可和执行，因为它们为治理和组织奠定了基础。

## 如何做过头？

在 ServiceNow 针对 ServiceNow 本身给出的示例中，ServiceNow 平台有一条业务应用记录。该 ServiceNow 平台上承载了多个独立的业务应用。哲学家们或许会争辩说，只有当 ServiceNow 由业务部门为业务而使用时，它才算是业务应用。我不是哲学家。我认为 ServiceNow 应用是由业务用户使用的托管解决方案，这就足以为其创建业务应用、业务服务和业务服务产品。

话虽如此，依我之见，业务能力就应该是名副其实的业务能力。也就是说，我认为“管理技术”（Manage Technology）并不是一项业务能力。请记住：业务能力属于 CSDM 5 的“设计与规划”（Design and Planning）领域，它们应在不过度建模的前提下，让人看清哪个业务应用被用于什么用途。对于任何一个业务应用，我期望看到它支持少数几项业务能力；我也期望一项业务能力平均由少数几个业务应用提供。如果每个业务应用都支撑着二十几项业务能力，或者大多数业务能力都只由一个应用提供，那您很可能已经做过头了。

依我之见，把“SN Incident Mgmt”建模为一个业务应用，很容易就构成“做过头”，因为 ServiceNow 平台提供大约 200 项类似于“SN Incident Mgmt”的独特能力。如果为其中每个业务应用都创建特定于环境的服务实例，就会产生 800 个服务实例。这 800 个服务实例中的每一个都需要与平台的某个“Yokohama”实例建立关系。即使您并未使用所有 ServiceNow 应用，依我之见，把 ServiceNow 的各项能力分别建模为业务应用也实在不是个好主意。

业务服务是一组可识别的服务产品集合。“End User Service”这一业务服务，并不是我所预期的由 ServiceNow 平台提供的服务。“SN Incident Mgmt”这一服务产品，也不是我预期会“以服务形式”提供的东西。同样，我会预期“System Monitoring”与可观测性（Observability）相关，而不是与 ServiceNow 相关。

如果您不相信我，尽管把这个模型连同所有工件和所有关系都录入 ServiceNow。然后请审计人员和合规官审查您每一个“应用”的 HLD、DLD、路线图、OKR、BIA/CIA。接着，提交一份资源申请，以解决所有合规发现项。最后，请一位典型的、未经培训的业务用户提交一个问题：“Workday 上的事件被分派给了错误的组”。

## 如何将效率提升 40–60%？

各类组合将按照上文基础部分所述进行设置。

假设 ServiceNow 平台的创新与维护工作是在 ServiceNow 中完成的，我会注册：

-   为 ServiceNow 平台设立一个项目群（Program）（或者根据谁为什么出资，分别为 IT、HR 等各设一个）
-   每个目标与关键结果（OKR）对应一个需求/举措
-   每个需要预算/商业论证且已获批准的需求/举措对应一个项目
-   每个项目、产品按需创建若干用户故事
-   每个 ServiceNow 应用对应一个敏捷 DevOps 产品（见下文）
-   每个 DevOps 团队对应一个组/敏捷看板

我会基于以下内容为整个 ServiceNow 平台建模 CSDM 工件：

### 

-   基础（Foundation，灰色）

-   16 个开箱即用的**价值链**
-   每个 ServiceNow 功能（CMDB、Portal、Mobile App、Virtual Agent、Workspace 等）对应一个**产品功能**（Product Feature）
-   每个由 ServiceNow 支撑的流程（如 INC、PRB、CHG、REQ）对应一个**业务流程**
-   为数据中心设立一个**建筑/地点**
-   一个负责 ServiceNow 的支持、变更、管理及变更审批的**组**
-   一位来自**公司**的**用户**，拥有服务平台及其服务/服务产品；另外为组内每位成员各设一位用户
-   每类相似的硬件/软件产品对应一个**产品型号**（Product Model）

### 

-   设计与规划（Design & Planning，蓝色）

-   每个 ServiceNow 应用（如 ITSM、ITAM、ITOM、CSM 等）对应一项**业务能力**
-   为 ServiceNow 平台设立一个**业务应用**

### 

-   设计与构建（Design & Build，红色）

-   为 Windows 版 JAVA MidServer 设立一个 **SDLC 组件**，每个开发的 AI Agent 也各设一个。（未来）

### 

-   服务交付（Service Delivery，橙色）

-   为企业服务管理（ESM）设立一个**技术/业务服务**（取决于 ServiceNow 是用于业务还是用于技术）
-   为 ServiceNow 平台设立一个**技术/业务服务产品**（假设只有一个团队负责该平台）
-   每种以服务形式提供的 IAAS/PAAS 条目类型对应一个**技术服务产品**
-   每个已部署的 ServiceNow 实例对应一个（应用）**服务实例**（cmbd\_ci\_service\_auto）
-   每个 MidServer 应用实例对应一个**应用**（cmdb\_ci\_app）
-   一台安装在 Windows 服务器上、承载非生产 MidServer 应用的 **JAVA 服务器**（cmdb\_ci\_app\_server\_java），另有一台用于非生产 MidServer 应用。
-   一台用于非生产 MidServer 应用的 **Windows/Linux 服务器**（servers），以及一台用于生产 MidServer 应用的 Windows/Linux 服务器（servers）。
-   每台 Windows/Linux 服务器对应一台**虚拟机**
-   一个承载 Windows/Linux 虚拟机的 **Azure 数据中心**

### 

-   服务消费（Service Consumption，绿色）

-   一个采购服务器、虚拟机等的请求
-   其他示例……

## 理由：

1.  依我之见，事件、问题和变更必须关联到一个服务产品（它决定由谁为该服务产品提供支持），并可选择性地关联到预计出现故障的受影响配置项（它决定可能需要修复什么）。有些 ServiceNow 平台/流程所有者允许在事件中引用部分基础数据（例如地点、公司、业务单元、产品功能、业务流程）。
2.  我建议每个 ServiceNow 实例注册一个服务实例。因此，尽管我知道公司会向 ServiceNow 采购 ITAM、ITOM、ITSM 应用的许可证，也知道 ServiceNow 开箱即用就是一个平台主机（Platform Host），但我并不在 ServiceNow 中按此方式为 ServiceNow 应用建模。相反，考虑到 ServiceNow 提供数十项应用能力，我把这些应用注册为能力。我接受这意味着我无法对单个 ServiceNow 应用进行生命周期管理，但这样做使我能够将业务流程与能力关联起来。最棒的是，上述所有基线只需注册/维护一次，而且整个 ServiceNow 平台只需进行一次 BIA/CIA 评审和一次定期外部审计。
3.  在大型企业中，IT、HR、GRC、SECURITY、LEGAL 和 CSM 通常是各自为政的政治孤岛。我建议在董事会层面解决政治问题，但绝不、绝不建议把相互隔离的孤岛建模到 ServiceNow 中——除非已经签订了不同的 ServiceNow 合同并采用相互隔离的实例，而且总拥有成本对企业而言并非重要因素。在我近 20 年的 ServiceNow 工作经历中，我还没见过任何一份按域/实例隔离的 ServiceNow 合同能够运作良好、高效。大多数 ServiceNow 接口/记录并不特定于某个域；而那些特定于域的，也可以在不进行实例/域隔离的情况下得到保护和管理。
4.  如果 ESM 分散在多个平台上，“企业服务管理”这一服务还可以包含其他服务产品，例如 Apptio、LeanIX 或 MetricStream 平台的服务产品。这也使企业内部可以同时存在多个 ServiceNow 平台（例如在合并多份 ServiceNow 合同期间）。
5.  在研究了 ServiceNow 及其他 AI 平台中 AI 的未来之后，我认为下图所示的方案最适合大型企业。
6.  我也可以把 ServiceNow 插件建模为可部署的 SDLC 组件，但既然 ServiceNow 已经在别处（自费）维护着插件存储库，为什么还要自己再维护一个？ServiceNow Store 应用也是如此。我认为，只需将平台已采购/使用的业务能力按此注册，并将它们与其所支撑/支持的业务流程关联起来即可。
7.  如果您决定将部分 ServiceNow 内容（定期或近实时地）导出到数据库/数据湖，以便他人在不影响 ServiceNow 性能的情况下使用这些数据，那么您还需要对数据库、DBMS（或数据库服务）以及将 ServiceNow 数据联合（federate）到数据库中的工具进行建模。
8.  您可能已经注意到，我没有记录任何 ServiceNow 产品的版本，无论是基线还是实例。我假设 ServiceNow 实例是升级而非替换的。在升级期间（升级不应耗时数月），集成和依赖关系保持不变。如果平台能力在一次重大升级中发生剧烈变化，只需在升级期间对其进行添加/删除/更新即可。话虽如此，任何被自动发现的内容（例如操作系统、JAVA 服务器等）都是带版本的。如需了解每个 ServiceNow 主要版本包含哪些内容，我建议参考 ServiceNow 产品文档和合作伙伴视频。

**顺便问一句：我提过我的“安全港”声明吗 :-)**

## 总结

在使用 CSDM5 的定义和工件为 ServiceNow 建模时，有多种可选方案。我建议采用最高效、同时仍能满足用途并适合受众的方式。依我之见，就是下图所示的方式。

在过去几十年里，我为十几个 ServiceNow 平台搭建过（治理体系），而且——老实说——我并不总是做得很高效，但我从这些经验中吸取了教训。

如果您采纳我的建议，与 ServiceNow 提供的示例相比，您很可能会将受管条目的数量减少 40–60%（并减少 ServiceNow 平台在注册/评审和文档方面的管理开销）。没错，您将无法在 ServiceNow 中登记单个应用的生命周期。但如果只有一个 ServiceNow 平台、一位平台所有者，而且各实例由多个利益相关方共享，这又有什么不好呢？

![](/wp-content/uploads/2025/06/How_to_model_servicenow_in_csdm_5-scaled.png)
