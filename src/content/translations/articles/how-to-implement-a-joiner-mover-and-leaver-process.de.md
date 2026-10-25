---
title: "Wie implementiert man einen Joiner-, Mover- und Leaver-Prozess?"
excerpt: "Hier finden Sie einen integrierten Überblick darüber, wie Ihr Unternehmen die Joiner-, Mover- und Leaver-Prozesse (JML) unter Einsatz von Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP und ServiceNow abwickelt und dabei alle geforderten Elemente berücksichtigt."
source: "c1d6e33e30fd7ca2"
---

Hier finden Sie einen integrierten Überblick darüber, wie Ihr Unternehmen die **Joiner-, Mover- und Leaver-Prozesse (JML)** unter Einsatz von **Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP und ServiceNow** abwickelt und dabei alle geforderten Elemente berücksichtigt.

* * *

## **1\. Joiner-Prozess (Onboarding)**

### **1.1 Auslösen des Prozesses**

-   **Festangestellte Mitarbeitende:**
    -   Workday dient als **Source of Truth** für HR-Stammdaten.
    -   In Workday wird ein Datensatz für die neue Mitarbeiterin bzw. den neuen Mitarbeiter angelegt, einschließlich Rolle, Standort und Stelleneinstufung.
    -   Saviynt übernimmt die Benutzerdaten aus Workday für Identity Governance and Administration (IGA) und Access Management.
    -   Azure AD stellt die grundlegenden Identitätskonten bereit (E-Mail, SSO).
-   **Externe Mitarbeitende (Contractors):**
    -   Werden direkt über **Saviynt** verwaltet, das für Zugriffsanfragen und das Lifecycle-Management mit ServiceNow integriert ist.
    -   Die Daten externer Mitarbeitender (z. B. Vertragslaufzeit, Rolle) werden in Saviynt gespeichert.

### **1.2 IT- und Asset-Bereitstellung**

-   **Identity and Access Management:**
    -   Saviynt übernimmt die rollenbasierte Zugriffskontrolle (RBAC) und stellt sicher, dass nur die erforderlichen Berechtigungen vergeben werden.
    -   Azure AD übernimmt die Authentifizierung und die Bereitstellung von Zugriffen auf Unternehmenssysteme.
-   **Geräteverwaltung:**
    -   **Intune** verwaltet Windows-Geräte.
    -   **JAMF** verwaltet macOS- und iOS-Geräte.
    -   Die Geräte werden mit Standard-Unternehmenssoftware ausgestattet, etwa Microsoft Office 365, VPN-Clients, Collaboration-Tools (z. B. Teams, Slack) und Sicherheitstools (z. B. Antivirus, Endpoint Protection).
-   **Beschaffung:**
    -   Geräte werden über **Ariba** beschafft (unternehmensweite Lieferanten).
    -   Die lokale Beschaffung erfolgt über freigegebene regionale Lieferanten.
-   **Asset-Registrierung:**
    -   **ServiceNow Asset Management (ITAM)** führt die Datensätze aller IT-Assets.
    -   Die **ServiceNow Configuration Management Database (CMDB)** erfasst die Konfigurationsdetails der Geräte.
    -   Auch Nicht-IT-Assets (z. B. Fahrzeuge, Fahrräder, Zutrittskarten, Schlüssel) werden in **ServiceNow** unter Facilities Management oder in der CMDB erfasst.

### **1.3 Compliance und Richtlinien**

-   Richtlinien und Berechtigungen für Hardware und Software werden gespeichert und gesteuert über:
    -   **Saviynt (Zugriffsrichtlinien)**
    -   **ServiceNow (Asset-Lifecycle-Management und Genehmigungen)**

### **1.4 Interne Kostenverrechnung**

-   **IT-Kosten:**
    -   Gerätebeschaffung und Softwarelizenzen werden über die Beschaffungs-Workflows in **Ariba** und die Kostenstellenzuordnungen in Workday weiterverrechnet.
    -   Kosten für externe Mitarbeitende werden über die **ADP**-Gehaltsabrechnung (für Zahlungen) und **Ariba** (für Beschaffung und die Nachverfolgung von Lieferantenrechnungen) abgewickelt.

### **1.5 Aktivierung von Konten und Tickets**

-   **ServiceNow:** Verfolgt alle Onboarding-Aufgaben und -Tickets (z. B. Asset-Auslieferung, Kontoerstellung).
-   Die Verantwortung für Onboarding-Aufgaben wird den zuständigen Abteilungen (IT, Facilities, HR) zugewiesen.

* * *

## **2\. Mover-Prozess (Rollenwechsel, Beförderungen, Versetzungen)**

### **2.1 Rollenänderungen und Versetzungen**

-   **Festangestellte Mitarbeitende:**
    -   Workday löst Rollenänderungen, Standortwechsel und Versetzungen zwischen Abteilungen aus.
    -   Saviynt passt die Zugriffsrechte an die neuen Rollen an.
    -   Azure AD aktualisiert Gruppenmitgliedschaften und SSO-Berechtigungen.
-   **Externe Mitarbeitende:**
    -   Werden über Saviynt und ServiceNow verwaltet.
    -   Änderungen an Zugriffen werden über Saviynt mit Genehmigungs-Workflows abgewickelt.

