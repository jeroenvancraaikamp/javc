---
title: "25 voorbeeldgesprekken met een AI-supportagent"
excerpt: "Playbook voor gesprekken met een AI-supportagent – meertalige IT-ondersteuning via Microsoft Teams Overzicht Dit playbook bevat 25 voorbeeldgesprekken voor een meertalige AI-agent die gebruikers via Microsoft Teams ondersteunt binnen de volgende IT-domeinen: Elk scenario bevat een typische"
source: "077e06d9444bed30"
---

**Playbook voor gesprekken met een AI-supportagent – meertalige IT-ondersteuning via Microsoft Teams**

**Overzicht**

Dit playbook bevat 25 voorbeeldgesprekken voor een meertalige AI-agent die gebruikers via Microsoft Teams ondersteunt binnen de volgende IT-domeinen:

-   • Eindgebruikersapparaten
-   • Identity & Access Management
-   • Bedrijfsapplicaties
-   • Netwerken & telecommunicatie
-   • Samenwerkingstools
-   • Cloudinfrastructuur
-   • Algemene ondersteuning & Universal Requests
-   • Gevoelige security- of compliancekwesties

Elk scenario bevat een typische vraag of melding van een gebruiker, het diagnose- en antwoordproces van de AI-agent en de uitkomst. De gesprekken bestaan uit meerdere beurten, zodat ze een realistische, menselijke dialoog weerspiegelen.

**1\. Eindgebruikersapparaten – Excel crasht**

**Gebruiker**: Mijn laptop blijft vastlopen als ik Excel open. **Agent**: Bedankt voor je melding. Ik zie dat je een Windows 11-apparaat van het bedrijf gebruikt dat in Intune is geregistreerd. Ik kijk even of er vergelijkbare problemen bekend zijn. *...haalt Intune-gegevens op, controleert bekende problemen en Excel-logs...* **Agent**: Er is een bekend probleem met de huidige Excel-versie. Je kunt dit oplossen door Office bij te werken. Zal ik de update op afstand starten? **Gebruiker**: Ja, graag. **Agent**: Update gestart. Dit duurt naar verwachting 3–5 minuten. Start Excel daarna opnieuw op. **Gebruiker**: Begrepen. Moet ik mijn werk opslaan voordat de update wordt geïnstalleerd? **Agent**: Ja, sla al je werk op om gegevensverlies te voorkomen. Laat me weten wanneer je zover bent. **Gebruiker**: Ik ben er klaar voor. **Agent**: De update wordt geïnstalleerd... Klaar. Start Excel opnieuw op en controleer of het nog steeds vastloopt. **Gebruiker**: Het lijkt nu stabiel. Bedankt! **Agent**: Graag gedaan. Ik registreer dit als opgelost. Laat het me weten als er nog iets anders speelt.

**2\. Identity & Access – HR-portal niet meer beschikbaar**

**Gebruiker**: Ik kan niet meer bij het HR-portal. **Agent**: Ik bekijk even je toegangsrechten. Een ogenblik, ik controleer Saviynt en je huidige rollen. *...controleert de toegangsstatus, detecteert een rolwijziging vanuit Workday...* **Agent**: Ik zie dat je rol vorige week is gewijzigd en dat je toegang tot het HR-portal automatisch is ingetrokken. **Gebruiker**: Dat verklaart het. Kan ik die toegang terugkrijgen? **Agent**: Ja, ik dien een Universal Request in om je toegang te herstellen. Mogelijk is daarvoor goedkeuring van je manager nodig. **Gebruiker**: Oké, bedankt. **Agent**: Het verzoek is ingediend en naar je manager doorgestuurd. Je krijgt bericht zodra het is goedgekeurd en je toegang is hersteld.

**3\. Bedrijfsapplicaties – mislukte SAP-job**

**Gebruiker**: Onze goedkeuringsworkflow in SAP werkt vanochtend niet. **Agent**: Begrepen. Laten we kijken wat er aan de hand is. Ik controleer je abonnement op SAP Finance... bevestigd. Nu bekijk ik de joblogs. *...haalt de foutmelding van een batchjob op uit de SAP-jobmonitor...* **Agent**: Er is vannacht een achtergrondjob mislukt. Dat is waarschijnlijk de oorzaak. **Gebruiker**: Kunnen we die handmatig opnieuw draaien? **Agent**: Dat moet het SAP-operationsteam doen. Ik registreer het incident en stel hen op de hoogte. **Gebruiker**: Mooi. Vermeld er alsjeblieft bij dat de CFO hierdoor niet verder kan. **Agent**: Zeker. Ik heb dit als hoge prioriteit gemarkeerd. Incident #INC123456 is aangemaakt en doorgestuurd naar het SAP-team.

