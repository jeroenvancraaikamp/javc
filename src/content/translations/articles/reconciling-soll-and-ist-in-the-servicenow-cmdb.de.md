---
title: "Autorisiert oder nicht? SOLL und IST in der ServiceNow CMDB abgleichen"
excerpt: "Die CMDB erfasst, was vorhanden ist, nicht, was genehmigt wurde. Um zu sehen, was vom Autorisierten abweicht, benötigen Sie den genehmigten Zustand separat registriert und eine Routine, die beide in beide Richtungen vergleicht. Dieser Artikel zeigt in vier Schritten, wie das geht."
source: "29a240ea977ab204"
---

Jede Organisation fragt, ob eine Änderung erlaubt ist, bevor sie live geht. Deutlich seltener wird hinterher gefragt, ob das, was läuft, auch dem entspricht, was erlaubt wurde.

In ServiceNow ist diese zweite Frage schwer zu beantworten, weil die CMDB durch Discovery und Integrationen befüllt wird: Sie erfasst, was vorhanden ist, nicht, was genehmigt wurde. Wer die CMDB mit der Realität vergleicht, vergleicht Beobachtung mit Beobachtung. Um zu sehen, was vom Autorisierten abweicht, benötigen Sie den genehmigten Zustand separat registriert und eine Routine, die beide in beide Richtungen vergleicht. Dieser Artikel zeigt in vier Schritten, wie das geht, und endet damit, wie Risk Officers, Change Manager, DevOps- und Security-Engineers eine gemeinsame Sicht erhalten.

## Das Problem: Die CMDB zeigt, was ist, nicht, was autorisiert wurde

SOLL und IST sind deutsche Begriffe, die in der niederländischen IT gebräuchlich sind: das Soll und das Ist.

| Begriff | Bedeutung | Quelle in ServiceNow |
| --- | --- | --- |
| SOLL | Was sein soll: genehmigte Changes, Standards, Design, Verantwortlichkeiten | Change Requests, Desired-State-Templates, Servicemodell, Reconciliation Rules |
| IST | Was ist: die beobachtete Konfiguration | Discovery und Integrationen, in die CMDB geschrieben |
| War | Was es früher war und wer oder was es geändert hat | Änderungshistorie, Quelle pro Attribut, abgeschlossene Change Requests |

Ändert jemand einen Server außerhalb des Prozesses, überschreibt der nächste Discovery-Lauf die CMDB, die die Abweichung nun als Tatsache zeigt. Ist der genehmigte Zustand nicht anderswo registriert, ist der Nachweis verloren. SOLL und IST driften auseinander durch nicht autorisierte Änderungen, anders als genehmigt umgesetzte Änderungen, genehmigte, aber nie umgesetzte Änderungen, CIs, die niemand beantragt hat, und fehlerhafte Daten.

## Schritt 1: Registrieren, was sein soll

„Autorisiert“ bedeutet mehrere Dinge, daher hat SOLL mehrere Orte. Registrieren Sie jedes dort, wo die Plattform es vergleichen kann.

| Art von SOLL | Wo registrieren |
| --- | --- |
| Genehmigter Change: welches CI sich wann und wie ändern darf | Change Request: Affected CIs, geplantes Zeitfenster, genehmigter Umfang |
| Dauerhafter Standard: wie ein CI immer aussehen muss | Desired State: ein Filter plus ein Template mit Attribut- und Beziehungsbedingungen |
| Beabsichtigte Struktur: welche CIs welchen Service unterstützen | CSDM-Servicemodell: Business Application, Application Service, Service Instance |
| Maßgebliche Quelle: wer welches Attribut schreiben darf | Reconciliation Rules in der Identification and Reconciliation Engine (IRE) |
| Bestätigte Fakten: Eigentümer, Standort, Support-Gruppe | Data Certification, mit dem CI-Eigentümer als Bestätiger |

