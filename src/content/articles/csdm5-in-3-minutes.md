---
title: "CSDM5 explained in 10 minutes..."
date: 2025-09-06
categories: ["TBM/CSDM/CMDB"]
excerpt: "There are hundreds of interpretations of the ServiceNow Common Service Data Model (CSDM). In this article, you will find the how CSDM5 is construed and implemented in ServiceNow. Different lenses, different focus. ServiceNow considers all of the portfolios to be"
image: "https://javc.nl/wp-content/uploads/2025/09/DPM_in_CSDM5.png"
readingTime: 9
---

There are hundreds of interpretations of the ServiceNow Common Service Data Model (CSDM). In this article, you will find the how CSDM5 is construed and implemented in ServiceNow.

Different lenses, different focus.

-   Program/Project Managers manage the **Project/Demand Portfolio.**
-   Enterprise Architects manage the **Application Portfolio**
-   Product Owners manage the backlog for their components in the **Product Portfolio**
-   Service Owners manage their artifacts in the **Service Portfolio**
-   Configuration Managers track their IT Inventory in the **Configuration Management Database** (CMDB)
-   Asset Managers track the book value, operational costs, whereabouts, and the owners/consumers of their ****Financial Assets.****
-   Master Data Stewards administer **Foundational, cross-portfolio data** in various tools.

**ServiceNow considers all of the portfolios to be part of the Digital Product Portfolio of the Enterprise** and manages them using Digital Portfolio Management (DPM). That said, underneath the DPM hood, the individual portfolios, specific practices, and application modules are being used**.** I.e., you can't do IT Service Management in ServiceNow if you don't implement (management of) a Service Portfolio in ServiceNow.

> Nowadays, the managed portfolio items are manually maintained by their stakeholders (in the various portfolios), and built components (stored in technology-specific repositories) are deployed via automated pipelines. The deployed items are automatically detected and recorded in the CMDB, and related Assets are automatically created/updated. Deployed items may be technically tagged so that non-technical attribute values can be automatically detected, and manual CMDB update is no longer needed.

Concepts that were used ten years ago in many companies are no longer applicable today, e.g.:

-   **Automated Discovery and Federation** of IT Operations Management have replaced the Manual Configuration Management Process
-   Application/Product/Service Data that needs to be periodically attested and reviewed is placed in portfolios and managed via **Digital Portfolio Management** practices.
-   Assets, including their status, owner, consumer, cost, and whereabouts, are managed via Hardware/Software/Cloud **Asset Management**.
-   **Agile DevOps** has replaced/changed portions of ITIL Change management and Problem management.
-   **Security Operations** (for production as well as non-production items) has become critical for Enterprises.
-   Enterprises increasingly must adhere to legislation, e.g., for **data privacy, risk, and compliance** (for non-production and production items)
-   **Cloud Computing** has become the standard. Cloud Services are requested (by DevOps tools) via API's and are automatically provisioned.
-   **Artificial Intelligence** disrupts the way people manage, govern, and use IT.

In CSDM5, the following artifacts were defined:

-   **Business Applications** are coarse-grained products that provide **Business Capabilities**, for which their lifecycle, authorized use, and roadmaps need to be managed.  
    A Business Application only exists once in the portfolio and may have multiple Product instances, which are modelled as separate Service Instances.  
    
-   **Components** are fine-grained products that are part of an Application, that are developed and maintained via DevOps practices.
-   **Services** are provided by Providers and consumed by Consumers, which may be related to Applications or other Products.  
    A **Business Service** directly supports business outcomes and is visible to the business or end users.  
    A **Technical Management Service,** owned by IT, supports one or more business services but is not directly visible to the business.
-   **Service Offerings** are variants of Services (e.g., for different areas/time zones, differentiated between production/non-production, etc.), each having its own commitments, and/or using various teams.
-   A **Service Instance** is a deployed item that is supported under one or more Service Offerings, and that is related to a Product or Application. E.g. a website, an API, etc.
-   The **Service Delivery System** is a collection of individually detected/related Configuration Items, on which the Service instances may depend.
-   **Assets** are financial records of individual items that have been procured or deployed, that are on the company's General Ledger, and/or for which licenses may need to be paid. Assets are of an Asset Model. E.g., the instance of NotePad++ that is discovered on a particular PC is an asset of the "Notepad++" Software Asset model.

**Notes:**

-   Within CSDM5, **Business Applications are limited to those that directly support business outcomes and are visible to the business or end users**. For each Application in the Portfolio, a CIA/BIA assessment must be produced and periodically reviewed. Additionally, for each application, roles need to be defined and assigned to individual users via Identity and Access Management.
-   The administrative/governance overhead above is not justifiable for the thousands of PC/Mobile software package models that an enterprise uses, hence these **software package (models) are not considered as Applications**. Instead, Software Asset Management keeps track of the Software Assets, incl. how many instances thereof are in use.
-   **Some companies choose to record all technical tools, middleware, DBMS, and other System Software as Business Applications**. However, these Applications do not directly support business outcomes and often are invisible to the business or end users. This may be an acceptable practice if the administrative/governance overhead is accepted and if these technical applications adhere to the same policies as the business applications. Alternatively, one may register the technical applications in the portfolio, but exempt them from the governance that applies to the Business Applications.
-   An application provided "as a Service" may be recorded as a business application if its lifecycle is managed by the company and subject to the same policies as other Applications. **If a solution is consumed as a service, but the vendor manages its lifecycle, that solution is considered a Service, not an Application.**
-   **Public Cloud Platforms, such as Azure, OCI, AWS, and GCP, are consumed as a Service** from a Provider who manages the roadmap and lifecycle of the technical platform. Such platforms are considered Services, not as Applications.
-   **Companies may produce/maintain their own Applications on Platforms that they consume as a Service**. E.g., SAP S/4 HANA Is consumed as a Service from SAP, and (a partner of) the company creates custom configurations/workflows for it. Coarse-grained applications that are produced by (a partner of) the company may be registered as applications, and their configurations/scripts/api's are considered as Components.
-   Considering that the only consistent thing is change, it is recommended to **adopt market standard taxonomy and master data** from an authoritative source that ideally is vendor agnostic and that is kept up to date by a governance body. E.g., the TBM Council maintains a good Taxonomy model with ready to use and well defined data.

