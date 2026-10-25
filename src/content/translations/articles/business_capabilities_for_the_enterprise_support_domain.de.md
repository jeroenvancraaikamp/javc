---
title: "Business Capabilities für die Enterprise-Support-Domäne"
excerpt: "Am Jahresende blicken manche zurück und – was noch wichtiger ist – manche nach vorn. Ich habe beides getan. Beim Blick zurück fiel mir auf, dass sich viele darüber beklagen, für ihre IT4IT-Investitionen keinen angemessenen Gegenwert zu erhalten. Nach zwei Jahrzehnten hat Gartner die Veröffentlichung des"
source: "e67b5e029c99e0fa"
---

Am Jahresende blicken manche zurück und – was noch wichtiger ist – manche nach vorn. Ich habe beides getan.

Beim Blick zurück fiel mir auf, dass sich viele darüber beklagen, für ihre IT4IT-Investitionen keinen angemessenen Gegenwert zu erhalten. Nach zwei Jahrzehnten hat Gartner die Veröffentlichung des Magic Quadrant für ITSM-Tools eingestellt. Configuration Management (als Prozess zur Pflege der CMDB-Inhalte) wird heute nur noch selten manuell durchgeführt oder über Change Management gesteuert. Stattdessen werden CMDB-Inhalte zunehmend über Discovery und Federation gepflegt – die Zero-Touch-CMDB ist zum Standard geworden. Wenn Code heute automatisch generiert, integriert, getestet und in eine Public Cloud deployt wird, ist der Bedarf an Change Management nicht mehr derselbe wie 2007 (als ITIL V3 erschien) oder selbst 2019 (als ITIL V4 erschien). Allerdings bin ich im vergangenen Jahr auch auf Unternehmen gestoßen, die in der Enterprise-Support-Domäne noch kaum oder gar keine Automatisierung, Integrationen oder KI im Einsatz haben. Für sie war ITIL V4 (2019) ein guter (erster) Ansatz.

2024 konzentrierte sich ServiceNow darauf, KI auf seine Plattform zu bringen – für alle, die bereit waren, dafür zu bezahlen. Damit lassen sich alle Arten von Anfragen, Fragen, Bestellungen und Nachrichten von Einzelpersonen bearbeiten und über automatisierte Workflows verarbeiten. Generative KI wird eingesetzt, um Antworten an Benutzer zu erstellen und die Interaktion mit den Benutzern in „Tickets“ zusammenzufassen bzw. zu übersetzen.

Bis 2025 werden die Large Language Models, die nur vordefinierte Informationen liefern konnten, durch Artificial General Intelligence (AGI) abgelöst, die in der Lage ist, zu schlussfolgern und ihre Antworten auf Basis von Beobachtungen und Erfahrungen anzupassen. KI-Agenten werden für bestimmte Aufgaben eingeführt (z. B. zur Unterstützung von IT-Hilfe- und Wissensanfragen oder zur Buchung von Räumlichkeiten) und erweitern ihren Nutzen damit über die IT hinaus. Diese KI-Agenten in ServiceNow werden mit Benutzern interagieren, Betriebs- und CMDB-Daten der Plattform nutzen und über alle Unternehmensfunktionen hinweg mit APIs, Microservices und anderen KI-Agenten zusammenarbeiten.

Während sich ServiceNow auf KI konzentrierte, hat die IT-Community andere DevOps-Tools und -Praktiken übernommen und nahtlos integriert. Infolgedessen ist die IT-Tool-Landschaft der meisten Unternehmen äußerst vielfältig geworden. Jedes Unternehmen nutzt inzwischen seine eigene Auswahl an Tools, die auf bestimmte Capabilities zugeschnitten sind, wobei manche Tools mehrere Capabilities abdecken.

Bis zum Ende dieses Jahrzehnts sollten Enterprise Architects die folgenden **Business Capabilities innerhalb der Enterprise-Support-Domäne** unterscheiden. Sie umfassen auch moderne Capabilities, die in traditionellen Frameworks wie DevOps, DevSecOps, ITIL, SAFe usw. nicht enthalten sind. Nach meinem besten Wissen überschneiden sich diese 15 Capabilities nicht und sind zukunftssicher (zumindest bis 2030) – unabhängig davon, welche Praxis Ihr Unternehmen anwendet und auf welche es künftig umstellt (selbst auf solche, die es heute noch nicht gibt):

