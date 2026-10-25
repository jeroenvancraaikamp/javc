---
title: "IT-fundamenten herzien: van SaaS naar services, producten en verder"
excerpt: "Jarenlang hebben we begrippen als SaaS, PaaS, IaaS en DCaaS gebruikt om te beschrijven hoe technologie wordt geleverd. Die termen bestaan nog steeds, maar ze dekken de huidige werkelijkheid niet meer volledig. Waarom? Nu platforms software-defined worden, vervangen AI-prompts softwarecode"
source: "c3496434c4246277"
---

Jarenlang hebben we begrippen als **SaaS, PaaS, IaaS en DCaaS** gebruikt om te beschrijven hoe technologie wordt geleverd. Die termen bestaan nog steeds, maar ze dekken de huidige werkelijkheid niet meer volledig.

Waarom? Omdat **platforms software-defined worden, AI-prompts softwarecode vervangen** **en informatie verspreid is over meerdere repository's**, die elk de verschillende behoeften van verschillende soorten stakeholders bedienen. Om die complexiteit te beheersen, hebben we een scherpere blik en een gemeenschappelijke taal nodig voor de dingen die we delen.

* * *

### Baselines vs. instances: twee verschillende werelden

In moderne IT is het essentieel om onderscheid te maken tussen **uitrolbare items (baselines)** en **uitgerolde items (instances):**

-   **Baselines**: waar beslissingen over strategie, lifecycle en roadmap worden genomen.
    
-   **Instances**: live, detecteerbare kopieën van baselines die eigenschappen erven van hun baseline en van hun tags.
    

Eén baseline kan veel instances hebben, maar een instance hoort altijd bij precies één baseline.

* * *

### Producten zijn geen services

Te vaak behandelen we **producten** en **services** alsof ze uitwisselbaar zijn. Dat zijn ze niet.

-   **Producten** zijn eigendom van een *product owner* en bestaan uit een verzameling gedocumenteerde **componenten**: software, scripts, AI-prompts, API's, plug-ins, configuraties en meer. Producten worden gedefinieerd, ontwikkeld en vernieuwd door (teams van) een interne organisatie of door een leverancier/fabrikant. Om het overzichtelijk te houden, worden producten per definitie niet afgenomen.
    
-   **Services** zijn eigendom van een *service owner* en worden geleverd/ondersteund door (teams van) een serviceprovider. Commitments, entitlements en subscriptions definieer je op een service, niet op een product. Services worden afgenomen door degenen die recht hebben op/geabonneerd zijn op die service.
    

De managementblik verschilt: producten ontwikkelen zich via **major versions**, terwijl productcomponenten zich continu ontwikkelen; hun **minor versions** worden bijgehouden in DevSecOps-pipelines en hun instances worden als configuration items in de CMDB ingevoerd. Services worden gedurende hun hele lifecycle **niet geversioneerd**.

Bedrijven onderhouden zowel serviceportfolio's als productportfolio's. De serviceportfolio's bevatten de services die (intern of extern) aan het bedrijf worden geleverd. De productportfolio's bestaan uit digitale producten die in/op de infrastructuur van het bedrijf kunnen worden uitgerold, en uit producten waaruit de infrastructuur van het bedrijf bestaat en de tools waarmee die wordt beheerd. Definieer/gebruik aparte productportfolio's per technology tower en/of per (eigenaar zijnd) businessdomein. Gebruik voor zelfontwikkelde producten technologie- of platformspecifieke component-repository's die geïntegreerd zijn met de deployment-/provisioningpipelines van het bedrijf.

* * *

### Configuration items: de operationele laag

