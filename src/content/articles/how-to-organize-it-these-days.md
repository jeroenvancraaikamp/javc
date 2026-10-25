---
title: "Structuring IT the Smart Way: Six Top-level Services for Enterprises"
date: 2025-08-27
categories: ["IT4IT","Uncategorized"]
excerpt: ""
image: "/wp-content/uploads/2025/08/TBM-Governance-1.png"
readingTime: 9
---

For many organizations, IT is still structured around systems, platforms, or departments. While that might have worked in the past, it often results in fragmented ownership, blurred accountabilities, and difficulties aligning with business needs. A better way forward is to structure IT around **six top-level services**, derived from the **six solution types in the TBM (Technology Business Management) 5 framework**. This model creates clarity, aligns IT with business value, and allows enterprises to manage technology at the right level of abstraction. By structuring IT around these six service portfolios, organizations gain clarity, accountability, and agility. Business leaders focus on outcomes, technical teams optimize delivery, and governance remains intact. This model ensures IT is no longer a collection of systems and silos, but a portfolio of services delivering measurable business value—controlled end-to-end through Delivery.

## The Six Top-Level Services

Based on TBM 5, IT can be structured into the following six top-level services. Each service contains a set of services—the “building blocks” of how IT is delivered—and has its own **service-specific tools/products** to enable them.

### 1\. Workplace

**Scope:** Client Computing, Communication & Collaboration, Connectivity.

-   **Capabilities:** End-user devices, unified communications, messaging, secure access (wired, wireless, VPN).
-   **Typical Products:** Microsoft Intune, JAMF, Citrix Workspace, Zoom, Teams, Slack, ServiceNow Device Management.
-   **Outsourcing vs. in-house:** Device provisioning, field support, and patching may be outsourced; policies, identity integration, and user experience design remain in-house.

### 2\. Business

**Scope:** Sales & Marketing, Customer Service.

-   **Capabilities:** CRM, marketing automation, order management, omnichannel service.
-   **Typical Products:** Salesforce CRM, HubSpot, SAP CX, Zendesk, Adobe Marketing Cloud.
-   **Outsourcing vs. in-house:** Platform hosting and commodity CRM setup may be outsourced; ownership of customer data, sales processes, and service policies remains in-house.

### 3\. Shared & Corporate

**Scope:** Workforce, Health & Safety, ESG, Legal, Corporate Communications, Finance, Procurement.

-   **Capabilities:** HR processes (recruitment, payroll, performance, workforce management), ESG tracking, legal counsel, corporate risk management, stakeholder communications.
-   **Typical Products:** Workday, SuccessFactors, Coupa, Ariba, ServiceNow HRSD, Diligent GRC.
-   **Outsourcing vs. in-house:** Payroll, benefits, and transactional HR processes are frequently outsourced; compliance, legal oversight, and communications strategy stay in-house.

The Shared & Corporate services replicate IT service processes (requests, approvals, case management) for enterprise support functions. Consolidating them under **Enterprise Service Management (ESM)** ensures consistency, efficiency, and a unified service portal across IT, HR, Finance, Legal, and Facilities.

### 4\. Delivery

**Scope:** Development, Support, Security & Compliance, Enabling Platforms.

-   **Capabilities:** DevOps, testing, application hosting, ITSM, security, identity & access, middleware, API management.
-   **Typical Products:** GitLab, Azure DevOps, Jenkins, ServiceNow ITSM, Jira, Confluence, Okta, MuleSoft, Datadog.
-   **Cross-cutting principle:** Tools that span multiple services (e.g., ITSM platforms, observability, integration middleware) fall under this category. Delivery Services provide the “nervous system” that binds the other services together.
-   **Outsourcing vs. in-house:** Development capacity, tier-1 support, and tool maintenance may be outsourced; architecture, governance, and lifecycle control must remain in-house.

### 5\. Infrastructure

**Scope:** Compute, Data Center, Network, Storage.

-   **Capabilities:** Enterprise data centers, cloud hosting, connectivity, storage, and enterprise networks.
-   **Typical Products:** VMware, AWS Console, Azure Portal, Cisco DNA Center, NetApp, Palo Alto Networks.
-   **Outsourcing vs. in-house:** Infrastructure hosting is heavily outsourced; orchestration, network strategy, and security oversight remain in-house.

### 6\. Artificial Intelligence

**Scope:** Generative, Predictive, Interpretive, Agentic AI.

-   **Capabilities:** AI model training, content generation, predictive analytics, and decision support.
-   **Typical Products** OpenAI, Microsoft Copilot, Google Vertex AI, AWS Bedrock, TensorFlow, PyTorch, and custom ML Ops platforms.
-   **Outsourcing vs. in-house:** Model hosting and generic AI services are often outsourced; training data, applied AI use cases, and governance of AI ethics must remain in-house.

## Business vs. Technical

The six service types can be grouped into two families:

-   **Business (blue in the model):** Directly visible to the enterprise—covering workplace tools, sales & customer engagement, and corporate operations. Their purpose is to enable measurable business outcomes.
-   **Technical (orange in the model):** Less visible to end-users but critical to resilience and innovation. These include delivery, infrastructure, and AI services.

The distinction is crucial: **business services define *what* IT enables, while technical services define *how* IT enables it.** Why These Six Top-level Services Make Sense

-   **Complete coverage of IT** – Every capability, from end-user devices to predictive AI, has its place.
-   **Accountability and ownership** – Each service type has a clear responsibility, lifecycle, and governance.
-   **Balanced sourcing** – Commodity functions can be outsourced; governance and strategic data ownership remain in-house.
-   **Lifecycle control** – With Delivery Services at the core, enterprises remain in control from ideation to retirement.
-   **Future-proofing** – AI as a standalone service category reflects its strategic importance.
-   **Enterprise Service Management** – Consolidating Shared & Corporate Services under ESM reduces duplication and improves the employee experience.

