---
title: "CSDM5 uitgelegd in 10 minuten..."
excerpt: "Er bestaan honderden interpretaties van het ServiceNow Common Service Data Model (CSDM). In dit artikel lees je hoe CSDM5 in ServiceNow wordt opgevat en geïmplementeerd. Verschillende invalshoeken, verschillende focus. ServiceNow beschouwt alle portfolio's als"
source: "e667ca0e6ed5a861"
---

Er bestaan honderden interpretaties van het ServiceNow Common Service Data Model (CSDM). In dit artikel lees je hoe CSDM5 in ServiceNow wordt opgevat en geïmplementeerd.

Verschillende invalshoeken, verschillende focus.

-   Program-/projectmanagers beheren het **project-/demandportfolio.**
-   Enterprise architects beheren het **applicatieportfolio**
-   Product owners beheren de backlog voor hun componenten in het **productportfolio**
-   Service owners beheren hun artefacten in het **serviceportfolio**
-   Configuration managers houden hun IT-inventaris bij in de **Configuration Management Database** (CMDB)
-   Asset managers houden de boekwaarde, operationele kosten, locatie en de eigenaren/gebruikers van hun ****financiële assets**** bij.
-   Master data stewards beheren **fundamentele, portfolio-overstijgende data** in diverse tools.

**ServiceNow beschouwt alle portfolio's als onderdeel van het Digital Product Portfolio van de onderneming** en beheert ze met Digital Portfolio Management (DPM). Dat gezegd hebbende: onder de motorkap van DPM worden de afzonderlijke portfolio's, specifieke practices en applicatiemodules gebruikt. Je kunt in ServiceNow dus geen IT Service Management doen als je (het beheer van) een serviceportfolio niet in ServiceNow implementeert.

