---
title: "Fix Script pour supprimer les relations de CI obsolètes/invalides, avec option d'aperçu"
excerpt: "Les relations dans la CMDB ServiceNow peuvent facilement devenir incontrôlables, ce qui entraîne des problèmes de performance et une baisse de la qualité des données. Pour y remédier, le script ci-dessous offre un moyen sûr de nettoyer la table cmdb_rel_ci, par exemple après une mise à jour en masse du"
source: "726af2c7a6812162"
---

Les relations dans la CMDB ServiceNow peuvent facilement devenir incontrôlables, ce qui entraîne des problèmes de performance et une baisse de la qualité des données. Pour y remédier, le script ci-dessous offre un moyen sûr de nettoyer la table `*cmdb_rel_ci*`, par exemple après une mise à jour en masse de l'*Operational State* des CI ou après une suppression en masse de CI.

Comme une CMDB ServiceNow peut contenir des millions de relations, et que ces relations alimentent l'analyse d'impact, il est essentiel de garder le contenu de cette table propre. Lorsqu'un CI est supprimé, ses relations doivent l'être aussi. Si je recommande généralement de conserver les CI qui ne sont plus utilisés ou découverts, je conseille également de supprimer les relations impliquant des CI *retirés* (*retired*). Cela évite que des dépendances obsolètes n'influencent les calculs d'impact, par exemple ceux effectués par l'IA ou par les flows OOTB, et que les utilisateurs puissent sélectionner des éléments liés retirés dans les processus opérationnels.

Dans cette optique, j'applique une règle simple :

-   Chaque relation doit avoir un parent et un enfant.
-   Le parent et l'enfant doivent tous deux exister.
-   Ni le parent ni l'enfant ne peuvent être *Retired*.
-   Toutes les autres relations sont invalides et doivent être supprimées.

*Remarque : ServiceNow ne permet pas de retirer des relations, ce qui est d'ailleurs logique.*

C'est précisément ce que fait le fix script ci-dessous, et plus encore :

-   **Aperçu ou suppression****:** Contrôlez le comportement en définissant `Preview Only` sur *true* (aperçu) ou *false* (suppression).
-   **Requête ciblée****:** Identifie les relations obsolètes dont le parent ou l'enfant n'existe pas, ou dont l'operational status est *7 – Retired*.
-   **Mode aperçu****:** Génère un rapport CSV de toutes les relations invalides (avec parent, enfant et type).
-   **Mode suppression****:** Supprime les relations invalides par « lots » contrôlés de 500 afin d'éviter les timeouts ou les problèmes de performance.
-   **Récapitulatif****:** Affiche le nombre total de relations supprimées une fois l'opération terminée.
-   **Rollback****:** Les suppressions peuvent être annulées si nécessaire.

*Avertissement :*

> Ce script est fourni « en l'état », sans aucune garantie d'aucune sorte, expresse ou implicite. Vous utilisez ce script à vos propres risques. L'auteur décline toute responsabilité quant aux erreurs, problèmes, dommages ou pertes résultant de l'utilisation ou de la mauvaise utilisation de ce script.

**ASTUCE : mieux vaut prévenir que guérir**

Il est recommandé de configurer la suppression en cascade (cascade delete) sur les enregistrements cmdb\_ci, afin que les relations CMDB soient automatiquement supprimées lorsque le CI est supprimé. Cela ne fonctionne toutefois pas pour les CI retirés. Pour ce cas, ainsi que pour corriger les anomalies, vous pouvez utiliser le script ci-dessous. Si vous utilisez une release ServiceNow Vancouver ou ultérieure, vous pouvez également recourir à la fonctionnalité OOTB « [**CMDB (Relationship) Health**](https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/configuration-management/task/t_ViewRelationshipsHealth.html) ».

### Fix Script pour nettoyer les relations CMDB invalides/obsolètes :

