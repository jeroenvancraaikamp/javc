---
title: "CSDM5 in 10 Minuten erklärt …"
excerpt: "Es gibt Hunderte von Interpretationen des ServiceNow Common Service Data Model (CSDM). In diesem Artikel erfahren Sie, wie CSDM5 in ServiceNow verstanden und implementiert wird. Unterschiedliche Blickwinkel, unterschiedlicher Fokus. ServiceNow betrachtet alle Portfolios als"
source: "e667ca0e6ed5a861"
---

Es gibt Hunderte von Interpretationen des ServiceNow Common Service Data Model (CSDM). In diesem Artikel erfahren Sie, wie CSDM5 in ServiceNow verstanden und implementiert wird.

Unterschiedliche Blickwinkel, unterschiedlicher Fokus.

-   Programm-/Projektmanager verwalten das **Projekt-/Demand-Portfolio.**
-   Enterprise Architects verwalten das **Applikationsportfolio**
-   Product Owner verwalten das Backlog für ihre Komponenten im **Produktportfolio**
-   Service Owner verwalten ihre Artefakte im **Serviceportfolio**
-   Configuration Manager erfassen ihr IT-Inventar in der **Configuration Management Database** (CMDB)
-   Asset Manager erfassen Buchwert, Betriebskosten, Standort sowie Eigentümer/Nutzer ihrer ****Financial Assets.****
-   Master Data Stewards pflegen **grundlegende, portfolioübergreifende Daten** in verschiedenen Tools.

**ServiceNow betrachtet alle Portfolios als Teil des Digital Product Portfolio des Unternehmens** und verwaltet sie mit Digital Portfolio Management (DPM). Unter der Haube von DPM werden jedoch die einzelnen Portfolios, spezifischen Praktiken und Applikationsmodule verwendet. Das heißt: Sie können in ServiceNow kein IT Service Management betreiben, wenn Sie nicht (das Management) ein(es) Serviceportfolio(s) in ServiceNow implementieren.

> Heutzutage werden die verwalteten Portfolioelemente von ihren Stakeholdern (in den verschiedenen Portfolios) manuell gepflegt, und erstellte Komponenten (gespeichert in technologiespezifischen Repositories) werden über automatisierte Pipelines bereitgestellt. Die bereitgestellten Elemente werden automatisch erkannt und in der CMDB erfasst, und zugehörige Assets werden automatisch angelegt/aktualisiert. Bereitgestellte Elemente können technisch getaggt werden, sodass nicht-technische Attributwerte automatisch erkannt werden können und eine manuelle Aktualisierung der CMDB nicht mehr erforderlich ist.

Konzepte, die vor zehn Jahren in vielen Unternehmen verwendet wurden, sind heute nicht mehr anwendbar, z. B.:

-   **Automated Discovery und Federation** im IT Operations Management haben den manuellen Configuration-Management-Prozess abgelöst
-   Applikations-/Produkt-/Servicedaten, die regelmäßig bestätigt und überprüft werden müssen, werden in Portfolios abgelegt und über Praktiken des **Digital Portfolio Management** verwaltet.
-   Assets, einschließlich ihres Status, Eigentümers, Nutzers, ihrer Kosten und ihres Standorts, werden über Hardware/Software/Cloud **Asset Management** verwaltet.
-   **Agile DevOps** hat Teile von ITIL Change Management und Problem Management ersetzt bzw. verändert.
-   **Security Operations** (für Produktions- wie Nicht-Produktionselemente) ist für Unternehmen erfolgskritisch geworden.
-   Unternehmen müssen zunehmend gesetzliche Vorgaben einhalten, z. B. zu **Datenschutz, Risiko und Compliance** (für Nicht-Produktions- und Produktionselemente)
-   **Cloud Computing** ist zum Standard geworden. Cloud Services werden (von DevOps-Tools) über APIs angefordert und automatisch bereitgestellt.
-   **Künstliche Intelligenz** verändert grundlegend, wie Menschen IT verwalten, steuern und nutzen.

