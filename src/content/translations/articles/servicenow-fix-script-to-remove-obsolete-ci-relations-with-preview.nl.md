---
title: "Fix Script om verouderde/ongeldige CI-relaties te verwijderen, met previewoptie"
excerpt: "Relaties in de ServiceNow CMDB kunnen gemakkelijk uit de hand lopen, wat leidt tot performanceproblemen en een lagere datakwaliteit. Om dit aan te pakken, biedt het onderstaande script een veilige manier om de tabel cmdb_rel_ci op te schonen, bijvoorbeeld na het massaal bijwerken van de"
source: "726af2c7a6812162"
---

Relaties in de ServiceNow CMDB kunnen gemakkelijk uit de hand lopen, wat leidt tot performanceproblemen en een lagere datakwaliteit. Om dit aan te pakken, biedt het onderstaande script een veilige manier om de tabel `*cmdb_rel_ci*` op te schonen, bijvoorbeeld na het massaal bijwerken van de *Operational State* van CI's of na het massaal verwijderen van CI's.

Omdat een ServiceNow CMDB miljoenen relaties kan bevatten, en omdat deze relaties de basis vormen voor impactanalyse, is het essentieel om de inhoud van de tabel schoon te houden. Wanneer een CI wordt verwijderd, moeten ook de bijbehorende relaties worden verwijderd. Hoewel ik over het algemeen aanraad om CI's die niet meer in gebruik zijn of niet meer worden gediscoverd te behouden, adviseer ik ook om relaties met *retired* CI's te verwijderen. Zo voorkom je dat verouderde afhankelijkheden impactberekeningen beïnvloeden, bijvoorbeeld door AI of OOTB-flows, en dat gebruikers retired gerelateerde items kunnen selecteren in operationele processen.

Met dat in gedachten hanteer ik een eenvoudige regel:

-   Elke relatie moet zowel een parent als een child hebben.
-   Zowel de parent als de child moet bestaan.
-   Noch de parent noch de child mag *Retired* zijn.
-   Alle overige relaties zijn ongeldig en moeten worden verwijderd.

*Opmerking: ServiceNow ondersteunt het retiren van relaties niet, wat eigenlijk ook logisch is.*

Dat is precies wat het onderstaande fix script doet, en meer:

-   **Preview of Delete****:** Bepaal het gedrag door `Preview Only` op *true* (preview) of *false* (verwijderen) te zetten.
-   **Gerichte query****:** Identificeert verouderde relaties waarbij de parent of child niet bestaat, of de operationele status *7 – Retired* is.
-   **Previewmodus****:** Genereert een CSV-rapport van alle ongeldige relaties (inclusief Parent, Child en Type).
-   **Deletemodus****:** Verwijdert ongeldige relaties in gecontroleerde "chunks" van 500 om time-outs of performanceproblemen te voorkomen.
-   **Samenvatting****:** Toont na afloop het totale aantal verwijderde relaties.
-   **Rollback****:** Verwijderingen kunnen indien nodig worden teruggedraaid.

*Disclaimer:*

> Dit script wordt geleverd ‘as is’ en zonder enige uitdrukkelijke of stilzwijgende garantie of waarborg van welke aard dan ook. Gebruik van dit script is geheel voor eigen risico. De auteur aanvaardt geen verantwoordelijkheid of aansprakelijkheid voor fouten, problemen, schade of verliezen als gevolg van het gebruik of misbruik van dit script.

**TIP: Voorkomen is beter dan herstellen**

Het is aan te raden om cascade delete in te stellen op cmdb\_ci-records, zodat CMDB-relaties automatisch worden verwijderd wanneer de CI wordt verwijderd. Dit werkt echter niet voor retired CI's. Daarvoor, en voor het herstellen van afwijkingen, kun je het onderstaande script gebruiken. Wie een Vancouver+ Release van ServiceNow gebruikt, kan ook de OOTB-functionaliteit "[**CMDB (Relationship) Health**](https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/configuration-management/task/t_ViewRelationshipsHealth.html)" gebruiken.

### Fix Script om ongeldige/verouderde CMDB-relaties op te schonen:

Natuurlijk had ik als SysAdmin in plaats van een script ook een eenvoudige "Delete Job" met Preview kunnen aanmaken, maar dan was dit een wel heel kort en saai artikel geworden :-) Het doel van dit artikel was ook om te laten zien hoe AI op dit moment kan helpen bij routinematige beheertaken, en om de intelligentie/efficiëntie van het gegenereerde script te beoordelen. Ik weet ook dat de dagen van Java-scripting geteld zijn; binnenkort kun je ongeldige/verouderde records verwijderen met AI-prompts (als je securityafdeling dat in productie toestaat).

Hoe dan ook, met hulp van mijn nieuwe Artificial Intelligence-vriend ChatGPT 5 PRO heb ik het volgende JavaScript gegenereerd. Het begon eenvoudig, maar toen ik mijn vriend vragen begon te stellen over performance en het afhandelen van time-outs en afwijkingen, werd het script al snel complexer. Het goede nieuws is dat het gegenereerde resultaat indrukwekkend is en beter dan sommige scripts die ik van "professionele developers" heb gezien.  
  
Het proces om daar te komen verliep echter niet helemaal pijnloos. ChatGPT 5 hield aanvankelijk geen rekening met de beperkingen van ServiceNow, en de eerste iteraties werkten niet. Alle relaties zouden zijn verwijderd als de "preview"-functie, die ik had laten toevoegen, er niet was geweest. Na een dialoog kwamen ChatGPT en ik tot iets dat werkt en veilig te gebruiken is in een grote CMDB.  
  
