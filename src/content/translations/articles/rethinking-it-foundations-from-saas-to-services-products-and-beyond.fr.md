---
title: "Repenser les fondations de l'IT : du SaaS aux services, aux produits et au-delà"
excerpt: "Depuis des années, nous nous appuyons sur des concepts comme le SaaS, le PaaS, l'IaaS et le DCaaS pour décrire la manière dont la technologie est fournie. Ces termes existent toujours, mais ils ne rendent plus pleinement compte de la réalité actuelle. Pourquoi ? Parce que les plateformes deviennent software-defined, que les prompts d'IA remplacent le code logiciel"
source: "b8470d7c67392184"
---

Depuis des années, nous nous appuyons sur des concepts comme le **SaaS, le PaaS, l'IaaS et le DCaaS** pour décrire la manière dont la technologie est fournie. Ces termes existent toujours, mais ils ne rendent plus pleinement compte de la réalité actuelle.

Pourquoi ? Parce que **les plateformes deviennent software-defined, que les prompts d'IA remplacent le code logiciel**, **et que l'information est dispersée dans de multiples référentiels**, chacun répondant aux besoins distincts de différents types de parties prenantes. Pour maîtriser cette complexité, nous avons besoin d'un regard plus précis et d'un langage commun pour ce que nous partageons.

* * *

### Baselines et instances : deux mondes différents

Dans l'IT moderne, il est essentiel de distinguer les **éléments déployables (baselines)** des **éléments déployés (instances) :**

-   **Baselines** : là où se prennent les décisions de stratégie, de cycle de vie et de roadmap.
    
-   **Instances** : copies actives et détectables des baselines, qui héritent des propriétés de leur baseline et de leurs tags.
    

Une baseline peut avoir de nombreuses instances, mais une instance appartient toujours à une seule et unique baseline.

* * *

### Les produits ne sont pas des services

Trop souvent, nous considérons les **produits** et les **services** comme interchangeables. Ils ne le sont pas.

-   Les **produits** relèvent d'un *product owner* et se composent d'un ensemble de **composants** documentés : logiciels, scripts, prompts d'IA, API, plugins, configurations, etc. Les produits sont définis, développés et enrichis par (des équipes d')une organisation interne ou par un éditeur/fabricant. Pour que tout reste bien organisé, les produits — par définition — ne sont pas consommés.
    
-   Les **services** relèvent d'un *service owner* et sont fournis/supportés par (des équipes d')un fournisseur de services. Les engagements, droits d'accès et abonnements se définissent sur un service, et non sur un produit. Les services sont consommés par ceux qui disposent de droits ou d'un abonnement à ce service.
    

La logique de gestion diffère : les produits évoluent par **versions majeures**, tandis que leurs composants évoluent en continu ; leurs **versions mineures** sont suivies dans les pipelines DevSecOps, et leurs instances alimentent la CMDB en tant que configuration items. Les services, eux, **ne sont pas versionnés** tout au long de leur cycle de vie.

Les entreprises gèrent à la fois des portefeuilles de services et des portefeuilles de produits. Les portefeuilles de services comprennent les services fournis (en interne ou en externe) à l'entreprise. Les portefeuilles de produits regroupent les produits numériques susceptibles d'être déployés dans/sur l'infrastructure de l'entreprise, ainsi que les produits qui constituent cette infrastructure et les outils servant à la gérer. Définissez/utilisez des portefeuilles de produits distincts pour chaque tour technologique et/ou pour chaque domaine métier (propriétaire). Pour les produits développés en interne, utilisez des référentiels de composants propres à chaque technologie ou plateforme, intégrés aux pipelines de déploiement/provisionnement de l'entreprise.

* * *

### Configuration items : la couche opérationnelle

Les configuration items (CI) sont des instances de baselines. En général, les CI sont des instances détectables de composants, même si des instances de services, d'offres et de produits peuvent également être considérées comme des CI. Les caractéristiques techniques et les dépendances des CI sont généralement détectables techniquement. Les CI héritent des attributs — en particulier des valeurs d'attributs gérés — de leur baseline. Par exemple, si le propriétaire d'une baseline produit est modifié, toutes les instances (des composants) de ce produit devraient changer automatiquement, sans qu'il soit nécessaire d'ouvrir un change ou de redéployer le CI.

Les CI peuvent être tagués. Un **tag** fournit une valeur pour une **clé** donnée sur un CI spécifique. Par exemple, la clé « Environment » de ce CI a la valeur « Production », et la clé « GitLabID » de cet autre CI a la valeur « e83c5163316f89bfbde7d9ab23ca2e25604af290 ». Les tags ne doivent pas contenir de valeurs d'attributs gérées/autorisées via des processus formels (par exemple la classification DIC, la propriété, la criticité métier, etc.). Les tags sont déployés en même temps que le CI tagué et sont considérés comme faisant partie intégrante de celui-ci. La mise à jour d'un tag d'un CI est considérée comme une mise à jour du CI lui-même, c'est-à-dire via un redéploiement (du tag) du CI. Les tags peuvent être hérités ; par exemple, si une instance de resource group cloud est taguée, ses tags s'appliquent à toutes les instances de ressources cloud plus fines de ce groupe, sans qu'il soit nécessaire de taguer chacune d'elles séparément.

