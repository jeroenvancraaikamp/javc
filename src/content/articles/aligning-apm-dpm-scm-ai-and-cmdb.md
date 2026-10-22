---
title: "Aligning APM, DPM, SCM, AI and CMDB"
date: 2025-05-31
categories: ["TBM/CSDM/CMDB"]
excerpt: "Each IT management framework has its distinct definitions, glossaries, and fanbase. And guess what? These often don't align or match with each other. Initially people differentiated between software and hardware. With the advent of massive Outsourcing, Cloud Services, and APIs,"
image: "/wp-content/uploads/2015/07/law_post_3.jpg"
readingTime: 3
---

Each IT management framework has its distinct definitions, glossaries, and fanbase. And guess what? These often don't align or match with each other. Initially people differentiated between software and hardware. With the advent of massive Outsourcing, Cloud Services, and APIs, people began to distinguish between applications and infrastructure that could both be offered/consumed "as a Service". This was working well until the emergence of Software-Defined-Networks, Microservice Architecture, Generative AI, and now Agentic AI. The only thing that these things nowadays have in common is that they are "digital products".

A one-size-fits-all Data Model for Service, Asset, and Configuration Mngt (SACM) for everybody and everything does not exist, or even in sight. After four years of trying to make sense of it all, ServiceNow released its Common Service Data Model version 5. In theory, CSDM is platform-agnostic. e.g., one could do "design and planning" in one platform and do "build and Integration" on one or multiple other platforms. In reality, not every IT Management platform supports the concepts or utilizes the definitions and glossary of CSDM5. Furthermore, within each of the 6 domains, people tend to do things in their own way.

Each platform has its inventory of artifacts, and other platforms may consume these via out-of-the-box Integrations, APIs, or Graph Connectors. Enterprises often establish a central Configuration Management Database (CMDB), where they gather and correlate artifacts relevant to the stakeholders of the CMDB. What is "relevant" varies depending on the organisational maturity, level of automation, sourcing models, and operating models in use.

Those who have attempted to consolidate everything into a CMDB and tried to update the information in real-time have concluded that this is currently still a bridge too far. The processes/agents that require this fast information are emerging but still in their infancy. The legacy CMDBs that utilize traditional databases do not provide the capacity or performance required to manage the tens of millions of items or relations in a typical CMDB, especially if the data is to be refreshed from its source, preferably in real-time.

Agentic AI and AGI will change the way IT works. Code and pre-defined workflows will eventually be replaced by something Intelligent that does not exist today. That said, some of the Legacy IT will persist for many years to come, simply because companies do not always feel the sense of urgency or lack the necessary bandwidth or funding to modernize their IT.

Some believe the CMDB will transition to a Virtual Common Database and that its data is retrieved directly from the data source on a real-time basis. Others believe that all CMDB data will be gathered and stored in a modern data lake (or data fabric), where authorized individuals and entities can access and consume it. I believe that **in the coming decades, we will have a hybrid mix of local CMDBs/VMDBs and Data Lakes, which are tailored to their intended purpose and** **audience.** The intended purpose and audience will vary per enterprise. The company's roadmap will vary depending on the vision, strategic priorities, IT landscape, sourcing model, and related business cases of its stakeholder groups.
