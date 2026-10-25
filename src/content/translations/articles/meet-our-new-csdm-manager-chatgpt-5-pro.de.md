---
title: "Darf ich vorstellen: unser Digital Portfolio Manager ChatGPT 5 Pro!!"
excerpt: "Kürzlich habe ich ChatGPT 5 Pro gebeten, die Artefakte und ihre Beziehungen zu definieren, die in ServiceNow registriert werden müssen. In diesem Artikel erfahren Sie, was überraschend gut funktioniert hat und was kläglich gescheitert ist. Die detaillierten Ergebnisse (die die Konformität"
source: "7f02142a49657d81"
---

Kürzlich habe ich ChatGPT 5 Pro gebeten, die Artefakte und ihre Beziehungen zu definieren, die in ServiceNow registriert werden müssen. In diesem Artikel erfahren Sie, was überraschend gut funktioniert hat und was kläglich gescheitert ist. Die detaillierten Ergebnisse (die die Konformität mit den Standards CSDM 5 und TBM 5 berücksichtigten), die der ChatGPT-Chatbot erzeugt hat, werden ebenfalls gezeigt.

> **Spoiler-Alarm: ChatGPT erweist sich als großartiger Assistent, der vermutlich die gesamte CSDM5- und TBM5-Dokumentation von vorne bis hinten gelesen hat, aber der Bot wird menschliche Digital Portfolio Manager in absehbarer Zeit wohl kaum ersetzen können.**

Bevor wir uns ansehen, was ChatGPT vorgeschlagen hat, werfen wir zunächst einen Blick auf zwei Folien aus der offiziellen – unbearbeiteten – CSDM5-Dokumentation von ServiceNow:

![](/wp-content/uploads/2025/09/CSDM5-Artefact-Definitions.png)

Die CSDM5-Dokumentation legt fest, dass folgende Tabellen und Beziehungen verwendet werden sollen:

![](/wp-content/uploads/2025/09/CSDM5-Artefacts-and-Relations.png)

### Erste Beobachtungen:

Auf Basis des von mir bereitgestellten Prompts hat ChatGPT 5 Pro Definitionen und Inhalte für die folgenden Artefakte und Beziehungen erzeugt:

![](/wp-content/uploads/2025/09/ChatGPT-CSDM5-Tables-and-Relations.png)

Wie Sie sehen, ähneln die von ChatGPT erzeugten Definitionen dem, was auf den offiziellen Folien steht – sind aber nicht ganz identisch.

-   **ChatGPT wurde mit falschen Informationen gefüttert:** ChatGPT legt „Business Services“ in der Tabelle *cmdb\_ci\_service* ab, was technisch möglich ist, aber die richtige Tabelle ist *cmdb\_ci\_service* (eine Child-Tabelle der Tabelle cmdb\_ci\_service).
-   **ChatGPT weicht vom CSDM5-Standard ab,** z. B. verwendet es die Beziehungen „Provided by::Provides“, „Contains::Contained by“ oder „Uses::Used by“ nicht, wo es dies tun sollte.
-   **Die Antwort von ChatGPT ist unvollständig:** Obwohl ich ChatGPT ausdrücklich gebeten hatte, in seiner Antwort TBM5-konform zu sein, hat ChatGPT die in TBM 5.0.1 definierten Technology Towers, Solutions und Capabilities nicht wirklich verwendet. Die Portfolio-Tabelle und die Business-Capability-Tabelle werden in der Antwort von ChatGPT weder definiert noch verwendet.
-   **ChatGPT ist in Bezug auf die Anwendung von CSDM5 oder TBM5 noch nicht ausgereift**: So fehlt z. B. die Definition (bzw. Verwendung) von Daten in der Tabelle cmdb\_ci\_appl zur Modellierung der technischen Applikationen.  
    Das ist nicht ungewöhnlich, kann aber zu einer falschen Nutzung der anderen Tabellen führen – und in unserem Fall war es auch so.
-   **ChatGPT zeigt sich in Unkenntnis der OOTB-Konfiguration** des Application Portfolio Management (APM). So können z. B. Plattform-Applikationen auf Platform Hosts gehostet werden (die in ServiceNow ebenfalls Business Applications sind). ServiceNow ist meiner bescheidenen Meinung nach ein solcher Platform Host, aber ChatGPT war entweder anderer Meinung oder hat das nicht erkannt.

Allerdings ist die offizielle Dokumentation und das, was in den verschiedenen ServiceNow-Communities veröffentlicht wird (was ChatGPT ebenfalls gelesen hat), inkonsistent und widerspricht oft dem, was andere veröffentlicht haben. So hat ChatGPT vermutlich auch zu lange mir zugehört, den Inhalt dieser Website gelesen und ebenfalls in seine Antwort einfließen lassen. Auch der Chatbot auf dieser Website halluziniert manchmal, wenn es um CSDM5 und TBM5 geht :-)

