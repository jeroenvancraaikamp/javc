---
title: "Wie Sie Innovation und Wartung der ServiceNow-Plattform steuern"
excerpt: "Ich werde häufig gefragt, wie sich die ServiceNow-Plattform am besten managen lässt. In der Regel empfehle ich das folgende Grundkonzept und passe meine Empfehlung anschließend an Zweck und Zielgruppe an:"
source: "c4a9356f8a3fc895"
---

Ich werde häufig gefragt, wie sich die ServiceNow-Plattform am besten managen lässt. In der Regel empfehle ich das folgende Grundkonzept und passe meine Empfehlung anschließend an Zweck und Zielgruppe an:

### 

-   Lassen Sie zunächst die empfohlenen Grundsätze bis auf CIO/CTO-Ebene bestätigen.

-   ServiceNow ist eine Plattform, die marktübliche Standardpraktiken out of the box ermöglicht.
-   Die Plattform ist (von ServiceNow) vorkonfiguriert, um die dokumentierten Prozesse einschließlich ihrer definierten Rollen, Abläufe und Kennzahlen zu unterstützen.  
    Das Unternehmen übernimmt die ServiceNow-Praktiken und deren Rollen, statt die Plattform bzw. die Praktiken anzupassen und so Legacy-Praktiken fortzuführen.
-   Die Plattform unterstützt eine Mischung aus Marktstandards (z. B. IT4IT, ITIL, SAFe, SCRUM usw.), ist aber – als Mischung – nicht mehr zu 100 % konform mit den ursprünglichen Standards.
-   Die Konfiguration der Out-of-the-Box-Plattform und ihres Datenmodells ist zulässig, sofern eine solche Konfiguration begründbar ist und von der benannten Design Authority genehmigt wurde.
-   Die Plattform einschließlich ihrer Anwendungen und Module wird für den vorgesehenen Zweck und von der vorgesehenen Zielgruppe genutzt, wie in der Dokumentation festgelegt.
-   Die Plattform wird mindestens einmal pro Jahr (vorzugsweise zweimal pro Jahr) aktualisiert, und zwar 4 Monate nach der allgemeinen Verfügbarkeit des Major Platform Release.
-   Die Nutzung bzw. das Upgrade von Out-of-the-Box-Integrationen wird der Erstellung und Pflege kundenspezifischer Integrationen vorgezogen.
-   Der Zugriff auf die Plattform und die darin enthaltenen Daten ist dokumentiert (rollenbasierter Zugriff), autorisiert und wird verwaltet.
-   Die Plattform ist (bzw. wird) gemäß vereinbarten Coding Best Practices konfiguriert.
-   Das Unternehmen hält die vertraglichen und gesetzlichen Verpflichtungen sowie die geltenden Unternehmensrichtlinien und -standards ein, die für die Plattform gelten.

-   Stellen Sie anschließend sicher, dass Konsens über die **Aufteilung der Verantwortlichkeiten** besteht.

-   -   Das ServiceNow-Team stellt die Best-Practice-Prozesse einschließlich der SAAS-Plattform bereit, die diese ermöglicht.
    -   Das ServiceNow-Team integriert die ServiceNow-Plattform innerhalb der Sicherheits- und Architekturvorgaben mit anderen IT4IT-Plattformen.
    -   Das ServiceNow-Team unterstützt die Linienorganisation bei der Einführung der Prozesse und schult lokale Champions.
    -   Das ServiceNow-Team leistet Second-Level-Support sowohl für die Prozesse als auch für die Plattform.
    -   Die regionale Linienorganisation benennt Prozessmanager, die die Prozesse in der Region steuern und koordinieren.
    -   Die lokale Linienorganisation stellt geschulte bzw. qualifizierte Fulfiller bereit, die die Prozesse ausführen.
    -   Der Service Desk leistet First-Level-Support für die Plattformnutzer.

### 

