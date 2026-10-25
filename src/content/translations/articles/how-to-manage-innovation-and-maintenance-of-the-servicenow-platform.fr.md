---
title: "Comment gérer l'innovation et la maintenance de la plateforme ServiceNow"
excerpt: "On me demande souvent comment gérer au mieux la plateforme ServiceNow. Je recommande généralement le concept de base suivant, puis j'adapte mes conseils à l'objectif et au public visés :"
source: "c4a9356f8a3fc895"
---

On me demande souvent comment gérer au mieux la plateforme ServiceNow. Je recommande généralement le concept de base suivant, puis j'adapte mes conseils à l'objectif et au public visés :

### 

-   Faites d'abord approuver les principes recommandés jusqu'au niveau du CIO/CTO.

-   ServiceNow est une plateforme qui permet d'appliquer, out of the box, des pratiques conformes aux standards du marché.
-   La plateforme est préconfigurée (par ServiceNow) pour prendre en charge les processus documentés, y compris les rôles, flux et indicateurs qui y sont définis.  
    L'entreprise adopte les pratiques de ServiceNow et ses rôles, plutôt que de personnaliser la plateforme ou les pratiques afin de perpétuer des pratiques héritées.
-   La plateforme prend en charge une combinaison de standards du marché (par ex. IT4IT, ITIL, SAFe, SCRUM, etc.), mais, en tant que combinaison, elle n'est plus conforme à 100 % aux standards d'origine.
-   La configuration de la plateforme out of the box et de son modèle de données est autorisée, si cette configuration est justifiable et approuvée par l'autorité de conception désignée.
-   La plateforme, y compris ses applications et ses modules, est utilisée conformément à l'usage prévu, par le public prévu, tels que définis dans la documentation.
-   La plateforme est mise à niveau au moins une fois par an (de préférence deux fois par an), 4 mois après la disponibilité générale de la version majeure de la plateforme.
-   L'utilisation et la mise à niveau des intégrations out of the box sont préférées à la création et à la maintenance d'intégrations personnalisées.
-   L'accès à la plateforme et aux données qu'elle contient est documenté (accès basé sur les rôles), autorisé et géré.
-   La plateforme est (ou doit être) configurée conformément aux bonnes pratiques de développement convenues.
-   L'entreprise respecte les obligations contractuelles et légales, ainsi que les politiques et standards d'entreprise applicables à la plateforme.

-   Assurez-vous ensuite qu'il existe un consensus sur la **répartition des responsabilités**

-   -   L'équipe ServiceNow met à disposition les processus de bonnes pratiques, y compris la plateforme SAAS qui les rend possibles.
    -   L'équipe ServiceNow intègre la plateforme ServiceNow aux autres plateformes IT4IT, dans le respect des directives de sécurité et d'architecture.
    -   L'équipe ServiceNow aide l'organisation opérationnelle à adopter les processus et forme des champions locaux.
    -   L'équipe ServiceNow fournit le support de deuxième niveau, tant sur les processus que sur la plateforme.
    -   L'organisation opérationnelle régionale nomme des process managers qui gèrent et coordonnent les processus dans la région.
    -   L'organisation opérationnelle locale met à disposition des intervenants (fulfillers) formés et qualifiés qui exécutent les processus.
    -   Le Service Desk fournit le support de premier niveau aux utilisateurs de la plateforme.

### 

-   L'**innovation de la plateforme** est gérée dans ServiceNow, à l'aide de l'Agile Management (nous mangeons notre propre dogfood).

-   -   La plateforme dispose d'un (1) Platform Owner, soutenu par un Platform Architect. Il est recommandé que tous deux relèvent de la direction de l'entreprise.
    -   Le Platform Owner est responsable de la plateforme et des processus pris en charge, y compris de son budget, de la conformité aux politiques, des contrats, des compétences de l'équipe et des effectifs.
    -   Chaque trimestre, avec les product owners ServiceNow, le Platform Owner définit et tient à jour les thèmes et les epics des produits de la plateforme.  
        Le Platform Owner convient des thèmes (de leur budget et de leur priorité) avec les parties prenantes métier et les sponsors des thèmes de la plateforme.
    -   Le Platform Owner peut externaliser le développement et la mise en œuvre d'un thème donné dans le cadre d'un Statement of Work fondé sur une obligation de résultat.
    -   Le Platform Architect tient à jour une conception technique de haut niveau et une roadmap pour la plateforme, et assure la liaison concernant l'usage prévu, le public prévu et les intégrations de la plateforme avec les architectes de domaine et d'entreprise, les responsables des risques et de la conformité et la sécurité.
    -   La plateforme se compose de plusieurs applications définies (par ex. ITSM, ITOM, IRM, CSM, ESM, NOW, etc.), qui peuvent être regroupées en produits ; chaque produit a un product owner, propriétaire des thèmes, epics et stories propres à ce produit. « NOW » désigne la plateforme, y compris les fonctionnalités partagées entre plusieurs produits.
    -   Les product owners recueillent les demandes d'amélioration des parties prenantes (c'est-à-dire le « quoi ? ») et, avec l'équipe DevOps, les convertissent en stories (c'est-à-dire le « comment ? »).
    -   Les product owners assurent la liaison entre les demandes de projets et d'amélioration reçues, les process owners concernés et le solution architect.
    -   Les process owners définissent les processus pris en charge (et leurs modifications), y compris les KPI, politiques, procédures et directives associés.
    -   Les stories sont livrées et soumises aux tests d'intégration par une seule équipe DevOps, qui fait évoluer et maintient tous les produits.
    -   Les stories livrées font l'objet de la recette utilisateur par les product owners, au nom (ou avec le concours) de représentants de la communauté ServiceNow.