> ChatGPT unterscheidet sich nicht von einem Menschen, der halluziniert, nachdem er mehrere Websites und Community-Artikel mit Interpretationen und verwirrenden Informationen gelesen hat.
> 
> Wenn Sie möchten, dass ChatGPT zu 100 % konform mit CSDM5 und/oder TBM5 bleibt, müssen Sie die offiziellen Whitepaper und PPTX-Dateien an die Prompts anhängen, die Sie ChatGPT geben.

## Der Dialog mit ChatGPT 5 PRO:

Ich habe mehrere – widersprüchliche – Artikel darüber gelesen, wie man die ServiceNow-Artefakte und -Beziehungen modellieren sollte. In manchen Artikeln haben die Autoren meiner Meinung nach übertrieben, in anderen zu stark vereinfacht und an Stellen Abkürzungen genommen, wo sie es nicht hätten tun sollen (es ist oft nur eine Frage der Zeit, bis sich das rächt). Selbst die offizielle Dokumentation enthält neue Erkenntnisse, Interpretationen und Erläuterungen, die nicht aus den veröffentlichten Whitepapern stammen. Ich verstehe, wie das passiert – auch ich lerne jeden Tag aus meinen Erfahrungen und passe mich an neue Technologien und Best Practices an. Fairerweise muss man sagen: CSDM ist nicht einfach, vor allem wenn man tiefer gräbt als die beiden Folien hier.

Also beschloss ich, den allwissenden digitalen Assistenten ChatGPT 5 PRO nach seiner Meinung zu fragen. Ich habe folgenden Prompt eingegeben, wie ich ihn auch von anderen Personen (die vielleicht keine Prompt-Experten sind) erwarten würde:

> I need to model our ServiceNow solutions in ServiceNow, compliant with TBM5 and CSDM5. We have four instances of ServiceNow (DEV, TST, ACC, and PRD) each running CSM, ITSM, ITOM and NOW Assist. We have 2 Windows VMs that are provisioned on OCI Cloud (one for production and one for non-production). The production VM runs the java Mid-Server for PRD. The non-production VM runs separate java Mid-Servers for resp DEV, TST and ACC. The business is using ServiceNow for Enterprise Service Management and Customer Service Management. IT Security uses ServiceNow for Security Operations. . The IT help desks that we have, all use ServiceNow for incident Mngt, Change Mngt and Request Mngt. We internally use Digital Portfolio Mngt to maintain the products, services and master data. In all four instances we have technically integrated ServiceNow ITOM with SAP LeanIX, SAP CALM, Intune, JAMF, OCI, AWS, and Azure. We have integrated PRD with Azure AD and Workday, e.g. to import users, groups and foundational Organization Data. Daily, we synch the users and groups from PRD into DEV, TST and ACC, daily. All four environments use SSO with Azure AD. The employees who use ServiceNow may send in email, use the ESM portal, or use our Virtual Agent that is integrated with MS teams. A number of internal and external IT4IT tools send emails with events/alerts to ServiceNow PRD, which are processed using AIOPS and NOW Assist. Soon we will integrate ServiceNow with Saviynt for Identity and Access Mngt. How do register the above in ServiceNow? What do I enter in which table, and which relations do i need to register. Be detailed and specific. Apply consistent naming conventions and stick to TBM5 and CSDM5.

### Nach 44 Sekunden kam ChatGPT mit der folgenden – recht beeindruckenden – ersten Antwort zurück:

Verstanden. Nachfolgend finden Sie ein konkretes, an CSDM 5/TBM 5 ausgerichtetes Modellierungsrezept für Ihre Landschaft. Ich verwende die kanonischen Tabellennamen, konsistente Bezeichnungen und führe die Beziehungen auf, die Sie registrieren sollten.

**Namenskonventionen (überall verwenden)**

-   Umgebungen: DEV, TST, ACC, PRD
-   Muster:
    -   **Business Service**: ESM (Enterprise Service Management) / CSM (Customer Service Management) / IT Security (SecOps) / IT Operations (ITOM)
    -   **Service Offering**: – (z. B. ESM – Virtual Agent (Teams))
    -   **Application Service**: ServiceNow – (z. B. ServiceNow ITSM – PRD)
    -   **Technical Service**: <Plattform/Domäne> – (z. B. Identity & Access – Azure AD)
    -   **Business Application**: ServiceNow – (Platform) (logische Applikation)
    -   **Software Instance**: <Produkt/Komponente> – (z. B. MID Server – PRD VM)
    -   **Computer/VM**: – – (z. B. OCI – MID Host – PRD)

