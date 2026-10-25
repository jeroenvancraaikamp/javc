---
title: "CSDM5 与 BusDevSecOps 的交汇"
excerpt: "ServiceNow 的 Common Service Data Model（通用服务数据模型）目前是 IT 管理领域的热门话题。我认识几个人真的尝试读过 CSDM 白皮书；甚至还有专门的 CSDM 培训/认证。这个覆盖面广、高层次、"
source: "a1e38c66cb0f25c4"
---

ServiceNow 的 Common Service Data Model（通用服务数据模型）目前是 IT 管理领域的热门话题。我认识几个人真的尝试读过 CSDM 白皮书；甚至还有专门的 CSDM 培训/认证。CSDM5 覆盖面广、层次高、力求通用，它提供的数据模型可以与贵公司可能采用的众多框架并存。

与 IT4IT 3.0 类似，CSDM 划分了“Ideation & Strategy”（构想与战略）、“Design & Planning”（设计与规划）、“Build and Integration”（构建与集成）、“Service Delivery”（服务交付）、“Service Consumption”（服务消费）和“Manage Portfolio”（组合管理）等域。数据模型中的每个对象都只属于一个域。目前，只有少数公司使用单一平台管理所有域。通常，“Build and Integration”是借助多种特定技术的工具完成的。可观测性、持续集成、持续交付和容器编排越来越多地被视为独立的 DevOps 域。安全响应也日益成为一个独立的域。

上图列出了 Common Service Data Model（CSDM）中最重要的对象，而不论 ServiceNow 规定它们在哪个域中使用/管理。这使得该图更具普适性，无论您采用的是 DevOps、Dev & Ops、DevSecOps、BusDev 还是 BusDevOps（或其变体）。

### CSDM 对象

CSDM 定义了 **Business Application**（业务应用）对象，它可以是一个（逻辑或物理的）产品或服务，支撑零个或多个业务能力/功能。一个应用可以被部署零次或多次。一个应用可以包含若干组件，这些组件既可以独立部署，也可以作为应用的一部分部署。每个 Business Application 都有其生命周期，必须由一个敏捷团队进行管理。其他框架将 Business Application 称为“Solution”（解决方案），但含义完全相同。在 CSDM 中，以服务形式提供的应用软件（SaaS）同样被视为 Business Application。

中间件、云和 IaC 不被视为业务应用，而是技术管理服务产品（Technology Management Service Offering）。所部署的技术项作为基础设施栈/模板的一部分进行部署。

Business Application 和/或 Technology Management Service 的应用栈可以被多次实例化。每个已部署的栈称为一个 **Service Instance**（服务实例）。通常，栈是按环境、技术或地点划分的，或者是这几者的组合。例如，一家公司可能有三个按国家划分的 O365 生产租户，以及一个通用的 O365 测试租户。这样，该公司共有同一个“AD Application”的四个服务实例。有些 Service Instance 并不是栈，而是对同类项的逻辑分组（例如“Windows Servers in NL”和/或“Windows Production Servers”）。

一个栈通常是一组相关项的集合。例如，一个 Java 应用资源托管在 Java 应用服务器上，而该应用服务器运行在一台 Windows 服务器上，依此类推。每一项都作为一个配置项（Configuration Item，CI）单独登记。这些 CI 的集合称为 **Service Delivery System**（服务交付系统，原称 CMDB）**。** 各项之间通过 CI 关系相互关联。如今，手工登记已成为过去；这些项及其关系都是自动发现的，或从可信数据源联合（federate）而来。Service Instance 与其所依赖的顶层 CI 之间（以手动或自动方式）建立关联。

> CMDB 中的配置项存储在按类划分的表中。ServiceNow 拥有 800 多张具有层级结构的 CMDB 表（例如，Windows Server 表扩展自 Server 表，Server 表扩展自 Computer 表，Computer 表扩展自 Hardware 表，Hardware 表又扩展自 Configuration item 表）。（祖）父表包含其（孙）子表的记录。子表继承其（祖）父表的属性定义。尽管如此，每个 CMDB 对象只属于一个类。两个 CMDB 对象之间可以通过已定义类型的允许关系相互关联（例如 Server X “contains::contained by” Disk Y）。
> 
> 与其让用户在 800 张表中的某一张里选择记录，不如让他们能够查看十几张位于中间层级的（曾）祖父表中的全部记录，例如“Application Resources”、“Web Resources”、“Database Resources”、“MSSFT Database Servers”、“IIS Webserver”、“Windows/Linuc Servers/VMs'”、“Hypervisors”、“etc”。

内部和外部客户可以消费 **Business Service Offering**（业务服务产品）。**Business Service**（业务服务）定义提供的是什么，而 Business Service Offering 则定义其具体变体。每个服务产品由一个团队提供/支持。同一项服务在两个国家提供时，可能有不同的服务时间、不同的支持承诺，并由不同的支持团队负责。某些服务可能有标准版产品和扩展版产品。Business Service Offering 可以按地点、组织或公司特定的人员群组进行订阅。一个 Business Service Offering 可以依赖零个或多个 Service Instance。面向内部客户/员工的 Business Service Offering（例如“HR Payroll”或“Time writing”）应仅由内部公司订阅。

公司使用的每一项底层技术都必须由内部或外部服务提供方提供。该技术要么以服务形式提供，要么以服务形式进行管理。该服务由拥有/管理依赖于该底层技术的 Service Instance 的一方消费。**Technology Management Service Offering**（技术管理服务产品）为相关 Service Instance 定义承诺、订阅和治理。例如，某提供方可以提供“Windows Server Support”这一 Technology Management Service Offering，它隶属于“Hosting Support”这一 **Technology Management Service**（技术管理服务）。如果您使用不同的团队（例如支持特定地理区域的用户），可以创建按地点划分的服务产品，并让这些区域的用户订阅它们。如果您想区分生产服务器和非生产服务器，可以为两者分别创建服务产品。如有必要，还可以创建同时按地理区域和环境划分的组合服务产品。如果您有同一应用的三个实例，每个实例供特定用户群使用，则必须创建独立的服务实例，并且“可以”创建独立的服务产品和订阅。提示：如果各服务产品之间的承诺、订阅者和支持团队（几乎）相同，就不要分别创建服务产品。

