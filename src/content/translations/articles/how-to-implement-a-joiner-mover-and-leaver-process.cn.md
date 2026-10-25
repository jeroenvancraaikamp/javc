---
title: "如何实施入职、调岗和离职（Joiner, Mover and Leaver）流程？"
excerpt: "以下综合概述了贵企业将如何借助 Workday、Azure AD、Saviynt、Intune、JAMF、Ariba、ADP 和 ServiceNow 处理入职、调岗和离职（Joiner, Mover, and Leaver，JML）流程，并涵盖所有要求的要素。"
source: "c1d6e33e30fd7ca2"
---

以下综合概述了贵企业将如何借助 **Workday、Azure AD、Saviynt、Intune、JAMF、Ariba、ADP 和 ServiceNow** 处理**入职、调岗和离职（Joiner, Mover, and Leaver，JML）流程**，并涵盖所有要求的要素。

* * *

## **1\. 入职流程（Joiner，Onboarding）**

### **1.1 流程触发**

-   **正式员工：**
    -   Workday 作为 HR 主数据的**唯一可信数据源（source of truth）**。
    -   在 Workday 中创建新员工记录，包括角色、工作地点和职位分类。
    -   Saviynt 从 Workday 获取用户信息，用于身份治理与访问管理（IGA）。
    -   Azure AD 开通基础身份账户（电子邮件、SSO）。
-   **外部人员（承包商）：**
    -   直接通过 **Saviynt** 管理，并与 ServiceNow 集成，用于访问申请和生命周期管理。
    -   外部人员的信息（例如合同期限、角色）存储在 Saviynt 中。

### **1.2 IT 与资产配置**

-   **身份与访问管理：**
    -   Saviynt 负责基于角色的访问控制（RBAC），确保仅授予所需的权限。
    -   Azure AD 负责企业系统的身份验证和访问开通。
-   **设备管理：**
    -   **Intune** 管理 Windows 设备。
    -   **JAMF** 管理 macOS 和 iOS 设备。
    -   设备预装标准企业软件，例如 Microsoft Office 365、VPN 客户端、协作工具（例如 Teams、Slack）以及安全工具（例如防病毒软件、终端防护）。
-   **采购：**
    -   设备通过 **Ariba** 采购（企业级供应商）。
    -   本地采购通过经批准的区域供应商进行。
-   **资产登记：**
    -   **ServiceNow 资产管理（ITAM）** 维护所有 IT 资产的记录。
    -   **ServiceNow 配置管理数据库（CMDB）** 记录设备配置详情。
    -   非 IT 资产（例如汽车、自行车、设施门禁卡、钥匙）同样记录在 **ServiceNow** 的设施管理（Facilities Management）或 CMDB 中。

### **1.3 合规与策略**

-   硬件和软件的策略及权限通过以下系统存储和治理：
    -   **Saviynt（访问策略）**
    -   **ServiceNow（资产生命周期管理和审批）**

### **1.4 成本分摊**

-   **IT 成本：**
    -   设备采购和软件许可费用通过 **Ariba** 采购工作流以及 Workday 中的成本中心分配进行内部计费（charge back）。
    -   外部人员成本通过 **ADP** 薪资系统（用于付款）和 **Ariba**（用于采购/供应商发票跟踪）处理。

### **1.5 账户与工单激活**

-   **ServiceNow：** 跟踪所有入职任务和工单（例如资产交付、账户创建）。
-   入职任务的负责权分配给相关部门（IT、设施、HR）。

* * *

## **2\. 调岗流程（Mover：角色变更、晋升、调动）**

### **2.1 角色更新与调动**

-   **正式员工：**
    -   Workday 触发角色更新、工作地点变更和部门调动。
    -   Saviynt 根据新角色调整访问权限。
    -   Azure AD 更新组成员身份和 SSO 权限。
-   **外部人员：**
    -   通过 Saviynt 和 ServiceNow 管理。
    -   访问权限变更通过 Saviynt 的审批工作流处理。

### **2.2 资产更新**

-   IT 资产和实物资产通过 **ServiceNow ITAM/CMDB** 工作流更新。
-   设备可能需要通过 **Intune（Windows）** 或 **JAMF（macOS）** 重新配置。
-   与设施相关的资产（例如办公空间、停车许可、门禁卡）在 **ServiceNow 设施管理** 中更新。

### **2.3 软件调整**

-   基于角色的软件权限（例如许可证、VPN 访问）由 Saviynt 自动更新，并通过以下工具部署：
    -   **Intune**（Windows 设备）
    -   **JAMF**（Mac 设备）

### **2.4 合规与审计**

-   Saviynt 确保执行恰当的访问审查和重新认证流程。
-   ServiceNow 维护审批和变更的审计日志。

### **2.5 成本分摊**

-   IT 资源或许可证的变更在 **Ariba** 中更新，并计入相应的成本中心。

### **2.6 未完成的任务和工单**

-   现有工单和任务通过 **ServiceNow** 工作流重新分配。

* * *

## **3\. 离职流程（Leaver，Offboarding）**

### **3.1 离职流程触发**

-   **正式员工：**
    -   Workday 触发离职工作流。
    -   Saviynt 禁用访问权限并撤销权限授予。
    -   Azure AD 禁用账户并移除 SSO 访问。
-   **外部人员：**
    -   通过 Saviynt 和 ServiceNow 工作流管理。
    -   ServiceNow 为 IT 和设施团队触发工单工作流。

### **3.2 资产回收**

-   **ServiceNow ITAM：** 跟踪和管理 IT 资产（例如笔记本电脑、手机）的归还。
-   **ServiceNow 设施管理：** 处理非 IT 资产（例如钥匙、工牌）的归还。

### **3.3 软件许可证回收**

-   软件许可证通过以下方式撤销：
    -   **Intune**（Windows）
    -   **JAMF**（MacOS）
    -   在 **ServiceNow CMDB** 中记录和更新

### **3.4 财务结算**

-   未结清的供应商付款通过 **Ariba** 处理。
-   正式员工的最终薪资结算通过 **ADP** 完成。

### **3.5 合规与审计**

-   最终访问审计在 **Saviynt** 中完成。
-   ServiceNow 记录离职任务和资产归还的完成情况。

### **3.6 成本分摊**

-   最终的资产回收成本和许可证调整通过 **Ariba** 进行成本分摊。

* * *

## **4\. 策略与权限管理**

### **4.1 存储与维护**

-   **Saviynt：** 访问策略、基于角色的权限。
-   **ServiceNow CMDB：** 资产生命周期和配置策略。
-   **ServiceNow ITAM：** 资产权限、生命周期策略。
-   **Workday：** 成本中心对应关系、HR 策略。

### **4.2 审计与合规**

-   **Saviynt 和 ServiceNow：** 定期访问审查和合规检查。
-   **Intune 和 JAMF：** 设备合规及安全策略执行。

* * *

## **5\. 汇总表**

| **流程阶段** | **可信数据源** | **身份/访问** | **资产管理** | **软件部署** | **成本与开票** |
| --- | --- | --- | --- | --- | --- |
| **入职（Joiner）** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |
| **调岗（Mover）** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba |
| **离职（Leaver）** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |

* * *

## **6\. 未结工单与负责权移交**

-   **逻辑资产（账户、角色、工作流）：** 通过 **Saviynt 和 ServiceNow** 处理。
-   **实物资产：** 通过 **ServiceNow ITAM/CMDB** 管理和跟踪。
-   **未结工单：** 在 **ServiceNow** 工作流中重新分配。

这种集成方法确保所有工具各展所长，同时在整个**入职、调岗和离职生命周期**中保持清晰、合规和高效。
