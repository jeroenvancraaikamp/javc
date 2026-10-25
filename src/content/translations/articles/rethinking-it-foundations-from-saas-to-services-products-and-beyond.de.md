---
title: "IT-Grundlagen neu denken: Von SaaS zu Services, Produkten und darüber hinaus"
excerpt: "Seit Jahren verlassen wir uns auf Begriffe wie SaaS, PaaS, IaaS und DCaaS, um zu beschreiben, wie Technologie bereitgestellt wird. Diese Begriffe gibt es noch immer, doch sie bilden die heutige Realität nicht mehr vollständig ab. Warum? Weil Plattformen softwaredefiniert werden, KI-Prompts Softwarecode ersetzen"
source: "b8470d7c67392184"
---

Seit Jahren verlassen wir uns auf Begriffe wie **SaaS, PaaS, IaaS und DCaaS**, um zu beschreiben, wie Technologie bereitgestellt wird. Diese Begriffe gibt es noch immer, doch sie bilden die heutige Realität nicht mehr vollständig ab.

Warum? Weil **Plattformen softwaredefiniert werden, KI-Prompts Softwarecode ersetzen** **und Informationen über mehrere Repositories verstreut sind**, die jeweils die unterschiedlichen Bedürfnisse verschiedener Arten von Stakeholdern bedienen. Um diese Komplexität zu beherrschen, brauchen wir einen schärferen Blick und eine gemeinsame Sprache für die Dinge, die wir teilen.

* * *

### Baselines vs. Instanzen: Zwei verschiedene Welten

In der modernen IT ist es unerlässlich, zwischen **bereitstellbaren Elementen (Baselines)** und **bereitgestellten Elementen (Instanzen)** zu unterscheiden:

-   **Baselines**: Hier werden Entscheidungen zu Strategie, Lifecycle und Roadmap getroffen.
    
-   **Instanzen**: Live-Kopien von Baselines, die sich erkennen lassen und Eigenschaften von ihrer Baseline und ihren Tags erben.
    

Eine Baseline kann viele Instanzen haben, eine Instanz gehört jedoch immer zu genau einer Baseline.

* * *

### Produkte sind keine Services

Allzu oft behandeln wir **Produkte** und **Services**, als wären sie austauschbar. Das sind sie nicht.

-   **Produkte** gehören einem *Product Owner* und bestehen aus einer Sammlung dokumentierter **Komponenten**: Software, Skripte, KI-Prompts, APIs, Plug-ins, Konfigurationen und mehr. Produkte werden von (Teams) einer internen Organisation oder von einem Anbieter/Hersteller definiert, entwickelt und weiterentwickelt. Um für klare Strukturen zu sorgen, werden Produkte per Definition nicht konsumiert.
    
-   **Services** gehören einem *Service Owner* und werden von (Teams) eines Service Providers erbracht und unterstützt. Zusagen, Berechtigungen und Abonnements definiert man für einen Service, nicht für ein Produkt. Services werden von denjenigen konsumiert, die für diesen Service berechtigt sind bzw. ihn abonniert haben.
    

Die Management-Perspektive ist eine andere: Produkte entwickeln sich über **Major-Versionen** weiter, während sich Produktkomponenten kontinuierlich weiterentwickeln; ihre **Minor-Versionen** werden in DevSecOps-Pipelines nachverfolgt, und ihre Instanzen werden als Configuration Items in die CMDB eingespeist. Services werden während ihres gesamten Lifecycles **nicht versioniert**.

Unternehmen pflegen sowohl Service-Portfolios als auch Produktportfolios. Die Service-Portfolios umfassen die Services, die (intern oder extern) für das Unternehmen erbracht werden. Die Produktportfolios bestehen aus digitalen Produkten, die in bzw. auf der Infrastruktur des Unternehmens bereitgestellt werden können, sowie aus Produkten, aus denen die Infrastruktur des Unternehmens besteht, und den Tools, mit denen sie verwaltet wird. Definieren bzw. nutzen Sie separate Produktportfolios für jeden Technology Tower und/oder für jede (verantwortliche) Business-Domäne. Nutzen Sie für intern entwickelte Produkte technologie- oder plattformspezifische Komponenten-Repositories, die in die Deployment-/Provisioning-Pipelines des Unternehmens integriert sind.

