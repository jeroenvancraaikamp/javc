---
title: "How to implement a Joiner, Mover and Leaver Process?"
date: 2024-12-23
categories: ["IT4ESM"]
excerpt: "Here’s an integrated overview of how your enterprise will handle the Joiner, Mover, and Leaver (JML) processes , utilising Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP, and ServiceNow while addressing all requested elements."
image: "https://javc.nl/wp-content/uploads/2024/12/JML.webp"
readingTime: 5
---

Here’s an integrated overview of how your enterprise will handle the **Joiner, Mover, and Leaver (JML) processes**, utilising **Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP, and ServiceNow** while addressing all requested elements.

* * *

## **1\. Joiner Process (Onboarding)**

### **1.1 Triggering the Process**

-   **Permanent Staff:**
    -   Workday acts as the **source of truth** for HR master data.
    -   A new hire record is created in Workday, including role, location, and job classification.
    -   Saviynt picks up user details from Workday for Identity Governance and Access Management (IGA).
    -   Azure AD provisions basic identity accounts (email, SSO).
-   **External Staff (Contractors):**
    -   Managed directly via **Saviynt**, integrated with ServiceNow for access requests and lifecycle management.
    -   External staff details (e.g., contract period, role) are stored in Saviynt.

### **1.2 IT and Asset Provisioning**

-   **Identity and Access Management:**
    -   Saviynt handles role-based access control (RBAC) and ensures only required entitlements are provided.
    -   Azure AD handles authentication and access provisioning for enterprise systems.
-   **Device Management:**
    -   **Intune** manages Windows devices.
    -   **JAMF** manages macOS and iOS devices.
    -   Devices are provisioned with standard enterprise software like Microsoft Office 365, VPN clients, collaboration tools (e.g., Teams, Slack), security tools (e.g., antivirus, endpoint protection).
-   **Procurement:**
    -   Devices procured via **Ariba** (enterprise-level vendors).
    -   Local procurement happens via approved regional vendors.
-   **Asset Registration:**
    -   **ServiceNow Asset Management (ITAM)** maintains records for all IT assets.
    -   **ServiceNow Configuration Management Database (CMDB)** records device configuration details.
    -   Non-IT assets (e.g., cars, bicycles, facility access cards, keys) are also logged in **ServiceNow** under Facilities Management or CMDB.

### **1.3 Compliance and Policies**

-   Policies and entitlements for both hardware and software are stored and governed via:
    -   **Saviynt (access policies)**
    -   **ServiceNow (asset lifecycle management and approvals)**

### **1.4 Cross-Charging Costs**

-   **IT Costs:**
    -   Device procurement and software licenses are charged back via **Ariba** procurement workflows and cost-center assignments in Workday.
    -   External staff costs are processed via **ADP** payroll (for payments) and **Ariba** (for procurement/vendor invoice tracking).

### **1.5 Account and Ticket Activation**

-   **ServiceNow:** Tracks all onboarding tasks and tickets (e.g., asset delivery, account creation).
-   Ownership of onboarding tasks is assigned to relevant departments (IT, Facilities, HR).

* * *

## **2\. Mover Process (Role Changes, Promotions, Transfers)**

### **2.1 Role Updates and Transfers**

-   **Permanent Staff:**
    -   Workday triggers role updates, location changes, and departmental transfers.
    -   Saviynt adjusts access rights based on new roles.
    -   Azure AD updates group memberships and SSO entitlements.
-   **External Staff:**
    -   Managed via Saviynt and ServiceNow.
    -   Changes to access are processed via Saviynt with approval workflows.

### **2.2 Asset Updates**

-   IT and physical assets are updated via **ServiceNow ITAM/CMDB** workflows.
-   Devices may need re-provisioning via **Intune (Windows)** or **JAMF (macOS)**.
-   Facilities-related assets (e.g., office space, parking permits, access cards) are updated in **ServiceNow Facilities Management**.

### **2.3 Software Adjustments**

-   Role-based software entitlements (e.g., licenses, VPN access) are updated automatically by Saviynt and deployed via:
    -   **Intune** (Windows devices)
    -   **JAMF** (Mac devices)

### **2.4 Compliance and Audits**

-   Saviynt ensures proper access review and recertification processes are followed.
-   ServiceNow maintains audit logs for approvals and changes.

### **2.5 Cross-Charging**

-   Changes in IT resources or licenses are updated in **Ariba** and charged to the appropriate cost centers.

### **2.6 Open Tasks and Tickets**

-   Existing tickets and tasks are reassigned via **ServiceNow** workflows.

* * *

## **3\. Leaver Process (Offboarding)**

### **3.1 Triggering Offboarding**

-   **Permanent Staff:**
    -   Workday triggers termination workflows.
    -   Saviynt disables access rights and revokes entitlements.
    -   Azure AD disables accounts and removes SSO access.
-   **External Staff:**
    -   Managed via Saviynt and ServiceNow workflows.
    -   ServiceNow triggers ticket workflows for IT and facilities teams.

### **3.2 Asset Retrieval**

-   **ServiceNow ITAM:** Tracks and manages the return of IT assets (e.g., laptops, mobile phones).
-   **ServiceNow Facilities Management:** Handles return of non-IT assets (e.g., keys, badges).

### **3.3 Software License Reclamation**

-   Software licenses are revoked via:
    -   **Intune** (Windows)
    -   **JAMF** (MacOS)
    -   Recorded and updated in **ServiceNow CMDB**

### **3.4 Financial Settlements**

-   Outstanding vendor payments are processed via **Ariba**.
-   Payroll finalisation happens via **ADP** for permanent staff.

### **3.5 Compliance and Audits**

-   Final access audits are completed in **Saviynt**.
-   ServiceNow logs the completion of offboarding tasks and asset returns.

### **3.6 Cross-Charging**

-   Final asset recovery costs and license adjustments are cross-charged via **Ariba**.

* * *

## **4\. Policies and Entitlements Management**

### **4.1 Storage and Maintenance**

-   **Saviynt:** Access policies, role-based entitlements.
-   **ServiceNow CMDB:** Asset lifecycle and configuration policies.
-   **ServiceNow ITAM:** Asset entitlements, lifecycle policies.
-   **Workday:** Cost-center alignments, HR policies.

### **4.2 Audit and Compliance**

-   **Saviynt and ServiceNow:** Regular access reviews compliance checks.
-   **Intune and JAMF:** Device compliance and security policy enforcement.

* * *

## **5\. Summary Table**

| **Process Stage** | **Source of Truth** | **Identity/Access** | **Asset Management** | **Software Deployment** | **Costs and Invoicing** |
| --- | --- | --- | --- | --- | --- |
| **Joiner** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |
| **Mover** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba |
| **Leaver** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |

* * *

## **6\. Open Tickets and Ownership Transfer**

-   **Logical Assets (accounts, roles, workflows):** Handled via **Saviynt and ServiceNow**.
-   **Physical Assets:** Managed and tracked via **ServiceNow ITAM/CMDB**.
-   **Open Tickets:** Reassigned in **ServiceNow** workflows.

This integrated approach ensures that all tools play to their strengths while maintaining clarity, compliance, and efficiency across the **Joiner, Mover, and Leaver lifecycle**.
