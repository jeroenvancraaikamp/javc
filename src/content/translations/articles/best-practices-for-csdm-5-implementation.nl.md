---
title: "Best practices voor CSDM 5"
excerpt: "Je hebt CSDM 5 gelezen en je hebt een globaal beeld. Er blijven echter talloze open vragen en keuzes over. Dit artikel beschrijft de practices die ik aanbeveel voor wat je wel (en niet) in ServiceNow modelleert. Door deze aanbevelingen toe te passen"
source: "90864917408791f0"
---

Je hebt CSDM 5 gelezen en je hebt een globaal beeld. Er blijven echter talloze open vragen en keuzes over. Dit artikel beschrijft de practices die ik aanbeveel voor wat je wel (en niet) in ServiceNow modelleert. Door deze aanbevelingen toe te passen voorkom je later problemen.

## Wat je in ServiceNow vastlegt:

### In het Digital Products Portfolio (baselines):

-   Alle Digital Services die formeel als service aan het bedrijf worden aangeboden, inclusief infrastructuur, applicaties en AI Digital Assets (niet geversioneerd).
-   Business Applications die direct door de business worden gebruikt (niet geversioneerd)
-   IT Components & Platforms die de business ondersteunen (geversioneerd)
-   Product Models, bijvoorbeeld voor hardware-/software-assets (niet geversioneerd)

### In de CMDB (geversioneerde instances):

-   Infra van (of beheerd door) het bedrijf
-   Items die zijn gedeployed/geconfigureerd op infra van het bedrijf
-   Items in eigendom van het bedrijf die zijn gedeployed op infra van anderen
-   Verbonden end-user devices, inclusief wat erin/erop is geïnstalleerd.
-   Alle (te betalen) licenties voor product-/service-instances.

## Wat je NIET in ServiceNow vastlegt:

-   Decompositie/componenten van services die door anderen worden geleverd, bijvoorbeeld GSM-antennes van een mobiele telecomprovider.
-   Infrastructuur die integraal onderdeel is van een extern SaaS-/PaaS-aanbod.
-   MS SharePoint-sites, MS Teams-kanalen, Confluence-sites, fileshares, enz. als Business Applications
-   Portfolio-items die niet aan het bedrijf worden aangeboden/geleverd, bijvoorbeeld waarvoor het bedrijf geen formele overeenkomst heeft met de fabrikant, leverancier of managed service provider
-   Portfolio- en CMDB-items die niet in eigendom zijn van of zijn ingekocht door een verantwoordelijke vertegenwoordiger van het bedrijf. Bijvoorbeeld yahoo.com
-   CMDB-items waarvoor incident, problem, change en request management elders door anderen dan het bedrijf wordt uitgevoerd.
-   Financiële attributen die in het grootboek van het bedrijf worden bijgehouden (bijv. boekwaarde, afschrijving, enz.)
-   Items die niet nodig zijn in/voor ondersteunde ServiceNow-practices
-   Alles wat momenteel door het bedrijf is uitgesloten. Bijvoorbeeld on-premise servers, power- en OT-devices, inclusief wat erin/erop draait.

* * *

**ServiceNow als Enterprise Service Management-platform**

ServiceNow is een platform bedoeld voor service management in de hele onderneming. *Services* zijn de belangrijkste artefacten binnen het platform. Zonder te verwijzen naar de service die wordt aangeboden, kun je niet bepalen welke uitkomst of toezeggingen van toepassing zijn op incidents, problems of changes. Alleen services die geformaliseerd zijn – idealiter vastgelegd in een formele overeenkomst tussen het bedrijf en de provider – horen in ServiceNow te worden vastgelegd.

Als een bedrijf de prestaties van serviceproviders wil meten, de services wil registreren waarvan het afhankelijk is, één single source of truth wil hebben voor alle openstaande issues, of de AI-mogelijkheden wil inzetten om incidents, problems of changes te beoordelen en te classificeren, dan moet het de services registreren die door providers worden aangeboden. Gerelateerde records (bijv. incidents en changes) kunnen via e-mail of API's automatisch worden ge-e-bonded met het Service Management-systeem van de leverancier.

* * *

**Applicatieportfolio en baselines**

