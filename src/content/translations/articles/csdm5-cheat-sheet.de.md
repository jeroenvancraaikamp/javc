---
title: "CSDM5 Cheat Sheet"
excerpt: "CSDM5 ist ein Datenmodell, das immer wieder zu interessanten Diskussionen führt, weil jede Persona es aus ihrer eigenen Perspektive betrachtet. Dieses Cheat Sheet soll dabei helfen, was wohin gehört, wenn man sich an die CSDM5-Definitionen bzw. -Intentionen der verschiedenen Artefakte hält."
source: "b9918cf4d921fb88"
---

CSDM5 ist ein Datenmodell, das immer wieder zu interessanten Diskussionen führt, weil jede Persona es aus ihrer eigenen Perspektive betrachtet. Dieses Cheat Sheet soll dabei helfen, was wohin gehört, wenn man sich an die CSDM5-Definitionen bzw. -Intentionen der verschiedenen Artefakte hält. Tut man das, besteht kaum oder gar kein Bedarf, die Tabellen oder die Beziehungen zwischen den Tabellen anzupassen.  
  
In diesem gesamten Cheat Sheet gelten die folgenden Definitionen bzw. Prinzipien::  

-   Baselines sind Portfolio-Items, die entworfen, beschafft oder entwickelt und in Katalogen dokumentiert werden, z. B. ein „Volvo V70“.  
    Instanzen sind Configuration Items, die bereitgestellt/geliefert werden, z. B. genau dieser eine Volvo V70 mit dem Kennzeichen XX-YYY-ZZ.
-   Jedes Baseline-Portfolio-Item hat genau einen Business Owner/Lead und genau einen Technical Owner/Lead.  
    Alle CMDB-Instanzen gehören dem Owner des Baseline-Portfolio-Items, das die jeweilige Instanz enthält.
-   Eine „Contains::Contained by“-Beziehung ist eine 1-zu-n-Beziehung zwischen einem übergeordneten und einem untergeordneten Item.  
    Ein übergeordnetes Item kann mehrere untergeordnete Items enthalten, ein untergeordnetes Item darf jedoch nicht in mehreren übergeordneten Items enthalten sein.
-   Eine „Depends on::Depended on by“-Beziehung ist eine n-zu-m-Beziehung zwischen einem übergeordneten Item und untergeordneten Items.  
    Ein übergeordnetes Item kann von vielen untergeordneten Items abhängen, und ein untergeordnetes Item kann von vielen übergeordneten Items abhängig sein.

![](/wp-content/uploads/2026/02/CSDM5_including_rlation_labels.png)

### Business Application (APM-Baseline)

-   Grobgranulare Lösung, die als Ganzes gemanagt wird
-   Kann Teil einer (domänenübergreifenden) Application Platform sein
-   Ermöglicht null oder mehr Business Capabilities
-   Enthält null oder mehr Application Components
-   Hängt von null oder mehr Service Instances ab
-   Hat einen Business Owner (z. B. einen Tribe Lead)
-   Hat einen Technical/IT Owner (z. B. einen Tech Lead)
-   Hat ein CIAP-Rating und ein Risikoprofil, die beide regelmäßig überprüft werden
-   Wird von einer Domain architektonisch verantwortet (geleitet von einem Domain Architect)

### Application Component (DevSecOps-Baseline)

-   Feingranulare, versionierte digitale Produktkomponente
-   Abgelegt in einem Source-Code-Management-Repository (SCM/IaC)
-   Über CI/CD-Pipelines deploybar
-   Teil genau einer Business Application
-   Enthält null oder mehr Service Instances

### Service Instance (SPM-Instanz)

-   Wird entweder für Development, Test, Acceptance oder Production verwendet
-   Ist in genau einem Technical Management Service Offering enthalten
-   Ein oder mehrere Business Service Offerings hängen von ihr ab
-   Eine oder mehrere Business Applications hängen von ihr ab
-   Hängt von einem oder mehreren Configuration Items ab
-   Kann einer anderen Service Instance untergeordnet sein

