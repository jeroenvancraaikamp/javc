---
title: "CMDB vs. CSDM – Umfang und Zweck erklärt"
excerpt: "Obwohl CMDB und CSDM häufig synonym verwendet werden, erfüllen sie grundlegend unterschiedliche Zwecke. Die Verwechslung der beiden ist einer der Hauptgründe dafür, dass 75 % der CMDB-Initiativen scheitern. Was ist die CMDB? Die Configuration Management Database (CMDB) ist ein operativer Datenspeicher"
source: "615c94db809d7b2b"
---

Obwohl CMDB und CSDM häufig synonym verwendet werden, erfüllen sie grundlegend unterschiedliche Zwecke. **Die Verwechslung der beiden ist einer der Hauptgründe dafür, dass 75 % der CMDB-Initiativen scheitern.**

  

## Was ist die CMDB?

  
Die **Configuration Management Database (CMDB)** ist ein **operativer Datenspeicher**.  

### Umfang der CMDB

  
Die CMDB enthält:  

  
-   Bereitgestellte Configuration Items (CIs)
  
-   Laufzeitinstanzen und ihre technischen Beziehungen
  
-   Per Discovery erfasste und föderierte Infrastruktur- und Plattformkomponenten
  
-   Service-Instanzen und ihre Abhängigkeiten
  
-   Operative Attribute, die für ITSM-, ITOM-, SecOps- und Risiko-Use-Cases benötigt werden
  

  

### Merkmale der CMDB

  

  
-   Fokussiert auf die **Laufzeitrealität**
  
-   Wird primär durch **automatisierte Discovery und Integrationen** befüllt
  
-   Verändert sich kontinuierlich
  
-   Optimiert für **Betrieb, Impact-Analyse, Incident, Change und Risiko**
  
-   Nicht maßgeblich für Design-Time- oder Portfolio-Entscheidungen
  

  

> **Die CMDB beantwortet:** „Was läuft wo, und was hängt davon ab – genau jetzt?“

  

## Was ist CSDM?

  
Das **Common Service Data Model (CSDM)** ist ein **logisches Referenzmodell**.  

### Umfang von CSDM

  
CSDM legt fest:  

  
-   Welche Objekttypen es gibt (Applikationen, Services, Offerings, Instanzen, Produkte)
  
-   Wie diese Objekte zueinander in Beziehung stehen
  
-   Wo Ownership, Verantwortlichkeit und Zusagen verankert sind
  
-   Welche Artefakte im Portfolio verwaltet und welche zur Laufzeit per Discovery erfasst werden
  

  

### Merkmale von CSDM

  

  
-   Stabil und mit klaren Vorgaben
  
-   Von Grund auf servicezentriert
  
-   Unabhängig von Tools und Discovery-Methoden
  
-   Fokussiert auf **Governance, Konsistenz und gemeinsames Verständnis**
  
-   Auch über die CMDB hinaus anwendbar (APM, ITSM, IRM, TBM, EA)
  

  

> **CSDM beantwortet:** „Was *sollte* existieren, wie fügt es sich zusammen, und wer ist verantwortlich?“

  

## Der entscheidende Unterschied in einem Satz

  

> **CSDM definiert die Struktur und die Regeln; die CMDB enthält die Daten, die diesen Regeln entsprechen.**

  

## Vergleich des Umfangs

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Aspekt | CMDB | CSDM |
| --- | --- | --- |
| Art | Operativer Datenspeicher | Logisches Referenzmodell |
| Zweck | Operative Transparenz & Impact | Strukturelle Konsistenz & Governance |
| Fokus | Laufzeitrealität | Service- & Portfoliostruktur |
| Änderungshäufigkeit | Hoch (kontinuierlich) | Niedrig (bewusst) |
| Datenquelle | Discovery, Integrationen | Architektur- & Designprinzipien |
| Besitzt Daten | Nein (nutzt maßgebliche Quellen) | Nein (legt fest, wo Ownership liegt) |
| Zielgruppe | Ops, ITSM, SecOps | Architekten, Governance, Plattform-Teams |

  

  

## Was gehört wohin (Faustregel)

  

### Gehört in die CMDB

  

  
-   Service-Instanzen
  
-   Bereitgestellte Server, Container, Cloud-Ressourcen
  
-   Laufzeitabhängigkeiten
  
-   Per Discovery erfasste Software und Infrastruktur
  
-   Dynamische CI-Gruppen
  

  

### Durch CSDM definiert (aber in der CMDB instanziiert)

  

  
-   Business und Technical Applications
  
-   Business und Technology Services
  
-   Service Offerings
  
-   Muster für Service-Instanzen
  
-   Ownership- und Verantwortlichkeitsmodell
  

  

### Gehört *nicht* in die CMDB

  

  
-   Design-Time-Artefakte
  
-   CI/CD-Pipelines
  
-   Quellcode und Build-Metadaten
  
-   Flüchtige Laufzeitereignisse
  
-   Interna von DevSecOps-Tools
  

  

## Warum diese Unterscheidung wichtig ist

  
Wenn CMDB und CSDM vermischt werden:  

  
-   werden CMDBs aufgebläht und nicht mehr wartbar
  
-   verlieren Discovery-Daten ihren Kontext
  
-   wird Governance manuell und politisch
  
-   wehren sich DevOps-Teams gegen Integration
  
-   werden Audit-Nachweise inkonsistent
  

  
Wenn sie korrekt getrennt sind:  

  
-   wird Discovery sicher und skalierbar
  
-   ist die Service-Ownership klar
  
-   funktioniert die Impact-Analyse
  
-   fügen sich Risiko- und Compliance-Nachweise ganz natürlich zusammen
  
-   koexistieren DevSecOps und CMDB reibungslos
  

  

## Das moderne Betriebsmodell

  

  
-   **CSDM** liefert den stabilen, servicezentrierten Bauplan
  
-   **CMDB** liefert die dynamischen Laufzeitdaten
  
-   Discovery und Föderation halten beide in Einklang
  
-   Portfolio-Elemente werden verwaltet; Laufzeit-Elemente werden beobachtet
