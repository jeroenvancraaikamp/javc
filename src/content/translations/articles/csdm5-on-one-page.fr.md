---
title: "CSDM5 sur une page"
excerpt: "Tout le monde n'a pas le temps de lire un long livre blanc ou de parcourir d'interminables diapositives PowerPoint. Cet article propose un article de connaissance qui décrit les artefacts clés et explique comment les classer et les gouverner conformément à CSDM5. A"
source: "09aca2e815259602"
---

Tout le monde n'a pas le temps de lire un long livre blanc ou de parcourir d'interminables diapositives PowerPoint. Cet article propose un article de connaissance qui décrit les artefacts clés et explique comment les classer et les gouverner conformément à CSDM5.

### **PORTEFEUILLE STRATÉGIQUE ET ARCHITECTURE**

Une Business Capability (par exemple « Contract Management ») est une fonction stratégique réalisée par le ou les actifs de portefeuille qui la gouvernent : la ou les **Business Applications**. Une Business Application est le système conceptuel qui s'interface avec d'autres Business Applications et dont le cycle de vie et les évaluations sont gérés par l'Application Owner. Une application peut **se composer d'Application Components ou de modules versionnés** pouvant être déployés séparément.

**Les packages installés sur PC/mobile** (y compris les systèmes d'exploitation (OS), les pilotes de périphériques, les stratégies et les extensions de navigateur) **ne sont pas des Business Applications**. Ils sont modélisés comme des produits déployés d'un modèle de produit versionné connu, faisant partie intégrante des fonctionnalités de l'utilisateur final fournies en tant que service. Les produits installés sur PC/téléphone sont exemptés du change management formel, des évaluations, de la BC/DR et des autres pratiques qui s'appliquent aux Business Applications.

**Les solutions IT4IT hébergées** sont enregistrées en tant que **Technical Applications** qui fournissent des **Technical Capabilities**. Il est recommandé de gouverner ces Technical Applications et leurs composants de la même manière que les Business Applications et leurs composants (par exemple IAM, CIA, EA, CHG, etc.). Cela dit, les Business Service Offerings ne peuvent pas être liées à des instances de Technical Applications, et les utilisateurs métier ou les clients externes ne peuvent pas s'abonner aux Technical Service Offerings.

### **LIVRAISON ET OPÉRATIONNALISATION**

Une **Business/Technical** **Application** peut être déployée plusieurs fois, **créant ainsi des Service Instances uniques** (des environnements d'exécution spécifiques, comme « UBW \[PR\] »). Ces Service Instances peuvent dépendre de technologies sous-jacentes, qui ne sont pas des Business Applications ; les éléments technologiques sont modélisés comme des produits installés d'un modèle de produit versionné (par exemple SQL Server 2022 SP1).

**Les services** sont packagés et consommés via des **Offerings**, qui ont un propriétaire, un fournisseur, des engagements, des droits et des abonnements :

-   Une **Business Service Offering** package le résultat final destiné à **l'utilisateur métier/au client** et **dépend de** zéro ou plusieurs Service Instances de Business Applications.
-   Une **Technology Management Service Offering** package un composant informatique interne (comme « Linux Server », « SQL Server Database », « WildFly Server », « IIS Website » ou « Storage Component ») et contient une ou plusieurs Service Instances ou un ou plusieurs **groupes dynamiques de CI** qui fournissent l'offering.

### **GOUVERNANCE ET DÉPENDANCES**

Les éléments du portefeuille opérationnel peuvent s'appuyer sur la **technologie sous-jacente**, composée de **Configuration Items (CI) interdépendants** (tels que des serveurs, bases de données, réseaux et stockages déployés) qui sont généralement **découverts ou fédérés** dans la CMDB.

Un principe fondamental de CSDM est que chaque CI doit être gouverné et avoir un propriétaire : **chaque CI est contenu** (**directement ou indirectement, par exemple via un CI Grouping**) par **une Technology Management Service Offering**, afin de garantir une responsabilité claire et un support défini pour chaque composant technique géré.

Les instances SAAS sont des boîtes noires qui incluent la technologie sous-jacente de/pour l'éditeur SAAS. Autrement dit, dans CSDM, elles ne sont pas liées à une technologie sous-jacente.

## **CLASSIFICATION DES PRODUITS NUMÉRIQUES**

Les produits numériques sont classés en fonction du consommateur et de la fonction :

<table class="x_MsoNormalTable" border="1" width="100%" cellspacing="3" cellpadding="4"><tbody><tr><td width="386"><p class="x_MsoNormal"><b><i>Condition du produit</i></b><i></i></p></td><td width="413"><p class="x_MsoNormal"><b><i>Classification CSDM</i></b><i></i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SI</i></b><i> le produit est un PC ou un téléphone, ou est installé dans/sur l'un d'eux.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Un End-User Package contient des produits d'un Product Model donné d'un fabricant donné</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SINON SI</i></b><i> le produit est une partie/un module contenu par une Business ou Technical Application.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Application Component, souvent déployé via un pipeline CI/CD</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SINON SI</i></b><i> le produit est un produit destiné aux utilisateurs métier.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Une instance d'une Business Application ou une instance d'un Business Service.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SINON SI</i></b><i> le produit est un service orienté métier.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Business Service/Offering qui dépend d'une ou plusieurs Service Instances.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SINON SI</i></b><i> le produit est un Technical Service</i></p></td><td width="413"><p class="x_MsoNormal"><i>Technical Service/Offering.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SINON SI</i></b><i> le produit sous-tend une Business/Technical Application.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Une instance (d'un Product Model) contenue par une Technology Management Service/Offering.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SINON SI</i></b><i> le produit est un produit destiné aux utilisateurs techniques (par exemple un outil technique tel qu'Intune ou SCVMM)</i></p></td><td width="413"><p class="x_MsoNormal"><i>Une instance d'une Technical Application contenue par une Technology Management Service/Offering.</i></p></td></tr></tbody></table>

*Remarque : la propriété de la technologie sous-jacente revient au propriétaire qui propose l'infrastructure sous-jacente en tant que service. Par exemple, les hôtes Hyper-V et le réseau sont fournis par l'Infra, et non par le propriétaire de la Business Application qui en dépend.*
