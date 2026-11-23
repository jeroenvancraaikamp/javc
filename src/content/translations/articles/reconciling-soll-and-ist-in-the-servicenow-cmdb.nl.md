---
title: "Geautoriseerd of niet? SOLL en IST afstemmen in de ServiceNow CMDB"
excerpt: "De CMDB legt vast wat er is, niet wat is goedgekeurd. Om te zien wat afwijkt van wat is geautoriseerd, moet je de goedgekeurde toestand apart registreren en een routine hebben die beide in twee richtingen vergelijkt. Dit artikel laat in vier stappen zien hoe."
source: "29a240ea977ab204"
---

Elke organisatie vraagt zich af of een wijziging is toegestaan voordat die live gaat. Veel minder organisaties vragen zich achteraf af of wat draait ook is wat was toegestaan.

In ServiceNow is die tweede vraag lastig, omdat de CMDB wordt gevuld door Discovery en integraties: de CMDB legt vast wat er is, niet wat is goedgekeurd. Als je de CMDB met de werkelijkheid vergelijkt, vergelijk je waarneming met waarneming. Om te zien wat afwijkt van wat is geautoriseerd, moet je de goedgekeurde toestand apart registreren en een routine hebben die beide in twee richtingen vergelijkt. Dit artikel laat in vier stappen zien hoe, en eindigt met hoe je risk officers, change managers, DevOps- en securityengineers één gedeeld beeld geeft.

## Het probleem: de CMDB toont wat is, niet wat is geautoriseerd

SOLL en IST zijn Duitse woorden die in de Nederlandse IT veel gebruikt worden: de doeltoestand en de feitelijke toestand.

| Term | Betekenis | Bron in ServiceNow |
| --- | --- | --- |
| SOLL | Wat er moet zijn: goedgekeurde changes, standaarden, ontwerp, eigenaarschap | Change requests, Desired State-templates, servicemodel, reconciliatieregels |
| IST | Wat er is: de waargenomen configuratie | Discovery en integraties, weggeschreven naar de CMDB |
| Was | Wat het eerder was, en wie of wat het heeft gewijzigd | Wijzigingshistorie, bron per attribuut, gesloten change requests |

Als iemand buiten het proces om een server wijzigt, overschrijft de volgende Discovery-run de CMDB, die de afwijking dan als feit toont. Tenzij de goedgekeurde toestand elders is geregistreerd, is het bewijs weg. SOLL en IST lopen uiteen door ongeautoriseerde wijzigingen, wijzigingen die anders zijn doorgevoerd dan goedgekeurd, goedgekeurde wijzigingen die nooit zijn uitgevoerd, CI's waar niemand om heeft gevraagd, en onjuiste data.

## Stap 1: registreer wat er moet zijn

"Geautoriseerd" betekent meerdere dingen, dus SOLL heeft meerdere plekken. Registreer elke vorm daar waar het platform hem kan vergelijken.

| Soort SOLL | Waar registreer je het |
| --- | --- |
| Goedgekeurde change: welke CI mag wijzigen, wanneer, hoe | Change request: Affected CIs, geplande window, goedgekeurde scope |
| Vaste standaard: hoe een CI er altijd uit moet zien | Desired State: een filter plus een template met voorwaarden voor attributen en relaties |
| Beoogde structuur: welke CI's ondersteunen welke service | CSDM-servicemodel: Business Application, Application Service, Service Instance |
| Gezaghebbende bron: wie welk attribuut mag schrijven | Reconciliatieregels in de Identification and Reconciliation Engine (IRE) |
| Geattesteerde feiten: eigenaar, locatie, supportgroep | Data Certification, met de CI-eigenaar als attester |

De change request is het belangrijkst, omdat het de enige SOLL is die specifiek is en aan een tijdvenster is gebonden. In de praktijk:

