---
title: "Gestion des changements et de la dérive en 2025"
excerpt: "Malgré les progrès rapides du cloud computing, du DevOps, de l'automatisation et de l'Infrastructure-as-Code, de nombreuses organisations se heurtent encore à une question fondamentale : qu'est-ce qui constitue réellement un « changement » en 2025 — et qu'est-ce qui n'en est pas un ? Toute dérive détectée doit-elle être gérée via le change management ? Une mauvaise classification"
source: "c0521e5c78a2ac4a"
---

Malgré les progrès rapides du cloud computing, du DevOps, de l'automatisation et de l'Infrastructure-as-Code, de nombreuses organisations se heurtent encore à une question fondamentale :

**Qu'est-ce qui constitue réellement un « changement » en 2025 — et qu'est-ce qui n'en est pas un ? Toute dérive détectée doit-elle être gérée via le change management ?**

Une mauvaise classification entraîne une charge de travail inutile pour les change managers, des frictions pour les équipes d'ingénierie et une moindre lisibilité opérationnelle. À l'inverse, une gouvernance insuffisante engendre un risque inacceptable. Le change management moderne doit donc trouver un juste équilibre entre rapidité et contrôle, en s'appuyant sur des critères de décision clairs et en rattachant chaque activité au domaine de gouvernance ou technologique approprié. Cet article résume les bonnes pratiques actuelles et propose des conseils concrets aux équipes IT, aux architectes et aux responsables des opérations.

## 1\. La finalité première du change management n'a pas changé

Le change management existe toujours pour :

-   Maîtriser et réduire les risques avant toute modification en production
-   Garantir la visibilité, la coordination et la communication
-   Assurer la responsabilité et la traçabilité
-   Préserver la stabilité des services critiques pour l'activité

Ce qui a changé, c'est l'environnement dans lequel ces objectifs doivent être atteints.  
Les plateformes modernes génèrent chaque jour des milliers d'ajustements automatiques.  
Vouloir tous les gouverner au travers du module Change n'est ni réalisable ni utile.

## 2\. Qu'est-ce qu'un changement ?

Un « changement » est toute modification planifiée susceptible d'affecter de manière significative :

-   Le comportement du service ou l'expérience utilisateur
-   Les données de production ou l'intégrité des données
-   La stabilité ou les performances de la plateforme
-   La posture de sécurité ou la conformité réglementaire
-   Les services interconnectés ou les dépendances techniques

Exemples d'activités relevant du change management :

-   Modifications de fonctionnalités ou de logique applicatives
-   Modifications de contrats d'API
-   Mises à jour de schémas de base de données
-   Changements réseau, pare-feu, routage ou DNS
-   Ajustements de rôles et de politiques IAM
-   Mises à niveau d'infrastructure ou de clusters
-   Modifications des contrôles de sécurité ou des configurations de supervision

Ces activités comportent un risque inhérent et doivent suivre un processus d'approbation maîtrisé.

## 3\. Ce qui n'est (plus) un changement

De nombreuses activités opérationnelles qui nécessitaient autrefois une approbation ne répondent plus aux critères  
du change management. Notamment :

-   L'élasticité du cloud et l'autoscaling (Kubernetes HPA/VPA, autoscaling de VM)
-   Les exécutions de pipelines CI/CD (déploiements selon des modèles pré-approuvés)
-   Les ré-applications IaC lorsque le modèle n'a pas changé
-   Le déploiement de logiciels sur les postes via Intune, SCCM ou MDM
-   Les opérations de maintenance du fournisseur cloud
-   Les mécanismes de failover, de haute disponibilité et d'auto-réparation
-   Les mises à jour de signatures des outils de sécurité
-   Les processus d'exécution tels que l'indexation ou la mise en cache

Ces activités sont régies par les politiques des plateformes et les cadres opérationnels,  
et non par le change management.

## 4\. Standard changes : la rapidité sous contrôle

Les standard changes offrent un moyen structuré d'accélérer la livraison  
tout en maintenant la gouvernance. Un standard change est :

-   Pré-approuvé
-   Documenté
-   À faible risque
-   Reproductible
-   Souvent automatisé

Exemples typiques :

-   Provisionnement de VM à partir de modèles approuvés
-   Cycles de patching de routine
-   Renouvellements automatisés de certificats
-   Déploiements CI/CD via des pipelines verrouillés

