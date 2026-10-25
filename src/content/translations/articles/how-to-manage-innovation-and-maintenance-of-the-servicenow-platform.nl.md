---
title: "Hoe je innovatie en onderhoud van het ServiceNow-platform managet"
excerpt: "Mij wordt vaak gevraagd hoe je het ServiceNow-platform het beste kunt managen. Doorgaans adviseer ik het volgende basisconcept en stem ik mijn advies vervolgens af op het doel en de doelgroep:"
source: "c4a9356f8a3fc895"
---

Mij wordt vaak gevraagd hoe je het ServiceNow-platform het beste kunt managen. Doorgaans adviseer ik het volgende basisconcept en stem ik mijn advies vervolgens af op het doel en de doelgroep:

### 

-   Laat eerst de aanbevolen principes onderschrijven tot op CIO/CTO-niveau.

-   ServiceNow is een platform dat marktstandaard practices out of the box mogelijk maakt.
-   Het platform is (door ServiceNow) voorgeconfigureerd om de gedocumenteerde processen te ondersteunen, inclusief de gedefinieerde rollen, flows en metrics.  
    De organisatie neemt de ServiceNow-practices en de bijbehorende rollen over, in plaats van het platform/de practices te customizen om legacy practices voort te zetten.
-   Het platform ondersteunt een mix van marktstandaarden (bijv. IT4IT, ITIL, SAFe, SCRUM enz.), maar is -als mix- niet langer 100% conform de oorspronkelijke standaarden.
-   Configuratie van het out-of-the-box platform en het datamodel is toegestaan, mits die configuratie te rechtvaardigen is en is goedgekeurd door de aangewezen design authority.
-   Het platform, inclusief de applicaties en modules, wordt gebruikt voor het beoogde doel, door de beoogde doelgroep, zoals vastgelegd in de documentatie.
-   Het platform wordt minimaal eenmaal per jaar geüpgraded (bij voorkeur tweemaal per jaar), 4 maanden na de general availability van de major platformrelease.
-   Het gebruik/upgraden van out-of-the-box integraties heeft de voorkeur boven het bouwen en onderhouden van custom integraties.
-   Toegang tot het platform en de data daarin wordt gedocumenteerd (role-based access), geautoriseerd en beheerd.
-   Het platform is (of wordt) geconfigureerd volgens de afgesproken coding best practices.
-   De organisatie houdt zich aan de contractuele en wettelijke verplichtingen en aan het toepasselijke beleid en de standaarden van de organisatie die op het platform van toepassing zijn.

-   Zorg vervolgens voor consensus over de **verdeling van verantwoordelijkheden**

-   -   Het ServiceNow-team stelt de best practice processen beschikbaar, inclusief het SaaS-platform dat deze mogelijk maakt.
    -   Het ServiceNow-team integreert het ServiceNow-platform met andere IT4IT-platforms, binnen de security- en architectuurrichtlijnen.
    -   Het ServiceNow-team helpt de lijnorganisatie bij het adopteren van de processen en het trainen van lokale champions.
    -   Het ServiceNow-team biedt tweedelijns support, zowel op de processen als op het platform.
    -   De regionale lijnorganisatie wijst procesmanagers aan die de processen in de regio managen/coördineren.
    -   De lokale lijnorganisatie stelt getrainde/vakbekwame fulfillers beschikbaar die de processen uitvoeren.
    -   De servicedesk biedt eerstelijns support aan platformgebruikers.

### 

-   De **innovatie van het platform** wordt in ServiceNow gemanaged met behulp van Agile Management (we eat our own dogfood).

