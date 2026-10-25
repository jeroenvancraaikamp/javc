---
title: "ServiceNow hat CSDM 5 veröffentlicht"
excerpt: "Am 8. Mai 2025 hat ServiceNow das lang erwartete White Paper zum Common Service Data Model (CSDM) 5 veröffentlicht. Das 63-seitige Dokument markiert eine bedeutende Weiterentwicklung des Datenmodells, das vielen ServiceNow-Implementierungen in IT-Organisationen weltweit zugrunde liegt. CSDM 5 führt"
source: "9bd5d70b78a9e775"
---

Am 8. Mai 2025 hat ServiceNow das lang erwartete [**White Paper zum Common Service Data Model (CSDM) 5**](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf) veröffentlicht. Das 63-seitige Dokument markiert eine bedeutende Weiterentwicklung des Datenmodells, das vielen ServiceNow-Implementierungen in IT-Organisationen weltweit zugrunde liegt.

**CSDM 5 führt eine überarbeitete Struktur mit sieben Domänen ein**, von denen jede einen zentralen Fähigkeitsbereich abbildet:  

  
2.  Ideation & Strategy
  
4.  Design & Planning
  
6.  Manage Portfolio
  
8.  Build & Integration
  
10.  Service Delivery
  
12.  Service Consumption
  
14.  Foundation
  

  
Im Vergleich zum Vorgänger CSDM 4, der vor vier Jahren erschienen ist, bringt das aktualisierte Modell mehrere konzeptionelle und strukturelle Verbesserungen mit sich. Im Folgenden eine Übersicht der zehn wichtigsten Änderungen:  

  
2.  **Digital Product Portfolio** Wie im Standard IT4IT 3.0.1 werden Applications, Services und Products im CSDM nun allesamt als Elemente eines gemanagten Digital Product Portfolio behandelt. Im Vordergrund stehen dabei Lifecycle-Verantwortung und Wertschöpfung.
  
4.  **Neue Domäne: Ideation & Strategy** Zur Unterstützung der strategischen Planung wurde eine neue Domäne eingeführt. Sie erweitert das Demand Management um Verknüpfungen zu strategischen Zielen, Geschäftsplänen und Investitionsprioritäten und bildet so den Ausgangspunkt für Delivery-Workflows in der Domäne Build & Integration.
  
6.  **Verbesserte Strukturierung der CMDB** Die CMDB ist nun in Services, Service Offerings, Service Instances, Service Delivery Network Items und Dynamic CI Groups gegliedert, die jeweils eine klarer definierte Rolle erfüllen.
  
8.  **Erweiterte Definition von Service Instances** Über Application Services hinaus umfassen Service Instances nun auch die Typen Data, Network, Connection, Facilities und Operational Process. Diese lassen sich schichtweise kombinieren, was Komponierbarkeit und Nachvollziehbarkeit ermöglicht.
  
10.  **Konzept des Service Delivery Network** Als neuer Oberbegriff für eine Vielzahl von CMDB-Klassen steht das Service Delivery Network für die Gesamtheit der Configuration Items, die Service Instances unterstützen.
  
12.  **Dynamic CI Groups** CIs können nun anhand von Abfragekriterien dynamisch gruppiert werden. Incidents, Problems und Changes lassen sich so auf Gruppenebene erfassen, was die operativen Prozesse vereinfacht.
  
14.  **Lifecycle Status** ersetzt Operational Status. Es zeichnet sich ein schrittweiser Wandel von den traditionellen Install- und Operational-Status hin zu lifecycle-basierten Status und Phasen ab. CSDM 5 widmet diesen Lifecycle-Definitionen beträchtliche Aufmerksamkeit.
  
16.  **Überarbeitung von Benennungen und Terminologie** Mehrere Artefakte wurden umbenannt, um ihre Funktion besser widerzuspiegeln. Die neuen Namen sind zwar teils recht lang, dürften in Listen und Formularen der Benutzeroberfläche aber abgekürzt werden.
  
18.  **KI wird erwähnt** (natürlich) CSDM 5 nimmt zwar Bezug auf künstliche Intelligenz, geht jedoch kaum ins Detail und lässt damit Raum für Interpretationen und künftige Präzisierungen.
  
20.  **Erweiterungen der Foundation** Die Foundation-Schicht umfasst nun auch Product Features, Software Bill of Materials (SBOM) und Value Streams – ein Zeichen für eine stärkere Ausrichtung am IT4IT-Standard.
  

  
CSDM 5 ist am Standard IT4IT 3.0.1 der Open Group ausgerichtet, auch wenn für ähnliche Konzepte ein etwas anderes Vokabular verwendet wird. So entsprechen beispielsweise die IT4IT-Value-Chains „Plan“, „Build“, „Deliver“ und „Run“ in etwa den CSDM-Domänen. Wer zusätzliche Orientierung zur finanziellen Modellierung der IT sucht, wird weder in CSDM 5 noch in IT4IT 3.0.1 fündig. Allerdings lassen sich die Daten und Definitionen der Technology Business Management (TBM) Taxonomy 4.0/5.0 auf das CSDM abbilden.

