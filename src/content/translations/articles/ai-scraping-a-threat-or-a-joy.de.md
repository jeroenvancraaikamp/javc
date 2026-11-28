---
title: "KI-Scraping – Bedrohung oder Segen?"
excerpt: "Im Rahmen meiner KI-Reise habe ich auf meiner Website Chinesisch (Mandarin) als unterstützte Sprache aktiviert. Alle Seiten und Artikel wurden automatisch übersetzt, ohne dass ich ein einziges Wort Chinesisch spreche. Nach einer Weile bemerkte ich einen deutlichen Anstieg des Webtraffics (Tausende Zugriffe pro Tag), und 30–40 % dieses Traffics kamen aus Singapur und China. Auch der Traffic aus den USA nahm drastisch zu. Als mir auffiel, dass diese neuen „Besucher“ überwiegend KI-Agenten waren, die meine Artikel und die Inhalte des IT4IT Atlas scrapten, fragte ich mich: Ist das gut oder schlecht? Die Antwort ist nicht digital …"
source: "59ea3645e7aceb1a"
---

Wenn Sie meinen Blog verfolgen, wissen Sie, dass ich mich dieses Jahr auf eine KI-Reise begeben habe und dabei Erfahrungen und Wissen darüber sammle, was bei KI zu tun ist und was man besser lässt. Mir ist aufgefallen, dass ich nicht der Einzige bin, der mit KI experimentiert. Die Bedenken, von denen wir in den Nachrichten über KI hören, sollten ernst genommen werden, wie ich selbst erfahren habe.

Zwei Monate nachdem ich meine WordPress-/PHP-Websites in KI-native Websites umgewandelt hatte, die Agenten und Chatbots nutzen, stellte ich fest, dass der Webtraffic drastisch zugenommen hatte. Die mehrsprachige Unterstützung hat die Besucherzahlen definitiv beeinflusst, insbesondere, als ich Chinesisch (Mandarin, auch vereinfachtes Chinesisch genannt) hinzugefügt habe. Zunächst habe ich mich über die zusätzliche Aufmerksamkeit richtig gefreut, denn ich wusste, dass der Markt für das, was ich anzubieten habe, viel größer ist als die Niederlande. Dann habe ich Analytics eingerichtet, um zu sehen, woher die zusätzlichen Besucher kamen, was sie taten bzw. lasen und wie lange sie auf jeder Seite blieben.

Bei der Analyse des Webtraffics sah ich, dass diese Besucher entweder sehr schnell lasen oder dass etwas anderes vor sich ging. Als ich sah, was meine neuen „Freunde“ aus China meinen Chatbots fragten, kam ich zu dem Schluss, dass es keine Menschen waren, sondern Webcrawler, die Seite für Seite und Artikel für Artikel lasen, keinen einzigen Artikel und kein einziges IT4IT-Produkt auf meiner Website ausließen und versuchten, in die geschützten Inhalte einzudringen.

Fairerweise muss gesagt werden, dass auch die Inhalte des IT4IT Atlas und von Champagne360.nl mithilfe von KI-Agenten aus dem Internet zusammengetragen werden. Ich habe unsere Agenten jedoch angewiesen, sich an die geltenden Regeln und Gesetze zu halten. Wenn beispielsweise die robots.txt einer Website unseren Agenten mitteilt, dass sie auf bestimmten Seiten nicht willkommen sind, lesen, übersetzen oder fassen meine Agenten Inhalte dieser Seiten nicht zusammen.

Wenn meine Agenten auf Ihren Seiten nicht willkommen sind, werden diese Seiten und die darauf enthaltenen Produkte nicht in die Repositories aufgenommen, die ich mit dem Rest der Welt teile. Das heißt: Sie könnten ein großartiges Produkt haben, aber Websites wie meine werden nichts davon wissen, weil Sie für KI-Agenten nicht existieren.

Auf meinen eigenen Websites habe ich die robots.txt so konfiguriert, dass sie einschränkt, was besuchende Bots tun bzw. lesen dürfen, wenn sie die autorisierten Kanäle nutzen. Dieser Schutz reicht offensichtlich nicht aus. Die chinesischen KI-Agenten kommen nachweislich über normale Webbrowser herein, sehen aus wie Menschen und umgehen sogar Robot-Checks. Das Einzige, woran ich erkenne, dass sie keine Menschen sind, ist, dass sie alles lesen, das extrem schnell tun und meinen Chatbots verdächtige Fragen stellen.

