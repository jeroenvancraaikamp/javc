---
title: "Change management vs CSDM5"
excerpt: "Het out-of-the-box change management-proces van ServiceNow, zoals opgenomen in de Zurich-release, is een variant van ITIL V3. Dit artikel beschrijft hoe je het changeproces zo configureert dat het naadloos samenwerkt met DevSecOps, gebruikmakend van de aanbevolen CSDM5-relaties. Daarna hoeven gebruikers geen"
source: "184773c52b995380"
---

Het out-of-the-box change management-proces van ServiceNow, zoals opgenomen in de Zurich-release, is een variant van ITIL V3. Dit artikel beschrijft hoe je het changeproces zo configureert dat het naadloos samenwerkt met DevSecOps, gebruikmakend van de aanbevolen CSDM5-relaties. Daarna hoeven gebruikers geen data-analist te zijn om de CSDM-data binnen change management te gebruiken zoals bedoeld. Gebruikers kunnen alleen services, offerings, instances en CI's selecteren die binnen de scope van change management vallen, zodat het change management-proces alleen relevante changes beheert en communiceert.

De aanbevolen configuratie gaat uit van het volgende:

1.  De business- en IT-architectuur wordt gedefinieerd en bewaakt door architecten en business analisten.
2.  Het bedrijf gebruikt agile DevSecOps-werkwijzen om oplossingen te bouwen, gebruikt SCM-tools om (geversioneerde) code vast te leggen en gebruikt CI/CD-pipelines om deze te integreren en uit te rollen.
3.  Het DevSecOps-team gebruikt meerdere tools om runtime-omgevingen te observeren en te orkestreren en om kwetsbaarheden en inbreuken te detecteren.
4.  De applicaties en infrastructuur worden als service geleverd. De services, service offerings en service instances worden vastgelegd via Digital Portfolio Management.
5.  De locatie en status van de fysieke assets die worden ingekocht, ontvangen, opgeslagen, geïnstalleerd of uitgefaseerd, worden vastgelegd via asset management.
6.  Stabiele configuration items worden dagelijks gediscoverd en gefedereerd. Inventarisatie en updates worden automatisch vastgelegd in de zero-touch CMDB.
7.  Verstoringen van de dienstverlening (gemeld of gedetecteerd) worden opgelost en gecommuniceerd. Requests worden afgehandeld. Er worden ondersteuning en kennis geboden.

Het bedrijf wil **change management gebruiken om de risico's en impact te beheersen van het releasen van increments naar productie** door serviceproviders of leveranciers.  
Het change management-proces begint met een verzoek om potentiële increments te releasen. De change wordt gesloten wanneer bevestigd is dat het increment operationeel is in productie.

Een aantal dingen is **net iets anders dan in de ITIL3/4-praktijk**:

-   Een change request kan via DevSecOps-tools worden aangemaakt in plaats van rechtstreeks door menselijke aanvragers.
-   Een deel van wat via CI/CD-tools naar productie wordt gereleased, heeft geen change-goedkeuring meer nodig.  
    Zo'n release moet om redenen van zichtbaarheid wel nog steeds worden vastgelegd (als standard change)
-   Een georkestreerde update van de configuratie valt niet langer onder change management
-   DevSecOps-tools kunnen opvragen of de aangevraagde release naar productie is goedgekeurd.
-   De update van een CMDB-, asset- of portfolio-item wordt niet (of niet langer) door een change getriggerd of beheerd.
-   De wijzigingen die in de infrastructuur worden gediscoverd, kunnen worden gebruikt om te verifiëren of de change succesvol is gereleased.

Out of the box kun je een change request aanmaken, deze relateren aan een service, een service offering en een CI, en toewijzen aan elke willekeurige assignment group. **De relaties tussen CSDM-artefacten worden niet geverifieerd of afgedwongen.** Er zijn geen beperkingen op welke items aan een change gekoppeld kunnen worden. Het is aan te raden een paar aanpassingen te configureren, zodat:

**Changes (verplicht) gerelateerd moeten zijn aan een service offering.** De (initiële) assignment group, approval group en Technology Management Service worden afgeleid van de service offering. Sommigen willen de historische relatie tussen de offering en de parent service tonen (door het service-attribuut in de change te vullen); anderen willen de relatie met de huidige parent service tonen (door de huidige parent van de offering op het formulier weer te geven). Bij bedrijven met honderden service offerings die geen subscriptions gebruiken, bestaat het risico dat gebruikers de juiste offering niet gemakkelijk kunnen vinden of selecteren. Voor hen is een kleine customisation aan te raden, zodat gebruikers bij het kiezen van een service offering een deel van de naam van de service of een deel van de naam van de taxonomy node kunnen intypen en eenvoudig de juiste offering kunnen selecteren. Als de gebruiker bijvoorbeeld "\*server" typt, worden alle nodes, services en service offerings getoond die "server" in hun naam hebben.

Wie CSDM5 gebruikt, adviseer ik doorgaans om productonafhankelijke Technology Management Services aan te maken, één of meer productspecifieke service offerings per service en één of meer product- en omgevingsspecifieke service instances per service offering. De service instances kunnen worden gerelateerd aan de configuration items waarvan ze afhankelijk zijn. Technisch is het mogelijk om op te vragen welke productie-service instances de service offerings bevatten en welke configuration items aan die service instances gerelateerd zijn.  