- **Eerst de scope.** Kies de klassen en attributen die je onder controle brengt en begin met productie-CI's achter kritieke services.
- **Laat de change detail op CI-niveau bevatten.** Verplicht Affected CIs en leg beoogde nieuwe waarden gestructureerd vast. Dat laatste is een ontwerpaanvulling, bijvoorbeeld een kleine gerelateerde tabel (CI, attribuut, van, naar).
- **Registreer eigenaren.** Taken, notificaties en reviews zijn afhankelijk van een eigenaar en een supportgroep per CI.
- **Definieer "gedekt door een change".** Bijvoorbeeld: de CI is een Affected CI van een change in de status Implement, binnen de geplande window. Zonder deze definitie kan niemand zeggen wat "ongeautoriseerd" betekent.

## Stap 2: weet wat er is, en wat er was

Een vergelijking is maar zo goed als de IST-kant, die actueel, toewijsbaar en gehistoriseerd moet zijn:

- **Actueel.** Discovery moet de CI's binnen scope vaak genoeg dekken voor jouw detectietijd. Een CI die recent niet is gezien, is een IST-gat, geen "geen wijziging". Bewaak de gezondheid van Discovery net zo zorgvuldig als de vergelijking.
- **Toewijsbaar.** Met reconciliatieregels heeft elk attribuut één gezaghebbende schrijver. Een afwijking zonder bekende schrijver is het sterkste signaal van een ongeautoriseerde wijziging of een ongecontroleerde integratie.
- **Gehistoriseerd.** Discovery herstelt de CMDB, waardoor de vorige waarde verdwijnt. Zonder historie zie je dat een waarde onjuist is, maar niet wanneer die is veranderd, dus je kunt hem niet aan een change-window koppelen.

### Echte wijzigingen zien als elke CI dagelijks opnieuw wordt ontdekt

Als CI's dagelijks opnieuw worden ontdekt, verandert de datum van laatste ontdekking elke dag op elke CI. Gebruik "updated on" dus niet om echte wijzigingen te vinden. De platform-audit legt een veld alleen vast als de waarde verandert, dus het volume volgt echte wijzigingen plus die hartslag. Bij honderdduizenden CI's in honderden tabellen is alles volgen niet nodig en niet betaalbaar, dus beperk de scope in lagen:

| Laag | Wat | Hoe je wijziging detecteert | Historie |
| --- | --- | --- | --- |
| 1 | Kritieke klassen, met tientallen gecontroleerde attributen en relaties | Een wijzigingsbron, zie hieronder | Ja |
| 2 | Overige CI's die je belangrijk vindt | Desired State-audits vergelijken de huidige toestand met de regel | Niet nodig |
| 3 | De rest | Buiten scope | Geen |

Kies voor laag 1 per groep CI's een wijzigingsbron:

- **Events voor ongeautoriseerde wijzigingen, voor CI's in application services.** Het event is het bewijs van de wijziging, dus een historiequery is niet nodig. Controleer dat de dagelijkse Discovery-datum niet als wijziging telt en welke klassen op de toegestane lijst staan, want die lijst bepaalt je scope.
- **Een compact wijzigingslog,** weggeschreven door een business rule of flow op de gecontroleerde attributen: CI, attribuut, oude waarde, nieuwe waarde, bron, tijdstempel.
- **Een dagelijkse fingerprint:** één hash per CI over de gecontroleerde attributen en gerelateerde items, alleen opgeslagen wanneer die verandert.
- **De platform-audittabel, alleen voor vragen over één CI.** Die is groot, traag voor bevragingen over het hele landschap en vol hartslagregels. Als je hem gebruikt, stop dan met het auditen van het veld voor laatste ontdekking.

Meet het volume eerst in een pilot. Twee beperkingen blijven: bij dagelijkse Discovery is een wijziging die tussen twee runs wordt gedaan en teruggedraaid onzichtbaar, en het vastgelegde tijdstip is het moment van ontdekking, dus gebruik bronttijdstempels zoals een installatiedatum waar die bestaan.

## Stap 3: vind het verschil

De vergelijking loopt in twee richtingen: werkelijkheid die niet was geautoriseerd, en autorisatie die geen werkelijkheid werd. Zes gevallen dekken dit af.

