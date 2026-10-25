---
title: "Change Management vs CSDM5"
excerpt: "Het Out-of-the-Box Change Management-proces van ServiceNow, zoals opgenomen in de Zurich-release, is een variant van ITIL V3. Dit artikel beschrijft hoe je het changeproces zo configureert dat het naadloos samenwerkt met DevSecOps, met gebruik van de aanbevolen CSDM5-relaties. Daarna hoeven gebruikers geen"
source: "fdd4a3b4df922a93"
---

Het Out-of-the-Box Change Management-proces van ServiceNow, zoals opgenomen in de Zurich-release, is een variant van ITIL V3. Dit artikel beschrijft hoe je het changeproces zo configureert dat het naadloos samenwerkt met DevSecOps, met gebruik van de aanbevolen CSDM5-relaties. Daarna hoeven gebruikers geen data-analist te zijn om de CSDM-data binnen change management te gebruiken zoals bedoeld. Gebruikers kunnen alleen Services, Offerings, Instances en CI's selecteren die binnen de scope van change management vallen, zodat het change management-proces alleen relevante changes beheert en communiceert.

De aanbevolen configuratie gaat uit van het volgende:

1.  De business- en IT-architectuur wordt gedefinieerd en bewaakt door architecten en business analisten.
2.  Het bedrijf gebruikt agile DevSecOps-practices om oplossingen te bouwen, gebruikt SCM-tools om (geversioneerde) code te registreren en gebruikt CI/CD-pipelines om deze te integreren en te deployen.
3.  Het DevSecOps-team gebruikt meerdere tools om runtime-omgevingen te observeren en te orkestreren en om kwetsbaarheden en inbreuken te detecteren.
4.  De applicaties en infrastructuur worden als service geleverd. De Services, Service Offerings en Service Instances worden vastgelegd via Digital Portfolio Management.
5.  De locatie en status van de fysieke assets die worden ingekocht, ontvangen, opgeslagen, geïnstalleerd of uitgefaseerd, worden vastgelegd via Asset Management.
6.  Stabiele configuratie-items worden dagelijks ontdekt en gefedereerd. Inventaris en updates worden automatisch vastgelegd in de zero-touch CMDB.
7.  Serviceverstoringen (gemeld of gedetecteerd) worden opgelost en gecommuniceerd. Verzoeken worden afgehandeld. Er wordt ondersteuning en kennis geboden.

Het bedrijf wil **change management gebruiken om de risico's en impact te beheersen van het releasen van increments naar productie** door serviceproviders of leveranciers.  
Het change management-proces begint met een verzoek om potentiële increments te releasen. De change wordt gesloten zodra bevestigd is dat de increment in productie operationeel is.

Sommige zaken zijn **iets anders dan in de ITIL3/4-practice**:

-   Een change request kan via DevSecOps-tools worden aangemaakt in plaats van rechtstreeks door menselijke aanvragers.
-   Een deel van wat via CI/CD-tools naar productie wordt gereleased, heeft geen change-goedkeuring meer nodig.  
    Zo'n release moet om redenen van zichtbaarheid nog wel worden vastgelegd (als standard change).
-   Een georkestreerde update van de configuratie valt niet langer onder change management.
-   DevSecOps-tools kunnen opvragen of de aangevraagde release naar productie is goedgekeurd.
-   De update van een CMDB-, asset- of portfolio-item wordt niet (of niet langer) door een change getriggerd/beheerd.
-   De in de infrastructuur ontdekte wijzigingen kunnen worden gebruikt om te verifiëren of de change succesvol is gereleased.

Out of the box kun je een change request aanmaken, deze relateren aan een Service, een Service Offering en een CI, en toewijzen aan elke willekeurige assignment group. **De relaties tussen CSDM-artefacten worden niet geverifieerd of afgedwongen.** Er zijn geen beperkingen op welke items aan een change kunnen worden gekoppeld. Het is aan te raden een aantal wijzigingen te configureren, zodat:

**Changes (verplicht) aan een Service Offering moeten zijn gerelateerd.** De (initiële) assignment group, approval group en Technology Management Service worden afgeleid van de Service Offering. Sommigen willen de historische relatie tussen de Offering en de bovenliggende Service tonen (door het service-attribuut in de change te vullen); anderen willen de relatie met de huidige bovenliggende Service tonen (door de huidige parent van de offering op het formulier weer te geven). Bedrijven met honderden Service Offerings die geen subscriptions gebruiken, lopen het risico dat gebruikers de juiste offering niet gemakkelijk kunnen vinden/selecteren. Voor hen wordt een kleine customisatie aanbevolen, zodat gebruikers bij het kiezen van een service offering een deel van de naam van de service of een deel van de naam van de taxonomie-node kunnen intypen en eenvoudig de juiste offering kunnen selecteren. Als de gebruiker bijvoorbeeld "\*server" typt, worden alle nodes, services en service offerings getoond die "server" in hun naam bevatten.

Wie CSDM5 gebruikt, adviseer ik doorgaans om productonafhankelijke Technology Management Services aan te maken, één of meer productspecifieke Service Offerings per Service, en één of meer product- en omgevingsspecifieke Service Instances per Service Offering. De Service Instances kunnen worden gerelateerd aan de configuratie-items waarvan ze afhankelijk zijn. Technisch is het mogelijk op te vragen welke productie-Service Instances in de Service Offerings zijn opgenomen en welke configuratie-items aan die Service Instances zijn gerelateerd.  

