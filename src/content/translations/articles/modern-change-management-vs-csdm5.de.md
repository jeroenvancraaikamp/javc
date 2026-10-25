---
title: "Change Management vs. CSDM5"
excerpt: "Der Out-of-the-Box-Change-Management-Prozess von ServiceNow, wie er im Zurich-Release enthalten ist, ist eine Variante von ITIL V3. Dieser Artikel beschreibt im Detail, wie Sie den Change-Prozess so konfigurieren, dass er nahtlos mit DevSecOps zusammenarbeitet und dabei die empfohlenen CSDM5-Beziehungen nutzt. Danach müssen Anwender keine"
source: "184773c52b995380"
---

Der Out-of-the-Box-Change-Management-Prozess von ServiceNow, wie er im Zurich-Release enthalten ist, ist eine Variante von ITIL V3. Dieser Artikel beschreibt im Detail, wie Sie den Change-Prozess so konfigurieren, dass er nahtlos mit DevSecOps zusammenarbeitet und dabei die empfohlenen CSDM5-Beziehungen nutzt. Danach müssen Anwender keine Datenanalysten mehr sein, um die CSDM-Daten im Change Management wie vorgesehen zu nutzen. Anwender können nur Services, Offerings, Instances und CIs auswählen, die in den Geltungsbereich des Change Managements fallen. So ist sichergestellt, dass der Change-Management-Prozess nur relevante Changes steuert und kommuniziert.

Die empfohlene Konfiguration setzt Folgendes voraus:

1.  Die Business- und IT-Architektur wird von Architekten und Business-Analysten definiert und gesteuert.
2.  Das Unternehmen nutzt agile DevSecOps-Praktiken, um Lösungen zu entwickeln, verwendet SCM-Tools, um (versionierten) Code zu registrieren, und setzt CI/CD-Pipelines ein, um diesen zu integrieren und zu deployen.
3.  Das DevSecOps-Team verwendet mehrere Tools, um Laufzeitumgebungen zu überwachen und zu orchestrieren sowie Schwachstellen und Sicherheitsverletzungen zu erkennen.
4.  Die Applikationen und die Infrastruktur werden als Service bereitgestellt. Die Services, Service Offerings und Service Instances werden über Digital Portfolio Management erfasst.
5.  Verbleib und Status der physischen Assets, die beschafft, empfangen, gelagert, installiert oder ausgemustert werden, werden über Asset Management erfasst.
6.  Stabile Configuration Items werden täglich discovered und föderiert. Bestand und Aktualisierungen werden automatisch in der Zero-Touch-CMDB erfasst.
7.  Service-Beeinträchtigungen (gemeldet oder erkannt) werden behoben und kommuniziert. Requests werden erfüllt. Support und Wissen werden bereitgestellt.

Das Unternehmen möchte **Change Management nutzen, um die Risiken und Auswirkungen der Freigabe von Inkrementen in die Produktion** durch Service Provider oder Anbieter zu steuern und zu kontrollieren.  
Der Change-Management-Prozess beginnt mit einem Antrag auf Freigabe potenzieller Inkremente. Der Change wird geschlossen, wenn bestätigt ist, dass das Inkrement in der Produktion betriebsbereit ist.

Einige Dinge sind **im Vergleich zur ITIL-3/4-Praxis etwas anders**:

-   Ein Change Request kann über DevSecOps-Tools statt direkt von menschlichen Antragstellern erstellt werden.
-   Manches, was über CI/CD-Tools in die Produktion freigegeben wird, benötigt keine Change-Genehmigung mehr.  
    Eine solche Freigabe muss aus Gründen der Transparenz dennoch (als Standard Change) erfasst werden.
-   Eine orchestrierte Aktualisierung der Konfiguration wird nicht mehr durch Change Management gesteuert.
-   DevSecOps-Tools können abfragen, ob die beantragte Freigabe in die Produktion genehmigt ist.
-   Die Aktualisierung von CMDB-, Asset- oder Portfolio-Einträgen wird nicht (bzw. nicht mehr) durch einen Change ausgelöst oder gesteuert.
-   Die in der Infrastruktur erkannten Änderungen können genutzt werden, um zu verifizieren, ob der Change erfolgreich freigegeben wurde.

