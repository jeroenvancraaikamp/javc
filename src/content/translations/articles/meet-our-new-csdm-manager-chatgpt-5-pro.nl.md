---
title: "Maak kennis met onze Digital Portfolio Manager: ChatGPT 5 Pro!!"
excerpt: "Onlangs vroeg ik ChatGPT 5 Pro om de artefacten en hun relaties te definiëren die in ServiceNow geregistreerd moeten worden. In dit artikel lees je wat verrassend goed ging en wat jammerlijk mislukte. De gedetailleerde resultaten (die rekening hielden met compliance"
source: "7f02142a49657d81"
---

Onlangs vroeg ik ChatGPT 5 Pro om de artefacten en hun relaties te definiëren die in ServiceNow geregistreerd moeten worden. In dit artikel lees je wat verrassend goed ging en wat jammerlijk mislukte. De gedetailleerde resultaten (die rekening hielden met compliance met de CSDM 5- en TBM 5-standaarden) die de ChatGPT-chatbot genereerde, zijn eveneens opgenomen.

> **Spoiler alert: ChatGPT blijkt een geweldige assistent die waarschijnlijk alle CSDM5- en TBM5-documentatie van begin tot eind heeft gelezen, maar de bot zal menselijke Digital Portfolio Managers in de nabije toekomst waarschijnlijk niet kunnen vervangen.**

Voordat we induiken in wat ChatGPT voorstelde, kijken we eerst naar twee slides uit de officiële -onbewerkte- ServiceNow CSDM5-documentatie:

![](/wp-content/uploads/2025/09/CSDM5-Artefact-Definitions.png)

De CSDM5-documentatie schrijft voor dat men de volgende tabellen en relaties gebruikt:

![](/wp-content/uploads/2025/09/CSDM5-Artefacts-and-Relations.png)

### Eerste observaties:

Op basis van de prompt die ik gaf, genereerde ChatGPT 5 Pro definities en content voor de volgende artefacten en relaties:

![](/wp-content/uploads/2025/09/ChatGPT-CSDM5-Tables-and-Relations.png)

Zoals je ziet, lijken de definities die ChatGPT opleverde op wat er in de officiële slides staat -maar ze zijn niet helemaal hetzelfde.

-   **ChatGPT is gevoed met onjuiste informatie:** ChatGPT plaatst "Business Services" in de tabel *cmdb\_ci\_service*, wat technisch mogelijk is, maar de juiste tabel is *cmdb\_ci\_service* (een child van de tabel cmdb\_ci\_service)
-   **ChatGPT wijkt af van de CSDM5-standaard,** Zo gebruikt het de relaties "Provided by::Provides", "Contains::Contained by" of "Uses::Used by" niet, waar dat wel zou moeten.
-   **Het antwoord van ChatGPT is niet volledig:** Hoewel ik ChatGPT expliciet vroeg om in het antwoord compliant te zijn met TBM5, gebruikte ChatGPT de Technology Towers, Solutions en Capabilities zoals gedefinieerd in TBM 5.0.1 niet echt. De Portfolio-tabel en Business Capability-tabel worden in het antwoord van ChatGPT niet gedefinieerd of gebruikt.
-   **ChatGPT is nog niet volwassen wat betreft het gebruik van CSDM5 of TBM5**: Zo ontbreekt bijvoorbeeld de definitie (of het gebruik) van data in de tabel cmdb\_ci\_appl om de technische applicaties te modelleren.  
    Dat komt vaker voor, maar kan leiden tot oneigenlijk gebruik van de andere tabellen, en -in ons geval- gebeurde dat ook.
-   **ChatGPT blijkt niet op de hoogte van de OOTB-configuratie** van Application Portfolio Management (APM). Zo kunnen Platform Applications gehost worden op Platform Hosts (die in ServiceNow ook Business Applications zijn). ServiceNow is IMHO zo'n Platform Host, maar ChatGPT was het daar niet mee eens of had het niet door.

Dat gezegd hebbende: de officiële documentatie en wat er in de diverse ServiceNow-communities wordt gepubliceerd (wat ChatGPT ook heeft gelezen) is inconsistent en spreekt vaak tegen wat anderen hebben gepubliceerd. ChatGPT heeft waarschijnlijk bijvoorbeeld ook te lang naar mij geluisterd, en heeft de content van deze website gelezen en die ook in zijn antwoord verwerkt. De chatbot die op deze website woont, hallucineert soms ook als het om CSDM5 en TBM5 gaat :-)