Der Change Request ist am wichtigsten, weil er das einzige SOLL ist, das konkret und an ein Zeitfenster gebunden ist. In der Praxis:

- **Zuerst der Umfang.** Wählen Sie die kontrollierten Klassen und Attribute und beginnen Sie mit Produktiv-CIs hinter kritischen Services.
- **Der Change trägt Details auf CI-Ebene.** Verlangen Sie Affected CIs und erfassen Sie beabsichtigte neue Werte in strukturierter Form. Letzteres ist eine Design-Ergänzung, zum Beispiel eine kleine verknüpfte Tabelle (CI, Attribut, von, nach).
- **Eigentümer registrieren.** Aufgaben, Benachrichtigungen und Reviews setzen pro CI einen Eigentümer und eine Support-Gruppe voraus.
- **„Durch einen Change abgedeckt“ definieren.** Zum Beispiel: Das CI ist ein Affected CI eines Changes im Status Implement, innerhalb seines geplanten Zeitfensters. Ohne diese Definition kann niemand sagen, was „nicht autorisiert“ bedeutet.

## Schritt 2: Wissen, was ist und was war

Ein Vergleich ist nur so gut wie seine IST-Seite, die aktuell, zuordenbar und historisiert sein muss:

- **Aktuell.** Discovery muss die CIs im Umfang oft genug erfassen, passend zu Ihrer Erkennungszeit. Ein CI, das länger nicht gesehen wurde, ist eine IST-Lücke, nicht „keine Änderung“. Überwachen Sie die Discovery-Gesundheit so sorgfältig wie den Vergleich.
- **Zuordenbar.** Mit Reconciliation Rules hat jedes Attribut genau einen maßgeblichen Schreiber. Eine Abweichung ohne bekannten Schreiber ist das stärkste Zeichen für eine nicht autorisierte Änderung oder eine unkontrollierte Integration.
- **Historisiert.** Discovery heilt die CMDB und löscht damit den vorherigen Wert. Ohne Historie sehen Sie, dass ein Wert falsch ist, aber nicht, wann er sich geändert hat, und können ihn daher keinem Change-Zeitfenster zuordnen.

### Echte Änderungen erkennen, wenn jedes CI täglich neu erfasst wird

Werden CIs täglich neu erfasst, ändert sich das Datum „zuletzt erfasst“ bei jedem CI jeden Tag. Verwenden Sie „aktualisiert am“ nicht, um echte Änderungen zu finden. Das Plattform-Audit erfasst ein Feld nur, wenn sich sein Wert ändert; das Volumen folgt also den echten Änderungen plus diesem Heartbeat. Bei Hunderttausenden CIs in Hunderten Tabellen ist es weder nötig noch bezahlbar, alles zu verfolgen. Begrenzen Sie den Umfang daher in Stufen:

| Stufe | Was | Wie Sie Änderungen erkennen | Historie |
| --- | --- | --- | --- |
| 1 | Kritische Klassen, mit einigen Dutzend kontrollierten Attributen und Beziehungen | Eine Änderungsquelle, siehe unten | Ja |
| 2 | Weitere CIs, die Ihnen wichtig sind | Desired-State-Audits vergleichen den aktuellen Zustand mit der Regel | Nicht nötig |
| 3 | Der Rest | Außerhalb des Umfangs | Keine |

Wählen Sie für Stufe 1 pro CI-Gruppe eine Änderungsquelle:

- **Ereignisse für nicht autorisierte Änderungen, für CIs in Application Services.** Das Ereignis ist der Nachweis der Änderung, eine Historienabfrage ist also nicht nötig. Prüfen Sie, dass das tägliche Discovery-Datum nicht als Änderung zählt und welche Klassen auf der Positivliste stehen, denn diese Liste bestimmt Ihren Umfang.
- **Ein schlankes Änderungsprotokoll,** von einer Business Rule oder einem Flow auf den kontrollierten Attributen geschrieben: CI, Attribut, alter Wert, neuer Wert, Quelle, Zeitstempel.
- **Ein täglicher Fingerprint:** ein Hash pro CI über die kontrollierten Attribute und zugehörigen Elemente, nur bei Änderung gespeichert.
- **Die Plattform-Audit-Tabelle, nur für Fragen zu einzelnen CIs.** Sie ist groß, für Abfragen über den gesamten Bestand langsam und voller Heartbeat-Einträge. Wenn Sie sie nutzen, beenden Sie das Auditieren des Felds „zuletzt erfasst“.

