---
title: "Wat zijn AI Agent Cards in A2A?"
excerpt: "Een AI Agent Card is een gestructureerd, vindbaar configuratiebestand – in feite een digitaal cv in YAML+-formaat – dat een AI Agent beschrijft volgens het Agent-to-Agent (A2A) Protocol . Het bevat doorgaans metadata zoals de naam van de agent, de provider, capabilities, skills, API"
source: "f06dcb06fbd5f887"
---

Een **AI Agent Card** is een gestructureerd, vindbaar configuratiebestand – in feite een digitaal cv in YAML+-formaat – dat een AI Agent beschrijft volgens het **Agent-to-Agent (A2A) Protocol**. Het bevat doorgaans metadata zoals de naam van de agent, de provider, capabilities, skills, het API-endpoint (URL), het authenticatiemechanisme, tags en governancekenmerken.

Deze cards worden ofwel rechtstreeks door de AI Agent zelf aangeboden, ofwel gehost op een A2A-compliant server die meerdere AI Agents kan registreren en beschikbaar stellen. Het doel: **het andere agents, systemen of orkestratietools makkelijk maken om in real time te ontdekken welke AI Agent geschikt is voor welke taak.** Bijvoorbeeld:  

  
-   'Biedt geavanceerde routeplanning, verkeersanalyse en het genereren van gepersonaliseerde kaarten.'
  
-   'Berekent de optimale rijroute tussen twee of meer locaties.'
  

  
Op weg naar een platformgebaseerde AI-inventaris Waarschijnlijk ontwikkelt elk enterpriseplatform zijn eigen **AI-inventaris**: een register van AI Agents die binnen het platform gebruikt mogen worden. AI Agent Cards kunnen automatisch worden ontdekt en gefedereerd in zo'n inventaris, waardoor een live catalogus van beschikbare AI-capabilities ontstaat. Dat maakt orkestratie mogelijk over workflows, domeinen en zelfs leveranciers heen.

Anders dan traditionele statische records zijn AI Agent Cards dynamisch: platforms kunnen on-demand actuele, geverifieerde informatie ophalen in plaats van te vertrouwen op verouderde CMDB-snapshots. Sommige Configuration Managers geven misschien nog steeds de voorkeur aan het importeren van carddata in de CMDB, maar anderen (ikzelf ook) vinden dat het rechtstreeks raadplegen van de broncard, op het moment dat het nodig is, beter schaalbaar en toekomstbestendiger is.

AI A2A-servers vormen samen een soort **virtuele CMDB** voor de AI-wereld: gedistribueerd, gefedereerd en live. Wat nog ontbreekt is de lokale AI Orchestrator (ook wel VMDB-AI-Agent): een runtimecomponent die AI Agent Cards uit vertrouwde bronnen ophaalt en de metadata beschikbaar stelt aan het AI-ecosysteem van het platform. Zie het als de DNS voor AI Agents, maar dan met veel meer detail.

Dit werkt uiteraard alleen als aanbieders van AI-oplossingen A2A-compliant cards publiceren voor hun AI Agents. Sommigen doen dat al. Deze platforms krijgen dan niet alleen zicht op agents die lokaal draaien, maar ook op agents die op externe platforms actief zijn – inclusief de bijbehorende skills, modellen, prompts, capabilities en datasets.

**AI ontmoet DevSecOps.** Ontwikkelaars van AI Agents lopen vandaag tegen vergelijkbare operationele uitdagingen aan als DevSecOps-teams die fijnmazige componenten beheren, zoals API's, microservices en cloudresources. Traditionele ITIL-workflows zijn vaak te star voor deze mate van wendbaarheid. Daar komt AI Ops in beeld: een toekomst waarin AI zelf operationele problemen detecteert en oplost. In die context is de VMDB-AI-Agent met toegang tot real-time AI Agent Cards onmisbaar om 'IT weer werkend te krijgen'.

**Net als DevSecOps creëert de AI-wereld haar eigen governance en gebruikt ze haar eigen tools.** Denk aan ServiceNow NOW Assist, met AI Studio, AI Data Fabric , AI Guardian en AI Control Tower, die weinig relatie of integratie hebben met de bestaande ITSM-, ITOM- en IRM-capabilities van het platform.

Ging de cloud over infrastructure as code, dan tekent het AI-tijdperk zich af als **capabilities as cards.** AI **Agent Card**s zijn compacte maar rijke bronnen van operationele, functionele en governancedata voor AI Agents. Ze bieden:  

  
-   Capabilities en skills
  
-   Hosting- en toegangsinformatie (URL, authenticatie)
  
-   Tags en classificaties
  
-   Compliance- en governancemetadata
  
-   Real-time vindbaarheid voor orkestratie en automatisering
  

  
**Een voorbeeld van een AI Agent Card:**  

> {  
> "**name**": "GeoSpatial Route Planner Agent",  
> "**description**": "Provides advanced route planning, traffic analysis, and custom map generation services. This agent can calculate optimal routes, estimate travel times considering real-time traffic, and create personalized maps with points of interest.",  
> "**url**": "https://georoute-agent.example.com/a2a/v1",  
> "**provider**": {  
> "**organization**": "Example Geo Services Inc.",  
> "**url**": "https://www.examplegeoservices.com"  
> },  
> "**version**": "1.2.0",  
> "**documentationUrl**": "https://docs.examplegeoservices.com/georoute-agent/api",  
> "**capabilities**": {  
> "**streaming**": true,  
> "**pushNotifications**": true,  
> "**stateTransitionHistory**": false  
> },  
> "**authentication**": {  
> "schemes": \["OAuth2"\],  
> "credentials": "{"authorizationUrl": "https://auth.examplegeoservices.com/authorize", "tokenUrl": "https://auth.examplegeoservices.com/token", "scopes": {"route:plan": "Allows planning new routes.", "map:custom": "Allows creating and managing custom maps."}}"  
> },  
> "defaultInputModes": \["application/json", "text/plain"\],  
> "defaultOutputModes": \["application/json", "image/png"\],  
> "**skills**": \[  
> {  
> "id": "route-optimizer-traffic",  
> "name": "Traffic-Aware Route Optimizer",  
> "description": "Calculates the optimal driving route between two or more locations, taking into account real-time traffic conditions, road closures, and user preferences (e.g., avoid tolls, prefer highways).",  
> "tags": \["maps", "routing", "navigation", "directions", "traffic"\],  
> "examples": \[  
> "Plan a route from '1600 Amphitheatre Parkway, Mountain View, CA' to 'San Francisco International Airport' avoiding tolls.",  
> "{"origin": {"lat": 37.422, "lng": -122.084}, "destination": {"lat": 37.7749, "lng": -122.4194}, "preferences": \["avoid\_ferries"\]}"  
> \],  
> "inputModes": \["application/json", "text/plain"\],  
> "outputModes": \[  
> "application/json",  
> "application/vnd.geo+json",  
> "text/html"  
> \]  
> },  
> {  
> "id": "custom-map-generator",  
> "name": "Personalized Map Generator",  
> "description": "Creates custom map images or interactive map views based on user-defined points of interest, routes, and style preferences. Can overlay data layers.",  
> "tags": \["maps", "customization", "visualization", "cartography"\],  
> "examples": \[  
> "Generate a map of my upcoming road trip with all planned stops highlighted.",  
> "Show me a map visualizing all coffee shops within a 1-mile radius of my current location."  
> \],  
> "inputModes": \["application/json"\],  
> "outputModes": \[  
> "image/png",  
> "image/jpeg",  
> "application/json",  
> "text/html"  
> \]  
> }  
> \]  
> }
