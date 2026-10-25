---
title: "Du besoin métier à la livraison technologique"
excerpt: "Le Common Service Data Model de ServiceNow (CSDM5) attire de plus en plus l'attention des dirigeants (C-Level), d'autant qu'une CMDB de qualité, au contenu exact et complet, est considérée comme un facteur clé de succès pour la mise en œuvre de DORA, SOx, SOC2 et de l'IA agentique. Les professionnels de"
source: "050c3e01c24c7a5b"
---

Le Common Service Data Model de ServiceNow (CSDM5) attire de plus en plus l'attention des dirigeants (C-Level), d'autant qu'une CMDB de qualité, au contenu exact et complet, est considérée comme un facteur clé de succès pour la mise en œuvre de DORA, SOx, SOC2 et de l'IA agentique.

Les professionnels de l'architecture, du DevOps, du SecOps, de la gestion des risques et de la sécurité utilisent souvent des normes différentes (ISO 27.000, ISO 85.000, ITIL5, TOGAF) et les définitions qui leur sont associées. Nous avons combiné le CSDM5 avec une vue en couches ArchiMate/TOGAF des Service Delivery Systems qui composent le paysage informatique type d'une entreprise, et l'avons rendue exploitable pour l'Enterprise Service Management.  

### Voici les définitions que nous utilisons pour harmoniser ces différents langages :

  
Les **Business Applications** sont des solutions orientées métier qui soutiennent des capacités, des processus ou des services métier. Elles se composent généralement de ressources applicatives, web, d'intégration et de données, déployées sur une ou plusieurs plateformes middleware. Outre les solutions développées en interne, d'autres solutions orientées métier hébergées et d'autres services numériques peuvent être consommés par les collaborateurs, les clients et les partenaires, ou intégrés à d'autres services. Ces solutions sont également enregistrées comme Business Applications.

Les solutions **Software-as-a-Service** (SaaS) de tiers sont enregistrées comme Business Applications, même lorsque l'entreprise n'a qu'une visibilité limitée, voire nulle, sur les ressources, l'infrastructure ou les composants de plateforme sous-jacents qui les supportent, et que le fournisseur gère lui-même sa propre conformité. Les solutions SaaS sont, par définition, proposées en tant que service et respectent les engagements contractuels documentés qui s'y rapportent. Les architectes modélisent les interfaces entre les applications de l'entreprise et les solutions SaaS dans l'Architecture Repository.

Les **Resources** représentent des instances stables et découvrables de **SDLC Application Components** (sous-systèmes conçus, développés, testés et intégrés). Les composants sont généralement stockés dans des dépôts de code source et sont souvent déployés via des pipelines CI/CD. Les outils d'orchestration et d'observabilité DevOps gèrent et surveillent leur comportement.

Le **Middleware** désigne les logiciels qui fournissent des services d'exécution aux applications et aux ressources, et qui s'exécutent généralement sur des Nodes physiques ou virtuels. Il s'agit par exemple de serveurs web, de serveurs d'applications, de serveurs de bases de données, de plateformes d'intégration, de plateformes de messagerie et de plateformes d'orchestration.

Une **Service Instance** représente chaque déploiement d'une Business Application. Des Service Instances distinctes sont généralement créées pour les environnements de développement, de test, d'acceptation et de production, ce qui permet de gérer et de surveiller chaque déploiement, et de le relier indépendamment à la pile technologique qui le supporte.

Les **Workplace/Productivity Services** (PC, téléphones mobiles, tablettes, etc.) sont enregistrés comme Service Offerings et non comme Business Applications. Les logiciels déployés sur les terminaux des utilisateurs finaux sont gérés au moyen des enregistrements Assets, Software Installations et Software License.

Les **Environments/Streets** sont des domaines IP généralement isolés les uns des autres et utilisés pour un objectif ou un public particulier. Par exemple, (ce qui s'exécute sur) les Nodes déployés dans l'environnement de test ne peut pas interagir avec (ce qui s'exécute sur) les Nodes déployés dans l'environnement de production. Certaines entreprises utilisent également des Streets propres à un client ou à une région.

**Les Resources, le Middleware, les Nodes et leurs dépendances (dans CSDM5 : « Service Delivery Systems ») sont automatiquement découverts, puis automatiquement enregistrés et mis à jour dans la CMDB.** Ces éléments de configuration sont reliés et mappés aux Service Instances qui en dépendent, offrant ainsi une visibilité de bout en bout sur l'architecture de la solution déployée.

Toute capacité fournie « en tant que service » est représentée par une **Service Offering**. Il s'agit par exemple d'Application Services, de Middleware Services, d'Infrastructure Services, de Workplace Services et de Corporate Services. Les Service Offerings peuvent être propres à un environnement, à une région ou à un site. Chaque Service Offering définit les engagements, les abonnements, les contacts de support, la responsabilité et les attentes de service qui lui sont associés.

![](/wp-content/uploads/2026/06/ZERO-TOUCH-CMDB-Class-Model.png)

Les **Offered Services** consommés exclusivement par l'IT sont classés comme **Technology Management Services.** Les services consommés par les utilisateurs métier, les clients ou des tiers externes sont classés comme **Business Services**.

Les **Foundational Data** sont des informations partagées utilisées dans plusieurs pratiques. Les Services, Offerings, Applications, Dynamic CI-Groups et équipements font généralement référence à des Foundational Data, par exemple pour enregistrer le propriétaire d'un actif, ses consommateurs, les groupes IT, les personnes de contact, les abonnés, les clients, les fournisseurs, les modèles de processus, les modèles de produits, etc.

Les milliers de **SDLC Application Components** héritent généralement des références fondamentales de l'application ou de la solution qui les contient. Les notations de risque des applications s'appliquent aux composants et aux instances contenus ou utilisés par l'application.  

### **ZERO-TOUCH CMDB**

  
Dans ce modèle, les Resources, le Middleware et les Nodes ne peuvent pas être créés ni mis à jour dans la CMDB par des humains. Ils ne contiennent que la réalité technique ainsi que les relations, les noms et les valeurs d'attributs découverts. En règle générale, les références aux Foundational Data ne peuvent pas être découvertes techniquement. C'est pourquoi, dans cette interprétation du CSDM, les CI de la CMDB doivent toujours être reliés, directement ou indirectement, à une Application et/ou à une Offering contenant des attributs de référence tels que « Business Owner », « IT Owner », « Support Group », « Change Group », « CAB Group », « Location », « Organization », etc. L'organisation peut suivre la structure historique « Company => Business Unit => Department » ou la structure agile moderne « Tribe/ART => Cluster/Chapter ==> DevSecOps Team/Squad ».

![](/wp-content/uploads/2026/06/CSDM5-incl-Relation-Labels.png)