Messen Sie das Volumen zunächst in einem Pilot. Zwei Grenzen bleiben: Bei täglicher Discovery ist eine Änderung, die zwischen zwei Läufen vorgenommen und zurückgenommen wird, unsichtbar, und die erfasste Zeit ist der Zeitpunkt der Discovery. Nutzen Sie daher Quellzeitstempel wie ein Installationsdatum, wo es sie gibt.

## Schritt 3: Die Differenz finden

Der Vergleich läuft in beide Richtungen: Realität, die nicht autorisiert war, und Autorisierung, die nicht zur Realität wurde. Sechs Fälle decken das ab.

| Fall | Was Sie sehen | Klassifizierung |
| --- | --- | --- |
| 1 | IST entspricht SOLL | Konform |
| 2 | IST geändert, und ein aktiver Change deckt das CI ab | Change in Arbeit; SOLL wird beim Abschluss fortgeschrieben |
| 3 | IST geändert, kein Change deckt das CI ab | Nicht autorisierte Änderung |
| 4 | Ein Change deckt das CI ab, aber IST weicht vom Genehmigten ab | Abweichende Umsetzung |
| 5 | Ein Change ist abgeschlossen, aber IST zeigt keine Änderung | Autorisiert, aber nicht umgesetzt |
| 6 | Ein CI existiert ohne Eigentümer, Service, Antrag oder Change | Nicht registriertes CI |

Die Fälle 4 und 5 vergessen Teams am häufigsten, weil nichts kaputtgeht, wenn ein genehmigter Change nie umgesetzt wird. Drei Erkennungen decken alle sechs ab:

1. **Erkennung nicht autorisierter Änderungen (ereignisgesteuert).** Sieht Discovery eine Änderung einer CI-Eigenschaft, prüft das System die erlaubten Klassen, den Ignorierzeitraum für Benachrichtigungen und ob ein aktiver Change Request das CI abdeckt. Ist es nicht abgedeckt, löst es ein Ereignis ci.change.unplanned aus und erstellt, bei aktivierter Ereignisverarbeitung, einen als nicht autorisiert markierten Emergency Change ([Dokumentation](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)). Dafür ist die Service-Mapping-Integration nötig, es werden nur CIs in Application Services geprüft, und die Ereignisverarbeitung ist standardmäßig deaktiviert.
2. **Desired-State-Audits (geplant).** Ein Filter, ein Template mit den erwarteten Attributen und Beziehungen und ein Audit, das fehlerhafte CIs einzeln auflistet und Folgeaufgaben erzeugt ([Dokumentation, Zurich](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)). Nutzen Sie es für dauerhafte Regeln und für CIs außerhalb von Application Services.
3. **Change-zu-IST-Verifikation (ein Design, das Sie ergänzen).** Ein geplanter Vergleich, der IST-Änderungen außerhalb jedes Change-Zeitfensters findet sowie abgeschlossene Changes, deren Affected CIs nach der Discovery nach der Umsetzung nicht die geplanten Werte zeigen. Das sind die Fälle 3, 4 und 5.

<figure>
  <img src="/images/reconciling-soll-and-ist-diagram.svg" alt="Diagramm: SOLL und IST speisen drei Erkennungen, und jeder Befund landet in einer Liste von Differenzen" />
  <figcaption>SOLL und IST speisen alle drei Erkennungen, und jeder Befund landet in einer Liste, klassifiziert nach den sechs Fällen.</figcaption>
