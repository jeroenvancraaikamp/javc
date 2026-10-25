---
title: "Change- en driftmanagement in 2025"
excerpt: "Ondanks de snelle ontwikkelingen in cloud computing, DevOps, automatisering en Infrastructure-as-Code worstelen veel organisaties nog steeds met een fundamentele vraag: wat is in 2025 eigenlijk een ‘change’, en wat niet? Moet elke gedetecteerde drift via change worden afgehandeld? Verkeerde classificatie"
source: "c0521e5c78a2ac4a"
---

Ondanks de snelle ontwikkelingen in cloud computing, DevOps, automatisering en Infrastructure-as-Code worstelen veel organisaties nog steeds met een fundamentele vraag:

**Wat is in 2025 eigenlijk een ‘change’, en wat niet? Moet elke gedetecteerde drift via change worden afgehandeld?**

Verkeerde classificatie leidt tot onnodige werkdruk voor change managers, frictie bij engineeringteams en minder operationeel overzicht. Tegelijkertijd brengt te weinig governance onaanvaardbare risico’s met zich mee. Modern change management moet daarom zorgvuldig balanceren tussen snelheid en beheersing, met duidelijke beslissingscriteria en door elke activiteit in het juiste governance- of technologiedomein te plaatsen. Dit artikel vat de huidige best practices samen en biedt praktische handvatten voor IT-teams, architecten en operationeel leidinggevenden.

## 1\. Het kerndoel van change management is niet veranderd

Change management bestaat nog altijd om:

-   Risico’s te beheersen en te verkleinen vóórdat er wijzigingen in productie plaatsvinden
-   Zichtbaarheid, coördinatie en communicatie te waarborgen
-   Verantwoording en traceerbaarheid te borgen
-   De stabiliteit van bedrijfskritische services te beschermen

Wat wél is veranderd, is de omgeving waarin deze doelen moeten worden bereikt.  
Moderne platformen genereren dagelijks duizenden automatische aanpassingen.  
Die allemaal via de change-module willen beheersen is onhaalbaar en levert ook niets op.

## 2\. Wat is een change?

Een ‘change’ is elke geplande wijziging die wezenlijke invloed kan hebben op:

-   Het gedrag van een service of de gebruikerservaring
-   Productiedata of de integriteit van data
-   De stabiliteit of performance van het platform
-   De securitypositie of naleving van wet- en regelgeving
-   Onderling verbonden services of technische afhankelijkheden

Voorbeelden waarvoor change management nodig is:

-   Wijzigingen in applicatiefunctionaliteit of -logica
-   Wijzigingen in API-contracten
-   Aanpassingen van databaseschema’s
-   Wijzigingen in netwerk, firewall, routing of DNS
-   Aanpassingen van IAM-rollen en -policies
-   Upgrades van infrastructuur of clusters
-   Wijzigingen in securitymaatregelen of monitoringconfiguraties

Deze activiteiten brengen inherent risico met zich mee en moeten een gecontroleerd goedkeuringsproces doorlopen.

## 3\. Wat (niet langer) een change is

Veel operationele activiteiten waarvoor vroeger goedkeuring nodig was, voldoen niet meer aan de criteria  
voor change management. Het gaat onder meer om:

-   Cloudelasticiteit en autoscaling (Kubernetes HPA/VPA, VM-autoscaling)
-   Uitvoeringen van CI/CD-pipelines (deployments via vooraf goedgekeurde patronen)
-   Opnieuw toepassen van IaC waarbij het model niet is gewijzigd
-   Distributie van endpointsoftware via Intune, SCCM of MDM
-   Onderhoudsmomenten van de cloudprovider
-   Failover, high availability en self-healing gedrag
-   Signature-updates voor securitytools
-   Runtimeprocessen zoals indexering of caching

Deze activiteiten worden beheerst door platformpolicies en operationele kaders,  
niet door change management.

## 4\. Standard changes: snelheid mét beheersing

Standard changes bieden een gestructureerde manier om de leversnelheid te verhogen  
en tegelijk governance te behouden. Een standard change is:

-   Vooraf goedgekeurd
-   Gedocumenteerd
-   Laag in risico
-   Herhaalbaar
-   Vaak geautomatiseerd

Typische voorbeelden zijn:

-   Provisioning van VM’s via goedgekeurde templates
-   Routinematige patchcycli
-   Geautomatiseerde certificaatvernieuwingen
-   CI/CD-deployments via dichtgetimmerde pipelines

Het patroon één keer goedkeuren is veel effectiever dan elke uitvoering afzonderlijk goedkeuren.

