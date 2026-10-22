---
title: "Best Practices for CSDM 5"
date: 2025-06-01
categories: ["TBM/CSDM/CMDB"]
excerpt: "So, you have read the CSDM 5, and you have a general idea. However, there are numerous open questions and choices . This article describes the Practices that i recommend for what (not) to model in ServiceNow. Applying these recommendations"
image: "/wp-content/uploads/2025/06/CSDM5_artifacts-scaled.png"
readingTime: 8
---

So, you have read the CSDM 5, and you have a general idea. However, there are numerous open questions and choices . This article describes the Practices that i recommend for what (not) to model in ServiceNow. Applying these recommendations avoid issues down the line.

## What to store in ServiceNow:

### In the Digital Products Portfolio (Baselines):

-   All Digital Services that are formally offered as a Service to the Company, incl. Infrastructure, Applications, and AI Digital Assets (non versioned).
-   Business Applications, directly used by the Business (non versioned)
-   IT Components & Platforms, supporting the Business (versioned)
-   Product Models e.g. for Hardware/Software Assets (non-versioned)

### In the CMDB (versioned Instances):

-   Infra of (or managed by) the Company
-   Items deployed/configured on Infra of the Company
-   Company-owned items, deployed on infra of others
-   Connected End-user Devices, incl. what is installed in/on it.
-   All (to be paid) Licenses for Product/Service Instances.

## What NOT store in ServiceNow:

-   Decomposition/components of Services provided by others, e.g. GSM Antennas of a Mobile Telecom Providers.
-   Infrastructure that is integral part of an external SAAS/PAAS offering.
-   MS-Sharepoint Sites, MS-Teams Channels. Confluence Sites, Fileshares, etc. as Business Applications
-   Portfolio Items that are not offered/provided to the company, e.g. for which the Company has no formal agreement with the manufacturer, vendor or Managed Service Provider
-   Portfolio and CMDB Items that are not owned/procured by an accountable representative of the Company. E.g. yahoo.com
-   CMDB Items for which Incident, Problem, Change and Request Mngt is done elsewhere by others than the Company.
-   Financial Attributes that are maintained in the General Ledger of the company (e.g. book-value, depreciation, etc)
-   Items that are not needed in/for Supported ServiceNow Practices
-   All that is currently excluded by the Company. E.g. on-premise Servers, Power and OT Devices, incl. what is running in/on it.

* * *

**ServiceNow as an Enterprise Service Management Platform**

ServiceNow is a platform intended for enterprise-wide service management. *Services* are the most important artifacts within the platform. Without referencing the service being offered, one cannot determine the outcome or commitments applicable to incidents, problems, or changes. Only services that are formalized—ideally documented in a formal agreement between the company and the provider—should be recorded in ServiceNow.

If a company wants to measure service provider performance, register the services it depends on, maintain a single source of truth for all open issues, or apply its AI capabilities to assess and classify incidents, problems, or changes, it must register the services offered by providers. Related records (e.g., incidents and changes) may be automatically e-bonded with the vendor’s Service Management System, via email or APIs.

* * *

**Application Portfolio and Baselines**

Enterprise Architects (EA) and Application Portfolio Managers (APM) focus on *application baselines* that are used by the business, for the business. They manage the lifecycle of these baselines, including horizontal dependencies (interfaces) and vertical dependencies (technology stacks). They do not manage or track the deployment of instances of these baselines. However, they do want to know where the applications are deployed and what their actual dependencies are.

The Business Application Portfolio remains manageable only if it excludes artifacts that would pollute it or that fall under different governance models. For example, if one were to register Notepad++ as a Business Application, it would imply the need for RBAC on access, BIA/CIA ratings, and a lifecycle plan—all for a utility application. Since a typical PC or Mac may have hundreds of such desktop apps, EA and APM would be overwhelmed managing items that are not true business applications. Desktop and mobile apps are typically deployed via app stores or endpoint managers and do not go through change control.

**Recommendation:** Do not include desktop or mobile apps in the Business Application Portfolio. If an item is critical to the business, it should not be deployed on a PC or mobile device.

* * *

**Versioning and Discovery**

Application *baselines* are not versioned in the portfolio to avoid exponential growth. A baseline can have multiple deployed instances, each with a different version. These versions are typically discovered and federated automatically—requiring no manual effort. Each instance can only run one version at a time.