Bien sûr, au lieu d'utiliser un script, j'aurais pu, en tant que SysAdmin, créer un simple « Delete Job » avec aperçu, mais cet article aurait alors été très court et bien ennuyeux :-) L'objectif de cet article était aussi de montrer comment l'IA peut aujourd'hui aider dans les tâches d'administration courantes, et d'évaluer l'intelligence et l'efficacité du script généré. Je sais aussi que les jours du scripting Java sont comptés ; bientôt, vous pourrez supprimer des enregistrements invalides/obsolètes à l'aide de prompts d'IA (si votre service sécurité l'autorise en production).

Quoi qu'il en soit, avec l'aide de mon nouvel ami artificiellement intelligent ChatGPT 5 PRO, j'ai généré le JavaScript suivant. Il était simple au départ, mais lorsque j'ai commencé à interroger mon ami sur les performances et la gestion des timeouts et des anomalies, le script s'est rapidement complexifié. La bonne nouvelle, c'est que le résultat obtenu est impressionnant et dépasse certains scripts que j'ai vus chez des « développeurs professionnels ».  
  
Le chemin pour y parvenir n'a cependant pas été totalement indolore. ChatGPT 5 n'a d'abord pas tenu compte des limitations de ServiceNow, et les premières itérations ne fonctionnaient pas. Toutes les relations auraient été supprimées sans la fonction d'« aperçu » que j'avais demandé d'inclure. Après un dialogue, ChatGPT et moi avons abouti à quelque chose qui fonctionne et peut être utilisé en toute sécurité dans une CMDB volumineuse.  
  
J'ai ensuite demandé à ChatGPT de documenter le script, ce qu'il a fait à merveille (voir ci-dessous).

