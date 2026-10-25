---
title: "Fix Script zum Entfernen veralteter/ungültiger CI-Beziehungen, mit Vorschauoption"
excerpt: "Beziehungen in der ServiceNow CMDB können leicht außer Kontrolle geraten, was zu Performanceproblemen und einer geringeren Datenqualität führt. Um dem entgegenzuwirken, bietet das folgende Script eine sichere Möglichkeit, die Tabelle cmdb_rel_ci zu bereinigen – zum Beispiel nach einer Massenänderung des"
source: "726af2c7a6812162"
---

Beziehungen in der ServiceNow CMDB können leicht außer Kontrolle geraten, was zu Performanceproblemen und einer geringeren Datenqualität führt. Um dem entgegenzuwirken, bietet das folgende Script eine sichere Möglichkeit, die Tabelle `*cmdb_rel_ci*` zu bereinigen – zum Beispiel nach einer Massenänderung des *Operational State* von CIs oder nach dem massenhaften Löschen von CIs.

Da eine ServiceNow CMDB Millionen von Beziehungen enthalten kann – und da diese Beziehungen die Impact-Analyse steuern –, ist es entscheidend, den Tabelleninhalt sauber zu halten. Wird ein CI entfernt, sollten auch seine Beziehungen entfernt werden. Auch wenn ich grundsätzlich empfehle, CIs, die nicht mehr genutzt oder nicht mehr per Discovery erkannt werden, aufzubewahren, rate ich dazu, Beziehungen mit *retired* CIs zu entfernen. Das verhindert, dass veraltete Abhängigkeiten die Impact-Berechnungen beeinflussen, die z. B. durch KI oder OOTB-Flows erfolgen, und erlaubt es Benutzern, in operativen Prozessen ausgemusterte verknüpfte Elemente auszuwählen.

Vor diesem Hintergrund wende ich eine einfache Regel an:

-   Jede Beziehung muss sowohl ein Parent als auch ein Child haben.
-   Sowohl Parent als auch Child müssen existieren.
-   Weder Parent noch Child dürfen *Retired* sein.
-   Alle anderen Beziehungen sind ungültig und sollten entfernt werden.

*Hinweis: ServiceNow unterstützt das Ausmustern (Retire) von Beziehungen nicht, was eigentlich auch sinnvoll ist.*

Genau das macht das folgende Fix Script – und noch mehr:

-   **Vorschau oder Löschen****:** Steuern Sie das Verhalten, indem Sie `Preview Only` auf *true* (Vorschau) oder *false* (Löschen) setzen.
-   **Gezielte Abfrage****:** Ermittelt veraltete Beziehungen, bei denen Parent oder Child nicht existiert oder der Operational Status *7 – Retired* ist.
-   **Vorschaumodus****:** Erzeugt einen CSV-Bericht aller ungültigen Beziehungen (einschließlich Parent, Child und Typ).
-   **Löschmodus****:** Entfernt ungültige Beziehungen in kontrollierten „Chunks“ von 500, um Timeouts oder Performanceprobleme zu vermeiden.
-   **Zusammenfassung****:** Zeigt nach Abschluss die Gesamtzahl der gelöschten Beziehungen an.
-   **Rollback****:** Löschungen können bei Bedarf rückgängig gemacht werden.

*Haftungsausschluss:*

> Dieses Script wird „wie besehen“ und ohne jegliche ausdrückliche oder stillschweigende Gewährleistung oder Garantie bereitgestellt. Die Nutzung dieses Scripts erfolgt auf eigenes Risiko. Der Autor übernimmt keine Verantwortung oder Haftung für Fehler, Probleme, Schäden oder Verluste, die sich aus der Nutzung oder dem Missbrauch dieses Scripts ergeben.

**TIPP: Vorbeugen ist besser als Reparieren**