| Geval | Wat je ziet | Classificatie |
| --- | --- | --- |
| 1 | IST is gelijk aan SOLL | Conform |
| 2 | IST gewijzigd, en een actieve change dekt de CI | Change loopt; SOLL schuift mee bij afsluiten |
| 3 | IST gewijzigd, geen change dekt de CI | Ongeautoriseerde wijziging |
| 4 | Een change dekt de CI, maar IST wijkt af van wat is goedgekeurd | Afwijkende implementatie |
| 5 | Een change is gesloten, maar IST toont geen wijziging | Geautoriseerd maar niet geïmplementeerd |
| 6 | Een CI bestaat zonder eigenaar, service, aanvraag of change | Ongeregistreerde CI |

Geval 4 en 5 vergeten teams het vaakst, omdat er niets stukgaat als een goedgekeurde change nooit wordt uitgevoerd. Drie detecties dekken alle zes:

1. **Detectie van ongeautoriseerde wijzigingen (event-gedreven).** Wanneer Discovery een wijziging van een CI-eigenschap ziet, controleert het systeem de toegestane klassen, de negeerperiode voor notificaties en of een actieve change request de CI dekt. Is die er niet, dan wordt een ci.change.unplanned-event aangemaakt en, als eventverwerking aanstaat, een Emergency change die als ongeautoriseerd is gemarkeerd ([documentatie](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)). Het vereist de Service Mapping-integratie, controleert alleen CI's in application services, en eventverwerking staat standaard uit.
2. **Desired State-audits (gepland).** Een filter, een template met de verwachte attributen en relaties, en een audit die falende CI's specificeert en vervolgtaken genereert ([documentatie, Zurich](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)). Gebruik dit voor vaste regels en voor CI's buiten application services.
3. **Verificatie van change tegen IST (een ontwerp dat je zelf toevoegt).** Een geplande vergelijking die IST-wijzigingen buiten elk change-window vindt, en gesloten changes waarvan de Affected CIs na de Discovery na implementatie de geplande waarden niet tonen. Dit zijn geval 3, 4 en 5.

<figure>
  <img src="/images/reconciling-soll-and-ist-diagram.svg" alt="Diagram: SOLL en IST voeden drie detecties, en elke bevinding komt terecht in één lijst met verschillen" />
  <figcaption>SOLL en IST voeden alle drie de detecties, en elke bevinding komt terecht in één lijst, geclassificeerd volgens de zes gevallen.</figcaption>
</figure>

## Twee bijzondere gevallen

### Softwarewijzigingen op een server, niet de server zelf

Een bijgewerkt pakket op een Windows-server wijzigt een gerelateerd record, niet de eigen attributen van de server, dus een vergelijking op serverattributen ziet niets. Vergelijk op hostniveau en oordeel op risico: een leveranciersupdate die een kwetsbaarheid dicht is een afwijking die het risico verlaagt, terwijl een niet-goedgekeurde remote-accesstool aandacht verdient ook al lijkt het serverrecord onaangetast.

Registreer software-SOLL als regel, niet als exacte versies: per serverrol de goedgekeurde producten, uitgever, minimumversie en updatepad, als Desired State-template. Beoordeel elke softwarewijziging in volgorde: gedekt door een actieve change, binnen de baseline, of anders een bevinding met een risicoscore.

| Waargenomen wijziging | Behandeling |
| --- | --- |
| Nieuwere versie van een goedgekeurd product, van de goedgekeurde uitgever | Verwachte drift: registreer als informatie en laat een standaard change patchcycli dekken |
| Versie buiten de regel (downgrade, niet-goedgekeurde major versie) | Bevinding ter beoordeling: een downgrade kan een bekende kwetsbaarheid terugbrengen |
| Goedgekeurd product verwijderd of uitgeschakeld (bijvoorbeeld een securityagent) | Hoge prioriteit |
| Nieuw product dat niet in de baseline staat | Ongeautoriseerd; hogere prioriteit voor tools met remote access, beheerdersrechten of open poorten |

Vergelijk op genormaliseerd product, uitgever en versie, en tel bevindingen op per host, want een patchcyclus raakt tientallen pakketten per server.

### Wanneer de mensen die SOLL registreren geen IST produceren

