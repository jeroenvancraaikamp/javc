---
title: "Going overboard with CSDM 5?"
date: 2025-06-07
categories: ["ServiceNow","CSDM/CMDB/TBM"]
excerpt: "ServiceNow published a PowerPoint presentation with 132 slides with examples on how one could model the IT landscape accormodeoding to CSDM 5. Although I generally love CSDM, some appear to go overboard when modelling their IT landscape in ServiceNow. Let's"
image: "/wp-content/uploads/2025/06/ServiceNow_in_CSDM_5.png"
readingTime: 11
---

ServiceNow published a [**PowerPoint presentation with 132 slides with examples**](https://learning.servicenow.com/nowcreate?id=nc_asset&asset_id=90b0eaca879dae106838fd16dabb3502&nc_source=copy_asset_link) on how one could model the IT landscape accormodeoding to CSDM 5. Although I generally love CSDM, some appear to go overboard when modelling their IT landscape in ServiceNow. Let's take an example: **How (not) to model the ServiceNow Platform in CSDM 5.**

The ServiceNow platform that is used for different types, sizes, maturities of companies, for different things, by different people, in different cultures, that often are using multiple process frameworks. The CSDM helps to structure/govern the data, but it is not a one-size-fits-all model. Furthermore, the CSDM is still evolving. CSDM 5 is already so much better than its predecessors. But Version 5, is a lot more complex, and open to interpreation, than its predecessors of resp. 4 and 6 years ago.

E.g. CSDM 5 now has Service Portfolio's (DPM), Taxonomy Nodes (DPM), Value Chains (Foundation), Project Portfolio's (SPM), Business Units (Foundation), and Top-level business Capabilities (SPM). Each group has/uses their own artefacts. Not everybody reads the CSDM 5 whitepaper, or adheres to the definitions/recommendations therein. In all fairness: CSDM leaves quite a bit room for interpretation. So, a lot of companies fill all the 6 artefacts with the same "HR", "IT", "Risk", "Finance", "Legal", "Supply Chain", "Marketing", "Sales" and "CRM" values. Others put different values in each of the 6 artefacts. Some organisations want to cater for every single exception/preference that anyone may have.

**I recommend to use artefacts for its intended purpose, re-use as much as possible, and keep IT simple.** Also, i believe in a layered model, in which the Customers do Business with the Company, The Business (and its users) is supported by integrated/managed Solutions, which solutions are supported by Commodity Technology Towers.

I usually recommend to differentiate between an Application Portfolio, an Component Portfolio, a Project/Program Portfolio, a Technical Service Portfolio and a Business Service Portfolio. All items within those portfolios should be linked to relevant Foundational Artefacts such as a Value Chains, Business Units, Departments, Companies, Regions, Countries, Locations, Owners, Groups to which the item belongs. One could create multiple portfolios of each type, but i would not recommend to have ever more than 6-8 portfolios of a particular type. Examples:

1.  One Application Portfolio for Business Applications, one for IT4IT Applications/tools, and one for Desktop/Mobile Applications
2.  One Component Portfolio for PAAS IT-Components and one for SDLC IT-Components
3.  One Technology Service Portfolio per PAAS/IAAS Technology Tower
4.  One Business Service Portfolio per Business Unit
5.  One Project/Program Portfolio per Tribe or Enterprise Domain

Companies, that do not have services defined could start with providing their applications "as a SAAS Service". If those SAAS services, (will) have commitments, entitlements, subscriptions, and SLA's, then one could create one Service Offering per Business Application. If your applications can have multiple (environment/location specific) offerings, one could choose to register the application as a Service, It is not recommended to register each desktop/mobile applications "as a service".

Each Service in the Service Portfolio, belongs to one Taxonomy Node and is owned by one Accountable Service Owner. The Business Service Portfolio should NOT be Business Application-specific (Applications should be in the Technical Application Portfolio). E.g. Workday is in Application (Service) Portfolio, and "Employee Joiner, Mover & Leaver Support" is in the Business Service Portfolio, both are linked to the Workday Production Service Instance (CI).

These principles IMHO cannot be platform specific, and must be endorsed and enforced enterprise-wide because those provide the foundation for governance and organisation.

## HOW TO GO OVERBOARD?

In the ServiceNow example for ServiceNow there is one Business Application record for the ServiceNow Platform. That ServiceNow platform host multiple individual Business Applications. Philosophers may argue that ServiceNow is only a Business Application if it is used by the Business for the Business. I'm not a Philosopher. I believe Servicenow Applications are hosted solutions that are used by Business Users, which would justify creation of a Business Application, a Business Service and Business Service Offerings for it.

That said; Business Capabilities, IMHO should be just that. I.e. "Manage Technology" IMHO is not a Business Capability. Remember; Business Capabilities are in the "Design and Planning" domain of the CSDM 5, they should provide insight which Business Application is used for what, without going overboard. For any Business Application i would expect to see a handful of of Business Capabilities being supported. I would expect a Business Capability to be provided on average by a handful of Business Applications. By the time each Business Application enables two dozen of Business Capabilities, or when majority of the Business Capability is only provided by one application, you probably went overboard.

Modeling "SN Incident Mgmt" as a Business Application, IMHO could easily constitute of "going overboard", because the ServiceNow Platform enables approx. 200 unique Capabilities similar to "SN Incident Mgmt". If for each of those business application, one would create environment-specific Service Instances, this would lead to 800 service instances. Each of those 800 need to get a relation with a "Yokohama" instance of the platform. Even if you are not using all ServiceNow Applications, modelling individual ServiceNow Capabilities as Business Applications, IMHO really is not a good idea.

A Business Service is a recognizable collection of Service Offerings. The Business Service "End User Service" is not a Service that i would expect to be provided by the ServiceNow platform. The Service Offering "SN Incident Mgmt" is something that I would not expect to be provided "as a Service". Similarly, i would expect "System Monitoring" to be related Observability, but not to ServiceNow.

If you don't believe me, please feel free to put this model into servicenow, including all artefacts and all relations. Then ask the auditors and compliance officers to review your, HLD's, DLD's, roadmaps, OKR's, BIA's/CIA's for each of your "applications".Then, raise a resource request to get all the compliance findings resolved. Then, ask a typical untrained business user to raise an issue that "incidents on Workday are assigned to the wrong group".

## HOW TO DO IT 40-60% MORE EFFICIENT?

The various portfolios would be setup as described in the foundation section

Assuming the ServiceNow Platform Innovation and Maintenance is done in ServiceNow, i would register

-   One Program for the ServiceNow Platform (or one for resp,. IT, HR, etc, depending who funds what)
-   One Demand/Initiative per Objective & Key Result
-   One Project per approved demand/initiative, that requires budget/business case
-   As many User Stories per Project, Product as needed.
-   One Agile DevOps Product per ServiceNow Application (see below)
-   One Group/Agile Board per DevOps Team

I would model the CSDM Artefacts for the whole ServiceNow Platform based on the following:

### 

-   Foundation (in Grey)

-   16 Out-of-the-Box **Value Chains**
-   One **Product Feature** per Servicenow Feature (CMDB, Portal, Mobile App, Virtual Agent, Workspace, etc)
-   One **Business Proces**s per process that is enabled by ServiceNow (e.g. INC, PRB, CHG, REQ)
-   One **Building/Locatio**n for the Data Center
-   One **Group** that Supports, Changes, Manages, and Approves the Changes on ServiceNow
-   One **User** of the **Company,** owning the Service Platform and its Services/Offerings, and one user for each member of the group
-   One **Product Model** per similar Hardware/Software Product

### 

-   Design & Planning (in Blue)

-   One **Business** **Capability** per ServiceNow Application (e.g. ITSM, ITAM, ITOM, CSM, etc)
-   One **Business Application** for the ServiceNow Platform

### 

-   Design & Build (in Red)

-   One **SDLC Componen**t for the JAVA MidServer for Windows and one per developed AI Agent. (future)

### 

-   Service Delivery (Orange)

-   One **Technical/Business Service** for Enterprise Service Management (depending if Servicenow is used for Business or for Technolgy)
-   One **Technical/Business Service Offering** for the ServiceNow Platform (assuming only one team is working on it)
-   One **Technical Service Offering** for each IAAS/PAAS item type that is offered as a Service.
-   One (Application) **Service Instance** (cmbd\_ci\_service\_auto) per deployed ServiceNow instance
-   One **Application** (cmdb\_ci\_app) per instance of the MidServer App
-   One **JAVA Server** (cmdb\_ci\_app\_server\_java) installed on a WIndows Server, hosting the the non-prod MidServer Apps. and one for the non-prod MidServer Apps.
-   One **Windows/Linux Server** for the non-prod MidServer Apps (servers), and one for the prod MidServer Apps (servers).
-   One **Virtual Machine** per Windows/Linux Server
-   One **Azure Data Center** on which the Windows/Linux VM's are hosted

### 

-   Service Consumption (Green)

-   One request to procure the Servers, VM's, etc
-   Other examples...

## Rationale:

1.  Incidents, Problems and Changes IMHO must be related to a Service Offering (which determines who supports the offering), and optionally the impacted configuration item that is expected to be broken (which determines what may need to be repaired). Some ServiceNow Platform/Process Owners allow some of the foundational data (e.g. Location, Company, BU, Product Feature, Business Process) to be referred to from an incident.
2.  I recommend to register one Service Instance per ServiceNow Instance, So, although i know, companies procure licenses for ITAM, ITOM, ITSM applications from ServiceNow, and i know ServiceNow is a Platform Host OOTB, i don't model the ServiceNow Application as such in ServiceNow. Instead I register the Applications as Capabilities. considering ServiceNow offers dozens of Application Capabilities. I accept, this means I can't do Lifecycle management on the individual ServiceNow Applications, However, this does allow me to relate the Business Processes to the Capabilities. Best of all, all of the above baselines are only registered/maintained once, and we only have to do one BIA/CIA review and one periodic External Audit for the whole ServiceNow platform.
3.  Typically IT, HR, GRC, SECURITY, LEGAL and CSM are political silo's in large enterprises. I recommend to deal with the politics in the boardroom, but never, never, recommend to model segregated silios into Servicenow, unless if different servicenow contracts with segregated instances are in place, and if total cost of ownership is not an important factor for the enterprise.. In my almost 20 years of working with ServiceNow, I have not seen a single domain/instance segregated ServiceNow contract that works. well/efficient. Most ServiceNow Interfaces/records are not domain specific, Those that are, can be secured/managed, without instance/domain segregation.
4.  The Service "Enterprise Service Management" also may hold other offerings, e.g. for Apptio, LeanIX, or MetricStream Platforms, if ESM is dispersed across multiple platforms. Also this allows to have Multiple Servicenow Platforms within the Enterprise (e.g. whilst merging multiple ServiceNow contracts)
5.  After having studied the future of AI in ServiceNow and other AI Platforms, I believe, the picture drawn below is suited best for large enterprises,
6.  I could model the ServiceNow Plugins as deployable SDLC components, but why maintain a repository with Plugins yourself, that is already maintained elsewhere (at their own cost) by ServiceNow. Same applies to the ServiceNow Store Apps. I believe it suffices to register the procured/used Business Capabilities of the Platform, as such and relate them with the business processes that they enable/support.
7.  If you decide to export some of the ServiceNow content to a Database/datalake (periodically or near-real-time), so that others can use that data without impacting ServiceNow performance, you also need to model the Databases, the DBMS's (or Database Services), the tools that federates the data from ServiceNow into the DB.
8.  As you may have seen, i have not recorded any versions of servicenow products, not for the baselines and not for the instances. I'm assuming the servicenow instances get upgraded, instead of being replaced. During such upgrade (which should not take months), the integrations/dependancies stay intact. If the platform capabilities get drastically changed during a major upgrade, just add/remove/update them during the upgrade. That said, anything that gets discoverd automatically (e.g. OS, JAVA server, etc) is versioned. For an overview of what is contained in which Major ServiceNow release, i recommend to use the ServiceNow product documentation and the Partner videos.

**BTW: Did i mention my "save harbor" statement :-)**

## SUMMARY

Multiple alternatives are possible to model ServiceNow, whilst using the definitions and artefacts of CSDM5, I recommend to use the most efficient way, that is still fit for purpose and still fit for audience. IMHO that is as per the picture below.

I have setup (governance for) a dozen of ServiceNow Platforms over the last decades and -in all honesty- i haven't always done it efficiently, but i have learned from the experience.

If you use my recommendation, you will likely reduce the number of managed items with 40-60% (and reduce the administrative overhead of registering/review and documentation of the ServiceNow Platform), compared to the example provided by ServiceNow. And yes, you will not be able to register the lifecycle of the individual apps in ServiceNow. But is that bad, if there is only one ServiceNow platform, with one platform owner, with instances that are shared by multiple stakeholders?

![](/wp-content/uploads/2025/06/How_to_model_servicenow_in_csdm_5-scaled.png)
