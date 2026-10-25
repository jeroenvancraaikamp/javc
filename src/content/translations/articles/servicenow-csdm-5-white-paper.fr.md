---
title: "ServiceNow a publié le CSDM 5"
excerpt: "Le 8 mai 2025, ServiceNow a publié son livre blanc tant attendu sur le Common Service Data Model (CSDM) 5. Ce document de 63 pages marque une évolution importante du modèle de données qui sous-tend de nombreuses implémentations ServiceNow dans les organisations informatiques du monde entier. Le CSDM 5 introduit"
source: "9bd5d70b78a9e775"
---

Le 8 mai 2025, ServiceNow a publié son [**livre blanc tant attendu sur le Common Service Data Model (CSDM) 5**](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf). Ce document de 63 pages marque une évolution importante du modèle de données qui sous-tend de nombreuses implémentations ServiceNow dans les organisations informatiques du monde entier.

**Le CSDM 5 introduit une structure affinée composée de sept domaines**, chacun représentant un domaine de capacités essentiel :  

  
2.  Ideation & Strategy
  
4.  Design & Planning
  
6.  Manage Portfolio
  
8.  Build & Integration
  
10.  Service Delivery
  
12.  Service Consumption
  
14.  Foundation
  

  
Par rapport au précédent CSDM 4 – publié il y a quatre ans –, le modèle mis à jour apporte plusieurs améliorations conceptuelles et structurelles. Voici un résumé des 10 changements les plus notables :  

  
2.  **Digital Product Portfolio** Tout comme dans le standard IT4IT 3.0.1, les applications, les services et les produits sont désormais tous traités dans le CDSM comme des éléments d'un Digital Product Portfolio géré, mettant l'accent sur la responsabilité du cycle de vie et la création de valeur.
  
4.  **Nouveau domaine : Ideation & Strategy** Un nouveau domaine a été introduit pour soutenir la planification stratégique. Il étend le Demand Management avec des liens vers les objectifs stratégiques, les plans d'affaires et les priorités d'investissement, offrant ainsi un point de départ aux workflows de livraison du domaine Build & Integration
  
6.  **Structuration améliorée de la CMDB** La CMDB est désormais découpée en Services, Service Offerings, Service Instances, Service Delivery Network Items et Dynamic CI Groups, chacun jouant un rôle plus clairement défini.
  
8.  **Définition élargie des Service Instances** Au-delà des Application Services, les Service Instances englobent désormais les types Data, Network, Connection, Facilities et Operational Process. Ceux-ci peuvent être superposés pour favoriser la composabilité et la traçabilité.
  
10.  **Concept de Service Delivery Network** Nouveau terme générique couvrant un large éventail de classes de la CMDB, le Service Delivery Network représente l'ensemble des Configuration Items qui supportent les Service Instances.
  
12.  **Dynamic CI Groups** Les CI peuvent désormais être regroupés dynamiquement selon des critères de requête, ce qui permet d'enregistrer les incidents, problèmes et changements au niveau du groupe et de simplifier les processus opérationnels.
  
14.  **Le Lifecycle Status** remplace l'Operational Status Une transition progressive est en cours, des états d'installation/opérationnels traditionnels vers des statuts et des étapes fondés sur le cycle de vie. Le CSDM 5 consacre une attention considérable à ces définitions du cycle de vie.
  
16.  **Refonte des noms et de la terminologie** Plusieurs artefacts ont été renommés afin de mieux refléter leur fonction. Si les noms peuvent être longs, ils devraient être abrégés dans les listes et formulaires de l'interface utilisateur.
  
18.  **L'IA est mentionnée** (évidemment) Le CSDM 5 fait bien référence à l'intelligence artificielle, mais avec très peu de développements, laissant place à l'interprétation et à de futurs affinements.
  
20.  **Extensions de la Foundation** La couche de base comprend désormais les Product Features, la Software Bill of Materials (SBOM) et les Value Streams, signe d'un meilleur alignement sur le standard IT4IT.
  

  
Le CSDM 5 est aligné sur le standard IT4IT 3.01 de l'OpenGroup, bien qu'un vocabulaire légèrement différent soit utilisé pour décrire des concepts similaires. Par exemple, les chaînes de valeur IT4IT « Plan », « Build », « Deliver » et « Run » sont comparables aux domaines du CSDM. Ceux qui recherchent des orientations supplémentaires sur la modélisation financière de l'IT ne les trouveront ni dans le CSDM 5, ni d'ailleurs dans IT4IT 3.0.1. Cela dit, il est néanmoins possible de mapper les données et définitions de la taxonomie Technology Business Management (TBM) 4.0/5.0 sur le CSDM.

