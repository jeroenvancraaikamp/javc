---
title: "Business Capabilities pour le domaine Enterprise Support"
excerpt: "En fin d'année, certains regardent en arrière et, surtout, d'autres regardent vers l'avenir. J'ai fait les deux. En regardant en arrière, j'ai remarqué que beaucoup se plaignaient de ne pas obtenir un bon rapport qualité-prix de leurs investissements IT4IT. Après deux décennies, Gartner a cessé de publier le"
source: "e67b5e029c99e0fa"
---

En fin d'année, certains regardent en arrière et, surtout, d'autres regardent vers l'avenir. J'ai fait les deux.

En regardant en arrière, j'ai remarqué que beaucoup se plaignaient de ne pas obtenir un bon rapport qualité-prix de leurs investissements IT4IT. Après deux décennies, Gartner a cessé de publier le Magic Quadrant des outils ITSM. Le Configuration Management (en tant que processus de maintien du contenu de la CMDB) est désormais rarement effectué manuellement ou encadré par le Change Management. Le contenu de la CMDB est au contraire de plus en plus maintenu par la découverte (discovery) et la fédération : la CMDB « zero-touch » est devenue la norme. Lorsque le code est aujourd'hui généré, intégré, testé et déployé automatiquement dans un cloud public, le besoin de Change Management n'est plus ce qu'il était en 2007 (lors de la sortie d'ITIL V3), ni même en 2019 (lors de la sortie d'ITIL V4). Cela dit, l'année dernière, j'ai rencontré des entreprises qui n'avaient encore que peu, voire pas du tout, d'automatisation, d'intégrations ou d'IA au sein du domaine Enterprise Support. Pour elles, ITIL V4 (2019) constituait une bonne réponse (initiale).

En 2024, ServiceNow s'est attaché à intégrer l'IA à sa plateforme pour quiconque était prêt à la payer, lui permettant de traiter toutes sortes de demandes, questions, commandes et messages provenant d'individus, via des workflows automatisés. L'IA générative sert à produire des réponses aux utilisateurs et à résumer/traduire les interactions avec ceux-ci dans des « tickets ».

D'ici 2025, les grands modèles de langage, qui ne pouvaient fournir que des informations prédéfinies, seront remplacés par l'intelligence artificielle générale (AGI), capable de raisonner et d'adapter ses réponses en fonction de ses observations et de ses expériences. Des agents IA seront introduits pour prendre en charge des tâches spécifiques (par exemple le traitement des demandes d'assistance IT et de connaissances, ou la réservation d'installations), étendant leur utilité au-delà de la seule IT. Ces agents IA dans ServiceNow dialogueront avec les utilisateurs, exploiteront les données d'exploitation et de la CMDB de la plateforme, et interagiront avec des API, des microservices et d'autres agents IA dans l'ensemble des fonctions de l'entreprise.

Tandis que ServiceNow se concentrait sur l'IA, la communauté IT a adopté d'autres outils et pratiques DevOps, en les intégrant de manière transparente. En conséquence, le paysage des outils IT de la plupart des entreprises est devenu très diversifié. Chaque entreprise utilise désormais son propre ensemble d'outils adaptés à des capabilities spécifiques, certains outils couvrant plusieurs capabilities.

