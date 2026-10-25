---
title: "Quand la CMDB est-elle « terminée » ?"
excerpt: "Traditionnellement, une CMDB est un inventaire des actifs IT de l'entreprise, avec leurs caractéristiques et leurs dépendances. Certains affirment qu'une CMDB est « terminée » lorsque tous les actifs IT et leurs dépendances sont enregistrés et maintenus. C'est pourtant inexact. Même par"
source: "190cd16695a9c40f"
---

Traditionnellement, une CMDB est un inventaire des actifs IT de l'entreprise, avec leurs caractéristiques et leurs dépendances. Certains affirment qu'une CMDB est « terminée » lorsque tous les actifs IT et leurs dépendances sont enregistrés et maintenus. C'est pourtant inexact. Même par le passé, on n'enregistrait pas dans la CMDB tout ce qui existait. Aujourd'hui, les actifs sont devenus éphémères, élastiques et granulaires, ce qui rend impossible leur suivi en temps réel.

La CMDB est désormais un référentiel des actifs pertinents et stables, avec leurs attributs et leurs dépendances. Son contenu provient de sources de données de confiance, d'outils de gestion d'éléments (element managers) et de la découverte automatisée. Sa finalité s'est élargie : d'un simple inventaire, elle est devenue une source d'information de référence pour la gestion du cycle de vie et l'analyse automatisée des risques et des impacts.

La CMDB coexiste avec les outils DevSecOps de CI/CD, d'observabilité et d'orchestration, qui gèrent et suivent en temps réel des actifs IT de plus en plus granulaires. Certaines pratiques IT utilisent les données de la CMDB, tandis que d'autres s'interfacent directement avec les outils DevSecOps. De plus en plus, les actifs sur lesquels les entreprises enregistrent leurs risques et leur conformité résident dans la CMDB. Certaines entreprises enregistrent également dans leur CMDB leurs artefacts métier et d'architecture (par exemple processus métier, capacités, applications, objets d'information et dépendances). Les objectifs, initiatives, projets, budgets, thèmes et epics peuvent eux aussi être stockés dans la CMDB. Bien que l'infrastructure soit de plus en plus achetée ou fournie en tant que service (cloud), pour de nombreuses entreprises, la CMDB reste l'inventaire principal des actifs acquis. La gestion de l'IT et la gestion de l'OT convergent vers une gestion de la technologie (Technology Management).

> **À l'heure actuelle, il n'existe aucune définition standard et universelle de la CMDB ni de ce qu'elle doit contenir. Chacune des pratiques de référence (par exemple TOGAF, IT4IT, ITIL, ISO 85K/27K, etc.) utilise sa propre définition et son propre langage. Ce sont les cas d'usage à prendre en charge qui déterminent ce qui doit être enregistré dans la CMDB, et cela varie d'une entreprise à l'autre.**

Il est très probable que, **d'ici la fin de cette décennie,** chaque pratique de gestion enregistrera et maintiendra une partie de l'écosystème technologique de l'entreprise, et mettra ces informations à la disposition de systèmes et d'agents d'IA qui les corréleront, les réconcilieront et les exploiteront. La CMDB traditionnelle évoluera vers un écosystème plus large d'artefacts de conception (design-time) et d'exécution (run-time), au service de différents types d'interactions et de flux. Le succès de cet écosystème dépendra de la gouvernance des dépendances et des chevauchements entre les différentes pratiques.

**Pour l'instant**, je considère la CMDB comme le référentiel de tout ce qui est pertinent, stable et détectable, permettant divers cas d'usage dans l'ensemble des pratiques de gestion. La CMDB doit pouvoir apporter des réponses (automatisées) à des questions telles que :

