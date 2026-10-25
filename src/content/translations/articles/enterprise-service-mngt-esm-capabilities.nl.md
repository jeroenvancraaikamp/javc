---
title: "Enterprise Service Mngt (ESM)-capabilities?"
excerpt: "Agentic AI zelf werkt niet met een hard-coded processtroom; in plaats daarvan redeneert het en bepaalt het zijn volgende stappen/acties op basis van realtime triggers, reacties, data en events. Dat maakt Agentic AI voor de enterprise minder voorspelbaar, maar wel flexibeler en capabeler"
source: "dba139cfa078e399"
---

Medewerkers van een enterprise maken doorgaans gebruik van enterprise-brede capabilities die mogelijk worden gemaakt door fulfillers en AI-agents. De fulfillers en AI-agents zijn platformonafhankelijk, gebruiken data uit Systems of Record (SoR) en hebben interactie met Systems of Engagement (SoE).

  
Agentic AI zelf werkt niet met een hard-coded processtroom; in plaats daarvan redeneert het en bepaalt het zijn volgende stappen/acties op basis van realtime triggers, reacties, data en events. Dat maakt Agentic AI voor de enterprise minder voorspelbaar, maar wel flexibeler en capabeler dan zijn voorgangers (machine learning en hard-coded workflows). Dat gezegd hebbende, zullen AI-agents ook traditionele technische capabilities gebruiken, zoals API's en microservices, om het werk gedaan te krijgen.

Medewerkers kunnen idealiter gebruikmaken van één aanspreekpunt: een 24/7 beschikbare, multimodale, meertalige chatbot met een menselijke back-up. De chatbot (of zijn menselijke back-up) gaat het gesprek aan met de medewerker en kan tijdens of na die dialoog met meerdere AI-agents communiceren, elk met een eigen doel en eigen vaardigheden.

De AI-agents en fulfillers werken samen met andere AI-agents en maken georkestreerde Enterprise Service Management (ESM)-practices mogelijk, zoals:  
  

**Fundament, inventaris en Identity & Access:**

-   **Enterprise-stamgegevens** aanvragen en bijwerken (locaties, bedrijven, organisaties, kostenplaatsen, enz.)
-   **Registratie, lifecycle, capabilities en eigenaarschap van een digitaal product** aanvragen en beheren (Digital Portfolio Mngt)
-   **Catalogus van bestelbare/afneembare producten en services** aanvragen en onderhouden (Catalog Mngt)
-   Een **verbetering** van een bestaand digitaal product aanvragen en opleveren (ideation & planning)
-   **Logische toegang tot een digitaal product** aanvragen en verlenen (Identity and Access Mngt)
-   **Informatie/instructies** reviewen en onderhouden (Knowledge Mngt)
-   **Wetgeving, policies, controls en risico's** reviewen en onderhouden
-   **Inventaris van digitale producten** ontdekken en monitoren (CMDB, IT/OT Operations Mngt)
-   **Licentie-/assetgebruik** vaststellen en beheren (IT/OT Asset Mngt)

**Technische/IT-ondersteuning:**

-   Een **algemene vraag/aanvraag** stellen en beantwoorden (Universal Request Mngt)
-   Een **reset van een wachtwoord of geblokkeerd gebruikersaccount** aanvragen en orkestreren
-   **Onbeschikbaarheid** registreren en communiceren (gepland onderhoud & major incidents)
-   Een **verstoring/degradatie van een service** melden en oplossen (Incident Mngt.)
-   Een **inbreuk op de privacywetgeving** melden en afhandelen (AVG)
-   Een **IT-securityprobleem** melden en afhandelen (IT Security Mngt)
-   Een **wijziging aan een digitaal product** aanvragen en verwerken (Change Mngt)
-   Een **digitaal product** aanvragen en leveren (Product or Service Request Mngt)
-   Een **event** observeren en beheren (storingen, transacties, performance, logs)

**Enterprise-ondersteuning:**

-   Een **bezoek op locatie** door een supporttechnicus aanvragen en beheren (Field Service Mngt)
-   Een **faciliteit** boeken en reserveren (ruimte/voertuig/asset)
-   **Toegang tot de locatie voor bezoekers** aanvragen en autoriseren
-   Een **HR-case/-aanvraag** indienen en afhandelen (HR Operations)
-   Een **facilitaire case/aanvraag** indienen en afhandelen (Facility Operations)
-   Een **juridische case/aanvraag** indienen en afhandelen (Legal Operations)
-   Een **financiële case/aanvraag** indienen en afhandelen (Financial Operations)
-   Een **klantcase/-aanvraag** indienen en afhandelen (Customer Service Mngt)
-   **Instroom, doorstroom en uitstroom** aanvragen en beheren (JML)
-   **Bedrijfscontinuïteitsplannen & DR** reviewen en onderhouden (Integrated Risk Mngt)
-   **Policy- en complianceproblemen** detecteren en oplossen (audit & opvolging)