Der Zeitpunkt der Veröffentlichung – kurz vor ServiceNow Knowledge 2025 – lässt eine gewisse Eile vermuten, dennoch enthält das Dokument wertvolle Erkenntnisse. Es wurden jedoch auch einige Lücken und Ungereimtheiten festgestellt, sodass in künftigen Versionen mit kleineren Korrekturen oder Klarstellungen zu rechnen ist.

**Nächste Schritte:**

CSDM 5 ist ein wichtiger Schritt nach vorn – insbesondere für Unternehmen, die sich an IT4IT und offenen IT-Architektur-Frameworks orientieren. Wer jedoch auf ein Common Service Data Model für **Enterprise Service Management (IT4ESM)** gewartet hat, muss sich noch etwas gedulden.

ServiceNow arbeitet bereits an einem CSDM 5+ Draft, der ein feiner granuliertes Datenmodell mit mehr Artefakten und Beziehungen umfasst. Mit Blick auf CSDM 6 (erwartet für 2026) ist mit konkreteren Modellierungsempfehlungen rund um KI (insbesondere Agents) sowie einer klareren Zuordnung der CSDM-Artefakte zu operativen Praktiken zu rechnen.

Es würde mich nicht überraschen, wenn das ServiceNow CSDM in den kommenden Jahren weiter ausgebaut wird, sodass es auch Enterprise Service Management (ESM), Customer Service Management (CSM), Field Service Management (FSM) und Customer Relation Management (CRM) abdeckt.

**Ein Implementierungs- und Integrationsszenario für CSDM 5**

Das folgende Diagramm habe ich erstellt, um zu veranschaulichen, wie sich das ServiceNow Common Service Data Model (CSDM 5) in Verbindung mit ITSM-Prozessen – konkret Incident, Problem und Change Management – sowie mit ITAM (Asset Management) in ServiceNow anwenden lässt. In diesem Modell gilt:  

  
-   ITSM-Prozessartefakte sind stets mit einem **Technical Service Offering** verknüpft, zusammen mit **Foundation-Daten** wie Anrufer, Standort und Assignment Group.
  
-   Je nach Art des Service Offering können zusätzliche Referenzen auf eine Service Instance, eine Dynamic CI Group oder ein Service Delivery Network Item erfasst werden.
  

  
Um Genauigkeit und Skalierbarkeit sicherzustellen, setzt das empfohlene Modell eine **Zero-Touch-CMDB** voraus, in der Configuration Items (CIs), Assets und ihre Abhängigkeiten automatisch erkannt oder föderiert werden – ohne manuelle Eingriffe in ServiceNow. Bis zum Ende dieses Jahrzehnts erwarte ich, dass viele Informationen zum Service Delivery Network von **KI-Agents** bereitgestellt werden, die die heute eingesetzten traditionellen täglichen Discovery- und Federation-Mechanismen nach und nach ersetzen und/oder anreichern – **wodurch die Zero-Touch-CMDB zu einer präzisen virtuellen Echtzeit-Datenquelle wird.**

Die meisten Unternehmen nutzen bereits heute Request Management innerhalb der CSDM-Domäne **Service Delivery**. Die Domäne **Service Consumption** ist dagegen noch weitgehend unerschlossen. Mit der Weiterentwicklung von IT4IT zu IT4ESM (IT for **Enterprise Service Management**) wird die Domäne Service Consumption zunehmend an Bedeutung gewinnen. Sie wird es ermöglichen, **Business Services** und **Business Service Offerings** nicht nur mit Employee Requests und Cases zu verknüpfen, sondern auch mit KI-Agents, die Bereiche wie IT, HR, Workplace Facilities, Finance, Legal, Risk, Business Continuity, Compliance und Security Management bedienen.

**Quellen:**  

  
-   ServiceNow, „[Common Service Data Model (CSDM) 5 White Paper“](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf)
  
-   ServiceNow „[CSDM Documentation Portal“](https://csdm.servicenow.com)
  
-   The Open Group [IT4IT Standard, Version 3.0.1](https://pubs.opengroup.org/it4it/3.0.1/standard/)
  
-   TBM Council [Technology Business Management (TBM) Taxonomy 4.0](https://higherlogicdownload.s3.amazonaws.com/TBMCOUNCIL/c15d372f-9951-46c8-9c3f-213c696401b6/UploadedImages/TBM_Taxonomy_V4_0.pdf) (PDF)
  

![](/wp-content/uploads/2025/05/CSDM_5_final_may_2025-scaled.png)