Risk officers en architecten registreren SOLL, terwijl ontwikkelaars IST produceren tot in fijn detail, zoals container-pods. De eerste groep kan niet elke pod beoordelen, en de tweede hoort haar eigen werk niet te autoriseren. Registreer SOLL dus op het niveau dat elke groep kan beoordelen, en laat de pipeline het detail dragen:

- **Beleid** (risk officers, architecten): risicoklassen, toegestane registries, verboden instellingen, servicegrenzen.
- **Guardrails** (platformteam): goedgekeurde basisimages, koppeling van namespace aan service, admission-regels.
- **Gedeclareerde toestand** (ontwikkelaars): manifesten, image digests en bill of materials per release.

Maak de release de geautoriseerde eenheid, niet de pod: de pipeline legt elke release vast als een change met digests, testbewijs en goedkeuringen. Definieer "ongeautoriseerd" als ontbrekende herkomst: een workload zonder pipeline-record, een niet-goedgekeurde registry, een digest die afwijkt van de release, of een verboden instelling. Stuur bevindingen naar het ontwikkelteam dat de namespace beheert, geef risk officers aggregaten en uitzonderingen, en vereis peer review in de pipeline, zodat goedkeuring onafhankelijk is van de uitvoerder. Wat jouw instance kan vergelijken, hangt ervan af of Kubernetes-discovery en de DevOps-integratie in gebruik zijn.

## Stap 4: stem af

Elk verschil wordt afgesloten met een van vier besluiten, genomen door de CI-eigenaar, niet door de tool:

| Besluit | Wanneer | Wat je doet |
| --- | --- | --- |
| De werkelijkheid herstellen | De wijziging mag niet blijven staan | Terugdraaien via een incident of corrigerende change; Discovery bevestigt de IST |
| Achteraf goedkeuren | De wijziging is acceptabel maar was niet geautoriseerd | Keur de Emergency change na review goed, rond de post-implementation review af, werk SOLL bij |
| De data corrigeren | De CMDB is onjuist, niet de werkelijkheid | Herstel het discovery-patroon, de bron of de regel; pas de waarde niet handmatig aan |
| Een uitzondering accepteren | Een bekende afwijking wordt een tijd getolereerd | Leg eigenaar, reden en einddatum vast |

Een change die nooit is geïmplementeerd wordt afgerond of geannuleerd, met een vastlegging dat SOLL niet langer geldt. Een ongeregistreerde CI wordt geregistreerd of verwijderd. Vier regels houden de cyclus eerlijk:

- **Kopieer IST nooit automatisch naar SOLL.** Dan is elke afwijking bij de volgende run geautoriseerd.
- **Eén auditrecord per verschil,** met de herstelactie eraan gekoppeld.
- **Sluit af door opnieuw te meten:** de volgende Discovery of audit toont IST gelijk aan SOLL, of een goedgekeurde uitzondering geldt.
- **Begrens in tijd en koppel terug.** Escaleer naar de Change Advisory Board (CAB) als de tijd om is, en behandel terugkerende verschillen als een procesgat.

## Eén waarheid, meerdere gezichtspunten

Hetzelfde verschil betekent voor elke belanghebbende iets anders. Als elke groep een eigen lijst bijhoudt, spreken de lijsten elkaar tegen en vertrouwt niemand er een.

| Belanghebbende | Wat een verschil betekent | Vraag om te beantwoorden |
| --- | --- | --- |
| Risk officer | Een onbeheerst risico, een mogelijk falende beheersmaatregel | Hoeveel ongeautoriseerde afwijkingen staan open in kritieke services, en hoe lang al? |
| Change manager | Het proces is omzeild, of een goedgekeurde change is niet uitgevoerd | Welke afwijkingen hebben geen change, en welke gesloten changes zijn niet geverifieerd? |
| DevOps-engineer | Drift ten opzichte van de gedeclareerde toestand | Wat wijkt af voor mijn service, en wat moet ik doen? |
| Securityengineer | Een groter aanvalsoppervlak | Welke hosts bevatten niet-goedgekeurde of onbeschermde items, gerangschikt op blootstelling? |
| Asset owner | Minder controle over hun assets | Welke verschillen wachten op mijn besluit? |
| Auditor | Ontbrekend bewijs | Kun je voor elke afwijking detectie, besluit en afsluiting aantonen? |

