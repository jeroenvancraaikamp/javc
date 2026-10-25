---
title: "Aide-mémoire CSDM5"
excerpt: "CSDM5 est un modèle de données qui suscite toujours des discussions intéressantes, car chaque persona l'aborde selon sa propre perspective. Cet aide-mémoire devrait vous aider à déterminer ce qui va où, à condition de respecter les définitions et intentions de CSDM5 pour les différents artefacts."
source: "b9918cf4d921fb88"
---

CSDM5 est un modèle de données qui suscite toujours des discussions intéressantes, car chaque persona l'aborde selon sa propre perspective. Cet aide-mémoire devrait vous aider à déterminer ce qui va où, à condition de respecter les définitions et intentions de CSDM5 pour les différents artefacts. Si l'on s'y tient, il n'est que peu, voire pas du tout nécessaire de personnaliser les tables ou les relations entre les tables.  
  
Les définitions et principes suivants s'appliquent à l'ensemble de cet aide-mémoire :  

-   Les baselines sont des éléments de portefeuille conçus, acquis ou développés et documentés dans des catalogues, par exemple une « Volvo V70 ».  
    Les instances sont des éléments de configuration déployés ou livrés, par exemple cette Volvo V70 unique immatriculée XX-YYY-ZZ.
-   Chaque élément de portefeuille de baseline appartient à un seul Business Owner/Lead et à un seul Technical Owner/Lead.  
    Chaque instance de la CMDB appartient au propriétaire de l'élément de portefeuille de baseline qui contient cette instance.
-   Une relation « Contains::Contained by » est une relation un-à-plusieurs entre un élément parent et un élément enfant.  
    Un élément parent peut contenir plusieurs éléments enfants, mais un élément enfant ne peut pas être contenu par plusieurs éléments parents.
-   Une relation « Depends on::depended on by » est une relation plusieurs-à-plusieurs entre un élément parent et des éléments enfants.  
    Un élément parent peut dépendre de nombreux éléments enfants, et un enfant peut être une dépendance de nombreux éléments parents.

![](/wp-content/uploads/2026/02/CSDM5_including_rlation_labels.png)

### Business Application (baseline APM)

-   Solution à granularité grossière, gérée comme un tout
-   Peut faire partie d'une (seule) Application Platform (multi-domaines)
-   Permet zéro ou plusieurs Business Capabilities
-   Contient zéro ou plusieurs Application Components
-   Dépend de zéro ou plusieurs Service Instances
-   Possède un Business Owner (par exemple un Tribe Lead)
-   Possède un Technical/IT Owner (par exemple un Tech Lead)
-   Possède une classification CIAP et un profil de risque, tous deux revus périodiquement
-   Son architecture relève d'un seul domaine (piloté par un Domain Architect)

### Application Component (baseline DevSecOps)

-   Composant de produit numérique versionné, à granularité fine
-   Stocké dans un référentiel de gestion du code source (SCM/IAC)
-   Déployable via des pipelines CI/CD
-   Fait partie d'une seule Business Application
-   Contient zéro ou plusieurs Service Instances

### Service Instance (instance SPM)

-   Utilisée pour le développement, les tests, la recette ou la production
-   Contenue par une seule Technical Management Service Offering
-   Une ou plusieurs Business Service Offerings en dépendent
-   Une ou plusieurs Business Applications en dépendent
-   Dépend d'un ou plusieurs Configuration Items
-   Peut être l'enfant d'une autre Service Instance

### Dynamic CI Group (instance SPM)

-   Sert à regrouper des CI d'infrastructure similaires, modifiés ou mis à jour en tant que groupe
-   Toujours « Contained by » une seule Technical Management Service Offering
-   Fait référence à un ou plusieurs Configuration Items (instantané basé sur une requête)
-   Ne peut pas être relié à une Service Instance ni à un autre Dynamic CI Group
-   Également inclus (dans sa propre classe) dans la table Service Instance

### Service Delivery System, alias Configuration Item (instance CMDB)

