---
title: "Comment mettre en œuvre un processus Joiner, Mover et Leaver ?"
excerpt: "Voici une vue d’ensemble intégrée de la manière dont votre entreprise gérera les processus Joiner, Mover et Leaver (JML), en s’appuyant sur Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP et ServiceNow, tout en couvrant l’ensemble des éléments demandés."
source: "c1d6e33e30fd7ca2"
---

Voici une vue d’ensemble intégrée de la manière dont votre entreprise gérera les **processus Joiner, Mover et Leaver (JML)**, en s’appuyant sur **Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP et ServiceNow**, tout en couvrant l’ensemble des éléments demandés.

* * *

## **1\. Processus Joiner (onboarding)**

### **1.1 Déclenchement du processus**

-   **Personnel permanent :**
    -   Workday fait office de **source de vérité** pour les données de référence RH.
    -   Une fiche de nouvel arrivant est créée dans Workday, avec le rôle, le site et la classification du poste.
    -   Saviynt récupère les informations de l’utilisateur depuis Workday pour la gouvernance des identités et la gestion des accès (IGA).
    -   Azure AD provisionne les comptes d’identité de base (messagerie, SSO).
-   **Personnel externe (prestataires) :**
    -   Géré directement via **Saviynt**, intégré à ServiceNow pour les demandes d’accès et la gestion du cycle de vie.
    -   Les informations sur le personnel externe (par exemple durée du contrat, rôle) sont stockées dans Saviynt.

### **1.2 Provisionnement IT et des actifs**

-   **Gestion des identités et des accès :**
    -   Saviynt gère le contrôle d’accès basé sur les rôles (RBAC) et veille à ce que seuls les droits nécessaires soient attribués.
    -   Azure AD gère l’authentification et le provisionnement des accès aux systèmes de l’entreprise.
-   **Gestion des appareils :**
    -   **Intune** gère les appareils Windows.
    -   **JAMF** gère les appareils macOS et iOS.
    -   Les appareils sont provisionnés avec les logiciels standard de l’entreprise tels que Microsoft Office 365, les clients VPN, les outils de collaboration (par exemple Teams, Slack) et les outils de sécurité (par exemple antivirus, protection des terminaux).
-   **Achats :**
    -   Les appareils sont achetés via **Ariba** (fournisseurs référencés au niveau de l’entreprise).
    -   Les achats locaux passent par des fournisseurs régionaux agréés.
-   **Enregistrement des actifs :**
    -   **ServiceNow Asset Management (ITAM)** tient à jour les enregistrements de tous les actifs IT.
    -   La **base de données de gestion des configurations (CMDB) de ServiceNow** enregistre les détails de configuration des appareils.
    -   Les actifs non IT (par exemple voitures, vélos, badges d’accès aux locaux, clés) sont également enregistrés dans **ServiceNow**, sous Facilities Management ou dans la CMDB.

### **1.3 Conformité et politiques**

-   Les politiques et les droits relatifs au matériel comme aux logiciels sont stockés et gouvernés via :
    -   **Saviynt (politiques d’accès)**
    -   **ServiceNow (gestion du cycle de vie des actifs et approbations)**

### **1.4 Refacturation des coûts**

-   **Coûts IT :**
    -   L’achat des appareils et les licences logicielles sont refacturés via les workflows d’achat d’**Ariba** et les affectations aux centres de coûts dans Workday.
    -   Les coûts du personnel externe sont traités via la paie **ADP** (pour les paiements) et **Ariba** (pour le suivi des achats et des factures fournisseurs).

### **1.5 Activation des comptes et des tickets**

-   **ServiceNow :** assure le suivi de toutes les tâches et de tous les tickets d’onboarding (par exemple livraison des actifs, création des comptes).
-   La responsabilité des tâches d’onboarding est attribuée aux services concernés (IT, services généraux, RH).

* * *

## **2\. Processus Mover (changements de rôle, promotions, mutations)**

### **2.1 Mises à jour de rôle et mutations**

-   **Personnel permanent :**
    -   Workday déclenche les mises à jour de rôle, les changements de site et les mutations entre services.
    -   Saviynt ajuste les droits d’accès en fonction des nouveaux rôles.
    -   Azure AD met à jour les appartenances aux groupes et les droits SSO.
-   **Personnel externe :**
    -   Géré via Saviynt et ServiceNow.
    -   Les modifications d’accès sont traitées via Saviynt, avec des workflows d’approbation.