-   Qui et quoi peut être impacté si (quelque chose dans/sur) cet élément tombe en panne ?
-   Si les abonnés rencontrent des problèmes avec cette offre, qu'est-ce qui pourrait être en panne ?
-   Si ce produit (ou cette version de ce produit) n'est plus supporté, quelle quantité de quoi devons-nous remplacer ou mettre à niveau, et qui est impacté ?
-   Quelles solutions d'autres équipes s'interfacent avec mes solutions ? Qui sont mes parties prenantes ?
-   Qui doit traiter cette vulnérabilité détectée sur cet élément ?
-   Combien en avons-nous, et où se trouvent-ils ?
-   Combien de licences dois-je payer pour ce produit ?
-   À quoi sert cet élément, qui l'utilise, et qui le maintient ou en est propriétaire ?
-   Qu'est-ce qui a été créé, modifié ou supprimé depuis hier et qui est pertinent ?
-   Par quels changements cet élément a-t-il été affecté ?
-   Combien d'incidents ont été enregistrés sur cet élément ce mois-ci ?
-   Combien de vulnérabilités ouvertes existent sur cet élément ?
-   Quels éléments, de quel type, cette équipe possède-t-elle ou gère-t-elle ?

### La CMDB est « terminée » lorsque le public visé peut y trouver des réponses correctes, complètes et pertinentes aux questions ci-dessus

Les maîtres-mots sont ici la qualité et la pertinence des données. C'est-à-dire :