```javascript
// Fix Script: Cleanup of invalid CMDB relationships with Execution Log Output + Progress Counter + Timer + Early Exit + Configurable Parameters
//
// By Jeroen A. van Craaikamp. www.JAvC.nl
// Revision 4.0, September 7th 2025
//
// Disclaimer:
// This script is provided as is and without any warranty or guarantee of any kind, express or implied. 
// Use this script at your own risk. The author assumes no responsibility or liability for any errors, 
// issues, damages, or losses resulting from the use or misuse of this script.
//
// Deletes relationships where:
//   - Parent CI missing
//   - Child CI missing
//   - Parent CI Retired (operational_status = 6)
//   - Child CI Retired (operational_status = 6)
//
// === CONFIGURATION PARAMETERS ===
// previewOnly     : true  = Preview mode (no deletions, logs invalid relations)
//                   false = Delete mode (invalid relations will be removed)
// chunkSize       : Number of relationships deleted per batch in Delete mode
// retiredValue    : Integer value for "Retired" (OOTB = 6)
// previewLogLimit : Max rows logged in Preview mode (truncated if exceeded)
// progressStep    : Log progress every X processed relationships (set 0 to disable)
// =================================

(function() {
    // === CONFIGURATION ===
    var previewOnly      = true;    // set to false to actually delete
    var chunkSize        = 500;     // number of rows to delete per batch
    var retiredValue     = 6;       // integer for "Retired"
    var previewLogLimit  = 500;     // max rows to print in preview mode
    var progressStep     = 1000;    // log progress every X relationships processed (0 = disabled)
    // =====================

    var start = new Date();
    var startMs = start.getTime();
    var startStamp = start.toISOString();

    // Log mode at start
    if (previewOnly) {
        gs.info("[CMDB Cleanup] START " + startStamp + " | Mode: PREVIEW (no deletions).");
    } else {
        gs.info("[CMDB Cleanup] START " + startStamp + " | Mode: DELETE (invalid relationships will be removed).");
    }

    var gr = new GlideRecord('cmdb_rel_ci');
    gr.query();

    var count = 0;      // invalid relations found
    var total = 0;      // total processed
    var toDelete = [];
    var logged = 0;

    // Header only in preview mode
    if (previewOnly) {
        gs.info("sys_id,parent_sys_id,parent_name,parent_class,parent_operational_status,type,child_sys_id,child_name,child_class,child_operational_status");
    }

    while (gr.next()) {
        total++;

        var parentValid = true;
        var childValid = true;

        var parentSysId   = gr.parent ? gr.parent.toString() : "";
        var parentName    = "";
        var parentClass   = "";
        var parentStatus  = "";

        var childSysId    = gr.child ? gr.child.toString() : "";
        var childName     = "";
        var childClass    = "";
        var childStatus   = "";

        // Check parent CI
        if (!gr.parent) {
            parentValid = false;
        } else {
            var parentCI = new GlideRecord('cmdb_ci');
            if (parentCI.get(gr.parent)) {
                parentName   = parentCI.getValue("name");
                parentClass  = parentCI.getValue("sys_class_name");
                parentStatus = parentCI.getDisplayValue("operational_status");
                if (parentCI.getValue("operational_status") == retiredValue) {
                    parentValid = false;
                }
            } else {
                parentValid = false; // parent missing
            }
        }

        // Check child CI
        if (!gr.child) {
            childValid = false;
        } else {
            var childCI = new GlideRecord('cmdb_ci');
            if (childCI.get(gr.child)) {
                childName   = childCI.getValue("name");
                childClass  = childCI.getValue("sys_class_name");
                childStatus = childCI.getDisplayValue("operational_status");
                if (childCI.getValue("operational_status") == retiredValue) {
                    childValid = false;
                }
            } else {
                childValid = false; // child missing
            }
        }

        // Invalid relation → mark for deletion or preview
        if (!parentValid || !childValid) {
            count++;

            if (previewOnly) {
                if (logged < previewLogLimit) {
                    gs.info([
                        gr.sys_id,
                        parentSysId,
                        parentName,
                        parentClass,
                        parentStatus,
                        gr.type,
                        childSysId,
                        childName,
                        childClass,
                        childStatus
                    ].join(","));
                    logged++;
                }
            } else {
                toDelete.push(gr.sys_id.toString());
                if (toDelete.length >= chunkSize) {
                    deleteChunk(toDelete);
                    toDelete = [];
                }
            }
        }

        // Progress counter
        if (progressStep > 0 && total % progressStep === 0) {
            gs.info("[CMDB Cleanup] Processed " + total + " relationships so far...");
        }
    }

    var duration = Math.round((new Date().getTime() - startMs) / 1000);

    if (count === 0) {
        gs.info("[CMDB Cleanup] FINISHED | No invalid relationships found out of " + total + " processed. Duration: " + duration + " seconds.");
        return;
    }

    if (previewOnly) {
        if (count > previewLogLimit) {
            gs.info("[CMDB Cleanup] Output truncated: " + (count - previewLogLimit) + " more rows not shown.");
        }
        gs.info("[CMDB Cleanup] FINISHED | " + count + " invalid relationship(s) found out of " + total + " processed. Duration: " + duration + " seconds.");
    } else {
        if (toDelete.length > 0) {
            deleteChunk(toDelete);
        }
        gs.info("[CMDB Cleanup] FINISHED | Deleted " + count + " invalid CMDB relationship(s) out of " + total + " processed. Duration: " + duration + " seconds.");
    }

    function deleteChunk(sysIds) {
        var del = new GlideRecord('cmdb_rel_ci');
        del.addQuery('sys_id', 'IN', sysIds);
        del.deleteMultiple();
        gs.info("[CMDB Cleanup] Deleted chunk of " + sysIds.length + " records.");
    }
})();
```

## Exemple de sortie

* * *

### **Mode aperçu** (`previewOnly = true`)

\*\*\* Script: \[CMDB Cleanup\] START 2025-09-07T10:15:32.123Z | Mode: PREVIEW (no deletions).

`*** Script: sys_id,parent_sys_id,parent_name,parent_class,parent_operational_status,type,child_sys_id,child_name,child_class,child_operational_status   *** Script: 0f7a1234abcd5678,parent123,App Server,cmdb_ci_server,Installed,Depends on,child456,Database,cmdb_ci_db_instance,Retired   *** Script: 0f7a2234abcd5678,parent999,Old Switch,cmdb_ci_network,Retired,Depends on,child888,Router,cmdb_ci_network,Installed   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Processed 2000 relationships so far...   *** Script: [CMDB Cleanup] Output truncated: 145 more rows not shown.   *** Script: [CMDB Cleanup] FINISHED | 645 invalid relationship(s) found out of 12,480 processed. Duration: 18 seconds.  `