1.  KI-gestütztes Employee Engagement und Collaboration
2.  Planung/Roadmap (OKRs, Projektportfolio)
3.  Architektur und Design (digitales Produktportfolio)
4.  CMDB/SCM (Service, Asset & Configuration)
5.  Entwicklung (Build & Test)
6.  Security/Privacy (Schwachstellen & Datenverlust)
7.  Identity & Access (SSO, RBAC, Berechtigungen)
8.  Deployment (Integrate & Deliver)
9.  Betrieb (Observe/Respond)
10.  Human Capital (auch Human Resources)
11.  Workplace Services, OT & Facilities
12.  Finanzen, Recht & Supply Chain
13.  Integriertes Risikomanagement und Business Continuity (auch Governance, Risk & Compliance)
14.  KI-gestütztes Customer Engagement\*
15.  Field Service & Dispatch\*

\* Hinweis: „KI-gestütztes Customer Engagement“ und „Field Service & Dispatch“ sind Capabilities mit Ausrichtung auf externe Kunden (auch Customer Service, CSM). Manche Unternehmen schließen sie aus den Enterprise-Support-Capabilities (ESM) aus, während andere ESM und CSM aufgrund ihrer technologischen Ähnlichkeit lieber zusammen betrachten (z. B. ist der Einsatz eines Außendiensttechnikers beim Kunden dem Einsatz eines Außendiensttechnikers in einem Büro des eigenen Unternehmens recht ähnlich, insbesondere wenn der Außendienst ausgelagert ist).

> **Jede der 15 ESM/CSM-Business-Capabilities wird nur von einer begrenzten Anzahl von Plattformen unterstützt werden. Was früher von einer einzigen Plattform abgedeckt wurde (z. B. Mitarbeiterportal, ITSM und CMDB), wird sich wahrscheinlich auf mehrere Plattformen verteilen. Spezialisierte vertikale KI-Agenten werden jeweils eine Business Capability ermöglichen. Unternehmen werden unterschiedliche Entscheidungen darüber treffen, welche Plattform welches Anbieters von wem und bis wann genutzt wird, um welche Business Capability bereitzustellen. Hat ein Unternehmen Innovation und Wartung ausgelagert, können einige der Business Capabilities von den Managed Service Providern bereitgestellt werden (oder in deren Leistung enthalten sein).**

IT-Lösungen für HR, Finanzen, Recht, Supply Chain und Risikomanagement werden häufig nicht von der Unternehmens-IT ausgewählt, verantwortet oder gepflegt. In der obigen Abbildung sind diese Nicht-IT-Capabilities daher grün markiert. Nicht-IT-Capabilities außerhalb der Enterprise-Support-Domäne zu managen, fordert Probleme oft geradezu heraus. So ist beispielsweise die L3-Capability „Joiner, Mover & Leaver (JML)“ Teil der L2-Capability „Human Capital (HCM)“. JML ist ohne automatisierte Schnittstellen zu Capabilities, die nicht von HR bereitgestellt werden (z. B. „Identity & Access“, „Security/Privacy“, „Integriertes Risikomanagement“ und „Finanzen, Recht & Supply Chain“), nahezu unmöglich. Andererseits ist es vermutlich auch keine gute Idee, die IT HR-Verträge oder arbeitsrechtliche Streitigkeiten verwalten zu lassen :-)

Ich empfehle Organisationen, es einfach zu halten und diese Level-2-Business-Capabilities (L2) zu übernehmen, wenn sie ihre Architektur für die gesamte (L1-)Enterprise-/Customer-Support-Domäne planen und gestalten. Für die meisten Capabilities (z. B. 1, 2, 3, 4, 10, 11, 12, 13, 14 und 15) ist es in der Regel sinnvoll, so wenige IT-Lösungen wie möglich einzusetzen. Bei eher technischen Capabilities ist es oft sinnvoll, die jeweils am besten geeigneten Tools für bestimmte Technologien zu verwenden.

Derzeit bieten 528 Anbieter über 700 Tools mit Capabilities für die Enterprise-Support-Domäne an. Die meisten dieser Tools konzentrieren sich typischerweise auf nur eine der oben genannten L2-Business-Capabilities.

