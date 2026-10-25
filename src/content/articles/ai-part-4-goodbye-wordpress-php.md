---
title: 'AI Part 4: Goodbye Wordpress & PHP'
date: 2026-10-23
categories:
  - AI4IT
excerpt: Deze week bleek dat de machines waarop PHP draait, gemakkelijk misbruikt konden worden. Voor recente versies van PHP zijn patches/fixes ter beschikking gesteld. Velen kwamen er achter dat hun WordPress toepassing en zelfs onderliggende Linux en/of Database Mngt System ook niet bij waren. WAT TE DOEN?
image: /Pulling PHP from WordPress.png
readingTime: 4
popular: true
draft: false
linkedin: ''
lang: nl
---

Het leek zo makkelijk: een website op een eigen VPS met een controlpanel. Zo geregeld toch? Inderdaad, het zat binnen een paar weken in elkaar. Het installeren en upgraden van WordPress-thema's en plugins is vervelend, maar niet onmogelijk. Na een aantal jaren draaien zit menig WordPress-website nu vol met pagina's, blogartikelen  enzovoort. Er is nieuwe techniek beschikbaar om Wordpress te vervangen, maar velen staren naar een -zo lijkt het- hoge drempel.

Deze week kreeg menigeen met een website ineens een wake-up call. Er zat een kwetsbaarheid in PHP-servers waarop PHP-programma's draaien. De kwetsbaarheid zat niet in de programma's (zoals WordPress) zelf, maar in de onderliggende PHP-server. Dus zelfs al had je al die jaren keurig Wordpress, Thema's en Plugins had bijgewerkt, was je deze week toch aan de beurt...  Je zou denken: even een patch installeren en klaar. Nou nee, als je PHP-server niet up-to-date hebt gehouden, moet je die eerst upgraden voordat je de patch kunt installeren. En toen kwamen sommigen erachter dat er onder de PHP-server vaak ook nog een verouderd Linux-besturingssysteem en/of een verouderd databasebeheersysteem zat.

Ik wil de mensen niet de kost geven die deze week in paniek een volledig nieuwe server moesten opzetten en hun WordPress-CMS met inhoud moesten overzetten. En toen bleek geheid dat het oude CMS niet op de nieuwe stack kon draaien en dus ook geüpgraded moest worden. Oohps... Als je overal tegelijkertijd aan het knutselen bent, is de kans groot dat je niet meer kunt vinden waar het aan ligt als er iets niet goed werkt. Na veel bloed, zweet en tranen draaien velen nu op nieuwe versies van een nog steeds verouderd platform. 

De afgelopen maand heb ik AI volop geadopteerd en kwam ik erachter hoe wijd de deuren voor AI-naarlingen openstaan op WordPress-sites en de Woocommerce- en Shopify-webshops die erop draaien. Je hoeft alleen maar aan AI te vragen om een site te onderzoeken en samen te vatten, en dan gaat AI aan de slag om volstrekt legaal de informatie op te halen die onderzocht moet worden.

> Ik vermoed dat (de mens achter) AI de komende tijd nog veel meer kwetsbaarheden in oudere systemen zal ontdekken en uitbuiten. Als je het ene gat hebt gedicht, wordt het volgende gat snel gevonden. Je kan kiezen, of met verouderde spullen door blijven ploeteren of even door de zure appel heen bijten en overstappen op moderne technieken die een stuk minder kwetsbaar, en een stuk makkelijker beheersbaar, zijn.

Ik was zelf ook aan de beurt. Deze website draaide tot gisterenavond nog op Wordpress, en toen ik de technologie onder het WordPress-CMS begon te patchen, merkte ik dat er diep onder de motorkap behoorlijk veel verouderde open-sourcecomponenten draaiden, w.o. MySQL, PHP en CentOS. 

Ik heb de knoop doorgehakt en de informatie van mijn WordPress-site overgezet naar een AI-oplossing die draait op Anthropic Claude, Cloudflare, GitHub en Sveltia (een Git-based headless CMS). Het was verbluffend hoe makkelijk en snel die transitie eigenlijk ging. 

Ik heb Claude gewoon gevraagd om een AI-kloon van mijn oude website te maken. Claude vroeg me om even een export te maken van de WordPress-site en om Github toe te staan de media over te halen van mijn oude site. Claude had soms proactief onderweg wat "verbeteringen" aangebracht waar ik het niet altijd mee eens was. Na een prettige dialoog over wat ik met de site wil, heeft Claude e.e.a. aangepast. Daarna was het een kwestie van de DNS-routering van Plesk naar Cloudflare overzetten, wat ik ’s nachts heb laten doen. Vanochtend draaide deze site op AI… Vanavond heb ik wat beveiligings- en beschermingsmaatregelen aangebracht, back-upvoorzieningen opgezet, statistiekpagina's en adminpagina's laten maken en een nieuwe chatbot opgestart en gevoed.   

In 2022 had ik een volledige kerstvakantie nodig om mijn oude .NET-website om te bouwen naar Wordpress. Nu doe ik hetzelfde -en meer- binnen twee avonden. Mijn website en de blog met 60 artikelen die ik sinds 2022 schrijf zijn in één klap weer waterdicht en maken nu alleen nog gebruik van moderne componenten. De nieuwe site is een platform waarop veilig allerlei AI-toepassingen kunnen worden ontwikkeld en uitgevoerd. De horde die ik dacht te moeten nemen blijkt niets meer dan een lage drempel te zijn. 

**_Ik kan iedereen die IT-oplossingen gebruikt of beheert, aanbevelen om zich te bekwamen in AI en versneld afscheid te nemen van verouderde technologie, bij voorkeur voordat AI deze oude technologie platlegt of een onverlaat met de data aan de haal gaat. Want dat laatste is geen vraag meer of dit gaat gebeuren, maar alleen wanneer dit gaat gebeuren._**