### **2.2 Asset-Aktualisierungen**

-   IT- und physische Assets werden über **ServiceNow ITAM/CMDB**-Workflows aktualisiert.
-   Geräte müssen gegebenenfalls über **Intune (Windows)** oder **JAMF (macOS)** neu bereitgestellt werden.
-   Facilities-bezogene Assets (z. B. Büroflächen, Parkberechtigungen, Zutrittskarten) werden in **ServiceNow Facilities Management** aktualisiert.

### **2.3 Softwareanpassungen**

-   Rollenbasierte Softwareberechtigungen (z. B. Lizenzen, VPN-Zugang) werden von Saviynt automatisch aktualisiert und bereitgestellt über:
    -   **Intune** (Windows-Geräte)
    -   **JAMF** (Mac-Geräte)

### **2.4 Compliance und Audits**

-   Saviynt stellt sicher, dass ordnungsgemäße Access-Review- und Rezertifizierungsprozesse eingehalten werden.
-   ServiceNow führt Audit-Logs für Genehmigungen und Änderungen.

### **2.5 Interne Kostenverrechnung**

-   Änderungen bei IT-Ressourcen oder Lizenzen werden in **Ariba** aktualisiert und den entsprechenden Kostenstellen belastet.

### **2.6 Offene Aufgaben und Tickets**

-   Bestehende Tickets und Aufgaben werden über **ServiceNow**-Workflows neu zugewiesen.

* * *

## **3\. Leaver-Prozess (Offboarding)**

### **3.1 Auslösen des Offboardings**

-   **Festangestellte Mitarbeitende:**
    -   Workday löst die Austritts-Workflows aus.
    -   Saviynt deaktiviert Zugriffsrechte und entzieht Berechtigungen.
    -   Azure AD deaktiviert Konten und entfernt den SSO-Zugang.
-   **Externe Mitarbeitende:**
    -   Werden über Saviynt- und ServiceNow-Workflows verwaltet.
    -   ServiceNow löst Ticket-Workflows für die IT- und Facilities-Teams aus.

### **3.2 Rücknahme von Assets**

-   **ServiceNow ITAM:** Verfolgt und steuert die Rückgabe von IT-Assets (z. B. Laptops, Mobiltelefone).
-   **ServiceNow Facilities Management:** Übernimmt die Rückgabe von Nicht-IT-Assets (z. B. Schlüssel, Ausweise).

### **3.3 Rückgewinnung von Softwarelizenzen**

-   Softwarelizenzen werden entzogen über:
    -   **Intune** (Windows)
    -   **JAMF** (macOS)
    -   Erfassung und Aktualisierung in der **ServiceNow CMDB**

### **3.4 Finanzielle Abwicklung**

-   Offene Lieferantenzahlungen werden über **Ariba** abgewickelt.
-   Die abschließende Gehaltsabrechnung für festangestellte Mitarbeitende erfolgt über **ADP**.

### **3.5 Compliance und Audits**

-   Abschließende Zugriffsaudits werden in **Saviynt** durchgeführt.
-   ServiceNow protokolliert den Abschluss der Offboarding-Aufgaben und die Rückgabe der Assets.

### **3.6 Interne Kostenverrechnung**

-   Abschließende Kosten für die Asset-Rücknahme und Lizenzanpassungen werden über **Ariba** intern verrechnet.

* * *

## **4\. Verwaltung von Richtlinien und Berechtigungen**

### **4.1 Speicherung und Pflege**

-   **Saviynt:** Zugriffsrichtlinien, rollenbasierte Berechtigungen.
-   **ServiceNow CMDB:** Richtlinien für Asset-Lifecycle und Konfiguration.
-   **ServiceNow ITAM:** Asset-Berechtigungen, Lifecycle-Richtlinien.
-   **Workday:** Kostenstellenzuordnungen, HR-Richtlinien.

### **4.2 Audit und Compliance**

-   **Saviynt und ServiceNow:** Regelmäßige Access Reviews und Compliance-Prüfungen.
-   **Intune und JAMF:** Durchsetzung von Geräte-Compliance und Sicherheitsrichtlinien.

* * *

## **5\. Übersichtstabelle**

| **Prozessphase** | **Source of Truth** | **Identität/Zugriff** | **Asset Management** | **Softwareverteilung** | **Kosten und Rechnungsstellung** |
| --- | --- | --- | --- | --- | --- |
| **Joiner** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |
| **Mover** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba |
| **Leaver** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |

* * *

## **6\. Offene Tickets und Übertragung von Verantwortlichkeiten**

-   **Logische Assets (Konten, Rollen, Workflows):** Werden über **Saviynt und ServiceNow** abgewickelt.
-   **Physische Assets:** Werden über **ServiceNow ITAM/CMDB** verwaltet und nachverfolgt.
-   **Offene Tickets:** Werden in **ServiceNow**-Workflows neu zugewiesen.

Dieser integrierte Ansatz stellt sicher, dass jedes Tool seine Stärken ausspielt und gleichzeitig Klarheit, Compliance und Effizienz über den gesamten **Joiner-, Mover- und Leaver-Lebenszyklus** gewährleistet sind.
