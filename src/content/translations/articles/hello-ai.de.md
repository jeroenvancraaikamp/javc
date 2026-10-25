---
title: "KI Teil 2: Claude, GitHub, Python, Cloudflare, Supabase & ChatBot"
excerpt: "Für die KI-Masterclass, die ich kürzlich besucht habe, sollten wir einen praktischen Use Case erarbeiten. Aufbauend auf KI Teil 1 habe ich beschlossen, eine Zero-Touch-Champagner-Website zu erstellen, die vollständig mit KI generiert wird und die"
source: "a3aee8ea73f28065"
---

Für die KI-Masterclass, die ich kürzlich besucht habe, sollten wir einen praktischen Use Case erarbeiten. Aufbauend auf KI Teil 1 habe ich beschlossen, eine Zero-Touch-Champagner-Website zu erstellen, die vollständig mit KI generiert wird und die heutigen Möglichkeiten nutzt. Das Ergebnis ist jetzt live auf [**Champagne360.nl**](https://Champagne360.nl).

### Die Website bietet ihren Besuchern folgende Funktionen:

-   Jeder kann sich **Informationen** ansehen, die mithilfe von KI gesammelt bzw. generiert wurden (z. B. Präsentationen, Webinhalte usw.)
-   Jeder kann **Tabellen ansehen und filtern** – mit 319 Champagnerdörfern, 1.053 Erzeugern, 8.014 Champagnern, 168 Händlern/Shops und 5.016 angebotenen Produkten.
-   Angemeldete Mitglieder können **alle Tabellen und alle Preise ansehen und exportieren** – für 5.016 Champagnerflaschen, die in 168 Shops in 6 Ländern angeboten werden
-   Jeder kann **mit Claude chatten**, dem integrierten Champagner-ChatBot, der alles weiß, was es über „le“ und „la“ Champagne zu wissen gibt
-   Jeder kann **eine Website melden**, die relevante Inhalte enthalten könnte, die meine KI-Agenten lesen dürfen
-   Jeder kann uns über ein Kontaktformular **eine Nachricht senden**.
-   Jeder kann **zahlendes Mitglied** der Website werden
-   Alle Inhalte der Website werden in **4 Sprachen** angeboten
-   **Administratoren können sich von IP-Adressen in den Niederlanden aus anmelden**, um Wartungsarbeiten durchzuführen und Issues/Statistiken einzusehen
-   Die **Inhalte der Website sind responsiv**, d. h. es gibt unterschiedliche Layouts für PCs, Smartphones und Tablets.

### „Unter der Haube“ nutzt die Website folgende **technische Komponenten**:

1.  Anthropic Claude API (Übersetzungen, Chatbot, Zusammenfassungen usw.)
2.  Supabase Secure Membership/Login
3.  Brevo SMTP Mail (z. B. für Formulare)
4.  SQLite/JSON (Datenbank)
5.  Cloudflare DNS, WAF, Rate Limiting, Agent Workers, Routing, CAPTCHA usw.
6.  GitHub Repo/Actions/Pages
7.  Stripe Payment Processor
8.  Brave/Aptify (ruft Zusammenfassungen von Unternehmenswebsites ab, sofern erlaubt)
9.  Apollo (LinkedIn API, ruft Websites von Champagnerunternehmen ab)
10.  Python-Skripte (ShopScan, ProducerScan, AI Import, XLSX Export usw.)
11.  Entfernung personenbezogener Daten (DSGVO)
12.  Einhaltung des Datenbankgesetzes
13.  Node / Headless Chrome (Präsentationen)
14.  SEO (automatisch generierte robots.txt, sitemaps.xml)
15.  Google & Abacus Website Analytics

## Was unterscheidet diese Website von herkömmlichen Websites?

-   Die Website wird mit Anthropic Claude erstellt und gepflegt. In natürlicher Sprache erhält Claude Anweisungen wie „füge dies hinzu“, „ändere das“, „verschiebe dies“, „füge Menü/Seite hinzu“, „übernimm das Layout von“ usw. Wir haben Claude auch gebeten: „Gestalte alle Seiten mit Datentabellen im gleichen Look-and-Feel.“ Claude hat daraufhin alle Änderungen vorgenommen, angewendet und auf GitHub veröffentlicht, wo die Website gehostet wird.

-   Claude hat mir gesagt, welche technischen Komponenten ich verwenden soll, was sie kosten und wie ich sie konfiguriere. Auf Nachfrage hat Claude mir auch erklärt, wie ich die Daten schützen und verhindern kann, dass nicht identifizierte Personen sensible Inhalte kopieren, die uns von anderen unterscheiden.

-   Der Kern der Website sind ihre aktuellen, konsolidierten und relevanten Inhalte in 4 Sprachen, auf die der Champagner-ChatBot zugreifen, die er abfragen und nutzen kann. Für Weinprofis haben wir Filter-, Abfrage- und Exportfunktionen geschaffen, die saubere und aktuelle Informationen liefern. Statt stundenlang Verkostungsnotizen zu schreiben, nehmen wir die französischen Inhalte der Erzeuger und lassen sie von KI zusammenfassen und in unserer Tonalität formulieren – in 4 Sprachen. Spanisch, Indisch oder Chinesisch (Mandarin) hinzuzufügen, kostet einen Klick (und eine beträchtliche Menge an KI-Tokens) …

-   Die Inhalte der Website sind nahezu Zero-Touch. Sie werden gesammelt, indem LinkedIn nach den Websites aller Champagnerimporteure und -erzeuger abgefragt wird, diese Websites (sofern erlaubt) gecrawlt, die gecrawlten Daten normalisiert, die Daten zu Orten, Erzeugern, Importeuren und Champagnern zusammengefasst und in 4 Sprachen übersetzt werden. Anschließend werden sie sicher in einer schnellen SQL-Datenbank gespeichert.  
    **CHAMPAGNE360.NL ENTHÄLT JETZT DAS WELTWEIT GRÖSSTE VERZEICHNIS VON CHAMPAGNERN (UND IHREN ERZEUGERN/IMPORTEUREN)**

-   Wir haben Claude außerdem die verfügbaren Informationen aus den **Nederlandse Champagne Pagina's** zur Verfügung gestellt (die ich Anfang dieses Jahrhunderts veröffentlicht habe, die aber nach wie vor zutreffend und relevant sind), und mit Claude deren Inhalte in mehrsprachige Präsentationen und Inhalte für Infoseiten umgewandelt.

-   Wir haben alle Informationen auf der Website und in der Champagner-Datenbank Claude, dem **Chatbot** der Website, zugänglich gemacht. Nutzer können jetzt auf einer einzigen Seite mit dem Bot „sprechen“ und erhalten URLs zu Seiten mit gefilterten Inhalten. So können Mitglieder Claude etwa fragen: „Gib mir eine Liste von Grand-Cru-Rosé-Champagnern, die in Reims hergestellt werden und zwischen 30 und 40 Euro pro Flasche kosten.“ Innerhalb von 5 Sekunden erhalten sie **relevante** URLs, die sie zu den referenzierten Quellen der Erzeuger bzw. Shops führen. Andere fragen unseren Claude vielleicht: „Was ist der Unterschied zwischen Premier Cru und Grand Cru?“ Reisende fragen: „Wo kann ich in Reims am besten essen/übernachten?“ Da die Datenbank täglich aktualisiert und lokal gespeichert wird, muss der Chatbot nicht ständig das Internet abfragen, und unser Claude halluziniert nicht, weil wir ihm genaue, gefilterte Informationen bereitstellen.

-   Anthropic Claude hat für jeden Erzeuger, jeden Importeur und jedes Dorf eigene Seiten/URLs einschließlich Inhalt generiert. Wir haben Google Tausende von Seiten angeboten, was das Ranking der Champagne360-Seite voraussichtlich schnell verbessern wird. Außerdem haben wir sichergestellt, dass andere KI-Crawler die Inhalte nicht ohne Weiteres rechtmäßig kopieren können. Wir haben allen Tabellen einige Whistleblower-Datensätze hinzugefügt, auf die nicht-menschliche Crawler nicht zugreifen können. Wir durchsuchen das Internet laufend nach Websites, die unsere Whistleblower enthalten :-) Diese Websites erhalten einen KI-generierten Brief von unserem neuen hauseigenen Anwalts-KI-Agenten, der alles über den **europäischen Datenbankschutz** weiß :-)