In CSDM5 wurden folgende Artefakte definiert:

-   **Business Applications** sind grobgranulare Produkte, die **Business Capabilities** bereitstellen und deren Lebenszyklus, autorisierte Nutzung und Roadmaps verwaltet werden müssen.  
    Eine Business Application existiert nur einmal im Portfolio und kann mehrere Produktinstanzen haben, die als separate Service Instances modelliert werden.  
    
-   **Components** sind feingranulare Produkte, die Teil einer Applikation sind und über DevOps-Praktiken entwickelt und gewartet werden.
-   **Services** werden von Providern bereitgestellt und von Consumern genutzt und können mit Applikationen oder anderen Produkten in Beziehung stehen.  
    Ein **Business Service** unterstützt Geschäftsergebnisse direkt und ist für das Business bzw. die Endanwender sichtbar.  
    Ein **Technical Management Service,** der der IT gehört, unterstützt einen oder mehrere Business Services, ist für das Business aber nicht direkt sichtbar.
-   **Service Offerings** sind Varianten von Services (z. B. für unterschiedliche Regionen/Zeitzonen, unterschieden nach Produktion/Nicht-Produktion usw.), jeweils mit eigenen Zusagen und/oder unter Einsatz verschiedener Teams.
-   Eine **Service Instance** ist ein bereitgestelltes Element, das im Rahmen eines oder mehrerer Service Offerings unterstützt wird und mit einem Produkt oder einer Applikation in Beziehung steht. Z. B. eine Website, eine API usw.
-   Das **Service Delivery System** ist eine Sammlung einzeln erkannter/verknüpfter Configuration Items, von denen die Service Instances abhängen können.
-   **Assets** sind Finanzdatensätze einzelner Elemente, die beschafft oder bereitgestellt wurden, im Hauptbuch des Unternehmens geführt werden und/oder für die Lizenzen zu zahlen sein können. Assets gehören zu einem Asset Model. Z. B. ist die auf einem bestimmten PC erkannte Instanz von NotePad++ ein Asset des Software Asset Model „Notepad++“.

**Hinweise:**

-   Innerhalb von CSDM5 **beschränken sich Business Applications auf solche, die Geschäftsergebnisse direkt unterstützen und für das Business bzw. die Endanwender sichtbar sind**. Für jede Applikation im Portfolio muss ein CIA-/BIA-Assessment erstellt und regelmäßig überprüft werden. Zusätzlich müssen für jede Applikation Rollen definiert und über Identity and Access Management einzelnen Benutzern zugewiesen werden.
-   Der oben genannte Verwaltungs-/Governance-Aufwand ist für die Tausenden von PC-/Mobile-Softwarepaketmodellen, die ein Unternehmen nutzt, nicht zu rechtfertigen; daher werden diese **Softwarepakete (bzw. -modelle) nicht als Applikationen betrachtet**. Stattdessen erfasst Software Asset Management die Software Assets, einschließlich der Anzahl der genutzten Instanzen.
-   **Manche Unternehmen entscheiden sich, alle technischen Tools, Middleware, DBMS und sonstige Systemsoftware als Business Applications zu erfassen**. Diese Applikationen unterstützen Geschäftsergebnisse jedoch nicht direkt und sind für das Business bzw. die Endanwender oft unsichtbar. Dies kann eine akzeptable Vorgehensweise sein, wenn der Verwaltungs-/Governance-Aufwand in Kauf genommen wird und diese technischen Applikationen denselben Richtlinien unterliegen wie die Business Applications. Alternativ kann man die technischen Applikationen im Portfolio registrieren, sie aber von der für Business Applications geltenden Governance ausnehmen.
-   Eine „as a Service“ bereitgestellte Applikation kann als Business Application erfasst werden, wenn ihr Lebenszyklus vom Unternehmen verwaltet wird und sie denselben Richtlinien unterliegt wie andere Applikationen. **Wird eine Lösung als Service genutzt, ihr Lebenszyklus aber vom Anbieter verwaltet, gilt diese Lösung als Service, nicht als Applikation.**
-   **Public-Cloud-Plattformen wie Azure, OCI, AWS und GCP werden als Service** von einem Provider **genutzt**, der Roadmap und Lebenszyklus der technischen Plattform verwaltet. Solche Plattformen gelten als Services, nicht als Applikationen.
-   **Unternehmen können eigene Applikationen auf Plattformen erstellen/pflegen, die sie als Service nutzen**. Z. B. wird SAP S/4 HANA als Service von SAP bezogen, und (ein Partner von) dem Unternehmen erstellt dafür kundenspezifische Konfigurationen/Workflows. Grobgranulare Applikationen, die von (einem Partner von) dem Unternehmen erstellt werden, können als Applikationen registriert werden; ihre Konfigurationen/Skripte/APIs gelten als Components.
-   Da Veränderung die einzige Konstante ist, empfiehlt es sich, **marktübliche Taxonomie und Stammdaten** aus einer maßgeblichen Quelle **zu übernehmen**, die idealerweise herstellerunabhängig ist und von einem Governance-Gremium aktuell gehalten wird. Z. B. pflegt das TBM Council ein gutes Taxonomiemodell mit sofort nutzbaren und klar definierten Daten.