-   Aucun doublon, sauf s'il s'agit d'éléments différents portant le même nom.
-   Les valeurs d'attributs et les relations entre éléments sont renseignées, et le contenu est correct : il reflète la réalité.
-   Couverture : tous les éléments du périmètre sont enregistrés.
-   Si plusieurs sources fournissent le même élément, c'est la source la plus pertinente qui met à jour l'élément dans la CMDB.
-   Masquer les détails granulaires non pertinents dans les réponses aux questions de haut niveau.
-   La CMDB doit contenir des empilements verticaux, du service ou de la solution jusqu'à ses instances et à la technologie sous-jacente dont elle dépend.
-   La CMDB doit contenir les dépendances horizontales entre les éléments qui dépendent les uns des autres (ou qui s'interfacent entre eux).
-   Les éléments qui n'existent que quelques minutes ou quelques heures n'ont pas leur place dans la CMDB ; ils sont enregistrés et gouvernés dans les outils DevSecOps.

La CMDB n'est clairement pas correctement « terminée » dans les situations suivantes, données à titre d'exemple :

-   Vous détectez une vulnérabilité, mais ne parvenez pas à déterminer automatiquement à quelle équipe elle doit être assignée.
-   Vous souhaitez mettre à jour un serveur, mais ne savez pas qui doit être informé de l'impact potentiel.
-   Une machine a été créée en production, mais vous n'arrivez pas à savoir à quoi elle sert.
-   Une base de données signale une corruption, mais vous ne savez pas quelles applications accèdent à ses données.
-   Votre entreprise a une application en production, mais vous ne savez pas de quelle technologie elle dépend.
-   Votre interface a cessé de fonctionner parce que le certificat PKI a expiré, et vous ne l'avez jamais vu venir.
-   Vous souhaitez imputer le coût de l'infrastructure à l'équipe DevSecOps, mais la CMDB ne vous permet pas de savoir quelle équipe utilise quelles VM.
-   Votre fournisseur vous indique que vous avez trois fois plus de déploiements sous licence que ce qui est enregistré dans la CMDB.
-   Quelqu'un a modifié un paramètre de pare-feu, provoquant une faille de sécurité passée inaperçue.
-   Votre fournisseur vous annonce que la version 2016 ne sera plus supportée à partir du 1er janvier, mais vous n'avez aucune idée de l'impact possible.
-   Vous avez un projet de remplacement de tous les téléphones de plus de 3 ans, mais vous ne savez ni où ils se trouvent ni qui les utilise.
-   Votre auditeur vous signale que vous n'êtes pas conforme à SOX, SOC2, DORA et NIS2.
-   La communauté ITSM se plaint de ne pas pouvoir rattacher ses incidents ou changements à certaines des offres, instances ou CI impactées.
-   Lorsqu'une part importante des applications ne dispose d'aucune dépendance d'infrastructure.  
    

## Comment bien faire les choses ?

-   **Planifiez avant de commencer**

-   Obtenez l'adhésion de la direction (C-Level) à ce que vous comptez faire (sans leur adhésion : allez plutôt jouer au golf...)
-   Adoptez et utilisez des modèles de données standards du marché, tels que TBM, CSDM, etc.
-   Définissez ce dont vous avez besoin, où vous pouvez l'obtenir et par quel mécanisme
-   Obtenez et gérez les prérequis
-   Documentez les parties prenantes, les équipes et les propriétaires de services/produits.
-   Définissez, faites valider et maintenez une feuille de route pour les intégrations de la CMDB.

-   **Définissez et maintenez les données fondamentales**

-   Récupérez les données utilisateurs/organisation depuis les RH/l'IAM, de préférence via une interface
-   Récupérez les données fournisseurs/clients/contrats depuis l'ERP, de préférence via une interface
-   Autorisez l'accès à vos données via la gestion des identités et des accès (IAM)

-   **Développez et entretenez la connaissance de la CMDB et de ses données.**

-   Lancez un espace de stockage numérique/une base de connaissances où chacun peut trouver l'information
-   Partagez les concepts et les standards du marché
-   Partagez et maintenez le modèle de données
-   Maintenez la documentation technique

-   Intégrations techniques
-   Paramètres de réconciliation

-   Publiez les réalisations et les bénéfices obtenus

-   **Mettez en œuvre (la gestion du) portefeuille de produits/services technologiques**
    

-   Définissez des modèles pour les solutions/services (à enregistrer)
    
-   Formez les propriétaires à la manière d'enregistrer et de maintenir leurs solutions/services, et à l'endroit où le faire
-   Faites définir par les propriétaires leurs solutions/services, y compris leurs évaluations
-   Assurez-vous que toutes les applications, tous les services et toutes les offres ont un propriétaire.

-   **Définissez, gouvernez, auditez et améliorez les processus**

-   Désignez un propriétaire de processus responsable (Accountable).
-   Mettez en place un conseil de processus, présidé par le propriétaire de processus.
-   Définissez le processus, les rôles, les matrices RACI, les instructions de travail, les FAQ, les QRC et le matériel de formation
-   Attribuez les rôles du processus à des personnes et formez-les/certifiez-les
-   Définissez et mettez en place les instances de gouvernance (comités de pilotage, canaux d'escalade, etc.)
-   Accompagnez l'organisation du processus durant les premiers mois suivant le lancement

-   **Automatisez l'alimentation et la mise à jour de la partie détectable de la CMDB**

-   Livrez les intégrations conformément à la feuille de route convenue
-   Collectez les informations de plusieurs sources et réconciliez-les avant de les insérer dans la CMDB.
-   Utilisez les intégrations Out of the Box plutôt que des personnalisations maison
-   Dans la mesure du possible, reliez automatiquement le contenu détectable aux CI physiques
-   Dans la mesure du possible, reliez automatiquement le contenu détectable aux instances du service proposé

-   **Enregistrez les bureaux, les data centers, les emplacements, les racks et les équipements physiques qu'ils contiennent**

-   Définissez les services IAAS/DCAAS, y compris leurs engagements, leurs abonnements et leur propriété
-   Enregistrez les actifs physiques, y compris leurs emplacements et leurs utilisateurs/consommateurs
-   Reliez les actifs physiques aux CI opérationnels et inversement
-   Générez les instances de service et reliez-les aux services IAAS/DCAAS proposés
-   Mettez en œuvre le processus de gestion des actifs, y compris ses interfaces avec les processus achats, juridique et comptabilité financière
-   Mettez en place un processus périodique d'audit et de vérification des actifs.
-   Assurez-vous que tous les actifs ont un propriétaire valide.
