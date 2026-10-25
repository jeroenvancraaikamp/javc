---
title: "Change Management vs CSDM5"
excerpt: "Le processus de Change Management Out-of-the-Box de ServiceNow, tel qu'inclus dans la release Zurich, est une variante d'ITIL V3. Cet article explique en détail comment configurer le processus de changement pour qu'il fonctionne de manière fluide avec DevSecOps, en s'appuyant sur les relations CSDM5 recommandées. Ensuite, les utilisateurs n'ont pas"
source: "184773c52b995380"
---

Le processus de Change Management Out-of-the-Box de ServiceNow, tel qu'inclus dans la release Zurich, est une variante d'ITIL V3. Cet article explique en détail comment configurer le processus de changement pour qu'il fonctionne de manière fluide avec DevSecOps, en s'appuyant sur les relations CSDM5 recommandées. Ensuite, les utilisateurs n'ont plus besoin d'être des data analysts pour utiliser les données CSDM dans le change management comme prévu. Les utilisateurs ne peuvent sélectionner que les Services, Offerings, Instances et CI qui entrent dans le périmètre du Change Mngt, ce qui garantit que le processus de Change Mngt ne gère et ne communique que les changements pertinents.

La configuration recommandée repose sur les hypothèses suivantes :

1.  L'architecture métier et l'architecture IT sont définies et gouvernées par des architectes et des business analysts.
2.  L'entreprise s'appuie sur des pratiques DevSecOps agiles pour construire ses solutions, utilise des outils SCM pour enregistrer le code (versionné) et des pipelines CI/CD pour l'intégrer et le déployer.
3.  L'équipe DevSecOps utilise plusieurs outils pour observer et orchestrer les environnements d'exécution et détecter les vulnérabilités et les failles de sécurité.
4.  Les applications et l'infrastructure sont fournies en tant que service. Les Services, Service Offerings et Service Instances sont enregistrés via Digital Portfolio Management.
5.  La localisation et le statut des actifs physiques achetés, réceptionnés, stockés, installés ou retirés sont enregistrés via Asset Management.
6.  Les Configuration Items stables sont découverts et fédérés quotidiennement. L'inventaire et les mises à jour sont automatiquement enregistrés dans la CMDB Zero-touch.
7.  Les dégradations de service (signalées ou détectées) sont résolues et communiquées. Les demandes sont traitées. Le support et la connaissance sont fournis.

L'entreprise souhaite **utiliser le Change Management pour gérer/maîtriser les risques et l'impact de la mise en production d'incréments** par des fournisseurs de services ou des éditeurs.  
Le processus de Change Management commence par une demande de mise en production d'incréments potentiels. Le changement est clôturé lorsqu'il est confirmé que l'incrément est opérationnel en production.

Certains éléments sont **légèrement différents de la pratique ITIL3/4** :

-   Une demande de changement peut être émise via des outils DevSecOps plutôt que directement par des demandeurs humains.
-   Une partie de ce qui est mis en production via des outils CI/CD ne nécessite plus d'approbation de changement.  
    Une telle mise en production doit néanmoins être enregistrée (en tant que Standard change) pour des raisons de visibilité.
-   Une mise à jour orchestrée de la configuration n'est plus gouvernée par le change management.
-   Les outils DevSecOps peuvent demander si la mise en production demandée est approuvée.
-   La mise à jour d'un élément de la CMDB, d'un actif ou d'un élément du portefeuille n'est pas (ou plus) déclenchée/gérée par un changement.
-   Les modifications découvertes dans l'infrastructure peuvent servir à vérifier si le changement a été mis en production avec succès.

En standard (Out of the Box), on peut créer une demande de changement, la relier à un Service, à un Service Offering et à un CI, et l'affecter à n'importe quel groupe d'affectation. **Les relations entre les artefacts CSDM ne sont ni vérifiées ni imposées.** Aucune limite n'existe quant aux éléments pouvant être associés à un changement. Il est recommandé de procéder à quelques adaptations de configuration afin que :

**Les changements soient obligatoirement liés à un Service Offering.** Le groupe d'affectation (initial), le groupe d'approbation et le Technical Mgmt Service sont dérivés du Service Offering. Certains souhaiteront afficher la relation historique entre l'Offering et son Service parent (en renseignant l'attribut service dans le changement) ; d'autres préféreront afficher la relation avec son Service parent actuel (en affichant le parent actuel de l'offering sur le formulaire). Dans les entreprises qui comptent des centaines de Service Offerings et n'utilisent pas d'abonnements, les utilisateurs risquent de ne pas pouvoir trouver ou sélectionner facilement l'offering adéquat. Pour celles-ci, une petite personnalisation est recommandée afin que, lors du choix d'un service offering, les utilisateurs puissent saisir une partie du nom du service ou une partie du nom du nœud de la taxonomie et sélectionner facilement l'offering approprié. Par exemple, lorsque l'utilisateur saisit « \*server », tous les nœuds, services et service offerings dont le nom contient « server » s'affichent.

Je conseille généralement à ceux qui utilisent CSDM5 de créer des Technology Mgmt Services indépendants des produits, un ou plusieurs Service Offerings spécifiques à un produit par Service, et une ou plusieurs Service Instances spécifiques à un produit et à un environnement par Service Offering. Les Service Instances peuvent être reliées aux Configuration items dont elles dépendent. Techniquement, il est possible de déterminer par requête quelles Service Instances de production sont contenues dans les Service Offerings, et quels Configuration items sont liés à ces Service Instances.  

