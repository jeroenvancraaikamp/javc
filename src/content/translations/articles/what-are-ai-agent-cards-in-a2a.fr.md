---
title: "Que sont les AI Agent Cards dans A2A ?"
excerpt: "Une AI Agent Card est un fichier de configuration structuré et découvrable, en quelque sorte un CV numérique au format YAML+, qui décrit un agent IA conformément au protocole Agent-to-Agent (A2A) . Elle comprend généralement des métadonnées telles que le nom de l'agent, son fournisseur, ses capacités, ses compétences, son API"
source: "f06dcb06fbd5f887"
---

Une **AI Agent Card** est un fichier de configuration structuré et découvrable, en quelque sorte un CV numérique au format YAML+, qui décrit un agent IA conformément au **protocole Agent-to-Agent (A2A)**. Elle comprend généralement des métadonnées telles que le nom de l'agent, son fournisseur, ses capacités, ses compétences, son endpoint d'API (URL), son mécanisme d'authentification, ses tags et ses caractéristiques de gouvernance.

Ces cards sont soit exposées directement par l'agent IA lui-même, soit hébergées sur un serveur conforme à A2A capable d'enregistrer et d'exposer plusieurs agents IA. L'objectif : **permettre facilement à d'autres agents, systèmes ou outils d'orchestration de découvrir, en temps réel, quel agent IA convient à quelle tâche.** Par exemple :  

  
-   « Fournit une planification d'itinéraires avancée, une analyse du trafic et la génération de cartes personnalisées. »
  
-   « Calcule l'itinéraire routier optimal entre deux lieux ou plus. »
  

  
Vers un inventaire d'IA propre à chaque plateforme Il est probable que chaque plateforme d'entreprise développe son propre **inventaire d'IA** : un registre des agents IA autorisés à être utilisés au sein de la plateforme. Les AI Agent Cards peuvent être découvertes automatiquement et fédérées dans un tel inventaire, formant ainsi un catalogue dynamique des capacités d'IA disponibles. Cela permet l'orchestration à travers les workflows, les domaines, voire les éditeurs.

Contrairement aux enregistrements statiques traditionnels, les AI Agent Cards sont dynamiques : elles permettent aux plateformes de récupérer à la demande des informations à jour et vérifiées, plutôt que de s'appuyer sur des instantanés obsolètes de la CMDB. Si certains Configuration Managers préfèrent encore importer les données des cards dans la CMDB, d'autres (dont je fais partie) estiment que consommer directement la card source, au moment où l'on en a besoin, est plus évolutif et plus pérenne.

Ensemble, les serveurs A2A d'IA constituent une sorte de **CMDB virtuelle** pour le monde de l'IA : distribuée, fédérée et vivante. Ce qui manque encore, c'est l'AI Orchestrator local (alias VMDB-AI-Agent) : un composant d'exécution qui récupère les AI Agent Cards auprès de sources de confiance et expose leurs métadonnées à l'écosystème IA de la plateforme. Voyez-le comme le DNS des agents IA, mais avec des informations bien plus riches.

Bien entendu, cela ne fonctionne que si les fournisseurs de solutions d'IA publient des cards conformes à A2A pour leurs agents IA. Certains le font déjà. Ces plateformes obtiennent ainsi de la visibilité non seulement sur les agents exécutés localement, mais aussi sur ceux qui opèrent sur des plateformes externes, ainsi que sur leurs compétences, modèles, prompts, capacités et jeux de données associés.

**L'IA rencontre le DevSecOps.** Les développeurs d'agents IA sont aujourd'hui confrontés à des défis opérationnels similaires à ceux des équipes DevSecOps qui gèrent des composants à granularité fine tels que les API, les microservices et les ressources cloud. Les workflows ITIL traditionnels sont souvent trop rigides pour un tel niveau d'agilité. Place à l'AI Ops : un avenir dans lequel l'IA elle-même détecte et résout les incidents opérationnels. Dans ce contexte, le VMDB-AI-Agent, avec son accès en temps réel aux AI Agent Cards, sera inestimable pour « faire à nouveau fonctionner l'IT ».

**À l'instar du DevSecOps, le monde de l'IA crée sa propre gouvernance et utilise ses propres outils.** Par exemple ServiceNow NOW Assist, avec son AI Studio, son AI Data Fabric , son AI Guardian et son AI Control Tower, qui n'ont que peu de liens ou d'intégrations avec les fonctionnalités existantes des plateformes ITSM, ITOM et IRM.

Si le cloud était synonyme d'infrastructure as code, l'ère de l'IA prend la forme de **capabilities as cards.** Les **AI Agent Cards** sont des sources compactes mais riches de données opérationnelles, fonctionnelles et de gouvernance sur les agents IA. Elles fournissent :  

  
-   Les capacités et les compétences
  
-   Les informations d'hébergement et d'accès (URL, authentification)
  
-   Les tags et les classifications
  
-   Les métadonnées de conformité et de gouvernance
  
-   La découvrabilité en temps réel pour l'orchestration et l'automatisation
  

  
**Exemple d'AI Agent Card :**  

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
