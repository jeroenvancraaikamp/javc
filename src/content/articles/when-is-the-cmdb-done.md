---
title: "When is the CMDB \"Done\"?"
date: 2026-04-25
categories: ["Uncategorized"]
excerpt: "A CMDB traditionally is an inventory of the enterprise's IT assets, including their characteristics and dependencies. Some say a CMDB is \"done\" when all IT assets and their dependencies are registered and maintained. That, however, is not correct. Even in"
image: "https://javc.nl/wp-content/uploads/2026/04/CMDB_is_never_done.png"
readingTime: 7
---

A CMDB traditionally is an inventory of the enterprise's IT assets, including their characteristics and dependencies. Some say a CMDB is "done" when all IT assets and their dependencies are registered and maintained. That, however, is not correct. Even in the past, one would not record everything that exists in the CMDB. Nowadays, assets have become ephemeral, elastic, and fine-grained, making them impossible to track in real time.

The CMDB is now a repository of relevant, stable assets, including their attributes and dependencies. Its content is retrieved from trusted data sources, element managers, and by automated discovery. Its purpose has been extended from an inventory to a leading source of information for life cycle management and automated risk & impact analysis.

The CMDB coexists with DevSecOps CI/CD, observability, and orchestration tools that manage/track increasingly fine-grained IT assets in real time. Some IT practices use data from the CMDB, while others directly interface with DevSecOps tools. Increasingly, the assets on which Enterprises register Risks and Compliance reside in the CMDB. Some enterprises also register their business/architecture artifacts (e.g., business processes, capabilities, applications, information objects, and dependencies) in their CMDB. Objectives, initiatives, projects, budgets, themes, and epics may also be stored in CMDB. Although infrastructure is increasingly procured/provided as a (cloud) service. For many companies, the CMDB still serves as the primary inventory for procured assets. IT Management and OT Management are merging into Technology Management.

> **Currently, there is no single universal market-standard definition of a CMDB or of what it should contain. Each of the leading practices (e.g., TOGAF, IT4IT, ITIL, ISO 85K/27K, etc) uses its own definition and language. The use cases to be supported determine what needs to be registered in the CMDB, and this varies by enterprise.**

It is highly likely -**before this decade is over-** that each management practice will register/maintain a portion of an enterprise's technology ecosystem and make that information available to AI systems/agents that will correlate, reconcile, and use it. The traditional CMDB will evolve into a broader ecosystem of design-time and run-time artifacts that support various types of interactions and flows. The success of that ecosystem will depend on the governance of dependencies/overlap among the various practices.

**For now**, I consider the CMDB to be the repository of all that is relevant, stable, and detectable, enabling various use cases across management practices. The CMDB should be able to provide (automated) responses to questions such as:

-   Who and what may be impacted if (something in/on) this item breaks?
-   If subscribers face issues with that offering, what could be broken?
-   If this (version of this) product is no longer supported, how much of what do we need to replace/upgrade, and who is impacted?
-   Which others' solutions interface with my solutions? Who are my stakeholders?
-   Who should address this detected vulnerability on that item?
-   How many of these do we have, and where are they?
-   How many licenses should I pay for for this product?
-   What is this item used for, by whom, and who maintains/owns it?
-   What has been created/changed/removed since yesterday that is relevant?
-   By which changes was this item affected?
-   How many incidents were recorded on this item this month?
-   How many open vulnerabilities exist on this item?
-   Which items of which type does this team own/manage?

### The CMDB is "done" when the intended audience can find the correct/complete/relevant answers to the above questions in the CMDB

The keywords herein are data quality and relevance. I.e.

-   No duplicates, unless there are different items with the same name.
-   The attribute values and item relations are populated, and the content is correct; they reflect reality.
-   Coverage: All items in scope are registered.
-   If multiple sources provide the same item, the most relevant source updates the item in CMDB.
-   Hide irrelevant fine-grained details in responses to coarse-grained questions.
-   The CMDB should hold vertical stacks, from Service/Solution, to Instances thereof, and the underpinning technology that it depends on
-   The CMDB should hold horizontal dependencies between items that depend on (or interface with) each other.
-   Items that only exist for a couple of minutes/hours do not belong in the CMDB; they are registered/governed in DevSecOps tools.

