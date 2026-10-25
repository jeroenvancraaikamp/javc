---
title: "Waarom het wiel opnieuw uitvinden? Gebruik TBM 5.0-content in het CSDM 5.0-datamodel"
excerpt: "ServiceNow heeft een Common Service Data Model (CSDM5) gedefinieerd zonder content. De TBM Council heeft zowel een datamodel (TBM5) als de bijbehorende content gedefinieerd. Dit artikel beschrijft hoe je de content van TBM5 in CSDM5 kunt vullen. TBM5 definieert/beschrijft (relaties tussen) artefacten voor"
source: "6a8e0cade92d9495"
---

ServiceNow heeft een Common Service Data Model (CSDM5) gedefinieerd zonder content. De TBM Council heeft zowel een datamodel (TBM5) als de bijbehorende content gedefinieerd. Dit artikel beschrijft hoe je de content van TBM5 in CSDM5 kunt vullen.

![](/wp-content/uploads/2025/08/TBM5-600x281.png)

TBM5 definieert/beschrijft (relaties tussen) artefacten voor "Technology Consumers" (wie?), "Technology Solutions" (wat?), "Technology Resource Towers" (hoe?) en "Technology Cost Pools" (hoeveel?). Je kunt [**gratis een exemplaar van TBM 5.0 downloaden.**](https://www.tbmcouncil.org/learn-tbm/resource-center/the-tbm-taxonomy-5/)

CSDM5 definieert/beschrijft wie, wat, hoe en hoeveel, al ligt de focus meer op ITSM/ITOM dan op ITAM/ITFM. CSDM5 definieert/beschrijft (relaties tussen) artefacten voor de domeinen "Ideation & Strategy", "Design & Plan", "Build & Integration", "Service Delivery", "Service Consumption" en "Foundation". CSDM5 maakt onderscheid tussen baselines (bijv. Products, Components, Models, Services en Offerings) en instances (bijv. Service Instances, Configuration Items en Assets).. Je kunt [***gratis een exemplaar van CSDM 5.0 downloaden***](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiMzcSloaaPAxVKgP0HHaDLKu4QFnoECCEQAQ&url=https%3A%2F%2Fwww.servicenow.com%2Fcommunity%2Fs%2Fcgfwn76974%2Fattachments%2Fcgfwn76974%2Fcommon-service-data-model-kb%2F744%2F3%2FCSDM%25205%2520w%2520links.pdf&usg=AOvVaw1wlx0sDj-JFaye_6EnN2v1&opi=89978449)

Overwegingen & beperkingen

Bij het mappen van TBM6-content op het CSDM5-model moet je rekening houden met het volgende:

-   **TBM5 Technology Consumers** zijn gedefinieerd als Entities die CSDM5 aanduidt als **Foundation Artifacts**. TBM5 Capabilities zijn organisatorische entiteiten; het zijn geen technische/functionele capabilities, die in TBM5 als solutions worden beschreven. De TBM5 Entities zijn verspreid over diverse CSDM5 Foundation-tabellen in ServiceNow, die worden gevuld met data uit geautoriseerde bronnen (bijv. ISO-3166 landen/continenten, ISO-3166-2 provincies/staten, talen, valuta, tijdzones, bedrijven, afdelingen, business units, medewerkers enz.)
-   ServiceNow kan verschillende typen **CSDM5 Digital Portfolios** beheren, bijv. Application Portfolio, Service Portfolio, Service Instance Portfolio of Project/Demand Portfolio. Elk portfoliotype kan meerdere portfolio's bevatten, elk met een eigen portfolio owner. Elk portfolio maakt deel uit van het Digital Portfolio.
-   Er zijn drie **CSDM5-catalogi** gedefinieerd: Service Catalog, Product Catalog en Sales Catalog. De Service Catalog bevat de niet-geversioneerde services die worden geleverd en die afgenomen kunnen worden. De Product Catalog bevat producten met een major-versie (met mogelijk componenten met een minor-versie) die (nog) geautoriseerd zijn/worden voor deployment. De Sales Catalog bevat (varianten van) de items die medewerkers kunnen bestellen/aanvragen. TBM5 definieert geen van deze catalogi; er is dus geen mapping.
-   **TBM5 Solutions** zijn een mix van productonafhankelijke items die CSDM5 heeft gedefinieerd als Capabilities (baselines). De TBM5-whitepaper noemt assets en configuration items (instances), maar levert daarvoor geen content. Oftewel: **je kunt alleen TBM5-content voor baselines/models in CSDM5-tabellen mappen.**
-   CSDM5 is afgestemd op het **CMDB-classmodel** van ServiceNow, met ongeveer 1400 verschillende typen/classes configuration items die je in het IT-landschap kunt tegenkomen. Elke instance-asset/CI is gekoppeld aan slechts één CMDB-class, één baseline-model, één model category en één parent model category. De product models in ServiceNow blijven "zoals gediscoverd" of "zoals gefedereerd" door ITOM Visibility. **De TBM5 Technology Resource (Sub-)Towers worden in ServiceNow gemodelleerd als (Parent) Model Categories.**
-   In TBM5 zijn **Service Offerings** productspecifiek. In CSDM5 zijn Service Offerings echter varianten van Services, en Services zijn (of liever: horen te zijn) productonafhankelijk.
-   CSDM5 definieert **Service Instances**: configuration items die "als (onderdeel van) een service" geleverd kunnen worden. Service Instances kunnen een many-to-many-relatie hebben met Service Offerings. **Service Instances zijn de meest voor de hand liggende CI's om naar te verwijzen in incidents of changes**. Bijv. "Workday \[Production\]" of "SAP Business Warehouse \[EMEA, Production\]".

### Het grotere geheel

Dit artikel richt zich op het mappen van de TBM5 "Solutions" naar CSDM5, al zou je waarschijnlijk ook de TBM5 "Technology Resource Towers" en "Cost Pools" naar ServiceNow kunnen mappen, bijv. als je de applicaties "IT Asset Management", "IT Financial Management" en "Strategic Portfolio Management" van ServiceNow hebt aangeschaft, waarvoor CSDM5 weinig ondersteuning biedt.

De afbeelding hieronder toont (de relatie tussen) de CSDM5-artefacten en hoe de TBM5-content naar CSDM5 wordt gemapt.

-   De productonafhankelijke Solution Types zijn CSDM5 Level-0 Business Capabilities
-   De productonafhankelijke Solution Categories zijn CSDM5 Level-1 Business Capabilities
-   De productonafhankelijke Solution Names zijn CSDM5 Level-2 Business Capabilities

-   De productspecifieke Solution Offerings zijn CSDM5 Business Applications (één applicatie kan nul of meer capabilities leveren) of Technical Products die als service worden aangeboden (bijv. "Azure Cloud")
-   De productspecifieke CSDM5 Service Instances zijn gekoppeld aan zowel de CSDM5 Services als de CSDM5 Offerings; de instances zijn deployment-/omgevingsspecifiek.

![](/wp-content/uploads/2025/09/TBM5_in_CSDM_V2.png)

### TBM5 Solutions

In TBM5 kunnen solutions een product of een service zijn. De TBM5 Solutions zijn gegroepeerd in 6 typen (3 voor Business Solutions en 3 voor Technical Solutions). Deze 6 typen bevatten op hun beurt in totaal 32 categorieën. De categorieën bevatten 141 fijnmazige solutions.

"Workplace", "Business" en "Share & Corporate" zijn Solution Types die beschikbaar zijn voor de business. Deze worden ondersteund door de technische Solution Types "Delivery", "Infrastructure" en "Artificial Intelligence". De typen worden gemodelleerd als taxonomy nodes in het/de Service Portfolio('s). De categorieën binnen de solution types worden in ServiceNow gemodelleerd als Business Services of Technical Services, afhankelijk van het type solution.

"Business" is een bijzonder solution type, dat bedrijven kunnen inrichten in lijn met hun eigen business. Een financiële instelling wil haar business solutions bijvoorbeeld anders modelleren dan een retailer. De TBM Council heeft marktspecifieke Business Solution Taxonomies gedefinieerd, die je hier ook kunt gebruiken.

"Enabling Platforms" en "Artificial Intelligence" worden beschouwd als technische services, vergelijkbaar met Infrastructure. Ze ondersteunen de Business Services, maar maken er geen deel van uit. Zo kunnen bedrijven de lifecycle van technische services anders beheren/governen dan die van de business services.

De 141 solutions in TBM5 zijn te fijnmazig om als Services of Offerings in ServiceNow te gebruiken. In plaats daarvan worden deze solutions gemodelleerd als (Business of Technical) Capabilities. De capabilities kunnen worden gerelateerd aan business-/technische baselines (bijv. Applications, Products, Services of Offerings).

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
