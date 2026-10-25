---
title: "CMDB vs CSDM: scope en doel uitgelegd"
excerpt: "Hoewel ze vaak door elkaar worden gebruikt, hebben CMDB en CSDM een fundamenteel ander doel. Het verwarren van die twee is een van de belangrijkste redenen waarom 75% van de CMDB-initiatieven mislukt. Wat is de CMDB? De Configuration Management Database (CMDB) is een operationele datastore"
source: "615c94db809d7b2b"
---

Hoewel ze vaak door elkaar worden gebruikt, hebben CMDB en CSDM een fundamenteel ander doel. **Het verwarren van die twee is een van de belangrijkste redenen waarom 75% van de CMDB-initiatieven mislukt.**

  

## Wat is de CMDB?

  
De **Configuration Management Database (CMDB)** is een **operationele datastore**.  

### Scope van de CMDB

  
De CMDB bevat:  

  
-   Uitgerolde configuration items (CI's)
  
-   Runtime-instanties en hun technische relaties
  
-   Gediscoverde en gefedereerde infrastructuur- en platformcomponenten
  
-   Service-instanties en hun afhankelijkheden
  
-   Operationele attributen die nodig zijn voor ITSM-, ITOM-, SecOps- en risk-use-cases
  

  

### Kenmerken van de CMDB

  

  
-   Gericht op de **runtime-werkelijkheid**
  
-   Voornamelijk gevuld via **geautomatiseerde discovery en integraties**
  
-   Voortdurend in verandering
  
-   Geoptimaliseerd voor **operations, impactanalyse, incident, change en risk**
  
-   Niet leidend voor design-time- of portfoliobeslissingen
  

  

> **De CMDB beantwoordt:** "Wat draait er, waar, en wat is ervan afhankelijk, op dit moment?"

  

## Wat is CSDM?

  
Het **Common Service Data Model (CSDM)** is een **logisch referentiemodel**.  

### Scope van CSDM

  
CSDM definieert:  

  
-   Welke objecttypen er bestaan (applicaties, services, offerings, instanties, producten)
  
-   Hoe die objecten zich tot elkaar verhouden
  
-   Waar eigenaarschap, verantwoordelijkheid en toezeggingen thuishoren
  
-   Welke artefacten via het portfolio worden beheerd en welke via runtime-discovery worden gevonden
  

  

### Kenmerken van CSDM

  

  
-   Stabiel en uitgesproken
  
-   Service-centrisch door ontwerp
  
-   Onafhankelijk van tools en discoverymethoden
  
-   Gericht op **governance, consistentie en gedeeld begrip**
  
-   Toepasbaar buiten de CMDB (APM, ITSM, IRM, TBM, EA)
  

  

> **CSDM beantwoordt:** "Wat *zou* er moeten bestaan, hoe past het in elkaar, en wie is verantwoordelijk?"

  

## Het belangrijkste verschil in één zin

  

> **CSDM definieert de structuur en de regels; de CMDB bevat de data die aan die regels voldoet.**

  

## Vergelijking van de scope

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Aspect | CMDB | CSDM |
| --- | --- | --- |
| Aard | Operationele datastore | Logisch referentiemodel |
| Doel | Operationeel inzicht & impact | Structurele consistentie & governance |
| Focus | Runtime-werkelijkheid | Service- & portfoliostructuur |
| Wijzigingsfrequentie | Hoog (continu) | Laag (bewust) |
| Databron | Discovery, integraties | Architectuur- & ontwerpprincipes |
| Eigenaar van data | Nee (gebruikt leidende bronnen) | Nee (definieert waar eigenaarschap thuishoort) |
| Doelgroep | Ops, ITSM, SecOps | Architecten, governance, platformteams |

  

  

## Wat hoort waar (vuistregel)

  

### Hoort in de CMDB

  

  
-   Service-instanties
  
-   Uitgerolde servers, containers, cloudresources
  
-   Runtime-afhankelijkheden
  
-   Gediscoverde software en infrastructuur
  
-   Dynamische CI-groepen
  

  

### Gedefinieerd door CSDM (maar geïnstantieerd in de CMDB)

  

  
-   Business en Technical Applications
  
-   Business en Technology Services
  
-   Service Offerings
  
-   Patronen voor service-instanties
  
-   Model voor eigenaarschap en verantwoordelijkheid
  

  

### Hoort *niet* in de CMDB

  

  
-   Design-time-artefacten
  
-   CI/CD-pipelines
  
-   Broncode en build-metadata
  
-   Kortstondige runtime-events
  
-   Interne gegevens van DevSecOps-tools
  

  

## Waarom dit onderscheid ertoe doet

  
Wanneer CMDB en CSDM op één hoop worden gegooid:  

  
-   Raken CMDB's opgeblazen en onbeheersbaar
  
-   Verliest discoverydata haar context
  
-   Wordt governance handwerk en politiek
  
-   Verzetten DevOps-teams zich tegen integratie
  
-   Wordt auditbewijs inconsistent
  

  
Wanneer ze correct gescheiden zijn:  

  
-   Wordt discovery veilig en schaalbaar
  
-   Is service-eigenaarschap duidelijk
  
-   Werkt impactanalyse
  
-   Sluit bewijs voor risk en compliance vanzelf aan
  
-   Bestaan DevSecOps en de CMDB zonder wrijving naast elkaar
  

  

## Het moderne operating model

  

  
-   **CSDM** biedt de stabiele, service-centrische blauwdruk
  
-   **CMDB** levert de dynamische runtime-data
  
-   Discovery en federatie houden die twee op één lijn
  
-   Portfolio-items worden beheerd; runtime-items worden waargenomen
