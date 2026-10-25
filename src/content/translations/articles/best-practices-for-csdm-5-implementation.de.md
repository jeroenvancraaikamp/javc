---
title: "Best Practices für CSDM 5"
excerpt: "Sie haben also das CSDM 5 gelesen und eine grobe Vorstellung davon. Es gibt jedoch zahlreiche offene Fragen und Entscheidungen. Dieser Artikel beschreibt die Practices, die ich empfehle, um festzulegen, was in ServiceNow modelliert werden sollte (und was nicht). Die Anwendung dieser Empfehlungen"
source: "90864917408791f0"
---

Sie haben also das CSDM 5 gelesen und eine grobe Vorstellung davon. Es gibt jedoch zahlreiche offene Fragen und Entscheidungen. Dieser Artikel beschreibt die Practices, die ich empfehle, um festzulegen, was in ServiceNow modelliert werden sollte (und was nicht). Die Anwendung dieser Empfehlungen vermeidet spätere Probleme.

## Was in ServiceNow gespeichert werden sollte:

### Im Digital Products Portfolio (Baselines):

-   Alle Digital Services, die dem Unternehmen formell als Service angeboten werden, inkl. Infrastruktur, Anwendungen und AI Digital Assets (nicht versioniert).
-   Business Applications, die direkt vom Business genutzt werden (nicht versioniert)
-   IT-Komponenten und Plattformen, die das Business unterstützen (versioniert)
-   Product Models, z. B. für Hardware-/Software-Assets (nicht versioniert)

### In der CMDB (versionierte Instanzen):

-   Infrastruktur des Unternehmens (oder vom Unternehmen verwaltete Infrastruktur)
-   Elemente, die auf der Infrastruktur des Unternehmens bereitgestellt/konfiguriert sind
-   Elemente im Eigentum des Unternehmens, die auf der Infrastruktur Dritter bereitgestellt sind
-   Verbundene Endgeräte, inkl. allem, was darauf installiert ist.
-   Alle (kostenpflichtigen) Lizenzen für Produkt-/Service-Instanzen.

## Was NICHT in ServiceNow gespeichert werden sollte:

-   Zerlegung/Komponenten von Services, die von Dritten erbracht werden, z. B. GSM-Antennen eines Mobilfunkanbieters.
-   Infrastruktur, die integraler Bestandteil eines externen SaaS-/PaaS-Angebots ist.
-   MS-SharePoint-Sites, MS-Teams-Kanäle, Confluence-Sites, Fileshares usw. als Business Applications
-   Portfolio-Elemente, die dem Unternehmen nicht angeboten/bereitgestellt werden, z. B. solche, für die das Unternehmen keine formelle Vereinbarung mit dem Hersteller, Anbieter oder Managed Service Provider hat
-   Portfolio- und CMDB-Elemente, die nicht im Eigentum eines verantwortlichen Vertreters des Unternehmens stehen bzw. nicht von ihm beschafft wurden, z. B. yahoo.com
-   CMDB-Elemente, für die Incident, Problem, Change und Request Management an anderer Stelle von anderen als dem Unternehmen durchgeführt wird.
-   Finanzattribute, die im Hauptbuch des Unternehmens gepflegt werden (z. B. Buchwert, Abschreibung usw.)
-   Elemente, die in den/für die unterstützten ServiceNow Practices nicht benötigt werden
-   Alles, was vom Unternehmen derzeit ausgeschlossen ist, z. B. On-Premise-Server, Strom- und OT-Geräte, inkl. allem, was darauf läuft.

* * *

**ServiceNow als Enterprise-Service-Management-Plattform**

ServiceNow ist eine Plattform für unternehmensweites Service Management. *Services* sind die wichtigsten Artefakte innerhalb der Plattform. Ohne Bezug auf den angebotenen Service lässt sich nicht bestimmen, welches Ergebnis oder welche Zusagen für Incidents, Problems oder Changes gelten. Nur formalisierte Services – idealerweise in einer formellen Vereinbarung zwischen dem Unternehmen und dem Anbieter dokumentiert – sollten in ServiceNow erfasst werden.

Wenn ein Unternehmen die Leistung von Service Providern messen, die Services erfassen möchte, von denen es abhängt, eine Single Source of Truth für alle offenen Vorgänge pflegen oder seine KI-Funktionen zur Bewertung und Klassifizierung von Incidents, Problems oder Changes einsetzen möchte, muss es die von den Anbietern angebotenen Services erfassen. Zugehörige Datensätze (z. B. Incidents und Changes) können per E-Mail oder über APIs automatisch mit dem Service-Management-System des Anbieters per E-Bonding verbunden werden.

* * *

**Application Portfolio und Baselines**

