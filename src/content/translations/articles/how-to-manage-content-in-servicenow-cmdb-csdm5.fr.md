---
title: "Comment gérer le contenu de la CMDB/du CSDM dans ServiceNow ?"
excerpt: "Alimenter et maintenir une base de données de gestion des configurations (CMDB) exacte, alignée sur le Common Service Data Model (CSDM) de ServiceNow, constitue un défi de taille pour la plupart des entreprises. Ce guide explique comment s’y prendre correctement, quels types d’éléments doivent (et ne doivent pas)"
source: "15fb901a5abce0fa"
---

Alimenter et maintenir une base de données de gestion des configurations (CMDB) exacte, alignée sur le Common Service Data Model (CSDM) de ServiceNow, constitue un défi de taille pour la plupart des entreprises. Ce guide explique comment s’y prendre correctement, quels types d’éléments doivent (et ne doivent pas) être enregistrés dans la CMDB, et quelles sont les méthodes les plus efficaces pour obtenir des données de grande qualité, aussi bien avec la technologie actuelle qu’en prévision des besoins de demain.  

### Philosophie fondamentale

  
Les entreprises doivent définir et maintenir manuellement leurs baselines de portefeuille (par exemple services, offres, applications). Les instances de ces baselines, c’est-à-dire le contenu de la CMDB, doivent être automatiquement découvertes ou fédérées à partir de sources de données autorisées. **Aucune personne ne doit modifier manuellement les attributs ou les relations des éléments de configuration (CI) de la CMDB, afin que celle-ci reflète la réalité technique.** Des exceptions limitées peuvent être admises lorsque la qualité des données automatisées n’en est pas compromise.

L’entreprise ne doit enregistrer que ses propres éléments/relations, ainsi que les éléments qu’elle consomme (en tant que service) auprès d’un fournisseur interne ou externe. Les fournisseurs de services doivent suivre (dans leur propre CMDB) ce qu’ils fournissent en tant que service ; les MSP qui gèrent des instances de produits de l’entreprise doivent les découvrir/fédérer dans la CMDB de l’entreprise, afin que celle-ci puisse toujours produire des rapports sur ses propres actifs à partir de sa propre CMDB.  

### **Introduction**

  
ServiceNow propose plusieurs moyens d’alimenter/mettre à jour les éléments de configuration (instances) dans la CMDB ServiceNow.  

  
-   **ServiceNow propose cinq méthodes (utilisables en parallèle) pour identifier les éléments de configuration (CI) nécessaires à la CMDB ServiceNow.**  
    
      
    -   Grâce à un balayage IP (IP sweep), tous les équipements IP situés dans des plages IP connues/visibles sont découverts (l’adresse IP/MAC, le FQDN et les protocoles de gestion disponibles tels que SSH, WMI, RDP et SNMP sont connus pour tous les équipements)
      
    -   L’Agent Client Collector (ACC) installé sur un équipement Linux/Windows/MacOS peut informer ServiceNow sur les équipements sur lesquels il est installé.
      
    -   Par fédération, ServiceNow peut récupérer (à partir de diverses sources de données) les éléments de configuration que celles-ci sont autorisées à fournir.
      
    -   Lorsque ServiceNow reçoit un événement concernant un CI via une intégration, ce CI peut être enregistré dans la CMDB (si nécessaire).
      
    -   Les utilisateurs autorisés peuvent enregistrer manuellement des CI (ou leurs relations/attributs) dans la CMDB de ServiceNow, soit par import de fichiers, soit directement via l’interface graphique de ServiceNow.
      
    
      
    
  
-   **ServiceNow propose cinq méthodes (utilisables en parallèle) pour découvrir et fédérer ce qui est installé/s’exécute sur les équipements IP détectés.**  
    
      
    -   La découverte avec identifiants (credential-based discovery) peut être utilisée si les droits/identifiants nécessaires ont été configurés (ServiceNow se connecte à l’équipement IP)
      
    -   La découverte sans identifiants (credential-less discovery) peut être utilisée en interrogeant les protocoles de gestion disponibles de l’équipement IP détecté (ServiceNow récupère les informations accessibles)
      
    -   L’Agent Client Collector (ACC) peut informer ServiceNow de la plupart des éléments qui s’exécutent/se trouvent sur l’équipement sur lequel il est installé, ainsi que de qui l’utilise/l’a utilisé et à quel moment.
      
    -   Par fédération, ServiceNow peut récupérer des informations (à partir de diverses sources de données) sur ce qui s’exécute dans/sur les éléments de configuration connus.
      
    -   Les utilisateurs autorisés peuvent enregistrer manuellement ce qui est installé dans/sur les CI de la CMDB de ServiceNow, soit par import de fichiers, soit directement via l’interface graphique de ServiceNow.
      
    
      
    
  