-   Wir verkaufen keine Produkte und werden nicht von den Erzeugern/Shops bezahlt. Wir verkaufen Website-Abonnements für Weinprofis, die unsere Technologiekosten decken sollen. Meine Stunden gelten als kostenlos, da es sich um ein Hobbyprojekt handelt, das nicht viel Zeit in Anspruch nehmen sollte, sobald es läuft. Allerdings habe ich festgestellt, dass API-Tokens schnell ins Geld gehen können, wenn man sie nicht klug verwaltet. Um die **API-Kosten** im Griff zu behalten, crawlen wir daher nur geänderte Websites/Seiten erneut. Außerdem haben wir uns entschieden, manches lokal zu verarbeiten, um übermäßige Kosten für KI-Tokens zu vermeiden.
-   Die Jahresmitgliedschaft kostet etwa so viel wie eine günstige Flasche Champagner. Profis sparen voraussichtlich Dutzende Stunden pro Jahr, wenn sie die Website wie vorgesehen nutzen. Da die Inhalte in vier Sprachen angeboten werden, ist der Markt für Mitgliedschaften nicht auf die Niederlande und Belgien beschränkt, wo Niederländisch gesprochen wird. Schönes Detail: Erzeuger, die eine Vertretung in Ländern anstreben, in denen wir Importeure gefunden haben, können diese ganz einfach kontaktieren.

