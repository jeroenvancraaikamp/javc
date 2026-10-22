---
title: "How to Manage Innovation and Maintenance of the ServiceNow Platform"
date: 2024-11-03
categories: ["ServiceNow"]
excerpt: "I often get asked how to best manage the ServiceNow Platform. I typically advise the following basic concept and then customize my advice to make it fit for purpose and audience:"
image: "https://javc.nl/wp-content/uploads/2024/11/SN-Agile-Mngt.webp"
readingTime: 6
---

I often get asked how to best manage the ServiceNow Platform. I typically advise the following basic concept and then customize my advice to make it fit for purpose and audience:

### 

-   First get the recommended Principles endorsed up to CIO/CTO Level.

-   ServiceNow is a platform that enables market standard practices, out of the box.
-   The Platform is pre-configured (by ServiceNow) to support the documented processes incl. its defined roles, flows and metrics  
    The Enterprise adopts the ServiceNow practices and its roles, rather than customizing the platform/practices continuing legacy practices.
-   The Platform supports a blend of market standards (e.g. IT4IT, ITIL, SAFe, SCRUM, etc.) but -as a blend- is no longer 100% compliant with the original standards
-   Configuration of the Out of the Box platform and its Data Model is allowed, if such configuration is justifiable and approved by the designated design authority.
-   The Platform, including its applications and its modules are used for intended purpose, by intended audience, set forth in Documentation.
-   The Platform is upgraded at least once per year (preferably twice per year), 4 months after general availability of the Major Platform Release.
-   The use/upgrade of Out of the Box integrations are preferred, over creating and maintaining custom integrations.
-   Access to the Platform and Data therein is documented,(role based access), authorized and managed.
-   The Platform is (to be) configured as per agreed coding best practices
-   The Enterprise will adhere to the contractual and legal obligations, and to the applicable enterprise policies and standards, that apply to the Platform

-   Then ensure, there is consensus on the **division of responsibility**

-   -   The ServiceNow team makes available the best practice processes incl. the SAAS platform that enables those.
    -   The ServiceNow team integrates the ServiceNow platform with other IT4IT platforms, within the security and architecture guidelines
    -   The ServiceNow team assists the line organization in adopting the processes and training local champions.
    -   The ServiceNow team provides second line support both on processes as well as on the Platform.
    -   The Regional Line organization appoints process managers who manage/coordinate the processes in the Region.
    -   The Local Line organization makes available trained/skilled fulfillers who execute the processes.
    -   The Service Desk provides first-line support to platform users.

### 

-   The **innovation of the Platform** is managed in ServiceNow, using Agile Management (we eat our own dogfood).

-   -   The Platform has a (1) Platform Owner who a Platform Architect supports. Both are recommended to be under the management of the Enterprise.
    -   The Platform Owner is accountable for the platform and the supported processes, incl. its budget, policy compliance, contracts, team skills and headcount.
    -   On a quarterly basis, together with the ServiceNow Product Owners, the Platform owner defines and maintains the Themes and Epics for the Products on the Platform.  
        Platform Owner agrees (budget for, and priority off) the Themes with the Business Stakeholders and the Sponsors of the Platform Themes.
    -   Platform Owner may outsource development and implementation of a particular theme under a Statement of Work, that is based on an Obligation of Result.
    -   The Platform Architect maintains a high-level technical design/roadmap for the Platform and liaises intended purpose, intended audience and platform integrations with Domain/Enterprise Architects, Risk/Compliance Officers and Security.
    -   The Platform consists of multiple defined applications (e.g. ITSM, ITOM, IRM, CSM, ESM, NOW, etc.), that may be grouped into Products, each Product has a product owner owning the Product's unique themes, epics and stories. "NOW" is the Platform incl. the capabilities shared across multiple products.
    -   Product Owners gather enhancement requests from stakeholders (i.e. What?) and -with the DevOps team- convert them into Stories (i.e. How?)
    -   The Product Owners liaise received project demand and enhancement requests from the relevant process owners and the solution architect,
    -   The Process Owners define the (changes to) the supported Processes (incl. related KPI's, policies, procedures and guidelines).
    -   The stories are delivered and integration-tested by one DevOps team that innovates and maintains all products,
    -   The stories are delivered are user-accepted by the Product Owners on behalf of (or together with) representatives of the ServiceNow Community

### 

-   The **maintenance of the Platform** is done via the Implemented ITSM Processes (we drink our own champagne).

-   The (local/regional) Service Desk that supports the local community is the first point of contact for (Major) Incidents relating to ServiceNow
-   The (local/regional) process managers consult the process owner regarding the interpretation and improvement of the process collateral.
-   In case of a Major Incident with ServiceNow, the company's Major Incident Managers will manage/coordinate the outage resolution.
-   The ServiceNow team provides 2nd line support to Process Managers and Service Desks.
-   The Now Platform is upgraded (once or twice per annum). The NOW Platform Product Owner, is accountable for the NOW Platform Upgrade that is carried out by the DevOps team. Impacted ServiceNow Product Owners, ensure their products are regression tested, user accepted, and fixed if/where needed before production release.

### 

-   The Processes that are supported, are adhered to, and are managed by the local/regional line organization

-   The line organization assigns adequately skilled/certified staff to the defined process roles.
-   Together with (local/regional) Process Managers, Process Champions ensures that the processes and work instructions are adopted
-   The Process fulfillers adhere to the implemented processes and local work instructions
-   The (local/regional) Process Managers monitor process adherence/performance/maturity and implement any improvements if/where needed.
-   The (local/regional) Process Manager and Process Champions provide 1st line process support to the fulfillers in their location/region

### 

-   Enterprises are encouraged to define and agree on Governance:

-   -   Platform Ownership, incl. the stakeholders, periodic meetings, agenda/topics (e.g. Architecture, Integrations, Vision, Platform/Process Roadmap)
    -   Strategic Management, incl. the stakeholders, periodic meetings, agenda/topics (e.g. Themes, Epics, Process Performance, Projects)
    -   Tactical Management, incl. the stakeholders, periodic meetings, agenda/topics (e.g. enhancements, process design, KPI's, PPI's)
    -   Operational Management, incl. the stakeholders, periodic meetings, agenda/topics (e.g. defects, metrics, data quality, etc)

## Notes:

-   A person may execute more than one of the roles listed above, as long as they are properly skilled/trained to execute the role(s).

-   Typically a product owner, can manage/own multiple (similar) products, especially if the stakeholders are the same persons.
-   Platform Owners, Product Owners and Platform Architects should be adequately trained and have at least 3-5 years experience on the platform
-   DevOps Engineers must be certified by ServiceNow on the Products that they work on.

-   Large Enterprises are advised to procure Platform Licenses directly from ServiceNow, thus avoiding partner lock-in.
-   Many Enterprises partly outsource innovation and maintenance of the ServiceNow Platform and the Supported processes.
    -   Outsourcing of Platform Owner, Platform Architect and Product Owners is not recommended.
    -   Outsourcing of Process Owners and Process Subject Matter Experts is not recommended.
    -   2nd Line Platform Support may be outsourced, especially if the Platform is to be supported globally or 24x7
    -   Outsourcing of DevOps is recommended if ServiceNow is categorized as a commodity SAAS platform.
-   Having said above, Enterprises may benefit from third parties' experience in defining and implementing the processes and its roles.

-   It is highly recommended to define the target operating and sourcing model as soon as possible, so that this can be taken in account during transition
-   During the transition, internal resources may be hired/appointed and trained/coached by the implementation partner.

## In a Picture the above looks like:

![](https://javc.nl/wp-content/uploads/2024/11/SN-Operating-Model-1.png)
