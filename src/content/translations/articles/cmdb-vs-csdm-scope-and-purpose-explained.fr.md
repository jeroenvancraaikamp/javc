---
title: "CMDB vs CSDM — périmètre et finalité expliqués"
excerpt: "Bien qu'on les emploie souvent indifféremment, la CMDB et le CSDM répondent à des finalités fondamentalement différentes. Les confondre est l'une des principales raisons pour lesquelles 75 % des initiatives CMDB échouent. Qu'est-ce que la CMDB ? La Configuration Management Database (CMDB) est un référentiel de données opérationnelles"
source: "615c94db809d7b2b"
---

Bien qu'on les emploie souvent indifféremment, la CMDB et le CSDM répondent à des finalités fondamentalement différentes. **Les confondre est l'une des principales raisons pour lesquelles 75 % des initiatives CMDB échouent.**

  

## Qu'est-ce que la CMDB ?

  
La **Configuration Management Database (CMDB)** est un **référentiel de données opérationnelles**.  

### Périmètre de la CMDB

  
La CMDB contient :  

  
-   Les éléments de configuration (CI) déployés
  
-   Les instances d'exécution et leurs relations techniques
  
-   Les composants d'infrastructure et de plateforme découverts et fédérés
  
-   Les instances de service et leurs dépendances
  
-   Les attributs opérationnels nécessaires aux cas d'usage ITSM, ITOM, SecOps et de gestion des risques
  

  

### Caractéristiques de la CMDB

  

  
-   Centrée sur la **réalité de l'exécution**
  
-   Alimentée principalement par la **découverte automatisée et les intégrations**
  
-   En évolution permanente
  
-   Optimisée pour **les opérations, l'analyse d'impact, la gestion des incidents, le change management et la gestion des risques**
  
-   Ne fait pas autorité pour les décisions de conception ou de portefeuille
  

  

> **La CMDB répond à la question :** « Qu'est-ce qui tourne, où, et qu'est-ce qui en dépend — en ce moment même ? »

  

## Qu'est-ce que le CSDM ?

  
Le **Common Service Data Model (CSDM)** est un **modèle de référence logique**.  

### Périmètre du CSDM

  
Le CSDM définit :  

  
-   Quels types d'objets existent (applications, services, offres, instances, produits)
  
-   Comment ces objets sont liés entre eux
  
-   À qui reviennent la propriété, la responsabilité et les engagements
  
-   Quels artefacts relèvent de la gestion de portefeuille et lesquels sont découverts à l'exécution
  

  

### Caractéristiques du CSDM

  

  
-   Stable et prescriptif
  
-   Orienté services par conception
  
-   Indépendant des outils et des méthodes de découverte
  
-   Centré sur **la gouvernance, la cohérence et une compréhension partagée**
  
-   Applicable au-delà de la CMDB (APM, ITSM, IRM, TBM, EA)
  

  

> **Le CSDM répond à la question :** « Qu'est-ce qui *devrait* exister, comment l'ensemble s'articule-t-il, et qui en est responsable ? »

  

## La différence essentielle en une phrase

  

> **Le CSDM définit la structure et les règles ; la CMDB contient les données conformes à ces règles.**

  

## Comparaison des périmètres

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Aspect | CMDB | CSDM |
| --- | --- | --- |
| Nature | Référentiel de données opérationnelles | Modèle de référence logique |
| Finalité | Visibilité opérationnelle et analyse d'impact | Cohérence structurelle et gouvernance |
| Focus | Réalité de l'exécution | Structure des services et du portefeuille |
| Fréquence de changement | Élevée (continue) | Faible (délibérée) |
| Source des données | Découverte, intégrations | Principes d'architecture et de conception |
| Propriétaire des données | Non (consomme des sources faisant autorité) | Non (définit à qui revient la propriété) |
| Public | Ops, ITSM, SecOps | Architectes, gouvernance, équipes plateforme |

  

  

## Qu'est-ce qui va où (règle empirique)

  

### Relève de la CMDB

  

  
-   Instances de service
  
-   Serveurs, conteneurs et ressources cloud déployés
  
-   Dépendances d'exécution
  
-   Logiciels et infrastructure découverts
  
-   Groupes de CI dynamiques
  

  

### Défini par le CSDM (mais instancié dans la CMDB)

  

  
-   Applications métier et techniques
  
-   Services métier et technologiques
  
-   Offres de service
  
-   Modèles d'instances de service
  
-   Modèle de propriété et de responsabilité
  

  

### Ne relève *pas* de la CMDB

  

  
-   Artefacts de conception
  
-   Pipelines CI/CD
  
-   Code source et métadonnées de build
  
-   Événements d'exécution éphémères
  
-   Fonctionnement interne des outils DevSecOps
  

  

## Pourquoi cette distinction est importante

  
Lorsque la CMDB et le CSDM sont confondus :  

  
-   Les CMDB deviennent surchargées et impossibles à maintenir
  
-   Les données de découverte perdent leur contexte
  
-   La gouvernance devient manuelle et politique
  
-   Les équipes DevOps résistent à l'intégration
  
-   Les preuves d'audit deviennent incohérentes
  

  
Lorsqu'ils sont correctement distingués :  

  
-   La découverte devient sûre et évolutive
  
-   La propriété des services est claire
  
-   L'analyse d'impact fonctionne
  
-   Les preuves de conformité et de gestion des risques s'alignent naturellement
  
-   DevSecOps et CMDB coexistent sans friction
  

  

## Le modèle opérationnel moderne

  

  
-   Le **CSDM** fournit le plan directeur stable et orienté services
  
-   La **CMDB** fournit les données dynamiques d'exécution
  
-   La découverte et la fédération maintiennent les deux alignés
  
-   Les éléments de portefeuille sont gérés ; les éléments d'exécution sont observés
