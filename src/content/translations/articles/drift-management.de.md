---
title: "Drift Management: Warum es wichtig ist, wer es braucht und wie es gelingt"
excerpt: "IT-Umgebungen gehen selten durch ein einziges großes, dramatisches Ereignis kaputt. Viel häufiger erodieren sie langsam: ein Konfigurationsflag, das stillschweigend umgelegt wird, eine Firewall-Regel, die „nur zum Testen“ hinzugefügt wird, eine VM, deren Größe ohne Dokumentation geändert wird, ein Registry-Schlüssel, den ein Engineer in"
source: "10495e80de7ddf01"
---

IT-Umgebungen gehen selten durch ein einziges großes, dramatisches Ereignis kaputt. Viel häufiger erodieren sie langsam: ein Konfigurationsflag, das stillschweigend umgelegt wird, eine Firewall-Regel, die „nur zum Testen“ hinzugefügt wird, eine VM, deren Größe ohne Dokumentation geändert wird, ein Registry-Schlüssel, den ein Engineer in aller Eile anpasst. Einzeln harmlos. In der Summe fatal. Diese schleichende Erosion ist **Configuration Drift** – und wenn sie nicht gemanagt wird, untergräbt sie Sicherheit, Stabilität, Auditierbarkeit und die Nerven der Engineers. Dieser Blog erläutert, was Drift Management ist, warum Organisationen davon profitieren und was Sie tatsächlich brauchen, um es wirksam umzusetzen.

## 1\. Was genau ist Drift – und warum entsteht sie?

**Configuration Drift** tritt auf, wenn der *tatsächliche Zustand* der Infrastruktur von ihrem *dokumentierten oder beabsichtigten Zustand* abweicht.  
Sie betrifft On-Prem-Server, Cloud-Ressourcen, Netzwerke, Container, Endgeräte – praktisch alles.

Drift entsteht typischerweise durch:

-   Notfall-Fixes, die nie zurückgenommen werden
-   Manuelle Änderungen außerhalb des Change Managements
-   Automatisierungsskripte, die sich gegenseitig überschreiben
-   Engineers mit erweiterten Berechtigungen, die „nur schnell ein Update machen“
-   Unterschiede zwischen Umgebungen (DTAP), die mit der Zeit wachsen
-   Patches oder Hersteller-Updates, die Standardeinstellungen ändern

Mit anderen Worten: Reibung zwischen dem, *wie wir glauben, dass Systeme konfiguriert sind*, und dem, *wie sie sich tatsächlich verhalten*.

## 2\. Warum sollte das jemanden interessieren? (Eine überraschend lange Liste)

### Security-Teams

Drift öffnet Fehlkonfigurationen Tür und Tor – einer der häufigsten Grundursachen moderner Sicherheitsvorfälle.  
Transparenz über Drift unterstützt unmittelbar Frameworks wie DORA, SOC 2, ISO 27001 und NIST 800-53.

### Operations-Teams

Unerwartete Unterschiede zwischen Servern oder Umgebungen führen oft zu fehlgeschlagenen Deployments, instabilen Anwendungen und dem bekannten  
Szenario „Läuft auf DEV, aber nicht auf PROD“.

### Auditoren & Risikomanagement

Drift Management liefert genau das, was Auditoren wollen: Nachvollziehbarkeit, Nachweise, Kontrolle und Wiederholbarkeit.

### Architekten & Platform Engineers

Verlässliche Baselines verhindern architektonische Entropie.  
Wenn jede Umgebung langsam mutiert, betreiben Sie keine Plattform mehr – sondern einen Zoo.

## 3\. Wie wird Drift gemanagt? (Der praktische Ansatz)

Wirksames Drift Management ist kein einzelnes Tool. Es ist eine **Capability**, die auf vier Säulen beruht:

### Säule 1: Eine vertrauenswürdige Baseline

Sie brauchen eine klare Definition des Soll-Zustands – Server-Build-Templates, Netzwerkkonfigurationen, Cloud-Policies, Anwendungsmanifeste usw.  
Keine Baseline = keine Drift-Erkennung.

### Säule 2: Kontinuierliche Datenerfassung

Benötigt wird Telemetrie zu Einstellungen auf Betriebssystemebene, Software, Paketen, VM-/Cloud-Ressourcen, Netzwerkgeräten, IAM-Policies und mehr.  
Mögliche Quellen sind Agents (Tanium), CM-Tools, ServiceNow ITOM Discovery, SCCM/Intune, SCVMM, Cloud-APIs oder Skripte.

### Säule 3: Intelligenter Abgleich

Vergleichen Sie Soll- und Ist-Zustand. Kategorisieren Sie Drift in erwartete Änderungen, tolerierte, aber nicht konforme Änderungen, kritische Drift oder sicherheitsrelevante Drift.  
Rauschunterdrückung ist dabei unerlässlich.

### Säule 4: Remediation & Governance

Drift zu erkennen ist erst der Anfang – sie zu beheben ist der eigentliche Zweck.  
Automatisierung, Genehmigungen, manuelle Korrekturen oder befristete Ausnahmen spielen alle eine Rolle.  
Entscheidend ist die Integration mit Change Management, CMDB, CI/CD und Security-Prozessen.

## 4\. Wer ist eigentlich für Drift Management verantwortlich?

Die Verantwortung erstreckt sich typischerweise über mehrere Teams:

-   **Platform/Operations:** pflegen die Baselines
-   **Security:** definiert Compliance-Regeln
-   **DevOps/Automation:** setzt den Soll-Zustand durch
-   **Change & Configuration Management:** Governance
-   **Audit/Risk:** Validierung und Aufsicht

## 5\. Welche Tools helfen?

Die Drift-Capability verteilt sich in der Regel auf mehrere Lösungen:

-   Tanium für Transparenz über Endpoint-/Serverkonfigurationen
-   ServiceNow ITOM Discovery für den Zustand der Infrastruktur
-   Azure Policy, AWS Config, GCP Config Sync
-   Ansible, Puppet, Chef für die Durchsetzung
-   GitOps für deklarative Konfiguration
-   SIEM/SOAR für Routing und automatisierte Reaktion

## 6\. Der Nutzen

-   **Regulatorische Compliance verbessert sich**
-   **Betriebsstabilität steigt**
-   **Security Posture wird gestärkt**
-   **Cloud-Verschwendung sinkt**
-   **Engineers schlafen besser** (weniger Chaos)

## Fazit

Drift Management ist nicht glamourös, aber es ist eine der einfachsten und wirkungsvollsten Praktiken, die eine Organisation einführen kann. In einer Welt voller Automatisierung, Komplexität und ständigem Wandel driftet die Umgebung immer. Die Frage ist: **Bemerken Sie es, bevor etwas kaputtgeht?**

\`\`\`

body {<br /> font-family: Arial, sans-serif;<br /> max-width: 900px;<br /> margin: 0 auto;<br /> line-height: 1.6;<br /> }<br /> h1, h2, h3 {<br /> color: #333;<br /> }<br /> h1 {<br /> margin-top: 40px;<br /> }<br /> p {<br /> margin: 12px 0;<br /> }<br /> ul {<br /> margin: 10px 0 20px 20px;<br /> }<br />
