---
title: "Warum das Rad neu erfinden? TBM-5.0-Inhalte im CSDM-5.0-Datenmodell nutzen"
excerpt: "ServiceNow hat ein Common Service Data Model (CSDM5) ohne Inhalte definiert. Der TBM Council hat sowohl ein Datenmodell (TBM5) als auch dessen Inhalte definiert. Dieser Artikel beschreibt, wie sich die Inhalte von TBM5 in CSDM5 übernehmen lassen. TBM5 definiert/beschreibt (Beziehungen zwischen) Artefakte(n) für"
source: "6a8e0cade92d9495"
---

ServiceNow hat ein Common Service Data Model (CSDM5) ohne Inhalte definiert. Der TBM Council hat sowohl ein Datenmodell (TBM5) als auch dessen Inhalte definiert. Dieser Artikel beschreibt, wie sich die Inhalte von TBM5 in CSDM5 übernehmen lassen.

![](/wp-content/uploads/2025/08/TBM5-600x281.png)

TBM5 definiert/beschreibt (Beziehungen zwischen) Artefakte(n) für „Technology Consumers“ (wer?), „Technology Solutions“ (was?), „Technology Resource Towers“ (wie?) und „Technology Cost Pools“ (wie viel?). Sie können [**ein kostenloses Exemplar von TBM 5.0 herunterladen.**](https://www.tbmcouncil.org/learn-tbm/resource-center/the-tbm-taxonomy-5/)

CSDM5 definiert/beschreibt ebenfalls das Wer, Was, Wie und Wie viel, wobei der Schwerpunkt eher auf ITSM/ITOM als auf ITAM/ITFM liegt. CSDM5 definiert/beschreibt (Beziehungen zwischen) Artefakte(n) für die Domänen „Ideation & Strategy“, „Design & Plan“, „Build & Integration“, „Service Delivery“, „Service Consumption“ und „Foundation“. CSDM5 unterscheidet zwischen Baselines (z. B. Products, Components, Models, Services und Offerings) und Instanzen (z. B. Service Instances, Configuration Items und Assets). Sie können [***ein kostenloses Exemplar von CSDM 5.0 herunterladen***](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiMzcSloaaPAxVKgP0HHaDLKu4QFnoECCEQAQ&url=https%3A%2F%2Fwww.servicenow.com%2Fcommunity%2Fs%2Fcgfwn76974%2Fattachments%2Fcgfwn76974%2Fcommon-service-data-model-kb%2F744%2F3%2FCSDM%25205%2520w%2520links.pdf&usg=AOvVaw1wlx0sDj-JFaye_6EnN2v1&opi=89978449)

Überlegungen & Einschränkungen

Beim Mapping von TBM6-Inhalten auf das CSDM5-Modell ist Folgendes zu berücksichtigen:

-   **TBM5 Technology Consumers** sind als Entitäten definiert, die CSDM5 als **Foundation-Artefakte** bezeichnet. TBM5 Capabilities sind organisatorische Entitäten; sie sind keine technischen/funktionalen Capabilities, die in TBM5 als Solutions beschrieben werden. Die TBM5-Entitäten verteilen sich in ServiceNow auf verschiedene CSDM5-Foundation-Tabellen, die mit Daten aus autoritativen Quellen befüllt werden (z. B. ISO-3166-Länder/-Kontinente, ISO-3166-2-Provinzen/-Bundesstaaten, Sprachen, Währungen, Zeitzonen, Unternehmen, Abteilungen, Business Units, Mitarbeitende usw.).
-   ServiceNow kann verschiedene Arten von **CSDM5 Digital Portfolios** verwalten, z. B. Application Portfolio, Service Portfolio, Service Instance Portfolio oder Project/Demand Portfolio. Jeder Portfoliotyp kann mehrere Portfolios enthalten, jeweils mit einem eigenen Portfolio Owner. Jedes Portfolio ist Teil des Digital Portfolio.
-   Es sind drei **CSDM5-Kataloge** definiert: Service Catalog, Product Catalog und Sales Catalog. Der Service Catalog enthält die nicht versionierten Services, die bereitgestellt werden und genutzt werden können. Der Product Catalog umfasst Products mit Hauptversionen (gegebenenfalls mit Components mit Nebenversionen), die für das Deployment freigegeben sind (bzw. werden sollen). Der Sales Catalog enthält (Varianten der) Items, die von Mitarbeitenden bestellt/angefordert werden können. TBM5 definiert keinen dieser Kataloge; daher gibt es kein Mapping.
-   **TBM5 Solutions** sind eine Mischung aus produktunabhängigen Elementen, die CSDM5 als Capabilities (Baselines) definiert hat. Das TBM5-Whitepaper erwähnt Assets und Configuration Items (Instanzen), liefert dafür aber keine Inhalte. Das heißt: **TBM5-Inhalte lassen sich nur für Baselines/Models auf CSDM5-Tabellen mappen.**
-   CSDM5 ist auf das **CMDB-Klassenmodell** von ServiceNow abgestimmt, das rund 1.400 verschiedene Typen/Klassen von Configuration Items enthält, die man in der IT-Landschaft antreffen kann. Jedes Instanz-Asset/jeder CI ist genau einer CMDB-Klasse, einem Baseline Model, einer Model Category und einer Parent Model Category zugeordnet. Die Product Models in ServiceNow bleiben so, wie sie von ITOM Visibility „discovered“ oder „federated“ wurden. **Die TBM5 Technology Resource (Sub-)Towers werden in ServiceNow als (Parent-)Model-Categories modelliert.**
-   In TBM5 sind **Service Offerings** produktspezifisch. In CSDM5 hingegen sind Service Offerings Varianten von Services, und Services sind (oder besser: sollten) produktunabhängig (sein).
-   CSDM5 definiert **Service Instances**, also Configuration Items, die „als (Teil eines) Service“ bereitgestellt werden können. Service Instances können in einer Many-to-many-Beziehung zu Service Offerings stehen. **Service Instances sind die naheliegendsten CIs, auf die in Incidents oder Changes verwiesen werden kann**, z. B. „Workday \[Production\]“ oder „SAP Business Warehouse \[EMEA, Production\]“.

### Das Gesamtbild

Dieser Artikel konzentriert sich auf das Mapping der TBM5-„Solutions“ auf CSDM5, obwohl Sie vermutlich auch die TBM5-„Technology Resource Towers“ und „Cost Pools“ auf ServiceNow mappen könnten, z. B. wenn Sie die ServiceNow-Applikationen „IT Asset Management“, „IT Financial Management“ oder „Strategic Portfolio Management“ erworben haben, für die CSDM5 nur wenig Unterstützung bietet.

Die folgende Abbildung zeigt die CSDM5-Artefakte (und deren Beziehungen) sowie das Mapping der TBM5-Inhalte auf CSDM5.

-   Die produktunabhängigen Solution Types sind CSDM5 Level-0 Business Capabilities
-   Die produktunabhängigen Solution Categories sind CSDM5 Level-1 Business Capabilities
-   Die produktunabhängigen Solution Names sind CSDM5 Level-2 Business Capabilities

-   Die produktspezifischen Solution Offerings sind CSDM5 Business Applications (eine Application kann null oder mehr Capabilities bereitstellen) oder technische Products, die als Service angeboten werden (z. B. „Azure Cloud“)
-   Die produktspezifischen CSDM5 Service Instances sind sowohl mit den CSDM5 Services als auch mit den CSDM5 Offerings verknüpft; die Instanzen sind deployment-/umgebungsspezifisch.

![](/wp-content/uploads/2025/09/TBM5_in_CSDM_V2.png)

### TBM5 Solutions

In TBM5 kann eine Solution entweder ein Product oder ein Service sein. Die TBM5 Solutions sind in 6 Types gruppiert (3 für Business Solutions und 3 für Technical Solutions). Diese 6 Types enthalten wiederum insgesamt 32 Categories. Die Categories umfassen 141 feingranulare Solutions.

„Workplace“, „Business“ und „Share & Corporate“ sind Solution Types, die dem Business zur Verfügung stehen. Sie werden von den technischen Solution Types „Delivery“, „Infrastructure“ und „Artificial Intelligence“ unterstützt. Die Types werden als Taxonomy Nodes in dem/den Service Portfolio(s) modelliert. Die in den Solution Types enthaltenen Categories werden in ServiceNow je nach Type der Solution entweder als Business Services oder als Technical Services modelliert.

„Business“ ist ein besonderer Solution Type, den Unternehmen entsprechend ihrem jeweiligen Geschäft strukturieren können. So möchte etwa ein Finanzunternehmen seine Business Solutions möglicherweise anders modellieren als ein Einzelhändler. Der TBM Council hat marktspezifische Business-Solution-Taxonomien definiert, die hier ebenfalls verwendet werden können.

„Enabling Platforms“ und „Artificial Intelligence“ gelten, ähnlich wie Infrastructure, als technische Services. Sie unterstützen die Business Services, sind aber nicht Teil davon. So können Unternehmen den Lifecycle technischer Services anders managen und steuern als den der Business Services.

Die 141 Solutions in TBM5 sind zu feingranular, um in ServiceNow als Services oder Offerings verwendet zu werden. Stattdessen werden diese Solutions als (Business oder Technical) Capabilities modelliert. Die Capabilities können mit Business-/technischen Baselines (z. B. Applications, Products, Services oder Offerings) verknüpft werden.

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
