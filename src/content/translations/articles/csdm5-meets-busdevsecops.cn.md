---
title: "CSDM5 遇上 BusDevSecOps"
excerpt: "ServiceNow 的通用服务数据模型（Common Service Data Model，CSDM）是当前 IT 管理领域的热门话题。我认识几位真正尝试读过 CSDM 白皮书的人；甚至还有专门的 CSDM 培训/认证。这一覆盖面广、高层次、"
source: "925acc10d22373b0"
---

ServiceNow 的通用服务数据模型（Common Service Data Model，CSDM）是当前 IT 管理领域的热门话题。我认识几位真正尝试读过 CSDM 白皮书的人；甚至还有专门的 CSDM 培训/认证。这一覆盖面广、高层次、“一刀切”式的 CSDM5 提供了一个数据模型，可以与贵公司内部可能使用的众多框架并存。

与 IT4IT 3.0 非常相似，CSDM 区分了“构想与战略”（Ideation & Strategy）、“设计与规划”（Design & Planning）、“构建与集成”（Build and Integration）、“服务交付”（Service Delivery）、“服务消费”（Service Consumption）以及“组合管理”（Manage Portfolio）等域。数据模型中的每个对象都只属于一个域。目前，只有少数公司使用同一个平台来管理所有域。通常，“构建与集成”是借助多种特定于技术的工具来完成的。可观测性（Observability）、持续集成（Continuous Integration）、持续交付（Continuous Delivery）和容器编排（Container Orchestration）越来越多地被视为独立的 DevOps 域。安全响应（Security Response）也日益成为一个独立的域。

上图列出了通用服务数据模型（CSDM）中最重要的对象，而不论 ServiceNow 规定它们在哪个域中使用/管理。这使得这张图更具普遍适用性，无论使用的是 DevOps、Dev & Ops、DevSecOps、BusDev 还是 BusDevOps（或其变体）。

### CSDM 对象

CSDM 定义了 **Business Application（业务应用）** 对象，它可以是一个（逻辑或物理的）产品或服务，支撑零个或多个业务能力/功能。一个应用可以被部署零次或多次。一个应用可以包含若干组件，这些组件既可以独立部署，也可以作为应用的一部分部署。每个 Business Application 都有其生命周期，必须由一个敏捷团队进行管理。其他框架将 Business Application 称为“Solution（解决方案）”，但含义完全相同。在 CSDM 中，以服务形式提供的应用软件（SaaS）同样被视为 Business Application。

中间件、云和 IaC 不被视为业务应用，而是技术管理服务产品（Technology Management Service Offering）。所部署的技术项作为基础设施栈/模板的一部分进行部署。

Business Application 和/或技术管理服务的应用栈可以被多次实例化。每个已部署的栈称为一个 **Service Instance（服务实例）**。通常，栈是特定于环境、技术或位置的，或者是这几者的组合。例如，一家公司可能有三个特定于国家的 O365 生产租户，以及一个通用的 O365 测试租户。这样，该公司总共拥有同一个“AD Application”的四个服务实例。有些服务实例并不是栈，而是对同类项的逻辑分组（例如“荷兰的 Windows 服务器”和/或“Windows 生产服务器”）。

栈通常是一组相互关联的项的集合。例如，一个 Java 应用资源托管在 Java 应用服务器上，而该应用服务器运行在一台 Windows 服务器上，依此类推。每个项都作为一个配置项（CI）单独登记。CI 的集合称为 **Service Delivery System（服务交付系统）**（以前称为 CMDB）**。** 这些项通过 CI 关系相互关联。如今，手动登记已成为历史；这些项及其关系都是通过自动发现或从可信数据源联合（federate）获得的。服务实例（以手动或自动方式）与其所依赖的顶层 CI 建立关联。