-   **ServiceNow dispose de trois moyens pour déterminer les dépendances entre les piles (ou leurs éléments) enregistrées dans la CMDB**  
    
      
    -   Grâce à la découverte avec identifiants, ServiceNow peut analyser des patterns et des dépendances (par exemple, ce composant applicatif consomme telle base de données/API de telle application)
      
    -   Par fédération, ServiceNow peut récupérer (à partir de diverses sources de données) les dépendances (par exemple, selon l’APM, cette application dispose d’une interface avec telle autre application)
      
    -   Les utilisateurs autorisés peuvent enregistrer manuellement les dépendances connues des CI
      
    
      
    
  
-   **L’automatisation ServiceNow peut (si l’entreprise a acquis les licences appropriées)**  
    
      
    -   Fournir une vision très fine de ce qui s’exécute/est installé/est configuré (ou non) sur les équipements IP sur lesquels l’Agent Client Collector est installé
      
    -   Fournir au Service Desk un accès à distance aux équipements IP sur lesquels l’Agent Client Collector est installé
      
    -   Installer/supprimer des logiciels ou modifier des paramètres/politiques logiciels sur les équipements IP sur lesquels l’Agent Client Collector est installé.
      
    -   Recevoir directement des événements/alarmes configurés provenant des équipements IP sur lesquels l’Agent Client Collector est installé.
      
    -   Installer/supprimer des services/ressources cloud à l’aide de ServiceNow Integration Hub (par exemple pour l’optimisation du cloud)
      
    -   Installer/supprimer des services/ressources IAM à l’aide de ServiceNow Integration Hub (directement dans AD/Entra ou via SailPoint/Saviynt)
      
    -   Déclencher des agents d’IA et des scripts, directement ou via des MID Servers ServiceNow
      
    
      
    
  

  
Pour information : ServiceNow contient également des éléments de portefeuille (baselines), avec leurs attributs/relations :  

  
-   Les applications métier et les capacités métier sont maintenues à l’aide du module APM (qui fait partie de SPM) de ServiceNow ou dans une autre source de données autorisée (LeanIX, Apptio, etc.).
  
-   Les services, les offres de service et leurs engagements/droits sont maintenus à l’aide du module DPM de ServiceNow.
  
-   Les composants SDLC sont maintenus dans le module DevOps, selon les pratiques Agile/SAFe
  
-   Les articles du catalogue de produits commandables sont maintenus à l’aide de Service Catalog Management (qui fait partie d’ITSM)
  
-   Les modèles d’actifs/de CI et les licences sont maintenus dans ServiceNow à l’aide de Software/Hardware Asset Management ou sont fournis avec les informations des CI découverts/fédérés.
  
-   Integrated Risk Management, Business Continuity Management et Security Operations disposent chacun de leurs propres artefacts de référence (qu’ils gèrent), souvent liés à des instances de la CMDB.
  
-   Les données de référence fondamentales (par exemple sociétés, BU, départements, pays, régions/provinces, langues, devises, sites, groupes, utilisateurs, rôles, etc.) peuvent être maintenues dans ServiceNow,  
    mais elles sont souvent récupérées par ServiceNow à partir d’autres sources de données autorisées (par exemple Workday, HCM, SuccessFactors, AD, Saviynt, SailPoint, ISO 3166, IANA, etc.)
  

  
*La suite de cet article porte sur l’enregistrement et la maintenance des CI d’instance dans la CMDB via ITOM/ITSM.*  

### **Points à prendre en compte** :

  

  
-   Le contenu de la CMDB devient de plus en plus granulaire et doit être tenu à jour quasiment en temps réel.
  
-   Les plateformes de cloud public, les gestionnaires de réseau/d’éléments, ainsi que les outils SD-WAN, d’IA et CDaaS peuvent désormais fournir des informations CMDB à ServiceNow, souvent au moyen d’intégrations/connecteurs prêts à l’emploi.
  
-   Certaines plateformes disposent de leurs propres sources de données (par exemple Copado, SAP CALM, SAP ChaRM, GitLab, SolarWinds, etc.) capables de fournir des informations CMDB à ServiceNow, souvent au moyen d’intégrations/connecteurs prêts à l’emploi.
  