Daarna heb ik ChatGPT gevraagd het script te documenteren, wat uitstekend werkte (zie hieronder).

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

## Voorbeelduitvoer

* * *

### **Previewmodus** (`previewOnly = true`)

\*\*\* Script: \[CMDB Cleanup\] START 2025-09-07T10:15:32.123Z | Mode: PREVIEW (no deletions).

`*** Script: sys_id,parent_sys_id,parent_name,parent_class,parent_operational_status,type,child_sys_id,child_name,child_class,child_operational_status   *** Script: 0f7a1234abcd5678,parent123,App Server,cmdb_ci_server,Installed,Depends on,child456,Database,cmdb_ci_db_instance,Retired   *** Script: 0f7a2234abcd5678,parent999,Old Switch,cmdb_ci_network,Retired,Depends on,child888,Router,cmdb_ci_network,Installed   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Processed 2000 relationships so far...   *** Script: [CMDB Cleanup] Output truncated: 145 more rows not shown.   *** Script: [CMDB Cleanup] FINISHED | 645 invalid relationship(s) found out of 12,480 processed. Duration: 18 seconds.  `

**Belangrijkste punten**:

-   Toont de eerste **N (configureerbaar)** ongeldige rijen in CSV-stijl.
-   Voortgang na elke 1000 verwerkte relaties.
-   De eindsamenvatting bevat totalen en looptijd.

### **Deletemodus** (`previewOnly = false`)

`*** Script: [CMDB Cleanup] START 2025-09-07T11:02:01.456Z | Mode: DELETE (invalid relationships will be removed).   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 145 records.   *** Script: [CMDB Cleanup] FINISHED | Deleted 1,145 invalid CMDB relationship(s) out of 12,480 processed. Duration: 15 seconds.   `

**Belangrijkste punten**:

-   Er worden geen CSV-rijen afgedrukt (alleen aantallen).
-   Relaties worden in **chunks** verwijderd.
-   Elke verwijderde chunk wordt gelogd.
-   De eindsamenvatting toont het **aantal verwijderde relaties**, het **totaal aantal verwerkte relaties** en de **looptijd**.

## Runbook

### Doel

Dit script identificeert en verwijdert **ongeldige CMDB-relaties** in `cmdb_rel_ci`.  
Ongeldige relaties zijn relaties waarbij:

-   de **parent-CI** ontbreekt, of
-   de **child-CI** ontbreekt, of
-   de **parent-CI** **Retired** is (`operational_status = 6`), of
-   de **child-CI** **Retired** is (`operational_status = 6`).

### Configuratieparameters

Bovenaan het script te vinden:

-   **`previewOnly`**
    
    -   `true` = Previewmodus (geen verwijderingen, logt ongeldige relaties)
        
    -   `false` = Deletemodus (verwijdert ongeldige relaties)
        
-   **`chunkSize`**
    
    -   Aantal records dat per batch wordt verwijderd (standaard: 500).
        
    -   Wordt voor de veiligheid alleen in de Deletemodus gebruikt.
        
-   **`retiredValue`**
    
    -   Integerwaarde voor “Retired” (standaard `6`).
        
-   **`previewLogLimit`**
    
    -   Maximaal aantal ongeldige relaties dat in de Previewmodus wordt gelogd (standaard: 500).
        
    -   De uitvoer wordt afgekapt als er meer worden gevonden.
        
-   **`progressStep`**
    
    -   Logt de voortgang na elke X verwerkte records (standaard: 1000).
        
    -   Zet op `0` om voortgangslogging uit te schakelen.
        

* * *

## Hoe voer je het uit?

### Stap 1 – Previewmodus (veilige controle)

1.  Open **Fix Scripts** (of voer het uit via **Background Scripts**).
    
2.  Plak het script en stel in:
    
    `var previewOnly = true;   `
    
3.  Voer het script uit.
    
4.  Controleer de **System Log** op uitvoer:
    
    -   De eerste 500 ongeldige relaties (configureerbaar).
        
    -   Het totale aantal gevonden ongeldige relaties.
        
    -   Voortgangsupdates na elke 1000 verwerkte relaties.
        
    -   Looptijd in seconden.
        
5.  Zie je `No invalid relationships found` → stop dan hier, er valt niets op te schonen.
    

* * *

### Stap 2 – Deletemodus (daadwerkelijke opschoning)

1.  Bevestig de resultaten van de Previewmodus met je CMDB-/data-eigenaar.
    
2.  Wijzig de configuratie:
    
    `var previewOnly = false;   `
    
3.  Voer het script uit.
    
4.  Monitor de **System Log**:
    
    -   Verwijdering gebeurt in veilige **chunks** (standaard: 500).
        
    -   Elke verwijderde chunk wordt gelogd.
        
    -   De samenvatting toont het totaal aantal verwijderde relaties + de duur.
        

* * *

### Veiligheidsopmerkingen

-   Voer altijd **eerst de Previewmodus** uit.
-   Beoordeel de uitvoer met CMDB-/data-eigenaren vóór het verwijderen.
-   Pas `*chunkSize*` aan. Gebruik deze aanpak bij zeer grote CMDB's om time-outs te voorkomen.
-   Het script logt een starttijdstempel, de voortgang en de totale looptijd voor traceerbaarheid.