Es wird empfohlen, Cascade Delete für cmdb\_ci-Datensätze einzurichten, sodass CMDB-Beziehungen automatisch entfernt werden, wenn das CI entfernt wird. Für ausgemusterte CIs funktioniert das allerdings nicht. Dafür – und zur Behebung von Anomalien – können Sie das folgende Script verwenden. Wer ein ServiceNow-Release ab Vancouver nutzt, kann auch die OOTB-Funktion „[**CMDB (Relationship) Health**](https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/configuration-management/task/t_ViewRelationshipsHealth.html)“ verwenden.

### Fix Script zur Bereinigung ungültiger/veralteter CMDB-Beziehungen:

Natürlich hätte ich als SysAdmin statt eines Scripts auch einfach einen „Delete Job“ mit Vorschau anlegen können, aber dann wäre dieser Artikel wirklich kurz und langweilig :-) Ziel dieses Artikels war es auch zu zeigen, wie KI derzeit bei routinemäßigen Administrationsaufgaben unterstützen kann, und die Intelligenz/Effizienz des generierten Scripts zu bewerten. Mir ist auch klar, dass die Tage des Java-Scriptings gezählt sind; bald werden Sie ungültige/veraltete Datensätze per KI-Prompt löschen können (sofern Ihre Security-Abteilung das in der Produktion erlaubt).

Wie dem auch sei: Mit Hilfe meines neuen Freundes, der künstlichen Intelligenz ChatGPT 5 PRO, habe ich das folgende JavaScript generiert. Es fing einfach an, doch als ich meinem Freund Fragen zur Performance und zum Umgang mit Timeouts und Anomalien stellte, wurde das Script schnell komplexer. Die gute Nachricht: Das generierte Ergebnis ist beeindruckend und übertrifft manche Scripts, die ich von „professionellen Entwicklern“ gesehen habe.  
  
Der Weg dorthin war allerdings nicht ganz schmerzfrei. ChatGPT 5 berücksichtigte anfangs die Einschränkungen von ServiceNow nicht, und die ersten Iterationen funktionierten nicht. Alle Beziehungen wären entfernt worden, wenn es nicht die „Vorschau“-Funktion gegeben hätte, die ich ausdrücklich angefordert hatte. Nach einem Dialog haben ChatGPT und ich etwas entwickelt, das funktioniert und in einer großen CMDB sicher eingesetzt werden kann.  
  
Anschließend habe ich ChatGPT gebeten, das Script zu dokumentieren, was hervorragend funktioniert hat (siehe unten).

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

## Beispielausgabe

* * *

### **Vorschaumodus** (`previewOnly = true`)

\*\*\* Script: \[CMDB Cleanup\] START 2025-09-07T10:15:32.123Z | Mode: PREVIEW (no deletions).

`*** Script: sys_id,parent_sys_id,parent_name,parent_class,parent_operational_status,type,child_sys_id,child_name,child_class,child_operational_status   *** Script: 0f7a1234abcd5678,parent123,App Server,cmdb_ci_server,Installed,Depends on,child456,Database,cmdb_ci_db_instance,Retired   *** Script: 0f7a2234abcd5678,parent999,Old Switch,cmdb_ci_network,Retired,Depends on,child888,Router,cmdb_ci_network,Installed   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Processed 2000 relationships so far...   *** Script: [CMDB Cleanup] Output truncated: 145 more rows not shown.   *** Script: [CMDB Cleanup] FINISHED | 645 invalid relationship(s) found out of 12,480 processed. Duration: 18 seconds.  `

**Wichtige Punkte**:

-   Zeigt die ersten **N (konfigurierbar)** ungültigen Zeilen im CSV-Format.
-   Fortschrittsmeldung alle 1000 verarbeiteten Beziehungen.
-   Die abschließende Zusammenfassung enthält Gesamtzahlen und Laufzeit.

### **Löschmodus** (`previewOnly = false`)

`*** Script: [CMDB Cleanup] START 2025-09-07T11:02:01.456Z | Mode: DELETE (invalid relationships will be removed).   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 145 records.   *** Script: [CMDB Cleanup] FINISHED | Deleted 1,145 invalid CMDB relationship(s) out of 12,480 processed. Duration: 15 seconds.   `

**Wichtige Punkte**:

-   Es werden keine CSV-Zeilen ausgegeben (nur Zählwerte).
-   Beziehungen werden in **Chunks** gelöscht.
-   Jede Chunk-Löschung wird protokolliert.
-   Die abschließende Zusammenfassung zeigt die **Anzahl gelöschter Beziehungen**, die **Gesamtzahl verarbeiteter Beziehungen** und die **Laufzeit**.

## Runbook

### Zweck

Dieses Script ermittelt und entfernt **ungültige CMDB-Beziehungen** in `cmdb_rel_ci`.  
Ungültig sind Beziehungen, bei denen:

-   das **Parent-CI** fehlt oder
-   das **Child-CI** fehlt oder
-   das **Parent-CI** **Retired** ist (`operational_status = 6`) oder
-   das **Child-CI** **Retired** ist (`operational_status = 6`).

### Konfigurationsparameter

Am Anfang des Scripts zu finden:

-   **`previewOnly`**
    
    -   `true` = Vorschaumodus (keine Löschungen, protokolliert ungültige Beziehungen)
        
    -   `false` = Löschmodus (entfernt ungültige Beziehungen)
        
-   **`chunkSize`**
    
    -   Anzahl der pro Batch gelöschten Datensätze (Standard: 500).
        
    -   Wird aus Sicherheitsgründen nur im Löschmodus verwendet.
        
-   **`retiredValue`**
    
    -   Integer-Wert für „Retired“ (standardmäßig `6`).
        
-   **`previewLogLimit`**
    
    -   Maximale Anzahl der im Vorschaumodus protokollierten ungültigen Beziehungen (Standard: 500).
        
    -   Werden mehr gefunden, wird die Ausgabe abgeschnitten.
        
-   **`progressStep`**
    
    -   Fortschritt alle X verarbeiteten Datensätze protokollieren (Standard: 1000).
        
    -   Auf `0` setzen, um die Fortschrittsprotokollierung zu deaktivieren.
        

* * *

## Wie wird das Script ausgeführt?

### Schritt 1 – Vorschaumodus (sichere Prüfung)

1.  Öffnen Sie **Fix Scripts** (oder führen Sie das Script unter **Background Scripts** aus).
    
2.  Fügen Sie das Script ein und setzen Sie:
    
    `var previewOnly = true;   `
    
3.  Führen Sie das Script aus.
    
4.  Prüfen Sie die Ausgabe im **System Log**:
    
    -   Die ersten 500 ungültigen Beziehungen (konfigurierbar).
        
    -   Gesamtzahl der gefundenen ungültigen Beziehungen.
        
    -   Fortschrittsmeldungen alle 1000 verarbeiteten Beziehungen.
        
    -   Laufzeit in Sekunden.
        
5.  Bei `No invalid relationships found` → hier aufhören, es gibt nichts zu bereinigen.
    

* * *

### Schritt 2 – Löschmodus (eigentliche Bereinigung)

1.  Stimmen Sie die Ergebnisse des Vorschaumodus mit Ihrem CMDB-/Data Owner ab.
    
2.  Ändern Sie die Konfiguration:
    
    `var previewOnly = false;   `
    
3.  Führen Sie das Script aus.
    
4.  Überwachen Sie das **System Log**:
    
    -   Die Löschung erfolgt in sicheren **Chunks** (Standard: 500).
        
    -   Jede Chunk-Löschung wird protokolliert.
        
    -   Die Zusammenfassung zeigt die Gesamtzahl gelöschter Beziehungen + Dauer.
        

* * *

### Sicherheitshinweise

-   Führen Sie immer **zuerst den Vorschaumodus** aus.
-   Prüfen Sie die Ausgabe vor dem Löschen mit den CMDB-/Data Ownern.
-   Passen Sie `*chunkSize*` an. Nutzen Sie diesen Ansatz bei sehr großen CMDBs, um Timeouts zu vermeiden.
-   Das Script protokolliert zur Nachvollziehbarkeit einen Startzeitstempel, den Fortschritt und die Gesamtlaufzeit.