Ich bin auf die folgende Liste möglicher Optionen gekommen:

- Akzeptieren, dass die KI-Agenten anderer, insbesondere solche aus CN, RU, VN und SG, nicht so anständig sind wie meine eigenen Agenten, und sie die Inhalte crawlen lassen, die für menschliche Besucher öffentlich sichtbar sind. Vielleicht sollte ich nicht alle Daten für jedermann zugänglich machen? Sensible Daten hinter einem Login oder einer Paywall zu platzieren, hat allerdings ebenfalls Vor- und Nachteile, insbesondere in den Niederlanden.

- Den gesamten Traffic aus den Herkunftsregionen dieser Rogue-Agenten zu blockieren, ist problematisch, denn ich habe auch viele Besucher aus der Schweiz, den USA und von anderen VPN-Ausstiegspunkten gesehen, die mit chinesischen Webbrowsern auf meine Websites zugriffen und/oder sich verdächtig verhielten. Menschliche Nutzer, z. B. aus den USA und der Schweiz, zu blockieren, ist nicht klug, wenn man internationale Inhalte anbieten möchte.

- Den Traffic zu begrenzen, z. B. auf eine bestimmte Anzahl Seiten pro Minute und IP-Adresse, ist ebenfalls problematisch, da chinesische Nutzer typischerweise auf das Ergebnis aus sind und es ihnen offenbar egal ist, wie lange es dauert. Sie fragen also so viele Seiten pro Minute ab, wie sie sich erlauben können, und kommen später für die restlichen Daten wieder.

- Den Zugriff auf Browser mit westlichen Sprachen zu beschränken, ist auch keine Option, da sich das leicht umgehen lässt.

Am Ende habe ich eine Mischung der oben genannten Möglichkeiten umgesetzt:

1. Da ich keine Kunden in China, Hongkong, Vietnam, Russland, der Ukraine, Belarus, Singapur usw. suche, habe ich beschlossen, den Zugriff auf meine Websites aus diesen Ländern mithilfe von Cloudflare zu blockieren.
2. Ich habe sensible Inhalte, wie die Preise verschiedener Champagner nach Importeur/Produzent, hinter eine Paywall verschoben und dabei genügend Informationen sichtbar gelassen, um die Besucher bei der Stange zu halten.
3. Ich habe Seiten erstellt, die Google crawlen kann, die aber keine für KI-Crawler wertvollen Inhalte enthalten.
4. Ich habe die Einschränkungen in der robots.txt, die Urheberrechts- und Datenschutzhinweise sowie meine Allgemeinen Geschäftsbedingungen unverändert gelassen, damit anständige Crawler bzw. Menschen die Regeln befolgen können und andere nicht behaupten können, sie hätten nicht gewusst, dass man nicht hacken darf.
5. Ich habe Datensätze eingefügt, die nur ich kenne, und suche diese auf anderen Websites, um zu erfahren, wer aus meinen Websites und/oder Repositories entnommene Inhalte unrechtmäßig verwendet.
6. Ich habe die Anzahl der Seitenaufrufe pro IP-Adresse und Stunde auf das begrenzt, was ein Mensch typischerweise tut.
7. Ich habe Chinesisch (Mandarin) als unterstützte Sprache wieder entfernt.
8. Ich hatte meine eigenen Chatbots bereits darauf trainiert, mit verdächtigen Fragen umzugehen, überwache aber nun zusätzlich die Fragen und Antworten, einschließlich der Herkunft der Fragen. Derzeit überlege ich, wie ich diese Informationen nutzen kann, z. B. für ein Blacklisting in Echtzeit.

Die gute Nachricht: Es hat funktioniert. Die Zahl der Rogue-Crawler, die meine Website besuchen, ist drastisch gesunken, allerdings auch die Zahl der Seitenaufrufe, die ich sehe.

Die traurige Nachricht ist, dass chinesische KI-Plattformen, die das Internet crawlen und diese Informationen „as a Service“ bereitstellen, die Inhalte meiner Websites höchstwahrscheinlich nicht mehr sehen (sofern sie sich ethisch verhalten). Auch ihre Kunden sehen meine Websites nicht mehr.

KI HAT ALSO NEUE CHANCEN, ABER AUCH NEUE ÜBERLEGUNGEN UND ENTSCHEIDUNGEN MIT SICH GEBRACHT …
