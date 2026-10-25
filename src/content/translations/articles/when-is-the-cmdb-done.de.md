---
title: "Wann ist die CMDB „fertig“?"
excerpt: "Eine CMDB ist traditionell ein Inventar der IT-Assets eines Unternehmens, einschließlich ihrer Merkmale und Abhängigkeiten. Manche sagen, eine CMDB sei „fertig“, wenn alle IT-Assets und ihre Abhängigkeiten erfasst sind und gepflegt werden. Das ist jedoch nicht richtig. Selbst in"
source: "190cd16695a9c40f"
---

Eine CMDB ist traditionell ein Inventar der IT-Assets eines Unternehmens, einschließlich ihrer Merkmale und Abhängigkeiten. Manche sagen, eine CMDB sei „fertig“, wenn alle IT-Assets und ihre Abhängigkeiten erfasst sind und gepflegt werden. Das ist jedoch nicht richtig. Selbst früher hat man nicht alles, was existiert, in der CMDB erfasst. Heute sind Assets kurzlebig, elastisch und feingranular geworden, sodass es unmöglich ist, sie in Echtzeit nachzuverfolgen.

Die CMDB ist heute ein Repository relevanter, stabiler Assets einschließlich ihrer Attribute und Abhängigkeiten. Ihr Inhalt stammt aus vertrauenswürdigen Datenquellen, Element-Managern und automatisierter Discovery. Ihr Zweck hat sich von einem Inventar hin zu einer führenden Informationsquelle für das Lifecycle-Management und die automatisierte Risiko- und Auswirkungsanalyse erweitert.

Die CMDB existiert neben DevSecOps-CI/CD-, Observability- und Orchestrierungstools, die zunehmend feingranulare IT-Assets in Echtzeit verwalten und nachverfolgen. Einige IT-Practices nutzen Daten aus der CMDB, während andere direkt mit DevSecOps-Tools interagieren. Zunehmend befinden sich die Assets, zu denen Unternehmen Risiken und Compliance erfassen, in der CMDB. Manche Unternehmen erfassen auch ihre Business- und Architekturartefakte (z. B. Geschäftsprozesse, Capabilities, Anwendungen, Informationsobjekte und Abhängigkeiten) in ihrer CMDB. Auch Ziele, Initiativen, Projekte, Budgets, Themes und Epics können in der CMDB gespeichert werden. Obwohl Infrastruktur zunehmend als (Cloud-)Service beschafft bzw. bereitgestellt wird, dient die CMDB für viele Unternehmen nach wie vor als primäres Inventar für beschaffte Assets. IT-Management und OT-Management verschmelzen zum Technologiemanagement.

> **Derzeit gibt es keine einheitliche, universelle Marktstandard-Definition einer CMDB oder dessen, was sie enthalten sollte. Jede der führenden Practices (z. B. TOGAF, IT4IT, ITIL, ISO 85K/27K usw.) verwendet ihre eigene Definition und Sprache. Die zu unterstützenden Use Cases bestimmen, was in der CMDB erfasst werden muss, und das ist von Unternehmen zu Unternehmen unterschiedlich.**

Es ist sehr wahrscheinlich, dass **noch vor Ende dieses Jahrzehnts** jede Management-Practice einen Teil des Technologie-Ökosystems eines Unternehmens erfassen und pflegen und diese Informationen KI-Systemen bzw. -Agenten zur Verfügung stellen wird, die sie korrelieren, abgleichen und nutzen. Die traditionelle CMDB wird sich zu einem breiteren Ökosystem aus Design-Time- und Run-Time-Artefakten entwickeln, das verschiedene Arten von Interaktionen und Abläufen unterstützt. Der Erfolg dieses Ökosystems wird von der Governance der Abhängigkeiten und Überschneidungen zwischen den verschiedenen Practices abhängen.

**Vorerst** betrachte ich die CMDB als das Repository all dessen, was relevant, stabil und erkennbar ist, und das verschiedene Use Cases über Management-Practices hinweg ermöglicht. Die CMDB sollte (automatisierte) Antworten auf Fragen wie diese liefern können:

-   Wer und was kann betroffen sein, wenn (etwas in/an) diesem Element ausfällt?
-   Wenn Abonnenten Probleme mit diesem Angebot haben, was könnte defekt sein?
-   Wenn dieses Produkt (bzw. diese Version davon) nicht mehr unterstützt wird, wie viel wovon müssen wir ersetzen bzw. aktualisieren, und wer ist betroffen?
-   Welche Lösungen anderer haben Schnittstellen zu meinen Lösungen? Wer sind meine Stakeholder?
-   Wer sollte sich um diese erkannte Schwachstelle an jenem Element kümmern?
-   Wie viele davon haben wir, und wo befinden sie sich?
-   Für wie viele Lizenzen dieses Produkts sollte ich bezahlen?
-   Wofür wird dieses Element genutzt, von wem, und wer pflegt es bzw. ist dessen Owner?
-   Was wurde seit gestern erstellt, geändert oder entfernt, das relevant ist?
-   Von welchen Changes war dieses Element betroffen?
-   Wie viele Incidents wurden in diesem Monat zu diesem Element erfasst?
-   Wie viele offene Schwachstellen gibt es bei diesem Element?
-   Welche Elemente welchen Typs besitzt bzw. verwaltet dieses Team?

### Die CMDB ist „fertig“, wenn die vorgesehene Zielgruppe die korrekten, vollständigen und relevanten Antworten auf die oben genannten Fragen in der CMDB finden kann

Die Schlüsselbegriffe dabei sind Datenqualität und Relevanz, d. h.:

-   Keine Duplikate, es sei denn, es gibt verschiedene Elemente mit demselben Namen.
-   Die Attributwerte und Beziehungen der Elemente sind befüllt, und der Inhalt ist korrekt; sie bilden die Realität ab.
-   Abdeckung: Alle Elemente im Scope sind erfasst.
-   Wenn mehrere Quellen dasselbe Element liefern, aktualisiert die relevanteste Quelle das Element in der CMDB.
-   Irrelevante feingranulare Details werden in Antworten auf grobgranulare Fragen ausgeblendet.
-   Die CMDB sollte vertikale Stacks enthalten – vom Service bzw. von der Lösung über deren Instanzen bis hin zur zugrunde liegenden Technologie, von der sie abhängen.
-   Die CMDB sollte horizontale Abhängigkeiten zwischen Elementen enthalten, die voneinander abhängen (oder Schnittstellen zueinander haben).
-   Elemente, die nur wenige Minuten oder Stunden existieren, gehören nicht in die CMDB; sie werden in DevSecOps-Tools erfasst und gesteuert.

In den folgenden beispielhaften Situationen ist die CMDB eindeutig nicht richtig „fertig“:

-   Sie finden eine Schwachstelle, können aber nicht automatisch ermitteln, welchem Team sie zugewiesen werden muss.
-   Sie möchten einen Server aktualisieren, wissen aber nicht, wer über die möglichen Auswirkungen informiert werden muss.
-   In der Produktion wurde eine Maschine erstellt, aber Sie können nicht herausfinden, wofür sie genutzt wird.
-   Eine Datenbank meldet, dass sie beschädigt ist, aber Sie wissen nicht, welche Anwendungen auf Daten in dieser Datenbank zugreifen.
-   Ihr Unternehmen hat eine Produktivanwendung, aber Sie wissen nicht, von welcher Technologie sie abhängt.
-   Ihre Schnittstelle funktioniert nicht mehr, weil das PKI-Zertifikat abgelaufen ist, aber Sie haben das nie kommen sehen.
-   Sie möchten die Infrastrukturkosten dem DevSecOps-Team zuordnen, können aber aus der CMDB nicht ermitteln, welches Team welche VMs nutzt.
-   Ihr Anbieter teilt Ihnen mit, dass Sie dreimal so viele lizenzierte Deployments haben, wie Sie in der CMDB erfasst haben.
-   Jemand hat eine Firewall-Einstellung geändert und dadurch eine unbemerkte Sicherheitsverletzung verursacht.
-   Ihr Anbieter teilt Ihnen mit, dass Version 2016 ab dem 1. Januar nicht mehr unterstützt wird, aber Sie haben keine Ahnung, welche Auswirkungen das haben könnte.
-   Sie haben ein Projekt, um alle Telefone zu ersetzen, die älter als drei Jahre sind, wissen aber nicht, wo sie sich befinden oder wer sie nutzt.
-   Ihr Auditor teilt Ihnen mit, dass Sie nicht SOX-, SOC2-, DORA- und NIS2-konform sind.
-   Die ITSM-Community beklagt sich, dass sie ihre Incidents bzw. Changes nicht mit einigen der betroffenen Offerings, Instanzen oder CIs verknüpfen kann.
-   Wenn einem erheblichen Teil der Anwendungen die Infrastrukturabhängigkeiten fehlen.  
    

## Wie bekommt man das richtig hin?