**TBM-5 ↔ CSDM-5-Abgleich (auf hoher Ebene)**

-   **TBM Towers** → **CSDM-Servicetypen**

-   -   **Business Apps / Shared Services** → **Business Services** (cmdb\_ci\_service) + **Service Offerings** (service\_offering)
    -   **Platforms/Technology** → **Technical Services** (cmdb\_ci\_service\_technical) + **Offerings**
    -   **Applications (ausführbar)** → **Application Services** (cmdb\_ci\_service\_auto)
    -   **Infrastructure/Compute** → **Server/VMs** (cmdb\_ci\_server / cmdb\_ci\_computer / cmdb\_ci\_vm\_instance)
    -   **Software** → **Software Instances** (cmdb\_ci\_software\_instance) + **Packages** (cmdb\_ci\_spkg)
    -   **Products/Portfolio** → **Digital Portfolio Management** (Produkte/Angebote) mit Referenzen auf Services (service\_offering-Verknüpfungen verwenden)

**Diese CIs und Datensätze registrieren**

**1) Business Services & Offerings (was das Business konsumiert)**  
**Tabellen:** cmdb\_ci\_service (Business Service), service\_offering (Service Offering)

Business Services anlegen:

1.  **ESM (Enterprise Service Management)** — cmdb\_ci\_service
2.  **CSM (Customer Service Management)** — cmdb\_ci\_service
3.  **IT Security (SecOps)** — cmdb\_ci\_service
4.  **IT Operations (ITOM & AIOps)** — cmdb\_ci\_service

***ANMERKUNG DES AUTORS: Ich hätte erwartet, dass der Business Service in die Tabelle „cmdb\_ci\_service\_business“ statt in die Tabelle cmdb\_ci\_service kommt.  
Außerdem hätte ich erwartet, dass entweder IT Security SecOps und IT Operations Teil des (umfassenderen) ESM-Service werden oder dass ChatGPT zusätzlich einen Business Service „IT Service Management“ anlegt. Eine noch bessere Antwort wären meiner Meinung nach die (produktunabhängigen) Solutions gewesen, die in TBM 5.0.1 verwendet bzw. definiert werden.***

Unter jedem davon Offerings anlegen (nicht abschließend):

-   **ESM – Self-Service Portal** (service\_offering)
-   **ESM – Virtual Agent (Teams)** (service\_offering)
-   **ESM – Email Intake** (service\_offering)
-   **CSM – Case Management** (service\_offering)
-   **IT Security – Security Operations** (service\_offering)
-   **IT Operations – Event/AIOps Processing** (service\_offering)
-   **IT Operations – Discovery & Integration** (service\_offering)

**CSDM-Verknüpfung:** Setzen Sie die Referenz **business\_service** jedes Offerings auf den übergeordneten Business Service.

**2) Application Services pro Instanz/Produkt (die ausführbaren Services).**  


**Tabelle:** cmdb\_ci\_service\_auto

Legen Sie für jedes ServiceNow-Produkt, das Sie aktiv betreiben, **Application Services pro ENV** an:

-   ServiceNow ITSM – DEV/TST/ACC/PRD
-   ServiceNow CSM – DEV/TST/ACC/PRD
-   ServiceNow ITOM – DEV/TST/ACC/PRD
-   ServiceNow Now Assist – DEV/TST/ACC/PRD

(Diese stellen die Anwendungslaufzeit dar, die jede SN-Instanz für die jeweilige Produktfunktionalität bereitstellt.)

**ANMERKUNG DES AUTORS: In der Realität gibt es so etwas wie eine ServiceNow-ITM-Instanz nicht. Ich hatte** **Service Instances wie** **„PRD.Service-Now.com“, „DEV.Service-Now.com“ usw. erwartet, die upstream mit den Business Applications und Service Offerings verknüpft sind.**

**An Offerings anbinden (verbraucherseitig):**

-   ESM – Self-Service Portal → **provides** ServiceNow ITSM – PRD
-   ESM – Virtual Agent (Teams) → **provides** ServiceNow ITSM – PRD und ServiceNow Now Assist – PRD
-   ESM – Email Intake → **provides** ServiceNow ITSM – PRD
-   CSM – Case Management → **provides** ServiceNow CSM – PRD
-   IT Security – Security Operations → **provides** ServiceNow SecOps (IT Security) – PRD (falls Sie es unter ITSM/IT Sec so benennen)
-   IT Operations – Event/AIOps Processing → **provides** ServiceNow ITOM – PRD
-   IT Operations – Discovery & Integration → **provides** ServiceNow ITOM – PRD

