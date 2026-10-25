---
title: "用于清除过时/无效 CI 关系的 Fix Script（含预览选项）"
excerpt: "ServiceNow CMDB 中的关系很容易失控，从而导致性能问题并降低数据质量。为帮助解决这一问题，下面的脚本提供了一种安全清理 cmdb_rel_ci 表的方法——例如，在批量更新"
source: "99b3c942440b81d7"
---

ServiceNow CMDB 中的关系很容易失控，从而导致性能问题并降低数据质量。为帮助解决这一问题，下面的脚本提供了一种安全清理 `*cmdb_rel_ci*` 表的方法——例如，在批量更新 CI 的 *Operational State*（运行状态）之后，或在批量删除 CI 之后。

由于 ServiceNow CMDB 可能包含数百万条关系，而这些关系又是影响分析（impact analysis）的基础，因此保持该表内容的整洁至关重要。当一个 CI 被删除时，其关系也应随之删除。虽然我通常建议保留不再使用或不再被发现（discovered）的 CI，但我也建议删除涉及*已退役（Retired）* CI 的关系。这样可以防止过时的依赖关系影响影响计算（例如由 AI 或 OOTB 流程执行的计算），也可以避免用户在运营流程中选到已退役的相关项。

基于此，我采用一条简单的规则：

-   每条关系都必须同时具有父项（parent）和子项（child）。
-   父项和子项都必须存在。
-   父项和子项都不得处于 *R**etired*（已退役）状态。
-   其他所有关系均为无效关系，应予以删除。

*注：ServiceNow 不支持将关系设为退役状态，这其实是合理的。*

下面的 Fix Script 正是这样做的——而且功能更多：

-   **预览或删除****：** 通过将 `Preview Only` 设置为 *true*（预览）或 *false*（删除）来控制脚本行为。
-   **定向查询****：** 识别父项或子项不存在，或运行状态为 *7 – Retired* 的过时关系。
-   **预览模式****：** 生成包含所有无效关系的 CSV 报告（包括 Parent、Child 和 Type）。
-   **删除模式****：** 以每批 500 条的受控“分块”方式删除无效关系，以避免超时或性能问题。
-   **汇总****：** 完成后显示已删除关系的总数。
-   **回滚****：** 如有需要，删除操作可以回滚。

*免责声明：*

> 本脚本按“原样”提供，不附带任何形式的明示或暗示的保证或担保。使用本脚本的风险由您自行承担。对于因使用或误用本脚本而导致的任何错误、问题、损害或损失，作者概不负责。

**提示：预防胜于修复**

建议在 cmdb\_ci 记录上设置级联删除（cascade delete），这样在删除 CI 时，CMDB 关系会被自动删除。但这对已退役的 CI 不起作用。针对这种情况，以及为了修复异常数据，您可以使用下面的脚本。使用 ServiceNow Vancouver 及更高版本的用户，也可以使用 OOTB 的“[**CMDB (Relationship) Health**](https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/configuration-management/task/t_ViewRelationshipsHealth.html)”功能。

### 用于清理无效/过时 CMDB 关系的 Fix Script：

当然，作为 SysAdmin，我本可以不用脚本，而是创建一个带预览功能的简单“Delete Job”，但那样这篇文章就会非常简短且乏味了 :-) 本文的另一个目的是分享 AI 目前如何协助完成日常管理任务，并评估所生成脚本的智能程度和效率。我也知道，Java 脚本编写的日子已屈指可数；很快，您就可以通过 AI 提示词删除无效/过时的记录（前提是您的安全部门允许在生产环境中这样做）。

总之，在我的新朋友——人工智能 ChatGPT 5 PRO 的帮助下，我生成了以下 JavaScript。一开始脚本很简单，但当我开始向这位朋友询问有关性能以及如何处理超时和异常的问题时，脚本迅速变得复杂起来。好消息是，生成的结果令人印象深刻，甚至超过了我见过的一些“专业开发人员”编写的脚本。  
  
不过，达到这一结果的过程并非一帆风顺。ChatGPT 5 最初没有考虑到 ServiceNow 的限制，前几个版本都无法正常运行。如果不是我要求加入“预览”功能，所有关系都会被删除。经过一番对话，ChatGPT 和我最终得出了一个可行的方案，能够安全地用于大型 CMDB。  
  
随后，我请 ChatGPT 为脚本编写文档，效果非常好（见下文）。

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

## 输出示例

* * *

### **预览模式**（`previewOnly = true`）

