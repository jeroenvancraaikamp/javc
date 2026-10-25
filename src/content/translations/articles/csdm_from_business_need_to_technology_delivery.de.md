---
title: "Vom Business-Bedarf zur Technologiebereitstellung"
excerpt: "Das Common Service Data Model von ServiceNow (CSDM5) gewinnt zunehmend die Aufmerksamkeit von Managern auf C-Level-Ebene, zumal eine gute CMDB mit korrekten und vollständigen Inhalten als kritischer Erfolgsfaktor für die Umsetzung von DORA, SOx, SOC2 und Agentic AI gilt. Mitarbeitende in"
source: "050c3e01c24c7a5b"
---

Das Common Service Data Model von ServiceNow (CSDM5) gewinnt zunehmend die Aufmerksamkeit von Managern auf C-Level-Ebene, zumal eine gute CMDB mit korrekten und vollständigen Inhalten als kritischer Erfolgsfaktor für die Umsetzung von DORA, SOx, SOC2 und Agentic AI gilt.

Mitarbeitende in Architektur, DevOps, SecOps, Risk und Security verwenden häufig unterschiedliche Standards (ISO 27.000, ISO 85.000, ITIL5, TOGAF) und die damit verbundenen Definitionen. Wir haben das CSDM5 mit einer geschichteten ArchiMate/TOGAF-Sicht auf die Service Delivery Systems kombiniert, aus denen sich die typische IT-Landschaft eines Unternehmens zusammensetzt, und es für das Enterprise Service Management nutzbar gemacht.  

### Mit diesen Definitionen bringen wir die verschiedenen Sprachen in Einklang:

  
**Business Applications** sind geschäftsorientierte Lösungen, die Business Capabilities, Prozesse oder Services unterstützen. Sie bestehen in der Regel aus Applikations-, Web-, Integrations- und Daten-Resources, die auf einer oder mehreren Middleware-Plattformen bereitgestellt werden. Neben intern entwickelten Lösungen können auch andere gehostete geschäftsorientierte Lösungen und digitale Services von Mitarbeitenden, Kunden und Partnern genutzt oder mit anderen Services integriert werden. Diese Lösungen werden ebenfalls als Business Applications erfasst.

**Software-as-a-Service**-Lösungen (SaaS) von Drittanbietern werden als Business Applications erfasst, auch wenn das Unternehmen nur eingeschränkten oder gar keinen Einblick in die zugrunde liegenden Resources, Infrastruktur- oder Plattformkomponenten hat und der Anbieter seine Compliance selbst verantwortet. SaaS-Lösungen werden – per Definition – als Service angeboten und erfüllen die dazu dokumentierten vertraglichen Zusagen. Architekten modellieren die Schnittstellen zwischen den Applikationen des Unternehmens und den SaaS-Lösungen im Architecture Repository.

**Resources** stellen stabile, auffindbare Instanzen von **SDLC Application Components** dar (Subsysteme, die entworfen, gebaut, getestet und integriert werden). Komponenten werden in der Regel in Source-Code-Repositories abgelegt und häufig über CI/CD-Pipelines bereitgestellt. DevOps-Orchestration- und Observability-Tools steuern und überwachen ihr Verhalten.

**Middleware** steht für Software, die Applikationen und Resources Laufzeitdienste bereitstellt und typischerweise auf physischen oder virtuellen Nodes läuft. Beispiele sind Webserver, Applikationsserver, Datenbankserver, Integrationsplattformen, Messaging-Plattformen und Orchestrierungsplattformen.

Eine **Service Instance** repräsentiert jedes Deployment einer Business Application. Für Entwicklungs-, Test-, Abnahme- und Produktionsumgebungen werden in der Regel separate Service Instances angelegt, sodass jedes Deployment verwaltet, überwacht und unabhängig mit seinem unterstützenden Technologie-Stack verknüpft werden kann.

**Workplace-/Productivity-Services** (PCs, Mobiltelefone, Tablets usw.) werden als Service Offerings und nicht als Business Applications erfasst. Software, die auf Endgeräten bereitgestellt wird, wird über Assets, Software Installations und Software-License-Datensätze verwaltet.

**Environments/Streets** sind IP-Domänen, die in der Regel voneinander getrennt sind und für einen bestimmten Zweck oder eine bestimmte Zielgruppe genutzt werden. So kann beispielsweise (das, was auf) Nodes in der Testumgebung (läuft) nicht mit (dem, was auf) Nodes in der Produktionsumgebung (läuft) interagieren. Manche Unternehmen nutzen zudem kunden- oder regionsspezifische Streets.

**Resources, Middleware, Nodes und ihre Abhängigkeiten (im CSDM5: „Service Delivery Systems“) werden automatisch erkannt und automatisch in der CMDB erfasst bzw. aktualisiert.** Diese Configuration Items werden mit den Service Instance(s), die von ihnen abhängen, verknüpft und diesen zugeordnet. So entsteht eine durchgängige End-to-End-Sicht auf die bereitgestellte Lösungsarchitektur.

Jede Fähigkeit, die „as a Service“ bereitgestellt wird, wird durch ein **Service Offering** abgebildet. Beispiele sind Application Services, Middleware Services, Infrastructure Services, Workplace Services und Corporate Services. Service Offerings können umgebungs-, regions- oder standortspezifisch sein. Jedes Service Offering legt die zugehörigen Zusagen, Subscriptions, Support-Kontakte, Verantwortlichkeiten und Serviceerwartungen fest.

![](/wp-content/uploads/2026/06/ZERO-TOUCH-CMDB-Class-Model.png)

**Offered Services**, die ausschließlich von der IT genutzt werden, werden als **Technology Management Services** klassifiziert. Services, die von Fachanwendern, Kunden oder externen Parteien genutzt werden, werden als **Business Services** klassifiziert.

**Foundational Data** sind gemeinsam genutzte Informationen, die in mehreren Practices verwendet werden. Services, Offerings, Applications, dynamische CI-Gruppen und Equipment verweisen in der Regel auf Foundational Data, etwa um Asset-Eigentümer, Asset-Nutzer, IT-Gruppen, Ansprechpartner, Abonnenten, Kunden, Lieferanten, Prozessmodelle, Produktmodelle usw. zu erfassen.

Die Tausenden von **SDLC Application Components** erben ihre Referenzen auf Foundational Data in der Regel von der Application bzw. Solution, zu der sie gehören. Risikobewertungen von Applications gelten auch für die Komponenten und Instanzen, die in der Application enthalten sind bzw. von ihr genutzt werden.  

### **ZERO-TOUCH CMDB**

  
In diesem Modell dürfen Resources, Middleware und Nodes in der CMDB nicht von Menschen angelegt oder aktualisiert werden. Sie enthalten ausschließlich die technische Realität sowie die erkannten Beziehungen, Namen und Attributwerte. Referenzen auf Foundational Data lassen sich in der Regel nicht technisch erkennen. Deshalb müssen die CIs der CMDB – in dieser Interpretation des CSDM – stets direkt oder indirekt mit einer Application und/oder einem Offering verknüpft sein, die Referenzattribute wie „Business Owner“, „IT Owner“, „Support Group“, „Change Group“, „CAB Group“, „Location“, „Organization“ usw. enthalten. Die Organisation kann dabei der klassischen Struktur „Unternehmen => Geschäftsbereich => Abteilung“ oder der modernen agilen Struktur „Tribe/ART => Cluster/Chapter ==> DevSecOps-Team/Squad“ folgen.

![](/wp-content/uploads/2026/06/CSDM5-incl-Relation-Labels.png)