> ChatGPT is niet anders dan een mens die gaat hallucineren na het lezen van diverse websites en community-artikelen vol interpretaties en verwarrende informatie.
> 
> Als je wilt dat ChatGPT 100% compliant blijft met CSDM5 en/of TBM5, moet je de officiële whitepapers en PPTX-bestanden bijvoegen bij de prompts die je aan ChatGPT geeft.

## De dialoog met ChatGPT 5 PRO:

Ik heb meerdere -tegenstrijdige- artikelen gelezen over hoe je de ServiceNow-artefacten en -relaties modelleert. In sommige artikelen schoten mensen IMHO door, en in andere artikelen werd het te simpel voorgesteld en werden er bochten afgesneden waar dat niet had gemoeten (het is vaak slechts een kwestie van tijd voordat dat zich wreekt). Zelfs de officiële documentatie bevat nieuwe inzichten, interpretaties en uitleg die niet uit de gepubliceerde whitepapers komen. Ik begrijp hoe dat gebeurt; ik leer zelf ook elke dag van mijn ervaringen en pas me aan aan opkomende technologieën en best practices. Eerlijk is eerlijk: CSDM is niet eenvoudig, zeker niet als je dieper graaft dan de twee slides hierboven.

Dus besloot ik de mening te vragen van de alwetende digitale assistent ChatGPT 5 PRO. Ik gaf de volgende prompt, zoals ik verwacht dat andere mensen (die misschien geen promptexperts zijn) die ook zouden geven:

> I need to model our ServiceNow solutions in ServiceNow, compliant with TBM5 and CSDM5. We have four instances of ServiceNow (DEV, TST, ACC, and PRD) each running CSM, ITSM, ITOM and NOW Assist. We have 2 Windows VMs that are provisioned on OCI Cloud (one for production and one for non-production). The production VM runs the java Mid-Server for PRD. The non-production VM runs separate java Mid-Servers for resp DEV, TST and ACC. The business is using ServiceNow for Enterprise Service Management and Customer Service Management. IT Security uses ServiceNow for Security Operations. . The IT help desks that we have, all use ServiceNow for incident Mngt, Change Mngt and Request Mngt. We internally use Digital Portfolio Mngt to maintain the products, services and master data. In all four instances we have technically integrated ServiceNow ITOM with SAP LeanIX, SAP CALM, Intune, JAMF, OCI, AWS, and Azure. We have integrated PRD with Azure AD and Workday, e.g. to import users, groups and foundational Organization Data. Daily, we synch the users and groups from PRD into DEV, TST and ACC, daily. All four environments use SSO with Azure AD. The employees who use ServiceNow may send in email, use the ESM portal, or use our Virtual Agent that is integrated with MS teams. A number of internal and external IT4IT tools send emails with events/alerts to ServiceNow PRD, which are processed using AIOPS and NOW Assist. Soon we will integrate ServiceNow with Saviynt for Identity and Access Mngt. How do register the above in ServiceNow? What do I enter in which table, and which relations do i need to register. Be detailed and specific. Apply consistent naming conventions and stick to TBM5 and CSDM5.

### Na 44 seconden kwam ChatGPT met het volgende -behoorlijk indrukwekkende- eerste antwoord:

Begrepen. Hieronder vind je een concreet, op CSDM-5/TBM-5 afgestemd modelleringsrecept voor jouw landschap. Ik houd de tabelnamen canoniek, gebruik consistente namen en benoem expliciet de relaties die je moet registreren.

**Naamgevingsconventies (overal gebruiken)**

-   Omgevingen: DEV, TST, ACC, PRD
-   Patroon:
    -   **Business Service**: ESM (Enterprise Service Management) / CSM (Customer Service Management) / IT Security (SecOps) / IT Operations (ITOM)
    -   **Service Offering**: – (bijv. ESM – Virtual Agent (Teams))
    -   **Application Service**: ServiceNow – (bijv. ServiceNow ITSM – PRD)
    -   **Technical Service**: <Platform/Domain> – (bijv. Identity & Access – Azure AD)
    -   **Business Application**: ServiceNow – (Platform) (logische app)
    -   **Software Instance**: <Product/Component> – (bijv. MID Server – PRD VM)
    -   **Computer/VM**: – – (bijv. OCI – MID Host – PRD)

