---
title: "Mit CSDM 5 über das Ziel hinausschießen?"
excerpt: "ServiceNow hat eine PowerPoint-Präsentation mit 132 Folien veröffentlicht, die anhand von Beispielen zeigt, wie man die IT-Landschaft gemäß CSDM 5 modellieren könnte. Obwohl ich CSDM im Allgemeinen sehr schätze, scheinen manche bei der Modellierung ihrer IT-Landschaft in ServiceNow über das Ziel hinauszuschießen. Nehmen wir"
source: "7d32fdda2aa10f19"
---

ServiceNow hat eine [**PowerPoint-Präsentation mit 132 Folien mit Beispielen**](https://learning.servicenow.com/nowcreate?id=nc_asset&asset_id=90b0eaca879dae106838fd16dabb3502&nc_source=copy_asset_link) veröffentlicht, die zeigt, wie man die IT-Landschaft gemäß CSDM 5 modellieren könnte. Obwohl ich CSDM im Allgemeinen sehr schätze, scheinen manche bei der Modellierung ihrer IT-Landschaft in ServiceNow über das Ziel hinauszuschießen. Nehmen wir ein Beispiel: **Wie man die ServiceNow-Plattform in CSDM 5 (nicht) modelliert.**

Die ServiceNow-Plattform wird von Unternehmen unterschiedlicher Art, Größe und Reife für unterschiedliche Zwecke, von unterschiedlichen Menschen und in unterschiedlichen Kulturen genutzt, die häufig mehrere Prozess-Frameworks verwenden. Das CSDM hilft, die Daten zu strukturieren und zu steuern, ist aber kein Modell nach dem Motto „One size fits all“. Zudem entwickelt sich das CSDM weiterhin. CSDM 5 ist bereits sehr viel besser als seine Vorgänger. Version 5 ist jedoch deutlich komplexer und lässt mehr Interpretationsspielraum als ihre Vorgänger von vor 4 bzw. 6 Jahren.

So gibt es in CSDM 5 nun Service-Portfolios (DPM), Taxonomy Nodes (DPM), Value Chains (Foundation), Projektportfolios (SPM), Business Units (Foundation) und Top-Level-Business-Capabilities (SPM). Jede Gruppe hat bzw. verwendet ihre eigenen Artefakte. Nicht jeder liest das CSDM-5-Whitepaper oder hält sich an die darin enthaltenen Definitionen und Empfehlungen. Fairerweise muss man sagen: CSDM lässt einiges an Interpretationsspielraum. Daher befüllen viele Unternehmen alle 6 Artefakte mit denselben Werten „HR“, „IT“, „Risk“, „Finance“, „Legal“, „Supply Chain“, „Marketing“, „Sales“ und „CRM“. Andere tragen in jedes der 6 Artefakte unterschiedliche Werte ein. Manche Organisationen wollen jede einzelne Ausnahme oder Vorliebe berücksichtigen, die irgendjemand haben könnte.

**Ich empfehle, Artefakte für ihren vorgesehenen Zweck zu verwenden, so viel wie möglich wiederzuverwenden und IT einfach zu halten.** Außerdem glaube ich an ein Schichtenmodell, in dem die Kunden Geschäfte mit dem Unternehmen machen, das Business (und seine Anwender) durch integrierte bzw. gemanagte Lösungen unterstützt wird und diese Lösungen wiederum durch standardisierte Technology Towers unterstützt werden.

Üblicherweise empfehle ich, zwischen einem Application Portfolio, einem Component Portfolio, einem Projekt-/Programmportfolio, einem Technical Service Portfolio und einem Business Service Portfolio zu unterscheiden. Alle Elemente in diesen Portfolios sollten mit den relevanten Foundation-Artefakten verknüpft sein, etwa Value Chains, Business Units, Abteilungen, Unternehmen, Regionen, Ländern, Standorten, Ownern und Gruppen, zu denen das Element gehört. Man kann von jedem Typ mehrere Portfolios anlegen, ich würde jedoch nicht empfehlen, jemals mehr als 6–8 Portfolios eines bestimmten Typs zu haben. Beispiele:

1.  Ein Application Portfolio für Business-Applikationen, eines für IT4IT-Applikationen/-Tools und eines für Desktop-/Mobile-Applikationen
2.  Ein Component Portfolio für PAAS-IT-Komponenten und eines für SDLC-IT-Komponenten
3.  Ein Technology Service Portfolio pro PAAS-/IAAS-Technology-Tower
4.  Ein Business Service Portfolio pro Business Unit
5.  Ein Projekt-/Programmportfolio pro Tribe oder Enterprise Domain

Unternehmen, die keine Services definiert haben, könnten damit beginnen, ihre Applikationen „als SAAS-Service“ bereitzustellen. Wenn diese SAAS-Services Commitments, Entitlements, Subscriptions und SLAs haben (werden), könnte man ein Service Offering pro Business-Applikation anlegen. Wenn Ihre Applikationen mehrere (umgebungs- bzw. standortspezifische) Offerings haben können, könnte man die Applikation als Service registrieren. Es wird nicht empfohlen, jede Desktop-/Mobile-Applikation „als Service“ zu registrieren.

Jeder Service im Service Portfolio gehört zu genau einem Taxonomy Node und hat genau einen verantwortlichen Service Owner (Accountable Service Owner). Das Business Service Portfolio sollte NICHT applikationsspezifisch sein (Applikationen gehören in das technische Application Portfolio). Beispiel: Workday befindet sich im Application (Service) Portfolio und „Employee Joiner, Mover & Leaver Support“ im Business Service Portfolio; beide sind mit der Workday Production Service Instance (CI) verknüpft.

Diese Prinzipien können meiner Meinung nach nicht plattformspezifisch sein und müssen unternehmensweit unterstützt und durchgesetzt werden, da sie die Grundlage für Governance und Organisation bilden.

## WIE SCHIESST MAN ÜBER DAS ZIEL HINAUS?

Im ServiceNow-Beispiel für ServiceNow gibt es einen Business-Application-Datensatz für die ServiceNow-Plattform. Diese ServiceNow-Plattform hostet mehrere einzelne Business-Applikationen. Philosophen mögen argumentieren, dass ServiceNow nur dann eine Business-Applikation ist, wenn sie vom Business für das Business genutzt wird. Ich bin kein Philosoph. Ich bin der Ansicht, dass ServiceNow-Applikationen gehostete Lösungen sind, die von Business-Anwendern genutzt werden, was die Anlage einer Business Application, eines Business Service und von Business Service Offerings dafür rechtfertigt.

Abgesehen davon sollten Business Capabilities meiner Meinung nach genau das sein. „Manage Technology“ ist meiner Meinung nach zum Beispiel keine Business Capability. Denken Sie daran: Business Capabilities gehören in CSDM 5 zur Domäne „Design and Planning“; sie sollen Aufschluss darüber geben, welche Business-Applikation wofür genutzt wird, ohne dabei über das Ziel hinauszuschießen. Bei jeder Business-Applikation würde ich erwarten, dass sie eine Handvoll Business Capabilities unterstützt. Ebenso würde ich erwarten, dass eine Business Capability im Durchschnitt von einer Handvoll Business-Applikationen bereitgestellt wird. Wenn jede Business-Applikation zwei Dutzend Business Capabilities ermöglicht oder die Mehrheit der Business Capabilities nur von einer einzigen Applikation bereitgestellt wird, sind Sie vermutlich über das Ziel hinausgeschossen.

„SN Incident Mgmt“ als Business-Applikation zu modellieren, kann meiner Meinung nach leicht bedeuten, über das Ziel hinauszuschießen, denn die ServiceNow-Plattform ermöglicht etwa 200 einzigartige Capabilities ähnlich wie „SN Incident Mgmt“. Würde man für jede dieser Business-Applikationen umgebungsspezifische Service Instances anlegen, kämen 800 Service Instances zusammen. Jede dieser 800 muss eine Beziehung zu einer „Yokohama“-Instanz der Plattform erhalten. Selbst wenn Sie nicht alle ServiceNow-Applikationen nutzen, ist es meiner Meinung nach wirklich keine gute Idee, einzelne ServiceNow-Capabilities als Business-Applikationen zu modellieren.

Ein Business Service ist eine erkennbare Sammlung von Service Offerings. Den Business Service „End User Service“ würde ich nicht als einen von der ServiceNow-Plattform bereitgestellten Service erwarten. Das Service Offering „SN Incident Mgmt“ würde ich nicht als etwas erwarten, das „als Service“ bereitgestellt wird. Ebenso würde ich erwarten, dass „System Monitoring“ mit Observability in Beziehung steht, nicht aber mit ServiceNow.

Wenn Sie mir nicht glauben, dürfen Sie dieses Modell gerne in ServiceNow umsetzen, einschließlich aller Artefakte und aller Beziehungen. Bitten Sie anschließend die Auditoren und Compliance Officers, Ihre HLDs, DLDs, Roadmaps, OKRs und BIAs/CIAs für jede Ihrer „Applikationen“ zu prüfen. Stellen Sie dann einen Ressourcenantrag, um alle Compliance-Feststellungen zu beheben. Und bitten Sie danach einen typischen, ungeschulten Business-Anwender, ein Ticket zu erstellen, dass „Incidents zu Workday der falschen Gruppe zugewiesen werden“.

## WIE GEHT ES 40–60 % EFFIZIENTER?

Die verschiedenen Portfolios würden wie im Abschnitt zu den Grundlagen beschrieben eingerichtet.

Angenommen, Innovation und Wartung der ServiceNow-Plattform erfolgen in ServiceNow selbst, dann würde ich Folgendes registrieren:

-   Ein Programm für die ServiceNow-Plattform (oder je eines für IT, HR usw., je nachdem, wer was finanziert)
-   Ein Demand/eine Initiative pro Objective & Key Result
-   Ein Projekt pro genehmigtem Demand/genehmigter Initiative, der bzw. die Budget/einen Business Case erfordert
-   So viele User Stories pro Projekt bzw. Produkt wie nötig
-   Ein Agile-DevOps-Produkt pro ServiceNow-Applikation (siehe unten)
-   Eine Gruppe/ein Agile Board pro DevOps-Team

Die CSDM-Artefakte für die gesamte ServiceNow-Plattform würde ich auf folgender Grundlage modellieren:

### 

-   Foundation (in Grau)

-   16 Out-of-the-Box-**Value-Chains**
-   Ein **Product Feature** pro ServiceNow-Feature (CMDB, Portal, Mobile App, Virtual Agent, Workspace usw.)
-   Ein **Business-Prozes**s pro Prozess, der durch ServiceNow ermöglicht wird (z. B. INC, PRB, CHG, REQ)
-   Ein **Gebäude/Standor**t für das Rechenzentrum
-   Eine **Gruppe**, die Changes an ServiceNow unterstützt, durchführt, managt und genehmigt
-   Ein **User** des **Unternehmens,** der Owner der Service-Plattform und ihrer Services/Offerings ist, sowie ein User für jedes Mitglied der Gruppe
-   Ein **Product Model** pro gleichartigem Hardware-/Softwareprodukt

### 

-   Design & Planning (in Blau)

-   Eine **Business** **Capability** pro ServiceNow-Applikation (z. B. ITSM, ITAM, ITOM, CSM usw.)
-   Eine **Business Application** für die ServiceNow-Plattform

### 

-   Design & Build (in Rot)

-   Eine **SDLC-Komponen**te für den JAVA-MID-Server für Windows und eine pro entwickeltem AI Agent (zukünftig)

### 

-   Service Delivery (Orange)

-   Ein **Technical/Business Service** für Enterprise Service Management (je nachdem, ob ServiceNow für das Business oder für Technologie genutzt wird)
-   Ein **Technical/Business Service Offering** für die ServiceNow-Plattform (unter der Annahme, dass nur ein Team daran arbeitet)
-   Ein **Technical Service Offering** für jeden IAAS-/PAAS-Elementtyp, der als Service angeboten wird
-   Eine (Application) **Service Instance** (cmbd\_ci\_service\_auto) pro bereitgestellter ServiceNow-Instanz
-   Eine **Application** (cmdb\_ci\_app) pro Instanz der MID-Server-App
-   Ein **JAVA Server** (cmdb\_ci\_app\_server\_java), installiert auf einem Windows-Server, der die Non-Prod-MID-Server-Apps hostet, und einer für die Non-Prod-MID-Server-Apps.
-   Ein **Windows-/Linux-Server** für die Non-Prod-MID-Server-Apps (Server) und einer für die Prod-MID-Server-Apps (Server)
-   Eine **Virtual Machine** pro Windows-/Linux-Server
-   Ein **Azure Data Center**, in dem die Windows-/Linux-VMs gehostet werden

### 

-   Service Consumption (Grün)

-   Ein Request zur Beschaffung der Server, VMs usw.
-   Weitere Beispiele …

## Begründung:

1.  Incidents, Problems und Changes müssen meiner Meinung nach mit einem Service Offering verknüpft sein (das festlegt, wer das Offering unterstützt) und optional mit dem betroffenen Configuration Item, das vermutlich defekt ist (das festlegt, was gegebenenfalls repariert werden muss). Manche Owner der ServiceNow-Plattform bzw. -Prozesse erlauben, dass aus einem Incident auf einige der Foundation-Daten (z. B. Standort, Unternehmen, BU, Product Feature, Business-Prozess) verwiesen wird.
2.  Ich empfehle, eine Service Instance pro ServiceNow-Instanz zu registrieren. Obwohl ich weiß, dass Unternehmen bei ServiceNow Lizenzen für ITAM-, ITOM- und ITSM-Applikationen beschaffen, und obwohl ich weiß, dass ServiceNow OOTB ein Platform Host ist, modelliere ich die ServiceNow-Applikationen in ServiceNow nicht als solche. Stattdessen registriere ich die Applikationen als Capabilities, da ServiceNow Dutzende von Application Capabilities bietet. Ich nehme in Kauf, dass ich dadurch kein Lifecycle Management für die einzelnen ServiceNow-Applikationen betreiben kann. Dafür kann ich jedoch die Business-Prozesse mit den Capabilities verknüpfen. Das Beste daran: All die oben genannten Baselines werden nur einmal registriert bzw. gepflegt, und wir müssen für die gesamte ServiceNow-Plattform nur ein BIA-/CIA-Review und ein periodisches externes Audit durchführen.
3.  In großen Unternehmen sind IT, HR, GRC, SECURITY, LEGAL und CSM typischerweise politische Silos. Ich empfehle, die Politik im Boardroom zu klären, aber niemals, wirklich niemals, getrennte Silos in ServiceNow abzubilden – es sei denn, es bestehen unterschiedliche ServiceNow-Verträge mit getrennten Instanzen und die Total Cost of Ownership ist für das Unternehmen kein wichtiger Faktor. In meinen fast 20 Jahren Arbeit mit ServiceNow habe ich keinen einzigen nach Domain/Instanz getrennten ServiceNow-Vertrag gesehen, der gut bzw. effizient funktioniert. Die meisten ServiceNow-Schnittstellen und -Datensätze sind nicht domänenspezifisch. Diejenigen, die es sind, lassen sich auch ohne Instanz- oder Domain-Separation absichern und managen.
4.  Der Service „Enterprise Service Management“ kann auch weitere Offerings enthalten, z. B. für die Plattformen Apptio, LeanIX oder MetricStream, wenn ESM auf mehrere Plattformen verteilt ist. Zudem ermöglicht dies mehrere ServiceNow-Plattformen innerhalb des Unternehmens (z. B. während der Zusammenführung mehrerer ServiceNow-Verträge).
5.  Nachdem ich mich mit der Zukunft von KI in ServiceNow und anderen KI-Plattformen befasst habe, bin ich der Ansicht, dass das unten dargestellte Bild für große Unternehmen am besten geeignet ist.
6.  Ich könnte die ServiceNow-Plugins als deploybare SDLC-Komponenten modellieren, aber warum selbst ein Repository mit Plugins pflegen, das bereits an anderer Stelle (auf eigene Kosten) von ServiceNow gepflegt wird? Gleiches gilt für die Apps aus dem ServiceNow Store. Ich halte es für ausreichend, die beschafften bzw. genutzten Business Capabilities der Plattform als solche zu registrieren und mit den Business-Prozessen zu verknüpfen, die sie ermöglichen bzw. unterstützen.
7.  Wenn Sie sich entscheiden, einen Teil der ServiceNow-Inhalte (periodisch oder nahezu in Echtzeit) in eine Datenbank bzw. einen Data Lake zu exportieren, damit andere diese Daten nutzen können, ohne die Performance von ServiceNow zu beeinträchtigen, müssen Sie auch die Datenbanken, die DBMS (bzw. Database Services) und die Tools modellieren, die die Daten aus ServiceNow in die Datenbank föderieren.
8.  Wie Sie vielleicht bemerkt haben, habe ich keine Versionen von ServiceNow-Produkten erfasst, weder für die Baselines noch für die Instanzen. Ich gehe davon aus, dass die ServiceNow-Instanzen upgegradet und nicht ersetzt werden. Während eines solchen Upgrades (das keine Monate dauern sollte) bleiben die Integrationen und Abhängigkeiten intakt. Wenn sich die Plattform-Capabilities bei einem Major-Upgrade drastisch ändern, fügen Sie sie während des Upgrades einfach hinzu bzw. entfernen oder aktualisieren Sie sie. Alles, was automatisch erkannt wird (z. B. Betriebssystem, JAVA-Server usw.), ist hingegen versioniert. Für einen Überblick darüber, was in welchem ServiceNow-Major-Release enthalten ist, empfehle ich die ServiceNow-Produktdokumentation und die Partner-Videos.

**Übrigens: Habe ich schon mein „Safe Harbor“-Statement erwähnt? :-)**