Tegenwoordig **raad ik aan de geïmpacteerde productie-Service Instance vast te leggen in een custom attribuut op het change-record**. Dit is vooral nuttig wanneer meerdere productie-instances van hetzelfde product onafhankelijk van elkaar draaien. SaaS-instances zijn doorgaans niet afhankelijk van de CI-stacks van het bedrijf. Als een bedrijf aparte SaaS-instances van hetzelfde SaaS-product heeft, zijn de Service Instances het enige wat ze van elkaar onderscheidt. Een ander positief neveneffect is dat je in hetzelfde change-attribuut een Dynamic CI Group kunt vastleggen die in de Service Offering is opgenomen (Dynamic CI Group-records zijn ook zichtbaar in de Service Instance-tabel). Als de gebruiker een Dynamic CI Group selecteert, is die CI Group het geselecteerde CI en zou de gebruiker geen ander CI moeten kunnen selecteren. De CI's in de groep worden automatisch toegevoegd aan de related list op het changeformulier waarin de affected CI's staan.

Als het Service Instance-attribuut is gevuld met een productie-Service Instance, kunnen gebruikers de CI's selecteren waarvan de instance afhankelijk is, ook als het CI is ontdekt zonder verwijzing naar zijn rol of omgeving. Met andere woorden: als iemand een server aan een productie-Service Instance koppelt, kun je een change op die server aanmaken. Als die server niet aan een productie-Service Instance is gekoppeld, kun je er via een Service Instance geen change op aanmaken.

Als het Service Instance-attribuut leeg blijft, kun je een CI selecteren dat niet direct aan een Service Instance is gerelateerd, maar wel relevant is voor de geselecteerde service offering. Als er bijvoorbeeld een change wordt aangemaakt voor de Service Offering "Windows Server", moet de gebruiker elk niet-retired record in de Windows Server-class/tabel kunnen selecteren. Idealiter kun je alleen de CI's selecteren die voor productie worden gebruikt. Er zijn echter netwerk- en storage-CI's die zowel voor ontwikkeling, test, acceptatie als productie worden gebruikt; het moet mogelijk zijn changes op die CI's aan te maken, zodat potentiële productie-impact kan worden geïdentificeerd. Als het bedrijf veel offerings heeft zonder service instances of Dynamic CI Groups, is het een goed idee om de CI-filterconditie in het Service Offering-record vast te leggen/te onderhouden.

Door subscriptions te definiëren voor relevante service offerings, kun je ervoor zorgen dat alleen geautoriseerde personen changes kunnen aanmaken op die service offerings en de bijbehorende Service Instances, Dynamic CI Groups en gerelateerde CI's.

Door changes alleen toe te staan op configuratie-items die direct aan productie-Service Instances zijn gerelateerd, kan het bedrijf datagedreven uniformiteit en consistentie binnen de hele organisatie bevorderen. Door vergelijkbare CI's te selecteren, worden impactanalyse en rapportage aanzienlijk eenvoudiger en begrijpen CAB's beter welke beslissingen ze nemen.

De CMDB bevat fijnmazige CI's zoals websites, databasetabellen, geïnstalleerde software, TCP-poorten en de afhankelijkheden tussen deze items. Deze data wordt ook gebruikt door geautomatiseerde risico-/impactanalyse en is beschikbaar voor Now Assist (AI), zonder het changeproces onnodig ingewikkeld te maken.  
  
Idealiter worden relevante CI's automatisch gerelateerd aan de Service Instances die ervan afhankelijk zijn. Dat kan door afhankelijkheden tussen CI's automatisch te identificeren. Als een website bijvoorbeeld data uit een database gebruikt, is de service instance die aan de website is gekoppeld waarschijnlijk ook afhankelijk van die database. Sommige bedrijven relateren alleen de servers aan de service instances; andere relateren de belangrijkste CI's op die servers aan de service instances; weer andere doen beide. Het concept dat hier wordt beschreven, is technisch onafhankelijk van wat bedrijven aan hun Service Instances relateren. Dat gezegd hebbende, wordt om diverse redenen aanbevolen niet meer dan 8 CI's per Service Instance te relateren.  
  

## Changeverificatie

Zodra een change is gedeployed, moet worden geverifieerd dat deze correct is gedeployed voordat de change kan worden gesloten. Sommige bedrijven gebruiken Agent Client Collectors om in realtime te ontdekken wat er draait, zodat ze direct kunnen zien of de change correct is gedeployed. Andere bedrijven ontdekken hun infrastructuur slechts één keer per dag en wachten tot de volgende dag om de change met CMDB-data te verifiëren, voordat de change wordt gesloten. Weer anderen verifiëren handmatig dat de change correct is gedeployed voordat ze deze sluiten. Elke methode heeft voor- en nadelen. Vanuit business- en risicoperspectief is het waarschijnlijk verstandig de businessfunctionaliteit direct na het deployen van de change te verifiëren en de CMDB later via discovery bij te werken. Wie dat kan, wil wellicht direct na het sluiten van het change window een ad-hoc discovery uitvoeren/triggeren op de items die aan de change zijn gerelateerd.  
  
Met andere woorden: het is niet zo dat de CMDB niet via een change wordt bijgewerkt; dat gebeurt simpelweg via een modernere methode die een consistent resultaat oplevert.