\*\*\* Script: \[CMDB Cleanup\] START 2025-09-07T10:15:32.123Z | Mode: PREVIEW (no deletions).

`*** Script: sys_id,parent_sys_id,parent_name,parent_class,parent_operational_status,type,child_sys_id,child_name,child_class,child_operational_status   *** Script: 0f7a1234abcd5678,parent123,App Server,cmdb_ci_server,Installed,Depends on,child456,Database,cmdb_ci_db_instance,Retired   *** Script: 0f7a2234abcd5678,parent999,Old Switch,cmdb_ci_network,Retired,Depends on,child888,Router,cmdb_ci_network,Installed   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Processed 2000 relationships so far...   *** Script: [CMDB Cleanup] Output truncated: 145 more rows not shown.   *** Script: [CMDB Cleanup] FINISHED | 645 invalid relationship(s) found out of 12,480 processed. Duration: 18 seconds.  `

**要点**：

-   以 CSV 格式显示前 **N 条（可配置）**无效记录。
-   每处理 1000 条记录输出一次进度。
-   最终汇总包含总数和运行时间。

### **删除模式**（`previewOnly = false`）

`*** Script: [CMDB Cleanup] START 2025-09-07T11:02:01.456Z | Mode: DELETE (invalid relationships will be removed).   *** Script: [CMDB Cleanup] Processed 1000 relationships so far...   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 500 records.   *** Script: [CMDB Cleanup] Deleted chunk of 145 records.   *** Script: [CMDB Cleanup] FINISHED | Deleted 1,145 invalid CMDB relationship(s) out of 12,480 processed. Duration: 15 seconds.   `

**  
要点**：

-   不输出 CSV 行（仅输出计数）。
-   关系按**分块**删除。
-   每个分块的删除操作都会记录日志。
-   最终汇总显示**已删除数量**、**已处理总数**和**运行时间**。

## 运行手册（Runbook）

### 目的

本脚本用于识别并删除 `cmdb_rel_ci` 中的**无效 CMDB 关系**。  
无效关系是指以下情况之一：

-   **父 CI** 不存在，或
-   **子 CI** 不存在，或
-   **父 CI** 处于 **Retired**（已退役）状态（`operational_status = 6`），或
-   **子 CI** 处于 **Retired**（已退役）状态（`operational_status = 6`）。

### 配置参数

位于脚本顶部：

-   **`previewOnly`**
    
    -   `true` = 预览模式（不删除，记录无效关系）
        
    -   `false` = 删除模式（删除无效关系）
        
-   **`chunkSize`**
    
    -   每批删除的记录数（默认：500）。
        
    -   出于安全考虑，仅在删除模式下使用。
        
-   **`retiredValue`**
    
    -   “Retired”（已退役）对应的整数值（默认为 `6`）。
        
-   **`previewLogLimit`**
    
    -   预览模式下记录的无效关系的最大数量（默认：500）。
        
    -   如果发现的数量更多，输出将被截断。
        
-   **`progressStep`**
    
    -   每处理 X 条记录记录一次进度（默认：1000）。
        
    -   设置为 `0` 可禁用进度日志。
        

* * *

## 如何运行？

### 第 1 步 – 预览模式（安全检查）

1.  打开 **Fix Scripts**（或在 **Background Scripts** 中运行）。
    
2.  粘贴脚本并设置：
    
    `var previewOnly = true;   `
    
3.  执行脚本。
    
4.  在 **System Log** 中查看输出：
    
    -   前 500 条无效关系（可配置）。
        
    -   发现的无效关系总数。
        
    -   每处理 1000 条记录输出一次进度更新。
        
    -   以秒为单位的运行时间。
        
5.  如果显示 `No invalid relationships found` → 到此为止，无需清理。
    

* * *

### 第 2 步 – 删除模式（实际清理）

1.  与您的 CMDB/数据负责人确认预览模式的结果。
    
2.  修改配置：
    
    `var previewOnly = false;   `
    
3.  执行脚本。
    
4.  监控 **System Log**：
    
    -   删除操作以安全的**分块**方式进行（默认：500）。
        
    -   每个分块的删除操作都会记录日志。
        
    -   汇总显示删除总数和耗时。
        

* * *

### 安全注意事项

-   务必**先运行预览模式**。
-   删除前与 CMDB/数据负责人一起审核输出结果。
-   调整 `*chunkSize*`：对于非常大的 CMDB，请采用这种方式以避免超时。
-   脚本会记录开始时间戳、进度和总运行时间，以便追溯。