### **2.2 Mises à jour des actifs**

-   Les actifs IT et physiques sont mis à jour via les workflows **ServiceNow ITAM/CMDB**.
-   Les appareils peuvent nécessiter un nouveau provisionnement via **Intune (Windows)** ou **JAMF (macOS)**.
-   Les actifs liés aux locaux (par exemple espaces de bureau, autorisations de stationnement, badges d’accès) sont mis à jour dans **ServiceNow Facilities Management**.

### **2.3 Ajustements logiciels**

-   Les droits logiciels basés sur les rôles (par exemple licences, accès VPN) sont mis à jour automatiquement par Saviynt et déployés via :
    -   **Intune** (appareils Windows)
    -   **JAMF** (appareils Mac)

### **2.4 Conformité et audits**

-   Saviynt veille au respect des processus de revue et de recertification des accès.
-   ServiceNow conserve les journaux d’audit des approbations et des modifications.

### **2.5 Refacturation**

-   Les modifications des ressources IT ou des licences sont mises à jour dans **Ariba** et imputées aux centres de coûts appropriés.

### **2.6 Tâches et tickets en cours**

-   Les tickets et tâches existants sont réaffectés via les workflows **ServiceNow**.

* * *

## **3\. Processus Leaver (offboarding)**

### **3.1 Déclenchement de l’offboarding**

-   **Personnel permanent :**
    -   Workday déclenche les workflows de fin de contrat.
    -   Saviynt désactive les droits d’accès et révoque les habilitations.
    -   Azure AD désactive les comptes et supprime les accès SSO.
-   **Personnel externe :**
    -   Géré via les workflows Saviynt et ServiceNow.
    -   ServiceNow déclenche des workflows de tickets pour les équipes IT et services généraux.

### **3.2 Récupération des actifs**

-   **ServiceNow ITAM :** assure le suivi et la gestion de la restitution des actifs IT (par exemple ordinateurs portables, téléphones mobiles).
-   **ServiceNow Facilities Management :** gère la restitution des actifs non IT (par exemple clés, badges).

### **3.3 Récupération des licences logicielles**

-   Les licences logicielles sont révoquées via :
    -   **Intune** (Windows)
    -   **JAMF** (macOS)
    -   Puis enregistrées et mises à jour dans la **CMDB ServiceNow**

### **3.4 Règlements financiers**

-   Les paiements fournisseurs en suspens sont traités via **Ariba**.
-   La clôture de la paie s’effectue via **ADP** pour le personnel permanent.

### **3.5 Conformité et audits**

-   Les audits d’accès finaux sont réalisés dans **Saviynt**.
-   ServiceNow enregistre l’achèvement des tâches d’offboarding et la restitution des actifs.

### **3.6 Refacturation**

-   Les coûts finaux de récupération des actifs et les ajustements de licences sont refacturés via **Ariba**.

* * *

## **4\. Gestion des politiques et des droits**

### **4.1 Stockage et maintenance**

-   **Saviynt :** politiques d’accès, droits basés sur les rôles.
-   **CMDB ServiceNow :** politiques de cycle de vie des actifs et de configuration.
-   **ServiceNow ITAM :** droits sur les actifs, politiques de cycle de vie.
-   **Workday :** rattachements aux centres de coûts, politiques RH.

### **4.2 Audit et conformité**

-   **Saviynt et ServiceNow :** revues d’accès régulières et contrôles de conformité.
-   **Intune et JAMF :** conformité des appareils et application des politiques de sécurité.

* * *

## **5\. Tableau récapitulatif**

| **Étape du processus** | **Source de vérité** | **Identité/accès** | **Gestion des actifs** | **Déploiement logiciel** | **Coûts et facturation** |
| --- | --- | --- | --- | --- | --- |
| **Joiner** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |
| **Mover** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba |
| **Leaver** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |

* * *

## **6\. Tickets en cours et transfert de responsabilité**

-   **Actifs logiques (comptes, rôles, workflows) :** gérés via **Saviynt et ServiceNow**.
-   **Actifs physiques :** gérés et suivis via **ServiceNow ITAM/CMDB**.
-   **Tickets en cours :** réaffectés dans les workflows **ServiceNow**.

Cette approche intégrée permet à chaque outil d’exploiter pleinement ses points forts, tout en garantissant clarté, conformité et efficacité tout au long du **cycle de vie Joiner, Mover et Leaver**.
