---
title: "ITOM：证书管理（Certificate Management）"
excerpt: "作为 ServiceNow ITOM Discovery 产品的一部分，ServiceNow 提供了一套全面的证书管理（Certificate Management）功能。该功能旨在帮助组织在证书的整个生命周期中实现可见性、可控性和自动化，同时确保 CMDB 准确且保持最新。"
source: "398edcdb6d5340b0"
---

作为 **ServiceNow ITOM Discovery** 产品的一部分，ServiceNow 提供了一套全面的**证书管理（Certificate Management）**功能。该功能旨在帮助组织在证书的整个生命周期中实现可见性、可控性和自动化，同时确保 CMDB 准确且保持最新。

### 核心功能

ServiceNow Certificate Management 支持以下关键功能：

-   **证书的发现与联合（federation）**：将证书注册为 CMDB 中的配置项（CI），并记录证书的部署位置
-   **到期监控**：检测即将到期的证书，自动分配并跟踪续期任务，并发送电子邮件通知
-   **基于服务目录（Catalog）的请求管理**：用户可通过标准化工作流申请、审批、续期或吊销证书
-   **证书自动续期**：在支持的情况下，通过工作流驱动的自动化实现续期
-   **事件生成**（需获得 ITOM Health 许可）：在检测到与证书相关的问题或故障时创建事件

借助 ITOM Visibility，证书会被自动填充到 CMDB 中并持续更新，从而支持*零接触（zero-touch）*的数据管理方式。

### 证书检测方法

可以采用以下一种或多种方法发现证书：

#### 1\. TCP 端口扫描

通过扫描证书所暴露的 TCP 端口来检测证书。此方法需要：

-   可被发现的 TCP 端口
-   已部署 MID Server
-   已相应配置防火墙访问权限

端口发现通常在网络中基于 IP 的设备被发现之后进行。

#### 2\. 基于 URL 的发现

可以通过查询使用证书的已知 URL 来检测证书。此方法特别适用于：

-   无法通过 ITOM Discovery 发现的 SaaS 应用
-   组织所依赖的外部网站或合作伙伴系统

#### 3\. 从证书颁发机构联合获取

可以从一个或多个证书颁发机构（CA，例如 DigiCert、GoDaddy、Microsoft、Entrust 或 Let’s Encrypt）联合获取证书。虽然此方法无法显示证书的部署位置，但能提供以下有价值的信息：

-   存在哪些证书
-   证书由谁颁发
-   证书何时到期

### CMDB 中的呈现与仪表板

检测到的证书以 CI 形式存储在 CMDB 中，并包含提供商和到期日期等属性。

ServiceNow ITOM Visibility 提供专用的**证书管理仪表板（Certificate Management Dashboard）**，可用于了解：

-   正在使用的证书总数
-   在可配置时间窗口内即将到期的证书
-   手动续期任务的状态和数量
-   为证书续期而触发的自动化工作流

### 注意事项与运维考虑

-   如果 IT 工件通常通过 **CI/CD 流水线、DevOps 工具或 API** 进行部署，建议让证书续期请求也通过相同的渠道进行
-   如今，续期证书的签发通常已实现自动化，并且一般由预先批准的**标准变更（Standard Change）**而非**常规变更（Normal Change）**进行管控。
