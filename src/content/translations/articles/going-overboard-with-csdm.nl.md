---
title: "Doorslaan met CSDM 5?"
excerpt: "ServiceNow heeft een PowerPoint-presentatie van 132 slides gepubliceerd met voorbeelden van hoe je het IT-landschap volgens CSDM 5 zou kunnen modelleren. Hoewel ik over het algemeen dol ben op CSDM, lijken sommigen door te slaan bij het modelleren van hun IT-landschap in ServiceNow. Laten we"
source: "7d32fdda2aa10f19"
---

ServiceNow heeft een [**PowerPoint-presentatie van 132 slides met voorbeelden**](https://learning.servicenow.com/nowcreate?id=nc_asset&asset_id=90b0eaca879dae106838fd16dabb3502&nc_source=copy_asset_link) gepubliceerd van hoe je het IT-landschap volgens CSDM 5 zou kunnen modelleren. Hoewel ik over het algemeen dol ben op CSDM, lijken sommigen door te slaan bij het modelleren van hun IT-landschap in ServiceNow. Laten we een voorbeeld nemen: **Hoe je het ServiceNow-platform (niet) modelleert in CSDM 5.**

Het ServiceNow-platform wordt gebruikt door bedrijven van verschillende typen, omvang en volwassenheid, voor verschillende doeleinden, door verschillende mensen, in verschillende culturen, die vaak meerdere procesframeworks gebruiken. Het CSDM helpt om de data te structureren en te beheersen, maar het is geen one-size-fits-all-model. Bovendien is het CSDM nog steeds in ontwikkeling. CSDM 5 is al zoveel beter dan zijn voorgangers. Maar versie 5 is een stuk complexer, en vatbaarder voor interpretatie, dan zijn voorgangers van respectievelijk 4 en 6 jaar geleden.

Zo kent CSDM 5 nu Service Portfolio's (DPM), Taxonomy Nodes (DPM), Value Chains (Foundation), Project Portfolio's (SPM), Business Units (Foundation) en Top-level Business Capabilities (SPM). Elke groep heeft/gebruikt zijn eigen artefacten. Niet iedereen leest de CSDM 5-whitepaper of houdt zich aan de definities/aanbevelingen daarin. Eerlijk is eerlijk: CSDM laat behoorlijk wat ruimte voor interpretatie. Veel bedrijven vullen daardoor alle 6 artefacten met dezelfde waarden "HR", "IT", "Risk", "Finance", "Legal", "Supply Chain", "Marketing", "Sales" en "CRM". Anderen zetten in elk van de 6 artefacten andere waarden. Sommige organisaties willen tegemoetkomen aan elke denkbare uitzondering/voorkeur die iemand maar kan hebben.

**Ik raad aan om artefacten te gebruiken waarvoor ze bedoeld zijn, zoveel mogelijk te hergebruiken en het simpel te houden.** Daarnaast geloof ik in een gelaagd model, waarin de klanten zakendoen met het bedrijf, de business (en haar gebruikers) wordt ondersteund door geïntegreerde/beheerde oplossingen, en die oplossingen op hun beurt worden ondersteund door commodity-technologietorens.

Meestal adviseer ik onderscheid te maken tussen een Application Portfolio, een Component Portfolio, een Project/Program Portfolio, een Technical Service Portfolio en een Business Service Portfolio. Alle items binnen die portfolio's moeten worden gekoppeld aan relevante Foundational Artefacts, zoals de Value Chains, Business Units, afdelingen, bedrijven, regio's, landen, locaties, eigenaren en groepen waartoe het item behoort. Je zou van elk type meerdere portfolio's kunnen aanmaken, maar ik raad af om ooit meer dan 6-8 portfolio's van een bepaald type te hebben. Voorbeelden:

1.  Eén Application Portfolio voor Business Applications, één voor IT4IT-applicaties/-tools en één voor desktop-/mobiele applicaties
2.  Eén Component Portfolio voor PAAS IT-componenten en één voor SDLC IT-componenten
3.  Eén Technology Service Portfolio per PAAS/IAAS-technologietoren
4.  Eén Business Service Portfolio per Business Unit
5.  Eén Project/Program Portfolio per tribe of enterprisedomein

Bedrijven die geen services gedefinieerd hebben, kunnen beginnen met het aanbieden van hun applicaties "als SAAS-service". Als die SAAS-services commitments, entitlements, subscriptions en SLA's hebben (of krijgen), kun je één Service Offering per Business Application aanmaken. Als je applicaties meerdere (omgevings-/locatiespecifieke) offerings kunnen hebben, kun je ervoor kiezen de applicatie als Service te registreren. Het wordt afgeraden om elke desktop-/mobiele applicatie "als service" te registreren.

Elke Service in het Service Portfolio hoort bij één Taxonomy Node en heeft één Accountable Service Owner. Het Business Service Portfolio moet NIET Business Application-specifiek zijn (applicaties horen in het Technical Application Portfolio). Zo staat Workday in het Application (Service) Portfolio en staat "Employee Joiner, Mover & Leaver Support" in het Business Service Portfolio; beide zijn gekoppeld aan de Workday Production Service Instance (CI).

Deze principes kunnen naar mijn bescheiden mening niet platformspecifiek zijn, en moeten organisatiebreed worden onderschreven en gehandhaafd, omdat ze het fundament vormen voor governance en organisatie.

## HOE SLA JE DOOR?

In het ServiceNow-voorbeeld voor ServiceNow is er één Business Application-record voor het ServiceNow-platform. Dat ServiceNow-platform host meerdere afzonderlijke Business Applications. Filosofen kunnen betogen dat ServiceNow alleen een Business Application is als het door de business voor de business wordt gebruikt. Ik ben geen filosoof. Ik vind dat ServiceNow-applicaties gehoste oplossingen zijn die door zakelijke gebruikers worden gebruikt, wat het aanmaken van een Business Application, een Business Service en Business Service Offerings ervoor rechtvaardigt.

Dat gezegd hebbende: Business Capabilities moeten naar mijn mening precies dat zijn. "Manage Technology" is naar mijn mening dus geen Business Capability. Onthoud: Business Capabilities vallen in het domein "Design and Planning" van CSDM 5; ze moeten inzicht geven in welke Business Application waarvoor wordt gebruikt, zonder door te slaan. Bij elke Business Application zou ik verwachten dat er een handvol Business Capabilities wordt ondersteund. Ik zou verwachten dat een Business Capability gemiddeld door een handvol Business Applications wordt geleverd. Zodra elke Business Application twee dozijn Business Capabilities mogelijk maakt, of wanneer het merendeel van de Business Capabilities maar door één applicatie wordt geleverd, ben je waarschijnlijk doorgeslagen.

"SN Incident Mgmt" modelleren als Business Application kan naar mijn mening al snel neerkomen op "doorslaan", omdat het ServiceNow-platform ongeveer 200 unieke capabilities vergelijkbaar met "SN Incident Mgmt" mogelijk maakt. Als je voor elk van die business applications omgevingsspecifieke Service Instances zou aanmaken, leidt dat tot 800 service instances. Elk van die 800 moet een relatie krijgen met een "Yokohama"-instance van het platform. Zelfs als je niet alle ServiceNow-applicaties gebruikt, is het modelleren van afzonderlijke ServiceNow-capabilities als Business Applications naar mijn mening echt geen goed idee.

Een Business Service is een herkenbare verzameling Service Offerings. De Business Service "End User Service" is geen service waarvan ik zou verwachten dat het ServiceNow-platform die levert. De Service Offering "SN Incident Mgmt" is iets waarvan ik niet zou verwachten dat het "als service" wordt geleverd. Evenzo zou ik verwachten dat "System Monitoring" gerelateerd is aan Observability, maar niet aan ServiceNow.

Als je me niet gelooft, voel je dan vrij om dit model in ServiceNow te zetten, inclusief alle artefacten en alle relaties. Vraag vervolgens de auditors en compliance officers om je HLD's, DLD's, roadmaps, OKR's en BIA's/CIA's voor elk van je "applicaties" te beoordelen. Dien daarna een resourceaanvraag in om alle compliancebevindingen opgelost te krijgen. Vraag vervolgens een doorsnee, ongetrainde zakelijke gebruiker om een melding te maken dat "incidenten op Workday aan de verkeerde groep worden toegewezen".

## HOE DOE JE HET 40-60% EFFICIËNTER?

De verschillende portfolio's worden ingericht zoals beschreven in het fundamentgedeelte.

Ervan uitgaande dat innovatie en onderhoud van het ServiceNow-platform in ServiceNow worden uitgevoerd, zou ik het volgende registreren:

-   Eén Program voor het ServiceNow-platform (of één voor respectievelijk IT, HR enz., afhankelijk van wie wat financiert)
-   Eén Demand/Initiative per Objective & Key Result
-   Eén Project per goedgekeurde demand/initiative waarvoor budget/een business case nodig is
-   Zoveel User Stories per Project of Product als nodig
-   Eén Agile DevOps-product per ServiceNow-applicatie (zie hieronder)
-   Eén Group/Agile Board per DevOps-team

Ik zou de CSDM-artefacten voor het hele ServiceNow-platform als volgt modelleren:

### 

-   Foundation (in grijs)

-   16 out-of-the-box **Value Chains**
-   Eén **Product Feature** per ServiceNow-feature (CMDB, Portal, Mobile App, Virtual Agent, Workspace enz.)
-   Eén **Business Process** per proces dat door ServiceNow wordt ondersteund (bijv. INC, PRB, CHG, REQ)
-   Eén **Building/Location** voor het datacenter
-   Eén **Group** die de changes op ServiceNow ondersteunt, doorvoert, beheert en goedkeurt
-   Eén **User** van de **Company** die eigenaar is van het serviceplatform en de bijbehorende services/offerings, en één user voor elk lid van de groep
-   Eén **Product Model** per vergelijkbaar hardware-/softwareproduct

### 

-   Design & Planning (in blauw)

-   Eén **Business** **Capability** per ServiceNow-applicatie (bijv. ITSM, ITAM, ITOM, CSM enz.)
-   Eén **Business Application** voor het ServiceNow-platform

### 

-   Design & Build (in rood)

-   Eén **SDLC Component** voor de JAVA MidServer voor Windows en één per ontwikkelde AI-agent (toekomst)

### 

-   Service Delivery (oranje)

-   Eén **Technical/Business Service** voor Enterprise Service Management (afhankelijk van of ServiceNow voor de business of voor technologie wordt gebruikt)
-   Eén **Technical/Business Service Offering** voor het ServiceNow-platform (ervan uitgaande dat er maar één team aan werkt)
-   Eén **Technical Service Offering** voor elk IAAS/PAAS-itemtype dat als service wordt aangeboden
-   Eén (Application) **Service Instance** (cmbd\_ci\_service\_auto) per uitgerolde ServiceNow-instance
-   Eén **Application** (cmdb\_ci\_app) per instance van de MidServer-app
-   Eén **JAVA Server** (cmdb\_ci\_app\_server\_java), geïnstalleerd op een Windows-server, die de non-prod MidServer-apps host, en één voor de non-prod MidServer-apps.
-   Eén **Windows/Linux Server** voor de non-prod MidServer-apps (servers) en één voor de prod MidServer-apps (servers)
-   Eén **Virtual Machine** per Windows/Linux-server
-   Eén **Azure Data Center** waarop de Windows/Linux-VM's worden gehost

### 

-   Service Consumption (groen)

-   Eén request voor de aanschaf van de servers, VM's enz.
-   Andere voorbeelden...

## Onderbouwing:

1.  Incidents, problems en changes moeten naar mijn mening gerelateerd zijn aan een Service Offering (die bepaalt wie de offering ondersteunt) en optioneel aan het getroffen configuration item waarvan wordt verwacht dat het defect is (dat bepaalt wat mogelijk gerepareerd moet worden). Sommige ServiceNow platform- en process owners staan toe dat vanuit een incident naar een deel van de foundational data (bijv. Location, Company, BU, Product Feature, Business Process) wordt verwezen.
2.  Ik raad aan om één Service Instance per ServiceNow-instance te registreren. Hoewel ik weet dat bedrijven licenties voor ITAM-, ITOM- en ITSM-applicaties bij ServiceNow aanschaffen, en ik weet dat ServiceNow out-of-the-box een platformhost is, modelleer ik de ServiceNow-applicatie niet als zodanig in ServiceNow. In plaats daarvan registreer ik de applicaties als Capabilities, aangezien ServiceNow tientallen applicatiecapabilities biedt. Ik accepteer dat ik hierdoor geen lifecyclemanagement kan doen op de afzonderlijke ServiceNow-applicaties. Wel kan ik zo de Business Processes aan de Capabilities relateren. Het mooiste is dat alle bovenstaande baselines maar één keer worden geregistreerd/onderhouden, en dat we maar één BIA/CIA-review en één periodieke externe audit hoeven te doen voor het hele ServiceNow-platform.
3.  Doorgaans zijn IT, HR, GRC, SECURITY, LEGAL en CSM politieke silo's in grote ondernemingen. Ik raad aan om de politiek in de boardroom af te handelen, maar zal nooit, maar dan ook nooit, aanraden om gescheiden silo's in ServiceNow te modelleren, tenzij er verschillende ServiceNow-contracten met gescheiden instances zijn en total cost of ownership geen belangrijke factor is voor de onderneming. In mijn bijna 20 jaar werken met ServiceNow heb ik nog geen enkel ServiceNow-contract met domein-/instancescheiding gezien dat goed/efficiënt werkt. De meeste ServiceNow-interfaces/-records zijn niet domeinspecifiek. De records die dat wel zijn, kunnen worden beveiligd/beheerd zonder instance-/domeinscheiding.
4.  De Service "Enterprise Service Management" kan ook andere offerings bevatten, bijvoorbeeld voor Apptio-, LeanIX- of MetricStream-platforms, als ESM over meerdere platforms is verspreid. Ook maakt dit het mogelijk om meerdere ServiceNow-platforms binnen de onderneming te hebben (bijv. tijdens het samenvoegen van meerdere ServiceNow-contracten).
5.  Na de toekomst van AI in ServiceNow en andere AI-platforms te hebben bestudeerd, denk ik dat de onderstaande afbeelding het best geschikt is voor grote ondernemingen.
6.  Ik zou de ServiceNow-plugins kunnen modelleren als deployable SDLC-componenten, maar waarom zou je zelf een repository met plugins onderhouden die al elders (op eigen kosten) door ServiceNow wordt onderhouden? Hetzelfde geldt voor de ServiceNow Store-apps. Ik vind het voldoende om de aangeschafte/gebruikte Business Capabilities van het platform als zodanig te registreren en ze te relateren aan de bedrijfsprocessen die ze mogelijk maken/ondersteunen.
7.  Als je besluit om een deel van de ServiceNow-content (periodiek of near-real-time) naar een database/datalake te exporteren, zodat anderen die data kunnen gebruiken zonder de performance van ServiceNow te beïnvloeden, moet je ook de databases, de DBMS'en (of databaseservices) en de tools die de data vanuit ServiceNow naar de database federeren modelleren.
8.  Zoals je misschien hebt gezien, heb ik geen versies van ServiceNow-producten vastgelegd, niet voor de baselines en niet voor de instances. Ik ga ervan uit dat de ServiceNow-instances worden geüpgraded in plaats van vervangen. Tijdens zo'n upgrade (die geen maanden zou moeten duren) blijven de integraties/afhankelijkheden intact. Als de platformcapabilities tijdens een major upgrade drastisch veranderen, voeg ze dan tijdens de upgrade gewoon toe, verwijder ze of werk ze bij. Dat gezegd hebbende: alles wat automatisch wordt gediscoverd (bijv. OS, JAVA-server enz.) krijgt wel een versie. Voor een overzicht van wat in welke major ServiceNow-release zit, raad ik aan de ServiceNow-productdocumentatie en de partnervideo's te gebruiken.

**Trouwens: had ik mijn "safe harbor"-statement al genoemd :-)**

## SAMENVATTING

Er zijn meerdere alternatieven mogelijk om ServiceNow te modelleren met gebruik van de definities en artefacten van CSDM 5. Ik raad aan de meest efficiënte manier te kiezen die nog steeds fit for purpose en fit for audience is. Naar mijn mening is dat zoals in de onderstaande afbeelding.

Ik heb de afgelopen decennia (de governance voor) een dozijn ServiceNow-platforms ingericht en – eerlijk is eerlijk – ik heb het niet altijd efficiënt gedaan, maar ik heb van de ervaring geleerd.

Als je mijn aanbeveling volgt, verminder je het aantal beheerde items waarschijnlijk met 40-60% (en verminder je de administratieve overhead van registratie/review en documentatie van het ServiceNow-platform) ten opzichte van het voorbeeld van ServiceNow. En ja, je kunt dan niet de lifecycle van de afzonderlijke apps in ServiceNow registreren. Maar is dat erg, als er maar één ServiceNow-platform is, met één platformeigenaar, met instances die door meerdere stakeholders worden gedeeld?

![](/wp-content/uploads/2025/06/How_to_model_servicenow_in_csdm_5-scaled.png)