> CMDB 中的配置项存储在特定于类的表中。ServiceNow 拥有 800 多张具有层级结构的 CMDB 表（例如，Windows Server 表扩展自 Server 表，Server 表扩展自 Computer 表，Computer 表扩展自 Hardware 表，Hardware 表又扩展自 Configuration item 表）。（祖）父表包含其（孙）子表的记录。子表继承其（祖）父表的属性定义。尽管如此，每个 CMDB 对象只属于一个类。两个 CMDB 对象可以通过某一既定类型的允许关系相互关联（例如，服务器 X “contains::contained by” 磁盘 Y）。
> 
> 与其让用户在这 800 张表中的某一张里选择记录，不如让他们能够查看十几张内部曾祖父级表中的所有记录，例如“Application Resources”、“Web Resources”、“Database Resources”、“MSSFT Database Servers”、“IIS Webserver”、“Windows/Linux 服务器/虚拟机”、“Hypervisors”等。

内部和外部客户可以消费 **Business Service Offering（业务服务产品）。** **Business Service（业务服务）** 定义提供的是什么，而 Business Service Offering 则定义其具体的变体。每个服务产品由一个团队提供/支持。同一项服务在两个国家提供时，可能有不同的服务时间、不同的支持承诺，并由不同的支持团队负责。某些服务可能有标准版产品和扩展版产品。Business Service Offering 可以由按位置、组织或公司划分的特定人员群体订阅。一个 Business Service Offering 可以依赖零个或多个服务实例。面向内部客户/员工的 Business Service Offering（例如“HR 薪资”或“工时填报”）应只由内部公司订阅。

公司使用的每一项底层技术都必须由内部或外部服务提供商提供。该技术要么以服务形式提供，要么以服务形式进行管理。该服务由拥有/管理依赖于该底层技术的服务实例的一方消费。**Technology Management Service Offering（技术管理服务产品）** 为相关服务实例定义承诺、订阅和治理。例如，某提供商可以提供“Windows 服务器支持”这一技术管理服务产品，它隶属于“托管支持”这一 **Technology Management Service（技术管理服务）。** 如果您使用不同的团队（例如为特定地理区域的用户提供支持），则可以创建特定于位置的服务产品，并让这些区域的用户订阅。如果您想区分生产服务器和非生产服务器，可以为二者分别创建服务产品。如有必要，也可以创建同时区分地理位置和环境的组合型服务产品。如果同一应用有三个实例，每个实例由特定的用户群体使用，则必须创建单独的服务实例，并且**可以**创建单独的服务产品和订阅。提示：如果各服务产品之间的承诺、订阅者和支持团队（几乎）相同，就不要创建单独的服务产品。

### 最佳实践

-   Business Application 应与版本无关。也就是说，如果唯一的区别只是版本、而其他属性都相同，就不要为应用的每个版本分别创建 Business Application（例如 ServiceNow、Zurich）。
-   PC 应用应登记为在 PC 上检测到的软件包的产品型号（Product Model），而不是登记为 Business Application。PC 应用的单个实例不得登记为服务实例。虽然我并不推荐，但您可以将 TASK 或 CASE 关联到终端用户设备服务产品，并引用安装在该设备上的软件 CI。
-   业务客户/员工不应能够消费（和引用）技术管理服务。
-   对于每个 Business Application，必须至少有一个服务产品，且其中至少包含一个服务实例，  
    这样，该应用的服务实例上发生的事件和漏洞才能分派给提供包含该服务实例的服务产品的团队。
-   如果 Business Application 以服务形式提供给业务方，则该服务必须登记为 Business Service 或其下的 Business Service Offering。  
    尽管如此，理想情况下，Business Service 和/或 Business Service Offering 应以业务为导向（例如“薪资”），而不是以技术为导向（例如“Workday”）。

### CSDM 数据的使用

在使用 CSDM 的 ServiceNow 实例中，技术与业务之间有着清晰的区分。这两个世界在根本上相互隔离，却又紧密耦合。

