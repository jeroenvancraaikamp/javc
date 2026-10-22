---
title: "ITIL Version 5,  CSDM5, DevSecOps and IT4IT 3.0 Overlap"
date: 2026-04-04
categories: ["ITIL","ServiceNow"]
excerpt: "ITIL Version 5 was published in February 2026, and now people ask me how that aligns with DevOps, SecOps IT4IT 3.0 and CSDM5. The honest answer is: There appears to be no real alignment between the Frameworks. From a satellite,"
image: "https://javc.nl/wp-content/uploads/2026/04/ITIL5-CSDM5-IT4IT30.png"
readingTime: 5
---

ITIL Version 5 was published in February 2026, and now people ask me how that aligns with DevOps, SecOps IT4IT 3.0 and CSDM5. The honest answer is: **There appears to be no real alignment between the Frameworks.** From a satellite, it looks like the frameworks are similar, but the closer you get to real life, the bigger the differences and confusion appear to be. Things get even fuzzier when one tries to map COTS products and product-specific practices to either framework.

At best, one can produce a picture like the one above or a table like the one below. A CSDM5 domain can include multiple ITIL Version 5 lifecycles. An ITIL Version 5 Livecycle can apply to multiple CSDM5 domains. The IT4IT value streams are similar but not fully congruent with the CSDM5 domains and the ITL Version 5 Lifecycle steps.

That said, the table below can help to keep IT simple. e.g.

-   If you merge ITIL5 "Discover and Design," you get what is called "Ideation, Strategy, Design, Planning, and Manage Portfolio" in CSDM5.
-   If you merge ITIL5 "Deliver and Support", you get what is called "Service Consumption" in CSDM5.
-   If you merge the DevOps Portion of CSDM5 Foundation with CSDM5 Build and Integration, you have what Agile IT folks would call DEVOPS.
-   If you merge the Service Delivery portion of ITIL5 "Transition and Operate", you have "Service Delivery" in CSDM5, which includes SECOPS

Then you read the fine print and conclude that things are not that simple. Each company also tends to do IT in its own way. The bigger the company, or the more dispersed it is, the bigger the diversity. The harsh reality is that nine out of ten initiatives to institutionalize/standardize practices across the enterprise fail to deliver significant value/results. Not doing anything to make things better is also a recipe for disaster. I often use the Pareto principle: spend 20% of the effort, get 80% of the results. Often, there is no viable business case for pursuing the remaining 20%.

In today's reality, DevOps communities typically use a couple of dozen technology-specific tools. Ideation, Strategy, and Portfolio are often still managed in O365. Service Delivery and Service Consumption are increasingly managed via Service Management tools, enabling workflows beyond IT. Increasingly, it makes sense to merge Ideation, Strategy, and Portfolio with Service Consumption and Service Delivery.

When one combines CSDM "Ideation & Strategy" with "Design and Planning," one gets IT4IT "Strategy to Portfolio (PLAN)" , which includes ITL Version 5 "Discover," " Acquire," and "Design". The three frameworks agree that the "BUILD" of a solution is something unique. The frameworks, however, each have different views on whether integration, testing, and release to production are part of BUILD. The three frameworks each have a notion of "DELIVERY," but they each mean something different by it. Whereas IT4IT appears to wait until something is detected and needs correction, ITIL Version 5 "Operates" and "Supports" IT Infrastructure, and CSDM "Delivers a Consumable Service".

I believe there is more than IT, and that Enterprise-Wide Agentic AI platforms will emerge to address all of the employees' needs. Delivery will no longer be confined to the delivery/release of Digital products. I expect that within a couple of years, enterprises will each use one or two enterprise-AI platforms, surrounded by niche products/agents that interact with those platforms. I would also not be surprised if companies decide to have Customer Service Management (CSM) and Customer Relationship Management (CRM) enabled by the same ([IT4ESM?](https://it4esm.nl/)) Platform.

**So, each framework has its pros and cons, and in my opinion, none is 100% correct or is 100% complete.** Probably it is best to cherry-pick and take guidance/governance from existing frameworks rather than go all-in on a single one or implement all the practices defined in each framework. And yes, that means that you will have to accept that there is no one-size-fits-all framework. The good news: there are multiple vendors that offer Common of-the-shelf platforms with ditto preconfigured practices and integrations.

> I believe for Commodity Service Management, it is best to use Common-of-the-shelf (COTS) platforms and COTS practices/integrations. Since COTS platform/practices get updated and innovated by the Vendor (and you probably pay for it!!), I do not recommend customizing the COTS platforms/practices by realigning them with IT4IT, ITIL, TOGAF, COBIT or similar frameworks. Reality is you will probaby still have to procure multiple platforms if you want to to enable the 16 platform capabilites in the picture above. Keep in mind, the less platforms/vendors you have, the better it often is for you. I highly recommend to go for best-of-suite platforms instead of best-of-breed tools.. For niche areas, you can still use niche tools, if you really must.

For companies that want to use ServiceNow, the following is recommended:

1.  For **Discovery and Design**, use ServiceNow Strategic Portfolio Mngt, Digital Portfolio Mngt, Technology Portfolio Mngt, and Service Portfolio to define and manage the lifecycle of everything that the company provides/consumes. If there is no need for complex EA/BPM capabilities, one could also use ServiceNow EA for process/business design. Since enterprise architects prefer enterprise platforms (except for themselves), companies often use separate EA/BPM tools that they try to integrate with enterprise-wide platforms, usually the latter fails because only a few people in the world understand the language of the architects :-).
2.  For **Build and Transition**, for now, continue using dozens of technology-specific DevOps tools to build, store, integrate, deploy, and observe/orchestrate Digital Products. Integrate these tools with the Service Management Platform to govern risk and compliance, to track (impact of) outages, and for follow-up on observed issues. In due time, these DevOps tools will likely be replaced by AI and/or governed/controlled via AI (see below).
3.  For **Transition and Operation,** use IT Service Management, IT Operations Management, and Security Operations to manage Service Delivery. If you don't (want to) use a separate GRC platform, you could choose to use the incumbent Integrated Risk Management capabilities in ServiceNow to manage/mitigate your Operational Risks.
4.  For **Deliver & Support**, use Enterprise Service Delivery Products (WPSD, HRSD, LSD, CSM, FSM, etc) to manage Service Consumption and Security Issues
5.  Use **AI (on the Platform or alongside it)** and manage/govern/orchestrate the agents that are used or provided by the Platform

Rather than interpreting and implementing variants of ITIL5 processes, it is recommended to use the process guides that come with the selected ServiceNow products, and are upgraded/innovated alongside the platform. If you decide to discontinue a ServiceNow product, you will likely buy another product that also comes with its own COTS commodity practices.  

![](https://javc.nl/wp-content/uploads/2026/04/ITIL5-CSDM5-1.png)