Out of the Box kann man einen Change Request erstellen, ihn mit einem Service, einem Service Offering und einem CI verknüpfen und ihn einer beliebigen Assignment Group zuweisen. **Die Beziehungen zwischen CSDM-Artefakten werden weder geprüft noch erzwungen.** Es gibt keine Einschränkungen, welche Elemente mit einem Change verknüpft werden können. Es wird empfohlen, einige Anpassungen zu konfigurieren, sodass:

**Changes zwingend (verpflichtend) mit einem Service Offering verknüpft sein müssen.** Die (initiale) Assignment Group, die Approval Group und der Technology Management Service werden aus dem Service Offering abgeleitet. Manche möchten die historische Beziehung zwischen dem Offering und seinem übergeordneten Service anzeigen (indem sie das Service-Attribut im Change befüllen); andere möchten die Beziehung zum aktuellen übergeordneten Service anzeigen (indem sie den aktuellen Parent des Offerings im Formular darstellen). Bei Unternehmen mit Hunderten von Service Offerings, die keine Subscriptions verwenden, besteht das Risiko, dass Anwender das richtige Offering nicht ohne Weiteres finden bzw. auswählen können. Für sie wird eine kleine Anpassung empfohlen, sodass Anwender bei der Auswahl eines Service Offerings einen Teil des Service-Namens oder einen Teil des Namens des Taxonomieknotens eingeben und so einfach das passende Offering auswählen können. Gibt der Anwender beispielsweise „\*server“ ein, werden alle Knoten, Services und Service Offerings angezeigt, die „server“ im Namen enthalten.

Denjenigen, die CSDM5 nutzen, rate ich in der Regel, produktunabhängige Technology Management Services anzulegen, pro Service ein oder mehrere produktspezifische Service Offerings und pro Service Offering eine oder mehrere produkt- und umgebungsspezifische Service Instances. Die Service Instances können mit den Configuration Items verknüpft werden, von denen sie abhängen. Technisch ist es möglich abzufragen, welche produktiven Service Instances in den Service Offerings enthalten sind und welche Configuration Items mit diesen Service Instances verknüpft sind.  

Heute **empfehle ich, die betroffene produktive Service Instance in einem benutzerdefinierten Attribut des Change-Datensatzes zu erfassen**. Dies ist besonders nützlich, wenn mehrere produktive Instanzen desselben Produkts unabhängig voneinander laufen. SaaS-Instanzen hängen typischerweise nicht von den CI-Stacks des Unternehmens ab. Wenn ein Unternehmen separate SaaS-Instanzen desselben SaaS-Produkts hat, unterscheiden sie sich ausschließlich durch die Service Instances. Ein weiterer positiver Nebeneffekt ist, dass man im selben Change-Attribut eine Dynamic CI Group erfassen kann, die im Service Offering enthalten ist (Dynamic-CI-Group-Datensätze sind auch in der Service-Instance-Tabelle sichtbar). Wählt der Anwender eine Dynamic CI Group aus, ist diese CI Group das ausgewählte CI, und der Anwender sollte kein weiteres CI auswählen können. Die CIs der Gruppe werden automatisch der Related List im Change-Formular hinzugefügt, in der die betroffenen CIs aufgeführt sind.

Ist das Service-Instance-Attribut mit einer produktiven Service Instance befüllt, können Anwender die CIs auswählen, von denen die Instanz abhängt, auch wenn das CI ohne Bezug zu seiner Rolle oder Umgebung discovered wurde. Das heißt: Verknüpft jemand einen Server mit einer produktiven Service Instance, kann man einen Change auf diesem Server erstellen. Ist dieser Server keiner produktiven Service Instance zugeordnet, können Sie über eine Service Instance keinen Change darauf erstellen.