Theoretisch kann ServiceNow 11 der Business Capabilities bereitstellen. In der Praxis nutzen etwa 50 % der Unternehmen ServiceNow nur für drei oder vier der genannten Capabilities. Nur wenige Unternehmen nutzen dieselben Capabilities, und vermutlich hat keines sie identisch implementiert. ServiceNow ist auch nicht das einzige Tool, das für eine Capability eingesetzt wird. Wird die CMDB beispielsweise per Federation aus INTUNE befüllt, stellt INTUNE CMDB/SCM-Capabilities bereit. Ebenso sind GitHub und JFROG Artifactory beliebte Komponenten-Repositories (SCM) im DevSecOps-Umfeld, die sich mit den CMDB-Inhalten in ServiceNow oft kaum überschneiden.

Legacy-Frameworks wie ITIL V3/V4 sind mit modernen, automatisierten DevSecOps- und KI-Praktiken nicht kompatibel. Grundsätzlich gilt es als Good Practice, sicherzustellen, dass eine Plattform nur von ihrer vorgesehenen Zielgruppe für ihren vorgesehenen Zweck genutzt wird – insbesondere, wenn das Produkt bzw. die Plattform einschließlich der Dokumentation vom Anbieter gepflegt wird. Definitionen und Begrifflichkeiten zu verwenden, die von denen des Plattformanbieters abweichen, führt fast immer zu Verwirrung und Mehrkosten.

Dennoch nutzen viele Unternehmen technische Funktionen einer Plattform für nicht vorgesehene Zwecke oder Zielgruppen. So habe ich beispielsweise Plattformen gesehen, auf denen der Incident-Management-Prozess genutzt wurde, um ein Zurücksetzen des Passworts anzufordern (Begründung: „Ich kann mich nicht anmelden, also muss die IT kaputt sein“). Wird das Ticketsystem dadurch zu einer Identity-and-Access-Management-Plattform? Ich denke nicht. Die Interaktion mit dem Benutzer, der ein neues Passwort benötigt, fällt unter „KI-gestütztes Employee Engagement und Collaboration“, während das eigentliche Zurücksetzen des Passworts zu „Identity & Access (SSO, RBAC, Berechtigungen)“ gehört. Eine Anfrage zum Zurücksetzen des Passworts sollte nicht als Incident erfasst werden.

Ein weiteres Beispiel: Ausfälle oder Performanceprobleme werden unter Umständen automatisch behoben, bevor ein Benutzer sie überhaupt bemerkt. Ist der Ausfall bereits separat über „Observe“ erfasst bzw. gemeldet, ist es fragwürdig, ihn zusätzlich noch einmal als Incident zu erfassen.

**FAZIT:**

Derzeit gibt es kein einzelnes Framework, das alle in der Enterprise-Support-Domäne genutzten Capabilities definiert. D**er beste Ansatz besteht wahrscheinlich darin, die IT-Tools Ihres Unternehmens den oben genannten 15 Business Capabilities zuzuordnen** und anschließend je Capability zu bewerten, ob eine Tool-Rationalisierung oder -Konsolidierung erforderlich oder wünschenswert ist.

Im digitalen Portfolio sollten Architekten dokumentieren, welche der 15 L2-Business-Capabilities jedes Produkt bereitstellt. Zusätzlich sollten der vorgesehene Zweck und die Zielgruppe jedes Produkts dokumentiert werden (z. B. in High Level Designs). Anstatt L3-Capabilities aus einem bestimmten Framework (z. B. ITIL, DevOps, DevSecOps, IT4IT usw.) zu übernehmen, empfehle ich, sich an den Begrifflichkeiten und Definitionen des Anbieters zu orientieren. So können Unternehmen die Dokumentation des Anbieters (und deren Aktualisierungen) konsistent wiederverwenden, die vermutlich zu 100 % mit der kontinuierlich und schnell weiterentwickelten Out-of-the-box-Funktionalität der Plattform übereinstimmt. Darüber hinaus ermöglicht dies Unternehmen, von einem Framework auf ein anderes umzustellen und während der Umstellung beide Frameworks für eine oder mehrere der Business Capabilities parallel zu nutzen.