</figure>

## Zwei Sonderfälle

### Softwareänderungen auf einem Server, nicht am Server

Ein aktualisiertes Paket auf einem Windows-Server ändert einen verknüpften Datensatz, nicht die eigenen Attribute des Servers; ein Vergleich der Serverattribute sieht daher nichts. Vergleichen Sie auf Host-Ebene und urteilen Sie nach Risiko: Ein Herstellerpatch, der eine Schwachstelle schließt, ist eine Abweichung, die das Risiko senkt, während ein nicht genehmigtes Remote-Access-Tool Aufmerksamkeit verdient, obwohl der Serverdatensatz unberührt aussieht.

Registrieren Sie Software-SOLL als Regel, nicht als exakte Versionen: pro Serverrolle die genehmigten Produkte, den Hersteller, die Mindestversion und den Update-Pfad, als Desired-State-Template. Bewerten Sie jede Softwareänderung der Reihe nach: durch einen aktiven Change abgedeckt, innerhalb der Baseline oder sonst ein Befund mit Risikoscore.

| Beobachtete Änderung | Behandlung |
| --- | --- |
| Neuere Version eines genehmigten Produkts, vom genehmigten Hersteller | Erwartete Drift: als Information erfassen und Patch-Zyklen durch einen Standard Change abdecken |
| Version außerhalb der Regel (Downgrade, nicht genehmigte Major-Version) | Befund zur Prüfung: Ein Downgrade kann eine bekannte Schwachstelle wieder einführen |
| Genehmigtes Produkt entfernt oder deaktiviert (zum Beispiel ein Security-Agent) | Hohe Priorität |
| Neues Produkt, das nicht auf der Baseline steht | Nicht autorisiert; höhere Priorität bei Tools mit Fernzugriff, Administratorrechten oder offenen Ports |

Vergleichen Sie anhand von normalisiertem Produkt, Hersteller und Version und verdichten Sie Befunde pro Host, denn ein Patch-Zyklus berührt Dutzende Pakete pro Server.

### Wenn diejenigen, die SOLL registrieren, nicht das IST erzeugen

Risk Officers und Architekten registrieren SOLL, während Entwickler das IST in feinem Detail erzeugen, etwa Container-Pods. Die erste Gruppe kann nicht jeden Pod beurteilen, und die zweite sollte ihre eigene Arbeit nicht autorisieren. Registrieren Sie SOLL daher auf der Ebene, die jede Gruppe beurteilen kann, und lassen Sie die Pipeline das Detail tragen:

- **Policy** (Risk Officers, Architekten): Risikoklassen, erlaubte Registries, verbotene Einstellungen, Servicegrenzen.
- **Guardrails** (Plattformteam): genehmigte Basis-Images, Zuordnung von Namespace zu Service, Admission-Regeln.
- **Deklarierter Zustand** (Entwickler): Manifeste, Image-Digests und Stückliste pro Release.

Machen Sie das Release zur autorisierten Einheit, nicht den Pod: Die Pipeline erfasst jedes Release als Change mit Digests, Testnachweisen und Genehmigungen. Definieren Sie „nicht autorisiert“ als fehlende Herkunft: eine Workload ohne Pipeline-Eintrag, eine nicht genehmigte Registry, ein Digest, der vom Release abweicht, oder eine verbotene Einstellung. Leiten Sie Befunde an das Entwicklerteam weiter, dem der Namespace gehört, geben Sie Risk Officers Aggregate und Ausnahmen und verlangen Sie Peer Review in der Pipeline, damit die Genehmigung unabhängig vom Umsetzenden erfolgt. Was Ihre Instanz vergleichen kann, hängt davon ab, ob Kubernetes Discovery und die DevOps-Integration im Einsatz sind.

## Schritt 4: Abgleichen

Jede Differenz wird durch eine von vier Entscheidungen geschlossen, die der CI-Eigentümer trifft, nicht das Tool:

| Entscheidung | Wann | Was Sie tun |
| --- | --- | --- |
| Realität korrigieren | Die Änderung soll nicht bestehen bleiben | Über einen Incident oder korrigierenden Change zurücknehmen; Discovery bestätigt das IST |
| Nachträglich genehmigen | Die Änderung ist akzeptabel, wurde aber nicht autorisiert | Den Emergency Change nach Prüfung genehmigen, das Post-Implementation Review abschließen, SOLL aktualisieren |
| Daten korrigieren | Die CMDB ist falsch, nicht die Realität | Das Discovery-Pattern, die Quelle oder die Regel korrigieren; den Wert nicht von Hand ändern |
| Ausnahme akzeptieren | Eine bekannte Abweichung wird für eine Zeit toleriert | Eigentümer, Grund und Ablaufdatum erfassen |

Ein nie umgesetzter Change wird entweder abgeschlossen oder storniert, mit dem Vermerk, dass SOLL nicht mehr gilt. Ein nicht registriertes CI wird registriert oder entfernt. Vier Regeln halten den Kreislauf ehrlich:

- **Kopieren Sie IST nie automatisch nach SOLL.** Das macht jede Abweichung mit dem nächsten Lauf autorisiert.
- **Ein Audit-Datensatz pro Differenz,** mit verknüpfter Behebung.
- **Schließen durch erneute Messung:** Die nächste Discovery oder das nächste Audit zeigt IST gleich SOLL, oder eine genehmigte Ausnahme greift.
- **Fristen setzen und zurückspielen.** Eskalieren Sie an das Change Advisory Board (CAB), wenn die Zeit abläuft, und behandeln Sie wiederkehrende Differenzen als Prozesslücke.

## Eine Wahrheit, viele Blickwinkel

Dieselbe Differenz bedeutet für jeden Stakeholder etwas anderes. Führt jede Gruppe ihre eigene Liste, widersprechen sich die Listen, und niemand traut einer von ihnen.

| Stakeholder | Was eine Differenz bedeutet | Zu beantwortende Frage |
| --- | --- | --- |
| Risk Officer | Ein unbeherrschtes Risiko, ein mögliches Kontrollversagen | Wie viele nicht autorisierte Abweichungen sind in kritischen Services offen, und seit wann? |
| Change Manager | Der Prozess wurde umgangen, oder ein genehmigter Change wurde nicht umgesetzt | Welche Abweichungen haben keinen Change, und welche abgeschlossenen Changes wurden nicht verifiziert? |
| DevOps-Engineer | Drift vom deklarierten Zustand | Was weicht für meinen Service ab, und was soll ich tun? |
| Security-Engineer | Eine größere Angriffsfläche | Welche Hosts tragen nicht genehmigte oder ungeschützte Elemente, nach Exposition geordnet? |
| Asset Owner | Weniger Kontrolle über die eigenen Assets | Welche Differenzen warten auf meine Entscheidung? |
| Auditor | Fehlende Nachweise | Können Sie Erkennung, Entscheidung und Abschluss für jede Abweichung belegen? |

Eine Single Source of Truth bedeutet hier einen Ort, an dem man fragt, mit nachvollziehbarer Herkunft pro Fakt, nicht eine einzige Datenbank. Vier Prinzipien erreichen das:

1. **Ein gemeinsamer Differenzdatensatz.** Normalisieren Sie die Ausgabe der drei Erkennungen in einen Datensatztyp: CI, Service, Fall (1 bis 6), Risikoscore, Status, Entscheidung, Eigentümer, Change-Verknüpfung und Zeitstempel. Standard-ServiceNow erzeugt getrennte Datensätze, daher ist dies eine Design-Ergänzung, die auf sie verweist.
2. **Ein Vokabular und ein Risikoscore.** Dieselben sechs Fälle, Schweregrade, Status und Entscheidungen für alle. Bilden Sie den Score aus Servicekritikalität, Art der Abweichung, Exposition wie offenen Schwachstellen und Alter.
3. **Verknüpfen über CI-Identität und Servicehierarchie** (Business Application, Application Service, CI), damit ein Risk Officer und ein DevOps-Engineer denselben Befund auf unterschiedlichen Ebenen sehen.
4. **Pro Rolle eine Sicht und eine Aktion, keine Kopie,** mit den Nachweisen im Datensatz für den Audit-Zeitraum.