## Governance

The model comprises "Service Portfolios", "Services", "Service Offerings" and "Products/Tools". These artefacts coexist with Processes and Data. All of these need to be owned and managed, by Accountable Owners and Responsible Managers.

-   The Top-level Services each have their own **Service Owner**, a senior person within the company, accountable for all Services in their domain.
-   The Services within the Portfolio are also owned by **Service Owners.** who are accountable for the (cost/budget, and roadmaps of) their service and all of its offerings
-   The Product-specific Service Offerings are owned by **Service Delivery Managers,** who are accountable for Delivery of that Offering
-   The Products/tools that enable those Services are owned by **Product Owners**. who are accountable for innovation and maintenance of the Product.
-   The Processes that are facilitated by the Products are owned by **Process Owners,** who are accountable for process definition and improvement
-   Process Managers oversee individual tasks within their domain/region is done as per the defined process. They also may fulfill process-specific roles. They are responsible for process adherence/improvement within their domain, but they are not accountable for it
-   The Activities/Tasks, incl. associated task data, is the responsibility of the i**ndividual members** of the **team/squad** that fulfill the tasks (aka Fulfillers).
-   Accountability for Process Adherence, lies with **Line Management** of the Fulfiller.
-   **Program Managers, and Project Managers**, are responsible for management of change. Their work has a defined start and end, and they don't own anything.
-   **Data Stewards** are Fulfillers who own data and who are responsible for the data quality of that data. The accountability of the data (and its data quality) lies with the Owner of the Product, Process, Service, Offering, or Tasks which that data is integral part of.
-   For some specific Data, an accountable **(Master) Data Owner** is assigned. E.g., Master Data artefacts such as "currency", "company" and "country", typically has one (Master) Data Owner. irrespective where that data is stored/used, what that data is used for, and how it is being maintained. This ensures, individual product owners, do not define their own product-specific "currency". "company" or "country" names.

BTW: Typically 90% of the people are a Fulfiller and the remaining 10% fill in the various owner/manager roles.   Most company have the roles above embedded in their operating model and governance. With the implementation of frameworks such as SAFe, SCRUM, DevSecOps, etc, additional roles and accountabilities may be defined and slightly the roles above are named differently (e.g. Tribe Lead, Chapter Lead). No matter which frameworks or which role names are being used, accountability must exist for People, Process, Services, Products and Data. Service Portfolio Owners, Service Owners and Process Owners, are internal employees. Service Delivery Managers and Product Owners, ideally should be internal employees, Product Owners and team/squad members (aka fulfillers) should be an employee of the company that owns the Product. The following governance bodies are recommended:

-   Quarterly Business Review (6 Service Portfolio Owners, incl. their Service Owners, Platform Owners and Enterprise Process Owners)
-   Monthly Service Portfolio Owner Board (6 Service Portfolio Owners)
-   Monthly Service Portfolio Stakeholder Meeting (1 Service Portfolio Owner with his key stakeholders)
-   Monthly Service Portfolio Management Meeting (1 Service Portfolio Owner with all of their Service/Offering Owners)
-   Monthly Service Owner Meeting (1 Service Owner and relevant process owners for that Service)
-   Monthly Enterprise Process Owner Board (all relevant Enterprise Process Owners for 1 Service Portfolio)
-   Monthly Domain Process Owner Meeting (1 Enterprise Process Owner with the Domain/Regional Process Owners for a process)
-   Weekly Local/Regional Process Meeting (1 Domain/Regional Process Owner and all of their local Process Managers for a processes)
-   Weekly Product Enhancement Meeting (1 Product Owner with their stakeholders, e.g. enterprise process owners)

## Sourcing Strategy

  **Products (aka Solution) and Services are fundamentally different things. They may overlap but are not interchangeable.** That said, service offerings may be product/solution-specific and/or location-specific. E.g. the service "Client Computing" in the "Workplace Portfolio", comprises of the products/solutions "Windows Laptop", "MAC Laptop". etc., which are offered as part of the offering "Personal Computer \[NL\]", or "Windows PC \[EMEA\]". The ownership of each of these artefacts lies with a different party/person. Herein it is assumed that Companies consume Services from its internal providers, from external providers, or from a mix thereof. The Service may be a Management Service of a solution that is owned by the company (labor only) or a Service of a solution that is owned by the Provider and/or of a solution that is owned by a Third Party. Things can become really complex if a services comprises of multiple solutions that are owned/managed by different internal/external parties. By organizing IT around a limited set of services, accountabilities and commitments can be clearly defined, independent of ownership of the solutions that it comprises. The (management of) commodity products may well be outsourced, locally, near-shore (within you continent/region), or off-shore (e.g. India, Philippines, or China). The Ownership of commodity products that are provided "as a Service", may lie with the Provider of the Service. The company must assign an internal Service Owner, who liaises with the provider of the Services (on strategic/tactical level), and with relevant stakeholders (internal customers) within the company. The Service Delivery Managers liaise with the Service Provider (on operational level) about product/region/location-specific commitments, subscriptions, and entitlements that apply to their offering. Furthermore, they manage operational escalation if these commitments are not met by the Service Provider. The ownership of (intellectual property of) business differentiating solutions incl. related services and offerings, must lie with the company, That said, the enabling platform for such business solutions may be provided and managed by (a partner of) the vendor. The management of a Business solution may be outsourced, as long as **the ownership of the (intellectual property of the) Business solution (incl. the data therein) remains within the company.**