> Tegenwoordig worden de beheerde portfolio-items handmatig onderhouden door hun stakeholders (in de diverse portfolio's), en worden gebouwde componenten (opgeslagen in technologiespecifieke repositories) via geautomatiseerde pipelines uitgerold. De uitgerolde items worden automatisch gedetecteerd en vastgelegd in de CMDB, en gerelateerde assets worden automatisch aangemaakt/bijgewerkt. Uitgerolde items kunnen technisch worden getagd, zodat ook niet-technische attribuutwaarden automatisch kunnen worden gedetecteerd en handmatige CMDB-updates niet langer nodig zijn.

Concepten die tien jaar geleden in veel bedrijven werden gebruikt, zijn vandaag de dag niet meer van toepassing, bijvoorbeeld:

-   **Geautomatiseerde discovery en federatie** binnen IT Operations Management hebben het handmatige configuration-managementproces vervangen
-   Applicatie-/product-/servicedata die periodiek moet worden geattesteerd en gereviewd, wordt in portfolio's ondergebracht en beheerd via **Digital Portfolio Management**-practices.
-   Assets, inclusief hun status, eigenaar, gebruiker, kosten en locatie, worden beheerd via hardware-/software-/cloud-**asset management**.
-   **Agile DevOps** heeft delen van ITIL-change management en problem management vervangen/veranderd.
-   **Security Operations** (voor zowel productie- als niet-productie-items) is cruciaal geworden voor ondernemingen.
-   Ondernemingen moeten steeds vaker voldoen aan wetgeving, bijvoorbeeld op het gebied van **dataprivacy, risk en compliance** (voor niet-productie- en productie-items)
-   **Cloud computing** is de standaard geworden. Cloudservices worden (door DevOps-tools) via API's aangevraagd en automatisch geprovisioned.
-   **Kunstmatige intelligentie** zet de manier waarop mensen IT beheren, besturen en gebruiken op zijn kop.

In CSDM5 zijn de volgende artefacten gedefinieerd:

-   **Business applications** zijn grofmazige producten die **business capabilities** leveren, waarvan de lifecycle, het geautoriseerde gebruik en de roadmaps moeten worden beheerd.  
    Een business application bestaat slechts één keer in het portfolio en kan meerdere productinstanties hebben, die als afzonderlijke service instances worden gemodelleerd.  
    
-   **Componenten** zijn fijnmazige producten die deel uitmaken van een applicatie en die via DevOps-practices worden ontwikkeld en onderhouden.
-   **Services** worden geleverd door providers en afgenomen door consumers, en kunnen gerelateerd zijn aan applicaties of andere producten.  
    Een **business service** ondersteunt direct bedrijfsresultaten en is zichtbaar voor de business of eindgebruikers.  
    Een **technical management service,** eigendom van IT, ondersteunt een of meer business services maar is niet direct zichtbaar voor de business.
-   **Service offerings** zijn varianten van services (bijv. voor verschillende regio's/tijdzones, onderscheiden naar productie/niet-productie, enz.), elk met eigen commitments en/of met inzet van verschillende teams.
-   Een **service instance** is een uitgerold item dat onder een of meer service offerings wordt ondersteund en dat gerelateerd is aan een product of applicatie. Bijvoorbeeld een website, een API, enz.
-   Het **service delivery system** is een verzameling afzonderlijk gedetecteerde/gerelateerde configuration items waarvan de service instances afhankelijk kunnen zijn.
-   **Assets** zijn financiële records van afzonderlijke items die zijn aangeschaft of uitgerold, die in het grootboek van het bedrijf staan en/of waarvoor mogelijk licenties moeten worden betaald. Assets zijn van een bepaald assetmodel. Bijvoorbeeld: de instantie van NotePad++ die op een bepaalde pc wordt gevonden, is een asset van het softwareassetmodel "Notepad++".

**Opmerkingen:**

-   Binnen CSDM5 **zijn business applications beperkt tot applicaties die direct bedrijfsresultaten ondersteunen en zichtbaar zijn voor de business of eindgebruikers**. Voor elke applicatie in het portfolio moet een CIA-/BIA-assessment worden opgesteld en periodiek worden gereviewd. Daarnaast moeten voor elke applicatie rollen worden gedefinieerd en via Identity and Access Management aan individuele gebruikers worden toegekend.
-   Bovenstaande administratieve/governance-overhead is niet te rechtvaardigen voor de duizenden pc-/mobiele softwarepakketmodellen die een onderneming gebruikt; daarom **worden deze softwarepakket(modellen) niet als applicaties beschouwd**. In plaats daarvan houdt Software Asset Management de software-assets bij, inclusief hoeveel instanties daarvan in gebruik zijn.
-   **Sommige bedrijven kiezen ervoor alle technische tools, middleware, DBMS'en en andere systeemsoftware als business applications vast te leggen**. Deze applicaties ondersteunen echter niet direct bedrijfsresultaten en zijn vaak onzichtbaar voor de business of eindgebruikers. Dit kan een acceptabele werkwijze zijn als de administratieve/governance-overhead wordt geaccepteerd en als deze technische applicaties aan hetzelfde beleid voldoen als de business applications. Je kunt de technische applicaties ook in het portfolio registreren, maar ze uitzonderen van de governance die voor de business applications geldt.
-   Een applicatie die "as a Service" wordt geleverd, kan als business application worden vastgelegd als de lifecycle ervan door het bedrijf wordt beheerd en onder hetzelfde beleid valt als andere applicaties. **Als een oplossing als service wordt afgenomen, maar de leverancier de lifecycle beheert, wordt die oplossing als een service beschouwd, niet als een applicatie.**
-   **Public cloudplatformen, zoals Azure, OCI, AWS en GCP, worden als service afgenomen** van een provider die de roadmap en lifecycle van het technische platform beheert. Zulke platformen worden als services beschouwd, niet als applicaties.
-   **Bedrijven kunnen hun eigen applicaties produceren/onderhouden op platformen die ze als service afnemen**. Bijvoorbeeld: SAP S/4 HANA wordt als service afgenomen van SAP, en (een partner van) het bedrijf maakt er eigen configuraties/workflows voor. Grofmazige applicaties die door (een partner van) het bedrijf worden geproduceerd, kunnen als applicaties worden geregistreerd, en hun configuraties/scripts/API's worden als componenten beschouwd.
-   Aangezien verandering de enige constante is, is het aan te raden **een marktstandaard-taxonomie en master data over te nemen** van een gezaghebbende bron die bij voorkeur leveranciersonafhankelijk is en door een governance-orgaan actueel wordt gehouden. Zo onderhoudt de TBM Council een goed taxonomiemodel met kant-en-klare, goed gedefinieerde data.

**Voor de goede orde**:

-   **Assets** worden in ISO-27000, ISO55000, IFRS/GAAP en andere formele frameworks anders gedefinieerd/afgebakend dan in ITSM/ITIL.
-   ServiceNow maakt onderscheid tussen **service instances** (die door consumers worden gebruikt) en **configuration items** (die een of meer service instances kunnen ondersteunen).

-   Voor service instances kun je de relatie met foundational data registreren. Configuration items zouden in ServiceNow niet door mensen moeten worden aangeraakt
-   Mensen kunnen incidents/problems/changes melden op service instances die gerelateerd zijn aan offerings waar ze recht op hebben, maar niet per se op configuration items.

-   **Het CSDM moet ruimte bieden voor informatie over productie-items, maar ook voor informatie over niet-productie-items**. Dat gezegd hebbende, kunnen de offerings en commitments van providers voor beide omgevingen verschillen, en sommige practices (bijv. change management) gelden alleen voor productie-offerings.
-   Elke IT4IT-leverancier hanteert zijn eigen terminologie en definities voor zijn platform. Aangezien een enterprise practice in slechts één organisatiebreed platform zou moeten worden geïmplementeerd, **is het zinvol leverancierspecifieke terminologie/definities te gebruiken (bijv. best-practice-procesgidsen, videotutorials en communityartikelen die op het platform zijn afgestemd)**. **Definities/terminologie overnemen uit verouderde en/of incompatibele frameworks heeft geen zin.**

**Voorbeelden:**

-   **Portfolio's:** "ERP Applications", "Public Cloud Services", "ERP Service Instances", "End-User Services"; "GitLab Components"
-   **Business applications:** "SAP S/4 Hana Platform", "SAP ERP Application", "SAP CALM Application", "ServiceNow Platform", ServiceNow ITSM/ITOM/ITAM", "Workday".
-   **Technische applicaties:** "Intune", "JAMF", "Cisco Works", "SQL Server 2016" , "SQL Server 2022", ".NET 4", "Python 7", "MuleSoft", "Tibco"  
    
-   **Componenten:** "SN MidServer", "JAVASCRPT X V93.47", "AI Agent Y"
-   **Services:** "Database Support", "Middleware Support", "PC Support", "Windows Server/VM Support",
-   **Offerings:** "Database \[EMEA, PROD\]", "Database \[LATAM, PROD\]", "Database \[EMEA, NON-PROD\]", "Windows PC \[NL\]", "IT Service Management \[PROD\]",  
    "Windows VM \[AZURE\]","Windows VM \[OCI\]", "Windows VM \[AWS\]"
-   **Service instances:** "PRD.Service-Now.com", "DEV.Service-Now.com", "SQL-Server@VM2028038", "API-32312"
-   **Assets/service delivery systems:** "PC21213", "MasterDB@SQL-Server@VM2028038", "Jeroens iPhone"
-   **Asset-/productmodel:** "Windows 11 Operating System", "Notepad++"; "Calculator 7.5.3", "Dell 7534 Laptop", "SQL Server 2021"

**Wat gebruik je waar?**

**![](/wp-content/uploads/2025/09/CSDM5_core_objects.png)**

ITSM-processen zoals incident-, change- en problem management verwijzen naar het volgende:

-   De **service instance** die door het incident, de change of het problem wordt geraakt
-   De **service offering**, met daarin de commitments en abonnementen die op deze (en vergelijkbare andere) service instances van toepassing zijn
-   De **service** waarvan de offering een variant is (d.w.z. de parent van de service offering)
-   Het **service delivery system (oftewel** **configuration item/asset),** dat de service instances ondersteunt en dat direct aan de gebruiker is toegewezen (bijv. de pc/telefoon van de gebruiker).  
    
-   De **assignment group** van de provider en **de assigned agent,** verantwoordelijk voor de afhandeling van de change, het incident of het problem.
-   De **consumer** (incl. gerelateerde gegevens zoals bedrijf, locatie, enz.) die door de change, het incident of het problem wordt geraakt.

Ook andere, niet-ITSM-practices stellen eisen aan het CSDM, zelfs als die practices niet in ServiceNow zijn geïmplementeerd:

-   **Enterprise architects** moeten weten hoeveel instanties van hun portfolio-artefacten nog zijn uitgerold/in gebruik zijn.
-   **SecOps** heeft informatie nodig over kwetsbaarheden in alle omgevingen, niet alleen in productieomgevingen.
-   **DevOps** moet kunnen vaststellen waar de uitgerolde componenten zich bevinden en welke versies het zijn.
-   **Projecten** moeten weten welke uitgerolde API's, microservices, AI-agents, enz. beschikbaar zijn en mogen worden afgenomen.
-   **Transitiemanagers** moeten de huidige status/aantallen kennen die ze moeten overzetten.
-   **Financial asset managers** moeten weten welke assets/licenties door wie worden gebruikt en/of welke kunnen worden ingetrokken omdat ze niet meer worden gebruikt.
-   **Identity and access managers** moeten weten voor welke items men (niet langer) toegang mag aanvragen/autoriseren.
-   **Riskmanagers** moeten weten of de gevonden configuraties voldoen aan het beleid en de geautoriseerde baselines.
-   **Kunstmatige intelligentie** moet de relevante items in de IT-infrastructuur kennen, inclusief hun onderlinge afhankelijkheden en wie ze waarvoor gebruikt.
-   **HR-managers en lijnmanagers** moeten weten welke rollen, assets en identiteiten aan hun medewerkers zijn toegekend.
-   **End-user-devicemanagers** moeten weten hoeveel items van elke leeftijd/versie nog in gebruik zijn.
-   **Service delivery managers** moeten weten welke services ze van hun partners afnemen.
