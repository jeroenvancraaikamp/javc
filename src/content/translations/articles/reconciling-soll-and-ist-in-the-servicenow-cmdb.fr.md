---
title: "Autorisé ou non ? Rapprocher SOLL et IST dans la CMDB ServiceNow"
excerpt: "La CMDB enregistre ce qui existe, pas ce qui a été approuvé. Pour voir ce qui diffère de ce qui était autorisé, il faut enregistrer séparément l'état approuvé et disposer d'une routine qui compare les deux dans les deux sens. Cet article montre comment procéder, en quatre étapes."
source: "29a240ea977ab204"
---

Chaque organisation se demande si un changement est autorisé avant sa mise en production. Beaucoup moins se demandent ensuite si ce qui tourne correspond bien à ce qui a été autorisé.

Dans ServiceNow, cette seconde question est difficile, car la CMDB est alimentée par Discovery et des intégrations : elle enregistre ce qui existe, pas ce qui a été approuvé. Comparer la CMDB à la réalité revient à comparer une observation à une observation. Pour voir ce qui diffère de ce qui était autorisé, il faut enregistrer séparément l'état approuvé, et disposer d'une routine qui compare les deux dans les deux sens. Cet article montre comment procéder, en quatre étapes, et se termine sur la manière de donner aux risk officers, aux responsables du change management, aux équipes DevOps et aux ingénieurs sécurité une vue partagée.

## Le problème : la CMDB montre ce qui est, pas ce qui était autorisé

SOLL et IST sont des mots allemands courants dans l'IT néerlandaise : la cible et le réel.

| Terme | Signification | Source dans ServiceNow |
| --- | --- | --- |
| SOLL | Ce qui doit être : changements approuvés, standards, conception, responsabilités | Demandes de changement, modèles Desired State, modèle de service, règles de réconciliation |
| IST | Ce qui est : la configuration observée | Discovery et intégrations, écrits dans la CMDB |
| Was | Ce qui était, et qui ou quoi l'a modifié | Historique des changements, source par attribut, demandes de changement clôturées |

Si quelqu'un modifie un serveur en dehors du processus, la prochaine exécution de Discovery écrase la CMDB, qui présente alors l'écart comme un fait. Si l'état approuvé n'est pas enregistré ailleurs, la preuve disparaît. Les deux dérivent à cause de changements non autorisés, de changements mis en œuvre autrement que ce qui a été approuvé, de changements approuvés jamais mis en œuvre, de CI que personne n'a demandés et de données erronées.

## Étape 1 : enregistrer ce qui doit être

« Autorisé » recouvre plusieurs réalités, donc le SOLL a plusieurs emplacements. Enregistrez chacun là où la plateforme peut le comparer.

| Type de SOLL | Où l'enregistrer |
| --- | --- |
| Changement approuvé : quel CI peut changer, quand, comment | Demande de changement : Affected CIs, fenêtre planifiée, périmètre approuvé |
| Standard permanent : à quoi un CI doit toujours ressembler | Desired State : un filtre plus un modèle avec des conditions sur les attributs et les relations |
| Structure voulue : quels CI supportent quel service | Modèle de service CSDM : Business Application, Application Service, Service Instance |
| Source faisant autorité : qui peut écrire quel attribut | Règles de réconciliation dans l'Identification and Reconciliation Engine (IRE) |
| Faits attestés : propriétaire, localisation, groupe de support | Data Certification, avec le propriétaire du CI comme attestant |

La demande de changement est la plus importante, car c'est le seul SOLL à la fois précis et lié à une fenêtre temporelle. En pratique :

- **Commencez par le périmètre.** Choisissez les classes et attributs sous contrôle, en commençant par les CI de production derrière les services critiques.
- **Faites porter au changement le détail au niveau du CI.** Exigez les Affected CIs et enregistrez les nouvelles valeurs prévues sous forme structurée. Ce dernier point est un ajout de conception, par exemple une petite table liée (CI, attribut, de, vers).
- **Enregistrez les propriétaires.** Les tâches, notifications et revues dépendent d'un propriétaire et d'un groupe de support par CI.
- **Définissez « couvert par un changement ».** Par exemple : le CI est un Affected CI d'un changement à l'état Implement, dans sa fenêtre planifiée. Sans cela, personne ne peut dire ce que signifie « non autorisé ».

