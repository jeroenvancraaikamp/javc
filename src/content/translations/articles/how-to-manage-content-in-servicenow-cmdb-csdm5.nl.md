---
title: "Hoe beheer je de inhoud van de ServiceNow CMDB/CSDM?"
excerpt: "Het vullen en onderhouden van een accurate Configuration Management Database (CMDB), in lijn met het Common Service Data Model (CSDM) van ServiceNow, is voor de meeste organisaties een flinke uitdaging. Deze gids beschrijft hoe je dat goed aanpakt, welke soorten items wel (en niet)"
source: "15fb901a5abce0fa"
---

Het vullen en onderhouden van een accurate Configuration Management Database (CMDB), in lijn met het Common Service Data Model (CSDM) van ServiceNow, is voor de meeste organisaties een flinke uitdaging. Deze gids beschrijft hoe je dat goed aanpakt, welke soorten items wel (en niet) in de CMDB geregistreerd moeten worden, en wat de meest effectieve methoden zijn om tot data van hoge kwaliteit te komen, zowel met de technologie van vandaag als ter voorbereiding op de behoeften van morgen.  

### Kernfilosofie

  
Organisaties moeten hun portfoliobaselines (bijvoorbeeld services, offerings, applicaties) handmatig definiëren en onderhouden. De instances van die baselines, oftewel de inhoud van de CMDB, moeten automatisch worden gediscoverd of gefedereerd vanuit geautoriseerde databronnen. **Niemand mag de attributen of relaties van Configuration Items (CI's) in de CMDB handmatig wijzigen, zodat de CMDB de technische werkelijkheid weerspiegelt.** Beperkte uitzonderingen zijn toegestaan waar de kwaliteit van de geautomatiseerde data daardoor niet wordt aangetast.

Een organisatie zou alleen haar eigen items/relaties moeten registreren, plus de items die zij (als service) afneemt van een interne of externe provider. Serviceproviders houden (in hun eigen CMDB) bij wat ze als service leveren. MSP's die productinstances van de organisatie beheren, moeten die discoveren/federeren naar de CMDB van de organisatie, zodat de organisatie altijd vanuit haar eigen CMDB kan rapporteren over haar eigen assets.  

### **Inleiding**

  
ServiceNow biedt meerdere manieren om Configuration Items (instances) in de ServiceNow CMDB te vullen/bij te werken.  

  
-   **ServiceNow biedt vijf methoden (die parallel gebruikt kunnen worden) om de Configuration Items (CI's) te identificeren die nodig zijn voor de ServiceNow CMDB.**  
    
      
    -   Via een IP-sweep worden alle IP-devices in bekende/zichtbare IP-ranges gediscoverd (van alle devices worden IP-/MAC-adres, FQDN en beschikbare managementprotocollen zoals SSH, WMI, RDP en SNMP bekend)
      
    -   De Agent Client Collector (ACC), geïnstalleerd op een Linux-/Windows-/macOS-device, kan ServiceNow informeren over het device waarop hij is geïnstalleerd.
      
    -   Via federatie kan ServiceNow (uit diverse databronnen) de Configuration Items ophalen die die bronnen geautoriseerd zijn te leveren.
      
    -   Wanneer ServiceNow via een integratie een event over een CI ontvangt, kan die CI (indien nodig) in de CMDB worden geregistreerd.
      
    -   Geautoriseerde gebruikers kunnen (relaties/attributen van) CI's handmatig in de CMDB in ServiceNow registreren, via het importeren van bestanden of rechtstreeks via de ServiceNow-GUI.
      
    
      
    
  
-   **ServiceNow biedt vijf methoden (die parallel gebruikt kunnen worden) om te discoveren en federeren wat er op de gedetecteerde IP-devices geïnstalleerd is/draait.**  
    
      
    -   Credential-based discovery kan worden gebruikt als de rechten/credentials daarvoor zijn geconfigureerd (ServiceNow logt in op het IP-device)
      
    -   Credential-less discovery kan worden gebruikt door de beschikbare managementprotocollen van het gedetecteerde IP-device te bevragen (ServiceNow haalt de toegankelijke informatie op)
      
    -   De Agent Client Collector (ACC) kan ServiceNow informeren over het meeste van wat er draait op/aanwezig is op het device waarop ACC is geïnstalleerd, en ook over wie het device wanneer gebruikt/heeft gebruikt.
      
    -   Via federatie kan ServiceNow (uit diverse databronnen) informatie ophalen over wat er in/op de bekende Configuration Items draait.
      
    -   Geautoriseerde gebruikers kunnen handmatig registreren wat er in/op CI's in de CMDB in ServiceNow geïnstalleerd is, via het importeren van bestanden of rechtstreeks via de ServiceNow-GUI.
      
    
      
    
  
-   **ServiceNow heeft drie manieren om afhankelijkheden tussen (items in) de in de CMDB geregistreerde stacks te bepalen**  
    
      
    -   Via credential-based discovery kan ServiceNow patronen en afhankelijkheden onderzoeken (bijvoorbeeld: deze applicatiecomponent gebruikt deze DB/API van die applicatie)
      
    -   Via federatie kan ServiceNow (uit diverse databronnen) de afhankelijkheden ophalen (bijvoorbeeld: volgens APM heeft deze applicatie een interface met die applicatie)
      
    -   Geautoriseerde gebruikers kunnen de bekende afhankelijkheden van de CI's handmatig registreren
      
    
      
    
  
-   **ServiceNow-automatisering kan (als de organisatie de juiste licenties heeft aangeschaft)**  
    
      
    -   Fijnmazig inzicht geven in wat er wel (of niet) draait/geïnstalleerd/geconfigureerd is op IP-devices waarop de Agent Client Collector is geïnstalleerd
      
    -   De servicedesk remote toegang bieden tot IP-devices waarop de Agent Client Collector is geïnstalleerd
      
    -   Software installeren/verwijderen of software-instellingen/-policies aanpassen op IP-devices waarop de Agent Client Collector is geïnstalleerd.
      
    -   Geconfigureerde events/alarmen rechtstreeks ontvangen van IP-devices waarop de Agent Client Collector is geïnstalleerd.
      
    -   Cloudservices/-resources installeren/verwijderen met ServiceNow Integration Hub (bijvoorbeeld voor cloudoptimalisatie)
      
    -   IAM-services/-resources installeren/verwijderen met ServiceNow Integration Hub (rechtstreeks in AD/Entra of via SailPoint/Saviynt)
      
    -   AI-agents en scripts aansturen, rechtstreeks of via ServiceNow MID Servers
      
    
      
    
  

  
Ter info: ServiceNow kent ook (attributen/relaties van) portfolio-items (baselines):  

  
-   Business applications en business capabilities worden onderhouden met de APM-module (onderdeel van SPM) in ServiceNow of in een andere geautoriseerde databron (LeanIX, Apptio enz.).
  
-   Services, service offerings en hun commitments/entitlements worden onderhouden met de DPM-module in ServiceNow.
  
-   SDLC-componenten worden onderhouden in de DevOps-module, volgens Agile/SAFe-werkwijzen
  
-   Bestelbare catalogusitems worden onderhouden met Service Catalog Management (onderdeel van ITSM)
  
-   Asset-/CI-modellen en licenties worden in ServiceNow onderhouden met Software/Hardware Asset Management, of worden aangeleverd als onderdeel van de gediscoverde/gefedereerde CI-informatie.
  
-   Integrated Risk Management, Business Continuity Management en Security Operations hebben/beheren elk hun eigen baselineartefacten, die vaak gekoppeld zijn aan instances in de CMDB.
  
-   Fundamentele masterdata (bijvoorbeeld bedrijven, BU's, afdelingen, landen, regio's/provincies, talen, valuta, locaties, groepen, gebruikers, rollen enz.) kan in ServiceNow worden onderhouden,  
    maar wordt door ServiceNow vaak opgehaald uit andere geautoriseerde databronnen (bijvoorbeeld Workday, HCM, SuccessFactors, AD, Saviynt, SailPoint, ISO 3166, IANA enz.)
  

  
*De rest van dit artikel richt zich op het registreren en onderhouden van CI-instances in de CMDB via ITOM/ITSM.*  

### **Aandachtspunten**:

  

  
-   De inhoud van de CMDB wordt steeds fijnmaziger en moet vrijwel realtime actueel worden gehouden.
  
-   Public-cloudplatforms, network/element managers, SD-WAN-, AI- en CDaaS-tools kunnen tegenwoordig CMDB-informatie aan ServiceNow leveren, vaak via out-of-the-box integraties/connectoren.
  
-   Sommige platforms hebben hun eigen databronnen (bijvoorbeeld Copado, SAP CALM, SAP ChaRM, GitLab, SolarWinds enz.) die CMDB-informatie aan ServiceNow kunnen leveren, vaak via out-of-the-box integraties/connectoren.
  
-   Steeds meer organisaties kiezen voor een zero-touch CMDB, waarin geen handmatig onderhoud van CMDB-inhoud meer nodig is, met uitzondering van de applicatie-/serviceportfoliobaselines.
  
-   Sommige organisaties staan handmatig onderhoud toe van CI's/assets van bepaalde typen/klassen (waarvoor geen geschikte bron bestaat) in de CMDB. Bijvoorbeeld auto's, fietsen, faciliteiten, sleutels, racks, kooien.
  
-   ServiceNow kan niet discoveren wat het niet kan 'zien' of wat geen contact opneemt met ServiceNow (bijvoorbeeld via ACC of API).
  
-   ServiceNow MID Servers kunnen het zicht van ServiceNow uitbreiden naar wat er is aangesloten op on-premises IP-netwerken of IP-netwerken van derden.
  
-   In zeer complexe/gesegmenteerde/beveiligde IP-netwerken is doorgaans een groot aantal MID Servers of Agent Client Collectors nodig.
  
-   End-user devices die eigendom zijn van de organisatie worden steeds vaker buiten kantoor gebruikt (bijvoorbeeld door thuiswerkers) en zijn niet altijd verbonden met het netwerk van de organisatie, bijvoorbeeld via een VPN.
  
-   'Bring Your Own' device/license heeft impact op de traditionele manier van werken/registreren.
  
-   Sommige organisaties (bijvoorbeeld Defensie) gebruiken een lokaal geïnstalleerde ServiceNow-instance, met eigen specifieke uitdagingen en beperkingen.
  
-   Wil je daarnaast ook Risk/Compliance Management, Application Portfolio Management, Vendor Management of Asset Management mogelijk maken? Dan heb je in de CMDB aanvullende data nodig, naast wat nodig is voor IT Service Management.
  

  

### **Uitgangspunten:**

  

  
-   Houd je aan de definities/relaties in/van het ServiceNow Common Service Data Model. Gebruik zoveel mogelijk out-of-the-box (OOTB) integraties met ServiceNow.  
    Pas alleen maatwerk toe wanneer/waar dat te rechtvaardigen is en de impact op lange termijn goed is overwogen.
  
-   Voer alleen handmatig onderhoud van CMDB-inhoud uit als automatisering geen haalbare optie is, en als je kunt waarborgen dat goed onderhoud en periodieke datareviews (certificering) van die CMDB-data naar behoren plaatsvinden.
  
-   Heb je een of meer items/assets in de CMDB die handmatig worden onderhouden? Dan zullen externe auditors aandringen op documentatie/implementatie/training/onderhoud/governance van processen en op activiteiten voor continue verbetering van de datakwaliteit voor deze items.
  
-   Kiest een organisatie voor een zero-touch CMDB met (relaties van) CI-instances, dan moet zij de benodigde technische CMDB-integraties onderhouden en de portfoliobaselines handmatig bijhouden met Digital Portfolio Management, uitgevoerd door portfolio-/service-owners.
  

  
**Wanneer installeer/gebruik je een Agent Client Collector (ACC) op een Windows-/Linux-/macOS-computer?**  

  
-   Wanneer de organisatie IP-devices niet eenvoudig zichtbaar kan maken voor ServiceNow (bijvoorbeeld omdat de IP-devices achter meerdere firewalls staan die niet geopend mogen worden)
  
-   Wanneer de organisatie inzicht wil in het daadwerkelijke gebruik van software/resources op de IP-devices (bijvoorbeeld voor Software Asset Management)
  
-   Wanneer organisaties IP-devices zoals pc's/VDI's willen monitoren/beheren met de Agent Client Collector (voor helpdesk/SecOps)
  
-   Wanneer de organisatie geen tools zoals Jamf/Intune/SCCM heeft/gebruikt die pc-informatie naar ServiceNow kunnen federeren
  
-   Wanneer de organisatie informatie nodig heeft die ACC levert en die niet beschikbaar is via Jamf/Intune/SCCM.
  

  
*Ter info: voor de ServiceNow-licenties maakt het niet uit hoe een CI in de CMDB terechtkomt; het gebruik van ACC is inbegrepen in de prijs van de ITOM-licentie.*  

### **Wanneer gebruik je een ServiceNow MID Server?**

  

  
-   Wanneer de organisatie ServiceNow Discovery wil uitvoeren op IP-devices achter een firewall waarop geen Agent Client Collector is geïnstalleerd.
  
-   Wanneer de organisatie (wat er in/op staat op) IP-devices achter een firewall wil beheren/benaderen (met of zonder Agent Client Collector)
  
-   Wanneer de organisatie wil dat ServiceNow API's benadert die niet rechtstreeks vanaf het publieke internet toegankelijk zijn (bijvoorbeeld de OCI API)
  
-   Wanneer de organisatie een deel van het IP-netwerk afschermt, waardoor ServiceNow of de andere MID Servers niet kunnen zien wat er in dat netwerk is aangesloten.
  

  
*Ter info 1: hoewel de MID Server-software geen betaalde ServiceNow-licentie vereist, zijn er kosten verbonden aan OS-licenties, IAM en onderhoud van de VM's waarop de software is geïnstalleerd*

*Ter info 2: een MID Server heeft beperkingen qua capaciteit/performance. Het wordt bovendien afgeraden productie- en niet-productieverkeer op dezelfde MID Server te combineren. Je hebt dus waarschijnlijk meerdere MID Servers nodig*  

### **Gebruik van credentials voor discovery en automatisering**

  
Als credential-based discovery wordt gekozen om CMDB-inhoud te vullen/bij te werken en/of software/instellingen te installeren/verwijderen, heeft ServiceNow daarvoor credentials nodig:  

  
-   ServiceNow kan worden geconfigureerd om een (beperkt aantal) generieke combinatie(s) van account en wachtwoord te gebruiken die lokaal in ServiceNow zijn opgeslagen (eenvoudig in te richten/te onderhouden, maar vaak niet de voorkeur van SecOps)
  
-   ServiceNow kan worden geconfigureerd om credentials te gebruiken die in CyberArk worden opgeslagen/onderhouden en niet in ServiceNow worden opgeslagen (vereist een integratie met CyberArk, maar heeft vaak de voorkeur van SecOps)
  

  
*Let op: er wordt van uitgegaan dat de accountcredentials vooraf zijn ingericht (bijvoorbeeld als onderdeel van het image) op de IP-devices die met credential-based discovery gediscoverd moeten worden.  
Het account voor credential-based discovery heeft read-only toegang nodig tot de inventarissen op de devices.*  

### **Bring Your Own (BYO) devices**

  

  
-   BYO-devices zijn eigendom van een andere partij dan de organisatie zelf. Horen ze wel in je CMDB thuis?
  
-   Software op BYO-devices kan eigendom zijn van/betaald worden door de andere partij in plaats van door de organisatie.
  
-   Wil je het BYO-device in je CMDB registreren (bijvoorbeeld voor SecOps of support), tag het device dan als BYO.
  
-   Pas BYO-regels toe op (wat er in/op staat op) devices met een BYO-tag.
  

  

### **SaaS-/PaaS-oplossingen**

  

  
-   Configuration Items worden vaak (als eenheid of bundel) 'as a service' geleverd door een interne/externe managed service provider. De baselines (d.w.z. modellen) worden niet in de CMDB geregistreerd.  
    De instances van de geleverde services kunnen worden geregistreerd als 'service instances' en kunnen worden gerelateerd aan de CI's waarvan ze afhankelijk zijn.
  
-   Bij de meeste SaaS-services van derden (die als managed black box worden aangeboden) zijn de CI's onbekend en worden ze niet in de CMDB geregistreerd.  
    De SaaS-services/-offerings (baselines) worden gedefinieerd in/via Digital Portfolio Management. Als er meerdere instances van de SaaS worden geleverd, kunnen deze als 'service instances' worden geregistreerd.
  
-   De meeste populaire SaaS-providers (bijvoorbeeld Microsoft, SAP, Salesforce, Google, Asana enz.) bieden API's waarmee organisaties kunnen zien welke gebruikers/rollen welke licenties/services gebruiken.
  
-   Sommige SaaS-providers bieden API's waarmee licenties, services of rollen kunnen worden aangevraagd of ingetrokken.
  

  

### **Tagging en mapping:**

  

  
-   Moderne Configuration Items kunnen worden getagd. Voor verschillende doeleinden worden verschillende keys gebruikt. De tags worden als onderdeel van de CI aan ServiceNow aangeleverd  
    
      
    -   Sommige organisaties gebruiken de CI-omgeving als tag (bijvoorbeeld Development, Test, Production).
      
    -   CI's die (rechtstreeks) gerelateerd moeten worden aan de offerings waaronder ze vallen, moeten worden getagd met de unieke ID van de offering.  
        De tag wordt dan gebruikt om een relatie/mapping 'Offering depends on Cloud Service Account' aan te maken (d.w.z. tag-based mapping)
      
    
      
    
  
-   Groeperen van niet-getagde CI's die aan offerings gekoppeld kunnen worden.  
    
      
    -   Er kunnen groepen CI's worden gedefinieerd, waarvan de leden handmatig aan deze groepen kunnen worden gekoppeld (bijvoorbeeld de O-, T-, A- en P-omgevingen van dezelfde applicatie).
      
    -   CI's van een vergelijkbare klasse/type kunnen op basis van een query automatisch aan de groep worden gekoppeld (bijvoorbeeld 'Alle Windows 10-pc's van gebruikers in Amsterdam')
      
    
      
    
  

  

### **Wanneer discover/federeer je de CMDB-data?**

  
In een ideale wereld wordt de inhoud van de CMDB vrijwel realtime bijgewerkt. Helaas is de technologie nog niet zover. Op dit moment wordt aanbevolen om:  

  
-   Dagelijks de wijzigingen in (attributen/relaties van) alle gefedereerde CI's op te halen (zogeheten 'delta loads'), bij voorkeur buiten kantoortijd.
  
-   Wekelijks alle (attributen/relaties van) de actieve gefedereerde CI's op te halen (zogeheten 'full loads'), waarmee het doel (de CMDB) volledig opnieuw wordt gesynchroniseerd.
  
-   Elke discovery-job dagelijks uit te voeren. Bijvoorbeeld: het volledige IP-netwerk eenmaal per dag sweepen.
  
-   De verschillende jobs over de dag te spreiden om de belasting op ServiceNow-instances/MID Servers te minimaliseren.
  
-   Indien nodig realtime ad-hoc discoveries uit te voeren (voor een configuration item waarop de Agent Client Collector is geïnstalleerd)
  
-   Indien mogelijk de inhoud van de CMDB realtime bij te werken, bijvoorbeeld wanneer de bron zijn data naar de CMDB pusht.
  

  

### **Hoe beheer je de CMDB Health?**

  

  
-   Volg/beoordeel kwantitatieve trends met Performance Analytics of BI-tooling. Bijvoorbeeld:  
    
      
    -   Totaal aantal actieve items per klasse, per bron aan het einde van de vorige periode
      
    -   Aantal items per klasse, per bron dat in de vorige periode is aangemaakt
      
    -   Aantal items per klasse, per bron dat in de vorige periode is bijgewerkt
      
    -   Aantal items per klasse, per bron dat in de vorige periode is uitgefaseerd
      
    
      
    
  
-   Definieer wat goed is en monitor dat (en rapporteer erover), bijvoorbeeld:  
    
      
    -   Percentage computers met daarop geïnstalleerde software (zou 100% moeten zijn, met uitzondering van BYO-/onbeheerde devices)
      
    -   Percentage actieve CI's dat in de afgelopen 90 dagen is bijgewerkt/aangeleverd (zou 100% moeten zijn)
      
    -   Percentage VM's dat een server virtualiseert (zou meer dan 90% moeten zijn)
      
    -   Percentage CI's (bijvoorbeeld pc's, telefoons) dat aan een actieve persoon toegewezen zou moeten zijn en ook daadwerkelijk aan een actieve persoon is toegewezen (zou meer dan 90% moeten zijn)
      
    -   Percentage fysieke CI's op een bekende locatie (zou 100% moeten zijn)
      
    -   Enz.
      
    
      
    
  