-   **Planen Sie, bevor Sie beginnen**

-   Holen Sie sich die Unterstützung der Geschäftsleitung (C-Level) für Ihr Vorhaben (ohne deren Unterstützung: gehen Sie lieber Golf spielen …)
-   Übernehmen bzw. nutzen Sie Marktstandard-Datenmodelle wie TBM, CSDM usw.
-   Definieren Sie, was Sie benötigen, woher Sie es bekommen und über welchen Mechanismus
-   Schaffen und verwalten Sie die Voraussetzungen
-   Dokumentieren Sie Stakeholder, Teams sowie Service- und Product Owner.
-   Definieren und vereinbaren Sie eine Roadmap für CMDB-Integrationen und pflegen Sie sie.

-   **Definieren und pflegen Sie die grundlegenden Daten**

-   Beziehen Sie Benutzer- und Organisationsdaten aus HR/IAM, vorzugsweise über eine Schnittstelle
-   Beziehen Sie Lieferanten-, Kunden- und Vertragsdaten aus dem ERP, vorzugsweise über eine Schnittstelle
-   Autorisieren Sie den Zugriff auf Ihre Daten über Identity & Access Management (IAM)

-   **Steigern bzw. erhalten Sie das Bewusstsein für die CMDB und ihre Daten.**

-   Richten Sie einen digitalen Speicher bzw. eine Wissensdatenbank ein, in der Mitarbeitende Informationen finden können
-   Vermitteln Sie die Konzepte und Marktstandards
-   Teilen und pflegen Sie das Datenmodell
-   Pflegen Sie die technische Dokumentation

-   Technische Integrationen
-   Reconciliation-Einstellungen

-   Veröffentlichen Sie Erfolge und Nutzen

-   **Implementieren Sie das Technologie-Produkt- bzw. Serviceportfolio (und dessen Management)**
    

-   Definieren Sie Vorlagen für (zu erfassende) Lösungen bzw. Services
    
-   Schulen Sie die Owner darin, wie und wo sie ihre Lösungen bzw. Services erfassen und pflegen
-   Lassen Sie die Owner ihre Lösungen bzw. Services einschließlich Bewertungen definieren
-   Stellen Sie sicher, dass alle Anwendungen, Services und Offerings einen Owner haben.

-   **Definieren, steuern, auditieren und verbessern Sie die Prozesse**

-   Benennen Sie einen verantwortlichen Process Owner.
-   Richten Sie ein Process Council unter dem Vorsitz des Process Owners ein.
-   Definieren Sie Prozess, Rollen, RACIs, Arbeitsanweisungen, FAQs, QRCs und Schulungsmaterial
-   Weisen Sie Personen Prozessrollen zu und schulen bzw. zertifizieren Sie sie
-   Definieren und implementieren Sie Governance-Gremien (Steering Committees, Eskalationswege usw.)
-   Coachen Sie die Prozessorganisation in den ersten Monaten nach dem Go-live

-   **Automatisieren Sie die Befüllung und Aktualisierung des erkennbaren Teils der CMDB**

-   Liefern Sie Integrationen gemäß der vereinbarten Roadmap
-   Sammeln Sie Informationen aus mehreren Quellen und gleichen Sie sie ab, bevor Sie sie in die CMDB einfügen.
-   Nutzen Sie Out-of-the-Box-Integrationen statt selbst entwickelter Anpassungen
-   Verknüpfen Sie erkennbare Inhalte nach Möglichkeit automatisch mit physischen CIs
-   Verknüpfen Sie erkennbare Inhalte nach Möglichkeit automatisch mit Instanzen des angebotenen Service

-   **Erfassen Sie Büros, Rechenzentren, Standorte, Racks und die darin befindlichen physischen Geräte**

-   Definieren Sie die IAAS-/DCAAS-Services einschließlich ihrer Commitments, Subscriptions und Ownership
-   Erfassen Sie die physischen Assets einschließlich ihrer Standorte und ihrer Benutzer bzw. Konsumenten
-   Verknüpfen Sie die physischen Assets mit operativen CIs und umgekehrt
-   Generieren Sie Service-Instanzen und verknüpfen Sie sie mit den angebotenen IAAS-/DCAAS-Services
-   Implementieren Sie den Asset-Management-Prozess einschließlich seiner Schnittstellen zu den Prozessen Beschaffung, Recht und Finanzbuchhaltung
-   Implementieren Sie einen periodischen Audit- und Verifizierungsprozess für Assets.
-   Stellen Sie sicher, dass alle Assets einen gültigen Owner haben.