业务用户或外部客户可以针对其已订阅的服务产品提交 Case/问题/呼叫/请求。他们可以通过员工/客户门户提交，也可以——而且越来越多地——通过 AI 支持的聊天机器人提交。聊天机器人知道呼叫者是谁、订阅了什么，以及业务方或其他员工此前提交过的问题及其解决方案。如果聊天机器人无法解决该 Case，可以将其分派给服务台，或关联到此前已开立的技术事件。

每个服务产品都有自己的承诺和一组独立的订阅者。也就是说，比利时的员工可以向比利时 HR 提交 Case，但通常不能向荷兰 HR 提交。这确保他们不会被与自己无关的服务产品分散注意力。同时，这也使得荷兰用户提交的 HR Case 能够以数据驱动的方式路由到负责荷兰的 HR 团队。同样，与某栋楼内 PC 相关的问题可以转给该楼的服务台。关于 O365 的问题/咨询可以先分派给本地服务台，然后再将事件分派给中央二线支持。

客户/员工问题必须关联到一个已订阅的 Business Service Offering，并可以关联到该服务产品所依赖的受影响服务实例。例如，“HR”服务下的“薪资”服务产品，以及服务实例“Workday \[PR\]”。对于某些 Business Service Offering，可以选择分配给呼叫者的相应 CI。例如，当呼叫者提交与“Windows 计算机”有关的问题时，可以将该用户的笔记本电脑/VDI 识别为受影响的 CI。

观测到的事件、漏洞、告警以及报告的服务降级，可以通过向与受影响的技术管理服务产品相关的技术支持团队分派任务（Task）来处理。按照设计，系统可以自动确定哪个服务产品包含受影响的服务实例，以及应由哪个团队介入。如有需要，可以自动创建 Case，借此通知受影响的员工/客户并向其更新进展。反之，如果显而易见一线无法解决该事件，AI 智能体也可以触发创建二线事件。

团队可以将事件、请求和其他任务拖到自己的 **敏捷任务看板** 上，并在那里进行分派、评论或解决。重复发生的事件可以被分诊为缺陷（defect），然后通过敏捷故事（Story）加以解决。所请求的小型改进也可以通过 Story 来处理。

事件、变更、Story 等 TASK 必须关联到一个已订阅的技术管理服务产品，并可（可选地）关联到受影响的配置项和/或服务实例。任务可以分派给技术管理服务产品中登记的相应团队的成员。

TASK 越来越多地源自 DevSecOps 事件/智能体。例如，Rapid7 可能在某个配置项上检测到漏洞，并生成一条漏洞响应（Vulnerability Response）TASK 记录。该 CI 关联到某个服务实例，而该服务实例包含在由某个团队拥有/管理的技术管理服务产品中。借助 CSDM 数据，系统可以自动选出相关团队，并将检测到的漏洞通知他们。

为不了解的读者说明一下：TASK 并不取代 CASE，反之亦然。二者并存，各有其用途，并各自维护自己的沟通渠道。一个 Case 可能引出多个任务，一个任务也可能与多个 Case 相关。当 Case 更新时，相关任务可以随之更新，反之亦然。当任务关闭时，相关 Case 可以（也可以不）随之关闭。无权查看任务的人员无法看到任务上的工作备注。

客户 CASE 必须符合适用于该 Business Service Offering 的 SLA 承诺。  
技术 TASK 必须符合适用于该技术服务产品的 OLA/UC 承诺。

通过更新服务产品的订阅，可以无缝地、有选择地用新服务产品替换旧服务产品。  
如果职责发生变化，可以在服务产品中更改需分派的组。

### 结语

借助 CSDM，可以构建一个融合业务（BUSiness）、开发（DEVelopment）、安全（SECurity）和运维（OPerationS）的生态系统，在其中，（仅）相关数据可供有知悉需要的人员使用，各对象也会在需要时相互更新。