Si le calendrier de publication – juste avant ServiceNow Knowledge 2025 – laisse supposer une certaine précipitation, le document contient des enseignements précieux. Cela dit, plusieurs lacunes et incohérences ont été relevées, ce qui laisse penser que des corrections ou clarifications mineures pourraient apparaître dans de futures versions.

**Prochaines étapes :**

Le CSDM 5 constitue une avancée importante, en particulier pour les entreprises qui s'alignent sur IT4IT et sur des frameworks d'architecture IT ouverts. Toutefois, ceux qui attendaient un Common Service Data Model pour l'**Enterprise Service Management (IT4ESM)** devront encore patienter un peu.

ServiceNow travaille déjà sur un CSDM 5+ Draft, qui comprend un modèle de données plus granulaire, avec davantage d'artefacts et de relations. En ce qui concerne le CSDM 6 (attendu en 2026), on peut s'attendre à des orientations de modélisation plus solides autour de l'IA (en particulier des agents) et à un mapping plus clair des artefacts du CSDM vers les pratiques opérationnelles.

Je ne serais pas surpris que le CSDM de ServiceNow soit encore étendu dans les années à venir, de manière à couvrir l'Enterprise Service Management (ESM), le Customer Service Management (CSM), le Field Service Management (FSM) et le Customer Relation Management (CRM).

**Un scénario d'implémentation/d'intégration du CSDM 5**

J'ai créé le schéma ci-dessous pour illustrer comment le Common Service Data Model de ServiceNow (CSDM 5) peut être appliqué conjointement avec les processus ITSM – en particulier l'Incident, le Problem et le Change Management – ainsi qu'avec l'ITAM (Asset Management) dans ServiceNow. Dans ce modèle :  

  
-   Les artefacts des processus ITSM sont toujours liés à une **Technical Service Offering**, ainsi qu'aux **données Foundation** telles que l'appelant, la localisation et le groupe d'affectation.
  
-   Selon la nature de la Service Offering, des références supplémentaires peuvent être enregistrées vers une Service Instance, un Dynamic CI Group ou un élément du Service Delivery Network.
  

  
Pour garantir l'exactitude et l'évolutivité, le modèle recommandé repose sur une **CMDB zero-touch**, dans laquelle les Configuration Items (CI), les assets et leurs dépendances sont automatiquement découverts ou fédérés, sans intervention manuelle dans ServiceNow. D'ici la fin de la décennie, je m'attends à ce qu'une grande partie des informations du Service Delivery Network soit fournie par des **agents IA,** remplaçant (et/ou enrichissant) progressivement les mécanismes quotidiens traditionnels de discovery et de fédération utilisés aujourd'hui, **faisant de la CMDB zero-touch une source de données virtuelle précise et en temps réel.**

Actuellement, la plupart des entreprises utilisent déjà le Request Management au sein du domaine **Service Delivery** du CSDM. Le domaine **Service Consumption** reste en grande partie inexploré. À mesure qu'IT4IT évolue vers IT4ESM (IT for **Enterprise Service Management**), le domaine Service Consumption gagnera en pertinence. Il permettra de lier les **Business Services** et les **Business Service Offerings** non seulement aux demandes et dossiers des collaborateurs, mais aussi à des agents IA au service de domaines tels que l'IT, les RH, les services généraux, la finance, le juridique, les risques, la continuité d'activité, la conformité et la gestion de la sécurité.

**Sources :**  

  
-   ServiceNow, « [Common Service Data Model (CSDM) 5 White Paper »](https://www.servicenow.com/community/s/cgfwn76974/attachments/cgfwn76974/common-service-data-model-kb/744/2/CSDM%205.pdf)
  
-   ServiceNow « [CSDM Documentation Portal »](https://csdm.servicenow.com)
  
-   The Open Group [IT4IT Standard, Version 3.0.1](https://pubs.opengroup.org/it4it/3.0.1/standard/) »
  
-   TBM Council [Technology Business Management (TBM) Taxonomy 4.0](https://higherlogicdownload.s3.amazonaws.com/TBMCOUNCIL/c15d372f-9951-46c8-9c3f-213c696401b6/UploadedImages/TBM_Taxonomy_V4_0.pdf) (PDF)
  

![](/wp-content/uploads/2025/05/CSDM_5_final_may_2025-scaled.png)
