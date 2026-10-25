---
title: "Le CSDM5 expliqué en 10 minutes..."
excerpt: "Il existe des centaines d'interprétations du Common Service Data Model (CSDM) de ServiceNow. Dans cet article, vous découvrirez comment le CSDM5 est conçu et mis en œuvre dans ServiceNow. Des prismes différents, des priorités différentes. ServiceNow considère que tous les portefeuilles font"
source: "e667ca0e6ed5a861"
---

Il existe des centaines d'interprétations du Common Service Data Model (CSDM) de ServiceNow. Dans cet article, vous découvrirez comment le CSDM5 est conçu et mis en œuvre dans ServiceNow.

Des prismes différents, des priorités différentes.

-   Les responsables de programmes/projets gèrent le **portefeuille de projets/demandes.**
-   Les architectes d'entreprise gèrent le **portefeuille d'applications**
-   Les product owners gèrent le backlog de leurs composants dans le **portefeuille de produits**
-   Les service owners gèrent leurs artefacts dans le **portefeuille de services**
-   Les configuration managers suivent leur inventaire IT dans la **Configuration Management Database** (CMDB)
-   Les asset managers suivent la valeur comptable, les coûts d'exploitation, la localisation ainsi que les propriétaires/consommateurs de leurs ****actifs financiers.****
-   Les Master Data Stewards administrent les **données de référence transverses aux portefeuilles** dans divers outils.

**ServiceNow considère que tous les portefeuilles font partie du portefeuille de produits numériques de l'entreprise** et les gère au moyen du Digital Portfolio Management (DPM). Cela dit, sous le capot du DPM, ce sont bien les portefeuilles individuels, les pratiques spécifiques et les modules applicatifs qui sont utilisés. Autrement dit, vous ne pouvez pas faire d'IT Service Management dans ServiceNow si vous n'y mettez pas en œuvre (la gestion d')un portefeuille de services.

> Aujourd'hui, les éléments des portefeuilles sont maintenus manuellement par leurs parties prenantes (dans les différents portefeuilles), et les composants construits (stockés dans des référentiels propres à chaque technologie) sont déployés via des pipelines automatisés. Les éléments déployés sont automatiquement détectés et enregistrés dans la CMDB, et les actifs associés sont automatiquement créés/mis à jour. Les éléments déployés peuvent être balisés techniquement afin que les valeurs d'attributs non techniques soient détectées automatiquement, rendant inutile toute mise à jour manuelle de la CMDB.

Des concepts utilisés il y a dix ans dans de nombreuses entreprises ne sont plus applicables aujourd'hui, par exemple :

-   La **découverte automatisée et la fédération** de l'IT Operations Management ont remplacé le processus manuel de configuration management
-   Les données d'applications/produits/services qui doivent être périodiquement attestées et revues sont placées dans des portefeuilles et gérées via les pratiques de **Digital Portfolio Management**.
-   Les actifs, y compris leur statut, leur propriétaire, leur consommateur, leur coût et leur localisation, sont gérés via l'**Asset Management** matériel/logiciel/cloud.
-   Le **DevOps agile** a remplacé/modifié certaines parties du change management et du problem management ITIL.
-   Les **Security Operations** (pour les éléments de production comme de hors production) sont devenues essentielles pour les entreprises.
-   Les entreprises doivent de plus en plus se conformer à la législation, par exemple en matière de **protection des données, de risque et de conformité** (pour les éléments de hors production et de production)
-   Le **cloud computing** est devenu la norme. Les services cloud sont demandés (par les outils DevOps) via des API et sont provisionnés automatiquement.
-   L'**intelligence artificielle** bouleverse la manière dont les gens gèrent, gouvernent et utilisent l'IT.

Dans le CSDM5, les artefacts suivants ont été définis :

-   Les **Business Applications** sont des produits à forte granularité qui fournissent des **capacités métier**, et dont le cycle de vie, l'utilisation autorisée et les feuilles de route doivent être gérés.  
    Une Business Application n'existe qu'une seule fois dans le portefeuille et peut avoir plusieurs instances de produit, modélisées comme des Service Instances distinctes.  
    
-   Les **composants** sont des produits à fine granularité qui font partie d'une application et qui sont développés et maintenus via des pratiques DevOps.
-   Les **services** sont fournis par des fournisseurs et consommés par des consommateurs ; ils peuvent être liés à des applications ou à d'autres produits.  
    Un **Business Service** soutient directement les résultats métier et est visible par le métier ou les utilisateurs finaux.  
    Un **Technical Management Service,** détenu par l'IT, soutient un ou plusieurs business services mais n'est pas directement visible par le métier.