-   Rapporteer maandelijks over (de trend van) de percentages voor dekking, volledigheid, juistheid, veroudering en (optioneel) compliance van CI's/relaties
  
-   Houd governance op de technische integraties (periodieke review van data en plannen met de owners van elke geïntegreerde databron)
  
-   Laat handmatig onderhouden CI's/relaties certificeren door hun CI-/service-owner.
  
-   Voer waar nodig een project voor verbetering van de datakwaliteit uit.
  
-   Houd bij welke items zijn aangemaakt door event management-tools (waarom zijn ze niet via de normale route binnengekomen?)
  

  

### **Aanbevolen scenario's voor een typische grote organisatie:**

  
Grote organisaties wordt aangeraden het volgende toe te passen:  

  
-   **PERSONAL COMPUTING:**
  

  

  
-     
    
      
    -   Federeer persoonlijke devices (inclusief wat erin/erop geïnstalleerd is) vanuit Jamf en/of Intune (als die worden gebruikt)
      
    -   Installeer zo nodig Agent Client Collectors op pc's, bijvoorbeeld om data uit Intune/Jamf aan te vullen en remote pc-beheer mogelijk te maken.
      
    -   Federeer device-/supportinformatie van persoonlijke devices vanuit de wereldwijde leveranciers van deze devices (bijvoorbeeld Dell, Lenovo enz.), via de OOTB API's van de leveranciers
      
    -   Bepaal een land-/technologiespecifiek beleid voor het beheer van (wat er in/op staat op) BYO-devices (verschillende landen è verschillende wetgeving en ondernemingsraden)
      
    
      
    
  

  

  