D'ici la fin de la décennie, les architectes d'entreprise voudront sans doute distinguer les **Business Capabilities suivantes au sein du domaine Enterprise Support**, qui comprennent également des capabilities modernes absentes des référentiels traditionnels tels que DevOps, DevSecOps, ITIL, SAFe, etc. À ma connaissance, ces 15 capabilities ne se chevauchent pas et sont pérennes (au moins jusqu'en 2030), quelle que soit la pratique utilisée par votre entreprise et celle vers laquelle elle évoluera (y compris celles qui n'existent pas encore aujourd'hui) :

1.  Engagement et collaboration des employés assistés par l'IA
2.  Planification/Roadmap (OKR, portefeuille de projets)
3.  Architecture et conception (portefeuille de produits numériques)
4.  CMDB/SCM (services, actifs et configuration)
5.  Développement (Build & Test)
6.  Sécurité/Confidentialité (vulnérabilités et fuite de données)
7.  Identités et accès (SSO, RBAC, habilitations)
8.  Déploiement (intégration et livraison)
9.  Exploitation (observation/réponse)
10.  Capital humain (aussi appelé ressources humaines)
11.  Services de l'environnement de travail, OT et installations
12.  Finance, juridique et supply chain
13.  Gestion intégrée des risques et continuité d'activité (aussi appelée Governance, Risk & Compliance)
14.  Engagement client assisté par l'IA\*
15.  Field Service & Dispatch\*

\* Remarque : « Engagement client assisté par l'IA » et « Field Service & Dispatch » sont des capabilities tournées vers les clients externes (aussi appelées Customer Service, CSM). Certaines entreprises les excluent des capabilities Enterprise Support (ESM), tandis que d'autres préfèrent regrouper ESM et CSM en raison de leurs similitudes technologiques (par exemple, envoyer un technicien terrain chez un client est assez semblable à l'envoyer dans un bureau de l'entreprise, surtout si l'intervention terrain est externalisée).

> **Chacune des 15 Business Capabilities ESM/CSM ne sera prise en charge que par un nombre limité de plateformes. Ce qui était auparavant couvert par une seule plateforme (par exemple le portail employés, l'ITSM et la CMDB) sera probablement réparti sur plusieurs plateformes. Des agents IA verticaux spécialisés prendront en charge une Business Capability. Les entreprises feront des choix différents quant à la plateforme et à l'éditeur retenus, pour quelle durée, afin de fournir telle ou telle Business Capability. Si une entreprise a externalisé l'innovation et la maintenance, certaines Business Capabilities pourront être fournies par les fournisseurs de services managés (ou incluses dans leur service).**

Les solutions IT des RH, de la finance, du juridique, de la supply chain et de la gestion des risques ne sont souvent pas sélectionnées, détenues ni maintenues par l'IT de l'entreprise. Dans l'illustration ci-dessus, ces capabilities non IT sont donc indiquées en vert. Gérer des capabilities non IT en dehors du domaine Enterprise Support revient souvent à s'attirer des ennuis. Par exemple, la capability L3 « Joiner, Mover & Leaver (JML) » fait partie de la capability L2 « Capital humain (HCM) ». Le JML est quasiment impossible sans interfaces automatisées avec des capabilities fournies par d'autres que les RH (par exemple « Identités et accès », « Sécurité/Confidentialité », « Gestion intégrée des risques » et « Finance, juridique et supply chain »). Cela dit, confier à l'IT la gestion des contrats et litiges RH n'est probablement pas une bonne idée non plus :-)

J'encourage les organisations à rester simples et à adopter ces Business Capabilities de niveau 2 (L2) lors de la planification et de la conception de leur architecture pour l'ensemble du domaine (L1) Enterprise/Customer Support. Pour la plupart des capabilities (par exemple 1, 2, 3, 4, 10, 11, 12, 13, 14 et 15), il est généralement judicieux d'utiliser le moins de solutions IT possible. Pour les capabilities plus techniques, il est souvent pertinent d'utiliser les outils les mieux adaptés à des technologies spécifiques.

À l'heure actuelle, 528 éditeurs proposent plus de 700 outils offrant des capabilities pour le domaine Enterprise Support. La plupart de ces outils se concentrent généralement sur une seule des Business Capabilities L2 énumérées ci-dessus.

En théorie, ServiceNow peut fournir 11 de ces Business Capabilities. En pratique, environ 50 % des entreprises n'utilisent ServiceNow que pour trois ou quatre d'entre elles. Peu d'entreprises utilisent les mêmes capabilities, et aucune ne les a probablement implémentées de manière identique. ServiceNow n'est pas le seul outil utilisé pour une capability donnée. Par exemple, si la CMDB est alimentée par fédération depuis INTUNE, c'est INTUNE qui fournit des capabilities CMDB/SCM. De même, GitHub et JFROG Artifactory sont des référentiels de composants (SCM) populaires utilisés en DevSecOps, dont le contenu recoupe souvent peu celui de la CMDB dans ServiceNow.

Les référentiels historiques tels qu'ITIL V3/V4 ne sont pas compatibles avec les pratiques modernes et automatisées de DevSecOps et d'IA. De manière générale, il est considéré comme une bonne pratique de veiller à ce que la plateforme ne soit utilisée que par le public auquel elle est destinée et pour l'usage prévu, en particulier si le produit ou la plateforme, documentation comprise, est maintenu par l'éditeur. Utiliser des définitions et un vocabulaire différents de ceux fournis par l'éditeur de la plateforme entraîne presque toujours de la confusion et des coûts supplémentaires.

Cela dit, de nombreuses entreprises utilisent les fonctionnalités techniques d'une plateforme à des fins ou pour des publics non prévus. J'ai par exemple vu des plateformes où le processus d'Incident Management servait à demander une réinitialisation de mot de passe (justification : « Je ne peux pas me connecter, donc l'IT doit être en panne »). Cela fait-il du système de ticketing une plateforme de gestion des identités et des accès ? Je ne le pense pas. L'interaction avec l'utilisateur qui a besoin d'une réinitialisation de mot de passe relève de « Engagement et collaboration des employés assistés par l'IA », tandis que la réinitialisation proprement dite relève de « Identités et accès (SSO, RBAC, habilitations) ». Une demande de réinitialisation de mot de passe ne doit pas être enregistrée comme un incident.

Autre exemple : des pannes ou des problèmes de performance peuvent être résolus automatiquement avant même qu'un utilisateur ne les remarque. Si la panne est déjà enregistrée/signalée séparément via « Observation », l'enregistrer à nouveau comme incident est discutable.

**EN CONCLUSION :**

Il n'existe actuellement aucun référentiel unique définissant toutes les capabilities utilisées dans le domaine Enterprise Support. L**a meilleure approche consiste probablement à rattacher les outils IT de votre entreprise aux 15 Business Capabilities ci-dessus**, puis à évaluer, pour chaque capability, si une rationalisation ou une consolidation des outils est nécessaire ou souhaitable.

Dans le portefeuille numérique, les architectes doivent documenter laquelle des 15 Business Capabilities L2 chaque produit fournit. En outre, l'usage prévu et le public cible de chaque produit doivent être documentés (par exemple dans les High Level Designs). Plutôt que d'adopter les capabilities L3 d'un référentiel particulier (par exemple ITIL, DevOps, DevSecOps, IT4IT, etc.), je recommande de se référer au vocabulaire et aux définitions utilisés par l'éditeur. Cela permettra aux entreprises de réutiliser de manière cohérente la documentation de l'éditeur (et ses mises à jour), qui restera vraisemblablement alignée à 100 % sur les fonctionnalités out-of-the-box de la plateforme, en innovation continue et rapide. De plus, cela permet aux entreprises de passer d'un référentiel à un autre, et d'utiliser les deux référentiels pour une ou plusieurs Business Capabilities pendant la transition.