(Umsetzung über **Service Offering ↔ Application Service**-Beziehungen mit **Depends on::Used by** – das Offering **depends on** den App Service.)

**ANMERKUNG DES AUTORS: Wenn dasselbe Self-Service Portal für mehrere TBM5-Solutions aus „Shared and Corporate“ und „Delivery“ genutzt wird, könnten Sie technisch keine unterschiedlichen Services für diese Solutions anlegen (z. B. jeweils einen für HR, FIN, IT, DevOps, SecOps usw.) und all diese Services mit demselben Offering verknüpfen. Das Self-Service Portal zu einem Service aufzuwerten, wäre ein technischer Workaround mit „ServiceNow Support \[PRD\]“ und „ServiceNow VIP Support \[PRD\]“ als Service Offerings. Der Nachteil: Wendet man diese Logik an, erhält man Tausende von Services. Stattdessen hätte ich einen generischen Business Service „ServiceNow ESM“ erwartet, mit Offerings wie „ServiceNow Portal Support \[PRD\]“, „ServiceNow Back-End Support \[PRD\]“, „ServiceNow VIP Support \[PRD\]“ und „ServiceNow Portal Support \[NON-PRD\]“.**

**3) Business Applications (logische Applikationen)**  
**Tabelle:** cmdb\_ci\_business\_app

Legen Sie (logische) Business Applications für die Plattformfunktionalitäten an (über alle Umgebungen hinweg stabil):

-   ServiceNow – ITSM (Platform)
-   ServiceNow – CSM (Platform)
-   ServiceNow – ITOM (Platform)
-   ServiceNow – Now Assist (Platform)

**CSDM-Verknüpfung:** Jeder **Application Service** sollte **Depends on** seine **Business Application** (logisches Design-Parent).  
(Beziehung: **Application Service (Child) Depends on → Business Application (Parent)**)

**ANMERKUNG DES AUTORS: Separate Business Applications anzulegen und sie auf der „ServiceNow Platform“ zu hosten, ist tatsächlich absolut sinnvoll. Allerdings würde ich empfehlen, ähnliche Applikationen zusammenzufassen, um die Anzahl der ServiceNow Business Applications auf weniger als 6 zu begrenzen. Die vorgeschlagene Beziehung ist im Vergleich zur obigen Folie leicht falsch, sie sollte lauten: Business Application (Parent) „consumes::consumed by“ Application Service (Child). Fairerweise muss man ChatGPT zugutehalten, dass ich in anderen ServiceNow-Dokumenten auch** **Business Application (Parent) „depends on::uses“ Application Service gesehen habe.**

**4) Technical Services für gemeinsam genutzte Technologien/Plattformen**  


**Tabelle:** cmdb\_ci\_service\_technical

Legen Sie Technical Services an (einzelne logische Services; Offerings können den Umfang verfeinern):

-   Identity & Access – Azure AD (SSO, Benutzer-/Gruppen-Provisioning)
-   HR Data – Workday
-   Device Management – Intune
-   Device Management – JAMF
-   Architecture – LeanIX
-   SAP Landscape – SAP CALM
-   Cloud – Oracle Cloud Infrastructure
-   Cloud – Microsoft Azure
-   Cloud – Amazon Web Services
-   Messaging – Email Gateway
-   Collaboration – Microsoft Teams (Virtual Agent)
-   AIOps Event Sources – IT4IT Tools (für eingehende E-Mails/Events)
-   Identity & Access – Saviynt (geplant)

**ANMERKUNG DES AUTORS: Ja, das ist sehr sinnvoll. Ich hätte in dieser Liste allerdings auch „Enterprise Service Management – ServiceNow“ erwartet, einen Technical Service, der z. B. von Workday konsumiert werden könnte. Saviynt SAP Landscape – SAP CALM.**

**An App Services binden** (die Laufzeit hängt von der Technologie ab):

Beispielsweise **Depends on** ServiceNow ITSM – PRD:

-   Identity & Access – Azure AD (SSO)
-   HR Data – Workday (Stammdaten)
-   Messaging – Email Gateway (ein-/ausgehende E-Mails)
-   Collaboration – Microsoft Teams (Virtual Agent) (VA-Integration)
-   Cloud – Oracle Cloud Infrastructure (für MID/Discovery, wo relevant)
-   AIOps Event Sources – IT4IT Tools (Events an PRD)
-   Identity & Access – Saviynt (nach Inbetriebnahme)

**5) Infrastruktur: Windows-VMs und MID Server**  
**Tabellen:**

-   VM/Server: cmdb\_ci\_server (oder die Subklasse cmdb\_ci\_win\_server, falls Sie diese verwenden)
-   VM-Instanz (optional): cmdb\_ci\_vm\_instance (IaaS-Metadaten)
-   Software Instance (MID): cmdb\_ci\_software\_instance
-   Software Package (MID-Installer): cmdb\_ci\_spkg (optional, für Lizenz-/Paketherkunft)