-   **OFFICE COMPUTING**
  

  

  
-     
    
      
    -   Federeer informatie over kantoorprinters (printservices) vanuit de leveranciers van deze printers (services).
      
    -   Federeer facilitaire assets vanuit facilitaire asset management-tools (CCTV, liften, OT-devices, led-tv's enz.)
      
    -   Discover relevante OT-devices (bijvoorbeeld PLC's) die via IP-controllers worden beheerd, met SNMP of custom patterns.
      
    -   Federeer data over toegangsbeheer van gebouwen vanuit BAM-tools (bijvoorbeeld biometrische lezers, poorten/deuren)
      
    
      
    
  

  

  
-   **CLOUDARTEFACTEN:**
  

  

  
-     
    
      
    -   Federeer cloudartefacten vanuit AWS, Azure en GCP naar de CMDB met out-of-the-box Service Graph Connectors
      
    -   Federeer cloudartefacten vanuit OCI met out-of-the-box plug-ins. Discover de Linux-/Windows-servers met credential-based discovery of Agent Client Collectors.
      
    -   Indien nodig: discover met ServiceNow Discovery wat er in cloudcontainers draait en wat de onderlinge afhankelijkheden zijn.
      
    
      
    
  

  

  
-   **ON-PREMISES APPARATUUR (geen personal computing)**
  

  

  
-     
    
      
    -   Zet (gescheiden productie- en niet-productie-) MID Servers in het IP-netwerk van de organisatie neer
      
    -   Als Security dat toestaat: discover met credential-less discovery welke devices zijn aangesloten op relevante IP-ranges van de organisatie.
      
    -   Als Security geen IP-sweeps toestaat: laat Agent Client Collectors installeren op Windows-/Linux-servers en/of federeer data vanuit geautoriseerde bronnen (bijvoorbeeld SolarWinds, PRTG, SCCM)
      
    
      
    
  

  

  
-   **NETWORK COMPUTING**
  

  

  
-     
    
      
    -   Als Security discovery toestaat: discover met credential-less discovery welke routers/switches zijn aangesloten op relevante IP-ranges van de organisatie.
      
    -   Als Security geen discovery toestaat: federeer data over netwerkdevices vanuit een gezaghebbende databron (bijvoorbeeld network manager, element manager)
      
    -   Federeer netwerkconfiguratiedata zoals netwerksegmenten, firewallregels, IP-ranges, VPN's en certificaten vanuit gezaghebbende databronnen.
      
    
      
    
  

  

  
-   **SAAS-/PAAS-OPLOSSINGEN**
  

  

  
-     
    
      
    -   SaaS-/PaaS-services (baselines) die bij een derde partij zijn ingekocht, moeten handmatig als services/offerings worden geregistreerd. De instances/tenants (CI's) ervan kunnen handmatig of via discovery als service instances worden geregistreerd.
      
    -   Wil de organisatie de SaaS-licenties/-services/-rollen via ServiceNow inzichtelijk maken en beheren, dan wordt een integratie met de relevante SaaS-/PaaS-providers (bijvoorbeeld Microsoft, SAP, Salesforce, Google) aanbevolen.
      
    
      
    
  

  

### **Tot slot:**

  

  
-   Voor sommige organisaties kunnen variaties op de bovenstaande aanbevelingen nodig of wenselijk zijn.
  
-   Niet alle databronnen hebben dezelfde mogelijkheden; de duivel zit in de details.
  
-   ServiceNow is geweldig, maar niet perfect; sommige aanpassingen maken het simpelweg beter :-)
  
-   Haal een CMDB-/CSDM-specialist in huis om te adviseren over de beste inrichting/roadmap voor de behoeften en mogelijkheden van jouw organisatie.
