---
title: "Why reinvent the wheel? Use TBM 5.0 Content in the CSDM 5.0 Data Model"
date: 2025-08-22
categories: ["ServiceNow","TBM/CSDM/CMDB","Uncategorized"]
excerpt: "ServiceNow defined a Common Service Data model (CSDM5) without content. The TBM Council defined both a data model (TBM5) and its content. This article describes how to populate the content of TBM5 into CSDM5. TBM5 defined/described (relations between) artifacts for"
image: "/wp-content/uploads/2025/08/inventing_the_wheel.png"
readingTime: 9
---

ServiceNow defined a Common Service Data model (CSDM5) without content. The TBM Council defined both a data model (TBM5) and its content. This article describes how to populate the content of TBM5 into CSDM5.

![](/wp-content/uploads/2025/08/TBM5-600x281.png)

TBM5 defined/described (relations between) artifacts for "Technology Consumers" (who?), "Technology Solutions" (what?), "Technology Resource Towers" (how?), and "Technology Cost Pools" (how much?). You can [**download a free copy of the TBM 5.0.**](https://www.tbmcouncil.org/learn-tbm/resource-center/the-tbm-taxonomy-5/)

CSDM5 defined/described who, what, how, and how much, albeit its focus is more on ITSM/ITOM than on ITAM/ITFM. CSDM5 defined/described (relations between) artifacts for the domains "Ideation & Strategy", "Design & Plan", "Build & Integration", "Service Delivery", "Service Consumption", and "Foundation". CSDM5 differentiates between baselines (e.g., Products, Components, Models, Services, and Offerings) and instances (e.g., Service Instances, Configuration Items, and Assets).. You can [***download a free copy of the CSDM 5.0***](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiMzcSloaaPAxVKgP0HHaDLKu4QFnoECCEQAQ&url=https%3A%2F%2Fwww.servicenow.com%2Fcommunity%2Fs%2Fcgfwn76974%2Fattachments%2Fcgfwn76974%2Fcommon-service-data-model-kb%2F744%2F3%2FCSDM%25205%2520w%2520links.pdf&usg=AOvVaw1wlx0sDj-JFaye_6EnN2v1&opi=89978449)

Considerations & Constraints

When mapping TBM6 content on the CSDM5 model, one needs to consider the following:

-   **TBM5 Technology Consumer****s** are defined as Entities that CSDM5 labels as **Foundation Artifacts**. TBM5 Capabilities are organizational entities; they are not Technical/Functional Capabilities, which are described in TBM5 as solutions. The TBM5 Entities are spread across various CSDM5 Foundation Tables in ServiceNow, which are filled with data that comes from Authorized Sources (e.g., ISO-3166 Countries/Continents, ISO-3166-2 Provinces/States, Languages, Currencies, Time-zones, Companies, Departments, Business Units, Employees, etc.)
-   ServiceNow can manage different types of **CSDM5 Digital Portfolios**, e.g., Application Portfolio, Service Portfolio, Service Instance Portfolio, or Project/Demand Portfolio. Each Portfolio type can hold multiple portfolios, each having its own Portfolio Owner. Each Portfolio is part of the Digital Portfolio.
-   Three **CSDM5 Catalogs** are defined: Service Catalog, Product Catalog, and Sales Catalog. The Service Catalog contains the non-versioned services that are provided and that may be consumed. The Product Catalog includes major-versioned products (with potentially minor-versioned components) that are (to be) authorized for deployment. The sales catalog contains (variants of) the items that may be ordered/requested by employees. TBM5 does not define any of these catalogs; hence, there is no mapping.
-   **TBM5 Solutions** are a mix of product-agnostic items that CSDM5 has defined as Capabilities (baselines). The TBM5 white paper mentions assets and configuration items (instances), but does not provide content for them. Ie., **one can only map TBM5 content for baselines/models into CSDM5 tables.**
-   CSDM5 is aligned with ServiceNow's **CMDB class model**, containing approximately 1400 different types/classes of configuration items that one may find in the IT landscape. Each Instance Asset/CI is associated with only one CMDB Class, with one Baseline Model, with one Model Category, and one Parent Model Category. The Product Models in ServiceNow are left "as discovered" or "as federated" by ITOM Visibility. **The TBM5 Technology Resource (Sub-) Towers are modeled as (Parent) Model-Categories in ServiceNow.**
-   In TBM5, **Service Offerings** are product-specific. However, in CSDM5, Services Offerings are variants of Services and Services are (or rather: should be) product-agnostic.
-   CSDM5 defines **Service Instances**, which are Configuration Items that may be provided "as (part of)a Service". Service Instances may be related many-to-many to Service Offerings. **Service Instances are the most obvious CIs that can be referred to in incidents or changes**. E.g. "Workday \[Production\]" or "SAP Business Warehouse \[EMEA, Production\]".

### The Bigger Picture

This article focusses on mapping of the TBM5 "Solutions" to CSDM5, even though you probably could also map TBM5 "Technology Resource Towers" and "Cost Pools" to ServiceNow, e.g. if you have procured the "IT Asset Management", "IT Financial Management", "Strategic Portfolio Management applications of ServiceNow, for which there is little support in CSDM5.

The picture below contains the (relation between the) CSDM5 artefacts and how the TBM5 content is mapped to CSDM5.

-   The Product-agnostic Solution Types are CSDM5 Level-0 Business Capabilities
-   The Product-agnostic Solution Categories are CSDM5 Level-1 Business Capabilities
-   The Product-agnostic Solution Names are CSDM5 Level-2 Business Capabilities

-   The Product-specific Solution Offerings are CSDM5 Business Applications (one Application may Provide zero or more Capabilities) or are Technical Products that at offered as a Service (e.g. "Azure Cloud")
-   The Product-specific CSDM5 Service Instances are linked to both the CSDM5 Services and to the CSDM5 Offerings, the instances are deployment/environment-specific.

![](/wp-content/uploads/2025/09/TBM5_in_CSDM_V2.png)

### TBM5 Solutions

In TBM5, solutions can either be a product or a service. The TBM5 Solutions are grouped into 6 Types (3 for Business Solutions and 3 for Technical Solutions). The 6 types, in turn, contain a total of 32 Categories. The Categories contain 141 fine-grained solutions.

"Workplace", "Business", and "Share & Corporate" are Solution Types that are available to the Business. These are supported by Technical "Delivery", "Infrastructure", and "Artificial Intelligence Solution Types. The types are modelled as Taxonomy Nodes in the Service Portfolio(s). The categories contained by the solution types are modeled either as Business Services or Technical Services in ServiceNow. depending of the Type of the Solution.

"Business" is a special solution type, that companies can structure in line with the companies business. E.g. a financial enterprise, may want to model its business solutions differently from a retailer. TBM Council defined market specific Business Solution Taxonomies, that may be used here as well.

"Enabling Platforms" and "Artificial Intelligence" are considered to be a technical Services, similar to Infrastructure. These support the Business Services, but are not part of the Business Services. This enables companies, to manage the lifecycle of technical services, to be managed/governed differently from the business services.

The 141 solutions in TBM5 are too fine-grained to be used as Services or Offerings in ServiceNow. Instead, these solutions are modelled as (Business or Technical) Capabilities. The capabilities van be related to business/technical baselines (e.g., Applications, Products, Services, or Offerings).

![](/wp-content/uploads/2025/08/TBM5_Solutions.png)

### Business Capabilities

-   **1 Workspace**
    -   1.1 Client Computing
        -   1.1.1 Bring Your Own Device
        -   1.1.2 Computer
        -   1.1.3 Mobile
        -   1.1.4 Virtual Client
    -   1.2 Communication & Collaboration
        -   1.2.1 Collaboration
        -   1.2.2 Communication
        -   1.2.3 Print
        -   1.2.4 Productivity
    -   1.3 Connectivity
        -   1.3.1 Network Access
        -   1.3.2 Remote Access
-   **2 Business**
    -   2.1 Product Management
        -   2.1.1 Product Development
        -   2.1.2 Product Planning
    -   2.2 Sales & Marketing
        -   2.2.1 Customer Analytics
        -   2.2.2 Customer Sales
        -   2.2.3 Marketing & Advertising
        -   2.2.4 Sales Force & Channel Management
    -   2.3 Manufacturing & Delivery
        -   2.3.1 Inventory & Warehousing
        -   2.3.2 Manufacturing
        -   2.3.3 Product Delivery
        -   2.3.4 Service Delivery
        -   2.3.5 Resource Planning
    -   2.4 Customer Service
        -   2.4.1 Order Management
        -   2.4.2 Customer Care
-   **3 Shared & Corporate**
    -   3.1 Finance
        -   3.1.1 Planning & Management Accounting
        -   3.1.2 Revenue Accounting
        -   3.1.3 Accounts Receivable
        -   3.1.4 General Accounting & Reporting
        -   3.1.5 Project Accounting
        -   3.1.6 Payroll & Time Reporting
        -   3.1.7 Accounts Payables & Expense Reimbursement
        -   3.1.8 Treasury
        -   3.1.9 Tax
    -   3.2 Workforce
        -   3.2.1 Recruitment
        -   3.2.2 Employee Transitions & Separation
        -   3.2.3 Workforce Management
        -   3.2.4 Performance, Retention & Rewards Management
        -   3.2.5 Benefits Management
        -   3.2.6 Policy Management
        -   3.2.7 Employee Development
        -   3.2.8 Employee Communications & Relations
    -   3.3 Vendor & Procurement
        -   3.3.1 Sourcing and Procurement
        -   3.3.2 Supplier Management
        -   3.3.3 Contract Management
    -   3.4 Health, Safety, Security, and Environmental
        -   3.4.1 Policy & Governance
        -   3.4.2 Oversight & Enforcement
        -   3.4.3 Healthcare Services
        -   3.4.4 Occupational Safety
    -   3.5 Risk, Audit & Compliance
        -   3.5.1 Risk Management
        -   3.5.2 Breach Management & Remediation
        -   3.5.3 Business Continuity Planning & Management
        -   3.5.4 Auditing
        -   3.5.5 Investigations
        -   3.5.6 Records Management
    -   3.6 Legal
        -   3.6.1 Legal Counsel
        -   3.6.2 Case Management
        -   3.6.3 Contract Review
    -   3.7 Property & Facility
        -   3.7.1 Development & Space Planning
        -   3.7.2 Workspace Solutions
        -   3.7.3 Physical Security
        -   3.7.4 Operations, Maintenance, Repair & Improvements
        -   3.7.5 Fleet Management (non- logistics)
        -   3.7.6 Food & Beverage
    -   3.8 Corporate Communications
        -   3.8.1 Stakeholder Relations
        -   3.8.2 Government Relations
        -   3.8.3 External Communications
        -   3.8.4 Community Outreach
    -   3.9 Sustainability & ESG
        -   3.9.1 Carbon Accounting & Emission Reporting
        -   3.9.2 ESG Data Integration
        -   3.9.3 Supplier Sustainability Monitoring
        -   3.9.4 Sustainability Performance Dashboarding

### Technical Capabilities

-   **4\. Delivery**
    -   4.1 Strategy & Planning
        -   4.1.1 Enterprise Architecture
        -   4.1.2 Business Solution Consulting
        -   4.1.3 Technology Business Management
        -   4.1.4 Innovation & Ideation
        -   4.1.5 Technology Vendor Management
        -   4.1.6 Program, Product & Project Management
    -   4.2 Development
        -   4.2.1 Design & Development
        -   4.2.2 System Integration
        -   4.2.3 Modernization & Migration
        -   4.2.4 Testing
    -   4.3 Operations
        -   4.3.1 Deployment & Administration
        -   4.3.2 Tech Service Management
        -   4.3.3 Capacity Management
        -   4.3.4 Event Management
        -   4.3.5 Scheduling
    -   4.4 Support
        -   4.4.1 Application Support
        -   4.4.2 Central Print
        -   4.4.3 Tech Training
        -   4.4.4 Service Desk
    -   4.5 Security & Compliance
        -   4.5.1 Identity & Access Management
        -   4.5.2 Security Awareness
        -   4.5.3 Cyber Security & Incident Response
        -   4.5.4 Threat & Vulnerability Management
        -   4.5.5 Data Privacy & Security
        -   4.5.6 Governance, Risk & Compliance
        -   4.5.7 Business Continuity & Disaster Recovery
    -   4.6 Enabling Platforms
        
        -   4.6.1 Application Hosting
        -   4.6.2 Development Platform
        -   4.6.3 Foundation Platform
        -   4.6.4 Message Bus & Integration
        -   4.6.5 Content Management
        -   4.6.6 Search
        
        -   4.6.7 Streaming
-   **5\. Infrastructure**
    -   5.1 Compute
        -   5.1.1 Compute on Demand
        -   5.1.2 Mainframe
        -   5.1.3 Physical Compute
        -   5.1.4 Virtual Compute & Containers
    -   5.2 Data Center
        -   5.2.1 Enterprise Data Center
        -   5.2.2 Other Data Center
    -   5.3 Data
        -   5.3.1 Database
        -   5.3.2 Distributed Cache
        -   5.3.3 Data Management
        -   5.3.4 Data Warehouse
        -   5.3.5 Data Analytics & Visualizations
    -   5.4 Network
        -   5.4.1 Domain Solutions
        -   5.4.2 Internet Connectivity
        -   5.4.3 Load Balancing
        -   5.4.4 Virtual Private Network
        -   5.4.5 Data Network
        -   5.4.6 Voice Network
    -   5.5 Storage
        -   5.5.1 File & Object Storage
        -   5.5.2 Backup & Archive
        -   5.5.3 Networked Storage
        -   5.5.4 Distributed Storage (CDN)
-   **6\. Artificial Intelligence**
    -   6.1 Agentic
        -   6.1.1 Autonomous Navigation
        -   6.1.2 Autonomous Workflow Agent
        -   6.1.3 Intelligent Process Automation (IPA)
    -   6.2 Generative
        -   6.2.1 Image & Video Generation
        -   6.2.2 Speech, Music, and Audio Generation
        -   6.2.3 Synthetic Data Generation
        -   6.2.4 Text Generation
    -   6.3 Interpretive
        -   6.3.1 Computer Vision
        -   6.3.2 Document Processing
        -   6.3.3 Natural Language Processes
        -   6.3.4 Speech Recognition & Processing
    -   6.4 Predictive
        -   6.4.1 Predictive Analytics
        -   6.4.2 Risk Scoring
    -   6.5 Prescriptive
        -   6.5.1 Automated Planning & Scheduling
        -   6.5.2 Decision Optimization
        -   6.5.3 Recommendation Services
