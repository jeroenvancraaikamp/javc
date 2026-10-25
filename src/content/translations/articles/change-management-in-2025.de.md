---
title: "Change- und Drift-Management im Jahr 2025"
excerpt: "Trotz rasanter Fortschritte bei Cloud Computing, DevOps, Automatisierung und Infrastructure-as-Code ringen viele Organisationen noch immer mit einer grundlegenden Frage: Was genau ist im Jahr 2025 ein „Change“ – und was nicht? Muss jeder erkannte Drift über Change gesteuert werden? Fehlklassifizierung"
source: "c0521e5c78a2ac4a"
---

Trotz rasanter Fortschritte bei Cloud Computing, DevOps, Automatisierung und Infrastructure-as-Code ringen viele Organisationen noch immer mit einer grundlegenden Frage:

**Was genau ist im Jahr 2025 ein „Change“ – und was nicht? Muss jeder erkannte Drift über Change gesteuert werden?**

Fehlklassifizierung führt zu unnötigem Aufwand für Change Manager, zu Reibungsverlusten in den Engineering-Teams und zu weniger Klarheit im Betrieb. Gleichzeitig birgt zu wenig Governance inakzeptable Risiken. Modernes Change Management muss daher eine sorgfältige Balance zwischen Geschwindigkeit und Kontrolle finden, mit klaren Entscheidungskriterien arbeiten und jede Aktivität der passenden Governance- oder Technologiedomäne zuordnen. Dieser Artikel fasst aktuelle Best Practices zusammen und bietet praktische Orientierung für IT-Teams, Architekten und Verantwortliche im Betrieb.

## 1\. Der Kernzweck von Change Management ist unverändert

Change Management dient nach wie vor dazu,

-   Risiken vor Änderungen an der Produktion zu steuern und zu reduzieren
-   Transparenz, Koordination und Kommunikation sicherzustellen
-   Verantwortlichkeit und Nachvollziehbarkeit zu gewährleisten
-   die Stabilität geschäftskritischer Services zu schützen

Verändert hat sich das Umfeld, in dem diese Ziele erreicht werden müssen.  
Moderne Plattformen erzeugen täglich Tausende automatischer Anpassungen.  
Sie alle über das Change-Modul steuern zu wollen, ist weder machbar noch sinnvoll.

## 2\. Was ist ein Change?

Ein „Change“ ist jede geplante Änderung, die sich wesentlich auswirken kann auf:

-   das Verhalten von Services oder die User Experience
-   Produktionsdaten oder die Datenintegrität
-   die Stabilität oder Performance der Plattform
-   die Sicherheitslage oder die regulatorische Compliance
-   vernetzte Services oder technische Abhängigkeiten

Beispiele, die Change Management erfordern:

-   Änderungen an Funktionen oder Logik von Anwendungen
-   Änderungen an API-Verträgen
-   Aktualisierungen von Datenbankschemata
-   Änderungen an Netzwerk, Firewall, Routing oder DNS
-   Anpassungen von IAM-Rollen und -Policies
-   Upgrades von Infrastruktur oder Clustern
-   Änderungen an Sicherheitskontrollen oder Monitoring-Konfigurationen

Diese Aktivitäten bergen ein inhärentes Risiko und müssen einen kontrollierten Genehmigungsprozess durchlaufen.

## 3\. Was (nicht mehr) als Change gilt

Viele operative Tätigkeiten, die früher eine Genehmigung erforderten, erfüllen die Kriterien  
für Change Management nicht mehr. Dazu gehören:

-   Cloud-Elastizität und Autoscaling (Kubernetes HPA/VPA, VM-Autoscaling)
-   Ausführungen von CI/CD-Pipelines (Deployments über vorab genehmigte Muster)
-   erneutes Anwenden von IaC, wenn sich das Modell nicht geändert hat
-   Softwareverteilung auf Endgeräte über Intune, SCCM oder MDM
-   Wartungsereignisse des Cloud-Providers
-   Failover, Hochverfügbarkeit und Self-Healing
-   Signatur-Updates für Security-Tools
-   Laufzeitprozesse wie Indexierung oder Caching

Diese Aktivitäten werden durch Plattform-Policies und operative Frameworks gesteuert,  
nicht durch Change Management.

## 4\. Standard Changes: Geschwindigkeit mit Kontrolle

Standard Changes bieten einen strukturierten Weg, die Liefergeschwindigkeit zu erhöhen  
und dabei die Governance zu wahren. Ein Standard Change ist:

-   vorab genehmigt
-   dokumentiert
-   risikoarm
-   wiederholbar
-   häufig automatisiert

Typische Beispiele:

-   VM-Provisionierung über genehmigte Templates
-   routinemäßige Patch-Zyklen
-   automatisierte Zertifikatserneuerungen
-   CI/CD-Deployments über abgesicherte Pipelines

Das Muster einmal zu genehmigen, ist weitaus wirksamer, als jede einzelne Ausführung zu genehmigen.