Configuration items (CI's) zijn instances van baselines. Meestal zijn CI's detecteerbare instances van componenten, al kunnen ook instances van services, offerings en producten als CI's worden beschouwd. De technische kenmerken en afhankelijkheden van CI's zijn doorgaans technisch detecteerbaar. De CI's erven de attributen – vooral hun beheerde attribuutwaarden – van hun baseline. Stel bijvoorbeeld dat de eigenaar van een productbaseline wordt gewijzigd. Dan zouden alle instances van (de componenten van) dat product automatisch moeten meeveranderen, zonder dat er een change hoeft te worden aangemaakt of het CI opnieuw hoeft te worden uitgerold.

CI's kunnen worden getagd. Een **tag** geeft een waarde voor een bepaalde **key** voor een specifiek CI. Bijvoorbeeld: de key "Environment" heeft voor dit CI de waarde "Production", en de key "GitLabID" heeft voor dat CI de waarde "e83c5163316f89bfbde7d9ab23ca2e25604af290". Tags mogen geen attribuutwaarden bevatten die via formele processen worden beheerd/geautoriseerd (zoals BIV-classificatie, eigenaarschap, business criticality enz.). Tags worden samen met het getagde CI uitgerold en worden beschouwd als integraal onderdeel van het CI. Het bijwerken van een tag van een CI geldt als een wijziging van het CI zelf, d.w.z. via het opnieuw uitrollen van (de tag van) het CI. Tags kunnen worden geërfd; als bijvoorbeeld een instance van een cloud resource group is getagd, gelden de tags voor alle fijnmazige cloudresource-instances in die groep, zonder dat je elke cloudresource-instance afzonderlijk hoeft te taggen.

* * *

### Assets: de financiële laag

Dan zijn er **assets**: unieke apparaten of licenties met een geldwaarde, vaak gekoppeld aan een gebruiker, kostenplaats, bedrijf, regio of locatie. Anders dan producten of services bestaan assets in de eerste plaats voor **tracking, compliance en financiële verantwoording (CAPEX/OPEX).**

**Assetmodellen zijn geen productbaselines**; het zijn vaste representaties van wat de onderneming bezit/gebruikt. "Microsoft Visio 2011 Professional" is bijvoorbeeld een assetmodel, waarvan een bedrijf duizenden gelicentieerde instances kan uitrollen. Elk daarvan als afzonderlijke service-instance registreren is praktisch noch wenselijk. In plaats daarvan worden ze geregistreerd als software-instances. Niet alleen de software-instance, maar ook het model ervan wordt automatisch gedetecteerd. Hetzelfde geldt voor hardware: zowel de hardware-instances als hun modellen worden automatisch gedetecteerd.

Assets kunnen extern per stuk (bijvoorbeeld per item) of in bulk (bijvoorbeeld per pallet) worden ingekocht. Assets zijn van een bepaald type/model en zijn doorgaans gekoppeld aan individuele gebruikers en/of locaties. Sommige bedrijven registreren welke assets bij welke pakbon hoorden, zodat ze tot in detail verantwoording kunnen afleggen over waar investeringen zich bevinden. Niet alles wat wordt ingekocht, hoeft als asset te worden geregistreerd. Verbruiksartikelen of items met een geringe waarde in euro's worden bijvoorbeeld niet geregistreerd, zeker niet als hun locatie/status niet wordt gevolgd.

* * *

### Services en service offerings

Een **service** is een black box wanneer de provider eigenaar is van de producten of assets die worden afgenomen. Wanneer het afnemende bedrijf de eigenaar is, is de service eerder een **beheeractiviteit** van de serviceprovider**.** Hoe dan ook: eigenaarschap van en verantwoordelijkheid voor de services en de ondersteunde producten/assets doen ertoe.

Om binnen services onderscheid te maken, gebruiken we **service offerings**: varianten van een service met specifieke commitments. Productie- en niet-productieomgevingen kunnen bijvoorbeeld aparte offerings zijn. Zowel services als service offerings zijn baselines, en ze zijn (direct of indirect) gerelateerd aan de instances waarvoor ze dekking/ondersteuning bieden. Het geldt als good practice om CI's te taggen met de offering waaronder zij (en hun children) vallen.

* * *

### Service-instances

Tot slot zijn **service-instances** de endpoints voor producten die meerdere keren worden geïnstantieerd, bijvoorbeeld één instance van hetzelfde product per geografisch gebied of organisatie, of respectievelijk één voor elke ontwikkel-, test-, acceptatie- en productie-instance.

Voorbeelden:

-   Een Workday-SaaS-product wordt opgesplitst in service-instances voor ontwikkeling, test en productie.
    
-   Een Azure-tenant of een OCI-compartment is een service-instance van een groter public-cloudproduct.
    
-   De URL van een portal of een API is een service-instance (van een product) die door een of meer service offerings kan worden gebruikt.
    

Doorgaans **zijn** **service-instances** **gedefinieerde** **startpunten voor discovery** **en operationele monitoring,** en vormen ze de afbakeningspunten van services/offerings.

* * *

### Alles bij elkaar

Ondernemingen moeten hun IT-structuren vandaag de dag opnieuw bekijken in termen van **baselines en instances**. In de praktijk betekent dat verschillende governancelagen, tools en verantwoordelijkheden:

-   **Productbaselines** → beheerd in portfoliomanagementtools
    
-   **Componentbaselines** → beheerd in DevSecOps-/SCM-tooling
    
-   **Servicebaselines** → beheerd in service portfolio management
    
-   **Service offering-baselines** → beheerd in service portfolio management
    
-   **Service-instances** → beheerd in IT operations management
    
-   **Asset-instances** → beheerd in IT asset management
    
-   **CI-instances** → automatisch gedetecteerd, geregistreerd in de CMDB
    
-   **CI-tags** → uitgerold met het CI, en leveren niet-technische informatie voor (gebruikers van) de CMDB.
    

* * *

### Tot slot

De oude labels – SaaS, PaaS, IaaS – zijn nog steeds handige afkortingen, maar ze beschrijven niet langer de werkelijkheid van software-defined, AI-gedreven, service-geïntegreerde ondernemingen. **We moeten ons niet langer richten op het definiëren van het type van wat als service wordt geleverd, maar ons ervan bewust zijn dat elk product als service wordt (of moet worden) aangeboden, hetzij afzonderlijk, hetzij als integraal onderdeel van een grotere stack van services.**

De toekomst is aan wie het onderscheid begrijpt tussen baselines en instances van respectievelijk producten, componenten, assets, services en offerings – en wie elk daarvan kan besturen met de juiste mensen, processen en tools. Het zou niet uit moeten maken om welk type product, component, asset of service het gaat, zolang elk artefacttype op vergelijkbare wijze wordt beheerd/bestuurd (kleine typespecifieke verschillen zijn acceptabel). **Idealiter worden baselines gedefinieerd/geregistreerd/onderhouden door mensen, en worden instances uitgerold/gedetecteerd/geregistreerd door technologie.**