### Dynamic CI Group (SPM-Instanz)

-   Dient zur Gruppierung gleichartiger Infrastruktur-CIs, die als Gruppe geändert/aktualisiert werden
-   Immer in genau einem Technical Management Service Offering „Contained by“
-   Verweist auf ein oder mehrere Configuration Items (abfragebasierter Snapshot)
-   Kann nicht mit einer Service Instance oder einer anderen Dynamic CI Group in Beziehung gesetzt werden
-   Ist (in einer eigenen Klasse) ebenfalls in der Service-Instance-Tabelle enthalten

### Service Delivery System, auch Config Item genannt (CMDB-Instanz)

-   ist eine eindeutige, per Discovery erfassbare Installation/Bereitstellung eines digitalen Produkts (Baseline)
-   ist stabil und hat einen sinnvollen Lebenszyklus (d. h. kein kurzlebiges Laufzeitartefakt)
-   kann eine per Discovery erfasste Instanz einer Application Component sein
-   kann mit null oder mehr Configuration Items in Beziehung stehen (verschiedene Beziehungstypen)
-   eine oder mehrere Service Instances können von ihm abhängen
-   kann mit einem beschafften Asset in Beziehung stehen
-   darf nur per Discovery/Federation angelegt/aktualisiert werden, nicht durch Menschen
-   erbt gemanagte Attribute von dem Portfolio-Item, das dieses CI enthält

### Business Service (SPM-Baseline)

-   ist ein definierter Service (in einem Business-/Vertriebskatalog)
-   wird von internen und/oder externen Business-Anwendern genutzt
-   ist übergeordnet zu einem oder mehreren Business Service Offerings
-   ist ein Blatt unter genau einem Knoten/Zweig der Service-Taxonomie

### Business Service Offering (SPM-Baseline)

-   Ist einem (übergeordneten) Service untergeordnet
-   Ist produkt- und/oder regionsspezifisch
-   Hat spezifische Zusagen (SLAs)
-   Hat spezifische Subscriptions/Subscriber
-   Enthält null oder mehr Service Instances
-   Enthält null oder mehr Dynamic CI Groups
-   Wird FUNKTIONAL von einer Support Group unterstützt
-   Wird von einer Change Group geändert
-   Erhält Request-/Change-Genehmigungen von einer Approval Group

### Technical Management Service (SPM-Baseline)

-   ist ein definierter Service (in einem technischen Katalog)
-   wird von einem oder mehreren Technology Teams und/oder DevSecOps-Teams genutzt
-   ist übergeordnet zu einem oder mehreren Technology Management Service Offerings
-   ist ein Blatt unter genau einem Knoten/Zweig der Service-Taxonomie

### Technical Management Service Offering (SPM-Baseline)

-   Ist einem (übergeordneten) Service untergeordnet
-   Ist produkt- und/oder regionsspezifisch
-   Hat spezifische Zusagen (z. B. OLAs, UCs, RTO, RPO usw.)
-   Hat spezifische Subscriptions/Subscriber
-   Enthält null oder mehr Service Instances oder Dynamic CI Groups
-   Wird TECHNISCH von einer Support Group unterstützt
-   Wird von einer Change Group geändert
-   Erhält Request-/Change-Genehmigungen von einer Approval Group

### Hardware Asset (ITAM-Instanz)

-   ist ein beschafftes Item, das gelagert oder installiert ist bzw. war
-   wird von einem Hersteller produziert
-   wird (zu einem bestimmten Datum) von einem Lieferanten bereitgestellt
-   ist bis zum Ende der Garantiezeit durch die Garantie abgedeckt
-   kann durch einen Wartungsvertrag abgedeckt sein
-   kann eine Instanz eines Product Model sein
-   hat einen Installationsstatus und einen Standort, an dem es zu finden ist
-   kann mit einem per Discovery/Federation erfassten Configuration Item in Beziehung stehen

