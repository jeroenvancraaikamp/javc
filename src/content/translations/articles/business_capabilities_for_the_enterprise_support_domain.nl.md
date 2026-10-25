---
title: "Business capabilities voor het Enterprise Support-domein"
excerpt: "Aan het eind van het jaar kijken sommigen terug en – belangrijker nog – kijken sommigen vooruit. Ik deed allebei. Toen ik terugkeek, viel me op dat veel mensen klagen dat hun IT4IT-investeringen niet genoeg opleveren voor hun geld. Na twintig jaar is Gartner gestopt met het publiceren van het"
source: "e67b5e029c99e0fa"
---

Aan het eind van het jaar kijken sommigen terug en – belangrijker nog – kijken sommigen vooruit. Ik deed allebei.

Toen ik terugkeek, viel me op dat veel mensen klagen dat hun IT4IT-investeringen niet genoeg opleveren voor hun geld. Na twintig jaar is Gartner gestopt met het publiceren van het Magic Quadrant voor ITSM-tools. Configuration management (als proces om de inhoud van de CMDB te onderhouden) gebeurt nu nog maar zelden handmatig of onder regie van change management. In plaats daarvan wordt de inhoud van de CMDB steeds vaker onderhouden via discovery en federatie – de zero-touch CMDB is de norm geworden. Nu code automatisch wordt gegenereerd, geïntegreerd, getest en uitgerold in een public cloud, is de behoefte aan change management niet meer wat die in 2007 was (toen ITIL V3 uitkwam) of zelfs in 2019 (toen ITIL V4 uitkwam). Dat gezegd hebbende: vorig jaar kwam ik bedrijven tegen die binnen het Enterprise Support-domein nog steeds weinig tot geen automatisering, integraties of AI hebben. Voor hen was ITIL V4 (2019) een goede (eerste) match.

In 2024 richtte ServiceNow zich op het naar zijn platform brengen van AI voor iedereen die ervoor wilde betalen, zodat het platform allerlei verzoeken, vragen, bestellingen en berichten van individuen kan afhandelen en via geautomatiseerde workflows kan verwerken. Generatieve AI wordt gebruikt om antwoorden aan gebruikers te genereren en om de interactie met gebruikers in 'tickets' samen te vatten en te vertalen.

In 2025 worden de large language models, die alleen vooraf gedefinieerde informatie konden geven, vervangen door Artificial General Intelligence (AGI), die kan redeneren en haar antwoorden kan aanpassen op basis van observaties en ervaringen. Er worden AI-agents geïntroduceerd om specifieke taken af te handelen (bijvoorbeeld het ondersteunen van verzoeken om IT-hulp of kennis, of het reserveren van faciliteiten), waardoor hun nut verder reikt dan alleen IT. Deze AI-agents in ServiceNow gaan in gesprek met gebruikers, benutten operationele en CMDB-gegevens van het platform en communiceren met API's, microservices en andere AI-agents in de verschillende bedrijfsfuncties.

Terwijl ServiceNow zich op AI richtte, omarmde de IT-community andere DevOps-tools en -practices en integreerde die naadloos. Daardoor is het IT-toollandschap bij de meeste bedrijven zeer divers geworden. Elk bedrijf gebruikt nu zijn eigen set tools, afgestemd op specifieke capabilities, waarbij sommige tools meerdere capabilities bieden.

Tot het eind van dit decennium willen enterprise architects wellicht onderscheid maken tussen de volgende **business capabilities binnen het Enterprise Support-domein**, die ook moderne capabilities omvatten die niet in traditionele frameworks als DevOps, DevSecOps, ITIL, SAFe enzovoort zijn opgenomen. Voor zover ik weet overlappen deze 15 capabilities elkaar niet en zijn ze toekomstbestendig (in elk geval tot 2030), ongeacht welke practice jouw organisatie gebruikt en naar welke practice ze overstapt (zelfs als die vandaag nog niet bestaat):

1.  AI-ondersteunde medewerkersbetrokkenheid en samenwerking
2.  Plannen/roadmap (OKR's, projectportfolio)
3.  Architectuur en ontwerp (digitaal productportfolio)
4.  CMDB/SCM (service, asset & configuratie)
5.  Ontwikkelen (bouwen & testen)
6.  Security/privacy (kwetsbaarheden & dataverlies)
7.  Identity & access (SSO, RBAC, entitlements)
8.  Uitrollen (integreren & opleveren)
9.  Beheren (observeren/reageren)
10.  Human capital (oftewel human resources)
11.  Werkplekdiensten, OT & facilitair
12.  Finance, legal & supply chain
13.  Geïntegreerd risicobeheer en bedrijfscontinuïteit (oftewel governance, risk & compliance)
14.  AI-ondersteunde klantbetrokkenheid\*
15.  Field service & dispatch\*

\* Let op: 'AI-ondersteunde klantbetrokkenheid' en 'field service & dispatch' zijn capabilities die op externe klanten gericht zijn (oftewel customer service, CSM). Sommige bedrijven sluiten ze uit van de Enterprise Support-capabilities (ESM), terwijl andere ESM en CSM liever samen houden vanwege hun technologische overeenkomsten (als je bijvoorbeeld een buitendienstmonteur naar een klant stuurt, lijkt dat sterk op het sturen van een buitendienstmonteur naar een kantoor van de eigen organisatie, zeker als de buitendienst is uitbesteed).

> **Elk van de 15 ESM/CSM-business capabilities wordt mogelijk gemaakt door slechts een beperkt aantal platforms. Wat vroeger door één platform werd ondersteund (zoals het medewerkersportaal, ITSM en de CMDB), wordt waarschijnlijk over meerdere platforms verdeeld. Gespecialiseerde verticale AI-agents maken een business capability mogelijk. Organisaties zullen verschillende keuzes maken over welk platform van welke leverancier door wie en tot wanneer wordt gebruikt om welke business capability te leveren. Als een organisatie innovatie en onderhoud heeft uitbesteed, kunnen sommige business capabilities door de managed service providers worden geleverd (of onderdeel zijn van hun dienstverlening).**

IT-oplossingen voor HR, finance, legal, supply chain en risk worden vaak niet door de IT-afdeling van de organisatie geselecteerd, beheerd of onderhouden. In de afbeelding hierboven zijn deze niet-IT-capabilities daarom groen gemarkeerd. Niet-IT-capabilities buiten het Enterprise Support-domein beheren is vaak vragen om problemen. Zo is de L3-capability 'Joiner, Mover & Leaver (JML)' onderdeel van de L2-capability 'Human capital (HCM)'. JML is vrijwel onmogelijk zonder geautomatiseerde koppelingen met capabilities die door anderen dan HR worden geleverd (zoals 'identity & access', 'security/privacy', 'geïntegreerd risicobeheer' en 'finance, legal & supply chain'). Dat gezegd hebbende: IT HR-contracten en -geschillen laten afhandelen is waarschijnlijk ook geen goed idee :-)

