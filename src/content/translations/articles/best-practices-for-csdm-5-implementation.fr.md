---
title: "Bonnes pratiques pour CSDM 5"
excerpt: "Vous avez donc lu le CSDM 5 et vous en avez une idée générale. Cependant, de nombreuses questions et de nombreux choix restent ouverts. Cet article décrit les pratiques que je recommande quant à ce qu'il faut (ou non) modéliser dans ServiceNow. Appliquer ces recommandations"
source: "90864917408791f0"
---

Vous avez donc lu le CSDM 5 et vous en avez une idée générale. Cependant, de nombreuses questions et de nombreux choix restent ouverts. Cet article décrit les pratiques que je recommande quant à ce qu'il faut (ou non) modéliser dans ServiceNow. Appliquer ces recommandations permet d'éviter des problèmes par la suite.

## Ce qu'il faut stocker dans ServiceNow :

### Dans le portefeuille de produits numériques (baselines) :

-   Tous les Digital Services formellement proposés en tant que service à l'entreprise, y compris l'infrastructure, les applications et les actifs numériques d'IA (non versionnés).
-   Les Business Applications directement utilisées par les métiers (non versionnées)
-   Les composants IT et plateformes qui soutiennent les métiers (versionnés)
-   Les Product Models, par exemple pour les actifs matériels/logiciels (non versionnés)

### Dans la CMDB (instances versionnées) :

-   L'infrastructure de l'entreprise (ou gérée par celle-ci)
-   Les éléments déployés/configurés sur l'infrastructure de l'entreprise
-   Les éléments appartenant à l'entreprise, déployés sur l'infrastructure de tiers
-   Les terminaux utilisateurs connectés, y compris ce qui y est installé.
-   Toutes les licences (payantes) pour les instances de produits/services.

## Ce qu'il ne faut PAS stocker dans ServiceNow :

-   La décomposition/les composants des services fournis par des tiers, par exemple les antennes GSM d'un opérateur de télécommunications mobiles.
-   L'infrastructure faisant partie intégrante d'une offre SaaS/PaaS externe.
-   Les sites MS SharePoint, les canaux MS Teams, les espaces Confluence, les partages de fichiers, etc. en tant que Business Applications
-   Les éléments de portefeuille qui ne sont pas proposés/fournis à l'entreprise, par exemple ceux pour lesquels l'entreprise n'a conclu aucun accord formel avec le fabricant, le fournisseur ou le Managed Service Provider
-   Les éléments de portefeuille et de CMDB qui ne sont pas détenus/acquis par un représentant responsable de l'entreprise. Par exemple yahoo.com
-   Les éléments de CMDB pour lesquels la gestion des incidents, des problèmes, des changements et des demandes est assurée ailleurs, par d'autres que l'entreprise.
-   Les attributs financiers tenus dans le grand livre de l'entreprise (par exemple valeur comptable, amortissement, etc.)
-   Les éléments qui ne sont pas nécessaires dans/pour les pratiques ServiceNow prises en charge
-   Tout ce qui est actuellement exclu par l'entreprise. Par exemple les serveurs on-premise, les équipements électriques et OT, y compris ce qui y fonctionne.

* * *

**ServiceNow en tant que plateforme d'Enterprise Service Management**

ServiceNow est une plateforme destinée à la gestion des services à l'échelle de l'entreprise. Les *services* sont les artefacts les plus importants de la plateforme. Sans référence au service proposé, il est impossible de déterminer le résultat attendu ou les engagements applicables aux incidents, problèmes ou changements. Seuls les services formalisés — idéalement documentés dans un accord formel entre l'entreprise et le fournisseur — doivent être enregistrés dans ServiceNow.

Si une entreprise souhaite mesurer la performance de ses fournisseurs de services, enregistrer les services dont elle dépend, disposer d'une source unique de vérité pour tous les tickets ouverts ou utiliser ses capacités d'IA pour évaluer et classer les incidents, problèmes ou changements, elle doit enregistrer les services proposés par ses fournisseurs. Les enregistrements associés (par exemple incidents et changements) peuvent être automatiquement e-bondés avec le système de gestion des services du fournisseur, par e-mail ou via des API.

* * *

**Portefeuille applicatif et baselines**

