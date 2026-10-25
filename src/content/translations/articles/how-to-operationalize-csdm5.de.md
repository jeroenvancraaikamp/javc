---
title: "Wie lässt sich CSDM5 operationalisieren? Von der CMDB als Last zu echtem Geschäftswert"
excerpt: "Branchenzahlen zeigen immer wieder, dass nur rund 25 % der Organisationen einen nennenswerten Nutzen aus ihren CMDB-Investitionen ziehen. In den meisten Fällen wird das CMDB-Datenmodell aus einer überwiegend technischen Perspektive implementiert. Mit zunehmender Komplexität der Technologie-Stacks wird die CMDB"
source: "77ece02808bb738f"
---

Branchenzahlen zeigen immer wieder, dass nur rund **25 % der Organisationen einen nennenswerten Nutzen aus ihren CMDB-Investitionen ziehen**. In den meisten Fällen wird das CMDB-Datenmodell aus einer überwiegend technischen Perspektive implementiert. Mit zunehmender Komplexität der Technologie-Stacks wird die CMDB für Stakeholder aus dem Business immer schwerer verständlich und nutzbar. Die Folgen sind bekannt: Veraltete Betriebsmodelle bleiben bestehen, moderne Praktiken werden nur teilweise übernommen, die Datenqualität sinkt, die Betriebskosten steigen, und der versprochene Nutzen der CMDB bleibt aus.

Die Erfahrung aus CMDB-Initiativen – erfolgreichen wie gescheiterten – zeigt ein durchgängiges Muster: **Ein Mehrwert entsteht nur dann, wenn das Modell einfach gehalten und mit sauberen, zweckgebundenen Daten befüllt wird, ausgerichtet auf eine klar definierte Zielgruppe und sich weiterentwickelnde Use Cases.**

## Sieben Erfolgsfaktoren für die Operationalisierung von CSDM5

Eine wirksame Operationalisierung von CSDM5 hängt weniger vom Tooling ab als von disziplinierten Entscheidungen. Die folgenden Erfolgsfaktoren  
unterscheiden durchweg CMDBs, die Mehrwert liefern, von solchen, die das nicht tun:

1.  **Das digitale Portfolio managen**  
    Ownership, Datenqualität und Abhängigkeiten der gemanagten Elemente des digitalen Portfolios müssen regelmäßig überprüft und auditiert werden. Performance, Kosten, Risiken, Bedrohungen und Schwachstellen der Portfolio-Elemente müssen kontrolliert werden. Die Stakeholder müssen dazu befähigt und motiviert werden.
2.  **Wachstum von Reifegrad und Scope einplanen**  
    Erfassen Sie in jeder (Reife-)Phase nicht mehr (und nicht weniger) als erforderlich. Die Anforderungen aktueller und künftiger Konsumenten von CMDB-Daten sollten Scope und Roadmap bestimmen. Dennoch gilt: Versuchen Sie nicht zu rennen, bevor Sie gehen können – Sie werden fallen. Managen Sie die Erwartungen: Folgen Sie einer Roadmap.
3.  **Wiedererkennbare Portfolio-Elemente verwenden**  
    Services und Applikationen sollten für die Personen verständlich sein, die sie steuern und nutzen. Übernehmen Sie, wo immer möglich, marktübliche Bezeichnungen und Definitionen (z. B. von TBM oder der Open Group), die für interne und externe Stakeholder sowie Auditoren wiedererkennbar sind.
4.  **Datenpflege automatisieren**  
    CMDB-Inhalte sollten durch automatisierte Discovery und Federation der technischen Artefakte gepflegt werden, die den gemanagten Services und Applikationen zugrunde liegen. Halten Sie die Daten je nach Use Cases und Datenkonsumenten periodisch oder nahezu in Echtzeit aktuell.
5.  **Autoritative Quellen respektieren**  
    CMDB-Daten sollten ausschließlich an ihrer Quelle geändert werden. Die CMDB ist nicht länger das alleinige System of Record; sie ist nun einer von mehreren Konsumenten autoritativer Daten. Erkennen Sie Verstöße gegen Health-Policies bei föderierten Daten und weisen Sie Health-Remediation-Tasks automatisch zu bzw. überwachen Sie diese.
6.  **Runtime-Artefakte intelligent taggen**  
    Taggen Sie Runtime-Komponenten so, dass sie Ownership, Commitments, Teams und Ratings automatisch von zugehörigen Portfolio-Elementen erben können – selbst wenn das Runtime-Artefakt selbst (noch) nicht oder nicht mehr in der CMDB erfasst ist.