### 

-   La **maintenance de la plateforme** s'effectue au moyen des processus ITSM mis en œuvre (nous buvons notre propre champagne).

-   Le Service Desk (local/régional) qui accompagne la communauté locale est le premier point de contact pour les incidents (majeurs) liés à ServiceNow.
-   Les process managers (locaux/régionaux) consultent le process owner pour l'interprétation et l'amélioration de la documentation des processus.
-   En cas d'incident majeur sur ServiceNow, les Major Incident Managers de l'entreprise gèrent et coordonnent la résolution de l'interruption.
-   L'équipe ServiceNow fournit le support de deuxième niveau aux process managers et aux Service Desks.
-   La Now Platform est mise à niveau (une ou deux fois par an). Le product owner de la NOW Platform est responsable de la mise à niveau de la NOW Platform, réalisée par l'équipe DevOps. Les product owners ServiceNow concernés veillent à ce que leurs produits fassent l'objet de tests de non-régression et d'une recette utilisateur, et soient corrigés si nécessaire, avant la mise en production.

### 

-   Les processus pris en charge sont respectés et gérés par l'organisation opérationnelle locale/régionale

-   L'organisation opérationnelle affecte aux rôles de processus définis du personnel disposant des compétences et certifications adéquates.
-   Avec les process managers (locaux/régionaux), les process champions veillent à l'adoption des processus et des instructions de travail.
-   Les intervenants (fulfillers) respectent les processus mis en œuvre et les instructions de travail locales.
-   Les process managers (locaux/régionaux) surveillent le respect, la performance et la maturité des processus, et mettent en œuvre les améliorations si nécessaire.
-   Le process manager (local/régional) et les process champions fournissent le support processus de premier niveau aux intervenants de leur site ou de leur région.

### 

-   Les entreprises sont invitées à définir et à convenir d'une gouvernance :

-   -   Ownership de la plateforme, y compris les parties prenantes, les réunions périodiques, l'ordre du jour et les sujets (par ex. architecture, intégrations, vision, roadmap de la plateforme et des processus)
    -   Pilotage stratégique, y compris les parties prenantes, les réunions périodiques, l'ordre du jour et les sujets (par ex. thèmes, epics, performance des processus, projets)
    -   Pilotage tactique, y compris les parties prenantes, les réunions périodiques, l'ordre du jour et les sujets (par ex. améliorations, conception des processus, KPI, PPI)
    -   Pilotage opérationnel, y compris les parties prenantes, les réunions périodiques, l'ordre du jour et les sujets (par ex. défauts, indicateurs, qualité des données, etc.)

## Remarques :

-   Une même personne peut exercer plusieurs des rôles énumérés ci-dessus, à condition d'avoir les compétences et la formation nécessaires pour exercer ce ou ces rôles.

-   En règle générale, un product owner peut gérer plusieurs produits (similaires) ou en être propriétaire, en particulier si les parties prenantes sont les mêmes personnes.
-   Les Platform Owners, product owners et Platform Architects doivent être correctement formés et disposer d'au moins 3 à 5 ans d'expérience sur la plateforme.
-   Les ingénieurs DevOps doivent être certifiés par ServiceNow sur les produits sur lesquels ils travaillent.

-   Il est conseillé aux grandes entreprises d'acheter les licences de la plateforme directement auprès de ServiceNow, afin d'éviter toute dépendance vis-à-vis d'un partenaire.
-   De nombreuses entreprises externalisent en partie l'innovation et la maintenance de la plateforme ServiceNow et des processus pris en charge.
    -   L'externalisation du Platform Owner, du Platform Architect et des product owners n'est pas recommandée.
    -   L'externalisation des process owners et des experts métier des processus n'est pas recommandée.
    -   Le support de deuxième niveau de la plateforme peut être externalisé, en particulier si la plateforme doit être supportée à l'échelle mondiale ou 24x7.
    -   L'externalisation du DevOps est recommandée si ServiceNow est considéré comme une plateforme SAAS standardisée (commodity).
-   Cela dit, les entreprises peuvent tirer parti de l'expérience de tiers pour définir et mettre en œuvre les processus et leurs rôles.

-   Il est fortement recommandé de définir le plus tôt possible le modèle opérationnel et de sourcing cible, afin qu'il puisse être pris en compte pendant la transition.
-   Pendant la transition, des ressources internes peuvent être recrutées ou nommées, puis formées et accompagnées par le partenaire d'intégration.

## En image, voici ce que cela donne :

![](/wp-content/uploads/2024/11/SN-Operating-Model-1.png)