* * *

### Assets : la couche financière

Viennent ensuite les **assets** — des équipements ou licences uniques ayant une valeur monétaire, souvent liés à un utilisateur, un centre de coûts, une société, une région ou un site. Contrairement aux produits ou aux services, les assets existent avant tout à des fins de **suivi, de conformité et de responsabilité financière (CAPEX/OPEX).**

**Les modèles d'assets ne sont pas des baselines produit** ; ce sont des représentations figées de ce que l'entreprise possède/utilise. Par exemple, « Microsoft Visio 2011 Professional » est un modèle d'asset, dont une entreprise peut déployer des milliers d'instances sous licence. Enregistrer chacune d'elles comme une instance de service distincte n'est ni pratique ni souhaitable. Elles sont plutôt enregistrées comme des instances logicielles. Non seulement l'instance logicielle, mais aussi son modèle, sont détectés automatiquement. Il en va de même pour le matériel : les instances matérielles comme leurs modèles sont détectés automatiquement.

Les assets peuvent être achetés à l'extérieur à l'unité (par exemple par article) ou en lot (par exemple par palette). Les assets relèvent d'un type/modèle et sont généralement associés à des utilisateurs et/ou des sites. Certaines entreprises enregistrent quels assets faisaient partie de quel bon de livraison, afin de pouvoir rendre compte en détail de la localisation de leurs investissements. Tout ce qui est acheté n'a pas vocation à être enregistré comme asset. Par exemple, les consommables ou les articles de faible valeur en euros ne sont pas enregistrés, surtout si leur localisation/statut ne fait pas l'objet d'un suivi.

* * *

### Services et offres de service

Un **service** est une boîte noire lorsque le fournisseur possède les produits ou assets consommés. Lorsque c'est l'entreprise consommatrice qui les possède, le service relève davantage d'une **activité de gestion** du fournisseur de services. Dans les deux cas, la propriété et la responsabilité des services, ainsi que des produits/assets supportés, sont déterminantes.

Pour établir des distinctions au sein des services, nous utilisons des **offres de service** (service offerings) : des variantes d'un service assorties d'engagements spécifiques. Par exemple, les environnements de production et hors production peuvent constituer des offres distinctes. Les services comme les offres de service sont des baselines, et ils sont liés (directement ou indirectement) aux instances qu'ils couvrent/supportent. Il est considéré comme une bonne pratique de taguer les CI avec l'offre qui les couvre (eux et leurs enfants).

* * *

### Instances de service

Enfin, les **instances de service** sont les points d'accès des produits instanciés plusieurs fois, par exemple une instance d'un même produit par zone géographique ou par organisation, ou une instance pour chaque environnement, respectivement Développement, Test, Acceptation et Production.

Exemples :

-   Un produit SaaS Workday est découpé en instances de service de Développement, de Test et de Production.
    
-   Un tenant Azure ou un compartiment OCI est une instance de service d'un produit de cloud public plus large.
    
-   L'URL d'un portail ou d'une API est une instance de service (d'un produit) que peuvent utiliser une ou plusieurs offres de service.
    

En règle générale, les **instances de service** **constituent** **des points de départ définis pour la découverte** **et la supervision opérationnelle,** et sont les points de démarcation des services/offres.

* * *

### Vue d'ensemble

Les entreprises doivent aujourd'hui repenser leurs structures IT en distinguant **baselines et instances**. Concrètement, cela implique des niveaux de gouvernance, des outils et des responsabilités différents :

-   **Baselines produit** → Gouvernées dans les outils de gestion de portefeuille
    
-   **Baselines composant** → Gouvernées dans les outils DevSecOps / SCM
    
-   **Baselines service** → Gouvernées dans le Service Portfolio Management
    
-   **Baselines offre de service** → Gouvernées dans le Service Portfolio Management
    
-   **Instances de service** → Gouvernées dans l'IT Operations Management
    
-   **Instances d'asset** → Gouvernées dans l'IT Asset Management
    
-   **Instances de CI** → Détectées automatiquement, enregistrées dans la CMDB
    
-   **Tags de CI** → Déployés avec le CI, fournissant des informations non techniques pour (les utilisateurs de) la CMDB.
    

* * *

### Conclusion

Les anciennes étiquettes — SaaS, PaaS, IaaS — restent des raccourcis utiles, mais elles ne décrivent plus la réalité d'entreprises software-defined, pilotées par l'IA et intégrées autour des services. **Nous ne devrions plus nous focaliser sur la définition du type de ce qui est fourni en tant que service, mais plutôt garder à l'esprit que chaque produit est (ou doit être) proposé en tant que service, soit individuellement, soit comme partie intégrante d'un ensemble plus large de services.**

L'avenir appartient à ceux qui comprennent la distinction entre baselines et instances, respectivement pour les produits, les composants, les assets, les services et les offres — et qui savent gouverner chacun avec les bonnes personnes, les bons processus et les bons outils. Le type de produit, de composant, d'asset ou de service concerné ne devrait pas avoir d'importance, tant que chaque type d'artefact est géré/gouverné de manière similaire (de légères variations propres à chaque type sont acceptables). **Idéalement, les baselines devraient être définies/enregistrées/maintenues par les personnes, et les instances déployées/détectées/enregistrées par la technologie.**
