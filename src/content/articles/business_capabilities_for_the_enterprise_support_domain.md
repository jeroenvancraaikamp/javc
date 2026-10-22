---
title: "Business Capabilities for the Enterprise Support Domain"
date: 2024-12-25
categories: ["IT4ESM"]
excerpt: "At the end of the year, some look back and—more importantly—some look forward. I did both. When looking backward, I noticed many people complaining about getting value for money from their IT4IT investments. After two decades, Gartner stopped publishing the"
image: "/wp-content/uploads/2024/12/NewOrder.png"
readingTime: 7
---

At the end of the year, some look back and—more importantly—some look forward. I did both.

When looking backward, I noticed many people complaining about getting value for money from their IT4IT investments. After two decades, Gartner stopped publishing the Magic Quadrant for ITSM tools. Configuration Management (as a process to maintain CMDB content) is now rarely done manually or governed by Change Management. Instead, CMDB content is increasingly maintained via discovery and federation—zero-touch CMDB has become the norm. When code is now automatically generated, integrated, tested, and deployed into a public cloud, the need for Change Management is no longer what it was in 2007 (when ITIL V3 was released) or even in 2019 (when ITIL V4 was released). That said. last year I encountered companies that still; have little to no automation, integrations or AI in place within the Enterprise Support Domain. For them, ITIL V4 (2019) was a good (initial) fit.

In 2024, ServiceNow focused on bringing AI to its platform for anybody who wanted to pay for it, enabling it to handle all kinds of requests, questions, orders, and messages from individuals, processing them through automated workflows. Generative AI is used to produce responses to users and to summarize/translate interaction with the users in "tickets".

By 2025, the Large Language Models, which could only provide predefined information, will be replaced by Artificial General Intelligence (AGI), which is capable of reasoning and adapting its responses based on observations and experiences. AI Agents will be introduced to handle specific tasks (e.g., supporting IT assistance/knowledge requests or booking facilities), expanding their utility beyond IT alone. These AI Agents in ServiceNow will engage with users, leverage operations/CMDB data from the platform, and interact with APIs, microservices, and other AI agents across enterprise functions.

While ServiceNow focused on AI, the IT community embraced other DevOps tools and practices, integrating them seamlessly. As a result, the IT tooling landscape for most companies has become highly diversified. Each company now uses its own set of tools tailored for specific capabilities, with some tools offering multiple capabilities

Until the end of this decade, Enterprise Architects may want to differentiate the following **Business Capabilities within the Enterprise Support Domain** which also include modern capabilities that are not included in traditional frameworks such as DevOps, DevSecOps, ITIL, SAFe, etc. To the best of my knowledge, these 15 capabilities do not overlap and are future-proof (at least until 2030), independent which practice your enterprise uses and will transition to (even to those that do not exist today):

1.  AI-Supported Employee Engagement and Collaboration
2.  Plan/Roadmap (OKRs, Project Portfolio)
3.  Architecture and Design (Digital Product Portfolio)
4.  CMDB/SCM (Service, Asset & Configuration)
5.  Develop (Build & Test)
6.  Security/Privacy (Vulnerability & Data Loss)
7.  Identity & Access (SSO, RBAC, Entitlements)
8.  Deploy (Integrate & Deliver)
9.  Operate (Observe/Respond)
10.  Human Capital (aka Human Resources)
11.  Workplace Services, OT & Facilities
12.  Finance, Legal & Supply Chain
13.  Integrated Risk and Business Continuity (aka Governance, Risk & Compliance)
14.  AI-Supported Customer Engagement\*
15.  Field Service & Dispatch\*

\* Note : "AI Supported Customer Engagement" and "Field Service & Dispatch" are external-customer facing capabilities (aka Customer Service, CSM). Some companies exclude them from the Enterprise Support (ESM) capabilities, while others prefer to keep ESM and CSM together due to their technological similarities (e.g. If one dispatches a field-tech to customer, that is quite similar to dispatching a field-tech to an office of the enterprise, especially if field tech is outsourced).

