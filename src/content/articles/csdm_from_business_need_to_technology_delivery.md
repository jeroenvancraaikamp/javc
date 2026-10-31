---
title: From Business Need to Technology Delivery
date: 2026-05-31
categories:
  - CSDM/CMDB/TBM
excerpt: The Common Service Data Model of ServiceNow (CSDM5) is increasingly gaining the attention of C-Level managers, especially since a good CMDB with accurate/complete content is considered a critical success factor for implementing DORA, SOx, SOC2 and Agentic AI. People in
image: /wp-content/uploads/2026/05/CMDB-DPM-Infographic.jpg
readingTime: 4
popular: false
draft: false
linkedin: https://www.linkedin.com/feed/update/urn:li:activity:7467259421400657920/
---

The Common Service Data Model of ServiceNow (CSDM5) is increasingly gaining the attention of C-Level managers, especially since a good CMDB with accurate/complete content is considered a critical success factor for implementing DORA, SOx, SOC2 and Agentic AI.

People in Architecture, DevOps, SecOps, Risk, and Security often use different (ISO 27.000, ISO 85.000, ITIL5, TOGAF) standards, and associated definitions. We combined the CSDM5 with a layered ArchiMate/TOGAF view of the Service Delivery Systems that make up a company’s typical IT Landscape and made it usable for Enterprise Service Mngt.  

### These are the definitions that we use to align the various languages:

  
**Business Applications** are business-facing solutions that support business capabilities, processes, or services. They typically consist of application, web, integration, and data Resources that are deployed on one or more middleware platforms. In addition to internally developed solutions, other hosted business-facing solutions and digital services may be consumed by employees, customers, and partners, or integrated with other services. These Solutions are also registered as Business Applications.

Third-party **Software-as-a-Service** (SaaS) solutions are registered as Business Applications, even when the company has limited or no visibility of the underlying resources, infrastructure, or platform components that support them and the vendor manages compliance of themselves. The SaaS Solutions are -by definition- offered as a Service and comply with the documented contractual commitments thereof. Architects model interfaces with companies Applications and the SaaS Solutions in the Architecture Repository.

**Resources** represent stable discoverable instances of **SDLC Application Components** (subsystems that are designed, build, tested and integrated). Components are usually stored in Source Code Repositories, are often deployed via CI/CD Pipelines. DevOps Orchestration and Observability tools manage/monitor their behavior.

**Middleware** represents software that provides runtime services to applications and resources and typically runs on physical or virtual Nodes. Examples include web servers, application servers, database servers, integration platforms, messaging platforms, and orchestration platforms.

A **Service Instance** represents each deployment of a Business Application. Separate Service Instances are typically created for Development, Test, Acceptance, and Production environments, allowing each deployment to be managed, monitored, and independently related to its supporting technology stack.

**Workplace/Productivity Services** (PC’s, Mobile Phones, Tablets, etc) are registered as Service Offerings rather than Business Applications. Software deployed to end-user devices is managed through Assets, Software Installations, and Software License records.

**Environments/Streets** are IP domains that are typically segregated from each other, and that are used for a particular purpose or audience. E.g. (what is running on) Nodes that are deployed in Test Environment cannot interact with (what is running on) Nodes that are Deployed in Production Environment. Some companies also use customer/region specific Streets.

**Resources, Middleware, Nodes, and their dependencies (in CSDM5: “Service Delivery Systems”) are automatically discovered and automatically registered/updated in the CMDB.** These configuration items are related to and mapped to the Service Instance(s) that depend on them, providing end-to-end visibility into the deployed solution architecture.

Any capability provided “as a service” is represented by a **Service Offering**. Examples include Application Services, Middleware Services, Infrastructure Services, Workplace Services, and Corporate Services. Service Offerings may be environment-specific, region-specific, or location-specific. Each Service Offering defines its associated commitments, subscriptions, support contacts, ownership, and service expectations.

![](/wp-content/uploads/2026/06/ZERO-TOUCH-CMDB-Class-Model.png)

**Offered Services** consumed exclusively by IT are classified as **Technology Management Services.** Services consumed by business users, customers, or external parties are classified as **Business Services**.

**Foundational Data** is shared information used in multiple practices. Services, Offerings, Applications, Dynamic CI-Groups, and Equipment typically refer to foundational data, e.g. to record asset ownership, asset consumers, IT groups, contact persons, subscribers, customers, vendors, process models, product models, etc.

The thousands of **SDLC Application Components** typically inherit foundational references from the Application/Solution that contain them. Risk ratings of Applications apply to the components and instances that are contained/used by the Application.  

### **ZERO-TOUCH CMDB**

  
In this model, Resources, Middleware and Nodes may not be created/updated in the CMDB by humans. They only contain the technical reality and the relations, names, and attribute values that are discovered. Typically references to Foundational data cannot be technically discovered. This is why the CMDB CI’s -in this CSDM interpretation- are always directly or indirectly to be related to an Application and/or Offering that contains reference attributes such as “Business Owner” , “IT Owner” , “Support Group” , “Change Group” , “CAB Group”, “Location”, “Organization”, etc. Organization could be historical “Company => Business Unit => Department” structure or Modern Agile “Tribe/ART => Cluster/Chapter ==> DevSecOps Team/Squad” structure.

![](/wp-content/uploads/2026/06/CSDM5-incl-Relation-Labels.jpg)