Server/VMs anlegen:

-   OCI – MID Host – PRD (Windows Server) — cmdb\_ci\_server
-   OCI – MID Host – NONPRD (Windows Server) — cmdb\_ci\_server

Software Instances für MID Server anlegen:

-   MID Server – PRD — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – PRD
-   MID Server – DEV — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – NONPRD
-   MID Server – TST — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – NONPRD
-   MID Server – ACC — cmdb\_ci\_software\_instance **Runs on** OCI – MID Host – NONPRD

**ANMERKUNG DES AUTORS: Ich vermute, ChatGPT hat aus dem Prompt nicht erfasst, dass wir 2 „Windows“-Server haben, die auf „OCI-VMs“ laufen. Außerdem hätte ich erwartet, dass ChatGPT mich anweist, die VMs einschließlich dessen, was darin/darauf läuft, zu föderieren oder per Discovery zu erfassen. Wichtiger noch: Die Tabelle „cmdb\_ci\_software\_instance“ existiert nicht, und „cmdb\_software\_instance“ (die existiert und Millionen von Datensätzen enthält) hat keine CI-Beziehung „Runs on“ zum Server, sondern verwendet eine direkte Referenz „installed on“.**

**Mit App Services verbinden:**

Jeder ServiceNow – **Depends on** den entsprechenden MID Server –, wo Discovery/Integrationen dies erfordern (primär ITOM; Sie können nur ITOM vom MID abhängig machen oder alle SN App Services, wenn Sie Probes zentralisieren).

**Cloud-/IaaS-Beziehung (optional, aber sinnvoll):**

-   cmdb\_ci\_vm\_instance (z. B. OCI VM – MID Host – PRD) **Hosted on** Cloud – Oracle Cloud Infrastructure (als Technical Service), und **Runs on** → cmdb\_ci\_server.
-   Oder einfach cmdb\_ci\_server **Hosted on** → Technical Service Cloud – Oracle Cloud Infrastructure verknüpfen.

**6) Kanäle & Eingangswege**

-   Offering **ESM – Self-Service Portal** **Depends on** ServiceNow ITSM – PRD
-   Offering **ESM – Virtual Agent (Teams)** **Depends on** ServiceNow Now Assist – PRD und **Depends on** Technical Service Collaboration – Microsoft Teams (Virtual Agent)
-   Offering **ESM – Email Intake** **Depends on** Messaging – Email Gateway und ServiceNow ITSM – PRD
-   Offering **IT Operations – Event/AIOps Processing** **Depends on** AIOps Event Sources – IT4IT Tools und ServiceNow ITOM – PRD

(Zusätzlich können Sie **service\_channel** oder eine Taxonomie über **Tags** an den Offerings mithilfe von cmdb\_key\_value erfassen.)

**ANMERKUNG DES AUTORS: Gut erkannt!! Allerdings ist es wenig sinnvoll, dafür einen der Millionen per Discovery erfassten Key Values zu verwenden. Ich hätte erwartet, dass die Kanäle als konsumierbare (und produktspezifische) Child Application Services (in der Tabelle cmdb\_ci\_service\_auto) unter den ServiceNow-Instanzen modelliert werden, die ebenfalls in dieser Tabelle erfasst sind. Auf diese Weise**

**7) Stammdaten & Identitätsflüsse**

**Benutzer/Gruppen** liegen in sys\_user, sys\_user\_group (Foundation-Daten).  
Dokumentieren Sie Datenflüsse als Abhängigkeiten:

-   ServiceNow Foundation Data – PRD (kann als **Application Service** oder **Data Set CI** modelliert werden, wenn Sie dieses Muster verwenden) **Depends on** Identity & Access – Azure AD und HR Data – Workday.
-   Für tägliche Synchronisierungen PRD → DEV/TST/ACC: ServiceNow ITSM – DEV/TST/ACC **Depends on** ServiceNow ITSM – PRD (Identity Copy) verknüpfen (oder ein eigenes **Technical Service Offering** anlegen: Identity & Access – Azure AD – NonProd Replication, das von Non-Prod-App-Services genutzt wird). Entscheidend ist, **explizit eine Abhängigkeit jedes Non-Prod-App-Service vom PRD-Identitätsexportprozess zu erfassen**.

**ANMERKUNG DES AUTORS: Das ergibt für mich wenig Sinn. ChatGPT hat meinen Hinweis, einen Technical Service für „ServiceNow Master/Meta Data“ anzulegen, offensichtlich nicht aufgegriffen.**

