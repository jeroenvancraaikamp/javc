---
title: "ServiceNow publiceert CSDM 5"
excerpt: "Op 8 mei 2025 heeft ServiceNow de langverwachte whitepaper over het Common Service Data Model (CSDM) 5 uitgebracht. Dit document van 63 pagina's markeert een belangrijke doorontwikkeling van het datamodel dat de basis vormt van veel ServiceNow-implementaties bij IT-organisaties wereldwijd. CSDM 5 introduceert"
source: "9bd5d70b78a9e775"
---

Op 8 mei 2025 heeft ServiceNow de langverwachte [**whitepaper over het Common Service Data Model (CSDM) 5**](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf) uitgebracht. Dit document van 63 pagina's markeert een belangrijke doorontwikkeling van het datamodel dat de basis vormt van veel ServiceNow-implementaties bij IT-organisaties wereldwijd.

**CSDM 5 introduceert een verfijnde structuur die bestaat uit zeven domeinen**, die elk een kerngebied van capabilities vertegenwoordigen:  

  
2.  Ideation & Strategy
  
4.  Design & Planning
  
6.  Manage Portfolio
  
8.  Build & Integration
  
10.  Service Delivery
  
12.  Service Consumption
  
14.  Foundation
  

  
Ten opzichte van het vorige CSDM 4, dat vier jaar geleden verscheen, brengt het vernieuwde model diverse conceptuele en structurele verbeteringen met zich mee. Hieronder een overzicht van de tien meest opvallende wijzigingen:  

  
2.  **Digital Product Portfolio** Net als in de IT4IT 3.0.1-standaard worden applicaties, services en producten in het CSDM nu allemaal behandeld als onderdelen van een beheerd Digital Product Portfolio, met de nadruk op eigenaarschap over de hele lifecycle en het leveren van waarde.
  
4.  **Nieuw domein: Ideation & Strategy** Er is een nieuw domein geïntroduceerd ter ondersteuning van strategische planning. Het breidt Demand Management uit met koppelingen naar strategische doelen, bedrijfsplannen en investeringsprioriteiten, en vormt zo een startpunt voor delivery-workflows in het domein Build & Integration.
  
6.  **Verbeterde structurering van de CMDB** De CMDB is nu onderverdeeld in Services, Service Offerings, Service Instances, Service Delivery Network Items en Dynamic CI Groups, die elk een duidelijker afgebakende rol hebben.
  
8.  **Uitgebreidere definitie van Service Instances** Naast Application Services omvatten Service Instances nu ook de typen Data, Network, Connection, Facilities en Operational Process. Deze kunnen gelaagd worden opgebouwd voor composability en traceerbaarheid.
  
10.  **Concept Service Delivery Network** Het Service Delivery Network is een nieuwe overkoepelende term voor een breed scala aan CMDB-klassen en staat voor de volledige set ondersteunende Configuration Items voor Service Instances.
  
12.  **Dynamic CI Groups** CI's kunnen nu dynamisch worden gegroepeerd op basis van querycriteria. Daardoor kunnen incidents, problems en changes op groepsniveau worden geregistreerd, wat operationele processen stroomlijnt.
  
14.  **Lifecycle Status** vervangt Operational Status Er is een geleidelijke verschuiving gaande van de traditionele install- en operationele statussen naar statussen en fasen op basis van de lifecycle. CSDM 5 besteedt veel aandacht aan deze lifecycle-definities.
  
16.  **Herziening van namen en terminologie** Diverse artefacten hebben een nieuwe naam gekregen die hun functie beter weergeeft. De namen zijn soms lang, maar zullen naar verwachting worden afgekort in lijsten en formulieren in de UI.
  
18.  **AI wordt genoemd** (uiteraard) CSDM 5 verwijst wel naar artificial intelligence, maar werkt dit nauwelijks uit. Dat laat ruimte voor interpretatie en toekomstige verfijning.
  
20.  **Uitbreidingen van Foundation** De fundamentele laag bevat nu ook Product Features, Software Bill of Materials (SBOM) en Value Streams: een knipoog naar een betere aansluiting op de IT4IT-standaard.
  

  
CSDM 5 is afgestemd op de IT4IT 3.01-standaard van The Open Group, al wordt er een iets andere woordenschat gebruikt om vergelijkbare concepten te beschrijven. Zo zijn de IT4IT Value Chains "Plan", "Build", "Deliver" en "Run" vergelijkbaar met de CSDM-domeinen. Wie op zoek is naar aanvullende richtlijnen voor de financiële modellering van IT, zal die niet vinden in CSDM 5, en overigens ook niet in IT4IT 3.0.1. Dat gezegd hebbende: de data en definities van de Technology Business Management (TBM) Taxonomy 4.0/5.0 kun je wel op het CSDM mappen.

