---
title: "Was sind AI Agent Cards in A2A?"
excerpt: "Eine AI Agent Card ist eine strukturierte, auffindbare Konfigurationsdatei, im Grunde ein digitaler Lebenslauf im YAML+-Format, die einen AI Agent gemäß dem Agent-to-Agent-(A2A-)Protokoll beschreibt. Sie enthält typischerweise Metadaten wie Name, Anbieter, Fähigkeiten, Skills, API"
source: "f06dcb06fbd5f887"
---

Eine **AI Agent Card** ist eine strukturierte, auffindbare Konfigurationsdatei, im Grunde ein digitaler Lebenslauf im YAML+-Format, die einen AI Agent gemäß dem **Agent-to-Agent-(A2A-)Protokoll** beschreibt. Sie enthält typischerweise Metadaten wie Name, Anbieter, Fähigkeiten, Skills, API-Endpunkt (URL), Authentifizierungsmechanismus, Tags und Governance-Merkmale des Agenten.

Diese Cards werden entweder direkt vom AI Agent selbst bereitgestellt oder auf einem A2A-konformen Server gehostet, der mehrere AI Agents registrieren und verfügbar machen kann. Das Ziel: **Anderen Agenten, Systemen oder Orchestrierungswerkzeugen soll es leicht gemacht werden, in Echtzeit herauszufinden, welcher AI Agent sich für welche Aufgabe eignet.** Zum Beispiel:  

  
-   „Bietet erweiterte Routenplanung, Verkehrsanalyse und die Erstellung individueller Karten.“
  
-   „Berechnet die optimale Fahrtroute zwischen zwei oder mehr Orten.“
  

  
Auf dem Weg zu einem plattformbasierten AI-Inventar Es ist wahrscheinlich, dass jede Enterprise-Plattform ihr eigenes **AI-Inventar** entwickeln wird: ein Verzeichnis der AI Agents, die für die Nutzung innerhalb der Plattform freigegeben sind. AI Agent Cards können automatisch erkannt und in ein solches Inventar föderiert werden, sodass ein lebendiger Katalog der verfügbaren AI-Fähigkeiten entsteht. Das ermöglicht Orchestrierung über Workflows, Domänen und sogar Anbieter hinweg.

Anders als herkömmliche statische Datensätze sind AI Agent Cards dynamisch. Plattformen können damit bei Bedarf aktuelle, verifizierte Informationen abrufen, statt sich auf veraltete CMDB-Momentaufnahmen zu verlassen. Während manche Configuration Manager die Daten der Cards vielleicht lieber in die CMDB importieren, vertreten andere (ich eingeschlossen) die Auffassung, dass es skalierbarer und zukunftssicherer ist, die Quell-Card bei Bedarf direkt zu nutzen.

AI-A2A-Server bilden zusammen eine Art **virtuelle CMDB** für die AI-Welt: verteilt, föderiert und live. Was noch fehlt, ist der lokale AI Orchestrator (auch VMDB-AI-Agent genannt), eine Laufzeitkomponente, die AI Agent Cards aus vertrauenswürdigen Quellen abruft und deren Metadaten dem AI-Ökosystem der Plattform zur Verfügung stellt. Stellen Sie sich das wie ein DNS für AI Agents vor, nur mit deutlich mehr Details.

Das funktioniert natürlich nur, wenn Anbieter von AI-Lösungen A2A-konforme Cards für ihre AI Agents veröffentlichen. Einige tun das bereits. Diese Plattformen erhalten nicht nur Transparenz über lokal laufende Agenten, sondern auch über solche, die auf externen Plattformen arbeiten, einschließlich der zugehörigen Skills, Modelle, Prompts, Fähigkeiten und Datensätze.

**AI trifft DevSecOps.** Entwickler von AI Agents stehen heute vor ähnlichen betrieblichen Herausforderungen wie DevSecOps-Teams, die feingranulare Komponenten wie APIs, Microservices und Cloud-Ressourcen verwalten. Klassische ITIL-Workflows sind für dieses Maß an Agilität oft zu starr. Hier kommt AI Ops ins Spiel: eine Zukunft, in der die AI selbst betriebliche Probleme erkennt und behebt. In diesem Kontext wird der VMDB-AI-Agent mit Zugriff auf AI Agent Cards in Echtzeit von unschätzbarem Wert sein, um „die IT wieder zum Laufen zu bringen“.

**Ähnlich wie bei DevSecOps schafft sich die AI-Welt ihre eigene Governance und nutzt ihre eigenen Werkzeuge.** Ein Beispiel ist ServiceNow NOW Assist mit AI Studio, AI Data Fabric, AI Guardian und AI Control Tower, die kaum Bezug zu den etablierten ITSM-, ITOM- und IRM-Fähigkeiten der Plattform haben bzw. kaum mit ihnen integriert sind.

Ging es in der Cloud um Infrastructure as Code, so zeichnet sich die AI-Ära als **Capabilities as Cards** ab. AI **Agent Card**s sind kompakte und zugleich reichhaltige Quellen für betriebliche, funktionale und Governance-Daten von AI Agents. Sie liefern:  

  
-   Fähigkeiten und Skills
  
-   Hosting- und Zugriffsinformationen (URL, Authentifizierung)
  
-   Tags und Klassifizierungen
  
-   Compliance- und Governance-Metadaten
  
-   Auffindbarkeit in Echtzeit für Orchestrierung und Automatisierung
  

  
**Ein Beispiel für eine AI Agent Card:**  

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
