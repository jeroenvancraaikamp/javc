---
title: "Change and Drift Mngt in 2025"
date: 2025-12-04
categories: ["IT4IT","ServiceNow"]
excerpt: "Despite rapid advances in cloud computing, DevOps, automation, and Infrastructure-as-Code, many organizations still struggle with a fundamental question: What actually constitutes a “change” in 2025 — and what does not? Is every drift detected, to be managed via change? Misclassification"
image: "https://javc.nl/wp-content/uploads/2025/12/changedrift.png"
readingTime: 5
---

Despite rapid advances in cloud computing, DevOps, automation, and Infrastructure-as-Code, many organizations still struggle with a fundamental question:

**What actually constitutes a “change” in 2025 — and what does not? Is every drift detected, to be managed via change?**

Misclassification leads to unnecessary workload for change managers, friction for engineering teams, and reduced operational clarity. At the same time, under-governance creates unacceptable risk. Modern Change Management must therefore strike a careful balance between speed and control, using clear decision criteria and placing each activity in the appropriate governance or technology domain. This article summarizes current best practices and provides practical guidance for IT teams, architects, and operational leaders.

## 1\. The Core Purpose of Change Management Has Not Changed

Change Management still exists to:

-   Manage and reduce risk before production modifications
-   Ensure visibility, coordination, and communication
-   Maintain accountability and traceability
-   Protect the stability of business-critical services

What has changed is the environment in which these goals must be achieved.  
Modern platforms generate thousands of automatic adjustments every day.  
Attempting to govern all of them through the Change module is neither feasible nor valuable.

## 2\. What Is a Change?

A “change” is any planned modification that may materially affect:

-   Service behavior or user experience
-   Production data or data integrity
-   Platform stability or performance
-   Security posture or regulatory compliance
-   Interconnected services or technical dependencies

Examples that require Change Management include:

-   Application feature or logic modifications
-   API contract changes
-   Database schema updates
-   Network, firewall, routing, or DNS changes
-   IAM role and policy adjustments
-   Infrastructure or cluster upgrades
-   Modifications to security controls or monitoring configurations

These activities carry inherent risk and must follow a controlled approval process.

## 3\. What Is Not a Change (Anymore)

Many operational activities that once required approval no longer meet the criteria  
for Change Management. These include:

-   Cloud elasticity and autoscaling (Kubernetes HPA/VPA, VM autoscaling)
-   CI/CD pipeline executions (deployments through pre-approved patterns)
-   IaC re-applies where the model has not changed
-   Endpoint software deployment via Intune, SCCM, or MDM
-   Cloud provider maintenance events
-   Failover, high availability, and self-healing behaviors
-   Signature updates for security tools
-   Runtime processes such as indexing or caching

These activities are governed by platform policies and operational frameworks,  
not by Change Management.

## 4\. Standard Changes: Enabling Speed with Control

Standard Changes provide a structured way to increase delivery velocity  
while maintaining governance. A Standard Change is:

-   Pre-approved
-   Documented
-   Low-risk
-   Repeatable
-   Often automated

Typical examples include:

-   VM provisioning via approved templates
-   Routine patching cycles
-   Automated certificate renewals
-   CI/CD deployments using locked-down pipelines

Approving the pattern once is far more effective than approving each execution individually.

## 5\. Governance: What Belongs Where?

Clear allocation of information to the correct system of record is essential.

### Change Management

-   Planned, risk-bearing production changes
-   Deployment plans, approvals, back-out plans
-   Impact assessment, affected services, timing

### CI/CD & DevOps Platforms

-   Source code
-   Build and deployment logs
-   Pipeline definitions
-   Test results and scan outcomes

### IaC & Configuration Automation

-   Desired state definitions
-   Template updates
-   Execution logs
-   GitOps reconciliation

### CMDB & ITOM

-   Actual runtime state
-   Service topology and dependencies
-   Discovered configuration

### Enterprise Architecture & Portfolio

-   Roadmaps
-   Standards and patterns
-   Investment and demand alignment

This separation of concerns improves traceability, auditability, and operational clarity.

## 6\. Drift: An Operational Signal, Not a Change

Drift occurs when the actual configuration diverges from the desired configuration.  
It is detected by IaC engines, cloud governance tools, and ITOM compliance mechanisms.

Drift does not inherently require a change. Only remediation with production risk  
should be governed through Change Management.

Examples requiring a change:

-   Restoring unauthorized firewall modifications
-   Correcting IAM privilege drift
-   Reverting insecure configuration deviations

Examples that do not require a change:

-   GitOps/IaC auto-remediation
-   Metadata-only discrepancies
-   Safe operational adjustments

If drift exposes an outdated or incorrect desired-state model, the correction  
belongs in design (Architecture) or delivery (Build & Integrate), not in  
Change Management — although deployment of the updated model does require governance.

## 7\. Understanding Where the “HOW” Is Determined

One of the most common misunderstandings is assuming that Change Management defines how work will be implemented.  
It does not.

The “HOW” is determined progressively:

-   **Demand Management** → Why we do something, high-level scope
-   **Architecture** → Initial solution approach and platform selection
-   **Delivery / Story Management** → The detailed implementation  
    (APIs, data models, IaC, pipelines, test strategy)
-   **Change Management** → How it will be deployed safely to production
-   **Operations** → Runtime behavior, drift monitoring, and service performance

Each stage has distinct responsibilities and artefacts. Clarity here reduces rework,  
accelerates delivery, and improves governance.

## 8\. Communication Outside Change Management

Not all alterations require a change record, but many still require communication,  
especially when expectations or operational behavior might be affected.

Examples include:

-   Feature flag adjustments
-   Canary releases
-   Pipeline or automation updates
-   Internal environment changes
-   Runtime behavior tuning

Effective communication reduces incidents and avoids unnecessary escalations.

## Conclusion

Modern Change Management is not about slowing down delivery; it is about ensuring that risk-bearing changes  
are introduced into production safely and predictably.

Organizations that succeed in 2025 do the following:

1.  Govern only what truly carries production risk.
2.  Place information in the correct system of record.
3.  Embrace automation where patterns are proven and safe.
4.  Treat drift as an operational concern, not a governance one.
5.  Ensure each lifecycle stage plays its proper role in defining the “HOW”.
6.  Communicate proactively, even when Change Management is not involved.

When implemented well, Change Management becomes a lightweight, effective safety mechanism that supports modern engineering practices rather than constraining them.