Hoewel het moment van publicatie, vlak voor ServiceNow Knowledge 2025, op een zekere haast wijst, bevat het document waardevolle inzichten. Tegelijkertijd zijn er diverse hiaten en inconsistenties opgemerkt, wat doet vermoeden dat er in toekomstige versies kleine correcties of verduidelijkingen zullen volgen.

**Volgende stappen:**

CSDM 5 is een belangrijke stap vooruit, vooral voor organisaties die aansluiten bij IT4IT en open IT-architectuurframeworks. Wie echter zat te wachten op een Common Service Data Model voor **Enterprise Service Management (IT4ESM)**, moet nog even geduld hebben.

ServiceNow werkt al aan een CSDM 5+ Draft, met een fijnmaziger datamodel met meer artefacten en relaties. Vooruitkijkend naar CSDM 6 (verwacht in 2026) kunnen we sterkere modelleringsrichtlijnen rond AI verwachten (met name agents), en een duidelijkere mapping van CSDM-artefacten op operationele practices.

Het zou me niet verbazen als het ServiceNow CSDM de komende jaren verder wordt uitgebreid, zodat het ook Enterprise Service Management (ESM), Customer Service Management (CSM), Field Service Management (FSM) en Customer Relation Management (CRM) omvat.

**Een implementatie-/integratiescenario voor CSDM 5**

Ik heb onderstaand diagram gemaakt om te laten zien hoe het ServiceNow Common Service Data Model (CSDM 5) kan worden toegepast in combinatie met ITSM-processen, in het bijzonder Incident, Problem en Change Management, en met ITAM (Asset Management) in ServiceNow. In dit model:  

  
-   worden artefacten van ITSM-processen altijd gekoppeld aan een **Technical Service Offering**, samen met **Foundation-data** zoals de melder, de locatie en de assignment group;
  
-   kunnen, afhankelijk van de aard van de Service Offering, aanvullende verwijzingen worden vastgelegd naar een Service Instance, Dynamic CI Group of Service Delivery Network-item.
  

  
Om nauwkeurigheid en schaalbaarheid te waarborgen, gaat het aanbevolen model uit van een **zero-touch CMDB**, waarin Configuration Items (CI's), assets en hun afhankelijkheden automatisch worden gediscoverd of gefedereerd, zonder handmatige tussenkomst in ServiceNow. Ik verwacht dat tegen het einde van dit decennium veel informatie over het Service Delivery Network zal worden aangeleverd door **AI-agents**, die de huidige traditionele dagelijkse discovery- en federatiemechanismen geleidelijk vervangen (en/of verrijken), **waardoor de zero-touch CMDB een nauwkeurige, realtime virtuele databron wordt.**

Op dit moment maken de meeste bedrijven al gebruik van Request Management binnen het domein **Service Delivery** van CSDM. Het domein **Service Consumption** is nog grotendeels onontgonnen terrein. Naarmate IT4IT zich ontwikkelt tot IT4ESM (IT for **Enterprise Service Management**), wordt het domein Service Consumption steeds relevanter. Het maakt het mogelijk om **Business Services** en **Business Service Offerings** niet alleen te koppelen aan requests en cases van medewerkers, maar ook aan AI-agents die domeinen bedienen als IT, HR, Workplace Facilities, Finance, Legal, Risk, Business Continuity, Compliance en Security Management.

**Bronnen:**  

  
-   ServiceNow, "[Common Service Data Model (CSDM) 5 White Paper,"](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf)
  
-   ServiceNow "[CSDM Documentation Portal"](https://csdm.servicenow.com)
  
-   The Open Group [IT4IT Standard, Version 3.0.1](https://pubs.opengroup.org/it4it/3.0.1/standard/)"
  
-   TBM Council [Technology Business Management (TBM) Taxonomy 4.0](https://higherlogicdownload.s3.amazonaws.com/TBMCOUNCIL/c15d372f-9951-46c8-9c3f-213c696401b6/UploadedImages/TBM_Taxonomy_V4_0.pdf) (pdf)
  

![](/wp-content/uploads/2025/05/CSDM_5_final_may_2025-scaled.png)
