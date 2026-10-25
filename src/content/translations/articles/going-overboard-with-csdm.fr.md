---
title: "En faire trop avec CSDM 5 ?"
excerpt: "ServiceNow a publié une présentation PowerPoint de 132 diapositives contenant des exemples sur la manière de modéliser le paysage informatique selon CSDM 5. Bien que j'apprécie généralement le CSDM, certains semblent en faire trop lorsqu'ils modélisent leur paysage informatique dans ServiceNow. Prenons"
source: "7d32fdda2aa10f19"
---

ServiceNow a publié une [**présentation PowerPoint de 132 diapositives contenant des exemples**](https://learning.servicenow.com/nowcreate?id=nc_asset&asset_id=90b0eaca879dae106838fd16dabb3502&nc_source=copy_asset_link) sur la manière de modéliser le paysage informatique selon CSDM 5. Bien que j'apprécie généralement le CSDM, certains semblent en faire trop lorsqu'ils modélisent leur paysage informatique dans ServiceNow. Prenons un exemple : **comment (ne pas) modéliser la plateforme ServiceNow dans CSDM 5.**

La plateforme ServiceNow est utilisée par des entreprises de types, de tailles et de maturités différents, pour des usages différents, par des personnes différentes, dans des cultures différentes, qui recourent souvent à plusieurs référentiels de processus. Le CSDM aide à structurer et à gouverner les données, mais ce n'est pas un modèle universel. De plus, le CSDM continue d'évoluer. CSDM 5 est déjà nettement meilleur que ses prédécesseurs. Mais la version 5 est beaucoup plus complexe, et plus sujette à interprétation, que ses prédécesseurs datant respectivement de 4 et 6 ans.

Par exemple, CSDM 5 comporte désormais des portefeuilles de services (DPM), des nœuds de taxonomie (DPM), des chaînes de valeur (Foundation), des portefeuilles de projets (SPM), des Business Units (Foundation) et des Business Capabilities de premier niveau (SPM). Chaque groupe possède et utilise ses propres artefacts. Tout le monde ne lit pas le livre blanc CSDM 5, ni ne respecte les définitions et recommandations qu'il contient. En toute honnêteté : le CSDM laisse une assez grande marge d'interprétation. Ainsi, beaucoup d'entreprises renseignent les 6 artefacts avec les mêmes valeurs « HR », « IT », « Risk », « Finance », « Legal », « Supply Chain », « Marketing », « Sales » et « CRM ». D'autres mettent des valeurs différentes dans chacun des 6 artefacts. Certaines organisations veulent prendre en compte chaque exception ou préférence que quiconque pourrait avoir.

**Je recommande d'utiliser les artefacts pour leur finalité prévue, de réutiliser autant que possible et de garder l'IT simple.** Par ailleurs, je crois en un modèle en couches, dans lequel les clients font affaire avec l'entreprise, le Business (et ses utilisateurs) est soutenu par des solutions intégrées et gérées, solutions elles-mêmes soutenues par des tours technologiques de commodité (Commodity Technology Towers).

Je recommande généralement de distinguer un portefeuille d'applications, un portefeuille de composants, un portefeuille de projets/programmes, un portefeuille de services techniques et un portefeuille de services métier. Tous les éléments de ces portefeuilles doivent être liés aux artefacts fondamentaux pertinents, tels que les chaînes de valeur, Business Units, départements, sociétés, régions, pays, sites, propriétaires et groupes auxquels l'élément appartient. On peut créer plusieurs portefeuilles de chaque type, mais je ne recommanderais jamais d'avoir plus de 6 à 8 portefeuilles d'un type donné. Exemples :

1.  Un portefeuille d'applications pour les applications métier, un pour les applications/outils IT4IT et un pour les applications Desktop/Mobile
2.  Un portefeuille de composants pour les composants informatiques PAAS et un pour les composants informatiques SDLC
3.  Un portefeuille de services technologiques par tour technologique PAAS/IAAS
4.  Un portefeuille de services métier par Business Unit
5.  Un portefeuille de projets/programmes par tribu ou domaine d'entreprise

Les entreprises qui n'ont pas de services définis pourraient commencer par fournir leurs applications « en tant que service SAAS ». Si ces services SAAS ont (ou auront) des engagements, des droits, des abonnements et des SLA, on peut alors créer une Service Offering par application métier. Si vos applications peuvent avoir plusieurs offerings (spécifiques à un environnement ou à un site), on peut choisir d'enregistrer l'application comme un service. Il n'est pas recommandé d'enregistrer chaque application Desktop/Mobile « en tant que service ».

Chaque service du portefeuille de services appartient à un nœud de taxonomie et a pour propriétaire un Accountable Service Owner. Le portefeuille de services métier ne doit PAS être spécifique aux applications métier (les applications doivent figurer dans le portefeuille d'applications techniques). Par exemple, Workday figure dans le portefeuille d'applications (de services), et « Employee Joiner, Mover & Leaver Support » figure dans le portefeuille de services métier ; tous deux sont liés au Service Instance (CI) Workday de production.

Ces principes ne peuvent, à mon humble avis, pas être spécifiques à une plateforme, et doivent être approuvés et appliqués à l'échelle de l'entreprise, car ils constituent le fondement de la gouvernance et de l'organisation.

## COMMENT EN FAIRE TROP ?

Dans l'exemple de ServiceNow pour ServiceNow, il existe un enregistrement Business Application pour la plateforme ServiceNow. Cette plateforme ServiceNow héberge plusieurs Business Applications individuelles. Les philosophes pourraient soutenir que ServiceNow n'est une Business Application que s'il est utilisé par le Business pour le Business. Je ne suis pas philosophe. Je considère que les applications ServiceNow sont des solutions hébergées utilisées par des utilisateurs métier, ce qui justifierait la création d'une Business Application, d'un Business Service et de Business Service Offerings pour celles-ci.

Cela dit, les Business Capabilities devraient, à mon humble avis, être exactement cela. Autrement dit, « Manage Technology » n'est, à mon humble avis, pas une Business Capability. N'oubliez pas : les Business Capabilities relèvent du domaine « Design and Planning » de CSDM 5 ; elles doivent indiquer quelle Business Application est utilisée pour quoi, sans en faire trop. Pour toute Business Application, je m'attendrais à voir une poignée de Business Capabilities prises en charge. Je m'attendrais à ce qu'une Business Capability soit fournie en moyenne par une poignée de Business Applications. Lorsque chaque Business Application permet deux douzaines de Business Capabilities, ou lorsque la majorité des Business Capabilities n'est fournie que par une seule application, vous en avez probablement trop fait.

Modéliser « SN Incident Mgmt » comme une Business Application pourrait, à mon humble avis, facilement revenir à « en faire trop », car la plateforme ServiceNow permet environ 200 capabilities uniques similaires à « SN Incident Mgmt ». Si, pour chacune de ces Business Applications, on créait des Service Instances spécifiques à chaque environnement, on aboutirait à 800 Service Instances. Chacune de ces 800 devrait être mise en relation avec une instance « Yokohama » de la plateforme. Même si vous n'utilisez pas toutes les applications ServiceNow, modéliser les capabilities ServiceNow individuelles comme des Business Applications n'est vraiment pas, à mon humble avis, une bonne idée.

Un Business Service est un ensemble reconnaissable de Service Offerings. Le Business Service « End User Service » n'est pas un service que je m'attendrais à voir fourni par la plateforme ServiceNow. La Service Offering « SN Incident Mgmt » n'est pas quelque chose que je m'attendrais à voir fourni « en tant que service ». De même, je m'attendrais à ce que « System Monitoring » soit lié à l'observabilité, mais pas à ServiceNow.

Si vous ne me croyez pas, n'hésitez pas à mettre ce modèle dans ServiceNow, avec tous les artefacts et toutes les relations. Demandez ensuite aux auditeurs et aux responsables de la conformité d'examiner vos HLD, DLD, roadmaps, OKR, BIA/CIA pour chacune de vos « applications ». Soumettez ensuite une demande de ressources pour faire résoudre toutes les constatations de conformité. Puis demandez à un utilisateur métier type, non formé, de signaler que « les incidents sur Workday sont affectés au mauvais groupe ».

## COMMENT FAIRE 40 À 60 % PLUS EFFICACE ?

Les différents portefeuilles seraient mis en place comme décrit dans la section sur les fondements.

En supposant que l'innovation et la maintenance de la plateforme ServiceNow soient gérées dans ServiceNow, j'enregistrerais :

-   Un programme pour la plateforme ServiceNow (ou un respectivement pour l'IT, les RH, etc., selon qui finance quoi)
-   Une demande/initiative par Objective & Key Result
-   Un projet par demande/initiative approuvée nécessitant un budget/business case
-   Autant de User Stories par projet ou produit que nécessaire.
-   Un produit Agile DevOps par application ServiceNow (voir ci-dessous)
-   Un groupe/tableau Agile par équipe DevOps

Je modéliserais les artefacts CSDM pour l'ensemble de la plateforme ServiceNow de la manière suivante :

### 

-   Foundation (en gris)

-   16 **chaînes de valeur** prêtes à l'emploi (Out-of-the-Box)
-   Une **Product Feature** par fonctionnalité ServiceNow (CMDB, Portal, Mobile App, Virtual Agent, Workspace, etc.)
-   Un **Business Process** par processus pris en charge par ServiceNow (par ex. INC, PRB, CHG, REQ)
-   Un **bâtiment/site** pour le data center
-   Un **groupe** qui assure le support, réalise, gère et approuve les changements sur ServiceNow
-   Un **utilisateur** de la **société**, propriétaire de la plateforme de services et de ses services/offerings, et un utilisateur pour chaque membre du groupe
-   Un **Product Model** par produit matériel/logiciel similaire

### 

-   Design & Planning (en bleu)

-   Une **Business** **Capability** par application ServiceNow (par ex. ITSM, ITAM, ITOM, CSM, etc.)
-   Une **Business Application** pour la plateforme ServiceNow

### 

-   Design & Build (en rouge)

-   Un **SDLC Component** pour le MidServer JAVA pour Windows et un par agent IA développé. (futur)

### 

-   Service Delivery (orange)

-   Un **Technical/Business Service** pour l'Enterprise Service Management (selon que ServiceNow est utilisé pour le Business ou pour la technologie)
-   Une **Technical/Business Service Offering** pour la plateforme ServiceNow (en supposant qu'une seule équipe y travaille)
-   Une **Technical Service Offering** pour chaque type d'élément IAAS/PAAS proposé en tant que service.
-   Un **Service Instance** (d'application) (cmbd\_ci\_service\_auto) par instance ServiceNow déployée
-   Une **Application** (cmdb\_ci\_app) par instance de l'application MidServer
-   Un **serveur JAVA** (cmdb\_ci\_app\_server\_java) installé sur un serveur Windows, hébergeant les applications MidServer hors production, et un pour les applications MidServer hors production.
-   Un **serveur Windows/Linux** pour les applications MidServer hors production (serveurs), et un pour les applications MidServer de production (serveurs).
-   Une **machine virtuelle** par serveur Windows/Linux
-   Un **data center Azure** sur lequel sont hébergées les VM Windows/Linux

### 

-   Service Consumption (vert)

-   Une demande pour acquérir les serveurs, VM, etc.
-   Autres exemples...

## Justification :

1.  Les incidents, problèmes et changements doivent, à mon humble avis, être liés à une Service Offering (qui détermine qui assure le support de l'offering), et éventuellement à l'élément de configuration impacté supposé défaillant (qui détermine ce qui doit éventuellement être réparé). Certains Platform/Process Owners ServiceNow autorisent qu'un incident fasse référence à certaines données fondamentales (par ex. site, société, BU, Product Feature, Business Process).
2.  Je recommande d'enregistrer un Service Instance par instance ServiceNow. Ainsi, même si je sais que les entreprises achètent auprès de ServiceNow des licences pour les applications ITAM, ITOM et ITSM, et que ServiceNow est nativement un Platform Host (OOTB), je ne modélise pas l'application ServiceNow en tant que telle dans ServiceNow. J'enregistre plutôt les applications comme des capabilities, étant donné que ServiceNow propose des dizaines de capabilities applicatives. J'accepte que cela signifie que je ne peux pas gérer le cycle de vie des applications ServiceNow individuelles. Cela me permet en revanche de relier les Business Processes aux capabilities. Et surtout, toutes les références ci-dessus ne sont enregistrées et maintenues qu'une seule fois, et nous n'avons à réaliser qu'une seule revue BIA/CIA et un seul audit externe périodique pour l'ensemble de la plateforme ServiceNow.
3.  En général, l'IT, les RH, la GRC, la SÉCURITÉ, le JURIDIQUE et le CSM sont des silos politiques dans les grandes entreprises. Je recommande de régler les questions politiques en conseil de direction, mais jamais, au grand jamais, de modéliser des silos cloisonnés dans ServiceNow, sauf si des contrats ServiceNow distincts avec des instances séparées sont en place et si le coût total de possession n'est pas un facteur important pour l'entreprise. En près de 20 ans de travail avec ServiceNow, je n'ai jamais vu un seul contrat ServiceNow avec séparation par domaine ou par instance qui fonctionne bien et efficacement. La plupart des interfaces et enregistrements ServiceNow ne sont pas spécifiques à un domaine. Ceux qui le sont peuvent être sécurisés et gérés sans séparation d'instances ou de domaines.
4.  Le service « Enterprise Service Management » peut également contenir d'autres offerings, par ex. pour les plateformes Apptio, LeanIX ou MetricStream, si l'ESM est réparti sur plusieurs plateformes. Cela permet aussi d'avoir plusieurs plateformes ServiceNow au sein de l'entreprise (par ex. lors de la fusion de plusieurs contrats ServiceNow).
5.  Après avoir étudié l'avenir de l'IA dans ServiceNow et dans d'autres plateformes d'IA, je pense que le schéma présenté ci-dessous est le mieux adapté aux grandes entreprises.
6.  Je pourrais modéliser les plugins ServiceNow comme des composants SDLC déployables, mais pourquoi maintenir vous-même un référentiel de plugins qui est déjà maintenu ailleurs (à ses propres frais) par ServiceNow ? Il en va de même pour les applications du ServiceNow Store. Je pense qu'il suffit d'enregistrer en tant que telles les Business Capabilities de la plateforme achetées/utilisées et de les relier aux Business Processes qu'elles permettent ou soutiennent.
7.  Si vous décidez d'exporter une partie du contenu ServiceNow vers une base de données ou un data lake (périodiquement ou en quasi temps réel), afin que d'autres puissent utiliser ces données sans impacter les performances de ServiceNow, vous devez également modéliser les bases de données, les SGBD (ou services de base de données) et les outils qui fédèrent les données de ServiceNow vers la base de données.
8.  Comme vous l'avez peut-être remarqué, je n'ai enregistré aucune version des produits ServiceNow, ni pour les références, ni pour les instances. Je pars du principe que les instances ServiceNow sont mises à niveau plutôt que remplacées. Lors d'une telle mise à niveau (qui ne devrait pas prendre des mois), les intégrations et dépendances restent intactes. Si les capabilities de la plateforme changent radicalement lors d'une mise à niveau majeure, il suffit de les ajouter, supprimer ou mettre à jour pendant la mise à niveau. Cela dit, tout ce qui est découvert automatiquement (par ex. OS, serveur JAVA, etc.) est versionné. Pour un aperçu du contenu de chaque version majeure de ServiceNow, je recommande d'utiliser la documentation produit ServiceNow et les vidéos destinées aux partenaires.

**Au fait : ai-je mentionné ma déclaration « safe harbor » :-)**

## RÉSUMÉ

Plusieurs alternatives sont possibles pour modéliser ServiceNow tout en utilisant les définitions et artefacts de CSDM 5. Je recommande d'utiliser la manière la plus efficace qui reste adaptée à l'objectif et au public visé. À mon humble avis, c'est celle illustrée par le schéma ci-dessous.

J'ai mis en place (la gouvernance d') une douzaine de plateformes ServiceNow au cours des dernières décennies et, en toute honnêteté, je ne l'ai pas toujours fait de manière efficace, mais j'ai tiré les leçons de l'expérience.

Si vous suivez ma recommandation, vous réduirez probablement le nombre d'éléments gérés de 40 à 60 % (ainsi que la charge administrative liée à l'enregistrement, à la revue et à la documentation de la plateforme ServiceNow) par rapport à l'exemple fourni par ServiceNow. Et oui, vous ne pourrez pas enregistrer le cycle de vie des applications individuelles dans ServiceNow. Mais est-ce un problème s'il n'existe qu'une seule plateforme ServiceNow, avec un seul propriétaire de plateforme, et des instances partagées par plusieurs parties prenantes ?

![](/wp-content/uploads/2025/06/How_to_model_servicenow_in_csdm_5-scaled.png)