## 5\. Governance: wat hoort waar?

Een heldere toewijzing van informatie aan het juiste system of record is essentieel.

### Change management

-   Geplande productiewijzigingen met risico
-   Deploymentplannen, goedkeuringen, back-outplannen
-   Impactanalyse, geraakte services, timing

### CI/CD- en DevOps-platformen

-   Broncode
-   Build- en deploymentlogs
-   Pipelinedefinities
-   Testresultaten en scanuitkomsten

### IaC en configuratieautomatisering

-   Definities van de desired state
-   Template-updates
-   Uitvoeringslogs
-   GitOps-reconciliatie

### CMDB en ITOM

-   Daadwerkelijke runtimestatus
-   Servicetopologie en afhankelijkheden
-   Ontdekte configuratie

### Enterprise architecture en portfolio

-   Roadmaps
-   Standaarden en patronen
-   Afstemming van investeringen en demand

Deze scheiding van verantwoordelijkheden verbetert de traceerbaarheid, auditeerbaarheid en het operationele overzicht.

## 6\. Drift: een operationeel signaal, geen change

Drift ontstaat wanneer de daadwerkelijke configuratie afwijkt van de gewenste configuratie.  
Het wordt gedetecteerd door IaC-engines, cloudgovernancetools en ITOM-compliancemechanismen.

Drift vereist op zichzelf geen change. Alleen herstel dat productierisico met zich meebrengt,  
moet via change management worden afgehandeld.

Voorbeelden waarvoor een change nodig is:

-   Terugdraaien van ongeautoriseerde firewallwijzigingen
-   Corrigeren van drift in IAM-rechten
-   Terugdraaien van onveilige configuratieafwijkingen

Voorbeelden waarvoor geen change nodig is:

-   Automatisch herstel via GitOps/IaC
-   Afwijkingen die alleen metadata betreffen
-   Veilige operationele aanpassingen

Als drift aan het licht brengt dat het desired-state-model verouderd of onjuist is, hoort de correctie  
thuis in het ontwerp (architectuur) of de realisatie (Build & Integrate), niet in  
change management. De uitrol van het bijgewerkte model vereist echter wél governance.

## 7\. Begrijpen waar het ‘HOE’ wordt bepaald

Een van de meest voorkomende misverstanden is de aanname dat change management bepaalt hoe het werk wordt uitgevoerd.  
Dat is niet zo.

Het ‘HOE’ wordt stapsgewijs bepaald:

-   **Demand management** → Waarom we iets doen, globale scope
-   **Architectuur** → Eerste oplossingsrichting en platformkeuze
-   **Delivery / story management** → De gedetailleerde implementatie  
    (API’s, datamodellen, IaC, pipelines, teststrategie)
-   **Change management** → Hoe het veilig naar productie wordt uitgerold
-   **Operations** → Runtimegedrag, driftmonitoring en serviceperformance

Elke fase heeft eigen verantwoordelijkheden en artefacten. Duidelijkheid hierover vermindert herstelwerk,  
versnelt de levering en verbetert de governance.

## 8\. Communicatie buiten change management

Niet elke wijziging vraagt om een change record, maar veel wijzigingen vragen wel om communicatie,  
vooral wanneer verwachtingen of operationeel gedrag kunnen worden beïnvloed.

Voorbeelden zijn:

-   Aanpassingen van feature flags
-   Canary releases
-   Updates van pipelines of automatisering
-   Wijzigingen in interne omgevingen
-   Tuning van runtimegedrag

Effectieve communicatie vermindert incidenten en voorkomt onnodige escalaties.

## Conclusie

Modern change management draait niet om het vertragen van de levering, maar om ervoor te zorgen dat wijzigingen met risico  
veilig en voorspelbaar in productie worden gebracht.

Organisaties die in 2025 succesvol zijn, doen het volgende:

1.  Ze beheersen alleen wat werkelijk productierisico met zich meebrengt.
2.  Ze leggen informatie vast in het juiste system of record.
3.  Ze omarmen automatisering waar patronen bewezen en veilig zijn.
4.  Ze behandelen drift als een operationeel vraagstuk, niet als een governancevraagstuk.
5.  Ze zorgen ervoor dat elke fase in de lifecycle haar eigen rol speelt bij het bepalen van het ‘HOE’.
6.  Ze communiceren proactief, ook wanneer change management niet betrokken is.

Goed ingericht wordt change management een licht en effectief veiligheidsmechanisme dat moderne engineeringpraktijken ondersteunt in plaats van beperkt.