> **Each of the 15 ESM/CSM Business Capabilities, will be enabled by only a limited number of platforms. Things that used to be supported by one platform (ie. Employee Portal, ITSM, and CMDB) will likely be distributed over multiple platforms. Specialized Vertical AI Agents, will enable a Business Capability. Enterprises will make different choices re which platform of which vendor will be used by/until when, to provide which Business Capability. If an enterprise has outsourced innovation and maintenance, some of the business capabilities may be provided by (or included in the service of) the Managed Service Providers.**

HR, Finance, Legal, Supply Chain and Risk's IT Solutions often or not selected/owned/maintained by Enterprise IT. In the picture above, these non-IT capabilities are hence marked green. Managing Non-IT Capabilities outside the Enterprise Support Domain is often asking for troubles. E.g. the L3 Capability "Joiner, Mover & Leaver (JML)" is part of the L2 Capability "Human Capital (HCM)". JML, is near to impossible without automated interfaces with capabilities that are provided by others than HR (e.g. "Identity & Access", "Security/Privacy", "Integrated Risk Management" and "Finance, Legal & Supply Chain"). That said, having IT manage HR contracts/disputes, probably is not a good idea either :-)

I encourage organizations to keep things simple and embrace these Level 2 (L2) Business Capabilities when planning and designing their architecture for the whole (L1) Enterprise/Customer Support Domain. For most capabilities (e.g., 1, 2, 3, 4, 10, 11, 12, 13, 14, and 15), using as few IT solutions as possible is usually wise. For more technical capabilities, using the best-suited tools for specific technologies often makes sense.

Currently, 528 vendors produce over 700 tools, offering capabilities for the Enterprise Support Domain. Most of these tools typically focus on just one of the L2 Business Capabilities listed above.

In theory, ServiceNow can provide 11 of the business capabilities. In practice, about 50% of companies use ServiceNow for only three or four of aforementioned capabilities. Few companies use the same capabilities, and probably none implemented them identically. ServiceNow is not the only tool that is used for a capability. E.g. if the CMDB is populated using federation from INTUNE, then INTUNE provides CMDB/SCM capabilities. Similarly, GitHub and JFROG Artifactory are popular Component (SCM) repositories used in DevSecOps, which often have little overlap with CMDB content in ServiceNow.

Legacy frameworks such as ITIL V3/V4 are not compatible with modern automated DevSecOps and AI practices. In general, it’s deemed a good practice to ensure the platform is only used by its intended audience for its intended purpose, especially if the product/platform, including documentation, is maintained by the vendor. Using definitions and vocabularies different from those provided by the platform vendor almost always leads to confusion and additional costs.

That said, many companies use technical functionalities of a platform for unintended purposes or audiences. For example, I’ve seen platforms where the Incident Management process was used to request a password reset (rationale: "I cannot log in, so IT must be broken"). Does that make the ticketing system an Identity and Access Management platform? I don’t think so. The interaction with the user needing a password reset falls under "AI-Supported Employee Engagement and Collaboration," while the actual password reset belongs under "Identity & Access (SSO, RBAC, Entitlements)." A password reset request should not be registered as an incident.

Another example: outages or performance issues might be automatically resolved before a user even notices them. If the outage is already registered/reported separately via "Observe," registering it again as an incident is questionable.

**IN CONCLUSION:**

There is currently no single framework that defines all the capabilities used in the Enterprise Support Domain. T**he best approach is likely to map your company’s IT tools to the 15 business capabilities above** and then assess, per capability, whether tool rationalization or consolidation is required or desired.

In the digital portfolio, architects shall document which of the 15 L2 Business Capabilities each product provides. Additionally, about each product’s intended purpose and audience shall be documented (e.g. in High Level Designs). Rather than adopting L3 capabilities from a particular framework (e.g. ITIL, DevOps, DevSecOps, IT4IT, etc), i recommend to refer to the vocabulary/definitions that the vendor is using. This will allow enterprises to consistently reuse (updates of) vendor's documentation, which probably stays aligned 100% with the vendor's out-of-the-box platform functionality that is continuously/rapidly innovated. Furthermore, this allows enterprise to transition from one framework to another, and use both frameworks for one of more of the business capabilities during the transition.