## 5\. Governance: Was gehört wohin?

Entscheidend ist die klare Zuordnung von Informationen zum richtigen System of Record.

### Change Management

-   geplante, risikobehaftete Änderungen an der Produktion
-   Deployment-Pläne, Genehmigungen, Back-out-Pläne
-   Auswirkungsanalyse, betroffene Services, Zeitplanung

### CI/CD- & DevOps-Plattformen

-   Quellcode
-   Build- und Deployment-Logs
-   Pipeline-Definitionen
-   Testergebnisse und Scan-Resultate

### IaC & Konfigurationsautomatisierung

-   Definitionen des Desired State
-   Template-Aktualisierungen
-   Ausführungslogs
-   GitOps-Reconciliation

### CMDB & ITOM

-   tatsächlicher Laufzeitzustand
-   Service-Topologie und Abhängigkeiten
-   ermittelte Konfiguration

### Enterprise Architecture & Portfolio

-   Roadmaps
-   Standards und Muster
-   Abstimmung von Investitionen und Demand

Diese Trennung der Zuständigkeiten verbessert Nachvollziehbarkeit, Auditierbarkeit und Klarheit im Betrieb.

## 6\. Drift: ein operatives Signal, kein Change

Drift entsteht, wenn die tatsächliche Konfiguration von der gewünschten Konfiguration abweicht.  
Er wird von IaC-Engines, Cloud-Governance-Tools und ITOM-Compliance-Mechanismen erkannt.

Drift erfordert nicht automatisch einen Change. Nur eine Behebung mit Produktionsrisiko  
sollte über Change Management gesteuert werden.

Beispiele, die einen Change erfordern:

-   Rückgängigmachen nicht autorisierter Firewall-Änderungen
-   Korrektur von Drift bei IAM-Berechtigungen
-   Zurücksetzen unsicherer Konfigurationsabweichungen

Beispiele, die keinen Change erfordern:

-   automatische Behebung über GitOps/IaC
-   Abweichungen, die nur Metadaten betreffen
-   unbedenkliche operative Anpassungen

Zeigt der Drift ein veraltetes oder fehlerhaftes Desired-State-Modell auf, gehört die Korrektur  
in das Design (Architecture) oder die Umsetzung (Build & Integrate), nicht in das  
Change Management – wobei das Deployment des aktualisierten Modells durchaus Governance erfordert.

## 7\. Wo das „WIE“ festgelegt wird

Eines der häufigsten Missverständnisse ist die Annahme, Change Management lege fest, wie die Arbeit umgesetzt wird.  
Das ist nicht der Fall.

Das „WIE“ wird schrittweise festgelegt:

-   **Demand Management** → Warum wir etwas tun, grober Scope
-   **Architecture** → Erster Lösungsansatz und Plattformauswahl
-   **Delivery / Story Management** → Die detaillierte Umsetzung  
    (APIs, Datenmodelle, IaC, Pipelines, Teststrategie)
-   **Change Management** → Wie die Lösung sicher in die Produktion deployt wird
-   **Operations** → Laufzeitverhalten, Drift-Monitoring und Service-Performance

Jede Phase hat eigene Verantwortlichkeiten und Artefakte. Klarheit an dieser Stelle reduziert Nacharbeit,  
beschleunigt die Umsetzung und verbessert die Governance.

## 8\. Kommunikation außerhalb des Change Managements

Nicht jede Änderung erfordert einen Change Record, viele erfordern aber dennoch Kommunikation,  
insbesondere wenn Erwartungen oder das Betriebsverhalten betroffen sein könnten.

Beispiele:

-   Anpassungen von Feature Flags
-   Canary Releases
-   Aktualisierungen von Pipelines oder Automatisierungen
-   Änderungen an internen Umgebungen
-   Feinabstimmung des Laufzeitverhaltens

Wirksame Kommunikation reduziert Incidents und vermeidet unnötige Eskalationen.

## Fazit

Bei modernem Change Management geht es nicht darum, die Umsetzung zu verlangsamen, sondern darum, risikobehaftete Änderungen  
sicher und planbar in die Produktion zu bringen.

Organisationen, die im Jahr 2025 erfolgreich sind,

1.  steuern nur, was tatsächlich ein Produktionsrisiko birgt.
2.  legen Informationen im richtigen System of Record ab.
3.  setzen auf Automatisierung, wo Muster erprobt und sicher sind.
4.  behandeln Drift als operatives Thema, nicht als Governance-Thema.
5.  stellen sicher, dass jede Lifecycle-Phase ihre eigene Rolle bei der Festlegung des „WIE“ wahrnimmt.
6.  kommunizieren proaktiv, auch wenn Change Management nicht beteiligt ist.

Gut umgesetzt wird Change Management zu einem schlanken, wirksamen Sicherheitsmechanismus, der moderne Engineering-Praktiken unterstützt, statt sie einzuschränken.
