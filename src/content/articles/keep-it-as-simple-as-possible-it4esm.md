---
title: "Keep IT as simple as possible: IT4ESM"
date: 2026-04-06
categories: ["IT4ESM","ServiceNow","Uncategorized"]
excerpt: "A couple of months ago i surveyed 700+ IT tools. Every tool has its pros and cons, and everybody chooses their own solution. Enterprise Service Management is often the most expensive and worst-managed Architecture Domain in the company, but this"
image: "/wp-content/uploads/2026/04/IT4ESM-Tools.png"
readingTime: 8
---

A couple of months ago i surveyed [**700+ IT tools.**](/700-it-management-tools/) Every tool has its pros and cons, and everybody chooses their own solution. Enterprise Service Management is often the most expensive and worst-managed Architecture Domain in the company, but this is usually not visible or transparent. The only thing that management typically sees is the cost of product/saas licenses, but that is only the tip of the iceberg. A significant portion of the (hidden) cost lies in the tools' integrations and maintenance. The higher cost lies in adopting and inefficiently using the tools. The highest cost is driven by misaligned processes, leading to siloed ways of working and a lack of transparency and control. The sad thing is, only a few appear to know how much time/resources/money is being wasted, making it almost impossible to build a tangible business case to "Do IT right..."

If one were to treat the Service Management Architecture Domain like any other Business Architecture Domain, one would not end up with the spaghetti architecture typically seen in IT4IT. The Corporate Functions of a company typically select their own solutions, and blending the Enterprise Solutions into a wider IT4ESM architecture is not their primary driver in that selection. The IT4ESM domain is typically not owned by a single person, if it is owned at all. Without ownership, there is no accountability, and the rest is consequence. Furthermore, users tend to look at today -and possibly tomorrow- but do not look 36 months ahead. With the speed at which AI is emerging on the playing field, it is stupid not to consider that reality when managing/planning the lifecycle of the solutions/integrations within the IT4ESM domain.

So, whilst the rest of the world was looking for Easter eggs. I drafted an outline of how to keep IT simple:

-   Make Enterprise Service Management an Architecture Domain and govern it as any other Architecture Domain that you have. Before you begin, get your C-Level to buy into the concept that corporate functions are not supposed to be independent silos with their own agenda. They are valued ESM Domain stakeholders.
-   Reduce the number of ESM platforms you have by allowing use of only a small number of large enterprise-wide platforms, choose them wisely...
-   Only if the enterprise platforms cannot provide 80% of the required functionality should one consider selecting another niche platform.
-   Choose market-standard products/platforms. which may not be the cheapest per user/token, but will likely save you a fortune on integration and innovation later.
-   That said, don't close your eyes to usage costs; e.g, if you are not ready for AI, don't buy/use AI, but don't get stuck in a cul-de-sac either.
-   Use the products/platforms for what they were designed. This will allow you to follow the vendor's roadmap.
-   Keep IT together: Host neighboring, technology-agnostic capabilities on the same platform if that platform can enable them.
-   Accept that DevOps and SecOps practices rely on dozens of technology-specific tools for a very good reason.
-   To transition your current scattered Tooling landscape into an interconnected IT4ESM ecosystem is a multi-year journey.
-   Define the northstar, update it every quarter, and gradually transition towards it, using the capabilities/integrations that will emerge over time.

For example, to me, it would make perfect sense to transition capabilities to a single platform that the Enterprise can use to govern the life cycle of its Products, Services, and Solutions, including the management of their delivery, associated risks, and financials. Rather than having multiple portals, call centers, chatbots, etc, i expect in the future there will be one multi-modal user interface for everything that an employee needs. Since the 1st-line response is not much different for internal employees than for known external customers, I would not be opposed to hosting it on the same platform as well.

So, even though you could buy multiple platforms that cater to specific capabilities, and since I'm a fan of parts of the ServiceNow platform, I would enable all the dark blue boxes in the picture above, on a single instance of the ServiceNow SAAS Platform:

1.  Enterprise Service Delivery (ITSD, HRSD, WPSD, FIN, FAC, LSD)
2.  Strategic Portfolio Mngt (SPM)
3.  IT Operations Mngt (ITOM)
4.  IT Service Mngt (ITSM)
5.  IT Asset Mngt (ITAM)
6.  Security Operations (SecOps)
7.  Collaborative Work Mngt (SAFE, SCRUM, KANBAN)
8.  AI Governance & Control (Now Assist)
9.  Customer Service/Relation Mngt (optionally)

Currently, I would choose different platforms for things that do not cause major harm if done elsewhere, and for which better products exist today. .E.g.