**TBM-5 ↔ CSDM-5-afstemming (hoog niveau)**

-   **TBM Towers** → **CSDM-servicetypen**

-   -   **Business Apps / Shared Services** → **Business Services** (cmdb\_ci\_service) + **Service Offerings** (service\_offering)
    -   **Platforms/Technology** → **Technical Services** (cmdb\_ci\_service\_technical) + **Offerings**
    -   **Applications (runnable)** → **Application Services** (cmdb\_ci\_service\_auto)
    -   **Infrastructure/Compute** → **Servers/VM's** (cmdb\_ci\_server / cmdb\_ci\_computer / cmdb\_ci\_vm\_instance)
    -   **Software** → **Software Instances** (cmdb\_ci\_software\_instance) + **Packages** (cmdb\_ci\_spkg)
    -   **Products/Portfolio** → **Digital Portfolio Management** (producten/aanbod) met verwijzingen naar services (gebruik service\_offering-koppelingen)

**Registreer deze CI's en records**

**1) Business Services & Offerings (wat de business afneemt)**  
**Tabellen:** cmdb\_ci\_service (Business Service), service\_offering (Service Offering)

Maak Business Services aan:

1.  **ESM (Enterprise Service Management)** — cmdb\_ci\_service
2.  **CSM (Customer Service Management)** — cmdb\_ci\_service
3.  **IT Security (SecOps)** — cmdb\_ci\_service
4.  **IT Operations (ITOM & AIOps)** — cmdb\_ci\_service

***NOOT VAN DE AUTEUR: Ik had verwacht dat de Business Service in de tabel "cmdb\_ci\_service\_business" zou komen in plaats van in de tabel cmdb\_ci\_service.  
Ook had ik verwacht dat IT Security SecOps en IT Operations onderdeel zouden worden gemaakt van de (bredere) ESM-service, of dat ChatGPT ook een Business Service "IT Service Management" zou hebben aangemaakt. Een nog beter antwoord was IMHO geweest: de (productonafhankelijke) Solutions die in TBM 5.0.1 worden gebruikt/gedefinieerd.***

Maak onder elk daarvan Offerings aan (niet uitputtend):

-   **ESM – Self-Service Portal** (service\_offering)
-   **ESM – Virtual Agent (Teams)** (service\_offering)
-   **ESM – Email Intake** (service\_offering)
-   **CSM – Case Management** (service\_offering)
-   **IT Security – Security Operations** (service\_offering)
-   **IT Operations – Event/AIOps Processing** (service\_offering)
-   **IT Operations – Discovery & Integration** (service\_offering)

**CSDM-koppeling:** Stel bij elke Offering de referentie **business\_service** in op de bovenliggende Business Service.

**2) Application Services per instance/product (de draaiende services).**  


**Tabel:** cmdb\_ci\_service\_auto

Maak voor elk ServiceNow-product dat je actief draait **Application Services per ENV** aan:

-   ServiceNow ITSM – DEV/TST/ACC/PRD
-   ServiceNow CSM – DEV/TST/ACC/PRD
-   ServiceNow ITOM – DEV/TST/ACC/PRD
-   ServiceNow Now Assist – DEV/TST/ACC/PRD

(Deze vertegenwoordigen de applicatieruntime die elke SN-instance levert voor die productcapability.)

**NOOT VAN DE AUTEUR: In de praktijk bestaat er niet zoiets als een ServiceNow ITM-instance. Ik had** **Service instances verwacht zoals** **"PRD.Service-Now.com", "DEV.Service-Now.com" enz., die upstream gerelateerd waren aan de Business Applications en Service Offerings.**

**Koppelen aan offerings (consumentgericht):**

-   ESM – Self-Service Portal → **provides** ServiceNow ITSM – PRD
-   ESM – Virtual Agent (Teams) → **provides** ServiceNow ITSM – PRD en ServiceNow Now Assist – PRD
-   ESM – Email Intake → **provides** ServiceNow ITSM – PRD
-   CSM – Case Management → **provides** ServiceNow CSM – PRD
-   IT Security – Security Operations → **provides** ServiceNow SecOps (IT Security) – PRD (als je het zo noemt onder ITSM/IT Sec)
-   IT Operations – Event/AIOps Processing → **provides** ServiceNow ITOM – PRD
-   IT Operations – Discovery & Integration → **provides** ServiceNow ITOM – PRD