Eén enkele bron van waarheid betekent hier één plek om te vragen, met een traceerbare herkomst per feit, niet één database. Vier principes bereiken dat:

1. **Eén gedeeld verschilrecord.** Normaliseer de uitvoer van de drie detecties naar één recordtype: CI, service, geval (1 tot 6), risicoscore, status, besluit, eigenaar, link naar change en tijdstempels. Standaard ServiceNow produceert aparte records, dus dit is een ontwerpaanvulling die naar die records verwijst.
2. **Eén vocabulaire en één risicoscore.** Dezelfde zes gevallen, ernstniveaus, statussen en besluiten voor iedereen. Bouw de score op uit servicekritiek, soort afwijking, blootstelling zoals openstaande kwetsbaarheden, en ouderdom.
3. **Koppel op CI-identiteit en de servicehiërarchie** (Business Application, Application Service, CI), zodat een risk officer en een DevOps-engineer dezelfde bevinding op verschillende niveaus zien.
4. **Een weergave en een actie per rol, geen kopie,** met het bewijs bewaard in het record voor de auditperiode.

De spanning tussen DevOps-snelheid en risicobeheersing wordt in de beleidslaag beslecht, via de goedgekeurde baseline en vooraf goedgekeurde standaard changes, niet geval voor geval. Waar groepen het oneens zijn, beslist de baseline en legt het uitzonderingsproces elke afwijking vast.

## Aan de slag

Bouw de beheersmaatregel in vier stappen op, elk afzonderlijk bruikbaar:

1. **Fundament:** scope, eigenaarschap, de definitie van "gedekt door een change", en verplichte Affected CIs.
2. **Detecteren:** schakel detectie van ongeautoriseerde wijzigingen in, inclusief eventverwerking, en voer de eerste Desired State-audits uit.
3. **Verifiëren:** voeg de controle van change tegen IST toe en een Discovery na implementatie, zodat geval 4 en 5 zichtbaar worden.
4. **Afstemmen en rapporteren:** het besluitmodel, termijnen, uitzonderingen en indicatoren.

Geef elk onderdeel een eigenaar: de configuration manager beheert de SOLL-registers, de CI-eigenaar besluit per verschil, de change manager en CAB beoordelen ongeautoriseerde wijzigingen, en de platformeigenaar houdt detectie en Discovery-dekking draaiende. Volg een paar indicatoren: het aandeel CI's binnen scope met een eigenaar, service en template; ongeautoriseerde wijzigingen per periode; het aandeel gesloten changes dat in IST is geverifieerd; de tijd van detectie tot afsluiting; en uitzonderingen die na hun einddatum nog openstaan, wat nul moet zijn. Voor een SOC 2 Type II-audit is die reeks het bewijs, dus de vergelijking moet continu draaien en de uitvoer moet worden bewaard.

Valkuilen om te vermijden:

- Beginnen met alle klassen en attributen, of historie bijhouden voor elk attribuut op elke tabel: het is duur en grotendeels ruis.
- Detectie aanzetten maar eventverwerking uitgeschakeld laten, zodat er niets wordt aangemaakt.
- De CMDB als SOLL behandelen, waardoor de vergelijking cirkelvormig wordt.
- Alleen vertrouwen op de standaardfunctie, die CI's in application services en door Discovery zichtbare wijzigingen dekt.
- Afstemmen door SOLL te overschrijven met IST.

## Bronnen en opmerkingen

- [Unauthorized change request, ServiceNow-documentatie](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)
- [Desired State, ServiceNow-documentatie (Zurich)](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)

De twee pagina's beschrijven de standaardfuncties. De geplande waarden op de change, de vergelijking van change met IST, het gedeelde verschilrecord, het wijzigingslog en de fingerprint, en het uitzonderingsrecord zijn ontwerpaanbevelingen, geen standaardfuncties. Controleer auditinstellingen, software asset management, Vulnerability Response, Kubernetes-discovery en de DevOps-integratie aan de hand van je eigen instance.
