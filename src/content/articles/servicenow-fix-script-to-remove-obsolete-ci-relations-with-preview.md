---
title: Fix Script to remove obsolete/invalid CI Relations, with preview option
date: 2025-09-05
categories:
  - ServiceNow
excerpt: Relations in the ServiceNow CMDB can easily get out of control, leading to performance problems and reduced data quality. To help address this, the script below provides a safe way to clean up the cmdb_rel_ci table—for example, after mass-updating the
image: /wp-content/uploads/2024/11/DevOps.jpg
readingTime: 10
popular: false
draft: false
---

Relations in the ServiceNow CMDB can easily get out of control, leading to performance problems and reduced data quality. To help address this, the script below provides a safe way to clean up the `*cmdb_rel_ci*` table—for example, after mass-updating the *Operational State* of CIs or after mass-deleting CIs.

Because a ServiceNow CMDB can contain millions of relations—and because these relations drive impact analysis—it is critical to keep the table contents clean. When a CI is removed, its relations should also be removed. While I generally recommend retaining CIs that are no longer in use or discovered, I also advise removing relations that involve *retired* CIs. This prevents outdated dependencies from influencing impact calculations, e.g, done by AI or OOTB flows, and allows users to select retired related items in operational processes.

With that in mind, I apply a simple rule:

-   Every relation must have both a parent and a child.
-   Both the parent and child must exist.
-   Neither parent nor child may be *Retired*.
-   All other relations are invalid and should be removed.

*Note: ServiceNow does not support retiring relations, which actually makes sense.*

That is precisely what the fix script below does—and more:

-   **Preview or Delete**: Control behavior by setting `Preview Only` to *true* (preview) or *false* (delete).
-   **Targeted Query**: Identifies obsolete relations where the parent or child does not exist, or the operational status is *7 – Retired*.
-   **Preview Mode**: Generates a CSV report of all invalid relations (including Parent, Child, and Type).
-   **Delete Mode**: Removes invalid relations in controlled "chunks" of 500 to avoid timeouts or performance issues.
-   **Summary**: Displays the total number of deleted relations once completed.
-   **Rollback**: Deletions can be reverted if required.

*Disclaimer:*

> This script is provided ‘as is’ and without any warranty or guarantee of any kind, express or implied. Use this script at your own risk. The author assumes no responsibility or liability for any errors, issues, damages, or losses resulting from the use or misuse of this script.

**TIP: Prevention is better than fixing**

It is recommended to set up cascade delete on cmdb\_ci records, so that cmdb relations are automatically removed when the CI is removed. This, however, does not work for retired CIs. For that -and for fixing anomalies- you can use the script below. Those using a Vancouver+ Release of ServiceNow can also use the OOTB "[**CMDB (Relationship) Health**](https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/configuration-management/task/t_ViewRelationshipsHealth.html)" capability.

### Fix Script to Clean Up Invalid/Obsolete CMDB Relationships:

Of course, instead of using a script, as a SysAdmin, I could have created a simple "Delete Job" with Preview as well, but then this would be a really short and boring article :-) The purpose of this article was also to share how AI can currently assist with routine administrative tasks and to assess the intelligence/efficiency of the generated script. I also know that the days of Java scripting are numbered; soon, you will be able to delete invalid/obsolete records using AI prompts (if your security department allows it in production).

Anyway, with the help of my new Artificial Intelligence Friend ChatGPT 5 PRO, I generated the following JavaScript. It started simple, but when I began to ask my Friend questions about performance and management of timeouts and anomalies, the script rapidly got more complicated. The good news is that the generated result is impressive and surpasses some of the scripts I have seen from "professional developers".  
  
The process to get there, however, was not entirely painless. ChatGPT 5 initially did not take the ServiceNow limitations into account, and the first iterations did not work. All relations would have been removed if it weren't for the "preview" feature that I requested to include. After a dialogue, ChatGPT and I came up with something that works and is safe to use in a large CMDB.  
  
Thereafter, I asked ChatGPT to document the script, which worked like a charm (see below).

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

## Sample Output

* * *

### **Preview Mode** (`previewOnly = true`)

