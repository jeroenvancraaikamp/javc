---
title: "一页读懂 CSDM5"
excerpt: "并非每个人都有时间阅读冗长的白皮书或翻阅无穷无尽的 PowerPoint 幻灯片。本文提供一篇知识文章，介绍关键工件，并说明如何按照 CSDM5 对其进行分类和治理。A"
source: "3df2d1de003e0477"
---

并非每个人都有时间阅读冗长的白皮书或翻阅无穷无尽的 PowerPoint 幻灯片。本文提供一篇知识文章，介绍关键工件，并说明如何按照 CSDM5 对其进行分类和治理。

### **战略组合与架构**

业务能力（Business Capability，例如“合同管理”）是一项战略职能，由负责治理的组合资产来实现，即**业务应用（Business Application）**。业务应用是一个概念性系统，它与其他业务应用交互，并具有由应用所有者（Application Owner）管理的生命周期和评级。一个应用可以**由带版本的应用组件（Application Component）或模块组成**，这些组件或模块可以单独部署。

**安装在 PC/移动设备上的软件包（**包括操作系统（OS）、设备驱动程序、策略和浏览器扩展）**不属于业务应用**。它们被建模为某个已知的、带版本的产品型号（Product Model）的已部署产品，是以服务形式向最终用户提供的功能中不可分割的一部分。已安装的 PC/手机产品不受正式变更管理（Change Management）、评级、BC/DR（业务连续性/灾难恢复）以及其他适用于业务应用的实践的约束。

**托管的 IT4IT 解决方案**记录为提供**技术能力（Technical Capability）**的**技术应用（Technical Application）**。建议以与业务应用及其组件相同的方式治理这些技术应用及其组件（例如 IAM、CIA、EA、CHG 等）。尽管如此，业务服务产品（Business Service Offering）不得与技术应用的实例相关联，业务用户或外部客户也不得订阅技术服务产品（Technical Service Offering）。

### **交付与运营化**

一个**业务/技术** **应用**可以多次部署，**从而形成唯一的服务实例（Service Instance）**（特定的运行环境，例如“UBW \[PR\]”）。这些服务实例可能依赖于底层支撑技术（Underpinning Technology），而这些技术并不属于业务应用；这些技术项被建模为某个带版本的产品型号的已安装产品（例如 SQL Server 2022 SP1）。

**服务**通过**服务产品（Offering）**进行打包和消费，服务产品具有所有者、提供方、承诺、权利和订阅：

-   **业务服务产品（Business Service Offering）**为**业务用户/客户**打包最终成果，并**依赖于**零个或多个业务应用的服务实例。
-   **技术管理服务产品（Technology Management Service Offering）**打包内部 IT 组件（例如“Linux 服务器”“SQL Server 数据库”“WildFly 服务器”“IIS 网站”或“存储组件”），并包含交付该服务产品的一个或多个服务实例，或一个或多个**动态 CI 组**。

### **治理与依赖关系**

运营组合项可以依赖于**底层支撑技术**，底层支撑技术由**相互关联的配置项（CI）**组成（例如已部署的服务器、数据库、网络和存储），这些配置项通常通过**发现（Discovery）或联合（Federation）**的方式导入 CMDB。

CSDM 的一项基本原则是：每一个 CI 都必须受到治理/有明确的所有者：**每个 CI 都**（**直接或间接地，例如通过 CI 分组（CI Grouping）**）**包含于一个技术管理服务产品中**，以确保每个受管技术组件都有明确的问责和既定的支持。

SAAS 实例是黑盒，其中包含 SAAS 供应商自身的/为 SAAS 供应商提供的底层支撑技术。也就是说，在 CSDM 中，它们不与底层支撑技术相关联。

## **数字产品的分类**

数字产品根据消费者和功能进行分类：

<table class="x_MsoNormalTable" border="1" width="100%" cellspacing="3" cellpadding="4"><tbody><tr><td width="386"><p class="x_MsoNormal"><b><i>产品条件</i></b><i></i></p></td><td width="413"><p class="x_MsoNormal"><b><i>CSDM 分类</i></b><i></i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>如果</i></b><i>该产品是 PC 或手机，或安装在 PC 或手机中/上。</i></p></td><td width="413"><p class="x_MsoNormal"><i>最终用户软件包，包含特定制造商的特定产品型号的产品</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是包含于业务应用或技术应用中的部件/模块。</i></p></td><td width="413"><p class="x_MsoNormal"><i>应用组件，通常通过 CI/CD 流水线部署</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是面向业务用户的产品。</i></p></td><td width="413"><p class="x_MsoNormal"><i>业务应用的实例或业务服务的实例。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是面向业务的服务。</i></p></td><td width="413"><p class="x_MsoNormal"><i>依赖于一个或多个服务实例的业务服务/服务产品。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是技术服务</i></p></td><td width="413"><p class="x_MsoNormal"><i>技术服务/服务产品。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品为业务/技术应用提供底层支撑。</i></p></td><td width="413"><p class="x_MsoNormal"><i>包含于技术管理服务/服务产品中的（产品型号的）实例。</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>否则，如果</i></b><i>该产品是面向技术用户的产品（例如 Intune 或 SCVMM 等技术工具）</i></p></td><td width="413"><p class="x_MsoNormal"><i>包含于技术管理服务/服务产品中的技术应用实例。</i></p></td></tr></tbody></table>

*注：底层技术的所有权归以服务形式提供底层支撑基础设施的所有者。例如，Hyper-V 主机和网络由基础设施团队（Infra）提供，而不是由依赖它们的业务应用的所有者提供。*
