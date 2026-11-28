---
title: "AI-scraping, een bedreiging of een zegen?"
excerpt: "Als onderdeel van mijn AI-reis heb ik Chinees Mandarijn geactiveerd als ondersteunde taal op mijn website. Alle pagina's en artikelen werden automatisch vertaald, zonder dat ik zelf ook maar één woord Chinees spreek. Na een tijdje merkte ik een forse toename van het websiteverkeer (duizenden hits per dag), en 30-40% van dat verkeer kwam uit Singapore en China. Ook het verkeer uit de VS nam sterk toe. Toen ik merkte dat deze nieuwe \"bezoekers\" overwegend AI-agents waren die mijn artikelen en de IT4IT Atlas-content scrapten, vroeg ik me af: is dit goed of slecht? Het antwoord is niet digitaal..."
source: "59ea3645e7aceb1a"
---

Als je mijn blog volgt, weet je dat ik dit jaar aan een AI-reis ben begonnen en ervaring en kennis opdoe over wat wel en niet kan met AI. Ik merk dat ik niet de enige ben die met AI experimenteert. De zorgen over AI die we in het nieuws horen, moeten serieus worden genomen, zoals ik zelf heb gemerkt.

Twee maanden nadat ik mijn WordPress/PHP-websites had omgebouwd tot AI-native sites die gebruikmaken van agents en chatbots, zag ik dat het websiteverkeer sterk toenam. Meertalige ondersteuning had zeker invloed op de bezoekersaantallen, vooral toen ik ondersteuning voor Chinees Mandarijn (ook wel vereenvoudigd Chinees) toevoegde. In eerste instantie was ik enthousiast over de extra aandacht, want ik wist dat de markt voor wat ik te bieden heb veel groter is dan Nederland. Daarna heb ik analytics toegevoegd om te zien waar de extra bezoekers vandaan kwamen, wat ze deden/lazen en hoe lang ze op elke pagina bleven.

Toen ik het websiteverkeer analyseerde, zag ik dat deze bezoekers óf heel snel lazen óf dat er iets anders aan de hand was. Toen ik zag wat mijn nieuwe "vrienden" uit China aan mijn chatbots vroegen, concludeerde ik dat het geen mensen waren, maar webcrawlers die pagina na pagina en artikel na artikel lazen, geen enkel artikel of it4it-product op mijn website oversloegen en probeerden binnen te dringen in de beveiligde content die ik heb.

Eerlijk is eerlijk: ook de content van de IT4IT Atlas en Champagne360.nl wordt met behulp van AI-agents van het internet verzameld. Ik heb onze agents echter opgedragen zich aan de geldende regels en wetten te houden. Als bijvoorbeeld in de robots.txt van een website staat dat onze agents op bepaalde pagina's niet welkom zijn, dan lezen, vertalen of samenvatten mijn agents de content van die pagina's niet.

Als mijn agents niet welkom zijn op jouw pagina's, worden die pagina's en de producten erop niet opgenomen in de repositories die ik met de rest van de wereld deel. Je kunt dus een geweldig product hebben, maar sites zoals de mijne kennen het niet, want voor AI-agents besta je niet.

Op mijn eigen websites heb ik robots.txt zo ingesteld dat bezoekende bots beperkt worden in wat ze mogen doen/lezen als ze de geautoriseerde kanalen gebruiken. Die bescherming blijkt duidelijk niet genoeg. De Chinese AI-agents komen binnen via gewone webbrowsers, zien eruit als mensen en omzeilen zelfs robotchecks. Het enige waaraan ik kan zien dat het geen mensen zijn, is dat ze alles lezen, dat razendsnel doen en verdachte vragen aan mijn chatbots stellen.

Ik kwam tot de volgende lijst met opties waaruit ik kon kiezen:

- Accepteren dat AI-agents van anderen, met name die uit CN, RU, VN en SG, niet zo netjes zijn als mijn eigen agents, en ze de content laten crawlen die publiek zichtbaar is voor menselijke bezoekers. Misschien moet ik niet alle data voor iedereen beschikbaar maken? Dat gezegd hebbende: gevoelige data achter een login of paywall zetten heeft ook voor- en nadelen, zeker in Nederland.

- Al het verkeer blokkeren uit de landen waar deze malafide agents vandaan komen is problematisch, omdat ik ook veel bezoekers uit Zwitserland, de VS en andere VPN-uitgangspunten zag die mijn websites bezochten met Chinese webbrowsers en/of zich verdacht gedroegen. Menselijke gebruikers blokkeren, bijvoorbeeld uit de VS en CH, is niet verstandig als je internationale content wilt aanbieden.

- Het verkeer beperken, bijvoorbeeld tot een bepaald aantal pagina's per minuut per IP-adres, is ook problematisch, omdat Chinese gebruikers doorgaans op het resultaat uit zijn en het niet lijken te deren hoe lang het duurt. Ze vragen dus zoveel pagina's per minuut op als ze kunnen krijgen en komen later terug voor de rest van de data.

- Toegang beperken tot browsers met westerse talen is evenmin een optie, omdat dat eenvoudig te omzeilen is.

Uiteindelijk heb ik gekozen voor een mix van het bovenstaande:

1. Omdat ik geen klanten zoek in China, Hongkong, Vietnam, Rusland, Oekraïne, Belarus, Singapore enzovoort, heb ik besloten de toegang tot mijn sites vanuit die landen te blokkeren met Cloudflare.
2. Ik heb gevoelige content, zoals de prijzen van diverse champagnes per importeur/producent, achter een paywall gezet, waarbij ik genoeg informatie zichtbaar liet om bezoekers geïnteresseerd te houden.
3. Ik heb pagina's gemaakt die Google kan crawlen, maar die geen waardevolle content voor AI-crawlers bevatten.
4. Ik heb de beperkingen in robots.txt, de copyright- en privacyverklaringen en mijn algemene voorwaarden intact gelaten, zodat nette crawlers/mensen de regels kunnen volgen en anderen niet kunnen verbergen dat ze wisten dat ze niet mochten hacken.
5. Ik heb records toegevoegd die alleen ik ken, en ik zoek naar die records op andere sites, zodat ik weet wie illegaal content gebruikt die van mijn sites en/of repositories is afgehaald.
6. Ik heb het aantal paginabezoeken per IP-adres per uur beperkt tot wat een mens doorgaans doet.
7. Ik heb Chinees Mandarijn verwijderd als ondersteunde taal.
8. Ik had mijn eigen chatbots al getraind om verdachte vragen af te handelen, maar nu monitor ik ook de vragen en antwoorden, inclusief waar de vragen vandaan kwamen. Ik zoek nu uit hoe ik die informatie kan gebruiken, bijvoorbeeld voor blacklisting in realtime.

Het goede nieuws: het werkte. Het aantal malafide crawlers dat mijn site bezoekt is sterk gedaald, maar het aantal paginabezoeken dat ik zie ook.

Het slechte nieuws is dat Chinese AI-platforms die het internet crawlen en die informatie "as a Service" beschikbaar stellen, de content op mijn sites hoogstwaarschijnlijk niet meer zien (als ze ethisch zijn). Hun klanten zien mijn sites dus ook niet.

AI HEEFT DUS NIEUWE KANSEN GEBRACHT, MAAR OOK NIEUWE AFWEGINGEN/KEUZES...