**8) Integrationen (externe Systeme)**

Stellen Sie jedes externe System als **Technical Service** (siehe oben) und (optional) als ein oder mehrere **Service Offerings** für die konkrete Integration dar (z. B. Device Management – Intune – Discovery/Compliance API).

Dann für die **ServiceNow App Services**:

-   ServiceNow ITOM – PRD **Depends on** Device Management – Intune, Device Management – JAMF, Cloud – Azure, Cloud – AWS, Cloud – Oracle Cloud Infrastructure, Architecture – LeanIX, SAP Landscape – SAP CALM.
-   ServiceNow ITSM – PRD **Depends on** Identity & Access – Azure AD, HR Data – Workday, Messaging – Email Gateway, Collaboration – Microsoft Teams (Virtual Agent).

Behalten Sie dasselbe Muster für **DEV/TST/ACC** bei (mit Verweis auf die entsprechenden Test-Tenants, sofern vorhanden). Wenn diese die von PRD gestützte Authentifizierung/Daten gemeinsam nutzen (wie bei Ihnen), modellieren Sie die explizite **Depends on**-Beziehung zur Funktionalität **PRD-Datensynchronisierung** wie beschrieben.

**ANMERKUNG DES AUTORS: Es ist sinnvoll, voneinander abhängige Application Services (oder besser: Service Instances) miteinander zu verknüpfen.**

**Zu registrierende Beziehungen (diese OOTB-Beziehungstypen verwenden)**

Verwenden Sie **cmdb\_rel\_ci** mit diesen Typen:

**Servicestruktur**

-   **Service Offering → Application Service**: Depends on::Used by  
    (Offering **Depends on** App Service)
-   **Application Service → Business Application**: Depends on::Used by  
    (App Service **Depends on** logische Business App)
-   **Application Service → Technical Service**: Depends on::Used by  
    (App Service **Depends on** gemeinsam genutzte Technologie)

**ANMERKUNG DES AUTORS: Ich musste das ein paar Mal lesen, aber es ist korrekt. Achten Sie nur genau darauf, was Parent und was Child ist!!**

**Infrastruktur & Laufzeit**

-   **Software Instance → Server**: Runs on::Runs
-   **Server/VM → Cloud Technical Service**: Hosted on::Hosts (oder Depends on, wenn Sie den TS abstrakt halten)
-   **Application Service → Software Instance (MID)**: Depends on::Used by (wenn dieser MID für den Betrieb des Service erforderlich ist)

**Umgebungsübergreifende Datensynchronisierung**

-   **Non-Prod-App-Service → PRD-Identitätsexport/-synchronisierung (TS Offering oder App Service)**: Depends on::Used by

**ANMERKUNG DES AUTORS: Hierfür hätte ich einen anderen Beziehungstyp erwartet, z. B. „Exchanges data with“, eine horizontale Abhängigkeit zwischen gleichrangigen Elementen. In Unified Maps möchten Sie diese Abhängigkeit eventuell „ausblenden“ oder „nur anzeigen“, damit die Map lesbar bleibt.**

**Event-Eingang**

-   **ITOM PRD App Service → AIOps Event Sources – IT4IT Tools (TS)**: Depends on::Used by

### **Beispieleinträge (kompakt, kopierbar)**

**ANMERKUNG DES AUTORS: ChatGPT hat all das oben Genannte in den folgenden Listen zusammengefasst. Ich habe ergänzt bzw. farblich markiert, was ich etwas anders machen würde.**

**Business Services (cmdb\_ci\_service\_business)**

-   ESM (Enterprise Service Management)
-   CSM (Customer Service Management)
-   IT Security (SecOps)
-   IT Service Mngt (ITSM)
-   IT Operations (ITOM & AIOps)

**Service Offerings (service\_offering) — Parent = Business Service**

-   ESM – Self-Service Portal
-   ESM – Virtual Agent (Teams)
-   ESM – Email Intake
-   CSM – Case Management
-   IT Security – Security Operations
-   IT Operations – Event/AIOps Processing
-   IT Operations – Discovery & Integration
-   IT Operations - Tech Service Management
-   IT Support - Tech Training
-   IT Support - Central Print

**Business Applications (cmdb\_ci\_business\_app)**

-   ServiceNow – ITSM (Platform)
-   ServiceNow – CSM (Platform)
-   ServiceNow – ITOM (Platform)
-   ServiceNow – Now Assist (Platform)
-   ServiceNow - Platform
-   ServiceNow - Finance
-   ServiceNow - Workforce
-   ServiceNow - Vendor & Procurement
-   ServiceNow - Health, Safety, Security, and Environmental
-   ServiceNow - Risk, Audit & Compliance
-   ServiceNow - Legal
-   ServiceNow - Property & Facility
-   ServiceNow - Corporate Communications
-   ServiceNow - Sustainability & ESG