Bleibt das Service-Instance-Attribut leer, kann man ein CI auswählen, das nicht direkt mit einer Service Instance verknüpft ist, aber für das ausgewählte Service Offering relevant ist. Wird beispielsweise ein Change für das Service Offering „Windows Server“ erstellt, sollte der Anwender jeden nicht ausgemusterten Datensatz in der Klasse bzw. Tabelle „Windows Server“ auswählen können. Idealerweise lassen sich nur die CIs auswählen, die für die Produktion genutzt werden. Da es jedoch Netzwerk- und Storage-CIs gibt, die gleichermaßen für Entwicklung, Test, Abnahme und Produktion genutzt werden, muss es möglich sein, Changes auf diesen CIs zu erstellen, damit potenzielle Auswirkungen auf die Produktion erkannt werden können. Hat das Unternehmen viele Offerings ohne Service Instances oder Dynamic CI Groups, empfiehlt es sich, die CI-Filterbedingung im Service-Offering-Datensatz zu erfassen und zu pflegen.

Durch die Definition von Subscriptions für relevante Service Offerings lässt sich sicherstellen, dass nur berechtigte Personen Changes für diese Service Offerings und die zugehörigen Service Instances, Dynamic CI Groups und verknüpften CIs erstellen können.

Indem Changes nur für Configuration Items zugelassen werden, die direkt mit produktiven Service Instances verknüpft sind, kann das Unternehmen eine datengetriebene Einheitlichkeit und Konsistenz im gesamten Unternehmen fördern. Durch die Auswahl gleichartiger CIs werden Impact-Analyse und Reporting erheblich vereinfacht, und CABs können die Entscheidungen, die sie treffen, besser nachvollziehen.

Die CMDB wird feingranulare CIs wie Websites, Datenbanktabellen, installierte Software, TCP-Ports sowie die Abhängigkeiten zwischen diesen Elementen enthalten. Diese Daten werden auch von der automatisierten Risiko- und Impact-Analyse genutzt und stehen Now Assist (KI) zur Verfügung, ohne den Change-Prozess unnötig zu verkomplizieren.  
  
Idealerweise werden relevante CIs automatisch mit den Service Instances verknüpft, die von ihnen abhängen. Dies kann durch die automatische Erkennung von Abhängigkeiten zwischen CIs erfolgen. Nutzt beispielsweise eine Website Daten aus einer Datenbank, ist die mit der Website verknüpfte Service Instance wahrscheinlich ebenfalls von dieser Datenbank abhängig. Manche Unternehmen verknüpfen nur die Server mit den Service Instances; andere verknüpfen die wichtigsten CIs auf diesen Servern mit den Service Instances; wieder andere tun beides. Das hier beschriebene Konzept ist technisch unabhängig davon, was Unternehmen mit ihren Service Instances verknüpfen. Aus zahlreichen Gründen wird dennoch empfohlen, nicht mehr als 8 CIs pro Service Instance zu verknüpfen.  
  

## Change-Verifizierung

Sobald ein Change deployt ist, muss verifiziert werden, dass er korrekt deployt wurde, bevor der Change geschlossen werden kann. Manche Unternehmen nutzen Agent Client Collectors, um in Echtzeit zu erkennen, was läuft, sodass sie sofort sehen, ob der Change korrekt deployt wurde. Andere Unternehmen führen die Discovery ihrer Infrastruktur nur einmal täglich durch und warten bis zum nächsten Tag, um den Change anhand von CMDB-Daten zu verifizieren, bevor der Change geschlossen wird. Wieder andere prüfen manuell, ob der Change korrekt deployt wurde, bevor sie ihn schließen. Jede Methode hat ihre Vor- und Nachteile. Aus Business- und Risikosicht ist es vermutlich sinnvoll, die Business-Funktionalität unmittelbar nach dem Deployment des Changes zu verifizieren und die CMDB später über Discovery zu aktualisieren. Wer die Möglichkeit hat, kann unmittelbar nach Ende des Change-Fensters eine Ad-hoc-Discovery für die mit dem Change verknüpften Elemente ausführen bzw. anstoßen.  
  
Das heißt: Es ist nicht so, dass die CMDB nicht über einen Change aktualisiert wird; dies geschieht lediglich über eine modernere Methode, die ein konsistentes Ergebnis liefert.