Aujourd'hui, **je recommande d'enregistrer la Service Instance de production impactée dans un attribut personnalisé de l'enregistrement de changement**. C'est particulièrement utile lorsque plusieurs instances de production d'un même produit fonctionnent indépendamment. Les instances SAAS ne dépendent généralement pas des piles de CI de l'entreprise. Si une entreprise dispose d'instances SAAS distinctes d'un même produit SAAS, seules les Service Instances permettent de les différencier. Autre effet secondaire positif : dans ce même attribut du changement, on peut enregistrer un Dynamic CI Group contenu dans le Service Offering (les enregistrements Dynamic CI Group sont également visibles dans la table Service Instance). Si l'utilisateur sélectionne un Dynamic CI Group, ce CI Group devient le CI sélectionné, et l'utilisateur ne doit pas pouvoir sélectionner un autre CI. Les CI du groupe sont automatiquement ajoutés à la liste associée du formulaire de changement, qui recense les CI affectés.

Si l'attribut Service Instance est renseigné avec une Service Instance de production, les utilisateurs peuvent sélectionner les CI dont l'instance dépend, même lorsque le CI a été découvert sans référence à son rôle ou à son environnement. Autrement dit, si quelqu'un relie un serveur à une Service Instance de production, il est possible de créer un changement sur ce serveur. Si ce serveur n'est associé à aucune Service Instance de production, vous ne pouvez pas créer de changement sur celui-ci via une Service Instance.

Si l'attribut Service Instance est laissé vide, on peut sélectionner un CI qui n'est pas directement lié à une Service Instance, mais qui est pertinent pour le service offering sélectionné. Par exemple, si un changement est créé pour le Service Offering « Windows Server », l'utilisateur doit pouvoir sélectionner n'importe quel enregistrement non retiré de la classe/table Windows Server. Idéalement, on ne peut sélectionner que les CI utilisés pour la production. Cela dit, certains CI réseau et stockage sont utilisés à la fois pour le développement, les tests, la recette et la production ; il doit être possible de créer des changements sur ces CI afin d'identifier un éventuel impact sur la production. Si l'entreprise dispose de nombreux offerings ne comprenant ni Service Instances ni Dynamic CI Groups, il est judicieux d'enregistrer et de maintenir la condition de filtre des CI dans l'enregistrement du Service Offering.

En définissant des abonnements pour les Service Offerings pertinents, on peut garantir que seules les personnes autorisées peuvent créer des changements sur ces Service Offerings ainsi que sur les Service Instances, Dynamic CI Groups et CI associés.

En n'autorisant les changements que sur les configuration items directement liés à des Service Instances de production, l'entreprise peut favoriser une uniformité et une cohérence fondées sur les données à l'échelle de l'entreprise. La sélection de CI similaires simplifie considérablement l'analyse d'impact et le reporting, et permet aux CAB de mieux comprendre les décisions qu'ils prennent.

La CMDB contiendra des CI granulaires tels que des sites web, des tables de base de données, des logiciels installés, des ports TCP, ainsi que les dépendances entre ces éléments. Ces données seront également utilisées par l'analyse automatisée des risques et de l'impact et seront accessibles à NOW Assist (IA), sans pour autant complexifier le processus de changement.  
  
Idéalement, les CI pertinents sont automatiquement reliés aux Service Instances qui en dépendent. Cela peut se faire en identifiant automatiquement les dépendances entre CI. Par exemple, si un site web utilise des données d'une base de données, la Service Instance liée au site web dépend vraisemblablement aussi de cette base de données. Certaines entreprises ne relieront que les serveurs aux Service Instances ; d'autres relieront les CI clés de ces serveurs aux Service Instances ; d'autres encore feront les deux. Le concept présenté ici est techniquement indépendant de ce que les entreprises relient à leurs Service Instances. Cela dit, pour de nombreuses raisons, il est recommandé de ne pas relier plus de 8 CI par Service Instance.  
  

## Vérification du changement

Une fois un changement déployé, il faut vérifier qu'il a été correctement déployé avant de pouvoir le clôturer. Certaines entreprises utilisent des Agent Client Collectors pour découvrir en temps réel ce qui est en cours d'exécution, ce qui leur permet de voir instantanément si le changement a été correctement déployé. D'autres ne découvrent leur infrastructure qu'une fois par jour et attendent le lendemain pour vérifier le changement à l'aide des données de la CMDB avant de le clôturer. D'autres encore vérifient manuellement que le changement a été correctement déployé avant de le clôturer. Chaque méthode a ses avantages et ses inconvénients. D'un point de vue métier et risques, il est sans doute judicieux de vérifier la fonctionnalité métier immédiatement après le déploiement du changement et de mettre à jour la CMDB ultérieurement via la discovery. Ceux qui le peuvent souhaiteront peut-être lancer/déclencher une discovery ad hoc sur les éléments liés au changement dès la fermeture de la fenêtre de changement.  
  
Autrement dit, ce n'est pas que la CMDB n'est pas mise à jour via un changement ; elle l'est simplement par une méthode plus moderne qui produit un résultat cohérent.
