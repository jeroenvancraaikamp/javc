---
title: "CSDM5 一页通"
excerpt: "并非每个人都有时间阅读冗长的白皮书或翻阅无穷无尽的 PowerPoint 幻灯片。本文提供一篇知识文章，介绍关键工件，并说明如何按照 CSDM5 对其进行分类和治理。A"
source: "09aca2e815259602"
---

并非每个人都有时间阅读冗长的白皮书或翻阅无穷无尽的 PowerPoint 幻灯片。本文提供一篇知识文章，介绍关键工件，并说明如何按照 CSDM5 对其进行分类和治理。

### **战略组合与架构**

Business Capability（业务能力，例如“合同管理”）是一项战略职能，由起治理作用的组合资产，即 **Business Application（业务应用）** 来实现。Business Application 是一个概念性系统，与其他 Business Application 进行交互，并具有由 Application Owner（应用负责人）管理的生命周期和评级。一个应用可以**由带版本的 Application Component（应用组件）或模块组成**，这些组件或模块可以单独部署。

**PC/移动设备上安装的软件包**（包括操作系统（OS）、设备驱动程序、策略和浏览器扩展）**不属于 Business Application**。它们被建模为某个已知的带版本产品型号的已部署产品，是以服务形式提供给最终用户的功能中不可分割的一部分。PC/手机上安装的产品不受正式的变更管理（Change Management）、评级、BC/DR 以及其他适用于 Business Application 的实践的约束。

**托管的 IT4IT 解决方案**记录为 **Technical Application（技术应用）**，提供 **Technical Capability（技术能力）**。建议以与业务应用及其组件相同的方式治理这些 Technical Application 及其组件（例如 IAM、CIA、EA、CHG 等）。尽管如此，Business Service Offering 不得关联到 Technical Application 的实例，业务用户或外部客户也不得订阅 Technical Service Offering。

### **交付与运营化**

一个 **Business/Technical** **Application** 可以多次部署，**从而产生唯一的 Service Instance（服务实例）**（特定的运行环境，例如“UBW \[PR\]”）。这些 Service Instance 可能依赖于底层技术，而底层技术并非 Business Application；这些技术项被建模为某个带版本产品型号的已安装产品（例如 SQL Server 2022 SP1）。

**服务**通过 **Offering（服务提供项）** 进行打包和消费，Offering 具有负责人、提供方、承诺、权利和订阅：

-   **Business Service Offering** 为**业务用户/客户**打包最终成果，并**依赖于**零个或多个 Business Application 的 Service Instance。
-   **Technology Management Service Offering** 打包一个内部 IT 组件（例如“Linux Server”、“SQL Server Database”、“WildFly Server”、“IIS Website”或“Storage Component”），并包含交付该 Offering 的一个或多个 Service Instance，或一个或多个 **CI 动态组**。

### **治理与依赖关系**

运营组合项可以依赖于**底层技术**，底层技术由**相互关联的配置项（CI）**（例如已部署的服务器、数据库、网络和存储）组成，这些配置项通常通过**发现或联合（federation）** 导入 CMDB。

CSDM 的一项基本原则是：每一个 CI 都必须受到治理/有归属：**每个 CI 都**（**直接或间接，例如通过 CI Grouping**）**被一个 Technology Management Service Offering 所包含**，以确保每个受管技术组件都有明确的问责和既定的支持。

SAAS 实例是黑盒，其中包含 SAAS 供应商的/为 SAAS 供应商提供的底层技术。也就是说，在 CSDM 中，它们不与底层技术相关联。

## **数字产品的分类**

数字产品根据消费者和功能进行分类：

<table class="x_MsoNormalTable" border="1" width="100%" cellspacing="3" cellpadding="4"><tbody><tr><td width="386"><p class="x_MsoNormal"><b><i>产品条件</i></b><i></i></p></td><td width="413"><p class="x_MsoNormal"><b><i>CSDM 分类</i></b><i></i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>如果</i></b><i>该产品是 PC 或手机，或安装在 PC 或手机中/上。</i></p></td><td width="413"><p class="x_MsoNormal"><i>最终用户软件包，包含特定制造商的特定产品型号（Product Model）的产品</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是 Business Application 或 Technical Application 所包含的部件/模块。</i></p></td><td width="413"><p class="x_MsoNormal"><i>Application Component，通常通过 CI/CD 流水线部署</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是面向业务用户的产品。</i></p></td><td width="413"><p class="x_MsoNormal"><i>Business Application 的实例或 Business Service 的实例。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是面向业务的服务。</i></p></td><td width="413"><p class="x_MsoNormal"><i>依赖于一个或多个 Service Instance 的 Business Service/Offering。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是技术服务</i></p></td><td width="413"><p class="x_MsoNormal"><i>Technical Service/Offering。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品为 Business/Technical Application 提供底层支撑。</i></p></td><td width="413"><p class="x_MsoNormal"><i>由 Technology Management Service/Offering 所包含的（某产品型号的）实例。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是面向技术用户的产品（例如 Intune 或 SCVMM 等技术工具）</i></p></td><td width="413"><p class="x_MsoNormal"><i>由 Technology Management Service/Offering 所包含的 Technical Application 实例。</i></p></td></tr></tbody></table>

*注：底层技术的所有权归属于以服务形式提供底层基础设施的负责人。例如，Hyper-V 主机和网络由基础设施团队（Infra）提供，而不是由依赖于它们的业务应用的负责人提供。*
