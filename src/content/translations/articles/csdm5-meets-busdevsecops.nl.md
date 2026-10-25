---
title: "CSDM5 ontmoet BusDevSecOps"
excerpt: "Het Common Service Data Model van ServiceNow is momenteel een hot topic in de wereld van IT-management. Ik ken een paar mensen die daadwerkelijk hebben geprobeerd de CSDM-whitepaper te lezen; er is zelfs een CSDM-training/-certificering beschikbaar. Het brede, high-level,"
source: "a1e38c66cb0f25c4"
---

Het Common Service Data Model van ServiceNow is momenteel een hot topic in de wereld van IT-management. Ik ken een paar mensen die daadwerkelijk hebben geprobeerd de CSDM-whitepaper te lezen; er is zelfs een CSDM-training/-certificering beschikbaar. Het brede, high-level, one-size-fits-all CSDM5 biedt een datamodel dat naast de vele frameworks kan bestaan die je binnen je bedrijf mogelijk gebruikt.

Net als IT4IT 3.0 onderscheidt het CSDM de domeinen "Ideation & Strategy", "Design & Planning", "Build and Integration", "Service Delivery", "Service Consumption" en "Manage Portfolio". Elk object in het datamodel hoort bij één domein. Op dit moment gebruiken maar weinig bedrijven één platform om alle domeinen te beheren. Meestal wordt "Build and Integration" gedaan met meerdere technologiespecifieke tools. Observability, Continuous Integration, Continuous Delivery en Container Orchestration worden steeds vaker als afzonderlijke DevOps-domeinen behandeld. Ook Security Response wordt steeds vaker een afzonderlijk domein.

In de afbeelding hierboven staan de belangrijkste objecten van het Common Service Data Model (CSDM), ongeacht het domein waarin ze volgens ServiceNow worden gebruikt/beheerd. Daardoor is deze afbeelding breder bruikbaar, ongeacht het gebruik van (varianten van) DevOps, Dev & Ops, DevSecOps, BusDev of BusDevOps.

### CSDM-OBJECTEN

CSDM definieert het object **Business Application**, dat een (logisch of fysiek) product of een service kan zijn, die nul of meer Business Capabilities/functionaliteiten mogelijk maakt. Een applicatie kan nul of meer keer gedeployd zijn. Een applicatie kan componenten bevatten die zelfstandig of als onderdeel van de applicatie gedeployd kunnen worden. Elke Business Application heeft een lifecycle die door een agile team beheerd moet worden. Andere frameworks gebruiken het woord "Solution" voor Business Applications, maar bedoelen precies hetzelfde. In CSDM wordt applicatiesoftware die als service wordt geleverd (SaaS) ook als Business Application beschouwd.

Middleware, Cloud en IaC worden niet als Business Applications beschouwd, maar zijn Technology Management Service Offerings. De gedeployde technische items worden gedeployd als onderdeel van een infrastack/-template,

