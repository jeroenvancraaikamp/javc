---
title: "What are AI Agent Cards in A2A?"
date: 2025-05-17
categories: ["AI4IT"]
excerpt: "An AI Agent Card is a structured, discoverable configuration file—essentially a digital resumé in YAML+ format—that describes an AI Agent according to the Agent-to-Agent (A2A) Protocol . It typically includes metadata such as the agent’s name, provider, capabilities, skills, API"
image: "/wp-content/uploads/2025/05/AI-Agent-Card.png"
readingTime: 4
---

An **AI Agent Card** is a structured, discoverable configuration file—essentially a digital resumé in YAML+ format—that describes an AI Agent according to the **Agent-to-Agent (A2A) Protocol**. It typically includes metadata such as the agent’s name, provider, capabilities, skills, API endpoint (URL), authentication mechanism, tags, and governance characteristics.

These cards are either served directly by the AI Agent itself or hosted on an A2A-compliant server that can register and expose multiple AI Agents. The goal: **make it easy for other agents, systems, or orchestration tools to discover which AI Agent is suited for which task—in real time.** For example:  

  
-   “Provides advanced route planning, traffic analysis, and custom map generation.”
  
-   “Calculates the optimal driving route between two or more locations.”
  

  
Towards a Platform-Based AI Inventory It is likely that every enterprise platform will evolve its own **AI-inventory**: a registry of AI Agents authorized for use within the platform. AI Agent Cards can be automatically discovered and federated into such an inventory, forming a live catalog of available AI capabilities. This enables orchestration across workflows, domains, and even vendors.

Unlike traditional static records, AI Agent Cards are dynamic, allowing platforms to retrieve fresh, verified information on-demand, rather than relying on outdated CMDB snapshots. While some Configuration Managers might still prefer importing card data into the CMDB, others (myself included) argue that consuming the source card directly, when needed, is more scalable and future-proof.

AI A2A Servers together act as a kind of **virtual CMDB** for the AI world—distributed, federated, and live. What’s still missing is the local AI Orchestrator (a.k.a. VMDB-AI-Agent)—a runtime component that pulls AI Agent Cards from trusted sources and exposes their metadata to the platform's AI ecosystem. Think of it as the DNS for AI Agents, but with richer detail.

Of course, this only works if AI solution providers publish A2A-compliant cards for their AI agents. Some already do. These platforms not only gain visibility into agents running locally, but also into those operating across external platforms—along with their associated skills, models, prompts, capabilities, and datasets.

**AI Meets DevSecOps.** Developers of AI Agents today face similar operational challenges as DevSecOps teams managing fine-grained components such as APIs, microservices, and cloud resources. Traditional ITIL workflows are often too rigid for this level of agility. Enter AI Ops—a future in which AI itself detects and resolves operational issues. In this context, the VMDB-AI-Agent with access to real-time AI Agent Cards will be invaluable in “making IT work again”.

**Similar to DevSecOps, AI world is creating its own governance and is using its own tools.** E.g. ServiceNow NOW Assist, with its AI Studio, AI Data Fabric , AI Guardian, and AI Control Tower, that have little relation/integrations with the incumbent ITSM, ITOM, and IRM platform capabilities.

If the cloud was about infrastructure as code, the AI era is shaping up to be **capabilities as cards.** AI **Agent Card**s are compact yet rich sources of operational, functional, and governance data for AI Agents. They provide:  

  
-   Capabilities and skills
  
-   Hosting and access info (URL, authentication)
  
-   Tags and classifications
  
-   Compliance and governance metadata
  
-   Real-time discoverability for orchestration and automation
  

  
**An example of an AI Agent Card:**  

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