> Ich bin überzeugt, dass Champagne360 eine Win-win-win-Situation für alle ist, die die Website nutzen – ob Sie Erzeuger/Winzer, Importeur, Webshop oder Marktforscher sind oder in der Schule eine Präsentation über Champagner halten möchten. Claude hilft rund um die Uhr, in vier Sprachen.

## Takeaways

Die Champagne360-Website war für mich in erster Linie eine Übung, um die neuen KI-Technologien sowie ihre Möglichkeiten, Kosten und Grenzen kennenzulernen. Wenn Besucher ihren Wert nicht erkennen, dann ist das eben so … Meine Erkenntnisse aus dem Miniprojekt sind:

1.  Ich habe keine Zweifel mehr: KI wird die Art und Weise, wie Menschen in der bzw. mit IT arbeiten, grundlegend verändern. Wenn Sie sich ein paar Tage Zeit nehmen, um herauszufinden, wie sie funktioniert, können Sie KI-Lösungen bauen, die vor 2–3 Jahren nur Nerds mit langjähriger Erfahrung hätten bauen können. Das heißt nicht, dass diese Nerds bald arbeitslos sein werden. Sie müssen jedoch von traditionellem Code/Content auf KI-generierten Code/Content umsteigen. Wenn sie nicht bald umsteigen, werden sie innerhalb von 3 Jahren wahrscheinlich keinen IT-Job mehr haben. Andererseits ist Eisverkaufen am Strand auch ein schöner Beruf :-)
2.  Heutige KI-Tools können lizenzfreie Inhalte erzeugen, die problemlos mit lizenzpflichtigen Inhalten mithalten können. Sie sind wirklich einfach zu bedienen für alle, die sich etwas Zeit genommen haben, um herauszufinden, was man wofür verwendet.
3.  Es gibt sehr viele KI-Tools, die rasant auftauchen und ebenso schnell wieder ersetzt werden. Mit den Neuerungen Schritt zu halten und jeden Monat neue Produkte zu erlernen, wird eine Herausforderung sein. Tool-Konsolidierung und Standardisierung werden nahezu unmöglich sein. Manche von Ihnen werden innerhalb von 2 Jahren fünfzig Tools nutzen. Hoffentlich sehen wir bald eine Handvoll Best-of-Suite-Tools statt Hunderter Best-of-Breed-Tools.
4.  Die Umsetzung der Champagne360-Website hat mich ca. 30 Stunden gekostet, die Pflege kostet ein paar Stunden pro Monat. Ihr HTML/CSS-Vorgänger, den ich Anfang des Jahrhunderts gebaut habe, hat mich Hunderte Stunden für den Aufbau und viele Abende pro Monat für die Aktualisierung der Daten gekostet. Aufbau und Pflege einer KI-Website erfordern etwa halb so viel Zeit und Aufwand wie Aufbau und Pflege einer WordPress-Website – obwohl ich vor einem Monat noch wenig über KI wusste. Wenn Sie allerdings bereits eine funktionierende WordPress-Website haben, können Sie Inhalte dafür mit KI generieren und trotzdem erheblich Zeit sparen.
5.  Wenn Sie nicht wissen, was Sie tun, können Sie durch falsche Entscheidungen schnell in Schwierigkeiten geraten. Als ich zum Beispiel die Kosten von KI-Tokens nicht kannte, habe ich jede einzelne Champagner-Website mit kostenpflichtigen Crawlern gecrawlt, einschließlich Seiten, die nicht aktualisiert worden waren. Daher werden die ersten 50 bezahlten Abonnements dazu verwendet, die API-Kosten zu decken, die mir in den ersten 48 Stunden der Website entstanden sind :-)
6.  **Sicherheit ist ein echtes Thema!** Wenn Sie einfach mit Claude.ai oder ChatGPT eine einfache Website generieren, gibt es weder Sicherheit noch Datenschutz. Ich musste auf die harte Tour feststellen, dass die Claude-Website in eine einzige riesige HTML-Seite gepackt wurde, die sämtliche Informationen der Website enthielt. Claude muss ausdrücklich gebeten werden, Maßnahmen zur Absicherung umzusetzen. Die gute Nachricht: Claude erledigt das für Sie, wenn Sie darum bitten – allerdings müssen Sie unter Umständen eine ganze Reihe lizenzierter Produkte kaufen und integrieren, um „Make IT Safe Again“ umzusetzen.
7.  Es gibt viele Meldungen darüber, dass KI hacken kann. Ich kann Ihnen versichern, dass unsere KI-Bots viele Daten gefunden haben, von denen der Eigentümer wahrscheinlich nichts weiß, die aber öffentlich und legal im Internet verfügbar sind. Achtung zum Beispiel, WooCommerce- oder Shopify-Shopbetreiber!!! Wenn Sie (oder Ihr Website-Entwickler) es nicht verhindert haben, kann jemand mit einem Klick den gesamten Inhalt Ihres Shops extrahieren.
8.  Einerseits ist die Arbeit mit KI wirklich einfach. Ich habe von Rentnern gehört, die jetzt mit KI Hobby-Websites erstellen. Wenn Sie es aber richtig machen wollen („Do IT right“), müssen Sie sich, ehe Sie sich versehen, mit 15 verschiedenen Technologien vertraut machen. Ja, KI kann Ihnen bei Installation und Konfiguration helfen – aber wer kontrolliert dann wen? Kontrollieren Sie die KI, oder kontrolliert die KI Sie? Zudem kann dies leicht zu architektonischer Komplexität führen, was die Total Cost of Ownership in die Höhe treibt.
9.  Die meisten KI-Tools bieten ein kostenloses Abonnement an, das jedoch nicht ausreicht. Ein Upgrade auf die Pro-Versionen kann 20 Euro pro Monat und Produkt kosten. Die einfache Champagne360-Website würde 200 Euro pro Monat an KI-Software-Abonnements kosten, zuzüglich KI-Tokens. Würde ich dieselbe Website in WordPress mit Themes und kostenpflichtigen Plugins bauen, würde sie immer noch weniger als 30 Euro pro Monat kosten, aber ich müsste die Inhalte selbst pflegen, und WordPress macht fast genauso viel Spaß wie KI.