## Étape 2 : savoir ce qui est, et ce qui était

Une comparaison ne vaut que ce que vaut son côté IST, qui doit être récent, attribuable et historisé :

- **Récent.** Discovery doit couvrir les CI du périmètre assez souvent pour votre délai de détection. Un CI qui n'a pas été vu récemment est une lacune de l'IST, pas une « absence de changement ». Surveillez la santé de Discovery aussi attentivement que la comparaison.
- **Attribuable.** Avec des règles de réconciliation, chaque attribut a un seul rédacteur faisant autorité. Un écart sans rédacteur connu est le signe le plus net d'un changement non autorisé ou d'une intégration non maîtrisée.
- **Historisé.** Discovery « guérit » la CMDB, ce qui efface la valeur précédente. Sans historique, vous voyez qu'une valeur est fausse, mais pas quand elle a changé, et vous ne pouvez donc pas la relier à une fenêtre de changement.

### Voir les changements réels quand chaque CI est redécouvert chaque jour

Si les CI sont redécouverts quotidiennement, la date de dernière découverte change chaque jour sur chaque CI. N'utilisez pas « mis à jour le » pour repérer les changements réels. L'audit de la plateforme n'enregistre un champ que lorsque sa valeur change ; le volume suit donc les changements réels plus ce battement de cœur. Avec des centaines de milliers de CI répartis dans des centaines de tables, tout suivre n'est ni nécessaire ni abordable : définissez donc le périmètre par niveaux :

| Niveau | Quoi | Comment détecter le changement | Historique |
| --- | --- | --- | --- |
| 1 | Classes critiques, avec quelques dizaines d'attributs et de relations contrôlés | Une source de changement, ci-dessous | Oui |
| 2 | Autres CI qui vous importent | Les audits Desired State comparent l'état actuel à la règle | Inutile |
| 3 | Le reste | Hors périmètre | Aucun |

Pour le niveau 1, choisissez une source de changement par groupe de CI :

- **Événements de changement non autorisé, pour les CI des application services.** L'événement est la trace du changement, aucune requête d'historique n'est donc nécessaire. Vérifiez que la date de découverte quotidienne ne compte pas comme un changement, et quelles classes figurent dans la liste autorisée, car cette liste définit votre périmètre.
- **Un journal de changements allégé,** alimenté par une business rule ou un flow sur les attributs contrôlés : CI, attribut, ancienne valeur, nouvelle valeur, source, horodatage.
- **Une empreinte quotidienne :** un hash par CI portant sur les attributs contrôlés et les éléments liés, stocké uniquement lorsqu'il change.
- **La table d'audit de la plateforme, uniquement pour les questions portant sur un seul CI.** Elle est volumineuse, lente pour les requêtes sur l'ensemble du parc et pleine d'entrées de battement de cœur. Si vous l'utilisez, cessez d'auditer le champ de dernière découverte.

Mesurez d'abord le volume sur un pilote. Deux limites demeurent : avec une découverte quotidienne, un changement effectué puis annulé entre deux exécutions reste invisible, et l'heure enregistrée est celle de la découverte ; utilisez donc les horodatages sources, comme une date d'installation, lorsqu'ils existent.

## Étape 3 : trouver la différence

La comparaison s'effectue dans les deux sens : la réalité qui n'a pas été autorisée, et l'autorisation qui n'est pas devenue réalité. Six cas couvrent l'ensemble.

