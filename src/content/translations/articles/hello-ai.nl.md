---
title: "AI deel 2: Claude, GitHub, Python, Cloudflare, Supabase & chatbot"
excerpt: "Voor de AI Masterclass die ik onlangs volgde, moesten we een praktische use case uitwerken. Voortbouwend op AI deel 1 besloot ik een zero-touch champagnewebsite te maken die volledig met AI is gegenereerd en die gebruikmaakt"
source: "a3aee8ea73f28065"
---

Voor de AI Masterclass die ik onlangs volgde, moesten we een praktische use case uitwerken. Voortbouwend op AI deel 1 besloot ik een zero-touch champagnewebsite te maken die volledig met AI is gegenereerd en die gebruikmaakt van de mogelijkheden van vandaag. Het resultaat staat nu live op [**Champagne360.nl**](https://Champagne360.nl),

### De site biedt bezoekers de volgende functionaliteiten:

-   Iedereen kan **informatie** bekijken die met AI is verzameld/gegenereerd (bijv. presentaties, webcontent enz.)
-   Iedereen kan **tabellen bekijken/filteren** met 319 champagnedorpen, 1053 producenten, 8014 champagnes, 168 handelaren/winkels en 5.016 aangeboden producten.
-   Ingelogde leden kunnen **alle tabellen en alle prijzen bekijken/exporteren** van 5.016 flessen champagne die in 168 winkels in 6 landen worden aangeboden
-   Iedereen kan **chatten met Claude**, de ingebouwde champagnechatbot die alles weet over 'le' en 'la' champagne
-   Iedereen kan **een website aanmelden** die mogelijk relevante content bevat die mijn AI-agents mogen lezen
-   Iedereen kan **ons een bericht sturen** via een contactformulier.
-   Iedereen kan **betaald lid worden** van de site
-   Alle content op de site wordt aangeboden in **4 talen**
-   **Beheerders kunnen inloggen vanaf IP-adressen in NL** om onderhoud uit te voeren en issues/statistieken te bekijken
-   De **content van de site is responsive,** d.w.z. er zijn verschillende lay-outs voor pc's, telefoons en tablets.

### "Onder de motorkap" maakt de website gebruik van de volgende **technische componenten**:

1.  Anthropic Claude API (vertalingen, chatbot, samenvattingen enz.)
2.  Supabase Secure Membership/Login
3.  Brevo SMTP-mail (bijv. voor formulieren)
4.  SQLite/JSON (database)
5.  Cloudflare DNS, WAF, rate limiting, Agent Workers, routing, CAPTCHA enz.
6.  GitHub Repo/Actions/Pages
7.  Stripe-betaalverwerking
8.  Brave/Aptify (haalt samenvattingen van bedrijfswebsites op, indien toegestaan)
9.  Apollo (LinkedIn-API, haalt websites van champagnebedrijven op)
10.  Python-scripts (ShopScan, ProducerScan, AI-import, XLSX-export enz.)
11.  Verwijderen van persoonsgegevens (AVG)
12.  Naleving van de Databankenwet
13.  Node / headless Chrome (presentaties)
14.  SEO (automatisch gegenereerde robots.txt, sitemaps.xml)
15.  Google & Abacus Website Analytics

## Wat maakt deze site anders dan traditionele websites?

-   De site wordt gebouwd en onderhouden via Anthropic Claude. In natuurlijke taal krijgt Claude de opdracht om "dit toe te voegen", "dat te wijzigen", "dit te verplaatsen", "een menu/pagina toe te voegen", "de lay-out gelijk te trekken met" enz. We vroegen Claude ook om "alle pagina's met datatabellen dezelfde look-and-feel te geven." Claude maakte en verwerkte vervolgens alle wijzigingen en publiceerde ze naar GitHub, waar ze worden gehost.

-   Claude vertelde mij welke technische componenten ik moest gebruiken, wat ze kosten en hoe ik ze moest configureren. Op verzoek vertelde Claude me ook hoe ik de data veilig kon houden en kon voorkomen dat onbekenden gevoelige content kopiëren die ons onderscheidt van de rest.

-   De kern van de site is de actuele, geconsolideerde en relevante content in 4 talen, die de champagnechatbot kan raadplegen, bevragen en gebruiken. Voor wijnprofessionals hebben we filter-, zoek- en exportmogelijkheden gemaakt die schone, actuele informatie opleveren. In plaats van uren te besteden aan het schrijven van proefnotities, nemen we de Franse content van de producent en laten we AI die samenvatten en formuleren in onze tone of voice, in 4 talen. Spaans, Indiaas of Chinees (Mandarijn) toevoegen kost één klik (en een flink aantal AI-tokens)...

-   De content van de site is vrijwel zero-touch. De content wordt verzameld door via LinkedIn de websites van alle champagne-importeurs/-producenten op te vragen, vervolgens hun websites te crawlen (indien toegestaan), de gecrawlde data te normaliseren, de gegevens over steden/producenten/importeurs/champagnes samen te vatten en te vertalen in 4 talen. Alles wordt veilig opgeslagen in een snelle SQL-database.  
    **CHAMPAGNE360.NL BEVAT NU 'S WERELDS GROOTSTE VERZAMELING VAN (PRODUCENTEN/IMPORTEURS VAN) CHAMPAGNES**

-   We hebben Claude ook de beschikbare informatie van de **Nederlandse Champagne Pagina's** gevoed (die ik aan het begin van deze eeuw publiceerde, maar die nog steeds toepasbaar/relevant is), en we hebben Claude gebruikt om die content om te zetten in meertalige presentaties en content voor infopagina's.

-   We hebben alle informatie op de site en in de champagnedatabase beschikbaar gemaakt voor Claude, de **chatbot** op de website. Gebruikers kunnen nu op één pagina met de bot "praten" en krijgen URL's naar pagina's met gefilterde content. Leden kunnen Claude bijvoorbeeld vragen: "geef me een lijst met Grand Cru rosé-champagnes die in Reims worden geproduceerd en die tussen de 30 en 40 euro per fles kosten". Binnen 5 seconden krijgen ze **relevante** URL's te zien die hen naar de bronnen van de producenten/winkels leiden. Anderen vragen onze Claude misschien: "Wat is het verschil tussen Premier Cru en Grand Cru?" Reizigers vragen bijvoorbeeld: "Waar kan ik in Reims het best eten/slapen?" Omdat de database dagelijks wordt ververst en lokaal wordt opgeslagen, hoeft de chatbot niet continu het internet te bevragen, en hallucineert onze Claude niet, omdat we accurate, gefilterde informatie aanleveren.

-   Anthropic Claude genereerde aparte pagina's/URL's voor elke producent, importeur en elk dorp, inclusief content. We hebben Google duizenden pagina's aangeboden, wat de ranking van de Champagne360-pagina waarschijnlijk snel zal verbeteren. We hebben er ook voor gezorgd dat andere AI-crawlers de content niet zomaar legaal kunnen kopiëren. We hebben aan alle tabellen een paar klokkenluidersrecords toegevoegd die niet-menselijke crawlers niet kunnen zien. We monitoren het internet continu om sites te vinden die onze klokkenluiders bevatten :-) Die sites krijgen een door AI gegenereerde brief van onze nieuwe in-house-jurist-AI-agent, die alles weet van de **Europese Databankenwet** :-)

-   We verkopen geen producten en we worden niet betaald door de producenten/winkels. We verkopen abonnementen op de site aan wijnprofessionals, en die moeten onze technologiekosten dekken. Mijn uren worden als gratis beschouwd, omdat dit een hobbyproject is dat niet veel tijd zou moeten kosten zodra het eenmaal draait. Dat gezegd hebbende, merkte ik dat API-tokens je flink geld kunnen kosten als je er niet verstandig mee omgaat. Om de **API-kosten** in de hand te houden, crawlen we daarom alleen gewijzigde sites/pagina's opnieuw. We hebben er ook voor gekozen sommige dingen lokaal te verwerken om buitensporige kosten voor AI-tokens te voorkomen.
-   Het jaarlidmaatschap kost ongeveer evenveel als één goedkope fles champagne. Professionals besparen waarschijnlijk tientallen uren per jaar als ze de site gebruiken zoals bedoeld. Doordat we de content in vier talen aanbieden, is de markt voor lidmaatschappen niet beperkt tot Nederland en België, waar Nederlands wordt gesproken. Mooi detail: producenten die vertegenwoordiging zien in landen waar wij importeurs hebben gevonden, kunnen gemakkelijk contact met hen opnemen.

> Ik geloof dat Champagne360 een win-win-win is voor iedereen die de site gebruikt, of je nu producent/wijnboer, importeur, webshop of marktonderzoeker bent, of een champagnepresentatie op school wilt geven. Claude helpt je, 24x7, in vier talen.

## Lessen

De Champagne360-website was voor mij in de eerste plaats een oefening om kennis te maken met de nieuwe AI-technologieën en hun mogelijkheden, kosten en beperkingen. Als bezoekers de waarde ervan niet zien, dan is dat maar zo... Mijn lessen uit dit miniproject zijn:

1.  Ik twijfel er niet meer aan: AI gaat de manier waarop mensen in/met IT werken ingrijpend veranderen. Als je een paar dagen de tijd neemt om uit te zoeken hoe het werkt, kun je AI-oplossingen bouwen die 2-3 jaar geleden alleen nerds met jarenlange ervaring konden bouwen. Dat betekent niet dat die nerds binnenkort zonder werk zitten. Ze moeten wel overstappen van traditionele code/content naar door AI gegenereerde code/content. Als ze niet snel overstappen, zitten ze waarschijnlijk binnen 3 jaar zonder IT-baan. Dat gezegd hebbende, is ijsjes verkopen op het strand ook een leuke carrière :-)
2.  De AI-tools van vandaag kunnen royaltyvrije content genereren die gemakkelijk kan concurreren met content waarvoor royalty's betaald moeten worden. Ze zijn heel eenvoudig te gebruiken voor iedereen die wat tijd heeft gestoken in uitzoeken wat je waarvoor gebruikt.
3.  Er zijn heel veel AI-tools, en ze verschijnen snel en worden net zo snel weer vervangen. Bijblijven met wat er nieuw is en elke maand nieuwe producten leren kennen wordt een uitdaging. Toolconsolidatie en standaardisatie worden bijna onmogelijk. Sommigen van jullie zullen binnen 2 jaar vijftig tools gebruiken. Hopelijk zien we binnenkort een handvol best-of-suite-tools in plaats van honderden best-of-breed-tools.
4.  De implementatie van de Champagne360-site kostte me ongeveer 30 uur, en het onderhoud kost een paar uur per maand. De HTML/CSS-voorganger, die ik aan het begin van deze eeuw bouwde, kostte me honderden uren om te bouwen en vele avonden per maand om de data actueel te houden. Een AI-website bouwen en onderhouden kost ongeveer de helft van de tijd en moeite van het bouwen en onderhouden van een WordPress-website, ook al wist ik een maand geleden nog weinig van AI. Dat gezegd hebbende: als je al een werkende WordPress-site hebt, kun je daar met AI content voor genereren en alsnog flink wat tijd besparen.
5.  Als je niet weet waar je mee bezig bent, kom je gemakkelijk in de problemen door verkeerde beslissingen te nemen. Toen ik bijvoorbeeld de kosten van AI-tokens nog niet kende, heb ik elke champagnewebsite gecrawld met betaalde crawlers, inclusief pagina's die niet waren bijgewerkt. Het gevolg is dat de eerste 50 betaalde abonnementen worden gebruikt om de API-kosten terug te verdienen die ik in de eerste 48 uur van de site heb gemaakt :-)
6.  **Security is een serieus aandachtspunt!** Als je simpelweg een basissite genereert met Claude.ai of ChatGPT, is er geen sprake van beveiliging of gegevensbescherming. Ik ontdekte op de harde manier dat Claude de website in één gigantische HTML-pagina had gezet met alle informatie van de site. Je moet Claude expliciet vragen om maatregelen te nemen om alles veilig te houden. Het goede nieuws: Claude doet dat voor je als je erom vraagt, al moet je misschien een flink aantal gelicentieerde producten aanschaffen/integreren om "Make IT Safe Again" waar te maken
7.  Er is veel nieuws over AI die kan hacken. Ik kan je verzekeren dat onze AI-bots veel data hebben gevonden waarvan de eigenaar waarschijnlijk niet weet dat die publiekelijk/legaal beschikbaar is op internet. Bijvoorbeeld: eigenaren van WooCommerce- of Shopify-winkels, let op!!! Als jij (of je sitebouwer) het niet hebt voorkomen, kan iemand met één klik de volledige content van je winkel binnenhalen.
8.  Aan de ene kant is werken met AI heel eenvoudig. Ik heb voorbeelden gehoord van gepensioneerden die nu met AI hobbywebsites maken. Maar als je IT goed wilt doen, moet je je voor je het weet in 15 verschillende technologieën verdiepen. Ja, AI kan je helpen ze te installeren/configureren, maar wie bestuurt dan wie? Bestuur jij de AI, of bestuurt de AI jou? Bovendien kan dit gemakkelijk leiden tot architecturale complexiteit, wat de total cost of ownership opdrijft.
9.  De meeste AI-tools bieden een gratis abonnement, maar dat volstaat niet. Upgraden naar pro-versies kan je 20 euro per maand per product kosten. De eenvoudige champagne360-site zou 200 euro per maand kosten aan abonnementen op AI-software, plus AI-tokens. Als ik dezelfde site in WordPress zou bouwen met thema's en betaalde plug-ins, zou het nog altijd minder dan 30 euro per maand kosten, maar dan zou ik de content zelf moeten onderhouden, en WordPress is bijna net zo leuk als AI.
