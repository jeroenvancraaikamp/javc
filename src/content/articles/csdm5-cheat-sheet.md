---
title: "CSDM5 Cheat Sheet"
date: 2026-02-01
categories: ["CSDM/CMDB/TBM"]
excerpt: "CSDM5 is a Data Model that always leads to interesting discussions because each persona views it from their own perspective. This cheat sheet should help with what goes where if one sticks to the CSDM5 definitions/intentions of the various artefacts."
image: "/wp-content/uploads/2025/01/teampicture3.webp"
readingTime: 7
---

CSDM5 is a Data Model that always leads to interesting discussions because each persona views it from their own perspective. This cheat sheet should help with what goes where if one sticks to the CSDM5 definitions/intentions of the various artefacts. If one does so, there is little to no need to customize the tables or relations between the tables.  
  
The following definitions/principles apply throughout this cheat-sheet::  

-   Baselines are portfolio items that are designed, procured, or developed and documented in catalogs, e.g., a "Volvo V70."  
    Instances are configuration items that are deployed/delivered, E.g. That unique Volvo V70 with license plate XX-YYY-ZZ
-   All baseline portfolio items are owned by one Business Owner/Lead and one Technical Owner/Lead.  
    All CMDB instances are owned by the owner of the Baseline Portfolio item that contains that instance.
-   A "Contains::Contained by" relation is a 1-to-many relation between a parent item and a child item.  
    A parent item may contain multiple child items, but a child item may not be contained by multiple parent items.
-   A "Depends on::depended on by" relation is a many-to-many relation between a parent item and child items.  
    A parent item may depend on many child items, and a child may depend on many parent items.

![](/wp-content/uploads/2026/02/CSDM5_including_rlation_labels.png)

### Business Application (APM baseline)

-   Coarse-grained Solution, which is managed as a whole
-   May be part of one (multi-domain) Application Platform
-   Enables zero or more Business Capabilities
-   Contains zero or more Application Components
-   Depends on zero or more Service Instances
-   Has one Business Owner (e.g a tribe Lead)
-   Has one Technical/IT Owner (e,g, a tech lead)
-   Has a CIAP rating and a Risk Profile that are both reviewed periodically,
-   Is Architected by one Domain (led by a Domain Architect)

### Application Component (DevSecOps baseline)

-   Fine-grained Versioned Digital Product Component
-   Stored in Source Code Mngt (SCM/IAC) Repository
-   Deployable via CICD Piplelines
-   Part of only one Business Application
-   Contains zero or more Service Instances

### Service Instance (SPM instance)

-   Used for either Development, Test, Acceptance, or Production
-   Contained by one Technical Mngt Service Offering
-   Depended on by one or more Business Service Offerings
-   Depended on by one or more Business Applications
-   Depends on one or more Configuration Items
-   May be a child of another Service Instance

### Dynamic CI Group (SPM instance)

-   Used to group similar Infra CI’s that are changed/updated as a group
-   Always “Contained by" one Technical Mngt Service Offering
-   Refers to one or more Configuration Items (query-based snapshot)
-   Cannot be related to a Service Instance or another Dynamic CI Group
-   Also included (in its own class) in the Service Instance table

### Service Delivery System, aka Config Item (CMDB Instance)

-   is a unique discoverable installation/deployment of a digital product (baseline)
-   is stable and has a meaningful lifecycle (i.e., not ephemeralruntime artefact)
-   may be a discovered instance of an Application Component
-   may be related to zero or more configuration items (misc. relationship types)
-   may be depended on by one or more Service Instances
-   may be related to a procured asset
-   may only be created/updated via discovery/federation, not by humans
-   inherits managed attributes from the portfolio item that contains this CI

### Business Service (SPM baseline)

-   is a defined service (in a business/sales catalog)
-   is consumed by internal and/or external business users
-   Is the parent of one or more Business Service Offerings
-   Is a leaf under one Service Taxonomy node/branch