-   Die **Innovation der Plattform** wird in ServiceNow mittels Agile Management gesteuert (wir essen unser eigenes Hundefutter).

-   -   Die Plattform hat einen (1) Platform Owner, der von einem Platform Architect unterstützt wird. Für beide wird empfohlen, dass sie unter der Führung des Unternehmens stehen.
    -   Der Platform Owner ist für die Plattform und die unterstützten Prozesse verantwortlich, einschließlich Budget, Einhaltung von Richtlinien, Verträgen, Teamkompetenzen und Personalstärke.
    -   Vierteljährlich definiert und pflegt der Platform Owner gemeinsam mit den ServiceNow-Product-Ownern die Themes und Epics für die Produkte auf der Plattform.  
        Der Platform Owner stimmt die Themes (deren Budget und Priorität) mit den Business Stakeholdern und den Sponsoren der Plattform-Themes ab.
    -   Der Platform Owner kann die Entwicklung und Implementierung eines bestimmten Themes im Rahmen eines Statement of Work auslagern, das auf einer Erfolgsverpflichtung beruht.
    -   Der Platform Architect pflegt ein übergeordnetes technisches Design bzw. eine Roadmap für die Plattform und stimmt vorgesehenen Zweck, vorgesehene Zielgruppe und Plattformintegrationen mit Domain- bzw. Enterprise-Architekten, Risk- bzw. Compliance-Officern und der IT-Sicherheit ab.
    -   Die Plattform besteht aus mehreren definierten Anwendungen (z. B. ITSM, ITOM, IRM, CSM, ESM, NOW usw.), die zu Produkten gebündelt werden können. Jedes Produkt hat einen Product Owner, dem die spezifischen Themes, Epics und Stories des Produkts gehören. „NOW“ ist die Plattform einschließlich der Funktionen, die von mehreren Produkten gemeinsam genutzt werden.
    -   Product Owner sammeln Verbesserungsanfragen von Stakeholdern (d. h. Was?) und wandeln sie – gemeinsam mit dem DevOps-Team – in Stories um (d. h. Wie?).
    -   Die Product Owner stimmen eingegangenen Projektbedarf und Verbesserungsanfragen mit den zuständigen Process Ownern und dem Solution Architect ab.
    -   Die Process Owner definieren die unterstützten Prozesse (bzw. deren Änderungen), einschließlich der zugehörigen KPIs, Richtlinien, Verfahren und Leitlinien.
    -   Die Stories werden von einem einzigen DevOps-Team geliefert und integrationsgetestet, das alle Produkte weiterentwickelt und wartet.
    -   Die gelieferten Stories werden von den Product Ownern im Namen (oder gemeinsam mit) Vertretern der ServiceNow-Community abgenommen.

### 

-   Die **Wartung der Plattform** erfolgt über die implementierten ITSM-Prozesse (wir trinken unseren eigenen Champagner).

-   Der (lokale/regionale) Service Desk, der die lokale Community betreut, ist die erste Anlaufstelle für (Major) Incidents im Zusammenhang mit ServiceNow.
-   Die (lokalen/regionalen) Prozessmanager konsultieren den Process Owner zur Auslegung und Verbesserung der Prozessunterlagen.
-   Bei einem Major Incident mit ServiceNow steuern bzw. koordinieren die Major Incident Manager des Unternehmens die Behebung des Ausfalls.
-   Das ServiceNow-Team leistet Second-Level-Support für Prozessmanager und Service Desks.
-   Die Now Platform wird (ein- oder zweimal jährlich) aktualisiert. Der Product Owner der NOW Platform ist verantwortlich für das Upgrade der NOW Platform, das vom DevOps-Team durchgeführt wird. Betroffene ServiceNow-Product-Owner stellen sicher, dass ihre Produkte vor dem Produktiv-Release Regressionstests und Abnahmetests durchlaufen und – falls nötig – korrigiert werden.

### 

