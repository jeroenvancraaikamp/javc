---
title: "CSDM5 ontmoet BusDevSecOps"
excerpt: "Het Common Service Data Model van ServiceNow is momenteel een hot topic in de wereld van IT-management. Ik ken een paar mensen die daadwerkelijk hebben geprobeerd de CSDM-whitepaper te lezen; er is zelfs een CSDM-training/-certificering beschikbaar. Het brede, high-level,"
source: "925acc10d22373b0"
---

Het Common Service Data Model van ServiceNow is momenteel een hot topic in de wereld van IT-management. Ik ken een paar mensen die daadwerkelijk hebben geprobeerd de CSDM-whitepaper te lezen; er is zelfs een CSDM-training/-certificering beschikbaar. Het brede, high-level, one-size-fits-all CSDM5 biedt een datamodel dat naast de vele frameworks kan bestaan die je binnen je organisatie gebruikt.

Net als IT4IT 3.0 onderscheidt het CSDM de domeinen "Ideation & Strategy", "Design & Planning", "Build and Integration", "Service Delivery", "Service Consumption" en "Manage Portfolio". Elk object in het datamodel hoort bij één domein. Op dit moment gebruiken maar weinig bedrijven één platform om alle domeinen te beheren. Meestal gebeurt "Build and Integration" met meerdere technologiespecifieke tools. Observability, Continuous Integration, Continuous Delivery en Container Orchestration worden steeds vaker als afzonderlijke DevOps-domeinen behandeld. Ook Security Response wordt steeds meer een apart domein.

In de afbeelding hierboven staan de belangrijkste objecten van het Common Service Data Model (CSDM), ongeacht het domein waarin ze volgens ServiceNow worden gebruikt/beheerd. Daardoor is deze afbeelding universeler bruikbaar, los van het gebruik van (varianten van) DevOps, Dev & Ops, DevSecOps, BusDev of BusDevOps.

### CSDM-OBJECTEN

CSDM definieert het object **Business Application**: een (logisch of fysiek) product of een service die nul of meer business capabilities/functionaliteiten mogelijk maakt. Een applicatie kan nul of meer keren worden gedeployed. Een applicatie kan componenten bevatten die zelfstandig of als onderdeel van de applicatie kunnen worden gedeployed. Elke Business Application heeft een lifecycle die door een agile team moet worden beheerd. Andere frameworks gebruiken voor Business Applications het woord "Solution", maar bedoelen precies hetzelfde. In CSDM wordt applicatiesoftware die als service wordt geleverd (SaaS) ook als Business Application beschouwd.

Middleware, cloud en IaC worden niet als business applications beschouwd, maar als technology management service offerings. De gedeployde technische items worden gedeployed als onderdeel van een infrastack/-template,