Tegenwoordig **raad ik aan de geraakte productie-service instance vast te leggen in een custom attribuut op het change record**. Dit is vooral handig wanneer meerdere productie-instances van hetzelfde product onafhankelijk van elkaar draaien. SaaS-instances zijn doorgaans niet afhankelijk van de CI-stacks van het bedrijf. Als een bedrijf afzonderlijke SaaS-instances van hetzelfde SaaS-product heeft, is het enige wat ze van elkaar onderscheidt de service instance. Een ander positief neveneffect is dat je in hetzelfde change-attribuut een Dynamic CI Group kunt vastleggen die door de service offering wordt bevat (Dynamic CI Group-records zijn ook zichtbaar in de service instance-tabel). Als de gebruiker een Dynamic CI Group selecteert, is die CI Group het geselecteerde CI en zou de gebruiker geen ander CI moeten kunnen selecteren. De CI's in de groep worden automatisch toegevoegd aan de related list op het changeformulier waarin de affected CI's staan.

Als het service instance-attribuut gevuld is met een productie-service instance, kunnen gebruikers de CI's selecteren waarvan de instance afhankelijk is, ook als het CI is gediscoverd zonder verwijzing naar zijn rol of omgeving. Dat wil zeggen: als iemand een server koppelt aan een productie-service instance, kan er een change op die server worden aangemaakt. Als die server niet aan een productie-service instance gekoppeld is, kun je er via een service instance geen change op aanmaken.

Als het service instance-attribuut leeg blijft, kun je een CI selecteren dat niet direct aan een service instance gerelateerd is, maar wel relevant is voor de geselecteerde service offering. Als er bijvoorbeeld een change wordt aangemaakt voor de service offering "Windows Server", zou de gebruiker elk niet-retired record in de Windows Server-class/tabel moeten kunnen selecteren. Idealiter kun je alleen de CI's selecteren die voor productie worden gebruikt. Dat gezegd hebbende: er zijn netwerk- en storage-CI's die voor zowel ontwikkeling, test, acceptatie als productie worden gebruikt. Het moet mogelijk zijn om changes op die CI's aan te maken, zodat mogelijke impact op productie kan worden vastgesteld. Als het bedrijf veel offerings heeft zonder service instances of Dynamic CI Groups, is het verstandig de CI-filterconditie in het service offering-record vast te leggen en te onderhouden.

Door subscriptions te definiëren voor relevante service offerings kun je ervoor zorgen dat alleen geautoriseerde personen changes kunnen aanmaken op die service offerings en de bijbehorende service instances, Dynamic CI Groups en gerelateerde CI's.

Door alleen changes toe te staan op configuration items die direct gerelateerd zijn aan productie-service instances, kan het bedrijf datagedreven uniformiteit en consistentie binnen de hele organisatie bevorderen. Doordat vergelijkbare CI's worden geselecteerd, worden impactanalyse en rapportage aanzienlijk eenvoudiger en begrijpen CAB's beter welke beslissingen ze nemen.

De CMDB zal fijnmazige CI's bevatten, zoals websites, databasetabellen, geïnstalleerde software, TCP-poorten en afhankelijkheden tussen deze items. Deze data wordt ook gebruikt door geautomatiseerde risico-/impactanalyse en is beschikbaar voor Now Assist (AI), zonder het changeproces onnodig ingewikkeld te maken.  
  
Idealiter worden relevante CI's automatisch gerelateerd aan de service instances die ervan afhankelijk zijn. Dat kan door afhankelijkheden tussen CI's automatisch te identificeren. Als een website bijvoorbeeld data uit een database gebruikt, is de service instance die aan de website gekoppeld is waarschijnlijk ook afhankelijk van die database. Sommige bedrijven relateren alleen de servers aan de service instances; andere relateren de belangrijkste CI's op die servers aan de service instances; weer andere doen beide. Het concept dat hier beschreven wordt, is technisch onafhankelijk van wat bedrijven aan hun service instances relateren. Dat gezegd hebbende is het om tal van redenen aan te raden niet meer dan 8 CI's per service instance te relateren.  
  

## Changeverificatie

Zodra een change is uitgerold, moet worden geverifieerd dat deze correct is uitgerold voordat de change kan worden gesloten. Sommige bedrijven gebruiken Agent Client Collectors om realtime te discoveren wat er draait, zodat ze direct kunnen zien of de change correct is uitgerold. Andere bedrijven discoveren hun infrastructuur maar één keer per dag en wachten tot de volgende dag om de change met CMDB-data te verifiëren, voordat de change wordt gesloten. Weer andere verifiëren handmatig dat de change correct is uitgerold voordat ze deze sluiten. Elke methode heeft voor- en nadelen. Vanuit business- en risicoperspectief is het waarschijnlijk verstandig om de businessfunctionaliteit direct na het uitrollen van de change te verifiëren en de CMDB later via discovery bij te werken. Wie de mogelijkheid heeft, kan direct na het sluiten van het change window een ad-hocdiscovery uitvoeren of triggeren op de items die aan de change gerelateerd zijn.  
  
Met andere woorden: het is niet zo dat de CMDB niet via een change wordt bijgewerkt; dat gebeurt simpelweg via een modernere methode die een consistente uitkomst oplevert.