### 最佳实践

-   Business Application 应与版本无关。也就是说，如果唯一的差异是版本而其他属性均相同，就不要为应用的每个版本单独创建 Business Application（例如 ServiceNow, Zurich）。
-   PC 应用应登记为在 PC 上检测到的软件包的产品型号（Product Model），而不是 Business Application。PC 应用的单个实例不应登记为服务实例。尽管我不推荐这样做，但您可以将 TASK 或 CASE 关联到终端用户设备服务产品，并引用安装在该设备上的软件 CI。
-   业务客户/员工不应能够消费（及引用）Technology Management Service。
-   每个 Business Application 必须至少有一个包含至少一个 Service Instance 的 Service Offering，  
    这样，该应用某个 Service Instance 上的事件（Event）和漏洞才能分派给提供包含该 Service Instance 的服务产品的团队。
-   如果某个 Business Application 作为服务提供给业务方，则该服务必须登记为 Business Service 或其 Business Service Offering。  
    尽管如此，理想情况下 Business Service 和/或 Business Service Offering 应以业务为导向（如“Payroll”），而不是以技术为导向（如“Workday”）。

### CSDM 数据的使用

在采用 CSDM 的 ServiceNow 实例中，技术与业务之间有着清晰的区分。这两个世界在根本上是分离的，但又紧密耦合。

业务用户或外部客户可以针对其已订阅的 Service Offering 提交 Case/Issue/Call/Request。他们可以通过员工/客户门户提交，也可以——越来越多地——通过 AI 支持的聊天机器人提交。聊天机器人知道来电者是谁、订阅了哪些服务，以及业务方或其他员工此前提出的问题及其解决方案。如果聊天机器人无法解决该 Case，则可以将其分派给服务台，或关联到之前已创建的技术事件（Incident）。

每个 Service Offering 都有自己的承诺和一组独立的订阅者。也就是说，比利时的员工可以向 HR Belgium 提交 Case，但通常不能向 HR Netherlands 提交。这确保了他们不会被与自己无关的服务产品分散注意力。同时，这也使得荷兰用户提交的 HR Case 能够以数据驱动的方式路由到负责荷兰的 HR 团队。同样，与某栋楼内 PC 相关的问题可以转给该楼的服务台。有关 O365 的问题/咨询可以先分派给本地服务台，然后再将事件分派给中央二线团队。

客户/员工的问题必须关联到一个已订阅的 Business Service Offering，并且可以关联到该 Service Offering 所依赖的受影响 Service Instance。例如，“HR”服务下的 Service Offering “Payroll”以及 Service Instance “Workday \[PR\]”。对于某些 Business Service Offering，可以选择分配给来电者的相应 CI。例如，当来电者提交关于“Windows Computer”的问题时，可以将该用户的笔记本电脑/VDI 识别为受影响的 CI。

观测到的事件（Event）、漏洞、告警以及报告的服务降级，可以通过向与受影响的 Technical Management Service Offering 相关的技术支持团队分派 Task 来处理。按照设计，系统可以自动确定哪个服务产品包含受影响的服务实例，以及应由哪个团队介入。如有需要，可以自动创建 Case，借此通知受影响的员工/客户并向其提供最新进展。反之，如果一线显然无法解决该事件，AI 智能体也可以触发创建二线事件。

团队可以将事件、请求和其他任务拖到其**敏捷任务看板**上，并在看板上进行分派、评论或解决。重复发生的事件可以被分诊为缺陷，再通过敏捷 Story 加以处理。用户请求的小型改进也可以通过 Story 来处理。

事件、变更、Story 等 TASK 必须关联到一个已订阅的 Technical Management Service Offering，并且可以（可选）关联到受影响的配置项和/或 Service Instance。Task 可以分派给 Technology Management Service Offering 中登记的相应团队的成员。

TASK 越来越多地源自 DevSecOps 事件/智能体。例如，Rapd7 可能在某个配置项上检测到漏洞，并创建一条 Vulnerability Response TASK 记录。该 CI 关联到某个服务实例，而该服务实例包含在由某团队拥有/管理的 Technical Management Service Offering 中。借助 CSDM 数据，系统可以自动选出相关团队，并将检测到的漏洞通知他们。

给不了解的人说明一下：TASK 并不取代 CASE，反之亦然。两者并存，各有其用途，并各自维护自己的沟通渠道。一个 Case 可能引出多个任务，一个任务也可能关联多个 Case。当 Case 更新时，相关任务可以随之更新，反之亦然。当任务关闭时，相关 Case 可以（也可以不）随之关闭。无权查看该任务的人员无法看到任务上的工作备注（Work notes）。

客户 CASE 必须符合适用于 Business Service Offering 的 SLA 承诺。  
技术 TASK 必须符合适用于 Technical Service Offering 的 OLA/UC 承诺。

通过更新服务产品的订阅，可以用新的服务产品无缝地/有选择地替换旧的服务产品。  
如果职责发生变化，可以在服务产品中更改要分派的组。

### 结语

借助 CSDM，可以构建一个业务（BUSiness）、开发（DEVelopment）、安全（SECurity）与运维（OPerationS）一体的生态系统，在其中，（仅）相关数据提供给需要知情的人员，各对象在需要时相互更新。