| Cas | Ce que vous voyez | Classification |
| --- | --- | --- |
| 1 | L'IST est égal au SOLL | Conforme |
| 2 | L'IST a changé, et un changement actif couvre le CI | Changement en cours ; le SOLL est mis à jour à la clôture |
| 3 | L'IST a changé, aucun changement ne couvre le CI | Changement non autorisé |
| 4 | Un changement couvre le CI, mais l'IST diffère de ce qui a été approuvé | Mise en œuvre divergente |
| 5 | Un changement est clôturé, mais l'IST ne montre aucun changement | Autorisé mais non mis en œuvre |
| 6 | Un CI existe sans propriétaire, service, demande ni changement | CI non enregistré |

Les cas 4 et 5 sont ceux que les équipes oublient, car rien ne casse quand un changement approuvé n'est jamais réalisé. Trois détections couvrent les six cas :

1. **Détection des changements non autorisés (pilotée par événements).** Lorsque Discovery voit changer une propriété d'un CI, le système vérifie les classes autorisées, la période d'ignorance des notifications et si une demande de changement active couvre le CI. Si ce n'est pas le cas, il lève un événement ci.change.unplanned et, si le traitement des événements est activé, crée un changement Emergency signalé comme non autorisé ([documentation](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)). Elle nécessite l'intégration Service Mapping, ne vérifie que les CI des application services, et le traitement des événements est désactivé par défaut.
2. **Audits Desired State (planifiés).** Un filtre, un modèle avec les attributs et relations attendus, et un audit qui détaille les CI en échec et génère des tâches de suivi ([documentation, Zurich](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)). Utilisez-le pour les règles permanentes et pour les CI hors application services.
3. **Vérification changement-vers-IST (une conception à ajouter).** Une comparaison planifiée qui repère les changements de l'IST en dehors de toute fenêtre de changement, ainsi que les changements clôturés dont les Affected CIs ne montrent pas les valeurs prévues après la découverte post-implémentation. Ce sont les cas 3, 4 et 5.

<figure>
  <img src="/images/reconciling-soll-and-ist-diagram.svg" alt="Schéma : le SOLL et l'IST alimentent trois détections, et chaque constat aboutit dans une liste unique de différences" />
  <figcaption>Le SOLL et l'IST alimentent les trois détections, et chaque constat aboutit dans une liste unique classée selon les six cas.</figcaption>
</figure>

## Deux cas particuliers

### Changements logiciels sur un serveur, et non le serveur lui-même

Un paquet mis à jour sur un serveur Windows modifie un enregistrement lié, pas les attributs propres du serveur : une comparaison sur les attributs du serveur ne voit donc rien. Comparez au niveau de l'hôte et jugez selon le risque : un correctif éditeur qui comble une vulnérabilité est un écart qui réduit le risque, alors qu'un outil d'accès à distance non approuvé mérite l'attention même si l'enregistrement du serveur semble intact.

Enregistrez le SOLL logiciel sous forme de règle, non de versions exactes : par rôle de serveur, les produits approuvés, l'éditeur, la version minimale et le chemin de mise à jour, sous forme de modèle Desired State. Évaluez chaque changement logiciel dans l'ordre : couvert par un changement actif, conforme à la ligne de base, sinon un constat assorti d'un score de risque.

| Changement observé | Traitement |
| --- | --- |
| Version plus récente d'un produit approuvé, de l'éditeur approuvé | Dérive attendue : enregistrer à titre d'information, et laisser un changement standard couvrir les cycles de correctifs |
| Version hors règle (rétrogradation, version majeure non approuvée) | Constat à examiner : une rétrogradation peut réintroduire une vulnérabilité connue |
| Produit approuvé supprimé ou désactivé (par exemple un agent de sécurité) | Priorité haute |
| Nouveau produit absent de la ligne de base | Non autorisé ; priorité plus élevée pour les outils avec accès à distance, droits d'administrateur ou ports ouverts |

Comparez sur le produit, l'éditeur et la version normalisés, et consolidez les constats par hôte, car un cycle de correctifs touche des dizaines de paquets par serveur.

### Quand ceux qui enregistrent le SOLL ne produisent pas l'IST