**Points clés** :

-   Affiche les **N (configurable)** premières lignes invalides au format CSV.
-   Progression affichée toutes les 1000 relations traitées.
-   Le récapitulatif final inclut les totaux et la durée d'exécution.

### **Mode suppression** (`previewOnly = false`)

`*** Script: [CMDB Cleanup] START 2025-09-07T11:02:01.456Z | Mode: DELETE (invalid relationships will be removed).   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 145 records.   *** Script: [CMDB Cleanup] FINISHED | Deleted 1,145 invalid CMDB relationship(s) out of 12,480 processed. Duration: 15 seconds.   `

**Points clés** :

-   Aucune ligne CSV n'est affichée (uniquement des compteurs).
-   Les relations sont supprimées par **lots**.
-   Chaque suppression de lot est journalisée.
-   Le récapitulatif final indique le **nombre de suppressions**, le **total traité** et la **durée d'exécution**.

## Runbook

### Objectif

Ce script identifie et supprime les **relations CMDB invalides** dans `cmdb_rel_ci`.  
Les relations invalides sont celles où :

-   le **CI parent** est manquant, ou
-   le **CI enfant** est manquant, ou
-   le **CI parent** est **Retired** (`operational_status = 6`), ou
-   le **CI enfant** est **Retired** (`operational_status = 6`).

### Paramètres de configuration

Situés en haut du script :

-   **`previewOnly`**
    
    -   `true` = mode aperçu (aucune suppression, journalise les relations invalides)
        
    -   `false` = mode suppression (supprime les relations invalides)
        
-   **`chunkSize`**
    
    -   Nombre d'enregistrements supprimés par lot (par défaut : 500).
        
    -   Utilisé uniquement en mode suppression, par sécurité.
        
-   **`retiredValue`**
    
    -   Valeur entière correspondant à « Retired » (`6` par défaut).
        
-   **`previewLogLimit`**
    
    -   Nombre maximal de relations invalides journalisées en mode aperçu (par défaut : 500).
        
    -   La sortie est tronquée si davantage de relations sont trouvées.
        
-   **`progressStep`**
    
    -   Journalise la progression tous les X enregistrements traités (par défaut : 1000).
        
    -   Définissez-le sur `0` pour désactiver la journalisation de la progression.
        

* * *

## Comment l'exécuter ?

### Étape 1 – Mode aperçu (vérification sans risque)

1.  Ouvrez **Fix Scripts** (ou exécutez-le dans **Background Scripts**).
    
2.  Collez le script et définissez :
    
    `var previewOnly = true;   `
    
3.  Exécutez le script.
    
4.  Consultez la sortie dans le **System Log** :
    
    -   Les 500 premières relations invalides (configurable).
        
    -   Le nombre total de relations invalides trouvées.
        
    -   Les mises à jour de progression toutes les 1000 relations traitées.
        
    -   La durée d'exécution en secondes.
        
5.  Si `No invalid relationships found` → arrêtez-vous ici, il n'y a rien à nettoyer.
    

* * *

### Étape 2 – Mode suppression (nettoyage effectif)

1.  Validez les résultats du mode aperçu avec votre CMDB owner/data owner.
    
2.  Modifiez la configuration :
    
    `var previewOnly = false;   `
    
3.  Exécutez le script.
    
4.  Surveillez le **System Log** :
    
    -   La suppression s'effectue par **lots** sécurisés (par défaut : 500).
        
    -   Chaque suppression de lot est journalisée.
        
    -   Le récapitulatif indique le total supprimé et la durée.
        

* * *

### Consignes de sécurité

-   Exécutez toujours **d'abord le mode aperçu**.
-   Examinez la sortie avec les CMDB owners/data owners avant toute suppression.
-   Ajustez `*chunkSize*` pour les CMDB très volumineuses afin d'éviter les timeouts.
-   Le script journalise un horodatage de début, la progression et la durée totale d'exécution à des fins de traçabilité.