**4\. Netwerken – VPN-probleem**

**Gebruiker**: Ik kan geen verbinding maken met de VPN. Gisteren werkte het nog prima. **Agent**: Laten we het probleem opsporen. Ik start een diagnosesessie op afstand op je apparaat... *...ACC haalt connectiviteitslogs op...* **Agent**: Je VPN-client is verouderd. Dat veroorzaakt waarschijnlijk het authenticatieprobleem. **Gebruiker**: Kun je het oplossen? **Agent**: Ik kan het nieuwste VPN-pakket naar je computer pushen. Wil je dat ik doorga? **Gebruiker**: Ja, graag. **Agent**: Update gestart. Je verbinding kan tijdelijk worden verbroken. **Gebruiker**: Begrepen. **Agent**: De update is voltooid. Probeer nu verbinding te maken. **Gebruiker**: Het werkt weer. Heel erg bedankt! **Agent**: Graag gedaan. Ik registreer dit als opgelost.

**5\. Samenwerking – synchronisatie van de Teams-agenda**

**Gebruiker**: Mijn Teams-agenda synchroniseert niet met Outlook. **Agent**: Laten we de synchronisatie-instellingen controleren. Ik open je Microsoft 365-integratie... *...controleert de synchronisatiestatus van de mailbox...* **Agent**: Ik zie dat je mailbox midden in een migratie tussen servers zit. Daardoor loopt de agendasynchronisatie soms vertraging op. **Gebruiker**: Hoelang gaat dat duren? **Agent**: Maximaal 2 uur. Ik houd het in de gaten en laat je weten wanneer het weer werkt. **Gebruiker**: Kan ik in de tussentijd wel handmatig vergaderingen aanmaken in Teams? **Agent**: Ja, maar ze verschijnen mogelijk niet meteen in Outlook. Ik raad je aan voorlopig rechtstreeks Teams te gebruiken. **Gebruiker**: Oké, bedankt dat je het laat weten. **Agent**: Geen probleem. Ik neem contact met je op zodra de synchronisatie weer loopt.

**6\. Cloudinfra – Azure-VM gestopt**

**Gebruiker**: Een van mijn testservers in Azure reageert niet meer. **Agent**: Laten we het uitzoeken. In welke omgeving staat de server? **Gebruiker**: In de subscription finance-dev. **Agent**: Gevonden. De server staat momenteel op 'Stopped (deallocated)'. Waarschijnlijk is hij wegens inactiviteit uitgeschakeld. **Gebruiker**: Kan ik hem zelf opnieuw opstarten? **Agent**: Dat kan, maar ik kan de herstart ook nu meteen voor je uitvoeren. **Gebruiker**: Doe maar. **Agent**: Bezig met opnieuw opstarten... De VM is naar verwachting binnen 2–3 minuten weer online. **Gebruiker**: Bedankt. Ik kijk zo even. **Agent**: Laat het me weten als hij niet bereikbaar is. Ik houd voor de zekerheid de opstartlogs in de gaten.

**7\. Universal Request – telefoonnummer bijwerken**

**Gebruiker**: Kun je mijn telefoonnummer in het bedrijfsadresboek bijwerken? **Agent**: Zeker. Eerst verifieer ik je identiteit. Een ogenblik, ik controleer je medewerkersprofiel in Workday. *...verifieert identiteit en contactgegevens...* **Agent**: Ik heb je profiel gevonden. Welk nieuw nummer wil je toevoegen? **Gebruiker**: Wijzig het alsjeblieft in +31 6 12345678. **Agent**: Begrepen. Ik werk het nu bij... Het nieuwe nummer staat nu in je profiel en in het adresboek. **Gebruiker**: Perfect. Moet ik nog iemand anders op de hoogte brengen? **Agent**: Nee, de wijziging is in alle systemen gesynchroniseerd. Voor dit verzoek is geen incident aangemaakt.

**8\. Security – phishinglink**