-   Les **Service Offerings** sont des variantes de services (par exemple pour différentes régions/fuseaux horaires, avec une distinction entre production et hors production, etc.), chacune ayant ses propres engagements et/ou faisant appel à différentes équipes.
-   Une **Service Instance** est un élément déployé, pris en charge dans le cadre d'une ou plusieurs Service Offerings, et lié à un produit ou à une application. Par exemple un site web, une API, etc.
-   Le **Service Delivery System** est un ensemble de Configuration Items détectés/reliés individuellement, dont les Service Instances peuvent dépendre.
-   Les **actifs** sont des enregistrements financiers d'éléments individuels qui ont été achetés ou déployés, qui figurent dans le grand livre de l'entreprise et/ou pour lesquels des licences peuvent devoir être payées. Les actifs relèvent d'un modèle d'actif. Par exemple, l'instance de NotePad++ découverte sur un PC donné est un actif du modèle d'actif logiciel « Notepad++ ».

**Remarques :**

-   Dans le CSDM5, **les Business Applications se limitent à celles qui soutiennent directement les résultats métier et sont visibles par le métier ou les utilisateurs finaux**. Pour chaque application du portefeuille, une évaluation CIA/BIA doit être produite et revue périodiquement. En outre, pour chaque application, des rôles doivent être définis et attribués à des utilisateurs individuels via l'Identity and Access Management.
-   La charge administrative/de gouvernance décrite ci-dessus n'est pas justifiable pour les milliers de modèles de packages logiciels PC/mobiles qu'utilise une entreprise ; c'est pourquoi ces **(modèles de) packages logiciels ne sont pas considérés comme des applications**. C'est le Software Asset Management qui assure le suivi des actifs logiciels, y compris du nombre d'instances en service.
-   **Certaines entreprises choisissent d'enregistrer tous les outils techniques, middlewares, SGBD et autres logiciels système comme Business Applications**. Or, ces applications ne soutiennent pas directement les résultats métier et sont souvent invisibles pour le métier ou les utilisateurs finaux. Cette pratique peut être acceptable si la charge administrative/de gouvernance est acceptée et si ces applications techniques respectent les mêmes politiques que les applications métier. Vous pouvez également enregistrer les applications techniques dans le portefeuille tout en les exemptant de la gouvernance applicable aux Business Applications.
-   Une application fournie « as a Service » peut être enregistrée comme business application si son cycle de vie est géré par l'entreprise et soumis aux mêmes politiques que les autres applications. **Si une solution est consommée en tant que service, mais que l'éditeur gère son cycle de vie, cette solution est considérée comme un service, et non comme une application.**
-   **Les plateformes de cloud public, telles qu'Azure, OCI, AWS et GCP, sont consommées en tant que service** auprès d'un fournisseur qui gère la feuille de route et le cycle de vie de la plateforme technique. Ces plateformes sont considérées comme des services, et non comme des applications.
-   **Les entreprises peuvent produire/maintenir leurs propres applications sur des plateformes qu'elles consomment en tant que service**. Par exemple, SAP S/4 HANA est consommé en tant que service auprès de SAP, et l'entreprise (ou un de ses partenaires) crée des configurations/workflows personnalisés. Les applications à forte granularité produites par l'entreprise (ou un de ses partenaires) peuvent être enregistrées comme applications, et leurs configurations/scripts/API sont considérés comme des composants.
-   Étant donné que la seule constante est le changement, il est recommandé d'**adopter une taxonomie et des données de référence standard du marché** issues d'une source faisant autorité, idéalement indépendante des éditeurs et tenue à jour par un organe de gouvernance. Par exemple, le TBM Council maintient un bon modèle de taxonomie, avec des données prêtes à l'emploi et bien définies.

**Pour mémoire** :

-   Les **actifs** sont définis/délimités différemment dans l'ISO 27000, l'ISO 55000, les normes IFRS/GAAP et d'autres référentiels formels que dans l'ITSM/ITIL.
-   ServiceNow fait la distinction entre les **Service Instances** (utilisées par les consommateurs) et les **Configuration Items** (qui peuvent soutenir une ou plusieurs Service Instances).

-   Pour les Service Instances, vous pouvez enregistrer leur relation avec les données de référence. Les Configuration Items ne doivent pas être modifiés manuellement dans ServiceNow
-   Les utilisateurs peuvent créer des incidents/problèmes/changements sur les Service Instances liées aux offerings auxquelles ils ont droit, mais pas nécessairement sur les Configuration Items.

-   **Le CSDM doit prendre en charge les informations sur les éléments de production, mais aussi celles sur les éléments hors production**. Cela dit, les offerings et engagements des fournisseurs peuvent différer entre les deux environnements, et certaines pratiques (par exemple le change management) ne s'appliquent qu'aux offerings de production.
-   Chaque éditeur IT4IT utilise sa propre terminologie et ses propres définitions pour sa plateforme. Puisqu'une pratique d'entreprise ne devrait être mise en œuvre que sur une seule plateforme à l'échelle de l'entreprise, **utiliser la terminologie/les définitions propres à l'éditeur (par exemple les guides de processus de bonnes pratiques, tutoriels vidéo et articles communautaires alignés sur la plateforme) est pertinent**. **Adopter des définitions/une terminologie issues de référentiels obsolètes et/ou incompatibles n'a aucun sens.**