Enterprise Architects (EA) und Application Portfolio Manager (APM) konzentrieren sich auf *Application Baselines*, die vom Business für das Business genutzt werden. Sie steuern den Lebenszyklus dieser Baselines, einschließlich horizontaler Abhängigkeiten (Schnittstellen) und vertikaler Abhängigkeiten (Technologie-Stacks). Sie verwalten oder verfolgen nicht die Bereitstellung von Instanzen dieser Baselines. Sie möchten jedoch wissen, wo die Anwendungen bereitgestellt sind und welche tatsächlichen Abhängigkeiten bestehen.

Das Business Application Portfolio bleibt nur dann handhabbar, wenn es keine Artefakte enthält, die es verunreinigen würden oder die anderen Governance-Modellen unterliegen. Würde man beispielsweise Notepad++ als Business Application erfassen, ergäbe sich daraus die Notwendigkeit von RBAC für den Zugriff, BIA-/CIA-Bewertungen und einem Lebenszyklusplan – und das alles für ein Hilfsprogramm. Da ein typischer PC oder Mac Hunderte solcher Desktop-Apps haben kann, wären EA und APM mit der Verwaltung von Elementen überlastet, die keine echten Business Applications sind. Desktop- und Mobile-Apps werden in der Regel über App Stores oder Endpoint-Manager bereitgestellt und durchlaufen keine Change-Kontrolle.

**Empfehlung:** Nehmen Sie keine Desktop- oder Mobile-Apps in das Business Application Portfolio auf. Wenn ein Element geschäftskritisch ist, sollte es nicht auf einem PC oder Mobilgerät bereitgestellt werden.

* * *

**Versionierung und Discovery**

Application *Baselines* werden im Portfolio nicht versioniert, um exponentielles Wachstum zu vermeiden. Eine Baseline kann mehrere bereitgestellte Instanzen haben, jede mit einer anderen Version. Diese Versionen werden in der Regel automatisch ermittelt und föderiert – ohne manuellen Aufwand. Jede Instanz kann jeweils nur eine Version gleichzeitig ausführen.

Wird APM außerhalb von ServiceNow betrieben, können die Versionszahlen der Instanzen aus ServiceNow in Tools wie SAP LeanIX oder Apptio übertragen werden. Wären Baselines versioniert, müsste bei Upgrades jede Instanz neu zugeordnet werden. Das ist unnötig, es sei denn, die Anwendung und ihre Daten werden grundlegend ersetzt. So rechtfertigt beispielsweise der Wechsel von SAP R/3 zu SAP S/4HANA in der Cloud die Anlage einer neuen Baseline.

* * *

**CMDB und Asset Management**

Bereitgestellte Instanzen von Desktop- und Mobile-Anwendungen sind auffindbar und werden in die CMDB föderiert. Nach Korrelation und Normalisierung unterstützen sie Asset Management, Security Operations und Risikomanagement. Installierte und laufende Komponenten auf Endgeräten erscheinen im *Device Form*. Das *Gerät* und das *Service Offering* sind beide direkt mit dem Incident verknüpft. Sie *können* zwar auf das installierte/laufende Element verweisen, Best Practice ist es jedoch, das *Gerät* als betroffenes CI zu erfassen.

Infrastruktursoftware, Konfigurationseinstellungen, Middleware und technische Tools, die nicht direkt von Benutzern genutzt werden, sollten **nicht** als Business Applications erfasst werden. Ihr Lebenszyklus wird nicht von APM gesteuert, und der Zugriff unterliegt nicht RBAC. Änderungen an der Infrastruktur – etwa das Patchen von Betriebssystemen oder DBMS-Plattformen – betreffen mehrere Business Applications und werden anders behandelt als Änderungen an einer einzelnen Business-Anwendung. Der Ersatz von EOL-Komponenten erfolgt in der Regel im Rahmen groß angelegter Infrastrukturprojekte. Discovery und Föderation helfen dabei, die Versionen und Standorte solcher Elemente zu bestätigen.

In LeanIX werden IT-Komponenten häufig auf Hauptversionsebene versioniert (z. B. *MS SQL Server 2016*). In ServiceNow werden sie in der Regel als nicht versionierte *Service Offerings* erfasst (z. B. *MS SQL Server Support* als Teil des Services *Database Administration*).

* * *

**Externe Infrastruktur und Risikoaspekte**

Wenn Business Applications (oder deren Daten/Komponenten) auf Infrastruktur Dritter bereitgestellt werden, wünschen sich Risiko- und Audit-Stakeholder Transparenz. Es wird empfohlen, Bereitstellungen und Changes, die Anwendungen im Eigentum des Unternehmens betreffen, über die interne Service-Management-Lösung nachzuverfolgen und zu genehmigen.

