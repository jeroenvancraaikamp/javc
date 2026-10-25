---
title: "Wanneer is de CMDB \"af\"?"
excerpt: "Een CMDB is van oudsher een inventaris van de IT-assets van een organisatie, inclusief hun kenmerken en afhankelijkheden. Sommigen zeggen dat een CMDB \"af\" is wanneer alle IT-assets en hun afhankelijkheden zijn geregistreerd en worden bijgehouden. Dat klopt echter niet. Zelfs in"
source: "190cd16695a9c40f"
---

Een CMDB is van oudsher een inventaris van de IT-assets van een organisatie, inclusief hun kenmerken en afhankelijkheden. Sommigen zeggen dat een CMDB "af" is wanneer alle IT-assets en hun afhankelijkheden zijn geregistreerd en worden bijgehouden. Dat klopt echter niet. Zelfs in het verleden legde men niet alles wat er bestond vast in de CMDB. Tegenwoordig zijn assets vluchtig, elastisch en fijnmazig geworden, waardoor ze onmogelijk realtime te volgen zijn.

De CMDB is nu een repository van relevante, stabiele assets, inclusief hun attributen en afhankelijkheden. De inhoud wordt opgehaald uit betrouwbare databronnen, element managers en via geautomatiseerde discovery. Het doel is verbreed van een inventaris naar een leidende informatiebron voor lifecyclemanagement en geautomatiseerde risico- en impactanalyse.

De CMDB bestaat naast DevSecOps-CI/CD-, observability- en orchestrationtools die steeds fijnmaziger IT-assets realtime beheren en volgen. Sommige IT-practices gebruiken data uit de CMDB, terwijl andere rechtstreeks koppelen met DevSecOps-tools. Steeds vaker bevinden de assets waarop organisaties risico's en compliance registreren zich in de CMDB. Sommige organisaties registreren ook hun business- en architectuurartefacten (bijvoorbeeld bedrijfsprocessen, capabilities, applicaties, informatieobjecten en afhankelijkheden) in hun CMDB. Ook doelstellingen, initiatieven, projecten, budgetten, thema's en epics kunnen in de CMDB worden opgeslagen. Hoewel infrastructuur steeds vaker als (cloud)service wordt ingekocht of geleverd, dient de CMDB voor veel bedrijven nog steeds als primaire inventaris van ingekochte assets. IT-management en OT-management versmelten tot technologiemanagement.

> **Er bestaat momenteel geen eenduidige, universele marktstandaarddefinitie van een CMDB of van wat erin hoort. Elk van de toonaangevende practices (bijvoorbeeld TOGAF, IT4IT, ITIL, ISO 85K/27K, enz.) hanteert een eigen definitie en terminologie. De te ondersteunen use cases bepalen wat er in de CMDB moet worden geregistreerd, en dat verschilt per organisatie.**

Het is zeer waarschijnlijk dat -**nog voor het einde van dit decennium-** elke managementpractice een deel van het technologie-ecosysteem van een organisatie zal registreren en bijhouden, en die informatie beschikbaar zal stellen aan AI-systemen/-agents die deze zullen correleren, reconciliëren en gebruiken. De traditionele CMDB zal uitgroeien tot een breder ecosysteem van design-time- en run-time-artefacten dat diverse soorten interacties en flows ondersteunt. Het succes van dat ecosysteem zal afhangen van de governance van afhankelijkheden en overlap tussen de verschillende practices.

**Voorlopig** beschouw ik de CMDB als de repository van alles wat relevant, stabiel en detecteerbaar is, en die uiteenlopende use cases binnen de managementpractices mogelijk maakt. De CMDB moet (geautomatiseerd) antwoord kunnen geven op vragen als:

-   Wie en wat kan geraakt worden als (iets in/op) dit item kapotgaat?
-   Als afnemers problemen hebben met die offering, wat zou er dan kapot kunnen zijn?
-   Als dit product (of deze versie ervan) niet langer wordt ondersteund, hoeveel van wat moeten we dan vervangen/upgraden, en wie wordt erdoor geraakt?
-   Welke oplossingen van anderen koppelen met mijn oplossingen? Wie zijn mijn stakeholders?
-   Wie moet deze gedetecteerde kwetsbaarheid op dat item oppakken?
-   Hoeveel hebben we hiervan, en waar bevinden ze zich?
-   Voor hoeveel licenties van dit product moet ik betalen?
-   Waarvoor wordt dit item gebruikt, door wie, en wie beheert het of is eigenaar?
-   Wat is er sinds gisteren aangemaakt/gewijzigd/verwijderd dat relevant is?
-   Door welke changes werd dit item geraakt?
-   Hoeveel incidenten zijn er deze maand op dit item geregistreerd?
-   Hoeveel openstaande kwetsbaarheden zijn er op dit item?
-   Welke items van welk type heeft dit team in eigendom/beheer?

### De CMDB is "af" wanneer de beoogde doelgroep de juiste, volledige en relevante antwoorden op bovenstaande vragen in de CMDB kan vinden

De sleutelwoorden hierbij zijn datakwaliteit en relevantie. Dat wil zeggen:

-   Geen duplicaten, tenzij het om verschillende items met dezelfde naam gaat.
-   De attribuutwaarden en relaties tussen items zijn gevuld en de inhoud is correct; ze weerspiegelen de werkelijkheid.
-   Dekking: alle items binnen de scope zijn geregistreerd.
-   Als meerdere bronnen hetzelfde item aanleveren, werkt de meest relevante bron het item in de CMDB bij.
-   Verberg irrelevante fijnmazige details in antwoorden op grofmazige vragen.
-   De CMDB moet verticale stacks bevatten, van service/oplossing tot de instances daarvan en de onderliggende technologie waarvan die afhankelijk zijn.
-   De CMDB moet horizontale afhankelijkheden bevatten tussen items die van elkaar afhankelijk zijn (of met elkaar koppelen).
-   Items die maar enkele minuten/uren bestaan, horen niet in de CMDB thuis; die worden geregistreerd en beheerd in DevSecOps-tools.

