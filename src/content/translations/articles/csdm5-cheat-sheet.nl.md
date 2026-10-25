---
title: "CSDM5-cheatsheet"
excerpt: "CSDM5 is een datamodel dat altijd tot interessante discussies leidt, omdat elke persona er vanuit een eigen perspectief naar kijkt. Deze cheatsheet helpt bij de vraag wat waar thuishoort als je je houdt aan de CSDM5-definities/-bedoelingen van de verschillende artefacten."
source: "b9918cf4d921fb88"
---

CSDM5 is een datamodel dat altijd tot interessante discussies leidt, omdat elke persona er vanuit een eigen perspectief naar kijkt. Deze cheatsheet helpt bij de vraag wat waar thuishoort als je je houdt aan de CSDM5-definities/-bedoelingen van de verschillende artefacten. Doe je dat, dan is het nauwelijks of niet nodig om de tabellen of de relaties tussen de tabellen te customizen.  
  
De volgende definities/principes gelden in deze hele cheatsheet::  

-   Baselines zijn portfolio-items die worden ontworpen, ingekocht of ontwikkeld en vastgelegd in catalogi, bijvoorbeeld een 'Volvo V70'.  
    Instances zijn configuration items die zijn uitgerold/geleverd, bijvoorbeeld die ene unieke Volvo V70 met kenteken XX-YYY-ZZ
-   Alle baseline-portfolio-items hebben één business owner/lead en één technical owner/lead.  
    Alle CMDB-instances zijn eigendom van de eigenaar van het baseline-portfolio-item dat die instance bevat.
-   Een 'Contains::Contained by'-relatie is een 1-op-veel-relatie tussen een parent-item en een child-item.  
    Een parent-item kan meerdere child-items bevatten, maar een child-item kan niet door meerdere parent-items worden bevat.
-   Een 'Depends on::depended on by'-relatie is een veel-op-veel-relatie tussen een parent-item en child-items.  
    Een parent-item kan van veel child-items afhankelijk zijn, en van een child kunnen veel parent-items afhankelijk zijn.

![](/wp-content/uploads/2026/02/CSDM5_including_rlation_labels.png)

### Business Application (APM-baseline)

-   Grofmazige oplossing die als geheel wordt beheerd
-   Kan deel uitmaken van één (multi-domain) Application Platform
-   Maakt nul of meer business capabilities mogelijk
-   Bevat nul of meer Application Components
-   Is afhankelijk van nul of meer Service Instances
-   Heeft één business owner (bijvoorbeeld een tribe lead)
-   Heeft één technical/IT owner (bijvoorbeeld een tech lead)
-   Heeft een CIAP-rating en een risicoprofiel, die allebei periodiek worden gereviewd
-   Wordt gearchitectureerd door één domein (geleid door een domeinarchitect)

### Application Component (DevSecOps-baseline)

-   Fijnmazige, geversioneerde digitale productcomponent
-   Opgeslagen in een source-code-management-repository (SCM/IaC)
-   Uit te rollen via CI/CD-pipelines
-   Onderdeel van slechts één Business Application
-   Bevat nul of meer Service Instances

### Service Instance (SPM-instance)

-   Gebruikt voor ontwikkeling, test, acceptatie of productie
-   Wordt bevat door één Technical Management Service Offering
-   Eén of meer Business Service Offerings zijn ervan afhankelijk
-   Eén of meer Business Applications zijn ervan afhankelijk
-   Is afhankelijk van één of meer configuration items
-   Kan een child zijn van een andere Service Instance

### Dynamic CI Group (SPM-instance)

-   Gebruikt om vergelijkbare infra-CI's te groeperen die als groep worden gewijzigd/geüpdatet
-   Wordt altijd 'bevat' door één Technical Management Service Offering
-   Verwijst naar één of meer configuration items (snapshot op basis van een query)
-   Kan niet worden gerelateerd aan een Service Instance of een andere Dynamic CI Group
-   Is ook (in een eigen class) opgenomen in de Service Instance-tabel

### Service Delivery System, oftewel Configuration Item (CMDB-instance)

-   is een unieke, discoverbare installatie/deployment van een digitaal product (baseline)
-   is stabiel en heeft een betekenisvolle lifecycle (dus geen vluchtig runtime-artefact)
-   kan een gediscoverde instance van een Application Component zijn
-   kan gerelateerd zijn aan nul of meer configuration items (diverse relatietypen)
-   kan een afhankelijkheid zijn van één of meer Service Instances
-   kan gerelateerd zijn aan een ingekocht asset
-   mag alleen worden aangemaakt/bijgewerkt via discovery/federatie, niet door mensen
-   erft beheerde attributen over van het portfolio-item dat deze CI bevat

### Business Service (SPM-baseline)

-   is een gedefinieerde service (in een business-/salescatalogus)
-   wordt afgenomen door interne en/of externe zakelijke gebruikers
-   is de parent van één of meer Business Service Offerings
-   is een blad onder één node/tak van de servicetaxonomie

### Business Service Offering (SPM-baseline)