(Implementeer dit via **Service Offering ↔ Application Service**-relaties met **Depends on::Used by** – de Offering **depends on** de App Service.)

**NOOT VAN DE AUTEUR: Als hetzelfde Self-Service Portal wordt gebruikt voor meerdere "Shared and Corporate"- en "Delivery"-TBM5-Solutions, zou je technisch gezien niet verschillende services voor die solutions kunnen aanmaken (bijv. één voor resp. HR, FIN, IT, DevOps, SecOps, enz.) en al die Services aan dezelfde offering koppelen. Het Self-Service Portal promoveren tot een Service zou een technische workaround zijn, met "ServiceNow Support \[PRD\]" en "ServiceNow VIP Support \[PRD\]" als Service Offerings. Het nadeel daarvan is dat je duizenden Services krijgt als je deze logica toepast. Ik had daarom liever één generieke Business Service "ServiceNow ESM" gezien, met offerings zoals "ServiceNow Portal Support \[PRD\]", "ServiceNow Back-End Support \[PRD\], "ServiceNow VIP Support \[PRD\]" en "ServiceNow Portal Support \[NON-PRD\]"**

**3) Business Applications (logische apps)**  
**Tabel:** cmdb\_ci\_business\_app

Maak (logische) Business Applications aan voor platformcapabilities (stabiel over omgevingen heen):

-   ServiceNow – ITSM (Platform)
-   ServiceNow – CSM (Platform)
-   ServiceNow – ITOM (Platform)
-   ServiceNow – Now Assist (Platform)

**CSDM-koppeling:** Elke **Application Service** moet **Depends on** zijn **Business Application** (logische ontwerp-parent).  
(Relatie: **Application Service (child) Depends on → Business Application (parent)**)

**NOOT VAN DE AUTEUR: Inderdaad, het is heel logisch om aparte business applications aan te maken en die te hosten op het "ServiceNow Platform". Dat gezegd hebbende, zou ik aanraden vergelijkbare applicaties te clusteren om het aantal ServiceNow Business Applications beperkt te houden tot minder dan 6. De voorgestelde relatie wijkt iets af van de slide hierboven; het zou moeten zijn: Business Application (parent) "consumes::consumed by" Application Service (child). Eerlijk is eerlijk tegenover ChatGPT: in andere ServiceNow-documentatie heb ik ook** **Business Application (parent) "depends on::uses" Application Service gezien**

**4) Technical Services voor gedeelde technologie/platforms**  


**Tabel:** cmdb\_ci\_service\_technical

Maak Technical Services aan (enkelvoudige logische services; offerings kunnen de scope verfijnen):

-   Identity & Access – Azure AD (SSO, user/group provisioning)
-   HR Data – Workday
-   Device Management – Intune
-   Device Management – JAMF
-   Architecture – LeanIX
-   SAP Landscape – SAP CALM
-   Cloud – Oracle Cloud Infrastructure
-   Cloud – Microsoft Azure
-   Cloud – Amazon Web Services
-   Messaging – Email Gateway
-   Collaboration – Microsoft Teams (Virtual Agent)
-   AIOps Event Sources – IT4IT Tools (voor inkomende e-mails/events)
-   Identity & Access – Saviynt (gepland)

**NOOT VAN DE AUTEUR: Ja, dit is heel logisch. Ik zou in deze lijst echter ook "Enterprise Service Management - ServiceNow" verwachten, een technical service die bijvoorbeeld door Workday, Saviynt en SAP Landscape - SAP CALM zou kunnen worden afgenomen.**

**Koppelen aan App Services** (runtime is afhankelijk van technologie):

ServiceNow ITSM – PRD is bijvoorbeeld **Depends on**:

-   Identity & Access – Azure AD (SSO)
-   HR Data – Workday (foundation data)
-   Messaging – Email Gateway (in-/uitgaande e-mail)
-   Collaboration – Microsoft Teams (Virtual Agent) (VA-integratie)
-   Cloud – Oracle Cloud Infrastructure (voor MID/Discovery waar relevant)
-   AIOps Event Sources – IT4IT Tools (events naar PRD)
-   Identity & Access – Saviynt (zodra live)