-   -   Het platform heeft één (1) platform owner, die wordt ondersteund door een platformarchitect. Het wordt aanbevolen dat beiden onder het management van de organisatie zelf vallen.
    -   De platform owner is accountable voor het platform en de ondersteunde processen, inclusief budget, beleidscompliance, contracten, teamvaardigheden en headcount.
    -   Elk kwartaal definieert en onderhoudt de platform owner, samen met de ServiceNow-product owners, de themes en epics voor de producten op het platform.  
        De platform owner stemt de themes (het budget en de prioriteit ervan) af met de business stakeholders en de sponsors van de platformthemes.
    -   De platform owner kan de ontwikkeling en implementatie van een bepaald theme uitbesteden onder een Statement of Work op basis van een resultaatsverplichting.
    -   De platformarchitect onderhoudt een high-level technisch ontwerp/roadmap voor het platform en stemt het beoogde doel, de beoogde doelgroep en de platformintegraties af met domein-/enterprise-architecten, risk-/compliance officers en security.
    -   Het platform bestaat uit meerdere gedefinieerde applicaties (bijv. ITSM, ITOM, IRM, CSM, ESM, NOW enz.), die kunnen worden gegroepeerd in producten. Elk product heeft een product owner die eigenaar is van de unieke themes, epics en stories van dat product. "NOW" is het platform inclusief de capabilities die door meerdere producten worden gedeeld.
    -   Product owners verzamelen enhancement requests van stakeholders (het 'wat') en zetten deze -samen met het DevOps-team- om in stories (het 'hoe').
    -   De product owners stemmen ontvangen projectdemand en enhancement requests af met de betreffende process owners en de solution architect.
    -   De process owners definiëren de (wijzigingen in de) ondersteunde processen (inclusief bijbehorende KPI's, beleid, procedures en richtlijnen).
    -   De stories worden opgeleverd en integratiegetest door één DevOps-team dat alle producten innoveert en onderhoudt.
    -   De opgeleverde stories worden door de product owners geaccepteerd namens (of samen met) vertegenwoordigers van de ServiceNow-community.

### 

-   Het **onderhoud van het platform** verloopt via de geïmplementeerde ITSM-processen (we drink our own champagne).

-   De (lokale/regionale) servicedesk die de lokale community ondersteunt, is het eerste aanspreekpunt voor (major) incidents met betrekking tot ServiceNow.
-   De (lokale/regionale) procesmanagers raadplegen de process owner over de interpretatie en verbetering van het procesmateriaal.
-   Bij een major incident met ServiceNow managen/coördineren de major incident managers van het bedrijf het oplossen van de verstoring.
-   Het ServiceNow-team biedt tweedelijns support aan procesmanagers en servicedesks.
-   Het Now Platform wordt (een- of tweemaal per jaar) geüpgraded. De product owner van het NOW Platform is accountable voor de upgrade van het NOW Platform, die wordt uitgevoerd door het DevOps-team. De ServiceNow-product owners van wie de producten geraakt worden, zorgen ervoor dat hun producten vóór de productierelease regressiegetest, door gebruikers geaccepteerd en waar nodig gefixt zijn.

### 

-   De ondersteunde processen worden nageleefd en gemanaged door de lokale/regionale lijnorganisatie

-   De lijnorganisatie wijst voldoende vakbekwame/gecertificeerde medewerkers toe aan de gedefinieerde procesrollen.
-   Samen met de (lokale/regionale) procesmanagers zorgen process champions ervoor dat de processen en werkinstructies worden geadopteerd.
-   De process fulfillers houden zich aan de geïmplementeerde processen en lokale werkinstructies.
-   De (lokale/regionale) procesmanagers monitoren de procesnaleving, -performance en -volwassenheid en voeren waar nodig verbeteringen door.
-   De (lokale/regionale) procesmanager en process champions bieden eerstelijns procesondersteuning aan de fulfillers op hun locatie/in hun regio.

### 

-   Organisaties wordt aangeraden governance te definiëren en af te spreken:

-   -   Platform ownership, inclusief de stakeholders, periodieke overleggen en agenda/onderwerpen (bijv. architectuur, integraties, visie, platform-/procesroadmap)
    -   Strategisch management, inclusief de stakeholders, periodieke overleggen en agenda/onderwerpen (bijv. themes, epics, procesperformance, projecten)
    -   Tactisch management, inclusief de stakeholders, periodieke overleggen en agenda/onderwerpen (bijv. enhancements, procesontwerp, KPI's, PPI's)
    -   Operationeel management, inclusief de stakeholders, periodieke overleggen en agenda/onderwerpen (bijv. defects, metrics, datakwaliteit enz.)

## Opmerkingen:

-   Eén persoon kan meer dan één van de bovenstaande rollen vervullen, zolang die persoon voldoende vakbekwaam/getraind is om de rol(len) uit te voeren.

-   Doorgaans kan een product owner meerdere (vergelijkbare) producten managen/bezitten, vooral als het om dezelfde stakeholders gaat.
-   Platform owners, product owners en platformarchitecten moeten adequaat getraind zijn en minimaal 3-5 jaar ervaring met het platform hebben.
-   DevOps-engineers moeten door ServiceNow gecertificeerd zijn voor de producten waaraan ze werken.

-   Grote organisaties wordt aangeraden platformlicenties rechtstreeks bij ServiceNow in te kopen, om zo partner lock-in te voorkomen.
-   Veel organisaties besteden de innovatie en het onderhoud van het ServiceNow-platform en de ondersteunde processen gedeeltelijk uit.
    -   Uitbesteding van de platform owner, platformarchitect en product owners wordt niet aanbevolen.
    -   Uitbesteding van process owners en proces-subject matter experts wordt niet aanbevolen.
    -   Tweedelijns platformsupport kan worden uitbesteed, vooral als het platform wereldwijd of 24x7 ondersteund moet worden.
    -   Uitbesteding van DevOps wordt aanbevolen als ServiceNow wordt gecategoriseerd als commodity SaaS-platform.
-   Dat gezegd hebbende, kunnen organisaties profiteren van de ervaring van derden bij het definiëren en implementeren van de processen en de bijbehorende rollen.

-   Het wordt sterk aanbevolen om het beoogde operating- en sourcingmodel zo snel mogelijk te definiëren, zodat hiermee tijdens de transitie rekening kan worden gehouden.
-   Tijdens de transitie kunnen interne medewerkers worden aangenomen/aangesteld en getraind/gecoacht door de implementatiepartner.

## In een plaatje ziet het bovenstaande er zo uit:

![](/wp-content/uploads/2024/11/SN-Operating-Model-1.png)