Enterprise architects (EA) en application portfolio managers (APM) richten zich op *applicatiebaselines* die door de business, voor de business worden gebruikt. Zij beheren de lifecycle van deze baselines, inclusief horizontale afhankelijkheden (interfaces) en verticale afhankelijkheden (technologiestacks). Zij beheren of volgen de deployment van instances van deze baselines niet. Wel willen ze weten waar de applicaties zijn gedeployed en wat hun daadwerkelijke afhankelijkheden zijn.

Het Business Application Portfolio blijft alleen beheersbaar als het geen artefacten bevat die het vervuilen of die onder andere governancemodellen vallen. Als je bijvoorbeeld Notepad++ als Business Application zou registreren, zou dat RBAC op toegang, BIA/CIA-classificaties en een lifecycleplan vereisen – en dat allemaal voor een hulpprogramma. Omdat een gemiddelde pc of Mac honderden van zulke desktopapps kan bevatten, zouden EA en APM overspoeld raken met het beheer van items die geen echte business applications zijn. Desktop- en mobiele apps worden doorgaans uitgerold via app stores of endpoint managers en gaan niet door change control.

**Aanbeveling:** neem desktop- en mobiele apps niet op in het Business Application Portfolio. Als een item bedrijfskritisch is, hoort het niet op een pc of mobiel apparaat te worden gedeployed.

* * *

**Versiebeheer en discovery**

Applicatie*baselines* worden in het portfolio niet geversioneerd, om exponentiële groei te voorkomen. Een baseline kan meerdere gedeployde instances hebben, elk met een andere versie. Deze versies worden doorgaans automatisch ontdekt en gefedereerd – zonder handmatige inspanning. Elke instance kan maar één versie tegelijk draaien.

Als APM buiten ServiceNow wordt beheerd, kunnen aantallen instanceversies vanuit ServiceNow naar tools als SAP LeanIX of Apptio worden gepusht. Als baselines geversioneerd zouden zijn, zou elke instance bij upgrades opnieuw moeten worden toegewezen. Dat is overbodig, tenzij de applicatie en haar data fundamenteel worden vervangen. Zo rechtvaardigt de overgang van SAP R/3 naar SAP S/4HANA in de cloud het aanmaken van een nieuwe baseline.

* * *

**CMDB en asset management**

Gedeployde instances van desktop- en mobiele applicaties zijn te ontdekken en worden in de CMDB gefedereerd. Na correlatie en normalisatie ondersteunen ze asset management, security operations en risk management. Geïnstalleerde en draaiende componenten op end-user devices verschijnen op het *Device Form*. Zowel de *device* als de *service offering* is direct gerelateerd aan het incident. Je *kunt* naar het geïnstalleerde/draaiende item verwijzen, maar best practice is om de *device* als impacted CI te registreren.

Infrastructuursoftware, configuratie-instellingen, middleware en technische tools die niet direct door gebruikers worden gebruikt, horen **niet** als Business Applications te worden geregistreerd. Hun lifecycle wordt niet door APM beheerd en de toegang wordt niet via RBAC geregeld. Wijzigingen aan infrastructuur – zoals het patchen van besturingssystemen of DBMS-platforms – raken meerdere business applications en worden anders afgehandeld dan wijzigingen aan één enkele business app. Het vervangen van EOL-componenten vraagt doorgaans om grootschalige infrastructuurprojecten. Discovery en federatie helpen om de versies en locaties van zulke items te bevestigen.

In LeanIX worden IT Components vaak op hoofdversieniveau geversioneerd (bijv. *MS SQL Server 2016*). In ServiceNow worden ze over het algemeen vastgelegd als niet-geversioneerde *Service Offerings* (bijv. *MS SQL Server Support* als onderdeel van de service *Database Administration*).

* * *

**Externe infrastructuur en risico-overwegingen**

Als business applications (of hun data/componenten) op infrastructuur van derden zijn gedeployed, willen risk- en auditstakeholders daar zicht op hebben. Het wordt aanbevolen om deployments en changes van applicaties in eigendom van het bedrijf te volgen en goed te keuren via de interne Service Management-oplossing.