-   De plus en plus d’entreprises optent pour une CMDB « zero-touch », qui supprime toute maintenance manuelle du contenu de la CMDB, à l’exception des baselines du portefeuille d’applications/de services.
  
-   Certaines entreprises autorisent la maintenance manuelle de CI/actifs de certains types/classes (pour lesquels il n’existe pas de source adaptée) dans la CMDB. Par exemple : voitures, vélos, installations, clés, baies, cages.
  
-   ServiceNow ne peut pas découvrir ce qu’il ne « voit » pas ou ce qui ne le contacte pas (par exemple via ACC ou une API).
  
-   Les MID Servers ServiceNow permettent d’étendre la visibilité de ServiceNow à ce qui est connecté à des réseaux IP sur site ou de tiers.
  
-   Dans les réseaux IP très complexes/segmentés/sécurisés, un grand nombre de MID Servers ou d’Agent Client Collectors est généralement nécessaire.
  
-   Les postes de travail appartenant à l’entreprise sont de plus en plus utilisés hors site (par exemple par des télétravailleurs) et ne sont pas toujours connectés à l’entreprise, par exemple via un VPN.
  
-   Le « Bring Your Own » (équipement/licence) bouscule les méthodes de travail et d’enregistrement traditionnelles.
  
-   Certaines organisations (par exemple la Défense nationale) utilisent une instance ServiceNow installée localement, ce qui entraîne des défis et des limites spécifiques.
  
-   Si vous souhaitez également mettre en œuvre la gestion des risques et de la conformité, l’Application Portfolio Management, la gestion des fournisseurs ou la gestion des actifs, vous aurez besoin dans la CMDB de données supplémentaires, au-delà de ce qui est nécessaire pour l’IT Service Management.
  

  

### **Principes directeurs :**

  

  
-   Respectez les définitions/relations du Common Service Data Model de ServiceNow. Utilisez autant que possible les intégrations prêtes à l’emploi (Out of the Box, OOTB) avec ServiceNow.  
    Ne personnalisez que lorsque c’est justifié et que l’impact à long terme a été soigneusement évalué.
  
-   N’effectuez une maintenance manuelle du contenu de la CMDB que lorsque l’automatisation n’est pas une option viable, et lorsque vous pouvez garantir une maintenance adéquate et des revues périodiques (certification) de ces données.
  
-   Si vous avez dans la CMDB un ou plusieurs éléments/actifs maintenus manuellement, les auditeurs externes exigeront la documentation, la mise en œuvre, la formation, la maintenance et la gouvernance des processus correspondants, ainsi que des activités d’amélioration continue de la qualité des données pour ces éléments.
  
-   En optant pour une CMDB « zero-touch » contenant des instances de CI (et leurs relations), les entreprises doivent maintenir les intégrations techniques nécessaires à la CMDB et maintenir manuellement les baselines de portefeuille à l’aide de Digital Portfolio Management, une tâche assurée par les responsables de portefeuille/service owners.
  

  
**Quand installer/utiliser un Agent Client Collector (ACC) sur un ordinateur Windows/Linux/MacOS ?**  

  
-   Lorsque l’entreprise ne peut pas facilement rendre les équipements IP visibles pour ServiceNow (par exemple parce qu’ils se trouvent derrière plusieurs pare-feu qui ne peuvent pas être ouverts)
  
-   Lorsque l’entreprise souhaite connaître l’utilisation réelle des logiciels/ressources sur les équipements IP (c’est-à-dire pour le Software Asset Management)
  
-   Lorsque l’entreprise souhaite superviser/gérer des équipements IP tels que des PC/VDI à l’aide de l’Agent Client Collector (pour le Helpdesk/SecOps)
  
-   Lorsque l’entreprise ne dispose pas d’outils tels que JAMF/Intune/SCCM capables de fédérer les informations des PC vers ServiceNow, ou ne les utilise pas
  
-   Lorsque l’entreprise a besoin d’informations fournies par ACC qui ne sont pas disponibles via JAMF/Intune/SCCM.
  

  
*Pour information : du point de vue des licences ServiceNow, la manière dont le CI arrive dans la CMDB n’a pas d’importance ; l’utilisation d’ACC est incluse dans le prix de la licence ITOM.*  