7.  **Die Nutzung von CSDM-Daten fördern**  
    CSDM-Daten, die nicht aktiv genutzt werden, verursachen Kosten ohne Nutzen. Jeder Datensatz sollte einem definierten Zweck und einer definierten Zielgruppe dienen. Process Owner und Communities müssen über die im CSDM bereitgestellten, nutzbaren Informationen informiert und auf dem Laufenden gehalten werden.

## Wie neue Technologien die CMDB verändert haben

Cloud-Plattformen, Container, Microservices, DevSecOps-Automatisierung und zunehmend agentische KI haben den IT-Betrieb grundlegend verändert. Infrastruktur ist heute dynamisch, kurzlebig und häufig selbststeuernd. Das mindert die Relevanz der CMDB nicht – aber es **verändert ihre Rolle**.

Moderne CMDBs versuchen nicht mehr, jede kurzlebige technische Komponente zu erfassen oder einzelne Runtime-Änderungen zu steuern. Stattdessen konzentrieren sie sich auf:

-   Service-zentrierte Transparenz
-   Stabile Modellierung von Abhängigkeiten
-   Bewusstsein für Risiken und Auswirkungen
-   Kontext zu Ownership und Kontrolle

Indem sie **Business- und Application-Services und deren stabile Beziehungen** modellieren und diese über automatisierte Discovery und Integrationen aktuell halten, können Organisationen weiterhin Auswirkungen bewerten, Risiken managen und operative Resilienz nachweisen – auch wenn sich die zugrunde liegende Technologie fortlaufend ändert.

## Zentrale Objekttypen in CSDM5

![](/wp-content/uploads/2025/12/CSDM5-Operaionalisation-in-ServiceNow-scaled.png)

## CSDM5 unterscheidet eine begrenzte Anzahl klar abgegrenzter Objekttypen, darunter:

-   **Business Applications** – Business-orientierte Produkte, die Business Capabilities bereitstellen
-   **Technical Applications** – Technologie-orientierte Produkte, die technische Capabilities bereitstellen
-   **SDLC Components** – Deploybare Komponenten, die Teil einer Applikation sind
-   **Business Services** – Business-orientierte Services, die Kunden oder Mitarbeitenden angeboten werden
-   **Technology Management Services** – Technologie-orientierte Services, die Service Instances managen bzw. unterstützen
-   **Service Instances** – Logische Abbildungen deployter Stacks, typischerweise ausgerichtet auf DTAP-Umgebungen und/oder Regionen
-   **Dynamic CI Group** – Eine dynamische Gruppe gleichartiger technischer Produkte, die häufig keiner Service Instance zugeordnet sind (z. B. aktive PCs in den Niederlanden)
-   **Service Delivery Systems** – Zusammenstellungen technischer Produkte, die Applikationen und Services unterstützen
-   **Product Models** – Versionierte Modelle entdeckter oder föderierter Hardware- und Softwareprodukte

Alle diese Objekttypen verweisen auf gemeinsame Stammdaten wie Organisationen, Teams, Personen, Standorte und Standards, die typischerweise von zentralen Unternehmensfunktionen oder maßgeblichen externen Institutionen gepflegt werden.

## Die zentrale Rolle der Service Instance

Die **Service Instance** ist derzeit das zentrale Konstrukt in CSDM5. Sie ist der Punkt, an dem Business auf Technologie trifft und an dem Design-Time mit Run-Time verknüpft wird und umgekehrt. Alles oberhalb davon ist Portfolio, alles unterhalb davon ist Technologie. Die Service Instance ist ein umgebungs- bzw. regionsspezifischer Stack deployter technischer Instanzen; dieser Stack ist (Teil) eines angebotenen Service, und mehrere Business Service Offerings können von ihm abhängen.

Für die meisten Organisationen bietet es **das skalierbarste, effizienteste und verständlichste Modell, je deployter Instanz einer logischen Business oder Technical Application eine Service Instance anzulegen.**

Dies ermöglicht:

-   Horizontales Dependency Mapping zwischen Service Instances (z. B. gegenseitige Abhängigkeiten von Applikationsinstanzen zur Laufzeit)
-   Vererbung von Ownership und Attributen von der übergeordneten Application bzw. dem Offering an die zugehörigen Instanzen und Technologien
-   Ausrichtung auf ein einziges Technology Management Service Offering
-   Subscription von Produktionsinstanzen zu Business Service Offerings
-   Mapping der genutzten technischen Produkte (Server, Datenbanken, Cloud-Accounts, Komponenten)