De CMDB is duidelijk niet goed "af" in de volgende voorbeeldsituaties:

-   Je vindt een kwetsbaarheid, maar kunt niet automatisch bepalen aan welk team die moet worden toegewezen
-   Je wilt een server updaten, maar weet niet wie er over de mogelijke impact moet worden geïnformeerd
-   Er is een machine in productie aangemaakt, maar je kunt niet achterhalen waarvoor die wordt gebruikt
-   Een database meldt dat hij corrupt is, maar je weet niet welke applicaties data in die database benaderen
-   Je bedrijf heeft een productieapplicatie, maar je weet niet van welke technologie die afhankelijk is.
-   Je interface werkt niet meer omdat het PKI-certificaat is verlopen, maar je had dat nooit zien aankomen.
-   Je wilt de infrastructuurkosten toerekenen aan het DevSecOps-team, maar je kunt uit de CMDB niet afleiden welk team welke VM's gebruikt
-   Je leverancier vertelt je dat je drie keer zoveel gelicentieerde deployments hebt als je in de CMDB hebt geregistreerd.
-   Iemand heeft een firewallinstelling gewijzigd, met een onopgemerkt beveiligingslek als gevolg.
-   Je leverancier vertelt je dat versie 2016 per 1 januari niet meer wordt ondersteund, maar je hebt geen idee wat de impact zou kunnen zijn.
-   Je hebt een project om alle telefoons ouder dan 3 jaar te vervangen, maar je weet niet waar ze zijn of wie ze gebruikt.
-   Je auditor vertelt je dat je niet compliant bent met SOX, SOC2, DORA en NIS2
-   De ITSM-community klaagt dat ze hun incidenten/changes niet kunnen relateren aan sommige van de geraakte offerings, instances of CI's
-   Wanneer bij een aanzienlijk deel van de applicaties de infrastructuurafhankelijkheden ontbreken.  
    

## Hoe krijg je IT goed voor elkaar?

-   **Plan voordat je begint**

-   Zorg voor commitment van het executive management (C-level) voor wat je van plan bent (zonder hun commitment: ga liever golfen...)
-   Adopteer/gebruik marktstandaard-datamodellen zoals TBM, CSDM, enz.
-   Bepaal wat je nodig hebt, waar je het vandaan kunt halen en via welk mechanisme
-   Regel en beheer de randvoorwaarden
-   Documenteer stakeholders, teams en service-/product owners.
-   Stel een roadmap voor CMDB-integraties op, stem die af en houd die bij.

-   **Definieer en onderhoud de basisdata**

-   Haal gebruikers-/organisatiedata uit HR/IAM, bij voorkeur via een interface
-   Haal leveranciers-/klant-/contractdata uit ERP, bij voorkeur via een interface
-   Autoriseer toegang tot je data via Identity & Access Management (IAM)

-   **Vergroot en behoud de bekendheid met de CMDB en de data erin.**

-   Lanceer een digitale opslagplaats/kennisbank waar mensen informatie kunnen vinden
-   Deel de concepten en marktstandaarden
-   Deel en onderhoud het datamodel
-   Onderhoud de technische documentatie

-   Technische integraties
-   Reconciliatie-instellingen

-   Publiceer resultaten en voordelen

-   **Implementeer (het beheer van) het technologieproduct-/serviceportfolio**
    

-   Definieer templates voor (te registreren) oplossingen/services
    
-   Train eigenaren hoe en waar ze hun oplossingen/services registreren en bijhouden
-   Laat de eigenaren hun oplossingen/services definiëren, inclusief classificaties
-   Zorg dat alle applicaties/services/offerings een eigenaar hebben.

-   **Definieer, bestuur, audit en verbeter de processen**

-   Wijs een eindverantwoordelijke proceseigenaar aan.
-   Richt een procesraad in, voorgezeten door de proceseigenaar.
-   Definieer het proces, de rollen, RACI's, werkinstructies, FAQ's, QRC's en trainingsmateriaal
-   Wijs procesrollen toe aan mensen en train/certificeer hen
-   Definieer en implementeer governance-organen (stuurgroepen, escalatiekanalen, enz.)
-   Coach de procesorganisatie in de eerste maanden na de livegang

-   **Automatiseer het vullen en bijwerken van het detecteerbare deel van de CMDB**

-   Lever integraties op volgens de afgesproken roadmap
-   Verzamel informatie uit meerdere bronnen en reconcilieer die voordat je die in de CMDB opneemt.
-   Gebruik out-of-the-box-integraties in plaats van zelfgebouwde customizations
-   Relateer detecteerbare content waar mogelijk automatisch aan fysieke CI's
-   Relateer detecteerbare content waar mogelijk automatisch aan instances van de aangeboden service

-   **Registreer kantoren, datacenters, locaties, racks en de fysieke apparaten daarin**

-   Definieer de IAAS-/DCAAS-services, inclusief de bijbehorende commitments, abonnementen en eigenaarschap
-   Registreer de fysieke assets, inclusief hun locaties en hun gebruikers/afnemers
-   Relateer de fysieke assets aan operationele CI's en v.v.
-   Genereer service-instances en relateer die aan de aangeboden IAAS-/DCAAS-services
-   Implementeer het asset management-proces, inclusief de koppelingen met de processen voor inkoop, juridische zaken en financiële administratie
-   Implementeer een periodiek audit- en verificatieproces voor assets.
-   Zorg dat alle assets een geldige eigenaar hebben.