Ik raad organisaties aan het eenvoudig te houden en deze level 2-business capabilities (L2) te omarmen bij het plannen en ontwerpen van hun architectuur voor het gehele (L1) Enterprise/Customer Support-domein. Voor de meeste capabilities (zoals 1, 2, 3, 4, 10, 11, 12, 13, 14 en 15) is het meestal verstandig zo weinig mogelijk IT-oplossingen te gebruiken. Voor meer technische capabilities is het vaak zinvol de tools te gebruiken die het best bij specifieke technologieën passen.

Momenteel maken 528 leveranciers ruim 700 tools die capabilities voor het Enterprise Support-domein bieden. De meeste van deze tools richten zich doorgaans op slechts één van de hierboven genoemde L2-business capabilities.

In theorie kan ServiceNow 11 van de business capabilities leveren. In de praktijk gebruikt ongeveer 50% van de bedrijven ServiceNow voor slechts drie of vier van de genoemde capabilities. Weinig bedrijven gebruiken dezelfde capabilities en waarschijnlijk heeft geen enkel bedrijf ze identiek geïmplementeerd. ServiceNow is niet de enige tool die voor een capability wordt gebruikt. Als de CMDB bijvoorbeeld via federatie vanuit INTUNE wordt gevuld, levert INTUNE CMDB/SCM-capabilities. Zo zijn ook GitHub en JFROG Artifactory populaire componentrepository's (SCM) in DevSecOps, die vaak weinig overlap hebben met de CMDB-inhoud in ServiceNow.

Verouderde frameworks zoals ITIL V3/V4 zijn niet verenigbaar met moderne geautomatiseerde DevSecOps- en AI-practices. Over het algemeen geldt het als good practice om ervoor te zorgen dat het platform alleen door de beoogde doelgroep voor het beoogde doel wordt gebruikt, zeker als het product of platform, inclusief documentatie, door de leverancier wordt onderhouden. Definities en vocabulaires gebruiken die afwijken van die van de platformleverancier leidt bijna altijd tot verwarring en extra kosten.

Toch gebruiken veel bedrijven technische functionaliteiten van een platform voor onbedoelde doeleinden of doelgroepen. Ik heb bijvoorbeeld platforms gezien waar het incident management-proces werd gebruikt om een wachtwoordreset aan te vragen (redenering: 'Ik kan niet inloggen, dus IT moet kapot zijn'). Wordt het ticketsysteem daarmee een Identity and Access Management-platform? Ik denk het niet. De interactie met de gebruiker die een wachtwoordreset nodig heeft, valt onder 'AI-ondersteunde medewerkersbetrokkenheid en samenwerking', terwijl de daadwerkelijke wachtwoordreset onder 'identity & access (SSO, RBAC, entitlements)' hoort. Een verzoek om een wachtwoordreset moet niet als incident worden geregistreerd.

Nog een voorbeeld: storingen of prestatieproblemen worden misschien automatisch opgelost voordat een gebruiker ze zelfs maar opmerkt. Als de storing al afzonderlijk via 'observeren' is geregistreerd of gemeld, is het twijfelachtig om haar nogmaals als incident te registreren.

**CONCLUSIE:**

Er is momenteel geen enkel framework dat alle capabilities definieert die in het Enterprise Support-domein worden gebruikt. **De beste aanpak is waarschijnlijk om de IT-tools van je bedrijf te koppelen aan de 15 business capabilities hierboven** en vervolgens per capability te beoordelen of rationalisatie of consolidatie van tools nodig of wenselijk is.

In het digitale portfolio moeten architecten vastleggen welke van de 15 L2-business capabilities elk product levert. Daarnaast moeten het beoogde doel en de beoogde doelgroep van elk product worden vastgelegd (bijvoorbeeld in high level designs). In plaats van L3-capabilities uit een bepaald framework over te nemen (zoals ITIL, DevOps, DevSecOps, IT4IT enzovoort), raad ik aan te verwijzen naar de vocabulaire en definities die de leverancier gebruikt. Zo kunnen organisaties (updates van) de documentatie van de leverancier consequent hergebruiken, die waarschijnlijk 100% in lijn blijft met de out-of-the-box platformfunctionaliteit van de leverancier, die continu en snel wordt vernieuwd. Bovendien kunnen organisaties zo overstappen van het ene framework naar het andere en tijdens de overgang beide frameworks gebruiken voor een of meer van de business capabilities.
