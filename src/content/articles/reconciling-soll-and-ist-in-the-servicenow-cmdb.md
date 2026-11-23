---
title: "Authorised or not? Reconciling SOLL and IST in the ServiceNow CMDB"
date: 2026-11-23
categories:
  - CSDM/CMDB/TBM
excerpt: "The CMDB records what is there, not what was approved. To see what differs from what was authorised, you need the approved state registered separately and a routine that compares the two in both directions. This article shows how, in four steps."
image: /images/reconciling-soll-and-ist-in-the-servicenow-cmdb.svg
readingTime: 8
popular: false
draft: false
---

Every organisation asks whether a change is allowed before it goes live. Far fewer ask afterwards whether what is running is what was allowed.

In ServiceNow that second question is hard, because the CMDB is filled by Discovery and integrations: it records what is there, not what was approved. Comparing the CMDB with reality compares observation with observation. To see what differs from what was authorised, you need the approved state registered separately, and a routine that compares the two in both directions. This article shows how, in four steps, and ends with how to give risk officers, change managers, DevOps and security engineers one shared view.

## The problem: the CMDB shows what is, not what was authorised

SOLL and IST are German words that are common in Dutch IT: the target and the actual.

| Term | Meaning | Source in ServiceNow |
| --- | --- | --- |
| SOLL | What should be: approved changes, standards, design, ownership | Change requests, Desired State templates, service model, reconciliation rules |
| IST | What is: the observed configuration | Discovery and integrations, written to the CMDB |
| Was | What it used to be, and who or what changed it | Change history, source per attribute, closed change requests |

If someone changes a server outside the process, the next discovery run overwrites the CMDB, which now shows the deviation as fact. Unless the approved state is registered elsewhere, the evidence is gone. The two drift apart through unauthorised changes, changes implemented differently from the approval, approved changes never implemented, CIs nobody requested, and wrong data.

## Step 1: register what should be

"Authorised" means several things, so SOLL has several homes. Register each where the platform can compare it.

| Kind of SOLL | Where to register it |
| --- | --- |
| Approved change: which CI may change, when, how | Change request: Affected CIs, planned window, approved scope |
| Standing standard: what a CI must always look like | Desired State: a filter plus a template with attribute and relationship conditions |
| Intended structure: which CIs support which service | CSDM service model: Business Application, Application Service, Service Instance |
| Authoritative source: who may write which attribute | Reconciliation rules in the Identification and Reconciliation Engine (IRE) |
| Attested facts: owner, location, support group | Data Certification, with the CI owner as attester |

The change request matters most, because it is the only SOLL that is specific and bound to a time window. In practice:

- **Scope first.** Choose the classes and attributes under control, starting with production CIs behind critical services.
- **Make the change carry CI-level detail.** Require Affected CIs, and record intended new values in a structured form. That last part is a design addition, for example a small related table (CI, attribute, from, to).
- **Register owners.** Tasks, notifications and reviews depend on an owner and a support group per CI.
- **Define "covered by a change".** For example: the CI is an Affected CI of a change in Implement state, within its planned window. Without this, nobody can say what "unauthorised" means.

## Step 2: know what is, and what was

A comparison is only as good as its IST side, which must be fresh, attributable and historised:

- **Fresh.** Discovery must cover the in-scope CIs often enough for your detection time. A CI that has not been seen recently is an IST gap, not "no change". Monitor discovery health as carefully as the comparison.
- **Attributable.** With reconciliation rules, each attribute has one authoritative writer. A deviation with no known writer is the strongest sign of an unauthorised change or a rogue integration.
- **Historised.** Discovery heals the CMDB, which erases the previous value. Without history you can see that a value is wrong, but not when it changed, so you cannot link it to a change window.

### Seeing real changes when every CI is rediscovered daily

If CIs are rediscovered daily, the last-discovered date changes on every CI every day. Do not use "updated on" to find real change. The platform audit records a field only when its value changes, so volume follows real change plus that heartbeat. With hundreds of thousands of CIs in hundreds of tables, tracking everything is neither necessary nor affordable, so scope it in tiers:

| Tier | What | How you detect change | History |
| --- | --- | --- | --- |
| 1 | Critical classes, with tens of controlled attributes and relationships | A change source, below | Yes |
| 2 | Other CIs you care about | Desired State audits compare current state with the rule | Not needed |
| 3 | The rest | Out of scope | None |

For tier 1, pick a change source per group of CIs:

- **Unauthorised change events, for CIs in application services.** The event is the record of the change, so no history query is needed. Check that the daily discovery date does not count as a change, and which classes are on the allowed list, because that list defines your scope.
- **A lean change log,** written by a business rule or flow on the controlled attributes: CI, attribute, old value, new value, source, timestamp.
- **A daily fingerprint:** one hash per CI over the controlled attributes and related items, stored only when it changes.
- **The platform audit table, for single-CI questions only.** It is large, slow for estate-wide queries and full of heartbeat entries. If you use it, stop auditing the last-discovered field.

Measure the volume on a pilot first. Two limits remain: with daily discovery, a change made and reverted between two runs is invisible, and the recorded time is the time of discovery, so use source timestamps such as an install date where they exist.

## Step 3: find the difference

The comparison runs in both directions: reality that was not authorised, and authorisation that did not become reality. Six cases cover it.

| Case | What you see | Classification |
| --- | --- | --- |
| 1 | IST equals SOLL | Conforming |
| 2 | IST changed, and an active change covers the CI | Change in progress; SOLL rolls forward on close |
| 3 | IST changed, no change covers the CI | Unauthorised change |
| 4 | A change covers the CI, but IST differs from what was approved | Deviating implementation |
| 5 | A change is closed, but IST shows no change | Authorised but not implemented |
| 6 | A CI exists with no owner, service, request or change | Unregistered CI |

Cases 4 and 5 are the ones teams forget, because nothing breaks when an approved change is never done. Three detections cover all six:

1. **Unauthorised change detection (event-driven).** When Discovery sees a CI property change, the system checks the allowed classes, the notification ignore period and whether an active change request covers the CI. If not covered, it raises a ci.change.unplanned event and, with event processing enabled, creates an Emergency change flagged as unauthorised ([documentation](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)). It needs the Service Mapping integration, only checks CIs in application services, and event processing is off by default.
2. **Desired State audits (scheduled).** A filter, a template with the expected attributes and relationships, and an audit that itemises failing CIs and generates follow-on tasks ([documentation, Zurich](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)). Use it for standing rules and for CIs outside application services.
3. **Change-to-IST verification (a design you add).** A scheduled comparison that finds IST changes outside any change window, and closed changes whose Affected CIs do not show the planned values after the post-implementation discovery. These are cases 3, 4 and 5.

<figure>
  <img src="/images/reconciling-soll-and-ist-diagram.svg" alt="Diagram: SOLL and IST feed three detections, and every finding ends up in one list of differences" />
  <figcaption>SOLL and IST feed all three detections, and every finding ends up in one list classified by the six cases.</figcaption>
</figure>

## Two special cases

### Software changes on a server, not the server

An updated package on a Windows server changes a related record, not the server's own attributes, so a comparison on server attributes sees nothing. Compare at host level and judge by risk: a vendor patch that closes a vulnerability is a deviation that reduces risk, while an unapproved remote-access tool deserves attention even though the server record looks untouched.

Register software SOLL as a rule, not as exact versions: per server role, the approved products, publisher, minimum version and update path, as a Desired State template. Evaluate each software change in order: covered by an active change, inside the baseline, or else a finding with a risk score.

| Observed change | Treatment |
| --- | --- |
| Newer version of an approved product, from the approved publisher | Expected drift: record as information, and let a standard change cover patch cycles |
| Version outside the rule (downgrade, unapproved major version) | Finding for review: a downgrade can reinstate a known vulnerability |
| Approved product removed or disabled (for example a security agent) | High priority |
| New product not on the baseline | Unauthorised; higher priority for tools with remote access, administrator rights or open ports |

Compare on normalised product, publisher and version, and roll findings up per host, because a patch cycle touches dozens of packages per server.

### When the people who register SOLL do not produce IST

Risk officers and architects register SOLL, while developers produce IST in fine detail such as container pods. The first group cannot judge each pod, and the second should not authorise its own work. So register SOLL at the level each group can judge, and let the pipeline carry the detail:

- **Policy** (risk officers, architects): risk classes, allowed registries, banned settings, service boundaries.
- **Guardrails** (platform team): approved base images, namespace-to-service mapping, admission rules.
- **Declared state** (developers): manifests, image digests and bill of materials per release.

Make the release the authorised unit, not the pod: the pipeline records each release as a change with digests, test evidence and approvals. Define "unauthorised" as missing provenance: a workload with no pipeline record, an unapproved registry, a digest that differs from the release, or a banned setting. Route findings to the developer team that owns the namespace, give risk officers aggregates and exceptions, and require peer review in the pipeline, so approval is independent of the implementer. What your instance can compare depends on whether Kubernetes discovery and the DevOps integration are in use.

## Step 4: reconcile

Every difference is closed by one of four decisions, made by the CI owner, not the tool:

| Decision | When | What you do |
| --- | --- | --- |
| Remediate reality | The change should not stand | Revert through an incident or corrective change; Discovery confirms the IST |
| Approve retroactively | The change is acceptable but was not authorised | Approve the Emergency change after review, complete the post-implementation review, update SOLL |
| Correct the data | The CMDB is wrong, not reality | Fix the discovery pattern, source or rule; do not edit the value by hand |
| Accept an exception | A known deviation is tolerated for a while | Record owner, reason and expiry date |

A change never implemented is either completed or cancelled with a record that SOLL no longer holds. An unregistered CI is registered or removed. Four rules keep the loop honest:

- **Never copy IST into SOLL automatically.** That makes every deviation authorised by the next run.
- **One audit record per difference,** with remediation linked to it.
- **Close by re-measurement:** the next discovery or audit shows IST equal to SOLL, or an approved exception applies.
- **Time-box and feed back.** Escalate to the Change Advisory Board (CAB) when time runs out, and treat recurring differences as a process gap.

## One truth, many viewpoints

The same difference means something different to each stakeholder. If every group keeps its own list, the lists disagree and nobody trusts any of them.

| Stakeholder | What a difference means | Question to answer |
| --- | --- | --- |
| Risk officer | An unmanaged risk, a possible control failure | How many unauthorised deviations are open in critical services, and for how long? |
| Change manager | The process was bypassed, or an approved change was not done | Which deviations have no change, and which closed changes were not verified? |
| DevOps engineer | Drift from the declared state | What differs for my service, and what should I do? |
| Security engineer | A larger attack surface | Which hosts carry unapproved or unprotected items, ranked by exposure? |
| Asset owner | Less control over their assets | Which differences await my decision? |
| Auditor | Missing evidence | Can you show detection, decision and closure for every deviation? |

A single source of truth here means one place to ask, with a traceable origin per fact, not one database. Four principles achieve it:

1. **One shared difference record.** Normalise the output of the three detections into one record type: CI, service, case (1 to 6), risk score, status, decision, owner, change link and timestamps. Standard ServiceNow produces separate records, so this is a design addition that links to them.
2. **One vocabulary and one risk score.** The same six cases, severities, statuses and decisions for everyone. Build the score from service criticality, kind of deviation, exposure such as open vulnerabilities, and age.
3. **Join on CI identity and the service hierarchy** (Business Application, Application Service, CI), so a risk officer and a DevOps engineer see the same finding at different levels.
4. **A view and an action per role, not a copy,** with the evidence kept in the record for the audit period.

The tension between DevOps speed and risk control is settled in the policy layer, through the approved baseline and pre-approved standard changes, not case by case. Where groups disagree, the baseline decides and the exception process records any departure.

## Getting started

Build the control in four steps, each useful on its own:

1. **Foundation:** scope, ownership, the definition of "covered by a change", and mandatory Affected CIs.
2. **Detect:** enable unauthorised change detection including event processing, and run the first Desired State audits.
3. **Verify:** add the change-to-IST check and a post-implementation discovery, so cases 4 and 5 become visible.
4. **Reconcile and report:** the decision model, time limits, exceptions and indicators.

Give each part an owner: the configuration manager owns the SOLL registers, the CI owner decides per difference, the change manager and CAB review unauthorised changes, and the platform owner keeps detection and discovery coverage running. Track a few indicators: the share of in-scope CIs with an owner, service and template; unauthorised changes per period; the share of closed changes verified in IST; time from detection to closure; and exceptions open past their expiry, which should be zero. For a SOC 2 Type II audit, that sequence is the evidence, so the comparison must run continuously and its output must be retained.

Pitfalls to avoid:

- Starting with every class and attribute, or tracking history for every attribute on every table: it is costly and mostly noise.
- Turning on detection but leaving event processing disabled, so nothing is created.
- Treating the CMDB as SOLL, which makes the comparison circular.
- Relying only on the standard feature, which covers application-service CIs and Discovery-visible changes.
- Reconciling by overwriting SOLL with IST.

## Sources and notes

- [Unauthorized change request, ServiceNow documentation](https://www.servicenow.com/docs/r/it-service-management/change-management/unauthorized-change-request.html)
- [Desired State, ServiceNow documentation (Zurich)](https://www.servicenow.com/docs/r/zS6yb8e~gR8BPjeviYdV9g/IsOJM_491E0e4D~gX2j~Lw)

The two pages describe the standard features. The planned values on the change, the change-to-IST comparison, the shared difference record, the change log and fingerprint, and the exception record are design recommendations, not standard features. Check audit settings, software asset management, Vulnerability Response, Kubernetes discovery and the DevOps integration against your own instance.
