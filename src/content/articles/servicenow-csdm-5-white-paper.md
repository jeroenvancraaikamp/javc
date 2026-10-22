---
title: "ServiceNow published CSDM 5"
date: 2025-05-11
categories: ["IT4IT","TBM/CSDM/CMDB"]
excerpt: "On May 8, 2025, ServiceNow released its long-anticipated Common Service Data Model (CSDM) 5 white paper . This 63-page document marks a significant evolution of the data model that underpins many ServiceNow implementations across IT organizations globally. CSDM 5 introduces"
image: "https://javc.nl/wp-content/uploads/2025/05/CSDM5_final.png"
readingTime: 5
---

On May 8, 2025, ServiceNow released its long-anticipated [**Common Service Data Model (CSDM) 5 white paper**](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf). This 63-page document marks a significant evolution of the data model that underpins many ServiceNow implementations across IT organizations globally.

**CSDM 5 introduces a refined structure consisting of seven domains**, each representing a core capability area:  

  
2.  Ideation & Strategy
  
4.  Design & Planning
  
6.  Manage Portfolio
  
8.  Build & Integration
  
10.  Service Delivery
  
12.  Service Consumption
  
14.  Foundation
  

  
Compared to the previous CSDM 4 -released four years ago- the updated model brings several conceptual and structural improvements. Below is a summary of the Top 10 notable changes:  

  
2.  **Digital Product Portfolio** Just as in the IT4IT 3.0.1 standard, Applications, Services, and Products are now all treated as elements of a managed Digital Product Portfolio in the CDSM, emphasizing lifecycle ownership and value delivery.
  
4.  **New Domain: Ideation & Strategy** A new domain has been introduced to support strategic planning. It extends Demand Management with links to strategic goals, business plans, and investment priorities - providing a starting point for delivery workflows in the Build & Integration domain
  
6.  **Enhanced CMDB Structuring** The CMDB is now delineated into Services, Service Offerings, Service Instances, Service Delivery Network Items, and Dynamic CI Groups, each playing a more clearly defined role.
  
8.  **Expanded Definition of Service Instances** Beyond Application Services, Service Instances now encompass Data, Network, Connection, Facilities, and Operational Process types. These can be layered for composability and traceability.
  
10.  **Service Delivery Network Concept** A new umbrella term for a wide array of CMDB classes, the Service Delivery Network represents the full set of supporting Configuration Items for Service Instances.
  
12.  **Dynamic CI Groups** CIs can now be grouped dynamically based on query criteria—allowing incidents, problems, and changes to be logged at the group level, streamlining operational processes.
  
14.  **Lifecycle Status** Replaces Operational Status A gradual shift is underway from traditional install/operational states to lifecycle-based statuses and stages. CSDM 5 dedicates considerable attention to these lifecycle definitions.
  
16.  **Naming and Terminology Overhaul** Several artifacts have been renamed to better reflect their function. While the names may be lengthy, they are expected to be abbreviated in UI lists and forms.
  
18.  **AI Gets a Mention** (Of Course) CSDM 5 does reference Artificial Intelligence, though with minimal elaboration—leaving room for interpretation and future refinement.
  
20.  **Foundation Extensions** The foundational layer now includes Product Features, Software Bill of Materials (SBOM), and Value Streams—a nod to greater alignment with the IT4IT standard.
  

  
The CSDM 5 is aligned with the OpenGroup IT4IT 3.01 Standard, albeit a slightly different vocabulary is used to describe similar concepts. E.g. the IT4IT Value Chains "Plan", "Build", "Deliver" and "Run" are similar to the CSDM domains. Those who are looking for additional guidance on financial modeling of IT, will not find it in CSDM 5 or in IT4IT 3.0.1 for that matter. That said; one can however map the data/definitions of the Technology Business Management (TBM) Taxonomy 4.0/5.0 on the CSDM.

While the timing of the release -just ahead of ServiceNow Knowledge 2025- suggests a certain haste, the document does contain valuable insights. That said, several gaps and inconsistencies have been noted, suggesting that minor corrections or clarifications may appear in future iterations.

**Next steps:**

CSDM 5 is an important step forward - especially for enterprises aligning with IT4IT and open IT architecture frameworks. However, those who were waiting for a Common Service Data Model for **Enterprise Service Management (IT4ESM)** will need to be patient a little longer.

ServiceNow is already working on CSDM 5+ Draft, which includes a finer granular data model, with more artefacts/relations Looking ahead to CSDM 6 (expected in 2026), we can anticipate stronger modeling guidance around AI (especially agents), and clearer mapping of CSDM artifacts to operational practices.

I will not be surprised if the ServiceNow CSDM will be extended further in upcoming years, so that it covers Enterprise Service Management (ESM), Customer Service Management (CSM), Field Service Management (FSM) and Customer Relation Management (CRM).

**A CSDM 5 Implementation/Integration Scenario**

I created the diagram below to illustrate how the ServiceNow Common Service Data Model (CSDM 5) can be applied in conjunction with ITSM processes—specifically Incident, Problem, and Change Management—as well as with ITAM (Asset Management) in ServiceNow. In this model:  

  
-   ITSM process artifacts are always linked to a **Technical Service Offering**, along with **Foundation data** such as the caller, location, and assignment group.
  
-   Depending on the nature of the Service Offering, additional references may be recorded to a Service Instance, Dynamic CI Group, or a Service Delivery Network item.
  

  
To ensure accuracy and scalability, the recommended model assumes a **zero-touch CMDB**, where Configuration Items (CIs), Assets, and their dependencies are automatically discovered or federated—without manual intervention in ServiceNow. By the end of this decade, I expect many Service Delivery Network information to be provided by **AI Agents,** gradually replacing (and/or enriching) traditional daily discovery and federation mechanisms that are currently being used, **making the zero-touch CMDB an accurate real-time virtual data source.**

Currently, most companies already make use of Request Management within the **Service Delivery** domain of CSDM. The **Service Consumption** domain remains largely unexplored. As IT4IT evolves into IT4ESM (IT for **Enterprise Service Management**), the Service Consumption domain will become increasingly relevant. It will enable **Business Services** and **Business Service Offerings** to be linked not only to Employee Requests and Cases, but also to AI Agents serving domains such as IT, HR, Workplace Facilities, Finance, Legal, Risk, Business Continuity, Compliance, and Security Management.

**Sources:**  

  
-   ServiceNow, “[Common Service Data Model (CSDM) 5 White Paper,”](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf)
  
-   ServiceNow "[CSDM Documentation Portal"](https://csdm.servicenow.com)
  
-   The Open Group [IT4IT Standard, Version 3.0.1](https://pubs.opengroup.org/it4it/3.0.1/standard/)"
  
-   TBM Council [Technology Business Management (TBM) Taxonomy 4.0](https://higherlogicdownload.s3.amazonaws.com/TBMCOUNCIL/c15d372f-9951-46c8-9c3f-213c696401b6/UploadedImages/TBM_Taxonomy_V4_0.pdf) (PDF)
  

![](https://javc.nl/wp-content/uploads/2025/05/CSDM_5_final_may_2025-scaled.png)