**Application Services (cmdb\_ci\_service\_auto)**

-   ServiceNow ITSM – DEV/TST/ACC/PRD
-   ServiceNow CSM – DEV/TST/ACC/PRD
-   ServiceNow ITOM – DEV/TST/ACC/PRD
-   ServiceNow Now Assist – DEV/TST/ACC/PRD
-   ServiceNow – DEV Instance
-   ServiceNow – TST Instance
-   ServiceNow – ACC Instance
-   ServiceNow – PRD Instance

**Technical Services (cmdb\_ci\_service\_technical)**

-   Identity & Access – Azure AD
-   Identity & Access – Saviynt (geplant)
-   HR Data – Workday
-   Architecture – LeanIX
-   SAP Landscape – SAP CALM
-   Device Management – Intune
-   Device Management – JAMF
-   Cloud – Oracle Cloud Infrastructure
-   Cloud – Microsoft Azure
-   Cloud – Amazon Web Services
-   Messaging – Email Gateway
-   Collaboration – Microsoft Teams (Virtual Agent)
-   AIOps Event Sources – IT4IT Tools
-   ServiceNow - ESM

**Infrastruktur & Software**

-   Server (cmdb\_ci\_server):
    -   OCI – MID Host – PRD
    -   OCI – MID Host – NONPRD

-   Software Instances (cmdb\_ci\_software\_instance):
    -   MID Server – PRD (Runs on OCI – MID Host – PRD)
    -   MID Server – DEV (Runs on OCI – MID Host – NONPRD)
    -   MID Server – TST (Runs on OCI – MID Host – NONPRD)
    -   MID Server – ACC (Runs on OCI – MID Host – NONPRD)
    -   Referenzattribut „installed on“ verwenden, keine CI-Beziehung verwenden

**ANMERKUNG DES AUTORS: ChatGPT hat mich mit den nachfolgend aufgeführten Empfehlungen überrascht, nach denen ich nicht gefragt hatte, die aber zutreffend und erwähnenswert sind.**

**Minimale Feldhygiene (gemäß CSDM Good Practice)**

-   **Alle Services/Offerings/App Services**
    -   environment (DEV/TST/ACC/PRD) — bei App Services setzen; Business/Technical Services typischerweise „N/A“
    -   service\_classification (Business vs. Technical vs. Application)
    -   business\_owner, it\_owner, supported\_by (Assignment-/Support-Gruppe)
    -   life\_cycle\_stage (Plan, Deliver, Operate, Retire)
    -   **Offerings**: Veröffentlichungsstatus, anforderbar (J/N), Kontaktkanäle (Tags)
-   **Server/VMs**
    -   install\_status (Installed/Operating), operational\_status, manufacturer, model\_id, os\_version, location, owned\_by, managed\_by
-   **Software Instance (MID)**
    -   discovery\_source (z. B. ServiceNow), version, host\_name-Beziehung, Zeitplan/Fähigkeiten über Tags
-   **Beziehungen**
    -   Beziehungen zu **Retired**/gelöschten CIs vermeiden; **Runs on/Hosted on/Depends on** vollständig und korrekt halten

**Wie sich dies auf Ihr beschriebenes Szenario abbilden lässt**

-   **Vier Instanzen & Produkte** → erfasst als **Application Services pro ENV** und verknüpft mit **Business Services/Offerings**.
-   **ESM/CSM-Nutzung** → Business Services mit Offerings; Offerings **depend on** App Services.
-   **SecOps** → Business Service (IT Security (SecOps)) mit Offering, **depends on** ServiceNow ITSM/Now Assist – PRD (wenn Sie SecOps als eigenen App Service modellieren, ServiceNow SecOps – PRD ergänzen).
-   **Now Assist & AIOps** → ServiceNow Now Assist – <ENV> und Offering IT Operations – Event/AIOps Processing, das **depends on** AIOps Event Sources – IT4IT Tools.
-   **Identitäts- & HR-Integrationen** → Technical Services (Azure AD, Workday, Saviynt), verknüpft über Depends on von den App Services.
-   **Tägliche Synchronisierung PRD→Non-Prod** → explizites Depends on von Non-Prod-App-Services zu einer PRD-Funktionalität „Identity Sync“ (Technical Offering oder App Service).
-   **SSO mit Azure AD** → App Services **depend on** Identity & Access – Azure AD.
-   **Virtual Agent (Teams)** → Offering ESM – Virtual Agent (Teams) **depends on** ServiceNow Now Assist – PRD + Collaboration – Microsoft Teams (Virtual Agent).
-   **MID Server auf zwei Windows-VMs** → Software Instances **Run on** den beiden Servern; App Services (insb. ITOM) **depend on** die jeweilige MID-Instanz.