**Gebruiker**: Ik denk dat ik op een phishinglink in een e-mail heb geklikt. **Agent**: Bedankt dat je dit meldt. Ik registreer een vertrouwelijk incident en start een scan op de achtergrond op je apparaat. **Gebruiker**: Moet ik mijn laptop uitzetten? **Agent**: Dat is nog niet nodig. Klik niet op iets anders uit die e-mail. De scan is bezig. *...start ACC-malwarescan en isolatie...* **Agent**: De scan is gestart en het apparaat wordt gemonitord op afwijkingen. Ik heb ook het IT-securityteam ingelicht; zij nemen rechtstreeks contact met je op. **Gebruiker**: Oké. Bedankt voor de snelle hulp. **Agent**: Graag gedaan. Deze zaak wordt vertrouwelijk behandeld en is alleen zichtbaar voor bevoegde medewerkers.

**9\. Escalatie – een mens spreken**

**Gebruiker**: Ik wil gewoon met een echt persoon praten. **Agent**: Dat begrijp ik. Ik verbind je nu door met een medewerker. Een moment geduld, ik bereid de overdracht voor. *...vat de context van het probleem samen en stuurt het door naar de supportqueue...* **Agent**: Ik heb je gesprek en een samenvatting van het probleem naar de helpdesk gestuurd. Een medewerker neemt zo deel aan deze Teams-chat. **Gebruiker**: Bedankt. **Agent**: Graag gedaan. Ik blijf beschikbaar voor het geval je verder geautomatiseerde hulp nodig hebt.

**10\. Eindgebruikersapparaten – printer niet gevonden**

**Gebruiker**: Ik kan niet printen naar mijn vaste printer op kantoor. **Agent**: Laten we controleren of je apparaat nog aan de juiste printer is gekoppeld. Een ogenblik... *...scant apparaatinstellingen via ACC...* **Agent**: De koppeling met je printer lijkt te ontbreken. Mogelijk is die gereset. **Gebruiker**: Kun je hem opnieuw koppelen? **Agent**: Ja, ik maak nu opnieuw verbinding met printer HP-3rdFloor. *...voegt de printer opnieuw toe...* **Agent**: Klaar. Probeer opnieuw te printen. **Gebruiker**: Het werkt nu. Heel fijn! **Agent**: Graag gedaan. Ik heb de oplossing vastgelegd voor het geval het opnieuw gebeurt.

**11\. IAM – wachtwoord verlopen**

**Gebruiker**: Ik kan niet inloggen, mijn wachtwoord is verlopen. **Agent**: Laten we je wachtwoord resetten. Om veiligheidsredenen stuur ik een eenmalige verificatiecode naar je geregistreerde mobiele nummer. **Gebruiker**: Oké, ontvangen. De code is 742931. **Agent**: Geverifieerd. Ik reset nu je wachtwoord... Klaar. Je ontvangt per e-mail een tijdelijk wachtwoord. Wijzig dat na het inloggen. **Gebruiker**: Doe ik. Bedankt! **Agent**: Je bent helemaal klaar. Laat het me weten als je nog iets nodig hebt.

**12\. Bedrijfsapplicaties – veld in Salesforce ontbreekt**

**Gebruiker**: Een verplicht veld in Salesforce is uit mijn weergave verdwenen. **Agent**: Laten we het uitzoeken. Welk veld ontbreekt er? **Gebruiker**: Het veld "Customer Region" op de accountpagina. **Agent**: Begrepen. Ik controleer het Salesforce-schema en recente wijzigingen door beheerders... *...ontdekt dat de zichtbaarheid van het veld voor jouw rol is aangepast...* **Agent**: Het veld is onlangs verborgen voor gebruikers met jouw rol. Ik escaleer dit naar het Salesforce-beheerteam. **Gebruiker**: Kun je het weer zichtbaar maken? **Agent**: Ik heb geen rechten om de zichtbaarheid op rolniveau te overschrijven, maar ik heb een verzoek met alle details geregistreerd. Je krijgt bericht zodra het is opgelost.

**13\. Netwerk – trage wifi**

**Gebruiker**: Mijn wifi is vandaag echt traag. **Agent**: Ik voer een prestatiecontrole uit op je netwerkverbinding. *...analyseert wifisterkte en drukte op het netwerk...* **Agent**: Je bent verbonden met een druk 2,4GHz-netwerk. Ik raad je aan over te schakelen naar de 5GHz-band als die beschikbaar is. **Gebruiker**: Hoe doe ik dat? **Agent**: Open je wifi-instellingen en zoek naar het netwerk "CompanyNet-5G". Probeer daarmee verbinding te maken. **Gebruiker**: Gedaan. De snelheid lijkt al beter. **Agent**: Uitstekend. Ik leg dit vast voor het geval het opnieuw gebeurt.