Waar kosten verbonden zijn aan gedeployde items, horen bedrijven gebruik en benutting actief te monitoren. Als licentiekosten gebaseerd zijn op gebruiksmetrics naast het aantal installaties, horen ook die metrics te worden gemonitord.

Providers die black-boxservices aanbieden, geven zelden gedetailleerde gegevens over interne componenten vrij. Dat is acceptabel als de provider beschikbaarheid, performance en security garandeert. Compliancebewijs kan worden opgevraagd zonder de interne gegevens van de provider in de CMDB van het bedrijf op te slaan – zo hoef je geen gevoelige externe informatie bij te houden.

Items registreren die door derden worden geleverd – zonder dat er een formele overeenkomst is – is riskant. De provider heeft dan geen verplichting om het bedrijf te ondersteunen, compliance te handhaven of continuïteit te waarborgen. Auditors en risk officers zullen dit waarschijnlijk als non-compliant beoordelen.

Services die door anderen worden geleverd, *moeten* in het ServiceNow-systeem van het bedrijf zijn opgenomen als het bedrijf erop vertrouwt. Als die providers hun eigen incidents, problems of changes in hun eigen ITSM-tool beheren, horen hun interne componenten niet in de CMDB van het bedrijf te worden gedupliceerd – tenzij ze onder strikte governance worden gefedereerd, met aandacht voor de implicaties op het gebied van security, AVG en compliance.

* * *

**Scope en performance beheren in ServiceNow**

ServiceNow overladen met onnodige details (bijv. data op bestandsniveau van gebruikersapparaten) gaat ten koste van de performance. Registreer alleen items die relevant zijn voor practices die door ServiceNow of de stakeholders ervan worden ondersteund.

De opbouw van een CMDB is een meerjarig proces dat zorgvuldig gepland en geprioriteerd moet worden. Richt je eerst op kritieke items. Als een deel van het bedrijf wordt verkocht, kan discovery in dat deel een lagere prioriteit krijgen. Tijdelijke infrastructuur (bijv. tijdelijke back-up-VM's) hoort niet te worden geregistreerd, tenzij die blijvend wordt gebruikt. Uit gebruik genomen resources horen direct te worden gerетired. Documenteer de scope en plannen voor services, assets en configuraties en beoordeel ze periodiek.

* * *

**Moderne collaborationplatforms en hun classificatie**

Items zoals SharePoint-sites, Confluence-spaces, Google Workspace en MS Teams-kanalen worden doorgaans niet via incident- of changeprocessen beheerd. Daarom horen ze niet als Business Applications te worden geclassificeerd. In plaats daarvan:

-   Registreer 'SharePoint', 'Confluence' en 'MS Teams' als Business Applications.
-   Registreer URL's automatisch als *Application Services* via federatie vanuit platforms als O365 of Atlassian.
-   Hanteer consistente standaarden voor classificatie en naamgeving.

Let op: sommige auditors kunnen bezwaren hebben tegen het gebruik van zulke platforms voor bedrijfskritische doeleinden.

* * *

**O365 en collaboration-agents**

Mail- en collaboration-agents (bijv. Outlook- en Teams-clients) op end-user devices horen net als elke andere desktop- of mobiele app te worden geregistreerd. Incidents horen tegen de *device* te worden aangemaakt, niet tegen de geïnstalleerde agent.

Sommige bedrijven registreren belangrijke O365-componenten als Business Applications en passen daarop hetzelfde governancebeleid toe. O365-tenants en -apps worden echter doorgaans centraal onderhouden en verschillen van standaard business applications.

**Aanbeveling:** registreer de *O365 Suite* als één Business Application. Definieer *Corporate Mail*, *Collaboration* en *Content Management* als Infrastructure Services of Service Offerings.

* * *

**SDLC-componenten en baselines**

SDLC-componenten (niet opgenomen in de genoemde tabel) worden in ServiceNow óf als geversioneerde baselines geregistreerd, óf helemaal niet. Beide benaderingen hebben voor- en nadelen (zie andere blogs). Als ze worden geregistreerd, zijn deze componenten geversioneerd en kunnen ze worden gedeployed. Hun instances kunnen in infrastructuur- of cloudomgevingen worden ontdekt of gefedereerd.