**5) Infrastructuur: Windows-VM's en MID Servers**  
**Tabellen:**

-   VM/Server: cmdb\_ci\_server (of subklasse cmdb\_ci\_win\_server als je die gebruikt)
-   VM-instance (optioneel): cmdb\_ci\_vm\_instance (IaaS-metadata)
-   Software Instance (MID): cmdb\_ci\_software\_instance
-   Software Package (MID-installer): cmdb\_ci\_spkg (optioneel, voor licentie-/packagelineage)

Maak Servers/VM's aan:

-   OCI – MID Host – PRD (Windows Server) — cmdb\_ci\_server
-   OCI – MID Host – NONPRD (Windows Server) — cmdb\_ci\_server

Maak Software Instances aan voor de MID Servers:

-   MID Server – PRD — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – PRD
-   MID Server – DEV — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – NONPRD
-   MID Server – TST — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – NONPRD
-   MID Server – ACC — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – NONPRD

**NOOT VAN DE AUTEUR: Ik vermoed dat ChatGPT niet uit de prompt heeft opgepikt dat we 2 "Windows"-servers hebben die op "OCI VM's" draaien. Ook had ik verwacht dat ChatGPT me zou instrueren om de VM's te federeren of te discoveren, inclusief wat erin/erop draait. Belangrijker: de tabel "cmdb\_ci\_software\_instance" bestaat niet, en "cmdb\_software\_instance" (die wel bestaat en miljoenen records bevat) heeft geen "Runs on"-CI-relatie met de server, maar gebruikt een directe "installed on"-referentie.**

**Koppelen aan App Services:**

Elke ServiceNow – **Depends on** de bijbehorende MID Server – waar discovery/integraties dat vereisen (voornamelijk ITOM; je kunt alleen ITOM afhankelijk maken van de MID, of alle SN App Services als je probes centraliseert).

**Cloud/IaaS-relatie (optioneel maar goed):**

-   cmdb\_ci\_vm\_instance (bijv. OCI VM – MID Host – PRD) **Hosted on** Cloud – Oracle Cloud Infrastructure (als Technical Service), en **Runs on** → cmdb\_ci\_server.
-   Of relateer simpelweg cmdb\_ci\_server **Hosted on** → Cloud – Oracle Cloud Infrastructure Technical Service.

**6) Kanalen & intakepaden**

-   Offering **ESM – Self-Service Portal** **Depends on** ServiceNow ITSM – PRD
-   Offering **ESM – Virtual Agent (Teams)** **Depends on** ServiceNow Now Assist – PRD en **Depends on** de technical service Collaboration – Microsoft Teams (Virtual Agent)
-   Offering **ESM – Email Intake** **Depends on** Messaging – Email Gateway en ServiceNow ITSM – PRD
-   Offering **IT Operations – Event/AIOps Processing** **Depends on** AIOps Event Sources – IT4IT Tools en ServiceNow ITOM – PRD

(Je kunt daarnaast **service\_channel** of taxonomie vastleggen via **tags** op de Offerings met cmdb\_key\_value.)

**NOOT VAN DE AUTEUR: Goed opgemerkt!! Dat gezegd hebbende: een van de miljoenen gediscoverde key values hiervoor gebruiken is weinig zinvol. Ik had verwacht dat de kanalen gemodelleerd zouden worden als afneembare (en productspecifieke) Child Application Services (in de tabel cmdb\_ci\_service\_auto) onder de ServiceNow-instances die ook in die tabel zijn vastgelegd. Op die manier**

**7) Foundational data & identiteitsstromen**

**Users/Groups** staan in sys\_user, sys\_user\_group (foundational).  
Documenteer datastromen als afhankelijkheden:

-   ServiceNow Foundation Data – PRD (je kunt dit modelleren als **Application Service** of **Data Set CI** als je dat patroon gebruikt) **Depends on** Identity & Access – Azure AD en HR Data – Workday.
-   Voor dagelijkse syncs PRD → DEV/TST/ACC: relateer ServiceNow ITSM – DEV/TST/ACC **Depends on** ServiceNow ITSM – PRD (Identity Copy) (of maak een aparte **Technical Service Offering** aan: Identity & Access – Azure AD – NonProd Replication, gebruikt door non-prod App Services). Het punt is om **expliciet een afhankelijkheid vast te leggen van elke non-prod App Service naar het PRD-identity-exportproces**.