**Exemples :**

-   **Portefeuilles :** « ERP Applications », « Public Cloud Services », « ERP Service Instances », « End-User Services » ; « GitLab Components »
-   **Business Applications :** « SAP S/4 Hana Platform », « SAP ERP Application », « SAP CALM Application », « ServiceNow Platform », « ServiceNow ITSM/ITOM/ITAM », « Workday ».
-   **Applications techniques :** « Intune », « JAMF », « Cisco Works », « SQL Server 2016 », « SQL Server 2022 », « .NET 4 », « Python 7 », « MuleSoft », « Tibco »  
    
-   **Composants :** « SN MidServer », « JAVASCRPT X V93.47 », « AI Agent Y »
-   **Services :** « Database Support », « Middleware Support », « PC Support », « Windows Server/VM Support »,
-   **Offerings :** « Database \[EMEA, PROD\] », « Database \[LATAM, PROD\] », « Database \[EMEA, NON-PROD\] », « Windows PC \[NL\] », « IT Service Management \[PROD\] »,  
    « Windows VM \[AZURE\] », « Windows VM \[OCI\] », « Windows VM \[AWS\] »
-   **Service Instances :** « PRD.Service-Now.com », « DEV.Service-Now.com », « SQL-Server@VM2028038 », « API-32312 »
-   **Actifs/Service Delivery Systems :** « PC21213 », « MasterDB@SQL-Server@VM2028038 », « Jeroens iPhone »
-   **Modèle d'actif/de produit :** « Windows 11 Operating System », « Notepad++ » ; « Calculator 7.5.3 », « Dell 7534 Laptop », « SQL Server 2021 »

**Quoi utiliser, et où ?**

**![](/wp-content/uploads/2025/09/CSDM5_core_objects.png)**

Les processus ITSM tels que l'incident management, le change management et le problem management font référence aux éléments suivants :

-   La **Service Instance** impactée par l'incident, le changement ou le problème
-   La **Service Offering**, qui comprend les engagements et les abonnements applicables à cette Service Instance (et à d'autres similaires)
-   Le **service** dont l'offering est une variante (c'est-à-dire le parent de la Service Offering)
-   Le **Service Delivery System (également appelé** **Configuration Item/actif),** qui soutient les Service Instances et qui est attribué directement à l'utilisateur (par exemple son PC/téléphone).  
    
-   L'**Assignment Group** du fournisseur et **l'agent assigné,** responsables de la réalisation du changement ou du traitement de l'incident ou du problème.
-   Le **consommateur** (y compris les données associées telles que la société, le site, etc.) impacté par le changement, l'incident ou le problème.

D'autres pratiques, hors ITSM, ont également des exigences vis-à-vis du CSDM, même si elles ne sont pas forcément mises en œuvre dans ServiceNow :

-   Les **architectes d'entreprise** doivent savoir combien d'instances des artefacts de leur portefeuille sont encore déployées/utilisées.
-   Les **SecOps** ont besoin d'informations sur les vulnérabilités dans tous les environnements, et pas seulement dans les environnements de production.
-   Les équipes **DevOps** doivent pouvoir déterminer la localisation et les versions des composants déployés.
-   Les **projets** doivent savoir quels API, microservices, agents IA, etc. déployés sont disponibles et peuvent être consommés.
-   Les **responsables de la transition** doivent connaître l'état actuel et les volumes à faire migrer.
-   Les **gestionnaires d'actifs financiers** doivent savoir quels actifs/licences sont utilisés par qui et/ou lesquels peuvent être récupérés parce qu'ils ne sont plus utilisés.
-   Les **responsables Identity and Access Management** doivent savoir pour quels éléments il est (ou n'est plus) possible de demander/d'autoriser un accès.
-   Les **risk managers** doivent savoir si les configurations découvertes sont conformes aux politiques et aux baselines autorisées.
-   L'**intelligence artificielle** doit connaître les éléments pertinents de l'infrastructure IT, y compris leurs interdépendances, ainsi que qui les utilise et à quelles fins.
-   Les **responsables RH et managers opérationnels** doivent savoir quels rôles, actifs et identités ont été attribués à leurs collaborateurs.
-   Les **gestionnaires de postes de travail et terminaux utilisateurs** doivent savoir combien d'éléments de chaque âge/version sont encore en service.
-   Les **Service Delivery Managers** doivent savoir quels services ils consomment auprès de leurs partenaires.
