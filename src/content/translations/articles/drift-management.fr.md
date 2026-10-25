---
title: "Gestion de la dérive de configuration : pourquoi c'est important, qui en a besoin et comment bien s'y prendre"
excerpt: "Les environnements IT tombent rarement en panne à cause d'un seul événement spectaculaire. Le plus souvent, ils se dégradent lentement : un paramètre de configuration discrètement modifié, une règle de pare-feu ajoutée « juste pour tester », une VM redimensionnée sans documentation, une clé de registre modifiée par un ingénieur pressé dans"
source: "10495e80de7ddf01"
---

Les environnements IT tombent rarement en panne à cause d'un seul événement spectaculaire. Le plus souvent, ils se dégradent lentement : un paramètre de configuration discrètement modifié, une règle de pare-feu ajoutée « juste pour tester », une VM redimensionnée sans documentation, une clé de registre modifiée par un ingénieur pressé. Pris isolément, rien de grave. Cumulés, c'est fatal. Cette érosion insidieuse, c'est la **dérive de configuration** (configuration drift) — et si elle n'est pas maîtrisée, elle compromet la sécurité, la stabilité, l'auditabilité et la santé mentale des ingénieurs. Cet article explique ce qu'est la gestion de la dérive, en quoi elle profite aux organisations et ce dont vous avez réellement besoin pour la mettre en œuvre efficacement.

## 1\. Qu'est-ce que la dérive exactement — et pourquoi se produit-elle ?

La **dérive de configuration** survient lorsque l'*état réel* de l'infrastructure s'écarte de son *état documenté ou prévu*.  
Elle touche les serveurs on-premise, les ressources cloud, les réseaux, les conteneurs, les postes de travail des utilisateurs — bref, tout.

La dérive apparaît généralement à cause de :

-   Correctifs d'urgence qui ne sont jamais annulés
-   Modifications manuelles effectuées en dehors du change management
-   Scripts d'automatisation qui s'écrasent mutuellement
-   Ingénieurs disposant de droits élevés qui font « juste une petite mise à jour »
-   Écarts entre environnements (DTAP) qui se creusent avec le temps
-   Correctifs ou mises à jour fournisseurs qui modifient les paramètres par défaut

Autrement dit : un décalage entre *la façon dont nous pensons que les systèmes sont configurés* et *la façon dont ils se comportent réellement*.

## 2\. Pourquoi s'en soucier ? (Une liste étonnamment longue)

### Équipes sécurité

La dérive ouvre la porte aux erreurs de configuration — l'une des causes profondes les plus fréquentes des violations de sécurité actuelles.  
La visibilité sur la dérive soutient directement des référentiels tels que DORA, SOC 2, ISO 27001 et NIST 800-53.

### Équipes d'exploitation

Des différences inattendues entre serveurs ou environnements provoquent souvent des déploiements ratés, des applications instables et le scénario bien connu  
« ça marche en DEV mais pas en PROD ».

### Auditeurs et gestion des risques

La gestion de la dérive fournit exactement ce que veulent les auditeurs : traçabilité, preuves, maîtrise et reproductibilité.

### Architectes et platform engineers

Des baselines fiables empêchent l'entropie architecturale.  
Si chaque environnement mute lentement, vous n'exploitez plus une plateforme — vous gérez un zoo.

## 3\. Comment gérer la dérive ? (L'approche pratique)

Une gestion efficace de la dérive ne se résume pas à un seul outil. C'est une **capacité** qui repose sur quatre piliers :

### Pilier 1 : une baseline de confiance

Il vous faut une définition claire de l'état prévu — modèles de construction de serveurs, configurations réseau, politiques cloud, manifestes applicatifs, etc.  
Pas de baseline = pas de détection de dérive.

### Pilier 2 : une collecte de données continue

Il faut de la télémétrie sur les paramètres du système d'exploitation, les logiciels, les packages, les ressources VM/cloud, les équipements réseau, les politiques IAM, et plus encore.  
Les sources peuvent inclure des agents (Tanium), des outils de gestion de configuration, ServiceNow ITOM Discovery, SCCM/Intune, SCVMM, des API cloud ou des scripts.

### Pilier 3 : une comparaison intelligente

Comparez l'état prévu à l'état réel. Classez la dérive en changements attendus, changements tolérés mais non conformes, dérive critique ou dérive présentant un risque de sécurité.  
La réduction du bruit est essentielle.

### Pilier 4 : remédiation et gouvernance

Détecter la dérive n'est qu'un début — l'essentiel, c'est de la corriger.  
Automatisation, approbations, corrections manuelles ou exceptions limitées dans le temps ont toutes leur rôle à jouer.  
L'intégration avec le change management, la CMDB, la CI/CD et les processus de sécurité est déterminante.

## 4\. Qui est réellement responsable de la gestion de la dérive ?

La responsabilité est généralement partagée entre plusieurs équipes :

-   **Plateforme/Exploitation :** maintenir les baselines
-   **Sécurité :** définir les règles de conformité
-   **DevOps/Automatisation :** imposer l'état souhaité
-   **Change & Configuration Management :** gouvernance
-   **Audit/Risques :** validation et supervision

## 5\. Quels outils peuvent aider ?

La capacité de gestion de la dérive est généralement répartie entre plusieurs solutions :

-   Tanium pour la visibilité sur la configuration des postes et serveurs
-   ServiceNow ITOM Discovery pour l'état de l'infrastructure
-   Azure Policy, AWS Config, GCP Config Sync
-   Ansible, Puppet, Chef pour l'application des configurations
-   GitOps pour la configuration déclarative
-   SIEM/SOAR pour l'acheminement des alertes et la réponse automatisée

## 6\. Les bénéfices

-   **La conformité réglementaire s'améliore**
-   **La stabilité opérationnelle augmente**
-   **La posture de sécurité se renforce**
-   **Le gaspillage cloud diminue**
-   **Les ingénieurs dorment mieux** (moins de chaos)

## Conclusion

La gestion de la dérive n'a rien de glamour, mais c'est l'une des pratiques les plus simples et les plus efficaces qu'une organisation puisse adopter. Dans un monde rempli d'automatisation, de complexité et de changements permanents, l'environnement dérive en permanence. La question est : **vous en apercevez-vous avant que quelque chose ne casse ?**

\`\`\`

body {<br /> font-family: Arial, sans-serif;<br /> max-width: 900px;<br /> margin: 0 auto;<br /> line-height: 1.6;<br /> }<br /> h1, h2, h3 {<br /> color: #333;<br /> }<br /> h1 {<br /> margin-top: 40px;<br /> }<br /> p {<br /> margin: 12px 0;<br /> }<br /> ul {<br /> margin: 10px 0 20px 20px;<br /> }<br />