### Business Service Offering (SPM baseline)

-   Is a child of one (parent) Service
-   Is Product and/or Region-specific
-   Has Specific Commitments (SLA's)
-   Has Specific Subscriptions/Subscribers
-   Contains zero or more Service Instances
-   Contains zero or more Dynamic CI Groups
-   FUNCTIONALLY Supported by one Support Group
-   Changed by one Change Group
-   Obtains request/change approvals from one Approval Group

### Technical Mngt Service (SPM baseline)

-   is a defined service (in a technical catalog)
-   Is consumed by one or more Technology Teams and/or DevSecOps Teams
-   Is the parent of one or more Technology Mngt Service Offerings
-   Is a leaf under one Service Taxonomy node/branch

### Technical Mngt Service Offering (SPM baseline)

-   Is a child of one (parent) Service
-   Is Product and/or Region-specific
-   Has Specific Commitments (e.g., OLA's, UC's, RTO, RPO, etc)
-   Has Specific Subscriptions/Subscribers
-   Contains zero or more Service Instances or Dynamic CI Groups
-   TECHNICALLY Supported by one Support Group
-   Changed by one Change Group
-   Obtains request/change approvals from one Approval Group

### Hardware Asset (ITAM Instance)

-   is a procured item that is/was stored or installed.
-   is manufactured by a Manufacturer
-   It is provided (on a date) by a Vendor
-   It is covered under warranty until the warranty end date.
-   may be covered under a maintenance agreement
-   may be an instance of a Product Model
-   has an install status and a location where it can be found
-   may be related to a discovered/federated Configuration item

### **Notes/Tips:**

-   Service Portfolio Mngt (SPM) Service Instances link/map the discovered CMDB CI Instances to the Baselines that depend on the CMDB Instances.  
    Ideally, SPM Instances and their relationships are created/updated automatically based on information available in the CI or in an SVCN tag on the CI.
-   ChatGPT and some people who claim to be CSDM experts recommend creating Environment Specific Technical Management Service Offerings. However, because an Environment-specific Service Instance can be contained only within one technical management service offering, this can easily lead to duplication.
-   Companies that differentiate between Functional Maintenance and Technical Maintenance may want to create Business Service Offerings for the group providing Functional Support and Technical Management Offerings for the group providing TECHNICAL Support. Link the two via the Service Instance that sits between them.
-   If you define different offerings for different levels of technical support on the same application, you will find that you can not create "contains::contained by" relations from multiple technical offerings to the same "Application X, Production" Service Instance. Replacing the "contains" relation with multiple "depends on" relations is not recommended, as it no longer allows automatic determination of which offering applies when "Application X, Production" goes down.
-   If you have two teams, one taking care of the EMEA instance and one taking care of the NAM instance of a Business Application, technically, you can create different Service Instances; one for the EMEA instance and one for the NAM instance, even when they are the same SAAS application. For each team, one should create its own service offering, commitments, and subscriptions. Please note: service performance is recorded at the offering level, not at the service instance level. Also note: when one "instance"" is reported to be down, that does not mean that the other instance automatically is reported to be down as well.
-   Because of the limitations above, I recommend creating one Service Instance per SaaS instance and having it contained by a single Technical Management Service Offering. In addition, you can create multiple Business Service Offerings that depend (N:M) on the Service Instance, one offering per region, each having its own opening hours, commitments, and subscriptions. Service performance can then be recorded for the business offering, and platform performance and detected technical issues can be recorded in the (one) technical service offering that contains the service instance.
-   Some ServiceNow modules only crawl upstream relations to determine who or what is impacted. As a result, I always relate the detected web service/database directly to the Service Instance that depends on it. If I were only relating servers to the service instances, a detected issue with a DBMS would not trigger an outage on the Service Instance.. That said, don't go overboard, e.g., by linking all installed software packages on a server to the service instance. Only relate what is relevant.