Applicatiestacks van/voor Business Applications en/of Technology Management Services kunnen meerdere keren worden geïnstantieerd. Elke gedeployde stack heet een **Service Instance**. Doorgaans zijn stacks omgevings-, technologie- of locatiespecifiek, of een combinatie daarvan. Een bedrijf kan bijvoorbeeld drie landspecifieke O365-productietenants hebben en één generieke O365-testtenant. In totaal heeft het bedrijf dan vier service instances van dezelfde "AD Application". Sommige service instances zijn geen stacks, maar logische groeperingen van vergelijkbare items (bijv. "Windows Servers in NL" en/of "Windows Production Servers".

Een stack is doorgaans een verzameling samenhangende items. Bijvoorbeeld een Java Application Resource die gehost wordt op een Java App Server, die draait op een Windows Server, enzovoort. Elk item wordt afzonderlijk geregistreerd als configuration item (CI). De verzameling CI's heet het **Service Delivery System** (voorheen bekend als CMDB)**.** De items zijn via CI-relaties met elkaar verbonden. Handmatige registratie is tegenwoordig verleden tijd; de items en hun relaties worden automatisch gediscoverd of gefedereerd vanuit een vertrouwde databron. De service instances worden (handmatig of automatisch) gerelateerd aan de top-level CI's waarvan ze afhankelijk zijn.

> De configuration items in de CMDB worden opgeslagen in klassespecifieke tabellen. ServiceNow kent meer dan 800 hiërarchische CMDB-tabellen (de tabel Windows Server extendt bijvoorbeeld de tabel Server, die de tabel Computer extendt, die de tabel Hardware extendt, die de tabel Configuration item extendt). De (groot)oudertabellen bevatten de records van hun (klein)kindtabellen. De kindtabel erft de attribuutdefinities van zijn (groot)oudertabel. Dat gezegd hebbende, is elk CMDB-object van slechts één klasse. Twee CMDB-objecten kunnen aan elkaar gerelateerd zijn via toegestane relaties van een gedefinieerd type (bijv. Server X "contains::contained by" Disk Y)
> 
> In plaats van gebruikers de records in een van de 800 tabellen te laten selecteren, is het aan te raden ze alle records te laten zien van een tiental achter-achter-oudertabellen, bijv. "Application Resources", "Web Resources", "Database Resources", "MSSFT Database Servers", "IIS Webserver", "Windows/Linux Servers/VMs", "Hypervisors", "enz."

Interne en externe klanten kunnen **Business Service Offerings** afnemen. De **Business Service** definieert wat er geleverd wordt, en de Business Service Offering definieert specifieke varianten daarvan. Elke offering wordt geleverd/ondersteund door één team. Dezelfde service die in twee landen wordt geleverd, kan verschillende openingstijden hebben, verschillende supportafspraken kennen en verschillende supportteams gebruiken. Voor sommige services is er een standaard offering en een uitgebreide offering. Op een Business Service Offering kan worden geabonneerd door locatie-, organisatie- of bedrijfsspecifieke groepen personen. Een Business Service Offering kan afhankelijk zijn van nul of meer service instances. Business Service Offerings die bedoeld zijn voor interne klanten/medewerkers (bijv. "HR Payroll" of "Tijdschrijven") mogen alleen door interne bedrijven worden afgenomen.

Elke onderliggende technologie die een bedrijf gebruikt, moet worden geleverd door een interne of externe serviceprovider. De technologie wordt als service geleverd of beheerd. De service wordt afgenomen door de partij die eigenaar/beheerder is van de service instance die van die onderliggende technologie afhankelijk is. **Technology Management Service Offerings** definiëren afspraken, abonnementen en governance voor de bijbehorende service instances. Een provider kan bijvoorbeeld een Technology Management Service Offering "Windows Server Support" leveren, die onderdeel is van de **Technology Management Service** "Hosting Support"**.** Gebruik je verschillende teams, bijvoorbeeld om gebruikers in een bepaald geografisch gebied te ondersteunen, dan wil je misschien locatiespecifieke offerings aanmaken en gebruikers in die gebieden daarop laten abonneren. Wil je onderscheid maken tussen productie- en niet-productieservers, dan kun je voor elk een aparte offering aanmaken. Als het echt moet, kun je gecombineerde geografie- en omgevingsspecifieke offerings aanmaken. Heb je drie instances van dezelfde applicatie, die elk door een bepaalde groep gebruikers worden gebruikt, dan moet je aparte service instances aanmaken en MAG je aparte service offerings en abonnementen aanmaken. Tip: maak geen aparte offerings aan als de afspraken, abonnees en supportteams (vrijwel) gelijk zijn.

### BEST PRACTICES

-   Business Applications moeten versieonafhankelijk zijn. Maak dus geen aparte Business Applications aan (bijv. ServiceNow, Zurich) voor elke versie van de applicatie als het enige verschil de versie is en de overige attributen gelijk zijn.
-   Pc-applicaties worden geregistreerd als productmodellen van softwarepakketten die op pc's zijn gedetecteerd, niet als Business Applications. Individuele instances van pc-applicaties worden niet als service instance geregistreerd. Hoewel ik het niet aanraad, kun je een TASK of een CASE relateren aan een End-user Device Service Offering en verwijzen naar het software-CI dat erop is geïnstalleerd.
-   Zakelijke klanten/medewerkers mogen geen Technology Management Services kunnen afnemen (en ernaar verwijzen).
-   Voor elke Business Application moet er minimaal één service offering zijn met minimaal één service instance,  
    zodat events en vulnerabilities op een service instance van die applicatie kunnen worden toegewezen aan het team dat de offering levert waarin de service instance zit.
-   Als een Business Application als service aan de business wordt aangeboden, moet die service worden geregistreerd als Business Service of als Business Service Offering daarvan.  
    Dat gezegd hebbende, zouden Business Services en/of Business Service Offerings idealiter businessgericht moeten zijn (bijv. "Payroll") en niet technologiegericht (bijv. "Workday")

### GEBRUIK VAN CSDM-DATA

In ServiceNow-instances die CSDM gebruiken, is er een duidelijk onderscheid tussen technologie en business. De twee werelden zijn fundamenteel gescheiden, maar nauw met elkaar verbonden.

Zakelijke gebruikers of externe klanten kunnen cases/issues/calls/requests aanmaken op de service offerings waarop ze geabonneerd zijn. Dat kan via het medewerkers-/klantportaal of – steeds vaker – via een AI-ondersteunde chatbot. De chatbot weet wie de melder is, waarop hij geabonneerd is en welke issues eerder door de business of andere medewerkers zijn gemeld, inclusief de oplossingen daarvan. Als de chatbot de case niet kan oplossen, kan die worden toegewezen aan de helpdesk of worden gekoppeld aan een eerder geopend technisch incident.

Elke service offering heeft eigen afspraken en een eigen set abonnees. Mensen in België kunnen dus een case indienen bij HR België, maar doorgaans niet bij HR Nederland. Zo worden ze niet afgeleid door offerings die voor hen niet relevant zijn. Bovendien maakt dit datagedreven routering mogelijk van HR-cases van gebruikers in Nederland naar het HR-team dat verantwoordelijk is voor Nederland. Op dezelfde manier kunnen issues met pc's in een gebouw naar de helpdesk van dat gebouw worden geleid. Gemelde issues/vragen over O365 kunnen naar een lokale helpdesk worden doorgestuurd voordat een incident aan de centrale 2e lijn wordt toegewezen.

Klant-/medewerkerissues moeten gerelateerd zijn aan een geabonneerde Business Service Offering en kunnen gerelateerd zijn aan de getroffen service instance waarvan de service offering afhankelijk is. Bijvoorbeeld service offering "Payroll" van service "HR" en service instance "Workday \[PR\]". Bij sommige Business Service Offerings kan een passend CI worden geselecteerd dat aan de melder is toegewezen. Als een melder bijvoorbeeld een issue meldt met een "Windows Computer", kan de laptop/VDI van de gebruiker als getroffen CI worden aangemerkt.

Waargenomen events, vulnerabilities, alerts en gemelde servicedegradaties kunnen worden opgepakt door een taak toe te wijzen aan het technische supportteam dat gerelateerd is aan de getroffen Technical Management Service Offering. Door het ontwerp kan automatisch worden bepaald welke offering de getroffen service instance bevat en welk team betrokken moet worden. Waar relevant kan automatisch een case worden aangemaakt, via welke de getroffen medewerkers/klanten kunnen worden geïnformeerd/op de hoogte gehouden. Omgekeerd kan een AI-agent het aanmaken van een 2e-lijnsincident triggeren als duidelijk is dat de 1e lijn het incident niet kan oplossen.

Teams kunnen incidenten, requests en andere taken naar hun **agile taskboards** slepen en ze daar toewijzen, van commentaar voorzien of oplossen. Terugkerende incidenten kunnen als defects worden getrieerd en vervolgens via agile stories worden opgepakt. Kleine gevraagde verbeteringen kunnen via stories worden opgepakt.

TASKS zoals incidenten, changes, stories enz. moeten gerelateerd zijn aan een geabonneerde Technical Management Service Offering en kunnen (optioneel) gerelateerd zijn aan het/de getroffen configuration item(s) en/of service instances. Taken kunnen worden toegewezen aan leden van de juiste teams die in de Technology Management Service Offering zijn geregistreerd.

TASKS komen steeds vaker voort uit DevSecOps-events/-agents. Rapid7 kan bijvoorbeeld een vulnerability op een configuration item detecteren en een Vulnerability Response-TASK-record aanmaken. Het CI is gekoppeld aan een service instance binnen een Technical Management Service Offering die eigendom is van/beheerd wordt door een team. Met behulp van CSDM-data kunnen de relevante teams automatisch worden geselecteerd en op de hoogte worden gebracht van gedetecteerde vulnerabilities.

Voor wie het niet weet: TASKS vervangen CASES niet, en omgekeerd. Ze bestaan naast elkaar, dienen elk hun eigen doel en hebben elk hun eigen communicatielijnen. Een case kan tot veel taken leiden, en een taak kan aan veel cases gerelateerd zijn. Wanneer een case wordt bijgewerkt, kunnen de gerelateerde taak/taken worden bijgewerkt, en omgekeerd. Wanneer een taak wordt gesloten, kunnen de gerelateerde case(s) worden gesloten (of niet). Work notes bij taken zijn niet zichtbaar voor wie niet geautoriseerd is om de taak te bekijken.

Klant-CASES moeten voldoen aan de SLA-afspraken die gelden voor de Business Service Offering.  
De technische TASK moet voldoen aan de OLA/UC-afspraken die gelden voor de Technical Service Offering.

Door de abonnementen op de offerings bij te werken, kunnen oude offerings naadloos/selectief worden vervangen door nieuwe offerings.  
Als verantwoordelijkheden veranderen, kunnen de toe te wijzen groepen in de service offerings worden aangepast.

### SLOTOPMERKINGEN

Via CSDM kun je een ecosysteem van BUSiness, DEVelopment, SECurity en OPerationS mogelijk maken, waarin (alleen) relevante data beschikbaar is voor wie die nodig heeft. De objecten werken elkaar bij als/wanneer dat nodig is.