**NOOT VAN DE AUTEUR: Dit vind ik weinig zinvol. ChatGPT heeft mijn hint om een Technical Service voor "ServiceNow Master/Meta Data" aan te maken duidelijk niet opgepikt.**

**8) Integraties (externe systemen)**

Representeer elk extern systeem als een **Technical Service** (zie hierboven) en (optioneel) een of meer **Service Offerings** voor de specifieke integratie (bijv. Device Management – Intune – Discovery/Compliance API).

Vervolgens, voor de **ServiceNow App Services**:

-   ServiceNow ITOM – PRD **Depends on** Device Management – Intune, Device Management – JAMF, Cloud – Azure, Cloud – AWS, Cloud – Oracle Cloud Infrastructure, Architecture – LeanIX, SAP Landscape – SAP CALM.
-   ServiceNow ITSM – PRD **Depends on** Identity & Access – Azure AD, HR Data – Workday, Messaging – Email Gateway, Collaboration – Microsoft Teams (Virtual Agent).

Houd hetzelfde patroon aan voor **DEV/TST/ACC** (verwijzend naar de bijbehorende testtenants, indien beschikbaar). Als ze door PRD ondersteunde authenticatie/data delen (zoals bij jullie), modelleer dan die expliciete **Depends on** naar de **PRD data sync**-capability zoals hierboven beschreven.

**NOOT VAN DE AUTEUR: Het is zinvol om afhankelijke Application Services (of liever: Service Instances) aan elkaar te relateren.**

**Te registreren relaties (gebruik deze OOTB-relatietypen)**

Gebruik **cmdb\_rel\_ci** met deze typen:

**Servicestructuur**

-   **Service Offering → Application Service**: Depends on::Used by  
    (Offering **Depends on** App Service)
-   **Application Service → Business Application**: Depends on::Used by  
    (App Service **Depends on** logische Business App)
-   **Application Service → Technical Service**: Depends on::Used by  
    (App Service **Depends on** gedeelde technologie)

**NOOT VAN DE AUTEUR: Ik moest dit een paar keer lezen, maar het klopt. Let alleen goed op welke parent en welke child is!!**

**Infra & runtime**

-   **Software Instance → Server**: Runs on::Runs
-   **Server/VM → Cloud Technical Service**: Hosted on::Hosts (of Depends on als je de TS abstract houdt)
-   **Application Service → Software Instance (MID)**: Depends on::Used by (als die MID noodzakelijk is voor de werking van die service)

**Cross-env data sync**

-   **Non-prod App Service → PRD identity export/sync (TS offering of App Service)**: Depends on::Used by

**NOOT VAN DE AUTEUR: Hiervoor had ik een ander relatietype verwacht, bijv. "Exchanges data with", een horizontale afhankelijkheid tussen peers. In Unified Maps wil je deze afhankelijkheid mogelijk "verbergen" of "alleen tonen" om de map leesbaar te houden.**

**Event intake**

-   **ITOM PRD App Service → AIOps Event Sources – IT4IT Tools (TS)**: Depends on::Used by

### **Voorbeeldinvoer (beknopt, kopieerbaar)**

**NOOT VAN DE AUTEUR: ChatGPT vatte al het bovenstaande samen in de onderstaande lijsten. Ik heb toegevoegd/met kleuren aangegeven wat ik net iets anders zou aanraden**

**Business Services (cmdb\_ci\_service\_business)**

-   ESM (Enterprise Service Management)
-   CSM (Customer Service Management)
-   IT Security (SecOps)
-   IT Service Mngt (ITSM)
-   IT Operations (ITOM & AIOps)

**Service Offerings (service\_offering) — parent = Business Service**

-   ESM – Self-Service Portal
-   ESM – Virtual Agent (Teams)
-   ESM – Email Intake
-   CSM – Case Management
-   IT Security – Security Operations
-   IT Operations – Event/AIOps Processing
-   IT Operations – Discovery & Integration
-   IT Operations - Tech Service Management
-   IT Support - Tech Training
-   IT Support - Central Print

**Business Applications (cmdb\_ci\_business\_app)**