**Zur Klarstellung**:

-   **Assets** sind in ISO-27000, ISO55000, IFRS/GAAP und anderen formalen Frameworks anders definiert bzw. abgegrenzt als in ITSM/ITIL.
-   ServiceNow unterscheidet zwischen **Service Instances** (die von Consumern genutzt werden) und **Configuration Items** (die eine oder mehrere Service Instances unterstützen können).

-   Für Service Instances kann man ihre Beziehung zu Foundational Data registrieren. Configuration Items sollten in ServiceNow nicht von Menschen angefasst werden
-   Benutzer können Incidents/Problems/Changes zu Service Instances erfassen, die mit Offerings verknüpft sind, auf die sie Anspruch haben, aber nicht unbedingt zu Configuration Items.

-   Das **CSDM muss Informationen über Produktionselemente, aber auch über Nicht-Produktionselemente abbilden**. Allerdings können sich die Offerings und Zusagen der Provider für beide Umgebungen unterscheiden, und einige Praktiken (z. B. Change Management) gelten nur für Produktions-Offerings.
-   Jeder IT4IT-Anbieter verwendet für seine Plattform eigene Terminologie und Definitionen. Da eine Unternehmenspraktik nur auf einer unternehmensweiten Plattform implementiert werden sollte, **ist die Verwendung herstellerspezifischer Terminologie/Definitionen (z. B. Best-Practice-Prozessleitfäden, Video-Tutorials, Community-Artikel, die auf die Plattform abgestimmt sind) sinnvoll**. **Definitionen/Terminologie aus veralteten und/oder inkompatiblen Frameworks zu übernehmen, ist nicht sinnvoll.**

**Beispiele:**

-   **Portfolios:** „ERP Applications“, „Public Cloud Services“, „ERP Service Instances“, „End-User Services“; „GitLab Components“
-   **Business Applications:** „SAP S/4 Hana Platform“, „SAP ERP Application“, „SAP CALM Application“, „ServiceNow Platform“, ServiceNow ITSM/ITOM/ITAM“, „Workday“.
-   **Technical Applications:** „Intune“, „JAMF“, „Cisco Works“, „SQL Server 2016“ , „SQL Server 2022“, „.NET 4“, „Python 7“, „MuleSoft“, „Tibco“  
    
