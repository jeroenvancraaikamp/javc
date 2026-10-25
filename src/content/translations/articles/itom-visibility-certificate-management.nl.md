---
title: "ITOM, Certificate Management"
excerpt: "Als onderdeel van het product ServiceNow ITOM Discovery biedt ServiceNow uitgebreide functionaliteit voor Certificate Management. Deze functionaliteit geeft organisaties inzicht, controle en automatisering over de volledige levenscyclus van certificaten, terwijl de CMDB accuraat en actueel blijft."
source: "398edcdb6d5340b0"
---

Als onderdeel van het product **ServiceNow ITOM Discovery** biedt ServiceNow uitgebreide functionaliteit voor **Certificate Management**. Deze functionaliteit geeft organisaties inzicht, controle en automatisering over de volledige levenscyclus van certificaten, terwijl de CMDB accuraat en actueel blijft.

### Kernfunctionaliteit

ServiceNow Certificate Management ondersteunt de volgende belangrijke functies:

-   **Discovery en federatie van certificaten**, waarbij certificaten als Configuration Items (CI's) in de CMDB worden geregistreerd, inclusief verwijzingen naar de plekken waar ze zijn uitgerold
-   **Monitoring van verloopdatums**, met detectie van certificaten die binnenkort verlopen en automatische toewijzing en opvolging van vernieuwingstaken, inclusief e-mailnotificaties
-   **Aanvraagbeheer via de catalogus**, waarmee gebruikers certificaten kunnen aanvragen, goedkeuren, vernieuwen of intrekken via gestandaardiseerde workflows
-   **Geautomatiseerde vernieuwing van certificaten**, met workflowgestuurde automatisering waar dit wordt ondersteund
-   **Genereren van events** (als ITOM Health in de licentie zit), waarbij events worden aangemaakt zodra problemen of storingen rond certificaten worden gedetecteerd

Via ITOM Visibility worden certificaten automatisch in de CMDB vastgelegd en continu bijgewerkt, wat een *zero-touch*-aanpak voor databeheer ondersteunt.

### Methoden voor het detecteren van certificaten

Certificaten kunnen met een of meer van de volgende methoden worden ontdekt:

#### 1\. Scannen van TCP-poorten

Certificaten worden gedetecteerd door de TCP-poorten te scannen waarop ze worden aangeboden. Deze aanpak vereist:

-   Vindbare TCP-poorten
-   Ingerichte MID Servers
-   Een daarop afgestemde firewallconfiguratie

Poortdiscovery wordt doorgaans uitgevoerd nadat de IP-gebaseerde apparaten in het netwerk zijn ontdekt.

#### 2\. Discovery op basis van URL's

Certificaten kunnen worden gedetecteerd door bekende URL's te bevragen die ze gebruiken. Deze methode is vooral handig voor:

-   SaaS-applicaties die niet via ITOM Discovery te ontdekken zijn
-   Externe websites of systemen van partners waar je organisatie van afhankelijk is

#### 3\. Federatie vanuit Certificate Authorities

Certificaten kunnen worden gefedereerd vanuit een of meer Certificate Authorities (zoals DigiCert, GoDaddy, Microsoft, Entrust of Let’s Encrypt). Deze methode laat niet zien waar een certificaat is uitgerold, maar geeft wel waardevol inzicht in:

-   Welke certificaten er zijn
-   Wie ze heeft uitgegeven
-   Wanneer ze verlopen

### Weergave in de CMDB en dashboards

Gedetecteerde certificaten worden als CI's in de CMDB opgeslagen, met attributen zoals de provider en de verloopdatum.

ServiceNow ITOM Visibility biedt een speciaal **Certificate Management Dashboard**, dat inzicht geeft in:

-   Het totale aantal certificaten in gebruik
-   Certificaten die binnen een instelbare periode verlopen
-   De status en het aantal handmatige vernieuwingstaken
-   Geautomatiseerde workflows die zijn gestart voor de vernieuwing van certificaten

### Opmerkingen en operationele aandachtspunten

-   Als IT-artefacten doorgaans worden uitgerold via **CI/CD-pipelines, DevOps-tooling of API's,** is het aan te raden om aanvragen voor certificaatvernieuwing via diezelfde kanalen te laten lopen
-   Tegenwoordig is de uitgifte van vernieuwde certificaten meestal geautomatiseerd en valt deze doorgaans onder een vooraf goedgekeurde **Standard Change** in plaats van een **Normal Change.**