Fallen für bereitgestellte Elemente Gebühren an, sollten Unternehmen Nutzung und Auslastung aktiv überwachen. Basieren Lizenzkosten auf Nutzungskennzahlen, die über die Anzahl der Installationen hinausgehen, sollten auch diese Kennzahlen überwacht werden.

Anbieter von Blackbox-Services legen nur selten detaillierte Daten zu internen Komponenten offen. Das ist akzeptabel, sofern der Anbieter Verfügbarkeit, Performance und Sicherheit garantiert. Compliance-Nachweise können angefordert werden, ohne die internen Daten des Anbieters in der CMDB des Unternehmens zu speichern – so entfällt die Notwendigkeit, sensible externe Informationen zu pflegen.

Die Erfassung von Elementen, die von Dritten bereitgestellt werden, ohne dass eine formelle Vereinbarung besteht, ist riskant. Der Anbieter ist nicht verpflichtet, das Unternehmen zu unterstützen, Compliance sicherzustellen oder Kontinuität zu gewährleisten. Auditoren und Risikoverantwortliche werden dies voraussichtlich als nicht konform einstufen.

Services, die von Dritten erbracht werden, *müssen* im ServiceNow-System des Unternehmens abgebildet sein, wenn das Unternehmen auf sie angewiesen ist. Verwalten diese Anbieter ihre eigenen Incidents, Problems oder Changes in ihrem eigenen ITSM-Tool, sollten ihre internen Komponenten nicht in der CMDB des Unternehmens dupliziert werden – es sei denn, sie werden unter strenger Governance föderiert, unter Berücksichtigung von Sicherheits-, DSGVO- und Compliance-Aspekten.

* * *

**Umfang und Performance in ServiceNow steuern**

Wird ServiceNow mit unnötigen Details überladen (z. B. Daten auf Dateiebene von Benutzergeräten), leidet die Performance. Es sollten nur Elemente erfasst werden, die für die von ServiceNow oder seinen Stakeholdern unterstützten Practices relevant sind.

Der Aufbau einer CMDB ist ein mehrjähriger Prozess und sollte sorgfältig geplant und priorisiert werden. Konzentrieren Sie sich zuerst auf kritische Elemente. Wird ein Teil des Geschäfts verkauft, kann Discovery in diesem Bereich niedriger priorisiert werden. Transiente Infrastruktur (z. B. temporäre Backup-VMs) sollte nicht erfasst werden, sofern sie nicht dauerhaft genutzt wird. Außer Betrieb genommene Ressourcen sollten umgehend stillgelegt werden. Dokumentieren Sie Umfang und Pläne für Services, Assets und Konfigurationen und überprüfen Sie diese regelmäßig.

* * *

**Moderne Collaboration-Plattformen und ihre Klassifizierung**

Elemente wie SharePoint-Sites, Confluence-Bereiche, Google Workspace und MS-Teams-Kanäle werden in der Regel nicht über Incident- oder Change-Prozesse verwaltet. Daher sollten sie nicht als Business Applications klassifiziert werden. Stattdessen:

-   Erfassen Sie „SharePoint“, „Confluence“ und „MS Teams“ als Business Applications.
-   Erfassen Sie URLs automatisch als *Application Services* per Föderation aus Plattformen wie O365 oder Atlassian.
-   Pflegen Sie einheitliche Klassifizierungs- und Namensstandards.

Hinweis: Manche Auditoren äußern möglicherweise Bedenken gegen den Einsatz solcher Plattformen für geschäftskritische Zwecke.

* * *

**O365 und Collaboration-Agents**

Mail- und Collaboration-Agents (z. B. Outlook- und Teams-Clients) auf Endgeräten sollten wie jede andere Desktop- oder Mobile-App erfasst werden. Incidents sollten für das *Gerät* erstellt werden, nicht für den installierten Agent.

Manche Unternehmen erfassen zentrale O365-Komponenten als Business Applications und wenden dieselben Governance-Richtlinien an. O365-Tenants und -Apps werden jedoch in der Regel zentral gepflegt und unterscheiden sich von gewöhnlichen Business Applications.

**Empfehlung:** Erfassen Sie die *O365 Suite* als eine Business Application. Definieren Sie *Corporate Mail*, *Collaboration* und *Content Management* als Infrastructure Services oder Service Offerings.

* * *

**SDLC-Komponenten und Baselines**

SDLC-Komponenten (in der referenzierten Tabelle nicht aufgeführt) werden in ServiceNow entweder als versionierte Baselines erfasst oder gar nicht. Beide Ansätze haben Vor- und Nachteile (siehe andere Blogbeiträge). Werden sie erfasst, sind diese Komponenten versioniert und können bereitgestellt werden. Ihre Instanzen können über Infrastruktur- oder Cloud-Umgebungen hinweg ermittelt oder föderiert werden.