**14\. Samenwerking – Teams crasht**

**Gebruiker**: Teams blijft crashen tijdens gesprekken. **Agent**: Vervelend om te horen. Ik bekijk de logs van je laatste crash. *...haalt crashlogs op via ACC...* **Agent**: Het probleem lijkt samen te hangen met geheugengebruik. Je hebt meerdere apps open die veel RAM gebruiken. **Gebruiker**: Wat moet ik doen? **Agent**: Ik raad je aan je apparaat opnieuw op te starten en tijdens gesprekken zo min mogelijk apps open te hebben. Zal ik ook de Teams-cache wissen? **Gebruiker**: Ja, graag. **Agent**: Cache gewist. Start Teams opnieuw op en houd de prestaties in de gaten. **Gebruiker**: Doe ik. Bedankt voor de hulp.

**15\. Cloud – GCP-app onbereikbaar**

**Gebruiker**: Onze marketingapp die op GCP draait, is onbereikbaar. **Agent**: Laten we kijken. Ik controleer de status van de applicatie voor het GCP-project. *...vraagt GCP-status en logs op...* **Agent**: Er is een regionale storing in de GCP-zone die je app gebruikt. Google onderzoekt het al. **Gebruiker**: Dus we moeten gewoon wachten? **Agent**: Ja. Ik heb je aangemeld voor updates en laat je weten wanneer het is opgelost. **Gebruiker**: Oké, laat het me weten zodra hij weer werkt. **Agent**: Doe ik.

**16\. Universal – weergavenaam wijzigen**

**Gebruiker**: Ik wil mijn weergavenaam in alle bedrijfssystemen wijzigen. **Agent**: Zeker, daar kan ik je mee helpen. Wat moet je nieuwe weergavenaam worden? **Gebruiker**: Wijzig hem alsjeblieft in "Alex van der Meer". **Agent**: Begrepen. Ik dien het verzoek in bij HR en de identitysystemen. Het kan een paar uur duren voordat de wijziging overal is doorgevoerd. **Gebruiker**: Oké, laat het me maar weten als het klaar is. **Agent**: Verzoek ingediend. Je ontvangt een bevestiging zodra de wijziging is voltooid.

**17\. Security – compliancezorg**

**Gebruiker**: Ik denk dat we meer Adobe-licenties gebruiken dan we hebben. **Agent**: Ik controleer je licentiegebruik via het Software Asset Management-systeem. *...haalt gegevens op uit het SAM Pro-dashboard...* **Agent**: Je hebt gelijk: het gebruik ligt momenteel 15% boven het gelicentieerde volume. **Gebruiker**: Dat is niet goed. Kunnen we er iets aan doen? **Agent**: Ik meld dit bij het complianceteam. Zij kunnen ongebruikte licenties terugvorderen of over extra licenties onderhandelen. **Gebruiker**: Graag. **Agent**: Ik heb het geregistreerd als compliancezorg. Je wordt betrokken bij de opvolging.

**18\. Apparaten – webcam niet gedetecteerd**

**Gebruiker**: Mijn webcam werkt niet in Zoom. **Agent**: Laten we het probleem opsporen. Ik controleer de drivers van je apparaat. *...detecteert een ontbrekende webcamdriver...* **Agent**: Je webcamdriver lijkt te ontbreken. Zal ik hem opnieuw installeren? **Gebruiker**: Ja, graag. **Agent**: Bezig met opnieuw installeren... Klaar. Test je camera. **Gebruiker**: Hij werkt weer. Dankjewel! **Agent**: Fijn om te horen. Ik houd het apparaat in de gaten voor het geval het probleem terugkomt.

**19\. IAM – buitengesloten door MFA**

**Gebruiker**: Ik kom niet langs MFA, mijn code wordt steeds geweigerd. **Agent**: Ik verifieer je identiteit en controleer de tokenconfiguratie. *...verifieert identiteit en controleert recente authenticatielogs...* **Agent**: Je token is geblokkeerd na te veel mislukte pogingen. Ik reset hem nu. **Gebruiker**: Bedankt. Wat kan ik verwachten? **Agent**: Je ontvangt per e-mail een nieuwe link om MFA te registreren. Gebruik die om je apparaat opnieuw in te stellen. **Gebruiker**: Begrepen. **Agent**: Alles is geregeld. Laat het me weten als je hulp nodig hebt bij het instellen.