-   Is een child van één (parent-)service
-   Is product- en/of regiospecifiek
-   Heeft specifieke commitments (SLA's)
-   Heeft specifieke subscriptions/subscribers
-   Bevat nul of meer Service Instances
-   Bevat nul of meer Dynamic CI Groups
-   Wordt FUNCTIONEEL ondersteund door één supportgroep
-   Wordt gewijzigd door één changegroep
-   Verkrijgt request-/change-goedkeuringen van één approvalgroep

### Technical Management Service (SPM-baseline)

-   is een gedefinieerde service (in een technische catalogus)
-   wordt afgenomen door één of meer technologieteams en/of DevSecOps-teams
-   is de parent van één of meer Technology Management Service Offerings
-   is een blad onder één node/tak van de servicetaxonomie

### Technical Management Service Offering (SPM-baseline)

-   Is een child van één (parent-)service
-   Is product- en/of regiospecifiek
-   Heeft specifieke commitments (bijv. OLA's, UC's, RTO, RPO, enz.)
-   Heeft specifieke subscriptions/subscribers
-   Bevat nul of meer Service Instances of Dynamic CI Groups
-   Wordt TECHNISCH ondersteund door één supportgroep
-   Wordt gewijzigd door één changegroep
-   Verkrijgt request-/change-goedkeuringen van één approvalgroep

### Hardware Asset (ITAM-instance)

-   is een ingekocht item dat is/was opgeslagen of geïnstalleerd.
-   wordt geproduceerd door een fabrikant
-   wordt (op een bepaalde datum) geleverd door een leverancier
-   valt onder garantie tot de einddatum van de garantie.
-   kan onder een onderhoudscontract vallen
-   kan een instance van een productmodel zijn
-   heeft een installatiestatus en een locatie waar het te vinden is
-   kan gerelateerd zijn aan een gediscoverd/gefedereerd configuration item

### **Opmerkingen/tips:**

-   Service Instances van Service Portfolio Management (SPM) koppelen/mappen de gediscoverde CMDB-CI-instances aan de baselines die van de CMDB-instances afhankelijk zijn.  
    Idealiter worden SPM-instances en hun relaties automatisch aangemaakt/bijgewerkt op basis van informatie die in de CI of in een SVCN-tag op de CI beschikbaar is.
-   ChatGPT en sommige mensen die beweren CSDM-experts te zijn, raden aan om omgevingsspecifieke Technical Management Service Offerings aan te maken. Omdat een omgevingsspecifieke Service Instance echter maar door één Technical Management Service Offering kan worden bevat, kan dit gemakkelijk tot duplicatie leiden.
-   Bedrijven die onderscheid maken tussen functioneel beheer en technisch beheer, kunnen Business Service Offerings aanmaken voor de groep die functionele support levert en Technical Management Offerings voor de groep die TECHNISCHE support levert. Koppel die twee via de Service Instance die ertussen zit.
-   Als je verschillende offerings definieert voor verschillende niveaus van technische support op dezelfde applicatie, zul je merken dat je geen 'contains::contained by'-relaties kunt aanmaken van meerdere technische offerings naar dezelfde Service Instance 'Application X, Production'. Het vervangen van de 'contains'-relatie door meerdere 'depends on'-relaties wordt afgeraden, omdat dan niet meer automatisch kan worden bepaald welke offering van toepassing is wanneer 'Application X, Production' uitvalt.
-   Als je twee teams hebt, waarvan het ene de EMEA-instance en het andere de NAM-instance van een Business Application verzorgt, kun je technisch gezien verschillende Service Instances aanmaken: één voor de EMEA-instance en één voor de NAM-instance, ook als het om dezelfde SaaS-applicatie gaat. Voor elk team maak je dan een eigen service offering, commitments en subscriptions aan. Let op: serviceprestaties worden vastgelegd op het niveau van de offering, niet op het niveau van de Service Instance. Let ook op: wanneer van de ene 'instance' wordt gemeld dat die down is, betekent dat niet dat de andere instance automatisch ook als down wordt gemeld.
-   Vanwege bovenstaande beperkingen raad ik aan om per SaaS-instance één Service Instance aan te maken en die te laten bevatten door één Technical Management Service Offering. Daarnaast kun je meerdere Business Service Offerings aanmaken die (N:M) afhankelijk zijn van de Service Instance, één offering per regio, elk met eigen openingstijden, commitments en subscriptions. Serviceprestaties kunnen dan worden vastgelegd voor de business offering, en platformprestaties en gedetecteerde technische issues kunnen worden vastgelegd in de (ene) technische service offering die de Service Instance bevat.
-   Sommige ServiceNow-modules doorlopen alleen upstream relaties om te bepalen wie of wat geraakt wordt. Daarom relateer ik de gedetecteerde webservice/database altijd direct aan de Service Instance die ervan afhankelijk is. Als ik alleen servers aan de Service Instances zou relateren, zou een gedetecteerd probleem met een DBMS geen outage op de Service Instance veroorzaken. Dat gezegd hebbende: schiet niet door, bijvoorbeeld door alle geïnstalleerde softwarepakketten op een server aan de Service Instance te koppelen. Relateer alleen wat relevant is.