-   **Components:** „SN MidServer“, „JAVASCRPT X V93.47“, „AI Agent Y“
-   **Services:** „Database Support“, „Middleware Support“, „PC Support“, „Windows Server/VM Support“,
-   **Offerings:** „Database \[EMEA, PROD\]“, „Database \[LATAM, PROD\]“, „Database \[EMEA, NON-PROD\]“, „Windows PC \[NL\]“, „IT Service Management \[PROD\]“,  
    „Windows VM \[AZURE\]“,„Windows VM \[OCI\]“, „Windows VM \[AWS\]“
-   **Service Instances:** „PRD.Service-Now.com“, „DEV.Service-Now.com“, „SQL-Server@VM2028038“, „API-32312“
-   **Assets/Service Delivery Systems:** „PC21213“, „MasterDB@SQL-Server@VM2028038“, „Jeroens iPhone“
-   **Asset/Product Model:** „Windows 11 Operating System“, „Notepad++“; „Calculator 7.5.3“, „Dell 7534 Laptop“, „SQL Server 2021“

**Was wird wo verwendet?**

**![](/wp-content/uploads/2025/09/CSDM5_core_objects.png)**

ITSM-Prozesse wie Incident, Change und Problem Management beziehen sich auf Folgendes:

-   Die **Service Instance**, die vom Incident, Change oder Problem betroffen ist
-   Das **Service Offering**, das die Zusagen und Subscriptions umfasst, die für diese (und ähnliche andere) Service Instances gelten
-   Den **Service**, von dem das Offering eine Variante ist (d. h. das übergeordnete Element des Service Offering)
-   Das **Service Delivery System (auch** **Configuration Item/Asset),** das die Service Instances unterstützt und direkt dem Benutzer zugewiesen ist (z. B. PC/Telefon des Benutzers).  
    
-   Die **Assignment Group** des Providers und **den Assigned Agent,** die für die Bearbeitung des Change, Incident oder Problem verantwortlich sind.
-   Den **Consumer** (inkl. zugehöriger Daten wie Unternehmen, Standort usw.), der vom Change, Incident oder Problem betroffen ist.

Auch andere, nicht-ITSM-Praktiken stellen Anforderungen an das CSDM, selbst wenn diese Praktiken nicht in ServiceNow implementiert sind:

-   **Enterprise Architects** müssen wissen, wie viele Instanzen ihrer Portfolioartefakte noch bereitgestellt sind bzw. genutzt werden.
-   **SecOps** benötigt Informationen über Schwachstellen in allen Umgebungen, nicht nur in Produktionsumgebungen.
-   **DevOps** muss Standort und Versionen der bereitgestellten Komponenten ermitteln können.
-   **Projekte** müssen wissen, welche bereitgestellten APIs, Microservices, AI Agents usw. verfügbar sind und genutzt werden können.
-   **Transition Manager** müssen den aktuellen Zustand bzw. die Mengen kennen, die sie überführen müssen.
-   **Financial Asset Manager** müssen wissen, welche Assets/Lizenzen von wem genutzt werden und/oder welche zurückgewonnen werden können, weil sie nicht mehr genutzt werden.
-   **Identity and Access Manager** müssen wissen, für welche Elemente man Zugriff (nicht mehr) anfordern bzw. autorisieren darf.
-   **Risikomanager** müssen wissen, ob die erkannten Konfigurationen den Richtlinien und autorisierten Baselines entsprechen.
-   **Künstliche Intelligenz** muss die relevanten Elemente der IT-Infrastruktur kennen, einschließlich ihrer Abhängigkeiten und wer sie wofür nutzt.
-   **HR-Manager und Linienvorgesetzte** müssen wissen, welche Rollen, Assets und Identitäten ihren Mitarbeitenden zugewiesen wurden.
-   **End-User-Device-Manager** müssen wissen, wie viele Geräte jedes Alters bzw. jeder Version noch im Einsatz sind.
-   **Service Delivery Manager** müssen wissen, welche Services sie von ihren Partnern beziehen.
