---
title: "Van bedrijfsbehoefte naar technologische levering"
excerpt: "Het Common Service Data Model van ServiceNow (CSDM5) krijgt steeds meer aandacht van managers op C-level, vooral omdat een goede CMDB met juiste en volledige inhoud wordt gezien als een kritieke succesfactor voor de implementatie van DORA, SOx, SOC2 en agentic AI. Mensen in"
source: "884dc56476f17f1e"
---

Het Common Service Data Model van ServiceNow (CSDM5) krijgt steeds meer aandacht van managers op C-level, vooral omdat een goede CMDB met juiste en volledige inhoud wordt gezien als een kritieke succesfactor voor de implementatie van DORA, SOx, SOC2 en agentic AI.

Mensen in Architecture, DevOps, SecOps, Risk en Security gebruiken vaak verschillende standaarden (ISO 27.000, ISO 85.000, ITIL5, TOGAF) en de bijbehorende definities. Wij hebben het CSDM5 gecombineerd met een gelaagde ArchiMate/TOGAF-weergave van de Service Delivery Systems waaruit het typische IT-landschap van een bedrijf bestaat, en dit bruikbaar gemaakt voor Enterprise Service Management.  

### Dit zijn de definities die we gebruiken om de verschillende 'talen' op elkaar af te stemmen:

  
**Business Applications** zijn businessgerichte oplossingen die bedrijfscapabilities, processen of diensten ondersteunen. Ze bestaan doorgaans uit applicatie-, web-, integratie- en data-Resources die op een of meer middlewareplatforms zijn gedeployed. Naast intern ontwikkelde oplossingen kunnen ook andere gehoste businessgerichte oplossingen en digitale diensten worden afgenomen door medewerkers, klanten en partners, of worden geïntegreerd met andere diensten. Deze oplossingen worden ook als Business Applications geregistreerd.

**Software-as-a-Service**-oplossingen (SaaS) van derden worden als Business Applications geregistreerd, ook wanneer het bedrijf beperkt of geen zicht heeft op de onderliggende resources, infrastructuur of platformcomponenten die ze ondersteunen en de leverancier zelf zijn compliance beheert. SaaS-oplossingen worden per definitie als dienst aangeboden en voldoen aan de vastgelegde contractuele afspraken daarvan. Architecten modelleren de interfaces tussen de applicaties van het bedrijf en de SaaS-oplossingen in de Architecture Repository.

**Resources** zijn stabiele, discoverbare instanties van **SDLC Application Components** (subsystemen die worden ontworpen, gebouwd, getest en geïntegreerd). Componenten worden meestal opgeslagen in sourcecoderepositories en vaak gedeployed via CI/CD-pipelines. Tools voor DevOps-orchestratie en observability beheren en monitoren hun gedrag.

**Middleware** is software die runtimediensten levert aan applicaties en resources en doorgaans draait op fysieke of virtuele Nodes. Voorbeelden zijn webservers, applicatieservers, databaseservers, integratieplatforms, messagingplatforms en orchestratieplatforms.

Een **Service Instance** vertegenwoordigt elke deployment van een Business Application. Meestal worden aparte Service Instances aangemaakt voor de Ontwikkel-, Test-, Acceptatie- en Productieomgeving, zodat elke deployment afzonderlijk kan worden beheerd, gemonitord en gerelateerd aan de ondersteunende technologiestack.

**Workplace/Productivity Services** (pc's, mobiele telefoons, tablets enz.) worden geregistreerd als Service Offerings in plaats van als Business Applications. Software die op eindgebruikersapparaten wordt uitgerold, wordt beheerd via Assets, Software Installations en Software License-records.

**Omgevingen/straten** zijn IP-domeinen die doorgaans van elkaar zijn gescheiden en die voor een bepaald doel of een bepaalde doelgroep worden gebruikt. Zo kan (wat er draait op) Nodes die in de testomgeving zijn gedeployed niet communiceren met (wat er draait op) Nodes die in de productieomgeving zijn gedeployed. Sommige bedrijven gebruiken ook klant- of regiospecifieke straten.

**Resources, Middleware, Nodes en hun afhankelijkheden (in CSDM5: 'Service Delivery Systems') worden automatisch gediscoverd en automatisch in de CMDB geregistreerd en bijgewerkt.** Deze configuration items worden gerelateerd en gemapt aan de Service Instance(s) die ervan afhankelijk zijn, wat end-to-end inzicht geeft in de gedeployde oplossingsarchitectuur.

Elke capability die 'as a service' wordt geleverd, wordt weergegeven als een **Service Offering**. Voorbeelden zijn Application Services, Middleware Services, Infrastructure Services, Workplace Services en Corporate Services. Service Offerings kunnen omgevings-, regio- of locatiespecifiek zijn. Elke Service Offering legt de bijbehorende commitments, subscriptions, supportcontacten, eigenaarschap en serviceverwachtingen vast.

![](/wp-content/uploads/2026/06/ZERO-TOUCH-CMDB-Class-Model.png)

**Offered Services** die uitsluitend door IT worden afgenomen, worden geclassificeerd als **Technology Management Services.** Diensten die worden afgenomen door zakelijke gebruikers, klanten of externe partijen, worden geclassificeerd als **Business Services**.

**Foundational Data** is gedeelde informatie die in meerdere practices wordt gebruikt. Services, Offerings, Applications, Dynamic CI Groups en apparatuur verwijzen doorgaans naar foundational data, bijvoorbeeld om asseteigenaarschap, assetgebruikers, IT-groepen, contactpersonen, abonnees, klanten, leveranciers, procesmodellen, productmodellen enz. vast te leggen.

De duizenden **SDLC Application Components** erven hun foundational verwijzingen doorgaans van de Application/Solution waarvan ze deel uitmaken. Risicoclassificaties van Applications gelden ook voor de componenten en instanties die de Application bevat of gebruikt.  

### **ZERO-TOUCH CMDB**

  
In dit model mogen Resources, Middleware en Nodes niet door mensen in de CMDB worden aangemaakt of bijgewerkt. Ze bevatten alleen de technische werkelijkheid en de relaties, namen en attribuutwaarden die worden gediscoverd. Verwijzingen naar foundational data zijn doorgaans niet technisch te discoveren. Daarom moeten de CI's in de CMDB – in deze interpretatie van CSDM – altijd direct of indirect gerelateerd zijn aan een Application en/of Offering die referentieattributen bevat zoals 'Business Owner', 'IT Owner', 'Support Group', 'Change Group', 'CAB Group', 'Location', 'Organization' enz. De organisatie kan de traditionele structuur 'Bedrijf => Business Unit => Afdeling' hebben of de moderne agile structuur 'Tribe/ART => Cluster/Chapter ==> DevSecOps-team/Squad'.

![](/wp-content/uploads/2026/06/CSDM5-incl-Relation-Labels.jpg)