-   ServiceNow – ITSM (Platform)
-   ServiceNow – CSM (Platform)
-   ServiceNow – ITOM (Platform)
-   ServiceNow – Now Assist (Platform)
-   ServiceNow - Platform
-   ServiceNow - Finance
-   ServiceNow - Workforce
-   ServiceNow - Vendor & Procurement
-   ServiceNow - Health, Safety, Security, and Environmental
-   ServiceNow - Risk, Audit & Compliance
-   ServiceNow - Legal
-   ServiceNow - Property & Facility
-   ServiceNow - Corporate Communications
-   ServiceNow - Sustainability & ESG

**Application Services (cmdb\_ci\_service\_auto)**

-   ServiceNow ITSM – DEV/TST/ACC/PRD
-   ServiceNow CSM – DEV/TST/ACC/PRD
-   ServiceNow ITOM – DEV/TST/ACC/PRD
-   ServiceNow Now Assist – DEV/TST/ACC/PRD
-   ServiceNow – DEV Instance
-   ServiceNow – TST Instance
-   ServiceNow – ACC Instance
-   ServiceNow – PRD Instance

**Technical Services (cmdb\_ci\_service\_technical)**

-   Identity & Access – Azure AD
-   Identity & Access – Saviynt (gepland)
-   HR Data – Workday
-   Architecture – LeanIX
-   SAP Landscape – SAP CALM
-   Device Management – Intune
-   Device Management – JAMF
-   Cloud – Oracle Cloud Infrastructure
-   Cloud – Microsoft Azure
-   Cloud – Amazon Web Services
-   Messaging – Email Gateway
-   Collaboration – Microsoft Teams (Virtual Agent)
-   AIOps Event Sources – IT4IT Tools
-   ServiceNow - ESM

**Infrastructuur & software**

-   Servers (cmdb\_ci\_server):
    -   OCI – MID Host – PRD
    -   OCI – MID Host – NONPRD

-   Software Instances (cmdb\_ci\_software\_instance):
    -   MID Server – PRD (Runs on OCI – MID Host – PRD)
    -   MID Server – DEV (Runs on OCI – MID Host – NONPRD)
    -   MID Server – TST (Runs on OCI – MID Host – NONPRD)
    -   MID Server – ACC (Runs on OCI – MID Host – NONPRD)
    -   gebruik het referentieattribuut "installed on", gebruik geen CI-relatie

**NOOT VAN DE AUTEUR: ChatGPT verraste me met de onderstaande aanbevelingen, waar ik niet om had gevraagd, maar die kloppen en het vermelden waard zijn**

**Minimale veldhygiëne (volgens CSDM-good practice)**

-   **Alle Services/Offerings/App Services**
    -   environment (DEV/TST/ACC/PRD) — instellen op App Services; Business/Technical Services doorgaans “N/A”
    -   service\_classification (Business vs Technical vs Application)
    -   business\_owner, it\_owner, supported\_by (assignment/support group)
    -   life\_cycle\_stage (Plan, Deliver, Operate, Retire)
    -   **Offerings**: publicatiestatus, aanvraagbaar (J/N), contactkanalen (tags)
-   **Servers/VM's**
    -   install\_status (Installed/Operating), operational\_status, manufacturer, model\_id, os\_version, location, owned\_by, managed\_by
-   **Software Instance (MID)**
    -   discovery\_source (bijv. ServiceNow), version, host\_name-relatie, schedule/capabilities via tags
-   **Relaties**
    -   Vermijd relaties naar **Retired**/verwijderde CI's; houd **Runs on/Hosted on/Depends on** volledig en accuraat

**Hoe dit aansluit op jouw beschreven situatie**

-   **Vier instances & producten** → vastgelegd als **Application Services per ENV** en gekoppeld aan **Business Services/Offerings**.
-   **ESM/CSM-gebruik** → Business Services met Offerings; Offerings **depend on** App Services.
-   **SecOps** → Business Service (IT Security (SecOps)) met Offering, **depends on** ServiceNow ITSM/Now Assist – PRD (als je SecOps als eigen App Service modelleert, voeg dan ServiceNow SecOps – PRD toe).
-   **Now Assist & AIOps** → ServiceNow Now Assist – <ENV> en de Offering IT Operations – Event/AIOps Processing die **depends on** AIOps Event Sources – IT4IT Tools.
-   **Identity- & HR-integraties** → Technical Services (Azure AD, Workday, Saviynt), gerelateerd via Depends on vanuit App Services.
-   **Dagelijkse sync PRD→Non-prod** → expliciete Depends on vanuit non-prod App Services naar een PRD-capability “Identity Sync” (technical offering of app service).
-   **SSO met Azure AD** → App Services **depend on** Identity & Access – Azure AD.
-   **Virtual Agent (Teams)** → Offering ESM – Virtual Agent (Teams) **depends on** ServiceNow Now Assist – PRD + Collaboration – Microsoft Teams (Virtual Agent).
-   **MID servers op twee Windows-VM's** → Software Instances **Run on** de twee servers; App Services (vooral ITOM) **depend on** de betreffende MID-instance.