**// ENDE DER ERSTEN ANTWORT //**

## Der Dialog mit ChatGPT ging weiter

Bis hierhin gar nicht so schlecht, oder? Dann begann ChatGPT, mir Fragen zu stellen, und ich habe alle mit „Ja“ beantwortet, nur um zu sehen, was erzeugt würde:

-   Wenn Sie möchten, kann ich eine CSV (oder eine Excel-Datei) mit allen Zeilen (Name, Tabelle/Klasse, Umgebung, Owner und die exakten Beziehungspaare) erzeugen, die Sie importieren oder als Build-Checkliste verwenden können.
-   Möchten Sie, dass ich zusätzlich ein zweites Tabellenblatt mit den Beziehungspaaren (Von CI → Beziehung → Zu CI) erzeuge, sodass Sie die vollständige Verdrahtungskarte für cmdb\_rel\_ci zur Hand haben?
-   Soll ich beide Datensätze in eine einzige Excel-Arbeitsmappe mit zwei Tabellenblättern (CIs, Beziehungen) exportieren, damit Sie sie direkt als Ladeplan verwenden können?
-   Soll ich zusätzlich Spalten für Owner / Support-Gruppe / Lifecycle-Phase mit Platzhaltern vorausfüllen, damit Sie die Governance-Details vor dem Import ergänzen können?
-   Soll ich zusätzlich ein drittes Tabellenblatt mit einem Data Dictionary (Definitionen jeder Tabelle/Klasse und jedes Beziehungstyps) erzeugen, damit die Datei vollständig selbstdokumentierend ist?
-   Möchten Sie, dass ich zusätzlich ein visuelles Unified-Map-Diagramm (aus diesen Beziehungen) erzeuge, damit Sie die Architektur auf einen Blick zeigen können?
-   Soll ich zusätzlich eine PowerPoint-Version dieses Diagramms vorbereiten, damit Sie es direkt in Stakeholder-Präsentationen verwenden können?
-   Soll ich zusätzlich eine zweite Folie hinzufügen, die die CI-Kategorien (Business Services, Offerings, App Services, Technical Services, Infra) mit Anzahlen zusammenfasst, damit die Stakeholder sowohl ein Bild als auch eine Legende erhalten?
-   Möchten Sie, dass ich zusätzlich eine Legendenfolie hinzufüge, die die Farbcodierung erklärt (Business Service = hellblau, Technical Service = violett usw.), damit das Diagramm in Präsentationen leichter lesbar ist?
-   Möchten Sie, dass ich zusätzlich eine fünfte Folie einfüge, die die nächsten Schritte / Empfehlungen hervorhebt (z. B. Governance-Felder ergänzen, Beziehungen validieren, Abgleich mit dem TBM-Kostenmodell)?
-   Möchten Sie, dass ich zusätzlich eine kurze Executive-Summary-Folie (1–2 Sätze pro Thema) vorbereite, die Sie als schnelles Briefing für das Senior Management verwenden können?
-   Soll ich zusätzlich eine einseitige Infografik (PNG) erstellen, die diese ganze Geschichte zum schnellen Teilen über Teams oder E-Mail zusammenfasst?
-   Möchten Sie, dass ich zusätzlich eine PDF-Version im Posterformat (A3-Layout) erstelle, damit sie ausgedruckt oder in Workshops geteilt werden kann?
-   Möchten Sie, dass ich zusätzlich eine Checklisten-Excel-Tabelle (Import-Runbook) erstelle, die Sie Ihren Admins übergeben können, damit diese den Prozess Schritt für Schritt befolgen können?

Die Fragen waren nett, aber die gelieferten Antworten entsprachen leider nicht meinen Ansprüchen. In dieser Hinsicht ist ChatGPT kläglich gescheitert. ChatGPT sagte:

> An diesem Punkt verfügen Sie nun über ein vollständiges Toolkit:
> 
> -   *Daten (CIs + Beziehungen) in Excel/CSV*
> 
> -   *Um Governance angereichertes Modell*
> 
> -   *Vorlagen für Transform Maps*
> 
> -   *Definitionen der Beziehungstypen*
> 
> -   *Unified-Map-Diagramm, Infografik, Poster und PowerPoint-Präsentation*
> 
> -   *Importverfahren + Runbook-Checkliste*
> 
> Möchten Sie, dass ich zusätzlich einen kurzen Entwurf für eine Confluence-/SharePoint-Seite vorbereite, die Sie intern veröffentlichen können, um dieses Modell zu erläutern und alle Ergebnisse zu verlinken?
