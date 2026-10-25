---
title: "Driftmanagement: waarom het ertoe doet, wie het nodig heeft en hoe je het goed aanpakt"
excerpt: "IT-omgevingen gaan zelden kapot door één grote, dramatische gebeurtenis. Veel vaker eroderen ze langzaam: een configuratievlag die stilletjes wordt omgezet, een firewallregel die \"even om te testen\" wordt toegevoegd, een VM die zonder documentatie wordt geresized, een registersleutel die door een engineer in"
source: "10495e80de7ddf01"
---

IT-omgevingen gaan zelden kapot door één grote, dramatische gebeurtenis. Veel vaker eroderen ze langzaam: een configuratievlag die stilletjes wordt omgezet, een firewallregel die "even om te testen" wordt toegevoegd, een VM die zonder documentatie wordt geresized, een registersleutel die door een engineer in haast wordt aangepast. Afzonderlijk onschuldig. Opgeteld fataal. Die sluipende erosie heet **configuration drift**, en als je die niet beheerst, ondermijnt ze de beveiliging, de stabiliteit, de auditeerbaarheid en het verstand van je engineers. Deze blog legt uit wat driftmanagement is, waarom organisaties er baat bij hebben en wat je echt nodig hebt om het effectief in te voeren.

## 1\. Wat is drift precies, en waarom ontstaat het?

**Configuration drift** ontstaat wanneer de *werkelijke toestand* van de infrastructuur afwijkt van de *gedocumenteerde of beoogde toestand*.  
Het raakt on-prem servers, cloudresources, netwerken, containers, eindgebruikersapparaten, noem maar op.

Drift ontstaat meestal door:

-   Noodfixes die nooit worden teruggedraaid
-   Handmatige wijzigingen buiten change management om
-   Automatiseringsscripts die elkaars werk overschrijven
-   Engineers met verhoogde rechten die "even snel een update doen"
-   Verschillen tussen omgevingen (OTAP) die in de loop van de tijd groeien
-   Patches of leveranciersupdates die standaardinstellingen wijzigen

Met andere woorden: frictie tussen *hoe we denken dat systemen geconfigureerd zijn* en *hoe ze zich in werkelijkheid gedragen*.

## 2\. Waarom zou iemand zich er druk om maken? (Een verrassend lange lijst)

### Securityteams

Drift zet de deur open voor misconfiguraties, een van de meest voorkomende grondoorzaken van moderne inbreuken.  
Inzicht in drift ondersteunt direct frameworks als DORA, SOC 2, ISO 27001 en NIST 800-53.

### Operationsteams

Onverwachte verschillen tussen servers of omgevingen leiden vaak tot mislukte deployments, instabiele applicaties en het bekende  
"werkt op DEV maar niet op PROD"-scenario.

### Auditors & risicomanagement

Driftmanagement levert precies wat auditors willen: traceerbaarheid, bewijs, beheersing en herhaalbaarheid.

### Architecten & platform engineers

Betrouwbare baselines voorkomen architecturale entropie.  
Als elke omgeving langzaam muteert, draai je geen platform meer, maar een dierentuin.

## 3\. Hoe beheer je drift? (De praktische aanpak)

Effectief driftmanagement is niet één tool. Het is een **capability** die rust op vier pijlers:

### Pijler 1: een betrouwbare baseline

Je hebt een heldere definitie nodig van de beoogde toestand: serverbuild-templates, netwerkconfiguraties, cloudpolicy's, applicatiemanifests enzovoort.  
Geen baseline = geen driftdetectie.

### Pijler 2: continue dataverzameling

Je hebt telemetrie nodig van instellingen op OS-niveau, software, packages, VM-/cloudresources, netwerkapparaten, IAM-policy's en meer.  
Bronnen kunnen agents zijn (Tanium), CM-tools, ServiceNow ITOM Discovery, SCCM/Intune, SCVMM, cloud-API's of scripts.

### Pijler 3: intelligente vergelijking

Vergelijk de beoogde met de werkelijke toestand. Deel drift in als verwachte wijzigingen, getolereerde maar niet-compliant wijzigingen, kritieke drift of drift met een securityrisico.  
Ruisonderdrukking is essentieel.

### Pijler 4: herstel & governance

Drift detecteren is pas het begin; het corrigeren is waar het om draait.  
Automatisering, goedkeuringen, handmatige correcties of tijdelijke uitzonderingen spelen allemaal een rol.  
Integratie met change management, CMDB, CI/CD en securityprocessen is cruciaal.

## 4\. Wie is eigenaar van driftmanagement?

De verantwoordelijkheid ligt meestal bij meerdere teams:

-   **Platform/Operations:** baselines onderhouden
-   **Security:** compliance-regels definiëren
-   **DevOps/Automation:** de gewenste toestand afdwingen
-   **Change & Configuration Management:** governance
-   **Audit/Risk:** validatie en toezicht

## 5\. Welke tools helpen?

De drift-capability is meestal verspreid over meerdere oplossingen:

-   Tanium voor inzicht in de configuratie van endpoints en servers
-   ServiceNow ITOM Discovery voor de toestand van de infrastructuur
-   Azure Policy, AWS Config, GCP Config Sync
-   Ansible, Puppet, Chef voor handhaving
-   GitOps voor declaratieve configuratie
-   SIEM/SOAR voor routering en geautomatiseerde respons

## 6\. De opbrengst

-   **Betere naleving van regelgeving**
-   **Hogere operationele stabiliteit**
-   **Sterkere securitypositie**
-   **Minder verspilling in de cloud**
-   **Engineers slapen beter** (minder chaos)

## Conclusie

Driftmanagement is niet glamoureus, maar het is een van de eenvoudigste en meest impactvolle werkwijzen die een organisatie kan invoeren. In een wereld vol automatisering, complexiteit en voortdurende verandering is de omgeving altijd aan het driften. De vraag is: **merk je het op voordat er iets kapotgaat?**

\`\`\`

body {<br /> font-family: Arial, sans-serif;<br /> max-width: 900px;<br /> margin: 0 auto;<br /> line-height: 1.6;<br /> }<br /> h1, h2, h3 {<br /> color: #333;<br /> }<br /> h1 {<br /> margin-top: 40px;<br /> }<br /> p {<br /> margin: 12px 0;<br /> }<br /> ul {<br /> margin: 10px 0 20px 20px;<br /> }<br />