If APM is managed outside of ServiceNow, instance version counts can be pushed from ServiceNow into tools such as SAP LeanIX or Apptio. If baselines were versioned, then every instance would need to be re-assigned during upgrades, which is unnecessary unless the application and its data are fundamentally replaced. For example, transitioning from SAP R/3 to SAP S/4HANA in the cloud justifies the creation of a new baseline.

* * *

**CMDB and Asset Management**

Deployed desktop and mobile application instances are discoverable and federated into the CMDB. After correlation and normalization, they support asset management, security operations, and risk management. Installed and running components on end-user devices appear on the *Device Form*. The *device* and the *service offering* are both directly related to the incident. While you *can* reference the installed/running item, it is best practice to register the *device* as the impacted CI.

Infrastructure software, configuration settings, middleware, and technical tools that are not consumed directly by users should **not** be registered as Business Applications. Their lifecycle is not managed by APM, and access is not governed by RBAC. Changes to infrastructure—such as patching OSes or DBMS platforms—affect multiple business applications and are handled differently than changes to a single business app. Replacing EOL components typically involves large-scale infrastructure projects. Discovery and federation help confirm the versions and locations of such items.

In LeanIX, IT Components are often versioned at a major level (e.g., *MS SQL Server 2016*). In ServiceNow, they are generally recorded as non-versioned *Service Offerings* (e.g., *MS SQL Server Support* as part of the *Database Administration* service).

* * *

**External Infrastructure and Risk Considerations**

If business applications (or their data/components) are deployed on third-party infrastructure, risk and audit stakeholders will want visibility. It is recommended that deployments and changes involving company-owned applications be tracked and approved via the internal Service Management solution.

Where fees apply to deployed items, companies should actively monitor usage and utilization. If license costs are based on usage metrics beyond install count, those metrics should be monitored as well.

Providers offering black-box services rarely expose detailed internal component data. This is acceptable if the provider guarantees availability, performance, and security. Compliance evidence can be requested without storing the provider’s internal data in the company’s CMDB—thus avoiding the need to maintain sensitive external information.

Registering items provided by third parties—without a formal agreement in place—is risky. The provider has no obligation to support the company, maintain compliance, or ensure continuity. Auditors and risk officers will likely deem this non-compliant.

Services provided by others *must* be represented in the company’s ServiceNow system if they are relied upon. If those providers manage their own incidents, problems, or changes in their own ITSM tool, their internal components should not be duplicated in the company's CMDB—unless federated under strict governance, with attention to security, GDPR, and compliance implications.

* * *

**Managing Scope and Performance in ServiceNow**

Overloading ServiceNow with unnecessary details (e.g., file-level data on user devices) will degrade performance. Only items relevant to practices supported by ServiceNow or its stakeholders should be registered.

CMDB build-up is a multi-year process and should be carefully planned and prioritized. Focus on critical items first. If part of the business is being sold, discovery in that area may be deprioritized. Transient infrastructure (e.g., temporary backup VMs) should not be registered unless persistently used. Decommissioned resources should be retired promptly. Document and periodically review the scope and plans for services, assets, and configurations.

* * *

**Modern Collaboration Platforms and Their Classification**

Items like SharePoint sites, Confluence spaces, Google Workspace, and MS Teams channels typically are not managed via incident or change processes. Therefore, they should not be classified as Business Applications. Instead:

-   Register “SharePoint,” “Confluence,” and “MS Teams” as Business Applications.
-   Auto-register URLs as *Application Services* via federation from platforms like O365 or Atlassian.
-   Maintain consistent classification and naming standards.

Note: Some auditors may raise concerns about using such platforms for mission-critical purposes.

* * *

**O365 and Collaboration Agents**

Mail and collaboration agents (e.g., Outlook, Teams clients) on end-user devices should be registered like any other desktop or mobile app. Incidents should be raised against the *device*, not the installed agent.

Some companies register key O365 components as Business Applications and apply the same governance policies. However, O365 tenants and apps are typically maintained centrally and differ from standard business applications.

**Recommendation:** Register the *O365 Suite* as one Business Application. Define *Corporate Mail*, *Collaboration*, and *Content Management* as Infrastructure Services or Service Offerings.

* * *

**SDLC Components and Baselines**

SDLC components (not listed in the referenced table) are either registered in ServiceNow as versioned baselines or not registered at all. Both approaches have pros and cons (see other blogs). When registered, these components are versioned and may be deployed. Their instances can be discovered or federated across infrastructure or cloud environments.