## ZUSAMMENFASSUNG

Es gibt mehrere Alternativen, ServiceNow unter Verwendung der Definitionen und Artefakte von CSDM 5 zu modellieren. Ich empfehle den effizientesten Weg, der noch zweckmäßig und für die Zielgruppe geeignet ist. Meiner Meinung nach ist das der Weg gemäß der Abbildung unten.

Ich habe in den letzten Jahrzehnten ein Dutzend ServiceNow-Plattformen (bzw. deren Governance) aufgesetzt und – ganz ehrlich – das nicht immer effizient getan, aber ich habe aus der Erfahrung gelernt.

Wenn Sie meiner Empfehlung folgen, werden Sie die Anzahl der gemanagten Elemente im Vergleich zum Beispiel von ServiceNow voraussichtlich um 40–60 % reduzieren (und den administrativen Aufwand für Registrierung, Review und Dokumentation der ServiceNow-Plattform verringern). Und ja, Sie werden den Lifecycle der einzelnen Apps in ServiceNow nicht erfassen können. Aber ist das schlimm, wenn es nur eine ServiceNow-Plattform mit einem Platform Owner gibt, deren Instanzen von mehreren Stakeholdern gemeinsam genutzt werden?

![](/wp-content/uploads/2025/06/How_to_model_servicenow_in_csdm_5-scaled.png)
