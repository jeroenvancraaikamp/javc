---
title: "KI Teil 3: Der Chatbot auf Champagne360"
excerpt: "Nachdem ich zunächst – für meine KI-Ausbildung – eine ganze Menge Informationen auf der Website Champagne360.nl zusammengetragen hatte (siehe Teil 1 und Teil 2), habe ich ihr kürzlich einen mehrsprachigen KI-Chatbot hinzugefügt. Auch diesmal war ich wieder angenehm überrascht, wie"
source: "9d7d3c988d5224af"
---

Nachdem ich zunächst – für meine KI-Ausbildung – eine ganze Menge Informationen auf der Website Champagne360.nl zusammengetragen hatte (siehe [Teil 1](/de/2723-2/) und [Teil 2)](/de/hello-ai/), habe ich ihr kürzlich einen mehrsprachigen KI-Chatbot hinzugefügt. Auch diesmal war ich wieder angenehm überrascht, wie einfach und schnell das ging. Innerhalb von drei Abenden habe ich etwas zusammengebaut bzw. zusammengeredet, das ich ohne KI nie zuvor hinbekommen hätte. Der Chatbot ist das Tüpfelchen auf dem i oder – wenn Sie so wollen – der Korken auf der Flasche.

## Ein Klick auf das Fragezeichen

Ich habe Claude gebeten, eine Seite mit einem Chatbot zu konfigurieren. Diese Seite ist über das „?“-Symbol erreichbar, das auf jeder Seite der Website zu finden ist.

Der Chatbot zeigt eine Suchleiste und eine Reihe häufig gestellter Fragen in der gewählten Sprache an. Nach einem Klick auf die Schaltfläche sucht der Chatbot nach einer Antwort bzw. Erklärung und zeigt diese unten auf dem Bildschirm an, ebenfalls in der gewählten Sprache. Wer möchte, kann sich den Text vorlesen lassen. Später kam noch die Spracheingabe hinzu: Sie sprechen Ihre Frage über das Mikrofon ein, und die Antwort wird sofort vorgelesen. Nach der ersten Reaktion von Claude kann der Besucher eine Folgefrage stellen, auf die Claude unter Berücksichtigung des bisherigen Dialogs antwortet. Nichtmitglieder dürfen maximal 8 Folgefragen und maximal 30 Fragen pro Stunde von einer IP-Adresse aus stellen. Für Mitglieder gelten diese Beschränkungen nicht. KI-Bots von anderen dürfen nicht mit Claude sprechen :-)

## Die Erziehung von Claude:

Als der Chatbot erst einmal lief, haben wir ihn erzogen:

-   Wir haben die *Tone of Voice* festgelegt und ihm gesagt, wozu er eine „Meinung“ äußern darf und wozu nicht.
-   Wir haben ihn mit sechzig niederländischen Seiten an Erklärungen über „le“ und „la“ Champagne gefüttert, damit er sinnvolle Antworten geben kann.
-   Wir haben ihm gesagt, dass es auf der Website Seiten mit Info-Slides und Links gibt und dass diese ebenfalls in der Antwort angezeigt werden sollen.
-   Wir haben ihm gesagt, dass es Tabellen gibt, deren Inhalt man über eine URL filtern oder anzeigen kann.
-   Wir haben ihm gesagt, dass der Besucher die Website eines Erzeugers, Importeurs oder Champagners anmelden kann, wenn der Chatbot sie nicht findet.
-   Wir haben festgelegt, dass die gestellten Fragen und generierten Antworten als historische – nicht unbedingt aktuelle – Informationen gespeichert werden.
-   Wir haben festgelegt, dass die Informationen von Claude bei Bedarf durch eine Handvoll Suchergebnisse von Google ergänzt werden dürfen.
-   Wir haben festgelegt, dass die Informationen auf Champagne360 immer Vorrang haben und dass der Chatbot erst dann im Internet nach URLs suchen darf, wenn er selbst keine gute Antwort weiß.
-   Wir haben Claude zu einem professionellen Routenplaner erzogen. Wenn es in der Antwort um eine Firma oder ein Dorf geht, wird automatisch eine „Route“-Schaltfläche angezeigt.

Unser Chatbot verfügt über relevante, vollständige Daten aus Originalquellen, wodurch sinnvollere Informationen herauskommen, als wenn Sie ChatGPT oder ein anderes KI-Tool verwenden würden. Die neuen KI-Möglichkeiten erlauben vollständige Dialoge. So kann ein Kind unter 10 Jahren über die Website Material für sein Referat und/oder seinen Vortrag über Champagne sammeln. Profis werden den Inhalt der Website bei Marktforschungen zu schätzen wissen.

Die Fragen, die dem Chatbot gestellt werden, werden ein Jahr lang gespeichert, wodurch ein gutes Bild davon entsteht, was die Besucher brauchen und wonach sie suchen. Die Informationen werden genutzt, um Frequently Asked Questions zu generieren und Antworten wiederzuverwenden.

Alle Informationen auf Champagne360 sind viersprachig, der Chatbot also auch. Die Informationen werden in einer Ausgangssprache gespeichert und anschließend in die anderen drei Sprachen übersetzt. Wenn eine Quellseite geändert wird, wird sie erneut eingelesen, zusammengefasst und danach in die drei anderen Sprachen übersetzt. Dadurch ist die Website rasend schnell, und der Inhalt ist bereits übersetzt und somit in der gewählten Sprache für Besucher und für Google durchsuchbar. Es ist – wegen der KI-Tokens – wichtig, dass der Inhalt nicht jedes Mal von der KI übersetzt werden muss, sobald wieder ein anderssprachiger Besucher auf der Website vorbeischaut. Sollte sich herausstellen, dass die Mehrheit der übersetzten Seiten seltener als einmal besucht wird, bevor die Seite aktualisiert wird, kehren wir die Übersetzungsstrategie um, und die KI erstellt die Übersetzung erst, wenn ein anderssprachiger Besucher auf diese Seite kommt. Diese Übersetzung wird dann gespeichert, sodass Seiten nicht jedes Mal neu übersetzt werden müssen, solange sich die Quelle nicht ändert.

## Ausschneiden, Einfügen, Fertig:

Auch die Erziehung erfolgte ganz einfach in natürlicher Sprache. Jeder Schritt lieferte eine aktualisierte JavaScript-Definition für den Chatbot Worker. Kurz ausschneiden und einfügen, auf „Deploy“ klicken und fertig. Claude hat jetzt denselben schrägen Humor wie ich und weiß, was ich über Champagner weiß, und noch mehr.

Die Einrichtung einer sicheren Mitgliederverwaltung mit Zahlungen per Kreditkarte, iDEAL und PayPal war ordentlich Arbeit und eine steile Lernkurve. Aber dafür hat man dann auch etwas: Wir können die Kosten, die durch Nichtmitglieder verursacht werden, im Griff behalten, indem wir die Chatbot-Nutzung durch Nichtmitglieder begrenzen. Mitglieder haben diese Beschränkungen nicht und erhalten Zugriff auf zusätzliche Funktionen, wie Exportmöglichkeiten und Einblick in die Einzelhandelspreise, die in den einzelnen Ländern verwendet werden..

Die meiste Arbeit war dann doch, dafür zu sorgen, dass Bots von Dritten unseren Claude nicht ablenken können und dass nur echte Menschen mit Claude kommunizieren und Formulare ausfüllen können,

### **Das Ergebnis sehen Sie auf [champagne360.nl](https://champagne360.nl).**