**For the Record****:**

-   **Assets** in ISO-27000, ISO55000, IFRS/GAAP, and other formal frameworks are defined/scoped differently than in ITSM/ITIL.
-   ServiceNow differentiates between **Service Instances** (that are used by consumers) and **Configuration Items** (that may support one or more Service Instances).

-   For Service Instances, one may register its relation with Foundational Data. Configuration items should not be touched by people in ServiceNow
-   People can raise incidents/problems/changes on Service Instances related to offerings they are entitled to, but not necessarily on Configuration Items.

-   The **CSDM needs to cater for information about production items, but also for information about non-production items**. That said, the Providers' offerings and commitments for both environments may differ, and some practices (e.g., change mngt) apply to production offerings only.
-   Each IT4IT vendor uses its own terminology and definitions for its platform. Considering an enterprise practice should be implemented in one enterprise-wide platform only, **using vendor-specific terminology/definitions (e.g., best practice process guides, video tutorials, community articles that are aligned with the platform) makes sense**. **Adopting definitions/terminology derived from outdated and/or incompatible frameworks makes no sense.**

**Examples:**

-   **Portfolios:** "ERP Applications", "Public Cloud Services", "ERP Service Instances", "End-User Services"; "GitLab Components"
-   **Business Applications:** "SAP S/4 Hana Platform", "SAP ERP Application", "SAP CALM Application", "ServiceNow Platform", ServiceNow ITSM/ITOM/ITAM", "Workday".
-   **Technical Applications:** "Intune", "JAMF", "Cisco Works", "SQL Server 2016" , "SQL Server 2022", ".NET 4", "Python 7", "MuleSoft", "Tibco"  
    
-   **Components:** "SN MidServer", "JAVASCRPT X V93.47", "AI Agent Y"
-   **Services:** "Database Support"**, "**Middleware Support", "PC Support", "Windows Server/VM Support",
-   **Offerings:** "Database \[EMEA, PROD\]", "Database \[LATAM, PROD\]", "Database \[EMEA, NON-PROD\]", "Windows PC \[NL\]", "IT Service Management \[PROD\]",  
    "Windows VM \[AZURE\]","Windows VM \[OCI\]", "Windows VM \[AWS\]"
-   **Service Instances:** "PRD.Service-Now.com", "DEV.Service-Now.com", "SQL-Server@VM2028038", "API-32312"
-   **Assets/Service Delivery Systems:** "PC21213", "MasterDB@SQL-Server@VM2028038", "Jeroens iPhone"
-   **Asset/Product Model:** "Windows 11 Operating System", "Notepad++"; "Calculator 7.5.3", "Dell 7534 Laptop", "SQL Server 2021"

**What to use where?**

**![](https://javc.nl/wp-content/uploads/2025/09/CSDM5_core_objects.png)**

ITSM processes such as Incident, Change, and Problem management refer to the following:

-   The **Service Instance** that is impacted by the incident, change, or problem
-   The **Service Offering**, which includes the commitments and subscriptions that apply to this (and similar other) Service Instances
-   The **Service**, of which the Offering is a variant of (i.e., the parent of the Service Offering)
-   The **Service Delivery System (aka** **Configuration item/Asset),** which support the Service Instances and that are assigned directly to the User (e.g., the user's PC/Phone).  
    
-   The Provider's **Assignment Group** and **the Assigned Agent,** responsible for fulfilling the change, incident, or problem.
-   The **Consumer** (incl. related data such as company, location, etc) who is impacted by the change, incident, or problem.

Other, non-ITSM Practices also have requirements for CSDM, even if those practices may not be implemented in ServiceNow:

-   **Enterprise Architects** need to know how many instances of their portfolio artefacts are still deployed/used.
-   **SecOps** needs information about vulnerabilities in all environments, not just production environments.
-   **DevOps** needs to be able to determine the whereabouts and the versions of the components that are deployed.
-   **Projects** need to know which deployed API's, Microservices, AI Agents, etc., are available and may be consumed.
-   **Transition Managers** need to know the current state/quantities that they need to transition.
-   **Financial Asset Managers** need to know which assets/licenses are used by whom and/or which may be harvested since they are no longer being utilized.
-   **Identity and Access Managers** need to know which items one may (no longer) request/authorize access to.
-   **Risk managers** need to know if the discovered configurations are compliant with the polices and authorized baselines.
-   **Artificial Intelligence** needs to know the relevant items in the IT infrastructure, incl. its interdependencies and who may be using it for what.
-   **HR Managers and Line Managers** need to know which roles, assets, and identities have been assigned to their employees.
-   **End-user Device managers** need to know how many items of each age/version are still in use.
-   **Service Delivery Managers** need to know which services they consume from their partners.