-   Products like LeanIX and BlueDolphin offer Enterprise Architecture and Business Process Management capabilities that are superior to those of ServiceNow. The audience for EA and BPM tools is typically different from the audience for IT4ESM. Furthermore, both products can be integrated out of the box with ServiceNow.
-   Most companies will already have a stand-alone Procure-to-Pay solution that extends well beyond ServiceNow's P2P capabilities. Using the ServiceNow P2P solution will not allow companies to phase out of the incumbent P2P solution. Integrating the P2P solution with ServiceNow would make sense. e.g., to be able to procure/pay for ordered products/services and/or to replenish stock.
-   I recommend companies using Integrated Risk Management on the ServiceNow Platform, since Risk Assets are often CMDB CIs, and Risks are usually related to those assets. However, in many companies, Risk & Compliance Officers think fundamentally differently from Operations. If that difference is not reconcilable, the Risk Community shall use its own truth, reflecting its own reality, which it shares with external auditors. Findings and follow-up are then managed in the GRC tools, which may work well for Risk but are often considered a nuisance for Operations.
-   Identity and Access Management is a function that takes input from HR, Enterprise Architecture, Business Process Management, Digital Portfolio, and IT Service Delivery. It is often seen as an extension to Application & Infra Security. That said, the majority of IAM transactions are password reset requests from users, which are IT Service Requests. Unfortunately, ServiceNow currently lacks robust IAM capabilities integrated with HRSD and its Joiner, Mover, and Leaver processes. So, it is probably wise to continue using niche tools such as Saviynt or SailPoint for IAM.
-   Most companies have -and will retain- an ERP solution. That is a good idea, especially since ServiceNow does not have ERP capabilities. Large multinationals will most likely choose SAP or Oracle ERP suites. If they are wise, they integrate ERP with their incumbent ERP provider's Finance products.
-   Companies that operate their own data centers most likely use DC Infra Mngt tools. If those tools work stand-alone, then there is no relation between the assets in DCIM and those in the Service Mngt platform. Planned maintenance is also more cumbersome if half of the required information sits in one tool and the rest in another.
-   Over the last few decades, DevOps teams have adopted a wide range of tools to design, develop, test, integrate, deploy, and monitor technology-specific IT systems. Even if you wanted to, ServiceNow does not have the capabilities in place to replace those. If your company believes in continuing to code, you may want to integrate those tools with the IT4ESM platform's SAFE/SCRUM/KANBAN capabilities. If your company has onboarded on the AI journey, maybe you can better skip that integration.
-   OpenShift, Kubernetes, and Elastic are disrupting traditional views. Configurations have become transient, and there is no way that the IT4ESM platform can keep up with real-time changes. Container Orchestration and Cloud Management are currently rarely linked to IT4ESM platforms; they do their thing, and they are good at it. Stand-alone Observability and Drift Management tools have emerged to monitor real-time activity. Integration of those tools with AI is highly likely in the near future.

And then there are the topics that are open for discussion

-   If you believe the IT4ESM is big/complex enough already without it having to deal with issues of External customers, then you may want to limit IT4ESM to things that matter to Employees and have it integrate with a separate CRM/CSM solution on another platform. This provided an upside to segregating customer data from internal data, but this is also a downside, e.g., if you want to auto-relate customer issues to technical issues or vice versa.
-   For numerous reasons, DevOps engineers like Atlassian JIRA/Confluence. Management is usually not a fan of Jira because the data in it often cannot be rolled up and is rarely consistent across the enterprise. Integrating JIRA issues with ServiceNow is possible, but it does not improve visibility/manageability for Management, and it does not add much value for the DevOps Engineers. Usually, DevOps people look up change approval in the IT4ESM platform before triggering CI/CD to deploy code via JIRA. If you want to enforce consistency and/or use Kanban/Scrum to manage all kinds of projects/tasks, not limited to DevOps, then perhaps you should use ServiceNow instead of JIRA. If you decide to phase out JIRA, you may want to replace Confluence with the O365 Suite. If you decide to keep JIRA/Confluence, e.g., because you believe JIRA is a tool for engineers, not for managers, that is fine as well, although it has drawbacks. E.g., maybe you should not go for SAFE or another Enterprise Agile framework if you use JIRA

Writing an article such as this one is risky. Often, nuances, politics, and other factors are to be considered. i.e., take this article as rough guidance, and use your brains to determine what fits your situation best. Also, there are multiple ways from here to Rome. What is a good launch sequence for one may make less sense for someone else. Lastly, tomorrow all will probably be different again...