**20\. Cloud – fout bij OCI-bucket**

**Gebruiker**: Ik krijg een 'access denied'-fout bij onze OCI-storagebucket. **Agent**: Laten we je IAM-rechten bekijken. *...controleert OCI-rolkoppelingen en policies...* **Agent**: Je account mist de vereiste leesrechten voor die bucket. **Gebruiker**: Kun je die toekennen? **Agent**: Ik kan OCI-rollen niet wijzigen, maar ik vraag de eigenaar van de bucket om je toe te voegen. **Gebruiker**: Graag. **Agent**: Verzoek ingediend. Je krijgt bericht zodra de toegang is toegekend.

**21\. Algemeen – wat is mijn IP-adres?**

**Gebruiker**: Kun je me mijn IP-adres vertellen? **Agent**: Zeker. Je bent momenteel verbonden via de VPN. Je interne IP-adres is 10.1.45.122. **Gebruiker**: En mijn externe? **Agent**: Je externe IP-adres is 84.234.91.7. Heb je het nodig voor support of voor toegang? **Gebruiker**: Gewoon ter informatie. Bedankt. **Agent**: Graag gedaan. Laat het me weten als je nog iets nodig hebt.

**22\. Samenwerking – zoeken in Outlook werkt niet**

**Gebruiker**: Zoeken in Outlook levert geen resultaten op. **Agent**: Laten we het uitzoeken. Ik controleer je lokale indexeringsinstellingen en bekende problemen in M365. *...analyseert logs van recente updates...* **Agent**: Er is een bekend probleem bij Microsoft met recente Outlook-builds. De workaround is je mailbox opnieuw te indexeren. **Gebruiker**: Kun je dat op afstand doen? **Agent**: Ja. Ik start nu het opnieuw indexeren. Dat kan 30–60 minuten duren. **Gebruiker**: Bedankt. Heeft dit gevolgen voor de toegang tot mijn e-mail? **Agent**: Nee, je e-mail blijft gewoon toegankelijk. Je krijgt een melding zodra het indexeren klaar is.

**23\. Bedrijfsapplicatie – urenregistratiesysteem onbereikbaar**

**Gebruiker**: Ik kan niet bij het urenregistratiesysteem. **Agent**: Ik controleer de systeemstatus en je toegangsrechten. *...controleert de planning van gepland onderhoud...* **Agent**: Het systeem is tot 18:00 uur in gepland onderhoud. **Gebruiker**: Ik heb geen melding gezien. **Agent**: Er is maandag een herinnering per e-mail verstuurd. Zal ik die opnieuw sturen? **Gebruiker**: Ja, graag. **Agent**: Gedaan. Laat het me weten als hij niet snel in je inbox staat.

**24\. Apparaten – hoog CPU-gebruik**

**Gebruiker**: De ventilator van mijn laptop maakt veel lawaai en hij is traag. **Agent**: Ik voer op afstand een prestatiecontrole uit... *...verzamelt CPU-gebruiksstatistieken via ACC...* **Agent**: Chrome gebruikt 85% van je CPU. Je hebt 37 tabbladen open. **Gebruiker**: Oeps. Dat verklaart het. **Agent**: Overweeg ongebruikte tabbladen te sluiten. Zal ik nu geheugen vrijmaken? **Gebruiker**: Ja, graag. **Agent**: Geheugen geoptimaliseerd. Alles zou nu soepeler moeten lopen.

**25\. Universal – nieuwe laptop aanvragen**

**Gebruiker**: Kan ik een nieuwe laptop aanvragen? **Agent**: Zeker. Wil je een oude laptop vervangen of vraag je er een aan voor een nieuwe medewerker? **Gebruiker**: Ik wil de mijne vervangen, hij wordt traag. **Agent**: Ik controleer de leeftijd van je huidige apparaat en of je in aanmerking komt... *...controleert de levenscyclus via de CMDB...* **Agent**: Je apparaat is 4,2 jaar oud en komt in aanmerking voor vervanging. Ik dien het verzoek in ter goedkeuring door je manager. **Gebruiker**: Mooi, bedankt. **Agent**: Verzoek ingediend. Je ontvangt updates over de voortgang.