Les risk officers et les architectes enregistrent le SOLL, tandis que les développeurs produisent l'IST à un niveau de détail très fin, comme les pods de conteneurs. Les premiers ne peuvent pas juger chaque pod, et les seconds ne devraient pas autoriser leur propre travail. Enregistrez donc le SOLL au niveau que chaque groupe peut juger, et laissez le pipeline porter le détail :

- **Politique** (risk officers, architectes) : classes de risque, registres autorisés, paramètres interdits, frontières de service.
- **Garde-fous** (équipe plateforme) : images de base approuvées, correspondance namespace-service, règles d'admission.
- **État déclaré** (développeurs) : manifestes, digests d'images et nomenclature (bill of materials) par release.

Faites de la release l'unité autorisée, et non du pod : le pipeline enregistre chaque release comme un changement, avec digests, preuves de test et approbations. Définissez « non autorisé » comme une provenance manquante : une charge de travail sans trace dans le pipeline, un registre non approuvé, un digest différent de celui de la release, ou un paramètre interdit. Acheminez les constats vers l'équipe de développement propriétaire du namespace, donnez aux risk officers des agrégats et les exceptions, et exigez une revue par les pairs dans le pipeline, afin que l'approbation soit indépendante de l'implémenteur. Ce que votre instance peut comparer dépend de l'utilisation ou non de la découverte Kubernetes et de l'intégration DevOps.

## Étape 4 : réconcilier

Chaque différence se clôture par l'une de quatre décisions, prises par le propriétaire du CI, et non par l'outil :

| Décision | Quand | Ce que vous faites |
| --- | --- | --- |
| Corriger la réalité | Le changement ne doit pas subsister | Revenir en arrière via un incident ou un changement correctif ; Discovery confirme l'IST |
| Approuver rétroactivement | Le changement est acceptable mais n'a pas été autorisé | Approuver le changement Emergency après examen, réaliser la revue post-implémentation, mettre à jour le SOLL |
| Corriger les données | La CMDB est fausse, pas la réalité | Corriger le pattern de découverte, la source ou la règle ; ne pas modifier la valeur à la main |
| Accepter une exception | Un écart connu est toléré pour un temps | Enregistrer le propriétaire, la raison et la date d'expiration |

Un changement jamais mis en œuvre est soit terminé, soit annulé avec une trace indiquant que le SOLL ne tient plus. Un CI non enregistré est enregistré ou supprimé. Quatre règles garantissent l'honnêteté de la boucle :

- **Ne copiez jamais l'IST dans le SOLL automatiquement.** Cela rendrait chaque écart autorisé dès l'exécution suivante.
- **Un enregistrement d'audit par différence,** avec la remédiation qui y est liée.
- **Clôturer par une nouvelle mesure :** la découverte ou l'audit suivant montre l'IST égal au SOLL, ou une exception approuvée s'applique.
- **Limiter dans le temps et réinjecter.** Escaladez vers le Change Advisory Board (CAB) lorsque le délai expire, et traitez les différences récurrentes comme une lacune de processus.

## Une seule vérité, plusieurs points de vue

La même différence signifie autre chose pour chaque partie prenante. Si chaque groupe tient sa propre liste, les listes se contredisent et personne n'a confiance en aucune.

| Partie prenante | Ce que signifie une différence | Question à laquelle répondre |
| --- | --- | --- |
| Risk officer | Un risque non maîtrisé, une défaillance possible d'un contrôle | Combien d'écarts non autorisés sont ouverts dans les services critiques, et depuis combien de temps ? |
| Change manager | Le processus a été contourné, ou un changement approuvé n'a pas été réalisé | Quels écarts n'ont aucun changement, et quels changements clôturés n'ont pas été vérifiés ? |
| Ingénieur DevOps | Dérive par rapport à l'état déclaré | Qu'est-ce qui diffère pour mon service, et que dois-je faire ? |
| Ingénieur sécurité | Une surface d'attaque plus grande | Quels hôtes portent des éléments non approuvés ou non protégés, classés par exposition ? |
| Propriétaire d'actifs | Moins de maîtrise de ses actifs | Quelles différences attendent ma décision ? |
| Auditeur | Preuves manquantes | Pouvez-vous montrer la détection, la décision et la clôture pour chaque écart ? |