Les architectes d'entreprise (EA) et les gestionnaires du portefeuille applicatif (APM) se concentrent sur les *baselines applicatives* utilisées par les métiers, pour les métiers. Ils gèrent le cycle de vie de ces baselines, y compris les dépendances horizontales (interfaces) et verticales (piles technologiques). Ils ne gèrent ni ne suivent le déploiement des instances de ces baselines. Ils souhaitent toutefois savoir où les applications sont déployées et quelles sont leurs dépendances réelles.

Le portefeuille de Business Applications ne reste gérable que s'il exclut les artefacts qui le pollueraient ou qui relèvent d'autres modèles de gouvernance. Par exemple, enregistrer Notepad++ comme Business Application impliquerait un RBAC sur les accès, des évaluations BIA/CIA et un plan de cycle de vie — tout cela pour un simple utilitaire. Comme un PC ou un Mac type peut comporter des centaines d'applications de bureau de ce genre, les EA et l'APM seraient submergés par la gestion d'éléments qui ne sont pas de véritables applications métier. Les applications de bureau et mobiles sont généralement déployées via des magasins d'applications ou des outils de gestion des terminaux et ne passent pas par le contrôle des changements.

**Recommandation :** n'incluez pas les applications de bureau ou mobiles dans le portefeuille de Business Applications. Si un élément est critique pour les métiers, il ne doit pas être déployé sur un PC ou un appareil mobile.

* * *

**Versionnage et Discovery**

Les *baselines* applicatives ne sont pas versionnées dans le portefeuille afin d'éviter une croissance exponentielle. Une baseline peut avoir plusieurs instances déployées, chacune dans une version différente. Ces versions sont généralement découvertes et fédérées automatiquement, sans aucun effort manuel. Chaque instance ne peut exécuter qu'une seule version à la fois.

Si l'APM est géré en dehors de ServiceNow, le nombre d'instances par version peut être transmis de ServiceNow vers des outils tels que SAP LeanIX ou Apptio. Si les baselines étaient versionnées, chaque instance devrait être réaffectée lors des mises à niveau, ce qui est inutile, sauf si l'application et ses données sont remplacées en profondeur. Par exemple, la migration de SAP R/3 vers SAP S/4HANA dans le cloud justifie la création d'une nouvelle baseline.

* * *

**CMDB et gestion des actifs**

Les instances d'applications de bureau et mobiles déployées peuvent être découvertes et fédérées dans la CMDB. Après corrélation et normalisation, elles soutiennent la gestion des actifs, les opérations de sécurité et la gestion des risques. Les composants installés et en cours d'exécution sur les terminaux utilisateurs apparaissent sur le *formulaire de l'appareil*. L'*appareil* et la *service offering* sont tous deux directement liés à l'incident. Même si vous *pouvez* référencer l'élément installé/en cours d'exécution, la bonne pratique consiste à enregistrer l'*appareil* comme CI impacté.

Les logiciels d'infrastructure, les paramètres de configuration, le middleware et les outils techniques qui ne sont pas utilisés directement par les utilisateurs ne doivent **pas** être enregistrés comme Business Applications. Leur cycle de vie n'est pas géré par l'APM et leur accès n'est pas régi par le RBAC. Les changements d'infrastructure — comme l'application de correctifs aux systèmes d'exploitation ou aux plateformes SGBD — affectent plusieurs applications métier et sont traités différemment des changements portant sur une seule application. Le remplacement de composants en fin de vie implique généralement des projets d'infrastructure de grande ampleur. Discovery et la fédération permettent de confirmer les versions et l'emplacement de ces éléments.

Dans LeanIX, les IT Components sont souvent versionnés au niveau majeur (par exemple *MS SQL Server 2016*). Dans ServiceNow, ils sont généralement enregistrés comme *Service Offerings* non versionnées (par exemple *MS SQL Server Support* dans le cadre du service *Database Administration*).

* * *

**Infrastructure externe et considérations de risque**

Si des applications métier (ou leurs données/composants) sont déployées sur l'infrastructure de tiers, les parties prenantes chargées des risques et de l'audit voudront en avoir la visibilité. Il est recommandé de suivre et d'approuver les déploiements et changements concernant les applications appartenant à l'entreprise via la solution interne de Service Management.