The CMDB clearly is not properly "done" in the following exemplary situations:

-   You find a vulnerability, but can not automatically determine to which team this must be assigned
-   You want to update a server, but don't know who needs to be informed of the potential impact
-   A machine was created in production, but you can't figure out what it is being used for
-   A database reports being corrupted, but you don't know which applications access data in that database
-   Your company has a production application, but you don't know which technology it depends on.
-   Your interface stopped working because the PKI certificate expired, but you never saw that coming.
-   You want to allocate the cost of infrastructure to the DevSecOps team, but you can't figure out from CMDB which team uses which VMs
-   Your vendor tells you you have three times as many licensed deployments as you registered in the CMDB.
-   Someone changed a firewall setting, causing an unnoticed security breach.
-   Your vendor tells you that Version 2016 is no longer supported as of January 1st, but you have no idea what the impact might be.
-   You have a project to replace all phones older than 3 years, but you don't know where they are or who uses them.
-   Your auditor tells you that you are not compliant with SOX, SOC2, DORA, and NIS2
-   The ITSM community complains that they can not relate their incidents/changes to some of the impacted offerings, instances, or CI's
-   When a significant portion of the Applications lacks infrastructure dependencies.  
    

## How to get IT properly done?

-   **Plan before you begin**

-   Get executive (C-Level) buy-in for what you intend to do (without their buy-in: go play golf instead...)
-   Adopt/Use Market Standards Data Models such as TBM, CSDM, etc
-   Define what you need, where you can get it from, and by which mechanism
-   Obtain/Manage pre-requisites
-   Document stakeholders, teams, and service/product owners.
-   Define, agree on, and maintain a roadmap for CMDB Integrations.

-   **Define and maintain the foundational data**

-   Obtain User/Organization Data from HR/IAM, preferably via an interface
-   Obtain Vendor/Customer/Contract Data from ERP, preferably via an interface
-   Authorize Access to your data via Identity & Access Mngt (IAM)

-   **Increase/maintain awareness of the CMDB and its data.**

-   Launch a digital storage/knowledge base where people can find information
-   Share the concepts and Market Standards
-   Share/Maintain the Data Model
-   Maintain Technical Documentation

-   Technical Integrations
-   Reconciliation Settings

-   Publish achievements and benefits

-   **Implement (management of) the Technology Product/Service Portfolio**
    

-   Define templates for (to be registered) solutions/services
    
-   Train owners how/where to register/maintain their solutions/services
-   Have the owners define their solutions/services incl. ratings
-   Ensure all Applications/Services/Offerings have an Owner.

-   **Define, Govern, Audit, and Improve the Processes**

-   Assign an Accountable Process Owner.
-   Implement a Process Council, chaired by the Process Owner.
-   Define process, roles, RACIs, work instructions, FAQs, QRCs, and Training Material
-   Assign process roles to people and train/certify them
-   Define/Implement governance bodies (steerco's, escalation channels, etc)
-   Coach the process organization in the first months after launch

-   **Automate the population/update of the CMDB portion that is detectable**

-   Deliver integrations as per the agreed roadmap
-   Gather information from multiple sources and reconcile it before inserting it into the CMDB.
-   Use Out of the Box integrations, instead of DIY customizations
-   Where possible, automatically relate detectable content with Physical CI's
-   Where possible. automatically relate detectable content with instances of the Offered Service

-   **Register Offices, Data Centers, Locations, Racks, and the Physical Devices in them**

-   Define the IAAS/DCAAS Services, incl. its commitments, subscriptions, and ownership
-   Register the Physical Assets, including their locations, and their users/consumers
-   Relate the Physical Assets with Operational CI's and v.v.
-   Generate Service Instances and relate the with the offered IAAS/DCAAS Services
-   Implement the Asset Mgmt Process, including its interfaces with Procurement, Legal, and Fin. Accounting Processes
-   Implement a periodic audit and verification process for Assets.
-   Ensure all Assets have a valid Owner.
