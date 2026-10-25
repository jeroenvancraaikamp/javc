---
title: "ITOM, Certificate Management"
excerpt: "Dans le cadre du produit ServiceNow ITOM Discovery, ServiceNow propose une fonctionnalité complète de Certificate Management. Celle-ci vise à offrir aux organisations visibilité, contrôle et automatisation sur l'ensemble du cycle de vie des certificats, tout en maintenant une CMDB exacte et à jour."
source: "398edcdb6d5340b0"
---

Dans le cadre du produit **ServiceNow ITOM Discovery**, ServiceNow propose une fonctionnalité complète de **Certificate Management**. Celle-ci vise à offrir aux organisations visibilité, contrôle et automatisation sur l'ensemble du cycle de vie des certificats, tout en maintenant une CMDB exacte et à jour.

### Fonctionnalités principales

ServiceNow Certificate Management prend en charge les fonctions clés suivantes :

-   **Découverte et fédération des certificats**, qui sont enregistrés comme Configuration Items (CI) dans la CMDB, avec des références aux emplacements où ils sont déployés
-   **Surveillance des expirations**, avec détection des certificats arrivant bientôt à échéance, ainsi qu'attribution et suivi automatiques des tâches de renouvellement, notifications par e-mail comprises
-   **Gestion des demandes via le catalogue**, permettant aux utilisateurs de demander, d'approuver, de renouveler ou de révoquer des certificats au moyen de workflows standardisés
-   **Renouvellement automatisé des certificats**, grâce à une automatisation pilotée par workflows lorsque c'est possible
-   **Génération d'événements** (lorsque ITOM Health est sous licence), avec création d'événements en cas de détection de problèmes ou de défaillances liés aux certificats

Grâce à ITOM Visibility, les certificats sont automatiquement alimentés et mis à jour en continu dans la CMDB, ce qui soutient une approche de gestion des données *zero-touch*.

### Méthodes de détection des certificats

La découverte des certificats peut s'effectuer selon une ou plusieurs des méthodes suivantes :

#### 1\. Scan des ports TCP

Les certificats sont détectés en scannant les ports TCP sur lesquels ils sont exposés. Cette approche nécessite :

-   Des ports TCP découvrables
-   Des MID Servers en place
-   Des accès firewall configurés en conséquence

La découverte des ports est généralement réalisée après la découverte des équipements IP du réseau.

#### 2\. Découverte par URL

Les certificats peuvent être détectés en interrogeant des URL connues qui les utilisent. Cette méthode est particulièrement utile pour :

-   Les applications SaaS non découvrables par ITOM Discovery
-   Les sites web externes ou les systèmes partenaires dont votre organisation dépend

#### 3\. Fédération depuis les autorités de certification

Les certificats peuvent être fédérés depuis une ou plusieurs autorités de certification (comme DigiCert, GoDaddy, Microsoft, Entrust ou Let’s Encrypt). Si cette méthode ne révèle pas où un certificat est déployé, elle fournit néanmoins des informations précieuses sur :

-   Les certificats existants
-   Leur émetteur
-   Leur date d'expiration

### Représentation dans la CMDB et tableaux de bord

Les certificats détectés sont enregistrés comme CI dans la CMDB et comportent des attributs tels que le fournisseur et la date d'expiration.

ServiceNow ITOM Visibility propose un **Certificate Management Dashboard** dédié, qui donne une vision sur :

-   Le nombre total de certificats utilisés
-   Les certificats arrivant à expiration dans une fenêtre de temps configurable
-   Le statut et le volume des tâches de renouvellement manuel
-   Les workflows automatisés déclenchés pour le renouvellement des certificats

### Remarques et considérations opérationnelles

-   Si les artefacts IT sont habituellement provisionnés via des **pipelines CI/CD, des outils DevOps ou des API,** il est recommandé d'aligner les demandes de renouvellement de certificats sur ces mêmes canaux
-   Aujourd'hui, l'émission de certificats renouvelés est couramment automatisée et généralement encadrée par un **Standard Change** pré-approuvé plutôt que par un **Normal Change.**