Lorsque des frais s'appliquent aux éléments déployés, les entreprises doivent surveiller activement leur usage et leur taux d'utilisation. Si les coûts de licence reposent sur des métriques d'usage autres que le nombre d'installations, ces métriques doivent également être surveillées.

Les fournisseurs proposant des services en boîte noire exposent rarement des données détaillées sur leurs composants internes. C'est acceptable si le fournisseur garantit la disponibilité, la performance et la sécurité. Des preuves de conformité peuvent être demandées sans stocker les données internes du fournisseur dans la CMDB de l'entreprise, ce qui évite d'avoir à maintenir des informations externes sensibles.

Enregistrer des éléments fournis par des tiers sans accord formel est risqué. Le fournisseur n'a aucune obligation d'assister l'entreprise, de maintenir la conformité ou d'assurer la continuité. Les auditeurs et les responsables des risques jugeront probablement cette situation non conforme.

Les services fournis par des tiers *doivent* être représentés dans le système ServiceNow de l'entreprise si celle-ci en dépend. Si ces fournisseurs gèrent leurs propres incidents, problèmes ou changements dans leur propre outil ITSM, leurs composants internes ne doivent pas être dupliqués dans la CMDB de l'entreprise, sauf s'ils sont fédérés dans le cadre d'une gouvernance stricte, en tenant compte des implications en matière de sécurité, de RGPD et de conformité.

* * *

**Maîtriser le périmètre et les performances dans ServiceNow**

Surcharger ServiceNow de détails inutiles (par exemple des données au niveau des fichiers sur les terminaux utilisateurs) dégrade les performances. Seuls les éléments pertinents pour les pratiques prises en charge par ServiceNow ou ses parties prenantes doivent être enregistrés.

La constitution de la CMDB est un processus pluriannuel qui doit être soigneusement planifié et priorisé. Concentrez-vous d'abord sur les éléments critiques. Si une partie de l'activité est en cours de cession, la découverte dans ce périmètre peut être dépriorisée. L'infrastructure éphémère (par exemple des VM de sauvegarde temporaires) ne doit pas être enregistrée, sauf si elle est utilisée de manière durable. Les ressources mises hors service doivent être retirées rapidement. Documentez et révisez périodiquement le périmètre et les plans relatifs aux services, aux actifs et aux configurations.

* * *

**Plateformes de collaboration modernes et leur classification**

Les éléments tels que les sites SharePoint, les espaces Confluence, Google Workspace et les canaux MS Teams ne sont généralement pas gérés via les processus d'incident ou de changement. Ils ne doivent donc pas être classés comme Business Applications. À la place :

-   Enregistrez « SharePoint », « Confluence » et « MS Teams » comme Business Applications.
-   Enregistrez automatiquement les URL comme *Application Services* par fédération depuis des plateformes comme O365 ou Atlassian.
-   Maintenez des normes cohérentes de classification et de nommage.

Remarque : certains auditeurs peuvent exprimer des réserves quant à l'utilisation de ces plateformes à des fins critiques.

* * *

**O365 et agents de collaboration**

Les agents de messagerie et de collaboration (par exemple les clients Outlook et Teams) installés sur les terminaux utilisateurs doivent être enregistrés comme n'importe quelle autre application de bureau ou mobile. Les incidents doivent être déclarés sur l'*appareil*, et non sur l'agent installé.

Certaines entreprises enregistrent les principaux composants d'O365 comme Business Applications et leur appliquent les mêmes règles de gouvernance. Cependant, les tenants et applications O365 sont généralement administrés de manière centralisée et diffèrent des applications métier classiques.

**Recommandation :** enregistrez la *suite O365* comme une seule Business Application. Définissez *Messagerie d'entreprise*, *Collaboration* et *Gestion de contenu* comme Infrastructure Services ou Service Offerings.

* * *

**Composants SDLC et baselines**

Les composants SDLC (non repris dans le tableau de référence) sont soit enregistrés dans ServiceNow comme baselines versionnées, soit pas enregistrés du tout. Les deux approches présentent des avantages et des inconvénients (voir d'autres articles de blog). Lorsqu'ils sont enregistrés, ces composants sont versionnés et peuvent être déployés. Leurs instances peuvent être découvertes ou fédérées à travers les environnements d'infrastructure ou cloud.
