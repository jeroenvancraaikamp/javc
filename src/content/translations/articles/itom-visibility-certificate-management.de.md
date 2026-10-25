---
title: "ITOM, Certificate Management"
excerpt: "Als Teil des Produkts ServiceNow ITOM Discovery bietet ServiceNow eine umfassende Funktionalität für das Certificate Management. Sie soll Organisationen Transparenz, Kontrolle und Automatisierung über den gesamten Lebenszyklus von Zertifikaten hinweg verschaffen und zugleich die CMDB korrekt und aktuell halten."
source: "398edcdb6d5340b0"
---

Als Teil des Produkts **ServiceNow ITOM Discovery** bietet ServiceNow eine umfassende Funktionalität für das **Certificate Management**. Sie soll Organisationen Transparenz, Kontrolle und Automatisierung über den gesamten Lebenszyklus von Zertifikaten hinweg verschaffen und zugleich die CMDB korrekt und aktuell halten.

### Kernfunktionen

ServiceNow Certificate Management unterstützt die folgenden zentralen Funktionen:

-   **Erkennung und Föderation von Zertifikaten**, wobei diese als Configuration Items (CIs) in der CMDB registriert werden, einschließlich Verweisen darauf, wo die Zertifikate eingesetzt sind
-   **Überwachung des Ablaufdatums**, mit Erkennung bevorstehender Zertifikatsabläufe sowie automatischer Zuweisung und Nachverfolgung von Erneuerungsaufgaben, einschließlich E-Mail-Benachrichtigungen
-   **Katalogbasiertes Request Management**, das es Benutzern ermöglicht, Zertifikate über standardisierte Workflows anzufordern, zu genehmigen, zu erneuern oder zu widerrufen
-   **Automatisierte Zertifikatserneuerung**, mittels Workflow-gesteuerter Automatisierung, sofern unterstützt
-   **Event-Generierung** (sofern ITOM Health lizenziert ist), wobei Events erzeugt werden, wenn zertifikatsbezogene Probleme oder Fehler erkannt werden

Über ITOM Visibility werden Zertifikate automatisch in der CMDB erfasst und kontinuierlich aktualisiert, was einen *Zero-Touch*-Ansatz für das Datenmanagement unterstützt.

### Methoden zur Erkennung von Zertifikaten

Die Erkennung von Zertifikaten kann mit einer oder mehreren der folgenden Methoden erfolgen:

#### 1\. TCP-Port-Scanning

Zertifikate werden erkannt, indem die TCP-Ports gescannt werden, über die sie bereitgestellt werden. Dieser Ansatz setzt Folgendes voraus:

-   Erkennbare TCP-Ports
-   Vorhandene MID Server
-   Entsprechend konfigurierte Firewall-Freigaben

Die Port-Erkennung erfolgt in der Regel, nachdem die IP-basierten Geräte im Netzwerk erkannt wurden.

#### 2\. URL-basierte Erkennung

Zertifikate können erkannt werden, indem bekannte URLs abgefragt werden, die diese verwenden. Diese Methode ist besonders nützlich für:

-   SaaS-Anwendungen, die nicht über ITOM Discovery erkannt werden können
-   Externe Websites oder Partnersysteme, von denen Ihre Organisation abhängig ist

#### 3\. Föderation von Certificate Authorities

Zertifikate können von einer oder mehreren Certificate Authorities (wie DigiCert, GoDaddy, Microsoft, Entrust oder Let’s Encrypt) föderiert werden. Diese Methode zeigt zwar nicht, wo ein Zertifikat eingesetzt ist, liefert aber wertvolle Erkenntnisse darüber:

-   welche Zertifikate existieren
-   wer sie ausgestellt hat
-   wann sie ablaufen

### Abbildung in der CMDB und Dashboards

Erkannte Zertifikate werden als CIs in der CMDB gespeichert und enthalten Attribute wie Anbieter und Ablaufdatum.

ServiceNow ITOM Visibility bietet ein eigenes **Certificate Management Dashboard**, das Einblick gibt in:

-   die Gesamtzahl der verwendeten Zertifikate
-   Zertifikate, die innerhalb eines konfigurierbaren Zeitraums ablaufen
-   den Status und das Volumen manueller Erneuerungsaufgaben
-   automatisierte Workflows, die für die Zertifikatserneuerung ausgelöst wurden

### Hinweise und betriebliche Überlegungen

-   Werden IT-Artefakte üblicherweise über **CI/CD-Pipelines, DevOps-Tools oder APIs** bereitgestellt, empfiehlt es sich, Anfragen zur Zertifikatserneuerung über dieselben Kanäle abzuwickeln
-   Heutzutage ist die Ausstellung erneuerter Zertifikate in der Regel automatisiert und wird typischerweise über einen vorab genehmigten **Standard Change** statt über einen **Normal Change** gesteuert.