Die Spannung zwischen DevOps-Geschwindigkeit und Risikokontrolle wird in der Policy-Ebene entschieden, durch die genehmigte Baseline und vorab genehmigte Standard Changes, nicht von Fall zu Fall. Wo Gruppen uneins sind, entscheidet die Baseline, und der Ausnahmeprozess dokumentiert jede Abweichung.

## Erste Schritte

Bauen Sie die Kontrolle in vier Schritten auf, von denen jeder für sich nützlich ist:

1. **Fundament:** Umfang, Verantwortlichkeiten, die Definition von „durch einen Change abgedeckt“ und verpflichtende Affected CIs.
2. **Erkennen:** Aktivieren Sie die Erkennung nicht autorisierter Änderungen einschließlich Ereignisverarbeitung und führen Sie die ersten Desired-State-Audits durch.
3. **Verifizieren:** Ergänzen Sie die Change-zu-IST-Prüfung und eine Discovery nach der Umsetzung, damit die Fälle 4 und 5 sichtbar werden.
4. **Abgleichen und berichten:** das Entscheidungsmodell, Fristen, Ausnahmen und Kennzahlen.

Geben Sie jedem Teil einen Verantwortlichen: Der Configuration Manager verantwortet die SOLL-Register, der CI-Eigentümer entscheidet pro Differenz, Change Manager und CAB prüfen nicht autorisierte Änderungen, und der Plattformverantwortliche sorgt für den Betrieb von Erkennung und Discovery-Abdeckung. Verfolgen Sie einige Kennzahlen: den Anteil der CIs im Umfang mit Eigentümer, Service und Template; nicht autorisierte Änderungen pro Zeitraum; den Anteil abgeschlossener Changes, die im IST verifiziert wurden; die Zeit von der Erkennung bis zum Abschluss; und Ausnahmen, die über ihr Ablaufdatum hinaus offen sind, was null sein sollte. Für ein SOC-2-Type-II-Audit ist diese Abfolge der Nachweis; der Vergleich muss also kontinuierlich laufen, und seine Ausgabe muss aufbewahrt werden.

Fallstricke, die Sie vermeiden sollten:

- Mit allen Klassen und Attributen zu beginnen oder die Historie jedes Attributs in jeder Tabelle zu verfolgen: Das ist teuer und größtenteils Rauschen.
- Die Erkennung einzuschalten, die Ereignisverarbeitung aber deaktiviert zu lassen, sodass nichts erzeugt wird.
- Die CMDB als SOLL zu behandeln, was den Vergleich zirkulär macht.
- Sich nur auf die Standardfunktion zu verlassen, die CIs in Application Services und durch Discovery sichtbare Änderungen abdeckt.
- Abzugleichen, indem SOLL mit IST überschrieben wird.

## Quellen und Hinweise

- [Unauthorized change request, ServiceNow-Dokumentation](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)
- [Desired State, ServiceNow-Dokumentation (Zurich)](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)

Die beiden Seiten beschreiben die Standardfunktionen. Die geplanten Werte am Change, der Change-zu-IST-Vergleich, der gemeinsame Differenzdatensatz, das Änderungsprotokoll und der Fingerprint sowie der Ausnahmedatensatz sind Design-Empfehlungen, keine Standardfunktionen. Prüfen Sie Audit-Einstellungen, Software Asset Management, Vulnerability Response, Kubernetes Discovery und die DevOps-Integration anhand Ihrer eigenen Instanz.