Application stacks van/voor Business Applications en/of Technology Management Services kunnen meerdere keren geïnstantieerd worden. Elke gedeployde stack heet een **Service Instance**. Doorgaans zijn stacks omgevings-, technologie- of locatiespecifiek, of een combinatie daarvan. Een bedrijf kan bijvoorbeeld drie landspecifieke O365-productietenants hebben en één generieke O365-testtenant. In totaal heeft het bedrijf dan vier Service Instances van dezelfde "AD Application". Sommige Service Instances zijn geen stacks, maar logische groeperingen van vergelijkbare items (bijvoorbeeld "Windows Servers in NL" en/of "Windows Production Servers".

Een stack is doorgaans een verzameling samenhangende items. Bijvoorbeeld een Java Application Resource die gehost wordt op een Java App Server, die draait op een Windows Server, enzovoort. Elk item wordt afzonderlijk geregistreerd als Configuration Item (CI). De verzameling CI's heet het **Service Delivery System** (voorheen bekend als CMDB)**.** De items zijn met elkaar verbonden via CI-relaties. Handmatige registratie is tegenwoordig verleden tijd; de items en hun relaties worden automatisch gediscoverd of gefedereerd vanuit een betrouwbare databron. De Service Instances worden (handmatig of automatisch) gerelateerd aan de top-level CI's waarvan ze afhankelijk zijn.

> De Configuration Items in de CMDB worden opgeslagen in klassespecifieke tabellen. ServiceNow kent 800+ hiërarchische CMDB-tabellen (bijvoorbeeld: de tabel Windows Server extendt de tabel Server, die de tabel Computer extendt, die de tabel Hardware extendt, die de tabel Configuration item extendt). De (groot)oudertabellen bevatten de records van hun (klein)kindtabellen. De kindtabel erft de attribuutdefinities van zijn (groot)oudertabel. Dat gezegd hebbende, is elk CMDB-object van slechts één klasse. Twee CMDB-objecten kunnen met elkaar gerelateerd zijn via toegestane relaties van een gedefinieerd type (bijv. Server X "contains::contained by" Disk Y)
> 
> In plaats van gebruikers records te laten selecteren in een van de 800 tabellen, is het aan te raden ze alle records te laten zien van een tiental interne overgrootoudertabellen, bijv. "Application Resources" , "Web Resources" , "Database Resources", "MSSFT Database Servers" ,"IIS Webserver" , "Windows/Linuc Servers/VMs'" , "Hypervisors" , "etc"

Interne en externe klanten kunnen **Business Service Offerings** afnemen. De **Business Service** definieert wat er geleverd wordt, en de Business Service Offering definieert specifieke varianten daarvan. Elke offering wordt geleverd/ondersteund door één team. Dezelfde service die in twee landen wordt geleverd, kan verschillende openingstijden en verschillende supportafspraken hebben en verschillende supportteams gebruiken. Voor sommige services kan er een standaard offering en een uitgebreide offering zijn. Op een Business Service Offering kan worden geabonneerd per locatie, per organisatie of door bedrijfsspecifieke groepen personen. Een Business Service Offering kan afhankelijk zijn van nul of meer Service Instances. Op Business Service Offerings die bedoeld zijn voor interne klanten/medewerkers (bijv. "HR Payroll" of "Time writing") mogen alleen interne bedrijven geabonneerd zijn.

Elke onderliggende technologie die een bedrijf gebruikt, moet geleverd worden door een interne of externe serviceprovider. De technologie wordt als service geleverd of beheerd. De service wordt afgenomen door de partij die eigenaar/beheerder is van de Service Instance die van die onderliggende technologie afhankelijk is. **Technology Management Service Offerings** definiëren afspraken, abonnementen en governance voor de bijbehorende Service Instances. Een provider kan bijvoorbeeld een Technology Management Service Offering "Windows Server Support" leveren, die onderdeel is van de **Technology Management Service** "Hosting Support". Als je verschillende teams gebruikt, bijvoorbeeld om gebruikers in een bepaald geografisch gebied te ondersteunen, wil je misschien locatiespecifieke offerings aanmaken en gebruikers in die gebieden daarop laten abonneren. Wil je onderscheid maken tussen productie- en niet-productieservers, dan kun je voor elk daarvan aparte offerings aanmaken. Als het echt moet, kun je gecombineerde geografisch- en omgevingsspecifieke offerings aanmaken. Heb je drie instances van dezelfde applicatie, die elk door een bepaalde groep gebruikers worden gebruikt, dan moet je aparte Service Instances aanmaken, en KUN je aparte Service Offerings en abonnementen aanmaken. Tip: maak geen aparte offerings aan als de afspraken, abonnees en supportteams voor die offerings (vrijwel) gelijk zijn.

### BEST PRACTICES

-   Business Applications moeten versieonafhankelijk zijn. Maak dus geen aparte Business Applications (bijv. ServiceNow, Zurich) aan voor elke versie van de applicatie als het enige verschil de versie is en de overige attributen gelijk zijn.
-   PC-applicaties worden geregistreerd als Product Models van softwarepakketten die op pc's zijn gedetecteerd, niet als Business Applications. Individuele instances van pc-applicaties worden niet als Service Instance geregistreerd. Hoewel ik het niet aanraad, kun je een TASK of een CASE relateren aan een End-user Device Service Offering en verwijzen naar de software-CI die erop geïnstalleerd is.
-   Zakelijke klanten/medewerkers mogen Technology Management Services niet kunnen afnemen (of ernaar kunnen verwijzen).
-   Voor elke Business Application moet er ten minste één Service Offering zijn die ten minste één Service Instance bevat,  
    zodat events en vulnerabilities op een Service Instance van die applicatie toegewezen kunnen worden aan het team dat de offering levert waarin de Service Instance zit.
-   Als een Business Application als service aan de business wordt aangeboden, moet die service geregistreerd worden als Business Service of als Business Service Offering daarvan.  
    Dat gezegd hebbende, zouden Business Services en/of Business Service Offerings idealiter businessgericht moeten zijn (bijv. "Payroll") en niet technologiegericht (bijv. "Workday")

### GEBRUIK VAN CSDM-DATA

In ServiceNow-instances die CSDM gebruiken, is er een duidelijk onderscheid tussen technologie en business. De twee werelden zijn fundamenteel gescheiden, maar nauw met elkaar verbonden.

Zakelijke gebruikers of externe klanten kunnen cases/issues/calls/requests indienen op de Service Offerings waarop ze geabonneerd zijn. Dat kan via het Employee/Customer Portal of – steeds vaker – via een door AI ondersteunde chatbot. De chatbot weet wie de melder is, waarop hij geabonneerd is en welke issues eerder door de business of andere medewerkers zijn gemeld, inclusief de oplossingen daarvan. Als de chatbot de case niet kan oplossen, kan deze worden toegewezen aan de helpdesk of gekoppeld aan een eerder geopend technisch incident.

Elke Service Offering heeft zijn eigen afspraken en een eigen set abonnees. Mensen in België kunnen dus een case indienen bij HR België, maar doorgaans niet bij HR Nederland. Zo worden ze niet afgeleid door offerings die voor hen niet relevant zijn. Daarnaast maakt dit datagedreven routering mogelijk van HR-cases die door gebruikers in Nederland worden ingediend naar het HR-team dat verantwoordelijk is voor Nederland. Op dezelfde manier kunnen issues met pc's in een gebouw naar de helpdesk voor dat gebouw worden geleid. Gemelde issues/vragen over O365 kunnen naar een lokale helpdesk worden doorgezet voordat een incident aan de centrale 2e lijn wordt toegewezen.

Issues van klanten/medewerkers moeten gerelateerd zijn aan een Business Service Offering waarop men geabonneerd is en kunnen gerelateerd zijn aan de getroffen Service Instance waarvan de Service Offering afhankelijk is. Bijvoorbeeld Service Offering "Payroll" van Service "HR" en Service Instance "Workday \[PR\]". Bij sommige Business Service Offerings kan een passende CI worden geselecteerd die aan de melder is toegewezen. Als een melder bijvoorbeeld een issue meldt met een "Windows Computer", kan de laptop/VDI van de gebruiker als getroffen CI worden aangemerkt.

Waargenomen events, vulnerabilities, alerts en gemelde serviceverslechteringen kunnen worden afgehandeld door een taak toe te wijzen aan het technische supportteam dat gerelateerd is aan de getroffen Technical Management Service Offering. Doordat het zo is ontworpen, kan automatisch worden bepaald welke offering de getroffen Service Instance bevat en welk team betrokken moet worden. Indien relevant kan automatisch een case worden aangemaakt, waarmee de getroffen medewerkers/klanten geïnformeerd/op de hoogte gehouden kunnen worden. Omgekeerd kan een AI-agent het aanmaken van een 2e-lijnsincident in gang zetten als duidelijk is dat de 1e lijn het incident niet kan oplossen.

Teams kunnen incidenten, requests en andere taken naar hun **agile taskboards** slepen en ze daar toewijzen, van commentaar voorzien of oplossen. Terugkerende incidenten kunnen worden getrieerd als defects en vervolgens via agile stories worden opgepakt. Kleine gevraagde verbeteringen kunnen via stories worden opgepakt.

TASKS zoals incidenten, changes, stories enzovoort moeten gerelateerd zijn aan een Technical Management Service Offering waarop men geabonneerd is, en kunnen (optioneel) gerelateerd zijn aan de getroffen Configuration Item(s) en/of Service Instances. Taken kunnen worden toegewezen aan leden van de juiste teams die in de Technology Management Service Offering zijn geregistreerd.

Steeds vaker komen TASKS voort uit DevSecOps-events/-agents. Rapd7 kan bijvoorbeeld een vulnerability op een Configuration Item detecteren en een Vulnerability Response TASK-record aanmaken. De CI is gekoppeld aan een Service Instance binnen een Technical Management Service Offering die eigendom is van/beheerd wordt door een team. Met behulp van CSDM-data kunnen de relevante teams automatisch worden geselecteerd en op de hoogte gebracht van gedetecteerde vulnerabilities.

Voor wie het niet weet: TASKS vervangen CASES niet, en omgekeerd. Ze bestaan naast elkaar, hebben elk hun eigen doel en hun eigen communicatielijnen. Een case kan tot veel taken leiden, en een taak kan gerelateerd zijn aan veel cases. Wanneer een case wordt bijgewerkt, kunnen de gerelateerde taak/taken worden bijgewerkt, en omgekeerd. Wanneer een taak wordt gesloten, kunnen de gerelateerde case(s) worden gesloten (of niet). Work notes op taken zijn niet zichtbaar voor wie niet geautoriseerd is om de taak te bekijken.

Klant-CASES moeten voldoen aan de SLA-afspraken die gelden voor de Business Service Offering.  
De technische TASK moet voldoen aan de OLA/UC-afspraken die gelden voor de Technical Service Offering.

Door de abonnementen op de offerings bij te werken, kunnen oude offerings naadloos/selectief worden vervangen door nieuwe offerings.  
Als verantwoordelijkheden veranderen, kunnen de toe te wijzen groepen in de Service Offerings worden aangepast.

### TOT SLOT

Via CSDM kun je een ecosysteem voor BUSiness, DEVelopment, SECurity en OPerationS mogelijk maken, waarin (alleen) relevante data beschikbaar is voor wie die nodig heeft. De objecten werken elkaar bij wanneer dat nodig is.