\*\*\* Script: \[CMDB Cleanup\] START 2025-09-07T10:15:32.123Z | Mode: PREVIEW (no deletions).

`*** Script: sys_id,parent_sys_id,parent_name,parent_class,parent_operational_status,type,child_sys_id,child_name,child_class,child_operational_status   *** Script: 0f7a1234abcd5678,parent123,App Server,cmdb_ci_server,Installed,Depends on,child456,Database,cmdb_ci_db_instance,Retired   *** Script: 0f7a2234abcd5678,parent999,Old Switch,cmdb_ci_network,Retired,Depends on,child888,Router,cmdb_ci_network,Installed   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Processed 2000 relationships so far...   *** Script: [CMDB Cleanup] Output truncated: 145 more rows not shown.   *** Script: [CMDB Cleanup] FINISHED | 645 invalid relationship(s) found out of 12,480 processed. Duration: 18 seconds.  `

**Key points**:

-   Shows first **N (configurable)** invalid rows in CSV-style.
-   Progress every 1000 processed.
-   Final summary includes totals and runtime.

### **Delete Mode** (`previewOnly = false`)

`*** Script: [CMDB Cleanup] START 2025-09-07T11:02:01.456Z | Mode: DELETE (invalid relationships will be removed).   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 145 records.   *** Script: [CMDB Cleanup] FINISHED | Deleted 1,145 invalid CMDB relationship(s) out of 12,480 processed. Duration: 15 seconds.   `

**Key points**:

-   No CSV rows are printed (only counts).
-   Relationships are deleted in **chunks**.
-   Each chunk deletion is logged.
-   The final summary shows the **deleted count**, **total processed**, and **runtime**.

## Runbook

### Purpose

This script identifies and removes **invalid CMDB relationships** in `cmdb_rel_ci`.  
Invalid relationships are those where:

-   The **parent CI** is missing, or
-   The **child CI** is missing, or
-   The **parent CI** is **Retired** (`operational_status = 6`), or
-   The **child CI** is **Retired** (`operational_status = 6`).

### Configuration Parameters

Located at the top of the script:

-   **`previewOnly`**
    
    -   `true` = Preview mode (no deletions, logs invalid relations)
        
    -   `false` = Delete mode (removes invalid relations)
        
-   **`chunkSize`**
    
    -   Number of records deleted per batch (default: 500).
        
    -   Used only in Delete mode for safety.
        
-   **`retiredValue`**
    
    -   Integer value for “Retired” (`6` by default).
        
-   **`previewLogLimit`**
    
    -   Maximum invalid relations logged in Preview mode (default: 500).
        
    -   Output is truncated if more are found.
        
-   **`progressStep`**
    
    -   Log progress every X records processed (default: 1000).
        
    -   Set to `0` to disable progress logging.
        

* * *

## How to Run?

### Step 1 – Preview Mode (safe check)

1.  Open **Fix Scripts** (or run in **Background Scripts**).
    
2.  Paste the script and set:
    
    `var previewOnly = true;   `
    
3.  Execute the script.
    
4.  Check the **System Log** for output:
    
    -   First 500 invalid relationships (configurable).
        
    -   Total invalid relationships found.
        
    -   Progress updates every 1000 processed.
        
    -   Runtime in seconds.
        
5.  If `No invalid relationships found` → stop here, nothing to clean up.
    

* * *

### Step 2 – Delete Mode (actual cleanup)

1.  Confirm the Preview Mode results with your CMDB/data owner.
    
2.  Change the config:
    
    `var previewOnly = false;   `
    
3.  Execute the script.
    
4.  Monitor the **System Log**:
    
    -   Deletion occurs in safe **chunks** (default: 500).
        
    -   Each chunk deletion is logged.
        
    -   Summary shows total deleted + duration.
        

* * *

### Safety Notes

-   Always run **Preview Mode first**.
-   Review output with CMDB/data owners before deletion.
-   Adjust `*chunkSize*` For very large CMDBs, use this approach to avoid timeouts.
-   Script logs a start timestamp, progress, and total runtime for traceability.
