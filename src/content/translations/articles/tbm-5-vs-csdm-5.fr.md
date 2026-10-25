---
title: "Pourquoi réinventer la roue ? Utilisez le contenu de TBM 5.0 dans le modèle de données CSDM 5.0"
excerpt: "ServiceNow a défini un Common Service Data Model (CSDM5) sans contenu. Le TBM Council a défini à la fois un modèle de données (TBM5) et son contenu. Cet article décrit comment intégrer le contenu de TBM5 dans CSDM5. TBM5 définit/décrit les artefacts (et leurs relations) pour"
source: "6a8e0cade92d9495"
---

ServiceNow a défini un Common Service Data Model (CSDM5) sans contenu. Le TBM Council a défini à la fois un modèle de données (TBM5) et son contenu. Cet article décrit comment intégrer le contenu de TBM5 dans CSDM5.

![](/wp-content/uploads/2025/08/TBM5-600x281.png)

TBM5 définit/décrit les artefacts (et leurs relations) pour les « Technology Consumers » (qui ?), les « Technology Solutions » (quoi ?), les « Technology Resource Towers » (comment ?) et les « Technology Cost Pools » (combien ?). Vous pouvez [**télécharger gratuitement un exemplaire de TBM 5.0.**](https://www.tbmcouncil.org/learn-tbm/resource-center/the-tbm-taxonomy-5/)

CSDM5 définit/décrit le qui, le quoi, le comment et le combien, même s'il se concentre davantage sur l'ITSM/ITOM que sur l'ITAM/ITFM. CSDM5 définit/décrit les artefacts (et leurs relations) pour les domaines « Ideation & Strategy », « Design & Plan », « Build & Integration », « Service Delivery », « Service Consumption » et « Foundation ». CSDM5 fait la distinction entre les référentiels de base (baselines ; par exemple Products, Components, Models, Services et Offerings) et les instances (par exemple Service Instances, Configuration Items et Assets).. Vous pouvez [***télécharger gratuitement un exemplaire du CSDM 5.0***](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiMzcSloaaPAxVKgP0HHaDLKu4QFnoECCEQAQ&url=https%3A%2F%2Fwww.servicenow.com%2Fcommunity%2Fs%2Fcgfwn76974%2Fattachments%2Fcgfwn76974%2Fcommon-service-data-model-kb%2F744%2F3%2FCSDM%25205%2520w%2520links.pdf&usg=AOvVaw1wlx0sDj-JFaye_6EnN2v1&opi=89978449)

Considérations et contraintes

Lors du mapping du contenu TBM6 sur le modèle CSDM5, il convient de tenir compte des points suivants :

-   Les **Technology Consumers de TBM5** sont définis comme des entités que CSDM5 qualifie de **Foundation Artifacts**. Les Capabilities de TBM5 sont des entités organisationnelles ; il ne s'agit pas de capacités techniques/fonctionnelles, lesquelles sont décrites dans TBM5 comme des solutions. Les entités TBM5 sont réparties dans diverses tables Foundation de CSDM5 dans ServiceNow, alimentées par des données provenant de sources faisant autorité (par exemple pays/continents ISO-3166, provinces/États ISO-3166-2, langues, devises, fuseaux horaires, sociétés, départements, Business Units, collaborateurs, etc.)
-   ServiceNow peut gérer différents types de **Digital Portfolios CSDM5**, par exemple Application Portfolio, Service Portfolio, Service Instance Portfolio ou Project/Demand Portfolio. Chaque type de portefeuille peut contenir plusieurs portefeuilles, chacun ayant son propre Portfolio Owner. Chaque portefeuille fait partie du Digital Portfolio.
-   Trois **catalogues CSDM5** sont définis : le Service Catalog, le Product Catalog et le Sales Catalog. Le Service Catalog contient les services non versionnés qui sont fournis et qui peuvent être consommés. Le Product Catalog comprend les produits versionnés au niveau majeur (avec éventuellement des composants versionnés au niveau mineur) qui sont (ou seront) autorisés au déploiement. Le Sales Catalog contient les éléments (et leurs variantes) que les collaborateurs peuvent commander/demander. TBM5 ne définit aucun de ces catalogues ; il n'y a donc pas de mapping.
-   Les **Solutions TBM5** sont un ensemble d'éléments indépendants des produits, que CSDM5 a définis comme des Capabilities (baselines). Le livre blanc TBM5 mentionne les assets et les configuration items (instances), mais ne fournit pas de contenu pour ceux-ci. Autrement dit, **on ne peut mapper le contenu TBM5 que pour les baselines/modèles dans les tables CSDM5.**
-   CSDM5 est aligné sur le **modèle de classes de la CMDB** de ServiceNow, qui comprend environ 1400 types/classes différents de configuration items susceptibles d'être présents dans le paysage IT. Chaque Asset/CI d'instance est associé à une seule classe CMDB, à un seul Baseline Model, à une seule Model Category et à une seule Parent Model Category. Les Product Models dans ServiceNow sont laissés « tels que découverts » ou « tels que fédérés » par ITOM Visibility. **Les Technology Resource (Sub-) Towers de TBM5 sont modélisées comme des (Parent) Model Categories dans ServiceNow.**
-   Dans TBM5, les **Service Offerings** sont spécifiques à un produit. En revanche, dans CSDM5, les Service Offerings sont des variantes de Services, et les Services sont (ou plutôt : devraient être) indépendants des produits.
-   CSDM5 définit des **Service Instances**, qui sont des Configuration Items pouvant être fournis « en tant que service (ou partie de service) ». Les Service Instances peuvent être liées en many-to-many aux Service Offerings. **Les Service Instances sont les CI les plus évidents à référencer dans les incidents ou les changes**. Par exemple « Workday \[Production\] » ou « SAP Business Warehouse \[EMEA, Production\] ».

### Vue d'ensemble

Cet article se concentre sur le mapping des « Solutions » TBM5 vers CSDM5, même si vous pourriez probablement aussi mapper les « Technology Resource Towers » et les « Cost Pools » de TBM5 dans ServiceNow, par exemple si vous avez acquis les applications « IT Asset Management », « IT Financial Management », « Strategic Portfolio Management » de ServiceNow, pour lesquelles CSDM5 offre peu de support.

Le schéma ci-dessous présente les artefacts CSDM5 (et leurs relations) ainsi que la manière dont le contenu TBM5 est mappé sur CSDM5.

-   Les Solution Types indépendants des produits sont des Business Capabilities CSDM5 de niveau 0
-   Les Solution Categories indépendantes des produits sont des Business Capabilities CSDM5 de niveau 1
-   Les Solution Names indépendants des produits sont des Business Capabilities CSDM5 de niveau 2

-   Les Solution Offerings spécifiques à un produit sont des Business Applications CSDM5 (une application peut fournir zéro ou plusieurs Capabilities) ou des Technical Products proposés en tant que service (par exemple « Azure Cloud »)
-   Les Service Instances CSDM5 spécifiques à un produit sont liées à la fois aux Services CSDM5 et aux Offerings CSDM5 ; les instances sont spécifiques à un déploiement/environnement.

![](/wp-content/uploads/2025/09/TBM5_in_CSDM_V2.png)

### Solutions TBM5

Dans TBM5, une solution peut être soit un produit, soit un service. Les Solutions TBM5 sont regroupées en 6 types (3 pour les Business Solutions et 3 pour les Technical Solutions). Ces 6 types contiennent à leur tour un total de 32 catégories. Les catégories contiennent 141 solutions détaillées.

« Workplace », « Business » et « Share & Corporate » sont les Solution Types mis à la disposition du métier. Ils s'appuient sur les Solution Types techniques « Delivery », « Infrastructure » et « Artificial Intelligence ». Les types sont modélisés comme des Taxonomy Nodes dans le ou les Service Portfolios. Les catégories contenues dans les Solution Types sont modélisées dans ServiceNow soit comme des Business Services, soit comme des Technical Services, selon le type de la solution.

« Business » est un Solution Type particulier, que les entreprises peuvent structurer en fonction de leur activité. Par exemple, une entreprise financière voudra peut-être modéliser ses solutions métier différemment d'un distributeur. Le TBM Council a défini des Business Solution Taxonomies spécifiques à chaque marché, qui peuvent également être utilisées ici.

« Enabling Platforms » et « Artificial Intelligence » sont considérés comme des services techniques, au même titre que l'infrastructure. Ils supportent les Business Services, mais n'en font pas partie. Cela permet aux entreprises de gérer/gouverner le cycle de vie des services techniques différemment de celui des services métier.

Les 141 solutions de TBM5 sont trop détaillées pour être utilisées comme Services ou Offerings dans ServiceNow. Ces solutions sont donc modélisées comme des Capabilities (métier ou techniques). Les capabilities peuvent être liées à des baselines métier/techniques (par exemple Applications, Products, Services ou Offerings).

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