Manche Unternehmen, in denen mehrere Teams oder Dienstleister an derselben Applikation arbeiten, profitieren davon, logische „Produkte“ zu erfassen und zu steuern, die als (Teil eines) Service angeboten werden und jeweils von einem einzigen Team mit einem einzigen Product Backlog gemanagt werden. Ein Wort der Vorsicht: Je nach Art der Modellierung können Kosten, Aufwand und Komplexität schnell aus dem Ruder laufen und die Zufriedenheit der Stakeholder kann sinken, während der Mehrwert des Managements feingranularer Produkte die Nachteile oft nicht rechtfertigt.

Nur Portfolio-Inhalte erfordern eine manuelle Steuerung. Service Instances (einschließlich ihrer zugrunde liegenden, per Discovery erkannten technischen Komponenten) erben Ownership, Commitments, Architekturmerkmale und Supportstrukturen von dem Portfolio-Element, das sie enthält. Werden die Attribute übergeordneter Portfolio-Elemente aktualisiert, werden die administrativen Änderungen automatisch auch auf die untergeordneten Technologien übertragen.

Versionierte, feingranulare Komponenten von Runtime-Applikationen bzw. -Produkten (z. B. Microservices) dürfen niemals als Service Instances erfasst werden; stattdessen können sie in der CMDB erfasst werden (sofern es dafür einen Use Case gibt) und/oder anderweitig beobachtet bzw. orchestriert werden.

Service-Instance-Tags an relevanten technischen Objekten können von Observability-Tools erkannt und/oder als Attribute bereitgestellt werden; jede Instanz ist in einem Offering des Teams enthalten, das sie betreibt, sodass jedes getaggte Element einen Owner, ein Support-Team und Commitments hat. Gleichzeitig können die Service-Instance-Tags auch von Observability-, Orchestrierungs- oder KI-Tools genutzt werden, um gemanagte Attribute und Commitments der Service Instances (etwa den Umgebungstyp) oder zugehöriger Service Offerings aus dem CSDM abzurufen.

Die Überschneidung zwischen Design-Time (Portfolio-Baselines) und kurzlebiger Runtime (Technologie-Instanzen) im CSDM nimmt ab. Dennoch bin ich überzeugt, dass es immer eine gewisse Überschneidung zwischen der designten, der gemanagten und der beobachteten Welt geben wird.

## Befüllung der CMDB: Discovery und Federation

Relevante Service Delivery Systems können durch eine Kombination folgender Verfahren befüllt werden:

-   Credential-less Discovery
-   Credential-basierte Discovery
-   Pattern-basierte Discovery
-   Agent Client Collector
-   Vom Hersteller gepflegte Service Graph Connectors (z. B. AWS, Azure, Intune, O365)
-   Herstellerintegrationen (z. B. SAP-APIs)
-   Individuelle Integrationen, wo unvermeidbar

Der Schwerpunkt liegt auf Automatisierung, Reconciliation und autoritativen Quellen – nicht auf manueller Pflege.

## CMDB-Use-Cases entlang der Wertschöpfungskette

Richtig implementiert, unterstützen CSDM-Daten ein breites Spektrum an Use Cases, darunter:

-   Interaktionen mit Kunden und Mitarbeitenden
-   ITSM-Prozesse (Requests, Incidents, Problems, Changes)
-   Risiko- und Schwachstellenmanagement
-   Ideen, Demands und Portfolioplanung
-   Strategie-, Design- und Build-Aktivitäten
-   Asset- und Lizenzmanagement

Jeder Use Case greift auf andere Weise auf die CMDB zu, doch alle stützen sich auf dasselbe stabile, service-zentrierte Modell.

## Zusammenfassung

In modernen IT-Landschaften dient die CMDB dazu, **autoritativen, service-zentrierten Kontext** bereitzustellen – nicht dazu, mit DevSecOps-Pipelines, Cloud Control Planes, Kubernetes, SDN oder autonomen KI-Systemen zu konkurrieren.

Ihre Entwicklung ist eindeutig: von manuell gepflegten Asset-Inventaren hin zu dynamisch erkannten Servicemodellen, angereichert mit Ownership, Beziehungen und Kontrollkontext. Indem sie sich fortlaufend ändernde technische Komponenten in stabile, auditierbare Servicestrukturen übersetzt, bleibt die CMDB ein Eckpfeiler für Impact-Analysen, Risikomanagement, operative Entscheidungen und regulatorische Nachweisführung – ohne den Versuch, kurzlebiges Runtime-Verhalten zu steuern.

***Pragmatisch operationalisiert ermöglicht CSDM5 Verantwortlichkeit und Resilienz im großen Maßstab – genau dort, wo moderne IT sie am dringendsten braucht.***
