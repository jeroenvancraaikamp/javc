---
title: 'AI Part 3: De Chatbot op Champagne360'
date: 2026-10-13
categories:
  - AI4IT
excerpt: Nadat ik eerst -voor mijn AI-opleiding- een hele lading informatie op de website Champagne360.nl had verzameld (zie part 1 en part 2) , heb ik er onlangs een meertalige AI-chatbot aan toegevoegd. Ook nu was ik weer aangenaam verbaasd over
image: /wp-content/uploads/2026/10/ChaBot.jpg
readingTime: 4
popular: false
draft: false
lang: nl
---

Nadat ik eerst -voor mijn AI-opleiding- een hele lading informatie op de website Champagne360.nl had verzameld (zie [part 1](/2723-2/) en [part 2)](/hello-ai/), heb ik er onlangs een meertalige AI-chatbot aan toegevoegd. Ook nu was ik weer aangenaam verbaasd over hoe makkelijk en snel het ging. Binnen 3 avonden draaide/praatte ik iets in elkaar dat ik zonder AI nog nooit eerder voor elkaar had gekregen. De chatbot, is de kers op de taart, of -zo je wilt- de kurk op de fles.

## Eén klik op het vraagteken

Ik heb Claude gevraagd om een pagina met een chatbot te configureren. Die pagina is bereikbaar via het "?"-icoon dat op iedere pagina van de site staat.

De chatbot toont een zoekbalk en een aantal veelgestelde vragen, in de gekozen taal. Na een klik op de knop gaat de chatbot op zoek naar een antwoord/uitleg en toont die onderaan het scherm, ook weer in de gekozen taal. Wie wil, kan de tekst laten voorlezen. Later is daar nog spraakinvoer bijgekomen: je spreekt je vraag in via de microfoon en het antwoord wordt meteen voorgelezen. Na de eerste reactie van Claude, kan de bezoeker een vervolgvraag sturen waarop Claude reageert, rekening houdende met voorgaande dialoog. Niet-Leden mogen maximaal 8 vervolgvragen stellen en maximaal 30 vragen per uur stellen vanaf een IP-adres. Voor leden gelden deze beperkingen niet. AI bots van anderen mogen niet met Claude praten :-)

## De opvoeding van Claude:

Toen de chatbot eenmaal draaide, hebben we hem opgevoed:

-   We hebben de *tone of voice* vastgesteld, en hebben hem verteld waar hij wel/geen "mening" over mag geven.
-   We hebben hem gevoed met zestig Nederlandse pagina's uitleg over 'le' en 'la' champagne, zodat hij zinnige antwoorden kan geven.
-   We hebben verteld dat er op de site pagina's met info-slides en links staan, en dat die ook in de response moeten worden getoond.
-   We hebben verteld dat er tabellen zijn waarvan je de inhoud via een URL kunt filteren of weergeven.
-   We hebben verteld dat de bezoeker de site van een producent, importeur of champagne kan aanmelden als de chatbot dit niet kan vinden.
-   We hebben bepaald dat de gestelde vragen en gegenereerde antwoorden als historische -niet noodzakelijk up to date- informatie worden bewaard
-   We hebben bepaald dat de informatie van Claude, waar nodig, mag worden aangevuld met een handvol zoekresultaten van Google.
-   We hebben bepaald dat de informatie op Champagne360 altijd voorgaat, en dat de chatbot pas op internet naar URL's mag zoeken als hij zelf geen goed antwoord weet.
-   We hebben Claude opgevoed tot een professionele routeplanner. Als de response over een firma of dorp gaat, krijg je automatisch een "route" knop te zien

Onze chatbot beschikt over relevante, complete data uit originele bronnen, waardoor er zinnigere informatie uitkomt dan wanneer je ChatGPT of een andere AI-tool zou gebruiken. De nieuwe AI-mogelijkheden maken volledige dialogen mogelijk. Zo kan een kind jonger dan 10, via de site materiaal verzamelen voor zijn werkstuk en/of spreekbeurt over Champagne. Pros zullen de inhoud van de site waarderen bij marktonderzoek.

De vragen die aan de chatbot worden voorgelegd worden een jaar bewaard, waardoor er een goed beeld ontstaat van waar de bezoekers behoefte aan hebben en wat ze zoeken. De informatie wordt gebruikt om Frequently Asked Questions te genereren en om antwoorden te hergebruiken.

Alle informatie op Champagne360 is viertalig, de chatbot dus ook. De informatie wordt in een brontaal opgeslagen en vervolgens naar de andere drie talen vertaald. Als een bronpagina wordt aangepast, wordt deze opnieuw ingelezen, samengevat, en daarna naar de drie andere talen vertaald. Dit zorgt ervoor dat de site razendsnel is en dat de inhoud al is vertaald en dus in de gekozen taal doorzoekbaar is door bezoekers en door Google. Het is -voor de AI Tokens- belangrijk dat de inhoud niet iedere keer door AI hoeft te worden vertaald, iedere keer als er weer een anderstalige op de site langskomt. Mocht blijken dat het merendeel van de vertaalde pagina's minder dan 1 keer bezocht wordt voordat de pagina wordt bijgewerkt, dan draaien we de vertaalstrategie om en genereert AI de vertaling pas als er een anderstalige op die pagina voorbijkomt. Die vertaling wordt dan opgeslagen, zodat je pagina's niet iedere keer opnieuw hoeft te vertalen, terwijl de bron niet verandert.

## Knippen, Plakken, Klaar:

Ook de opvoeding ging gewoon in de natuurlijke taal. Elke stap leverde een bijgewerkte JavaScript-definitie voor de Chatbot Worker op. Even knippen en plakken, op "Deploy" drukken en klaar. Claude heeft nu dezelfde foute humor als ik, en weet wat ik over champagne weet, en meer.

Het inrichten van een veilige ledenadministratie met creditcard-, iDEAL- en PayPal-betalingen was flink werk en een stijle leercurve. Maar dan heb je ook wat; we kunnen de kosten die door niet-leden worden veroorzaakt beheersen door het chatbotgebruik door niet-leden te beperken. Leden hebben die beperkingen niet en krijgen de beschikking over additionele functionaliteit, zoals exportmogelijkheden en inzicht in de retailprijzen die in de landen worden gebruikt..

Het meeste werk was toch wel om te zorgen dat bots van derden onze Claude niet kunnen afleiden, dat alleen echte mensen met Claude kunnen converseren en formulieren kunnen invullen,

### **Het resultaat zie je op [champagne360.nl](https://champagne360.nl).**