### **Hinweise/Tipps:**

-   Service Instances aus dem Service Portfolio Management (SPM) verknüpfen bzw. mappen die per Discovery erfassten CMDB-CI-Instanzen mit den Baselines, die von diesen CMDB-Instanzen abhängen.  
    Idealerweise werden SPM-Instanzen und ihre Beziehungen automatisch angelegt/aktualisiert, und zwar auf Basis der im CI verfügbaren Informationen oder eines SVCN-Tags am CI.
-   ChatGPT und manche Leute, die sich als CSDM-Experten bezeichnen, empfehlen, umgebungsspezifische Technical Management Service Offerings anzulegen. Da eine umgebungsspezifische Service Instance jedoch nur in genau einem Technical Management Service Offering enthalten sein kann, führt dies schnell zu Duplikaten.
-   Unternehmen, die zwischen funktionaler und technischer Wartung unterscheiden, können Business Service Offerings für die Gruppe anlegen, die den funktionalen Support leistet, und Technical Management Offerings für die Gruppe, die den TECHNISCHEN Support leistet. Verknüpfen Sie beide über die Service Instance, die zwischen ihnen liegt.
-   Wenn Sie für dieselbe Anwendung unterschiedliche Offerings für unterschiedliche technische Support-Level definieren, werden Sie feststellen, dass Sie keine „contains::contained by“-Beziehungen von mehreren technischen Offerings zu derselben Service Instance „Application X, Production“ anlegen können. Die „contains“-Beziehung durch mehrere „depends on“-Beziehungen zu ersetzen, ist nicht empfehlenswert, da dann nicht mehr automatisch ermittelt werden kann, welches Offering gilt, wenn „Application X, Production“ ausfällt.
-   Wenn Sie zwei Teams haben, von denen sich eines um die EMEA-Instanz und eines um die NAM-Instanz einer Business Application kümmert, können Sie technisch gesehen verschiedene Service Instances anlegen: eine für die EMEA-Instanz und eine für die NAM-Instanz, selbst wenn es sich um dieselbe SaaS-Anwendung handelt. Für jedes Team sollte dann ein eigenes Service Offering mit eigenen Zusagen und Subscriptions angelegt werden. Bitte beachten Sie: Die Service-Performance wird auf Offering-Ebene erfasst, nicht auf Ebene der Service Instance. Beachten Sie außerdem: Wenn eine „Instanz“ als ausgefallen gemeldet wird, bedeutet das nicht, dass die andere Instanz automatisch ebenfalls als ausgefallen gemeldet wird.
-   Aufgrund der oben genannten Einschränkungen empfehle ich, pro SaaS-Instanz eine Service Instance anzulegen und diese in genau einem Technical Management Service Offering zu führen. Zusätzlich können Sie mehrere Business Service Offerings anlegen, die (N:M) von der Service Instance abhängen – ein Offering pro Region, jeweils mit eigenen Servicezeiten, Zusagen und Subscriptions. Die Service-Performance kann dann für das Business Offering erfasst werden, während Plattform-Performance und erkannte technische Probleme in dem (einen) Technical Service Offering erfasst werden können, das die Service Instance enthält.
-   Einige ServiceNow-Module durchlaufen nur Upstream-Beziehungen, um zu ermitteln, wer oder was betroffen ist. Deshalb setze ich den per Discovery erfassten Webservice bzw. die Datenbank immer direkt mit der Service Instance in Beziehung, die davon abhängt. Würde ich nur Server mit den Service Instances in Beziehung setzen, würde ein erkanntes Problem mit einem DBMS keinen Ausfall der Service Instance auslösen. Übertreiben Sie es dabei aber nicht, indem Sie z. B. alle auf einem Server installierten Softwarepakete mit der Service Instance verknüpfen. Setzen Sie nur das in Beziehung, was relevant ist.