Une source unique de vérité signifie ici un seul endroit où poser la question, avec une origine traçable pour chaque fait, et non une seule base de données. Quatre principes y mènent :

1. **Un enregistrement de différence partagé.** Normalisez la sortie des trois détections en un seul type d'enregistrement : CI, service, cas (1 à 6), score de risque, statut, décision, propriétaire, lien vers le changement et horodatages. ServiceNow standard produit des enregistrements distincts ; c'est donc un ajout de conception qui y renvoie.
2. **Un vocabulaire et un score de risque uniques.** Les mêmes six cas, niveaux de gravité, statuts et décisions pour tous. Construisez le score à partir de la criticité du service, du type d'écart, de l'exposition (par exemple les vulnérabilités ouvertes) et de l'ancienneté.
3. **Joindre sur l'identité du CI et la hiérarchie des services** (Business Application, Application Service, CI), afin qu'un risk officer et un ingénieur DevOps voient le même constat à des niveaux différents.
4. **Une vue et une action par rôle, pas une copie,** avec les preuves conservées dans l'enregistrement pendant la période d'audit.

La tension entre la vitesse DevOps et la maîtrise des risques se résout dans la couche de politique, par la ligne de base approuvée et les changements standard pré-approuvés, et non au cas par cas. Lorsque les groupes ne sont pas d'accord, la ligne de base tranche et le processus d'exception consigne tout écart.

## Pour démarrer

Construisez le contrôle en quatre étapes, chacune utile en soi :

1. **Fondation :** périmètre, responsabilités, définition de « couvert par un changement » et Affected CIs obligatoires.
2. **Détecter :** activer la détection des changements non autorisés, y compris le traitement des événements, et lancer les premiers audits Desired State.
3. **Vérifier :** ajouter le contrôle changement-vers-IST et une découverte post-implémentation, afin que les cas 4 et 5 deviennent visibles.
4. **Réconcilier et rendre compte :** le modèle de décision, les délais, les exceptions et les indicateurs.

Donnez un propriétaire à chaque élément : le configuration manager possède les registres SOLL, le propriétaire du CI décide pour chaque différence, le change manager et le CAB examinent les changements non autorisés, et le platform owner assure la détection et la couverture de Discovery. Suivez quelques indicateurs : la part des CI du périmètre dotés d'un propriétaire, d'un service et d'un modèle ; les changements non autorisés par période ; la part des changements clôturés vérifiés dans l'IST ; le délai entre détection et clôture ; et les exceptions ouvertes au-delà de leur expiration, qui doivent être à zéro. Pour un audit SOC 2 Type II, cet enchaînement constitue la preuve : la comparaison doit donc tourner en continu et son résultat doit être conservé.

Pièges à éviter :

- Commencer avec toutes les classes et tous les attributs, ou suivre l'historique de chaque attribut sur chaque table : c'est coûteux et surtout du bruit.
- Activer la détection mais laisser le traitement des événements désactivé, si bien que rien n'est créé.
- Traiter la CMDB comme le SOLL, ce qui rend la comparaison circulaire.
- Se reposer uniquement sur la fonctionnalité standard, qui couvre les CI des application services et les changements visibles par Discovery.
- Réconcilier en écrasant le SOLL par l'IST.

## Sources et notes

- [Unauthorized change request, documentation ServiceNow](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)
- [Desired State, documentation ServiceNow (Zurich)](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)

Ces deux pages décrivent les fonctionnalités standard. Les valeurs prévues sur le changement, la comparaison changement-vers-IST, l'enregistrement de différence partagé, le journal de changements et l'empreinte, ainsi que l'enregistrement d'exception sont des recommandations de conception, et non des fonctionnalités standard. Vérifiez les paramètres d'audit, la gestion des actifs logiciels, Vulnerability Response, la découverte Kubernetes et l'intégration DevOps sur votre propre instance.