**// EINDE VAN HET EERSTE ANTWOORD //**

## De dialoog met ChatGPT ging verder

Tot zover niet slecht, toch? Daarna begon ChatGPT me vragen te stellen, en ik beantwoordde ze allemaal met "Ja", gewoon om te zien wat er gegenereerd zou worden:

-   Als je wilt, kan ik een CSV (of Excel) genereren met alle rijen (naam, tabel/klasse, omgeving, eigenaar en de exacte relatieparen), zodat je die kunt importeren of als bouwchecklist kunt gebruiken.
-   Wil je dat ik ook een tweede sheet genereer met de relatieparen (From CI → Relation → To CI), zodat je de volledige bedradingskaart klaar hebt voor cmdb\_rel\_ci?
-   Wil je dat ik beide datasets exporteer naar één Excel-werkmap met twee sheets (CI's, Relaties), zodat je die direct als laadplan kunt gebruiken?
-   Wil je dat ik ook kolommen voor eigenaar / supportgroep / lifecycle stage toevoeg, vooraf ingevuld met placeholders, zodat je de governancegegevens vóór de import kunt aanvullen?
-   Wil je dat ik ook een derde sheet genereer met een datadictionary (definities van elke tabel/klasse en elk relatietype), zodat het bestand volledig zelfdocumenterend is?
-   Wil je dat ik ook een visueel Unified Map-diagram genereer (op basis van deze relaties), zodat je de architectuur in één oogopslag kunt laten zien?
-   Wil je dat ik ook een PowerPoint-versie van dit diagram maak, zodat je die direct in presentaties voor stakeholders kunt gebruiken?
-   Wil je dat ik ook een tweede slide toevoeg die de CI-categorieën (Business Services, Offerings, App Services, Technical Services, Infra) met aantallen samenvat, zodat stakeholders zowel een plaatje als een legenda krijgen?
-   Wil je dat ik ook een legendaslide toevoeg die de kleurcodering uitlegt (Business Service = lichtblauw, Technical Service = violet, enz.), zodat het diagram in presentaties makkelijker te lezen is?
-   Wil je dat ik ook een vijfde slide toevoeg met de volgende stappen / aanbevelingen (bijv. governancevelden aanvullen, relaties valideren, afstemmen met het TBM-kostenmodel)?
-   Wil je dat ik ook een korte slide met een managementsamenvatting maak (1–2 zinnen per onderwerp) die je kunt gebruiken als snelle briefing voor het senior management?
-   Wil je dat ik ook een infographic van één pagina (PNG) maak die dit hele verhaal samenvat, om snel te delen via Teams of e-mail?
-   Wil je dat ik ook een pdf-versie op posterformaat (A3-layout) maak, zodat die geprint of in workshops gedeeld kan worden?
-   Wil je dat ik ook een checklist in Excel (import-runbook) maak die je aan je admins kunt geven, zodat zij dit proces stap voor stap kunnen volgen?

De vragen waren leuk, maar de geleverde antwoorden voldeden helaas niet aan mijn standaarden. In dat opzicht faalde ChatGPT jammerlijk. ChatGPT zei:

> Je hebt nu een complete toolkit:
> 
> -   *Data (CI's + relaties) in Excel/CSV*
> 
> -   *Met governance verrijkt model*
> 
> -   *Templates voor transform maps*
> 
> -   *Definities van relatietypen*
> 
> -   *Unified Map-diagram, infographic, poster en PowerPoint-deck*
> 
> -   *Importprocedure + runbook-checklist*
> 
> Wil je dat ik ook een korte conceptpagina voor Confluence/SharePoint opstel die je intern kunt publiceren om dit model uit te leggen en naar alle deliverables te linken?