### **Quand utiliser un MID Server ServiceNow ?**

  

  
-   Lorsque l’entreprise souhaite effectuer une découverte ServiceNow d’équipements IP situés derrière un pare-feu et sur lesquels aucun Agent Client Collector n’est installé.
  
-   Lorsque l’entreprise souhaite gérer des équipements IP situés derrière un pare-feu (avec ou sans Agent Client Collector), ou ce qu’ils contiennent, ou y accéder
  
-   Lorsque l’entreprise souhaite que ServiceNow accède à des API qui ne sont pas directement accessibles depuis l’Internet public (par exemple l’API OCI)
  
-   Lorsque l’entreprise isole une partie du réseau IP et que ServiceNow ou ses autres MID Servers ne peuvent pas voir ce qui est connecté à ce réseau.
  

  
*Info 1 : bien que le logiciel MID Server ne nécessite pas de licence ServiceNow payante, il faut prévoir des coûts de licences de système d’exploitation, d’IAM et de maintenance pour les VM sur lesquelles il est installé*

*Info 2 : un MID Server présente des limites de capacité/performance. Il est par ailleurs déconseillé de mélanger trafic de production et trafic hors production sur un même MID Server. Vous aurez donc vraisemblablement besoin de plusieurs MID Servers*  

### **Utilisation d’identifiants pour la découverte et l’automatisation**

  
Si la découverte avec identifiants est retenue pour alimenter/mettre à jour le contenu de la CMDB et/ou installer/supprimer des logiciels/paramètres, ServiceNow a besoin d’identifiants :  

  
-   ServiceNow peut être configuré pour utiliser un (nombre limité de) compte(s) générique(s) avec mot de passe, stocké(s) localement dans ServiceNow (simple à mettre en place/maintenir, mais souvent peu apprécié par les équipes SecOps)
  
-   ServiceNow peut être configuré pour utiliser des identifiants stockés/maintenus dans CyberArk, qui ne seront pas stockés dans ServiceNow (nécessite une intégration avec CyberArk, mais souvent préféré par les équipes SecOps)
  

  
*Remarque : on suppose que les identifiants du compte sont préalablement provisionnés (par exemple dans l’image) sur les équipements IP à découvrir par la découverte avec identifiants.  
Le compte utilisé pour la découverte avec identifiants nécessite un accès en lecture seule aux inventaires des équipements.*  

### **Équipements personnels (Bring Your Own, BYO)**

  

  
-   Les équipements BYO appartiennent à une autre partie que l’entreprise elle-même. Ont-ils leur place dans votre CMDB ?
  
-   Les logiciels installés sur les équipements BYO peuvent appartenir à l’autre partie ou être payés par elle, plutôt que par l’entreprise.
  
-   Si vous souhaitez enregistrer un équipement BYO dans votre CMDB (par exemple pour SecOps ou le support), étiquetez-le comme BYO.
  
-   Appliquez les règles BYO aux équipements étiquetés BYO (et à ce qu’ils contiennent).
  

  

### **Solutions SaaS/PaaS**

  

  
-   Les éléments de configuration sont souvent fournis (à l’unité ou en lot) « as a Service » par un fournisseur de services managés interne/externe. Les baselines (c’est-à-dire les modèles) ne sont pas enregistrées dans la CMDB.  
    Les instances des services fournis peuvent être enregistrées en tant que « Service Instances » et reliées aux CI dont elles dépendent.
  
-   Pour la plupart des services SaaS tiers (proposés comme une boîte noire managée), les CI sont inconnus et ne seront pas enregistrés dans la CMDB.  
    Les services/offres SaaS (baselines) sont définis dans/via Digital Portfolio Management. Si plusieurs instances du SaaS sont fournies, elles peuvent être enregistrées en tant que « Service Instances ».
  
-   La plupart des grands fournisseurs SaaS (par exemple Microsoft, SAP, Salesforce, Google, Asana, etc.) proposent des API permettant aux entreprises de voir quels utilisateurs/rôles consomment quelles licences/quels services.
  
-   Certains fournisseurs SaaS proposent des API permettant de demander ou de retirer des licences, des services ou des rôles.
  

  

### **Étiquetage (tagging) et mapping :**

  

  
-   Les éléments de configuration modernes peuvent être étiquetés. Différentes clés sont utilisées à des fins différentes. Les tags sont transmis à ServiceNow avec le CI  
    
      
    -   Certaines entreprises utilisent l’environnement du CI comme tag (par exemple développement, test, production).
      
    -   Les CI qui doivent être (directement) reliés aux offres dont ils relèvent doivent être étiquetés avec l’identifiant unique de l’offre.  
        Le tag sert ensuite à créer une relation/un mapping « l’offre dépend du compte de service cloud » (c’est-à-dire un mapping basé sur les tags)
      
    
      
    
  