Approuver le modèle une seule fois est bien plus efficace que d'approuver chaque exécution individuellement.

## 5\. Gouvernance : qu'est-ce qui va où ?

Il est essentiel d'affecter clairement chaque information au bon système de référence.

### Change management

-   Changements de production planifiés et porteurs de risque
-   Plans de déploiement, approbations, plans de retour arrière
-   Analyse d'impact, services concernés, calendrier

### Plateformes CI/CD et DevOps

-   Code source
-   Journaux de build et de déploiement
-   Définitions de pipelines
-   Résultats de tests et d'analyses

### IaC et automatisation de la configuration

-   Définitions de l'état souhaité
-   Mises à jour de modèles
-   Journaux d'exécution
-   Réconciliation GitOps

### CMDB et ITOM

-   État réel à l'exécution
-   Topologie des services et dépendances
-   Configuration découverte

### Architecture d'entreprise et portefeuille

-   Feuilles de route
-   Standards et modèles
-   Alignement des investissements et de la demande

Cette séparation des responsabilités améliore la traçabilité, l'auditabilité et la lisibilité opérationnelle.

## 6\. La dérive : un signal opérationnel, pas un changement

Une dérive se produit lorsque la configuration réelle s'écarte de la configuration souhaitée.  
Elle est détectée par les moteurs IaC, les outils de gouvernance cloud et les mécanismes de conformité ITOM.

Une dérive ne nécessite pas en soi un changement. Seule une remédiation présentant un risque pour la production  
doit être gouvernée par le change management.

Exemples nécessitant un changement :

-   Annulation de modifications non autorisées du pare-feu
-   Correction d'une dérive des privilèges IAM
-   Rétablissement de configurations non sécurisées

Exemples ne nécessitant pas de changement :

-   Auto-remédiation GitOps/IaC
-   Écarts portant uniquement sur les métadonnées
-   Ajustements opérationnels sans risque

Si la dérive révèle un modèle d'état souhaité obsolète ou incorrect, la correction  
relève de la conception (Architecture) ou de la livraison (Build & Integrate), et non  
du change management — même si le déploiement du modèle mis à jour nécessite bien une gouvernance.

## 7\. Comprendre où se détermine le « COMMENT »

L'un des malentendus les plus fréquents consiste à croire que le change management définit la manière dont le travail sera réalisé.  
Ce n'est pas le cas.

Le « COMMENT » se détermine progressivement :

-   **Demand Management** → Pourquoi nous faisons quelque chose, périmètre de haut niveau
-   **Architecture** → Approche de solution initiale et choix de la plateforme
-   **Delivery / Story Management** → La mise en œuvre détaillée  
    (API, modèles de données, IaC, pipelines, stratégie de test)
-   **Change management** → Comment le déploiement en production se fera en toute sécurité
-   **Opérations** → Comportement à l'exécution, surveillance de la dérive et performance des services

Chaque étape a ses propres responsabilités et livrables. La clarté à ce niveau réduit les reprises,  
accélère la livraison et améliore la gouvernance.

## 8\. Communiquer en dehors du change management

Toutes les modifications ne nécessitent pas un enregistrement de changement, mais beaucoup exigent tout de même une communication,  
en particulier lorsque les attentes ou le comportement opérationnel risquent d'être affectés.

Par exemple :

-   Ajustements de feature flags
-   Déploiements canary
-   Mises à jour de pipelines ou d'automatisations
-   Changements d'environnements internes
-   Réglages du comportement à l'exécution

Une communication efficace réduit les incidents et évite les escalades inutiles.

## Conclusion

Le change management moderne n'a pas pour but de ralentir la livraison ; il vise à garantir que les changements porteurs de risque  
soient introduits en production de manière sûre et prévisible.

Les organisations qui réussissent en 2025 :

1.  Ne gouvernent que ce qui comporte réellement un risque pour la production.
2.  Placent l'information dans le bon système de référence.
3.  Adoptent l'automatisation lorsque les modèles sont éprouvés et sûrs.
4.  Traitent la dérive comme une question opérationnelle, et non de gouvernance.
5.  Veillent à ce que chaque étape du cycle de vie joue pleinement son rôle dans la définition du « COMMENT ».
6.  Communiquent de manière proactive, même lorsque le change management n'intervient pas.

Bien mis en œuvre, le change management devient un mécanisme de sécurité léger et efficace qui soutient les pratiques d'ingénierie modernes au lieu de les entraver.
