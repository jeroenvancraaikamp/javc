---
title: "Drift Management: Why It Matters, Who Needs It, and How to Get It Right"
date: 2025-12-05
categories: ["IT4IT"]
excerpt: "IT environments rarely break because of one big dramatic event. More often, they erode slowly: a configuration flag quietly flipped, a firewall rule added “just for testing,” a VM resized without documentation, a registry key tweaked by an engineer in"
image: "https://javc.nl/wp-content/uploads/2025/12/drift.png"
readingTime: 3
---

IT environments rarely break because of one big dramatic event. More often, they erode slowly: a configuration flag quietly flipped, a firewall rule added “just for testing,” a VM resized without documentation, a registry key tweaked by an engineer in a hurry. Individually harmless. Cumulatively fatal. That creeping erosion is **configuration drift**—and left unmanaged, it undermines security, stability, auditability, and engineer sanity. This blog outlines what drift management is, why organisations benefit from it, and what you actually need to implement it effectively.

## 1\. What Exactly Is Drift — And Why Does It Happen?

**Configuration drift** occurs when the *actual state* of infrastructure diverges from its *documented or intended state*.  
It affects on-prem servers, cloud resources, networks, containers, end-user devices—you name it.

Drift typically appears because of:

-   Emergency fixes that never get rolled back
-   Manual changes outside of change management
-   Automation scripts overwriting each other
-   Engineers with elevated permissions “just doing a quick update”
-   Differences between environments (DTAP) growing over time
-   Patching or vendor updates changing defaults

In other words: friction between *how we think systems are configured* and *how they actually behave*.

## 2\. Why Should Anyone Care? (A Surprisingly Long List)

### Security Teams

Drift opens the door to misconfigurations—one of the most common root causes in modern breaches.  
Drift visibility directly supports frameworks like DORA, SOC 2, ISO 27001, and NIST 800-53.

### Operations Teams

Unexpected differences between servers or environments often cause failed deployments, unstable applications, and the familiar  
“works on DEV but not on PROD" scenario.

### Auditors & Risk Management

Drift management provides exactly what auditors want: traceability, evidence, control, and repeatability.

### Architects & Platform Engineers

Accurate baselines prevent architectural entropy.  
If every environment slowly mutates, you’re no longer running a platform — you’re running a zoo.

## 3\. How Is Drift Managed? (The Practical Approach)

Effective drift management is not a single tool. It’s a **capability** built from four pillars:

### Pillar 1: A Trusted Baseline

You need a clear definition of the intended state—server build templates, network configs, cloud policies, application manifests, etc.  
No baseline = no drift detection.

### Pillar 2: Continuous Data Collection

Telemetry is needed from OS-level settings, software, packages, VM/cloud resources, network devices, IAM policies, and more.  
Sources may include agents (Tanium), CM tools, ServiceNow ITOM Discovery, SCCM/Intune, SCVMM, cloud APIs, or scripts.

### Pillar 3: Intelligent Comparison

Compare intended vs actual state. Categorize drift into expected changes, tolerated but non-compliant changes, critical drift, or security-risk drift.  
Noise reduction is essential.

### Pillar 4: Remediation & Governance

Detecting drift is only the beginning—correcting it is the point.  
Automation, approvals, manual corrections, or time-limited exceptions all play a role.  
Integration with change management, CMDB, CI/CD, and security processes is key.

## 4\. Who Actually Owns Drift Management?

Responsibility typically spans multiple teams:

-   **Platform/Operations:** maintain baselines
-   **Security:** define compliance rules
-   **DevOps/Automation:** enforce desired state
-   **Change & Configuration Management:** governance
-   **Audit/Risk:** validation and oversight

## 5\. What Tools Help?

Drift capability is usually spread across several solutions:

-   Tanium for endpoint/server configuration visibility
-   ServiceNow ITOM Discovery for infrastructure state
-   Azure Policy, AWS Config, GCP Config Sync
-   Ansible, Puppet, Chef for enforcement
-   GitOps for declarative configuration
-   SIEM/SOAR for routing and automated response

## 6\. The Payoff

-   **Regulatory compliance improves**
-   **Operational stability increases**
-   **Security posture strengthens**
-   **Cloud waste reduces**
-   **Engineers sleep better** (less chaos)

## Conclusion

Drift management is not glamorous, but it is one of the simplest and most impactful practices an organisation can adopt. In a world full of automation, complexity, and constant change, the environment is always drifting. The question is: **do you notice before something breaks?**

\`\`\`

body {<br /> font-family: Arial, sans-serif;<br /> max-width: 900px;<br /> margin: 0 auto;<br /> line-height: 1.6;<br /> }<br /> h1, h2, h3 {<br /> color: #333;<br /> }<br /> h1 {<br /> margin-top: 40px;<br /> }<br /> p {<br /> margin: 12px 0;<br /> }<br /> ul {<br /> margin: 10px 0 20px 20px;<br /> }<br />