-   Regroupement des CI non étiquetés pouvant être mappés à des offres.  
    
      
    -   Des groupes de CI peuvent être définis et leurs membres mappés manuellement à ces groupes (par exemple les environnements D, T, A et P d’une même application).
      
    -   Les CI d’une même classe/d’un même type peuvent être automatiquement mappés au groupe à l’aide d’une requête (par exemple « tous les PC Windows 10 des utilisateurs basés à Amsterdam »)
      
    
      
    
  

  

### **Quand découvrir/fédérer les données de la CMDB ?**

  
Dans l’idéal, le contenu de la CMDB est mis à jour quasiment en temps réel. Malheureusement, la technologie n’est pas encore à ce niveau. Actuellement, il est recommandé de :  

  
-   Récupérer quotidiennement les modifications (des attributs/relations) de tous les CI fédérés (« chargements delta »), de préférence en dehors des heures de bureau.
  
-   Récupérer chaque semaine l’ensemble (des attributs/relations) des CI fédérés actifs (« chargements complets »), ce qui resynchronise intégralement la cible (la CMDB).
  
-   Exécuter chaque tâche de découverte quotidiennement. Par exemple, balayer l’ensemble du réseau IP une fois par jour.
  
-   Répartir les différentes tâches sur la journée afin de limiter la charge sur les instances ServiceNow/MID Servers.
  
-   Lancer des découvertes ponctuelles en temps réel, si nécessaire (pour un élément de configuration sur lequel l’Agent Client Collector est installé)
  
-   Si possible, mettre à jour le contenu de la CMDB en temps réel, par exemple lorsque la source pousse ses données vers la CMDB.
  

  

### **Comment gérer la santé de la CMDB ?**

  

  
-   Suivez/analysez les tendances quantitatives à l’aide de Performance Analytics ou d’outils de BI. Par exemple :  
    
      
    -   Nombre total d’éléments actifs par classe et par source à la fin de la période précédente
      
    -   Nombre d’éléments par classe et par source créés au cours de la période précédente
      
    -   Nombre d’éléments par classe et par source mis à jour au cours de la période précédente
      
    -   Nombre d’éléments par classe et par source retirés au cours de la période précédente
      
    
      
    
  
-   Définissez ce qui est satisfaisant, surveillez-le (et produisez des rapports), par exemple :  
    
      
    -   Pourcentage d’ordinateurs sur lesquels des logiciels sont installés (devrait être de 100 %, hors équipements BYO/non gérés)
      
    -   Pourcentage de CI actifs mis à jour/fournis au cours des 90 derniers jours (devrait être de 100 %)
      
    -   Pourcentage de VM virtualisant un serveur (devrait être supérieur à 90 %)
      
    -   Pourcentage de CI (par exemple PC, téléphones) devant être attribués à une personne active et qui le sont effectivement (devrait être supérieur à 90 %)
      
    -   Pourcentage de CI physiques situés sur un site connu (devrait être de 100 %)
      
    -   Etc.
      
    
      
    
  
-   Produisez chaque mois un rapport sur les pourcentages (et leur évolution) de couverture, de complétude, d’exactitude, d’obsolescence et (éventuellement) de conformité des CI/relations
  
-   Gouvernez les intégrations techniques (revue périodique des données et des plans avec les responsables de chaque source de données intégrée)
  
-   Faites certifier les CI/relations maintenus manuellement par leur CI owner/service owner.
  
-   Menez des projets d’amélioration de la qualité des données si nécessaire et là où c’est nécessaire.
  
-   Suivez les éléments créés par les outils d’Event Management (pourquoi ne sont-ils pas arrivés par la voie normale ?)
  

  