-   Die unterstützten Prozesse werden von der lokalen/regionalen Linienorganisation eingehalten und gesteuert.

-   Die Linienorganisation besetzt die definierten Prozessrollen mit angemessen qualifizierten bzw. zertifizierten Mitarbeitenden.
-   Gemeinsam mit den (lokalen/regionalen) Prozessmanagern stellen die Process Champions sicher, dass die Prozesse und Arbeitsanweisungen übernommen werden.
-   Die Prozess-Fulfiller halten sich an die implementierten Prozesse und die lokalen Arbeitsanweisungen.
-   Die (lokalen/regionalen) Prozessmanager überwachen Prozesseinhaltung, -leistung und -reife und setzen bei Bedarf Verbesserungen um.
-   Der (lokale/regionale) Prozessmanager und die Process Champions leisten First-Level-Prozesssupport für die Fulfiller an ihrem Standort bzw. in ihrer Region.

### 

-   Unternehmen wird empfohlen, eine Governance zu definieren und zu vereinbaren:

-   -   Platform Ownership, einschließlich Stakeholdern, regelmäßigen Meetings, Agenda/Themen (z. B. Architektur, Integrationen, Vision, Plattform-/Prozess-Roadmap)
    -   Strategisches Management, einschließlich Stakeholdern, regelmäßigen Meetings, Agenda/Themen (z. B. Themes, Epics, Prozessleistung, Projekte)
    -   Taktisches Management, einschließlich Stakeholdern, regelmäßigen Meetings, Agenda/Themen (z. B. Verbesserungen, Prozessdesign, KPIs, PPIs)
    -   Operatives Management, einschließlich Stakeholdern, regelmäßigen Meetings, Agenda/Themen (z. B. Fehler, Kennzahlen, Datenqualität usw.)

## Hinweise:

-   Eine Person kann mehr als eine der oben genannten Rollen ausüben, sofern sie für die Ausübung der Rolle(n) angemessen qualifiziert bzw. geschult ist.

-   In der Regel kann ein Product Owner mehrere (ähnliche) Produkte verantworten, insbesondere wenn es sich bei den Stakeholdern um dieselben Personen handelt.
-   Platform Owner, Product Owner und Platform Architects sollten angemessen geschult sein und mindestens 3–5 Jahre Erfahrung mit der Plattform haben.
-   DevOps Engineers müssen von ServiceNow für die Produkte zertifiziert sein, an denen sie arbeiten.

-   Großunternehmen wird empfohlen, Plattformlizenzen direkt bei ServiceNow zu beschaffen und so einen Partner-Lock-in zu vermeiden.
-   Viele Unternehmen lagern Innovation und Wartung der ServiceNow-Plattform und der unterstützten Prozesse teilweise aus.
    -   Das Outsourcing von Platform Owner, Platform Architect und Product Ownern wird nicht empfohlen.
    -   Das Outsourcing von Process Ownern und Prozess-Fachexperten wird nicht empfohlen.
    -   Der Second-Level-Plattformsupport kann ausgelagert werden, insbesondere wenn die Plattform weltweit oder rund um die Uhr (24x7) unterstützt werden soll.
    -   Das Outsourcing von DevOps wird empfohlen, wenn ServiceNow als Commodity-SAAS-Plattform eingestuft wird.
-   Davon abgesehen können Unternehmen von der Erfahrung Dritter bei der Definition und Implementierung der Prozesse und ihrer Rollen profitieren.

-   Es wird dringend empfohlen, das Ziel-Betriebs- und Sourcing-Modell so früh wie möglich festzulegen, damit es während der Transition berücksichtigt werden kann.
-   Während der Transition können interne Ressourcen eingestellt bzw. benannt und vom Implementierungspartner geschult bzw. gecoacht werden.

## Als Bild sieht das Ganze so aus:

![](/wp-content/uploads/2024/11/SN-Operating-Model-1.png)