Het bovenstaande omvat ook de registratie van entitlements, verplichtingen, abonnementen, transacties, gebruik, verkeer, contracten, verbruik, inkooporders, leveringen, facturen, enz.  
  

**WAAROM IS DIT BELANGRIJK?**

Elk van de bovenstaande punten vertegenwoordigt een afzonderlijke best practice in enterprise management.  
  

Niet alle bovenstaande practices zullen door alle enterprises als enterprise-brede practice worden gezien. Sommige enterprises sluiten alle practices onder Enterprise-ondersteuning uit en beperken de enterprise-brede scope tot alleen IT. Een andere enterprise dwingt enterprise-brede practices af, maar laat organisaties binnen de enterprise per afzonderlijke capability hun eigen platform kiezen. In de drie decennia dat ik in de ICT werk, heb ik geen twee enterprises gezien die dezelfde keuzes maakten. Dat gezegd hebbende: als je binnenkort marktstandaard off-the-shelf AI-agents kunt aanschaffen die kunnen samenwerken met andere marktstandaard off-the-shelf AI-agents, zal standaardisatie van commodity-werk binnen de hele enterprise waarschijnlijk volgen.  
  

In een gekozen ESM-scenario is het aan te raden om practice-specifieke agents te creëren en die toe te wijzen aan één eindverantwoordelijke persoon, doorgaans een van de ESM-practice leads. Zoals je misschien hebt gemerkt, zijn de fijnmazige ESM-practices die hier worden beschreven zo gestructureerd dat ze toepasbaar zijn op elke grote enterprise. Elke enterprise-capability kan worden toegewezen aan een andere eindverantwoordelijke eigenaar/lead, die in een van de enterprise-domeinen kan zitten. Het creëren en onderhouden van AI-agents moet worden uitgevoerd door het verantwoordelijke DevSecOps-team van het platformteam dat de AI-agents host. Omdat elk platform voor verschillende practices kan worden gebruikt (en omgekeerd), moeten DevOps-teams mogelijk afstemmen met meerdere practice leads (ook wel chapter leads genoemd), en moeten practice leads mogelijk afstemmen met verschillende DevSecOps-teams.  
  

Het aanbevolen model gaat ervan uit dat alle partijen binnen de enterprise zich houden aan de enterprise-brede practices die voor alle medewerkers gelden. Dat wil zeggen: iemand op locatie/dochteronderneming/opco x houdt zich aan dezelfde enterprise-practices en gebruikt dezelfde enterprise-tools als iemand in een ander land of bij een andere dochteronderneming/opco. De practice lead heeft het mandaat om dit binnen de hele enterprise af te dwingen (niet onderhandelbaar). Dat gezegd hebbende, zijn alleen de hierboven genoemde commodity-ESM-practices enterprise-breed. Bedrijfsspecifieke ERP-, CRM-, M&S- en finance-practices kunnen bij verschillende bedrijven en locaties verschillend worden geïmplementeerd.  
  

Als je niet gelooft in matrix-governance, of als je wilt dat elk van je DevSecOps-teams met slechts één product owner afstemt, of als je vindt dat de platform owner verantwoordelijk moet zijn voor alles wat door zijn platform mogelijk wordt gemaakt, dan moet je kiezen voor platform-/domeinspecifieke governance. In zo'n scenario is het aan te raden om domeinspecifieke platforms te gebruiken en de tribe lead van het domein verantwoordelijk te maken voor alle zaken binnen zijn domein of tribe, inclusief naleving van toepasselijke wettelijke en bedrijfsrichtlijnen.  
  

Bedrijven die geen behoefte hebben aan enterprise-brede standaardpractices en consistentie, moeten niet investeren in commodity-platforms of -practices voor medewerkersondersteuning; in plaats daarvan kunnen ze dat geld beter reserveren voor het aanpakken van de inefficiënties en complexiteit die horen bij lokale autonome organisaties die elk op een andere manier en met andere tools werken.

.