* * *

### Configuration Items: Die operative Ebene

Configuration Items (CIs) sind Instanzen von Baselines. In der Regel sind CIs erkennbare Instanzen von Komponenten, wobei auch Instanzen von Services, Offerings und Produkten als CIs betrachtet werden können. Die technischen Merkmale und Abhängigkeiten von CIs lassen sich im Allgemeinen technisch erkennen. Die CIs erben die Attribute – insbesondere ihre verwalteten Attributwerte – von ihrer Baseline. Angenommen, der Owner einer Produkt-Baseline wird aktualisiert: In diesem Fall sollten sich alle Instanzen (der Komponenten) dieses Produkts automatisch ändern, ohne dass ein Change erstellt oder das CI erneut bereitgestellt werden muss.

CIs können getaggt werden. Ein **Tag** liefert für ein bestimmtes CI einen Wert für einen bestimmten **Key**. Beispielsweise hat der Key „Environment“ bei diesem CI den Wert „Production“, und der Key „GitLabID“ bei jenem CI den Wert „e83c5163316f89bfbde7d9ab23ca2e25604af290“. Tags sollten keine Attributwerte enthalten, die über formale Prozesse verwaltet bzw. autorisiert werden (z. B. CIA-Rating, Ownership, Business Criticality usw.). Tags werden zusammen mit dem getaggten CI bereitgestellt und gelten als integraler Bestandteil des CI. Die Aktualisierung eines Tags eines CI wird als Aktualisierung des CI selbst betrachtet, d. h. sie erfolgt über ein erneutes Deployment (des Tags) des CI. Tags können vererbt werden; wird beispielsweise eine Instanz einer Cloud-Ressourcengruppe getaggt, gelten ihre Tags für alle feingranularen Cloud-Ressourceninstanzen in dieser Gruppe, ohne dass jede Cloud-Ressourceninstanz einzeln getaggt werden muss.

* * *

### Assets: Die finanzielle Ebene

Dann gibt es noch **Assets** – eindeutige Geräte oder Lizenzen mit einem Geldwert, die häufig einem Benutzer, einer Kostenstelle, einem Unternehmen, einer Region oder einem Standort zugeordnet sind. Anders als Produkte oder Services existieren Assets in erster Linie für **Nachverfolgung, Compliance und finanzielle Rechenschaftspflicht (CAPEX/OPEX).**

**Asset-Modelle sind keine Produkt-Baselines**; sie sind feste Abbildungen dessen, was das Unternehmen besitzt bzw. nutzt. „Microsoft Visio 2011 Professional“ ist beispielsweise ein Asset-Modell, von dem ein Unternehmen Tausende lizenzierte Instanzen bereitstellen kann. Jede davon als separate Service-Instanz zu registrieren, ist weder praktikabel noch wünschenswert. Stattdessen werden sie als Software-Instanzen registriert. Nicht nur die Software-Instanz, sondern auch ihr Modell wird automatisch erkannt. Dasselbe gilt für Hardware: Sowohl die Hardware-Instanzen als auch ihre Modelle werden automatisch erkannt.

Assets können extern einzeln (z. B. pro Stück) oder in großen Mengen (z. B. pro Palette) beschafft werden. Assets gehören zu einem Typ/Modell und sind typischerweise einzelnen Benutzern und/oder Standorten zugeordnet. Manche Unternehmen erfassen, welche Assets Teil welchen Lieferscheins waren, um detailliert über den Verbleib von Investitionen Rechenschaft ablegen zu können. Nicht alles, was beschafft wird, ist als Asset zu registrieren. Verbrauchsmaterialien oder Artikel mit geringem Euro-Wert werden beispielsweise nicht registriert, insbesondere wenn ihr Verbleib bzw. Status nicht nachverfolgt wird.

* * *

### Services und Service Offerings