### **Scénarios recommandés pour une grande entreprise type :**

  
Il est recommandé aux grandes entreprises d’appliquer ce qui suit :  

  
-   **POSTES DE TRAVAIL :**
  

  

  
-     
    
      
    -   Fédérer les équipements personnels (y compris ce qui y est installé) à partir de JAMF et/ou d’Intune (s’ils sont utilisés)
      
    -   Installer des Agent Client Collectors sur les ordinateurs personnels si nécessaire, par exemple pour enrichir les données d’Intune/JAMF et permettre la gestion à distance des PC.
      
    -   Fédérer les informations sur les équipements personnels et leur support auprès des fournisseurs mondiaux de ces équipements (par exemple Dell, Lenovo, etc.), à l’aide des API prêtes à l’emploi de ces fournisseurs
      
    -   Définir une politique propre à chaque pays/technologie pour la gestion des équipements BYO (et de ce qu’ils contiennent) (pays différents è législations et comités d’entreprise différents)
      
    
      
    
  

  

  
-   **INFORMATIQUE DE BUREAU**
  

  

  
-     
    
      
    -   Fédérer les informations sur les imprimantes de bureau (et les services associés) auprès des fournisseurs de ces imprimantes (services).
      
    -   Fédérer les actifs des installations à partir des outils de gestion des actifs des installations (vidéosurveillance, ascenseurs, équipements OT, téléviseurs LED, etc.)
      
    -   Découvrir les équipements OT pertinents (par exemple les automates programmables) gérés via des contrôleurs IP, à l’aide de SNMP ou de patterns personnalisés.
      
    -   Fédérer les données de gestion des accès aux bâtiments à partir des outils BAM (lecteurs biométriques, portiques/portes)
      
    
      
    
  

  

  
-   **ARTEFACTS CLOUD :**
  

  

  
-     
    
      
    -   Fédérer les artefacts cloud d’AWS, Azure et GCP dans la CMDB à l’aide des Service Graph Connectors prêts à l’emploi
      
    -   Fédérer les artefacts cloud d’OCI à l’aide des plugins prêts à l’emploi. Découvrir les serveurs Linux/Windows par la découverte avec identifiants ou à l’aide d’Agent Client Collectors.
      
    -   Si nécessaire : découvrir le contenu des conteneurs cloud et leurs interdépendances à l’aide de ServiceNow Discovery.
      
    
      
    
  

  

  
-   **ÉQUIPEMENTS SUR SITE (hors postes de travail)**
  

  

  
-     
    
      
    -   Déployer des MID Servers (production et hors production séparés) dans le réseau IP de l’entreprise
      
    -   Si la sécurité l’autorise : découvrir quels équipements sont connectés aux plages IP pertinentes de l’entreprise, à l’aide de la découverte sans identifiants.
      
    -   Si la sécurité n’autorise pas les balayages IP : faire installer des Agent Client Collectors sur les serveurs Windows/Linux et/ou fédérer les données à partir de sources autorisées (par exemple SolarWinds, PRTG, SCCM)
      
    
      
    
  

  

  
-   **RÉSEAU**
  

  

  
-     
    
      
    -   Si la sécurité autorise la découverte : découvrir quels routeurs/commutateurs sont connectés aux plages IP pertinentes de l’entreprise, à l’aide de la découverte sans identifiants.
      
    -   Si la sécurité n’autorise pas la découverte : fédérer les données des équipements réseau à partir d’une source de données faisant autorité (par exemple Network Manager, Element Manager)
      
    -   Fédérer les données de configuration réseau telles que les segments réseau, les règles de pare-feu, les plages IP, les VPN et les certificats à partir de sources de données faisant autorité.
      
    
      
    
  

  

  
-   **SOLUTIONS SAAS/PAAS**
  

  

  
-     
    
      
    -   Les services SaaS/PaaS (baselines) acquis auprès d’un tiers doivent être enregistrés manuellement en tant que services/offres. Leurs instances/tenants (CI) peuvent être enregistrés en tant que « Service Instances », manuellement ou par découverte.
      
    -   Si l’entreprise souhaite visualiser et gérer les licences/services/rôles SaaS via ServiceNow, une intégration avec les fournisseurs SaaS/PaaS concernés (par exemple Microsoft, SAP, Salesforce, Google) est recommandée.
      
    
      
    
  

  

### **Remarques finales :**

  

  
-   Pour certaines entreprises, des variantes des recommandations ci-dessus peuvent être nécessaires ou préférables.
  
-   Toutes les sources de données n’offrent pas les mêmes capacités ; le diable se cache dans les détails.
  
-   ServiceNow est excellent, mais pas parfait ; certaines personnalisations ne font tout simplement que l’améliorer :-)
  
-   Faites appel à un spécialiste CMDB/CSDM pour vous conseiller sur la configuration et la feuille de route les mieux adaptées aux besoins et aux capacités de votre entreprise.