-   est une installation ou un déploiement unique et découvrable d'un produit numérique (baseline)
-   est stable et possède un cycle de vie significatif (c'est-à-dire qu'il ne s'agit pas d'un artefact d'exécution éphémère)
-   peut être une instance découverte d'un Application Component
-   peut être relié à zéro ou plusieurs Configuration Items (types de relations divers)
-   une ou plusieurs Service Instances peuvent en dépendre
-   peut être relié à un actif acquis
-   ne peut être créé ou mis à jour que par discovery/fédération, et non par des humains
-   hérite des attributs gérés de l'élément de portefeuille qui contient ce CI

### Business Service (baseline SPM)

-   est un service défini (dans un catalogue métier/commercial)
-   est consommé par des utilisateurs métier internes et/ou externes
-   est le parent d'une ou plusieurs Business Service Offerings
-   est une feuille sous un seul nœud/une seule branche de la Service Taxonomy

### Business Service Offering (baseline SPM)

-   Est l'enfant d'un seul Service (parent)
-   Est spécifique à un produit et/ou à une région
-   Possède des engagements spécifiques (SLA)
-   Possède des abonnements/abonnés spécifiques
-   Contient zéro ou plusieurs Service Instances
-   Contient zéro ou plusieurs Dynamic CI Groups
-   Supportée FONCTIONNELLEMENT par un seul Support Group
-   Modifiée par un seul Change Group
-   Obtient les approbations de demandes et de changements d'un seul Approval Group

### Technical Management Service (baseline SPM)

-   est un service défini (dans un catalogue technique)
-   est consommé par une ou plusieurs équipes technologiques et/ou équipes DevSecOps
-   est le parent d'une ou plusieurs Technical Management Service Offerings
-   est une feuille sous un seul nœud/une seule branche de la Service Taxonomy

### Technical Management Service Offering (baseline SPM)

-   Est l'enfant d'un seul Service (parent)
-   Est spécifique à un produit et/ou à une région
-   Possède des engagements spécifiques (par exemple OLA, UC, RTO, RPO, etc.)
-   Possède des abonnements/abonnés spécifiques
-   Contient zéro ou plusieurs Service Instances ou Dynamic CI Groups
-   Supportée TECHNIQUEMENT par un seul Support Group
-   Modifiée par un seul Change Group
-   Obtient les approbations de demandes et de changements d'un seul Approval Group

### Hardware Asset (instance ITAM)

-   est un élément acquis qui est ou a été stocké ou installé
-   est fabriqué par un fabricant
-   est fourni (à une date donnée) par un fournisseur
-   est couvert par une garantie jusqu'à la date de fin de garantie
-   peut être couvert par un contrat de maintenance
-   peut être une instance d'un Product Model
-   possède un statut d'installation et un emplacement où il se trouve
-   peut être relié à un Configuration Item découvert/fédéré

### **Remarques/conseils :**

-   Les Service Instances du Service Portfolio Management (SPM) relient les instances de CI découvertes dans la CMDB aux baselines qui dépendent de ces instances de la CMDB.  
    Idéalement, les instances SPM et leurs relations sont créées et mises à jour automatiquement à partir des informations disponibles dans le CI ou dans une étiquette SVCN apposée sur le CI.
-   ChatGPT et certaines personnes se présentant comme des experts CSDM recommandent de créer des Technical Management Service Offerings spécifiques à chaque environnement. Toutefois, comme une Service Instance spécifique à un environnement ne peut être contenue que dans une seule Technical Management Service Offering, cela peut facilement entraîner des doublons.
-   Les entreprises qui distinguent la maintenance fonctionnelle de la maintenance technique peuvent souhaiter créer des Business Service Offerings pour le groupe assurant le support fonctionnel et des Technical Management Offerings pour le groupe assurant le support TECHNIQUE. Reliez les deux via la Service Instance située entre elles.
-   Si vous définissez des offerings différentes pour différents niveaux de support technique sur une même application, vous constaterez que vous ne pouvez pas créer de relations « contains::contained by » entre plusieurs offerings techniques et la même Service Instance « Application X, Production ». Remplacer la relation « contains » par plusieurs relations « depends on » n'est pas recommandé, car il n'est alors plus possible de déterminer automatiquement quelle offering s'applique lorsque « Application X, Production » tombe en panne.
-   Si vous avez deux équipes, l'une s'occupant de l'instance EMEA et l'autre de l'instance NAM d'une Business Application, vous pouvez techniquement créer des Service Instances distinctes : une pour l'instance EMEA et une pour l'instance NAM, même s'il s'agit de la même application SaaS. Pour chaque équipe, il convient de créer sa propre service offering, ses propres engagements et ses propres abonnements. Remarque : la performance du service est enregistrée au niveau de l'offering, et non au niveau de la Service Instance. Notez également que lorsqu'une « instance » est signalée comme indisponible, cela ne signifie pas que l'autre instance est automatiquement signalée comme indisponible elle aussi.
-   En raison des limitations ci-dessus, je recommande de créer une Service Instance par instance SaaS et de la faire contenir par une seule Technical Management Service Offering. Vous pouvez en outre créer plusieurs Business Service Offerings qui dépendent (N:M) de la Service Instance, une offering par région, chacune avec ses propres horaires d'ouverture, engagements et abonnements. La performance du service peut alors être enregistrée pour la business offering, tandis que la performance de la plateforme et les problèmes techniques détectés peuvent être enregistrés dans la (seule) technical service offering qui contient la Service Instance.
-   Certains modules ServiceNow ne parcourent que les relations en amont pour déterminer qui ou quoi est impacté. C'est pourquoi je relie toujours directement le service web ou la base de données découverts à la Service Instance qui en dépend. Si je ne reliais que les serveurs aux Service Instances, un problème détecté sur un SGBD ne déclencherait pas d'interruption sur la Service Instance. Cela dit, n'en faites pas trop, par exemple en reliant à la Service Instance tous les packages logiciels installés sur un serveur. Ne reliez que ce qui est pertinent.