Ein **Service** ist eine Blackbox, wenn der Provider Eigentümer der Produkte oder Assets ist, die konsumiert werden. Ist das konsumierende Unternehmen Eigentümer, handelt es sich beim Service eher um eine **Management-Tätigkeit** des Service Providers. In beiden Fällen kommt es auf Ownership und Verantwortlichkeit für die Services sowie für die unterstützten Produkte/Assets an.

Um innerhalb von Services zu differenzieren, verwenden wir **Service Offerings**: Varianten eines Service mit spezifischen Zusagen. So können beispielsweise Produktions- und Nicht-Produktionsumgebungen separate Offerings sein. Sowohl Services als auch Service Offerings sind Baselines und stehen (direkt oder indirekt) mit den Instanzen in Beziehung, für die sie Abdeckung bzw. Support bieten. Es gilt als Good Practice, CIs mit dem Offering zu taggen, unter dem sie (und ihre Child-Elemente) abgedeckt sind.

* * *

### Service-Instanzen

Schließlich sind **Service-Instanzen** die Endpunkte für Produkte, die mehrfach instanziiert werden, z. B. eine Instanz desselben Produkts pro geografischem Gebiet oder pro Organisation oder jeweils eine Instanz für Development, Test, Acceptance und Production.

Beispiele:

-   Ein Workday-SaaS-Produkt ist in die Service-Instanzen Development, Testing und Production aufgeteilt.
    
-   Ein Azure-Tenant oder ein OCI-Compartment ist eine Service-Instanz eines größeren Public-Cloud-Produkts.
    
-   Die URL eines Portals oder einer API ist eine Service-Instanz (eines Produkts), die von einem oder mehreren Service Offerings genutzt werden kann.
    

Typischerweise **sind** **Service-Instanzen** **definierte** **Ausgangspunkte für Discovery** **und operatives Monitoring** und bilden die Abgrenzungspunkte von Services/Offerings.

* * *

### Alles zusammengeführt

Unternehmen müssen ihre IT-Strukturen heute über **Baselines und Instanzen** hinweg neu denken. In der Praxis bedeutet das unterschiedliche Governance-Ebenen, Tools und Verantwortlichkeiten:

-   **Produkt-Baselines** → Governance in Portfolio-Management-Tools
    
-   **Komponenten-Baselines** → Governance in DevSecOps-/SCM-Tooling
    
-   **Service-Baselines** → Governance im Service Portfolio Management
    
-   **Service-Offering-Baselines** → Governance im Service Portfolio Management
    
-   **Service-Instanzen** → Governance im IT Operations Management
    
-   **Asset-Instanzen** → Governance im IT Asset Management
    
-   **CI-Instanzen** → Automatisch erkannt, in der CMDB registriert
    
-   **CI-Tags** → Mit dem CI bereitgestellt, liefern nicht-technische Informationen für (Benutzer der) CMDB.
    

* * *

### Abschließende Gedanken

Die alten Bezeichnungen – SaaS, PaaS, IaaS – sind nach wie vor nützliche Kurzformen, beschreiben aber nicht mehr die Realität softwaredefinierter, KI-getriebener, serviceintegrierter Unternehmen. **Wir sollten uns nicht länger darauf konzentrieren, welche Art von Element als Service geliefert wird, sondern uns vielmehr bewusst machen, dass jedes Produkt als Service angeboten wird (bzw. werden sollte) – entweder einzeln oder als integraler Bestandteil eines größeren Stacks von Services.**

Die Zukunft gehört denen, die den Unterschied zwischen Baselines und Instanzen für Produkte, Komponenten, Assets, Services und Offerings verstehen – und die jedes davon mit den richtigen Menschen, Prozessen und Tools steuern können. Es sollte keine Rolle spielen, um welche Art von Produkt, Komponente, Asset oder Service es sich handelt, solange jeder Artefakttyp auf vergleichbare Weise verwaltet bzw. gesteuert wird (kleinere typspezifische Abweichungen sind akzeptabel). **Idealerweise sollten Baselines von Menschen definiert/registriert/gepflegt und Instanzen von Technologie bereitgestellt/erkannt/registriert werden.**
